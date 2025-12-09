-- Análise e Mapeamento de Categorias
-- ANTES: tecnica, comportamental, soft_skill, hard_skill
-- DEPOIS: conhecimento, experiencia, resolucao_problemas, habilidades_pessoais, qualificacoes

-- MAPEAMENTO:
-- comportamental → experiencia (perguntas sobre casos passados)
-- tecnica → conhecimento (conceitos e teoria) OU resolucao_problemas (como resolver)
-- soft_skill → habilidades_pessoais
-- hard_skill → qualificacoes (certificações, ferramentas)

-- Exemplos de cada nova categoria:
-- conhecimento: "Explique o que é Git", "Qual a diferença entre herança e composição?"
-- experiencia: "Conte sobre uma vez que você liderou um projeto", "Descreva um conflito que você resolveu"
-- resolucao_problemas: "Como você abordaria o design de uma API?", "Como você priorizaria estas demandas?"
-- habilidades_pessoais: "Como você dá feedback?", "Como você trabalha em equipe?"
-- qualificacoes: "Quais ferramentas de CRM você domina?", "Você tem certificação em X?"

SELECT
  categoria AS categoria_antiga,
  COUNT(*) as total,
  STRING_AGG(DISTINCT texto, ' | ') as exemplos
FROM perguntas_templates
WHERE deleted_at IS NULL
GROUP BY categoria
ORDER BY total DESC;
