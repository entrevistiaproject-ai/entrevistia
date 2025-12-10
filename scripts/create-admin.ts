import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

async function createAdmin() {
  const sql = neon(process.env.DATABASE_URL!);

  const email = "entrevistiaproject@gmail.com";

  console.log("🔧 Criando tabela admin_users se não existir...");

  // Cria a tabela se não existir
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      can_manage_users BOOLEAN NOT NULL DEFAULT true,
      can_manage_finances BOOLEAN NOT NULL DEFAULT true,
      can_view_analytics BOOLEAN NOT NULL DEFAULT true,
      can_manage_admins BOOLEAN NOT NULL DEFAULT false,
      can_access_logs BOOLEAN NOT NULL DEFAULT true,
      is_active BOOLEAN NOT NULL DEFAULT true,
      last_login_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      created_by UUID,
      ip_last_login TEXT,
      user_agent_last_login TEXT
    )
  `;

  console.log("✅ Tabela criada/verificada!");

  // Busca a senha do usuário no sistema regular
  const userResult = await sql`
    SELECT password_hash FROM users WHERE email = ${email} LIMIT 1
  `;

  let passwordHash: string;

  if (!userResult || userResult.length === 0) {
    console.log("⚠️  Usuário não encontrado no sistema regular.");
    console.log("Criando admin com senha padrão...");
    passwordHash = await bcrypt.hash("Admin@123", 12);
  } else {
    console.log("✅ Usuário encontrado! Usando mesma senha.");
    passwordHash = userResult[0].password_hash as string;
  }

  // Verifica se admin já existe
  const existingAdmin = await sql`
    SELECT id FROM admin_users WHERE email = ${email} LIMIT 1
  `;

  if (existingAdmin && existingAdmin.length > 0) {
    console.log("ℹ️  Admin já existe, atualizando...");
    await sql`
      UPDATE admin_users
      SET password_hash = ${passwordHash},
          role = 'super_admin',
          can_manage_users = true,
          can_manage_finances = true,
          can_view_analytics = true,
          can_manage_admins = true,
          can_access_logs = true,
          updated_at = NOW()
      WHERE email = ${email}
    `;
    console.log("✅ Admin atualizado com sucesso!");
  } else {
    await sql`
      INSERT INTO admin_users (nome, email, password_hash, role, can_manage_users, can_manage_finances, can_view_analytics, can_manage_admins, can_access_logs)
      VALUES ('Administrador Principal', ${email}, ${passwordHash}, 'super_admin', true, true, true, true, true)
    `;
    console.log("✅ Admin criado com sucesso!");
  }

  if (!userResult || userResult.length === 0) {
    console.log("");
    console.log("⚠️  ATENÇÃO: Foi usada uma senha padrão (Admin@123)");
    console.log("⚠️  Altere a senha após o primeiro login!");
  } else {
    console.log("");
    console.log("✅ Admin usando a mesma senha do usuário do sistema!");
  }

  console.log("");
  console.log("📌 Acesse o painel admin em: /admin-login");
  console.log("📌 Email: " + email);
}

createAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erro ao criar admin:", error);
    process.exit(1);
  });
