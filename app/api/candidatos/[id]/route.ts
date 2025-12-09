import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/client';
import { candidatos } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/candidatos/[id]
 *
 * Busca dados de um candidato específico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const candidato = await db.query.candidatos.findFirst({
      where: eq(candidatos.id, id),
    });

    if (!candidato) {
      return NextResponse.json(
        { error: 'Candidato não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(candidato);
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
