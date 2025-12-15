-- Adiciona campo area para organização de perguntas por área profissional
-- E cria tabela de preferências de cargos do usuário

-- 1. Criar enum de áreas profissionais
DO $$ BEGIN
    CREATE TYPE area_profissional AS ENUM (
        'tecnologia',
        'juridico',
        'comercial',
        'varejo',
        'administrativo'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Adicionar coluna area na tabela perguntas_templates
ALTER TABLE perguntas_templates
ADD COLUMN IF NOT EXISTS area area_profissional;

-- 3. Renomear "Gerente de Projetos" para "Gerente de Projetos de TI"
UPDATE perguntas_templates
SET cargo = 'Gerente de Projetos de TI'
WHERE cargo = 'Gerente de Projetos';

-- 4. Popular o campo area baseado no cargo existente
UPDATE perguntas_templates SET area = 'tecnologia' WHERE cargo IN (
    'Desenvolvedor Front-End',
    'Desenvolvedor Back-End',
    'QA / Testes',
    'Suporte Técnico / HelpDesk',
    'Cientista de Dados',
    'Coordenador de Tecnologia',
    'Gerente de Projetos de TI'
);

UPDATE perguntas_templates SET area = 'juridico' WHERE cargo IN (
    'Advogado Trabalhista',
    'Advogado Civil',
    'Advogado Criminal',
    'Advogado Tributário',
    'Analista Jurídico / Paralegal'
);

UPDATE perguntas_templates SET area = 'comercial' WHERE cargo IN (
    'Vendedor / Comercial',
    'Marketing',
    'Atendimento ao Cliente'
);

UPDATE perguntas_templates SET area = 'varejo' WHERE cargo IN (
    'Operador de Caixa',
    'Repositor / Auxiliar de Loja',
    'Fiscal de Prevenção e Perdas',
    'Atendente / Vendedor de Loja',
    'Supervisor / Líder de Loja'
);

UPDATE perguntas_templates SET area = 'administrativo' WHERE cargo IN (
    'Administrativo',
    'Analista Financeiro',
    'RH / Recursos Humanos'
);

-- 5. Criar tabela de preferências de cargos do usuário
CREATE TABLE IF NOT EXISTS user_cargo_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    cargos_visiveis JSONB DEFAULT '[]'::jsonb,
    onboarding_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 6. Índice para busca rápida por usuário
CREATE INDEX IF NOT EXISTS idx_user_cargo_preferences_user_id
ON user_cargo_preferences (user_id);

-- 7. Comentários para documentação
COMMENT ON TABLE user_cargo_preferences IS 'Preferências de cargos visíveis no banco de perguntas padrão para cada usuário';
COMMENT ON COLUMN user_cargo_preferences.cargos_visiveis IS 'Array JSON com nomes dos cargos que o usuário deseja visualizar';
COMMENT ON COLUMN user_cargo_preferences.onboarding_completed IS 'Se o usuário completou o onboarding de seleção de áreas';
COMMENT ON COLUMN perguntas_templates.area IS 'Área profissional da pergunta: tecnologia, juridico, comercial, varejo ou administrativo';
