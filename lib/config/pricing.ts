/**
 * Configuração de Pricing e Custos
 *
 * MODELO DE PRECIFICAÇÃO PAY-PER-USE:
 * - Taxa base por candidato: R$ 1,00
 * - Por pergunta analisada: R$ 0,25
 * - Fórmula: Custo = R$ 1,00 + (nº perguntas × R$ 0,25)
 *
 * CUSTOS BASE (APIs externas - para referência):
 * - Claude 3.5 Sonnet: $3.00/1M tokens input, $15.00/1M tokens output
 * - Whisper API (OpenAI): $0.006/minuto de áudio
 *
 * Conversões:
 * - 1 USD = R$ 5.00 (aproximado, ajustar conforme câmbio)
 */

// Taxas de conversão
export const TAXA_CAMBIO_USD_BRL = 5.0;

// Custos das APIs (em USD) - para cálculo de margem
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

/**
 * Percentual de infraestrutura a ser adicionado no custo teórico
 * Este valor é absorvido no custo de cada análise (não cobrado separadamente)
 *
 * Cálculo: custo_pergunta = whisper + claude + (custo_apis * PERCENTUAL_INFRA)
 *
 * O percentual cobre:
 * - Vercel (hosting/deploy)
 * - Neon (banco de dados)
 * - Resend (emails)
 * - Outros custos operacionais
 */
export const PERCENTUAL_INFRAESTRUTURA = 0.15; // 15% de overhead de infraestrutura

// Estimativas de uso (para referência interna)
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
 * Calcula custo de transcrição de áudio (custo real da API + infraestrutura ponderada)
 *
 * O custo inclui:
 * - Custo do Whisper (por minuto de áudio)
 * - Overhead de infraestrutura (% ponderado)
 */
export function calcularCustoTranscricao(duracaoSegundos: number): number {
  const minutos = duracaoSegundos / 60;
  const custoWhisperUSD = minutos * API_COSTS.whisper.perMinute;

  // Adiciona overhead de infraestrutura proporcional
  const custoTotalUSD = custoWhisperUSD * (1 + PERCENTUAL_INFRAESTRUTURA);
  const custoBRL = custoTotalUSD * TAXA_CAMBIO_USD_BRL;
  return Number(custoBRL.toFixed(6));
}

/**
 * Calcula custo de análise com Claude (custo real da API + infraestrutura ponderada)
 *
 * O custo inclui:
 * - Custo do Claude (input + output tokens)
 * - Overhead de infraestrutura (% ponderado)
 */
export function calcularCustoAnalise(tokensInput: number, tokensOutput: number): number {
  const custoInputUSD = (tokensInput / 1_000_000) * API_COSTS.claude.inputPerMillion;
  const custoOutputUSD = (tokensOutput / 1_000_000) * API_COSTS.claude.outputPerMillion;
  const custoClaudeUSD = custoInputUSD + custoOutputUSD;

  // Adiciona overhead de infraestrutura proporcional
  const custoTotalUSD = custoClaudeUSD * (1 + PERCENTUAL_INFRAESTRUTURA);
  const custoBRL = custoTotalUSD * TAXA_CAMBIO_USD_BRL;
  return Number(custoBRL.toFixed(6));
}

/**
 * Calcula valor a ser cobrado do usuário (com markup)
 * @deprecated Use PRECOS_USUARIO diretamente
 */
export function aplicarMarkup(custoBase: number, markup: number = 2.5): number {
  return Number((custoBase * markup).toFixed(2));
}

// Estimativas de uso para análise por pergunta (para referência interna)
export const USAGE_ESTIMATES_ANALISE_PERGUNTA = {
  // Tokens médios por análise de UMA pergunta/resposta
  input: 300, // tokens (pergunta + resposta + contexto mínimo)
  output: 150, // tokens (avaliação da resposta)
};

/**
 * TABELA DE PREÇOS PARA O USUÁRIO
 * Modelo Pay-per-Use simplificado e competitivo
 */
export const PRECOS_USUARIO = {
  /**
   * Taxa base cobrada por cada candidato avaliado
   * Cobre overhead de processamento e infraestrutura
   */
  taxaBasePorCandidato: 1.0, // R$ 1,00

  /**
   * Taxa por cada pergunta analisada pela IA
   * Cobrada quando a IA avalia a resposta do candidato
   */
  analisePorPergunta: 0.25, // R$ 0,25

  // Taxas legadas (mantidas em 0 para não cobrar)
  respostaTexto: 0, // GRÁTIS - incluído na análise
  respostaAudio: 0, // GRÁTIS - incluído na análise
  perguntaCriada: 0, // GRÁTIS
  entrevistaCriada: 0, // GRÁTIS
};

/**
 * Calcula custo por candidato baseado no número de perguntas
 * Fórmula: R$ 1,00 (taxa base) + (nº perguntas × R$ 0,25)
 */
export function calcularCustoPorCandidato(numPerguntas: number): number {
  const taxaBase = PRECOS_USUARIO.taxaBasePorCandidato;
  const custoPerguntas = PRECOS_USUARIO.analisePorPergunta * numPerguntas;
  return Number((taxaBase + custoPerguntas).toFixed(2));
}

/**
 * Calcula custo estimado de uma entrevista completa
 * Modelo: Taxa base por candidato + custo por pergunta analisada
 */
export function estimarCustoEntrevista(
  numPerguntas: number,
  numCandidatos: number
): {
  custoBase: number;
  custoTotal: number;
  custoPorCandidato: number;
  breakdown: {
    taxaBaseCandidatos: number;
    analisePerguntas: number;
  };
} {
  // Custo por candidato = R$ 1,00 (taxa base) + (perguntas × R$ 0,25)
  const custoPorCandidato = calcularCustoPorCandidato(numPerguntas);

  // Custo total = custo por candidato × número de candidatos
  const custoTotal = custoPorCandidato * numCandidatos;

  // Breakdown detalhado
  const taxaBaseCandidatos = PRECOS_USUARIO.taxaBasePorCandidato * numCandidatos;
  const analisePerguntas = PRECOS_USUARIO.analisePorPergunta * numPerguntas * numCandidatos;

  return {
    custoBase: 0, // Criar entrevista e perguntas é grátis
    custoTotal: Number(custoTotal.toFixed(2)),
    custoPorCandidato: Number(custoPorCandidato.toFixed(2)),
    breakdown: {
      taxaBaseCandidatos: Number(taxaBaseCandidatos.toFixed(2)),
      analisePerguntas: Number(analisePerguntas.toFixed(2)),
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
      const est = estimarCustoEntrevista(8, 10);
      return est.custoTotal * 2;
    })(),
  },
  mediaEmpresa: {
    nome: "Média Empresa",
    entrevistas: 5,
    perguntasPorEntrevista: 10,
    candidatosPorEntrevista: 25,
    custoEstimado: (() => {
      const est = estimarCustoEntrevista(10, 25);
      return est.custoTotal * 5;
    })(),
  },
  grandeEmpresa: {
    nome: "Grande Empresa",
    entrevistas: 20,
    perguntasPorEntrevista: 12,
    candidatosPorEntrevista: 50,
    custoEstimado: (() => {
      const est = estimarCustoEntrevista(12, 50);
      return est.custoTotal * 20;
    })(),
  },
};

console.log("🚀 Tabela de Preços - Modelo Pay-per-Use:");
console.log("=".repeat(50));
console.log(`Taxa Base por Candidato: R$ ${PRECOS_USUARIO.taxaBasePorCandidato.toFixed(2)}`);
console.log(`Análise por Pergunta: R$ ${PRECOS_USUARIO.analisePorPergunta.toFixed(2)}`);
console.log("=".repeat(50));
console.log("\n📊 Exemplo: Entrevista com 10 perguntas e 20 candidatos");
const exemplo = estimarCustoEntrevista(10, 20);
console.log(`Custo por Candidato: R$ ${exemplo.custoPorCandidato}`);
console.log(`Custo Total (20 candidatos): R$ ${exemplo.custoTotal}`);
console.log(`Breakdown:`, exemplo.breakdown);
