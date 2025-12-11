/**
 * Módulo de Segurança - EntrevistIA
 *
 * Este módulo centraliza todas as funcionalidades de segurança:
 * - Rate Limiting
 * - Security Headers
 * - CSRF Protection
 * - Input Sanitization
 */

// Rate Limiting
export {
  checkRateLimit,
  checkRateLimitCustom,
  clearRateLimit,
  getClientIP,
  createRateLimitKey,
  getRateLimitHeaders,
  rateLimitExceededResponse,
  RATE_LIMIT_CONFIGS,
  type RateLimitResult,
} from './rate-limit';

// Security Headers
export {
  getSecurityHeaders,
  applySecurityHeaders,
  getAPISecurityHeaders,
  getNoCacheHeaders,
  type SecurityHeadersConfig,
} from './headers';

// CSRF Protection
export {
  generateCSRFToken,
  setCSRFCookie,
  getCSRFToken,
  validateCSRFToken,
  validateOrigin,
  validateCSRFRequest,
  needsCSRFProtection,
  getCSRFHeaders,
} from './csrf';

// Input Sanitization
export {
  sanitizeHTML,
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  sanitizeName,
  sanitizeCPF,
  sanitizeSlug,
  sanitizeUUID,
  sanitizeURL,
  sanitizeObject,
  redactSensitiveData,
  escapeJSON,
  truncateSafe,
} from './sanitize';

// Secure Logger
export { logger, devLog, perfLog } from './logger';

// Verification Codes
export {
  generateVerificationCode,
  hashVerificationCode,
  verifyCodeHash,
  isValidCodeFormat,
  generateCodeSalt,
} from './verification-code';
