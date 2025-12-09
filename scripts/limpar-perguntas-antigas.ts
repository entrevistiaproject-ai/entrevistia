/**
 * Script para limpar perguntas padrão antigas
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from '../lib/db/schema';

async function limpar() {
  console.log('🗑️  Limpando perguntas padrão antigas...\n');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada');
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  try {
    // Conta quantas perguntas existem
    const existentes = await db
      .select({ id: schema.perguntasTemplates.id })
      .from(schema.perguntasTemplates)
      .where(eq(schema.perguntasTemplates.isPadrao, true));

    console.log(`📊 Encontradas ${existentes.length} perguntas padrão antigas`);

    if (existentes.length === 0) {
      console.log('\n✅ Nenhuma pergunta para deletar');
      return;
    }

    // Deleta as perguntas padrão
    await db
      .delete(schema.perguntasTemplates)
      .where(eq(schema.perguntasTemplates.isPadrao, true));

    console.log(`\n✅ ${existentes.length} perguntas deletadas com sucesso!`);

  } catch (error) {
    console.error('❌ Erro ao limpar:', error);
    process.exit(1);
  }
}

limpar();
