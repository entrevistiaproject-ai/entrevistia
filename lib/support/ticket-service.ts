/**
 * Serviço de Tickets/Chamados
 *
 * Fornece funcionalidades para:
 * - Criar tickets (manual ou automático)
 * - Classificação automática de categoria, prioridade e risco
 * - Gerenciamento de status e atribuição
 * - Logging de erros no sistema
 */

import { db } from "@/lib/db";
import {
  tickets,
  ticketMessages,
  ticketHistory,
  systemLogs,
  errorAggregations,
  NewTicket,
  NewTicketMessage,
  NewSystemLog,
  Ticket,
} from "@/lib/db/schema/tickets";
import { eq, desc, and, sql, gte, lte, or, ilike } from "drizzle-orm";
import { logger } from "@/lib/logger";

// Tipos para classificação automática
type TicketCategory = "usuario" | "sistemico" | "faturamento" | "performance" | "seguranca" | "integracao" | "sugestao" | "outro";
type TicketPriority = "baixa" | "media" | "alta" | "critica";
type TicketSource = "usuario" | "sistema" | "admin" | "pagina_erro" | "pagina_fatura" | "widget_suporte";

interface ClassificationResult {
  categoria: TicketCategory;
  prioridade: TicketPriority;
  riscoScore: number;
  riscoMotivo: string;
  tags: string[];
}

interface CreateTicketInput {
  userId?: string;
  userEmail: string;
  userName?: string;
  titulo: string;
  descricao: string;
  categoria?: TicketCategory;
  prioridade?: TicketPriority;
  origem?: TicketSource;
  pageUrl?: string;
  browserInfo?: string;
  ipAddress?: string;
  userAgent?: string;
  errorMessage?: string;
  errorStack?: string;
  errorContext?: Record<string, unknown>;
  errorFingerprint?: string;
  metadados?: Record<string, unknown>;
}

interface LogErrorInput {
  level: "debug" | "info" | "warn" | "error" | "critical";
  message: string;
  component?: string;
  errorMessage?: string;
  errorStack?: string;
  fingerprint?: string;
  userId?: string;
  userEmail?: string;
  requestId?: string;
  sessionId?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  duration?: number;
  ipAddress?: string;
  userAgent?: string;
  context?: Record<string, unknown>;
  createTicket?: boolean;
}

/**
 * Palavras-chave para classificação automática
 */
const CLASSIFICATION_KEYWORDS = {
  sistemico: [
    "erro", "error", "exception", "falha", "crash", "bug", "500", "internal server",
    "null", "undefined", "type error", "syntax error", "timeout", "connection",
    "database", "query", "sql", "migration"
  ],
  faturamento: [
    "fatura", "pagamento", "cobrança", "valor", "preço", "cartão", "pix", "boleto",
    "invoice", "billing", "payment", "refund", "reembolso", "cancelar assinatura"
  ],
  performance: [
    "lento", "demora", "travando", "loading", "carregando", "timeout", "slow",
    "performance", "lag", "freeze", "não carrega", "não abre"
  ],
  seguranca: [
    "senha", "login", "acesso", "permissão", "autenticação", "auth", "token",
    "sessão", "logout", "hack", "invasão", "vazamento", "dados pessoais"
  ],
  integracao: [
    "api", "webhook", "integração", "anthropic", "claude", "whisper", "openai",
    "resend", "email", "smtp", "transcrição", "análise ia"
  ],
  sugestao: [
    "sugestão", "melhoria", "feature", "funcionalidade", "seria bom", "poderia",
    "gostaria", "implementar", "adicionar", "novo recurso"
  ],
  usuario: [
    "como", "não sei", "ajuda", "tutorial", "configurar", "dúvida", "onde",
    "não encontro", "não consigo", "como fazer"
  ],
};

/**
 * Palavras-chave de alta prioridade
 */
const HIGH_PRIORITY_KEYWORDS = [
  "urgente", "crítico", "emergência", "não funciona", "parou", "bloqueado",
  "produção", "todos os usuários", "sistema fora", "dados perdidos"
];

const CRITICAL_PRIORITY_KEYWORDS = [
  "vazamento", "segurança", "dados expostos", "invasão", "todas as faturas",
  "sistema down", "não acessa ninguém", "perda de dados"
];

/**
 * Classifica automaticamente o ticket baseado no conteúdo
 */
function classifyTicket(titulo: string, descricao: string, errorMessage?: string): ClassificationResult {
  const texto = `${titulo} ${descricao} ${errorMessage || ""}`.toLowerCase();
  const tags: string[] = [];
  let categoria: TicketCategory = "outro";
  let prioridade: TicketPriority = "media";
  let riscoScore = 25; // Base score
  const riscoMotivos: string[] = [];

  // Detecta categoria
  const categoryScores: Record<TicketCategory, number> = {
    sistemico: 0,
    faturamento: 0,
    performance: 0,
    seguranca: 0,
    integracao: 0,
    sugestao: 0,
    usuario: 0,
    outro: 0,
  };

  for (const [cat, keywords] of Object.entries(CLASSIFICATION_KEYWORDS)) {
    for (const keyword of keywords) {
      if (texto.includes(keyword)) {
        categoryScores[cat as TicketCategory] += 1;
        if (!tags.includes(keyword)) {
          tags.push(keyword);
        }
      }
    }
  }

  // Encontra categoria com maior score
  let maxScore = 0;
  for (const [cat, score] of Object.entries(categoryScores)) {
    if (score > maxScore) {
      maxScore = score;
      categoria = cat as TicketCategory;
    }
  }

  // Se tem erro de sistema, é sistêmico
  if (errorMessage) {
    categoria = "sistemico";
    riscoScore += 20;
    riscoMotivos.push("Erro de sistema detectado");
  }

  // Ajusta prioridade baseado em palavras-chave
  for (const keyword of HIGH_PRIORITY_KEYWORDS) {
    if (texto.includes(keyword)) {
      prioridade = "alta";
      riscoScore += 15;
      riscoMotivos.push(`Palavra-chave de alta prioridade: "${keyword}"`);
      break;
    }
  }

  for (const keyword of CRITICAL_PRIORITY_KEYWORDS) {
    if (texto.includes(keyword)) {
      prioridade = "critica";
      riscoScore += 30;
      riscoMotivos.push(`Palavra-chave crítica: "${keyword}"`);
      break;
    }
  }

  // Ajustes por categoria
  switch (categoria) {
    case "seguranca":
      riscoScore += 25;
      if (prioridade === "media") prioridade = "alta";
      riscoMotivos.push("Categoria de segurança detectada");
      break;
    case "faturamento":
      riscoScore += 10;
      riscoMotivos.push("Impacto financeiro potencial");
      break;
    case "sistemico":
      riscoScore += 15;
      break;
  }

  // Limita score entre 0-100
  riscoScore = Math.min(100, Math.max(0, riscoScore));

  return {
    categoria,
    prioridade,
    riscoScore,
    riscoMotivo: riscoMotivos.join("; ") || "Classificação padrão",
    tags: tags.slice(0, 10), // Limita a 10 tags
  };
}

/**
 * Gera fingerprint para erros
 */
function generateFingerprint(message: string, stack?: string, component?: string): string {
  const normalized = `${component || "unknown"}:${message.slice(0, 100)}:${(stack || "").split("\n")[1]?.slice(0, 50) || ""}`;
  // Simples hash para fingerprint
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).padStart(8, "0");
}

/**
 * Cria um novo ticket
 */
export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  try {
    // Classifica automaticamente se não especificado
    const classification = classifyTicket(
      input.titulo,
      input.descricao,
      input.errorMessage
    );

    const ticketData: NewTicket = {
      userId: input.userId,
      userEmail: input.userEmail,
      userName: input.userName,
      titulo: input.titulo,
      descricao: input.descricao,
      categoria: input.categoria || classification.categoria,
      prioridade: input.prioridade || classification.prioridade,
      origem: input.origem || "usuario",
      riscoScore: classification.riscoScore,
      riscoMotivo: classification.riscoMotivo,
      errorFingerprint: input.errorFingerprint,
      errorMessage: input.errorMessage,
      errorStack: input.errorStack,
      errorContext: input.errorContext,
      pageUrl: input.pageUrl,
      browserInfo: input.browserInfo,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      tags: classification.tags,
      metadados: input.metadados,
    };

    const [ticket] = await db.insert(tickets).values(ticketData).returning();

    logger.info("Ticket criado", {
      ticketId: ticket.id,
      categoria: ticket.categoria,
      prioridade: ticket.prioridade,
      origem: ticket.origem,
      riscoScore: ticket.riscoScore,
    });

    return ticket;
  } catch (error) {
    logger.error("Erro ao criar ticket", error);
    throw error;
  }
}

/**
 * Cria ticket automaticamente a partir de um erro
 */
export async function createTicketFromError(
  error: Error | unknown,
  context: {
    userId?: string;
    userEmail?: string;
    pageUrl?: string;
    component?: string;
    ipAddress?: string;
    userAgent?: string;
    additionalContext?: Record<string, unknown>;
  }
): Promise<Ticket | null> {
  try {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const fingerprint = generateFingerprint(
      errorObj.message,
      errorObj.stack,
      context.component
    );

    // Verifica se já existe um ticket aberto para este erro
    const existingTicket = await db
      .select()
      .from(tickets)
      .where(
        and(
          eq(tickets.errorFingerprint, fingerprint),
          or(
            eq(tickets.status, "aberto"),
            eq(tickets.status, "em_analise")
          )
        )
      )
      .limit(1);

    if (existingTicket.length > 0) {
      // Incrementa contador de ocorrências
      await db
        .update(tickets)
        .set({
          errorCount: sql`${tickets.errorCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(tickets.id, existingTicket[0].id));

      logger.debug("Erro já tem ticket aberto, incrementando contador", {
        ticketId: existingTicket[0].id,
        fingerprint,
      });

      return existingTicket[0];
    }

    // Cria novo ticket
    return await createTicket({
      userId: context.userId,
      userEmail: context.userEmail || "sistema@entrevistia.com",
      userName: "Sistema",
      titulo: `Erro: ${errorObj.message.slice(0, 100)}`,
      descricao: `Erro automático detectado no sistema.\n\nMensagem: ${errorObj.message}\n\nComponente: ${context.component || "Desconhecido"}\n\nPágina: ${context.pageUrl || "N/A"}`,
      categoria: "sistemico",
      origem: "sistema",
      errorFingerprint: fingerprint,
      errorMessage: errorObj.message,
      errorStack: errorObj.stack,
      errorContext: context.additionalContext,
      pageUrl: context.pageUrl,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    });
  } catch (createError) {
    logger.error("Erro ao criar ticket de erro", createError);
    return null;
  }
}

/**
 * Adiciona mensagem ao ticket
 */
export async function addTicketMessage(
  ticketId: string,
  message: NewTicketMessage
): Promise<void> {
  try {
    await db.insert(ticketMessages).values({
      ...message,
      ticketId,
    });

    // Se é primeira resposta de admin, atualiza firstResponseAt
    if (message.autorTipo === "admin") {
      const ticket = await db.select().from(tickets).where(eq(tickets.id, ticketId)).limit(1);
      if (ticket[0] && !ticket[0].firstResponseAt) {
        await db.update(tickets).set({
          firstResponseAt: new Date(),
          status: "em_analise",
          updatedAt: new Date(),
        }).where(eq(tickets.id, ticketId));
      }
    }

    logger.debug("Mensagem adicionada ao ticket", { ticketId });
  } catch (error) {
    logger.error("Erro ao adicionar mensagem", error);
    throw error;
  }
}

/**
 * Atualiza status do ticket
 */
export async function updateTicketStatus(
  ticketId: string,
  newStatus: string,
  changedBy: { id?: string; nome: string; tipo: "usuario" | "admin" | "sistema" },
  resolucao?: string
): Promise<void> {
  try {
    const ticket = await db.select().from(tickets).where(eq(tickets.id, ticketId)).limit(1);
    if (!ticket[0]) throw new Error("Ticket não encontrado");

    const updateData: Partial<Ticket> = {
      status: newStatus as Ticket["status"],
      updatedAt: new Date(),
    };

    if (newStatus === "resolvido" || newStatus === "fechado") {
      updateData.closedAt = new Date();
      if (resolucao) updateData.resolucao = resolucao;
      if (changedBy.id) {
        updateData.resolvidoPor = changedBy.id;
        updateData.resolvidoEm = new Date();
      }
    }

    await db.update(tickets).set(updateData).where(eq(tickets.id, ticketId));

    // Registra histórico
    await db.insert(ticketHistory).values({
      ticketId,
      changedBy: changedBy.id,
      changedByNome: changedBy.nome,
      changedByTipo: changedBy.tipo,
      campo: "status",
      valorAntigo: ticket[0].status,
      valorNovo: newStatus,
    });

    logger.info("Status do ticket atualizado", {
      ticketId,
      statusAntigo: ticket[0].status,
      statusNovo: newStatus,
    });
  } catch (error) {
    logger.error("Erro ao atualizar status", error);
    throw error;
  }
}

/**
 * Atribui ticket a um administrador
 */
export async function assignTicket(
  ticketId: string,
  adminId: string,
  adminNome: string
): Promise<void> {
  try {
    const ticket = await db.select().from(tickets).where(eq(tickets.id, ticketId)).limit(1);
    if (!ticket[0]) throw new Error("Ticket não encontrado");

    await db.update(tickets).set({
      assignedTo: adminId,
      assignedAt: new Date(),
      status: "em_analise",
      updatedAt: new Date(),
    }).where(eq(tickets.id, ticketId));

    await db.insert(ticketHistory).values({
      ticketId,
      changedBy: adminId,
      changedByNome: adminNome,
      changedByTipo: "admin",
      campo: "assigned_to",
      valorAntigo: ticket[0].assignedTo || "Não atribuído",
      valorNovo: adminNome,
    });

    logger.info("Ticket atribuído", { ticketId, adminId, adminNome });
  } catch (error) {
    logger.error("Erro ao atribuir ticket", error);
    throw error;
  }
}

/**
 * Loga erro no sistema
 */
export async function logSystemError(input: LogErrorInput): Promise<string | null> {
  try {
    const fingerprint = input.fingerprint || generateFingerprint(
      input.errorMessage || input.message,
      input.errorStack,
      input.component
    );

    // Insere log
    const [log] = await db.insert(systemLogs).values({
      level: input.level,
      component: input.component,
      message: input.message,
      errorMessage: input.errorMessage,
      errorStack: input.errorStack,
      fingerprint,
      userId: input.userId,
      userEmail: input.userEmail,
      requestId: input.requestId,
      sessionId: input.sessionId,
      endpoint: input.endpoint,
      method: input.method,
      statusCode: input.statusCode,
      duration: input.duration,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      environment: process.env.NODE_ENV,
      context: input.context,
    }).returning();

    // Atualiza ou cria agregação de erros
    if (input.level === "error" || input.level === "critical") {
      const existing = await db
        .select()
        .from(errorAggregations)
        .where(eq(errorAggregations.fingerprint, fingerprint))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(errorAggregations)
          .set({
            totalOccurrences: sql`${errorAggregations.totalOccurrences} + 1`,
            lastSeen: new Date(),
            resolved: false, // Reabre se estava resolvido
          })
          .where(eq(errorAggregations.fingerprint, fingerprint));
      } else {
        await db.insert(errorAggregations).values({
          fingerprint,
          message: input.errorMessage || input.message,
          component: input.component,
          endpoint: input.endpoint,
          sampleStack: input.errorStack,
          totalOccurrences: 1,
          uniqueUsers: input.userId ? 1 : 0,
        });
      }

      // Cria ticket automaticamente se solicitado ou se for crítico
      if (input.createTicket || input.level === "critical") {
        const ticket = await createTicketFromError(
          new Error(input.errorMessage || input.message),
          {
            userId: input.userId,
            userEmail: input.userEmail,
            component: input.component,
            ipAddress: input.ipAddress,
            userAgent: input.userAgent,
            additionalContext: input.context,
          }
        );

        if (ticket) {
          // Vincula log ao ticket
          await db.update(systemLogs).set({ ticketId: ticket.id }).where(eq(systemLogs.id, log.id));
          return ticket.id;
        }
      }
    }

    return null;
  } catch (error) {
    // Log fallback para console se falhar
    console.error("[TicketService] Erro ao logar no sistema:", error);
    return null;
  }
}

/**
 * Busca tickets com filtros
 */
export async function getTickets(filters: {
  status?: string;
  categoria?: string;
  prioridade?: string;
  userId?: string;
  assignedTo?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}): Promise<{ tickets: Ticket[]; total: number }> {
  try {
    const conditions = [];

    if (filters.status) conditions.push(eq(tickets.status, filters.status as Ticket["status"]));
    if (filters.categoria) conditions.push(eq(tickets.categoria, filters.categoria as Ticket["categoria"]));
    if (filters.prioridade) conditions.push(eq(tickets.prioridade, filters.prioridade as Ticket["prioridade"]));
    if (filters.userId) conditions.push(eq(tickets.userId, filters.userId));
    if (filters.assignedTo) conditions.push(eq(tickets.assignedTo, filters.assignedTo));
    if (filters.startDate) conditions.push(gte(tickets.createdAt, filters.startDate));
    if (filters.endDate) conditions.push(lte(tickets.createdAt, filters.endDate));
    if (filters.search) {
      conditions.push(
        or(
          ilike(tickets.titulo, `%${filters.search}%`),
          ilike(tickets.descricao, `%${filters.search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [ticketsList, countResult] = await Promise.all([
      db
        .select()
        .from(tickets)
        .where(whereClause)
        .orderBy(desc(tickets.createdAt))
        .limit(filters.limit || 50)
        .offset(filters.offset || 0),
      db
        .select({ count: sql<number>`count(*)` })
        .from(tickets)
        .where(whereClause),
    ]);

    return {
      tickets: ticketsList,
      total: Number(countResult[0]?.count || 0),
    };
  } catch (error) {
    logger.error("Erro ao buscar tickets", error);
    throw error;
  }
}

/**
 * Busca ticket por ID com mensagens
 */
export async function getTicketById(ticketId: string): Promise<{
  ticket: Ticket;
  messages: (typeof ticketMessages.$inferSelect)[];
  history: (typeof ticketHistory.$inferSelect)[];
} | null> {
  try {
    const [ticket] = await db.select().from(tickets).where(eq(tickets.id, ticketId));
    if (!ticket) return null;

    const [messages, history] = await Promise.all([
      db
        .select()
        .from(ticketMessages)
        .where(eq(ticketMessages.ticketId, ticketId))
        .orderBy(ticketMessages.createdAt),
      db
        .select()
        .from(ticketHistory)
        .where(eq(ticketHistory.ticketId, ticketId))
        .orderBy(desc(ticketHistory.createdAt)),
    ]);

    return { ticket, messages, history };
  } catch (error) {
    logger.error("Erro ao buscar ticket", error);
    throw error;
  }
}

/**
 * Obtém estatísticas de tickets
 */
export async function getTicketStats(): Promise<{
  total: number;
  abertos: number;
  emAnalise: number;
  resolvidos: number;
  porPrioridade: Record<string, number>;
  porCategoria: Record<string, number>;
  tempoMedioResposta: number;
  tempoMedioResolucao: number;
}> {
  try {
    const stats = await db
      .select({
        status: tickets.status,
        prioridade: tickets.prioridade,
        categoria: tickets.categoria,
        count: sql<number>`count(*)`,
      })
      .from(tickets)
      .groupBy(tickets.status, tickets.prioridade, tickets.categoria);

    const result = {
      total: 0,
      abertos: 0,
      emAnalise: 0,
      resolvidos: 0,
      porPrioridade: {} as Record<string, number>,
      porCategoria: {} as Record<string, number>,
      tempoMedioResposta: 0,
      tempoMedioResolucao: 0,
    };

    for (const row of stats) {
      const count = Number(row.count);
      result.total += count;

      if (row.status === "aberto") result.abertos += count;
      if (row.status === "em_analise") result.emAnalise += count;
      if (row.status === "resolvido" || row.status === "fechado") result.resolvidos += count;

      result.porPrioridade[row.prioridade] = (result.porPrioridade[row.prioridade] || 0) + count;
      result.porCategoria[row.categoria] = (result.porCategoria[row.categoria] || 0) + count;
    }

    // Calcula tempos médios
    const tempos = await db
      .select({
        avgResponse: sql<number>`AVG(EXTRACT(EPOCH FROM (first_response_at - created_at)))`,
        avgResolucao: sql<number>`AVG(EXTRACT(EPOCH FROM (closed_at - created_at)))`,
      })
      .from(tickets)
      .where(
        and(
          sql`first_response_at IS NOT NULL`,
          sql`closed_at IS NOT NULL`
        )
      );

    if (tempos[0]) {
      result.tempoMedioResposta = Math.round((tempos[0].avgResponse || 0) / 60); // em minutos
      result.tempoMedioResolucao = Math.round((tempos[0].avgResolucao || 0) / 3600); // em horas
    }

    return result;
  } catch (error) {
    logger.error("Erro ao obter estatísticas", error);
    throw error;
  }
}

/**
 * Obtém erros agregados para dashboard
 */
export async function getAggregatedErrors(filters: {
  resolved?: boolean;
  component?: string;
  limit?: number;
}): Promise<(typeof errorAggregations.$inferSelect)[]> {
  try {
    const conditions = [];

    if (filters.resolved !== undefined) {
      conditions.push(eq(errorAggregations.resolved, filters.resolved));
    }
    if (filters.component) {
      conditions.push(eq(errorAggregations.component, filters.component));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return await db
      .select()
      .from(errorAggregations)
      .where(whereClause)
      .orderBy(desc(errorAggregations.totalOccurrences), desc(errorAggregations.lastSeen))
      .limit(filters.limit || 50);
  } catch (error) {
    logger.error("Erro ao buscar erros agregados", error);
    throw error;
  }
}
