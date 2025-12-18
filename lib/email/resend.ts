import { Resend } from "resend";
import { emailLogger } from "@/lib/logger";
import { logAndPersistError } from "@/lib/logger/server-logger";

// Verifica se a API key está configurada
if (!process.env.RESEND_API_KEY) {
  emailLogger.warn("RESEND_API_KEY não configurada. Emails não serão enviados.");
}

const resend = new Resend(process.env.RESEND_API_KEY || "");

export interface EmailResult {
  success: boolean;
  sent: boolean; // Indica se o email foi REALMENTE enviado (não só tentado)
  emailId?: string;
  mode?: "production" | "dev" | "dev-domain-error";
  error?: unknown;
}

/**
 * Envia email usando Resend
 *
 * IMPORTANTE: Verifica o campo `sent` para saber se o email foi realmente enviado.
 * - sent: true = email entregue ao Resend com sucesso
 * - sent: false = email NÃO foi enviado (modo dev, erro de domínio, etc)
 */
export async function enviarEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<EmailResult> {
  const { to, subject, html } = params;

  // Se não tiver API key configurada, apenas loga (email NÃO enviado)
  if (!process.env.RESEND_API_KEY) {
    emailLogger.info("[MODO DEV] Email que seria enviado (API key não configurada)", {
      to,
      subject,
      action: "email_dev_mode",
    });
    return { success: true, sent: false, mode: "dev" };
  }

  const startTime = Date.now();
  const fromEmail = process.env.RESEND_FROM_EMAIL || "EntrevistIA <onboarding@resend.dev>";

  try {
    emailLogger.info("Tentando enviar email", {
      to,
      subject,
      from: fromEmail,
      action: "email_send_attempt",
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    });

    const duration = Date.now() - startTime;

    if (error) {
      const isDomainError = error.message?.includes('verify a domain') ||
                           error.message?.includes('testing emails') ||
                           error.message?.includes('domain') ||
                           error.message?.includes('can only send');

      // Loga o erro sempre
      emailLogger.error("Erro ao enviar email", {
        to,
        subject,
        errorMessage: error.message,
        errorName: error.name,
        duration,
        isDomainError,
        action: "email_send_error",
      });

      // Se for erro de domínio (remetente não verificado), retorna sent: false
      // mas não lança erro para não quebrar o fluxo
      if (isDomainError) {
        emailLogger.warn("Email NÃO enviado - domínio/remetente não verificado no Resend", {
          to,
          subject,
          from: fromEmail,
          errorMessage: error.message,
          duration,
          action: "email_domain_not_verified",
        });
        return { success: true, sent: false, mode: "dev-domain-error", error };
      }

      // Erro real de envio - persiste e lança
      const errorObj = new Error(`Falha ao enviar email: ${error.message}`);

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

    return { success: true, sent: true, emailId: data?.id, mode: "production" };
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
      createTicketOnError: true,
    });

    throw error;
  }
}
