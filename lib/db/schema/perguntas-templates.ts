import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Tabela de templates de perguntas
 * Banco de perguntas reutilizáveis com sistema de tags flexível
 *
 * Sistema de Tags:
 * - Perguntas podem ter múltiplos cargos, níveis, ou nenhum (universal)
 * - Tags vazias = pergunta universal para qualquer contexto
 * - Filtro inteligente seleciona perguntas por relevância semântica
 */
export const perguntasTemplates = pgTable("perguntas_templates", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Relacionamento (null = pergunta padrão do sistema)
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),

  // Dados da pergunta
  texto: text("texto").notNull(),

  // Sistema de tags flexível - arrays podem estar vazios para perguntas universais
  cargos: jsonb("cargos").$type<string[]>().default([]), // Ex: ["Advogado", "Desenvolvedor"] ou [] para universal
  niveis: jsonb("niveis").$type<string[]>().default([]), // Ex: ["pleno", "senior"] ou [] para todos os níveis

  // Categoria da competência avaliada
  categoria: text("categoria").notNull(), // tecnica, comportamental, soft_skill, hard_skill
  competencia: text("competencia"), // Ex: "Direito Civil", "Comunicação" - opcional para perguntas genéricas

  // Tipo de pergunta
  tipo: text("tipo").notNull().default("texto"), // texto, video, audio

  // Se é uma pergunta padrão do sistema (fornecida pela plataforma)
  isPadrao: boolean("is_padrao").default(false).notNull(),

  // Critérios de avaliação esperados
  criteriosAvaliacao: jsonb("criterios_avaliacao").$type<{
    palavrasChave?: string[];
    topicos?: string[];
    competenciasEsperadas?: string[];
    aspectosAvaliar?: string[];
  }>(),

  // Metadados para filtro inteligente
  metadados: jsonb("metadados").$type<{
    // Contextos onde a pergunta é relevante
    contextos?: string[]; // Ex: ["entrevista técnica", "avaliação comportamental"]

    // Áreas de conhecimento relacionadas
    areasConhecimento?: string[]; // Ex: ["direito civil", "contratos", "negociação"]

    // Senioridade sugerida (peso 0-1 para cada nível)
    senioridadePesos?: {
      junior?: number;
      pleno?: number;
      senior?: number;
      especialista?: number;
    };

    // Score de relevância para diferentes tipos de vaga (calculado automaticamente)
    relevanciaCalculada?: Record<string, number>;
  }>(),

  // Tags customizadas pelo usuário (extraídas automaticamente ou adicionadas manualmente)
  tags: jsonb("tags").$type<string[]>().default([]),

  // Auditoria
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
});

export type PerguntaTemplate = typeof perguntasTemplates.$inferSelect;
export type NewPerguntaTemplate = typeof perguntasTemplates.$inferInsert;
