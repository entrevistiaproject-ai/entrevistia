/**
 * Banco de Perguntas Completo
 *
 * Cobertura estratégica dos principais cargos com alta demanda de recrutamento
 * Organizado por: Universal → Específicas por Cargo → Por Nível
 */

export interface PerguntaSeed {
  texto: string;
  cargos: string[];
  niveis: string[];
  categoria: 'tecnica' | 'comportamental' | 'soft_skill' | 'hard_skill';
  competencia?: string;
  tags?: string[];
}

/**
 * PERGUNTAS UNIVERSAIS - Aplicáveis a TODOS os cargos
 */
export const perguntasUniversais: PerguntaSeed[] = [
  // Comportamentais Universais
  {
    texto: 'Como você lida com prazos apertados e pressão no trabalho?',
    cargos: [],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Gestão de Estresse',
    tags: ['pressão', 'prazos', 'resiliência']
  },
  {
    texto: 'Conte sobre um erro que você cometeu e como você lidou com isso.',
    cargos: [],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Aprendizado',
    tags: ['erro', 'aprendizado', 'responsabilidade']
  },
  {
    texto: 'Descreva uma situação onde você teve que trabalhar com alguém difícil. Como você lidou?',
    cargos: [],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Relacionamento Interpessoal',
    tags: ['conflito', 'trabalho em equipe', 'comunicação']
  },
  {
    texto: 'Como você prioriza suas tarefas quando tem múltiplas demandas urgentes?',
    cargos: [],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Gestão de Tempo',
    tags: ['priorização', 'organização', 'produtividade']
  },
  {
    texto: 'O que te motiva profissionalmente? Por que você está procurando esta oportunidade?',
    cargos: [],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Motivação',
    tags: ['motivação', 'carreira', 'objetivos']
  },

  // Soft Skills Universais
  {
    texto: 'Como você dá e recebe feedback?',
    cargos: [],
    niveis: ['pleno', 'senior', 'especialista'],
    categoria: 'soft_skill',
    competencia: 'Comunicação',
    tags: ['feedback', 'comunicação', 'desenvolvimento']
  },
  {
    texto: 'Descreva sua experiência trabalhando em equipe. Qual papel você costuma assumir?',
    cargos: [],
    niveis: [],
    categoria: 'soft_skill',
    competencia: 'Trabalho em Equipe',
    tags: ['equipe', 'colaboração', 'papel']
  },
];

/**
 * TECNOLOGIA - Desenvolvedor, QA, DevOps, Data, Product
 */
export const perguntasTecnologia: PerguntaSeed[] = [
  // Universais para Tech (qualquer nível)
  {
    texto: 'Qual sua linguagem de programação favorita e por quê?',
    cargos: ['Desenvolvedor', 'Engenheiro de Software', 'Full Stack', 'Backend', 'Frontend'],
    niveis: [],
    categoria: 'tecnica',
    competencia: 'Programação',
    tags: ['linguagem', 'programação', 'preferências']
  },
  {
    texto: 'Como você se mantém atualizado com novas tecnologias?',
    cargos: ['Desenvolvedor', 'Engenheiro de Software', 'QA', 'DevOps', 'Data Engineer'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Aprendizado Contínuo',
    tags: ['aprendizado', 'atualização', 'tecnologia']
  },

  // Júnior
  {
    texto: 'Explique o que é Git e para que serve.',
    cargos: ['Desenvolvedor', 'Engenheiro de Software'],
    niveis: ['junior'],
    categoria: 'tecnica',
    competencia: 'Versionamento',
    tags: ['git', 'controle de versão', 'básico']
  },
  {
    texto: 'Qual a diferença entre uma variável e uma constante?',
    cargos: ['Desenvolvedor', 'Engenheiro de Software'],
    niveis: ['junior'],
    categoria: 'tecnica',
    competencia: 'Fundamentos',
    tags: ['variável', 'constante', 'conceitos básicos']
  },

  // Pleno
  {
    texto: 'Descreva um projeto onde você teve que otimizar performance. Quais estratégias usou?',
    cargos: ['Desenvolvedor', 'Engenheiro de Software', 'Backend'],
    niveis: ['pleno', 'senior'],
    categoria: 'tecnica',
    competencia: 'Otimização',
    tags: ['performance', 'otimização', 'experiência']
  },
  {
    texto: 'Como você aborda o design de uma API RESTful?',
    cargos: ['Desenvolvedor', 'Backend', 'Full Stack'],
    niveis: ['pleno', 'senior'],
    categoria: 'tecnica',
    competencia: 'Arquitetura',
    tags: ['API', 'REST', 'design']
  },

  // Senior/Especialista
  {
    texto: 'Explique sua experiência com arquitetura de microsserviços. Quando você recomendaria usar vs. monolito?',
    cargos: ['Desenvolvedor', 'Engenheiro de Software', 'Arquiteto'],
    niveis: ['senior', 'especialista'],
    categoria: 'tecnica',
    competencia: 'Arquitetura de Software',
    tags: ['microsserviços', 'arquitetura', 'decisões técnicas']
  },
  {
    texto: 'Como você mentora desenvolvedores júniores? Conte sobre uma situação específica.',
    cargos: ['Desenvolvedor', 'Engenheiro de Software', 'Tech Lead'],
    niveis: ['senior', 'especialista'],
    categoria: 'comportamental',
    competencia: 'Liderança Técnica',
    tags: ['mentoria', 'liderança', 'desenvolvimento']
  },

  // QA Específico
  {
    texto: 'Qual sua abordagem para criar uma estratégia de testes para uma nova feature?',
    cargos: ['QA', 'Analista de Testes'],
    niveis: ['pleno', 'senior'],
    categoria: 'tecnica',
    competencia: 'Estratégia de Testes',
    tags: ['testes', 'estratégia', 'qualidade']
  },
  {
    texto: 'Você tem experiência com automação de testes? Quais ferramentas você já usou?',
    cargos: ['QA', 'Analista de Testes'],
    niveis: [],
    categoria: 'hard_skill',
    competencia: 'Automação',
    tags: ['automação', 'ferramentas', 'testes']
  },

  // Data/Analytics
  {
    texto: 'Como você valida a qualidade dos dados antes de uma análise?',
    cargos: ['Analista de Dados', 'Data Analyst', 'Data Scientist'],
    niveis: ['junior', 'pleno'],
    categoria: 'tecnica',
    competencia: 'Qualidade de Dados',
    tags: ['dados', 'qualidade', 'validação']
  },
  {
    texto: 'Explique uma análise complexa que você realizou e como comunicou os resultados para stakeholders não-técnicos.',
    cargos: ['Analista de Dados', 'Data Analyst', 'BI'],
    niveis: ['pleno', 'senior'],
    categoria: 'comportamental',
    competencia: 'Comunicação de Dados',
    tags: ['análise', 'comunicação', 'stakeholders']
  },
];

/**
 * JURÍDICO - Advogado, Paralegal, Assistente
 */
export const perguntasJuridico: PerguntaSeed[] = [
  {
    texto: 'Qual área do Direito você tem mais experiência?',
    cargos: ['Advogado', 'Consultor Jurídico'],
    niveis: [],
    categoria: 'hard_skill',
    competencia: 'Especialização',
    tags: ['área', 'especialização', 'experiência']
  },
  {
    texto: 'Como você organiza e prioriza múltiplos processos simultâneos?',
    cargos: ['Advogado', 'Paralegal', 'Assistente Jurídico'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Gestão de Processos',
    tags: ['organização', 'processos', 'priorização']
  },
  {
    texto: 'Descreva sua experiência com pesquisa jurídica e elaboração de peças.',
    cargos: ['Advogado', 'Estagiário de Direito'],
    niveis: ['junior', 'pleno'],
    categoria: 'tecnica',
    competencia: 'Pesquisa e Redação',
    tags: ['pesquisa', 'peças', 'redação']
  },
  {
    texto: 'Conte sobre um caso complexo que você conduziu. Qual foi a estratégia e o resultado?',
    cargos: ['Advogado'],
    niveis: ['pleno', 'senior'],
    categoria: 'tecnica',
    competencia: 'Estratégia Jurídica',
    tags: ['caso', 'estratégia', 'experiência']
  },
  {
    texto: 'Como você explica conceitos jurídicos complexos para clientes sem formação em Direito?',
    cargos: ['Advogado', 'Consultor Jurídico'],
    niveis: ['pleno', 'senior'],
    categoria: 'soft_skill',
    competencia: 'Comunicação com Cliente',
    tags: ['comunicação', 'cliente', 'explicação']
  },
];

/**
 * VENDAS/COMERCIAL - Vendedor, SDR, BDR, Executivo
 */
export const perguntasVendas: PerguntaSeed[] = [
  {
    texto: 'Como você lida com objeções de clientes?',
    cargos: ['Vendedor', 'SDR', 'BDR', 'Executivo de Vendas', 'Consultor Comercial'],
    niveis: [],
    categoria: 'tecnica',
    competencia: 'Tratamento de Objeções',
    tags: ['objeções', 'negociação', 'vendas']
  },
  {
    texto: 'Conte sobre sua maior venda. Como você conduziu o processo?',
    cargos: ['Vendedor', 'Executivo de Vendas', 'Account Executive'],
    niveis: ['pleno', 'senior'],
    categoria: 'comportamental',
    competencia: 'Processo de Vendas',
    tags: ['venda', 'processo', 'negociação']
  },
  {
    texto: 'Como você se organiza para bater suas metas mensais?',
    cargos: ['Vendedor', 'SDR', 'BDR', 'Executivo de Vendas'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Gestão de Metas',
    tags: ['metas', 'organização', 'disciplina']
  },
  {
    texto: 'Você tem experiência com CRM? Quais ferramentas já utilizou?',
    cargos: ['Vendedor', 'SDR', 'BDR', 'Executivo de Vendas'],
    niveis: [],
    categoria: 'hard_skill',
    competencia: 'Ferramentas de Vendas',
    tags: ['CRM', 'ferramentas', 'tecnologia']
  },
  {
    texto: 'Como você qualifica um lead? Qual seu processo de prospecção?',
    cargos: ['SDR', 'BDR', 'Vendedor'],
    niveis: ['junior', 'pleno'],
    categoria: 'tecnica',
    competencia: 'Prospecção',
    tags: ['prospecção', 'qualificação', 'leads']
  },
  {
    texto: 'Descreva uma situação onde você perdeu uma venda importante. O que você aprendeu?',
    cargos: ['Vendedor', 'Executivo de Vendas'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Resiliência',
    tags: ['perda', 'aprendizado', 'resiliência']
  },
];

/**
 * MARKETING - Analista, Social Media, Designer, Growth
 */
export const perguntasMarketing: PerguntaSeed[] = [
  {
    texto: 'Como você mede o sucesso de uma campanha de marketing?',
    cargos: ['Analista de Marketing', 'Marketing Digital', 'Growth'],
    niveis: [],
    categoria: 'tecnica',
    competencia: 'Métricas e Analytics',
    tags: ['métricas', 'ROI', 'análise']
  },
  {
    texto: 'Conte sobre uma campanha que você criou. Quais foram os resultados?',
    cargos: ['Analista de Marketing', 'Marketing Digital', 'Social Media'],
    niveis: ['pleno', 'senior'],
    categoria: 'comportamental',
    competencia: 'Execução de Campanhas',
    tags: ['campanha', 'resultados', 'criatividade']
  },
  {
    texto: 'Quais ferramentas de marketing digital você domina? (Google Ads, Facebook Ads, SEO, etc.)',
    cargos: ['Analista de Marketing', 'Marketing Digital'],
    niveis: [],
    categoria: 'hard_skill',
    competencia: 'Ferramentas Digitais',
    tags: ['ferramentas', 'digital', 'ads']
  },
  {
    texto: 'Como você se mantém atualizado sobre tendências de marketing e redes sociais?',
    cargos: ['Social Media', 'Analista de Marketing', 'Marketing Digital'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Atualização',
    tags: ['tendências', 'aprendizado', 'redes sociais']
  },
  {
    texto: 'Descreva seu processo criativo para desenvolver conteúdo.',
    cargos: ['Social Media', 'Designer', 'Redator'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Criatividade',
    tags: ['criatividade', 'conteúdo', 'processo']
  },
];

/**
 * RH - Recrutador, Analista, Business Partner
 */
export const perguntasRH: PerguntaSeed[] = [
  {
    texto: 'Como você identifica se um candidato tem fit cultural com a empresa?',
    cargos: ['Recrutador', 'Analista de RH', 'Talent Acquisition'],
    niveis: [],
    categoria: 'tecnica',
    competencia: 'Avaliação de Candidatos',
    tags: ['fit cultural', 'recrutamento', 'avaliação']
  },
  {
    texto: 'Qual seu processo de sourcing para vagas difíceis de preencher?',
    cargos: ['Recrutador', 'Talent Acquisition', 'Headhunter'],
    niveis: ['pleno', 'senior'],
    categoria: 'tecnica',
    competencia: 'Sourcing',
    tags: ['sourcing', 'recrutamento', 'estratégia']
  },
  {
    texto: 'Como você lida com gestores que têm expectativas irreais sobre candidatos?',
    cargos: ['Recrutador', 'Business Partner', 'Analista de RH'],
    niveis: ['pleno', 'senior'],
    categoria: 'comportamental',
    competencia: 'Gestão de Stakeholders',
    tags: ['gestão', 'expectativas', 'comunicação']
  },
  {
    texto: 'Você tem experiência com processos seletivos em volume? Como você se organiza?',
    cargos: ['Recrutador', 'Analista de RH'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Recrutamento em Massa',
    tags: ['volume', 'organização', 'processo']
  },
];

/**
 * FINANCEIRO - Contador, Analista Financeiro, Controller
 */
export const perguntasFinanceiro: PerguntaSeed[] = [
  {
    texto: 'Qual sua experiência com fechamento contábil? Descreva o processo.',
    cargos: ['Contador', 'Analista Contábil'],
    niveis: [],
    categoria: 'tecnica',
    competencia: 'Contabilidade',
    tags: ['fechamento', 'contabilidade', 'processo']
  },
  {
    texto: 'Como você garante a conformidade fiscal nas operações que acompanha?',
    cargos: ['Contador', 'Analista Fiscal', 'Controller'],
    niveis: ['pleno', 'senior'],
    categoria: 'tecnica',
    competencia: 'Compliance Fiscal',
    tags: ['fiscal', 'compliance', 'legislação']
  },
  {
    texto: 'Você tem experiência com planejamento financeiro e orçamento?',
    cargos: ['Analista Financeiro', 'Controller', 'CFO'],
    niveis: ['pleno', 'senior', 'especialista'],
    categoria: 'hard_skill',
    competencia: 'Planejamento Financeiro',
    tags: ['planejamento', 'orçamento', 'finanças']
  },
  {
    texto: 'Quais sistemas/ERPs você já utilizou? (SAP, TOTVS, Oracle, etc.)',
    cargos: ['Contador', 'Analista Financeiro', 'Analista Contábil'],
    niveis: [],
    categoria: 'hard_skill',
    competencia: 'Sistemas Financeiros',
    tags: ['ERP', 'sistemas', 'ferramentas']
  },
];

/**
 * ATENDIMENTO/CS - Customer Success, Suporte, SAC
 */
export const perguntasAtendimento: PerguntaSeed[] = [
  {
    texto: 'Como você lida com um cliente muito insatisfeito?',
    cargos: ['Customer Success', 'Suporte', 'SAC', 'Atendimento'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Gestão de Conflitos',
    tags: ['cliente insatisfeito', 'conflito', 'atendimento']
  },
  {
    texto: 'Conte sobre uma situação onde você transformou um cliente insatisfeito em promotor da marca.',
    cargos: ['Customer Success', 'Suporte', 'SAC'],
    niveis: ['pleno', 'senior'],
    categoria: 'comportamental',
    competencia: 'Recuperação de Cliente',
    tags: ['recuperação', 'satisfação', 'promotor']
  },
  {
    texto: 'Como você prioriza múltiplos atendimentos simultâneos?',
    cargos: ['Customer Success', 'Suporte', 'SAC', 'Atendimento'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Gestão de Demandas',
    tags: ['priorização', 'multitarefa', 'organização']
  },
  {
    texto: 'Qual sua estratégia para garantir a retenção de clientes?',
    cargos: ['Customer Success'],
    niveis: ['pleno', 'senior'],
    categoria: 'tecnica',
    competencia: 'Retenção',
    tags: ['retenção', 'estratégia', 'CS']
  },
];

/**
 * ADMINISTRATIVO/OPERAÇÕES - Assistente, Analista, Coordenador
 */
export const perguntasAdministrativo: PerguntaSeed[] = [
  {
    texto: 'Como você organiza sua rotina diária com múltiplas responsabilidades?',
    cargos: ['Assistente Administrativo', 'Auxiliar Administrativo', 'Analista Administrativo'],
    niveis: [],
    categoria: 'comportamental',
    competencia: 'Organização',
    tags: ['organização', 'rotina', 'multitarefa']
  },
  {
    texto: 'Você tem experiência com ferramentas do pacote Office (Excel, Word, PowerPoint)?',
    cargos: ['Assistente Administrativo', 'Auxiliar Administrativo', 'Analista Administrativo'],
    niveis: [],
    categoria: 'hard_skill',
    competencia: 'Pacote Office',
    tags: ['Office', 'Excel', 'ferramentas']
  },
  {
    texto: 'Descreva uma situação onde você identificou e implementou uma melhoria de processo.',
    cargos: ['Analista Administrativo', 'Coordenador', 'Analista de Processos'],
    niveis: ['pleno', 'senior'],
    categoria: 'comportamental',
    competencia: 'Melhoria Contínua',
    tags: ['processo', 'melhoria', 'eficiência']
  },
];

// Consolidação
export const todasAsPerguntas: PerguntaSeed[] = [
  ...perguntasUniversais,
  ...perguntasTecnologia,
  ...perguntasJuridico,
  ...perguntasVendas,
  ...perguntasMarketing,
  ...perguntasRH,
  ...perguntasFinanceiro,
  ...perguntasAtendimento,
  ...perguntasAdministrativo,
];

// Estatísticas
export const estatisticas = {
  totalPerguntas: todasAsPerguntas.length,
  porCategoria: {
    comportamental: todasAsPerguntas.filter(p => p.categoria === 'comportamental').length,
    tecnica: todasAsPerguntas.filter(p => p.categoria === 'tecnica').length,
    soft_skill: todasAsPerguntas.filter(p => p.categoria === 'soft_skill').length,
    hard_skill: todasAsPerguntas.filter(p => p.categoria === 'hard_skill').length,
  },
  universais: todasAsPerguntas.filter(p => p.cargos.length === 0 && p.niveis.length === 0).length,
  porCargo: todasAsPerguntas.filter(p => p.cargos.length > 0).length,
};
