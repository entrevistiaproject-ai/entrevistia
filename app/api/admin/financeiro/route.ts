import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes } from "@/lib/db/schema";
import { sql, desc, gte, and, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageFinances) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get("periodo") || "6m";

    const db = getDB();
    const now = new Date();
    let mesesAtras: number;

    switch (periodo) {
      case "1m":
        mesesAtras = 1;
        break;
      case "3m":
        mesesAtras = 3;
        break;
      case "6m":
        mesesAtras = 6;
        break;
      case "1y":
        mesesAtras = 12;
        break;
      default:
        mesesAtras = 6;
    }

    const dataInicio = new Date(now.getFullYear(), now.getMonth() - mesesAtras, 1);
    const mesAtual = now.getMonth() + 1;
    const anoAtual = now.getFullYear();
    const mesAnterior = mesAtual === 1 ? 12 : mesAtual - 1;
    const anoMesAnterior = mesAtual === 1 ? anoAtual - 1 : anoAtual;

    // Resumo Financeiro
    const [resumoTotal] = await db
      .select({
        receitaTotal: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
        custoTotal: sql<number>`coalesce(
          (select sum(cast(custo_base as decimal)) from transacoes), 0
        )`,
      })
      .from(faturas);

    const [resumoMesAtual] = await db
      .select({
        receita: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
      })
      .from(faturas)
      .where(
        and(eq(faturas.mesReferencia, mesAtual), eq(faturas.anoReferencia, anoAtual))
      );

    const [custoMesAtual] = await db
      .select({
        custo: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
      })
      .from(transacoes)
      .where(
        and(
          gte(transacoes.createdAt, new Date(anoAtual, mesAtual - 1, 1)),
          sql`${transacoes.createdAt} < ${new Date(anoAtual, mesAtual, 1)}`
        )
      );

    const [resumoMesAnterior] = await db
      .select({
        receita: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
      })
      .from(faturas)
      .where(
        and(
          eq(faturas.mesReferencia, mesAnterior),
          eq(faturas.anoReferencia, anoMesAnterior)
        )
      );

    const [custoMesAnterior] = await db
      .select({
        custo: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
      })
      .from(transacoes)
      .where(
        and(
          gte(transacoes.createdAt, new Date(anoMesAnterior, mesAnterior - 1, 1)),
          sql`${transacoes.createdAt} < ${new Date(anoMesAnterior, mesAnterior, 1)}`
        )
      );

    const receitaAtual = Number(resumoMesAtual.receita) || 0;
    const custoAtualNum = Number(custoMesAtual.custo) || 0;
    const receitaAnterior = Number(resumoMesAnterior.receita) || 1;
    const custoAnteriorNum = Number(custoMesAnterior.custo) || 1;
    const lucroAtual = receitaAtual - custoAtualNum;
    const lucroAnterior = receitaAnterior - custoAnteriorNum;

    // Custos por Tipo
    const custosPorTipo = await db
      .select({
        tipo: transacoes.tipo,
        custoBase: sql<number>`sum(cast(${transacoes.custoBase} as decimal))`,
        valorCobrado: sql<number>`sum(cast(${transacoes.valorCobrado} as decimal))`,
        quantidade: sql<number>`count(*)`,
      })
      .from(transacoes)
      .where(gte(transacoes.createdAt, dataInicio))
      .groupBy(transacoes.tipo);

    // Receita por Mês
    const receitaPorMes = await db
      .select({
        mes: sql<string>`to_char(date_trunc('month', ${faturas.dataAbertura}), 'Mon/YY')`,
        receita: sql<number>`sum(cast(${faturas.valorTotal} as decimal))`,
      })
      .from(faturas)
      .where(gte(faturas.dataAbertura, dataInicio))
      .groupBy(sql`date_trunc('month', ${faturas.dataAbertura})`)
      .orderBy(sql`date_trunc('month', ${faturas.dataAbertura})`);

    const custoPorMes = await db
      .select({
        mes: sql<string>`to_char(date_trunc('month', ${transacoes.createdAt}), 'Mon/YY')`,
        custo: sql<number>`sum(cast(${transacoes.custoBase} as decimal))`,
      })
      .from(transacoes)
      .where(gte(transacoes.createdAt, dataInicio))
      .groupBy(sql`date_trunc('month', ${transacoes.createdAt})`)
      .orderBy(sql`date_trunc('month', ${transacoes.createdAt})`);

    const receitaCustoMerged = receitaPorMes.map((r) => {
      const custoItem = custoPorMes.find((c) => c.mes === r.mes);
      const custo = Number(custoItem?.custo) || 0;
      const receita = Number(r.receita) || 0;
      return {
        mes: r.mes,
        receita,
        custo,
        lucro: receita - custo,
      };
    });

    // Consumo de Tokens (simulado - precisa extrair de metadados)
    const [tokensStats] = await db
      .select({
        totalInput: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'tokensEntrada')::int as bigint)), 0)`,
        totalOutput: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'tokensSaida')::int as bigint)), 0)`,
        custoTokens: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
      })
      .from(transacoes)
      .where(gte(transacoes.createdAt, dataInicio));

    // Por modelo (simplificado)
    const porModelo = [
      {
        modelo: "Claude 3.5 Sonnet",
        input: Number(tokensStats.totalInput) || 0,
        output: Number(tokensStats.totalOutput) || 0,
        custo: Number(tokensStats.custoTokens) || 0,
      },
    ];

    // Margem por Operação
    const margemPorOperacao = custosPorTipo.map((c) => {
      const custo = Number(c.custoBase) || 0;
      const valor = Number(c.valorCobrado) || 0;
      const margem = valor > 0 ? ((valor - custo) / valor) * 100 : 0;
      return {
        operacao: c.tipo,
        custoMedio: custo / (Number(c.quantidade) || 1),
        valorMedio: valor / (Number(c.quantidade) || 1),
        margem,
        volume: Number(c.quantidade) || 0,
      };
    });

    // Top Custos por Usuário
    const topCustosUsuarios = await db
      .select({
        id: users.id,
        nome: users.nome,
        custo: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
        receita: sql<number>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
      })
      .from(users)
      .leftJoin(transacoes, eq(users.id, transacoes.userId))
      .where(gte(transacoes.createdAt, dataInicio))
      .groupBy(users.id, users.nome)
      .orderBy(desc(sql`sum(cast(${transacoes.custoBase} as decimal))`))
      .limit(5);

    // Calcular métricas
    const receitaTotalNum = Number(resumoTotal.receitaTotal) || 0;
    const custoTotalNum = Number(resumoTotal.custoTotal) || 0;
    const lucroTotal = receitaTotalNum - custoTotalNum;
    const margemMedia = receitaTotalNum > 0 ? ((receitaTotalNum - custoTotalNum) / receitaTotalNum) * 100 : 0;
    const margemMesAtual = receitaAtual > 0 ? ((receitaAtual - custoAtualNum) / receitaAtual) * 100 : 0;

    // Projeção (baseado em média dos últimos 3 meses)
    const ultimosMeses = receitaCustoMerged.slice(-3);
    const mediaReceita = ultimosMeses.reduce((acc, m) => acc + m.receita, 0) / (ultimosMeses.length || 1);
    const mediaCusto = ultimosMeses.reduce((acc, m) => acc + m.custo, 0) / (ultimosMeses.length || 1);

    return NextResponse.json({
      resumo: {
        receitaTotal: receitaTotalNum,
        custoTotal: custoTotalNum,
        lucroTotal,
        margemMedia,
        receitaMesAtual: receitaAtual,
        custoMesAtual: custoAtualNum,
        lucroMesAtual: lucroAtual,
        margemMesAtual,
        variacao: {
          receita: receitaAnterior > 0 ? ((receitaAtual - receitaAnterior) / receitaAnterior) * 100 : 0,
          custo: custoAnteriorNum > 0 ? ((custoAtualNum - custoAnteriorNum) / custoAnteriorNum) * 100 : 0,
          lucro: lucroAnterior !== 0 ? ((lucroAtual - lucroAnterior) / Math.abs(lucroAnterior)) * 100 : 0,
        },
      },
      custosPorTipo: custosPorTipo.map((c) => ({
        tipo: c.tipo,
        custoBase: Number(c.custoBase) || 0,
        valorCobrado: Number(c.valorCobrado) || 0,
        margem:
          Number(c.valorCobrado) > 0
            ? ((Number(c.valorCobrado) - Number(c.custoBase)) / Number(c.valorCobrado)) * 100
            : 0,
        quantidade: Number(c.quantidade) || 0,
      })),
      receitaPorMes: receitaCustoMerged,
      tokensConsumo: {
        totalInput: Number(tokensStats.totalInput) || 0,
        totalOutput: Number(tokensStats.totalOutput) || 0,
        custoTokens: Number(tokensStats.custoTokens) || 0,
        porModelo,
      },
      margemPorOperacao,
      topCustosUsuarios: topCustosUsuarios.map((u) => {
        const custo = Number(u.custo) || 0;
        const receita = Number(u.receita) || 0;
        return {
          id: u.id,
          nome: u.nome,
          custo,
          receita,
          margem: receita > 0 ? ((receita - custo) / receita) * 100 : 0,
        };
      }),
      projecao: {
        receitaProjetada: mediaReceita * 1.1, // 10% de crescimento projetado
        custoProjetado: mediaCusto * 1.05, // 5% de aumento projetado
        lucroProjetado: mediaReceita * 1.1 - mediaCusto * 1.05,
      },
    });
  } catch (error) {
    console.error("Erro no financeiro admin:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
