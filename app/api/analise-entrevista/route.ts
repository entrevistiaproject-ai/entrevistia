import { NextRequest, NextResponse } from 'next/server';
import { analyzeInterview } from '@/lib/ai/agent';
import { processAutoDecisionForCandidate } from '@/lib/ai/process-auto-decision';
import { getDB } from '@/lib/db';
import { candidatos, candidatoEntrevistas, entrevistas } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { checkRateLimit, getClientIP, createRateLimitKey, getRateLimitHeaders } from '@/lib/security';
import { sanitizeUUID } from '@/lib/security/sanitize';
import { verificarPermissaoAnalise } from '@/lib/services/billing';

export const maxDuration = 300; // 5 minutos - permite análises mais longas

/**
 * POST /api/analise-entrevista
 *
 * Analisa uma entrevista de candidato usando IA
 * IMPORTANTE: Verifica se o usuário autenticado é o dono da entrevista
 *
 * Body:
 * {
 *   candidatoId: string,
 *   entrevistaId: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Verifica se o usuário pode realizar análise de IA (limite de free trial)
    const permissao = await verificarPermissaoAnalise(userId);
    if (!permissao.permitido && permissao.error) {
      return NextResponse.json(
        {
          error: permissao.error.message,
          code: permissao.error.code,
          precisaUpgrade: true,
        },
        { status: permissao.error.statusCode }
      );
    }

    // Rate limiting por usuário para análises (recurso caro de IA)
    const clientIP = getClientIP(request);
    const rateLimitKey = createRateLimitKey('analysis', userId, clientIP);
    const rateLimitResult = checkRateLimit(rateLimitKey, 'analysis');

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Limite de análises excedido. Por favor, aguarde antes de tentar novamente.',
          retryAfter: rateLimitResult.retryAfter,
          resetAt: rateLimitResult.resetAt.toISOString(),
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const body = await request.json();
    const { candidatoId, entrevistaId } = body;

    // Validação dos parâmetros
    if (!candidatoId || !entrevistaId) {
      return NextResponse.json(
        { error: 'candidatoId e entrevistaId são obrigatórios' },
        { status: 400 }
      );
    }

    // Sanitiza UUIDs
    const sanitizedCandidatoId = sanitizeUUID(candidatoId);
    const sanitizedEntrevistaId = sanitizeUUID(entrevistaId);

    if (!sanitizedCandidatoId || !sanitizedEntrevistaId) {
      return NextResponse.json(
        { error: 'IDs inválidos' },
        { status: 400 }
      );
    }

    // Verifica se a chave da API está configurada
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API Key da Anthropic não configurada' },
        { status: 500 }
      );
    }

    // Busca informações do candidato e da entrevista COM VERIFICAÇÃO DE OWNERSHIP
    const db = getDB();
    const [resultado] = await db
      .select({
        candidatoId: candidatos.id,
        candidatoNome: candidatos.nome,
        candidatoUserId: candidatos.userId,
        status: candidatoEntrevistas.status,
        entrevistaUserId: entrevistas.userId,
      })
      .from(candidatos)
      .innerJoin(candidatoEntrevistas, eq(candidatos.id, candidatoEntrevistas.candidatoId))
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(candidatos.id, sanitizedCandidatoId),
          eq(candidatoEntrevistas.entrevistaId, sanitizedEntrevistaId)
        )
      )
      .limit(1);

    if (!resultado) {
      return NextResponse.json(
        { error: 'Candidato ou entrevista não encontrado' },
        { status: 404 }
      );
    }

    // VERIFICAÇÃO DE OWNERSHIP - O usuário deve ser dono da entrevista
    if (resultado.entrevistaUserId !== userId) {
      return NextResponse.json(
        { error: 'Acesso não autorizado a esta entrevista' },
        { status: 403 }
      );
    }

    // Verifica se o candidato pertence ao mesmo usuário
    if (resultado.candidatoUserId !== userId) {
      return NextResponse.json(
        { error: 'Acesso não autorizado a este candidato' },
        { status: 403 }
      );
    }

    // Verifica se o candidato completou a entrevista
    if (resultado.status !== 'concluida') {
      return NextResponse.json(
        { error: 'Candidato ainda não completou a entrevista' },
        { status: 400 }
      );
    }

    // Executa a análise
    const result = await analyzeInterview(
      sanitizedCandidatoId,
      sanitizedEntrevistaId,
      resultado.candidatoNome
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Falha na análise',
          details: result.error,
        },
        { status: 500 }
      );
    }

    // Processa decisão automática imediatamente após a análise
    let autoDecisionResult = null;
    try {
      autoDecisionResult = await processAutoDecisionForCandidate(
        sanitizedCandidatoId,
        sanitizedEntrevistaId
      );
    } catch (autoDecisionError) {
      console.error('[API Análise] Erro ao processar decisão automática:', autoDecisionError);
      // Não falha a resposta - o CRON vai processar depois se necessário
    }

    return NextResponse.json({
      success: true,
      avaliacaoId: result.avaliacaoId,
      message: 'Análise concluída com sucesso',
      autoDecision: autoDecisionResult,
    });
  } catch (error) {
    // Log sem expor detalhes sensíveis em produção
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro na API de análise:', error);
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analise-entrevista?candidatoId=xxx&entrevistaId=yyy
 *
 * Verifica o status de uma análise
 * IMPORTANTE: Verifica se o usuário autenticado é o dono da entrevista
 */
export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const searchParams = request.nextUrl.searchParams;
    const candidatoId = searchParams.get('candidatoId');
    const entrevistaId = searchParams.get('entrevistaId');

    if (!candidatoId || !entrevistaId) {
      return NextResponse.json(
        { error: 'candidatoId e entrevistaId são obrigatórios' },
        { status: 400 }
      );
    }

    // Sanitiza UUIDs
    const sanitizedCandidatoId = sanitizeUUID(candidatoId);
    const sanitizedEntrevistaId = sanitizeUUID(entrevistaId);

    if (!sanitizedCandidatoId || !sanitizedEntrevistaId) {
      return NextResponse.json(
        { error: 'IDs inválidos' },
        { status: 400 }
      );
    }

    // Verifica ownership antes de retornar dados
    const db = getDB();
    const [entrevista] = await db
      .select({ userId: entrevistas.userId })
      .from(entrevistas)
      .where(eq(entrevistas.id, sanitizedEntrevistaId))
      .limit(1);

    if (!entrevista) {
      return NextResponse.json(
        { error: 'Entrevista não encontrada' },
        { status: 404 }
      );
    }

    if (entrevista.userId !== userId) {
      return NextResponse.json(
        { error: 'Acesso não autorizado a esta entrevista' },
        { status: 403 }
      );
    }

    // TODO: Implementar busca de avaliação quando o schema avaliacoes for criado
    return NextResponse.json({
      exists: false,
      message: 'Sistema de avaliações ainda não implementado',
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao buscar avaliação:', error);
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
      },
      { status: 500 }
    );
  }
}
