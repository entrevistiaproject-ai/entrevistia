import { pgTable, uuid, timestamp, text, boolean, primaryKey } from "drizzle-orm/pg-core";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";

/**
 * Tabela de associação entre candidatos e entrevistas
 * Garante que cada candidato responda apenas uma vez cada entrevista
 * e permite rastrear o status de participação
 */
export const candidatoEntrevistas = pgTable(
  "candidato_entrevistas",
  {
    candidatoId: uuid("candidato_id")
      .notNull()
      .references(() => candidatos.id, { onDelete: "cascade" }),
    entrevistaId: uuid("entrevista_id")
      .notNull()
      .references(() => entrevistas.id, { onDelete: "cascade" }),

    // Status da participação
    status: text("status").default("invited").notNull(), // 'invited', 'in_progress', 'completed'

    // Controle de tentativas
    iniciouEm: timestamp("iniciou_em", { mode: "date" }),
    completouEm: timestamp("completou_em", { mode: "date" }),

    // Permite reenvio de convite mesmo se já participou
    podeRefazer: boolean("pode_refazer").default(false).notNull(),

    // Auditoria
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.candidatoId, table.entrevistaId] }),
    };
  }
);

export type CandidatoEntrevista = typeof candidatoEntrevistas.$inferSelect;
export type NewCandidatoEntrevista = typeof candidatoEntrevistas.$inferInsert;
