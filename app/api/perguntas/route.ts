import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { isNull, desc, or, eq, and, sql } from "drizzle-orm";
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

    // Parâmetros de filtro
    const cargo = searchParams.get('cargo');
    const nivel = searchParams.get('nivel');
    const categoria = searchParams.get('categoria');

    // Parâmetros de paginação
    let page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    let limit = 50; // Default maior para perguntas

    // Valores permitidos de itens por página (computacionalmente aceitáveis)
    const ALLOWED_LIMITS = [10, 20, 50, 100];
    const requestedLimit = parseInt(searchParams.get("limit") || "50");
    limit = ALLOWED_LIMITS.includes(requestedLimit) ? requestedLimit : 50;

    const offset = (page - 1) * limit;

    // Condições base
    const baseConditions = and(
      isNull(perguntasTemplates.deletedAt),
      or(
        eq(perguntasTemplates.isPadrao, true),
        userId ? eq(perguntasTemplates.userId, userId) : undefined
      )
    );

    // Buscar total para paginação
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(perguntasTemplates)
      .where(baseConditions);

    // Busca perguntas padrão do sistema OU perguntas do próprio usuário
    const perguntas = await db
      .select()
      .from(perguntasTemplates)
      .where(baseConditions)
      .orderBy(desc(perguntasTemplates.createdAt))
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(totalCount / limit);
    const pagination = {
      page,
      limit,
      total: totalCount,
      totalPages,
      hasMore: page < totalPages,
      allowedLimits: ALLOWED_LIMITS,
    };

    // Se não há parâmetros de filtro, retorna todas com paginação
    if (!cargo && !nivel && !categoria) {
      return NextResponse.json({ perguntas, pagination });
    }

    // Filtro simples por cargo, nível e categoria
    const perguntasFiltradas = perguntas.filter(p => {
      if (cargo && p.cargo !== cargo) return false;
      if (nivel && p.nivel !== nivel) return false;
      if (categoria && p.categoria !== categoria) return false;
      return true;
    });

    return NextResponse.json({ perguntas: perguntasFiltradas, pagination });
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
