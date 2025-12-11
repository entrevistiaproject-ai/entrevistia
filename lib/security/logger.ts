/**
 * Logger seguro para produção
 *
 * - Remove dados sensíveis automaticamente
 * - Só loga em ambiente de desenvolvimento ou quando explicitamente habilitado
 * - Integração preparada para serviços externos (Sentry, LogDNA, etc.)
 */

import { redactSensitiveData } from './sanitize';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabledInProduction: boolean;
  logLevel: LogLevel;
  redactSensitiveData: boolean;
}

const config: LoggerConfig = {
  enabledInProduction: false,
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
  redactSensitiveData: true,
};

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function shouldLog(level: LogLevel): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  if (!config.enabledInProduction) {
    return level === 'error'; // Em produção, só loga erros
  }

  return LOG_LEVELS[level] >= LOG_LEVELS[config.logLevel];
}

function formatMessage(level: LogLevel, message: string, data?: unknown): string {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (data === undefined) {
    return `${prefix} ${message}`;
  }

  let safeData = data;
  if (config.redactSensitiveData && typeof data === 'object' && data !== null) {
    safeData = redactSensitiveData(data as Record<string, unknown>);
  }

  return `${prefix} ${message} ${JSON.stringify(safeData)}`;
}

/**
 * Logger seguro com redação automática de dados sensíveis
 */
export const logger = {
  debug: (message: string, data?: unknown) => {
    if (shouldLog('debug')) {
      console.debug(formatMessage('debug', message, data));
    }
  },

  info: (message: string, data?: unknown) => {
    if (shouldLog('info')) {
      console.info(formatMessage('info', message, data));
    }
  },

  warn: (message: string, data?: unknown) => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message, data));
    }
  },

  error: (message: string, error?: unknown) => {
    if (shouldLog('error')) {
      // Erros sempre são logados, mas sem stack traces em produção
      const errorInfo = error instanceof Error
        ? {
            message: error.message,
            ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
          }
        : error;

      console.error(formatMessage('error', message, errorInfo));

      // TODO: Integrar com serviço de monitoramento (Sentry, etc.)
      // if (process.env.NODE_ENV === 'production') {
      //   Sentry.captureException(error);
      // }
    }
  },

  /**
   * Log de auditoria para ações importantes
   * Sempre loga em produção, mas com dados redatados
   */
  audit: (action: string, data?: Record<string, unknown>) => {
    const safeData = data ? redactSensitiveData(data) : undefined;
    console.info(formatMessage('info', `[AUDIT] ${action}`, safeData));
  },
};

/**
 * Função utilitária para logging condicional
 * Só executa em desenvolvimento
 */
export function devLog(message: string, ...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] ${message}`, ...args);
  }
}

/**
 * Função para logging de performance
 */
export function perfLog(label: string) {
  if (process.env.NODE_ENV !== 'development') {
    return {
      end: () => {},
    };
  }

  const start = performance.now();
  return {
    end: () => {
      const duration = performance.now() - start;
      console.debug(`[PERF] ${label}: ${duration.toFixed(2)}ms`);
    },
  };
}

export default logger;
