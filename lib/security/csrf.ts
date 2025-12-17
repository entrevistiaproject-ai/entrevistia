/**
 * Proteção CSRF (Cross-Site Request Forgery)
 *
 * Implementa múltiplas camadas de proteção:
 * - Token CSRF com validação de origem
 * - Double Submit Cookie pattern
 * - Validação de headers Origin/Referer
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const CSRF_COOKIE_NAME = '__csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Gera um token CSRF criptograficamente seguro
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Define o cookie CSRF
 */
export async function setCSRFCookie(token?: string): Promise<string> {
  const cookieStore = await cookies();
  const csrfToken = token || generateCSRFToken();

  cookieStore.set(CSRF_COOKIE_NAME, csrfToken, {
    httpOnly: false, // Precisa ser acessível pelo JS para enviar no header
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60, // 1 hora
  });

  return csrfToken;
}

/**
 * Obtém o token CSRF do cookie
 */
export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value || null;
}

/**
 * Valida o token CSRF
 * Compara o token do cookie com o token enviado no header
 */
export function validateCSRFToken(request: NextRequest): boolean {
  // Obter token do cookie
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;

  // Obter token do header
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  // Ambos devem existir e ser iguais
  if (!cookieToken || !headerToken) {
    return false;
  }

  // Comparação segura contra timing attacks
  return timingSafeEqual(cookieToken, headerToken);
}

/**
 * Valida a origem da requisição
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // Lista de hosts permitidos
  const allowedHosts = [
    process.env.NEXTAUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    'https://entrevistia.com.br',
    'https://www.entrevistia.com.br',
  ].filter(Boolean);

  // Em desenvolvimento, permite localhost
  if (process.env.NODE_ENV === 'development') {
    allowedHosts.push('http://localhost:3000', 'http://127.0.0.1:3000');
  }

  // Verifica origin
  if (origin) {
    return allowedHosts.some(host => origin.startsWith(host!));
  }

  // Se não tem origin, verifica referer
  if (referer) {
    return allowedHosts.some(host => referer.startsWith(host!));
  }

  // Se não tem nem origin nem referer, pode ser requisição same-origin
  // Mas em POST/PUT/DELETE, isso é suspeito
  return false;
}

/**
 * Verifica se a requisição precisa de proteção CSRF
 * GET, HEAD e OPTIONS são considerados seguros (idempotentes)
 */
export function needsCSRFProtection(method: string): boolean {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  return !safeMethods.includes(method.toUpperCase());
}

/**
 * Comparação de strings segura contra timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Middleware helper para validação CSRF
 * Retorna null se válido, ou objeto de erro se inválido
 */
export function validateCSRFRequest(request: NextRequest): { error: string } | null {
  // Não valida métodos seguros
  if (!needsCSRFProtection(request.method)) {
    return null;
  }

  // Primeiro valida a origem
  if (!validateOrigin(request)) {
    return { error: 'Origem da requisição não permitida' };
  }

  // Para rotas que requerem CSRF token explícito
  // Descomente se quiser validação de token além da origem
  // if (!validateCSRFToken(request)) {
  //   return { error: 'Token CSRF inválido ou ausente' };
  // }

  return null;
}

/**
 * Headers para habilitar proteção CSRF em formulários
 */
export function getCSRFHeaders(token: string): Record<string, string> {
  return {
    [CSRF_HEADER_NAME]: token,
  };
}
