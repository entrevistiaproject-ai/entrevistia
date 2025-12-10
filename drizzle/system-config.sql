-- Migration: Create system_config and system_config_history tables
-- Description: Tables for storing system configuration (pricing, trial limits, etc.)

-- Create system_config table
CREATE TABLE IF NOT EXISTS system_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    value_type TEXT NOT NULL DEFAULT 'string',
    category TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create system_config_history table
CREATE TABLE IF NOT EXISTS system_config_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT NOT NULL,
    changed_by UUID REFERENCES admin_users(id),
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_system_config_key ON system_config(key);
CREATE INDEX IF NOT EXISTS idx_system_config_category ON system_config(category);
CREATE INDEX IF NOT EXISTS idx_system_config_history_key ON system_config_history(config_key);
CREATE INDEX IF NOT EXISTS idx_system_config_history_created ON system_config_history(created_at DESC);

-- Add comments
COMMENT ON TABLE system_config IS 'Configurações globais do sistema (preços, limites, etc.)';
COMMENT ON TABLE system_config_history IS 'Histórico de alterações de configurações para auditoria';
