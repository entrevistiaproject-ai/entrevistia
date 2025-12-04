import { NewPerguntaTemplate } from "../schema/perguntas-templates";

/**
 * Banco de perguntas padrão para Advogado Pleno
 * Cobre competências técnicas, comportamentais, soft skills e hard skills
 */
export const perguntasAdvogadoPleno: Omit<NewPerguntaTemplate, "id" | "userId" | "createdAt" | "updatedAt">[] = [
  // TÉCNICAS - Conhecimento Jurídico
  {
    texto: "Descreva sua experiência com elaboração de contratos complexos. Qual foi o contrato mais desafiador que você redigiu e quais cláusulas exigiram maior atenção técnica?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "tecnica",
    competencia: "Direito Contratual",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      topicos: ["contratos complexos", "cláusulas específicas", "técnica de redação"],
      competenciasEsperadas: ["conhecimento técnico", "atenção a detalhes", "experiência prática"],
      aspectosAvaliar: ["profundidade do conhecimento", "casos reais", "complexidade dos contratos mencionados"]
    },
    tags: ["contratos", "direito empresarial", "redação jurídica"]
  },

  {
    texto: "Como você se mantém atualizado sobre mudanças na legislação e jurisprudência? Cite uma mudança recente que impactou sua área de atuação e como você se adaptou.",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "tecnica",
    competencia: "Atualização Profissional",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      palavrasChave: ["jurisprudência", "legislação", "atualização", "adaptação"],
      topicos: ["fontes de informação", "educação continuada", "aplicação prática"],
      aspectosAvaliar: ["proatividade", "conhecimento atualizado", "adaptabilidade"]
    },
    tags: ["atualização", "legislação", "jurisprudência"]
  },

  {
    texto: "Explique sua experiência com processos judiciais. Qual sua taxa de êxito e como você desenvolve sua estratégia processual?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "tecnica",
    competencia: "Litígio e Estratégia Processual",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      topicos: ["estratégia processual", "resultados", "análise de casos"],
      competenciasEsperadas: ["pensamento estratégico", "análise crítica", "resultados mensuráveis"],
      aspectosAvaliar: ["experiência em litígio", "capacidade analítica", "orientação a resultados"]
    },
    tags: ["litígio", "processos", "estratégia"]
  },

  // HARD SKILLS - Habilidades Específicas
  {
    texto: "Quais ferramentas jurídicas e softwares você utiliza no dia a dia? Como eles melhoram sua produtividade e qualidade do trabalho?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "hard_skill",
    competencia: "Tecnologia Jurídica",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      palavrasChave: ["software jurídico", "ferramentas", "produtividade", "tecnologia"],
      topicos: ["automação", "gestão de processos", "pesquisa jurídica"],
      aspectosAvaliar: ["familiaridade com tecnologia", "modernização", "eficiência"]
    },
    tags: ["tecnologia", "ferramentas", "produtividade", "lawtech"]
  },

  {
    texto: "Descreva sua experiência em due diligence. Qual foi o projeto mais complexo que você conduziu e quais foram os principais riscos identificados?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "hard_skill",
    competencia: "Due Diligence e Análise de Riscos",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      topicos: ["due diligence", "análise de riscos", "metodologia", "relatórios"],
      competenciasEsperadas: ["análise detalhada", "identificação de riscos", "visão de negócios"],
      aspectosAvaliar: ["experiência em M&A", "capacidade analítica", "atenção a detalhes"]
    },
    tags: ["due diligence", "M&A", "análise de riscos"]
  },

  // SOFT SKILLS - Comunicação
  {
    texto: "Conte sobre uma situação em que você precisou explicar um conceito jurídico complexo para um cliente sem formação em Direito. Como você garantiu o entendimento?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "soft_skill",
    competencia: "Comunicação Clara",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      topicos: ["comunicação simplificada", "empatia", "didática"],
      competenciasEsperadas: ["clareza", "paciência", "adaptabilidade comunicacional"],
      aspectosAvaliar: ["habilidade de simplificação", "foco no cliente", "efetividade da comunicação"]
    },
    tags: ["comunicação", "atendimento ao cliente", "didática"]
  },

  {
    texto: "Descreva uma situação de conflito com um cliente ou colega sobre estratégia jurídica. Como você conduziu a negociação e qual foi o resultado?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "soft_skill",
    competencia: "Negociação e Gestão de Conflitos",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      palavrasChave: ["negociação", "conflito", "solução", "consenso"],
      topicos: ["gestão de conflitos", "persuasão", "diplomacia"],
      aspectosAvaliar: ["maturidade profissional", "habilidade de negociação", "resolução de problemas"]
    },
    tags: ["negociação", "conflitos", "relacionamento"]
  },

  // SOFT SKILLS - Trabalho em Equipe e Liderança
  {
    texto: "Como você gerencia seu tempo entre múltiplos casos urgentes? Descreva sua metodologia de priorização e organização.",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "soft_skill",
    competencia: "Gestão de Tempo e Priorização",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      topicos: ["gestão de tempo", "priorização", "organização", "metodologia"],
      competenciasEsperadas: ["eficiência", "planejamento", "cumprimento de prazos"],
      aspectosAvaliar: ["capacidade organizacional", "gestão de pressão", "produtividade"]
    },
    tags: ["gestão de tempo", "organização", "produtividade"]
  },

  {
    texto: "Você já orientou estagiários ou advogados juniores? Como você aborda o desenvolvimento da equipe e qual sua filosofia de mentoria?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "soft_skill",
    competencia: "Liderança e Mentoria",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      palavrasChave: ["mentoria", "liderança", "desenvolvimento", "equipe"],
      topicos: ["gestão de pessoas", "ensino", "desenvolvimento profissional"],
      aspectosAvaliar: ["capacidade de liderança", "disposição para ensinar", "visão de equipe"]
    },
    tags: ["liderança", "mentoria", "desenvolvimento de equipe"]
  },

  // COMPORTAMENTAL - Ética e Valores
  {
    texto: "Descreva uma situação em que você enfrentou um dilema ético na advocacia. Como você lidou com a situação e quais princípios guiaram sua decisão?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "comportamental",
    competencia: "Ética Profissional",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      topicos: ["ética profissional", "dilemas morais", "código de ética da OAB", "integridade"],
      competenciasEsperadas: ["valores sólidos", "responsabilidade profissional", "transparência"],
      aspectosAvaliar: ["maturidade ética", "capacidade de decisão", "alinhamento com princípios"]
    },
    tags: ["ética", "valores", "integridade"]
  },

  // COMPORTAMENTAL - Resiliência e Adaptação
  {
    texto: "Conte sobre um caso que você perdeu ou um resultado adverso significativo. Como você lidou com a situação e o que aprendeu?",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "comportamental",
    competencia: "Resiliência e Aprendizado",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      palavrasChave: ["resiliência", "aprendizado", "superação", "autocrítica"],
      topicos: ["gestão de frustrações", "aprendizado com erros", "melhoria contínua"],
      aspectosAvaliar: ["maturidade emocional", "capacidade de aprender", "resiliência"]
    },
    tags: ["resiliência", "aprendizado", "autocrítica"]
  },

  // COMPORTAMENTAL - Visão de Negócios
  {
    texto: "Como você equilibra os interesses jurídicos com os objetivos de negócio do cliente? Dê um exemplo de quando você precisou ser pragmático sem comprometer aspectos legais.",
    cargo: "Advogado",
    nivel: "pleno",
    categoria: "comportamental",
    competencia: "Visão de Negócios",
    tipo: "texto",
    isPadrao: true,
    criteriosAvaliacao: {
      topicos: ["visão de negócios", "pragmatismo", "consultoria estratégica"],
      competenciasEsperadas: ["business partner", "pensamento estratégico", "equilíbrio"],
      aspectosAvaliar: ["compreensão do negócio", "assessoria estratégica", "flexibilidade com responsabilidade"]
    },
    tags: ["negócios", "estratégia", "consultoria"]
  }
];
