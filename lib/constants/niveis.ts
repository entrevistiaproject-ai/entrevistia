/**
 * Níveis hierárquicos disponíveis no sistema
 * Ordenados por senioridade crescente
 */

export const NIVEIS_HIERARQUICOS = [
  { value: "estagiario", label: "Estagiário" },
  { value: "trainee", label: "Trainee" },
  { value: "junior", label: "Júnior" },
  { value: "pleno", label: "Pleno" },
  { value: "senior", label: "Sênior" },
  { value: "especialista", label: "Especialista" },
  { value: "coordenador", label: "Coordenador" },
  { value: "gerente", label: "Gerente" },
  { value: "head", label: "Head" },
  { value: "diretor", label: "Diretor" },
  { value: "c-level", label: "C-Level (CEO, CTO, CFO, etc)" },
] as const;

export type NivelHierarquico = typeof NIVEIS_HIERARQUICOS[number]["value"];

/**
 * Retorna o label de um nível pelo value
 */
export function getLabelNivel(value: string): string {
  const nivel = NIVEIS_HIERARQUICOS.find((n) => n.value === value);
  return nivel?.label || value;
}
