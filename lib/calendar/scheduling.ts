import { getDB } from "@/lib/db";
import { disponibilidades, bloqueiosHorario, agendamentos } from "@/lib/db/schema";
import { eq, and, gte, lte, or, ne } from "drizzle-orm";
import { getFreeBusy } from "./google-calendar";
import { addMinutes, format, isBefore, isAfter, startOfDay, endOfDay, addDays, setHours, setMinutes } from "date-fns";

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

/**
 * Gera os slots disponíveis de um recrutador para um período
 */
export async function getAvailableSlots(
  userId: string,
  startDate: Date,
  endDate: Date,
  duracaoMinutos: number = 60
): Promise<TimeSlot[]> {
  const db = getDB();

  // 1. Buscar disponibilidade configurada
  const disps = await db
    .select()
    .from(disponibilidades)
    .where(and(eq(disponibilidades.userId, userId), eq(disponibilidades.ativo, true)));

  if (disps.length === 0) {
    return []; // Sem disponibilidade configurada
  }

  // 2. Buscar bloqueios de horário
  const bloqueios = await db
    .select()
    .from(bloqueiosHorario)
    .where(
      and(
        eq(bloqueiosHorario.userId, userId),
        or(
          // Bloqueios que começam no período
          and(gte(bloqueiosHorario.dataInicio, startDate), lte(bloqueiosHorario.dataInicio, endDate)),
          // Bloqueios que terminam no período
          and(gte(bloqueiosHorario.dataFim, startDate), lte(bloqueiosHorario.dataFim, endDate)),
          // Bloqueios que englobam o período
          and(lte(bloqueiosHorario.dataInicio, startDate), gte(bloqueiosHorario.dataFim, endDate))
        )
      )
    );

  // 3. Buscar agendamentos existentes (não cancelados)
  const existingEvents = await db
    .select()
    .from(agendamentos)
    .where(
      and(
        eq(agendamentos.userId, userId),
        ne(agendamentos.status, "cancelado"),
        or(
          and(gte(agendamentos.dataInicio, startDate), lte(agendamentos.dataInicio, endDate)),
          and(gte(agendamentos.dataFim, startDate), lte(agendamentos.dataFim, endDate))
        )
      )
    );

  // 4. Buscar horários ocupados no Google Calendar (se conectado)
  let googleBusy: { start: string; end: string }[] = [];
  try {
    googleBusy = await getFreeBusy(userId, startDate, endDate);
  } catch {
    // Google Calendar não conectado ou erro - continua sem
  }

  // 5. Gerar slots baseado na disponibilidade
  const slots: TimeSlot[] = [];
  let currentDate = startOfDay(startDate);
  const now = new Date();

  while (isBefore(currentDate, endDate)) {
    const dayOfWeek = currentDate.getDay();

    // Buscar disponibilidade para este dia da semana
    const dayDisps = disps.filter((d) => d.diaSemana === dayOfWeek);

    for (const disp of dayDisps) {
      const [startHour, startMinute] = disp.horaInicio.split(":").map(Number);
      const [endHour, endMinute] = disp.horaFim.split(":").map(Number);

      let slotStart = setMinutes(setHours(currentDate, startHour), startMinute);
      const dayEnd = setMinutes(setHours(currentDate, endHour), endMinute);

      while (isBefore(addMinutes(slotStart, duracaoMinutos), dayEnd) ||
             addMinutes(slotStart, duracaoMinutos).getTime() === dayEnd.getTime()) {
        const slotEnd = addMinutes(slotStart, duracaoMinutos);

        // Verificar se o slot é no futuro
        if (isAfter(slotStart, now)) {
          const isBlocked = isTimeBlocked(slotStart, slotEnd, bloqueios);
          const hasEvent = hasExistingEvent(slotStart, slotEnd, existingEvents);
          const isGoogleBusy = isGoogleTimeBusy(slotStart, slotEnd, googleBusy);

          slots.push({
            start: slotStart,
            end: slotEnd,
            available: !isBlocked && !hasEvent && !isGoogleBusy,
          });
        }

        // Próximo slot com intervalo
        slotStart = addMinutes(slotStart, duracaoMinutos + (disp.intervaloMinutos || 0));
      }
    }

    currentDate = addDays(currentDate, 1);
  }

  return slots;
}

/**
 * Retorna apenas slots disponíveis, agrupados por dia
 */
export async function getAvailableSlotsByDay(
  userId: string,
  startDate: Date,
  endDate: Date,
  duracaoMinutos: number = 60
): Promise<Record<string, TimeSlot[]>> {
  const allSlots = await getAvailableSlots(userId, startDate, endDate, duracaoMinutos);
  const availableSlots = allSlots.filter((s) => s.available);

  const grouped: Record<string, TimeSlot[]> = {};
  for (const slot of availableSlots) {
    const day = format(slot.start, "yyyy-MM-dd");
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(slot);
  }

  return grouped;
}

// ==========================================
// Helpers
// ==========================================

function isTimeBlocked(
  start: Date,
  end: Date,
  bloqueios: { dataInicio: Date; dataFim: Date; diaInteiro: boolean }[]
): boolean {
  return bloqueios.some((b) => {
    if (b.diaInteiro) {
      const bStart = startOfDay(b.dataInicio);
      const bEnd = endOfDay(b.dataFim);
      return start >= bStart && start < bEnd;
    }
    return start < b.dataFim && end > b.dataInicio;
  });
}

function hasExistingEvent(
  start: Date,
  end: Date,
  events: { dataInicio: Date; dataFim: Date }[]
): boolean {
  return events.some((e) => start < e.dataFim && end > e.dataInicio);
}

function isGoogleTimeBusy(
  start: Date,
  end: Date,
  busy: { start: string; end: string }[]
): boolean {
  return busy.some((b) => {
    const bStart = new Date(b.start);
    const bEnd = new Date(b.end);
    return start < bEnd && end > bStart;
  });
}
