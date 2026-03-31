import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { isCalendarConnected, disconnectCalendar } from "@/lib/calendar/google-calendar";
import { getDB } from "@/lib/db";
import { googleCalendarTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/calendar/google/status
 * Verifica se o Google Calendar está conectado
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const connected = await isCalendarConnected(userId);

  if (connected) {
    const db = getDB();
    const [token] = await db
      .select({ email: googleCalendarTokens.email })
      .from(googleCalendarTokens)
      .where(eq(googleCalendarTokens.userId, userId));

    return NextResponse.json({ connected: true, email: token?.email });
  }

  return NextResponse.json({ connected: false });
}

/**
 * DELETE /api/calendar/google/status
 * Desconecta o Google Calendar
 */
export async function DELETE() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  await disconnectCalendar(userId);
  return NextResponse.json({ success: true });
}
