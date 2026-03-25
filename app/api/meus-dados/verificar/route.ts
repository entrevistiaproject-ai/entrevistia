import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * GET /api/meus-dados/verificar
 * Verifica se o candidato tem sessão válida
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("candidato_session");

    if (!sessionCookie) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    try {
      const session = JSON.parse(sessionCookie.value);

      // Verifica se a sessão não expirou (24 horas)
      const authenticatedAt = new Date(session.authenticatedAt);
      const now = new Date();
      const hoursElapsed = (now.getTime() - authenticatedAt.getTime()) / (1000 * 60 * 60);

      if (hoursElapsed > 24) {
        // Sessão expirada
        return NextResponse.json(
          { authenticated: false, error: "Sessão expirada" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        authenticated: true,
        email: session.email,
        candidatoId: session.candidatoId,
      });
    } catch {
      return NextResponse.json(
        { authenticated: false, error: "Sessão inválida" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    return NextResponse.json(
      { authenticated: false, error: "Erro interno" },
      { status: 500 }
    );
  }
}
