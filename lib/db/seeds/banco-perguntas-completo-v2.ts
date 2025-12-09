/**
 * Banco de Perguntas Completo v2
 *
 * 10 cargos com alto potencial de comercialização
 * 15+ perguntas por cargo/nível
 * 5 categorias cobertas: conhecimento, experiencia, resolucao_problemas, habilidades_pessoais, qualificacoes
 *
 * Níveis: junior, pleno, senior (3 níveis principais)
 */

export interface PerguntaSeed {
  texto: string;
  cargo: string;
  nivel: string;
  categoria: 'conhecimento' | 'experiencia' | 'resolucao_problemas' | 'habilidades_pessoais' | 'qualificacoes';
  competencia?: string;
}

// ============================================
// 1. DESENVOLVEDOR
// ============================================

const desenvolvedorJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Explique o que é Git e quais são os comandos básicos que você utiliza.', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'conhecimento', competencia: 'Versionamento' },
  { texto: 'Qual a diferença entre uma linguagem compilada e uma interpretada? Cite exemplos.', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'conhecimento', competencia: 'Fundamentos' },
  { texto: 'O que são estruturas de dados? Explique a diferença entre Array, Lista e Mapa.', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'conhecimento', competencia: 'Estruturas de Dados' },

  // Experiência (3)
  { texto: 'Conte sobre um projeto pessoal ou acadêmico que você desenvolveu. Quais tecnologias usou?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva um bug difícil que você encontrou e como conseguiu resolvê-lo.', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'experiencia', competencia: 'Debugging' },
  { texto: 'Você já trabalhou em equipe em algum projeto? Como foi a experiência?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Resolução de Problemas (3)
  { texto: 'Como você abordaria a criação de uma funcionalidade de login para uma aplicação web?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Pensamento Lógico' },
  { texto: 'Se você recebesse um código que não entende, quais passos seguiria para compreendê-lo?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Análise de Código' },
  { texto: 'Como você organizaria seu trabalho se tivesse duas tarefas urgentes ao mesmo tempo?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você lida com feedback sobre seu código? Pode dar um exemplo?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Receptividade' },
  { texto: 'Como você se mantém atualizado com novas tecnologias e tendências?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Aprendizado Contínuo' },
  { texto: 'Descreva uma situação em que você precisou pedir ajuda. Como você abordou isso?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Comunicação' },

  // Qualificações (3)
  { texto: 'Quais linguagens de programação você conhece? Em qual se sente mais confortável?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Linguagens' },
  { texto: 'Você tem experiência com bancos de dados? SQL ou NoSQL?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Banco de Dados' },
  { texto: 'Já utilizou algum framework ou biblioteca? Quais?', cargo: 'Desenvolvedor', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Frameworks' },
];

const desenvolvedorPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Explique os princípios SOLID e como você os aplica no dia a dia.', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Design Patterns' },
  { texto: 'Qual a diferença entre REST e GraphQL? Quando usar cada um?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'conhecimento', competencia: 'APIs' },
  { texto: 'O que são testes unitários, de integração e E2E? Como você decide o que testar?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Testes' },

  // Experiência (4)
  { texto: 'Descreva um projeto complexo que você desenvolveu. Quais foram os maiores desafios?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos Complexos' },
  { texto: 'Conte sobre uma situação onde você teve que otimizar a performance de uma aplicação.', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Otimização' },
  { texto: 'Você já participou de code reviews? Como você aborda tanto dar quanto receber feedback?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Code Review' },
  { texto: 'Descreva sua experiência com deploy e CI/CD. Quais ferramentas você já utilizou?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'DevOps' },

  // Resolução de Problemas (3)
  { texto: 'Como você abordaria o design de uma API para um sistema de e-commerce?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Arquitetura' },
  { texto: 'Se um sistema em produção começasse a apresentar lentidão, como você investigaria?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Troubleshooting' },
  { texto: 'Como você equilibra qualidade de código com prazos apertados?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Trade-offs' },

  // Habilidades Pessoais (3)
  { texto: 'Como você lida com requisitos que mudam frequentemente durante um projeto?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Adaptabilidade' },
  { texto: 'Descreva uma situação de conflito com um colega de equipe e como você resolveu.', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Resolução de Conflitos' },
  { texto: 'Como você explica conceitos técnicos para stakeholders não-técnicos?', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Comunicação Técnica' },

  // Qualificações (3)
  { texto: 'Quais tecnologias de cloud você já trabalhou? (AWS, GCP, Azure)', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Cloud' },
  { texto: 'Você tem experiência com Docker e containerização? Descreva.', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Containers' },
  { texto: 'Quais frameworks de testes você utiliza? (Jest, Pytest, JUnit, etc.)', cargo: 'Desenvolvedor', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Ferramentas de Teste' },
];

const desenvolvedorSenior: PerguntaSeed[] = [
  // Conhecimento (4)
  { texto: 'Explique os trade-offs entre microsserviços e monolito. Quando você recomendaria cada um?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'conhecimento', competencia: 'Arquitetura' },
  { texto: 'Como você garante escalabilidade e resiliência em sistemas distribuídos?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'conhecimento', competencia: 'Sistemas Distribuídos' },
  { texto: 'Quais estratégias você conhece para lidar com eventual consistency?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'conhecimento', competencia: 'Consistência' },
  { texto: 'Explique diferentes estratégias de caching e quando usar cada uma.', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'conhecimento', competencia: 'Performance' },

  // Experiência (4)
  { texto: 'Descreva uma decisão arquitetural importante que você tomou e seu impacto no projeto.', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Decisões Técnicas' },
  { texto: 'Conte sobre uma situação onde você liderou uma migração técnica significativa.', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Técnica' },
  { texto: 'Como você mentora desenvolvedores mais júniores? Dê exemplos específicos.', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { texto: 'Descreva um incidente em produção crítico que você resolveu. Qual foi o processo?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Incident Response' },

  // Resolução de Problemas (3)
  { texto: 'Como você abordaria a refatoração de um sistema legado crítico para o negócio?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Refatoração' },
  { texto: 'Como você equilibra dívida técnica com entrega de novas features?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Gestão Técnica' },
  { texto: 'Descreva sua estratégia para avaliar e adotar novas tecnologias na equipe.', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Avaliação Tecnológica' },

  // Habilidades Pessoais (3)
  { texto: 'Como você influencia decisões técnicas quando não tem autoridade direta?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Influência' },
  { texto: 'Descreva como você conduz discussões técnicas com a equipe de produto.', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Colaboração' },
  { texto: 'Como você lida com pressão para entregar rapidamente sem comprometer qualidade?', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Negociação' },

  // Qualificações (2)
  { texto: 'Você tem experiência com arquiteturas event-driven ou mensageria? (Kafka, RabbitMQ, SQS)', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'qualificacoes', competencia: 'Mensageria' },
  { texto: 'Quais práticas de observabilidade você implementa? (Logs, métricas, traces)', cargo: 'Desenvolvedor', nivel: 'senior', categoria: 'qualificacoes', competencia: 'Observabilidade' },
];

// ============================================
// 2. VENDEDOR
// ============================================

const vendedorJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'O que você entende por funil de vendas? Quais são suas etapas?', cargo: 'Vendedor', nivel: 'junior', categoria: 'conhecimento', competencia: 'Processo de Vendas' },
  { texto: 'Qual a diferença entre leads frios e quentes? Como você aborda cada um?', cargo: 'Vendedor', nivel: 'junior', categoria: 'conhecimento', competencia: 'Qualificação' },
  { texto: 'O que significa SPIN Selling? Você conhece outras metodologias de vendas?', cargo: 'Vendedor', nivel: 'junior', categoria: 'conhecimento', competencia: 'Metodologias' },

  // Experiência (3)
  { texto: 'Conte sobre uma venda que você fechou e que te deixou orgulhoso. O que fez diferente?', cargo: 'Vendedor', nivel: 'junior', categoria: 'experiencia', competencia: 'Fechamento' },
  { texto: 'Descreva uma situação onde você perdeu uma venda. O que aprendeu?', cargo: 'Vendedor', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { texto: 'Você já trabalhou com metas? Como se organizou para atingi-las?', cargo: 'Vendedor', nivel: 'junior', categoria: 'experiencia', competencia: 'Gestão de Metas' },

  // Resolução de Problemas (3)
  { texto: 'Como você lidaria com um cliente que diz que o preço está muito alto?', cargo: 'Vendedor', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Objeções' },
  { texto: 'Se um cliente não responde suas mensagens, qual sua estratégia de follow-up?', cargo: 'Vendedor', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Follow-up' },
  { texto: 'Como você priorizaria sua lista de leads se tivesse pouco tempo disponível?', cargo: 'Vendedor', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você lida com a rejeição em vendas? Isso te afeta?', cargo: 'Vendedor', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Resiliência' },
  { texto: 'Descreva como você se prepara antes de uma ligação ou reunião de vendas.', cargo: 'Vendedor', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Preparação' },
  { texto: 'Como você mantém a motivação quando os resultados não estão vindo?', cargo: 'Vendedor', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Motivação' },

  // Qualificações (3)
  { texto: 'Você tem experiência com algum CRM? Qual e como você utilizava?', cargo: 'Vendedor', nivel: 'junior', categoria: 'qualificacoes', competencia: 'CRM' },
  { texto: 'Quais canais de prospecção você já utilizou? (Telefone, e-mail, LinkedIn, etc.)', cargo: 'Vendedor', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Prospecção' },
  { texto: 'Você se sente confortável fazendo calls em inglês?', cargo: 'Vendedor', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Idiomas' },
];

const vendedorPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você estrutura uma apresentação de vendas consultiva?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Venda Consultiva' },
  { texto: 'Explique a diferença entre venda transacional e venda complexa.', cargo: 'Vendedor', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Tipos de Venda' },
  { texto: 'O que você considera um processo de vendas eficiente? Quais métricas acompanha?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Métricas' },

  // Experiência (4)
  { texto: 'Conte sobre seu maior deal fechado. Qual foi o ciclo de vendas e estratégia?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Grandes Negócios' },
  { texto: 'Descreva uma negociação difícil que você conduziu. Como chegou ao acordo?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação' },
  { texto: 'Você já recuperou um cliente que estava prestes a cancelar? Como?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Retenção' },
  { texto: 'Como você gerencia múltiplas oportunidades em diferentes estágios do funil?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Pipeline' },

  // Resolução de Problemas (3)
  { texto: 'Como você adapta seu pitch quando percebe que não está ressoando com o cliente?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Adaptação' },
  { texto: 'Um concorrente está oferecendo preço menor. Como você aborda essa situação?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Competição' },
  { texto: 'O decisor do cliente mudou no meio da negociação. Qual sua estratégia?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Mudança de Stakeholders' },

  // Habilidades Pessoais (3)
  { texto: 'Como você constrói rapport com clientes de diferentes perfis?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Relacionamento' },
  { texto: 'Descreva como você lida com a pressão de final de mês/quarter.', cargo: 'Vendedor', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Pressão' },
  { texto: 'Como você equilibra quantidade de atividades com qualidade das interações?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Eficiência' },

  // Qualificações (3)
  { texto: 'Quais ferramentas de sales engagement você domina? (Outreach, Salesloft, etc.)', cargo: 'Vendedor', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Ferramentas' },
  { texto: 'Você tem experiência com vendas B2B enterprise? Descreva.', cargo: 'Vendedor', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'B2B Enterprise' },
  { texto: 'Qual seu histórico de atingimento de meta nos últimos 12 meses?', cargo: 'Vendedor', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Track Record' },
];

const vendedorSenior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você estrutura uma estratégia de account planning para contas estratégicas?', cargo: 'Vendedor', nivel: 'senior', categoria: 'conhecimento', competencia: 'Account Planning' },
  { texto: 'Explique sua metodologia para mapear e influenciar o buying committee de uma empresa.', cargo: 'Vendedor', nivel: 'senior', categoria: 'conhecimento', competencia: 'Stakeholder Mapping' },
  { texto: 'Como você analisa e prevê seu pipeline? Quais metodologias de forecast usa?', cargo: 'Vendedor', nivel: 'senior', categoria: 'conhecimento', competencia: 'Forecasting' },

  // Experiência (4)
  { texto: 'Conte sobre o maior deal da sua carreira. Qual foi o ciclo, valor e estratégia?', cargo: 'Vendedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Grandes Deals' },
  { texto: 'Descreva uma situação onde você criou uma nova oportunidade onde não havia demanda clara.', cargo: 'Vendedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Geração de Demanda' },
  { texto: 'Você já mentiorou vendedores mais novos? Como foi essa experiência?', cargo: 'Vendedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { texto: 'Conte sobre uma situação onde você precisou envolver a alta liderança para fechar um deal.', cargo: 'Vendedor', nivel: 'senior', categoria: 'experiencia', competencia: 'Executive Engagement' },

  // Resolução de Problemas (3)
  { texto: 'Como você reverte uma conta perdida para a concorrência?', cargo: 'Vendedor', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Win-back' },
  { texto: 'Seu pipeline está abaixo do necessário para o quarter. Qual seu plano de ação?', cargo: 'Vendedor', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Pipeline Recovery' },
  { texto: 'Como você lida com deals que estão estagnados há muito tempo?', cargo: 'Vendedor', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Deals Stuck' },

  // Habilidades Pessoais (3)
  { texto: 'Como você influencia decisões internas quando precisa de recursos especiais para um deal?', cargo: 'Vendedor', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Influência Interna' },
  { texto: 'Descreva como você constrói relacionamentos com C-level dos clientes.', cargo: 'Vendedor', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Executive Relationships' },
  { texto: 'Como você equilibra seus interesses com os do cliente em uma negociação?', cargo: 'Vendedor', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Ética' },

  // Qualificações (2)
  { texto: 'Você tem experiência com vendas de soluções complexas (6+ meses de ciclo)?', cargo: 'Vendedor', nivel: 'senior', categoria: 'qualificacoes', competencia: 'Enterprise Sales' },
  { texto: 'Qual o maior ticket médio que você já trabalhou consistentemente?', cargo: 'Vendedor', nivel: 'senior', categoria: 'qualificacoes', competencia: 'Ticket Médio' },
];

// ============================================
// 3. ATENDIMENTO / CUSTOMER SUCCESS
// ============================================

const atendimentoJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'O que você entende por atendimento ao cliente de qualidade?', cargo: 'Atendimento', nivel: 'junior', categoria: 'conhecimento', competencia: 'Fundamentos' },
  { texto: 'Qual a diferença entre atendimento reativo e proativo?', cargo: 'Atendimento', nivel: 'junior', categoria: 'conhecimento', competencia: 'Tipos de Atendimento' },
  { texto: 'O que significa SLA? Por que é importante?', cargo: 'Atendimento', nivel: 'junior', categoria: 'conhecimento', competencia: 'Métricas' },

  // Experiência (3)
  { texto: 'Conte sobre uma situação onde você resolveu o problema de um cliente e ele ficou satisfeito.', cargo: 'Atendimento', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução' },
  { texto: 'Você já atendeu clientes por múltiplos canais? (Chat, telefone, e-mail)', cargo: 'Atendimento', nivel: 'junior', categoria: 'experiencia', competencia: 'Multicanal' },
  { texto: 'Descreva uma situação onde você precisou aprender rapidamente sobre um produto/serviço.', cargo: 'Atendimento', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },

  // Resolução de Problemas (3)
  { texto: 'Como você lidaria com um cliente muito irritado que está gritando?', cargo: 'Atendimento', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Gestão de Conflitos' },
  { texto: 'O cliente tem um problema que você não sabe resolver. O que você faz?', cargo: 'Atendimento', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Escalação' },
  { texto: 'Como você priorizaria se tivesse 10 chamados abertos ao mesmo tempo?', cargo: 'Atendimento', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você mantém a calma quando um cliente é rude ou agressivo?', cargo: 'Atendimento', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Inteligência Emocional' },
  { texto: 'Descreva como você demonstra empatia ao atender um cliente frustrado.', cargo: 'Atendimento', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Empatia' },
  { texto: 'Como você lida com o estresse de atendimentos repetitivos?', cargo: 'Atendimento', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Resiliência' },

  // Qualificações (3)
  { texto: 'Você tem experiência com sistemas de helpdesk? Quais?', cargo: 'Atendimento', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Ferramentas' },
  { texto: 'Qual sua velocidade de digitação? Você se sente confortável em chat ao vivo?', cargo: 'Atendimento', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Habilidades Técnicas' },
  { texto: 'Você tem disponibilidade para trabalhar em escala/finais de semana se necessário?', cargo: 'Atendimento', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Disponibilidade' },
];

const csPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'O que é Customer Success e como ele difere do atendimento tradicional?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Fundamentos CS' },
  { texto: 'Explique os conceitos de churn, NPS e health score.', cargo: 'Customer Success', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Métricas CS' },
  { texto: 'O que é um playbook de CS? Quais componentes ele deve ter?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Processos' },

  // Experiência (4)
  { texto: 'Conte sobre uma situação onde você evitou um churn que parecia inevitável.', cargo: 'Customer Success', nivel: 'pleno', categoria: 'experiencia', competencia: 'Retenção' },
  { texto: 'Descreva um caso de upsell/expansion que você conduziu. Qual foi a estratégia?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'experiencia', competencia: 'Expansion' },
  { texto: 'Como você conduz uma QBR (Quarterly Business Review) com clientes?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'experiencia', competencia: 'QBR' },
  { texto: 'Conte sobre uma implementação/onboarding complexa que você liderou.', cargo: 'Customer Success', nivel: 'pleno', categoria: 'experiencia', competencia: 'Onboarding' },

  // Resolução de Problemas (3)
  { texto: 'Um cliente estratégico está insatisfeito e ameaçando cancelar. Qual seu plano?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Crise' },
  { texto: 'Como você identifica clientes em risco antes que eles manifestem insatisfação?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Análise de Risco' },
  { texto: 'O produto tem uma limitação que o cliente precisa. Como você gerencia essa expectativa?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Gestão de Expectativas' },

  // Habilidades Pessoais (3)
  { texto: 'Como você equilibra ser um advogado do cliente internamente sem prejudicar a empresa?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Equilíbrio' },
  { texto: 'Descreva como você constrói relacionamentos de confiança com seus clientes.', cargo: 'Customer Success', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Relacionamento' },
  { texto: 'Como você lida com feedback negativo do cliente sobre o produto?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Feedback' },

  // Qualificações (3)
  { texto: 'Você tem experiência com plataformas de CS? (Gainsight, ChurnZero, etc.)', cargo: 'Customer Success', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Ferramentas CS' },
  { texto: 'Quantas contas você já gerenciou simultaneamente?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Volume' },
  { texto: 'Qual seu NRR (Net Revenue Retention) ou taxa de retenção histórica?', cargo: 'Customer Success', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Resultados' },
];

// ============================================
// 4. MARKETING
// ============================================

const marketingJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'O que é inbound marketing? Como ele difere do outbound?', cargo: 'Marketing', nivel: 'junior', categoria: 'conhecimento', competencia: 'Fundamentos' },
  { texto: 'Explique o que são KPIs de marketing. Cite exemplos importantes.', cargo: 'Marketing', nivel: 'junior', categoria: 'conhecimento', competencia: 'Métricas' },
  { texto: 'O que é SEO? Por que é importante para marketing digital?', cargo: 'Marketing', nivel: 'junior', categoria: 'conhecimento', competencia: 'SEO' },

  // Experiência (3)
  { texto: 'Conte sobre uma campanha de marketing que você criou ou participou.', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Campanhas' },
  { texto: 'Você já gerenciou redes sociais? Quais plataformas e que tipo de conteúdo?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Social Media' },
  { texto: 'Descreva um conteúdo que você produziu e que teve bom resultado.', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Conteúdo' },

  // Resolução de Problemas (3)
  { texto: 'Uma campanha não está performando bem. O que você analisaria primeiro?', cargo: 'Marketing', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Análise' },
  { texto: 'Como você criaria conteúdo para um público que você não conhece bem?', cargo: 'Marketing', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Pesquisa' },
  { texto: 'Você tem orçamento limitado. Como priorizaria os canais de marketing?', cargo: 'Marketing', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você se mantém atualizado sobre tendências de marketing?', cargo: 'Marketing', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Atualização' },
  { texto: 'Descreva seu processo criativo para desenvolver ideias de conteúdo.', cargo: 'Marketing', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Criatividade' },
  { texto: 'Como você lida com críticas ao seu trabalho criativo?', cargo: 'Marketing', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Receptividade' },

  // Qualificações (3)
  { texto: 'Quais ferramentas de marketing digital você conhece? (Google Ads, Meta Ads, etc.)', cargo: 'Marketing', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Ferramentas' },
  { texto: 'Você tem experiência com ferramentas de design? (Canva, Figma, Photoshop)', cargo: 'Marketing', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Design' },
  { texto: 'Você sabe usar Google Analytics ou ferramentas similares de análise?', cargo: 'Marketing', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Analytics' },
];

const marketingPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você estrutura uma estratégia de marketing para um novo produto?', cargo: 'Marketing', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Estratégia' },
  { texto: 'Explique como funciona um funil de marketing e suas métricas em cada etapa.', cargo: 'Marketing', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Funil' },
  { texto: 'O que é marketing attribution? Quais modelos você conhece?', cargo: 'Marketing', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Attribution' },

  // Experiência (4)
  { texto: 'Conte sobre a campanha de melhor resultado que você já executou. Quais métricas acompanhou?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance' },
  { texto: 'Descreva sua experiência com geração de leads. Qual canal teve melhor ROI?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lead Gen' },
  { texto: 'Você já trabalhou com automação de marketing? Que tipo de fluxos criou?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Automação' },
  { texto: 'Conte sobre um A/B test que você conduziu e o que aprendeu com ele.', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Experimentação' },

  // Resolução de Problemas (3)
  { texto: 'O CAC está muito alto. Que estratégias você usaria para reduzi-lo?', cargo: 'Marketing', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'CAC' },
  { texto: 'Como você alinharia marketing e vendas quando há conflito sobre qualidade de leads?', cargo: 'Marketing', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Alinhamento' },
  { texto: 'O mercado mudou e sua estratégia atual não funciona mais. Como você pivotaria?', cargo: 'Marketing', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Adaptação' },

  // Habilidades Pessoais (3)
  { texto: 'Como você apresenta resultados de marketing para stakeholders não-técnicos?', cargo: 'Marketing', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Comunicação' },
  { texto: 'Descreva como você gerencia múltiplos projetos de marketing simultaneamente.', cargo: 'Marketing', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Gestão de Projetos' },
  { texto: 'Como você lida com pressão para entregar resultados de curto prazo?', cargo: 'Marketing', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Pressão' },

  // Qualificações (3)
  { texto: 'Você tem experiência com ferramentas de automação? (HubSpot, RD Station, Marketo)', cargo: 'Marketing', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Automação' },
  { texto: 'Qual seu nível de experiência com paid media? Quanto já gerenciou de budget?', cargo: 'Marketing', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Mídia Paga' },
  { texto: 'Você sabe criar dashboards de marketing? Quais ferramentas usa?', cargo: 'Marketing', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'BI' },
];

// ============================================
// 5. RH / RECRUTADOR
// ============================================

const rhJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'O que você entende por fit cultural? Como você avalia isso em candidatos?', cargo: 'RH', nivel: 'junior', categoria: 'conhecimento', competencia: 'Fit Cultural' },
  { texto: 'Quais são as etapas de um processo seletivo típico?', cargo: 'RH', nivel: 'junior', categoria: 'conhecimento', competencia: 'Processo Seletivo' },
  { texto: 'O que é employer branding? Por que é importante?', cargo: 'RH', nivel: 'junior', categoria: 'conhecimento', competencia: 'Employer Branding' },

  // Experiência (3)
  { texto: 'Conte sobre um processo seletivo que você conduziu do início ao fim.', cargo: 'RH', nivel: 'junior', categoria: 'experiencia', competencia: 'Recrutamento' },
  { texto: 'Você já fez triagem de currículos? Como você organizava e priorizava?', cargo: 'RH', nivel: 'junior', categoria: 'experiencia', competencia: 'Triagem' },
  { texto: 'Descreva uma entrevista difícil que você conduziu. O que aprendeu?', cargo: 'RH', nivel: 'junior', categoria: 'experiencia', competencia: 'Entrevista' },

  // Resolução de Problemas (3)
  { texto: 'O gestor não está satisfeito com os candidatos apresentados. O que você faz?', cargo: 'RH', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Alinhamento' },
  { texto: 'Você tem uma vaga urgente e poucos candidatos. Qual sua estratégia?', cargo: 'RH', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Urgência' },
  { texto: 'Um candidato ideal recusou a oferta. Como você procederia?', cargo: 'RH', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Negociação' },

  // Habilidades Pessoais (3)
  { texto: 'Como você cria um ambiente confortável para o candidato durante a entrevista?', cargo: 'RH', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Acolhimento' },
  { texto: 'Descreva como você dá feedback negativo para candidatos não aprovados.', cargo: 'RH', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Feedback' },
  { texto: 'Como você mantém confidencialidade das informações dos processos?', cargo: 'RH', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Ética' },

  // Qualificações (3)
  { texto: 'Você tem experiência com ATS (Applicant Tracking System)? Quais?', cargo: 'RH', nivel: 'junior', categoria: 'qualificacoes', competencia: 'ATS' },
  { texto: 'Quais canais de sourcing você conhece e já utilizou?', cargo: 'RH', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Sourcing' },
  { texto: 'Você tem conhecimento de legislação trabalhista básica?', cargo: 'RH', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Legislação' },
];

const rhPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você estrutura uma descrição de vaga atrativa e inclusiva?', cargo: 'RH', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Job Description' },
  { texto: 'Explique diferentes técnicas de entrevista (comportamental, situacional, técnica).', cargo: 'RH', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Técnicas de Entrevista' },
  { texto: 'O que você considera ao definir a remuneração de uma vaga?', cargo: 'RH', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Remuneração' },

  // Experiência (4)
  { texto: 'Conte sobre uma vaga difícil de preencher que você conseguiu fechar. Qual foi a estratégia?', cargo: 'RH', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vagas Difíceis' },
  { texto: 'Você já fez recrutamento em volume? Como organizou o processo?', cargo: 'RH', nivel: 'pleno', categoria: 'experiencia', competencia: 'Volume' },
  { texto: 'Descreva sua experiência com hunting de candidatos passivos.', cargo: 'RH', nivel: 'pleno', categoria: 'experiencia', competencia: 'Hunting' },
  { texto: 'Você já participou de projetos de diversidade e inclusão? Conte.', cargo: 'RH', nivel: 'pleno', categoria: 'experiencia', competencia: 'D&I' },

  // Resolução de Problemas (3)
  { texto: 'O gestor tem expectativas irreais para a vaga. Como você alinha?', cargo: 'RH', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Gestão de Stakeholders' },
  { texto: 'Candidatos estão desistindo no meio do processo. O que você investigaria?', cargo: 'RH', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Dropout Rate' },
  { texto: 'Como você melhora a experiência do candidato em processos longos?', cargo: 'RH', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Candidate Experience' },

  // Habilidades Pessoais (3)
  { texto: 'Como você constrói relacionamento com gestores para entender suas necessidades?', cargo: 'RH', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Relacionamento' },
  { texto: 'Descreva como você lida com pressão de múltiplas vagas urgentes.', cargo: 'RH', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Gestão de Pressão' },
  { texto: 'Como você se mantém imparcial durante avaliações de candidatos?', cargo: 'RH', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Imparcialidade' },

  // Qualificações (3)
  { texto: 'Quais métricas de recrutamento você acompanha? (Time to fill, Source of hire, etc.)', cargo: 'RH', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Métricas' },
  { texto: 'Você tem experiência com entrevistas técnicas? Para quais áreas?', cargo: 'RH', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Recrutamento Tech' },
  { texto: 'Qual seu histórico de vagas fechadas por mês/quarter?', cargo: 'RH', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Produtividade' },
];

// ============================================
// 6. FINANCEIRO
// ============================================

const financeiroJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Explique a diferença entre regime de caixa e regime de competência.', cargo: 'Financeiro', nivel: 'junior', categoria: 'conhecimento', competencia: 'Contabilidade Básica' },
  { texto: 'O que é DRE? Quais são seus principais componentes?', cargo: 'Financeiro', nivel: 'junior', categoria: 'conhecimento', competencia: 'Demonstrações' },
  { texto: 'O que você entende por conciliação bancária? Por que é importante?', cargo: 'Financeiro', nivel: 'junior', categoria: 'conhecimento', competencia: 'Conciliação' },

  // Experiência (3)
  { texto: 'Conte sobre sua experiência com rotinas de contas a pagar e receber.', cargo: 'Financeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Operacional' },
  { texto: 'Você já participou de um fechamento contábil? Descreva o processo.', cargo: 'Financeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Fechamento' },
  { texto: 'Descreva uma situação onde você encontrou um erro em lançamentos financeiros.', cargo: 'Financeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise' },

  // Resolução de Problemas (3)
  { texto: 'Você identificou uma divergência na conciliação. Como você investigaria?', cargo: 'Financeiro', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Investigação' },
  { texto: 'O sistema está fora do ar e você precisa fazer pagamentos urgentes. O que faz?', cargo: 'Financeiro', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Contingência' },
  { texto: 'Como você priorizaria pagamentos se houvesse restrição de caixa?', cargo: 'Financeiro', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você lida com a pressão de prazos no fechamento financeiro?', cargo: 'Financeiro', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Gestão de Pressão' },
  { texto: 'Descreva sua atenção a detalhes ao lidar com números.', cargo: 'Financeiro', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Atenção a Detalhes' },
  { texto: 'Como você mantém a confidencialidade de informações financeiras?', cargo: 'Financeiro', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Sigilo' },

  // Qualificações (3)
  { texto: 'Qual seu nível de Excel? Quais funções financeiras você domina?', cargo: 'Financeiro', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Excel' },
  { texto: 'Você tem experiência com algum sistema ERP? Qual?', cargo: 'Financeiro', nivel: 'junior', categoria: 'qualificacoes', competencia: 'ERP' },
  { texto: 'Você tem formação ou cursos na área contábil/financeira?', cargo: 'Financeiro', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Formação' },
];

const financeiroPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Explique como você estrutura um fluxo de caixa projetado.', cargo: 'Financeiro', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Fluxo de Caixa' },
  { texto: 'O que são covenants financeiros? Quais indicadores são mais comuns?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Indicadores' },
  { texto: 'Explique o processo de budget e forecast. Qual a diferença?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Planejamento' },

  // Experiência (4)
  { texto: 'Conte sobre sua experiência com fechamento contábil mensal. Qual era o processo?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Fechamento' },
  { texto: 'Você já participou de uma auditoria? Como foi a preparação?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditoria' },
  { texto: 'Descreva um projeto de melhoria de processo que você implementou na área financeira.', cargo: 'Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Processos' },
  { texto: 'Você tem experiência com gestão de capital de giro? Conte.', cargo: 'Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Capital de Giro' },

  // Resolução de Problemas (3)
  { texto: 'A empresa está com caixa apertado. Que medidas você sugeriria?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Gestão de Caixa' },
  { texto: 'Você identificou inconsistências nos controles internos. Como procederia?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Controles' },
  { texto: 'Como você analisa se uma proposta de investimento é viável?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Análise de Investimentos' },

  // Habilidades Pessoais (3)
  { texto: 'Como você comunica informações financeiras complexas para não-especialistas?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Comunicação' },
  { texto: 'Descreva como você lida com prazos de múltiplas obrigações fiscais.', cargo: 'Financeiro', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Organização' },
  { texto: 'Como você constrói relacionamento com auditores externos?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Relacionamento' },

  // Qualificações (3)
  { texto: 'Você tem experiência com IFRS ou CPC? Quais normas?', cargo: 'Financeiro', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Normas Contábeis' },
  { texto: 'Quais ERPs você já trabalhou? (SAP, TOTVS, Oracle)', cargo: 'Financeiro', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Sistemas' },
  { texto: 'Você tem certificações na área? (CRC, CFA, etc.)', cargo: 'Financeiro', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Certificações' },
];

// ============================================
// 7. ADMINISTRATIVO
// ============================================

const administrativoJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Quais atividades você considera essenciais na rotina administrativa?', cargo: 'Administrativo', nivel: 'junior', categoria: 'conhecimento', competencia: 'Rotinas' },
  { texto: 'O que você entende por gestão documental? Por que é importante?', cargo: 'Administrativo', nivel: 'junior', categoria: 'conhecimento', competencia: 'Documentação' },
  { texto: 'Explique a importância do controle de agenda e compromissos.', cargo: 'Administrativo', nivel: 'junior', categoria: 'conhecimento', competencia: 'Agenda' },

  // Experiência (3)
  { texto: 'Descreva sua experiência com rotinas de escritório.', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Rotinas' },
  { texto: 'Você já organizou eventos ou reuniões? Como foi o processo?', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Eventos' },
  { texto: 'Conte sobre uma situação onde você precisou lidar com documentos importantes.', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Documentos' },

  // Resolução de Problemas (3)
  { texto: 'Como você priorizaria suas tarefas se recebesse várias demandas urgentes ao mesmo tempo?', cargo: 'Administrativo', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },
  { texto: 'O sistema caiu e você precisa registrar informações. O que faria?', cargo: 'Administrativo', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Contingência' },
  { texto: 'Um documento importante não é encontrado. Quais passos você seguiria?', cargo: 'Administrativo', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Organização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você lida com múltiplas solicitações de diferentes pessoas?', cargo: 'Administrativo', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Multitarefa' },
  { texto: 'Descreva como você mantém seu ambiente de trabalho organizado.', cargo: 'Administrativo', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Organização Pessoal' },
  { texto: 'Como você lida quando precisa dizer não a uma solicitação?', cargo: 'Administrativo', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Assertividade' },

  // Qualificações (3)
  { texto: 'Qual seu nível de conhecimento do Pacote Office? (Excel, Word, PowerPoint)', cargo: 'Administrativo', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Office' },
  { texto: 'Você tem experiência com atendimento telefônico profissional?', cargo: 'Administrativo', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Atendimento' },
  { texto: 'Você conhece algum sistema de gestão empresarial?', cargo: 'Administrativo', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Sistemas' },
];

const administrativoPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você estrutura processos administrativos para garantir eficiência?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Processos' },
  { texto: 'O que você entende por compliance administrativo?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Compliance' },
  { texto: 'Como você controla e otimiza custos operacionais?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Custos' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto de melhoria de processos que você liderou.', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria Contínua' },
  { texto: 'Você já gerenciou contratos com fornecedores? Descreva.', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Fornecedores' },
  { texto: 'Descreva sua experiência coordenando equipes administrativas.', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Coordenação' },
  { texto: 'Você participou de implementação de novos sistemas ou processos?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação' },

  // Resolução de Problemas (3)
  { texto: 'Como você identificaria gargalos em processos administrativos?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Análise de Processos' },
  { texto: 'Um fornecedor crítico não entregou no prazo. Como você resolveria?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Gestão de Crise' },
  { texto: 'Como você reduziria custos sem impactar a qualidade do serviço?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Otimização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você gerencia expectativas de diferentes áreas que dependem de você?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Gestão de Stakeholders' },
  { texto: 'Descreva como você treina novos colaboradores nas rotinas.', cargo: 'Administrativo', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Treinamento' },
  { texto: 'Como você mantém a equipe motivada em tarefas repetitivas?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Liderança' },

  // Qualificações (3)
  { texto: 'Você tem experiência com gestão de facilities?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Facilities' },
  { texto: 'Quais sistemas de gestão você já implementou ou gerenciou?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Sistemas' },
  { texto: 'Você tem experiência com indicadores de performance administrativa?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'KPIs' },
];

// ============================================
// 8. ADVOGADO
// ============================================

const advogadoJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Qual área do Direito você tem mais afinidade? Por quê?', cargo: 'Advogado', nivel: 'junior', categoria: 'conhecimento', competencia: 'Especialização' },
  { texto: 'Explique as diferenças entre os principais tipos de processos judiciais.', cargo: 'Advogado', nivel: 'junior', categoria: 'conhecimento', competencia: 'Processo Civil' },
  { texto: 'O que você entende por due diligence? Quando é aplicável?', cargo: 'Advogado', nivel: 'junior', categoria: 'conhecimento', competencia: 'Due Diligence' },

  // Experiência (3)
  { texto: 'Conte sobre sua experiência em estágio ou trabalhos anteriores na área jurídica.', cargo: 'Advogado', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência Profissional' },
  { texto: 'Você já elaborou peças processuais? Quais tipos?', cargo: 'Advogado', nivel: 'junior', categoria: 'experiencia', competencia: 'Redação Jurídica' },
  { texto: 'Descreva uma pesquisa jurídica complexa que você realizou.', cargo: 'Advogado', nivel: 'junior', categoria: 'experiencia', competencia: 'Pesquisa' },

  // Resolução de Problemas (3)
  { texto: 'Como você abordaria um caso onde não encontra jurisprudência favorável?', cargo: 'Advogado', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Estratégia' },
  { texto: 'Um prazo processual está próximo e você não finalizou a peça. O que faria?', cargo: 'Advogado', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Gestão de Prazos' },
  { texto: 'Como você priorizaria múltiplos processos com prazos próximos?', cargo: 'Advogado', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você se mantém atualizado com mudanças na legislação?', cargo: 'Advogado', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Atualização' },
  { texto: 'Descreva como você organizava seus estudos durante a faculdade.', cargo: 'Advogado', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Disciplina' },
  { texto: 'Como você lida com a pressão de prazos processuais?', cargo: 'Advogado', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Gestão de Pressão' },

  // Qualificações (3)
  { texto: 'Você possui OAB? Em qual(is) estado(s)?', cargo: 'Advogado', nivel: 'junior', categoria: 'qualificacoes', competencia: 'OAB' },
  { texto: 'Você tem experiência com sistemas jurídicos? (PJe, PROJUDI, etc.)', cargo: 'Advogado', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Sistemas Jurídicos' },
  { texto: 'Você tem inglês jurídico? Já trabalhou com contratos internacionais?', cargo: 'Advogado', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Idiomas' },
];

const advogadoPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você estrutura uma estratégia processual para um caso complexo?', cargo: 'Advogado', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Estratégia Processual' },
  { texto: 'Explique sua experiência com a área de sua especialização.', cargo: 'Advogado', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Especialização' },
  { texto: 'Como você analisa riscos jurídicos em operações comerciais?', cargo: 'Advogado', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Análise de Riscos' },

  // Experiência (4)
  { texto: 'Conte sobre um caso de sucesso que você conduziu. Qual foi a estratégia?', cargo: 'Advogado', nivel: 'pleno', categoria: 'experiencia', competencia: 'Casos de Sucesso' },
  { texto: 'Você já participou de negociações ou mediações? Descreva.', cargo: 'Advogado', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação' },
  { texto: 'Descreva sua experiência na elaboração de contratos complexos.', cargo: 'Advogado', nivel: 'pleno', categoria: 'experiencia', competencia: 'Contratos' },
  { texto: 'Você já atuou em audiências ou sustentações orais? Como foi?', cargo: 'Advogado', nivel: 'pleno', categoria: 'experiencia', competencia: 'Contencioso' },

  // Resolução de Problemas (3)
  { texto: 'Como você equilibra a defesa dos interesses do cliente com limites éticos?', cargo: 'Advogado', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Ética' },
  { texto: 'Um cliente quer seguir uma estratégia que você considera arriscada. O que faz?', cargo: 'Advogado', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Aconselhamento' },
  { texto: 'Como você aborda um caso onde o cliente tem expectativas irreais?', cargo: 'Advogado', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Gestão de Expectativas' },

  // Habilidades Pessoais (3)
  { texto: 'Como você explica conceitos jurídicos complexos para clientes leigos?', cargo: 'Advogado', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Comunicação' },
  { texto: 'Descreva como você gerencia múltiplos processos simultaneamente.', cargo: 'Advogado', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Gestão de Carteira' },
  { texto: 'Como você constrói relacionamento de confiança com clientes?', cargo: 'Advogado', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Relacionamento' },

  // Qualificações (3)
  { texto: 'Você tem pós-graduação ou especialização? Em qual área?', cargo: 'Advogado', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Formação' },
  { texto: 'Quantos processos você gerencia atualmente? Qual o porte?', cargo: 'Advogado', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Volume' },
  { texto: 'Você tem experiência com Tribunais Superiores?', cargo: 'Advogado', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Tribunais' },
];

// ============================================
// 9. ENFERMEIRO / SAÚDE
// ============================================

const enfermeiroJunior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Explique os principais protocolos de segurança do paciente que você conhece.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'conhecimento', competencia: 'Segurança' },
  { texto: 'Quais são os sinais vitais e sua importância no cuidado ao paciente?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'conhecimento', competencia: 'Sinais Vitais' },
  { texto: 'O que você entende por humanização no atendimento de saúde?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'conhecimento', competencia: 'Humanização' },

  // Experiência (3)
  { texto: 'Conte sobre sua experiência em estágios ou trabalhos anteriores na área de saúde.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência' },
  { texto: 'Você já participou de procedimentos de emergência? Descreva.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Emergência' },
  { texto: 'Descreva uma situação onde você precisou lidar com um paciente difícil.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Paciente Difícil' },

  // Resolução de Problemas (3)
  { texto: 'Como você agiria se identificasse uma alteração significativa nos sinais vitais de um paciente?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Tomada de Decisão' },
  { texto: 'O médico não está disponível e o paciente precisa de cuidados. O que você faz?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Autonomia' },
  { texto: 'Como você priorizaria o cuidado de múltiplos pacientes com diferentes necessidades?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'resolucao_problemas', competencia: 'Priorização' },

  // Habilidades Pessoais (3)
  { texto: 'Como você lida com o estresse emocional de trabalhar com pacientes graves?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Inteligência Emocional' },
  { texto: 'Descreva como você demonstra empatia ao cuidar de pacientes.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Empatia' },
  { texto: 'Como você se comunica com familiares de pacientes em situações difíceis?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'habilidades_pessoais', competencia: 'Comunicação' },

  // Qualificações (3)
  { texto: 'Você possui COREN ativo? Em qual estado?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'qualificacoes', competencia: 'COREN' },
  { texto: 'Quais cursos ou certificações você possui? (ACLS, BLS, etc.)', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Certificações' },
  { texto: 'Você tem disponibilidade para trabalhar em plantões noturnos ou finais de semana?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'qualificacoes', competencia: 'Disponibilidade' },
];

const enfermeiroPleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você implementa protocolos de prevenção de infecção hospitalar?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'conhecimento', competencia: 'CCIH' },
  { texto: 'Explique sua experiência com SAE (Sistematização da Assistência de Enfermagem).', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'conhecimento', competencia: 'SAE' },
  { texto: 'Como você gerencia medicamentos de alto risco?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Medicamentos' },

  // Experiência (4)
  { texto: 'Conte sobre sua experiência liderando equipes de enfermagem.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Liderança' },
  { texto: 'Você já participou de acreditações hospitalares? Como foi o processo?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Acreditação' },
  { texto: 'Descreva uma situação de emergência crítica que você gerenciou.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Emergência Crítica' },
  { texto: 'Você tem experiência com gestão de leitos ou escalas?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão' },

  // Resolução de Problemas (3)
  { texto: 'Como você lida com conflitos entre membros da equipe de enfermagem?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Gestão de Conflitos' },
  { texto: 'Um evento adverso ocorreu com um paciente. Quais são seus próximos passos?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Eventos Adversos' },
  { texto: 'Como você otimiza o fluxo de atendimento quando há superlotação?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Fluxo' },

  // Habilidades Pessoais (3)
  { texto: 'Como você desenvolve e treina sua equipe de enfermagem?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Desenvolvimento' },
  { texto: 'Descreva como você mantém a equipe motivada em situações de alta pressão.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Motivação' },
  { texto: 'Como você se comunica com a equipe médica em situações de discordância?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Comunicação Multiprofissional' },

  // Qualificações (3)
  { texto: 'Você tem especialização em alguma área? Qual?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Especialização' },
  { texto: 'Quais setores hospitalares você já atuou? (UTI, Centro Cirúrgico, Emergência, etc.)', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Setores' },
  { texto: 'Você tem experiência com sistemas hospitalares? (Tasy, MV, etc.)', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Sistemas' },
];

// ============================================
// 10. GERENTE / GESTOR
// ============================================

const gerentePleno: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você estrutura a definição de metas para sua equipe?', cargo: 'Gerente', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Gestão de Metas' },
  { texto: 'Quais metodologias de gestão você conhece e aplica? (OKR, Scrum, etc.)', cargo: 'Gerente', nivel: 'pleno', categoria: 'conhecimento', competencia: 'Metodologias' },
  { texto: 'Como você estrutura reuniões de one-on-one com sua equipe?', cargo: 'Gerente', nivel: 'pleno', categoria: 'conhecimento', competencia: 'One-on-One' },

  // Experiência (4)
  { texto: 'Conte sobre sua experiência liderando equipes. Quantas pessoas você já gerenciou?', cargo: 'Gerente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Liderança' },
  { texto: 'Descreva uma situação onde você teve que demitir alguém. Como você conduziu?', cargo: 'Gerente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desligamento' },
  { texto: 'Conte sobre um projeto que você liderou do início ao fim.', cargo: 'Gerente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Você já participou de uma reestruturação de equipe? Como foi?', cargo: 'Gerente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reestruturação' },

  // Resolução de Problemas (3)
  { texto: 'Um membro da equipe está underperforming. Como você aborda isso?', cargo: 'Gerente', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Performance' },
  { texto: 'Há conflito entre dois membros sêniores da equipe. O que você faz?', cargo: 'Gerente', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Conflitos' },
  { texto: 'Sua equipe está sobrecarregada e os prazos são inamovíveis. Como você resolve?', cargo: 'Gerente', nivel: 'pleno', categoria: 'resolucao_problemas', competencia: 'Sobrecarga' },

  // Habilidades Pessoais (3)
  { texto: 'Como você dá feedback negativo para membros da equipe?', cargo: 'Gerente', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Feedback' },
  { texto: 'Descreva seu estilo de liderança e como ele evoluiu.', cargo: 'Gerente', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Estilo de Liderança' },
  { texto: 'Como você desenvolve pessoas que têm potencial para crescer?', cargo: 'Gerente', nivel: 'pleno', categoria: 'habilidades_pessoais', competencia: 'Desenvolvimento' },

  // Qualificações (3)
  { texto: 'Você tem formação ou certificações em gestão?', cargo: 'Gerente', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Formação' },
  { texto: 'Quais ferramentas de gestão de projetos você domina?', cargo: 'Gerente', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Ferramentas' },
  { texto: 'Você tem experiência com gestão de orçamento de área?', cargo: 'Gerente', nivel: 'pleno', categoria: 'qualificacoes', competencia: 'Budget' },
];

const gerenteSenior: PerguntaSeed[] = [
  // Conhecimento (3)
  { texto: 'Como você alinha a estratégia do seu departamento com os objetivos da empresa?', cargo: 'Gerente', nivel: 'senior', categoria: 'conhecimento', competencia: 'Estratégia' },
  { texto: 'Explique sua abordagem para planejamento de headcount e budget.', cargo: 'Gerente', nivel: 'senior', categoria: 'conhecimento', competencia: 'Planejamento' },
  { texto: 'Como você estrutura a governança e os processos de sua área?', cargo: 'Gerente', nivel: 'senior', categoria: 'conhecimento', competencia: 'Governança' },

  // Experiência (4)
  { texto: 'Conte sobre uma transformação significativa que você liderou.', cargo: 'Gerente', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação' },
  { texto: 'Você já construiu uma equipe do zero? Descreva o processo.', cargo: 'Gerente', nivel: 'senior', categoria: 'experiencia', competencia: 'Building Team' },
  { texto: 'Descreva uma situação de crise que você gerenciou como líder.', cargo: 'Gerente', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },
  { texto: 'Você já liderou integrações pós M&A? Como foi?', cargo: 'Gerente', nivel: 'senior', categoria: 'experiencia', competencia: 'M&A' },

  // Resolução de Problemas (3)
  { texto: 'Como você toma decisões difíceis que afetam negativamente algumas pessoas?', cargo: 'Gerente', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Decisões Difíceis' },
  { texto: 'Sua área precisa reduzir custos em 20%. Como você abordaria?', cargo: 'Gerente', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Redução de Custos' },
  { texto: 'Como você prioriza iniciativas quando tudo parece urgente e importante?', cargo: 'Gerente', nivel: 'senior', categoria: 'resolucao_problemas', competencia: 'Priorização Estratégica' },

  // Habilidades Pessoais (3)
  { texto: 'Como você influencia decisões em níveis superiores da organização?', cargo: 'Gerente', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Influência' },
  { texto: 'Descreva como você constrói cultura em sua área de atuação.', cargo: 'Gerente', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Cultura' },
  { texto: 'Como você equilibra as demandas do negócio com o bem-estar da equipe?', cargo: 'Gerente', nivel: 'senior', categoria: 'habilidades_pessoais', competencia: 'Equilíbrio' },

  // Qualificações (2)
  { texto: 'Você tem MBA ou formação executiva? Em qual área?', cargo: 'Gerente', nivel: 'senior', categoria: 'qualificacoes', competencia: 'MBA' },
  { texto: 'Qual o maior orçamento anual que você já foi responsável?', cargo: 'Gerente', nivel: 'senior', categoria: 'qualificacoes', competencia: 'Budget' },
];

// ============================================
// CONSOLIDAÇÃO
// ============================================

export const todasAsPerguntas: PerguntaSeed[] = [
  // Desenvolvedor (45 perguntas)
  ...desenvolvedorJunior,
  ...desenvolvedorPleno,
  ...desenvolvedorSenior,

  // Vendedor (45 perguntas)
  ...vendedorJunior,
  ...vendedorPleno,
  ...vendedorSenior,

  // Atendimento/CS (30 perguntas)
  ...atendimentoJunior,
  ...csPleno,

  // Marketing (30 perguntas)
  ...marketingJunior,
  ...marketingPleno,

  // RH (30 perguntas)
  ...rhJunior,
  ...rhPleno,

  // Financeiro (30 perguntas)
  ...financeiroJunior,
  ...financeiroPleno,

  // Administrativo (30 perguntas)
  ...administrativoJunior,
  ...administrativoPleno,

  // Advogado (30 perguntas)
  ...advogadoJunior,
  ...advogadoPleno,

  // Enfermeiro (30 perguntas)
  ...enfermeiroJunior,
  ...enfermeiroPleno,

  // Gerente (30 perguntas)
  ...gerentePleno,
  ...gerenteSenior,
];

// ============================================
// ESTATÍSTICAS
// ============================================

export const estatisticas = {
  totalPerguntas: todasAsPerguntas.length,

  porCargo: {
    Desenvolvedor: todasAsPerguntas.filter(p => p.cargo === 'Desenvolvedor').length,
    Vendedor: todasAsPerguntas.filter(p => p.cargo === 'Vendedor').length,
    Atendimento: todasAsPerguntas.filter(p => p.cargo === 'Atendimento').length,
    'Customer Success': todasAsPerguntas.filter(p => p.cargo === 'Customer Success').length,
    Marketing: todasAsPerguntas.filter(p => p.cargo === 'Marketing').length,
    RH: todasAsPerguntas.filter(p => p.cargo === 'RH').length,
    Financeiro: todasAsPerguntas.filter(p => p.cargo === 'Financeiro').length,
    Administrativo: todasAsPerguntas.filter(p => p.cargo === 'Administrativo').length,
    Advogado: todasAsPerguntas.filter(p => p.cargo === 'Advogado').length,
    Enfermeiro: todasAsPerguntas.filter(p => p.cargo === 'Enfermeiro').length,
    Gerente: todasAsPerguntas.filter(p => p.cargo === 'Gerente').length,
  },

  porCategoria: {
    conhecimento: todasAsPerguntas.filter(p => p.categoria === 'conhecimento').length,
    experiencia: todasAsPerguntas.filter(p => p.categoria === 'experiencia').length,
    resolucao_problemas: todasAsPerguntas.filter(p => p.categoria === 'resolucao_problemas').length,
    habilidades_pessoais: todasAsPerguntas.filter(p => p.categoria === 'habilidades_pessoais').length,
    qualificacoes: todasAsPerguntas.filter(p => p.categoria === 'qualificacoes').length,
  },

  porNivel: {
    junior: todasAsPerguntas.filter(p => p.nivel === 'junior').length,
    pleno: todasAsPerguntas.filter(p => p.nivel === 'pleno').length,
    senior: todasAsPerguntas.filter(p => p.nivel === 'senior').length,
  },

  cargosDisponiveis: [
    'Desenvolvedor',
    'Vendedor',
    'Atendimento',
    'Customer Success',
    'Marketing',
    'RH',
    'Financeiro',
    'Administrativo',
    'Advogado',
    'Enfermeiro',
    'Gerente',
  ],
};
