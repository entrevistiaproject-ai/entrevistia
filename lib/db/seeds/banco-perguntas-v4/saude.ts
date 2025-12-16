/**
 * Banco de Perguntas v4 - SAÚDE
 *
 * Melhorias aplicadas:
 * - Perguntas aprofundadas (sem sim/não)
 * - Variações por nível (Junior, Pleno, Senior)
 * - Perguntas de case e cenário realistas
 * - Tom cordial de recrutador experiente
 * - Foco em competências práticas e soft skills
 *
 * CONTROLE DE PROGRESSO:
 * ✅ Parte 1: Enfermeiro, Técnico de Enfermagem, Recepcionista, Fisioterapeuta
 * ✅ Parte 2: Farmacêutico, Nutricionista, Psicólogo, Auxiliar de Saúde Bucal
 * ✅ Parte 3: Cirurgião-Dentista, Técnico em Saúde Bucal
 *
 * Total: ~594 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// ENFERMEIRO
// ============================================

export const enfermeiroJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Me conte como você realiza a verificação dos sinais vitais e quais parâmetros considera mais críticos para alertar a equipe médica imediatamente.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Sinais Vitais e Monitoramento' },
  { area: 'saude', texto: 'Descreva o passo a passo que você segue para administrar medicamentos por via endovenosa, incluindo as checagens de segurança que realiza.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Administração de Medicamentos' },
  { area: 'saude', texto: 'Como você organiza e prioriza os cuidados de enfermagem quando assume um plantão com múltiplos pacientes?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Procedimentos de Enfermagem' },
  { area: 'saude', texto: 'Explique como você realiza a documentação no prontuário do paciente e quais informações considera essenciais registrar.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação Clínica' },
  { area: 'saude', texto: 'Descreva sua experiência com curativos e os diferentes tipos de coberturas que você já utilizou, explicando quando cada um é mais indicado.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Curativos e Procedimentos Invasivos' },
  { area: 'saude', texto: 'Quais protocolos de segurança do paciente você conhece e como os aplica no seu dia a dia de trabalho?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Protocolos de Segurança do Paciente' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação em enfermagem e os estágios que mais contribuíram para seu desenvolvimento profissional.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação em que você precisou lidar com uma emergência durante seu estágio ou início de carreira. Como você reagiu?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Emergências e Primeiros Socorros' },
  { area: 'saude', texto: 'Me fale sobre sua experiência com diferentes setores hospitalares e qual área você tem mais afinidade.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Hospitalar' },
  { area: 'saude', texto: 'Como foi sua adaptação ao ambiente hospitalar nos primeiros meses de trabalho? Quais foram os maiores desafios?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Conte sobre algum paciente que marcou sua trajetória inicial e o que você aprendeu com essa experiência.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você lida com o estresse e a pressão emocional de trabalhar com pacientes em estado grave?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência Emocional' },
  { area: 'saude', texto: 'Descreva como você se comunica com familiares de pacientes que estão ansiosos ou preocupados com o tratamento.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação com Pacientes/Familiares' },
  { area: 'saude', texto: 'Me conte sobre uma situação em que você precisou trabalhar em equipe para resolver um problema com um paciente.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você demonstra empatia no cuidado diário com os pacientes, especialmente aqueles em situações difíceis?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia e Humanização' },
  { area: 'saude', texto: 'Descreva como você organiza seu tempo durante um plantão para garantir que todos os pacientes recebam os cuidados necessários.', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },

  // Situacional (5)
  { area: 'saude', texto: 'Imagine que você está administrando uma medicação e percebe que o paciente apresenta uma reação alérgica. O que você faria?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Emergências e Primeiros Socorros' },
  { area: 'saude', texto: 'Se um familiar de paciente questionar agressivamente uma conduta médica, como você conduziria essa situação?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação com Pacientes/Familiares' },
  { area: 'saude', texto: 'Você percebe que um colega não está seguindo corretamente os protocolos de higienização das mãos. Como abordaria isso?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Durante a passagem de plantão, você recebe informações incompletas sobre um paciente crítico. O que você faria?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Documentação Clínica' },
  { area: 'saude', texto: 'Um paciente se recusa a tomar a medicação prescrita. Como você lidaria com essa situação?', cargo: 'Enfermeiro', nivel: 'junior', categoria: 'situacional', competencia: 'Empatia e Humanização' },
];

export const enfermeiroPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Explique como você avalia e monitora pacientes em uso de drogas vasoativas, incluindo os parâmetros que acompanha e as intervenções que realiza.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sinais Vitais e Monitoramento' },
  { area: 'saude', texto: 'Descreva sua experiência com procedimentos invasivos como passagem de sonda vesical e nasogástrica, incluindo os cuidados pré e pós-procedimento.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Curativos e Procedimentos Invasivos' },
  { area: 'saude', texto: 'Como você elabora e implementa o plano de cuidados de enfermagem (SAE) para pacientes com condições complexas?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Procedimentos de Enfermagem' },
  { area: 'saude', texto: 'Me explique como você gerencia a administração de medicamentos de alta vigilância e quais barreiras de segurança implementa.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Administração de Medicamentos' },
  { area: 'saude', texto: 'Descreva sua experiência com protocolos de prevenção de lesão por pressão e as estratégias que utiliza para pacientes de alto risco.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Protocolos de Segurança do Paciente' },
  { area: 'saude', texto: 'Como você conduz o atendimento inicial em situações de parada cardiorrespiratória enquanto aguarda a equipe de emergência?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Emergências e Primeiros Socorros' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional e como você evoluiu desde o início da carreira até o momento atual.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação complexa que você enfrentou com um paciente e como suas habilidades técnicas fizeram diferença no desfecho.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em capacitar ou orientar colegas menos experientes na equipe.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você tem se atualizado profissionalmente? Quais cursos ou especializações agregaram mais valor à sua prática?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Conte sobre uma melhoria de processo ou protocolo que você sugeriu ou implementou em algum local onde trabalhou.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Descreva sua experiência com diferentes perfis de pacientes (pediátricos, geriátricos, oncológicos) e os desafios específicos de cada um.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vivência Hospitalar' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você lida com situações de conflito entre membros da equipe de enfermagem durante o plantão?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Descreva como você equilibra as demandas técnicas do trabalho com o cuidado humanizado ao paciente.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empatia e Humanização' },
  { area: 'saude', texto: 'Me conte sobre uma situação em que você precisou tomar uma decisão difícil rapidamente. Como você procedeu?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Como você mantém sua saúde mental e emocional trabalhando em um ambiente de alta pressão como a área da saúde?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência Emocional' },
  { area: 'saude', texto: 'Descreva sua abordagem ao comunicar más notícias ou informações delicadas aos familiares de pacientes.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação com Pacientes/Familiares' },
  { area: 'saude', texto: 'Como você reage quando percebe que cometeu um erro no cuidado ao paciente? Me dê um exemplo de como lidou com isso.', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (6)
  { area: 'saude', texto: 'Você está coordenando o plantão e dois pacientes apresentam piora simultânea. Como você priorizaria o atendimento e organizaria a equipe?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Um médico prescreve uma medicação em dose que você considera inadequada. Como você conduziria essa situação?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Durante seu plantão, você identifica sinais de maus-tratos em um paciente. Quais seriam seus próximos passos?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Protocolos de Segurança do Paciente' },
  { area: 'saude', texto: 'Um técnico de enfermagem sob sua supervisão está apresentando comportamento inadequado com pacientes. Como você abordaria isso?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'O sistema de prontuário eletrônico fica fora do ar durante seu plantão. Como você garantiria a continuidade e segurança dos registros?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Documentação Clínica' },
  { area: 'saude', texto: 'Um paciente terminal pede para que você não realize mais procedimentos invasivos, contrariando a orientação médica. Como você procederia?', cargo: 'Enfermeiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Empatia e Humanização' },
];

export const enfermeiroSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'saude', texto: 'Como você estrutura e lidera a implementação de novos protocolos assistenciais na equipe de enfermagem?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Procedimentos de Enfermagem' },
  { area: 'saude', texto: 'Descreva sua experiência com gestão de indicadores de qualidade assistencial e como utiliza esses dados para melhorias.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Protocolos de Segurança do Paciente' },
  { area: 'saude', texto: 'Me explique como você conduz a análise de eventos adversos e near misses, e como transforma isso em aprendizado para a equipe.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Protocolos de Segurança do Paciente' },
  { area: 'saude', texto: 'Descreva sua abordagem para dimensionamento de equipe de enfermagem considerando complexidade dos pacientes e carga de trabalho.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você coordena a assistência em situações de múltiplas vítimas ou emergências com grande demanda simultânea?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Emergências e Primeiros Socorros' },
  { area: 'saude', texto: 'Explique sua experiência com auditorias de prontuários e como garante a qualidade da documentação da equipe.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Documentação Clínica' },
  { area: 'saude', texto: 'Descreva como você estrutura programas de educação continuada para a equipe de enfermagem.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'tecnica', competencia: 'Formação de Equipe' },

  // Experiência (7)
  { area: 'saude', texto: 'Conte sobre sua trajetória até chegar a uma posição de liderança na enfermagem e os principais marcos dessa jornada.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um projeto de melhoria assistencial que você liderou do início ao fim e os resultados alcançados.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em processos de acreditação hospitalar e seu papel nesses projetos.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Protocolos de Segurança do Paciente' },
  { area: 'saude', texto: 'Como você desenvolveu suas habilidades de liderança ao longo da carreira? Quais experiências foram mais transformadoras?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Conte sobre uma crise ou situação crítica que você gerenciou e como mobilizou a equipe para superá-la.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Trabalho sob Pressão' },
  { area: 'saude', texto: 'Descreva sua experiência com gestão de orçamento e recursos materiais na área de enfermagem.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Recursos' },
  { area: 'saude', texto: 'Me fale sobre profissionais que você desenvolveu e mentorou, e como acompanhou o crescimento deles.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Equipe' },

  // Comportamental (7)
  { area: 'saude', texto: 'Como você equilibra as demandas administrativas da gestão com a necessidade de estar presente junto à equipe e aos pacientes?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva sua abordagem para lidar com profissionais de baixo desempenho ou comportamento inadequado na equipe.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você mantém a motivação e engajamento da equipe em períodos de alta pressão ou escassez de recursos?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Me conte como você lida com decisões impopulares que precisam ser tomadas para o bem do serviço ou dos pacientes.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Descreva como você constrói e mantém relacionamentos profissionais com outras lideranças e áreas do hospital.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Como você gerencia seu próprio desenvolvimento profissional e se mantém atualizado nas melhores práticas de gestão em saúde?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Descreva como você promove uma cultura de segurança do paciente e responsabilização sem punição na equipe.', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (7)
  { area: 'saude', texto: 'Você recebe uma denúncia de assédio moral envolvendo um enfermeiro experiente e valorizado tecnicamente. Como conduziria a situação?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'A direção solicita redução de custos que você acredita que pode comprometer a qualidade assistencial. Como negociaria isso?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Recursos' },
  { area: 'saude', texto: 'Dois médicos de especialidades diferentes estão em conflito sobre a conduta de um paciente, e isso está afetando a equipe. Como você interviria?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você identifica que um protocolo institucional está desatualizado e pode estar causando danos aos pacientes. Quais seriam seus passos?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Protocolos de Segurança do Paciente' },
  { area: 'saude', texto: 'Sua equipe está com déficit de 30% de profissionais devido a afastamentos. Como você reorganizaria o trabalho mantendo a segurança?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Um familiar influente de paciente ameaça processar o hospital por uma conduta da sua equipe que você sabe que foi correta. Como procederia?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicação com Pacientes/Familiares' },
  { area: 'saude', texto: 'Você precisa implementar uma mudança de processo que encontra grande resistência da equipe. Como conduziria essa mudança?', cargo: 'Enfermeiro', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
];

// ============================================
// TÉCNICO DE ENFERMAGEM
// ============================================

export const tecnicoEnfermagemJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você realiza a verificação dos sinais vitais e quais valores alterados comunicaria imediatamente ao enfermeiro.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'tecnica', competencia: 'Verificação de Sinais Vitais' },
  { area: 'saude', texto: 'Me explique o passo a passo que você segue para realizar a higiene e conforto de um paciente acamado.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'tecnica', competencia: 'Higiene e Conforto do Paciente' },
  { area: 'saude', texto: 'Como você prepara e organiza os materiais necessários para procedimentos de enfermagem?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'tecnica', competencia: 'Preparo de Materiais' },
  { area: 'saude', texto: 'Descreva sua experiência com a administração de medicamentos por via oral e as checagens que você realiza.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'tecnica', competencia: 'Administração de Medicamentos' },
  { area: 'saude', texto: 'Quais cuidados você toma ao transportar um paciente de uma área para outra dentro do hospital?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'tecnica', competencia: 'Transporte de Pacientes' },
  { area: 'saude', texto: 'Me explique as medidas de controle de infecção que você aplica no dia a dia, como higienização das mãos e uso de EPIs.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Infecção' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação como técnico de enfermagem e os estágios que realizou.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação desafiadora que você enfrentou durante seu estágio e como lidou com ela.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Me fale sobre sua experiência trabalhando em equipe com outros profissionais de saúde.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como foi seu primeiro contato com pacientes em situações graves? O que você aprendeu com essa experiência?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Hospitalar' },
  { area: 'saude', texto: 'Conte sobre algum feedback que você recebeu durante sua formação que te ajudou a melhorar como profissional.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você lida com pacientes que estão irritados ou pouco colaborativos durante os cuidados?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia e Humanização' },
  { area: 'saude', texto: 'Descreva como você se comunica com pacientes idosos ou com dificuldade de compreensão.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você organiza suas tarefas quando há muitos pacientes para atender simultaneamente.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você reage quando recebe uma orientação do enfermeiro que você não entendeu completamente?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva como você cuida da sua saúde física e emocional trabalhando em um ambiente hospitalar.', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },

  // Situacional (5)
  { area: 'saude', texto: 'Você está verificando os sinais vitais e percebe que o paciente está com pressão muito baixa. O que você faria?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'situacional', competencia: 'Verificação de Sinais Vitais' },
  { area: 'saude', texto: 'Durante o banho de leito, o paciente começa a passar mal. Como você procederia?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'situacional', competencia: 'Higiene e Conforto do Paciente' },
  { area: 'saude', texto: 'Você percebe que um colega não está usando os EPIs corretamente. Como abordaria essa situação?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Infecção' },
  { area: 'saude', texto: 'Um paciente pede para você não contar ao enfermeiro sobre uma dor que está sentindo. O que você faria?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Você está transportando um paciente e ele começa a apresentar falta de ar no corredor. Qual seria sua conduta?', cargo: 'Técnico de Enfermagem', nivel: 'junior', categoria: 'situacional', competencia: 'Transporte de Pacientes' },
];

export const tecnicoEnfermagemPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com a coleta de materiais para exames laboratoriais e os cuidados específicos para cada tipo de amostra.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Procedimentos de Enfermagem' },
  { area: 'saude', texto: 'Me explique como você auxilia em procedimentos mais complexos como passagem de sondas e curativos especiais.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Preparo de Materiais' },
  { area: 'saude', texto: 'Como você monitora e registra o balanço hídrico dos pacientes sob sua responsabilidade?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Verificação de Sinais Vitais' },
  { area: 'saude', texto: 'Descreva sua experiência com a administração de medicamentos por diferentes vias (IM, SC, ID) e os cuidados específicos de cada uma.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Administração de Medicamentos' },
  { area: 'saude', texto: 'Me explique como você identifica sinais de infecção relacionada à assistência à saúde em um paciente.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle de Infecção' },
  { area: 'saude', texto: 'Como você realiza a mudança de decúbito e posicionamento de pacientes com risco de lesão por pressão?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Higiene e Conforto do Paciente' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional como técnico de enfermagem e em quais setores você já atuou.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vivência Hospitalar' },
  { area: 'saude', texto: 'Descreva uma situação em que sua observação atenta sobre um paciente fez diferença no diagnóstico ou tratamento.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Verificação de Sinais Vitais' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em orientar novos colegas ou estagiários na equipe.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você tem se atualizado profissionalmente? Quais cursos ou capacitações foram mais relevantes?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Conte sobre uma emergência que você presenciou e qual foi sua participação no atendimento.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Emergências' },
  { area: 'saude', texto: 'Descreva sua experiência com pacientes em cuidados paliativos e os desafios desse tipo de assistência.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Empatia e Humanização' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você lida com situações de sobrecarga de trabalho mantendo a qualidade do cuidado?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho sob Pressão' },
  { area: 'saude', texto: 'Descreva como você colabora com enfermeiros e médicos para garantir o melhor cuidado ao paciente.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Me conte como você se recupera emocionalmente após perder um paciente que estava sob seus cuidados.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'saude', texto: 'Como você mantém a calma e o profissionalismo quando um paciente ou familiar é grosseiro com você?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva sua abordagem para criar um ambiente acolhedor e confortável para os pacientes.', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empatia e Humanização' },
  { area: 'saude', texto: 'Como você reage quando identifica uma possível falha no processo de cuidado?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (6)
  { area: 'saude', texto: 'Você está administrando uma medicação e percebe que o horário na prescrição está diferente do habitual. O que faria?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Administração de Medicamentos' },
  { area: 'saude', texto: 'Um paciente em isolamento precisa ser transferido para outro setor com urgência. Como você procederia?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Controle de Infecção' },
  { area: 'saude', texto: 'Você percebe que faltam materiais essenciais para o plantão e o almoxarifado está fechado. O que faria?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Preparo de Materiais' },
  { area: 'saude', texto: 'Um familiar insiste em realizar um procedimento no paciente que deveria ser feito pela equipe. Como conduziria?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Durante a troca de plantão, você percebe que o colega anterior não realizou registros importantes. Qual seria sua conduta?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um paciente confuso tenta retirar os acessos e sair do leito. Como você manejaria essa situação?', cargo: 'Técnico de Enfermagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Higiene e Conforto do Paciente' },
];

// ============================================
// RECEPCIONISTA DE CLÍNICA/HOSPITAL
// ============================================

export const recepcionistaClinicaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você realiza o agendamento de consultas, considerando a disponibilidade de médicos e preferências dos pacientes.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'tecnica', competencia: 'Agendamento de Consultas' },
  { area: 'saude', texto: 'Me explique o processo de cadastro de novos pacientes e quais informações são essenciais coletar.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação e Cadastros' },
  { area: 'saude', texto: 'Como você realiza a confirmação de consultas e qual sua abordagem quando o paciente não confirma?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'tecnica', competencia: 'Agendamento de Consultas' },
  { area: 'saude', texto: 'Descreva sua experiência com atendimento telefônico e como você conduz as ligações de forma eficiente.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'tecnica', competencia: 'Atendimento Telefônico' },
  { area: 'saude', texto: 'Me explique como funciona o processo de autorização de convênios e guias que você já realizou.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'tecnica', competencia: 'Guias e Autorizações de Convênio' },
  { area: 'saude', texto: 'Como você identifica situações em que o paciente precisa de atendimento de urgência na triagem inicial?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'tecnica', competencia: 'Triagem Inicial' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua experiência anterior com atendimento ao público, mesmo que fora da área de saúde.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },
  { area: 'saude', texto: 'Descreva sua familiaridade com sistemas de gestão ou agendamento. Quais ferramentas você já utilizou?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas de Gestão Hospitalar' },
  { area: 'saude', texto: 'Me fale sobre uma situação difícil com um cliente/paciente que você conseguiu resolver de forma positiva.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Como foi sua adaptação ao trabalhar em um ambiente de saúde? O que mais te surpreendeu?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Conte sobre um feedback que recebeu de um paciente ou supervisor que te marcou positivamente.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você mantém a calma e a cordialidade quando está atendendo muitos pacientes simultaneamente?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho sob Pressão' },
  { area: 'saude', texto: 'Descreva como você lida com pacientes ansiosos ou irritados na recepção.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Me conte como você organiza suas tarefas quando há muitas demandas ao mesmo tempo.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você se comunica com pacientes idosos ou com dificuldade de audição?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva como você lida com informações confidenciais dos pacientes.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (5)
  { area: 'saude', texto: 'Um paciente chega sem agendamento insistindo que precisa ser atendido hoje. Como você procederia?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'situacional', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'O sistema de agendamento fica fora do ar no meio do expediente. O que você faria?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'situacional', competencia: 'Sistemas de Gestão Hospitalar' },
  { area: 'saude', texto: 'Um paciente reclama em voz alta sobre o tempo de espera, deixando outros pacientes desconfortáveis. Como agiria?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você percebe que um paciente na sala de espera parece estar passando mal. Qual seria sua conduta?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'situacional', competencia: 'Triagem Inicial' },
  { area: 'saude', texto: 'Um familiar liga pedindo informações sobre o estado de saúde de um paciente internado. Como você procederia?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
];

export const recepcionistaClinicaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com diferentes sistemas de gestão hospitalar e como você se adapta a novas ferramentas.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistemas de Gestão Hospitalar' },
  { area: 'saude', texto: 'Me explique o processo completo de autorização de procedimentos junto aos convênios, incluindo recursos em caso de negativa.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'tecnica', competencia: 'Guias e Autorizações de Convênio' },
  { area: 'saude', texto: 'Como você gerencia a agenda de múltiplos profissionais otimizando o fluxo de pacientes?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'tecnica', competencia: 'Agendamento de Consultas' },
  { area: 'saude', texto: 'Descreva como você lida com o faturamento de consultas e procedimentos particulares e de convênios.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'tecnica', competencia: 'Documentação e Cadastros' },
  { area: 'saude', texto: 'Me explique sua experiência com o fluxo de internações e altas, incluindo a documentação necessária.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'tecnica', competencia: 'Documentação e Cadastros' },
  { area: 'saude', texto: 'Como você realiza a triagem telefônica para direcionar corretamente os pacientes aos serviços adequados?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'tecnica', competencia: 'Triagem Inicial' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional na recepção de serviços de saúde e como você evoluiu na função.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação complexa com um convênio que você conseguiu resolver em benefício do paciente.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'experiencia', competencia: 'Guias e Autorizações de Convênio' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em treinar ou orientar novos recepcionistas na equipe.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você contribuiu para melhorar algum processo ou fluxo de atendimento em locais onde trabalhou?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Conte sobre uma situação de emergência na recepção que você precisou gerenciar.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'experiencia', competencia: 'Triagem Inicial' },
  { area: 'saude', texto: 'Descreva sua experiência com atendimento de pacientes de diferentes perfis (idosos, crianças, gestantes).', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você gerencia o estresse em dias de alta demanda mantendo a qualidade do atendimento?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho sob Pressão' },
  { area: 'saude', texto: 'Descreva como você lida com conflitos entre pacientes ou familiares na recepção.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me conte como você equilibra eficiência no atendimento com atenção humanizada ao paciente.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Como você mantém o relacionamento profissional com médicos e equipe assistencial?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Descreva como você se mantém atualizada sobre mudanças em regras de convênios e procedimentos.', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Como você reage quando um médico está atrasado e os pacientes começam a reclamar?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },

  // Situacional (6)
  { area: 'saude', texto: 'Um convênio negou a autorização de um procedimento urgente para um paciente. Quais seriam seus próximos passos?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'situacional', competencia: 'Guias e Autorizações de Convênio' },
  { area: 'saude', texto: 'Você identifica um erro no agendamento que resultou em dois pacientes marcados no mesmo horário. Como resolveria?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'situacional', competencia: 'Agendamento de Consultas' },
  { area: 'saude', texto: 'Um paciente alega que foi cobrado indevidamente e está muito alterado. Como conduziria essa situação?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Você percebe que um colega está compartilhando informações de pacientes inadequadamente. O que faria?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Uma pessoa chega se passando por familiar para obter informações sobre um paciente famoso. Como procederia?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'O médico cancelou as consultas de última hora e você precisa avisar vários pacientes que já estão a caminho. Como gerenciaria isso?', cargo: 'Recepcionista de Clínica/Hospital', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação' },
];

// ============================================
// FISIOTERAPEUTA
// ============================================

export const fisioterapeutaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você realiza a avaliação funcional inicial de um paciente e quais instrumentos utiliza.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação Funcional' },
  { area: 'saude', texto: 'Me explique sua experiência com técnicas de fisioterapia respiratória e em quais condições você as aplica.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'tecnica', competencia: 'Fisioterapia Respiratória' },
  { area: 'saude', texto: 'Como você elabora um plano de tratamento fisioterapêutico para um paciente pós-cirúrgico ortopédico?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'tecnica', competencia: 'Fisioterapia Ortopédica' },
  { area: 'saude', texto: 'Descreva os equipamentos e recursos terapêuticos que você tem experiência em utilizar.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'tecnica', competencia: 'Equipamentos e Recursos Terapêuticos' },
  { area: 'saude', texto: 'Me explique como você documenta a evolução do paciente e os parâmetros que acompanha ao longo do tratamento.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação Funcional' },
  { area: 'saude', texto: 'Quais técnicas de reabilitação você mais utiliza e como decide qual aplicar para cada paciente?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Reabilitação' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação em fisioterapia e os estágios que mais contribuíram para seu desenvolvimento.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso clínico que você acompanhou durante a graduação ou início de carreira que te ensinou muito.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência com diferentes perfis de pacientes (ortopédicos, neurológicos, respiratórios).', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Como foi sua adaptação ao ambiente clínico ou hospitalar nos primeiros meses de trabalho?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Conte sobre algum feedback de paciente ou supervisor que te ajudou a melhorar sua prática clínica.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você motiva pacientes que estão desanimados com a reabilitação devido à lentidão dos resultados?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Descreva como você se comunica com pacientes idosos ou com dificuldades cognitivas durante as sessões.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você lida quando um paciente sente dor durante o atendimento.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Como você organiza sua agenda para atender múltiplos pacientes com qualidade?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva como você trabalha em equipe com outros profissionais de saúde no cuidado do paciente.', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (5)
  { area: 'saude', texto: 'Durante uma sessão, o paciente relata uma dor nova que não estava presente antes. Como você procederia?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'situacional', competencia: 'Avaliação Funcional' },
  { area: 'saude', texto: 'Um paciente não está seguindo as orientações de exercícios domiciliares. Como abordaria isso?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você percebe que a prescrição médica indica uma técnica que você acredita não ser a mais adequada. O que faria?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um paciente tem uma queda durante a sessão de fisioterapia. Qual seria sua conduta imediata?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'situacional', competencia: 'Técnicas de Reabilitação' },
  { area: 'saude', texto: 'O familiar do paciente interfere constantemente durante as sessões. Como você lidaria com essa situação?', cargo: 'Fisioterapeuta', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
];

export const fisioterapeutaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com a reabilitação de pacientes neurológicos e as técnicas especializadas que utiliza.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'tecnica', competencia: 'Fisioterapia Neurológica' },
  { area: 'saude', texto: 'Me explique como você realiza a avaliação e tratamento de pacientes em ventilação mecânica.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'tecnica', competencia: 'Fisioterapia Respiratória' },
  { area: 'saude', texto: 'Como você utiliza escalas funcionais e testes específicos para monitorar a evolução dos pacientes?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'tecnica', competencia: 'Avaliação Funcional' },
  { area: 'saude', texto: 'Descreva sua experiência com técnicas de terapia manual e em quais condições você as indica.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'tecnica', competencia: 'Técnicas de Reabilitação' },
  { area: 'saude', texto: 'Me explique como você aborda a reabilitação de lesões esportivas, desde a fase aguda até o retorno às atividades.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'tecnica', competencia: 'Fisioterapia Ortopédica' },
  { area: 'saude', texto: 'Como você integra diferentes recursos terapêuticos (eletroterapia, hidroterapia, cinesioterapia) no plano de tratamento?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'tecnica', competencia: 'Equipamentos e Recursos Terapêuticos' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional e as especializações que você desenvolveu ao longo da carreira.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso complexo que você atendeu e como elaborou o plano de tratamento para alcançar os objetivos.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em supervisionar estagiários ou orientar colegas menos experientes.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você tem se atualizado com as evidências científicas na área? Quais cursos ou especializações foram mais relevantes?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Conte sobre uma situação em que você precisou adaptar significativamente sua abordagem para um paciente específico.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Descreva sua experiência com o trabalho multidisciplinar em equipes de reabilitação.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você lida com pacientes que questionam sua abordagem terapêutica ou comparam com outros profissionais?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva como você equilibra a quantidade de pacientes atendidos com a qualidade do tratamento oferecido.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Me conte como você lida emocionalmente com pacientes que não apresentam evolução apesar dos esforços.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'saude', texto: 'Como você estabelece uma relação terapêutica de confiança com pacientes em tratamentos de longa duração?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Descreva como você gerencia expectativas quando o prognóstico do paciente é limitado.', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Como você se posiciona quando há divergência de opiniões na equipe multidisciplinar sobre a conduta do paciente?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (6)
  { area: 'saude', texto: 'Um paciente apresenta piora significativa durante a sessão com sinais de descompensação respiratória. O que você faria?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'situacional', competencia: 'Fisioterapia Respiratória' },
  { area: 'saude', texto: 'O médico solicita fisioterapia intensiva para um paciente que você avalia como muito debilitado para tal. Como procederia?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um paciente crônico insiste em continuar o tratamento mesmo sem evidências de benefício. Como conduziria essa situação?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você identifica que um paciente está sofrendo maus-tratos em casa baseado em observações durante o atendimento. Qual seria sua conduta?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um estagiário sob sua supervisão comete um erro técnico durante o atendimento. Como você gerenciaria a situação?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'situacional', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'O convênio do paciente autoriza apenas 10 sessões, mas você avalia que ele precisa de mais. O que faria?', cargo: 'Fisioterapeuta', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolução de Problemas' },
];

export const fisioterapeutaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'saude', texto: 'Como você estrutura e padroniza protocolos de atendimento fisioterapêutico para uma equipe ou serviço?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'tecnica', competencia: 'Técnicas de Reabilitação' },
  { area: 'saude', texto: 'Descreva sua experiência com a gestão de indicadores de qualidade e resultados em fisioterapia.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação Funcional' },
  { area: 'saude', texto: 'Me explique como você implementa práticas baseadas em evidências e garante a atualização da equipe.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'tecnica', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Descreva sua experiência com fisioterapia em UTI e os protocolos de mobilização precoce que utiliza.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'tecnica', competencia: 'Fisioterapia Respiratória' },
  { area: 'saude', texto: 'Como você avalia e estrutura programas de reabilitação para condições complexas multissistêmicas?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação Funcional' },
  { area: 'saude', texto: 'Me explique sua abordagem para a reabilitação de pacientes com doenças neurodegenerativas progressivas.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'tecnica', competencia: 'Fisioterapia Neurológica' },
  { area: 'saude', texto: 'Descreva como você estrutura programas de educação em saúde e prevenção de lesões.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'tecnica', competencia: 'Técnicas de Reabilitação' },

  // Experiência (7)
  { area: 'saude', texto: 'Conte sobre sua trajetória até chegar a uma posição de liderança ou referência técnica na fisioterapia.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um projeto de melhoria ou inovação que você liderou na área de fisioterapia e os resultados alcançados.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em formar e desenvolver equipes de fisioterapeutas.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você contribuiu para a implementação ou manutenção de acreditações hospitalares na área de reabilitação?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'experiencia', competencia: 'Protocolos e Qualidade' },
  { area: 'saude', texto: 'Conte sobre publicações, pesquisas ou trabalhos científicos que você desenvolveu na área.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Descreva sua experiência com gestão de recursos e orçamento em serviços de fisioterapia.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Recursos' },
  { area: 'saude', texto: 'Me fale sobre sua participação em comissões, grupos de trabalho ou liderança de projetos institucionais.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (7)
  { area: 'saude', texto: 'Como você equilibra as demandas de gestão com a prática clínica e o desenvolvimento técnico?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva sua abordagem para desenvolver e dar feedback a profissionais da equipe.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você promove a cultura de segurança do paciente e melhoria contínua na equipe?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Me conte como você lida com pressões institucionais que possam conflitar com a melhor prática clínica.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Descreva como você constrói parcerias e influencia outras áreas para melhorar os resultados de reabilitação.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Como você mantém sua motivação e a da equipe em cenários de recursos limitados?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'saude', texto: 'Descreva como você gerencia conflitos dentro da equipe ou com outros departamentos.', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (7)
  { area: 'saude', texto: 'A direção solicita aumento de produtividade que você acredita que comprometerá a qualidade. Como negociaria?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Recursos' },
  { area: 'saude', texto: 'Um fisioterapeuta da equipe está apresentando condutas inadequadas com pacientes. Como você abordaria isso?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Você precisa implementar um novo protocolo que encontra resistência da equipe. Como conduziria a mudança?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Um paciente de alto perfil recebe tratamento diferenciado por pressão da direção. Como você se posicionaria?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Sua equipe está com déficit de profissionais e a demanda continua alta. Como reorganizaria o serviço?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Recursos' },
  { area: 'saude', texto: 'Há divergência significativa entre fisioterapeutas e médicos sobre a intensidade da reabilitação. Como mediaria?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você identifica que um protocolo institucional está desatualizado e pode não estar trazendo os melhores resultados. Quais seriam seus passos?', cargo: 'Fisioterapeuta', nivel: 'senior', categoria: 'situacional', competencia: 'Protocolos e Qualidade' },
];

// ============================================
// FARMACÊUTICO
// ============================================

export const farmaceuticoJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você realiza a dispensação de medicamentos, desde o recebimento da receita até a orientação ao paciente.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'tecnica', competencia: 'Dispensação de Medicamentos' },
  { area: 'saude', texto: 'Me explique os cuidados que você toma ao dispensar medicamentos controlados e a documentação necessária.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'tecnica', competencia: 'Medicamentos Controlados' },
  { area: 'saude', texto: 'Como você orienta os pacientes sobre a forma correta de usar os medicamentos, incluindo horários, interações e efeitos colaterais?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'tecnica', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Descreva sua experiência com o controle de estoque de medicamentos, incluindo armazenamento adequado e validade.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Estoque de Medicamentos' },
  { area: 'saude', texto: 'Quais verificações você realiza ao receber uma prescrição médica para garantir que está correta e segura?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'tecnica', competencia: 'Dispensação de Medicamentos' },
  { area: 'saude', texto: 'Me explique como você identifica e reporta reações adversas a medicamentos (farmacovigilância).', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'tecnica', competencia: 'Farmacovigilância' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação em farmácia e os estágios que mais contribuíram para seu desenvolvimento profissional.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação em que você identificou um erro de prescrição ou dosagem. Como você procedeu?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'experiencia', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em diferentes ambientes (farmácia de rede, drogaria independente, hospital).', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Profissional' },
  { area: 'saude', texto: 'Como foi sua adaptação ao ritmo de trabalho em uma farmácia nos primeiros meses de atuação?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Conte sobre algum caso em que sua orientação farmacêutica fez diferença para um paciente.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'experiencia', competencia: 'Atenção Farmacêutica' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você lida com pacientes que chegam com dúvidas sobre automedicação ou pedem medicamentos sem receita?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Descreva como você se comunica com pacientes idosos que têm dificuldade em entender as orientações sobre medicamentos.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você organiza seu trabalho em momentos de alta demanda na farmácia.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você reage quando um cliente questiona o preço ou a necessidade de um medicamento?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva como você mantém sua atualização sobre novos medicamentos e legislação farmacêutica.', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },

  // Situacional (5)
  { area: 'saude', texto: 'Um paciente apresenta uma receita com uma interação medicamentosa potencialmente perigosa. O que você faria?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'situacional', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Você percebe que um medicamento controlado está com o estoque incompatível com as saídas registradas. Como procederia?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'situacional', competencia: 'Medicamentos Controlados' },
  { area: 'saude', texto: 'Um cliente insiste em comprar um antibiótico sem receita médica. Como você conduziria essa situação?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Durante o inventário, você encontra medicamentos próximos do vencimento em grande quantidade. Qual seria sua conduta?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Estoque de Medicamentos' },
  { area: 'saude', texto: 'Um paciente relata efeitos colaterais graves após usar um medicamento dispensado por você. O que faria?', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'situacional', competencia: 'Farmacovigilância' },
];

export const farmaceuticoPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com a manipulação de fórmulas magistrais e os controles de qualidade que você aplica.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Manipulação Farmacêutica' },
  { area: 'saude', texto: 'Me explique como você realiza a análise de prescrições em ambiente hospitalar, incluindo adequação de doses e via de administração.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Como você gerencia o inventário de medicamentos controlados e garante conformidade com a legislação vigente?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Medicamentos Controlados' },
  { area: 'saude', texto: 'Descreva sua experiência com sistemas de gestão farmacêutica e controle informatizado de estoque.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle de Estoque de Medicamentos' },
  { area: 'saude', texto: 'Me explique como você conduz o acompanhamento farmacoterapêutico de pacientes crônicos.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Como você implementa e monitora programas de farmacovigilância no seu local de trabalho?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'tecnica', competencia: 'Farmacovigilância' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional na farmácia e as especializações que você desenvolveu.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso complexo de intervenção farmacêutica que você realizou e o impacto no tratamento do paciente.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em treinar ou supervisionar auxiliares e balconistas.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você contribuiu para melhorar processos ou reduzir perdas em farmácias onde trabalhou?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Conte sobre sua experiência com fiscalizações da vigilância sanitária e como você se preparou.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Legislação Farmacêutica' },
  { area: 'saude', texto: 'Descreva sua participação em comissões de farmácia ou grupos multidisciplinares.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você lida com a pressão comercial para vender produtos versus a responsabilidade técnica da profissão?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Descreva como você equilibra as demandas administrativas com o atendimento direto aos pacientes.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Me conte como você se mantém atualizado sobre novas drogas, protocolos e mudanças na legislação.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Como você aborda situações em que precisa discordar de uma prescrição médica?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva como você lida com reclamações de clientes sobre atendimento ou produtos.', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Como você motiva e engaja a equipe de atendimento para seguir os protocolos corretamente?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (6)
  { area: 'saude', texto: 'A vigilância sanitária chega para uma fiscalização surpresa e encontra irregularidades. Como você conduziria?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'situacional', competencia: 'Legislação Farmacêutica' },
  { area: 'saude', texto: 'Um médico prescreve uma dose muito acima da usual de um medicamento. Você tenta contato e não consegue. O que faria?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'situacional', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Você identifica que um lote de medicamentos pode estar com problema de qualidade. Qual seria sua conduta?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'situacional', competencia: 'Farmacovigilância' },
  { area: 'saude', texto: 'Um funcionário está vendendo medicamentos controlados de forma irregular. Como você procederia?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'O sistema informatizado fica fora do ar e você precisa manter a rastreabilidade de medicamentos controlados. O que faria?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'situacional', competencia: 'Medicamentos Controlados' },
  { area: 'saude', texto: 'Um paciente crônico não está aderindo ao tratamento e a condição está piorando. Como você abordaria?', cargo: 'Farmacêutico', nivel: 'pleno', categoria: 'situacional', competencia: 'Atenção Farmacêutica' },
];

export const farmaceuticoSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'saude', texto: 'Como você estrutura e gerencia a assistência farmacêutica em um serviço ou estabelecimento?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Farmacêutica' },
  { area: 'saude', texto: 'Descreva sua experiência com a padronização de medicamentos e elaboração de protocolos clínicos.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'tecnica', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Me explique como você implementa programas de uso racional de medicamentos e antibioticoterapia.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'tecnica', competencia: 'Farmacovigilância' },
  { area: 'saude', texto: 'Descreva sua experiência com farmácia clínica e integração com a equipe multiprofissional.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'tecnica', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Como você gerencia indicadores de qualidade e desempenho do serviço farmacêutico?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Farmacêutica' },
  { area: 'saude', texto: 'Me explique sua abordagem para otimizar o custo de medicamentos mantendo a qualidade da assistência.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'tecnica', competencia: 'Controle de Estoque de Medicamentos' },
  { area: 'saude', texto: 'Descreva como você estrutura programas de educação continuada para a equipe farmacêutica.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Equipe' },

  // Experiência (7)
  { area: 'saude', texto: 'Conte sobre sua trajetória até assumir posições de liderança ou coordenação na área farmacêutica.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um projeto de melhoria que você liderou na assistência farmacêutica e os resultados alcançados.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em processos de acreditação hospitalar na área farmacêutica.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'experiencia', competencia: 'Legislação Farmacêutica' },
  { area: 'saude', texto: 'Como você desenvolveu suas habilidades de gestão de pessoas e equipes ao longo da carreira?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Conte sobre negociações complexas com fornecedores ou convênios que você conduziu.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão Farmacêutica' },
  { area: 'saude', texto: 'Descreva sua experiência com pesquisa clínica ou estudos farmacêuticos.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Me fale sobre profissionais que você desenvolveu e mentorou ao longo da carreira.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },

  // Comportamental (7)
  { area: 'saude', texto: 'Como você equilibra as demandas de gestão com a necessidade de se manter atualizado tecnicamente?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva sua abordagem para lidar com profissionais de baixo desempenho na equipe.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você promove a cultura de segurança do paciente e notificação de eventos adversos?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'comportamental', competencia: 'Farmacovigilância' },
  { area: 'saude', texto: 'Me conte como você lida com pressões institucionais que podem conflitar com a ética farmacêutica.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Descreva como você constrói relacionamentos com prescritores e outras lideranças clínicas.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Como você mantém a motivação da equipe em cenários de recursos limitados ou alta pressão?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Descreva como você se posiciona em decisões estratégicas que envolvem aspectos farmacêuticos.', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão Farmacêutica' },

  // Situacional (7)
  { area: 'saude', texto: 'A direção solicita redução de custos com medicamentos que você acredita que comprometerá a qualidade. Como negociaria?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão Farmacêutica' },
  { area: 'saude', texto: 'Você identifica um padrão de prescrição inadequado por parte de um médico da equipe. Como abordaria?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'situacional', competencia: 'Atenção Farmacêutica' },
  { area: 'saude', texto: 'Há um desabastecimento nacional de um medicamento crítico para pacientes do serviço. Como gerenciaria?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'situacional', competencia: 'Controle de Estoque de Medicamentos' },
  { area: 'saude', texto: 'Um farmacêutico da equipe está envolvido em irregularidades com medicamentos controlados. Como procederia?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Você precisa implementar um novo sistema de dispensação que encontra grande resistência da equipe. Como conduziria?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Um evento adverso grave ocorre possivelmente relacionado a um erro de dispensação. Quais seriam seus passos?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'situacional', competencia: 'Farmacovigilância' },
  { area: 'saude', texto: 'A comissão de farmácia diverge sobre a inclusão de um medicamento de alto custo na padronização. Como você mediaria?', cargo: 'Farmacêutico', nivel: 'senior', categoria: 'situacional', competencia: 'Atenção Farmacêutica' },
];

// ============================================
// NUTRICIONISTA
// ============================================

export const nutricionistaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você realiza a avaliação nutricional de um paciente, incluindo os parâmetros e métodos que utiliza.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação Nutricional' },
  { area: 'saude', texto: 'Me explique como você elabora um plano alimentar personalizado considerando as necessidades e preferências do paciente.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'tecnica', competencia: 'Elaboração de Dietas' },
  { area: 'saude', texto: 'Como você orienta pacientes com restrições alimentares específicas (diabetes, hipertensão, intolerâncias)?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'tecnica', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Descreva sua experiência com educação alimentar para diferentes públicos (crianças, adultos, idosos).', cargo: 'Nutricionista', nivel: 'junior', categoria: 'tecnica', competencia: 'Educação Alimentar' },
  { area: 'saude', texto: 'Quais ferramentas e tabelas você utiliza para calcular as necessidades nutricionais dos pacientes?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação Nutricional' },
  { area: 'saude', texto: 'Me explique os princípios de segurança alimentar que você aplica no seu trabalho.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança Alimentar' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação em nutrição e os estágios que mais contribuíram para seu desenvolvimento.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso de paciente que você acompanhou e os resultados alcançados com a intervenção nutricional.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'experiencia', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em diferentes áreas da nutrição (clínica, esportiva, coletividade).', cargo: 'Nutricionista', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Profissional' },
  { area: 'saude', texto: 'Como foi sua adaptação ao atendimento nutricional nos primeiros meses de atuação profissional?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Conte sobre algum feedback de paciente que te motivou ou te ensinou algo importante.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você motiva pacientes que têm dificuldade em seguir o plano alimentar prescrito?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Descreva como você se comunica com pacientes que têm crenças alimentares diferentes das evidências científicas.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você organiza sua agenda de atendimentos para manter a qualidade das consultas.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você lida com pacientes que demonstram resistência às mudanças alimentares?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Descreva como você se mantém atualizado sobre as novas evidências em nutrição.', cargo: 'Nutricionista', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },

  // Situacional (5)
  { area: 'saude', texto: 'Um paciente com diabetes não está seguindo a dieta e os níveis glicêmicos estão descompensados. Como abordaria?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'situacional', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Você identifica sinais de um possível transtorno alimentar em um paciente. Qual seria sua conduta?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um paciente questiona uma dieta da moda que contradiz as orientações que você deu. Como você conduziria?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'situacional', competencia: 'Educação Alimentar' },
  { area: 'saude', texto: 'Durante o atendimento, você percebe que o paciente não tem condições financeiras de seguir a dieta ideal. O que faria?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'situacional', competencia: 'Elaboração de Dietas' },
  { area: 'saude', texto: 'Um familiar interfere nas orientações nutricionais do paciente, contradizendo suas recomendações. Como lidaria?', cargo: 'Nutricionista', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
];

export const nutricionistaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com nutrição clínica hospitalar, incluindo cálculo de dietas enterais e parenterais.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Me explique como você realiza a gestão de uma Unidade de Alimentação e Nutrição (UAN).', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de UAN' },
  { area: 'saude', texto: 'Como você implementa e monitora programas de controle de qualidade e segurança alimentar?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'Descreva sua abordagem para atender pacientes com múltiplas comorbidades que exigem restrições alimentares complexas.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Me explique como você utiliza indicadores e parâmetros para acompanhar a evolução nutricional dos pacientes.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Avaliação Nutricional' },
  { area: 'saude', texto: 'Como você desenvolve e implementa ações de educação nutricional em grupos ou comunidades?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Educação Alimentar' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional na nutrição e as especializações que você desenvolveu.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso complexo de intervenção nutricional que você conduziu e os resultados alcançados.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em supervisionar estagiários ou orientar nutricionistas menos experientes.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você contribuiu para melhorar processos ou indicadores nutricionais em locais onde trabalhou?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Conte sobre sua experiência com fiscalizações sanitárias em serviços de alimentação.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'Descreva sua participação em equipes multiprofissionais de saúde.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você lida com a pressão de produtividade mantendo a qualidade do atendimento nutricional?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva como você equilibra as orientações baseadas em evidências com as preferências culturais dos pacientes.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Me conte como você gerencia conflitos entre equipe de cozinha e demandas de dietas especiais.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você aborda situações em que precisa discordar de condutas de outros profissionais de saúde?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva como você lida com pacientes que não aderem ao tratamento nutricional apesar dos esforços.', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'saude', texto: 'Como você motiva e engaja a equipe de alimentação para seguir as boas práticas?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (6)
  { area: 'saude', texto: 'Você identifica irregularidades graves de higiene na cozinha de um serviço que você assume. Como procederia?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'Um paciente crítico precisa de suporte nutricional, mas há divergência com a equipe médica sobre a via. Como conduziria?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'situacional', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'O custo com insumos alimentares está acima do orçamento e você precisa reduzir sem comprometer a qualidade. O que faria?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de UAN' },
  { area: 'saude', texto: 'Um colaborador da cozinha não está seguindo os procedimentos de higiene. Como abordaria essa situação?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'Há um surto de doença transmitida por alimentos no serviço. Quais seriam seus primeiros passos?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'Um paciente religioso recusa alimentos que são importantes para seu tratamento por questões de fé. Como procederia?', cargo: 'Nutricionista', nivel: 'pleno', categoria: 'situacional', competencia: 'Empatia' },
];

export const nutricionistaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'saude', texto: 'Como você estrutura e gerencia a assistência nutricional em um serviço hospitalar ou institucional?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de UAN' },
  { area: 'saude', texto: 'Descreva sua experiência com a elaboração de protocolos de terapia nutricional e padronização de condutas.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'tecnica', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Me explique como você implementa e monitora indicadores de qualidade em nutrição.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação Nutricional' },
  { area: 'saude', texto: 'Descreva sua abordagem para implementar programas de nutrição em saúde pública ou coletiva.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'tecnica', competencia: 'Educação Alimentar' },
  { area: 'saude', texto: 'Como você gerencia a cadeia de suprimentos e custos em serviços de alimentação de grande porte?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de UAN' },
  { area: 'saude', texto: 'Me explique sua experiência com EMTN (Equipe Multiprofissional de Terapia Nutricional) e terapia nutricional complexa.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'tecnica', competencia: 'Nutrição Clínica' },
  { area: 'saude', texto: 'Descreva como você estrutura programas de capacitação em nutrição e boas práticas alimentares.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Equipe' },

  // Experiência (7)
  { area: 'saude', texto: 'Conte sobre sua trajetória até assumir posições de liderança ou coordenação na área de nutrição.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um projeto de melhoria que você liderou em serviços de nutrição e os resultados alcançados.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em processos de acreditação hospitalar na área de nutrição.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'experiencia', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'Como você desenvolveu suas habilidades de gestão de pessoas e equipes ao longo da carreira?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Conte sobre negociações de contratos ou parcerias com fornecedores que você conduziu.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de UAN' },
  { area: 'saude', texto: 'Descreva sua experiência com pesquisa ou publicações na área de nutrição.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Me fale sobre profissionais que você desenvolveu e mentorou em sua carreira.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },

  // Comportamental (7)
  { area: 'saude', texto: 'Como você equilibra as demandas de gestão com a necessidade de se manter atualizado tecnicamente?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva sua abordagem para lidar com profissionais de baixo desempenho na equipe.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você promove a cultura de segurança alimentar e melhoria contínua na equipe?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'comportamental', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'Me conte como você lida com pressões institucionais que podem conflitar com as melhores práticas nutricionais.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Descreva como você constrói relacionamentos com outras lideranças clínicas e administrativas.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Como você mantém a motivação da equipe em cenários de recursos limitados?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Descreva como você se posiciona em decisões estratégicas que envolvem aspectos nutricionais.', cargo: 'Nutricionista', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de UAN' },

  // Situacional (7)
  { area: 'saude', texto: 'A direção solicita redução de custos em alimentação que você acredita que comprometerá a qualidade. Como negociaria?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de UAN' },
  { area: 'saude', texto: 'Você identifica práticas inadequadas sistemáticas de um nutricionista da equipe. Como abordaria?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Há uma crise de abastecimento de insumos essenciais para as dietas. Como gerenciaria a situação?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de UAN' },
  { area: 'saude', texto: 'Um colaborador denuncia irregularidades no serviço de alimentação. Como você procederia na investigação?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Você precisa implementar uma mudança significativa no cardápio que encontra resistência. Como conduziria?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Ocorre uma intoxicação alimentar no serviço sob sua responsabilidade. Quais seriam seus passos imediatos?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'situacional', competencia: 'Segurança Alimentar' },
  { area: 'saude', texto: 'A equipe médica discorda das condutas nutricionais em pacientes críticos. Como mediaria esse conflito?', cargo: 'Nutricionista', nivel: 'senior', categoria: 'situacional', competencia: 'Nutrição Clínica' },
];

// ============================================
// PSICÓLOGO
// ============================================

export const psicologoJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você conduz uma avaliação psicológica inicial, incluindo os instrumentos e técnicas que utiliza.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação Psicológica' },
  { area: 'saude', texto: 'Me explique como você estrutura uma entrevista inicial com um novo paciente.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'tecnica', competencia: 'Técnicas de Entrevista' },
  { area: 'saude', texto: 'Quais abordagens terapêuticas você conhece e com qual tem mais familiaridade na prática clínica?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'tecnica', competencia: 'Psicoterapia' },
  { area: 'saude', texto: 'Descreva como você elabora um laudo ou parecer psicológico, incluindo os elementos essenciais.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'tecnica', competencia: 'Laudos e Pareceres' },
  { area: 'saude', texto: 'Me explique como você aplica e interpreta testes psicológicos padronizados.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação Psicológica' },
  { area: 'saude', texto: 'Como você documenta as sessões de atendimento psicológico garantindo sigilo e precisão?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'tecnica', competencia: 'Laudos e Pareceres' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação em psicologia e os estágios que mais contribuíram para seu desenvolvimento.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso clínico que você acompanhou durante a graduação ou início de carreira que te ensinou muito.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência com diferentes contextos de atuação (clínica, hospitalar, organizacional).', cargo: 'Psicólogo', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Como foi sua adaptação aos atendimentos clínicos nos primeiros meses de atuação profissional?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Conte sobre a supervisão clínica que você recebeu e como isso contribuiu para sua prática.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você mantém o equilíbrio emocional ao lidar com casos de grande sofrimento psíquico?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência Emocional' },
  { area: 'saude', texto: 'Descreva como você estabelece o rapport e a relação terapêutica com pacientes resistentes.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Me conte como você lida com suas próprias reações emocionais (contratransferência) durante os atendimentos.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'comportamental', competencia: 'Autoconhecimento' },
  { area: 'saude', texto: 'Como você organiza sua agenda de atendimentos considerando o desgaste emocional da profissão?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva como você busca atualização profissional e supervisão clínica.', cargo: 'Psicólogo', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },

  // Situacional (5)
  { area: 'saude', texto: 'Um paciente revela ideação suicida durante a sessão. Qual seria sua conduta imediata?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'situacional', competencia: 'Psicoterapia' },
  { area: 'saude', texto: 'Você identifica sinais de abuso em um paciente menor de idade. Como procederia?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um paciente solicita que você escreva um laudo favorável a ele em um processo judicial. O que você faria?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'situacional', competencia: 'Laudos e Pareceres' },
  { area: 'saude', texto: 'Durante a avaliação, você percebe que o paciente precisa de encaminhamento psiquiátrico. Como abordaria isso?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'situacional', competencia: 'Avaliação Psicológica' },
  { area: 'saude', texto: 'Um familiar de paciente te aborda pedindo informações sobre o atendimento. Como você conduziria?', cargo: 'Psicólogo', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
];

export const psicologoPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com avaliação psicológica em contextos específicos (forense, trânsito, organizacional).', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Avaliação Psicológica' },
  { area: 'saude', texto: 'Me explique como você conduz processos de orientação profissional e de carreira.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Orientação Profissional' },
  { area: 'saude', texto: 'Como você integra diferentes abordagens terapêuticas de acordo com as necessidades do paciente?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Psicoterapia' },
  { area: 'saude', texto: 'Descreva sua experiência com psicologia organizacional, incluindo processos seletivos e desenvolvimento.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Psicologia Organizacional' },
  { area: 'saude', texto: 'Me explique como você conduz atendimentos em grupo e as técnicas que utiliza.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Psicoterapia' },
  { area: 'saude', texto: 'Como você elabora laudos para fins judiciais garantindo fundamentação técnica e ética?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Laudos e Pareceres' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional na psicologia e as especializações que desenvolveu.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso clínico complexo que você conduziu e os resultados terapêuticos alcançados.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Psicoterapia' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em supervisionar estagiários ou orientar psicólogos iniciantes.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você contribuiu para melhorar processos ou programas nos locais onde atuou?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Conte sobre sua experiência com atendimentos de crise ou emergências psicológicas.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Psicoterapia' },
  { area: 'saude', texto: 'Descreva sua participação em equipes multiprofissionais de saúde.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você gerencia a carga emocional de atender múltiplos casos de alta complexidade?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência Emocional' },
  { area: 'saude', texto: 'Descreva como você lida com pacientes que não aderem ao processo terapêutico.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Me conte como você equilibra a prática clínica com outras demandas profissionais.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você aborda situações em que há divergência com outros profissionais sobre a conduta do paciente?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Descreva como você mantém os limites profissionais em relações terapêuticas de longo prazo.', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Como você se mantém atualizado com as mudanças no campo da psicologia e novas abordagens?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },

  // Situacional (6)
  { area: 'saude', texto: 'Um paciente apresenta risco iminente de violência contra terceiros. Qual seria sua conduta?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Você é solicitado a participar de um processo seletivo interno onde conhece um dos candidatos pessoalmente. Como procederia?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'situacional', competencia: 'Psicologia Organizacional' },
  { area: 'saude', texto: 'Um médico questiona publicamente sua avaliação psicológica de um paciente. Como você responderia?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'situacional', competencia: 'Laudos e Pareceres' },
  { area: 'saude', texto: 'Durante um processo de orientação profissional, você percebe que o cliente tem sérios conflitos familiares. O que faria?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'situacional', competencia: 'Orientação Profissional' },
  { area: 'saude', texto: 'Um paciente em psicoterapia revela informações que podem afetar outros pacientes que você atende. Como conduziria?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'A empresa solicita informações sobre a saúde mental de um funcionário em atendimento. Como você procederia?', cargo: 'Psicólogo', nivel: 'pleno', categoria: 'situacional', competencia: 'Psicologia Organizacional' },
];

export const psicologoSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'saude', texto: 'Como você estrutura e coordena serviços ou programas de psicologia em instituições?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Serviços' },
  { area: 'saude', texto: 'Descreva sua experiência com a elaboração de protocolos de atendimento psicológico.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'tecnica', competencia: 'Psicoterapia' },
  { area: 'saude', texto: 'Me explique como você implementa programas de saúde mental organizacional.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'tecnica', competencia: 'Psicologia Organizacional' },
  { area: 'saude', texto: 'Descreva sua abordagem para supervisão clínica de outros psicólogos.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'tecnica', competencia: 'Formação de Equipe' },
  { area: 'saude', texto: 'Como você gerencia indicadores de qualidade em serviços de psicologia?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Serviços' },
  { area: 'saude', texto: 'Me explique sua experiência com avaliações psicológicas de alta complexidade ou perícias.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação Psicológica' },
  { area: 'saude', texto: 'Descreva como você estrutura programas de prevenção e promoção de saúde mental.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'tecnica', competencia: 'Psicologia Organizacional' },

  // Experiência (7)
  { area: 'saude', texto: 'Conte sobre sua trajetória até assumir posições de liderança ou referência técnica na psicologia.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um projeto ou programa de psicologia que você liderou e os resultados alcançados.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em formar e desenvolver equipes de psicólogos.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você contribuiu para políticas ou programas de saúde mental em instituições?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Serviços' },
  { area: 'saude', texto: 'Conte sobre publicações, pesquisas ou contribuições acadêmicas que você desenvolveu.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Descreva sua experiência com gestão de crises institucionais envolvendo saúde mental.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Serviços' },
  { area: 'saude', texto: 'Me fale sobre profissionais que você desenvolveu e mentorou ao longo da carreira.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Equipe' },

  // Comportamental (7)
  { area: 'saude', texto: 'Como você equilibra as demandas de gestão com a prática clínica e supervisão?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva sua abordagem para lidar com profissionais de baixo desempenho ou condutas inadequadas.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você promove a cultura de cuidado com a saúde mental dos próprios profissionais?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliência Emocional' },
  { area: 'saude', texto: 'Me conte como você lida com pressões institucionais que podem conflitar com a ética profissional.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Descreva como você constrói relacionamentos com outras lideranças e stakeholders.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Como você mantém a motivação da equipe em cenários de alta demanda ou recursos limitados?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Descreva como você se posiciona em decisões estratégicas que envolvem aspectos de saúde mental.', cargo: 'Psicólogo', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Serviços' },

  // Situacional (7)
  { area: 'saude', texto: 'A direção solicita redução de equipe que você acredita que comprometerá o serviço. Como negociaria?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Serviços' },
  { area: 'saude', texto: 'Você identifica práticas inadequadas de um psicólogo experiente da equipe. Como abordaria?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Há uma crise de saúde mental coletiva na organização (ex: suicídio de funcionário). Como conduziria?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'situacional', competencia: 'Psicologia Organizacional' },
  { area: 'saude', texto: 'Uma denúncia ética é feita contra um psicólogo da sua equipe. Como você procederia?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Você precisa implementar uma mudança de abordagem que encontra resistência da equipe. Como conduziria?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'A mídia solicita informações sobre o atendimento psicológico a uma pessoa pública. Como procederia?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Há divergência significativa entre a psicologia e outras áreas sobre condutas com pacientes. Como mediaria?', cargo: 'Psicólogo', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicação' },
];

// ============================================
// AUXILIAR DE SAÚDE BUCAL
// ============================================

export const auxiliarSaudeBucalJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você prepara o consultório odontológico antes dos atendimentos, incluindo a organização dos materiais.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Preparo do Consultório' },
  { area: 'saude', texto: 'Me explique os procedimentos de biossegurança que você aplica no consultório odontológico.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Biossegurança' },
  { area: 'saude', texto: 'Como você realiza a instrumentação durante os procedimentos odontológicos auxiliando o dentista?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Instrumentação Odontológica' },
  { area: 'saude', texto: 'Descreva sua experiência com o processamento de filmes radiográficos ou operação de equipamentos digitais.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Radiologia Odontológica' },
  { area: 'saude', texto: 'Me explique como você realiza a limpeza, desinfecção e esterilização dos instrumentais odontológicos.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Biossegurança' },
  { area: 'saude', texto: 'Como você orienta os pacientes sobre higiene bucal básica e cuidados pós-procedimento?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Orientação de Higiene Bucal' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação como auxiliar de saúde bucal e os estágios que realizou.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação desafiadora que você enfrentou no consultório e como lidou com ela.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Me fale sobre sua experiência trabalhando com diferentes profissionais e especialidades odontológicas.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como foi sua adaptação à rotina de um consultório odontológico nos primeiros meses?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Conte sobre algum feedback que você recebeu do dentista ou pacientes que te ajudou a melhorar.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você lida com pacientes ansiosos ou com medo de procedimentos odontológicos?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Descreva como você se comunica com crianças durante os atendimentos odontológicos.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você organiza suas tarefas quando há muitos pacientes agendados no dia.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você reage quando o dentista precisa de um instrumento rapidamente durante um procedimento?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho sob Pressão' },
  { area: 'saude', texto: 'Descreva como você mantém a confidencialidade das informações dos pacientes.', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (5)
  { area: 'saude', texto: 'Durante um procedimento, você percebe que o dentista está usando um instrumento não esterilizado. O que faria?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Biossegurança' },
  { area: 'saude', texto: 'Um paciente começa a passar mal na cadeira odontológica. Qual seria sua conduta imediata?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Preparo do Consultório' },
  { area: 'saude', texto: 'O dentista está atrasado e os pacientes na sala de espera estão reclamando. Como você lidaria?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você percebe que acabou um material essencial no meio de um procedimento. O que faria?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Instrumentação Odontológica' },
  { area: 'saude', texto: 'Uma criança está muito agitada e se recusa a abrir a boca para o exame. Como você auxiliaria?', cargo: 'Auxiliar de Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Empatia' },
];

// ============================================
// CIRURGIÃO-DENTISTA
// ============================================

export const cirurgiaoDentistaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você realiza o exame clínico inicial do paciente e quais aspectos considera na elaboração do plano de tratamento.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'tecnica', competencia: 'Diagnóstico e Planejamento' },
  { area: 'saude', texto: 'Me explique sua abordagem para realizar procedimentos restauradores, desde o preparo cavitário até a finalização.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'tecnica', competencia: 'Procedimentos Restauradores' },
  { area: 'saude', texto: 'Como você conduz procedimentos de raspagem e alisamento radicular em pacientes com doença periodontal?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'tecnica', competencia: 'Periodontia e Prevenção' },
  { area: 'saude', texto: 'Descreva sua experiência com exodontias simples e os cuidados que você toma durante e após o procedimento.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'tecnica', competencia: 'Cirurgia Oral Menor' },
  { area: 'saude', texto: 'Me explique como você interpreta radiografias periapicais e panorâmicas para auxiliar no diagnóstico.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'tecnica', competencia: 'Diagnóstico e Planejamento' },
  { area: 'saude', texto: 'Como você conduz o atendimento de urgência odontológica, especialmente em casos de dor aguda ou trauma?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'tecnica', competencia: 'Atendimento de Urgência' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação em odontologia e os estágios que mais contribuíram para seu desenvolvimento clínico.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso clínico desafiador que você atendeu no início da carreira e o que aprendeu com ele.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência com diferentes perfis de pacientes (crianças, idosos, pacientes ansiosos).', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Como foi sua adaptação à rotina de atendimento clínico nos primeiros meses após a formação?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Conte sobre algum feedback de paciente ou colega que te ajudou a melhorar sua prática clínica.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você lida com pacientes que têm muito medo ou ansiedade em relação ao tratamento odontológico?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Descreva como você explica os procedimentos e orientações de forma clara para pacientes de diferentes níveis de compreensão.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você organiza sua agenda de atendimentos para garantir qualidade sem atrasos.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você se mantém atualizado sobre novas técnicas, materiais e tecnologias em odontologia?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Descreva como você trabalha em equipe com auxiliares e outros profissionais do consultório.', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (5)
  { area: 'saude', texto: 'Durante um procedimento, o paciente apresenta uma reação alérgica ao anestésico. O que você faria?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'situacional', competencia: 'Atendimento de Urgência' },
  { area: 'saude', texto: 'Um paciente não está seguindo as orientações pós-operatórias e apresenta complicações. Como abordaria?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você identifica que um paciente precisa de um tratamento especializado que está além da sua expertise. Como procederia?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um paciente questiona o valor do tratamento e ameaça ir a outro profissional. Como você conduziria?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Durante uma exodontia, ocorre uma fratura radicular. Qual seria sua conduta?', cargo: 'Cirurgião-Dentista', nivel: 'junior', categoria: 'situacional', competencia: 'Cirurgia Oral Menor' },
];

export const cirurgiaoDentistaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com tratamentos endodônticos e como você lida com canais calcificados ou curvos.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Procedimentos Restauradores' },
  { area: 'saude', texto: 'Me explique como você planeja e executa reabilitações orais mais complexas envolvendo próteses fixas.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Diagnóstico e Planejamento' },
  { area: 'saude', texto: 'Como você aborda casos de periodontite moderada a avançada, incluindo o plano de tratamento e manutenção?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Periodontia e Prevenção' },
  { area: 'saude', texto: 'Descreva sua experiência com cirurgias mais complexas como terceiros molares inclusos ou semi-inclusos.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Cirurgia Oral Menor' },
  { area: 'saude', texto: 'Me explique como você utiliza tecnologias digitais (scanners, software de planejamento) na sua prática.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Diagnóstico e Planejamento' },
  { area: 'saude', texto: 'Como você gerencia pacientes com condições sistêmicas que afetam o tratamento odontológico?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atendimento de Urgência' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional e as especializações ou cursos que agregaram à sua prática.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um caso clínico complexo que você conduziu com sucesso e os desafios que enfrentou.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em orientar auxiliares ou colegas menos experientes.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você desenvolveu sua carteira de pacientes e construiu sua reputação profissional?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Conte sobre uma complicação clínica que você enfrentou e como a resolveu.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Atendimento de Urgência' },
  { area: 'saude', texto: 'Descreva sua experiência com trabalho interdisciplinar junto a outras especialidades odontológicas.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você lida com a pressão de manter a produtividade do consultório sem comprometer a qualidade?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva como você apresenta orçamentos de tratamentos extensos e lida com objeções de pacientes.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você equilibra a atualização técnica com as demandas do dia a dia clínico.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Como você gerencia situações onde o resultado do tratamento não atende às expectativas do paciente?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Descreva como você mantém a ética profissional frente a pressões comerciais ou de concorrência.', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Como você lidera e motiva sua equipe de auxiliares para um atendimento de excelência?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (6)
  { area: 'saude', texto: 'Um paciente apresenta uma emergência hemorrágica após uma extração. Como você procederia?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento de Urgência' },
  { area: 'saude', texto: 'Você identifica que um tratamento iniciado por outro profissional foi mal executado. Como abordaria com o paciente?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Um paciente insiste em um tratamento que você considera inadequado para o caso. Como conduziria?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Você percebe sinais de bruxismo severo que o paciente desconhece. Como abordaria isso?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'situacional', competencia: 'Diagnóstico e Planejamento' },
  { area: 'saude', texto: 'Um paciente abandona o tratamento no meio e retorna meses depois com a situação agravada. O que faria?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Você suspeita que um paciente está sofrendo violência doméstica com base em lesões na região bucal. Como procederia?', cargo: 'Cirurgião-Dentista', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
];

export const cirurgiaoDentistaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'saude', texto: 'Como você estrutura e gerencia um consultório ou clínica odontológica de forma eficiente?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Descreva sua experiência com casos multidisciplinares envolvendo várias especialidades odontológicas.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'tecnica', competencia: 'Diagnóstico e Planejamento' },
  { area: 'saude', texto: 'Me explique como você implementa protocolos de qualidade e biossegurança em uma clínica.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Descreva sua abordagem para planejar reabilitações orais complexas de boca toda.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'tecnica', competencia: 'Procedimentos Restauradores' },
  { area: 'saude', texto: 'Como você se mantém atualizado e implementa novas tecnologias na prática clínica?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'tecnica', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Me explique sua experiência com a formação e capacitação de equipes odontológicas.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Descreva como você gerencia indicadores de qualidade e satisfação dos pacientes.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Consultório' },

  // Experiência (7)
  { area: 'saude', texto: 'Conte sobre sua trajetória até se tornar referência na área e os principais marcos da carreira.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva um projeto de melhoria ou inovação que você implementou em clínica ou consultório.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em formar e mentorar outros profissionais da odontologia.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você construiu e mantém parcerias com outros especialistas e laboratórios?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Conte sobre sua participação em congressos, publicações ou contribuições acadêmicas.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Descreva sua experiência com a gestão financeira e crescimento de negócios odontológicos.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Me fale sobre casos extremamente desafiadores que marcaram sua carreira e os aprendizados.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'experiencia', competencia: 'Vivência Clínica' },

  // Comportamental (7)
  { area: 'saude', texto: 'Como você equilibra as demandas de gestão com a prática clínica e a vida pessoal?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva sua abordagem para lidar com colaboradores de baixo desempenho ou comportamento inadequado.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Como você promove uma cultura de excelência e melhoria contínua na equipe?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Me conte como você lida com a concorrência de mercado mantendo a ética profissional.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Descreva como você constrói relacionamentos de longo prazo com pacientes e mantém a fidelização.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Como você mantém a motivação da equipe em cenários de desafios ou baixa demanda?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Descreva como você se posiciona em questões éticas controversas na odontologia.', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (7)
  { area: 'saude', texto: 'Um paciente ameaça processar a clínica por um resultado que você sabe estar correto. Como conduziria?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Você identifica que um dentista da equipe está realizando procedimentos inadequados. Como abordaria?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Há uma crise de imagem da clínica nas redes sociais por uma reclamação de paciente. O que faria?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'situacional', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Um fornecedor importante aumenta significativamente os preços. Como você negociaria ou buscaria alternativas?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Consultório' },
  { area: 'saude', texto: 'Você precisa implementar uma mudança de processos que encontra resistência da equipe. Como conduziria?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Equipe' },
  { area: 'saude', texto: 'Um profissional chave da equipe pede demissão em um momento crítico. Quais seriam seus passos?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'situacional', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Você é consultado sobre a viabilidade de abrir uma filial ou expandir o negócio. Como avaliaria?', cargo: 'Cirurgião-Dentista', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Consultório' },
];

// ============================================
// TÉCNICO EM SAÚDE BUCAL (TSB)
// ============================================

export const tecnicoSaudeBucalJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva como você realiza procedimentos preventivos como aplicação de flúor e selantes sob supervisão do dentista.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Procedimentos Preventivos' },
  { area: 'saude', texto: 'Me explique sua experiência com tomadas radiográficas odontológicas e os cuidados de proteção.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Radiologia Odontológica' },
  { area: 'saude', texto: 'Como você realiza a profilaxia dental e quais instrumentos utiliza para remoção de cálculo supragengival?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Procedimentos Preventivos' },
  { area: 'saude', texto: 'Descreva sua experiência auxiliando o dentista em procedimentos restauradores e cirúrgicos.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Auxiliar em Procedimentos' },
  { area: 'saude', texto: 'Me explique como você conduz atividades de educação em saúde bucal para pacientes e comunidades.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Educação em Saúde Bucal' },
  { area: 'saude', texto: 'Como você realiza a manipulação de materiais odontológicos restauradores e de moldagem?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'tecnica', competencia: 'Auxiliar em Procedimentos' },

  // Experiência (5)
  { area: 'saude', texto: 'Conte-me sobre sua formação como técnico em saúde bucal e os estágios que realizou.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação desafiadora que você enfrentou no consultório e como lidou com ela.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptabilidade' },
  { area: 'saude', texto: 'Me fale sobre sua experiência trabalhando com diferentes dentistas e especialidades.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como foi sua adaptação à rotina de um consultório odontológico nos primeiros meses?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Conte sobre algum feedback que você recebeu que te ajudou a melhorar sua atuação profissional.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado Contínuo' },

  // Comportamental (5)
  { area: 'saude', texto: 'Como você lida com crianças ou pacientes ansiosos durante procedimentos odontológicos?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Empatia' },
  { area: 'saude', texto: 'Descreva como você se comunica com pacientes para orientá-los sobre higiene bucal.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você organiza suas tarefas quando há muitos pacientes agendados.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Como você trabalha em sintonia com o dentista durante os procedimentos?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Descreva como você mantém a confidencialidade das informações dos pacientes.', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética Profissional' },

  // Situacional (5)
  { area: 'saude', texto: 'Durante a aplicação de flúor, a criança vomita. Qual seria sua conduta imediata?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Procedimentos Preventivos' },
  { area: 'saude', texto: 'Você percebe que um paciente não está seguindo as orientações de higiene. Como abordaria?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Educação em Saúde Bucal' },
  { area: 'saude', texto: 'O dentista solicita um material que acabou no estoque. O que você faria?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Auxiliar em Procedimentos' },
  { area: 'saude', texto: 'Um paciente reclama de dor durante um procedimento de profilaxia. Como você procederia?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Procedimentos Preventivos' },
  { area: 'saude', texto: 'Você identifica sinais de cárie em um paciente durante a profilaxia. O que faria?', cargo: 'Técnico em Saúde Bucal', nivel: 'junior', categoria: 'situacional', competencia: 'Educação em Saúde Bucal' },
];

export const tecnicoSaudeBucalPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: 'Descreva sua experiência com procedimentos mais complexos de profilaxia e raspagem supragengival.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Procedimentos Preventivos' },
  { area: 'saude', texto: 'Me explique como você auxilia em procedimentos de prótese, incluindo moldagens e provisórios.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Auxiliar em Procedimentos' },
  { area: 'saude', texto: 'Como você conduz programas de educação em saúde bucal para grupos ou comunidades?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Educação em Saúde Bucal' },
  { area: 'saude', texto: 'Descreva sua experiência com diferentes sistemas de radiografia digital.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Radiologia Odontológica' },
  { area: 'saude', texto: 'Me explique como você gerencia o estoque de materiais e insumos do consultório.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Auxiliar em Procedimentos' },
  { area: 'saude', texto: 'Como você aplica os protocolos de biossegurança e controla sua execução na equipe?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'tecnica', competencia: 'Biossegurança' },

  // Experiência (6)
  { area: 'saude', texto: 'Conte sobre sua trajetória profissional como TSB e as especializações ou cursos que fez.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Formação Profissional' },
  { area: 'saude', texto: 'Descreva uma situação em que sua observação durante o atendimento contribuiu para o diagnóstico.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vivência Clínica' },
  { area: 'saude', texto: 'Me fale sobre sua experiência em treinar ou orientar auxiliares de saúde bucal.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você contribuiu para melhorar processos ou fluxos nos consultórios onde trabalhou?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'saude', texto: 'Conte sobre sua experiência em ações de saúde bucal em escolas ou comunidades.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Educação em Saúde Bucal' },
  { area: 'saude', texto: 'Descreva sua participação em equipes de saúde da família ou programas públicos de odontologia.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho em Equipe' },

  // Comportamental (6)
  { area: 'saude', texto: 'Como você lida com a pressão de múltiplos pacientes e alta demanda mantendo a qualidade?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Tempo' },
  { area: 'saude', texto: 'Descreva como você adapta sua comunicação para diferentes públicos (crianças, idosos, gestantes).', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'saude', texto: 'Me conte como você lida com divergências ou conflitos com colegas de equipe.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'saude', texto: 'Como você aborda situações onde o dentista solicita algo além das suas atribuições legais?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Descreva como você se mantém atualizado sobre técnicas e materiais odontológicos.', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'saude', texto: 'Como você motiva pacientes que não demonstram interesse em cuidar da saúde bucal?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'comportamental', competencia: 'Empatia' },

  // Situacional (6)
  { area: 'saude', texto: 'Durante uma profilaxia, você identifica sinais de possível câncer bucal. Qual seria sua conduta?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'situacional', competencia: 'Procedimentos Preventivos' },
  { area: 'saude', texto: 'Um dentista solicita que você realize um procedimento que não é de sua competência legal. O que faria?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'situacional', competencia: 'Ética Profissional' },
  { area: 'saude', texto: 'Há um surto de falta de materiais por problema com fornecedor. Como você gerenciaria?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'situacional', competencia: 'Auxiliar em Procedimentos' },
  { area: 'saude', texto: 'Uma criança em ação escolar está com sinais evidentes de negligência de saúde bucal. Como procederia?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'situacional', competencia: 'Educação em Saúde Bucal' },
  { area: 'saude', texto: 'Você percebe que um colega não está seguindo os protocolos de biossegurança. Como abordaria?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'situacional', competencia: 'Biossegurança' },
  { area: 'saude', texto: 'Um paciente quer remarcar uma profilaxia que você sabe ser urgente. Como conduziria?', cargo: 'Técnico em Saúde Bucal', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA - PARTE 1
// ============================================

export const perguntasSaudeParte1: PerguntaSeed[] = [
  ...enfermeiroJunior,
  ...enfermeiroPleno,
  ...enfermeiroSenior,
  ...tecnicoEnfermagemJunior,
  ...tecnicoEnfermagemPleno,
  ...recepcionistaClinicaJunior,
  ...recepcionistaClinicaPleno,
  ...fisioterapeutaJunior,
  ...fisioterapeutaPleno,
  ...fisioterapeutaSenior,
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA - PARTE 2
// ============================================

export const perguntasSaudeParte2: PerguntaSeed[] = [
  ...farmaceuticoJunior,
  ...farmaceuticoPleno,
  ...farmaceuticoSenior,
  ...nutricionistaJunior,
  ...nutricionistaPleno,
  ...nutricionistaSenior,
  ...psicologoJunior,
  ...psicologoPleno,
  ...psicologoSenior,
  ...auxiliarSaudeBucalJunior,
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA - PARTE 3 (Odontologia)
// ============================================

export const perguntasSaudeParte3: PerguntaSeed[] = [
  ...cirurgiaoDentistaJunior,
  ...cirurgiaoDentistaPleno,
  ...cirurgiaoDentistaSenior,
  ...tecnicoSaudeBucalJunior,
  ...tecnicoSaudeBucalPleno,
];

export const perguntasSaude: PerguntaSeed[] = [
  ...perguntasSaudeParte1,
  ...perguntasSaudeParte2,
  ...perguntasSaudeParte3,
];

export const estatisticasSaude = {
  total: perguntasSaude.length,
  porCargo: {
    // Parte 1
    'Enfermeiro Junior': enfermeiroJunior.length,
    'Enfermeiro Pleno': enfermeiroPleno.length,
    'Enfermeiro Senior': enfermeiroSenior.length,
    'Técnico de Enfermagem Junior': tecnicoEnfermagemJunior.length,
    'Técnico de Enfermagem Pleno': tecnicoEnfermagemPleno.length,
    'Recepcionista de Clínica/Hospital Junior': recepcionistaClinicaJunior.length,
    'Recepcionista de Clínica/Hospital Pleno': recepcionistaClinicaPleno.length,
    'Fisioterapeuta Junior': fisioterapeutaJunior.length,
    'Fisioterapeuta Pleno': fisioterapeutaPleno.length,
    'Fisioterapeuta Senior': fisioterapeutaSenior.length,
    // Parte 2
    'Farmacêutico Junior': farmaceuticoJunior.length,
    'Farmacêutico Pleno': farmaceuticoPleno.length,
    'Farmacêutico Senior': farmaceuticoSenior.length,
    'Nutricionista Junior': nutricionistaJunior.length,
    'Nutricionista Pleno': nutricionistaPleno.length,
    'Nutricionista Senior': nutricionistaSenior.length,
    'Psicólogo Junior': psicologoJunior.length,
    'Psicólogo Pleno': psicologoPleno.length,
    'Psicólogo Senior': psicologoSenior.length,
    'Auxiliar de Saúde Bucal Junior': auxiliarSaudeBucalJunior.length,
    // Parte 3 (Odontologia)
    'Cirurgião-Dentista Junior': cirurgiaoDentistaJunior.length,
    'Cirurgião-Dentista Pleno': cirurgiaoDentistaPleno.length,
    'Cirurgião-Dentista Senior': cirurgiaoDentistaSenior.length,
    'Técnico em Saúde Bucal Junior': tecnicoSaudeBucalJunior.length,
    'Técnico em Saúde Bucal Pleno': tecnicoSaudeBucalPleno.length,
  },
};
