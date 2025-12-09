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

export const operadorCaixa: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'O caixa é o ponto onde todas as transações se concretizam. Poderia me explicar como você confere o fundo de caixa na abertura e realiza o fechamento no final do turno? Que cuidados você toma para garantir que tudo feche corretamente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Abertura e Fechamento' },
  { texto: 'Trabalhamos com diversos meios de pagamento hoje em dia - dinheiro, cartões, PIX, vouchers. Me conte como você processa cada um deles e quais são os cuidados específicos para evitar erros ou fraudes?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Meios de Pagamento' },
  { texto: 'Lidar com dinheiro exige atenção redobrada. Que técnicas você utiliza para conferir notas recebidas, dar troco corretamente e identificar notas falsas? Pode me dar exemplos práticos?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Manuseio de Dinheiro' },
  { texto: 'Cancelamentos e devoluções fazem parte da rotina do caixa. Me explique como você procede quando precisa cancelar um item ou uma compra inteira, e como registra essas operações para que o caixa feche corretamente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'tecnica', competencia: 'Cancelamentos e Devoluções' },

  // Experiência (4)
  { texto: 'Filas longas testam a paciência dos clientes e a eficiência do operador. Conte-me sobre um dia de movimento intenso que você enfrentou - como conseguiu manter a agilidade sem comprometer a qualidade do atendimento?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Alta Demanda' },
  { texto: 'Problemas técnicos acontecem nos piores momentos. Me fale sobre uma situação em que o sistema travou ou deu problema durante uma operação - como você contornou e finalizou o atendimento?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Problemas Técnicos' },
  { texto: 'Cada empresa tem suas particularidades no caixa. Me conte sobre sua experiência anterior - quais sistemas você operou e como foi sua adaptação a cada um deles?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Sistemas e Adaptação' },
  { texto: 'Diferenças no caixa são situações delicadas. Você já passou por isso? Conte-me o que aconteceu, como identificou o problema e quais medidas foram tomadas.', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'experiencia', competencia: 'Diferenças de Caixa' },

  // Comportamental (4)
  { texto: 'O operador de caixa é muitas vezes a última impressão que o cliente leva da loja. O que você considera essencial para deixar uma impressão positiva, mesmo em um atendimento rápido?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Atendimento ao Cliente' },
  { texto: 'Passar horas em pé, com movimentos repetitivos e alta concentração pode ser desgastante. Como você cuida de si mesmo para manter o foco e a energia ao longo do turno inteiro?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Resistência e Autocuidado' },
  { texto: 'Precisão é fundamental quando se lida com dinheiro. Como você se organiza mentalmente para evitar distrações e manter a atenção mesmo em dias mais corridos ou cansativos?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Concentração' },
  { texto: 'Trabalhar em varejo significa lidar com todo tipo de pessoa. O que te motiva nesse tipo de trabalho e como você mantém a cordialidade mesmo quando está tendo um dia difícil?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },

  // Situacional (4)
  { texto: 'Um cliente chega ao caixa já irritado com algo que aconteceu na loja e desconta em você. Como você conduziria essa situação mantendo a calma e buscando resolver o problema?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Conflitos' },
  { texto: 'Você percebe que um cliente está tentando passar um produto no código de outro mais barato. O que você faz nessa situação delicada, considerando que precisa agir sem ofender o cliente?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Integridade' },
  { texto: 'A fila está enorme, o sistema está lento e um cliente começa a reclamar em voz alta, deixando outros clientes desconfortáveis. Como você administraria essa situação?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Pressão' },
  { texto: 'No fechamento do caixa, você identifica que está faltando um valor considerável. Quais seriam seus passos imediatos e como você comunicaria isso ao supervisor?', cargo: 'Operador de Caixa', nivel: 'junior', categoria: 'situacional', competencia: 'Transparência' },
];

// ============================================
// REPOSITOR / AUXILIAR DE LOJA
// ============================================

export const repositor: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'A reposição eficiente garante que o cliente encontre o que procura. Me explique como você organiza sua rotina de reposição - como prioriza quais produtos repor primeiro e como mantém as gôndolas sempre abastecidas?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Rotina de Reposição' },
  { texto: 'O sistema PEPS (primeiro que entra, primeiro que sai) é essencial para produtos com validade. Poderia me explicar como você aplica essa técnica na prática e quais cuidados toma para evitar perdas por vencimento?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'PEPS e Validade' },
  { texto: 'A organização visual das gôndolas influencia diretamente as vendas. Que técnicas você conhece e utiliza para manter as prateleiras atrativas e facilitar a experiência de compra do cliente?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Visual Merchandising' },
  { texto: 'Receber mercadorias exige conferência atenta. Me conte como você realiza a conferência de produtos no recebimento - o que você verifica e como procede quando encontra divergências?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Recebimento' },

  // Experiência (4)
  { texto: 'Datas sazonais como Natal, Páscoa ou Dia das Mães exigem reposição intensiva. Conte-me sobre uma dessas ocasiões em que você trabalhou - como foi a organização e quais desafios você enfrentou?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Alta Demanda Sazonal' },
  { texto: 'Trabalhar no estoque exige organização para encontrar rapidamente o que se precisa. Me fale sobre como você mantinha o estoque organizado e como localizava produtos com agilidade.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Organização de Estoque' },
  { texto: 'Produtos avariados ou com problemas de qualidade aparecem ocasionalmente. Conte-me sobre uma situação em que você identificou um lote com problema - como procedeu?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Controle de Qualidade' },
  { texto: 'Além da reposição, o auxiliar de loja frequentemente atende clientes. Me conte sobre uma interação memorável com um cliente que te procurou para ajudar a encontrar um produto.', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Atendimento' },

  // Comportamental (4)
  { texto: 'O trabalho de reposição exige esforço físico considerável - carregar caixas, subir escadas, ficar em movimento o dia todo. Como você cuida da sua saúde para manter a disposição nesse ritmo?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Preparo Físico' },
  { texto: 'Trabalhar em equipe no salão de vendas exige coordenação. Como você se relaciona com colegas quando precisam dividir tarefas ou cobrir setores uns dos outros?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { texto: 'Manter a atenção aos detalhes é crucial para não deixar produtos mal posicionados ou fora do lugar. O que você faz para manter esse olhar atento durante todo o expediente?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Atenção aos Detalhes' },
  { texto: 'O que te atrai no trabalho de varejo e especificamente na área de reposição? O que você considera mais gratificante nessa função?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },

  // Situacional (4)
  { texto: 'Você está abastecendo uma seção quando percebe que um produto muito procurado acabou e não há mais no estoque. Um cliente pergunta sobre ele. Como você conduz essa situação?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Ruptura de Estoque' },
  { texto: 'Durante o expediente, você nota que um cliente está colocando produtos dentro da bolsa discretamente. O que você faria nessa situação, considerando os protocolos de segurança?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Prevenção de Perdas' },
  { texto: 'Chegou uma carga grande de mercadorias e há muitas tarefas pendentes no salão ao mesmo tempo. Como você priorizaria as atividades para dar conta de tudo?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Priorização' },
  { texto: 'Você percebe que um colega está guardando produtos de forma incorreta, comprometendo a organização do setor. Como você abordaria essa situação sem criar conflito?', cargo: 'Repositor / Auxiliar de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Comunicação com Colegas' },
];

// ============================================
// FISCAL DE PREVENÇÃO E PERDAS
// ============================================

export const fiscalPerdas: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'A prevenção de perdas envolve muito mais do que vigiar. Poderia me explicar quais são os principais tipos de perdas no varejo e que estratégias você considera mais eficazes para cada um deles?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Tipos de Perdas' },
  { texto: 'Os sistemas antifurto são ferramentas importantes do seu trabalho. Me conte sobre sua experiência com diferentes equipamentos - alarmes, etiquetas, câmeras - e como você os utiliza de forma integrada?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Sistemas de Segurança' },
  { texto: 'A abordagem de um suspeito requer técnica e cuidado jurídico. Como você procede quando identifica um possível furto em andamento? Quais são os limites legais da sua atuação?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Abordagem' },
  { texto: 'Inventários revelam a real situação das perdas. Me explique sua experiência com processos de inventário - como você participa, o que analisa e como contribui para identificar as causas das diferenças?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'tecnica', competencia: 'Inventário' },

  // Experiência (4)
  { texto: 'Flagrar um furto é situação tensa que exige sangue frio. Conte-me sobre uma ocorrência que você vivenciou - como identificou, como agiu e como a situação foi resolvida?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Ocorrências' },
  { texto: 'Perdas operacionais muitas vezes superam os furtos externos. Me fale sobre uma situação em que você identificou um processo interno que estava causando perdas e como contribuiu para a solução.', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Perdas Operacionais' },
  { texto: 'Monitoramento por câmeras exige atenção constante. Você já identificou algo suspeito através do CFTV? Conte-me como foi sua observação e a ação que tomou.', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Monitoramento' },
  { texto: 'Trabalhar em prevenção de perdas às vezes envolve lidar com situações tensas, incluindo reações agressivas. Você já passou por algo assim? Como manteve a calma e a segurança?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'experiencia', competencia: 'Situações de Risco' },

  // Comportamental (4)
  { texto: 'A discrição é essencial na prevenção de perdas - você observa sem ser notado. Como você desenvolve essa habilidade de estar atento a tudo sem parecer estar vigiando?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Discrição' },
  { texto: 'Seu trabalho exige suspeitar de pessoas, mas sem cair em preconceitos. Como você mantém um olhar técnico e imparcial, evitando julgamentos baseados em aparência?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Imparcialidade' },
  { texto: 'Ficar atento durante longas horas pode ser mentalmente cansativo. Como você mantém o estado de alerta e concentração durante todo o expediente?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Vigilância' },
  { texto: 'Prevenção de perdas trabalha junto com toda a operação da loja. Como você constrói um relacionamento colaborativo com os demais funcionários, sendo visto como parceiro e não como fiscalizador?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'comportamental', competencia: 'Relacionamento Interno' },

  // Situacional (4)
  { texto: 'Você percebe que um funcionário está colocando produtos de lado para levar depois. Essa é uma situação delicada que envolve um colega de trabalho. Como você procederia?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Furto Interno' },
  { texto: 'Um cliente está claramente com mercadoria escondida, mas quando você se aproxima, ele age de forma agressiva e ameaçadora. Quais são seus próximos passos?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Reação Agressiva' },
  { texto: 'Você está sozinho na loja e identifica um grupo de pessoas agindo de forma coordenada para furtar. A situação parece perigosa. O que você faz?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Avaliação de Risco' },
  { texto: 'Após uma abordagem, você descobre que se enganou - o cliente havia pago pelo produto. Como você conduz essa situação delicada de forma a preservar a imagem da loja e a dignidade do cliente?', cargo: 'Fiscal de Prevenção e Perdas', nivel: 'junior', categoria: 'situacional', competencia: 'Abordagem Equivocada' },
];

// ============================================
// ATENDENTE / VENDEDOR DE LOJA
// ============================================

export const vendedorLojaJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Conhecer bem os produtos é fundamental para vender. Como você se prepara para conhecer o que está vendendo? Que informações você considera essenciais dominar sobre cada produto?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Conhecimento de Produtos' },
  { texto: 'Entender o que o cliente realmente precisa é o primeiro passo para uma boa venda. Que perguntas você costuma fazer para identificar as necessidades do cliente sem parecer invasivo?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Sondagem' },
  { texto: 'Oferecer produtos complementares aumenta o ticket médio. Me explique como você identifica oportunidades de venda adicional de forma natural, sem parecer que está empurrando produtos?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Venda Adicional' },
  { texto: 'Fechar a venda é uma etapa crítica. Que técnicas você utiliza para conduzir o cliente à decisão de compra sem pressioná-lo de forma desconfortável?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Fechamento' },

  // Experiência (4)
  { texto: 'Todo vendedor tem aquela venda marcante que foi especialmente desafiadora ou gratificante. Conte-me sobre uma venda assim - o que a tornou especial e o que você fez de diferente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Vendas Marcantes' },
  { texto: 'Clientes indecisos exigem paciência e habilidade. Me fale sobre uma situação em que você conseguiu ajudar um cliente muito indeciso a tomar uma decisão com a qual ele ficou satisfeito.', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Clientes Indecisos' },
  { texto: 'Bater metas é parte do trabalho em vendas. Conte-me sobre um período em que você conseguiu superar suas metas - o que você fez de diferente que contribuiu para esse resultado?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Resultados' },
  { texto: 'Nem sempre conseguimos converter o atendimento em venda. Me conte sobre uma venda que você perdeu e o que aprendeu com essa experiência.', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Aprendizado com Perdas' },

  // Comportamental (4)
  { texto: 'Vendas podem ter altos e baixos - alguns dias tudo flui, outros nada dá certo. Como você mantém a motivação e a energia nos dias mais difíceis?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Resiliência' },
  { texto: 'Trabalhar em equipe de vendas envolve competição saudável, mas também colaboração. Como você equilibra a busca por suas metas individuais com o apoio aos colegas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Trabalho em Equipe' },
  { texto: 'Clientes difíceis testam nossa paciência. Como você mantém a cordialidade e o profissionalismo mesmo quando o cliente é grosseiro ou desrespeitoso?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Inteligência Emocional' },
  { texto: 'O que te atrai na área de vendas? O que você considera mais gratificante nessa profissão e o que você acha mais desafiador?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Motivação' },

  // Situacional (4)
  { texto: 'Um cliente está claramente interessado em um produto que está fora do seu orçamento. Como você conduz essa situação - insiste no produto desejado ou apresenta alternativas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Adequação de Oferta' },
  { texto: 'Você está atendendo um cliente quando outro chega e parece ter pressa. Como você gerencia essa situação de forma que nenhum dos dois se sinta mal atendido?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Múltiplos Clientes' },
  { texto: 'O cliente quer um produto que você sabe que não é a melhor opção para a necessidade dele, mas é o mais caro. O que você faz - vende o que ele quer ou orienta para outra opção?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Ética em Vendas' },
  { texto: 'Um cliente reclama de um produto que comprou com você anteriormente e está insatisfeito. Como você conduz essa conversa para tentar reverter a situação?', cargo: 'Atendente / Vendedor de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Pós-Venda' },
];

export const vendedorLojaPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Vendedores experientes desenvolvem técnicas próprias de abordagem. Me conte como você adapta seu estilo de atendimento aos diferentes perfis de cliente que identifica na loja.', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Perfil de Clientes' },
  { texto: 'Contornar objeções é uma arte que se desenvolve com experiência. Quais são as objeções mais comuns que você enfrenta e como você as contorna de forma eficaz?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Contorno de Objeções' },
  { texto: 'Negociação de preços e condições é parte do dia a dia em muitas lojas. Como você conduz uma negociação para chegar a um acordo bom para o cliente e para a empresa?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Negociação' },
  { texto: 'Fidelizar clientes é mais rentável do que conquistar novos. Que estratégias você usa para criar relacionamento duradouro e fazer com que clientes retornem buscando especificamente você?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Fidelização' },
  { texto: 'Analisar indicadores de vendas ajuda a melhorar resultados. Quais métricas você acompanha do seu desempenho e como você usa esses dados para ajustar sua abordagem?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Indicadores' },

  // Experiência (4)
  { texto: 'Vendedores plenos frequentemente ajudam a treinar novatos. Conte-me sobre sua experiência orientando colegas mais novos - como você transmite seu conhecimento de vendas?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Treinamento' },
  { texto: 'Campanhas promocionais exigem adaptação rápida. Me fale sobre uma campanha desafiadora em que você participou - como você se preparou e quais resultados alcançou?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Campanhas' },
  { texto: 'Clientes VIP ou de alto valor merecem atenção diferenciada. Conte-me sobre sua experiência atendendo esse perfil de cliente - o que você faz de diferente?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Clientes VIP' },
  { texto: 'Todo vendedor passa por fases de resultados abaixo do esperado. Me conte sobre um período assim e o que você fez para virar o jogo e retomar seu desempenho.', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Superação' },

  // Comportamental (4)
  { texto: 'Ser referência de vendas na equipe traz responsabilidade. Como você lida com as expectativas sobre você e o que faz para manter a consistência nos resultados?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Consistência' },
  { texto: 'Pressão por metas é constante em vendas. Como você gerencia o estresse sem deixar transparecer para o cliente ou comprometer seu atendimento?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Gestão de Pressão' },
  { texto: 'Vendedores experientes às vezes resistem a mudanças de processos ou produtos. Como você lida quando a empresa implementa algo novo que muda sua forma de trabalhar?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Adaptabilidade' },
  { texto: 'Onde você se vê na carreira de vendas daqui a alguns anos? O que você está fazendo hoje para caminhar nessa direção?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento' },

  // Situacional (5)
  { texto: 'Um cliente regular seu está insatisfeito com uma compra e ameaça nunca mais voltar. Como você trabalharia para recuperar esse relacionamento importante?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Recuperação de Cliente' },
  { texto: 'Você identificou que um colega está desviando vendas que eram suas. Como você aborda essa situação delicada sem prejudicar o ambiente de trabalho?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Conflito com Colegas' },
  { texto: 'A loja recebeu um produto novo que você não conhece bem e um cliente pergunta detalhes técnicos. Como você conduz o atendimento sem perder a venda?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Produtos Novos' },
  { texto: 'O gerente estabeleceu uma meta que você considera impossível de atingir. Como você comunica suas preocupações sem parecer que está se esquivando do desafio?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Comunicação com Gestão' },
  { texto: 'Você percebe que a estratégia de vendas que a empresa está adotando não está funcionando no seu segmento de clientes. O que você faz com essa observação?', cargo: 'Atendente / Vendedor de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Feedback Estratégico' },
];

// ============================================
// SUPERVISOR / LÍDER DE LOJA
// ============================================

export const supervisorLojaJunior: PerguntaSeed[] = [
  // Técnica (4)
  { texto: 'Gestão de escala é um quebra-cabeça constante. Me explique como você elabora escalas de trabalho considerando demanda, folgas, preferências da equipe e legislação trabalhista?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Gestão de Escala' },
  { texto: 'Indicadores de loja orientam a tomada de decisão. Quais KPIs você considera mais importantes acompanhar e como você usa esses dados para direcionar ações da equipe?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Indicadores de Loja' },
  { texto: 'Abertura e fechamento de loja têm procedimentos específicos. Me explique sua rotina nesses momentos - que conferências você faz e como garante que tudo está em ordem?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Abertura e Fechamento' },
  { texto: 'Treinamentos práticos no dia a dia desenvolvem a equipe. Como você identifica necessidades de treinamento e como conduz capacitações rápidas durante o expediente?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'tecnica', competencia: 'Treinamento de Equipe' },

  // Experiência (4)
  { texto: 'A transição de vendedor para líder é um desafio. Conte-me como foi essa mudança para você - o que foi mais difícil de adaptar e como você conquistou o respeito dos antigos colegas?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Transição para Liderança' },
  { texto: 'Gerenciar desempenho da equipe inclui conversas difíceis. Me conte sobre uma situação em que você precisou dar feedback corretivo a um colaborador - como você conduziu?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Feedback' },
  { texto: 'Datas de pico como Black Friday ou Natal testam a capacidade do líder. Conte-me sobre uma dessas ocasiões que você liderou - como organizou a operação e que resultados alcançou?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Operação em Alta Demanda' },
  { texto: 'Conflitos entre membros da equipe afetam o clima da loja. Me fale sobre uma situação de conflito que você mediou - qual era a questão e como você resolveu?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'experiencia', competencia: 'Mediação de Conflitos' },

  // Comportamental (4)
  { texto: 'O líder é exemplo para a equipe em tudo que faz. Como você se comporta para inspirar os colaboradores pelo exemplo, especialmente em momentos de pressão?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Liderança pelo Exemplo' },
  { texto: 'Liderar envolve tomar decisões que nem sempre agradam a todos. Como você lida com a pressão de decidir rapidamente e assumir a responsabilidade pelos resultados?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Tomada de Decisão' },
  { texto: 'Cada pessoa da equipe é diferente e precisa de abordagem distinta. Como você adapta seu estilo de liderança para extrair o melhor de cada perfil de colaborador?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Flexibilidade de Liderança' },
  { texto: 'A rotina de varejo é intensa e o líder precisa estar presente. Como você equilibra as demandas do trabalho com sua vida pessoal e evita o esgotamento?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'comportamental', competencia: 'Equilíbrio' },

  // Situacional (4)
  { texto: 'Um funcionário seu não está batendo as metas e parece desmotivado. Outros da equipe percebem e começam a reclamar. Como você aborda essa situação?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Baixo Desempenho' },
  { texto: 'Um cliente faz uma reclamação grave sobre um membro da sua equipe na sua frente. Como você gerencia a situação protegendo tanto o cliente quanto o funcionário?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Reclamação de Cliente' },
  { texto: 'Dois funcionários seus têm um desentendimento sério e se recusam a trabalhar no mesmo turno. Como você resolve isso mantendo a operação funcionando?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Conflito de Equipe' },
  { texto: 'A regional pede que você implemente uma mudança de processo que você sabe que a equipe vai resistir. Como você conduz essa implementação?', cargo: 'Supervisor / Líder de Loja', nivel: 'junior', categoria: 'situacional', competencia: 'Gestão de Mudança' },
];

export const supervisorLojaPleno: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Otimização de custos operacionais é responsabilidade do líder de loja. Que alavancas você utiliza para controlar despesas sem comprometer a operação ou o atendimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Custos' },
  { texto: 'Prevenção de perdas é responsabilidade de toda a operação. Como você engaja sua equipe na cultura de prevenção e quais processos você implementa para reduzir perdas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Prevenção de Perdas' },
  { texto: 'Planejamento comercial da loja envolve prever demanda e preparar a operação. Como você se prepara para períodos sazonais e como traduz o plano comercial em ações práticas?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Planejamento Comercial' },
  { texto: 'Processos de contratação definem o futuro da equipe. Como você conduz seleções para sua loja - que critérios prioriza e como avalia candidatos além do currículo?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Recrutamento' },
  { texto: 'Gestão de estoque impacta vendas e capital de giro. Como você monitora níveis de estoque, identifica produtos parados e toma decisões sobre pedidos e promoções?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'tecnica', competencia: 'Gestão de Estoque' },

  // Experiência (4)
  { texto: 'Viradas de resultado em lojas com problemas são marcantes. Conte-me sobre uma loja ou equipe com dificuldades que você conseguiu transformar - o que você fez de diferente?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Turnaround' },
  { texto: 'Formar líderes é multiplicar sua capacidade. Me fale sobre alguém que você desenvolveu para posição de liderança - como foi esse processo de desenvolvimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Desenvolvimento de Líderes' },
  { texto: 'Implantar mudanças significativas na operação exige planejamento. Conte-me sobre uma mudança importante que você liderou - como você planejou e executou a implementação?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Implementação de Mudanças' },
  { texto: 'Resultados consistentes diferenciam bons líderes. Me conte sobre sua trajetória de resultados - como você consegue manter a performance da sua equipe de forma sustentável?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'experiencia', competencia: 'Resultados Consistentes' },

  // Comportamental (4)
  { texto: 'Liderar líderes ou supervisores requer abordagem diferente. Como você adapta seu estilo quando tem outros líderes reportando a você?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Liderar Líderes' },
  { texto: 'O líder de loja faz a ponte entre a operação e a matriz. Como você representa os interesses da sua equipe para a empresa e vice-versa de forma equilibrada?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Papel de Interface' },
  { texto: 'Manter-se atualizado sobre tendências de varejo e gestão é importante. Como você se desenvolve como líder e aplica novos conhecimentos na sua operação?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Desenvolvimento Contínuo' },
  { texto: 'Com sua experiência, qual sua visão sobre os desafios do varejo nos próximos anos e como você está preparando sua operação para eles?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'comportamental', competencia: 'Visão Estratégica' },

  // Situacional (5)
  { texto: 'A regional cobra resultados melhores, mas você avalia que sua equipe já está no limite. Como você negocia metas realistas sem parecer que está se esquivando?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Negociação de Metas' },
  { texto: 'Um colaborador seu, que é excelente em vendas, está tendo problemas pessoais que afetam seu trabalho. Como você equilibra apoio humano com necessidades do negócio?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Apoio a Colaboradores' },
  { texto: 'Surgiu uma oportunidade de promoção para você, mas sua saída pode desestabilizar a loja que você construiu. Como você avalia essa situação?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Desenvolvimento de Carreira' },
  { texto: 'Há um processo da empresa que você acredita ser ineficiente, mas mudá-lo não está na sua alçada. Como você lida com essa frustração e o que faz a respeito?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Influência Ascendente' },
  { texto: 'Um concorrente abriu uma loja próxima e está afetando seus resultados. Que ações táticas você implementaria para defender seu mercado?', cargo: 'Supervisor / Líder de Loja', nivel: 'pleno', categoria: 'situacional', competencia: 'Competição' },
];

export const supervisorLojaSenior: PerguntaSeed[] = [
  // Técnica (5)
  { texto: 'Gestão de múltiplas lojas exige visão sistêmica. Como você equilibra atenção às particularidades de cada unidade com a padronização de processos e cultura?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Gestão Multilojas' },
  { texto: 'Análise de P&L de loja é competência estratégica. Como você lê e interpreta demonstrativos financeiros para identificar oportunidades e problemas na operação?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Análise Financeira' },
  { texto: 'Expansão de rede envolve abertura de novas lojas. Conte-me sobre sua experiência com inaugurações - desde a montagem de equipe até a estabilização da operação.', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Abertura de Lojas' },
  { texto: 'Projetos de transformação operacional mudam a forma como a loja funciona. Como você planeja e executa mudanças de grande escala minimizando impactos na operação?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Transformação Operacional' },
  { texto: 'Definir estratégias de sortimento e precificação afeta diretamente os resultados. Como você analisa dados de vendas para tomar decisões sobre mix de produtos e preços?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'tecnica', competencia: 'Estratégia Comercial' },

  // Experiência (5)
  { texto: 'Líderes experientes são chamados para situações de crise. Conte-me sobre uma crise operacional grave que você gerenciou - qual era o cenário e como você conduziu?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Gestão de Crise' },
  { texto: 'Programas de desenvolvimento de equipe têm impacto duradouro. Me fale sobre uma iniciativa de capacitação que você criou e implementou - como foi desenhada e quais resultados trouxe?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Programa de Desenvolvimento' },
  { texto: 'Negociações com fornecedores ou parceiros fazem diferença nos resultados. Conte-me sobre uma negociação significativa que você conduziu e como chegou ao acordo.', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Negociação Estratégica' },
  { texto: 'Resultados excepcionais diferenciam sua trajetória. Qual foi a conquista profissional de que você mais se orgulha e o que a tornou possível?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Conquistas' },
  { texto: 'Construir cultura organizacional forte é legado de líderes. Como você molda e preserva a cultura da sua operação, especialmente durante períodos de mudança?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'experiencia', competencia: 'Cultura Organizacional' },

  // Comportamental (5)
  { texto: 'Líderes seniores são referência para toda a organização. Como você constrói e mantém sua credibilidade junto a pares, superiores e equipe?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Credibilidade' },
  { texto: 'Tomar decisões impopulares mas necessárias é parte da liderança. Conte-me sobre uma dessas decisões e como você a comunicou e implementou.', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Decisões Difíceis' },
  { texto: 'Formar a próxima geração de líderes de varejo é seu legado. Quantos líderes você desenvolveu ao longo da carreira e qual sua filosofia de desenvolvimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Legado' },
  { texto: 'O varejo brasileiro enfrenta desafios significativos. Qual sua leitura do cenário e como você está posicionando sua operação para o futuro?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Mercado' },
  { texto: 'Equilibrar resultados de curto prazo com construção de longo prazo é desafiador. Como você gerencia essa tensão no dia a dia?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'comportamental', competencia: 'Visão de Longo Prazo' },

  // Situacional (5)
  { texto: 'O board quer entender os riscos operacionais das suas lojas. Como você estrutura essa análise e apresenta para a liderança executiva?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Reporte Executivo' },
  { texto: 'Uma decisão da matriz afeta negativamente suas lojas e você discorda tecnicamente. Como você apresenta sua posição de forma construtiva?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Influência' },
  { texto: 'Há uma oportunidade de adquirir um concorrente regional. Como você avaliaria essa operação do ponto de vista de operações?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Avaliação de Aquisição' },
  { texto: 'A empresa está considerando fechamento de lojas deficitárias que você lidera. Como você conduz esse processo protegendo as pessoas e a marca?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Fechamento de Loja' },
  { texto: 'Um cenário econômico adverso exige reestruturação. Como você planeja e executa redução de custos significativa minimizando impactos no atendimento?', cargo: 'Supervisor / Líder de Loja', nivel: 'senior', categoria: 'situacional', competencia: 'Reestruturação' },
];

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntasVarejo: PerguntaSeed[] = [
  ...operadorCaixa,
  ...repositor,
  ...fiscalPerdas,
  ...vendedorLojaJunior,
  ...vendedorLojaPleno,
  ...supervisorLojaJunior,
  ...supervisorLojaPleno,
  ...supervisorLojaSenior,
];

export const estatisticasVarejo = {
  total: perguntasVarejo.length,
  porCargo: {
    'Operador de Caixa': operadorCaixa.length,
    'Repositor / Auxiliar de Loja': repositor.length,
    'Fiscal de Prevenção e Perdas': fiscalPerdas.length,
    'Atendente / Vendedor de Loja Junior': vendedorLojaJunior.length,
    'Atendente / Vendedor de Loja Pleno': vendedorLojaPleno.length,
    'Supervisor / Líder de Loja Junior': supervisorLojaJunior.length,
    'Supervisor / Líder de Loja Pleno': supervisorLojaPleno.length,
    'Supervisor / Líder de Loja Senior': supervisorLojaSenior.length,
  },
};
