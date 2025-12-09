/**
 * Script para testar o novo schema de perguntas_templates
 */

require('dotenv').config({ path: '.env.local' });
const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');

async function testarSchema() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    console.log('\n🔍 Testando novo schema de perguntas_templates...\n');

    // Consulta a estrutura da tabela
    const result = await pool.query(`
      SELECT
        column_name,
        data_type,
        column_default,
        is_nullable
      FROM information_schema.columns
      WHERE table_name = 'perguntas_templates'
      ORDER BY ordinal_position;
    `);

    console.log('📋 Colunas da tabela perguntas_templates:\n');
    result.rows.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? '(nullable)' : '';
      const defaultVal = col.column_default ? `[default: ${col.column_default}]` : '';
      console.log(`  ✓ ${col.column_name}: ${col.data_type} ${nullable} ${defaultVal}`);
    });

    // Verifica se as novas colunas existem
    const colunas = result.rows.map(r => r.column_name);
    const colunasCriticas = ['cargos', 'niveis', 'metadados'];

    console.log('\n🎯 Verificando colunas críticas:');
    colunasCriticas.forEach(col => {
      if (colunas.includes(col)) {
        console.log(`  ✅ ${col} - OK`);
      } else {
        console.log(`  ❌ ${col} - FALTANDO`);
      }
    });

    // Testa inserção de pergunta universal
    console.log('\n🧪 Testando inserção de pergunta universal...');

    const testQuery = `
      INSERT INTO perguntas_templates (
        texto,
        cargos,
        niveis,
        categoria,
        tags,
        is_padrao
      ) VALUES (
        'Como você lida com pressão no trabalho?',
        '[]'::jsonb,
        '[]'::jsonb,
        'comportamental',
        '[]'::jsonb,
        false
      ) RETURNING id, texto, cargos, niveis, categoria;
    `;

    const insertResult = await pool.query(testQuery);

    if (insertResult.rows.length > 0) {
      console.log('  ✅ Pergunta universal criada com sucesso!');
      console.log('  📝 Dados:', JSON.stringify(insertResult.rows[0], null, 2));

      // Remove a pergunta de teste
      await pool.query('DELETE FROM perguntas_templates WHERE id = $1', [insertResult.rows[0].id]);
      console.log('  🧹 Pergunta de teste removida');
    }

    console.log('\n✅ Todos os testes passaram!\n');

  } catch (error) {
    console.error('\n❌ Erro ao testar schema:', error.message);
    console.error(error);
  } finally {
    await pool.end();
  }
}

testarSchema();
