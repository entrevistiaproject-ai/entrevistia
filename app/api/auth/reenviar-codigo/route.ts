import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verificationCodes, users } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { z } from "zod";
import { enviarEmail } from "@/lib/email/resend";
import { emailVerificacaoTemplate } from "@/lib/email/templates";

const resendCodeSchema = z.object({
  email: z.string().email("Email inválido"),
});

// Gera código de 6 dígitos
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Valida os dados
    const validation = resendCodeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Email inválido", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email } = validation.data;

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

    // Verifica se há muitos códigos recentes (rate limiting)
    const codigosRecentes = await db
      .select()
      .from(verificationCodes)
      .where(
        and(
          eq(verificationCodes.user_id, user.id),
          eq(verificationCodes.type, "email_verification"),
          gt(verificationCodes.created_at, new Date(Date.now() - 5 * 60 * 1000)) // últimos 5 minutos
        )
      );

    if (codigosRecentes.length >= 3) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde alguns minutos." },
        { status: 429 }
      );
    }

    // Marca códigos antigos como expirados
    await db
      .update(verificationCodes)
      .set({ used: "true" })
      .where(
        and(
          eq(verificationCodes.user_id, user.id),
          eq(verificationCodes.type, "email_verification"),
          eq(verificationCodes.used, "false")
        )
      );

    // Gera novo código
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Insere no banco
    await db.insert(verificationCodes).values({
      user_id: user.id,
      email: user.email,
      code,
      type: "email_verification",
      expires_at: expiresAt,
      used: "false",
      attempts: 0,
      ip_address: ipAddress,
    });

    // Envia email
    try {
      const htmlContent = emailVerificacaoTemplate({
        nome: user.nome,
        codigo: code,
        email: user.email,
      });

      await enviarEmail({
        to: user.email,
        subject: "Verifique seu email - EntrevistIA",
        html: htmlContent,
      });

      // Se estiver em modo dev (sem API key), loga o código
      if (!process.env.RESEND_API_KEY) {
        console.log("\n🔑 CÓDIGO DE VERIFICAÇÃO (modo dev):");
        console.log(`Email: ${user.email}`);
        console.log(`Código: ${code}`);
        console.log(`Expira em: ${expiresAt.toLocaleString("pt-BR")}\n`);
      }

    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError);
      // Não retorna erro para o usuário, mas loga
    }

    return NextResponse.json(
      {
        message: "Código reenviado com sucesso!",
        success: true,
        expiresIn: 15, // minutos
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao reenviar código:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
