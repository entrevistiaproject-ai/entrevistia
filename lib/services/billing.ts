import { getDB } from "@/lib/db";
import { transacoes, faturas, NewTransacao } from "@/lib/db/schema/transacoes";
import { users } from "@/lib/db/schema/users";
import { eq, sql, and } from "drizzle-orm";
import { FREE_TRIAL_LIMITS } from "@/lib/config/free-trial";
import { PRECOS_USUARIO, calcularCustoAnalise, USAGE_ESTIMATES_ANALISE_PERGUNTA } from "@/lib/config/pricing";

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
}

/**
 * Busca o uso financeiro do usuário
 * Calcula quanto já foi gasto e quanto ainda resta do free trial
 * Considera crédito extra concedido pelo admin
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

  // Busca o crédito extra do usuário
  const [usuario] = await db
    .select({ creditoExtra: users.creditoExtra })
    .from(users)
    .where(eq(users.id, userId));

  const totalGasto = parseFloat(resultado?.totalGasto || "0");
  const totalTransacoes = resultado?.totalTransacoes || 0;
  const creditoExtra = parseFloat(usuario?.creditoExtra || "0");

  // Limite financeiro = limite base + crédito extra concedido pelo admin
  const limiteFinanceiro = FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO + creditoExtra;
  const saldoRestante = Math.max(0, limiteFinanceiro - totalGasto);
  const percentualUsado = limiteFinanceiro > 0
    ? Math.min(100, (totalGasto / limiteFinanceiro) * 100)
    : 0;
  const limiteAtingido = totalGasto >= limiteFinanceiro;

  return {
    totalGasto,
    limiteFinanceiro,
    saldoRestante,
    percentualUsado,
    limiteAtingido,
    totalTransacoes,
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
 */
export async function canRealizarOperacao(
  userId: string,
  custoEstimado: number
): Promise<{ allowed: boolean; reason?: string }> {
  const usage = await getUsageFinanceiro(userId);

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
      return { success: true, transacaoId: undefined };
    }

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

    return { success: true, transacaoId: transacao.id };
  } catch (error) {
    console.error("Erro ao registrar transação:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
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
  let totalCobrado = 0;

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
    }
  }

  return { success: true, totalCobrado };
}
