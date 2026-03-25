import { NextRequest, NextResponse } from "next/server";
import { createMagicLink } from "@/lib/auth/magic-link";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email("Email inválido"),
  tipo: z.enum(["login", "completar_perfil", "ver_resultado"]).optional(),
  entrevistaId: z.string().uuid().optional(),
  candidatoId: z.string().uuid().optional(),
});

/**
 * POST /api/auth/magic-link
 * Cria e envia um magic link por email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, tipo, entrevistaId, candidatoId } = parsed.data;

    // Captura informações do request
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const result = await createMagicLink({
      email,
      tipo,
      entrevistaId,
      candidatoId,
      ipAddress,
      userAgent,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Link de acesso enviado para seu email",
    });
  } catch (error) {
    console.error("Erro ao criar magic link:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
