import { db } from '@/db/client';
import { entrevistas } from '@/db/schema';

async function main() {
  try {
    const lista = await db.select().from(entrevistas).limit(10);

    console.log('\n📋 Entrevistas no banco:', lista.length);
    console.log('');

    if (lista.length === 0) {
      console.log('⚠️  Nenhuma entrevista encontrada no banco de dados');
      console.log('');
      console.log('Crie uma entrevista primeiro em /entrevistas');
      process.exit(0);
    }

    lista.forEach((e, index) => {
      console.log(`${index + 1}. ${e.titulo}`);
      console.log(`   ID: ${e.id}`);
      console.log(`   Slug: ${e.slug || '❌ SEM SLUG'}`);
      console.log(`   Status: ${e.status}`);
      console.log(`   Criada: ${e.createdAt}`);

      if (e.slug) {
        console.log(`   🔗 Link: http://localhost:3000/entrevista/${e.slug}`);
      } else {
        console.log(`   ⚠️  Precisa gerar um slug para essa entrevista`);
      }
      console.log('');
    });

    // Conta quantas tem slug
    const comSlug = lista.filter(e => e.slug).length;
    const semSlug = lista.length - comSlug;

    console.log(`✅ Com slug: ${comSlug}`);
    console.log(`❌ Sem slug: ${semSlug}`);
    console.log('');

  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }

  process.exit(0);
}

main();
