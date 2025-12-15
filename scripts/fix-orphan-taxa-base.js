#!/usr/bin/env node

/**
 * Script para corrigir taxas base órfãs (sem análises de perguntas associadas)
 *
 * Verifica se existem análises reais no sistema que deveriam estar associadas.
 * Se existirem análises, adiciona as cobranças de perguntas faltantes.
 * Se não existirem, remove a taxa base órfã.
 */

const dotenv = require('dotenv');
const envFile = process.argv.includes('--production') ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL;
const dryRun = !process.argv.includes('--execute');
const environment = process.argv.includes('--production') ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';

console.log(`\n🔧 Correção de Taxas Base Órfãs - ${environment}`);
console.log(`   Modo: ${dryRun ? '🔍 DRY RUN (simulação)' : '⚡ EXECUÇÃO REAL'}`);
console.log('='.repeat(60));

(async () => {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(DATABASE_URL);

  // 1. Identificar taxas base órfãs (sem analise_pergunta no mesmo minuto)
  console.log('\n🔍 Buscando taxas base órfãs...');

  const taxasOrfas = await sql`
    WITH grupos AS (
      SELECT
        entrevista_id,
        DATE_TRUNC('minute', created_at) as minuto,
        SUM(CASE WHEN tipo = 'taxa_base_candidato' THEN valor_cobrado::numeric ELSE 0 END) as taxa_base,
        COUNT(CASE WHEN tipo = 'analise_pergunta' THEN 1 END) as qtd_perguntas,
        (array_agg(id ORDER BY tipo))[1] as taxa_base_id,
        (array_agg(user_id))[1] as user_id,
        (array_agg(fatura_id))[1] as fatura_id,
        (array_agg(descricao ORDER BY tipo))[1] as descricao,
        MIN(created_at) as created_at
      FROM transacoes
      WHERE tipo IN ('taxa_base_candidato', 'analise_pergunta')
      GROUP BY entrevista_id, DATE_TRUNC('minute', created_at)
    )
    SELECT
      g.*,
      e.titulo as entrevista
    FROM grupos g
    LEFT JOIN entrevistas e ON g.entrevista_id = e.id
    WHERE g.taxa_base > 0 AND g.qtd_perguntas = 0
    ORDER BY g.minuto DESC
  `;

  if (taxasOrfas.length === 0) {
    console.log('   ✅ Não há taxas base órfãs!');
    return;
  }

  console.log(`   Encontradas ${taxasOrfas.length} taxa(s) base órfã(s):`);

  // 2. Para cada taxa órfã, verificar se há análise no sistema
  let taxasParaRemover = [];
  let taxasParaCompletar = [];

  for (let i = 0; i < taxasOrfas.length; i++) {
    const taxa = taxasOrfas[i];
    const data = new Date(taxa.minuto).toLocaleString('pt-BR');

    console.log(`\n   ${i+1}. ${taxa.entrevista || 'N/A'} - ${taxa.descricao || 'Sem descrição'}`);
    console.log(`      Data: ${data}`);
    console.log(`      Entrevista ID: ${taxa.entrevista_id || 'N/A'}`);

    // Verificar se existe alguma análise (candidato_entrevistas) para esta entrevista próximo da data
    const analises = await sql`
      SELECT
        ce.id,
        c.nome as candidato_nome,
        ce.avaliado_em,
        COUNT(r.id) as total_respostas
      FROM candidato_entrevistas ce
      LEFT JOIN candidatos c ON ce.candidato_id = c.id
      LEFT JOIN respostas r ON r.candidato_id = ce.candidato_id AND r.entrevista_id = ce.entrevista_id
      WHERE ce.entrevista_id = ${taxa.entrevista_id}
        AND ce.avaliado_em IS NOT NULL
        AND ABS(EXTRACT(EPOCH FROM (ce.avaliado_em - ${taxa.created_at}::timestamp))) < 86400
      GROUP BY ce.id, c.nome, ce.avaliado_em
      ORDER BY ce.avaliado_em DESC
      LIMIT 5
    `;

    if (analises.length === 0) {
      console.log(`      ❌ Nenhuma análise encontrada - TAXA SERÁ REMOVIDA`);
      taxasParaRemover.push(taxa);
    } else {
      console.log(`      📋 Análises encontradas:`);
      for (const a of analises) {
        const avaliadoEm = new Date(a.avaliado_em).toLocaleString('pt-BR');
        console.log(`         - ${a.candidato_nome || 'Sem nome'}: ${a.total_respostas} respostas (avaliado em ${avaliadoEm})`);

        // Verificar se já foram cobradas as perguntas desta análise
        const perguntasCobradas = await sql`
          SELECT COUNT(*) as total
          FROM transacoes t
          WHERE t.entrevista_id = ${taxa.entrevista_id}
            AND t.tipo = 'analise_pergunta'
            AND ABS(EXTRACT(EPOCH FROM (t.created_at - ${a.avaliado_em}::timestamp))) < 86400
        `;

        const jaCobradas = parseInt(perguntasCobradas[0]?.total || '0');
        if (jaCobradas === 0 && parseInt(a.total_respostas) > 0) {
          console.log(`         ⚠️ ${a.total_respostas} perguntas NÃO foram cobradas - SERÃO ADICIONADAS`);
          taxasParaCompletar.push({
            ...taxa,
            candidatoNome: a.candidato_nome,
            avaliadoEm: a.avaliado_em,
            totalPerguntas: parseInt(a.total_respostas),
            candidatoEntrevistaId: a.id
          });
        } else if (jaCobradas > 0) {
          console.log(`         ✅ ${jaCobradas} perguntas já cobradas`);
        }
      }
    }
  }

  // 3. Resumo
  console.log('\n📊 Resumo:');
  console.log(`   Taxas para remover: ${taxasParaRemover.length}`);
  console.log(`   Taxas para completar (adicionar perguntas): ${taxasParaCompletar.length}`);

  if (taxasParaRemover.length === 0 && taxasParaCompletar.length === 0) {
    console.log('\n✅ Nenhuma ação necessária!');
    return;
  }

  if (dryRun) {
    console.log('\n⚠️  DRY RUN - Nenhuma alteração foi feita.');
    console.log('   Para executar: node scripts/fix-orphan-taxa-base.js --production --execute');
    return;
  }

  // 4. Remover taxas órfãs sem análise
  if (taxasParaRemover.length > 0) {
    console.log('\n🗑️  Removendo taxas base órfãs...');

    for (const taxa of taxasParaRemover) {
      try {
        // Busca o ID exato da transação taxa_base
        const [transacao] = await sql`
          SELECT id FROM transacoes
          WHERE entrevista_id = ${taxa.entrevista_id}
            AND tipo = 'taxa_base_candidato'
            AND DATE_TRUNC('minute', created_at) = ${taxa.minuto}
          LIMIT 1
        `;

        if (transacao) {
          await sql`
            DELETE FROM transacoes WHERE id = ${transacao.id}
          `;
          console.log(`   ✅ Removida: ${taxa.descricao || 'taxa base'} (${taxa.entrevista || 'N/A'})`);
        }
      } catch (err) {
        console.log(`   ❌ Erro ao remover: ${err.message}`);
      }
    }
  }

  // 5. Adicionar perguntas faltantes
  if (taxasParaCompletar.length > 0) {
    console.log('\n➕ Adicionando cobranças de perguntas faltantes...');

    for (const taxa of taxasParaCompletar) {
      try {
        // Buscar as respostas do candidato
        const respostas = await sql`
          SELECT r.id as resposta_id, p.id as pergunta_id, p.texto as pergunta_texto
          FROM respostas r
          INNER JOIN perguntas p ON r.pergunta_id = p.id
          WHERE r.entrevista_id = ${taxa.entrevista_id}
            AND EXISTS (
              SELECT 1 FROM candidato_entrevistas ce
              WHERE ce.candidato_id = r.candidato_id
                AND ce.entrevista_id = r.entrevista_id
                AND ce.id = ${taxa.candidatoEntrevistaId}
            )
        `;

        console.log(`   ${taxa.candidatoNome || 'Candidato'}: ${respostas.length} perguntas`);

        for (const resp of respostas) {
          await sql`
            INSERT INTO transacoes (
              user_id,
              fatura_id,
              entrevista_id,
              resposta_id,
              tipo,
              custo_base,
              markup,
              valor_cobrado,
              descricao,
              status,
              created_at,
              processada_em
            ) VALUES (
              ${taxa.user_id},
              ${taxa.fatura_id},
              ${taxa.entrevista_id},
              ${resp.resposta_id},
              'analise_pergunta',
              '0.025',
              '10.0',
              '0.25',
              ${'Análise - ' + (resp.pergunta_texto || '').substring(0, 50) + ' (correção)'},
              'concluida',
              ${taxa.created_at},
              ${new Date()}
            )
          `;
        }

        console.log(`   ✅ ${respostas.length} cobranças de perguntas adicionadas`);
      } catch (err) {
        console.log(`   ❌ Erro: ${err.message}`);
      }
    }
  }

  // 6. Atualizar totais das faturas
  console.log('\n📊 Atualizando totais das faturas...');
  await sql`
    UPDATE faturas f
    SET
      valor_total = COALESCE((
        SELECT SUM(valor_cobrado::numeric)
        FROM transacoes t
        WHERE t.fatura_id = f.id
      ), 0),
      updated_at = NOW()
    WHERE EXISTS (
      SELECT 1 FROM transacoes t WHERE t.fatura_id = f.id
    )
  `;

  console.log('\n✅ Correção concluída!');
})();
