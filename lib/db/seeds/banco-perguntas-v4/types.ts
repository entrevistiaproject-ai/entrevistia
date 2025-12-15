/**
 * Tipos compartilhados para o banco de perguntas v4
 */

export type AreaProfissional = 'tecnologia' | 'juridico' | 'comercial' | 'varejo' | 'administrativo';

export interface PerguntaSeed {
  texto: string;
  area: AreaProfissional;
  cargo: string;
  nivel: 'junior' | 'pleno' | 'senior';
  categoria: 'tecnica' | 'experiencia' | 'comportamental' | 'situacional';
  competencia?: string;
}

/**
 * Mapeamento de áreas para cargos
 * Útil para o onboarding e seleção de preferências
 */
export const AREAS_CARGOS: Record<AreaProfissional, string[]> = {
  tecnologia: [
    'Desenvolvedor Front-End',
    'Desenvolvedor Back-End',
    'QA / Testes',
    'Suporte Técnico / HelpDesk',
    'Cientista de Dados',
    'Coordenador de Tecnologia',
    'Gerente de Projetos de TI',
  ],
  juridico: [
    'Advogado Trabalhista',
    'Advogado Civil',
    'Advogado Criminal',
    'Advogado Tributário',
    'Analista Jurídico / Paralegal',
  ],
  comercial: [
    'Vendedor / Comercial',
    'Marketing',
    'Atendimento ao Cliente',
  ],
  varejo: [
    'Operador de Caixa',
    'Repositor / Auxiliar de Loja',
    'Fiscal de Prevenção e Perdas',
    'Atendente / Vendedor de Loja',
    'Supervisor / Líder de Loja',
  ],
  administrativo: [
    'Administrativo',
    'Analista Financeiro',
    'RH / Recursos Humanos',
  ],
};

/**
 * Labels amigáveis para as áreas
 */
export const AREAS_LABELS: Record<AreaProfissional, string> = {
  tecnologia: 'Tecnologia',
  juridico: 'Jurídico',
  comercial: 'Comercial / Marketing',
  varejo: 'Varejo',
  administrativo: 'Administrativo / Gestão',
};

export interface EstatisticasCargo {
  [cargo: string]: number;
}

export interface Estatisticas {
  total: number;
  porCargo: EstatisticasCargo;
}
