import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

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

  // Cargo e nível específicos (simplificado)
  cargo: text("cargo").notNull(), // Ex: "Desenvolvedor", "Advogado"
  nivel: text("nivel").notNull(), // Ex: "junior", "pleno", "senior"

  // Categoria da competência avaliada
  categoria: text("categoria").notNull(), // tecnica, comportamental, soft_skill, hard_skill
  competencia: text("competencia"), // Ex: "Direito Civil", "Comunicação"

  // Tipo de pergunta
  tipo: text("tipo").notNull().default("texto"), // texto, video, audio

  // Se é uma pergunta padrão do sistema (fornecida pela plataforma)
  isPadrao: boolean("is_padrao").default(false).notNull(),

  // Critérios de avaliação esperados
  criteriosAvaliacao: jsonb("criterios_avaliacao").$type<{
    palavrasChave?: string[];
    topicos?: string[];
    aspectosAvaliar?: string[];
  }>(),

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
