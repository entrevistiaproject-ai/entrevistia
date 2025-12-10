-- Migration: Add credito_extra field to users table
-- This field allows admins to grant extra credits to free trial users

ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "credito_extra" decimal(10, 2) DEFAULT '0.00';
