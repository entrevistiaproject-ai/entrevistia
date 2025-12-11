import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { candidatoEntrevistas } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import {
  requireCandidatoAccess,
  isErrorResponse,
} from '@/lib/security/ownership';

/**
 * GET /api/candidatos/[id]
 *
 * Busca dados de um candidato específico, incluindo a última entrevista
 * PROTEGIDO: Requer autenticação e verifica ownership do candidato
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDB();

    // Verifica autenticação e ownership do candidato
    const accessResult = await requireCandidatoAccess(id);
    if (isErrorResponse(accessResult)) {
      return accessResult;
    }

    const { candidato } = accessResult;

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
