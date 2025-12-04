import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Verifica se a DATABASE_URL está configurada
if (!process.env.DATABASE_URL) {
  throw new Error(
    '🔴 DATABASE_URL não encontrada! Configure no arquivo .env.local'
  );
}

// Cria a conexão HTTP com o Neon
// Funciona em Edge Runtime (super rápido e barato)
const sql = neon(process.env.DATABASE_URL);

// Cria o cliente do Drizzle com schema
export const db = drizzle(sql, { schema });

// Export do sql client caso precise fazer queries raw
export { sql };
