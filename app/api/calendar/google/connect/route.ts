import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getAuthUrl } from "@/lib/calendar/google-calendar";

/**
 * GET /api/calendar/google/connect
 * Redireciona para o Google OAuth para conectar calendário
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const authUrl = getAuthUrl(userId);
  return NextResponse.redirect(authUrl);
}
