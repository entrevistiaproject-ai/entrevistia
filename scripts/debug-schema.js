#!/usr/bin/env node

const dotenv = require('dotenv');

const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';

console.log(`\n🔍 Investigando schemas no banco de ${environment}...\n`);

async function debugSchema() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // Lista todos os schemas
    console.log('📂 Schemas disponíveis:');
    const schemas = await sql`
      SELECT schema_name
      FROM information_schema.schemata
      ORDER BY schema_name
    `;
    schemas.forEach(({ schema_name }) => {
      console.log(`   - ${schema_name}`);
    });

    // Lista todas as tabelas em todos os schemas
    console.log('\n📊 Todas as tabelas (todos os schemas):');
    const allTables = await sql`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
      ORDER BY table_schema, table_name
    `;
    allTables.forEach(({ table_schema, table_name }) => {
      const icon = (table_name === 'faturas' || table_name === 'transacoes') ? '✅' : '📁';
      console.log(`   ${icon} ${table_schema}.${table_name}`);
    });

    // Tenta consultar diretamente
    console.log('\n🔍 Tentando SELECT direto nas tabelas:');

    try {
      const faturasCount = await sql`SELECT COUNT(*) as count FROM faturas`;
      console.log(`   ✅ faturas existe! (${faturasCount[0].count} registros)`);
    } catch (e) {
      console.log(`   ❌ faturas não existe: ${e.message}`);
    }

    try {
      const transacoesCount = await sql`SELECT COUNT(*) as count FROM transacoes`;
      console.log(`   ✅ transacoes existe! (${transacoesCount[0].count} registros)`);
    } catch (e) {
      console.log(`   ❌ transacoes não existe: ${e.message}`);
    }

    try {
      const candidatoEntrevistasCount = await sql`SELECT COUNT(*) as count FROM candidato_entrevistas`;
      console.log(`   ✅ candidato_entrevistas existe! (${candidatoEntrevistasCount[0].count} registros)`);
    } catch (e) {
      console.log(`   ❌ candidato_entrevistas não existe: ${e.message}`);
    }

    console.log('');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    console.error(error);
    process.exit(1);
  }
}

debugSchema();
