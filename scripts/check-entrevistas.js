require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function checkEntrevistas() {
  console.log("\n🔍 Verificando entrevistas no banco...\n");

  try {
    const result = await sql`
      SELECT
        id,
        titulo,
        status,
        user_id,
        created_at,
        deleted_at
      FROM entrevistas
      ORDER BY created_at DESC
    `;

    console.log(`📊 Total de entrevistas no banco: ${result.length}\n`);

    if (result.length === 0) {
      console.log("❌ Nenhuma entrevista encontrada no banco!");
      console.log("💡 Crie uma entrevista primeiro usando o botão 'Nova Entrevista'\n");
    } else {
      console.log("📋 Entrevistas encontradas:\n");
      result.forEach((e, i) => {
        console.log(`${i + 1}. ${e.titulo}`);
        console.log(`   ID: ${e.id}`);
        console.log(`   Status: ${e.status}`);
        console.log(`   User ID: ${e.user_id}`);
        console.log(`   Criada em: ${e.created_at}`);
        console.log(`   Deletada: ${e.deleted_at ? "SIM ⚠️" : "NÃO ✅"}`);
        console.log("");
      });

      const ativas = result.filter((e) => !e.deleted_at);
      console.log(`\n✅ Entrevistas ativas (não deletadas): ${ativas.length}`);
      console.log(`🗑️  Entrevistas deletadas: ${result.length - ativas.length}`);
    }
  } catch (error) {
    console.error("❌ Erro ao buscar entrevistas:", error.message);
  }
}

checkEntrevistas();
