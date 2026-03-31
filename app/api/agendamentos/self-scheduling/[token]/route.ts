import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { selfSchedulingLinks, agendamentos, candidatos, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAvailableSlotsByDay } from "@/lib/calendar/scheduling";
import { createEvent, type CalendarEvent } from "@/lib/calendar/google-calendar";

/**
 * GET /api/agendamentos/self-scheduling/[token]
 * Busca informações do link e slots disponíveis (público)
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const db = getDB();

  const [link] = await db
    .select({
      id: selfSchedulingLinks.id,
      titulo: selfSchedulingLinks.titulo,
      descricao: selfSchedulingLinks.descricao,
      tipo: selfSchedulingLinks.tipo,
      duracaoMinutos: selfSchedulingLinks.duracaoMinutos,
      dataInicio: selfSchedulingLinks.dataInicio,
      dataFim: selfSchedulingLinks.dataFim,
      usadoEm: selfSchedulingLinks.usadoEm,
      expiresAt: selfSchedulingLinks.expiresAt,
      userId: selfSchedulingLinks.userId,
      recrutadorNome: users.nome,
      empresaNome: users.empresa,
    })
    .from(selfSchedulingLinks)
    .innerJoin(users, eq(selfSchedulingLinks.userId, users.id))
    .where(eq(selfSchedulingLinks.token, token));

  if (!link) {
    return NextResponse.json({ error: "Link não encontrado" }, { status: 404 });
  }

  if (link.usadoEm) {
    return NextResponse.json({ error: "Este link já foi utilizado" }, { status: 410 });
  }

  if (link.expiresAt < new Date()) {
    return NextResponse.json({ error: "Este link expirou" }, { status: 410 });
  }

  // Buscar slots disponíveis
  const slots = await getAvailableSlotsByDay(
    link.userId,
    link.dataInicio,
    link.dataFim,
    link.duracaoMinutos
  );

  return NextResponse.json({
    titulo: link.titulo,
    descricao: link.descricao,
    tipo: link.tipo,
    duracaoMinutos: link.duracaoMinutos,
    recrutador: link.recrutadorNome,
    empresa: link.empresaNome,
    slots,
  });
}

/**
 * POST /api/agendamentos/self-scheduling/[token]
 * Candidato escolhe um horário (público)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const body = await request.json();
  const { slotStart, slotEnd } = body;

  if (!slotStart || !slotEnd) {
    return NextResponse.json(
      { error: "slotStart e slotEnd são obrigatórios" },
      { status: 400 }
    );
  }

  const db = getDB();

  const [link] = await db
    .select()
    .from(selfSchedulingLinks)
    .where(eq(selfSchedulingLinks.token, token));

  if (!link) {
    return NextResponse.json({ error: "Link não encontrado" }, { status: 404 });
  }

  if (link.usadoEm) {
    return NextResponse.json({ error: "Este link já foi utilizado" }, { status: 410 });
  }

  if (link.expiresAt < new Date()) {
    return NextResponse.json({ error: "Este link expirou" }, { status: 410 });
  }

  // Buscar dados do candidato e recrutador
  const [candidato] = link.candidatoId
    ? await db.select().from(candidatos).where(eq(candidatos.id, link.candidatoId))
    : [null];

  // Criar agendamento
  const [newAgendamento] = await db
    .insert(agendamentos)
    .values({
      userId: link.userId,
      candidatoId: link.candidatoId,
      entrevistaId: link.entrevistaId,
      titulo: link.titulo,
      descricao: link.descricao,
      tipo: link.tipo,
      status: "confirmado", // Auto-confirmado pelo candidato
      dataInicio: new Date(slotStart),
      dataFim: new Date(slotEnd),
      confirmadoEm: new Date(),
    })
    .returning();

  // Tentar criar no Google Calendar
  let meetLink: string | undefined;
  try {
    const calendarEvent: CalendarEvent = {
      summary: link.titulo,
      description: link.descricao ?? undefined,
      start: new Date(slotStart),
      end: new Date(slotEnd),
      attendees: candidato?.email ? [candidato.email] : [],
      meetLink: true,
    };

    const result = await createEvent(link.userId, calendarEvent);
    if (result) {
      meetLink = result.meetLink;
      await db
        .update(agendamentos)
        .set({
          googleEventId: result.eventId,
          linkReuniao: result.meetLink,
          plataforma: result.meetLink ? "google_meet" : undefined,
        })
        .where(eq(agendamentos.id, newAgendamento.id));
    }
  } catch {
    // Google Calendar não conectado - continua sem
  }

  // Marcar link como usado
  await db
    .update(selfSchedulingLinks)
    .set({
      usadoEm: new Date(),
      agendamentoId: newAgendamento.id,
    })
    .where(eq(selfSchedulingLinks.id, link.id));

  return NextResponse.json({
    success: true,
    agendamento: {
      id: newAgendamento.id,
      titulo: newAgendamento.titulo,
      dataInicio: newAgendamento.dataInicio,
      dataFim: newAgendamento.dataFim,
      meetLink,
    },
  });
}
