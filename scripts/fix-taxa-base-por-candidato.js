#!/usr/bin/env node

/**
 * Script para corrigir taxas base por candidato
 *
 * Problema: A migração anterior criou apenas 1 taxa_base_candidato por entrevista,
 * quando deveria ser 1 por candidato avaliado.
 *
 * Este script:
 * 1. Identifica candidatos que foram avaliados (têm avaliadoEm)
 * 2. Verifica se já existe taxa_base_candidato para cada um
 * 3. Cria as taxas que faltam
 * 4. Recalcula o total das faturas
 */

const dotenv = require('dotenv');

// Carrega variáveis de ambiente
const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error(`\u274c Erro: DATABASE_URL não encontrada em ${envFile}`);
  process.exit(1);
}

const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';
const dryRun = !process.argv.includes('--execute');

console.log(`\n\ud83d\udd27 Correção de Taxa Base por Candidato - ${environment}`);
console.log(`   Modo: ${dryRun ? '\ud83d\udd0d DRY RUN (simulação)' : '\u26a1 EXECUÇÃO REAL'}`);
console.log('='.repeat(60));

async function fixTaxaBase() {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(DATABASE_URL);

    // 1. Busca todos os candidatos que foram avaliados
    console.log('\n\ud83d\udcca Buscando candidatos avaliados...');
    const candidatosAvaliados = await sql`
      SELECT DISTINCT
        ce.id as candidato_entrevista_id,
        ce.entrevista_id,
        e.user_id,
        ce.avaliado_em,
        e.titulo as entrevista_titulo,
        c.nome as candidato_nome
      FROM candidato_entrevistas ce
      INNER JOIN entrevistas e ON ce.entrevista_id = e.id
      LEFT JOIN candidatos c ON ce.candidato_id = c.id
      WHERE ce.avaliado_em IS NOT NULL
      ORDER BY ce.avaliado_em DESC
    `;

    console.log(`   Encontrados ${candidatosAvaliados.length} candidatos avaliados`);

    // 2. Para cada candidato, verifica se existe taxa_base
    console.log('\n\ud83d\udd0d Verificando taxas base existentes...');

    let taxasExistentes = 0;
    let taxasFaltando = [];

    for (const candidato of candidatosAvaliados) {
      // Busca se existe taxa_base para este candidato específico
      // A taxa base deve estar associada ao candidatoEntrevista ou ter sido criada no mesmo momento da análise
      const taxaExistente = await sql`
        SELECT id FROM transacoes
        WHERE user_id = ${candidato.user_id}
          AND entrevista_id = ${candidato.entrevista_id}
          AND tipo = 'taxa_base_candidato'
          AND (
            -- Verifica se a transação foi criada próximo ao momento da avaliação (margem de 5 minutos)
            ABS(EXTRACT(EPOCH FROM (created_at - ${candidato.avaliado_em}::timestamp))) < 300
            OR
            -- Ou se a descrição menciona este candidato
            descricao ILIKE ${'%' + (candidato.candidato_nome || '').substring(0, 20) + '%'}
          )
        LIMIT 1
      `;

      if (taxaExistente.length > 0) {
        taxasExistentes++;
      } else {
        taxasFaltando.push(candidato);
      }
    }

    console.log(`   Taxas existentes: ${taxasExistentes}`);
    console.log(`   Taxas faltando: ${taxasFaltando.length}`);

    if (taxasFaltando.length === 0) {
      console.log('\n\u2705 Todas as taxas base estão corretas!');
      return;
    }

    // 3. Lista candidatos sem taxa base
    console.log('\n\ud83d\udcdd Candidatos sem taxa base:');
    taxasFaltando.slice(0, 10).forEach((c, i) => {
      console.log(`   ${i + 1}. ${c.candidato_nome || 'Sem nome'} - ${c.entrevista_titulo || 'Sem título'}`);
    });
    if (taxasFaltando.length > 10) {
      console.log(`   ... e mais ${taxasFaltando.length - 10}`);
    }

    // 4. Calcula impacto financeiro
    const impactoFinanceiro = taxasFaltando.length * 1.00; // R$ 1,00 por taxa
    console.log(`\n\ud83d\udcb0 Impacto financeiro: R$ ${impactoFinanceiro.toFixed(2)} (${taxasFaltando.length} × R$ 1,00)`);

    if (dryRun) {
      console.log('\n\u26a0\ufe0f  DRY RUN - Nenhuma alteração foi feita.');
      console.log('   Para executar a correção, use: node scripts/fix-taxa-base-por-candidato.js --execute');
      console.log('   Para produção: node scripts/fix-taxa-base-por-candidato.js --production --execute');
      return;
    }

    // 5. Cria as taxas faltantes
    console.log('\n\ud83d\udd04 Criando taxas base faltantes...');
    let taxasCriadas = 0;
    let erros = 0;

    for (const candidato of taxasFaltando) {
      try {
        // Busca a fatura do mês da avaliação
        const dataAvaliacao = new Date(candidato.avaliado_em);
        const mesRef = dataAvaliacao.getMonth() + 1;
        const anoRef = dataAvaliacao.getFullYear();

        let [fatura] = await sql`
          SELECT id FROM faturas
          WHERE user_id = ${candidato.user_id}
            AND mes_referencia = ${mesRef}
            AND ano_referencia = ${anoRef}
          LIMIT 1
        `;

        // Cria fatura se não existir
        if (!fatura) {
          [fatura] = await sql`
            INSERT INTO faturas (user_id, mes_referencia, ano_referencia)
            VALUES (${candidato.user_id}, ${mesRef}, ${anoRef})
            RETURNING id
          `;
        }

        // Cria a transação de taxa base
        await sql`
          INSERT INTO transacoes (
            user_id,
            fatura_id,
            entrevista_id,
            tipo,
            custo_base,
            markup,
            valor_cobrado,
            descricao,
            status,
            created_at,
            processada_em
          ) VALUES (
            ${candidato.user_id},
            ${fatura.id},
            ${candidato.entrevista_id},
            'taxa_base_candidato',
            '0.10',
            '10.0',
            '1.00',
            ${'Taxa base - ' + (candidato.candidato_nome || 'candidato avaliado') + ' (correção)'},
            'concluida',
            ${candidato.avaliado_em},
            ${candidato.avaliado_em}
          )
        `;

        taxasCriadas++;
      } catch (err) {
        console.error(`   \u274c Erro ao criar taxa para ${candidato.candidato_nome}:`, err.message);
        erros++;
      }
    }

    console.log(`   \u2705 ${taxasCriadas} taxas criadas`);
    if (erros > 0) {
      console.log(`   \u274c ${erros} erros`);
    }

    // 6. Recalcula totais das faturas
    console.log('\n\ud83d\udcca Recalculando totais das faturas...');
    const faturasAtualizadas = await sql`
      UPDATE faturas f
      SET
        valor_total = COALESCE((
          SELECT SUM(valor_cobrado::numeric)
          FROM transacoes t
          WHERE t.fatura_id = f.id
        ), 0),
        updated_at = NOW()
      WHERE f.id IN (
        SELECT DISTINCT fatura_id FROM transacoes WHERE tipo = 'taxa_base_candidato'
      )
      RETURNING id, valor_total
    `;
    console.log(`   \u2705 ${faturasAtualizadas.length} faturas atualizadas`);

    // 7. Mostra resultado final
    console.log('\n\u2705 Correção concluída!');

    // Estatísticas finais
    const statsFinais = await sql`
      SELECT
        tipo,
        COUNT(*) as quantidade,
        SUM(valor_cobrado::numeric) as valor_total
      FROM transacoes
      WHERE tipo IN ('taxa_base_candidato', 'analise_pergunta')
      GROUP BY tipo
      ORDER BY tipo
    `;

    console.log('\n\ud83d\udcca Estatísticas finais:');
    statsFinais.forEach(({ tipo, quantidade, valor_total }) => {
      const valorTotal = parseFloat(valor_total) || 0;
      console.log(`   ${tipo}: ${quantidade} transações, Total: R$ ${valorTotal.toFixed(2)}`);
    });

  } catch (error) {
    console.error('\n\u274c Erro:', error.message);
    console.error(error);
    process.exit(1);
  }
}

fixTaxaBase();
