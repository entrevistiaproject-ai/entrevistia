/**
 * Banco de Perguntas v4 - Call Center / Telemarketing
 *
 * Cargos incluídos:
 * - Operador de Telemarketing (Junior, Pleno)
 * - Supervisor de Call Center (Pleno, Senior)
 * - Analista de Qualidade (Junior, Pleno, Senior)
 * - Coordenador de Operações (Senior)
 *
 * Total: ~198 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// OPERADOR DE TELEMARKETING
// ============================================

export const operadorTelemarketingJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'callcenter', texto: 'Quais são os elementos essenciais de uma abertura de ligação eficaz em telemarketing?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Abordagem' },
  { area: 'callcenter', texto: 'Como você registra as informações de um atendimento no sistema CRM durante a ligação?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas de CRM' },
  { area: 'callcenter', texto: 'Quais técnicas você utiliza para manter o cliente engajado durante uma ligação de vendas?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Engajamento do Cliente' },
  { area: 'callcenter', texto: 'Como você identifica o momento correto para apresentar uma oferta ao cliente?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Timing de Vendas' },
  { area: 'callcenter', texto: 'Quais informações você considera essenciais coletar do cliente durante um primeiro contato?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Coleta de Dados' },
  { area: 'callcenter', texto: 'Como você adapta o script de atendimento para diferentes perfis de clientes?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'tecnica', competencia: 'Adaptação de Script' },

  // Experiência (5)
  { area: 'callcenter', texto: 'Conte sobre sua experiência anterior com atendimento telefônico ou presencial ao cliente.', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },
  { area: 'callcenter', texto: 'Descreva uma situação em que conseguiu reverter uma objeção inicial de um cliente.', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Contorno de Objeções' },
  { area: 'callcenter', texto: 'Qual foi a venda mais desafiadora que você realizou e como conseguiu fechar?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Fechamento de Vendas' },
  { area: 'callcenter', texto: 'Como foi sua adaptação ao trabalho com metas diárias de ligações ou vendas?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho com Metas' },
  { area: 'callcenter', texto: 'Descreva um momento em que precisou aprender rapidamente sobre um novo produto para oferecê-lo.', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Rápido' },

  // Comportamental (5)
  { area: 'callcenter', texto: 'Como você mantém a motivação após receber várias negativas consecutivas?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'callcenter', texto: 'De que forma você lida com a pressão de bater metas em um ambiente competitivo?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { area: 'callcenter', texto: 'Como você reage quando um cliente é grosseiro ou desrespeitoso durante uma ligação?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Controle Emocional' },
  { area: 'callcenter', texto: 'Descreva como você organiza suas tarefas para garantir produtividade ao longo do dia.', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'callcenter', texto: 'Como você busca melhorar continuamente suas técnicas de atendimento e vendas?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'comportamental', competencia: 'Autodesenvolvimento' },

  // Situacional (5)
  { area: 'callcenter', texto: 'Um cliente diz que não tem interesse no produto logo no início da ligação. Como você conduz a conversa?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'situacional', competencia: 'Contorno de Objeções' },
  { area: 'callcenter', texto: 'O sistema cai durante uma ligação importante. O que você faz?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'situacional', competencia: 'Resolução de Problemas' },
  { area: 'callcenter', texto: 'Um cliente solicita um desconto que você não está autorizado a conceder. Como procede?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'situacional', competencia: 'Negociação' },
  { area: 'callcenter', texto: 'Você percebe que está longe de atingir sua meta diária no fim do expediente. O que faz?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Metas' },
  { area: 'callcenter', texto: 'Um cliente questiona informações que você deu e parece desconfiado. Como você recupera a confiança?', cargo: 'Operador de Telemarketing', nivel: 'junior', categoria: 'situacional', competencia: 'Credibilidade' },
];

export const operadorTelemarketingPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'callcenter', texto: 'Quais métricas de desempenho você considera mais importantes para um operador de telemarketing?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Performance' },
  { area: 'callcenter', texto: 'Como você estrutura uma argumentação de vendas para diferentes tipos de objeções?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Argumentação de Vendas' },
  { area: 'callcenter', texto: 'Quais técnicas de upselling e cross-selling você aplica nas suas abordagens?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Vendas Adicionais' },
  { area: 'callcenter', texto: 'Como você utiliza o histórico do cliente no CRM para personalizar o atendimento?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Personalização' },
  { area: 'callcenter', texto: 'Quais são suas estratégias para retomar contato com clientes que não fecharam em ligações anteriores?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Follow-up' },
  { area: 'callcenter', texto: 'Como você identifica e aproveita gatilhos de compra durante a conversa com o cliente?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'tecnica', competencia: 'Identificação de Oportunidades' },

  // Experiência (6)
  { area: 'callcenter', texto: 'Conte sobre uma campanha de vendas da qual você participou e quais foram seus resultados.', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Campanhas de Vendas' },
  { area: 'callcenter', texto: 'Descreva como você ajudou colegas mais novos a melhorar seu desempenho em vendas.', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Mentoria Informal' },
  { area: 'callcenter', texto: 'Qual foi seu melhor resultado de vendas e quais estratégias você usou para alcançá-lo?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Alta Performance' },
  { area: 'callcenter', texto: 'Como você lidou com uma mudança significativa em produto ou processo na operação?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Adaptação a Mudanças' },
  { area: 'callcenter', texto: 'Descreva uma situação em que você identificou uma oportunidade de melhoria no processo de atendimento.', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'callcenter', texto: 'Conte sobre uma negociação complexa que você conduziu até o fechamento.', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação Avançada' },

  // Comportamental (6)
  { area: 'callcenter', texto: 'Como você equilibra quantidade de ligações com qualidade de atendimento?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Produtividade' },
  { area: 'callcenter', texto: 'De que forma você contribui para manter um ambiente positivo na equipe?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'callcenter', texto: 'Como você lida com feedback negativo da monitoria de qualidade?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Receptividade a Feedback' },
  { area: 'callcenter', texto: 'Descreva como você mantém consistência de resultados ao longo dos meses.', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Consistência' },
  { area: 'callcenter', texto: 'Como você se prepara mentalmente para dias de alta demanda ou campanhas intensas?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Preparação Mental' },
  { area: 'callcenter', texto: 'De que forma você busca se diferenciar dos demais operadores em sua equipe?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'comportamental', competencia: 'Diferenciação' },

  // Situacional (6)
  { area: 'callcenter', texto: 'Um cliente VIP está insatisfeito com um atendimento anterior. Como você conduz essa ligação?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Clientes VIP' },
  { area: 'callcenter', texto: 'Você percebe que um colega está passando informações incorretas aos clientes. O que faz?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'callcenter', texto: 'O supervisor pede que você assuma uma campanha de produto que você não domina bem. Como procede?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptabilidade' },
  { area: 'callcenter', texto: 'Um cliente quer cancelar o serviço mas você tem uma oferta de retenção. Como aborda?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Retenção de Clientes' },
  { area: 'callcenter', texto: 'Você identificou uma prática que poderia melhorar os resultados da equipe. Como apresenta essa ideia?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Proatividade' },
  { area: 'callcenter', texto: 'O cliente pede para falar com o supervisor no meio de uma negociação. Como você procede?', cargo: 'Operador de Telemarketing', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Escalações' },
];

// ============================================
// SUPERVISOR DE CALL CENTER
// ============================================

export const supervisorCallCenterPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'callcenter', texto: 'Quais indicadores você utiliza para avaliar o desempenho individual de cada operador?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Indicadores' },
  { area: 'callcenter', texto: 'Como você estrutura o feedback individual para operadores com baixo desempenho?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'tecnica', competencia: 'Feedback Construtivo' },
  { area: 'callcenter', texto: 'Quais ferramentas e relatórios você utiliza para monitorar a operação em tempo real?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'tecnica', competencia: 'Monitoramento de Operação' },
  { area: 'callcenter', texto: 'Como você organiza a escala da equipe para garantir cobertura adequada nos horários de pico?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Escalas' },
  { area: 'callcenter', texto: 'Quais técnicas você aplica para conduzir reuniões de resultado com a equipe?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'tecnica', competencia: 'Condução de Reuniões' },
  { area: 'callcenter', texto: 'Como você identifica necessidades de treinamento na sua equipe?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'tecnica', competencia: 'Diagnóstico de Treinamento' },

  // Experiência (6)
  { area: 'callcenter', texto: 'Conte sobre uma situação em que precisou reverter os resultados de uma equipe com baixo desempenho.', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'experiencia', competencia: 'Recuperação de Resultados' },
  { area: 'callcenter', texto: 'Descreva como você conduziu o desenvolvimento de um operador até ele se tornar destaque da equipe.', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desenvolvimento de Pessoas' },
  { area: 'callcenter', texto: 'Como foi sua transição de operador para supervisor? Quais foram os principais desafios?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'experiencia', competencia: 'Transição de Carreira' },
  { area: 'callcenter', texto: 'Descreva uma campanha que você liderou e quais estratégias usou para motivar a equipe.', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'experiencia', competencia: 'Liderança de Campanhas' },
  { area: 'callcenter', texto: 'Conte sobre uma situação de conflito entre membros da equipe e como você mediou.', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'experiencia', competencia: 'Mediação de Conflitos' },
  { area: 'callcenter', texto: 'Qual foi o maior desafio operacional que você enfrentou e como resolveu?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },

  // Comportamental (6)
  { area: 'callcenter', texto: 'Como você mantém a equipe motivada em períodos de metas desafiadoras?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação de Equipe' },
  { area: 'callcenter', texto: 'De que forma você equilibra a pressão por resultados com o bem-estar da equipe?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Gestão-Resultado' },
  { area: 'callcenter', texto: 'Como você lida com operadores que resistem a mudanças em processos ou produtos?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Mudanças' },
  { area: 'callcenter', texto: 'Descreva como você desenvolve liderança situacional com diferentes perfis de operadores.', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança Situacional' },
  { area: 'callcenter', texto: 'Como você reage quando sua equipe não atinge as metas estabelecidas?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Frustração' },
  { area: 'callcenter', texto: 'De que forma você busca seu próprio desenvolvimento como líder?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'comportamental', competencia: 'Autodesenvolvimento' },

  // Situacional (6)
  { area: 'callcenter', texto: 'Um operador veterano está desmotivado e influenciando negativamente os mais novos. O que você faz?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Clima' },
  { area: 'callcenter', texto: 'Metade da equipe faltou em um dia de alta demanda. Como você gerencia a situação?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'callcenter', texto: 'Um cliente fez uma reclamação grave sobre um operador da sua equipe. Como você conduz?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Reclamações' },
  { area: 'callcenter', texto: 'A coordenação solicita aumento de meta sem aumento de equipe. Como você apresenta isso ao time?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação de Metas' },
  { area: 'callcenter', texto: 'Dois operadores disputam uma comissão e não chegam a um acordo. Como você resolve?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolução de Disputas' },
  { area: 'callcenter', texto: 'Você precisa aplicar uma advertência a um operador que é seu amigo pessoal. Como procede?', cargo: 'Supervisor de Call Center', nivel: 'pleno', categoria: 'situacional', competencia: 'Separação Pessoal-Profissional' },
];

export const supervisorCallCenterSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'callcenter', texto: 'Como você estrutura um plano de ação para atingir metas de trimestre na operação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Estratégico' },
  { area: 'callcenter', texto: 'Quais metodologias você utiliza para análise de causa raiz de problemas recorrentes na operação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise de Causa Raiz' },
  { area: 'callcenter', texto: 'Como você dimensiona a necessidade de headcount para diferentes volumes de operação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'tecnica', competencia: 'Dimensionamento de Equipe' },
  { area: 'callcenter', texto: 'Quais estratégias você implementa para reduzir o turnover na equipe de operadores?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'tecnica', competencia: 'Retenção de Talentos' },
  { area: 'callcenter', texto: 'Como você estrutura um programa de desenvolvimento de novos líderes na operação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'tecnica', competencia: 'Formação de Líderes' },
  { area: 'callcenter', texto: 'Quais indicadores você apresenta em reuniões gerenciais para demonstrar a performance da operação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'tecnica', competencia: 'Reporting Gerencial' },
  { area: 'callcenter', texto: 'Como você implementa melhorias de processo que impactam múltiplas equipes?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Processos' },

  // Experiência (7)
  { area: 'callcenter', texto: 'Conte sobre uma reestruturação de equipe que você liderou e quais foram os resultados.', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'experiencia', competencia: 'Reestruturação de Equipes' },
  { area: 'callcenter', texto: 'Descreva como você implementou um novo processo que melhorou significativamente os resultados.', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Processos' },
  { area: 'callcenter', texto: 'Como você conduziu uma situação de crise operacional grave na operação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },
  { area: 'callcenter', texto: 'Descreva o desenvolvimento de um supervisor que você treinou desde operador.', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'experiencia', competencia: 'Mentoria de Líderes' },
  { area: 'callcenter', texto: 'Conte sobre uma negociação que você conduziu com stakeholders internos para obter recursos para sua equipe.', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'experiencia', competencia: 'Negociação Interna' },
  { area: 'callcenter', texto: 'Como foi sua experiência liderando múltiplas equipes ou operações simultâneas?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão Multi-equipes' },
  { area: 'callcenter', texto: 'Descreva como você lidou com um cenário de redução de custos mantendo a qualidade.', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'experiencia', competencia: 'Eficiência Operacional' },

  // Comportamental (7)
  { area: 'callcenter', texto: 'Como você desenvolve uma cultura de alta performance em equipes de call center?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Performance' },
  { area: 'callcenter', texto: 'De que forma você lida com decisões impopulares que precisa comunicar à equipe?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação Difícil' },
  { area: 'callcenter', texto: 'Como você equilibra demandas conflitantes de diferentes stakeholders?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Stakeholders' },
  { area: 'callcenter', texto: 'Descreva como você lidera pelo exemplo no ambiente de call center.', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança pelo Exemplo' },
  { area: 'callcenter', texto: 'Como você mantém sua equipe engajada durante períodos de incerteza organizacional?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Incerteza' },
  { area: 'callcenter', texto: 'De que forma você promove inovação e novas ideias na operação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'comportamental', competencia: 'Promoção de Inovação' },
  { area: 'callcenter', texto: 'Como você constrói relacionamentos de confiança com seus subordinados e superiores?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'comportamental', competencia: 'Construção de Confiança' },

  // Situacional (7)
  { area: 'callcenter', texto: 'A operação apresenta resultados abaixo da meta há 3 meses consecutivos. Qual seu plano de ação?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'situacional', competencia: 'Plano de Recuperação' },
  { area: 'callcenter', texto: 'Um novo sistema será implementado e você tem apenas 2 semanas para treinar toda a equipe. Como organiza?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Implementação' },
  { area: 'callcenter', texto: 'A diretoria questiona os custos da sua operação. Como você defende seu orçamento?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Orçamento' },
  { area: 'callcenter', texto: 'Um supervisor da sua equipe está apresentando comportamento inadequado. Como você conduz?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Comportamento' },
  { area: 'callcenter', texto: 'Você identifica que uma prática comum na operação não está em conformidade. O que faz?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'situacional', competencia: 'Compliance' },
  { area: 'callcenter', texto: 'Um cliente corporativo importante ameaça cancelar o contrato por problemas no atendimento. Como procede?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Clientes Críticos' },
  { area: 'callcenter', texto: 'A empresa decide terceirizar parte da operação. Como você gerencia essa transição com sua equipe?', cargo: 'Supervisor de Call Center', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Transição' },
];

// ============================================
// ANALISTA DE QUALIDADE DE ATENDIMENTO
// ============================================

export const analistaQualidadeJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'callcenter', texto: 'Quais critérios você considera essenciais ao avaliar uma ligação de atendimento?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Critérios de Avaliação' },
  { area: 'callcenter', texto: 'Como você documenta as não conformidades encontradas nas monitorias?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },
  { area: 'callcenter', texto: 'Quais ferramentas de monitoria você já utilizou e quais são suas funcionalidades principais?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Ferramentas de Monitoria' },
  { area: 'callcenter', texto: 'Como você calcula e interpreta indicadores de qualidade como FCR e NPS?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Indicadores de Qualidade' },
  { area: 'callcenter', texto: 'Quais elementos você observa para avaliar a qualidade da comunicação verbal em uma ligação?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Comunicação Verbal' },
  { area: 'callcenter', texto: 'Como você estrutura um relatório básico de resultados de monitoria?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Elaboração de Relatórios' },

  // Experiência (5)
  { area: 'callcenter', texto: 'Conte sobre sua experiência anterior com avaliação de qualidade ou monitoria de atendimentos.', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Monitoria de Atendimentos' },
  { area: 'callcenter', texto: 'Descreva uma situação em que seu feedback ajudou um operador a melhorar seu desempenho.', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback Efetivo' },
  { area: 'callcenter', texto: 'Como foi sua adaptação às particularidades de avaliação de qualidade em call center?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptação ao Ambiente' },
  { area: 'callcenter', texto: 'Descreva um caso em que você identificou um padrão de erro recorrente nas avaliações.', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Identificação de Padrões' },
  { area: 'callcenter', texto: 'Como você lidou com a primeira vez que precisou dar um feedback negativo a um operador?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback Construtivo' },

  // Comportamental (5)
  { area: 'callcenter', texto: 'Como você mantém a imparcialidade ao avaliar operadores com quem tem proximidade?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Imparcialidade' },
  { area: 'callcenter', texto: 'De que forma você lida com operadores que contestam suas avaliações?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'callcenter', texto: 'Como você organiza sua rotina para cumprir a meta de avaliações sem perder qualidade?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'callcenter', texto: 'Descreva como você busca atualização sobre boas práticas de atendimento ao cliente.', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'callcenter', texto: 'Como você mantém a concentração e atenção aos detalhes durante longas sessões de monitoria?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Atenção aos Detalhes' },

  // Situacional (5)
  { area: 'callcenter', texto: 'Você identifica uma falta grave em uma ligação de um operador bem avaliado. Como procede?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Avaliação Imparcial' },
  { area: 'callcenter', texto: 'Um supervisor discorda da sua avaliação e solicita revisão. O que você faz?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Defesa de Avaliação' },
  { area: 'callcenter', texto: 'A demanda de monitorias aumenta e você não conseguirá cumprir o prazo. Como comunica isso?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação de Limitações' },
  { area: 'callcenter', texto: 'Você percebe que um critério do checklist está causando avaliações injustas. O que faz?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Senso Crítico' },
  { area: 'callcenter', texto: 'Um operador apresenta dificuldade recorrente no mesmo item. Como você aborda isso no feedback?', cargo: 'Analista de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Feedback Direcionado' },
];

export const analistaQualidadePleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'callcenter', texto: 'Como você desenvolve e atualiza os checklists de avaliação para diferentes tipos de atendimento?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Desenvolvimento de Checklists' },
  { area: 'callcenter', texto: 'Quais metodologias você utiliza para calibração de avaliações entre analistas?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Calibração' },
  { area: 'callcenter', texto: 'Como você estrutura análises de tendências de qualidade ao longo do tempo?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise de Tendências' },
  { area: 'callcenter', texto: 'Quais técnicas você aplica para conduzir sessões de feedback em grupo?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Feedback em Grupo' },
  { area: 'callcenter', texto: 'Como você utiliza dados de qualidade para propor treinamentos específicos?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Proposta de Treinamentos' },
  { area: 'callcenter', texto: 'Quais métricas você correlaciona para ter uma visão completa da qualidade da operação?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Correlação de Métricas' },

  // Experiência (6)
  { area: 'callcenter', texto: 'Conte sobre um projeto de melhoria de qualidade que você liderou ou participou ativamente.', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de Melhoria' },
  { area: 'callcenter', texto: 'Descreva como você ajudou a elevar o índice de qualidade de uma operação específica.', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Elevação de Indicadores' },
  { area: 'callcenter', texto: 'Como foi sua experiência conduzindo sessões de calibração com outros analistas?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Condução de Calibração' },
  { area: 'callcenter', texto: 'Descreva uma situação em que sua análise identificou a causa raiz de um problema de qualidade.', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Análise de Causa Raiz' },
  { area: 'callcenter', texto: 'Conte sobre como você desenvolveu um novo processo ou ferramenta de avaliação.', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desenvolvimento de Processos' },
  { area: 'callcenter', texto: 'Descreva sua experiência com auditorias internas ou externas de qualidade.', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditorias de Qualidade' },

  // Comportamental (6)
  { area: 'callcenter', texto: 'Como você equilibra rigor nas avaliações com empatia no feedback?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Rigor-Empatia' },
  { area: 'callcenter', texto: 'De que forma você influencia a cultura de qualidade na operação?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Influência Cultural' },
  { area: 'callcenter', texto: 'Como você lida quando suas recomendações de melhoria não são implementadas?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Frustração' },
  { area: 'callcenter', texto: 'Descreva como você desenvolve analistas mais júniores na equipe de qualidade.', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },
  { area: 'callcenter', texto: 'Como você mantém a motivação ao realizar tarefas repetitivas de monitoria?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Automotivaçãoo' },
  { area: 'callcenter', texto: 'De que forma você busca inovação nos processos de qualidade?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Inovação em Processos' },

  // Situacional (6)
  { area: 'callcenter', texto: 'A operação apresenta queda nos indicadores de qualidade. Como você estrutura o diagnóstico?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Diagnóstico de Qualidade' },
  { area: 'callcenter', texto: 'Você identifica que dois analistas avaliam o mesmo item de formas muito diferentes. O que faz?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Padronização de Avaliações' },
  { area: 'callcenter', texto: 'A coordenação pede um relatório urgente que exige análise de muitos dados. Como prioriza?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Priorização sob Pressão' },
  { area: 'callcenter', texto: 'Um supervisor contesta sistematicamente suas avaliações de operadores da equipe dele. Como resolve?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Relacionamento' },
  { area: 'callcenter', texto: 'Você precisa implementar um novo critério de avaliação impopular. Como comunica e engaja?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Mudanças' },
  { area: 'callcenter', texto: 'Uma reclamação de cliente expõe uma falha que não foi identificada nas monitorias. O que faz?', cargo: 'Analista de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Revisão de Processos' },
];

export const analistaQualidadeSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'callcenter', texto: 'Como você estrutura um programa completo de gestão da qualidade para uma operação de call center?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Programa de Qualidade' },
  { area: 'callcenter', texto: 'Quais metodologias de análise estatística você aplica para identificar oportunidades de melhoria?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise Estatística' },
  { area: 'callcenter', texto: 'Como você integra indicadores de qualidade com métricas de negócio para demonstrar impacto?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Integração de Métricas' },
  { area: 'callcenter', texto: 'Quais frameworks de qualidade você conhece e como os adapta para call center?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Frameworks de Qualidade' },
  { area: 'callcenter', texto: 'Como você desenvolve dashboards executivos para reportar qualidade à alta gestão?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Dashboards Executivos' },
  { area: 'callcenter', texto: 'Quais tecnologias de speech analytics você conhece e como as utiliza para qualidade?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Speech Analytics' },
  { area: 'callcenter', texto: 'Como você estrutura SLAs de qualidade com clientes internos e externos?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'SLAs de Qualidade' },

  // Experiência (7)
  { area: 'callcenter', texto: 'Conte sobre a implementação de um programa de qualidade que você liderou do início ao fim.', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Programas' },
  { area: 'callcenter', texto: 'Descreva como você utilizou análise de dados para gerar insights estratégicos para a operação.', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Análise Estratégica' },
  { area: 'callcenter', texto: 'Como foi sua experiência conduzindo projetos de transformação de qualidade em larga escala?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação de Qualidade' },
  { area: 'callcenter', texto: 'Descreva um caso em que suas recomendações impactaram significativamente os resultados do negócio.', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Impacto no Negócio' },
  { area: 'callcenter', texto: 'Conte sobre sua experiência com certificações de qualidade (ISO, COPC, etc.).', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Certificações de Qualidade' },
  { area: 'callcenter', texto: 'Descreva como você estruturou e desenvolveu uma equipe de qualidade.', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Equipe' },
  { area: 'callcenter', texto: 'Como você conduziu a implementação de ferramentas de automação de qualidade?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Automação de Qualidade' },

  // Comportamental (7)
  { area: 'callcenter', texto: 'Como você influencia decisões estratégicas usando dados de qualidade?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Estratégica' },
  { area: 'callcenter', texto: 'De que forma você promove a cultura de qualidade em todos os níveis da organização?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Promoção de Cultura' },
  { area: 'callcenter', texto: 'Como você lida com resistência organizacional a mudanças propostas pela área de qualidade?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Resistência' },
  { area: 'callcenter', texto: 'Descreva como você equilibra visão estratégica com execução operacional na gestão de qualidade.', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Estratégico-Operacional' },
  { area: 'callcenter', texto: 'Como você desenvolve pensamento crítico e analítico na sua equipe?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Pensamento Crítico' },
  { area: 'callcenter', texto: 'De que forma você mantém sua relevância e atualização em um ambiente de constantes mudanças?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Atualização Contínua' },
  { area: 'callcenter', texto: 'Como você constrói credibilidade com stakeholders de diferentes áreas?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Construção de Credibilidade' },

  // Situacional (7)
  { area: 'callcenter', texto: 'A empresa precisa reduzir custos de qualidade em 30% sem perder efetividade. Como você aborda?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização de Custos' },
  { area: 'callcenter', texto: 'Você identifica uma falha sistêmica que impacta o cliente mas cuja correção é politicamente sensível. O que faz?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Situações Sensíveis' },
  { area: 'callcenter', texto: 'A diretoria questiona o ROI da área de qualidade. Como você demonstra o valor gerado?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Demonstração de ROI' },
  { area: 'callcenter', texto: 'Você assume uma operação com baixa maturidade em qualidade. Por onde começa?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Construção de Maturidade' },
  { area: 'callcenter', texto: 'Um cliente corporativo solicita customização de indicadores de qualidade fora do padrão. Como negocia?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação de Customização' },
  { area: 'callcenter', texto: 'A área de operações contesta a metodologia de qualidade. Como você conduz essa discussão?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Metodologia' },
  { area: 'callcenter', texto: 'Você precisa implementar IA/automação mantendo a acuracidade das avaliações. Como estrutura isso?', cargo: 'Analista de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Implementação de IA' },
];

// ============================================
// COORDENADOR DE OPERAÇÕES
// ============================================

export const coordenadorOperacoesSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'callcenter', texto: 'Como você estrutura o planejamento de capacidade para uma operação de call center?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento de Capacidade' },
  { area: 'callcenter', texto: 'Quais ferramentas de workforce management você domina e como as utiliza no dia a dia?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'tecnica', competencia: 'Workforce Management' },
  { area: 'callcenter', texto: 'Como você desenvolve e monitora o orçamento de uma operação de call center?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Orçamento' },
  { area: 'callcenter', texto: 'Quais metodologias você aplica para otimização de processos operacionais?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'tecnica', competencia: 'Otimização de Processos' },
  { area: 'callcenter', texto: 'Como você estrutura os indicadores e relatórios para apresentação à diretoria?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'tecnica', competencia: 'Reporting Executivo' },
  { area: 'callcenter', texto: 'Quais estratégias você utiliza para gestão de múltiplos clientes/contratos simultâneos?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Multi-cliente' },
  { area: 'callcenter', texto: 'Como você implementa e monitora SLAs contratuais com clientes corporativos?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de SLAs' },

  // Experiência (7)
  { area: 'callcenter', texto: 'Conte sobre a maior operação que você coordenou em termos de pessoas e complexidade.', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Operações Complexas' },
  { area: 'callcenter', texto: 'Descreva como você conduziu uma renegociação de contrato com um cliente insatisfeito.', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'experiencia', competencia: 'Renegociação de Contratos' },
  { area: 'callcenter', texto: 'Como foi sua experiência com implantação de novas operações ou sites de atendimento?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'experiencia', competencia: 'Implantação de Operações' },
  { area: 'callcenter', texto: 'Descreva um turnaround de resultados que você liderou em uma operação problemática.', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround' },
  { area: 'callcenter', texto: 'Conte sobre como você desenvolveu e promoveu supervisores na sua equipe.', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Líderes' },
  { area: 'callcenter', texto: 'Descreva sua experiência com projetos de transformação digital em call center.', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Digital' },
  { area: 'callcenter', texto: 'Como você gerenciou uma crise operacional de grande impacto?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },

  // Comportamental (7)
  { area: 'callcenter', texto: 'Como você constrói e mantém relacionamentos estratégicos com clientes corporativos?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento com Clientes' },
  { area: 'callcenter', texto: 'De que forma você equilibra as demandas de diferentes stakeholders com interesses conflitantes?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Stakeholders' },
  { area: 'callcenter', texto: 'Como você desenvolve uma cultura de alta performance e accountability na operação?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Performance' },
  { area: 'callcenter', texto: 'Descreva como você toma decisões difíceis que impactam pessoas e resultados.', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'callcenter', texto: 'Como você mantém sua equipe de líderes engajada e alinhada com os objetivos estratégicos?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'comportamental', competencia: 'Engajamento de Líderes' },
  { area: 'callcenter', texto: 'De que forma você promove inovação e melhoria contínua na operação?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'comportamental', competencia: 'Promoção de Inovação' },
  { area: 'callcenter', texto: 'Como você lida com a pressão de resultados de curto prazo versus desenvolvimento de longo prazo?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },

  // Situacional (7)
  { area: 'callcenter', texto: 'Um cliente estratégico ameaça rescindir o contrato por problemas de performance. Como você age?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Clientes' },
  { area: 'callcenter', texto: 'A empresa precisa reduzir 20% do headcount da operação mantendo os resultados. Como estrutura isso?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
  { area: 'callcenter', texto: 'Dois supervisores disputam recursos limitados. Como você decide e comunica?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'situacional', competencia: 'Alocação de Recursos' },
  { area: 'callcenter', texto: 'A diretoria define uma meta agressiva que você considera inatingível. Como você procede?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação de Metas' },
  { area: 'callcenter', texto: 'Um problema técnico causa indisponibilidade prolongada dos sistemas. Como você gerencia a crise?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Indisponibilidade' },
  { area: 'callcenter', texto: 'Você identifica uma oportunidade de expandir a operação que requer investimento significativo. Como apresenta?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'situacional', competencia: 'Business Case' },
  { area: 'callcenter', texto: 'A operação precisa migrar para um novo sistema em tempo recorde. Como você planeja e executa?', cargo: 'Coordenador de Operações', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Migração' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasCallCenter: PerguntaSeed[] = [
  ...operadorTelemarketingJunior,
  ...operadorTelemarketingPleno,
  ...supervisorCallCenterPleno,
  ...supervisorCallCenterSenior,
  ...analistaQualidadeJunior,
  ...analistaQualidadePleno,
  ...analistaQualidadeSenior,
  ...coordenadorOperacoesSenior,
];

export const estatisticasCallCenter = {
  total: perguntasCallCenter.length,
  porCargo: {
    'Operador de Telemarketing Junior': operadorTelemarketingJunior.length,
    'Operador de Telemarketing Pleno': operadorTelemarketingPleno.length,
    'Supervisor de Call Center Pleno': supervisorCallCenterPleno.length,
    'Supervisor de Call Center Senior': supervisorCallCenterSenior.length,
    'Analista de Qualidade Junior': analistaQualidadeJunior.length,
    'Analista de Qualidade Pleno': analistaQualidadePleno.length,
    'Analista de Qualidade Senior': analistaQualidadeSenior.length,
    'Coordenador de Operações Senior': coordenadorOperacoesSenior.length,
  },
};
