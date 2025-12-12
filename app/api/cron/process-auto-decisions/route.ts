import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import {
  candidatoEntrevistas,
  entrevistas,
  candidatos,
  users,
} from "@/lib/db/schema";
import { eq, and, isNull, isNotNull, or, gte, lte } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import {
  emailAprovacaoAutomaticaTemplate,
  emailReprovacaoAutomaticaTemplate,
} from "@/lib/email/templates";
import { logger } from "@/lib/logger";

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

  // Fallback: verifica se veio do Vercel (header x-vercel-signature ou IP interno)
  // O Vercel não expõe publicamente os IPs, então confiamos no CRON_SECRET
  return false;
}

/**
 * GET /api/cron/process-auto-decisions
 *
 * Processa decisões automáticas pendentes (fallback do after())
 * Chamado pelo Vercel Cron a cada 5 minutos
 */
export async function GET(request: NextRequest) {
  // Valida autenticação
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  logger.info("[CRON] Iniciando processamento de decisões automáticas");

  try {
    const db = getDB();

    // Busca candidatos que:
    // 1. Foram avaliados pela IA (avaliadoEm IS NOT NULL)
    // 2. Não têm decisão do recrutador (decisaoRecrutador IS NULL)
    // 3. Estão em vagas com aprovação/reprovação automática habilitada
    // 4. Atendem aos critérios de score
    const pendentes = await db
      .select({
        candidatoEntrevistaId: candidatoEntrevistas.id,
        notaGeral: candidatoEntrevistas.notaGeral,
        compatibilidadeVaga: candidatoEntrevistas.compatibilidadeVaga,
        candidatoId: candidatoEntrevistas.candidatoId,
        entrevistaId: candidatoEntrevistas.entrevistaId,
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
          isNotNull(candidatoEntrevistas.avaliadoEm), // Foi avaliado
          isNull(candidatoEntrevistas.decisaoRecrutador), // Sem decisão ainda
          isNull(entrevistas.deletedAt), // Vaga não deletada
          or(
            entrevistas.autoApprovalEnabled, // Tem aprovação automática
            entrevistas.autoRejectEnabled // Ou reprovação automática
          )
        )
      )
      .limit(50); // Processa no máximo 50 por execução para não timeout

    let aprovados = 0;
    let reprovados = 0;
    let ignorados = 0;

    for (const candidato of pendentes) {
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
              updatedAt: new Date(),
            })
            .where(eq(candidatoEntrevistas.id, candidato.candidatoEntrevistaId));

          // Envia email se configurado
          if (candidato.autoApprovalNotifyCandidate) {
            const [owner] = await db
              .select()
              .from(users)
              .where(eq(users.id, candidato.entrevistaUserId))
              .limit(1);

            if (owner) {
              await enviarEmail({
                to: candidato.candidatoEmail,
                subject: `Parabéns! Você foi aprovado(a) para a próxima fase - ${candidato.entrevistaCargo || "Vaga"}`,
                html: emailAprovacaoAutomaticaTemplate({
                  nomeCandidato: candidato.candidatoNome,
                  cargo: candidato.entrevistaCargo || "Vaga",
                  empresa: owner.empresa || owner.nome,
                  mensagemPersonalizada: candidato.autoApprovalCandidateMessage || undefined,
                }),
              });
            }
          }

          aprovados++;
          continue; // Próximo candidato
        }
      }

      // Verifica REPROVAÇÃO automática
      if (candidato.autoRejectEnabled) {
        if (score <= candidato.autoRejectMaxScore) {
          logger.info("[CRON] Reprovando candidato", {
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
              updatedAt: new Date(),
            })
            .where(eq(candidatoEntrevistas.id, candidato.candidatoEntrevistaId));

          // Envia email se configurado
          if (candidato.autoRejectNotifyCandidate) {
            const [owner] = await db
              .select()
              .from(users)
              .where(eq(users.id, candidato.entrevistaUserId))
              .limit(1);

            if (owner) {
              await enviarEmail({
                to: candidato.candidatoEmail,
                subject: `Atualização sobre sua candidatura - ${candidato.entrevistaCargo || "Vaga"}`,
                html: emailReprovacaoAutomaticaTemplate({
                  nomeCandidato: candidato.candidatoNome,
                  cargo: candidato.entrevistaCargo || "Vaga",
                  empresa: owner.empresa || owner.nome,
                  mensagemPersonalizada: candidato.autoRejectCandidateMessage || undefined,
                }),
              });
            }
          }

          reprovados++;
          continue;
        }
      }

      // Candidato não atende critérios de aprovação nem reprovação
      ignorados++;
    }

    const duration = Date.now() - startTime;
    logger.info("[CRON] Processamento concluído", {
      totalProcessados: pendentes.length,
      aprovados,
      reprovados,
      ignorados,
      durationMs: duration,
    });

    return NextResponse.json({
      success: true,
      processed: pendentes.length,
      approved: aprovados,
      rejected: reprovados,
      skipped: ignorados,
      durationMs: duration,
    });
  } catch (error) {
    logger.error("[CRON] Erro no processamento", {
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });

    return NextResponse.json(
      {
        error: "Erro no processamento",
        details: error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
