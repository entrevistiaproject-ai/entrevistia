-- Migration: Simplificar perguntas_templates
-- Mudança: cargos[] -> cargo (único), niveis[] -> nivel (único)
-- Nova tabela: perguntas_ocultas para ocultar perguntas padrão por usuário

-- 1. Adicionar novas colunas (cargo e nivel únicos)
ALTER TABLE perguntas_templates ADD COLUMN IF NOT EXISTS cargo TEXT;
ALTER TABLE perguntas_templates ADD COLUMN IF NOT EXISTS nivel TEXT;

-- 2. Migrar dados: pegar o primeiro valor de cada array
UPDATE perguntas_templates
SET
  cargo = COALESCE(cargos->>0, 'Geral'),
  nivel = COALESCE(niveis->>0, 'pleno')
WHERE cargo IS NULL OR nivel IS NULL;

-- 3. Tornar colunas NOT NULL
ALTER TABLE perguntas_templates ALTER COLUMN cargo SET NOT NULL;
ALTER TABLE perguntas_templates ALTER COLUMN nivel SET NOT NULL;

-- 4. Remover colunas antigas (arrays)
ALTER TABLE perguntas_templates DROP COLUMN IF EXISTS cargos;
ALTER TABLE perguntas_templates DROP COLUMN IF EXISTS niveis;

-- 5. Remover colunas de metadados não mais necessárias
ALTER TABLE perguntas_templates DROP COLUMN IF EXISTS metadados;
ALTER TABLE perguntas_templates DROP COLUMN IF EXISTS tags;

-- 6. Remover coluna categoria_antiga se existir (da migration anterior)
ALTER TABLE perguntas_templates DROP COLUMN IF EXISTS categoria_antiga;

-- 7. Remover constraint antiga de categoria se existir
ALTER TABLE perguntas_templates DROP CONSTRAINT IF EXISTS perguntas_templates_categoria_check;

-- 8. Criar tabela de perguntas ocultas
CREATE TABLE IF NOT EXISTS perguntas_ocultas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pergunta_id UUID NOT NULL REFERENCES perguntas_templates(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,

  -- Garantir que cada usuário só pode ocultar uma pergunta uma vez
  UNIQUE(user_id, pergunta_id)
);

-- 9. Criar índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_perguntas_ocultas_user_id ON perguntas_ocultas(user_id);

-- 10. Adicionar comentários
COMMENT ON TABLE perguntas_ocultas IS 'Perguntas padrão ocultadas por cada usuário';
COMMENT ON COLUMN perguntas_templates.cargo IS 'Cargo específico para esta pergunta (ex: Desenvolvedor, Advogado)';
COMMENT ON COLUMN perguntas_templates.nivel IS 'Nível específico para esta pergunta (ex: junior, pleno, senior)';
