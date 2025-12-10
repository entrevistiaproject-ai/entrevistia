#!/usr/bin/env node

/**
 * Script de Migração de Dados de Cobrança
 *
 * Migra transações do modelo antigo para o novo modelo de precificação:
 *
 * MODELO ANTIGO:
 * - analise_pergunta: R$ 0,70 por pergunta
 * - pergunta_criada: R$ 0,01
 * - entrevista_criada: R$ 0,05
 * - respostaAudio: ~R$ 0,09
 * - respostaTexto: ~R$ 0,03
 *
 * MODELO NOVO:
 * - taxa_base_candidato: R$ 1,00 (uma vez por candidato)
 * - analise_pergunta: R$ 0,25 por pergunta
 * - Criar entrevistas/perguntas: GRÁTIS (valor 0)
 *
 * O script:
 * 1. Lista todas as transações existentes
 * 2. Recalcula os valores conforme novo modelo
 * 3. Atualiza as faturas com os novos totais
 */

const dotenv = require('dotenv');

// Carrega variáveis de ambiente
const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error(`❌ Erro: DATABASE_URL não encontrada em ${envFile}`);
  process.exit(1);
}

const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';
const dryRun = !process.argv.includes('--execute');

console.log(`\n🔄 Migração de Dados de Cobrança - ${environment}`);
console.log(`   Modo: ${dryRun ? '🔍 DRY RUN (simulação)' : '⚡ EXECUÇÃO REAL'}`);
console.log('='.repeat(60));

// Novos preços
const NOVOS_PRECOS = {
  taxa_base_candidato: 1.00,
  analise_pergunta: 0.25,
  transcricao_audio: 0,
  analise_ia: 0,
  pergunta_criada: 0,
  entrevista_criada: 0,
};

// Preços antigos (para referência)
const PRECOS_ANTIGOS = {
  analise_pergunta: 0.70,
  pergunta_criada: 0.01,
  entrevista_criada: 0.05,
};

async function migrateData() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // 1. Verifica se a tabela transacoes existe
    console.log('\n📊 Verificando estrutura do banco...');
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'transacoes'
    `;

    if (tables.length === 0) {
      console.log('❌ Tabela transacoes não encontrada. Nada a migrar.');
      return;
    }

    // 2. Busca estatísticas das transações existentes
    console.log('\n📈 Estatísticas das transações existentes:');
    const stats = await sql`
      SELECT
        tipo,
        COUNT(*) as quantidade,
        SUM(valor_cobrado::numeric) as valor_total,
        AVG(valor_cobrado::numeric) as valor_medio
      FROM transacoes
      GROUP BY tipo
      ORDER BY tipo
    `;

    if (stats.length === 0) {
      console.log('   Nenhuma transação encontrada. Nada a migrar.');
      return;
    }

    let totalAntigoGeral = 0;
    stats.forEach(({ tipo, quantidade, valor_total, valor_medio }) => {
      const valorTotal = parseFloat(valor_total) || 0;
      const valorMedio = parseFloat(valor_medio) || 0;
      totalAntigoGeral += valorTotal;
      console.log(`   ${tipo}: ${quantidade} transações, Total: R$ ${valorTotal.toFixed(2)}, Média: R$ ${valorMedio.toFixed(2)}`);
    });
    console.log(`   TOTAL GERAL (modelo antigo): R$ ${totalAntigoGeral.toFixed(2)}`);

    // 3. Identifica candidatos únicos por entrevista (para criar taxa_base_candidato)
    console.log('\n🔍 Analisando candidatos por entrevista...');
    const candidatosPorEntrevista = await sql`
      SELECT
        t.entrevista_id,
        t.user_id,
        COUNT(DISTINCT t.resposta_id) as total_respostas,
        COUNT(*) as total_transacoes
      FROM transacoes t
      WHERE t.tipo = 'analise_pergunta' AND t.entrevista_id IS NOT NULL
      GROUP BY t.entrevista_id, t.user_id
    `;

    console.log(`   Encontrados ${candidatosPorEntrevista.length} grupos de entrevista/usuário`);

    // 4. Calcula o novo valor total
    console.log('\n💰 Calculando novos valores...');

    // Conta análises de pergunta para recalcular
    const analisePerguntas = await sql`
      SELECT COUNT(*) as total FROM transacoes WHERE tipo = 'analise_pergunta'
    `;
    const totalAnalisesPerguntas = parseInt(analisePerguntas[0]?.total || 0);

    // Estima número de candidatos (assumindo que cada grupo de análises = 1 candidato)
    const numCandidatos = candidatosPorEntrevista.length;

    // Novo cálculo
    const novoValorTaxaBase = numCandidatos * NOVOS_PRECOS.taxa_base_candidato;
    const novoValorAnalises = totalAnalisesPerguntas * NOVOS_PRECOS.analise_pergunta;
    const novoTotalGeral = novoValorTaxaBase + novoValorAnalises;

    console.log(`   Candidatos identificados: ${numCandidatos}`);
    console.log(`   Análises de pergunta: ${totalAnalisesPerguntas}`);
    console.log(`   Taxa base (${numCandidatos} × R$ ${NOVOS_PRECOS.taxa_base_candidato}): R$ ${novoValorTaxaBase.toFixed(2)}`);
    console.log(`   Análises (${totalAnalisesPerguntas} × R$ ${NOVOS_PRECOS.analise_pergunta}): R$ ${novoValorAnalises.toFixed(2)}`);
    console.log(`   NOVO TOTAL: R$ ${novoTotalGeral.toFixed(2)}`);

    const diferenca = novoTotalGeral - totalAntigoGeral;
    const percentual = totalAntigoGeral > 0 ? ((diferenca / totalAntigoGeral) * 100).toFixed(1) : 0;
    console.log(`   Diferença: R$ ${diferenca.toFixed(2)} (${diferenca >= 0 ? '+' : ''}${percentual}%)`);

    if (dryRun) {
      console.log('\n⚠️  DRY RUN - Nenhuma alteração foi feita.');
      console.log('   Para executar a migração, use: node scripts/migrate-billing-data.js --execute');
      console.log('   Para produção: node scripts/migrate-billing-data.js --production --execute');
      return;
    }

    // 5. Executa a migração
    console.log('\n🔄 Executando migração...');

    // 5.1 Atualiza analise_pergunta para novo valor
    console.log('   Atualizando analise_pergunta para R$ 0,25...');
    const updateAnalise = await sql`
      UPDATE transacoes
      SET valor_cobrado = ${NOVOS_PRECOS.analise_pergunta.toFixed(2)}
      WHERE tipo = 'analise_pergunta'
      RETURNING id
    `;
    console.log(`   ✅ ${updateAnalise.length} transações de analise_pergunta atualizadas`);

    // 5.2 Zera valores de criação (entrevista e pergunta)
    console.log('   Zerando valores de criação...');
    const updateCriacao = await sql`
      UPDATE transacoes
      SET valor_cobrado = '0.00'
      WHERE tipo IN ('pergunta_criada', 'entrevista_criada', 'transcricao_audio', 'analise_ia')
      RETURNING id
    `;
    console.log(`   ✅ ${updateCriacao.length} transações de criação zeradas`);

    // 5.3 Cria transações de taxa_base_candidato para cada grupo
    console.log('   Criando transações de taxa_base_candidato...');
    let taxasBasesCriadas = 0;

    for (const grupo of candidatosPorEntrevista) {
      // Verifica se já existe uma taxa base para este grupo
      const existente = await sql`
        SELECT id FROM transacoes
        WHERE user_id = ${grupo.user_id}
          AND entrevista_id = ${grupo.entrevista_id}
          AND tipo = 'taxa_base_candidato'
        LIMIT 1
      `;

      if (existente.length === 0) {
        await sql`
          INSERT INTO transacoes (
            user_id,
            entrevista_id,
            tipo,
            custo_base,
            markup,
            valor_cobrado,
            descricao,
            status,
            processada_em
          ) VALUES (
            ${grupo.user_id},
            ${grupo.entrevista_id},
            'taxa_base_candidato',
            '0.10',
            '10.0',
            ${NOVOS_PRECOS.taxa_base_candidato.toFixed(2)},
            'Taxa base - migração do modelo antigo',
            'concluida',
            NOW()
          )
        `;
        taxasBasesCriadas++;
      }
    }
    console.log(`   ✅ ${taxasBasesCriadas} transações de taxa_base_candidato criadas`);

    // 5.4 Recalcula totais das faturas
    console.log('   Recalculando totais das faturas...');
    const updateFaturas = await sql`
      UPDATE faturas f
      SET
        valor_total = COALESCE((
          SELECT SUM(valor_cobrado::numeric)
          FROM transacoes t
          WHERE t.fatura_id = f.id
        ), 0),
        updated_at = NOW()
      RETURNING id, valor_total
    `;
    console.log(`   ✅ ${updateFaturas.length} faturas recalculadas`);

    // 6. Mostra resultado final
    console.log('\n✅ Migração concluída!');

    const statsFinais = await sql`
      SELECT
        tipo,
        COUNT(*) as quantidade,
        SUM(valor_cobrado::numeric) as valor_total
      FROM transacoes
      GROUP BY tipo
      ORDER BY tipo
    `;

    console.log('\n📊 Estatísticas finais:');
    let totalNovoGeral = 0;
    statsFinais.forEach(({ tipo, quantidade, valor_total }) => {
      const valorTotal = parseFloat(valor_total) || 0;
      totalNovoGeral += valorTotal;
      console.log(`   ${tipo}: ${quantidade} transações, Total: R$ ${valorTotal.toFixed(2)}`);
    });
    console.log(`   TOTAL GERAL (modelo novo): R$ ${totalNovoGeral.toFixed(2)}`);

  } catch (error) {
    console.error('\n❌ Erro na migração:', error.message);
    console.error(error);
    process.exit(1);
  }
}

migrateData();
