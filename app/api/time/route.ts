import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  getTeamMembers,
  getPendingInvitations,
  getOrCreateTeamSettings,
  getTeamsUserBelongsTo,
  getTeamMemberCount,
  MAX_TEAM_MEMBERS,
} from "@/lib/services/team-service";

/**
 * GET /api/time
 * Retorna informações do time do usuário logado
 * - Membros do time
 * - Convites pendentes
 * - Configurações do time
 * - Times que o usuário faz parte (se for membro de outro time)
 */
export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const db = getDB();

    // Busca dados do usuário (owner)
    const [owner] = await db
      .select({
        id: users.id,
        nome: users.nome,
        email: users.email,
        empresa: users.empresa,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!owner) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Busca membros do time, convites pendentes e configurações em paralelo
    const [members, invitations, settings, teamsUserBelongsTo, memberCount] = await Promise.all([
      getTeamMembers(userId),
      getPendingInvitations(userId),
      getOrCreateTeamSettings(userId),
      getTeamsUserBelongsTo(userId),
      getTeamMemberCount(userId),
    ]);

    return NextResponse.json({
      owner: {
        id: owner.id,
        nome: owner.nome,
        email: owner.email,
        empresa: owner.empresa,
        role: "owner" as const,
      },
      members,
      invitations,
      settings,
      teamsUserBelongsTo,
      memberCount,
      maxMembers: MAX_TEAM_MEMBERS,
    });
  } catch (error) {
    console.error("Erro ao buscar time:", error);
    return NextResponse.json(
      { error: "Erro ao buscar informações do time" },
      { status: 500 }
    );
  }
}
