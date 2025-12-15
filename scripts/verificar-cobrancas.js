#!/usr/bin/env node

/**
 * Script para verificar a consistência das cobranças
 *
 * Modelo esperado:
 * - Taxa base por candidato: R$ 1,00 (1 por análise)
 * - Taxa por pergunta analisada: R$ 0,25 cada
 * - Fórmula: Custo = R$ 1,00 + (nº perguntas × R$ 0,25)
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

console.log(`\n📊 Verificação de Cobranças - ${environment}`);
console.log('='.repeat(60));

async function verificarCobrancas() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // 1. Estatísticas gerais de transações
    console.log('\n📈 Estatísticas Gerais:');
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

    stats.forEach(({ tipo, quantidade, valor_total, valor_medio }) => {
      console.log(`   ${tipo}:`);
      console.log(`      Quantidade: ${quantidade}`);
      console.log(`      Total: R$ ${parseFloat(valor_total || 0).toFixed(2)}`);
      console.log(`      Média: R$ ${parseFloat(valor_medio || 0).toFixed(2)}`);
    });

    // 2. Verificar se as taxas estão corretas
    console.log('\n🔍 Verificação de Valores:');

    // Taxas base devem ser R$ 1,00
    const taxasBaseIncorretas = await sql`
      SELECT id, valor_cobrado, descricao, created_at
      FROM transacoes
      WHERE tipo = 'taxa_base_candidato'
        AND valor_cobrado::numeric != 1.00
      LIMIT 10
    `;

    if (taxasBaseIncorretas.length === 0) {
      console.log('   ✅ Todas as taxas base estão corretas (R$ 1,00)');
    } else {
      console.log(`   ⚠️ ${taxasBaseIncorretas.length} taxa(s) base com valor incorreto:`);
      taxasBaseIncorretas.forEach(t => {
        console.log(`      - ${t.descricao}: R$ ${parseFloat(t.valor_cobrado).toFixed(2)}`);
      });
    }

    // Análises de pergunta devem ser R$ 0,25
    const analisesIncorretas = await sql`
      SELECT id, valor_cobrado, descricao, created_at
      FROM transacoes
      WHERE tipo = 'analise_pergunta'
        AND valor_cobrado::numeric != 0.25
      LIMIT 10
    `;

    if (analisesIncorretas.length === 0) {
      console.log('   ✅ Todas as análises de pergunta estão corretas (R$ 0,25)');
    } else {
      console.log(`   ⚠️ ${analisesIncorretas.length} análise(s) de pergunta com valor incorreto:`);
      analisesIncorretas.forEach(t => {
        console.log(`      - ${t.descricao}: R$ ${parseFloat(t.valor_cobrado).toFixed(2)}`);
      });
    }

    // 3. Verificar consistência entre candidatos avaliados e taxas base
    console.log('\n📋 Consistência Candidatos × Taxas Base:');

    const candidatosAvaliados = await sql`
      SELECT COUNT(DISTINCT ce.id) as total
      FROM candidato_entrevistas ce
      WHERE ce.avaliado_em IS NOT NULL
    `;

    const taxasBase = await sql`
      SELECT COUNT(*) as total
      FROM transacoes
      WHERE tipo = 'taxa_base_candidato'
    `;

    const totalCandidatos = candidatosAvaliados[0]?.total || 0;
    const totalTaxas = taxasBase[0]?.total || 0;

    console.log(`   Candidatos avaliados: ${totalCandidatos}`);
    console.log(`   Taxas base registradas: ${totalTaxas}`);

    if (totalCandidatos === totalTaxas) {
      console.log('   ✅ Consistência OK - 1 taxa por candidato');
    } else if (totalTaxas < totalCandidatos) {
      console.log(`   ⚠️ Faltam ${totalCandidatos - totalTaxas} taxa(s) base`);
    } else {
      console.log(`   ⚠️ Há ${totalTaxas - totalCandidatos} taxa(s) base a mais que candidatos`);
    }

    // 4. Verificar se cada análise tem a taxa base correspondente
    console.log('\n🔗 Verificando Agrupamento:');

    // Agrupa transações por entrevistaId e janela de 5 minutos
    const agrupamentos = await sql`
      WITH transacoes_agrupadas AS (
        SELECT
          entrevista_id,
          DATE_TRUNC('hour', created_at) +
            FLOOR(EXTRACT(minute FROM created_at) / 5) * INTERVAL '5 minutes' as janela,
          tipo,
          SUM(valor_cobrado::numeric) as valor_total,
          COUNT(*) as quantidade
        FROM transacoes
        WHERE tipo IN ('taxa_base_candidato', 'analise_pergunta')
        GROUP BY entrevista_id, janela, tipo
      ),
      agrupamento_completo AS (
        SELECT
          entrevista_id,
          janela,
          MAX(CASE WHEN tipo = 'taxa_base_candidato' THEN quantidade ELSE 0 END) as qtd_taxa_base,
          MAX(CASE WHEN tipo = 'analise_pergunta' THEN quantidade ELSE 0 END) as qtd_perguntas,
          SUM(valor_total) as valor_total
        FROM transacoes_agrupadas
        GROUP BY entrevista_id, janela
      )
      SELECT
        COUNT(*) as total_grupos,
        SUM(CASE WHEN qtd_taxa_base > 0 AND qtd_perguntas > 0 THEN 1 ELSE 0 END) as grupos_completos,
        SUM(CASE WHEN qtd_taxa_base = 0 AND qtd_perguntas > 0 THEN 1 ELSE 0 END) as grupos_sem_taxa,
        SUM(CASE WHEN qtd_taxa_base > 0 AND qtd_perguntas = 0 THEN 1 ELSE 0 END) as grupos_so_taxa
      FROM agrupamento_completo
    `;

    const ag = agrupamentos[0] || {};
    console.log(`   Total de grupos (análises): ${ag.total_grupos || 0}`);
    console.log(`   Grupos completos (taxa + perguntas): ${ag.grupos_completos || 0}`);
    console.log(`   Grupos sem taxa base: ${ag.grupos_sem_taxa || 0}`);
    console.log(`   Grupos só com taxa base: ${ag.grupos_so_taxa || 0}`);

    if ((ag.grupos_sem_taxa || 0) === 0) {
      console.log('   ✅ Todos os grupos têm taxa base');
    } else {
      console.log('   ⚠️ Existem grupos de análise sem taxa base!');
    }

    // 5. Calcular total esperado vs total real
    console.log('\n💰 Verificação de Totais:');

    const totais = await sql`
      SELECT
        SUM(CASE WHEN tipo = 'taxa_base_candidato' THEN valor_cobrado::numeric ELSE 0 END) as total_taxas,
        SUM(CASE WHEN tipo = 'analise_pergunta' THEN valor_cobrado::numeric ELSE 0 END) as total_perguntas,
        SUM(valor_cobrado::numeric) as total_geral
      FROM transacoes
      WHERE tipo IN ('taxa_base_candidato', 'analise_pergunta')
    `;

    const t = totais[0] || {};
    console.log(`   Total em taxas base: R$ ${parseFloat(t.total_taxas || 0).toFixed(2)}`);
    console.log(`   Total em análise de perguntas: R$ ${parseFloat(t.total_perguntas || 0).toFixed(2)}`);
    console.log(`   Total geral: R$ ${parseFloat(t.total_geral || 0).toFixed(2)}`);

    // Calcula o que seria esperado
    const numTaxas = parseFloat(t.total_taxas || 0) / 1.00;
    const numPerguntas = parseFloat(t.total_perguntas || 0) / 0.25;
    console.log(`\n   Implica:`);
    console.log(`   - ${numTaxas.toFixed(0)} candidatos avaliados`);
    console.log(`   - ${numPerguntas.toFixed(0)} perguntas analisadas`);
    console.log(`   - Média de ${(numPerguntas / (numTaxas || 1)).toFixed(1)} perguntas por candidato`);

    console.log('\n✅ Verificação concluída!');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    console.error(error);
    process.exit(1);
  }
}

verificarCobrancas();
