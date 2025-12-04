// Export all schemas
export * from "./users";
export * from "./candidatos";
export * from "./entrevistas";
export * from "./perguntas";
export * from "./perguntas-templates";
export * from "./respostas";
export * from "./audit-logs";
export * from "./verification-codes";

// Export schema for Drizzle migrations
import { users } from "./users";
import { candidatos } from "./candidatos";
import { entrevistas } from "./entrevistas";
import { perguntas } from "./perguntas";
import { perguntasTemplates } from "./perguntas-templates";
import { respostas } from "./respostas";
import { auditLogs } from "./audit-logs";
import { verificationCodes } from "./verification-codes";

export const schema = {
  users,
  candidatos,
  entrevistas,
  perguntas,
  perguntasTemplates,
  respostas,
  auditLogs,
  verificationCodes,
};
