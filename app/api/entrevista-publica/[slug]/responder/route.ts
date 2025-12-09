import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { respostas, candidatos, entrevistas, perguntas, candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const responderSchema = z.object({
  candidatoId: z.string().uuid(),
  sessaoId: z.string().uuid(),
  perguntaId: z.string().uuid(),
  transcricao: z.string().min(1, "Transcrição não pode estar vazia"),
  tempoResposta: z.number().int().positive(),
});

/**
 * POST /api/entrevista-publica/[slug]/responder
 * Salva a resposta transcrita do candidato
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Validar dados
    const validacao = responderSchema.safeParse(body);
    if (!validacao.success) {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: validacao.error.flatten() },
        { status: 400 }
      );
    }

    const { candidatoId, sessaoId, perguntaId, transcricao, tempoResposta } = validacao.data;
    const db = getDB();

    // Verificar se a entrevista existe e está publicada
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(eq(entrevistas.slug, slug));

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se o candidato existe
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(eq(candidatos.id, candidatoId));

    if (!candidato) {
      return NextResponse.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se a pergunta pertence à entrevista
    const [pergunta] = await db
      .select()
      .from(perguntas)
      .where(
        and(
          eq(perguntas.id, perguntaId),
          eq(perguntas.entrevistaId, entrevista.id)
        )
      );

    if (!pergunta) {
      return NextResponse.json(
        { error: "Pergunta não encontrada" },
        { status: 404 }
      );
    }

    // Verificar se já existe uma resposta para esta pergunta
    const [respostaExistente] = await db
      .select()
      .from(respostas)
      .where(
        and(
          eq(respostas.perguntaId, perguntaId),
          eq(respostas.candidatoId, candidatoId),
          eq(respostas.entrevistaId, entrevista.id)
        )
      );

    let resposta;

    if (respostaExistente) {
      // Atualizar resposta existente
      [resposta] = await db
        .update(respostas)
        .set({
          transcricao,
          tempoResposta,
          updatedAt: new Date(),
          tentativas: (respostaExistente.tentativas || 1) + 1,
        })
        .where(eq(respostas.id, respostaExistente.id))
        .returning();
    } else {
      // Criar nova resposta
      [resposta] = await db
        .insert(respostas)
        .values({
          perguntaId,
          candidatoId,
          entrevistaId: entrevista.id,
          transcricao,
          tempoResposta,
          ipResposta: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        })
        .returning();
    }

    return NextResponse.json({
      respostaId: resposta.id,
      sucesso: true,
    });
  } catch (error) {
    console.error("Erro ao salvar resposta:", error);
    return NextResponse.json(
      { error: "Erro ao salvar resposta" },
      { status: 500 }
    );
  }
}
