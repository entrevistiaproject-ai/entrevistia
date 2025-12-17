import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const email = process.argv[2] || 'micaelastavrakas@gmail.com';

  console.log(`\n🔍 Debug completo para: ${email}\n`);

  // Get user
  const users = await sql`SELECT * FROM users WHERE email = ${email}`;
  const user = users[0];

  if (!user) {
    console.log("❌ Usuário não encontrado");
    return;
  }

  console.log("═══════════════════════════════════════════════════");
  console.log("USUÁRIO");
  console.log("═══════════════════════════════════════════════════");
  console.log(`ID: ${user.id}`);
  console.log(`Nome: ${user.nome}`);
  console.log(`Email: ${user.email}`);
  console.log(`Empresa: ${user.empresa}`);
  console.log(`Plano: ${user.plan_type}`);
  console.log(`Ativo: ${user.is_active}`);

  // Check team_members
  console.log("\n═══════════════════════════════════════════════════");
  console.log("TEAM_MEMBERS (como owner)");
  console.log("═══════════════════════════════════════════════════");
  const asOwner = await sql`SELECT * FROM team_members WHERE owner_id = ${user.id}`;
  if (asOwner.length === 0) {
    console.log("Nenhum membro no time");
  } else {
    for (const tm of asOwner) {
      const [member] = await sql`SELECT nome, email FROM users WHERE id = ${tm.member_id}`;
      console.log(`- ${member?.email || 'N/A'} (${member?.nome || 'N/A'})`);
      console.log(`  Role: ${tm.role}, Active: ${tm.is_active}`);
      console.log(`  ID: ${tm.id}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("TEAM_MEMBERS (como membro)");
  console.log("═══════════════════════════════════════════════════");
  const asMember = await sql`SELECT * FROM team_members WHERE member_id = ${user.id}`;
  if (asMember.length === 0) {
    console.log("Não é membro de nenhum time");
  } else {
    for (const tm of asMember) {
      const [owner] = await sql`SELECT nome, email FROM users WHERE id = ${tm.owner_id}`;
      console.log(`- Time de: ${owner?.email || 'N/A'} (${owner?.nome || 'N/A'})`);
      console.log(`  Role: ${tm.role}, Active: ${tm.is_active}`);
      console.log(`  ID: ${tm.id}`);
    }
  }

  // Check invitations
  console.log("\n═══════════════════════════════════════════════════");
  console.log("TEAM_INVITATIONS (enviados)");
  console.log("═══════════════════════════════════════════════════");
  const sentInvites = await sql`SELECT * FROM team_invitations WHERE invited_by = ${user.id}`;
  if (sentInvites.length === 0) {
    console.log("Nenhum convite enviado");
  } else {
    for (const inv of sentInvites) {
      console.log(`- Para: ${inv.invited_email}`);
      console.log(`  Status: ${inv.status}, Role: ${inv.role}`);
      console.log(`  Expira em: ${inv.expires_at}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("TEAM_INVITATIONS (recebidos)");
  console.log("═══════════════════════════════════════════════════");
  const receivedInvites = await sql`SELECT * FROM team_invitations WHERE invited_email = ${user.email}`;
  if (receivedInvites.length === 0) {
    console.log("Nenhum convite recebido");
  } else {
    for (const inv of receivedInvites) {
      const [sender] = await sql`SELECT nome, email FROM users WHERE id = ${inv.invited_by}`;
      console.log(`- De: ${sender?.email || 'N/A'} (${sender?.nome || 'N/A'})`);
      console.log(`  Status: ${inv.status}, Role: ${inv.role}`);
      console.log(`  ID: ${inv.id}`);
    }
  }

  // Check entrevistas
  console.log("\n═══════════════════════════════════════════════════");
  console.log("ENTREVISTAS (total)");
  console.log("═══════════════════════════════════════════════════");
  const entrevistas = await sql`SELECT COUNT(*) as count FROM entrevistas WHERE user_id = ${user.id} AND deleted_at IS NULL`;
  console.log(`Total de entrevistas: ${entrevistas[0].count}`);

  // Check candidatos
  console.log("\n═══════════════════════════════════════════════════");
  console.log("CANDIDATOS (total)");
  console.log("═══════════════════════════════════════════════════");
  const candidatos = await sql`SELECT COUNT(*) as count FROM candidatos WHERE user_id = ${user.id} AND deleted_at IS NULL`;
  console.log(`Total de candidatos: ${candidatos[0].count}`);
}

main().catch(console.error);
