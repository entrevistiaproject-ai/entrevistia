import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { z } from "zod";
import {
  removeTeamMember,
  updateMemberRole,
  canUserPerformAction,
  TeamRole,
} from "@/lib/services/team-service";

const updateRoleSchema = z.object({
  role: z.enum(["admin", "recruiter", "viewer"]),
});

/**
 * PUT /api/time/membro/[id]
 * Atualiza a role de um membro do time
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Verifica permissão
    const canManage = await canUserPerformAction(userId, userId, "invite");
    if (!canManage) {
      return NextResponse.json(
        { error: "Você não tem permissão para gerenciar membros" },
        { status: 403 }
      );
    }

    const { id: memberId } = await params;
    const body = await request.json();
    const validation = updateRoleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const { role } = validation.data;

    const result = await updateMemberRole(userId, memberId, role as TeamRole);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar membro:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar membro" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/time/membro/[id]
 * Remove um membro do time
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Verifica permissão
    const canRemove = await canUserPerformAction(userId, userId, "remove");
    if (!canRemove) {
      return NextResponse.json(
        { error: "Você não tem permissão para remover membros" },
        { status: 403 }
      );
    }

    const { id: memberId } = await params;

    const result = await removeTeamMember(userId, memberId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao remover membro:", error);
    return NextResponse.json(
      { error: "Erro ao remover membro" },
      { status: 500 }
    );
  }
}
