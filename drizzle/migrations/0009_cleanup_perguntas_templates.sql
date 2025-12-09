-- Migração: Limpeza e consolidação da tabela perguntas_templates
-- Remove colunas obsoletas após confirmar migração dos dados

-- 1. Verificar se dados foram migrados (segurança)
DO $$
DECLARE
    perguntas_apenas_antigas INTEGER;
BEGIN
    -- Conta perguntas que TÊM dados nas antigas mas NÃO nas novas
    SELECT COUNT(*) INTO perguntas_apenas_antigas
    FROM perguntas_templates
    WHERE deleted_at IS NULL
      AND (cargo IS NOT NULL OR nivel IS NOT NULL)
      AND (cargos IS NULL OR cargos::text = '[]')
      AND (niveis IS NULL OR niveis::text = '[]');

    IF perguntas_apenas_antigas > 0 THEN
        RAISE EXCEPTION 'ATENÇÃO: % perguntas ainda precisam ser migradas!', perguntas_apenas_antigas;
    END IF;

    RAISE NOTICE '✅ Verificação OK: Todos os dados foram migrados';
END $$;

-- 2. Remover colunas obsoletas
ALTER TABLE "perguntas_templates" DROP COLUMN IF EXISTS "cargo";
ALTER TABLE "perguntas_templates" DROP COLUMN IF EXISTS "nivel";

-- 3. Garantir constraints nas novas colunas
-- cargos e niveis devem ter default '[]'
ALTER TABLE "perguntas_templates" ALTER COLUMN "cargos" SET DEFAULT '[]'::jsonb;
ALTER TABLE "perguntas_templates" ALTER COLUMN "niveis" SET DEFAULT '[]'::jsonb;

-- Atualizar colunas NULL para arrays vazios
UPDATE "perguntas_templates"
SET "cargos" = '[]'::jsonb
WHERE "cargos" IS NULL;

UPDATE "perguntas_templates"
SET "niveis" = '[]'::jsonb
WHERE "niveis" IS NULL;

-- Tornar NOT NULL (agora que não há nulls)
ALTER TABLE "perguntas_templates" ALTER COLUMN "cargos" SET NOT NULL;
ALTER TABLE "perguntas_templates" ALTER COLUMN "niveis" SET NOT NULL;

-- 4. Garantir que tags também não seja null
UPDATE "perguntas_templates"
SET "tags" = '[]'::jsonb
WHERE "tags" IS NULL;

ALTER TABLE "perguntas_templates" ALTER COLUMN "tags" SET NOT NULL;

-- Comentário na tabela
COMMENT ON TABLE "perguntas_templates" IS 'Banco de perguntas reutilizáveis com sistema de tags flexível. Perguntas podem ter múltiplos cargos/níveis ou nenhum (universal).';
COMMENT ON COLUMN "perguntas_templates"."cargos" IS 'Array de cargos para os quais a pergunta é relevante. Vazio = universal';
COMMENT ON COLUMN "perguntas_templates"."niveis" IS 'Array de níveis (junior, pleno, senior, especialista). Vazio = todos';
COMMENT ON COLUMN "perguntas_templates"."is_padrao" IS 'Se true, é uma pergunta padrão do sistema (fornecida pela plataforma)';
