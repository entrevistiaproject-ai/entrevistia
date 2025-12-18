-- Migration: Adicionar tabela de perguntas favoritas
-- Permite que usuários favoritem perguntas padrão para fácil acesso

CREATE TABLE IF NOT EXISTS "perguntas_favoritas" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "pergunta_id" uuid NOT NULL REFERENCES "perguntas_templates"("id") ON DELETE CASCADE,
    "created_at" timestamp DEFAULT now() NOT NULL,
    UNIQUE("user_id", "pergunta_id")
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "idx_perguntas_favoritas_user_id" ON "perguntas_favoritas"("user_id");
CREATE INDEX IF NOT EXISTS "idx_perguntas_favoritas_pergunta_id" ON "perguntas_favoritas"("pergunta_id");
