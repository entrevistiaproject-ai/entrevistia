-- Adiciona a role 'financial' ao enum team_role
-- Esta role tem acesso às páginas financeiras (custos, fatura) mas não às funcionalidades de recrutamento

ALTER TYPE "team_role" ADD VALUE IF NOT EXISTS 'financial';
