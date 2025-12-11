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
  resetBlockCount,
  getClientIP,
  createRateLimitKey,
  getRateLimitHeaders,
  rateLimitExceededResponse,
  withRateLimit,
  checkAIRateLimit,
  checkCombinedRateLimit,
  consumeTokens,
  recordFailedAttempt,
  clearSuspiciousPattern,
  isSuspicious,
  getRateLimitStats,
  RATE_LIMIT_CONFIGS,
  TOKEN_BUCKET_CONFIGS,
  type RateLimitResult,
  type TokenBucketConfig,
  type SuspiciousPatternResult,
  type CombinedRateLimitOptions,
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

// Bot Detection
export {
  detectBot,
  shouldBlockRequest,
  withBotProtection,
  analyzeUserAgent,
  analyzeHeaders,
  analyzeBehavior,
  extractFingerprint,
  clearBehaviorData,
  getBotDetectionStats,
  checkAIEndpointProtection,
  type BotSignature,
  type RequestFingerprint,
} from './bot-detection';

// API Protection (Centralized)
export {
  applyProtection,
  applyAIProtection,
  securityErrorResponse,
  recordSuccess,
  createProtectedHandler,
  validateContentType,
  validatePayloadSize,
  SecurityResponses,
  extractSecurityContext,
  type ProtectionLevel,
  type ProtectionConfig,
  type ProtectionResult,
} from './api-protection';
