# Changelog: Sistema de Banco de Perguntas Inteligente

## 🚀 Implementado em 2025-12-09

### ✨ Novidades

#### 1. **Sistema de Tags Flexível**
- ✅ Perguntas podem ter **múltiplos cargos** ou nenhum (universal)
- ✅ Perguntas podem ter **múltiplos níveis** ou nenhum (universal)
- ✅ Sistema totalmente flexível: uma pergunta pode ser específica, parcialmente universal, ou totalmente universal

**Exemplos:**
```json
// Pergunta universal (qualquer cargo/nível)
{ "cargos": [], "niveis": [] }

// Universal para Advogado (qualquer nível)
{ "cargos": ["Advogado"], "niveis": [] }

// Específica para Dev Senior
{ "cargos": ["Desenvolvedor"], "niveis": ["senior"] }

// Múltiplos cargos e níveis
{ "cargos": ["Advogado", "Consultor"], "niveis": ["pleno", "senior"] }
```

#### 2. **Filtro Inteligente de Perguntas (Sem IA)**
- ✅ Sistema de **scoring por relevância** (0-100 pontos)
- ✅ Matching semântico simples baseado em palavras-chave
- ✅ Filtro com **diversidade automática** de categorias
- ✅ Sugestões complementares para evitar redundância
- ✅ **Zero custo** - tudo roda localmente

**Pesos de Scoring:**
- Match de Cargo: até 40 pontos
- Match de Nível: até 30 pontos
- Match de Descrição: até 20 pontos
- Match de Categoria: até 10 pontos
- Bônus: +5 pts (universal), +3 pts (pergunta padrão)

#### 3. **Classificação Automática Opcional**
- ✅ Sugestão de categoria baseada no texto da pergunta
- ✅ Sistema simples de regex e palavras-chave (sem IA)
- ✅ Níveis de confiança: alta, média, baixa
- ✅ **Totalmente opcional** - não bloqueia criação de pergunta
- ✅ Usuário pode aceitar ou alterar sugestão

**Categorias:**
- 💭 **Comportamental** - Experiências e situações passadas
- ⚙️ **Técnica** - Conhecimentos técnicos e implementação
- 🤝 **Soft Skills** - Habilidades interpessoais
- 📚 **Hard Skills** - Certificações e conhecimentos específicos

### 🛠️ Mudanças Técnicas

#### Schema
- **Adicionado:** `cargos` (jsonb, array de strings)
- **Adicionado:** `niveis` (jsonb, array de strings)
- **Adicionado:** `metadados` (jsonb, opcional)
- **Modificado:** `cargo` e `nivel` agora são nullable (retrocompatibilidade)
- **Modificado:** `competencia` agora é nullable (opcional)

#### APIs

**POST /api/perguntas**
- Categoria agora é opcional (sugere automaticamente se não fornecida)
- Aceita arrays de cargos e níveis
- Retrocompatível com código antigo

**GET /api/perguntas**
- Suporta filtros por cargo, nível, descrição, categorias
- Retorna perguntas ranqueadas por score de relevância
- Limite configurável

**POST /api/perguntas/sugerir**
- Sugere perguntas complementares
- Evita redundância nas selecionadas
- Prioriza diversidade de categorias/competências

**POST /api/perguntas/sugerir-categoria**
- Endpoint para obter sugestão de categoria em tempo real
- Útil para feedback visual no frontend
- Retorna categoria, confiança e motivo

#### Componentes

**SeletorCategoria** (React)
- Componente para seleção de categoria com sugestão automática
- Mostra badge visual de sugestão
- Dropdown com todas as categorias disponíveis
- Feedback em tempo real conforme usuário digita

### 📊 Performance

- **Custo:** Zero (sem IA, sem APIs externas)
- **Velocidade:** < 1ms por pergunta
- **Escalabilidade:** Funciona bem com milhares de perguntas
- **Offline:** Funciona completamente offline

### 🔄 Migrations

**0007_refactor_perguntas_templates.sql**
- Adiciona novas colunas (cargos, niveis, metadados)
- Migra dados existentes automaticamente
- Torna competencia nullable

**0008_make_old_columns_nullable.sql**
- Torna cargo e nivel nullable
- Mantém colunas antigas para retrocompatibilidade

### 📝 Arquivos Criados

**Backend:**
- `lib/db/schema/perguntas-templates.ts` (atualizado)
- `lib/services/filtro-perguntas.ts` (novo)
- `lib/utils/classificacao-perguntas.ts` (novo)

**APIs:**
- `app/api/perguntas/route.ts` (atualizado)
- `app/api/perguntas/sugerir/route.ts` (novo)
- `app/api/perguntas/sugerir-categoria/route.ts` (novo)

**Frontend:**
- `components/perguntas/seletor-categoria.tsx` (novo)

**Documentação:**
- `lib/services/README-filtro-perguntas.md` (novo)
- `CHANGELOG-PERGUNTAS.md` (este arquivo)

**Scripts de Teste:**
- `scripts/test-perguntas-schema.js`
- `scripts/test-sistema-completo.js`

### 🧪 Testes

✅ Todos os testes passando:
- Schema atualizado corretamente
- Perguntas universais funcionando
- Classificação automática detectando categorias
- Filtro de relevância ranqueando corretamente
- Inserção e consulta de perguntas OK

### 📚 Como Usar

#### Criar Pergunta Universal
```typescript
POST /api/perguntas
{
  "texto": "Como você lida com pressão?",
  // Categoria opcional - sistema sugere
  "cargos": [],  // vazio = universal
  "niveis": []   // vazio = universal
}
```

#### Buscar Perguntas Relevantes
```typescript
GET /api/perguntas?cargo=Desenvolvedor&nivel=pleno&limite=20
```

#### Sugerir Perguntas Complementares
```typescript
POST /api/perguntas/sugerir
{
  "perguntasSelecionadasIds": ["id1", "id2"],
  "cargo": "Advogado",
  "nivel": "senior",
  "limite": 10
}
```

### 🔮 Próximos Passos

1. Atualizar interface do usuário para usar novo sistema
2. Adicionar opção de múltipla seleção de cargos/níveis no formulário
3. Mostrar score de relevância visualmente nas sugestões
4. Permitir usuário ajustar pesos do sistema de scoring
5. Analytics: quais perguntas geram melhores avaliações

### 🎯 Impacto

- ✅ Mais flexibilidade na organização de perguntas
- ✅ Melhor experiência para o usuário
- ✅ Reduz trabalho manual de categorização
- ✅ Perguntas mais relevantes nas sugestões
- ✅ Sistema escalável sem custos adicionais
