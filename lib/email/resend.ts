import { Resend } from "resend";
import { emailLogger } from "@/lib/logger";
import { logAndPersistError } from "@/lib/logger/server-logger";

// Verifica se a API key está configurada
if (!process.env.RESEND_API_KEY) {
  emailLogger.warn("RESEND_API_KEY não configurada. Emails não serão enviados.");
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
    emailLogger.info("[MODO DEV] Email que seria enviado", {
      to,
      subject,
      action: "email_dev_mode",
    });
    return { success: true, mode: "dev" };
  }

  const startTime = Date.now();

  try {
    emailLogger.info("Tentando enviar email", {
      to,
      subject,
      from: process.env.RESEND_FROM_EMAIL || "EntrevistIA <onboarding@resend.dev>",
      action: "email_send_attempt",
    });

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "EntrevistIA <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    const duration = Date.now() - startTime;

    if (error) {
      const isDevelopment = process.env.NODE_ENV !== 'production';
      const isDomainError = error.message?.includes('verify a domain') ||
                           error.message?.includes('testing emails') ||
                           error.message?.includes('domain');

      // Em desenvolvimento, se o erro for de validação de domínio, não falha
      if (isDevelopment && isDomainError) {
        emailLogger.warn("Email não enviado (domínio não verificado em DEV)", {
          to,
          subject,
          errorMessage: error.message,
          duration,
          action: "email_domain_not_verified",
        });
        return { success: true, mode: "dev-domain-error", error };
      }

      // Erro real de envio - persiste no banco de dados
      const errorObj = new Error(`Falha ao enviar email: ${error.message}`);

      // Persiste o erro no banco de dados para monitoramento
      await logAndPersistError("Erro ao enviar email", errorObj, {
        component: "email:resend",
        to,
        subject,
        errorMessage: error.message,
        errorName: error.name,
        duration,
        action: "email_send_error",
        persistToDb: true,
      });

      throw errorObj;
    }

    emailLogger.info("Email enviado com sucesso", {
      to,
      subject,
      emailId: data?.id,
      duration,
      action: "email_sent_success",
    });

    return { success: true, data };
  } catch (error) {
    const duration = Date.now() - startTime;

    // Persiste erro crítico no banco de dados
    await logAndPersistError("Erro crítico ao enviar email", error, {
      component: "email:resend",
      to,
      subject,
      duration,
      action: "email_critical_error",
      persistToDb: true,
      createTicketOnError: true, // Cria ticket para erros críticos de email
    });

    throw error;
  }
}
