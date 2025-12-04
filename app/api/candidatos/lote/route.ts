import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatos } from "@/lib/db/schema";

function getUserIdFromRequest(request: Request): string | null {
  return request.headers.get("x-user-id");
}

export async function POST(request: Request) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { candidatos: candidatosData, entrevistaId } = body;

    if (!Array.isArray(candidatosData) || candidatosData.length === 0) {
      return NextResponse.json(
        { error: "Lista de candidatos inválida" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Validar dados básicos
    const candidatosValidos = candidatosData.filter(
      (c) => c.nome && c.email
    );

    if (candidatosValidos.length === 0) {
      return NextResponse.json(
        { error: "Nenhum candidato válido encontrado" },
        { status: 400 }
      );
    }

    // Inserir todos os candidatos
    const candidatosInseridos = await db
      .insert(candidatos)
      .values(
        candidatosValidos.map((c) => ({
          userId,
          nome: c.nome,
          email: c.email,
          telefone: c.telefone || null,
          linkedin: c.linkedin || null,
          aceitouTermosEntrevista: false,
          consentimentoTratamentoDados: false,
          finalidadeTratamento: entrevistaId
            ? `Processo seletivo - Entrevista ${entrevistaId}`
            : "Processo seletivo",
          origemCadastro: "importacao_csv",
        }))
      )
      .returning();

    return NextResponse.json(
      {
        success: true,
        total: candidatosData.length,
        inseridos: candidatosInseridos.length,
        rejeitados: candidatosData.length - candidatosValidos.length,
        candidatos: candidatosInseridos,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao importar candidatos:", error);
    return NextResponse.json(
      { error: "Erro ao importar candidatos" },
      { status: 500 }
    );
  }
}
