import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas, entrevistas } from "@/lib/db/schema";
import { eq, and, isNull, desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nome, email, telefone, linkedin, entrevistaId } = body;

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Se tem entrevistaId, verificar se pertence ao usuário
    if (entrevistaId) {
      const [entrevista] = await db
        .select()
        .from(entrevistas)
        .where(
          and(
            eq(entrevistas.id, entrevistaId),
            eq(entrevistas.userId, userId)
          )
        )
        .limit(1);

      if (!entrevista) {
        return NextResponse.json(
          { error: "Entrevista não encontrada" },
          { status: 404 }
        );
      }
    }

    // Criar candidato
    const [novoCandidato] = await db
      .insert(candidatos)
      .values({
        userId,
        nome,
        email,
        telefone: telefone || null,
        linkedin: linkedin || null,
        aceitouTermosEntrevista: false,
        consentimentoTratamentoDados: false,
        finalidadeTratamento: entrevistaId
          ? `Processo seletivo - Entrevista ${entrevistaId}`
          : "Processo seletivo",
        origemCadastro: "cadastro_manual_recrutador",
      })
      .returning();

    // Se tem entrevistaId, vincular candidato à entrevista
    if (entrevistaId) {
      await db.insert(candidatoEntrevistas).values({
        candidatoId: novoCandidato.id,
        entrevistaId,
        status: "pendente",
      });
    }

    return NextResponse.json(novoCandidato, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar candidato:", error);
    return NextResponse.json(
      { error: "Erro ao criar candidato" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    let includeEntrevistas = false;
    try {
      const { searchParams } = new URL(request.url);
      includeEntrevistas = searchParams.get("includeEntrevistas") === "true";
    } catch (error) {
      console.warn("Falha ao processar URL:", error);
    }

    const db = getDB();

    // Buscar candidatos do usuário
    const candidatosList = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.userId, userId),
          isNull(candidatos.deletedAt)
        )
      )
      .orderBy(desc(candidatos.createdAt));

    // Se não precisa incluir entrevistas, retorna só os candidatos
    if (!includeEntrevistas) {
      return NextResponse.json(candidatosList);
    }

    // Buscar entrevistas de cada candidato
    const candidatosComEntrevistas = await Promise.all(
      candidatosList.map(async (candidato) => {
        const entrevistasDoCandidato = await db
          .select({
            entrevistaId: candidatoEntrevistas.entrevistaId,
            status: candidatoEntrevistas.status,
            notaGeral: candidatoEntrevistas.notaGeral,
            concluidaEm: candidatoEntrevistas.concluidaEm,
            entrevistaTitulo: entrevistas.titulo,
            entrevistaCargo: entrevistas.cargo,
          })
          .from(candidatoEntrevistas)
          .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
          .where(eq(candidatoEntrevistas.candidatoId, candidato.id))
          .orderBy(desc(candidatoEntrevistas.createdAt));

        return {
          ...candidato,
          entrevistas: entrevistasDoCandidato,
        };
      })
    );

    return NextResponse.json(candidatosComEntrevistas);
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}
