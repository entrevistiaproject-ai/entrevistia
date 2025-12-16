import { pgTable, text, timestamp, uuid, boolean, integer, decimal } from "drizzle-orm/pg-core";

/**
 * Tabela de usuários (recrutadores/empresas)
 * Controladores de dados no contexto da LGPD
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Dados cadastrais
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  telefone: text("telefone"),

  // Dados profissionais
  empresa: text("empresa"),
  cargo: text("cargo"),

  // Autenticação
  passwordHash: text("password_hash").notNull(),

  // Status da conta
  isActive: boolean("is_active").default(true).notNull(),

  // Conta de teste (QA)
  // Contas teste têm acesso livre à plataforma para testes em produção
  // Geram faturas normais mas não são integradas ao meio de pagamento
  // Os valores não contam como receita, mas os custos abtem da margem
  isTestAccount: boolean("is_test_account").default(false).notNull(),

  // Plano e limites
  planType: text("plan_type").default("free_trial").notNull(), // 'free_trial', 'basic', 'professional', 'enterprise'
  planStatus: text("plan_status").default("active").notNull(), // 'active', 'expired', 'cancelled', 'suspended'
  planStartedAt: timestamp("plan_started_at", { mode: "date" }).defaultNow(),
  planExpiresAt: timestamp("plan_expires_at", { mode: "date" }),

  // Contadores de uso (para validação de limites)
  usageEntrevistas: integer("usage_entrevistas").default(0).notNull(),
  usageCandidatos: integer("usage_candidatos").default(0).notNull(), // Candidatos únicos totais

  // Crédito extra concedido pelo admin (em reais)
  // Este valor é ADICIONADO ao limite padrão do free trial (R$ 50)
  creditoExtra: decimal("credito_extra", { precision: 10, scale: 2 }).default("0.00"),

  // Controle de notificações de limite
  // Data em que foi enviada a notificação de 75% do limite
  notificacao75EnviadaEm: timestamp("notificacao_75_enviada_em", { mode: "date" }),

  // Consentimentos LGPD
  aceitouTermos: boolean("aceitou_termos").default(false).notNull(),
  aceitouPrivacidade: boolean("aceitou_privacidade").default(false).notNull(),
  dataAceiteTermos: timestamp("data_aceite_termos", { mode: "date" }),

  // Preferências de comunicação
  aceitaEmailMarketing: boolean("aceita_email_marketing").default(false).notNull(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "date" }), // Soft delete para LGPD

  // Rastreamento para LGPD
  ipCadastro: text("ip_cadastro"),
  userAgentCadastro: text("user_agent_cadastro"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
