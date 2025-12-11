import { Resend } from "resend";

// Verifica se a API key está configurada
if (!process.env.RESEND_API_KEY) {
  console.warn("⚠️ RESEND_API_KEY não configurada. Emails não serão enviados.");
}

const resend = new Resend(process.env.RESEND_API_KEY || "");

/**
 * Envia email usando Resend
 */
export async function enviarEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  const { to, subject, html } = params;

  // Se não tiver API key configurada, apenas loga
  if (!process.env.RESEND_API_KEY) {
    console.log("📧 [MODO DEV] Email que seria enviado:");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("---");
    return { success: true, mode: "dev" };
  }

  try {
    console.log("📧 Tentando enviar email...");
    console.log("   From:", process.env.RESEND_FROM_EMAIL || "EntrevistIA <onboarding@resend.dev>");
    console.log("   To:", to);
    console.log("   Subject:", subject);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "EntrevistIA <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Erro ao enviar email:");
      console.error("   Message:", error.message);
      console.error("   Name:", error.name);
      console.error("   Full error:", JSON.stringify(error, null, 2));

      // Em desenvolvimento, se o erro for de validação de domínio, não falha
      const isDevelopment = process.env.NODE_ENV !== 'production';
      const isDomainError = error.message?.includes('verify a domain') ||
                           error.message?.includes('testing emails') ||
                           error.message?.includes('domain');

      if (isDevelopment && isDomainError) {
        console.warn("⚠️ [MODO DEV] Email não enviado (domínio não verificado), mas não falhando o processo");
        console.warn("⚠️ O código de verificação está disponível nos logs do servidor");
        console.warn("⚠️ Configure o domínio no painel do Resend: https://resend.com/domains");
        return { success: true, mode: "dev-domain-error", error };
      }

      throw new Error(`Falha ao enviar email: ${error.message}`);
    }

    console.log("✅ Email enviado com sucesso!");
    console.log("   ID:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Erro crítico ao enviar email:", error);
    throw error;
  }
}
