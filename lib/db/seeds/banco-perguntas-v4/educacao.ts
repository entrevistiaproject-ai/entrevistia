/**
 * Banco de Perguntas v4 - Educacao
 *
 * Cargos incluidos:
 * - Professor (Junior, Pleno, Senior) - 73 perguntas
 * - Coordenador Pedagogico (Pleno, Senior) - 52 perguntas
 * - Auxiliar de Educacao Infantil (Junior, Pleno) - 45 perguntas
 * - Orientador Educacional (Pleno, Senior) - 52 perguntas
 *
 * Total: 222 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// PROFESSOR
// ============================================

export const professorJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'educacao', texto: 'Como voce elabora um plano de aula considerando os objetivos de aprendizagem e o perfil da turma?', cargo: 'Professor', nivel: 'junior', categoria: 'tecnica', competencia: 'Planejamento Pedagogico' },
  { area: 'educacao', texto: 'Quais estrategias voce utiliza para avaliar o aprendizado dos alunos de forma continua?', cargo: 'Professor', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliacao' },
  { area: 'educacao', texto: 'Como voce adapta o conteudo programatico para atender diferentes ritmos de aprendizagem?', cargo: 'Professor', nivel: 'junior', categoria: 'tecnica', competencia: 'Diferenciacao Pedagogica' },
  { area: 'educacao', texto: 'Quais recursos didaticos voce considera essenciais para suas aulas e por que?', cargo: 'Professor', nivel: 'junior', categoria: 'tecnica', competencia: 'Recursos Didaticos' },
  { area: 'educacao', texto: 'Como voce estrutura a gestao do tempo durante uma aula para garantir o cumprimento do conteudo?', cargo: 'Professor', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestao de Tempo' },
  { area: 'educacao', texto: 'Quais metodologias ativas de aprendizagem voce conhece e como as aplica?', cargo: 'Professor', nivel: 'junior', categoria: 'tecnica', competencia: 'Metodologias Ativas' },

  // Experiencia (5)
  { area: 'educacao', texto: 'Conte sobre sua experiencia com planejamento e execucao de aulas em sala de aula.', cargo: 'Professor', nivel: 'junior', categoria: 'experiencia', competencia: 'Pratica Docente' },
  { area: 'educacao', texto: 'Descreva uma situacao em que voce precisou adaptar sua aula por imprevistos. Como lidou?', cargo: 'Professor', nivel: 'junior', categoria: 'experiencia', competencia: 'Flexibilidade' },
  { area: 'educacao', texto: 'Como foi sua experiencia com correcao de provas e elaboracao de feedbacks para alunos?', cargo: 'Professor', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback Educacional' },
  { area: 'educacao', texto: 'Descreva um projeto interdisciplinar ou atividade diferenciada que voce desenvolveu.', cargo: 'Professor', nivel: 'junior', categoria: 'experiencia', competencia: 'Projetos Educacionais' },
  { area: 'educacao', texto: 'Conte sobre sua experiencia com uso de tecnologia educacional em sala de aula.', cargo: 'Professor', nivel: 'junior', categoria: 'experiencia', competencia: 'Tecnologia Educacional' },

  // Comportamental (5)
  { area: 'educacao', texto: 'Como voce lida com alunos que apresentam dificuldades de concentracao ou comportamento?', cargo: 'Professor', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestao de Sala' },
  { area: 'educacao', texto: 'De que forma voce busca se atualizar sobre novas praticas pedagogicas?', cargo: 'Professor', nivel: 'junior', categoria: 'comportamental', competencia: 'Desenvolvimento Profissional' },
  { area: 'educacao', texto: 'Como voce estabelece uma relacao de respeito e confianca com seus alunos?', cargo: 'Professor', nivel: 'junior', categoria: 'comportamental', competencia: 'Relacionamento com Alunos' },
  { area: 'educacao', texto: 'Descreva como voce organiza suas atividades para cumprir prazos de entrega de notas e planejamentos.', cargo: 'Professor', nivel: 'junior', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'educacao', texto: 'Como voce reage quando recebe criticas sobre sua metodologia de ensino?', cargo: 'Professor', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade ao Feedback' },

  // Situacional (5)
  { area: 'educacao', texto: 'Um aluno esta constantemente distraido e atrapalhando a aula. O que voce faz?', cargo: 'Professor', nivel: 'junior', categoria: 'situacional', competencia: 'Disciplina' },
  { area: 'educacao', texto: 'Voce percebe que a maioria da turma nao entendeu o conteudo explicado. Como procede?', cargo: 'Professor', nivel: 'junior', categoria: 'situacional', competencia: 'Reensino' },
  { area: 'educacao', texto: 'Um pai questiona agressivamente uma nota que voce deu ao filho. Como age?', cargo: 'Professor', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicacao com Familia' },
  { area: 'educacao', texto: 'Voce descobre que um aluno esta sofrendo bullying na sua turma. Quais sao suas acoes?', cargo: 'Professor', nivel: 'junior', categoria: 'situacional', competencia: 'Protecao ao Aluno' },
  { area: 'educacao', texto: 'O equipamento que voce planejou usar na aula falhou. O que voce faz?', cargo: 'Professor', nivel: 'junior', categoria: 'situacional', competencia: 'Improviso' },
];

export const professorPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'educacao', texto: 'Como voce desenvolve sequencias didaticas que promovam a aprendizagem significativa?', cargo: 'Professor', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sequencias Didaticas' },
  { area: 'educacao', texto: 'Quais instrumentos de avaliacao voce utiliza alem de provas tradicionais?', cargo: 'Professor', nivel: 'pleno', categoria: 'tecnica', competencia: 'Avaliacao Diversificada' },
  { area: 'educacao', texto: 'Como voce integra a BNCC ao seu planejamento curricular?', cargo: 'Professor', nivel: 'pleno', categoria: 'tecnica', competencia: 'Curriculo e BNCC' },
  { area: 'educacao', texto: 'Quais estrategias voce utiliza para promover a inclusao de alunos com necessidades especiais?', cargo: 'Professor', nivel: 'pleno', categoria: 'tecnica', competencia: 'Educacao Inclusiva' },
  { area: 'educacao', texto: 'Como voce estrutura projetos de pesquisa ou investigacao com seus alunos?', cargo: 'Professor', nivel: 'pleno', categoria: 'tecnica', competencia: 'Aprendizagem por Projetos' },
  { area: 'educacao', texto: 'Quais indicadores voce acompanha para monitorar o progresso da turma ao longo do ano?', cargo: 'Professor', nivel: 'pleno', categoria: 'tecnica', competencia: 'Acompanhamento Pedagogico' },

  // Experiencia (6)
  { area: 'educacao', texto: 'Conte sobre um projeto pedagogico que voce liderou e os resultados alcancados.', cargo: 'Professor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lideranca de Projetos' },
  { area: 'educacao', texto: 'Descreva como voce trabalhou com uma turma considerada desafiadora.', cargo: 'Professor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Turmas Desafiadoras' },
  { area: 'educacao', texto: 'Como foi sua experiencia com formacao continuada ou especializacao na area?', cargo: 'Professor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formacao Continuada' },
  { area: 'educacao', texto: 'Descreva uma situacao em que voce precisou mediar um conflito entre alunos.', cargo: 'Professor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Mediacao de Conflitos' },
  { area: 'educacao', texto: 'Conte sobre sua experiencia com reunioes de pais e comunicacao com familias.', cargo: 'Professor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Relacao Familia-Escola' },
  { area: 'educacao', texto: 'Descreva como voce contribuiu para o projeto politico-pedagogico da escola.', cargo: 'Professor', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projeto Politico-Pedagogico' },

  // Comportamental (6)
  { area: 'educacao', texto: 'Como voce equilibra as demandas administrativas com o foco na sala de aula?', cargo: 'Professor', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestao de Demandas' },
  { area: 'educacao', texto: 'De que forma voce colabora com colegas professores para melhorar o ensino?', cargo: 'Professor', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho Colaborativo' },
  { area: 'educacao', texto: 'Como voce lida com a pressao por resultados em avaliacoes externas?', cargo: 'Professor', nivel: 'pleno', categoria: 'comportamental', competencia: 'Pressao por Resultados' },
  { area: 'educacao', texto: 'Descreva como voce mantem a motivacao dos alunos ao longo do ano letivo.', cargo: 'Professor', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivacao de Alunos' },
  { area: 'educacao', texto: 'Como voce gerencia o estresse da profissao docente?', cargo: 'Professor', nivel: 'pleno', categoria: 'comportamental', competencia: 'Autocuidado Profissional' },
  { area: 'educacao', texto: 'De que forma voce promove valores como respeito e cidadania em suas aulas?', cargo: 'Professor', nivel: 'pleno', categoria: 'comportamental', competencia: 'Formacao de Valores' },

  // Situacional (6)
  { area: 'educacao', texto: 'Um aluno apresenta sinais de problemas emocionais serios. Quais sao seus passos?', cargo: 'Professor', nivel: 'pleno', categoria: 'situacional', competencia: 'Apoio Socioemocional' },
  { area: 'educacao', texto: 'A direcao pede que voce assuma mais turmas do que consegue atender bem. Como age?', cargo: 'Professor', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociacao de Limites' },
  { area: 'educacao', texto: 'Dois grupos de alunos estao em conflito e isso afeta o clima da sala. O que voce faz?', cargo: 'Professor', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Conflitos' },
  { area: 'educacao', texto: 'Um aluno com necessidades especiais nao esta recebendo o suporte adequado. Como procede?', cargo: 'Professor', nivel: 'pleno', categoria: 'situacional', competencia: 'Advocacia pelo Aluno' },
  { area: 'educacao', texto: 'Voce discorda da abordagem pedagogica imposta pela escola. Como lida?', cargo: 'Professor', nivel: 'pleno', categoria: 'situacional', competencia: 'Alinhamento Institucional' },
  { area: 'educacao', texto: 'Um pai influente exige tratamento diferenciado para o filho. Qual sua postura?', cargo: 'Professor', nivel: 'pleno', categoria: 'situacional', competencia: 'Etica Profissional' },
];

export const professorSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'educacao', texto: 'Como voce estrutura um curriculo por competencias alinhado as diretrizes nacionais?', cargo: 'Professor', nivel: 'senior', categoria: 'tecnica', competencia: 'Design Curricular' },
  { area: 'educacao', texto: 'Quais metodologias voce utiliza para desenvolver o pensamento critico nos alunos?', cargo: 'Professor', nivel: 'senior', categoria: 'tecnica', competencia: 'Pensamento Critico' },
  { area: 'educacao', texto: 'Como voce implementa a avaliacao formativa de forma sistematica?', cargo: 'Professor', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliacao Formativa' },
  { area: 'educacao', texto: 'Quais estrategias voce usa para personalizar a aprendizagem em escala?', cargo: 'Professor', nivel: 'senior', categoria: 'tecnica', competencia: 'Personalizacao do Ensino' },
  { area: 'educacao', texto: 'Como voce integra competencias socioemocionais ao ensino da sua disciplina?', cargo: 'Professor', nivel: 'senior', categoria: 'tecnica', competencia: 'Competencias Socioemocionais' },
  { area: 'educacao', texto: 'Quais abordagens voce utiliza para desenvolver a autonomia dos estudantes?', cargo: 'Professor', nivel: 'senior', categoria: 'tecnica', competencia: 'Autonomia do Aluno' },
  { area: 'educacao', texto: 'Como voce utiliza dados de aprendizagem para tomar decisoes pedagogicas?', cargo: 'Professor', nivel: 'senior', categoria: 'tecnica', competencia: 'Pedagogia Baseada em Dados' },

  // Experiencia (7)
  { area: 'educacao', texto: 'Conte sobre sua experiencia com formacao de outros professores ou mentoria.', cargo: 'Professor', nivel: 'senior', categoria: 'experiencia', competencia: 'Formacao de Professores' },
  { area: 'educacao', texto: 'Descreva como voce liderou mudancas pedagogicas significativas em uma escola.', cargo: 'Professor', nivel: 'senior', categoria: 'experiencia', competencia: 'Lideranca Pedagogica' },
  { area: 'educacao', texto: 'Como foi sua experiencia com desenvolvimento ou adaptacao de materiais didaticos?', cargo: 'Professor', nivel: 'senior', categoria: 'experiencia', competencia: 'Producao de Materiais' },
  { area: 'educacao', texto: 'Descreva um caso de sucesso na recuperacao de alunos com grande defasagem.', cargo: 'Professor', nivel: 'senior', categoria: 'experiencia', competencia: 'Recuperacao de Aprendizagem' },
  { area: 'educacao', texto: 'Conte sobre sua participacao em pesquisas ou publicacoes na area educacional.', cargo: 'Professor', nivel: 'senior', categoria: 'experiencia', competencia: 'Pesquisa Educacional' },
  { area: 'educacao', texto: 'Descreva como voce implementou inovacoes tecnologicas no contexto educacional.', cargo: 'Professor', nivel: 'senior', categoria: 'experiencia', competencia: 'Inovacao Educacional' },
  { area: 'educacao', texto: 'Como foi sua experiencia com coordenacao de area ou componente curricular?', cargo: 'Professor', nivel: 'senior', categoria: 'experiencia', competencia: 'Coordenacao de Area' },

  // Comportamental (7)
  { area: 'educacao', texto: 'Como voce influencia positivamente a cultura pedagogica da escola?', cargo: 'Professor', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Cultural' },
  { area: 'educacao', texto: 'De que forma voce apoia professores iniciantes em seu desenvolvimento?', cargo: 'Professor', nivel: 'senior', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'educacao', texto: 'Como voce lida com resistencias a mudancas de praticas pedagogicas?', cargo: 'Professor', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestao de Mudancas' },
  { area: 'educacao', texto: 'Descreva como voce promove a reflexao sobre a pratica entre colegas.', cargo: 'Professor', nivel: 'senior', categoria: 'comportamental', competencia: 'Pratica Reflexiva' },
  { area: 'educacao', texto: 'Como voce equilibra inovacao com respeito as tradicoes pedagogicas validas?', cargo: 'Professor', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilibrio Inovacao-Tradicao' },
  { area: 'educacao', texto: 'De que forma voce contribui para politicas educacionais alem da sala de aula?', cargo: 'Professor', nivel: 'senior', categoria: 'comportamental', competencia: 'Engajamento em Politicas' },
  { area: 'educacao', texto: 'Como voce mantem sua paixao pelo ensino apos muitos anos de carreira?', cargo: 'Professor', nivel: 'senior', categoria: 'comportamental', competencia: 'Vocacao Docente' },

  // Situacional (7)
  { area: 'educacao', texto: 'A escola enfrenta queda nos indices de aprendizagem. Que plano voce propoe?', cargo: 'Professor', nivel: 'senior', categoria: 'situacional', competencia: 'Melhoria de Resultados' },
  { area: 'educacao', texto: 'Um grupo de professores resiste a adotar novas metodologias. Como voce age?', cargo: 'Professor', nivel: 'senior', categoria: 'situacional', competencia: 'Influencia de Pares' },
  { area: 'educacao', texto: 'A escola precisa implementar ensino hibrido rapidamente. Como voce contribui?', cargo: 'Professor', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptacao Tecnologica' },
  { area: 'educacao', texto: 'Surge uma polemica sobre conteudo que voce ensinou. Como conduz a situacao?', cargo: 'Professor', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crises' },
  { area: 'educacao', texto: 'A diretoria quer implementar uma metodologia que voce considera inadequada. O que faz?', cargo: 'Professor', nivel: 'senior', categoria: 'situacional', competencia: 'Posicionamento Tecnico' },
  { area: 'educacao', texto: 'Um professor da sua area esta tendo dificuldades serias em sala. Como ajuda?', cargo: 'Professor', nivel: 'senior', categoria: 'situacional', competencia: 'Apoio a Colegas' },
  { area: 'educacao', texto: 'Voce e convidado a liderar uma reformulacao curricular completa. Como estrutura?', cargo: 'Professor', nivel: 'senior', categoria: 'situacional', competencia: 'Lideranca de Transformacao' },
];

// ============================================
// COORDENADOR PEDAGOGICO
// ============================================

export const coordenadorPedagogicoPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'educacao', texto: 'Como voce estrutura o acompanhamento pedagogico dos professores?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Acompanhamento Docente' },
  { area: 'educacao', texto: 'Quais metodologias voce utiliza para formacao continuada da equipe?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Formacao de Professores' },
  { area: 'educacao', texto: 'Como voce analisa dados de desempenho dos alunos para orientar acoes pedagogicas?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Analise de Dados Educacionais' },
  { area: 'educacao', texto: 'Quais instrumentos voce usa para avaliar a qualidade das praticas docentes?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Avaliacao de Praticas' },
  { area: 'educacao', texto: 'Como voce organiza o calendario de reunioes pedagogicas e pauta dos encontros?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Organizacao Pedagogica' },
  { area: 'educacao', texto: 'Quais estrategias voce utiliza para garantir o cumprimento do curriculo?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao Curricular' },

  // Experiencia (6)
  { area: 'educacao', texto: 'Conte sobre sua experiencia com implementacao de projetos de melhoria pedagogica.', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de Melhoria' },
  { area: 'educacao', texto: 'Descreva como voce apoiou um professor com dificuldades em sala de aula.', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Apoio ao Docente' },
  { area: 'educacao', texto: 'Como foi sua experiencia com mediacao de conflitos entre professores e familias?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Mediacao de Conflitos' },
  { area: 'educacao', texto: 'Descreva um programa de formacao continuada que voce planejou e executou.', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Programas de Formacao' },
  { area: 'educacao', texto: 'Conte sobre como voce conduziu a adaptacao curricular para alunos com necessidades especiais.', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Inclusao Educacional' },
  { area: 'educacao', texto: 'Descreva sua experiencia com elaboracao ou revisao do projeto politico-pedagogico.', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'experiencia', competencia: 'PPP' },

  // Comportamental (6)
  { area: 'educacao', texto: 'Como voce equilibra o papel de apoio com a necessidade de cobrar resultados dos professores?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Lideranca Equilibrada' },
  { area: 'educacao', texto: 'De que forma voce constroi uma relacao de confianca com a equipe docente?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento com Equipe' },
  { area: 'educacao', texto: 'Como voce lida com professores resistentes a orientacoes pedagogicas?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestao de Resistencias' },
  { area: 'educacao', texto: 'Descreva como voce se mantem atualizado sobre tendencias educacionais.', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualizacao Profissional' },
  { area: 'educacao', texto: 'Como voce gerencia as multiplas demandas da funcao de coordenador?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestao de Prioridades' },
  { area: 'educacao', texto: 'De que forma voce promove o trabalho colaborativo entre professores?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboracao Docente' },

  // Situacional (6)
  { area: 'educacao', texto: 'Um professor veterano recusa-se a mudar praticas ultrapassadas. Como voce age?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Mudanca' },
  { area: 'educacao', texto: 'Os resultados de uma turma estao muito abaixo do esperado. Quais suas acoes?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'situacional', competencia: 'Intervencao Pedagogica' },
  { area: 'educacao', texto: 'Pais reclamam da metodologia de um professor que voce considera competente. O que faz?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'situacional', competencia: 'Defesa da Equipe' },
  { area: 'educacao', texto: 'Dois professores estao em conflito e isso afeta o ambiente escolar. Como procede?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Conflitos' },
  { area: 'educacao', texto: 'A escola precisa adotar um novo material didatico com urgencia. Como conduz?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'situacional', competencia: 'Implementacao de Mudancas' },
  { area: 'educacao', texto: 'Um professor denuncia irregularidades na avaliacao de um colega. O que voce faz?', cargo: 'Coordenador Pedagogico', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Denuncias' },
];

export const coordenadorPedagogicoSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'educacao', texto: 'Como voce estrutura um sistema de gestao pedagogica para toda a escola?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestao Pedagogica Sistemica' },
  { area: 'educacao', texto: 'Quais indicadores voce utiliza para medir a eficacia das praticas pedagogicas?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'tecnica', competencia: 'Indicadores de Qualidade' },
  { area: 'educacao', texto: 'Como voce desenvolve programas de formacao diferenciados por perfil docente?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'tecnica', competencia: 'Formacao Personalizada' },
  { area: 'educacao', texto: 'Quais metodologias voce utiliza para construir uma cultura de aprendizagem continua?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'tecnica', competencia: 'Cultura de Aprendizagem' },
  { area: 'educacao', texto: 'Como voce integra avaliacao institucional com desenvolvimento pedagogico?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliacao Institucional' },
  { area: 'educacao', texto: 'Quais estrategias voce usa para alinhar praticas pedagogicas com metas institucionais?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'tecnica', competencia: 'Alinhamento Estrategico' },
  { area: 'educacao', texto: 'Como voce estrutura comunidades de pratica entre os professores?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'tecnica', competencia: 'Comunidades de Pratica' },

  // Experiencia (7)
  { area: 'educacao', texto: 'Conte sobre uma transformacao pedagogica significativa que voce liderou.', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'experiencia', competencia: 'Transformacao Pedagogica' },
  { area: 'educacao', texto: 'Descreva como voce desenvolveu liderancas pedagogicas na sua equipe.', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Lideres' },
  { area: 'educacao', texto: 'Como foi sua experiencia com implantacao de novas metodologias em larga escala?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'experiencia', competencia: 'Implantacao de Metodologias' },
  { area: 'educacao', texto: 'Descreva um caso de recuperacao de indicadores educacionais que voce conduziu.', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'experiencia', competencia: 'Recuperacao de Indicadores' },
  { area: 'educacao', texto: 'Conte sobre sua experiencia com articulacao entre diferentes segmentos escolares.', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'experiencia', competencia: 'Articulacao de Segmentos' },
  { area: 'educacao', texto: 'Descreva como voce conduziu processos de acreditacao ou certificacao escolar.', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'experiencia', competencia: 'Processos de Certificacao' },
  { area: 'educacao', texto: 'Como foi sua participacao na elaboracao de politicas educacionais institucionais?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'experiencia', competencia: 'Politicas Institucionais' },

  // Comportamental (7)
  { area: 'educacao', texto: 'Como voce influencia a visao estrategica da escola a partir da perspectiva pedagogica?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Estrategica' },
  { area: 'educacao', texto: 'De que forma voce promove inovacao mantendo a estabilidade das operacoes?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovacao Controlada' },
  { area: 'educacao', texto: 'Como voce constroi consenso em torno de mudancas pedagogicas significativas?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'comportamental', competencia: 'Construcao de Consenso' },
  { area: 'educacao', texto: 'Descreva como voce desenvolve a capacidade de autoavaliacao na equipe.', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Autoavaliacao' },
  { area: 'educacao', texto: 'Como voce lida com pressoes conflitantes da direcao e da equipe docente?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'comportamental', competencia: 'Mediacao Institucional' },
  { area: 'educacao', texto: 'De que forma voce contribui para o posicionamento pedagogico da escola no mercado?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'comportamental', competencia: 'Posicionamento Pedagogico' },
  { area: 'educacao', texto: 'Como voce promove a sustentabilidade das inovacoes implementadas?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'comportamental', competencia: 'Sustentabilidade de Inovacoes' },

  // Situacional (7)
  { area: 'educacao', texto: 'A escola enfrenta alta rotatividade docente. Que estrategias voce propoe?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'situacional', competencia: 'Retencao de Talentos' },
  { area: 'educacao', texto: 'Os indicadores de satisfacao de pais caem significativamente. Como voce age?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Satisfacao' },
  { area: 'educacao', texto: 'A direcao quer cortar investimentos em formacao docente. Como voce argumenta?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Investimentos' },
  { area: 'educacao', texto: 'Uma mudanca regulatoria exige reestruturacao curricular urgente. Como conduz?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptacao Regulatoria' },
  { area: 'educacao', texto: 'Um grupo de professores questiona publicamente suas decisoes. O que faz?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Conflitos Publicos' },
  { area: 'educacao', texto: 'A escola precisa se diferenciar pedagogicamente da concorrencia. Qual seu plano?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'situacional', competencia: 'Diferenciacao Competitiva' },
  { area: 'educacao', texto: 'Surge uma crise que afeta a reputacao pedagogica da escola. Como gerencia?', cargo: 'Coordenador Pedagogico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crise Reputacional' },
];

// ============================================
// AUXILIAR DE EDUCACAO INFANTIL
// ============================================

export const auxiliarEducacaoInfantilJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'educacao', texto: 'Como voce auxilia nas atividades de rotina das criancas (alimentacao, higiene, descanso)?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'tecnica', competencia: 'Rotina Infantil' },
  { area: 'educacao', texto: 'Quais cuidados voce toma ao preparar e organizar materiais para as atividades pedagogicas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'tecnica', competencia: 'Organizacao de Materiais' },
  { area: 'educacao', texto: 'Como voce acompanha as criancas durante atividades ao ar livre garantindo a seguranca?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'tecnica', competencia: 'Supervisao de Seguranca' },
  { area: 'educacao', texto: 'Quais procedimentos voce segue para o registro do acompanhamento diario das criancas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'tecnica', competencia: 'Registros Diarios' },
  { area: 'educacao', texto: 'Como voce auxilia na adaptacao de criancas novas na escola?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'tecnica', competencia: 'Acolhimento' },
  { area: 'educacao', texto: 'Quais cuidados voce toma na hora da soneca e descanso das criancas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'tecnica', competencia: 'Momento de Descanso' },

  // Experiencia (5)
  { area: 'educacao', texto: 'Conte sobre sua experiencia com cuidado e educacao de criancas pequenas.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'experiencia', competencia: 'Cuidado Infantil' },
  { area: 'educacao', texto: 'Descreva uma situacao em que voce precisou lidar com uma crianca em crise de choro ou birra.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'experiencia', competencia: 'Manejo de Emocoes' },
  { area: 'educacao', texto: 'Como foi sua experiencia com alimentacao de criancas e estímulo a alimentacao saudavel?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'experiencia', competencia: 'Alimentacao Infantil' },
  { area: 'educacao', texto: 'Descreva sua participacao em atividades ludicas ou recreativas com criancas.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'experiencia', competencia: 'Atividades Ludicas' },
  { area: 'educacao', texto: 'Conte sobre uma experiencia de trabalho em equipe com professores e outros auxiliares.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (5)
  { area: 'educacao', texto: 'Como voce demonstra paciencia ao lidar com criancas em momentos dificeis?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'comportamental', competencia: 'Paciencia' },
  { area: 'educacao', texto: 'De que forma voce se comunica com as criancas de maneira afetuosa e clara?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicacao Afetiva' },
  { area: 'educacao', texto: 'Como voce mantem a calma em situacoes de emergencia ou imprevisto com as criancas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'comportamental', competencia: 'Controle Emocional' },
  { area: 'educacao', texto: 'Descreva como voce segue orientacoes da professora titular da turma.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'comportamental', competencia: 'Seguir Orientacoes' },
  { area: 'educacao', texto: 'Como voce demonstra carinho e cuidado genuino pelas criancas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'comportamental', competencia: 'Afetividade' },

  // Situacional (5)
  { area: 'educacao', texto: 'Uma crianca se machuca levemente durante a brincadeira. O que voce faz?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'situacional', competencia: 'Primeiros Socorros' },
  { area: 'educacao', texto: 'Uma crianca recusa-se a comer. Como voce procede?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'situacional', competencia: 'Alimentacao' },
  { area: 'educacao', texto: 'Voce percebe que uma crianca esta se isolando das outras. O que faz?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'situacional', competencia: 'Observacao' },
  { area: 'educacao', texto: 'Duas criancas estao brigando por um brinquedo. Como voce intervem?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'situacional', competencia: 'Mediacao de Conflitos' },
  { area: 'educacao', texto: 'Um pai chega para buscar a crianca, mas nao esta na lista de autorizados. O que faz?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'junior', categoria: 'situacional', competencia: 'Protocolo de Seguranca' },
];

export const auxiliarEducacaoInfantilPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'educacao', texto: 'Como voce contribui para o planejamento e execucao de atividades pedagogicas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Apoio Pedagogico' },
  { area: 'educacao', texto: 'Quais estrategias voce utiliza para estimular o desenvolvimento motor das criancas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Desenvolvimento Motor' },
  { area: 'educacao', texto: 'Como voce observa e registra o desenvolvimento das criancas para apoiar a professora?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Observacao do Desenvolvimento' },
  { area: 'educacao', texto: 'Quais atividades voce sugere para desenvolver a socializacao entre as criancas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Socializacao' },
  { area: 'educacao', texto: 'Como voce auxilia criancas com necessidades especiais ou dificuldades de aprendizagem?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Apoio a Inclusao' },
  { area: 'educacao', texto: 'Quais brincadeiras e jogos voce considera mais adequados para cada faixa etaria?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atividades por Faixa Etaria' },

  // Experiencia (6)
  { area: 'educacao', texto: 'Conte sobre sua experiencia com turmas de diferentes faixas etarias na educacao infantil.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Versatilidade' },
  { area: 'educacao', texto: 'Descreva como voce ajudou uma crianca em processo de desfralde.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desfralde' },
  { area: 'educacao', texto: 'Como foi sua experiencia com organizacao de eventos e festas escolares?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Eventos Escolares' },
  { area: 'educacao', texto: 'Descreva uma situacao em que voce identificou algo atipico no comportamento de uma crianca.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Deteccao de Problemas' },
  { area: 'educacao', texto: 'Conte sobre sua experiencia com comunicacao diaria com as familias.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Comunicacao com Familias' },
  { area: 'educacao', texto: 'Descreva como voce contribuiu para a adaptacao de uma crianca com dificuldades.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'experiencia', competencia: 'Adaptacao de Criancas' },

  // Comportamental (6)
  { area: 'educacao', texto: 'Como voce equilibra autoridade com carinho no trato com as criancas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilibrio Autoridade-Afeto' },
  { area: 'educacao', texto: 'De que forma voce colabora proativamente com a professora titular?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Proatividade' },
  { area: 'educacao', texto: 'Como voce lida com situacoes em que discorda de orientacoes recebidas?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicacao Assertiva' },
  { area: 'educacao', texto: 'Descreva como voce busca se aprimorar no trabalho com educacao infantil.', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Busca de Aprendizado' },
  { area: 'educacao', texto: 'Como voce mantem a energia e disposicao para atender criancas durante todo o dia?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Vitalidade' },
  { area: 'educacao', texto: 'De que forma voce contribui para um ambiente de trabalho harmonioso?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'comportamental', competencia: 'Clima de Trabalho' },

  // Situacional (6)
  { area: 'educacao', texto: 'Uma crianca relata algo preocupante que aconteceu em casa. O que voce faz?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'situacional', competencia: 'Protecao a Crianca' },
  { area: 'educacao', texto: 'A professora precisa se ausentar e voce fica responsavel pela turma momentaneamente. Como age?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'situacional', competencia: 'Responsabilidade' },
  { area: 'educacao', texto: 'Um pai faz uma reclamacao sobre os cuidados com seu filho. Como voce responde?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento a Familia' },
  { area: 'educacao', texto: 'Voce percebe que uma crianca pode ter uma alergia alimentar. Quais suas acoes?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'situacional', competencia: 'Emergencia de Saude' },
  { area: 'educacao', texto: 'A turma esta muito agitada e a professora esta com dificuldade. Como voce ajuda?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'situacional', competencia: 'Apoio em Crise' },
  { area: 'educacao', texto: 'Uma crianca nova esta tendo muita dificuldade na adaptacao. Como voce contribui?', cargo: 'Auxiliar de Educacao Infantil', nivel: 'pleno', categoria: 'situacional', competencia: 'Acolhimento Especial' },
];

// ============================================
// ORIENTADOR EDUCACIONAL
// ============================================

export const orientadorEducacionalPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'educacao', texto: 'Como voce estrutura o acompanhamento individual de alunos com dificuldades?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'tecnica', competencia: 'Acompanhamento Individual' },
  { area: 'educacao', texto: 'Quais instrumentos voce utiliza para identificar alunos que precisam de apoio?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'tecnica', competencia: 'Identificacao de Necessidades' },
  { area: 'educacao', texto: 'Como voce desenvolve projetos de orientacao profissional para os alunos?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'tecnica', competencia: 'Orientacao Profissional' },
  { area: 'educacao', texto: 'Quais estrategias voce usa para trabalhar temas socioemocionais com as turmas?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'tecnica', competencia: 'Educacao Socioemocional' },
  { area: 'educacao', texto: 'Como voce conduz mediacao de conflitos entre alunos?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'tecnica', competencia: 'Mediacao de Conflitos' },
  { area: 'educacao', texto: 'Quais protocolos voce segue para encaminhamento de alunos a profissionais externos?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'tecnica', competencia: 'Encaminhamentos' },

  // Experiencia (6)
  { area: 'educacao', texto: 'Conte sobre sua experiencia com acompanhamento de alunos em risco de evasao.', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'experiencia', competencia: 'Prevencao de Evasao' },
  { area: 'educacao', texto: 'Descreva como voce ajudou um aluno a superar dificuldades emocionais que afetavam o aprendizado.', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'experiencia', competencia: 'Apoio Emocional' },
  { area: 'educacao', texto: 'Como foi sua experiencia com organizacao de palestras e eventos sobre temas relevantes?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'experiencia', competencia: 'Eventos Educativos' },
  { area: 'educacao', texto: 'Descreva uma situacao em que voce mediou um conflito serio entre aluno e professor.', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'experiencia', competencia: 'Mediacao Complexa' },
  { area: 'educacao', texto: 'Conte sobre sua experiencia com orientacao de familias sobre questoes comportamentais.', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'experiencia', competencia: 'Orientacao Familiar' },
  { area: 'educacao', texto: 'Descreva como voce colaborou com professores na gestao de turmas desafiadoras.', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'experiencia', competencia: 'Apoio aos Professores' },

  // Comportamental (6)
  { area: 'educacao', texto: 'Como voce constroi uma relacao de confianca com os alunos para que se abram?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'comportamental', competencia: 'Construcao de Confianca' },
  { area: 'educacao', texto: 'De que forma voce mantem a imparcialidade em situacoes de conflito?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'comportamental', competencia: 'Imparcialidade' },
  { area: 'educacao', texto: 'Como voce lida com informacoes confidenciais e sensiveis sobre alunos?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'comportamental', competencia: 'Confidencialidade' },
  { area: 'educacao', texto: 'Descreva como voce se mantem atualizado sobre questoes da juventude atual.', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'comportamental', competencia: 'Compreensao da Juventude' },
  { area: 'educacao', texto: 'Como voce cuida do seu proprio equilibrio emocional diante de casos dificeis?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'comportamental', competencia: 'Autocuidado' },
  { area: 'educacao', texto: 'De que forma voce articula seu trabalho com outros profissionais da escola?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho Multidisciplinar' },

  // Situacional (6)
  { area: 'educacao', texto: 'Um aluno revela que esta pensando em se machucar. Quais sao suas primeiras acoes?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'situacional', competencia: 'Risco de Autolesao' },
  { area: 'educacao', texto: 'Voce percebe sinais de que um aluno pode estar sofrendo abuso. O que faz?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'situacional', competencia: 'Protecao contra Abuso' },
  { area: 'educacao', texto: 'Um grupo de alunos esta praticando bullying contra um colega. Como voce intervem?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'situacional', competencia: 'Intervencao em Bullying' },
  { area: 'educacao', texto: 'Os pais se recusam a aceitar que o filho precisa de acompanhamento especializado. Como age?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'situacional', competencia: 'Convencimento de Familias' },
  { area: 'educacao', texto: 'Um aluno esta com queda brusca de rendimento apos uma perda familiar. Como voce apoia?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'situacional', competencia: 'Apoio ao Luto' },
  { area: 'educacao', texto: 'Descobre-se uso de drogas por um grupo de alunos. Qual e sua abordagem?', cargo: 'Orientador Educacional', nivel: 'pleno', categoria: 'situacional', competencia: 'Prevencao de Drogas' },
];

export const orientadorEducacionalSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'educacao', texto: 'Como voce estrutura um programa institucional de orientacao educacional?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'tecnica', competencia: 'Programa Institucional' },
  { area: 'educacao', texto: 'Quais indicadores voce utiliza para avaliar a eficacia do servico de orientacao?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliacao de Resultados' },
  { area: 'educacao', texto: 'Como voce desenvolve politicas de prevencao de problemas comportamentais e emocionais?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'tecnica', competencia: 'Politicas de Prevencao' },
  { area: 'educacao', texto: 'Quais metodologias voce usa para trabalhar cultura de paz e convivencia escolar?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'tecnica', competencia: 'Cultura de Paz' },
  { area: 'educacao', texto: 'Como voce integra a orientacao educacional ao projeto politico-pedagogico?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'tecnica', competencia: 'Integracao ao PPP' },
  { area: 'educacao', texto: 'Quais parcerias externas voce considera essenciais para o servico de orientacao?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'tecnica', competencia: 'Rede de Apoio Externa' },
  { area: 'educacao', texto: 'Como voce estrutura programas de desenvolvimento de competencias socioemocionais?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'tecnica', competencia: 'Programa Socioemocional' },

  // Experiencia (7)
  { area: 'educacao', texto: 'Conte sobre sua experiencia com implantacao de servico de orientacao em uma escola.', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'experiencia', competencia: 'Implantacao de Servico' },
  { area: 'educacao', texto: 'Descreva como voce liderou uma intervencao em caso de crise na comunidade escolar.', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestao de Crise' },
  { area: 'educacao', texto: 'Como foi sua experiencia com formacao de professores em questoes socioemocionais?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'experiencia', competencia: 'Formacao de Educadores' },
  { area: 'educacao', texto: 'Descreva um programa de prevencao que voce desenvolveu e seus resultados.', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'experiencia', competencia: 'Programas de Prevencao' },
  { area: 'educacao', texto: 'Conte sobre sua experiencia com articulacao com orgaos de protecao a crianca e adolescente.', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'experiencia', competencia: 'Rede de Protecao' },
  { area: 'educacao', texto: 'Descreva como voce desenvolveu a equipe de orientacao ou apoio escolar.', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'educacao', texto: 'Como foi sua participacao na elaboracao de politicas institucionais sobre disciplina e convivencia?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'experiencia', competencia: 'Politicas de Convivencia' },

  // Comportamental (7)
  { area: 'educacao', texto: 'Como voce influencia a cultura escolar para tornar o ambiente mais acolhedor?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Cultural' },
  { area: 'educacao', texto: 'De que forma voce desenvolve a capacidade de escuta empatica na comunidade escolar?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'comportamental', competencia: 'Promocao da Empatia' },
  { area: 'educacao', texto: 'Como voce lida com pressoes para acelerar processos que requerem tempo e cuidado?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'comportamental', competencia: 'Advocacia pelo Aluno' },
  { area: 'educacao', texto: 'Descreva como voce promove o protagonismo dos alunos em questoes que os afetam.', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'comportamental', competencia: 'Protagonismo Juvenil' },
  { area: 'educacao', texto: 'Como voce equilibra acolhimento com a necessidade de estabelecer limites?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'comportamental', competencia: 'Acolhimento com Limites' },
  { area: 'educacao', texto: 'De que forma voce contribui para que a escola seja um espaco seguro para diversidade?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'comportamental', competencia: 'Ambiente Inclusivo' },
  { area: 'educacao', texto: 'Como voce mantem esperanca e otimismo diante de casos muito dificeis?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliencia Profissional' },

  // Situacional (7)
  { area: 'educacao', texto: 'Ocorre um caso grave de violencia na escola. Como voce coordena a resposta institucional?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'situacional', competencia: 'Resposta a Violencia' },
  { area: 'educacao', texto: 'Um aluno comete suicidio. Como voce conduz o acolhimento da comunidade escolar?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'situacional', competencia: 'Posvencao de Suicidio' },
  { area: 'educacao', texto: 'Surge um movimento de cyberbullying envolvendo varios alunos. Qual sua estrategia?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'situacional', competencia: 'Cyberbullying' },
  { area: 'educacao', texto: 'A escola enfrenta crescimento de problemas de saude mental entre alunos. O que propoe?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'situacional', competencia: 'Saude Mental Escolar' },
  { area: 'educacao', texto: 'Um grupo de pais questiona as abordagens de educacao socioemocional. Como responde?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Praticas' },
  { area: 'educacao', texto: 'Identifica-se uma rede de trafico envolvendo alunos proxima a escola. Quais suas acoes?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'situacional', competencia: 'Articulacao com Seguranca' },
  { area: 'educacao', texto: 'A direcao quer reduzir o servico de orientacao por questoes orcamentarias. Como defende?', cargo: 'Orientador Educacional', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa do Servico' },
];

// ============================================
// EXPORTACAO CONSOLIDADA
// ============================================

export const perguntasEducacao = [
  // Professor
  ...professorJunior,
  ...professorPleno,
  ...professorSenior,
  // Coordenador Pedagogico
  ...coordenadorPedagogicoPleno,
  ...coordenadorPedagogicoSenior,
  // Auxiliar de Educacao Infantil
  ...auxiliarEducacaoInfantilJunior,
  ...auxiliarEducacaoInfantilPleno,
  // Orientador Educacional
  ...orientadorEducacionalPleno,
  ...orientadorEducacionalSenior,
];

export const estatisticasEducacao = {
  total: perguntasEducacao.length,
  porCargo: {
    'Professor': professorJunior.length + professorPleno.length + professorSenior.length,
    'Coordenador Pedagogico': coordenadorPedagogicoPleno.length + coordenadorPedagogicoSenior.length,
    'Auxiliar de Educacao Infantil': auxiliarEducacaoInfantilJunior.length + auxiliarEducacaoInfantilPleno.length,
    'Orientador Educacional': orientadorEducacionalPleno.length + orientadorEducacionalSenior.length,
  },
};
