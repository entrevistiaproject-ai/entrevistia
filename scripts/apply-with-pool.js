#!/usr/bin/env node

const { readFileSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config({ path: '.env.production' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não encontrada');
  process.exit(1);
}

console.log('\n🔄 Aplicando migration com Pool (transação explícita)...\n');

async function applyWithPool() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    // Lê o arquivo
    const migrationsDir = join(__dirname, '..', 'drizzle', 'migrations');
    const filePath = join(migrationsDir, '0003_romantic_slyde.sql');
    const migrationSQL = readFileSync(filePath, 'utf8');

    // Inicia transação
    await client.query('BEGIN');
    console.log('🔄 Transação iniciada\n');

    // Remove registro antigo
    await client.query(`DELETE FROM drizzle_migrations WHERE hash = '0003_romantic_slyde.sql'`);
    console.log('🗑️  Registro antigo removido\n');

    // Divide e executa statements
    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`📋 Executando ${statements.length} statements...\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.substring(0, 60).replace(/\n/g, ' ');
      console.log(`   ${i + 1}/${statements.length}: ${preview}...`);

      try {
        await client.query(statement);
        console.log(`   ✅ Sucesso\n`);
      } catch (error) {
        console.error(`   ❌ Erro: ${error.message}\n`);
        throw error;
      }
    }

    // Registra migration
    await client.query(
      `INSERT INTO drizzle_migrations (hash, created_at) VALUES ($1, $2)`,
      ['0003_romantic_slyde.sql', Date.now()]
    );
    console.log('📝 Migration registrada\n');

    // Commit
    await client.query('COMMIT');
    console.log('✅ COMMIT realizado!\n');

    // Verifica se as tabelas existem
    console.log('🔍 Verificando tabelas...\n');

    const faturas = await client.query(`SELECT COUNT(*) FROM faturas`);
    console.log(`✅ faturas: ${faturas.rows[0].count} registros`);

    const transacoes = await client.query(`SELECT COUNT(*) FROM transacoes`);
    console.log(`✅ transacoes: ${transacoes.rows[0].count} registros`);

    const candidatoEntrevistas = await client.query(`SELECT COUNT(*) FROM candidato_entrevistas`);
    console.log(`✅ candidato_entrevistas: ${candidatoEntrevistas.rows[0].count} registros`);

    console.log('\n✅ Migration aplicada com sucesso!\n');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('\n❌ ROLLBACK executado. Erro:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

applyWithPool();
