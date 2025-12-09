import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, perguntas } from "@/lib/db/schema";
import { eq, and, isNull, asc } from "drizzle-orm";

/**
 * GET /api/entrevista-publica/[slug]
 * Retorna dados da entrevista pública (sem autenticação)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDB();

    // Buscar entrevista pelo slug
    const [entrevista] = await db
      .select({
        id: entrevistas.id,
        titulo: entrevistas.titulo,
        descricao: entrevistas.descricao,
        cargo: entrevistas.cargo,
        nivel: entrevistas.nivel,
        empresa: entrevistas.empresa,
        duracao: entrevistas.duracao,
        tempoResposta: entrevistas.tempoResposta,
        status: entrevistas.status,
        expiracaoLink: entrevistas.expiracaoLink,
      })
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.slug, slug),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada ou não está disponível" },
        { status: 404 }
      );
    }

    // Verificar se o link expirou
    if (entrevista.expiracaoLink && new Date(entrevista.expiracaoLink) < new Date()) {
      return NextResponse.json(
        { error: "Link de entrevista expirado" },
        { status: 410 }
      );
    }

    // Buscar perguntas da entrevista
    const perguntasEntrevista = await db
      .select({
        id: perguntas.id,
        texto: perguntas.texto,
        ordem: perguntas.ordem,
        tipo: perguntas.tipo,
        obrigatoria: perguntas.obrigatoria,
        tempoMaximo: perguntas.tempoMaximo,
      })
      .from(perguntas)
      .where(
        and(
          eq(perguntas.entrevistaId, entrevista.id),
          isNull(perguntas.deletedAt)
        )
      )
      .orderBy(asc(perguntas.ordem));

    return NextResponse.json({
      ...entrevista,
      perguntas: perguntasEntrevista,
    });
  } catch (error) {
    console.error("Erro ao buscar entrevista pública:", error);
    return NextResponse.json(
      { error: "Erro ao carregar entrevista" },
      { status: 500 }
    );
  }
}
