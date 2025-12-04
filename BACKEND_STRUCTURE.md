# 📁 Estrutura do Backend - EntrevistIA

## 🗂️ Organização de Pastas

```
entrevistia/
├── app/
│   ├── api/                          # API Routes (endpoints REST)
│   │   ├── entrevistas/
│   │   │   ├── route.ts              # GET /api/entrevistas, POST /api/entrevistas
│   │   │   └── [id]/
│   │   │       └── route.ts          # GET/PUT/DELETE /api/entrevistas/:id
│   │   ├── candidatos/
│   │   │   ├── route.ts              # CRUD de candidatos
│   │   │   └── [id]/route.ts
│   │   ├── perguntas/
│   │   │   └── route.ts              # Gerenciar perguntas
│   │   ├── respostas/
│   │   │   └── route.ts              # Salvar respostas
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts # NextAuth endpoints
│   │   ├── analise/                  # IA para análise
│   │   └── transcricao/              # Transcrição de áudio
│   │
│   ├── (dashboard)/                  # Páginas protegidas
│   ├── (auth)/                       # Páginas de autenticação
│   └── (public)/                     # Páginas públicas
│
├── lib/
│   ├── db/                           # Database layer
│   │   ├── index.ts                  # Conexão com Neon (Drizzle client)
│   │   ├── schema/                   # Schemas do banco
│   │   │   ├── users.ts              # Tabela de usuários
│   │   │   ├── entrevistas.ts        # Tabela de entrevistas
│   │   │   ├── candidatos.ts         # Tabela de candidatos
│   │   │   ├── perguntas.ts          # Tabela de perguntas
│   │   │   ├── respostas.ts          # Tabela de respostas
│   │   │   └── index.ts              # Export de todos schemas
│   │   └── queries/                  # Queries reutilizáveis
│   │       ├── entrevistas.ts        # getEntrevistas, createEntrevista, etc
│   │       ├── candidatos.ts
│   │       └── analytics.ts          # Queries de estatísticas
│   │
│   ├── actions/                      # Server Actions (para forms)
│   │   ├── entrevistas.ts            # createEntrevistaAction, etc
│   │   ├── candidatos.ts
│   │   └── auth.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── database.ts               # Types do banco (inferidos do Drizzle)
│   │   ├── api.ts                    # Types de requests/responses
│   │   └── index.ts
│   │
│   ├── validations/                  # Zod schemas (já existe)
│   │   ├── entrevista.ts
│   │   ├── candidato.ts
│   │   └── auth.ts
│   │
│   ├── api/                          # API helpers (já existe)
│   │   ├── client.ts                 # Fetch wrapper
│   │   └── endpoints.ts              # URLs dos endpoints
│   │
│   ├── utils/                        # Utilities
│   │   ├── auth.ts                   # Helper de autenticação
│   │   ├── errors.ts                 # Error handling
│   │   └── logger.ts                 # Logging
│   │
│   └── constants/                    # Constantes (já existe)
│
├── drizzle/                          # Migrations do Drizzle
│   └── migrations/
│       └── 0000_initial.sql
│
├── .env.local                        # Variáveis de ambiente
├── drizzle.config.ts                 # Configuração do Drizzle
└── middleware.ts                     # Middleware de autenticação
```

## 🔄 Fluxo de Dados

### 1. API Routes (REST)
```typescript
// Cliente faz request
fetch('/api/entrevistas')

// API Route processa
app/api/entrevistas/route.ts
  → valida dados (Zod)
  → chama query do DB
  → retorna JSON
```

### 2. Server Actions (Forms)
```typescript
// Componente chama action
<form action={createEntrevistaAction}>

// Server Action processa
lib/actions/entrevistas.ts
  → valida dados (Zod)
  → insere no DB
  → revalidate cache
  → redirect
```

## 📊 Schema do Banco (Preview)

```sql
-- users (empresas/recrutadores)
id, email, password_hash, nome, empresa, created_at

-- candidatos
id, user_id, nome, email, telefone, created_at

-- entrevistas
id, user_id, candidato_id, titulo, status, created_at

-- perguntas
id, entrevista_id, texto, ordem, tipo (texto/video/audio)

-- respostas
id, pergunta_id, candidato_id, resposta, score, created_at
```

## 🛠️ Próximos Passos

1. ✅ Estrutura de pastas criada
2. ⏳ Instalar dependências (Drizzle, Neon, Zod, NextAuth)
3. ⏳ Configurar .env com Neon connection string
4. ⏳ Criar schemas do banco
5. ⏳ Rodar migrations
6. ⏳ Implementar APIs básicas
7. ⏳ Configurar autenticação

## 📦 Dependências que vamos instalar

```json
{
  "dependencies": {
    "drizzle-orm": "^0.36.3",
    "@neondatabase/serverless": "^0.10.3",
    "next-auth": "^5.0.0-beta",
    "zod": "^3.24.1",
    "bcryptjs": "^2.4.3"
  },
  "devDependencies": {
    "drizzle-kit": "^0.30.0",
    "@types/bcryptjs": "^2.4.6"
  }
}
```
