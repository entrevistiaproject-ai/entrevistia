import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { agendamentos, candidatos, entrevistas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { updateEvent, deleteEvent } from "@/lib/calendar/google-calendar";

/**
 * GET /api/agendamentos/[id]
 * Busca detalhes de um agendamento
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDB();

  const [event] = await db
    .select({
      id: agendamentos.id,
      titulo: agendamentos.titulo,
      descricao: agendamentos.descricao,
      tipo: agendamentos.tipo,
      status: agendamentos.status,
      dataInicio: agendamentos.dataInicio,
      dataFim: agendamentos.dataFim,
      fusoHorario: agendamentos.fusoHorario,
      local: agendamentos.local,
      linkReuniao: agendamentos.linkReuniao,
      plataforma: agendamentos.plataforma,
      participantes: agendamentos.participantes,
      googleEventId: agendamentos.googleEventId,
      confirmadoEm: agendamentos.confirmadoEm,
      canceladoEm: agendamentos.canceladoEm,
      motivoCancelamento: agendamentos.motivoCancelamento,
      tentativasReagendamento: agendamentos.tentativasReagendamento,
      maxReagendamentos: agendamentos.maxReagendamentos,
      notasInternas: agendamentos.notasInternas,
      notasCandidato: agendamentos.notasCandidato,
      candidatoId: agendamentos.candidatoId,
      candidatoNome: candidatos.nome,
      candidatoEmail: candidatos.email,
      entrevistaId: agendamentos.entrevistaId,
      entrevistaTitulo: entrevistas.titulo,
      createdAt: agendamentos.createdAt,
    })
    .from(agendamentos)
    .leftJoin(candidatos, eq(agendamentos.candidatoId, candidatos.id))
    .leftJoin(entrevistas, eq(agendamentos.entrevistaId, entrevistas.id))
    .where(and(eq(agendamentos.id, id), eq(agendamentos.userId, userId)));

  if (!event) {
    return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  }

  return NextResponse.json({ event });
}

/**
 * PUT /api/agendamentos/[id]
 * Atualiza um agendamento
 */
export async function PUT(
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

  // Verificar que o agendamento pertence ao usuário
  const [existing] = await db
    .select()
    .from(agendamentos)
    .where(and(eq(agendamentos.id, id), eq(agendamentos.userId, userId)));

  if (!existing) {
    return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  }

  const updateData: Record<string, unknown> = { updatedAt: new Date() };

  if (body.titulo !== undefined) updateData.titulo = body.titulo;
  if (body.descricao !== undefined) updateData.descricao = body.descricao;
  if (body.tipo !== undefined) updateData.tipo = body.tipo;
  if (body.status !== undefined) updateData.status = body.status;
  if (body.dataInicio !== undefined) updateData.dataInicio = new Date(body.dataInicio);
  if (body.dataFim !== undefined) updateData.dataFim = new Date(body.dataFim);
  if (body.local !== undefined) updateData.local = body.local;
  if (body.linkReuniao !== undefined) updateData.linkReuniao = body.linkReuniao;
  if (body.notasInternas !== undefined) updateData.notasInternas = body.notasInternas;
  if (body.notasCandidato !== undefined) updateData.notasCandidato = body.notasCandidato;

  // Atualizar no Google Calendar se conectado
  if (existing.googleEventId && (body.dataInicio || body.dataFim || body.titulo)) {
    try {
      await updateEvent(userId, existing.googleEventId, {
        summary: body.titulo,
        start: body.dataInicio ? new Date(body.dataInicio) : undefined,
        end: body.dataFim ? new Date(body.dataFim) : undefined,
        location: body.local,
      });
    } catch (error) {
      console.error("Erro ao atualizar evento no Google Calendar:", error);
    }
  }

  await db
    .update(agendamentos)
    .set(updateData)
    .where(eq(agendamentos.id, id));

  return NextResponse.json({ success: true });
}

/**
 * DELETE /api/agendamentos/[id]
 * Cancela um agendamento
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const db = getDB();

  const [existing] = await db
    .select()
    .from(agendamentos)
    .where(and(eq(agendamentos.id, id), eq(agendamentos.userId, userId)));

  if (!existing) {
    return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  }

  // Cancelar no Google Calendar se conectado
  if (existing.googleEventId) {
    try {
      await deleteEvent(userId, existing.googleEventId);
    } catch (error) {
      console.error("Erro ao cancelar evento no Google Calendar:", error);
    }
  }

  await db
    .update(agendamentos)
    .set({
      status: "cancelado",
      canceladoEm: new Date(),
      motivoCancelamento: body.motivo || null,
      updatedAt: new Date(),
    })
    .where(eq(agendamentos.id, id));

  return NextResponse.json({ success: true });
}
