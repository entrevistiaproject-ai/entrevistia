import { pgTable, text, timestamp, uuid, decimal, integer, jsonb, date } from "drizzle-orm/pg-core";
import { users } from "./users";
import { entrevistas } from "./entrevistas";
import { respostas } from "./respostas";

/**
 * Tabela de faturas mensais
 * Uma fatura é gerada por mês para cada usuário
 */
export const faturas = pgTable("faturas", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamento
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Período da fatura
  mesReferencia: integer("mes_referencia").notNull(), // 1-12
  anoReferencia: integer("ano_referencia").notNull(), // 2025, 2026...

  // Valores
  valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).notNull().default("0.00"),
  valorPago: decimal("valor_pago", { precision: 10, scale: 2 }).notNull().default("0.00"),

  // Status da fatura
  status: text("status").notNull().default("aberta"), // aberta, fechada, paga, vencida, cancelada

  // Datas importantes
  dataAbertura: timestamp("data_abertura", { mode: "date" }).defaultNow().notNull(),
  dataFechamento: timestamp("data_fechamento", { mode: "date" }), // Quando a fatura foi fechada para cobrança
  dataVencimento: date("data_vencimento"), // Data de vencimento para pagamento
  dataPagamento: timestamp("data_pagamento", { mode: "date" }),

  // Estatísticas de uso
  totalEntrevistas: integer("total_entrevistas").default(0),
  totalCandidatos: integer("total_candidatos").default(0),
  totalRespostas: integer("total_respostas").default(0),
  totalTransacoes: integer("total_transacoes").default(0),

  // Dados de pagamento
  metodoPagamento: text("metodo_pagamento"), // cartao_credito (futuramente: pix, boleto)
  paymentId: text("payment_id"), // ID da transação no gateway
  paymentData: jsonb("payment_data"),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

/**
 * Tabela de transações/itens da fatura
 * Cada operação que gera custo é um item na fatura do mês
 */
export const transacoes = pgTable("transacoes", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamentos
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  faturaId: uuid("fatura_id")
    .references(() => faturas.id, { onDelete: "set null" }),
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

export type Fatura = typeof faturas.$inferSelect;
export type NewFatura = typeof faturas.$inferInsert;
export type Transacao = typeof transacoes.$inferSelect;
export type NewTransacao = typeof transacoes.$inferInsert;
