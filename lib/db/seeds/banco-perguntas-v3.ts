/**
 * Banco de Perguntas v3
 *
 * 23 cargos estratégicos para clientes como LBCA e Carrefour
 * 15-20 perguntas por cargo (sem divisão por nível - mais flexível)
 * 4 categorias: tecnica, experiencia, comportamental, situacional
 *
 * Total aproximado: ~350 perguntas
 */

export interface PerguntaSeed {
  texto: string;
  cargo: string;
  nivel: string;
  categoria: 'tecnica' | 'experiencia' | 'comportamental' | 'situacional';
  competencia?: string;
}

// ============================================
// TECNOLOGIA
// ============================================

const desenvolvedorFrontend: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a diferença entre CSS Flexbox e Grid. Quando usar cada um?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'CSS' },
  { texto: 'O que são React Hooks? Cite os principais e explique quando usar cada um.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'React' },
  { texto: 'Qual a diferença entre Server-Side Rendering (SSR) e Client-Side Rendering (CSR)?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Performance' },
  { texto: 'O que é o Virtual DOM e por que frameworks como React o utilizam?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'React' },
  { texto: 'Quais ferramentas você usa para garantir qualidade de código? (ESLint, Prettier, TypeScript)', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Ferramentas' },

  // Experiência (5)
  { texto: 'Conte sobre um projeto front-end desafiador que você desenvolveu. Quais foram os principais obstáculos?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva uma situação onde você precisou otimizar a performance de uma aplicação web.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance' },
  { texto: 'Você já trabalhou com design systems ou component libraries? Como foi a experiência?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Design System' },
  { texto: 'Conte sobre um bug complexo de UI que você resolveu. Qual foi sua abordagem?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Debugging' },
  { texto: 'Já participou de code reviews? Como você aborda dar e receber feedback sobre código?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Code Review' },

  // Comportamental (4)
  { texto: 'Como você lida com mudanças frequentes de requisitos durante o desenvolvimento?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { texto: 'Como você se comunica com designers quando há divergências sobre implementação?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você se mantém atualizado com as mudanças rápidas do ecossistema front-end?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado' },
  { texto: 'Como você lida com prazos apertados sem comprometer a qualidade do código?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },

  // Situacional (4)
  { texto: 'O site está lento em produção. Como você investigaria e resolveria o problema?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Troubleshooting' },
  { texto: 'Um componente precisa funcionar em browsers antigos. Como você abordaria essa compatibilidade?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Compatibilidade' },
  { texto: 'Como você estruturaria um novo projeto React do zero? Quais decisões arquiteturais tomaria?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Arquitetura' },
  { texto: 'O designer entregou um layout que você considera difícil de implementar. Como procederia?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
];

const desenvolvedorBackend: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a diferença entre REST e GraphQL. Quando usar cada abordagem?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'APIs' },
  { texto: 'O que são os princípios SOLID? Como você os aplica no dia a dia?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design Patterns' },
  { texto: 'Explique a diferença entre SQL e NoSQL. Quando escolher cada tipo de banco?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Banco de Dados' },
  { texto: 'O que é Docker e qual a vantagem de usar containers no desenvolvimento?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'DevOps' },
  { texto: 'O que são testes unitários, de integração e E2E? Como você decide o que testar?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Testes' },

  // Experiência (5)
  { texto: 'Conte sobre uma API complexa que você desenvolveu. Quais foram os desafios?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'APIs' },
  { texto: 'Descreva uma situação onde você precisou otimizar queries lentas no banco de dados.', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance' },
  { texto: 'Você já lidou com problemas de escalabilidade? Como resolveu?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Escalabilidade' },
  { texto: 'Conte sobre um incidente em produção que você ajudou a resolver. Qual foi o processo?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Incident Response' },
  { texto: 'Já implementou autenticação/autorização em uma aplicação? Qual abordagem usou?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Segurança' },

  // Comportamental (4)
  { texto: 'Como você documenta suas APIs para que outros desenvolvedores possam usar?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Documentação' },
  { texto: 'Como você lida com débito técnico? Como equilibra com entregas de novas features?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão Técnica' },
  { texto: 'Como você explica decisões técnicas para pessoas não-técnicas?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você mentora ou ajuda desenvolvedores menos experientes?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },

  // Situacional (4)
  { texto: 'A API está retornando erros intermitentes. Como você investigaria?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Debugging' },
  { texto: 'Como você migraria um sistema monolítico para microsserviços?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Arquitetura' },
  { texto: 'Um endpoint precisa processar milhões de registros. Como você abordaria?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Performance' },
  { texto: 'Como você projetaria um sistema de filas para processar tarefas assíncronas?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Arquitetura' },
];

const cientistaDeDados: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a diferença entre aprendizado supervisionado e não-supervisionado.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Machine Learning' },
  { texto: 'O que é overfitting e como você o previne em seus modelos?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Machine Learning' },
  { texto: 'Quais métricas você usa para avaliar um modelo de classificação vs regressão?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas' },
  { texto: 'Explique o que é feature engineering e dê exemplos de técnicas que você usa.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Feature Engineering' },
  { texto: 'Quais bibliotecas e ferramentas você utiliza no dia a dia? (pandas, scikit-learn, etc)', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Ferramentas' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto de data science que gerou impacto real no negócio.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva um modelo que você colocou em produção. Quais foram os desafios?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'MLOps' },
  { texto: 'Já trabalhou com dados muito sujos ou incompletos? Como lidou com isso?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Data Cleaning' },
  { texto: 'Conte sobre uma análise exploratória que revelou insights inesperados.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'EDA' },

  // Comportamental (4)
  { texto: 'Como você comunica resultados técnicos para stakeholders não-técnicos?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você prioriza projetos quando há múltiplas demandas da empresa?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Priorização' },
  { texto: 'Como você lida quando um modelo não performa como esperado em produção?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Como você se mantém atualizado com os avanços em ML e IA?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado' },

  // Situacional (4)
  { texto: 'O negócio precisa de uma previsão de vendas. Como você abordaria o problema?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Modelagem' },
  { texto: 'Descobriram viés no seu modelo em produção. Quais são os próximos passos?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética' },
  { texto: 'Como você validaria se um modelo está realmente agregando valor ao negócio?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Métricas de Negócio' },
  { texto: 'Os dados necessários para um projeto não existem. O que você faria?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Problem Solving' },
];

const qa: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Qual a diferença entre testes funcionais e não-funcionais? Dê exemplos.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Tipos de Teste' },
  { texto: 'Explique a pirâmide de testes. Como você a aplica na prática?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Estratégia de Testes' },
  { texto: 'Quais ferramentas de automação você domina? (Selenium, Cypress, Playwright)', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Automação' },
  { texto: 'O que é BDD? Você já trabalhou com Gherkin/Cucumber?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'BDD' },
  { texto: 'Como você planeja a cobertura de testes para uma nova feature?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento' },

  // Experiência (4)
  { texto: 'Conte sobre um bug crítico que você encontrou. Como foi o processo de descoberta?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Bug Finding' },
  { texto: 'Descreva um projeto de automação de testes que você liderou ou participou.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Automação' },
  { texto: 'Já trabalhou em ambiente ágil? Como era sua participação nas cerimônias?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Agile' },
  { texto: 'Conte sobre uma situação onde você precisou testar com tempo muito limitado.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Tempo' },

  // Comportamental (4)
  { texto: 'Como você se comunica com desenvolvedores ao reportar bugs?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você lida quando um bug que você aprovou vai para produção?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Responsabilidade' },
  { texto: 'Como você equilibra qualidade com velocidade de entrega?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trade-offs' },
  { texto: 'Como você defende a importância de testes quando há pressão por prazos?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Advocacy' },

  // Situacional (4)
  { texto: 'Uma release urgente precisa ir para produção. Como você priorizaria os testes?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Priorização' },
  { texto: 'Os testes automatizados estão falhando intermitentemente. Como investigaria?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Debugging' },
  { texto: 'Como você testaria uma integração com sistema externo que não tem ambiente de teste?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Estratégia' },
  { texto: 'O desenvolvedor discorda que algo é um bug. Como você procederia?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
];

const suporteTecnico: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Quais sistemas operacionais você tem experiência? (Windows, Linux, macOS)', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas Operacionais' },
  { texto: 'Explique como funciona o modelo OSI de redes. Quais camadas você conhece?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Redes' },
  { texto: 'Quais ferramentas de acesso remoto você já utilizou? (TeamViewer, AnyDesk, etc)', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Ferramentas' },
  { texto: 'O que você verificaria se um computador estivesse muito lento?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Troubleshooting' },

  // Experiência (4)
  { texto: 'Conte sobre um problema técnico complexo que você resolveu para um usuário.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução' },
  { texto: 'Já trabalhou com sistema de tickets? Como você organizava suas demandas?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Gestão de Tickets' },
  { texto: 'Descreva uma situação onde você precisou aprender uma tecnologia nova rapidamente.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { texto: 'Você já criou documentação ou base de conhecimento? Como foi o processo?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Documentação' },

  // Comportamental (4)
  { texto: 'Como você explica problemas técnicos para usuários sem conhecimento de TI?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você mantém a calma quando um usuário está muito frustrado?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Inteligência Emocional' },
  { texto: 'Como você prioriza quando tem vários chamados urgentes ao mesmo tempo?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Priorização' },
  { texto: 'Como você lida com usuários que não seguem suas instruções?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Paciência' },

  // Situacional (4)
  { texto: 'Um executivo não consegue acessar o sistema antes de uma reunião importante. O que você faz?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Urgência' },
  { texto: 'Você não sabe resolver um problema e não há ninguém para escalar. Como procede?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { texto: 'Um mesmo problema está acontecendo com vários usuários. Qual sua abordagem?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Análise' },
  { texto: 'O usuário insiste que o problema é de TI, mas você suspeita que não é. Como resolve?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Diagnóstico' },
];

const coordenadorTecnologia: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Como você avalia e decide adotar novas tecnologias para a equipe?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação Tecnológica' },
  { texto: 'Quais metodologias ágeis você conhece? Como você as implementa na prática?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Metodologias' },
  { texto: 'Como você estrutura a arquitetura de sistemas para suportar o crescimento do negócio?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura' },
  { texto: 'Quais métricas você usa para medir a produtividade e qualidade da equipe técnica?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Métricas' },

  // Experiência (5)
  { texto: 'Conte sobre uma transformação tecnológica significativa que você liderou.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança' },
  { texto: 'Descreva como você construiu ou reestruturou uma equipe de tecnologia.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Building Team' },
  { texto: 'Conte sobre um projeto que fracassou. O que você aprendeu?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { texto: 'Já gerenciou orçamento de tecnologia? Como você planeja investimentos?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Budget' },
  { texto: 'Descreva sua experiência com gestão de fornecedores de tecnologia.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Vendor Management' },

  // Comportamental (4)
  { texto: 'Como você equilibra demandas técnicas com expectativas do negócio?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio' },
  { texto: 'Como você desenvolve e retém talentos na sua equipe?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Pessoas' },
  { texto: 'Como você lida com resistência a mudanças tecnológicas na organização?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Change Management' },
  { texto: 'Como você comunica decisões técnicas para a alta liderança?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },

  // Situacional (4)
  { texto: 'A equipe está sobrecarregada e há pressão por mais entregas. O que você faz?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Carga' },
  { texto: 'Um sistema crítico caiu em produção. Como você gerencia a crise?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Dois membros sêniores da equipe estão em conflito. Como você intervém?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Resolução de Conflitos' },
  { texto: 'O CEO quer um projeto impossível em prazo irreal. Como você negocia?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação' },
];

// ============================================
// JURÍDICO (FOCO LBCA)
// ============================================

const advogadoTrabalhista: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique as principais mudanças trazidas pela Reforma Trabalhista de 2017.', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Legislação' },
  { texto: 'Qual a diferença entre rescisão por justa causa e sem justa causa? Quais verbas são devidas?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Rescisão' },
  { texto: 'O que caracteriza vínculo empregatício? Quais os requisitos?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Vínculo' },
  { texto: 'Explique o que é e como funciona o processo trabalhista no rito sumaríssimo.', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Processo' },
  { texto: 'Quais são os principais direitos do trabalhador em caso de acidente de trabalho?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Acidente de Trabalho' },

  // Experiência (4)
  { texto: 'Conte sobre um caso trabalhista complexo que você atuou. Qual foi a estratégia?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Casos' },
  { texto: 'Já participou de audiências trabalhistas? Descreva sua experiência.', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Audiências' },
  { texto: 'Você já elaborou defesas em reclamatórias trabalhistas? Como foi o processo?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Defesa' },
  { texto: 'Já atuou em negociações coletivas ou com sindicatos? Descreva.', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação Coletiva' },

  // Comportamental (4)
  { texto: 'Como você explica riscos trabalhistas para gestores de RH ou empresários?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você lida com a pressão de múltiplos prazos processuais simultâneos?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Organização' },
  { texto: 'Como você se mantém atualizado com jurisprudências e mudanças na CLT?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização' },
  { texto: 'Como você lida com clientes que têm expectativas irreais sobre o caso?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Expectativas' },

  // Situacional (4)
  { texto: 'Um cliente quer demitir um funcionário doente. Como você o orientaria?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Consultivo' },
  { texto: 'Descobriu um erro no cálculo de verbas rescisórias após a homologação. O que fazer?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Correção' },
  { texto: 'Como você conduziria a defesa de uma empresa acusada de assédio moral?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Estratégia' },
  { texto: 'O sindicato ameaça greve. Como você orientaria a empresa?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
];

const advogadoCivil: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a diferença entre responsabilidade civil contratual e extracontratual.', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Responsabilidade Civil' },
  { texto: 'O que são contratos de adesão e quais cuidados especiais eles requerem?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Contratos' },
  { texto: 'Quais são os requisitos para caracterizar dano moral indenizável?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Dano Moral' },
  { texto: 'Explique as diferenças entre usucapião ordinário e extraordinário.', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Direito Real' },
  { texto: 'Qual a diferença entre prescrição e decadência no direito civil?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Prescrição' },

  // Experiência (4)
  { texto: 'Conte sobre um caso cível complexo em que você atuou. Qual foi o desfecho?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Casos' },
  { texto: 'Já elaborou contratos comerciais de alto valor? Descreva sua experiência.', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Contratos' },
  { texto: 'Você já participou de mediações ou conciliações cíveis? Como foi?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Mediação' },
  { texto: 'Conte sobre uma negociação extrajudicial bem-sucedida que você conduziu.', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação' },

  // Comportamental (4)
  { texto: 'Como você prioriza casos quando há múltiplos prazos se aproximando?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Organização' },
  { texto: 'Como você constrói relacionamento de confiança com clientes?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento' },
  { texto: 'Como você lida com casos que exigem conhecimento de áreas que você domina menos?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado' },
  { texto: 'Como você reage quando discorda da estratégia proposta por um colega sênior?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },

  // Situacional (4)
  { texto: 'Um contrato importante está prestes a vencer e o cliente quer renegociar. Como procede?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
  { texto: 'O cliente quer seguir uma estratégia que você considera arriscada. O que faz?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Aconselhamento' },
  { texto: 'Você identificou uma cláusula abusiva em contrato assinado pelo cliente. Como age?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise' },
  { texto: 'A parte contrária propôs um acordo desfavorável. Como você avalia e orienta o cliente?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Avaliação' },
];

const advogadoCriminal: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a diferença entre crime doloso e culposo.', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Teoria do Crime' },
  { texto: 'Quais são as hipóteses de prisão preventiva e quando ela é cabível?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Prisão' },
  { texto: 'O que caracteriza legítima defesa e quais seus requisitos?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Excludentes' },
  { texto: 'Explique o princípio da presunção de inocência e sua aplicação prática.', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Princípios' },
  { texto: 'Qual a diferença entre suspensão condicional do processo e transação penal?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Benefícios Penais' },

  // Experiência (4)
  { texto: 'Conte sobre um caso criminal desafiador em que você atuou na defesa.', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Casos' },
  { texto: 'Já participou de júris populares? Descreva sua experiência.', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Tribunal do Júri' },
  { texto: 'Você já impetrou habeas corpus? Em que situação e qual foi o resultado?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Habeas Corpus' },
  { texto: 'Conte sobre uma situação onde você precisou agir rapidamente para proteger um cliente.', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Urgência' },

  // Comportamental (4)
  { texto: 'Como você lida emocionalmente com casos de crimes graves?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Inteligência Emocional' },
  { texto: 'Como você mantém a ética ao defender alguém que você acredita ser culpado?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética' },
  { texto: 'Como você se relaciona com promotores e juízes mantendo o profissionalismo?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento' },
  { texto: 'Como você gerencia a ansiedade e pressão em casos de grande repercussão?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pressão' },

  // Situacional (4)
  { texto: 'Seu cliente quer confessar algo que você sabe que pode prejudicá-lo. Como orienta?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Aconselhamento' },
  { texto: 'A polícia está interrogando seu cliente sem sua presença. O que você faz?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Defesa de Direitos' },
  { texto: 'Você descobre nova prova que pode mudar o caso às vésperas do julgamento. Como procede?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Estratégia' },
  { texto: 'O Ministério Público oferece acordo de delação. Como avalia com o cliente?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
];

const advogadoTributario: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a diferença entre tributos diretos e indiretos. Dê exemplos.', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistema Tributário' },
  { texto: 'Quais são os regimes tributários disponíveis para empresas no Brasil?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Regimes' },
  { texto: 'O que é elisão fiscal e como ela se diferencia de evasão fiscal?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento' },
  { texto: 'Explique o que é CARF e como funciona o processo administrativo tributário.', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Processo Administrativo' },
  { texto: 'Quais os principais tributos que incidem sobre operações de importação?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Comércio Exterior' },

  // Experiência (4)
  { texto: 'Conte sobre um planejamento tributário que gerou economia significativa para um cliente.', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Planejamento' },
  { texto: 'Já atuou em defesas em execuções fiscais? Descreva sua experiência.', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Execução Fiscal' },
  { texto: 'Você já participou de processos no CARF? Como foi?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'CARF' },
  { texto: 'Conte sobre uma recuperação de créditos tributários que você conduziu.', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Créditos' },

  // Comportamental (4)
  { texto: 'Como você se mantém atualizado com as constantes mudanças na legislação tributária?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização' },
  { texto: 'Como você explica questões tributárias complexas para clientes leigos?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você lida com a pressão de auditorias e fiscalizações?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pressão' },
  { texto: 'Como você trabalha em conjunto com contadores e consultores financeiros?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (4)
  { texto: 'O cliente recebeu auto de infração milionário. Qual sua primeira abordagem?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Defesa' },
  { texto: 'Como você avaliaria se um cliente deve aderir a um REFIS?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise' },
  { texto: 'O cliente quer fazer uma operação que você considera de alto risco fiscal. Como orienta?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Aconselhamento' },
  { texto: 'Uma nova tese tributária pode beneficiar o cliente. Como você avalia o risco-benefício?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise de Risco' },
];

const analistaJuridico: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Quais sistemas jurídicos você conhece? (PJe, PROJUDI, e-SAJ)', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas' },
  { texto: 'Como você organiza e controla prazos processuais?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Prazos' },
  { texto: 'Quais tipos de petições e documentos jurídicos você já elaborou?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentos' },
  { texto: 'Você tem experiência com pesquisa jurisprudencial? Quais bases utiliza?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'tecnica', competencia: 'Pesquisa' },

  // Experiência (4)
  { texto: 'Conte sobre sua experiência apoiando advogados em casos complexos.', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'experiencia', competencia: 'Suporte' },
  { texto: 'Já gerenciou a organização de arquivos e documentos de um escritório?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'experiencia', competencia: 'Organização' },
  { texto: 'Descreva uma situação onde você identificou um erro antes que causasse problemas.', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'experiencia', competencia: 'Atenção a Detalhes' },
  { texto: 'Você já atendeu clientes do escritório? Como foi a experiência?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },

  // Comportamental (4)
  { texto: 'Como você lida com informações confidenciais dos clientes?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'comportamental', competencia: 'Confidencialidade' },
  { texto: 'Como você se organiza quando tem múltiplas demandas urgentes?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { texto: 'Como você lida com a pressão de prazos processuais inadiáveis?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'comportamental', competencia: 'Pressão' },
  { texto: 'Como você se comunica com advogados quando precisa de orientação?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },

  // Situacional (4)
  { texto: 'Descobriu que um prazo importante está vencendo hoje. O que você faz?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'situacional', competencia: 'Urgência' },
  { texto: 'O advogado responsável está indisponível e o cliente precisa de informações. Como procede?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { texto: 'Encontrou uma inconsistência em um documento que será protocolado. O que faz?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'situacional', competencia: 'Qualidade' },
  { texto: 'O sistema está fora do ar próximo ao vencimento de um prazo. Como age?', cargo: 'Analista Jurídico / Paralegal', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
];

// ============================================
// VAREJO (FOCO CARREFOUR)
// ============================================

const operadorCaixa: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Você tem experiência com sistemas de PDV (ponto de venda)?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas' },
  { texto: 'Como você confere se o troco está correto antes de entregar ao cliente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Conferência' },
  { texto: 'Quais formas de pagamento você já trabalhou? (dinheiro, cartão, PIX)', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Pagamentos' },
  { texto: 'O que você faz ao identificar uma nota possivelmente falsa?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança' },

  // Experiência (3)
  { texto: 'Conte sobre sua experiência anterior como operador de caixa.', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência' },
  { texto: 'Descreva uma situação onde você atendeu um cliente muito satisfeito.', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },
  { texto: 'Já trabalhou em períodos de alto movimento como Natal ou Black Friday?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Alto Fluxo' },

  // Comportamental (4)
  { texto: 'Como você mantém a calma quando há fila grande e clientes impacientes?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Pressão' },
  { texto: 'Como você lida com um cliente que reclama do preço ou de um erro?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Reclamações' },
  { texto: 'O que você faz para manter a atenção e evitar erros durante o turno?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Concentração' },
  { texto: 'Como você trabalha com colegas para manter o fluxo do caixa eficiente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (4)
  { texto: 'O sistema do caixa travou com cliente esperando. O que você faz?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
  { texto: 'Um cliente quer pagar com cartão mas a máquina não está aceitando. Como procede?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Resolução' },
  { texto: 'No fechamento do caixa, faltou dinheiro. O que você faz?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Honestidade' },
  { texto: 'Um cliente está tentando usar um cupom vencido e insiste. Como você age?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Políticas' },
];

const repositorLoja: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Você conhece o sistema FIFO (First In, First Out) de organização de produtos?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Organização' },
  { texto: 'Como você verifica a validade dos produtos ao repor as prateleiras?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Qualidade' },
  { texto: 'Você tem experiência com equipamentos como paleteira ou empilhadeira?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Equipamentos' },
  { texto: 'Como você organiza produtos para facilitar a compra do cliente?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Visual' },

  // Experiência (3)
  { texto: 'Conte sobre sua experiência em trabalhos que exigem organização e agilidade.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência' },
  { texto: 'Já trabalhou em estoque ou depósito? Como era a rotina?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Estoque' },
  { texto: 'Descreva uma situação onde você precisou trabalhar sob pressão de tempo.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Pressão' },

  // Comportamental (4)
  { texto: 'Como você lida com trabalho físico repetitivo durante longas horas?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Como você se organiza quando há muitos produtos para repor em pouco tempo?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Priorização' },
  { texto: 'Como você interage com clientes que pedem ajuda enquanto você trabalha?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Atendimento' },
  { texto: 'Como você trabalha em equipe para garantir que a loja esteja organizada?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (4)
  { texto: 'Você encontrou um produto vencido na prateleira. O que faz?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Qualidade' },
  { texto: 'O estoque de um produto acabou mas ainda há clientes procurando. Como age?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { texto: 'Um cliente derrubou vários produtos no corredor. O que você faz?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
  { texto: 'Percebeu que um colega não está fazendo o trabalho corretamente. Como age?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Relacionamento' },
];

const fiscalPrevencao: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Quais técnicas você conhece para identificar comportamentos suspeitos?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Observação' },
  { texto: 'Você tem experiência com sistemas de CFTV e monitoramento?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas' },
  { texto: 'Quais são os principais pontos de perda em uma loja de varejo?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Prevenção' },
  { texto: 'Como você aborda a conferência de mercadorias na entrada e saída?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Conferência' },

  // Experiência (3)
  { texto: 'Conte sobre sua experiência na área de prevenção de perdas ou segurança.', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência' },
  { texto: 'Já identificou e ajudou a resolver situações de furto? Descreva.', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Ocorrências' },
  { texto: 'Você já participou de inventários? Como foi sua atuação?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Inventário' },

  // Comportamental (4)
  { texto: 'Como você mantém a atenção durante longos períodos de monitoramento?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Concentração' },
  { texto: 'Como você lida com situações de confronto mantendo o profissionalismo?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Controle Emocional' },
  { texto: 'Como você equilibra a vigilância sem constranger clientes honestos?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Discrição' },
  { texto: 'Como você se relaciona com a equipe da loja para prevenir perdas?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Colaboração' },

  // Situacional (4)
  { texto: 'Você viu alguém colocando produto no bolso. Como procede?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Abordagem' },
  { texto: 'Um cliente acusa você de tê-lo constrangido sem motivo. O que faz?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Conflito' },
  { texto: 'Percebeu divergência no inventário de um setor específico. Como investiga?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Investigação' },
  { texto: 'Suspeita que um funcionário está envolvido em perdas. Como age?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Ética' },
];

const atendenteVendedor: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Como você identifica as necessidades do cliente para oferecer o produto certo?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Sondagem' },
  { texto: 'Quais técnicas de venda você conhece e utiliza?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Venda' },
  { texto: 'Como você apresenta as vantagens de um produto para o cliente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Apresentação' },
  { texto: 'Você tem experiência com metas de vendas? Como se organiza para atingi-las?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Metas' },

  // Experiência (3)
  { texto: 'Conte sobre uma venda que te deixou orgulhoso. O que você fez de diferente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Sucesso' },
  { texto: 'Descreva uma situação onde você converteu um cliente indeciso em compra.', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Conversão' },
  { texto: 'Já trabalhou com atendimento em períodos de promoção? Como foi?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Promoções' },

  // Comportamental (4)
  { texto: 'Como você lida com clientes que estão apenas olhando e não querem ajuda?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Abordagem' },
  { texto: 'Como você se mantém motivado em dias de baixo movimento?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você reage quando um cliente escolhe não comprar após seu atendimento?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Como você trabalha com colegas quando há competição por clientes?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (4)
  { texto: 'O cliente quer um desconto que você não pode dar. Como você negocia?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Negociação' },
  { texto: 'O produto que o cliente quer está em falta. Como você contorna?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Alternativas' },
  { texto: 'Um cliente reclama de um produto que comprou antes. O que você faz?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Pós-venda' },
  { texto: 'Está perto do fechamento e falta pouco para bater sua meta. Como age?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
];

const supervisorLoja: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Quais indicadores você acompanha para avaliar a performance da loja?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'KPIs' },
  { texto: 'Como você organiza escalas de trabalho da equipe?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Escalas' },
  { texto: 'Quais estratégias você usa para reduzir perdas na loja?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Prevenção' },
  { texto: 'Como você planeja e executa a operação em datas de alto movimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento' },

  // Experiência (4)
  { texto: 'Conte sobre sua experiência liderando equipes no varejo.', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Liderança' },
  { texto: 'Descreva uma situação onde você melhorou resultados de uma loja ou setor.', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resultados' },
  { texto: 'Já precisou demitir alguém da equipe? Como você conduziu?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Pessoas' },
  { texto: 'Conte sobre um conflito na equipe que você resolveu.', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Conflitos' },

  // Comportamental (4)
  { texto: 'Como você motiva a equipe para alcançar metas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você dá feedback para funcionários com baixo desempenho?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Feedback' },
  { texto: 'Como você equilibra as demandas operacionais com a gestão de pessoas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio' },
  { texto: 'Como você lida com a pressão de resultados vinda da gerência?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pressão' },

  // Situacional (4)
  { texto: 'Dois funcionários brigaram no salão. Como você age?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'A loja não vai bater a meta do mês. O que você faz nas últimas semanas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Recuperação' },
  { texto: 'Um funcionário faltou e você está com equipe reduzida. Como organiza?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Contingência' },
  { texto: 'Um cliente VIP reclama do atendimento e quer falar com responsável. Como age?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento' },
];

// ============================================
// COMERCIAL / MARKETING
// ============================================

const vendedorComercial: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'O que é funil de vendas e como você o utiliza no dia a dia?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Funil de Vendas' },
  { texto: 'Quais metodologias de vendas você conhece? (SPIN, Challenger, etc)', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Metodologias' },
  { texto: 'Quais CRMs você já utilizou? Como você organiza seu pipeline?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'CRM' },
  { texto: 'Como você qualifica leads? Quais critérios usa?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Qualificação' },

  // Experiência (4)
  { texto: 'Conte sobre sua maior venda. Qual foi o ciclo e estratégia?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Grandes Vendas' },
  { texto: 'Descreva uma negociação difícil que você conseguiu fechar.', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação' },
  { texto: 'Você já recuperou um cliente que estava perdendo para concorrência?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Retenção' },
  { texto: 'Conte sobre uma venda que você perdeu. O que aprendeu?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Aprendizado' },

  // Comportamental (4)
  { texto: 'Como você lida com rejeição e ouvir muitos nãos?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Como você mantém a motivação quando está longe da meta?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você constrói relacionamento de confiança com clientes?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento' },
  { texto: 'Como você se organiza para fazer follow-up consistente?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (4)
  { texto: 'O cliente diz que o preço está muito alto. Como você contorna?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Objeções' },
  { texto: 'O cliente não responde suas mensagens. Qual sua estratégia?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Follow-up' },
  { texto: 'Um concorrente ofereceu preço menor. Como você aborda?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Competição' },
  { texto: 'O decisor do cliente mudou no meio da negociação. O que faz?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptação' },
];

const marketing: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Qual a diferença entre inbound e outbound marketing?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Estratégias' },
  { texto: 'Quais métricas você considera mais importantes em marketing digital?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas' },
  { texto: 'Explique como funciona SEO e quais fatores são mais importantes.', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'SEO' },
  { texto: 'Quais ferramentas de marketing digital você domina?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Ferramentas' },

  // Experiência (4)
  { texto: 'Conte sobre uma campanha de sucesso que você criou ou participou.', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Campanhas' },
  { texto: 'Descreva sua experiência com geração de leads. Qual canal teve melhor ROI?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lead Gen' },
  { texto: 'Já trabalhou com automação de marketing? Quais fluxos você criou?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Automação' },
  { texto: 'Conte sobre um A/B test que você conduziu e o que aprendeu.', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Experimentação' },

  // Comportamental (4)
  { texto: 'Como você se mantém atualizado com as tendências de marketing?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização' },
  { texto: 'Como você lida com feedback negativo sobre seu trabalho criativo?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Receptividade' },
  { texto: 'Como você apresenta resultados de marketing para stakeholders?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você prioriza projetos quando há muitas demandas?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Priorização' },

  // Situacional (4)
  { texto: 'Uma campanha não está performando. O que você analisa primeiro?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise' },
  { texto: 'O orçamento foi cortado pela metade. Como você adapta a estratégia?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptação' },
  { texto: 'Vendas reclama da qualidade dos leads. Como você resolve?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Alinhamento' },
  { texto: 'Precisa criar conteúdo para um público que você não conhece bem. Como faz?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Pesquisa' },
];

const atendimentoCliente: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Quais canais de atendimento você já trabalhou? (telefone, chat, email)', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Canais' },
  { texto: 'Você tem experiência com sistemas de atendimento? (Zendesk, Intercom)', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas' },
  { texto: 'O que você entende por SLA e qual sua importância?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'SLA' },
  { texto: 'Como você documenta e registra os atendimentos realizados?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },

  // Experiência (3)
  { texto: 'Conte sobre um atendimento em que você resolveu um problema complexo.', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução' },
  { texto: 'Descreva uma situação onde você encantou um cliente além do esperado.', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Encantamento' },
  { texto: 'Já trabalhou com metas de atendimento? Como você se organizava?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Metas' },

  // Comportamental (4)
  { texto: 'Como você mantém a calma com um cliente muito irritado?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Controle Emocional' },
  { texto: 'Como você demonstra empatia ao atender um cliente frustrado?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { texto: 'Como você lida com o estresse de atendimentos repetitivos?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Como você se organiza quando tem muitos chamados na fila?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (4)
  { texto: 'O cliente quer algo que não está na sua alçada resolver. O que faz?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Escalação' },
  { texto: 'Um cliente está ameaçando expor a empresa nas redes sociais. Como age?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Crise' },
  { texto: 'Você não sabe a resposta para a dúvida do cliente. Como procede?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Honestidade' },
  { texto: 'O sistema está fora do ar e você não consegue ajudar o cliente. O que faz?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
];

// ============================================
// ADMINISTRATIVO / GESTÃO
// ============================================

const administrativo: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Qual seu nível de conhecimento em Excel? Quais funções você domina?', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Excel' },
  { texto: 'Você tem experiência com sistemas ERP ou de gestão empresarial?', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas' },
  { texto: 'Como você organiza documentos e arquivos para fácil localização?', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Organização' },
  { texto: 'Você já trabalhou com rotinas de contas a pagar/receber?', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Financeiro' },

  // Experiência (3)
  { texto: 'Conte sobre sua experiência em rotinas administrativas.', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência' },
  { texto: 'Já organizou eventos ou reuniões corporativas? Como foi?', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Eventos' },
  { texto: 'Descreva uma melhoria de processo que você sugeriu ou implementou.', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Melhoria' },

  // Comportamental (4)
  { texto: 'Como você lida com múltiplas solicitações de diferentes pessoas?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Multitarefa' },
  { texto: 'Como você mantém seu ambiente de trabalho organizado?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização Pessoal' },
  { texto: 'Como você lida quando precisa dizer não a uma solicitação?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Assertividade' },
  { texto: 'Como você garante que informações confidenciais sejam protegidas?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Confidencialidade' },

  // Situacional (4)
  { texto: 'Descobriu um erro em um relatório que já foi enviado. O que faz?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Correção' },
  { texto: 'O sistema está fora do ar e você tem prazo para entregar algo. Como age?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
  { texto: 'Recebeu demandas urgentes de dois gestores ao mesmo tempo. Como prioriza?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { texto: 'Um documento importante não é encontrado. O que você faz?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Resolução' },
];

const analistaFinanceiro: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Explique a diferença entre regime de caixa e regime de competência.', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Contabilidade' },
  { texto: 'Como você estrutura um fluxo de caixa projetado?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Fluxo de Caixa' },
  { texto: 'Quais indicadores financeiros você considera mais importantes?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores' },
  { texto: 'Você tem experiência com ERPs financeiros? Quais?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistemas' },

  // Experiência (4)
  { texto: 'Conte sobre sua experiência com fechamento contábil mensal.', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Fechamento' },
  { texto: 'Já participou de processos de auditoria? Como foi a preparação?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditoria' },
  { texto: 'Descreva um projeto de melhoria de processo financeiro que você implementou.', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Processos' },
  { texto: 'Já trabalhou com budget e forecast? Como era o processo?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Planejamento' },

  // Comportamental (4)
  { texto: 'Como você lida com a pressão de prazos no fechamento financeiro?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pressão' },
  { texto: 'Como você comunica informações financeiras para não-especialistas?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você mantém a atenção a detalhes ao lidar com grandes volumes de dados?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atenção a Detalhes' },
  { texto: 'Como você lida com informações financeiras confidenciais?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Sigilo' },

  // Situacional (4)
  { texto: 'Identificou divergência na conciliação bancária. Como investiga?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Investigação' },
  { texto: 'A empresa está com caixa apertado. Que medidas você sugeriria?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Caixa' },
  { texto: 'Encontrou inconsistências nos controles internos. Como procede?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Controles' },
  { texto: 'Precisa reduzir custos sem impactar operações. Como aborda?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Otimização' },
];

const rhRecursosHumanos: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Quais etapas você considera essenciais em um processo seletivo?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Recrutamento' },
  { texto: 'Você tem experiência com ATS? Quais sistemas já utilizou?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistemas' },
  { texto: 'Como você estrutura uma descrição de vaga atrativa?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Job Description' },
  { texto: 'Quais métricas de RH você acompanha? (Time to fill, turnover, etc)', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas' },

  // Experiência (4)
  { texto: 'Conte sobre uma vaga difícil que você conseguiu fechar. Qual foi a estratégia?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vagas Difíceis' },
  { texto: 'Já trabalhou com recrutamento em volume? Como organizou o processo?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Volume' },
  { texto: 'Descreva sua experiência com hunting de candidatos passivos.', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Hunting' },
  { texto: 'Já participou de projetos de diversidade e inclusão? Conte.', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'D&I' },

  // Comportamental (4)
  { texto: 'Como você cria ambiente confortável para candidatos em entrevistas?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Acolhimento' },
  { texto: 'Como você dá feedback negativo para candidatos não aprovados?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Feedback' },
  { texto: 'Como você lida com pressão de múltiplas vagas urgentes?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pressão' },
  { texto: 'Como você se mantém imparcial durante avaliações de candidatos?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Imparcialidade' },

  // Situacional (4)
  { texto: 'O gestor tem expectativas irreais para a vaga. Como você alinha?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Stakeholders' },
  { texto: 'Candidatos estão desistindo no meio do processo. O que investigaria?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Dropout' },
  { texto: 'Um candidato ideal recusou a oferta. Como você procederia?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
  { texto: 'Descobriu que um candidato mentiu no currículo após contratação. O que faz?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética' },
];

const gerenteProjetos: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Quais metodologias de gestão de projetos você domina? (Scrum, Kanban, Waterfall)', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Metodologias' },
  { texto: 'Como você estrutura um cronograma de projeto?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento' },
  { texto: 'Quais ferramentas de gestão você utiliza? (Jira, Asana, MS Project)', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Ferramentas' },
  { texto: 'Como você gerencia riscos em projetos?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Riscos' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto complexo que você gerenciou do início ao fim.', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva um projeto que atrasou. Como você gerenciou a situação?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Atrasos' },
  { texto: 'Já gerenciou projetos com equipes remotas ou distribuídas?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Equipes Remotas' },
  { texto: 'Conte sobre um projeto que excedeu expectativas. O que você fez diferente?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Sucesso' },

  // Comportamental (4)
  { texto: 'Como você comunica status de projeto para diferentes stakeholders?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você lida com conflitos entre membros da equipe de projeto?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Conflitos' },
  { texto: 'Como você motiva equipes em projetos longos e desafiadores?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você equilibra qualidade, prazo e custo em projetos?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trade-offs' },

  // Situacional (4)
  { texto: 'O escopo do projeto mudou significativamente. Como você gerencia?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'situacional', competencia: 'Mudança de Escopo' },
  { texto: 'Um recurso-chave saiu no meio do projeto. O que você faz?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'situacional', competencia: 'Contingência' },
  { texto: 'O sponsor quer adicionar features sem estender prazo. Como negocia?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
  { texto: 'Identificou que o projeto não será entregue no prazo. O que faz?', cargo: 'Gerente de Projetos', nivel: 'pleno', categoria: 'situacional', competencia: 'Transparência' },
];

// ============================================
// CONSOLIDAÇÃO
// ============================================

export const todasAsPerguntas: PerguntaSeed[] = [
  // Tecnologia (6 cargos)
  ...desenvolvedorFrontend,
  ...desenvolvedorBackend,
  ...cientistaDeDados,
  ...qa,
  ...suporteTecnico,
  ...coordenadorTecnologia,

  // Jurídico (5 cargos)
  ...advogadoTrabalhista,
  ...advogadoCivil,
  ...advogadoCriminal,
  ...advogadoTributario,
  ...analistaJuridico,

  // Varejo (5 cargos)
  ...operadorCaixa,
  ...repositorLoja,
  ...fiscalPrevencao,
  ...atendenteVendedor,
  ...supervisorLoja,

  // Comercial/Marketing (3 cargos)
  ...vendedorComercial,
  ...marketing,
  ...atendimentoCliente,

  // Administrativo/Gestão (4 cargos)
  ...administrativo,
  ...analistaFinanceiro,
  ...rhRecursosHumanos,
  ...gerenteProjetos,
];

// ============================================
// ESTATÍSTICAS
// ============================================

export const estatisticas = {
  totalPerguntas: todasAsPerguntas.length,

  porCargo: {
    'Desenvolvedor Front-End': desenvolvedorFrontend.length,
    'Desenvolvedor Back-End': desenvolvedorBackend.length,
    'Cientista de Dados': cientistaDeDados.length,
    'QA / Testes': qa.length,
    'Suporte Técnico / HelpDesk': suporteTecnico.length,
    'Coordenador de Tecnologia': coordenadorTecnologia.length,
    'Advogado Trabalhista': advogadoTrabalhista.length,
    'Advogado Civil': advogadoCivil.length,
    'Advogado Criminal': advogadoCriminal.length,
    'Advogado Tributário': advogadoTributario.length,
    'Analista Jurídico / Paralegal': analistaJuridico.length,
    'Operador de Caixa': operadorCaixa.length,
    'Repositor / Auxiliar de Loja': repositorLoja.length,
    'Fiscal de Prevenção e Perdas': fiscalPrevencao.length,
    'Atendente / Vendedor de Loja': atendenteVendedor.length,
    'Supervisor / Líder de Loja': supervisorLoja.length,
    'Vendedor / Comercial': vendedorComercial.length,
    'Marketing': marketing.length,
    'Atendimento ao Cliente': atendimentoCliente.length,
    'Administrativo': administrativo.length,
    'Analista Financeiro': analistaFinanceiro.length,
    'RH / Recursos Humanos': rhRecursosHumanos.length,
    'Gerente de Projetos': gerenteProjetos.length,
  },

  porCategoria: {
    tecnica: todasAsPerguntas.filter(p => p.categoria === 'tecnica').length,
    experiencia: todasAsPerguntas.filter(p => p.categoria === 'experiencia').length,
    comportamental: todasAsPerguntas.filter(p => p.categoria === 'comportamental').length,
    situacional: todasAsPerguntas.filter(p => p.categoria === 'situacional').length,
  },

  cargosDisponiveis: [
    // Tecnologia
    'Desenvolvedor Front-End',
    'Desenvolvedor Back-End',
    'Cientista de Dados',
    'QA / Testes',
    'Suporte Técnico / HelpDesk',
    'Coordenador de Tecnologia',
    // Jurídico
    'Advogado Trabalhista',
    'Advogado Civil',
    'Advogado Criminal',
    'Advogado Tributário',
    'Analista Jurídico / Paralegal',
    // Varejo
    'Operador de Caixa',
    'Repositor / Auxiliar de Loja',
    'Fiscal de Prevenção e Perdas',
    'Atendente / Vendedor de Loja',
    'Supervisor / Líder de Loja',
    // Comercial/Marketing
    'Vendedor / Comercial',
    'Marketing',
    'Atendimento ao Cliente',
    // Administrativo/Gestão
    'Administrativo',
    'Analista Financeiro',
    'RH / Recursos Humanos',
    'Gerente de Projetos',
  ],
};
