import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { disponibilidades } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * GET /api/agendamentos/disponibilidade
 * Lista a disponibilidade configurada do recrutador
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const db = getDB();
  const disps = await db
    .select()
    .from(disponibilidades)
    .where(eq(disponibilidades.userId, userId))
    .orderBy(disponibilidades.diaSemana);

  return NextResponse.json({ disponibilidades: disps });
}

/**
 * POST /api/agendamentos/disponibilidade
 * Salva a disponibilidade do recrutador (substitui todas)
 */
export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { slots } = body;

  if (!Array.isArray(slots)) {
    return NextResponse.json(
      { error: "Formato inválido. Envie { slots: [...] }" },
      { status: 400 }
    );
  }

  const db = getDB();

  // Remove disponibilidade anterior
  await db
    .delete(disponibilidades)
    .where(eq(disponibilidades.userId, userId));

  // Insere nova disponibilidade
  if (slots.length > 0) {
    await db.insert(disponibilidades).values(
      slots.map((slot: {
        diaSemana: number;
        horaInicio: string;
        horaFim: string;
        duracaoSlotMinutos?: number;
        intervaloMinutos?: number;
      }) => ({
        userId,
        diaSemana: slot.diaSemana,
        horaInicio: slot.horaInicio,
        horaFim: slot.horaFim,
        duracaoSlotMinutos: slot.duracaoSlotMinutos || 60,
        intervaloMinutos: slot.intervaloMinutos || 15,
      }))
    );
  }

  return NextResponse.json({ success: true });
}
