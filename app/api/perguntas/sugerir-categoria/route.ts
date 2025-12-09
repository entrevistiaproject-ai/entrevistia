import { NextResponse } from "next/server";
import { sugerirCategoria } from "@/lib/utils/classificacao-perguntas";

/**
 * POST /api/perguntas/sugerir-categoria
 *
 * Sugere categoria para uma pergunta baseado no texto
 * Útil para dar feedback em tempo real no frontend
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { texto } = body;

    if (!texto || typeof texto !== 'string') {
      return NextResponse.json(
        { error: "Texto é obrigatório" },
        { status: 400 }
      );
    }

    const sugestao = sugerirCategoria(texto);

    return NextResponse.json({
      categoria: sugestao.categoria,
      confianca: sugestao.confianca,
      motivo: sugestao.motivo,
    });
  } catch (error) {
    console.error("Erro ao sugerir categoria:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
