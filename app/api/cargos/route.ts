import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { perguntasTemplates, userCargoPreferences } from "@/lib/db/schema";
import { eq, and, isNull, or, sql } from "drizzle-orm";
import { AREAS_CARGOS, AREAS_LABELS, AreaProfissional } from "@/lib/db/seeds/banco-perguntas-v4/types";

interface CargoInfo {
  nome: string;
  isCustom: boolean;
  area?: AreaProfissional;
}

interface AreaComCargos {
  area: AreaProfissional;
  label: string;
  cargos: CargoInfo[];
}

/**
 * GET /api/cargos
 * Retorna todos os cargos organizados por área, incluindo:
 * - Cargos padrão do sistema (de AREAS_CARGOS)
 * - Cargos customizados do usuário (extraídos das perguntas)
 *
 * Query params:
 * - apenasVisiveis: se "true", filtra pelos cargos visíveis do usuário
 * - busca: texto para filtrar cargos pelo nome
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const apenasVisiveis = searchParams.get("apenasVisiveis") === "true";
    const busca = searchParams.get("busca")?.toLowerCase().trim();

    const userId = await getUserId();
    const db = getDB();

    // Buscar preferências do usuário (cargos visíveis)
    let cargosVisiveis: string[] = [];

    if (userId && apenasVisiveis) {
      const [preferences] = await db
        .select()
        .from(userCargoPreferences)
        .where(eq(userCargoPreferences.userId, userId));

      cargosVisiveis = (preferences?.cargosVisiveis as string[]) || [];
    }

    // Buscar cargos customizados do usuário (das perguntas que ele criou)
    let cargosCustomizados: string[] = [];

    if (userId) {
      const perguntasUsuario = await db
        .selectDistinct({ cargo: perguntasTemplates.cargo })
        .from(perguntasTemplates)
        .where(
          and(
            eq(perguntasTemplates.userId, userId),
            isNull(perguntasTemplates.deletedAt)
          )
        );

      // Pegar apenas cargos que não estão nos padrões
      const cargosPadrao = Object.values(AREAS_CARGOS).flat();
      cargosCustomizados = perguntasUsuario
        .map(p => p.cargo)
        .filter(cargo => !cargosPadrao.includes(cargo));
    }

    // Montar lista de áreas com cargos
    const areas = Object.keys(AREAS_CARGOS) as AreaProfissional[];

    const areasComCargos: AreaComCargos[] = areas.map(area => {
      let cargos = AREAS_CARGOS[area].map(nome => ({
        nome,
        isCustom: false,
        area,
      }));

      // Filtrar pelos cargos visíveis se necessário
      if (apenasVisiveis && cargosVisiveis.length > 0) {
        cargos = cargos.filter(c => cargosVisiveis.includes(c.nome));
      }

      // Filtrar por busca se fornecida
      if (busca) {
        cargos = cargos.filter(c =>
          c.nome.toLowerCase().includes(busca)
        );
      }

      return {
        area,
        label: AREAS_LABELS[area],
        cargos,
      };
    }).filter(a => a.cargos.length > 0); // Remove áreas vazias

    // Adicionar cargos customizados em uma seção separada
    let cargosCustomFiltrados = cargosCustomizados.map(nome => ({
      nome,
      isCustom: true,
      area: undefined,
    }));

    // Filtrar por busca se fornecida
    if (busca) {
      cargosCustomFiltrados = cargosCustomFiltrados.filter(c =>
        c.nome.toLowerCase().includes(busca)
      );
    }

    // Verificar se o termo de busca corresponde a algum cargo existente
    const todosCargos = [
      ...Object.values(AREAS_CARGOS).flat(),
      ...cargosCustomizados,
    ];

    const cargoExato = busca
      ? todosCargos.find(c => c.toLowerCase() === busca)
      : null;

    const cargosSimilares = busca
      ? todosCargos.filter(c => c.toLowerCase().includes(busca))
      : [];

    return NextResponse.json({
      areas: areasComCargos,
      cargosCustomizados: cargosCustomFiltrados,
      // Info para ajudar a decidir se mostra opção de criar
      busca: busca || null,
      cargoExato,
      totalResultados: areasComCargos.reduce((sum, a) => sum + a.cargos.length, 0) + cargosCustomFiltrados.length,
      podecriar: busca && !cargoExato && busca.length >= 3,
    });
  } catch (error) {
    console.error("Erro ao buscar cargos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar cargos" },
      { status: 500 }
    );
  }
}
