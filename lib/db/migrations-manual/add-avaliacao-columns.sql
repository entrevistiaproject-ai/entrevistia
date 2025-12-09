-- Migration: Adicionar colunas de avaliação da IA na tabela candidato_entrevistas
-- Data: 2025-12-09

-- Adiciona coluna para nota geral (0-10)
ALTER TABLE candidato_entrevistas ADD COLUMN IF NOT EXISTS nota_geral REAL;

-- Adiciona coluna para recomendação ('recomendado', 'recomendado_com_ressalvas', 'nao_recomendado')
ALTER TABLE candidato_entrevistas ADD COLUMN IF NOT EXISTS recomendacao TEXT;

-- Adiciona coluna para resumo geral da avaliação
ALTER TABLE candidato_entrevistas ADD COLUMN IF NOT EXISTS resumo_geral TEXT;

-- Adiciona coluna para data da avaliação
ALTER TABLE candidato_entrevistas ADD COLUMN IF NOT EXISTS avaliado_em TIMESTAMP;
