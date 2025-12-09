import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { respostas, perguntas, candidatoEntrevistas } from '@/lib/db/schema';
import { eq, and, asc } from 'drizzle-orm';

/**
 * GET /api/candidatos/[id]/respostas?entrevistaId=xxx
 *
 * Busca todas as perguntas e respostas de um candidato em uma entrevista
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: candidatoId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const entrevistaId = searchParams.get('entrevistaId');

    if (!entrevistaId) {
      return NextResponse.json(
        { error: 'entrevistaId é obrigatório' },
        { status: 400 }
      );
    }

    const db = getDB();

    // Busca dados da participação do candidato na entrevista (incluindo avaliação)
    const [participacao] = await db
      .select({
        status: candidatoEntrevistas.status,
        notaGeral: candidatoEntrevistas.notaGeral,
        recomendacao: candidatoEntrevistas.recomendacao,
        resumoGeral: candidatoEntrevistas.resumoGeral,
        competencias: candidatoEntrevistas.competencias,
        avaliadoEm: candidatoEntrevistas.avaliadoEm,
        concluidaEm: candidatoEntrevistas.concluidaEm,
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
      return NextResponse.json(
        { error: 'Candidato não encontrado nesta entrevista' },
        { status: 404 }
      );
    }

    // Busca todas as respostas do candidato com suas perguntas
    const respostasData = await db
      .select({
        id: respostas.id,
        textoResposta: respostas.textoResposta,
        transcricao: respostas.transcricao,
        tempoResposta: respostas.tempoResposta,
        perguntaId: perguntas.id,
        perguntaTexto: perguntas.texto,
        perguntaOrdem: perguntas.ordem,
        perguntaTipo: perguntas.tipo,
      })
      .from(respostas)
      .innerJoin(perguntas, eq(respostas.perguntaId, perguntas.id))
      .where(
        and(
          eq(respostas.candidatoId, candidatoId),
          eq(respostas.entrevistaId, entrevistaId)
        )
      )
      .orderBy(asc(perguntas.ordem));

    // Formata os dados para o frontend
    const perguntasRespostas = respostasData.map(r => ({
      pergunta: {
        id: r.perguntaId,
        texto: r.perguntaTexto,
        ordem: r.perguntaOrdem,
        tipo: r.perguntaTipo,
      },
      resposta: {
        id: r.id,
        texto: r.textoResposta || r.transcricao,
        transcricao: r.transcricao,
        tempoResposta: r.tempoResposta,
      },
    }));

    return NextResponse.json({
      participacao,
      perguntasRespostas,
    });
  } catch (error) {
    console.error('Erro ao buscar respostas do candidato:', error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
