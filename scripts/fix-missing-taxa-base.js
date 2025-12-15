#!/usr/bin/env node

/**
 * Script para corrigir análises que estão sem taxa base
 *
 * Identifica grupos de analise_pergunta que não têm taxa_base_candidato
 * e cria as taxas base faltantes.
 */

const dotenv = require('dotenv');
const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
const dryRun = !process.argv.includes('--execute');
const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';

console.log(`\n🔧 Correção de Taxas Base Faltantes - ${environment}`);
console.log(`   Modo: ${dryRun ? '🔍 DRY RUN (simulação)' : '⚡ EXECUÇÃO REAL'}`);
console.log('='.repeat(60));

(async () => {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(DATABASE_URL);

  // 1. Identificar grupos de análise sem taxa base
  console.log('\n🔍 Buscando análises sem taxa base...');

  const gruposSemTaxa = await sql`
    WITH grupos AS (
      SELECT
        entrevista_id,
        DATE_TRUNC('minute', created_at) as minuto,
        SUM(CASE WHEN tipo = 'taxa_base_candidato' THEN valor_cobrado::numeric ELSE 0 END) as taxa_base,
        COUNT(CASE WHEN tipo = 'analise_pergunta' THEN 1 END) as qtd_perguntas,
        MIN(created_at) as primeira_transacao,
        (array_agg(user_id))[1] as user_id,
        (array_agg(fatura_id))[1] as fatura_id
      FROM transacoes
      WHERE tipo IN ('taxa_base_candidato', 'analise_pergunta')
      GROUP BY entrevista_id, DATE_TRUNC('minute', created_at)
    )
    SELECT
      g.*,
      e.titulo as entrevista,
      e.user_id as entrevista_user_id
    FROM grupos g
    LEFT JOIN entrevistas e ON g.entrevista_id = e.id
    WHERE g.taxa_base = 0 AND g.qtd_perguntas > 0
    ORDER BY g.minuto DESC
  `;

  if (gruposSemTaxa.length === 0) {
    console.log('   ✅ Todas as análises já têm taxa base!');
    return;
  }

  console.log(`   Encontrados ${gruposSemTaxa.length} grupo(s) sem taxa base:`);

  gruposSemTaxa.forEach((g, i) => {
    const data = new Date(g.minuto).toLocaleString('pt-BR');
    console.log(`\n   ${i+1}. ${g.entrevista || 'Sem título'}`);
    console.log(`      Data: ${data}`);
    console.log(`      Perguntas: ${g.qtd_perguntas} (R$ ${(g.qtd_perguntas * 0.25).toFixed(2)})`);
    console.log(`      Taxa base faltante: R$ 1,00`);
    console.log(`      Total correto deveria ser: R$ ${(1.00 + g.qtd_perguntas * 0.25).toFixed(2)}`);
  });

  // Calcular impacto
  const impacto = gruposSemTaxa.length * 1.00;
  console.log(`\n💰 Impacto: ${gruposSemTaxa.length} taxa(s) base × R$ 1,00 = R$ ${impacto.toFixed(2)}`);

  if (dryRun) {
    console.log('\n⚠️  DRY RUN - Nenhuma alteração foi feita.');
    console.log('   Para executar a correção: node scripts/fix-missing-taxa-base.js --production --execute');
    return;
  }

  // 2. Criar as taxas base faltantes
  console.log('\n🔄 Criando taxas base faltantes...');
  let criadas = 0;
  let erros = 0;

  for (const grupo of gruposSemTaxa) {
    try {
      const userId = grupo.user_id || grupo.entrevista_user_id;

      if (!userId) {
        console.log(`   ⚠️ Não foi possível determinar userId para grupo ${grupo.entrevista}`);
        erros++;
        continue;
      }

      // Buscar ou criar fatura do mês
      const dataRef = new Date(grupo.primeira_transacao);
      const mesRef = dataRef.getMonth() + 1;
      const anoRef = dataRef.getFullYear();

      let [fatura] = await sql`
        SELECT id FROM faturas
        WHERE user_id = ${userId}
          AND mes_referencia = ${mesRef}
          AND ano_referencia = ${anoRef}
        LIMIT 1
      `;

      if (!fatura) {
        [fatura] = await sql`
          INSERT INTO faturas (user_id, mes_referencia, ano_referencia)
          VALUES (${userId}, ${mesRef}, ${anoRef})
          RETURNING id
        `;
      }

      // Criar taxa base
      await sql`
        INSERT INTO transacoes (
          user_id,
          fatura_id,
          entrevista_id,
          tipo,
          custo_base,
          markup,
          valor_cobrado,
          descricao,
          status,
          created_at,
          processada_em
        ) VALUES (
          ${userId},
          ${fatura.id},
          ${grupo.entrevista_id},
          'taxa_base_candidato',
          '0.10',
          '10.0',
          '1.00',
          ${'Taxa base - correção automática (' + (grupo.entrevista || 'análise') + ')'},
          'concluida',
          ${grupo.primeira_transacao},
          ${new Date()}
        )
      `;

      criadas++;
      console.log(`   ✅ Taxa base criada para: ${grupo.entrevista || 'análise'}`);
    } catch (err) {
      console.log(`   ❌ Erro ao criar taxa para ${grupo.entrevista}: ${err.message}`);
      erros++;
    }
  }

  // 3. Atualizar totais das faturas
  console.log('\n📊 Atualizando totais das faturas...');

  await sql`
    UPDATE faturas f
    SET
      valor_total = COALESCE((
        SELECT SUM(valor_cobrado::numeric)
        FROM transacoes t
        WHERE t.fatura_id = f.id
      ), 0),
      updated_at = NOW()
    WHERE EXISTS (
      SELECT 1 FROM transacoes t
      WHERE t.fatura_id = f.id
    )
  `;

  console.log('\n✅ Correção concluída!');
  console.log(`   Taxas criadas: ${criadas}`);
  console.log(`   Erros: ${erros}`);
})();
