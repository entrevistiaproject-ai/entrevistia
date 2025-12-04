import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { isNull, desc, or, eq } from "drizzle-orm";

// Função helper para pegar userId do header (temporário até implementar JWT)
function getUserIdFromRequest(request: Request): string | null {
  const userId = request.headers.get("x-user-id");
  return userId;
}

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
      tags,
      criteriosAvaliacao,
    } = body;

    // Validação básica
    if (!texto || !cargo || !nivel || !categoria || !competencia) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Pega o userId (temporário - quando tiver auth real, pegar da sessão)
    const userId = getUserIdFromRequest(request);

    const db = getDB();

    // Inserir pergunta vinculada ao usuário
    const [novaPergunta] = await db
      .insert(perguntasTemplates)
      .values({
        texto,
        cargo,
        nivel,
        categoria,
        competencia,
        tipo: tipo || "texto",
        tags: tags || [],
        criteriosAvaliacao: criteriosAvaliacao || {},
        isPadrao: false,
        userId: userId, // Vincula ao usuário logado
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
    const db = getDB();

    // Pega o userId (temporário - quando tiver auth real, pegar da sessão)
    const userId = getUserIdFromRequest(request);

    // Busca perguntas padrão do sistema OU perguntas do próprio usuário
    // Cada recrutador vê apenas suas perguntas + as padrão do sistema
    const perguntas = await db
      .select()
      .from(perguntasTemplates)
      .where(
        or(
          eq(perguntasTemplates.isPadrao, true), // Perguntas padrão do sistema
          userId ? eq(perguntasTemplates.userId, userId) : undefined // Perguntas do usuário logado
        )
      )
      .orderBy(desc(perguntasTemplates.createdAt));

    return NextResponse.json(perguntas);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
