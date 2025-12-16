/**
 * Banco de Perguntas v4 - COMERCIAL / MARKETING
 *
 * Melhorias aplicadas:
 * - Perguntas aprofundadas (sem sim/não)
 * - Variações por nível (Junior, Pleno, Senior)
 * - Perguntas de case e cenário realistas
 * - Tom cordial de recrutador experiente
 * - Foco em competências práticas e soft skills
 */

import { PerguntaSeed } from './types';

// ============================================
// VENDEDOR / COMERCIAL
// ============================================

export const vendedorComercialJunior: PerguntaSeed[] = [
  // Técnica (4)
  { area: 'comercial', texto: 'O processo de vendas tem etapas bem definidas. Gostaria que você me explicasse como você estrutura seu funil de vendas, desde a prospecção até o fechamento - quais são as fases que você considera essenciais?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Processo de Vendas' },
  { area: 'comercial', texto: 'Conhecer o produto ou serviço é fundamental para vender bem. Me conte como você se prepara para dominar as características e benefícios do que está vendendo. Que técnicas de estudo você utiliza?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Conhecimento de Produto' },
  { area: 'comercial', texto: 'A prospecção é o início de tudo nas vendas. Quais métodos você utiliza para encontrar potenciais clientes? Me explique como você qualifica um lead para saber se vale a pena investir tempo nele.', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Prospecção' },
  { area: 'comercial', texto: 'Objeções fazem parte do dia a dia de vendas. Quais são as objeções mais comuns que você já enfrentou e como você estrutura suas respostas para contorná-las de forma natural?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Contorno de Objeções' },
  { area: 'comercial', texto: 'O fechamento é o momento decisivo da venda. Quais técnicas de fechamento você conhece e utiliza? Me dê exemplos de como você conduz esse momento crucial da negociação.', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Fechamento' },
  { area: 'comercial', texto: 'O follow-up é essencial para não perder oportunidades. Como você organiza seus follow-ups? Com que frequência você retoma contato e quais abordagens usa para manter o interesse do cliente?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Follow-up' },

  // Experiência (5)
  { area: 'comercial', texto: 'Toda venda tem uma história por trás. Conte-me sobre uma venda que te marcou positivamente - qual foi o produto ou serviço, como você abordou o cliente e o que fez a diferença para fechar?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'Fechamento de Vendas' },
  { area: 'comercial', texto: 'Atender bem é o primeiro passo para vender. Me fale sobre sua experiência com atendimento ao cliente - como você garante uma experiência positiva desde o primeiro contato?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },
  { area: 'comercial', texto: 'Metas fazem parte da rotina comercial. Conte-me sobre uma meta desafiadora que você teve que cumprir - como você se organizou e quais estratégias usou para alcançá-la?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'Cumprimento de Metas' },
  { area: 'comercial', texto: 'Ferramentas de CRM são aliadas importantes do vendedor. Me fale sobre sua experiência com sistemas de gestão de clientes - como você organiza suas informações e follow-ups?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'CRM' },
  { area: 'comercial', texto: 'Apresentações de vendas são momentos importantes para convencer o cliente. Conte-me sobre uma apresentação que você fez - como você se preparou e qual foi o resultado?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'Apresentação de Vendas' },

  // Comportamental (5)
  { area: 'comercial', texto: 'Vendas exigem muita resiliência - nem todos os dias são de vitórias. Como você lida com uma sequência de "nãos" sem deixar que isso afete sua motivação e energia?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'comercial', texto: 'O que te atraiu para a área comercial? Me conte sobre sua motivação para trabalhar com vendas e o que te mantém engajado nessa carreira.', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'comercial', texto: 'A rotina comercial exige disciplina e organização. Como você estrutura seu dia para garantir que está prospectando, fazendo follow-up e fechando negócios de forma equilibrada?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'comercial', texto: 'Vendedores precisam estar sempre aprendendo. Como você busca se desenvolver na área comercial? Que conteúdos, cursos ou referências você acompanha?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Desenvolvimento' },
  { area: 'comercial', texto: 'A ética em vendas é fundamental para construir relacionamentos duradouros. Como você equilibra a pressão por resultados com a necessidade de ser honesto e transparente com o cliente?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (5)
  { area: 'comercial', texto: 'Imagine que um cliente demonstra interesse no produto mas diz que o preço está fora do orçamento dele. Como você conduziria essa negociação sem simplesmente dar desconto?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Negociação de Preço' },
  { area: 'comercial', texto: 'Um cliente que você atendeu entra em contato reclamando do produto ou serviço. Como você abordaria essa situação para resolver o problema e manter o relacionamento?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Reclamações' },
  { area: 'comercial', texto: 'Você tem duas reuniões de vendas importantes no mesmo horário e não consegue remarcar nenhuma. Como você resolveria essa situação sem perder oportunidades?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { area: 'comercial', texto: 'O cliente está quase fechando mas pede para você ligar em uma semana. Você sabe que nesse tempo ele pode esfriar ou fechar com concorrente. O que você faz?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Senso de Urgência' },
  { area: 'comercial', texto: 'Você descobre que o concorrente está oferecendo um produto similar com algumas vantagens. O cliente te pergunta por que deveria comprar de você. Como você responde?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Diferenciação Competitiva' },
];

export const vendedorComercialPleno: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'comercial', texto: 'Vendas consultivas exigem abordagem diferenciada. Me explique como você conduz uma venda consultiva - como você identifica as reais necessidades do cliente e apresenta soluções personalizadas?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Venda Consultiva' },
  { area: 'comercial', texto: 'O ticket médio é uma métrica importante. Quais estratégias você utiliza para aumentar o valor médio das suas vendas? Me dê exemplos de upselling e cross-selling que funcionaram para você.', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Aumento de Ticket' },
  { area: 'comercial', texto: 'Gestão de pipeline é essencial para previsibilidade. Como você organiza e prioriza suas oportunidades em diferentes estágios? Que critérios usa para decidir onde focar sua energia?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Pipeline' },
  { area: 'comercial', texto: 'Vendas B2B têm dinâmica própria com múltiplos decisores. Como você identifica os stakeholders envolvidos na decisão e adapta sua abordagem para cada um deles?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Vendas B2B' },
  { area: 'comercial', texto: 'Análise de métricas orienta decisões comerciais. Quais indicadores você acompanha para avaliar seu desempenho? Como você usa esses dados para ajustar sua estratégia?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas de Vendas' },
  { area: 'comercial', texto: 'Propostas comerciais bem estruturadas fazem diferença. Como você elabora uma proposta que se destaca? Que elementos você considera essenciais para convencer o cliente?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Elaboração de Propostas' },

  // Experiência (6)
  { area: 'comercial', texto: 'Negociações complexas testam nossas habilidades. Conte-me sobre uma negociação difícil que você conduziu - quais eram os desafios e como você chegou a um acordo que satisfez ambas as partes?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação Complexa' },
  { area: 'comercial', texto: 'Recuperar clientes perdidos ou inativos é um desafio. Me fale sobre uma experiência em que você reconquistou um cliente importante. Qual foi sua abordagem?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reativação de Clientes' },
  { area: 'comercial', texto: 'Contas estratégicas exigem gestão diferenciada. Conte-me sobre como você gerenciou uma conta-chave - que ações realizou para expandir o relacionamento e os negócios?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Contas' },
  { area: 'comercial', texto: 'Prospecção outbound exige método e persistência. Me fale sobre sua experiência com cold calling ou prospecção ativa - como você estrutura sua abordagem e quais resultados já alcançou?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Prospecção Outbound' },
  { area: 'comercial', texto: 'Vendas em feiras e eventos presenciais têm dinâmica própria. Conte-me sobre sua experiência representando a empresa em eventos - como você aborda visitantes e converte contatos em oportunidades?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vendas em Eventos' },
  { area: 'comercial', texto: 'Ciclos de venda longos exigem paciência e estratégia. Me fale sobre uma venda que levou meses para fechar - como você manteve o relacionamento aquecido durante todo o processo?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vendas de Ciclo Longo' },

  // Comportamental (6)
  { area: 'comercial', texto: 'Pressão por metas é constante em vendas. Como você mantém alta performance de forma sustentável sem comprometer sua saúde mental e qualidade de vida?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { area: 'comercial', texto: 'Vendedores plenos frequentemente apoiam colegas mais novos. Como você compartilha conhecimento e ajuda no desenvolvimento de vendedores juniores?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'comercial', texto: 'O mercado muda constantemente e técnicas de vendas evoluem. Como você se mantém atualizado sobre tendências, novas metodologias e mudanças no comportamento do consumidor?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização' },
  { area: 'comercial', texto: 'Competir por clientes com colegas de equipe pode gerar conflitos. Como você equilibra ambição individual com o sucesso do time?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'comercial', texto: 'A comunicação com diferentes perfis de clientes exige adaptação. Como você ajusta sua abordagem ao perceber que o cliente tem um estilo de comunicação diferente do seu?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'comercial', texto: 'Construir relacionamentos de longo prazo vai além de fechar vendas. Como você cultiva relacionamentos com clientes mesmo quando não há oportunidade imediata de venda?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento de Longo Prazo' },

  // Situacional (6)
  { area: 'comercial', texto: 'Você está negociando um contrato grande e o cliente pede condições que estão fora da sua alçada de aprovação. Como você conduz essa situação internamente e com o cliente?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação de Condições' },
  { area: 'comercial', texto: 'Um cliente importante está insatisfeito com a entrega de outro departamento e ameaça cancelar. Como você intervém para salvar a conta?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'comercial', texto: 'Sua meta do mês está praticamente garantida na primeira quinzena. Como você utiliza esse tempo - relaxa ou acelera? Explique sua estratégia.', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Consistência' },
  { area: 'comercial', texto: 'O concorrente está oferecendo preço 30% menor. O cliente valoriza seu produto mas está tentado. Como você defende sua proposta de valor?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Defesa de Valor' },
  { area: 'comercial', texto: 'Você percebe que o produto atual não atende completamente a necessidade do cliente, mas poderia vender assim mesmo. Como você procede eticamente?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética em Vendas' },
  { area: 'comercial', texto: 'O cliente solicita uma customização que demandaria esforço significativo de outras áreas. Como você avalia se vale a pena e como negocia internamente?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação Interna' },
];

export const vendedorComercialSenior: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'comercial', texto: 'Estratégia comercial vai além de vender - envolve planejamento de mercado. Como você analisa mercados, identifica oportunidades e define estratégias de penetração em novos segmentos?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia Comercial' },
  { area: 'comercial', texto: 'Vendas enterprise têm ciclos longos e alta complexidade. Me explique como você conduz esse tipo de venda - desde o mapeamento político da conta até o fechamento de contratos multimilionários.', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Vendas Enterprise' },
  { area: 'comercial', texto: 'Forecast preciso é crucial para o planejamento da empresa. Como você desenvolve previsões de vendas confiáveis? Que metodologia usa para estimar probabilidades de fechamento?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Forecast' },
  { area: 'comercial', texto: 'Parcerias estratégicas ampliam o alcance comercial. Como você identifica, desenvolve e gerencia parcerias que geram negócios? Me dê exemplos de alianças bem-sucedidas que você construiu.', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Parcerias Estratégicas' },
  { area: 'comercial', texto: 'A transformação digital mudou o comportamento de compra. Como você adapta estratégias de vendas para o novo contexto onde o cliente pesquisa muito antes de falar com vendedor?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Vendas no Digital' },
  { area: 'comercial', texto: 'Pricing estratégico impacta diretamente a lucratividade. Como você participa das decisões de precificação e como avalia o equilíbrio entre volume e margem?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de Pricing' },
  { area: 'comercial', texto: 'Inteligência competitiva é fundamental para posicionamento. Como você estrutura o monitoramento de concorrentes e traduz essas informações em vantagens comerciais?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Inteligência Competitiva' },

  // Experiência (7)
  { area: 'comercial', texto: 'Conte-me sobre o maior negócio que você já fechou. Qual era o valor, como foi o ciclo de vendas e quais foram os momentos mais críticos da negociação?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Grandes Negócios' },
  { area: 'comercial', texto: 'Liderar times comerciais exige habilidades específicas. Me fale sobre sua experiência liderando vendedores - como você contrata, desenvolve e retém talentos de alta performance?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Comercial' },
  { area: 'comercial', texto: 'Abrir novos mercados ou territórios é desafio que poucos enfrentam. Conte-me sobre uma experiência de expansão que você liderou - como planejou e executou a entrada?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Expansão de Mercado' },
  { area: 'comercial', texto: 'Turnarounds comerciais testam todas as habilidades. Você já assumiu uma operação comercial em dificuldades? O que encontrou e que ações tomou para reverter?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround' },
  { area: 'comercial', texto: 'Processos comerciais bem definidos escalam resultados. Conte-me sobre um processo ou metodologia de vendas que você implementou. Qual foi o impacto nos resultados?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação Comercial' },
  { area: 'comercial', texto: 'Fusões e aquisições impactam a área comercial significativamente. Você já vivenciou uma M&A? Como foi a integração das equipes e carteiras de clientes?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'M&A Comercial' },
  { area: 'comercial', texto: 'Negociar contratos plurianuais com grandes corporações exige habilidades específicas. Conte-me sobre um contrato de longo prazo que você negociou - quais foram os principais pontos de negociação?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Contratos Corporativos' },

  // Comportamental (7)
  { area: 'comercial', texto: 'Vendedores seniores são referência para toda a organização comercial. Como você constrói e mantém sua influência para promover melhores práticas na empresa?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência' },
  { area: 'comercial', texto: 'Relacionamento com C-level exige postura diferenciada. Como você se posiciona em conversas com CEOs e diretores? O que muda na sua abordagem?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento Executivo' },
  { area: 'comercial', texto: 'A pressão por resultados aumenta em posições seniores. Como você equilibra entrega de curto prazo com construção de relacionamentos de longo prazo?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },
  { area: 'comercial', texto: 'O mercado de vendas evolui rapidamente. Como você se mantém relevante e continua crescendo depois de anos de experiência na área?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Reinvenção' },
  { area: 'comercial', texto: 'Formar novos líderes comerciais é parte do seu legado. Como você identifica e desenvolve futuros gestores de vendas na sua equipe?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Sucessão' },
  { area: 'comercial', texto: 'A integridade em vendas de alto valor é testada constantemente. Conte-me sobre uma situação em que você teve que escolher entre um resultado de curto prazo e a ética profissional.', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Integridade' },
  { area: 'comercial', texto: 'Networking estratégico é diferencial em vendas seniores. Como você constrói e mantém uma rede de contatos de alto nível que gera oportunidades de negócio?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Networking Estratégico' },

  // Situacional (7)
  { area: 'comercial', texto: 'A diretoria pede redução de 20% no time comercial mantendo as metas. Como você estruturaria essa mudança minimizando impacto nos resultados?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
  { area: 'comercial', texto: 'Um concorrente começou a praticar preços predatórios no seu principal segmento. Como você responde estrategicamente sem entrar em guerra de preços?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Resposta Competitiva' },
  { area: 'comercial', texto: 'O CEO pede sua análise sobre entrar em um novo mercado. Que informações você levantaria e como estruturaria sua recomendação?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Mercado' },
  { area: 'comercial', texto: 'Seu melhor vendedor recebeu proposta da concorrência. Ele é responsável por 30% da receita do time. Como você aborda essa situação?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Talentos' },
  { area: 'comercial', texto: 'Os resultados do trimestre estão 40% abaixo da meta e faltam duas semanas para fechar. Que ações de curto prazo você implementaria?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Recuperação de Resultados' },
  { area: 'comercial', texto: 'Um grande cliente histórico está considerando trocar de fornecedor após anos de parceria. Como você estrutura uma estratégia de retenção antes que seja tarde?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Clientes Estratégicos' },
  { area: 'comercial', texto: 'A empresa quer lançar um modelo de vendas por assinatura/recorrência. Como você lideraria essa transformação na abordagem comercial da equipe?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Transformação de Modelo de Negócio' },
];

// ============================================
// MARKETING
// ============================================

export const marketingJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'comercial', texto: 'O marketing digital tem diversos canais de atuação. Quais canais você já trabalhou e como você avalia qual é mais adequado para diferentes objetivos de campanha?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Canais Digitais' },
  { area: 'comercial', texto: 'Métricas são a base do marketing moderno. Quais indicadores você considera fundamentais para avaliar uma campanha e como você os interpreta para tomar decisões?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Métricas' },
  { area: 'comercial', texto: 'Criação de conteúdo é core do inbound marketing. Me conte como você desenvolve conteúdo - desde a definição de pauta até a publicação. Que ferramentas utiliza?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Criação de Conteúdo' },
  { area: 'comercial', texto: 'Redes sociais exigem estratégias específicas para cada plataforma. Como você diferencia sua abordagem entre Instagram, LinkedIn, TikTok ou outras redes que você gerencia?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Redes Sociais' },
  { area: 'comercial', texto: 'E-mail marketing continua sendo um canal poderoso. Como você estrutura campanhas de e-mail - desde a segmentação da base até a criação do conteúdo e análise de resultados?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'E-mail Marketing' },
  { area: 'comercial', texto: 'Design básico é habilidade cada vez mais valorizada em marketing. Que ferramentas de design você utiliza e como você garante consistência visual nas peças que produz?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Design Básico' },

  // Experiência (5)
  { area: 'comercial', texto: 'Conte-me sobre uma campanha de marketing que você ajudou a executar. Qual era o objetivo, que ações foram realizadas e como foram os resultados?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Campanhas' },
  { area: 'comercial', texto: 'Ferramentas de marketing são essenciais no dia a dia. Com quais plataformas você já trabalhou - automação, analytics, design - e como foi sua curva de aprendizado?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { area: 'comercial', texto: 'Análise de dados orienta decisões de marketing. Me fale sobre uma situação em que você analisou dados para propor melhorias em uma ação ou campanha.', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise de Dados' },
  { area: 'comercial', texto: 'Eventos e ações promocionais complementam o digital. Você já participou da organização de eventos ou ações de marketing offline? Como foi essa experiência?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Eventos' },
  { area: 'comercial', texto: 'Copywriting é fundamental para engajar o público. Conte-me sobre um texto ou copy que você criou que teve bom resultado - qual era o contexto e o que fez funcionar?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Copywriting' },

  // Comportamental (5)
  { area: 'comercial', texto: 'Marketing exige criatividade constante. Como você mantém sua capacidade criativa ativa? De onde você busca inspiração para novas ideias?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Criatividade' },
  { area: 'comercial', texto: 'O marketing muda muito rápido - novas plataformas, algoritmos, tendências. Como você se mantém atualizado nesse ambiente de mudança constante?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização' },
  { area: 'comercial', texto: 'Feedback sobre campanhas ou conteúdos pode ser direto às vezes. Como você lida quando seu trabalho criativo é criticado ou não aprovado?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Recepção de Feedback' },
  { area: 'comercial', texto: 'Marketing envolve múltiplas entregas simultâneas. Como você organiza seu tempo para dar conta de demandas de conteúdo, análise, campanhas e outras atividades?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'comercial', texto: 'Trabalhar com diferentes stakeholders internos é comum em marketing. Como você equilibra demandas de diferentes áreas que pedem apoio de marketing ao mesmo tempo?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Stakeholders' },

  // Situacional (5)
  { area: 'comercial', texto: 'Uma campanha importante não está performando como esperado nos primeiros dias. Que análises você faria e que ajustes consideraria para melhorar os resultados?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Otimização' },
  { area: 'comercial', texto: 'O cliente ou gestor pede uma mudança de última hora em uma peça que já estava aprovada. Como você gerencia essa situação respeitando prazos e qualidade?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Flexibilidade' },
  { area: 'comercial', texto: 'Um post nas redes sociais recebeu comentários negativos significativos. Como você lidaria com essa situação de forma a proteger a marca?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'comercial', texto: 'Você tem uma ideia que acredita ser boa para a estratégia, mas ela difere do que foi planejado. Como você apresentaria essa sugestão para a equipe?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
  { area: 'comercial', texto: 'O prazo de uma entrega importante foi antecipado e você precisa priorizar. Como você decide o que manter, simplificar ou cortar para entregar no novo prazo?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização sob Pressão' },
];

export const marketingPleno: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'comercial', texto: 'Estratégia de inbound marketing envolve toda a jornada do cliente. Me explique como você estrutura um funil de inbound - desde atração até conversão e nutrição de leads.', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Inbound Marketing' },
  { area: 'comercial', texto: 'SEO é fundamental para visibilidade orgânica. Como você desenvolve uma estratégia de SEO - desde pesquisa de palavras-chave até otimização técnica e link building?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'SEO' },
  { area: 'comercial', texto: 'Mídia paga exige gestão contínua para performance. Como você estrutura campanhas de Google Ads ou Meta Ads? Que métricas prioriza e como otimiza ao longo do tempo?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Mídia Paga' },
  { area: 'comercial', texto: 'Marketing de performance demanda análise constante de dados. Como você utiliza ferramentas de analytics para identificar insights e tomar decisões? Que análises você realiza regularmente?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Analytics' },
  { area: 'comercial', texto: 'Automação de marketing escala operações. Como você estrutura fluxos de automação - desde segmentação de base até réguas de relacionamento e lead scoring?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Automação' },
  { area: 'comercial', texto: 'CRO (Otimização de Conversão) é fundamental para maximizar resultados. Como você estrutura testes A/B e identifica oportunidades de melhoria em páginas e fluxos?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'CRO' },

  // Experiência (6)
  { area: 'comercial', texto: 'Conte-me sobre uma campanha integrada que você planejou e executou. Como você combinou diferentes canais e qual foi o impacto nos resultados?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Campanhas Integradas' },
  { area: 'comercial', texto: 'Geração de leads qualificados é objetivo central do marketing B2B. Me fale sobre uma estratégia de geração de leads que você implementou - que canais usou e como foi a qualidade dos leads?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Geração de Leads' },
  { area: 'comercial', texto: 'Lançamento de produtos exige planejamento detalhado. Você já participou de um lançamento? Conte-me sobre a estratégia go-to-market e os resultados alcançados.', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lançamento de Produtos' },
  { area: 'comercial', texto: 'Marketing trabalha com muitos fornecedores e agências. Me fale sobre sua experiência gerenciando parceiros externos - como você alinha expectativas e garante qualidade?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Fornecedores' },
  { area: 'comercial', texto: 'Estratégias de remarketing e retargeting são poderosas para conversão. Conte-me sobre uma campanha de remarketing que você implementou - como segmentou e quais resultados obteve?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Remarketing' },
  { area: 'comercial', texto: 'Parcerias com influenciadores são cada vez mais comuns. Me fale sobre sua experiência com marketing de influência - como você seleciona parceiros e mede resultados?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Marketing de Influência' },

  // Comportamental (6)
  { area: 'comercial', texto: 'Marketing precisa traduzir resultados para a linguagem de negócios. Como você apresenta relatórios para stakeholders não-técnicos demonstrando o valor das suas iniciativas?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação de Resultados' },
  { area: 'comercial', texto: 'Alinhar marketing com vendas é desafio clássico. Como você constrói relacionamento produtivo com a área comercial para garantir que os leads gerados são bem aproveitados?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Alinhamento com Vendas' },
  { area: 'comercial', texto: 'Orçamentos de marketing são frequentemente questionados. Como você defende investimentos e demonstra ROI das suas ações para conseguir recursos?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Defesa de Orçamento' },
  { area: 'comercial', texto: 'Coordenar estagiários ou analistas juniores é parte do trabalho pleno. Como você orienta e desenvolve profissionais mais novos na equipe?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },
  { area: 'comercial', texto: 'Marketing trabalha com prazos apertados e múltiplos projetos simultâneos. Como você gerencia seu tempo e prioriza quando tudo parece urgente?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Múltiplos Projetos' },
  { area: 'comercial', texto: 'Decisões de marketing às vezes precisam ser tomadas com dados incompletos. Como você equilibra análise de dados com intuição e experiência ao decidir?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Tomada de Decisão' },

  // Situacional (6)
  { area: 'comercial', texto: 'O orçamento de marketing foi cortado em 30% mas as metas continuam as mesmas. Como você replanejaria suas iniciativas para manter resultados com menos recursos?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Orçamento' },
  { area: 'comercial', texto: 'Uma mudança de algoritmo do Google derrubou seu tráfego orgânico significativamente. Que ações de curto e médio prazo você tomaria para recuperar?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptação' },
  { area: 'comercial', texto: 'Vendas reclama que os leads de marketing não são qualificados. Como você abordaria essa situação para entender o problema real e propor soluções?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Qualidade de Leads' },
  { area: 'comercial', texto: 'Um influenciador contratado publicou conteúdo que gerou polêmica e está afetando a marca. Como você gerenciaria essa crise de imagem?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'comercial', texto: 'A empresa quer entrar em uma nova rede social onde você nunca operou. Como você estruturaria o plano de entrada e os primeiros meses de operação?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Novos Canais' },
  { area: 'comercial', texto: 'Um concorrente lançou uma campanha viral que está dominando a conversa do mercado. Como você responde para não perder relevância?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Resposta Competitiva' },
];

export const marketingSenior: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'comercial', texto: 'Estratégia de marca vai além de campanhas pontuais. Como você desenvolve e mantém um posicionamento de marca consistente ao longo do tempo? Que metodologias utiliza?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Branding' },
  { area: 'comercial', texto: 'Growth marketing combina produto e marketing. Como você implementa estratégias de growth - desde experimentação até escala de canais que funcionam?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Growth Marketing' },
  { area: 'comercial', texto: 'Marketing de produto exige profundo conhecimento do cliente. Como você estrutura pesquisas de mercado e traduz insights em estratégias de posicionamento e comunicação?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Product Marketing' },
  { area: 'comercial', texto: 'Integrar dados de marketing com outras áreas cria visão unificada do cliente. Como você estrutura a governança de dados de marketing e a integração com CRM e BI?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Dados e Integração' },
  { area: 'comercial', texto: 'Marketing de conteúdo em escala exige estrutura editorial robusta. Como você desenvolve uma estratégia de content marketing que sustente volume e qualidade?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Content Strategy' },
  { area: 'comercial', texto: 'Account-Based Marketing (ABM) é estratégia crescente no B2B. Como você estrutura programas de ABM - desde seleção de contas até personalização de campanhas?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'ABM' },
  { area: 'comercial', texto: 'Marketing mix modeling e atribuição são desafios complexos. Como você estrutura a mensuração de resultados quando múltiplos touchpoints influenciam a conversão?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Marketing Attribution' },

  // Experiência (7)
  { area: 'comercial', texto: 'Conte-me sobre uma estratégia de marketing que você desenvolveu do zero e que gerou resultados transformadores para o negócio. Qual era o contexto e o que você fez de diferente?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Estratégia Transformadora' },
  { area: 'comercial', texto: 'Construir e liderar times de marketing é desafio contínuo. Me fale sobre sua experiência estruturando equipes - como você define papéis, contrata e desenvolve talentos?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Construção de Times' },
  { area: 'comercial', texto: 'Rebranding é projeto de alto impacto e risco. Você já liderou um processo de reposicionamento de marca? Conte-me sobre a jornada e os desafios enfrentados.', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Rebranding' },
  { area: 'comercial', texto: 'Expansão internacional exige adaptação de marketing. Você já liderou entrada em novos países? Como você adaptou estratégias para diferentes culturas e mercados?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Marketing Internacional' },
  { area: 'comercial', texto: 'Martech stack bem estruturada habilita operações de marketing. Conte-me sobre um projeto de implementação ou reestruturação de ferramentas de marketing que você liderou.', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Martech' },
  { area: 'comercial', texto: 'Gestão de orçamentos significativos de marketing exige planejamento rigoroso. Conte-me sobre o maior orçamento que você gerenciou - como você distribuiu recursos e mediu retorno?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Orçamento' },
  { area: 'comercial', texto: 'Transformação digital de marketing é pauta em muitas empresas. Você já liderou um processo de digitalização de marketing? Quais foram os principais desafios e aprendizados?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Digital' },

  // Comportamental (7)
  { area: 'comercial', texto: 'Marketing sênior participa de discussões estratégicas de negócio. Como você se posiciona em reuniões de diretoria e contribui para decisões além do escopo tradicional de marketing?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Negócio' },
  { area: 'comercial', texto: 'Construir credibilidade com CEOs e boards exige mais que resultados. Como você estabelece confiança e se torna conselheiro estratégico da liderança executiva?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Executiva' },
  { area: 'comercial', texto: 'O mercado de marketing está em constante transformação com novas tecnologias e canais. Como você se mantém relevante e lidera inovação na sua área?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { area: 'comercial', texto: 'Formar futuros líderes de marketing é parte do seu legado. Como você identifica potencial de liderança e desenvolve pessoas para assumir posições seniores?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Líderes' },
  { area: 'comercial', texto: 'Decisões de marketing impopulares às vezes são necessárias. Conte-me sobre uma decisão difícil que você tomou - como avaliou e comunicou para a organização?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'comercial', texto: 'Equilibrar marca e performance é tensão constante em marketing. Como você navega esse dilema e garante que ambos os objetivos sejam atendidos?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Marca/Performance' },
  { area: 'comercial', texto: 'A integridade na comunicação de marketing é testada em mercados competitivos. Como você garante que suas campanhas são éticas e não prometem mais do que entregam?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética em Marketing' },

  // Situacional (7)
  { area: 'comercial', texto: 'O CEO quer acelerar crescimento e considera que marketing deveria dobrar a geração de pipeline. Como você estruturaria um plano para atender essa demanda?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Escala de Operações' },
  { area: 'comercial', texto: 'Uma crise de reputação explodiu nas redes sociais e a imprensa está ligando. Como você coordena a resposta de marketing integrada com PR e liderança?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'comercial', texto: 'A empresa está considerando pivotar o posicionamento de mercado. Que análises e processos você conduziria para informar essa decisão estratégica?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Reposicionamento' },
  { area: 'comercial', texto: 'Seu principal canal de aquisição está saturando e o custo por lead subiu 50%. Que estratégias você exploraria para diversificar e manter crescimento?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Diversificação' },
  { area: 'comercial', texto: 'O board quer entender o retorno dos investimentos de branding que não têm conversão direta. Como você demonstra o valor dessas iniciativas?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'ROI de Branding' },
  { area: 'comercial', texto: 'A empresa está sendo adquirida e você precisa integrar as marcas e times de marketing. Como você estruturaria esse processo de integração?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Integração de Marcas' },
  { area: 'comercial', texto: 'Uma nova regulamentação limita significativamente como você pode fazer publicidade no seu setor. Como você adapta a estratégia para continuar gerando resultados?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptação Regulatória' },
];

// ============================================
// ATENDIMENTO AO CLIENTE
// ============================================

export const atendimentoClienteJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'comercial', texto: 'Um bom atendimento segue princípios fundamentais. Quais são os elementos que você considera essenciais para uma experiência positiva do cliente desde o primeiro contato?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Fundamentos de Atendimento' },
  { area: 'comercial', texto: 'Atendimento multicanal é realidade nas empresas modernas. Quais canais você já operou - telefone, chat, e-mail, redes sociais - e como você adapta sua comunicação para cada um?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Multicanal' },
  { area: 'comercial', texto: 'Conhecer procedimentos e sistemas é fundamental para atender bem. Como você se organiza para dominar os processos da empresa e utilizar os sistemas de atendimento de forma eficiente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Processos e Sistemas' },
  { area: 'comercial', texto: 'Documentar atendimentos corretamente é importante para continuidade. Como você registra interações garantindo que outro atendente consiga dar sequência se necessário?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },
  { area: 'comercial', texto: 'A escuta ativa é fundamental no atendimento. Como você pratica escuta ativa durante um atendimento? Que técnicas usa para garantir que entendeu completamente a necessidade do cliente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Escuta Ativa' },
  { area: 'comercial', texto: 'Tempo de resposta impacta a satisfação do cliente. Como você equilibra velocidade com qualidade no atendimento? Que estratégias usa para ser ágil sem comprometer a resolução?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Agilidade no Atendimento' },

  // Experiência (5)
  { area: 'comercial', texto: 'Todo atendente tem histórias marcantes. Conte-me sobre um atendimento difícil que você conseguiu transformar em uma experiência positiva para o cliente. O que você fez de diferente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Reversão de Situação' },
  { area: 'comercial', texto: 'Clientes irritados testam nossas habilidades. Me fale sobre uma situação em que você atendeu alguém muito nervoso. Como você conduziu para acalmar e resolver?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Clientes Difíceis' },
  { area: 'comercial', texto: 'Às vezes precisamos ir além do esperado pelo cliente. Conte-me sobre uma ocasião em que você superou as expectativas de alguém. O que te motivou a fazer mais?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Encantamento' },
  { area: 'comercial', texto: 'Trabalhar em equipe é parte do atendimento. Conte-me sobre uma situação em que você precisou da ajuda de colegas ou de outras áreas para resolver uma demanda do cliente.', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'comercial', texto: 'Aprender rapidamente os produtos e serviços é essencial no início. Conte-me sobre como foi sua adaptação em uma nova empresa ou área - quanto tempo levou para se sentir confiante nos atendimentos?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Curva de Aprendizado' },

  // Comportamental (5)
  { area: 'comercial', texto: 'Atendimento pode ser emocionalmente desgastante. Como você cuida da sua saúde emocional para não absorver a negatividade de clientes frustrados?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Equilíbrio Emocional' },
  { area: 'comercial', texto: 'Paciência é virtude fundamental no atendimento. Como você mantém a calma quando o cliente não entende a explicação ou faz a mesma pergunta várias vezes?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Paciência' },
  { area: 'comercial', texto: 'O que te atraiu para trabalhar com atendimento ao cliente? O que te motiva a ajudar pessoas a resolver seus problemas todos os dias?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'comercial', texto: 'Feedback sobre nosso atendimento pode ser direto. Como você recebe críticas sobre seu trabalho e as transforma em melhorias?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Desenvolvimento' },
  { area: 'comercial', texto: 'Empatia é essencial no atendimento. Como você se coloca no lugar do cliente para entender sua frustração, mesmo quando o problema parece simples de resolver?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },

  // Situacional (5)
  { area: 'comercial', texto: 'O cliente liga reclamando de algo que claramente não é culpa da empresa. Como você valida a frustração dele sem aceitar responsabilidade indevida?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Expectativas' },
  { area: 'comercial', texto: 'Você não sabe a resposta para a pergunta do cliente e seu supervisor não está disponível. Como você conduz a situação?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'comercial', texto: 'O sistema caiu e você tem uma fila de clientes esperando. Como você gerencia a situação mantendo a calma e informando os clientes adequadamente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
  { area: 'comercial', texto: 'O cliente pede algo que vai contra a política da empresa mas insiste dizendo que outro atendente já fez. Como você responde?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Consistência' },
  { area: 'comercial', texto: 'O cliente está claramente com pressa e quer uma solução rápida, mas o problema exige investigação. Como você equilibra a urgência dele com a necessidade de resolver corretamente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Urgência' },
];

export const atendimentoClientePleno: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'comercial', texto: 'Análise de métricas de atendimento orienta melhorias. Quais indicadores você considera mais importantes - NPS, CSAT, tempo de resolução - e como você os usa para melhorar seu desempenho?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas de Atendimento' },
  { area: 'comercial', texto: 'Casos complexos exigem investigação estruturada. Como você aborda um problema do cliente que envolve múltiplas áreas e não tem solução óbvia?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Resolução de Problemas Complexos' },
  { area: 'comercial', texto: 'Scripts são base mas não são tudo. Como você equilibra seguir procedimentos padrão com personalizar o atendimento para cada situação?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Personalização' },
  { area: 'comercial', texto: 'Gestão de backlog de tickets exige priorização. Como você organiza sua fila de atendimentos garantindo que casos urgentes não sejam negligenciados?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Fila' },
  { area: 'comercial', texto: 'Conhecer profundamente o produto ou serviço permite atender melhor. Como você mantém seu conhecimento atualizado quando há mudanças frequentes?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Domínio de Produto' },
  { area: 'comercial', texto: 'Atendimento consultivo vai além de resolver o problema imediato. Como você identifica oportunidades de educar o cliente sobre funcionalidades ou serviços que ele não conhece?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atendimento Consultivo' },

  // Experiência (6)
  { area: 'comercial', texto: 'Conte-me sobre um caso extremamente complexo que você resolveu. Quantas áreas envolveu, quanto tempo levou e como foi o processo de resolução?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Casos Complexos' },
  { area: 'comercial', texto: 'Treinar novos atendentes é responsabilidade comum no nível pleno. Me fale sobre sua experiência desenvolvendo colegas mais novos. Que abordagem você usa?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { area: 'comercial', texto: 'Feedback do cliente pode gerar melhorias de processo. Você já identificou um problema recorrente e sugeriu uma mudança? Conte-me sobre essa experiência.', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'comercial', texto: 'Escalações mal conduzidas frustram clientes. Me fale sobre como você gerencia casos que precisam ir para outras áreas garantindo que o cliente não fique perdido.', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Escalação' },
  { area: 'comercial', texto: 'Atender clientes de diferentes perfis e segmentos exige adaptação. Conte-me sobre sua experiência atendendo públicos diversos - como você ajusta sua comunicação?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Adaptação a Públicos' },
  { area: 'comercial', texto: 'Participar de projetos de melhoria do atendimento agrega valor. Você já participou de alguma iniciativa para melhorar processos ou ferramentas? Conte-me sobre essa experiência.', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de Melhoria' },

  // Comportamental (6)
  { area: 'comercial', texto: 'Pressão por produtividade pode afetar a qualidade. Como você mantém alto padrão de atendimento mesmo quando a fila está longa?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Qualidade sob Pressão' },
  { area: 'comercial', texto: 'Atendentes plenos são referência para a equipe. Como você contribui para o ambiente positivo e ajuda colegas que estão passando por momentos difíceis?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança Informal' },
  { area: 'comercial', texto: 'Clientes VIP ou cases críticos chegam para atendentes mais experientes. Como você se prepara mentalmente para esses atendimentos de alta pressão?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Prontidão' },
  { area: 'comercial', texto: 'O atendimento pode se tornar rotineiro após anos de experiência. Como você mantém o entusiasmo e evita o piloto automático no dia a dia?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Engajamento' },
  { area: 'comercial', texto: 'Dar e receber feedback é parte do desenvolvimento. Como você aborda conversas de feedback com colegas - tanto para reconhecer boas práticas quanto para sugerir melhorias?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Feedback Construtivo' },
  { area: 'comercial', texto: 'A colaboração entre atendentes fortalece a equipe. Como você compartilha conhecimento e melhores práticas com seus colegas de trabalho?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },

  // Situacional (6)
  { area: 'comercial', texto: 'Um cliente ameaça ir para a mídia se o problema não for resolvido imediatamente. Como você conduz essa situação de alta tensão?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'comercial', texto: 'Você identifica que um colega está dando informação incorreta consistentemente. Como você aborda essa situação de forma construtiva?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback entre Pares' },
  { area: 'comercial', texto: 'O cliente tem razão mas a política da empresa não permite atender seu pedido. Como você equilibra empatia com cumprimento das regras?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Políticas vs Empatia' },
  { area: 'comercial', texto: 'Uma falha de sistema gerou problema para centenas de clientes que estão ligando simultaneamente. Como você mantém a qualidade com volume tão alto?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento em Crise' },
  { area: 'comercial', texto: 'O cliente está claramente tentando se aproveitar de uma falha para obter vantagem indevida. Como você conduz sem ser rude mas sem ceder?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Abuso' },
  { area: 'comercial', texto: 'Você recebe um feedback negativo de qualidade sobre um atendimento que você considera que foi bem feito. Como você lida com essa situação?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Discordância de Avaliação' },
];

export const atendimentoClienteSenior: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'comercial', texto: 'Estratégia de experiência do cliente vai além do atendimento reativo. Como você contribui para mapear jornada do cliente e identificar pontos de melhoria proativamente?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Customer Experience' },
  { area: 'comercial', texto: 'Análise de dados de atendimento revela padrões importantes. Como você utiliza dados para identificar problemas sistêmicos e propor soluções para a liderança?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise de Dados' },
  { area: 'comercial', texto: 'Processos de atendimento precisam evoluir continuamente. Como você estrutura projetos de melhoria operacional - desde diagnóstico até implementação?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Melhoria Operacional' },
  { area: 'comercial', texto: 'Qualidade de atendimento exige monitoramento constante. Como você estrutura processos de QA - desde critérios de avaliação até feedback para a equipe?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Quality Assurance' },
  { area: 'comercial', texto: 'Tecnologias como IA e chatbots estão transformando o atendimento. Como você avalia onde automatizar e onde manter o toque humano?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Tecnologia de Atendimento' },
  { area: 'comercial', texto: 'Gestão de conhecimento é fundamental para atendimento eficiente. Como você estrutura bases de conhecimento e garante que informações estejam atualizadas e acessíveis?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Conhecimento' },
  { area: 'comercial', texto: 'Voice of Customer (VoC) integra feedback de múltiplas fontes. Como você estrutura programas para capturar, analisar e agir sobre a voz do cliente?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Voice of Customer' },

  // Experiência (7)
  { area: 'comercial', texto: 'Conte-me sobre uma transformação na operação de atendimento que você liderou. Qual era o problema, que mudanças implementou e quais foram os resultados?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Operacional' },
  { area: 'comercial', texto: 'Desenvolver líderes de atendimento é desafio importante. Me fale sobre sua experiência formando supervisores ou coordenadores. Que abordagem você usa?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Líderes' },
  { area: 'comercial', texto: 'Crises de grande escala testam toda a operação. Conte-me sobre uma crise significativa que você gerenciou - como organizou a resposta e comunicou com clientes?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise em Escala' },
  { area: 'comercial', texto: 'Implementar novas ferramentas de atendimento envolve mudança de processos. Você já liderou uma implementação de sistema? Como garantiu adoção pela equipe?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Sistemas' },
  { area: 'comercial', texto: 'Relacionamento com áreas de negócio é fundamental para melhorar a experiência. Como você constrói parcerias internas que beneficiam o cliente final?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Relacionamento Interno' },
  { area: 'comercial', texto: 'Terceirização de atendimento é realidade em muitas empresas. Você já gerenciou operações terceirizadas? Como você garantiu qualidade e alinhamento com a cultura da empresa?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Terceiros' },
  { area: 'comercial', texto: 'Métricas de atendimento precisam evoluir com o negócio. Conte-me sobre uma situação em que você redesenhou KPIs de atendimento - o que motivou a mudança e quais foram os resultados?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Redesenho de Métricas' },

  // Comportamental (7)
  { area: 'comercial', texto: 'Atendentes seniores são guardiões da cultura de serviço. Como você dissemina e mantém vivos os valores de atendimento na organização?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Serviço' },
  { area: 'comercial', texto: 'Equilibrar eficiência operacional com experiência do cliente é tensão constante. Como você navega esse dilema nas decisões do dia a dia?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Estratégico' },
  { area: 'comercial', texto: 'O campo de atendimento ao cliente evolui com novas expectativas e tecnologias. Como você se mantém atualizado e lidera inovação na área?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { area: 'comercial', texto: 'Decisões impopulares às vezes são necessárias em atendimento. Conte-me sobre uma mudança difícil que você precisou implementar e como conduziu.', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Decisões Difíceis' },
  { area: 'comercial', texto: 'Seu legado em atendimento vai além de métricas. Que marca você quer deixar na forma como a empresa se relaciona com clientes?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Legado' },
  { area: 'comercial', texto: 'A advocacia do cliente internamente é papel do líder de atendimento. Como você representa a voz do cliente em discussões estratégicas da empresa?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Advocacia do Cliente' },
  { area: 'comercial', texto: 'Liderar em tempos de incerteza exige resiliência. Como você mantém sua equipe engajada e focada quando a empresa passa por momentos difíceis?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança em Crise' },

  // Situacional (7)
  { area: 'comercial', texto: 'A diretoria quer reduzir custos de atendimento em 25% sem afetar satisfação. Como você estruturaria um plano para alcançar esse objetivo aparentemente contraditório?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Eficiência com Qualidade' },
  { area: 'comercial', texto: 'Uma mudança de produto gerou insatisfação massiva e o NPS despencou. Como você coordena a resposta de curto prazo enquanto trabalha na solução definitiva?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Recuperação de NPS' },
  { area: 'comercial', texto: 'O CEO quer entender por que clientes estão cancelando. Como você estrutura uma análise que vá além das métricas padrão e traga insights acionáveis?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Churn' },
  { area: 'comercial', texto: 'A operação de atendimento precisa escalar rapidamente para um lançamento. Como você planeja o crescimento de equipe e processos em tempo reduzido?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Escala de Operação' },
  { area: 'comercial', texto: 'Um cliente de alto valor está ameaçando cancelar e já falou com vários níveis sem resolução. Como você assume pessoalmente para tentar reverter?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Alto Valor' },
  { area: 'comercial', texto: 'A empresa está migrando para um novo sistema de atendimento e a equipe está resistente à mudança. Como você conduz essa transição minimizando impacto na operação?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Mudança' },
  { area: 'comercial', texto: 'Uma falha crítica no produto afetou milhares de clientes e a mídia está cobrindo. Como você estrutura o atendimento para lidar com o volume e a exposição pública?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Atendimento em Crise Pública' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasComercial: PerguntaSeed[] = [
  ...vendedorComercialJunior,
  ...vendedorComercialPleno,
  ...vendedorComercialSenior,
  ...marketingJunior,
  ...marketingPleno,
  ...marketingSenior,
  ...atendimentoClienteJunior,
  ...atendimentoClientePleno,
  ...atendimentoClienteSenior,
];

export const estatisticasComercial = {
  total: perguntasComercial.length,
  porCargo: {
    'Vendedor / Comercial Junior': vendedorComercialJunior.length,
    'Vendedor / Comercial Pleno': vendedorComercialPleno.length,
    'Vendedor / Comercial Senior': vendedorComercialSenior.length,
    'Marketing Junior': marketingJunior.length,
    'Marketing Pleno': marketingPleno.length,
    'Marketing Senior': marketingSenior.length,
    'Atendimento ao Cliente Junior': atendimentoClienteJunior.length,
    'Atendimento ao Cliente Pleno': atendimentoClientePleno.length,
    'Atendimento ao Cliente Senior': atendimentoClienteSenior.length,
  },
};
