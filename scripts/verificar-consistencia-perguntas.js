/**
 * Script para verificar consistência da tabela perguntas_templates
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

async function verificarConsistencia() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('\n🔍 AUDITORIA: Tabela perguntas_templates\n');
    console.log('='.repeat(70));

    // 1. Estrutura da tabela
    console.log('\n📋 1. ESTRUTURA DA TABELA:\n');
    const estrutura = await pool.query(`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'perguntas_templates'
      ORDER BY ordinal_position;
    `);

    estrutura.rows.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? '✓ nullable' : '✗ NOT NULL';
      const defaultVal = col.column_default ? `[${col.column_default}]` : '';
      console.log(`   ${col.column_name.padEnd(25)} ${col.data_type.padEnd(15)} ${nullable.padEnd(15)} ${defaultVal}`);
    });

    // 2. Colunas duplicadas/obsoletas
    console.log('\n⚠️  2. COLUNAS PROBLEMÁTICAS:\n');

    const colunasObsoletas = [
      { nome: 'cargo', novo: 'cargos', motivo: 'Substituída por array' },
      { nome: 'nivel', novo: 'niveis', motivo: 'Substituída por array' },
    ];

    for (const col of colunasObsoletas) {
      const existe = estrutura.rows.find(r => r.column_name === col.nome);
      if (existe) {
        console.log(`   ❌ ${col.nome.padEnd(20)} → ${col.novo.padEnd(20)} ${col.motivo}`);
      }
    }

    // 3. Dados inconsistentes
    console.log('\n📊 3. ANÁLISE DE DADOS:\n');

    // Total de perguntas
    const total = await pool.query('SELECT COUNT(*) FROM perguntas_templates WHERE deleted_at IS NULL');
    console.log(`   Total de perguntas ativas: ${total.rows[0].count}`);

    // Perguntas com colunas antigas preenchidas
    const comCargoAntigo = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL AND cargo IS NOT NULL
    `);
    console.log(`   Com 'cargo' (coluna antiga): ${comCargoAntigo.rows[0].count}`);

    const comNivelAntigo = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL AND nivel IS NOT NULL
    `);
    console.log(`   Com 'nivel' (coluna antiga): ${comNivelAntigo.rows[0].count}`);

    // Perguntas com colunas novas
    const comCargosNovo = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL AND cargos IS NOT NULL AND cargos::text != '[]'
    `);
    console.log(`   Com 'cargos' (nova): ${comCargosNovo.rows[0].count}`);

    const comNiveisNovo = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL AND niveis IS NOT NULL AND niveis::text != '[]'
    `);
    console.log(`   Com 'niveis' (nova): ${comNiveisNovo.rows[0].count}`);

    // Perguntas universais
    const universais = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL
        AND (cargos IS NULL OR cargos::text = '[]')
        AND (niveis IS NULL OR niveis::text = '[]')
    `);
    console.log(`   Universais (sem cargo/nível): ${universais.rows[0].count}`);

    // 4. Problemas específicos
    console.log('\n⚠️  4. PROBLEMAS ENCONTRADOS:\n');

    // Perguntas com dados apenas nas colunas antigas
    const apenasAntigas = await pool.query(`
      SELECT id, texto, cargo, nivel
      FROM perguntas_templates
      WHERE deleted_at IS NULL
        AND (cargo IS NOT NULL OR nivel IS NOT NULL)
        AND (cargos IS NULL OR cargos::text = '[]')
      LIMIT 5
    `);

    if (apenasAntigas.rows.length > 0) {
      console.log(`   ❌ ${apenasAntigas.rows.length} perguntas usando apenas colunas antigas:\n`);
      apenasAntigas.rows.forEach((p, i) => {
        console.log(`      ${i + 1}. "${p.texto.substring(0, 60)}..."`);
        console.log(`         cargo='${p.cargo}' nivel='${p.nivel}'\n`);
      });
    } else {
      console.log(`   ✅ Nenhuma pergunta usando apenas colunas antigas`);
    }

    // Perguntas sem categoria
    const semCategoria = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL AND categoria IS NULL
    `);
    if (semCategoria.rows[0].count > 0) {
      console.log(`   ❌ ${semCategoria.rows[0].count} perguntas sem categoria`);
    } else {
      console.log(`   ✅ Todas as perguntas têm categoria`);
    }

    // 5. Recomendações
    console.log('\n💡 5. RECOMENDAÇÕES:\n');

    const problemas = [];

    if (comCargoAntigo.rows[0].count > 0 || comNivelAntigo.rows[0].count > 0) {
      problemas.push('Migrar dados das colunas antigas (cargo/nivel) para novas (cargos/niveis)');
    }

    if (estrutura.rows.find(r => r.column_name === 'cargo')) {
      problemas.push('Remover coluna obsoleta "cargo"');
    }

    if (estrutura.rows.find(r => r.column_name === 'nivel')) {
      problemas.push('Remover coluna obsoleta "nivel"');
    }

    if (semCategoria.rows[0].count > 0) {
      problemas.push('Adicionar categoria às perguntas que não têm');
    }

    if (problemas.length === 0) {
      console.log('   ✅ Tabela está consistente! Nenhum problema encontrado.\n');
    } else {
      problemas.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p}`);
      });
      console.log('');
    }

    console.log('='.repeat(70));
    console.log('\n✅ Auditoria concluída!\n');

  } catch (error) {
    console.error('\n❌ Erro na auditoria:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

verificarConsistencia();
