const { neon } = require("@neondatabase/serverless");

async function check() {
  const sql = neon(process.env.DATABASE_URL);

  const transacoes = await sql`
    SELECT id, tipo, descricao, valor_cobrado, analise_id, created_at
    FROM transacoes
    WHERE user_id = (SELECT id FROM users WHERE email = 'joannisbs@gmail.com')
    ORDER BY created_at DESC
    LIMIT 20
  `;

  console.log('Transacoes:');
  transacoes.forEach(t => {
    console.log(t.created_at, t.tipo, 'R$', t.valor_cobrado, 'analiseId:', t.analise_id ? t.analise_id.substring(0,8) : 'NULL');
  });
}

check().catch(console.error);
