import { NextRequest, NextResponse } from 'next/server';
import { analyzeInterview } from '@/lib/ai/agent';
import { getDB } from '@/lib/db';
import { candidatos, candidatoEntrevistas } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const maxDuration = 300; // 5 minutos - permite análises mais longas

/**
 * POST /api/analise-entrevista
 *
 * Analisa uma entrevista de candidato usando IA
 *
 * Body:
 * {
 *   candidatoId: string,
 *   entrevistaId: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidatoId, entrevistaId } = body;

    // Validação dos parâmetros
    if (!candidatoId || !entrevistaId) {
      return NextResponse.json(
        { error: 'candidatoId e entrevistaId são obrigatórios' },
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

    // Busca informações do candidato e da entrevista
    const db = getDB();
    const [resultado] = await db
      .select({
        candidatoId: candidatos.id,
        candidatoNome: candidatos.nome,
        status: candidatoEntrevistas.status,
      })
      .from(candidatos)
      .innerJoin(candidatoEntrevistas, eq(candidatos.id, candidatoEntrevistas.candidatoId))
      .where(
        and(
          eq(candidatos.id, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevistaId)
        )
      )
      .limit(1);

    if (!resultado) {
      return NextResponse.json(
        { error: 'Candidato ou entrevista não encontrado' },
        { status: 404 }
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
      candidatoId,
      entrevistaId,
      resultado.candidatoNome
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Falha na análise',
          details: result.error,
          log: result.executionLog,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      avaliacaoId: result.avaliacaoId,
      message: 'Análise concluída com sucesso',
    });
  } catch (error) {
    console.error('Erro na API de análise:', error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analise-entrevista?candidatoId=xxx&entrevistaId=yyy
 *
 * Verifica o status de uma análise
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const candidatoId = searchParams.get('candidatoId');
    const entrevistaId = searchParams.get('entrevistaId');

    if (!candidatoId || !entrevistaId) {
      return NextResponse.json(
        { error: 'candidatoId e entrevistaId são obrigatórios' },
        { status: 400 }
      );
    }

    // TODO: Implementar busca de avaliação quando o schema avaliacoes for criado
    // Por enquanto, retorna que não existe avaliação
    return NextResponse.json({
      exists: false,
      message: 'Sistema de avaliações ainda não implementado',
    });
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
