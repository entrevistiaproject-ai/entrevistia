import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

/**
 * Tabela de usuários administradores
 * Separada dos usuários do sistema para maior segurança
 */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Dados cadastrais
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),

  // Autenticação
  passwordHash: text("password_hash").notNull(),

  // Permissões
  role: text("role").notNull().default("admin"), // 'super_admin', 'admin', 'viewer'

  // Permissões granulares
  canManageUsers: boolean("can_manage_users").default(true).notNull(),
  canManageFinances: boolean("can_manage_finances").default(true).notNull(),
  canViewAnalytics: boolean("can_view_analytics").default(true).notNull(),
  canManageAdmins: boolean("can_manage_admins").default(false).notNull(),
  canAccessLogs: boolean("can_access_logs").default(true).notNull(),

  // Status da conta
  isActive: boolean("is_active").default(true).notNull(),
  lastLoginAt: timestamp("last_login_at", { mode: "date" }),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  createdBy: uuid("created_by"), // ID do admin que criou

  // Rastreamento
  ipLastLogin: text("ip_last_login"),
  userAgentLastLogin: text("user_agent_last_login"),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
