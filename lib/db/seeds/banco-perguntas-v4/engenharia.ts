/**
 * Banco de Perguntas v4 - Engenharia
 *
 * Cargos incluídos (Parte 1):
 * - Engenheiro Civil (Junior, Pleno, Senior)
 * - Engenheiro de Produção (Junior, Pleno, Senior)
 * - Técnico de Segurança do Trabalho (Junior, Pleno, Senior)
 *
 * Cargos incluídos (Parte 2):
 * - Técnico em Edificações (Junior, Pleno)
 * - Mestre de Obras (Pleno, Senior)
 * - Engenheiro Ambiental (Junior, Pleno, Senior)
 *
 * Total: ~389 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// ENGENHEIRO CIVIL
// ============================================

export const engenheiroCivilJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Quais são as principais etapas de um cronograma físico-financeiro de obra?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Planejamento de Obras' },
  { area: 'engenharia', texto: 'Como você realiza a leitura e interpretação de projetos estruturais?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Leitura de Projetos' },
  { area: 'engenharia', texto: 'Quais são os principais ensaios de controle tecnológico do concreto?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Qualidade' },
  { area: 'engenharia', texto: 'Como você calcula o consumo de materiais para execução de uma alvenaria?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Quantificação de Materiais' },
  { area: 'engenharia', texto: 'Quais normas técnicas você utiliza como referência para execução de fundações?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Normas Técnicas' },
  { area: 'engenharia', texto: 'Como você acompanha a execução de uma concretagem em obra?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'tecnica', competencia: 'Acompanhamento de Concretagem' },

  // Experiência (5)
  { area: 'engenharia', texto: 'Conte sobre sua experiência com acompanhamento de obras residenciais ou comerciais.', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Acompanhamento de Obras' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você identificou uma não conformidade na execução de serviços.', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Controle de Qualidade' },
  { area: 'engenharia', texto: 'Como foi sua experiência com elaboração de relatórios técnicos de obra?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Relatórios Técnicos' },
  { area: 'engenharia', texto: 'Descreva um projeto que você acompanhou desde a fundação até a estrutura.', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Execução de Estruturas' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com medições e levantamentos topográficos.', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'experiencia', competencia: 'Topografia' },

  // Comportamental (5)
  { area: 'engenharia', texto: 'Como você lida com prazos apertados e pressão por entrega em obras?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Prazos' },
  { area: 'engenharia', texto: 'De que forma você se comunica com a equipe de campo para garantir a qualidade dos serviços?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'engenharia', texto: 'Como você reage quando encontra divergências entre o projeto e a execução?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'engenharia', texto: 'Descreva como você busca atualização sobre novas técnicas e materiais de construção.', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'engenharia', texto: 'Como você organiza suas atividades diárias no canteiro de obras?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },

  // Situacional (5)
  { area: 'engenharia', texto: 'Durante uma concretagem, você percebe que o slump do concreto está fora do especificado. O que faz?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Concreto' },
  { area: 'engenharia', texto: 'O mestre de obras questiona uma especificação do projeto. Como você procede?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação Técnica' },
  { area: 'engenharia', texto: 'Você identifica um erro de locação após o início da fundação. O que faz?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Erros' },
  { area: 'engenharia', texto: 'O fornecedor entrega material com especificação diferente da pedida. Como age?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Materiais' },
  { area: 'engenharia', texto: 'Condições climáticas adversas impedem a execução do serviço planejado. Como você reorganiza?', cargo: 'Engenheiro Civil', nivel: 'junior', categoria: 'situacional', competencia: 'Replanejamento' },
];

export const engenheiroCivilPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você elabora e controla o orçamento de uma obra de médio porte?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Orçamento de Obras' },
  { area: 'engenharia', texto: 'Quais metodologias você utiliza para planejamento e controle de obras (PERT/CPM, Linha de Balanço)?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Metodologias de Planejamento' },
  { area: 'engenharia', texto: 'Como você gerencia as interfaces entre diferentes disciplinas de projeto na obra?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Compatibilização de Projetos' },
  { area: 'engenharia', texto: 'Quais indicadores você utiliza para monitorar a produtividade da mão de obra?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Produtividade' },
  { area: 'engenharia', texto: 'Como você estrutura um programa de controle de qualidade para a obra?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Programa de Qualidade' },
  { area: 'engenharia', texto: 'Quais critérios você utiliza para seleção e qualificação de empreiteiros e fornecedores?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Fornecedores' },

  // Experiência (6)
  { area: 'engenharia', texto: 'Conte sobre uma obra que você gerenciou e os principais desafios enfrentados.', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Obras' },
  { area: 'engenharia', texto: 'Descreva como você implementou melhorias de produtividade em uma obra.', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Produtividade' },
  { area: 'engenharia', texto: 'Como foi sua experiência com gestão de contratos de empreitada?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Contratos' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você precisou renegociar prazos ou custos com o cliente.', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com implementação de sistemas de gestão em obras.', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Sistemas de Gestão' },
  { area: 'engenharia', texto: 'Descreva um problema técnico complexo que você solucionou durante a execução.', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Solução de Problemas Técnicos' },

  // Comportamental (6)
  { area: 'engenharia', texto: 'Como você equilibra qualidade, prazo e custo nas decisões de obra?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'engenharia', texto: 'De que forma você desenvolve a equipe de campo sob sua supervisão?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },
  { area: 'engenharia', texto: 'Como você lida com conflitos entre diferentes empreiteiros ou equipes na obra?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'engenharia', texto: 'Descreva como você mantém o cliente informado sobre o andamento da obra.', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento com Cliente' },
  { area: 'engenharia', texto: 'Como você promove a cultura de segurança do trabalho na obra?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura de Segurança' },
  { area: 'engenharia', texto: 'De que forma você se mantém atualizado sobre inovações na construção civil?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Inovação' },

  // Situacional (6)
  { area: 'engenharia', texto: 'A obra está atrasada e o cliente pressiona por recuperação do cronograma. O que você propõe?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Recuperação de Cronograma' },
  { area: 'engenharia', texto: 'Um empreiteiro entrega serviço com qualidade abaixo do especificado. Como você age?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Qualidade' },
  { area: 'engenharia', texto: 'O custo real da obra está excedendo o orçamento previsto. Como você analisa e atua?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Controle de Custos' },
  { area: 'engenharia', texto: 'Surge uma interferência não prevista no projeto que impacta o cronograma. O que faz?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Interferências' },
  { area: 'engenharia', texto: 'A fiscalização aponta uma não conformidade que você discorda. Como procede?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Relacionamento com Fiscalização' },
  { area: 'engenharia', texto: 'Dois subempreiteiros disputam prioridade de acesso à mesma área. Como você resolve?', cargo: 'Engenheiro Civil', nivel: 'pleno', categoria: 'situacional', competencia: 'Coordenação de Equipes' },
];

export const engenheiroCivilSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'engenharia', texto: 'Como você estrutura a gestão de múltiplas obras simultâneas?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Portfólio' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para análise de viabilidade técnico-econômica de empreendimentos?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Viabilidade de Empreendimentos' },
  { area: 'engenharia', texto: 'Como você implementa metodologias BIM na gestão de projetos e obras?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'BIM' },
  { area: 'engenharia', texto: 'Quais estratégias você utiliza para gestão de riscos em grandes empreendimentos?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Riscos' },
  { area: 'engenharia', texto: 'Como você estrutura a análise de desempenho e benchmarking entre obras?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Benchmarking' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para otimização de processos construtivos?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Otimização de Processos' },
  { area: 'engenharia', texto: 'Como você avalia e implementa novas tecnologias construtivas?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'tecnica', competencia: 'Inovação Tecnológica' },

  // Experiência (7)
  { area: 'engenharia', texto: 'Conte sobre o maior empreendimento que você gerenciou em termos de complexidade.', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Grandes Empreendimentos' },
  { area: 'engenharia', texto: 'Descreva como você estruturou a área de engenharia de uma construtora ou incorporadora.', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Áreas' },
  { area: 'engenharia', texto: 'Como foi sua experiência com implementação de programas de qualidade certificados?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Certificações de Qualidade' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você precisou reverter um projeto em crise.', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },
  { area: 'engenharia', texto: 'Conte sobre como você desenvolveu engenheiros e gestores na sua equipe.', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Líderes' },
  { area: 'engenharia', texto: 'Descreva sua experiência com projetos de infraestrutura de grande porte.', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de Infraestrutura' },
  { area: 'engenharia', texto: 'Como foi sua participação na definição de estratégias construtivas de longo prazo?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'experiencia', competencia: 'Planejamento Estratégico' },

  // Comportamental (7)
  { area: 'engenharia', texto: 'Como você desenvolve uma cultura de excelência técnica na organização?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Excelência' },
  { area: 'engenharia', texto: 'De que forma você equilibra inovação com controle de riscos em empreendimentos?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação Responsável' },
  { area: 'engenharia', texto: 'Como você constrói credibilidade com stakeholders de diferentes níveis?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Credibilidade' },
  { area: 'engenharia', texto: 'Descreva como você promove sustentabilidade nas práticas construtivas.', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Sustentabilidade' },
  { area: 'engenharia', texto: 'Como você lida com decisões que envolvem trade-offs significativos?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão Estratégica' },
  { area: 'engenharia', texto: 'De que forma você promove a colaboração entre diferentes áreas da empresa?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Colaboração Interfuncional' },
  { area: 'engenharia', texto: 'Como você se mantém atualizado sobre tendências e regulamentações do setor?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Mercado' },

  // Situacional (7)
  { area: 'engenharia', texto: 'A diretoria questiona a viabilidade de um empreendimento que você defende. Como apresenta?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Projetos' },
  { area: 'engenharia', texto: 'Um acidente grave ocorre em uma das suas obras. Quais são suas primeiras ações?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crises' },
  { area: 'engenharia', texto: 'A empresa considera adotar uma nova tecnologia construtiva disruptiva. Como você avalia?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Avaliação de Tecnologias' },
  { area: 'engenharia', texto: 'Mudanças regulatórias impactam significativamente os projetos em andamento. O que você faz?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Mudanças Regulatórias' },
  { area: 'engenharia', texto: 'Você identifica que a estratégia construtiva atual não suporta o crescimento planejado. O que propõe?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento de Capacidade' },
  { area: 'engenharia', texto: 'Um parceiro estratégico apresenta problemas graves de qualidade. Como você conduz?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Parceiros' },
  { area: 'engenharia', texto: 'A empresa precisa reduzir custos operacionais em 20% sem comprometer qualidade. Qual seu plano?', cargo: 'Engenheiro Civil', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização de Custos' },
];

// ============================================
// ENGENHEIRO DE PRODUÇÃO
// ============================================

export const engenheiroProducaoJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você aplica as ferramentas básicas da qualidade (Pareto, Ishikawa, 5W2H) no dia a dia?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'tecnica', competencia: 'Ferramentas da Qualidade' },
  { area: 'engenharia', texto: 'Quais são os principais indicadores de desempenho que você monitora em uma linha de produção?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'tecnica', competencia: 'Indicadores de Produção' },
  { area: 'engenharia', texto: 'Como você realiza um estudo de tempos e métodos para análise de processos?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'tecnica', competencia: 'Tempos e Métodos' },
  { area: 'engenharia', texto: 'Quais técnicas você utiliza para mapeamento de processos produtivos?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'tecnica', competencia: 'Mapeamento de Processos' },
  { area: 'engenharia', texto: 'Como você calcula a eficiência global de equipamentos (OEE)?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'tecnica', competencia: 'OEE' },
  { area: 'engenharia', texto: 'Quais são os princípios básicos do Sistema Toyota de Produção que você aplica?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'tecnica', competencia: 'Lean Manufacturing' },

  // Experiência (5)
  { area: 'engenharia', texto: 'Conte sobre sua experiência com análise e melhoria de processos produtivos.', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você identificou um gargalo de produção e como atuou.', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'experiencia', competencia: 'Identificação de Gargalos' },
  { area: 'engenharia', texto: 'Como foi sua experiência com elaboração de procedimentos operacionais padrão?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'experiencia', competencia: 'Padronização' },
  { area: 'engenharia', texto: 'Descreva um projeto de melhoria que você participou e quais foram os resultados.', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos de Melhoria' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com coleta e análise de dados de produção.', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'experiencia', competencia: 'Análise de Dados' },

  // Comportamental (5)
  { area: 'engenharia', texto: 'Como você lida com resistência dos operadores ao implementar mudanças de processo?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Mudanças' },
  { area: 'engenharia', texto: 'De que forma você se comunica com a equipe de produção para entender os problemas?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'engenharia', texto: 'Como você prioriza suas atividades quando há múltiplos problemas na produção?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'comportamental', competencia: 'Priorização' },
  { area: 'engenharia', texto: 'Descreva como você busca aprendizado contínuo sobre metodologias de engenharia.', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'comportamental', competencia: 'Autodesenvolvimento' },
  { area: 'engenharia', texto: 'Como você lida com a pressão por resultados rápidos em projetos de melhoria?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho sob Pressão' },

  // Situacional (5)
  { area: 'engenharia', texto: 'A linha de produção para por um problema que você nunca viu. Como você investiga?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'situacional', competencia: 'Análise de Causa Raiz' },
  { area: 'engenharia', texto: 'O supervisor questiona os dados da sua análise. Como você procede?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'situacional', competencia: 'Defesa Técnica' },
  { area: 'engenharia', texto: 'Uma melhoria que você propôs não funcionou como esperado. O que você faz?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'situacional', competencia: 'Aprendizado com Falhas' },
  { area: 'engenharia', texto: 'Você identifica um desperdício significativo no processo mas a mudança é complexa. Como apresenta?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'situacional', competencia: 'Proposição de Melhorias' },
  { area: 'engenharia', texto: 'Os dados coletados são inconsistentes com o que você observa no chão de fábrica. Como resolve?', cargo: 'Engenheiro de Produção', nivel: 'junior', categoria: 'situacional', competencia: 'Validação de Dados' },
];

export const engenheiroProducaoPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você estrutura um projeto de implementação Lean em uma área produtiva?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'tecnica', competencia: 'Implementação Lean' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para balanceamento de linhas de produção?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'tecnica', competencia: 'Balanceamento de Linha' },
  { area: 'engenharia', texto: 'Como você desenvolve e gerencia um programa de melhoria contínua (Kaizen)?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'tecnica', competencia: 'Programa Kaizen' },
  { area: 'engenharia', texto: 'Quais técnicas você utiliza para análise de capacidade e planejamento de produção?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento de Capacidade' },
  { area: 'engenharia', texto: 'Como você estrutura indicadores de desempenho alinhados aos objetivos estratégicos?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Indicadores' },
  { area: 'engenharia', texto: 'Quais ferramentas estatísticas você aplica para controle e melhoria de processos?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle Estatístico' },

  // Experiência (6)
  { area: 'engenharia', texto: 'Conte sobre um projeto de redução de custos que você liderou e os resultados obtidos.', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redução de Custos' },
  { area: 'engenharia', texto: 'Descreva como você implementou um sistema de gestão visual na produção.', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão Visual' },
  { area: 'engenharia', texto: 'Como foi sua experiência com implementação de células de manufatura?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'experiencia', competencia: 'Layout Celular' },
  { area: 'engenharia', texto: 'Descreva um projeto de aumento de produtividade que você conduziu.', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'experiencia', competencia: 'Aumento de Produtividade' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com sistemas MES ou ERP para gestão da produção.', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'experiencia', competencia: 'Sistemas de Gestão' },
  { area: 'engenharia', texto: 'Descreva como você treinou e desenvolveu equipes em metodologias de melhoria.', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Equipes' },

  // Comportamental (6)
  { area: 'engenharia', texto: 'Como você engaja a equipe operacional nos projetos de melhoria?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'comportamental', competencia: 'Engajamento de Equipe' },
  { area: 'engenharia', texto: 'De que forma você equilibra análises detalhadas com a necessidade de ação rápida?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Análise-Ação' },
  { area: 'engenharia', texto: 'Como você lida com conflitos entre área de produção e engenharia?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'engenharia', texto: 'Descreva como você mantém o foco em resultados sustentáveis de longo prazo.', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },
  { area: 'engenharia', texto: 'Como você promove a cultura de melhoria contínua na organização?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura de Melhoria' },
  { area: 'engenharia', texto: 'De que forma você se desenvolve em novas metodologias e tecnologias?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento Contínuo' },

  // Situacional (6)
  { area: 'engenharia', texto: 'A produção não atinge as metas há três meses consecutivos. Qual seu plano de ação?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'situacional', competencia: 'Plano de Recuperação' },
  { area: 'engenharia', texto: 'Uma melhoria implementada gerou um problema em outra área. Como você resolve?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Impactos' },
  { area: 'engenharia', texto: 'O gestor da área questiona a prioridade do projeto que você está conduzindo. Como age?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'situacional', competencia: 'Alinhamento de Prioridades' },
  { area: 'engenharia', texto: 'Você identifica oportunidade de automação que exige investimento significativo. Como apresenta?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'situacional', competencia: 'Business Case' },
  { area: 'engenharia', texto: 'A equipe operacional resiste a uma mudança que trará ganhos comprovados. O que você faz?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Resistência' },
  { area: 'engenharia', texto: 'Os indicadores melhoraram mas a percepção da equipe é de piora. Como você investiga?', cargo: 'Engenheiro de Produção', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise Qualitativa' },
];

export const engenheiroProducaoSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'engenharia', texto: 'Como você estrutura um programa de excelência operacional para toda a organização?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'tecnica', competencia: 'Excelência Operacional' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para transformação digital da manufatura (Indústria 4.0)?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'tecnica', competencia: 'Indústria 4.0' },
  { area: 'engenharia', texto: 'Como você desenvolve estratégias de manufatura alinhadas aos objetivos de negócio?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de Manufatura' },
  { area: 'engenharia', texto: 'Quais frameworks você utiliza para avaliação de maturidade operacional?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação de Maturidade' },
  { area: 'engenharia', texto: 'Como você estrutura programas de desenvolvimento de fornecedores?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'tecnica', competencia: 'Desenvolvimento de Fornecedores' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para gestão de portfólio de projetos de melhoria?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Portfólio' },
  { area: 'engenharia', texto: 'Como você avalia e implementa tecnologias emergentes na manufatura?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'tecnica', competencia: 'Inovação Tecnológica' },

  // Experiência (7)
  { area: 'engenharia', texto: 'Conte sobre uma transformação operacional de grande escala que você liderou.', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Operacional' },
  { area: 'engenharia', texto: 'Descreva como você estruturou a área de engenharia de processos de uma empresa.', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Áreas' },
  { area: 'engenharia', texto: 'Como foi sua experiência com implementação de programas Lean/Six Sigma certificados?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'experiencia', competencia: 'Programas Certificados' },
  { area: 'engenharia', texto: 'Descreva um caso em que você reverteu uma operação em crise de produtividade.', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround Operacional' },
  { area: 'engenharia', texto: 'Conte sobre como você desenvolveu líderes de melhoria contínua na organização.', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Líderes' },
  { area: 'engenharia', texto: 'Descreva sua experiência com projetos de automação e digitalização de processos.', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'experiencia', competencia: 'Automação de Processos' },
  { area: 'engenharia', texto: 'Como foi sua participação na definição de estratégias industriais de longo prazo?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'experiencia', competencia: 'Planejamento Estratégico' },

  // Comportamental (7)
  { area: 'engenharia', texto: 'Como você desenvolve uma cultura de excelência operacional na organização?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura Organizacional' },
  { area: 'engenharia', texto: 'De que forma você equilibra padronização com flexibilidade para inovação?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Padrão-Inovação' },
  { area: 'engenharia', texto: 'Como você constrói influência em níveis executivos para projetos de melhoria?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Executiva' },
  { area: 'engenharia', texto: 'Descreva como você promove colaboração entre plantas ou unidades de negócio.', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'comportamental', competencia: 'Colaboração entre Unidades' },
  { area: 'engenharia', texto: 'Como você lida com fracassos em projetos de grande visibilidade?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'engenharia', texto: 'De que forma você promove sustentabilidade nas operações industriais?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'comportamental', competencia: 'Sustentabilidade' },
  { area: 'engenharia', texto: 'Como você se mantém atualizado sobre tendências globais de manufatura?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Global' },

  // Situacional (7)
  { area: 'engenharia', texto: 'A diretoria questiona o ROI do programa de excelência operacional. Como você defende?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Investimentos' },
  { area: 'engenharia', texto: 'Uma nova tecnologia disruptiva ameaça o modelo operacional atual. O que você propõe?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptação Tecnológica' },
  { area: 'engenharia', texto: 'A empresa precisa aumentar capacidade em 50% com investimento mínimo. Qual seu plano?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização de Capacidade' },
  { area: 'engenharia', texto: 'Você identifica que práticas bem-sucedidas não estão sendo replicadas entre plantas. Como atua?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'situacional', competencia: 'Transferência de Conhecimento' },
  { area: 'engenharia', texto: 'A cultura da organização dificulta a adoção de metodologias ágeis. Como você conduz?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'situacional', competencia: 'Mudança Cultural' },
  { area: 'engenharia', texto: 'Um projeto estratégico de automação está atrasado e acima do orçamento. O que você faz?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Projetos Críticos' },
  { area: 'engenharia', texto: 'Mudanças regulatórias exigem adaptações significativas nos processos. Como você planeja?', cargo: 'Engenheiro de Produção', nivel: 'senior', categoria: 'situacional', competencia: 'Compliance Regulatório' },
];

// ============================================
// TÉCNICO DE SEGURANÇA DO TRABALHO
// ============================================

export const tecnicoSegurancaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Quais são as principais Normas Regulamentadoras (NRs) que você aplica no dia a dia?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'tecnica', competencia: 'Normas Regulamentadoras' },
  { area: 'engenharia', texto: 'Como você realiza uma inspeção de segurança em um ambiente de trabalho?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'tecnica', competencia: 'Inspeções de Segurança' },
  { area: 'engenharia', texto: 'Quais são os principais tipos de Equipamentos de Proteção Individual e suas aplicações?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'tecnica', competencia: 'EPIs' },
  { area: 'engenharia', texto: 'Como você elabora um Diálogo Diário de Segurança (DDS) efetivo?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'tecnica', competencia: 'DDS' },
  { area: 'engenharia', texto: 'Quais são os procedimentos para investigação de um acidente de trabalho?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'tecnica', competencia: 'Investigação de Acidentes' },
  { area: 'engenharia', texto: 'Como você identifica e classifica os riscos ambientais em um posto de trabalho?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'tecnica', competencia: 'Análise de Riscos' },

  // Experiência (5)
  { area: 'engenharia', texto: 'Conte sobre sua experiência com implementação de programas de segurança.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'experiencia', competencia: 'Programas de Segurança' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você identificou e corrigiu uma condição insegura.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'experiencia', competencia: 'Ação Corretiva' },
  { area: 'engenharia', texto: 'Como foi sua experiência com treinamentos de segurança para trabalhadores?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'experiencia', competencia: 'Treinamentos' },
  { area: 'engenharia', texto: 'Descreva sua participação em CIPA ou outros comitês de segurança.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'experiencia', competencia: 'CIPA' },
  { area: 'engenharia', texto: 'Conte sobre uma investigação de acidente ou incidente que você conduziu.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'experiencia', competencia: 'Investigação de Acidentes' },

  // Comportamental (5)
  { area: 'engenharia', texto: 'Como você lida com trabalhadores que resistem ao uso de EPIs?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'comportamental', competencia: 'Conscientização' },
  { area: 'engenharia', texto: 'De que forma você se comunica sobre riscos de forma que os trabalhadores compreendam?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'engenharia', texto: 'Como você mantém a firmeza em questões de segurança sem criar conflitos?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'comportamental', competencia: 'Assertividade' },
  { area: 'engenharia', texto: 'Descreva como você se mantém atualizado sobre legislação e boas práticas de segurança.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'engenharia', texto: 'Como você lida com situações em que a produção pressiona para flexibilizar normas de segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'comportamental', competencia: 'Integridade' },

  // Situacional (5)
  { area: 'engenharia', texto: 'Você observa um trabalhador realizando uma atividade de risco sem EPI. O que faz?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'situacional', competencia: 'Intervenção Imediata' },
  { area: 'engenharia', texto: 'Durante uma inspeção, você identifica um risco grave que exige parada imediata. Como procede?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Riscos Críticos' },
  { area: 'engenharia', texto: 'O supervisor solicita que você libere uma atividade que você considera insegura. O que faz?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'situacional', competencia: 'Recusa de Liberação' },
  { area: 'engenharia', texto: 'Um trabalhador se acidenta e você é o primeiro a chegar no local. Quais suas ações?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'situacional', competencia: 'Atendimento de Emergência' },
  { area: 'engenharia', texto: 'Você percebe que os treinamentos não estão sendo efetivos. Como você aborda isso?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'junior', categoria: 'situacional', competencia: 'Melhoria de Treinamentos' },
];

export const tecnicoSegurancaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você elabora e gerencia o PPRA/PGR de uma empresa?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'tecnica', competencia: 'PPRA/PGR' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para análise de risco de atividades críticas (APR, HAZOP)?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'tecnica', competencia: 'Metodologias de Análise' },
  { area: 'engenharia', texto: 'Como você estrutura um programa de prevenção de acidentes com resultados mensuráveis?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'tecnica', competencia: 'Programas de Prevenção' },
  { area: 'engenharia', texto: 'Quais indicadores você utiliza para gestão da segurança do trabalho?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Segurança' },
  { area: 'engenharia', texto: 'Como você desenvolve procedimentos de trabalho seguro para atividades de alto risco?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'tecnica', competencia: 'Procedimentos de Segurança' },
  { area: 'engenharia', texto: 'Quais técnicas você utiliza para investigação aprofundada de causas de acidentes?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise de Causa Raiz' },

  // Experiência (6)
  { area: 'engenharia', texto: 'Conte sobre um programa de segurança que você implementou e os resultados obtidos.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de Programas' },
  { area: 'engenharia', texto: 'Descreva como você desenvolveu a cultura de segurança em uma área ou empresa.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'experiencia', competencia: 'Cultura de Segurança' },
  { area: 'engenharia', texto: 'Como foi sua experiência com gestão de brigada de emergência?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'experiencia', competencia: 'Brigada de Emergência' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você conseguiu reduzir significativamente o índice de acidentes.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redução de Acidentes' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com auditorias de segurança internas e externas.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditorias de Segurança' },
  { area: 'engenharia', texto: 'Descreva como você gerenciou múltiplas frentes de trabalho com riscos distintos.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Múltiplos Riscos' },

  // Comportamental (6)
  { area: 'engenharia', texto: 'Como você engaja lideranças operacionais nas iniciativas de segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'comportamental', competencia: 'Engajamento de Lideranças' },
  { area: 'engenharia', texto: 'De que forma você equilibra exigências legais com a realidade operacional?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { area: 'engenharia', texto: 'Como você lida com situações em que a gestão não prioriza investimentos em segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'comportamental', competencia: 'Influência' },
  { area: 'engenharia', texto: 'Descreva como você promove o protagonismo dos trabalhadores em segurança.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empoderamento' },
  { area: 'engenharia', texto: 'Como você mantém a motivação da equipe após um período sem acidentes?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'comportamental', competencia: 'Sustentação de Resultados' },
  { area: 'engenharia', texto: 'De que forma você desenvolve técnicos mais júniores na área?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },

  // Situacional (6)
  { area: 'engenharia', texto: 'A empresa sofre uma fiscalização e são identificadas não conformidades. Como você atua?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Fiscalização' },
  { area: 'engenharia', texto: 'Ocorre um acidente grave em uma área que você havia alertado sobre riscos. O que faz?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'situacional', competencia: 'Pós-Acidente' },
  { area: 'engenharia', texto: 'O orçamento para segurança foi cortado significativamente. Como você prioriza ações?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão com Recursos Limitados' },
  { area: 'engenharia', texto: 'Uma nova atividade de alto risco será iniciada e você tem pouco tempo para preparação. O que faz?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Prazos' },
  { area: 'engenharia', texto: 'Você identifica que um fornecedor não está cumprindo requisitos de segurança. Como procede?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Terceiros' },
  { area: 'engenharia', texto: 'Os indicadores mostram melhora mas você percebe comportamentos de risco no campo. Como investiga?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'pleno', categoria: 'situacional', competencia: 'Análise de Comportamento' },
];

export const tecnicoSegurancaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'engenharia', texto: 'Como você estrutura um Sistema de Gestão de Segurança e Saúde Ocupacional (ISO 45001)?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistema de Gestão SSO' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para gestão de segurança de processo (PSM)?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'tecnica', competencia: 'Segurança de Processos' },
  { area: 'engenharia', texto: 'Como você desenvolve estratégias de segurança comportamental baseadas em evidências?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'tecnica', competencia: 'Segurança Comportamental' },
  { area: 'engenharia', texto: 'Quais frameworks você utiliza para avaliação de maturidade em segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'tecnica', competencia: 'Maturidade em Segurança' },
  { area: 'engenharia', texto: 'Como você estrutura programas de gestão de mudanças com foco em segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Mudanças' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para análise preditiva de acidentes?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise Preditiva' },
  { area: 'engenharia', texto: 'Como você desenvolve programas de saúde ocupacional integrados à segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'tecnica', competencia: 'Saúde Ocupacional' },

  // Experiência (7)
  { area: 'engenharia', texto: 'Conte sobre uma transformação cultural em segurança que você liderou.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Cultural' },
  { area: 'engenharia', texto: 'Descreva como você implementou um sistema de gestão de segurança certificado.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'experiencia', competencia: 'Certificação de Sistemas' },
  { area: 'engenharia', texto: 'Como foi sua experiência com gestão de crises e acidentes de grande repercussão?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crises' },
  { area: 'engenharia', texto: 'Descreva como você estruturou a área de segurança de uma empresa ou unidade.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Áreas' },
  { area: 'engenharia', texto: 'Conte sobre como você desenvolveu profissionais de segurança na organização.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Profissionais' },
  { area: 'engenharia', texto: 'Descreva sua experiência com projetos de segurança em múltiplas unidades ou países.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos Multi-Site' },
  { area: 'engenharia', texto: 'Como foi sua participação na definição de políticas corporativas de segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'experiencia', competencia: 'Políticas Corporativas' },

  // Comportamental (7)
  { area: 'engenharia', texto: 'Como você desenvolve uma cultura de segurança que vai além do compliance?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura Proativa' },
  { area: 'engenharia', texto: 'De que forma você influencia decisões executivas sobre investimentos em segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Executiva' },
  { area: 'engenharia', texto: 'Como você equilibra rigor técnico com sensibilidade às realidades operacionais?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Técnico-Prático' },
  { area: 'engenharia', texto: 'Descreva como você promove a colaboração entre segurança e outras áreas.', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'comportamental', competencia: 'Colaboração Interfuncional' },
  { area: 'engenharia', texto: 'Como você lida com a responsabilidade de decisões que impactam vidas?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'comportamental', competencia: 'Responsabilidade' },
  { area: 'engenharia', texto: 'De que forma você promove inovação em práticas de segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação em Segurança' },
  { area: 'engenharia', texto: 'Como você se mantém atualizado sobre tendências globais em segurança?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Global' },

  // Situacional (7)
  { area: 'engenharia', texto: 'Ocorre um acidente fatal em uma das operações. Quais são suas primeiras ações?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'situacional', competencia: 'Resposta a Fatalidades' },
  { area: 'engenharia', texto: 'A empresa está em processo de certificação e há não conformidades críticas. Como atua?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Não Conformidades' },
  { area: 'engenharia', texto: 'Mudanças regulatórias significativas impactam todas as operações. Como você planeja?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptação Regulatória' },
  { area: 'engenharia', texto: 'A diretoria questiona se os investimentos em segurança justificam os resultados. Como responde?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'situacional', competencia: 'ROI de Segurança' },
  { area: 'engenharia', texto: 'Você identifica que uma unidade está maquiando indicadores de segurança. O que faz?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'situacional', competencia: 'Integridade de Dados' },
  { area: 'engenharia', texto: 'Uma nova operação de alto risco será iniciada em curto prazo. Como você se prepara?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Novas Operações' },
  { area: 'engenharia', texto: 'Surge uma tecnologia que pode revolucionar a segurança mas exige alto investimento. Como avalia?', cargo: 'Técnico de Segurança do Trabalho', nivel: 'senior', categoria: 'situacional', competencia: 'Avaliação de Tecnologias' },
];

// ============================================
// TÉCNICO EM EDIFICAÇÕES
// ============================================

export const tecnicoEdificacoesJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você realiza a leitura e interpretação de projetos arquitetônicos e estruturais?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'tecnica', competencia: 'Leitura de Projetos' },
  { area: 'engenharia', texto: 'Quais são os principais métodos de levantamento de quantitativos que você utiliza?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'tecnica', competencia: 'Levantamento de Quantitativos' },
  { area: 'engenharia', texto: 'Como você acompanha e fiscaliza a execução de alvenaria e revestimentos?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'tecnica', competencia: 'Fiscalização de Obras' },
  { area: 'engenharia', texto: 'Quais são as etapas de execução de uma fundação do tipo sapata?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'tecnica', competencia: 'Execução de Fundações' },
  { area: 'engenharia', texto: 'Como você verifica o prumo, nível e esquadro durante a execução de uma obra?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle Geométrico' },
  { area: 'engenharia', texto: 'Quais normas técnicas você aplica para controle de recebimento de materiais?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Materiais' },

  // Experiência (5)
  { area: 'engenharia', texto: 'Conte sobre sua experiência com acompanhamento de obras de edificações.', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'experiencia', competencia: 'Acompanhamento de Obras' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você identificou um problema de execução e como resolveu.', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'engenharia', texto: 'Como foi sua experiência com elaboração de relatórios diários de obra?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'experiencia', competencia: 'Relatórios de Obra' },
  { area: 'engenharia', texto: 'Descreva sua participação em medições de serviços executados.', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'experiencia', competencia: 'Medições' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com uso de equipamentos topográficos básicos.', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'experiencia', competencia: 'Topografia Básica' },

  // Comportamental (5)
  { area: 'engenharia', texto: 'Como você se comunica com a equipe de campo para garantir a qualidade dos serviços?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'engenharia', texto: 'De que forma você organiza suas atividades diárias no canteiro de obras?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'engenharia', texto: 'Como você lida com divergências entre o que está no projeto e o que a equipe quer executar?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'comportamental', competencia: 'Assertividade' },
  { area: 'engenharia', texto: 'Descreva como você busca aprendizado sobre novas técnicas construtivas.', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'comportamental', competencia: 'Autodesenvolvimento' },
  { area: 'engenharia', texto: 'Como você reage quando encontra erros na execução de serviços?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'comportamental', competencia: 'Proatividade' },

  // Situacional (5)
  { area: 'engenharia', texto: 'Você percebe que a alvenaria está sendo executada fora de prumo. O que faz?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Qualidade' },
  { area: 'engenharia', texto: 'O material entregue está diferente da especificação do projeto. Como procede?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Materiais' },
  { area: 'engenharia', texto: 'O pedreiro questiona uma especificação técnica que você indicou. Como age?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação Técnica' },
  { area: 'engenharia', texto: 'Você identifica uma inconsistência entre o projeto arquitetônico e o estrutural. O que faz?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'situacional', competencia: 'Compatibilização' },
  { area: 'engenharia', texto: 'Uma chuva forte interrompe os trabalhos no meio de uma concretagem. Como você procede?', cargo: 'Técnico em Edificações', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Imprevistos' },
];

export const tecnicoEdificacoesPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você elabora e controla um cronograma físico de obra?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento de Obras' },
  { area: 'engenharia', texto: 'Quais critérios você utiliza para aprovação de etapas construtivas?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'tecnica', competencia: 'Aprovação de Etapas' },
  { area: 'engenharia', texto: 'Como você gerencia as interfaces entre diferentes equipes de obra?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'tecnica', competencia: 'Coordenação de Equipes' },
  { area: 'engenharia', texto: 'Quais indicadores você monitora para avaliar o desempenho da obra?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Desempenho' },
  { area: 'engenharia', texto: 'Como você elabora especificações técnicas para contratação de serviços?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'tecnica', competencia: 'Especificações Técnicas' },
  { area: 'engenharia', texto: 'Quais técnicas você aplica para detecção e tratamento de patologias construtivas?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'tecnica', competencia: 'Patologias Construtivas' },

  // Experiência (6)
  { area: 'engenharia', texto: 'Conte sobre uma obra complexa que você acompanhou e os principais desafios.', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Obras Complexas' },
  { area: 'engenharia', texto: 'Descreva como você implementou melhorias no processo construtivo de uma obra.', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'engenharia', texto: 'Como foi sua experiência com gestão de empreiteiros e subcontratados?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Terceiros' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você precisou resolver um problema técnico complexo.', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas Técnicos' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com obras de reforma ou retrofit.', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'experiencia', competencia: 'Obras de Reforma' },
  { area: 'engenharia', texto: 'Descreva como você treinou equipes de campo em procedimentos de qualidade.', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Equipes' },

  // Comportamental (6)
  { area: 'engenharia', texto: 'Como você equilibra qualidade, prazo e custo nas decisões diárias da obra?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'engenharia', texto: 'De que forma você desenvolve a equipe de campo sob sua supervisão?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },
  { area: 'engenharia', texto: 'Como você lida com conflitos entre diferentes empreiteiros na obra?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'engenharia', texto: 'Descreva como você mantém o engenheiro responsável informado sobre a obra.', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Hierárquica' },
  { area: 'engenharia', texto: 'Como você promove a segurança do trabalho entre as equipes?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura de Segurança' },
  { area: 'engenharia', texto: 'De que forma você se atualiza sobre novos materiais e tecnologias construtivas?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização Técnica' },

  // Situacional (6)
  { area: 'engenharia', texto: 'A obra está atrasada e o cliente pressiona por recuperação. O que você propõe?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'situacional', competencia: 'Recuperação de Cronograma' },
  { area: 'engenharia', texto: 'Um empreiteiro entrega serviço com qualidade abaixo do especificado. Como age?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Qualidade' },
  { area: 'engenharia', texto: 'Surge uma interferência não prevista que impacta o cronograma. O que faz?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Interferências' },
  { area: 'engenharia', texto: 'A fiscalização aponta uma não conformidade que você discorda. Como procede?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'situacional', competencia: 'Relacionamento com Fiscalização' },
  { area: 'engenharia', texto: 'Você identifica que um serviço será executado de forma diferente do especificado. Como age?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'situacional', competencia: 'Controle de Execução' },
  { area: 'engenharia', texto: 'Duas equipes disputam prioridade de acesso à mesma área. Como resolve?', cargo: 'Técnico em Edificações', nivel: 'pleno', categoria: 'situacional', competencia: 'Coordenação de Frentes' },
];

// ============================================
// MESTRE DE OBRAS
// ============================================

export const mestreObrasPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você organiza e distribui as equipes de trabalho no canteiro de obras?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'tecnica', competencia: 'Organização de Equipes' },
  { area: 'engenharia', texto: 'Quais critérios você utiliza para aprovação de serviços executados?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'tecnica', competencia: 'Aprovação de Serviços' },
  { area: 'engenharia', texto: 'Como você controla o consumo de materiais e evita desperdícios na obra?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle de Materiais' },
  { area: 'engenharia', texto: 'Quais são os principais pontos de verificação durante uma concretagem?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle de Concretagem' },
  { area: 'engenharia', texto: 'Como você interpreta e transmite as informações dos projetos para a equipe?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'tecnica', competencia: 'Interpretação de Projetos' },
  { area: 'engenharia', texto: 'Quais técnicas você utiliza para garantir o alinhamento e prumo das estruturas?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle Geométrico' },

  // Experiência (6)
  { area: 'engenharia', texto: 'Conte sobre sua experiência em liderar equipes de obra de diferentes especialidades.', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'experiencia', competencia: 'Liderança de Equipes' },
  { area: 'engenharia', texto: 'Descreva uma obra desafiadora que você coordenou e como superou os obstáculos.', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Desafios' },
  { area: 'engenharia', texto: 'Como foi sua experiência com execução de estruturas de concreto armado?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'experiencia', competencia: 'Execução Estrutural' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você conseguiu melhorar a produtividade da equipe.', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Produtividade' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com diferentes tipos de edificações (residencial, comercial, industrial).', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'experiencia', competencia: 'Diversidade de Obras' },
  { area: 'engenharia', texto: 'Descreva como você formou e desenvolveu profissionais menos experientes.', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação de Profissionais' },

  // Comportamental (6)
  { area: 'engenharia', texto: 'Como você mantém a motivação da equipe durante períodos de trabalho intenso?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação de Equipe' },
  { area: 'engenharia', texto: 'De que forma você lida com trabalhadores que não estão rendendo conforme esperado?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Desempenho' },
  { area: 'engenharia', texto: 'Como você se comunica com o engenheiro responsável sobre problemas na obra?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Hierárquica' },
  { area: 'engenharia', texto: 'Descreva como você promove o trabalho em equipe no canteiro.', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'engenharia', texto: 'Como você garante que as normas de segurança sejam cumpridas pela equipe?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'comportamental', competencia: 'Segurança do Trabalho' },
  { area: 'engenharia', texto: 'De que forma você lida com pressão por prazos e metas de produção?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho sob Pressão' },

  // Situacional (6)
  { area: 'engenharia', texto: 'Um operário se recusa a usar EPI alegando desconforto. Como você age?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Segurança' },
  { area: 'engenharia', texto: 'O material necessário para o dia seguinte não foi entregue. O que você faz?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Imprevistos' },
  { area: 'engenharia', texto: 'Dois pedreiros estão em conflito e isso afeta a produtividade. Como resolve?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolução de Conflitos' },
  { area: 'engenharia', texto: 'Você identifica que um serviço foi executado de forma incorreta. Como procede?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'situacional', competencia: 'Correção de Serviços' },
  { area: 'engenharia', texto: 'O engenheiro solicita acelerar um serviço que você sabe que pode comprometer a qualidade. Como age?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'situacional', competencia: 'Equilíbrio Qualidade-Prazo' },
  { area: 'engenharia', texto: 'Condições climáticas adversas impedem a execução do trabalho planejado. Como você reorganiza?', cargo: 'Mestre de Obras', nivel: 'pleno', categoria: 'situacional', competencia: 'Replanejamento' },
];

export const mestreObrasSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'engenharia', texto: 'Como você planeja e coordena a execução de múltiplas frentes de trabalho simultaneamente?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'tecnica', competencia: 'Coordenação Multi-frentes' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para otimizar a produtividade das equipes?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'tecnica', competencia: 'Otimização de Produtividade' },
  { area: 'engenharia', texto: 'Como você gerencia a logística de materiais e equipamentos em obras de grande porte?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'tecnica', competencia: 'Logística de Obra' },
  { area: 'engenharia', texto: 'Quais critérios você utiliza para dimensionamento de equipes por etapa construtiva?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'tecnica', competencia: 'Dimensionamento de Equipes' },
  { area: 'engenharia', texto: 'Como você implementa e controla procedimentos de qualidade na execução?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão da Qualidade' },
  { area: 'engenharia', texto: 'Quais técnicas construtivas inovadoras você já implementou em obras?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'tecnica', competencia: 'Inovação Construtiva' },
  { area: 'engenharia', texto: 'Como você estrutura programas de prevenção de acidentes no canteiro?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'tecnica', competencia: 'Prevenção de Acidentes' },

  // Experiência (7)
  { area: 'engenharia', texto: 'Conte sobre a maior obra que você coordenou em termos de equipe e complexidade.', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'experiencia', competencia: 'Obras de Grande Porte' },
  { area: 'engenharia', texto: 'Descreva como você desenvolveu mestres e encarregados ao longo da carreira.', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Líderes' },
  { area: 'engenharia', texto: 'Como foi sua experiência com obras de alto padrão de acabamento?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'experiencia', competencia: 'Obras de Alto Padrão' },
  { area: 'engenharia', texto: 'Descreva uma situação crítica de prazo que você conseguiu contornar.', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Prazos Críticos' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com implantação de canteiros de obras.', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'experiencia', competencia: 'Implantação de Canteiros' },
  { area: 'engenharia', texto: 'Descreva como você gerenciou múltiplas equipes de diferentes empreiteiros.', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Múltiplas Equipes' },
  { area: 'engenharia', texto: 'Como foi sua participação na recuperação de obras com problemas de qualidade?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'experiencia', competencia: 'Recuperação de Obras' },

  // Comportamental (7)
  { area: 'engenharia', texto: 'Como você desenvolve uma cultura de excelência e comprometimento nas equipes?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Excelência' },
  { area: 'engenharia', texto: 'De que forma você equilibra firmeza com respeito na gestão das equipes?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança Equilibrada' },
  { area: 'engenharia', texto: 'Como você constrói credibilidade com engenheiros e diretores de obra?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'comportamental', competencia: 'Credibilidade Profissional' },
  { area: 'engenharia', texto: 'Descreva como você transmite conhecimento técnico para profissionais mais jovens.', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'engenharia', texto: 'Como você mantém a calma e clareza em situações de crise na obra?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Crises' },
  { area: 'engenharia', texto: 'De que forma você promove inovação e melhoria contínua nos processos?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'comportamental', competencia: 'Melhoria Contínua' },
  { area: 'engenharia', texto: 'Como você se adapta a novas tecnologias e métodos construtivos?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'comportamental', competencia: 'Adaptabilidade' },

  // Situacional (7)
  { area: 'engenharia', texto: 'A obra está atrasada e há penalidades contratuais em jogo. Qual seu plano de recuperação?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'situacional', competencia: 'Recuperação de Cronograma' },
  { area: 'engenharia', texto: 'Ocorre um acidente de trabalho em uma das suas frentes. Quais suas primeiras ações?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'situacional', competencia: 'Resposta a Acidentes' },
  { area: 'engenharia', texto: 'O empreiteiro principal não consegue manter o ritmo necessário. Como você atua?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Empreiteiros' },
  { area: 'engenharia', texto: 'A diretoria solicita redução de custos sem comprometer qualidade e prazo. O que propõe?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização de Custos' },
  { area: 'engenharia', texto: 'Você identifica que um encarregado não está apto para a função. Como conduz?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Desempenho' },
  { area: 'engenharia', texto: 'Surge um problema estrutural grave não previsto em projeto. O que você faz?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Problemas Estruturais' },
  { area: 'engenharia', texto: 'O cliente solicita alterações significativas com a obra em andamento. Como você gerencia?', cargo: 'Mestre de Obras', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Mudanças' },
];

// ============================================
// ENGENHEIRO AMBIENTAL
// ============================================

export const engenheiroAmbientalJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Quais são os principais instrumentos da Política Nacional de Meio Ambiente que você aplica?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'tecnica', competencia: 'Legislação Ambiental' },
  { area: 'engenharia', texto: 'Como você elabora um Relatório de Controle Ambiental (RCA)?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'tecnica', competencia: 'Relatórios Ambientais' },
  { area: 'engenharia', texto: 'Quais são as etapas do processo de licenciamento ambiental?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'tecnica', competencia: 'Licenciamento Ambiental' },
  { area: 'engenharia', texto: 'Como você realiza o monitoramento de efluentes líquidos e emissões atmosféricas?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'tecnica', competencia: 'Monitoramento Ambiental' },
  { area: 'engenharia', texto: 'Quais técnicas você utiliza para caracterização e classificação de resíduos sólidos?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Resíduos' },
  { area: 'engenharia', texto: 'Como você interpreta e aplica os padrões de qualidade ambiental (água, ar, solo)?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'tecnica', competencia: 'Padrões de Qualidade' },

  // Experiência (5)
  { area: 'engenharia', texto: 'Conte sobre sua experiência com elaboração de estudos ambientais.', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'experiencia', competencia: 'Estudos Ambientais' },
  { area: 'engenharia', texto: 'Descreva sua participação em processos de licenciamento ambiental.', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'experiencia', competencia: 'Processos de Licenciamento' },
  { area: 'engenharia', texto: 'Como foi sua experiência com coleta de amostras e análises ambientais?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'experiencia', competencia: 'Amostragem Ambiental' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você identificou uma não conformidade ambiental.', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'experiencia', competencia: 'Identificação de Não Conformidades' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com programas de educação ambiental.', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'experiencia', competencia: 'Educação Ambiental' },

  // Comportamental (5)
  { area: 'engenharia', texto: 'Como você se comunica sobre questões ambientais com equipes que não são da área?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação Interdisciplinar' },
  { area: 'engenharia', texto: 'De que forma você lida com pressão para flexibilizar requisitos ambientais?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'comportamental', competencia: 'Integridade Profissional' },
  { area: 'engenharia', texto: 'Como você se mantém atualizado sobre mudanças na legislação ambiental?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Legislativa' },
  { area: 'engenharia', texto: 'Descreva como você organiza suas atividades para atender múltiplas demandas.', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'engenharia', texto: 'Como você reage quando encontra práticas que podem causar impacto ambiental?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'comportamental', competencia: 'Proatividade Ambiental' },

  // Situacional (5)
  { area: 'engenharia', texto: 'Durante uma vistoria, você identifica um vazamento de efluente. O que faz?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'situacional', competencia: 'Resposta a Emergências' },
  { area: 'engenharia', texto: 'O órgão ambiental solicita documentação que a empresa não possui. Como procede?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão Documental' },
  { area: 'engenharia', texto: 'Um gestor solicita que você ignore uma pequena não conformidade. Como age?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'engenharia', texto: 'Os resultados de análise indicam parâmetro fora do padrão. Quais suas ações?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Não Conformidades' },
  { area: 'engenharia', texto: 'A comunidade reclama de odores provenientes da empresa. Como você investiga?', cargo: 'Engenheiro Ambiental', nivel: 'junior', categoria: 'situacional', competencia: 'Investigação de Reclamações' },
];

export const engenheiroAmbientalPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'engenharia', texto: 'Como você elabora e gerencia um Sistema de Gestão Ambiental (ISO 14001)?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistema de Gestão Ambiental' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para avaliação de impactos ambientais?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'tecnica', competencia: 'Avaliação de Impactos' },
  { area: 'engenharia', texto: 'Como você desenvolve um Plano de Gerenciamento de Resíduos Sólidos (PGRS)?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'tecnica', competencia: 'PGRS' },
  { area: 'engenharia', texto: 'Quais técnicas você utiliza para dimensionamento de sistemas de tratamento de efluentes?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'tecnica', competencia: 'Tratamento de Efluentes' },
  { area: 'engenharia', texto: 'Como você estrutura programas de monitoramento ambiental contínuo?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'tecnica', competencia: 'Programas de Monitoramento' },
  { area: 'engenharia', texto: 'Quais indicadores você utiliza para gestão do desempenho ambiental?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores Ambientais' },

  // Experiência (6)
  { area: 'engenharia', texto: 'Conte sobre um projeto de licenciamento complexo que você conduziu.', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'experiencia', competencia: 'Licenciamento Complexo' },
  { area: 'engenharia', texto: 'Descreva como você implementou um sistema de gestão ambiental em uma organização.', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de SGA' },
  { area: 'engenharia', texto: 'Como foi sua experiência com remediação de áreas contaminadas?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'experiencia', competencia: 'Remediação Ambiental' },
  { area: 'engenharia', texto: 'Descreva uma situação em que você conseguiu reduzir impactos ambientais significativos.', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redução de Impactos' },
  { area: 'engenharia', texto: 'Conte sobre sua experiência com auditorias ambientais internas e externas.', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditorias Ambientais' },
  { area: 'engenharia', texto: 'Descreva como você treinou equipes em práticas ambientais.', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento Ambiental' },

  // Comportamental (6)
  { area: 'engenharia', texto: 'Como você engaja diferentes áreas da empresa nas iniciativas ambientais?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'comportamental', competencia: 'Engajamento Organizacional' },
  { area: 'engenharia', texto: 'De que forma você equilibra requisitos ambientais com necessidades operacionais?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pragmatismo Ambiental' },
  { area: 'engenharia', texto: 'Como você lida com resistência às mudanças necessárias para conformidade ambiental?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Mudanças' },
  { area: 'engenharia', texto: 'Descreva como você constrói relacionamento com órgãos ambientais.', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento Institucional' },
  { area: 'engenharia', texto: 'Como você promove a cultura de sustentabilidade na organização?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura de Sustentabilidade' },
  { area: 'engenharia', texto: 'De que forma você desenvolve profissionais mais júniores da área?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },

  // Situacional (6)
  { area: 'engenharia', texto: 'A empresa recebe um auto de infração ambiental. Quais são suas primeiras ações?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Autuações' },
  { area: 'engenharia', texto: 'Ocorre um acidente ambiental com potencial de contaminação. Como você atua?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'situacional', competencia: 'Resposta a Acidentes Ambientais' },
  { area: 'engenharia', texto: 'O orçamento para adequações ambientais foi cortado significativamente. Como prioriza?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão com Recursos Limitados' },
  { area: 'engenharia', texto: 'Uma nova regulamentação impacta significativamente a operação. Como você planeja a adequação?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'situacional', competencia: 'Adequação Regulatória' },
  { area: 'engenharia', texto: 'A comunidade pressiona por melhorias ambientais além do exigido legalmente. Como conduz?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'situacional', competencia: 'Relacionamento com Comunidade' },
  { area: 'engenharia', texto: 'Você identifica que um fornecedor não atende requisitos ambientais. Como procede?', cargo: 'Engenheiro Ambiental', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Fornecedores' },
];

export const engenheiroAmbientalSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'engenharia', texto: 'Como você estrutura uma estratégia de sustentabilidade corporativa integrada?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia de Sustentabilidade' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para cálculo e gestão de pegada de carbono?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'tecnica', competencia: 'Pegada de Carbono' },
  { area: 'engenharia', texto: 'Como você desenvolve programas de economia circular em operações industriais?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'tecnica', competencia: 'Economia Circular' },
  { area: 'engenharia', texto: 'Quais frameworks você utiliza para reporte de sustentabilidade (GRI, SASB)?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'tecnica', competencia: 'Reporte de Sustentabilidade' },
  { area: 'engenharia', texto: 'Como você estrutura análises de risco climático e adaptação?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'tecnica', competencia: 'Risco Climático' },
  { area: 'engenharia', texto: 'Quais metodologias você aplica para valoração econômica de serviços ecossistêmicos?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'tecnica', competencia: 'Valoração Ambiental' },
  { area: 'engenharia', texto: 'Como você desenvolve estratégias de ESG integradas ao negócio?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'tecnica', competencia: 'ESG' },

  // Experiência (7)
  { area: 'engenharia', texto: 'Conte sobre uma transformação ambiental de grande escala que você liderou.', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformação Ambiental' },
  { area: 'engenharia', texto: 'Descreva como você estruturou a área de meio ambiente de uma empresa.', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Áreas' },
  { area: 'engenharia', texto: 'Como foi sua experiência com gestão de crises ambientais de grande repercussão?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crises Ambientais' },
  { area: 'engenharia', texto: 'Descreva sua experiência com certificações ambientais internacionais.', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'experiencia', competencia: 'Certificações Internacionais' },
  { area: 'engenharia', texto: 'Conte sobre como você desenvolveu profissionais ambientais na organização.', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Profissionais' },
  { area: 'engenharia', texto: 'Descreva sua experiência com projetos de compensação ambiental ou conservação.', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'experiencia', competencia: 'Compensação Ambiental' },
  { area: 'engenharia', texto: 'Como foi sua participação na definição de políticas ambientais corporativas?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'experiencia', competencia: 'Políticas Corporativas' },

  // Comportamental (7)
  { area: 'engenharia', texto: 'Como você desenvolve uma cultura organizacional orientada à sustentabilidade?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Sustentabilidade' },
  { area: 'engenharia', texto: 'De que forma você influencia decisões executivas sobre investimentos ambientais?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Executiva' },
  { area: 'engenharia', texto: 'Como você equilibra ambição ambiental com realismo operacional?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo Estratégico' },
  { area: 'engenharia', texto: 'Descreva como você constrói parcerias com stakeholders ambientais externos.', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'comportamental', competencia: 'Parcerias Estratégicas' },
  { area: 'engenharia', texto: 'Como você lida com a responsabilidade de decisões de alto impacto ambiental?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'comportamental', competencia: 'Responsabilidade Ambiental' },
  { area: 'engenharia', texto: 'De que forma você promove inovação em práticas ambientais?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovação Ambiental' },
  { area: 'engenharia', texto: 'Como você se mantém atualizado sobre tendências globais de sustentabilidade?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Global' },

  // Situacional (7)
  { area: 'engenharia', texto: 'Ocorre um acidente ambiental grave com repercussão na mídia. Quais suas primeiras ações?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crises' },
  { area: 'engenharia', texto: 'A empresa assume compromisso público de neutralidade de carbono. Como você estrutura o plano?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'situacional', competencia: 'Neutralidade de Carbono' },
  { area: 'engenharia', texto: 'Investidores questionam a robustez da estratégia ESG da empresa. Como você responde?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicação com Investidores' },
  { area: 'engenharia', texto: 'Mudanças regulatórias significativas exigem revisão de toda a estratégia ambiental. Como planeja?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptação Regulatória' },
  { area: 'engenharia', texto: 'A diretoria questiona se os investimentos ambientais justificam os resultados. Como apresenta?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'situacional', competencia: 'ROI Ambiental' },
  { area: 'engenharia', texto: 'Uma ONG ambiental faz campanha negativa contra a empresa. Como você conduz?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Reputação' },
  { area: 'engenharia', texto: 'Surge uma tecnologia verde disruptiva que exige alto investimento. Como você avalia?', cargo: 'Engenheiro Ambiental', nivel: 'senior', categoria: 'situacional', competencia: 'Avaliação de Tecnologias Verdes' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasEngenharia: PerguntaSeed[] = [
  // Parte 1
  ...engenheiroCivilJunior,
  ...engenheiroCivilPleno,
  ...engenheiroCivilSenior,
  ...engenheiroProducaoJunior,
  ...engenheiroProducaoPleno,
  ...engenheiroProducaoSenior,
  ...tecnicoSegurancaJunior,
  ...tecnicoSegurancaPleno,
  ...tecnicoSegurancaSenior,
  // Parte 2
  ...tecnicoEdificacoesJunior,
  ...tecnicoEdificacoesPleno,
  ...mestreObrasPleno,
  ...mestreObrasSenior,
  ...engenheiroAmbientalJunior,
  ...engenheiroAmbientalPleno,
  ...engenheiroAmbientalSenior,
];

export const estatisticasEngenharia = {
  total: perguntasEngenharia.length,
  porCargo: {
    // Parte 1
    'Engenheiro Civil Junior': engenheiroCivilJunior.length,
    'Engenheiro Civil Pleno': engenheiroCivilPleno.length,
    'Engenheiro Civil Senior': engenheiroCivilSenior.length,
    'Engenheiro de Produção Junior': engenheiroProducaoJunior.length,
    'Engenheiro de Produção Pleno': engenheiroProducaoPleno.length,
    'Engenheiro de Produção Senior': engenheiroProducaoSenior.length,
    'Técnico de Segurança do Trabalho Junior': tecnicoSegurancaJunior.length,
    'Técnico de Segurança do Trabalho Pleno': tecnicoSegurancaPleno.length,
    'Técnico de Segurança do Trabalho Senior': tecnicoSegurancaSenior.length,
    // Parte 2
    'Técnico em Edificações Junior': tecnicoEdificacoesJunior.length,
    'Técnico em Edificações Pleno': tecnicoEdificacoesPleno.length,
    'Mestre de Obras Pleno': mestreObrasPleno.length,
    'Mestre de Obras Senior': mestreObrasSenior.length,
    'Engenheiro Ambiental Junior': engenheiroAmbientalJunior.length,
    'Engenheiro Ambiental Pleno': engenheiroAmbientalPleno.length,
    'Engenheiro Ambiental Senior': engenheiroAmbientalSenior.length,
  },
};
