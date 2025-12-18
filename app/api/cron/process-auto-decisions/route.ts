import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import {
  candidatoEntrevistas,
  entrevistas,
  candidatos,
  users,
} from "@/lib/db/schema";
import { eq, and, isNull, isNotNull, or, lt, sql } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import {
  emailAprovacaoAutomaticaTemplate,
  emailReprovacaoAutomaticaTemplate,
} from "@/lib/email/templates";
import { logger } from "@/lib/logger";

// Configurações do sistema de lock
const LOCK_DURATION_MINUTES = 5; // Tempo que um registro fica "travado"
const MAX_TENTATIVAS = 3; // Máximo de tentativas antes de desistir
const BATCH_SIZE = 20; // Processa em lotes menores para evitar timeout

// Verifica se a request vem do Vercel Cron
// Documentação: https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
function isValidCronRequest(request: NextRequest): boolean {
  // Em desenvolvimento, permite sem autenticação
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Vercel Cron envia o header Authorization com o CRON_SECRET
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  return false;
}

/**
 * Adquire lock em um registro para processamento
 * Usa UPDATE com WHERE para garantir atomicidade (anti-race condition)
 */
async function acquireLock(
  db: ReturnType<typeof getDB>,
  candidatoEntrevistaId: string
): Promise<boolean> {
  const lockUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000);

  const result = await db
    .update(candidatoEntrevistas)
    .set({
      autoDecisionLockUntil: lockUntil,
      autoDecisionTentativas: sql`COALESCE(${candidatoEntrevistas.autoDecisionTentativas}, 0) + 1`,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(candidatoEntrevistas.id, candidatoEntrevistaId),
        isNull(candidatoEntrevistas.decisaoRecrutador), // Double-check: ainda não tem decisão
        or(
          isNull(candidatoEntrevistas.autoDecisionLockUntil), // Sem lock
          lt(candidatoEntrevistas.autoDecisionLockUntil, new Date()) // Lock expirado
        )
      )
    )
    .returning({ id: candidatoEntrevistas.id });

  return result.length > 0;
}

/**
 * Libera lock de um registro (limpa o campo)
 */
async function releaseLock(
  db: ReturnType<typeof getDB>,
  candidatoEntrevistaId: string
): Promise<void> {
  await db
    .update(candidatoEntrevistas)
    .set({
      autoDecisionLockUntil: null,
      autoDecisionErro: null,
      updatedAt: new Date(),
    })
    .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));
}

/**
 * Registra erro de processamento
 */
async function registerError(
  db: ReturnType<typeof getDB>,
  candidatoEntrevistaId: string,
  error: string
): Promise<void> {
  await db
    .update(candidatoEntrevistas)
    .set({
      autoDecisionLockUntil: null, // Libera lock
      autoDecisionErro: error,
      updatedAt: new Date(),
    })
    .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));
}

/**
 * GET /api/cron/process-auto-decisions
 *
 * Processa decisões automáticas pendentes (fallback do after())
 * Chamado pelo Vercel Cron a cada 5 minutos
 *
 * Sistema anticorrupção:
 * - Usa lock temporário para evitar race conditions
 * - Limita tentativas para evitar loops infinitos
 * - Registra erros para debugging
 */
export async function GET(request: NextRequest) {
  // Valida autenticação
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const cronId = Math.random().toString(36).substring(7); // ID único para este run
  logger.info("[CRON] Iniciando processamento", { cronId });

  try {
    const db = getDB();

    // Busca candidatos elegíveis para processamento
    // Critérios:
    // 1. Foi avaliado pela IA (avaliadoEm IS NOT NULL)
    // 2. Não tem decisão ainda (decisaoRecrutador IS NULL)
    // 3. Não está com lock ativo (autoDecisionLockUntil IS NULL OR < NOW())
    // 4. Não excedeu máximo de tentativas
    // 5. Está em vaga com aprovação/reprovação automática
    const pendentes = await db
      .select({
        candidatoEntrevistaId: candidatoEntrevistas.id,
        notaGeral: candidatoEntrevistas.notaGeral,
        compatibilidadeVaga: candidatoEntrevistas.compatibilidadeVaga,
        candidatoId: candidatoEntrevistas.candidatoId,
        entrevistaId: candidatoEntrevistas.entrevistaId,
        tentativas: candidatoEntrevistas.autoDecisionTentativas,
        candidatoNome: candidatos.nome,
        candidatoEmail: candidatos.email,
        entrevistaCargo: entrevistas.cargo,
        entrevistaUserId: entrevistas.userId,
        autoApprovalEnabled: entrevistas.autoApprovalEnabled,
        autoApprovalMinScore: entrevistas.autoApprovalMinScore,
        autoApprovalUseCompatibility: entrevistas.autoApprovalUseCompatibility,
        autoApprovalMinCompatibility: entrevistas.autoApprovalMinCompatibility,
        autoApprovalNotifyCandidate: entrevistas.autoApprovalNotifyCandidate,
        autoApprovalCandidateMessage: entrevistas.autoApprovalCandidateMessage,
        autoRejectEnabled: entrevistas.autoRejectEnabled,
        autoRejectMaxScore: entrevistas.autoRejectMaxScore,
        autoRejectNotifyCandidate: entrevistas.autoRejectNotifyCandidate,
        autoRejectCandidateMessage: entrevistas.autoRejectCandidateMessage,
      })
      .from(candidatoEntrevistas)
      .innerJoin(candidatos, eq(candidatos.id, candidatoEntrevistas.candidatoId))
      .innerJoin(entrevistas, eq(entrevistas.id, candidatoEntrevistas.entrevistaId))
      .where(
        and(
          isNotNull(candidatoEntrevistas.avaliadoEm),
          isNull(candidatoEntrevistas.decisaoRecrutador),
          isNull(entrevistas.deletedAt),
          or(
            isNull(candidatoEntrevistas.autoDecisionLockUntil),
            lt(candidatoEntrevistas.autoDecisionLockUntil, new Date())
          ),
          or(
            isNull(candidatoEntrevistas.autoDecisionTentativas),
            lt(candidatoEntrevistas.autoDecisionTentativas, MAX_TENTATIVAS)
          ),
          or(entrevistas.autoApprovalEnabled, entrevistas.autoRejectEnabled)
        )
      )
      .limit(BATCH_SIZE);

    let aprovados = 0;
    let reprovados = 0;
    let ignorados = 0;
    let lockFailed = 0;
    let errors = 0;

    for (const candidato of pendentes) {
      // Tenta adquirir lock (atomicamente)
      const gotLock = await acquireLock(db, candidato.candidatoEntrevistaId);

      if (!gotLock) {
        logger.info("[CRON] Lock não adquirido (race condition evitada)", {
          cronId,
          candidatoEntrevistaId: candidato.candidatoEntrevistaId,
        });
        lockFailed++;
        continue;
      }

      try {
        const score = candidato.notaGeral || 0;
        const compatibility = candidato.compatibilidadeVaga || 0;

        // Verifica APROVAÇÃO automática
        if (candidato.autoApprovalEnabled) {
          let shouldApprove = score >= candidato.autoApprovalMinScore;

          if (shouldApprove && candidato.autoApprovalUseCompatibility) {
            shouldApprove = compatibility >= candidato.autoApprovalMinCompatibility;
          }

          if (shouldApprove) {
            logger.info("[CRON] Aprovando candidato", {
              cronId,
              candidatoEntrevistaId: candidato.candidatoEntrevistaId,
              candidatoNome: candidato.candidatoNome,
              score,
            });

            await db
              .update(candidatoEntrevistas)
              .set({
                decisaoRecrutador: "aprovado",
                decisaoRecrutadorEm: new Date(),
                decisaoRecrutadorObservacao: `Aprovado automaticamente via cron (Score: ${score.toFixed(1)}%, Compatibilidade: ${compatibility.toFixed(1)}%)`,
                autoDecisionLockUntil: null, // Libera lock
                autoDecisionErro: null,
                updatedAt: new Date(),
              })
              .where(eq(candidatoEntrevistas.id, candidato.candidatoEntrevistaId));

            // Envia email se configurado
            if (candidato.autoApprovalNotifyCandidate) {
              try {
                const [owner] = await db
                  .select()
                  .from(users)
                  .where(eq(users.id, candidato.entrevistaUserId))
                  .limit(1);

                if (owner) {
                  const result = await enviarEmail({
                    to: candidato.candidatoEmail,
                    subject: `Parabéns! Você foi aprovado(a) para a próxima fase - ${candidato.entrevistaCargo || "Vaga"}`,
                    html: emailAprovacaoAutomaticaTemplate({
                      nomeCandidato: candidato.candidatoNome,
                      cargo: candidato.entrevistaCargo || "Vaga",
                      empresa: owner.empresa || owner.nome,
                      mensagemPersonalizada: candidato.autoApprovalCandidateMessage || undefined,
                    }),
                  });
                  if (result.sent) {
                    // Atualiza o registro com a data de envio do email
                    await db
                      .update(candidatoEntrevistas)
                      .set({ emailDecisaoEnviadoEm: new Date(), updatedAt: new Date() })
                      .where(eq(candidatoEntrevistas.id, candidato.candidatoEntrevistaId));
                  } else {
                    logger.warn("[CRON] Email de aprovação NÃO enviado", {
                      cronId,
                      candidatoEntrevistaId: candidato.candidatoEntrevistaId,
                      mode: result.mode,
                    });
                  }
                }
              } catch (emailError) {
                // Log mas não falha o processamento
                logger.error("[CRON] Erro ao enviar email de aprovação", {
                  cronId,
                  candidatoEntrevistaId: candidato.candidatoEntrevistaId,
                  error: emailError instanceof Error ? emailError.message : "Erro desconhecido",
                });
              }
            }

            aprovados++;
            continue;
          }
        }

        // Verifica REPROVAÇÃO automática
        if (candidato.autoRejectEnabled) {
          if (score <= candidato.autoRejectMaxScore) {
            logger.info("[CRON] Reprovando candidato", {
              cronId,
              candidatoEntrevistaId: candidato.candidatoEntrevistaId,
              candidatoNome: candidato.candidatoNome,
              score,
            });

            await db
              .update(candidatoEntrevistas)
              .set({
                decisaoRecrutador: "reprovado",
                decisaoRecrutadorEm: new Date(),
                decisaoRecrutadorObservacao: `Reprovado automaticamente via cron (Score: ${score.toFixed(1)}%)`,
                autoDecisionLockUntil: null,
                autoDecisionErro: null,
                updatedAt: new Date(),
              })
              .where(eq(candidatoEntrevistas.id, candidato.candidatoEntrevistaId));

            // Envia email se configurado
            if (candidato.autoRejectNotifyCandidate) {
              try {
                const [owner] = await db
                  .select()
                  .from(users)
                  .where(eq(users.id, candidato.entrevistaUserId))
                  .limit(1);

                if (owner) {
                  const result = await enviarEmail({
                    to: candidato.candidatoEmail,
                    subject: `Atualização sobre sua candidatura - ${candidato.entrevistaCargo || "Vaga"}`,
                    html: emailReprovacaoAutomaticaTemplate({
                      nomeCandidato: candidato.candidatoNome,
                      cargo: candidato.entrevistaCargo || "Vaga",
                      empresa: owner.empresa || owner.nome,
                      mensagemPersonalizada: candidato.autoRejectCandidateMessage || undefined,
                    }),
                  });
                  if (result.sent) {
                    // Atualiza o registro com a data de envio do email
                    await db
                      .update(candidatoEntrevistas)
                      .set({ emailDecisaoEnviadoEm: new Date(), updatedAt: new Date() })
                      .where(eq(candidatoEntrevistas.id, candidato.candidatoEntrevistaId));
                  } else {
                    logger.warn("[CRON] Email de reprovação NÃO enviado", {
                      cronId,
                      candidatoEntrevistaId: candidato.candidatoEntrevistaId,
                      mode: result.mode,
                    });
                  }
                }
              } catch (emailError) {
                logger.error("[CRON] Erro ao enviar email de reprovação", {
                  cronId,
                  candidatoEntrevistaId: candidato.candidatoEntrevistaId,
                  error: emailError instanceof Error ? emailError.message : "Erro desconhecido",
                });
              }
            }

            reprovados++;
            continue;
          }
        }

        // Candidato não atende critérios - libera lock
        await releaseLock(db, candidato.candidatoEntrevistaId);
        ignorados++;
      } catch (processError) {
        // Registra erro e libera lock
        const errorMsg = processError instanceof Error ? processError.message : "Erro desconhecido";
        await registerError(db, candidato.candidatoEntrevistaId, errorMsg);
        errors++;

        logger.error("[CRON] Erro ao processar candidato", {
          cronId,
          candidatoEntrevistaId: candidato.candidatoEntrevistaId,
          error: errorMsg,
        });
      }
    }

    const duration = Date.now() - startTime;
    logger.info("[CRON] Processamento concluído", {
      cronId,
      totalEncontrados: pendentes.length,
      aprovados,
      reprovados,
      ignorados,
      lockFailed,
      errors,
      durationMs: duration,
    });

    return NextResponse.json({
      success: true,
      cronId,
      found: pendentes.length,
      processed: aprovados + reprovados + ignorados,
      approved: aprovados,
      rejected: reprovados,
      skipped: ignorados,
      lockFailed,
      errors,
      durationMs: duration,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    logger.error("[CRON] Erro fatal no processamento", { cronId, error: errorMsg });

    return NextResponse.json(
      { error: "Erro no processamento", cronId, details: errorMsg },
      { status: 500 }
    );
  }
}
