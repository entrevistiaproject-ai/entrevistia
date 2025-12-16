/**
 * Banco de Perguntas v4 - Hotelaria/Turismo
 *
 * Cargos incluidos:
 * - Recepcionista de Hotel (Junior, Pleno) - 45 perguntas
 * - Camareiro (Junior, Pleno) - 45 perguntas
 * - Gerente de Hospedagem (Pleno, Senior) - 52 perguntas
 * - Agente de Viagens (Junior, Pleno, Senior) - 73 perguntas
 * - Maitre / Garcom (Junior, Pleno) - 45 perguntas
 *
 * Total: 260 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// RECEPCIONISTA DE HOTEL
// ============================================

export const recepcionistaHotelJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce realiza o processo de check-in de um hospede, desde a recepcao ate a entrega das chaves?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'tecnica', competencia: 'Check-in e Check-out' },
  { area: 'hotelaria', texto: 'Quais informacoes voce considera essenciais verificar no momento do check-out de um hospede?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'tecnica', competencia: 'Check-in e Check-out' },
  { area: 'hotelaria', texto: 'Como voce utiliza um sistema de reservas (PMS) para consultar disponibilidade e realizar reservas?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas de Reservas (PMS)' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para registrar e confirmar uma reserva feita por telefone?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'tecnica', competencia: 'Atendimento a Hospedes' },
  { area: 'hotelaria', texto: 'Como voce procede quando um hospede solicita informacoes sobre servicos e atracoes turisticas da regiao?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'tecnica', competencia: 'Atendimento a Hospedes' },
  { area: 'hotelaria', texto: 'Quais documentos voce solicita e verifica no momento do check-in de hospedes nacionais e estrangeiros?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'tecnica', competencia: 'Check-in e Check-out' },

  // Experiencia (5)
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia anterior em atendimento ao publico e como ela contribui para a funcao de recepcionista.', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento a Hospedes' },
  { area: 'hotelaria', texto: 'Descreva uma situacao em que voce precisou lidar com um cliente insatisfeito. Como resolveu?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'experiencia', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com sistemas informatizados de atendimento ou reservas?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas de Reservas (PMS)' },
  { area: 'hotelaria', texto: 'Descreva uma ocasiao em que voce trabalhou em ambiente de alta demanda. Como organizou suas tarefas?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'experiencia', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Conte sobre uma experiencia em que voce utilizou outro idioma para atender um cliente.', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'experiencia', competencia: 'Comunicacao em Outros Idiomas' },

  // Comportamental (5)
  { area: 'hotelaria', texto: 'Como voce mantem a cordialidade e o profissionalismo mesmo apos longas horas de trabalho?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'comportamental', competencia: 'Cordialidade e Hospitalidade' },
  { area: 'hotelaria', texto: 'De que forma voce demonstra proatividade no atendimento aos hospedes?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'comportamental', competencia: 'Proatividade' },
  { area: 'hotelaria', texto: 'Como voce lida com situacoes em que precisa dar uma resposta negativa a um hospede?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'comportamental', competencia: 'Paciencia' },
  { area: 'hotelaria', texto: 'Descreva como voce se organiza para realizar multiplas tarefas simultaneamente na recepcao.', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Como voce busca aprimorar suas habilidades de comunicacao e atendimento?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },

  // Situacional (5)
  { area: 'hotelaria', texto: 'Um hospede chega para o check-in mas sua reserva nao consta no sistema. O que voce faz?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'O hotel esta lotado e um hospede solicita um upgrade de quarto. Como voce conduz essa situacao?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'situacional', competencia: 'Upselling de Servicos' },
  { area: 'hotelaria', texto: 'Um hospede estrangeiro nao fala portugues e tem dificuldade para se comunicar. Como procede?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicacao em Outros Idiomas' },
  { area: 'hotelaria', texto: 'Voce percebe que um hospede parece perdido ou confuso no lobby. Qual sua atitude?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'situacional', competencia: 'Cordialidade e Hospitalidade' },
  { area: 'hotelaria', texto: 'O sistema de reservas cai durante um momento de grande movimento. O que voce faz?', cargo: 'Recepcionista de Hotel', nivel: 'junior', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
];

export const recepcionistaHotelPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce gerencia overbooking de forma a minimizar impactos negativos para hospedes e hotel?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'tecnica', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Quais estrategias voce utiliza para realizar upselling de quartos e servicos de forma eficaz?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'tecnica', competencia: 'Upselling de Servicos' },
  { area: 'hotelaria', texto: 'Como voce conduz o atendimento a grupos e eventos, desde a chegada ate o check-out?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atendimento a Hospedes' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para lidar com hospedes VIP ou de programas de fidelidade?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atendimento a Hospedes' },
  { area: 'hotelaria', texto: 'Como voce utiliza relatorios do PMS para antecipar necessidades e melhorar o atendimento?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'tecnica', competencia: 'Sistemas de Reservas (PMS)' },
  { area: 'hotelaria', texto: 'Quais metricas voce acompanha para avaliar a qualidade do atendimento na recepcao?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'tecnica', competencia: 'Resolucao de Problemas' },

  // Experiencia (6)
  { area: 'hotelaria', texto: 'Conte sobre uma situacao complexa de reclamacao que voce resolveu de forma satisfatoria para o hospede.', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Descreva sua experiencia com treinamento ou orientacao de novos recepcionistas.', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com gestao de caixa e fechamento de turno na recepcao?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'experiencia', competencia: 'Check-in e Check-out' },
  { area: 'hotelaria', texto: 'Descreva uma situacao em que voce identificou e implementou uma melhoria no processo de atendimento.', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'experiencia', competencia: 'Proatividade' },
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia com atendimento em alta temporada e picos de demanda.', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'experiencia', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Descreva como voce contribuiu para aumentar a satisfacao dos hospedes em uma experiencia anterior.', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'experiencia', competencia: 'Cordialidade e Hospitalidade' },

  // Comportamental (6)
  { area: 'hotelaria', texto: 'Como voce equilibra a atencao personalizada a cada hospede com a eficiencia no atendimento?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cordialidade e Hospitalidade' },
  { area: 'hotelaria', texto: 'De que forma voce contribui para criar um ambiente de trabalho positivo na equipe de recepcao?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'hotelaria', texto: 'Como voce lida com pressao durante momentos de alta demanda ou situacoes emergenciais?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliencia' },
  { area: 'hotelaria', texto: 'Descreva como voce mantem a calma e profissionalismo diante de hospedes exaltados.', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'comportamental', competencia: 'Paciencia' },
  { area: 'hotelaria', texto: 'Como voce se atualiza sobre tendencias em hotelaria e atendimento ao cliente?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },
  { area: 'hotelaria', texto: 'De que forma voce compartilha conhecimento e boas praticas com colegas de equipe?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (6)
  { area: 'hotelaria', texto: 'Um hospede reclama que o quarto nao corresponde ao que foi reservado. Como voce resolve?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Voce identifica uma possivel fraude no cartao de credito de um hospede. Qual sua conduta?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'situacional', competencia: 'Etica Profissional' },
  { area: 'hotelaria', texto: 'Um hospede VIP chega sem reserva e o hotel esta lotado. Como voce conduz essa situacao?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Dois colegas de trabalho estao em conflito e isso afeta o atendimento. O que voce faz?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'situacional', competencia: 'Trabalho em Equipe' },
  { area: 'hotelaria', texto: 'Um hospede solicita um servico que o hotel nao oferece. Como voce procede?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'situacional', competencia: 'Proatividade' },
  { area: 'hotelaria', texto: 'Voce percebe que um colega cometeu um erro no check-in de um hospede. Como age?', cargo: 'Recepcionista de Hotel', nivel: 'pleno', categoria: 'situacional', competencia: 'Etica Profissional' },
];

// ============================================
// CAMAREIRO
// ============================================

export const camareiroJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Descreva o passo a passo que voce segue para arrumar um quarto de hotel atendendo aos padroes de qualidade.', cargo: 'Camareiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Arrumacao de Quartos' },
  { area: 'hotelaria', texto: 'Quais produtos e tecnicas de limpeza voce utiliza para diferentes superficies no quarto?', cargo: 'Camareiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Padroes de Limpeza' },
  { area: 'hotelaria', texto: 'Como voce organiza e controla o enxoval do seu carrinho de trabalho durante o turno?', cargo: 'Camareiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Controle de Enxoval' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para repor e conferir o minibar dos quartos?', cargo: 'Camareiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Minibar' },
  { area: 'hotelaria', texto: 'Como voce procede ao encontrar objetos deixados por hospedes nos quartos?', cargo: 'Camareiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Objetos Perdidos' },
  { area: 'hotelaria', texto: 'Quais sao os itens que voce verifica em um quarto antes de libera-lo como pronto para nova ocupacao?', cargo: 'Camareiro', nivel: 'junior', categoria: 'tecnica', competencia: 'Arrumacao de Quartos' },

  // Experiencia (5)
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia anterior com limpeza e organizacao de ambientes.', cargo: 'Camareiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Padroes de Limpeza' },
  { area: 'hotelaria', texto: 'Descreva uma situacao em que voce precisou trabalhar com prazo apertado. Como se organizou?', cargo: 'Camareiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Agilidade' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia em trabalhar seguindo procedimentos e padroes estabelecidos?', cargo: 'Camareiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Padroes de Limpeza' },
  { area: 'hotelaria', texto: 'Descreva uma ocasiao em que voce identificou um problema em um ambiente e tomou iniciativa para resolver.', cargo: 'Camareiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Proatividade' },
  { area: 'hotelaria', texto: 'Conte sobre uma experiencia de trabalho em que a atencao aos detalhes foi fundamental.', cargo: 'Camareiro', nivel: 'junior', categoria: 'experiencia', competencia: 'Atencao aos Detalhes' },

  // Comportamental (5)
  { area: 'hotelaria', texto: 'Como voce garante que nenhum detalhe escape durante a arrumacao de um quarto?', cargo: 'Camareiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Atencao aos Detalhes' },
  { area: 'hotelaria', texto: 'De que forma voce mantem a discricao ao trabalhar em quartos ocupados ou areas comuns?', cargo: 'Camareiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Discricao' },
  { area: 'hotelaria', texto: 'Como voce organiza seu tempo para cumprir a meta diaria de quartos arrumados?', cargo: 'Camareiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Descreva como voce lida com o trabalho fisico e repetitivo da funcao.', cargo: 'Camareiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliencia' },
  { area: 'hotelaria', texto: 'Como voce age ao encontrar pertences de hospedes durante a limpeza?', cargo: 'Camareiro', nivel: 'junior', categoria: 'comportamental', competencia: 'Etica Profissional' },

  // Situacional (5)
  { area: 'hotelaria', texto: 'Voce entra em um quarto para limpar e o hospede ainda esta la. O que voce faz?', cargo: 'Camareiro', nivel: 'junior', categoria: 'situacional', competencia: 'Discricao' },
  { area: 'hotelaria', texto: 'Encontra um item de valor esquecido por um hospede que ja fez check-out. Como procede?', cargo: 'Camareiro', nivel: 'junior', categoria: 'situacional', competencia: 'Objetos Perdidos' },
  { area: 'hotelaria', texto: 'Voce percebe danos no quarto que nao estavam la antes. Qual sua atitude?', cargo: 'Camareiro', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicacao' },
  { area: 'hotelaria', texto: 'O enxoval do seu carrinho acaba antes de terminar os quartos do dia. O que voce faz?', cargo: 'Camareiro', nivel: 'junior', categoria: 'situacional', competencia: 'Controle de Enxoval' },
  { area: 'hotelaria', texto: 'Um hospede pede para voce limpar o quarto com urgencia fora do horario padrao. Como age?', cargo: 'Camareiro', nivel: 'junior', categoria: 'situacional', competencia: 'Atendimento ao Hospede' },
];

export const camareiroPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce organiza a distribuicao de quartos entre a equipe para otimizar o tempo de arrumacao?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Quais tecnicas voce utiliza para limpeza e conservacao de diferentes tipos de tecidos e superficies?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Padroes de Limpeza' },
  { area: 'hotelaria', texto: 'Como voce realiza o inventario e controle de enxoval e amenidades do andar?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle de Enxoval' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para preparar quartos para hospedes VIP ou com solicitacoes especiais?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Arrumacao de Quartos' },
  { area: 'hotelaria', texto: 'Como voce identifica e reporta necessidades de manutencao nos quartos?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Manutencao Preventiva' },
  { area: 'hotelaria', texto: 'Quais padroes de higiene e seguranca voce segue para prevenir contaminacao e acidentes?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'tecnica', competencia: 'Padroes de Limpeza' },

  // Experiencia (6)
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia com supervisao ou orientacao de colegas de equipe.', cargo: 'Camareiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'Descreva uma situacao em que voce identificou e implementou uma melhoria no processo de arrumacao.', cargo: 'Camareiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com atendimento a solicitacoes especiais de hospedes?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Atendimento ao Hospede' },
  { area: 'hotelaria', texto: 'Descreva uma ocasiao em que voce trabalhou sob alta demanda, como em alta temporada.', cargo: 'Camareiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Agilidade' },
  { area: 'hotelaria', texto: 'Conte sobre uma experiencia em que voce precisou treinar um novo colega.', cargo: 'Camareiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { area: 'hotelaria', texto: 'Descreva como voce contribuiu para melhorar os indices de satisfacao dos hospedes.', cargo: 'Camareiro', nivel: 'pleno', categoria: 'experiencia', competencia: 'Qualidade' },

  // Comportamental (6)
  { area: 'hotelaria', texto: 'Como voce equilibra qualidade e velocidade na arrumacao dos quartos?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Eficiencia' },
  { area: 'hotelaria', texto: 'De que forma voce contribui para um ambiente de trabalho positivo com a equipe?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'hotelaria', texto: 'Como voce lida com feedbacks sobre seu trabalho, sejam positivos ou negativos?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Receptividade ao Feedback' },
  { area: 'hotelaria', texto: 'Descreva como voce mantem a motivacao em tarefas repetitivas.', cargo: 'Camareiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivacao' },
  { area: 'hotelaria', texto: 'Como voce age quando percebe que um colega esta com dificuldades para cumprir suas tarefas?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboracao' },
  { area: 'hotelaria', texto: 'De que forma voce busca se atualizar sobre novas tecnicas e produtos de limpeza?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },

  // Situacional (6)
  { area: 'hotelaria', texto: 'Um hospede reclama da limpeza do quarto arrumado por voce. Como voce reage?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Voce encontra itens suspeitos ou proibidos em um quarto. Qual sua conduta?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Etica Profissional' },
  { area: 'hotelaria', texto: 'A equipe esta desfalcada e ha muitos quartos para arrumar. Como voce organiza o trabalho?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Um hospede faz um pedido especial que foge dos padroes do hotel. O que voce faz?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento ao Hospede' },
  { area: 'hotelaria', texto: 'Voce percebe que um colega nao esta seguindo os padroes de limpeza. Como age?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicacao' },
  { area: 'hotelaria', texto: 'Ha uma inspeccao surpresa e um quarto seu ainda nao esta finalizado. O que voce faz?', cargo: 'Camareiro', nivel: 'pleno', categoria: 'situacional', competencia: 'Agilidade' },
];

// ============================================
// GERENTE DE HOSPEDAGEM
// ============================================

export const gerenteHospedagemPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce analisa indicadores de ocupacao para tomar decisoes sobre tarifas e disponibilidade?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao de Ocupacao' },
  { area: 'hotelaria', texto: 'Quais estrategias de revenue management voce utiliza para maximizar a receita do hotel?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Revenue Management' },
  { area: 'hotelaria', texto: 'Como voce estrutura e acompanha os indicadores de qualidade de servico da hospedagem?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Qualidade de Servico' },
  { area: 'hotelaria', texto: 'Quais processos voce implementa para gerenciar o relacionamento com OTAs e canais de venda?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Relacionamento com OTAs' },
  { area: 'hotelaria', texto: 'Como voce organiza escalas e distribuicao de tarefas entre as equipes de recepcao e governanca?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao de Equipes' },
  { area: 'hotelaria', texto: 'Quais ferramentas e relatorios voce utiliza para monitorar o desempenho operacional da hospedagem?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao de Ocupacao' },

  // Experiencia (6)
  { area: 'hotelaria', texto: 'Conte sobre uma estrategia que voce implementou para aumentar a taxa de ocupacao do hotel.', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestao de Ocupacao' },
  { area: 'hotelaria', texto: 'Descreva sua experiencia com contratacao, treinamento e desenvolvimento de equipes.', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestao de Equipes' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com gestao de crises ou situacoes emergenciais no hotel?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'Descreva uma negociacao bem-sucedida que voce conduziu com parceiros ou fornecedores.', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociacao' },
  { area: 'hotelaria', texto: 'Conte sobre um projeto de melhoria de processos que voce liderou na hospedagem.', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'hotelaria', texto: 'Descreva como voce lidou com uma situacao de reclamacao grave de hospede.', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'experiencia', competencia: 'Qualidade de Servico' },

  // Comportamental (6)
  { area: 'hotelaria', texto: 'Como voce equilibra a atencao aos detalhes operacionais com a visao estrategica do negocio?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Visao Estrategica' },
  { area: 'hotelaria', texto: 'De que forma voce desenvolve e motiva sua equipe para entregar um servico de excelencia?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'Como voce lida com pressao por resultados e metas agressivas?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliencia' },
  { area: 'hotelaria', texto: 'Descreva como voce toma decisoes quando ha conflito entre satisfacao do hospede e custos.', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Tomada de Decisao' },
  { area: 'hotelaria', texto: 'Como voce se mantem atualizado sobre tendencias do mercado hoteleiro?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },
  { area: 'hotelaria', texto: 'De que forma voce promove uma cultura de hospitalidade entre sua equipe?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura Organizacional' },

  // Situacional (6)
  { area: 'hotelaria', texto: 'O hotel enfrenta uma crise de reputacao online por avaliacoes negativas. Que acoes voce toma?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'Um colaborador-chave pede demissao em alta temporada. Como voce gerencia a situacao?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Equipes' },
  { area: 'hotelaria', texto: 'Uma OTA importante ameaca encerrar a parceria por conflito comercial. Como voce negocia?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociacao' },
  { area: 'hotelaria', texto: 'Voce precisa reduzir custos sem afetar a qualidade do servico. Quais estrategias adota?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Custos' },
  { area: 'hotelaria', texto: 'Dois membros da sua equipe estao em conflito e isso afeta o clima. O que voce faz?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Conflitos' },
  { area: 'hotelaria', texto: 'Um grupo grande cancela a reserva de ultima hora. Como voce recupera a receita?', cargo: 'Gerente de Hospedagem', nivel: 'pleno', categoria: 'situacional', competencia: 'Revenue Management' },
];

export const gerenteHospedagemSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'hotelaria', texto: 'Como voce desenvolve e implementa uma estrategia de revenue management integrada para o hotel?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'tecnica', competencia: 'Revenue Management' },
  { area: 'hotelaria', texto: 'Quais metodologias voce utiliza para previsao de demanda e planejamento de capacidade?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestao de Ocupacao' },
  { area: 'hotelaria', texto: 'Como voce estrutura a politica de distribuicao entre canais diretos e indiretos?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'tecnica', competencia: 'Relacionamento com OTAs' },
  { area: 'hotelaria', texto: 'Quais indicadores-chave voce monitora para avaliar a saude financeira da operacao hoteleira?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestao Financeira' },
  { area: 'hotelaria', texto: 'Como voce desenvolve programas de fidelizacao e relacionamento com hospedes frequentes?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'tecnica', competencia: 'Fidelizacao de Clientes' },
  { area: 'hotelaria', texto: 'Quais processos voce implementa para garantir consistencia na experiencia do hospede?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'tecnica', competencia: 'Qualidade de Servico' },
  { area: 'hotelaria', texto: 'Como voce utiliza tecnologia e dados para otimizar a operacao hoteleira?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'tecnica', competencia: 'Tecnologia Hoteleira' },

  // Experiencia (7)
  { area: 'hotelaria', texto: 'Conte sobre uma reestruturacao operacional significativa que voce liderou.', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestao de Mudancas' },
  { area: 'hotelaria', texto: 'Descreva sua experiencia com abertura ou reposicionamento de hotel.', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'experiencia', competencia: 'Pre-abertura' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com implementacao de sistemas de gestao hoteleira (PMS)?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'experiencia', competencia: 'Tecnologia Hoteleira' },
  { area: 'hotelaria', texto: 'Descreva um caso em que voce reverteu uma operacao com baixo desempenho.', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround' },
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia com desenvolvimento de novos produtos ou servicos hoteleiros.', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'experiencia', competencia: 'Inovacao' },
  { area: 'hotelaria', texto: 'Descreva como voce desenvolveu liderancas dentro da sua equipe.', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Lideranca' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com gestao de multiplas unidades ou bandeiras?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestao Multi-unidade' },

  // Comportamental (7)
  { area: 'hotelaria', texto: 'Como voce equilibra inovacao com a manutencao de padroes tradicionais de hospitalidade?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovacao' },
  { area: 'hotelaria', texto: 'De que forma voce influencia a estrategia do hotel junto a proprietarios ou investidores?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Estrategica' },
  { area: 'hotelaria', texto: 'Como voce desenvolve e mantem uma cultura de excelencia em servico?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura Organizacional' },
  { area: 'hotelaria', texto: 'Descreva como voce toma decisoes estrategicas em cenarios de incerteza.', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisao' },
  { area: 'hotelaria', texto: 'Como voce lida com mudancas disruptivas no mercado hoteleiro?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'hotelaria', texto: 'De que forma voce promove sustentabilidade e responsabilidade social na operacao?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'comportamental', competencia: 'Sustentabilidade' },
  { area: 'hotelaria', texto: 'Como voce equilibra as demandas de diferentes stakeholders (hospedes, equipe, investidores)?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestao de Stakeholders' },

  // Situacional (7)
  { area: 'hotelaria', texto: 'O hotel precisa passar por uma reformulacao completa de posicionamento. Como voce planeja?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'situacional', competencia: 'Reposicionamento' },
  { area: 'hotelaria', texto: 'Uma crise externa (pandemia, desastre natural) impacta severamente a operacao. Que acoes toma?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'Os investidores pressionam por corte de custos que voce considera prejudicial. Como negocia?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'situacional', competencia: 'Negociacao' },
  { area: 'hotelaria', texto: 'Um novo concorrente entra no mercado com precos muito agressivos. Qual sua estrategia?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'situacional', competencia: 'Estrategia Competitiva' },
  { area: 'hotelaria', texto: 'Voce identifica uma oportunidade de expansao mas os recursos sao limitados. Como prioriza?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento Estrategico' },
  { area: 'hotelaria', texto: 'A satisfacao dos colaboradores esta em queda e isso afeta o servico. O que voce faz?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'situacional', competencia: 'Engajamento de Equipe' },
  { area: 'hotelaria', texto: 'Um incidente de seguranca grave ocorre no hotel. Como voce gerencia a crise?', cargo: 'Gerente de Hospedagem', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Crises' },
];

// ============================================
// EXPORTACAO CONSOLIDADA (Parte 1 - B11)
// ============================================

export const perguntasHotelariaParte1: PerguntaSeed[] = [
  ...recepcionistaHotelJunior,
  ...recepcionistaHotelPleno,
  ...camareiroJunior,
  ...camareiroPleno,
  ...gerenteHospedagemPleno,
  ...gerenteHospedagemSenior,
];

export const estatisticasHotelariaParte1 = {
  total: perguntasHotelariaParte1.length,
  porCargo: {
    'Recepcionista de Hotel Junior': recepcionistaHotelJunior.length,
    'Recepcionista de Hotel Pleno': recepcionistaHotelPleno.length,
    'Camareiro Junior': camareiroJunior.length,
    'Camareiro Pleno': camareiroPleno.length,
    'Gerente de Hospedagem Pleno': gerenteHospedagemPleno.length,
    'Gerente de Hospedagem Senior': gerenteHospedagemSenior.length,
  },
};

// ============================================
// AGENTE DE VIAGENS
// ============================================

export const agenteViagensJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce utiliza os sistemas de reservas (GDS) para pesquisar e reservar voos para clientes?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas de Reservas (GDS)' },
  { area: 'hotelaria', texto: 'Quais informacoes voce coleta do cliente para montar um roteiro de viagem adequado as suas necessidades?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'tecnica', competencia: 'Roteiros de Viagem' },
  { area: 'hotelaria', texto: 'Como voce orienta clientes sobre a documentacao necessaria para viagens nacionais e internacionais?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentacao de Viagem' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para emitir passagens aereas e confirmar reservas de hospedagem?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas de Reservas (GDS)' },
  { area: 'hotelaria', texto: 'Como voce apresenta opcoes de pacotes turisticos para clientes com diferentes perfis e orcamentos?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'tecnica', competencia: 'Pacotes Turisticos' },
  { area: 'hotelaria', texto: 'Quais canais e ferramentas voce utiliza para pesquisar tarifas e disponibilidade de servicos turisticos?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas de Reservas (GDS)' },

  // Experiencia (5)
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia anterior em atendimento ao cliente ou vendas e como ela contribui para a funcao.', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'experiencia', competencia: 'Vendas Consultivas' },
  { area: 'hotelaria', texto: 'Descreva uma viagem marcante que voce realizou e como essa experiencia enriquece seu trabalho.', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'experiencia', competencia: 'Conhecimento Cultural' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com sistemas informatizados de reservas ou atendimento?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas de Reservas (GDS)' },
  { area: 'hotelaria', texto: 'Descreva uma situacao em que voce precisou pesquisar muito para atender a solicitacao de um cliente.', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'experiencia', competencia: 'Roteiros de Viagem' },
  { area: 'hotelaria', texto: 'Conte sobre uma ocasiao em que voce conseguiu superar a expectativa de um cliente.', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },

  // Comportamental (5)
  { area: 'hotelaria', texto: 'Como voce se mantem atualizado sobre destinos, tendencias e novidades do turismo?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualizacao Constante' },
  { area: 'hotelaria', texto: 'De que forma voce organiza suas tarefas para atender varios clientes simultaneamente?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Como voce desperta o interesse do cliente por destinos ou servicos que ele nao conhecia?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'comportamental', competencia: 'Persuasao' },
  { area: 'hotelaria', texto: 'Descreva como voce lida com clientes indecisos ou que mudam de ideia frequentemente.', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'comportamental', competencia: 'Paciencia' },
  { area: 'hotelaria', texto: 'Como voce busca conhecer diferentes culturas para melhor orientar seus clientes?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'comportamental', competencia: 'Conhecimento Cultural' },

  // Situacional (5)
  { area: 'hotelaria', texto: 'Um cliente quer viajar para um destino sobre o qual voce tem pouco conhecimento. O que voce faz?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'situacional', competencia: 'Atualizacao Constante' },
  { area: 'hotelaria', texto: 'O voo do cliente foi cancelado pela companhia aerea. Como voce procede para resolver a situacao?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Um cliente tem orcamento limitado mas quer uma viagem internacional. Como voce orienta?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'situacional', competencia: 'Vendas Consultivas' },
  { area: 'hotelaria', texto: 'O cliente solicita um roteiro que voce considera inadequado para o perfil dele. O que voce faz?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'situacional', competencia: 'Consultoria' },
  { area: 'hotelaria', texto: 'Voce percebe que a documentacao do cliente pode nao estar em ordem para a viagem. Como age?', cargo: 'Agente de Viagens', nivel: 'junior', categoria: 'situacional', competencia: 'Documentacao de Viagem' },
];

export const agenteViagensPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce elabora roteiros personalizados considerando preferencias, restricoes e orcamento do cliente?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'tecnica', competencia: 'Roteiros de Viagem' },
  { area: 'hotelaria', texto: 'Quais estrategias voce utiliza para negociar tarifas e condicoes com fornecedores de turismo?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'tecnica', competencia: 'Negociacao' },
  { area: 'hotelaria', texto: 'Como voce estrutura pacotes turisticos completos incluindo aereo, hospedagem, passeios e seguros?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'tecnica', competencia: 'Pacotes Turisticos' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para viagens que exigem vistos, vacinas ou autorizacoes especiais?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'tecnica', competencia: 'Documentacao de Viagem' },
  { area: 'hotelaria', texto: 'Como voce utiliza ferramentas de CRM para gerenciar relacionamento e fidelizar clientes?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao de Clientes' },
  { area: 'hotelaria', texto: 'Quais tecnicas de venda consultiva voce aplica para identificar necessidades e oferecer solucoes?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'tecnica', competencia: 'Vendas Consultivas' },

  // Experiencia (6)
  { area: 'hotelaria', texto: 'Conte sobre um roteiro complexo que voce montou e que resultou em grande satisfacao do cliente.', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'experiencia', competencia: 'Roteiros de Viagem' },
  { area: 'hotelaria', texto: 'Descreva sua experiencia com viagens corporativas ou para grupos grandes.', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'experiencia', competencia: 'Viagens Corporativas' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia lidando com imprevistos durante viagens de clientes?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'Descreva uma negociacao bem-sucedida que voce fez com fornecedores para beneficiar o cliente.', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociacao' },
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia com destinos de nicho ou viagens tematicas.', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'experiencia', competencia: 'Especializacao' },
  { area: 'hotelaria', texto: 'Descreva como voce fidelizou um cliente atraves de um atendimento excepcional.', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'experiencia', competencia: 'Fidelizacao' },

  // Comportamental (6)
  { area: 'hotelaria', texto: 'Como voce equilibra a venda de produtos mais lucrativos com as reais necessidades do cliente?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'comportamental', competencia: 'Etica Profissional' },
  { area: 'hotelaria', texto: 'De que forma voce transmite confianca e credibilidade ao apresentar roteiros para clientes?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'comportamental', competencia: 'Persuasao' },
  { area: 'hotelaria', texto: 'Como voce lida com reclamacoes de clientes sobre servicos de terceiros durante a viagem?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Descreva como voce se organiza para acompanhar multiplos clientes em diferentes etapas de viagem.', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Como voce contribui para o desenvolvimento de colegas menos experientes na equipe?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'comportamental', competencia: 'Colaboracao' },
  { area: 'hotelaria', texto: 'De que forma voce se especializa em determinados destinos ou tipos de viagem?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualizacao Constante' },

  // Situacional (6)
  { area: 'hotelaria', texto: 'O cliente viajou e o hotel nao tem a reserva registrada. O que voce faz para resolver?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'Um fornecedor faliu e seu cliente tem viagem marcada. Como voce procede?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'O cliente quer cancelar uma viagem ja paga com politica de nao reembolso. Como orienta?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociacao' },
  { area: 'hotelaria', texto: 'Um destino que voce vendeu passa por instabilidade politica. Como voce age?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'O cliente reclama que a viagem nao correspondeu a expectativa. Como voce conduz?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento ao Cliente' },
  { area: 'hotelaria', texto: 'Voce identifica uma oportunidade de upsell mas o cliente esta satisfeito com o basico. Como age?', cargo: 'Agente de Viagens', nivel: 'pleno', categoria: 'situacional', competencia: 'Vendas Consultivas' },
];

export const agenteViagensSenior: PerguntaSeed[] = [
  // Tecnica (7)
  { area: 'hotelaria', texto: 'Como voce desenvolve e gerencia um portfolio de produtos turisticos exclusivos ou diferenciados?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'tecnica', competencia: 'Desenvolvimento de Produtos' },
  { area: 'hotelaria', texto: 'Quais estrategias voce utiliza para gestao de receita e maximizacao de margem em pacotes?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestao de Receita' },
  { area: 'hotelaria', texto: 'Como voce estrutura parcerias estrategicas com operadoras, companhias aereas e redes hoteleiras?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'tecnica', competencia: 'Parcerias Estrategicas' },
  { area: 'hotelaria', texto: 'Quais metodologias voce aplica para analise de mercado e identificacao de oportunidades no turismo?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'tecnica', competencia: 'Analise de Mercado' },
  { area: 'hotelaria', texto: 'Como voce desenvolve programas de viagens corporativas para grandes empresas?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'tecnica', competencia: 'Viagens Corporativas' },
  { area: 'hotelaria', texto: 'Quais indicadores voce monitora para avaliar performance de vendas e satisfacao de clientes?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestao de Indicadores' },
  { area: 'hotelaria', texto: 'Como voce utiliza tecnologia e canais digitais para ampliar alcance e eficiencia comercial?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'tecnica', competencia: 'Tecnologia e Inovacao' },

  // Experiencia (7)
  { area: 'hotelaria', texto: 'Conte sobre uma parceria estrategica que voce desenvolveu e os resultados obtidos.', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'experiencia', competencia: 'Parcerias Estrategicas' },
  { area: 'hotelaria', texto: 'Descreva sua experiencia com gestao de equipes de vendas ou atendimento em turismo.', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'experiencia', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com lancamento de novos produtos ou destinos no mercado?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Produtos' },
  { area: 'hotelaria', texto: 'Descreva um caso em que voce reverteu uma carteira de clientes em declinio.', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'experiencia', competencia: 'Recuperacao de Clientes' },
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia com grandes contas corporativas ou grupos.', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'experiencia', competencia: 'Viagens Corporativas' },
  { area: 'hotelaria', texto: 'Descreva como voce navegou uma crise no setor de turismo (pandemia, desastre, etc.).', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com representacao de operadoras ou companhias em eventos do setor?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'experiencia', competencia: 'Representacao Comercial' },

  // Comportamental (7)
  { area: 'hotelaria', texto: 'Como voce equilibra inovacao e tradicao no atendimento ao cliente de turismo?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'comportamental', competencia: 'Inovacao' },
  { area: 'hotelaria', texto: 'De que forma voce desenvolve e mantem relacionamentos de longo prazo com clientes premium?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'comportamental', competencia: 'Relacionamento com Clientes' },
  { area: 'hotelaria', texto: 'Como voce influencia decisoes estrategicas sobre produtos e mercados na empresa?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'comportamental', competencia: 'Influencia Estrategica' },
  { area: 'hotelaria', texto: 'Descreva como voce desenvolve talentos e forma futuros lideres na equipe.', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'hotelaria', texto: 'Como voce se adapta as mudancas tecnologicas e de comportamento do consumidor de turismo?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'hotelaria', texto: 'De que forma voce promove sustentabilidade e turismo responsavel junto aos clientes?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'comportamental', competencia: 'Sustentabilidade' },
  { area: 'hotelaria', texto: 'Como voce gerencia conflitos de interesse entre metas comerciais e satisfacao do cliente?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'comportamental', competencia: 'Etica Profissional' },

  // Situacional (7)
  { area: 'hotelaria', texto: 'O mercado passa por uma transformacao digital acelerada. Qual sua estrategia para se adaptar?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'situacional', competencia: 'Transformacao Digital' },
  { area: 'hotelaria', texto: 'Um grande cliente corporativo ameaca migrar para a concorrencia. Como voce reage?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'situacional', competencia: 'Retencao de Clientes' },
  { area: 'hotelaria', texto: 'Voce identifica uma fraude em reservas ou documentos de viagem. Como procede?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'situacional', competencia: 'Compliance' },
  { area: 'hotelaria', texto: 'Uma nova regulamentacao impacta significativamente seu modelo de negocio. O que faz?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'situacional', competencia: 'Gestao de Mudancas' },
  { area: 'hotelaria', texto: 'A empresa quer expandir para um novo segmento de turismo. Como voce planeja essa entrada?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento Estrategico' },
  { area: 'hotelaria', texto: 'Um colaborador-chave da equipe comete um erro grave com um cliente importante. Como age?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'situacional', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'O setor enfrenta uma crise economica e a demanda despenca. Qual sua estrategia?', cargo: 'Agente de Viagens', nivel: 'senior', categoria: 'situacional', competencia: 'Resiliencia Empresarial' },
];

// ============================================
// MAITRE / GARCOM
// ============================================

export const maitreGarcomJunior: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce realiza o servico de mesa desde a recepcao do cliente ate a apresentacao da conta?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'tecnica', competencia: 'Servico de Mesa' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para a mise en place antes da abertura do restaurante?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'tecnica', competencia: 'Mise en Place' },
  { area: 'hotelaria', texto: 'Como voce apresenta o cardapio e faz sugestoes de pratos e bebidas aos clientes?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'tecnica', competencia: 'Cardapio e Harmonizacao' },
  { area: 'hotelaria', texto: 'Quais tecnicas voce utiliza para servir bebidas (vinhos, coqueteis) corretamente?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'tecnica', competencia: 'Servico de Bebidas' },
  { area: 'hotelaria', texto: 'Como voce registra e transmite os pedidos para a cozinha de forma precisa?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'tecnica', competencia: 'Atendimento ao Cliente' },
  { area: 'hotelaria', texto: 'Quais cuidados voce tem ao servir pratos quentes e frios, respeitando a ordem correta?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'tecnica', competencia: 'Servico de Mesa' },

  // Experiencia (5)
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia anterior em atendimento em restaurantes ou eventos.', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },
  { area: 'hotelaria', texto: 'Descreva uma situacao em que voce teve que atender muitas mesas simultaneamente. Como se organizou?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'experiencia', competencia: 'Agilidade' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia em lidar com clientes exigentes ou com restricoes alimentares?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento ao Cliente' },
  { area: 'hotelaria', texto: 'Descreva uma ocasiao em que voce precisou memorizar muitos pedidos. Como fez?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'experiencia', competencia: 'Memoria' },
  { area: 'hotelaria', texto: 'Conte sobre uma experiencia em que voce trabalhou em eventos ou banquetes.', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'experiencia', competencia: 'Eventos' },

  // Comportamental (5)
  { area: 'hotelaria', texto: 'Como voce mantem a elegancia e postura adequada durante longas horas de trabalho?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'comportamental', competencia: 'Elegancia e Postura' },
  { area: 'hotelaria', texto: 'De que forma voce lida com a pressao em horarios de pico no restaurante?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho sob Pressao' },
  { area: 'hotelaria', texto: 'Como voce demonstra atencao e cordialidade ao receber e atender os clientes?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'comportamental', competencia: 'Cordialidade' },
  { area: 'hotelaria', texto: 'Descreva como voce organiza seu praca para atender com agilidade e eficiencia.', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'comportamental', competencia: 'Organizacao' },
  { area: 'hotelaria', texto: 'Como voce memoriza pedidos e preferencias dos clientes durante o atendimento?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'comportamental', competencia: 'Memoria' },

  // Situacional (5)
  { area: 'hotelaria', texto: 'Um cliente reclama que o prato esta frio ou diferente do que esperava. O que voce faz?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'situacional', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Voce derrama algo sobre um cliente acidentalmente. Como reage?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'situacional', competencia: 'Controle Emocional' },
  { area: 'hotelaria', texto: 'Um cliente solicita um prato que nao esta disponivel no momento. Como procede?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'situacional', competencia: 'Atendimento ao Cliente' },
  { area: 'hotelaria', texto: 'Uma mesa esta demorando muito para liberar e ha clientes esperando. O que voce faz?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'situacional', competencia: 'Gestao do Salao' },
  { area: 'hotelaria', texto: 'Um cliente menciona que tem alergia alimentar. Quais cuidados voce toma?', cargo: 'Maitre / Garcom', nivel: 'junior', categoria: 'situacional', competencia: 'Seguranca Alimentar' },
];

export const maitreGarcomPleno: PerguntaSeed[] = [
  // Tecnica (6)
  { area: 'hotelaria', texto: 'Como voce gerencia a distribuicao de mesas e o fluxo de atendimento no salao?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestao de Salao' },
  { area: 'hotelaria', texto: 'Quais tecnicas de harmonizacao entre pratos e vinhos voce conhece e aplica?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'tecnica', competencia: 'Cardapio e Harmonizacao' },
  { area: 'hotelaria', texto: 'Como voce conduz o servico de vinhos, desde a apresentacao ate o servico a mesa?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'tecnica', competencia: 'Servico de Bebidas' },
  { area: 'hotelaria', texto: 'Quais procedimentos voce segue para atendimento de mesas VIP ou clientes especiais?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'tecnica', competencia: 'Atendimento Diferenciado' },
  { area: 'hotelaria', texto: 'Como voce supervisiona e orienta a equipe de garcons durante o servico?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'tecnica', competencia: 'Supervisao' },
  { area: 'hotelaria', texto: 'Quais controles voce realiza para garantir a qualidade do servico e satisfacao do cliente?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle de Qualidade' },

  // Experiencia (6)
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia com gestao de equipe em restaurantes ou eventos.', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'experiencia', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'Descreva um evento ou banquete complexo que voce coordenou. Como foi a organizacao?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'experiencia', competencia: 'Eventos' },
  { area: 'hotelaria', texto: 'Como foi sua experiencia com treinamento de novos garcons e commis?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { area: 'hotelaria', texto: 'Descreva uma situacao em que voce teve que resolver um problema grave durante o servico.', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolucao de Problemas' },
  { area: 'hotelaria', texto: 'Conte sobre sua experiencia em restaurantes de alta gastronomia ou premiados.', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'experiencia', competencia: 'Alta Gastronomia' },
  { area: 'hotelaria', texto: 'Descreva como voce contribuiu para melhorar o atendimento ou processos de um restaurante.', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },

  // Comportamental (6)
  { area: 'hotelaria', texto: 'Como voce equilibra o atendimento personalizado com a eficiencia do servico em um restaurante cheio?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'comportamental', competencia: 'Eficiencia' },
  { area: 'hotelaria', texto: 'De que forma voce desenvolve e motiva a equipe para manter a excelencia no servico?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'comportamental', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'Como voce lida com feedbacks negativos de clientes sobre o servico?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'comportamental', competencia: 'Receptividade ao Feedback' },
  { area: 'hotelaria', texto: 'Descreva como voce mantem a calma e coordena a equipe em situacoes de crise.', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'comportamental', competencia: 'Trabalho sob Pressao' },
  { area: 'hotelaria', texto: 'Como voce se atualiza sobre tendencias gastronomicas, vinhos e servicos?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Continuo' },
  { area: 'hotelaria', texto: 'De que forma voce cria uma experiencia memoravel para clientes regulares?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'comportamental', competencia: 'Fidelizacao' },

  // Situacional (6)
  { area: 'hotelaria', texto: 'O restaurante esta lotado e a cozinha atrasou varios pedidos. Como voce gerencia a situacao?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestao de Crises' },
  { area: 'hotelaria', texto: 'Um cliente muito importante chega sem reserva e nao ha mesas disponiveis. O que faz?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'situacional', competencia: 'Atendimento Diferenciado' },
  { area: 'hotelaria', texto: 'Um membro da equipe comete um erro grave que afeta varios clientes. Como age?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'situacional', competencia: 'Lideranca' },
  { area: 'hotelaria', texto: 'Um cliente contesta a conta e afirma que foi cobrado errado. Como resolve?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolucao de Conflitos' },
  { area: 'hotelaria', texto: 'Voce percebe que a equipe esta desmotivada em um dia de muito movimento. O que faz?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'situacional', competencia: 'Motivacao de Equipe' },
  { area: 'hotelaria', texto: 'Um cliente passa mal no restaurante. Quais procedimentos voce adota?', cargo: 'Maitre / Garcom', nivel: 'pleno', categoria: 'situacional', competencia: 'Emergencias' },
];

// ============================================
// EXPORTACAO CONSOLIDADA COMPLETA
// ============================================

export const perguntasHotelariaParte2: PerguntaSeed[] = [
  ...agenteViagensJunior,
  ...agenteViagensPleno,
  ...agenteViagensSenior,
  ...maitreGarcomJunior,
  ...maitreGarcomPleno,
];

export const estatisticasHotelariaParte2 = {
  total: perguntasHotelariaParte2.length,
  porCargo: {
    'Agente de Viagens Junior': agenteViagensJunior.length,
    'Agente de Viagens Pleno': agenteViagensPleno.length,
    'Agente de Viagens Senior': agenteViagensSenior.length,
    'Maitre / Garcom Junior': maitreGarcomJunior.length,
    'Maitre / Garcom Pleno': maitreGarcomPleno.length,
  },
};

// Exportacao final completa
export const perguntasHotelaria: PerguntaSeed[] = [
  ...perguntasHotelariaParte1,
  ...perguntasHotelariaParte2,
];

export const estatisticasHotelaria = {
  total: perguntasHotelaria.length,
  porCargo: {
    ...estatisticasHotelariaParte1.porCargo,
    ...estatisticasHotelariaParte2.porCargo,
  },
};
