/**
 * Script para popular o banco de dados com as perguntas do banco v4
 *
 * Uso: npx tsx scripts/seed-perguntas-v4.ts
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { todasPerguntas, imprimirEstatisticas } from '../lib/db/seeds/banco-perguntas-v4';

// Carrega variáveis de ambiente
config({ path: '.env.local' });

async function seedPerguntasV4() {
  console.log('\n🚀 Iniciando seed do banco de perguntas v4...\n');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada');
  }

  const sql = neon(databaseUrl);

  try {
    // Mostra estatísticas
    imprimirEstatisticas();

    // Limpa perguntas padrão antigas
    console.log('🧹 Limpando perguntas padrão antigas...');
    const deleted = await sql`
      DELETE FROM perguntas_templates
      WHERE is_padrao = true
      RETURNING id
    `;
    console.log(`   Removidas ${deleted.length} perguntas antigas\n`);

    // Insere as novas perguntas em lotes
    console.log('📝 Inserindo novas perguntas...');
    const BATCH_SIZE = 100;
    let inserted = 0;

    for (let i = 0; i < todasPerguntas.length; i += BATCH_SIZE) {
      const batch = todasPerguntas.slice(i, i + BATCH_SIZE);

      for (const pergunta of batch) {
        await sql`
          INSERT INTO perguntas_templates (texto, area, cargo, nivel, categoria, competencia, is_padrao, tipo)
          VALUES (
            ${pergunta.texto},
            ${pergunta.area},
            ${pergunta.cargo},
            ${pergunta.nivel},
            ${pergunta.categoria},
            ${pergunta.competencia || ''},
            true,
            'texto'
          )
        `;
        inserted++;
      }

      console.log(`   Progresso: ${Math.min(i + BATCH_SIZE, todasPerguntas.length)}/${todasPerguntas.length} perguntas`);
    }

    console.log(`\n✅ Seed concluído com sucesso!`);
    console.log(`   Total inserido: ${inserted} perguntas\n`);

    // Verifica contagem no banco
    const count = await sql`SELECT COUNT(*) as total FROM perguntas_templates WHERE is_padrao = true`;
    console.log(`📊 Verificação: ${count[0].total} perguntas padrão no banco\n`);

  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  }
}

seedPerguntasV4();
