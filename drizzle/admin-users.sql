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
);
