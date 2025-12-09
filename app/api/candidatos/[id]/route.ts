import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { candidatos, candidatoEntrevistas } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * GET /api/candidatos/[id]
 *
 * Busca dados de um candidato específico, incluindo a última entrevista
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDB();

    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(eq(candidatos.id, id))
      .limit(1);

    if (!candidato) {
      return NextResponse.json(
        { error: 'Candidato não encontrado' },
        { status: 404 }
      );
    }

    // Busca a última entrevista do candidato
    const [ultimaEntrevista] = await db
      .select({
        entrevistaId: candidatoEntrevistas.entrevistaId,
        status: candidatoEntrevistas.status,
        concluidaEm: candidatoEntrevistas.concluidaEm,
        notaGeral: candidatoEntrevistas.notaGeral,
        recomendacao: candidatoEntrevistas.recomendacao,
      })
      .from(candidatoEntrevistas)
      .where(eq(candidatoEntrevistas.candidatoId, id))
      .orderBy(desc(candidatoEntrevistas.createdAt))
      .limit(1);

    return NextResponse.json({
      ...candidato,
      entrevistaId: ultimaEntrevista?.entrevistaId || null,
      status: ultimaEntrevista?.status || 'pendente',
      concluidoEm: ultimaEntrevista?.concluidaEm || null,
      notaGeral: ultimaEntrevista?.notaGeral || null,
      recomendacao: ultimaEntrevista?.recomendacao || null,
    });
  } catch (error) {
    console.error('Erro ao buscar candidato:', error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
