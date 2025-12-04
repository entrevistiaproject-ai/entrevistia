import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { transacoes, saldos, entrevistas } from "@/lib/db/schema";
import { eq, and, gte, lte, desc, sql, isNull } from "drizzle-orm";

function getUserIdFromRequest(request: Request): string | null {
  return request.headers.get("x-user-id");
}

export async function GET(request: Request) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get("periodo") || "mes"; // mes, trimestre, ano, total

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

    // 1. Buscar saldo do usuário
    let [saldo] = await db
      .select()
      .from(saldos)
      .where(eq(saldos.userId, userId));

    // Se não existe, criar um
    if (!saldo) {
      [saldo] = await db
        .insert(saldos)
        .values({ userId })
        .returning();
    }

    // 2. Estatísticas de transações no período
    const transacoesPeriodo = await db
      .select({
        total: sql<number>`COUNT(*)::int`,
        custoTotal: sql<number>`COALESCE(SUM(${transacoes.valorCobrado}), 0)::numeric`,
        custoPorTipo: sql<any>`
          jsonb_object_agg(
            ${transacoes.tipo},
            COALESCE(SUM(${transacoes.valorCobrado}), 0)
          )
        `,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, userId),
          gte(transacoes.createdAt, dataInicio)
        )
      );

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
          WHEN ${transacoes.tipo} IN ('transcricao_audio', 'analise_ia')
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
      saldo: {
        atual: Number(saldo.saldoAtual),
        totalGasto: Number(saldo.totalGasto),
        totalRecargado: Number(saldo.totalRecargado),
        limiteAlerta: Number(saldo.limiteAlerta),
      },
      periodo: {
        dataInicio: dataInicio.toISOString(),
        dataFim: hoje.toISOString(),
        totalTransacoes: transacoesPeriodo[0]?.total || 0,
        custoTotal: Number(transacoesPeriodo[0]?.custoTotal || 0),
        custoPorTipo: transacoesPeriodo[0]?.custoPorTipo || {},
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
