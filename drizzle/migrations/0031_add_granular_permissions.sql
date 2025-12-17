-- Adiciona permissões granulares à tabela team_members

-- Permissões de Entrevistas
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_view_interviews" boolean DEFAULT true NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_create_interviews" boolean DEFAULT false NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_edit_interviews" boolean DEFAULT false NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_delete_interviews" boolean DEFAULT false NOT NULL;

-- Permissões de Candidatos
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_view_candidates" boolean DEFAULT true NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_approve_candidates" boolean DEFAULT false NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_reject_candidates" boolean DEFAULT false NOT NULL;

-- Permissões Financeiras
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_view_financials" boolean DEFAULT false NOT NULL;

-- Permissões de Time
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_invite_members" boolean DEFAULT false NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_remove_members" boolean DEFAULT false NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_edit_member_permissions" boolean DEFAULT false NOT NULL;

-- Permissões de Configurações
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_edit_settings" boolean DEFAULT false NOT NULL;
ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "can_edit_auto_approval" boolean DEFAULT false NOT NULL;

-- Atualiza membros existentes baseado no role atual
-- Admin: todas as permissões exceto financeiro
UPDATE "team_members"
SET
    "can_view_interviews" = true,
    "can_create_interviews" = true,
    "can_edit_interviews" = true,
    "can_delete_interviews" = true,
    "can_view_candidates" = true,
    "can_approve_candidates" = true,
    "can_reject_candidates" = true,
    "can_view_financials" = false,
    "can_invite_members" = true,
    "can_remove_members" = true,
    "can_edit_member_permissions" = true,
    "can_edit_settings" = true,
    "can_edit_auto_approval" = true
WHERE "role" = 'admin';

-- Recruiter: gerenciar entrevistas e candidatos
UPDATE "team_members"
SET
    "can_view_interviews" = true,
    "can_create_interviews" = true,
    "can_edit_interviews" = true,
    "can_delete_interviews" = false,
    "can_view_candidates" = true,
    "can_approve_candidates" = true,
    "can_reject_candidates" = true,
    "can_view_financials" = false,
    "can_invite_members" = false,
    "can_remove_members" = false,
    "can_edit_member_permissions" = false,
    "can_edit_settings" = false,
    "can_edit_auto_approval" = true
WHERE "role" = 'recruiter';

-- Financial: apenas financeiro
UPDATE "team_members"
SET
    "can_view_interviews" = false,
    "can_create_interviews" = false,
    "can_edit_interviews" = false,
    "can_delete_interviews" = false,
    "can_view_candidates" = false,
    "can_approve_candidates" = false,
    "can_reject_candidates" = false,
    "can_view_financials" = true,
    "can_invite_members" = false,
    "can_remove_members" = false,
    "can_edit_member_permissions" = false,
    "can_edit_settings" = false,
    "can_edit_auto_approval" = false
WHERE "role" = 'financial';

-- Viewer: apenas visualização
UPDATE "team_members"
SET
    "can_view_interviews" = true,
    "can_create_interviews" = false,
    "can_edit_interviews" = false,
    "can_delete_interviews" = false,
    "can_view_candidates" = true,
    "can_approve_candidates" = false,
    "can_reject_candidates" = false,
    "can_view_financials" = false,
    "can_invite_members" = false,
    "can_remove_members" = false,
    "can_edit_member_permissions" = false,
    "can_edit_settings" = false,
    "can_edit_auto_approval" = false
WHERE "role" = 'viewer';
