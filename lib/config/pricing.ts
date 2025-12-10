/**
 * Configuração de Pricing e Custos
 *
 * CUSTOS BASE (APIs externas):
 * - Claude 3.5 Sonnet: $3.00/1M tokens input, $15.00/1M tokens output
 * - Whisper API (OpenAI): $0.006/minuto de áudio
 *
 * MARKUP: 2.5x (150% de margem de lucro)
 *
 * Conversões:
 * - 1 USD = R$ 5.00 (aproximado, ajustar conforme câmbio)
 */

// Taxas de conversão
export const TAXA_CAMBIO_USD_BRL = 5.0;

// Custos das APIs (em USD)
export const API_COSTS = {
  // Claude 3.5 Sonnet
  claude: {
    inputPerMillion: 3.0, // $3.00 por 1M tokens
    outputPerMillion: 15.0, // $15.00 por 1M tokens
  },
  // Whisper (transcrição de áudio)
  whisper: {
    perMinute: 0.006, // $0.006 por minuto
  },
};

// Estimativas de uso
export const USAGE_ESTIMATES = {
  // Tokens médios por análise de resposta em texto
  analiseTexto: {
    input: 500, // tokens (pergunta + resposta + prompt de avaliação)
    output: 300, // tokens (análise + feedback)
  },
  // Tokens médios por análise de resposta em áudio transcrito
  analiseAudio: {
    input: 800, // tokens (pergunta + transcrição + prompt)
    output: 400, // tokens (análise + feedback)
    duracaoMedia: 2, // 2 minutos de áudio em média
  },
};

/**
 * Calcula custo de transcrição de áudio
 */
export function calcularCustoTranscricao(duracaoSegundos: number): number {
  const minutos = duracaoSegundos / 60;
  const custoUSD = minutos * API_COSTS.whisper.perMinute;
  const custoBRL = custoUSD * TAXA_CAMBIO_USD_BRL;
  return Number(custoBRL.toFixed(6));
}

/**
 * Calcula custo de análise com Claude
 */
export function calcularCustoAnalise(tokensInput: number, tokensOutput: number): number {
  const custoInputUSD = (tokensInput / 1_000_000) * API_COSTS.claude.inputPerMillion;
  const custoOutputUSD = (tokensOutput / 1_000_000) * API_COSTS.claude.outputPerMillion;
  const custoTotalUSD = custoInputUSD + custoOutputUSD;
  const custoBRL = custoTotalUSD * TAXA_CAMBIO_USD_BRL;
  return Number(custoBRL.toFixed(6));
}

/**
 * Calcula valor a ser cobrado do usuário (com markup)
 */
export function aplicarMarkup(custoBase: number, markup: number = 2.5): number {
  return Number((custoBase * markup).toFixed(2));
}

// Estimativas de uso para análise por pergunta
export const USAGE_ESTIMATES_ANALISE_PERGUNTA = {
  // Tokens médios por análise de UMA pergunta/resposta
  input: 300, // tokens (pergunta + resposta + contexto mínimo)
  output: 150, // tokens (avaliação da resposta)
};

/**
 * TABELA DE PREÇOS PARA O USUÁRIO
 * (Já com markup aplicado)
 */
export const PRECOS_USUARIO = {
  // Por resposta em texto (análise com IA)
  respostaTexto: (() => {
    const custo = calcularCustoAnalise(
      USAGE_ESTIMATES.analiseTexto.input,
      USAGE_ESTIMATES.analiseTexto.output
    );
    return aplicarMarkup(custo);
  })(),

  // Por resposta em áudio (transcrição + análise)
  respostaAudio: (() => {
    const custoTranscricao = calcularCustoTranscricao(
      USAGE_ESTIMATES.analiseAudio.duracaoMedia * 60
    );
    const custoAnalise = calcularCustoAnalise(
      USAGE_ESTIMATES.analiseAudio.input,
      USAGE_ESTIMATES.analiseAudio.output
    );
    return aplicarMarkup(custoTranscricao + custoAnalise);
  })(),

  // Taxa fixa por pergunta criada (overhead de sistema)
  perguntaCriada: 0.01, // R$ 0.01

  // Taxa fixa por entrevista criada
  entrevistaCriada: 0.05, // R$ 0.05

  // Taxa por análise de pergunta individual (quando a IA avalia a resposta de uma pergunta)
  analisePorPergunta: 0.70, // R$ 0,70 por pergunta analisada
};

/**
 * Calcula custo estimado de uma entrevista completa
 * Inclui: criação da entrevista, criação das perguntas, respostas e análise por pergunta
 */
export function estimarCustoEntrevista(
  numPerguntas: number,
  numCandidatos: number,
  tipoResposta: "texto" | "audio" = "audio"
): {
  custoBase: number;
  custoTotal: number;
  custoPorCandidato: number;
  breakdown: {
    criacaoEntrevista: number;
    criacaoPerguntas: number;
    respostas: number;
    analisePorPergunta: number;
  };
} {
  const custoEntrevista = PRECOS_USUARIO.entrevistaCriada;
  const custoPerguntas = PRECOS_USUARIO.perguntaCriada * numPerguntas;
  const custoResposta =
    tipoResposta === "audio" ? PRECOS_USUARIO.respostaAudio : PRECOS_USUARIO.respostaTexto;
  const custoRespostas = custoResposta * numPerguntas * numCandidatos;

  // Custo de análise: cobra por cada pergunta analisada por candidato
  const custoAnalise = PRECOS_USUARIO.analisePorPergunta * numPerguntas * numCandidatos;

  const custoTotal = custoEntrevista + custoPerguntas + custoRespostas + custoAnalise;
  const custoPorCandidato = (custoRespostas + custoAnalise) / numCandidatos;

  return {
    custoBase: custoEntrevista + custoPerguntas,
    custoTotal: Number(custoTotal.toFixed(2)),
    custoPorCandidato: Number(custoPorCandidato.toFixed(2)),
    breakdown: {
      criacaoEntrevista: custoEntrevista,
      criacaoPerguntas: Number(custoPerguntas.toFixed(2)),
      respostas: Number(custoRespostas.toFixed(2)),
      analisePorPergunta: Number(custoAnalise.toFixed(2)),
    },
  };
}

/**
 * Pacotes de crédito para venda
 */
export const PACOTES_CREDITO = [
  {
    id: "starter",
    nome: "Starter",
    creditos: 50,
    valor: 50,
    desconto: 0,
    popular: false,
  },
  {
    id: "professional",
    nome: "Professional",
    creditos: 150,
    valor: 135, // 10% desconto
    desconto: 10,
    popular: true,
  },
  {
    id: "business",
    nome: "Business",
    creditos: 500,
    valor: 400, // 20% desconto
    desconto: 20,
    popular: false,
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    creditos: 1000,
    valor: 700, // 30% desconto
    desconto: 30,
    popular: false,
  },
];

/**
 * Exemplos de uso prático
 */
export const EXEMPLOS_USO = {
  pequenaEmpresa: {
    nome: "Pequena Empresa",
    entrevistas: 2,
    perguntasPorEntrevista: 8,
    candidatosPorEntrevista: 10,
    custoEstimado: (() => {
      const est = estimarCustoEntrevista(8, 10, "audio");
      return est.custoTotal * 2;
    })(),
  },
  mediaEmpresa: {
    nome: "Média Empresa",
    entrevistas: 5,
    perguntasPorEntrevista: 10,
    candidatosPorEntrevista: 25,
    custoEstimado: (() => {
      const est = estimarCustoEntrevista(10, 25, "audio");
      return est.custoTotal * 5;
    })(),
  },
  grandeEmpresa: {
    nome: "Grande Empresa",
    entrevistas: 20,
    perguntasPorEntrevista: 12,
    candidatosPorEntrevista: 50,
    custoEstimado: (() => {
      const est = estimarCustoEntrevista(12, 50, "audio");
      return est.custoTotal * 20;
    })(),
  },
};

console.log("🚀 Tabela de Preços Calculada:");
console.log("=".repeat(50));
console.log(`Resposta Texto: R$ ${PRECOS_USUARIO.respostaTexto.toFixed(2)}`);
console.log(`Resposta Áudio: R$ ${PRECOS_USUARIO.respostaAudio.toFixed(2)}`);
console.log(`Análise por Pergunta: R$ ${PRECOS_USUARIO.analisePorPergunta.toFixed(2)}`);
console.log(`Pergunta Criada: R$ ${PRECOS_USUARIO.perguntaCriada.toFixed(2)}`);
console.log(`Entrevista Criada: R$ ${PRECOS_USUARIO.entrevistaCriada.toFixed(2)}`);
console.log("=".repeat(50));
console.log("\n📊 Exemplo: Entrevista com 10 perguntas e 20 candidatos (áudio)");
const exemplo = estimarCustoEntrevista(10, 20, "audio");
console.log(`Custo Total: R$ ${exemplo.custoTotal}`);
console.log(`Custo por Candidato: R$ ${exemplo.custoPorCandidato}`);
console.log(`Breakdown:`, exemplo.breakdown);
