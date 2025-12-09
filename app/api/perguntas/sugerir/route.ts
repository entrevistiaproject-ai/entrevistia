import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { isNull, or, eq, and } from "drizzle-orm";
import { sugerirPerguntasComplementares } from "@/lib/services/filtro-perguntas";

/**
 * POST /api/perguntas/sugerir
 *
 * Sugere perguntas complementares baseado nas já selecionadas
 * Evita redundância e busca cobrir lacunas nas competências
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      perguntasSelecionadasIds,
      cargo,
      nivel,
      descricao,
      categorias,
      limite = 10,
    } = body;

    const db = getDB();
    const userId = await getUserId();

    // Busca todas as perguntas disponíveis
    const todasPerguntas = await db
      .select()
      .from(perguntasTemplates)
      .where(
        and(
          isNull(perguntasTemplates.deletedAt),
          or(
            eq(perguntasTemplates.isPadrao, true),
            userId ? eq(perguntasTemplates.userId, userId) : undefined
          )
        )
      );

    // Separa perguntas já selecionadas
    const perguntasSelecionadas = todasPerguntas.filter(p =>
      perguntasSelecionadasIds?.includes(p.id)
    );

    // Sugere perguntas complementares
    const sugestoes = sugerirPerguntasComplementares(
      todasPerguntas,
      perguntasSelecionadas,
      {
        cargo,
        nivel,
        descricao,
        categorias,
        limite,
        incluirUniversais: true,
      }
    );

    return NextResponse.json({
      sugestoes,
      total: sugestoes.length,
      meta: {
        perguntasSelecionadas: perguntasSelecionadas.length,
        perguntasDisponiveis: todasPerguntas.length - perguntasSelecionadas.length,
      },
    });
  } catch (error) {
    console.error("Erro ao sugerir perguntas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
