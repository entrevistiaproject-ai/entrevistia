-- Migration: Add team management and auto-approval features
-- Created: 2025-12-11

-- Create enum for team roles
DO $$ BEGIN
    CREATE TYPE "team_role" AS ENUM ('owner', 'admin', 'recruiter', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create enum for invitation status
DO $$ BEGIN
    CREATE TYPE "invitation_status" AS ENUM ('pending', 'accepted', 'rejected', 'expired', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create team_members table
CREATE TABLE IF NOT EXISTS "team_members" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "owner_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "member_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "role" "team_role" DEFAULT 'recruiter' NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "team_members_owner_member_unique" UNIQUE ("owner_id", "member_id")
);

-- Create team_invitations table
CREATE TABLE IF NOT EXISTS "team_invitations" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "invited_by" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "invited_email" text NOT NULL,
    "invited_name" text,
    "role" "team_role" DEFAULT 'recruiter' NOT NULL,
    "token" text NOT NULL UNIQUE,
    "status" "invitation_status" DEFAULT 'pending' NOT NULL,
    "expires_at" timestamp NOT NULL,
    "message" text,
    "responded_at" timestamp,
    "responded_by" uuid REFERENCES "users"("id") ON DELETE SET NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

-- Create team_settings table
CREATE TABLE IF NOT EXISTS "team_settings" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "owner_id" uuid NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,

    -- Auto-approval settings
    "auto_approval_enabled" boolean DEFAULT false NOT NULL,
    "auto_approval_min_score" integer DEFAULT 70 NOT NULL,
    "auto_approval_use_compatibility" boolean DEFAULT false NOT NULL,
    "auto_approval_min_compatibility" integer DEFAULT 70 NOT NULL,
    "auto_approval_notify_team" boolean DEFAULT true NOT NULL,
    "auto_approval_notify_candidate" boolean DEFAULT false NOT NULL,
    "auto_approval_candidate_message" text,

    -- Auto-reject settings
    "auto_reject_enabled" boolean DEFAULT false NOT NULL,
    "auto_reject_max_score" integer DEFAULT 30 NOT NULL,
    "auto_reject_notify_candidate" boolean DEFAULT false NOT NULL,
    "auto_reject_candidate_message" text,

    -- Audit
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "team_members_owner_id_idx" ON "team_members" ("owner_id");
CREATE INDEX IF NOT EXISTS "team_members_member_id_idx" ON "team_members" ("member_id");
CREATE INDEX IF NOT EXISTS "team_invitations_invited_by_idx" ON "team_invitations" ("invited_by");
CREATE INDEX IF NOT EXISTS "team_invitations_invited_email_idx" ON "team_invitations" ("invited_email");
CREATE INDEX IF NOT EXISTS "team_invitations_token_idx" ON "team_invitations" ("token");
CREATE INDEX IF NOT EXISTS "team_invitations_status_idx" ON "team_invitations" ("status");
