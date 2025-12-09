# Sistema de Análise de Entrevistas com IA

Este diretório contém a implementação do sistema de análise automática de entrevistas usando Claude (Anthropic) e LangChain.

## Arquivos

### [tools.ts](./tools.ts)
Define as ferramentas (tools) que o agente de IA pode usar:

- `getInterviewInfoTool` - Busca informações da entrevista e vaga
- `getCandidateAnswersTool` - Busca respostas do candidato
- `getCompetenciasTool` - Busca competências a avaliar
- `saveAnalysisTool` - Salva a análise no banco de dados

### [prompts.ts](./prompts.ts)
Contém os prompts e instruções para o agente:

- `INTERVIEW_ANALYSIS_SYSTEM_PROMPT` - Prompt principal do sistema
- `buildAnalysisPrompt` - Função para construir prompt específico por candidato

### [agent.ts](./agent.ts)
Configuração e execução do agente Claude:

- `analyzeInterview` - Função principal de análise
- `analyzeInterviewBackground` - Versão para execução em background
- Configuração do modelo Claude 3.5 Sonnet
- React agent pattern (Reasoning + Acting)

### [auto-analyze.ts](./auto-analyze.ts)
Sistema de análise automática:

- `AnalysisQueue` - Fila de processamento em background
- `onCandidatoFinalizouEntrevista` - Trigger ao finalizar entrevista

## Como Usar

### Importar e usar diretamente

```typescript
import { analyzeInterview } from '@/lib/ai/agent';

const result = await analyzeInterview(
  candidatoId,
  entrevistaId,
  candidatoNome
);

if (result.success) {
  console.log('Avaliação ID:', result.avaliacaoId);
}
```

### Via API

```typescript
// POST /api/analise-entrevista
const response = await fetch('/api/analise-entrevista', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    candidatoId: 'uuid',
    entrevistaId: 'uuid',
  }),
});
```

### Automático ao finalizar entrevista

A análise é disparada automaticamente quando `AUTO_ANALYZE_INTERVIEWS="true"` no `.env`.

## Customização

### Modificar critérios de avaliação

Edite o `INTERVIEW_ANALYSIS_SYSTEM_PROMPT` em [prompts.ts](./prompts.ts)

### Adicionar novas ferramentas

1. Crie a tool em [tools.ts](./tools.ts)
2. Adicione ao array `tools` em [agent.ts](./agent.ts)
3. Atualize o prompt para instruir o agente a usar a nova tool

### Trocar modelo

Edite a função `createModel()` em [agent.ts](./agent.ts):

```typescript
return new ChatAnthropic({
  model: 'claude-3-5-sonnet-20241022', // trocar aqui
  temperature: 0.3,
  maxTokens: 8000,
});
```

## Documentação Completa

Veja [docs/AI_ANALYSIS.md](../../docs/AI_ANALYSIS.md) para documentação completa incluindo:

- Configuração detalhada
- Custos e estimativas
- Troubleshooting
- Boas práticas
- Próximos passos
