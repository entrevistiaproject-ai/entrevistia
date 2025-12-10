import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas, entrevistas, users } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";

/**
 * GET /api/convite/[slug]?candidatoId=xxx
 * Retorna dados do convite para o candidato confirmar e iniciar a entrevista
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const candidatoId = searchParams.get("candidatoId");

    if (!candidatoId) {
      return NextResponse.json(
        { error: "ID do candidato é obrigatório" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar entrevista pelo slug
    const [entrevista] = await db
      .select({
        id: entrevistas.id,
        titulo: entrevistas.titulo,
        descricao: entrevistas.descricao,
        cargo: entrevistas.cargo,
        empresa: entrevistas.empresa,
        slug: entrevistas.slug,
        userId: entrevistas.userId,
        status: entrevistas.status,
      })
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.slug, slug),
          isNull(entrevistas.deletedAt)
        )
      )
      .limit(1);

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

    // Buscar candidato e vínculo com a entrevista
    const [candidatoEntrevista] = await db
      .select({
        candidatoId: candidatoEntrevistas.candidatoId,
        entrevistaId: candidatoEntrevistas.entrevistaId,
        status: candidatoEntrevistas.status,
        prazoResposta: candidatoEntrevistas.prazoResposta,
        iniciadaEm: candidatoEntrevistas.iniciadaEm,
        concluidaEm: candidatoEntrevistas.concluidaEm,
      })
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.candidatoId, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevista.id)
        )
      )
      .limit(1);

    if (!candidatoEntrevista) {
      return NextResponse.json(
        { error: "Convite não encontrado ou inválido" },
        { status: 404 }
      );
    }

    // Verificar se já foi concluída
    if (candidatoEntrevista.concluidaEm) {
      return NextResponse.json(
        { error: "Você já respondeu esta entrevista" },
        { status: 400 }
      );
    }

    // Buscar dados do candidato
    const [candidato] = await db
      .select({
        id: candidatos.id,
        nome: candidatos.nome,
        email: candidatos.email,
      })
      .from(candidatos)
      .where(eq(candidatos.id, candidatoId))
      .limit(1);

    if (!candidato) {
      return NextResponse.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    // Buscar empresa do recrutador (se não estiver na entrevista)
    let empresaNome = entrevista.empresa;
    if (!empresaNome) {
      const [recrutador] = await db
        .select({ empresa: users.empresa })
        .from(users)
        .where(eq(users.id, entrevista.userId))
        .limit(1);
      empresaNome = recrutador?.empresa || null;
    }

    // Verificar se o prazo expirou
    const prazoExpirado = candidatoEntrevista.prazoResposta
      ? new Date(candidatoEntrevista.prazoResposta) < new Date()
      : false;

    return NextResponse.json({
      candidato: {
        id: candidato.id,
        nome: candidato.nome,
        email: candidato.email,
      },
      entrevista: {
        id: entrevista.id,
        titulo: entrevista.titulo,
        descricao: entrevista.descricao,
        cargo: entrevista.cargo,
        empresa: empresaNome,
        slug: entrevista.slug,
      },
      prazoResposta: candidatoEntrevista.prazoResposta,
      prazoExpirado,
      jaIniciada: !!candidatoEntrevista.iniciadaEm,
    });
  } catch (error) {
    console.error("Erro ao buscar convite:", error);
    return NextResponse.json(
      { error: "Erro ao carregar convite" },
      { status: 500 }
    );
  }
}
