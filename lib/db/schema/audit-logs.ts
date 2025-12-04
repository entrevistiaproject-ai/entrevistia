import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Tabela de logs de auditoria
 * Fundamental para compliance com LGPD (rastreabilidade)
 */
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Quem realizou a ação
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: text("user_email"), // Mantém email mesmo se usuário for deletado

  // O que foi feito
  acao: text("acao").notNull(), // create, update, delete, access, export, etc
  entidade: text("entidade").notNull(), // users, candidatos, entrevistas, etc
  entidadeId: text("entidade_id"),

  // Detalhes
  descricao: text("descricao"),
  dadosAntigos: jsonb("dados_antigos"),
  dadosNovos: jsonb("dados_novos"),

  // Contexto LGPD
  tipoOperacaoLGPD: text("tipo_operacao_lgpd"), // tratamento, exclusao, portabilidade, etc
  baseJuridica: text("base_juridica"), // consentimento, contrato, legitimo_interesse, etc
  finalidade: text("finalidade"),

  // Rastreamento
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  localizacao: text("localizacao"), // País/cidade aproximado

  // Timestamp
  timestamp: timestamp("timestamp", { mode: "date" }).defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
