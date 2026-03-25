/**
 * Script para identificar e reenviar emails que foram marcados como enviados
 * mas que na verdade não foram (antes da correção do sistema de email)
 *
 * Verifica:
 * 1. Notificação 75% do trial
 * 2. Emails de convite de entrevista
 * 3. Emails de aprovação/reprovação automática
 * 4. Emails de encerramento
 */

const { neon } = require("@neondatabase/serverless");

async function verificarEmailsPendentes() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("🔍 Verificando emails que precisam ser reenviados...\n");

  // 1. Verificar notificação 75% - já foi corrigida manualmente
  console.log("=== 1. Notificação 75% Trial ===");
  const users75 = await sql`
    SELECT id, email, nome, notificacao_75_enviada_em
    FROM users
    WHERE notificacao_75_enviada_em IS NOT NULL
      AND plan_type = 'free_trial'
  `;
  console.log(`Usuários com notificação 75%: ${users75.length}`);
  users75.forEach(u => {
    console.log(`  - ${u.email} (enviado em: ${u.notificacao_75_enviada_em})`);
  });

  // 2. Verificar convites de entrevista sem data de envio
  console.log("\n=== 2. Convites de Entrevista ===");
  const convitesPendentes = await sql`
    SELECT
      ce.id,
      ce.convite_enviado_em,
      ce.status,
      ce.created_at,
      c.nome as candidato_nome,
      c.email as candidato_email,
      e.titulo as entrevista_titulo,
      e.cargo as entrevista_cargo,
      e.slug as entrevista_slug,
      u.empresa as empresa,
      u.nome as recrutador_nome
    FROM candidato_entrevistas ce
    JOIN candidatos c ON ce.candidato_id = c.id
    JOIN entrevistas e ON ce.entrevista_id = e.id
    JOIN users u ON e.user_id = u.id
    WHERE ce.convite_enviado_em IS NULL
      AND ce.status = 'pendente'
      AND e.status = 'active'
    ORDER BY ce.created_at DESC
    LIMIT 20
  `;
  console.log(`Convites pendentes (sem data de envio): ${convitesPendentes.length}`);
  convitesPendentes.forEach(cp => {
    console.log(`  - ${cp.candidato_email} para "${cp.entrevista_titulo}" (criado em: ${cp.created_at})`);
  });

  // 3. Verificar decisões automáticas sem email enviado
  console.log("\n=== 3. Decisões Automáticas (Aprovação/Reprovação) ===");
  const decisoesSemEmail = await sql`
    SELECT
      ce.id,
      ce.decisao_recrutador,
      ce.decisao_recrutador_em,
      ce.email_decisao_enviado_em,
      c.nome as candidato_nome,
      c.email as candidato_email,
      e.titulo as entrevista_titulo,
      e.cargo as entrevista_cargo
    FROM candidato_entrevistas ce
    JOIN candidatos c ON ce.candidato_id = c.id
    JOIN entrevistas e ON ce.entrevista_id = e.id
    WHERE ce.decisao_recrutador IN ('aprovado', 'reprovado')
      AND ce.email_decisao_enviado_em IS NULL
    ORDER BY ce.decisao_recrutador_em DESC
  `;
  console.log(`Decisões sem email enviado: ${decisoesSemEmail.length}`);
  decisoesSemEmail.forEach(d => {
    console.log(`  - ${d.candidato_email}: ${d.decisao_recrutador} em ${d.decisao_recrutador_em}`);
  });

  // 4. Verificar emails de encerramento pendentes
  console.log("\n=== 4. Emails de Encerramento ===");
  const encerramentosPendentes = await sql`
    SELECT
      ce.id,
      ce.status,
      ce.email_encerramento_enviado_em,
      c.nome as candidato_nome,
      c.email as candidato_email,
      e.titulo as entrevista_titulo
    FROM candidato_entrevistas ce
    JOIN candidatos c ON ce.candidato_id = c.id
    JOIN entrevistas e ON ce.entrevista_id = e.id
    WHERE ce.status IN ('encerrada', 'concluida')
      AND ce.email_encerramento_enviado_em IS NULL
      AND ce.decisao_recrutador IS NULL
    ORDER BY ce.updated_at DESC
    LIMIT 20
  `;
  console.log(`Encerramentos sem email: ${encerramentosPendentes.length}`);
  encerramentosPendentes.forEach(ep => {
    console.log(`  - ${ep.candidato_email} (${ep.status})`);
  });

  console.log("\n✅ Verificação concluída!");

  return {
    users75: users75.length,
    convitesPendentes: convitesPendentes.length,
    decisoesSemEmail: decisoesSemEmail.length,
    encerramentosPendentes: encerramentosPendentes.length,
    detalhes: {
      convitesPendentes,
      decisoesSemEmail,
    }
  };
}

verificarEmailsPendentes().catch(console.error);
