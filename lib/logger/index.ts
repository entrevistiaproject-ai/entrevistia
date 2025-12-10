/**
 * Sistema de Logging Centralizado
 *
 * Este módulo fornece um sistema de logging robusto com:
 * - Níveis de severidade (debug, info, warn, error, critical)
 * - Contexto estruturado (userId, requestId, etc.)
 * - Integração com sistema de tickets para erros críticos
 * - Persistência em banco de dados para erros
 */

export type LogLevel = "debug" | "info" | "warn" | "error" | "critical";

export interface LogContext {
  userId?: string;
  userEmail?: string;
  requestId?: string;
  sessionId?: string;
  endpoint?: string;
  method?: string;
  component?: string;
  action?: string;
  entidade?: string;
  entidadeId?: string;
  ipAddress?: string;
  userAgent?: string;
  duration?: number;
  statusCode?: number;
  // Metadados adicionais
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context: LogContext;
  error?: Error | unknown;
  timestamp: Date;
  stack?: string;
}

export interface ErrorMetadata {
  fingerprint: string;
  occurrences: number;
  firstSeen: Date;
  lastSeen: Date;
  resolved: boolean;
}

// Cores para console
const COLORS = {
  debug: "\x1b[36m",    // Cyan
  info: "\x1b[32m",     // Green
  warn: "\x1b[33m",     // Yellow
  error: "\x1b[31m",    // Red
  critical: "\x1b[35m", // Magenta
  reset: "\x1b[0m",
};

const LEVEL_ICONS = {
  debug: "🔍",
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
  critical: "🚨",
};

// Prioridade dos níveis
const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  critical: 4,
};

class Logger {
  private context: LogContext = {};
  private minLevel: LogLevel;
  private errorBuffer: LogEntry[] = [];
  private readonly maxBufferSize = 100;

  constructor(context: LogContext = {}, minLevel?: LogLevel) {
    this.context = context;
    this.minLevel = minLevel || (process.env.NODE_ENV === "production" ? "info" : "debug");
  }

  /**
   * Cria um novo logger com contexto adicional
   */
  child(additionalContext: LogContext): Logger {
    const child = new Logger(
      { ...this.context, ...additionalContext },
      this.minLevel
    );
    return child;
  }

  /**
   * Gera uma fingerprint única para agrupar erros similares
   */
  private generateErrorFingerprint(error: Error | unknown, context: LogContext): string {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack?.split("\n")[1] || "" : "";
    const component = context.component || "unknown";

    // Cria uma fingerprint baseada no componente, mensagem e linha do stack
    const fingerprint = `${component}:${errorMessage.slice(0, 100)}:${stack.slice(0, 50)}`;
    return Buffer.from(fingerprint).toString("base64").slice(0, 32);
  }

  /**
   * Formata a mensagem para o console
   */
  private formatConsoleMessage(entry: LogEntry): string {
    const color = COLORS[entry.level];
    const icon = LEVEL_ICONS[entry.level];
    const timestamp = entry.timestamp.toISOString();
    const contextStr = Object.entries(entry.context)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${typeof v === "object" ? JSON.stringify(v) : v}`)
      .join(" ");

    let message = `${color}${icon} [${timestamp}] [${entry.level.toUpperCase()}]${COLORS.reset} ${entry.message}`;

    if (contextStr) {
      message += `\n   ${COLORS.debug}${contextStr}${COLORS.reset}`;
    }

    if (entry.stack) {
      message += `\n   ${COLORS.error}${entry.stack}${COLORS.reset}`;
    }

    return message;
  }

  /**
   * Verifica se deve logar baseado no nível mínimo
   */
  private shouldLog(level: LogLevel): boolean {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.minLevel];
  }

  /**
   * Executa o log
   */
  private log(level: LogLevel, message: string, context: LogContext = {}, error?: Error | unknown): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      context: { ...this.context, ...context },
      error,
      timestamp: new Date(),
      stack: error instanceof Error ? error.stack : undefined,
    };

    // Console output
    const formattedMessage = this.formatConsoleMessage(entry);

    switch (level) {
      case "debug":
        console.debug(formattedMessage);
        break;
      case "info":
        console.info(formattedMessage);
        break;
      case "warn":
        console.warn(formattedMessage);
        break;
      case "error":
      case "critical":
        console.error(formattedMessage);
        break;
    }

    // Armazena erros no buffer para persistência posterior
    if (level === "error" || level === "critical") {
      this.bufferError(entry);
    }
  }

  /**
   * Adiciona erro ao buffer
   */
  private bufferError(entry: LogEntry): void {
    this.errorBuffer.push(entry);

    // Limita o tamanho do buffer
    if (this.errorBuffer.length > this.maxBufferSize) {
      this.errorBuffer.shift();
    }
  }

  /**
   * Retorna erros do buffer
   */
  getBufferedErrors(): LogEntry[] {
    return [...this.errorBuffer];
  }

  /**
   * Limpa o buffer de erros
   */
  clearBuffer(): void {
    this.errorBuffer = [];
  }

  // Métodos de conveniência
  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    this.log("error", message, context, error);
  }

  critical(message: string, error?: Error | unknown, context?: LogContext): void {
    this.log("critical", message, context, error);
  }

  /**
   * Log de início de operação (retorna função para log de fim)
   */
  startOperation(operation: string, context?: LogContext): () => void {
    const startTime = Date.now();
    this.debug(`Iniciando: ${operation}`, context);

    return () => {
      const duration = Date.now() - startTime;
      this.debug(`Concluído: ${operation}`, { ...context, duration });
    };
  }

  /**
   * Log de requisição HTTP
   */
  httpRequest(
    method: string,
    endpoint: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): void {
    const level: LogLevel = statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
    this.log(level, `${method} ${endpoint} ${statusCode}`, {
      ...context,
      method,
      endpoint,
      statusCode,
      duration,
    });
  }

  /**
   * Log de operação de banco de dados
   */
  dbOperation(
    operation: string,
    table: string,
    duration: number,
    context?: LogContext
  ): void {
    this.debug(`DB: ${operation} on ${table}`, {
      ...context,
      duration,
      entidade: table,
      action: operation,
    });
  }

  /**
   * Log de chamada de API externa
   */
  externalApi(
    service: string,
    endpoint: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): void {
    const level: LogLevel = statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
    this.log(level, `API ${service}: ${endpoint} ${statusCode}`, {
      ...context,
      component: `external:${service}`,
      endpoint,
      statusCode,
      duration,
    });
  }

  /**
   * Log de evento de negócio
   */
  businessEvent(
    event: string,
    details: Record<string, unknown>,
    context?: LogContext
  ): void {
    this.info(`Evento: ${event}`, { ...context, ...details, action: event });
  }

  /**
   * Log de segurança
   */
  security(
    event: string,
    severity: "low" | "medium" | "high" | "critical",
    context?: LogContext
  ): void {
    const level: LogLevel = severity === "critical" ? "critical" : severity === "high" ? "error" : severity === "medium" ? "warn" : "info";
    this.log(level, `🔒 Segurança: ${event}`, { ...context, securitySeverity: severity });
  }

  /**
   * Cria entrada de erro para persistência no banco
   */
  createErrorEntry(
    error: Error | unknown,
    context: LogContext = {}
  ): {
    message: string;
    stack: string | null;
    fingerprint: string;
    level: LogLevel;
    context: LogContext;
    timestamp: Date;
  } {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    return {
      message: errorObj.message,
      stack: errorObj.stack || null,
      fingerprint: this.generateErrorFingerprint(error, { ...this.context, ...context }),
      level: "error",
      context: { ...this.context, ...context },
      timestamp: new Date(),
    };
  }
}

// Instância global do logger
export const logger = new Logger({ component: "app" });

// Loggers especializados
export const dbLogger = logger.child({ component: "database" });
export const apiLogger = logger.child({ component: "api" });
export const authLogger = logger.child({ component: "auth" });
export const aiLogger = logger.child({ component: "ai" });
export const billingLogger = logger.child({ component: "billing" });
export const emailLogger = logger.child({ component: "email" });

// Factory para criar loggers com contexto de request
export function createRequestLogger(
  requestId: string,
  userId?: string,
  ipAddress?: string,
  userAgent?: string
): Logger {
  return logger.child({
    requestId,
    userId,
    ipAddress,
    userAgent,
  });
}

// Factory para criar loggers de componente
export function createComponentLogger(component: string): Logger {
  return logger.child({ component });
}

export default logger;
