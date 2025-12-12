/**
 * Script para testar a função processAutoDecision
 * Executa: npx tsx scripts/test-auto-decision.mjs
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

/**
 * Simula a função processAutoDecision para verificar o fluxo
 */
async function testProcessAutoDecision(candidatoEntrevistaId) {
  const client = await pool.connect();

  try {
    console.log(`\n=== Testando processAutoDecision para ${candidatoEntrevistaId} ===\n`);

    // Passo 1: Buscar candidatura
    console.log('1. Buscando candidatura...');
    const candidaturaResult = await client.query(`
      SELECT * FROM candidato_entrevistas WHERE id = $1
    `, [candidatoEntrevistaId]);

    const candidatura = candidaturaResult.rows[0];

    if (!candidatura) {
      console.log('❌ Candidatura não encontrada!');
      return;
    }

    console.log(`   ✅ Candidatura encontrada`);
    console.log(`   - nota_geral: ${candidatura.nota_geral}`);
    console.log(`   - compatibilidade_vaga: ${candidatura.compatibilidade_vaga}`);
    console.log(`   - decisao_recrutador: ${candidatura.decisao_recrutador}`);

    // Passo 2: Verificar se já tem decisão
    if (!candidatura.nota_geral) {
      console.log('\n❌ RETORNO ANTECIPADO: Candidatura sem avaliação (notaGeral é null)');
      return;
    }

    if (candidatura.decisao_recrutador) {
      console.log('\n❌ RETORNO ANTECIPADO: Já existe decisão manual');
      return;
    }

    // Passo 3: Buscar entrevista
    console.log('\n2. Buscando entrevista (vaga)...');
    const entrevistaResult = await client.query(`
      SELECT * FROM entrevistas WHERE id = $1
    `, [candidatura.entrevista_id]);

    const entrevista = entrevistaResult.rows[0];

    if (!entrevista) {
      console.log('❌ Entrevista não encontrada!');
      return;
    }

    console.log(`   ✅ Entrevista encontrada: ${entrevista.cargo}`);
    console.log(`   - auto_approval_enabled: ${entrevista.auto_approval_enabled}`);
    console.log(`   - auto_approval_min_score: ${entrevista.auto_approval_min_score}`);
    console.log(`   - auto_approval_use_compatibility: ${entrevista.auto_approval_use_compatibility}`);
    console.log(`   - auto_approval_min_compatibility: ${entrevista.auto_approval_min_compatibility}`);
    console.log(`   - auto_reject_enabled: ${entrevista.auto_reject_enabled}`);
    console.log(`   - auto_reject_max_score: ${entrevista.auto_reject_max_score}`);

    const score = candidatura.nota_geral;
    const compatibility = candidatura.compatibilidade_vaga || 0;

    console.log(`\n3. Valores para comparação:`);
    console.log(`   - score: ${score} (tipo: ${typeof score})`);
    console.log(`   - compatibility: ${compatibility} (tipo: ${typeof compatibility})`);
    console.log(`   - auto_approval_min_score: ${entrevista.auto_approval_min_score} (tipo: ${typeof entrevista.auto_approval_min_score})`);

    // Passo 4: Testar lógica de aprovação
    console.log('\n4. Testando lógica de APROVAÇÃO automática:');
    if (entrevista.auto_approval_enabled) {
      console.log(`   ✅ Aprovação automática está HABILITADA`);

      let shouldApprove = score >= entrevista.auto_approval_min_score;
      console.log(`   - score >= auto_approval_min_score: ${score} >= ${entrevista.auto_approval_min_score} = ${shouldApprove}`);

      if (shouldApprove && entrevista.auto_approval_use_compatibility) {
        shouldApprove = compatibility >= entrevista.auto_approval_min_compatibility;
        console.log(`   - compatibility >= auto_approval_min_compatibility: ${compatibility} >= ${entrevista.auto_approval_min_compatibility} = ${shouldApprove}`);
      }

      if (shouldApprove) {
        console.log('\n   🎉 CANDIDATO DEVERIA SER APROVADO AUTOMATICAMENTE!');
      } else {
        console.log('\n   ℹ️  Candidato não atende critérios de aprovação automática');
      }
    } else {
      console.log(`   ❌ Aprovação automática está DESABILITADA`);
    }

    // Passo 5: Testar lógica de reprovação
    console.log('\n5. Testando lógica de REPROVAÇÃO automática:');
    if (entrevista.auto_reject_enabled) {
      console.log(`   ✅ Reprovação automática está HABILITADA`);

      const shouldReject = score <= entrevista.auto_reject_max_score;
      console.log(`   - score <= auto_reject_max_score: ${score} <= ${entrevista.auto_reject_max_score} = ${shouldReject}`);

      if (shouldReject) {
        console.log('\n   ⚠️  CANDIDATO DEVERIA SER REPROVADO AUTOMATICAMENTE!');
      } else {
        console.log('\n   ℹ️  Candidato não atende critérios de reprovação automática');
      }
    } else {
      console.log(`   ❌ Reprovação automática está DESABILITADA`);
    }

    // Passo 6: Verificar o que a função real faria
    console.log('\n6. Conclusão:');

    // Verificar se o problema é que as flags estão falsas
    if (!entrevista.auto_approval_enabled && !entrevista.auto_reject_enabled) {
      console.log('   ⚠️  NENHUMA DECISÃO AUTOMÁTICA CONFIGURADA PARA ESTA VAGA');
      console.log('   → A função processAutoDecision não fará nada porque ambas as flags estão desabilitadas.');
    }

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    client.release();
  }
}

async function main() {
  const client = await pool.connect();

  try {
    // Buscar candidatos que deveriam ter sido processados
    const pendentes = await client.query(`
      SELECT ce.id
      FROM candidato_entrevistas ce
      JOIN entrevistas e ON e.id = ce.entrevista_id
      WHERE ce.nota_geral IS NOT NULL
        AND ce.decisao_recrutador IS NULL
        AND e.deleted_at IS NULL
        AND (
          (e.auto_approval_enabled = true AND ce.nota_geral >= e.auto_approval_min_score)
          OR (e.auto_reject_enabled = true AND ce.nota_geral <= e.auto_reject_max_score)
        )
      LIMIT 5
    `);

    client.release();

    if (pendentes.rows.length === 0) {
      console.log('Nenhum candidato pendente encontrado.');
      await pool.end();
      return;
    }

    console.log(`Encontrados ${pendentes.rows.length} candidato(s) para testar.\n`);

    for (const row of pendentes.rows) {
      await testProcessAutoDecision(row.id);
    }

  } catch (error) {
    console.error('Erro:', error);
    client.release();
  }

  await pool.end();
}

main();
