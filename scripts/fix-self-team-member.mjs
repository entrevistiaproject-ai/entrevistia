import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const email = process.argv[2] || 'micaelastavrakas@gmail.com';

  console.log(`\n🔍 Verificando auto-referência para: ${email}\n`);

  // Get user
  const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (!user) {
    console.log('❌ Usuário não encontrado');
    return;
  }

  console.log(`✅ Usuário: ${user.nome} (${user.id})`);

  // Check for self-reference in team_members
  const selfRef = await sql`
    SELECT * FROM team_members
    WHERE owner_id = ${user.id} AND member_id = ${user.id}
  `;

  if (selfRef.length > 0) {
    console.log('\n⚠️  ENCONTRADO: Auto-referência em team_members!');
    console.log('   Removendo...');

    await sql`
      DELETE FROM team_members
      WHERE owner_id = ${user.id} AND member_id = ${user.id}
    `;
    console.log('   ✅ Removido!');
  } else {
    console.log('\n✅ Sem auto-referência em team_members');
  }

  // Check all team_members for this user
  const asOwner = await sql`SELECT * FROM team_members WHERE owner_id = ${user.id}`;
  const asMember = await sql`SELECT * FROM team_members WHERE member_id = ${user.id}`;

  console.log('\n📊 ESTADO FINAL:');
  console.log(`\nComo owner: ${asOwner.length} membros`);
  for (const m of asOwner) {
    const [member] = await sql`SELECT email FROM users WHERE id = ${m.member_id}`;
    console.log(`  - ${member?.email || m.member_id} (role: ${m.role})`);
  }

  console.log(`\nComo membro de outro time: ${asMember.length} times`);
  for (const m of asMember) {
    const [owner] = await sql`SELECT email FROM users WHERE id = ${m.owner_id}`;
    console.log(`  - Time de: ${owner?.email || m.owner_id} (role: ${m.role})`);
  }
}

main().catch(console.error);
