/**
 * Módulo de Proteção Centralizada para APIs
 *
 * Fornece helpers e wrappers para proteger rotas de API contra:
 * - Brute force
 * - API abuse
 * - Bots maliciosos
 * - Requests malformados
 */

import { NextRequest, NextResponse } from "next/server";
import {
  checkCombinedRateLimit,
  checkAIRateLimit,
  getClientIP,
  getRateLimitHeaders,
  recordFailedAttempt,
  clearSuspiciousPattern,
  RATE_LIMIT_CONFIGS,
} from "./rate-limit";
import { withBotProtection, checkAIEndpointProtection } from "./bot-detection";

export type ProtectionLevel = "low" | "medium" | "high" | "ai";

export interface ProtectionConfig {
  level: ProtectionLevel;
  rateLimitKey?: keyof typeof RATE_LIMIT_CONFIGS;
  requireAuth?: boolean;
  botProtection?: boolean;
  botThreshold?: number;
  customIdentifier?: string;
}

export interface ProtectionResult {
  allowed: boolean;
  response?: Response;
  ip: string;
  userId?: string;
}

// Configurações padrão por nível de proteção
const PROTECTION_LEVELS: Record<ProtectionLevel, Partial<ProtectionConfig>> = {
  low: {
    rateLimitKey: "api",
    botProtection: false,
    botThreshold: 90,
  },
  medium: {
    rateLimitKey: "api",
    botProtection: true,
    botThreshold: 70,
  },
  high: {
    rateLimitKey: "api",
    botProtection: true,
    botThreshold: 50,
  },
  ai: {
    rateLimitKey: "analysis",
    botProtection: true,
    botThreshold: 40,
  },
};

/**
 * Aplica proteção a uma requisição
 *
 * @example
 * ```typescript
 * export async function POST(request: NextRequest) {
 *   const protection = await applyProtection(request, {
 *     level: "high",
 *     requireAuth: true,
 *   });
 *
 *   if (!protection.allowed) {
 *     return protection.response;
 *   }
 *
 *   // Continua com a lógica...
 * }
 * ```
 */
export async function applyProtection(
  request: NextRequest,
  config: ProtectionConfig,
  userId?: string
): Promise<ProtectionResult> {
  const ip = getClientIP(request);
  const levelConfig = PROTECTION_LEVELS[config.level];
  const finalConfig = { ...levelConfig, ...config };

  // Proteção contra bots
  if (finalConfig.botProtection) {
    const botCheck = withBotProtection(
      request,
      finalConfig.rateLimitKey || "api",
      {
        allowLegitBots: false,
        blockThreshold: finalConfig.botThreshold || 70,
      }
    );

    if (!botCheck.allowed) {
      recordFailedAttempt(ip, finalConfig.rateLimitKey || "api");
      return {
        allowed: false,
        response: botCheck.response,
        ip,
        userId,
      };
    }
  }

  // Rate limiting
  const rateLimitResult = checkCombinedRateLimit({
    ip,
    userId,
    endpoint: finalConfig.customIdentifier || finalConfig.rateLimitKey || "api",
    configKey: finalConfig.rateLimitKey || "api",
  });

  if (!rateLimitResult.success) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: "Muitas requisições. Tente novamente mais tarde.",
          retryAfter: rateLimitResult.retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...getRateLimitHeaders(rateLimitResult),
          },
        }
      ),
      ip,
      userId,
    };
  }

  return {
    allowed: true,
    ip,
    userId,
  };
}

/**
 * Aplica proteção específica para endpoints de IA
 */
export async function applyAIProtection(
  request: NextRequest,
  userId?: string,
  operationType: "transcription" | "analysis" = "analysis"
): Promise<ProtectionResult> {
  const ip = getClientIP(request);

  // Verificação específica para IA
  const aiCheck = checkAIEndpointProtection(request, operationType);
  if (!aiCheck.allowed) {
    recordFailedAttempt(ip, operationType);
    return {
      allowed: false,
      response: aiCheck.response,
      ip,
      userId,
    };
  }

  // Rate limiting específico para IA
  const rateLimitCheck = checkAIRateLimit(request, userId, operationType);
  if (!rateLimitCheck.allowed) {
    return {
      allowed: false,
      response: rateLimitCheck.response,
      ip,
      userId,
    };
  }

  return {
    allowed: true,
    ip,
    userId,
  };
}

/**
 * Handler de erro padronizado com logging de segurança
 */
export function securityErrorResponse(
  message: string,
  statusCode: number = 400,
  details?: unknown
): Response {
  const body: Record<string, unknown> = {
    error: message,
  };

  // Só inclui detalhes em desenvolvimento
  if (process.env.NODE_ENV === "development" && details) {
    body.details = details;
  }

  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Registra sucesso e limpa padrões suspeitos
 */
export function recordSuccess(ip: string, endpoint: string, userId?: string): void {
  clearSuspiciousPattern(ip, endpoint);
  if (userId) {
    clearSuspiciousPattern(userId, endpoint);
  }
}

/**
 * Wrapper para criar handlers protegidos
 *
 * @example
 * ```typescript
 * export const POST = createProtectedHandler(
 *   { level: "high", requireAuth: true },
 *   async (request, context) => {
 *     // Lógica do handler
 *     return NextResponse.json({ success: true });
 *   }
 * );
 * ```
 */
export function createProtectedHandler<TContext = Record<string, unknown>>(
  config: ProtectionConfig,
  handler: (
    request: NextRequest,
    context: TContext,
    protection: ProtectionResult
  ) => Promise<Response>
) {
  return async (request: NextRequest, context: TContext): Promise<Response> => {
    try {
      const protection = await applyProtection(request, config);

      if (!protection.allowed) {
        return protection.response!;
      }

      return await handler(request, context, protection);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error in protected handler:", error);
      }

      return securityErrorResponse("Erro interno do servidor", 500);
    }
  };
}

/**
 * Middleware para validar Content-Type
 */
export function validateContentType(
  request: NextRequest,
  expectedType: string
): { valid: boolean; response?: Response } {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes(expectedType)) {
    return {
      valid: false,
      response: securityErrorResponse(
        `Content-Type inválido. Esperado: ${expectedType}`,
        415
      ),
    };
  }

  return { valid: true };
}

/**
 * Valida tamanho do payload
 */
export async function validatePayloadSize(
  request: NextRequest,
  maxSizeBytes: number
): Promise<{ valid: boolean; response?: Response }> {
  const contentLength = request.headers.get("content-length");

  if (contentLength && parseInt(contentLength, 10) > maxSizeBytes) {
    return {
      valid: false,
      response: securityErrorResponse(
        `Payload muito grande. Máximo: ${Math.round(maxSizeBytes / 1024 / 1024)}MB`,
        413
      ),
    };
  }

  return { valid: true };
}

/**
 * Helpers para respostas comuns
 */
export const SecurityResponses = {
  unauthorized: () => securityErrorResponse("Não autenticado", 401),
  forbidden: () => securityErrorResponse("Acesso negado", 403),
  notFound: () => securityErrorResponse("Recurso não encontrado", 404),
  rateLimited: (retryAfter?: number) =>
    new Response(
      JSON.stringify({
        error: "Muitas requisições. Tente novamente mais tarde.",
        retryAfter,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}),
        },
      }
    ),
  invalidInput: (message: string) => securityErrorResponse(message, 400),
  serverError: () => securityErrorResponse("Erro interno do servidor", 500),
};

/**
 * Extrai e valida headers de segurança
 */
export function extractSecurityContext(request: NextRequest): {
  ip: string;
  userAgent: string;
  origin: string | null;
  referer: string | null;
} {
  return {
    ip: getClientIP(request),
    userAgent: request.headers.get("user-agent") || "unknown",
    origin: request.headers.get("origin"),
    referer: request.headers.get("referer"),
  };
}
