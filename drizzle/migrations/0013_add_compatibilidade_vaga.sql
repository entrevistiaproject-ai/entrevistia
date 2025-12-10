-- Migration: Adicionar compatibilidade com a vaga e ajustar nota geral para 0-100
-- A coluna nota_geral agora representa nota de 0 a 100 (antes era 0-10)
-- Multiplicamos os valores existentes por 10 para converter para a nova escala

-- Converter notas existentes de 0-10 para 0-100
UPDATE candidato_entrevistas
SET nota_geral = nota_geral * 10
WHERE nota_geral IS NOT NULL AND nota_geral <= 10;

-- Adicionar coluna de compatibilidade com a vaga
ALTER TABLE candidato_entrevistas ADD COLUMN IF NOT EXISTS compatibilidade_vaga REAL;

COMMENT ON COLUMN candidato_entrevistas.nota_geral IS 'Nota geral do candidato de 0 a 100';
COMMENT ON COLUMN candidato_entrevistas.compatibilidade_vaga IS 'Compatibilidade do candidato com a vaga de 0 a 100';
