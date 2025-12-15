import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas, entrevistas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// PATCH - Prorrogar prazo de resposta
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

    const { id: candidatoEntrevistaId } = await params;
    const body = await request.json();
    const { horasAdicionais } = body;

    if (!horasAdicionais || horasAdicionais < 1) {
      return NextResponse.json(
        { error: "Informe as horas adicionais (mínimo 1)" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar a sessão candidato-entrevista
    const [sessao] = await db
      .select({
        id: candidatoEntrevistas.id,
        entrevistaId: candidatoEntrevistas.entrevistaId,
        status: candidatoEntrevistas.status,
        prazoResposta: candidatoEntrevistas.prazoResposta,
      })
      .from(candidatoEntrevistas)
      .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId))
      .limit(1);

    if (!sessao) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se a entrevista pertence ao usuário
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, sessao.entrevistaId),
          eq(entrevistas.userId, userId)
        )
      )
      .limit(1);

    if (!entrevista) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 403 }
      );
    }

    // Calcular novo prazo
    const agora = new Date();
    const prazoAtual = sessao.prazoResposta ? new Date(sessao.prazoResposta) : agora;
    const basePrazo = prazoAtual > agora ? prazoAtual : agora;
    const novoPrazo = new Date(basePrazo.getTime() + horasAdicionais * 60 * 60 * 1000);

    // Atualizar prazo (e reativar se estava expirada)
    const novoStatus = sessao.status === "expirada" ? "em_andamento" : sessao.status;

    await db
      .update(candidatoEntrevistas)
      .set({
        prazoResposta: novoPrazo,
        status: novoStatus,
        updatedAt: new Date(),
      })
      .where(eq(candidatoEntrevistas.id, candidatoEntrevistaId));

    return NextResponse.json({
      success: true,
      novoPrazo,
      novoStatus,
    });
  } catch (error) {
    console.error("Erro ao prorrogar prazo:", error);
    return NextResponse.json(
      { error: "Erro ao prorrogar prazo" },
      { status: 500 }
    );
  }
}
