-- Migration: Adiciona configurações de aprovação automática por vaga (entrevista)
-- Isso permite que cada vaga tenha suas próprias regras de aprovação/reprovação automática

-- Adiciona campos de aprovação automática na tabela entrevistas
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_approval_enabled" boolean DEFAULT false NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_approval_min_score" integer DEFAULT 70 NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_approval_use_compatibility" boolean DEFAULT false NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_approval_min_compatibility" integer DEFAULT 70 NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_approval_notify_candidate" boolean DEFAULT false NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_approval_candidate_message" text;

-- Adiciona campos de reprovação automática na tabela entrevistas
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_reject_enabled" boolean DEFAULT false NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_reject_max_score" integer DEFAULT 30 NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_reject_notify_candidate" boolean DEFAULT false NOT NULL;
ALTER TABLE "entrevistas" ADD COLUMN IF NOT EXISTS "auto_reject_candidate_message" text;
