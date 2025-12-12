import { getDB } from "@/lib/db";
import { transacoes, faturas, NewTransacao } from "@/lib/db/schema/transacoes";
import { users } from "@/lib/db/schema/users";
import { eq, sql, and } from "drizzle-orm";
import { FREE_TRIAL_LIMITS } from "@/lib/config/free-trial";
import { PRECOS_USUARIO, calcularCustoAnalise, USAGE_ESTIMATES_ANALISE_PERGUNTA } from "@/lib/config/pricing";
import { logSystemError } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";

/**
 * Verifica se o usuário é uma conta de teste
 */
export async function isTestAccount(userId: string): Promise<boolean> {
  const db = getDB();

  const [usuario] = await db
    .select({ isTestAccount: users.isTestAccount })
    .from(users)
    .where(eq(users.id, userId));

  return usuario?.isTestAccount || false;
}

export interface UsageFinanceiro {
  /**
   * Valor total gasto (soma de todas as transações)
   */
  totalGasto: number;

  /**
   * Limite financeiro disponível (para free trial)
   */
  limiteFinanceiro: number;

  /**
   * Valor restante disponível
   */
  saldoRestante: number;

  /**
   * Percentual de uso (0-100)
   */
  percentualUsado: number;

  /**
   * Se atingiu o limite
   */
  limiteAtingido: boolean;

  /**
   * Total de transações realizadas
   */
  totalTransacoes: number;

  /**
   * Se é uma conta de teste (QA)
   * Contas teste têm acesso ilimitado e não contam como receita
   */
  isTestAccount: boolean;
}

/**
 * Busca o uso financeiro do usuário
 * Calcula quanto já foi gasto e quanto ainda resta do free trial
 * Considera crédito extra concedido pelo admin
 * Contas de teste têm acesso ilimitado
 */
export async function getUsageFinanceiro(userId: string): Promise<UsageFinanceiro> {
  const db = getDB();

  // Busca todas as transações do usuário
  const [resultado] = await db
    .select({
      totalGasto: sql<string>`COALESCE(SUM(${transacoes.valorCobrado}), 0)`,
      totalTransacoes: sql<number>`COUNT(*)::int`,
    })
    .from(transacoes)
    .where(eq(transacoes.userId, userId));

  // Busca o crédito extra e se é conta de teste
  const [usuario] = await db
    .select({
      creditoExtra: users.creditoExtra,
      isTestAccount: users.isTestAccount,
    })
    .from(users)
    .where(eq(users.id, userId));

  const totalGasto = parseFloat(resultado?.totalGasto || "0");
  const totalTransacoes = resultado?.totalTransacoes || 0;
  const creditoExtra = parseFloat(usuario?.creditoExtra || "0");
  const isContaTeste = usuario?.isTestAccount || false;

  // Contas de teste têm limite infinito (999999)
  // Limite financeiro = limite base + crédito extra concedido pelo admin
  const limiteFinanceiro = isContaTeste
    ? 999999
    : FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO + creditoExtra;

  const saldoRestante = Math.max(0, limiteFinanceiro - totalGasto);
  const percentualUsado = isContaTeste
    ? 0
    : (limiteFinanceiro > 0 ? Math.min(100, (totalGasto / limiteFinanceiro) * 100) : 0);

  // Contas de teste nunca atingem o limite
  const limiteAtingido = isContaTeste ? false : totalGasto >= limiteFinanceiro;

  return {
    totalGasto,
    limiteFinanceiro,
    saldoRestante,
    percentualUsado,
    limiteAtingido,
    totalTransacoes,
    isTestAccount: isContaTeste,
  };
}

/**
 * Busca detalhes das faturas do usuário
 */
export async function getFaturasResumo(userId: string) {
  const db = getDB();

  const faturasUsuario = await db
    .select({
      id: faturas.id,
      mesReferencia: faturas.mesReferencia,
      anoReferencia: faturas.anoReferencia,
      valorTotal: faturas.valorTotal,
      valorPago: faturas.valorPago,
      status: faturas.status,
      totalEntrevistas: faturas.totalEntrevistas,
      totalCandidatos: faturas.totalCandidatos,
      totalRespostas: faturas.totalRespostas,
      totalTransacoes: faturas.totalTransacoes,
      dataAbertura: faturas.dataAbertura,
      dataVencimento: faturas.dataVencimento,
    })
    .from(faturas)
    .where(eq(faturas.userId, userId))
    .orderBy(sql`${faturas.anoReferencia} DESC, ${faturas.mesReferencia} DESC`)
    .limit(12); // Últimos 12 meses

  return faturasUsuario;
}

/**
 * Busca as últimas transações do usuário
 */
export async function getTransacoesRecentes(userId: string, limit: number = 10) {
  const db = getDB();

  const transacoesRecentes = await db
    .select({
      id: transacoes.id,
      tipo: transacoes.tipo,
      valorCobrado: transacoes.valorCobrado,
      custoBase: transacoes.custoBase,
      descricao: transacoes.descricao,
      status: transacoes.status,
      createdAt: transacoes.createdAt,
      metadados: transacoes.metadados,
    })
    .from(transacoes)
    .where(eq(transacoes.userId, userId))
    .orderBy(sql`${transacoes.createdAt} DESC`)
    .limit(limit);

  return transacoesRecentes;
}

/**
 * Verifica se o usuário pode realizar uma operação que gera custo
 * Contas de teste sempre podem realizar operações
 */
export async function canRealizarOperacao(
  userId: string,
  custoEstimado: number
): Promise<{ allowed: boolean; reason?: string; isTestAccount?: boolean }> {
  const usage = await getUsageFinanceiro(userId);

  // Contas de teste sempre podem realizar operações
  if (usage.isTestAccount) {
    return { allowed: true, isTestAccount: true };
  }

  // Se já atingiu o limite
  if (usage.limiteAtingido) {
    return {
      allowed: false,
      reason: `Limite de uso gratuito atingido (R$ ${usage.limiteFinanceiro.toFixed(2)}). Faça upgrade do seu plano.`,
    };
  }

  // Se a operação vai ultrapassar o limite
  if (usage.totalGasto + custoEstimado > usage.limiteFinanceiro) {
    return {
      allowed: false,
      reason: `Esta operação custaria R$ ${custoEstimado.toFixed(2)}, mas você só tem R$ ${usage.saldoRestante.toFixed(2)} disponível. Faça upgrade do seu plano.`,
    };
  }

  return { allowed: true };
}

/**
 * Tipo de transação suportado
 */
export type TipoTransacao =
  | "transcricao_audio"
  | "analise_ia"
  | "analise_pergunta"
  | "taxa_base_candidato"
  | "pergunta_criada"
  | "entrevista_criada";

/**
 * Registra uma transação de cobrança
 */
export async function registrarTransacao(params: {
  userId: string;
  tipo: TipoTransacao;
  entrevistaId?: string;
  respostaId?: string;
  descricao?: string;
  metadados?: {
    modeloIA?: string;
    tokensEntrada?: number;
    tokensSaida?: number;
    duracaoAudio?: number;
    tamanhoArquivo?: number;
    tentativas?: number;
    perguntaId?: string;
    perguntaTexto?: string;
    totalPerguntas?: number;
  };
}): Promise<{ success: boolean; transacaoId?: string; error?: string }> {
  const db = getDB();

  // Log início da tentativa de registro
  logger.debug("[BILLING] Iniciando registro de transação", {
    userId: params.userId,
    tipo: params.tipo,
    entrevistaId: params.entrevistaId,
    respostaId: params.respostaId,
  });

  try {
    // Calcula custo base e valor cobrado baseado no tipo
    let custoBase: number;
    let valorCobrado: number;

    switch (params.tipo) {
      case "taxa_base_candidato":
        // Taxa base cobrada uma vez por candidato avaliado
        custoBase = 0.10; // Custo interno estimado
        valorCobrado = PRECOS_USUARIO.taxaBasePorCandidato; // R$ 1,00
        break;
      case "analise_pergunta":
        // Taxa por cada pergunta analisada
        custoBase = calcularCustoAnalise(
          USAGE_ESTIMATES_ANALISE_PERGUNTA.input,
          USAGE_ESTIMATES_ANALISE_PERGUNTA.output
        );
        valorCobrado = PRECOS_USUARIO.analisePorPergunta; // R$ 0,25
        break;
      case "transcricao_audio":
        // Transcrição incluída (grátis)
        custoBase = 0.01;
        valorCobrado = 0;
        break;
      case "analise_ia":
        // Análise incluída na taxa por pergunta (grátis separadamente)
        custoBase = 0.01;
        valorCobrado = 0;
        break;
      case "pergunta_criada":
        // Criar pergunta é grátis
        custoBase = 0;
        valorCobrado = 0;
        break;
      case "entrevista_criada":
        // Criar entrevista é grátis
        custoBase = 0;
        valorCobrado = 0;
        break;
      default:
        custoBase = 0;
        valorCobrado = 0;
    }

    // Se o valor cobrado for 0, não registra transação
    if (valorCobrado === 0) {
      logger.debug("[BILLING] Transação com valor R$ 0,00 - não será registrada", {
        userId: params.userId,
        tipo: params.tipo,
        entrevistaId: params.entrevistaId,
      });
      return { success: true, transacaoId: undefined };
    }

    // Log do valor que será cobrado
    logger.info("[BILLING] Registrando cobrança", {
      userId: params.userId,
      tipo: params.tipo,
      valorCobrado: valorCobrado.toFixed(2),
      custoBase: custoBase.toFixed(6),
      entrevistaId: params.entrevistaId,
      descricao: params.descricao,
    });

    // Busca ou cria a fatura do mês atual
    const now = new Date();
    const mesAtual = now.getMonth() + 1;
    const anoAtual = now.getFullYear();

    let [faturaAtual] = await db
      .select({ id: faturas.id })
      .from(faturas)
      .where(
        and(
          eq(faturas.userId, params.userId),
          eq(faturas.mesReferencia, mesAtual),
          eq(faturas.anoReferencia, anoAtual)
        )
      )
      .limit(1);

    // Cria fatura se não existir
    if (!faturaAtual) {
      const [novaFatura] = await db
        .insert(faturas)
        .values({
          userId: params.userId,
          mesReferencia: mesAtual,
          anoReferencia: anoAtual,
          valorTotal: "0.00",
          valorPago: "0.00",
          status: "aberta",
        })
        .returning({ id: faturas.id });
      faturaAtual = novaFatura;
    }

    // Cria a transação
    const [transacao] = await db
      .insert(transacoes)
      .values({
        userId: params.userId,
        faturaId: faturaAtual.id,
        entrevistaId: params.entrevistaId,
        respostaId: params.respostaId,
        tipo: params.tipo,
        custoBase: custoBase.toFixed(6),
        markup: "2.5",
        valorCobrado: valorCobrado.toFixed(2),
        descricao: params.descricao,
        metadados: params.metadados,
        status: "concluida",
        processadaEm: new Date(),
      })
      .returning({ id: transacoes.id });

    // Atualiza o valor total da fatura
    await db
      .update(faturas)
      .set({
        valorTotal: sql`${faturas.valorTotal}::numeric + ${valorCobrado}`,
        totalTransacoes: sql`COALESCE(${faturas.totalTransacoes}, 0) + 1`,
        updatedAt: new Date(),
      })
      .where(eq(faturas.id, faturaAtual.id));

    logger.info("[BILLING] ✅ Transação registrada com sucesso", {
      transacaoId: transacao.id,
      faturaId: faturaAtual.id,
      userId: params.userId,
      valorCobrado: valorCobrado.toFixed(2),
      tipo: params.tipo,
    });

    return { success: true, transacaoId: transacao.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Log crítico com todos os detalhes
    logger.error("[BILLING] ❌ ERRO CRÍTICO ao registrar transação", {
      error: errorMessage,
      userId: params.userId,
      tipo: params.tipo,
      valorCobrado,
      entrevistaId: params.entrevistaId,
      respostaId: params.respostaId,
    });

    // Registra no sistema de erros do admin
    await logSystemError({
      level: "critical",
      component: "billing:registrarTransacao",
      message: `Falha ao registrar transação de billing - Usuário: ${params.userId}`,
      errorMessage: errorMessage,
      errorStack: errorStack,
      userId: params.userId,
      context: {
        tipo: params.tipo,
        valorCobrado,
        custoBase,
        entrevistaId: params.entrevistaId,
        respostaId: params.respostaId,
        descricao: params.descricao,
        metadados: params.metadados,
      },
      createTicket: true, // Cria ticket automaticamente pois é crítico
    }).catch((logError) => {
      // Se falhar ao logar o erro, pelo menos registra no console
      console.error("[BILLING] Falha ao registrar erro no sistema:", logError);
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Registra cobrança completa de análise de candidato
 * Modelo: Taxa base por candidato (R$ 1,00) + Por pergunta analisada (R$ 0,25)
 */
export async function registrarAnalisePerguntas(params: {
  userId: string;
  entrevistaId: string;
  perguntas: Array<{
    perguntaId: string;
    perguntaTexto: string;
    respostaId?: string;
  }>;
}): Promise<{ success: boolean; totalCobrado: number; error?: string }> {
  // Log início do processo de cobrança
  logger.info("[BILLING] Iniciando cobrança de análise de candidato", {
    userId: params.userId,
    entrevistaId: params.entrevistaId,
    totalPerguntas: params.perguntas.length,
  });

  let totalCobrado = 0;
  let transacoesRegistradas = 0;
  let falhasRegistro = 0;

  // 1. Cobra taxa base por candidato (R$ 1,00)
  const taxaBaseResult = await registrarTransacao({
    userId: params.userId,
    tipo: "taxa_base_candidato",
    entrevistaId: params.entrevistaId,
    descricao: `Taxa base - análise de candidato`,
    metadados: {
      totalPerguntas: params.perguntas.length,
    },
  });

  if (taxaBaseResult.success) {
    totalCobrado += PRECOS_USUARIO.taxaBasePorCandidato;
    transacoesRegistradas++;
    logger.debug("[BILLING] Taxa base registrada com sucesso", {
      transacaoId: taxaBaseResult.transacaoId,
      valor: PRECOS_USUARIO.taxaBasePorCandidato,
    });
  } else {
    falhasRegistro++;
    logger.error("[BILLING] ❌ Falha ao registrar taxa base", {
      error: taxaBaseResult.error,
      userId: params.userId,
      entrevistaId: params.entrevistaId,
    });

    // Log erro crítico se falhar a taxa base
    await logSystemError({
      level: "critical",
      component: "billing:registrarAnalisePerguntas",
      message: "Falha ao registrar taxa base de candidato",
      errorMessage: taxaBaseResult.error,
      userId: params.userId,
      context: {
        entrevistaId: params.entrevistaId,
        etapa: "taxa_base",
      },
      createTicket: true,
    }).catch(console.error);
  }

  // 2. Cobra por cada pergunta analisada (R$ 0,25 cada)
  for (const pergunta of params.perguntas) {
    const result = await registrarTransacao({
      userId: params.userId,
      tipo: "analise_pergunta",
      entrevistaId: params.entrevistaId,
      respostaId: pergunta.respostaId,
      descricao: `Análise: ${pergunta.perguntaTexto.substring(0, 50)}...`,
      metadados: {
        modeloIA: "claude-sonnet-4-5-20250929",
        tokensEntrada: USAGE_ESTIMATES_ANALISE_PERGUNTA.input,
        tokensSaida: USAGE_ESTIMATES_ANALISE_PERGUNTA.output,
        perguntaId: pergunta.perguntaId,
        perguntaTexto: pergunta.perguntaTexto,
      },
    });

    if (result.success) {
      totalCobrado += PRECOS_USUARIO.analisePorPergunta;
      transacoesRegistradas++;
    } else {
      falhasRegistro++;
      logger.error("[BILLING] ❌ Falha ao registrar cobrança de pergunta", {
        error: result.error,
        perguntaId: pergunta.perguntaId,
        userId: params.userId,
        entrevistaId: params.entrevistaId,
      });
    }
  }

  // Log final do processo
  const totalEsperado = PRECOS_USUARIO.taxaBasePorCandidato + (PRECOS_USUARIO.analisePorPergunta * params.perguntas.length);

  logger.info("[BILLING] ✅ Processo de cobrança concluído", {
    userId: params.userId,
    entrevistaId: params.entrevistaId,
    totalCobrado: totalCobrado.toFixed(2),
    totalEsperado: totalEsperado.toFixed(2),
    transacoesRegistradas,
    falhasRegistro,
    totalPerguntas: params.perguntas.length,
  });

  // Se houve falhas, registra erro crítico
  if (falhasRegistro > 0) {
    await logSystemError({
      level: "critical",
      component: "billing:registrarAnalisePerguntas",
      message: `${falhasRegistro} transação(ões) de billing falharam durante análise`,
      userId: params.userId,
      context: {
        entrevistaId: params.entrevistaId,
        totalPerguntas: params.perguntas.length,
        transacoesRegistradas,
        falhasRegistro,
        totalCobrado,
        totalEsperado,
        diferencaValor: totalEsperado - totalCobrado,
      },
      createTicket: true,
    }).catch(console.error);
  }

  return {
    success: falhasRegistro === 0,
    totalCobrado,
    error: falhasRegistro > 0 ? `${falhasRegistro} transação(ões) falharam` : undefined,
  };
}
