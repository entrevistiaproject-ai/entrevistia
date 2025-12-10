import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes, entrevistas, candidatoEntrevistas } from "@/lib/db/schema";
import { sql, eq, gte, desc, count, sum, and, isNull } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get("periodo") || "30d";

    const db = getDB();
    const now = new Date();
    let dataInicio: Date;

    switch (periodo) {
      case "7d":
        dataInicio = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        dataInicio = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        dataInicio = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "1y":
        dataInicio = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        dataInicio = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // KPIs - Usuários
    const [usuariosStats] = await db
      .select({
        total: count(),
        ativos: sql<number>`count(*) filter (where ${users.isActive} = true)`,
      })
      .from(users)
      .where(isNull(users.deletedAt));

    const [usuariosNovos] = await db
      .select({ count: count() })
      .from(users)
      .where(
        and(
          gte(users.createdAt, dataInicio),
          isNull(users.deletedAt)
        )
      );

    // KPIs - Financeiro
    const mesAtual = now.getMonth() + 1;
    const anoAtual = now.getFullYear();

    const [receitaMensal] = await db
      .select({
        valor: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
      })
      .from(faturas)
      .where(
        and(
          eq(faturas.mesReferencia, mesAtual),
          eq(faturas.anoReferencia, anoAtual)
        )
      );

    const [custoMensal] = await db
      .select({
        valor: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
      })
      .from(transacoes)
      .where(gte(transacoes.createdAt, new Date(anoAtual, mesAtual - 1, 1)));

    const [receitaTotal] = await db
      .select({
        valor: sql<number>`coalesce(sum(cast(${faturas.valorPago} as decimal)), 0)`,
      })
      .from(faturas);

    // KPIs - Entrevistas e Candidatos
    const [entrevistasStats] = await db
      .select({ total: count() })
      .from(entrevistas);

    const [candidatosStats] = await db
      .select({ total: count() })
      .from(candidatoEntrevistas);

    // Usuários por Plano
    const usuariosPorPlano = await db
      .select({
        plano: users.planType,
        quantidade: count(),
      })
      .from(users)
      .where(isNull(users.deletedAt))
      .groupBy(users.planType);

    const planosCores: Record<string, string> = {
      free_trial: "#3b82f6",
      basic: "#10b981",
      professional: "#f59e0b",
      enterprise: "#8b5cf6",
    };

    // Receita por Mês (últimos 6 meses)
    const receitaPorMes = await db
      .select({
        mes: sql<string>`to_char(date_trunc('month', ${faturas.dataAbertura}), 'Mon')`,
        receita: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
      })
      .from(faturas)
      .where(gte(faturas.dataAbertura, new Date(now.getFullYear(), now.getMonth() - 5, 1)))
      .groupBy(sql`date_trunc('month', ${faturas.dataAbertura})`)
      .orderBy(sql`date_trunc('month', ${faturas.dataAbertura})`);

    // Custo por Mês
    const custoPorMes = await db
      .select({
        mes: sql<string>`to_char(date_trunc('month', ${transacoes.createdAt}), 'Mon')`,
        custo: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
      })
      .from(transacoes)
      .where(gte(transacoes.createdAt, new Date(now.getFullYear(), now.getMonth() - 5, 1)))
      .groupBy(sql`date_trunc('month', ${transacoes.createdAt})`)
      .orderBy(sql`date_trunc('month', ${transacoes.createdAt})`);

    // Merge receita e custo
    const receitaCustoMerged = receitaPorMes.map((r) => {
      const custoItem = custoPorMes.find((c) => c.mes === r.mes);
      const custo = custoItem ? Number(custoItem.custo) : 0;
      const receita = Number(r.receita);
      return {
        mes: r.mes,
        receita,
        custo,
        lucro: receita - custo,
      };
    });

    // Crescimento de Usuários
    const crescimentoUsuarios = await db
      .select({
        mes: sql<string>`to_char(date_trunc('month', ${users.createdAt}), 'Mon')`,
        novos: count(),
      })
      .from(users)
      .where(
        and(
          gte(users.createdAt, new Date(now.getFullYear(), now.getMonth() - 5, 1)),
          isNull(users.deletedAt)
        )
      )
      .groupBy(sql`date_trunc('month', ${users.createdAt})`)
      .orderBy(sql`date_trunc('month', ${users.createdAt})`);

    let acumulado = usuariosStats.total - crescimentoUsuarios.reduce((acc, c) => acc + c.novos, 0);
    const crescimentoComTotal = crescimentoUsuarios.map((c) => {
      acumulado += c.novos;
      return {
        mes: c.mes,
        novos: c.novos,
        total: acumulado,
      };
    });

    // Top Usuários por Gasto
    const topUsuarios = await db
      .select({
        id: users.id,
        nome: users.nome,
        empresa: users.empresa,
        gastoTotal: sql<number>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
        entrevistas: sql<number>`count(distinct ${transacoes.entrevistaId})`,
      })
      .from(users)
      .leftJoin(transacoes, eq(users.id, transacoes.userId))
      .where(isNull(users.deletedAt))
      .groupBy(users.id, users.nome, users.empresa)
      .orderBy(desc(sql`sum(cast(${transacoes.valorCobrado} as decimal))`))
      .limit(5);

    // Status das Faturas
    const [faturasStats] = await db
      .select({
        pagas: sql<number>`count(*) filter (where ${faturas.status} = 'paga')`,
        abertas: sql<number>`count(*) filter (where ${faturas.status} = 'aberta')`,
        vencidas: sql<number>`count(*) filter (where ${faturas.status} = 'vencida')`,
        valorPendente: sql<number>`coalesce(sum(case when ${faturas.status} in ('aberta', 'vencida') then cast(${faturas.valorTotal} as decimal) - cast(${faturas.valorPago} as decimal) else 0 end), 0)`,
      })
      .from(faturas);

    // Calcular métricas
    const receita = Number(receitaMensal.valor) || 0;
    const custo = Number(custoMensal.valor) || 0;
    const lucro = receita - custo;
    const margem = receita > 0 ? (lucro / receita) * 100 : 0;
    const ticketMedio = usuariosStats.ativos > 0 ? receita / usuariosStats.ativos : 0;

    // Atividade Recente (simulada por enquanto - pode ser expandida com audit logs)
    const atividadeRecente = [
      {
        id: "1",
        tipo: "cadastro",
        descricao: "Novo usuário cadastrado",
        usuario: "Sistema",
        data: "Há 5 min",
      },
      {
        id: "2",
        tipo: "pagamento",
        descricao: "Pagamento de fatura processado",
        usuario: "Sistema",
        data: "Há 15 min",
      },
      {
        id: "3",
        tipo: "entrevista",
        descricao: "Nova entrevista criada",
        usuario: "Sistema",
        data: "Há 30 min",
      },
      {
        id: "4",
        tipo: "analise",
        descricao: "Análise de candidato concluída",
        usuario: "Sistema",
        data: "Há 1 hora",
      },
    ];

    return NextResponse.json({
      kpis: {
        totalUsuarios: usuariosStats.total,
        usuariosAtivos: usuariosStats.ativos,
        usuariosNovos30d: usuariosNovos.count,
        receitaMensal: receita,
        receitaTotal: Number(receitaTotal.valor) || 0,
        custoMensal: custo,
        lucroMensal: lucro,
        margemLucro: margem,
        totalEntrevistas: entrevistasStats.total,
        totalCandidatos: candidatosStats.total,
        ticketMedio,
        churnRate: 0, // TODO: Calcular churn real
      },
      usuariosPorPlano: usuariosPorPlano.map((u) => ({
        plano: u.plano,
        quantidade: u.quantidade,
        cor: planosCores[u.plano] || "#6b7280",
      })),
      receitaPorMes: receitaCustoMerged,
      crescimentoUsuarios: crescimentoComTotal,
      topUsuarios: topUsuarios.map((u) => ({
        id: u.id,
        nome: u.nome,
        empresa: u.empresa,
        gastoTotal: Number(u.gastoTotal) || 0,
        entrevistas: Number(u.entrevistas) || 0,
      })),
      faturasStatus: {
        pagas: Number(faturasStats.pagas) || 0,
        abertas: Number(faturasStats.abertas) || 0,
        vencidas: Number(faturasStats.vencidas) || 0,
        valorPendente: Number(faturasStats.valorPendente) || 0,
      },
      atividadeRecente,
    });
  } catch (error) {
    console.error("Erro no dashboard admin:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
