import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { candidatos, candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { checkEntrevistaOwnership } from "@/lib/security/ownership";

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

    // Se foi fornecido entrevistaId, verificar ownership
    if (entrevistaId) {
      const entrevista = await checkEntrevistaOwnership(entrevistaId, userId);
      if (!entrevista) {
        return NextResponse.json(
          { error: "Entrevista não encontrada ou não pertence a você" },
          { status: 404 }
        );
      }
    }

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

    // Buscar candidatos existentes (por email e userId)
    const emailsImportar = candidatosNormalizados.map((c) => c.email);
    const candidatosExistentes = await db
      .select({
        id: candidatos.id,
        email: candidatos.email
      })
      .from(candidatos)
      .where(
        and(
          eq(candidatos.userId, userId)
        )
      );

    const emailParaCandidatoId = new Map(
      candidatosExistentes.map((c) => [c.email, c.id])
    );

    // Separar candidatos novos dos existentes
    const candidatosNovos = candidatosNormalizados.filter(
      (c) => !emailParaCandidatoId.has(c.email)
    );

    const candidatosExistentesLista = candidatosNormalizados.filter(
      (c) => emailParaCandidatoId.has(c.email)
    );

    let candidatosInseridos: any[] = [];
    let vinculosEntrevistaInseridos = 0;
    let jaVinculados = 0;

    // 1. Inserir candidatos novos
    if (candidatosNovos.length > 0) {
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

      // Adicionar novos candidatos ao mapa
      candidatosInseridos.forEach((c) => {
        emailParaCandidatoId.set(c.email, c.id);
      });
    }

    // 2. Se foi fornecido um entrevistaId, vincular candidatos à entrevista
    if (entrevistaId) {
      // Obter todos os candidatos que serão vinculados (novos + existentes)
      const todosCandidatosIds = Array.from(emailParaCandidatoId.values());

      // Buscar vínculos existentes para esta entrevista
      const vinculosExistentes = await db
        .select({
          candidatoId: candidatoEntrevistas.candidatoId,
        })
        .from(candidatoEntrevistas)
        .where(
          and(
            eq(candidatoEntrevistas.entrevistaId, entrevistaId),
            inArray(candidatoEntrevistas.candidatoId, todosCandidatosIds)
          )
        );

      const candidatosJaVinculados = new Set(
        vinculosExistentes.map((v) => v.candidatoId)
      );

      jaVinculados = candidatosJaVinculados.size;

      // Filtrar apenas candidatos que ainda não foram vinculados a esta entrevista
      const candidatosParaVincular = candidatosNormalizados
        .map((c) => emailParaCandidatoId.get(c.email))
        .filter((id): id is string =>
          id !== undefined && !candidatosJaVinculados.has(id)
        );

      // Criar vínculos com a entrevista
      if (candidatosParaVincular.length > 0) {
        const vinculosCriados = await db
          .insert(candidatoEntrevistas)
          .values(
            candidatosParaVincular.map((candidatoId) => ({
              candidatoId,
              entrevistaId,
              status: "pendente", // Aguardando convite/início
              podeRefazer: false,
            }))
          )
          .returning();

        vinculosEntrevistaInseridos = vinculosCriados.length;
      }
    }

    const invalidos = candidatosData.length - candidatosValidos.length;

    return NextResponse.json(
      {
        success: true,
        total: candidatosData.length,
        candidatosNovos: candidatosInseridos.length,
        candidatosExistentes: candidatosExistentesLista.length,
        vinculadosEntrevista: vinculosEntrevistaInseridos,
        jaVinculadosEntrevista: jaVinculados,
        invalidos,
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
