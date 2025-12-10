/**
 * Server-side Logger com persistência em banco de dados
 *
 * Este módulo estende o logger base para incluir:
 * - Persistência automática de erros no banco
 * - Criação automática de tickets para erros críticos
 * - Integração com o sistema de monitoramento
 */

import { logger, LogContext, createComponentLogger, createRequestLogger } from "./index";
import { logSystemError, createTicketFromError } from "@/lib/support/ticket-service";

export interface ServerLogContext extends LogContext {
  persistToDb?: boolean;
  createTicketOnError?: boolean;
}

/**
 * Loga e persiste erro no banco de dados
 */
export async function logAndPersistError(
  message: string,
  error: Error | unknown,
  context: ServerLogContext = {}
): Promise<string | null> {
  const errorObj = error instanceof Error ? error : new Error(String(error));

  // Log no console
  logger.error(message, error, context);

  // Persiste no banco se solicitado ou se for erro crítico
  if (context.persistToDb !== false) {
    try {
      const ticketId = await logSystemError({
        level: "error",
        message,
        errorMessage: errorObj.message,
        errorStack: errorObj.stack,
        component: context.component,
        userId: context.userId,
        userEmail: context.userEmail,
        requestId: context.requestId,
        endpoint: context.endpoint,
        method: context.method,
        statusCode: context.statusCode,
        duration: context.duration,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        context: context as Record<string, unknown>,
        createTicket: context.createTicketOnError,
      });
      return ticketId;
    } catch (persistError) {
      // Se falhar persistência, só loga no console
      console.error("[ServerLogger] Erro ao persistir:", persistError);
    }
  }

  return null;
}

/**
 * Loga erro crítico (sempre persiste e cria ticket)
 */
export async function logCriticalError(
  message: string,
  error: Error | unknown,
  context: ServerLogContext = {}
): Promise<string | null> {
  const errorObj = error instanceof Error ? error : new Error(String(error));

  // Log no console
  logger.critical(message, error, context);

  try {
    // Cria ticket automaticamente
    const ticket = await createTicketFromError(errorObj, {
      userId: context.userId,
      userEmail: context.userEmail,
      pageUrl: context.endpoint,
      component: context.component,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      additionalContext: context as Record<string, unknown>,
    });

    return ticket?.id || null;
  } catch (ticketError) {
    console.error("[ServerLogger] Erro ao criar ticket:", ticketError);
    return null;
  }
}

/**
 * Wrapper para APIs - loga requisição e erros automaticamente
 */
export function createApiLogger(
  endpoint: string,
  method: string,
  requestInfo?: {
    userId?: string;
    userEmail?: string;
    ipAddress?: string;
    userAgent?: string;
  }
) {
  const startTime = Date.now();
  const apiLogger = createComponentLogger(`api:${endpoint}`);

  return {
    logger: apiLogger,

    info: (message: string, ctx?: LogContext) => {
      apiLogger.info(message, { ...requestInfo, endpoint, method, ...ctx });
    },

    warn: (message: string, ctx?: LogContext) => {
      apiLogger.warn(message, { ...requestInfo, endpoint, method, ...ctx });
    },

    error: async (message: string, error?: Error | unknown, ctx?: LogContext) => {
      const duration = Date.now() - startTime;
      await logAndPersistError(message, error, {
        ...requestInfo,
        endpoint,
        method,
        duration,
        ...ctx,
      });
    },

    success: (statusCode: number, ctx?: LogContext) => {
      const duration = Date.now() - startTime;
      apiLogger.httpRequest(method, endpoint, statusCode, duration, {
        ...requestInfo,
        ...ctx,
      });
    },
  };
}

// Re-exporta tudo do logger base
export {
  logger,
  createComponentLogger,
  createRequestLogger,
  type LogContext,
} from "./index";

// Loggers especializados para server
export const serverDbLogger = createComponentLogger("server:database");
export const serverAuthLogger = createComponentLogger("server:auth");
export const serverAiLogger = createComponentLogger("server:ai");
export const serverBillingLogger = createComponentLogger("server:billing");
export const serverEmailLogger = createComponentLogger("server:email");
