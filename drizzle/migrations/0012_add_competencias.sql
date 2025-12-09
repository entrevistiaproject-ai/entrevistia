-- Migration: Adicionar avaliação por competências
-- Adiciona coluna JSONB para armazenar notas detalhadas por competência

ALTER TABLE candidato_entrevistas ADD COLUMN IF NOT EXISTS competencias JSONB;

COMMENT ON COLUMN candidato_entrevistas.competencias IS 'Avaliação detalhada por competência: [{nome, categoria, nota, descricao}]';
