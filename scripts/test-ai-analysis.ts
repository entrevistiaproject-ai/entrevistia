/**
 * Script de teste para o sistema de análise de entrevistas com IA
 *
 * Como usar:
 * 1. Configure ANTHROPIC_API_KEY no .env.local
 * 2. Execute: npx tsx scripts/test-ai-analysis.ts <candidatoId> <entrevistaId>
 *
 * Exemplo:
 * npx tsx scripts/test-ai-analysis.ts "123e4567-e89b-12d3-a456-426614174000" "123e4567-e89b-12d3-a456-426614174001"
 */

import { analyzeInterview } from '../lib/ai/agent';

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Uso: npx tsx scripts/test-ai-analysis.ts <candidatoId> <entrevistaId>');
    console.error('');
    console.error('Exemplo:');
    console.error('  npx tsx scripts/test-ai-analysis.ts "abc-123" "def-456"');
    process.exit(1);
  }

  const [candidatoId, entrevistaId] = args;
  const candidatoNome = args[2] || 'Candidato Teste';

  console.log('🤖 Iniciando análise de entrevista com IA');
  console.log('');
  console.log('📋 Parâmetros:');
  console.log(`  Candidato ID: ${candidatoId}`);
  console.log(`  Entrevista ID: ${entrevistaId}`);
  console.log(`  Nome: ${candidatoNome}`);
  console.log('');

  // Verifica se a API key está configurada
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ERRO: ANTHROPIC_API_KEY não está configurada no .env.local');
    console.error('');
    console.error('Configure a variável de ambiente antes de executar o script:');
    console.error('  ANTHROPIC_API_KEY="sk-ant-api03-..."');
    process.exit(1);
  }

  console.log('⏳ Analisando entrevista...');
  console.log('   (Isso pode levar alguns minutos)');
  console.log('');

  const startTime = Date.now();

  try {
    const result = await analyzeInterview(candidatoId, entrevistaId, candidatoNome);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    if (result.success) {
      console.log('');
      console.log('✅ Análise concluída com sucesso!');
      console.log('');
      console.log('📊 Resultado:');
      console.log(`  Avaliação ID: ${result.avaliacaoId}`);
      console.log(`  Tempo de execução: ${duration}s`);
      console.log('');

      if (result.executionLog && result.executionLog.length > 0) {
        console.log('📝 Log de execução:');
        console.log('');
        result.executionLog.forEach((log, index) => {
          console.log(`  ${index + 1}. ${log.substring(0, 100)}${log.length > 100 ? '...' : ''}`);
        });
      }

      console.log('');
      console.log('🎉 Você pode visualizar a avaliação em:');
      console.log(`   /candidatos/${candidatoId}/resultado`);
    } else {
      console.error('');
      console.error('❌ Falha na análise');
      console.error('');
      console.error('Erro:', result.error);

      if (result.executionLog && result.executionLog.length > 0) {
        console.error('');
        console.error('Log de execução:');
        result.executionLog.forEach((log, index) => {
          console.error(`  ${index + 1}. ${log}`);
        });
      }

      process.exit(1);
    }
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.error('');
    console.error('❌ Erro ao executar análise');
    console.error('');
    console.error(`Tempo até erro: ${duration}s`);
    console.error('Detalhes:', error);
    process.exit(1);
  }
}

main();
