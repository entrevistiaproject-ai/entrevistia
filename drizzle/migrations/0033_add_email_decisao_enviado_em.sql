-- Migration: Adicionar campo para rastrear envio de email de decisão automática
ALTER TABLE "candidato_entrevistas" ADD COLUMN IF NOT EXISTS "email_decisao_enviado_em" timestamp;
