import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { userCargoPreferences } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AREAS_CARGOS, AreaProfissional } from "@/lib/db/seeds/banco-perguntas-v4/types";

/**
 * GET /api/user/cargo-preferences
 * Retorna as preferências de cargos visíveis do usuário
 */
export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const db = getDB();

    const [preferences] = await db
      .select()
      .from(userCargoPreferences)
      .where(eq(userCargoPreferences.userId, userId));

    // Se não existe preferência, retorna objeto vazio
    // Isso significa que o usuário ainda não completou o onboarding
    if (!preferences) {
      return NextResponse.json({
        cargosVisiveis: [],
        onboardingCompleted: false,
        // Também retorna o mapeamento de áreas para o frontend usar
        areasCargos: AREAS_CARGOS,
      });
    }

    return NextResponse.json({
      cargosVisiveis: preferences.cargosVisiveis || [],
      onboardingCompleted: preferences.onboardingCompleted,
      areasCargos: AREAS_CARGOS,
    });
  } catch (error) {
    console.error("Erro ao buscar preferências de cargos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar preferências" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user/cargo-preferences
 * Atualiza as preferências de cargos visíveis do usuário
 */
export async function PUT(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { cargosVisiveis, onboardingCompleted } = body;

    // Validar que cargosVisiveis é um array de strings
    if (!Array.isArray(cargosVisiveis)) {
      return NextResponse.json(
        { error: "cargosVisiveis deve ser um array" },
        { status: 400 }
      );
    }

    // Validar que todos os cargos são válidos
    const todosCargos = Object.values(AREAS_CARGOS).flat();
    const cargosInvalidos = cargosVisiveis.filter(
      (cargo: string) => !todosCargos.includes(cargo)
    );

    if (cargosInvalidos.length > 0) {
      return NextResponse.json(
        { error: `Cargos inválidos: ${cargosInvalidos.join(", ")}` },
        { status: 400 }
      );
    }

    const db = getDB();

    // Verifica se já existe preferência para o usuário
    const [existing] = await db
      .select({ id: userCargoPreferences.id })
      .from(userCargoPreferences)
      .where(eq(userCargoPreferences.userId, userId));

    let result;

    if (existing) {
      // Atualiza existente
      [result] = await db
        .update(userCargoPreferences)
        .set({
          cargosVisiveis,
          onboardingCompleted: onboardingCompleted ?? true,
          updatedAt: new Date(),
        })
        .where(eq(userCargoPreferences.userId, userId))
        .returning();
    } else {
      // Cria nova preferência
      [result] = await db
        .insert(userCargoPreferences)
        .values({
          userId,
          cargosVisiveis,
          onboardingCompleted: onboardingCompleted ?? true,
        })
        .returning();
    }

    return NextResponse.json({
      cargosVisiveis: result.cargosVisiveis || [],
      onboardingCompleted: result.onboardingCompleted,
    });
  } catch (error) {
    console.error("Erro ao atualizar preferências de cargos:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar preferências" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/cargo-preferences/toggle-all
 * Ativa ou desativa todas as perguntas padrão de uma vez
 */
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
    const { action } = body; // 'show-all' ou 'hide-all'

    if (action !== 'show-all' && action !== 'hide-all') {
      return NextResponse.json(
        { error: "action deve ser 'show-all' ou 'hide-all'" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Define os cargos baseado na ação
    const cargosVisiveis = action === 'show-all'
      ? Object.values(AREAS_CARGOS).flat()
      : [];

    // Verifica se já existe preferência para o usuário
    const [existing] = await db
      .select({ id: userCargoPreferences.id })
      .from(userCargoPreferences)
      .where(eq(userCargoPreferences.userId, userId));

    let result;

    if (existing) {
      [result] = await db
        .update(userCargoPreferences)
        .set({
          cargosVisiveis,
          onboardingCompleted: true,
          updatedAt: new Date(),
        })
        .where(eq(userCargoPreferences.userId, userId))
        .returning();
    } else {
      [result] = await db
        .insert(userCargoPreferences)
        .values({
          userId,
          cargosVisiveis,
          onboardingCompleted: true,
        })
        .returning();
    }

    return NextResponse.json({
      cargosVisiveis: result.cargosVisiveis || [],
      onboardingCompleted: result.onboardingCompleted,
    });
  } catch (error) {
    console.error("Erro ao toggle all preferências:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar preferências" },
      { status: 500 }
    );
  }
}
