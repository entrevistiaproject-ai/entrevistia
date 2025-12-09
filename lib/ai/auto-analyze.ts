import { analyzeInterview } from './agent';

/**
 * Executa a análise de entrevista em background
 * Não bloqueia a resposta ao candidato
 */
export async function onCandidatoFinalizouEntrevista(
  candidatoId: string,
  entrevistaId: string,
  candidatoNome: string
): Promise<void> {
  // Verifica se a API key está configurada
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('[Auto-Analyze] ANTHROPIC_API_KEY não configurada - análise automática não será executada');
    return;
  }

  console.log(`[Auto-Analyze] Candidato ${candidatoNome} finalizou a entrevista. Iniciando análise automática...`);

  try {
    // Executa a análise (não await para não bloquear)
    analyzeInterview(candidatoId, entrevistaId, candidatoNome)
      .then((result) => {
        if (result.success) {
          console.log(`[Auto-Analyze] ✅ Análise do candidato ${candidatoNome} concluída com sucesso. ID: ${result.avaliacaoId}`);
        } else {
          console.error(`[Auto-Analyze] ❌ Falha na análise do candidato ${candidatoNome}:`, result.error);
          if (result.executionLog) {
            console.error('[Auto-Analyze] Log de execução:', result.executionLog.slice(-5).join('\n'));
          }
        }
      })
      .catch((error) => {
        console.error(`[Auto-Analyze] ❌ Erro na análise do candidato ${candidatoNome}:`, error);
      });

    console.log(`[Auto-Analyze] Análise iniciada em background para ${candidatoNome}`);
  } catch (error) {
    console.error(`[Auto-Analyze] ❌ Erro ao iniciar análise para ${candidatoNome}:`, error);
  }
}
