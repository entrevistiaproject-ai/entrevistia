# GUIA DE CRIAÇÃO DE PERGUNTAS - Banco de Perguntas v4

## 🚀 COMANDO RÁPIDO

Para continuar a criação das perguntas, use o comando:
```
proximo passo em GUIA-CRIACAO-PERGUNTAS.md
```

---

## 📋 PRÓXIMO PASSO A EXECUTAR

**PASSO ATUAL: B2**

### FASE A: AUDITORIA DAS PERGUNTAS EXISTENTES (Garantir qualidade uniforme)

| Passo | Descrição | Status |
|-------|-----------|--------|
| A1 | Auditoria: Tecnologia (289→388 perguntas) | ✅ CONCLUÍDO |
| A2 | Auditoria: Jurídico (232→316 perguntas) | ✅ CONCLUÍDO |
| A3 | Auditoria: Comercial (162→219 perguntas) | ✅ CONCLUÍDO |
| A4 | Auditoria: Varejo (136→312 perguntas) | ✅ CONCLUÍDO |
| A5 | Auditoria: Administrativo (196→292 perguntas) | ✅ CONCLUÍDO |

### FASE B: CRIAÇÃO DE NOVAS ÁREAS

| Passo | Descrição | Status |
|-------|-----------|--------|
| B1 | Saúde Parte 1 (Enfermeiro, Téc. Enfermagem, Recepcionista, Fisioterapeuta) | ✅ CONCLUÍDO |
| B2 | Saúde Parte 2 (Farmacêutico, Nutricionista, Psicólogo, Aux. Saúde Bucal) | 🔴 EXECUTAR AGORA |
| B3 | Call Center (todos os cargos) | ⏳ Aguardando |
| B4 | Logística Parte 1 (Auxiliar, Analista, Conferente) | ⏳ Aguardando |
| B5 | Logística Parte 2 (Coordenador, Motorista, Estoquista) | ⏳ Aguardando |
| B6 | Engenharia Parte 1 (Eng. Civil, Eng. Produção, Téc. Segurança) | ⏳ Aguardando |
| B7 | Engenharia Parte 2 (Téc. Edificações, Mestre de Obras, Eng. Ambiental) | ⏳ Aguardando |
| B8 | Agronegócio Parte 1 (Eng. Agrônomo, Téc. Agrícola, Gerente Agrícola) | ⏳ Aguardando |
| B9 | Agronegócio Parte 2 (Veterinário, Op. Máquinas Agrícolas) | ⏳ Aguardando |
| B10 | Educação (todos os cargos) | ⏳ Aguardando |
| B11 | Hotelaria Parte 1 (Recepcionista, Camareiro, Gerente) | ⏳ Aguardando |
| B12 | Hotelaria Parte 2 (Agente de Viagens, Maître/Garçom) | ⏳ Aguardando |
| B13 | Indústria Parte 1 (Op. Produção, Supervisor, Téc. Manutenção) | ⏳ Aguardando |
| B14 | Indústria Parte 2 (Analista PCP, Inspetor Qualidade) | ⏳ Aguardando |
| B15 | Atualizar index.ts e validar tudo | ⏳ Aguardando |

### Instruções para o Passo A1:
```
Faça a auditoria do arquivo tecnologia.ts. Para cada cargo/nível, avalie as perguntas usando os CRITÉRIOS DE QUALIDADE abaixo. Gere um relatório indicando:
1. Perguntas que estão OK (✅)
2. Perguntas que precisam de AJUSTE (🔄) - com sugestão de melhoria
3. Perguntas que devem ser SUBSTITUÍDAS (❌) - com nova pergunta proposta
4. Perguntas FALTANTES para completar o mínimo de 21-28 por cargo/nível

Após a auditoria, aplique as correções necessárias no arquivo e atualize o PASSO ATUAL para A2.
```

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

## 📊 TEMPLATE DE RELATÓRIO DE AUDITORIA

```markdown
## AUDITORIA: [ÁREA] - [arquivo].ts

### Resumo Geral
- Total de perguntas: X
- ✅ OK: X (X%)
- 🔄 Ajustar: X (X%)
- ❌ Substituir: X (X%)
- ➕ Adicionar: X perguntas faltantes

### Por Cargo/Nível

#### [Cargo] - Junior (X perguntas)
| # | Categoria | Competência | Status | Observação |
|---|-----------|-------------|--------|------------|
| 1 | tecnica | XXX | ✅ OK | - |
| 2 | tecnica | XXX | 🔄 ADJ | Adicionar pedido de exemplo |
| 3 | experiencia | XXX | ❌ SUB | Muito genérica |

**Perguntas a adicionar:** X (técnica: X, experiência: X, comportamental: X, situacional: X)

#### [Cargo] - Pleno (X perguntas)
...

### Ações Necessárias
1. [ ] Ajustar pergunta X do cargo Y
2. [ ] Substituir pergunta Z do cargo W
3. [ ] Adicionar N perguntas ao cargo K
```

---

## STATUS GERAL

### Áreas Existentes (Auditoria Concluída)

| Área | Arquivo | Auditoria | Perguntas | Meta |
|------|---------|-----------|-----------|------|
| Tecnologia | tecnologia.ts | ✅ CONCLUÍDO | 388 | 289+ |
| Jurídico | juridico.ts | ✅ CONCLUÍDO | 316 | 232+ |
| Comercial | comercial.ts | ✅ CONCLUÍDO | 219 | 162+ |
| Varejo | varejo.ts | ✅ CONCLUÍDO | 312 | 136+ |
| Administrativo | administrativo.ts | ✅ CONCLUÍDO | 292 | 196+ |

### Novas Áreas (A Criar)

| Área | Arquivo | Status | Perguntas | Meta |
|------|---------|--------|-----------|------|
| **Saúde** | saude.ts | 🟡 PARCIAL (Parte 1/2) | ~236 | ~476 |
| **Call Center** | callcenter.ts | 🔴 CRIAR | 0 | ~194 |
| **Logística** | logistica.ts | 🔴 CRIAR | 0 | ~281 |
| **Engenharia** | engenharia.ts | 🔴 CRIAR | 0 | ~389 |
| **Agronegócio** | agronegocio.ts | 🔴 CRIAR | 0 | ~288 |
| **Educação** | educacao.ts | 🔴 CRIAR | 0 | ~198 |
| **Hotelaria** | hotelaria.ts | 🔴 CRIAR | 0 | ~260 |
| **Indústria** | industria.ts | 🔴 CRIAR | 0 | ~316 |

### Resumo

| Métrica | Atual | Meta Final |
|---------|-------|------------|
| **Perguntas Existentes** | 1.431 | 1.431+ (após auditoria) |
| **Perguntas Novas** | ~236 | ~2.402 |
| **TOTAL** | ~1.667 | ~3.600+ |
| **Áreas** | 5 existentes + 1 parcial | 13 completas |
| **Cargos** | 58 | ~100+ |

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

## SESSÃO 1: ÁREA DE SAÚDE (saude.ts)

### Cargos a Criar

#### 1. Enfermeiro (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Procedimentos de Enfermagem
- Administração de Medicamentos
- Sinais Vitais e Monitoramento
- Curativos e Procedimentos Invasivos
- Protocolos de Segurança do Paciente
- Documentação Clínica (prontuários)
- Emergências e Primeiros Socorros

**Competências Comportamentais:**
- Empatia e Humanização
- Trabalho sob Pressão
- Comunicação com Pacientes/Familiares
- Ética Profissional
- Resiliência Emocional

#### 2. Técnico de Enfermagem (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Higiene e Conforto do Paciente
- Verificação de Sinais Vitais
- Preparo de Materiais
- Administração de Medicamentos (básico)
- Transporte de Pacientes
- Controle de Infecção

#### 3. Recepcionista de Clínica/Hospital (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Agendamento de Consultas
- Sistemas de Gestão Hospitalar
- Triagem Inicial
- Documentação e Cadastros
- Atendimento Telefônico
- Guias e Autorizações de Convênio

#### 4. Fisioterapeuta (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Avaliação Funcional
- Técnicas de Reabilitação
- Fisioterapia Respiratória
- Fisioterapia Ortopédica
- Fisioterapia Neurológica
- Equipamentos e Recursos Terapêuticos

#### 5. Farmacêutico (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Dispensação de Medicamentos
- Atenção Farmacêutica
- Controle de Estoque de Medicamentos
- Medicamentos Controlados
- Farmacovigilância
- Manipulação Farmacêutica

#### 6. Nutricionista (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Avaliação Nutricional
- Elaboração de Dietas
- Nutrição Clínica
- Educação Alimentar
- Gestão de UAN (Unidade de Alimentação)
- Segurança Alimentar

#### 7. Psicólogo (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Avaliação Psicológica
- Técnicas de Entrevista
- Psicoterapia
- Laudos e Pareceres
- Orientação Profissional
- Psicologia Organizacional

#### 8. Auxiliar de Saúde Bucal (Junior) - 21 perguntas
**Competências Técnicas:**
- Instrumentação Odontológica
- Biossegurança
- Radiologia Odontológica
- Preparo do Consultório
- Orientação de Higiene Bucal

**TOTAL SAÚDE: ~476 perguntas**

---

## SESSÃO 2: ÁREA DE CALL CENTER (callcenter.ts)

### Cargos a Criar

#### 1. Operador de Telemarketing (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Scripts e Roteiros
- Técnicas de Vendas por Telefone
- Sistemas de Discagem
- Registro de Chamadas
- Metas e Indicadores

**Competências Comportamentais:**
- Comunicação Verbal Clara
- Paciência e Controle Emocional
- Persuasão
- Resiliência a Rejeição

#### 2. Operador de SAC (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Atendimento Multicanal
- Resolução de Reclamações
- Sistemas de Tickets
- Políticas de Atendimento
- Direitos do Consumidor (básico)

#### 3. Supervisor de Call Center (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Gestão de Equipes de Atendimento
- Métricas de Call Center (TMA, TME, NPS)
- Monitoria de Qualidade
- Escala de Trabalho
- Treinamento de Operadores

#### 4. Analista de Qualidade de Atendimento (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Monitoria de Chamadas
- Calibração de Avaliações
- Relatórios de Qualidade
- Feedback e Desenvolvimento
- Processos de Melhoria

**TOTAL CALL CENTER: ~194 perguntas**

---

## SESSÃO 3: ÁREA DE LOGÍSTICA (logistica.ts)

### Cargos a Criar

#### 1. Auxiliar de Logística (Junior) - 21 perguntas
**Competências Técnicas:**
- Recebimento de Mercadorias
- Conferência de Notas Fiscais
- Organização de Estoque
- Separação de Pedidos
- Etiquetagem e Embalagem

#### 2. Analista de Logística (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Gestão de Estoque
- Roteirização
- KPIs de Logística
- Sistemas WMS/TMS
- Negociação com Transportadoras
- Logística Reversa

#### 3. Conferente de Mercadorias (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Conferência Quantitativa e Qualitativa
- Documentação de Recebimento
- Identificação de Avarias
- Inventários
- Sistemas de Código de Barras

#### 4. Coordenador de Logística (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Planejamento de Distribuição
- Gestão de Frota
- Controle de Custos Logísticos
- Negociação de Contratos
- Projetos de Melhoria

#### 5. Motorista de Entrega (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Roteirização e Navegação
- Documentação de Transporte
- Cuidados com a Carga
- Atendimento na Entrega
- Manutenção Básica do Veículo

#### 6. Estoquista (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Endereçamento de Estoque
- FIFO/FEFO
- Inventário Cíclico
- Movimentação de Materiais
- Controle de Temperatura (se aplicável)

**TOTAL LOGÍSTICA: ~281 perguntas**

---

## SESSÃO 4: ÁREA DE ENGENHARIA/CONSTRUÇÃO (engenharia.ts)

### Cargos a Criar

#### 1. Engenheiro Civil (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Cálculo Estrutural
- Gestão de Obras
- Orçamento e Planejamento
- Normas Técnicas (ABNT)
- Cronograma Físico-Financeiro
- Laudos Técnicos

#### 2. Engenheiro de Produção (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Gestão de Processos
- Lean Manufacturing
- Controle de Qualidade
- Planejamento de Produção
- Análise de Custos
- Indicadores de Eficiência (OEE)

#### 3. Técnico de Segurança do Trabalho (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Normas Regulamentadoras (NRs)
- PPRA/PCMSO/PGR
- Investigação de Acidentes
- Treinamentos de Segurança
- EPIs e EPCs
- CIPA e SIPAT

#### 4. Técnico em Edificações (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Leitura de Projetos
- Acompanhamento de Obras
- Medições e Levantamentos
- Materiais de Construção
- AutoCAD/Revit (básico)

#### 5. Mestre de Obras (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Coordenação de Equipes de Obra
- Interpretação de Projetos
- Controle de Materiais
- Cronograma de Execução
- Segurança no Canteiro

#### 6. Engenheiro Ambiental (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Licenciamento Ambiental
- Gestão de Resíduos
- Tratamento de Efluentes
- Estudos de Impacto Ambiental
- Legislação Ambiental
- Sustentabilidade Corporativa

**TOTAL ENGENHARIA: ~389 perguntas**

---

## SESSÃO 5: ÁREA DE AGRONEGÓCIO (agronegocio.ts)

### Cargos a Criar

#### 1. Engenheiro Agrônomo (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Manejo de Culturas
- Fertilidade do Solo
- Controle de Pragas e Doenças
- Agricultura de Precisão
- Irrigação
- Certificações Agrícolas

#### 2. Técnico Agrícola (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Análise de Solo
- Aplicação de Defensivos
- Operação de Equipamentos
- Colheita e Pós-Colheita
- Assistência Técnica Rural

#### 3. Gerente Agrícola (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Planejamento de Safra
- Gestão de Custos Rurais
- Comercialização de Commodities
- Gestão de Equipes Rurais
- Logística Agrícola

#### 4. Veterinário (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Clínica de Grandes/Pequenos Animais
- Sanidade Animal
- Reprodução Animal
- Nutrição Animal
- Inspeção Sanitária
- Bem-Estar Animal

#### 5. Operador de Máquinas Agrícolas (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Operação de Tratores
- Colheitadeiras
- Plantadeiras
- Manutenção Preventiva
- Agricultura de Precisão (GPS)

**TOTAL AGRONEGÓCIO: ~288 perguntas**

---

## SESSÃO 6: ÁREA DE EDUCAÇÃO (educacao.ts)

### Cargos a Criar

#### 1. Professor (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Planejamento de Aulas
- Metodologias Ativas
- Avaliação de Aprendizagem
- Gestão de Sala de Aula
- Tecnologia Educacional
- Inclusão Escolar

**Competências Comportamentais:**
- Didática e Comunicação
- Paciência
- Criatividade
- Relacionamento com Alunos/Pais

#### 2. Coordenador Pedagógico (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Projeto Político-Pedagógico
- Formação de Professores
- Acompanhamento Pedagógico
- Currículo Escolar
- Gestão de Conflitos Escolares

#### 3. Auxiliar de Educação Infantil (Junior) - 21 perguntas
**Competências Técnicas:**
- Cuidados com Crianças
- Rotina Escolar Infantil
- Atividades Lúdicas
- Higiene e Alimentação
- Comunicação com Famílias

#### 4. Orientador Educacional (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Orientação Vocacional
- Acompanhamento de Alunos
- Mediação de Conflitos
- Projetos de Vida
- Parceria Escola-Família

**TOTAL EDUCAÇÃO: ~198 perguntas**

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

#### 2. Camareiro (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Arrumação de Quartos
- Padrões de Limpeza
- Controle de Enxoval
- Minibar
- Objetos Perdidos

#### 3. Gerente de Hospedagem (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Gestão de Ocupação
- Revenue Management
- Gestão de Equipes
- Qualidade de Serviço
- Relacionamento com OTAs

#### 4. Agente de Viagens (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Sistemas de Reservas (GDS)
- Pacotes Turísticos
- Roteiros de Viagem
- Documentação de Viagem
- Vendas Consultivas

#### 5. Maître / Garçom (Junior, Pleno) - 45 perguntas
**Competências Técnicas:**
- Serviço de Mesa
- Cardápio e Harmonização
- Atendimento ao Cliente
- Gestão de Salão
- Mise en Place

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

#### 2. Supervisor de Produção (Pleno, Senior) - 52 perguntas
**Competências Técnicas:**
- Gestão de Equipes de Produção
- Indicadores de Produtividade
- Planejamento de Turnos
- Resolução de Problemas
- Melhoria Contínua

#### 3. Técnico de Manutenção (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Manutenção Preventiva/Corretiva
- Diagnóstico de Falhas
- Elétrica Industrial
- Mecânica Industrial
- PCM (Planejamento e Controle de Manutenção)

#### 4. Analista de PCP (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Planejamento de Produção
- MRP/MRP II
- Sequenciamento
- Gestão de Materiais
- Sistemas ERP

#### 5. Inspetor de Qualidade (Junior, Pleno, Senior) - 73 perguntas
**Competências Técnicas:**
- Controle Estatístico de Processo
- Normas ISO
- Auditorias de Qualidade
- Instrumentos de Medição
- Não Conformidades

**TOTAL INDÚSTRIA: ~316 perguntas**

---

## TEMPLATE DE ARQUIVO

Cada arquivo deve seguir este padrão:

```typescript
/**
 * Banco de Perguntas v4 - [NOME DA ÁREA]
 *
 * Melhorias aplicadas:
 * - Perguntas aprofundadas (sem sim/não)
 * - Variações por nível (Junior, Pleno, Senior)
 * - Perguntas de case e cenário realistas
 * - Tom cordial de recrutador experiente
 * - Foco em competências práticas e soft skills
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

## ATUALIZAÇÃO DO INDEX.TS

Após criar todos os arquivos, atualizar `index.ts`:

```typescript
// Novas áreas
export * from './saude';
import { perguntasSaude, estatisticasSaude } from './saude';

export * from './callcenter';
import { perguntasCallcenter, estatisticasCallcenter } from './callcenter';

// ... repetir para todas as áreas

export const todasPerguntas = [
  ...perguntasTecnologia,
  ...perguntasJuridico,
  ...perguntasVarejo,
  ...perguntasComercial,
  ...perguntasAdministrativo,
  ...perguntasSaude,
  ...perguntasCallcenter,
  ...perguntasLogistica,
  ...perguntasEngenharia,
  ...perguntasAgronegocio,
  ...perguntasEducacao,
  ...perguntasHotelaria,
  ...perguntasIndustria,
];
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

**Sessão 1 (Saúde):**
```
Crie o arquivo saude.ts com todas as perguntas da área de Saúde conforme o GUIA-CRIACAO-PERGUNTAS.md
```

**Sessão 2 (Call Center):**
```
Crie o arquivo callcenter.ts com todas as perguntas da área de Call Center conforme o GUIA-CRIACAO-PERGUNTAS.md
```

**Sessão 3 (Logística):**
```
Crie o arquivo logistica.ts com todas as perguntas da área de Logística conforme o GUIA-CRIACAO-PERGUNTAS.md
```

**Sessão 4 (Engenharia):**
```
Crie o arquivo engenharia.ts com todas as perguntas da área de Engenharia/Construção conforme o GUIA-CRIACAO-PERGUNTAS.md
```

**Sessão 5 (Agronegócio):**
```
Crie o arquivo agronegocio.ts com todas as perguntas da área de Agronegócio conforme o GUIA-CRIACAO-PERGUNTAS.md
```

**Sessão 6 (Educação):**
```
Crie o arquivo educacao.ts com todas as perguntas da área de Educação conforme o GUIA-CRIACAO-PERGUNTAS.md
```

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
