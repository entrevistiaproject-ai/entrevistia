import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { respostas, candidatoEntrevistas, entrevistas, perguntas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { sanitizeUUID } from "@/lib/security";

/**
 * GET /api/entrevista-publica/[slug]/progresso
 * Retorna o progresso do candidato na entrevista (perguntas já respondidas)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);

    const candidatoId = sanitizeUUID(searchParams.get("candidatoId") || "");
    const sessaoId = sanitizeUUID(searchParams.get("sessaoId") || "");

    if (!candidatoId || !sessaoId) {
      return NextResponse.json(
        { error: "Parâmetros inválidos" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar entrevista
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.slug, slug),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Verificar sessão
    const [sessao] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.id, sessaoId),
          eq(candidatoEntrevistas.candidatoId, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevista.id)
        )
      );

    if (!sessao) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    // Se a sessão já foi concluída, retornar status
    if (sessao.status === "concluida") {
      return NextResponse.json({
        status: "concluida",
        perguntasRespondidas: [],
        totalPerguntas: 0,
      });
    }

    // Buscar perguntas da entrevista
    const perguntasEntrevista = await db
      .select({ id: perguntas.id, ordem: perguntas.ordem })
      .from(perguntas)
      .where(eq(perguntas.entrevistaId, entrevista.id))
      .orderBy(perguntas.ordem);

    // Buscar respostas já dadas pelo candidato
    const respostasExistentes = await db
      .select({ perguntaId: respostas.perguntaId })
      .from(respostas)
      .where(
        and(
          eq(respostas.candidatoId, candidatoId),
          eq(respostas.entrevistaId, entrevista.id)
        )
      );

    const perguntasRespondidas = respostasExistentes.map(r => r.perguntaId);

    return NextResponse.json({
      status: sessao.status,
      perguntasRespondidas,
      totalPerguntas: perguntasEntrevista.length,
      prazoResposta: sessao.prazoResposta,
    });
  } catch (error) {
    console.error("Erro ao buscar progresso:", error);
    return NextResponse.json(
      { error: "Erro ao buscar progresso" },
      { status: 500 }
    );
  }
}
