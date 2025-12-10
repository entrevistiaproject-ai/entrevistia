import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { adminUsers } from "./admin-users";

/**
 * Enums para tickets
 */
export const ticketStatusEnum = pgEnum("ticket_status", [
  "aberto",
  "em_analise",
  "aguardando_usuario",
  "aguardando_tecnico",
  "resolvido",
  "fechado",
  "cancelado",
]);

export const ticketPriorityEnum = pgEnum("ticket_priority", [
  "baixa",
  "media",
  "alta",
  "critica",
]);

export const ticketCategoryEnum = pgEnum("ticket_category", [
  "usuario",      // Problema do usuário (configuração, dúvida, etc.)
  "sistemico",    // Bug ou problema no sistema
  "faturamento",  // Problemas com faturas/pagamentos
  "performance",  // Problemas de lentidão
  "seguranca",    // Questões de segurança
  "integracao",   // Problemas com integrações (AI, email, etc.)
  "sugestao",     // Sugestões de melhoria
  "outro",        // Outros
]);

export const ticketSourceEnum = pgEnum("ticket_source", [
  "usuario",         // Criado manualmente pelo usuário
  "sistema",         // Criado automaticamente por erro
  "admin",           // Criado pelo administrador
  "pagina_erro",     // Criado a partir de página de erro
  "pagina_fatura",   // Criado a partir de página de fatura
  "widget_suporte",  // Criado via widget de suporte
]);

/**
 * Tabela de Tickets/Chamados
 */
export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Quem criou
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: text("user_email").notNull(),
  userName: text("user_name"),

  // Informações do ticket
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  categoria: ticketCategoryEnum("categoria").notNull().default("outro"),
  prioridade: ticketPriorityEnum("prioridade").notNull().default("media"),
  status: ticketStatusEnum("status").notNull().default("aberto"),
  origem: ticketSourceEnum("origem").notNull().default("usuario"),

  // Classificação de risco automática (0-100)
  riscoScore: integer("risco_score").default(0),
  riscoMotivo: text("risco_motivo"),

  // Atribuição
  assignedTo: uuid("assigned_to").references(() => adminUsers.id, { onDelete: "set null" }),
  assignedAt: timestamp("assigned_at", { mode: "date" }),

  // Resolução
  resolucao: text("resolucao"),
  resolvidoPor: uuid("resolvido_por").references(() => adminUsers.id, { onDelete: "set null" }),
  resolvidoEm: timestamp("resolvido_em", { mode: "date" }),

  // Metadados do erro (se criado por sistema)
  errorFingerprint: text("error_fingerprint"),
  errorMessage: text("error_message"),
  errorStack: text("error_stack"),
  errorContext: jsonb("error_context"),
  errorCount: integer("error_count").default(1),

  // Contexto adicional
  pageUrl: text("page_url"),
  browserInfo: text("browser_info"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  // Metadados
  tags: text("tags").array(),
  metadados: jsonb("metadados"),

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  firstResponseAt: timestamp("first_response_at", { mode: "date" }),
  closedAt: timestamp("closed_at", { mode: "date" }),
});

/**
 * Tabela de Mensagens/Respostas do Ticket
 */
export const ticketMessages = pgTable("ticket_messages", {
  id: uuid("id").defaultRandom().primaryKey(),

  ticketId: uuid("ticket_id")
    .references(() => tickets.id, { onDelete: "cascade" })
    .notNull(),

  // Autor da mensagem
  autorTipo: text("autor_tipo").notNull(), // "usuario" | "admin" | "sistema"
  autorId: uuid("autor_id"),
  autorNome: text("autor_nome").notNull(),
  autorEmail: text("autor_email"),

  // Conteúdo
  mensagem: text("mensagem").notNull(),
  isInternal: boolean("is_internal").default(false), // Nota interna (só admins veem)

  // Anexos
  anexos: jsonb("anexos"), // Array de { nome, url, tipo, tamanho }

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tabela de Histórico de Mudanças do Ticket
 */
export const ticketHistory = pgTable("ticket_history", {
  id: uuid("id").defaultRandom().primaryKey(),

  ticketId: uuid("ticket_id")
    .references(() => tickets.id, { onDelete: "cascade" })
    .notNull(),

  // Quem fez a mudança
  changedBy: uuid("changed_by"),
  changedByNome: text("changed_by_nome"),
  changedByTipo: text("changed_by_tipo"), // "usuario" | "admin" | "sistema"

  // O que mudou
  campo: text("campo").notNull(), // status, prioridade, categoria, assigned_to, etc.
  valorAntigo: text("valor_antigo"),
  valorNovo: text("valor_novo"),

  // Timestamp
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tabela de Logs de Sistema (para erros automáticos)
 */
export const systemLogs = pgTable("system_logs", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Nível e categoria
  level: text("level").notNull(), // debug, info, warn, error, critical
  component: text("component"), // api, database, auth, ai, billing, etc.

  // Mensagem e erro
  message: text("message").notNull(),
  errorMessage: text("error_message"),
  errorStack: text("error_stack"),
  fingerprint: text("fingerprint"), // Para agrupar erros similares

  // Contexto
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: text("user_email"),
  requestId: text("request_id"),
  sessionId: text("session_id"),
  endpoint: text("endpoint"),
  method: text("method"),
  statusCode: integer("status_code"),
  duration: integer("duration"), // em ms

  // Ambiente
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  environment: text("environment"), // development, production

  // Metadados
  context: jsonb("context"),

  // Vinculação com ticket (se criado)
  ticketId: uuid("ticket_id").references(() => tickets.id, { onDelete: "set null" }),

  // Timestamp
  timestamp: timestamp("timestamp", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tabela de Agregação de Erros (para dashboard)
 */
export const errorAggregations = pgTable("error_aggregations", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Identificação única do erro
  fingerprint: text("fingerprint").unique().notNull(),

  // Informações do erro
  message: text("message").notNull(),
  component: text("component"),
  endpoint: text("endpoint"),
  sampleStack: text("sample_stack"),

  // Estatísticas
  totalOccurrences: integer("total_occurrences").default(1).notNull(),
  uniqueUsers: integer("unique_users").default(0),
  affectedSessions: integer("affected_sessions").default(0),

  // Datas
  firstSeen: timestamp("first_seen", { mode: "date" }).defaultNow().notNull(),
  lastSeen: timestamp("last_seen", { mode: "date" }).defaultNow().notNull(),

  // Status
  resolved: boolean("resolved").default(false),
  resolvedAt: timestamp("resolved_at", { mode: "date" }),
  resolvedBy: uuid("resolved_by").references(() => adminUsers.id, { onDelete: "set null" }),

  // Vinculação com ticket
  ticketId: uuid("ticket_id").references(() => tickets.id, { onDelete: "set null" }),

  // Metadados
  tags: text("tags").array(),
});

// Types
export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;

export type TicketMessage = typeof ticketMessages.$inferSelect;
export type NewTicketMessage = typeof ticketMessages.$inferInsert;

export type TicketHistory = typeof ticketHistory.$inferSelect;
export type NewTicketHistory = typeof ticketHistory.$inferInsert;

export type SystemLog = typeof systemLogs.$inferSelect;
export type NewSystemLog = typeof systemLogs.$inferInsert;

export type ErrorAggregation = typeof errorAggregations.$inferSelect;
export type NewErrorAggregation = typeof errorAggregations.$inferInsert;
