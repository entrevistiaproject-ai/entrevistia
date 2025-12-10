import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { faturas } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getUserId } from "@/lib/auth/get-user";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const db = getDB();

    // Buscar todas as faturas do usuário
    const faturasUsuario = await db
      .select({
        id: faturas.id,
        mesReferencia: faturas.mesReferencia,
        anoReferencia: faturas.anoReferencia,
        valorTotal: faturas.valorTotal,
        valorPago: faturas.valorPago,
        status: faturas.status,
        dataAbertura: faturas.dataAbertura,
        dataVencimento: faturas.dataVencimento,
        dataPagamento: faturas.dataPagamento,
        totalEntrevistas: faturas.totalEntrevistas,
        totalCandidatos: faturas.totalCandidatos,
        totalRespostas: faturas.totalRespostas,
        totalTransacoes: faturas.totalTransacoes,
        createdAt: faturas.createdAt,
      })
      .from(faturas)
      .where(eq(faturas.userId, userId))
      .orderBy(desc(faturas.anoReferencia), desc(faturas.mesReferencia));

    // Formatar resposta
    const faturasFormatadas = faturasUsuario.map((f) => ({
      id: f.id,
      periodo: `${String(f.mesReferencia).padStart(2, "0")}/${f.anoReferencia}`,
      mesReferencia: f.mesReferencia,
      anoReferencia: f.anoReferencia,
      valorTotal: Number(f.valorTotal) || 0,
      valorPago: Number(f.valorPago) || 0,
      valorPendente: (Number(f.valorTotal) || 0) - (Number(f.valorPago) || 0),
      status: f.status,
      dataAbertura: f.dataAbertura?.toISOString() || null,
      dataVencimento: f.dataVencimento || null,
      dataPagamento: f.dataPagamento?.toISOString() || null,
      estatisticas: {
        entrevistas: f.totalEntrevistas || 0,
        candidatos: f.totalCandidatos || 0,
        respostas: f.totalRespostas || 0,
        transacoes: f.totalTransacoes || 0,
      },
      createdAt: f.createdAt.toISOString(),
    }));

    // Calcular totais
    const totais = {
      totalFaturas: faturasFormatadas.length,
      valorTotal: faturasFormatadas.reduce((acc, f) => acc + f.valorTotal, 0),
      valorPago: faturasFormatadas.reduce((acc, f) => acc + f.valorPago, 0),
      valorPendente: faturasFormatadas.reduce(
        (acc, f) => acc + f.valorPendente,
        0
      ),
      faturasPagas: faturasFormatadas.filter((f) => f.status === "paga").length,
      faturasAbertas: faturasFormatadas.filter((f) => f.status === "aberta")
        .length,
      faturasVencidas: faturasFormatadas.filter((f) => f.status === "vencida")
        .length,
    };

    return NextResponse.json({
      faturas: faturasFormatadas,
      totais,
    });
  } catch (error) {
    console.error("Erro ao buscar faturas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
