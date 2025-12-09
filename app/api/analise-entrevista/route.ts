import { NextRequest, NextResponse } from 'next/server';
import { analyzeInterview } from '@/lib/ai/agent';
import { db } from '@/db/client';
import { candidatos, entrevistas } from '@/db/schema';
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

    // Busca informações do candidato
    const candidato = await db.query.candidatos.findFirst({
      where: eq(candidatos.id, candidatoId),
    });

    if (!candidato) {
      return NextResponse.json(
        { error: 'Candidato não encontrado' },
        { status: 404 }
      );
    }

    // Verifica se o candidato completou a entrevista
    if (candidato.status !== 'concluido') {
      return NextResponse.json(
        { error: 'Candidato ainda não completou a entrevista' },
        { status: 400 }
      );
    }

    // Executa a análise
    const result = await analyzeInterview(
      candidatoId,
      entrevistaId,
      candidato.nome
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

    // Busca avaliação existente
    const { avaliacoes } = await import('@/db/schema');
    const avaliacao = await db.query.avaliacoes.findFirst({
      where: and(
        eq(avaliacoes.candidatoId, candidatoId),
        eq(avaliacoes.entrevistaId, entrevistaId)
      ),
      with: {
        avaliacoesCompetencias: {
          with: {
            competencia: true,
          },
        },
      },
    });

    if (!avaliacao) {
      return NextResponse.json({
        exists: false,
        message: 'Nenhuma avaliação encontrada',
      });
    }

    return NextResponse.json({
      exists: true,
      avaliacao: {
        id: avaliacao.id,
        notaGeral: avaliacao.notaGeral,
        resumoGeral: avaliacao.resumoGeral,
        pontosFortes: avaliacao.pontosFortes,
        pontosMelhoria: avaliacao.pontosMelhoria,
        recomendacao: avaliacao.recomendacao,
        analisadoEm: avaliacao.analisadoEm,
        competencias: avaliacao.avaliacoesCompetencias.map(ac => ({
          competencia: ac.competencia.nome,
          nota: ac.nota,
          feedback: ac.feedback,
        })),
      },
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
