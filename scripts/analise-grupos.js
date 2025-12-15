#!/usr/bin/env node

const dotenv = require('dotenv');
const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

(async () => {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL);

  // Buscar análises agrupadas
  const analises = await sql`
    WITH grupos AS (
      SELECT
        entrevista_id,
        DATE_TRUNC('minute', created_at) as minuto,
        SUM(CASE WHEN tipo = 'taxa_base_candidato' THEN valor_cobrado::numeric ELSE 0 END) as taxa_base,
        SUM(CASE WHEN tipo = 'analise_pergunta' THEN valor_cobrado::numeric ELSE 0 END) as valor_perguntas,
        COUNT(CASE WHEN tipo = 'analise_pergunta' THEN 1 END) as qtd_perguntas
      FROM transacoes
      WHERE tipo IN ('taxa_base_candidato', 'analise_pergunta')
      GROUP BY entrevista_id, DATE_TRUNC('minute', created_at)
    )
    SELECT
      g.*,
      e.titulo as entrevista,
      g.taxa_base + g.valor_perguntas as total,
      CASE
        WHEN g.taxa_base = 0 AND g.qtd_perguntas > 0 THEN 'SEM_TAXA_BASE'
        WHEN g.taxa_base > 0 AND g.qtd_perguntas = 0 THEN 'SO_TAXA_BASE'
        ELSE 'OK'
      END as status
    FROM grupos g
    LEFT JOIN entrevistas e ON g.entrevista_id = e.id
    ORDER BY g.minuto DESC
  `;

  console.log('\n📋 Análise de Grupos de Transações:\n');
  analises.forEach((a, i) => {
    const data = new Date(a.minuto).toLocaleString('pt-BR');
    const statusEmoji = a.status === 'OK' ? '✅' : a.status === 'SEM_TAXA_BASE' ? '❌' : '⚠️';
    console.log(`${i+1}. ${statusEmoji} ${a.entrevista || 'N/A'}`);
    console.log(`   Data: ${data}`);
    console.log(`   Taxa base: R$ ${parseFloat(a.taxa_base).toFixed(2)}`);
    console.log(`   Perguntas: ${a.qtd_perguntas} (R$ ${parseFloat(a.valor_perguntas).toFixed(2)})`);
    console.log(`   Total: R$ ${parseFloat(a.total).toFixed(2)}`);
    console.log(`   Status: ${a.status}`);
    console.log('');
  });

  // Resumo
  const semTaxa = analises.filter(a => a.status === 'SEM_TAXA_BASE').length;
  const soTaxa = analises.filter(a => a.status === 'SO_TAXA_BASE').length;
  const ok = analises.filter(a => a.status === 'OK').length;

  console.log('📊 Resumo:');
  console.log(`   ✅ Grupos OK: ${ok}`);
  console.log(`   ❌ Grupos sem taxa base: ${semTaxa}`);
  console.log(`   ⚠️ Grupos só com taxa base: ${soTaxa}`);
})();
