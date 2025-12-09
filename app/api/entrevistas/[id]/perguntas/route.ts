import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { entrevistas, perguntas } from "@/lib/db/schema";
import { eq, and, isNull, asc } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = getDB();

    // Verificar se a entrevista pertence ao usuário
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, id),
          eq(entrevistas.userId, userId),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Buscar perguntas da entrevista ordenadas por ordem
    const perguntasEntrevista = await db
      .select()
      .from(perguntas)
      .where(
        and(
          eq(perguntas.entrevistaId, id),
          isNull(perguntas.deletedAt)
        )
      )
      .orderBy(asc(perguntas.ordem));

    return NextResponse.json(perguntasEntrevista);
  } catch (error) {
    console.error("Erro ao buscar perguntas da entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao buscar perguntas" },
      { status: 500 }
    );
  }
}
