/**
 * Banco de Perguntas v4 - TECNOLOGIA
 *
 * Melhorias aplicadas:
 * - Perguntas aprofundadas (sem sim/não)
 * - Variações por nível
 * - Perguntas de case e cenário
 * - Perguntas de valores e cultura
 */

import { PerguntaSeed } from './types';

// ============================================
// DESENVOLVEDOR FRONT-END
// ============================================

export const desenvolvedorFrontendJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Explique com suas palavras o que é o DOM e como o JavaScript interage com ele. Dê um exemplo prático de manipulação.', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'JavaScript' },
  { texto: 'Qual a diferença entre Flexbox e Grid no CSS? Em que situações você usaria cada um? Descreva um layout que você faria com cada tecnologia.', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'CSS' },
  { texto: 'O que são componentes em React e por que essa abordagem é útil? Como você decide quando criar um novo componente?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'React' },
  { texto: 'Explique a diferença entre let, const e var em JavaScript. Quando você usa cada um e por quê?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'JavaScript' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto front-end que você desenvolveu, seja pessoal, acadêmico ou profissional. Quais tecnologias usou e qual foi o maior desafio?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva uma situação onde você precisou aprender uma tecnologia nova rapidamente. Como foi seu processo de aprendizado?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { texto: 'Você já trabalhou em equipe em algum projeto? Como foi a divisão de tarefas e a comunicação com outros desenvolvedores?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { texto: 'Conte sobre um bug que você teve dificuldade em resolver. Qual foi sua abordagem para encontrar a solução?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Debugging' },

  // Comportamental (4)
  { texto: 'Como você se organiza para estudar e se manter atualizado com as mudanças constantes do ecossistema front-end?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { texto: 'Quando você recebe feedback sobre seu código, como você costuma reagir? Conte um exemplo de feedback que te ajudou a melhorar.', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade' },
  { texto: 'O que te motivou a seguir carreira em desenvolvimento front-end? O que você mais gosta nessa área?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você lida quando está travado em um problema e não consegue avançar? Qual sua estratégia?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },

  // Situacional (4)
  { texto: 'Você recebeu uma tarefa com prazo apertado, mas a especificação está incompleta. O designer não está disponível. Como você procederia?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { texto: 'O site que você desenvolveu está apresentando problemas visuais em um navegador específico que você não testou. Como você investigaria e resolveria?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Troubleshooting' },
  { texto: 'Você percebeu que cometeu um erro no código que já foi para produção. O que você faz?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Responsabilidade' },
  { texto: 'Um colega mais experiente sugeriu uma abordagem diferente da sua para resolver um problema. Você discorda. Como conduziria essa situação?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
];

export const desenvolvedorFrontendPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique o conceito de Virtual DOM no React. Por que ele existe e como impacta a performance? Compare com a manipulação direta do DOM.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'React' },
  { texto: 'Descreva as diferenças entre Server-Side Rendering (SSR), Static Site Generation (SSG) e Client-Side Rendering (CSR). Quando você escolheria cada abordagem?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Arquitetura' },
  { texto: 'O que são React Hooks? Explique useState, useEffect e useContext com exemplos de casos de uso reais. Quando você criaria um custom hook?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'React Hooks' },
  { texto: 'Como você estrutura o gerenciamento de estado em uma aplicação React de médio porte? Compare Context API, Redux e outras alternativas que você conhece.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'State Management' },
  { texto: 'Quais estratégias você utiliza para otimizar a performance de uma aplicação front-end? Mencione técnicas de lazy loading, code splitting e otimização de renders.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Performance' },

  // Experiência (5)
  { texto: 'Conte sobre o projeto front-end mais complexo que você trabalhou. Quais decisões arquiteturais você tomou ou influenciou? O que faria diferente hoje?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Arquitetura' },
  { texto: 'Descreva uma situação onde você identificou e resolveu um problema de performance significativo em uma aplicação. Quais ferramentas usou para diagnosticar?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance' },
  { texto: 'Você já implementou ou trabalhou com Design Systems? Como foi a experiência de criar/manter componentes reutilizáveis em escala?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Design System' },
  { texto: 'Conte sobre uma vez que você precisou integrar uma API complexa ou mal documentada. Como você conduziu o processo?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Integração' },
  { texto: 'Descreva sua experiência com code reviews. Como você aborda dar feedback construtivo? Cite um exemplo de review que gerou aprendizado mútuo.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Code Review' },

  // Comportamental (4)
  { texto: 'Como você equilibra a entrega de features novas com a manutenção de qualidade técnica e pagamento de débito técnico?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão Técnica' },
  { texto: 'Quando um designer entrega um layout que você considera tecnicamente problemático ou difícil de manter, como você aborda essa conversa?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você se mantém produtivo quando precisa trabalhar em múltiplas tarefas ou projetos simultaneamente?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Organização' },
  { texto: 'Descreva como você colabora com desenvolvedores back-end para definir contratos de API. Como você lida com divergências?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },

  // Situacional (4)
  { texto: 'Você está no meio de uma sprint e descobre que uma biblioteca crítica que você usa tem uma vulnerabilidade de segurança grave. Como você prioriza e comunica isso?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança' },
  { texto: 'O produto está lento em produção e os usuários estão reclamando. Você tem acesso a métricas de performance. Descreva passo a passo como você investigaria.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Debugging' },
  { texto: 'A equipe precisa escolher entre migrar para uma nova versão do framework ou continuar na atual. Como você estruturaria a análise para tomar essa decisão?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Tomada de Decisão' },
  { texto: 'Você precisa implementar uma feature complexa e o prazo é curto. Você pode entregar algo funcional mas com código que precisará de refatoração, ou pedir mais tempo. O que você faz?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Trade-offs' },
];

export const desenvolvedorFrontendSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Como você projetaria a arquitetura front-end de uma aplicação que precisa escalar para milhões de usuários? Discuta estratégias de cache, CDN, micro-frontends e monitoramento.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura em Escala' },
  { texto: 'Compare diferentes abordagens de testing no front-end: unit tests, integration tests e E2E. Como você define a estratégia de testes para um projeto? Qual a cobertura ideal?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Testes' },
  { texto: 'Explique como funciona o processo de build e bundling moderno (Webpack, Vite, esbuild). Como você otimizaria o bundle size de uma aplicação grande?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Build Tools' },
  { texto: 'Discuta os trade-offs entre monorepo e multi-repo para aplicações front-end em times grandes. Que ferramentas e práticas você recomendaria?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Infraestrutura' },
  { texto: 'Como você implementaria acessibilidade (a11y) de forma sistemática em uma aplicação existente que não foi construída com esse foco? Quais métricas você acompanharia?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Acessibilidade' },

  // Experiência (5)
  { texto: 'Conte sobre uma decisão arquitetural importante que você liderou. Quais eram as alternativas, como você avaliou e qual foi o resultado a longo prazo?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Técnica' },
  { texto: 'Descreva uma situação onde você precisou mentorar ou desenvolver desenvolvedores menos experientes. Como você estruturou o processo e mediu o progresso?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { texto: 'Conte sobre um projeto que falhou ou teve problemas sérios. O que você aprendeu e como isso mudou sua abordagem em projetos futuros?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { texto: 'Você já liderou a migração de uma tecnologia legada para uma moderna? Como planejou, executou e garantiu continuidade do negócio durante a transição?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Migração' },
  { texto: 'Descreva sua experiência definindo padrões de código, guidelines e processos para times de front-end. Como você garantiu adoção?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Padronização' },

  // Comportamental (5)
  { texto: 'Como você equilibra inovação técnica com estabilidade quando está liderando decisões de tecnologia? Dê um exemplo concreto.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança' },
  { texto: 'Descreva como você comunica decisões técnicas complexas para stakeholders não-técnicos (produto, negócio). Como você adapta sua linguagem?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { texto: 'Como você lida com conflitos técnicos entre membros do time? Conte uma situação onde você mediou uma discussão.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Mediação' },
  { texto: 'Qual sua filosofia sobre documentação técnica? Como você garante que conhecimento crítico não fique apenas na cabeça de uma pessoa?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Documentação' },
  { texto: 'Como você decide quando é hora de parar de otimizar e entregar algo que funciona? Descreva seu processo de tomada de decisão.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },

  // Situacional (5)
  { texto: 'A empresa quer lançar um MVP em 3 meses. Você precisa definir a stack técnica. Como você aborda essa decisão considerando velocidade, escalabilidade e contratação futura?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia' },
  { texto: 'Dois desenvolvedores seniores do time discordam fortemente sobre a abordagem para uma feature crítica. Ambos têm argumentos válidos. Como você conduziria a situação?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Liderança' },
  { texto: 'O CTO quer adotar uma tecnologia nova que você acredita não ser a melhor escolha. Como você apresentaria seu ponto de vista?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { texto: 'Vocês identificaram que precisam reescrever uma parte crítica do sistema, mas o negócio não pode parar. Como você planejaria essa migração incremental?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento' },
  { texto: 'O time está desmotivado após uma sequência de sprints intensas. Como você atuaria para recuperar a moral sem comprometer entregas importantes?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Time' },
];

// ============================================
// DESENVOLVEDOR BACK-END
// ============================================

export const desenvolvedorBackendJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Explique com suas palavras o que é uma API REST. Quais são os principais métodos HTTP e quando você usa cada um?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'APIs' },
  { texto: 'Qual a diferença entre banco de dados SQL e NoSQL? Em que situações você escolheria cada um? Dê exemplos.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Banco de Dados' },
  { texto: 'O que é autenticação e autorização? Explique a diferença e como você implementaria um login simples.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança' },
  { texto: 'Explique o conceito de versionamento de código com Git. Qual a diferença entre merge e rebase? Quando você usaria cada um?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Git' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto back-end que você desenvolveu, seja pessoal, acadêmico ou profissional. Quais tecnologias usou e quais desafios enfrentou?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva uma situação onde você precisou debugar um erro difícil de encontrar. Qual foi sua abordagem?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Debugging' },
  { texto: 'Você já trabalhou com banco de dados em algum projeto? Conte como foi modelar os dados e quais queries você precisou fazer.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Banco de Dados' },
  { texto: 'Como você aprendeu a programar? Quais recursos você usa para continuar evoluindo?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },

  // Comportamental (4)
  { texto: 'Quando você recebe um código para revisar ou herda código de outra pessoa, como você aborda o entendimento? Qual sua reação se encontra código confuso?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Colaboração' },
  { texto: 'O que te atrai no desenvolvimento back-end especificamente? O que você mais gosta de construir?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você lida com tarefas que parecem entediantes ou repetitivas? Você tem alguma estratégia para se manter engajado?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Disciplina' },
  { texto: 'Quando você comete um erro no trabalho, como você costuma reagir? Conte um exemplo de como lidou com uma falha.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Responsabilidade' },

  // Situacional (4)
  { texto: 'Você está desenvolvendo uma feature e percebe que a forma como foi especificada vai gerar problemas no futuro. O que você faz?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
  { texto: 'A aplicação está retornando um erro 500 em produção e você não sabe a causa. Descreva passo a passo como você investigaria.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Troubleshooting' },
  { texto: 'Você recebeu uma tarefa mas não entendeu completamente os requisitos. O que você faz?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { texto: 'Você está travado em um problema há horas e não consegue resolver sozinho. Como você decide quando e como pedir ajuda?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
];

export const desenvolvedorBackendPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique os princípios SOLID e dê exemplos práticos de como você os aplica no dia a dia. Qual princípio você considera mais importante e por quê?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design Patterns' },
  { texto: 'Compare diferentes estratégias de cache (in-memory, Redis, CDN). Quando você usaria cada uma? Como você invalida cache de forma eficiente?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Cache' },
  { texto: 'Descreva como você projetaria um sistema de filas para processar tarefas assíncronas. Quais tecnologias usaria e como garantiria resiliência?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Mensageria' },
  { texto: 'O que são transactions em banco de dados? Explique ACID e quando você usaria diferentes níveis de isolamento.', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Banco de Dados' },
  { texto: 'Como você estrutura testes em uma aplicação back-end? Explique a diferença entre unit, integration e E2E tests. Qual a cobertura ideal?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Testes' },

  // Experiência (5)
  { texto: 'Conte sobre uma API complexa que você desenvolveu. Quais decisões de design você tomou e por quê? O que faria diferente hoje?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'APIs' },
  { texto: 'Descreva uma situação onde você otimizou queries lentas no banco de dados. Quais ferramentas usou para diagnosticar e qual foi o ganho?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance' },
  { texto: 'Você já lidou com problemas de escalabilidade em produção? Conte como identificou o gargalo e qual foi a solução.', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Escalabilidade' },
  { texto: 'Conte sobre um incidente em produção que você ajudou a resolver. Qual foi o processo de investigação e o que você aprendeu?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Incident Response' },
  { texto: 'Descreva sua experiência implementando autenticação e autorização. Quais métodos você usou (JWT, OAuth, sessions) e quais foram os desafios?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Segurança' },

  // Comportamental (4)
  { texto: 'Como você documenta suas APIs? O que você considera essencial em uma boa documentação técnica?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Documentação' },
  { texto: 'Como você equilibra a pressão por entregas rápidas com a necessidade de escrever código de qualidade?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Qualidade' },
  { texto: 'Como você explica conceitos técnicos complexos para colegas de outras áreas (produto, negócio)?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você lida com débito técnico? Como você convence stakeholders a investir tempo em refatoração?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão Técnica' },

  // Situacional (4)
  { texto: 'A API está retornando erros intermitentes e você não consegue reproduzir localmente. Como você investigaria?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Debugging' },
  { texto: 'Você precisa integrar com uma API externa que tem documentação ruim e suporte lento. Como você conduziria o desenvolvimento?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Integração' },
  { texto: 'O banco de dados está ficando lento conforme a base cresce. Quais seriam suas primeiras ações para investigar e melhorar?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Performance' },
  { texto: 'Você descobriu uma vulnerabilidade de segurança no código em produção. Qual seria seu plano de ação imediato?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança' },
];

export const desenvolvedorBackendSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Compare arquiteturas monolíticas, microsserviços e serverless. Quais critérios você usa para decidir entre elas? Conte sobre trade-offs reais que você enfrentou.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura' },
  { texto: 'Como você projetaria um sistema que precisa processar milhões de eventos por dia com baixa latência? Discuta estratégias de particionamento, replicação e failover.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistemas Distribuídos' },
  { texto: 'Explique o teorema CAP e como ele influencia decisões de arquitetura. Dê exemplos de quando você priorizou consistência vs disponibilidade.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistemas Distribuídos' },
  { texto: 'Como você implementaria um sistema de rate limiting robusto? Discuta diferentes algoritmos e como garantir funcionalidade em ambiente distribuído.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Resiliência' },
  { texto: 'Discuta estratégias de observabilidade (logs, métricas, traces). Como você define alertas efetivos e evita fadiga de alertas?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Observabilidade' },

  // Experiência (5)
  { texto: 'Conte sobre uma decisão arquitetural crítica que você liderou. Quais eram as alternativas, como você avaliou riscos e qual foi o resultado?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Técnica' },
  { texto: 'Descreva uma migração de sistema legado que você conduziu. Como você garantiu zero downtime e integridade de dados?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Migração' },
  { texto: 'Conte sobre um sistema que você construiu para escalar significativamente. Quais decisões tomou desde o início pensando em crescimento?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Escalabilidade' },
  { texto: 'Descreva sua experiência mentorando desenvolvedores. Como você estrutura o desenvolvimento de pessoas e mede evolução?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { texto: 'Conte sobre o incidente de produção mais desafiador que você enfrentou. Como foi o processo de resposta e o que mudou depois?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Incident Management' },

  // Comportamental (5)
  { texto: 'Como você equilibra inovação técnica com pragmatismo de entrega? Dê um exemplo de quando você teve que fazer esse trade-off.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { texto: 'Como você influencia decisões técnicas em nível organizacional? Descreva uma situação onde você mudou a direção técnica da empresa.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência' },
  { texto: 'Como você constrói cultura de qualidade técnica em um time? O que você faz quando percebe que padrões estão caindo?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura' },
  { texto: 'Como você comunica riscos técnicos para executivos que não têm background técnico? Dê um exemplo concreto.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { texto: 'Qual sua abordagem para delegar trabalho técnico complexo? Como você garante qualidade sem microgerenciar?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Delegação' },

  // Situacional (5)
  { texto: 'O CEO quer lançar uma feature crítica em 2 semanas. Sua análise técnica indica que precisa de 2 meses para fazer direito. Como você aborda essa conversa?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação' },
  { texto: 'Dois times têm visões diferentes sobre como integrar seus serviços. Você precisa mediar e chegar a uma solução. Como conduziria?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Mediação' },
  { texto: 'Você identificou que um sistema crítico tem falhas de design fundamentais, mas reescrever seria muito custoso. Como você avalia e prioriza isso?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Risco' },
  { texto: 'A empresa está crescendo e você precisa definir como escalar o time técnico. Como você aborda a decisão entre contratar mais, terceirizar ou automatizar?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia' },
  { texto: 'Um desenvolvedor sênior do time está consistentemente entregando código de baixa qualidade. Como você aborda essa situação?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Performance' },
];

// ============================================
// QA / TESTES
// ============================================

export const qaJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Explique a diferença entre testes funcionais e não-funcionais. Dê exemplos de cada tipo e quando você os aplicaria.', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Tipos de Teste' },
  { texto: 'O que é um caso de teste bem escrito? Quais elementos ele deve conter e como você organiza a documentação?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },
  { texto: 'Explique o que é teste de regressão e por que ele é importante. Como você decide o que incluir em uma suíte de regressão?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Regressão' },
  { texto: 'O que você verifica ao testar um formulário web? Liste os cenários de teste que você consideraria.', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Teste' },

  // Experiência (4)
  { texto: 'Conte sobre sua experiência com testes de software. Que tipos de teste você já executou e em quais projetos?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência' },
  { texto: 'Descreva um bug interessante que você encontrou. Como você o descobriu e documentou?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Bug Finding' },
  { texto: 'Você já usou alguma ferramenta de gestão de testes ou bugs? Qual e como foi sua experiência?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { texto: 'Conte sobre uma situação onde você precisou testar algo sem documentação clara. Como você abordou?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },

  // Comportamental (4)
  { texto: 'Como você reage quando um desenvolvedor discorda que algo é um bug? Como você defende seu ponto de vista?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'O que te atrai na área de QA? O que você mais gosta de fazer no processo de teste?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você lida com a pressão de liberar software quando ainda há bugs conhecidos?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética' },
  { texto: 'Testar software pode ser repetitivo. Como você mantém atenção aos detalhes durante longas sessões de teste?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Disciplina' },

  // Situacional (4)
  { texto: 'Você encontrou um bug crítico às vésperas de um release importante. O que você faz?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { texto: 'A feature está pronta mas você não teve tempo de testar tudo. Como você prioriza o que testar primeiro?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Tempo' },
  { texto: 'O desenvolvedor diz que o bug que você reportou não é reproduzível. Como você procede?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Investigação' },
  { texto: 'Você percebeu que os requisitos estão incompletos e podem gerar problemas. O que você faz?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
];

export const qaPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a pirâmide de testes e como você a aplica na prática. Qual a proporção ideal entre unit, integration e E2E tests?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Estratégia de Testes' },
  { texto: 'Compare diferentes ferramentas de automação (Selenium, Cypress, Playwright). Quais são os trade-offs e quando você escolheria cada uma?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Automação' },
  { texto: 'O que é BDD e como Gherkin/Cucumber se encaixam? Quais são as vantagens e desvantagens dessa abordagem?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'BDD' },
  { texto: 'Como você testa APIs? Quais ferramentas usa e que tipos de validação você faz além do status code?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'API Testing' },
  { texto: 'Explique como você integraria testes automatizados em uma pipeline de CI/CD. Quais práticas você considera essenciais?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'CI/CD' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto de automação de testes que você liderou ou participou significativamente. Quais resultados alcançou?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Automação' },
  { texto: 'Descreva o bug mais complexo que você encontrou. Qual foi o processo de investigação até identificar a causa raiz?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Investigação' },
  { texto: 'Conte sobre sua experiência em ambiente ágil. Como você participa das cerimônias e colabora com o time?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Agile' },
  { texto: 'Você já implementou testes de performance ou carga? Descreva a abordagem e as ferramentas utilizadas.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance Testing' },

  // Comportamental (4)
  { texto: 'Como você constrói relacionamento produtivo com desenvolvedores? Descreva como você comunica bugs de forma construtiva.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { texto: 'Como você equilibra a pressão por velocidade de entrega com a necessidade de qualidade?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trade-offs' },
  { texto: 'Como você defende a importância de testes quando há pressão para pular etapas? Dê um exemplo concreto.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Advocacy' },
  { texto: 'Como você se mantém atualizado com práticas e ferramentas de QA? O que você aprendeu recentemente?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado' },

  // Situacional (4)
  { texto: 'Os testes automatizados estão falhando intermitentemente (flaky tests). Como você aborda esse problema?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Troubleshooting' },
  { texto: 'Uma release urgente precisa sair hoje e você tem tempo limitado para testar. Como você estrutura sua abordagem?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Risk-based Testing' },
  { texto: 'O time quer aumentar a cobertura de testes automatizados. Como você priorizaria o que automatizar primeiro?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Estratégia' },
  { texto: 'Você descobriu que uma feature antiga nunca foi testada adequadamente e pode ter bugs. O que você faz?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Risco' },
];

export const qaSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Como você estrutura uma estratégia de qualidade para uma organização que está crescendo rapidamente? Que frameworks e processos você implementaria?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de Qualidade' },
  { texto: 'Discuta arquiteturas de automação de testes em escala. Como você organiza page objects, data factories, e mantém testes manuteníveis em projetos grandes?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura de Automação' },
  { texto: 'Como você implementa testes de contrato (contract testing) em uma arquitetura de microsserviços? Compare ferramentas como Pact e Spring Cloud Contract.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Contract Testing' },
  { texto: 'Explique como você estruturaria testes de performance end-to-end. Que métricas você definiria, que ferramentas usaria e como você analisaria gargalos?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Performance Testing' },
  { texto: 'Como você implementa testes de segurança (SAST, DAST, penetration testing) no ciclo de desenvolvimento? Que ferramentas e processos você recomendaria?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Security Testing' },

  // Experiência (5)
  { texto: 'Conte sobre uma transformação de qualidade que você liderou em uma organização. Qual era o cenário inicial, que mudanças você implementou e quais resultados alcançou?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação' },
  { texto: 'Descreva sua experiência construindo e liderando times de QA. Como você define papéis, contrata talentos e desenvolve a equipe?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Time' },
  { texto: 'Conte sobre um projeto onde você implementou shift-left testing com sucesso. Como você mudou a cultura e quais benefícios foram alcançados?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Shift-Left' },
  { texto: 'Descreva uma situação onde você precisou definir SLAs de qualidade e métricas para o negócio. Como você escolheu as métricas e como elas impactaram decisões?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Métricas de Negócio' },
  { texto: 'Você já liderou a seleção e implementação de ferramentas de teste para uma organização? Conte sobre o processo de avaliação e adoção.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Tooling' },

  // Comportamental (5)
  { texto: 'Como você constrói cultura de qualidade onde todos se sentem responsáveis, não apenas o time de QA? Dê exemplos de práticas que você implementou.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Qualidade' },
  { texto: 'Como você influencia decisões de arquitetura e design para tornar sistemas mais testáveis? Descreva uma situação onde você interveio cedo no processo.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Técnica' },
  { texto: 'Como você comunica riscos de qualidade para executivos de forma que eles entendam o impacto no negócio? Dê um exemplo concreto.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { texto: 'Como você equilibra a busca por qualidade perfeita com a realidade de prazos e recursos limitados? Qual sua filosofia sobre "good enough"?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { texto: 'Como você desenvolve e mentora QAs para que cresçam em suas carreiras? Que oportunidades você cria e como mede evolução?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Pessoas' },

  // Situacional (5)
  { texto: 'A empresa quer lançar um produto sem testes adequados devido a pressão de mercado. Como você apresenta os riscos e negocia uma abordagem razoável?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Risco' },
  { texto: 'Os testes automatizados estão demorando muito para rodar e bloqueando a pipeline. Como você investigaria e resolveria esse problema estruturalmente?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização' },
  { texto: 'Um bug crítico em produção não foi detectado pelos testes. Como você conduz a análise post-mortem e que mudanças você proporia?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Post-Mortem' },
  { texto: 'O time de desenvolvimento quer eliminar o time de QA separado e ter QAs embedded nos squads. Como você avalia essa proposta?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Estrutura Organizacional' },
  { texto: 'Você precisa reduzir o time de QA em 30% mantendo a cobertura de qualidade. Como você estruturaria essa transição?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
];

// ============================================
// SUPORTE TÉCNICO / HELPDESK
// ============================================

export const suporteTecnico: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Descreva seu processo de troubleshooting quando um usuário relata que o computador está lento. Quais são os primeiros passos?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Troubleshooting' },
  { texto: 'Explique como funciona uma rede básica: o que são IP, DNS, DHCP? Como você verificaria se há problema de conectividade?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Redes' },
  { texto: 'Quais ferramentas de acesso remoto você conhece? Descreva o passo a passo de como você conduziria um atendimento remoto.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Ferramentas' },
  { texto: 'Um usuário esqueceu a senha e precisa resetar. Descreva o processo que você seguiria garantindo a segurança.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança' },

  // Experiência (4)
  { texto: 'Conte sobre um problema técnico complexo que você resolveu e que te deixou orgulhoso. Qual foi o processo?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução' },
  { texto: 'Descreva sua experiência com atendimento ao usuário. Como você organizava suas demandas e priorizava chamados?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },
  { texto: 'Você já criou alguma documentação ou tutorial para ajudar usuários? Conte como foi o processo.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Documentação' },
  { texto: 'Conte sobre uma situação onde você precisou aprender rapidamente sobre um sistema ou tecnologia nova para resolver um problema.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },

  // Comportamental (4)
  { texto: 'Como você explica problemas técnicos para usuários que não entendem de tecnologia? Dê um exemplo de como simplificaria uma explicação.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Descreva como você mantém a calma e paciência quando um usuário está frustrado ou irritado com um problema.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Inteligência Emocional' },
  { texto: 'Como você prioriza quando tem vários chamados urgentes ao mesmo tempo? Que critérios você usa?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Priorização' },
  { texto: 'O que te motiva a trabalhar com suporte técnico? O que você mais gosta nesse tipo de trabalho?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },

  // Situacional (4)
  { texto: 'Um diretor não consegue acessar o email minutos antes de uma reunião importante. Como você conduziria esse atendimento?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Urgência' },
  { texto: 'Você identificou que vários usuários estão com o mesmo problema. O que você faria além de resolver individualmente?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
  { texto: 'O usuário insiste que o problema é de TI, mas você suspeita que é erro de uso. Como você aborda essa situação?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Diplomacia' },
  { texto: 'Você não consegue resolver um problema e não há ninguém para escalar no momento. Como você procede com o usuário?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
];

export const suporteTecnicoPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Descreva como você estrutura uma base de conhecimento para o time de suporte. Que categorias, templates e processos de atualização você implementaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Knowledge Base' },
  { texto: 'Explique como você diagnosticaria problemas de performance em uma rede corporativa. Que ferramentas usaria e quais métricas analisaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Redes Avançado' },
  { texto: 'Como você gerencia Active Directory em ambiente Windows? Descreva processos de criação de usuários, grupos, GPOs e troubleshooting comum.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Active Directory' },
  { texto: 'Descreva sua experiência com virtualização (VMware, Hyper-V, VDI). Como você diagnostica problemas de performance em ambientes virtualizados?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Virtualização' },
  { texto: 'Como você implementa e gerencia soluções de backup e recuperação? Que estratégias você usa para garantir RPO e RTO adequados?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Backup e Recovery' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto de melhoria de processos de suporte que você liderou. Qual era o problema, que mudanças implementou e quais resultados alcançou?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { texto: 'Descreva sua experiência treinando e desenvolvendo analistas de suporte mais novos. Como você estrutura o treinamento e mede evolução?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { texto: 'Conte sobre uma migração de sistema ou rollout de tecnologia que você participou. Como foi o planejamento e a execução?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de TI' },
  { texto: 'Você já implementou ou melhorou um sistema de tickets/ITSM? Conte sobre a experiência e os desafios enfrentados.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'ITSM' },

  // Comportamental (4)
  { texto: 'Como você lida com usuários VIP ou executivos que esperam tratamento diferenciado? Descreva sua abordagem para esse tipo de atendimento.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atendimento VIP' },
  { texto: 'Como você equilibra atendimento reativo com trabalho proativo de melhoria da infraestrutura? Que estratégias você usa?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Proatividade' },
  { texto: 'Como você documenta soluções de forma que outros analistas possam usar? Qual sua filosofia sobre documentação técnica?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Documentação' },
  { texto: 'Como você mantém a calma e eficiência durante crises que afetam muitos usuários simultaneamente?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Crise' },

  // Situacional (5)
  { texto: 'O email corporativo está fora do ar e dezenas de usuários estão ligando ao mesmo tempo. Como você organiza a resposta a esse incidente?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Incident Management' },
  { texto: 'Você identificou que um problema recorrente poderia ser resolvido com uma mudança de processo, mas envolve outras áreas. Como você articula isso?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Problem Management' },
  { texto: 'Um analista júnior cometeu um erro que causou impacto nos usuários. Como você aborda a situação com ele e com a gestão?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Liderança' },
  { texto: 'A empresa está migrando para cloud e você precisa adaptar processos de suporte. Como você planejaria essa transição?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Cloud' },
  { texto: 'Um fornecedor de software não está cumprindo o SLA de suporte e isso afeta seus usuários. Como você escala e resolve?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Vendor Management' },
];

export const suporteTecnicoSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Como você estrutura um Service Desk seguindo práticas ITIL? Que processos você considera essenciais e como você mede maturidade?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'ITIL' },
  { texto: 'Descreva como você projetaria a infraestrutura de TI para uma empresa de 500 funcionários. Que componentes incluiria e como garantiria disponibilidade?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura de Infraestrutura' },
  { texto: 'Como você implementa segurança em camadas em um ambiente corporativo? Discuta endpoint protection, segmentação de rede, identity management.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'Segurança' },
  { texto: 'Explique como você estruturaria automação de tarefas de suporte usando PowerShell, scripts ou ferramentas de RMM. Que processos você priorizaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'Automação' },
  { texto: 'Como você define e monitora SLAs para operações de suporte? Que métricas você acompanha e como você as apresenta para a gestão?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'SLA Management' },

  // Experiência (5)
  { texto: 'Conte sobre uma transformação de operações de suporte que você liderou. Qual era o cenário inicial, que mudanças implementou e quais resultados alcançou?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação' },
  { texto: 'Descreva sua experiência construindo e liderando times de suporte. Como você define estrutura, contrata talentos e desenvolve a equipe?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Time' },
  { texto: 'Conte sobre um projeto de infraestrutura de grande porte que você planejou e executou. Qual era o escopo e os desafios principais?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de Infraestrutura' },
  { texto: 'Você já gerenciou orçamento de TI? Como você planeja investimentos, justifica gastos e otimiza custos operacionais?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Budget' },
  { texto: 'Conte sobre uma crise de TI significativa que você gerenciou. Como foi a resposta, comunicação e as mudanças implementadas depois?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Crisis Management' },

  // Comportamental (5)
  { texto: 'Como você constrói relacionamento com outras áreas de TI (desenvolvimento, segurança) e com o negócio? Descreva sua abordagem de stakeholder management.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento' },
  { texto: 'Como você comunica problemas técnicos e necessidades de investimento para executivos não-técnicos? Dê um exemplo concreto.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { texto: 'Como você desenvolve líderes técnicos dentro do seu time? Que oportunidades você cria e como você mede potencial de liderança?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Líderes' },
  { texto: 'Como você equilibra manter operações estáveis com a necessidade de modernizar e inovar? Descreva sua filosofia.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { texto: 'Como você lida com a pressão de reduzir custos mantendo ou melhorando a qualidade do serviço? Que estratégias você usa?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Eficiência' },

  // Situacional (5)
  { texto: 'A empresa está considerando terceirizar parte do suporte. Como você avaliaria essa decisão e que recomendação faria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Terceirização' },
  { texto: 'Houve um incidente de segurança e você precisa coordenar a resposta de suporte enquanto a investigação acontece. Como você procede?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Security Incident' },
  { texto: 'O CEO reclama que TI é lenta e não atende às necessidades do negócio. Como você investiga as causas e propõe soluções?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Percepção de Valor' },
  { texto: 'Você precisa reduzir o time de suporte em 25% devido a cortes orçamentários. Como você estrutura essa transição minimizando impacto?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
  { texto: 'A empresa vai dobrar de tamanho nos próximos 2 anos. Como você planeja escalar as operações de suporte para acompanhar?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Scaling' },
];

// ============================================
// CIENTISTA DE DADOS
// ============================================

export const cientistaDadosJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Explique com suas palavras a diferença entre correlação e causalidade. Por que isso é importante na análise de dados? Dê um exemplo.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Estatística Básica' },
  { texto: 'O que são variáveis categóricas e numéricas? Como você trataria cada tipo para usar em um modelo de machine learning?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Tratamento de Dados' },
  { texto: 'Explique o que é uma regressão linear simples. Em que situações você usaria esse modelo e quais são suas limitações?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Modelagem Básica' },
  { texto: 'Como você identifica e trata valores ausentes (missing values) em um dataset? Que técnicas você conhece e quando usar cada uma?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Data Cleaning' },

  // Experiência (4)
  { texto: 'Conte sobre um projeto de análise de dados que você realizou, seja acadêmico, pessoal ou profissional. Que ferramentas usou e que insights descobriu?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva sua experiência com Python, R ou outras ferramentas de análise. Que bibliotecas você conhece e como as utilizou?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { texto: 'Você já trabalhou com SQL para extrair dados? Conte sobre uma query mais complexa que você escreveu e o que ela resolvia.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'SQL' },
  { texto: 'Conte sobre uma visualização de dados que você criou. Como você escolheu o tipo de gráfico e que história os dados contavam?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'Visualização' },

  // Comportamental (4)
  { texto: 'Como você aborda um problema de dados quando não sabe por onde começar? Descreva seu processo de pensamento e exploração inicial.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Pensamento Analítico' },
  { texto: 'O que te atraiu para a área de ciência de dados? O que você mais gosta nesse campo e onde quer se desenvolver?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Como você se mantém atualizado com as mudanças rápidas na área de data science e machine learning? Que recursos você usa?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { texto: 'Como você lida quando seus dados não mostram o que você esperava encontrar? Descreva uma situação assim.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Objetividade' },

  // Situacional (4)
  { texto: 'Você recebeu um dataset para analisar, mas está cheio de problemas de qualidade. Descreva passo a passo como você o exploraria e limparia.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'EDA' },
  { texto: 'Um stakeholder pede para você provar que X causa Y, mas você só tem dados correlacionais. Como você explicaria as limitações da análise?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { texto: 'Você construiu um modelo com 99% de acurácia, mas seu mentor disse para desconfiar. O que poderia estar errado e como você investigaria?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'Pensamento Crítico' },
  { texto: 'O gerente pede uma análise urgente para uma reunião em 2 horas. Como você priorizaria o que fazer nesse tempo limitado?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
];

export const cientistaDadosPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Explique a diferença entre aprendizado supervisionado e não-supervisionado com exemplos práticos de quando usar cada um.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Machine Learning' },
  { texto: 'O que é overfitting e underfitting? Quais técnicas você usa para prevenir e diagnosticar esses problemas?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Modelagem' },
  { texto: 'Compare métricas de avaliação para classificação (accuracy, precision, recall, F1, AUC-ROC). Quando você priorizaria cada uma?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas' },
  { texto: 'Descreva seu processo de feature engineering. Quais técnicas você usa e como você decide quais features criar?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Feature Engineering' },
  { texto: 'Como você lida com dados desbalanceados em problemas de classificação? Quais técnicas funcionam melhor e quando?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Data Quality' },

  // Experiência (5)
  { texto: 'Conte sobre um projeto de data science que gerou impacto real no negócio. Como você mediu o sucesso?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos' },
  { texto: 'Descreva um modelo que você colocou em produção. Quais foram os desafios de MLOps e como você os superou?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'MLOps' },
  { texto: 'Conte sobre um caso onde os dados eram muito sujos ou incompletos. Como você tratou e qual foi o impacto na qualidade do modelo?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Data Cleaning' },
  { texto: 'Descreva uma análise exploratória que revelou insights inesperados. Como você comunicou os achados para stakeholders?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'EDA' },
  { texto: 'Você já trabalhou com experimentação A/B? Descreva o processo de design, execução e análise de um experimento.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Experimentação' },

  // Comportamental (4)
  { texto: 'Como você traduz resultados técnicos complexos para stakeholders não-técnicos? Dê um exemplo de apresentação que você fez.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'Como você prioriza projetos quando há múltiplas demandas de diferentes áreas? Que critérios você usa?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Priorização' },
  { texto: 'Como você reage quando um modelo não performa como esperado em produção? Descreva sua abordagem para diagnosticar e resolver.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Como você se mantém atualizado com os avanços rápidos em ML/AI? O que você aprendeu recentemente que aplicou no trabalho?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },

  // Situacional (4)
  { texto: 'O negócio precisa de uma previsão de vendas para o próximo trimestre. Descreva como você estruturaria o problema do início ao fim.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Problem Framing' },
  { texto: 'Você descobriu viés significativo em um modelo que já está em produção. Quais são os próximos passos?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética' },
  { texto: 'Os dados que você precisa para um projeto crítico não existem ou são de má qualidade. Como você abordaria isso com stakeholders?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Expectativas' },
  { texto: 'Um stakeholder quer usar o modelo para uma finalidade diferente da original. Como você avalia se isso é apropriado?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Governança' },
];

export const cientistaDadosSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Compare diferentes arquiteturas de deep learning (CNNs, RNNs, Transformers). Em que problemas cada uma se destaca e quais são os trade-offs?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Deep Learning' },
  { texto: 'Como você projetaria uma plataforma de ML para uma empresa que precisa treinar e servir centenas de modelos? Discuta MLOps, feature stores e model registry.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'ML Platform' },
  { texto: 'Explique técnicas de interpretabilidade de modelos (SHAP, LIME, feature importance). Quando interpretabilidade é crítica e como você a implementa?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Interpretabilidade' },
  { texto: 'Como você estrutura pipelines de ML robustos para produção? Discuta versionamento de dados, reproducibilidade, monitoramento e retreino.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'ML Engineering' },
  { texto: 'Discuta técnicas avançadas de experimentação além de A/B testing: multi-armed bandits, causal inference, synthetic control. Quando usar cada uma?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Experimentação Avançada' },

  // Experiência (5)
  { texto: 'Conte sobre um sistema de ML em produção que você arquitetou e que gerou impacto significativo no negócio. Que decisões técnicas você tomou?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'ML em Produção' },
  { texto: 'Descreva sua experiência construindo e liderando times de data science. Como você define papéis, contrata talentos e desenvolve a equipe?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Time' },
  { texto: 'Conte sobre um projeto onde você precisou lidar com problemas de escala em ML - dados massivos, latência baixa, ou throughput alto. Como resolveu?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'ML em Escala' },
  { texto: 'Descreva uma situação onde você teve que balancear rigor científico com necessidades pragmáticas de negócio. Como você navegou esse trade-off?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Pragmatismo' },
  { texto: 'Você já desenvolveu uma estratégia de dados para uma organização? Conte sobre governança, qualidade e democratização de dados que você implementou.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Estratégia de Dados' },

  // Comportamental (5)
  { texto: 'Como você influencia decisões de produto e negócio usando dados? Dê um exemplo onde sua análise mudou a direção estratégica da empresa.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Estratégica' },
  { texto: 'Como você comunica incerteza e limitações de modelos para executivos que querem respostas definitivas? Dê um exemplo concreto.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { texto: 'Como você constrói cultura de decisões baseadas em dados em uma organização? Que práticas você implementou?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura Data-Driven' },
  { texto: 'Como você equilibra inovação (experimentar novas técnicas) com estabilidade (manter sistemas em produção)? Qual sua filosofia?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { texto: 'Como você desenvolve cientistas de dados juniores e plenos para que cresçam em suas carreiras? Que oportunidades você cria?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Pessoas' },

  // Situacional (5)
  { texto: 'O CEO quer usar IA generativa em produtos críticos. Como você avaliaria riscos, oportunidades e faria recomendações?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'AI Strategy' },
  { texto: 'Um modelo em produção começou a degradar significativamente. Como você investigaria as causas e estruturaria a resposta?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'Model Monitoring' },
  { texto: 'A empresa quer construir capacidades de ML mas não tem maturidade de dados. Como você planejaria essa jornada de forma realista?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'Data Maturity' },
  { texto: 'Reguladores estão exigindo explicabilidade dos modelos de decisão automatizada. Como você estruturaria o compliance de ML?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'ML Compliance' },
  { texto: 'Você precisa decidir entre comprar uma solução de ML pronta ou construir internamente. Que fatores você analisaria para fazer a recomendação?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'Build vs Buy' },
];

// ============================================
// COORDENADOR DE TECNOLOGIA
// ============================================

export const coordenadorTecnologia: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Como você avalia e decide adotar novas tecnologias para a equipe? Quais critérios são mais importantes além das features técnicas?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação Tecnológica' },
  { texto: 'Descreva como você estruturaria a arquitetura de um sistema que precisa escalar de 1.000 para 1.000.000 de usuários.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura' },
  { texto: 'Quais métricas você usa para medir produtividade e qualidade de um time técnico? Como você evita métricas que geram comportamentos indesejados?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Métricas' },
  { texto: 'Como você estrutura processos de desenvolvimento (code review, CI/CD, testes) para equilibrar velocidade e qualidade?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Processos' },
  { texto: 'Discuta sua abordagem para gestão de dívida técnica. Como você quantifica, prioriza e comunica para stakeholders?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Técnica' },

  // Experiência (5)
  { texto: 'Conte sobre uma transformação tecnológica significativa que você liderou. Quais foram os maiores desafios e como você os superou?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança' },
  { texto: 'Descreva como você construiu ou reestruturou uma equipe de tecnologia. Como você definiu perfis, contratou e desenvolveu pessoas?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Building Team' },
  { texto: 'Conte sobre um projeto que falhou sob sua liderança. O que você aprendeu e como isso mudou sua abordagem?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { texto: 'Descreva sua experiência gerenciando orçamento de tecnologia. Como você planeja investimentos e justifica gastos?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Budget' },
  { texto: 'Conte sobre sua experiência negociando com fornecedores de tecnologia. Como você avalia vendors e conduz contratos?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Vendor Management' },

  // Comportamental (5)
  { texto: 'Como você equilibra demandas técnicas (débito técnico, refatoração) com expectativas de negócio (features, prazos)?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio' },
  { texto: 'Descreva sua abordagem para desenvolver e reter talentos técnicos. Como você cria planos de carreira e mantém pessoas engajadas?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Pessoas' },
  { texto: 'Como você lida com resistência a mudanças tecnológicas na organização? Dê um exemplo de como você conduziu uma mudança difícil.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Change Management' },
  { texto: 'Como você comunica decisões e riscos técnicos para a alta liderança? Que linguagem e métricas você usa?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { texto: 'Como você promove uma cultura de inovação mantendo a estabilidade operacional? Descreva práticas que você implementou.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura' },

  // Situacional (5)
  { texto: 'A equipe está sobrecarregada e há pressão por mais entregas. Como você negocia com stakeholders e protege o time?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Carga' },
  { texto: 'Um sistema crítico caiu em produção e está afetando clientes. Descreva como você conduziria a gestão de crise.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Dois desenvolvedores seniores estão em conflito sobre arquitetura e isso está afetando o time. Como você intervém?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Resolução de Conflitos' },
  { texto: 'O CEO quer adotar uma tecnologia que você acredita ser inadequada. Como você apresenta sua visão sem ser insubordinado?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Influência Upward' },
  { texto: 'Você precisa cortar 20% do orçamento de tecnologia. Como você estrutura a análise e comunica as decisões?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Recursos' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasTecnologia: PerguntaSeed[] = [
  ...desenvolvedorFrontendJunior,
  ...desenvolvedorFrontendPleno,
  ...desenvolvedorFrontendSenior,
  ...desenvolvedorBackendJunior,
  ...desenvolvedorBackendPleno,
  ...desenvolvedorBackendSenior,
  ...qaJunior,
  ...qaPleno,
  ...qaSenior,
  ...suporteTecnico,
  ...suporteTecnicoPleno,
  ...suporteTecnicoSenior,
  ...cientistaDadosJunior,
  ...cientistaDadosPleno,
  ...cientistaDadosSenior,
  ...coordenadorTecnologia,
];

export const estatisticasTecnologia = {
  total: perguntasTecnologia.length,
  porCargo: {
    'Desenvolvedor Front-End Junior': desenvolvedorFrontendJunior.length,
    'Desenvolvedor Front-End Pleno': desenvolvedorFrontendPleno.length,
    'Desenvolvedor Front-End Senior': desenvolvedorFrontendSenior.length,
    'Desenvolvedor Back-End Junior': desenvolvedorBackendJunior.length,
    'Desenvolvedor Back-End Pleno': desenvolvedorBackendPleno.length,
    'Desenvolvedor Back-End Senior': desenvolvedorBackendSenior.length,
    'QA Junior': qaJunior.length,
    'QA Pleno': qaPleno.length,
    'QA Senior': qaSenior.length,
    'Suporte Técnico Junior': suporteTecnico.length,
    'Suporte Técnico Pleno': suporteTecnicoPleno.length,
    'Suporte Técnico Senior': suporteTecnicoSenior.length,
    'Cientista de Dados Junior': cientistaDadosJunior.length,
    'Cientista de Dados Pleno': cientistaDadosPleno.length,
    'Cientista de Dados Senior': cientistaDadosSenior.length,
    'Coordenador de Tecnologia': coordenadorTecnologia.length,
  },
};
