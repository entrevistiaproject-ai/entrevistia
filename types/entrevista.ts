export type TipoVaga =
  | "Desenvolvimento"
  | "Design"
  | "Produto"
  | "Marketing"
  | "Vendas"
  | "Suporte"
  | "Outro";

export type Senioridade =
  | "Estagiário"
  | "Júnior"
  | "Pleno"
  | "Sênior"
  | "Staff/Principal";

export interface Pergunta {
  id: string;
  texto: string;
}

export interface CriarEntrevistaForm {
  tipoVaga: TipoVaga | "";
  senioridade: Senioridade | "";
  perguntas: Pergunta[];
}
