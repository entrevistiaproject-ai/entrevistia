import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Tabela de códigos de verificação de email
 */
export const verificationCodes = pgTable("verification_codes", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamento
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  email: text("email").notNull(),

  // Código de 6 dígitos
  code: text("code").notNull(),

  // Tipo
  type: text("type").notNull(), // email_verification, password_reset

  // Expiração (15 minutos)
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),

  // Status
  used: text("used").default("false").notNull(), // true/false como string
  usedAt: timestamp("used_at", { mode: "date" }),

  // Tentativas
  attempts: integer("attempts").default(0).notNull(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),

  // Rastreamento
  ipAddress: text("ip_address"),
});

export type VerificationCode = typeof verificationCodes.$inferSelect;
export type NewVerificationCode = typeof verificationCodes.$inferInsert;
