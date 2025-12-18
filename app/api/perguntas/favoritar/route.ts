import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { perguntasFavoritas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// POST: Favoritar uma pergunta padrão
export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { perguntaId } = await request.json();
    if (!perguntaId) {
      return NextResponse.json(
        { error: "ID da pergunta é obrigatório" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Inserir registro de favoritação (ignora se já existe)
    await db
      .insert(perguntasFavoritas)
      .values({
        userId,
        perguntaId,
      })
      .onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao favoritar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE: Remover uma pergunta dos favoritos
export async function DELETE(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const perguntaId = searchParams.get("perguntaId");

    if (!perguntaId) {
      return NextResponse.json(
        { error: "ID da pergunta é obrigatório" },
        { status: 400 }
      );
    }

    const db = getDB();

    await db
      .delete(perguntasFavoritas)
      .where(
        and(
          eq(perguntasFavoritas.userId, userId),
          eq(perguntasFavoritas.perguntaId, perguntaId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao desfavoritar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// GET: Listar IDs das perguntas favoritas do usuário
export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json([]);
    }

    const db = getDB();

    const favoritas = await db
      .select({ perguntaId: perguntasFavoritas.perguntaId })
      .from(perguntasFavoritas)
      .where(eq(perguntasFavoritas.userId, userId));

    return NextResponse.json(favoritas.map(f => f.perguntaId));
  } catch (error) {
    console.error("Erro ao buscar perguntas favoritas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
