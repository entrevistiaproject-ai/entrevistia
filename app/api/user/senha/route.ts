import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import {
  checkCombinedRateLimit,
  getClientIP,
  getRateLimitHeaders,
  recordFailedAttempt,
  clearSuspiciousPattern,
} from "@/lib/security";

/**
 * PUT /api/user/senha
 * Altera a senha do usuário
 * Protegido contra brute force
 */
export async function PUT(request: NextRequest) {
  const clientIP = getClientIP(request);

  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Rate limiting por usuário e IP para alteração de senha
    const rateLimitResult = checkCombinedRateLimit({
      ip: clientIP,
      userId,
      endpoint: "password-change",
      configKey: "passwordChange",
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Muitas tentativas de alteração de senha. Tente novamente mais tarde.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const body = await request.json();
    const { senhaAtual, novaSenha, confirmarSenha } = body;

    // Validações
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (novaSenha !== confirmarSenha) {
      return NextResponse.json(
        { error: "A nova senha e a confirmação não coincidem" },
        { status: 400 }
      );
    }

    // Validação mais robusta de senha
    if (novaSenha.length < 8) {
      return NextResponse.json(
        { error: "A nova senha deve ter pelo menos 8 caracteres" },
        { status: 400 }
      );
    }

    // Verifica complexidade da senha
    const hasUpperCase = /[A-Z]/.test(novaSenha);
    const hasLowerCase = /[a-z]/.test(novaSenha);
    const hasNumbers = /\d/.test(novaSenha);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return NextResponse.json(
        { error: "A senha deve conter letras maiúsculas, minúsculas e números" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar usuário atual
    const [user] = await db
      .select({
        id: users.id,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Verificar senha atual
    const senhaValida = await bcrypt.compare(senhaAtual, user.passwordHash);
    if (!senhaValida) {
      // Registra tentativa falhada para detecção de padrões suspeitos
      recordFailedAttempt(clientIP, "password-change");
      recordFailedAttempt(userId, "password-change");

      return NextResponse.json(
        { error: "Senha atual incorreta" },
        { status: 400 }
      );
    }

    // Verifica se a nova senha é diferente da atual
    const mesmaSenha = await bcrypt.compare(novaSenha, user.passwordHash);
    if (mesmaSenha) {
      return NextResponse.json(
        { error: "A nova senha deve ser diferente da senha atual" },
        { status: 400 }
      );
    }

    // Hash da nova senha com custo mais alto
    const novoHash = await bcrypt.hash(novaSenha, 12);

    // Atualizar senha
    await db
      .update(users)
      .set({
        passwordHash: novoHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // Limpa padrões suspeitos após sucesso
    clearSuspiciousPattern(clientIP, "password-change");
    clearSuspiciousPattern(userId, "password-change");

    return NextResponse.json(
      { success: true, message: "Senha alterada com sucesso" },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erro ao alterar senha:", error);
    }

    return NextResponse.json(
      { error: "Erro ao alterar senha" },
      { status: 500 }
    );
  }
}
