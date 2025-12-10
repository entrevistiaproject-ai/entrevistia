-- Migration: Add is_test_account column to users table
-- This column identifies test accounts (QA) that have free access
-- Their costs are tracked but not counted as revenue

ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "is_test_account" boolean DEFAULT false NOT NULL;
