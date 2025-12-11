import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createTicket, getTickets, getTicketById } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";
import {
  checkCombinedRateLimit,
  getClientIP,
  getRateLimitHeaders,
  sanitizeString,
  sanitizeEmail,
  withBotProtection,
  recordFailedAttempt,
} from "@/lib/security";

/**
 * GET /api/support/ticket
 * Lista tickets do usuário logado
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const ticketId = searchParams.get("id");

    // Se tem ID, retorna ticket específico
    if (ticketId) {
      const result = await getTicketById(ticketId);

      if (!result) {
        return NextResponse.json(
          { error: "Ticket não encontrado" },
          { status: 404 }
        );
      }

      // Verifica se pertence ao usuário
      if (result.ticket.userId !== session.user.id) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
      }

      // Filtra mensagens internas
      const messages = result.messages.filter((m) => !m.isInternal);

      return NextResponse.json({
        ticket: result.ticket,
        messages,
        history: result.history,
      });
    }

    // Lista todos os tickets do usuário
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0"), 0);

    const result = await getTickets({
      userId: session.user.id,
      limit,
      offset,
    });

    return NextResponse.json(result);
  } catch (error) {
    logger.error("Erro ao listar tickets do usuário", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/support/ticket
 * Cria um novo ticket de suporte
 *
 * Proteções:
 * - Rate limiting por IP e email
 * - Detecção de bots
 * - Sanitização de inputs
 */
export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  try {
    // Proteção contra bots
    const botCheck = withBotProtection(request, "support-ticket", {
      allowLegitBots: false,
      blockThreshold: 60,
    });

    if (!botCheck.allowed) {
      recordFailedAttempt(clientIP, "support-ticket");
      return botCheck.response;
    }

    // Rate limiting por IP
    const rateLimitResult = checkCombinedRateLimit({
      ip: clientIP,
      endpoint: "support-ticket",
      configKey: "supportTicket",
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitos tickets criados recentemente. Aguarde antes de criar outro.",
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
      titulo,
      descricao,
      categoria,
      origem,
      pageUrl,
      errorMessage,
      errorStack,
      errorContext,
      email,
      nome,
    } = body;

    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    // Sanitiza inputs
    const sanitizedTitulo = sanitizeString(titulo)?.substring(0, 200);
    const sanitizedDescricao = sanitizeString(descricao)?.substring(0, 10000);

    if (!sanitizedTitulo || sanitizedTitulo.length < 3) {
      return NextResponse.json(
        { error: "Título inválido ou muito curto" },
        { status: 400 }
      );
    }

    if (!sanitizedDescricao || sanitizedDescricao.length < 10) {
      return NextResponse.json(
        { error: "Descrição inválida ou muito curta" },
        { status: 400 }
      );
    }

    // Se não está logado, precisa de email
    const userEmail = session?.user?.email || (email ? sanitizeEmail(email) : null);
    if (!userEmail) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Rate limit adicional por email
    const emailRateLimit = checkCombinedRateLimit({
      email: userEmail,
      endpoint: "support-ticket-email",
      configKey: "supportTicket",
      checkSuspicious: false,
    });

    if (!emailRateLimit.success) {
      return NextResponse.json(
        {
          error: "Muitos tickets deste email. Aguarde ou verifique tickets existentes.",
          retryAfter: emailRateLimit.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(emailRateLimit),
        }
      );
    }

    const userAgent = request.headers.get("user-agent")?.substring(0, 500) || "unknown";

    // Valida categoria
    const validCategories = ["usuario", "sistemico", "faturamento", "performance", "seguranca", "integracao", "sugestao", "outro"];
    const sanitizedCategoria = categoria && validCategories.includes(categoria)
      ? categoria as "usuario" | "sistemico" | "faturamento" | "performance" | "seguranca" | "integracao" | "sugestao" | "outro"
      : undefined;

    // Parseia errorContext se for string
    let parsedErrorContext: Record<string, unknown> | undefined;
    if (errorContext) {
      if (typeof errorContext === "string") {
        try {
          parsedErrorContext = JSON.parse(errorContext.substring(0, 5000));
        } catch {
          parsedErrorContext = { raw: errorContext.substring(0, 5000) };
        }
      } else if (typeof errorContext === "object") {
        parsedErrorContext = errorContext;
      }
    }

    const ticket = await createTicket({
      userId: session?.user?.id,
      userEmail,
      userName: session?.user?.name || (nome ? sanitizeString(nome)?.substring(0, 100) : undefined),
      titulo: sanitizedTitulo,
      descricao: sanitizedDescricao,
      categoria: sanitizedCategoria,
      origem: origem || "widget_suporte",
      pageUrl: pageUrl ? sanitizeString(pageUrl)?.substring(0, 500) : undefined,
      ipAddress: clientIP,
      userAgent,
      browserInfo: userAgent,
      errorMessage: errorMessage ? sanitizeString(errorMessage)?.substring(0, 2000) : undefined,
      errorStack: errorStack ? sanitizeString(errorStack)?.substring(0, 5000) : undefined,
      errorContext: parsedErrorContext,
    });

    logger.info("Ticket de suporte criado", {
      ticketId: ticket.id,
      userId: session?.user?.id,
      origem: ticket.origem,
    });

    return NextResponse.json(
      {
        success: true,
        ticket: {
          id: ticket.id,
          titulo: ticket.titulo,
          status: ticket.status,
          prioridade: ticket.prioridade,
          categoria: ticket.categoria,
          createdAt: ticket.createdAt,
        },
        message: "Seu chamado foi criado com sucesso! Nossa equipe entrará em contato em breve.",
      },
      {
        status: 201,
        headers: getRateLimitHeaders(rateLimitResult),
      }
    );
  } catch (error) {
    logger.error("Erro ao criar ticket de suporte", error);
    return NextResponse.json(
      { error: "Erro ao criar chamado. Tente novamente." },
      { status: 500 }
    );
  }
}
