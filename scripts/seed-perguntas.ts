import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/db/schema';
import { todasAsPerguntas, estatisticas } from '../lib/db/seeds/banco-perguntas-v3';

async function seed() {
  console.log('🌱 Iniciando seed do banco de perguntas...\n');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada');
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  try {
    console.log(`📝 Inserindo ${todasAsPerguntas.length} perguntas padrão...`);
    console.log(`   Cargos cobertos: ${estatisticas.cargosDisponiveis.join(', ')}\n`);

    let inseridas = 0;
    for (const pergunta of todasAsPerguntas) {
      await db.insert(schema.perguntasTemplates).values({
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

      // Log de progresso a cada 50 perguntas
      if (inseridas % 50 === 0) {
        console.log(`   ... ${inseridas}/${todasAsPerguntas.length} inseridas`);
      }
    }

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log(`\n📊 Total de perguntas inseridas: ${inseridas}`);

    console.log('\nDistribuição por cargo:');
    Object.entries(estatisticas.porCargo).forEach(([cargo, count]) => {
      console.log(`  - ${cargo}: ${count} perguntas`);
    });

    console.log('\nDistribuição por categoria:');
    Object.entries(estatisticas.porCategoria).forEach(([categoria, count]) => {
      console.log(`  - ${categoria}: ${count} perguntas`);
    });

  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
}

seed();
