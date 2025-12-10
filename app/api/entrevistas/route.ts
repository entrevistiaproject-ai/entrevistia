import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, perguntas, candidatoEntrevistas } from "@/lib/db/schema";
import { desc, eq, and, isNull, sql } from "drizzle-orm";
import { getUserId } from "@/lib/auth/get-user";

export async function GET(request: Request) {
  try {
    const db = getDB();
    const userId = await getUserId();

    console.log("🔍 [GET /api/entrevistas] userId:", userId);

    if (!userId) {
      console.log("❌ [GET /api/entrevistas] Usuário não autenticado");
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

    console.log("🔎 [GET /api/entrevistas] Filtrando por userId:", userId);
    console.log("🔎 [GET /api/entrevistas] statusFilter:", statusFilter);

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
        // Contagem de candidatos (todos que participaram)
        totalCandidatos: sql<number>`(
          SELECT COUNT(*)::int
          FROM ${candidatoEntrevistas} ce
          WHERE ce.entrevista_id = ${entrevistas}.id
        )`,
        // Contagem de candidatos que concluíram a entrevista
        totalConcluiram: sql<number>`(
          SELECT COUNT(*)::int
          FROM ${candidatoEntrevistas} ce
          WHERE ce.entrevista_id = ${entrevistas}.id
            AND ce.status = 'concluida'
        )`,
        // Contagem de candidatos aprovados
        totalAprovados: sql<number>`(
          SELECT COUNT(*)::int
          FROM ${candidatoEntrevistas} ce
          WHERE ce.entrevista_id = ${entrevistas}.id
            AND ce.decisao_recrutador = 'aprovado'
        )`,
        // Média de compatibilidade com a vaga (escala 0-100)
        mediaScore: sql<number>`(
          SELECT ROUND(AVG(ce.compatibilidade_vaga)::numeric, 0)::int
          FROM ${candidatoEntrevistas} ce
          WHERE ce.entrevista_id = ${entrevistas}.id
            AND ce.compatibilidade_vaga IS NOT NULL
        )`,
        // Contagem de perguntas
        totalPerguntas: sql<number>`(
          SELECT COUNT(*)::int
          FROM ${perguntas} p
          WHERE p.entrevista_id = ${entrevistas}.id
            AND p.deleted_at IS NULL
        )`,
      })
      .from(entrevistas)
      .where(baseWhere)
      .orderBy(desc(entrevistas.createdAt));

    const result = await query;

    console.log("✅ [GET /api/entrevistas] Encontradas:", result.length, "entrevistas");
    console.log("📊 [GET /api/entrevistas] Primeira entrevista:", result[0]);

    return NextResponse.json({ entrevistas: result });
  } catch (error) {
    console.error("[GET /api/entrevistas] Erro:", error);
    return NextResponse.json(
      { error: "Erro ao buscar entrevistas" },
      { status: 500 }
    );
  }
}
