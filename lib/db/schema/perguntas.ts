import { pgTable, text, timestamp, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { entrevistas } from "./entrevistas";

/**
 * Tabela de perguntas
 */
export const perguntas = pgTable("perguntas", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamento
  entrevistaId: uuid("entrevista_id")
    .notNull()
    .references(() => entrevistas.id, { onDelete: "cascade" }),

  // Dados da pergunta
  texto: text("texto").notNull(),
  ordem: integer("ordem").notNull().default(0),

  // Tipo de resposta
  tipo: text("tipo").notNull().default("texto"), // texto, video, audio, multipla_escolha

  // Configurações
  obrigatoria: text("obrigatoria").notNull().default("true"),
  tempoMaximo: integer("tempo_maximo"), // segundos
  pontuacaoMaxima: integer("pontuacao_maxima").default(100),

  // Para múltipla escolha
  opcoes: jsonb("opcoes").$type<{
    valor: string;
    texto: string;
    pontos?: number;
  }[]>(),

  // Critérios de avaliação (para IA)
  criteriosAvaliacao: jsonb("criterios_avaliacao").$type<{
    palavrasChave?: string[];
    topicos?: string[];
    competencias?: string[];
    pesoNota?: number;
  }>(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
});

export type Pergunta = typeof perguntas.$inferSelect;
export type NewPergunta = typeof perguntas.$inferInsert;
