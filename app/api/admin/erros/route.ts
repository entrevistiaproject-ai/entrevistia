import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getAggregatedErrors } from "@/lib/support/ticket-service";
import { db } from "@/lib/db";
import { systemLogs, errorAggregations } from "@/lib/db/schema/tickets";
import { desc, eq, sql, gte, and } from "drizzle-orm";
import { logger } from "@/lib/logger";

/**
 * GET /api/admin/erros
 * Obtém erros agregados e logs do sistema
 */
export async function GET(request: NextRequest) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view") || "aggregated"; // aggregated | logs
    const resolved = searchParams.get("resolved");
    const component = searchParams.get("component") || undefined;
    const level = searchParams.get("level") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50");
    const hours = parseInt(searchParams.get("hours") || "24");

    // Data de corte para filtrar logs recentes
    const cutoffDate = new Date(Date.now() - hours * 60 * 60 * 1000);

    if (view === "logs") {
      // Retorna logs individuais do sistema
      const conditions = [gte(systemLogs.timestamp, cutoffDate)];

      if (component) {
        conditions.push(eq(systemLogs.component, component));
      }
      if (level) {
        conditions.push(eq(systemLogs.level, level));
      }

      const logs = await db
        .select()
        .from(systemLogs)
        .where(and(...conditions))
        .orderBy(desc(systemLogs.timestamp))
        .limit(limit);

      return NextResponse.json({ logs });
    }

    // View padrão: erros agregados
    const errors = await getAggregatedErrors({
      resolved: resolved === "true" ? true : resolved === "false" ? false : undefined,
      component,
      limit,
    });

    // Estatísticas
    const stats = await db
      .select({
        totalErrors: sql<number>`count(*)`,
        unresolvedErrors: sql<number>`count(*) filter (where resolved = false)`,
        totalOccurrences: sql<number>`sum(total_occurrences)`,
        uniqueComponents: sql<number>`count(distinct component)`,
      })
      .from(errorAggregations);

    // Erros por componente
    const byComponent = await db
      .select({
        component: errorAggregations.component,
        count: sql<number>`count(*)`,
        occurrences: sql<number>`sum(total_occurrences)`,
      })
      .from(errorAggregations)
      .where(eq(errorAggregations.resolved, false))
      .groupBy(errorAggregations.component);

    // Erros nas últimas 24h
    const recentErrors = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(systemLogs)
      .where(
        and(
          gte(systemLogs.timestamp, cutoffDate),
          sql`level IN ('error', 'critical')`
        )
      );

    return NextResponse.json({
      errors,
      stats: {
        totalErrors: Number(stats[0]?.totalErrors || 0),
        unresolvedErrors: Number(stats[0]?.unresolvedErrors || 0),
        totalOccurrences: Number(stats[0]?.totalOccurrences || 0),
        uniqueComponents: Number(stats[0]?.uniqueComponents || 0),
        errorsLast24h: Number(recentErrors[0]?.count || 0),
      },
      byComponent: byComponent.map((c) => ({
        component: c.component || "Desconhecido",
        count: Number(c.count),
        occurrences: Number(c.occurrences),
      })),
    });
  } catch (error) {
    logger.error("Erro ao buscar erros agregados", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/erros
 * Marca erros como resolvidos
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { fingerprint, resolved } = body;

    if (!fingerprint) {
      return NextResponse.json(
        { error: "Fingerprint é obrigatório" },
        { status: 400 }
      );
    }

    await db
      .update(errorAggregations)
      .set({
        resolved: resolved ?? true,
        resolvedAt: resolved ? new Date() : null,
        resolvedBy: resolved ? session.id : null,
      })
      .where(eq(errorAggregations.fingerprint, fingerprint));

    logger.info("Erro marcado como resolvido", {
      fingerprint,
      adminId: session.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Erro ao atualizar status do erro", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
