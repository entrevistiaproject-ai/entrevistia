-- Migração: Sistema flexível de tags para perguntas_templates
-- Remove campos cargo/nivel únicos e adiciona arrays + metadados

-- 1. Adicionar novas colunas como JSONB
ALTER TABLE "perguntas_templates" ADD COLUMN IF NOT EXISTS "cargos" jsonb DEFAULT '[]'::jsonb;
ALTER TABLE "perguntas_templates" ADD COLUMN IF NOT EXISTS "niveis" jsonb DEFAULT '[]'::jsonb;
ALTER TABLE "perguntas_templates" ADD COLUMN IF NOT EXISTS "metadados" jsonb;

-- 2. Migrar dados existentes das colunas antigas para as novas
-- Converte cargo único em array de cargos
UPDATE "perguntas_templates"
SET "cargos" = jsonb_build_array("cargo")
WHERE "cargo" IS NOT NULL AND "cargo" != '';

-- Converte nivel único em array de níveis
UPDATE "perguntas_templates"
SET "niveis" = jsonb_build_array("nivel")
WHERE "nivel" IS NOT NULL AND "nivel" != '';

-- 3. Tornar competencia nullable (opcional para perguntas genéricas)
ALTER TABLE "perguntas_templates" ALTER COLUMN "competencia" DROP NOT NULL;

-- 4. Garantir que tags tenha valor default
UPDATE "perguntas_templates"
SET "tags" = '[]'::jsonb
WHERE "tags" IS NULL;

ALTER TABLE "perguntas_templates" ALTER COLUMN "tags" SET DEFAULT '[]'::jsonb;

-- 5. Remover colunas antigas (opcional - comentado por segurança)
-- Descomente essas linhas após confirmar que a migração funcionou
-- ALTER TABLE "perguntas_templates" DROP COLUMN IF EXISTS "cargo";
-- ALTER TABLE "perguntas_templates" DROP COLUMN IF EXISTS "nivel";

-- Nota: As colunas cargo e nivel antigas foram mantidas por segurança.
-- Após validar que o novo sistema está funcionando, execute manualmente:
-- ALTER TABLE "perguntas_templates" DROP COLUMN "cargo";
-- ALTER TABLE "perguntas_templates" DROP COLUMN "nivel";
