import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { entrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";

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

    return NextResponse.json(entrevista);
  } catch (error) {
    console.error("Erro ao buscar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao buscar entrevista" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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
    const body = await request.json();
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

    // Whitelist de campos permitidos para atualização (previne Mass Assignment)
    const allowedFields = [
      "titulo",
      "descricao",
      "cargo",
      "nivel",
      "empresa",
      "duracao",
      "status",
      "configuracoes",
      // Aprovação automática
      "autoApprovalEnabled",
      "autoApprovalMinScore",
      "autoApprovalUseCompatibility",
      "autoApprovalMinCompatibility",
      "autoApprovalNotifyCandidate",
      "autoApprovalCandidateMessage",
      // Reprovação automática
      "autoRejectEnabled",
      "autoRejectMaxScore",
      "autoRejectNotifyCandidate",
      "autoRejectCandidateMessage",
    ] as const;

    // Filtra apenas campos permitidos
    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Gerar slug se solicitado
    if (body.gerarLink && !entrevista.slug) {
      updateData.slug = nanoid(10);
      updateData.linkPublico = `/entrevista/${updateData.slug}`;
    }

    // Atualizar entrevista
    const [entrevistaAtualizada] = await db
      .update(entrevistas)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(entrevistas.id, id))
      .returning();

    return NextResponse.json(entrevistaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar entrevista" },
      { status: 500 }
    );
  }
}
