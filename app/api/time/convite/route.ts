import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { z } from "zod";
import {
  createTeamInvitation,
  canUserPerformAction,
  TeamRole,
} from "@/lib/services/team-service";

const inviteSchema = z.object({
  email: z.string().email("Email inválido"),
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
  role: z.enum(["admin", "recruiter", "viewer"]),
  message: z.string().max(500, "Mensagem deve ter no máximo 500 caracteres").optional(),
});

/**
 * POST /api/time/convite
 * Cria um novo convite para o time
 */
export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Verifica permissão
    const canInvite = await canUserPerformAction(userId, userId, "invite");
    if (!canInvite) {
      return NextResponse.json(
        { error: "Você não tem permissão para convidar membros" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = inviteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const { email, nome, role, message } = validation.data;

    const result = await createTeamInvitation({
      invitedBy: userId,
      invitedEmail: email,
      invitedName: nome,
      role: role as TeamRole,
      message,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      invitation: result.invitation,
    });
  } catch (error) {
    console.error("Erro ao criar convite:", error);
    return NextResponse.json(
      { error: "Erro ao criar convite" },
      { status: 500 }
    );
  }
}
