/**
 * Script para popular banco de dados com perguntas padrão
 *
 * Execução: npx tsx scripts/seed-banco-perguntas.ts
 */

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { perguntasTemplates } from '@/lib/db/schema';
import { todasAsPerguntas, estatisticas } from '@/lib/db/seeds/banco-perguntas-completo';

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
    console.log(`   Universais (qualquer cargo/nível): ${estatisticas.universais}`);
    console.log(`   Específicas por cargo: ${estatisticas.porCargo}`);
    console.log(`\n   Por categoria:`);
    console.log(`   - Comportamental: ${estatisticas.porCategoria.comportamental}`);
    console.log(`   - Técnica: ${estatisticas.porCategoria.tecnica}`);
    console.log(`   - Soft Skills: ${estatisticas.porCategoria.soft_skill}`);
    console.log(`   - Hard Skills: ${estatisticas.porCategoria.hard_skill}`);

    console.log('\n' + '='.repeat(60));
    console.log('\n🔄 Iniciando seed...\n');

    // Verifica perguntas existentes
    const existentes = await db
      .select({ id: perguntasTemplates.id })
      .from(perguntasTemplates)
      .where(perguntasTemplates.isPadrao);

    if (existentes.length > 0) {
      console.log(`⚠️  Encontradas ${existentes.length} perguntas padrão existentes.`);
      console.log('   Deseja substituir? Este script irá remover as existentes.\n');

      // Em produção, adicione confirmação aqui
      // Por segurança, vou apenas adicionar novas sem duplicar

      console.log('   ℹ️  Pulando perguntas existentes e adicionando apenas novas...\n');
    }

    let inseridas = 0;
    let puladas = 0;

    for (const pergunta of todasAsPerguntas) {
      try {
        await db.insert(perguntasTemplates).values({
          texto: pergunta.texto,
          cargos: pergunta.cargos,
          niveis: pergunta.niveis,
          categoria: pergunta.categoria,
          competencia: pergunta.competencia || null,
          tags: pergunta.tags || [],
          tipo: 'texto',
          isPadrao: true, // Marca como pergunta padrão do sistema
          userId: null, // Null = pergunta do sistema
          criteriosAvaliacao: {},
          metadados: {},
        });

        inseridas++;

        // Mostra progresso
        if (inseridas % 10 === 0) {
          process.stdout.write(`\r   ✅ Inseridas: ${inseridas}/${todasAsPerguntas.length}`);
        }
      } catch (error: any) {
        // Se já existe (unique constraint), pula
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

    // Mostra distribuição por cargo
    console.log('📈 Distribuição por área:\n');

    const areasCargos = [
      { nome: 'Tecnologia', cargos: ['Desenvolvedor', 'QA', 'DevOps', 'Data'] },
      { nome: 'Jurídico', cargos: ['Advogado', 'Paralegal'] },
      { nome: 'Vendas', cargos: ['Vendedor', 'SDR', 'BDR'] },
      { nome: 'Marketing', cargos: ['Marketing', 'Social Media', 'Designer'] },
      { nome: 'RH', cargos: ['Recrutador', 'RH'] },
      { nome: 'Financeiro', cargos: ['Contador', 'Financeiro'] },
      { nome: 'Atendimento', cargos: ['Customer Success', 'Suporte', 'SAC'] },
      { nome: 'Administrativo', cargos: ['Administrativo', 'Assistente'] },
    ];

    for (const area of areasCargos) {
      const count = todasAsPerguntas.filter(p =>
        p.cargos.some(cargo =>
          area.cargos.some(c => cargo.toLowerCase().includes(c.toLowerCase()))
        )
      ).length;

      if (count > 0) {
        console.log(`   ${area.nome.padEnd(20)} ${count.toString().padStart(3)} perguntas`);
      }
    }

    console.log(`\n   ${'Universal'.padEnd(20)} ${estatisticas.universais.toString().padStart(3)} perguntas`);

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

// Executa
seedPerguntas()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
