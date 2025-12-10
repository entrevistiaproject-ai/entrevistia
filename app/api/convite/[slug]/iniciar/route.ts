import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, candidatos, candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";

/**
 * POST /api/convite/[slug]/iniciar
 * Inicia a entrevista a partir de um convite (candidato já cadastrado pelo recrutador)
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { candidatoId, nome } = body;

    if (!candidatoId) {
      return NextResponse.json(
        { error: "ID do candidato é obrigatório" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar entrevista pelo slug
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

    if (entrevista.status !== "active") {
      return NextResponse.json(
        { error: "Esta entrevista não está mais disponível" },
        { status: 410 }
      );
    }

    // Buscar o vínculo candidato-entrevista
    const [candidatoEntrevista] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.candidatoId, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevista.id)
        )
      );

    if (!candidatoEntrevista) {
      return NextResponse.json(
        { error: "Convite não encontrado ou inválido" },
        { status: 404 }
      );
    }

    // Verificar se o prazo expirou
    if (candidatoEntrevista.prazoResposta) {
      const prazo = new Date(candidatoEntrevista.prazoResposta);
      if (prazo < new Date()) {
        return NextResponse.json(
          { error: "O prazo para responder esta entrevista expirou" },
          { status: 410 }
        );
      }
    }

    // Verificar se já foi concluída
    if (candidatoEntrevista.concluidaEm) {
      return NextResponse.json(
        { error: "Você já respondeu esta entrevista" },
        { status: 400 }
      );
    }

    // Atualizar nome do candidato se fornecido
    if (nome) {
      await db
        .update(candidatos)
        .set({
          nome,
          aceitouTermosEntrevista: true,
          dataAceiteTermos: new Date(),
          consentimentoTratamentoDados: true,
          updatedAt: new Date(),
        })
        .where(eq(candidatos.id, candidatoId));
    }

    // Atualizar status para em_andamento e marcar início
    await db
      .update(candidatoEntrevistas)
      .set({
        status: "em_andamento",
        iniciadaEm: candidatoEntrevista.iniciadaEm || new Date(),
        updatedAt: new Date(),
      })
      .where(eq(candidatoEntrevistas.id, candidatoEntrevista.id));

    return NextResponse.json({
      candidatoId,
      sessaoId: candidatoEntrevista.id,
      entrevistaId: entrevista.id,
    });
  } catch (error) {
    console.error("Erro ao iniciar entrevista via convite:", error);
    return NextResponse.json(
      { error: "Erro ao iniciar entrevista" },
      { status: 500 }
    );
  }
}
