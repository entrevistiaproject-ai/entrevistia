import { pgTable, text, timestamp, uuid, decimal, integer, jsonb } from "drizzle-orm/pg-core";
import { users } from "./users";
import { entrevistas } from "./entrevistas";
import { respostas } from "./respostas";

/**
 * Tabela de transações de custos
 * Registra cada operação que gera custo na plataforma
 */
export const transacoes = pgTable("transacoes", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamentos
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  entrevistaId: uuid("entrevista_id")
    .references(() => entrevistas.id, { onDelete: "set null" }),
  respostaId: uuid("resposta_id")
    .references(() => respostas.id, { onDelete: "set null" }),

  // Tipo de transação
  tipo: text("tipo").notNull(), // transcricao_audio, analise_ia, pergunta_criada, entrevista_criada

  // Valores
  custoBase: decimal("custo_base", { precision: 10, scale: 6 }).notNull(), // Custo da API (Claude, Whisper, etc)
  markup: decimal("markup", { precision: 10, scale: 2 }).notNull().default("2.5"), // Multiplicador de lucro
  valorCobrado: decimal("valor_cobrado", { precision: 10, scale: 2 }).notNull(), // Valor final cobrado do usuário

  // Metadados da transação
  metadados: jsonb("metadados").$type<{
    modeloIA?: string; // claude-3.5-sonnet, whisper-1
    tokensEntrada?: number;
    tokensSaida?: number;
    duracaoAudio?: number; // segundos
    tamanhoArquivo?: number; // bytes
    tentativas?: number;
  }>(),

  // Descrição
  descricao: text("descricao"),

  // Status
  status: text("status").notNull().default("concluida"), // pendente, concluida, falha, reembolsada

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  processadaEm: timestamp("processada_em", { mode: "date" }),
});

/**
 * Tabela de saldo/créditos do usuário
 */
export const saldos = pgTable("saldos", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),

  // Saldo em créditos (R$)
  saldoAtual: decimal("saldo_atual", { precision: 10, scale: 2 }).notNull().default("0.00"),
  totalGasto: decimal("total_gasto", { precision: 10, scale: 2 }).notNull().default("0.00"),
  totalRecargado: decimal("total_recargado", { precision: 10, scale: 2 }).notNull().default("0.00"),

  // Limites e alertas
  limiteAlerta: decimal("limite_alerta", { precision: 10, scale: 2 }).default("10.00"), // Alertar quando saldo < R$10
  limiteBloqueio: decimal("limite_bloqueio", { precision: 10, scale: 2 }).default("0.00"), // Bloquear quando saldo = R$0

  // Estatísticas
  totalEntrevistas: integer("total_entrevistas").default(0),
  totalCandidatos: integer("total_candidatos").default(0),
  totalRespostas: integer("total_respostas").default(0),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tabela de recargas de crédito
 */
export const recargas = pgTable("recargas", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Valor da recarga
  valor: decimal("valor", { precision: 10, scale: 2 }).notNull(),

  // Método de pagamento
  metodoPagamento: text("metodo_pagamento").notNull(), // pix, cartao, boleto

  // Status
  status: text("status").notNull().default("pendente"), // pendente, aprovada, rejeitada, cancelada

  // Dados do pagamento
  paymentId: text("payment_id"), // ID da transação no gateway de pagamento
  paymentData: jsonb("payment_data"),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  aprovedAt: timestamp("aproved_at", { mode: "date" }),
});

export type Transacao = typeof transacoes.$inferSelect;
export type NewTransacao = typeof transacoes.$inferInsert;
export type Saldo = typeof saldos.$inferSelect;
export type NewSaldo = typeof saldos.$inferInsert;
export type Recarga = typeof recargas.$inferSelect;
export type NewRecarga = typeof recargas.$inferInsert;
