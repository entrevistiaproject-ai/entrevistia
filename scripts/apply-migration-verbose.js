#!/usr/bin/env node

const { readFileSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

const envFile = '.env.production';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error(`❌ DATABASE_URL não encontrada`);
  process.exit(1);
}

console.log(`\n🔄 Aplicando migration 0003 no banco de PRODUÇÃO (VERBOSE)...\n`);

async function applyMigrationVerbose() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // Lê o arquivo
    const migrationsDir = join(__dirname, '..', 'drizzle', 'migrations');
    const filePath = join(migrationsDir, '0003_romantic_slyde.sql');
    const migrationSQL = readFileSync(filePath, 'utf8');

    // Remove registro antigo
    await sql`DELETE FROM drizzle_migrations WHERE hash = '0003_romantic_slyde.sql'`;
    console.log('🗑️  Removido registro antigo\n');

    // Divide em statements
    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`📋 Total de statements: ${statements.length}\n`);

    // Executa cada statement individualmente com log detalhado
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Statement ${i + 1}/${statements.length}:`);
      console.log(`${'='.repeat(60)}`);
      console.log(statement);
      console.log(`${'='.repeat(60)}\n`);

      try {
        const result = await sql.unsafe(statement);
        console.log(`✅ Executado com sucesso!`);
        console.log(`   Resultado:`, result);
      } catch (error) {
        console.error(`❌ ERRO:`, error.message);
        console.error(`   Código:`, error.code);
        console.error(`   Detalhe:`, error.detail);
        throw error;
      }
    }

    // Verifica se as tabelas existem
    console.log(`\n${'='.repeat(60)}`);
    console.log('Verificando se as tabelas foram criadas...');
    console.log(`${'='.repeat(60)}\n`);

    try {
      const faturas = await sql`SELECT COUNT(*) FROM faturas`;
      console.log(`✅ faturas: ${faturas[0].count} registros`);
    } catch (e) {
      console.log(`❌ faturas: ${e.message}`);
    }

    try {
      const transacoes = await sql`SELECT COUNT(*) FROM transacoes`;
      console.log(`✅ transacoes: ${transacoes[0].count} registros`);
    } catch (e) {
      console.log(`❌ transacoes: ${e.message}`);
    }

    // Registra migration
    await sql`INSERT INTO drizzle_migrations (hash, created_at) VALUES ('0003_romantic_slyde.sql', ${Date.now()})`;
    console.log(`\n✅ Migration registrada!\n`);

  } catch (error) {
    console.error('\n❌ Erro fatal:', error);
    process.exit(1);
  }
}

applyMigrationVerbose();
