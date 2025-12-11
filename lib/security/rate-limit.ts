/**
 * Rate Limiting para proteção contra ataques de força bruta e abuso
 *
 * Implementa um sistema de rate limiting em memória com suporte a:
 * - Limite por IP
 * - Limite por identificador (email, userId, etc)
 * - Diferentes configurações por endpoint
 * - Limpeza automática de entradas expiradas
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  blockedUntil?: number;
}

interface RateLimitConfig {
  windowMs: number;      // Janela de tempo em ms
  maxRequests: number;   // Máximo de requests na janela
  blockDurationMs?: number; // Duração do bloqueio (padrão: windowMs)
  skipSuccessfulRequests?: boolean; // Não conta requests bem-sucedidos
}

// Configurações predefinidas para diferentes endpoints
export const RATE_LIMIT_CONFIGS = {
  // Login: 5 tentativas a cada 15 minutos, bloqueio de 30 minutos
  login: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    blockDurationMs: 30 * 60 * 1000,
  },
  // Cadastro: 3 cadastros por IP a cada hora
  signup: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 3,
    blockDurationMs: 60 * 60 * 1000,
  },
  // Verificação de código: 5 tentativas a cada 5 minutos
  verification: {
    windowMs: 5 * 60 * 1000,
    maxRequests: 5,
    blockDurationMs: 15 * 60 * 1000,
  },
  // Reenvio de código: 3 reenvios a cada 10 minutos
  resendCode: {
    windowMs: 10 * 60 * 1000,
    maxRequests: 3,
    blockDurationMs: 30 * 60 * 1000,
  },
  // API geral: 100 requests por minuto
  api: {
    windowMs: 60 * 1000,
    maxRequests: 100,
  },
  // Admin login: mais restritivo - 3 tentativas a cada 30 minutos
  adminLogin: {
    windowMs: 30 * 60 * 1000,
    maxRequests: 3,
    blockDurationMs: 60 * 60 * 1000,
  },
  // Análise de entrevista: 10 por hora (recurso caro de IA)
  analysis: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    blockDurationMs: 30 * 60 * 1000,
  },
  // Envio de email: 10 por hora
  email: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    blockDurationMs: 60 * 60 * 1000,
  },
} as const;

// Armazenamento em memória (em produção, usar Redis para escalabilidade)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpeza periódica de entradas expiradas (a cada 5 minutos)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let cleanupTimer: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      // Remove entradas que expiraram há mais de 1 hora
      const maxExpiry = Math.max(
        entry.firstRequest + 60 * 60 * 1000,
        entry.blockedUntil || 0
      );
      if (now > maxExpiry) {
        rateLimitStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);

  // Não impede o processo de encerrar
  cleanupTimer.unref();
}

// Inicia limpeza ao importar o módulo
startCleanup();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
  retryAfter?: number; // segundos até poder tentar novamente
}

/**
 * Verifica se uma requisição deve ser limitada
 *
 * @param identifier - Identificador único (IP, email, userId, etc)
 * @param configKey - Chave da configuração predefinida
 * @returns Resultado indicando se a requisição é permitida
 */
export function checkRateLimit(
  identifier: string,
  configKey: keyof typeof RATE_LIMIT_CONFIGS
): RateLimitResult {
  const config = RATE_LIMIT_CONFIGS[configKey];
  return checkRateLimitCustom(identifier, config);
}

/**
 * Verifica rate limit com configuração customizada
 */
export function checkRateLimitCustom(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitStore.get(key);

  // Se está bloqueado, verifica se o bloqueio expirou
  if (entry?.blockedUntil && now < entry.blockedUntil) {
    const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetAt: new Date(entry.blockedUntil),
      retryAfter,
    };
  }

  // Se não existe entrada ou a janela expirou, cria nova
  if (!entry || now - entry.firstRequest > config.windowMs) {
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
    });

    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetAt: new Date(now + config.windowMs),
    };
  }

  // Incrementa contador
  entry.count++;

  // Verifica se excedeu o limite
  if (entry.count > config.maxRequests) {
    const blockDuration = config.blockDurationMs || config.windowMs;
    entry.blockedUntil = now + blockDuration;

    return {
      success: false,
      remaining: 0,
      resetAt: new Date(entry.blockedUntil),
      retryAfter: Math.ceil(blockDuration / 1000),
    };
  }

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetAt: new Date(entry.firstRequest + config.windowMs),
  };
}

/**
 * Remove o registro de rate limit para um identificador
 * Útil após login bem-sucedido
 */
export function clearRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Obtém o IP do cliente de forma segura
 */
export function getClientIP(request: Request): string {
  // Verifica headers em ordem de prioridade
  const headers = request.headers;

  // Cloudflare
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;

  // X-Forwarded-For (pode conter múltiplos IPs separados por vírgula)
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    // O primeiro IP é o do cliente original
    return ips[0];
  }

  // X-Real-IP
  const realIP = headers.get('x-real-ip');
  if (realIP) return realIP;

  // Vercel
  const vercelForwardedFor = headers.get('x-vercel-forwarded-for');
  if (vercelForwardedFor) return vercelForwardedFor;

  return 'unknown';
}

/**
 * Cria uma chave de rate limit combinando múltiplos identificadores
 */
export function createRateLimitKey(...parts: string[]): string {
  return parts.filter(Boolean).join(':');
}

/**
 * Headers de rate limit para incluir na resposta
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': result.resetAt.toISOString(),
  };

  if (result.retryAfter) {
    headers['Retry-After'] = String(result.retryAfter);
  }

  return headers;
}

/**
 * Helper para criar resposta de rate limit excedido
 */
export function rateLimitExceededResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      error: 'Muitas tentativas. Por favor, aguarde antes de tentar novamente.',
      retryAfter: result.retryAfter,
      resetAt: result.resetAt.toISOString(),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        ...getRateLimitHeaders(result),
      },
    }
  );
}
