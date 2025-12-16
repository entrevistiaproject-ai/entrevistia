-- Migration: Add notificacao_75_enviada_em to users table
-- Description: Campo para controlar quando foi enviada a notificação de 75% do limite de free trial

ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "notificacao_75_enviada_em" timestamp;
