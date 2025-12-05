import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente de PRODUÇÃO
dotenv.config({ path: '.env.production' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não encontrada no .env.production');
}

console.log('🔥 Usando banco de PRODUÇÃO');

export default {
  schema: './lib/db/schema/index.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
