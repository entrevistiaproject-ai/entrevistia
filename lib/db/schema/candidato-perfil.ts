import { pgTable, text, timestamp, uuid, integer, boolean, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { candidatos } from "./candidatos";

// Enums
export const nivelExperienciaEnum = pgEnum("nivel_experiencia", [
  "estagiario",
  "junior",
  "pleno",
  "senior",
  "especialista",
  "gerente",
  "diretor",
  "c_level",
]);

export const nivelFormacaoEnum = pgEnum("nivel_formacao", [
  "ensino_medio",
  "tecnico",
  "graduacao",
  "pos_graduacao",
  "mba",
  "mestrado",
  "doutorado",
]);

export const nivelIdiomaEnum = pgEnum("nivel_idioma", [
  "basico",
  "intermediario",
  "avancado",
  "fluente",
  "nativo",
]);

export const nivelSkillEnum = pgEnum("nivel_skill", [
  "basico",
  "intermediario",
  "avancado",
  "expert",
]);

export const statusCandidatoEnum = pgEnum("status_candidato", [
  "ativo",
  "em_processo",
  "contratado",
  "indisponivel",
  "blacklist",
]);

export const preferenciaTrabalhoEnum = pgEnum("preferencia_trabalho", [
  "remoto",
  "hibrido",
  "presencial",
  "indiferente",
]);

/**
 * Experiências profissionais do candidato
 */
export const candidatoExperiencias = pgTable("candidato_experiencias", {
  id: uuid("id").defaultRandom().primaryKey(),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),

  // Dados da experiência
  cargo: text("cargo").notNull(),
  empresa: text("empresa").notNull(),
  localidade: text("localidade"), // Cidade, Estado, País
  descricao: text("descricao"),

  // Período
  dataInicio: timestamp("data_inicio", { mode: "date" }).notNull(),
  dataFim: timestamp("data_fim", { mode: "date" }), // null = atual
  atual: boolean("atual").default(false).notNull(),

  // Nível da posição
  nivel: nivelExperienciaEnum("nivel"),

  // Metadados de IA
  skillsExtraidas: jsonb("skills_extraidas").$type<string[]>(), // Skills identificadas pela IA
  confiancaIA: integer("confianca_ia"), // 0-100, confiança da extração

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Formação acadêmica do candidato
 */
export const candidatoFormacoes = pgTable("candidato_formacoes", {
  id: uuid("id").defaultRandom().primaryKey(),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),

  // Dados da formação
  instituicao: text("instituicao").notNull(),
  curso: text("curso").notNull(),
  area: text("area"), // Área de estudo (ex: Ciência da Computação, Administração)
  nivel: nivelFormacaoEnum("nivel").notNull(),

  // Período
  dataInicio: timestamp("data_inicio", { mode: "date" }),
  dataFim: timestamp("data_fim", { mode: "date" }),
  emAndamento: boolean("em_andamento").default(false).notNull(),

  // Detalhes adicionais
  descricao: text("descricao"),

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Skills/Competências do candidato
 */
export const candidatoSkills = pgTable("candidato_skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),

  // Dados da skill
  nome: text("nome").notNull(),
  categoria: text("categoria"), // Técnica, Comportamental, Idioma, Ferramenta, etc.
  nivel: nivelSkillEnum("nivel"),

  // Anos de experiência com a skill
  anosExperiencia: integer("anos_experiencia"),

  // Origem e validação
  origem: text("origem").default("manual").notNull(), // manual, linkedin, cv, ia
  validado: boolean("validado").default(false).notNull(), // Validado por teste/prova
  confiancaIA: integer("confianca_ia"), // 0-100, se extraído por IA

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Idiomas do candidato
 */
export const candidatoIdiomas = pgTable("candidato_idiomas", {
  id: uuid("id").defaultRandom().primaryKey(),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),

  // Dados do idioma
  idioma: text("idioma").notNull(), // Português, Inglês, Espanhol, etc.
  nivel: nivelIdiomaEnum("nivel").notNull(),

  // Certificações (opcional)
  certificacao: text("certificacao"), // TOEFL, IELTS, DELE, etc.
  pontuacao: text("pontuacao"), // Score da certificação

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Certificações do candidato
 */
export const candidatoCertificacoes = pgTable("candidato_certificacoes", {
  id: uuid("id").defaultRandom().primaryKey(),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),

  // Dados da certificação
  nome: text("nome").notNull(),
  instituicao: text("instituicao").notNull(),
  credencialId: text("credencial_id"), // ID/número da certificação
  urlCredencial: text("url_credencial"), // Link para verificação

  // Datas
  dataEmissao: timestamp("data_emissao", { mode: "date" }),
  dataExpiracao: timestamp("data_expiracao", { mode: "date" }), // null = não expira

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tags internas do recrutador sobre o candidato
 */
export const candidatoTags = pgTable("candidato_tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),

  // Dados da tag
  nome: text("nome").notNull(),
  cor: text("cor").default("#6366f1").notNull(), // Cor hex para exibição

  // Quem criou
  criadoPor: uuid("criado_por").notNull(), // userId do recrutador

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Preferências e dados adicionais do candidato
 * Tabela separada para não poluir a tabela principal
 */
export const candidatoPreferencias = pgTable("candidato_preferencias", {
  id: uuid("id").defaultRandom().primaryKey(),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" })
    .unique(), // 1:1 com candidato

  // Status do candidato
  status: statusCandidatoEnum("status").default("ativo").notNull(),

  // Preferências de trabalho
  preferenciaTrabalho: preferenciaTrabalhoEnum("preferencia_trabalho"),
  aceitaViagem: boolean("aceita_viagem"),
  aceitaMudanca: boolean("aceita_mudanca"),

  // Pretensão salarial
  pretensaoSalarialMin: integer("pretensao_salarial_min"),
  pretensaoSalarialMax: integer("pretensao_salarial_max"),
  moedaSalario: text("moeda_salario").default("BRL"),

  // Disponibilidade
  disponibilidadeInicio: timestamp("disponibilidade_inicio", { mode: "date" }),
  disponibilidadeImediata: boolean("disponibilidade_imediata").default(false),

  // Localização atual
  cidade: text("cidade"),
  estado: text("estado"),
  pais: text("pais").default("Brasil"),

  // Foto de perfil
  fotoUrl: text("foto_url"),

  // Resumo profissional (about me)
  resumoProfissional: text("resumo_profissional"),

  // Dados do LinkedIn (se importado)
  linkedinData: jsonb("linkedin_data"), // JSON com dados brutos do LinkedIn
  linkedinImportadoEm: timestamp("linkedin_importado_em", { mode: "date" }),

  // Dados do CV (se parseado)
  cvUrl: text("cv_url"), // URL do arquivo no Vercel Blob
  cvNomeArquivo: text("cv_nome_arquivo"),
  cvParseadoEm: timestamp("cv_parseado_em", { mode: "date" }),
  cvDadosExtraidos: jsonb("cv_dados_extraidos"), // JSON com dados extraídos

  // Completude do perfil (0-100)
  completudePerfil: integer("completude_perfil").default(0),

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Types
export type CandidatoExperiencia = typeof candidatoExperiencias.$inferSelect;
export type NewCandidatoExperiencia = typeof candidatoExperiencias.$inferInsert;

export type CandidatoFormacao = typeof candidatoFormacoes.$inferSelect;
export type NewCandidatoFormacao = typeof candidatoFormacoes.$inferInsert;

export type CandidatoSkill = typeof candidatoSkills.$inferSelect;
export type NewCandidatoSkill = typeof candidatoSkills.$inferInsert;

export type CandidatoIdioma = typeof candidatoIdiomas.$inferSelect;
export type NewCandidatoIdioma = typeof candidatoIdiomas.$inferInsert;

export type CandidatoCertificacao = typeof candidatoCertificacoes.$inferSelect;
export type NewCandidatoCertificacao = typeof candidatoCertificacoes.$inferInsert;

export type CandidatoTag = typeof candidatoTags.$inferSelect;
export type NewCandidatoTag = typeof candidatoTags.$inferInsert;

export type CandidatoPreferencias = typeof candidatoPreferencias.$inferSelect;
export type NewCandidatoPreferencias = typeof candidatoPreferencias.$inferInsert;
