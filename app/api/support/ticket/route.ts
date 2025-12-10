import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createTicket, getTickets, getTicketById } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";

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
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

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
 */
export async function POST(request: NextRequest) {
  try {
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
      // Para usuários não logados (página de erro)
      email,
      nome,
    } = body;

    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    // Se não está logado, precisa de email
    const userEmail = session?.user?.email || email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Captura informações do request
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const ticket = await createTicket({
      userId: session?.user?.id,
      userEmail,
      userName: session?.user?.name || nome,
      titulo,
      descricao,
      categoria: categoria || undefined,
      origem: origem || "widget_suporte",
      pageUrl,
      ipAddress,
      userAgent,
      browserInfo: userAgent,
      errorMessage,
      errorStack,
      errorContext,
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
      { status: 201 }
    );
  } catch (error) {
    logger.error("Erro ao criar ticket de suporte", error);
    return NextResponse.json(
      { error: "Erro ao criar chamado. Tente novamente." },
      { status: 500 }
    );
  }
}
