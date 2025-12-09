-- Migração: Refatoração de Categorias para sistema mais intuitivo
--
-- ANTIGAS (4 categorias com sobreposição):
--   - tecnica, comportamental, soft_skill, hard_skill
--
-- NOVAS (5 categorias bem divididas):
--   - conhecimento: Testa o que a pessoa SABE (conceitos, teoria)
--   - experiencia: Testa o que a pessoa JÁ FEZ (casos passados, STAR)
--   - resolucao_problemas: Testa COMO a pessoa pensa (hipotéticos, estratégia)
--   - habilidades_pessoais: Testa SOFT SKILLS (comunicação, liderança)
--   - qualificacoes: Testa CERTIFICAÇÕES (ferramentas, formação)

-- 1. Criar função de mapeamento inteligente
CREATE OR REPLACE FUNCTION mapear_categoria_nova(
  categoria_antiga TEXT,
  texto_pergunta TEXT
) RETURNS TEXT AS $$
BEGIN
  CASE categoria_antiga
    -- COMPORTAMENTAL → EXPERIENCIA (perguntas sobre o passado)
    WHEN 'comportamental' THEN
      RETURN 'experiencia';

    -- SOFT_SKILL → HABILIDADES_PESSOAIS
    WHEN 'soft_skill' THEN
      RETURN 'habilidades_pessoais';

    -- HARD_SKILL → QUALIFICACOES
    WHEN 'hard_skill' THEN
      RETURN 'qualificacoes';

    -- TECNICA → precisa análise do texto
    WHEN 'tecnica' THEN
      -- Se menciona "como você", "qual sua estratégia" = resolução de problemas
      IF texto_pergunta ~* 'como (você|voce)|qual sua (estratégia|estrategia|abordagem)|descreva sua (metodologia|processo)' THEN
        RETURN 'resolucao_problemas';
      -- Se menciona "explique", "o que é", "diferença" = conhecimento
      ELSIF texto_pergunta ~* 'explique|o que (é|e)|qual.*diferença|defin|conceito' THEN
        RETURN 'conhecimento';
      -- Se menciona "ferramentas", "experiência com" = qualificações
      ELSIF texto_pergunta ~* 'ferrament|experiência com|experiencia com|domina|utiliza|já (usou|utilizou)' THEN
        RETURN 'qualificacoes';
      -- Default para técnica = conhecimento
      ELSE
        RETURN 'conhecimento';
      END IF;

    ELSE
      -- Fallback: mantém a categoria antiga se não reconhecida
      RETURN categoria_antiga;
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- 2. Adicionar nova coluna temporária
ALTER TABLE perguntas_templates ADD COLUMN IF NOT EXISTS categoria_nova TEXT;

-- 3. Migrar dados usando a função de mapeamento
UPDATE perguntas_templates
SET categoria_nova = mapear_categoria_nova(categoria, texto);

-- 4. Verificar resultado da migração
DO $$
DECLARE
  total_registros INTEGER;
  registros_migrados INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_registros FROM perguntas_templates WHERE deleted_at IS NULL;
  SELECT COUNT(*) INTO registros_migrados FROM perguntas_templates WHERE deleted_at IS NULL AND categoria_nova IS NOT NULL;

  RAISE NOTICE '📊 Migração de categorias:';
  RAISE NOTICE '   Total de perguntas: %', total_registros;
  RAISE NOTICE '   Migradas: %', registros_migrados;

  IF total_registros != registros_migrados THEN
    RAISE EXCEPTION 'ERRO: % perguntas não foram migradas!', (total_registros - registros_migrados);
  END IF;
END $$;

-- 5. Renomear colunas (swap)
ALTER TABLE perguntas_templates RENAME COLUMN categoria TO categoria_antiga;
ALTER TABLE perguntas_templates RENAME COLUMN categoria_nova TO categoria;

-- 6. Adicionar constraint de valores válidos
ALTER TABLE perguntas_templates DROP CONSTRAINT IF EXISTS perguntas_templates_categoria_check;
ALTER TABLE perguntas_templates ADD CONSTRAINT perguntas_templates_categoria_check
  CHECK (categoria IN ('conhecimento', 'experiencia', 'resolucao_problemas', 'habilidades_pessoais', 'qualificacoes'));

-- 7. Remover coluna antiga após confirmação
-- ALTER TABLE perguntas_templates DROP COLUMN IF EXISTS categoria_antiga;
-- (comentado por segurança - rodar manualmente após validar)

-- 8. Remover função temporária
DROP FUNCTION IF EXISTS mapear_categoria_nova(TEXT, TEXT);

-- 9. Adicionar comentários explicativos
COMMENT ON COLUMN perguntas_templates.categoria IS
  'Categoria da pergunta: conhecimento (sabe), experiencia (fez), resolucao_problemas (pensa), habilidades_pessoais (soft skills), qualificacoes (certificações)';

-- 10. Mostrar estatísticas da migração
DO $$
DECLARE
  rec RECORD;
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '📊 DISTRIBUIÇÃO POR NOVA CATEGORIA:';
  RAISE NOTICE '';

  FOR rec IN
    SELECT categoria, COUNT(*) as total
    FROM perguntas_templates
    WHERE deleted_at IS NULL
    GROUP BY categoria
    ORDER BY total DESC
  LOOP
    RAISE NOTICE '   % : % perguntas', RPAD(rec.categoria, 25), rec.total;
  END LOOP;

  RAISE NOTICE '';
END $$;
