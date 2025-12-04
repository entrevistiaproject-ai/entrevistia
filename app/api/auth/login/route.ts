import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, auditLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Valida os dados
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, senha } = validation.data;

    // Busca o usuário
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Email ou senha incorretos", field: "geral" },
        { status: 401 }
      );
    }

    // Verifica se a conta está ativa
    if (!user.isActive || user.deletedAt) {
      return NextResponse.json(
        { error: "Conta inativa ou excluída", field: "geral" },
        { status: 403 }
      );
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, user.passwordHash);
    if (!senhaValida) {
      // Log de tentativa de login falha
      const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
      const userAgent = request.headers.get("user-agent") || "unknown";

      await db.insert(auditLogs).values({
        userId: user.id,
        userEmail: user.email,
        acao: "login_failed",
        entidade: "users",
        entidadeId: user.id,
        descricao: "Tentativa de login com senha incorreta",
        tipoOperacaoLGPD: "autenticacao",
        baseJuridica: "execucao_contrato",
        finalidade: "Segurança e auditoria de acessos",
        ipAddress: ipAddress,
        userAgent: userAgent,
      });

      return NextResponse.json(
        { error: "Email ou senha incorretos", field: "geral" },
        { status: 401 }
      );
    }

    // Verifica se o email foi verificado
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Email não verificado. Verifique sua caixa de entrada.",
          needsVerification: true,
          email: user.email
        },
        { status: 403 }
      );
    }

    // Captura informações para auditoria
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Log de login bem-sucedido
    await db.insert(auditLogs).values({
      userId: user.id,
      userEmail: user.email,
      acao: "login_success",
      entidade: "users",
      entidadeId: user.id,
      descricao: "Login realizado com sucesso",
      tipoOperacaoLGPD: "autenticacao",
      baseJuridica: "execucao_contrato",
      finalidade: "Autenticação e controle de acesso ao sistema",
      ipAddress: ipAddress,
      userAgent: userAgent,
    });

    // Atualiza updatedAt
    await db
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, user.id));

    // Remove dados sensíveis
    const { passwordHash: _passwordHash, ...userWithoutPassword } = user;

    // Em produção, você criaria um JWT ou session token aqui
    // Por enquanto, retornamos os dados do usuário
    const response = NextResponse.json(
      {
        message: "Login realizado com sucesso",
        user: userWithoutPassword,
      },
      { status: 200 }
    );

    // TODO: Implementar JWT ou session cookie
    // response.cookies.set('session', token, { httpOnly: true, secure: true });

    return response;

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
