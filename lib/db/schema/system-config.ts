import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { adminUsers } from "./admin-users";

/**
 * Tabela de Configurações do Sistema
 *
 * Armazena configurações globais como preços e limites de trial
 * que podem ser modificados pelo painel administrativo.
 */
export const systemConfig = pgTable("system_config", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Chave única da configuração
  key: text("key").notNull().unique(),

  // Valor da configuração (pode ser string, número, JSON, etc.)
  value: text("value").notNull(),

  // Tipo do valor para parse correto
  valueType: text("value_type").notNull().default("string"), // string, number, boolean, json

  // Categoria para agrupamento
  category: text("category").notNull(), // pricing, trial, system, etc.

  // Descrição da configuração
  description: text("description"),

  // Se a configuração está ativa
  isActive: boolean("is_active").default(true).notNull(),

  // Audit trail
  updatedBy: uuid("updated_by").references(() => adminUsers.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Histórico de alterações de configurações
 * Para auditoria e possível rollback
 */
export const systemConfigHistory = pgTable("system_config_history", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Referência à configuração
  configKey: text("config_key").notNull(),

  // Valores antes e depois da alteração
  oldValue: text("old_value"),
  newValue: text("new_value").notNull(),

  // Quem alterou
  changedBy: uuid("changed_by").references(() => adminUsers.id),

  // Motivo da alteração (opcional)
  reason: text("reason"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Tipos para uso no código
export type SystemConfig = typeof systemConfig.$inferSelect;
export type NewSystemConfig = typeof systemConfig.$inferInsert;
export type SystemConfigHistory = typeof systemConfigHistory.$inferSelect;

// Constantes para chaves de configuração
export const CONFIG_KEYS = {
  // Preços
  TAXA_BASE_CANDIDATO: "pricing.taxa_base_candidato",
  ANALISE_POR_PERGUNTA: "pricing.analise_por_pergunta",
  TAXA_CAMBIO_USD_BRL: "pricing.taxa_cambio_usd_brl",

  // Trial
  TRIAL_LIMITE_FINANCEIRO: "trial.limite_financeiro",
  TRIAL_DURACAO_DIAS: "trial.duracao_dias",
  TRIAL_ATIVO: "trial.ativo",

  // Pacotes de crédito
  PACOTE_STARTER_CREDITOS: "pacote.starter.creditos",
  PACOTE_STARTER_VALOR: "pacote.starter.valor",
  PACOTE_STARTER_DESCONTO: "pacote.starter.desconto",

  PACOTE_PROFESSIONAL_CREDITOS: "pacote.professional.creditos",
  PACOTE_PROFESSIONAL_VALOR: "pacote.professional.valor",
  PACOTE_PROFESSIONAL_DESCONTO: "pacote.professional.desconto",

  PACOTE_BUSINESS_CREDITOS: "pacote.business.creditos",
  PACOTE_BUSINESS_VALOR: "pacote.business.valor",
  PACOTE_BUSINESS_DESCONTO: "pacote.business.desconto",

  PACOTE_ENTERPRISE_CREDITOS: "pacote.enterprise.creditos",
  PACOTE_ENTERPRISE_VALOR: "pacote.enterprise.valor",
  PACOTE_ENTERPRISE_DESCONTO: "pacote.enterprise.desconto",
} as const;

// Valores padrão para inicialização
export const DEFAULT_CONFIG_VALUES = {
  // Preços
  [CONFIG_KEYS.TAXA_BASE_CANDIDATO]: {
    value: "1.00",
    valueType: "number",
    category: "pricing",
    description: "Taxa base cobrada por cada candidato avaliado (R$)",
  },
  [CONFIG_KEYS.ANALISE_POR_PERGUNTA]: {
    value: "0.25",
    valueType: "number",
    category: "pricing",
    description: "Taxa por cada pergunta analisada pela IA (R$)",
  },
  [CONFIG_KEYS.TAXA_CAMBIO_USD_BRL]: {
    value: "5.00",
    valueType: "number",
    category: "pricing",
    description: "Taxa de câmbio USD para BRL para cálculo de custos",
  },

  // Trial
  [CONFIG_KEYS.TRIAL_LIMITE_FINANCEIRO]: {
    value: "50.00",
    valueType: "number",
    category: "trial",
    description: "Limite de crédito em reais para o período de trial",
  },
  [CONFIG_KEYS.TRIAL_DURACAO_DIAS]: {
    value: "30",
    valueType: "number",
    category: "trial",
    description: "Duração do período de trial em dias",
  },
  [CONFIG_KEYS.TRIAL_ATIVO]: {
    value: "true",
    valueType: "boolean",
    category: "trial",
    description: "Se o sistema de trial está ativo para novos usuários",
  },

  // Pacotes
  [CONFIG_KEYS.PACOTE_STARTER_CREDITOS]: {
    value: "50",
    valueType: "number",
    category: "pacotes",
    description: "Quantidade de créditos do pacote Starter",
  },
  [CONFIG_KEYS.PACOTE_STARTER_VALOR]: {
    value: "50",
    valueType: "number",
    category: "pacotes",
    description: "Valor do pacote Starter (R$)",
  },
  [CONFIG_KEYS.PACOTE_STARTER_DESCONTO]: {
    value: "0",
    valueType: "number",
    category: "pacotes",
    description: "Desconto do pacote Starter (%)",
  },

  [CONFIG_KEYS.PACOTE_PROFESSIONAL_CREDITOS]: {
    value: "150",
    valueType: "number",
    category: "pacotes",
    description: "Quantidade de créditos do pacote Professional",
  },
  [CONFIG_KEYS.PACOTE_PROFESSIONAL_VALOR]: {
    value: "135",
    valueType: "number",
    category: "pacotes",
    description: "Valor do pacote Professional (R$)",
  },
  [CONFIG_KEYS.PACOTE_PROFESSIONAL_DESCONTO]: {
    value: "10",
    valueType: "number",
    category: "pacotes",
    description: "Desconto do pacote Professional (%)",
  },

  [CONFIG_KEYS.PACOTE_BUSINESS_CREDITOS]: {
    value: "500",
    valueType: "number",
    category: "pacotes",
    description: "Quantidade de créditos do pacote Business",
  },
  [CONFIG_KEYS.PACOTE_BUSINESS_VALOR]: {
    value: "400",
    valueType: "number",
    category: "pacotes",
    description: "Valor do pacote Business (R$)",
  },
  [CONFIG_KEYS.PACOTE_BUSINESS_DESCONTO]: {
    value: "20",
    valueType: "number",
    category: "pacotes",
    description: "Desconto do pacote Business (%)",
  },

  [CONFIG_KEYS.PACOTE_ENTERPRISE_CREDITOS]: {
    value: "1000",
    valueType: "number",
    category: "pacotes",
    description: "Quantidade de créditos do pacote Enterprise",
  },
  [CONFIG_KEYS.PACOTE_ENTERPRISE_VALOR]: {
    value: "700",
    valueType: "number",
    category: "pacotes",
    description: "Valor do pacote Enterprise (R$)",
  },
  [CONFIG_KEYS.PACOTE_ENTERPRISE_DESCONTO]: {
    value: "30",
    valueType: "number",
    category: "pacotes",
    description: "Desconto do pacote Enterprise (%)",
  },
} as const;
