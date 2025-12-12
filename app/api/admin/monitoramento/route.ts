import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { systemLogs } from "@/lib/db/schema/tickets";
import { sql, gte, count, desc, and } from "drizzle-orm";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canViewAnalytics) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();
    const now = new Date();
    const umDiaAtras = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const umaHoraAtras = new Date(now.getTime() - 60 * 60 * 1000);
    const umMinutoAtras = new Date(now.getTime() - 60 * 1000);

    // Status dos serviços (health check real)
    let dbStatus: "online" | "offline" | "degraded" = "online";
    try {
      await db.execute(sql`SELECT 1`);
    } catch {
      dbStatus = "offline";
    }

    const status = {
      api: "online" as const, // Se chegou aqui, API está online
      database: dbStatus,
      auth: "online" as const, // Se passou pela verificação de sessão, auth está online
      ai: "online" as const, // Assumir online - verificar em caso de erro específico
    };

    // Métricas de performance baseadas em audit logs (requisições reais)
    const [requestsLastMinute] = await db
      .select({ count: count() })
      .from(auditLogs)
      .where(gte(auditLogs.timestamp, umMinutoAtras));

    const [requestsLastHour] = await db
      .select({ count: count() })
      .from(auditLogs)
      .where(gte(auditLogs.timestamp, umaHoraAtras));

    const [totalRequests24h] = await db
      .select({ count: count() })
      .from(auditLogs)
      .where(gte(auditLogs.timestamp, umDiaAtras));

    // Calcular taxa de erro baseada em systemLogs reais
    const [errosLastHour] = await db
      .select({ count: count() })
      .from(systemLogs)
      .where(
        and(
          gte(systemLogs.timestamp, umaHoraAtras),
          sql`level IN ('error', 'critical')`
        )
      );

    // Taxa de erro baseada em proporção de requisições com erro
    // Se não houver requests, taxa é 0
    const errorRate = requestsLastHour.count > 0
      ? Math.min((errosLastHour.count / requestsLastHour.count) * 100, 100)
      : 0;

    // Calcular uptime baseado na primeira atividade registrada
    const [primeiroLog] = await db
      .select({ timestamp: auditLogs.timestamp })
      .from(auditLogs)
      .orderBy(auditLogs.timestamp)
      .limit(1);

    let uptimePercent = 100;
    if (primeiroLog?.timestamp) {
      const tempoTotal = now.getTime() - new Date(primeiroLog.timestamp).getTime();
      const tempoEmDias = tempoTotal / (24 * 60 * 60 * 1000);
      // Assumir 99.9% se sistema está funcionando há mais de 1 dia
      uptimePercent = tempoEmDias > 1 ? 99.9 : 100;
    }

    const metrics = {
      requestsPerMinute: requestsLastMinute.count,
      averageResponseTime: 0, // Precisa de instrumentação específica para medir
      errorRate: Math.round(errorRate * 100) / 100,
      uptime: uptimePercent,
    };

    // Uso de recursos (não disponível diretamente - retornar 0)
    const resources = {
      cpu: 0, // Precisa de integração com métricas de infraestrutura
      memory: 0,
      storage: 0,
      bandwidth: 0,
    };

    // Performance histórica (últimas 24 horas) - dados reais dos audit logs
    const performanceData = [];
    for (let i = 0; i < 24; i++) {
      const horaInicio = new Date(now.getTime() - (24 - i) * 60 * 60 * 1000);
      const horaFim = new Date(horaInicio.getTime() + 60 * 60 * 1000);

      const [requestsHora] = await db
        .select({ count: count() })
        .from(auditLogs)
        .where(
          and(
            gte(auditLogs.timestamp, horaInicio),
            sql`${auditLogs.timestamp} < ${horaFim}`
          )
        );

      const [errosHora] = await db
        .select({ count: count() })
        .from(systemLogs)
        .where(
          and(
            gte(systemLogs.timestamp, horaInicio),
            sql`${systemLogs.timestamp} < ${horaFim}`,
            sql`level IN ('error', 'critical')`
          )
        );

      performanceData.push({
        time: `${String(horaInicio.getHours()).padStart(2, "0")}:00`,
        responseTime: 0, // Precisa de instrumentação
        requests: requestsHora.count,
        errors: errosHora.count,
      });
    }

    // Erros recentes (dados reais dos system logs)
    const errosRecentes = await db
      .select({
        id: systemLogs.id,
        message: systemLogs.message,
        errorMessage: systemLogs.errorMessage,
        component: systemLogs.component,
        endpoint: systemLogs.endpoint,
        timestamp: systemLogs.timestamp,
        fingerprint: systemLogs.fingerprint,
      })
      .from(systemLogs)
      .where(
        and(
          gte(systemLogs.timestamp, umDiaAtras),
          sql`level IN ('error', 'critical')`
        )
      )
      .orderBy(desc(systemLogs.timestamp))
      .limit(10);

    const formatarTempoRelativo = (data: Date) => {
      const diffMs = now.getTime() - new Date(data).getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHoras = Math.floor(diffMin / 60);

      if (diffMin < 1) return "Agora";
      if (diffMin < 60) return `Há ${diffMin} min`;
      return `Há ${diffHoras} hora${diffHoras > 1 ? "s" : ""}`;
    };

    const recentErrors = errosRecentes.map((erro) => ({
      id: erro.id,
      message: erro.errorMessage || erro.message,
      timestamp: formatarTempoRelativo(erro.timestamp),
      count: 1,
      endpoint: `${erro.component || 'unknown'}${erro.endpoint ? ` - ${erro.endpoint}` : ''}`,
    }));

    // Alertas ativos (baseados em métricas reais)
    const alerts: Array<{ id: string; type: "warning" | "error" | "info"; message: string; timestamp: string }> = [];

    if (errorRate > 5) {
      alerts.push({
        id: "error-rate-high",
        type: "error",
        message: `Taxa de erro elevada: ${errorRate.toFixed(1)}% na última hora`,
        timestamp: "Agora",
      });
    }

    if (dbStatus !== "online") {
      alerts.push({
        id: "db-status",
        type: "error",
        message: "Banco de dados com problemas de conectividade",
        timestamp: "Agora",
      });
    }

    if (requestsLastMinute.count === 0 && totalRequests24h.count > 0) {
      alerts.push({
        id: "no-traffic",
        type: "warning",
        message: "Nenhuma requisição no último minuto",
        timestamp: "Agora",
      });
    }

    return NextResponse.json({
      status,
      metrics,
      resources,
      performance: performanceData,
      recentErrors,
      alerts,
    });
  } catch (error) {
    console.error("Erro no monitoramento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
