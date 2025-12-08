"use server";

import { auth } from "@/auth";
import { getUsageFinanceiro, getFaturasResumo, getTransacoesRecentes } from "@/lib/services/billing";
import { checkUsageLimits } from "@/lib/services/plan-limits";

/**
 * Busca dados de uso financeiro do usuário autenticado
 */
export async function getUsageData() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const [usageFinanceiro, usageLimits] = await Promise.all([
      getUsageFinanceiro(session.user.id),
      checkUsageLimits(session.user.id),
    ]);

    return {
      success: true,
      data: {
        financeiro: usageFinanceiro,
        limits: usageLimits,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados de uso:", error);
    return {
      success: false,
      error: "Erro ao buscar dados de uso",
    };
  }
}

/**
 * Busca faturas do usuário autenticado
 */
export async function getFaturas() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const faturas = await getFaturasResumo(session.user.id);

    return {
      success: true,
      data: faturas,
    };
  } catch (error) {
    console.error("Erro ao buscar faturas:", error);
    return {
      success: false,
      error: "Erro ao buscar faturas",
    };
  }
}

/**
 * Busca transações recentes do usuário autenticado
 */
export async function getTransacoes(limit: number = 10) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const transacoes = await getTransacoesRecentes(session.user.id, limit);

    return {
      success: true,
      data: transacoes,
    };
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return {
      success: false,
      error: "Erro ao buscar transações",
    };
  }
}
