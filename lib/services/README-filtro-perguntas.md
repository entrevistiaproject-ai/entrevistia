# Sistema de Filtro Inteligente de Perguntas

Sistema flexível e eficiente para gerenciar banco de perguntas com tags múltiplas, filtro inteligente e **classificação automática opcional** - tudo **sem IA**.

## Características

### 1. Tags Flexíveis
- Uma pergunta pode ter **múltiplos cargos** ou nenhum (universal)
- Uma pergunta pode ter **múltiplos níveis** ou nenhum (universal)
- Perguntas universais são aplicáveis a qualquer contexto

### 2. Filtro Inteligente
- Sistema de **scoring** baseado em relevância
- Matching semântico simples (sem custos de IA)
- Diversidade automática de categorias
- Sugestões complementares para evitar redundância

### 3. Classificação Automática (Opcional)
- **Sugestão de categoria** baseada no texto da pergunta
- Sistema simples de palavras-chave (sem IA, sem custos)
- Usuário pode aceitar ou alterar a sugestão
- Níveis de confiança: alta, média, baixa
- **Não é obrigatório** - ajuda na organização

## Uso

### Criar Pergunta

```typescript
// POST /api/perguntas
{
  "texto": "Como você lidaria com um conflito em sua equipe?",

  // Categoria é OPCIONAL - se não fornecer, sistema sugere automaticamente
  "categoria": "comportamental", // ou deixe vazio

  // Opcional: definir cargos específicos
  "cargos": ["Gerente de Projetos", "Tech Lead"],

  // Opcional: definir níveis específicos
  "niveis": ["pleno", "senior"],

  // Ou deixar vazio para pergunta universal!
  "cargos": [],
  "niveis": []
}
```

**Classificação automática:**
- Se categoria não for fornecida, sistema sugere baseado no texto
- Usa palavras-chave simples (ex: "conte sobre" = comportamental)
- Retorna nível de confiança (alta/média/baixa)
- **Totalmente opcional** - ajuda o usuário a se organizar

### Sugerir Categoria em Tempo Real

```typescript
// POST /api/perguntas/sugerir-categoria
{
  "texto": "Conte sobre uma vez que você liderou um projeto difícil"
}

// Resposta:
{
  "categoria": "comportamental",
  "confianca": "alta",
  "motivo": "Pergunta sobre experiências/situações passadas"
}
```

### Buscar Perguntas com Filtro

```typescript
// GET /api/perguntas?cargo=Advogado&nivel=pleno&limite=20
// Retorna perguntas ranqueadas por relevância

const perguntas = await fetch(
  '/api/perguntas?cargo=Advogado&nivel=pleno&descricao=direito civil&limite=20'
).then(r => r.json());

// Resultado: perguntas com score de relevância
[
  {
    id: "...",
    texto: "...",
    score: 85,
    motivoScore: [
      "Match exato de cargo: Advogado",
      "Match exato de nível: pleno",
      "3 palavras-chave relevantes na descrição"
    ]
  }
]
```

### Sugerir Perguntas Complementares

```typescript
// POST /api/perguntas/sugerir
{
  "perguntasSelecionadasIds": ["id1", "id2", "id3"],
  "cargo": "Desenvolvedor",
  "nivel": "senior",
  "limite": 10
}

// Retorna perguntas que:
// - Cobrem categorias ainda não representadas
// - Avaliam competências diferentes
// - São relevantes para o cargo/nível
```

## Exemplos de Perguntas

### Pergunta Universal (qualquer cargo)
```json
{
  "texto": "Como você lida com pressão e prazos apertados?",
  "cargos": [],
  "niveis": [],
  "categoria": "comportamental"
}
```
**Score alto para:** qualquer cargo/nível (+15 pontos de universalidade)

### Pergunta Universal para Nível (qualquer cargo, pleno+)
```json
{
  "texto": "Descreva uma situação onde você liderou um projeto complexo",
  "cargos": [],
  "niveis": ["pleno", "senior"],
  "categoria": "comportamental"
}
```
**Score alto para:** qualquer cargo em nível pleno/senior

### Pergunta Universal para Cargo (Advogado, qualquer nível)
```json
{
  "texto": "Qual sua experiência com processos trabalhistas?",
  "cargos": ["Advogado"],
  "niveis": [],
  "categoria": "tecnica"
}
```
**Score alto para:** Advogado de qualquer nível

### Pergunta Específica
```json
{
  "texto": "Como você implementaria um sistema de cache distribuído?",
  "cargos": ["Desenvolvedor", "Engenheiro de Software"],
  "niveis": ["senior", "especialista"],
  "categoria": "tecnica"
}
```
**Score alto para:** Dev/Eng senior/especialista

## Sistema de Scoring

### Pesos de Relevância
- **Match de Cargo:** 40 pontos
  - Exato (≥80% similaridade): 40 pts
  - Parcial (≥50% similaridade): 25 pts
  - Universal (sem cargo): 15 pts

- **Match de Nível:** 30 pontos
  - Exato (≥80% similaridade): 30 pts
  - Parcial (≥50% similaridade): 15 pts
  - Universal (sem nível): 20 pts

- **Match de Descrição:** 20 pontos
  - Baseado em palavras-chave comuns
  - Proporção de overlap

- **Match de Categoria:** 10 pontos
  - Se categoria solicitada corresponde

- **Bônus:**
  - Pergunta totalmente universal: +5 pts
  - Pergunta padrão do sistema: +3 pts
  - Categoria não coberta: +15 pts (em sugestões)
  - Competência diferente: +10 pts (em sugestões)

### Score Mínimo
Perguntas com score < 10 são filtradas automaticamente.

## Funções Principais

### `filtrarPerguntas()`
Filtra e ordena por relevância básica.

### `filtrarComDiversidade()`
Filtra mantendo diversidade de categorias. Recomendado para seleção de perguntas.

### `sugerirPerguntasComplementares()`
Sugere perguntas que cobrem lacunas nas já selecionadas.

### `analisarPergunta()`
Extrai metadados automaticamente de uma pergunta.

## Performance

- **Sem custos de IA:** Todo processamento é local
- **Rápido:** Algoritmos O(n) simples
- **Escalável:** Funciona bem com milhares de perguntas
- **Eficiente:** Usa apenas string matching e contagem

## Migração

Para migrar perguntas antigas:

```bash
npm run db:migrate
```

As colunas `cargo` e `nivel` antigas são preservadas por segurança.
Após validar, você pode removê-las manualmente.

## Uso no Frontend (React)

### Componente SeletorCategoria

```tsx
import { SeletorCategoria } from '@/components/perguntas/seletor-categoria';
import { useState } from 'react';

function FormularioPergunta() {
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState<CategoriaPerguntas>();

  return (
    <form>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite sua pergunta..."
      />

      {/* Seletor de categoria com sugestão automática */}
      <SeletorCategoria
        textoPergunta={texto}
        categoriaAtual={categoria}
        onChange={setCategoria}
      />

      {/* Resto do formulário... */}
    </form>
  );
}
```

**Comportamento:**
- Conforme usuário digita, sistema sugere categoria
- Badge "Sugerido" aparece quando há sugestão automática
- Usuário pode clicar para ver todas as categorias
- Cada categoria mostra ícone, descrição e exemplos
- Totalmente opcional - funciona sem JavaScript também

## Roadmap Futuro

1. Cache de scores calculados
2. Feedback do usuário para ajustar pesos de scoring
3. Análise de performance das perguntas (quais geram melhores avaliações)
4. Machine learning para melhorar sugestões (opcional, se justificar)
