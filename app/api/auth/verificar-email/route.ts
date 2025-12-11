import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verificationCodes, users } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { z } from "zod";
import {
  logger,
  sanitizeEmail,
  isValidCodeFormat,
  verifyCodeHash,
  checkRateLimit,
  getClientIP,
  createRateLimitKey,
} from "@/lib/security";

const verifyEmailSchema = z.object({
  email: z.string().email("Email inválido"),
  code: z.string().length(6, "Código deve ter 6 dígitos"),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting por IP
    const clientIP = getClientIP(request);
    const rateLimitKey = createRateLimitKey("verificar-email", clientIP);
    const rateLimitResult = checkRateLimit(rateLimitKey, "verification");

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitas tentativas. Por favor, aguarde antes de tentar novamente.",
          retryAfter: rateLimitResult.retryAfter,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Valida os dados
    const validation = verifyEmailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email: rawEmail, code } = validation.data;
    const email = sanitizeEmail(rawEmail);

    // Valida formato do código
    if (!isValidCodeFormat(code)) {
      return NextResponse.json(
        { error: "Formato de código inválido" },
        { status: 400 }
      );
    }

    // Busca o usuário
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      // Não revelar se o usuário existe ou não (previne enumeração)
      return NextResponse.json(
        { error: "Código inválido ou expirado" },
        { status: 400 }
      );
    }

    // Verifica se o email já foi verificado
    if (user.emailVerified) {
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
          eq(verificationCodes.userId, user.id),
          eq(verificationCodes.email, email),
          eq(verificationCodes.type, "email_verification"),
          eq(verificationCodes.used, "false"),
          gt(verificationCodes.expiresAt, new Date())
        )
      )
      .orderBy(verificationCodes.createdAt)
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
    // Suporta tanto códigos em texto plano (legado) quanto hashes
    const isValidCode = verificationCode.code.length === 64
      ? verifyCodeHash(code, verificationCode.code) // Hash SHA-256
      : verificationCode.code === code; // Texto plano (legado)

    if (!isValidCode) {
      // Incrementa tentativas
      await db
        .update(verificationCodes)
        .set({ attempts: verificationCode.attempts + 1 })
        .where(eq(verificationCodes.id, verificationCode.id));

      const tentativasRestantes = 5 - (verificationCode.attempts + 1);

      return NextResponse.json(
        {
          error: "Código incorreto",
          tentativasRestantes: tentativasRestantes > 0 ? tentativasRestantes : 0,
        },
        { status: 400 }
      );
    }

    // Código correto! Marca como usado
    await db
      .update(verificationCodes)
      .set({
        used: "true",
        usedAt: new Date(),
      })
      .where(eq(verificationCodes.id, verificationCode.id));

    // Marca o email como verificado
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
        updatedAt: new Date(),
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
    logger.error("Erro ao verificar email", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
