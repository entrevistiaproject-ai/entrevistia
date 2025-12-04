import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não encontrada no .env.local');
}

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
