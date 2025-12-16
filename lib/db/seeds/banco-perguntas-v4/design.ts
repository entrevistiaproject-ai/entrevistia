/**
 * Banco de Perguntas v4 - DESIGN (UX, UI, UI/UX, Design Gráfico)
 *
 * Melhorias aplicadas:
 * - Perguntas aprofundadas (sem sim/não)
 * - Variações por nível
 * - Perguntas de case e cenário
 * - Perguntas de valores e cultura
 */

import { PerguntaSeed, Estatisticas } from './types';

// ============================================
// DESIGNER UX
// ============================================

export const designerUxJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Explique com suas palavras o que é UX Design e qual a diferença entre UX e UI. Por que essa distinção é importante?', cargo: 'Designer UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Fundamentos de UX' },
  { area: 'design', texto: 'Descreva o processo de Design Thinking e suas etapas principais. Como você aplicaria cada uma em um projeto real?', cargo: 'Designer UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Design Thinking' },
  { area: 'design', texto: 'O que são personas e como você criaria uma? Quais informações são essenciais e quais fontes de dados você usaria?', cargo: 'Designer UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Pesquisa de Usuário' },
  { area: 'design', texto: 'Explique a diferença entre wireframe de baixa e alta fidelidade. Quando você usaria cada um no processo de design?', cargo: 'Designer UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Wireframing' },
  { area: 'design', texto: 'O que é um fluxo de usuário (user flow) e por que ele é importante? Como você documentaria o fluxo de um cadastro de usuário?', cargo: 'Designer UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Arquitetura de Informação' },
  { area: 'design', texto: 'Quais heurísticas de usabilidade de Nielsen você conhece? Dê exemplos de como verificar se uma interface segue essas heurísticas.', cargo: 'Designer UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Usabilidade' },

  // Experiência (5)
  { area: 'design', texto: 'Conte sobre um projeto de UX que você desenvolveu, seja pessoal, acadêmico ou profissional. Qual foi seu processo e quais entregáveis você criou?', cargo: 'Designer UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'design', texto: 'Descreva uma situação onde você precisou aprender uma ferramenta de design nova rapidamente. Como foi seu processo de aprendizado?', cargo: 'Designer UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'design', texto: 'Você já realizou algum tipo de pesquisa com usuários? Conte como foi a experiência e o que você aprendeu.', cargo: 'Designer UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Pesquisa' },
  { area: 'design', texto: 'Conte sobre uma vez que você recebeu feedback negativo sobre seu design. Como você reagiu e o que mudou?', cargo: 'Designer UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback' },
  { area: 'design', texto: 'Descreva sua experiência usando Figma, Sketch ou outras ferramentas de prototipagem. Quais funcionalidades você mais utiliza?', cargo: 'Designer UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },

  // Comportamental (5)
  { area: 'design', texto: 'Como você se organiza para estudar e se manter atualizado com as tendências de UX Design?', cargo: 'Designer UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'design', texto: 'Quando você apresenta seu trabalho e recebe críticas, como você costuma reagir? Conte um exemplo.', cargo: 'Designer UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade' },
  { area: 'design', texto: 'O que te motivou a seguir carreira em UX Design? O que você mais gosta nessa área?', cargo: 'Designer UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'design', texto: 'Como você lida quando está travado em um problema de design e não consegue avançar? Qual sua estratégia?', cargo: 'Designer UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'design', texto: 'Descreva como você organiza seus arquivos de design e documentação de projetos.', cargo: 'Designer UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (5)
  { area: 'design', texto: 'Você recebeu uma tarefa de criar um fluxo de usuário, mas as informações do produto estão incompletas. Como você procederia?', cargo: 'Designer UX', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'design', texto: 'O stakeholder insiste em uma funcionalidade que você acredita prejudicar a experiência do usuário. Como você abordaria essa situação?', cargo: 'Designer UX', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'design', texto: 'Você percebeu que um fluxo que você desenhou tem problemas após ver usuários reais usando o produto. O que você faz?', cargo: 'Designer UX', nivel: 'junior', categoria: 'situacional', competencia: 'Responsabilidade' },
  { area: 'design', texto: 'Um desenvolvedor diz que sua solução de design é muito complexa para implementar no prazo. Como conduziria essa situação?', cargo: 'Designer UX', nivel: 'junior', categoria: 'situacional', competencia: 'Colaboração' },
  { area: 'design', texto: 'Você está desenvolvendo uma feature e percebe que ela ficará mais complexa do que o estimado inicialmente. Como você comunicaria isso?', cargo: 'Designer UX', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Expectativas' },
];

export const designerUxPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Compare diferentes métodos de pesquisa de usuário (entrevistas, surveys, testes de usabilidade, card sorting). Quando você usaria cada um?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Pesquisa de Usuário' },
  { area: 'design', texto: 'Explique como você conduz um teste de usabilidade do início ao fim. Como você define tarefas, recruta participantes e analisa resultados?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Testes de Usabilidade' },
  { area: 'design', texto: 'O que é arquitetura de informação e como você a aplica em projetos? Descreva o processo de criar uma estrutura de navegação.', cargo: 'Designer UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Arquitetura de Informação' },
  { area: 'design', texto: 'Como você mede o sucesso de uma solução de UX? Quais métricas você utiliza e como as conecta com objetivos de negócio?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas de UX' },
  { area: 'design', texto: 'Explique a diferença entre design centrado no usuário e design orientado a dados. Como você equilibra insights qualitativos e quantitativos?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Metodologia' },
  { area: 'design', texto: 'Como você documenta e comunica decisões de design para stakeholders e desenvolvedores? Que artefatos você produz?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Documentação' },

  // Experiência (6)
  { area: 'design', texto: 'Conte sobre o projeto de UX mais complexo que você trabalhou. Quais desafios você enfrentou e como os superou?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos Complexos' },
  { area: 'design', texto: 'Descreva uma situação onde você identificou um problema de usabilidade significativo através de pesquisa. Como você conduziu a melhoria?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Pesquisa' },
  { area: 'design', texto: 'Conte sobre uma vez que você precisou defender uma decisão de design com dados. Como você estruturou seus argumentos?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Advocacy' },
  { area: 'design', texto: 'Descreva sua experiência trabalhando com desenvolvedores. Como você garante que a implementação reflete o design proposto?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Colaboração' },
  { area: 'design', texto: 'Você já participou de um redesign completo de produto? Como foi o processo de discovery e transição?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redesign' },
  { area: 'design', texto: 'Conte sobre sua experiência facilitando workshops de design (Design Sprint, Crazy 8s, etc.). Como você planeja e conduz essas sessões?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Facilitação' },

  // Comportamental (6)
  { area: 'design', texto: 'Como você equilibra as necessidades dos usuários com as limitações técnicas e de negócio?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trade-offs' },
  { area: 'design', texto: 'Quando um stakeholder discorda fortemente da sua solução de design, como você aborda essa conversa?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Negociação' },
  { area: 'design', texto: 'Como você se mantém produtivo quando precisa trabalhar em múltiplos projetos simultaneamente?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'design', texto: 'Descreva como você colabora com designers UI para garantir consistência entre experiência e interface.', cargo: 'Designer UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'design', texto: 'Como você reage quando descobre que sua hipótese de design estava errada após testes com usuários?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'design', texto: 'Como você lida com prazos apertados que podem comprometer a qualidade da pesquisa ou do design?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },

  // Situacional (6)
  { area: 'design', texto: 'Você está no meio de um projeto e descobre que não há orçamento para pesquisa com usuários. Como você prosseguiria?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Resourcefulness' },
  { area: 'design', texto: 'Os testes de usabilidade mostram que os usuários têm dificuldade com um fluxo, mas o time já investiu muito tempo desenvolvendo. O que você faz?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Tomada de Decisão' },
  { area: 'design', texto: 'O Product Manager quer lançar uma feature sem validação com usuários devido ao prazo. Como você negociaria uma solução?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Advocacy' },
  { area: 'design', texto: 'Você precisa criar um fluxo para um público que você não conhece bem. Como você abordaria essa descoberta?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Pesquisa' },
  { area: 'design', texto: 'Um colega designer criou uma solução que você considera problemática para o usuário. Como você daria esse feedback?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback' },
  { area: 'design', texto: 'O time de desenvolvimento diz que a feature precisa ser simplificada por limitações técnicas. Como você priorizaria o que manter?', cargo: 'Designer UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Priorização' },
];

export const designerUxSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'design', texto: 'Como você estrutura uma estratégia de UX Research para um produto em diferentes estágios de maturidade (discovery, growth, escala)?', cargo: 'Designer UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de Pesquisa' },
  { area: 'design', texto: 'Discuta como você implementaria um programa contínuo de pesquisa de usuários em uma organização. Como você priorizaria estudos e democratizaria insights?', cargo: 'Designer UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Research Ops' },
  { area: 'design', texto: 'Explique como você mede ROI de iniciativas de UX. Quais frameworks você usa para conectar melhorias de experiência com resultados de negócio?', cargo: 'Designer UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Métricas e ROI' },
  { area: 'design', texto: 'Como você projetaria a experiência de um produto que precisa atender usuários com necessidades muito diferentes (B2B e B2C, por exemplo)?', cargo: 'Designer UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Estratégico' },
  { area: 'design', texto: 'Discuta estratégias de acessibilidade em UX. Como você garantiria que todo o time considere a11y desde o início do processo de design?', cargo: 'Designer UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Acessibilidade' },
  { area: 'design', texto: 'Como você estrutura um sistema de design do ponto de vista de UX, garantindo consistência de experiência através de múltiplos produtos?', cargo: 'Designer UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Systems' },
  { area: 'design', texto: 'Explique como você usaria IA/ML para melhorar a experiência do usuário. Quais são os trade-offs éticos e de UX que devem ser considerados?', cargo: 'Designer UX', nivel: 'senior', categoria: 'tecnica', competencia: 'UX e Tecnologia' },

  // Experiência (7)
  { area: 'design', texto: 'Conte sobre uma decisão de UX estratégica que você liderou. Quais eram as alternativas, como você avaliou e qual foi o impacto no negócio?', cargo: 'Designer UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Estratégica' },
  { area: 'design', texto: 'Descreva uma situação onde você precisou mentorar designers menos experientes. Como você estruturou o processo e mediu o progresso?', cargo: 'Designer UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { area: 'design', texto: 'Conte sobre um projeto que falhou ou teve problemas sérios de UX. O que você aprendeu e como isso mudou sua abordagem?', cargo: 'Designer UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'design', texto: 'Você já liderou a transformação da cultura de UX em uma organização? Como planejou e executou essa mudança?', cargo: 'Designer UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação' },
  { area: 'design', texto: 'Descreva sua experiência definindo processos e padrões de UX para times distribuídos. Como você garantiu adoção?', cargo: 'Designer UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Padronização' },
  { area: 'design', texto: 'Conte sobre uma situação onde você precisou convencer a liderança a investir em UX. Como você construiu o business case?', cargo: 'Designer UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Advocacy Executivo' },
  { area: 'design', texto: 'Descreva um projeto onde você precisou integrar múltiplas disciplinas (UX, UI, pesquisa, content) para entregar uma experiência coesa.', cargo: 'Designer UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Multidisciplinar' },

  // Comportamental (7)
  { area: 'design', texto: 'Como você equilibra visão de longo prazo com entregas incrementais quando está liderando a estratégia de UX?', cargo: 'Designer UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Estratégica' },
  { area: 'design', texto: 'Descreva como você comunica estratégia de UX para stakeholders executivos. Como você adapta sua linguagem?', cargo: 'Designer UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'design', texto: 'Como você lida com conflitos entre design, produto e engenharia? Conte uma situação onde você mediou uma discussão.', cargo: 'Designer UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Mediação' },
  { area: 'design', texto: 'Qual sua filosofia sobre documentação de decisões de UX? Como você garante que o conhecimento não fique apenas na cabeça de uma pessoa?', cargo: 'Designer UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Documentação' },
  { area: 'design', texto: 'Como você decide quando parar de iterar em uma solução e entregar algo que resolve o problema de forma satisfatória?', cargo: 'Designer UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { area: 'design', texto: 'Como você constrói credibilidade de UX com times de produto e negócio? Que práticas você usa?', cargo: 'Designer UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento' },
  { area: 'design', texto: 'Como você mantém sua relevância em UX enquanto assume mais responsabilidades de liderança?', cargo: 'Designer UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento Contínuo' },

  // Situacional (7)
  { area: 'design', texto: 'A empresa quer lançar um produto novo em 4 meses. Como você estruturaria o processo de UX considerando esse timeline agressivo?', cargo: 'Designer UX', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia' },
  { area: 'design', texto: 'Dois designers do time discordam fortemente sobre a abordagem para um fluxo crítico. Ambos têm argumentos válidos. Como você conduziria?', cargo: 'Designer UX', nivel: 'senior', categoria: 'situacional', competencia: 'Liderança' },
  { area: 'design', texto: 'O CEO quer implementar uma feature inspirada em um concorrente que você acredita não ser adequada para seus usuários. Como você apresentaria seu ponto?', cargo: 'Designer UX', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { area: 'design', texto: 'Vocês identificaram que precisam redesenhar uma jornada crítica do produto, mas o negócio não pode parar. Como você planejaria essa migração?', cargo: 'Designer UX', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento' },
  { area: 'design', texto: 'O time está desmotivado após uma sequência de projetos onde as soluções de UX foram comprometidas. Como você atuaria?', cargo: 'Designer UX', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Time' },
  { area: 'design', texto: 'A empresa está crescendo e você precisa escalar o time de UX de 2 para 8 pessoas. Como você estruturaria esse crescimento?', cargo: 'Designer UX', nivel: 'senior', categoria: 'situacional', competencia: 'Scaling de Time' },
  { area: 'design', texto: 'Um designer sênior do seu time está tendo problemas de desempenho e a qualidade do trabalho caiu. Como você abordaria?', cargo: 'Designer UX', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Performance' },
];

// ============================================
// DESIGNER UI
// ============================================

export const designerUiJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Explique a diferença entre UI e UX Design. Como o trabalho de um designer UI complementa o trabalho de UX?', cargo: 'Designer UI', nivel: 'junior', categoria: 'tecnica', competencia: 'Fundamentos de UI' },
  { area: 'design', texto: 'Quais são os princípios básicos de design visual que você aplica no seu trabalho? Dê exemplos de como usar hierarquia, contraste e espaçamento.', cargo: 'Designer UI', nivel: 'junior', categoria: 'tecnica', competencia: 'Design Visual' },
  { area: 'design', texto: 'O que é um Design System e quais são seus componentes principais? Por que empresas investem em criar um?', cargo: 'Designer UI', nivel: 'junior', categoria: 'tecnica', competencia: 'Design System' },
  { area: 'design', texto: 'Explique como você escolhe cores para uma interface. O que você considera sobre acessibilidade e contraste?', cargo: 'Designer UI', nivel: 'junior', categoria: 'tecnica', competencia: 'Teoria de Cores' },
  { area: 'design', texto: 'Como você decide qual tipografia usar em um projeto? Quais fatores você considera para legibilidade e hierarquia?', cargo: 'Designer UI', nivel: 'junior', categoria: 'tecnica', competencia: 'Tipografia' },
  { area: 'design', texto: 'O que são grids e como você os utiliza no design de interfaces? Explique a diferença entre grid de 8pt e 4pt.', cargo: 'Designer UI', nivel: 'junior', categoria: 'tecnica', competencia: 'Layout e Grid' },

  // Experiência (5)
  { area: 'design', texto: 'Conte sobre um projeto de UI que você desenvolveu do início ao fim. Qual foi seu processo e como você tomou decisões visuais?', cargo: 'Designer UI', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'design', texto: 'Descreva sua experiência usando Figma, Sketch ou Adobe XD. Quais funcionalidades você mais utiliza no dia a dia?', cargo: 'Designer UI', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { area: 'design', texto: 'Você já criou ou contribuiu para um Design System? Conte como foi a experiência.', cargo: 'Designer UI', nivel: 'junior', categoria: 'experiencia', competencia: 'Design System' },
  { area: 'design', texto: 'Conte sobre uma vez que você recebeu feedback sobre seu design visual. O que você aprendeu e como isso melhorou seu trabalho?', cargo: 'Designer UI', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback' },
  { area: 'design', texto: 'Descreva um projeto onde você precisou seguir guidelines de marca existentes. Como você equilibrou criatividade com consistência?', cargo: 'Designer UI', nivel: 'junior', categoria: 'experiencia', competencia: 'Branding' },

  // Comportamental (5)
  { area: 'design', texto: 'Como você busca inspiração e referências para seus projetos de UI? Quais são suas fontes favoritas?', cargo: 'Designer UI', nivel: 'junior', categoria: 'comportamental', competencia: 'Criatividade' },
  { area: 'design', texto: 'Quando você apresenta seu trabalho e alguém critica suas escolhas visuais, como você costuma reagir?', cargo: 'Designer UI', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade' },
  { area: 'design', texto: 'O que te motivou a seguir carreira em UI Design? O que você mais gosta nessa área?', cargo: 'Designer UI', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'design', texto: 'Como você lida quando um cliente ou stakeholder pede mudanças que você acredita prejudicar o design?', cargo: 'Designer UI', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'design', texto: 'Descreva como você organiza seus arquivos de design. Como você nomeia camadas e organiza componentes?', cargo: 'Designer UI', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (5)
  { area: 'design', texto: 'Você precisa criar uma interface mas não recebeu wireframes. Como você procederia?', cargo: 'Designer UI', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'design', texto: 'O desenvolvedor diz que o design que você criou é muito difícil de implementar. Como você abordaria essa situação?', cargo: 'Designer UI', nivel: 'junior', categoria: 'situacional', competencia: 'Colaboração' },
  { area: 'design', texto: 'Você percebeu que o design que você entregou tem inconsistências de cores e tipografia. O que você faz?', cargo: 'Designer UI', nivel: 'junior', categoria: 'situacional', competencia: 'Responsabilidade' },
  { area: 'design', texto: 'O cliente pediu um design "moderno e diferente" sem dar mais detalhes. Como você exploraria essa demanda?', cargo: 'Designer UI', nivel: 'junior', categoria: 'situacional', competencia: 'Discovery' },
  { area: 'design', texto: 'Você tem um prazo apertado e precisa criar 10 telas. Como você priorizaria e organizaria seu trabalho?', cargo: 'Designer UI', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Tempo' },
];

export const designerUiPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Como você estrutura um Design System escalável? Quais são os fundamentos (tokens, componentes, padrões) e como você documenta cada um?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design System' },
  { area: 'design', texto: 'Explique como você cria microinterações e animações que melhoram a experiência do usuário. Quais princípios você segue?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Motion Design' },
  { area: 'design', texto: 'Como você garante acessibilidade em suas interfaces? Discuta contraste de cores, foco de teclado e outras considerações WCAG.', cargo: 'Designer UI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Acessibilidade' },
  { area: 'design', texto: 'Descreva como você cria designs responsivos que funcionam bem em diferentes tamanhos de tela. Qual sua abordagem para breakpoints?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design Responsivo' },
  { area: 'design', texto: 'Como você trabalha com handoff para desenvolvedores? Quais ferramentas e práticas você usa para garantir implementação fiel?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Handoff' },
  { area: 'design', texto: 'Explique a diferença entre componentes e patterns em um Design System. Como você decide quando criar cada um?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design System' },

  // Experiência (6)
  { area: 'design', texto: 'Conte sobre o projeto de UI mais complexo que você trabalhou. Quais desafios visuais você enfrentou e como os resolveu?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos Complexos' },
  { area: 'design', texto: 'Descreva sua experiência criando ou evoluindo um Design System. Como você equilibrou consistência com flexibilidade?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Design System' },
  { area: 'design', texto: 'Conte sobre uma vez que você precisou refazer completamente a identidade visual de um produto. Como foi o processo?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redesign' },
  { area: 'design', texto: 'Descreva sua experiência colaborando com times de desenvolvimento. Como você garante que o código reflete o design?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Colaboração' },
  { area: 'design', texto: 'Você já trabalhou em um produto com múltiplas marcas ou temas? Como você estruturou os tokens de design?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Multi-brand' },
  { area: 'design', texto: 'Conte sobre uma situação onde você precisou equilibrar estética com performance/usabilidade. Quais trade-offs você fez?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trade-offs' },

  // Comportamental (6)
  { area: 'design', texto: 'Como você equilibra tendências de design com as necessidades específicas do produto e dos usuários?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Critério' },
  { area: 'design', texto: 'Quando um designer UX entrega wireframes que você considera problemáticos visualmente, como você aborda essa conversa?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'design', texto: 'Como você se mantém atualizado com as tendências de design visual e novas ferramentas?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado' },
  { area: 'design', texto: 'Descreva como você dá e recebe feedback sobre trabalho visual. O que você considera ao criticar o trabalho de outros?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Feedback' },
  { area: 'design', texto: 'Como você reage quando o desenvolvedor implementa seu design de forma diferente do especificado?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'design', texto: 'Como você lida com múltiplas revisões e mudanças de direção em um projeto?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },

  // Situacional (6)
  { area: 'design', texto: 'O Design System existente não atende uma necessidade específica do novo produto. Como você procederia?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'situacional', competencia: 'Evolução de Design System' },
  { area: 'design', texto: 'O stakeholder quer um design "mais impactante" mas você acredita que isso prejudicaria a usabilidade. O que você faz?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
  { area: 'design', texto: 'Você precisa criar uma interface para um segmento de usuários que você não conhece bem. Como você abordaria?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'situacional', competencia: 'Pesquisa Visual' },
  { area: 'design', texto: 'O time de desenvolvimento reporta que as animações que você projetou estão causando problemas de performance. O que você faz?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'situacional', competencia: 'Otimização' },
  { area: 'design', texto: 'Você recebeu feedback de acessibilidade indicando que suas cores não têm contraste suficiente, mas o cliente ama a paleta. Como resolve?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'situacional', competencia: 'Acessibilidade' },
  { area: 'design', texto: 'Um colega designer criou componentes que não seguem os padrões do Design System. Como você daria esse feedback?', cargo: 'Designer UI', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback' },
];

export const designerUiSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'design', texto: 'Como você estrutura a governança de um Design System em uma organização grande? Quem decide o que entra, como são as contribuições?', cargo: 'Designer UI', nivel: 'senior', categoria: 'tecnica', competencia: 'Design System Governance' },
  { area: 'design', texto: 'Discuta estratégias de theming e multi-brand em Design Systems. Como você estrutura tokens para suportar múltiplas identidades visuais?', cargo: 'Designer UI', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Tokens' },
  { area: 'design', texto: 'Como você mede a efetividade e adoção de um Design System? Quais métricas você acompanha?', cargo: 'Designer UI', nivel: 'senior', categoria: 'tecnica', competencia: 'Métricas de Design System' },
  { area: 'design', texto: 'Explique como você projetaria uma linguagem visual que escala através de múltiplos produtos e plataformas (web, mobile, TV).', cargo: 'Designer UI', nivel: 'senior', categoria: 'tecnica', competencia: 'Cross-platform' },
  { area: 'design', texto: 'Discuta o papel de motion design em produtos digitais. Como você define princípios de animação para um sistema de design?', cargo: 'Designer UI', nivel: 'senior', categoria: 'tecnica', competencia: 'Motion Principles' },
  { area: 'design', texto: 'Como você integra ferramentas de design com o workflow de desenvolvimento? Discuta design tokens, Storybook e automação.', cargo: 'Designer UI', nivel: 'senior', categoria: 'tecnica', competencia: 'Design-Dev Integration' },
  { area: 'design', texto: 'Explique como você usaria IA generativa no workflow de design UI. Quais são os benefícios e riscos dessa integração?', cargo: 'Designer UI', nivel: 'senior', categoria: 'tecnica', competencia: 'AI em Design' },

  // Experiência (7)
  { area: 'design', texto: 'Conte sobre uma decisão de linguagem visual estratégica que você liderou. Como você alinhou stakeholders e mediu impacto?', cargo: 'Designer UI', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Visual' },
  { area: 'design', texto: 'Descreva uma situação onde você precisou mentorar designers UI menos experientes. Como você desenvolveu suas habilidades visuais?', cargo: 'Designer UI', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { area: 'design', texto: 'Conte sobre um Design System que você liderou do conceito à implementação. Quais foram os maiores desafios organizacionais?', cargo: 'Designer UI', nivel: 'senior', categoria: 'experiencia', competencia: 'Design System Leadership' },
  { area: 'design', texto: 'Você já liderou um rebranding de produto digital? Como você planejou a transição visual sem prejudicar a experiência?', cargo: 'Designer UI', nivel: 'senior', categoria: 'experiencia', competencia: 'Rebranding' },
  { area: 'design', texto: 'Descreva sua experiência definindo padrões visuais e processos de design para times distribuídos.', cargo: 'Designer UI', nivel: 'senior', categoria: 'experiencia', competencia: 'Padronização' },
  { area: 'design', texto: 'Conte sobre uma situação onde você precisou convencer a liderança a investir em melhorias de Design System.', cargo: 'Designer UI', nivel: 'senior', categoria: 'experiencia', competencia: 'Advocacy' },
  { area: 'design', texto: 'Descreva um projeto onde você integrou equipes de brand, produto e engenharia para entregar uma experiência visual coesa.', cargo: 'Designer UI', nivel: 'senior', categoria: 'experiencia', competencia: 'Integração Multidisciplinar' },

  // Comportamental (7)
  { area: 'design', texto: 'Como você equilibra inovação visual com consistência de marca quando está liderando a direção de arte?', cargo: 'Designer UI', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança Visual' },
  { area: 'design', texto: 'Descreva como você comunica decisões de design visual para stakeholders executivos. Como você justifica escolhas estéticas?', cargo: 'Designer UI', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'design', texto: 'Como você lida com conflitos entre times de produto, brand e UI sobre direção visual?', cargo: 'Designer UI', nivel: 'senior', categoria: 'comportamental', competencia: 'Mediação' },
  { area: 'design', texto: 'Qual sua filosofia sobre documentação de Design Systems? Como você garante que o conhecimento seja acessível a todos?', cargo: 'Designer UI', nivel: 'senior', categoria: 'comportamental', competencia: 'Documentação' },
  { area: 'design', texto: 'Como você decide quando parar de refinar visualmente e entregar algo que está "bom o suficiente"?', cargo: 'Designer UI', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { area: 'design', texto: 'Como você constrói cultura de excelência visual em uma organização que historicamente não priorizou design?', cargo: 'Designer UI', nivel: 'senior', categoria: 'comportamental', competencia: 'Transformação Cultural' },
  { area: 'design', texto: 'Como você mantém suas habilidades técnicas de design atualizadas enquanto assume mais responsabilidades de liderança?', cargo: 'Designer UI', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento Contínuo' },

  // Situacional (7)
  { area: 'design', texto: 'A empresa está fazendo um rebranding completo. Como você lideraria a atualização do Design System e todos os produtos?', cargo: 'Designer UI', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia' },
  { area: 'design', texto: 'Dois designers do time discordam sobre a direção visual de um projeto importante. Como você conduziria essa situação?', cargo: 'Designer UI', nivel: 'senior', categoria: 'situacional', competencia: 'Liderança' },
  { area: 'design', texto: 'O CMO quer uma direção visual que você acredita não ser adequada para os usuários do produto. Como você apresentaria seu ponto?', cargo: 'Designer UI', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { area: 'design', texto: 'O Design System está desatualizado e fragmentado após anos de evolução. Como você planejaria uma refatoração?', cargo: 'Designer UI', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento' },
  { area: 'design', texto: 'O time está desmotivado porque os designs estão sempre sendo comprometidos por limitações técnicas. Como você atuaria?', cargo: 'Designer UI', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Time' },
  { area: 'design', texto: 'A empresa está crescendo e você precisa escalar o time de UI de 2 para 6 pessoas. Como você estruturaria isso?', cargo: 'Designer UI', nivel: 'senior', categoria: 'situacional', competencia: 'Scaling de Time' },
  { area: 'design', texto: 'Um designer do time está produzindo trabalho inconsistente com os padrões visuais. Como você abordaria essa situação?', cargo: 'Designer UI', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Performance' },
];

// ============================================
// DESIGNER UI/UX
// ============================================

export const designerUiUxJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Como designer UI/UX, explique como você equilibra pesquisa de usuário com design visual no seu processo. Qual vem primeiro?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Processo de Design' },
  { area: 'design', texto: 'Descreva um processo completo de design, do problema identificado até a interface final. Quais artefatos você produz em cada etapa?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Metodologia' },
  { area: 'design', texto: 'Como você transforma wireframes em interfaces visuais? Qual seu processo de tomada de decisão para cores, tipografia e espaçamento?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Design Visual' },
  { area: 'design', texto: 'O que é prototipagem e por que é importante? Explique a diferença entre protótipos de baixa e alta fidelidade e quando usar cada um.', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Prototipagem' },
  { area: 'design', texto: 'Quais heurísticas de usabilidade você conhece e como você as aplica tanto na experiência quanto na interface?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Usabilidade' },
  { area: 'design', texto: 'Como você garante consistência entre a experiência do usuário e a interface visual em um projeto?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'tecnica', competencia: 'Consistência' },

  // Experiência (5)
  { area: 'design', texto: 'Conte sobre um projeto onde você foi responsável tanto pela pesquisa quanto pelo design visual. Como foi gerenciar ambas as frentes?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'design', texto: 'Descreva um projeto onde você criou personas, fluxos e depois desenvolveu a interface. Qual foi seu maior aprendizado?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'experiencia', competencia: 'End-to-End' },
  { area: 'design', texto: 'Você já validou um design que você mesmo criou com usuários reais? Conte como foi essa experiência.', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Validação' },
  { area: 'design', texto: 'Conte sobre uma vez que você precisou iterar rapidamente entre wireframe e protótipo visual. Como você organizou seu tempo?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Iteração' },
  { area: 'design', texto: 'Descreva sua experiência com ferramentas de design e prototipagem. Qual sua stack de ferramentas preferida?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },

  // Comportamental (5)
  { area: 'design', texto: 'O que te atraiu para trabalhar como UI/UX generalista ao invés de especialista em uma das áreas?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'design', texto: 'Como você se organiza para desenvolver habilidades tanto em UX quanto em UI simultaneamente?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado' },
  { area: 'design', texto: 'Quando você está sobrecarregado com tarefas de pesquisa e design visual, como você prioriza?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'design', texto: 'Como você lida com a pressão de ser responsável pelo projeto de ponta a ponta?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Responsabilidade' },
  { area: 'design', texto: 'Você se considera mais forte em UX ou UI? Como você trabalha para equilibrar essas habilidades?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'comportamental', competencia: 'Autoconhecimento' },

  // Situacional (5)
  { area: 'design', texto: 'Você precisa entregar um design completo em uma semana. Como você dividiria seu tempo entre pesquisa e design visual?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Tempo' },
  { area: 'design', texto: 'O stakeholder quer ver telas finalizadas mas você ainda não terminou a pesquisa de usuário. O que você faz?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'design', texto: 'Você descobriu durante testes que o fluxo precisa mudar, mas já criou várias telas visuais. Como você procede?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'situacional', competencia: 'Adaptabilidade' },
  { area: 'design', texto: 'O desenvolvedor pede especificações detalhadas mas você ainda está iterando no design. Como você gerencia isso?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'situacional', competencia: 'Colaboração' },
  { area: 'design', texto: 'Você está em um projeto solo e precisa decidir se faz mais pesquisa ou melhora o visual. Como você toma essa decisão?', cargo: 'Designer UI/UX', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
];

export const designerUiUxPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Como você estrutura um processo de design que integra efetivamente pesquisa de usuário, arquitetura de informação e design visual?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Processo Integrado' },
  { area: 'design', texto: 'Descreva como você usa dados de pesquisa para informar decisões visuais. Dê um exemplo concreto dessa conexão.', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design Orientado a Dados' },
  { area: 'design', texto: 'Como você documenta e comunica tanto decisões de experiência quanto especificações visuais para desenvolvedores?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Documentação' },
  { area: 'design', texto: 'Explique como você aborda a criação de um Design System que considera tanto padrões de experiência quanto de interface.', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design System' },
  { area: 'design', texto: 'Como você mede o sucesso de suas soluções de design? Quais métricas você usa para experiência e para interface?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas' },
  { area: 'design', texto: 'Descreva como você valida hipóteses de design usando protótipos. Como você decide o nível de fidelidade necessário?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'tecnica', competencia: 'Validação' },

  // Experiência (6)
  { area: 'design', texto: 'Conte sobre o projeto mais complexo onde você foi responsável pelo design end-to-end. Quais foram os maiores desafios?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos Complexos' },
  { area: 'design', texto: 'Descreva uma situação onde insights de pesquisa mudaram completamente sua direção visual. Como você pivotou?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Adaptação' },
  { area: 'design', texto: 'Você já liderou a criação de um Design System que incluiu guidelines de experiência e componentes visuais?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Design System' },
  { area: 'design', texto: 'Conte sobre uma vez que você conduziu pesquisa de usuário e usou os insights diretamente para criar a interface.', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Research to UI' },
  { area: 'design', texto: 'Descreva sua experiência trabalhando em projetos onde você era o único designer. Como você gerenciou todas as responsabilidades?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Autonomia' },
  { area: 'design', texto: 'Conte sobre um redesign onde você precisou manter a experiência existente enquanto atualizava a interface visual.', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redesign' },

  // Comportamental (6)
  { area: 'design', texto: 'Como você equilibra profundidade em UX e UI quando o projeto exige excelência em ambas as frentes?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio' },
  { area: 'design', texto: 'Quando você sente que está negligenciando UX por conta de demandas visuais (ou vice-versa), como você corrige o curso?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Autogestão' },
  { area: 'design', texto: 'Como você colabora com especialistas de UX ou UI quando disponíveis? Como você define responsabilidades?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'design', texto: 'Como você lida com feedback conflitante sobre experiência e estética de diferentes stakeholders?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Negociação' },
  { area: 'design', texto: 'Descreva como você dá feedback para outros designers que têm especialidades diferentes da sua.', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Feedback' },
  { area: 'design', texto: 'Como você decide quando aprofundar em pesquisa versus quando refinar visualmente?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'comportamental', competencia: 'Priorização' },

  // Situacional (6)
  { area: 'design', texto: 'O time precisa de entregas de UX (fluxos, wireframes) e UI (telas finais) simultaneamente. Como você organiza?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Tempo' },
  { area: 'design', texto: 'Você identificou um problema de usabilidade sério, mas corrigir vai exigir refazer muito trabalho visual. O que você faz?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Trade-offs' },
  { area: 'design', texto: 'O Product Manager quer pesquisa robusta, mas o prazo só permite wireframes rápidos. Como você negocia?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
  { area: 'design', texto: 'Você precisa entregar um MVP. Como você decide quais partes do processo de design (UX e UI) priorizar?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'situacional', competencia: 'MVP' },
  { area: 'design', texto: 'O time de desenvolvimento implementou a interface diferente do especificado e a experiência foi comprometida. O que você faz?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Qualidade' },
  { area: 'design', texto: 'Um stakeholder quer que você pule a pesquisa e vá direto para telas finais. Como você lida com essa pressão?', cargo: 'Designer UI/UX', nivel: 'pleno', categoria: 'situacional', competencia: 'Advocacy' },
];

export const designerUiUxSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'design', texto: 'Como você estrutura uma operação de design que integra pesquisa de usuário, design de experiência e design visual de forma eficiente?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Operations' },
  { area: 'design', texto: 'Discuta como você criaria um framework de design que escala através de múltiplos produtos mantendo consistência de UX e UI.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Escalável' },
  { area: 'design', texto: 'Como você mede e demonstra o ROI de investimentos em design para a organização? Quais métricas você acompanha?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'tecnica', competencia: 'ROI de Design' },
  { area: 'design', texto: 'Explique como você integraria práticas de UX research, design thinking e visual design em um processo ágil.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Ágil' },
  { area: 'design', texto: 'Como você estrutura um Design System que seja tanto um sistema de experiência quanto um sistema visual?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Design System Holístico' },
  { area: 'design', texto: 'Discuta estratégias de design para produtos multiplataforma garantindo experiência e visual consistentes.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Cross-platform' },
  { area: 'design', texto: 'Como você usa dados e analytics para informar tanto decisões de experiência quanto de interface?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Analytics' },

  // Experiência (7)
  { area: 'design', texto: 'Conte sobre uma decisão estratégica de design que você liderou e seu impacto no negócio.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Estratégica' },
  { area: 'design', texto: 'Descreva uma situação onde você mentorou designers para desenvolver habilidades tanto de UX quanto de UI.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { area: 'design', texto: 'Conte sobre um projeto que falhou e o que você aprendeu sobre integrar UX e UI de forma efetiva.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado' },
  { area: 'design', texto: 'Você já liderou a construção de um time de design do zero? Como você equilibrou contratações de UX e UI?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Construção de Time' },
  { area: 'design', texto: 'Descreva sua experiência definindo a estratégia de design de produto de uma empresa.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Estratégia de Produto' },
  { area: 'design', texto: 'Conte sobre como você convenceu a liderança a investir em maturidade de design (pesquisa, sistemas, processos).', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Advocacy Executivo' },
  { area: 'design', texto: 'Descreva um projeto onde você integrou design, produto e engenharia para entregar uma experiência excepcional.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'experiencia', competencia: 'Colaboração Cross-functional' },

  // Comportamental (7)
  { area: 'design', texto: 'Como você equilibra visão de longo prazo do design com entregas incrementais de produto?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Estratégica' },
  { area: 'design', texto: 'Descreva como você comunica a importância do design (UX e UI) para stakeholders executivos.', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'design', texto: 'Como você lida com tensões entre times de UX e UI quando eles existem separadamente?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Mediação' },
  { area: 'design', texto: 'Qual sua filosofia sobre especialização vs generalização em design? Como você estrutura times?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Estrutura de Time' },
  { area: 'design', texto: 'Como você decide quando contratar especialistas vs generalistas para seu time de design?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Talentos' },
  { area: 'design', texto: 'Como você constrói uma cultura de design em uma organização que historicamente não valorizou design?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Transformação Cultural' },
  { area: 'design', texto: 'Como você mantém sua proficiência técnica em UX e UI enquanto assume responsabilidades de liderança?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento Contínuo' },

  // Situacional (7)
  { area: 'design', texto: 'A empresa quer lançar um novo produto. Como você estruturaria o processo de design considerando UX e UI?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia de Produto' },
  { area: 'design', texto: 'Designers de UX e UI do time têm visões conflitantes sobre uma feature crítica. Como você conduziria?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'situacional', competencia: 'Liderança' },
  { area: 'design', texto: 'O CEO quer um produto que "pareça como X concorrente" mas você sabe que a experiência deles é problemática. O que você faz?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { area: 'design', texto: 'O time de design está fragmentado entre UX e UI com pouca colaboração. Como você melhoraria essa integração?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'situacional', competencia: 'Integração de Time' },
  { area: 'design', texto: 'O time está desmotivado porque sente que não tem impacto real no produto. Como você mudaria essa percepção?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Time' },
  { area: 'design', texto: 'Você precisa escalar o time de design de 3 para 10 pessoas. Como você estruturaria as especialidades?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'situacional', competencia: 'Scaling de Time' },
  { area: 'design', texto: 'Um designer sênior do time está resistindo a processos de pesquisa, querendo ir direto para visual. Como você abordaria?', cargo: 'Designer UI/UX', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Performance' },
];

// ============================================
// DESIGNER GRÁFICO
// ============================================

export const designerGraficoJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Explique a diferença entre design gráfico para mídia impressa e digital. Quais considerações são específicas para cada meio?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'tecnica', competencia: 'Fundamentos' },
  { area: 'design', texto: 'Quais são os princípios básicos de composição visual? Dê exemplos de como você aplica regra dos terços, equilíbrio e hierarquia.', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'tecnica', competencia: 'Composição' },
  { area: 'design', texto: 'Explique a diferença entre RGB e CMYK. Quando você usa cada modelo de cor e por quê?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'tecnica', competencia: 'Teoria de Cores' },
  { area: 'design', texto: 'O que é um manual de identidade visual e quais elementos ele deve conter? Por que é importante para uma marca?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'tecnica', competencia: 'Branding' },
  { area: 'design', texto: 'Como você escolhe tipografias para um projeto? Quais fatores você considera para legibilidade e personalidade?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'tecnica', competencia: 'Tipografia' },
  { area: 'design', texto: 'Qual a diferença entre formatos de imagem (JPG, PNG, SVG, PDF)? Quando você usa cada um?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'tecnica', competencia: 'Arquivos' },

  // Experiência (5)
  { area: 'design', texto: 'Conte sobre um projeto de design gráfico que você desenvolveu do briefing à entrega final. Qual foi seu processo?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos' },
  { area: 'design', texto: 'Descreva sua experiência com as ferramentas Adobe (Illustrator, Photoshop, InDesign). Quais funcionalidades você mais utiliza?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { area: 'design', texto: 'Você já criou ou contribuiu para uma identidade visual? Conte como foi a experiência.', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'experiencia', competencia: 'Branding' },
  { area: 'design', texto: 'Conte sobre um projeto que foi para impressão. Quais cuidados você tomou na preparação do arquivo?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'experiencia', competencia: 'Produção Gráfica' },
  { area: 'design', texto: 'Descreva uma situação onde você precisou revisar seu trabalho após feedback do cliente. O que você aprendeu?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback' },

  // Comportamental (5)
  { area: 'design', texto: 'Como você busca referências e inspiração para seus projetos? Quais são suas fontes favoritas?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'comportamental', competencia: 'Criatividade' },
  { area: 'design', texto: 'O que te motivou a seguir carreira em design gráfico? O que você mais gosta nessa área?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'design', texto: 'Como você lida quando um cliente pede alterações que você acredita prejudicar o design?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'design', texto: 'Descreva como você organiza seus arquivos de projeto e mantém controle de versões.', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'design', texto: 'Como você gerencia seu tempo quando tem múltiplos projetos com prazos próximos?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },

  // Situacional (5)
  { area: 'design', texto: 'O cliente pediu um design "mais moderno e jovem" sem dar mais detalhes. Como você exploraria essa demanda?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'situacional', competencia: 'Briefing' },
  { area: 'design', texto: 'Você entregou um arquivo para impressão e a gráfica reportou problemas de cor. Como você investigaria e resolveria?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'situacional', competencia: 'Produção' },
  { area: 'design', texto: 'O cliente quer usar uma imagem que você suspeita ter direitos autorais. Como você abordaria essa situação?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'situacional', competencia: 'Ética' },
  { area: 'design', texto: 'Você precisa criar um material urgente mas não recebeu as fotos ou textos finais. Como você procederia?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'design', texto: 'O cliente rejeitou todas as suas propostas de design. O que você faria?', cargo: 'Designer Gráfico', nivel: 'junior', categoria: 'situacional', competencia: 'Resiliência' },
];

export const designerGraficoPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'design', texto: 'Como você desenvolve uma identidade visual do zero? Descreva seu processo desde a pesquisa até a entrega do manual de marca.', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Branding' },
  { area: 'design', texto: 'Explique como você prepara arquivos para diferentes tipos de impressão (offset, digital, serigrafia). Quais cuidados são específicos para cada processo?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Produção Gráfica' },
  { area: 'design', texto: 'Como você cria um sistema visual que funciona em múltiplas aplicações (papelaria, digital, sinalização)? O que garante consistência?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistema Visual' },
  { area: 'design', texto: 'Descreva como você trabalha com grids em projetos editoriais. Quais tipos de grid você usa e como você os adapta?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Design Editorial' },
  { area: 'design', texto: 'Como você aplica princípios de acessibilidade em design gráfico (contraste, tamanho de fonte, daltonismo)?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Acessibilidade' },
  { area: 'design', texto: 'Explique como você cria designs que funcionam tanto em formato digital quanto impresso. Quais adaptações são necessárias?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Cross-media' },

  // Experiência (6)
  { area: 'design', texto: 'Conte sobre o projeto de branding mais complexo que você trabalhou. Quais desafios você enfrentou e como os superou?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Branding' },
  { area: 'design', texto: 'Descreva sua experiência com projetos de embalagem. Como você equilibra estética, funcionalidade e viabilidade de produção?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Packaging' },
  { area: 'design', texto: 'Conte sobre um projeto editorial (revista, livro, catálogo) que você desenvolveu. Qual foi seu processo de design?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Design Editorial' },
  { area: 'design', texto: 'Você já coordenou a produção de materiais com fornecedores (gráficas, estúdios fotográficos)? Como foi essa experiência?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Produção' },
  { area: 'design', texto: 'Descreva um projeto onde você precisou adaptar uma marca existente para novas aplicações. Como você manteve a essência?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Extensão de Marca' },
  { area: 'design', texto: 'Conte sobre uma situação onde você precisou defender suas decisões de design para um cliente cético.', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Advocacy' },

  // Comportamental (6)
  { area: 'design', texto: 'Como você equilibra criatividade com as demandas e restrições do cliente/projeto?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Criativo' },
  { area: 'design', texto: 'Quando você discorda fortemente da direção que o cliente quer seguir, como você aborda essa conversa?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'design', texto: 'Como você se mantém atualizado com tendências de design sem perder sua identidade criativa?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento' },
  { area: 'design', texto: 'Descreva como você dá e recebe feedback sobre trabalho visual. O que você considera ao criticar o trabalho de outros?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Feedback' },
  { area: 'design', texto: 'Como você lida com bloqueios criativos? Quais estratégias você usa para superar?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Criatividade' },
  { area: 'design', texto: 'Como você lida com múltiplas revisões e mudanças de escopo em projetos?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },

  // Situacional (6)
  { area: 'design', texto: 'O cliente quer um rebranding mas tem forte apego à marca atual. Como você conduziria esse processo de mudança?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Mudança' },
  { area: 'design', texto: 'Você precisa criar uma identidade visual para um segmento que você não conhece bem. Como você abordaria a pesquisa?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'situacional', competencia: 'Pesquisa' },
  { area: 'design', texto: 'A gráfica reportou que seu arquivo tem problemas e precisa ser refeito urgentemente para o prazo. O que você faz?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'situacional', competencia: 'Pressão' },
  { area: 'design', texto: 'O cliente quer copiar o estilo de um concorrente. Como você responderia a esse pedido?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética e Originalidade' },
  { area: 'design', texto: 'Você criou uma identidade visual que o time de marketing não consegue aplicar corretamente. O que você faria?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'situacional', competencia: 'Usabilidade da Marca' },
  { area: 'design', texto: 'O orçamento do projeto foi cortado pela metade depois que você já começou. Como você renegociaria o escopo?', cargo: 'Designer Gráfico', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação' },
];

export const designerGraficoSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'design', texto: 'Como você estrutura a estratégia visual de uma marca considerando todos os touchpoints (físico, digital, experiencial)?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de Marca' },
  { area: 'design', texto: 'Discuta como você desenvolveria um sistema de identidade visual flexível que funcione globalmente em diferentes culturas.', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'tecnica', competencia: 'Branding Global' },
  { area: 'design', texto: 'Como você mede o sucesso e o impacto de um projeto de branding? Quais métricas você considera?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'tecnica', competencia: 'Métricas de Marca' },
  { area: 'design', texto: 'Explique como você integraria design gráfico tradicional com experiências digitais e interativas.', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Integrado' },
  { area: 'design', texto: 'Como você aborda sustentabilidade no design gráfico (escolha de materiais, processos de impressão, design para longevidade)?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Sustentável' },
  { area: 'design', texto: 'Discuta como a inteligência artificial está impactando o design gráfico e como você a incorpora no seu processo.', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'tecnica', competencia: 'AI em Design' },
  { area: 'design', texto: 'Como você estrutura um brand book que seja útil tanto para times internos quanto para parceiros externos?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'tecnica', competencia: 'Documentação de Marca' },

  // Experiência (7)
  { area: 'design', texto: 'Conte sobre uma decisão de branding estratégica que você liderou. Qual foi o impacto no negócio do cliente?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Criativa' },
  { area: 'design', texto: 'Descreva uma situação onde você mentorou designers gráficos menos experientes. Como você desenvolveu suas habilidades?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria' },
  { area: 'design', texto: 'Conte sobre um projeto de rebranding de grande escala que você liderou. Como você gerenciou a transição?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'experiencia', competencia: 'Rebranding' },
  { area: 'design', texto: 'Você já construiu ou liderou uma equipe de design gráfico? Como você estruturou especializações e processos?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Time' },
  { area: 'design', texto: 'Descreva sua experiência trabalhando com marcas em múltiplos países ou culturas. Quais adaptações foram necessárias?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'experiencia', competencia: 'Branding Internacional' },
  { area: 'design', texto: 'Conte sobre uma situação onde você precisou convencer liderança executiva sobre uma direção criativa ousada.', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'experiencia', competencia: 'Advocacy Executivo' },
  { area: 'design', texto: 'Descreva um projeto que exigiu integração entre design gráfico, digital e experiencial. Como você garantiu coesão?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'experiencia', competencia: 'Design Integrado' },

  // Comportamental (7)
  { area: 'design', texto: 'Como você equilibra sua visão criativa com as necessidades comerciais e expectativas do cliente?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança Criativa' },
  { area: 'design', texto: 'Descreva como você comunica estratégia de marca para stakeholders executivos. Como você justifica investimentos em design?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'design', texto: 'Como você lida com conflitos entre criatividade e praticidade quando está liderando a direção criativa?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'comportamental', competencia: 'Mediação' },
  { area: 'design', texto: 'Qual sua filosofia sobre originalidade vs referência no design? Como você desenvolve uma voz criativa única?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'comportamental', competencia: 'Filosofia de Design' },
  { area: 'design', texto: 'Como você decide quando defender uma direção criativa vs quando ceder às preferências do cliente?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'comportamental', competencia: 'Advocacy' },
  { area: 'design', texto: 'Como você constrói cultura de excelência criativa em uma equipe de design?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura' },
  { area: 'design', texto: 'Como você mantém sua criatividade fresca enquanto assume mais responsabilidades de gestão?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'comportamental', competencia: 'Crescimento Contínuo' },

  // Situacional (7)
  { area: 'design', texto: 'Uma empresa quer fazer rebranding completo em 3 meses. Como você estruturaria o projeto e a equipe?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Projeto' },
  { area: 'design', texto: 'Dois designers do time têm visões criativas conflitantes para um projeto importante. Como você conduziria?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'situacional', competencia: 'Liderança' },
  { area: 'design', texto: 'O CEO quer uma direção visual que você acredita ser inadequada para o mercado alvo. Como você apresentaria sua perspectiva?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { area: 'design', texto: 'A marca que você criou não está sendo aplicada corretamente pelas equipes internas. Como você resolveria?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'situacional', competencia: 'Governança de Marca' },
  { area: 'design', texto: 'O time está desmotivado após ter trabalho criativo constantemente rejeitado. Como você atuaria?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Time' },
  { area: 'design', texto: 'A empresa está crescendo e você precisa escalar o time de design gráfico. Como você estruturaria?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'situacional', competencia: 'Scaling de Time' },
  { area: 'design', texto: 'Um designer sênior do time está produzindo trabalho que não atende aos padrões de qualidade. Como você abordaria?', cargo: 'Designer Gráfico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Performance' },
];

// ============================================
// CONSOLIDAÇÃO E ESTATÍSTICAS
// ============================================

export const perguntasDesign: PerguntaSeed[] = [
  // Designer UX
  ...designerUxJunior,
  ...designerUxPleno,
  ...designerUxSenior,
  // Designer UI
  ...designerUiJunior,
  ...designerUiPleno,
  ...designerUiSenior,
  // Designer UI/UX
  ...designerUiUxJunior,
  ...designerUiUxPleno,
  ...designerUiUxSenior,
  // Designer Gráfico
  ...designerGraficoJunior,
  ...designerGraficoPleno,
  ...designerGraficoSenior,
];

export const estatisticasDesign: Estatisticas = {
  total: perguntasDesign.length,
  porCargo: {
    'Designer UX': designerUxJunior.length + designerUxPleno.length + designerUxSenior.length,
    'Designer UI': designerUiJunior.length + designerUiPleno.length + designerUiSenior.length,
    'Designer UI/UX': designerUiUxJunior.length + designerUiUxPleno.length + designerUiUxSenior.length,
    'Designer Gráfico': designerGraficoJunior.length + designerGraficoPleno.length + designerGraficoSenior.length,
  },
};
