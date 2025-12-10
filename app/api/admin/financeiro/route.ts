import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes } from "@/lib/db/schema";
import { sql, desc, gte, and, eq } from "drizzle-orm";
import { API_COSTS, TAXA_CAMBIO_USD_BRL } from "@/lib/config/pricing";

/**
 * Custos fixos mensais de infraestrutura (estimativas)
 * Estes valores devem ser atualizados conforme os custos reais
 */
const CUSTOS_INFRAESTRUTURA = {
  vercel: {
    nome: "Vercel (Hosting)",
    custoMensal: 0, // Plano gratuito ou Pro ($20/mês)
    descricao: "Hospedagem e deploy do Next.js",
  },
  neon: {
    nome: "Neon (Database)",
    custoMensal: 0, // Plano gratuito ou Pro ($19/mês)
    descricao: "Banco de dados PostgreSQL serverless",
  },
  resend: {
    nome: "Resend (Email)",
    custoMensal: 0, // Plano gratuito (100 emails/dia) ou Pro ($20/mês)
    descricao: "Envio de emails transacionais",
  },
};

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

    // Consumo de Tokens do Claude (análises de IA)
    const [tokensStats] = await db
      .select({
        totalInput: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'tokensEntrada')::int as bigint)), 0)`,
        totalOutput: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'tokensSaida')::int as bigint)), 0)`,
        custoTokens: sql<number>`coalesce(sum(
          CASE WHEN ${transacoes.tipo} IN ('analise_pergunta', 'analise_ia')
          THEN cast(${transacoes.custoBase} as decimal) ELSE 0 END
        ), 0)`,
        totalAnalises: sql<number>`count(CASE WHEN ${transacoes.tipo} IN ('analise_pergunta', 'analise_ia') THEN 1 END)`,
      })
      .from(transacoes)
      .where(gte(transacoes.createdAt, dataInicio));

    // Consumo de áudio do Whisper (transcrições)
    const [whisperStats] = await db
      .select({
        totalMinutos: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'duracaoAudio')::numeric as decimal) / 60), 0)`,
        totalSegundos: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'duracaoAudio')::numeric as decimal)), 0)`,
        totalBytes: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'tamanhoArquivo')::bigint as bigint)), 0)`,
        custoWhisper: sql<number>`coalesce(sum(
          CASE WHEN ${transacoes.tipo} = 'transcricao_audio'
          THEN cast(${transacoes.custoBase} as decimal) ELSE 0 END
        ), 0)`,
        totalTranscricoes: sql<number>`count(CASE WHEN ${transacoes.tipo} = 'transcricao_audio' THEN 1 END)`,
      })
      .from(transacoes)
      .where(gte(transacoes.createdAt, dataInicio));

    // Calcular custos detalhados por API
    const totalInputTokens = Number(tokensStats.totalInput) || 0;
    const totalOutputTokens = Number(tokensStats.totalOutput) || 0;
    const totalMinutosAudio = Number(whisperStats.totalMinutos) || 0;

    // Custo teórico do Claude (baseado em tokens reais)
    const custoClaude = {
      inputUSD: (totalInputTokens / 1_000_000) * API_COSTS.claude.inputPerMillion,
      outputUSD: (totalOutputTokens / 1_000_000) * API_COSTS.claude.outputPerMillion,
    };
    const custoClaudeTotalUSD = custoClaude.inputUSD + custoClaude.outputUSD;
    const custoClaudeTotalBRL = custoClaudeTotalUSD * TAXA_CAMBIO_USD_BRL;

    // Custo teórico do Whisper (baseado em minutos reais)
    const custoWhisperUSD = totalMinutosAudio * API_COSTS.whisper.perMinute;
    const custoWhisperBRL = custoWhisperUSD * TAXA_CAMBIO_USD_BRL;

    // Custos de infraestrutura (proporcional ao período)
    const mesesNoPeriodo = mesesAtras;
    const custoInfraestruturaTotal = Object.values(CUSTOS_INFRAESTRUTURA).reduce(
      (acc, infra) => acc + (infra.custoMensal * mesesNoPeriodo), 0
    );

    // Por modelo (detalhado)
    const porModelo = [
      {
        modelo: "Claude 3.5 Sonnet",
        input: totalInputTokens,
        output: totalOutputTokens,
        custo: custoClaudeTotalBRL,
        custoUSD: custoClaudeTotalUSD,
        precoInputPorMilhao: API_COSTS.claude.inputPerMillion,
        precoOutputPorMilhao: API_COSTS.claude.outputPerMillion,
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

    // Custo total de APIs (Claude + Whisper)
    const custoTotalAPIs = custoClaudeTotalBRL + custoWhisperBRL;

    // Custo total incluindo infraestrutura
    const custoTotalComInfraestrutura = custoTotalNum + custoInfraestruturaTotal;

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

      // Métricas detalhadas do Claude (IA)
      custosClaudeDetalhado: {
        tokensEntrada: totalInputTokens,
        tokensSaida: totalOutputTokens,
        totalTokens: totalInputTokens + totalOutputTokens,
        totalAnalises: Number(tokensStats.totalAnalises) || 0,
        custoEntradaUSD: custoClaude.inputUSD,
        custoSaidaUSD: custoClaude.outputUSD,
        custoTotalUSD: custoClaudeTotalUSD,
        custoTotalBRL: custoClaudeTotalBRL,
        precos: {
          inputPorMilhao: API_COSTS.claude.inputPerMillion,
          outputPorMilhao: API_COSTS.claude.outputPerMillion,
          taxaCambio: TAXA_CAMBIO_USD_BRL,
        },
      },

      // Métricas detalhadas do Whisper (Áudio)
      custosWhisperDetalhado: {
        totalMinutos: totalMinutosAudio,
        totalSegundos: Number(whisperStats.totalSegundos) || 0,
        totalTranscricoes: Number(whisperStats.totalTranscricoes) || 0,
        totalBytesAudio: Number(whisperStats.totalBytes) || 0,
        custoTotalUSD: custoWhisperUSD,
        custoTotalBRL: custoWhisperBRL,
        precos: {
          porMinutoUSD: API_COSTS.whisper.perMinute,
          taxaCambio: TAXA_CAMBIO_USD_BRL,
        },
      },

      // Custos de infraestrutura
      custosInfraestrutura: {
        periodo: mesesNoPeriodo,
        custoTotalPeriodo: custoInfraestruturaTotal,
        servicos: Object.entries(CUSTOS_INFRAESTRUTURA).map(([key, value]) => ({
          id: key,
          nome: value.nome,
          descricao: value.descricao,
          custoMensal: value.custoMensal,
          custoPeriodo: value.custoMensal * mesesNoPeriodo,
        })),
      },

      // Resumo de custos por categoria
      custosPorCategoria: {
        claude: custoClaudeTotalBRL,
        whisper: custoWhisperBRL,
        infraestrutura: custoInfraestruturaTotal,
        total: custoTotalAPIs + custoInfraestruturaTotal,
        totalSemInfraestrutura: custoTotalAPIs,
      },

      // Legado (mantido para compatibilidade)
      tokensConsumo: {
        totalInput: totalInputTokens,
        totalOutput: totalOutputTokens,
        custoTokens: custoClaudeTotalBRL,
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

      // Margem teórica (considerando todos os custos)
      margemTeorica: {
        receitaTotal: receitaTotalNum,
        custoAPIs: custoTotalAPIs,
        custoInfraestrutura: custoInfraestruturaTotal,
        custoTotalReal: custoTotalComInfraestrutura,
        lucroReal: receitaTotalNum - custoTotalComInfraestrutura,
        margemReal: receitaTotalNum > 0
          ? ((receitaTotalNum - custoTotalComInfraestrutura) / receitaTotalNum) * 100
          : 0,
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
