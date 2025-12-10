import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import {
  getTicketById,
  updateTicketStatus,
  assignTicket,
  addTicketMessage,
} from "@/lib/support/ticket-service";
import { db } from "@/lib/db";
import { tickets } from "@/lib/db/schema/tickets";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/tickets/[id]
 * Obtém detalhes de um ticket específico
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const result = await getTicketById(id);

    if (!result) {
      return NextResponse.json(
        { error: "Ticket não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    logger.error("Erro ao buscar ticket", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/tickets/[id]
 * Atualiza um ticket (status, prioridade, categoria, atribuição)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, prioridade, categoria, assignedTo, resolucao } = body;

    // Verifica se ticket existe
    const existingTicket = await getTicketById(id);
    if (!existingTicket) {
      return NextResponse.json(
        { error: "Ticket não encontrado" },
        { status: 404 }
      );
    }

    // Atualiza status se fornecido
    if (status && status !== existingTicket.ticket.status) {
      await updateTicketStatus(
        id,
        status,
        { id: session.id, nome: session.nome, tipo: "admin" },
        resolucao
      );
    }

    // Atualiza atribuição se fornecido
    if (assignedTo && assignedTo !== existingTicket.ticket.assignedTo) {
      await assignTicket(id, assignedTo, session.nome);
    }

    // Atualiza outros campos
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (prioridade) updateData.prioridade = prioridade;
    if (categoria) updateData.categoria = categoria;

    if (Object.keys(updateData).length > 1) {
      await db.update(tickets).set(updateData).where(eq(tickets.id, id));
    }

    const updatedTicket = await getTicketById(id);

    logger.info("Ticket atualizado", {
      ticketId: id,
      adminId: session.id,
      changes: { status, prioridade, categoria, assignedTo },
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    logger.error("Erro ao atualizar ticket", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/tickets/[id]
 * Adiciona uma mensagem ao ticket
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { mensagem, isInternal } = body;

    if (!mensagem) {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 }
      );
    }

    // Verifica se ticket existe
    const existingTicket = await getTicketById(id);
    if (!existingTicket) {
      return NextResponse.json(
        { error: "Ticket não encontrado" },
        { status: 404 }
      );
    }

    await addTicketMessage(id, {
      ticketId: id,
      autorTipo: "admin",
      autorId: session.id,
      autorNome: session.nome,
      autorEmail: session.email,
      mensagem,
      isInternal: isInternal || false,
    });

    const updatedTicket = await getTicketById(id);

    logger.info("Mensagem adicionada ao ticket", {
      ticketId: id,
      adminId: session.id,
      isInternal,
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    logger.error("Erro ao adicionar mensagem", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
