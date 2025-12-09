/**
 * Script para popular banco de dados com perguntas padrão
 *
 * Execução: npx tsx scripts/seed-banco-perguntas.ts
 */

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { Pool } from 'pg';
import { perguntasTemplates } from '@/lib/db/schema';
import { todasAsPerguntas, estatisticas } from '@/lib/db/seeds/banco-perguntas-v3';

async function seedPerguntas() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    console.log('\n🌱 SEED: Banco de Perguntas Padrão\n');
    console.log('='.repeat(60));

    console.log(`\n📊 Estatísticas do Banco:`);
    console.log(`   Total de perguntas: ${estatisticas.totalPerguntas}`);
    console.log(`\n   Por categoria:`);
    Object.entries(estatisticas.porCategoria).forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log('\n🔄 Iniciando seed...\n');

    // Verifica perguntas existentes
    const existentes = await db
      .select({ id: perguntasTemplates.id })
      .from(perguntasTemplates)
      .where(eq(perguntasTemplates.isPadrao, true));

    if (existentes.length > 0) {
      console.log(`⚠️  Encontradas ${existentes.length} perguntas padrão existentes.`);
      console.log('   ℹ️  Pulando perguntas existentes e adicionando apenas novas...\n');
    }

    let inseridas = 0;
    let puladas = 0;

    for (const pergunta of todasAsPerguntas) {
      try {
        await db.insert(perguntasTemplates).values({
          texto: pergunta.texto,
          cargo: pergunta.cargo,
          nivel: pergunta.nivel,
          categoria: pergunta.categoria,
          competencia: pergunta.competencia || null,
          tipo: 'audio',
          isPadrao: true,
          userId: null,
        });

        inseridas++;

        if (inseridas % 50 === 0) {
          process.stdout.write(`\r   ✅ Inseridas: ${inseridas}/${todasAsPerguntas.length}`);
        }
      } catch (error: any) {
        if (error.code === '23505') {
          puladas++;
        } else {
          console.error(`\n   ❌ Erro ao inserir: ${pergunta.texto.substring(0, 50)}...`);
          console.error(`      ${error.message}`);
        }
      }
    }

    console.log(`\r   ✅ Inseridas: ${inseridas}/${todasAsPerguntas.length}                    `);
    if (puladas > 0) {
      console.log(`   ⏭️  Puladas (duplicadas): ${puladas}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Seed concluído com sucesso!\n');

    console.log('📈 Distribuição por cargo:\n');
    Object.entries(estatisticas.porCargo).forEach(([cargo, count]) => {
      if (count > 0) {
        console.log(`   ${cargo.padEnd(20)} ${count.toString().padStart(3)} perguntas`);
      }
    });

    console.log('\n' + '='.repeat(60));
    console.log('\n🎯 Próximos passos:\n');
    console.log('   1. Teste o filtro: GET /api/perguntas?cargo=Desenvolvedor&nivel=pleno');
    console.log('   2. Crie uma entrevista e veja as sugestões');
    console.log('   3. Adicione mais perguntas específicas conforme necessário\n');

  } catch (error) {
    console.error('\n❌ Erro ao fazer seed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedPerguntas()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
