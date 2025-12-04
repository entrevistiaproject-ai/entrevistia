import { pgTable, text, timestamp, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { perguntas } from "./perguntas";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";

/**
 * Tabela de respostas
 * Contém dados sensíveis - protegido pela LGPD
 */
export const respostas = pgTable("respostas", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamentos
  perguntaId: uuid("pergunta_id")
    .notNull()
    .references(() => perguntas.id, { onDelete: "cascade" }),
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),
  entrevistaId: uuid("entrevista_id")
    .notNull()
    .references(() => entrevistas.id, { onDelete: "cascade" }),

  // Resposta
  textoResposta: text("texto_resposta"),
  arquivoUrl: text("arquivo_url"), // URL do áudio/vídeo
  arquivoTipo: text("arquivo_tipo"), // audio/mp3, video/webm, etc
  transcricao: text("transcricao"), // Transcrição automática do áudio/vídeo

  // Avaliação
  pontuacao: integer("pontuacao"),
  nota: integer("nota"), // 0-100
  feedback: text("feedback"), // Feedback gerado pela IA

  // Análise da IA
  analiseIA: jsonb("analise_ia").$type<{
    sentimento?: "positivo" | "neutro" | "negativo";
    confianca?: number; // 0-100
    palavrasChave?: string[];
    topicosAbordados?: string[];
    competenciasIdentificadas?: string[];
    pontosFortess?: string[];
    pontosAMelhorar?: string[];
  }>(),

  // Metadados
  tempoResposta: integer("tempo_resposta"), // segundos
  tentativas: integer("tentativas").default(1),

  // Auditoria e LGPD
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),

  // Rastreamento
  ipResposta: text("ip_resposta"),
  userAgent: text("user_agent"),
});

export type Resposta = typeof respostas.$inferSelect;
export type NewResposta = typeof respostas.$inferInsert;
