import { pgTable, text, timestamp, uuid, jsonb, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { candidatos } from "./candidatos";

/**
 * Tabela de entrevistas
 */
export const entrevistas = pgTable("entrevistas", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamentos
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  candidatoId: uuid("candidato_id")
    .references(() => candidatos.id, { onDelete: "set null" }),

  // Dados da entrevista
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  cargo: text("cargo"),
  empresa: text("empresa"),

  // Status
  status: text("status").notNull().default("rascunho"), // rascunho, publicada, em_andamento, concluida, cancelada

  // Configurações
  duracao: integer("duracao"), // minutos
  tempoResposta: integer("tempo_resposta"), // segundos por pergunta
  permitirRevisao: text("permitir_revisao").default("false").notNull(), // true/false como string

  // Link público
  slug: text("slug").unique(), // URL amigável
  linkPublico: text("link_publico"),
  expiracaoLink: timestamp("expiracao_link", { mode: "date" }),

  // Configurações de privacidade
  anonimizarDados: text("anonimizar_dados").default("false").notNull(),
  periodoRetencao: integer("periodo_retencao").default(90), // dias para manter dados

  // Resultados
  notaTotal: integer("nota_total"),
  aprovado: text("aprovado"), // true/false/null como string
  feedback: text("feedback"),

  // Metadados
  configuracoes: jsonb("configuracoes").$type<{
    emailNotificacao?: boolean;
    compartilharResultados?: boolean;
    requisitosMinimos?: {
      nota?: number;
      tempoMaximo?: number;
    };
  }>(),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  iniciadaEm: timestamp("iniciada_em", { mode: "date" }),
  concluidaEm: timestamp("concluida_em", { mode: "date" }),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
});

export type Entrevista = typeof entrevistas.$inferSelect;
export type NewEntrevista = typeof entrevistas.$inferInsert;
