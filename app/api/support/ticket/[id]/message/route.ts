import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTicketById, addTicketMessage } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/support/ticket/[id]/message
 * Adiciona uma mensagem ao ticket (usuário)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { mensagem } = body;

    if (!mensagem) {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 }
      );
    }

    // Verifica se ticket existe e pertence ao usuário
    const existingTicket = await getTicketById(id);
    if (!existingTicket) {
      return NextResponse.json(
        { error: "Ticket não encontrado" },
        { status: 404 }
      );
    }

    if (existingTicket.ticket.userId !== session.user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    // Verifica se ticket ainda está aberto
    if (
      existingTicket.ticket.status === "fechado" ||
      existingTicket.ticket.status === "cancelado"
    ) {
      return NextResponse.json(
        { error: "Não é possível adicionar mensagens a um ticket fechado" },
        { status: 400 }
      );
    }

    await addTicketMessage(id, {
      ticketId: id,
      autorTipo: "usuario",
      autorId: session.user.id,
      autorNome: session.user.name || "Usuário",
      autorEmail: session.user.email,
      mensagem,
      isInternal: false,
    });

    const updatedTicket = await getTicketById(id);

    // Filtra mensagens internas
    const messages = updatedTicket?.messages.filter((m) => !m.isInternal) || [];

    logger.info("Mensagem do usuário adicionada ao ticket", {
      ticketId: id,
      userId: session.user.id,
    });

    return NextResponse.json({
      success: true,
      ticket: updatedTicket?.ticket,
      messages,
    });
  } catch (error) {
    logger.error("Erro ao adicionar mensagem", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
