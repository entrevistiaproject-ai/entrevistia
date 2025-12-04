import type { TipoVaga, Senioridade } from "@/types/entrevista";

export const TIPOS_VAGA: readonly TipoVaga[] = [
  "Desenvolvimento",
  "Design",
  "Produto",
  "Marketing",
  "Vendas",
  "Suporte",
  "Outro",
] as const;

export const SENIORIDADES: readonly Senioridade[] = [
  "Estagiário",
  "Júnior",
  "Pleno",
  "Sênior",
  "Staff/Principal",
] as const;
