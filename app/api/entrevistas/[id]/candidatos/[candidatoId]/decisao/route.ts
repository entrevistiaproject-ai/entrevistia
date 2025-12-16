import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas, entrevistas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getEffectiveOwnerId } from "@/lib/services/team-service";

/**
 * PATCH /api/entrevistas/[id]/candidatos/[candidatoId]/decisao
 *
 * Atualiza a decisão do recrutador para um candidato em uma entrevista específica.
 * A decisão é independente da recomendação da IA.
 *
 * Body:
 * - decisao: 'aprovado' | 'reprovado' | null (para remover decisão)
 * - observacao?: string (observação opcional do recrutador)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; candidatoId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Usa o owner efetivo para membros de time
    const effectiveOwnerId = await getEffectiveOwnerId(userId);

    const { id: entrevistaId, candidatoId } = await params;
    const body = await request.json();
    const { decisao, observacao } = body;

    // Validar decisão
    if (decisao !== null && decisao !== 'aprovado' && decisao !== 'reprovado') {
      return NextResponse.json(
        { error: "Decisão inválida. Use 'aprovado', 'reprovado' ou null" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Verificar se a entrevista pertence ao owner efetivo
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, entrevistaId),
          eq(entrevistas.userId, effectiveOwnerId)
        )
      )
      .limit(1);

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se o candidato está vinculado a esta entrevista
    const [participacao] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.entrevistaId, entrevistaId),
          eq(candidatoEntrevistas.candidatoId, candidatoId)
        )
      )
      .limit(1);

    if (!participacao) {
      return NextResponse.json(
        { error: "Candidato não encontrado nesta entrevista" },
        { status: 404 }
      );
    }

    // Atualizar a decisão do recrutador
    const [updated] = await db
      .update(candidatoEntrevistas)
      .set({
        decisaoRecrutador: decisao,
        decisaoRecrutadorEm: decisao ? new Date() : null,
        decisaoRecrutadorObservacao: observacao || null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(candidatoEntrevistas.entrevistaId, entrevistaId),
          eq(candidatoEntrevistas.candidatoId, candidatoId)
        )
      )
      .returning();

    return NextResponse.json({
      success: true,
      decisao: updated.decisaoRecrutador,
      decisaoRecrutadorEm: updated.decisaoRecrutadorEm,
      observacao: updated.decisaoRecrutadorObservacao,
    });
  } catch (error) {
    console.error("Erro ao atualizar decisão do recrutador:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar decisão" },
      { status: 500 }
    );
  }
}
