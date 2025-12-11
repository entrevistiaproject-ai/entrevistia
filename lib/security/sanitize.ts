/**
 * Sanitização de inputs para prevenir XSS e injeção de dados
 *
 * Implementa sanitização segura de dados de entrada sem depender de bibliotecas externas
 */

/**
 * Remove tags HTML e scripts maliciosos de uma string
 * Converte caracteres especiais para entidades HTML
 */
export function sanitizeHTML(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    // Remove tags script e seu conteúdo
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers inline
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s*on\w+\s*=\s*[^\s>]+/gi, '')
    // Escapa caracteres especiais HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitiza string removendo apenas caracteres potencialmente perigosos
 * Mantém acentos e caracteres UTF-8 válidos
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    // Remove caracteres de controle (exceto newlines e tabs)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Remove caracteres NULL
    .replace(/\0/g, '')
    // Normaliza espaços múltiplos
    .replace(/\s+/g, ' ')
    // Remove espaços no início e fim
    .trim();
}

/**
 * Sanitiza email - remove caracteres inválidos
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';

  return email
    .toLowerCase()
    .trim()
    // Remove caracteres não permitidos em emails
    .replace(/[^a-z0-9._%+\-@]/gi, '')
    // Remove múltiplos @ ou pontos consecutivos
    .replace(/@+/g, '@')
    .replace(/\.{2,}/g, '.');
}

/**
 * Sanitiza telefone - mantém apenas números e alguns caracteres
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return '';

  return phone
    .trim()
    // Mantém apenas números, espaços, parênteses e hífens
    .replace(/[^\d\s()\-+]/g, '')
    // Limita tamanho
    .slice(0, 20);
}

/**
 * Sanitiza nome - permite letras, espaços e alguns caracteres especiais
 */
export function sanitizeName(name: string): string {
  if (typeof name !== 'string') return '';

  return name
    .trim()
    // Permite letras (incluindo acentos), espaços, hífens e apóstrofos
    .replace(/[^\p{L}\s\-']/gu, '')
    // Remove múltiplos espaços
    .replace(/\s+/g, ' ')
    // Limita tamanho
    .slice(0, 100);
}

/**
 * Sanitiza CPF - mantém apenas números
 */
export function sanitizeCPF(cpf: string): string {
  if (typeof cpf !== 'string') return '';

  return cpf.replace(/\D/g, '').slice(0, 11);
}

/**
 * Sanitiza slug - permite apenas caracteres válidos para URL
 */
export function sanitizeSlug(slug: string): string {
  if (typeof slug !== 'string') return '';

  return slug
    .toLowerCase()
    .trim()
    // Substitui espaços por hífens
    .replace(/\s+/g, '-')
    // Remove caracteres não permitidos em URLs
    .replace(/[^a-z0-9\-_]/g, '')
    // Remove hífens múltiplos
    .replace(/-+/g, '-')
    // Remove hífens do início e fim
    .replace(/^-+|-+$/g, '');
}

/**
 * Sanitiza UUID - valida formato
 */
export function sanitizeUUID(uuid: string): string | null {
  if (typeof uuid !== 'string') return null;

  const cleaned = uuid.trim().toLowerCase();
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  return uuidRegex.test(cleaned) ? cleaned : null;
}

/**
 * Sanitiza objeto recursivamente
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) return obj;

  const result = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      (result as Record<string, unknown>)[key] = value.map(item =>
        typeof item === 'string' ? sanitizeString(item) : sanitizeObject(item as Record<string, unknown>)
      );
    } else if (typeof value === 'object' && value !== null) {
      (result as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      (result as Record<string, unknown>)[key] = value;
    }
  }

  return result;
}

/**
 * Valida e sanitiza URL
 */
export function sanitizeURL(url: string): string | null {
  if (typeof url !== 'string') return null;

  try {
    const parsed = new URL(url.trim());

    // Apenas permite HTTP(S)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }

    // Remove javascript: e data: URLs
    if (parsed.href.toLowerCase().includes('javascript:') ||
        parsed.href.toLowerCase().includes('data:')) {
      return null;
    }

    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * Remove dados sensíveis de objetos para logging
 */
export function redactSensitiveData<T extends Record<string, unknown>>(obj: T): T {
  const sensitiveKeys = [
    'password', 'senha', 'passwordHash', 'secret', 'token', 'apiKey',
    'api_key', 'authorization', 'auth', 'credential', 'cpf', 'documento',
    'creditCard', 'cartao', 'cvv', 'ssn',
  ];

  const result = { ...obj };

  for (const key of Object.keys(result)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
      (result as Record<string, unknown>)[key] = '[REDACTED]';
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      (result as Record<string, unknown>)[key] = redactSensitiveData(result[key] as Record<string, unknown>);
    }
  }

  return result;
}

/**
 * Escapa string para uso em JSON
 */
export function escapeJSON(str: string): string {
  if (typeof str !== 'string') return '';

  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Trunca string de forma segura (não corta no meio de caracteres UTF-8)
 */
export function truncateSafe(str: string, maxLength: number): string {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;

  // Usa o spread para não cortar no meio de caracteres UTF-8
  return [...str].slice(0, maxLength).join('');
}
