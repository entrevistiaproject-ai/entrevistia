/**
 * Demonstração do Filtro Inteligente de Perguntas
 *
 * Mostra como o sistema seleciona perguntas relevantes por cargo/nível
 */

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { perguntasTemplates } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { filtrarComDiversidade } from '@/lib/services/filtro-perguntas';

async function demonstrarFiltro() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    console.log('\n🎯 DEMONSTRAÇÃO: Filtro Inteligente de Perguntas\n');
    console.log('='.repeat(70));

    // Busca todas as perguntas padrão
    const todasPerguntas = await db
      .select()
      .from(perguntasTemplates)
      .where(eq(perguntasTemplates.isPadrao, true));

    console.log(`\n📚 Total de perguntas no banco: ${todasPerguntas.length}\n`);

    // Testa diferentes cenários
    const cenarios = [
      {
        titulo: 'Desenvolvedor Júnior',
        params: { cargo: 'Desenvolvedor', nivel: 'junior', limite: 8 },
      },
      {
        titulo: 'Advogado Pleno',
        params: { cargo: 'Advogado', nivel: 'pleno', limite: 8 },
      },
      {
        titulo: 'Vendedor (qualquer nível)',
        params: { cargo: 'Vendedor', limite: 8 },
      },
      {
        titulo: 'Customer Success Senior',
        params: { cargo: 'Customer Success', nivel: 'senior', limite: 8 },
      },
    ];

    for (const cenario of cenarios) {
      console.log('='.repeat(70));
      console.log(`\n🔍 Cenário: ${cenario.titulo}\n`);

      const resultado = filtrarComDiversidade(todasPerguntas, cenario.params);

      console.log(`   Perguntas encontradas: ${resultado.length}\n`);

      resultado.slice(0, 8).forEach((p, index) => {
        console.log(`   ${index + 1}. [Score: ${p.score}] ${p.categoria.toUpperCase()}`);
        console.log(`      "${p.texto}"`);
        console.log(`      📊 Cargo: ${p.cargo} | Nível: ${p.nivel}`);
        console.log(`      💡 Motivos: ${p.motivoScore.join(', ')}\n`);
      });
    }

    console.log('='.repeat(70));
    console.log('\n✨ Demonstração concluída!\n');
    console.log('💡 Observe como o sistema:');
    console.log('   - Prioriza perguntas específicas (scores altos)');
    console.log('   - Inclui perguntas universais relevantes');
    console.log('   - Mantém diversidade de categorias');
    console.log('   - Explica o motivo de cada score\n');

  } catch (error) {
    console.error('\n❌ Erro na demonstração:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

demonstrarFiltro()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
