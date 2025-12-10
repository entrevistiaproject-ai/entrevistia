#!/usr/bin/env node

/**
 * Script de Migração - Unificar Candidatos Duplicados
 *
 * Este script:
 * 1. Identifica candidatos duplicados (mesmo email + mesmo userId)
 * 2. Mantém o registro mais antigo (ou o que tem mais dados)
 * 3. Move todas as candidato_entrevistas para o registro mantido
 * 4. Atualiza dados do candidato mantido com informações mais recentes
 * 5. Remove os registros duplicados
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

console.log(`\n🔄 Migração - Unificar Candidatos Duplicados - ${environment}`);
console.log(`   Modo: ${dryRun ? '🔍 DRY RUN (simulação)' : '⚡ EXECUÇÃO REAL'}`);
console.log('='.repeat(60));

async function mergeDuplicates() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // 1. Identificar candidatos duplicados (mesmo email + userId)
    console.log('\n🔍 Buscando candidatos duplicados...');
    const duplicados = await sql`
      SELECT
        user_id,
        LOWER(email) as email,
        COUNT(*) as quantidade,
        array_agg(id ORDER BY created_at ASC) as ids,
        array_agg(nome ORDER BY created_at DESC) as nomes,
        array_agg(telefone ORDER BY updated_at DESC) as telefones,
        array_agg(linkedin ORDER BY updated_at DESC) as linkedins,
        MIN(created_at) as primeiro_cadastro,
        MAX(updated_at) as ultima_atualizacao
      FROM candidatos
      WHERE deleted_at IS NULL
      GROUP BY user_id, LOWER(email)
      HAVING COUNT(*) > 1
      ORDER BY quantidade DESC
    `;

    if (duplicados.length === 0) {
      console.log('✅ Nenhum candidato duplicado encontrado!');
      return;
    }

    console.log(`\n📊 Encontrados ${duplicados.length} grupos de candidatos duplicados:`);

    let totalDuplicados = 0;
    let totalEntrevistasMovidas = 0;
    let totalCandidatosRemovidos = 0;

    for (const grupo of duplicados) {
      const { user_id, email, quantidade, ids, nomes, telefones, linkedins } = grupo;
      totalDuplicados += quantidade - 1; // -1 porque um será mantido

      console.log(`\n   📧 ${email} (${quantidade} registros)`);
      console.log(`      IDs: ${ids.join(', ')}`);
      console.log(`      Nomes: ${nomes.filter(Boolean).join(' → ')}`);
      console.log(`      Telefones: ${telefones.filter(Boolean).join(' → ')}`);

      // O primeiro ID (mais antigo) será mantido
      const idManter = ids[0];
      const idsRemover = ids.slice(1);

      // Encontrar dados mais recentes para atualizar
      const nomeMaisRecente = nomes.find(Boolean) || nomes[0];
      const telefoneMaisRecente = telefones.find(Boolean);
      const linkedinMaisRecente = linkedins.find(Boolean);

      console.log(`      ➡️ Manter: ${idManter}`);
      console.log(`      ❌ Remover: ${idsRemover.join(', ')}`);

      if (!dryRun) {
        // 2. Verificar e mover candidato_entrevistas
        for (const idRemover of idsRemover) {
          // Buscar entrevistas do candidato a ser removido
          const entrevistas = await sql`
            SELECT id, entrevista_id FROM candidato_entrevistas
            WHERE candidato_id = ${idRemover}
          `;

          for (const entrevista of entrevistas) {
            // Verificar se já existe vínculo no candidato mantido
            const vinculoExistente = await sql`
              SELECT id FROM candidato_entrevistas
              WHERE candidato_id = ${idManter}
                AND entrevista_id = ${entrevista.entrevista_id}
              LIMIT 1
            `;

            if (vinculoExistente.length === 0) {
              // Mover vínculo para o candidato mantido
              await sql`
                UPDATE candidato_entrevistas
                SET candidato_id = ${idManter}, updated_at = NOW()
                WHERE id = ${entrevista.id}
              `;
              totalEntrevistasMovidas++;
              console.log(`      📋 Entrevista ${entrevista.entrevista_id} movida`);
            } else {
              // Remover vínculo duplicado
              await sql`
                DELETE FROM candidato_entrevistas WHERE id = ${entrevista.id}
              `;
              console.log(`      🗑️ Vínculo duplicado removido (entrevista ${entrevista.entrevista_id})`);
            }
          }

          // Mover respostas de entrevista se existirem
          await sql`
            UPDATE respostas
            SET candidato_id = ${idManter}, updated_at = NOW()
            WHERE candidato_id = ${idRemover}
          `;
        }

        // 3. Atualizar candidato mantido com dados mais recentes
        await sql`
          UPDATE candidatos
          SET
            nome = ${nomeMaisRecente},
            telefone = COALESCE(${telefoneMaisRecente}, telefone),
            linkedin = COALESCE(${linkedinMaisRecente}, linkedin),
            updated_at = NOW()
          WHERE id = ${idManter}
        `;

        // 4. Soft delete dos candidatos duplicados
        for (const idRemover of idsRemover) {
          await sql`
            UPDATE candidatos
            SET deleted_at = NOW(), updated_at = NOW()
            WHERE id = ${idRemover}
          `;
          totalCandidatosRemovidos++;
        }

        console.log(`      ✅ Unificado com sucesso!`);
      } else {
        // Dry run - apenas mostrar o que seria feito
        for (const idRemover of idsRemover) {
          const entrevistas = await sql`
            SELECT COUNT(*) as total FROM candidato_entrevistas
            WHERE candidato_id = ${idRemover}
          `;
          console.log(`      📋 ${entrevistas[0].total} entrevistas seriam movidas de ${idRemover}`);
        }
      }
    }

    // Resumo final
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO:');
    console.log(`   Grupos de duplicados: ${duplicados.length}`);
    console.log(`   Candidatos duplicados: ${totalDuplicados}`);

    if (dryRun) {
      console.log('\n⚠️  DRY RUN - Nenhuma alteração foi feita.');
      console.log('   Para executar a migração, use: node scripts/merge-duplicate-candidatos.js --execute');
      console.log('   Para produção: node scripts/merge-duplicate-candidatos.js --production --execute');
    } else {
      console.log(`   Entrevistas movidas: ${totalEntrevistasMovidas}`);
      console.log(`   Candidatos removidos (soft delete): ${totalCandidatosRemovidos}`);
      console.log('\n✅ Migração concluída com sucesso!');

      // Verificar resultado final
      const verificacao = await sql`
        SELECT
          user_id,
          LOWER(email) as email,
          COUNT(*) as quantidade
        FROM candidatos
        WHERE deleted_at IS NULL
        GROUP BY user_id, LOWER(email)
        HAVING COUNT(*) > 1
      `;

      if (verificacao.length === 0) {
        console.log('✅ Verificação: Nenhum candidato duplicado restante!');
      } else {
        console.log(`⚠️ Verificação: Ainda existem ${verificacao.length} grupos com duplicados`);
      }
    }

  } catch (error) {
    console.error('\n❌ Erro na migração:', error.message);
    console.error(error);
    process.exit(1);
  }
}

mergeDuplicates();
