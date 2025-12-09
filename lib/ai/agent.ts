import { ChatAnthropic } from '@langchain/anthropic';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import {
  getInterviewInfoTool,
  getCandidateAnswersTool,
  getCompetenciasTool,
  saveAnalysisTool,
} from './tools';
import {
  INTERVIEW_ANALYSIS_SYSTEM_PROMPT,
  buildAnalysisPrompt,
} from './prompts';

/**
 * Configuração do modelo Claude da Anthropic
 */
const createModel = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY não está configurada no ambiente');
  }

  return new ChatAnthropic({
    apiKey,
    model: 'claude-3-5-sonnet-20241022', // Modelo mais recente e poderoso
    temperature: 0.3, // Baixa temperatura para respostas mais consistentes e objetivas
    maxTokens: 8000, // Permite respostas detalhadas
  });
};

/**
 * Ferramentas disponíveis para o agente
 */
const tools = [
  getInterviewInfoTool,
  getCandidateAnswersTool,
  getCompetenciasTool,
  saveAnalysisTool,
];

/**
 * Interface do resultado da análise
 */
export interface AnalysisResult {
  success: boolean;
  avaliacaoId?: string;
  error?: string;
  executionLog?: string[];
}

/**
 * Analisa uma entrevista de candidato usando o agente com Claude
 */
export async function analyzeInterview(
  candidatoId: string,
  entrevistaId: string,
  candidatoNome: string
): Promise<AnalysisResult> {
  try {
    // Cria o modelo
    const model = createModel();

    // Cria o agente com React pattern (reasoning + acting)
    const agent = createReactAgent({
      llm: model,
      tools,
    });

    // Prepara as mensagens
    const messages = [
      {
        role: 'system' as const,
        content: INTERVIEW_ANALYSIS_SYSTEM_PROMPT,
      },
      {
        role: 'user' as const,
        content: buildAnalysisPrompt(candidatoId, entrevistaId, candidatoNome),
      },
    ];

    // Executa o agente
    const executionLog: string[] = [];
    let avaliacaoId: string | undefined;

    const result = await agent.invoke({
      messages,
    });

    // Processa o resultado
    if (result && result.messages) {
      for (const message of result.messages) {
        executionLog.push(
          `[${message.type || 'message'}]: ${
            typeof message.content === 'string'
              ? message.content
              : JSON.stringify(message.content)
          }`
        );

        // Verifica se o agente salvou a análise com sucesso
        if (
          message.type === 'tool' &&
          message.name === 'saveAnalysis' &&
          message.content
        ) {
          try {
            const toolResult =
              typeof message.content === 'string'
                ? JSON.parse(message.content)
                : message.content;

            if (toolResult.success) {
              avaliacaoId = toolResult.avaliacaoId;
            }
          } catch (e) {
            console.error('Erro ao processar resultado da tool:', e);
          }
        }
      }
    }

    if (avaliacaoId) {
      return {
        success: true,
        avaliacaoId,
        executionLog,
      };
    } else {
      return {
        success: false,
        error: 'Agente não conseguiu salvar a análise',
        executionLog,
      };
    }
  } catch (error) {
    console.error('Erro na análise da entrevista:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Versão simplificada para análise em background
 */
export async function analyzeInterviewBackground(
  candidatoId: string,
  entrevistaId: string,
  candidatoNome: string
): Promise<void> {
  try {
    const result = await analyzeInterview(
      candidatoId,
      entrevistaId,
      candidatoNome
    );

    if (!result.success) {
      console.error(
        `Falha na análise do candidato ${candidatoNome}:`,
        result.error
      );
    } else {
      console.log(
        `Análise do candidato ${candidatoNome} concluída com sucesso. Avaliação ID: ${result.avaliacaoId}`
      );
    }
  } catch (error) {
    console.error(
      `Erro na análise em background do candidato ${candidatoNome}:`,
      error
    );
  }
}
