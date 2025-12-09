import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// Validador de email simples
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
    const { candidatos: candidatosData, entrevistaId } = body;

    if (!Array.isArray(candidatosData) || candidatosData.length === 0) {
      return NextResponse.json(
        { error: "Lista de candidatos inválida" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Validar dados básicos e email
    const candidatosValidos = candidatosData.filter(
      (c) => c.nome && c.email && isValidEmail(c.email.trim())
    );

    if (candidatosValidos.length === 0) {
      return NextResponse.json(
        { error: "Nenhum candidato válido encontrado. Verifique se os emails são válidos." },
        { status: 400 }
      );
    }

    // Normalizar emails (trim e lowercase)
    const candidatosNormalizados = candidatosValidos.map((c) => ({
      ...c,
      email: c.email.trim().toLowerCase(),
      nome: c.nome.trim(),
    }));

    // Buscar candidatos existentes para evitar duplicatas
    const emailsImportar = candidatosNormalizados.map((c) => c.email);
    const candidatosExistentes = await db
      .select({ email: candidatos.email })
      .from(candidatos)
      .where(
        and(
          eq(candidatos.userId, userId)
        )
      );

    const emailsExistentes = new Set(candidatosExistentes.map((c) => c.email));

    // Filtrar apenas candidatos novos
    const candidatosNovos = candidatosNormalizados.filter(
      (c) => !emailsExistentes.has(c.email)
    );

    let candidatosInseridos: any[] = [];

    if (candidatosNovos.length > 0) {
      // Inserir apenas candidatos novos
      candidatosInseridos = await db
        .insert(candidatos)
        .values(
          candidatosNovos.map((c) => ({
            userId,
            nome: c.nome,
            email: c.email,
            aceitouTermosEntrevista: false,
            consentimentoTratamentoDados: false,
            finalidadeTratamento: entrevistaId
              ? `Processo seletivo - Entrevista ${entrevistaId}`
              : "Processo seletivo",
            origemCadastro: "importacao_csv",
          }))
        )
        .returning();
    }

    const duplicados = candidatosNormalizados.length - candidatosNovos.length;
    const invalidos = candidatosData.length - candidatosValidos.length;

    return NextResponse.json(
      {
        success: true,
        total: candidatosData.length,
        inseridos: candidatosInseridos.length,
        duplicados,
        invalidos,
        rejeitados: duplicados + invalidos,
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
