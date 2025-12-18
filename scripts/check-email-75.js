const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function check() {
  // Verifica tickets relacionados a email
  const tickets = await sql`
    SELECT id, status, titulo, prioridade, created_at
    FROM tickets
    WHERE (titulo ILIKE '%email%' OR titulo ILIKE '%75%')
    ORDER BY created_at DESC
    LIMIT 10
  `;
  console.log("Tickets relacionados a email:", tickets.length);
  tickets.forEach(t => console.log(`[${t.created_at}] ${t.status}: ${t.titulo}`));

  // Dados do usuário
  const user = await sql`
    SELECT id, nome, email, notificacao_75_enviada_em, updated_at
    FROM users
    WHERE email = 'joannisbs@gmail.com'
  `;
  console.log("\n\nDados do usuário:");
  console.log("  Nome:", user[0].nome);
  console.log("  Email:", user[0].email);
  console.log("  Notificação 75% enviada em:", user[0].notificacao_75_enviada_em);
  console.log("  Updated at:", user[0].updated_at);
}

check().catch(console.error);
