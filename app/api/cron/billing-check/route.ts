import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  validarBillingGlobal,
  corrigirBillingUsuario,
} from "@/lib/services/billing-validation";
import { logSystemError } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";

/**
 * GET /api/cron/billing-check
 *
 * Cron job para verificação diária de consistência de billing.
 * Executa:
 * 1. Validação global de todas as cobranças
 * 2. Correção automática de erros que podem ser corrigidos
 * 3. Criação de ticket para admin se houver erros não corrigíveis
 *
 * Deve ser chamado pelo GitHub Actions ou Vercel Cron
 */
export async function GET(request: Request) {
  try {
    // Verificar autorização via CRON_SECRET
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      logger.warn("[BILLING_CRON] Tentativa de acesso não autorizado");
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    logger.info("[BILLING_CRON] ========== INICIANDO VERIFICAÇÃO DIÁRIA ==========");

    const startTime = Date.now();
    const resultado = {
      executadoEm: new Date().toISOString(),
      validacao: null as Awaited<ReturnType<typeof validarBillingGlobal>> | null,
      correcoes: [] as Array<{
        userId: string;
        corrigidos: number;
        falhas: number;
      }>,
      errosNaoCorrigiveis: 0,
      tempoExecucao: 0,
      ticketCriado: false,
    };

    // 1. Validação global
    logger.info("[BILLING_CRON] Executando validação global...");
    resultado.validacao = await validarBillingGlobal();

    logger.info("[BILLING_CRON] Validação global concluída", {
      totalUsuarios: resultado.validacao.totalUsuarios,
      usuariosComErros: resultado.validacao.usuariosComErros,
      totalErros: resultado.validacao.totalErros,
      totalWarnings: resultado.validacao.totalWarnings,
    });

    // 2. Correção automática para usuários com erros
    if (resultado.validacao.usuariosAfetados.length > 0) {
      logger.info("[BILLING_CRON] Iniciando correção automática...", {
        usuariosAfetados: resultado.validacao.usuariosAfetados.length,
      });

      for (const userId of resultado.validacao.usuariosAfetados) {
        try {
          const correcao = await corrigirBillingUsuario(userId);
          resultado.correcoes.push({
            userId,
            corrigidos: correcao.corrigidos,
            falhas: correcao.falhas,
          });

          if (correcao.falhas > 0) {
            resultado.errosNaoCorrigiveis += correcao.falhas;
          }

          logger.info("[BILLING_CRON] Correção concluída para usuário", {
            userId,
            corrigidos: correcao.corrigidos,
            falhas: correcao.falhas,
          });
        } catch (err) {
          logger.error("[BILLING_CRON] Erro ao corrigir usuário", {
            userId,
            error: err instanceof Error ? err.message : "Erro desconhecido",
          });
          resultado.errosNaoCorrigiveis++;
        }
      }
    }

    // 3. Criar ticket se houver erros não corrigíveis
    if (resultado.errosNaoCorrigiveis > 0) {
      logger.warn("[BILLING_CRON] Erros não corrigíveis encontrados", {
        total: resultado.errosNaoCorrigiveis,
      });

      await logSystemError({
        level: "critical",
        component: "billing-cron:billing-check",
        message: `Verificação diária encontrou ${resultado.errosNaoCorrigiveis} erro(s) de billing não corrigíveis`,
        context: {
          validacao: resultado.validacao,
          correcoes: resultado.correcoes,
          errosNaoCorrigiveis: resultado.errosNaoCorrigiveis,
        },
        createTicket: true,
      }).catch(console.error);

      resultado.ticketCriado = true;
    }

    resultado.tempoExecucao = Date.now() - startTime;

    // Log final
    logger.info("[BILLING_CRON] ========== VERIFICAÇÃO CONCLUÍDA ==========", {
      tempoExecucao: `${resultado.tempoExecucao}ms`,
      totalUsuarios: resultado.validacao?.totalUsuarios,
      errosEncontrados: resultado.validacao?.totalErros,
      correcoesTentadas: resultado.correcoes.length,
      totalCorrigido: resultado.correcoes.reduce((sum, c) => sum + c.corrigidos, 0),
      errosNaoCorrigiveis: resultado.errosNaoCorrigiveis,
      ticketCriado: resultado.ticketCriado,
    });

    return NextResponse.json({
      success: resultado.errosNaoCorrigiveis === 0,
      ...resultado,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    const errorStack = error instanceof Error ? error.stack : undefined;

    logger.error("[BILLING_CRON] ❌ ERRO CRÍTICO na verificação diária", {
      error: errorMessage,
    });

    // Criar ticket para erro crítico no cron
    await logSystemError({
      level: "critical",
      component: "billing-cron:billing-check",
      message: "Falha na execução da verificação diária de billing",
      errorMessage,
      errorStack,
      createTicket: true,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        executadoEm: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
