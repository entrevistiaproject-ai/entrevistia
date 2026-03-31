import { pgTable, uuid, timestamp, text, boolean, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";

// Enums
export const canalMensagemEnum = pgEnum("canal_mensagem", [
  "email",
  "whatsapp",
  "sms",
  "plataforma",
]);

export const statusMensagemEnum = pgEnum("status_mensagem", [
  "rascunho",
  "agendada",
  "enviada",
  "entregue",
  "aberta",       // Email aberto
  "clicada",      // Link clicado
  "respondida",
  "erro",
  "bounced",
]);

export const tipoTemplateMensagemEnum = pgEnum("tipo_template_mensagem", [
  "convite_entrevista",
  "lembrete_entrevista",
  "confirmacao_agendamento",
  "reagendamento",
  "cancelamento",
  "aprovacao_etapa",
  "reprovacao_etapa",
  "proposta_enviada",
  "feedback_geral",
  "lembrete_24h",
  "lembrete_1h",
  "boas_vindas",
  "custom",
]);

/**
 * Templates de mensagem reutilizáveis
 */
export const templatesMensagem = pgTable("templates_mensagem", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Pode ser global (userId null) ou do recrutador
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" }),

  nome: text("nome").notNull(),
  tipo: tipoTemplateMensagemEnum("tipo").notNull(),
  canal: canalMensagemEnum("canal").notNull().default("email"),

  // Conteúdo
  assunto: text("assunto"),    // Para email
  corpo: text("corpo").notNull(),   // HTML para email, texto para WhatsApp/SMS

  // Variáveis disponíveis: {{nome}}, {{vaga}}, {{empresa}}, {{data}}, {{hora}}, {{link}}, {{recrutador}}
  variaveis: text("variaveis"), // JSON array de variáveis usadas

  ativo: boolean("ativo").default(true).notNull(),
  padrao: boolean("padrao").default(false).notNull(), // É o template padrão para este tipo?

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Mensagens enviadas/recebidas
 */
export const mensagens = pgTable("mensagens", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Remetente (recrutador)
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Destinatário (candidato)
  candidatoId: uuid("candidato_id")
    .notNull()
    .references(() => candidatos.id, { onDelete: "cascade" }),

  // Contexto (opcional)
  entrevistaId: uuid("entrevista_id")
    .references(() => entrevistas.id, { onDelete: "set null" }),

  // Template usado (opcional)
  templateId: uuid("template_id")
    .references(() => templatesMensagem.id, { onDelete: "set null" }),

  // Canal e status
  canal: canalMensagemEnum("canal").notNull().default("email"),
  status: statusMensagemEnum("status").notNull().default("enviada"),

  // Direção
  recebida: boolean("recebida").default(false).notNull(), // true = candidato enviou, false = recrutador enviou

  // Conteúdo
  assunto: text("assunto"),
  corpo: text("corpo").notNull(),

  // Metadados de entrega (email)
  emailId: text("email_id"),           // ID do Resend
  abertaEm: timestamp("aberta_em", { mode: "date" }),
  clicadaEm: timestamp("clicada_em", { mode: "date" }),
  respondidaEm: timestamp("respondida_em", { mode: "date" }),
  erroDetalhe: text("erro_detalhe"),

  // Controle
  lidaPeloRecrutador: boolean("lida_pelo_recrutador").default(false).notNull(),
  lidaPeloCandidato: boolean("lida_pelo_candidato").default(false).notNull(),
  arquivada: boolean("arquivada").default(false).notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// Types
export type TemplateMensagem = typeof templatesMensagem.$inferSelect;
export type NewTemplateMensagem = typeof templatesMensagem.$inferInsert;
export type Mensagem = typeof mensagens.$inferSelect;
export type NewMensagem = typeof mensagens.$inferInsert;
