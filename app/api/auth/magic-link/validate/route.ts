import { NextRequest, NextResponse } from "next/server";
import { validateMagicLink } from "@/lib/auth/magic-link";
import { cookies } from "next/headers";
import { z } from "zod";

const requestSchema = z.object({
  token: z.string().min(1, "Token é obrigatório"),
});

/**
 * POST /api/auth/magic-link/validate
 * Valida um magic link e cria sessão para o candidato
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { valid: false, error: "Token inválido" },
        { status: 400 }
      );
    }

    const { token } = parsed.data;

    const result = await validateMagicLink(token);

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, error: result.error },
        { status: 400 }
      );
    }

    // Cria cookie de sessão do candidato
    const cookieStore = await cookies();
    cookieStore.set("candidato_session", JSON.stringify({
      email: result.data!.email,
      candidatoId: result.data!.candidatoId,
      entrevistaId: result.data!.entrevistaId,
      authenticatedAt: new Date().toISOString(),
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    });

    // Determina a URL de redirecionamento
    let redirectUrl = "/meu-perfil";
    if (result.data!.tipo === "ver_resultado" && result.data!.candidatoId) {
      redirectUrl = `/candidato/${result.data!.candidatoId}/resultado`;
    } else if (result.data!.tipo === "completar_perfil") {
      redirectUrl = "/meu-perfil/editar";
    } else if (result.data!.entrevistaId) {
      redirectUrl = `/entrevista/${result.data!.entrevistaId}`;
    }

    return NextResponse.json({
      valid: true,
      redirectUrl,
      data: {
        email: result.data!.email,
        tipo: result.data!.tipo,
      },
    });
  } catch (error) {
    console.error("Erro ao validar magic link:", error);
    return NextResponse.json(
      { valid: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
