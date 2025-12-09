/**
 * Banco de Perguntas Simplificado
 *
 * Cada pergunta tem 1 cargo e 1 nível específico
 * Facilita a organização e montagem de pacotes por vaga
 */

export interface PerguntaSeedSimples {
  texto: string;
  cargo: string;
  nivel: string;
  categoria: 'conhecimento' | 'experiencia' | 'resolucao_problemas' | 'habilidades_pessoais' | 'qualificacoes';
  competencia?: string;
}

// Níveis padrão para expandir
const NIVEIS_PADRAO = ['junior', 'pleno', 'senior'];

// Cargos mais comuns
const CARGOS_TECH = ['Desenvolvedor', 'QA', 'DevOps', 'Data Analyst'];
const CARGOS_NEGOCIOS = ['Vendedor', 'Marketing', 'RH', 'Financeiro'];
const CARGOS_OPERACIONAIS = ['Assistente Administrativo', 'Atendimento', 'Customer Success'];

/**
 * PERGUNTAS UNIVERSAIS - Expandidas para todos os cargos e níveis principais
 */
const perguntasUniversaisBase = [
  {
    texto: 'Como você lida com prazos apertados e pressão no trabalho?',
    categoria: 'habilidades_pessoais' as const,
    competencia: 'Gestão de Estresse',
  },
  {
    texto: 'Conte sobre um erro que você cometeu no trabalho e como você lidou com isso.',
    categoria: 'experiencia' as const,
    competencia: 'Aprendizado',
  },
  {
    texto: 'Descreva uma situação onde você teve que trabalhar com alguém difícil. Como você lidou?',
    categoria: 'experiencia' as const,
    competencia: 'Relacionamento Interpessoal',
  },
  {
    texto: 'Como você prioriza suas tarefas quando tem múltiplas demandas urgentes?',
    categoria: 'resolucao_problemas' as const,
    competencia: 'Gestão de Tempo',
  },
  {
    texto: 'O que te motiva profissionalmente?',
    categoria: 'habilidades_pessoais' as const,
    competencia: 'Motivação',
  },
  {
    texto: 'Como você dá e recebe feedback?',
    categoria: 'habilidades_pessoais' as const,
    competencia: 'Comunicação',
  },
  {
    texto: 'Descreva sua experiência trabalhando em equipe. Qual papel você costuma assumir?',
    categoria: 'experiencia' as const,
    competencia: 'Trabalho em Equipe',
  },
];

// Expande universais para cargos genéricos comuns
function expandirUniversais(): PerguntaSeedSimples[] {
  const perguntas: PerguntaSeedSimples[] = [];
  const cargosParaExpandir = ['Geral', 'Administrativo', 'Operacional'];

  for (const base of perguntasUniversaisBase) {
    for (const cargo of cargosParaExpandir) {
      for (const nivel of NIVEIS_PADRAO) {
        perguntas.push({
          ...base,
          cargo,
          nivel,
        });
      }
    }
  }

  return perguntas;
}

/**
 * TECNOLOGIA
 */
export const perguntasTecnologia: PerguntaSeedSimples[] = [
  // Desenvolvedor - Júnior
  {
    texto: 'Explique o que é Git e para que serve.',
    cargo: 'Desenvolvedor',
    nivel: 'junior',
    categoria: 'conhecimento',
    competencia: 'Versionamento',
  },
  {
    texto: 'Qual a diferença entre uma variável e uma constante?',
    cargo: 'Desenvolvedor',
    nivel: 'junior',
    categoria: 'conhecimento',
    competencia: 'Fundamentos',
  },
  {
    texto: 'O que são estruturas de dados? Cite exemplos que você conhece.',
    cargo: 'Desenvolvedor',
    nivel: 'junior',
    categoria: 'conhecimento',
    competencia: 'Fundamentos',
  },
  {
    texto: 'Conte sobre um projeto pessoal ou acadêmico que você desenvolveu.',
    cargo: 'Desenvolvedor',
    nivel: 'junior',
    categoria: 'experiencia',
    competencia: 'Projetos',
  },

  // Desenvolvedor - Pleno
  {
    texto: 'Descreva um projeto onde você teve que otimizar performance. Quais estratégias usou?',
    cargo: 'Desenvolvedor',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Otimização',
  },
  {
    texto: 'Como você aborda o design de uma API RESTful?',
    cargo: 'Desenvolvedor',
    nivel: 'pleno',
    categoria: 'conhecimento',
    competencia: 'Arquitetura',
  },
  {
    texto: 'Qual sua abordagem para escrever testes automatizados?',
    cargo: 'Desenvolvedor',
    nivel: 'pleno',
    categoria: 'resolucao_problemas',
    competencia: 'Qualidade',
  },
  {
    texto: 'Conte sobre uma situação onde você teve que debugar um problema complexo.',
    cargo: 'Desenvolvedor',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Debugging',
  },

  // Desenvolvedor - Sênior
  {
    texto: 'Explique sua experiência com arquitetura de microsserviços. Quando você recomendaria usar vs. monolito?',
    cargo: 'Desenvolvedor',
    nivel: 'senior',
    categoria: 'conhecimento',
    competencia: 'Arquitetura de Software',
  },
  {
    texto: 'Como você mentora desenvolvedores júniores? Conte sobre uma situação específica.',
    cargo: 'Desenvolvedor',
    nivel: 'senior',
    categoria: 'experiencia',
    competencia: 'Liderança Técnica',
  },
  {
    texto: 'Descreva uma decisão técnica difícil que você tomou e seu impacto.',
    cargo: 'Desenvolvedor',
    nivel: 'senior',
    categoria: 'experiencia',
    competencia: 'Tomada de Decisão',
  },
  {
    texto: 'Como você equilibra dívida técnica com entrega de valor?',
    cargo: 'Desenvolvedor',
    nivel: 'senior',
    categoria: 'resolucao_problemas',
    competencia: 'Gestão Técnica',
  },

  // QA - Pleno
  {
    texto: 'Qual sua abordagem para criar uma estratégia de testes para uma nova feature?',
    cargo: 'QA',
    nivel: 'pleno',
    categoria: 'resolucao_problemas',
    competencia: 'Estratégia de Testes',
  },
  {
    texto: 'Você tem experiência com automação de testes? Quais ferramentas você já usou?',
    cargo: 'QA',
    nivel: 'pleno',
    categoria: 'qualificacoes',
    competencia: 'Automação',
  },
  {
    texto: 'Como você prioriza quais cenários testar quando o tempo é limitado?',
    cargo: 'QA',
    nivel: 'pleno',
    categoria: 'resolucao_problemas',
    competencia: 'Priorização',
  },

  // Data Analyst - Pleno
  {
    texto: 'Como você valida a qualidade dos dados antes de uma análise?',
    cargo: 'Data Analyst',
    nivel: 'pleno',
    categoria: 'resolucao_problemas',
    competencia: 'Qualidade de Dados',
  },
  {
    texto: 'Explique uma análise complexa que você realizou e como comunicou os resultados.',
    cargo: 'Data Analyst',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Comunicação de Dados',
  },
  {
    texto: 'Quais ferramentas de análise de dados você domina? (SQL, Python, Power BI, etc.)',
    cargo: 'Data Analyst',
    nivel: 'pleno',
    categoria: 'qualificacoes',
    competencia: 'Ferramentas',
  },
];

/**
 * VENDAS
 */
export const perguntasVendas: PerguntaSeedSimples[] = [
  // Vendedor - Júnior
  {
    texto: 'Como você lida com objeções de clientes?',
    cargo: 'Vendedor',
    nivel: 'junior',
    categoria: 'resolucao_problemas',
    competencia: 'Tratamento de Objeções',
  },
  {
    texto: 'Como você se organiza para bater suas metas?',
    cargo: 'Vendedor',
    nivel: 'junior',
    categoria: 'habilidades_pessoais',
    competencia: 'Gestão de Metas',
  },
  {
    texto: 'Você tem experiência com CRM? Quais ferramentas já utilizou?',
    cargo: 'Vendedor',
    nivel: 'junior',
    categoria: 'qualificacoes',
    competencia: 'Ferramentas de Vendas',
  },

  // Vendedor - Pleno
  {
    texto: 'Conte sobre sua maior venda. Como você conduziu o processo?',
    cargo: 'Vendedor',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Processo de Vendas',
  },
  {
    texto: 'Como você qualifica um lead? Qual seu processo de prospecção?',
    cargo: 'Vendedor',
    nivel: 'pleno',
    categoria: 'conhecimento',
    competencia: 'Prospecção',
  },
  {
    texto: 'Descreva uma situação onde você perdeu uma venda importante. O que você aprendeu?',
    cargo: 'Vendedor',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Resiliência',
  },

  // Vendedor - Sênior
  {
    texto: 'Como você constrói e gerencia um pipeline de vendas complexo?',
    cargo: 'Vendedor',
    nivel: 'senior',
    categoria: 'conhecimento',
    competencia: 'Pipeline',
  },
  {
    texto: 'Conte sobre uma negociação difícil que você conduziu com sucesso.',
    cargo: 'Vendedor',
    nivel: 'senior',
    categoria: 'experiencia',
    competencia: 'Negociação',
  },
];

/**
 * MARKETING
 */
export const perguntasMarketing: PerguntaSeedSimples[] = [
  // Marketing - Júnior
  {
    texto: 'Como você mede o sucesso de uma campanha de marketing?',
    cargo: 'Marketing',
    nivel: 'junior',
    categoria: 'conhecimento',
    competencia: 'Métricas',
  },
  {
    texto: 'Quais ferramentas de marketing digital você já utilizou?',
    cargo: 'Marketing',
    nivel: 'junior',
    categoria: 'qualificacoes',
    competencia: 'Ferramentas Digitais',
  },

  // Marketing - Pleno
  {
    texto: 'Conte sobre uma campanha que você criou. Quais foram os resultados?',
    cargo: 'Marketing',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Execução de Campanhas',
  },
  {
    texto: 'Como você se mantém atualizado sobre tendências de marketing?',
    cargo: 'Marketing',
    nivel: 'pleno',
    categoria: 'habilidades_pessoais',
    competencia: 'Atualização',
  },
  {
    texto: 'Descreva seu processo criativo para desenvolver conteúdo.',
    cargo: 'Marketing',
    nivel: 'pleno',
    categoria: 'resolucao_problemas',
    competencia: 'Criatividade',
  },
];

/**
 * RH
 */
export const perguntasRH: PerguntaSeedSimples[] = [
  // RH - Pleno
  {
    texto: 'Como você identifica se um candidato tem fit cultural com a empresa?',
    cargo: 'RH',
    nivel: 'pleno',
    categoria: 'resolucao_problemas',
    competencia: 'Avaliação de Candidatos',
  },
  {
    texto: 'Qual seu processo de sourcing para vagas difíceis de preencher?',
    cargo: 'RH',
    nivel: 'pleno',
    categoria: 'conhecimento',
    competencia: 'Sourcing',
  },
  {
    texto: 'Você tem experiência com processos seletivos em volume? Como você se organiza?',
    cargo: 'RH',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Recrutamento em Massa',
  },

  // RH - Sênior
  {
    texto: 'Como você lida com gestores que têm expectativas irreais sobre candidatos?',
    cargo: 'RH',
    nivel: 'senior',
    categoria: 'experiencia',
    competencia: 'Gestão de Stakeholders',
  },
];

/**
 * FINANCEIRO
 */
export const perguntasFinanceiro: PerguntaSeedSimples[] = [
  // Financeiro - Pleno
  {
    texto: 'Qual sua experiência com fechamento contábil? Descreva o processo.',
    cargo: 'Financeiro',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Contabilidade',
  },
  {
    texto: 'Quais sistemas/ERPs você já utilizou? (SAP, TOTVS, Oracle, etc.)',
    cargo: 'Financeiro',
    nivel: 'pleno',
    categoria: 'qualificacoes',
    competencia: 'Sistemas Financeiros',
  },
  {
    texto: 'Como você garante a conformidade fiscal nas operações que acompanha?',
    cargo: 'Financeiro',
    nivel: 'pleno',
    categoria: 'conhecimento',
    competencia: 'Compliance Fiscal',
  },

  // Financeiro - Sênior
  {
    texto: 'Você tem experiência com planejamento financeiro e orçamento?',
    cargo: 'Financeiro',
    nivel: 'senior',
    categoria: 'experiencia',
    competencia: 'Planejamento Financeiro',
  },
];

/**
 * ATENDIMENTO / CUSTOMER SUCCESS
 */
export const perguntasAtendimento: PerguntaSeedSimples[] = [
  // Atendimento - Júnior
  {
    texto: 'Como você lida com um cliente muito insatisfeito?',
    cargo: 'Atendimento',
    nivel: 'junior',
    categoria: 'resolucao_problemas',
    competencia: 'Gestão de Conflitos',
  },
  {
    texto: 'Como você prioriza múltiplos atendimentos simultâneos?',
    cargo: 'Atendimento',
    nivel: 'junior',
    categoria: 'habilidades_pessoais',
    competencia: 'Gestão de Demandas',
  },

  // Customer Success - Pleno
  {
    texto: 'Conte sobre uma situação onde você transformou um cliente insatisfeito em promotor da marca.',
    cargo: 'Customer Success',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Recuperação de Cliente',
  },
  {
    texto: 'Qual sua estratégia para garantir a retenção de clientes?',
    cargo: 'Customer Success',
    nivel: 'pleno',
    categoria: 'conhecimento',
    competencia: 'Retenção',
  },
];

/**
 * ADMINISTRATIVO
 */
export const perguntasAdministrativo: PerguntaSeedSimples[] = [
  // Assistente Administrativo - Júnior
  {
    texto: 'Como você organiza sua rotina diária com múltiplas responsabilidades?',
    cargo: 'Assistente Administrativo',
    nivel: 'junior',
    categoria: 'habilidades_pessoais',
    competencia: 'Organização',
  },
  {
    texto: 'Você tem experiência com Excel? Quais funcionalidades você domina?',
    cargo: 'Assistente Administrativo',
    nivel: 'junior',
    categoria: 'qualificacoes',
    competencia: 'Pacote Office',
  },

  // Administrativo - Pleno
  {
    texto: 'Descreva uma situação onde você identificou e implementou uma melhoria de processo.',
    cargo: 'Assistente Administrativo',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Melhoria Contínua',
  },
];

/**
 * ADVOGADO
 */
export const perguntasAdvogado: PerguntaSeedSimples[] = [
  // Advogado - Júnior
  {
    texto: 'Qual área do Direito você tem mais afinidade?',
    cargo: 'Advogado',
    nivel: 'junior',
    categoria: 'conhecimento',
    competencia: 'Especialização',
  },
  {
    texto: 'Descreva sua experiência com pesquisa jurídica e elaboração de peças.',
    cargo: 'Advogado',
    nivel: 'junior',
    categoria: 'experiencia',
    competencia: 'Pesquisa e Redação',
  },

  // Advogado - Pleno
  {
    texto: 'Como você organiza e prioriza múltiplos processos simultâneos?',
    cargo: 'Advogado',
    nivel: 'pleno',
    categoria: 'habilidades_pessoais',
    competencia: 'Gestão de Processos',
  },
  {
    texto: 'Conte sobre um caso complexo que você conduziu. Qual foi a estratégia e o resultado?',
    cargo: 'Advogado',
    nivel: 'pleno',
    categoria: 'experiencia',
    competencia: 'Estratégia Jurídica',
  },

  // Advogado - Sênior
  {
    texto: 'Como você explica conceitos jurídicos complexos para clientes sem formação em Direito?',
    cargo: 'Advogado',
    nivel: 'senior',
    categoria: 'habilidades_pessoais',
    competencia: 'Comunicação com Cliente',
  },
];

// Consolidação
export const todasAsPerguntasSimples: PerguntaSeedSimples[] = [
  ...expandirUniversais(),
  ...perguntasTecnologia,
  ...perguntasVendas,
  ...perguntasMarketing,
  ...perguntasRH,
  ...perguntasFinanceiro,
  ...perguntasAtendimento,
  ...perguntasAdministrativo,
  ...perguntasAdvogado,
];

// Estatísticas
export const estatisticas = {
  totalPerguntas: todasAsPerguntasSimples.length,
  porCategoria: {
    conhecimento: todasAsPerguntasSimples.filter(p => p.categoria === 'conhecimento').length,
    experiencia: todasAsPerguntasSimples.filter(p => p.categoria === 'experiencia').length,
    resolucao_problemas: todasAsPerguntasSimples.filter(p => p.categoria === 'resolucao_problemas').length,
    habilidades_pessoais: todasAsPerguntasSimples.filter(p => p.categoria === 'habilidades_pessoais').length,
    qualificacoes: todasAsPerguntasSimples.filter(p => p.categoria === 'qualificacoes').length,
  },
  cargosUnicos: [...new Set(todasAsPerguntasSimples.map(p => p.cargo))],
};
