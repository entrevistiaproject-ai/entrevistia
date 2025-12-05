/**
 * Configurações do Free Trial
 *
 * Modifique esses valores para ajustar os limites do plano gratuito
 */
export const FREE_TRIAL_LIMITS = {
  /**
   * Número máximo de entrevistas que podem ser criadas
   */
  MAX_ENTREVISTAS: 4,

  /**
   * Número máximo de perguntas por entrevista
   */
  MAX_PERGUNTAS_POR_ENTREVISTA: 12,

  /**
   * Número máximo de candidatos únicos que podem participar
   * (considera candidatos únicos em todas as entrevistas)
   */
  MAX_CANDIDATOS_TOTAL: 5,
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
 */
export const PLAN_LIMITS = {
  [PlanType.FREE_TRIAL]: {
    maxEntrevistas: FREE_TRIAL_LIMITS.MAX_ENTREVISTAS,
    maxPerguntasPorEntrevista: FREE_TRIAL_LIMITS.MAX_PERGUNTAS_POR_ENTREVISTA,
    maxCandidatosTotal: FREE_TRIAL_LIMITS.MAX_CANDIDATOS_TOTAL,
    maxCandidatosPorEntrevista: null, // ilimitado
  },
  [PlanType.BASIC]: {
    maxEntrevistas: 50,
    maxPerguntasPorEntrevista: 20,
    maxCandidatosTotal: null, // ilimitado
    maxCandidatosPorEntrevista: null, // ilimitado
  },
  [PlanType.PROFESSIONAL]: {
    maxEntrevistas: null, // ilimitado
    maxPerguntasPorEntrevista: null, // ilimitado
    maxCandidatosTotal: null, // ilimitado
    maxCandidatosPorEntrevista: null, // ilimitado
  },
  [PlanType.ENTERPRISE]: {
    maxEntrevistas: null, // ilimitado
    maxPerguntasPorEntrevista: null, // ilimitado
    maxCandidatosTotal: null, // ilimitado
    maxCandidatosPorEntrevista: null, // ilimitado
  },
} as const;
