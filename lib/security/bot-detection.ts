/**
 * Sistema de Detecção de Bots e API Abuse
 *
 * Implementa múltiplas técnicas para identificar:
 * - Bots automatizados
 * - Scripts de scraping
 * - Tentativas de brute force
 * - Abuso de API
 */

export interface BotSignature {
  score: number;
  reasons: string[];
  isBot: boolean;
  confidence: 'low' | 'medium' | 'high';
}

export interface RequestFingerprint {
  ip: string;
  userAgent: string;
  acceptLanguage: string;
  acceptEncoding: string;
  connection: string;
  secFetchMode?: string;
  secFetchSite?: string;
  secFetchDest?: string;
  secChUa?: string;
  origin?: string;
  referer?: string;
}

// Lista de User-Agents conhecidos de bots maliciosos
const KNOWN_BOT_USER_AGENTS = [
  'python-requests',
  'python-urllib',
  'python-httplib',
  'curl/',
  'wget/',
  'httpie/',
  'java/',
  'node-fetch',
  'axios/',
  'go-http-client',
  'okhttp/',
  'scrapy',
  'phantomjs',
  'headlesschrome',
  'selenium',
  'puppeteer',
  'playwright',
  'mechanize',
  'libwww-perl',
  'httpclient',
  'apache-httpclient',
  'rest-client',
  'postman',
  'insomnia',
  'httpunit',
  'htmlunit',
  'apachebench',
  'wrk',
  'siege',
  'hey/',
  'ab/',
  'loadrunner',
  'jmeter',
  'gatling',
  'locust',
  'k6/',
  'artillery',
  'vegeta',
  'gobuster',
  'dirbuster',
  'nikto',
  'sqlmap',
  'burp',
  'zap',
  'acunetix',
  'nessus',
  'openvas',
  'masscan',
  'nmap',
];

// Lista de User-Agents legítimos de bots (crawlers de busca)
const LEGITIMATE_BOTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'slurp', // Yahoo
  'ia_archiver', // Internet Archive
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
  'slackbot',
];

// Headers que navegadores reais sempre enviam
const EXPECTED_BROWSER_HEADERS = [
  'accept',
  'accept-language',
  'accept-encoding',
];

// Store para análise comportamental
const behaviorStore = new Map<string, {
  requestTimes: number[];
  endpoints: string[];
  userAgents: Set<string>;
  statusCodes: number[];
  firstSeen: number;
  lastSeen: number;
}>();

// Limpeza periódica
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutos
let cleanupTimer: NodeJS.Timeout | null = null;

function startBehaviorCleanup() {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hora

    for (const [key, data] of behaviorStore.entries()) {
      if (now - data.lastSeen > maxAge) {
        behaviorStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);

  cleanupTimer.unref();
}

startBehaviorCleanup();

/**
 * Extrai fingerprint de uma requisição
 */
export function extractFingerprint(request: Request): RequestFingerprint {
  const headers = request.headers;

  return {
    ip: getClientIPForBot(request),
    userAgent: headers.get('user-agent') || '',
    acceptLanguage: headers.get('accept-language') || '',
    acceptEncoding: headers.get('accept-encoding') || '',
    connection: headers.get('connection') || '',
    secFetchMode: headers.get('sec-fetch-mode') || undefined,
    secFetchSite: headers.get('sec-fetch-site') || undefined,
    secFetchDest: headers.get('sec-fetch-dest') || undefined,
    secChUa: headers.get('sec-ch-ua') || undefined,
    origin: headers.get('origin') || undefined,
    referer: headers.get('referer') || undefined,
  };
}

/**
 * Obtém IP do cliente para detecção de bots
 */
function getClientIPForBot(request: Request): string {
  const headers = request.headers;

  const cfIP = headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) return realIP;

  return 'unknown';
}

/**
 * Analisa User-Agent para detectar bots
 */
export function analyzeUserAgent(userAgent: string): {
  isBot: boolean;
  isLegitimateBot: boolean;
  isSuspicious: boolean;
  reason?: string;
} {
  const ua = userAgent.toLowerCase();

  // Verifica se é um bot legítimo (crawler de busca)
  for (const bot of LEGITIMATE_BOTS) {
    if (ua.includes(bot)) {
      return {
        isBot: true,
        isLegitimateBot: true,
        isSuspicious: false,
        reason: `Bot legítimo: ${bot}`,
      };
    }
  }

  // Verifica se é um bot conhecido malicioso
  for (const botPattern of KNOWN_BOT_USER_AGENTS) {
    if (ua.includes(botPattern.toLowerCase())) {
      return {
        isBot: true,
        isLegitimateBot: false,
        isSuspicious: true,
        reason: `User-Agent de bot/ferramenta: ${botPattern}`,
      };
    }
  }

  // User-Agent vazio ou muito curto
  if (!userAgent || userAgent.length < 10) {
    return {
      isBot: false,
      isLegitimateBot: false,
      isSuspicious: true,
      reason: 'User-Agent ausente ou muito curto',
    };
  }

  // User-Agent muito genérico
  if (ua === 'mozilla/5.0' || ua === 'mozilla/4.0') {
    return {
      isBot: false,
      isLegitimateBot: false,
      isSuspicious: true,
      reason: 'User-Agent genérico demais',
    };
  }

  // Navegador comum
  const commonBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'opera'];
  const hasCommonBrowser = commonBrowsers.some(browser => ua.includes(browser));

  if (!hasCommonBrowser && !ua.includes('mobile')) {
    return {
      isBot: false,
      isLegitimateBot: false,
      isSuspicious: true,
      reason: 'User-Agent não parece ser um navegador comum',
    };
  }

  return {
    isBot: false,
    isLegitimateBot: false,
    isSuspicious: false,
  };
}

/**
 * Analisa headers para detectar bots
 */
export function analyzeHeaders(fingerprint: RequestFingerprint): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  // Verifica headers esperados de navegadores
  if (!fingerprint.acceptLanguage) {
    score += 15;
    reasons.push('Accept-Language ausente');
  }

  if (!fingerprint.acceptEncoding) {
    score += 10;
    reasons.push('Accept-Encoding ausente');
  }

  // Navegadores modernos enviam Sec-Fetch-* headers
  if (!fingerprint.secFetchMode && fingerprint.userAgent.toLowerCase().includes('chrome')) {
    score += 20;
    reasons.push('Headers Sec-Fetch-* ausentes em navegador Chrome');
  }

  // Verifica Client Hints (navegadores modernos)
  if (!fingerprint.secChUa && fingerprint.userAgent.toLowerCase().includes('chrome/')) {
    score += 15;
    reasons.push('Client Hints ausentes em Chrome moderno');
  }

  // Requisições de API sem Origin/Referer podem ser suspeitas
  if (!fingerprint.origin && !fingerprint.referer) {
    score += 10;
    reasons.push('Origin e Referer ausentes');
  }

  // Connection header suspeito
  if (fingerprint.connection && !['keep-alive', 'close', ''].includes(fingerprint.connection.toLowerCase())) {
    score += 5;
    reasons.push('Connection header incomum');
  }

  return { score, reasons };
}

/**
 * Analisa comportamento ao longo do tempo
 */
export function analyzeBehavior(
  ip: string,
  endpoint: string,
  statusCode: number,
  userAgent: string
): {
  score: number;
  reasons: string[];
} {
  const now = Date.now();
  let score = 0;
  const reasons: string[] = [];

  // Obtém ou cria registro de comportamento
  let behavior = behaviorStore.get(ip);
  if (!behavior) {
    behavior = {
      requestTimes: [],
      endpoints: [],
      userAgents: new Set(),
      statusCodes: [],
      firstSeen: now,
      lastSeen: now,
    };
    behaviorStore.set(ip, behavior);
  }

  // Atualiza dados
  behavior.lastSeen = now;
  behavior.requestTimes.push(now);
  behavior.endpoints.push(endpoint);
  behavior.userAgents.add(userAgent);
  behavior.statusCodes.push(statusCode);

  // Mantém apenas os últimos 100 registros
  if (behavior.requestTimes.length > 100) {
    behavior.requestTimes = behavior.requestTimes.slice(-100);
    behavior.endpoints = behavior.endpoints.slice(-100);
    behavior.statusCodes = behavior.statusCodes.slice(-100);
  }

  // Análise de frequência (muitas requisições em pouco tempo)
  const recentRequests = behavior.requestTimes.filter(t => now - t < 60000); // Último minuto
  if (recentRequests.length > 60) {
    score += 30;
    reasons.push(`Alta frequência: ${recentRequests.length} req/min`);
  } else if (recentRequests.length > 30) {
    score += 15;
    reasons.push(`Frequência elevada: ${recentRequests.length} req/min`);
  }

  // Análise de intervalo entre requisições (muito regular = bot)
  if (recentRequests.length >= 5) {
    const intervals: number[] = [];
    for (let i = 1; i < recentRequests.length; i++) {
      intervals.push(recentRequests[i] - recentRequests[i - 1]);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) =>
      sum + Math.pow(interval - avgInterval, 2), 0
    ) / intervals.length;
    const stdDev = Math.sqrt(variance);

    // Intervalo muito regular (desvio padrão muito baixo) indica automação
    if (avgInterval < 1000 && stdDev < 100) {
      score += 25;
      reasons.push('Padrão de requisições muito regular (possível bot)');
    }
  }

  // Múltiplos User-Agents do mesmo IP
  if (behavior.userAgents.size > 3) {
    score += 20;
    reasons.push(`Múltiplos User-Agents: ${behavior.userAgents.size}`);
  }

  // Alta taxa de erros
  const recentErrors = behavior.statusCodes.slice(-20).filter(code => code >= 400);
  if (recentErrors.length > 10) {
    score += 20;
    reasons.push(`Alta taxa de erros: ${recentErrors.length}/20`);
  }

  // Acesso a muitos endpoints diferentes em pouco tempo
  const uniqueEndpoints = new Set(behavior.endpoints.slice(-20)).size;
  if (uniqueEndpoints > 15) {
    score += 15;
    reasons.push(`Scanning de endpoints: ${uniqueEndpoints} diferentes`);
  }

  return { score, reasons };
}

/**
 * Detecta bot combinando múltiplas análises
 */
export function detectBot(request: Request, endpoint: string, statusCode: number = 200): BotSignature {
  const fingerprint = extractFingerprint(request);
  let totalScore = 0;
  const allReasons: string[] = [];

  // Análise de User-Agent
  const uaAnalysis = analyzeUserAgent(fingerprint.userAgent);
  if (uaAnalysis.isBot && !uaAnalysis.isLegitimateBot) {
    totalScore += 50;
    if (uaAnalysis.reason) allReasons.push(uaAnalysis.reason);
  } else if (uaAnalysis.isSuspicious) {
    totalScore += 25;
    if (uaAnalysis.reason) allReasons.push(uaAnalysis.reason);
  }

  // Análise de Headers
  const headerAnalysis = analyzeHeaders(fingerprint);
  totalScore += headerAnalysis.score;
  allReasons.push(...headerAnalysis.reasons);

  // Análise Comportamental
  const behaviorAnalysis = analyzeBehavior(
    fingerprint.ip,
    endpoint,
    statusCode,
    fingerprint.userAgent
  );
  totalScore += behaviorAnalysis.score;
  allReasons.push(...behaviorAnalysis.reasons);

  // Determina nível de confiança
  let confidence: 'low' | 'medium' | 'high';
  if (totalScore >= 70) {
    confidence = 'high';
  } else if (totalScore >= 40) {
    confidence = 'medium';
  } else {
    confidence = 'low';
  }

  return {
    score: Math.min(100, totalScore),
    reasons: allReasons,
    isBot: totalScore >= 50,
    confidence,
  };
}

/**
 * Verifica se a requisição deve ser bloqueada
 */
export function shouldBlockRequest(request: Request, endpoint: string): {
  block: boolean;
  reason?: string;
  score: number;
} {
  const detection = detectBot(request, endpoint);

  // Bloqueia se score >= 70 (alta confiança de bot)
  if (detection.score >= 70) {
    return {
      block: true,
      reason: detection.reasons.join('; '),
      score: detection.score,
    };
  }

  // Não bloqueia mas retorna score para logging
  return {
    block: false,
    score: detection.score,
  };
}

/**
 * Middleware helper para proteção contra bots
 */
export function withBotProtection(
  request: Request,
  endpoint: string,
  options?: {
    allowLegitBots?: boolean;
    blockThreshold?: number;
  }
): { allowed: boolean; response?: Response; detection: BotSignature } {
  const { allowLegitBots = true, blockThreshold = 70 } = options || {};

  // Verifica se é bot legítimo (crawlers de busca)
  if (allowLegitBots) {
    const fingerprint = extractFingerprint(request);
    const uaAnalysis = analyzeUserAgent(fingerprint.userAgent);
    if (uaAnalysis.isLegitimateBot) {
      return {
        allowed: true,
        detection: {
          score: 0,
          reasons: ['Bot legítimo permitido'],
          isBot: true,
          confidence: 'high',
        },
      };
    }
  }

  const detection = detectBot(request, endpoint);

  if (detection.score >= blockThreshold) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: 'Requisição bloqueada por comportamento suspeito',
          code: 'BOT_DETECTED',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'X-Bot-Score': String(detection.score),
          },
        }
      ),
      detection,
    };
  }

  return { allowed: true, detection };
}

/**
 * Limpa dados de comportamento para um IP
 */
export function clearBehaviorData(ip: string): void {
  behaviorStore.delete(ip);
}

/**
 * Obtém estatísticas do sistema de detecção
 */
export function getBotDetectionStats(): {
  trackedIPs: number;
  suspiciousIPs: number;
} {
  let suspiciousCount = 0;

  for (const [, data] of behaviorStore.entries()) {
    // Considera suspeito se tem mais de 3 User-Agents ou alta frequência
    if (data.userAgents.size > 3 ||
        data.requestTimes.filter(t => Date.now() - t < 60000).length > 30) {
      suspiciousCount++;
    }
  }

  return {
    trackedIPs: behaviorStore.size,
    suspiciousIPs: suspiciousCount,
  };
}

/**
 * Verifica requisição para APIs de IA (proteção mais estrita)
 */
export function checkAIEndpointProtection(
  request: Request,
  endpoint: string
): { allowed: boolean; response?: Response; reason?: string } {
  const fingerprint = extractFingerprint(request);
  const uaAnalysis = analyzeUserAgent(fingerprint.userAgent);

  // Bloqueia bots conhecidos (exceto legítimos) em endpoints de IA
  if (uaAnalysis.isBot && !uaAnalysis.isLegitimateBot) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: 'Acesso automatizado não permitido para este recurso',
          code: 'BOT_NOT_ALLOWED',
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      ),
      reason: uaAnalysis.reason,
    };
  }

  // Verifica comportamento mais rigorosamente para IA
  const behavior = behaviorStore.get(fingerprint.ip);
  if (behavior) {
    const recentRequests = behavior.requestTimes.filter(t => Date.now() - t < 60000);

    // Limite mais baixo para endpoints de IA
    if (recentRequests.length > 10) {
      return {
        allowed: false,
        response: new Response(
          JSON.stringify({
            error: 'Muitas requisições em pouco tempo',
            code: 'TOO_MANY_REQUESTS',
          }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        ),
        reason: 'Alta frequência de requisições para endpoint de IA',
      };
    }
  }

  return { allowed: true };
}
