import { z } from "zod";

/**
 * Validação de cadastro de usuário (recrutador)
 * Conforme formulário de cadastro
 */
export const cadastroUserSchema = z.object({
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
        // Remove caracteres não numéricos
        const numbers = val.replace(/\D/g, "");
        return numbers.length >= 10 && numbers.length <= 11;
      },
      { message: "Telefone inválido" }
    ),

  empresa: z.string().max(100, "Nome da empresa muito longo").optional(),

  cargo: z.string().max(100, "Nome do cargo muito longo").optional(),

  senha: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha muito longa")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter letras maiúsculas, minúsculas e números"
    ),

  confirmarSenha: z.string(),

  // Consentimentos LGPD (obrigatórios)
  aceitouTermos: z.literal(true, {
    message: "Você deve aceitar os Termos de Uso",
  }),

  aceitouPrivacidade: z.literal(true, {
    message: "Você deve aceitar a Política de Privacidade",
  }),

  // Opcional
  aceitaEmailMarketing: z.boolean().default(false),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

export type CadastroUserInput = z.infer<typeof cadastroUserSchema>;

/**
 * Validação de login
 */
export const loginSchema = z.object({
  email: z.string().email("Email inválido").toLowerCase(),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Validação de atualização de perfil
 */
export const atualizarPerfilSchema = z.object({
  nome: z.string().min(3).max(100).optional(),
  telefone: z.string().optional(),
  empresa: z.string().max(100).optional(),
  cargo: z.string().max(100).optional(),
  aceitaEmailMarketing: z.boolean().optional(),
});

export type AtualizarPerfilInput = z.infer<typeof atualizarPerfilSchema>;

/**
 * Validação de alteração de senha
 */
export const alterarSenhaSchema = z
  .object({
    senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
    novaSenha: z
      .string()
      .min(8, "Nova senha deve ter no mínimo 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve conter letras maiúsculas, minúsculas e números"
      ),
    confirmarNovaSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmarNovaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarNovaSenha"],
  });

export type AlterarSenhaInput = z.infer<typeof alterarSenhaSchema>;
