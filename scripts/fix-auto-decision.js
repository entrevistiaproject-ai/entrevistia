/**
 * Script para corrigir candidatos que deveriam ter sido aprovados/reprovados automaticamente
 * Executa: node scripts/fix-auto-decision.js
 */

const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();

  try {
    console.log('\n=== Corrigindo decisões automáticas pendentes ===\n');

    // Buscar candidatos que deveriam ser APROVADOS automaticamente
    const aprovacoesPendentes = await client.query(`
      SELECT
        ce.id,
        ce.nota_geral,
        ce.compatibilidade_vaga,
        c.nome as candidato_nome,
        c.email as candidato_email,
        e.cargo,
        e.auto_approval_min_score,
        e.auto_approval_use_compatibility,
        e.auto_approval_min_compatibility
      FROM candidato_entrevistas ce
      JOIN candidatos c ON c.id = ce.candidato_id
      JOIN entrevistas e ON e.id = ce.entrevista_id
      WHERE ce.nota_geral IS NOT NULL
        AND ce.decisao_recrutador IS NULL
        AND e.deleted_at IS NULL
        AND e.auto_approval_enabled = true
        AND ce.nota_geral >= e.auto_approval_min_score
    `);

    console.log(`Encontrados ${aprovacoesPendentes.rows.length} candidato(s) para aprovação automática.\n`);

    for (const candidato of aprovacoesPendentes.rows) {
      // Verificar compatibilidade se necessário
      let shouldApprove = true;
      if (candidato.auto_approval_use_compatibility) {
        const compat = candidato.compatibilidade_vaga || 0;
        if (compat < candidato.auto_approval_min_compatibility) {
          console.log(`⏭️  ${candidato.candidato_nome} - Compatibilidade (${compat.toFixed(1)}%) abaixo do mínimo (${candidato.auto_approval_min_compatibility}%)`);
          shouldApprove = false;
        }
      }

      if (shouldApprove) {
        console.log(`✅ Aprovando: ${candidato.candidato_nome}`);
        console.log(`   Vaga: ${candidato.cargo}`);
        console.log(`   Nota: ${candidato.nota_geral.toFixed(1)}% (mínimo: ${candidato.auto_approval_min_score}%)`);

        await client.query(`
          UPDATE candidato_entrevistas
          SET
            decisao_recrutador = 'aprovado',
            decisao_recrutador_em = NOW(),
            decisao_recrutador_observacao = $1,
            updated_at = NOW()
          WHERE id = $2
        `, [
          `Aprovado automaticamente (Score: ${candidato.nota_geral.toFixed(1)}%, Compatibilidade: ${(candidato.compatibilidade_vaga || 0).toFixed(1)}%) - Correção retroativa`,
          candidato.id
        ]);

        console.log(`   ✓ Aprovado com sucesso!\n`);
      }
    }

    // Buscar candidatos que deveriam ser REPROVADOS automaticamente
    const reprovacoesPendentes = await client.query(`
      SELECT
        ce.id,
        ce.nota_geral,
        c.nome as candidato_nome,
        c.email as candidato_email,
        e.cargo,
        e.auto_reject_max_score
      FROM candidato_entrevistas ce
      JOIN candidatos c ON c.id = ce.candidato_id
      JOIN entrevistas e ON e.id = ce.entrevista_id
      WHERE ce.nota_geral IS NOT NULL
        AND ce.decisao_recrutador IS NULL
        AND e.deleted_at IS NULL
        AND e.auto_reject_enabled = true
        AND ce.nota_geral <= e.auto_reject_max_score
    `);

    console.log(`\nEncontrados ${reprovacoesPendentes.rows.length} candidato(s) para reprovação automática.\n`);

    for (const candidato of reprovacoesPendentes.rows) {
      console.log(`❌ Reprovando: ${candidato.candidato_nome}`);
      console.log(`   Vaga: ${candidato.cargo}`);
      console.log(`   Nota: ${candidato.nota_geral.toFixed(1)}% (máximo: ${candidato.auto_reject_max_score}%)`);

      await client.query(`
        UPDATE candidato_entrevistas
        SET
          decisao_recrutador = 'reprovado',
          decisao_recrutador_em = NOW(),
          decisao_recrutador_observacao = $1,
          updated_at = NOW()
        WHERE id = $2
      `, [
        `Reprovado automaticamente (Score: ${candidato.nota_geral.toFixed(1)}%) - Correção retroativa`,
        candidato.id
      ]);

      console.log(`   ✓ Reprovado com sucesso!\n`);
    }

    // Resumo
    const totalProcessados = aprovacoesPendentes.rows.length + reprovacoesPendentes.rows.length;
    console.log('\n=== RESUMO ===');
    console.log(`Total processado: ${totalProcessados} candidato(s)`);
    console.log(`Aprovações: ${aprovacoesPendentes.rows.length}`);
    console.log(`Reprovações: ${reprovacoesPendentes.rows.length}`);

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
