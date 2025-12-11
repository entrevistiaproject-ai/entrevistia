/**
 * Rate Limiting Avançado para proteção contra ataques de força bruta e abuso de API
 *
 * Implementa um sistema de rate limiting em memória com suporte a:
 * - Limite por IP
 * - Limite por identificador (email, userId, etc)
 * - Diferentes configurações por endpoint
 * - Limpeza automática de entradas expiradas
 * - Sliding window para rate limiting mais preciso
 * - Bloqueio progressivo (exponential backoff)
 * - Detecção de padrões suspeitos
 * - Custo por operação (tokens) para APIs de IA
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  blockedUntil?: number;
  blockCount?: number; // Número de vezes que foi bloqueado (para backoff exponencial)
  lastRequest?: number;
  requestTimestamps?: number[]; // Para sliding window
}

interface RateLimitConfig {
  windowMs: number;      // Janela de tempo em ms
  maxRequests: number;   // Máximo de requests na janela
  blockDurationMs?: number; // Duração do bloqueio (padrão: windowMs)
  skipSuccessfulRequests?: boolean; // Não conta requests bem-sucedidos
  enableSlidingWindow?: boolean; // Usa sliding window ao invés de fixed window
  enableProgressiveBlocking?: boolean; // Aumenta tempo de bloqueio a cada violação
  maxBlockDurationMs?: number; // Máximo tempo de bloqueio para progressive blocking
}

// Configurações predefinidas para diferentes endpoints
export const RATE_LIMIT_CONFIGS = {
  // Login: 5 tentativas a cada 15 minutos, bloqueio de 30 minutos
  login: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    blockDurationMs: 30 * 60 * 1000,
    enableProgressiveBlocking: true,
    maxBlockDurationMs: 24 * 60 * 60 * 1000, // Máximo 24 horas
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
    enableProgressiveBlocking: true,
    maxBlockDurationMs: 2 * 60 * 60 * 1000, // Máximo 2 horas
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
    enableProgressiveBlocking: true,
    maxBlockDurationMs: 24 * 60 * 60 * 1000, // Máximo 24 horas
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
  // ============ NOVOS CONFIGS PARA IA E API ABUSE ============
  // Transcrição de áudio (OpenAI Whisper) - operação muito cara
  transcription: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 20, // 20 transcrições por hora
    blockDurationMs: 60 * 60 * 1000, // Bloqueio de 1 hora
    enableSlidingWindow: true,
  },
  // Transcrição para usuários não autenticados - muito restritivo
  transcriptionPublic: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 5, // Apenas 5 por IP não autenticado
    blockDurationMs: 2 * 60 * 60 * 1000, // Bloqueio de 2 horas
    enableProgressiveBlocking: true,
    maxBlockDurationMs: 24 * 60 * 60 * 1000,
  },
  // Entrevista pública - início
  publicInterviewStart: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 10, // 10 inícios por hora por IP
    blockDurationMs: 60 * 60 * 1000,
  },
  // Entrevista pública - respostas
  publicInterviewResponse: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 30, // 30 respostas por minuto (para permitir fluxo normal)
    blockDurationMs: 5 * 60 * 1000,
  },
  // Entrevista pública - finalização
  publicInterviewFinish: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 5, // 5 finalizações por hora
    blockDurationMs: 60 * 60 * 1000,
  },
  // Alteração de senha
  passwordChange: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 5, // 5 alterações por hora
    blockDurationMs: 60 * 60 * 1000,
    enableProgressiveBlocking: true,
    maxBlockDurationMs: 24 * 60 * 60 * 1000,
  },
  // Tickets de suporte
  supportTicket: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 5, // 5 tickets por hora
    blockDurationMs: 60 * 60 * 1000,
  },
  // Log de erros
  errorLog: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 20, // 20 logs por minuto
    blockDurationMs: 5 * 60 * 1000,
  },
  // CRUD de perguntas
  questionsWrite: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 50, // 50 operações de escrita por hora
    blockDurationMs: 30 * 60 * 1000,
  },
  // CRUD de entrevistas
  interviewsWrite: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 30, // 30 operações por hora
    blockDurationMs: 30 * 60 * 1000,
  },
  // CRUD de candidatos
  candidatesWrite: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 50, // 50 operações por hora
    blockDurationMs: 30 * 60 * 1000,
  },
  // Sugestões de perguntas (operação mais leve)
  questionSuggestion: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 10, // 10 sugestões por minuto
    blockDurationMs: 5 * 60 * 1000,
  },
  // Operações de IA burst - para operações que precisam de múltiplas chamadas rápidas
  aiBurst: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 5, // 5 chamadas de IA por minuto
    blockDurationMs: 2 * 60 * 1000,
    enableSlidingWindow: true,
  },
  // Limite diário de IA por usuário
  aiDaily: {
    windowMs: 24 * 60 * 60 * 1000, // 24 horas
    maxRequests: 100, // 100 chamadas de IA por dia
    blockDurationMs: 60 * 60 * 1000, // Bloqueio de 1 hora (depois tenta de novo)
  },
} as const;

// Armazenamento em memória (em produção, usar Redis para escalabilidade)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Store para tokens de API (custo baseado em operação)
const tokenStore = new Map<string, { tokens: number; resetAt: number }>();

// Store para padrões suspeitos
const suspiciousPatternStore = new Map<string, {
  failedAttempts: number;
  lastFailedAttempt: number;
  flaggedAt?: number;
  flagReason?: string;
}>();

// Limpeza periódica de entradas expiradas (a cada 5 minutos)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let cleanupTimer: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();

    // Limpa rate limit store
    for (const [key, entry] of rateLimitStore.entries()) {
      const maxExpiry = Math.max(
        entry.firstRequest + 60 * 60 * 1000,
        entry.blockedUntil || 0
      );
      if (now > maxExpiry) {
        rateLimitStore.delete(key);
      }
    }

    // Limpa token store
    for (const [key, entry] of tokenStore.entries()) {
      if (now > entry.resetAt) {
        tokenStore.delete(key);
      }
    }

    // Limpa suspicious pattern store (mantém por 24 horas)
    for (const [key, entry] of suspiciousPatternStore.entries()) {
      if (now - entry.lastFailedAttempt > 24 * 60 * 60 * 1000) {
        suspiciousPatternStore.delete(key);
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
  blocked?: boolean; // Indica se está ativamente bloqueado
  blockCount?: number; // Número de bloqueios (para UI)
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
      blocked: true,
      blockCount: entry.blockCount || 1,
    };
  }

  // Se usa sliding window
  if (config.enableSlidingWindow) {
    return checkSlidingWindowRateLimit(key, config, now);
  }

  // Se não existe entrada ou a janela expirou, cria nova
  if (!entry || now - entry.firstRequest > config.windowMs) {
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now,
      blockCount: entry?.blockCount || 0, // Mantém histórico de bloqueios
    });

    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetAt: new Date(now + config.windowMs),
    };
  }

  // Incrementa contador
  entry.count++;
  entry.lastRequest = now;

  // Verifica se excedeu o limite
  if (entry.count > config.maxRequests) {
    let blockDuration = config.blockDurationMs || config.windowMs;

    // Progressive blocking: aumenta tempo de bloqueio exponencialmente
    if (config.enableProgressiveBlocking) {
      entry.blockCount = (entry.blockCount || 0) + 1;
      blockDuration = Math.min(
        blockDuration * Math.pow(2, entry.blockCount - 1),
        config.maxBlockDurationMs || 24 * 60 * 60 * 1000
      );
    }

    entry.blockedUntil = now + blockDuration;

    return {
      success: false,
      remaining: 0,
      resetAt: new Date(entry.blockedUntil),
      retryAfter: Math.ceil(blockDuration / 1000),
      blocked: true,
      blockCount: entry.blockCount,
    };
  }

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetAt: new Date(entry.firstRequest + config.windowMs),
  };
}

/**
 * Rate limit com sliding window para maior precisão
 */
function checkSlidingWindowRateLimit(
  key: string,
  config: RateLimitConfig,
  now: number
): RateLimitResult {
  let entry = rateLimitStore.get(key);

  if (!entry) {
    entry = {
      count: 0,
      firstRequest: now,
      requestTimestamps: [],
    };
    rateLimitStore.set(key, entry);
  }

  // Remove timestamps fora da janela
  const windowStart = now - config.windowMs;
  entry.requestTimestamps = (entry.requestTimestamps || []).filter(ts => ts > windowStart);

  // Verifica se está no limite
  if (entry.requestTimestamps.length >= config.maxRequests) {
    const oldestInWindow = Math.min(...entry.requestTimestamps);
    const retryAfter = Math.ceil((oldestInWindow + config.windowMs - now) / 1000);

    return {
      success: false,
      remaining: 0,
      resetAt: new Date(oldestInWindow + config.windowMs),
      retryAfter: Math.max(1, retryAfter),
    };
  }

  // Adiciona timestamp atual
  entry.requestTimestamps.push(now);
  entry.count = entry.requestTimestamps.length;
  entry.lastRequest = now;

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetAt: new Date(now + config.windowMs),
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
 * Reseta o contador de bloqueios (útil após verificação bem-sucedida)
 */
export function resetBlockCount(identifier: string): void {
  const entry = rateLimitStore.get(identifier);
  if (entry) {
    entry.blockCount = 0;
  }
}

/**
 * Obtém o IP do cliente de forma segura
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;

  // Cloudflare
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) return normalizeIP(cfConnectingIP);

  // X-Forwarded-For (pode conter múltiplos IPs separados por vírgula)
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return normalizeIP(ips[0]);
  }

  // X-Real-IP
  const realIP = headers.get('x-real-ip');
  if (realIP) return normalizeIP(realIP);

  // Vercel
  const vercelForwardedFor = headers.get('x-vercel-forwarded-for');
  if (vercelForwardedFor) return normalizeIP(vercelForwardedFor);

  return 'unknown';
}

/**
 * Normaliza IP para evitar bypass via diferentes representações
 */
function normalizeIP(ip: string): string {
  // Remove espaços
  ip = ip.trim();

  // Converte ::ffff:127.0.0.1 para 127.0.0.1
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }

  // Converte IPv6 localhost para IPv4
  if (ip === '::1') {
    ip = '127.0.0.1';
  }

  return ip.toLowerCase();
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

// ============ SISTEMA DE TOKENS PARA OPERAÇÕES DE IA ============

export interface TokenBucketConfig {
  maxTokens: number; // Máximo de tokens
  refillRate: number; // Tokens adicionados por segundo
  refillInterval: number; // Intervalo em ms para refill
}

export const TOKEN_BUCKET_CONFIGS = {
  // Transcrição: cada minuto de áudio custa tokens
  transcription: {
    maxTokens: 100, // 100 tokens máximo
    refillRate: 1, // 1 token por segundo
    refillInterval: 1000,
  },
  // Análise de IA: operações custam mais
  aiAnalysis: {
    maxTokens: 50,
    refillRate: 0.5, // 0.5 token por segundo (30/min)
    refillInterval: 2000,
  },
} as const;

/**
 * Sistema de token bucket para rate limiting baseado em custo
 * Útil para APIs de IA onde diferentes operações têm custos diferentes
 */
export function consumeTokens(
  identifier: string,
  configKey: keyof typeof TOKEN_BUCKET_CONFIGS,
  tokensToConsume: number
): { success: boolean; remainingTokens: number; resetAt: Date } {
  const config = TOKEN_BUCKET_CONFIGS[configKey];
  const now = Date.now();

  let bucket = tokenStore.get(identifier);

  if (!bucket || now > bucket.resetAt) {
    // Novo bucket ou reset
    bucket = {
      tokens: config.maxTokens,
      resetAt: now + 60 * 60 * 1000, // Reset em 1 hora
    };
  } else {
    // Refill baseado no tempo passado
    const timePassed = now - (bucket.resetAt - 60 * 60 * 1000);
    const tokensToAdd = Math.floor(timePassed / config.refillInterval) * config.refillRate;
    bucket.tokens = Math.min(config.maxTokens, bucket.tokens + tokensToAdd);
  }

  if (bucket.tokens < tokensToConsume) {
    tokenStore.set(identifier, bucket);
    return {
      success: false,
      remainingTokens: bucket.tokens,
      resetAt: new Date(bucket.resetAt),
    };
  }

  bucket.tokens -= tokensToConsume;
  tokenStore.set(identifier, bucket);

  return {
    success: true,
    remainingTokens: bucket.tokens,
    resetAt: new Date(bucket.resetAt),
  };
}

// ============ DETECÇÃO DE PADRÕES SUSPEITOS ============

export interface SuspiciousPatternResult {
  isSuspicious: boolean;
  reason?: string;
  score: number; // 0-100, quanto maior mais suspeito
  shouldBlock: boolean;
}

/**
 * Registra uma falha e verifica padrões suspeitos
 */
export function recordFailedAttempt(
  identifier: string,
  endpoint: string
): SuspiciousPatternResult {
  const now = Date.now();
  const key = createRateLimitKey(identifier, endpoint);

  let pattern = suspiciousPatternStore.get(key) || {
    failedAttempts: 0,
    lastFailedAttempt: 0,
  };

  // Incrementa tentativas falhadas
  pattern.failedAttempts++;
  pattern.lastFailedAttempt = now;

  // Calcula score de suspeição
  let score = 0;
  let reasons: string[] = [];

  // Muitas falhas em sequência
  if (pattern.failedAttempts > 10) {
    score += 30;
    reasons.push('Muitas tentativas falhadas');
  }

  // Falhas muito rápidas (possível automação)
  const timeSinceLastFail = now - (pattern.lastFailedAttempt || now);
  if (timeSinceLastFail < 1000 && pattern.failedAttempts > 3) {
    score += 40;
    reasons.push('Tentativas muito rápidas (possível bot)');
  }

  // Já foi flagado antes
  if (pattern.flaggedAt) {
    score += 20;
    reasons.push('Comportamento suspeito anterior');
  }

  const shouldBlock = score >= 50;

  if (shouldBlock && !pattern.flaggedAt) {
    pattern.flaggedAt = now;
    pattern.flagReason = reasons.join('; ');
  }

  suspiciousPatternStore.set(key, pattern);

  return {
    isSuspicious: score > 30,
    reason: reasons.join('; '),
    score,
    shouldBlock,
  };
}

/**
 * Limpa registro de padrão suspeito (após verificação bem-sucedida)
 */
export function clearSuspiciousPattern(identifier: string, endpoint: string): void {
  const key = createRateLimitKey(identifier, endpoint);
  suspiciousPatternStore.delete(key);
}

/**
 * Verifica se um identificador está marcado como suspeito
 */
export function isSuspicious(identifier: string, endpoint: string): SuspiciousPatternResult {
  const key = createRateLimitKey(identifier, endpoint);
  const pattern = suspiciousPatternStore.get(key);

  if (!pattern) {
    return { isSuspicious: false, score: 0, shouldBlock: false };
  }

  const score = pattern.flaggedAt ? 60 : (pattern.failedAttempts > 5 ? 40 : pattern.failedAttempts * 5);

  return {
    isSuspicious: score > 30,
    reason: pattern.flagReason,
    score,
    shouldBlock: score >= 50,
  };
}

// ============ RATE LIMIT COMBINADO (MÚLTIPLAS VERIFICAÇÕES) ============

export interface CombinedRateLimitOptions {
  ip?: string;
  userId?: string;
  email?: string;
  endpoint: string;
  configKey: keyof typeof RATE_LIMIT_CONFIGS;
  checkSuspicious?: boolean;
}

/**
 * Verifica rate limit combinando múltiplos identificadores
 * Bloqueia se QUALQUER um dos limites for excedido
 */
export function checkCombinedRateLimit(options: CombinedRateLimitOptions): RateLimitResult {
  const { ip, userId, email, endpoint, configKey, checkSuspicious = true } = options;
  const results: RateLimitResult[] = [];

  // Verifica por IP
  if (ip && ip !== 'unknown') {
    const key = createRateLimitKey(endpoint, 'ip', ip);
    results.push(checkRateLimit(key, configKey));
  }

  // Verifica por userId
  if (userId) {
    const key = createRateLimitKey(endpoint, 'user', userId);
    results.push(checkRateLimit(key, configKey));
  }

  // Verifica por email
  if (email) {
    const key = createRateLimitKey(endpoint, 'email', email);
    results.push(checkRateLimit(key, configKey));
  }

  // Verifica padrões suspeitos
  if (checkSuspicious && ip) {
    const suspicious = isSuspicious(ip, endpoint);
    if (suspicious.shouldBlock) {
      return {
        success: false,
        remaining: 0,
        resetAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
        retryAfter: 3600,
        blocked: true,
      };
    }
  }

  // Se qualquer verificação falhou, retorna a mais restritiva
  const failedResult = results.find(r => !r.success);
  if (failedResult) {
    return failedResult;
  }

  // Retorna o resultado com menor remaining
  const minRemaining = results.reduce(
    (min, r) => (r.remaining < min.remaining ? r : min),
    results[0] || { success: true, remaining: Infinity, resetAt: new Date() }
  );

  return minRemaining;
}

// ============ HELPERS PARA ROTAS DE API ============

/**
 * Middleware helper para aplicar rate limiting em rotas de API
 */
export function withRateLimit(
  request: Request,
  configKey: keyof typeof RATE_LIMIT_CONFIGS,
  options?: {
    identifier?: string;
    userId?: string;
  }
): { allowed: boolean; response?: Response; result: RateLimitResult } {
  const ip = getClientIP(request);
  const identifier = options?.identifier || ip;

  const result = checkCombinedRateLimit({
    ip,
    userId: options?.userId,
    endpoint: configKey,
    configKey,
  });

  if (!result.success) {
    return {
      allowed: false,
      response: rateLimitExceededResponse(result),
      result,
    };
  }

  return { allowed: true, result };
}

/**
 * Verifica rate limit para operações de IA (mais restritivo)
 */
export function checkAIRateLimit(
  request: Request,
  userId?: string,
  operationType: 'transcription' | 'analysis' = 'analysis'
): { allowed: boolean; response?: Response; result: RateLimitResult } {
  const ip = getClientIP(request);

  // Verifica burst limit (curto prazo)
  const burstKey = createRateLimitKey('ai-burst', userId || ip);
  const burstResult = checkRateLimit(burstKey, 'aiBurst');

  if (!burstResult.success) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: 'Muitas requisições de IA em pouco tempo. Aguarde um momento.',
          retryAfter: burstResult.retryAfter,
        }),
        { status: 429, headers: getRateLimitHeaders(burstResult) }
      ),
      result: burstResult,
    };
  }

  // Verifica limite diário
  if (userId) {
    const dailyKey = createRateLimitKey('ai-daily', userId);
    const dailyResult = checkRateLimit(dailyKey, 'aiDaily');

    if (!dailyResult.success) {
      return {
        allowed: false,
        response: new Response(
          JSON.stringify({
            error: 'Limite diário de operações de IA excedido.',
            retryAfter: dailyResult.retryAfter,
          }),
          { status: 429, headers: getRateLimitHeaders(dailyResult) }
        ),
        result: dailyResult,
      };
    }
  }

  // Verifica limite específico da operação
  const configKey = operationType === 'transcription'
    ? (userId ? 'transcription' : 'transcriptionPublic')
    : 'analysis';

  const opKey = createRateLimitKey(operationType, userId || ip);
  const opResult = checkRateLimit(opKey, configKey);

  if (!opResult.success) {
    return {
      allowed: false,
      response: rateLimitExceededResponse(opResult),
      result: opResult,
    };
  }

  return { allowed: true, result: opResult };
}

// ============ ESTATÍSTICAS (para debugging e monitoramento) ============

export function getRateLimitStats(): {
  totalEntries: number;
  blockedEntries: number;
  suspiciousPatterns: number;
  tokenBuckets: number;
} {
  const now = Date.now();
  let blockedCount = 0;

  for (const entry of rateLimitStore.values()) {
    if (entry.blockedUntil && entry.blockedUntil > now) {
      blockedCount++;
    }
  }

  return {
    totalEntries: rateLimitStore.size,
    blockedEntries: blockedCount,
    suspiciousPatterns: suspiciousPatternStore.size,
    tokenBuckets: tokenStore.size,
  };
}
