import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { agendamentos, candidatos, entrevistas } from "@/lib/db/schema";
import { eq, and, gte, lte, desc, or, ne } from "drizzle-orm";
import { createEvent, type CalendarEvent } from "@/lib/calendar/google-calendar";

/**
 * GET /api/agendamentos
 * Lista agendamentos do recrutador
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const status = searchParams.get("status");

  const db = getDB();

  const conditions = [eq(agendamentos.userId, userId)];

  if (startDate) {
    conditions.push(gte(agendamentos.dataInicio, new Date(startDate)));
  }
  if (endDate) {
    conditions.push(lte(agendamentos.dataFim, new Date(endDate)));
  }
  if (status && status !== "todos") {
    conditions.push(eq(agendamentos.status, status as "pendente" | "confirmado" | "reagendado" | "cancelado" | "realizado" | "no_show"));
  }

  const events = await db
    .select({
      id: agendamentos.id,
      titulo: agendamentos.titulo,
      descricao: agendamentos.descricao,
      tipo: agendamentos.tipo,
      status: agendamentos.status,
      dataInicio: agendamentos.dataInicio,
      dataFim: agendamentos.dataFim,
      local: agendamentos.local,
      linkReuniao: agendamentos.linkReuniao,
      plataforma: agendamentos.plataforma,
      candidatoId: agendamentos.candidatoId,
      candidatoNome: candidatos.nome,
      candidatoEmail: candidatos.email,
      entrevistaId: agendamentos.entrevistaId,
      entrevistaTitulo: entrevistas.titulo,
      confirmadoEm: agendamentos.confirmadoEm,
      canceladoEm: agendamentos.canceladoEm,
      notasInternas: agendamentos.notasInternas,
      createdAt: agendamentos.createdAt,
    })
    .from(agendamentos)
    .leftJoin(candidatos, eq(agendamentos.candidatoId, candidatos.id))
    .leftJoin(entrevistas, eq(agendamentos.entrevistaId, entrevistas.id))
    .where(and(...conditions))
    .orderBy(desc(agendamentos.dataInicio))
    .limit(100);

  return NextResponse.json({ events });
}

/**
 * POST /api/agendamentos
 * Cria um novo agendamento
 */
export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const {
    titulo,
    descricao,
    tipo,
    candidatoId,
    entrevistaId,
    dataInicio,
    dataFim,
    local,
    linkReuniao,
    plataforma,
    participantes,
    notasInternas,
    notasCandidato,
    criarGoogleMeet,
    syncGoogleCalendar,
  } = body;

  if (!titulo || !dataInicio || !dataFim) {
    return NextResponse.json(
      { error: "Título, data de início e data de fim são obrigatórios" },
      { status: 400 }
    );
  }

  const db = getDB();

  // Verificar conflito de horário
  const conflitos = await db
    .select({ id: agendamentos.id, titulo: agendamentos.titulo })
    .from(agendamentos)
    .where(
      and(
        eq(agendamentos.userId, userId),
        ne(agendamentos.status, "cancelado"),
        or(
          and(
            lte(agendamentos.dataInicio, new Date(dataInicio)),
            gte(agendamentos.dataFim, new Date(dataInicio))
          ),
          and(
            lte(agendamentos.dataInicio, new Date(dataFim)),
            gte(agendamentos.dataFim, new Date(dataFim))
          )
        )
      )
    );

  if (conflitos.length > 0) {
    return NextResponse.json(
      {
        error: "Conflito de horário",
        conflitos: conflitos.map((c) => ({ id: c.id, titulo: c.titulo })),
      },
      { status: 409 }
    );
  }

  let googleEventId: string | undefined;
  let meetLink = linkReuniao;

  // Criar evento no Google Calendar se solicitado
  if (syncGoogleCalendar) {
    try {
      // Buscar email do candidato para adicionar como participante
      let attendees: string[] = [];
      if (candidatoId) {
        const [cand] = await db
          .select({ email: candidatos.email })
          .from(candidatos)
          .where(eq(candidatos.id, candidatoId));
        if (cand?.email) attendees.push(cand.email);
      }
      if (participantes) {
        const parsed = JSON.parse(participantes);
        if (Array.isArray(parsed)) attendees = [...attendees, ...parsed];
      }

      const calendarEvent: CalendarEvent = {
        summary: titulo,
        description: descricao,
        start: new Date(dataInicio),
        end: new Date(dataFim),
        location: local,
        attendees,
        meetLink: criarGoogleMeet,
      };

      const result = await createEvent(userId, calendarEvent);
      if (result) {
        googleEventId = result.eventId;
        if (result.meetLink) meetLink = result.meetLink;
      }
    } catch (error) {
      console.error("Erro ao criar evento no Google Calendar:", error);
      // Continua criando o agendamento local mesmo se falhar
    }
  }

  const [newAgendamento] = await db
    .insert(agendamentos)
    .values({
      userId,
      candidatoId: candidatoId || null,
      entrevistaId: entrevistaId || null,
      titulo,
      descricao,
      tipo: tipo || "entrevista_humana",
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim),
      local,
      linkReuniao: meetLink,
      plataforma: plataforma || (meetLink ? "google_meet" : undefined),
      participantes,
      googleEventId,
      notasInternas,
      notasCandidato,
    })
    .returning();

  return NextResponse.json({ success: true, agendamento: newAgendamento }, { status: 201 });
}
