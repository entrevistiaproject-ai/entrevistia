import { z } from "zod";

/**
 * Validação de cadastro de candidato
 * Inclui consentimentos LGPD obrigatórios
 */
export const cadastroCandidatoSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: z
    .string()
    .email("Email inválido")
    .toLowerCase()
    .max(255, "Email muito longo"),

  telefone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const numbers = val.replace(/\D/g, "");
        return numbers.length >= 10 && numbers.length <= 11;
      },
      { message: "Telefone inválido" }
    ),

  linkedin: z
    .string()
    .url("URL do LinkedIn inválida")
    .optional()
    .or(z.literal("")),

  // Consentimentos LGPD (obrigatórios para participar de entrevista)
  aceitouTermosEntrevista: z.literal(true, {
    message: "Você deve aceitar os termos para participar da entrevista",
  }),

  consentimentoTratamentoDados: z.literal(true, {
    message: "Você deve consentir com o tratamento de seus dados pessoais",
  }),

  finalidadeTratamento: z
    .string()
    .min(10, "Por favor, descreva a finalidade do tratamento de dados"),
});

export type CadastroCandidatoInput = z.infer<typeof cadastroCandidatoSchema>;

/**
 * Validação de atualização de candidato
 */
export const atualizarCandidatoSchema = z.object({
  nome: z.string().min(3).max(100).optional(),
  email: z.string().email().toLowerCase().optional(),
  telefone: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  observacoes: z.string().max(1000).optional(),
});

export type AtualizarCandidatoInput = z.infer<typeof atualizarCandidatoSchema>;

/**
 * Validação de solicitação de direitos LGPD
 */
export const solicitacaoLGPDSchema = z.object({
  candidatoId: z.string().uuid(),
  tipoSolicitacao: z.enum([
    "acesso",
    "correcao",
    "exclusao",
    "portabilidade",
    "oposicao",
    "revogacao_consentimento",
  ]),
  descricao: z.string().optional(),
  email: z.string().email(),
});

export type SolicitacaoLGPDInput = z.infer<typeof solicitacaoLGPDSchema>;
