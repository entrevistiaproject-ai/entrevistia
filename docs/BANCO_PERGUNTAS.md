# Sistema de Banco de Perguntas

## Visão Geral

O sistema de Banco de Perguntas permite que cada recrutador tenha seu próprio banco privado de perguntas, além de acessar um conjunto de perguntas padrão fornecidas pela plataforma.

## Características

### 🔒 Privacidade por Recrutador
- **Cada recrutador tem seu próprio banco privado** de perguntas
- Recrutadores **não veem** perguntas de outros recrutadores
- Todos os recrutadores têm acesso às **perguntas padrão** do sistema

### 📝 Tipos de Perguntas

#### 1. Perguntas Padrão do Sistema
- Criadas e mantidas pela plataforma
- `isPadrao: true` e `userId: null`
- Visíveis para **todos os recrutadores**
- **Não podem** ser editadas ou excluídas pelos recrutadores
- Identificadas com badge "Padrão" (⭐)

#### 2. Perguntas Personalizadas
- Criadas pelos recrutadores
- `isPadrao: false` e vinculadas ao `userId`
- Visíveis **apenas** para o recrutador que criou
- **Podem** ser editadas e excluídas pelo dono

## Estrutura do Banco de Dados

```typescript
perguntasTemplates {
  id: uuid
  userId: uuid | null          // null = pergunta padrão do sistema
  texto: text                  // Texto da pergunta
  cargo: text                  // Ex: "Advogado", "Desenvolvedor"
  nivel: text                  // junior, pleno, senior
  categoria: text              // tecnica, comportamental, soft_skill, hard_skill
  competencia: text            // Ex: "Direito Contratual", "Liderança"
  tipo: text                   // texto, video, audio
  isPadrao: boolean            // true = pergunta do sistema
  criteriosAvaliacao: jsonb    // Critérios para avaliação da IA
  tags: jsonb                  // Tags para busca
  createdAt: timestamp
  updatedAt: timestamp
  deletedAt: timestamp
}
```

## Categorias de Perguntas

### 📘 Técnica
Avalia conhecimentos específicos da área de atuação.
- Exemplo: "Descreva sua experiência com elaboração de contratos complexos"

### 🎯 Hard Skill
Avalia habilidades técnicas específicas e mensuráveis.
- Exemplo: "Quais ferramentas jurídicas e softwares você utiliza?"

### 💡 Soft Skill
Avalia habilidades comportamentais e interpessoais.
- Exemplo: "Como você gerencia seu tempo entre múltiplos casos urgentes?"

### 🧠 Comportamental
Avalia valores, ética e adequação cultural.
- Exemplo: "Descreva uma situação em que você enfrentou um dilema ético"

## Banco de Perguntas Padrão

### Advogado Pleno (12 perguntas)

**Técnicas (3)**
- Direito Contratual
- Atualização Profissional
- Litígio e Estratégia Processual

**Hard Skills (2)**
- Tecnologia Jurídica
- Due Diligence e Análise de Riscos

**Soft Skills (4)**
- Comunicação Clara
- Negociação e Gestão de Conflitos
- Gestão de Tempo e Priorização
- Liderança e Mentoria

**Comportamentais (3)**
- Ética Profissional
- Resiliência e Aprendizado
- Visão de Negócios

## API

### GET /api/perguntas
Retorna perguntas padrão + perguntas do usuário logado.

**Filtro aplicado:**
```typescript
WHERE isPadrao = true OR userId = {userId_logado}
```

### POST /api/perguntas
Cria uma nova pergunta vinculada ao usuário logado.

**Campos obrigatórios:**
- texto
- cargo
- nivel
- categoria
- competencia

**Campos opcionais:**
- tipo (padrão: "texto")
- tags
- criteriosAvaliacao

## Autenticação (Temporário)

⚠️ **IMPORTANTE:** O sistema atualmente usa um header temporário `x-user-id` para identificar o usuário.

**TODO:** Implementar autenticação real com:
- JWT ou Session Cookies
- Middleware de autenticação
- Protected routes
- Refresh tokens

Quando implementar auth real, substituir:
```typescript
// Atual (temporário)
const userId = request.headers.get("x-user-id");

// Futuro (com auth)
const session = await getServerSession();
const userId = session.user.id;
```

## Interface

### Página de Listagem
- **Filtros:** cargo, categoria, nível, busca por texto
- **Estatísticas:** total, padrão, personalizadas, cargos cobertos
- **Cards visuais** com badges coloridos por categoria

### Formulário de Cadastro
- Informações básicas da pergunta
- Critérios de avaliação para IA
- Sistema de tags

### Permissões Visuais
- Perguntas padrão: badge "Padrão" ⭐, sem botões de edição
- Perguntas próprias: botões de editar ✏️ e excluir 🗑️

## Próximos Passos

1. **Implementar autenticação real** (JWT/Session)
2. Adicionar endpoints para edição e exclusão
3. Integrar seleção de perguntas ao criar entrevista
4. Criar mais seeds para outros cargos
5. Adicionar preview das perguntas
6. Sistema de favoritos/templates

## Scripts Úteis

```bash
# Criar tabela no banco
node scripts/create-table-perguntas.js

# Popular com perguntas padrão
npx tsx scripts/seed-perguntas.ts
```
