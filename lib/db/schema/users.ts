import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

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
