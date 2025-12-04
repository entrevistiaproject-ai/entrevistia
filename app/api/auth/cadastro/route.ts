import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users, auditLogs, verificationCodes } from "@/lib/db/schema";
import { cadastroUserSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import { emailVerificacaoTemplate, gerarCodigoVerificacao } from "@/lib/email/templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação com Zod
    const validatedData = cadastroUserSchema.parse(body);

    // Verifica se o email já existe
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          error: "Email já cadastrado",
          field: "email",
        },
        { status: 400 }
      );
    }

    // Hash da senha
    const passwordHash = await hash(validatedData.senha, 12);

    // Captura IP e User Agent para auditoria LGPD
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Cria o usuário (ainda não verificado)
    const [newUser] = await db
      .insert(users)
      .values({
        nome: validatedData.nome,
        email: validatedData.email,
        telefone: validatedData.telefone || null,
        empresa: validatedData.empresa || null,
        cargo: validatedData.cargo || null,
        passwordHash,
        emailVerified: null, // Ainda não verificado
        aceitouTermos: true,
        aceitouPrivacidade: true,
        dataAceiteTermos: new Date(),
        aceitaEmailMarketing: validatedData.aceitaEmailMarketing || false,
        ipCadastro: ipAddress,
        userAgentCadastro: userAgent,
      })
      .returning();

    // Log de auditoria LGPD
    await db.insert(auditLogs).values({
      userId: newUser.id,
      userEmail: newUser.email,
      acao: "create",
      entidade: "users",
      entidadeId: newUser.id,
      descricao: "Cadastro de novo usuário",
      tipoOperacaoLGPD: "tratamento",
      baseJuridica: "consentimento",
      finalidade: "Criação de conta para uso da plataforma",
      ipAddress,
      userAgent,
    });

    // Gera código de verificação
    const codigo = gerarCodigoVerificacao();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    await db.insert(verificationCodes).values({
      userId: newUser.id,
      email: newUser.email,
      code: codigo,
      type: "email_verification",
      expiresAt,
      ipAddress,
    });

    // Envia email de verificação
    try {
      await enviarEmail({
        to: newUser.email,
        subject: "Verifique seu email - EntrevistIA",
        html: emailVerificacaoTemplate({
          nome: newUser.nome,
          codigo,
          email: newUser.email,
        }),
      });
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError);
      // Não falha o cadastro se o email não for enviado
    }

    // Remove dados sensíveis da resposta
    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        message: "Cadastro realizado com sucesso! Verifique seu email.",
        user: {
          id: userWithoutPassword.id,
          nome: userWithoutPassword.nome,
          email: userWithoutPassword.email,
        },
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);

    // Erros de validação do Zod
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: error,
        },
        { status: 400 }
      );
    }

    // Erro genérico
    return NextResponse.json(
      {
        error: "Erro ao criar cadastro. Tente novamente.",
      },
      { status: 500 }
    );
  }
}
