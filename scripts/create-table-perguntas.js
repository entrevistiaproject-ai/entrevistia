const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function createTable() {
  console.log('🔧 Criando tabela perguntas_templates...\n');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada');
  }

  const sql = neon(databaseUrl);

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "perguntas_templates" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid,
        "texto" text NOT NULL,
        "cargo" text NOT NULL,
        "nivel" text NOT NULL,
        "categoria" text NOT NULL,
        "competencia" text NOT NULL,
        "tipo" text DEFAULT 'texto' NOT NULL,
        "is_padrao" boolean DEFAULT false NOT NULL,
        "criterios_avaliacao" jsonb,
        "tags" jsonb,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "deleted_at" timestamp
      );
    `;

    console.log('✅ Tabela criada com sucesso');

    await sql`
      ALTER TABLE "perguntas_templates" DROP CONSTRAINT IF EXISTS "perguntas_templates_user_id_users_id_fk"
    `;

    await sql`
      ALTER TABLE "perguntas_templates"
      ADD CONSTRAINT "perguntas_templates_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "public"."users"("id")
      ON DELETE cascade ON UPDATE no action
    `;

    console.log('✅ Constraint adicionada');
    console.log('\n🎉 Pronto para inserir perguntas!\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

createTable();
