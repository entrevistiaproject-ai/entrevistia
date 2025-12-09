-- Migração: Torna colunas antigas cargo/nivel nullable
-- Necessário para permitir perguntas universais no novo sistema

-- Tornar cargo nullable
ALTER TABLE "perguntas_templates" ALTER COLUMN "cargo" DROP NOT NULL;

-- Tornar nivel nullable
ALTER TABLE "perguntas_templates" ALTER COLUMN "nivel" DROP NOT NULL;

-- Nota: As colunas antigas agora são opcionais.
-- Elas ainda existem para retrocompatibilidade, mas não são mais obrigatórias.
-- O novo sistema usa as colunas 'cargos' (array) e 'niveis' (array).
