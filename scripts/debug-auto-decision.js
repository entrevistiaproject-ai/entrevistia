/**
 * Script para debugar a funcionalidade de aprovação/reprovação automática
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
    console.log('\n=== DEBUG: Aprovação/Reprovação Automática ===\n');

    // 1. Verificar vagas com aprovação/reprovação automática habilitada
    console.log('1. Vagas com configurações de decisão automática:\n');
    const vagasConfig = await client.query(`
      SELECT
        id,
        cargo,
        auto_approval_enabled,
        auto_approval_min_score,
        auto_approval_use_compatibility,
        auto_approval_min_compatibility,
        auto_reject_enabled,
        auto_reject_max_score
      FROM entrevistas
      WHERE deleted_at IS NULL
        AND (auto_approval_enabled = true OR auto_reject_enabled = true)
      ORDER BY created_at DESC
      LIMIT 10
    `);

    if (vagasConfig.rows.length === 0) {
      console.log('❌ NENHUMA VAGA com aprovação ou reprovação automática habilitada!');
      console.log('   → Este pode ser o problema: as configurações não estão ativadas nas vagas.\n');
    } else {
      console.log(`✅ ${vagasConfig.rows.length} vaga(s) com configurações automáticas:\n`);
      vagasConfig.rows.forEach(v => {
        console.log(`   Vaga: ${v.cargo || 'Sem nome'} (${v.id.slice(0, 8)}...)`);
        console.log(`   - Aprovação: ${v.auto_approval_enabled ? `SIM (nota >= ${v.auto_approval_min_score})` : 'NÃO'}`);
        if (v.auto_approval_enabled && v.auto_approval_use_compatibility) {
          console.log(`   - Compatibilidade: SIM (>= ${v.auto_approval_min_compatibility})`);
        }
        console.log(`   - Reprovação: ${v.auto_reject_enabled ? `SIM (nota <= ${v.auto_reject_max_score})` : 'NÃO'}`);
        console.log('');
      });
    }

    // 2. Candidatos avaliados que deveriam ter sido aprovados/reprovados
    console.log('\n2. Candidatos avaliados sem decisão (potenciais candidatos para decisão automática):\n');
    const candidatosPendentes = await client.query(`
      SELECT
        ce.id,
        ce.nota_geral,
        ce.compatibilidade_vaga,
        ce.decisao_recrutador,
        ce.avaliado_em,
        c.nome as candidato_nome,
        e.cargo,
        e.auto_approval_enabled,
        e.auto_approval_min_score,
        e.auto_reject_enabled,
        e.auto_reject_max_score
      FROM candidato_entrevistas ce
      JOIN candidatos c ON c.id = ce.candidato_id
      JOIN entrevistas e ON e.id = ce.entrevista_id
      WHERE ce.nota_geral IS NOT NULL
        AND ce.decisao_recrutador IS NULL
        AND e.deleted_at IS NULL
      ORDER BY ce.avaliado_em DESC
      LIMIT 20
    `);

    if (candidatosPendentes.rows.length === 0) {
      console.log('   Nenhum candidato avaliado sem decisão encontrado.\n');
    } else {
      console.log(`   ${candidatosPendentes.rows.length} candidato(s) avaliados sem decisão:\n`);
      candidatosPendentes.rows.forEach(cp => {
        const shouldApprove = cp.auto_approval_enabled && cp.nota_geral >= cp.auto_approval_min_score;
        const shouldReject = cp.auto_reject_enabled && cp.nota_geral <= cp.auto_reject_max_score;

        console.log(`   - ${cp.candidato_nome} (Vaga: ${cp.cargo || 'Sem nome'})`);
        console.log(`     Nota: ${cp.nota_geral?.toFixed(1) || 'N/A'}% | Compatibilidade: ${cp.compatibilidade_vaga?.toFixed(1) || 'N/A'}%`);
        console.log(`     Config Vaga: Aprovação=${cp.auto_approval_enabled ? `>=${cp.auto_approval_min_score}` : 'OFF'}, Reprovação=${cp.auto_reject_enabled ? `<=${cp.auto_reject_max_score}` : 'OFF'}`);

        if (shouldApprove) {
          console.log(`     ⚠️  DEVERIA TER SIDO APROVADO! (nota ${cp.nota_geral?.toFixed(1)} >= ${cp.auto_approval_min_score})`);
        } else if (shouldReject) {
          console.log(`     ⚠️  DEVERIA TER SIDO REPROVADO! (nota ${cp.nota_geral?.toFixed(1)} <= ${cp.auto_reject_max_score})`);
        } else if (!cp.auto_approval_enabled && !cp.auto_reject_enabled) {
          console.log(`     ℹ️  Vaga sem decisão automática configurada`);
        } else {
          console.log(`     ℹ️  Fora da faixa de decisão automática`);
        }
        console.log('');
      });
    }

    // 3. Verificar candidatos já aprovados/reprovados automaticamente
    console.log('\n3. Candidatos com decisão automática (verificando se o sistema funcionou):\n');
    const decisoesAutomaticas = await client.query(`
      SELECT
        ce.id,
        ce.nota_geral,
        ce.decisao_recrutador,
        ce.decisao_recrutador_observacao,
        ce.decisao_recrutador_em,
        c.nome as candidato_nome,
        e.cargo
      FROM candidato_entrevistas ce
      JOIN candidatos c ON c.id = ce.candidato_id
      JOIN entrevistas e ON e.id = ce.entrevista_id
      WHERE ce.decisao_recrutador_observacao LIKE '%automaticamente%'
        AND e.deleted_at IS NULL
      ORDER BY ce.decisao_recrutador_em DESC
      LIMIT 10
    `);

    if (decisoesAutomaticas.rows.length === 0) {
      console.log('   ❌ Nenhuma decisão automática encontrada no histórico.\n');
    } else {
      console.log(`   ✅ ${decisoesAutomaticas.rows.length} decisão(ões) automática(s) encontrada(s):\n`);
      decisoesAutomaticas.rows.forEach(da => {
        console.log(`   - ${da.candidato_nome} (Vaga: ${da.cargo || 'Sem nome'})`);
        console.log(`     Decisão: ${da.decisao_recrutador} | Nota: ${da.nota_geral?.toFixed(1)}%`);
        console.log(`     Observação: ${da.decisao_recrutador_observacao}`);
        console.log(`     Data: ${da.decisao_recrutador_em}`);
        console.log('');
      });
    }

    // 4. Verificar se há problemas de tipo de dados
    console.log('\n4. Verificando tipos de dados (possíveis problemas de comparação):\n');
    const tiposDados = await client.query(`
      SELECT
        ce.nota_geral,
        pg_typeof(ce.nota_geral) as tipo_nota,
        e.auto_approval_min_score,
        pg_typeof(e.auto_approval_min_score) as tipo_approval_score
      FROM candidato_entrevistas ce
      JOIN entrevistas e ON e.id = ce.entrevista_id
      WHERE ce.nota_geral IS NOT NULL
      LIMIT 1
    `);

    if (tiposDados.rows.length > 0) {
      const t = tiposDados.rows[0];
      console.log(`   nota_geral: ${t.tipo_nota} (exemplo: ${t.nota_geral})`);
      console.log(`   auto_approval_min_score: ${t.tipo_approval_score} (exemplo: ${t.auto_approval_min_score})`);
      console.log('');
    }

    // 5. Resumo final
    console.log('\n=== RESUMO ===\n');

    const totalVagas = await client.query(`SELECT COUNT(*) FROM entrevistas WHERE deleted_at IS NULL`);
    const vagasAprovacao = await client.query(`SELECT COUNT(*) FROM entrevistas WHERE deleted_at IS NULL AND auto_approval_enabled = true`);
    const vagasReprovacao = await client.query(`SELECT COUNT(*) FROM entrevistas WHERE deleted_at IS NULL AND auto_reject_enabled = true`);
    const candidatosAvaliados = await client.query(`SELECT COUNT(*) FROM candidato_entrevistas WHERE nota_geral IS NOT NULL`);
    const decisoesAuto = await client.query(`SELECT COUNT(*) FROM candidato_entrevistas WHERE decisao_recrutador_observacao LIKE '%automaticamente%'`);

    console.log(`Total de vagas: ${totalVagas.rows[0].count}`);
    console.log(`Vagas com aprovação automática: ${vagasAprovacao.rows[0].count}`);
    console.log(`Vagas com reprovação automática: ${vagasReprovacao.rows[0].count}`);
    console.log(`Candidatos avaliados: ${candidatosAvaliados.rows[0].count}`);
    console.log(`Decisões automáticas realizadas: ${decisoesAuto.rows[0].count}`);

    // Calcular candidatos que deveriam ter sido processados
    const problematicos = await client.query(`
      SELECT COUNT(*)
      FROM candidato_entrevistas ce
      JOIN entrevistas e ON e.id = ce.entrevista_id
      WHERE ce.nota_geral IS NOT NULL
        AND ce.decisao_recrutador IS NULL
        AND e.deleted_at IS NULL
        AND (
          (e.auto_approval_enabled = true AND ce.nota_geral >= e.auto_approval_min_score)
          OR (e.auto_reject_enabled = true AND ce.nota_geral <= e.auto_reject_max_score)
        )
    `);

    if (parseInt(problematicos.rows[0].count) > 0) {
      console.log(`\n⚠️  PROBLEMA DETECTADO: ${problematicos.rows[0].count} candidato(s) deveria(m) ter sido aprovado(s)/reprovado(s) automaticamente mas não foram!`);
    } else if (parseInt(vagasAprovacao.rows[0].count) === 0 && parseInt(vagasReprovacao.rows[0].count) === 0) {
      console.log(`\nℹ️  Nenhuma vaga tem aprovação/reprovação automática habilitada.`);
    } else {
      console.log(`\n✅ Não há candidatos pendentes que deveriam ter sido processados automaticamente.`);
    }

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
