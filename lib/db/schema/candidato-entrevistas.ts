import { pgTable, uuid, timestamp, text, boolean, real, jsonb } from "drizzle-orm/pg-core";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";

/**
 * Interface para avaliação de competência individual
 */
export interface CompetenciaAvaliada {
  nome: string;
  categoria: "Técnicas" | "Comunicação" | "Comportamental" | "Trabalho em Equipe" | "Fit Cultural";
  nota: number; // 0-100
  descricao: string;
}

/**
 * Tabela de associação entre candidatos e entrevistas
 * Garante que cada candidato responda apenas uma vez cada entrevista
 * e permite rastrear o status de participação
 */
export const candidatoEntrevistas = pgTable("candidato_entrevistas", {
  id: uuid("id").defaultRandom().primaryKey(),

  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),
  entrevistaId: uuid("entrevista_id")
    .notNull()
    .references(() => entrevistas.id, { onDelete: "cascade" }),

  // Status da participação
  status: text("status").default("em_andamento").notNull(), // 'em_andamento', 'concluida', 'cancelada'

  // Controle de tentativas
  iniciadaEm: timestamp("iniciada_em", { mode: "date" }),
  concluidaEm: timestamp("concluida_em", { mode: "date" }),

  // Permite reenvio de convite mesmo se já participou
  podeRefazer: boolean("pode_refazer").default(false).notNull(),

  // Avaliação da IA
  notaGeral: real("nota_geral"), // Nota de 0 a 10
  recomendacao: text("recomendacao"), // 'recomendado', 'recomendado_com_ressalvas', 'nao_recomendado'
  resumoGeral: text("resumo_geral"), // Resumo executivo da avaliação
  competencias: jsonb("competencias").$type<CompetenciaAvaliada[]>(), // Avaliação detalhada por competência
  avaliadoEm: timestamp("avaliado_em", { mode: "date" }),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type CandidatoEntrevista = typeof candidatoEntrevistas.$inferSelect;
export type NewCandidatoEntrevista = typeof candidatoEntrevistas.$inferInsert;
