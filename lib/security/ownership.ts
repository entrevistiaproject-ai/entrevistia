/**
 * Sistema de Verificação de Ownership (Propriedade de Recursos)
 *
 * Garante que usuários só possam acessar/modificar seus próprios recursos.
 * Implementa o princípio de "menor privilégio" - usuários só veem o que é deles.
 *
 * Recursos principais e suas relações:
 * - Entrevistas: pertencem diretamente ao usuário (entrevistas.userId)
 * - Candidatos: pertencem diretamente ao usuário (candidatos.userId)
 * - Faturas: pertencem diretamente ao usuário (faturas.userId)
 * - Perguntas Templates: pertencem ao usuário OU são do sistema (perguntasTemplates.userId)
 * - Perguntas: pertencem à entrevista (perguntas.entrevistaId -> entrevistas.userId)
 * - Respostas: pertencem à entrevista (respostas.entrevistaId -> entrevistas.userId)
 */

import { db } from "@/lib/db";
import {
  entrevistas,
  candidatos,
  faturas,
  perguntasTemplates,
  perguntas,
  candidatoEntrevistas,
} from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";

// ============ TIPOS ============

export interface OwnershipCheckResult {
  authorized: boolean;
  userId?: string;
  resource?: unknown;
  error?: string;
}

export interface AuthResult {
  authenticated: boolean;
  userId: string | null;
}

// ============ RESPOSTAS PADRONIZADAS ============

/**
 * Resposta padrão para usuário não autenticado (401)
 */
export function unauthorizedResponse(message = "Não autenticado") {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}

/**
 * Resposta padrão para acesso negado (403)
 * Usado quando o usuário está autenticado mas não tem permissão
 */
export function forbiddenResponse(message = "Acesso negado") {
  return NextResponse.json(
    { error: message },
    { status: 403 }
  );
}

/**
 * Resposta padrão para recurso não encontrado (404)
 * IMPORTANTE: Usamos 404 ao invés de 403 para não revelar
 * a existência de recursos que não pertencem ao usuário
 */
export function notFoundResponse(message = "Recurso não encontrado") {
  return NextResponse.json(
    { error: message },
    { status: 404 }
  );
}

// ============ VERIFICAÇÃO DE AUTENTICAÇÃO ============

/**
 * Verifica se o usuário está autenticado
 * @returns O userId se autenticado, null caso contrário
 */
export async function checkAuth(): Promise<AuthResult> {
  const userId = await getUserId();
  return {
    authenticated: !!userId,
    userId,
  };
}

/**
 * Helper que retorna resposta de erro se não autenticado
 * @returns O userId ou uma Response de erro
 */
export async function requireAuthentication(): Promise<string | NextResponse> {
  const userId = await getUserId();
  if (!userId) {
    return unauthorizedResponse();
  }
  return userId;
}

// ============ VERIFICAÇÃO DE OWNERSHIP - RECURSOS PRIMÁRIOS ============

/**
 * Verifica se uma entrevista pertence ao usuário
 * @param entrevistaId - ID da entrevista
 * @param userId - ID do usuário
 * @returns A entrevista se pertencer ao usuário, null caso contrário
 */
export async function checkEntrevistaOwnership(
  entrevistaId: string,
  userId: string
) {
  const [entrevista] = await db
    .select()
    .from(entrevistas)
    .where(
      and(
        eq(entrevistas.id, entrevistaId),
        eq(entrevistas.userId, userId),
        isNull(entrevistas.deletedAt)
      )
    )
    .limit(1);

  return entrevista || null;
}

/**
 * Verifica se um candidato pertence ao usuário
 * @param candidatoId - ID do candidato
 * @param userId - ID do usuário
 * @returns O candidato se pertencer ao usuário, null caso contrário
 */
export async function checkCandidatoOwnership(
  candidatoId: string,
  userId: string
) {
  const [candidato] = await db
    .select()
    .from(candidatos)
    .where(
      and(
        eq(candidatos.id, candidatoId),
        eq(candidatos.userId, userId)
      )
    )
    .limit(1);

  return candidato || null;
}

/**
 * Verifica se uma fatura pertence ao usuário
 * @param faturaId - ID da fatura
 * @param userId - ID do usuário
 * @returns A fatura se pertencer ao usuário, null caso contrário
 */
export async function checkFaturaOwnership(
  faturaId: string,
  userId: string
) {
  const [fatura] = await db
    .select()
    .from(faturas)
    .where(
      and(
        eq(faturas.id, faturaId),
        eq(faturas.userId, userId)
      )
    )
    .limit(1);

  return fatura || null;
}

/**
 * Verifica se uma pergunta template pertence ao usuário
 * Perguntas padrão do sistema (userId = null, isPadrao = true) podem ser vistas por todos
 * Perguntas do usuário só podem ser vistas/editadas por ele
 *
 * @param perguntaId - ID da pergunta template
 * @param userId - ID do usuário
 * @param allowSystemTemplates - Se true, permite acesso a templates do sistema
 * @returns A pergunta se pertencer ao usuário ou for do sistema, null caso contrário
 */
export async function checkPerguntaTemplateOwnership(
  perguntaId: string,
  userId: string,
  allowSystemTemplates = true
) {
  const [pergunta] = await db
    .select()
    .from(perguntasTemplates)
    .where(eq(perguntasTemplates.id, perguntaId))
    .limit(1);

  if (!pergunta) return null;

  // Se é pergunta do sistema e permitimos acesso a templates do sistema
  if (pergunta.isPadrao && allowSystemTemplates) {
    return pergunta;
  }

  // Se é pergunta do usuário
  if (pergunta.userId === userId) {
    return pergunta;
  }

  return null;
}

/**
 * Verifica se uma pergunta template pode ser editada pelo usuário
 * Perguntas padrão do sistema NÃO podem ser editadas
 *
 * @param perguntaId - ID da pergunta template
 * @param userId - ID do usuário
 * @returns A pergunta se puder ser editada, null caso contrário
 */
export async function checkPerguntaTemplateEditPermission(
  perguntaId: string,
  userId: string
) {
  const [pergunta] = await db
    .select()
    .from(perguntasTemplates)
    .where(eq(perguntasTemplates.id, perguntaId))
    .limit(1);

  if (!pergunta) return null;

  // Perguntas padrão do sistema não podem ser editadas
  if (pergunta.isPadrao) {
    return null;
  }

  // Verifica ownership
  if (pergunta.userId !== userId) {
    return null;
  }

  return pergunta;
}

// ============ VERIFICAÇÃO DE OWNERSHIP - RECURSOS SECUNDÁRIOS ============

/**
 * Verifica se uma pergunta (de entrevista específica) pertence ao usuário
 * Verifica via entrevista.userId
 *
 * @param perguntaId - ID da pergunta
 * @param userId - ID do usuário
 * @returns A pergunta com dados da entrevista se pertencer ao usuário
 */
export async function checkPerguntaOwnership(
  perguntaId: string,
  userId: string
) {
  const result = await db
    .select({
      pergunta: perguntas,
      entrevista: entrevistas,
    })
    .from(perguntas)
    .innerJoin(entrevistas, eq(perguntas.entrevistaId, entrevistas.id))
    .where(
      and(
        eq(perguntas.id, perguntaId),
        eq(entrevistas.userId, userId),
        isNull(entrevistas.deletedAt)
      )
    )
    .limit(1);

  return result[0] || null;
}

/**
 * Verifica se uma participação de candidato em entrevista pertence ao usuário
 * Verifica via entrevista.userId E candidato.userId (ambos devem pertencer)
 *
 * @param candidatoId - ID do candidato
 * @param entrevistaId - ID da entrevista
 * @param userId - ID do usuário
 * @returns A participação se pertencer ao usuário
 */
export async function checkParticipacaoOwnership(
  candidatoId: string,
  entrevistaId: string,
  userId: string
) {
  // Verifica se a entrevista pertence ao usuário
  const entrevista = await checkEntrevistaOwnership(entrevistaId, userId);
  if (!entrevista) return null;

  // Verifica se o candidato pertence ao usuário
  const candidato = await checkCandidatoOwnership(candidatoId, userId);
  if (!candidato) return null;

  // Verifica se existe a participação
  const [participacao] = await db
    .select()
    .from(candidatoEntrevistas)
    .where(
      and(
        eq(candidatoEntrevistas.candidatoId, candidatoId),
        eq(candidatoEntrevistas.entrevistaId, entrevistaId)
      )
    )
    .limit(1);

  if (!participacao) return null;

  return {
    participacao,
    entrevista,
    candidato,
  };
}

// ============ HELPERS DE ALTO NÍVEL PARA ROTAS ============

/**
 * Helper completo para rotas que precisam de autenticação + ownership de entrevista
 * @returns O userId e a entrevista, ou uma Response de erro
 */
export async function requireEntrevistaAccess(
  entrevistaId: string
): Promise<{ userId: string; entrevista: typeof entrevistas.$inferSelect } | NextResponse> {
  const authResult = await requireAuthentication();
  if (authResult instanceof NextResponse) return authResult;

  const userId = authResult;
  const entrevista = await checkEntrevistaOwnership(entrevistaId, userId);

  if (!entrevista) {
    return notFoundResponse("Entrevista não encontrada");
  }

  return { userId, entrevista };
}

/**
 * Helper completo para rotas que precisam de autenticação + ownership de candidato
 * @returns O userId e o candidato, ou uma Response de erro
 */
export async function requireCandidatoAccess(
  candidatoId: string
): Promise<{ userId: string; candidato: typeof candidatos.$inferSelect } | NextResponse> {
  const authResult = await requireAuthentication();
  if (authResult instanceof NextResponse) return authResult;

  const userId = authResult;
  const candidato = await checkCandidatoOwnership(candidatoId, userId);

  if (!candidato) {
    return notFoundResponse("Candidato não encontrado");
  }

  return { userId, candidato };
}

/**
 * Helper completo para rotas que precisam de autenticação + ownership de fatura
 * @returns O userId e a fatura, ou uma Response de erro
 */
export async function requireFaturaAccess(
  faturaId: string
): Promise<{ userId: string; fatura: typeof faturas.$inferSelect } | NextResponse> {
  const authResult = await requireAuthentication();
  if (authResult instanceof NextResponse) return authResult;

  const userId = authResult;
  const fatura = await checkFaturaOwnership(faturaId, userId);

  if (!fatura) {
    return notFoundResponse("Fatura não encontrada");
  }

  return { userId, fatura };
}

/**
 * Helper completo para rotas que precisam de autenticação + ownership de pergunta template
 * @param allowSystemTemplates - Se true, permite acesso a templates do sistema (default: true)
 * @returns O userId e a pergunta, ou uma Response de erro
 */
export async function requirePerguntaTemplateAccess(
  perguntaId: string,
  allowSystemTemplates = true
): Promise<{ userId: string; pergunta: typeof perguntasTemplates.$inferSelect } | NextResponse> {
  const authResult = await requireAuthentication();
  if (authResult instanceof NextResponse) return authResult;

  const userId = authResult;
  const pergunta = await checkPerguntaTemplateOwnership(perguntaId, userId, allowSystemTemplates);

  if (!pergunta) {
    return notFoundResponse("Pergunta não encontrada");
  }

  return { userId, pergunta };
}

/**
 * Helper para rotas que precisam verificar se o usuário pode editar uma pergunta template
 * @returns O userId e a pergunta, ou uma Response de erro
 */
export async function requirePerguntaTemplateEditAccess(
  perguntaId: string
): Promise<{ userId: string; pergunta: typeof perguntasTemplates.$inferSelect } | NextResponse> {
  const authResult = await requireAuthentication();
  if (authResult instanceof NextResponse) return authResult;

  const userId = authResult;
  const pergunta = await checkPerguntaTemplateEditPermission(perguntaId, userId);

  if (!pergunta) {
    return notFoundResponse("Pergunta não encontrada ou não pode ser editada");
  }

  return { userId, pergunta };
}

/**
 * Helper para rotas que precisam de autenticação + ownership de participação
 * @returns Os dados da participação, ou uma Response de erro
 */
export async function requireParticipacaoAccess(
  candidatoId: string,
  entrevistaId: string
): Promise<{
  userId: string;
  participacao: typeof candidatoEntrevistas.$inferSelect;
  entrevista: typeof entrevistas.$inferSelect;
  candidato: typeof candidatos.$inferSelect;
} | NextResponse> {
  const authResult = await requireAuthentication();
  if (authResult instanceof NextResponse) return authResult;

  const userId = authResult;
  const result = await checkParticipacaoOwnership(candidatoId, entrevistaId, userId);

  if (!result) {
    return notFoundResponse("Participação não encontrada");
  }

  return { userId, ...result };
}

// ============ UTILITÁRIOS ============

/**
 * Verifica se um resultado de helper é uma Response de erro
 */
export function isErrorResponse(result: unknown): result is NextResponse {
  return result instanceof NextResponse;
}

/**
 * Log de tentativa de acesso não autorizado (para auditoria)
 */
export function logUnauthorizedAccess(
  userId: string | null,
  resourceType: string,
  resourceId: string,
  action: string
) {
  console.warn(`[SECURITY] Tentativa de acesso não autorizado:`, {
    userId,
    resourceType,
    resourceId,
    action,
    timestamp: new Date().toISOString(),
  });
}
