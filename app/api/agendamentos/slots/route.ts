import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getAvailableSlotsByDay } from "@/lib/calendar/scheduling";
import { addDays } from "date-fns";

/**
 * GET /api/agendamentos/slots
 * Busca slots disponíveis do recrutador
 * Query params: start, end, duracao (em minutos)
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const duracao = parseInt(searchParams.get("duracao") || "60");

  const startDate = start ? new Date(start) : new Date();
  const endDate = end ? new Date(end) : addDays(startDate, 14); // 2 semanas padrão

  const slots = await getAvailableSlotsByDay(userId, startDate, endDate, duracao);

  return NextResponse.json({ slots });
}
