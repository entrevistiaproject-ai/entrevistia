/**
 * Tipos compartilhados para o banco de perguntas v4
 */

export type AreaProfissional =
  | 'tecnologia'
  | 'juridico'
  | 'comercial'
  | 'varejo'
  | 'administrativo'
  | 'saude'
  | 'callcenter'
  | 'logistica'
  | 'engenharia'
  | 'agronegocio'
  | 'educacao'
  | 'hotelaria'
  | 'industria'
  | 'design';

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
  saude: [
    'Enfermeiro',
    'Técnico de Enfermagem',
    'Recepcionista de Clínica/Hospital',
    'Fisioterapeuta',
    'Farmacêutico',
    'Nutricionista',
    'Psicólogo',
    'Auxiliar de Saúde Bucal',
  ],
  callcenter: [
    'Operador de Telemarketing',
    'Operador de SAC',
    'Supervisor de Call Center',
    'Analista de Qualidade de Atendimento',
  ],
  logistica: [
    'Auxiliar de Logística',
    'Analista de Logística',
    'Conferente de Mercadorias',
    'Coordenador de Logística',
    'Motorista de Entrega',
    'Estoquista',
  ],
  engenharia: [
    'Engenheiro Civil',
    'Engenheiro de Produção',
    'Técnico de Segurança do Trabalho',
    'Técnico em Edificações',
    'Mestre de Obras',
    'Engenheiro Ambiental',
  ],
  agronegocio: [
    'Engenheiro Agrônomo',
    'Técnico Agrícola',
    'Gerente Agrícola',
    'Veterinário',
    'Operador de Máquinas Agrícolas',
  ],
  educacao: [
    'Professor',
    'Coordenador Pedagógico',
    'Auxiliar de Educação Infantil',
    'Orientador Educacional',
  ],
  hotelaria: [
    'Recepcionista de Hotel',
    'Camareiro',
    'Gerente de Hospedagem',
    'Agente de Viagens',
    'Maître / Garçom',
  ],
  industria: [
    'Operador de Produção',
    'Supervisor de Produção',
    'Técnico de Manutenção',
    'Analista de PCP',
    'Inspetor de Qualidade',
  ],
  design: [
    'Designer UX',
    'Designer UI',
    'Designer UI/UX',
    'Designer Gráfico',
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
  saude: 'Saúde',
  callcenter: 'Call Center / Telemarketing',
  logistica: 'Logística / Supply Chain',
  engenharia: 'Engenharia / Construção Civil',
  agronegocio: 'Agronegócio',
  educacao: 'Educação',
  hotelaria: 'Hotelaria / Turismo',
  industria: 'Indústria / Produção',
  design: 'Design / UX / UI',
};

export interface EstatisticasCargo {
  [cargo: string]: number;
}

export interface Estatisticas {
  total: number;
  porCargo: EstatisticasCargo;
}
