import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { z } from "zod";
import {
  getOrCreateTeamSettings,
  updateAutoApprovalSettings,
  canUserPerformAction,
} from "@/lib/services/team-service";

const settingsSchema = z.object({
  // Aprovação automática
  autoApprovalEnabled: z.boolean().optional(),
  autoApprovalMinScore: z.number().min(0).max(100).optional(),
  autoApprovalUseCompatibility: z.boolean().optional(),
  autoApprovalMinCompatibility: z.number().min(0).max(100).optional(),
  autoApprovalNotifyTeam: z.boolean().optional(),
  autoApprovalNotifyCandidate: z.boolean().optional(),
  autoApprovalCandidateMessage: z.string().max(1000).nullable().optional(),

  // Reprovação automática
  autoRejectEnabled: z.boolean().optional(),
  autoRejectMaxScore: z.number().min(0).max(100).optional(),
  autoRejectNotifyCandidate: z.boolean().optional(),
  autoRejectCandidateMessage: z.string().max(1000).nullable().optional(),
});

/**
 * GET /api/time/configuracoes
 * Retorna as configurações do time
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

    const settings = await getOrCreateTeamSettings(userId);

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return NextResponse.json(
      { error: "Erro ao buscar configurações" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/time/configuracoes
 * Atualiza as configurações de aprovação automática do time
 */
export async function PUT(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Verifica permissão
    const canEdit = await canUserPerformAction(userId, userId, "edit_settings");
    if (!canEdit) {
      return NextResponse.json(
        { error: "Você não tem permissão para editar configurações" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = settingsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    // Validações adicionais de lógica
    const data = validation.data;

    // Score de aprovação deve ser maior que score de reprovação
    if (
      data.autoApprovalEnabled &&
      data.autoRejectEnabled &&
      data.autoApprovalMinScore !== undefined &&
      data.autoRejectMaxScore !== undefined
    ) {
      if (data.autoApprovalMinScore <= data.autoRejectMaxScore) {
        return NextResponse.json(
          { error: "O score mínimo de aprovação deve ser maior que o score máximo de reprovação" },
          { status: 400 }
        );
      }
    }

    const settings = await updateAutoApprovalSettings(userId, {
      autoApprovalEnabled: data.autoApprovalEnabled,
      autoApprovalMinScore: data.autoApprovalMinScore,
      autoApprovalUseCompatibility: data.autoApprovalUseCompatibility,
      autoApprovalMinCompatibility: data.autoApprovalMinCompatibility,
      autoApprovalNotifyTeam: data.autoApprovalNotifyTeam,
      autoApprovalNotifyCandidate: data.autoApprovalNotifyCandidate,
      autoApprovalCandidateMessage: data.autoApprovalCandidateMessage ?? undefined,
      autoRejectEnabled: data.autoRejectEnabled,
      autoRejectMaxScore: data.autoRejectMaxScore,
      autoRejectNotifyCandidate: data.autoRejectNotifyCandidate,
      autoRejectCandidateMessage: data.autoRejectCandidateMessage ?? undefined,
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar configurações" },
      { status: 500 }
    );
  }
}
