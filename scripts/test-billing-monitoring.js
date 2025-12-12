/**
 * Script de teste do sistema de monitoramento de billing
 *
 * Verifica:
 * 1. Se o sistema de logging está funcionando
 * 2. Se erros de billing são registrados no admin
 * 3. Se transações estão sendo criadas corretamente
 */

import { getDB } from '../lib/db/index.js';
import {
  transacoes,
  faturas,
  candidatoEntrevistas,
  entrevistas,
  systemLogs,
  errorAggregations,
} from '../lib/db/schema/index.js';
import { eq, desc, gte, and, sql } from 'drizzle-orm';

async function testBillingMonitoring() {
  console.log('🔍 TESTE DO SISTEMA DE MONITORAMENTO DE BILLING\n');
  console.log('='.repeat(70));

  const db = getDB();
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // 1. Verificar logs recentes de billing
  console.log('\n📊 1. VERIFICANDO LOGS DE BILLING...');

  const billingLogs = await db
    .select({
      id: systemLogs.id,
      timestamp: systemLogs.timestamp,
      level: systemLogs.level,
      component: systemLogs.component,
      message: systemLogs.message,
      userId: systemLogs.userId,
    })
    .from(systemLogs)
    .where(
      and(
        gte(systemLogs.timestamp, hoje),
        sql`${systemLogs.component} LIKE 'billing%' OR ${systemLogs.component} = 'ai:billing'`
      )
    )
    .orderBy(desc(systemLogs.timestamp))
    .limit(20);

  console.log(`   Total de logs de billing hoje: ${billingLogs.length}`);

  if (billingLogs.length > 0) {
    console.log('\n   Últimos 5 logs:');
    billingLogs.slice(0, 5).forEach((log, i) => {
      const emoji =
        log.level === 'critical' || log.level === 'error'
          ? '❌'
          : log.level === 'warn'
          ? '⚠️'
          : '✅';
      console.log(
        `   ${i + 1}. ${emoji} [${log.level.toUpperCase()}] ${log.component}: ${log.message.substring(0, 60)}...`
      );
      console.log(`      Timestamp: ${new Date(log.timestamp).toLocaleString('pt-BR')}`);
    });
  } else {
    console.log('   ⚠️  Nenhum log de billing encontrado hoje');
  }

  // 2. Verificar erros agregados de billing
  console.log('\n\n📊 2. VERIFICANDO ERROS AGREGADOS DE BILLING...');

  const billingErrors = await db
    .select({
      id: errorAggregations.id,
      fingerprint: errorAggregations.fingerprint,
      message: errorAggregations.message,
      component: errorAggregations.component,
      totalOccurrences: errorAggregations.totalOccurrences,
      resolved: errorAggregations.resolved,
      lastSeen: errorAggregations.lastSeen,
    })
    .from(errorAggregations)
    .where(
      sql`${errorAggregations.component} LIKE 'billing%' OR ${errorAggregations.component} = 'ai:billing'`
    )
    .orderBy(desc(errorAggregations.lastSeen))
    .limit(10);

  console.log(`   Total de erros de billing registrados: ${billingErrors.length}`);

  if (billingErrors.length > 0) {
    console.log('\n   Erros encontrados:');
    billingErrors.forEach((error, i) => {
      const status = error.resolved ? '✅ Resolvido' : '❌ Pendente';
      console.log(`   ${i + 1}. [${status}] ${error.message.substring(0, 60)}...`);
      console.log(`      Ocorrências: ${error.totalOccurrences}x`);
      console.log(
        `      Última vez: ${new Date(error.lastSeen).toLocaleString('pt-BR')}`
      );
      console.log(`      Component: ${error.component}`);
    });
  } else {
    console.log('   ✅ Nenhum erro de billing registrado - sistema saudável!');
  }

  // 3. Verificar análises recentes e suas transações
  console.log('\n\n📊 3. ANÁLISE DE ANÁLISES X TRANSAÇÕES...');

  const analisesRecentes = await db
    .select({
      id: candidatoEntrevistas.id,
      candidatoId: candidatoEntrevistas.candidatoId,
      entrevistaId: candidatoEntrevistas.entrevistaId,
      avaliadoEm: candidatoEntrevistas.avaliadoEm,
      createdAt: candidatoEntrevistas.createdAt,
    })
    .from(candidatoEntrevistas)
    .where(sql`${candidatoEntrevistas.avaliadoEm} >= ${hoje.toISOString()}`)
    .orderBy(desc(candidatoEntrevistas.avaliadoEm))
    .limit(10);

  console.log(`   Análises realizadas hoje: ${analisesRecentes.length}`);

  if (analisesRecentes.length > 0) {
    console.log('\n   Verificando transações para cada análise:');

    for (const analise of analisesRecentes.slice(0, 5)) {
      // Busca transações desta entrevista
      const transacoesAnalise = await db
        .select({
          id: transacoes.id,
          tipo: transacoes.tipo,
          valorCobrado: transacoes.valorCobrado,
          createdAt: transacoes.createdAt,
        })
        .from(transacoes)
        .where(eq(transacoes.entrevistaId, analise.entrevistaId))
        .orderBy(desc(transacoes.createdAt));

      const transacoesHoje = transacoesAnalise.filter(
        (t) => new Date(t.createdAt) >= hoje
      );

      const totalCobrado = transacoesHoje.reduce(
        (sum, t) => sum + parseFloat(t.valorCobrado),
        0
      );

      const temTaxaBase = transacoesHoje.some((t) => t.tipo === 'taxa_base_candidato');
      const qtdPerguntas = transacoesHoje.filter(
        (t) => t.tipo === 'analise_pergunta'
      ).length;

      const status =
        transacoesHoje.length > 0 && temTaxaBase && qtdPerguntas > 0
          ? '✅'
          : transacoesHoje.length > 0
          ? '⚠️'
          : '❌';

      console.log(
        `\n   ${status} Análise ${analise.id.substring(0, 8)}... (${new Date(analise.avaliadoEm).toLocaleTimeString('pt-BR')})`
      );
      console.log(`      Transações criadas hoje: ${transacoesHoje.length}`);
      console.log(`      Taxa base: ${temTaxaBase ? 'Sim' : 'NÃO'}`);
      console.log(`      Perguntas cobradas: ${qtdPerguntas}`);
      console.log(`      Total cobrado: R$ ${totalCobrado.toFixed(2)}`);

      if (transacoesHoje.length === 0) {
        console.log('      ⚠️  PROBLEMA: Análise sem transações!');
      }
    }
  }

  // 4. Resumo do status do billing
  console.log('\n\n' + '='.repeat(70));
  console.log('📋 RESUMO DO SISTEMA DE BILLING\n');

  const transacoesHoje = await db
    .select({
      count: sql`count(*)::int`,
      total: sql`sum(${transacoes.valorCobrado})::numeric`,
    })
    .from(transacoes)
    .where(gte(transacoes.createdAt, hoje));

  const logsErro = billingLogs.filter(
    (l) => l.level === 'error' || l.level === 'critical'
  ).length;

  const errosNaoResolvidos = billingErrors.filter((e) => !e.resolved).length;

  console.log(`✅ Transações criadas hoje: ${transacoesHoje[0]?.count || 0}`);
  console.log(
    `💰 Valor total cobrado hoje: R$ ${parseFloat(transacoesHoje[0]?.total || 0).toFixed(2)}`
  );
  console.log(`📝 Logs de billing: ${billingLogs.length}`);
  console.log(`❌ Logs de erro: ${logsErro}`);
  console.log(`⚠️  Erros não resolvidos: ${errosNaoResolvidos}`);
  console.log(`🔬 Análises processadas: ${analisesRecentes.length}`);

  // Diagnóstico
  console.log('\n📊 DIAGNÓSTICO:');

  if (analisesRecentes.length > 0 && transacoesHoje[0]?.count === 0) {
    console.log(
      '   ❌ CRÍTICO: Análises foram realizadas mas NENHUMA transação foi criada!'
    );
    console.log('   💡 Verifique a página de erros no admin: /admin/erros');
  } else if (analisesRecentes.length > 0 && transacoesHoje[0]?.count > 0) {
    const taxaEsperada = analisesRecentes.length > 0;
    const temTransacoes = transacoesHoje[0]?.count > 0;

    if (taxaEsperada && temTransacoes) {
      console.log('   ✅ Sistema de billing funcionando corretamente!');
    } else {
      console.log('   ⚠️  Possíveis transações faltando - investigar manualmente');
    }
  } else if (analisesRecentes.length === 0) {
    console.log('   ℹ️  Nenhuma análise realizada hoje - nada a cobrar');
  }

  if (errosNaoResolvidos > 0) {
    console.log(
      `   ⚠️  Existem ${errosNaoResolvidos} erro(s) não resolvido(s) no sistema`
    );
    console.log('   💡 Acesse /admin/erros para resolver');
  }

  console.log('\n' + '='.repeat(70));
  console.log('✅ Teste concluído!\n');
}

testBillingMonitoring()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro no teste:', error);
    process.exit(1);
  });
