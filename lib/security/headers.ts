/**
 * Security Headers para proteção contra ataques comuns
 *
 * Implementa os headers de segurança recomendados pelo OWASP:
 * - Content-Security-Policy (CSP)
 * - X-Frame-Options
 * - X-Content-Type-Options
 * - Referrer-Policy
 * - Permissions-Policy
 * - Strict-Transport-Security (HSTS)
 */

import { NextResponse } from 'next/server';

export interface SecurityHeadersConfig {
  isDevelopment?: boolean;
  allowedFrameAncestors?: string[];
  allowedConnectSources?: string[];
  allowedScriptSources?: string[];
  allowedImageSources?: string[];
  reportUri?: string;
}

/**
 * Gera headers de Content-Security-Policy
 */
function generateCSP(config: SecurityHeadersConfig): string {
  const isDev = config.isDevelopment ?? process.env.NODE_ENV === 'development';

  // Fontes permitidas
  const defaultSrc = ["'self'"];

  // Scripts - em dev permite unsafe-eval para hot reload
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'", // Necessário para Next.js inline scripts
    ...(isDev ? ["'unsafe-eval'"] : []),
    ...(config.allowedScriptSources || []),
  ];

  // Estilos - unsafe-inline necessário para styled-components/emotion/tailwind
  const styleSrc = ["'self'", "'unsafe-inline'"];

  // Imagens
  const imgSrc = [
    "'self'",
    'data:',
    'blob:',
    'https://*.vercel.app',
    ...(config.allowedImageSources || []),
  ];

  // Conexões (API, WebSockets, etc)
  const connectSrc = [
    "'self'",
    ...(isDev ? ['ws://localhost:*', 'http://localhost:*'] : []),
    'https://*.vercel.app',
    'https://api.anthropic.com',
    'https://api.openai.com',
    'https://api.resend.com',
    ...(config.allowedConnectSources || []),
  ];

  // Fontes
  const fontSrc = ["'self'", 'data:'];

  // Frames (para embeds se necessário)
  const frameSrc = ["'self'"];

  // Frame ancestors (quem pode embedar o site)
  const frameAncestors = config.allowedFrameAncestors || ["'none'"];

  // Base URI
  const baseUri = ["'self'"];

  // Form action
  const formAction = ["'self'"];

  // Upgrade insecure requests em produção
  const upgradeInsecure = isDev ? '' : 'upgrade-insecure-requests;';

  const directives = [
    `default-src ${defaultSrc.join(' ')}`,
    `script-src ${scriptSrc.join(' ')}`,
    `style-src ${styleSrc.join(' ')}`,
    `img-src ${imgSrc.join(' ')}`,
    `connect-src ${connectSrc.join(' ')}`,
    `font-src ${fontSrc.join(' ')}`,
    `frame-src ${frameSrc.join(' ')}`,
    `frame-ancestors ${frameAncestors.join(' ')}`,
    `base-uri ${baseUri.join(' ')}`,
    `form-action ${formAction.join(' ')}`,
    upgradeInsecure,
  ].filter(Boolean);

  // Adiciona report-uri se configurado
  if (config.reportUri) {
    directives.push(`report-uri ${config.reportUri}`);
  }

  return directives.join('; ');
}

/**
 * Headers de segurança completos
 */
export function getSecurityHeaders(config: SecurityHeadersConfig = {}): Record<string, string> {
  const isDev = config.isDevelopment ?? process.env.NODE_ENV === 'development';

  return {
    // Content Security Policy
    'Content-Security-Policy': generateCSP(config),

    // Previne clickjacking
    'X-Frame-Options': 'DENY',

    // Previne MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Controla informações do Referrer
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // HSTS - apenas em produção
    ...(isDev ? {} : {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    }),

    // Permissions Policy (antigo Feature-Policy)
    'Permissions-Policy': [
      'accelerometer=()',
      'camera=(self)',       // Permite câmera para gravação de entrevistas
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=(self)',   // Permite microfone para gravação de entrevistas
      'payment=()',
      'usb=()',
    ].join(', '),

    // Previne XSS em navegadores antigos
    'X-XSS-Protection': '1; mode=block',

    // Previne DNS prefetch abuse
    'X-DNS-Prefetch-Control': 'off',

    // Download options para IE
    'X-Download-Options': 'noopen',

    // Permitted cross-domain policies
    'X-Permitted-Cross-Domain-Policies': 'none',
  };
}

/**
 * Aplica headers de segurança a uma resposta Next.js
 */
export function applySecurityHeaders(
  response: NextResponse,
  config: SecurityHeadersConfig = {}
): NextResponse {
  const headers = getSecurityHeaders(config);

  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }

  return response;
}

/**
 * Headers específicos para APIs (mais permissivos para CORS se necessário)
 */
export function getAPISecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
}

/**
 * Headers para prevenir caching de dados sensíveis
 */
export function getNoCacheHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
  };
}
