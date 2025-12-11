import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logSystemError } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";
import {
  checkCombinedRateLimit,
  getClientIP,
  getRateLimitHeaders,
  sanitizeString,
  withBotProtection,
} from "@/lib/security";

/**
 * POST /api/support/log-error
 * Loga um erro do cliente e opcionalmente cria um ticket
 *
 * Proteções:
 * - Rate limiting por IP
 * - Detecção de bots
 * - Sanitização de inputs
 * - Limite de tamanho de payload
 */
export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  try {
    // Proteção contra bots (mais permissivo para logs legítimos de erro)
    const botCheck = withBotProtection(request, "error-log", {
      allowLegitBots: false,
      blockThreshold: 80, // Threshold mais alto para permitir logs de erro
    });

    if (!botCheck.allowed) {
      return botCheck.response;
    }

    // Rate limiting por IP
    const rateLimitResult = checkCombinedRateLimit({
      ip: clientIP,
      endpoint: "error-log",
      configKey: "errorLog",
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitos logs de erro. Aguarde um momento.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

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

    // Sanitiza e limita tamanho dos inputs
    const sanitizedMessage = sanitizeString(message || errorMessage)?.substring(0, 2000);
    const sanitizedErrorMessage = errorMessage ? sanitizeString(errorMessage)?.substring(0, 2000) : undefined;
    const sanitizedErrorStack = errorStack ? sanitizeString(errorStack)?.substring(0, 10000) : undefined;
    const sanitizedComponent = component ? sanitizeString(component)?.substring(0, 100) : "client";
    const sanitizedPageUrl = pageUrl ? sanitizeString(pageUrl)?.substring(0, 500) : undefined;

    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: "Mensagem inválida" },
        { status: 400 }
      );
    }

    // Valida o nível de log
    const validLevels = ["error", "critical", "warn", "info", "debug"];
    const sanitizedLevel = validLevels.includes(level) ? level : "error";

    const userAgent = request.headers.get("user-agent")?.substring(0, 500) || "unknown";

    // Limita e sanitiza contexto
    let sanitizedContext: Record<string, unknown> | undefined;
    if (context && typeof context === "object") {
      try {
        const contextStr = JSON.stringify(context);
        if (contextStr.length <= 5000) {
          sanitizedContext = {
            ...context,
            pageUrl: sanitizedPageUrl,
            sessionUser: session?.user?.name,
          };
        } else {
          sanitizedContext = {
            pageUrl: sanitizedPageUrl,
            sessionUser: session?.user?.name,
            contextTruncated: true,
          };
        }
      } catch {
        sanitizedContext = {
          pageUrl: sanitizedPageUrl,
          sessionUser: session?.user?.name,
        };
      }
    } else {
      sanitizedContext = {
        pageUrl: sanitizedPageUrl,
        sessionUser: session?.user?.name,
      };
    }

    // Loga o erro
    const ticketId = await logSystemError({
      level: sanitizedLevel as "error" | "critical" | "warn" | "info" | "debug",
      message: sanitizedMessage,
      errorMessage: sanitizedErrorMessage,
      errorStack: sanitizedErrorStack,
      component: sanitizedComponent,
      userId: session?.user?.id,
      userEmail: session?.user?.email || undefined,
      endpoint: sanitizedPageUrl,
      ipAddress: clientIP,
      userAgent,
      context: sanitizedContext,
      createTicket: createTicket || sanitizedLevel === "critical",
    });

    logger.debug("Erro do cliente logado", {
      message: sanitizedMessage.substring(0, 100),
      component: sanitizedComponent,
      userId: session?.user?.id,
      ticketCreated: !!ticketId,
    });

    return NextResponse.json(
      {
        success: true,
        ticketId,
        message: ticketId
          ? "Erro registrado e ticket criado automaticamente"
          : "Erro registrado com sucesso",
      },
      {
        headers: getRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    // Fallback - loga no console se falhar
    if (process.env.NODE_ENV === "development") {
      console.error("[log-error API] Erro ao processar:", error);
    }
    logger.error("Erro ao processar log de erro", error);

    return NextResponse.json(
      { error: "Erro ao processar log" },
      { status: 500 }
    );
  }
}
