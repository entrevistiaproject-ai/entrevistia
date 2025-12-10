-- Migration: Sistema de Tickets/Chamados e Monitoramento
-- Descrição: Adiciona tabelas para sistema de suporte, tickets e monitoramento de erros

-- Enums para tickets
DO $$ BEGIN
    CREATE TYPE "public"."ticket_status" AS ENUM ('aberto', 'em_analise', 'aguardando_usuario', 'aguardando_tecnico', 'resolvido', 'fechado', 'cancelado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "public"."ticket_priority" AS ENUM ('baixa', 'media', 'alta', 'critica');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "public"."ticket_category" AS ENUM ('usuario', 'sistemico', 'faturamento', 'performance', 'seguranca', 'integracao', 'sugestao', 'outro');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "public"."ticket_source" AS ENUM ('usuario', 'sistema', 'admin', 'pagina_erro', 'pagina_fatura', 'widget_suporte');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tabela de Tickets/Chamados
CREATE TABLE IF NOT EXISTS "tickets" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid REFERENCES "users"("id") ON DELETE SET NULL,
    "user_email" text NOT NULL,
    "user_name" text,
    "titulo" text NOT NULL,
    "descricao" text NOT NULL,
    "categoria" "ticket_category" DEFAULT 'outro' NOT NULL,
    "prioridade" "ticket_priority" DEFAULT 'media' NOT NULL,
    "status" "ticket_status" DEFAULT 'aberto' NOT NULL,
    "origem" "ticket_source" DEFAULT 'usuario' NOT NULL,
    "risco_score" integer DEFAULT 0,
    "risco_motivo" text,
    "assigned_to" uuid REFERENCES "admin_users"("id") ON DELETE SET NULL,
    "assigned_at" timestamp,
    "resolucao" text,
    "resolvido_por" uuid REFERENCES "admin_users"("id") ON DELETE SET NULL,
    "resolvido_em" timestamp,
    "error_fingerprint" text,
    "error_message" text,
    "error_stack" text,
    "error_context" jsonb,
    "error_count" integer DEFAULT 1,
    "page_url" text,
    "browser_info" text,
    "ip_address" text,
    "user_agent" text,
    "tags" text[],
    "metadados" jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "first_response_at" timestamp,
    "closed_at" timestamp
);

-- Tabela de Mensagens do Ticket
CREATE TABLE IF NOT EXISTS "ticket_messages" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "ticket_id" uuid NOT NULL REFERENCES "tickets"("id") ON DELETE CASCADE,
    "autor_tipo" text NOT NULL,
    "autor_id" uuid,
    "autor_nome" text NOT NULL,
    "autor_email" text,
    "mensagem" text NOT NULL,
    "is_internal" boolean DEFAULT false,
    "anexos" jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL
);

-- Tabela de Histórico do Ticket
CREATE TABLE IF NOT EXISTS "ticket_history" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "ticket_id" uuid NOT NULL REFERENCES "tickets"("id") ON DELETE CASCADE,
    "changed_by" uuid,
    "changed_by_nome" text,
    "changed_by_tipo" text,
    "campo" text NOT NULL,
    "valor_antigo" text,
    "valor_novo" text,
    "created_at" timestamp DEFAULT now() NOT NULL
);

-- Tabela de Logs do Sistema
CREATE TABLE IF NOT EXISTS "system_logs" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "level" text NOT NULL,
    "component" text,
    "message" text NOT NULL,
    "error_message" text,
    "error_stack" text,
    "fingerprint" text,
    "user_id" uuid REFERENCES "users"("id") ON DELETE SET NULL,
    "user_email" text,
    "request_id" text,
    "session_id" text,
    "endpoint" text,
    "method" text,
    "status_code" integer,
    "duration" integer,
    "ip_address" text,
    "user_agent" text,
    "environment" text,
    "context" jsonb,
    "ticket_id" uuid REFERENCES "tickets"("id") ON DELETE SET NULL,
    "timestamp" timestamp DEFAULT now() NOT NULL
);

-- Tabela de Agregação de Erros
CREATE TABLE IF NOT EXISTS "error_aggregations" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "fingerprint" text UNIQUE NOT NULL,
    "message" text NOT NULL,
    "component" text,
    "endpoint" text,
    "sample_stack" text,
    "total_occurrences" integer DEFAULT 1 NOT NULL,
    "unique_users" integer DEFAULT 0,
    "affected_sessions" integer DEFAULT 0,
    "first_seen" timestamp DEFAULT now() NOT NULL,
    "last_seen" timestamp DEFAULT now() NOT NULL,
    "resolved" boolean DEFAULT false,
    "resolved_at" timestamp,
    "resolved_by" uuid REFERENCES "admin_users"("id") ON DELETE SET NULL,
    "ticket_id" uuid REFERENCES "tickets"("id") ON DELETE SET NULL,
    "tags" text[]
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS "idx_tickets_status" ON "tickets"("status");
CREATE INDEX IF NOT EXISTS "idx_tickets_user_id" ON "tickets"("user_id");
CREATE INDEX IF NOT EXISTS "idx_tickets_assigned_to" ON "tickets"("assigned_to");
CREATE INDEX IF NOT EXISTS "idx_tickets_created_at" ON "tickets"("created_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_tickets_categoria" ON "tickets"("categoria");
CREATE INDEX IF NOT EXISTS "idx_tickets_prioridade" ON "tickets"("prioridade");
CREATE INDEX IF NOT EXISTS "idx_tickets_error_fingerprint" ON "tickets"("error_fingerprint");

CREATE INDEX IF NOT EXISTS "idx_ticket_messages_ticket_id" ON "ticket_messages"("ticket_id");
CREATE INDEX IF NOT EXISTS "idx_ticket_history_ticket_id" ON "ticket_history"("ticket_id");

CREATE INDEX IF NOT EXISTS "idx_system_logs_timestamp" ON "system_logs"("timestamp" DESC);
CREATE INDEX IF NOT EXISTS "idx_system_logs_level" ON "system_logs"("level");
CREATE INDEX IF NOT EXISTS "idx_system_logs_component" ON "system_logs"("component");
CREATE INDEX IF NOT EXISTS "idx_system_logs_fingerprint" ON "system_logs"("fingerprint");

CREATE INDEX IF NOT EXISTS "idx_error_aggregations_resolved" ON "error_aggregations"("resolved");
CREATE INDEX IF NOT EXISTS "idx_error_aggregations_last_seen" ON "error_aggregations"("last_seen" DESC);
CREATE INDEX IF NOT EXISTS "idx_error_aggregations_component" ON "error_aggregations"("component");
