/**
 * Banco de Perguntas v4 - TECNOLOGIA
 *
 * Cargos incluídos:
 * - Desenvolvedor Front-End (Junior, Pleno, Senior)
 * - Desenvolvedor Back-End (Junior, Pleno, Senior)
 * - QA / Testes (Junior, Pleno, Senior)
 * - Suporte Técnico / HelpDesk (Junior, Pleno, Senior)
 * - Cientista de Dados (Junior, Pleno, Senior)
 * - Coordenador de Tecnologia (Senior)
 * - Gerente de Projetos de TI (Junior, Pleno, Senior)
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
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique com suas palavras o que é o DOM e como o JavaScript interage com ele. Dê um exemplo prático de manipulação.', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'JavaScript' },
  { area: 'tecnologia', texto: 'Qual a diferença entre Flexbox e Grid no CSS? Em que situações você usaria cada um? Descreva um layout que você faria com cada tecnologia.', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'CSS' },
  { area: 'tecnologia', texto: 'O que são componentes em React e por que essa abordagem é útil? Como você decide quando criar um novo componente?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'React' },
  { area: 'tecnologia', texto: 'Explique a diferença entre let, const e var em JavaScript. Quando você usa cada um e por quê?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'JavaScript' },
  { area: 'tecnologia', texto: 'O que é responsividade em um site e quais técnicas você conhece para implementá-la? Descreva como você faria um layout se adaptar a diferentes tamanhos de tela.', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Responsividade' },
  { area: 'tecnologia', texto: 'Explique o que são eventos em JavaScript e como funciona o event bubbling. Como você adicionaria um listener de clique a um botão?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'tecnica', competencia: 'JavaScript' },

  // Experiência (5)
  { area: 'tecnologia', texto: 'Conte sobre um projeto front-end que você desenvolveu, seja pessoal, acadêmico ou profissional. Quais tecnologias usou e qual foi o maior desafio?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você precisou aprender uma tecnologia nova rapidamente. Como foi seu processo de aprendizado?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'tecnologia', texto: 'Você já trabalhou em equipe em algum projeto? Como foi a divisão de tarefas e a comunicação com outros desenvolvedores?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'tecnologia', texto: 'Conte sobre um bug que você teve dificuldade em resolver. Qual foi sua abordagem para encontrar a solução?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Debugging' },
  { area: 'tecnologia', texto: 'Descreva sua experiência usando Git em projetos. Quais comandos você mais utiliza e como foi a primeira vez que você resolveu um conflito de merge?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Versionamento' },

  // Comportamental (5)
  { area: 'tecnologia', texto: 'Como você se organiza para estudar e se manter atualizado com as mudanças constantes do ecossistema front-end?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'tecnologia', texto: 'Quando você recebe feedback sobre seu código, como você costuma reagir? Conte um exemplo de feedback que te ajudou a melhorar.', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade' },
  { area: 'tecnologia', texto: 'O que te motivou a seguir carreira em desenvolvimento front-end? O que você mais gosta nessa área?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'tecnologia', texto: 'Como você lida quando está travado em um problema e não consegue avançar? Qual sua estratégia?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'tecnologia', texto: 'Descreva como você organiza seu ambiente de trabalho e suas tarefas diárias. Que ferramentas ou métodos você usa para manter a produtividade?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'Você recebeu uma tarefa com prazo apertado, mas a especificação está incompleta. O designer não está disponível. Como você procederia?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'tecnologia', texto: 'O site que você desenvolveu está apresentando problemas visuais em um navegador específico que você não testou. Como você investigaria e resolveria?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Troubleshooting' },
  { area: 'tecnologia', texto: 'Você percebeu que cometeu um erro no código que já foi para produção. O que você faz?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Responsabilidade' },
  { area: 'tecnologia', texto: 'Um colega mais experiente sugeriu uma abordagem diferente da sua para resolver um problema. Você discorda. Como conduziria essa situação?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Você está desenvolvendo uma feature e percebe que ela ficará mais complexa do que o estimado inicialmente. O prazo está próximo. Como você comunicaria isso e o que proporia?', cargo: 'Desenvolvedor Front-End', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Expectativas' },
];

export const desenvolvedorFrontendPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique o conceito de Virtual DOM no React. Por que ele existe e como impacta a performance? Compare com a manipulação direta do DOM.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'React' },
  { area: 'tecnologia', texto: 'Descreva as diferenças entre Server-Side Rendering (SSR), Static Site Generation (SSG) e Client-Side Rendering (CSR). Quando você escolheria cada abordagem?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Arquitetura' },
  { area: 'tecnologia', texto: 'O que são React Hooks? Explique useState, useEffect e useContext com exemplos de casos de uso reais. Quando você criaria um custom hook?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'React Hooks' },
  { area: 'tecnologia', texto: 'Como você estrutura o gerenciamento de estado em uma aplicação React de médio porte? Compare Context API, Redux e outras alternativas que você conhece.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'State Management' },
  { area: 'tecnologia', texto: 'Quais estratégias você utiliza para otimizar a performance de uma aplicação front-end? Mencione técnicas de lazy loading, code splitting e otimização de renders.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Performance' },
  { area: 'tecnologia', texto: 'Explique como funciona o TypeScript e quais benefícios ele traz para projetos front-end. Como você define interfaces e tipos para props de componentes?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'TypeScript' },

  // Experiência (6)
  { area: 'tecnologia', texto: 'Conte sobre o projeto front-end mais complexo que você trabalhou. Quais decisões arquiteturais você tomou ou influenciou? O que faria diferente hoje?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Arquitetura' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você identificou e resolveu um problema de performance significativo em uma aplicação. Quais ferramentas usou para diagnosticar?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance' },
  { area: 'tecnologia', texto: 'Você já implementou ou trabalhou com Design Systems? Como foi a experiência de criar/manter componentes reutilizáveis em escala?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Design System' },
  { area: 'tecnologia', texto: 'Conte sobre uma vez que você precisou integrar uma API complexa ou mal documentada. Como você conduziu o processo?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Integração' },
  { area: 'tecnologia', texto: 'Descreva sua experiência com code reviews. Como você aborda dar feedback construtivo? Cite um exemplo de review que gerou aprendizado mútuo.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Code Review' },
  { area: 'tecnologia', texto: 'Conte sobre sua experiência escrevendo testes para aplicações front-end. Quais tipos de testes você já implementou e quais ferramentas utilizou?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Testes' },

  // Comportamental (6)
  { area: 'tecnologia', texto: 'Como você equilibra a entrega de features novas com a manutenção de qualidade técnica e pagamento de débito técnico?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão Técnica' },
  { area: 'tecnologia', texto: 'Quando um designer entrega um layout que você considera tecnicamente problemático ou difícil de manter, como você aborda essa conversa?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Como você se mantém produtivo quando precisa trabalhar em múltiplas tarefas ou projetos simultaneamente?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'tecnologia', texto: 'Descreva como você colabora com desenvolvedores back-end para definir contratos de API. Como você lida com divergências?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'tecnologia', texto: 'Como você reage quando precisa trabalhar com código legado ou mal estruturado de outros desenvolvedores? Descreva sua abordagem para entender e melhorar esse código.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'tecnologia', texto: 'Descreva como você lida com interrupções frequentes durante o dia de trabalho. Que estratégias você usa para manter o foco em tarefas complexas?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Foco' },

  // Situacional (6)
  { area: 'tecnologia', texto: 'Você está no meio de uma sprint e descobre que uma biblioteca crítica que você usa tem uma vulnerabilidade de segurança grave. Como você prioriza e comunica isso?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'O produto está lento em produção e os usuários estão reclamando. Você tem acesso a métricas de performance. Descreva passo a passo como você investigaria.', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Debugging' },
  { area: 'tecnologia', texto: 'A equipe precisa escolher entre migrar para uma nova versão do framework ou continuar na atual. Como você estruturaria a análise para tomar essa decisão?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Tomada de Decisão' },
  { area: 'tecnologia', texto: 'Você precisa implementar uma feature complexa e o prazo é curto. Você pode entregar algo funcional mas com código que precisará de refatoração, ou pedir mais tempo. O que você faz?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Trade-offs' },
  { area: 'tecnologia', texto: 'Um colega está constantemente atrasando entregas que bloqueiam seu trabalho. Como você abordaria essa situação para resolver o problema sem criar conflitos?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolução de Conflitos' },
  { area: 'tecnologia', texto: 'O Product Owner insiste em adicionar mais funcionalidades a uma sprint que já está cheia. Como você comunicaria as limitações e negociaria prioridades?', cargo: 'Desenvolvedor Front-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
];

export const desenvolvedorFrontendSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'tecnologia', texto: 'Como você projetaria a arquitetura front-end de uma aplicação que precisa escalar para milhões de usuários? Discuta estratégias de cache, CDN, micro-frontends e monitoramento.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura em Escala' },
  { area: 'tecnologia', texto: 'Compare diferentes abordagens de testing no front-end: unit tests, integration tests e E2E. Como você define a estratégia de testes para um projeto? Qual a cobertura ideal?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Testes' },
  { area: 'tecnologia', texto: 'Explique como funciona o processo de build e bundling moderno (Webpack, Vite, esbuild). Como você otimizaria o bundle size de uma aplicação grande?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Build Tools' },
  { area: 'tecnologia', texto: 'Discuta os trade-offs entre monorepo e multi-repo para aplicações front-end em times grandes. Que ferramentas e práticas você recomendaria?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Infraestrutura' },
  { area: 'tecnologia', texto: 'Como você implementaria acessibilidade (a11y) de forma sistemática em uma aplicação existente que não foi construída com esse foco? Quais métricas você acompanharia?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Acessibilidade' },
  { area: 'tecnologia', texto: 'Como você estruturaria um sistema de feature flags para permitir deploys graduais e experimentação A/B no front-end? Discuta arquitetura e boas práticas.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Feature Flags' },
  { area: 'tecnologia', texto: 'Explique estratégias de observabilidade para aplicações front-end: como você implementaria logging, error tracking e métricas de performance em produção?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Observabilidade' },

  // Experiência (7)
  { area: 'tecnologia', texto: 'Conte sobre uma decisão arquitetural importante que você liderou. Quais eram as alternativas, como você avaliou e qual foi o resultado a longo prazo?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Técnica' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você precisou mentorar ou desenvolver desenvolvedores menos experientes. Como você estruturou o processo e mediu o progresso?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { area: 'tecnologia', texto: 'Conte sobre um projeto que falhou ou teve problemas sérios. O que você aprendeu e como isso mudou sua abordagem em projetos futuros?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'tecnologia', texto: 'Você já liderou a migração de uma tecnologia legada para uma moderna? Como planejou, executou e garantiu continuidade do negócio durante a transição?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Migração' },
  { area: 'tecnologia', texto: 'Descreva sua experiência definindo padrões de código, guidelines e processos para times de front-end. Como você garantiu adoção?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Padronização' },
  { area: 'tecnologia', texto: 'Conte sobre um incidente crítico em produção que você ajudou a resolver. Como foi a investigação, a comunicação com stakeholders e as ações de prevenção implementadas?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Incident Management' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você precisou convencer a organização a investir em melhorias técnicas que não tinham valor de negócio imediato. Como você construiu o caso?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Advocacy Técnico' },

  // Comportamental (7)
  { area: 'tecnologia', texto: 'Como você equilibra inovação técnica com estabilidade quando está liderando decisões de tecnologia? Dê um exemplo concreto.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança' },
  { area: 'tecnologia', texto: 'Descreva como você comunica decisões técnicas complexas para stakeholders não-técnicos (produto, negócio). Como você adapta sua linguagem?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'tecnologia', texto: 'Como você lida com conflitos técnicos entre membros do time? Conte uma situação onde você mediou uma discussão.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Mediação' },
  { area: 'tecnologia', texto: 'Qual sua filosofia sobre documentação técnica? Como você garante que conhecimento crítico não fique apenas na cabeça de uma pessoa?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Documentação' },
  { area: 'tecnologia', texto: 'Como você decide quando é hora de parar de otimizar e entregar algo que funciona? Descreva seu processo de tomada de decisão.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { area: 'tecnologia', texto: 'Como você constrói confiança técnica com times de produto e negócio? Descreva práticas que você usa para estabelecer credibilidade.', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento' },
  { area: 'tecnologia', texto: 'Como você mantém sua relevância técnica enquanto assume mais responsabilidades de liderança? Que estratégias você usa para continuar evoluindo tecnicamente?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento Contínuo' },

  // Situacional (7)
  { area: 'tecnologia', texto: 'A empresa quer lançar um MVP em 3 meses. Você precisa definir a stack técnica. Como você aborda essa decisão considerando velocidade, escalabilidade e contratação futura?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia' },
  { area: 'tecnologia', texto: 'Dois desenvolvedores seniores do time discordam fortemente sobre a abordagem para uma feature crítica. Ambos têm argumentos válidos. Como você conduziria a situação?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Liderança' },
  { area: 'tecnologia', texto: 'O CTO quer adotar uma tecnologia nova que você acredita não ser a melhor escolha. Como você apresentaria seu ponto de vista?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { area: 'tecnologia', texto: 'Vocês identificaram que precisam reescrever uma parte crítica do sistema, mas o negócio não pode parar. Como você planejaria essa migração incremental?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento' },
  { area: 'tecnologia', texto: 'O time está desmotivado após uma sequência de sprints intensas. Como você atuaria para recuperar a moral sem comprometer entregas importantes?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Time' },
  { area: 'tecnologia', texto: 'A empresa está crescendo rapidamente e você precisa escalar o time de front-end de 3 para 10 pessoas em 6 meses. Como você estruturaria esse crescimento?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Scaling de Time' },
  { area: 'tecnologia', texto: 'Um desenvolvedor sênior do seu time está tendo problemas de desempenho e a qualidade do trabalho caiu. Como você abordaria essa situação?', cargo: 'Desenvolvedor Front-End', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Performance' },
];

// ============================================
// DESENVOLVEDOR BACK-END
// ============================================

export const desenvolvedorBackendJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique com suas palavras o que é uma API REST. Quais são os principais métodos HTTP e quando você usa cada um?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'APIs' },
  { area: 'tecnologia', texto: 'Qual a diferença entre banco de dados SQL e NoSQL? Em que situações você escolheria cada um? Dê exemplos.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Banco de Dados' },
  { area: 'tecnologia', texto: 'O que é autenticação e autorização? Explique a diferença e como você implementaria um login simples.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'Explique o conceito de versionamento de código com Git. Qual a diferença entre merge e rebase? Quando você usaria cada um?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Git' },
  { area: 'tecnologia', texto: 'O que são variáveis de ambiente e por que são importantes no desenvolvimento back-end? Como você as usaria para configurações sensíveis?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'Configuração' },
  { area: 'tecnologia', texto: 'Explique o que é JSON e por que ele é tão usado em APIs. Como você faria para validar dados recebidos em uma requisição?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'tecnica', competencia: 'APIs' },

  // Experiência (5)
  { area: 'tecnologia', texto: 'Conte sobre um projeto back-end que você desenvolveu, seja pessoal, acadêmico ou profissional. Quais tecnologias usou e quais desafios enfrentou?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você precisou debugar um erro difícil de encontrar. Qual foi sua abordagem?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Debugging' },
  { area: 'tecnologia', texto: 'Você já trabalhou com banco de dados em algum projeto? Conte como foi modelar os dados e quais queries você precisou fazer.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Banco de Dados' },
  { area: 'tecnologia', texto: 'Como você aprendeu a programar? Quais recursos você usa para continuar evoluindo?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'tecnologia', texto: 'Descreva sua experiência com alguma ferramenta de teste de API (Postman, Insomnia, etc.). Como você organizava e documentava suas requisições?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },

  // Comportamental (5)
  { area: 'tecnologia', texto: 'Quando você recebe um código para revisar ou herda código de outra pessoa, como você aborda o entendimento? Qual sua reação se encontra código confuso?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'tecnologia', texto: 'O que te atrai no desenvolvimento back-end especificamente? O que você mais gosta de construir?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'tecnologia', texto: 'Como você lida com tarefas que parecem entediantes ou repetitivas? Você tem alguma estratégia para se manter engajado?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Disciplina' },
  { area: 'tecnologia', texto: 'Quando você comete um erro no trabalho, como você costuma reagir? Conte um exemplo de como lidou com uma falha.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Responsabilidade' },
  { area: 'tecnologia', texto: 'Como você organiza seu tempo quando tem múltiplas tarefas para entregar? Que ferramentas ou métodos você usa?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'Você está desenvolvendo uma feature e percebe que a forma como foi especificada vai gerar problemas no futuro. O que você faz?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
  { area: 'tecnologia', texto: 'A aplicação está retornando um erro 500 em produção e você não sabe a causa. Descreva passo a passo como você investigaria.', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Troubleshooting' },
  { area: 'tecnologia', texto: 'Você recebeu uma tarefa mas não entendeu completamente os requisitos. O que você faz?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Você está travado em um problema há horas e não consegue resolver sozinho. Como você decide quando e como pedir ajuda?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'tecnologia', texto: 'O cliente reportou um bug, mas você não consegue reproduzir o problema no seu ambiente. Como você procederia para investigar?', cargo: 'Desenvolvedor Back-End', nivel: 'junior', categoria: 'situacional', competencia: 'Investigação' },
];

export const desenvolvedorBackendPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique os princípios SOLID e dê exemplos práticos de como você os aplica no dia a dia. Qual princípio você considera mais importante e por quê?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design Patterns' },
  { area: 'tecnologia', texto: 'Compare diferentes estratégias de cache (in-memory, Redis, CDN). Quando você usaria cada uma? Como você invalida cache de forma eficiente?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Cache' },
  { area: 'tecnologia', texto: 'Descreva como você projetaria um sistema de filas para processar tarefas assíncronas. Quais tecnologias usaria e como garantiria resiliência?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Mensageria' },
  { area: 'tecnologia', texto: 'O que são transactions em banco de dados? Explique ACID e quando você usaria diferentes níveis de isolamento.', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Banco de Dados' },
  { area: 'tecnologia', texto: 'Como você estrutura testes em uma aplicação back-end? Explique a diferença entre unit, integration e E2E tests. Qual a cobertura ideal?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Testes' },
  { area: 'tecnologia', texto: 'Explique como funciona o connection pooling em bancos de dados e por que é importante. Como você configura e monitora pools de conexão?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'tecnica', competencia: 'Banco de Dados' },

  // Experiência (6)
  { area: 'tecnologia', texto: 'Conte sobre uma API complexa que você desenvolveu. Quais decisões de design você tomou e por quê? O que faria diferente hoje?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'APIs' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você otimizou queries lentas no banco de dados. Quais ferramentas usou para diagnosticar e qual foi o ganho?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance' },
  { area: 'tecnologia', texto: 'Você já lidou com problemas de escalabilidade em produção? Conte como identificou o gargalo e qual foi a solução.', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Escalabilidade' },
  { area: 'tecnologia', texto: 'Conte sobre um incidente em produção que você ajudou a resolver. Qual foi o processo de investigação e o que você aprendeu?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Incident Response' },
  { area: 'tecnologia', texto: 'Descreva sua experiência implementando autenticação e autorização. Quais métodos você usou (JWT, OAuth, sessions) e quais foram os desafios?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'Conte sobre uma migração de banco de dados que você realizou em produção. Como você planejou, executou e garantiu que não haveria perda de dados?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'experiencia', competencia: 'Migração' },

  // Comportamental (6)
  { area: 'tecnologia', texto: 'Como você documenta suas APIs? O que você considera essencial em uma boa documentação técnica?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Documentação' },
  { area: 'tecnologia', texto: 'Como você equilibra a pressão por entregas rápidas com a necessidade de escrever código de qualidade?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Qualidade' },
  { area: 'tecnologia', texto: 'Como você explica conceitos técnicos complexos para colegas de outras áreas (produto, negócio)?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Como você lida com débito técnico? Como você convence stakeholders a investir tempo em refatoração?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão Técnica' },
  { area: 'tecnologia', texto: 'Descreva como você aborda code reviews. O que você considera importante verificar e como você dá feedback construtivo?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Code Review' },
  { area: 'tecnologia', texto: 'Como você reage quando suas ideias são rejeitadas pelo time ou pela liderança? Conte um exemplo de como você lidou com essa situação.', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },

  // Situacional (6)
  { area: 'tecnologia', texto: 'A API está retornando erros intermitentes e você não consegue reproduzir localmente. Como você investigaria?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Debugging' },
  { area: 'tecnologia', texto: 'Você precisa integrar com uma API externa que tem documentação ruim e suporte lento. Como você conduziria o desenvolvimento?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Integração' },
  { area: 'tecnologia', texto: 'O banco de dados está ficando lento conforme a base cresce. Quais seriam suas primeiras ações para investigar e melhorar?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Performance' },
  { area: 'tecnologia', texto: 'Você descobriu uma vulnerabilidade de segurança no código em produção. Qual seria seu plano de ação imediato?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'Um serviço terceiro do qual você depende está instável e causando falhas na sua aplicação. Como você mitigaria o problema a curto e longo prazo?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Resiliência' },
  { area: 'tecnologia', texto: 'O time de produto quer lançar uma feature que você sabe que vai criar problemas técnicos no futuro. Como você negociaria uma solução melhor?', cargo: 'Desenvolvedor Back-End', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
];

export const desenvolvedorBackendSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'tecnologia', texto: 'Compare arquiteturas monolíticas, microsserviços e serverless. Quais critérios você usa para decidir entre elas? Conte sobre trade-offs reais que você enfrentou.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura' },
  { area: 'tecnologia', texto: 'Como você projetaria um sistema que precisa processar milhões de eventos por dia com baixa latência? Discuta estratégias de particionamento, replicação e failover.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistemas Distribuídos' },
  { area: 'tecnologia', texto: 'Explique o teorema CAP e como ele influencia decisões de arquitetura. Dê exemplos de quando você priorizou consistência vs disponibilidade.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistemas Distribuídos' },
  { area: 'tecnologia', texto: 'Como você implementaria um sistema de rate limiting robusto? Discuta diferentes algoritmos e como garantir funcionalidade em ambiente distribuído.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Resiliência' },
  { area: 'tecnologia', texto: 'Discuta estratégias de observabilidade (logs, métricas, traces). Como você define alertas efetivos e evita fadiga de alertas?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Observabilidade' },
  { area: 'tecnologia', texto: 'Como você projetaria uma estratégia de versionamento de API que permita evolução sem quebrar clientes existentes? Discuta diferentes abordagens e seus trade-offs.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'APIs' },
  { area: 'tecnologia', texto: 'Explique como você implementaria um sistema de eventos usando event sourcing e CQRS. Quais são os benefícios e as complexidades dessa abordagem?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'tecnica', competencia: 'Event-Driven Architecture' },

  // Experiência (7)
  { area: 'tecnologia', texto: 'Conte sobre uma decisão arquitetural crítica que você liderou. Quais eram as alternativas, como você avaliou riscos e qual foi o resultado?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Técnica' },
  { area: 'tecnologia', texto: 'Descreva uma migração de sistema legado que você conduziu. Como você garantiu zero downtime e integridade de dados?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Migração' },
  { area: 'tecnologia', texto: 'Conte sobre um sistema que você construiu para escalar significativamente. Quais decisões tomou desde o início pensando em crescimento?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Escalabilidade' },
  { area: 'tecnologia', texto: 'Descreva sua experiência mentorando desenvolvedores. Como você estrutura o desenvolvimento de pessoas e mede evolução?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { area: 'tecnologia', texto: 'Conte sobre o incidente de produção mais desafiador que você enfrentou. Como foi o processo de resposta e o que mudou depois?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Incident Management' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você teve que fazer uma escolha entre velocidade de entrega e qualidade técnica. Como você tomou essa decisão e qual foi o resultado?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'Trade-offs' },
  { area: 'tecnologia', texto: 'Conte sobre um projeto onde você implementou práticas de DevOps ou SRE. Quais mudanças você introduziu e como elas impactaram a confiabilidade do sistema?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'experiencia', competencia: 'DevOps' },

  // Comportamental (7)
  { area: 'tecnologia', texto: 'Como você equilibra inovação técnica com pragmatismo de entrega? Dê um exemplo de quando você teve que fazer esse trade-off.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { area: 'tecnologia', texto: 'Como você influencia decisões técnicas em nível organizacional? Descreva uma situação onde você mudou a direção técnica da empresa.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência' },
  { area: 'tecnologia', texto: 'Como você constrói cultura de qualidade técnica em um time? O que você faz quando percebe que padrões estão caindo?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura' },
  { area: 'tecnologia', texto: 'Como você comunica riscos técnicos para executivos que não têm background técnico? Dê um exemplo concreto.', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'tecnologia', texto: 'Qual sua abordagem para delegar trabalho técnico complexo? Como você garante qualidade sem microgerenciar?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Delegação' },
  { area: 'tecnologia', texto: 'Como você mantém seu conhecimento técnico atualizado enquanto assume responsabilidades de liderança? Que estratégias funcionam para você?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento Contínuo' },
  { area: 'tecnologia', texto: 'Descreva como você lida com decisões técnicas impopulares que você sabe serem necessárias. Como você comunica e ganha apoio do time?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança' },

  // Situacional (7)
  { area: 'tecnologia', texto: 'O CEO quer lançar uma feature crítica em 2 semanas. Sua análise técnica indica que precisa de 2 meses para fazer direito. Como você aborda essa conversa?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação' },
  { area: 'tecnologia', texto: 'Dois times têm visões diferentes sobre como integrar seus serviços. Você precisa mediar e chegar a uma solução. Como conduziria?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Mediação' },
  { area: 'tecnologia', texto: 'Você identificou que um sistema crítico tem falhas de design fundamentais, mas reescrever seria muito custoso. Como você avalia e prioriza isso?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Risco' },
  { area: 'tecnologia', texto: 'A empresa está crescendo e você precisa definir como escalar o time técnico. Como você aborda a decisão entre contratar mais, terceirizar ou automatizar?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia' },
  { area: 'tecnologia', texto: 'Um desenvolvedor sênior do time está consistentemente entregando código de baixa qualidade. Como você aborda essa situação?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Performance' },
  { area: 'tecnologia', texto: 'A empresa quer adotar uma tecnologia que você tem reservas técnicas, mas há pressão política forte. Como você navegaria essa situação?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Política Organizacional' },
  { area: 'tecnologia', texto: 'O time está dividido entre duas abordagens técnicas válidas para um problema crítico. Como você facilitaria a tomada de decisão?', cargo: 'Desenvolvedor Back-End', nivel: 'senior', categoria: 'situacional', competencia: 'Facilitação' },
];

// ============================================
// QA / TESTES
// ============================================

export const qaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique a diferença entre testes funcionais e não-funcionais. Dê exemplos de cada tipo e quando você os aplicaria.', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Tipos de Teste' },
  { area: 'tecnologia', texto: 'O que é um caso de teste bem escrito? Quais elementos ele deve conter e como você organiza a documentação?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },
  { area: 'tecnologia', texto: 'Explique o que é teste de regressão e por que ele é importante. Como você decide o que incluir em uma suíte de regressão?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Regressão' },
  { area: 'tecnologia', texto: 'O que você verifica ao testar um formulário web? Liste os cenários de teste que você consideraria.', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Teste' },
  { area: 'tecnologia', texto: 'Explique a diferença entre teste de caixa preta e caixa branca. Em que situações você usaria cada abordagem?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Tipos de Teste' },
  { area: 'tecnologia', texto: 'O que são testes de boundary (valores limite)? Dê um exemplo prático de como você aplicaria essa técnica.', cargo: 'QA / Testes', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Teste' },

  // Experiência (5)
  { area: 'tecnologia', texto: 'Conte sobre sua experiência com testes de software. Que tipos de teste você já executou e em quais projetos?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência' },
  { area: 'tecnologia', texto: 'Descreva um bug interessante que você encontrou. Como você o descobriu e documentou?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Bug Finding' },
  { area: 'tecnologia', texto: 'Você já usou alguma ferramenta de gestão de testes ou bugs? Qual e como foi sua experiência?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { area: 'tecnologia', texto: 'Conte sobre uma situação onde você precisou testar algo sem documentação clara. Como você abordou?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'tecnologia', texto: 'Descreva como você organiza seu processo de teste. Como você planeja quais cenários testar e em que ordem?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'experiencia', competencia: 'Planejamento' },

  // Comportamental (5)
  { area: 'tecnologia', texto: 'Como você reage quando um desenvolvedor discorda que algo é um bug? Como você defende seu ponto de vista?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'O que te atrai na área de QA? O que você mais gosta de fazer no processo de teste?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'tecnologia', texto: 'Como você lida com a pressão de liberar software quando ainda há bugs conhecidos?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética' },
  { area: 'tecnologia', texto: 'Testar software pode ser repetitivo. Como você mantém atenção aos detalhes durante longas sessões de teste?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Disciplina' },
  { area: 'tecnologia', texto: 'Como você se organiza para acompanhar múltiplas features sendo desenvolvidas simultaneamente? Que ferramentas ou métodos você usa?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'Você encontrou um bug crítico às vésperas de um release importante. O que você faz?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { area: 'tecnologia', texto: 'A feature está pronta mas você não teve tempo de testar tudo. Como você prioriza o que testar primeiro?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Tempo' },
  { area: 'tecnologia', texto: 'O desenvolvedor diz que o bug que você reportou não é reproduzível. Como você procede?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Investigação' },
  { area: 'tecnologia', texto: 'Você percebeu que os requisitos estão incompletos e podem gerar problemas. O que você faz?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
  { area: 'tecnologia', texto: 'Durante os testes você descobriu um comportamento estranho que não é exatamente um bug, mas poderia confundir os usuários. Como você reportaria isso?', cargo: 'QA / Testes', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
];

export const qaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique a pirâmide de testes e como você a aplica na prática. Qual a proporção ideal entre unit, integration e E2E tests?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Estratégia de Testes' },
  { area: 'tecnologia', texto: 'Compare diferentes ferramentas de automação (Selenium, Cypress, Playwright). Quais são os trade-offs e quando você escolheria cada uma?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Automação' },
  { area: 'tecnologia', texto: 'O que é BDD e como Gherkin/Cucumber se encaixam? Quais são as vantagens e desvantagens dessa abordagem?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'BDD' },
  { area: 'tecnologia', texto: 'Como você testa APIs? Quais ferramentas usa e que tipos de validação você faz além do status code?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'API Testing' },
  { area: 'tecnologia', texto: 'Explique como você integraria testes automatizados em uma pipeline de CI/CD. Quais práticas você considera essenciais?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'CI/CD' },
  { area: 'tecnologia', texto: 'Como você estrutura os dados de teste para garantir que os cenários sejam independentes e reproduzíveis? Quais técnicas você usa?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'tecnica', competencia: 'Test Data Management' },

  // Experiência (6)
  { area: 'tecnologia', texto: 'Conte sobre um projeto de automação de testes que você liderou ou participou significativamente. Quais resultados alcançou?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Automação' },
  { area: 'tecnologia', texto: 'Descreva o bug mais complexo que você encontrou. Qual foi o processo de investigação até identificar a causa raiz?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Investigação' },
  { area: 'tecnologia', texto: 'Conte sobre sua experiência em ambiente ágil. Como você participa das cerimônias e colabora com o time?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Agile' },
  { area: 'tecnologia', texto: 'Você já implementou testes de performance ou carga? Descreva a abordagem e as ferramentas utilizadas.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Performance Testing' },
  { area: 'tecnologia', texto: 'Conte sobre uma situação onde você ajudou a melhorar a qualidade do código através de colaboração com desenvolvedores. O que você fez?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Colaboração' },
  { area: 'tecnologia', texto: 'Descreva sua experiência testando aplicações mobile. Quais foram os desafios específicos e como você os superou?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'experiencia', competencia: 'Mobile Testing' },

  // Comportamental (6)
  { area: 'tecnologia', texto: 'Como você constrói relacionamento produtivo com desenvolvedores? Descreva como você comunica bugs de forma construtiva.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'tecnologia', texto: 'Como você equilibra a pressão por velocidade de entrega com a necessidade de qualidade?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trade-offs' },
  { area: 'tecnologia', texto: 'Como você defende a importância de testes quando há pressão para pular etapas? Dê um exemplo concreto.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Advocacy' },
  { area: 'tecnologia', texto: 'Como você se mantém atualizado com práticas e ferramentas de QA? O que você aprendeu recentemente?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado' },
  { area: 'tecnologia', texto: 'Como você ajuda QAs mais novos a se desenvolverem? Descreva uma situação onde você atuou como mentor informal.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'tecnologia', texto: 'Como você lida com situações onde discorda da decisão de lançar um software com bugs conhecidos? Descreva uma situação real.', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética' },

  // Situacional (6)
  { area: 'tecnologia', texto: 'Os testes automatizados estão falhando intermitentemente (flaky tests). Como você aborda esse problema?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Troubleshooting' },
  { area: 'tecnologia', texto: 'Uma release urgente precisa sair hoje e você tem tempo limitado para testar. Como você estrutura sua abordagem?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Risk-based Testing' },
  { area: 'tecnologia', texto: 'O time quer aumentar a cobertura de testes automatizados. Como você priorizaria o que automatizar primeiro?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Estratégia' },
  { area: 'tecnologia', texto: 'Você descobriu que uma feature antiga nunca foi testada adequadamente e pode ter bugs. O que você faz?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Risco' },
  { area: 'tecnologia', texto: 'Um desenvolvedor entregou uma feature sem os cenários de teste que você havia acordado. Como você aborda essa situação?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'O time está considerando remover testes antigos para acelerar a pipeline. Como você avaliaria quais testes podem ser removidos com segurança?', cargo: 'QA / Testes', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise de Risco' },
];

export const qaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'tecnologia', texto: 'Como você estrutura uma estratégia de qualidade para uma organização que está crescendo rapidamente? Que frameworks e processos você implementaria?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de Qualidade' },
  { area: 'tecnologia', texto: 'Discuta arquiteturas de automação de testes em escala. Como você organiza page objects, data factories, e mantém testes manuteníveis em projetos grandes?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura de Automação' },
  { area: 'tecnologia', texto: 'Como você implementa testes de contrato (contract testing) em uma arquitetura de microsserviços? Compare ferramentas como Pact e Spring Cloud Contract.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Contract Testing' },
  { area: 'tecnologia', texto: 'Explique como você estruturaria testes de performance end-to-end. Que métricas você definiria, que ferramentas usaria e como você analisaria gargalos?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Performance Testing' },
  { area: 'tecnologia', texto: 'Como você implementa testes de segurança (SAST, DAST, penetration testing) no ciclo de desenvolvimento? Que ferramentas e processos você recomendaria?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Security Testing' },
  { area: 'tecnologia', texto: 'Como você projetaria uma estratégia de testes para um ambiente de dados sensíveis onde você não pode usar dados reais de produção? Quais técnicas de anonimização e geração de dados você usaria?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Test Data Strategy' },
  { area: 'tecnologia', texto: 'Discuta como você implementaria testes de resiliência e chaos engineering. Que ferramentas você usaria e como você estruturaria os experimentos?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'tecnica', competencia: 'Chaos Engineering' },

  // Experiência (7)
  { area: 'tecnologia', texto: 'Conte sobre uma transformação de qualidade que você liderou em uma organização. Qual era o cenário inicial, que mudanças você implementou e quais resultados alcançou?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação' },
  { area: 'tecnologia', texto: 'Descreva sua experiência construindo e liderando times de QA. Como você define papéis, contrata talentos e desenvolve a equipe?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Time' },
  { area: 'tecnologia', texto: 'Conte sobre um projeto onde você implementou shift-left testing com sucesso. Como você mudou a cultura e quais benefícios foram alcançados?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Shift-Left' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você precisou definir SLAs de qualidade e métricas para o negócio. Como você escolheu as métricas e como elas impactaram decisões?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Métricas de Negócio' },
  { area: 'tecnologia', texto: 'Você já liderou a seleção e implementação de ferramentas de teste para uma organização? Conte sobre o processo de avaliação e adoção.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Tooling' },
  { area: 'tecnologia', texto: 'Conte sobre uma situação onde você teve que equilibrar múltiplos projetos críticos com recursos limitados de QA. Como você priorizou e garantiu qualidade?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Recursos' },
  { area: 'tecnologia', texto: 'Descreva um caso onde você precisou mudar a mentalidade de desenvolvimento para "quality first". Quais obstáculos enfrentou e como os superou?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'experiencia', competencia: 'Change Management' },

  // Comportamental (7)
  { area: 'tecnologia', texto: 'Como você constrói cultura de qualidade onde todos se sentem responsáveis, não apenas o time de QA? Dê exemplos de práticas que você implementou.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Qualidade' },
  { area: 'tecnologia', texto: 'Como você influencia decisões de arquitetura e design para tornar sistemas mais testáveis? Descreva uma situação onde você interveio cedo no processo.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Técnica' },
  { area: 'tecnologia', texto: 'Como você comunica riscos de qualidade para executivos de forma que eles entendam o impacto no negócio? Dê um exemplo concreto.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'tecnologia', texto: 'Como você equilibra a busca por qualidade perfeita com a realidade de prazos e recursos limitados? Qual sua filosofia sobre "good enough"?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { area: 'tecnologia', texto: 'Como você desenvolve e mentora QAs para que cresçam em suas carreiras? Que oportunidades você cria e como mede evolução?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Pessoas' },
  { area: 'tecnologia', texto: 'Como você mantém sua relevância técnica em um cenário onde as ferramentas e práticas de teste evoluem rapidamente? Que estratégias você usa?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Atualização Técnica' },
  { area: 'tecnologia', texto: 'Como você lida com situações onde a liderança não valoriza adequadamente a função de QA? Descreva como você construiria o caso para mais investimento.', cargo: 'QA / Testes', nivel: 'senior', categoria: 'comportamental', competencia: 'Advocacy' },

  // Situacional (7)
  { area: 'tecnologia', texto: 'A empresa quer lançar um produto sem testes adequados devido a pressão de mercado. Como você apresenta os riscos e negocia uma abordagem razoável?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Risco' },
  { area: 'tecnologia', texto: 'Os testes automatizados estão demorando muito para rodar e bloqueando a pipeline. Como você investigaria e resolveria esse problema estruturalmente?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização' },
  { area: 'tecnologia', texto: 'Um bug crítico em produção não foi detectado pelos testes. Como você conduz a análise post-mortem e que mudanças você proporia?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Post-Mortem' },
  { area: 'tecnologia', texto: 'O time de desenvolvimento quer eliminar o time de QA separado e ter QAs embedded nos squads. Como você avalia essa proposta?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Estrutura Organizacional' },
  { area: 'tecnologia', texto: 'Você precisa reduzir o time de QA em 30% mantendo a cobertura de qualidade. Como você estruturaria essa transição?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
  { area: 'tecnologia', texto: 'A empresa está adquirindo outra empresa com práticas de QA completamente diferentes. Como você planejaria a integração dos processos de qualidade?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Integração' },
  { area: 'tecnologia', texto: 'Você identificou que a equipe de QA está sobrecarregada e a qualidade está caindo. Como você apresentaria um caso para expansão do time para a liderança?', cargo: 'QA / Testes', nivel: 'senior', categoria: 'situacional', competencia: 'Business Case' },
];

// ============================================
// SUPORTE TÉCNICO / HELPDESK
// ============================================

export const suporteTecnico: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Descreva seu processo de troubleshooting quando um usuário relata que o computador está lento. Quais são os primeiros passos?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Troubleshooting' },
  { area: 'tecnologia', texto: 'Explique como funciona uma rede básica: o que são IP, DNS, DHCP? Como você verificaria se há problema de conectividade?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Redes' },
  { area: 'tecnologia', texto: 'Quais ferramentas de acesso remoto você conhece? Descreva o passo a passo de como você conduziria um atendimento remoto.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Ferramentas' },
  { area: 'tecnologia', texto: 'Um usuário esqueceu a senha e precisa resetar. Descreva o processo que você seguiria garantindo a segurança.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'Explique a diferença entre hardware e software. Dê exemplos de problemas comuns em cada categoria e como você os identificaria.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Diagnóstico' },
  { area: 'tecnologia', texto: 'O que é um sistema operacional e quais são os mais comuns em ambiente corporativo? Como você verificaria a versão instalada em uma máquina?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas Operacionais' },

  // Experiência (5)
  { area: 'tecnologia', texto: 'Conte sobre um problema técnico complexo que você resolveu e que te deixou orgulhoso. Qual foi o processo?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução' },
  { area: 'tecnologia', texto: 'Descreva sua experiência com atendimento ao usuário. Como você organizava suas demandas e priorizava chamados?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },
  { area: 'tecnologia', texto: 'Você já criou alguma documentação ou tutorial para ajudar usuários? Conte como foi o processo.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Documentação' },
  { area: 'tecnologia', texto: 'Conte sobre uma situação onde você precisou aprender rapidamente sobre um sistema ou tecnologia nova para resolver um problema.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'tecnologia', texto: 'Descreva sua experiência com instalação e configuração de softwares. Quais foram os desafios mais comuns que você enfrentou?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'experiencia', competencia: 'Instalação' },

  // Comportamental (5)
  { area: 'tecnologia', texto: 'Como você explica problemas técnicos para usuários que não entendem de tecnologia? Dê um exemplo de como simplificaria uma explicação.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Descreva como você mantém a calma e paciência quando um usuário está frustrado ou irritado com um problema.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Inteligência Emocional' },
  { area: 'tecnologia', texto: 'Como você prioriza quando tem vários chamados urgentes ao mesmo tempo? Que critérios você usa?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Priorização' },
  { area: 'tecnologia', texto: 'O que te motiva a trabalhar com suporte técnico? O que você mais gosta nesse tipo de trabalho?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'tecnologia', texto: 'Como você lida com situações onde não sabe a resposta para um problema? Qual é sua abordagem para encontrar soluções?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'comportamental', competencia: 'Resolução de Problemas' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'Um diretor não consegue acessar o email minutos antes de uma reunião importante. Como você conduziria esse atendimento?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Urgência' },
  { area: 'tecnologia', texto: 'Você identificou que vários usuários estão com o mesmo problema. O que você faria além de resolver individualmente?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
  { area: 'tecnologia', texto: 'O usuário insiste que o problema é de TI, mas você suspeita que é erro de uso. Como você aborda essa situação?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Diplomacia' },
  { area: 'tecnologia', texto: 'Você não consegue resolver um problema e não há ninguém para escalar no momento. Como você procede com o usuário?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'tecnologia', texto: 'Um usuário liga dizendo que perdeu um arquivo importante. Quais passos você seguiria para tentar recuperá-lo?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'junior', categoria: 'situacional', competencia: 'Recuperação de Dados' },
];

export const suporteTecnicoPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Descreva como você estrutura uma base de conhecimento para o time de suporte. Que categorias, templates e processos de atualização você implementaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Knowledge Base' },
  { area: 'tecnologia', texto: 'Explique como você diagnosticaria problemas de performance em uma rede corporativa. Que ferramentas usaria e quais métricas analisaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Redes Avançado' },
  { area: 'tecnologia', texto: 'Como você gerencia Active Directory em ambiente Windows? Descreva processos de criação de usuários, grupos, GPOs e troubleshooting comum.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Active Directory' },
  { area: 'tecnologia', texto: 'Descreva sua experiência com virtualização (VMware, Hyper-V, VDI). Como você diagnostica problemas de performance em ambientes virtualizados?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Virtualização' },
  { area: 'tecnologia', texto: 'Como você implementa e gerencia soluções de backup e recuperação? Que estratégias você usa para garantir RPO e RTO adequados?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Backup e Recovery' },
  { area: 'tecnologia', texto: 'Explique como funciona o Office 365/Microsoft 365 em ambiente corporativo. Como você diagnosticaria problemas de sincronização ou acesso?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'tecnica', competencia: 'Cloud Services' },

  // Experiência (6)
  { area: 'tecnologia', texto: 'Conte sobre um projeto de melhoria de processos de suporte que você liderou. Qual era o problema, que mudanças implementou e quais resultados alcançou?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'tecnologia', texto: 'Descreva sua experiência treinando e desenvolvendo analistas de suporte mais novos. Como você estrutura o treinamento e mede evolução?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { area: 'tecnologia', texto: 'Conte sobre uma migração de sistema ou rollout de tecnologia que você participou. Como foi o planejamento e a execução?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de TI' },
  { area: 'tecnologia', texto: 'Você já implementou ou melhorou um sistema de tickets/ITSM? Conte sobre a experiência e os desafios enfrentados.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'ITSM' },
  { area: 'tecnologia', texto: 'Descreva sua experiência lidando com incidentes de segurança no ambiente de trabalho. Como você procedeu e o que aprendeu?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'Conte sobre uma situação onde você automatizou um processo manual no suporte. Quais ferramentas usou e qual foi o impacto?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'experiencia', competencia: 'Automação' },

  // Comportamental (6)
  { area: 'tecnologia', texto: 'Como você lida com usuários VIP ou executivos que esperam tratamento diferenciado? Descreva sua abordagem para esse tipo de atendimento.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atendimento VIP' },
  { area: 'tecnologia', texto: 'Como você equilibra atendimento reativo com trabalho proativo de melhoria da infraestrutura? Que estratégias você usa?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Proatividade' },
  { area: 'tecnologia', texto: 'Como você documenta soluções de forma que outros analistas possam usar? Qual sua filosofia sobre documentação técnica?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Documentação' },
  { area: 'tecnologia', texto: 'Como você mantém a calma e eficiência durante crises que afetam muitos usuários simultaneamente?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Crise' },
  { area: 'tecnologia', texto: 'Como você constrói relacionamentos com outras áreas de TI (desenvolvimento, infraestrutura, segurança) para resolver problemas mais rapidamente?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento' },
  { area: 'tecnologia', texto: 'Descreva como você gerencia as expectativas dos usuários quando um problema não pode ser resolvido imediatamente.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Expectativas' },

  // Situacional (6)
  { area: 'tecnologia', texto: 'O email corporativo está fora do ar e dezenas de usuários estão ligando ao mesmo tempo. Como você organiza a resposta a esse incidente?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Incident Management' },
  { area: 'tecnologia', texto: 'Você identificou que um problema recorrente poderia ser resolvido com uma mudança de processo, mas envolve outras áreas. Como você articula isso?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Problem Management' },
  { area: 'tecnologia', texto: 'Um analista júnior cometeu um erro que causou impacto nos usuários. Como você aborda a situação com ele e com a gestão?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Liderança' },
  { area: 'tecnologia', texto: 'A empresa está migrando para cloud e você precisa adaptar processos de suporte. Como você planejaria essa transição?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Cloud' },
  { area: 'tecnologia', texto: 'Um fornecedor de software não está cumprindo o SLA de suporte e isso afeta seus usuários. Como você escala e resolve?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Vendor Management' },
  { area: 'tecnologia', texto: 'A empresa adquiriu outra empresa e você precisa integrar os usuários ao ambiente de TI existente. Como você planejaria essa integração?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'pleno', categoria: 'situacional', competencia: 'Integração' },
];

export const suporteTecnicoSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'tecnologia', texto: 'Como você estrutura um Service Desk seguindo práticas ITIL? Que processos você considera essenciais e como você mede maturidade?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'ITIL' },
  { area: 'tecnologia', texto: 'Descreva como você projetaria a infraestrutura de TI para uma empresa de 500 funcionários. Que componentes incluiria e como garantiria disponibilidade?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura de Infraestrutura' },
  { area: 'tecnologia', texto: 'Como você implementa segurança em camadas em um ambiente corporativo? Discuta endpoint protection, segmentação de rede, identity management.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'Explique como você estruturaria automação de tarefas de suporte usando PowerShell, scripts ou ferramentas de RMM. Que processos você priorizaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'Automação' },
  { area: 'tecnologia', texto: 'Como você define e monitora SLAs para operações de suporte? Que métricas você acompanha e como você as apresenta para a gestão?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'SLA Management' },
  { area: 'tecnologia', texto: 'Como você projetaria um plano de disaster recovery e business continuity para as operações de TI? Que cenários você consideraria e como testaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'DR/BC' },
  { area: 'tecnologia', texto: 'Discuta estratégias de gestão de endpoints em ambientes híbridos (on-premise + cloud). Que ferramentas e políticas você implementaria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'tecnica', competencia: 'Endpoint Management' },

  // Experiência (7)
  { area: 'tecnologia', texto: 'Conte sobre uma transformação de operações de suporte que você liderou. Qual era o cenário inicial, que mudanças implementou e quais resultados alcançou?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação' },
  { area: 'tecnologia', texto: 'Descreva sua experiência construindo e liderando times de suporte. Como você define estrutura, contrata talentos e desenvolve a equipe?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Time' },
  { area: 'tecnologia', texto: 'Conte sobre um projeto de infraestrutura de grande porte que você planejou e executou. Qual era o escopo e os desafios principais?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de Infraestrutura' },
  { area: 'tecnologia', texto: 'Você já gerenciou orçamento de TI? Como você planeja investimentos, justifica gastos e otimiza custos operacionais?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Budget' },
  { area: 'tecnologia', texto: 'Conte sobre uma crise de TI significativa que você gerenciou. Como foi a resposta, comunicação e as mudanças implementadas depois?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Crisis Management' },
  { area: 'tecnologia', texto: 'Descreva sua experiência negociando contratos com fornecedores de tecnologia. Quais critérios você usa para avaliar e selecionar parceiros?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Vendor Management' },
  { area: 'tecnologia', texto: 'Conte sobre uma situação onde você precisou justificar investimentos significativos em tecnologia para a diretoria. Como você construiu o business case?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'experiencia', competencia: 'Business Case' },

  // Comportamental (7)
  { area: 'tecnologia', texto: 'Como você constrói relacionamento com outras áreas de TI (desenvolvimento, segurança) e com o negócio? Descreva sua abordagem de stakeholder management.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento' },
  { area: 'tecnologia', texto: 'Como você comunica problemas técnicos e necessidades de investimento para executivos não-técnicos? Dê um exemplo concreto.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'tecnologia', texto: 'Como você desenvolve líderes técnicos dentro do seu time? Que oportunidades você cria e como você mede potencial de liderança?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Líderes' },
  { area: 'tecnologia', texto: 'Como você equilibra manter operações estáveis com a necessidade de modernizar e inovar? Descreva sua filosofia.', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { area: 'tecnologia', texto: 'Como você lida com a pressão de reduzir custos mantendo ou melhorando a qualidade do serviço? Que estratégias você usa?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Eficiência' },
  { area: 'tecnologia', texto: 'Como você gerencia o bem-estar e a motivação de uma equipe que trabalha com demandas constantes e muitas vezes sob pressão?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Pessoas' },
  { area: 'tecnologia', texto: 'Como você mantém sua equipe atualizada com novas tecnologias e práticas enquanto mantém as operações do dia a dia?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento Contínuo' },

  // Situacional (7)
  { area: 'tecnologia', texto: 'A empresa está considerando terceirizar parte do suporte. Como você avaliaria essa decisão e que recomendação faria?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Terceirização' },
  { area: 'tecnologia', texto: 'Houve um incidente de segurança e você precisa coordenar a resposta de suporte enquanto a investigação acontece. Como você procede?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Security Incident' },
  { area: 'tecnologia', texto: 'O CEO reclama que TI é lenta e não atende às necessidades do negócio. Como você investiga as causas e propõe soluções?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Percepção de Valor' },
  { area: 'tecnologia', texto: 'Você precisa reduzir o time de suporte em 25% devido a cortes orçamentários. Como você estrutura essa transição minimizando impacto?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
  { area: 'tecnologia', texto: 'A empresa vai dobrar de tamanho nos próximos 2 anos. Como você planeja escalar as operações de suporte para acompanhar?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Scaling' },
  { area: 'tecnologia', texto: 'A satisfação dos usuários com o suporte está caindo. Como você diagnosticaria as causas e implementaria melhorias?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Customer Satisfaction' },
  { area: 'tecnologia', texto: 'Você identificou que um sistema legado crítico precisa ser substituído, mas o negócio depende dele diariamente. Como você planejaria essa transição?', cargo: 'Suporte Técnico / HelpDesk', nivel: 'senior', categoria: 'situacional', competencia: 'Modernização' },
];

// ============================================
// CIENTISTA DE DADOS
// ============================================

export const cientistaDadosJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique com suas palavras a diferença entre correlação e causalidade. Por que isso é importante na análise de dados? Dê um exemplo.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Estatística Básica' },
  { area: 'tecnologia', texto: 'O que são variáveis categóricas e numéricas? Como você trataria cada tipo para usar em um modelo de machine learning?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Tratamento de Dados' },
  { area: 'tecnologia', texto: 'Explique o que é uma regressão linear simples. Em que situações você usaria esse modelo e quais são suas limitações?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Modelagem Básica' },
  { area: 'tecnologia', texto: 'Como você identifica e trata valores ausentes (missing values) em um dataset? Que técnicas você conhece e quando usar cada uma?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Data Cleaning' },
  { area: 'tecnologia', texto: 'O que são outliers e por que eles são importantes na análise de dados? Como você identificaria e decidiria o que fazer com eles?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Data Quality' },
  { area: 'tecnologia', texto: 'Explique a diferença entre média, mediana e moda. Em que situações cada uma é mais apropriada para descrever um conjunto de dados?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'tecnica', competencia: 'Estatística Básica' },

  // Experiência (5)
  { area: 'tecnologia', texto: 'Conte sobre um projeto de análise de dados que você realizou, seja acadêmico, pessoal ou profissional. Que ferramentas usou e que insights descobriu?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'tecnologia', texto: 'Descreva sua experiência com Python, R ou outras ferramentas de análise. Que bibliotecas você conhece e como as utilizou?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { area: 'tecnologia', texto: 'Você já trabalhou com SQL para extrair dados? Conte sobre uma query mais complexa que você escreveu e o que ela resolvia.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'SQL' },
  { area: 'tecnologia', texto: 'Conte sobre uma visualização de dados que você criou. Como você escolheu o tipo de gráfico e que história os dados contavam?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'Visualização' },
  { area: 'tecnologia', texto: 'Descreva sua experiência com ferramentas de visualização como Tableau, Power BI ou bibliotecas Python. Qual você prefere e por quê?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas de BI' },

  // Comportamental (5)
  { area: 'tecnologia', texto: 'Como você aborda um problema de dados quando não sabe por onde começar? Descreva seu processo de pensamento e exploração inicial.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Pensamento Analítico' },
  { area: 'tecnologia', texto: 'O que te atraiu para a área de ciência de dados? O que você mais gosta nesse campo e onde quer se desenvolver?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'tecnologia', texto: 'Como você se mantém atualizado com as mudanças rápidas na área de data science e machine learning? Que recursos você usa?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'tecnologia', texto: 'Como você lida quando seus dados não mostram o que você esperava encontrar? Descreva uma situação assim.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Objetividade' },
  { area: 'tecnologia', texto: 'Como você organiza seu trabalho quando tem múltiplas análises para fazer? Que ferramentas ou métodos você usa para se manter organizado?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'Você recebeu um dataset para analisar, mas está cheio de problemas de qualidade. Descreva passo a passo como você o exploraria e limparia.', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'EDA' },
  { area: 'tecnologia', texto: 'Um stakeholder pede para você provar que X causa Y, mas você só tem dados correlacionais. Como você explicaria as limitações da análise?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Você construiu um modelo com 99% de acurácia, mas seu mentor disse para desconfiar. O que poderia estar errado e como você investigaria?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'Pensamento Crítico' },
  { area: 'tecnologia', texto: 'O gerente pede uma análise urgente para uma reunião em 2 horas. Como você priorizaria o que fazer nesse tempo limitado?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { area: 'tecnologia', texto: 'Você está apresentando uma análise e alguém questiona sua metodologia. Como você responderia e que evidências usaria para defender sua abordagem?', cargo: 'Cientista de Dados', nivel: 'junior', categoria: 'situacional', competencia: 'Defesa de Análise' },
];

export const cientistaDadosPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Explique a diferença entre aprendizado supervisionado e não-supervisionado com exemplos práticos de quando usar cada um.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Machine Learning' },
  { area: 'tecnologia', texto: 'O que é overfitting e underfitting? Quais técnicas você usa para prevenir e diagnosticar esses problemas?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Modelagem' },
  { area: 'tecnologia', texto: 'Compare métricas de avaliação para classificação (accuracy, precision, recall, F1, AUC-ROC). Quando você priorizaria cada uma?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas' },
  { area: 'tecnologia', texto: 'Descreva seu processo de feature engineering. Quais técnicas você usa e como você decide quais features criar?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Feature Engineering' },
  { area: 'tecnologia', texto: 'Como você lida com dados desbalanceados em problemas de classificação? Quais técnicas funcionam melhor e quando?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Data Quality' },
  { area: 'tecnologia', texto: 'Explique o conceito de cross-validation e por que ele é importante. Quais variações você conhece e quando usar cada uma?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'tecnica', competencia: 'Validação' },

  // Experiência (6)
  { area: 'tecnologia', texto: 'Conte sobre um projeto de data science que gerou impacto real no negócio. Como você mediu o sucesso?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'tecnologia', texto: 'Descreva um modelo que você colocou em produção. Quais foram os desafios de MLOps e como você os superou?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'MLOps' },
  { area: 'tecnologia', texto: 'Conte sobre um caso onde os dados eram muito sujos ou incompletos. Como você tratou e qual foi o impacto na qualidade do modelo?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Data Cleaning' },
  { area: 'tecnologia', texto: 'Descreva uma análise exploratória que revelou insights inesperados. Como você comunicou os achados para stakeholders?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'EDA' },
  { area: 'tecnologia', texto: 'Você já trabalhou com experimentação A/B? Descreva o processo de design, execução e análise de um experimento.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Experimentação' },
  { area: 'tecnologia', texto: 'Conte sobre uma situação onde você precisou comparar múltiplos modelos. Como você estruturou a avaliação e tomou a decisão final?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'experiencia', competencia: 'Model Selection' },

  // Comportamental (6)
  { area: 'tecnologia', texto: 'Como você traduz resultados técnicos complexos para stakeholders não-técnicos? Dê um exemplo de apresentação que você fez.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Como você prioriza projetos quando há múltiplas demandas de diferentes áreas? Que critérios você usa?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Priorização' },
  { area: 'tecnologia', texto: 'Como você reage quando um modelo não performa como esperado em produção? Descreva sua abordagem para diagnosticar e resolver.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'tecnologia', texto: 'Como você se mantém atualizado com os avanços rápidos em ML/AI? O que você aprendeu recentemente que aplicou no trabalho?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'tecnologia', texto: 'Como você colabora com engenheiros de dados e de software para garantir que seus modelos funcionem bem em produção?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'tecnologia', texto: 'Como você lida com prazos apertados quando o trabalho de data science requer exploração e experimentação que levam tempo?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },

  // Situacional (6)
  { area: 'tecnologia', texto: 'O negócio precisa de uma previsão de vendas para o próximo trimestre. Descreva como você estruturaria o problema do início ao fim.', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Problem Framing' },
  { area: 'tecnologia', texto: 'Você descobriu viés significativo em um modelo que já está em produção. Quais são os próximos passos?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética' },
  { area: 'tecnologia', texto: 'Os dados que você precisa para um projeto crítico não existem ou são de má qualidade. Como você abordaria isso com stakeholders?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Expectativas' },
  { area: 'tecnologia', texto: 'Um stakeholder quer usar o modelo para uma finalidade diferente da original. Como você avalia se isso é apropriado?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Governança' },
  { area: 'tecnologia', texto: 'Você criou um modelo muito bom, mas é muito complexo para explicar para o negócio. Como você equilibraria performance e interpretabilidade?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Trade-offs' },
  { area: 'tecnologia', texto: 'O time de produto quer lançar uma feature baseada em seu modelo amanhã, mas você ainda tem dúvidas sobre a qualidade. O que você faz?', cargo: 'Cientista de Dados', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Risco' },
];

export const cientistaDadosSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'tecnologia', texto: 'Compare diferentes arquiteturas de deep learning (CNNs, RNNs, Transformers). Em que problemas cada uma se destaca e quais são os trade-offs?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Deep Learning' },
  { area: 'tecnologia', texto: 'Como você projetaria uma plataforma de ML para uma empresa que precisa treinar e servir centenas de modelos? Discuta MLOps, feature stores e model registry.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'ML Platform' },
  { area: 'tecnologia', texto: 'Explique técnicas de interpretabilidade de modelos (SHAP, LIME, feature importance). Quando interpretabilidade é crítica e como você a implementa?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Interpretabilidade' },
  { area: 'tecnologia', texto: 'Como você estrutura pipelines de ML robustos para produção? Discuta versionamento de dados, reproducibilidade, monitoramento e retreino.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'ML Engineering' },
  { area: 'tecnologia', texto: 'Discuta técnicas avançadas de experimentação além de A/B testing: multi-armed bandits, causal inference, synthetic control. Quando usar cada uma?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Experimentação Avançada' },
  { area: 'tecnologia', texto: 'Como você projetaria um sistema de recomendação em escala? Discuta arquiteturas, algoritmos colaborativos vs baseados em conteúdo, e desafios de cold start.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistemas de Recomendação' },
  { area: 'tecnologia', texto: 'Explique como você implementaria um sistema de detecção de fraude em tempo real. Quais são os desafios técnicos e como você os endereçaria?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'tecnica', competencia: 'Real-time ML' },

  // Experiência (7)
  { area: 'tecnologia', texto: 'Conte sobre um sistema de ML em produção que você arquitetou e que gerou impacto significativo no negócio. Que decisões técnicas você tomou?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'ML em Produção' },
  { area: 'tecnologia', texto: 'Descreva sua experiência construindo e liderando times de data science. Como você define papéis, contrata talentos e desenvolve a equipe?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Time' },
  { area: 'tecnologia', texto: 'Conte sobre um projeto onde você precisou lidar com problemas de escala em ML - dados massivos, latência baixa, ou throughput alto. Como resolveu?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'ML em Escala' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você teve que balancear rigor científico com necessidades pragmáticas de negócio. Como você navegou esse trade-off?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Pragmatismo' },
  { area: 'tecnologia', texto: 'Você já desenvolveu uma estratégia de dados para uma organização? Conte sobre governança, qualidade e democratização de dados que você implementou.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Estratégia de Dados' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você precisou convencer a liderança a investir em infraestrutura de dados ou ML. Como você construiu o business case?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Business Case' },
  { area: 'tecnologia', texto: 'Conte sobre um projeto onde você trabalhou com dados de múltiplas fontes e precisou criar uma visão unificada. Quais foram os desafios de integração?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'experiencia', competencia: 'Data Integration' },

  // Comportamental (7)
  { area: 'tecnologia', texto: 'Como você influencia decisões de produto e negócio usando dados? Dê um exemplo onde sua análise mudou a direção estratégica da empresa.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Estratégica' },
  { area: 'tecnologia', texto: 'Como você comunica incerteza e limitações de modelos para executivos que querem respostas definitivas? Dê um exemplo concreto.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'tecnologia', texto: 'Como você constrói cultura de decisões baseadas em dados em uma organização? Que práticas você implementou?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura Data-Driven' },
  { area: 'tecnologia', texto: 'Como você equilibra inovação (experimentar novas técnicas) com estabilidade (manter sistemas em produção)? Qual sua filosofia?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { area: 'tecnologia', texto: 'Como você desenvolve cientistas de dados juniores e plenos para que cresçam em suas carreiras? Que oportunidades você cria?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Pessoas' },
  { area: 'tecnologia', texto: 'Como você lida com stakeholders que têm expectativas irrealistas sobre o que ML pode fazer? Descreva uma situação onde você precisou gerenciar essas expectativas.', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Expectativas' },
  { area: 'tecnologia', texto: 'Como você mantém a relevância técnica enquanto assume responsabilidades de liderança? Que estratégias funcionam para você?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento Contínuo' },

  // Situacional (7)
  { area: 'tecnologia', texto: 'O CEO quer usar IA generativa em produtos críticos. Como você avaliaria riscos, oportunidades e faria recomendações?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'AI Strategy' },
  { area: 'tecnologia', texto: 'Um modelo em produção começou a degradar significativamente. Como você investigaria as causas e estruturaria a resposta?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'Model Monitoring' },
  { area: 'tecnologia', texto: 'A empresa quer construir capacidades de ML mas não tem maturidade de dados. Como você planejaria essa jornada de forma realista?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'Data Maturity' },
  { area: 'tecnologia', texto: 'Reguladores estão exigindo explicabilidade dos modelos de decisão automatizada. Como você estruturaria o compliance de ML?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'ML Compliance' },
  { area: 'tecnologia', texto: 'Você precisa decidir entre comprar uma solução de ML pronta ou construir internamente. Que fatores você analisaria para fazer a recomendação?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'Build vs Buy' },
  { area: 'tecnologia', texto: 'O time de data science está crescendo e você precisa decidir entre uma estrutura centralizada ou descentralizada. Quais fatores você consideraria?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'Estrutura Organizacional' },
  { area: 'tecnologia', texto: 'Você identificou que um modelo está perpetuando vieses sociais em decisões de negócio. Como você abordaria isso com a liderança e o que proporia?', cargo: 'Cientista de Dados', nivel: 'senior', categoria: 'situacional', competencia: 'AI Ethics' },
];

// ============================================
// COORDENADOR DE TECNOLOGIA
// ============================================

export const coordenadorTecnologia: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'tecnologia', texto: 'Como você avalia e decide adotar novas tecnologias para a equipe? Quais critérios são mais importantes além das features técnicas?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação Tecnológica' },
  { area: 'tecnologia', texto: 'Descreva como você estruturaria a arquitetura de um sistema que precisa escalar de 1.000 para 1.000.000 de usuários.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Arquitetura' },
  { area: 'tecnologia', texto: 'Quais métricas você usa para medir produtividade e qualidade de um time técnico? Como você evita métricas que geram comportamentos indesejados?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Métricas' },
  { area: 'tecnologia', texto: 'Como você estrutura processos de desenvolvimento (code review, CI/CD, testes) para equilibrar velocidade e qualidade?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Processos' },
  { area: 'tecnologia', texto: 'Discuta sua abordagem para gestão de dívida técnica. Como você quantifica, prioriza e comunica para stakeholders?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Técnica' },
  { area: 'tecnologia', texto: 'Como você define e implementa padrões de segurança em uma organização? Quais frameworks e práticas você considera essenciais?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Segurança' },
  { area: 'tecnologia', texto: 'Descreva como você estruturaria um roadmap tecnológico de médio/longo prazo. Como você equilibra visão de futuro com necessidades imediatas?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'tecnica', competencia: 'Roadmap' },

  // Experiência (7)
  { area: 'tecnologia', texto: 'Conte sobre uma transformação tecnológica significativa que você liderou. Quais foram os maiores desafios e como você os superou?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança' },
  { area: 'tecnologia', texto: 'Descreva como você construiu ou reestruturou uma equipe de tecnologia. Como você definiu perfis, contratou e desenvolveu pessoas?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Building Team' },
  { area: 'tecnologia', texto: 'Conte sobre um projeto que falhou sob sua liderança. O que você aprendeu e como isso mudou sua abordagem?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'tecnologia', texto: 'Descreva sua experiência gerenciando orçamento de tecnologia. Como você planeja investimentos e justifica gastos?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Budget' },
  { area: 'tecnologia', texto: 'Conte sobre sua experiência negociando com fornecedores de tecnologia. Como você avalia vendors e conduz contratos?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Vendor Management' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você precisou demitir alguém da equipe por baixa performance. Como você conduziu o processo?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Performance' },
  { area: 'tecnologia', texto: 'Conte sobre uma integração de sistemas ou M&A que você liderou do ponto de vista técnico. Quais foram os principais desafios?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'experiencia', competencia: 'Integração' },

  // Comportamental (7)
  { area: 'tecnologia', texto: 'Como você equilibra demandas técnicas (débito técnico, refatoração) com expectativas de negócio (features, prazos)?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio' },
  { area: 'tecnologia', texto: 'Descreva sua abordagem para desenvolver e reter talentos técnicos. Como você cria planos de carreira e mantém pessoas engajadas?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Pessoas' },
  { area: 'tecnologia', texto: 'Como você lida com resistência a mudanças tecnológicas na organização? Dê um exemplo de como você conduziu uma mudança difícil.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Change Management' },
  { area: 'tecnologia', texto: 'Como você comunica decisões e riscos técnicos para a alta liderança? Que linguagem e métricas você usa?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'tecnologia', texto: 'Como você promove uma cultura de inovação mantendo a estabilidade operacional? Descreva práticas que você implementou.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura' },
  { area: 'tecnologia', texto: 'Como você lida com a pressão de manter-se técnico relevante enquanto assume mais responsabilidades de gestão?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento' },
  { area: 'tecnologia', texto: 'Descreva como você constrói relacionamentos efetivos com outras áreas da empresa (produto, vendas, operações). Que práticas funcionam?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento Interdepartamental' },

  // Situacional (7)
  { area: 'tecnologia', texto: 'A equipe está sobrecarregada e há pressão por mais entregas. Como você negocia com stakeholders e protege o time?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Carga' },
  { area: 'tecnologia', texto: 'Um sistema crítico caiu em produção e está afetando clientes. Descreva como você conduziria a gestão de crise.', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'tecnologia', texto: 'Dois desenvolvedores seniores estão em conflito sobre arquitetura e isso está afetando o time. Como você intervém?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Resolução de Conflitos' },
  { area: 'tecnologia', texto: 'O CEO quer adotar uma tecnologia que você acredita ser inadequada. Como você apresenta sua visão sem ser insubordinado?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Influência Upward' },
  { area: 'tecnologia', texto: 'Você precisa cortar 20% do orçamento de tecnologia. Como você estrutura a análise e comunica as decisões?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Recursos' },
  { area: 'tecnologia', texto: 'Uma pessoa-chave do time anunciou que está saindo. Como você gerencia o conhecimento e minimiza o impacto na operação?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Conhecimento' },
  { area: 'tecnologia', texto: 'A empresa está considerando terceirizar parte do desenvolvimento. Como você avaliaria essa decisão e que recomendação faria?', cargo: 'Coordenador de Tecnologia', nivel: 'senior', categoria: 'situacional', competencia: 'Outsourcing' },
];

// ============================================
// GERENTE DE PROJETOS DE TI
// ============================================

export const gerenteProjetosTIJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Quais metodologias de gerenciamento de projetos você conhece e como decide qual utilizar em cada situação?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Metodologias de Gestão' },
  { area: 'tecnologia', texto: 'Como você elabora um cronograma de projeto? Quais ferramentas você utiliza para isso?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Planejamento de Cronograma' },
  { area: 'tecnologia', texto: 'Explique como você estrutura uma WBS (Work Breakdown Structure) para um projeto de desenvolvimento de software.', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Estrutura de Projeto' },
  { area: 'tecnologia', texto: 'Quais indicadores você monitora para acompanhar a saúde de um projeto de TI?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Indicadores de Projeto' },
  { area: 'tecnologia', texto: 'Como você documenta e comunica o escopo de um projeto para a equipe técnica e stakeholders?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Escopo' },
  { area: 'tecnologia', texto: 'Quais técnicas você utiliza para estimar o esforço e duração de atividades em projetos de TI?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Estimativas' },

  // Experiência (5)
  { area: 'tecnologia', texto: 'Conte sobre um projeto de TI que você gerenciou. Qual foi o escopo, prazo e qual foi o maior desafio?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Gestão de Projetos' },
  { area: 'tecnologia', texto: 'Descreva uma situação em que você precisou lidar com mudança de escopo no meio de um projeto. Como gerenciou?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Gestão de Mudanças' },
  { area: 'tecnologia', texto: 'Como foi sua experiência trabalhando com equipes de desenvolvimento? Quais foram as principais lições aprendidas?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho com Equipes Técnicas' },
  { area: 'tecnologia', texto: 'Descreva um projeto que atrasou ou saiu do orçamento. O que aconteceu e como você lidou com a situação?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Gestão de Problemas' },
  { area: 'tecnologia', texto: 'Conte sobre sua experiência com ferramentas de gestão de projetos como Jira, MS Project, Trello ou similares.', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas de Gestão' },

  // Comportamental (5)
  { area: 'tecnologia', texto: 'Como você lida com a pressão de múltiplos projetos ou entregas simultâneas?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { area: 'tecnologia', texto: 'Descreva como você se comunica com stakeholders que não são técnicos sobre o andamento de projetos.', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'tecnologia', texto: 'Como você organiza seu dia para acompanhar projetos e ainda ter tempo para resolução de problemas?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'tecnologia', texto: 'Como você lida quando há conflito entre as prioridades do projeto e as limitações da equipe técnica?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Negociação' },
  { area: 'tecnologia', texto: 'De que forma você busca aprimorar seus conhecimentos em gestão de projetos e tecnologia?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Desenvolvimento Profissional' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'O cliente solicita uma mudança significativa de escopo a duas semanas do prazo final. Como você procede?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Mudanças' },
  { area: 'tecnologia', texto: 'Um desenvolvedor-chave está de férias e surge um bug crítico em produção. O que você faz?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'tecnologia', texto: 'O projeto está atrasado e o sponsor pergunta sobre o status. Como você comunica a situação?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação de Riscos' },
  { area: 'tecnologia', texto: 'Dois membros da equipe não estão se entendendo e isso está afetando as entregas. Como você intervém?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Conflitos' },
  { area: 'tecnologia', texto: 'O fornecedor de uma tecnologia crítica para o projeto não está cumprindo os prazos acordados. Qual sua abordagem?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Fornecedores' },
];

export const gerenteProjetosTIPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'tecnologia', texto: 'Como você estrutura um PMO ou escritório de projetos para uma área de TI? Quais processos são essenciais?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Estruturação de PMO' },
  { area: 'tecnologia', texto: 'Descreva como você aplica metodologias ágeis (Scrum, Kanban) em conjunto com práticas tradicionais de gestão.', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Metodologias Híbridas' },
  { area: 'tecnologia', texto: 'Como você estrutura a gestão de riscos em projetos de TI? Quais ferramentas e técnicas utiliza?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Riscos' },
  { area: 'tecnologia', texto: 'Quais métricas de performance de projeto você monitora e como as utiliza para tomada de decisão?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas de Projeto' },
  { area: 'tecnologia', texto: 'Como você gerencia o orçamento de projetos de TI e lida com variações de custo?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão Financeira' },
  { area: 'tecnologia', texto: 'Explique como você conduz reuniões de status e reporting para diferentes níveis de stakeholders.', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Reporting' },

  // Experiência (6)
  { area: 'tecnologia', texto: 'Conte sobre o projeto mais complexo que você gerenciou. Quais foram os principais desafios e como os superou?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos Complexos' },
  { area: 'tecnologia', texto: 'Descreva sua experiência gerenciando múltiplos projetos simultaneamente. Como você priorizou recursos e atenção?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Portfolio' },
  { area: 'tecnologia', texto: 'Conte sobre uma implementação de sistema que você liderou. Quais foram as principais lições aprendidas?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de Sistemas' },
  { area: 'tecnologia', texto: 'Descreva como você conduziu um projeto que precisou ser redefinido ou cancelado. Como foi o processo?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Recovery de Projetos' },
  { area: 'tecnologia', texto: 'Conte sobre sua experiência com gestão de contratos e fornecedores em projetos de TI.', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Contratos' },
  { area: 'tecnologia', texto: 'Descreva um projeto onde você precisou gerenciar equipes distribuídas ou remotas. Quais desafios enfrentou?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Equipes Distribuídas' },

  // Comportamental (6)
  { area: 'tecnologia', texto: 'Como você constrói e mantém relacionamentos com stakeholders de diferentes níveis hierárquicos?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Stakeholders' },
  { area: 'tecnologia', texto: 'Descreva como você equilibra a necessidade de controle do projeto com a autonomia da equipe técnica.', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança' },
  { area: 'tecnologia', texto: 'Como você lida com decisões difíceis que podem impactar o prazo ou orçamento do projeto?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'tecnologia', texto: 'De que forma você promove a colaboração entre áreas técnicas e de negócio em seus projetos?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Integração' },
  { area: 'tecnologia', texto: 'Como você mantém a motivação da equipe durante projetos longos ou com muitas dificuldades?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação de Equipe' },
  { area: 'tecnologia', texto: 'Descreva como você gerencia expectativas quando há pressão por entregas irrealistas.', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Expectativas' },

  // Situacional (6)
  { area: 'tecnologia', texto: 'O sponsor do projeto quer adicionar funcionalidades sem ajustar prazo ou orçamento. Como você negocia?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação de Escopo' },
  { area: 'tecnologia', texto: 'Um projeto crítico está em risco por causa de dependências externas fora do seu controle. O que você faz?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Dependências' },
  { area: 'tecnologia', texto: 'A equipe técnica diz que a estimativa inicial está subestimada. Como você renegocia com os stakeholders?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Replanejamento' },
  { area: 'tecnologia', texto: 'Dois projetos que você gerencia estão competindo pelos mesmos recursos. Como você prioriza?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Priorização de Recursos' },
  { area: 'tecnologia', texto: 'O projeto entregou funcionalidades, mas o usuário não está satisfeito com o resultado. Como você conduz?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Qualidade' },
  { area: 'tecnologia', texto: 'Um membro sênior da equipe está desmotivado e isso afeta o projeto. Qual sua abordagem?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Pessoas' },
];

export const gerenteProjetosTISenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'tecnologia', texto: 'Como você estrutura a governança de projetos e programas de TI em uma organização? Quais processos são críticos?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Governança de TI' },
  { area: 'tecnologia', texto: 'Descreva sua abordagem para gestão de portfolio de projetos de TI. Como você alinha com a estratégia do negócio?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Portfolio' },
  { area: 'tecnologia', texto: 'Como você avalia e gerencia a complexidade e interdependências em programas com múltiplos projetos?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Programas' },
  { area: 'tecnologia', texto: 'Quais frameworks e metodologias você utiliza para transformação digital? Como você mede o sucesso?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Transformação Digital' },
  { area: 'tecnologia', texto: 'Como você estrutura business cases para projetos de TI? Quais métricas de ROI você utiliza?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Business Case' },
  { area: 'tecnologia', texto: 'Descreva como você gerencia riscos em nível de programa ou portfolio. Quais técnicas de mitigação são mais eficazes?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Riscos Estratégicos' },
  { area: 'tecnologia', texto: 'Como você estrutura OKRs ou KPIs para medir o sucesso de iniciativas de TI alinhadas ao negócio?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Métricas Estratégicas' },

  // Experiência (7)
  { area: 'tecnologia', texto: 'Conte sobre uma transformação tecnológica de grande escala que você liderou. Quais foram os fatores de sucesso?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação' },
  { area: 'tecnologia', texto: 'Descreva sua experiência estruturando ou reestruturando um PMO de TI. Quais processos você implementou?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de PMO' },
  { area: 'tecnologia', texto: 'Conte sobre um programa ou portfolio de projetos que você gerenciou. Como você coordenou as interdependências?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Programas' },
  { area: 'tecnologia', texto: 'Descreva uma situação onde você teve que recuperar um projeto ou programa em situação crítica.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround de Projetos' },
  { area: 'tecnologia', texto: 'Conte sobre sua experiência com projetos de M&A ou integração de sistemas em fusões e aquisições.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de M&A' },
  { area: 'tecnologia', texto: 'Descreva como você desenvolveu e mentoreou outros gerentes de projeto na sua carreira.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Pessoas' },
  { area: 'tecnologia', texto: 'Conte sobre uma negociação complexa com fornecedores ou parceiros de tecnologia que você conduziu.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Negociação Estratégica' },

  // Comportamental (7)
  { area: 'tecnologia', texto: 'Como você influencia decisões estratégicas da organização usando a perspectiva de gestão de projetos?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Estratégica' },
  { area: 'tecnologia', texto: 'Descreva como você constrói e mantém relacionamentos com a alta liderança e C-level.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento Executivo' },
  { area: 'tecnologia', texto: 'Como você equilibra inovação e risco na seleção e priorização de projetos de TI?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Inovação' },
  { area: 'tecnologia', texto: 'Descreva como você promove uma cultura de execução e accountability na gestão de projetos.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Execução' },
  { area: 'tecnologia', texto: 'Como você lida com a complexidade política de projetos que envolvem múltiplas áreas da organização?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Navegação Política' },
  { area: 'tecnologia', texto: 'De que forma você se mantém atualizado sobre tendências de gestão de projetos e tecnologia?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'tecnologia', texto: 'Como você constrói times de alta performance em gestão de projetos?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Building Teams' },

  // Situacional (7)
  { area: 'tecnologia', texto: 'O board questiona o ROI de investimentos em TI. Como você defende e demonstra o valor gerado?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Investimentos' },
  { area: 'tecnologia', texto: 'Um programa estratégico está em risco por falta de recursos e disputas internas. Como você intervém?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crises' },
  { area: 'tecnologia', texto: 'A empresa precisa cortar 30% do budget de projetos. Como você prioriza e comunica as decisões?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Priorização de Investimentos' },
  { area: 'tecnologia', texto: 'Há conflito entre a área de TI e o negócio sobre prioridades de projetos. Como você media?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Alinhamento TI-Negócio' },
  { area: 'tecnologia', texto: 'Um projeto estratégico entregue não está gerando os benefícios esperados. Como você conduz o pós-projeto?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Realização de Benefícios' },
  { area: 'tecnologia', texto: 'A organização quer adotar uma nova metodologia de projetos rapidamente. Como você planeja a transição?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Change Management' },
  { area: 'tecnologia', texto: 'Um parceiro estratégico de tecnologia está apresentando problemas graves de entrega. Qual sua abordagem?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Parcerias' },
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
  ...gerenteProjetosTIJunior,
  ...gerenteProjetosTIPleno,
  ...gerenteProjetosTISenior,
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
    'Gerente de Projetos de TI Junior': gerenteProjetosTIJunior.length,
    'Gerente de Projetos de TI Pleno': gerenteProjetosTIPleno.length,
    'Gerente de Projetos de TI Senior': gerenteProjetosTISenior.length,
  },
};
