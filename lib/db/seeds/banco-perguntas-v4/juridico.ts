/**
 * Banco de Perguntas v4 - JURÍDICO
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
// ADVOGADO TRABALHISTA
// ============================================

export const advogadoTrabalhistaJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Gostaria de entender como você diferencia as modalidades de rescisão contratual. Poderia me explicar as diferenças entre justa causa, sem justa causa e acordo mútuo, detalhando quais verbas são devidas em cada situação?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'tecnica', competencia: 'Rescisão Contratual' },
  { texto: 'Cálculos trabalhistas são fundamentais na nossa rotina. Me conte como você procede para calcular horas extras quando há incidência de adicional noturno - quais variáveis você considera e qual a ordem de aplicação?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'tecnica', competencia: 'Cálculos Trabalhistas' },
  { texto: 'Uma das questões mais recorrentes que enfrentamos é a caracterização do vínculo empregatício. Como você analisa se uma relação configura emprego nos termos da CLT ou prestação de serviços autônoma? Quais elementos você busca?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'tecnica', competencia: 'Vínculo Empregatício' },
  { texto: 'O intervalo intrajornada é tema frequente nas reclamações trabalhistas. Poderia me explicar como funciona esse direito e quais são as consequências jurídicas quando ele não é concedido ou é concedido parcialmente?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'tecnica', competencia: 'Jornada de Trabalho' },

  // Experiência (4)
  { texto: 'Audiências trabalhistas têm uma dinâmica muito própria. Conte-me sobre uma audiência que você acompanhou ou conduziu - como foi sua preparação e quais momentos exigiram mais jogo de cintura da sua parte?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'experiencia', competencia: 'Audiências' },
  { texto: 'A petição inicial é o cartão de visitas do advogado. Me fale sobre uma inicial trabalhista que você elaborou - qual era o caso, como você estruturou a narrativa e os pedidos?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'experiencia', competencia: 'Peticionamento' },
  { texto: 'Relações sindicais são um universo à parte no Direito do Trabalho. Você já teve oportunidade de participar de negociações coletivas ou acompanhar acordos sindicais? Como foi essa vivência?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'experiencia', competencia: 'Relações Sindicais' },
  { texto: 'Muitas vezes os problemas estão nos detalhes da documentação. Conte-me sobre uma ocasião em que sua análise documental revelou irregularidades trabalhistas - o que você encontrou e como conduziu a situação?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise Documental' },

  // Comportamental (4)
  { texto: 'A legislação trabalhista muda constantemente e a jurisprudência evolui a cada semana. Como você se organiza para acompanhar essas mudanças e manter seu conhecimento atualizado?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { texto: 'O Direito do Trabalho tem muitas áreas de atuação possíveis. O que te atraiu especificamente para essa área? O que te motiva no dia a dia e o que você considera mais desafiador?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Nossa rotina envolve prazos fatais e múltiplos processos correndo simultaneamente. Como você se organiza para dar conta de tudo sem deixar nada passar? Me conte sobre seu método.', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { texto: 'Nem sempre nossas teses são acolhidas pelo juiz. Como você lida emocionalmente quando perde uma causa em que acreditava muito ou quando sua argumentação é rejeitada?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },

  // Situacional (4)
  { texto: 'Imagine que um cliente te procura querendo entrar com reclamação trabalhista, mas durante a análise você percebe que algumas verbas importantes já prescreveram. Como você conduziria essa conversa e orientaria o cliente?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação com Cliente' },
  { texto: 'Você está em audiência e a testemunha do seu cliente começa a apresentar contradições no depoimento. O juiz percebe. Como você contornaria essa situação delicada?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Durante a preparação do caso, você descobre que o cliente omitiu informações relevantes que enfraquecem significativamente a ação. Como você procederia do ponto de vista ético e prático?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { texto: 'A parte contrária oferece um acordo que você considera tecnicamente vantajoso, mas o cliente quer recusar por estar emocionalmente afetado. Como você o orientaria sem impor sua opinião?', cargo: 'Advogado Trabalhista', nivel: 'junior', categoria: 'situacional', competencia: 'Negociação' },
];

export const advogadoTrabalhistaPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'A terceirização passou por grandes mudanças nos últimos anos. Gostaria que você comparasse o cenário antes e depois da Lei 13.429/17 e da decisão do STF sobre atividade-fim. Quais riscos ainda persistem para as empresas na sua avaliação?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Terceirização' },
  { texto: 'Grupo econômico é tema sensível para muitas empresas. Me explique como você identifica a configuração de grupo econômico trabalhista, os requisitos para responsabilidade solidária e qual estratégia processual você adota quando percebe essa situação?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Grupo Econômico' },
  { texto: 'A Reforma Trabalhista trouxe mudanças significativas no acesso à justiça. Gostaria de ouvir sua análise sobre os impactos práticos, especialmente quanto aos honorários de sucumbência e à justiça gratuita. Como isso afetou sua atuação?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Reforma Trabalhista' },
  { texto: 'Casos de assédio moral são delicados e exigem estratégia bem definida. Como você estrutura a defesa empresarial nesses casos? Quais provas são mais relevantes e que orientações preventivas você dá às empresas?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Assédio Moral' },
  { texto: 'A fase de execução trabalhista tem suas peculiaridades. Me explique como funciona a sistemática atual, incluindo penhora online, desconsideração da personalidade jurídica e os limites de responsabilização dos sócios.', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Execução Trabalhista' },

  // Experiência (4)
  { texto: 'Conte-me sobre uma ação trabalhista complexa que você conduziu do início ao trânsito em julgado. Quais foram os principais desafios, que estratégias você adotou e como avalia o resultado obtido?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Casos' },
  { texto: 'Contencioso de massa exige organização impecável. Me fale sobre sua experiência gerenciando grande volume de processos - como você estruturava o trabalho para manter qualidade e eficiência?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Contencioso de Massa' },
  { texto: 'Compliance trabalhista tem ganhado cada vez mais relevância. Você já participou da implementação de programas de conformidade em empresas? Conte-me sobre o processo e os resultados alcançados.', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Compliance' },
  { texto: 'Negociação de acordos é uma arte. Me conte sobre um acordo judicial ou extrajudicial significativo que você negociou - como foi o processo até chegar aos termos finais?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação' },

  // Comportamental (4)
  { texto: 'Às vezes há pressão por resultados que testam nossos limites éticos. Como você equilibra os interesses legítimos do cliente com sua responsabilidade profissional quando essas forças parecem conflitar?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética' },
  { texto: 'Clientes frequentemente têm expectativas desalinhadas com a realidade processual. Como você comunica riscos e probabilidades de êxito quando percebe que as expectativas estão muito elevadas?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { texto: 'A advocacia trabalhista pode ser intensa, com prazos fatais e audiências em sequência. Que estratégias você desenvolveu para gerenciar o estresse sem comprometer sua saúde e qualidade do trabalho?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Estresse' },
  { texto: 'Desenvolver talentos é parte importante do trabalho de um advogado pleno. Como você orienta e desenvolve os colegas mais jovens? Me dê exemplos concretos de mentoria que você praticou.', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },

  // Situacional (5)
  { texto: 'Uma empresa cliente precisa desligar 200 funcionários por reestruturação. Como você estruturaria o plano de desligamento para minimizar riscos trabalhistas e preservar a imagem da empresa?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Demissão em Massa' },
  { texto: 'O MPT abriu investigação contra seu cliente por supostas irregularidades. Como você conduziria a defesa e a negociação com o Ministério Público? Que postura você adotaria?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Inquérito Civil' },
  { texto: 'Durante uma auditoria trabalhista, você descobre passivos significativos que nem o RH conhecia. Como você reportaria essa situação à diretoria e que ações recomendaria?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Due Diligence' },
  { texto: 'O TST acabou de mudar o entendimento sobre um tema que afeta vários processos seus em andamento. Como você adapta sua estratégia e comunica isso aos clientes?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptação Estratégica' },
  { texto: 'Um ex-funcionário está fazendo postagens em redes sociais sobre a empresa cliente - algumas acusações são verdadeiras, outras claramente falsas. Que orientação você daria ao cliente?', cargo: 'Advogado Trabalhista', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
];

export const advogadoTrabalhistaSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'As novas formas de trabalho estão redesenhando o Direito do Trabalho. Como você analisa os impactos do teletrabalho, das plataformas digitais e da gig economy? Que orientações você tem dado às empresas que operam nesses modelos?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'tecnica', competencia: 'Novas Relações de Trabalho' },
  { texto: 'Litigância estratégica em instâncias superiores exige critério rigoroso. Como você seleciona casos para levar ao TST e STF? Que fatores pesam na decisão de investir em um recurso de longo prazo?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'tecnica', competencia: 'Litigância Estratégica' },
  { texto: 'Temos hoje diversas formas de resolver conflitos trabalhistas: negociação, mediação, arbitragem, Judiciário. Com sua experiência, quando você recomenda cada uma dessas vias? Quais critérios orientam essa escolha?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'tecnica', competencia: 'Resolução de Conflitos' },
  { texto: 'Remuneração variável é um campo minado de riscos trabalhistas e previdenciários. Como você estrutura programas de stock options e PLR para minimizar contingências? Quais são os cuidados essenciais?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'tecnica', competencia: 'Remuneração Variável' },
  { texto: 'Operações de M&A envolvem complexidades trabalhistas significativas. Me fale sobre sua abordagem em due diligence trabalhista, sucessão de empregadores e integração de políticas de RH pós-aquisição.', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'tecnica', competencia: 'M&A Trabalhista' },

  // Experiência (5)
  { texto: 'Negociações coletivas complexas testam nossa capacidade de articulação. Conte-me sobre uma negociação sindical desafiadora que você conduziu - quais eram os interesses em jogo e como você chegou ao acordo?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'experiencia', competencia: 'Negociação Coletiva' },
  { texto: 'Crises trabalhistas de grande repercussão exigem gestão impecável. Descreva uma situação assim que você gerenciou - qual foi sua estratégia jurídica e de comunicação?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },
  { texto: 'Levar um caso aos tribunais superiores é uma jornada. Conte-me sobre um recurso ao TST ou STF que você conduziu - qual era a tese, como você a construiu e qual foi o desfecho?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'experiencia', competencia: 'Tribunais Superiores' },
  { texto: 'Estruturar ou reestruturar um departamento jurídico trabalhista é um projeto complexo. Você já liderou algo assim? Que métricas você implementou para medir eficiência e qualidade?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão Jurídica' },
  { texto: 'Due diligence trabalhista em operações societárias revela surpresas. Conte-me sobre uma operação em que você atuou - quais riscos você identificou e como foram tratados na negociação?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'experiencia', competencia: 'Due Diligence' },

  // Comportamental (5)
  { texto: 'Empresas frequentemente pressionam por redução de custos trabalhistas. Como você equilibra essa demanda legítima com a manutenção de práticas éticas e sustentáveis no longo prazo?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Empresarial' },
  { texto: 'Para ser visto como parceiro estratégico, não basta ser tecnicamente competente. Como você constrói relacionamentos de confiança com executivos de alto nível - CEOs, CHROs, CFOs?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento Executivo' },
  { texto: 'Implantar cultura de compliance em organizações resistentes é um desafio de gestão de mudanças. Como você conduz esse processo? Pode me dar exemplos concretos de transformações que você liderou?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'comportamental', competencia: 'Change Management' },
  { texto: 'Com sua experiência, qual sua visão sobre o futuro do Direito do Trabalho no Brasil nos próximos anos? Como você está preparando sua equipe para essas transformações?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Estratégica' },
  { texto: 'Formar e reter talentos em advocacia trabalhista é cada vez mais desafiador. Que práticas de desenvolvimento você implementa? Como você mantém sua equipe engajada e crescendo?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Talentos' },

  // Situacional (5)
  { texto: 'Uma multinacional quer implementar no Brasil uma política global de RH que conflita com a legislação local. Como você conduziria essa consultoria equilibrando compliance local e diretrizes corporativas?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'situacional', competencia: 'Consultoria Internacional' },
  { texto: 'O cliente quer contestar a constitucionalidade de uma alteração legislativa recente que o prejudica. Como você avalia a viabilidade técnica e estrutura uma estratégia de médio-longo prazo?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'situacional', competencia: 'Controle de Constitucionalidade' },
  { texto: 'Há uma greve em curso na empresa cliente e as negociações estão travadas. Como você atuaria para destravar o impasse? Qual seria sua estratégia jurídica e negocial?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Greves' },
  { texto: 'O CFO precisa entender o impacto financeiro do passivo trabalhista para uma potencial abertura de capital. Como você estruturaria essa análise para atender às exigências de um IPO?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'situacional', competencia: 'IPO/Passivo Trabalhista' },
  { texto: 'Um concorrente está assediando seus advogados seniores com propostas agressivas. Como você lida com a retenção da equipe e, simultaneamente, com a proteção de informações confidenciais?', cargo: 'Advogado Trabalhista', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Talentos' },
];

// ============================================
// ADVOGADO CIVIL
// ============================================

export const advogadoCivilJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'A responsabilidade civil é um dos pilares do Direito Civil. Poderia me explicar as diferenças entre responsabilidade contratual e extracontratual, e como você identifica qual delas se aplica em um caso concreto?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Responsabilidade Civil' },
  { texto: 'Dano moral é tema frequente no nosso cotidiano. Me explique como você analisa os requisitos para sua caracterização e quais parâmetros utiliza para avaliar o quantum indenizatório?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Dano Moral' },
  { texto: 'Contratos de adesão merecem atenção especial do advogado. O que caracteriza essa modalidade contratual e quais proteções o ordenamento jurídico oferece à parte aderente?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Contratos' },
  { texto: 'As tutelas de urgência são ferramentas poderosas no processo civil. Me explique as diferenças entre tutela antecipada e tutela cautelar, e quando você optaria por cada uma delas?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Tutelas de Urgência' },

  // Experiência (4)
  { texto: 'A petição inicial é onde construímos a narrativa do caso. Conte-me sobre uma inicial cível que você elaborou - qual era a causa de pedir e como você estruturou os pedidos para maximizar as chances de êxito?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Peticionamento' },
  { texto: 'Contratos bem redigidos previnem litígios. Me fale sobre sua experiência analisando e elaborando contratos - quais cláusulas você considera indispensáveis em qualquer instrumento contratual?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Contratos' },
  { texto: 'Audiências de instrução são momentos decisivos. Você já acompanhou uma audiência cível com oitiva de testemunhas? Como foi a experiência e o que você aprendeu sobre técnica de inquirição?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Audiências' },
  { texto: 'Pesquisa jurisprudencial fundamenta boas peças. Conte-me sobre uma pesquisa extensa que você realizou - como organizou os precedentes encontrados e como isso impactou o caso?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Pesquisa Jurídica' },

  // Comportamental (4)
  { texto: 'O Direito Civil é vasto - família, contratos, imobiliário, responsabilidade civil, sucessões. O que te atraiu para essa área e quais subáreas despertam mais seu interesse profissional?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Casos de família ou danos pessoais envolvem clientes emocionalmente abalados. Como você lida com essas situações mantendo o distanciamento técnico necessário sem perder a empatia?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Inteligência Emocional' },
  { texto: 'O Direito está em constante evolução. Como você organiza seus estudos e acompanha as mudanças legislativas e jurisprudenciais relevantes para sua atuação?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { texto: 'Feedback é parte essencial do crescimento profissional. Como você reage quando um advogado mais experiente aponta falhas no seu trabalho? Me dê um exemplo de feedback que te ajudou a evoluir.', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade' },

  // Situacional (4)
  { texto: 'Um cliente quer processar alguém por danos morais, mas sua análise indica chances baixas de êxito. Como você conduziria essa conversa de forma honesta sem parecer desestimulador?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Aconselhamento' },
  { texto: 'Imagine que você percebeu que perdeu um prazo processual importante. Qual seria seu procedimento imediato? Como você comunicaria ao cliente e à equipe?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'O cliente insiste em uma estratégia processual que você considera juridicamente inadequada. Como você conduziria essa conversa respeitando a autonomia dele mas exercendo seu dever de orientação?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { texto: 'Durante uma mediação, a parte contrária faz uma proposta de acordo e o cliente pede sua opinião. Como você o orienta de forma equilibrada, ajudando na decisão sem decidir por ele?', cargo: 'Advogado Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Mediação' },
];

export const advogadoCivilPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'O CPC/15 trouxe um sistema robusto de precedentes. Gostaria de ouvir sua análise sobre IRDR, IAC e súmulas vinculantes - como você utiliza esse sistema na prática e qual o impacto na advocacia cível?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Precedentes' },
  { texto: 'A desconsideração da personalidade jurídica é remédio excepcional. Me explique as diferenças entre as teorias maior e menor, o procedimento incidental do CPC e em quais situações você a requer ou contesta?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Direito Societário' },
  { texto: 'Juros e correção monetária são temas complexos após as recentes decisões do STF. Como você aplica esses índices atualmente e que cuidados toma na liquidação de sentenças?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Liquidação' },
  { texto: 'Defesas em ações de cobrança exigem estratégia bem elaborada. Como você estrutura a contestação quando há múltiplos contratos e garantias envolvidos? Que preliminares e teses de mérito você prioriza?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Defesa Estratégica' },
  { texto: 'Execução de título extrajudicial e cumprimento de sentença têm dinâmicas distintas. Me explique as peculiaridades de cada via e como você decide qual caminho recomendar ao cliente?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Execução' },

  // Experiência (4)
  { texto: 'Conte-me sobre um caso cível complexo que você conduziu. Quais foram os principais desafios probatórios e que estratégias você utilizou para superá-los?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Casos' },
  { texto: 'Ações coletivas têm peculiaridades próprias. Você já atuou em ACP, mandado de segurança coletivo ou ações de classe? Me conte sobre seu papel e principais aprendizados.', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Ações Coletivas' },
  { texto: 'Métodos alternativos de resolução de conflitos estão em ascensão. Você já participou de arbitragem ou mediação institucional? Como compara a experiência com o processo judicial tradicional?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Métodos Alternativos' },
  { texto: 'Operações contratuais complexas exigem assessoria cuidadosa. Conte-me sobre uma operação relevante que você assessorou - compra de empresa, financiamento, parceria. Quais riscos você identificou e mitigou?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Consultoria Contratual' },

  // Comportamental (4)
  { texto: 'Litígios cíveis podem durar anos. Como você gerencia as expectativas dos clientes quanto a prazos e probabilidades de êxito ao longo de um processo longo?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Expectativas' },
  { texto: 'Negociar acordos é uma habilidade valiosa. Descreva sua abordagem - como você prepara uma proposta, conduz a negociação e identifica o momento certo de fechar?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Negociação' },
  { texto: 'Infelizmente, alguns colegas adotam táticas protelatórias ou desleais. Como você lida com advogados da parte contrária que agem dessa forma sem se rebaixar ao mesmo nível?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética' },
  { texto: 'Orientar colegas mais jovens é parte do trabalho de um advogado pleno. Como você supervisiona e desenvolve os juniores da equipe? Que abordagem você adota?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança' },

  // Situacional (5)
  { texto: 'Seu cliente venceu a ação, mas na execução descobre que o devedor não tem bens penhoráveis. Quais estratégias você adotaria para tentar satisfazer o crédito?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Execução' },
  { texto: 'Durante a instrução, surge uma prova que prejudica significativamente a posição do seu cliente. Como você adapta a estratégia diante dessa reviravolta?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptação Estratégica' },
  { texto: 'Um contrato que você redigiu há alguns anos está sendo questionado judicialmente por suposta ambiguidade. Como você defende seu trabalho e orienta o cliente nessa situação delicada?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Responsabilidade Profissional' },
  { texto: 'O juiz indeferiu a tutela de urgência que você considerava essencial para o caso. Quais são suas opções recursais e como você decide o melhor caminho a seguir?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Recursos' },
  { texto: 'O cliente quer litigar contra um parceiro comercial importante, mas sua análise indica chances questionáveis de êxito. Como você pondera os riscos técnicos e reputacionais ao orientá-lo?', cargo: 'Advogado Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Aconselhamento Estratégico' },
];

export const advogadoCivilSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Com sua experiência, como você vê a evolução do contencioso cível nos próximos anos? Que impactos você projeta com a crescente digitalização e o uso de IA no Judiciário?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Visão de Mercado' },
  { texto: 'Litígios societários envolvem complexidades técnicas e políticas. Como você estrutura a estratégia em disputas entre sócios, considerando os aspectos jurídicos e os interesses de negócio subjacentes?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Direito Societário' },
  { texto: 'A advocacia consultiva em operações imobiliárias de grande porte exige visão sistêmica. Que due diligence você considera essencial e como estrutura os instrumentos para proteger o cliente?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Direito Imobiliário' },
  { texto: 'Arbitragem tornou-se a via preferencial em contratos empresariais. Como você avalia a escolha entre arbitragem e Judiciário? Que experiência você tem conduzindo procedimentos arbitrais complexos?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Arbitragem' },
  { texto: 'Ações de classe e tutela coletiva estão em expansão no Brasil. Como você vê essa tendência e que estratégias você recomenda para empresas que podem ser alvo dessas ações?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Tutela Coletiva' },

  // Experiência (5)
  { texto: 'Conte-me sobre a operação cível mais complexa que você liderou. Quais eram as partes envolvidas, os valores em jogo e como você estruturou a estratégia vencedora?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Casos Emblemáticos' },
  { texto: 'Liderar equipes jurídicas exige habilidades que vão além do técnico. Como você desenvolveu suas competências de gestão e quais práticas implementou para formar advogados de excelência?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança' },
  { texto: 'Situações de crise exigem sangue frio e estratégia clara. Descreva uma crise empresarial que você gerenciou do ponto de vista jurídico - qual era o cenário e como você conduziu?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },
  { texto: 'Recuperação judicial e falência testam as habilidades do civilista. Você já atuou representando credores ou a própria recuperanda? Conte-me sobre essa experiência e os desafios enfrentados.', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Recuperação e Falência' },
  { texto: 'Casos que vão aos tribunais superiores exigem teses bem construídas. Me conte sobre um recurso especial ou extraordinário relevante que você conduziu - qual era a questão jurídica e como você a desenvolveu?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Tribunais Superiores' },

  // Comportamental (5)
  { texto: 'Construir reputação como referência na área leva anos. Como você desenvolveu sua marca pessoal e como equilibra a projeção profissional com a entrega consistente aos clientes?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Marca Pessoal' },
  { texto: 'Clientes de alto nível esperam mais que conhecimento técnico - querem um conselheiro de confiança. Como você constrói esse tipo de relacionamento com CEOs e acionistas?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento Executivo' },
  { texto: 'O mercado jurídico está em transformação. Como você se mantém relevante e prepara sua prática para as mudanças que estão por vir?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { texto: 'Formar a próxima geração de líderes é legado importante. Como você identifica potencial em advogados jovens e que caminho você traça para desenvolvê-los?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Líderes' },
  { texto: 'Decisões difíceis fazem parte da liderança. Conte-me sobre uma situação onde você precisou tomar uma decisão impopular mas necessária. Como conduziu?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },

  // Situacional (5)
  { texto: 'Uma empresa está em negociações avançadas para aquisição, mas você identificou contingências cíveis significativas na due diligence. Como você reporta e que recomendações faz às partes?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'situacional', competencia: 'M&A' },
  { texto: 'O cliente é alvo de uma ação coletiva com potencial de gerar grande repercussão midiática. Como você estrutura a estratégia jurídica integrada com a comunicação institucional?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Dois clientes importantes estão em posições opostas em um litígio. Como você gerencia o conflito de interesses preservando o relacionamento com ambos?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Conflito de Interesses' },
  { texto: 'O conselho de administração pede uma análise de risco do portfólio de processos para tomada de decisão estratégica. Como você estrutura esse trabalho e apresenta aos conselheiros?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Portfólio' },
  { texto: 'Um litígio estratégico está empacado há anos. O cliente pergunta se vale a pena continuar investindo ou buscar acordo em condições desfavoráveis. Como você orienta essa decisão?', cargo: 'Advogado Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Custo-Benefício' },
];

// ============================================
// ADVOGADO CRIMINAL
// ============================================

export const advogadoCriminalJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'A teoria do crime é o alicerce do Direito Penal. Poderia me explicar as diferenças entre dolo e culpa, incluindo as principais espécies de cada um reconhecidas pela doutrina?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'tecnica', competencia: 'Teoria do Crime' },
  { texto: 'A prisão em flagrante tem regras específicas que precisam ser dominadas. Me explique as modalidades de flagrante, os prazos a serem observados e como funciona o controle de legalidade pelo juiz.', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'tecnica', competencia: 'Prisão em Flagrante' },
  { texto: 'A liberdade é a regra, a prisão a exceção. Quais são os pressupostos para decretação de prisão preventiva e em que situações você impetraria habeas corpus para combatê-la?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'tecnica', competencia: 'Medidas Cautelares' },
  { texto: 'O advogado criminal atua desde o inquérito até o trânsito em julgado. Me explique a diferença entre inquérito policial e ação penal, e qual o papel do defensor em cada fase?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'tecnica', competencia: 'Fases da Persecução' },

  // Experiência (4)
  { texto: 'O habeas corpus é a ferramenta mais urgente do criminalista. Conte-me sobre um HC que você ajudou a impetrar - qual era o fundamento e como vocês estruturaram a peça?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'experiencia', competencia: 'Habeas Corpus' },
  { texto: 'Audiências criminais têm dinâmica própria. Me fale sobre sua experiência em audiências de custódia ou instrução - como foi sua preparação e participação efetiva?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'experiencia', competencia: 'Audiências' },
  { texto: 'Acompanhar cliente na delegacia ou no MP é momento crítico. Você já vivenciou isso? Como você orientou o cliente sobre seus direitos, especialmente o silêncio?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'experiencia', competencia: 'Inquérito' },
  { texto: 'Provas técnicas são frequentes no processo penal. Conte-me sobre um caso em que você precisou analisar laudos periciais - como você interpretou os dados técnicos para a defesa?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'experiencia', competencia: 'Provas Técnicas' },

  // Comportamental (4)
  { texto: 'A advocacia criminal carrega certo estigma social. O que te motivou a escolher essa área e como você lida com questionamentos sobre defender "criminosos"?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'Defender acusados de crimes graves que causam comoção pública exige equilíbrio. Como você mantém a serenidade e o profissionalismo nessas situações?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'comportamental', competencia: 'Equilíbrio Emocional' },
  { texto: 'Todo advogado criminal enfrenta dilemas entre defesa técnica e valores pessoais. Como você concilia esses aspectos quando há aparente conflito?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética' },
  { texto: 'O Direito Criminal não tem hora - prisões acontecem de madrugada, fins de semana. Como você se organiza para atender urgências em horários incomuns?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'comportamental', competencia: 'Disponibilidade' },

  // Situacional (4)
  { texto: 'Um cliente confessa reservadamente que cometeu o crime, mas quer que você busque sua absolvição. Como você procede eticamente nessa situação delicada?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { texto: 'Seu cliente liga da delegacia dizendo que está sendo interrogado. Você não consegue chegar a tempo. Que orientações imediatas você daria por telefone?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'situacional', competencia: 'Urgência' },
  { texto: 'A família do cliente insiste em saber detalhes do caso, mas ele expressamente pediu sigilo. Como você gerencia essa situação preservando o sigilo profissional?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'situacional', competencia: 'Sigilo' },
  { texto: 'O MP oferece acordo de não persecução penal ao seu cliente. Como você explicaria as implicações dessa escolha e o ajudaria a decidir conscientemente?', cargo: 'Advogado Criminal', nivel: 'junior', categoria: 'situacional', competencia: 'ANPP' },
];

export const advogadoCriminalPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Nulidades podem definir o destino de um processo. Me explique as diferenças entre nulidades absolutas e relativas, o momento adequado de arguição e suas consequências processuais.', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Nulidades' },
  { texto: 'A justiça penal negociada ganhou força no Brasil. Compare a colaboração premiada com o acordo de não persecução penal - quando você recomendaria cada instituto ao cliente?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Justiça Negociada' },
  { texto: 'A teoria do domínio do fato tem sido muito aplicada em crimes organizacionais. Como você a analisa criticamente e que impacto ela tem na estratégia de defesa?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Autoria e Participação' },
  { texto: 'Os limites constitucionais da prova são fundamentais para a defesa. Me fale sobre provas ilícitas, a teoria dos frutos da árvore envenenada e suas exceções na jurisprudência atual.', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Provas' },
  { texto: 'Crimes tributários têm peculiaridades próprias. Quais os elementos típicos mais relevantes, como funciona a extinção da punibilidade pelo pagamento e que estratégias de defesa você costuma adotar?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Crimes Tributários' },

  // Experiência (4)
  { texto: 'O Tribunal do Júri é o ápice da advocacia criminal. Conte-me sobre um júri de que você participou - como foi a preparação, a escolha dos jurados e sua sustentação em plenário?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Tribunal do Júri' },
  { texto: 'Crimes econômicos exigem conhecimento interdisciplinar. Me fale sobre sua experiência com lavagem de dinheiro, fraudes ou corrupção - quais as peculiaridades desses casos?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Crimes Econômicos' },
  { texto: 'Interceptações telefônicas são provas sensíveis. Você já atuou em casos com esse tipo de prova? Como você a contestou ou utilizou na estratégia de defesa?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Interceptação' },
  { texto: 'Recursos em instâncias superiores exigem técnica apurada. Conte-me sobre um habeas corpus ao TJ, STJ ou STF que você impetrou - qual era a tese e o resultado obtido?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'experiencia', competencia: 'HC Superior' },

  // Comportamental (4)
  { texto: 'Casos de grande repercussão atraem a mídia. Como você lida com a pressão midiática protegendo a imagem do cliente sem prejudicar a estratégia de defesa?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mídia' },
  { texto: 'Comunicar prognósticos realistas é difícil quando as notícias são ruins. Como você conversa com clientes e familiares quando a condenação parece provável?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Difícil' },
  { texto: 'Casos criminais podem ser emocionalmente intensos. Como você mantém a objetividade e o distanciamento profissional necessário para uma defesa técnica eficaz?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Objetividade' },
  { texto: 'Relacionamento institucional é importante na advocacia criminal. Como você mantém cordialidade com delegados, promotores e juízes sem comprometer a combatividade da defesa?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento Institucional' },

  // Situacional (5)
  { texto: 'Seu cliente foi condenado em primeira instância e está solto, mas a sentença determinou prisão imediata. O que você faz nas próximas horas para evitar o recolhimento?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Urgência' },
  { texto: 'O MP oferece delação premiada ao seu cliente com benefícios significativos, mas ele teria que incriminar terceiros. Como você o orienta nessa decisão que mudará sua vida?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Colaboração Premiada' },
  { texto: 'Durante a instrução, uma testemunha que você esperava favorável surpreende com depoimento prejudicial ao cliente. Como você reage nesse momento?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'O cliente quer que você apresente documentos à polícia, mas você suspeita que foram manipulados. Como procede diante desse dilema ético?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética' },
  { texto: 'A vítima procura você propondo um acordo para retirar a representação criminal. Quais os limites legais e éticos dessa negociação e como você conduziria?', cargo: 'Advogado Criminal', nivel: 'pleno', categoria: 'situacional', competencia: 'Acordo com Vítima' },
];

export const advogadoCriminalSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'O garantismo penal enfrenta desafios contemporâneos significativos. Como você vê a tensão entre eficiência punitiva e garantias fundamentais na jurisprudência atual? Qual sua posição como defensor?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'tecnica', competencia: 'Garantismo Penal' },
  { texto: 'Crimes cibernéticos e provas digitais são a nova fronteira do Direito Penal. Como você se preparou para atuar nesses casos e que desafios específicos eles apresentam para a defesa?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'tecnica', competencia: 'Crimes Cibernéticos' },
  { texto: 'Investigações internas corporativas precedem muitas ações penais. Como você conduz essas investigações equilibrando os interesses da empresa com os direitos dos investigados internos?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'tecnica', competencia: 'Investigações Internas' },
  { texto: 'A expansão do Direito Penal econômico preocupa muitos criminalistas. Qual sua análise crítica sobre essa tendência e como você atua preventivamente para proteger executivos e empresas?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'tecnica', competencia: 'Direito Penal Econômico' },
  { texto: 'Colaborações premiadas transformaram o cenário criminal brasileiro. Como você avalia esse instituto do ponto de vista da defesa? Que estratégias você adota quando seu cliente é mencionado em delação de terceiros?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'tecnica', competencia: 'Delação Premiada' },

  // Experiência (5)
  { texto: 'Casos de grande repercussão nacional testam todas as habilidades do criminalista. Conte-me sobre um caso emblemático que você conduziu - como foi a estratégia e o que você aprendeu?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'experiencia', competencia: 'Casos Emblemáticos' },
  { texto: 'Construir uma banca criminal de excelência é um desafio. Como você desenvolveu sua equipe e que metodologias de trabalho você implementou para garantir qualidade?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Banca' },
  { texto: 'Recursos aos tribunais superiores que formam jurisprudência são o ápice da advocacia técnica. Conte-me sobre um leading case que você ajudou a construir - qual a tese e o impacto?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'experiencia', competencia: 'Leading Cases' },
  { texto: 'Crises institucionais com repercussão criminal exigem gestão sofisticada. Descreva uma situação assim que você gerenciou - qual era o cenário e como você integrou estratégia jurídica e de comunicação?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise Institucional' },
  { texto: 'Atuação em operações especiais (Lava Jato, Greenfield, etc.) tornou-se nicho especializado. Você já atuou nesse contexto? Quais as peculiaridades e desafios específicos?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'experiencia', competencia: 'Grandes Operações' },

  // Comportamental (5)
  { texto: 'A advocacia criminal frequentemente coloca o defensor em posição impopular. Como você desenvolveu resiliência para sustentar defesas controversas mantendo sua integridade?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Construir autoridade técnica na área criminal leva décadas. Como você desenvolveu sua reputação e como equilibra visibilidade com discrição necessária aos casos?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'comportamental', competencia: 'Autoridade Técnica' },
  { texto: 'O criminalista sênior é frequentemente conselheiro para além do processo. Como você constrói esse papel de confiança com clientes que enfrentam os momentos mais difíceis de suas vidas?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento de Confiança' },
  { texto: 'Formar novos criminalistas de excelência é seu legado. Como você transmite não apenas técnica, mas os valores e a ética que definem um bom defensor?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'comportamental', competencia: 'Formação de Novos Talentos' },
  { texto: 'O Direito Penal brasileiro está em transformação. Qual sua visão sobre o futuro da advocacia criminal e como você está se preparando para essas mudanças?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Futuro' },

  // Situacional (5)
  { texto: 'Um executivo é alvo de busca e apreensão em operação policial. A empresa precisa de orientação imediata sobre como proceder. Como você conduz essa crise nas primeiras horas?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { texto: 'Dois clientes importantes estão em lados opostos no mesmo processo criminal. Como você gerencia esse conflito de interesses preservando a relação com ambos?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'situacional', competencia: 'Conflito de Interesses' },
  { texto: 'O Conselho de Administração quer entender os riscos criminais aos quais os executivos estão expostos. Como você estrutura essa análise e apresenta ao board?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'situacional', competencia: 'Consultoria Corporativa' },
  { texto: 'Um processo criminal está se arrastando há anos, consumindo recursos e energia do cliente. Ele pergunta se vale a pena continuar lutando ou buscar um acordo. Como você orienta?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'situacional', competencia: 'Análise Estratégica' },
  { texto: 'A mídia está fazendo cobertura agressiva e unilateral do caso do seu cliente. Como você articula a estratégia de defesa no processo com a gestão da narrativa pública?', cargo: 'Advogado Criminal', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Imagem' },
];

// ============================================
// ADVOGADO TRIBUTÁRIO
// ============================================

export const advogadoTributarioJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'O Sistema Tributário Nacional tem espécies tributárias distintas. Poderia me explicar as diferenças entre impostos, taxas e contribuições de melhoria, com exemplos práticos de cada?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'tecnica', competencia: 'Espécies Tributárias' },
  { texto: 'Os princípios constitucionais tributários são o escudo do contribuinte. Quais você considera mais relevantes e como eles se aplicam na defesa prática dos clientes?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'tecnica', competencia: 'Princípios Tributários' },
  { texto: 'Decadência e prescrição tributária são defesas poderosas. Me explique as diferenças, os prazos aplicáveis e como você identifica se um crédito tributário está extinto?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'tecnica', competencia: 'Decadência e Prescrição' },
  { texto: 'O contencioso administrativo federal é a primeira trincheira da defesa. Me explique como funciona o processo no CARF - etapas, prazos e estratégias que você considera eficazes.', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'tecnica', competencia: 'Contencioso Administrativo' },

  // Experiência (4)
  { texto: 'Defesas administrativas exigem técnica apurada. Conte-me sobre uma impugnação ou recurso ao CARF que você elaborou - qual era a matéria e quais argumentos você priorizou?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'experiencia', competencia: 'Defesa Administrativa' },
  { texto: 'Autos de infração podem esconder fragilidades. Me fale sobre sua experiência analisando autuações fiscais - como você identifica os pontos vulneráveis da exigência?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise de Autuações' },
  { texto: 'Planejamento tributário é o lado consultivo da área. Você já participou de estudos de otimização fiscal? Conte-me sobre sua contribuição e o que aprendeu.', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'experiencia', competencia: 'Planejamento Tributário' },
  { texto: 'Jurisprudência fundamenta boas defesas. Conte-me sobre uma pesquisa jurisprudencial tributária relevante que você realizou - como organizou os achados para uso prático?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'experiencia', competencia: 'Pesquisa Jurisprudencial' },

  // Comportamental (4)
  { texto: 'O Direito Tributário é vasto e complexo. O que te atraiu para essa área e quais tributos ou segmentos específicos despertam mais seu interesse profissional?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { texto: 'A legislação tributária muda constantemente - são milhares de normas por ano. Como você se organiza para acompanhar essas mudanças e manter-se atualizado?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização' },
  { texto: 'A complexidade tributária brasileira pode ser avassaladora. Como você lida com esse volume de normas sem se sentir sobrecarregado ou perder detalhes importantes?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Complexidade' },
  { texto: 'Clientes nem sempre compreendem a linguagem tributária. Como você traduz questões técnicas complexas para empresários e executivos que precisam tomar decisões?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },

  // Situacional (4)
  { texto: 'O cliente recebeu notificação fiscal com prazo de 30 dias sobre um tributo que você não domina. Como você se organiza para dar uma resposta de qualidade no prazo?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'situacional', competencia: 'Aprendizado sob Pressão' },
  { texto: 'Você identifica que a empresa está com obrigações acessórias em atraso que podem gerar autuações. O que você recomenda como ação preventiva?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'situacional', competencia: 'Prevenção' },
  { texto: 'O cliente quer adotar uma estrutura de planejamento tributário que você considera agressiva e arriscada. Como você apresenta sua análise e orienta a decisão?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'situacional', competencia: 'Aconselhamento de Risco' },
  { texto: 'Durante a análise fiscal, você encontra erros nas declarações - alguns a favor, outros contra o cliente. Como você procede do ponto de vista técnico e ético?', cargo: 'Advogado Tributário', nivel: 'junior', categoria: 'situacional', competencia: 'Ética' },
];

export const advogadoTributarioPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'A escolha do regime tributário impacta diretamente o resultado das empresas. Compare Simples, Lucro Presumido e Lucro Real - quando você recomendaria a migração entre eles?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Regimes Tributários' },
  { texto: 'O CARF tem sido rigoroso com planejamentos tributários. Gostaria de ouvir sua análise sobre os limites do planejamento à luz da jurisprudência sobre propósito negocial e substância econômica.', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento Tributário' },
  { texto: 'ICMS-ST é um dos tributos mais complexos do sistema brasileiro. Me explique a sistemática da substituição tributária, as controvérsias sobre MVA e como funciona o ressarcimento.', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'ICMS' },
  { texto: 'A exclusão do ICMS da base do PIS/COFINS foi uma das maiores vitórias dos contribuintes. Como você orienta clientes na execução desse direito? Quais os cuidados práticos?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Teses Tributárias' },
  { texto: 'O contencioso judicial tributário tem especificidades importantes. Me fale sobre execução fiscal, exceção de pré-executividade e embargos - quando você utiliza cada instrumento?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Contencioso Judicial' },

  // Experiência (4)
  { texto: 'Conte-me sobre um caso tributário relevante que você conduziu. Qual era a tese central, como você construiu a estratégia e qual foi o desfecho?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Estratégia' },
  { texto: 'Transações tributárias e parcelamentos especiais exigem análise cuidadosa. Você já orientou clientes nessas adesões? Como você avalia se vale a pena aderir?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Transação' },
  { texto: 'Due diligence tributária é crítica em operações societárias. Que contingências você mais encontra nesses trabalhos e como você reporta os achados?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Due Diligence' },
  { texto: 'Planejamento tributário que sai do papel exige implementação cuidadosa. Conte-me sobre uma estrutura que você desenhou e implementou - quais eram os riscos e como foram mitigados?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação' },

  // Comportamental (4)
  { texto: 'O cliente quer economia tributária, mas você precisa gerenciar riscos. Como você equilibra a busca por eficiência fiscal com a exposição a autuações e litígios?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Risco' },
  { texto: 'Apresentar contingências tributárias para executivos financeiros exige clareza. Como você estrutura essa comunicação para que CFOs e controllers compreendam e ajam?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { texto: 'Tributário exige trabalho conjunto com contabilidade e controladoria. Como você mantém relacionamento produtivo com essas áreas para alinhar interpretações?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho Multidisciplinar' },
  { texto: 'Quando sua interpretação da lei difere do Fisco e não há jurisprudência pacificada, como você se posiciona? Assume o risco ou orienta o caminho conservador?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Posicionamento' },

  // Situacional (5)
  { texto: 'O cliente foi autuado em R$ 50 milhões. A defesa administrativa é incerta e a judicial seria longa. Como você estrutura a estratégia global considerando fluxo de caixa e risco?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Estratégia de Defesa' },
  { texto: 'A Receita Federal intimou seu cliente para prestar esclarecimentos em procedimento de fiscalização. Como você prepara a empresa para esse momento crítico?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Procedimento Fiscal' },
  { texto: 'O STJ firmou entendimento contrário à tese que você defendia no CARF e o cliente quer continuar litigando. O que você recomenda considerando custos e probabilidades?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Reavaliação de Estratégia' },
  { texto: 'Abriu um REFIS e o cliente quer aderir, mas alguns débitos têm boa chance de êxito judicial. Como você analisa a decisão de aderir ou continuar litigando?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise de Alternativas' },
  { texto: 'A reforma tributária está em discussão com várias incertezas. Como você orienta clientes a se prepararem para mudanças que ainda não estão definidas?', cargo: 'Advogado Tributário', nivel: 'pleno', categoria: 'situacional', competencia: 'Cenários Futuros' },
];

export const advogadoTributarioSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'A reforma tributária promete transformar o sistema brasileiro. Com sua experiência, como você avalia os impactos nas empresas e que orientações está dando aos clientes neste momento de transição?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'tecnica', competencia: 'Reforma Tributária' },
  { texto: 'Transfer pricing e tributação internacional são cada vez mais relevantes. Como você orienta grupos multinacionais sobre preços de transferência e estruturas de operações cross-border?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'tecnica', competencia: 'Tributação Internacional' },
  { texto: 'Teses tributárias que formam jurisprudência podem beneficiar centenas de empresas. Como você identifica oportunidades de litigância estratégica e seleciona casos para levar aos tribunais superiores?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'tecnica', competencia: 'Litigância Estratégica' },
  { texto: 'O planejamento sucessório tem dimensão tributária significativa. Como você estrutura a transmissão de patrimônio empresarial considerando ITCMD, ganho de capital e outros aspectos fiscais?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Sucessório' },
  { texto: 'A governança tributária tornou-se tema de board. Como você apresenta riscos fiscais para conselhos de administração e que métricas utiliza para monitoramento contínuo?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'tecnica', competencia: 'Governança Tributária' },

  // Experiência (5)
  { texto: 'Conte-me sobre um caso tributário emblemático que você conduziu em tribunais superiores. Qual era a tese, como você a construiu e qual foi o impacto da decisão?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'experiencia', competencia: 'Tribunais Superiores' },
  { texto: 'Estruturar operações societárias do ponto de vista fiscal é trabalho de alta complexidade. Conte-me sobre uma operação de M&A relevante em que você definiu a estrutura tributária.', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'experiencia', competencia: 'M&A Tributário' },
  { texto: 'Liderar uma prática tributária de excelência exige gestão sofisticada. Como você estruturou sua equipe e que metodologias implementou para garantir qualidade consistente?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Prática' },
  { texto: 'Relacionamento com autoridades fiscais pode fazer diferença. Como você construiu sua rede de relacionamentos institucionais e como isso beneficia seus clientes?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'experiencia', competencia: 'Relacionamento Institucional' },
  { texto: 'Situações de crise tributária exigem ação rápida e coordenada. Descreva uma crise fiscal de grande proporção que você gerenciou - qual era o cenário e como você atuou?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },

  // Comportamental (5)
  { texto: 'O tributarista sênior é conselheiro estratégico para além do fiscal. Como você se posiciona nas discussões de negócio e contribui para decisões que vão além do aspecto tributário?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Negócio' },
  { texto: 'Construir reputação como referência tributária leva anos. Como você desenvolveu sua autoridade técnica e como equilibra visibilidade com a entrega consistente?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'comportamental', competencia: 'Autoridade Técnica' },
  { texto: 'O mercado de consultoria tributária está cada vez mais competitivo. Como você diferencia seu trabalho e mantém relevância em um ambiente de commoditização de serviços?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'comportamental', competencia: 'Diferenciação' },
  { texto: 'Formar tributaristas de excelência é seu legado. Como você identifica potencial em advogados jovens e que caminho traça para desenvolvê-los tecnicamente?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Talentos' },
  { texto: 'Com as mudanças no sistema tributário brasileiro, como você está preparando sua prática e sua equipe para o futuro da tributação no país?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'comportamental', competencia: 'Preparação para o Futuro' },

  // Situacional (5)
  { texto: 'Uma empresa está em fase final de IPO e surgem contingências tributárias relevantes na due diligence. Como você orienta sobre tratamento e disclosure dessas contingências?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'situacional', competencia: 'IPO' },
  { texto: 'O conselho de administração questiona a estratégia tributária adotada pela empresa e quer uma segunda opinião. Como você apresenta sua análise de forma objetiva e construtiva?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'situacional', competencia: 'Consultoria a Boards' },
  { texto: 'Dois clientes importantes têm posições conflitantes sobre a mesma tese tributária em disputa. Como você gerencia esse potencial conflito de interesses?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'situacional', competencia: 'Conflito de Interesses' },
  { texto: 'O CFO pede uma análise de cenários considerando diferentes resultados possíveis nos principais processos tributários da empresa. Como você estrutura essa análise?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Cenários' },
  { texto: 'Uma mudança legislativa inesperada afeta negativamente uma estrutura de planejamento que você implementou há anos. Como você comunica ao cliente e que opções você apresenta?', cargo: 'Advogado Tributário', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Mudanças' },
];

// ============================================
// ANALISTA JURÍDICO / PARALEGAL
// ============================================

export const analistaJuridico: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Análise contratual é parte central do trabalho do paralegal. Me conte sobre seu processo para triar e analisar contratos - quais cláusulas você considera críticas em qualquer instrumento?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise Contratual' },
  { texto: 'Gestão de processos judiciais exige organização impecável. Como você estrutura e mantém atualizado um sistema de controle processual? Quais informações são essenciais?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão Processual' },
  { texto: 'Pesquisa jurisprudencial fundamenta o trabalho dos advogados. Me explique como você realiza pesquisas - quais bases utiliza e como organiza os resultados de forma útil?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Pesquisa Jurídica' },
  { texto: 'Due diligence legal é trabalho meticuloso. Que tipos de documentos você analisa, como organiza os achados e de que forma apresenta as contingências identificadas?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Due Diligence' },

  // Experiência (4)
  { texto: 'Organização documental é desafio em qualquer departamento jurídico. Conte-me sobre um projeto de organização ou implementação de sistema que você participou - qual foi sua contribuição?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão Documental' },
  { texto: 'Relatórios de contingência processual apoiam decisões importantes. Me fale sobre sua experiência preparando esses relatórios - como você categoriza e quantifica os riscos?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Relatórios' },
  { texto: 'Controle de prazos processuais não pode falhar. Você já gerenciou prazos para uma carteira grande de processos? Como garantia que nenhum prazo fosse perdido?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Controle de Prazos' },
  { texto: 'O olhar atento do paralegal pode identificar problemas que passaram despercebidos. Conte-me sobre uma situação em que você encontrou uma questão importante que o advogado não havia notado.', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Atenção a Detalhes' },

  // Comportamental (4)
  { texto: 'Múltiplos advogados pedindo tarefas urgentes é situação comum. Como você prioriza quando todos dizem que suas demandas são as mais importantes?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Priorização' },
  { texto: 'Informações confidenciais circulam pelo jurídico constantemente. Que cuidados você toma para proteger dados sigilosos no dia a dia?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Confidencialidade' },
  { texto: 'Tarefas repetitivas exigem atenção constante aos detalhes. Como você mantém a precisão ao longo de trabalhos extensos e rotineiros?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Precisão' },
  { texto: 'Às vezes você pode identificar um erro ou discordar de uma orientação do advogado. Como você comunica isso de forma construtiva e respeitosa?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },

  // Situacional (4)
  { texto: 'Você está no meio de uma tarefa prioritária quando chega um contrato urgente para análise. Como você gerencia essa situação de demandas conflitantes?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Tempo' },
  { texto: 'O advogado pediu uma pesquisa sobre um tema que você percebe estar fora de sua área de conhecimento. Como você procede para entregar um trabalho de qualidade?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'situacional', competencia: 'Autonomia' },
  { texto: 'Você encontrou uma cláusula contratual preocupante, mas o negócio está prestes a ser fechado e há pressão de tempo. O que você faz?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'situacional', competencia: 'Alertas' },
  { texto: 'O sistema de gestão processual ficou fora do ar próximo de um vencimento de prazo importante. Como você garante o controle nessa situação de contingência?', cargo: 'Analista Jurídico / Paralegal', nivel: 'pleno', categoria: 'situacional', competencia: 'Contingência' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasJuridico: PerguntaSeed[] = [
  ...advogadoTrabalhistaJunior,
  ...advogadoTrabalhistaPleno,
  ...advogadoTrabalhistaSenior,
  ...advogadoCivilJunior,
  ...advogadoCivilPleno,
  ...advogadoCivilSenior,
  ...advogadoCriminalJunior,
  ...advogadoCriminalPleno,
  ...advogadoCriminalSenior,
  ...advogadoTributarioJunior,
  ...advogadoTributarioPleno,
  ...advogadoTributarioSenior,
  ...analistaJuridico,
];

export const estatisticasJuridico = {
  total: perguntasJuridico.length,
  porCargo: {
    'Advogado Trabalhista Junior': advogadoTrabalhistaJunior.length,
    'Advogado Trabalhista Pleno': advogadoTrabalhistaPleno.length,
    'Advogado Trabalhista Senior': advogadoTrabalhistaSenior.length,
    'Advogado Civil Junior': advogadoCivilJunior.length,
    'Advogado Civil Pleno': advogadoCivilPleno.length,
    'Advogado Civil Senior': advogadoCivilSenior.length,
    'Advogado Criminal Junior': advogadoCriminalJunior.length,
    'Advogado Criminal Pleno': advogadoCriminalPleno.length,
    'Advogado Criminal Senior': advogadoCriminalSenior.length,
    'Advogado Tributário Junior': advogadoTributarioJunior.length,
    'Advogado Tributário Pleno': advogadoTributarioPleno.length,
    'Advogado Tributário Senior': advogadoTributarioSenior.length,
    'Analista Jurídico': analistaJuridico.length,
  },
};
