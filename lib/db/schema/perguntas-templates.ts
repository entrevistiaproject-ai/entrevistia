import { pgTable, text, timestamp, uuid, boolean, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Enum de áreas profissionais para organização do banco de perguntas
 */
export const areaProfissionalEnum = pgEnum("area_profissional", [
  "tecnologia",
  "juridico",
  "comercial",
  "varejo",
  "administrativo",
  "saude",
  "callcenter",
  "logistica",
  "engenharia",
  "agronegocio",
  "educacao",
  "hotelaria",
  "industria",
  "design",
]);

/**
 * Tabela de templates de perguntas
 * Banco de perguntas reutilizáveis - cada pergunta para 1 cargo e 1 nível específico
 */
export const perguntasTemplates = pgTable("perguntas_templates", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamento (null = pergunta padrão do sistema)
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),

  // Dados da pergunta
  texto: text("texto").notNull(),

  // Área profissional e cargo/nível específicos
  area: areaProfissionalEnum("area"), // Área profissional: tecnologia, juridico, comercial, varejo, administrativo
  cargo: text("cargo").notNull(), // Ex: "Desenvolvedor Front-End", "Advogado Trabalhista"
  nivel: text("nivel").notNull(), // Ex: "junior", "pleno", "senior"

  // Categoria (4 tipos: tecnica, experiencia, comportamental, situacional)
  categoria: text("categoria").notNull(),
  competencia: text("competencia"), // Ex: "React", "Direito Civil", "Liderança"

  // Tipo de pergunta
  tipo: text("tipo").notNull().default("texto"), // texto, video, audio

  // Se é uma pergunta padrão do sistema (fornecida pela plataforma)
  isPadrao: boolean("is_padrao").default(false).notNull(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
});

/**
 * Tabela de perguntas padrão ocultadas pelo usuário
 * Permite que cada usuário oculte perguntas padrão do sistema sem deletá-las
 */
export const perguntasOcultas = pgTable("perguntas_ocultas", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Usuário que ocultou a pergunta
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

  // Pergunta padrão que foi ocultada
  perguntaId: uuid("pergunta_id").notNull().references(() => perguntasTemplates.id, { onDelete: "cascade" }),

  // Quando foi ocultada
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type PerguntaTemplate = typeof perguntasTemplates.$inferSelect;
export type NewPerguntaTemplate = typeof perguntasTemplates.$inferInsert;
export type PerguntaOculta = typeof perguntasOcultas.$inferSelect;
export type NewPerguntaOculta = typeof perguntasOcultas.$inferInsert;
