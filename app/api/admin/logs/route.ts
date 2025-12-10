import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canAccessLogs) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();

    // Buscar logs com informações do usuário
    const logsData = await db
      .select({
        id: auditLogs.id,
        timestamp: auditLogs.timestamp,
        userId: auditLogs.userId,
        userEmail: auditLogs.userEmail,
        action: auditLogs.acao,
        entity: auditLogs.entidade,
        entityId: auditLogs.entidadeId,
        tipoOperacaoLGPD: auditLogs.tipoOperacaoLGPD,
        finalidade: auditLogs.finalidade,
        descricao: auditLogs.descricao,
        ipAddress: auditLogs.ipAddress,
        userAgent: auditLogs.userAgent,
      })
      .from(auditLogs)
      .orderBy(desc(auditLogs.timestamp))
      .limit(500);

    const logs = logsData.map((log) => ({
      id: log.id,
      timestamp: log.timestamp.toISOString(),
      userId: log.userId,
      userEmail: log.userEmail,
      action: log.action,
      entity: log.entity,
      entityId: log.entityId,
      tipoOperacaoLGPD: log.tipoOperacaoLGPD,
      finalidade: log.finalidade,
      detalhes: log.descricao ? { descricao: log.descricao } : null,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      status: "success" as const, // Por enquanto todos são success
    }));

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Erro ao buscar logs:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
