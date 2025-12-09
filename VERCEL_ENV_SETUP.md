# Configuração de Variáveis de Ambiente na Vercel

Para corrigir o erro `MIDDLEWARE_INVOCATION_FAILED` na Vercel, adicione as seguintes variáveis de ambiente no painel da Vercel:

## Variáveis Obrigatórias

### 1. AUTH_SECRET
```
AUTH_SECRET=6gygh7BEJBcaBFPSi/ZzNDUaLVdiI6pC+MD6J205Wao=
```

### 2. NEXTAUTH_SECRET (compatibilidade com código legado)
```
NEXTAUTH_SECRET=6gygh7BEJBcaBFPSi/ZzNDUaLVdiI6pC+MD6J205Wao=
```

### 3. AUTH_URL (para produção)
```
AUTH_URL=https://seu-dominio.vercel.app
```

### 4. NEXTAUTH_URL (compatibilidade com código legado)
```
NEXTAUTH_URL=https://seu-dominio.vercel.app
```

### 5. DATABASE_URL
```
DATABASE_URL=postgresql://neondb_owner:npg_g2zYchr0DQlE@ep-long-paper-acu62wj1-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

## Como Adicionar na Vercel

1. Acesse https://vercel.com/entrevistias-projects/entrevistia/settings/environment-variables
2. Adicione cada variável acima
3. Selecione os ambientes: Production, Preview e Development
4. Clique em "Save"
5. Faça um novo deploy ou use "Redeploy" no último deployment

## Importante

- Tanto `AUTH_URL` quanto `NEXTAUTH_URL` devem incluir o protocolo `https://`
- NextAuth v5 beta ainda usa `NEXTAUTH_URL` internamente em alguns casos
- Por isso mantemos ambas as variáveis para garantir compatibilidade

## Referências

- [NextAuth v5 Discussion #12297](https://github.com/nextauthjs/next-auth/discussions/12297)
- [Invalid URL Error Fix](https://community.vercel.com/t/err-invalid-url-possibly-linked-to-nextauth-v5/24925)
