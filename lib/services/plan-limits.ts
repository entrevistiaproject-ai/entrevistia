import { getDB } from "@/lib/db";
import { users, entrevistas, candidatos, candidatoEntrevistas, perguntas } from "@/lib/db/schema";
import { eq, and, isNull, count, sql } from "drizzle-orm";
import { PLAN_LIMITS, PlanType } from "@/lib/config/free-trial";

export interface UsageLimits {
  entrevistas: {
    used: number;
    limit: number | null;
    canCreate: boolean;
  };
  perguntas: {
    used: number;
    limit: number | null;
    canCreate: boolean;
  };
  candidatos: {
    used: number;
    limit: number | null;
    canCreate: boolean;
  };
}

/**
 * Busca informações do plano do usuário
 */
export async function getUserPlan(userId: string) {
  const db = getDB();
  const [user] = await db
    .select({
      planType: users.planType,
      planStatus: users.planStatus,
      planExpiresAt: users.planExpiresAt,
      usageEntrevistas: users.usageEntrevistas,
      usageCandidatos: users.usageCandidatos,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}

/**
 * Obtém os limites do plano do usuário
 */
export function getPlanLimits(planType: string) {
  return PLAN_LIMITS[planType as PlanType] || PLAN_LIMITS[PlanType.FREE_TRIAL];
}

/**
 * Verifica os limites de uso do usuário
 */
export async function checkUsageLimits(userId: string): Promise<UsageLimits> {
  const db = getDB();
  const user = await getUserPlan(userId);
  const limits = getPlanLimits(user.planType);

  // Conta entrevistas ativas (não deletadas)
  const [entrevistasCount] = await db
    .select({ count: count() })
    .from(entrevistas)
    .where(and(eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)));

  // Conta candidatos únicos que participaram de pelo menos uma entrevista
  const [candidatosCount] = await db
    .select({ count: sql<number>`COUNT(DISTINCT ${candidatoEntrevistas.candidatoId})::int` })
    .from(candidatoEntrevistas)
    .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
    .where(and(eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)));

  const entrevistasUsed = entrevistasCount?.count || 0;
  const candidatosUsed = candidatosCount?.count || 0;

  return {
    entrevistas: {
      used: entrevistasUsed,
      limit: limits.maxEntrevistas,
      canCreate: limits.maxEntrevistas === null || entrevistasUsed < limits.maxEntrevistas,
    },
    perguntas: {
      used: 0, // Será verificado por entrevista
      limit: limits.maxPerguntasPorEntrevista,
      canCreate: true,
    },
    candidatos: {
      used: candidatosUsed,
      limit: limits.maxCandidatosTotal,
      canCreate: limits.maxCandidatosTotal === null || candidatosUsed < limits.maxCandidatosTotal,
    },
  };
}

/**
 * Verifica se pode criar uma nova entrevista
 */
export async function canCreateEntrevista(userId: string): Promise<{ allowed: boolean; reason?: string }> {
  const usage = await checkUsageLimits(userId);

  if (!usage.entrevistas.canCreate) {
    return {
      allowed: false,
      reason: `Limite de ${usage.entrevistas.limit} entrevistas atingido. Faça upgrade do seu plano.`,
    };
  }

  return { allowed: true };
}

/**
 * Verifica se pode adicionar perguntas em uma entrevista
 */
export async function canAddPerguntas(
  userId: string,
  entrevistaId: string,
  quantidadeNova: number
): Promise<{ allowed: boolean; reason?: string }> {
  const db = getDB();
  const user = await getUserPlan(userId);
  const limits = getPlanLimits(user.planType);

  // Se o plano permite perguntas ilimitadas
  if (limits.maxPerguntasPorEntrevista === null) {
    return { allowed: true };
  }

  // Conta perguntas existentes na entrevista
  const [perguntasCount] = await db
    .select({ count: count() })
    .from(perguntas)
    .where(eq(perguntas.entrevistaId, entrevistaId));

  const perguntasExistentes = perguntasCount?.count || 0;
  const totalPerguntas = perguntasExistentes + quantidadeNova;

  if (totalPerguntas > limits.maxPerguntasPorEntrevista) {
    return {
      allowed: false,
      reason: `Limite de ${limits.maxPerguntasPorEntrevista} perguntas por entrevista atingido. Você tem ${perguntasExistentes} perguntas e está tentando adicionar ${quantidadeNova}.`,
    };
  }

  return { allowed: true };
}

/**
 * Verifica se pode adicionar um novo candidato
 */
export async function canAddCandidato(userId: string): Promise<{ allowed: boolean; reason?: string }> {
  const usage = await checkUsageLimits(userId);

  if (!usage.candidatos.canCreate) {
    return {
      allowed: false,
      reason: `Limite de ${usage.candidatos.limit} candidatos atingido. Faça upgrade do seu plano.`,
    };
  }

  return { allowed: true };
}

/**
 * Verifica se um candidato já participou de uma entrevista
 */
export async function candidatoJaParticipou(
  candidatoId: string,
  entrevistaId: string
): Promise<{ participou: boolean; podeRefazer: boolean }> {
  const db = getDB();

  const [participacao] = await db
    .select({
      status: candidatoEntrevistas.status,
      podeRefazer: candidatoEntrevistas.podeRefazer,
      completouEm: candidatoEntrevistas.completouEm,
    })
    .from(candidatoEntrevistas)
    .where(
      and(
        eq(candidatoEntrevistas.candidatoId, candidatoId),
        eq(candidatoEntrevistas.entrevistaId, entrevistaId)
      )
    )
    .limit(1);

  if (!participacao) {
    return { participou: false, podeRefazer: false };
  }

  // Se completou e não pode refazer, bloqueia
  if (participacao.completouEm && !participacao.podeRefazer) {
    return { participou: true, podeRefazer: false };
  }

  // Se pode refazer ou ainda não completou
  return { participou: true, podeRefazer: participacao.podeRefazer || false };
}

/**
 * Incrementa o contador de entrevistas do usuário
 */
export async function incrementEntrevistasCount(userId: string): Promise<void> {
  const db = getDB();
  await db
    .update(users)
    .set({
      usageEntrevistas: sql`${users.usageEntrevistas} + 1`,
    })
    .where(eq(users.id, userId));
}

/**
 * Decrementa o contador de entrevistas do usuário (quando deletar)
 */
export async function decrementEntrevistasCount(userId: string): Promise<void> {
  const db = getDB();
  await db
    .update(users)
    .set({
      usageEntrevistas: sql`GREATEST(0, ${users.usageEntrevistas} - 1)`,
    })
    .where(eq(users.id, userId));
}
