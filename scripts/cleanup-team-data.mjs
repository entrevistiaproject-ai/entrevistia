import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  console.log(`\n🔍 LIMPEZA GLOBAL DE DADOS DE TIME\n`);
  console.log('═══════════════════════════════════════════════════');

  // 1. Find and remove all self-references in team_members
  console.log('\n1️⃣  Verificando auto-referências em team_members...');

  const selfRefs = await sql`
    SELECT tm.*, u.email, u.nome
    FROM team_members tm
    JOIN users u ON tm.owner_id = u.id
    WHERE tm.owner_id = tm.member_id
  `;

  if (selfRefs.length > 0) {
    console.log(`   ⚠️  Encontradas ${selfRefs.length} auto-referências:`);
    for (const ref of selfRefs) {
      console.log(`      - ${ref.email} (${ref.nome})`);
    }

    await sql`DELETE FROM team_members WHERE owner_id = member_id`;
    console.log(`   ✅ Removidas ${selfRefs.length} auto-referências`);
  } else {
    console.log('   ✅ Nenhuma auto-referência encontrada');
  }

  // 2. Find invites marked as accepted but user doesn't exist
  console.log('\n2️⃣  Verificando convites órfãos (accepted mas usuário não existe)...');

  const orphanInvites = await sql`
    SELECT ti.*, u.email as owner_email
    FROM team_invitations ti
    JOIN users u ON ti.invited_by = u.id
    WHERE ti.status = 'accepted'
    AND NOT EXISTS (
      SELECT 1 FROM users WHERE email = ti.invited_email
    )
  `;

  if (orphanInvites.length > 0) {
    console.log(`   ⚠️  Encontrados ${orphanInvites.length} convites órfãos:`);
    for (const inv of orphanInvites) {
      console.log(`      - ${inv.invited_email} (convidado por ${inv.owner_email})`);
    }

    // Reset to pending
    await sql`
      UPDATE team_invitations
      SET status = 'pending', responded_at = NULL, responded_by = NULL
      WHERE status = 'accepted'
      AND NOT EXISTS (
        SELECT 1 FROM users WHERE email = team_invitations.invited_email
      )
    `;
    console.log(`   ✅ Resetados ${orphanInvites.length} convites para 'pending'`);
  } else {
    console.log('   ✅ Nenhum convite órfão encontrado');
  }

  // 3. Find team_members without corresponding user
  console.log('\n3️⃣  Verificando team_members com usuário inexistente...');

  const orphanMembers = await sql`
    SELECT tm.*
    FROM team_members tm
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = tm.member_id)
    OR NOT EXISTS (SELECT 1 FROM users WHERE id = tm.owner_id)
  `;

  if (orphanMembers.length > 0) {
    console.log(`   ⚠️  Encontrados ${orphanMembers.length} registros órfãos`);

    await sql`
      DELETE FROM team_members
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = team_members.member_id)
      OR NOT EXISTS (SELECT 1 FROM users WHERE id = team_members.owner_id)
    `;
    console.log(`   ✅ Removidos ${orphanMembers.length} registros`);
  } else {
    console.log('   ✅ Nenhum registro órfão encontrado');
  }

  // 4. Find duplicate invites (same email, same inviter, pending)
  console.log('\n4️⃣  Verificando convites duplicados pendentes...');

  const duplicates = await sql`
    SELECT invited_email, invited_by, COUNT(*) as count
    FROM team_invitations
    WHERE status = 'pending'
    GROUP BY invited_email, invited_by
    HAVING COUNT(*) > 1
  `;

  if (duplicates.length > 0) {
    console.log(`   ⚠️  Encontrados ${duplicates.length} grupos de convites duplicados`);

    // Keep only the most recent one for each email/inviter pair
    for (const dup of duplicates) {
      console.log(`      - ${dup.invited_email} (${dup.count} convites)`);

      // Get all but the most recent
      const toDelete = await sql`
        SELECT id FROM team_invitations
        WHERE invited_email = ${dup.invited_email}
        AND invited_by = ${dup.invited_by}
        AND status = 'pending'
        ORDER BY created_at DESC
        OFFSET 1
      `;

      if (toDelete.length > 0) {
        const ids = toDelete.map(d => d.id);
        await sql`DELETE FROM team_invitations WHERE id = ANY(${ids})`;
        console.log(`      ✅ Removidos ${toDelete.length} duplicados`);
      }
    }
  } else {
    console.log('   ✅ Nenhum convite duplicado encontrado');
  }

  // 5. Summary
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📊 RESUMO FINAL');
  console.log('═══════════════════════════════════════════════════');

  const stats = await sql`
    SELECT
      (SELECT COUNT(*) FROM team_members) as total_members,
      (SELECT COUNT(*) FROM team_invitations WHERE status = 'pending') as pending_invites,
      (SELECT COUNT(*) FROM team_invitations WHERE status = 'accepted') as accepted_invites,
      (SELECT COUNT(*) FROM team_invitations WHERE status = 'cancelled') as cancelled_invites,
      (SELECT COUNT(DISTINCT owner_id) FROM team_members) as teams_with_members
  `;

  const s = stats[0];
  console.log(`\nTeam Members: ${s.total_members}`);
  console.log(`Times com membros: ${s.teams_with_members}`);
  console.log(`\nConvites:`);
  console.log(`  - Pendentes: ${s.pending_invites}`);
  console.log(`  - Aceitos: ${s.accepted_invites}`);
  console.log(`  - Cancelados: ${s.cancelled_invites}`);
}

main().catch(console.error);
