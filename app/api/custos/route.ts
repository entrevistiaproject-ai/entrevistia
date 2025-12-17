import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { transacoes, faturas, entrevistas, candidatoEntrevistas, users } from "@/lib/db/schema";
import { eq, and, gte, desc, sql } from "drizzle-orm";
import { getUserId } from "@/lib/auth/get-user";
import { getUsageFinanceiro } from "@/lib/services/billing";
import { PlanType } from "@/lib/config/free-trial";
import { getEffectiveOwnerId } from "@/lib/services/team-service";

/**
 * GET /api/custos
 *
 * Retorna informações detalhadas de custos da CONTA (owner).
 * Se o usuário é membro de um time, retorna os custos da conta do owner.
 */
export async function GET(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Obtém o owner efetivo (se for membro de time, usa o owner do time)
    const ownerId = await getEffectiveOwnerId(userId);

    let periodo = "mes";
    try {
      const { searchParams } = new URL(request.url);
      periodo = searchParams.get("periodo") || "mes"; // mes, trimestre, ano, total
    } catch (error) {
      // Se falhar ao criar URL (ex: durante build), usa período padrão
      console.warn("Falha ao processar URL:", error);
    }

    const db = getDB();

    // Buscar planType do OWNER (conta)
    const [owner] = await db
      .select({ planType: users.planType })
      .from(users)
      .where(eq(users.id, ownerId));

    const planType = owner?.planType || PlanType.FREE_TRIAL;

    // Se for free trial, buscar usage financeiro (já usa owner internamente)
    let usageFinanceiro = null;
    if (planType === PlanType.FREE_TRIAL) {
      usageFinanceiro = await getUsageFinanceiro(userId);
    }

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

    // 1. Buscar fatura atual da CONTA (owner)
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    let [faturaAtual] = await db
      .select()
      .from(faturas)
      .where(
        and(
          eq(faturas.userId, ownerId),
          eq(faturas.mesReferencia, mesAtual),
          eq(faturas.anoReferencia, anoAtual)
        )
      );

    // Se não existe, criar uma para o owner
    if (!faturaAtual) {
      [faturaAtual] = await db
        .insert(faturas)
        .values({
          userId: ownerId,
          mesReferencia: mesAtual,
          anoReferencia: anoAtual,
        })
        .returning();
    }

    // Calcular totais históricos da conta
    const totaisHistoricos = await db
      .select({
        totalGasto: sql<number>`COALESCE(SUM(${faturas.valorTotal}), 0)::numeric`,
        totalPago: sql<number>`COALESCE(SUM(${faturas.valorPago}), 0)::numeric`,
      })
      .from(faturas)
      .where(eq(faturas.userId, ownerId));

    // 2. Estatísticas de transações no período (da conta)
    const transacoesPeriodo = await db
      .select({
        total: sql<number>`COUNT(*)::int`,
        custoTotal: sql<number>`COALESCE(SUM(${transacoes.valorCobrado}), 0)::numeric`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, ownerId),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    // Buscar custo por tipo separadamente (da conta)
    const custoPorTipo = await db
      .select({
        tipo: transacoes.tipo,
        custo: sql<number>`SUM(${transacoes.valorCobrado})::numeric`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, ownerId),
          gte(transacoes.createdAt, dataInicio)
        )
      )
      .groupBy(transacoes.tipo);

    const custoPorTipoMap = custoPorTipo.reduce((acc, item) => {
      acc[item.tipo] = Number(item.custo);
      return acc;
    }, {} as Record<string, number>);

    // 3. Custo por entrevista (da conta)
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
          eq(transacoes.userId, ownerId),
          gte(transacoes.createdAt, dataInicio)
        )
      )
      .groupBy(transacoes.entrevistaId, entrevistas.titulo)
      .orderBy(desc(sql`SUM(${transacoes.valorCobrado})`));

    // 4. Custo médio por candidato (da conta)
    // Conta quantas taxas base foram cobradas (1 por candidato avaliado)
    const candidatosStats = await db
      .select({
        totalCandidatos: sql<number>`COUNT(*)::int`,
        custoTaxaBase: sql<number>`COALESCE(SUM(${transacoes.valorCobrado}), 0)::numeric`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, ownerId),
          eq(transacoes.tipo, "taxa_base_candidato"),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    // Custo total das análises de perguntas (da conta)
    const analisesStats = await db
      .select({
        custoAnalises: sql<number>`COALESCE(SUM(${transacoes.valorCobrado}), 0)::numeric`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, ownerId),
          eq(transacoes.tipo, "analise_pergunta"),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    const totalCandidatos = candidatosStats[0]?.totalCandidatos || 0;
    const custoTotalCandidatos = Number(candidatosStats[0]?.custoTaxaBase || 0) + Number(analisesStats[0]?.custoAnalises || 0);

    const custoMedioPorCandidato = totalCandidatos > 0
      ? custoTotalCandidatos / totalCandidatos
      : 0;

    // 5. Evolução mensal (últimos 6 meses) da conta
    const seismesesAtras = new Date();
    seismesesAtras.setMonth(hoje.getMonth() - 6);

    const evolucaoMensal = await db
      .select({
        mes: sql<string>`TO_CHAR(${transacoes.createdAt}, 'YYYY-MM')`,
        custo: sql<number>`SUM(${transacoes.valorCobrado})::numeric`,
        transacoes: sql<number>`COUNT(*)::int`,
        // Conta apenas taxa_base_candidato para representar o número real de análises (candidatos)
        analises: sql<number>`COUNT(*) FILTER (WHERE ${transacoes.tipo} = 'taxa_base_candidato')::int`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, ownerId),
          gte(transacoes.createdAt, seismesesAtras)
        )
      )
      .groupBy(sql`TO_CHAR(${transacoes.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${transacoes.createdAt}, 'YYYY-MM')`);

    // 6. Top 5 entrevistas mais caras
    const top5Entrevistas = custosPorEntrevista.slice(0, 5);

    // 7. Métricas de análises - Total de perguntas analisadas no período (da conta)
    const perguntasAnalisadas = await db
      .select({
        total: sql<number>`COUNT(*)::int`,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, ownerId),
          eq(transacoes.tipo, "analise_pergunta"),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    // 8. Total de entrevistas analisadas (candidatos que tiveram análise completa) da conta
    const entrevistasAnalisadas = await db
      .select({
        total: sql<number>`COUNT(DISTINCT ${candidatoEntrevistas.id})::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, ownerId),
          sql`${candidatoEntrevistas.avaliadoEm} IS NOT NULL`,
          gte(candidatoEntrevistas.createdAt, dataInicio)
        )
      );

    // 9. Dados para gráfico de entrevistas por período (dia, semana, mês, ano) da conta
    // Gráfico diário (últimos 30 dias)
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    const entrevistasPorDia = await db
      .select({
        data: sql<string>`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM-DD')`,
        total: sql<number>`COUNT(DISTINCT ${candidatoEntrevistas.id})::int`,
        analisadas: sql<number>`COUNT(DISTINCT CASE WHEN ${candidatoEntrevistas.avaliadoEm} IS NOT NULL THEN ${candidatoEntrevistas.id} END)::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, ownerId),
          gte(candidatoEntrevistas.createdAt, trintaDiasAtras)
        )
      )
      .groupBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM-DD')`);

    // Gráfico semanal (últimas 12 semanas)
    const dozeSemanas = new Date();
    dozeSemanas.setDate(hoje.getDate() - 84);

    const entrevistasPorSemana = await db
      .select({
        semana: sql<string>`TO_CHAR(${candidatoEntrevistas.createdAt}, 'IYYY-IW')`,
        total: sql<number>`COUNT(DISTINCT ${candidatoEntrevistas.id})::int`,
        analisadas: sql<number>`COUNT(DISTINCT CASE WHEN ${candidatoEntrevistas.avaliadoEm} IS NOT NULL THEN ${candidatoEntrevistas.id} END)::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, ownerId),
          gte(candidatoEntrevistas.createdAt, dozeSemanas)
        )
      )
      .groupBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'IYYY-IW')`)
      .orderBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'IYYY-IW')`);

    // Gráfico mensal (últimos 12 meses)
    const dozeMesesAtras = new Date();
    dozeMesesAtras.setMonth(hoje.getMonth() - 12);

    const entrevistasPorMes = await db
      .select({
        mes: sql<string>`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM')`,
        total: sql<number>`COUNT(DISTINCT ${candidatoEntrevistas.id})::int`,
        analisadas: sql<number>`COUNT(DISTINCT CASE WHEN ${candidatoEntrevistas.avaliadoEm} IS NOT NULL THEN ${candidatoEntrevistas.id} END)::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, ownerId),
          gte(candidatoEntrevistas.createdAt, dozeMesesAtras)
        )
      )
      .groupBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM')`);

    // Gráfico anual (últimos 5 anos)
    const cincoAnosAtras = new Date();
    cincoAnosAtras.setFullYear(hoje.getFullYear() - 5);

    const entrevistasPorAno = await db
      .select({
        ano: sql<string>`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY')`,
        total: sql<number>`COUNT(DISTINCT ${candidatoEntrevistas.id})::int`,
        analisadas: sql<number>`COUNT(DISTINCT CASE WHEN ${candidatoEntrevistas.avaliadoEm} IS NOT NULL THEN ${candidatoEntrevistas.id} END)::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, ownerId),
          gte(candidatoEntrevistas.createdAt, cincoAnosAtras)
        )
      )
      .groupBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY')`)
      .orderBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY')`);

    // 10. Buscar transações recentes para detalhamento (útil para trial) da conta
    const transacoesRecentes = await db
      .select({
        id: transacoes.id,
        tipo: transacoes.tipo,
        valorCobrado: transacoes.valorCobrado,
        descricao: transacoes.descricao,
        status: transacoes.status,
        entrevistaId: transacoes.entrevistaId,
        createdAt: transacoes.createdAt,
      })
      .from(transacoes)
      .where(eq(transacoes.userId, ownerId))
      .orderBy(desc(transacoes.createdAt))
      .limit(50);

    return NextResponse.json({
      planType,
      usageFinanceiro,
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
        totalCandidatos: totalCandidatos,
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
        analises: e.analises,
      })),
      // Novas métricas de análises
      metricas: {
        perguntasAnalisadas: perguntasAnalisadas[0]?.total || 0,
        entrevistasAnalisadas: entrevistasAnalisadas[0]?.total || 0,
      },
      // Dados para gráficos de entrevistas por período
      graficos: {
        porDia: entrevistasPorDia.map((e) => ({
          data: e.data,
          total: e.total,
          analisadas: e.analisadas,
        })),
        porSemana: entrevistasPorSemana.map((e) => ({
          semana: e.semana,
          total: e.total,
          analisadas: e.analisadas,
        })),
        porMes: entrevistasPorMes.map((e) => ({
          mes: e.mes,
          total: e.total,
          analisadas: e.analisadas,
        })),
        porAno: entrevistasPorAno.map((e) => ({
          ano: e.ano,
          total: e.total,
          analisadas: e.analisadas,
        })),
      },
      // Transações recentes para detalhamento
      transacoesRecentes: transacoesRecentes.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valorCobrado: Number(t.valorCobrado),
        descricao: t.descricao,
        status: t.status,
        entrevistaId: t.entrevistaId,
        createdAt: t.createdAt.toISOString(),
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
