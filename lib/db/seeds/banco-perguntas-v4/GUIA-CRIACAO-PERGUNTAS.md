# GUIA DE CRIAÇÃO DE PERGUNTAS - Banco de Perguntas v4

## 🚀 COMANDO RÁPIDO

Para continuar a criação das perguntas, use o comando:
```
proximo passo em GUIA-CRIACAO-PERGUNTAS.md
```

---

## 📋 PRÓXIMO PASSO A EXECUTAR

**PASSO ATUAL: B15**

### FASE A: AUDITORIA DAS PERGUNTAS EXISTENTES (Garantir qualidade uniforme)

| Passo | Descrição | Status |
|-------|-----------|--------|
| A1 | Auditoria: Tecnologia (289→393 perguntas) | ✅ CONCLUÍDO |
| A2 | Auditoria: Jurídico (232→316 perguntas) | ✅ CONCLUÍDO |
| A3 | Auditoria: Comercial (162→219 perguntas) | ✅ CONCLUÍDO |
| A4 | Auditoria: Varejo (136→281 perguntas) | ✅ CONCLUÍDO |
| A5 | Auditoria: Administrativo (196→292 perguntas) | ✅ CONCLUÍDO |

### FASE B: CRIAÇÃO DE NOVAS ÁREAS

| Passo | Descrição | Status |
|-------|-----------|--------|
| B1 | Saúde Parte 1 (Enfermeiro, Téc. Enfermagem, Recepcionista, Fisioterapeuta) | ✅ CONCLUÍDO |
| B2 | Saúde Parte 2 (Farmacêutico, Nutricionista, Psicólogo, Aux. Saúde Bucal) | ✅ CONCLUÍDO |
| B3 | Call Center (todos os cargos) | ✅ CONCLUÍDO |
| B4 | Logística Parte 1 (Auxiliar, Analista, Conferente) | ✅ CONCLUÍDO |
| B5 | Logística Parte 2 (Coordenador, Motorista, Estoquista) | ✅ CONCLUÍDO |
| B6 | Engenharia Parte 1 (Eng. Civil, Eng. Produção, Téc. Segurança) | ✅ CONCLUÍDO |
| B7 | Engenharia Parte 2 (Téc. Edificações, Mestre de Obras, Eng. Ambiental) | ✅ CONCLUÍDO |
| B8 | Agronegócio Parte 1 (Eng. Agrônomo, Téc. Agrícola, Gerente Agrícola) | ✅ CONCLUÍDO |
| B9 | Agronegócio Parte 2 (Veterinário, Op. Máquinas Agrícolas) | ✅ CONCLUÍDO |
| B10 | Educação (todos os cargos) | ✅ CONCLUÍDO |
| B11 | Hotelaria Parte 1 (Recepcionista, Camareiro, Gerente) | ✅ CONCLUÍDO |
| B12 | Hotelaria Parte 2 (Agente de Viagens, Maître/Garçom) | ✅ CONCLUÍDO |
| B13 | Indústria Parte 1 (Op. Produção, Supervisor, Téc. Manutenção) | ✅ CONCLUÍDO |
| B14 | Indústria Parte 2 (Analista PCP, Inspetor Qualidade) | ✅ CONCLUÍDO |
| B15 | Atualizar index.ts e validar tudo | 🔴 EXECUTAR AGORA |

---

## 🔍 CRITÉRIOS DE QUALIDADE PARA AUDITORIA

### Pontuação (0-100 pontos)

| Critério | Peso | Descrição |
|----------|------|-----------|
| **Relevância** | 25% | A pergunta é relevante para o cargo e nível? Está atualizada com o mercado? |
| **Profundidade** | 20% | Permite resposta rica e diferenciadora? Evita sim/não? |
| **Clareza** | 20% | O candidato entende facilmente o que está sendo perguntado? |
| **Método STAR** | 15% | Segue a metodologia comportamental quando aplicável? |
| **Competência Clara** | 10% | Está claro qual competência está sendo avaliada? |
| **Não-Redundância** | 10% | Não duplica outra pergunta do mesmo cargo? |

### Classificação

| Pontuação | Ação | Código |
|-----------|------|--------|
| 85-100% | ✅ MANTER - Pergunta excelente | OK |
| 70-84% | 🔄 AJUSTAR - Pequenas melhorias de redação | ADJ |
| 50-69% | ✏️ REFORMULAR - Reescrever mantendo a competência | REF |
| < 50% | ❌ SUBSTITUIR - Criar nova pergunta | SUB |

### Checklist de Qualidade por Pergunta

- [ ] Não é respondível com sim/não
- [ ] Usa tom cordial e profissional
- [ ] Pede exemplos concretos ou situações específicas
- [ ] Está adequada ao nível (junior/pleno/senior)
- [ ] A competência está claramente identificada
- [ ] Não repete outra pergunta com palavras diferentes
- [ ] Usa linguagem atual (não desatualizada)
- [ ] Tamanho adequado (nem muito curta nem muito longa)

### Padrão de Qualidade Esperado

**RUIM (Substituir):**
```
"Você sabe trabalhar em equipe?"
→ Respondível com sim/não, genérica, não pede exemplo
```

**MÉDIO (Ajustar):**
```
"Como você trabalha em equipe?"
→ Aberta, mas genérica, não pede situação específica
```

**BOM (Manter):**
```
"Conte-me sobre um projeto em que você precisou colaborar com pessoas de diferentes áreas. Qual era o contexto, como você se organizou com o time e qual foi o resultado dessa colaboração?"
→ Pede situação específica (STAR), tom cordial, competência clara
```

---

## STATUS GERAL

### Áreas Existentes (Auditoria Concluída)

| Área | Arquivo | Auditoria | Perguntas |
|------|---------|-----------|-----------|
| Tecnologia | tecnologia.ts | ✅ CONCLUÍDO | 393 |
| Jurídico | juridico.ts | ✅ CONCLUÍDO | 316 |
| Comercial | comercial.ts | ✅ CONCLUÍDO | 219 |
| Varejo | varejo.ts | ✅ CONCLUÍDO | 281 |
| Administrativo | administrativo.ts | ✅ CONCLUÍDO | 292 |

### Novas Áreas (Criadas)

| Área | Arquivo | Status | Perguntas |
|------|---------|--------|-----------|
| **Saúde** | saude.ts | ✅ COMPLETO | 594 |
| **Call Center** | callcenter.ts | ✅ COMPLETO | 198 |
| **Logística** | logistica.ts | ✅ COMPLETO | 281 |
| **Engenharia** | engenharia.ts | ✅ COMPLETO | 389 |
| **Agronegócio** | agronegocio.ts | ✅ COMPLETO | 344 |
| **Educação** | educacao.ts | ✅ COMPLETO | 222 |
| **Hotelaria** | hotelaria.ts | ✅ COMPLETO | 260 |
| **Indústria** | industria.ts | ✅ COMPLETO | 316 |

### Resumo

| Métrica | Atual | Meta Final |
|---------|-------|------------|
| **Perguntas Existentes** | 1.501 | - |
| **Perguntas Novas** | 2.604 | ~2.600 |
| **TOTAL** | 4.105 | ~3.600+ |
| **Áreas** | 13 completas | 13 completas |
| **Cargos** | ~100 | ~100+ |

---

## ESTRUTURA PADRÃO DAS PERGUNTAS

### Interface TypeScript
```typescript
interface PerguntaSeed {
  texto: string;           // Pergunta completa (método STAR quando aplicável)
  area: AreaProfissional;  // Ex: 'saude', 'callcenter', etc.
  cargo: string;           // Ex: 'Enfermeiro', 'Técnico de Enfermagem'
  nivel: 'junior' | 'pleno' | 'senior';
  categoria: 'tecnica' | 'experiencia' | 'comportamental' | 'situacional';
  competencia?: string;    // Ex: 'Procedimentos de Enfermagem', 'Empatia'
}
```

### Distribuição por Cargo/Nível

| Nível | Técnicas | Experiência | Comportamentais | Situacionais | TOTAL |
|-------|----------|-------------|-----------------|--------------|-------|
| Junior | 6 | 5 | 5 | 5 | **21** |
| Pleno | 6 | 6 | 6 | 6 | **24** |
| Senior | 7 | 7 | 7 | 7 | **28** |

### Competências Universais (incluir em todos os cargos)
1. Comunicação
2. Trabalho em Equipe
3. Resiliência
4. Adaptabilidade
5. Ética Profissional
6. Gestão de Tempo
7. Resolução de Problemas
8. Aprendizado Contínuo

---

## SESSÃO 7: ÁREA DE HOTELARIA/TURISMO (hotelaria.ts)

### Cargos a Criar

#### 1. Recepcionista de Hotel (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Check-in e Check-out
- Sistemas de Reservas (PMS)
- Atendimento a Hóspedes
- Resolução de Problemas
- Upselling de Serviços

**Competências Comportamentais:**
- Cordialidade e Hospitalidade
- Comunicação em Outros Idiomas
- Paciência
- Proatividade

#### 2. Camareiro (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Arrumação de Quartos
- Padrões de Limpeza
- Controle de Enxoval
- Minibar
- Objetos Perdidos

**Competências Comportamentais:**
- Atenção aos Detalhes
- Discrição
- Organização
- Agilidade

#### 3. Gerente de Hospedagem (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Gestão de Ocupação
- Revenue Management
- Gestão de Equipes
- Qualidade de Serviço
- Relacionamento com OTAs

**Competências Comportamentais:**
- Liderança
- Visão Estratégica
- Negociação
- Gestão de Crises

#### 4. Agente de Viagens (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Sistemas de Reservas (GDS)
- Pacotes Turísticos
- Roteiros de Viagem
- Documentação de Viagem
- Vendas Consultivas

**Competências Comportamentais:**
- Conhecimento Cultural
- Persuasão
- Organização
- Atualização Constante

#### 5. Maître / Garçom (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Serviço de Mesa
- Cardápio e Harmonização
- Atendimento ao Cliente
- Gestão de Salão
- Mise en Place

**Competências Comportamentais:**
- Elegância e Postura
- Agilidade
- Memória
- Trabalho sob Pressão

**TOTAL HOTELARIA: ~260 perguntas**

---

## SESSÃO 8: ÁREA DE INDÚSTRIA/PRODUÇÃO (industria.ts)

### Cargos a Criar

#### 1. Operador de Produção (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Operação de Máquinas
- Controle de Qualidade
- Segurança Industrial
- Leitura de Ordem de Produção
- 5S e Organização

**Competências Comportamentais:**
- Atenção aos Detalhes
- Disciplina
- Trabalho em Equipe
- Pontualidade

#### 2. Supervisor de Produção (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Gestão de Equipes de Produção
- Indicadores de Produtividade
- Planejamento de Turnos
- Resolução de Problemas
- Melhoria Contínua

**Competências Comportamentais:**
- Liderança
- Comunicação
- Tomada de Decisão
- Gestão de Conflitos

#### 3. Técnico de Manutenção (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Manutenção Preventiva/Corretiva
- Diagnóstico de Falhas
- Elétrica Industrial
- Mecânica Industrial
- PCM (Planejamento e Controle de Manutenção)

**Competências Comportamentais:**
- Raciocínio Lógico
- Proatividade
- Organização
- Aprendizado Contínuo

#### 4. Analista de PCP (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Planejamento de Produção
- MRP/MRP II
- Sequenciamento
- Gestão de Materiais
- Sistemas ERP

**Competências Comportamentais:**
- Visão Sistêmica
- Análise de Dados
- Comunicação
- Organização

#### 5. Inspetor de Qualidade (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Controle Estatístico de Processo
- Normas ISO
- Auditorias de Qualidade
- Instrumentos de Medição
- Não Conformidades

**Competências Comportamentais:**
- Atenção aos Detalhes
- Assertividade
- Ética
- Documentação

**TOTAL INDÚSTRIA: ~316 perguntas**

---

## TEMPLATE DE ARQUIVO

Cada arquivo deve seguir este padrão:

```typescript
/**
 * Banco de Perguntas v4 - [NOME DA ÁREA]
 *
 * Cargos incluídos:
 * - [Cargo 1] (Junior, Pleno, Senior) - X perguntas
 * - [Cargo 2] (Junior, Pleno) - Y perguntas
 *
 * Total: Z perguntas
 */

import { PerguntaSeed } from './types';

// ============================================
// [NOME DO CARGO]
// ============================================

export const [cargoNomeVariavel]Junior: PerguntaSeed[] = [
  // Técnica (6)
  { area: '[area]', texto: '...', cargo: '[Cargo]', nivel: 'junior', categoria: 'tecnica', competencia: '...' },
  // ...mais 5 técnicas

  // Experiência (5)
  { area: '[area]', texto: '...', cargo: '[Cargo]', nivel: 'junior', categoria: 'experiencia', competencia: '...' },
  // ...mais 4 experiência

  // Comportamental (5)
  { area: '[area]', texto: '...', cargo: '[Cargo]', nivel: 'junior', categoria: 'comportamental', competencia: '...' },
  // ...mais 4 comportamentais

  // Situacional (5)
  { area: '[area]', texto: '...', cargo: '[Cargo]', nivel: 'junior', categoria: 'situacional', competencia: '...' },
  // ...mais 4 situacionais
];

// ... repetir para Pleno e Senior

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================

export const perguntas[Area]: PerguntaSeed[] = [
  ...cargo1Junior,
  ...cargo1Pleno,
  ...cargo1Senior,
  // ... todos os cargos
];

export const estatisticas[Area] = {
  total: perguntas[Area].length,
  porCargo: {
    '[Cargo] Junior': cargo1Junior.length,
    '[Cargo] Pleno': cargo1Pleno.length,
    '[Cargo] Senior': cargo1Senior.length,
    // ... todos os cargos
  },
};
```

---

## DICAS PARA CRIAÇÃO DAS PERGUNTAS

### Tom de Voz
- Cordial e profissional
- Como um recrutador experiente
- Evite perguntas de sim/não
- Use "Conte-me sobre...", "Me explique...", "Como você..."

### Método STAR (para experiência e comportamentais)
- **Situação**: Peça contexto específico
- **Tarefa**: Qual era a responsabilidade
- **Ação**: O que a pessoa fez
- **Resultado**: Qual foi o impacto

### Perguntas Situacionais
- Cenários realistas do dia a dia
- Dilemas éticos
- Situações de pressão
- Conflitos interpessoais

### Evitar
- Perguntas genéricas demais
- Perguntas que podem ser respondidas com sim/não
- Perguntas repetitivas entre níveis
- Jargões técnicos desnecessários

---

## CHECKLIST POR SESSÃO

### Antes de cada sessão:
- [ ] Ler este guia
- [ ] Verificar quais cargos faltam na área
- [ ] Consultar competências específicas

### Durante a criação:
- [ ] Seguir o template TypeScript
- [ ] Garantir 21-28 perguntas por cargo/nível
- [ ] Variar as competências avaliadas
- [ ] Manter tom consistente

### Após cada sessão:
- [ ] Verificar sintaxe TypeScript
- [ ] Conferir contagem de perguntas
- [ ] Atualizar status neste guia
- [ ] Exportar corretamente no arquivo

---

## COMANDOS PARA CADA SESSÃO

**Sessão 7 (Hotelaria):**
```
Crie o arquivo hotelaria.ts com todas as perguntas da área de Hotelaria/Turismo conforme o GUIA-CRIACAO-PERGUNTAS.md
```

**Sessão 8 (Indústria):**
```
Crie o arquivo industria.ts com todas as perguntas da área de Indústria/Produção conforme o GUIA-CRIACAO-PERGUNTAS.md
```

**Sessão Final:**
```
Atualize o index.ts para incluir todas as novas áreas criadas e verifique se tudo está funcionando corretamente.
```
