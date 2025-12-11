import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users, auditLogs, verificationCodes } from "@/lib/db/schema";
import { cadastroUserSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";
import { emailVerificacaoTemplate, gerarCodigoVerificacao } from "@/lib/email/templates";
import { logger, sanitizeEmail, sanitizeName, sanitizePhone, sanitizeString, hashVerificationCode } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação com Zod
    const validatedData = cadastroUserSchema.parse(body);

    // Sanitiza os dados de entrada
    const sanitizedData = {
      ...validatedData,
      nome: sanitizeName(validatedData.nome),
      email: sanitizeEmail(validatedData.email),
      telefone: validatedData.telefone ? sanitizePhone(validatedData.telefone) : null,
      empresa: validatedData.empresa ? sanitizeString(validatedData.empresa) : null,
      cargo: validatedData.cargo ? sanitizeString(validatedData.cargo) : null,
    };

    // Verifica se o email já existe
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, sanitizedData.email))
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
        nome: sanitizedData.nome,
        email: sanitizedData.email,
        telefone: sanitizedData.telefone,
        empresa: sanitizedData.empresa,
        cargo: sanitizedData.cargo,
        passwordHash,
        emailVerified: null, // Ainda não verificado
        aceitouTermos: true,
        aceitouPrivacidade: true,
        dataAceiteTermos: new Date(),
        aceitaEmailMarketing: sanitizedData.aceitaEmailMarketing || false,
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

    // Gera código de verificação (código original para email, hash para banco)
    const codigo = gerarCodigoVerificacao();
    const codigoHash = hashVerificationCode(codigo);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    await db.insert(verificationCodes).values({
      userId: newUser.id,
      email: newUser.email,
      code: codigoHash, // Armazena hash, não o código original
      type: "email_verification",
      expiresAt,
      ipAddress,
    });

    // Envia email de verificação
    try {
      console.log(`📧 Tentando enviar email de verificação para: ${newUser.email}`);
      console.log(`🔢 Código gerado: ${codigo}`);

      const emailResult = await enviarEmail({
        to: newUser.email,
        subject: "Verifique seu email - EntrevistIA",
        html: emailVerificacaoTemplate({
          nome: newUser.nome,
          codigo,
          email: newUser.email,
        }),
      });

      console.log("✅ Email enviado com sucesso:", emailResult);
    } catch (emailError) {
      console.error("❌ Erro ao enviar email de verificação:", emailError);
      logger.error("Erro ao enviar email de verificação", emailError);
      // Não falha o cadastro se o email não for enviado
    }

    // Remove dados sensíveis da resposta
    const { passwordHash: _passwordHash, ...userWithoutPassword } = newUser;

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
    logger.error("Erro no cadastro", error);

    // Erros de validação do Zod
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as { issues: Array<{ path: string[]; message: string }> };
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: {
            issues: zodError.issues
          },
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
