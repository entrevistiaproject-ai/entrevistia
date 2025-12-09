require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function checkUser() {
  console.log("\n🔍 Verificando usuários e suas entrevistas...\n");

  try {
    const users = await sql`
      SELECT
        u.id,
        u.nome,
        u.email,
        COUNT(e.id) as total_entrevistas
      FROM users u
      LEFT JOIN entrevistas e ON e.user_id = u.id AND e.deleted_at IS NULL
      GROUP BY u.id, u.nome, u.email
      ORDER BY total_entrevistas DESC
    `;

    console.log(`👥 Usuários cadastrados: ${users.length}\n`);

    users.forEach((user, i) => {
      console.log(`${i + 1}. ${user.nome || "Sem nome"}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Entrevistas: ${user.total_entrevistas}`);
      console.log("");
    });

    // Mostrar detalhes da entrevista existente
    const entrevista = await sql`
      SELECT
        e.id,
        e.titulo,
        e.user_id,
        u.nome as user_nome,
        u.email as user_email
      FROM entrevistas e
      JOIN users u ON u.id = e.user_id
      WHERE e.deleted_at IS NULL
      LIMIT 1
    `;

    if (entrevista.length > 0) {
      const e = entrevista[0];
      console.log("\n📌 Detalhes da entrevista existente:");
      console.log(`   Título: ${e.titulo}`);
      console.log(`   Pertence a: ${e.user_nome} (${e.user_email})`);
      console.log(`   User ID: ${e.user_id}`);
      console.log("\n💡 Certifique-se de estar logado com este usuário!");
    }
  } catch (error) {
    console.error("❌ Erro:", error.message);
  }
}

checkUser();
