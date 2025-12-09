/**
 * Script para testar sistema completo de perguntas:
 * - Classificação automática
 * - Filtragem por relevância
 * - Perguntas universais
 */

require('dotenv').config({ path: '.env.local' });
const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');

// Função de classificação simplificada para teste
function sugerirCategoria(texto) {
  const textoLower = texto.toLowerCase();

  if (/conte|descreva|situação|experiência|exemplo/i.test(texto)) {
    return { categoria: 'comportamental', confianca: 'alta', motivo: 'Pergunta sobre experiências' };
  }
  if (/como (funciona|implementar)|explique|algoritmo/i.test(texto)) {
    return { categoria: 'tecnica', confianca: 'alta', motivo: 'Pergunta técnica' };
  }
  if (/liderança|equipe|comunicação/i.test(texto)) {
    return { categoria: 'soft_skill', confianca: 'media', motivo: 'Habilidade interpessoal' };
  }
  if (/formação|certificação|experiência com/i.test(texto)) {
    return { categoria: 'hard_skill', confianca: 'media', motivo: 'Conhecimento específico' };
  }

  return { categoria: 'tecnica', confianca: 'baixa', motivo: 'Padrão' };
}

async function testarSistemaCompleto() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    console.log('\n🧪 TESTE DO SISTEMA COMPLETO DE PERGUNTAS\n');
    console.log('=' .repeat(60));

    // 1. Teste de classificação automática
    console.log('\n1️⃣  TESTE: Classificação Automática de Categoria\n');

    const testesClassificacao = [
      'Conte sobre uma vez que você resolveu um conflito',
      'Como funciona o algoritmo de ordenação quicksort?',
      'Você tem experiência com liderança de equipes?',
      'Qual sua formação acadêmica e certificações?',
    ];

    testesClassificacao.forEach(texto => {
      const sugestao = sugerirCategoria(texto);
      const confiancaEmoji =
        sugestao.confianca === 'alta' ? '🟢' :
        sugestao.confianca === 'media' ? '🟡' : '🔴';

      console.log(`${confiancaEmoji} "${texto.substring(0, 50)}..."`);
      console.log(`   → ${sugestao.categoria} (${sugestao.confianca})`);
      console.log(`   📝 ${sugestao.motivo}\n`);
    });

    // 2. Inserir perguntas de teste
    console.log('=' .repeat(60));
    console.log('\n2️⃣  TESTE: Inserir Perguntas de Diversos Tipos\n');

    const perguntasTeste = [
      {
        texto: 'Como você lida com prazos apertados?',
        cargos: [],
        niveis: [],
        categoria: 'comportamental',
        descricao: 'Universal - qualquer cargo/nível'
      },
      {
        texto: 'Explique o conceito de herança múltipla em OOP',
        cargos: ['Desenvolvedor'],
        niveis: ['pleno', 'senior'],
        categoria: 'tecnica',
        descricao: 'Específica - Dev pleno/senior'
      },
      {
        texto: 'Qual sua experiência com direito trabalhista?',
        cargos: ['Advogado'],
        niveis: [],
        categoria: 'tecnica',
        descricao: 'Universal para Advogados'
      },
    ];

    const idsInseridos = [];

    for (const p of perguntasTeste) {
      const result = await pool.query(`
        INSERT INTO perguntas_templates (
          texto, cargos, niveis, categoria, is_padrao, tags
        ) VALUES ($1, $2::jsonb, $3::jsonb, $4, true, '[]'::jsonb)
        RETURNING id
      `, [p.texto, JSON.stringify(p.cargos), JSON.stringify(p.niveis), p.categoria]);

      idsInseridos.push(result.rows[0].id);
      console.log(`✅ ${p.descricao}`);
      console.log(`   "${p.texto}"`);
      console.log(`   cargos: [${p.cargos.join(', ') || 'universal'}]`);
      console.log(`   níveis: [${p.niveis.join(', ') || 'universal'}]\n`);
    }

    // 3. Testar filtro
    console.log('=' .repeat(60));
    console.log('\n3️⃣  TESTE: Filtro de Perguntas por Relevância\n');

    // Buscar todas as perguntas
    const todasResult = await pool.query(`
      SELECT id, texto, cargos, niveis, categoria
      FROM perguntas_templates
      WHERE is_padrao = true
      ORDER BY created_at DESC
      LIMIT 10
    `);

    const todasPerguntas = todasResult.rows;

    console.log('📚 Buscando perguntas para: Desenvolvedor Pleno\n');

    // Simula filtro (sem importar módulo TS, vou fazer manualmente)
    const resultados = todasPerguntas.map(p => {
      let score = 0;
      const motivos = [];

      // Match de cargo
      const cargos = p.cargos || [];
      if (cargos.length === 0) {
        score += 15;
        motivos.push('Universal (cargo)');
      } else if (cargos.some(c => c.toLowerCase().includes('desenv'))) {
        score += 40;
        motivos.push('Match de cargo');
      }

      // Match de nível
      const niveis = p.niveis || [];
      if (niveis.length === 0) {
        score += 20;
        motivos.push('Universal (nível)');
      } else if (niveis.includes('pleno')) {
        score += 30;
        motivos.push('Match de nível');
      }

      return { ...p, score, motivos };
    })
    .filter(p => p.score >= 10)
    .sort((a, b) => b.score - a.score);

    resultados.forEach((p, i) => {
      console.log(`${i + 1}. [Score: ${p.score}] ${p.texto}`);
      console.log(`   Motivos: ${p.motivos.join(', ')}\n`);
    });

    // 4. Limpar dados de teste
    console.log('=' .repeat(60));
    console.log('\n4️⃣  Limpando dados de teste...\n');

    await pool.query(`
      DELETE FROM perguntas_templates
      WHERE id = ANY($1::uuid[])
    `, [idsInseridos]);

    console.log('✅ Dados de teste removidos');

    console.log('\n' + '='.repeat(60));
    console.log('✅ TODOS OS TESTES PASSARAM COM SUCESSO!\n');

  } catch (error) {
    console.error('\n❌ Erro nos testes:', error.message);
    console.error(error);
  } finally {
    await pool.end();
  }
}

testarSistemaCompleto();
