import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { faturas, users, transacoes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageFinances) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const db = getDB();

    // Buscar fatura com dados do usuário
    const [fatura] = await db
      .select({
        id: faturas.id,
        userId: faturas.userId,
        mesReferencia: faturas.mesReferencia,
        anoReferencia: faturas.anoReferencia,
        valorTotal: faturas.valorTotal,
        valorPago: faturas.valorPago,
        status: faturas.status,
        dataAbertura: faturas.dataAbertura,
        dataFechamento: faturas.dataFechamento,
        dataVencimento: faturas.dataVencimento,
        dataPagamento: faturas.dataPagamento,
        totalEntrevistas: faturas.totalEntrevistas,
        totalCandidatos: faturas.totalCandidatos,
        totalRespostas: faturas.totalRespostas,
        totalTransacoes: faturas.totalTransacoes,
        metodoPagamento: faturas.metodoPagamento,
        paymentId: faturas.paymentId,
        paymentData: faturas.paymentData,
        createdAt: faturas.createdAt,
        updatedAt: faturas.updatedAt,
        // Dados do usuário
        usuarioNome: users.nome,
        usuarioEmail: users.email,
        usuarioEmpresa: users.empresa,
        usuarioCargo: users.cargo,
        usuarioTelefone: users.telefone,
        usuarioPlanType: users.planType,
      })
      .from(faturas)
      .leftJoin(users, eq(faturas.userId, users.id))
      .where(eq(faturas.id, id));

    if (!fatura) {
      return NextResponse.json(
        { error: "Fatura não encontrada" },
        { status: 404 }
      );
    }

    // Buscar transações da fatura
    const transacoesFatura = await db
      .select({
        id: transacoes.id,
        tipo: transacoes.tipo,
        custoBase: transacoes.custoBase,
        markup: transacoes.markup,
        valorCobrado: transacoes.valorCobrado,
        descricao: transacoes.descricao,
        status: transacoes.status,
        metadados: transacoes.metadados,
        createdAt: transacoes.createdAt,
      })
      .from(transacoes)
      .where(eq(transacoes.faturaId, id))
      .orderBy(desc(transacoes.createdAt));

    // Formatar resposta
    const faturaFormatada = {
      id: fatura.id,
      userId: fatura.userId,
      usuario: {
        nome: fatura.usuarioNome,
        email: fatura.usuarioEmail,
        empresa: fatura.usuarioEmpresa,
        cargo: fatura.usuarioCargo,
        telefone: fatura.usuarioTelefone,
        planType: fatura.usuarioPlanType,
      },
      periodo: `${String(fatura.mesReferencia).padStart(2, "0")}/${fatura.anoReferencia}`,
      mesReferencia: fatura.mesReferencia,
      anoReferencia: fatura.anoReferencia,
      valorTotal: Number(fatura.valorTotal) || 0,
      valorPago: Number(fatura.valorPago) || 0,
      valorPendente: (Number(fatura.valorTotal) || 0) - (Number(fatura.valorPago) || 0),
      status: fatura.status,
      dataAbertura: fatura.dataAbertura?.toISOString() || null,
      dataFechamento: fatura.dataFechamento?.toISOString() || null,
      dataVencimento: fatura.dataVencimento || null,
      dataPagamento: fatura.dataPagamento?.toISOString() || null,
      estatisticas: {
        entrevistas: fatura.totalEntrevistas || 0,
        candidatos: fatura.totalCandidatos || 0,
        respostas: fatura.totalRespostas || 0,
        transacoes: fatura.totalTransacoes || 0,
      },
      metodoPagamento: fatura.metodoPagamento,
      paymentId: fatura.paymentId,
      paymentData: fatura.paymentData,
      createdAt: fatura.createdAt.toISOString(),
      updatedAt: fatura.updatedAt.toISOString(),
      transacoes: transacoesFatura.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        custoBase: Number(t.custoBase) || 0,
        markup: Number(t.markup) || 0,
        valorCobrado: Number(t.valorCobrado) || 0,
        descricao: t.descricao,
        status: t.status,
        metadados: t.metadados,
        createdAt: t.createdAt.toISOString(),
      })),
    };

    return NextResponse.json({ fatura: faturaFormatada });
  } catch (error) {
    console.error("Erro ao buscar fatura:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Atualizar status da fatura
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageFinances) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, valorPago, dataPagamento, metodoPagamento } = body;

    const db = getDB();

    // Verificar se a fatura existe
    const [faturaExistente] = await db
      .select({ id: faturas.id })
      .from(faturas)
      .where(eq(faturas.id, id));

    if (!faturaExistente) {
      return NextResponse.json(
        { error: "Fatura não encontrada" },
        { status: 404 }
      );
    }

    // Preparar dados para atualização
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;
    }

    if (valorPago !== undefined) {
      updateData.valorPago = valorPago.toString();
    }

    if (dataPagamento) {
      updateData.dataPagamento = new Date(dataPagamento);
    }

    if (metodoPagamento) {
      updateData.metodoPagamento = metodoPagamento;
    }

    // Se marcando como paga, definir data de pagamento se não informada
    if (status === "paga" && !dataPagamento) {
      updateData.dataPagamento = new Date();
    }

    // Atualizar fatura
    await db
      .update(faturas)
      .set(updateData)
      .where(eq(faturas.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar fatura:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
