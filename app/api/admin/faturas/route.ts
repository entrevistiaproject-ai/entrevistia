import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { faturas, users, transacoes } from "@/lib/db/schema";
import { sql, desc, eq, and, gte, lte, isNull, count } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageFinances) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const mes = searchParams.get("mes");
    const ano = searchParams.get("ano");
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    const db = getDB();

    // Construir filtros
    const filters = [];

    if (status && status !== "todas") {
      filters.push(eq(faturas.status, status));
    }

    if (mes) {
      filters.push(eq(faturas.mesReferencia, parseInt(mes)));
    }

    if (ano) {
      filters.push(eq(faturas.anoReferencia, parseInt(ano)));
    }

    if (userId) {
      filters.push(eq(faturas.userId, userId));
    }

    // Buscar faturas com dados do usuário
    const faturasQuery = await db
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
        createdAt: faturas.createdAt,
        // Dados do usuário
        usuarioNome: users.nome,
        usuarioEmail: users.email,
        usuarioEmpresa: users.empresa,
        usuarioPlanType: users.planType,
      })
      .from(faturas)
      .leftJoin(users, eq(faturas.userId, users.id))
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(desc(faturas.anoReferencia), desc(faturas.mesReferencia), desc(faturas.createdAt))
      .limit(limit)
      .offset(offset);

    // Contar total de faturas
    const [totalResult] = await db
      .select({ count: count() })
      .from(faturas)
      .where(filters.length > 0 ? and(...filters) : undefined);

    // Estatísticas gerais
    const now = new Date();
    const mesAtual = now.getMonth() + 1;
    const anoAtual = now.getFullYear();

    const [estatisticas] = await db
      .select({
        totalFaturas: count(),
        valorTotalEmitido: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
        valorTotalPago: sql<number>`coalesce(sum(cast(${faturas.valorPago} as decimal)), 0)`,
        faturasAbertas: sql<number>`count(*) filter (where ${faturas.status} = 'aberta')`,
        faturasPagas: sql<number>`count(*) filter (where ${faturas.status} = 'paga')`,
        faturasVencidas: sql<number>`count(*) filter (where ${faturas.status} = 'vencida')`,
        faturasCanceladas: sql<number>`count(*) filter (where ${faturas.status} = 'cancelada')`,
      })
      .from(faturas);

    // Estatísticas do mês atual
    const [estatisticasMes] = await db
      .select({
        totalFaturas: count(),
        valorTotal: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
        valorPago: sql<number>`coalesce(sum(cast(${faturas.valorPago} as decimal)), 0)`,
        faturasAbertas: sql<number>`count(*) filter (where ${faturas.status} = 'aberta')`,
        faturasPagas: sql<number>`count(*) filter (where ${faturas.status} = 'paga')`,
        faturasVencidas: sql<number>`count(*) filter (where ${faturas.status} = 'vencida')`,
      })
      .from(faturas)
      .where(
        and(
          eq(faturas.mesReferencia, mesAtual),
          eq(faturas.anoReferencia, anoAtual)
        )
      );

    // Formatar dados das faturas
    const faturasFormatadas = faturasQuery.map((f) => ({
      id: f.id,
      userId: f.userId,
      usuario: {
        nome: f.usuarioNome,
        email: f.usuarioEmail,
        empresa: f.usuarioEmpresa,
        planType: f.usuarioPlanType,
      },
      periodo: `${String(f.mesReferencia).padStart(2, "0")}/${f.anoReferencia}`,
      mesReferencia: f.mesReferencia,
      anoReferencia: f.anoReferencia,
      valorTotal: Number(f.valorTotal) || 0,
      valorPago: Number(f.valorPago) || 0,
      valorPendente: (Number(f.valorTotal) || 0) - (Number(f.valorPago) || 0),
      status: f.status,
      dataAbertura: f.dataAbertura?.toISOString() || null,
      dataFechamento: f.dataFechamento?.toISOString() || null,
      dataVencimento: f.dataVencimento || null,
      dataPagamento: f.dataPagamento?.toISOString() || null,
      estatisticas: {
        entrevistas: f.totalEntrevistas || 0,
        candidatos: f.totalCandidatos || 0,
        respostas: f.totalRespostas || 0,
        transacoes: f.totalTransacoes || 0,
      },
      metodoPagamento: f.metodoPagamento,
      paymentId: f.paymentId,
      createdAt: f.createdAt.toISOString(),
    }));

    return NextResponse.json({
      faturas: faturasFormatadas,
      pagination: {
        page,
        limit,
        total: totalResult.count,
        totalPages: Math.ceil(totalResult.count / limit),
      },
      estatisticas: {
        geral: {
          totalFaturas: estatisticas.totalFaturas,
          valorTotalEmitido: Number(estatisticas.valorTotalEmitido) || 0,
          valorTotalPago: Number(estatisticas.valorTotalPago) || 0,
          valorPendente: (Number(estatisticas.valorTotalEmitido) || 0) - (Number(estatisticas.valorTotalPago) || 0),
          faturasAbertas: Number(estatisticas.faturasAbertas) || 0,
          faturasPagas: Number(estatisticas.faturasPagas) || 0,
          faturasVencidas: Number(estatisticas.faturasVencidas) || 0,
          faturasCanceladas: Number(estatisticas.faturasCanceladas) || 0,
        },
        mesAtual: {
          periodo: `${String(mesAtual).padStart(2, "0")}/${anoAtual}`,
          totalFaturas: estatisticasMes.totalFaturas,
          valorTotal: Number(estatisticasMes.valorTotal) || 0,
          valorPago: Number(estatisticasMes.valorPago) || 0,
          faturasAbertas: Number(estatisticasMes.faturasAbertas) || 0,
          faturasPagas: Number(estatisticasMes.faturasPagas) || 0,
          faturasVencidas: Number(estatisticasMes.faturasVencidas) || 0,
        },
      },
    });
  } catch (error) {
    console.error("Erro ao listar faturas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
