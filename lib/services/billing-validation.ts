import { getDB } from "@/lib/db";
import { transacoes, faturas } from "@/lib/db/schema/transacoes";
import { candidatoEntrevistas } from "@/lib/db/schema/candidato-entrevistas";
import { entrevistas } from "@/lib/db/schema/entrevistas";
import { respostas } from "@/lib/db/schema/respostas";
import { eq, sql, and, isNotNull } from "drizzle-orm";
import { PRECOS_USUARIO } from "@/lib/config/pricing";
import { logSystemError } from "@/lib/support/ticket-service";
import { logger } from "@/lib/logger";

/**
 * Resultado de validação de billing
 */
export interface BillingValidationResult {
  success: boolean;
  errors: BillingError[];
  warnings: BillingWarning[];
  stats: BillingStats;
  autoFixed: number;
}

export interface BillingError {
  type: "MISSING_TAXA_BASE" | "MISSING_PERGUNTAS" | "DUPLICATE_TAXA" | "ORPHAN_TAXA" | "VALUE_MISMATCH" | "INTEGRITY_ERROR";
  message: string;
  entrevistaId?: string;
  userId?: string;
  expectedValue?: number;
  actualValue?: number;
  canAutoFix: boolean;
}

export interface BillingWarning {
  type: "EXTRA_TAXA" | "VALUE_DEVIATION" | "ORPHAN_RECORD";
  message: string;
  details?: Record<string, unknown>;
}

export interface BillingStats {
  totalAnalises: number;
  totalTaxasBase: number;
  totalPerguntas: number;
  totalCobrado: number;
  totalEsperado: number;
  consistencyScore: number; // 0-100
}

/**
 * Valida a consistência das cobranças de um usuário específico
 */
export async function validarBillingUsuario(userId: string): Promise<BillingValidationResult> {
  const db = getDB();
  const errors: BillingError[] = [];
  const warnings: BillingWarning[] = [];
  let autoFixed = 0;

  logger.info("[BILLING_VALIDATION] Iniciando validação para usuário", { userId });

  // 1. Buscar todas as análises de candidatos (candidato_entrevistas com avaliado_em)
  const analises = await db
    .select({
      id: candidatoEntrevistas.id,
      entrevistaId: candidatoEntrevistas.entrevistaId,
      candidatoId: candidatoEntrevistas.candidatoId,
      avaliadoEm: candidatoEntrevistas.avaliadoEm,
    })
    .from(candidatoEntrevistas)
    .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
    .where(
      and(
        eq(entrevistas.userId, userId),
        isNotNull(candidatoEntrevistas.avaliadoEm)
      )
    );

  // 2. Para cada análise, verificar se há taxa base e perguntas cobradas
  for (const analise of analises) {
    // Buscar transações próximas ao momento da avaliação (janela de 10 minutos)
    const transacoesAnalise = await db
      .select({
        id: transacoes.id,
        tipo: transacoes.tipo,
        valorCobrado: transacoes.valorCobrado,
        createdAt: transacoes.createdAt,
      })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.entrevistaId, analise.entrevistaId),
          eq(transacoes.userId, userId),
          sql`ABS(EXTRACT(EPOCH FROM (${transacoes.createdAt} - ${analise.avaliadoEm}::timestamp))) < 600`
        )
      );

    const taxasBase = transacoesAnalise.filter(t => t.tipo === "taxa_base_candidato");
    const perguntasTransacoes = transacoesAnalise.filter(t => t.tipo === "analise_pergunta");

    // Verificar se há taxa base
    if (taxasBase.length === 0) {
      // Contar respostas do candidato para verificar se deveria ter sido cobrado
      const [respostasCount] = await db
        .select({ count: sql<number>`COUNT(*)::int` })
        .from(respostas)
        .where(
          and(
            eq(respostas.candidatoId, analise.candidatoId),
            eq(respostas.entrevistaId, analise.entrevistaId)
          )
        );

      if ((respostasCount?.count || 0) > 0) {
        errors.push({
          type: "MISSING_TAXA_BASE",
          message: `Análise sem taxa base: entrevista ${analise.entrevistaId}`,
          entrevistaId: analise.entrevistaId,
          userId,
          expectedValue: PRECOS_USUARIO.taxaBasePorCandidato,
          actualValue: 0,
          canAutoFix: true,
        });
      }
    }

    // Verificar se há taxa duplicada
    if (taxasBase.length > 1) {
      errors.push({
        type: "DUPLICATE_TAXA",
        message: `Taxa base duplicada (${taxasBase.length}x): entrevista ${analise.entrevistaId}`,
        entrevistaId: analise.entrevistaId,
        userId,
        canAutoFix: true,
      });
    }

    // Verificar se os valores estão corretos
    for (const taxa of taxasBase) {
      const valor = Number(taxa.valorCobrado);
      if (valor !== PRECOS_USUARIO.taxaBasePorCandidato) {
        errors.push({
          type: "VALUE_MISMATCH",
          message: `Taxa base com valor incorreto: R$ ${valor.toFixed(2)} (esperado: R$ ${PRECOS_USUARIO.taxaBasePorCandidato.toFixed(2)})`,
          entrevistaId: analise.entrevistaId,
          userId,
          expectedValue: PRECOS_USUARIO.taxaBasePorCandidato,
          actualValue: valor,
          canAutoFix: true,
        });
      }
    }

    for (const pergunta of perguntasTransacoes) {
      const valor = Number(pergunta.valorCobrado);
      if (valor !== PRECOS_USUARIO.analisePorPergunta) {
        errors.push({
          type: "VALUE_MISMATCH",
          message: `Análise de pergunta com valor incorreto: R$ ${valor.toFixed(2)} (esperado: R$ ${PRECOS_USUARIO.analisePorPergunta.toFixed(2)})`,
          entrevistaId: analise.entrevistaId,
          userId,
          expectedValue: PRECOS_USUARIO.analisePorPergunta,
          actualValue: valor,
          canAutoFix: true,
        });
      }
    }
  }

  // 3. Verificar taxas órfãs (taxas sem perguntas associadas na mesma janela)
  const taxasOrfas = await db.execute(sql`
    WITH grupos AS (
      SELECT
        entrevista_id,
        DATE_TRUNC('minute', created_at) as minuto,
        SUM(CASE WHEN tipo = 'taxa_base_candidato' THEN valor_cobrado::numeric ELSE 0 END) as taxa_base,
        COUNT(CASE WHEN tipo = 'analise_pergunta' THEN 1 END) as qtd_perguntas
      FROM transacoes
      WHERE user_id = ${userId}
        AND tipo IN ('taxa_base_candidato', 'analise_pergunta')
      GROUP BY entrevista_id, DATE_TRUNC('minute', created_at)
    )
    SELECT * FROM grupos
    WHERE taxa_base > 0 AND qtd_perguntas = 0
  `);

  for (const orfa of taxasOrfas.rows as Array<{ entrevista_id: string; minuto: Date }>) {
    warnings.push({
      type: "ORPHAN_RECORD",
      message: `Taxa base órfã (sem perguntas): entrevista ${orfa.entrevista_id}`,
      details: { entrevistaId: orfa.entrevista_id, minuto: orfa.minuto },
    });
  }

  // 4. Calcular estatísticas
  const [statsResult] = await db
    .select({
      totalTaxas: sql<number>`COUNT(CASE WHEN tipo = 'taxa_base_candidato' THEN 1 END)::int`,
      totalPerguntas: sql<number>`COUNT(CASE WHEN tipo = 'analise_pergunta' THEN 1 END)::int`,
      totalCobrado: sql<number>`COALESCE(SUM(valor_cobrado::numeric), 0)::numeric`,
    })
    .from(transacoes)
    .where(
      and(
        eq(transacoes.userId, userId),
        sql`tipo IN ('taxa_base_candidato', 'analise_pergunta')`
      )
    );

  const totalEsperado =
    (analises.length * PRECOS_USUARIO.taxaBasePorCandidato) +
    (Number(statsResult?.totalPerguntas || 0) * PRECOS_USUARIO.analisePorPergunta);

  const totalCobrado = Number(statsResult?.totalCobrado || 0);

  // Score de consistência (100 = perfeito, 0 = completamente inconsistente)
  const consistencyScore = errors.length === 0
    ? 100
    : Math.max(0, 100 - (errors.length * 10) - (warnings.length * 2));

  const stats: BillingStats = {
    totalAnalises: analises.length,
    totalTaxasBase: statsResult?.totalTaxas || 0,
    totalPerguntas: statsResult?.totalPerguntas || 0,
    totalCobrado,
    totalEsperado,
    consistencyScore,
  };

  logger.info("[BILLING_VALIDATION] Validação concluída", {
    userId,
    errors: errors.length,
    warnings: warnings.length,
    consistencyScore,
    stats,
  });

  return {
    success: errors.length === 0,
    errors,
    warnings,
    stats,
    autoFixed,
  };
}

/**
 * Valida a consistência de todas as cobranças do sistema
 */
export async function validarBillingGlobal(): Promise<{
  totalUsuarios: number;
  usuariosComErros: number;
  totalErros: number;
  totalWarnings: number;
  usuariosAfetados: string[];
}> {
  const db = getDB();

  logger.info("[BILLING_VALIDATION] Iniciando validação global");

  // Buscar todos os usuários com transações
  const usuariosResult = await db.execute(sql`
    SELECT DISTINCT user_id FROM transacoes
    WHERE tipo IN ('taxa_base_candidato', 'analise_pergunta')
  `);

  const usuarios = (usuariosResult.rows as Array<{ user_id: string }>).map(r => r.user_id);

  let usuariosComErros = 0;
  let totalErros = 0;
  let totalWarnings = 0;
  const usuariosAfetados: string[] = [];

  for (const userId of usuarios) {
    const result = await validarBillingUsuario(userId);

    if (!result.success) {
      usuariosComErros++;
      usuariosAfetados.push(userId);
    }

    totalErros += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  logger.info("[BILLING_VALIDATION] Validação global concluída", {
    totalUsuarios: usuarios.length,
    usuariosComErros,
    totalErros,
    totalWarnings,
  });

  return {
    totalUsuarios: usuarios.length,
    usuariosComErros,
    totalErros,
    totalWarnings,
    usuariosAfetados,
  };
}

/**
 * Corrige automaticamente erros de billing que podem ser corrigidos
 */
export async function corrigirBillingUsuario(userId: string): Promise<{
  success: boolean;
  corrigidos: number;
  falhas: number;
  detalhes: string[];
}> {
  const db = getDB();
  const detalhes: string[] = [];
  let corrigidos = 0;
  let falhas = 0;

  logger.info("[BILLING_VALIDATION] Iniciando correção automática", { userId });

  // 1. Primeiro, validar para encontrar os problemas
  const validacao = await validarBillingUsuario(userId);

  // 2. Corrigir cada erro que pode ser auto-corrigido
  for (const error of validacao.errors.filter(e => e.canAutoFix)) {
    try {
      switch (error.type) {
        case "MISSING_TAXA_BASE":
          await corrigirTaxaBaseFaltante(userId, error.entrevistaId!);
          detalhes.push(`Taxa base adicionada: ${error.entrevistaId}`);
          corrigidos++;
          break;

        case "DUPLICATE_TAXA":
          await removerTaxaDuplicada(userId, error.entrevistaId!);
          detalhes.push(`Taxa duplicada removida: ${error.entrevistaId}`);
          corrigidos++;
          break;

        case "VALUE_MISMATCH":
          await corrigirValorTransacao(userId, error.entrevistaId!, error.expectedValue!);
          detalhes.push(`Valor corrigido: ${error.entrevistaId}`);
          corrigidos++;
          break;

        default:
          detalhes.push(`Erro não corrigível automaticamente: ${error.type}`);
          falhas++;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      detalhes.push(`Falha ao corrigir ${error.type}: ${errorMsg}`);
      falhas++;

      await logSystemError({
        level: "error",
        component: "billing-validation:corrigirBillingUsuario",
        message: `Falha ao corrigir erro de billing`,
        errorMessage: errorMsg,
        userId,
        context: { error },
      }).catch(console.error);
    }
  }

  // 3. Recalcular totais das faturas
  await recalcularTotaisFaturas(userId);
  detalhes.push("Totais das faturas recalculados");

  logger.info("[BILLING_VALIDATION] Correção automática concluída", {
    userId,
    corrigidos,
    falhas,
  });

  return {
    success: falhas === 0,
    corrigidos,
    falhas,
    detalhes,
  };
}

/**
 * Adiciona taxa base faltante para uma análise
 */
async function corrigirTaxaBaseFaltante(userId: string, entrevistaId: string): Promise<void> {
  const db = getDB();

  // Buscar análise mais recente para esta entrevista
  const [analise] = await db
    .select({
      avaliadoEm: candidatoEntrevistas.avaliadoEm,
    })
    .from(candidatoEntrevistas)
    .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
    .where(
      and(
        eq(entrevistas.id, entrevistaId),
        isNotNull(candidatoEntrevistas.avaliadoEm)
      )
    )
    .orderBy(sql`${candidatoEntrevistas.avaliadoEm} DESC`)
    .limit(1);

  if (!analise?.avaliadoEm) {
    throw new Error(`Análise não encontrada para entrevista ${entrevistaId}`);
  }

  // Buscar ou criar fatura
  const dataRef = new Date(analise.avaliadoEm);
  const mesRef = dataRef.getMonth() + 1;
  const anoRef = dataRef.getFullYear();

  let [fatura] = await db
    .select({ id: faturas.id })
    .from(faturas)
    .where(
      and(
        eq(faturas.userId, userId),
        eq(faturas.mesReferencia, mesRef),
        eq(faturas.anoReferencia, anoRef)
      )
    )
    .limit(1);

  if (!fatura) {
    [fatura] = await db
      .insert(faturas)
      .values({
        userId,
        mesReferencia: mesRef,
        anoReferencia: anoRef,
      })
      .returning({ id: faturas.id });
  }

  // Criar taxa base
  await db.insert(transacoes).values({
    userId,
    faturaId: fatura.id,
    entrevistaId,
    tipo: "taxa_base_candidato",
    custoBase: "0.10",
    markup: "10.0",
    valorCobrado: PRECOS_USUARIO.taxaBasePorCandidato.toFixed(2),
    descricao: "Taxa base - correção automática",
    status: "concluida",
    createdAt: analise.avaliadoEm,
    processadaEm: new Date(),
  });
}

/**
 * Remove taxa base duplicada
 */
async function removerTaxaDuplicada(userId: string, entrevistaId: string): Promise<void> {
  const db = getDB();

  // Buscar todas as taxas base para esta entrevista
  const taxas = await db
    .select({ id: transacoes.id, createdAt: transacoes.createdAt })
    .from(transacoes)
    .where(
      and(
        eq(transacoes.userId, userId),
        eq(transacoes.entrevistaId, entrevistaId),
        eq(transacoes.tipo, "taxa_base_candidato")
      )
    )
    .orderBy(transacoes.createdAt);

  // Manter a primeira (mais antiga) e remover as outras
  const parasRemover = taxas.slice(1);

  for (const taxa of parasRemover) {
    await db.delete(transacoes).where(eq(transacoes.id, taxa.id));
  }
}

/**
 * Corrige valor incorreto de uma transação
 */
async function corrigirValorTransacao(
  userId: string,
  entrevistaId: string,
  valorCorreto: number
): Promise<void> {
  const db = getDB();

  // Atualizar valor das transações com valor incorreto
  await db
    .update(transacoes)
    .set({
      valorCobrado: valorCorreto.toFixed(2),
    })
    .where(
      and(
        eq(transacoes.userId, userId),
        eq(transacoes.entrevistaId, entrevistaId),
        sql`valor_cobrado::numeric != ${valorCorreto}`
      )
    );
}

/**
 * Recalcula os totais de todas as faturas de um usuário
 */
async function recalcularTotaisFaturas(userId: string): Promise<void> {
  const db = getDB();

  await db.execute(sql`
    UPDATE faturas f
    SET
      valor_total = COALESCE((
        SELECT SUM(valor_cobrado::numeric)
        FROM transacoes t
        WHERE t.fatura_id = f.id
      ), 0),
      total_transacoes = COALESCE((
        SELECT COUNT(*)
        FROM transacoes t
        WHERE t.fatura_id = f.id
      ), 0),
      updated_at = NOW()
    WHERE f.user_id = ${userId}
  `);
}

/**
 * Verifica a integridade de uma nova cobrança ANTES de registrar
 * Retorna true se a cobrança pode ser registrada
 */
export async function validarNovaCobranca(params: {
  userId: string;
  entrevistaId: string;
  tipo: "taxa_base_candidato" | "analise_pergunta";
}): Promise<{ valid: boolean; reason?: string }> {
  const db = getDB();

  // Se for taxa base, verificar se já existe uma recente (últimos 5 minutos)
  if (params.tipo === "taxa_base_candidato") {
    const [taxaExistente] = await db
      .select({ id: transacoes.id })
      .from(transacoes)
      .where(
        and(
          eq(transacoes.userId, params.userId),
          eq(transacoes.entrevistaId, params.entrevistaId),
          eq(transacoes.tipo, "taxa_base_candidato"),
          sql`created_at > NOW() - INTERVAL '5 minutes'`
        )
      )
      .limit(1);

    if (taxaExistente) {
      return {
        valid: false,
        reason: "Taxa base já registrada recentemente para esta análise",
      };
    }
  }

  return { valid: true };
}

/**
 * Hook pós-registro para validar que a cobrança foi registrada corretamente
 */
export async function validarCobrancaRegistrada(params: {
  userId: string;
  entrevistaId: string;
  transacaoId: string;
  tipo: string;
  valorEsperado: number;
}): Promise<{ valid: boolean; error?: string }> {
  const db = getDB();

  // Buscar a transação recém-criada
  const [transacao] = await db
    .select({
      id: transacoes.id,
      valorCobrado: transacoes.valorCobrado,
      status: transacoes.status,
    })
    .from(transacoes)
    .where(eq(transacoes.id, params.transacaoId));

  if (!transacao) {
    await logSystemError({
      level: "critical",
      component: "billing-validation:validarCobrancaRegistrada",
      message: "Transação não encontrada após registro",
      userId: params.userId,
      context: params,
      createTicket: true,
    }).catch(console.error);

    return {
      valid: false,
      error: "Transação não encontrada após registro",
    };
  }

  const valorRegistrado = Number(transacao.valorCobrado);
  if (valorRegistrado !== params.valorEsperado) {
    await logSystemError({
      level: "critical",
      component: "billing-validation:validarCobrancaRegistrada",
      message: `Valor registrado diferente do esperado: ${valorRegistrado} != ${params.valorEsperado}`,
      userId: params.userId,
      context: params,
      createTicket: true,
    }).catch(console.error);

    return {
      valid: false,
      error: `Valor incorreto: esperado R$ ${params.valorEsperado.toFixed(2)}, registrado R$ ${valorRegistrado.toFixed(2)}`,
    };
  }

  if (transacao.status !== "concluida") {
    return {
      valid: false,
      error: `Status incorreto: ${transacao.status}`,
    };
  }

  return { valid: true };
}

/**
 * Exporta relatório de consistência de billing em formato JSON
 */
export async function gerarRelatorioBilling(userId?: string): Promise<{
  geradoEm: string;
  global?: Awaited<ReturnType<typeof validarBillingGlobal>>;
  usuario?: Awaited<ReturnType<typeof validarBillingUsuario>>;
}> {
  const relatorio: {
    geradoEm: string;
    global?: Awaited<ReturnType<typeof validarBillingGlobal>>;
    usuario?: Awaited<ReturnType<typeof validarBillingUsuario>>;
  } = {
    geradoEm: new Date().toISOString(),
  };

  if (userId) {
    relatorio.usuario = await validarBillingUsuario(userId);
  } else {
    relatorio.global = await validarBillingGlobal();
  }

  return relatorio;
}
