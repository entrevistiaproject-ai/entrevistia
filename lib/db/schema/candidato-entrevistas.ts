import { pgTable, uuid, timestamp, text, boolean, real, jsonb } from "drizzle-orm/pg-core";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";

/**
 * Interface para avaliação de competência individual
 */
export interface CompetenciaAvaliada {
  nome: string;
  categoria: "Experiência" | "Comunicação" | "Resolução de Problemas" | "Motivação" | "Fit com a Vaga";
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

  // Convite e prazo
  conviteEnviadoEm: timestamp("convite_enviado_em", { mode: "date" }),
  prazoResposta: timestamp("prazo_resposta", { mode: "date" }), // Prazo para o candidato responder

  // Permite reenvio de convite mesmo se já participou
  podeRefazer: boolean("pode_refazer").default(false).notNull(),

  // Avaliação da IA
  notaGeral: real("nota_geral"), // Nota geral de 0 a 100
  compatibilidadeVaga: real("compatibilidade_vaga"), // Compatibilidade com a vaga de 0 a 100
  recomendacao: text("recomendacao"), // 'recomendado', 'recomendado_com_ressalvas', 'nao_recomendado'
  resumoGeral: text("resumo_geral"), // Resumo executivo da avaliação
  competencias: jsonb("competencias").$type<CompetenciaAvaliada[]>(), // Avaliação detalhada por competência
  avaliadoEm: timestamp("avaliado_em", { mode: "date" }),

  // Decisão manual do recrutador (separada da recomendação da IA)
  decisaoRecrutador: text("decisao_recrutador"), // 'aprovado', 'reprovado', null (pendente)
  decisaoRecrutadorEm: timestamp("decisao_recrutador_em", { mode: "date" }),
  decisaoRecrutadorObservacao: text("decisao_recrutador_observacao"), // Observação opcional do recrutador

  // Email de encerramento (quando não aprovado)
  emailEncerramentoEnviadoEm: timestamp("email_encerramento_enviado_em", { mode: "date" }),

  // Arquivamento (para limpeza visual e workflow concluído)
  arquivadoEm: timestamp("arquivado_em", { mode: "date" }),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type CandidatoEntrevista = typeof candidatoEntrevistas.$inferSelect;
export type NewCandidatoEntrevista = typeof candidatoEntrevistas.$inferInsert;
