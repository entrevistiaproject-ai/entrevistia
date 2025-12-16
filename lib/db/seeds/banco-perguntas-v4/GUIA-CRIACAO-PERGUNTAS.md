# GUIA DE CRIAÇÃO DE PERGUNTAS - Banco de Perguntas v4

## 🚀 COMANDO RÁPIDO

```
proximo passo em GUIA-CRIACAO-PERGUNTAS.md
```

---

## 📋 PRÓXIMO PASSO: B11

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
| B11 | Hotelaria Parte 1 (Recepcionista, Camareiro, Gerente) | 🔴 EXECUTAR AGORA |
| B12 | Hotelaria Parte 2 (Agente de Viagens, Maître/Garçom) | ⏳ Aguardando |
| B13 | Indústria Parte 1 (Op. Produção, Supervisor, Téc. Manutenção) | ⏳ Aguardando |
| B14 | Indústria Parte 2 (Analista PCP, Inspetor Qualidade) | ⏳ Aguardando |
| B15 | Atualizar index.ts e validar tudo | ⏳ Aguardando |

---

## STATUS ATUAL

| Área | Perguntas | Status |
|------|-----------|--------|
| Tecnologia | 393 | ✅ Auditado |
| Jurídico | 316 | ✅ Auditado |
| Comercial | 219 | ✅ Auditado |
| Varejo | 281 | ✅ Auditado |
| Administrativo | 292 | ✅ Auditado |
| Saúde | 594 | ✅ Completo |
| Call Center | 198 | ✅ Completo |
| Logística | 281 | ✅ Completo |
| Engenharia | 389 | ✅ Completo |
| Agronegócio | 344 | ✅ Completo |
| Educação | 222 | ✅ Completo |
| Hotelaria | 0 | 🔴 Criar |
| Indústria | 0 | 🔴 Criar |

**Total atual: 3.529 | Meta: ~3.600+**

---

## B3: CALL CENTER

### Criar arquivo callcenter.ts com os cargos:

#### 1. Operador de Telemarketing (Junior, Pleno) - 45 perguntas
- Técnicas de Atendimento
- Scripts e Abordagem
- Metas e Indicadores
- Gestão de Reclamações
- Vendas por Telefone

#### 2. Supervisor de Call Center (Pleno, Senior) - 52 perguntas
- Gestão de Equipe
- Monitoramento de Qualidade
- Indicadores de Performance
- Treinamento de Operadores
- Gestão de Conflitos

#### 3. Analista de Qualidade (Junior, Pleno, Senior) - 73 perguntas
- Monitoramento de Ligações
- Feedback e Coaching
- Elaboração de Relatórios
- Calibração de Avaliações
- Melhoria Contínua

#### 4. Coordenador de Operações (Senior) - 28 perguntas
- Planejamento de Capacidade
- Gestão de Resultados
- Relacionamento com Clientes
- Processos e Procedimentos

---

## DISTRIBUIÇÃO PADRÃO

| Nível | Técnicas | Experiência | Comportamentais | Situacionais | TOTAL |
|-------|----------|-------------|-----------------|--------------|-------|
| Junior | 6 | 5 | 5 | 5 | **21** |
| Pleno | 6 | 6 | 6 | 6 | **24** |
| Senior | 7 | 7 | 7 | 7 | **28** |

---

## TEMPLATE DE PERGUNTAS

```typescript
export const farmaceuticoJunior: PerguntaSeed[] = [
  // Técnica (6)
  { area: 'saude', texto: '...', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'tecnica', competencia: '...' },
  // Experiência (5)
  { area: 'saude', texto: '...', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'experiencia', competencia: '...' },
  // Comportamental (5)
  { area: 'saude', texto: '...', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'comportamental', competencia: '...' },
  // Situacional (5)
  { area: 'saude', texto: '...', cargo: 'Farmacêutico', nivel: 'junior', categoria: 'situacional', competencia: '...' },
];
```

---

## DICAS RÁPIDAS

- Use método STAR: "Conte-me sobre uma situação em que..."
- Evite perguntas sim/não
- Tom cordial e profissional
- Variar competências por cargo/nível
- Após B2, atualizar estatísticas no final do saude.ts
