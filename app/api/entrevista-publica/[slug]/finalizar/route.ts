import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { onCandidatoFinalizouEntrevista } from "@/lib/ai/auto-analyze";

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

    // Dispara análise automática em background (se configurada)
    // Não aguarda o resultado para não bloquear a resposta ao candidato
    if (sessao.candidatoId && sessao.entrevistaId) {
      // Busca o nome do candidato
      const { candidatos } = await import("@/lib/db/schema");
      const [candidato] = await db
        .select()
        .from(candidatos)
        .where(eq(candidatos.id, sessao.candidatoId))
        .limit(1);

      if (candidato) {
        // Executa em background sem aguardar
        onCandidatoFinalizouEntrevista(
          sessao.candidatoId,
          sessao.entrevistaId,
          candidato.nome
        ).catch((error) => {
          console.error("Erro ao disparar análise automática:", error);
        });
      }
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
