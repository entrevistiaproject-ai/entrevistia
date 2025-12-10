-- Migration: Create system_config and system_config_history tables
-- Description: Tables for storing system configuration (pricing, trial limits, etc.)

CREATE TABLE IF NOT EXISTS "system_config" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "key" text NOT NULL UNIQUE,
    "value" text NOT NULL,
    "value_type" text DEFAULT 'string' NOT NULL,
    "category" text NOT NULL,
    "description" text,
    "is_active" boolean DEFAULT true NOT NULL,
    "updated_by" uuid,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "system_config_history" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "config_key" text NOT NULL,
    "old_value" text,
    "new_value" text NOT NULL,
    "changed_by" uuid,
    "reason" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "system_config" ADD CONSTRAINT "system_config_updated_by_admin_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "admin_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint

DO $$ BEGIN
    ALTER TABLE "system_config_history" ADD CONSTRAINT "system_config_history_changed_by_admin_users_id_fk" FOREIGN KEY ("changed_by") REFERENCES "admin_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "idx_system_config_key" ON "system_config" ("key");

--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "idx_system_config_category" ON "system_config" ("category");

--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "idx_system_config_history_key" ON "system_config_history" ("config_key");

--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "idx_system_config_history_created" ON "system_config_history" ("created_at" DESC);
