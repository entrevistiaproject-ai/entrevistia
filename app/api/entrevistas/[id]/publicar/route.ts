import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { entrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * POST /api/entrevistas/[id]/publicar
 * Ativa a entrevista (caso esteja arquivada)
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

    // Atualizar entrevista para ativa
    const [entrevistaAtualizada] = await db
      .update(entrevistas)
      .set({
        status: "active",
        updatedAt: new Date(),
      })
      .where(eq(entrevistas.id, id))
      .returning();

    return NextResponse.json({
      status: entrevistaAtualizada.status,
      mensagem: "Entrevista ativada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao ativar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao ativar entrevista" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/entrevistas/[id]/publicar
 * Arquiva a entrevista
 */
export async function DELETE(
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

    // Atualizar status para arquivada
    const [entrevistaAtualizada] = await db
      .update(entrevistas)
      .set({
        status: "archived",
        updatedAt: new Date(),
      })
      .where(eq(entrevistas.id, id))
      .returning();

    return NextResponse.json({
      status: entrevistaAtualizada.status,
      mensagem: "Entrevista arquivada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao arquivar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao arquivar entrevista" },
      { status: 500 }
    );
  }
}
