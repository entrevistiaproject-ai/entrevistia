# Sistema de Entrevistas Públicas

## Visão Geral

Sistema completo de entrevistas públicas com gravação de áudio, transcrição automática e gestão de candidatos.

## Fluxo de Uso

### 1. Criar e Publicar Entrevista

```bash
POST /api/entrevistas/[id]/publicar
```

Gera um link público único para a entrevista. Exemplo de resposta:

```json
{
  "linkPublico": "https://seu-site.com/entrevista/desenvolvedor-fullstack-abc123",
  "slug": "desenvolvedor-fullstack-abc123",
  "status": "publicada"
}
```

### 2. Candidato Acessa o Link

O candidato acessa `https://seu-site.com/entrevista/[slug]` e preenche:
- Nome completo
- Email (com confirmação)
- Documento (opcional)
- Sexo (opcional)

### 3. Entrevista com Timer

Após cadastro, o candidato é redirecionado para a página de entrevista onde:

1. **Fase de Reflexão (45 segundos)**
   - Timer conta 45 segundos para o candidato pensar na resposta
   - Pode pular e começar a gravar antes

2. **Fase de Resposta (3 minutos)**
   - Botão para iniciar gravação de áudio
   - Timer mostra tempo restante
   - Pode parar a gravação antes do tempo máximo

3. **Processamento Automático**
   - Áudio é enviado para transcrição via Groq Whisper
   - Transcrição é salva no banco de dados
   - Próxima pergunta é carregada

4. **Finalização**
   - Após todas as perguntas, entrevista é marcada como concluída
   - Candidato vê mensagem de sucesso

## Configuração

### 1. Variáveis de Ambiente

Adicione no `.env.local`:

```bash
GROQ_API_KEY="sua-chave-groq-aqui"
```

### 2. Obter Chave da API Groq

1. Acesse [https://console.groq.com](https://console.groq.com)
2. Crie uma conta (gratuita)
3. Gere uma API key
4. Cole no `.env.local`

### 3. Custos Estimados

**Groq Whisper Large v3 Turbo:**
- **$0.04/hora** de áudio
- Free tier: Generoso para testes
- Velocidade: 216x tempo real (1h de áudio processado em ~17 segundos)

**Exemplos de custo:**
- 100 entrevistas × 30min = **$2.00**
- 1.000 entrevistas × 30min = **$20.00**
- 10.000 entrevistas × 30min = **$200.00**

Comparação:
- OpenAI Whisper: $0.36/hora (9x mais caro)
- Azure: $1.00/hora (25x mais caro)

## Estrutura do Banco de Dados

### Candidatos
- `id`, `nome`, `email`, `documento`, `sexo`
- Consentimentos LGPD
- IP e origem de cadastro

### Respostas
- `transcricao`: Texto transcrito do áudio
- `tempoResposta`: Segundos gastos na resposta
- `ipResposta`, `userAgent`: Rastreamento

### Entrevistas
- `slug`: URL amigável
- `linkPublico`: Link completo
- `status`: rascunho, publicada, concluida
- `expiracaoLink`: Data de expiração (opcional)

## APIs Disponíveis

### Públicas (sem autenticação)

```bash
GET    /api/entrevista-publica/[slug]
POST   /api/entrevista-publica/[slug]/iniciar
POST   /api/entrevista-publica/[slug]/responder
POST   /api/entrevista-publica/[slug]/finalizar
POST   /api/transcricao
```

### Privadas (requer autenticação)

```bash
POST   /api/entrevistas/[id]/publicar
DELETE /api/entrevistas/[id]/publicar
```

## Componentes

### `<GravadorAudio />`

Componente React para gravação de áudio:

```tsx
<GravadorAudio
  onTranscricaoCompleta={(transcricao, duracao) => {
    console.log("Transcrição:", transcricao);
    console.log("Duração:", duracao);
  }}
  tempoMaximo={180} // 3 minutos
  disabled={false}
/>
```

**Features:**
- Solicita permissão do microfone
- Timer visual com barra de progresso
- Para automaticamente ao atingir tempo máximo
- Transcreve automaticamente via Groq
- Tratamento de erros

## Segurança e LGPD

### Consentimento
- Candidato aceita termos ao cadastrar
- `consentimentoTratamentoDados: true`
- `finalidadeTratamento`: "Processo seletivo: [Título da Entrevista]"

### Dados Armazenados
- **Áudio**: NÃO armazenado (somente transcrição)
- **Transcrição**: Texto das respostas
- **Metadados**: IP, User Agent, timestamps

### Direitos do Titular
Schema suporta:
- `solicitouAcesso`
- `solicitouExclusao`
- `dataExclusaoAgendada`

## Próximos Passos Sugeridos

1. **Análise de IA das Respostas**
   - Usar Claude/GPT para avaliar respostas
   - Gerar feedback automático
   - Pontuação baseada em critérios

2. **Melhorias de UX**
   - Preview do áudio antes de enviar
   - Possibilidade de regravar
   - Notificações de progresso

3. **Dashboard do Recrutador**
   - Ver todas as respostas de um candidato
   - Comparar candidatos lado a lado
   - Exportar transcrições

4. **Integrações**
   - Enviar email ao finalizar
   - Webhook para sistemas externos
   - Integração com ATS

## Suporte

Para obter a chave da API Groq:
- Documentação: [https://console.groq.com/docs](https://console.groq.com/docs)
- Preços: [https://groq.com/pricing](https://groq.com/pricing)
- Suporte: [https://console.groq.com/support](https://console.groq.com/support)

## Tecnologias Utilizadas

- **Next.js 15**: Framework React
- **Groq Whisper**: Transcrição de áudio (216x tempo real)
- **Drizzle ORM**: Banco de dados
- **Neon PostgreSQL**: Database serverless
- **Vercel**: Hospedagem (compatível)
- **MediaRecorder API**: Gravação de áudio no navegador
