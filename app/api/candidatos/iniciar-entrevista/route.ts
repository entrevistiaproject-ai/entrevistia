import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatos, entrevistas, candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { candidatoJaParticipou } from "@/lib/services/plan-limits";

interface IniciarEntrevistaRequest {
  entrevistaSlug: string;
  candidatoEmail: string;
  candidatoNome?: string;
}

export async function POST(request: NextRequest) {
  try {
    const db = getDB();
    const body: IniciarEntrevistaRequest = await request.json();

    if (!body.entrevistaSlug || !body.candidatoEmail) {
      return NextResponse.json(
        { error: "Slug da entrevista e email do candidato são obrigatórios" },
        { status: 400 }
      );
    }

    // Busca a entrevista pelo slug
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(eq(entrevistas.slug, body.entrevistaSlug))
      .limit(1);

    if (!entrevista) {
      return NextResponse.json({ error: "Entrevista não encontrada" }, { status: 404 });
    }

    // Verifica se a entrevista está ativa
    if (entrevista.status !== "active") {
      return NextResponse.json(
        {
          error: "Esta entrevista não está disponível no momento",
          status: entrevista.status,
        },
        { status: 403 }
      );
    }

    // Busca ou cria o candidato
    let [candidato] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.email, body.candidatoEmail),
          eq(candidatos.entrevistaId, entrevista.id)
        )
      )
      .limit(1);

    if (!candidato) {
      // Cria novo candidato
      [candidato] = await db
        .insert(candidatos)
        .values({
          entrevistaId: entrevista.id,
          email: body.candidatoEmail,
          nome: body.candidatoNome || null,
          status: "convidado",
        })
        .returning();
    }

    // Verifica se o candidato já participou desta entrevista
    const { participou, podeRefazer } = await candidatoJaParticipou(
      candidato.id,
      entrevista.id
    );

    if (participou && !podeRefazer) {
      return NextResponse.json(
        {
          error: "Você já respondeu esta entrevista",
          message: "Cada candidato pode responder apenas uma vez cada entrevista.",
          code: "ALREADY_COMPLETED",
        },
        { status: 403 }
      );
    }

    // Se já participou mas pode refazer, atualiza o registro
    if (participou && podeRefazer) {
      await db
        .update(candidatoEntrevistas)
        .set({
          status: "in_progress",
          iniciouEm: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(candidatoEntrevistas.candidatoId, candidato.id),
            eq(candidatoEntrevistas.entrevistaId, entrevista.id)
          )
        );
    } else {
      // Cria registro de participação
      await db.insert(candidatoEntrevistas).values({
        candidatoId: candidato.id,
        entrevistaId: entrevista.id,
        status: "in_progress",
        iniciouEm: new Date(),
        podeRefazer: false,
      });
    }

    // Atualiza status do candidato
    await db
      .update(candidatos)
      .set({
        status: "em_andamento",
        iniciadaEm: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(candidatos.id, candidato.id));

    return NextResponse.json(
      {
        message: "Entrevista iniciada com sucesso",
        candidato: {
          id: candidato.id,
          email: candidato.email,
          nome: candidato.nome,
        },
        entrevista: {
          id: entrevista.id,
          slug: entrevista.slug,
          titulo: entrevista.titulo,
          descricao: entrevista.descricao,
          cargo: entrevista.cargo,
          empresa: entrevista.empresa,
          duracao: entrevista.duracao,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao iniciar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao iniciar entrevista. Tente novamente." },
      { status: 500 }
    );
  }
}
