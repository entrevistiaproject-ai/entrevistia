-- Migration: Corrigir notas que ainda estão na escala 0-10
-- Após a migração 0021, o AI continuou gerando notas de 0-10
-- Esta migração converte essas notas para a escala correta de 0-100

-- Converter notas de 0-10 para 0-100 (notas <= 10 são claramente na escala antiga)
UPDATE candidato_entrevistas
SET nota_geral = nota_geral * 10
WHERE nota_geral IS NOT NULL AND nota_geral <= 10;

-- Também corrigir pontuacao_maxima das perguntas que ainda estão em 10
UPDATE perguntas
SET pontuacao_maxima = 100
WHERE pontuacao_maxima = 10;
