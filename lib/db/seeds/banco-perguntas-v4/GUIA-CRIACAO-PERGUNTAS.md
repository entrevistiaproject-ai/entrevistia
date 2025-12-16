# GUIA DE CRIAÇÃO DE PERGUNTAS - Banco de Perguntas v4

## 🚀 COMANDO RÁPIDO

```
proximo passo em GUIA-CRIACAO-PERGUNTAS.md
```

---

## 📋 PRÓXIMO PASSO: B2

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

---

## STATUS ATUAL

| Área | Perguntas | Status |
|------|-----------|--------|
| Tecnologia | 388 | ✅ Auditado |
| Jurídico | 316 | ✅ Auditado |
| Comercial | 219 | ✅ Auditado |
| Varejo | 312 | ✅ Auditado |
| Administrativo | 292 | ✅ Auditado |
| **Saúde** | ~236 | 🟡 Parte 1/2 |
| Call Center | 0 | 🔴 Criar |
| Logística | 0 | 🔴 Criar |
| Engenharia | 0 | 🔴 Criar |
| Agronegócio | 0 | 🔴 Criar |
| Educação | 0 | 🔴 Criar |
| Hotelaria | 0 | 🔴 Criar |
| Indústria | 0 | 🔴 Criar |

**Total atual: ~1.763 | Meta: ~3.600+**

---

## B2: SAÚDE PARTE 2

### Cargos a adicionar em saude.ts:

#### 5. Farmacêutico (Junior, Pleno, Senior) - 73 perguntas
- Dispensação de Medicamentos
- Atenção Farmacêutica
- Controle de Estoque de Medicamentos
- Medicamentos Controlados
- Farmacovigilância
- Manipulação Farmacêutica

#### 6. Nutricionista (Junior, Pleno, Senior) - 73 perguntas
- Avaliação Nutricional
- Elaboração de Dietas
- Nutrição Clínica
- Educação Alimentar
- Gestão de UAN
- Segurança Alimentar

#### 7. Psicólogo (Junior, Pleno, Senior) - 73 perguntas
- Avaliação Psicológica
- Técnicas de Entrevista
- Psicoterapia
- Laudos e Pareceres
- Orientação Profissional
- Psicologia Organizacional

#### 8. Auxiliar de Saúde Bucal (Junior) - 21 perguntas
- Instrumentação Odontológica
- Biossegurança
- Radiologia Odontológica
- Preparo do Consultório
- Orientação de Higiene Bucal

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
