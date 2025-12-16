/**
 * Banco de Perguntas v4 - Industria/Producao
 *
 * Cargos incluidos:
 * - Operador de Producao (Junior, Pleno) - 45 perguntas
 * - Supervisor de Producao (Pleno, Senior) - 52 perguntas
 * - Tecnico de Manutencao (Junior, Pleno, Senior) - 73 perguntas
 * - Analista de PCP (Junior, Pleno, Senior) - 73 perguntas
 * - Inspetor de Qualidade (Junior, Pleno, Senior) - 73 perguntas
 *
 * Total: 316 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// OPERADOR DE PRODUCAO
// ============================================

export const operadorProducaoJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Quais equipamentos de protecao individual voce conhece e quando cada um deve ser utilizado na linha de producao?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'tecnica', competencia: 'Seguranca Industrial' },
  { area: 'industria', texto: 'Como voce realiza a leitura e interpretacao de uma ordem de producao?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'tecnica', competencia: 'Leitura de Ordem de Producao' },
  { area: 'industria', texto: 'Quais sao os procedimentos basicos de operacao de maquinas que voce conhece?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'tecnica', competencia: 'Operacao de Maquinas' },
  { area: 'industria', texto: 'Como voce aplica os principios do programa 5S no seu posto de trabalho?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'tecnica', competencia: '5S e Organizacao' },
  { area: 'industria', texto: 'Quais verificacoes de qualidade voce realiza durante o processo produtivo?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Qualidade' },
  { area: 'industria', texto: 'Como voce identifica e registra nao conformidades na producao?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Qualidade' },

  // Experiencia (5)
  { area: 'industria', texto: 'Conte sobre sua experiencia com operacao de maquinas ou equipamentos industriais.', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'experiencia', competencia: 'Operacao de Maquinas' },
  { area: 'industria', texto: 'Descreva uma situacao em que voce precisou manter o ritmo de producao mesmo sob pressao. Como lidou?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho sob Pressao' },
  { area: 'industria', texto: 'Como foi sua experiencia com trabalho em turnos ou escalas rotativas?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'experiencia', competencia: 'Flexibilidade de Horarios' },
  { area: 'industria', texto: 'Descreva uma ocasiao em que identificou um problema de qualidade no produto. O que fez?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'experiencia', competencia: 'Controle de Qualidade' },
  { area: 'industria', texto: 'Conte sobre sua experiencia trabalhando em equipe na linha de producao.', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (5)
  { area: 'industria', texto: 'Como voce lida com a rotina e repeticao de tarefas ao longo do dia?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'comportamental', competencia: 'Disciplina' },
  { area: 'industria', texto: 'De que forma voce garante pontualidade e assiduidade no trabalho?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'comportamental', competencia: 'Pontualidade' },
  { area: 'industria', texto: 'Como voce reage quando recebe feedback sobre erros na producao?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade ao Feedback' },
  { area: 'industria', texto: 'Descreva como voce colabora com colegas para atingir as metas de producao.', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'industria', texto: 'Como voce mantem a atencao aos detalhes durante atividades repetitivas?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'comportamental', competencia: 'Atencao aos Detalhes' },

  // Situacional (5)
  { area: 'industria', texto: 'Voce percebe que uma maquina esta fazendo um ruido estranho durante a operacao. O que voce faz?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'situacional', competencia: 'Seguranca Industrial' },
  { area: 'industria', texto: 'Um colega nao esta usando corretamente o EPI. Como voce age?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'situacional', competencia: 'Seguranca Industrial' },
  { area: 'industria', texto: 'A meta de producao do dia esta atrasada e o supervisor pede para acelerar. Como procede?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'situacional', competencia: 'Trabalho sob Pressao' },
  { area: 'industria', texto: 'Voce identifica um produto com defeito que ja passou pelo controle. O que faz?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Qualidade' },
  { area: 'industria', texto: 'O operador do turno anterior deixou a estacao de trabalho desorganizada. Qual sua atitude?', cargo: 'Operador de Producao', nivel: 'junior', categoria: 'situacional', competencia: '5S e Organizacao' },
];

export const operadorProducaoPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Como voce realiza o setup e ajuste de maquinas para diferentes produtos ou especificacoes?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Operacao de Maquinas' },
  { area: 'industria', texto: 'Quais indicadores de producao voce acompanha e como os utiliza para melhorar seu desempenho?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Producao' },
  { area: 'industria', texto: 'Como voce identifica e soluciona pequenas falhas nos equipamentos durante a operacao?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Manutencao Autonoma' },
  { area: 'industria', texto: 'Quais ferramentas de melhoria continua voce conhece e ja aplicou na producao?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Melhoria Continua' },
  { area: 'industria', texto: 'Como voce garante a rastreabilidade dos produtos durante o processo produtivo?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Rastreabilidade' },
  { area: 'industria', texto: 'Quais procedimentos voce segue para realizar a troca de turno de forma eficiente?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao de Turno' },

  // Experiencia (6)
  { area: 'industria', texto: 'Conte sobre uma melhoria que voce sugeriu ou implementou no processo produtivo.', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria Continua' },
  { area: 'industria', texto: 'Descreva sua experiencia com treinamento de novos operadores.', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Colegas' },
  { area: 'industria', texto: 'Como foi sua participacao em programas de qualidade como ISO ou similares?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Sistemas de Qualidade' },
  { area: 'industria', texto: 'Descreva uma situacao em que voce precisou resolver um problema de producao rapidamente.', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolucao de Problemas' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com operacao de diferentes tipos de maquinas ou linhas.', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Versatilidade' },
  { area: 'industria', texto: 'Descreva como voce contribuiu para a reducao de desperdicio na producao.', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reducao de Desperdicios' },

  // Comportamental (6)
  { area: 'industria', texto: 'Como voce lida com mudancas de procedimento ou novas formas de trabalhar?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'industria', texto: 'De que forma voce compartilha conhecimentos com colegas menos experientes?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboracao' },
  { area: 'industria', texto: 'Como voce equilibra a necessidade de velocidade com a manutencao da qualidade?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilibrio Velocidade-Qualidade' },
  { area: 'industria', texto: 'Descreva como voce se mantem motivado em um ambiente de trabalho industrial.', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Automotivacao' },
  { area: 'industria', texto: 'Como voce reage quando percebe que um colega esta com dificuldades na producao?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'industria', texto: 'De que forma voce busca aprender novas habilidades relacionadas a producao?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },

  // Situacional (6)
  { area: 'industria', texto: 'A maquina apresenta uma falha recorrente e a manutencao demora para chegar. O que voce faz?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'industria', texto: 'Voce percebe que o procedimento padrao pode ser melhorado. Como age?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Melhoria Continua' },
  { area: 'industria', texto: 'Um novo operador esta cometendo erros frequentes. Como voce aborda a situacao?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Treinamento de Colegas' },
  { area: 'industria', texto: 'O supervisor pede que voce assuma temporariamente uma linha que voce nao conhece bem. Como procede?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Versatilidade' },
  { area: 'industria', texto: 'Ha um conflito entre operadores sobre a divisao de tarefas. Como voce ajuda a resolver?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Conflitos' },
  { area: 'industria', texto: 'Voce identifica um risco de seguranca que nao esta documentado. Qual sua atitude?', cargo: 'Operador de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Seguranca Industrial' },
];

// ============================================
// SUPERVISOR DE PRODUCAO
// ============================================

export const supervisorProducaoPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Como voce elabora e distribui a escala de trabalho da equipe de producao?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento de Turnos' },
  { area: 'industria', texto: 'Quais indicadores de produtividade voce acompanha e como os apresenta para a equipe?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Produtividade' },
  { area: 'industria', texto: 'Como voce conduz reunioes de inicio de turno com sua equipe?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Comunicacao com Equipe' },
  { area: 'industria', texto: 'Quais ferramentas de gestao visual voce utiliza para acompanhar a producao?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao Visual' },
  { area: 'industria', texto: 'Como voce identifica e prioriza gargalos na linha de producao?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Analise de Gargalos' },
  { area: 'industria', texto: 'Quais procedimentos voce segue para garantir a seguranca da equipe durante a producao?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Seguranca do Trabalho' },

  // Experiencia (6)
  { area: 'industria', texto: 'Conte sobre um projeto de melhoria continua que voce liderou e os resultados alcancados.', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria Continua' },
  { area: 'industria', texto: 'Descreva como voce desenvolveu um membro da equipe que tinha baixo desempenho.', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'industria', texto: 'Como foi sua experiencia com a implementacao de novos processos ou procedimentos?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestao de Mudancas' },
  { area: 'industria', texto: 'Descreva uma situacao em que precisou tomar uma decisao rapida para resolver um problema de producao.', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Tomada de Decisao' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com gestao de conflitos entre membros da equipe.', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestao de Conflitos' },
  { area: 'industria', texto: 'Descreva como voce conseguiu melhorar um indicador de producao especifico.', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Resultados' },

  // Comportamental (6)
  { area: 'industria', texto: 'Como voce equilibra a pressao por resultados com o bem-estar da equipe?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Lideranca Equilibrada' },
  { area: 'industria', texto: 'De que forma voce da feedback construtivo para operadores com desempenho abaixo do esperado?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Feedback' },
  { area: 'industria', texto: 'Como voce promove um ambiente de trabalho seguro e colaborativo?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura de Seguranca' },
  { area: 'industria', texto: 'Descreva como voce lida com a resistencia da equipe a mudancas de procedimento.', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestao de Mudancas' },
  { area: 'industria', texto: 'Como voce mantem a motivacao da equipe durante periodos de alta demanda?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivacao de Equipe' },
  { area: 'industria', texto: 'De que forma voce reconhece e celebra as conquistas da equipe?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Reconhecimento' },

  // Situacional (6)
  { area: 'industria', texto: 'Dois operadores estao em conflito e isso esta afetando a producao. Como voce intervem?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Conflitos' },
  { area: 'industria', texto: 'A meta de producao do dia parece impossivel de atingir. O que voce faz?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'industria', texto: 'Um operador experiente esta resistindo a treinar novatos. Como age?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Lideranca' },
  { area: 'industria', texto: 'Voce recebe uma reclamacao de qualidade de um lote que sua equipe produziu. Como conduz?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Nao Conformidades' },
  { area: 'industria', texto: 'Um membro da equipe reclama de favoritismo na distribuicao de tarefas. Como responde?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Imparcialidade' },
  { area: 'industria', texto: 'Faltou um operador e voce nao conseguiu substituto. Como reorganiza a producao?', cargo: 'Supervisor de Producao', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Recursos' },
];

export const supervisorProducaoSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'industria', texto: 'Como voce estrutura o planejamento de producao considerando capacidade, demanda e recursos?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento de Producao' },
  { area: 'industria', texto: 'Quais metodologias de melhoria continua voce implementou e quais resultados obteve?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'tecnica', competencia: 'Lean Manufacturing' },
  { area: 'industria', texto: 'Como voce utiliza ferramentas de analise de causa raiz para resolver problemas complexos?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'tecnica', competencia: 'Analise de Causa Raiz' },
  { area: 'industria', texto: 'Quais indicadores de OEE voce acompanha e como os utiliza para otimizar a producao?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'tecnica', competencia: 'OEE e Eficiencia' },
  { area: 'industria', texto: 'Como voce integra as areas de qualidade, manutencao e PCP no planejamento da producao?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'tecnica', competencia: 'Integracao Interdepartamental' },
  { area: 'industria', texto: 'Quais estrategias voce utiliza para reduzir o tempo de setup e aumentar a flexibilidade?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'tecnica', competencia: 'SMED e Setup Rapido' },
  { area: 'industria', texto: 'Como voce estrutura o sistema de gestao de desempenho da equipe de producao?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestao de Desempenho' },

  // Experiencia (7)
  { area: 'industria', texto: 'Conte sobre uma transformacao significativa que voce liderou em uma area de producao.', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformacao Operacional' },
  { area: 'industria', texto: 'Descreva sua experiencia com implementacao de sistemas de producao lean ou World Class Manufacturing.', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'experiencia', competencia: 'Metodologias de Excelencia' },
  { area: 'industria', texto: 'Como foi sua experiencia com gestao de multiplas linhas ou areas de producao simultaneamente?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestao de Multiplas Areas' },
  { area: 'industria', texto: 'Descreva um projeto de reducao de custos que voce liderou e os resultados financeiros alcancados.', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'experiencia', competencia: 'Reducao de Custos' },
  { area: 'industria', texto: 'Conte sobre como voce desenvolveu futuros supervisores ou lideres na producao.', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'experiencia', competencia: 'Formacao de Liderancas' },
  { area: 'industria', texto: 'Descreva sua experiencia com introducao de novas tecnologias ou automacao na producao.', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'experiencia', competencia: 'Inovacao Tecnologica' },
  { area: 'industria', texto: 'Como foi sua participacao em projetos de ampliacao de capacidade produtiva?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'experiencia', competencia: 'Expansao de Capacidade' },

  // Comportamental (7)
  { area: 'industria', texto: 'Como voce desenvolve uma cultura de excelencia operacional na equipe?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Excelencia' },
  { area: 'industria', texto: 'De que forma voce influencia outras areas para melhorar os resultados da producao?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Organizacional' },
  { area: 'industria', texto: 'Como voce lida com pressao da alta gestao por resultados de curto prazo versus investimentos de longo prazo?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'comportamental', competencia: 'Visao Estrategica' },
  { area: 'industria', texto: 'Descreva como voce promove a seguranca como valor inegociavel na operacao.', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'comportamental', competencia: 'Lideranca em Seguranca' },
  { area: 'industria', texto: 'Como voce equilibra padronizacao com a necessidade de flexibilidade e inovacao?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilibrio Padrao-Inovacao' },
  { area: 'industria', texto: 'De que forma voce constroi relacionamentos produtivos com sindicatos ou representantes dos trabalhadores?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacoes Trabalhistas' },
  { area: 'industria', texto: 'Como voce mantem a equipe engajada durante periodos de mudancas organizacionais?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'comportamental', competencia: 'Engajamento em Mudancas' },

  // Situacional (7)
  { area: 'industria', texto: 'A producao esta com problemas cronicos de qualidade que afetam clientes importantes. Que plano voce propoe?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'situacional', competencia: 'Resolucao de Crises de Qualidade' },
  { area: 'industria', texto: 'A empresa precisa aumentar a producao em 30% sem contratar. Como voce aborda?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'situacional', competencia: 'Aumento de Produtividade' },
  { area: 'industria', texto: 'Um acidente de trabalho serio ocorreu na sua area. Quais sao suas acoes imediatas e de longo prazo?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crises de Seguranca' },
  { area: 'industria', texto: 'A diretoria quer implementar um novo sistema que voce acredita nao ser adequado. Como age?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'situacional', competencia: 'Posicionamento Tecnico' },
  { area: 'industria', texto: 'Voce precisa comunicar uma decisao impopular sobre corte de horas extras. Como conduz?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicacao de Decisoes Dificeis' },
  { area: 'industria', texto: 'Uma nova tecnologia pode substituir parte da mao de obra. Como voce gerencia essa transicao?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Automacao' },
  { area: 'industria', texto: 'Os indicadores de producao estao bons mas o clima da equipe esta ruim. Que acoes voce toma?', cargo: 'Supervisor de Producao', nivel: 'senior', categoria: 'situacional', competencia: 'Equilibrio Resultados-Pessoas' },
];

// ============================================
// TECNICO DE MANUTENCAO
// ============================================

export const tecnicoManutencaoJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Quais ferramentas basicas de manutencao voce conhece e como as utiliza?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'tecnica', competencia: 'Ferramentas de Manutencao' },
  { area: 'industria', texto: 'Como voce realiza uma inspecao visual para identificar problemas em equipamentos?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'tecnica', competencia: 'Diagnostico de Falhas' },
  { area: 'industria', texto: 'Quais procedimentos de seguranca voce segue antes de iniciar uma manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'tecnica', competencia: 'Seguranca em Manutencao' },
  { area: 'industria', texto: 'Como voce le e interpreta um diagrama eletrico basico?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'tecnica', competencia: 'Eletrica Industrial' },
  { area: 'industria', texto: 'Quais tipos de lubrificacao voce conhece e quando cada um deve ser aplicado?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'tecnica', competencia: 'Lubrificacao' },
  { area: 'industria', texto: 'Como voce registra e documenta uma manutencao realizada?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentacao de Manutencao' },

  // Experiencia (5)
  { area: 'industria', texto: 'Conte sobre sua experiencia com manutencao preventiva de equipamentos.', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'experiencia', competencia: 'Manutencao Preventiva' },
  { area: 'industria', texto: 'Descreva uma situacao em que voce identificou e corrigiu uma falha em um equipamento.', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'experiencia', competencia: 'Manutencao Corretiva' },
  { area: 'industria', texto: 'Como foi sua experiencia trabalhando com manutencoes de emergencia?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'experiencia', competencia: 'Manutencao de Emergencia' },
  { area: 'industria', texto: 'Descreva uma ocasiao em que precisou aprender a operar um novo equipamento rapidamente.', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Tecnico' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com trabalho em altura ou espacos confinados.', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalhos Especiais' },

  // Comportamental (5)
  { area: 'industria', texto: 'Como voce lida com a pressao de restaurar um equipamento critico rapidamente?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho sob Pressao' },
  { area: 'industria', texto: 'De que forma voce busca aprender sobre novas tecnologias de manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },
  { area: 'industria', texto: 'Como voce organiza suas ferramentas e materiais para garantir eficiencia no trabalho?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'industria', texto: 'Descreva como voce colabora com operadores para entender os problemas dos equipamentos.', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicacao Tecnica' },
  { area: 'industria', texto: 'Como voce reage quando nao consegue resolver um problema tecnico sozinho?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'comportamental', competencia: 'Humildade Tecnica' },

  // Situacional (5)
  { area: 'industria', texto: 'Uma maquina parou e a producao esta parada esperando. O que voce faz primeiro?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'situacional', competencia: 'Diagnostico de Falhas' },
  { area: 'industria', texto: 'Voce nao tem a peca necessaria para o reparo e o fornecedor demora dias. Como age?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'industria', texto: 'Um colega mais experiente sugere uma solucao que voce acha arriscada. O que faz?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'situacional', competencia: 'Posicionamento Tecnico' },
  { area: 'industria', texto: 'Voce percebe que uma manutencao preventiva foi pulada por falta de tempo. Como procede?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'situacional', competencia: 'Etica Profissional' },
  { area: 'industria', texto: 'O operador reclama que o equipamento nao funciona bem mas voce nao encontra defeito. Como age?', cargo: 'Tecnico de Manutencao', nivel: 'junior', categoria: 'situacional', competencia: 'Investigacao Tecnica' },
];

export const tecnicoManutencaoPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Como voce utiliza tecnicas de analise de falhas para identificar a causa raiz de problemas recorrentes?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Analise de Falhas' },
  { area: 'industria', texto: 'Quais sistemas de automacao industrial voce conhece e como realiza sua manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Automacao Industrial' },
  { area: 'industria', texto: 'Como voce elabora um plano de manutencao preventiva para um equipamento critico?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento de Manutencao' },
  { area: 'industria', texto: 'Quais tecnicas de manutencao preditiva voce conhece e como as aplica?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Manutencao Preditiva' },
  { area: 'industria', texto: 'Como voce realiza a calibracao de instrumentos de medicao?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Calibracao' },
  { area: 'industria', texto: 'Quais comandos eletricos e CLPs voce sabe programar ou ajustar?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'tecnica', competencia: 'Programacao de CLP' },

  // Experiencia (6)
  { area: 'industria', texto: 'Conte sobre um problema complexo de manutencao que voce resolveu e como chegou a solucao.', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolucao de Problemas Complexos' },
  { area: 'industria', texto: 'Descreva sua experiencia com implementacao de melhorias em equipamentos.', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Equipamentos' },
  { area: 'industria', texto: 'Como foi sua experiencia com instalacao e comissionamento de novos equipamentos?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Instalacao de Equipamentos' },
  { area: 'industria', texto: 'Descreva um projeto de reducao de paradas nao programadas que voce participou.', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reducao de Downtime' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com treinamento de operadores em manutencao autonoma.', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'experiencia', competencia: 'TPM e Manutencao Autonoma' },
  { area: 'industria', texto: 'Descreva como voce contribuiu para a padronizacao de procedimentos de manutencao.', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'experiencia', competencia: 'Padronizacao de Procedimentos' },

  // Comportamental (6)
  { area: 'industria', texto: 'Como voce prioriza multiplas chamadas de manutencao simultaneas?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Priorizacao' },
  { area: 'industria', texto: 'De que forma voce compartilha conhecimentos tecnicos com a equipe de manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Transferencia de Conhecimento' },
  { area: 'industria', texto: 'Como voce lida com situacoes em que a producao pressiona por solucoes rapidas mas inseguras?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Assertividade em Seguranca' },
  { area: 'industria', texto: 'Descreva como voce mantem a calma e o foco durante manutencoes criticas.', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Controle Emocional' },
  { area: 'industria', texto: 'Como voce se mantem atualizado sobre novas tecnologias e equipamentos?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualizacao Tecnologica' },
  { area: 'industria', texto: 'De que forma voce constroi um bom relacionamento com a equipe de producao?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento Interdepartamental' },

  // Situacional (6)
  { area: 'industria', texto: 'Um equipamento apresenta falha intermitente que voce nao consegue reproduzir. Como investiga?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'situacional', competencia: 'Diagnostico de Falhas Intermitentes' },
  { area: 'industria', texto: 'O supervisor pede para pular a manutencao preventiva porque a producao esta atrasada. O que faz?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociacao Tecnica' },
  { area: 'industria', texto: 'Voce identifica que uma falha foi causada por erro de outro tecnico. Como age?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'situacional', competencia: 'Etica Profissional' },
  { area: 'industria', texto: 'Um novo equipamento chegou sem manual tecnico adequado. Como voce procede?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'situacional', competencia: 'Autonomia Tecnica' },
  { area: 'industria', texto: 'A peca de reposicao que chegou e diferente da especificada. O que voce faz?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Pecas' },
  { area: 'industria', texto: 'Voce percebe um risco de acidente que nao foi mapeado nas analises de seguranca. Como age?', cargo: 'Tecnico de Manutencao', nivel: 'pleno', categoria: 'situacional', competencia: 'Proatividade em Seguranca' },
];

export const tecnicoManutencaoSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'industria', texto: 'Como voce estrutura um sistema de gestao de manutencao (PCM) eficiente?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'tecnica', competencia: 'PCM e Gestao de Manutencao' },
  { area: 'industria', texto: 'Quais metodologias de confiabilidade voce conhece e como as aplica para aumentar a disponibilidade dos equipamentos?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'tecnica', competencia: 'Engenharia de Confiabilidade' },
  { area: 'industria', texto: 'Como voce elabora e gerencia o orcamento de manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestao de Custos de Manutencao' },
  { area: 'industria', texto: 'Quais indicadores de manutencao voce acompanha e como os utiliza para tomada de decisao?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'tecnica', competencia: 'KPIs de Manutencao' },
  { area: 'industria', texto: 'Como voce implementa um programa de TPM (Manutencao Produtiva Total)?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'tecnica', competencia: 'TPM' },
  { area: 'industria', texto: 'Quais criterios voce utiliza para decidir entre reparo e substituicao de equipamentos?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'tecnica', competencia: 'Analise de Vida Util' },
  { area: 'industria', texto: 'Como voce especifica e avalia tecnicamente a aquisicao de novos equipamentos?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'tecnica', competencia: 'Especificacao de Equipamentos' },

  // Experiencia (7)
  { area: 'industria', texto: 'Conte sobre um projeto de transformacao da area de manutencao que voce liderou.', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformacao da Manutencao' },
  { area: 'industria', texto: 'Descreva sua experiencia com implementacao de manutencao preditiva baseada em condicao.', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'experiencia', competencia: 'Manutencao Baseada em Condicao' },
  { area: 'industria', texto: 'Como foi sua experiencia com gestao de grandes paradas programadas de manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestao de Grandes Paradas' },
  { area: 'industria', texto: 'Descreva um caso em que voce conseguiu reduzir significativamente os custos de manutencao.', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'experiencia', competencia: 'Reducao de Custos' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com desenvolvimento e capacitacao de equipes de manutencao.', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'industria', texto: 'Descreva como voce participou da introducao de novas tecnologias de manutencao 4.0.', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'experiencia', competencia: 'Manutencao 4.0' },
  { area: 'industria', texto: 'Como foi sua experiencia com auditorias de manutencao ou certificacoes?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'experiencia', competencia: 'Auditorias e Certificacoes' },

  // Comportamental (7)
  { area: 'industria', texto: 'Como voce influencia a cultura da empresa para valorizar a manutencao preventiva?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Cultural' },
  { area: 'industria', texto: 'De que forma voce desenvolve tecnicos juniores para assumirem maiores responsabilidades?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'comportamental', competencia: 'Mentoria Tecnica' },
  { area: 'industria', texto: 'Como voce lida com a resistencia a mudancas de processos ou tecnologias de manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestao de Mudancas' },
  { area: 'industria', texto: 'Descreva como voce negocia recursos e investimentos para a area de manutencao.', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'comportamental', competencia: 'Negociacao de Recursos' },
  { area: 'industria', texto: 'Como voce equilibra as demandas de curto prazo com a visao estrategica da manutencao?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'comportamental', competencia: 'Visao Estrategica' },
  { area: 'industria', texto: 'De que forma voce promove a colaboracao entre manutencao, producao e engenharia?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'comportamental', competencia: 'Integracao de Areas' },
  { area: 'industria', texto: 'Como voce mantem a equipe motivada e engajada em periodos de alta demanda?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'comportamental', competencia: 'Motivacao de Equipe' },

  // Situacional (7)
  { area: 'industria', texto: 'Um equipamento critico apresenta falhas frequentes e o fornecedor nao resolve. Que acoes voce toma?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Fornecedores' },
  { area: 'industria', texto: 'A diretoria quer reduzir o orcamento de manutencao em 20%. Como voce aborda essa demanda?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa do Orcamento' },
  { area: 'industria', texto: 'Voce precisa decidir entre investir em manutencao preditiva ou ampliar a equipe. Como avalia?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'situacional', competencia: 'Tomada de Decisao Estrategica' },
  { area: 'industria', texto: 'Uma falha grave causou acidente com afastamento. Quais acoes voce lidera apos o evento?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crises' },
  { area: 'industria', texto: 'A producao questiona a necessidade de tantas manutencoes preventivas. Como voce justifica?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicacao de Valor' },
  { area: 'industria', texto: 'Um tecnico experiente da equipe esta desmotivado e seu desempenho caiu. Como age?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Desempenho' },
  { area: 'industria', texto: 'A empresa vai adquirir um novo tipo de equipamento que ninguem da equipe conhece. Como prepara a equipe?', cargo: 'Tecnico de Manutencao', nivel: 'senior', categoria: 'situacional', competencia: 'Preparacao para Novas Tecnologias' },
];

// ============================================
// ANALISTA DE PCP
// ============================================

export const analistaPCPJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Como voce realiza o acompanhamento de uma ordem de producao desde a emissao ate a finalizacao?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'tecnica', competencia: 'Planejamento de Producao' },
  { area: 'industria', texto: 'Quais informacoes voce considera essenciais para criar um plano de producao semanal?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'tecnica', competencia: 'Planejamento de Producao' },
  { area: 'industria', texto: 'Como voce utiliza sistemas ERP para registrar e acompanhar a producao?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas ERP' },
  { area: 'industria', texto: 'Quais relatorios de producao voce sabe gerar e como os interpreta?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'tecnica', competencia: 'Relatorios de Producao' },
  { area: 'industria', texto: 'Como voce verifica a disponibilidade de materiais antes de liberar uma ordem de producao?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestao de Materiais' },
  { area: 'industria', texto: 'Quais conceitos de MRP voce conhece e como os aplica no dia a dia?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'tecnica', competencia: 'MRP' },

  // Experiencia (5)
  { area: 'industria', texto: 'Conte sobre sua experiencia com planejamento e controle de producao.', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'experiencia', competencia: 'Planejamento de Producao' },
  { area: 'industria', texto: 'Descreva uma situacao em que precisou ajustar o plano de producao por falta de materiais.', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'experiencia', competencia: 'Gestao de Materiais' },
  { area: 'industria', texto: 'Como foi sua experiencia com sistemas ERP ou software de gestao de producao?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas ERP' },
  { area: 'industria', texto: 'Descreva uma ocasiao em que precisou priorizar demandas urgentes de producao.', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'experiencia', competencia: 'Priorizacao' },
  { area: 'industria', texto: 'Conte sobre sua experiencia trabalhando com equipes de producao e compras.', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho Interdepartamental' },

  // Comportamental (5)
  { area: 'industria', texto: 'Como voce lida com mudancas de prioridade frequentes no planejamento?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'comportamental', competencia: 'Flexibilidade' },
  { area: 'industria', texto: 'De que forma voce organiza suas atividades para cumprir prazos do planejamento?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'industria', texto: 'Como voce reage quando descobre erros no planejamento que afetam a producao?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'comportamental', competencia: 'Responsabilidade' },
  { area: 'industria', texto: 'Descreva como voce se comunica com a producao sobre alteracoes no plano.', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicacao' },
  { area: 'industria', texto: 'Como voce busca aprender mais sobre processos produtivos e sistemas de gestao?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },

  // Situacional (5)
  { area: 'industria', texto: 'A producao informa que nao conseguira cumprir o plano do dia. O que voce faz?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'industria', texto: 'Um cliente importante pede antecipacao de um pedido. Como voce avalia a viabilidade?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'situacional', competencia: 'Priorizacao' },
  { area: 'industria', texto: 'Voce identifica que um material critico esta em falta no estoque. Qual sua acao?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'situacional', competencia: 'Gestao de Materiais' },
  { area: 'industria', texto: 'O sistema ERP esta fora do ar e voce precisa liberar ordens. Como procede?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'industria', texto: 'A producao e comercial tem prioridades conflitantes. Como voce media?', cargo: 'Analista de PCP', nivel: 'junior', categoria: 'situacional', competencia: 'Negociacao' },
];

export const analistaPCPPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Como voce elabora o Plano Mestre de Producao (MPS) considerando demanda e capacidade?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'tecnica', competencia: 'Plano Mestre de Producao' },
  { area: 'industria', texto: 'Quais tecnicas de sequenciamento voce utiliza para otimizar a programacao de producao?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sequenciamento' },
  { area: 'industria', texto: 'Como voce calcula e analisa a capacidade produtiva versus a demanda planejada?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'tecnica', competencia: 'Analise de Capacidade' },
  { area: 'industria', texto: 'Quais parametros de MRP voce configura e como determina o lote economico?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'tecnica', competencia: 'MRP/MRP II' },
  { area: 'industria', texto: 'Como voce utiliza indicadores de aderencia ao plano e on-time delivery?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de PCP' },
  { area: 'industria', texto: 'Quais analises voce faz para definir niveis de estoque de seguranca?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao de Estoques' },

  // Experiencia (6)
  { area: 'industria', texto: 'Conte sobre um projeto de melhoria na aderencia ao plano de producao que voce conduziu.', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'industria', texto: 'Descreva sua experiencia com planejamento de producao em ambientes de alta variabilidade.', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'experiencia', competencia: 'Planejamento Flexivel' },
  { area: 'industria', texto: 'Como foi sua experiencia com implementacao ou melhoria de sistemas de MRP?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementacao de MRP' },
  { area: 'industria', texto: 'Descreva uma situacao complexa de reprogramacao de producao que voce gerenciou.', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reprogramacao' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com reducao de lead time ou tempo de ciclo.', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reducao de Lead Time' },
  { area: 'industria', texto: 'Descreva como voce participou da integracao entre PCP e areas de compras/vendas.', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'experiencia', competencia: 'Integracao S&OP' },

  // Comportamental (6)
  { area: 'industria', texto: 'Como voce equilibra as demandas conflitantes de vendas, producao e financeiro no planejamento?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilibrio de Demandas' },
  { area: 'industria', texto: 'De que forma voce comunica impactos de mudancas no plano para as areas afetadas?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicacao de Impactos' },
  { area: 'industria', texto: 'Como voce lida com pressoes para antecipar prazos que nao sao viaveis tecnicamente?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'comportamental', competencia: 'Assertividade' },
  { area: 'industria', texto: 'Descreva como voce promove a colaboracao entre PCP e chao de fabrica.', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboracao' },
  { area: 'industria', texto: 'Como voce se mantem atualizado sobre metodologias de planejamento e gestao da producao?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualizacao Profissional' },
  { area: 'industria', texto: 'De que forma voce analisa dados para tomar decisoes de planejamento?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'comportamental', competencia: 'Analise de Dados' },

  // Situacional (6)
  { area: 'industria', texto: 'Uma maquina critica quebrou e ficara parada por dias. Como voce reprograma a producao?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'situacional', competencia: 'Reprogramacao de Emergencia' },
  { area: 'industria', texto: 'O fornecedor de um componente critico atrasou. Quais alternativas voce avalia?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Riscos' },
  { area: 'industria', texto: 'Vendas promete um prazo que voce sabe ser inviavel. Como age?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociacao Interna' },
  { area: 'industria', texto: 'A producao nao consegue atingir o volume planejado sistematicamente. O que voce faz?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'situacional', competencia: 'Analise de Causas' },
  { area: 'industria', texto: 'Voce precisa escolher qual cliente atender primeiro com estoque limitado. Como decide?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'situacional', competencia: 'Priorizacao Estrategica' },
  { area: 'industria', texto: 'O MRP sugere compra de materiais que voce sabe terem consumo irregular. Como avalia?', cargo: 'Analista de PCP', nivel: 'pleno', categoria: 'situacional', competencia: 'Analise Critica de Sistemas' },
];

export const analistaPCPSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'industria', texto: 'Como voce estrutura o processo de S&OP (Sales and Operations Planning) na organizacao?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'tecnica', competencia: 'S&OP' },
  { area: 'industria', texto: 'Quais metodologias de previsao de demanda voce utiliza e como avalia sua acuracia?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'tecnica', competencia: 'Previsao de Demanda' },
  { area: 'industria', texto: 'Como voce implementa e gerencia um sistema APS (Advanced Planning and Scheduling)?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'tecnica', competencia: 'APS' },
  { area: 'industria', texto: 'Quais estrategias de gestao de estoques voce utiliza para diferentes tipos de produtos?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'tecnica', competencia: 'Estrategias de Estoque' },
  { area: 'industria', texto: 'Como voce calcula e otimiza o custo total de producao considerando setup, estoque e capacidade?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'tecnica', competencia: 'Otimizacao de Custos' },
  { area: 'industria', texto: 'Quais indicadores de supply chain voce monitora e como os integra com o planejamento?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'tecnica', competencia: 'Indicadores de Supply Chain' },
  { area: 'industria', texto: 'Como voce modela cenarios de planejamento para suportar decisoes estrategicas?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'tecnica', competencia: 'Modelagem de Cenarios' },

  // Experiencia (7)
  { area: 'industria', texto: 'Conte sobre uma transformacao significativa no processo de planejamento que voce liderou.', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformacao de Processos' },
  { area: 'industria', texto: 'Descreva sua experiencia com implementacao de processos de S&OP.', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementacao de S&OP' },
  { area: 'industria', texto: 'Como foi sua experiencia com projetos de reducao de estoque mantendo nivel de servico?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'experiencia', competencia: 'Otimizacao de Estoque' },
  { area: 'industria', texto: 'Descreva um projeto de melhoria de acuracia de previsao que voce conduziu.', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'experiencia', competencia: 'Melhoria de Previsao' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com planejamento em ambientes de lancamento de novos produtos.', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'experiencia', competencia: 'Planejamento de NPI' },
  { area: 'industria', texto: 'Descreva como voce desenvolveu a equipe de PCP e melhorou suas competencias.', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'industria', texto: 'Como foi sua participacao em decisoes de make or buy e planejamento de capacidade de longo prazo?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'experiencia', competencia: 'Planejamento Estrategico' },

  // Comportamental (7)
  { area: 'industria', texto: 'Como voce influencia a alta gestao sobre investimentos em capacidade e sistemas de planejamento?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Executiva' },
  { area: 'industria', texto: 'De que forma voce promove uma cultura de planejamento integrado na organizacao?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Planejamento' },
  { area: 'industria', texto: 'Como voce lida com conflitos entre areas sobre alocacao de capacidade e prioridades?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestao de Conflitos' },
  { area: 'industria', texto: 'Descreva como voce equilibra visao estrategica com a execucao tatica do planejamento.', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'comportamental', competencia: 'Visao Estrategica' },
  { area: 'industria', texto: 'Como voce desenvolve analistas juniores e promove seu crescimento profissional?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'industria', texto: 'De que forma voce mantem a equipe engajada com os objetivos de planejamento?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'comportamental', competencia: 'Engajamento de Equipe' },
  { area: 'industria', texto: 'Como voce comunica riscos e oportunidades de supply chain para a lideranca?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicacao Executiva' },

  // Situacional (7)
  { area: 'industria', texto: 'A demanda caiu drasticamente e ha excesso de estoque e capacidade. Que plano voce propoe?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crise de Demanda' },
  { area: 'industria', texto: 'A empresa vai adquirir outra com processos de planejamento diferentes. Como voce integra?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'situacional', competencia: 'Integracao Pos-Aquisicao' },
  { area: 'industria', texto: 'O CEO questiona a necessidade da equipe de PCP atual. Como voce demonstra o valor?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'situacional', competencia: 'Demonstracao de Valor' },
  { area: 'industria', texto: 'Ha uma ruptura na cadeia de fornecimento global afetando materiais criticos. Quais acoes lidera?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crise de Supply' },
  { area: 'industria', texto: 'A empresa quer mudar de producao empurrada para puxada. Como voce conduz essa transicao?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'situacional', competencia: 'Transformacao Lean' },
  { area: 'industria', texto: 'Os sistemas de planejamento estao desatualizados mas nao ha orcamento para novo ERP. O que faz?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'situacional', competencia: 'Otimizacao com Restricoes' },
  { area: 'industria', texto: 'Vendas quer flexibilidade total enquanto producao quer estabilidade. Como voce media estrategicamente?', cargo: 'Analista de PCP', nivel: 'senior', categoria: 'situacional', competencia: 'Mediacao Estrategica' },
];

// ============================================
// INSPETOR DE QUALIDADE
// ============================================

export const inspetorQualidadeJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Quais instrumentos de medicao voce conhece e como realiza sua utilizacao correta?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Instrumentos de Medicao' },
  { area: 'industria', texto: 'Como voce interpreta um desenho tecnico para realizar uma inspecao dimensional?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Leitura de Desenhos' },
  { area: 'industria', texto: 'Quais tipos de defeitos visuais voce sabe identificar e classificar?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Inspecao Visual' },
  { area: 'industria', texto: 'Como voce registra uma nao conformidade encontrada durante a inspecao?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Registro de Nao Conformidades' },
  { area: 'industria', texto: 'Quais criterios voce utiliza para aprovar ou reprovar um lote de producao?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Criterios de Aceitacao' },
  { area: 'industria', texto: 'Como voce realiza a rastreabilidade de materiais e produtos inspecionados?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'tecnica', competencia: 'Rastreabilidade' },

  // Experiencia (5)
  { area: 'industria', texto: 'Conte sobre sua experiencia com inspecao de qualidade de produtos ou materiais.', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Inspecao de Qualidade' },
  { area: 'industria', texto: 'Descreva uma situacao em que identificou um defeito critico antes do produto chegar ao cliente.', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Deteccao de Defeitos' },
  { area: 'industria', texto: 'Como foi sua experiencia com utilizacao de instrumentos de medicao?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Instrumentos de Medicao' },
  { area: 'industria', texto: 'Descreva uma ocasiao em que precisou rejeitar um lote e como comunicou a decisao.', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Comunicacao de Rejeicao' },
  { area: 'industria', texto: 'Conte sobre sua experiencia trabalhando com padroes e especificacoes de qualidade.', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'experiencia', competencia: 'Padroes de Qualidade' },

  // Comportamental (5)
  { area: 'industria', texto: 'Como voce mantem a atencao aos detalhes durante longas jornadas de inspecao?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Atencao aos Detalhes' },
  { area: 'industria', texto: 'De que forma voce lida com pressoes para aprovar produtos fora de especificacao?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Etica Profissional' },
  { area: 'industria', texto: 'Como voce reage quando a producao discorda de uma rejeicao que voce fez?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Assertividade' },
  { area: 'industria', texto: 'Descreva como voce busca aprender mais sobre os processos e produtos que inspeciona.', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Curiosidade Tecnica' },
  { area: 'industria', texto: 'Como voce colabora com a producao para prevenir defeitos recorrentes?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'comportamental', competencia: 'Colaboracao' },

  // Situacional (5)
  { area: 'industria', texto: 'Voce encontra um defeito em um lote urgente para embarque. O que faz?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Decisao sob Pressao' },
  { area: 'industria', texto: 'O operador diz que o defeito e aceitavel pelo cliente. Como voce procede?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Seguimento de Procedimentos' },
  { area: 'industria', texto: 'Voce nao tem certeza se um item esta dentro ou fora da especificacao. O que faz?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Duvida Tecnica' },
  { area: 'industria', texto: 'O instrumento de medicao parece estar descalibrado. Qual sua atitude?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Integridade de Medicao' },
  { area: 'industria', texto: 'Um colega inspetor esta aprovando produtos que voce acredita estarem fora do padrao. Como age?', cargo: 'Inspetor de Qualidade', nivel: 'junior', categoria: 'situacional', competencia: 'Etica e Comunicacao' },
];

export const inspetorQualidadePleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'industria', texto: 'Como voce aplica tecnicas de controle estatistico de processo (CEP) nas inspecoes?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle Estatistico de Processo' },
  { area: 'industria', texto: 'Quais planos de amostragem voce conhece e como define o tamanho da amostra?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planos de Amostragem' },
  { area: 'industria', texto: 'Como voce conduz uma analise de causa raiz para nao conformidades recorrentes?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Analise de Causa Raiz' },
  { area: 'industria', texto: 'Quais requisitos da ISO 9001 estao relacionados ao seu trabalho de inspecao?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Normas ISO' },
  { area: 'industria', texto: 'Como voce elabora e atualiza procedimentos de inspecao e criterios de aceitacao?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Documentacao de Qualidade' },
  { area: 'industria', texto: 'Quais ferramentas da qualidade voce utiliza para analisar dados de inspecao?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'tecnica', competencia: 'Ferramentas da Qualidade' },

  // Experiencia (6)
  { area: 'industria', texto: 'Conte sobre um projeto de reducao de defeitos que voce participou e os resultados.', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Reducao de Defeitos' },
  { area: 'industria', texto: 'Descreva sua experiencia com auditorias de qualidade internas ou de fornecedores.', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Auditorias de Qualidade' },
  { area: 'industria', texto: 'Como foi sua experiencia com implementacao de planos de inspecao por amostragem?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Planos de Amostragem' },
  { area: 'industria', texto: 'Descreva uma situacao em que sua atuacao evitou uma reclamacao de cliente.', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Prevencao de Reclamacoes' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com calibracao e controle de instrumentos de medicao.', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestao de Calibracao' },
  { area: 'industria', texto: 'Descreva como voce contribuiu para a melhoria de um processo produtivo.', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },

  // Comportamental (6)
  { area: 'industria', texto: 'Como voce equilibra a necessidade de rigor na qualidade com a pressao por produtividade?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilibrio Qualidade-Produtividade' },
  { area: 'industria', texto: 'De que forma voce compartilha conhecimentos de qualidade com inspetores menos experientes?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Transferencia de Conhecimento' },
  { area: 'industria', texto: 'Como voce se posiciona quando gestores pedem para flexibilizar criterios de qualidade?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Posicionamento Tecnico' },
  { area: 'industria', texto: 'Descreva como voce promove a cultura de qualidade na producao.', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Promocao da Qualidade' },
  { area: 'industria', texto: 'Como voce lida com feedbacks negativos sobre rejeicoes que voce fez?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliencia' },
  { area: 'industria', texto: 'De que forma voce se mantem atualizado sobre normas e tecnicas de qualidade?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualizacao Profissional' },

  // Situacional (6)
  { area: 'industria', texto: 'Os graficos de CEP mostram tendencia de saida de especificacao. O que voce faz?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Acao Preventiva' },
  { area: 'industria', texto: 'Voce identifica que um fornecedor esta entregando materiais no limite da especificacao sistematicamente. Como age?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Fornecedores' },
  { area: 'industria', texto: 'Uma reclamacao de cliente aponta defeito que passou pela sua inspecao. Como conduz?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Tratamento de Reclamacoes' },
  { area: 'industria', texto: 'A producao sugere mudar um criterio de aceitacao que voce considera necessario. Como negocia?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociacao Tecnica' },
  { area: 'industria', texto: 'Voce precisa treinar novos inspetores mas a demanda de inspecao esta alta. Como organiza?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Prioridades' },
  { area: 'industria', texto: 'Uma auditoria de cliente esta proxima e voce identificou nao conformidades pendentes. O que faz?', cargo: 'Inspetor de Qualidade', nivel: 'pleno', categoria: 'situacional', competencia: 'Preparacao para Auditorias' },
];

export const inspetorQualidadeSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'industria', texto: 'Como voce estrutura um sistema de gestao da qualidade alinhado com a ISO 9001 e especificidades do setor?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistema de Gestao da Qualidade' },
  { area: 'industria', texto: 'Quais metodologias de Six Sigma voce aplica para reducao de variabilidade e defeitos?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Six Sigma' },
  { area: 'industria', texto: 'Como voce implementa e gerencia um programa de auditoria interna eficaz?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Programa de Auditorias' },
  { area: 'industria', texto: 'Quais tecnicas de FMEA voce utiliza para prevencao de falhas?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'FMEA' },
  { area: 'industria', texto: 'Como voce define e monitora indicadores de custo da qualidade e nao qualidade?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Custo da Qualidade' },
  { area: 'industria', texto: 'Quais ferramentas estatisticas avancadas voce utiliza para analise de capability e estabilidade?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Analise Estatistica Avancada' },
  { area: 'industria', texto: 'Como voce estrutura o processo de qualificacao e monitoramento de fornecedores?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'tecnica', competencia: 'Qualidade de Fornecedores' },

  // Experiencia (7)
  { area: 'industria', texto: 'Conte sobre uma transformacao significativa na area de qualidade que voce liderou.', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformacao da Qualidade' },
  { area: 'industria', texto: 'Descreva sua experiencia com certificacoes ISO ou outras normas de qualidade.', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Certificacoes' },
  { area: 'industria', texto: 'Como foi sua experiencia com projetos de melhoria que geraram resultados financeiros significativos?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'ROI da Qualidade' },
  { area: 'industria', texto: 'Descreva um caso complexo de gestao de crise de qualidade com clientes.', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestao de Crises' },
  { area: 'industria', texto: 'Conte sobre sua experiencia com desenvolvimento de equipes de qualidade.', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'industria', texto: 'Descreva como voce implementou sistemas de qualidade em novos processos ou produtos.', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Qualidade em NPI' },
  { area: 'industria', texto: 'Como foi sua experiencia com auditorias de organismos certificadores ou clientes estrategicos?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'experiencia', competencia: 'Auditorias Externas' },

  // Comportamental (7)
  { area: 'industria', texto: 'Como voce influencia a alta gestao sobre a importancia estrategica da qualidade?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Estrategica' },
  { area: 'industria', texto: 'De que forma voce desenvolve uma cultura de qualidade que vai alem da inspecao?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Qualidade' },
  { area: 'industria', texto: 'Como voce lida com situacoes em que a pressao comercial colide com padroes de qualidade?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Integridade Profissional' },
  { area: 'industria', texto: 'Descreva como voce promove a colaboracao entre qualidade, producao e engenharia.', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Integracao Interdepartamental' },
  { area: 'industria', texto: 'Como voce desenvolve inspetores e analistas para assumirem maiores responsabilidades?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'industria', texto: 'De que forma voce equilibra a busca pela excelencia com a realidade operacional?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Pragmatismo' },
  { area: 'industria', texto: 'Como voce comunica resultados e iniciativas de qualidade para diferentes publicos?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicacao Multinivel' },

  // Situacional (7)
  { area: 'industria', texto: 'Um problema de qualidade grave afetou varios clientes e gerou recall. Quais acoes voce lidera?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Recall' },
  { area: 'industria', texto: 'A empresa quer reduzir custos de qualidade mas voce ve riscos. Como voce argumenta?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa da Qualidade' },
  { area: 'industria', texto: 'Um cliente estrategico ameaca encerrar contrato por problemas de qualidade. O que voce faz?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Recuperacao de Clientes' },
  { area: 'industria', texto: 'A auditoria de certificacao identificou nao conformidades maiores. Como voce conduz o plano de acao?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Resolucao de Nao Conformidades Criticas' },
  { area: 'industria', texto: 'A producao esta pressionando para mudar especificacoes que voce considera essenciais. Como negocia?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Negociacao de Especificacoes' },
  { area: 'industria', texto: 'A empresa vai lancar um produto em prazo apertado e voce tem duvidas sobre a qualidade. Como procede?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Risco de Lancamento' },
  { area: 'industria', texto: 'Os indicadores de qualidade melhoraram mas as reclamacoes de clientes nao diminuiram. O que voce investiga?', cargo: 'Inspetor de Qualidade', nivel: 'senior', categoria: 'situacional', competencia: 'Analise de Desconexao' },
];

// ============================================
// EXPORTACAO CONSOLIDADA
// ============================================

export const perguntasIndustriaParte1: PerguntaSeed[] = [
  ...operadorProducaoJunior,
  ...operadorProducaoPleno,
  ...supervisorProducaoPleno,
  ...supervisorProducaoSenior,
  ...tecnicoManutencaoJunior,
  ...tecnicoManutencaoPleno,
  ...tecnicoManutencaoSenior,
];

export const perguntasIndustriaParte2: PerguntaSeed[] = [
  ...analistaPCPJunior,
  ...analistaPCPPleno,
  ...analistaPCPSenior,
  ...inspetorQualidadeJunior,
  ...inspetorQualidadePleno,
  ...inspetorQualidadeSenior,
];

// Exportacao principal completa
export const perguntasIndustria: PerguntaSeed[] = [
  ...perguntasIndustriaParte1,
  ...perguntasIndustriaParte2,
];

export const estatisticasIndustria = {
  total: perguntasIndustria.length,
  porCargo: {
    'Operador de Producao Junior': operadorProducaoJunior.length,
    'Operador de Producao Pleno': operadorProducaoPleno.length,
    'Supervisor de Producao Pleno': supervisorProducaoPleno.length,
    'Supervisor de Producao Senior': supervisorProducaoSenior.length,
    'Tecnico de Manutencao Junior': tecnicoManutencaoJunior.length,
    'Tecnico de Manutencao Pleno': tecnicoManutencaoPleno.length,
    'Tecnico de Manutencao Senior': tecnicoManutencaoSenior.length,
    'Analista de PCP Junior': analistaPCPJunior.length,
    'Analista de PCP Pleno': analistaPCPPleno.length,
    'Analista de PCP Senior': analistaPCPSenior.length,
    'Inspetor de Qualidade Junior': inspetorQualidadeJunior.length,
    'Inspetor de Qualidade Pleno': inspetorQualidadePleno.length,
    'Inspetor de Qualidade Senior': inspetorQualidadeSenior.length,
  },
};
