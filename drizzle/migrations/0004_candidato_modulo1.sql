-- Migration: Módulo 1 - Página do Candidato
-- Adiciona tabelas para perfil expandido do candidato, magic links e preferências

-- Enums
DO $$ BEGIN
  CREATE TYPE "nivel_experiencia" AS ENUM ('estagiario', 'junior', 'pleno', 'senior', 'especialista', 'gerente', 'diretor', 'c_level');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "nivel_formacao" AS ENUM ('ensino_medio', 'tecnico', 'graduacao', 'pos_graduacao', 'mba', 'mestrado', 'doutorado');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "nivel_idioma" AS ENUM ('basico', 'intermediario', 'avancado', 'fluente', 'nativo');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "nivel_skill" AS ENUM ('basico', 'intermediario', 'avancado', 'expert');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "status_candidato" AS ENUM ('ativo', 'em_processo', 'contratado', 'indisponivel', 'blacklist');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "preferencia_trabalho" AS ENUM ('remoto', 'hibrido', 'presencial', 'indiferente');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Magic Links
CREATE TABLE IF NOT EXISTS "magic_links" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" text NOT NULL,
  "token" text NOT NULL UNIQUE,
  "entrevista_id" uuid,
  "candidato_id" uuid,
  "tipo" text NOT NULL DEFAULT 'login',
  "used_at" timestamp,
  "expires_at" timestamp NOT NULL,
  "ip_address" text,
  "user_agent" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Experiências do Candidato
CREATE TABLE IF NOT EXISTS "candidato_experiencias" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "candidato_id" uuid NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "cargo" text NOT NULL,
  "empresa" text NOT NULL,
  "localidade" text,
  "descricao" text,
  "data_inicio" timestamp NOT NULL,
  "data_fim" timestamp,
  "atual" boolean DEFAULT false NOT NULL,
  "nivel" "nivel_experiencia",
  "skills_extraidas" jsonb,
  "confianca_ia" integer,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Formações do Candidato
CREATE TABLE IF NOT EXISTS "candidato_formacoes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "candidato_id" uuid NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "instituicao" text NOT NULL,
  "curso" text NOT NULL,
  "area" text,
  "nivel" "nivel_formacao" NOT NULL,
  "data_inicio" timestamp,
  "data_fim" timestamp,
  "em_andamento" boolean DEFAULT false NOT NULL,
  "descricao" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Skills do Candidato
CREATE TABLE IF NOT EXISTS "candidato_skills" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "candidato_id" uuid NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "nome" text NOT NULL,
  "categoria" text,
  "nivel" "nivel_skill",
  "anos_experiencia" integer,
  "origem" text DEFAULT 'manual' NOT NULL,
  "validado" boolean DEFAULT false NOT NULL,
  "confianca_ia" integer,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Idiomas do Candidato
CREATE TABLE IF NOT EXISTS "candidato_idiomas" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "candidato_id" uuid NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "idioma" text NOT NULL,
  "nivel" "nivel_idioma" NOT NULL,
  "certificacao" text,
  "pontuacao" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Certificações do Candidato
CREATE TABLE IF NOT EXISTS "candidato_certificacoes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "candidato_id" uuid NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "nome" text NOT NULL,
  "instituicao" text NOT NULL,
  "credencial_id" text,
  "url_credencial" text,
  "data_emissao" timestamp,
  "data_expiracao" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Tags do Candidato
CREATE TABLE IF NOT EXISTS "candidato_tags" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "candidato_id" uuid NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE,
  "nome" text NOT NULL,
  "cor" text DEFAULT '#6366f1' NOT NULL,
  "criado_por" uuid NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Preferências do Candidato
CREATE TABLE IF NOT EXISTS "candidato_preferencias" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "candidato_id" uuid NOT NULL REFERENCES "candidatos"("id") ON DELETE CASCADE UNIQUE,
  "status" "status_candidato" DEFAULT 'ativo' NOT NULL,
  "preferencia_trabalho" "preferencia_trabalho",
  "aceita_viagem" boolean,
  "aceita_mudanca" boolean,
  "pretensao_salarial_min" integer,
  "pretensao_salarial_max" integer,
  "moeda_salario" text DEFAULT 'BRL',
  "disponibilidade_inicio" timestamp,
  "disponibilidade_imediata" boolean DEFAULT false,
  "cidade" text,
  "estado" text,
  "pais" text DEFAULT 'Brasil',
  "foto_url" text,
  "resumo_profissional" text,
  "linkedin_data" jsonb,
  "linkedin_importado_em" timestamp,
  "cv_url" text,
  "cv_nome_arquivo" text,
  "cv_parseado_em" timestamp,
  "cv_dados_extraidos" jsonb,
  "completude_perfil" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS "idx_magic_links_token" ON "magic_links" ("token");
CREATE INDEX IF NOT EXISTS "idx_magic_links_email" ON "magic_links" ("email");
CREATE INDEX IF NOT EXISTS "idx_candidato_experiencias_candidato" ON "candidato_experiencias" ("candidato_id");
CREATE INDEX IF NOT EXISTS "idx_candidato_formacoes_candidato" ON "candidato_formacoes" ("candidato_id");
CREATE INDEX IF NOT EXISTS "idx_candidato_skills_candidato" ON "candidato_skills" ("candidato_id");
CREATE INDEX IF NOT EXISTS "idx_candidato_idiomas_candidato" ON "candidato_idiomas" ("candidato_id");
CREATE INDEX IF NOT EXISTS "idx_candidato_certificacoes_candidato" ON "candidato_certificacoes" ("candidato_id");
CREATE INDEX IF NOT EXISTS "idx_candidato_tags_candidato" ON "candidato_tags" ("candidato_id");
CREATE INDEX IF NOT EXISTS "idx_candidato_preferencias_candidato" ON "candidato_preferencias" ("candidato_id");
