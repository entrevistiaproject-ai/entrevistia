import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const email = process.argv[2] || 'micaelastavrakas@gmail.com';

  console.log(`\n🔍 Verificando convites órfãos para: ${email}\n`);

  // Get user
  const users = await sql`SELECT * FROM users WHERE email = ${email}`;
  const user = users[0];

  if (!user) {
    console.log("❌ Usuário não encontrado");
    return;
  }

  console.log(`✅ Usuário: ${user.nome} (${user.email})`);
  console.log(`   ID: ${user.id}\n`);

  // Find all invitations sent by this user
  const invites = await sql`
    SELECT * FROM team_invitations
    WHERE invited_by = ${user.id}
    ORDER BY created_at DESC
  `;

  console.log(`📧 Total de convites enviados: ${invites.length}\n`);

  for (const inv of invites) {
    console.log(`═══════════════════════════════════════════════════`);
    console.log(`Para: ${inv.invited_email}`);
    console.log(`Status: ${inv.status}`);
    console.log(`Role: ${inv.role}`);
    console.log(`ID: ${inv.id}`);

    // Check if the invited email has a user account
    const [invitedUser] = await sql`SELECT id, nome, email FROM users WHERE email = ${inv.invited_email}`;

    if (!invitedUser) {
      console.log(`⚠️  PROBLEMA: Email não existe na tabela users!`);

      if (inv.status === 'accepted') {
        console.log(`   O convite foi marcado como 'accepted' mas o usuário não existe.`);
        console.log(`   Isso é inconsistente - resetando para 'pending'...`);

        await sql`
          UPDATE team_invitations
          SET status = 'pending',
              responded_at = NULL,
              responded_by = NULL
          WHERE id = ${inv.id}
        `;
        console.log(`   ✅ Convite resetado para 'pending'`);
      }
    } else {
      console.log(`✅ Usuário existe: ${invitedUser.nome} (${invitedUser.id})`);

      // Check if team_member exists
      const [tm] = await sql`
        SELECT * FROM team_members
        WHERE owner_id = ${user.id} AND member_id = ${invitedUser.id}
      `;

      if (inv.status === 'accepted' && !tm) {
        console.log(`⚠️  PROBLEMA: Convite aceito mas não há registro em team_members!`);
        console.log(`   Criando registro em team_members...`);

        await sql`
          INSERT INTO team_members (owner_id, member_id, role, is_active)
          VALUES (${user.id}, ${invitedUser.id}, ${inv.role}, true)
        `;
        console.log(`   ✅ Registro criado em team_members`);
      } else if (tm) {
        console.log(`✅ Registro em team_members existe: role=${tm.role}, active=${tm.is_active}`);
      }
    }
  }

  // Final verification
  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`📊 VERIFICAÇÃO FINAL`);
  console.log(`═══════════════════════════════════════════════════`);

  const finalMembers = await sql`SELECT * FROM team_members WHERE owner_id = ${user.id}`;
  console.log(`Membros no time: ${finalMembers.length}`);

  for (const tm of finalMembers) {
    const [member] = await sql`SELECT nome, email FROM users WHERE id = ${tm.member_id}`;
    console.log(`  - ${member?.email || 'N/A'} (${tm.role}, active: ${tm.is_active})`);
  }
}

main().catch(console.error);
