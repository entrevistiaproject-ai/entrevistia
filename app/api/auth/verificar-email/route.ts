import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verificationCodes, users } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { z } from "zod";

const verifyEmailSchema = z.object({
  email: z.string().email("Email inválido"),
  code: z.string().length(6, "Código deve ter 6 dígitos"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Valida os dados
    const validation = verifyEmailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, code } = validation.data;

    // Busca o usuário
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se o email já foi verificado
    if (user.email_verified) {
      return NextResponse.json(
        { error: "Email já foi verificado" },
        { status: 400 }
      );
    }

    // Busca o código de verificação mais recente e válido
    const [verificationCode] = await db
      .select()
      .from(verificationCodes)
      .where(
        and(
          eq(verificationCodes.user_id, user.id),
          eq(verificationCodes.email, email),
          eq(verificationCodes.type, "email_verification"),
          eq(verificationCodes.used, "false"),
          gt(verificationCodes.expires_at, new Date())
        )
      )
      .orderBy(verificationCodes.created_at)
      .limit(1);

    if (!verificationCode) {
      return NextResponse.json(
        { error: "Código inválido ou expirado" },
        { status: 400 }
      );
    }

    // Verifica se há muitas tentativas
    if (verificationCode.attempts >= 5) {
      return NextResponse.json(
        { error: "Muitas tentativas. Solicite um novo código." },
        { status: 429 }
      );
    }

    // Verifica se o código está correto
    if (verificationCode.code !== code) {
      // Incrementa tentativas
      await db
        .update(verificationCodes)
        .set({ attempts: verificationCode.attempts + 1 })
        .where(eq(verificationCodes.id, verificationCode.id));

      return NextResponse.json(
        {
          error: "Código incorreto",
          tentativasRestantes: 5 - (verificationCode.attempts + 1)
        },
        { status: 400 }
      );
    }

    // Código correto! Marca como usado
    await db
      .update(verificationCodes)
      .set({
        used: "true",
        used_at: new Date(),
      })
      .where(eq(verificationCodes.id, verificationCode.id));

    // Marca o email como verificado
    await db
      .update(users)
      .set({
        email_verified: new Date(),
        updated_at: new Date(),
      })
      .where(eq(users.id, user.id));

    return NextResponse.json(
      {
        message: "Email verificado com sucesso!",
        success: true,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao verificar email:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
