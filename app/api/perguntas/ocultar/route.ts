import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { perguntasOcultas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// POST: Ocultar uma pergunta padrão
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

    // Inserir registro de ocultação (ignora se já existe)
    await db
      .insert(perguntasOcultas)
      .values({
        userId,
        perguntaId,
      })
      .onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao ocultar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE: Reexibir uma pergunta oculta
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
      .delete(perguntasOcultas)
      .where(
        and(
          eq(perguntasOcultas.userId, userId),
          eq(perguntasOcultas.perguntaId, perguntaId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao reexibir pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// GET: Listar IDs das perguntas ocultas do usuário
export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json([]);
    }

    const db = getDB();

    const ocultas = await db
      .select({ perguntaId: perguntasOcultas.perguntaId })
      .from(perguntasOcultas)
      .where(eq(perguntasOcultas.userId, userId));

    return NextResponse.json(ocultas.map(o => o.perguntaId));
  } catch (error) {
    console.error("Erro ao buscar perguntas ocultas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
