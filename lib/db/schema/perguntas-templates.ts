import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Tabela de templates de perguntas
 * Banco de perguntas que podem ser reutilizadas em várias entrevistas
 */
export const perguntasTemplates = pgTable("perguntas_templates", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamento (null = pergunta padrão do sistema)
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),

  // Dados da pergunta
  texto: text("texto").notNull(),
  cargo: text("cargo").notNull(), // Ex: "Advogado", "Desenvolvedor"
  nivel: text("nivel").notNull(), // junior, pleno, senior

  // Categoria da competência avaliada
  categoria: text("categoria").notNull(), // tecnica, comportamental, soft_skill, hard_skill
  competencia: text("competencia").notNull(), // Ex: "Direito Civil", "Comunicação", "Liderança"

  // Tipo de pergunta
  tipo: text("tipo").notNull().default("texto"), // texto, video, audio

  // Se é uma pergunta padrão do sistema (fornecida pela plataforma)
  isPadrao: boolean("is_padrao").default(false).notNull(),

  // Critérios de avaliação esperados
  criteriosAvaliacao: jsonb("criterios_avaliacao").$type<{
    palavrasChave?: string[];
    topicos?: string[];
    competenciasEsperadas?: string[];
    aspectosAvaliar?: string[];
  }>(),

  // Tags para facilitar busca
  tags: jsonb("tags").$type<string[]>(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
});

export type PerguntaTemplate = typeof perguntasTemplates.$inferSelect;
export type NewPerguntaTemplate = typeof perguntasTemplates.$inferInsert;
