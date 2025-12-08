# Sistema de Faturamento

## Visão Geral

O sistema de faturamento funciona baseado em **faturas mensais** ao invés de saldo pré-pago. Cada usuário acumula gastos durante o mês e paga a fatura no final do período.

## Estrutura

### 1. Tabela `faturas`

Armazena as faturas mensais de cada usuário.

**Campos principais:**
- `userId`: Usuário dono da fatura
- `mesReferencia` / `anoReferencia`: Período da fatura (ex: 12/2025)
- `valorTotal`: Soma de todas as transações do mês
- `valorPago`: Quanto já foi pago
- `status`: Estado da fatura
  - `aberta`: Fatura do mês atual, ainda acumulando transações
  - `fechada`: Mês encerrado, aguardando pagamento
  - `paga`: Pagamento confirmado
  - `vencida`: Passou do vencimento sem pagamento
  - `cancelada`: Fatura cancelada

**Datas importantes:**
- `dataAbertura`: Quando a fatura foi criada (início do mês)
- `dataFechamento`: Quando o mês foi encerrado
- `dataVencimento`: Prazo para pagamento (ex: dia 10 do mês seguinte)
- `dataPagamento`: Quando foi efetivamente pago

**Estatísticas:**
- `totalEntrevistas`: Quantas entrevistas foram criadas
- `totalCandidatos`: Quantos candidatos foram processados
- `totalRespostas`: Quantas respostas foram analisadas
- `totalTransacoes`: Total de operações cobradas

### 2. Tabela `transacoes`

Registra cada operação que gera custo, funcionando como os "itens" da fatura.

**Campos principais:**
- `userId`: Quem gerou o custo
- `faturaId`: A qual fatura esta transação pertence
- `tipo`: Tipo de operação
  - `transcricao_audio`: Transcrição de áudio com Whisper
  - `analise_ia`: Análise de resposta com Claude
  - `pergunta_criada`: Criação de pergunta personalizada
  - `entrevista_criada`: Criação de nova entrevista

**Valores:**
- `custoBase`: Quanto custou na API (ex: $0.000025 por token)
- `markup`: Multiplicador de lucro (padrão 2.5x)
- `valorCobrado`: Valor final = custoBase × markup

**Metadados:**
```typescript
{
  modeloIA?: string;        // claude-3.5-sonnet, whisper-1
  tokensEntrada?: number;   // Tokens enviados
  tokensSaida?: number;     // Tokens recebidos
  duracaoAudio?: number;    // Segundos de áudio
  tamanhoArquivo?: number;  // Bytes do arquivo
  tentativas?: number;      // Quantas vezes tentou
}
```

## Fluxo de Funcionamento

### 1. Criação de Fatura

Quando um usuário faz a primeira operação do mês:

```typescript
// Busca ou cria fatura do mês atual
const mesAtual = new Date().getMonth() + 1;
const anoAtual = new Date().getFullYear();

let fatura = await db.query.faturas.findFirst({
  where: and(
    eq(faturas.userId, userId),
    eq(faturas.mesReferencia, mesAtual),
    eq(faturas.anoReferencia, anoAtual)
  )
});

if (!fatura) {
  fatura = await db.insert(faturas).values({
    userId,
    mesReferencia: mesAtual,
    anoReferencia: anoAtual,
    status: 'aberta',
    dataVencimento: calcularVencimento() // Ex: dia 10 do próximo mês
  }).returning();
}
```

### 2. Registro de Transação

Cada operação que gera custo é registrada:

```typescript
// Exemplo: Transcrição de áudio
const custoBase = duracaoSegundos * 0.006 / 60; // Whisper: $0.006/minuto
const markup = 2.5;
const valorCobrado = custoBase * markup;

await db.insert(transacoes).values({
  userId,
  faturaId: fatura.id,
  respostaId,
  tipo: 'transcricao_audio',
  custoBase: custoBase.toString(),
  markup: markup.toString(),
  valorCobrado: valorCobrado.toFixed(2),
  metadados: {
    modeloIA: 'whisper-1',
    duracaoAudio: duracaoSegundos,
    tamanhoArquivo: audioBuffer.length
  },
  descricao: `Transcrição de áudio - ${duracaoSegundos}s`,
  status: 'concluida'
});

// Atualiza total da fatura
await db.update(faturas)
  .set({
    valorTotal: sql`${faturas.valorTotal} + ${valorCobrado}`,
    totalTransacoes: sql`${faturas.totalTransacoes} + 1`,
    updatedAt: new Date()
  })
  .where(eq(faturas.id, fatura.id));
```

### 3. Fechamento da Fatura

No final do mês (via CRON ou job agendado):

```typescript
// Fecha todas as faturas abertas do mês anterior
const mesPassado = new Date().getMonth(); // 0-11
const anoPassado = mesPassado === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();

await db.update(faturas)
  .set({
    status: 'fechada',
    dataFechamento: new Date()
  })
  .where(
    and(
      eq(faturas.status, 'aberta'),
      eq(faturas.mesReferencia, mesPassado === 0 ? 12 : mesPassado),
      eq(faturas.anoReferencia, anoPassado)
    )
  );
```

### 4. Pagamento (Futuro)

Quando integrar com gateway de pagamento:

```typescript
// Marca fatura como paga
await db.update(faturas)
  .set({
    status: 'paga',
    dataPagamento: new Date(),
    valorPago: fatura.valorTotal,
    metodoPagamento: 'cartao_credito',
    paymentId: paymentGatewayId,
    paymentData: { ... }
  })
  .where(eq(faturas.id, faturaId));
```

## Aplicando Migrations

### Desenvolvimento
```bash
npm run db:migrate
```

### Produção
```bash
npm run db:migrate:prod
```

Ou manualmente:
```bash
node scripts/apply-migrations.js --production
```

## Consultas Úteis

### Ver fatura atual do usuário
```typescript
const faturaAtual = await db.query.faturas.findFirst({
  where: and(
    eq(faturas.userId, userId),
    eq(faturas.status, 'aberta')
  ),
  with: {
    transacoes: true
  }
});
```

### Histórico de faturas
```typescript
const historico = await db.query.faturas.findMany({
  where: eq(faturas.userId, userId),
  orderBy: [desc(faturas.anoReferencia), desc(faturas.mesReferencia)]
});
```

### Total gasto por tipo
```typescript
const gastosPorTipo = await db
  .select({
    tipo: transacoes.tipo,
    total: sql<number>`SUM(${transacoes.valorCobrado})`,
    quantidade: sql<number>`COUNT(*)`
  })
  .from(transacoes)
  .where(
    and(
      eq(transacoes.userId, userId),
      eq(transacoes.faturaId, faturaId)
    )
  )
  .groupBy(transacoes.tipo);
```

## Próximos Passos

1. **Integração com Gateway de Pagamento**
   - Adicionar webhook para confirmação de pagamento
   - Implementar retry automático para falhas
   - Armazenar dados do cartão de forma segura (via gateway)

2. **Sistema de Alertas**
   - Avisar quando fatura atingir valores altos
   - Notificar próximo ao vencimento
   - Alert de fatura vencida

3. **Dashboard de Gastos**
   - Gráfico de gastos por tipo
   - Comparação mês a mês
   - Projeção de gastos futuros

4. **Otimização de Custos**
   - Cache de respostas similares
   - Batching de requisições
   - Limites por plano do usuário
