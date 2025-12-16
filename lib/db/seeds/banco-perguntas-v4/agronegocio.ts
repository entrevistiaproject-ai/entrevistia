/**
 * Banco de Perguntas v4 - Agronegócio
 *
 * Cargos incluídos:
 * - Engenheiro Agrônomo (Junior, Pleno, Senior) - 73 perguntas
 * - Técnico Agrícola (Junior, Pleno, Senior) - 73 perguntas
 * - Gerente Agrícola (Pleno, Senior) - 52 perguntas
 * - Veterinário (Junior, Pleno, Senior) - 73 perguntas
 * - Operador de Máquinas Agrícolas (Junior, Pleno, Senior) - 73 perguntas
 *
 * Total: 344 perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// ENGENHEIRO AGRÔNOMO
// ============================================

export const engenheiroAgronomoJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Quais são os principais fatores que você considera na análise de solo para recomendação de adubação?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'tecnica', competencia: 'Fertilidade do Solo' },
  { area: 'agronegocio', texto: 'Como você identifica e diferencia as principais pragas e doenças nas culturas de grãos?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'tecnica', competencia: 'Fitossanidade' },
  { area: 'agronegocio', texto: 'Quais critérios você utiliza para definir a época ideal de plantio de uma cultura?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'tecnica', competencia: 'Planejamento de Plantio' },
  { area: 'agronegocio', texto: 'Como você calcula a necessidade hídrica de uma cultura e dimensiona um sistema de irrigação básico?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'tecnica', competencia: 'Irrigação' },
  { area: 'agronegocio', texto: 'Quais são os principais indicadores que você monitora durante o desenvolvimento vegetativo?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'tecnica', competencia: 'Monitoramento de Culturas' },
  { area: 'agronegocio', texto: 'Como você interpreta os resultados de uma análise foliar e relaciona com deficiências nutricionais?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'tecnica', competencia: 'Nutrição de Plantas' },

  // Experiência (5)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com acompanhamento técnico de lavouras de grãos ou outras culturas.', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'experiencia', competencia: 'Assistência Técnica' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você identificou um problema fitossanitário e qual foi sua conduta.', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'experiencia', competencia: 'Diagnóstico de Problemas' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com elaboração de laudos técnicos ou relatórios de acompanhamento?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'experiencia', competencia: 'Documentação Técnica' },
  { area: 'agronegocio', texto: 'Descreva um projeto de implantação ou condução de cultura que você acompanhou.', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'experiencia', competencia: 'Implantação de Culturas' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com coleta de amostras de solo e interpretação de análises.', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'experiencia', competencia: 'Amostragem de Solo' },

  // Comportamental (5)
  { area: 'agronegocio', texto: 'Como você lida com produtores que resistem a adotar novas práticas ou tecnologias?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'comportamental', competencia: 'Persuasão Técnica' },
  { area: 'agronegocio', texto: 'De que forma você se comunica com a equipe de campo para garantir a correta execução das recomendações?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'agronegocio', texto: 'Como você organiza suas visitas técnicas e acompanhamentos de múltiplas propriedades?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'agronegocio', texto: 'Descreva como você busca atualização sobre novas tecnologias e práticas agrícolas.', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'agronegocio', texto: 'Como você reage quando uma recomendação sua não apresenta os resultados esperados?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado com Erros' },

  // Situacional (5)
  { area: 'agronegocio', texto: 'Você identifica sintomas de deficiência nutricional severa em estágio avançado da cultura. O que faz?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'situacional', competencia: 'Ação Corretiva' },
  { area: 'agronegocio', texto: 'O produtor questiona sua recomendação de controle de pragas por causa do custo. Como procede?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'situacional', competencia: 'Justificativa Técnica' },
  { area: 'agronegocio', texto: 'Uma praga não prevista está se alastrando rapidamente na lavoura. Quais são suas primeiras ações?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'situacional', competencia: 'Resposta a Emergências' },
  { area: 'agronegocio', texto: 'Condições climáticas adversas comprometem a janela de plantio. Como você orienta o produtor?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'situacional', competencia: 'Adaptação de Planejamento' },
  { area: 'agronegocio', texto: 'O operador de máquinas aplicou o defensivo em dosagem errada. O que você faz?', cargo: 'Engenheiro Agrônomo', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Erros Operacionais' },
];

export const engenheiroAgronomoPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Como você elabora um programa de manejo integrado de pragas (MIP) para uma propriedade?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'tecnica', competencia: 'MIP' },
  { area: 'agronegocio', texto: 'Quais critérios você utiliza para seleção de cultivares e híbridos para diferentes condições?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Seleção de Cultivares' },
  { area: 'agronegocio', texto: 'Como você estrutura um plano de rotação de culturas considerando aspectos técnicos e econômicos?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Rotação de Culturas' },
  { area: 'agronegocio', texto: 'Quais metodologias você aplica para diagnóstico e correção de solos degradados?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Recuperação de Solos' },
  { area: 'agronegocio', texto: 'Como você dimensiona e gerencia um programa de adubação para maximizar produtividade?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Programa de Adubação' },
  { area: 'agronegocio', texto: 'Quais ferramentas de agricultura de precisão você utiliza e como interpreta os dados?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'tecnica', competencia: 'Agricultura de Precisão' },

  // Experiência (6)
  { area: 'agronegocio', texto: 'Conte sobre um projeto de aumento de produtividade que você conduziu e os resultados obtidos.', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Projetos de Produtividade' },
  { area: 'agronegocio', texto: 'Descreva como você implementou práticas de agricultura de precisão em uma propriedade.', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implantação de Tecnologias' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com planejamento e acompanhamento de safra completa?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Planejamento de Safra' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou reverter uma cultura com problemas graves.', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Recuperação de Culturas' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com certificações agrícolas ou programas de qualidade.', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Certificações Agrícolas' },
  { area: 'agronegocio', texto: 'Descreva como você treinou e orientou equipes de campo em boas práticas agrícolas.', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'experiencia', competencia: 'Capacitação de Equipes' },

  // Comportamental (6)
  { area: 'agronegocio', texto: 'Como você equilibra recomendações técnicas ideais com a realidade financeira do produtor?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Visão Técnico-Econômica' },
  { area: 'agronegocio', texto: 'De que forma você desenvolve relacionamento de confiança com produtores de longo prazo?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento com Clientes' },
  { area: 'agronegocio', texto: 'Como você lida com a pressão por resultados em condições climáticas desfavoráveis?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'agronegocio', texto: 'Descreva como você promove sustentabilidade nas práticas agrícolas que recomenda.', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Sustentabilidade' },
  { area: 'agronegocio', texto: 'Como você gerencia múltiplas propriedades com necessidades e prioridades diferentes?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Prioridades' },
  { area: 'agronegocio', texto: 'De que forma você se mantém atualizado sobre inovações e tendências do agronegócio?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização Contínua' },

  // Situacional (6)
  { area: 'agronegocio', texto: 'A safra está comprometida por seca prolongada. Que estratégias você propõe ao produtor?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crises Climáticas' },
  { area: 'agronegocio', texto: 'O custo dos insumos subiu significativamente. Como você ajusta o planejamento?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'situacional', competencia: 'Otimização de Custos' },
  { area: 'agronegocio', texto: 'Dois produtores que você atende têm visões opostas sobre uma mesma tecnologia. Como age?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'situacional', competencia: 'Orientação Personalizada' },
  { area: 'agronegocio', texto: 'Surge uma nova praga na região que você nunca enfrentou. Como você se prepara e atua?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'situacional', competencia: 'Adaptação a Novas Ameaças' },
  { area: 'agronegocio', texto: 'O produtor quer antecipar a colheita por questões de mercado, mas a cultura não está no ponto. Como orienta?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'situacional', competencia: 'Orientação de Colheita' },
  { area: 'agronegocio', texto: 'A análise de solo indica necessidade de correção que o produtor não quer fazer. O que você faz?', cargo: 'Engenheiro Agrônomo', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação Técnica' },
];

export const engenheiroAgronomoSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'agronegocio', texto: 'Como você estrutura o planejamento estratégico agrícola de uma propriedade de grande porte?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Estratégico Agrícola' },
  { area: 'agronegocio', texto: 'Quais metodologias você aplica para análise de viabilidade de novos cultivos ou sistemas produtivos?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise de Viabilidade' },
  { area: 'agronegocio', texto: 'Como você integra sistemas de produção (lavoura, pecuária, floresta) para otimização de resultados?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'tecnica', competencia: 'Sistemas Integrados' },
  { area: 'agronegocio', texto: 'Quais estratégias você utiliza para gestão de riscos climáticos e de mercado em propriedades rurais?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Riscos Agrícolas' },
  { area: 'agronegocio', texto: 'Como você desenvolve programas de sustentabilidade e compliance ambiental para propriedades?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'tecnica', competencia: 'Compliance Ambiental' },
  { area: 'agronegocio', texto: 'Quais indicadores você utiliza para benchmarking e melhoria contínua de operações agrícolas?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'tecnica', competencia: 'Benchmarking Agrícola' },
  { area: 'agronegocio', texto: 'Como você avalia e implementa tecnologias de agricultura digital e automação?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'tecnica', competencia: 'Agricultura Digital' },

  // Experiência (7)
  { area: 'agronegocio', texto: 'Conte sobre o maior projeto de transformação agrícola que você liderou.', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de Transformação' },
  { area: 'agronegocio', texto: 'Descreva como você estruturou a área técnica de uma empresa do agronegócio.', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Áreas' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com abertura de novas áreas produtivas ou expansão de operações?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'experiencia', competencia: 'Expansão de Operações' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou reverter resultados negativos de uma operação agrícola.', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround Agrícola' },
  { area: 'agronegocio', texto: 'Conte sobre como você desenvolveu agrônomos e técnicos na sua equipe ao longo da carreira.', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'agronegocio', texto: 'Descreva sua experiência com negociação de contratos de fornecimento ou comercialização.', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'experiencia', competencia: 'Negociação Comercial' },
  { area: 'agronegocio', texto: 'Como foi sua participação na definição de estratégias de longo prazo para operações agrícolas?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'experiencia', competencia: 'Visão Estratégica' },

  // Comportamental (7)
  { area: 'agronegocio', texto: 'Como você desenvolve uma cultura de excelência técnica na organização?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Excelência' },
  { area: 'agronegocio', texto: 'De que forma você equilibra tradição agrícola com inovação e novas tecnologias?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Mudanças' },
  { area: 'agronegocio', texto: 'Como você constrói credibilidade com stakeholders de diferentes níveis (produtores, diretoria, investidores)?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Estratégica' },
  { area: 'agronegocio', texto: 'Descreva como você promove práticas regenerativas e sustentabilidade de longo prazo.', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'comportamental', competencia: 'Liderança Sustentável' },
  { area: 'agronegocio', texto: 'Como você lida com decisões que envolvem riscos significativos de safra ou investimento?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão sob Risco' },
  { area: 'agronegocio', texto: 'De que forma você acompanha tendências globais do agronegócio e antecipa oportunidades?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Mercado Global' },
  { area: 'agronegocio', texto: 'Como você gerencia a relação entre produtividade e preservação ambiental?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Produtivo-Ambiental' },

  // Situacional (7)
  { area: 'agronegocio', texto: 'A diretoria questiona investimentos em tecnologia agrícola que você propõe. Como apresenta o business case?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'situacional', competencia: 'Justificativa de Investimentos' },
  { area: 'agronegocio', texto: 'Uma mudança regulatória impacta significativamente as operações. Como você conduz a adaptação?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Mudanças Regulatórias' },
  { area: 'agronegocio', texto: 'Eventos climáticos extremos comprometem toda a safra. Quais são suas ações estratégicas?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Catástrofes' },
  { area: 'agronegocio', texto: 'Surge uma oportunidade de aquisição de nova área, mas com desafios técnicos. Como você avalia?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'situacional', competencia: 'Due Diligence Agrícola' },
  { area: 'agronegocio', texto: 'A empresa precisa reduzir custos operacionais em 15% sem comprometer produtividade. Qual seu plano?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização Operacional' },
  { area: 'agronegocio', texto: 'Um parceiro estratégico de insumos apresenta problemas de qualidade recorrentes. Como você conduz?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Fornecedores' },
  { area: 'agronegocio', texto: 'A volatilidade de preços das commodities exige revisão da estratégia. O que você propõe?', cargo: 'Engenheiro Agrônomo', nivel: 'senior', categoria: 'situacional', competencia: 'Estratégia de Comercialização' },
];

// ============================================
// TÉCNICO AGRÍCOLA
// ============================================

export const tecnicoAgricolaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Como você realiza a coleta correta de amostras de solo para análise?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'tecnica', competencia: 'Amostragem de Solo' },
  { area: 'agronegocio', texto: 'Quais são os principais cuidados na aplicação de defensivos agrícolas?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'tecnica', competencia: 'Aplicação de Defensivos' },
  { area: 'agronegocio', texto: 'Como você identifica as principais pragas e doenças nas culturas que você acompanha?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'tecnica', competencia: 'Identificação de Pragas' },
  { area: 'agronegocio', texto: 'Quais são os procedimentos básicos de regulagem de plantadeiras e semeadoras?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'tecnica', competencia: 'Regulagem de Equipamentos' },
  { area: 'agronegocio', texto: 'Como você monitora e registra as condições da lavoura durante o ciclo da cultura?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'tecnica', competencia: 'Monitoramento de Lavoura' },
  { area: 'agronegocio', texto: 'Quais EPIs são obrigatórios para trabalho com produtos químicos agrícolas?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança no Trabalho' },

  // Experiência (5)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com acompanhamento de lavouras de grãos ou outras culturas.', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'experiencia', competencia: 'Acompanhamento de Culturas' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você identificou um problema na lavoura e comunicou ao agrônomo.', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'experiencia', competencia: 'Detecção de Problemas' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com operação ou acompanhamento de máquinas agrícolas?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'experiencia', competencia: 'Máquinas Agrícolas' },
  { area: 'agronegocio', texto: 'Descreva sua participação em atividades de plantio, tratos culturais ou colheita.', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'experiencia', competencia: 'Operações de Campo' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com preenchimento de fichas de campo e relatórios técnicos.', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'experiencia', competencia: 'Documentação de Campo' },

  // Comportamental (5)
  { area: 'agronegocio', texto: 'Como você lida com condições adversas de trabalho no campo (calor, chuva, longas jornadas)?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'agronegocio', texto: 'De que forma você se comunica com operadores e trabalhadores rurais?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'agronegocio', texto: 'Como você organiza suas atividades diárias no campo para cumprir as tarefas planejadas?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'agronegocio', texto: 'Descreva como você busca aprender sobre novas técnicas e tecnologias agrícolas.', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'agronegocio', texto: 'Como você reage quando recebe uma orientação que você não concorda?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade' },

  // Situacional (5)
  { area: 'agronegocio', texto: 'Você percebe que o operador está aplicando defensivo sem EPI adequado. O que faz?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'situacional', competencia: 'Segurança' },
  { area: 'agronegocio', texto: 'A máquina apresenta problemas durante a operação e o agrônomo não está disponível. Como procede?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'situacional', competencia: 'Autonomia' },
  { area: 'agronegocio', texto: 'Você identifica sintomas estranhos na lavoura mas não consegue identificar a causa. O que faz?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'situacional', competencia: 'Busca de Orientação' },
  { area: 'agronegocio', texto: 'O tempo muda e ameaça chover durante a aplicação de defensivos. Como você age?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'situacional', competencia: 'Tomada de Decisão' },
  { area: 'agronegocio', texto: 'O produto recebido é diferente do que foi solicitado. Como você procede?', cargo: 'Técnico Agrícola', nivel: 'junior', categoria: 'situacional', competencia: 'Conferência de Materiais' },
];

export const tecnicoAgricolaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Como você elabora o cronograma de aplicações de defensivos considerando período de carência?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento de Aplicações' },
  { area: 'agronegocio', texto: 'Quais técnicas você utiliza para monitoramento de pragas e determinação de nível de controle?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Monitoramento de Pragas' },
  { area: 'agronegocio', texto: 'Como você coordena as operações de plantio para garantir a janela ideal?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Coordenação de Plantio' },
  { area: 'agronegocio', texto: 'Quais indicadores você utiliza para avaliar a qualidade das operações de campo?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle de Qualidade' },
  { area: 'agronegocio', texto: 'Como você gerencia o estoque de insumos e controla as requisições?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Insumos' },
  { area: 'agronegocio', texto: 'Quais procedimentos você adota para garantir a rastreabilidade das operações agrícolas?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Rastreabilidade' },

  // Experiência (6)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com supervisão de equipes de campo em operações agrícolas.', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Supervisão de Equipes' },
  { area: 'agronegocio', texto: 'Descreva como você implementou melhorias em processos operacionais no campo.', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com coordenação de colheita em diferentes culturas?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Coordenação de Colheita' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou treinar operadores em novos equipamentos.', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Operadores' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com gestão de certificações ou programas de qualidade no campo.', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Certificações' },
  { area: 'agronegocio', texto: 'Descreva como você lidou com uma safra problemática e quais ações tomou.', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Crises' },

  // Comportamental (6)
  { area: 'agronegocio', texto: 'Como você motiva a equipe de campo durante períodos de trabalho intenso?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação de Equipe' },
  { area: 'agronegocio', texto: 'De que forma você equilibra urgências operacionais com planejamento das atividades?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Prioridades' },
  { area: 'agronegocio', texto: 'Como você lida com conflitos entre membros da equipe de campo?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'agronegocio', texto: 'Descreva como você promove segurança no trabalho entre os operadores.', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura de Segurança' },
  { area: 'agronegocio', texto: 'Como você se mantém atualizado sobre novas tecnologias e práticas agrícolas?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'agronegocio', texto: 'De que forma você comunica problemas técnicos para o agrônomo ou gerente?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Técnica' },

  // Situacional (6)
  { area: 'agronegocio', texto: 'A colheita precisa ser acelerada por previsão de chuvas. Como você reorganiza a operação?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Replanejamento Operacional' },
  { area: 'agronegocio', texto: 'Um operador experiente questiona sua orientação técnica. Como você age?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Liderança Técnica' },
  { area: 'agronegocio', texto: 'O insumo programado não chegou e a janela de aplicação está se fechando. O que faz?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Contingências' },
  { area: 'agronegocio', texto: 'Você identifica que um procedimento padrão está causando desperdício. Como propõe a mudança?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Proposição de Melhorias' },
  { area: 'agronegocio', texto: 'Dois talhões precisam de atenção simultânea mas você só tem uma equipe. Como prioriza?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Priorização' },
  { area: 'agronegocio', texto: 'Um acidente de trabalho leve ocorre no campo. Quais são suas primeiras ações?', cargo: 'Técnico Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Resposta a Acidentes' },
];

export const tecnicoAgricolaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'agronegocio', texto: 'Como você estrutura o planejamento operacional de uma safra completa?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento de Safra' },
  { area: 'agronegocio', texto: 'Quais metodologias você aplica para otimização de custos operacionais no campo?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Otimização de Custos' },
  { area: 'agronegocio', texto: 'Como você gerencia a manutenção preventiva e corretiva do maquinário agrícola?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Maquinário' },
  { area: 'agronegocio', texto: 'Quais indicadores você utiliza para avaliação de desempenho das operações agrícolas?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'KPIs Operacionais' },
  { area: 'agronegocio', texto: 'Como você implementa e gerencia programas de agricultura de precisão no campo?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Agricultura de Precisão' },
  { area: 'agronegocio', texto: 'Quais estratégias você utiliza para gestão de múltiplas frentes de trabalho simultâneas?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Operações' },
  { area: 'agronegocio', texto: 'Como você estrutura programas de capacitação contínua para equipes de campo?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Desenvolvimento de Equipes' },

  // Experiência (7)
  { area: 'agronegocio', texto: 'Conte sobre a maior operação agrícola que você coordenou em termos de área e equipe.', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Coordenação de Grandes Operações' },
  { area: 'agronegocio', texto: 'Descreva como você implementou melhorias que resultaram em aumento de produtividade.', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de Produtividade' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com implementação de novas tecnologias ou sistemas no campo?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Tecnologias' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou reverter uma operação com problemas graves.', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crises' },
  { area: 'agronegocio', texto: 'Conte sobre como você desenvolveu líderes e técnicos na sua equipe.', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Líderes' },
  { area: 'agronegocio', texto: 'Descreva sua experiência com auditorias de certificação ou compliance no campo.', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Auditorias e Compliance' },
  { area: 'agronegocio', texto: 'Como foi sua participação na definição de processos e procedimentos operacionais?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Padronização de Processos' },

  // Comportamental (7)
  { area: 'agronegocio', texto: 'Como você desenvolve uma cultura de excelência operacional na equipe de campo?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Excelência' },
  { area: 'agronegocio', texto: 'De que forma você equilibra tradição com inovação na gestão das operações?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Mudanças' },
  { area: 'agronegocio', texto: 'Como você constrói credibilidade com agrônomos, gerentes e proprietários?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Credibilidade Profissional' },
  { area: 'agronegocio', texto: 'Descreva como você promove sustentabilidade nas operações de campo.', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Sustentabilidade Operacional' },
  { area: 'agronegocio', texto: 'Como você lida com pressão por resultados em condições adversas?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliência sob Pressão' },
  { area: 'agronegocio', texto: 'De que forma você se mantém relevante com as constantes mudanças tecnológicas?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'agronegocio', texto: 'Como você gerencia o bem-estar e a satisfação da equipe de campo?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Pessoas' },

  // Situacional (7)
  { area: 'agronegocio', texto: 'A gerência exige redução de custos que você considera arriscada para a operação. Como negocia?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação Interna' },
  { area: 'agronegocio', texto: 'Um evento climático severo interrompe todas as operações. Como você gerencia a crise?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crises Climáticas' },
  { area: 'agronegocio', texto: 'A empresa adquire nova tecnologia que a equipe resiste em utilizar. O que você faz?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Resistência' },
  { area: 'agronegocio', texto: 'Você identifica que um fornecedor histórico não atende mais os padrões necessários. Como age?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Fornecedores' },
  { area: 'agronegocio', texto: 'A safra exige aumento de capacidade que ultrapassa os recursos disponíveis. O que propõe?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento de Capacidade' },
  { area: 'agronegocio', texto: 'Um técnico da equipe comete erro grave que impacta a produção. Como você conduz?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Falhas' },
  { area: 'agronegocio', texto: 'Mudanças regulatórias exigem adaptações imediatas nos processos de campo. Como você implementa?', cargo: 'Técnico Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptação Regulatória' },
];

// ============================================
// GERENTE AGRÍCOLA
// ============================================

export const gerenteAgricolaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Como você elabora o orçamento anual de uma propriedade agrícola?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Orçamento Agrícola' },
  { area: 'agronegocio', texto: 'Quais indicadores você utiliza para monitorar a performance da propriedade?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores de Performance' },
  { area: 'agronegocio', texto: 'Como você estrutura o planejamento de safra considerando aspectos técnicos e financeiros?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento de Safra' },
  { area: 'agronegocio', texto: 'Quais critérios você utiliza para decisões de compra de insumos e negociação com fornecedores?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Compras' },
  { area: 'agronegocio', texto: 'Como você gerencia o fluxo de caixa de uma propriedade agrícola?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão Financeira' },
  { area: 'agronegocio', texto: 'Quais estratégias você utiliza para comercialização da produção?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'tecnica', competencia: 'Comercialização' },

  // Experiência (6)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com gestão de propriedades agrícolas.', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Propriedades' },
  { area: 'agronegocio', texto: 'Descreva como você implementou controles e processos para melhorar resultados.', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de Controles' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com gestão de equipes agrícolas?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Equipes' },
  { area: 'agronegocio', texto: 'Descreva uma safra em que você conseguiu resultados acima do esperado e como alcançou.', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Superação de Metas' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com negociação de contratos de venda de produção.', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Negociação Comercial' },
  { area: 'agronegocio', texto: 'Descreva como você lidou com uma crise que impactou os resultados da propriedade.', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Crises' },

  // Comportamental (6)
  { area: 'agronegocio', texto: 'Como você equilibra as demandas técnicas, operacionais e financeiras da propriedade?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Visão Integrada' },
  { area: 'agronegocio', texto: 'De que forma você desenvolve e retém talentos na equipe agrícola?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Pessoas' },
  { area: 'agronegocio', texto: 'Como você lida com a pressão do proprietário por resultados em anos difíceis?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Expectativas' },
  { area: 'agronegocio', texto: 'Descreva como você promove inovação mantendo a segurança operacional.', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Inovação Responsável' },
  { area: 'agronegocio', texto: 'Como você se mantém atualizado sobre tendências de mercado e tecnologias?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'agronegocio', texto: 'De que forma você constrói relacionamento com fornecedores e parceiros estratégicos?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento Comercial' },

  // Situacional (6)
  { area: 'agronegocio', texto: 'O custo dos insumos subiu 30% e compromete a margem planejada. O que você faz?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Custos' },
  { area: 'agronegocio', texto: 'O agrônomo e o técnico sênior discordam sobre uma decisão técnica importante. Como media?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Mediação de Conflitos' },
  { area: 'agronegocio', texto: 'Uma oportunidade de venda antecipada da produção surge com preço atrativo. Como avalia?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Decisão de Comercialização' },
  { area: 'agronegocio', texto: 'A safra está comprometida e o proprietário pressiona por soluções. O que propõe?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crises' },
  { area: 'agronegocio', texto: 'Você identifica oportunidade de investimento que exige recurso não previsto. Como apresenta?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Proposição de Investimentos' },
  { area: 'agronegocio', texto: 'Um funcionário-chave pede demissão no meio da safra. Como você age?', cargo: 'Gerente Agrícola', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Contingências' },
];

export const gerenteAgricolaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'agronegocio', texto: 'Como você estrutura o planejamento estratégico de longo prazo para uma propriedade agrícola?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Estratégico' },
  { area: 'agronegocio', texto: 'Quais metodologias você aplica para análise de viabilidade de expansão ou diversificação?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise de Viabilidade' },
  { area: 'agronegocio', texto: 'Como você gerencia múltiplas unidades produtivas com culturas e realidades diferentes?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Múltiplas Unidades' },
  { area: 'agronegocio', texto: 'Quais estratégias você utiliza para hedge e proteção de preços de commodities?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Riscos de Mercado' },
  { area: 'agronegocio', texto: 'Como você estrutura a governança e os processos de tomada de decisão da operação agrícola?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Governança' },
  { area: 'agronegocio', texto: 'Quais indicadores e sistemas você utiliza para gestão integrada da propriedade?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Integrada' },
  { area: 'agronegocio', texto: 'Como você avalia e implementa projetos de transformação digital no agronegócio?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'tecnica', competencia: 'Transformação Digital' },

  // Experiência (7)
  { area: 'agronegocio', texto: 'Conte sobre a maior operação agrícola que você geriu em termos de área, faturamento ou complexidade.', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Grandes Operações' },
  { area: 'agronegocio', texto: 'Descreva como você estruturou a gestão de uma propriedade ou grupo de propriedades.', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Gestão' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com expansão de operações ou abertura de novas áreas?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Expansão de Operações' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou reverter resultados negativos de uma operação.', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Turnaround' },
  { area: 'agronegocio', texto: 'Conte sobre como você desenvolveu sucessores e formou líderes na sua equipe.', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Líderes' },
  { area: 'agronegocio', texto: 'Descreva sua experiência com relacionamento com investidores ou conselhos.', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Relacionamento com Stakeholders' },
  { area: 'agronegocio', texto: 'Como foi sua participação na definição de estratégias de negócio no agronegócio?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'experiencia', competencia: 'Estratégia de Negócio' },

  // Comportamental (7)
  { area: 'agronegocio', texto: 'Como você desenvolve uma cultura de alta performance na operação agrícola?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Performance' },
  { area: 'agronegocio', texto: 'De que forma você equilibra visão de curto prazo com sustentabilidade de longo prazo?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },
  { area: 'agronegocio', texto: 'Como você constrói credibilidade com proprietários, investidores e parceiros estratégicos?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Credibilidade Executiva' },
  { area: 'agronegocio', texto: 'Descreva como você promove inovação e modernização respeitando a cultura da propriedade.', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Mudanças' },
  { area: 'agronegocio', texto: 'Como você lida com decisões que envolvem riscos significativos para a operação?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão sob Risco' },
  { area: 'agronegocio', texto: 'De que forma você acompanha tendências globais e antecipa impactos no negócio?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Mercado' },
  { area: 'agronegocio', texto: 'Como você gerencia a interface entre aspectos técnicos, operacionais e de negócio?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Holística' },

  // Situacional (7)
  { area: 'agronegocio', texto: 'O proprietário questiona a estratégia que você propôs para os próximos anos. Como defende?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Defesa de Estratégia' },
  { area: 'agronegocio', texto: 'Eventos climáticos severos comprometem toda a safra e a situação financeira. Quais suas ações?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crises Severas' },
  { area: 'agronegocio', texto: 'Surge oportunidade de aquisição de propriedade vizinha estratégica. Como você avalia?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Avaliação de Aquisições' },
  { area: 'agronegocio', texto: 'Mudanças regulatórias impactam significativamente o modelo de negócio. Como você conduz?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Adaptação Regulatória' },
  { area: 'agronegocio', texto: 'A operação precisa reduzir custos em 20% para manter viabilidade. Qual seu plano?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação de Custos' },
  { area: 'agronegocio', texto: 'Um parceiro comercial estratégico propõe mudança contratual desfavorável. Como negocia?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação Estratégica' },
  { area: 'agronegocio', texto: 'A família proprietária discorda sobre o futuro da propriedade. Como você navega a situação?', cargo: 'Gerente Agrícola', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Stakeholders Familiares' },
];

// ============================================
// VETERINÁRIO
// ============================================

export const veterinarioJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Quais são os principais sinais clínicos que você avalia em um exame físico de bovinos?', cargo: 'Veterinário', nivel: 'junior', categoria: 'tecnica', competencia: 'Exame Clínico' },
  { area: 'agronegocio', texto: 'Como você elabora um protocolo básico de vacinação para rebanho bovino de corte?', cargo: 'Veterinário', nivel: 'junior', categoria: 'tecnica', competencia: 'Vacinação' },
  { area: 'agronegocio', texto: 'Quais são os principais parasitas internos e externos em bovinos e como você os identifica?', cargo: 'Veterinário', nivel: 'junior', categoria: 'tecnica', competencia: 'Parasitologia' },
  { area: 'agronegocio', texto: 'Como você realiza o diagnóstico e tratamento de mastite em vacas leiteiras?', cargo: 'Veterinário', nivel: 'junior', categoria: 'tecnica', competencia: 'Saúde do Úbere' },
  { area: 'agronegocio', texto: 'Quais são os procedimentos básicos de manejo sanitário em um rebanho?', cargo: 'Veterinário', nivel: 'junior', categoria: 'tecnica', competencia: 'Manejo Sanitário' },
  { area: 'agronegocio', texto: 'Como você avalia a condição corporal dos animais e relaciona com manejo nutricional?', cargo: 'Veterinário', nivel: 'junior', categoria: 'tecnica', competencia: 'Avaliação Nutricional' },

  // Experiência (5)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com atendimento clínico de grandes animais no campo.', cargo: 'Veterinário', nivel: 'junior', categoria: 'experiencia', competencia: 'Clínica de Campo' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você diagnosticou e tratou uma doença infecciosa no rebanho.', cargo: 'Veterinário', nivel: 'junior', categoria: 'experiencia', competencia: 'Diagnóstico de Doenças' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com campanhas de vacinação em propriedades rurais?', cargo: 'Veterinário', nivel: 'junior', categoria: 'experiencia', competencia: 'Campanhas Sanitárias' },
  { area: 'agronegocio', texto: 'Descreva sua participação em procedimentos de manejo reprodutivo de rebanhos.', cargo: 'Veterinário', nivel: 'junior', categoria: 'experiencia', competencia: 'Manejo Reprodutivo' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com coleta de amostras e envio para laboratório.', cargo: 'Veterinário', nivel: 'junior', categoria: 'experiencia', competencia: 'Diagnóstico Laboratorial' },

  // Comportamental (5)
  { area: 'agronegocio', texto: 'Como você lida com produtores que resistem a seguir suas recomendações de tratamento?', cargo: 'Veterinário', nivel: 'junior', categoria: 'comportamental', competencia: 'Persuasão' },
  { area: 'agronegocio', texto: 'De que forma você se comunica com a equipe de manejo sobre cuidados com os animais?', cargo: 'Veterinário', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'agronegocio', texto: 'Como você organiza suas visitas e atendimentos em múltiplas propriedades?', cargo: 'Veterinário', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'agronegocio', texto: 'Descreva como você busca atualização sobre novas técnicas e tratamentos veterinários.', cargo: 'Veterinário', nivel: 'junior', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'agronegocio', texto: 'Como você reage quando um tratamento não apresenta os resultados esperados?', cargo: 'Veterinário', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },

  // Situacional (5)
  { area: 'agronegocio', texto: 'Você é chamado para atender um animal com sintomas de doença de notificação obrigatória. O que faz?', cargo: 'Veterinário', nivel: 'junior', categoria: 'situacional', competencia: 'Vigilância Sanitária' },
  { area: 'agronegocio', texto: 'O produtor quer medicar o animal por conta própria antes de sua avaliação. Como orienta?', cargo: 'Veterinário', nivel: 'junior', categoria: 'situacional', competencia: 'Orientação ao Produtor' },
  { area: 'agronegocio', texto: 'Uma emergência veterinária ocorre à noite e longe de recursos. Como você age?', cargo: 'Veterinário', nivel: 'junior', categoria: 'situacional', competencia: 'Atendimento Emergencial' },
  { area: 'agronegocio', texto: 'O custo do tratamento recomendado é alto e o produtor questiona. Como procede?', cargo: 'Veterinário', nivel: 'junior', categoria: 'situacional', competencia: 'Justificativa de Tratamento' },
  { area: 'agronegocio', texto: 'Vários animais adoecem simultaneamente com sintomas semelhantes. Quais são suas primeiras ações?', cargo: 'Veterinário', nivel: 'junior', categoria: 'situacional', competencia: 'Surto de Doença' },
];

export const veterinarioPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Como você estrutura um programa de saúde de rebanho para propriedade de pecuária de corte?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Programa de Saúde' },
  { area: 'agronegocio', texto: 'Quais indicadores você utiliza para monitorar a eficiência reprodutiva de um rebanho?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores Reprodutivos' },
  { area: 'agronegocio', texto: 'Como você elabora protocolos de IATF (Inseminação Artificial em Tempo Fixo)?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Biotecnologias Reprodutivas' },
  { area: 'agronegocio', texto: 'Quais estratégias você utiliza para controle integrado de parasitas?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Controle Parasitário' },
  { area: 'agronegocio', texto: 'Como você avalia e melhora os índices zootécnicos de uma propriedade?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Índices Zootécnicos' },
  { area: 'agronegocio', texto: 'Quais critérios você utiliza para seleção e descarte de animais no rebanho?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'tecnica', competencia: 'Seleção de Animais' },

  // Experiência (6)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com implementação de programas de inseminação artificial.', cargo: 'Veterinário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Inseminação Artificial' },
  { area: 'agronegocio', texto: 'Descreva como você melhorou os índices sanitários de um rebanho que acompanhou.', cargo: 'Veterinário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria Sanitária' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com diagnóstico e controle de doenças reprodutivas?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Saúde Reprodutiva' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou investigar mortalidade elevada no rebanho.', cargo: 'Veterinário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Investigação de Mortalidade' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com treinamento de funcionários em boas práticas de manejo.', cargo: 'Veterinário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Capacitação de Equipes' },
  { area: 'agronegocio', texto: 'Descreva como você lidou com um surto de doença infecciosa em propriedade que atendia.', cargo: 'Veterinário', nivel: 'pleno', categoria: 'experiencia', competencia: 'Gestão de Surtos' },

  // Comportamental (6)
  { area: 'agronegocio', texto: 'Como você equilibra recomendações técnicas ideais com a realidade financeira do produtor?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Visão Técnico-Econômica' },
  { area: 'agronegocio', texto: 'De que forma você constrói relacionamento de confiança com produtores de longo prazo?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Relacionamento com Clientes' },
  { area: 'agronegocio', texto: 'Como você lida com a pressão por resultados quando fatores externos impactam a produção?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Expectativas' },
  { area: 'agronegocio', texto: 'Descreva como você promove bem-estar animal nas práticas que recomenda.', cargo: 'Veterinário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Bem-Estar Animal' },
  { area: 'agronegocio', texto: 'Como você gerencia múltiplas propriedades com necessidades e prioridades diferentes?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Prioridades' },
  { area: 'agronegocio', texto: 'De que forma você se mantém atualizado sobre inovações em medicina veterinária?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'comportamental', competencia: 'Educação Continuada' },

  // Situacional (6)
  { area: 'agronegocio', texto: 'Um surto de doença se espalha rapidamente no rebanho. Quais são suas ações imediatas?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'situacional', competencia: 'Controle de Surtos' },
  { area: 'agronegocio', texto: 'O produtor questiona a necessidade de vacinas que você recomenda. Como justifica?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'situacional', competencia: 'Educação Sanitária' },
  { area: 'agronegocio', texto: 'A taxa de prenhez está muito abaixo do esperado após a estação de monta. O que investiga?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'situacional', competencia: 'Diagnóstico Reprodutivo' },
  { area: 'agronegocio', texto: 'Dois produtores que você atende têm visões opostas sobre manejo sanitário. Como orienta cada um?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'situacional', competencia: 'Orientação Personalizada' },
  { area: 'agronegocio', texto: 'O medicamento necessário não está disponível na região. Como você resolve?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'situacional', competencia: 'Solução de Problemas' },
  { area: 'agronegocio', texto: 'O produtor quer abater animal em tratamento antes do período de carência. Como procede?', cargo: 'Veterinário', nivel: 'pleno', categoria: 'situacional', competencia: 'Segurança Alimentar' },
];

export const veterinarioSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'agronegocio', texto: 'Como você estrutura o planejamento sanitário estratégico de uma grande operação pecuária?', cargo: 'Veterinário', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Sanitário Estratégico' },
  { area: 'agronegocio', texto: 'Quais metodologias você aplica para análise de viabilidade de programas de melhoramento genético?', cargo: 'Veterinário', nivel: 'senior', categoria: 'tecnica', competencia: 'Melhoramento Genético' },
  { area: 'agronegocio', texto: 'Como você implementa e gerencia programas de certificação sanitária para exportação?', cargo: 'Veterinário', nivel: 'senior', categoria: 'tecnica', competencia: 'Certificação para Exportação' },
  { area: 'agronegocio', texto: 'Quais estratégias você utiliza para gestão integrada de saúde em sistemas intensivos de produção?', cargo: 'Veterinário', nivel: 'senior', categoria: 'tecnica', competencia: 'Produção Intensiva' },
  { area: 'agronegocio', texto: 'Como você desenvolve programas de biossegurança para propriedades de alto status sanitário?', cargo: 'Veterinário', nivel: 'senior', categoria: 'tecnica', competencia: 'Biossegurança' },
  { area: 'agronegocio', texto: 'Quais indicadores você utiliza para benchmarking e melhoria contínua da produção pecuária?', cargo: 'Veterinário', nivel: 'senior', categoria: 'tecnica', competencia: 'Benchmarking Pecuário' },
  { area: 'agronegocio', texto: 'Como você avalia e implementa tecnologias de pecuária de precisão e monitoramento remoto?', cargo: 'Veterinário', nivel: 'senior', categoria: 'tecnica', competencia: 'Pecuária de Precisão' },

  // Experiência (7)
  { area: 'agronegocio', texto: 'Conte sobre o maior programa sanitário que você estruturou em termos de escala e impacto.', cargo: 'Veterinário', nivel: 'senior', categoria: 'experiencia', competencia: 'Programas de Grande Escala' },
  { area: 'agronegocio', texto: 'Descreva como você estruturou a área de sanidade animal de uma empresa do agronegócio.', cargo: 'Veterinário', nivel: 'senior', categoria: 'experiencia', competencia: 'Estruturação de Áreas' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com habilitação de propriedades para mercados de exportação?', cargo: 'Veterinário', nivel: 'senior', categoria: 'experiencia', competencia: 'Mercado de Exportação' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou erradicar uma doença de um rebanho de grande valor.', cargo: 'Veterinário', nivel: 'senior', categoria: 'experiencia', competencia: 'Erradicação de Doenças' },
  { area: 'agronegocio', texto: 'Conte sobre como você desenvolveu veterinários e técnicos na sua equipe ao longo da carreira.', cargo: 'Veterinário', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Equipe' },
  { area: 'agronegocio', texto: 'Descreva sua experiência com negociação de protocolos sanitários com órgãos reguladores.', cargo: 'Veterinário', nivel: 'senior', categoria: 'experiencia', competencia: 'Relacionamento Regulatório' },
  { area: 'agronegocio', texto: 'Como foi sua participação na definição de estratégias de saúde animal para grupos empresariais?', cargo: 'Veterinário', nivel: 'senior', categoria: 'experiencia', competencia: 'Estratégia Corporativa' },

  // Comportamental (7)
  { area: 'agronegocio', texto: 'Como você desenvolve uma cultura de excelência em saúde animal na organização?', cargo: 'Veterinário', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Excelência' },
  { area: 'agronegocio', texto: 'De que forma você equilibra produtividade com bem-estar animal e sustentabilidade?', cargo: 'Veterinário', nivel: 'senior', categoria: 'comportamental', competencia: 'Equilíbrio Produtivo-Ético' },
  { area: 'agronegocio', texto: 'Como você constrói credibilidade com stakeholders (produtores, diretoria, órgãos reguladores)?', cargo: 'Veterinário', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Estratégica' },
  { area: 'agronegocio', texto: 'Descreva como você promove práticas de produção responsável e rastreabilidade.', cargo: 'Veterinário', nivel: 'senior', categoria: 'comportamental', competencia: 'Produção Responsável' },
  { area: 'agronegocio', texto: 'Como você lida com decisões que envolvem riscos sanitários significativos para a operação?', cargo: 'Veterinário', nivel: 'senior', categoria: 'comportamental', competencia: 'Tomada de Decisão sob Risco' },
  { area: 'agronegocio', texto: 'De que forma você acompanha tendências globais de saúde animal e antecipa impactos?', cargo: 'Veterinário', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão Global de Saúde' },
  { area: 'agronegocio', texto: 'Como você gerencia a interface entre saúde animal, segurança alimentar e saúde pública?', cargo: 'Veterinário', nivel: 'senior', categoria: 'comportamental', competencia: 'One Health' },

  // Situacional (7)
  { area: 'agronegocio', texto: 'A diretoria questiona investimentos em biossegurança que você propõe. Como apresenta o business case?', cargo: 'Veterinário', nivel: 'senior', categoria: 'situacional', competencia: 'Justificativa de Investimentos' },
  { area: 'agronegocio', texto: 'Uma mudança regulatória impacta significativamente os protocolos sanitários. Como você conduz a adaptação?', cargo: 'Veterinário', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Mudanças Regulatórias' },
  { area: 'agronegocio', texto: 'Surge suspeita de doença exótica no rebanho. Quais são suas ações estratégicas?', cargo: 'Veterinário', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crises Sanitárias' },
  { area: 'agronegocio', texto: 'A empresa quer expandir para mercados com exigências sanitárias mais rigorosas. Como planeja?', cargo: 'Veterinário', nivel: 'senior', categoria: 'situacional', competencia: 'Adequação a Novos Mercados' },
  { area: 'agronegocio', texto: 'A operação precisa reduzir custos com saúde animal sem comprometer status sanitário. Qual seu plano?', cargo: 'Veterinário', nivel: 'senior', categoria: 'situacional', competencia: 'Otimização de Custos Sanitários' },
  { area: 'agronegocio', texto: 'Um fornecedor de insumos veterinários apresenta problemas de qualidade recorrentes. Como conduz?', cargo: 'Veterinário', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Fornecedores' },
  { area: 'agronegocio', texto: 'A resistência antimicrobiana exige revisão dos protocolos de tratamento. O que você propõe?', cargo: 'Veterinário', nivel: 'senior', categoria: 'situacional', competencia: 'Uso Racional de Antimicrobianos' },
];

// ============================================
// OPERADOR DE MÁQUINAS AGRÍCOLAS
// ============================================

export const operadorMaquinasJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Quais são os procedimentos básicos de verificação diária antes de operar um trator?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'tecnica', competencia: 'Check-list Operacional' },
  { area: 'agronegocio', texto: 'Como você realiza a regulagem básica de uma plantadeira para diferentes espaçamentos?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'tecnica', competencia: 'Regulagem de Equipamentos' },
  { area: 'agronegocio', texto: 'Quais são os principais cuidados de segurança na operação de máquinas agrícolas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'tecnica', competencia: 'Segurança Operacional' },
  { area: 'agronegocio', texto: 'Como você interpreta os indicadores do painel de uma colheitadeira?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'tecnica', competencia: 'Instrumentação' },
  { area: 'agronegocio', texto: 'Quais são os procedimentos para abastecimento e lubrificação de máquinas agrícolas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'tecnica', competencia: 'Manutenção Básica' },
  { area: 'agronegocio', texto: 'Como você opera um pulverizador mantendo a correta taxa de aplicação?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'tecnica', competencia: 'Pulverização' },

  // Experiência (5)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com operação de tratores em diferentes atividades agrícolas.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'experiencia', competencia: 'Operação de Tratores' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você identificou um problema mecânico durante a operação.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'experiencia', competencia: 'Identificação de Problemas' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com operação de implementos agrícolas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'experiencia', competencia: 'Implementos Agrícolas' },
  { area: 'agronegocio', texto: 'Descreva sua participação em operações de plantio ou colheita mecanizada.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'experiencia', competencia: 'Operações de Campo' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com preenchimento de fichas de operação e controles.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'experiencia', competencia: 'Registros Operacionais' },

  // Comportamental (5)
  { area: 'agronegocio', texto: 'Como você lida com longas jornadas de trabalho durante períodos de safra?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'comportamental', competencia: 'Resistência' },
  { area: 'agronegocio', texto: 'De que forma você se comunica com o técnico ou agrônomo sobre problemas na operação?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },
  { area: 'agronegocio', texto: 'Como você organiza suas atividades para cumprir as metas de operação diárias?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'comportamental', competencia: 'Organização' },
  { area: 'agronegocio', texto: 'Descreva como você busca aprender sobre novos equipamentos e tecnologias.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado' },
  { area: 'agronegocio', texto: 'Como você reage quando recebe uma orientação de regulagem que você não concorda?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'comportamental', competencia: 'Receptividade' },

  // Situacional (5)
  { area: 'agronegocio', texto: 'A máquina apresenta um ruído estranho durante a operação. O que você faz?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'situacional', competencia: 'Resposta a Problemas' },
  { area: 'agronegocio', texto: 'O tempo muda e ameaça chover durante a colheita. Como você procede?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'situacional', competencia: 'Tomada de Decisão' },
  { area: 'agronegocio', texto: 'Você percebe que a plantadeira está falhando sementes. O que faz?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'situacional', competencia: 'Identificação de Falhas' },
  { area: 'agronegocio', texto: 'O terreno está mais difícil que o esperado e a máquina está forçando. Como age?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'situacional', competencia: 'Adaptação Operacional' },
  { area: 'agronegocio', texto: 'Outro operador pede para você emprestar equipamento de proteção. Como procede?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'junior', categoria: 'situacional', competencia: 'Segurança' },
];

export const operadorMaquinasPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'agronegocio', texto: 'Como você realiza a regulagem de colheitadeiras para diferentes culturas e condições?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Regulagem de Colheitadeiras' },
  { area: 'agronegocio', texto: 'Quais técnicas você utiliza para otimizar o consumo de combustível das máquinas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Eficiência Operacional' },
  { area: 'agronegocio', texto: 'Como você interpreta e utiliza sistemas de GPS e piloto automático em máquinas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Agricultura de Precisão' },
  { area: 'agronegocio', texto: 'Quais procedimentos você adota para manutenção preventiva durante a safra?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Manutenção Preventiva' },
  { area: 'agronegocio', texto: 'Como você ajusta a velocidade e parâmetros de operação para maximizar qualidade?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Otimização de Parâmetros' },
  { area: 'agronegocio', texto: 'Quais são os procedimentos de calibração que você realiza em pulverizadores autopropelidos?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Calibração de Pulverizadores' },

  // Experiência (6)
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com operação de colheitadeiras em diferentes culturas.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Operação de Colheitadeiras' },
  { area: 'agronegocio', texto: 'Descreva como você contribuiu para melhorar a eficiência das operações de campo.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria de Processos' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com treinamento de outros operadores?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento de Operadores' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou resolver um problema mecânico urgente no campo.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Solução de Problemas' },
  { area: 'agronegocio', texto: 'Conte sobre sua experiência com operação de máquinas com tecnologia embarcada avançada.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Tecnologia Embarcada' },
  { area: 'agronegocio', texto: 'Descreva como você lidou com safras de alta pressão e metas agressivas.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Trabalho sob Pressão' },

  // Comportamental (6)
  { area: 'agronegocio', texto: 'Como você motiva e orienta operadores menos experientes durante a safra?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança Operacional' },
  { area: 'agronegocio', texto: 'De que forma você equilibra velocidade de operação com qualidade do serviço?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Equilíbrio Velocidade-Qualidade' },
  { area: 'agronegocio', texto: 'Como você lida com conflitos entre operadores durante períodos de trabalho intenso?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Conflitos' },
  { area: 'agronegocio', texto: 'Descreva como você promove segurança no trabalho entre os colegas operadores.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Cultura de Segurança' },
  { area: 'agronegocio', texto: 'Como você se mantém atualizado sobre novas máquinas e tecnologias agrícolas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização Tecnológica' },
  { area: 'agronegocio', texto: 'De que forma você comunica problemas operacionais para supervisores e técnicos?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Comunicação Técnica' },

  // Situacional (6)
  { area: 'agronegocio', texto: 'A colheitadeira está com perdas acima do aceitável. O que você investiga e ajusta?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'situacional', competencia: 'Redução de Perdas' },
  { area: 'agronegocio', texto: 'Um operador mais novo está cometendo erros repetidos. Como você orienta?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'situacional', competencia: 'Orientação de Colegas' },
  { area: 'agronegocio', texto: 'O sistema de GPS falha durante operação de plantio. Como você procede?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'situacional', competencia: 'Contingência Tecnológica' },
  { area: 'agronegocio', texto: 'A meta de área do dia não será atingida no ritmo atual. O que você propõe?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'situacional', competencia: 'Alcance de Metas' },
  { area: 'agronegocio', texto: 'Você identifica que um procedimento padrão está causando desgaste excessivo. Como age?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'situacional', competencia: 'Proposição de Melhorias' },
  { area: 'agronegocio', texto: 'Duas máquinas precisam de atenção simultânea mas há só um mecânico. Como prioriza?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'pleno', categoria: 'situacional', competencia: 'Priorização' },
];

export const operadorMaquinasSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'agronegocio', texto: 'Como você estrutura o planejamento operacional de máquinas para uma safra completa?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'tecnica', competencia: 'Planejamento Operacional' },
  { area: 'agronegocio', texto: 'Quais metodologias você aplica para otimização da frota e redução de custos operacionais?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Frota' },
  { area: 'agronegocio', texto: 'Como você avalia e implementa novas tecnologias de máquinas agrícolas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'tecnica', competencia: 'Avaliação de Tecnologias' },
  { area: 'agronegocio', texto: 'Quais indicadores você utiliza para avaliação de desempenho de operadores e máquinas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'tecnica', competencia: 'KPIs Operacionais' },
  { area: 'agronegocio', texto: 'Como você coordena múltiplas frentes de operação com diferentes máquinas e equipes?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'tecnica', competencia: 'Coordenação de Operações' },
  { area: 'agronegocio', texto: 'Quais estratégias você utiliza para gestão de manutenção preventiva e corretiva da frota?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão de Manutenção' },
  { area: 'agronegocio', texto: 'Como você estrutura programas de capacitação para formação de novos operadores?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'tecnica', competencia: 'Formação de Operadores' },

  // Experiência (7)
  { area: 'agronegocio', texto: 'Conte sobre a maior operação mecanizada que você coordenou em termos de área e equipe.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'experiencia', competencia: 'Coordenação de Grandes Operações' },
  { area: 'agronegocio', texto: 'Descreva como você implementou melhorias que resultaram em aumento de produtividade da frota.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos de Produtividade' },
  { area: 'agronegocio', texto: 'Como foi sua experiência com implementação de novas máquinas ou tecnologias na operação?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'experiencia', competencia: 'Implementação de Tecnologias' },
  { area: 'agronegocio', texto: 'Descreva uma situação em que você precisou reverter uma operação com problemas graves.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crises' },
  { area: 'agronegocio', texto: 'Conte sobre como você desenvolveu líderes de equipe e operadores de referência.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'experiencia', competencia: 'Formação de Líderes' },
  { area: 'agronegocio', texto: 'Descreva sua experiência com participação em decisões de aquisição de máquinas.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'experiencia', competencia: 'Avaliação de Equipamentos' },
  { area: 'agronegocio', texto: 'Como foi sua participação na definição de processos e procedimentos operacionais?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'experiencia', competencia: 'Padronização de Processos' },

  // Comportamental (7)
  { area: 'agronegocio', texto: 'Como você desenvolve uma cultura de excelência operacional na equipe de máquinas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'comportamental', competencia: 'Cultura de Excelência' },
  { area: 'agronegocio', texto: 'De que forma você equilibra tradição com inovação na gestão das operações mecanizadas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Mudanças' },
  { area: 'agronegocio', texto: 'Como você constrói credibilidade com técnicos, gerentes e proprietários?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'comportamental', competencia: 'Credibilidade Profissional' },
  { area: 'agronegocio', texto: 'Descreva como você promove sustentabilidade e boas práticas nas operações mecanizadas.', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'comportamental', competencia: 'Sustentabilidade Operacional' },
  { area: 'agronegocio', texto: 'Como você lida com pressão por resultados em condições adversas (clima, quebras)?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'comportamental', competencia: 'Resiliência sob Pressão' },
  { area: 'agronegocio', texto: 'De que forma você se mantém relevante com as constantes mudanças tecnológicas?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'comportamental', competencia: 'Adaptabilidade Tecnológica' },
  { area: 'agronegocio', texto: 'Como você gerencia o bem-estar e a satisfação da equipe de operadores?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Pessoas' },

  // Situacional (7)
  { area: 'agronegocio', texto: 'A gerência exige redução de custos que você considera arriscada para a operação. Como negocia?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'situacional', competencia: 'Negociação Interna' },
  { area: 'agronegocio', texto: 'Uma quebra de máquina crítica ameaça todo o cronograma de colheita. Como você gerencia?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Crises de Equipamento' },
  { area: 'agronegocio', texto: 'A empresa adquire nova tecnologia que a equipe resiste em utilizar. O que você faz?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Resistência' },
  { area: 'agronegocio', texto: 'Você identifica que a frota atual não atenderá a expansão planejada. Como apresenta a necessidade?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'situacional', competencia: 'Planejamento de Capacidade' },
  { area: 'agronegocio', texto: 'A safra exige operação em turnos estendidos que afetam a equipe. O que você propõe?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Turnos' },
  { area: 'agronegocio', texto: 'Um operador experiente comete erro grave que danifica equipamento. Como você conduz?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Falhas' },
  { area: 'agronegocio', texto: 'Fornecedores de peças não cumprem prazos e ameaçam a operação. Como você age?', cargo: 'Operador de Máquinas Agrícolas', nivel: 'senior', categoria: 'situacional', competencia: 'Gestão de Fornecedores' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasAgronegocio: PerguntaSeed[] = [
  // Engenheiro Agrônomo
  ...engenheiroAgronomoJunior,
  ...engenheiroAgronomoPleno,
  ...engenheiroAgronomoSenior,
  // Técnico Agrícola
  ...tecnicoAgricolaJunior,
  ...tecnicoAgricolaPleno,
  ...tecnicoAgricolaSenior,
  // Gerente Agrícola
  ...gerenteAgricolaPleno,
  ...gerenteAgricolaSenior,
  // Veterinário
  ...veterinarioJunior,
  ...veterinarioPleno,
  ...veterinarioSenior,
  // Operador de Máquinas Agrícolas
  ...operadorMaquinasJunior,
  ...operadorMaquinasPleno,
  ...operadorMaquinasSenior,
];

export const estatisticasAgronegocio = {
  total: perguntasAgronegocio.length,
  porCargo: {
    'Engenheiro Agrônomo': engenheiroAgronomoJunior.length + engenheiroAgronomoPleno.length + engenheiroAgronomoSenior.length,
    'Técnico Agrícola': tecnicoAgricolaJunior.length + tecnicoAgricolaPleno.length + tecnicoAgricolaSenior.length,
    'Gerente Agrícola': gerenteAgricolaPleno.length + gerenteAgricolaSenior.length,
    'Veterinário': veterinarioJunior.length + veterinarioPleno.length + veterinarioSenior.length,
    'Operador de Máquinas Agrícolas': operadorMaquinasJunior.length + operadorMaquinasPleno.length + operadorMaquinasSenior.length,
  },
};
