import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { isNull, desc } from "drizzle-orm";

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

    const db = getDB();

    // Inserir pergunta
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
        userId: null, // TODO: pegar do auth quando implementarmos
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

    const perguntas = await db
      .select()
      .from(perguntasTemplates)
      .where(isNull(perguntasTemplates.deletedAt))
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
