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
  { texto: 'O processo de vendas tem etapas bem definidas. Gostaria que você me explicasse como você estrutura seu funil de vendas, desde a prospecção até o fechamento - quais são as fases que você considera essenciais?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Processo de Vendas' },
  { texto: 'Conhecer o produto ou serviço é fundamental para vender bem. Me conte como você se prepara para dominar as características e benefícios do que está vendendo. Que técnicas de estudo você utiliza?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Conhecimento de Produto' },
  { texto: 'A prospecção é o início de tudo nas vendas. Quais métodos você utiliza para encontrar potenciais clientes? Me explique como você qualifica um lead para saber se vale a pena investir tempo nele.', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Prospecção' },
  { texto: 'Objeções fazem parte do dia a dia de vendas. Quais são as objeções mais comuns que você já enfrentou e como você estrutura suas respostas para contorná-las de forma natural?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'tecnica', competencia: 'Contorno de Objeções' },

  // Experiência (4)
  { texto: 'Toda venda tem uma história por trás. Conte-me sobre uma venda que te marcou positivamente - qual foi o produto ou serviço, como você abordou o cliente e o que fez a diferença para fechar?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'Fechamento de Vendas' },
  { texto: 'Atender bem é o primeiro passo para vender. Me fale sobre sua experiência com atendimento ao cliente - como você garante uma experiência positiva desde o primeiro contato?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },
  { texto: 'Metas fazem parte da rotina comercial. Conte-me sobre uma meta desafiadora que você teve que cumprir - como você se organizou e quais estratégias usou para alcançá-la?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'Cumprimento de Metas' },
  { texto: 'Ferramentas de CRM são aliadas importantes do vendedor. Me fale sobre sua experiência com sistemas de gestão de clientes - como você organiza suas informações e follow-ups?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'experiencia', competencia: 'CRM' },

  // Comportamental (4)
  { texto: 'Vendas exigem muita resiliência - nem todos os dias são de vitórias. Como você lida com uma sequência de "nãos" sem deixar que isso afete sua motivação e energia?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'O que te atraiu para a área comercial? Me conte sobre sua motivação para trabalhar com vendas e o que te mantém engajado nessa carreira.', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'A rotina comercial exige disciplina e organização. Como você estrutura seu dia para garantir que está prospectando, fazendo follow-up e fechando negócios de forma equilibrada?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { texto: 'Vendedores precisam estar sempre aprendendo. Como você busca se desenvolver na área comercial? Que conteúdos, cursos ou referências você acompanha?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'comportamental', competencia: 'Desenvolvimento' },

  // Situacional (4)
  { texto: 'Imagine que um cliente demonstra interesse no produto mas diz que o preço está fora do orçamento dele. Como você conduziria essa negociação sem simplesmente dar desconto?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Negociação de Preço' },
  { texto: 'Um cliente que você atendeu entra em contato reclamando do produto ou serviço. Como você abordaria essa situação para resolver o problema e manter o relacionamento?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Reclamações' },
  { texto: 'Você tem duas reuniões de vendas importantes no mesmo horário e não consegue remarcar nenhuma. Como você resolveria essa situação sem perder oportunidades?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { texto: 'O cliente está quase fechando mas pede para você ligar em uma semana. Você sabe que nesse tempo ele pode esfriar ou fechar com concorrente. O que você faz?', cargo: 'Vendedor / Comercial', nivel: 'junior', categoria: 'situacional', competencia: 'Senso de Urgência' },
];

export const vendedorComercialPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Vendas consultivas exigem abordagem diferenciada. Me explique como você conduz uma venda consultiva - como você identifica as reais necessidades do cliente e apresenta soluções personalizadas?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Venda Consultiva' },
  { texto: 'O ticket médio é uma métrica importante. Quais estratégias você utiliza para aumentar o valor médio das suas vendas? Me dê exemplos de upselling e cross-selling que funcionaram para você.', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Aumento de Ticket' },
  { texto: 'Gestão de pipeline é essencial para previsibilidade. Como você organiza e prioriza suas oportunidades em diferentes estágios? Que critérios usa para decidir onde focar sua energia?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Pipeline' },
  { texto: 'Vendas B2B têm dinâmica própria com múltiplos decisores. Como você identifica os stakeholders envolvidos na decisão e adapta sua abordagem para cada um deles?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Vendas B2B' },
  { texto: 'Análise de métricas orienta decisões comerciais. Quais indicadores você acompanha para avaliar seu desempenho? Como você usa esses dados para ajustar sua estratégia?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas de Vendas' },

  // Experiência (4)
  { texto: 'Negociações complexas testam nossas habilidades. Conte-me sobre uma negociação difícil que você conduziu - quais eram os desafios e como você chegou a um acordo que satisfez ambas as partes?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação Complexa' },
  { texto: 'Recuperar clientes perdidos ou inativos é um desafio. Me fale sobre uma experiência em que você reconquistou um cliente importante. Qual foi sua abordagem?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reativação de Clientes' },
  { texto: 'Contas estratégicas exigem gestão diferenciada. Conte-me sobre como você gerenciou uma conta-chave - que ações realizou para expandir o relacionamento e os negócios?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Contas' },
  { texto: 'Prospecção outbound exige método e persistência. Me fale sobre sua experiência com cold calling ou prospecção ativa - como você estrutura sua abordagem e quais resultados já alcançou?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'experiencia', competencia: 'Prospecção Outbound' },

  // Comportamental (4)
  { texto: 'Pressão por metas é constante em vendas. Como você mantém alta performance de forma sustentável sem comprometer sua saúde mental e qualidade de vida?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { texto: 'Vendedores plenos frequentemente apoiam colegas mais novos. Como você compartilha conhecimento e ajuda no desenvolvimento de vendedores juniores?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },
  { texto: 'O mercado muda constantemente e técnicas de vendas evoluem. Como você se mantém atualizado sobre tendências, novas metodologias e mudanças no comportamento do consumidor?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização' },
  { texto: 'Competir por clientes com colegas de equipe pode gerar conflitos. Como você equilibra ambição individual com o sucesso do time?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (5)
  { texto: 'Você está negociando um contrato grande e o cliente pede condições que estão fora da sua alçada de aprovação. Como você conduz essa situação internamente e com o cliente?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação de Condições' },
  { texto: 'Um cliente importante está insatisfeito com a entrega de outro departamento e ameaça cancelar. Como você intervém para salvar a conta?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Sua meta do mês está praticamente garantida na primeira quinzena. Como você utiliza esse tempo - relaxa ou acelera? Explique sua estratégia.', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Consistência' },
  { texto: 'O concorrente está oferecendo preço 30% menor. O cliente valoriza seu produto mas está tentado. Como você defende sua proposta de valor?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Defesa de Valor' },
  { texto: 'Você percebe que o produto atual não atende completamente a necessidade do cliente, mas poderia vender assim mesmo. Como você procede eticamente?', cargo: 'Vendedor / Comercial', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética em Vendas' },
];

export const vendedorComercialSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Estratégia comercial vai além de vender - envolve planejamento de mercado. Como você analisa mercados, identifica oportunidades e define estratégias de penetração em novos segmentos?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia Comercial' },
  { texto: 'Vendas enterprise têm ciclos longos e alta complexidade. Me explique como você conduz esse tipo de venda - desde o mapeamento político da conta até o fechamento de contratos multimilionários.', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Vendas Enterprise' },
  { texto: 'Forecast preciso é crucial para o planejamento da empresa. Como você desenvolve previsões de vendas confiáveis? Que metodologia usa para estimar probabilidades de fechamento?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Forecast' },
  { texto: 'Parcerias estratégicas ampliam o alcance comercial. Como você identifica, desenvolve e gerencia parcerias que geram negócios? Me dê exemplos de alianças bem-sucedidas que você construiu.', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Parcerias Estratégicas' },
  { texto: 'A transformação digital mudou o comportamento de compra. Como você adapta estratégias de vendas para o novo contexto onde o cliente pesquisa muito antes de falar com vendedor?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'tecnica', competencia: 'Vendas no Digital' },

  // Experiência (5)
  { texto: 'Conte-me sobre o maior negócio que você já fechou. Qual era o valor, como foi o ciclo de vendas e quais foram os momentos mais críticos da negociação?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Grandes Negócios' },
  { texto: 'Liderar times comerciais exige habilidades específicas. Me fale sobre sua experiência liderando vendedores - como você contrata, desenvolve e retém talentos de alta performance?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança Comercial' },
  { texto: 'Abrir novos mercados ou territórios é desafio que poucos enfrentam. Conte-me sobre uma experiência de expansão que você liderou - como planejou e executou a entrada?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Expansão de Mercado' },
  { texto: 'Turnarounds comerciais testam todas as habilidades. Você já assumiu uma operação comercial em dificuldades? O que encontrou e que ações tomou para reverter?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround' },
  { texto: 'Processos comerciais bem definidos escalam resultados. Conte-me sobre um processo ou metodologia de vendas que você implementou. Qual foi o impacto nos resultados?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação Comercial' },

  // Comportamental (5)
  { texto: 'Vendedores seniores são referência para toda a organização comercial. Como você constrói e mantém sua influência para promover melhores práticas na empresa?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência' },
  { texto: 'Relacionamento com C-level exige postura diferenciada. Como você se posiciona em conversas com CEOs e diretores? O que muda na sua abordagem?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento Executivo' },
  { texto: 'A pressão por resultados aumenta em posições seniores. Como você equilibra entrega de curto prazo com construção de relacionamentos de longo prazo?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },
  { texto: 'O mercado de vendas evolui rapidamente. Como você se mantém relevante e continua crescendo depois de anos de experiência na área?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Reinvenção' },
  { texto: 'Formar novos líderes comerciais é parte do seu legado. Como você identifica e desenvolve futuros gestores de vendas na sua equipe?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'comportamental', competencia: 'Sucessão' },

  // Situacional (5)
  { texto: 'A diretoria pede redução de 20% no time comercial mantendo as metas. Como você estruturaria essa mudança minimizando impacto nos resultados?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
  { texto: 'Um concorrente começou a praticar preços predatórios no seu principal segmento. Como você responde estrategicamente sem entrar em guerra de preços?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Resposta Competitiva' },
  { texto: 'O CEO pede sua análise sobre entrar em um novo mercado. Que informações você levantaria e como estruturaria sua recomendação?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Mercado' },
  { texto: 'Seu melhor vendedor recebeu proposta da concorrência. Ele é responsável por 30% da receita do time. Como você aborda essa situação?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Talentos' },
  { texto: 'Os resultados do trimestre estão 40% abaixo da meta e faltam duas semanas para fechar. Que ações de curto prazo você implementaria?', cargo: 'Vendedor / Comercial', nivel: 'senior', categoria: 'situacional', competencia: 'Recuperação de Resultados' },
];

// ============================================
// MARKETING
// ============================================

export const marketingJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'O marketing digital tem diversos canais de atuação. Quais canais você já trabalhou e como você avalia qual é mais adequado para diferentes objetivos de campanha?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Canais Digitais' },
  { texto: 'Métricas são a base do marketing moderno. Quais indicadores você considera fundamentais para avaliar uma campanha e como você os interpreta para tomar decisões?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Métricas' },
  { texto: 'Criação de conteúdo é core do inbound marketing. Me conte como você desenvolve conteúdo - desde a definição de pauta até a publicação. Que ferramentas utiliza?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Criação de Conteúdo' },
  { texto: 'Redes sociais exigem estratégias específicas para cada plataforma. Como você diferencia sua abordagem entre Instagram, LinkedIn, TikTok ou outras redes que você gerencia?', cargo: 'Marketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Redes Sociais' },

  // Experiência (4)
  { texto: 'Conte-me sobre uma campanha de marketing que você ajudou a executar. Qual era o objetivo, que ações foram realizadas e como foram os resultados?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Campanhas' },
  { texto: 'Ferramentas de marketing são essenciais no dia a dia. Com quais plataformas você já trabalhou - automação, analytics, design - e como foi sua curva de aprendizado?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { texto: 'Análise de dados orienta decisões de marketing. Me fale sobre uma situação em que você analisou dados para propor melhorias em uma ação ou campanha.', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise de Dados' },
  { texto: 'Eventos e ações promocionais complementam o digital. Você já participou da organização de eventos ou ações de marketing offline? Como foi essa experiência?', cargo: 'Marketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Eventos' },

  // Comportamental (4)
  { texto: 'Marketing exige criatividade constante. Como você mantém sua capacidade criativa ativa? De onde você busca inspiração para novas ideias?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Criatividade' },
  { texto: 'O marketing muda muito rápido - novas plataformas, algoritmos, tendências. Como você se mantém atualizado nesse ambiente de mudança constante?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização' },
  { texto: 'Feedback sobre campanhas ou conteúdos pode ser direto às vezes. Como você lida quando seu trabalho criativo é criticado ou não aprovado?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Recepção de Feedback' },
  { texto: 'Marketing envolve múltiplas entregas simultâneas. Como você organiza seu tempo para dar conta de demandas de conteúdo, análise, campanhas e outras atividades?', cargo: 'Marketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },

  // Situacional (4)
  { texto: 'Uma campanha importante não está performando como esperado nos primeiros dias. Que análises você faria e que ajustes consideraria para melhorar os resultados?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Otimização' },
  { texto: 'O cliente ou gestor pede uma mudança de última hora em uma peça que já estava aprovada. Como você gerencia essa situação respeitando prazos e qualidade?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Flexibilidade' },
  { texto: 'Um post nas redes sociais recebeu comentários negativos significativos. Como você lidaria com essa situação de forma a proteger a marca?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Você tem uma ideia que acredita ser boa para a estratégia, mas ela difere do que foi planejado. Como você apresentaria essa sugestão para a equipe?', cargo: 'Marketing', nivel: 'junior', categoria: 'situacional', competencia: 'Proatividade' },
];

export const marketingPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Estratégia de inbound marketing envolve toda a jornada do cliente. Me explique como você estrutura um funil de inbound - desde atração até conversão e nutrição de leads.', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Inbound Marketing' },
  { texto: 'SEO é fundamental para visibilidade orgânica. Como você desenvolve uma estratégia de SEO - desde pesquisa de palavras-chave até otimização técnica e link building?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'SEO' },
  { texto: 'Mídia paga exige gestão contínua para performance. Como você estrutura campanhas de Google Ads ou Meta Ads? Que métricas prioriza e como otimiza ao longo do tempo?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Mídia Paga' },
  { texto: 'Marketing de performance demanda análise constante de dados. Como você utiliza ferramentas de analytics para identificar insights e tomar decisões? Que análises você realiza regularmente?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Analytics' },
  { texto: 'Automação de marketing escala operações. Como você estrutura fluxos de automação - desde segmentação de base até réguas de relacionamento e lead scoring?', cargo: 'Marketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Automação' },

  // Experiência (4)
  { texto: 'Conte-me sobre uma campanha integrada que você planejou e executou. Como você combinou diferentes canais e qual foi o impacto nos resultados?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Campanhas Integradas' },
  { texto: 'Geração de leads qualificados é objetivo central do marketing B2B. Me fale sobre uma estratégia de geração de leads que você implementou - que canais usou e como foi a qualidade dos leads?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Geração de Leads' },
  { texto: 'Lançamento de produtos exige planejamento detalhado. Você já participou de um lançamento? Conte-me sobre a estratégia go-to-market e os resultados alcançados.', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lançamento de Produtos' },
  { texto: 'Marketing trabalha com muitos fornecedores e agências. Me fale sobre sua experiência gerenciando parceiros externos - como você alinha expectativas e garante qualidade?', cargo: 'Marketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Fornecedores' },

  // Comportamental (4)
  { texto: 'Marketing precisa traduzir resultados para a linguagem de negócios. Como você apresenta relatórios para stakeholders não-técnicos demonstrando o valor das suas iniciativas?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação de Resultados' },
  { texto: 'Alinhar marketing com vendas é desafio clássico. Como você constrói relacionamento produtivo com a área comercial para garantir que os leads gerados são bem aproveitados?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Alinhamento com Vendas' },
  { texto: 'Orçamentos de marketing são frequentemente questionados. Como você defende investimentos e demonstra ROI das suas ações para conseguir recursos?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Defesa de Orçamento' },
  { texto: 'Coordenar estagiários ou analistas juniores é parte do trabalho pleno. Como você orienta e desenvolve profissionais mais novos na equipe?', cargo: 'Marketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },

  // Situacional (5)
  { texto: 'O orçamento de marketing foi cortado em 30% mas as metas continuam as mesmas. Como você replanejaria suas iniciativas para manter resultados com menos recursos?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Orçamento' },
  { texto: 'Uma mudança de algoritmo do Google derrubou seu tráfego orgânico significativamente. Que ações de curto e médio prazo você tomaria para recuperar?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptação' },
  { texto: 'Vendas reclama que os leads de marketing não são qualificados. Como você abordaria essa situação para entender o problema real e propor soluções?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Qualidade de Leads' },
  { texto: 'Um influenciador contratado publicou conteúdo que gerou polêmica e está afetando a marca. Como você gerenciaria essa crise de imagem?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'A empresa quer entrar em uma nova rede social onde você nunca operou. Como você estruturaria o plano de entrada e os primeiros meses de operação?', cargo: 'Marketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Novos Canais' },
];

export const marketingSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Estratégia de marca vai além de campanhas pontuais. Como você desenvolve e mantém um posicionamento de marca consistente ao longo do tempo? Que metodologias utiliza?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Branding' },
  { texto: 'Growth marketing combina produto e marketing. Como você implementa estratégias de growth - desde experimentação até escala de canais que funcionam?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Growth Marketing' },
  { texto: 'Marketing de produto exige profundo conhecimento do cliente. Como você estrutura pesquisas de mercado e traduz insights em estratégias de posicionamento e comunicação?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Product Marketing' },
  { texto: 'Integrar dados de marketing com outras áreas cria visão unificada do cliente. Como você estrutura a governança de dados de marketing e a integração com CRM e BI?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Dados e Integração' },
  { texto: 'Marketing de conteúdo em escala exige estrutura editorial robusta. Como você desenvolve uma estratégia de content marketing que sustente volume e qualidade?', cargo: 'Marketing', nivel: 'senior', categoria: 'tecnica', competencia: 'Content Strategy' },

  // Experiência (5)
  { texto: 'Conte-me sobre uma estratégia de marketing que você desenvolveu do zero e que gerou resultados transformadores para o negócio. Qual era o contexto e o que você fez de diferente?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Estratégia Transformadora' },
  { texto: 'Construir e liderar times de marketing é desafio contínuo. Me fale sobre sua experiência estruturando equipes - como você define papéis, contrata e desenvolve talentos?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Construção de Times' },
  { texto: 'Rebranding é projeto de alto impacto e risco. Você já liderou um processo de reposicionamento de marca? Conte-me sobre a jornada e os desafios enfrentados.', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Rebranding' },
  { texto: 'Expansão internacional exige adaptação de marketing. Você já liderou entrada em novos países? Como você adaptou estratégias para diferentes culturas e mercados?', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Marketing Internacional' },
  { texto: 'Martech stack bem estruturada habilita operações de marketing. Conte-me sobre um projeto de implementação ou reestruturação de ferramentas de marketing que você liderou.', cargo: 'Marketing', nivel: 'senior', categoria: 'experiencia', competencia: 'Martech' },

  // Comportamental (5)
  { texto: 'Marketing sênior participa de discussões estratégicas de negócio. Como você se posiciona em reuniões de diretoria e contribui para decisões além do escopo tradicional de marketing?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Negócio' },
  { texto: 'Construir credibilidade com CEOs e boards exige mais que resultados. Como você estabelece confiança e se torna conselheiro estratégico da liderança executiva?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Executiva' },
  { texto: 'O mercado de marketing está em constante transformação com novas tecnologias e canais. Como você se mantém relevante e lidera inovação na sua área?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { texto: 'Formar futuros líderes de marketing é parte do seu legado. Como você identifica potencial de liderança e desenvolve pessoas para assumir posições seniores?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Líderes' },
  { texto: 'Decisões de marketing impopulares às vezes são necessárias. Conte-me sobre uma decisão difícil que você tomou - como avaliou e comunicou para a organização?', cargo: 'Marketing', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },

  // Situacional (5)
  { texto: 'O CEO quer acelerar crescimento e considera que marketing deveria dobrar a geração de pipeline. Como você estruturaria um plano para atender essa demanda?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Escala de Operações' },
  { texto: 'Uma crise de reputação explodiu nas redes sociais e a imprensa está ligando. Como você coordena a resposta de marketing integrada com PR e liderança?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'A empresa está considerando pivotar o posicionamento de mercado. Que análises e processos você conduziria para informar essa decisão estratégica?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Reposicionamento' },
  { texto: 'Seu principal canal de aquisição está saturando e o custo por lead subiu 50%. Que estratégias você exploraria para diversificar e manter crescimento?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'Diversificação' },
  { texto: 'O board quer entender o retorno dos investimentos de branding que não têm conversão direta. Como você demonstra o valor dessas iniciativas?', cargo: 'Marketing', nivel: 'senior', categoria: 'situacional', competencia: 'ROI de Branding' },
];

// ============================================
// ATENDIMENTO AO CLIENTE
// ============================================

export const atendimentoClienteJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Um bom atendimento segue princípios fundamentais. Quais são os elementos que você considera essenciais para uma experiência positiva do cliente desde o primeiro contato?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Fundamentos de Atendimento' },
  { texto: 'Atendimento multicanal é realidade nas empresas modernas. Quais canais você já operou - telefone, chat, e-mail, redes sociais - e como você adapta sua comunicação para cada um?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Multicanal' },
  { texto: 'Conhecer procedimentos e sistemas é fundamental para atender bem. Como você se organiza para dominar os processos da empresa e utilizar os sistemas de atendimento de forma eficiente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Processos e Sistemas' },
  { texto: 'Documentar atendimentos corretamente é importante para continuidade. Como você registra interações garantindo que outro atendente consiga dar sequência se necessário?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },

  // Experiência (4)
  { texto: 'Todo atendente tem histórias marcantes. Conte-me sobre um atendimento difícil que você conseguiu transformar em uma experiência positiva para o cliente. O que você fez de diferente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Reversão de Situação' },
  { texto: 'Clientes irritados testam nossas habilidades. Me fale sobre uma situação em que você atendeu alguém muito nervoso. Como você conduziu para acalmar e resolver?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Clientes Difíceis' },
  { texto: 'Às vezes precisamos ir além do esperado pelo cliente. Conte-me sobre uma ocasião em que você superou as expectativas de alguém. O que te motivou a fazer mais?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Encantamento' },
  { texto: 'Trabalhar em equipe é parte do atendimento. Conte-me sobre uma situação em que você precisou da ajuda de colegas ou de outras áreas para resolver uma demanda do cliente.', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (4)
  { texto: 'Atendimento pode ser emocionalmente desgastante. Como você cuida da sua saúde emocional para não absorver a negatividade de clientes frustrados?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Equilíbrio Emocional' },
  { texto: 'Paciência é virtude fundamental no atendimento. Como você mantém a calma quando o cliente não entende a explicação ou faz a mesma pergunta várias vezes?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Paciência' },
  { texto: 'O que te atraiu para trabalhar com atendimento ao cliente? O que te motiva a ajudar pessoas a resolver seus problemas todos os dias?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Feedback sobre nosso atendimento pode ser direto. Como você recebe críticas sobre seu trabalho e as transforma em melhorias?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'comportamental', competencia: 'Desenvolvimento' },

  // Situacional (4)
  { texto: 'O cliente liga reclamando de algo que claramente não é culpa da empresa. Como você valida a frustração dele sem aceitar responsabilidade indevida?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Expectativas' },
  { texto: 'Você não sabe a resposta para a pergunta do cliente e seu supervisor não está disponível. Como você conduz a situação?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { texto: 'O sistema caiu e você tem uma fila de clientes esperando. Como você gerencia a situação mantendo a calma e informando os clientes adequadamente?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
  { texto: 'O cliente pede algo que vai contra a política da empresa mas insiste dizendo que outro atendente já fez. Como você responde?', cargo: 'Atendimento ao Cliente', nivel: 'junior', categoria: 'situacional', competencia: 'Consistência' },
];

export const atendimentoClientePleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Análise de métricas de atendimento orienta melhorias. Quais indicadores você considera mais importantes - NPS, CSAT, tempo de resolução - e como você os usa para melhorar seu desempenho?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Métricas de Atendimento' },
  { texto: 'Casos complexos exigem investigação estruturada. Como você aborda um problema do cliente que envolve múltiplas áreas e não tem solução óbvia?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Resolução de Problemas Complexos' },
  { texto: 'Scripts são base mas não são tudo. Como você equilibra seguir procedimentos padrão com personalizar o atendimento para cada situação?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Personalização' },
  { texto: 'Gestão de backlog de tickets exige priorização. Como você organiza sua fila de atendimentos garantindo que casos urgentes não sejam negligenciados?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Fila' },
  { texto: 'Conhecer profundamente o produto ou serviço permite atender melhor. Como você mantém seu conhecimento atualizado quando há mudanças frequentes?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'tecnica', competencia: 'Domínio de Produto' },

  // Experiência (4)
  { texto: 'Conte-me sobre um caso extremamente complexo que você resolveu. Quantas áreas envolveu, quanto tempo levou e como foi o processo de resolução?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Casos Complexos' },
  { texto: 'Treinar novos atendentes é responsabilidade comum no nível pleno. Me fale sobre sua experiência desenvolvendo colegas mais novos. Que abordagem você usa?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { texto: 'Feedback do cliente pode gerar melhorias de processo. Você já identificou um problema recorrente e sugeriu uma mudança? Conte-me sobre essa experiência.', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { texto: 'Escalações mal conduzidas frustram clientes. Me fale sobre como você gerencia casos que precisam ir para outras áreas garantindo que o cliente não fique perdido.', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Escalação' },

  // Comportamental (4)
  { texto: 'Pressão por produtividade pode afetar a qualidade. Como você mantém alto padrão de atendimento mesmo quando a fila está longa?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Qualidade sob Pressão' },
  { texto: 'Atendentes plenos são referência para a equipe. Como você contribui para o ambiente positivo e ajuda colegas que estão passando por momentos difíceis?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança Informal' },
  { texto: 'Clientes VIP ou cases críticos chegam para atendentes mais experientes. Como você se prepara mentalmente para esses atendimentos de alta pressão?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Prontidão' },
  { texto: 'O atendimento pode se tornar rotineiro após anos de experiência. Como você mantém o entusiasmo e evita o piloto automático no dia a dia?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'comportamental', competencia: 'Engajamento' },

  // Situacional (5)
  { texto: 'Um cliente ameaça ir para a mídia se o problema não for resolvido imediatamente. Como você conduz essa situação de alta tensão?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Você identifica que um colega está dando informação incorreta consistentemente. Como você aborda essa situação de forma construtiva?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback entre Pares' },
  { texto: 'O cliente tem razão mas a política da empresa não permite atender seu pedido. Como você equilibra empatia com cumprimento das regras?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Políticas vs Empatia' },
  { texto: 'Uma falha de sistema gerou problema para centenas de clientes que estão ligando simultaneamente. Como você mantém a qualidade com volume tão alto?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento em Crise' },
  { texto: 'O cliente está claramente tentando se aproveitar de uma falha para obter vantagem indevida. Como você conduz sem ser rude mas sem ceder?', cargo: 'Atendimento ao Cliente', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Abuso' },
];

export const atendimentoClienteSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Estratégia de experiência do cliente vai além do atendimento reativo. Como você contribui para mapear jornada do cliente e identificar pontos de melhoria proativamente?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Customer Experience' },
  { texto: 'Análise de dados de atendimento revela padrões importantes. Como você utiliza dados para identificar problemas sistêmicos e propor soluções para a liderança?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise de Dados' },
  { texto: 'Processos de atendimento precisam evoluir continuamente. Como você estrutura projetos de melhoria operacional - desde diagnóstico até implementação?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Melhoria Operacional' },
  { texto: 'Qualidade de atendimento exige monitoramento constante. Como você estrutura processos de QA - desde critérios de avaliação até feedback para a equipe?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Quality Assurance' },
  { texto: 'Tecnologias como IA e chatbots estão transformando o atendimento. Como você avalia onde automatizar e onde manter o toque humano?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'tecnica', competencia: 'Tecnologia de Atendimento' },

  // Experiência (5)
  { texto: 'Conte-me sobre uma transformação na operação de atendimento que você liderou. Qual era o problema, que mudanças implementou e quais foram os resultados?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Operacional' },
  { texto: 'Desenvolver líderes de atendimento é desafio importante. Me fale sobre sua experiência formando supervisores ou coordenadores. Que abordagem você usa?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Líderes' },
  { texto: 'Crises de grande escala testam toda a operação. Conte-me sobre uma crise significativa que você gerenciou - como organizou a resposta e comunicou com clientes?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise em Escala' },
  { texto: 'Implementar novas ferramentas de atendimento envolve mudança de processos. Você já liderou uma implementação de sistema? Como garantiu adoção pela equipe?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Sistemas' },
  { texto: 'Relacionamento com áreas de negócio é fundamental para melhorar a experiência. Como você constrói parcerias internas que beneficiam o cliente final?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'experiencia', competencia: 'Relacionamento Interno' },

  // Comportamental (5)
  { texto: 'Atendentes seniores são guardiões da cultura de serviço. Como você dissemina e mantém vivos os valores de atendimento na organização?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Serviço' },
  { texto: 'Equilibrar eficiência operacional com experiência do cliente é tensão constante. Como você navega esse dilema nas decisões do dia a dia?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Estratégico' },
  { texto: 'O campo de atendimento ao cliente evolui com novas expectativas e tecnologias. Como você se mantém atualizado e lidera inovação na área?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },
  { texto: 'Decisões impopulares às vezes são necessárias em atendimento. Conte-me sobre uma mudança difícil que você precisou implementar e como conduziu.', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Decisões Difíceis' },
  { texto: 'Seu legado em atendimento vai além de métricas. Que marca você quer deixar na forma como a empresa se relaciona com clientes?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Legado' },

  // Situacional (5)
  { texto: 'A diretoria quer reduzir custos de atendimento em 25% sem afetar satisfação. Como você estruturaria um plano para alcançar esse objetivo aparentemente contraditório?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Eficiência com Qualidade' },
  { texto: 'Uma mudança de produto gerou insatisfação massiva e o NPS despencou. Como você coordena a resposta de curto prazo enquanto trabalha na solução definitiva?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Recuperação de NPS' },
  { texto: 'O CEO quer entender por que clientes estão cancelando. Como você estrutura uma análise que vá além das métricas padrão e traga insights acionáveis?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Churn' },
  { texto: 'A operação de atendimento precisa escalar rapidamente para um lançamento. Como você planeja o crescimento de equipe e processos em tempo reduzido?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Escala de Operação' },
  { texto: 'Um cliente de alto valor está ameaçando cancelar e já falou com vários níveis sem resolução. Como você assume pessoalmente para tentar reverter?', cargo: 'Atendimento ao Cliente', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Alto Valor' },
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
