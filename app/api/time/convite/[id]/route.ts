import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { cancelInvitation } from "@/lib/services/team-service";

/**
 * DELETE /api/time/convite/[id]
 * Cancela um convite pendente
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

    const { id } = await params;

    const result = await cancelInvitation(userId, id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao cancelar convite:", error);
    return NextResponse.json(
      { error: "Erro ao cancelar convite" },
      { status: 500 }
    );
  }
}
