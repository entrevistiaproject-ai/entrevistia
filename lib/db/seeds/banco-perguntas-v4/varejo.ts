/**
 * Banco de Perguntas v4 - VAREJO
 *
 * Melhorias aplicadas:
 * - Perguntas aprofundadas (sem sim/não)
 * - Variações por nível onde aplicável
 * - Perguntas de case e cenário realistas
 * - Tom cordial de recrutador experiente
 * - Foco em competências práticas e soft skills
 */

import { PerguntaSeed } from './types';

// ============================================
// OPERADOR DE CAIXA
// ============================================

export const operadorCaixaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'O caixa é o ponto onde todas as transações se concretizam. Poderia me explicar como você confere o fundo de caixa na abertura e realiza o fechamento no final do turno? Que cuidados você toma para garantir que tudo feche corretamente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Abertura e Fechamento' },
  { area: 'varejo', texto: 'Trabalhamos com diversos meios de pagamento hoje em dia - dinheiro, cartões, PIX, vouchers. Me conte como você processa cada um deles e quais são os cuidados específicos para evitar erros ou fraudes?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Meios de Pagamento' },
  { area: 'varejo', texto: 'Lidar com dinheiro exige atenção redobrada. Que técnicas você utiliza para conferir notas recebidas, dar troco corretamente e identificar notas falsas? Pode me dar exemplos práticos?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Manuseio de Dinheiro' },
  { area: 'varejo', texto: 'Cancelamentos e devoluções fazem parte da rotina do caixa. Me explique como você procede quando precisa cancelar um item ou uma compra inteira, e como registra essas operações para que o caixa feche corretamente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Cancelamentos e Devoluções' },
  { area: 'varejo', texto: 'Sangrias e suprimentos são procedimentos importantes para a segurança do caixa. Me explique como você realiza esses procedimentos e em quais situações você solicita uma sangria?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Sangria e Suprimento' },
  { area: 'varejo', texto: 'Consultas de preço e leitura de códigos de barras fazem parte da rotina. Quando um produto não está cadastrado ou o código não passa, como você procede para resolver sem atrasar o atendimento?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Resolução de Problemas Técnicos' },

  // Experiência (5)
  { area: 'varejo', texto: 'Filas longas testam a paciência dos clientes e a eficiência do operador. Conte-me sobre um dia de movimento intenso que você enfrentou - como conseguiu manter a agilidade sem comprometer a qualidade do atendimento?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Alta Demanda' },
  { area: 'varejo', texto: 'Problemas técnicos acontecem nos piores momentos. Me fale sobre uma situação em que o sistema travou ou deu problema durante uma operação - como você contornou e finalizou o atendimento?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Problemas Técnicos' },
  { area: 'varejo', texto: 'Cada empresa tem suas particularidades no caixa. Me conte sobre sua experiência anterior - quais sistemas você operou e como foi sua adaptação a cada um deles?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas e Adaptação' },
  { area: 'varejo', texto: 'Diferenças no caixa são situações delicadas. Você já passou por isso? Conte-me o que aconteceu, como identificou o problema e quais medidas foram tomadas.', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Diferenças de Caixa' },
  { area: 'varejo', texto: 'O varejo tem datas especiais com promoções complexas - descontos progressivos, combos, cupons. Me conte como foi sua experiência operando o caixa nessas ocasiões e como garantiu que as promoções fossem aplicadas corretamente.', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Promoções e Campanhas' },

  // Comportamental (5)
  { area: 'varejo', texto: 'O operador de caixa é muitas vezes a última impressão que o cliente leva da loja. O que você considera essencial para deixar uma impressão positiva, mesmo em um atendimento rápido?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Atendimento ao Cliente' },
  { area: 'varejo', texto: 'Passar horas em pé, com movimentos repetitivos e alta concentração pode ser desgastante. Como você cuida de si mesmo para manter o foco e a energia ao longo do turno inteiro?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Resistência e Autocuidado' },
  { area: 'varejo', texto: 'Precisão é fundamental quando se lida com dinheiro. Como você se organiza mentalmente para evitar distrações e manter a atenção mesmo em dias mais corridos ou cansativos?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Concentração' },
  { area: 'varejo', texto: 'Trabalhar em varejo significa lidar com todo tipo de pessoa. O que te motiva nesse tipo de trabalho e como você mantém a cordialidade mesmo quando está tendo um dia difícil?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'varejo', texto: 'No caixa você trabalha lado a lado com colegas em outros PDVs. Como você colabora com a equipe para manter o fluxo de atendimento fluindo bem, especialmente em horários de pico?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },

  // Situacional (5)
  { area: 'varejo', texto: 'Um cliente chega ao caixa já irritado com algo que aconteceu na loja e desconta em você. Como você conduziria essa situação mantendo a calma e buscando resolver o problema?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Conflitos' },
  { area: 'varejo', texto: 'Você percebe que um cliente está tentando passar um produto no código de outro mais barato. O que você faz nessa situação delicada, considerando que precisa agir sem ofender o cliente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Integridade' },
  { area: 'varejo', texto: 'A fila está enorme, o sistema está lento e um cliente começa a reclamar em voz alta, deixando outros clientes desconfortáveis. Como você administraria essa situação?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Pressão' },
  { area: 'varejo', texto: 'No fechamento do caixa, você identifica que está faltando um valor considerável. Quais seriam seus passos imediatos e como você comunicaria isso ao supervisor?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Transparência' },
  { area: 'varejo', texto: 'Um cliente idoso está com dificuldade para entender o valor da compra e fazer o pagamento. A fila está crescendo e outros clientes demonstram impaciência. Como você equilibra atenção ao cliente e eficiência?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Empatia e Eficiência' },
];

export const operadorCaixaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'Operadores experientes frequentemente são responsáveis por treinar novatos. Como você estruturaria o treinamento de um novo operador de caixa para garantir que ele aprenda os procedimentos corretamente?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'tecnica', competencia: 'Treinamento' },
  { area: 'varejo', texto: 'Além do caixa principal, você já operou outros pontos como balcão de trocas, crediário ou atendimento de cartões da loja? Me conte como foi adaptar-se a essas diferentes frentes.', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'tecnica', competencia: 'Multifuncionalidade' },
  { area: 'varejo', texto: 'Lidar com devoluções e trocas exige conhecimento das políticas da empresa e julgamento. Me explique como você avalia situações de troca que estão no limite das regras e como decide quando abrir exceções.', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'tecnica', competencia: 'Políticas de Troca' },
  { area: 'varejo', texto: 'Operações de crediário e financiamento envolvem análise de crédito e documentação. Me conte sua experiência com essas operações e quais cuidados você toma para evitar problemas.', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'tecnica', competencia: 'Crediário e Financiamento' },
  { area: 'varejo', texto: 'Conferência de fechamento de caixa central ou supervisão de outros caixas fazem parte da rotina de operadores mais experientes. Como você realiza essas conferências e o que procura identificar?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'tecnica', competencia: 'Conferência e Supervisão' },
  { area: 'varejo', texto: 'Relatórios de movimentação de caixa e análise de divergências são responsabilidades mais avançadas. Como você interpreta esses relatórios para identificar padrões ou problemas recorrentes?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise de Relatórios' },

  // Experiência (6)
  { area: 'varejo', texto: 'Operadores plenos frequentemente assumem o caixa em horários críticos. Conte-me sobre uma situação de Black Friday, Natal ou outra data de pico em que você foi crucial para a operação funcionar.', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'experiencia', competencia: 'Operação em Pico' },
  { area: 'varejo', texto: 'Você já identificou uma fraude ou tentativa de golpe no caixa? Conte-me como percebeu, como agiu e qual foi o desfecho da situação.', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'experiencia', competencia: 'Prevenção de Fraudes' },
  { area: 'varejo', texto: 'Me fale sobre uma situação em que você precisou ajudar um colega com dificuldades no caixa. Como você equilibrou seu atendimento com o suporte ao colega?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'experiencia', competencia: 'Suporte a Colegas' },
  { area: 'varejo', texto: 'Conte-me sobre a implementação de um novo sistema ou procedimento no caixa que você participou. Como foi a adaptação e como você ajudou outros a se adaptarem?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'experiencia', competencia: 'Adaptação a Mudanças' },
  { area: 'varejo', texto: 'Você já teve que lidar com uma situação de assalto ou tentativa de roubo no caixa? Se sim, como você reagiu e quais protocolos seguiu? Se não, como você se prepararia para essa situação?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'experiencia', competencia: 'Segurança' },
  { area: 'varejo', texto: 'Me conte sobre um reconhecimento ou elogio que você recebeu pelo seu trabalho no caixa. O que você fez que gerou esse reconhecimento?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'experiencia', competencia: 'Excelência no Atendimento' },

  // Comportamental (6)
  { area: 'varejo', texto: 'Operadores experientes são referência para a equipe. Como você mantém um padrão de excelência consistente dia após dia, mesmo quando a rotina fica monótona?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'comportamental', competencia: 'Consistência' },
  { area: 'varejo', texto: 'Com a experiência, alguns operadores desenvolvem vícios ou atalhos que podem comprometer procedimentos. Como você se policia para não cair em automatismos prejudiciais?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'comportamental', competencia: 'Disciplina' },
  { area: 'varejo', texto: 'Novatos frequentemente procuram operadores experientes para tirar dúvidas. Como você equilibra paciência para ensinar com a necessidade de manter sua produtividade?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'comportamental', competencia: 'Mentoria' },
  { area: 'varejo', texto: 'O que você faz para se manter atualizado sobre novos meios de pagamento, procedimentos e políticas da empresa? Como você busca esse conhecimento?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },
  { area: 'varejo', texto: 'Qual sua visão sobre crescimento na carreira a partir do caixa? Que passos você está dando para evoluir profissionalmente?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Carreira' },
  { area: 'varejo', texto: 'Como você lida com a responsabilidade de ser um dos operadores mais experientes? Isso te motiva ou gera pressão?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'comportamental', competencia: 'Responsabilidade' },

  // Situacional (6)
  { area: 'varejo', texto: 'Você está treinando um novato quando percebe que ele está cometendo erros que podem gerar diferenças de caixa. Como você aborda a situação sem desmotivá-lo?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback Construtivo' },
  { area: 'varejo', texto: 'Um cliente VIP está insatisfeito com um procedimento padrão que você não pode contornar. Como você gerencia essa situação sem prometer o que não pode cumprir?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Expectativas' },
  { area: 'varejo', texto: 'Você percebe que um colega está tendo dificuldades e a fila dele está crescendo enquanto a sua está tranquila. O supervisor não está presente. O que você faz?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'situacional', competencia: 'Iniciativa e Colaboração' },
  { area: 'varejo', texto: 'O sistema de pagamento eletrônico caiu e há uma fila de clientes. Você só pode aceitar dinheiro. Como você comunica isso aos clientes e gerencia a situação?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise' },
  { area: 'varejo', texto: 'Um cliente quer fazer uma devolução que está fora da política, mas alega que outro operador prometeu que seria possível. Como você resolve essa situação?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'situacional', competencia: 'Resolução de Conflitos' },
  { area: 'varejo', texto: 'Você identifica um padrão de erros que está gerando diferenças em vários caixas. Como você comunica isso à liderança de forma construtiva?', cargo: 'Operador de Caixa', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação Ascendente' },
];

// ============================================
// REPOSITOR / AUXILIAR DE LOJA
// ============================================

export const repositorJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'A reposição eficiente garante que o cliente encontre o que procura. Me explique como você organiza sua rotina de reposição - como prioriza quais produtos repor primeiro e como mantém as gôndolas sempre abastecidas?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Rotina de Reposição' },
  { area: 'varejo', texto: 'O sistema PEPS (primeiro que entra, primeiro que sai) é essencial para produtos com validade. Poderia me explicar como você aplica essa técnica na prática e quais cuidados toma para evitar perdas por vencimento?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'PEPS e Validade' },
  { area: 'varejo', texto: 'A organização visual das gôndolas influencia diretamente as vendas. Que técnicas você conhece e utiliza para manter as prateleiras atrativas e facilitar a experiência de compra do cliente?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Visual Merchandising' },
  { area: 'varejo', texto: 'Receber mercadorias exige conferência atenta. Me conte como você realiza a conferência de produtos no recebimento - o que você verifica e como procede quando encontra divergências?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Recebimento' },
  { area: 'varejo', texto: 'Etiquetagem de preços e precificação correta são essenciais para a operação. Como você garante que os produtos estejam sempre com os preços corretos e atualizados na gôndola?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Precificação' },
  { area: 'varejo', texto: 'Cada categoria de produto tem particularidades de armazenamento e exposição. Me conte como você adapta seu trabalho para diferentes tipos de produtos - alimentos, limpeza, perecíveis, etc.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Categorias de Produtos' },

  // Experiência (5)
  { area: 'varejo', texto: 'Datas sazonais como Natal, Páscoa ou Dia das Mães exigem reposição intensiva. Conte-me sobre uma dessas ocasiões em que você trabalhou - como foi a organização e quais desafios você enfrentou?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Alta Demanda Sazonal' },
  { area: 'varejo', texto: 'Trabalhar no estoque exige organização para encontrar rapidamente o que se precisa. Me fale sobre como você mantinha o estoque organizado e como localizava produtos com agilidade.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Organização de Estoque' },
  { area: 'varejo', texto: 'Produtos avariados ou com problemas de qualidade aparecem ocasionalmente. Conte-me sobre uma situação em que você identificou um lote com problema - como procedeu?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Controle de Qualidade' },
  { area: 'varejo', texto: 'Além da reposição, o auxiliar de loja frequentemente atende clientes. Me conte sobre uma interação memorável com um cliente que te procurou para ajudar a encontrar um produto.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },
  { area: 'varejo', texto: 'Inventários fazem parte da rotina do repositor. Me conte sobre sua experiência com contagens de estoque - como você se organiza para contar com precisão?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Inventário' },

  // Comportamental (5)
  { area: 'varejo', texto: 'O trabalho de reposição exige esforço físico considerável - carregar caixas, subir escadas, ficar em movimento o dia todo. Como você cuida da sua saúde para manter a disposição nesse ritmo?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Preparo Físico' },
  { area: 'varejo', texto: 'Trabalhar em equipe no salão de vendas exige coordenação. Como você se relaciona com colegas quando precisam dividir tarefas ou cobrir setores uns dos outros?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'varejo', texto: 'Manter a atenção aos detalhes é crucial para não deixar produtos mal posicionados ou fora do lugar. O que você faz para manter esse olhar atento durante todo o expediente?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Atenção aos Detalhes' },
  { area: 'varejo', texto: 'O que te atrai no trabalho de varejo e especificamente na área de reposição? O que você considera mais gratificante nessa função?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'varejo', texto: 'Seguir procedimentos e manter a disciplina operacional é importante na reposição. Como você se organiza para não pular etapas mesmo quando está com pressa?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Disciplina' },

  // Situacional (5)
  { area: 'varejo', texto: 'Você está abastecendo uma seção quando percebe que um produto muito procurado acabou e não há mais no estoque. Um cliente pergunta sobre ele. Como você conduz essa situação?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Ruptura de Estoque' },
  { area: 'varejo', texto: 'Durante o expediente, você nota que um cliente está colocando produtos dentro da bolsa discretamente. O que você faria nessa situação, considerando os protocolos de segurança?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Prevenção de Perdas' },
  { area: 'varejo', texto: 'Chegou uma carga grande de mercadorias e há muitas tarefas pendentes no salão ao mesmo tempo. Como você priorizaria as atividades para dar conta de tudo?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { area: 'varejo', texto: 'Você percebe que um colega está guardando produtos de forma incorreta, comprometendo a organização do setor. Como você abordaria essa situação sem criar conflito?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação com Colegas' },
  { area: 'varejo', texto: 'Um produto está com preço errado na gôndola e um cliente quer pagar o valor mais baixo exibido. Como você gerencia essa situação?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Divergência de Preços' },
];

export const repositorPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'Repositores experientes frequentemente assumem responsabilidade por setores inteiros. Como você planeja a reposição de um setor completo considerando giro de produtos, sazonalidade e espaço disponível?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Setor' },
  { area: 'varejo', texto: 'Montagem de pontos extras, ilhas promocionais e displays fazem parte do trabalho mais avançado. Me conte sua experiência montando esses espaços e como você garante que fiquem atrativos e funcionais.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Pontos Extras e Displays' },
  { area: 'varejo', texto: 'Análise de ruptura de estoque e sugestão de pedidos são responsabilidades de repositores mais experientes. Como você identifica produtos que estão faltando ou em excesso e comunica isso à liderança?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Ruptura' },
  { area: 'varejo', texto: 'Treinamento de novos repositores é parte do trabalho pleno. Como você estrutura o treinamento para garantir que o novato aprenda os procedimentos corretamente e com segurança?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Treinamento' },
  { area: 'varejo', texto: 'Planogramas definem como os produtos devem ser expostos. Como você lê e implementa um planograma, e como lida quando o espaço real não corresponde ao planejado?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planograma' },
  { area: 'varejo', texto: 'Controle de validade e gestão de produtos próximos ao vencimento exigem processo rigoroso. Como você organiza essa rotina para minimizar perdas e garantir que produtos vencidos não cheguem ao cliente?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Validade' },

  // Experiência (6)
  { area: 'varejo', texto: 'Conte-me sobre uma situação em que você identificou uma oportunidade de melhoria no layout ou organização do setor. O que você propôs e como foi implementado?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Melhoria Contínua' },
  { area: 'varejo', texto: 'Inventários são momentos críticos para o repositor. Me fale sobre sua experiência liderando ou participando ativamente de inventários. Quais desafios você enfrentou?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Inventário' },
  { area: 'varejo', texto: 'Você já participou de uma inauguração ou reformulação de loja? Conte-me como foi a montagem inicial das gôndolas e os desafios de organizar tudo do zero.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Montagem de Loja' },
  { area: 'varejo', texto: 'Me conte sobre uma situação em que você treinou um novato que tinha dificuldades de aprendizado. Como você adaptou sua abordagem para garantir que ele aprendesse?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desenvolvimento de Pessoas' },
  { area: 'varejo', texto: 'Você já identificou um problema operacional recorrente no seu setor? Como você analisou a situação e propôs uma solução?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resolução de Problemas' },
  { area: 'varejo', texto: 'Conte-me sobre um período em que você precisou cobrir outro setor além do seu. Como você se adaptou a produtos e rotinas diferentes?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Flexibilidade' },

  // Comportamental (6)
  { area: 'varejo', texto: 'Repositores experientes são referência para a equipe. Como você mantém um padrão de qualidade consistente e inspira outros a fazerem o mesmo?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança Informal' },
  { area: 'varejo', texto: 'Ser proativo é fundamental para um repositor pleno. Me dê exemplos de situações em que você antecipou problemas ou necessidades antes que alguém pedisse.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Proatividade' },
  { area: 'varejo', texto: 'Com mais experiência vem mais responsabilidade. Como você lida com a pressão de ser responsável não só pelo seu trabalho, mas também por orientar outros?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Responsabilidade' },
  { area: 'varejo', texto: 'O varejo está sempre mudando - novos produtos, layouts, processos. Como você se mantém atualizado e se adapta às mudanças na operação?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'varejo', texto: 'Qual sua visão de carreira na área de varejo? O que você está fazendo para se desenvolver e crescer profissionalmente?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Carreira' },
  { area: 'varejo', texto: 'Como você equilibra eficiência com qualidade? Em momentos de pressão, como você garante que a pressa não comprometa o padrão do trabalho?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Qualidade' },

  // Situacional (6)
  { area: 'varejo', texto: 'Você está responsável pelo setor e percebe que não conseguirá terminar a reposição antes da loja abrir. Como você prioriza e comunica a situação?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Tempo' },
  { area: 'varejo', texto: 'Um fornecedor entregou produtos em quantidade muito maior que o pedido e o estoque está lotado. Como você organiza essa situação?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Excesso' },
  { area: 'varejo', texto: 'Um novato que você treinou está cometendo erros repetidos que você já explicou várias vezes. Como você aborda essa situação?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback' },
  { area: 'varejo', texto: 'O supervisor pediu para você montar um ponto extra de um produto que você sabe que não vende bem. Como você comunica sua opinião de forma construtiva?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação Ascendente' },
  { area: 'varejo', texto: 'Durante o inventário, você encontra uma divergência significativa que pode indicar furto ou erro de processo. Como você procede?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Integridade' },
  { area: 'varejo', texto: 'Dois colegas estão em conflito e isso está afetando o trabalho em equipe no setor. O supervisor não está presente. Como você intervém?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Mediação' },
];

// ============================================
// FISCAL DE PREVENÇÃO E PERDAS
// ============================================

export const fiscalPerdasJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'A prevenção de perdas envolve muito mais do que vigiar. Poderia me explicar quais são os principais tipos de perdas no varejo e que estratégias você considera mais eficazes para cada um deles?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Tipos de Perdas' },
  { area: 'varejo', texto: 'Os sistemas antifurto são ferramentas importantes do seu trabalho. Me conte sobre sua experiência com diferentes equipamentos - alarmes, etiquetas, câmeras - e como você os utiliza de forma integrada?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas de Segurança' },
  { area: 'varejo', texto: 'A abordagem de um suspeito requer técnica e cuidado jurídico. Como você procede quando identifica um possível furto em andamento? Quais são os limites legais da sua atuação?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Abordagem' },
  { area: 'varejo', texto: 'Inventários revelam a real situação das perdas. Me explique sua experiência com processos de inventário - como você participa, o que analisa e como contribui para identificar as causas das diferenças?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Inventário' },
  { area: 'varejo', texto: 'Registrar ocorrências e elaborar relatórios faz parte da rotina de prevenção. Como você documenta uma ocorrência para que ela possa ser usada posteriormente, inclusive para fins legais?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Documentação' },
  { area: 'varejo', texto: 'Identificar comportamentos suspeitos antes que o furto aconteça é a prevenção ideal. Que sinais e padrões de comportamento você observa que podem indicar intenção de furto?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Identificação de Comportamentos' },

  // Experiência (5)
  { area: 'varejo', texto: 'Flagrar um furto é situação tensa que exige sangue frio. Conte-me sobre uma ocorrência que você vivenciou - como identificou, como agiu e como a situação foi resolvida?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Ocorrências' },
  { area: 'varejo', texto: 'Perdas operacionais muitas vezes superam os furtos externos. Me fale sobre uma situação em que você identificou um processo interno que estava causando perdas e como contribuiu para a solução.', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Perdas Operacionais' },
  { area: 'varejo', texto: 'Monitoramento por câmeras exige atenção constante. Você já identificou algo suspeito através do CFTV? Conte-me como foi sua observação e a ação que tomou.', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Monitoramento' },
  { area: 'varejo', texto: 'Trabalhar em prevenção de perdas às vezes envolve lidar com situações tensas, incluindo reações agressivas. Você já passou por algo assim? Como manteve a calma e a segurança?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Situações de Risco' },
  { area: 'varejo', texto: 'Conte-me sobre uma situação em que sua atenção aos detalhes preveniu uma perda antes que ela acontecesse. O que você observou e como agiu?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Prevenção Proativa' },

  // Comportamental (5)
  { area: 'varejo', texto: 'A discrição é essencial na prevenção de perdas - você observa sem ser notado. Como você desenvolve essa habilidade de estar atento a tudo sem parecer estar vigiando?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Discrição' },
  { area: 'varejo', texto: 'Seu trabalho exige suspeitar de pessoas, mas sem cair em preconceitos. Como você mantém um olhar técnico e imparcial, evitando julgamentos baseados em aparência?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Imparcialidade' },
  { area: 'varejo', texto: 'Ficar atento durante longas horas pode ser mentalmente cansativo. Como você mantém o estado de alerta e concentração durante todo o expediente?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Vigilância' },
  { area: 'varejo', texto: 'Prevenção de perdas trabalha junto com toda a operação da loja. Como você constrói um relacionamento colaborativo com os demais funcionários, sendo visto como parceiro e não como fiscalizador?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Relacionamento Interno' },
  { area: 'varejo', texto: 'A integridade é fundamental nessa função. O que te motiva a trabalhar com prevenção de perdas e como você mantém seus próprios padrões éticos elevados?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Ética e Integridade' },

  // Situacional (5)
  { area: 'varejo', texto: 'Você percebe que um funcionário está colocando produtos de lado para levar depois. Essa é uma situação delicada que envolve um colega de trabalho. Como você procederia?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Furto Interno' },
  { area: 'varejo', texto: 'Um cliente está claramente com mercadoria escondida, mas quando você se aproxima, ele age de forma agressiva e ameaçadora. Quais são seus próximos passos?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Reação Agressiva' },
  { area: 'varejo', texto: 'Você está sozinho na loja e identifica um grupo de pessoas agindo de forma coordenada para furtar. A situação parece perigosa. O que você faz?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Avaliação de Risco' },
  { area: 'varejo', texto: 'Após uma abordagem, você descobre que se enganou - o cliente havia pago pelo produto. Como você conduz essa situação delicada de forma a preservar a imagem da loja e a dignidade do cliente?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Abordagem Equivocada' },
  { area: 'varejo', texto: 'O gerente pede para você "dar um jeito" em clientes que ele considera indesejáveis, sem motivo concreto de suspeita. Como você responde a essa solicitação?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Ética Profissional' },
];

export const fiscalPerdasPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'Análise de indicadores de perdas é responsabilidade de fiscais mais experientes. Quais métricas você acompanha e como você usa esses dados para direcionar suas ações de prevenção?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise de Indicadores' },
  { area: 'varejo', texto: 'Treinamento da equipe de loja em prevenção de perdas multiplica a eficácia do trabalho. Como você estrutura e conduz treinamentos para operadores e repositores?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Treinamento' },
  { area: 'varejo', texto: 'Investigações internas exigem metodologia e documentação rigorosa. Como você conduz uma investigação de perda quando há suspeita de envolvimento de funcionários?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Investigação Interna' },
  { area: 'varejo', texto: 'Auditorias de processos identificam vulnerabilidades operacionais. Como você planeja e executa uma auditoria para identificar pontos de risco de perdas?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Auditoria de Processos' },
  { area: 'varejo', texto: 'Relacionamento com autoridades policiais faz parte do trabalho mais avançado. Como você gerencia essas relações e quais procedimentos segue para registro de ocorrências policiais?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Relacionamento com Autoridades' },
  { area: 'varejo', texto: 'Planos de contingência para situações de crise são responsabilidade de fiscais experientes. Como você elabora e testa procedimentos para emergências como assaltos ou incêndios?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planos de Contingência' },

  // Experiência (6)
  { area: 'varejo', texto: 'Conte-me sobre uma investigação complexa que você conduziu envolvendo perdas internas. Quais evidências você levantou e como o caso foi resolvido?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Investigação' },
  { area: 'varejo', texto: 'Você já participou de uma operação coordenada com outras lojas ou com a polícia para desarticular uma quadrilha de furtos? Conte-me como foi.', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Operações Coordenadas' },
  { area: 'varejo', texto: 'Me fale sobre um programa de prevenção de perdas que você ajudou a implementar. Quais foram as ações e os resultados obtidos?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Programas de Prevenção' },
  { area: 'varejo', texto: 'Conte-me sobre uma situação em que você treinou a equipe de loja e isso resultou em redução significativa de perdas. O que você ensinou e como mediu os resultados?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Impacto de Treinamento' },
  { area: 'varejo', texto: 'Você já lidou com uma situação de assalto à mão armada? Se sim, como você reagiu e quais aprendizados tirou? Se não, como você se prepara para essa possibilidade?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Situações Extremas' },
  { area: 'varejo', texto: 'Me conte sobre a redução de índice de perdas mais significativa que você conseguiu em uma loja. O que você identificou e quais ações implementou?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resultados' },

  // Comportamental (6)
  { area: 'varejo', texto: 'Fiscais experientes frequentemente lideram equipes ou orientam novatos. Como você desenvolve outros profissionais de prevenção de perdas?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Equipe' },
  { area: 'varejo', texto: 'Lidar constantemente com situações de suspeita e confronto pode ser emocionalmente desgastante. Como você cuida da sua saúde mental nessa profissão?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Saúde Mental' },
  { area: 'varejo', texto: 'A tecnologia de prevenção de perdas evolui constantemente. Como você se mantém atualizado sobre novas ferramentas e técnicas na área?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Atualização Profissional' },
  { area: 'varejo', texto: 'Ser referência em prevenção de perdas significa ser consultado para decisões importantes. Como você lida com essa responsabilidade e influência?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Influência' },
  { area: 'varejo', texto: 'Qual sua visão de carreira na área de segurança e prevenção de perdas? Que especializações ou certificações você busca?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento de Carreira' },
  { area: 'varejo', texto: 'Como você equilibra firmeza na aplicação de regras com manutenção de um bom clima organizacional? É possível ser respeitado sem ser temido?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança' },

  // Situacional (6)
  { area: 'varejo', texto: 'A análise de dados sugere que as perdas estão concentradas em um turno específico. Como você investigaria se há envolvimento de funcionários desse turno?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'situacional', competencia: 'Investigação Dirigida' },
  { area: 'varejo', texto: 'O gerente está pressionando para que você reduza custos cortando procedimentos de prevenção. Como você argumenta a importância de manter os controles?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'situacional', competencia: 'Defesa de Processos' },
  { area: 'varejo', texto: 'Um funcionário antigo e bem quisto foi flagrado cometendo fraude. Como você gerencia essa situação considerando o impacto na moral da equipe?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Crise Interna' },
  { area: 'varejo', texto: 'Você identifica uma vulnerabilidade grave no sistema de segurança, mas a correção exigiria investimento significativo. Como você apresenta essa necessidade para a diretoria?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação Executiva' },
  { area: 'varejo', texto: 'Uma quadrilha conhecida está atuando na região e pode mirar sua loja. Que medidas preventivas extraordinárias você implementaria?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'situacional', competencia: 'Prevenção Extraordinária' },
  { area: 'varejo', texto: 'Há conflito entre a equipe de prevenção de perdas e a equipe de vendas, que reclama de abordagens excessivas a clientes. Como você resolve essa tensão?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'pleno', categoria: 'situacional', competencia: 'Gestão de Conflitos' },
];

// ============================================
// ATENDENTE / VENDEDOR DE LOJA
// ============================================

export const vendedorLojaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'Conhecer bem os produtos é fundamental para vender. Como você se prepara para conhecer o que está vendendo? Que informações você considera essenciais dominar sobre cada produto?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Conhecimento de Produtos' },
  { area: 'varejo', texto: 'Entender o que o cliente realmente precisa é o primeiro passo para uma boa venda. Que perguntas você costuma fazer para identificar as necessidades do cliente sem parecer invasivo?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Sondagem' },
  { area: 'varejo', texto: 'Oferecer produtos complementares aumenta o ticket médio. Me explique como você identifica oportunidades de venda adicional de forma natural, sem parecer que está empurrando produtos?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Venda Adicional' },
  { area: 'varejo', texto: 'Fechar a venda é uma etapa crítica. Que técnicas você utiliza para conduzir o cliente à decisão de compra sem pressioná-lo de forma desconfortável?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Fechamento' },
  { area: 'varejo', texto: 'A apresentação dos produtos influencia a decisão de compra. Como você demonstra um produto de forma atrativa, destacando seus benefícios e diferenciais?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Demonstração de Produtos' },
  { area: 'varejo', texto: 'Organização do ambiente de vendas contribui para as vendas. Como você mantém sua área de atendimento organizada e atrativa para os clientes?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Organização do Ambiente' },

  // Experiência (5)
  { area: 'varejo', texto: 'Todo vendedor tem aquela venda marcante que foi especialmente desafiadora ou gratificante. Conte-me sobre uma venda assim - o que a tornou especial e o que você fez de diferente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Vendas Marcantes' },
  { area: 'varejo', texto: 'Clientes indecisos exigem paciência e habilidade. Me fale sobre uma situação em que você conseguiu ajudar um cliente muito indeciso a tomar uma decisão com a qual ele ficou satisfeito.', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Clientes Indecisos' },
  { area: 'varejo', texto: 'Bater metas é parte do trabalho em vendas. Conte-me sobre um período em que você conseguiu superar suas metas - o que você fez de diferente que contribuiu para esse resultado?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Resultados' },
  { area: 'varejo', texto: 'Nem sempre conseguimos converter o atendimento em venda. Me conte sobre uma venda que você perdeu e o que aprendeu com essa experiência.', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado com Perdas' },
  { area: 'varejo', texto: 'Me conte sobre sua adaptação ao último ambiente de vendas em que trabalhou. Quanto tempo levou para você se sentir seguro com os produtos e processos?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Adaptação' },

  // Comportamental (5)
  { area: 'varejo', texto: 'Vendas podem ter altos e baixos - alguns dias tudo flui, outros nada dá certo. Como você mantém a motivação e a energia nos dias mais difíceis?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { area: 'varejo', texto: 'Trabalhar em equipe de vendas envolve competição saudável, mas também colaboração. Como você equilibra a busca por suas metas individuais com o apoio aos colegas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { area: 'varejo', texto: 'Clientes difíceis testam nossa paciência. Como você mantém a cordialidade e o profissionalismo mesmo quando o cliente é grosseiro ou desrespeitoso?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Inteligência Emocional' },
  { area: 'varejo', texto: 'O que te atrai na área de vendas? O que você considera mais gratificante nessa profissão e o que você acha mais desafiador?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },
  { area: 'varejo', texto: 'Aprender sobre novos produtos e técnicas de vendas é contínuo. Como você busca se desenvolver e aprender coisas novas na área?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Aprendizado Contínuo' },

  // Situacional (5)
  { area: 'varejo', texto: 'Um cliente está claramente interessado em um produto que está fora do seu orçamento. Como você conduz essa situação - insiste no produto desejado ou apresenta alternativas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Adequação de Oferta' },
  { area: 'varejo', texto: 'Você está atendendo um cliente quando outro chega e parece ter pressa. Como você gerencia essa situação de forma que nenhum dos dois se sinta mal atendido?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Múltiplos Clientes' },
  { area: 'varejo', texto: 'O cliente quer um produto que você sabe que não é a melhor opção para a necessidade dele, mas é o mais caro. O que você faz - vende o que ele quer ou orienta para outra opção?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Ética em Vendas' },
  { area: 'varejo', texto: 'Um cliente reclama de um produto que comprou com você anteriormente e está insatisfeito. Como você conduz essa conversa para tentar reverter a situação?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Pós-Venda' },
  { area: 'varejo', texto: 'O cliente diz que viu o mesmo produto mais barato em outra loja. Como você responde sem desvalorizar o concorrente nem perder a venda?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Comparação com Concorrência' },
];

export const vendedorLojaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'Vendedores experientes desenvolvem técnicas próprias de abordagem. Me conte como você adapta seu estilo de atendimento aos diferentes perfis de cliente que identifica na loja.', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Perfil de Clientes' },
  { area: 'varejo', texto: 'Contornar objeções é uma arte que se desenvolve com experiência. Quais são as objeções mais comuns que você enfrenta e como você as contorna de forma eficaz?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Contorno de Objeções' },
  { area: 'varejo', texto: 'Negociação de preços e condições é parte do dia a dia em muitas lojas. Como você conduz uma negociação para chegar a um acordo bom para o cliente e para a empresa?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Negociação' },
  { area: 'varejo', texto: 'Fidelizar clientes é mais rentável do que conquistar novos. Que estratégias você usa para criar relacionamento duradouro e fazer com que clientes retornem buscando especificamente você?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Fidelização' },
  { area: 'varejo', texto: 'Analisar indicadores de vendas ajuda a melhorar resultados. Quais métricas você acompanha do seu desempenho e como você usa esses dados para ajustar sua abordagem?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores' },
  { area: 'varejo', texto: 'Venda consultiva exige entendimento profundo do cliente. Como você estrutura uma conversa para entender não só o que o cliente quer, mas o problema que ele precisa resolver?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Venda Consultiva' },

  // Experiência (6)
  { area: 'varejo', texto: 'Vendedores plenos frequentemente ajudam a treinar novatos. Conte-me sobre sua experiência orientando colegas mais novos - como você transmite seu conhecimento de vendas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { area: 'varejo', texto: 'Campanhas promocionais exigem adaptação rápida. Me fale sobre uma campanha desafiadora em que você participou - como você se preparou e quais resultados alcançou?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Campanhas' },
  { area: 'varejo', texto: 'Clientes VIP ou de alto valor merecem atenção diferenciada. Conte-me sobre sua experiência atendendo esse perfil de cliente - o que você faz de diferente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Clientes VIP' },
  { area: 'varejo', texto: 'Todo vendedor passa por fases de resultados abaixo do esperado. Me conte sobre um período assim e o que você fez para virar o jogo e retomar seu desempenho.', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Superação' },
  { area: 'varejo', texto: 'Conte-me sobre a venda mais complexa que você já fez - que envolveu negociação difícil, múltiplas objeções ou um processo longo. Como você conduziu?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Vendas Complexas' },
  { area: 'varejo', texto: 'Você já construiu uma carteira de clientes fiéis? Me conte como desenvolveu esses relacionamentos e como mantém o contato com eles.', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Carteira de Clientes' },

  // Comportamental (6)
  { area: 'varejo', texto: 'Ser referência de vendas na equipe traz responsabilidade. Como você lida com as expectativas sobre você e o que faz para manter a consistência nos resultados?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Consistência' },
  { area: 'varejo', texto: 'Pressão por metas é constante em vendas. Como você gerencia o estresse sem deixar transparecer para o cliente ou comprometer seu atendimento?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { area: 'varejo', texto: 'Vendedores experientes às vezes resistem a mudanças de processos ou produtos. Como você lida quando a empresa implementa algo novo que muda sua forma de trabalhar?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { area: 'varejo', texto: 'Onde você se vê na carreira de vendas daqui a alguns anos? O que você está fazendo hoje para caminhar nessa direção?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento' },
  { area: 'varejo', texto: 'Como você mantém sua energia e entusiasmo depois de anos trabalhando com vendas? O que evita que você entre no piloto automático?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Motivação de Longo Prazo' },
  { area: 'varejo', texto: 'Ser exemplo para outros vendedores é parte do seu papel. Como você equilibra suas próprias vendas com o tempo dedicado a ajudar colegas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderança Informal' },

  // Situacional (6)
  { area: 'varejo', texto: 'Um cliente regular seu está insatisfeito com uma compra e ameaça nunca mais voltar. Como você trabalharia para recuperar esse relacionamento importante?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Recuperação de Cliente' },
  { area: 'varejo', texto: 'Você identificou que um colega está desviando vendas que eram suas. Como você aborda essa situação delicada sem prejudicar o ambiente de trabalho?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Conflito com Colegas' },
  { area: 'varejo', texto: 'A loja recebeu um produto novo que você não conhece bem e um cliente pergunta detalhes técnicos. Como você conduz o atendimento sem perder a venda?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Produtos Novos' },
  { area: 'varejo', texto: 'O gerente estabeleceu uma meta que você considera impossível de atingir. Como você comunica suas preocupações sem parecer que está se esquivando do desafio?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação com Gestão' },
  { area: 'varejo', texto: 'Você percebe que a estratégia de vendas que a empresa está adotando não está funcionando no seu segmento de clientes. O que você faz com essa observação?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback Estratégico' },
  { area: 'varejo', texto: 'Um novato que você ajudou a treinar está vendendo mais que você este mês. Como você lida com essa situação emocionalmente e profissionalmente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Maturidade Profissional' },
];

export const vendedorLojaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'varejo', texto: 'Vendedores seniores frequentemente assumem papel de mentoria formal ou informal. Como você estrutura um programa de desenvolvimento para novos vendedores da equipe?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Mentoria Estruturada' },
  { area: 'varejo', texto: 'Análise de comportamento de compra e tendências de mercado ajudam a antecipar demandas. Como você usa essas informações para melhorar suas vendas e orientar a loja?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise de Mercado' },
  { area: 'varejo', texto: 'Gestão de relacionamento com clientes corporativos ou de grande valor exige abordagem diferenciada. Como você estrutura o atendimento a esse perfil de cliente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Clientes Corporativos' },
  { area: 'varejo', texto: 'Participação em feiras, eventos e lançamentos de produtos fazem parte do trabalho de vendedores experientes. Como você representa a marca e maximiza resultados nessas ocasiões?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Eventos e Feiras' },
  { area: 'varejo', texto: 'Vendedores seniores frequentemente contribuem para definição de metas e estratégias. Como você analisa dados de vendas para propor ajustes na estratégia comercial?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Contribuição Estratégica' },
  { area: 'varejo', texto: 'Vendas omnichannel integram loja física, e-commerce e redes sociais. Como você atua de forma integrada nesses canais para maximizar suas vendas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Vendas Omnichannel' },
  { area: 'varejo', texto: 'Negociações de alto valor frequentemente envolvem condições especiais, financiamento e pacotes customizados. Como você estrutura propostas complexas para clientes exigentes?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Negociações Complexas' },

  // Experiência (7)
  { area: 'varejo', texto: 'Conte-me sobre o vendedor que você mais ajudou a desenvolver. Como foi esse processo e o que ele conquistou com seu apoio?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Desenvolvimento de Pessoas' },
  { area: 'varejo', texto: 'Você já participou de um projeto de mudança de estratégia comercial da loja? Conte-me qual foi sua contribuição e os resultados obtidos.', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Projetos Estratégicos' },
  { area: 'varejo', texto: 'Me conte sobre sua maior venda ou contrato. Qual era o contexto, como você conduziu o processo e qual foi o resultado?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Grandes Vendas' },
  { area: 'varejo', texto: 'Você já recuperou um cliente importante que tinha sido perdido para a concorrência? Como foi esse processo de reconquista?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Reconquista de Clientes' },
  { area: 'varejo', texto: 'Conte-me sobre uma situação em que você identificou uma oportunidade de mercado que a empresa não estava explorando. O que você propôs e qual foi o resultado?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Identificação de Oportunidades' },
  { area: 'varejo', texto: 'Você já liderou ou participou da inauguração de uma nova loja? Como foi sua contribuição para montar a operação comercial?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Abertura de Loja' },
  { area: 'varejo', texto: 'Me conte sobre um período de crise no varejo (econômica, pandemia, etc.) e como você se adaptou para manter seus resultados.', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Resiliência em Crise' },

  // Comportamental (7)
  { area: 'varejo', texto: 'Com sua experiência, qual você diria que é o segredo para ser um vendedor de alta performance de forma consistente ao longo dos anos?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Filosofia de Vendas' },
  { area: 'varejo', texto: 'Vendedores seniores são consultados pela gestão para decisões importantes. Como você lida com essa responsabilidade e influência na operação?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Influência Organizacional' },
  { area: 'varejo', texto: 'Manter-se relevante num mercado que muda rapidamente é desafiador. Como você se atualiza sobre novas tendências de consumo e tecnologias de vendas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Atualização Contínua' },
  { area: 'varejo', texto: 'Que legado você quer deixar para os vendedores mais novos? O que você gostaria que aprendessem com você?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Legado' },
  { area: 'varejo', texto: 'Como você equilibra resultados de curto prazo (metas mensais) com construção de relacionamentos de longo prazo com clientes?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },
  { area: 'varejo', texto: 'Que mudanças você observou no perfil do consumidor ao longo da sua carreira e como você adaptou sua abordagem a essas mudanças?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Evolução do Mercado' },
  { area: 'varejo', texto: 'Qual sua visão sobre o futuro do varejo físico e como vendedores podem se preparar para as mudanças que estão por vir?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Futuro' },

  // Situacional (7)
  { area: 'varejo', texto: 'A direção da empresa quer implementar uma mudança na política comercial que você acredita ser prejudicial para as vendas. Como você apresenta sua visão?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Influência Ascendente' },
  { area: 'varejo', texto: 'Um cliente de alto valor está sendo assediado pela concorrência com ofertas agressivas. Como você trabalha para manter esse cliente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Retenção de Clientes' },
  { area: 'varejo', texto: 'O gerente pede sua opinião sobre promover um vendedor a líder de equipe. Há dois candidatos com perfis diferentes. Como você avalia e fundamenta sua recomendação?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Avaliação de Talentos' },
  { area: 'varejo', texto: 'A loja está com resultados abaixo do esperado há meses e a equipe está desmotivada. Que ações você tomaria para ajudar a reverter o cenário?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Liderança em Crise' },
  { area: 'varejo', texto: 'Você foi convidado a assumir uma posição de liderança formal, mas isso significa deixar as vendas diretas. Como você avalia essa proposta?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Transição de Carreira' },
  { area: 'varejo', texto: 'Há tensão entre a equipe de vendas e outras áreas (estoque, caixa, crediário). Como você atuaria para melhorar essa integração?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Integração de Áreas' },
  { area: 'varejo', texto: 'Um novo formato de loja está sendo testado e você foi convidado a ser o vendedor referência na operação piloto. Como você aborda esse desafio?', cargo: 'Atendente / Vendedor de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Inovação' },
];

// ============================================
// SUPERVISOR / LÍDER DE LOJA
// ============================================

export const supervisorLojaJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'Gestão de escala é um quebra-cabeça constante. Me explique como você elabora escalas de trabalho considerando demanda, folgas, preferências da equipe e legislação trabalhista?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Escala' },
  { area: 'varejo', texto: 'Indicadores de loja orientam a tomada de decisão. Quais KPIs você considera mais importantes acompanhar e como você usa esses dados para direcionar ações da equipe?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Indicadores de Loja' },
  { area: 'varejo', texto: 'Abertura e fechamento de loja têm procedimentos específicos. Me explique sua rotina nesses momentos - que conferências você faz e como garante que tudo está em ordem?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Abertura e Fechamento' },
  { area: 'varejo', texto: 'Treinamentos práticos no dia a dia desenvolvem a equipe. Como você identifica necessidades de treinamento e como conduz capacitações rápidas durante o expediente?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Treinamento de Equipe' },
  { area: 'varejo', texto: 'Gestão de caixa e conferência de valores são responsabilidades críticas. Como você organiza a rotina de conferência e o que faz quando identifica divergências?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Caixa' },
  { area: 'varejo', texto: 'Distribuição de tarefas é parte da rotina do supervisor. Como você delega atividades considerando as habilidades e o desenvolvimento de cada membro da equipe?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Delegação' },

  // Experiência (5)
  { area: 'varejo', texto: 'A transição de vendedor para líder é um desafio. Conte-me como foi essa mudança para você - o que foi mais difícil de adaptar e como você conquistou o respeito dos antigos colegas?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Transição para Liderança' },
  { area: 'varejo', texto: 'Gerenciar desempenho da equipe inclui conversas difíceis. Me conte sobre uma situação em que você precisou dar feedback corretivo a um colaborador - como você conduziu?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback' },
  { area: 'varejo', texto: 'Datas de pico como Black Friday ou Natal testam a capacidade do líder. Conte-me sobre uma dessas ocasiões que você liderou - como organizou a operação e que resultados alcançou?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Operação em Alta Demanda' },
  { area: 'varejo', texto: 'Conflitos entre membros da equipe afetam o clima da loja. Me fale sobre uma situação de conflito que você mediou - qual era a questão e como você resolveu?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Mediação de Conflitos' },
  { area: 'varejo', texto: 'Conte-me sobre um colaborador que você desenvolveu e que cresceu na empresa. O que você fez para ajudá-lo e como foi ver esse crescimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Desenvolvimento de Pessoas' },

  // Comportamental (5)
  { area: 'varejo', texto: 'O líder é exemplo para a equipe em tudo que faz. Como você se comporta para inspirar os colaboradores pelo exemplo, especialmente em momentos de pressão?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Liderança pelo Exemplo' },
  { area: 'varejo', texto: 'Liderar envolve tomar decisões que nem sempre agradam a todos. Como você lida com a pressão de decidir rapidamente e assumir a responsabilidade pelos resultados?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { area: 'varejo', texto: 'Cada pessoa da equipe é diferente e precisa de abordagem distinta. Como você adapta seu estilo de liderança para extrair o melhor de cada perfil de colaborador?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Flexibilidade de Liderança' },
  { area: 'varejo', texto: 'A rotina de varejo é intensa e o líder precisa estar presente. Como você equilibra as demandas do trabalho com sua vida pessoal e evita o esgotamento?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Equilíbrio' },
  { area: 'varejo', texto: 'Comunicação clara é essencial para o líder. Como você garante que sua equipe entende as expectativas, metas e prioridades?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Comunicação' },

  // Situacional (5)
  { area: 'varejo', texto: 'Um funcionário seu não está batendo as metas e parece desmotivado. Outros da equipe percebem e começam a reclamar. Como você aborda essa situação?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Baixo Desempenho' },
  { area: 'varejo', texto: 'Um cliente faz uma reclamação grave sobre um membro da sua equipe na sua frente. Como você gerencia a situação protegendo tanto o cliente quanto o funcionário?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Reclamação de Cliente' },
  { area: 'varejo', texto: 'Dois funcionários seus têm um desentendimento sério e se recusam a trabalhar no mesmo turno. Como você resolve isso mantendo a operação funcionando?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Conflito de Equipe' },
  { area: 'varejo', texto: 'A regional pede que você implemente uma mudança de processo que você sabe que a equipe vai resistir. Como você conduz essa implementação?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Mudança' },
  { area: 'varejo', texto: 'Um colaborador pede para sair mais cedo por motivo pessoal num dia de alta demanda. A equipe já está no limite. Como você decide?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Decisões Difíceis' },
];

export const supervisorLojaPleno: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'varejo', texto: 'Otimização de custos operacionais é responsabilidade do líder de loja. Que alavancas você utiliza para controlar despesas sem comprometer a operação ou o atendimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Custos' },
  { area: 'varejo', texto: 'Prevenção de perdas é responsabilidade de toda a operação. Como você engaja sua equipe na cultura de prevenção e quais processos você implementa para reduzir perdas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Prevenção de Perdas' },
  { area: 'varejo', texto: 'Planejamento comercial da loja envolve prever demanda e preparar a operação. Como você se prepara para períodos sazonais e como traduz o plano comercial em ações práticas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento Comercial' },
  { area: 'varejo', texto: 'Processos de contratação definem o futuro da equipe. Como você conduz seleções para sua loja - que critérios prioriza e como avalia candidatos além do currículo?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Recrutamento' },
  { area: 'varejo', texto: 'Gestão de estoque impacta vendas e capital de giro. Como você monitora níveis de estoque, identifica produtos parados e toma decisões sobre pedidos e promoções?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Estoque' },
  { area: 'varejo', texto: 'Análise de resultados e elaboração de planos de ação fazem parte da rotina de supervisores plenos. Como você estrutura uma análise de desempenho da loja e define prioridades?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Análise de Desempenho' },

  // Experiência (6)
  { area: 'varejo', texto: 'Viradas de resultado em lojas com problemas são marcantes. Conte-me sobre uma loja ou equipe com dificuldades que você conseguiu transformar - o que você fez de diferente?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Turnaround' },
  { area: 'varejo', texto: 'Formar líderes é multiplicar sua capacidade. Me fale sobre alguém que você desenvolveu para posição de liderança - como foi esse processo de desenvolvimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desenvolvimento de Líderes' },
  { area: 'varejo', texto: 'Implantar mudanças significativas na operação exige planejamento. Conte-me sobre uma mudança importante que você liderou - como você planejou e executou a implementação?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de Mudanças' },
  { area: 'varejo', texto: 'Resultados consistentes diferenciam bons líderes. Me conte sobre sua trajetória de resultados - como você consegue manter a performance da sua equipe de forma sustentável?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resultados Consistentes' },
  { area: 'varejo', texto: 'Conte-me sobre uma situação em que você precisou reduzir custos significativamente. Que decisões tomou e como minimizou o impacto na operação?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Redução de Custos' },
  { area: 'varejo', texto: 'Você já precisou demitir alguém da sua equipe? Conte-me como foi esse processo e como você comunicou e conduziu a situação.', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desligamentos' },

  // Comportamental (6)
  { area: 'varejo', texto: 'Liderar líderes ou supervisores requer abordagem diferente. Como você adapta seu estilo quando tem outros líderes reportando a você?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderar Líderes' },
  { area: 'varejo', texto: 'O líder de loja faz a ponte entre a operação e a matriz. Como você representa os interesses da sua equipe para a empresa e vice-versa de forma equilibrada?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Papel de Interface' },
  { area: 'varejo', texto: 'Manter-se atualizado sobre tendências de varejo e gestão é importante. Como você se desenvolve como líder e aplica novos conhecimentos na sua operação?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento Contínuo' },
  { area: 'varejo', texto: 'Com sua experiência, qual sua visão sobre os desafios do varejo nos próximos anos e como você está preparando sua operação para eles?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Visão Estratégica' },
  { area: 'varejo', texto: 'Como você construiu sua credibilidade como líder? O que você faz para manter a confiança da equipe e dos superiores?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Credibilidade' },
  { area: 'varejo', texto: 'Qual seu estilo de liderança e como ele evoluiu ao longo da sua carreira? O que você aprendeu sobre liderar pessoas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Estilo de Liderança' },

  // Situacional (6)
  { area: 'varejo', texto: 'A regional cobra resultados melhores, mas você avalia que sua equipe já está no limite. Como você negocia metas realistas sem parecer que está se esquivando?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação de Metas' },
  { area: 'varejo', texto: 'Um colaborador seu, que é excelente em vendas, está tendo problemas pessoais que afetam seu trabalho. Como você equilibra apoio humano com necessidades do negócio?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Apoio a Colaboradores' },
  { area: 'varejo', texto: 'Surgiu uma oportunidade de promoção para você, mas sua saída pode desestabilizar a loja que você construiu. Como você avalia essa situação?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Desenvolvimento de Carreira' },
  { area: 'varejo', texto: 'Há um processo da empresa que você acredita ser ineficiente, mas mudá-lo não está na sua alçada. Como você lida com essa frustração e o que faz a respeito?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Influência Ascendente' },
  { area: 'varejo', texto: 'Um concorrente abriu uma loja próxima e está afetando seus resultados. Que ações táticas você implementaria para defender seu mercado?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Competição' },
  { area: 'varejo', texto: 'Você precisa implementar um corte de pessoal exigido pela empresa. Como você decide quem desligar e como comunica para a equipe que fica?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Reestruturação' },
];

export const supervisorLojaSenior: PerguntaSeed[] = [
  // Técnica (7)
  { area: 'varejo', texto: 'Gestão de múltiplas lojas exige visão sistêmica. Como você equilibra atenção às particularidades de cada unidade com a padronização de processos e cultura?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Multilojas' },
  { area: 'varejo', texto: 'Análise de P&L de loja é competência estratégica. Como você lê e interpreta demonstrativos financeiros para identificar oportunidades e problemas na operação?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise Financeira' },
  { area: 'varejo', texto: 'Expansão de rede envolve abertura de novas lojas. Conte-me sobre sua experiência com inaugurações - desde a montagem de equipe até a estabilização da operação.', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Abertura de Lojas' },
  { area: 'varejo', texto: 'Projetos de transformação operacional mudam a forma como a loja funciona. Como você planeja e executa mudanças de grande escala minimizando impactos na operação?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Transformação Operacional' },
  { area: 'varejo', texto: 'Definir estratégias de sortimento e precificação afeta diretamente os resultados. Como você analisa dados de vendas para tomar decisões sobre mix de produtos e preços?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia Comercial' },
  { area: 'varejo', texto: 'Elaboração e gestão de orçamento anual são responsabilidades de líderes seniores. Como você constrói um orçamento realista e monitora sua execução ao longo do ano?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Orçamentária' },
  { area: 'varejo', texto: 'Implementação de tecnologia no varejo transforma a operação. Como você avalia novas tecnologias, planeja a implementação e garante a adoção pela equipe?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Transformação Digital' },

  // Experiência (7)
  { area: 'varejo', texto: 'Líderes experientes são chamados para situações de crise. Conte-me sobre uma crise operacional grave que você gerenciou - qual era o cenário e como você conduziu?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },
  { area: 'varejo', texto: 'Programas de desenvolvimento de equipe têm impacto duradouro. Me fale sobre uma iniciativa de capacitação que você criou e implementou - como foi desenhada e quais resultados trouxe?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Programa de Desenvolvimento' },
  { area: 'varejo', texto: 'Negociações com fornecedores ou parceiros fazem diferença nos resultados. Conte-me sobre uma negociação significativa que você conduziu e como chegou ao acordo.', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Negociação Estratégica' },
  { area: 'varejo', texto: 'Resultados excepcionais diferenciam sua trajetória. Qual foi a conquista profissional de que você mais se orgulha e o que a tornou possível?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Conquistas' },
  { area: 'varejo', texto: 'Construir cultura organizacional forte é legado de líderes. Como você molda e preserva a cultura da sua operação, especialmente durante períodos de mudança?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Cultura Organizacional' },
  { area: 'varejo', texto: 'Conte-me sobre um projeto de integração pós-aquisição ou fusão que você participou. Quais foram os desafios de unir diferentes culturas operacionais?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Integração' },
  { area: 'varejo', texto: 'Me fale sobre uma situação em que você precisou defender sua operação de decisões corporativas que considerava equivocadas. Como você se posicionou?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Advocacy' },

  // Comportamental (7)
  { area: 'varejo', texto: 'Líderes seniores são referência para toda a organização. Como você constrói e mantém sua credibilidade junto a pares, superiores e equipe?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Credibilidade' },
  { area: 'varejo', texto: 'Tomar decisões impopulares mas necessárias é parte da liderança. Conte-me sobre uma dessas decisões e como você a comunicou e implementou.', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Decisões Difíceis' },
  { area: 'varejo', texto: 'Formar a próxima geração de líderes de varejo é seu legado. Quantos líderes você desenvolveu ao longo da carreira e qual sua filosofia de desenvolvimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Legado' },
  { area: 'varejo', texto: 'O varejo brasileiro enfrenta desafios significativos. Qual sua leitura do cenário e como você está posicionando sua operação para o futuro?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Mercado' },
  { area: 'varejo', texto: 'Equilibrar resultados de curto prazo com construção de longo prazo é desafiador. Como você gerencia essa tensão no dia a dia?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },
  { area: 'varejo', texto: 'Como você gerencia sua própria energia e evita o burnout numa posição de alta demanda? Que práticas de autocuidado você adota?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Gestão de Energia' },
  { area: 'varejo', texto: 'Qual conselho você daria para alguém que está começando a trilhar o caminho de liderança no varejo? O que você gostaria de ter aprendido antes?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Mentoria' },

  // Situacional (7)
  { area: 'varejo', texto: 'O board quer entender os riscos operacionais das suas lojas. Como você estrutura essa análise e apresenta para a liderança executiva?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Reporte Executivo' },
  { area: 'varejo', texto: 'Uma decisão da matriz afeta negativamente suas lojas e você discorda tecnicamente. Como você apresenta sua posição de forma construtiva?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { area: 'varejo', texto: 'Há uma oportunidade de adquirir um concorrente regional. Como você avaliaria essa operação do ponto de vista de operações?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Avaliação de Aquisição' },
  { area: 'varejo', texto: 'A empresa está considerando fechamento de lojas deficitárias que você lidera. Como você conduz esse processo protegendo as pessoas e a marca?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Fechamento de Loja' },
  { area: 'varejo', texto: 'Um cenário econômico adverso exige reestruturação. Como você planeja e executa redução de custos significativa minimizando impactos no atendimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
  { area: 'varejo', texto: 'Você foi convidado para um cargo de diretoria, mas teria que se mudar de cidade. Como você avalia essa decisão considerando carreira e vida pessoal?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Decisões de Carreira' },
  { area: 'varejo', texto: 'Um grande investidor quer entender o potencial de crescimento da sua operação. Como você estrutura uma apresentação que demonstre esse potencial?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Apresentação para Investidores' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasVarejo: PerguntaSeed[] = [
  ...operadorCaixaJunior,
  ...operadorCaixaPleno,
  ...repositorJunior,
  ...repositorPleno,
  ...fiscalPerdasJunior,
  ...fiscalPerdasPleno,
  ...vendedorLojaJunior,
  ...vendedorLojaPleno,
  ...vendedorLojaSenior,
  ...supervisorLojaJunior,
  ...supervisorLojaPleno,
  ...supervisorLojaSenior,
];

export const estatisticasVarejo = {
  total: perguntasVarejo.length,
  porCargo: {
    'Operador de Caixa Junior': operadorCaixaJunior.length,
    'Operador de Caixa Pleno': operadorCaixaPleno.length,
    'Repositor / Auxiliar de Loja Junior': repositorJunior.length,
    'Repositor / Auxiliar de Loja Pleno': repositorPleno.length,
    'Fiscal de Prevenção e Perdas Junior': fiscalPerdasJunior.length,
    'Fiscal de Prevenção e Perdas Pleno': fiscalPerdasPleno.length,
    'Atendente / Vendedor de Loja Junior': vendedorLojaJunior.length,
    'Atendente / Vendedor de Loja Pleno': vendedorLojaPleno.length,
    'Atendente / Vendedor de Loja Senior': vendedorLojaSenior.length,
    'Supervisor / Líder de Loja Junior': supervisorLojaJunior.length,
    'Supervisor / Líder de Loja Pleno': supervisorLojaPleno.length,
    'Supervisor / Líder de Loja Senior': supervisorLojaSenior.length,
  },
};
