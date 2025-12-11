/**
 * Utilitário para códigos de verificação seguros
 *
 * - Gera códigos criptograficamente seguros
 * - Armazena códigos como hash (não em texto plano)
 * - Implementa comparação segura contra timing attacks
 */

import { createHash } from 'crypto';

const VERIFICATION_CODE_LENGTH = 6;

/**
 * Gera um código de verificação de 6 dígitos criptograficamente seguro
 */
export function generateVerificationCode(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  // Garante 6 dígitos
  const code = (array[0] % 1000000).toString().padStart(VERIFICATION_CODE_LENGTH, '0');
  return code;
}

/**
 * Cria um hash do código de verificação
 * Usa SHA-256 para criar um hash não reversível
 *
 * Nota: Para códigos de 6 dígitos, SHA-256 é suficiente pois:
 * - O número de tentativas é limitado (rate limiting + max attempts)
 * - Códigos expiram em 15 minutos
 * - Não precisamos de bcrypt pois não é uma senha reutilizável
 */
export function hashVerificationCode(code: string, salt?: string): string {
  const data = salt ? `${code}:${salt}` : code;
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Verifica se um código corresponde ao hash armazenado
 * Usa comparação em tempo constante para prevenir timing attacks
 */
export function verifyCodeHash(
  inputCode: string,
  storedHash: string,
  salt?: string
): boolean {
  const inputHash = hashVerificationCode(inputCode, salt);
  return timingSafeCompare(inputHash, storedHash);
}

/**
 * Comparação de strings em tempo constante
 * Previne timing attacks comparando todos os caracteres
 */
function timingSafeCompare(a: string, b: string): boolean {
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
 * Valida formato do código (apenas dígitos, tamanho correto)
 */
export function isValidCodeFormat(code: string): boolean {
  if (typeof code !== 'string') return false;
  if (code.length !== VERIFICATION_CODE_LENGTH) return false;
  return /^\d+$/.test(code);
}

/**
 * Gera um salt único para o código
 * Pode ser baseado no userId ou email para adicionar entropia
 */
export function generateCodeSalt(userId: string, timestamp: Date): string {
  return createHash('sha256')
    .update(`${userId}:${timestamp.getTime()}`)
    .digest('hex')
    .slice(0, 16);
}
