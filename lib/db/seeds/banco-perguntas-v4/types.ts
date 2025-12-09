/**
 * Tipos compartilhados para o banco de perguntas v4
 */

export interface PerguntaSeed {
  texto: string;
  cargo: string;
  nivel: 'junior' | 'pleno' | 'senior';
  categoria: 'tecnica' | 'experiencia' | 'comportamental' | 'situacional';
  competencia?: string;
}

export interface EstatisticasCargo {
  [cargo: string]: number;
}

export interface Estatisticas {
  total: number;
  porCargo: EstatisticasCargo;
}
