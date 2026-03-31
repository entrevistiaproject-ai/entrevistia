import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { mensagens } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * PATCH /api/mensagens/[id]
 * Atualiza uma mensagem (marcar como lida, arquivar, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const db = getDB();

  const updateData: Record<string, unknown> = {};

  if (body.lidaPeloRecrutador !== undefined) updateData.lidaPeloRecrutador = body.lidaPeloRecrutador;
  if (body.arquivada !== undefined) updateData.arquivada = body.arquivada;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "Nenhum campo para atualizar" }, { status: 400 });
  }

  await db
    .update(mensagens)
    .set(updateData)
    .where(and(eq(mensagens.id, id), eq(mensagens.userId, userId)));

  return NextResponse.json({ success: true });
}
