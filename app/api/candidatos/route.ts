import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos } from "@/lib/db/schema";
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

    const { searchParams } = new URL(request.url);
    const entrevistaId = searchParams.get("entrevistaId");

    const db = getDB();

    // Buscar candidatos do usuário
    let query = db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.userId, userId),
          isNull(candidatos.deletedAt)
        )
      )
      .orderBy(desc(candidatos.createdAt));

    const resultado = await query;

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}
