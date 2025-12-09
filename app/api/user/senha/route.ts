import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

/**
 * PUT /api/user/senha
 * Altera a senha do usuário
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

    if (novaSenha.length < 6) {
      return NextResponse.json(
        { error: "A nova senha deve ter pelo menos 6 caracteres" },
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
      return NextResponse.json(
        { error: "Senha atual incorreta" },
        { status: 400 }
      );
    }

    // Hash da nova senha
    const novoHash = await bcrypt.hash(novaSenha, 10);

    // Atualizar senha
    await db
      .update(users)
      .set({
        passwordHash: novoHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true, message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return NextResponse.json(
      { error: "Erro ao alterar senha" },
      { status: 500 }
    );
  }
}
