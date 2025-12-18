-- Migration: add_analise_id_to_transacoes
-- Adiciona campo analise_id para agrupar transações de uma mesma análise

ALTER TABLE "transacoes" ADD COLUMN "analise_id" uuid;

-- Criar índice para consultas por analise_id
CREATE INDEX IF NOT EXISTS "idx_transacoes_analise_id" ON "transacoes" ("analise_id");

-- Comentário explicativo
COMMENT ON COLUMN "transacoes"."analise_id" IS 'UUID único que agrupa taxa_base_candidato com suas analise_pergunta. Gerado a cada nova análise.';
