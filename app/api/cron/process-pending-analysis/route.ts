import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import {
  candidatoEntrevistas,
  entrevistas,
  candidatos,
} from "@/lib/db/schema";
import { eq, and, isNull, isNotNull } from "drizzle-orm";
import { analyzeInterview } from "@/lib/ai/agent";
import { logger } from "@/lib/logger";
import { verificarPermissaoAnalise } from "@/lib/services/billing";

const BATCH_SIZE = 10; // Processa em lotes menores para evitar timeout

// Verifica se a request vem do Vercel Cron
function isValidCronRequest(request: NextRequest): boolean {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  return false;
}

/**
 * GET /api/cron/process-pending-analysis
 *
 * Cron de fallback para analisar entrevistas concluídas que não foram avaliadas.
 * Isso pode acontecer se:
 * - A análise via after() falhou (timeout, erro de API, etc.)
 * - Houve um bug no fluxo de finalização
 * - A entrevista foi marcada como concluída manualmente
 *
 * Roda a cada 5 minutos como rede de segurança.
 */
export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const cronId = Math.random().toString(36).substring(7);
  logger.info("[CRON-ANALYSIS] Iniciando processamento", { cronId });

  try {
    const db = getDB();

    // Busca entrevistas concluídas mas não avaliadas (inclui userId para verificação de limite)
    const pendentes = await db
      .select({
        candidatoEntrevistaId: candidatoEntrevistas.id,
        candidatoId: candidatoEntrevistas.candidatoId,
        entrevistaId: candidatoEntrevistas.entrevistaId,
        concluidaEm: candidatoEntrevistas.concluidaEm,
        candidatoNome: candidatos.nome,
        entrevistaCargo: entrevistas.cargo,
        userId: entrevistas.userId,
      })
      .from(candidatoEntrevistas)
      .innerJoin(candidatos, eq(candidatos.id, candidatoEntrevistas.candidatoId))
      .innerJoin(entrevistas, eq(entrevistas.id, candidatoEntrevistas.entrevistaId))
      .where(
        and(
          eq(candidatoEntrevistas.status, "concluida"),
          isNotNull(candidatoEntrevistas.concluidaEm),
          isNull(candidatoEntrevistas.avaliadoEm),
          isNull(entrevistas.deletedAt)
        )
      )
      .limit(BATCH_SIZE);

    if (pendentes.length === 0) {
      logger.info("[CRON-ANALYSIS] Nenhuma análise pendente", { cronId });
      return NextResponse.json({
        success: true,
        cronId,
        found: 0,
        processed: 0,
        message: "Nenhuma análise pendente",
      });
    }

    logger.info("[CRON-ANALYSIS] Encontradas análises pendentes", {
      cronId,
      total: pendentes.length,
    });

    let sucessos = 0;
    let falhas = 0;
    let bloqueados = 0;

    for (const candidato of pendentes) {
      try {
        // Verifica se o usuário dono da entrevista pode realizar análise (limite de free trial)
        const permissao = await verificarPermissaoAnalise(candidato.userId);
        if (!permissao.permitido) {
          logger.warn("[CRON-ANALYSIS] Usuário bloqueado - limite de free trial atingido", {
            cronId,
            userId: candidato.userId,
            candidatoNome: candidato.candidatoNome,
            motivo: permissao.error?.code,
          });
          bloqueados++;
          continue; // Pula para o próximo candidato
        }

        logger.info("[CRON-ANALYSIS] Processando candidato", {
          cronId,
          candidatoNome: candidato.candidatoNome,
          entrevistaCargo: candidato.entrevistaCargo,
          concluidaEm: candidato.concluidaEm,
        });

        const result = await analyzeInterview(
          candidato.candidatoId,
          candidato.entrevistaId,
          candidato.candidatoNome
        );

        if (result.success) {
          logger.info("[CRON-ANALYSIS] Análise concluída com sucesso", {
            cronId,
            candidatoNome: candidato.candidatoNome,
            avaliacaoId: result.avaliacaoId,
          });
          sucessos++;
        } else {
          logger.error("[CRON-ANALYSIS] Falha na análise", {
            cronId,
            candidatoNome: candidato.candidatoNome,
            error: result.error,
          });
          falhas++;
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
        logger.error("[CRON-ANALYSIS] Exceção ao processar candidato", {
          cronId,
          candidatoNome: candidato.candidatoNome,
          error: errorMsg,
        });
        falhas++;
      }
    }

    const duration = Date.now() - startTime;
    logger.info("[CRON-ANALYSIS] Processamento concluído", {
      cronId,
      totalEncontrados: pendentes.length,
      sucessos,
      falhas,
      bloqueados,
      durationMs: duration,
    });

    return NextResponse.json({
      success: true,
      cronId,
      found: pendentes.length,
      processed: sucessos + falhas,
      success_count: sucessos,
      failed: falhas,
      blocked_by_limit: bloqueados,
      durationMs: duration,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    logger.error("[CRON-ANALYSIS] Erro fatal no processamento", { cronId, error: errorMsg });

    return NextResponse.json(
      { error: "Erro no processamento", cronId, details: errorMsg },
      { status: 500 }
    );
  }
}
