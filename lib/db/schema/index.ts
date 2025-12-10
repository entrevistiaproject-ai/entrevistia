// Export all schemas
export * from "./users";
export * from "./candidatos";
export * from "./entrevistas";
export * from "./perguntas";
export * from "./perguntas-templates";
export * from "./respostas";
export * from "./audit-logs";
export * from "./verification-codes";
export * from "./transacoes";
export * from "./candidato-entrevistas";
export * from "./admin-users";
export * from "./system-config";

// Export schema for Drizzle migrations
import { users } from "./users";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";
import { perguntas } from "./perguntas";
import { perguntasTemplates, perguntasOcultas } from "./perguntas-templates";
import { respostas } from "./respostas";
import { auditLogs } from "./audit-logs";
import { verificationCodes } from "./verification-codes";
import { faturas, transacoes } from "./transacoes";
import { candidatoEntrevistas } from "./candidato-entrevistas";
import { adminUsers } from "./admin-users";
import { systemConfig, systemConfigHistory } from "./system-config";

export const schema = {
  users,
  candidatos,
  entrevistas,
  perguntas,
  perguntasTemplates,
  perguntasOcultas,
  respostas,
  auditLogs,
  verificationCodes,
  faturas,
  transacoes,
  candidatoEntrevistas,
  adminUsers,
  systemConfig,
  systemConfigHistory,
};
