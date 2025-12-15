/**
 * Banco de Perguntas v4 - ADMINISTRATIVO / GESTÃO
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
// ASSISTENTE / AUXILIAR ADMINISTRATIVO
// ============================================

export const administrativoJunior: PerguntaSeed[] = [
  // Técnica (4)
  { area: 'administrativo', texto: 'A organização de documentos é fundamental no trabalho administrativo. Como você estrutura arquivos físicos e digitais para facilitar a localização e garantir que nada se perca?', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Organização Documental' },
  { area: 'administrativo', texto: 'Ferramentas de escritório são essenciais no dia a dia. Com quais softwares você tem experiência - Word, Excel, sistemas de gestão - e qual seu nível de domínio em cada um?', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Ferramentas de Escritório' },
  { area: 'administrativo', texto: 'Controle de agenda e reuniões exige atenção especial. Como você gerencia compromissos de executivos ou da equipe garantindo que não haja conflitos ou esquecimentos?', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Agenda' },
  { area: 'administrativo', texto: 'Processos de compras e cotações fazem parte da rotina administrativa. Me explique como você conduz uma cotação - desde o levantamento de necessidades até a escolha do fornecedor.', cargo: 'Administrativo', nivel: 'junior', categoria: 'tecnica', competencia: 'Compras e Cotações' },

  // Experiência (4)
  { area: 'administrativo', texto: 'A rotina administrativa envolve múltiplas tarefas simultâneas. Conte-me sobre um dia típico seu em experiências anteriores - quais eram suas principais responsabilidades?', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Rotina Administrativa' },
  { area: 'administrativo', texto: 'Atender telefonemas e visitantes com cordialidade é parte importante do trabalho. Me fale sobre sua experiência com recepção e atendimento - como você garante uma boa impressão?', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },
  { area: 'administrativo', texto: 'Apoio a processos financeiros é comum na área administrativa. Você já ajudou com contas a pagar, controle de despesas ou prestação de contas? Conte-me sobre essa experiência.', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Apoio Financeiro' },
  { area: 'administrativo', texto: 'Organização de eventos internos ou reuniões exige coordenação. Conte-me sobre um evento ou reunião importante que você ajudou a organizar - como foi o processo?', cargo: 'Administrativo', nivel: 'junior', categoria: 'experiencia', competencia: 'Organização de Eventos' },

  // Comportamental (4)
  { area: 'administrativo', texto: 'O trabalho administrativo exige atenção constante aos detalhes. Como você garante que não comete erros em tarefas repetitivas como preenchimento de planilhas ou documentos?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Atenção a Detalhes' },
  { area: 'administrativo', texto: 'Múltiplas pessoas podem fazer solicitações simultâneas. Como você prioriza quando tudo parece urgente e todos acham que sua demanda é a mais importante?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Priorização' },
  { area: 'administrativo', texto: 'Informações confidenciais circulam pela área administrativa. Que cuidados você toma para garantir sigilo sobre assuntos sensíveis da empresa?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Confidencialidade' },
  { area: 'administrativo', texto: 'O que te atraiu para a área administrativa? Quais aspectos desse trabalho você considera mais interessantes e gratificantes?', cargo: 'Administrativo', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },

  // Situacional (4)
  { area: 'administrativo', texto: 'O sistema que você usa para o trabalho travou e há uma tarefa urgente pendente. Como você resolve sem perder o prazo?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
  { area: 'administrativo', texto: 'Você recebe uma ligação de alguém nervoso querendo falar com um executivo que está em reunião importante. Como você conduz essa situação?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Conflitos' },
  { area: 'administrativo', texto: 'Ao conferir um documento, você encontra um erro que foi cometido por um colega. Como você aborda a situação?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Feedback' },
  { area: 'administrativo', texto: 'Seu gestor pede um relatório para daqui a uma hora, mas você já tinha outro compromisso inadiável. O que você faz?', cargo: 'Administrativo', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Tempo' },
];

export const administrativoPleno: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'administrativo', texto: 'Gestão de contratos exige acompanhamento rigoroso. Como você controla prazos de vigência, renovações e obrigações contratuais para múltiplos fornecedores ou clientes?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Contratos' },
  { area: 'administrativo', texto: 'Indicadores de desempenho administrativo ajudam na gestão. Quais métricas você acompanha para avaliar a eficiência dos processos sob sua responsabilidade?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores' },
  { area: 'administrativo', texto: 'Processos administrativos podem ser otimizados continuamente. Como você identifica gargalos e propõe melhorias nos fluxos de trabalho da área?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Melhoria de Processos' },
  { area: 'administrativo', texto: 'Gestão de facilities envolve manutenção, limpeza, segurança. Como você coordena prestadores de serviço garantindo qualidade e cumprimento de SLAs?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Facilities' },
  { area: 'administrativo', texto: 'Excel avançado é ferramenta poderosa para o administrativo. Me conte sobre as funcionalidades que você domina - tabelas dinâmicas, PROCV, macros - e como as aplica no dia a dia.', cargo: 'Administrativo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Excel Avançado' },

  // Experiência (4)
  { area: 'administrativo', texto: 'Processos de licitação ou grandes compras exigem documentação detalhada. Você já participou de processos assim? Conte-me sobre seu papel e os desafios enfrentados.', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Processos de Compras' },
  { area: 'administrativo', texto: 'Implementar novos sistemas ou ferramentas exige gestão de mudança. Você já participou de uma implementação? Como foi o processo de adaptação da equipe?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de Sistemas' },
  { area: 'administrativo', texto: 'Supervisionar auxiliares administrativos é responsabilidade comum no nível pleno. Me fale sobre sua experiência coordenando trabalho de outras pessoas.', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Supervisão' },
  { area: 'administrativo', texto: 'Auditorias internas ou externas exigem documentação organizada. Você já participou do preparo para auditorias? Como você organiza as evidências necessárias?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditorias' },

  // Comportamental (4)
  { area: 'administrativo', texto: 'Administrativo pleno é ponte entre operação e gestão. Como você comunica demandas do dia a dia para a liderança de forma estruturada e objetiva?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'administrativo', texto: 'Mudanças de processo podem encontrar resistência. Como você lida quando propõe uma melhoria e os colegas preferem manter como sempre foi?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Mudança' },
  { area: 'administrativo', texto: 'Treinar novos colaboradores na rotina administrativa exige paciência. Como você estrutura o treinamento para que a pessoa aprenda de forma eficiente?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Capacidade de Treinar' },
  { area: 'administrativo', texto: 'O trabalho administrativo pode parecer pouco valorizado. Como você mantém sua motivação e busca crescimento profissional na área?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento' },

  // Situacional (5)
  { area: 'administrativo', texto: 'A empresa vai mudar de escritório em 30 dias. Como você estruturaria o plano de mudança garantindo continuidade das operações?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Projetos' },
  { area: 'administrativo', texto: 'O fornecedor principal não entregou no prazo e afeta operação crítica. Que ações você tomaria para resolver e prevenir no futuro?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Fornecedores' },
  { area: 'administrativo', texto: 'Você identificou que um processo consome muito tempo da equipe mas nunca alguém questionou. Como você propõe a mudança para a liderança?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'situacional', competencia: 'Proposta de Melhoria' },
  { area: 'administrativo', texto: 'O orçamento administrativo foi cortado mas as demandas continuam. Como você prioriza e negocia com as áreas o que será possível atender?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Orçamento' },
  { area: 'administrativo', texto: 'Dois gestores fazem pedidos conflitantes e ambos dizem ter urgência máxima. Como você resolve sem desagradar nenhum?', cargo: 'Administrativo', nivel: 'pleno', categoria: 'situacional', competencia: 'Mediação' },
];

// ============================================
// ANALISTA FINANCEIRO
// ============================================

export const analistaFinanceiroJunior: PerguntaSeed[] = [
  // Técnica (4)
  { area: 'administrativo', texto: 'Conciliação bancária é rotina fundamental no financeiro. Me explique como você realiza esse processo - que conferências faz e como trata as divergências encontradas?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Conciliação Bancária' },
  { area: 'administrativo', texto: 'Contas a pagar e a receber são o coração do financeiro. Como você organiza e prioriza pagamentos garantindo que nada atrase e não haja pagamentos duplicados?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Contas a Pagar/Receber' },
  { area: 'administrativo', texto: 'Fluxo de caixa permite visualizar a saúde financeira. Me explique como você estrutura um controle de fluxo de caixa e que informações considera essenciais?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Fluxo de Caixa' },
  { area: 'administrativo', texto: 'Demonstrações financeiras contam a história da empresa. Quais são os principais relatórios que você conhece e como você interpreta as informações básicas deles?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Demonstrações Financeiras' },

  // Experiência (4)
  { area: 'administrativo', texto: 'A rotina financeira envolve processos recorrentes com prazos rígidos. Conte-me sobre sua experiência com fechamentos mensais - qual era seu papel e principais responsabilidades?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Fechamento Mensal' },
  { area: 'administrativo', texto: 'Sistemas de gestão financeira (ERP) são ferramentas do dia a dia. Com quais sistemas você já trabalhou e como foi sua adaptação a eles?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas Financeiros' },
  { area: 'administrativo', texto: 'Relacionamento com bancos é parte do trabalho. Você já negociou taxas, enviou documentação para análise de crédito ou resolveu problemas bancários? Conte-me.', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Relacionamento Bancário' },
  { area: 'administrativo', texto: 'Excel é ferramenta essencial no financeiro. Conte-me sobre planilhas ou controles que você desenvolveu - que funcionalidades utilizou e como elas ajudaram no trabalho?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Excel Financeiro' },

  // Comportamental (4)
  { area: 'administrativo', texto: 'Números errados podem ter grandes consequências. Que processos de verificação você adota para garantir a precisão dos dados financeiros que você produz?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Precisão' },
  { area: 'administrativo', texto: 'Informações financeiras são altamente confidenciais. Como você garante sigilo sobre dados sensíveis como salários, resultados e movimentações bancárias?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Confidencialidade' },
  { area: 'administrativo', texto: 'Fechamentos financeiros podem ser estressantes com prazos apertados. Como você lida com a pressão nesses períodos de pico?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { area: 'administrativo', texto: 'O que te atraiu para a área financeira? Onde você se vê crescendo profissionalmente dentro desse campo?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },

  // Situacional (4)
  { area: 'administrativo', texto: 'Você encontra uma diferença significativa na conciliação mas não consegue identificar a origem. Como você procede para investigar?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Investigação' },
  { area: 'administrativo', texto: 'É dia de fechamento e o sistema está instável. Como você garante que as informações sejam processadas corretamente?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência' },
  { area: 'administrativo', texto: 'Um colega de outro departamento pede informação financeira confidencial alegando que precisa para seu trabalho. Como você procede?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Acesso' },
  { area: 'administrativo', texto: 'Você percebe que um pagamento foi feito em duplicidade. Quais seriam seus próximos passos para resolver e prevenir?', cargo: 'Analista Financeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Resolução de Problemas' },
];

export const analistaFinanceiroPleno: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'administrativo', texto: 'Análise de variações orçamentárias orienta decisões. Como você investiga diferenças entre realizado e orçado e que tipo de insights busca nessa análise?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise de Variações' },
  { area: 'administrativo', texto: 'Projeções financeiras exigem método e premissas bem fundamentadas. Como você estrutura uma projeção de fluxo de caixa considerando sazonalidade e incertezas?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Projeções' },
  { area: 'administrativo', texto: 'Indicadores financeiros medem a saúde do negócio. Quais KPIs você considera mais relevantes para acompanhar e como você os calcula e interpreta?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'KPIs Financeiros' },
  { area: 'administrativo', texto: 'Gestão de capital de giro impacta diretamente a liquidez. Como você analisa e propõe melhorias no ciclo financeiro da empresa?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Capital de Giro' },
  { area: 'administrativo', texto: 'Modelagem financeira suporta decisões estratégicas. Que tipos de modelos você já desenvolveu e que técnicas utiliza para construí-los de forma robusta?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Modelagem Financeira' },

  // Experiência (4)
  { area: 'administrativo', texto: 'Conte-me sobre um projeto de análise financeira relevante que você conduziu. Qual era o objetivo, que metodologia usou e que impacto teve nas decisões da empresa?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de Análise' },
  { area: 'administrativo', texto: 'Budget e forecast são processos críticos. Me fale sobre sua experiência participando desses processos - qual era seu papel e como contribuía para a precisão das previsões?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Planejamento Financeiro' },
  { area: 'administrativo', texto: 'Melhorar processos financeiros gera eficiência. Conte-me sobre uma melhoria ou automação que você implementou na rotina financeira.', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Otimização de Processos' },
  { area: 'administrativo', texto: 'Auditorias externas exigem documentação impecável. Você já foi responsável por preparar informações para auditores? Como foi essa experiência?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditoria' },

  // Comportamental (4)
  { area: 'administrativo', texto: 'Comunicar informações financeiras para não-financeiros é desafio comum. Como você traduz números complexos em insights que gestores de outras áreas consigam entender?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'administrativo', texto: 'Análises financeiras podem revelar notícias ruins. Como você apresenta resultados negativos para a liderança de forma construtiva?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Transparência' },
  { area: 'administrativo', texto: 'A área financeira frequentemente diz "não" para gastos. Como você equilibra o papel de guardião do orçamento com as necessidades legítimas das áreas?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Negociação' },
  { area: 'administrativo', texto: 'Desenvolvimento de analistas juniores é parte do trabalho pleno. Como você orienta e ensina colegas mais novos na área?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },

  // Situacional (5)
  { area: 'administrativo', texto: 'A empresa está considerando um investimento significativo e pede sua análise de viabilidade. Como você estruturaria esse estudo?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise de Investimentos' },
  { area: 'administrativo', texto: 'O fluxo de caixa para o próximo mês indica dificuldade para cobrir compromissos. Que análises você faria e que opções apresentaria para a liderança?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Caixa' },
  { area: 'administrativo', texto: 'Os custos de um departamento estão consistentemente acima do orçado. Como você investigaria as causas e proporia soluções?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Controle de Custos' },
  { area: 'administrativo', texto: 'A diretoria pede uma revisão de preços considerando margem de contribuição. Como você estruturaria essa análise?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Pricing' },
  { area: 'administrativo', texto: 'Você identificou um erro em relatório que já foi apresentado à diretoria. Como você lida com essa situação?', cargo: 'Analista Financeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Erros' },
];

export const analistaFinanceiroSenior: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'administrativo', texto: 'FP&A estratégico vai além de reportar números. Como você usa análise financeira para influenciar decisões de negócio e criar valor para a empresa?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'FP&A Estratégico' },
  { area: 'administrativo', texto: 'Valuation e M&A exigem técnicas sofisticadas. Que metodologias de avaliação você domina e como as aplicou em transações ou análises estratégicas?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Valuation' },
  { area: 'administrativo', texto: 'Gestão de riscos financeiros protege a empresa de volatilidade. Como você identifica, quantifica e propõe mitigação para riscos de câmbio, juros ou crédito?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Riscos' },
  { area: 'administrativo', texto: 'Business Intelligence financeira transforma dados em insights. Como você estrutura dashboards e análises que suportam tomada de decisão executiva?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'BI Financeiro' },
  { area: 'administrativo', texto: 'Estruturação de capital afeta diretamente o valor da empresa. Como você analisa a estrutura de dívida/equity e propõe otimizações?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Estrutura de Capital' },

  // Experiência (5)
  { area: 'administrativo', texto: 'Conte-me sobre uma transação de M&A ou levantamento de capital que você participou. Qual foi seu papel e como contribuiu para o sucesso da operação?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Transações' },
  { area: 'administrativo', texto: 'Liderar times de FP&A exige habilidades específicas. Me fale sobre sua experiência construindo e desenvolvendo equipes financeiras de alta performance.', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de Equipe' },
  { area: 'administrativo', texto: 'Transformação digital no financeiro muda a forma de trabalhar. Você já liderou projetos de automação ou implementação de sistemas? Conte-me sobre essa experiência.', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Digital' },
  { area: 'administrativo', texto: 'Situações de turnaround exigem análise financeira crítica. Você já atuou em empresas em dificuldade? Que papel o financeiro teve na recuperação?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround' },
  { area: 'administrativo', texto: 'Relacionamento com investidores ou bancos é crítico. Me fale sobre sua experiência em processos de fundraising ou renegociação de dívidas.', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Relações com Investidores' },

  // Comportamental (5)
  { area: 'administrativo', texto: 'O CFO espera que o financeiro sênior seja parceiro estratégico. Como você se posiciona nas discussões de negócio e contribui além dos números?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Parceria Estratégica' },
  { area: 'administrativo', texto: 'Influenciar decisões executivas exige credibilidade construída ao longo do tempo. Como você desenvolveu sua reputação como conselheiro confiável?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência' },
  { area: 'administrativo', texto: 'O financeiro frequentemente traz más notícias. Como você comunica previsões negativas para CEOs e boards de forma que gere ação, não defensividade?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Executiva' },
  { area: 'administrativo', texto: 'Formar futuros líderes financeiros é parte do legado. Como você identifica potencial e desenvolve analistas para assumir posições de liderança?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Talentos' },
  { area: 'administrativo', texto: 'O mercado financeiro evolui com novas tecnologias e práticas. Como você se mantém atualizado e lidera inovação na área?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação' },

  // Situacional (5)
  { area: 'administrativo', texto: 'A empresa está avaliando uma aquisição e você precisa liderar a due diligence financeira. Como você estruturaria esse trabalho?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Due Diligence' },
  { area: 'administrativo', texto: 'O conselho pede uma análise de cenários considerando diferentes projeções macroeconômicas. Como você estruturaria e apresentaria essa análise?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Cenários' },
  { area: 'administrativo', texto: 'A empresa precisa de capital para crescimento. Como você avaliaria as opções - dívida, equity, híbridos - e faria recomendação à liderança?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Estruturação Financeira' },
  { area: 'administrativo', texto: 'O CFO pede redução de 15% nos custos fixos sem afetar operação. Como você coordenaria esse processo com os gestores de área?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Redução de Custos' },
  { area: 'administrativo', texto: 'Uma linha de negócio está consistentemente abaixo da rentabilidade esperada. Que análise você faria para decidir entre investir ou descontinuar?', cargo: 'Analista Financeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Análise de Portfólio' },
];

// ============================================
// RH / RECURSOS HUMANOS
// ============================================

export const rhJunior: PerguntaSeed[] = [
  // Técnica (4)
  { area: 'administrativo', texto: 'Recrutamento e seleção são core do RH. Me conte como você conduz um processo seletivo - desde o alinhamento da vaga até a contratação do candidato aprovado.', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'tecnica', competencia: 'Recrutamento' },
  { area: 'administrativo', texto: 'Integração de novos colaboradores impacta a retenção. Como você estrutura um onboarding para que a pessoa se sinta acolhida e aprenda rapidamente?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'tecnica', competencia: 'Onboarding' },
  { area: 'administrativo', texto: 'Administração de pessoal envolve múltiplos processos. Quais rotinas de DP você conhece - folha, benefícios, férias, admissão/demissão - e qual sua experiência com elas?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'tecnica', competencia: 'Administração de Pessoal' },
  { area: 'administrativo', texto: 'Legislação trabalhista é base do trabalho de RH. Quais aspectos da CLT você considera fundamentais dominar e como você se mantém atualizado sobre mudanças?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'tecnica', competencia: 'Legislação Trabalhista' },

  // Experiência (4)
  { area: 'administrativo', texto: 'Conte-me sobre um processo seletivo que você conduziu do início ao fim. Qual era a vaga, quantos candidatos participaram e como foi a experiência?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'experiencia', competencia: 'Processos Seletivos' },
  { area: 'administrativo', texto: 'Treinamentos são parte importante do desenvolvimento. Você já organizou ou aplicou treinamentos? Me conte sobre essa experiência.', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'experiencia', competencia: 'Treinamento' },
  { area: 'administrativo', texto: 'Sistemas de RH facilitam a gestão de pessoas. Com quais ferramentas você já trabalhou e como foi sua curva de aprendizado?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas de RH' },
  { area: 'administrativo', texto: 'Atender colaboradores é parte da rotina de RH. Conte-me sobre situações onde você ajudou funcionários a resolver dúvidas ou problemas.', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento Interno' },

  // Comportamental (4)
  { area: 'administrativo', texto: 'RH lida com informações sensíveis sobre pessoas. Que cuidados você toma para garantir sigilo sobre salários, avaliações e questões pessoais dos funcionários?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'comportamental', competencia: 'Confidencialidade' },
  { area: 'administrativo', texto: 'O que te motivou a trabalhar com Recursos Humanos? Que aspectos da área você considera mais gratificantes?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'administrativo', texto: 'RH é ponte entre empresa e funcionários. Como você mantém a neutralidade quando surgem conflitos entre gestores e suas equipes?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'comportamental', competencia: 'Imparcialidade' },
  { area: 'administrativo', texto: 'Empatia é fundamental mas não pode virar envolvimento emocional. Como você ajuda pessoas em situações difíceis mantendo o distanciamento profissional necessário?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'comportamental', competencia: 'Equilíbrio Emocional' },

  // Situacional (4)
  { area: 'administrativo', texto: 'Um candidato que parecia perfeito na entrevista foi reprovado pelo gestor. O gestor não explica bem o porquê. Como você conduz para dar feedback ao candidato?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'situacional', competencia: 'Feedback' },
  { area: 'administrativo', texto: 'Um funcionário vem reclamar do seu gestor de forma muito emocional. Como você acolhe, investiga e encaminha a situação adequadamente?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'situacional', competencia: 'Mediação' },
  { area: 'administrativo', texto: 'Você percebe um erro no cálculo de férias de um colaborador que favorece a empresa. O erro não foi notado por ele. O que você faz?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'situacional', competencia: 'Ética' },
  { area: 'administrativo', texto: 'O gestor quer contratar urgente e está pressionando para pular etapas do processo seletivo. Como você equilibra urgência com qualidade?', cargo: 'RH / Recursos Humanos', nivel: 'junior', categoria: 'situacional', competencia: 'Pressão' },
];

export const rhPleno: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'administrativo', texto: 'Business Partner de RH apoia gestores em decisões de pessoas. Como você atua como parceiro estratégico das áreas - que tipo de suporte oferece e como gera valor?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Business Partner' },
  { area: 'administrativo', texto: 'Avaliação de desempenho é processo crítico. Como você estrutura um ciclo de avaliação que seja justo, gere desenvolvimento e não vire burocracia?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Desempenho' },
  { area: 'administrativo', texto: 'Clima organizacional impacta diretamente os resultados. Como você mede, analisa e propõe ações para melhorar o clima da empresa?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Clima Organizacional' },
  { area: 'administrativo', texto: 'Remuneração e benefícios precisam ser competitivos. Como você estrutura pesquisas salariais e propõe ajustes para manter a empresa atrativa?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Remuneração' },
  { area: 'administrativo', texto: 'Desenvolvimento de lideranças é investimento estratégico. Que programas e ações você já implementou para desenvolver gestores?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'tecnica', competencia: 'Desenvolvimento de Lideranças' },

  // Experiência (4)
  { area: 'administrativo', texto: 'Conte-me sobre um projeto de RH relevante que você liderou. Qual era o objetivo, como foi a execução e que resultados alcançou?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de RH' },
  { area: 'administrativo', texto: 'Desligamentos são momentos delicados. Você já conduziu demissões? Conte-me como você prepara e conduz essas conversas difíceis.', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desligamentos' },
  { area: 'administrativo', texto: 'Conflitos trabalhistas podem escalar rapidamente. Você já mediou situações de conflito que poderiam virar ação judicial? Como conduziu?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Conflitos' },
  { area: 'administrativo', texto: 'Employer branding impacta a atração de talentos. Conte-me sobre iniciativas que você desenvolveu para fortalecer a marca empregadora.', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'experiencia', competencia: 'Employer Branding' },

  // Comportamental (4)
  { area: 'administrativo', texto: 'RH frequentemente recebe demandas contraditórias de funcionários e empresa. Como você navega esses dilemas mantendo sua integridade?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Integridade' },
  { area: 'administrativo', texto: 'Influenciar gestores sem autoridade hierárquica é desafio do RH. Como você constrói credibilidade para ter suas recomendações aceitas?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Influência' },
  { area: 'administrativo', texto: 'A área de RH está em transformação com novas tecnologias e práticas. Como você se mantém atualizado e traz inovação para seu trabalho?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização' },
  { area: 'administrativo', texto: 'Desenvolver analistas e assistentes de RH é parte do seu papel. Como você orienta e capacita sua equipe?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },

  // Situacional (5)
  { area: 'administrativo', texto: 'Um gestor quer demitir um funcionário que você acredita ter potencial. Como você aborda a situação - apoia a decisão ou tenta reverter?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Aconselhamento' },
  { area: 'administrativo', texto: 'A pesquisa de clima revelou insatisfação alta em um departamento. O gestor diz que está tudo bem. Como você investiga e atua?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Diagnóstico' },
  { area: 'administrativo', texto: 'Chegou uma denúncia anônima de assédio moral contra um executivo sênior. Como você conduz a investigação?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Investigação de Denúncias' },
  { area: 'administrativo', texto: 'A empresa precisa reduzir custos e pede sugestões de corte na área de pessoas. Que análise você faria antes de propor alternativas?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Redução de Custos' },
  { area: 'administrativo', texto: 'Dois candidatos finalistas têm perfis muito diferentes - um mais técnico, outro mais relacional. O gestor está indeciso. Como você ajuda na decisão?', cargo: 'RH / Recursos Humanos', nivel: 'pleno', categoria: 'situacional', competencia: 'Consultoria em Seleção' },
];

export const rhSenior: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'administrativo', texto: 'Estratégia de pessoas deve estar alinhada com estratégia de negócio. Como você traduz objetivos organizacionais em iniciativas de RH que geram resultados?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de RH' },
  { area: 'administrativo', texto: 'Transformação cultural é um dos maiores desafios de RH. Como você diagnostica, planeja e conduz mudanças culturais em organizações?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'tecnica', competencia: 'Transformação Cultural' },
  { area: 'administrativo', texto: 'People Analytics está transformando as decisões de RH. Como você utiliza dados para gerar insights sobre pessoas e influenciar decisões estratégicas?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'tecnica', competencia: 'People Analytics' },
  { area: 'administrativo', texto: 'Sucessão de posições-chave mitiga riscos para o negócio. Como você estrutura programas de identificação e desenvolvimento de sucessores?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Sucessório' },
  { area: 'administrativo', texto: 'Employee Experience ganhou relevância como diferencial competitivo. Como você estrutura a experiência do colaborador desde a atração até o desligamento?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'tecnica', competencia: 'Employee Experience' },

  // Experiência (5)
  { area: 'administrativo', texto: 'Conte-me sobre uma transformação de RH significativa que você liderou. Qual era o contexto, que mudanças implementou e como mediu o sucesso?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação de RH' },
  { area: 'administrativo', texto: 'Construir e liderar equipes de RH de alto desempenho é fundamental. Me fale sobre sua experiência desenvolvendo talentos e criando cultura na área.', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de RH' },
  { area: 'administrativo', texto: 'Fusões e aquisições impactam profundamente as pessoas. Você já atuou na integração de culturas pós-M&A? Conte-me sobre os desafios e aprendizados.', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'experiencia', competencia: 'M&A - Integração' },
  { area: 'administrativo', texto: 'Reestruturações organizacionais são momentos críticos. Conte-me sobre um processo de reestruturação que você liderou ou apoiou significativamente.', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'experiencia', competencia: 'Reestruturação' },
  { area: 'administrativo', texto: 'Negociação sindical exige preparo e estratégia. Conte-me sobre uma negociação coletiva relevante que você participou. Como foi a condução?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'experiencia', competencia: 'Relações Sindicais' },

  // Comportamental (5)
  { area: 'administrativo', texto: 'CHRO ou Head de RH é conselheiro do CEO em temas de pessoas. Como você constrói esse relacionamento de confiança com a liderança máxima?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento Executivo' },
  { area: 'administrativo', texto: 'RH frequentemente precisa dar notícias impopulares ou fazer escolhas difíceis. Como você mantém a coragem de ser autêntico mesmo sob pressão?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'comportamental', competencia: 'Coragem' },
  { area: 'administrativo', texto: 'A área de RH está sendo desafiada a demonstrar valor de forma mais tangível. Como você conecta iniciativas de pessoas com resultados de negócio?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'comportamental', competencia: 'Orientação para Resultados' },
  { area: 'administrativo', texto: 'Formar a próxima geração de líderes de RH é seu legado. Como você identifica potencial e desenvolve futuros executivos da área?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Líderes' },
  { area: 'administrativo', texto: 'O futuro do trabalho está em transformação acelerada. Como você está preparando sua organização e sua área para essas mudanças?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Futuro' },

  // Situacional (5)
  { area: 'administrativo', texto: 'O CEO quer implementar uma mudança que você acredita ser prejudicial para a cultura. Como você expressa sua discordância de forma construtiva?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'situacional', competencia: 'Influência Executiva' },
  { area: 'administrativo', texto: 'A empresa precisa demitir 20% do quadro por questões financeiras. Como você planejaria e executaria esse processo preservando quem fica?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'situacional', competencia: 'Downsizing' },
  { area: 'administrativo', texto: 'Há uma crise de assédio que chegou à mídia. Como você coordena a resposta imediata e as ações de médio prazo para reconstruir a confiança?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'administrativo', texto: 'O board quer diversidade mas os gestores resistem a mudar forma de contratar. Como você conduz essa transformação?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'situacional', competencia: 'Diversidade e Inclusão' },
  { area: 'administrativo', texto: 'Um executivo de alto desempenho mas comportamento tóxico está afetando toda uma área. Como você aborda essa situação com o CEO?', cargo: 'RH / Recursos Humanos', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de High Performers Difíceis' },
];

// ============================================
// GERENTE DE PROJETOS
// ============================================

export const gerenteProjetosJunior: PerguntaSeed[] = [
  // Técnica (4)
  { area: 'tecnologia', texto: 'Planejamento de projeto é a base para execução bem-sucedida. Me explique como você estrutura um plano de projeto - que elementos considera essenciais e como você os documenta?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Planejamento' },
  { area: 'tecnologia', texto: 'Cronograma realista evita frustrações futuras. Como você estima durações de atividades? Que técnicas usa para não ser muito otimista nem pessimista demais?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Cronograma' },
  { area: 'tecnologia', texto: 'Gestão de riscos previne surpresas. Como você identifica e documenta riscos em um projeto? Que informações captura para cada risco identificado?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Riscos' },
  { area: 'tecnologia', texto: 'Status reports mantêm stakeholders informados. Que informações você considera essenciais em um report de projeto e com que frequência os produz?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'tecnica', competencia: 'Comunicação de Status' },

  // Experiência (4)
  { area: 'tecnologia', texto: 'Conte-me sobre um projeto que você gerenciou ou participou significativamente. Qual era o escopo, tamanho da equipe e como foi sua contribuição?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência em Projetos' },
  { area: 'tecnologia', texto: 'Ferramentas de gestão de projetos são essenciais. Com quais ferramentas você já trabalhou - MS Project, Jira, Trello, outros - e como as utilizou?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Ferramentas' },
  { area: 'tecnologia', texto: 'Projetos raramente seguem exatamente o plano. Conte-me sobre uma situação onde você precisou adaptar o projeto a uma mudança ou problema inesperado.', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptação' },
  { area: 'tecnologia', texto: 'Metodologias de projeto estruturam o trabalho. Você tem experiência com metodologias específicas - PMBOK, Scrum, Prince2? Me conte como as aplicou.', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'experiencia', competencia: 'Metodologias' },

  // Comportamental (4)
  { area: 'tecnologia', texto: 'Gerenciar projetos exige equilibrar muitas variáveis simultaneamente. Como você se organiza para não perder de vista os diversos aspectos de um projeto?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'tecnologia', texto: 'O que te atraiu para a carreira de gestão de projetos? Que aspectos da profissão você considera mais interessantes e desafiadores?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'tecnologia', texto: 'Projetos frequentemente atrasam ou estouram orçamento. Como você lida com a pressão quando as coisas não saem como planejado?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { area: 'tecnologia', texto: 'Gerente de projetos trabalha com pessoas de diversas áreas e perfis. Como você constrói relacionamentos produtivos com diferentes stakeholders?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'comportamental', competencia: 'Relacionamento' },

  // Situacional (4)
  { area: 'tecnologia', texto: 'O sponsor do projeto pede para adicionar escopo significativo sem alterar prazo ou orçamento. Como você conduziria essa conversa?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Escopo' },
  { area: 'tecnologia', texto: 'Um membro-chave da equipe avisa que vai sair no meio do projeto. Como você gerencia essa situação minimizando impactos?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'tecnologia', texto: 'Você identifica que o projeto não vai cumprir o prazo prometido. Quando e como você comunicaria isso aos stakeholders?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação de Problemas' },
  { area: 'tecnologia', texto: 'Dois departamentos envolvidos no projeto estão em conflito sobre prioridades. Como você mediaria para destravar o impasse?', cargo: 'Gerente de Projetos de TI', nivel: 'junior', categoria: 'situacional', competencia: 'Mediação' },
];

export const gerenteProjetosPleno: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'tecnologia', texto: 'Gestão de portfólio vai além de projetos individuais. Como você prioriza projetos competindo pelos mesmos recursos? Que critérios e técnicas utiliza?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Portfólio' },
  { area: 'tecnologia', texto: 'EVM (Earned Value Management) mede performance objetivamente. Como você utiliza indicadores como CPI e SPI para tomar decisões de projeto?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Earned Value' },
  { area: 'tecnologia', texto: 'Ágil e cascata têm suas forças. Como você avalia qual abordagem usar em diferentes contextos? Você já trabalhou com metodologias híbridas?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Metodologias Híbridas' },
  { area: 'tecnologia', texto: 'Gestão de fornecedores em projetos exige controle rigoroso. Como você gerencia contratos, SLAs e performance de terceiros em seus projetos?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Fornecedores' },
  { area: 'tecnologia', texto: 'Análise quantitativa de riscos traz mais precisão. Que técnicas você conhece - simulação Monte Carlo, árvores de decisão - e como as aplicou?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise Quantitativa de Riscos' },

  // Experiência (4)
  { area: 'tecnologia', texto: 'Conte-me sobre o projeto mais complexo que você gerenciou. Qual era o escopo, orçamento e principais desafios que você superou?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos Complexos' },
  { area: 'tecnologia', texto: 'Recuperar projetos em dificuldades é habilidade valiosa. Você já assumiu um projeto problemático? Conte-me o que encontrou e como atuou.', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Recovery de Projetos' },
  { area: 'tecnologia', texto: 'PMO pode atuar de formas diferentes. Você tem experiência trabalhando com ou estruturando PMO? Como foi essa vivência?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'PMO' },
  { area: 'tecnologia', texto: 'Projetos de implementação de sistemas têm peculiaridades. Conte-me sobre sua experiência com projetos de TI ou transformação digital.', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de TI' },

  // Comportamental (4)
  { area: 'tecnologia', texto: 'Liderar sem autoridade hierárquica é desafio constante para GPs. Como você motiva equipes funcionais que não reportam diretamente a você?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança Lateral' },
  { area: 'tecnologia', texto: 'Stakeholders têm interesses frequentemente conflitantes. Como você navega essas dinâmicas políticas mantendo o projeto no rumo?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Stakeholders' },
  { area: 'tecnologia', texto: 'GPs plenos desenvolvem outros gerentes de projeto. Como você compartilha conhecimento e apoia colegas menos experientes?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'tecnologia', texto: 'Balancear múltiplos projetos simultâneos exige disciplina. Como você se organiza para dar atenção adequada a cada projeto sob sua responsabilidade?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Múltiplos Projetos' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'O projeto está atrasado e o cliente ameaça multas contratuais. Que ações você tomaria para minimizar o impacto e preservar o relacionamento?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'tecnologia', texto: 'Você assume um projeto no meio do ciclo e descobre que a documentação está incompleta. Como você se contextualiza e estrutura a continuidade?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Transição de Projetos' },
  { area: 'tecnologia', texto: 'A tecnologia escolhida para o projeto não está performando como esperado. Como você avalia se deve persistir ou pivotar?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Decisão Técnica' },
  { area: 'tecnologia', texto: 'O patrocinador executivo do projeto mudou e o novo tem prioridades diferentes. Como você gerencia essa transição de sponsorship?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Sponsorship' },
  { area: 'tecnologia', texto: 'A equipe está exausta depois de meses de esforço intenso e ainda faltam entregas críticas. Como você mantém a motivação e performance?', cargo: 'Gerente de Projetos de TI', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Equipe sob Pressão' },
];

export const gerenteProjetosSenior: PerguntaSeed[] = [
  // Técnica (5)
  { area: 'tecnologia', texto: 'Programas integram múltiplos projetos com objetivos comuns. Como você estrutura a governança e gestão de benefícios em nível de programa?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Programas' },
  { area: 'tecnologia', texto: 'Transformações organizacionais são projetos de alto impacto. Como você estrutura e conduz iniciativas de mudança em larga escala?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Transformação Organizacional' },
  { area: 'tecnologia', texto: 'Governança de projetos estabelece controles e decisões. Como você estrutura comitês, gates e processos de decisão para projetos estratégicos?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Governança' },
  { area: 'tecnologia', texto: 'Métricas de maturidade em gestão de projetos orientam evolução. Como você avalia e desenvolve a capacidade de gestão de projetos de uma organização?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Maturidade em GP' },
  { area: 'tecnologia', texto: 'OKRs e estratégia empresarial devem conectar-se aos projetos. Como você garante alinhamento entre iniciativas e objetivos estratégicos da empresa?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'tecnica', competencia: 'Alinhamento Estratégico' },

  // Experiência (5)
  { area: 'tecnologia', texto: 'Conte-me sobre uma transformação de grande porte que você liderou. Qual era o escopo, como estruturou a abordagem e que resultados alcançou?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Grandes Transformações' },
  { area: 'tecnologia', texto: 'Construir PMOs ou estruturas de gestão de projetos cria capacidade organizacional. Conte-me sobre sua experiência estruturando ou evoluindo PMOs.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Construção de PMO' },
  { area: 'tecnologia', texto: 'Liderar equipes de gerentes de projeto exige habilidades diferenciadas. Me fale sobre sua experiência desenvolvendo e gerenciando times de GPs.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Liderança de GPs' },
  { area: 'tecnologia', texto: 'Projetos internacionais adicionam complexidade cultural e de fuso. Conte-me sobre projetos globais que você liderou e os desafios específicos.', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos Internacionais' },
  { area: 'tecnologia', texto: 'Due diligence de projetos em M&A identifica riscos de execução. Você já avaliou a capacidade de execução de projetos em processos de aquisição?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'experiencia', competencia: 'Due Diligence de Projetos' },

  // Comportamental (5)
  { area: 'tecnologia', texto: 'Influenciar executivos sobre priorização de projetos é crítico. Como você constrói credibilidade para ter suas recomendações estratégicas aceitas?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Executiva' },
  { area: 'tecnologia', texto: 'Projetos de grande porte envolvem decisões de alto risco. Como você equilibra análise cuidadosa com velocidade de decisão?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'tecnologia', texto: 'Formar futuros líderes de projetos é seu legado. Como você identifica potencial e desenvolve gerentes de programa para posições de liderança?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Líderes' },
  { area: 'tecnologia', texto: 'A disciplina de gestão de projetos evolui constantemente. Como você se mantém atualizado e traz inovação para a forma de gerenciar projetos?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação em GP' },
  { area: 'tecnologia', texto: 'Manter resiliência em projetos de anos de duração é desafio pessoal. Como você cuida da sua energia e motivação ao longo de jornadas extensas?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliência' },

  // Situacional (5)
  { area: 'tecnologia', texto: 'O board quer acelerar um projeto estratégico cortando 40% do tempo. Como você avalia o que é possível e negocia escopo e recursos adequados?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação com Board' },
  { area: 'tecnologia', texto: 'Um programa crítico está falhando e você é chamado para fazer o turnaround. Como você estruturaria os primeiros 30 dias?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Turnaround de Programas' },
  { area: 'tecnologia', texto: 'A empresa quer implementar nova metodologia de projetos. Como você planejaria e executaria essa mudança minimizando resistência?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Implantação de Metodologia' },
  { area: 'tecnologia', texto: 'Há conflito entre dois executivos sobre prioridades de recursos para projetos de suas áreas. Como você mediaria essa disputa?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Mediação Executiva' },
  { area: 'tecnologia', texto: 'O CFO questiona o ROI do PMO e sugere reduzi-lo. Como você demonstra valor e defende a estrutura de gestão de projetos?', cargo: 'Gerente de Projetos de TI', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de PMO' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasAdministrativo: PerguntaSeed[] = [
  ...administrativoJunior,
  ...administrativoPleno,
  ...analistaFinanceiroJunior,
  ...analistaFinanceiroPleno,
  ...analistaFinanceiroSenior,
  ...rhJunior,
  ...rhPleno,
  ...rhSenior,
  ...gerenteProjetosJunior,
  ...gerenteProjetosPleno,
  ...gerenteProjetosSenior,
];

export const estatisticasAdministrativo = {
  total: perguntasAdministrativo.length,
  porCargo: {
    'Administrativo Junior': administrativoJunior.length,
    'Administrativo Pleno': administrativoPleno.length,
    'Analista Financeiro Junior': analistaFinanceiroJunior.length,
    'Analista Financeiro Pleno': analistaFinanceiroPleno.length,
    'Analista Financeiro Senior': analistaFinanceiroSenior.length,
    'RH Junior': rhJunior.length,
    'RH Pleno': rhPleno.length,
    'RH Senior': rhSenior.length,
    'Gerente de Projetos Junior': gerenteProjetosJunior.length,
    'Gerente de Projetos Pleno': gerenteProjetosPleno.length,
    'Gerente de Projetos Senior': gerenteProjetosSenior.length,
  },
};
