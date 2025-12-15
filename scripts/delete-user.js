const { neon } = require("@neondatabase/serverless");

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL não está definida");
  process.exit(1);
}

const email = process.argv[2];

if (!email) {
  console.error("Uso: node scripts/delete-user.js <email>");
  process.exit(1);
}

async function deleteUser() {
  const sql = neon(DATABASE_URL);

  console.log(`\n🔍 Buscando usuário: ${email}\n`);

  // Buscar usuário
  const users = await sql`SELECT id, nome, email, plan_type FROM users WHERE email = ${email}`;

  if (users.length === 0) {
    console.log("❌ Usuário não encontrado");
    process.exit(1);
  }

  const user = users[0];
  console.log(`✅ Usuário encontrado: ${user.nome} (${user.id})`);
  console.log(`   Plano: ${user.plan_type}\n`);

  const userId = user.id;

  // Buscar entrevistas do usuário
  const entrevistas = await sql`SELECT id FROM entrevistas WHERE user_id = ${userId}`;
  const entrevistaIds = entrevistas.map((e) => e.id);
  console.log(`📋 Entrevistas encontradas: ${entrevistaIds.length}`);

  // Buscar candidatos do usuário
  const candidatos = await sql`SELECT id FROM candidatos WHERE user_id = ${userId}`;
  const candidatoIds = candidatos.map((c) => c.id);
  console.log(`👥 Candidatos encontrados: ${candidatoIds.length}`);

  // Buscar candidato_entrevistas
  let candidatoEntrevistaIds = [];
  if (entrevistaIds.length > 0) {
    const candidatoEntrevistas = await sql`
      SELECT id FROM candidato_entrevistas
      WHERE entrevista_id = ANY(${entrevistaIds})
    `;
    candidatoEntrevistaIds = candidatoEntrevistas.map((ce) => ce.id);
  }
  console.log(`🔗 Candidato-Entrevistas encontradas: ${candidatoEntrevistaIds.length}`);

  console.log("\n🗑️  Deletando dados...\n");

  // 1. Deletar respostas
  if (candidatoEntrevistaIds.length > 0) {
    const respostasDeleted = await sql`
      DELETE FROM respostas
      WHERE candidato_entrevista_id = ANY(${candidatoEntrevistaIds})
    `;
    console.log(`   ✓ Respostas deletadas`);
  }

  // 2. Deletar candidato_entrevistas
  if (entrevistaIds.length > 0) {
    await sql`
      DELETE FROM candidato_entrevistas
      WHERE entrevista_id = ANY(${entrevistaIds})
    `;
    console.log(`   ✓ Candidato-Entrevistas deletadas`);
  }

  // 3. Deletar perguntas
  if (entrevistaIds.length > 0) {
    await sql`
      DELETE FROM perguntas
      WHERE entrevista_id = ANY(${entrevistaIds})
    `;
    console.log(`   ✓ Perguntas deletadas`);
  }

  // 4. Deletar entrevistas
  await sql`DELETE FROM entrevistas WHERE user_id = ${userId}`;
  console.log(`   ✓ Entrevistas deletadas`);

  // 5. Deletar candidatos
  await sql`DELETE FROM candidatos WHERE user_id = ${userId}`;
  console.log(`   ✓ Candidatos deletados`);

  // 6. Deletar transações
  await sql`DELETE FROM transacoes WHERE user_id = ${userId}`;
  console.log(`   ✓ Transações deletadas`);

  // 7. Deletar faturas
  await sql`DELETE FROM faturas WHERE user_id = ${userId}`;
  console.log(`   ✓ Faturas deletadas`);

  // 8. Deletar team members (onde é owner ou membro)
  await sql`DELETE FROM team_members WHERE owner_id = ${userId} OR member_id = ${userId}`;
  console.log(`   ✓ Team members deletados`);

  // 9. Deletar team invitations (onde convidou ou foi convidado por)
  await sql`DELETE FROM team_invitations WHERE invited_by = ${userId}`;
  console.log(`   ✓ Team invitations deletadas`);

  // 10. Deletar team settings
  await sql`DELETE FROM team_settings WHERE owner_id = ${userId}`;
  console.log(`   ✓ Team settings deletados`);

  // 11. Deletar user cargo preferences
  await sql`DELETE FROM user_cargo_preferences WHERE user_id = ${userId}`;
  console.log(`   ✓ User cargo preferences deletados`);

  // 12. Deletar verification codes
  await sql`DELETE FROM verification_codes WHERE user_id = ${userId}`;
  console.log(`   ✓ Verification codes deletados`);

  // 13. Deletar audit logs (opcional, para limpar completamente)
  await sql`DELETE FROM audit_logs WHERE user_id = ${userId}`;
  console.log(`   ✓ Audit logs deletados`);

  // 14. Deletar perguntas ocultas
  await sql`DELETE FROM perguntas_ocultas WHERE user_id = ${userId}`;
  console.log(`   ✓ Perguntas ocultas deletadas`);

  // 15. Finalmente, deletar o usuário
  await sql`DELETE FROM users WHERE id = ${userId}`;
  console.log(`   ✓ Usuário deletado`);

  console.log(`\n✅ Conta ${email} removida com sucesso!\n`);
}

deleteUser().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});
