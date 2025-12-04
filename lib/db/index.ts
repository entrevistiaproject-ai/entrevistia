import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Função para obter a DATABASE_URL com validação
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('❌ DATABASE_URL não encontrada!');
    console.error('Variáveis de ambiente disponíveis:', Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('KEY')));
    throw new Error(
      '🔴 DATABASE_URL não encontrada nas variáveis de ambiente'
    );
  }
  return url;
}

// Lazy initialization: só cria a conexão quando realmente usada
let _sql: ReturnType<typeof neon> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function getSQL() {
  if (!_sql) {
    _sql = neon(getDatabaseUrl());
  }
  return _sql;
}

export function getDB() {
  if (!_db) {
    _db = drizzle(getSQL(), { schema });
  }
  return _db;
}

// Mantém compatibilidade com código existente usando Proxy para lazy initialization
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return getDB()[prop as keyof ReturnType<typeof drizzle>];
  }
});
