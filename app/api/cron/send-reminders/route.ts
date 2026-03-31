import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { agendamentos, candidatos, users } from "@/lib/db/schema";
import { eq, and, lte, gte } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import { addHours, addMinutes } from "date-fns";

/**
 * GET /api/cron/send-reminders
 * Cron job para enviar lembretes de agendamentos
 * Executar a cada 5-15 minutos via Vercel Cron
 */
export async function GET(request: NextRequest) {
  // Verificar token de segurança
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const db = getDB();
  const now = new Date();
  let sent24h = 0;
  let sent1h = 0;
  let sent15min = 0;

  // ==========================================
  // Lembrete de 24h
  // ==========================================
  const range24hStart = addHours(now, 23);
  const range24hEnd = addHours(now, 25);

  const events24h = await db
    .select({
      id: agendamentos.id,
      titulo: agendamentos.titulo,
      dataInicio: agendamentos.dataInicio,
      linkReuniao: agendamentos.linkReuniao,
      local: agendamentos.local,
      candidatoNome: candidatos.nome,
      candidatoEmail: candidatos.email,
      recrutadorNome: users.nome,
      empresa: users.empresa,
    })
    .from(agendamentos)
    .innerJoin(candidatos, eq(agendamentos.candidatoId, candidatos.id))
    .innerJoin(users, eq(agendamentos.userId, users.id))
    .where(
      and(
        eq(agendamentos.lembrete24hEnviado, false),
        eq(agendamentos.status, "confirmado"),
        gte(agendamentos.dataInicio, range24hStart),
        lte(agendamentos.dataInicio, range24hEnd)
      )
    );

  for (const event of events24h) {
    if (!event.candidatoEmail) continue;

    try {
      const dataFormatada = event.dataInicio.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      });
      const horaFormatada = event.dataInicio.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      await enviarEmail({
        to: event.candidatoEmail,
        subject: `Lembrete: Sua entrevista é amanhã - ${event.titulo}`,
        html: `<p>Olá ${event.candidatoNome || ""},</p>
          <p>Sua entrevista para <strong>${event.titulo}</strong> está marcada para amanhã, <strong>${dataFormatada}</strong> às <strong>${horaFormatada}</strong>.</p>
          ${event.linkReuniao ? `<p>Link da reunião: <a href="${event.linkReuniao}">${event.linkReuniao}</a></p>` : ""}
          ${event.local ? `<p>Local: ${event.local}</p>` : ""}
          <p>Atenciosamente,<br>${event.recrutadorNome || event.empresa || "Equipe de Recrutamento"}</p>`,
      });

      await db
        .update(agendamentos)
        .set({ lembrete24hEnviado: true })
        .where(eq(agendamentos.id, event.id));

      sent24h++;
    } catch (error) {
      console.error(`Erro ao enviar lembrete 24h para ${event.candidatoEmail}:`, error);
    }
  }

  // ==========================================
  // Lembrete de 1h
  // ==========================================
  const range1hStart = addMinutes(now, 50);
  const range1hEnd = addMinutes(now, 70);

  const events1h = await db
    .select({
      id: agendamentos.id,
      titulo: agendamentos.titulo,
      dataInicio: agendamentos.dataInicio,
      linkReuniao: agendamentos.linkReuniao,
      candidatoNome: candidatos.nome,
      candidatoEmail: candidatos.email,
      recrutadorNome: users.nome,
      empresa: users.empresa,
    })
    .from(agendamentos)
    .innerJoin(candidatos, eq(agendamentos.candidatoId, candidatos.id))
    .innerJoin(users, eq(agendamentos.userId, users.id))
    .where(
      and(
        eq(agendamentos.lembrete1hEnviado, false),
        eq(agendamentos.status, "confirmado"),
        gte(agendamentos.dataInicio, range1hStart),
        lte(agendamentos.dataInicio, range1hEnd)
      )
    );

  for (const event of events1h) {
    if (!event.candidatoEmail) continue;

    try {
      const horaFormatada = event.dataInicio.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      await enviarEmail({
        to: event.candidatoEmail,
        subject: `Sua entrevista começa em 1 hora - ${event.titulo}`,
        html: `<p>Olá ${event.candidatoNome || ""},</p>
          <p>Sua entrevista <strong>${event.titulo}</strong> começa em <strong>1 hora</strong> (${horaFormatada}).</p>
          ${event.linkReuniao ? `<p>Link da reunião: <a href="${event.linkReuniao}">${event.linkReuniao}</a></p>` : ""}
          <p>Até já!<br>${event.recrutadorNome || event.empresa || "Equipe de Recrutamento"}</p>`,
      });

      await db
        .update(agendamentos)
        .set({ lembrete1hEnviado: true })
        .where(eq(agendamentos.id, event.id));

      sent1h++;
    } catch (error) {
      console.error(`Erro ao enviar lembrete 1h para ${event.candidatoEmail}:`, error);
    }
  }

  // ==========================================
  // Lembrete de 15min
  // ==========================================
  const range15minStart = addMinutes(now, 10);
  const range15minEnd = addMinutes(now, 20);

  const events15min = await db
    .select({
      id: agendamentos.id,
      titulo: agendamentos.titulo,
      linkReuniao: agendamentos.linkReuniao,
      candidatoNome: candidatos.nome,
      candidatoEmail: candidatos.email,
    })
    .from(agendamentos)
    .innerJoin(candidatos, eq(agendamentos.candidatoId, candidatos.id))
    .where(
      and(
        eq(agendamentos.lembrete15minEnviado, false),
        eq(agendamentos.status, "confirmado"),
        gte(agendamentos.dataInicio, range15minStart),
        lte(agendamentos.dataInicio, range15minEnd)
      )
    );

  for (const event of events15min) {
    if (!event.candidatoEmail) continue;

    try {
      await enviarEmail({
        to: event.candidatoEmail,
        subject: `Sua entrevista começa em 15 minutos!`,
        html: `<p>Olá ${event.candidatoNome || ""},</p>
          <p>Sua entrevista <strong>${event.titulo}</strong> começa em <strong>15 minutos</strong>!</p>
          ${event.linkReuniao ? `<p>Acesse a reunião: <a href="${event.linkReuniao}">${event.linkReuniao}</a></p>` : ""}`,
      });

      await db
        .update(agendamentos)
        .set({ lembrete15minEnviado: true })
        .where(eq(agendamentos.id, event.id));

      sent15min++;
    } catch (error) {
      console.error(`Erro ao enviar lembrete 15min para ${event.candidatoEmail}:`, error);
    }
  }

  return NextResponse.json({
    success: true,
    sent: { "24h": sent24h, "1h": sent1h, "15min": sent15min },
  });
}
