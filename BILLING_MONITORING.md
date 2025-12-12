# Sistema de Monitoramento de Billing

## 🎯 Objetivo

Implementar logging e monitoramento completo do sistema de faturamento para garantir que **TODAS** as transações sejam registradas corretamente e que qualquer falha seja imediatamente visível no admin.

## 🚀 O que foi implementado

### 1. Logging Completo em `registrarTransacao` ([lib/services/billing.ts:241-426](lib/services/billing.ts#L241-L426))

#### Logs Adicionados:
- **Início**: Log debug quando inicia tentativa de registrar transação
- **Valor Zero**: Log debug quando transação tem R$ 0,00 (não será registrada)
- **Pré-cobrança**: Log info antes de criar transação com todos os detalhes
- **Sucesso**: Log info ✅ quando transação é registrada com sucesso
- **Erro Crítico**: Log error ❌ + registro no sistema de erros do admin quando falha

#### Error Tracking:
Quando há erro, o sistema:
1. Loga detalhes completos do erro
2. **Cria entrada no sistema de erros** (`/admin/erros`) com:
   - Component: `billing:registrarTransacao`
   - Level: `critical`
   - Todos os metadados da transação
   - **Cria ticket automaticamente** para investigação

### 2. Logging em `registrarAnalisePerguntas` ([lib/services/billing.ts:441-562](lib/services/billing.ts#L441-L562))

#### Melhorias:
- **Contadores**: Rastreia transações registradas vs falhas
- **Log Início**: Registra início do processo com total de perguntas
- **Taxa Base**: Log específico quando taxa base é (ou não) registrada
- **Por Pergunta**: Conta falhas individuais de cada pergunta
- **Log Final**: Resumo completo comparando:
  - Total cobrado
  - Total esperado
  - Diferença de valor
  - Número de falhas

#### Error Tracking:
- Se **qualquer transação falhar**, registra erro crítico no admin
- Calcula e reporta diferença entre valor cobrado e esperado
- Cria ticket automaticamente para investigação

### 3. Logging no AI Agent ([lib/ai/agent.ts:221-320](lib/ai/agent.ts#L221-L320))

#### Cenários Monitorados:

**Cenário 1: Sucesso ✅**
```
[AI_AGENT] Iniciando cobrança de análise
[AI_AGENT] ✅ Cobrança registrada com sucesso
```

**Cenário 2: Falha Parcial ⚠️**
```
[AI_AGENT] Iniciando cobrança de análise
[AI_AGENT] ⚠️ Cobrança concluída com falhas
→ Cria erro no admin + ticket
```

**Cenário 3: Exceção no Billing ❌**
```
[AI_AGENT] Iniciando cobrança de análise
[AI_AGENT] ❌ ERRO CRÍTICO ao processar billing
→ Cria erro no admin + ticket com stack trace
```

**Cenário 4: userId Não Encontrado ❌ (CRÍTICO!)**
```
[AI_AGENT] ❌ CRÍTICO: entrevista.userId não encontrado!
→ Cria erro no admin + ticket
→ Mensagem: "COBRANÇA NÃO REGISTRADA"
```

Este último cenário é o **mais crítico** - acontece quando uma entrevista é analisada mas o userId não está disponível, resultando em **análise sem cobrança**.

## 📊 Como Monitorar

### 1. Dashboard de Erros (`/admin/erros`)

Acesse a página de erros do admin para ver:
- **Total de erros de billing** agregados
- **Componentes afetados**:
  - `billing:registrarTransacao`
  - `billing:registrarAnalisePerguntas`
  - `ai:billing`
- **Ocorrências** por erro
- **Última vez** que ocorreu
- **Stack traces** completos

### 2. Script de Teste

Execute para verificar o status do billing:

```bash
npx tsx scripts/test-billing-monitoring.js
```

O script verifica:
- Logs de billing criados hoje
- Erros agregados de billing
- Análises vs Transações (detecta análises sem cobrança)
- Resumo completo do sistema

### 3. Logs do Sistema

Todos os logs têm prefixos para fácil identificação:
- `[BILLING]` - Logs do serviço de billing
- `[AI_AGENT]` - Logs do agent quando processa billing

**Níveis de log:**
- `debug`: Operações de rotina
- `info`: Transações bem-sucedidas
- `error`: Falhas específicas
- `critical`: Falhas que resultam em perda de receita

## 🔧 Resolução de Problemas

### Se Análises Não Gerarem Transações:

1. **Execute o script de teste:**
   ```bash
   npx tsx scripts/test-billing-monitoring.js
   ```

2. **Verifique logs:** Procure por `[BILLING]` ou `[AI_AGENT]` nos logs do servidor

3. **Acesse `/admin/erros`:**
   - Filtre por componente: `billing` ou `ai`
   - Veja erros não resolvidos
   - Clique para ver detalhes completos

4. **Verifique tickets:** Erros críticos criam tickets automaticamente em `/admin/suporte`

### Erros Comuns e Soluções:

#### ❌ "entrevista.userId não encontrado"
**Causa:** Query não retorna userId da entrevista
**Solução:** Verificar schema e query em `lib/ai/agent.ts:44-74`

#### ❌ "Falha ao registrar taxa base"
**Causa:** Erro ao criar transação no banco
**Solução:** Verificar conexão DB e schema de transações

#### ❌ "X transação(ões) falharam"
**Causa:** Algumas perguntas não foram cobradas
**Solução:** Ver log para identificar perguntas específicas

## 🎓 Como Funciona

### Fluxo Normal (Sucesso):

```
1. Candidato completa entrevista
2. analyzeInterview() é chamado
3. Análise é salva no banco
4. [AI_AGENT] Inicia cobrança
5. [BILLING] Registra taxa base (R$ 1,00)
6. [BILLING] Registra cada pergunta (R$ 0,25 × N)
7. [BILLING] ✅ Transação registrada com sucesso
8. [AI_AGENT] ✅ Cobrança registrada com sucesso
```

### Fluxo com Erro:

```
1-4. (igual)
5. [BILLING] Tenta registrar taxa base
6. ❌ ERRO ao inserir no banco
7. [BILLING] ❌ ERRO CRÍTICO ao registrar transação
8. Sistema registra erro em error_aggregations
9. Ticket é criado automaticamente
10. Admin vê erro em /admin/erros
11. Email/notificação (se configurado)
```

## 📈 Métricas Importantes

### Taxas de Sucesso
- **100%**: Todas as análises geraram transações
- **90-99%**: Algumas falhas isoladas (investigar)
- **<90%**: Problema sério (ação imediata!)

### Alertas Críticos
Fique atento a:
- Erros com `critical` level
- Erros não resolvidos > 24h
- Diferença entre análises e transações
- Mensagem "COBRANÇA NÃO REGISTRADA"

## 🔒 Garantias do Sistema

Com este monitoramento:

✅ **Nenhuma análise passará despercebida** - todas são logadas
✅ **Falhas são registradas automaticamente** - sem necessidade de investigação manual
✅ **Tickets são criados** - erros críticos notificam automaticamente
✅ **Histórico completo** - logs permitem rastrear qualquer problema
✅ **Diagnóstico rápido** - script de teste identifica problemas em segundos

## 🚨 Próximos Passos (Opcional)

Para melhorar ainda mais:

1. **Alertas em Tempo Real:**
   - Integrar com serviço de notificação (email, Slack, etc.)
   - Enviar alerta quando erro crítico de billing ocorre

2. **Dashboard de Métricas:**
   - Gráfico de transações por dia
   - Taxa de sucesso vs falha
   - Receita esperada vs real

3. **Reconciliação Automática:**
   - Job diário que compara análises vs transações
   - Detecta e reporta discrepâncias

4. **Retry Automático:**
   - Tentar novamente transações falhadas
   - Com backoff exponencial

---

**Data da implementação:** 2025-12-12
**Desenvolvido por:** Claude Code
**Criticidade:** 🔴 ALTA - Sistema de monetização
