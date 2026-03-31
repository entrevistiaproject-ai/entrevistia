import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { selfSchedulingLinks } from "@/lib/db/schema";
import { nanoid } from "nanoid";
import { addDays } from "date-fns";

/**
 * POST /api/agendamentos/self-scheduling
 * Cria um link de self-scheduling para um candidato
 */
export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const {
    candidatoId,
    entrevistaId,
    titulo,
    descricao,
    tipo,
    duracaoMinutos,
    dataInicio,
    dataFim,
    expiraEmDias,
  } = body;

  if (!candidatoId || !titulo) {
    return NextResponse.json(
      { error: "candidatoId e titulo são obrigatórios" },
      { status: 400 }
    );
  }

  const db = getDB();
  const token = nanoid(32);

  const [link] = await db
    .insert(selfSchedulingLinks)
    .values({
      userId,
      candidatoId,
      entrevistaId: entrevistaId || null,
      token,
      titulo,
      descricao,
      tipo: tipo || "entrevista_humana",
      duracaoMinutos: duracaoMinutos || 60,
      dataInicio: dataInicio ? new Date(dataInicio) : new Date(),
      dataFim: dataFim ? new Date(dataFim) : addDays(new Date(), 14),
      expiresAt: addDays(new Date(), expiraEmDias || 7),
    })
    .returning();

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const schedulingUrl = `${baseUrl}/agendar/${token}`;

  return NextResponse.json({
    success: true,
    link,
    url: schedulingUrl,
  }, { status: 201 });
}
