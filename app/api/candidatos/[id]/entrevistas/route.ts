import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas, entrevistas } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getUserId } from "@/lib/auth/get-user";

/**
 * GET /api/candidatos/[id]/entrevistas
 *
 * Busca dados de um candidato com todas as suas entrevistas
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = getDB();

    // Buscar candidato
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(eq(candidatos.id, id))
      .limit(1);

    if (!candidato) {
      return NextResponse.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se o candidato pertence ao usuário
    if (candidato.userId !== userId) {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    // Buscar todas as entrevistas do candidato
    const entrevistasDoCandidato = await db
      .select({
        entrevistaId: candidatoEntrevistas.entrevistaId,
        status: candidatoEntrevistas.status,
        notaGeral: candidatoEntrevistas.notaGeral,
        recomendacao: candidatoEntrevistas.recomendacao,
        concluidaEm: candidatoEntrevistas.concluidaEm,
        entrevistaTitulo: entrevistas.titulo,
        entrevistaCargo: entrevistas.cargo,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(eq(candidatoEntrevistas.candidatoId, id))
      .orderBy(desc(candidatoEntrevistas.createdAt));

    return NextResponse.json({
      ...candidato,
      entrevistas: entrevistasDoCandidato,
    });
  } catch (error) {
    console.error("Erro ao buscar candidato com entrevistas:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
