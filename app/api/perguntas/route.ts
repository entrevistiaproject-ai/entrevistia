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
      cargos = [], // Array de cargos ou vazio para universal
      niveis = [], // Array de níveis ou vazio para universal
      categoria,
      competencia,
      tipo,
      tags = [],
      criteriosAvaliacao,
    } = body;

    // Validação básica
    if (!texto) {
      return NextResponse.json(
        { error: "Texto é obrigatório" },
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
        cargos,
        niveis,
        categoria: categoriaFinal,
        competencia: competencia || null,
        tipo: tipo || "texto",
        tags,
        criteriosAvaliacao: criteriosAvaliacao || {},
        metadados: {},
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

    // Pega o userId (temporário - quando tiver auth real, pegar da sessão)
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

    // Se não há parâmetros de filtro, retorna todas
    const cargo = searchParams.get('cargo');
    const nivel = searchParams.get('nivel');
    const descricao = searchParams.get('descricao');
    const categorias = searchParams.get('categorias');
    const limite = searchParams.get('limite');

    if (!cargo && !nivel && !descricao && !categorias) {
      return NextResponse.json(perguntas);
    }

    // Aplica filtro inteligente
    const { filtrarComDiversidade } = await import('@/lib/services/filtro-perguntas');

    const perguntasFiltradas = filtrarComDiversidade(perguntas, {
      cargo: cargo || undefined,
      nivel: nivel || undefined,
      descricao: descricao || undefined,
      categorias: categorias ? categorias.split(',') : undefined,
      limite: limite ? parseInt(limite) : undefined,
      incluirUniversais: true,
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
