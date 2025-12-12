import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";

/**
 * GET /api/time/configuracoes
 * Retorna as configurações do time
 *
 * NOTA: As configurações de aprovação automática foram movidas para o nível de vaga individual.
 * Este endpoint agora retorna apenas configurações gerais do time (se houver no futuro).
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

    // Retorna objeto vazio para manter compatibilidade
    // Configurações futuras do time podem ser adicionadas aqui
    return NextResponse.json({
      message: "As configurações de aprovação automática agora são configuradas por vaga"
    });
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return NextResponse.json(
      { error: "Erro ao buscar configurações" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/time/configuracoes
 * Endpoint deprecado - configurações de aprovação automática agora são por vaga
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

    return NextResponse.json(
      {
        error: "As configurações de aprovação automática agora são configuradas individualmente por vaga. Acesse a vaga desejada em Entrevistas > Configurações.",
        deprecated: true
      },
      { status: 410 } // Gone - recurso não está mais disponível
    );
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar configurações" },
      { status: 500 }
    );
  }
}
