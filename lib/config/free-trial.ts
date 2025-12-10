/**
 * Configurações do Free Trial
 *
 * O free trial é baseado em CRÉDITO FINANCEIRO de R$ 50,00
 * Não há limites de entrevistas, perguntas ou candidatos - apenas o saldo.
 *
 * Com R$ 50 de crédito, o usuário pode avaliar aproximadamente:
 * - 14 candidatos com 10 perguntas cada (R$ 3,50 × 14 = R$ 49)
 * - 20 candidatos com 5 perguntas cada (R$ 2,25 × 20 = R$ 45)
 * - 10 candidatos com 15 perguntas cada (R$ 4,75 × 10 = R$ 47,50)
 */
export const FREE_TRIAL_LIMITS = {
  /**
   * Número máximo de entrevistas que podem ser criadas
   * null = ilimitado (controle é pelo saldo financeiro)
   */
  MAX_ENTREVISTAS: null,

  /**
   * Número máximo de perguntas por entrevista
   * null = ilimitado (controle é pelo saldo financeiro)
   */
  MAX_PERGUNTAS_POR_ENTREVISTA: null,

  /**
   * Número máximo de candidatos únicos que podem participar
   * null = ilimitado (controle é pelo saldo financeiro)
   */
  MAX_CANDIDATOS_TOTAL: null,

  /**
   * Limite financeiro em reais para o free trial
   * Este é o ÚNICO limite do free trial - R$ 50 de crédito grátis
   */
  LIMITE_FINANCEIRO: 50.00,
} as const;

/**
 * Tipos de planos disponíveis
 */
export enum PlanType {
  FREE_TRIAL = 'free_trial',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
}

/**
 * Status do plano do usuário
 */
export enum PlanStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  SUSPENDED = 'suspended',
}

/**
 * Configurações de limites por tipo de plano
 *
 * FREE_TRIAL: Controlado apenas pelo saldo financeiro (R$ 50)
 * Outros planos: Sem limites (pay-per-use)
 */
export const PLAN_LIMITS = {
  [PlanType.FREE_TRIAL]: {
    maxEntrevistas: null, // ilimitado - controle pelo saldo
    maxPerguntasPorEntrevista: null, // ilimitado - controle pelo saldo
    maxCandidatosTotal: null, // ilimitado - controle pelo saldo
    maxCandidatosPorEntrevista: null, // ilimitado
    limiteFinanceiro: FREE_TRIAL_LIMITS.LIMITE_FINANCEIRO, // R$ 50
  },
  [PlanType.BASIC]: {
    maxEntrevistas: null, // ilimitado - pay per use
    maxPerguntasPorEntrevista: null, // ilimitado
    maxCandidatosTotal: null, // ilimitado
    maxCandidatosPorEntrevista: null, // ilimitado
    limiteFinanceiro: null, // sem limite - paga conforme usa
  },
  [PlanType.PROFESSIONAL]: {
    maxEntrevistas: null, // ilimitado
    maxPerguntasPorEntrevista: null, // ilimitado
    maxCandidatosTotal: null, // ilimitado
    maxCandidatosPorEntrevista: null, // ilimitado
    limiteFinanceiro: null, // sem limite - paga conforme usa
  },
  [PlanType.ENTERPRISE]: {
    maxEntrevistas: null, // ilimitado
    maxPerguntasPorEntrevista: null, // ilimitado
    maxCandidatosTotal: null, // ilimitado
    maxCandidatosPorEntrevista: null, // ilimitado
    limiteFinanceiro: null, // sem limite - paga conforme usa
  },
} as const;
