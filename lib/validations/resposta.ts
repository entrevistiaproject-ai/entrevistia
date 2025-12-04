import { z } from "zod";

/**
 * Validação de criação de resposta
 */
export const criarRespostaSchema = z.object({
  perguntaId: z.string().uuid(),
  candidatoId: z.string().uuid(),
  entrevistaId: z.string().uuid(),

  // Pelo menos um tipo de resposta deve ser fornecido
  textoResposta: z.string().max(5000, "Resposta muito longa").optional(),

  arquivoUrl: z.string().url("URL do arquivo inválida").optional(),

  arquivoTipo: z
    .enum(["audio/mp3", "audio/wav", "audio/webm", "video/webm", "video/mp4"])
    .optional(),

  tempoResposta: z.number().int().min(0).optional(), // segundos
}).refine(
  (data) => {
    // Deve ter pelo menos texto OU arquivo
    return !!data.textoResposta || !!data.arquivoUrl;
  },
  {
    message: "Resposta deve conter texto ou arquivo",
    path: ["textoResposta"],
  }
);

export type CriarRespostaInput = z.infer<typeof criarRespostaSchema>;

/**
 * Validação de avaliação de resposta
 */
export const avaliarRespostaSchema = z.object({
  respostaId: z.string().uuid(),

  pontuacao: z.number().int().min(0).max(100),

  nota: z.number().int().min(0).max(100),

  feedback: z.string().max(2000, "Feedback muito longo").optional(),

  analiseIA: z
    .object({
      sentimento: z.enum(["positivo", "neutro", "negativo"]).optional(),
      confianca: z.number().min(0).max(100).optional(),
      palavrasChave: z.array(z.string()).optional(),
      topicosAbordados: z.array(z.string()).optional(),
      competenciasIdentificadas: z.array(z.string()).optional(),
      pontosFortess: z.array(z.string()).optional(),
      pontosAMelhorar: z.array(z.string()).optional(),
    })
    .optional(),
});

export type AvaliarRespostaInput = z.infer<typeof avaliarRespostaSchema>;

/**
 * Validação de transcrição de áudio/vídeo
 */
export const transcricaoSchema = z.object({
  respostaId: z.string().uuid(),
  transcricao: z.string().max(10000, "Transcrição muito longa"),
});

export type TranscricaoInput = z.infer<typeof transcricaoSchema>;
