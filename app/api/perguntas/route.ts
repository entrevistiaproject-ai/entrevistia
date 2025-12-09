import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { isNull, desc, or, eq, and } from "drizzle-orm";
import { sugerirCategoria } from "@/lib/utils/classificacao-perguntas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      texto,
      cargo,
      nivel,
      categoria,
      competencia,
      tipo,
      criteriosAvaliacao,
    } = body;

    // Validação básica
    if (!texto || !cargo || !nivel) {
      return NextResponse.json(
        { error: "Texto, cargo e nível são obrigatórios" },
        { status: 400 }
      );
    }

    const userId = await getUserId();
    const db = getDB();

    // Se categoria não foi fornecida, sugere automaticamente
    const categoriaFinal = categoria || sugerirCategoria(texto).categoria;

    // Inserir pergunta
    const [novaPergunta] = await db
      .insert(perguntasTemplates)
      .values({
        texto,
        cargo,
        nivel,
        categoria: categoriaFinal,
        competencia: competencia || null,
        tipo: tipo || "texto",
        criteriosAvaliacao: criteriosAvaliacao || {},
        isPadrao: false,
        userId,
      })
      .returning();

    return NextResponse.json(novaPergunta, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const db = getDB();

    // Pega o userId
    const userId = await getUserId();

    // Busca perguntas padrão do sistema OU perguntas do próprio usuário
    const perguntas = await db
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
      )
      .orderBy(desc(perguntasTemplates.createdAt));

    // Parâmetros de filtro
    const cargo = searchParams.get('cargo');
    const nivel = searchParams.get('nivel');
    const categoria = searchParams.get('categoria');

    // Se não há parâmetros de filtro, retorna todas
    if (!cargo && !nivel && !categoria) {
      return NextResponse.json(perguntas);
    }

    // Filtro simples por cargo, nível e categoria
    const perguntasFiltradas = perguntas.filter(p => {
      if (cargo && p.cargo !== cargo) return false;
      if (nivel && p.nivel !== nivel) return false;
      if (categoria && p.categoria !== categoria) return false;
      return true;
    });

    return NextResponse.json(perguntasFiltradas);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
