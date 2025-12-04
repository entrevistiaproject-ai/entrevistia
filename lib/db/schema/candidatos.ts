import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Tabela de candidatos
 * Dados sensíveis protegidos pela LGPD
 */
export const candidatos = pgTable("candidatos", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamento com o recrutador (controlador dos dados)
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Dados pessoais
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone"),

  // Dados adicionais (opcionais)
  linkedin: text("linkedin"),
  curriculo: text("curriculo"), // URL do arquivo
  observacoes: text("observacoes"),

  // Consentimentos LGPD
  aceitouTermosEntrevista: boolean("aceitou_termos_entrevista").default(false).notNull(),
  dataAceiteTermos: timestamp("data_aceite_termos", { mode: "date" }),
  consentimentoTratamentoDados: boolean("consentimento_tratamento_dados")
    .default(false)
    .notNull(),
  finalidadeTratamento: text("finalidade_tratamento"), // Ex: "Processo seletivo vaga X"

  // Direitos do titular (LGPD Art. 18)
  solicitouAcesso: timestamp("solicitou_acesso", { mode: "date" }),
  solicitouCorrecao: timestamp("solicitou_correcao", { mode: "date" }),
  solicitouExclusao: timestamp("solicitou_exclusao", { mode: "date" }),
  dataExclusaoAgendada: timestamp("data_exclusao_agendada", { mode: "date" }),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "date" }), // Soft delete

  // Rastreamento LGPD
  ipCadastro: text("ip_cadastro"),
  origemCadastro: text("origem_cadastro"), // Ex: "link_entrevista", "importacao_csv"
});

export type Candidato = typeof candidatos.$inferSelect;
export type NewCandidato = typeof candidatos.$inferInsert;
