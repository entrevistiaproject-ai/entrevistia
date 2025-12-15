import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { faturas, transacoes } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getUserId } from "@/lib/auth/get-user";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;
    const db = getDB();

    // Buscar fatura do usuário
    const [fatura] = await db
      .select()
      .from(faturas)
      .where(and(eq(faturas.id, id), eq(faturas.userId, userId)));

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
        entrevistaId: transacoes.entrevistaId,
        createdAt: transacoes.createdAt,
      })
      .from(transacoes)
      .where(eq(transacoes.faturaId, id))
      .orderBy(desc(transacoes.createdAt));

    // Formatar resposta
    const faturaFormatada = {
      id: fatura.id,
      periodo: `${String(fatura.mesReferencia).padStart(2, "0")}/${fatura.anoReferencia}`,
      mesReferencia: fatura.mesReferencia,
      anoReferencia: fatura.anoReferencia,
      valorTotal: Number(fatura.valorTotal) || 0,
      valorPago: Number(fatura.valorPago) || 0,
      valorPendente:
        (Number(fatura.valorTotal) || 0) - (Number(fatura.valorPago) || 0),
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
        entrevistaId: t.entrevistaId,
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
