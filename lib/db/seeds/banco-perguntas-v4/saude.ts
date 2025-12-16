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
 * 🔴 Parte 2: Farmacêutico, Nutricionista, Psicólogo, Auxiliar de Saúde Bucal
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

// Placeholder para Parte 2 (será adicionado na próxima sessão)
// export const perguntasSaudeParte2: PerguntaSeed[] = [
//   ...farmaceuticoJunior,
//   ...farmaceuticoPleno,
//   ...farmaceuticoSenior,
//   ...nutricionistaJunior,
//   ...nutricionistaPleno,
//   ...nutricionistaSenior,
//   ...psicologoJunior,
//   ...psicologoPleno,
//   ...psicologoSenior,
//   ...auxiliarSaudeBucalJunior,
// ];

export const perguntasSaude: PerguntaSeed[] = [
  ...perguntasSaudeParte1,
  // ...perguntasSaudeParte2, // Descomentar após criar Parte 2
];

export const estatisticasSaude = {
  total: perguntasSaude.length,
  porCargo: {
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
    // Parte 2 - será adicionado
    // 'Farmacêutico Junior': 0,
    // 'Farmacêutico Pleno': 0,
    // 'Farmacêutico Senior': 0,
    // 'Nutricionista Junior': 0,
    // 'Nutricionista Pleno': 0,
    // 'Nutricionista Senior': 0,
    // 'Psicólogo Junior': 0,
    // 'Psicólogo Pleno': 0,
    // 'Psicólogo Senior': 0,
    // 'Auxiliar de Saúde Bucal Junior': 0,
  },
};
