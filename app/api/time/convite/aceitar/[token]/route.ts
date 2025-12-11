import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { teamInvitations, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { acceptTeamInvitation, rejectTeamInvitation } from "@/lib/services/team-service";

/**
 * GET /api/time/convite/aceitar/[token]
 * Obtém informações do convite pelo token (para exibir na página)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const db = getDB();

    const [invitation] = await db
      .select()
      .from(teamInvitations)
      .where(eq(teamInvitations.token, token))
      .limit(1);

    if (!invitation) {
      return NextResponse.json(
        { error: "Convite não encontrado" },
        { status: 404 }
      );
    }

    // Busca dados do owner
    const [owner] = await db
      .select({
        nome: users.nome,
        empresa: users.empresa,
      })
      .from(users)
      .where(eq(users.id, invitation.invitedBy));

    // Verifica se expirou
    const isExpired = invitation.expiresAt < new Date();
    const isUsed = invitation.status !== "pending";

    return NextResponse.json({
      invitation: {
        id: invitation.id,
        invitedEmail: invitation.invitedEmail,
        invitedName: invitation.invitedName,
        role: invitation.role,
        message: invitation.message,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
        createdAt: invitation.createdAt,
      },
      owner: owner ? {
        nome: owner.nome,
        empresa: owner.empresa,
      } : null,
      isExpired,
      isUsed,
      canAccept: !isExpired && !isUsed,
    });
  } catch (error) {
    console.error("Erro ao buscar convite:", error);
    return NextResponse.json(
      { error: "Erro ao buscar convite" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/time/convite/aceitar/[token]
 * Aceita ou recusa um convite
 * Body: { action: "accept" | "reject" }
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Você precisa estar logado para aceitar o convite" },
        { status: 401 }
      );
    }

    const { token } = await params;
    const body = await request.json();
    const { action } = body;

    if (action !== "accept" && action !== "reject") {
      return NextResponse.json(
        { error: "Ação inválida. Use 'accept' ou 'reject'" },
        { status: 400 }
      );
    }

    if (action === "accept") {
      const result = await acceptTeamInvitation(token, userId);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Convite aceito com sucesso! Você agora faz parte do time.",
      });
    } else {
      const result = await rejectTeamInvitation(token, userId);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Convite recusado.",
      });
    }
  } catch (error) {
    console.error("Erro ao processar convite:", error);
    return NextResponse.json(
      { error: "Erro ao processar convite" },
      { status: 500 }
    );
  }
}
