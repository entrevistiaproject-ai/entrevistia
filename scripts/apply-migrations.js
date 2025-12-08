#!/usr/bin/env node

/**
 * Script para aplicar migrations SQL no Neon Database
 * Usa pg.Pool com transações explícitas para garantir commit
 */

const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Carrega variáveis de ambiente
const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error(`❌ Erro: DATABASE_URL não encontrada em ${envFile}`);
  process.exit(1);
}

const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';
console.log(`\n🔄 Aplicando migrations no banco de ${environment}...\n`);

async function applyMigrations() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    // Cria tabela de controle de migrations se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS drizzle_migrations (
        id SERIAL PRIMARY KEY,
        hash TEXT NOT NULL,
        created_at BIGINT
      )
    `);

    // Lê os arquivos de migration
    const migrationsDir = join(__dirname, '..', 'drizzle', 'migrations');
    const files = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log(`📁 Encontradas ${files.length} migrations:\n`);

    let appliedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
      const filePath = join(migrationsDir, file);
      const migrationSQL = readFileSync(filePath, 'utf8');

      // Verifica se já foi aplicada
      const result = await client.query(
        'SELECT id FROM drizzle_migrations WHERE hash = $1',
        [file]
      );

      if (result.rows.length > 0) {
        console.log(`⏭️  ${file} (já aplicada)`);
        skippedCount++;
        continue;
      }

      // Aplica a migration dentro de uma transação
      console.log(`🔄 Aplicando ${file}...`);

      await client.query('BEGIN');

      try {
        // Divide em statements
        const statements = migrationSQL
          .split('--> statement-breakpoint')
          .map(s => s.trim())
          .filter(s => s.length > 0);

        for (const statement of statements) {
          await client.query(statement);
        }

        // Registra como aplicada
        await client.query(
          'INSERT INTO drizzle_migrations (hash, created_at) VALUES ($1, $2)',
          [file, Date.now()]
        );

        await client.query('COMMIT');
        console.log(`✅ ${file} aplicada com sucesso`);
        appliedCount++;

      } catch (error) {
        await client.query('ROLLBACK');
        console.error(`❌ Erro ao aplicar ${file}:`, error.message);
        throw error;
      }
    }

    console.log(`\n✅ Concluído!`);
    console.log(`   - ${appliedCount} migrations aplicadas`);
    console.log(`   - ${skippedCount} migrations já existiam\n`);

  } catch (error) {
    console.error('\n❌ Erro ao aplicar migrations:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

applyMigrations();
