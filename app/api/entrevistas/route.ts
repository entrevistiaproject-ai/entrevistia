import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, candidatos, perguntas, respostas } from "@/lib/db/schema";
import { desc, eq, and, isNull, count, sql } from "drizzle-orm";
import { getUserId } from "@/lib/auth/get-user";

export async function GET(request: Request) {
  try {
    const db = getDB();
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    let statusFilter: string | null = null;
    try {
      const { searchParams } = new URL(request.url);
      statusFilter = searchParams.get("status");
    } catch (error) {
      // Se falhar ao criar URL (ex: durante build), continua sem filtro
      console.warn("Falha ao processar URL:", error);
    }

    // Query otimizada: busca entrevistas com contagem de candidatos e respostas em uma única query
    // Usamos subqueries otimizadas para evitar múltiplas queries
    const baseWhere = and(
      eq(entrevistas.userId, userId),
      isNull(entrevistas.deletedAt),
      statusFilter ? eq(entrevistas.status, statusFilter) : undefined
    );

    const query = db
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
        // Contagem de candidatos usando sql agregado
        totalCandidatos: sql<number>`(
          SELECT COUNT(DISTINCT c.id)::int
          FROM ${candidatos} c
          INNER JOIN ${respostas} r ON r.candidato_id = c.id
          WHERE r.entrevista_id = ${entrevistas.id}
            AND c.user_id = ${userId}
        )`,
        // Contagem de respostas
        totalRespostas: sql<number>`(
          SELECT COUNT(*)::int
          FROM ${respostas} r
          WHERE r.entrevista_id = ${entrevistas.id}
        )`,
        // Contagem de perguntas
        totalPerguntas: sql<number>`(
          SELECT COUNT(*)::int
          FROM ${perguntas} p
          WHERE p.entrevista_id = ${entrevistas.id}
            AND p.deleted_at IS NULL
        )`,
      })
      .from(entrevistas)
      .where(baseWhere)
      .orderBy(desc(entrevistas.createdAt));

    const result = await query;

    return NextResponse.json({ entrevistas: result });
  } catch (error) {
    console.error("[GET /api/entrevistas] Erro:", error);
    return NextResponse.json(
      { error: "Erro ao buscar entrevistas" },
      { status: 500 }
    );
  }
}
