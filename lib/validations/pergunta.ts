import { z } from "zod";

/**
 * Validação de criação de pergunta
 */
export const criarPerguntaSchema = z.object({
  entrevistaId: z.string().uuid(),

  texto: z
    .string()
    .min(10, "Pergunta deve ter no mínimo 10 caracteres")
    .max(500, "Pergunta muito longa"),

  ordem: z.number().int().min(0).default(0),

  tipo: z
    .enum(["texto", "video", "audio", "multipla_escolha"])
    .default("texto"),

  obrigatoria: z.boolean().default(true),

  tempoMaximo: z
    .number()
    .int()
    .min(30, "Tempo mínimo de 30 segundos")
    .max(600, "Tempo máximo de 10 minutos")
    .optional(),

  pontuacaoMaxima: z
    .number()
    .int()
    .min(1)
    .max(100)
    .default(100),

  // Para múltipla escolha
  opcoes: z
    .array(
      z.object({
        valor: z.string().min(1),
        texto: z.string().min(1).max(200),
        pontos: z.number().int().min(0).max(100).optional(),
      })
    )
    .min(2, "Múltipla escolha deve ter no mínimo 2 opções")
    .optional(),

  // Critérios para avaliação de IA
  criteriosAvaliacao: z
    .object({
      palavrasChave: z.array(z.string()).optional(),
      topicos: z.array(z.string()).optional(),
      competencias: z.array(z.string()).optional(),
      pesoNota: z.number().min(0).max(1).default(1).optional(),
    })
    .optional(),
}).refine(
  (data) => {
    // Se for múltipla escolha, deve ter opções
    if (data.tipo === "multipla_escolha" && (!data.opcoes || data.opcoes.length < 2)) {
      return false;
    }
    return true;
  },
  {
    message: "Perguntas de múltipla escolha devem ter pelo menos 2 opções",
    path: ["opcoes"],
  }
);

export type CriarPerguntaInput = z.infer<typeof criarPerguntaSchema>;

/**
 * Validação de atualização de pergunta
 */
export const atualizarPerguntaSchema = criarPerguntaSchema.partial().omit({
  entrevistaId: true,
});

export type AtualizarPerguntaInput = z.infer<typeof atualizarPerguntaSchema>;

/**
 * Validação de reordenação de perguntas
 */
export const reordenarPerguntasSchema = z.object({
  entrevistaId: z.string().uuid(),
  ordens: z.array(
    z.object({
      perguntaId: z.string().uuid(),
      novaOrdem: z.number().int().min(0),
    })
  ),
});

export type ReordenarPerguntasInput = z.infer<typeof reordenarPerguntasSchema>;
