import { getDB } from "@/lib/db";
import { transacoes, faturas, NewTransacao } from "@/lib/db/schema/transacoes";
import { users } from "@/lib/db/schema/users";
import { eq, sql, and } from "drizzle-orm";
import { FREE_TRIAL_LIMITS, PlanType } from "@/lib/config/free-trial";
import { PRECOS_USUARIO, calcularCustoAnalise, USAGE_ESTIMATES_ANALISE_PERGUNTA } from "@/lib/config/pricing";
import { logSystemError } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";
import { validarNovaCobranca, validarCobrancaRegistrada } from "./billing-validation";
import { enviarEmail } from "@/lib/email/resend";
import { getEffectiveOwnerId } from "./team-service";

/**
 * Verifica se a conta é uma conta de teste
 * Se o usuário é membro de um time, verifica se o owner do time é conta de teste.
 */
export async function isTestAccount(userId: string): Promise<boolean> {
  const db = getDB();

  // Obtém o owner efetivo
  const ownerId = await getEffectiveOwnerId(userId);

  const [owner] = await db
    .select({ isTestAccount: users.isTestAccount })
    .from(users)
    .where(eq(users.id, ownerId));

  return owner?.isTestAccount || false;
}

export interface UsageFinanceiro {
  /**
   * Valor total gasto (soma de todas as transações)
   */
  totalGasto: number;

  /**
   * Limite financeiro disponível (para free trial)
   */
  limiteFinanceiro: number;

  /**
   * Valor restante disponível
   */
  saldoRestante: number;

  /**
   * Percentual de uso (0-100)
   */
  percentualUsado: number;

  /**
   * Se atingiu o limite
   */
  limiteAtingido: boolean;

  /**
   * Total de análises realizadas
   */
  totalAnalises: number;

  /**
   * Se é uma conta de teste (QA)
   * Contas teste têm acesso ilimitado e não contam como receita
   */
  isTestAccount: boolean;
}

/**
 * Busca o uso financeiro da conta (owner)
 * Calcula quanto já foi gasto e quanto ainda resta do free trial
 * Considera crédito extra concedido pelo admin
 * Contas de teste têm acesso ilimitado
 *
 * IMPORTANTE: Saldo e limite são por CONTA (owner), não por usuário individual.
 * Se o usuário é membro de um time, usa o saldo/limite do owner do time.
 */
export async function getUsageFinanceiro(userId: string): Promise<UsageFinanceiro> {
  const db = getDB();

  // Obtém o owner efetivo (se for membro de time, usa o owner do time)
  const ownerId = await getEffectiveOwnerId(userId);

  // Busca todas as transações da conta (owner)
  const [resultado] = await db
    .select({
      totalGasto: sql<string>`COALESCE(SUM(${transacoes.valorCobrado}), 0)`,
    })
    .from(transacoes)
    .where(eq(transacoes.userId, ownerId));

  // Conta total de análises (cada taxa_base_candidato representa uma análise completa)
  const [analises] = await db
    .select({
      total: sql<number>`COUNT(*)::int`,
    })
    .from(transacoes)
    .where(
      and(
        eq(transacoes.userId, ownerId),
        eq(transacoes.tipo, "taxa_base_candidato")
      )
    );

  // Busca o crédito extra e se é conta de teste do OWNER
  const [usuario] = await db
    .select({
      creditoExtra: users.creditoExtra,
      isTestAccount: users.isTestAccount,
    })
    .from(users)
    .where(eq(users.id, ownerId));

  const totalGasto = parseFloat(resultado?.totalGasto || "0");
  const totalAnalises = analises?.total || 0;
  const creditoExtra = parseFloat(usuario?.creditoExtra || "0");
  const isContaTeste = usuario?.isTestAccount || false;

  // Contas de teste têm limite infinito (999999)
  // Limite financeiro = limite base + crédito extra concedido pelo admin
  const limiteFinanceiro = isContaTeste
    ? 999999
    : FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO + creditoExtra;

  const saldoRestante = Math.max(0, limiteFinanceiro - totalGasto);
  const percentualUsado = isContaTeste
    ? 0
    : (limiteFinanceiro > 0 ? Math.min(100, (totalGasto / limiteFinanceiro) * 100) : 0);

  // Contas de teste nunca atingem o limite
  const limiteAtingido = isContaTeste ? false : totalGasto >= limiteFinanceiro;

  return {
    totalGasto,
    limiteFinanceiro,
    saldoRestante,
    percentualUsado,
    limiteAtingido,
    totalAnalises,
    isTestAccount: isContaTeste,
  };
}

/**
 * Busca detalhes das faturas da conta (owner)
 * Se o usuário é membro de um time, busca as faturas do owner do time.
 */
export async function getFaturasResumo(userId: string) {
  const db = getDB();

  // Obtém o owner efetivo
  const ownerId = await getEffectiveOwnerId(userId);

  const faturasUsuario = await db
    .select({
      id: faturas.id,
      mesReferencia: faturas.mesReferencia,
      anoReferencia: faturas.anoReferencia,
      valorTotal: faturas.valorTotal,
      valorPago: faturas.valorPago,
      status: faturas.status,
      totalEntrevistas: faturas.totalEntrevistas,
      totalCandidatos: faturas.totalCandidatos,
      totalRespostas: faturas.totalRespostas,
      totalTransacoes: faturas.totalTransacoes,
      dataAbertura: faturas.dataAbertura,
      dataVencimento: faturas.dataVencimento,
    })
    .from(faturas)
    .where(eq(faturas.userId, ownerId))
    .orderBy(sql`${faturas.anoReferencia} DESC, ${faturas.mesReferencia} DESC`)
    .limit(12); // Últimos 12 meses

  return faturasUsuario;
}

/**
 * Busca as últimas transações da conta (owner)
 * Se o usuário é membro de um time, busca as transações do owner do time.
 */
export async function getTransacoesRecentes(userId: string, limit: number = 10) {
  const db = getDB();

  // Obtém o owner efetivo
  const ownerId = await getEffectiveOwnerId(userId);

  const transacoesRecentes = await db
    .select({
      id: transacoes.id,
      tipo: transacoes.tipo,
      valorCobrado: transacoes.valorCobrado,
      custoBase: transacoes.custoBase,
      descricao: transacoes.descricao,
      status: transacoes.status,
      createdAt: transacoes.createdAt,
      metadados: transacoes.metadados,
    })
    .from(transacoes)
    .where(eq(transacoes.userId, ownerId))
    .orderBy(sql`${transacoes.createdAt} DESC`)
    .limit(limit);

  return transacoesRecentes;
}

/**
 * Verifica se o usuário pode realizar uma operação que gera custo
 * Contas de teste sempre podem realizar operações
 */
export async function canRealizarOperacao(
  userId: string,
  custoEstimado: number
): Promise<{ allowed: boolean; reason?: string; isTestAccount?: boolean }> {
  const usage = await getUsageFinanceiro(userId);

  // Contas de teste sempre podem realizar operações
  if (usage.isTestAccount) {
    return { allowed: true, isTestAccount: true };
  }

  // Se já atingiu o limite
  if (usage.limiteAtingido) {
    return {
      allowed: false,
      reason: `Limite de uso gratuito atingido (R$ ${usage.limiteFinanceiro.toFixed(2)}). Faça upgrade do seu plano.`,
    };
  }

  // Se a operação vai ultrapassar o limite
  if (usage.totalGasto + custoEstimado > usage.limiteFinanceiro) {
    return {
      allowed: false,
      reason: `Esta operação custaria R$ ${custoEstimado.toFixed(2)}, mas você só tem R$ ${usage.saldoRestante.toFixed(2)} disponível. Faça upgrade do seu plano.`,
    };
  }

  return { allowed: true };
}

/**
 * Tipo de transação suportado
 */
export type TipoTransacao =
  | "transcricao_audio"
  | "analise_ia"
  | "analise_pergunta"
  | "taxa_base_candidato"
  | "pergunta_criada"
  | "entrevista_criada";

/**
 * Registra uma transação de cobrança
 *
 * IMPORTANTE: A transação é registrada para o OWNER da conta, não para o usuário individual.
 * Se o userId passado é um membro de time, a transação será registrada para o owner do time.
 */
export async function registrarTransacao(params: {
  userId: string;
  tipo: TipoTransacao;
  entrevistaId?: string;
  respostaId?: string;
  descricao?: string;
  metadados?: {
    modeloIA?: string;
    tokensEntrada?: number;
    tokensSaida?: number;
    duracaoAudio?: number;
    tamanhoArquivo?: number;
    tentativas?: number;
    perguntaId?: string;
    perguntaTexto?: string;
    totalPerguntas?: number;
  };
}): Promise<{ success: boolean; transacaoId?: string; error?: string }> {
  const db = getDB();

  // Obtém o owner efetivo (se for membro de time, usa o owner do time)
  const ownerId = await getEffectiveOwnerId(params.userId);

  // Calcula custo base e valor cobrado baseado no tipo (declarados fora do try para log de erro)
  let custoBase: number = 0;
  let valorCobrado: number = 0;

  // Log início da tentativa de registro
  logger.debug("[BILLING] Iniciando registro de transação", {
    userId: params.userId,
    ownerId: ownerId,
    tipo: params.tipo,
    entrevistaId: params.entrevistaId,
    respostaId: params.respostaId,
  });

  try {

    switch (params.tipo) {
      case "taxa_base_candidato":
        // Taxa base cobrada uma vez por candidato avaliado
        custoBase = 0.10; // Custo interno estimado
        valorCobrado = PRECOS_USUARIO.taxaBasePorCandidato; // R$ 1,00
        break;
      case "analise_pergunta":
        // Taxa por cada pergunta analisada
        custoBase = calcularCustoAnalise(
          USAGE_ESTIMATES_ANALISE_PERGUNTA.input,
          USAGE_ESTIMATES_ANALISE_PERGUNTA.output
        );
        valorCobrado = PRECOS_USUARIO.analisePorPergunta; // R$ 0,25
        break;
      case "transcricao_audio":
        // Transcrição incluída (grátis)
        custoBase = 0.01;
        valorCobrado = 0;
        break;
      case "analise_ia":
        // Análise incluída na taxa por pergunta (grátis separadamente)
        custoBase = 0.01;
        valorCobrado = 0;
        break;
      case "pergunta_criada":
        // Criar pergunta é grátis
        custoBase = 0;
        valorCobrado = 0;
        break;
      case "entrevista_criada":
        // Criar entrevista é grátis
        custoBase = 0;
        valorCobrado = 0;
        break;
      default:
        custoBase = 0;
        valorCobrado = 0;
    }

    // Se o valor cobrado for 0, não registra transação
    if (valorCobrado === 0) {
      logger.debug("[BILLING] Transação com valor R$ 0,00 - não será registrada", {
        userId: params.userId,
        tipo: params.tipo,
        entrevistaId: params.entrevistaId,
      });
      return { success: true, transacaoId: undefined };
    }

    // Log do valor que será cobrado
    logger.info("[BILLING] Registrando cobrança", {
      userId: params.userId,
      ownerId: ownerId,
      tipo: params.tipo,
      valorCobrado: valorCobrado.toFixed(2),
      custoBase: custoBase.toFixed(6),
      entrevistaId: params.entrevistaId,
      descricao: params.descricao,
    });

    // VALIDAÇÃO PRÉ-REGISTRO: Verificar se a cobrança é válida antes de registrar
    if (params.entrevistaId && (params.tipo === "taxa_base_candidato" || params.tipo === "analise_pergunta")) {
      const validacaoPre = await validarNovaCobranca({
        userId: params.userId,
        entrevistaId: params.entrevistaId,
        tipo: params.tipo,
      });

      if (!validacaoPre.valid) {
        logger.warn("[BILLING] ⚠️ Cobrança bloqueada pela validação", {
          userId: params.userId,
          tipo: params.tipo,
          entrevistaId: params.entrevistaId,
          reason: validacaoPre.reason,
        });
        return {
          success: false,
          error: validacaoPre.reason || "Cobrança inválida",
        };
      }
    }

    // Busca ou cria a fatura do mês atual para o OWNER da conta
    const now = new Date();
    const mesAtual = now.getMonth() + 1;
    const anoAtual = now.getFullYear();

    let [faturaAtual] = await db
      .select({ id: faturas.id })
      .from(faturas)
      .where(
        and(
          eq(faturas.userId, ownerId),
          eq(faturas.mesReferencia, mesAtual),
          eq(faturas.anoReferencia, anoAtual)
        )
      )
      .limit(1);

    // Cria fatura se não existir (para o owner)
    if (!faturaAtual) {
      const [novaFatura] = await db
        .insert(faturas)
        .values({
          userId: ownerId,
          mesReferencia: mesAtual,
          anoReferencia: anoAtual,
          valorTotal: "0.00",
          valorPago: "0.00",
          status: "aberta",
        })
        .returning({ id: faturas.id });
      faturaAtual = novaFatura;
    }

    // Cria a transação para o OWNER da conta
    const [transacao] = await db
      .insert(transacoes)
      .values({
        userId: ownerId,
        faturaId: faturaAtual.id,
        entrevistaId: params.entrevistaId,
        respostaId: params.respostaId,
        tipo: params.tipo,
        custoBase: custoBase.toFixed(6),
        markup: "2.5",
        valorCobrado: valorCobrado.toFixed(2),
        descricao: params.descricao,
        metadados: params.metadados,
        status: "concluida",
        processadaEm: new Date(),
      })
      .returning({ id: transacoes.id });

    // Atualiza o valor total da fatura
    await db
      .update(faturas)
      .set({
        valorTotal: sql`${faturas.valorTotal}::numeric + ${valorCobrado}`,
        totalTransacoes: sql`COALESCE(${faturas.totalTransacoes}, 0) + 1`,
        updatedAt: new Date(),
      })
      .where(eq(faturas.id, faturaAtual.id));

    logger.info("[BILLING] ✅ Transação registrada com sucesso", {
      transacaoId: transacao.id,
      faturaId: faturaAtual.id,
      userId: params.userId,
      ownerId: ownerId,
      valorCobrado: valorCobrado.toFixed(2),
      tipo: params.tipo,
    });

    // VALIDAÇÃO PÓS-REGISTRO: Verificar que a transação foi registrada corretamente
    if (params.entrevistaId && transacao.id) {
      const validacaoPos = await validarCobrancaRegistrada({
        userId: params.userId,
        entrevistaId: params.entrevistaId,
        transacaoId: transacao.id,
        tipo: params.tipo,
        valorEsperado: valorCobrado,
      });

      if (!validacaoPos.valid) {
        logger.error("[BILLING] ❌ Validação pós-registro falhou", {
          userId: params.userId,
          transacaoId: transacao.id,
          error: validacaoPos.error,
        });
        // Não retorna erro aqui pois a transação já foi registrada
        // O erro será tratado pelo cron de verificação
      }
    }

    return { success: true, transacaoId: transacao.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Log crítico com todos os detalhes
    logger.error("[BILLING] ❌ ERRO CRÍTICO ao registrar transação", {
      error: errorMessage,
      userId: params.userId,
      tipo: params.tipo,
      valorCobrado,
      entrevistaId: params.entrevistaId,
      respostaId: params.respostaId,
    });

    // Registra no sistema de erros do admin
    await logSystemError({
      level: "critical",
      component: "billing:registrarTransacao",
      message: `Falha ao registrar transação de billing - Usuário: ${params.userId}`,
      errorMessage: errorMessage,
      errorStack: errorStack,
      userId: params.userId,
      context: {
        tipo: params.tipo,
        valorCobrado,
        custoBase,
        entrevistaId: params.entrevistaId,
        respostaId: params.respostaId,
        descricao: params.descricao,
        metadados: params.metadados,
      },
      createTicket: true, // Cria ticket automaticamente pois é crítico
    }).catch((logError) => {
      // Se falhar ao logar o erro, pelo menos registra no console
      console.error("[BILLING] Falha ao registrar erro no sistema:", logError);
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Registra cobrança completa de análise de candidato
 * Modelo: Taxa base por candidato (R$ 1,00) + Por pergunta analisada (R$ 0,25)
 */
export async function registrarAnalisePerguntas(params: {
  userId: string;
  entrevistaId: string;
  perguntas: Array<{
    perguntaId: string;
    perguntaTexto: string;
    respostaId?: string;
  }>;
}): Promise<{ success: boolean; totalCobrado: number; error?: string }> {
  // Log início do processo de cobrança
  logger.info("[BILLING] Iniciando cobrança de análise de candidato", {
    userId: params.userId,
    entrevistaId: params.entrevistaId,
    totalPerguntas: params.perguntas.length,
  });

  let totalCobrado = 0;
  let transacoesRegistradas = 0;
  let falhasRegistro = 0;

  // 1. Cobra taxa base por candidato (R$ 1,00)
  const taxaBaseResult = await registrarTransacao({
    userId: params.userId,
    tipo: "taxa_base_candidato",
    entrevistaId: params.entrevistaId,
    descricao: `Taxa base - análise de candidato`,
    metadados: {
      totalPerguntas: params.perguntas.length,
    },
  });

  if (taxaBaseResult.success) {
    totalCobrado += PRECOS_USUARIO.taxaBasePorCandidato;
    transacoesRegistradas++;
    logger.debug("[BILLING] Taxa base registrada com sucesso", {
      transacaoId: taxaBaseResult.transacaoId,
      valor: PRECOS_USUARIO.taxaBasePorCandidato,
    });
  } else {
    falhasRegistro++;
    logger.error("[BILLING] ❌ Falha ao registrar taxa base", {
      error: taxaBaseResult.error,
      userId: params.userId,
      entrevistaId: params.entrevistaId,
    });

    // Log erro crítico se falhar a taxa base
    await logSystemError({
      level: "critical",
      component: "billing:registrarAnalisePerguntas",
      message: "Falha ao registrar taxa base de candidato",
      errorMessage: taxaBaseResult.error,
      userId: params.userId,
      context: {
        entrevistaId: params.entrevistaId,
        etapa: "taxa_base",
      },
      createTicket: true,
    }).catch(console.error);
  }

  // 2. Cobra por cada pergunta analisada (R$ 0,25 cada)
  for (const pergunta of params.perguntas) {
    const result = await registrarTransacao({
      userId: params.userId,
      tipo: "analise_pergunta",
      entrevistaId: params.entrevistaId,
      respostaId: pergunta.respostaId,
      descricao: `Análise: ${pergunta.perguntaTexto.substring(0, 50)}...`,
      metadados: {
        modeloIA: "claude-sonnet-4-5-20250929",
        tokensEntrada: USAGE_ESTIMATES_ANALISE_PERGUNTA.input,
        tokensSaida: USAGE_ESTIMATES_ANALISE_PERGUNTA.output,
        perguntaId: pergunta.perguntaId,
        perguntaTexto: pergunta.perguntaTexto,
      },
    });

    if (result.success) {
      totalCobrado += PRECOS_USUARIO.analisePorPergunta;
      transacoesRegistradas++;
    } else {
      falhasRegistro++;
      logger.error("[BILLING] ❌ Falha ao registrar cobrança de pergunta", {
        error: result.error,
        perguntaId: pergunta.perguntaId,
        userId: params.userId,
        entrevistaId: params.entrevistaId,
      });
    }
  }

  // Log final do processo
  const totalEsperado = PRECOS_USUARIO.taxaBasePorCandidato + (PRECOS_USUARIO.analisePorPergunta * params.perguntas.length);

  logger.info("[BILLING] ✅ Processo de cobrança concluído", {
    userId: params.userId,
    entrevistaId: params.entrevistaId,
    totalCobrado: totalCobrado.toFixed(2),
    totalEsperado: totalEsperado.toFixed(2),
    transacoesRegistradas,
    falhasRegistro,
    totalPerguntas: params.perguntas.length,
  });

  // Se houve falhas, registra erro crítico
  if (falhasRegistro > 0) {
    await logSystemError({
      level: "critical",
      component: "billing:registrarAnalisePerguntas",
      message: `${falhasRegistro} transação(ões) de billing falharam durante análise`,
      userId: params.userId,
      context: {
        entrevistaId: params.entrevistaId,
        totalPerguntas: params.perguntas.length,
        transacoesRegistradas,
        falhasRegistro,
        totalCobrado,
        totalEsperado,
        diferencaValor: totalEsperado - totalCobrado,
      },
      createTicket: true,
    }).catch(console.error);
  }

  return {
    success: falhasRegistro === 0,
    totalCobrado,
    error: falhasRegistro > 0 ? `${falhasRegistro} transação(ões) falharam` : undefined,
  };
}

/**
 * Interface para resultado da verificação de acesso à IA
 */
export interface AcessoIAResult {
  /**
   * Se o usuário tem permissão para usar funcionalidades de IA
   */
  permitido: boolean;

  /**
   * Motivo técnico (para logs)
   */
  motivo?: string;

  /**
   * Mensagem amigável para exibir ao usuário
   */
  mensagemUsuario?: string;

  /**
   * Percentual de uso atual
   */
  percentualUsado?: number;

  /**
   * Se o limite foi atingido
   */
  limiteAtingido?: boolean;

  /**
   * Se precisa fazer upgrade
   */
  precisaUpgrade?: boolean;
}

/**
 * Verifica se o usuário tem acesso às funcionalidades de IA
 * Bloqueia acesso quando o limite do free trial é excedido
 *
 * IMPORTANTE: Verifica o acesso baseado na CONTA (owner), não no usuário individual.
 * Se o usuário é membro de um time, verifica o plano/limite do owner do time.
 */
export async function verificarAcessoIA(userId: string): Promise<AcessoIAResult> {
  const db = getDB();

  // Obtém o owner efetivo (se for membro de time, usa o owner do time)
  const ownerId = await getEffectiveOwnerId(userId);

  // Busca dados do OWNER da conta (não do membro)
  const [owner] = await db
    .select({
      planType: users.planType,
      planStatus: users.planStatus,
      isTestAccount: users.isTestAccount,
      notificacao75EnviadaEm: users.notificacao75EnviadaEm,
      nome: users.nome,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, ownerId));

  if (!owner) {
    return {
      permitido: false,
      motivo: "usuario_nao_encontrado",
      mensagemUsuario: "Usuário não encontrado. Por favor, faça login novamente.",
    };
  }

  // Contas de teste sempre têm acesso
  if (owner.isTestAccount) {
    return {
      permitido: true,
      motivo: "conta_teste",
      percentualUsado: 0,
      limiteAtingido: false,
      precisaUpgrade: false,
    };
  }

  // Planos pagos sempre têm acesso (pay-per-use)
  if (owner.planType !== PlanType.FREE_TRIAL) {
    return {
      permitido: true,
      motivo: "plano_pago",
      percentualUsado: 0,
      limiteAtingido: false,
      precisaUpgrade: false,
    };
  }

  // Para free trial, verifica o limite financeiro (já usa owner internamente)
  const usage = await getUsageFinanceiro(userId);

  // Verifica se precisa enviar notificação de 75% para o OWNER
  if (usage.percentualUsado >= 75 && !owner.notificacao75EnviadaEm) {
    // Envia notificação de 75% em background (não bloqueia) para o owner
    enviarNotificacao75(ownerId, owner.nome, owner.email, usage).catch((err) => {
      logger.error("[BILLING] Erro ao enviar notificação de 75%", { error: err, userId, ownerId });
    });
  }

  // Se o limite foi atingido, bloqueia
  if (usage.limiteAtingido) {
    return {
      permitido: false,
      motivo: "limite_free_trial_atingido",
      mensagemUsuario: "Sua cota de testes acabou! Cadastre seu cartão de crédito e pague apenas pelo que usar.",
      percentualUsado: usage.percentualUsado,
      limiteAtingido: true,
      precisaUpgrade: true,
    };
  }

  // Tudo ok
  return {
    permitido: true,
    motivo: "dentro_do_limite",
    percentualUsado: usage.percentualUsado,
    limiteAtingido: false,
    precisaUpgrade: false,
  };
}

/**
 * Envia notificação de 75% do limite atingido
 */
async function enviarNotificacao75(
  userId: string,
  nome: string,
  email: string,
  usage: UsageFinanceiro
): Promise<void> {
  const db = getDB();

  // Template do email
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alerta: 75% do seu crédito gratuito foi utilizado</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">EntrevistIA</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Alert Badge -->
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-block; background-color: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                  ⚠️ Alerta de Uso
                </span>
              </div>

              <h2 style="margin: 0 0 16px; color: #18181b; font-size: 20px; font-weight: 600; text-align: center;">
                Olá, ${nome}!
              </h2>

              <p style="margin: 0 0 24px; color: #52525b; font-size: 16px; line-height: 1.6; text-align: center;">
                Você já utilizou <strong style="color: #f59e0b;">${Math.round(usage.percentualUsado)}%</strong> do seu crédito gratuito de teste.
              </p>

              <!-- Progress Bar -->
              <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="color: #71717a; font-size: 14px;">Utilizado</span>
                  <span style="color: #18181b; font-size: 14px; font-weight: 600;">R$ ${usage.totalGasto.toFixed(2)} / R$ ${usage.limiteFinanceiro.toFixed(2)}</span>
                </div>
                <div style="background-color: #e4e4e7; border-radius: 4px; height: 8px; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #f59e0b, #ef4444); height: 100%; width: ${Math.min(usage.percentualUsado, 100)}%; border-radius: 4px;"></div>
                </div>
                <p style="margin: 12px 0 0; color: #71717a; font-size: 13px; text-align: center;">
                  Saldo restante: <strong style="color: #22c55e;">R$ ${usage.saldoRestante.toFixed(2)}</strong>
                </p>
              </div>

              <p style="margin: 0 0 24px; color: #52525b; font-size: 15px; line-height: 1.6;">
                Quando o crédito acabar, as funcionalidades de análise por IA serão pausadas.
                Para continuar avaliando candidatos sem interrupções, cadastre seu cartão de crédito e pague apenas pelo que usar.
              </p>

              <!-- Pricing Info -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; color: #166534; font-size: 14px; font-weight: 600;">
                  💰 Preços transparentes:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px;">
                  <li style="margin-bottom: 4px;">R$ 1,00 por candidato avaliado</li>
                  <li>R$ 0,25 por pergunta analisada</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://entrevistia.com.br'}/upgrade"
                   style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3);">
                  Cadastrar Cartão de Crédito
                </a>
              </div>

              <p style="margin: 0; color: #a1a1aa; font-size: 13px; text-align: center;">
                Sem compromisso. Cancele quando quiser.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px 40px; border-top: 1px solid #f4f4f5;">
              <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-align: center; line-height: 1.5;">
                Este email foi enviado pelo EntrevistIA.<br>
                Se você não reconhece esta mensagem, por favor ignore-a.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    await enviarEmail({
      to: email,
      subject: "⚠️ Alerta: 75% do seu crédito gratuito foi utilizado - EntrevistIA",
      html,
    });

    // Marca como enviado no banco
    await db
      .update(users)
      .set({
        notificacao75EnviadaEm: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    logger.info("[BILLING] Notificação de 75% enviada com sucesso", {
      userId,
      email,
      percentualUsado: usage.percentualUsado,
    });
  } catch (error) {
    logger.error("[BILLING] Erro ao enviar notificação de 75%", {
      userId,
      email,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
    throw error;
  }
}

/**
 * Verifica se o usuário pode realizar análise de IA
 * Retorna erro formatado se não puder
 */
export async function verificarPermissaoAnalise(userId: string): Promise<{
  permitido: boolean;
  error?: { code: string; message: string; statusCode: number };
}> {
  const acesso = await verificarAcessoIA(userId);

  if (!acesso.permitido) {
    return {
      permitido: false,
      error: {
        code: "LIMITE_FREE_TRIAL_ATINGIDO",
        message: acesso.mensagemUsuario || "Limite do período de testes atingido. Faça upgrade do seu plano.",
        statusCode: 402, // Payment Required
      },
    };
  }

  return { permitido: true };
}
