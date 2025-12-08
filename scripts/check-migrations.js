#!/usr/bin/env node

const dotenv = require('dotenv');

const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';

console.log(`\n🔍 Verificando migrations aplicadas no banco de ${environment}...\n`);

async function checkMigrations() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    const migrations = await sql`
      SELECT * FROM drizzle_migrations
      ORDER BY created_at
    `;

    console.log(`📋 Migrations registradas (${migrations.length}):\n`);
    migrations.forEach(({ id, hash, created_at }) => {
      const date = new Date(created_at).toLocaleString('pt-BR');
      console.log(`   ${id}. ${hash} (${date})`);
    });

    console.log('');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

checkMigrations();
