#!/usr/bin/env node

/**
 * Script para verificar as tabelas no banco de dados
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
console.log(`\n🔍 Verificando tabelas no banco de ${environment}...\n`);

async function checkTables() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // Lista todas as tabelas
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    console.log('📊 Tabelas encontradas:\n');
    tables.forEach(({ table_name }) => {
      const icon = table_name === 'faturas' || table_name === 'transacoes' ? '✅' : '📁';
      console.log(`${icon} ${table_name}`);
    });

    // Verifica se faturas e transacoes existem
    const hasFaturas = tables.some(t => t.table_name === 'faturas');
    const hasTransacoes = tables.some(t => t.table_name === 'transacoes');

    console.log('\n📋 Status das novas tabelas:');
    console.log(`   faturas: ${hasFaturas ? '✅ Existe' : '❌ Não existe'}`);
    console.log(`   transacoes: ${hasTransacoes ? '✅ Existe' : '❌ Não existe'}`);

    // Se existir faturas, mostra estrutura
    if (hasFaturas) {
      console.log('\n📐 Estrutura da tabela faturas:');
      const columns = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'faturas'
        ORDER BY ordinal_position
      `;
      columns.forEach(({ column_name, data_type, is_nullable }) => {
        console.log(`   - ${column_name}: ${data_type} ${is_nullable === 'NO' ? '(NOT NULL)' : ''}`);
      });
    }

    console.log('');

  } catch (error) {
    console.error('\n❌ Erro ao verificar tabelas:', error.message);
    console.error(error);
    process.exit(1);
  }
}

checkTables();
