# Sistema de Análise de Entrevistas com IA

Este documento descreve o sistema de análise automática de entrevistas usando Claude (Anthropic) e LangChain.

## Visão Geral

O sistema utiliza um agente de IA baseado no Claude 3.5 Sonnet para analisar automaticamente as respostas dos candidatos em entrevistas, gerando:

- **Nota geral** (0-10)
- **Resumo executivo** da performance
- **Pontos fortes** identificados
- **Pontos de melhoria**
- **Recomendação final** (recomendado, recomendado com ressalvas, ou não recomendado)
- **Avaliações por competência** com notas e feedbacks individuais

## Arquitetura

### Componentes Principais

```
lib/ai/
├── tools.ts           # Ferramentas que o agente usa para buscar e salvar dados
├── prompts.ts         # Prompts e instruções para o agente
├── agent.ts           # Configuração do agente Claude com LangChain
└── auto-analyze.ts    # Sistema de análise automática ao finalizar entrevista
```

### Fluxo de Análise

1. **Trigger**: Candidato finaliza a entrevista
2. **Background**: Sistema dispara análise automática (se configurado)
3. **Agente IA**:
   - Busca informações da vaga/entrevista
   - Busca competências a avaliar
   - Busca todas as respostas do candidato
   - Analisa cada resposta criteriosamente
   - Avalia competências individualmente
   - Calcula nota geral
   - Identifica pontos fortes e melhorias
   - Faz recomendação final
4. **Persistência**: Salva análise completa no banco
5. **Interface**: Página de resultado exibe a avaliação

## Configuração

### 1. Variáveis de Ambiente

Adicione ao seu arquivo `.env.local`:

```bash
# API Key da Anthropic (obrigatório)
ANTHROPIC_API_KEY="sk-ant-api03-..."

# Habilitar análise automática (opcional, padrão: true)
AUTO_ANALYZE_INTERVIEWS="true"
```

### 2. Obter API Key da Anthropic

1. Acesse [console.anthropic.com](https://console.anthropic.com/)
2. Crie uma conta ou faça login
3. Vá em "API Keys"
4. Crie uma nova API key
5. Copie e adicione ao `.env.local`

**Importante**: A API da Anthropic é paga. Monitore seu uso em [console.anthropic.com/settings/usage](https://console.anthropic.com/settings/usage)

### 3. Custos Estimados

Com o modelo Claude 3.5 Sonnet:
- Input: ~$3 por milhão de tokens
- Output: ~$15 por milhão de tokens

Estimativa por análise de entrevista:
- ~10.000-20.000 tokens de input (perguntas + respostas)
- ~5.000-10.000 tokens de output (análise completa)
- **Custo médio: $0.10 - $0.30 por análise**

## Uso

### Análise Manual

Na página de resultado do candidato (`/candidatos/[id]/resultado`):

1. Acesse a página do candidato que concluiu a entrevista
2. Se não houver análise, verá um botão "Gerar Avaliação com IA"
3. Clique no botão e aguarde (pode levar 1-3 minutos)
4. A análise será exibida automaticamente quando concluída
5. Use o botão "Reanalisar" para gerar nova análise

### Análise Automática

Se `AUTO_ANALYZE_INTERVIEWS="true"`:

1. Candidato finaliza a entrevista
2. Sistema dispara análise automaticamente em background
3. Análise fica disponível na página de resultado
4. Sem impacto no tempo de resposta ao candidato

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

const { success, avaliacaoId } = await response.json();
```

```typescript
// GET /api/analise-entrevista?candidatoId=xxx&entrevistaId=yyy
const response = await fetch(
  `/api/analise-entrevista?candidatoId=${id}&entrevistaId=${entId}`
);

const { exists, avaliacao } = await response.json();
```

## Como Funciona o Agente

### Tools (Ferramentas)

O agente tem acesso a 4 ferramentas principais:

1. **getInterviewInfo**: Busca dados da entrevista e vaga
2. **getCandidateAnswers**: Busca todas as respostas do candidato
3. **getCompetencias**: Busca competências a serem avaliadas
4. **saveAnalysis**: Salva a análise completa no banco

### Prompt System

O agente segue um sistema de prompts estruturado que define:

- **Objetivo**: Analisar entrevistas de forma profissional e objetiva
- **Processo**: Passo a passo do que fazer
- **Critérios**: Como avaliar comunicação, técnica, comportamental, etc.
- **Diretrizes**: Ser justo, objetivo, baseado em evidências

### React Agent Pattern

Utiliza o padrão "React" (Reasoning + Acting):

1. **Raciocínio**: Pensa sobre o que precisa fazer
2. **Ação**: Usa uma ferramenta
3. **Observação**: Analisa o resultado
4. **Repete**: Até completar a tarefa

## Personalização

### Ajustar Critérios de Avaliação

Edite [lib/ai/prompts.ts](../lib/ai/prompts.ts):

```typescript
export const INTERVIEW_ANALYSIS_SYSTEM_PROMPT = `
Você é um assistente especializado...

## Critérios de Avaliação

### Comunicação (quando relevante)
- [seus critérios personalizados]
...
`;
```

### Modificar Ferramentas

Edite [lib/ai/tools.ts](../lib/ai/tools.ts) para:
- Adicionar novas ferramentas
- Modificar ferramentas existentes
- Buscar dados adicionais

### Trocar Modelo

Edite [lib/ai/agent.ts](../lib/ai/agent.ts):

```typescript
return new ChatAnthropic({
  apiKey,
  model: 'claude-3-5-sonnet-20241022', // ou outro modelo
  temperature: 0.3, // ajuste a criatividade
  maxTokens: 8000, // ajuste o tamanho máximo
});
```

Modelos disponíveis:
- `claude-3-5-sonnet-20241022` (recomendado) - Melhor custo-benefício
- `claude-3-opus-20240229` - Mais poderoso, mais caro
- `claude-3-haiku-20240307` - Mais rápido, mais barato

## Monitoramento

### Logs

O sistema gera logs detalhados:

```bash
# No console do servidor
Candidato João Silva finalizou a entrevista. Iniciando análise automática...
Análise enfileirada para João Silva
Análise do candidato João Silva concluída com sucesso. Avaliação ID: xxx
```

### Tratamento de Erros

- Erros são logados mas não interrompem o fluxo
- Análise automática falha silenciosamente
- Usuário pode tentar manualmente pela interface

## Limitações

1. **Tempo de Execução**: 1-5 minutos por análise (depende da complexidade)
2. **Rate Limits**: Respeite os limites da API da Anthropic
3. **Contexto**: Modelo tem limite de contexto (~200k tokens para Sonnet)
4. **Custos**: Cada análise consome tokens (veja seção de custos)

## Boas Práticas

### Para Produção

1. **Use variáveis de ambiente** para configurações sensíveis
2. **Monitore custos** regularmente no console da Anthropic
3. **Implemente rate limiting** se tiver muitas análises simultâneas
4. **Use filas de processamento** (Redis, BullMQ) para escalar
5. **Cache análises** para evitar reprocessamento desnecessário
6. **Configure timeouts** apropriados (5 minutos recomendado)

### Para Desenvolvimento

1. **Desabilite análise automática** localmente: `AUTO_ANALYZE_INTERVIEWS="false"`
2. **Use análise manual** via interface para economizar tokens
3. **Teste com poucos candidatos** primeiro
4. **Monitore logs** para entender o comportamento do agente

## Troubleshooting

### Análise não está funcionando

1. ✅ Verificar se `ANTHROPIC_API_KEY` está configurada
2. ✅ Verificar se a API key é válida
3. ✅ Verificar logs do servidor para erros
4. ✅ Verificar se candidato tem status "concluido"
5. ✅ Verificar se entrevista tem competências configuradas

### Análise demora muito

1. Entrevistas longas (muitas perguntas) levam mais tempo
2. Modelo pode estar com alta latência
3. Considere usar modelo mais rápido (haiku)
4. Verifique logs para identificar gargalos

### Custos muito altos

1. Reduza `maxTokens` no agente
2. Use modelo mais barato (haiku)
3. Desabilite análise automática
4. Implemente cache de análises
5. Analise apenas candidatos selecionados

## Próximos Passos

Melhorias futuras possíveis:

- [ ] Exportar análise em PDF
- [ ] Comparação entre candidatos
- [ ] Análise de vídeos/áudios das respostas
- [ ] Feedback personalizado por tipo de vaga
- [ ] Dashboard com métricas agregadas
- [ ] Integração com ATS (Applicant Tracking Systems)
- [ ] Webhooks para notificações
- [ ] A/B testing de prompts

## Suporte

Para dúvidas ou problemas:

1. Consulte a [documentação da Anthropic](https://docs.anthropic.com/)
2. Consulte a [documentação do LangChain](https://js.langchain.com/)
3. Verifique os logs do sistema
4. Abra uma issue no repositório
