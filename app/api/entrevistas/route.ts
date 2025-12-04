import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, candidatos, perguntas, respostas } from "@/lib/db/schema";
import { desc, eq, and, isNull, count, sql } from "drizzle-orm";

// Função helper para pegar userId do header (temporário até implementar JWT)
function getUserIdFromRequest(request: Request): string | null {
  const userId = request.headers.get("x-user-id");
  return userId;
}

export async function GET(request: Request) {
  try {
    const db = getDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    // Query otimizada: busca entrevistas com contagem de candidatos e respostas em uma única query
    // Usamos subqueries otimizadas para evitar múltiplas queries
    const baseWhere = and(
      eq(entrevistas.userId, userId),
      isNull(entrevistas.deletedAt),
      statusFilter ? eq(entrevistas.status, statusFilter) : undefined
    );

    let query = db
      .select({
        id: entrevistas.id,
        titulo: entrevistas.titulo,
        descricao: entrevistas.descricao,
        cargo: entrevistas.cargo,
        empresa: entrevistas.empresa,
        status: entrevistas.status,
        duracao: entrevistas.duracao,
        slug: entrevistas.slug,
        createdAt: entrevistas.createdAt,
        updatedAt: entrevistas.updatedAt,
        iniciadaEm: entrevistas.iniciadaEm,
        concluidaEm: entrevistas.concluidaEm,
        // Contagem de respostas únicas por candidato (quantos candidatos realizaram)
        totalCandidatos: sql<number>`(
          SELECT COUNT(DISTINCT ${respostas.candidatoId})::int
          FROM ${respostas}
          WHERE ${respostas.entrevistaId} = ${entrevistas.id}
        )`.as('total_candidatos'),
        // Contagem total de respostas (todas as respostas individuais)
        totalRespostas: sql<number>`(
          SELECT COUNT(${respostas.id})::int
          FROM ${respostas}
          WHERE ${respostas.entrevistaId} = ${entrevistas.id}
        )`.as('total_respostas'),
        // Contagem de perguntas na entrevista
        totalPerguntas: sql<number>`(
          SELECT COUNT(${perguntas.id})::int
          FROM ${perguntas}
          WHERE ${perguntas.entrevistaId} = ${entrevistas.id}
        )`.as('total_perguntas'),
      })
      .from(entrevistas)
      .where(baseWhere);

    const resultado = await query.orderBy(desc(entrevistas.createdAt));

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Erro ao buscar entrevistas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
