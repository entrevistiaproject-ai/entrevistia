import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Tabela de magic links para autenticação sem senha
 * Usado principalmente para candidatos acessarem a plataforma
 */
export const magicLinks = pgTable("magic_links", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Email do destinatário
  email: text("email").notNull(),

  // Token único (nanoid)
  token: text("token").notNull().unique(),

  // Contexto do link (opcional)
  // Ex: entrevistaId para direcionar candidato diretamente para entrevista
  entrevistaId: uuid("entrevista_id"),
  candidatoId: uuid("candidato_id"),

  // Tipo de ação
  tipo: text("tipo").notNull().default("login"), // login, completar_perfil, ver_resultado

  // Controle de uso
  usedAt: timestamp("used_at", { mode: "date" }),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),

  // Metadados
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type MagicLink = typeof magicLinks.$inferSelect;
export type NewMagicLink = typeof magicLinks.$inferInsert;
