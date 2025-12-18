import { analyzeInterview } from './agent';
import { processAutoDecisionForCandidate } from './process-auto-decision';

/**
 * Executa a análise de entrevista em background
 * IMPORTANTE: Esta função é chamada dentro do after() do Next.js
 * e DEVE aguardar a conclusão da análise para manter o runtime ativo
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
    // IMPORTANTE: Usa await para manter o runtime do after() ativo até a análise completar
    const result = await analyzeInterview(candidatoId, entrevistaId, candidatoNome);

    if (result.success) {
      console.log(`[Auto-Analyze] ✅ Análise do candidato ${candidatoNome} concluída com sucesso. ID: ${result.avaliacaoId}`);

      // Processa decisão automática imediatamente após a análise
      try {
        await processAutoDecisionForCandidate(candidatoId, entrevistaId);
      } catch (autoDecisionError) {
        // Log mas não falha - o CRON vai processar depois se necessário
        console.error(`[Auto-Analyze] ⚠️ Erro ao processar decisão automática (será processado pelo CRON):`, autoDecisionError);
      }
    } else {
      console.error(`[Auto-Analyze] ❌ Falha na análise do candidato ${candidatoNome}:`, result.error);
    }
  } catch (error) {
    console.error(`[Auto-Analyze] ❌ Erro na análise do candidato ${candidatoNome}:`, error);
  }
}
