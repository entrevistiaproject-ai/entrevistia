import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, entrevistas, teamMembers } from "@/lib/db/schema";
import { sql, desc, isNull, eq, and, count } from "drizzle-orm";

/**
 * GET /api/admin/usuarios-lista
 * Lista todos os usuários com indicadores (cargo, logins, último acesso)
 * SEM dados financeiros (saldo, limite, gastos, faturas)
 */
export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageUsers) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();

    // Buscar todos os usuários
    const usuariosBasicos = await db
      .select({
        id: users.id,
        nome: users.nome,
        email: users.email,
        empresa: users.empresa,
        cargo: users.cargo,
        telefone: users.telefone,
        planType: users.planType,
        planStatus: users.planStatus,
        isActive: users.isActive,
        isTestAccount: users.isTestAccount,
        emailVerified: users.emailVerified,
        createdAt: users.createdAt,
        lastLoginAt: users.lastLoginAt,
        loginCount: users.loginCount,
        usageEntrevistas: users.usageEntrevistas,
        usageCandidatos: users.usageCandidatos,
      })
      .from(users)
      .where(isNull(users.deletedAt))
      .orderBy(desc(users.createdAt));

    // Buscar contagem de entrevistas por usuário
    const entrevistasQuery = await db
      .select({
        userId: entrevistas.userId,
        total: count(),
      })
      .from(entrevistas)
      .groupBy(entrevistas.userId);

    const entrevistasMap = new Map(
      entrevistasQuery.map((e) => [e.userId, Number(e.total) || 0])
    );

    // Buscar informações de membros de time (quem é membro de outro time)
    const teamMembersQuery = await db
      .select({
        memberId: teamMembers.memberId,
        ownerId: teamMembers.ownerId,
        role: teamMembers.role,
        ownerNome: users.nome,
        ownerEmail: users.email,
      })
      .from(teamMembers)
      .innerJoin(users, eq(teamMembers.ownerId, users.id))
      .where(eq(teamMembers.isActive, true));

    const teamMembersMap = new Map(
      teamMembersQuery.map((tm) => [tm.memberId, {
        ownerId: tm.ownerId,
        ownerNome: tm.ownerNome,
        ownerEmail: tm.ownerEmail,
        role: tm.role,
      }])
    );

    // Buscar quantos membros cada usuário tem no seu time
    const teamMemberCountQuery = await db
      .select({
        ownerId: teamMembers.ownerId,
        count: count(),
      })
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .groupBy(teamMembers.ownerId);

    const teamMemberCountMap = new Map(
      teamMemberCountQuery.map((tc) => [tc.ownerId, Number(tc.count) || 0])
    );

    // Montar resposta final
    const usuariosComDados = usuariosBasicos.map((usuario) => {
      const totalEntrevistas = entrevistasMap.get(usuario.id) || usuario.usageEntrevistas || 0;
      const teamMembership = teamMembersMap.get(usuario.id);
      const teamMemberCount = teamMemberCountMap.get(usuario.id) || 0;

      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        empresa: usuario.empresa,
        cargo: usuario.cargo,
        telefone: usuario.telefone,
        planType: usuario.planType,
        planStatus: usuario.planStatus,
        isActive: usuario.isActive,
        emailVerified: usuario.emailVerified ? usuario.emailVerified.toISOString() : null,
        createdAt: usuario.createdAt.toISOString(),
        ultimoLogin: usuario.lastLoginAt ? usuario.lastLoginAt.toISOString() : null,
        totalLogins: usuario.loginCount || 0,
        totalEntrevistas,
        totalCandidatos: usuario.usageCandidatos || 0,
        isTeste: usuario.isTestAccount || false,
        // Informações de time
        isTeamMember: !!teamMembership,
        teamOwner: teamMembership ? {
          id: teamMembership.ownerId,
          nome: teamMembership.ownerNome,
          email: teamMembership.ownerEmail,
        } : null,
        teamRole: teamMembership?.role || null,
        teamMemberCount,
      };
    });

    return NextResponse.json({ usuarios: usuariosComDados });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
