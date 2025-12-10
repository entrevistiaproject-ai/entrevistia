import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { transacoes, faturas, entrevistas } from "@/lib/db/schema";
import { eq, and, gte, desc, sql } from "drizzle-orm";
import { getUserId } from "@/lib/auth/get-user";

export async function GET(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    let periodo = "mes";
    try {
      const { searchParams } = new URL(request.url);
      periodo = searchParams.get("periodo") || "mes"; // mes, trimestre, ano, total
    } catch (error) {
      // Se falhar ao criar URL (ex: durante build), usa período padrão
      console.warn("Falha ao processar URL:", error);
    }

    const db = getDB();

    // Calcular data de início baseado no período
    const hoje = new Date();
    let dataInicio = new Date();

    switch (periodo) {
      case "mes":
        dataInicio.setMonth(hoje.getMonth() - 1);
        break;
      case "trimestre":
        dataInicio.setMonth(hoje.getMonth() - 3);
        break;
      case "ano":
        dataInicio.setFullYear(hoje.getFullYear() - 1);
        break;
      case "total":
        dataInicio = new Date(0); // Desde o início
        break;
    }

    // 1. Buscar fatura atual do usuário
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    let [faturaAtual] = await db
      .select()
      .from(faturas)
      .where(
        and(
          eq(faturas.userId, userId),
          eq(faturas.mesReferencia, mesAtual),
          eq(faturas.anoReferencia, anoAtual)
        )
      );

    // Se não existe, criar uma
    if (!faturaAtual) {
      [faturaAtual] = await db
        .insert(faturas)
        .values({
          userId,
          mesReferencia: mesAtual,
          anoReferencia: anoAtual,
        })
        .returning();
    }

    // Calcular totais históricos
    const totaisHistoricos = await db
      .select({
        totalGasto: sql<number>`COALESCE(SUM(${faturas.valorTotal}), 0)::numeric`,
        totalPago: sql<number>`COALESCE(SUM(${faturas.valorPago}), 0)::numeric`,
      })
      .from(faturas)
      .where(eq(faturas.userId, userId));

    // 2. Estatísticas de transações no período
    const transacoesPeriodo = await db
      .select({
        total: sql<number>`COUNT(*)::int`,
        custoTotal: sql<number>`COALESCE(SUM(${transacoes.valorCobrado}), 0)::numeric`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, userId),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    // Buscar custo por tipo separadamente
    const custoPorTipo = await db
      .select({
        tipo: transacoes.tipo,
        custo: sql<number>`SUM(${transacoes.valorCobrado})::numeric`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, userId),
          gte(transacoes.createdAt, dataInicio)
        )
      )
      .groupBy(transacoes.tipo);

    const custoPorTipoMap = custoPorTipo.reduce((acc, item) => {
      acc[item.tipo] = Number(item.custo);
      return acc;
    }, {} as Record<string, number>);

    // 3. Custo por entrevista
    const custosPorEntrevista = await db
      .select({
        entrevistaId: transacoes.entrevistaId,
        titulo: entrevistas.titulo,
        custoTotal: sql<number>`SUM(${transacoes.valorCobrado})::numeric`,
        numTransacoes: sql<number>`COUNT(*)::int`,
      })
      .from(transacoes)
      .leftJoin(entrevistas, eq(transacoes.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(transacoes.userId, userId),
          gte(transacoes.createdAt, dataInicio)
        )
      )
      .groupBy(transacoes.entrevistaId, entrevistas.titulo)
      .orderBy(desc(sql`SUM(${transacoes.valorCobrado})`));

    // 4. Custo médio por candidato (baseado em respostas)
    const respostasStats = await db
      .select({
        totalRespostas: sql<number>`COUNT(DISTINCT ${transacoes.respostaId})::int`,
        custoRespostas: sql<number>`SUM(CASE
          WHEN ${transacoes.tipo} IN ('transcricao_audio', 'analise_ia', 'analise_pergunta')
          THEN ${transacoes.valorCobrado}
          ELSE 0
        END)::numeric`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, userId),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    const custoMedioPorCandidato =
      respostasStats[0].totalRespostas > 0
        ? Number(respostasStats[0].custoRespostas) / respostasStats[0].totalRespostas
        : 0;

    // 5. Evolução mensal (últimos 6 meses)
    const seismesesAtras = new Date();
    seismesesAtras.setMonth(hoje.getMonth() - 6);

    const evolucaoMensal = await db
      .select({
        mes: sql<string>`TO_CHAR(${transacoes.createdAt}, 'YYYY-MM')`,
        custo: sql<number>`SUM(${transacoes.valorCobrado})::numeric`,
        transacoes: sql<number>`COUNT(*)::int`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, userId),
          gte(transacoes.createdAt, seismesesAtras)
        )
      )
      .groupBy(sql`TO_CHAR(${transacoes.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${transacoes.createdAt}, 'YYYY-MM')`);

    // 6. Top 5 entrevistas mais caras
    const top5Entrevistas = custosPorEntrevista.slice(0, 5);

    return NextResponse.json({
      faturaAtual: {
        id: faturaAtual.id,
        mesReferencia: faturaAtual.mesReferencia,
        anoReferencia: faturaAtual.anoReferencia,
        valorTotal: Number(faturaAtual.valorTotal),
        valorPago: Number(faturaAtual.valorPago),
        status: faturaAtual.status,
      },
      totais: {
        totalGastoHistorico: Number(totaisHistoricos[0]?.totalGasto || 0),
        totalPagoHistorico: Number(totaisHistoricos[0]?.totalPago || 0),
      },
      periodo: {
        dataInicio: dataInicio.toISOString(),
        dataFim: hoje.toISOString(),
        totalTransacoes: transacoesPeriodo[0]?.total || 0,
        custoTotal: Number(transacoesPeriodo[0]?.custoTotal || 0),
        custoPorTipo: custoPorTipoMap,
      },
      medias: {
        custoPorCandidato: Number(custoMedioPorCandidato.toFixed(2)),
        totalCandidatos: respostasStats[0].totalRespostas,
      },
      entrevistas: {
        total: custosPorEntrevista.length,
        top5: top5Entrevistas.map((e) => ({
          id: e.entrevistaId,
          titulo: e.titulo,
          custo: Number(e.custoTotal),
          transacoes: e.numTransacoes,
        })),
      },
      evolucao: evolucaoMensal.map((e) => ({
        mes: e.mes,
        custo: Number(e.custo),
        transacoes: e.transacoes,
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar custos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados de custos" },
      { status: 500 }
    );
  }
}
