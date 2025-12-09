# 🤖 Configuração do Sistema de Análise com IA

Guia rápido para configurar e usar o sistema de análise automática de entrevistas com Claude (Anthropic).

## ✅ Checklist de Configuração

### 1. Instalar Dependências

As dependências já foram instaladas:
- ✅ `@langchain/anthropic` - Integração com Claude
- ✅ `@langchain/core` - Core do LangChain
- ✅ `zod` - Validação de schemas

### 2. Configurar Variáveis de Ambiente

Adicione ao seu `.env.local`:

```bash
# API Key da Anthropic (OBRIGATÓRIO)
ANTHROPIC_API_KEY="sk-ant-api03-..."

# Análise automática (OPCIONAL - padrão: true)
AUTO_ANALYZE_INTERVIEWS="true"
```

### 3. Obter API Key da Anthropic

1. 🌐 Acesse [console.anthropic.com](https://console.anthropic.com/)
2. 👤 Crie uma conta ou faça login
3. 🔑 Vá em "API Keys" no menu
4. ➕ Clique em "Create Key"
5. 📋 Copie a chave e adicione ao `.env.local`

**💰 Importante**: A API é paga. Configure um limite de gasto em Settings > Billing.

## 🚀 Como Usar

### Opção 1: Análise Automática (Recomendado)

1. ✅ Configure `AUTO_ANALYZE_INTERVIEWS="true"` no `.env.local`
2. ✅ Candidato completa a entrevista
3. ✅ Sistema analisa automaticamente em background
4. ✅ Resultado aparece na página de avaliação

### Opção 2: Análise Manual

1. 📋 Acesse `/candidatos/[id]/resultado`
2. 🔘 Clique em "Gerar Avaliação com IA"
3. ⏳ Aguarde 1-3 minutos
4. ✅ Avaliação completa é exibida

### Opção 3: Via API

```typescript
// Gerar análise
const response = await fetch('/api/analise-entrevista', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    candidatoId: 'uuid-do-candidato',
    entrevistaId: 'uuid-da-entrevista',
  }),
});

const result = await response.json();
console.log('Avaliação ID:', result.avaliacaoId);
```

```typescript
// Buscar análise existente
const response = await fetch(
  `/api/analise-entrevista?candidatoId=${id}&entrevistaId=${entId}`
);

const { exists, avaliacao } = await response.json();
```

## 📊 O Que o Sistema Analisa

A IA gera uma avaliação completa incluindo:

### 1. Nota Geral (0-10)
Pontuação consolidada de toda a performance

### 2. Resumo Executivo
Visão geral do desempenho do candidato

### 3. Pontos Fortes
Lista de competências e qualidades destacadas

### 4. Pontos de Melhoria
Áreas identificadas para desenvolvimento

### 5. Recomendação Final
- ✅ **Recomendado**: Atende ou supera expectativas
- ⚠️ **Recomendado com Ressalvas**: Tem potencial mas precisa desenvolvimento
- ❌ **Não Recomendado**: Não atende requisitos mínimos

### 6. Avaliações por Competência
Para cada competência configurada na entrevista:
- Nota individual (0-10)
- Feedback específico e construtivo
- Evidências das respostas

## 💰 Custos

### Estimativa por Análise

Com Claude 3.5 Sonnet:
- **Input**: ~$3 por milhão de tokens
- **Output**: ~$15 por milhão de tokens

Por entrevista típica:
- Input: ~10.000-20.000 tokens (perguntas + respostas)
- Output: ~5.000-10.000 tokens (análise completa)

**💵 Custo médio: $0.10 - $0.30 por análise**

### Como Reduzir Custos

1. Use análise manual apenas para candidatos selecionados
2. Desabilite análise automática: `AUTO_ANALYZE_INTERVIEWS="false"`
3. Configure limite de gastos no console da Anthropic
4. Considere usar modelo mais barato (Claude Haiku) para testes

## 🧪 Testar o Sistema

### Teste via Script

```bash
npx tsx scripts/test-ai-analysis.ts <candidatoId> <entrevistaId> "Nome do Candidato"
```

### Teste via Interface

1. Vá até a página de candidatos
2. Selecione um candidato que completou a entrevista
3. Clique em "Ver Resultado"
4. Clique em "Gerar Avaliação com IA"
5. Aguarde a análise ser concluída

## 📁 Estrutura de Arquivos

```
lib/ai/
├── tools.ts           # Ferramentas do agente (buscar dados, salvar análise)
├── prompts.ts         # Prompts e instruções
├── agent.ts           # Configuração do Claude + LangChain
└── auto-analyze.ts    # Sistema de análise automática

app/api/
├── analise-entrevista/
│   └── route.ts       # API de análise

app/(dashboard)/candidatos/[id]/
└── resultado/
    └── page.tsx       # Página de resultado com integração IA

docs/
└── AI_ANALYSIS.md     # Documentação completa

scripts/
└── test-ai-analysis.ts # Script de teste
```

## 🎯 Próximos Passos

Após configurar:

1. ✅ Adicione `ANTHROPIC_API_KEY` ao `.env.local`
2. ✅ Rode o servidor: `npm run dev`
3. ✅ Complete uma entrevista de teste
4. ✅ Verifique a análise na página de resultado
5. ✅ Monitore custos no console da Anthropic

## 🆘 Problemas Comuns

### "ANTHROPIC_API_KEY não está configurada"
→ Adicione a chave ao `.env.local` e reinicie o servidor

### "Candidato ainda não completou a entrevista"
→ O candidato precisa ter status "concluido"

### Análise demora muito
→ Normal para entrevistas longas (1-3 minutos é esperado)

### Custos altos
→ Configure limite de gastos e use análise manual seletivamente

## 📚 Documentação Completa

Para mais detalhes, veja:
- [docs/AI_ANALYSIS.md](./docs/AI_ANALYSIS.md) - Documentação completa
- [lib/ai/README.md](./lib/ai/README.md) - Detalhes técnicos
- [Documentação Anthropic](https://docs.anthropic.com/)
- [Documentação LangChain](https://js.langchain.com/)

## 🎉 Pronto!

Seu sistema de análise com IA está configurado e pronto para uso!

Qualquer dúvida, consulte a documentação ou abra uma issue no repositório.
