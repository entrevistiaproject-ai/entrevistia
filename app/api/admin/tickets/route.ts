import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import {
  getTickets,
  getTicketStats,
  createTicket,
} from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";

/**
 * GET /api/admin/tickets
 * Lista todos os tickets com filtros
 */
export async function GET(request: NextRequest) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const categoria = searchParams.get("categoria") || undefined;
    const prioridade = searchParams.get("prioridade") || undefined;
    const assignedTo = searchParams.get("assignedTo") || undefined;
    const search = searchParams.get("search") || undefined;
    const includeStats = searchParams.get("includeStats") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const [ticketsResult, stats] = await Promise.all([
      getTickets({
        status,
        categoria,
        prioridade,
        assignedTo,
        search,
        limit,
        offset,
      }),
      includeStats ? getTicketStats() : null,
    ]);

    return NextResponse.json({
      tickets: ticketsResult.tickets,
      total: ticketsResult.total,
      stats,
    });
  } catch (error) {
    logger.error("Erro ao listar tickets", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/tickets
 * Cria um novo ticket (via admin)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { titulo, descricao, userEmail, userName, categoria, prioridade, userId } = body;

    if (!titulo || !descricao || !userEmail) {
      return NextResponse.json(
        { error: "Título, descrição e email são obrigatórios" },
        { status: 400 }
      );
    }

    const ticket = await createTicket({
      titulo,
      descricao,
      userEmail,
      userName,
      userId,
      categoria,
      prioridade,
      origem: "admin",
    });

    logger.info("Ticket criado via admin", {
      ticketId: ticket.id,
      adminId: session.id,
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    logger.error("Erro ao criar ticket via admin", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
