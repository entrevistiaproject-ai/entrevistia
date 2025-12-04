# 🔌 Como Conectar com o Neon - Guia Completo

## 📋 Passo a Passo

### 1️⃣ No Painel do Neon

1. Acesse: https://console.neon.tech
2. Selecione seu projeto `entrevistia`
3. Vá em **Dashboard** ou **Connection Details**
4. Copie a **Connection String** completa

Ela vai parecer com isso:
```
postgresql://neondb_owner:npg_ABC123xyz456@ep-cool-shadow-123456.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2️⃣ Cole no Arquivo .env.local

Abra o arquivo `.env.local` (na raiz do projeto) e cole a connection string:

```env
DATABASE_URL="postgresql://neondb_owner:sua_senha@seu_host.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="9t2VI7zXIqvqeVizLipKBbanQy37KKkaGo9lnE5WpIY="
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3️⃣ Teste a Conexão

Execute no terminal:

```bash
# Testa se consegue conectar
npm run db:push
```

Se aparecer algo como "Connecting to database..." e não der erro, está funcionando! ✅

---

## 🛠️ Comandos Úteis do Banco

Agora você tem esses comandos disponíveis:

```bash
# Gerar migrations (arquivos SQL das mudanças no schema)
npm run db:generate

# Aplicar migrations no banco
npm run db:migrate

# Push direto (sem criar migration, bom pra dev)
npm run db:push

# Abrir interface visual do banco (Drizzle Studio)
npm run db:studio
```

---

## 🔍 Como Funciona a Conexão

### Arquivos Criados:

1. **`lib/db/index.ts`** - Conexão principal com Neon
   ```typescript
   import { db } from '@/lib/db'

   // Use em qualquer lugar do código:
   const entrevistas = await db.select().from(entrevistasTable)
   ```

2. **`drizzle.config.ts`** - Configuração do Drizzle Kit
   - Define onde ficam os schemas
   - Onde salvar as migrations
   - Credenciais do banco

3. **`.env.local`** - Variáveis de ambiente
   - DATABASE_URL (nunca commitar!)
   - Já está no .gitignore

---

## ✅ Checklist

- [ ] Copiou a connection string do Neon
- [ ] Colou no arquivo `.env.local`
- [ ] Substituiu a NEXTAUTH_SECRET
- [ ] Rodou `npm run db:push` para testar

---

## 🚀 Próximos Passos

Depois que a conexão estiver funcionando:

1. ✅ Criar schemas do banco (users, entrevistas, candidatos, etc)
2. ✅ Rodar migrations
3. ✅ Criar APIs de CRUD
4. ✅ Implementar autenticação

---

## ❓ Problemas Comuns

### "DATABASE_URL não encontrada"
→ Certifique-se de que o arquivo `.env.local` existe e tem a variável

### "Connection refused"
→ Verifique se a connection string está correta (com senha)

### "SSL required"
→ Certifique-se de que tem `?sslmode=require` no final da URL

---

**Depois de configurar, me avise para continuar! 🚀**
