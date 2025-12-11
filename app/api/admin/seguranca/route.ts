import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { sql, gte, count, and, desc } from "drizzle-orm";
import {
  getRateLimitStats,
  getBotDetectionStats,
} from "@/lib/security";

/**
 * GET /api/admin/seguranca
 * Retorna métricas de segurança do sistema
 */
export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canViewAnalytics) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();
    const now = new Date();
    const umaHoraAtras = new Date(now.getTime() - 60 * 60 * 1000);
    const umDiaAtras = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const seteDiasAtras = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Estatísticas do rate limiting em memória
    const rateLimitStats = getRateLimitStats();

    // Estatísticas de detecção de bots
    const botStats = getBotDetectionStats();

    // Tentativas de login falhadas (últimas 24h)
    const [loginsFalhados24h] = await db
      .select({ count: count() })
      .from(auditLogs)
      .where(
        and(
          gte(auditLogs.timestamp, umDiaAtras),
          sql`${auditLogs.acao} = 'login_failed'`
        )
      );

    // Tentativas de login falhadas (última hora)
    const [loginsFalhados1h] = await db
      .select({ count: count() })
      .from(auditLogs)
      .where(
        and(
          gte(auditLogs.timestamp, umaHoraAtras),
          sql`${auditLogs.acao} = 'login_failed'`
        )
      );

    // Logins bem-sucedidos (últimas 24h)
    const [loginsSucesso24h] = await db
      .select({ count: count() })
      .from(auditLogs)
      .where(
        and(
          gte(auditLogs.timestamp, umDiaAtras),
          sql`${auditLogs.acao} = 'login'`
        )
      );

    // IPs únicos que tentaram login (últimas 24h)
    const ipsUnicos = await db
      .select({
        ip: auditLogs.ipAddress,
        total: count(),
      })
      .from(auditLogs)
      .where(
        and(
          gte(auditLogs.timestamp, umDiaAtras),
          sql`${auditLogs.acao} in ('login', 'login_failed')`
        )
      )
      .groupBy(auditLogs.ipAddress);

    // IPs com muitas tentativas falhadas (possível brute force)
    const ipsSuspeitos = await db
      .select({
        ip: auditLogs.ipAddress,
        tentativas: count(),
      })
      .from(auditLogs)
      .where(
        and(
          gte(auditLogs.timestamp, umDiaAtras),
          sql`${auditLogs.acao} = 'login_failed'`
        )
      )
      .groupBy(auditLogs.ipAddress)
      .having(sql`count(*) >= 5`)
      .orderBy(desc(count()))
      .limit(10);

    // Requisições bloqueadas por rate limit (estimativa baseada em erros 429)
    const [requisicoesBlockeadas] = await db
      .select({ count: count() })
      .from(auditLogs)
      .where(
        and(
          gte(auditLogs.timestamp, umDiaAtras),
          sql`${auditLogs.descricao} ilike '%rate limit%' or ${auditLogs.descricao} ilike '%429%' or ${auditLogs.descricao} ilike '%bloqueado%'`
        )
      );

    // Ações por tipo (últimas 24h) - para ver padrões
    const acoesPorTipo = await db
      .select({
        acao: auditLogs.acao,
        total: count(),
      })
      .from(auditLogs)
      .where(gte(auditLogs.timestamp, umDiaAtras))
      .groupBy(auditLogs.acao)
      .orderBy(desc(count()))
      .limit(15);

    // Últimos eventos de segurança
    const eventosSeguranca = await db
      .select({
        id: auditLogs.id,
        acao: auditLogs.acao,
        entidade: auditLogs.entidade,
        descricao: auditLogs.descricao,
        ipAddress: auditLogs.ipAddress,
        userEmail: auditLogs.userEmail,
        timestamp: auditLogs.timestamp,
      })
      .from(auditLogs)
      .where(
        and(
          gte(auditLogs.timestamp, umDiaAtras),
          sql`${auditLogs.acao} in ('login_failed', 'password_change', 'email_verification_failed', 'admin_login', 'admin_login_failed', 'logout', 'delete', 'export')`
        )
      )
      .orderBy(desc(auditLogs.timestamp))
      .limit(20);

    // Calcular taxa de sucesso de login
    const totalTentativasLogin = loginsFalhados24h.count + loginsSucesso24h.count;
    const taxaSucessoLogin = totalTentativasLogin > 0
      ? (loginsSucesso24h.count / totalTentativasLogin) * 100
      : 100;

    // Histórico de tentativas de login por hora (últimas 24h)
    const historicoLogin = [];
    for (let i = 0; i < 24; i++) {
      const horaInicio = new Date(now.getTime() - (24 - i) * 60 * 60 * 1000);
      const horaFim = new Date(horaInicio.getTime() + 60 * 60 * 1000);

      const [sucessos] = await db
        .select({ count: count() })
        .from(auditLogs)
        .where(
          and(
            gte(auditLogs.timestamp, horaInicio),
            sql`${auditLogs.timestamp} < ${horaFim}`,
            sql`${auditLogs.acao} = 'login'`
          )
        );

      const [falhas] = await db
        .select({ count: count() })
        .from(auditLogs)
        .where(
          and(
            gte(auditLogs.timestamp, horaInicio),
            sql`${auditLogs.timestamp} < ${horaFim}`,
            sql`${auditLogs.acao} = 'login_failed'`
          )
        );

      historicoLogin.push({
        hora: `${String(horaInicio.getHours()).padStart(2, "0")}:00`,
        sucessos: sucessos.count,
        falhas: falhas.count,
      });
    }

    // Formatador de tempo relativo
    const formatarTempoRelativo = (data: Date) => {
      const diffMs = now.getTime() - new Date(data).getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffHoras = Math.floor(diffMin / 60);

      if (diffMin < 1) return "Agora";
      if (diffMin < 60) return `Há ${diffMin} min`;
      if (diffHoras < 24) return `Há ${diffHoras}h`;
      return `Há ${Math.floor(diffHoras / 24)}d`;
    };

    // Gerar alertas de segurança
    const alertas: Array<{
      id: string;
      tipo: "critical" | "warning" | "info";
      mensagem: string;
      timestamp: string;
    }> = [];

    // Alerta: muitas tentativas de login falhadas
    if (loginsFalhados1h.count > 20) {
      alertas.push({
        id: "brute-force-alert",
        tipo: "critical",
        mensagem: `${loginsFalhados1h.count} tentativas de login falhadas na última hora`,
        timestamp: "Agora",
      });
    } else if (loginsFalhados1h.count > 10) {
      alertas.push({
        id: "login-attempts-warning",
        tipo: "warning",
        mensagem: `${loginsFalhados1h.count} tentativas de login falhadas na última hora`,
        timestamp: "Agora",
      });
    }

    // Alerta: IPs suspeitos detectados
    if (ipsSuspeitos.length > 0) {
      alertas.push({
        id: "suspicious-ips",
        tipo: "warning",
        mensagem: `${ipsSuspeitos.length} IP(s) com comportamento suspeito detectados`,
        timestamp: "Agora",
      });
    }

    // Alerta: rate limit ativo
    if (rateLimitStats.blockedEntries > 10) {
      alertas.push({
        id: "rate-limit-active",
        tipo: "warning",
        mensagem: `${rateLimitStats.blockedEntries} IPs/usuários bloqueados por rate limit`,
        timestamp: "Agora",
      });
    }

    // Alerta: padrões suspeitos de bot
    if (botStats.suspiciousIPs > 5) {
      alertas.push({
        id: "bot-detection",
        tipo: "warning",
        mensagem: `${botStats.suspiciousIPs} IPs marcados como possíveis bots`,
        timestamp: "Agora",
      });
    }

    // Status geral de segurança
    let statusSeguranca: "normal" | "atencao" | "critico" = "normal";
    if (alertas.some(a => a.tipo === "critical")) {
      statusSeguranca = "critico";
    } else if (alertas.length > 0) {
      statusSeguranca = "atencao";
    }

    return NextResponse.json({
      status: statusSeguranca,

      // Métricas principais
      metricas: {
        loginsFalhados24h: loginsFalhados24h.count,
        loginsFalhados1h: loginsFalhados1h.count,
        loginsSucesso24h: loginsSucesso24h.count,
        taxaSucessoLogin: Math.round(taxaSucessoLogin * 10) / 10,
        ipsUnicos: ipsUnicos.length,
        ipsSuspeitos: ipsSuspeitos.length,
        requisicoesBlockeadas: requisicoesBlockeadas.count,
      },

      // Rate limiting
      rateLimit: {
        entradasAtivas: rateLimitStats.totalEntries,
        bloqueiosAtivos: rateLimitStats.blockedEntries,
        padroesSupeitos: rateLimitStats.suspiciousPatterns,
        tokenBuckets: rateLimitStats.tokenBuckets,
      },

      // Detecção de bots
      botDetection: {
        ipsMonitorados: botStats.trackedIPs,
        ipsSuspeitos: botStats.suspiciousIPs,
      },

      // IPs com comportamento suspeito
      ipsSuspeitos: ipsSuspeitos.map(ip => ({
        ip: ip.ip || "Desconhecido",
        tentativas: ip.tentativas,
      })),

      // Histórico de login por hora
      historicoLogin,

      // Ações por tipo
      acoesPorTipo: acoesPorTipo.map(a => ({
        acao: a.acao,
        total: a.total,
      })),

      // Eventos recentes de segurança
      eventosRecentes: eventosSeguranca.map(e => ({
        id: e.id,
        tipo: e.acao,
        descricao: e.descricao || `${e.acao} em ${e.entidade}`,
        ip: e.ipAddress || "N/A",
        usuario: e.userEmail || "Anônimo",
        timestamp: formatarTempoRelativo(e.timestamp),
      })),

      // Alertas ativos
      alertas,
    });
  } catch (error) {
    console.error("Erro nas métricas de segurança:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
