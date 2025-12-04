import { z } from "zod";

/**
 * Validação de criação de entrevista
 */
export const criarEntrevistaSchema = z.object({
  titulo: z
    .string()
    .min(5, "Título deve ter no mínimo 5 caracteres")
    .max(200, "Título muito longo"),

  descricao: z
    .string()
    .max(2000, "Descrição muito longa")
    .optional()
    .or(z.literal("")),

  cargo: z.string().max(100).optional(),

  empresa: z.string().max(100).optional(),

  duracao: z
    .number()
    .int()
    .min(5, "Duração mínima de 5 minutos")
    .max(180, "Duração máxima de 180 minutos")
    .optional(),

  tempoResposta: z
    .number()
    .int()
    .min(30, "Tempo mínimo de 30 segundos por pergunta")
    .max(600, "Tempo máximo de 600 segundos por pergunta")
    .optional(),

  permitirRevisao: z.boolean().default(false),

  expiracaoLink: z.date().optional(),

  // Configurações de privacidade LGPD
  anonimizarDados: z.boolean().default(false),
  periodoRetencao: z
    .number()
    .int()
    .min(30, "Período mínimo de retenção: 30 dias")
    .max(1825, "Período máximo de retenção: 5 anos")
    .default(90),

  configuracoes: z
    .object({
      emailNotificacao: z.boolean().optional(),
      compartilharResultados: z.boolean().optional(),
      requisitosMinimos: z
        .object({
          nota: z.number().min(0).max(100).optional(),
          tempoMaximo: z.number().int().positive().optional(),
        })
        .optional(),
    })
    .optional(),
});

export type CriarEntrevistaInput = z.infer<typeof criarEntrevistaSchema>;

/**
 * Validação de atualização de entrevista
 */
export const atualizarEntrevistaSchema = criarEntrevistaSchema.partial();

export type AtualizarEntrevistaInput = z.infer<typeof atualizarEntrevistaSchema>;

/**
 * Validação de publicação de entrevista
 */
export const publicarEntrevistaSchema = z.object({
  entrevistaId: z.string().uuid(),
  candidatoIds: z.array(z.string().uuid()).min(1, "Selecione pelo menos um candidato"),
});

export type PublicarEntrevistaInput = z.infer<typeof publicarEntrevistaSchema>;
