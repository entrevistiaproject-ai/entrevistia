const { config } = require("dotenv");
const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const { entrevistas } = require("../lib/db/schema/index.ts");
const { isNull } = require("drizzle-orm");

// Carregar variáveis de ambiente
config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL não está configurada");
  process.exit(1);
}

async function debugEntrevistas() {
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);

  console.log("\n🔍 Verificando entrevistas no banco...\n");

  try {
    // Buscar todas as entrevistas (incluindo deletadas)
    const todasEntrevistas = await db
      .select({
        id: entrevistas.id,
        titulo: entrevistas.titulo,
        status: entrevistas.status,
        userId: entrevistas.userId,
        createdAt: entrevistas.createdAt,
        deletedAt: entrevistas.deletedAt,
      })
      .from(entrevistas);

    console.log(`📊 Total de entrevistas no banco: ${todasEntrevistas.length}\n`);

    if (todasEntrevistas.length === 0) {
      console.log("❌ Nenhuma entrevista encontrada no banco!");
      console.log("💡 Crie uma entrevista primeiro usando o botão 'Nova Entrevista'\n");
    } else {
      console.log("📋 Entrevistas encontradas:\n");
      todasEntrevistas.forEach((e, i) => {
        console.log(`${i + 1}. ${e.titulo}`);
        console.log(`   ID: ${e.id}`);
        console.log(`   Status: ${e.status}`);
        console.log(`   User ID: ${e.userId}`);
        console.log(`   Criada em: ${e.createdAt}`);
        console.log(`   Deletada: ${e.deletedAt ? "SIM ⚠️" : "NÃO ✅"}`);
        console.log("");
      });

      // Contar entrevistas ativas
      const ativas = todasEntrevistas.filter((e) => !e.deletedAt);
      console.log(`\n✅ Entrevistas ativas (não deletadas): ${ativas.length}`);
      console.log(`🗑️  Entrevistas deletadas: ${todasEntrevistas.length - ativas.length}`);
    }
  } catch (error) {
    console.error("❌ Erro ao buscar entrevistas:", error);
  } finally {
    await client.end();
  }
}

debugEntrevistas();
