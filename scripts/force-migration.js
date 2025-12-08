#!/usr/bin/env node

/**
 * Script para forçar aplicação de uma migration específica
 */

const { readFileSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
const migrationFile = process.argv[2];

if (!DATABASE_URL) {
  console.error(`❌ Erro: DATABASE_URL não encontrada em ${envFile}`);
  process.exit(1);
}

if (!migrationFile) {
  console.error('❌ Erro: Especifique o arquivo de migration');
  console.error('Uso: node scripts/force-migration.js 0003_romantic_slyde.sql [--production]');
  process.exit(1);
}

const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';
console.log(`\n🔄 Aplicando ${migrationFile} no banco de ${environment}...\n`);

async function forceMigration() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // Lê o arquivo de migration
    const migrationsDir = join(__dirname, '..', 'drizzle', 'migrations');
    const filePath = join(migrationsDir, migrationFile);
    const migrationSQL = readFileSync(filePath, 'utf8');

    console.log('📄 Conteúdo da migration:');
    console.log('─'.repeat(60));
    console.log(migrationSQL);
    console.log('─'.repeat(60));
    console.log('');

    // Remove registro antigo se existir
    await sql`DELETE FROM drizzle_migrations WHERE hash = ${migrationFile}`;
    console.log('🗑️  Removido registro antigo da migration\n');

    // Aplica a migration
    console.log('🔄 Aplicando statements...\n');

    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    let count = 0;
    for (const statement of statements) {
      count++;
      console.log(`   ${count}. Executando statement...`);
      try {
        await sql.unsafe(statement);
        console.log(`   ✅ Statement ${count} executado\n`);
      } catch (error) {
        console.error(`   ❌ Erro no statement ${count}:`, error.message);
        console.error('   Statement:', statement.substring(0, 100) + '...');
        throw error;
      }
    }

    // Registra como aplicada
    await sql`
      INSERT INTO drizzle_migrations (hash, created_at)
      VALUES (${migrationFile}, ${Date.now()})
    `;

    console.log('✅ Migration aplicada com sucesso!\n');

  } catch (error) {
    console.error('\n❌ Erro ao aplicar migration:', error.message);
    console.error(error);
    process.exit(1);
  }
}

forceMigration();
