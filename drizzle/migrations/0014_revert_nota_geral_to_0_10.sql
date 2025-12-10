-- Migration: Reverter nota_geral de 0-100 para 0-10
-- A nota geral voltou a ser de 0 a 10 (compatibilidade_vaga permanece 0-100)

-- Converter notas existentes de 0-100 para 0-10
UPDATE candidato_entrevistas
SET nota_geral = nota_geral / 10
WHERE nota_geral IS NOT NULL AND nota_geral > 10;

COMMENT ON COLUMN candidato_entrevistas.nota_geral IS 'Nota geral do candidato de 0 a 10';
