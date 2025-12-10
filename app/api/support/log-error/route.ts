import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logSystemError } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";

/**
 * POST /api/support/log-error
 * Loga um erro do cliente e opcionalmente cria um ticket
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();

    const {
      message,
      errorMessage,
      errorStack,
      component,
      pageUrl,
      createTicket,
      level = "error",
      context,
    } = body;

    if (!message && !errorMessage) {
      return NextResponse.json(
        { error: "Mensagem ou erro são obrigatórios" },
        { status: 400 }
      );
    }

    // Captura informações do request
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Loga o erro
    const ticketId = await logSystemError({
      level: level as "error" | "critical" | "warn" | "info" | "debug",
      message: message || errorMessage,
      errorMessage,
      errorStack,
      component: component || "client",
      userId: session?.user?.id,
      userEmail: session?.user?.email || undefined,
      endpoint: pageUrl,
      ipAddress,
      userAgent,
      context: {
        ...context,
        pageUrl,
        sessionUser: session?.user?.name,
      },
      createTicket: createTicket || level === "critical",
    });

    logger.debug("Erro do cliente logado", {
      message: message || errorMessage,
      component,
      userId: session?.user?.id,
      ticketCreated: !!ticketId,
    });

    return NextResponse.json({
      success: true,
      ticketId,
      message: ticketId
        ? "Erro registrado e ticket criado automaticamente"
        : "Erro registrado com sucesso",
    });
  } catch (error) {
    // Fallback - loga no console se falhar
    console.error("[log-error API] Erro ao processar:", error);
    logger.error("Erro ao processar log de erro", error);

    return NextResponse.json(
      { error: "Erro ao processar log" },
      { status: 500 }
    );
  }
}
