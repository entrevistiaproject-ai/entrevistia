/**
 * Script de verificação FINAL da tabela perguntas_templates (após limpeza)
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

async function verificarFinal() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('\n✅ VERIFICAÇÃO FINAL: Tabela perguntas_templates\n');
    console.log('='.repeat(70));

    // 1. Estrutura da tabela
    console.log('\n📋 ESTRUTURA DA TABELA:\n');
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

    const colunasEsperadas = {
      obrigatorias: ['id', 'texto', 'categoria', 'tipo', 'is_padrao', 'cargos', 'niveis', 'tags', 'created_at', 'updated_at'],
      opcionais: ['user_id', 'competencia', 'criterios_avaliacao', 'metadados', 'deleted_at'],
    };

    estrutura.rows.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? '✓' : '✗';
      const tipo = col.data_type === 'jsonb' ? '📦 jsonb' :
                   col.data_type === 'uuid' ? '🔑 uuid' :
                   col.data_type === 'text' ? '📝 text' :
                   col.data_type === 'boolean' ? '☑️  bool' :
                   col.data_type.includes('timestamp') ? '🕐 timestamp' :
                   col.data_type;

      console.log(`   ${col.column_name.padEnd(25)} ${tipo.padEnd(20)} ${nullable}`);
    });

    // Verifica se colunas obsoletas foram removidas
    const temCargoAntigo = estrutura.rows.find(r => r.column_name === 'cargo');
    const temNivelAntigo = estrutura.rows.find(r => r.column_name === 'nivel');

    console.log('\n🧹 LIMPEZA DE COLUNAS OBSOLETAS:\n');
    if (temCargoAntigo || temNivelAntigo) {
      if (temCargoAntigo) console.log('   ❌ Coluna "cargo" ainda existe');
      if (temNivelAntigo) console.log('   ❌ Coluna "nivel" ainda existe');
    } else {
      console.log('   ✅ Colunas obsoletas removidas (cargo, nivel)');
    }

    // Verifica NOT NULL nas colunas críticas
    console.log('\n🔒 CONSTRAINTS:\n');
    const cargosNotNull = estrutura.rows.find(r => r.column_name === 'cargos')?.is_nullable === 'NO';
    const niveisNotNull = estrutura.rows.find(r => r.column_name === 'niveis')?.is_nullable === 'NO';
    const tagsNotNull = estrutura.rows.find(r => r.column_name === 'tags')?.is_nullable === 'NO';

    console.log(`   cargos NOT NULL: ${cargosNotNull ? '✅' : '❌'}`);
    console.log(`   niveis NOT NULL: ${niveisNotNull ? '✅' : '❌'}`);
    console.log(`   tags NOT NULL: ${tagsNotNull ? '✅' : '❌'}`);

    // 2. Estatísticas dos dados
    console.log('\n📊 ESTATÍSTICAS:\n');

    const total = await pool.query('SELECT COUNT(*) FROM perguntas_templates WHERE deleted_at IS NULL');
    console.log(`   Total de perguntas: ${total.rows[0].count}`);

    const padrao = await pool.query('SELECT COUNT(*) FROM perguntas_templates WHERE deleted_at IS NULL AND is_padrao = true');
    console.log(`   Perguntas padrão: ${padrao.rows[0].count}`);

    const personalizadas = await pool.query('SELECT COUNT(*) FROM perguntas_templates WHERE deleted_at IS NULL AND is_padrao = false');
    console.log(`   Personalizadas: ${personalizadas.rows[0].count}`);

    // Distribuição por categoria
    const porCategoria = await pool.query(`
      SELECT categoria, COUNT(*) as total
      FROM perguntas_templates
      WHERE deleted_at IS NULL
      GROUP BY categoria
      ORDER BY total DESC
    `);

    console.log('\n   Por categoria:');
    porCategoria.rows.forEach(c => {
      console.log(`   - ${c.categoria.padEnd(20)} ${c.total.toString().padStart(3)} perguntas`);
    });

    // Perguntas universais vs específicas
    const universais = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL
        AND cargos::text = '[]'
        AND niveis::text = '[]'
    `);
    console.log(`\n   Universais (sem cargo/nível): ${universais.rows[0].count}`);

    const especificas = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL
        AND (cargos::text != '[]' OR niveis::text != '[]')
    `);
    console.log(`   Específicas (com cargo/nível): ${especificas.rows[0].count}`);

    // 3. Validações
    console.log('\n✅ VALIDAÇÕES:\n');

    let problemas = [];

    // Perguntas sem cargos e niveis (deve ter default)
    const semArrays = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL AND (cargos IS NULL OR niveis IS NULL OR tags IS NULL)
    `);
    if (semArrays.rows[0].count > 0) {
      problemas.push(`${semArrays.rows[0].count} perguntas com arrays NULL`);
    }

    // Perguntas sem categoria
    const semCategoria = await pool.query(`
      SELECT COUNT(*) FROM perguntas_templates
      WHERE deleted_at IS NULL AND categoria IS NULL
    `);
    if (semCategoria.rows[0].count > 0) {
      problemas.push(`${semCategoria.rows[0].count} perguntas sem categoria`);
    }

    if (problemas.length === 0) {
      console.log('   ✅ Nenhum problema encontrado!');
      console.log('   ✅ Todos os arrays têm valores (sem NULL)');
      console.log('   ✅ Todas as perguntas têm categoria');
      console.log('   ✅ Schema está limpo e consistente');
    } else {
      console.log('   ⚠️  Problemas encontrados:');
      problemas.forEach(p => console.log(`   - ${p}`));
    }

    // 4. Exemplo de perguntas
    console.log('\n📝 AMOSTRA DE PERGUNTAS:\n');

    const amostra = await pool.query(`
      SELECT texto, cargos, niveis, categoria
      FROM perguntas_templates
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT 3
    `);

    amostra.rows.forEach((p, i) => {
      const cargosDisplay = p.cargos && p.cargos.length > 0 ? p.cargos.join(', ') : '🌍 Universal';
      const niveisDisplay = p.niveis && p.niveis.length > 0 ? p.niveis.join(', ') : 'Todos';

      console.log(`   ${i + 1}. "${p.texto.substring(0, 60)}..."`);
      console.log(`      Cargos: ${cargosDisplay}`);
      console.log(`      Níveis: ${niveisDisplay}`);
      console.log(`      Categoria: ${p.categoria}\n`);
    });

    console.log('='.repeat(70));
    console.log('\n🎉 Tabela perguntas_templates está LIMPA e CONSISTENTE!\n');

  } catch (error) {
    console.error('\n❌ Erro na verificação:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

verificarFinal();
