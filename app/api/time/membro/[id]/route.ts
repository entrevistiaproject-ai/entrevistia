import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { z } from "zod";
import {
  removeTeamMember,
  updateMemberRole,
  updateMemberPermissions,
  canUserPerformAction,
  TeamRole,
} from "@/lib/services/team-service";

const updateRoleSchema = z.object({
  role: z.enum(["admin", "recruiter", "financial", "viewer"]),
});

const updatePermissionsSchema = z.object({
  permissions: z.object({
    canViewInterviews: z.boolean().optional(),
    canCreateInterviews: z.boolean().optional(),
    canEditInterviews: z.boolean().optional(),
    canDeleteInterviews: z.boolean().optional(),
    canViewCandidates: z.boolean().optional(),
    canApproveCandidates: z.boolean().optional(),
    canRejectCandidates: z.boolean().optional(),
    canViewFinancials: z.boolean().optional(),
    canInviteMembers: z.boolean().optional(),
    canRemoveMembers: z.boolean().optional(),
    canEditMemberPermissions: z.boolean().optional(),
    canEditSettings: z.boolean().optional(),
    canEditAutoApproval: z.boolean().optional(),
  }),
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

/**
 * PATCH /api/time/membro/[id]
 * Atualiza as permissões granulares de um membro
 */
export async function PATCH(
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

    // Verifica permissão para editar permissões de membros
    const canEditPermissions = await canUserPerformAction(userId, userId, "edit_permissions");
    if (!canEditPermissions) {
      return NextResponse.json(
        { error: "Você não tem permissão para editar permissões de membros" },
        { status: 403 }
      );
    }

    const { id: memberId } = await params;
    const body = await request.json();
    const validation = updatePermissionsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const { permissions } = validation.data;

    const result = await updateMemberPermissions(userId, memberId, permissions);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar permissões:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar permissões" },
      { status: 500 }
    );
  }
}
