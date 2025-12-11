import { pgTable, text, timestamp, uuid, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Tabela de entrevistas
 */
export const entrevistas = pgTable("entrevistas", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamentos
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Dados da entrevista
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  cargo: text("cargo"),
  nivel: text("nivel"), // junior, pleno, senior, especialista, etc.
  empresa: text("empresa"),

  // Status
  status: text("status").notNull().default("active"), // active (ativa), completed (concluída), archived (arquivada)

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
    // Configurações de email de encerramento
    emailEncerramento?: {
      enviarAutomaticamente?: boolean; // Se true, pergunta ao reprovar se quer enviar
      mensagemPersonalizada?: string; // Texto customizado para o email
    };
    // Prazo para resposta do candidato (em horas)
    prazoRespostaHoras?: number; // Padrão: 48 horas
  }>(),

  // === Configurações de Aprovação Automática (por vaga) ===

  // Ativar/desativar aprovação automática para esta vaga
  autoApprovalEnabled: boolean("auto_approval_enabled").default(false).notNull(),

  // Score mínimo para aprovação automática (0-100)
  autoApprovalMinScore: integer("auto_approval_min_score").default(70).notNull(),

  // Também usar compatibilidade com a vaga como critério
  autoApprovalUseCompatibility: boolean("auto_approval_use_compatibility").default(false).notNull(),

  // Compatibilidade mínima com a vaga (0-100)
  autoApprovalMinCompatibility: integer("auto_approval_min_compatibility").default(70).notNull(),

  // Enviar email ao candidato quando for aprovado automaticamente
  autoApprovalNotifyCandidate: boolean("auto_approval_notify_candidate").default(false).notNull(),

  // Mensagem personalizada para enviar ao candidato aprovado
  autoApprovalCandidateMessage: text("auto_approval_candidate_message"),

  // === Configurações de Reprovação Automática (por vaga) ===

  // Ativar/desativar reprovação automática para esta vaga
  autoRejectEnabled: boolean("auto_reject_enabled").default(false).notNull(),

  // Score máximo para reprovação automática (0-100)
  autoRejectMaxScore: integer("auto_reject_max_score").default(30).notNull(),

  // Enviar email ao candidato quando for reprovado automaticamente
  autoRejectNotifyCandidate: boolean("auto_reject_notify_candidate").default(false).notNull(),

  // Mensagem personalizada para enviar ao candidato reprovado
  autoRejectCandidateMessage: text("auto_reject_candidate_message"),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  iniciadaEm: timestamp("iniciada_em", { mode: "date" }),
  concluidaEm: timestamp("concluida_em", { mode: "date" }),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
});

export type Entrevista = typeof entrevistas.$inferSelect;
export type NewEntrevista = typeof entrevistas.$inferInsert;
