import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const email = process.argv[2] || 'micaelastavrakas@gmail.com';

  console.log(`\n🔍 Verificando usuário: ${email}\n`);

  // Get user
  const users = await sql`SELECT id, email, nome FROM users WHERE email = ${email}`;
  const user = users[0];

  if (!user) {
    console.log("❌ Usuário não encontrado");
    return;
  }

  console.log("✅ Usuário encontrado:");
  console.log(`   ID: ${user.id}`);
  console.log(`   Nome: ${user.nome}`);
  console.log(`   Email: ${user.email}`);

  // Check team_members where this user is owner
  const asOwner = await sql`SELECT * FROM team_members WHERE owner_id = ${user.id}`;
  console.log(`\n📋 Como owner (membros no time): ${asOwner.length} registro(s)`);
  for (const tm of asOwner) {
    console.log(`   - member_id: ${tm.member_id}, role: ${tm.role}, isActive: ${tm.is_active}`);
  }

  // Check team_members where this user is member
  const asMember = await sql`SELECT * FROM team_members WHERE member_id = ${user.id}`;
  console.log(`\n👤 Como membro (times que participa): ${asMember.length} registro(s)`);
  for (const tm of asMember) {
    console.log(`   - owner_id: ${tm.owner_id}, role: ${tm.role}, isActive: ${tm.is_active}`);
  }

  // Find self-reference (bug: user is member of their own team)
  const selfRef = await sql`
    SELECT * FROM team_members
    WHERE owner_id = ${user.id} AND member_id = ${user.id}
  `;

  if (selfRef.length > 0) {
    console.log("\n⚠️  PROBLEMA ENCONTRADO: Usuário está como membro do próprio time!");
    console.log("   Isso causa o bug de 'conta duplicada'");

    // Fix: delete the self-reference
    console.log("\n🔧 Corrigindo: Removendo auto-referência...");
    await sql`
      DELETE FROM team_members
      WHERE owner_id = ${user.id} AND member_id = ${user.id}
    `;
    console.log("✅ Auto-referência removida com sucesso!");
  } else {
    console.log("\n✅ Nenhum problema de auto-referência encontrado");
  }

  // Verify final state
  const finalAsOwner = await sql`SELECT * FROM team_members WHERE owner_id = ${user.id}`;
  const finalAsMember = await sql`SELECT * FROM team_members WHERE member_id = ${user.id}`;

  console.log("\n📊 Estado final:");
  console.log(`   Membros no time (como owner): ${finalAsOwner.length}`);
  console.log(`   Times que participa (como membro): ${finalAsMember.length}`);
}

main().catch(console.error);
