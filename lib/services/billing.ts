import { getDB } from "@/lib/db";
import { transacoes, faturas } from "@/lib/db/schema/transacoes";
import { eq, sql } from "drizzle-orm";
import { FREE_TRIAL_LIMITS } from "@/lib/config/free-trial";

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

  const totalGasto = parseFloat(resultado?.totalGasto || "0");
  const totalTransacoes = resultado?.totalTransacoes || 0;
  const limiteFinanceiro = FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO;
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
