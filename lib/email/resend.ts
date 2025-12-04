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
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "EntrevistIA <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Erro ao enviar email:", error);
      throw new Error("Falha ao enviar email");
    }

    console.log("✅ Email enviado com sucesso:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    throw error;
  }
}
