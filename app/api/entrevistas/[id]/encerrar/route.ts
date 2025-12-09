import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { entrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";

/**
 * POST /api/entrevistas/[id]/encerrar
 * Encerra a vaga (muda status para completed)
 */
export async function POST(
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

    // Atualizar status para concluída/encerrada
    const [entrevistaAtualizada] = await db
      .update(entrevistas)
      .set({
        status: "completed",
        concluidaEm: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(entrevistas.id, id))
      .returning();

    return NextResponse.json({
      status: entrevistaAtualizada.status,
      mensagem: "Vaga encerrada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao encerrar vaga:", error);
    return NextResponse.json(
      { error: "Erro ao encerrar vaga" },
      { status: 500 }
    );
  }
}
