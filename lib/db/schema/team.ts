import { pgTable, text, timestamp, uuid, boolean, integer, pgEnum, unique } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Enum para roles de membros do time
 * - owner: dono original (pode tudo)
 * - admin: pode convidar/remover membros, gerenciar configurações
 * - recruiter: pode criar entrevistas, avaliar candidatos, aprovar/reprovar, editar configs de aprovação
 * - financial: acesso às páginas financeiras (custos, fatura) mas não às funcionalidades de recrutamento
 * - viewer: apenas visualização (sem poder de aprovar/reprovar)
 */
export const teamRoleEnum = pgEnum("team_role", ["owner", "admin", "recruiter", "financial", "viewer"]);

/**
 * Enum para status de convites
 */
export const invitationStatusEnum = pgEnum("invitation_status", ["pending", "accepted", "rejected", "expired", "cancelled"]);

/**
 * Tabela de membros do time
 * Permite que múltiplos recrutadores trabalhem juntos sob uma mesma conta/empresa
 */
export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Dono do time (quem criou a conta e pode convidar membros)
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Membro do time
  memberId: uuid("member_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Role do membro no time (ver enum acima para descrições)
  role: teamRoleEnum("role").default("recruiter").notNull(),

  // Status ativo
  isActive: boolean("is_active").default(true).notNull(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => [
  // Garante que um membro só pode estar uma vez no time de cada owner
  unique("team_members_owner_member_unique").on(table.ownerId, table.memberId),
]);

/**
 * Tabela de convites para o time
 * Gerencia convites pendentes para novos membros
 */
export const teamInvitations = pgTable("team_invitations", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Quem enviou o convite (dono ou admin do time)
  invitedBy: uuid("invited_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Email do convidado (pode ou não ter conta)
  invitedEmail: text("invited_email").notNull(),

  // Nome do convidado (opcional, para personalização)
  invitedName: text("invited_name"),

  // Role que será atribuído ao aceitar
  role: teamRoleEnum("role").default("recruiter").notNull(),

  // Token único para aceitar o convite
  token: text("token").notNull().unique(),

  // Status do convite
  status: invitationStatusEnum("status").default("pending").notNull(),

  // Expiração do convite (7 dias por padrão)
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),

  // Mensagem personalizada do convite
  message: text("message"),

  // Dados de aceite/recusa
  respondedAt: timestamp("responded_at", { mode: "date" }),
  respondedBy: uuid("responded_by").references(() => users.id, { onDelete: "set null" }),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tabela de configurações do time
 * Armazena configurações como aprovação automática
 */
export const teamSettings = pgTable("team_settings", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Owner do time (usuário principal)
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),

  // === Configuração de Aprovação Automática ===

  // Ativar/desativar aprovação automática
  autoApprovalEnabled: boolean("auto_approval_enabled").default(false).notNull(),

  // Score mínimo para aprovação automática (0-100)
  autoApprovalMinScore: integer("auto_approval_min_score").default(70).notNull(),

  // Também usar compatibilidade com a vaga como critério
  autoApprovalUseCompatibility: boolean("auto_approval_use_compatibility").default(false).notNull(),

  // Compatibilidade mínima com a vaga (0-100)
  autoApprovalMinCompatibility: integer("auto_approval_min_compatibility").default(70).notNull(),

  // Enviar notificação por email quando candidato for aprovado automaticamente
  autoApprovalNotifyTeam: boolean("auto_approval_notify_team").default(true).notNull(),

  // Enviar email ao candidato quando for aprovado automaticamente
  autoApprovalNotifyCandidate: boolean("auto_approval_notify_candidate").default(false).notNull(),

  // Mensagem personalizada para enviar ao candidato aprovado
  autoApprovalCandidateMessage: text("auto_approval_candidate_message"),

  // === Configuração de Reprovação Automática ===

  // Ativar/desativar reprovação automática
  autoRejectEnabled: boolean("auto_reject_enabled").default(false).notNull(),

  // Score máximo para reprovação automática (0-100)
  autoRejectMaxScore: integer("auto_reject_max_score").default(30).notNull(),

  // Enviar email ao candidato quando for reprovado automaticamente
  autoRejectNotifyCandidate: boolean("auto_reject_notify_candidate").default(false).notNull(),

  // Mensagem personalizada para enviar ao candidato reprovado
  autoRejectCandidateMessage: text("auto_reject_candidate_message"),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;

export type TeamInvitation = typeof teamInvitations.$inferSelect;
export type NewTeamInvitation = typeof teamInvitations.$inferInsert;

export type TeamSettings = typeof teamSettings.$inferSelect;
export type NewTeamSettings = typeof teamSettings.$inferInsert;

export type TeamRole = "owner" | "admin" | "recruiter" | "financial" | "viewer";
export type InvitationStatus = "pending" | "accepted" | "rejected" | "expired" | "cancelled";
