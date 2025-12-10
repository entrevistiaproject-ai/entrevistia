-- Migration: Add convite e prazo fields to candidato_entrevistas
-- Adds fields to track when invitation was sent and deadline to respond

ALTER TABLE "candidato_entrevistas" ADD COLUMN IF NOT EXISTS "convite_enviado_em" timestamp;
ALTER TABLE "candidato_entrevistas" ADD COLUMN IF NOT EXISTS "prazo_resposta" timestamp;
