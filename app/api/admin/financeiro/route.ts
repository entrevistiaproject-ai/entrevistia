import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, faturas, transacoes } from "@/lib/db/schema";
import { sql, desc, gte, and, eq } from "drizzle-orm";
import { API_COSTS, TAXA_CAMBIO_USD_BRL, PERCENTUAL_INFRAESTRUTURA } from "@/lib/config/pricing";

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

    // ========== MÉTRICAS DE CONTAS DE TESTE (QA) ==========
    // Contas de teste geram custos reais mas não geram receita contabilizável
    // Os custos das contas teste abtem da margem da plataforma

    // Total de contas de teste ativas
    const [contasTesteStats] = await db
      .select({
        totalContas: sql<number>`count(*)::int`,
      })
      .from(users)
      .where(eq(users.isTestAccount, true));

    // Custos gerados por contas de teste (período)
    const [custosContasTeste] = await db
      .select({
        custoTotal: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
        valorHipotetico: sql<number>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
        totalTransacoes: sql<number>`count(*)::int`,
      })
      .from(transacoes)
      .innerJoin(users, eq(transacoes.userId, users.id))
      .where(
        and(
          eq(users.isTestAccount, true),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    // Custos de contas de teste no mês atual
    const [custosTestesMesAtual] = await db
      .select({
        custo: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
        valorHipotetico: sql<number>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
      })
      .from(transacoes)
      .innerJoin(users, eq(transacoes.userId, users.id))
      .where(
        and(
          eq(users.isTestAccount, true),
          gte(transacoes.createdAt, new Date(anoAtual, mesAtual - 1, 1)),
          sql`${transacoes.createdAt} < ${new Date(anoAtual, mesAtual, 1)}`
        )
      );

    // Tokens consumidos por contas de teste (para calcular custo de IA)
    const [tokensContasTeste] = await db
      .select({
        totalInput: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'tokensEntrada')::int as bigint)), 0)`,
        totalOutput: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'tokensSaida')::int as bigint)), 0)`,
      })
      .from(transacoes)
      .innerJoin(users, eq(transacoes.userId, users.id))
      .where(
        and(
          eq(users.isTestAccount, true),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    // Minutos de áudio consumidos por contas de teste
    const [whisperContasTeste] = await db
      .select({
        totalMinutos: sql<number>`coalesce(sum(cast((${transacoes.metadados}->>'duracaoAudio')::numeric as decimal) / 60), 0)`,
      })
      .from(transacoes)
      .innerJoin(users, eq(transacoes.userId, users.id))
      .where(
        and(
          eq(users.isTestAccount, true),
          eq(transacoes.tipo, "transcricao_audio"),
          gte(transacoes.createdAt, dataInicio)
        )
      );

    // Lista de contas de teste com seus custos
    const listaContasTeste = await db
      .select({
        id: users.id,
        nome: users.nome,
        email: users.email,
        custo: sql<number>`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`,
        valorHipotetico: sql<number>`coalesce(sum(cast(${transacoes.valorCobrado} as decimal)), 0)`,
        totalTransacoes: sql<number>`count(${transacoes.id})::int`,
      })
      .from(users)
      .leftJoin(
        transacoes,
        and(
          eq(users.id, transacoes.userId),
          gte(transacoes.createdAt, dataInicio)
        )
      )
      .where(eq(users.isTestAccount, true))
      .groupBy(users.id, users.nome, users.email)
      .orderBy(desc(sql`coalesce(sum(cast(${transacoes.custoBase} as decimal)), 0)`));

    // Calcular custos de APIs das contas teste
    const tokensInputTeste = Number(tokensContasTeste.totalInput) || 0;
    const tokensOutputTeste = Number(tokensContasTeste.totalOutput) || 0;
    const minutosAudioTeste = Number(whisperContasTeste.totalMinutos) || 0;

    const custoClaudeTesteUSD =
      (tokensInputTeste / 1_000_000) * API_COSTS.claude.inputPerMillion +
      (tokensOutputTeste / 1_000_000) * API_COSTS.claude.outputPerMillion;
    const custoClaudeTesteBRL = custoClaudeTesteUSD * TAXA_CAMBIO_USD_BRL;

    const custoWhisperTesteUSD = minutosAudioTeste * API_COSTS.whisper.perMinute;
    const custoWhisperTesteBRL = custoWhisperTesteUSD * TAXA_CAMBIO_USD_BRL;

    const custoTotalAPIsTeste = custoClaudeTesteBRL + custoWhisperTesteBRL;
    const custoInfraTesteAbsorvido = custoTotalAPIsTeste * PERCENTUAL_INFRAESTRUTURA;

    // ========== RESUMO FINANCEIRO (EXCLUINDO CONTAS DE TESTE) ==========

    // Resumo Financeiro (excluindo contas de teste da receita)
    const [resumoTotal] = await db
      .select({
        receitaTotal: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
        custoTotal: sql<number>`coalesce(
          (select sum(cast(custo_base as decimal)) from transacoes), 0
        )`,
      })
      .from(faturas)
      .innerJoin(users, eq(faturas.userId, users.id))
      .where(eq(users.isTestAccount, false));

    const [resumoMesAtual] = await db
      .select({
        receita: sql<number>`coalesce(sum(cast(${faturas.valorTotal} as decimal)), 0)`,
      })
      .from(faturas)
      .innerJoin(users, eq(faturas.userId, users.id))
      .where(
        and(
          eq(faturas.mesReferencia, mesAtual),
          eq(faturas.anoReferencia, anoAtual),
          eq(users.isTestAccount, false)
        )
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
      .innerJoin(users, eq(faturas.userId, users.id))
      .where(
        and(
          eq(faturas.mesReferencia, mesAnterior),
          eq(faturas.anoReferencia, anoMesAnterior),
          eq(users.isTestAccount, false)
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

    // Custo total de APIs (Claude + Whisper) - calculado aqui para usar abaixo
    const custoTotalAPIs = custoClaudeTotalBRL + custoWhisperBRL;

    // Custo de infraestrutura absorvido (percentual sobre as APIs)
    // Fórmula: custoInfra = (custoAPIs) * PERCENTUAL_INFRAESTRUTURA
    // Este custo já está incluído no custoBase de cada transação
    const custoInfraAbsorvido = custoTotalAPIs * PERCENTUAL_INFRAESTRUTURA;

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

    // Custo total teórico (APIs + infraestrutura absorvida)
    const custoTotalTeorico = custoTotalAPIs + custoInfraAbsorvido;

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

      // Infraestrutura absorvida no custo de cada análise
      // Não é mais cobrada separadamente - está embutida no custo teórico
      infraestruturaAbsorvida: {
        percentual: PERCENTUAL_INFRAESTRUTURA * 100, // ex: 15%
        valorAbsorvido: custoInfraAbsorvido,
        descricao: "Custo de infraestrutura absorvido no custo de cada análise (Vercel, Neon, Resend, etc.)",
      },

      // Resumo de custos por categoria
      custosPorCategoria: {
        claude: custoClaudeTotalBRL,
        whisper: custoWhisperBRL,
        infraestruturaAbsorvida: custoInfraAbsorvido,
        totalAPIs: custoTotalAPIs,
        totalComInfra: custoTotalTeorico,
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

      // Margem teórica (considerando todos os custos incluindo infra absorvida)
      margemTeorica: {
        receitaTotal: receitaTotalNum,
        custoAPIs: custoTotalAPIs,
        custoInfraAbsorvida: custoInfraAbsorvido,
        custoTotalTeorico: custoTotalTeorico,
        lucroTeorico: receitaTotalNum - custoTotalTeorico,
        margemTeorica: receitaTotalNum > 0
          ? ((receitaTotalNum - custoTotalTeorico) / receitaTotalNum) * 100
          : 0,
      },

      // ========== MÉTRICAS DE CONTAS DE TESTE (QA) ==========
      // Contas de teste NÃO geram receita contabilizável, mas GERAM custos reais
      // Esses custos impactam negativamente a margem da plataforma
      contasTeste: {
        // Resumo geral
        totalContas: Number(contasTesteStats.totalContas) || 0,
        custoTotalPeriodo: Number(custosContasTeste.custoTotal) || 0,
        faturaHipoteticaPeriodo: Number(custosContasTeste.valorHipotetico) || 0,
        totalTransacoesPeriodo: Number(custosContasTeste.totalTransacoes) || 0,

        // Mês atual
        custoMesAtual: Number(custosTestesMesAtual.custo) || 0,
        faturaHipoteticaMesAtual: Number(custosTestesMesAtual.valorHipotetico) || 0,

        // Detalhamento de custos por API
        custoAPIs: {
          claude: {
            tokensEntrada: tokensInputTeste,
            tokensSaida: tokensOutputTeste,
            custoUSD: custoClaudeTesteUSD,
            custoBRL: custoClaudeTesteBRL,
          },
          whisper: {
            totalMinutos: minutosAudioTeste,
            custoUSD: custoWhisperTesteUSD,
            custoBRL: custoWhisperTesteBRL,
          },
          infraestruturaAbsorvida: custoInfraTesteAbsorvido,
          totalAPIs: custoTotalAPIsTeste,
          totalComInfra: custoTotalAPIsTeste + custoInfraTesteAbsorvido,
        },

        // Lista detalhada de contas de teste
        contas: listaContasTeste.map((c) => ({
          id: c.id,
          nome: c.nome,
          email: c.email,
          custoGerado: Number(c.custo) || 0,
          faturaHipotetica: Number(c.valorHipotetico) || 0,
          totalTransacoes: Number(c.totalTransacoes) || 0,
        })),

        // Impacto na margem da plataforma
        impactoMargem: {
          custoAdicionado: custoTotalAPIsTeste + custoInfraTesteAbsorvido,
          receitaPerdida: Number(custosContasTeste.valorHipotetico) || 0,
          // Margem ajustada considerando os custos das contas teste
          margemAjustada: receitaTotalNum > 0
            ? ((receitaTotalNum - custoTotalTeorico - (custoTotalAPIsTeste + custoInfraTesteAbsorvido)) / receitaTotalNum) * 100
            : 0,
        },
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
