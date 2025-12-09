import { analyzeInterviewBackground } from './agent';

/**
 * Queue para processamento de análises em background
 * Em produção, você pode usar um serviço como BullMQ, AWS SQS, etc.
 */
class AnalysisQueue {
  private processing = new Map<string, boolean>();

  async enqueue(candidatoId: string, entrevistaId: string, candidatoNome: string) {
    const key = `${candidatoId}-${entrevistaId}`;

    // Evita processar a mesma análise múltiplas vezes
    if (this.processing.get(key)) {
      console.log(`Análise já em andamento para ${candidatoNome}`);
      return;
    }

    this.processing.set(key, true);

    try {
      // Executa análise em background
      analyzeInterviewBackground(candidatoId, entrevistaId, candidatoNome)
        .finally(() => {
          this.processing.delete(key);
        });

      console.log(`Análise enfileirada para ${candidatoNome}`);
    } catch (error) {
      console.error(`Erro ao enfileirar análise para ${candidatoNome}:`, error);
      this.processing.delete(key);
    }
  }

  isProcessing(candidatoId: string, entrevistaId: string): boolean {
    const key = `${candidatoId}-${entrevistaId}`;
    return this.processing.get(key) || false;
  }
}

export const analysisQueue = new AnalysisQueue();

/**
 * Função para ser chamada quando um candidato finaliza a entrevista
 */
export async function onCandidatoFinalizouEntrevista(
  candidatoId: string,
  entrevistaId: string,
  candidatoNome: string
) {
  // Verifica se a análise automática está habilitada
  const autoAnalyzeEnabled = process.env.AUTO_ANALYZE_INTERVIEWS !== 'false';

  if (!autoAnalyzeEnabled) {
    console.log('Análise automática desabilitada');
    return;
  }

  // Verifica se a API key está configurada
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY não configurada - análise automática não será executada');
    return;
  }

  console.log(`Candidato ${candidatoNome} finalizou a entrevista. Iniciando análise automática...`);

  // Enfileira a análise
  await analysisQueue.enqueue(candidatoId, entrevistaId, candidatoNome);
}
