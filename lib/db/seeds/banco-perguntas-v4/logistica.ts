/**
 * Banco de Perguntas v4 - Logística
 *
 * Cargos incluídos:
 * - Auxiliar de Logística (Junior, Pleno)
 * - Analista de Logística (Junior, Pleno, Senior)
 * - Conferente de Mercadorias (Junior, Pleno)
 * - Coordenador de Logística (Senior)
 * - Motorista de Entrega (Junior, Pleno)
 * - Estoquista (Junior, Pleno)
 *
 * Total: ~290 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// AUXILIAR DE LOGÍSTICA
// ============================================

export const auxiliarLogisticaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Quais são os principais documentos que acompanham uma mercadoria no recebimento?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação de Recebimento' },
  { area: 'logistica', texto: 'Como você realiza a conferência física de produtos no momento do recebimento?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Conferência de Mercadorias' },
  { area: 'logistica', texto: 'Quais informações devem constar em uma etiqueta de identificação de produto?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Identificação de Produtos' },
  { area: 'logistica', texto: 'Como você utiliza um coletor de dados ou scanner para registro de mercadorias?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Equipamentos de Coleta' },
  { area: 'logistica', texto: 'Quais são os cuidados básicos no manuseio de diferentes tipos de cargas?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Manuseio de Cargas' },
  { area: 'logistica', texto: 'Como você organiza produtos no armazém seguindo critérios de endereçamento?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Endereçamento de Estoque' },

  // Experiência (5)
  { area: 'logistica', texto: 'Conte sobre sua experiência anterior com atividades de armazenagem ou movimentação de materiais.', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Atividades de Armazenagem' },
  { area: 'logistica', texto: 'Descreva uma situação em que você identificou uma divergência no recebimento de mercadorias.', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Identificação de Divergências' },
  { area: 'logistica', texto: 'Como foi sua adaptação ao uso de sistemas de controle de estoque ou WMS?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas de Estoque' },
  { area: 'logistica', texto: 'Descreva um momento em que precisou trabalhar sob pressão para cumprir um prazo de expedição.', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho sob Pressão' },
  { area: 'logistica', texto: 'Conte sobre uma situação em que sua atenção aos detalhes evitou um erro na separação.', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Atenção aos Detalhes' },

  // Comportamental (5)
  { area: 'logistica', texto: 'Como você mantém a organização do seu ambiente de trabalho durante o expediente?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'logistica', texto: 'De que forma você lida com tarefas repetitivas mantendo a qualidade do trabalho?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Consistência' },
  { area: 'logistica', texto: 'Como você reage quando recebe instruções que não ficaram claras?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'logistica', texto: 'Descreva como você colabora com colegas em atividades que exigem trabalho em equipe.', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'logistica', texto: 'Como você administra seu tempo quando tem múltiplas tarefas para realizar?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão do Tempo' },

  // Situacional (5)
  { area: 'logistica', texto: 'Você percebe que a quantidade física de um produto não corresponde à nota fiscal. O que faz?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Divergência de Recebimento' },
  { area: 'logistica', texto: 'Um produto frágil chega danificado. Como você procede?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Tratamento de Avarias' },
  { area: 'logistica', texto: 'O sistema de registro está fora do ar e há mercadorias para receber. O que você faz?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Resolução de Problemas' },
  { area: 'logistica', texto: 'Você é solicitado a realizar uma tarefa urgente enquanto está no meio de outra. Como prioriza?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { area: 'logistica', texto: 'Um colega está tendo dificuldade com uma tarefa e vocês precisam terminar juntos. Como você ajuda?', cargo: 'Auxiliar de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Colaboração' },
];

export const auxiliarLogisticaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Como você realiza o controle de FIFO/FEFO no gerenciamento de estoque?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão FIFO/FEFO' },
  { area: 'logistica', texto: 'Quais procedimentos você segue para o correto armazenamento de produtos com condições especiais?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Armazenamento Especial' },
  { area: 'logistica', texto: 'Como você utiliza relatórios do sistema WMS para otimizar suas atividades diárias?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Utilização de WMS' },
  { area: 'logistica', texto: 'Quais indicadores você acompanha para avaliar a eficiência do processo de recebimento?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Recebimento' },
  { area: 'logistica', texto: 'Como você organiza a separação de pedidos para garantir agilidade e acuracidade?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Separação de Pedidos' },
  { area: 'logistica', texto: 'Quais técnicas você aplica para otimizar o espaço de armazenamento no centro de distribuição?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Otimização de Espaço' },

  // Experiência (6)
  { area: 'logistica', texto: 'Conte sobre uma melhoria que você sugeriu e foi implementada no processo de armazenagem.', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'logistica', texto: 'Descreva como você treinou um colega mais novo nas atividades de logística.', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Colegas' },
  { area: 'logistica', texto: 'Como você lidou com um pico de demanda que exigiu reorganização das prioridades?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Picos' },
  { area: 'logistica', texto: 'Descreva uma situação em que você identificou um problema recorrente e propôs uma solução.', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Identificação de Problemas' },
  { area: 'logistica', texto: 'Conte sobre sua experiência com inventários cíclicos ou gerais.', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Inventário' },
  { area: 'logistica', texto: 'Como foi sua participação em projetos de melhoria contínua na área de logística?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria Contínua' },

  // Comportamental (6)
  { area: 'logistica', texto: 'Como você equilibra velocidade e qualidade nas atividades de separação e expedição?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Qualidade-Velocidade' },
  { area: 'logistica', texto: 'De que forma você contribui para manter um ambiente de trabalho seguro?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Segurança no Trabalho' },
  { area: 'logistica', texto: 'Como você lida com mudanças nos procedimentos ou processos de trabalho?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'logistica', texto: 'Descreva como você se comunica com outras áreas para resolver problemas.', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Interdepartamental' },
  { area: 'logistica', texto: 'Como você mantém a motivação em períodos de alta demanda e sobrecarga?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'logistica', texto: 'De que forma você busca aprender novas habilidades relevantes para a área?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Autodesenvolvimento' },

  // Situacional (6)
  { area: 'logistica', texto: 'O inventário identificou divergência significativa em um SKU importante. Como você investiga?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Investigação de Divergências' },
  { area: 'logistica', texto: 'Um cliente urgente precisa de um pedido que está no fundo do estoque. Como você resolve?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento Urgente' },
  { area: 'logistica', texto: 'Você percebe que um colega está cometendo erros frequentes. Como aborda a situação?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback entre Pares' },
  { area: 'logistica', texto: 'O fornecedor entrega mercadoria em horário não programado e a doca está ocupada. O que faz?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Imprevistos' },
  { area: 'logistica', texto: 'Você identifica um produto com validade próxima do vencimento em posição de difícil acesso. Como procede?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Validade' },
  { area: 'logistica', texto: 'A meta de separação do dia aumentou significativamente. Como você se organiza?', cargo: 'Auxiliar de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Produtividade' },
];

// ============================================
// ANALISTA DE LOGÍSTICA
// ============================================

export const analistaLogisticaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Quais indicadores de desempenho logístico você considera mais importantes para monitorar?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'KPIs Logísticos' },
  { area: 'logistica', texto: 'Como você utiliza planilhas ou sistemas para controle e análise de dados logísticos?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Análise de Dados' },
  { area: 'logistica', texto: 'Quais são os principais componentes do custo logístico que você monitora?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Custos Logísticos' },
  { area: 'logistica', texto: 'Como você analisa o desempenho de transportadoras parceiras?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação de Transportadoras' },
  { area: 'logistica', texto: 'Quais relatórios você gera para acompanhamento das operações de distribuição?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Relatórios de Distribuição' },
  { area: 'logistica', texto: 'Como você calcula e acompanha o nível de serviço (OTIF) das entregas?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'tecnica', competencia: 'Nível de Serviço' },

  // Experiência (5)
  { area: 'logistica', texto: 'Conte sobre sua experiência com análise de dados logísticos ou operacionais.', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise de Dados' },
  { area: 'logistica', texto: 'Descreva uma análise que você realizou e que gerou alguma ação de melhoria.', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise para Melhoria' },
  { area: 'logistica', texto: 'Como foi sua experiência com sistemas de gestão logística (WMS, TMS)?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas de Gestão' },
  { area: 'logistica', texto: 'Descreva um desafio que enfrentou ao consolidar dados de diferentes fontes.', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Consolidação de Dados' },
  { area: 'logistica', texto: 'Conte sobre uma situação em que precisou apresentar dados para a gestão.', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'experiencia', competencia: 'Apresentação de Dados' },

  // Comportamental (5)
  { area: 'logistica', texto: 'Como você organiza suas tarefas para cumprir prazos de entrega de relatórios?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'logistica', texto: 'De que forma você lida com solicitações urgentes que interrompem suas análises?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Prioridades' },
  { area: 'logistica', texto: 'Como você busca entender o contexto operacional antes de fazer uma análise?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Visão Contextual' },
  { area: 'logistica', texto: 'Descreva como você lida com situações em que os dados disponíveis são incompletos.', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'logistica', texto: 'Como você se mantém atualizado sobre práticas e tendências em logística?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Profissional' },

  // Situacional (5)
  { area: 'logistica', texto: 'Você identifica uma inconsistência nos dados de transporte. Como investiga a causa?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Investigação de Dados' },
  { area: 'logistica', texto: 'A gestão pede um relatório urgente com dados que você não tem. O que faz?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Demandas' },
  { area: 'logistica', texto: 'Você percebe que uma transportadora está com performance abaixo do esperado. Como comunica isso?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação de Resultados' },
  { area: 'logistica', texto: 'Os dados que você precisa estão em sistemas diferentes e não batem. Como concilia?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Conciliação de Dados' },
  { area: 'logistica', texto: 'Você encontra um erro em um relatório que já foi enviado. Como procede?', cargo: 'Analista de Logística', nivel: 'junior', categoria: 'situacional', competencia: 'Correção de Erros' },
];

export const analistaLogisticaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Como você estrutura uma análise de custo total de distribuição por canal ou região?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise de Custos' },
  { area: 'logistica', texto: 'Quais metodologias você utiliza para dimensionamento de frota e capacidade de transporte?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Dimensionamento de Frota' },
  { area: 'logistica', texto: 'Como você desenvolve e monitora dashboards de indicadores logísticos?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Business Intelligence' },
  { area: 'logistica', texto: 'Quais técnicas você aplica para otimização de rotas de entrega?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Roteirização' },
  { area: 'logistica', texto: 'Como você conduz uma análise de trade-off entre nível de serviço e custo logístico?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Trade-off Custo-Serviço' },
  { area: 'logistica', texto: 'Quais critérios você utiliza para avaliação e homologação de transportadoras?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'tecnica', competencia: 'Homologação de Fornecedores' },

  // Experiência (6)
  { area: 'logistica', texto: 'Conte sobre um projeto de redução de custos logísticos que você liderou ou participou.', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redução de Custos' },
  { area: 'logistica', texto: 'Descreva como você implementou melhorias no processo de distribuição.', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Distribuição' },
  { area: 'logistica', texto: 'Como foi sua experiência com negociação de contratos com transportadoras?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação com Fornecedores' },
  { area: 'logistica', texto: 'Descreva um projeto de implementação ou melhoria de sistema logístico que você participou.', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de Sistemas' },
  { area: 'logistica', texto: 'Conte sobre uma análise complexa que mudou a forma como a operação funcionava.', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Análise de Impacto' },
  { area: 'logistica', texto: 'Como você gerenciou a performance de múltiplas transportadoras simultaneamente?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Transportadoras' },

  // Comportamental (6)
  { area: 'logistica', texto: 'Como você equilibra análises detalhadas com a necessidade de entregas rápidas?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Profundidade-Agilidade' },
  { area: 'logistica', texto: 'De que forma você influencia decisões operacionais com base em suas análises?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Influência Analítica' },
  { area: 'logistica', texto: 'Como você lida com resistência da operação a mudanças que você propõe?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Resistência' },
  { area: 'logistica', texto: 'Descreva como você colabora com outras áreas para resolver problemas logísticos.', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração Interfuncional' },
  { area: 'logistica', texto: 'Como você prioriza demandas de diferentes stakeholders?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Stakeholders' },
  { area: 'logistica', texto: 'De que forma você desenvolve suas competências técnicas em logística?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento Técnico' },

  // Situacional (6)
  { area: 'logistica', texto: 'A operação apresenta aumento de custos de frete sem explicação aparente. Como você investiga?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Investigação de Custos' },
  { area: 'logistica', texto: 'Uma transportadora estratégica apresenta queda de performance. Como você aborda a situação?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Performance' },
  { area: 'logistica', texto: 'Você identifica oportunidade de economia que exige investimento inicial. Como apresenta o business case?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Business Case' },
  { area: 'logistica', texto: 'A demanda aumenta significativamente e a capacidade de transporte não é suficiente. O que propõe?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Capacidade' },
  { area: 'logistica', texto: 'Duas áreas da empresa têm visões diferentes sobre uma decisão logística. Como você medeia?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Mediação de Conflitos' },
  { area: 'logistica', texto: 'O sistema de roteirização propõe uma rota diferente da prática operacional. Como você valida?', cargo: 'Analista de Logística', nivel: 'pleno', categoria: 'situacional', competencia: 'Validação de Sistemas' },
];

export const analistaLogisticaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'logistica', texto: 'Como você estrutura um modelo de custeio logístico para tomada de decisões estratégicas?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Custeio Logístico' },
  { area: 'logistica', texto: 'Quais metodologias você aplica para planejamento de rede de distribuição?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Network Design' },
  { area: 'logistica', texto: 'Como você desenvolve modelos preditivos para demanda de transporte e armazenagem?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Modelos Preditivos' },
  { area: 'logistica', texto: 'Quais frameworks você utiliza para análise de maturidade da cadeia de suprimentos?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Maturidade de Supply Chain' },
  { area: 'logistica', texto: 'Como você estrutura KPIs estratégicos que conectam logística a resultados de negócio?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'KPIs Estratégicos' },
  { area: 'logistica', texto: 'Quais técnicas de simulação você utiliza para testar cenários logísticos?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Simulação de Cenários' },
  { area: 'logistica', texto: 'Como você avalia e prioriza investimentos em tecnologia logística?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação de Tecnologia' },

  // Experiência (7)
  { area: 'logistica', texto: 'Conte sobre um projeto de transformação logística de grande escala que você liderou.', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Logística' },
  { area: 'logistica', texto: 'Descreva como você redesenhou a malha de distribuição de uma operação.', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Redesenho de Malha' },
  { area: 'logistica', texto: 'Como foi sua experiência com implementação de sistemas TMS ou WMS de grande porte?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Sistemas' },
  { area: 'logistica', texto: 'Descreva um caso em que suas análises geraram impacto financeiro significativo.', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Impacto Financeiro' },
  { area: 'logistica', texto: 'Conte sobre como você desenvolveu analistas mais júniores em sua equipe.', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'logistica', texto: 'Descreva sua experiência com projetos de automação ou inovação logística.', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Inovação Logística' },
  { area: 'logistica', texto: 'Como você conduziu um processo de seleção e contratação de operador logístico?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Seleção de 3PL' },

  // Comportamental (7)
  { area: 'logistica', texto: 'Como você influencia decisões estratégicas utilizando análises de dados?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Estratégica' },
  { area: 'logistica', texto: 'De que forma você equilibra visão analítica com pragmatismo operacional?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Análise-Operação' },
  { area: 'logistica', texto: 'Como você constrói credibilidade com stakeholders de diferentes níveis?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Construção de Credibilidade' },
  { area: 'logistica', texto: 'Descreva como você promove a cultura de decisões baseadas em dados na organização.', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura Data-Driven' },
  { area: 'logistica', texto: 'Como você lida com pressões conflitantes de diferentes áreas da empresa?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'logistica', texto: 'De que forma você se mantém atualizado sobre tendências e inovações em supply chain?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Atualização Tecnológica' },
  { area: 'logistica', texto: 'Como você equilibra entregas de curto prazo com projetos de longo prazo?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Portfólio' },

  // Situacional (7)
  { area: 'logistica', texto: 'A diretoria questiona o ROI de um projeto logístico que você propôs. Como defende?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de ROI' },
  { area: 'logistica', texto: 'Você identifica que a estratégia logística atual não suporta o crescimento planejado. O que propõe?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento Estratégico' },
  { area: 'logistica', texto: 'Um novo canal de vendas exige modelo de distribuição diferente. Como você estrutura a análise?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Novos Modelos de Distribuição' },
  { area: 'logistica', texto: 'A empresa considera internalizar operação terceirizada. Quais análises você conduz?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Make vs Buy' },
  { area: 'logistica', texto: 'Os dados mostram oportunidade de mudança que a operação resiste. Como você conduz?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Mudanças' },
  { area: 'logistica', texto: 'Você precisa integrar dados de múltiplas fontes para uma análise crítica. Como estrutura?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Integração de Dados' },
  { area: 'logistica', texto: 'Um fornecedor logístico estratégico anuncia aumento significativo de preços. Como você negocia?', cargo: 'Analista de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação Estratégica' },
];

// ============================================
// CONFERENTE DE MERCADORIAS
// ============================================

export const conferenteJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Quais são os principais pontos de verificação ao conferir uma carga no recebimento?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'tecnica', competencia: 'Conferência de Recebimento' },
  { area: 'logistica', texto: 'Como você utiliza equipamentos de leitura (coletores, scanners) na conferência de produtos?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'tecnica', competencia: 'Equipamentos de Conferência' },
  { area: 'logistica', texto: 'Quais documentos você verifica ao realizar a conferência de uma entrega?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },
  { area: 'logistica', texto: 'Como você identifica e registra produtos com avarias ou não conformidades?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'tecnica', competencia: 'Registro de Avarias' },
  { area: 'logistica', texto: 'Quais são os critérios para aprovação ou recusa de mercadorias no recebimento?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'tecnica', competencia: 'Critérios de Aceitação' },
  { area: 'logistica', texto: 'Como você confere a integridade das embalagens e lacres de segurança?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'tecnica', competencia: 'Verificação de Embalagens' },

  // Experiência (5)
  { area: 'logistica', texto: 'Conte sobre sua experiência anterior com atividades de conferência ou controle de qualidade.', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'experiencia', competencia: 'Conferência de Mercadorias' },
  { area: 'logistica', texto: 'Descreva uma situação em que sua atenção evitou que uma divergência passasse despercebida.', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'experiencia', competencia: 'Atenção aos Detalhes' },
  { area: 'logistica', texto: 'Como foi sua adaptação ao ritmo de trabalho em ambiente de armazenagem ou distribuição?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptação ao Ambiente' },
  { area: 'logistica', texto: 'Descreva um momento em que precisou reportar um problema encontrado na conferência.', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'experiencia', competencia: 'Comunicação de Problemas' },
  { area: 'logistica', texto: 'Conte sobre sua experiência com diferentes tipos de produtos ou cargas.', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'experiencia', competencia: 'Variedade de Produtos' },

  // Comportamental (5)
  { area: 'logistica', texto: 'Como você mantém a concentração ao realizar conferências repetitivas ao longo do dia?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'comportamental', competencia: 'Concentração' },
  { area: 'logistica', texto: 'De que forma você lida com a pressão de prazos apertados nas operações de carga e descarga?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho sob Pressão' },
  { area: 'logistica', texto: 'Como você se comunica com motoristas ou fornecedores quando há divergências?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'logistica', texto: 'Descreva como você colabora com a equipe para agilizar o processo de conferência.', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'logistica', texto: 'Como você reage quando encontra algo diferente do procedimento padrão?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'comportamental', competencia: 'Senso Crítico' },

  // Situacional (5)
  { area: 'logistica', texto: 'Você encontra diferença entre a quantidade física e o documento fiscal. Como procede?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'situacional', competencia: 'Divergência Quantitativa' },
  { area: 'logistica', texto: 'Uma mercadoria chegou com embalagem violada. O que você faz?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'situacional', competencia: 'Mercadoria Avariada' },
  { area: 'logistica', texto: 'O motorista tem pressa para liberar o veículo mas a conferência não terminou. Como você age?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'situacional', competencia: 'Pressão Externa' },
  { area: 'logistica', texto: 'Você percebe que um lote está com data de validade muito próxima. O que faz?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Validade' },
  { area: 'logistica', texto: 'O coletor de dados para de funcionar no meio de uma conferência. Como você resolve?', cargo: 'Conferente de Mercadorias', nivel: 'junior', categoria: 'situacional', competencia: 'Contingência Técnica' },
];

export const conferentePleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Como você conduz a conferência de cargas complexas com múltiplos SKUs e lotes?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'tecnica', competencia: 'Conferência Complexa' },
  { area: 'logistica', texto: 'Quais procedimentos você segue para conferência de produtos com controle especial (cadeia fria, perigosos)?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'tecnica', competencia: 'Produtos Especiais' },
  { area: 'logistica', texto: 'Como você organiza e prioriza as conferências quando há múltiplos veículos aguardando?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'tecnica', competencia: 'Priorização de Conferências' },
  { area: 'logistica', texto: 'Quais indicadores você acompanha para avaliar a eficiência do processo de conferência?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Conferência' },
  { area: 'logistica', texto: 'Como você realiza a conferência de expedição garantindo que o pedido está completo?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'tecnica', competencia: 'Conferência de Expedição' },
  { area: 'logistica', texto: 'Quais técnicas você utiliza para agilizar a conferência sem comprometer a qualidade?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'tecnica', competencia: 'Eficiência em Conferência' },

  // Experiência (6)
  { area: 'logistica', texto: 'Conte sobre uma melhoria que você sugeriu no processo de conferência.', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'logistica', texto: 'Descreva como você treinou colegas mais novos nas atividades de conferência.', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Equipe' },
  { area: 'logistica', texto: 'Como foi sua experiência com conferências de inventário ou auditorias de estoque?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'experiencia', competencia: 'Inventário' },
  { area: 'logistica', texto: 'Descreva uma situação complexa de divergência que você resolveu.', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Divergências' },
  { area: 'logistica', texto: 'Conte sobre sua experiência com conferência de cargas de alto valor ou sensíveis.', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'experiencia', competencia: 'Cargas Especiais' },
  { area: 'logistica', texto: 'Como você lidou com uma situação de alto volume de conferências em período crítico?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Picos' },

  // Comportamental (6)
  { area: 'logistica', texto: 'Como você equilibra velocidade e precisão nas conferências do dia a dia?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Velocidade-Precisão' },
  { area: 'logistica', texto: 'De que forma você contribui para a prevenção de erros recorrentes na equipe?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'comportamental', competencia: 'Prevenção de Erros' },
  { area: 'logistica', texto: 'Como você lida com situações de tensão com motoristas ou fornecedores?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'logistica', texto: 'Descreva como você mantém a qualidade mesmo em momentos de alta pressão.', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'comportamental', competencia: 'Consistência' },
  { area: 'logistica', texto: 'Como você se mantém atualizado sobre procedimentos e mudanças nos processos?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização de Conhecimentos' },
  { area: 'logistica', texto: 'De que forma você apoia os colegas em momentos de dificuldade operacional?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'comportamental', competencia: 'Apoio à Equipe' },

  // Situacional (6)
  { area: 'logistica', texto: 'A conferência identifica uma divergência recorrente com um mesmo fornecedor. O que você faz?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'situacional', competencia: 'Padrão de Divergências' },
  { area: 'logistica', texto: 'Você precisa conferir uma carga urgente mas está no meio de outra conferência. Como prioriza?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Prioridades' },
  { area: 'logistica', texto: 'Um colega está cometendo erros frequentes nas conferências. Como você aborda?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback Construtivo' },
  { area: 'logistica', texto: 'A mercadoria está correta mas a documentação apresenta erro. Como procede?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'situacional', competencia: 'Divergência Documental' },
  { area: 'logistica', texto: 'Você identifica um produto que deveria ter sido segregado por recall. O que faz?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Recall' },
  { area: 'logistica', texto: 'O supervisor solicita que você aceite uma carga com divergência para não atrasar. Como age?', cargo: 'Conferente de Mercadorias', nivel: 'pleno', categoria: 'situacional', competencia: 'Integridade Profissional' },
];

// ============================================
// COORDENADOR DE LOGÍSTICA
// ============================================

export const coordenadorLogisticaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'logistica', texto: 'Como você estrutura o planejamento operacional de um centro de distribuição?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Operacional' },
  { area: 'logistica', texto: 'Quais indicadores você utiliza para gestão de performance da equipe de logística?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Performance' },
  { area: 'logistica', texto: 'Como você gerencia o orçamento operacional da área de logística?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Orçamento' },
  { area: 'logistica', texto: 'Quais metodologias você aplica para melhoria contínua de processos logísticos?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Melhoria Contínua' },
  { area: 'logistica', texto: 'Como você dimensiona e gerencia a equipe operacional para diferentes volumes?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Dimensionamento de Equipe' },
  { area: 'logistica', texto: 'Quais estratégias você utiliza para gestão de fornecedores logísticos?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Fornecedores' },
  { area: 'logistica', texto: 'Como você implementa e monitora SLAs internos e externos na operação?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de SLAs' },

  // Experiência (7)
  { area: 'logistica', texto: 'Conte sobre a maior operação logística que você coordenou em termos de complexidade.', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Operações Complexas' },
  { area: 'logistica', texto: 'Descreva um projeto de otimização que você liderou e quais foram os resultados.', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de Otimização' },
  { area: 'logistica', texto: 'Como foi sua experiência com implantação de novos armazéns ou centros de distribuição?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Implantação de Operações' },
  { area: 'logistica', texto: 'Descreva como você desenvolveu líderes e supervisores na sua equipe.', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Líderes' },
  { area: 'logistica', texto: 'Conte sobre uma crise operacional que você gerenciou e como resolveu.', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crises' },
  { area: 'logistica', texto: 'Como foi sua experiência com implementação de sistemas WMS ou TMS?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Sistemas' },
  { area: 'logistica', texto: 'Descreva como você conduziu um processo de reestruturação operacional.', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'experiencia', competencia: 'Reestruturação Operacional' },

  // Comportamental (7)
  { area: 'logistica', texto: 'Como você desenvolve uma cultura de segurança e qualidade na operação?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Segurança' },
  { area: 'logistica', texto: 'De que forma você equilibra demandas operacionais urgentes com planejamento de longo prazo?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },
  { area: 'logistica', texto: 'Como você lida com pressão por resultados de diferentes stakeholders?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Stakeholders' },
  { area: 'logistica', texto: 'Descreva como você promove engajamento e motivação na equipe operacional.', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Engajamento de Equipe' },
  { area: 'logistica', texto: 'Como você toma decisões difíceis que impactam pessoas e resultados?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'logistica', texto: 'De que forma você promove inovação e melhoria contínua na operação?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Promoção de Inovação' },
  { area: 'logistica', texto: 'Como você desenvolve sua equipe para assumir maiores responsabilidades?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },

  // Situacional (7)
  { area: 'logistica', texto: 'A operação apresenta indicadores abaixo da meta há dois meses. Qual seu plano de ação?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Plano de Recuperação' },
  { area: 'logistica', texto: 'Um cliente estratégico reclama de problemas recorrentes nas entregas. Como você age?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Clientes Críticos' },
  { area: 'logistica', texto: 'A empresa precisa reduzir custos operacionais em 15%. Como você estrutura isso?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Redução de Custos' },
  { area: 'logistica', texto: 'Dois líderes da sua equipe estão em conflito. Como você resolve?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Mediação de Conflitos' },
  { area: 'logistica', texto: 'O volume de operação vai dobrar em 3 meses. Como você se prepara?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento de Crescimento' },
  { area: 'logistica', texto: 'Um fornecedor logístico crítico anuncia que vai descontinuar o serviço. O que você faz?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Contingência' },
  { area: 'logistica', texto: 'Você identifica uma prática de segurança sendo negligenciada pela equipe. Como procede?', cargo: 'Coordenador de Logística', nivel: 'senior', categoria: 'situacional', competencia: 'Compliance de Segurança' },
];

// ============================================
// MOTORISTA DE ENTREGA
// ============================================

export const motoristaEntregasJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Quais verificações você realiza no veículo antes de iniciar a rota de entregas?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'tecnica', competencia: 'Checklist Veicular' },
  { area: 'logistica', texto: 'Como você organiza as mercadorias no veículo para otimizar as entregas?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'tecnica', competencia: 'Organização de Carga' },
  { area: 'logistica', texto: 'Quais documentos são necessários para realizar uma entrega corretamente?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação de Entrega' },
  { area: 'logistica', texto: 'Como você utiliza aplicativos de roteirização ou GPS na sua rotina de trabalho?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'tecnica', competencia: 'Tecnologia de Roteirização' },
  { area: 'logistica', texto: 'Quais cuidados você toma no manuseio de mercadorias frágeis ou perecíveis?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'tecnica', competencia: 'Manuseio de Mercadorias' },
  { area: 'logistica', texto: 'Como você procede para coletar a assinatura e confirmar a entrega ao cliente?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'tecnica', competencia: 'Confirmação de Entrega' },

  // Experiência (5)
  { area: 'logistica', texto: 'Conte sobre sua experiência anterior com entregas ou transporte de mercadorias.', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência em Entregas' },
  { area: 'logistica', texto: 'Descreva uma situação desafiadora que você enfrentou durante uma rota de entregas.', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'logistica', texto: 'Como foi sua adaptação ao ritmo e às exigências do trabalho de entregas?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptação ao Trabalho' },
  { area: 'logistica', texto: 'Descreva uma situação em que você precisou lidar com um cliente difícil.', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },
  { area: 'logistica', texto: 'Conte sobre uma entrega que você realizou em condições adversas (trânsito, clima).', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'experiencia', competencia: 'Condições Adversas' },

  // Comportamental (5)
  { area: 'logistica', texto: 'Como você mantém a calma e a cordialidade ao lidar com clientes impacientes?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'comportamental', competencia: 'Controle Emocional' },
  { area: 'logistica', texto: 'De que forma você zela pela conservação do veículo que utiliza?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'comportamental', competencia: 'Cuidado com Patrimônio' },
  { area: 'logistica', texto: 'Como você administra seu tempo para cumprir todas as entregas do dia?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão do Tempo' },
  { area: 'logistica', texto: 'Descreva como você mantém a atenção e a segurança durante longas jornadas.', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'comportamental', competencia: 'Segurança no Trânsito' },
  { area: 'logistica', texto: 'Como você reage quando percebe que não conseguirá cumprir o horário previsto?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação Proativa' },

  // Situacional (5)
  { area: 'logistica', texto: 'O cliente não está no endereço no momento da entrega. O que você faz?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'situacional', competencia: 'Cliente Ausente' },
  { area: 'logistica', texto: 'Você percebe que uma mercadoria está danificada ao abrir o veículo. Como procede?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'situacional', competencia: 'Mercadoria Avariada' },
  { area: 'logistica', texto: 'O veículo apresenta um problema mecânico no meio da rota. O que você faz?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'situacional', competencia: 'Problema Mecânico' },
  { area: 'logistica', texto: 'Um cliente se recusa a receber a mercadoria alegando que não pediu. Como age?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'situacional', competencia: 'Recusa de Recebimento' },
  { area: 'logistica', texto: 'Você está atrasado e o próximo cliente liga cobrando a entrega. Como comunica?', cargo: 'Motorista de Entrega', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação de Atrasos' },
];

export const motoristaEntregasPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Como você otimiza sua rota considerando janelas de entrega e restrições de trânsito?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'tecnica', competencia: 'Otimização de Rotas' },
  { area: 'logistica', texto: 'Quais procedimentos você segue para entrega de produtos que exigem cuidados especiais?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'tecnica', competencia: 'Entregas Especiais' },
  { area: 'logistica', texto: 'Como você gerencia múltiplas entregas com prioridades diferentes?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Prioridades' },
  { area: 'logistica', texto: 'Quais técnicas você utiliza para garantir a integridade da carga durante o transporte?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'tecnica', competencia: 'Preservação de Carga' },
  { area: 'logistica', texto: 'Como você utiliza os sistemas da empresa para registro e acompanhamento das entregas?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistemas de Registro' },
  { area: 'logistica', texto: 'Quais são os procedimentos de segurança que você segue em áreas de risco?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'tecnica', competencia: 'Segurança em Áreas de Risco' },

  // Experiência (6)
  { area: 'logistica', texto: 'Conte sobre uma situação complexa de entrega que você resolveu de forma criativa.', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução Criativa' },
  { area: 'logistica', texto: 'Descreva como você ajudou a treinar um motorista mais novo.', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Colegas' },
  { area: 'logistica', texto: 'Como foi sua experiência com entregas de alto valor ou cargas especiais?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'experiencia', competencia: 'Cargas Especiais' },
  { area: 'logistica', texto: 'Descreva uma melhoria que você sugeriu para o processo de entregas.', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'logistica', texto: 'Conte sobre como você lidou com uma situação de emergência durante uma rota.', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Emergências' },
  { area: 'logistica', texto: 'Descreva sua experiência com diferentes tipos de veículos e cargas.', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'experiencia', competencia: 'Versatilidade' },

  // Comportamental (6)
  { area: 'logistica', texto: 'Como você mantém um bom relacionamento com clientes frequentes da sua rota?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento com Clientes' },
  { area: 'logistica', texto: 'De que forma você contribui para a imagem da empresa durante as entregas?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'comportamental', competencia: 'Representação da Empresa' },
  { area: 'logistica', texto: 'Como você lida com situações de estresse no trânsito mantendo a segurança?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'comportamental', competencia: 'Controle de Estresse' },
  { area: 'logistica', texto: 'Descreva como você colabora com a equipe de logística para resolver problemas.', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboração' },
  { area: 'logistica', texto: 'Como você mantém a motivação em dias com rotas muito longas ou difíceis?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'logistica', texto: 'De que forma você busca melhorar continuamente seu desempenho nas entregas?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'comportamental', competencia: 'Autodesenvolvimento' },

  // Situacional (6)
  { area: 'logistica', texto: 'Você identifica que a rota planejada não é a mais eficiente. O que faz?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'situacional', competencia: 'Questionamento de Rotas' },
  { area: 'logistica', texto: 'Um cliente importante reclama do horário de entrega. Como você resolve?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Reclamações' },
  { area: 'logistica', texto: 'Você presencia outro motorista da empresa dirigindo de forma imprudente. O que faz?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética e Segurança' },
  { area: 'logistica', texto: 'A rota inclui uma entrega em local que você considera inseguro. Como procede?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'situacional', competencia: 'Avaliação de Riscos' },
  { area: 'logistica', texto: 'Você percebe que um colega motorista está com dificuldades nas entregas. Como ajuda?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'situacional', competencia: 'Apoio entre Colegas' },
  { area: 'logistica', texto: 'O sistema de roteirização está fora do ar e você precisa organizar as entregas. O que faz?', cargo: 'Motorista de Entrega', nivel: 'pleno', categoria: 'situacional', competencia: 'Autonomia Operacional' },
];

// ============================================
// ESTOQUISTA
// ============================================

export const estoquistaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Como você realiza a organização de produtos nas prateleiras seguindo o endereçamento?', cargo: 'Estoquista', nivel: 'junior', categoria: 'tecnica', competencia: 'Endereçamento de Produtos' },
  { area: 'logistica', texto: 'Quais são os princípios do FIFO/FEFO e como você os aplica na armazenagem?', cargo: 'Estoquista', nivel: 'junior', categoria: 'tecnica', competencia: 'FIFO/FEFO' },
  { area: 'logistica', texto: 'Como você utiliza equipamentos como paleteiras e carrinhos de forma segura?', cargo: 'Estoquista', nivel: 'junior', categoria: 'tecnica', competencia: 'Equipamentos de Movimentação' },
  { area: 'logistica', texto: 'Quais informações você registra ao movimentar produtos no estoque?', cargo: 'Estoquista', nivel: 'junior', categoria: 'tecnica', competencia: 'Registro de Movimentações' },
  { area: 'logistica', texto: 'Como você identifica e trata produtos com validade próxima do vencimento?', cargo: 'Estoquista', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Validade' },
  { area: 'logistica', texto: 'Quais cuidados você toma ao armazenar produtos que exigem condições especiais?', cargo: 'Estoquista', nivel: 'junior', categoria: 'tecnica', competencia: 'Armazenagem Especial' },

  // Experiência (5)
  { area: 'logistica', texto: 'Conte sobre sua experiência anterior com atividades de estoque ou armazenagem.', cargo: 'Estoquista', nivel: 'junior', categoria: 'experiencia', competencia: 'Experiência em Estoque' },
  { area: 'logistica', texto: 'Descreva uma situação em que você identificou um problema na organização do estoque.', cargo: 'Estoquista', nivel: 'junior', categoria: 'experiencia', competencia: 'Identificação de Problemas' },
  { area: 'logistica', texto: 'Como foi sua adaptação ao uso de sistemas de controle de estoque?', cargo: 'Estoquista', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas de Estoque' },
  { area: 'logistica', texto: 'Descreva um momento em que sua organização ajudou a agilizar uma operação.', cargo: 'Estoquista', nivel: 'junior', categoria: 'experiencia', competencia: 'Organização Eficiente' },
  { area: 'logistica', texto: 'Conte sobre sua participação em inventários ou contagens de estoque.', cargo: 'Estoquista', nivel: 'junior', categoria: 'experiencia', competencia: 'Inventário' },

  // Comportamental (5)
  { area: 'logistica', texto: 'Como você mantém a organização do seu setor ao longo do expediente?', cargo: 'Estoquista', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'logistica', texto: 'De que forma você lida com o trabalho físico repetitivo de movimentação de cargas?', cargo: 'Estoquista', nivel: 'junior', categoria: 'comportamental', competencia: 'Resistência Física' },
  { area: 'logistica', texto: 'Como você colabora com colegas em atividades que exigem trabalho em equipe?', cargo: 'Estoquista', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'logistica', texto: 'Descreva como você mantém a atenção aos detalhes durante tarefas repetitivas.', cargo: 'Estoquista', nivel: 'junior', categoria: 'comportamental', competencia: 'Atenção aos Detalhes' },
  { area: 'logistica', texto: 'Como você reage quando recebe uma tarefa urgente no meio de outra atividade?', cargo: 'Estoquista', nivel: 'junior', categoria: 'comportamental', competencia: 'Flexibilidade' },

  // Situacional (5)
  { area: 'logistica', texto: 'Você encontra um produto armazenado no endereço errado. O que faz?', cargo: 'Estoquista', nivel: 'junior', categoria: 'situacional', competencia: 'Correção de Endereçamento' },
  { area: 'logistica', texto: 'Um produto cai e se danifica durante a movimentação. Como você procede?', cargo: 'Estoquista', nivel: 'junior', categoria: 'situacional', competencia: 'Tratamento de Avarias' },
  { area: 'logistica', texto: 'O espaço no corredor está bloqueado e você precisa armazenar mercadorias. O que faz?', cargo: 'Estoquista', nivel: 'junior', categoria: 'situacional', competencia: 'Resolução de Problemas' },
  { area: 'logistica', texto: 'Você percebe que falta espaço para armazenar um recebimento grande. Como resolve?', cargo: 'Estoquista', nivel: 'junior', categoria: 'situacional', competencia: 'Otimização de Espaço' },
  { area: 'logistica', texto: 'Um colega está tendo dificuldade com uma carga pesada. Como você ajuda?', cargo: 'Estoquista', nivel: 'junior', categoria: 'situacional', competencia: 'Colaboração' },
];

export const estoquistaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'logistica', texto: 'Como você organiza a distribuição de produtos considerando giro e frequência de saída?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Curva ABC' },
  { area: 'logistica', texto: 'Quais técnicas você aplica para otimizar o espaço de armazenamento?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Otimização de Espaço' },
  { area: 'logistica', texto: 'Como você conduz a conferência cíclica de estoque na sua área de responsabilidade?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Inventário Cíclico' },
  { area: 'logistica', texto: 'Quais indicadores você acompanha para avaliar a acuracidade do estoque?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Estoque' },
  { area: 'logistica', texto: 'Como você utiliza o sistema WMS para suas atividades diárias?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Utilização de WMS' },
  { area: 'logistica', texto: 'Quais procedimentos você segue para segregação de produtos não conformes?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Segregação de Produtos' },

  // Experiência (6)
  { area: 'logistica', texto: 'Conte sobre uma melhoria que você implementou na organização do estoque.', cargo: 'Estoquista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'logistica', texto: 'Descreva como você treinou colegas mais novos nas atividades de estoque.', cargo: 'Estoquista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Equipe' },
  { area: 'logistica', texto: 'Como foi sua experiência liderando inventários gerais ou específicos?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Liderança de Inventário' },
  { area: 'logistica', texto: 'Descreva uma situação em que você identificou e corrigiu um problema recorrente no estoque.', cargo: 'Estoquista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Correção de Problemas' },
  { area: 'logistica', texto: 'Conte sobre sua experiência com reorganização de layout de armazém.', cargo: 'Estoquista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reorganização de Layout' },
  { area: 'logistica', texto: 'Descreva como você lidou com um pico de demanda que exigiu reorganização do estoque.', cargo: 'Estoquista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Picos' },

  // Comportamental (6)
  { area: 'logistica', texto: 'Como você equilibra velocidade e organização nas atividades de estoque?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Velocidade-Organização' },
  { area: 'logistica', texto: 'De que forma você contribui para manter os padrões de segurança no armazém?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Segurança no Trabalho' },
  { area: 'logistica', texto: 'Como você lida com mudanças nos procedimentos ou no layout do estoque?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'logistica', texto: 'Descreva como você se comunica com outras áreas quando há problemas de estoque.', cargo: 'Estoquista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Interdepartamental' },
  { area: 'logistica', texto: 'Como você mantém a motivação em períodos de alta demanda?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'logistica', texto: 'De que forma você busca aprender novas habilidades na área de logística?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Autodesenvolvimento' },

  // Situacional (6)
  { area: 'logistica', texto: 'O inventário identifica divergência significativa em um produto de alto giro. Como investiga?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'situacional', competencia: 'Investigação de Divergências' },
  { area: 'logistica', texto: 'A área de vendas pede prioridade para separação de um pedido que não está na sequência. O que faz?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Prioridades' },
  { area: 'logistica', texto: 'Você percebe que um colega está cometendo erros frequentes de endereçamento. Como aborda?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback Construtivo' },
  { area: 'logistica', texto: 'Um produto que deveria estar disponível não é encontrado no endereço. Como resolve?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'situacional', competencia: 'Localização de Produtos' },
  { area: 'logistica', texto: 'O sistema indica estoque zero mas você sabe que há produto físico. O que faz?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'situacional', competencia: 'Divergência Sistema x Físico' },
  { area: 'logistica', texto: 'Você identifica que a disposição atual de produtos está causando ineficiência. Como propõe mudanças?', cargo: 'Estoquista', nivel: 'pleno', categoria: 'situacional', competencia: 'Proposta de Melhorias' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasLogistica: PerguntaSeed[] = [
  ...auxiliarLogisticaJunior,
  ...auxiliarLogisticaPleno,
  ...analistaLogisticaJunior,
  ...analistaLogisticaPleno,
  ...analistaLogisticaSenior,
  ...conferenteJunior,
  ...conferentePleno,
  ...coordenadorLogisticaSenior,
  ...motoristaEntregasJunior,
  ...motoristaEntregasPleno,
  ...estoquistaJunior,
  ...estoquistaPleno,
];

export const estatisticasLogistica = {
  total: perguntasLogistica.length,
  porCargo: {
    'Auxiliar de Logística Junior': auxiliarLogisticaJunior.length,
    'Auxiliar de Logística Pleno': auxiliarLogisticaPleno.length,
    'Analista de Logística Junior': analistaLogisticaJunior.length,
    'Analista de Logística Pleno': analistaLogisticaPleno.length,
    'Analista de Logística Senior': analistaLogisticaSenior.length,
    'Conferente de Mercadorias Junior': conferenteJunior.length,
    'Conferente de Mercadorias Pleno': conferentePleno.length,
    'Coordenador de Logística Senior': coordenadorLogisticaSenior.length,
    'Motorista de Entrega Junior': motoristaEntregasJunior.length,
    'Motorista de Entrega Pleno': motoristaEntregasPleno.length,
    'Estoquista Junior': estoquistaJunior.length,
    'Estoquista Pleno': estoquistaPleno.length,
  },
};
