import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canViewAnalytics) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Status dos serviços (em produção, seria health check real)
    const status = {
      api: "online" as const,
      database: "online" as const,
      auth: "online" as const,
      ai: "online" as const,
    };

    // Métricas de performance (simuladas - em produção, viria de métricas reais)
    const metrics = {
      requestsPerMinute: Math.floor(Math.random() * 100) + 50,
      averageResponseTime: Math.floor(Math.random() * 150) + 50,
      errorRate: Math.random() * 2,
      uptime: 99.95,
    };

    // Uso de recursos (simulados)
    const resources = {
      cpu: Math.floor(Math.random() * 40) + 20,
      memory: Math.floor(Math.random() * 30) + 40,
      storage: Math.floor(Math.random() * 20) + 30,
      bandwidth: Math.floor(Math.random() * 30) + 15,
    };

    // Performance histórica (últimas 24 horas)
    const performance = Array.from({ length: 24 }, (_, i) => ({
      time: `${String(i).padStart(2, "0")}:00`,
      responseTime: Math.floor(Math.random() * 100) + 50,
      requests: Math.floor(Math.random() * 500) + 100,
      errors: Math.floor(Math.random() * 5),
    }));

    // Erros recentes (simulados)
    const recentErrors = [
      {
        id: "1",
        message: "Connection timeout to Claude API",
        timestamp: "Há 15 min",
        count: 3,
        endpoint: "POST /api/analise-entrevista",
      },
      {
        id: "2",
        message: "Rate limit exceeded",
        timestamp: "Há 1 hora",
        count: 1,
        endpoint: "POST /api/perguntas/sugerir",
      },
    ];

    // Alertas ativos
    const alerts = [
      {
        id: "1",
        type: "warning" as const,
        message: "Uso de memória acima de 80% nos últimos 30 minutos",
        timestamp: "Há 30 min",
      },
    ];

    return NextResponse.json({
      status,
      metrics,
      resources,
      performance,
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
