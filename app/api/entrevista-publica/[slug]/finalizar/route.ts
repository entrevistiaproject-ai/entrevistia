import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const finalizarSchema = z.object({
  sessaoId: z.string().uuid(),
});

/**
 * POST /api/entrevista-publica/[slug]/finalizar
 * Finaliza a sessão de entrevista
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const body = await request.json();

    // Validar dados
    const validacao = finalizarSchema.safeParse(body);
    if (!validacao.success) {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: validacao.error.flatten() },
        { status: 400 }
      );
    }

    const { sessaoId } = validacao.data;
    const db = getDB();

    // Atualizar status da sessão
    const [sessao] = await db
      .update(candidatoEntrevistas)
      .set({
        status: "concluida",
        concluidaEm: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(candidatoEntrevistas.id, sessaoId))
      .returning();

    if (!sessao) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: "Entrevista finalizada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao finalizar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao finalizar entrevista" },
      { status: 500 }
    );
  }
}
