import { pgTable, uuid, timestamp, text, boolean, integer, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";

// Enums
export const tipoEventoEnum = pgEnum("tipo_evento", [
  "entrevista_ia",
  "entrevista_humana",
  "prova",
  "teste_tecnico",
  "avaliacao",
  "reuniao_interna",
  "outro",
]);

export const statusEventoEnum = pgEnum("status_evento", [
  "pendente",       // Aguardando confirmação do candidato
  "confirmado",     // Candidato confirmou
  "reagendado",     // Foi reagendado
  "cancelado",      // Cancelado
  "realizado",      // Concluído
  "no_show",        // Candidato não compareceu
]);

/**
 * Disponibilidade do recrutador para agendamentos
 */
export const disponibilidades = pgTable("disponibilidades", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Dia da semana (0 = domingo, 6 = sábado)
  diaSemana: integer("dia_semana").notNull(),

  // Horários no formato HH:MM
  horaInicio: text("hora_inicio").notNull(), // ex: "09:00"
  horaFim: text("hora_fim").notNull(),       // ex: "18:00"

  // Duração padrão do slot em minutos
  duracaoSlotMinutos: integer("duracao_slot_minutos").notNull().default(60),

  // Intervalo entre slots em minutos
  intervaloMinutos: integer("intervalo_minutos").notNull().default(15),

  ativo: boolean("ativo").default(true).notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Bloqueios de horário (feriados, férias, compromissos pessoais)
 */
export const bloqueiosHorario = pgTable("bloqueios_horario", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  titulo: text("titulo"),
  dataInicio: timestamp("data_inicio", { mode: "date" }).notNull(),
  dataFim: timestamp("data_fim", { mode: "date" }).notNull(),
  diaInteiro: boolean("dia_inteiro").default(false).notNull(),
  recorrente: boolean("recorrente").default(false).notNull(),

  // ID do evento no Google Calendar (para sincronização)
  googleEventId: text("google_event_id"),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Eventos agendados (entrevistas, provas, reuniões)
 */
export const agendamentos = pgTable("agendamentos", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Quem criou o agendamento
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Candidato associado (opcional para reuniões internas)
  candidatoId: uuid("candidato_id")
    .references(() => candidatos.id, { onDelete: "set null" }),

  // Entrevista associada (opcional)
  entrevistaId: uuid("entrevista_id")
    .references(() => entrevistas.id, { onDelete: "set null" }),

  // Detalhes do evento
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  tipo: tipoEventoEnum("tipo").notNull().default("entrevista_humana"),
  status: statusEventoEnum("status").notNull().default("pendente"),

  // Data e hora
  dataInicio: timestamp("data_inicio", { mode: "date" }).notNull(),
  dataFim: timestamp("data_fim", { mode: "date" }).notNull(),
  fusoHorario: text("fuso_horario").notNull().default("America/Sao_Paulo"),

  // Local / Link
  local: text("local"),                   // Endereço físico
  linkReuniao: text("link_reuniao"),       // Link do Google Meet, Zoom, etc.
  plataforma: text("plataforma"),          // "google_meet", "zoom", "teams", "presencial"

  // Participantes adicionais (JSON array de emails)
  participantes: text("participantes"),    // JSON stringified array

  // Google Calendar
  googleEventId: text("google_event_id"),
  googleCalendarId: text("google_calendar_id"),

  // Lembretes
  lembrete24hEnviado: boolean("lembrete_24h_enviado").default(false).notNull(),
  lembrete1hEnviado: boolean("lembrete_1h_enviado").default(false).notNull(),
  lembrete15minEnviado: boolean("lembrete_15min_enviado").default(false).notNull(),

  // Confirmação do candidato
  confirmadoEm: timestamp("confirmado_em", { mode: "date" }),
  canceladoEm: timestamp("cancelado_em", { mode: "date" }),
  motivoCancelamento: text("motivo_cancelamento"),

  // Reagendamento
  reagendadoDe: uuid("reagendado_de"), // ID do agendamento anterior
  tentativasReagendamento: integer("tentativas_reagendamento").default(0).notNull(),
  maxReagendamentos: integer("max_reagendamentos").default(2).notNull(),

  // Notas
  notasInternas: text("notas_internas"),    // Só recrutador vê
  notasCandidato: text("notas_candidato"),  // Candidato pode ver

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Links de self-scheduling (candidato escolhe horário)
 */
export const selfSchedulingLinks = pgTable("self_scheduling_links", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  candidatoId: uuid("candidato_id")
    .references(() => candidatos.id, { onDelete: "cascade" }),

  entrevistaId: uuid("entrevista_id")
    .references(() => entrevistas.id, { onDelete: "set null" }),

  // Token único para o link público
  token: text("token").notNull().unique(),

  // Configuração
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  tipo: tipoEventoEnum("tipo").notNull().default("entrevista_humana"),
  duracaoMinutos: integer("duracao_minutos").notNull().default(60),

  // Janela de disponibilidade
  dataInicio: timestamp("data_inicio", { mode: "date" }).notNull(), // Início do período de seleção
  dataFim: timestamp("data_fim", { mode: "date" }).notNull(),       // Fim do período de seleção

  // Uso
  usadoEm: timestamp("usado_em", { mode: "date" }),      // Quando o candidato escolheu
  agendamentoId: uuid("agendamento_id"),                   // Agendamento criado

  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tokens OAuth do Google Calendar por usuário
 */
export const googleCalendarTokens = pgTable("google_calendar_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),

  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  calendarId: text("calendar_id").default("primary"),
  email: text("email"),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Types
export type Disponibilidade = typeof disponibilidades.$inferSelect;
export type NewDisponibilidade = typeof disponibilidades.$inferInsert;
export type BloqueioHorario = typeof bloqueiosHorario.$inferSelect;
export type NewBloqueioHorario = typeof bloqueiosHorario.$inferInsert;
export type Agendamento = typeof agendamentos.$inferSelect;
export type NewAgendamento = typeof agendamentos.$inferInsert;
export type SelfSchedulingLink = typeof selfSchedulingLinks.$inferSelect;
export type NewSelfSchedulingLink = typeof selfSchedulingLinks.$inferInsert;
export type GoogleCalendarToken = typeof googleCalendarTokens.$inferSelect;
export type NewGoogleCalendarToken = typeof googleCalendarTokens.$inferInsert;
