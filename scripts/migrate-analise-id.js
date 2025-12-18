/**
 * Script para migrar transações existentes, atribuindo analiseId
 *
 * Lógica:
 * 1. Buscar todas as transações sem analiseId
 * 2. Para cada taxa_base_candidato, criar um UUID e atribuir a ela
 * 3. Encontrar as analise_pergunta da mesma entrevista criadas até 2 min após
 * 4. Atribuir o mesmo analiseId a essas perguntas
 */

const { neon } = require("@neondatabase/serverless");
const { randomUUID } = require("crypto");

async function migrateAnaliseId() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔄 Iniciando migração de analiseId...\n");

  // 1. Buscar todas as transações sem analiseId ordenadas por data
  const transacoesSemAnaliseId = await sql`
    SELECT id, tipo, entrevista_id, created_at
    FROM transacoes
    WHERE analise_id IS NULL
      AND (tipo = 'taxa_base_candidato' OR tipo = 'analise_pergunta')
    ORDER BY created_at ASC
  `;

  console.log(`📊 Total de transações sem analiseId: ${transacoesSemAnaliseId.length}`);

  if (transacoesSemAnaliseId.length === 0) {
    console.log("✅ Nenhuma transação para migrar!");
    return;
  }

  // Separar taxas base e perguntas
  const taxasBase = transacoesSemAnaliseId.filter(t => t.tipo === "taxa_base_candidato");
  const perguntas = transacoesSemAnaliseId.filter(t => t.tipo === "analise_pergunta");

  console.log(`📋 Taxas base: ${taxasBase.length}`);
  console.log(`📋 Perguntas: ${perguntas.length}\n`);

  const perguntasUsadas = new Set();
  let totalMigradas = 0;

  // 2. Para cada taxa base, agrupar com suas perguntas
  for (const taxaBase of taxasBase) {
    const analiseId = randomUUID();
    const taxaBaseTime = new Date(taxaBase.created_at).getTime();

    // Encontrar perguntas da mesma entrevista criadas até 2 min após a taxa base
    const perguntasDaAnalise = perguntas.filter(p => {
      if (perguntasUsadas.has(p.id)) return false;
      if (p.entrevista_id !== taxaBase.entrevista_id) return false;

      const perguntaTime = new Date(p.created_at).getTime();
      const diffMs = perguntaTime - taxaBaseTime;

      // Perguntas devem estar entre -1s e 120s após a taxa base
      return diffMs >= -1000 && diffMs <= 120000;
    });

    // Marcar perguntas como usadas
    perguntasDaAnalise.forEach(p => perguntasUsadas.add(p.id));

    // IDs para atualizar
    const idsParaAtualizar = [taxaBase.id, ...perguntasDaAnalise.map(p => p.id)];

    // Atualizar no banco
    await sql`
      UPDATE transacoes
      SET analise_id = ${analiseId}::uuid
      WHERE id = ANY(${idsParaAtualizar}::uuid[])
    `;

    totalMigradas += idsParaAtualizar.length;

    console.log(`✅ Análise ${analiseId.substring(0, 8)}... - Taxa base + ${perguntasDaAnalise.length} perguntas`);
  }

  // 3. Perguntas órfãs (sem taxa base associada) - agrupar por entrevista + janela de tempo
  const perguntasOrfas = perguntas.filter(p => !perguntasUsadas.has(p.id));

  if (perguntasOrfas.length > 0) {
    console.log(`\n⚠️ ${perguntasOrfas.length} perguntas órfãs encontradas (sem taxa base)`);

    // Agrupar por entrevista + janela de 2 minutos
    const grupos = new Map();

    perguntasOrfas.forEach(p => {
      const data = new Date(p.created_at);
      const minutos = Math.floor(data.getMinutes() / 2) * 2;
      data.setMinutes(minutos, 0, 0);
      const chave = `${p.entrevista_id || "sem-entrevista"}_${data.toISOString()}`;

      if (!grupos.has(chave)) {
        grupos.set(chave, []);
      }
      grupos.get(chave).push(p);
    });

    for (const [chave, perguntasDoGrupo] of grupos) {
      const analiseId = randomUUID();
      const idsParaAtualizar = perguntasDoGrupo.map(p => p.id);

      await sql`
        UPDATE transacoes
        SET analise_id = ${analiseId}::uuid
        WHERE id = ANY(${idsParaAtualizar}::uuid[])
      `;

      totalMigradas += idsParaAtualizar.length;

      console.log(`✅ Grupo órfão ${analiseId.substring(0, 8)}... - ${perguntasDoGrupo.length} perguntas`);
    }
  }

  console.log(`\n🎉 Migração concluída! Total de transações atualizadas: ${totalMigradas}`);
}

migrateAnaliseId().catch(console.error);
