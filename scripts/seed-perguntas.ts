import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/db/schema';
import { perguntasAdvogadoPleno } from '../lib/db/seeds/perguntas-advogado-pleno';

async function seed() {
  console.log('🌱 Iniciando seed do banco de perguntas...\n');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada');
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  try {
    // Inserir perguntas padrão
    console.log('📝 Inserindo 12 perguntas para Advogado Pleno...');

    for (const pergunta of perguntasAdvogadoPleno) {
      await db.insert(schema.perguntasTemplates).values({
        ...pergunta,
        isPadrao: true,
        userId: null, // perguntas do sistema
      });
      console.log(`✅ Inserida: ${pergunta.competencia} (${pergunta.categoria})`);
    }

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log(`\n📊 Total de perguntas inseridas: ${perguntasAdvogadoPleno.length}`);
    console.log('\nCategoria das perguntas:');

    const categorias = perguntasAdvogadoPleno.reduce((acc, p) => {
      acc[p.categoria] = (acc[p.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(categorias).forEach(([categoria, count]) => {
      console.log(`  - ${categoria}: ${count} perguntas`);
    });

  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
}

seed();
