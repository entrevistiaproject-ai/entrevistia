# Progresso: Melhoria do Banco de Perguntas v4

## Status Geral
- **Iniciado em:** 2025-12-09
- **Status:** ✅ CONCLUÍDO
- **Última atualização:** 2025-12-09
- **Total de perguntas:** ~850 perguntas

## Melhorias Aplicadas
1. Aprofundar perguntas técnicas (eliminar sim/não)
2. Criar variações por nível (junior/pleno/senior)
3. Adicionar perguntas de case/cenário
4. Incluir perguntas de valores/cultura/motivação
5. Tom cordial de recrutador experiente
6. Perguntas ricas com contexto

## Cargos - Status

### Tecnologia ✅ CONCLUÍDO (tecnologia.ts)
- [x] Desenvolvedor Front-End (Junior: 16, Pleno: 18, Senior: 20)
- [x] Desenvolvedor Back-End (Junior: 16, Pleno: 18, Senior: 20)
- [x] Cientista de Dados (Pleno: 18)
- [x] QA / Testes (Junior: 16, Pleno: 17)
- [x] Suporte Técnico / HelpDesk (16)
- [x] Coordenador de Tecnologia (20)
**Total Tecnologia: ~175 perguntas**

### Jurídico ✅ CONCLUÍDO (juridico.ts)
- [x] Advogado Trabalhista (Junior: 16, Pleno: 18, Senior: 20)
- [x] Advogado Civil (Junior: 16, Pleno: 18, Senior: 20)
- [x] Advogado Criminal (Junior: 16, Pleno: 18, Senior: 20)
- [x] Advogado Tributário (Junior: 16, Pleno: 18, Senior: 20)
- [x] Analista Jurídico / Paralegal (16)
**Total Jurídico: ~232 perguntas**

### Varejo ✅ CONCLUÍDO (varejo.ts)
- [x] Operador de Caixa (16)
- [x] Repositor / Auxiliar de Loja (16)
- [x] Fiscal de Prevenção e Perdas (16)
- [x] Atendente / Vendedor de Loja (Junior: 16, Pleno: 18)
- [x] Supervisor / Líder de Loja (Junior: 16, Pleno: 18, Senior: 20)
**Total Varejo: ~136 perguntas**

### Comercial / Marketing ✅ CONCLUÍDO (comercial.ts)
- [x] Vendedor / Comercial (Junior: 16, Pleno: 18, Senior: 20)
- [x] Marketing (Junior: 16, Pleno: 18, Senior: 20)
- [x] Atendimento ao Cliente (Junior: 16, Pleno: 18, Senior: 20)
**Total Comercial/Marketing: ~162 perguntas**

### Administrativo / Gestão ✅ CONCLUÍDO (administrativo.ts)
- [x] Administrativo (Junior: 16, Pleno: 18)
- [x] Analista Financeiro (Junior: 16, Pleno: 18, Senior: 20)
- [x] RH / Recursos Humanos (Junior: 16, Pleno: 18, Senior: 20)
- [x] Gerente de Projetos (Junior: 16, Pleno: 18, Senior: 20)
**Total Administrativo/Gestão: ~178 perguntas**

## Estrutura dos Arquivos
```
lib/db/seeds/
├── banco-perguntas-v4/
│   ├── index.ts           # Exporta tudo consolidado
│   ├── types.ts           # Tipos compartilhados
│   ├── tecnologia.ts      # Cargos de TI
│   ├── juridico.ts        # Cargos jurídicos
│   ├── varejo.ts          # Cargos de varejo
│   ├── comercial.ts       # Comercial e Marketing
│   └── administrativo.ts  # Administrativo e Gestão
└── PROGRESSO_BANCO_PERGUNTAS.md
```

## Padrão de Perguntas por Nível

### Junior (16 perguntas)
- 4 técnicas básicas
- 4 experiência (pode ser acadêmica/estágio)
- 4 comportamentais
- 4 situacionais

### Pleno (18 perguntas)
- 5 técnicas intermediárias
- 4 experiência profissional
- 4 comportamentais
- 5 situacionais

### Senior (20 perguntas)
- 5 técnicas avançadas
- 5 experiência com liderança
- 5 comportamentais estratégicos
- 5 situacionais complexos

## Tom de Escrita das Perguntas

### Diretrizes de Tom (IMPORTANTE)
As perguntas devem soar como se fossem feitas por um **recrutador ultra experiente** em conversa cordial:

1. **Aberturas conversacionais**:
   - "Gostaria de entender como você..."
   - "Conte-me sobre..."
   - "Me fale sobre sua experiência com..."
   - "Poderia me explicar..."
   - "Com sua experiência, como você vê..."

2. **Contextualização antes da pergunta**:
   - Dar um breve contexto do tema antes de perguntar
   - Ex: "A terceirização passou por grandes mudanças nos últimos anos. Gostaria que você comparasse..."

3. **Perguntas compostas naturais**:
   - Combinar o "o quê" com o "como" de forma fluida
   - Ex: "Quais critérios você usa e como você decide..."

4. **Evitar**:
   - Perguntas secas e diretas demais
   - Tom de interrogatório
   - Perguntas de sim/não
   - Perguntas genéricas sem contexto

5. **Incluir sempre**:
   - Pedido de exemplos concretos
   - Espaço para o candidato elaborar
   - Conexão com situações reais da profissão

### Exemplos de Tom Correto

❌ **Errado**: "O que é rescisão por justa causa?"

✅ **Correto**: "Gostaria de entender como você diferencia as modalidades de rescisão contratual. Poderia me explicar as diferenças entre justa causa, sem justa causa e acordo mútuo, detalhando quais verbas são devidas em cada situação?"

❌ **Errado**: "Você já fez uma audiência?"

✅ **Correto**: "Audiências trabalhistas têm uma dinâmica muito própria. Conte-me sobre uma audiência que você acompanhou ou conduziu - como foi sua preparação e quais momentos exigiram mais jogo de cintura da sua parte?"

## Como Usar o Banco de Perguntas

```typescript
import { todasPerguntas, estatisticasGerais, imprimirEstatisticas } from './banco-perguntas-v4';

// Ver estatísticas
imprimirEstatisticas();

// Acessar todas as perguntas
console.log(`Total: ${todasPerguntas.length} perguntas`);

// Filtrar por cargo
const perguntasRH = todasPerguntas.filter(p => p.cargo.includes('RH'));

// Filtrar por nível
const perguntasSenior = todasPerguntas.filter(p => p.nivel === 'senior');

// Filtrar por categoria
const perguntasTecnicas = todasPerguntas.filter(p => p.categoria === 'tecnica');
```
