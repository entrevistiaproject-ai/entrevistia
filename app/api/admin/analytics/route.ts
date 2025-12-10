import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, entrevistas, perguntas, candidatoEntrevistas, faturas, auditLogs } from "@/lib/db/schema";
import { sql, gte, isNull, and, count, eq, lte } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canViewAnalytics) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get("periodo") || "30d";

    const db = getDB();
    const now = new Date();
    let diasAtras: number;

    switch (periodo) {
      case "7d":
        diasAtras = 7;
        break;
      case "30d":
        diasAtras = 30;
        break;
      case "90d":
        diasAtras = 90;
        break;
      default:
        diasAtras = 30;
    }

    const dataInicio = new Date(now.getTime() - diasAtras * 24 * 60 * 60 * 1000);

    // KPIs
    const [totalUsuarios] = await db.select({ count: count() }).from(users).where(isNull(users.deletedAt));
    const [usuariosVerificados] = await db.select({ count: count() }).from(users).where(and(isNull(users.deletedAt), sql`${users.emailVerified} is not null`));
    const [usuariosComEntrevistas] = await db.select({ count: sql<number>`count(distinct ${entrevistas.userId})` }).from(entrevistas);
    const [usuariosPagantes] = await db.select({ count: sql<number>`count(distinct ${faturas.userId})` }).from(faturas).where(eq(faturas.status, "paga"));

    const taxaConversao = totalUsuarios.count > 0 ? (Number(usuariosComEntrevistas.count) / totalUsuarios.count) * 100 : 0;
    const taxaRetencao = totalUsuarios.count > 0 ? (Number(usuariosPagantes.count) / totalUsuarios.count) * 100 : 0;

    // Entrevistas por usuário
    const [entrevistasStats] = await db
      .select({
        total: count(),
        usuarios: sql<number>`count(distinct ${entrevistas.userId})`,
      })
      .from(entrevistas);

    const entrevistasPorUsuario = Number(entrevistasStats.usuarios) > 0 ? Number(entrevistasStats.total) / Number(entrevistasStats.usuarios) : 0;

    // Perguntas por entrevista
    const [perguntasStats] = await db
      .select({
        total: count(),
        entrevistas: sql<number>`count(distinct ${perguntas.entrevistaId})`,
      })
      .from(perguntas);

    const perguntasPorEntrevista = Number(perguntasStats.entrevistas) > 0 ? Number(perguntasStats.total) / Number(perguntasStats.entrevistas) : 0;

    // Taxa de completude (candidatos que completaram a entrevista)
    const [completudeStats] = await db
      .select({
        total: count(),
        completadas: sql<number>`count(*) filter (where ${candidatoEntrevistas.status} = 'concluido')`,
      })
      .from(candidatoEntrevistas);

    const taxaCompletude = Number(completudeStats.total) > 0 ? (Number(completudeStats.completadas) / Number(completudeStats.total)) * 100 : 0;

    // Usuários ativos por período (dados reais baseados em audit logs de atividade)
    const usuariosAtivosData = [];
    for (let i = 0; i < Math.min(diasAtras, 30); i++) {
      const dataAtual = new Date(now.getTime() - (diasAtras - i - 1) * 24 * 60 * 60 * 1000);
      const inicioDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
      const fimDia = new Date(inicioDia.getTime() + 24 * 60 * 60 * 1000);

      // DAU - usuários únicos que fizeram alguma ação no dia
      const [dauResult] = await db
        .select({ count: sql<number>`count(distinct ${auditLogs.userId})` })
        .from(auditLogs)
        .where(and(gte(auditLogs.timestamp, inicioDia), lte(auditLogs.timestamp, fimDia)));

      // WAU - últimos 7 dias a partir desta data
      const inicioSemana = new Date(dataAtual.getTime() - 7 * 24 * 60 * 60 * 1000);
      const [wauResult] = await db
        .select({ count: sql<number>`count(distinct ${auditLogs.userId})` })
        .from(auditLogs)
        .where(and(gte(auditLogs.timestamp, inicioSemana), lte(auditLogs.timestamp, fimDia)));

      // MAU - últimos 30 dias a partir desta data
      const inicioMes = new Date(dataAtual.getTime() - 30 * 24 * 60 * 60 * 1000);
      const [mauResult] = await db
        .select({ count: sql<number>`count(distinct ${auditLogs.userId})` })
        .from(auditLogs)
        .where(and(gte(auditLogs.timestamp, inicioMes), lte(auditLogs.timestamp, fimDia)));

      usuariosAtivosData.push({
        data: dataAtual.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        dau: Number(dauResult.count) || 0,
        wau: Number(wauResult.count) || 0,
        mau: Number(mauResult.count) || 0,
      });
    }
    const usuariosAtivos = usuariosAtivosData;

    // Funil - Calcular entrevistas recorrentes (usuários com mais de 1 entrevista)
    const [entrevistasRecorrentesResult] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(
        db
          .select({ userId: entrevistas.userId, total: count() })
          .from(entrevistas)
          .groupBy(entrevistas.userId)
          .having(sql`count(*) > 1`)
          .as("subquery")
      );

    const funil = {
      cadastros: totalUsuarios.count,
      verificados: usuariosVerificados.count,
      primeiraEntrevista: Number(usuariosComEntrevistas.count),
      entrevistasRecorrentes: Number(entrevistasRecorrentesResult.count) || 0,
      pagantes: Number(usuariosPagantes.count),
    };

    // Engajamento por hora (dados reais baseados em audit logs)
    const engajamentoPorHora = await db
      .select({
        hora: sql<number>`extract(hour from ${auditLogs.timestamp})`,
        acessos: count(),
      })
      .from(auditLogs)
      .where(gte(auditLogs.timestamp, dataInicio))
      .groupBy(sql`extract(hour from ${auditLogs.timestamp})`)
      .orderBy(sql`extract(hour from ${auditLogs.timestamp})`);

    const engajamentoMap = new Map(engajamentoPorHora.map((e) => [Number(e.hora), e.acessos]));
    const engajamento = Array.from({ length: 24 }, (_, hora) => ({
      hora: `${hora.toString().padStart(2, "0")}h`,
      acessos: engajamentoMap.get(hora) || 0,
    }));

    // Retenção semanal (dados reais - usuários que se cadastraram em cada semana e continuam ativos)
    const retencaoData = [];
    const oitoSemanasAtras = new Date(now.getTime() - 8 * 7 * 24 * 60 * 60 * 1000);

    for (let semana = 1; semana <= 8; semana++) {
      const inicioSemana = new Date(oitoSemanasAtras.getTime() + (semana - 1) * 7 * 24 * 60 * 60 * 1000);
      const fimSemana = new Date(inicioSemana.getTime() + 7 * 24 * 60 * 60 * 1000);

      // Total de usuários que se cadastraram na semana 1 (coorte base)
      const [totalSemana1] = await db
        .select({ count: count() })
        .from(users)
        .where(
          and(
            gte(users.createdAt, oitoSemanasAtras),
            lte(users.createdAt, new Date(oitoSemanasAtras.getTime() + 7 * 24 * 60 * 60 * 1000)),
            isNull(users.deletedAt)
          )
        );

      // Usuários da coorte que ainda estavam ativos nesta semana
      const [retidosSemana] = await db
        .select({ count: count() })
        .from(users)
        .where(
          and(
            gte(users.createdAt, oitoSemanasAtras),
            lte(users.createdAt, new Date(oitoSemanasAtras.getTime() + 7 * 24 * 60 * 60 * 1000)),
            isNull(users.deletedAt),
            sql`(${users.deletedAt} is null or ${users.deletedAt} > ${fimSemana})`
          )
        );

      retencaoData.push({
        semana: `Sem ${semana}`,
        retidos: retidosSemana.count,
        total: totalSemana1.count,
      });
    }
    const retencao = retencaoData;

    // Funcionalidades (dados reais baseados em uso das features nos audit logs)
    const featuresConfig = [
      { feature: "Criar Entrevistas", entidade: "entrevistas", acao: "create" },
      { feature: "Análise IA", entidade: "respostas", acao: "create" },
      { feature: "Banco de Perguntas", entidade: "perguntas", acao: "create" },
      { feature: "Dashboard", entidade: "dashboard", acao: "access" },
      { feature: "Exportar Relatórios", entidade: "export", acao: "export" },
      { feature: "Gestão de Candidatos", entidade: "candidatos", acao: "create" },
    ];

    const funcionalidadesData = [];
    for (const config of featuresConfig) {
      const [usoResult] = await db
        .select({ count: count() })
        .from(auditLogs)
        .where(
          and(
            eq(auditLogs.entidade, config.entidade),
            eq(auditLogs.acao, config.acao),
            gte(auditLogs.timestamp, dataInicio)
          )
        );

      // Calcular uso como percentual do total de usuários ativos
      const uso = totalUsuarios.count > 0 ? Math.min(100, Math.round((usoResult.count / totalUsuarios.count) * 100)) : 0;

      funcionalidadesData.push({
        feature: config.feature,
        uso,
        satisfacao: 0, // NPS por feature precisa de implementação separada
      });
    }
    const funcionalidades = funcionalidadesData;

    // Churn (dados reais baseados em usuários que cancelaram/expiraram)
    const inicioMesPassado = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const fimMesPassado = new Date(now.getFullYear(), now.getMonth(), 0);

    const [usuariosMesPassado] = await db
      .select({ count: count() })
      .from(users)
      .where(
        and(
          sql`${users.createdAt} < ${fimMesPassado}`,
          isNull(users.deletedAt)
        )
      );

    const [usuariosCancelados] = await db
      .select({ count: count() })
      .from(users)
      .where(
        and(
          gte(users.deletedAt, inicioMesPassado),
          lte(users.deletedAt, fimMesPassado)
        )
      );

    const [usuariosExpirados] = await db
      .select({ count: count() })
      .from(users)
      .where(
        and(
          eq(users.planStatus, "expired"),
          gte(users.planExpiresAt, inicioMesPassado),
          lte(users.planExpiresAt, fimMesPassado)
        )
      );

    const totalChurnUsers = usuariosCancelados.count + usuariosExpirados.count;
    const taxaChurnMensal = usuariosMesPassado.count > 0 ? (totalChurnUsers / usuariosMesPassado.count) * 100 : 0;

    const churn = {
      taxaMensal: Math.round(taxaChurnMensal * 10) / 10,
      motivosPrincipais: [], // Motivos precisam ser coletados em feedback de cancelamento
    };

    // Calcular tempo médio de sessão baseado em audit logs (diferença entre primeira e última ação do dia)
    const sessaoQuery = await db
      .select({
        userId: auditLogs.userId,
        dia: sql<string>`date(${auditLogs.timestamp})`,
        primeiraAcao: sql<Date>`min(${auditLogs.timestamp})`,
        ultimaAcao: sql<Date>`max(${auditLogs.timestamp})`,
      })
      .from(auditLogs)
      .where(gte(auditLogs.timestamp, dataInicio))
      .groupBy(auditLogs.userId, sql`date(${auditLogs.timestamp})`);

    let tempoTotalSessao = 0;
    let sessoesCom2OuMaisAcoes = 0;
    for (const sessao of sessaoQuery) {
      if (sessao.primeiraAcao && sessao.ultimaAcao) {
        const diff = new Date(sessao.ultimaAcao).getTime() - new Date(sessao.primeiraAcao).getTime();
        if (diff > 0) {
          tempoTotalSessao += diff;
          sessoesCom2OuMaisAcoes++;
        }
      }
    }
    const tempoMedioSessaoMinutos = sessoesCom2OuMaisAcoes > 0 ? Math.round((tempoTotalSessao / sessoesCom2OuMaisAcoes) / 60000) : 0;

    return NextResponse.json({
      kpis: {
        taxaConversao: Math.round(taxaConversao * 10) / 10,
        taxaRetencao: Math.round(taxaRetencao * 10) / 10,
        nps: 0, // NPS precisa ser coletado via pesquisa com usuários
        tempoMedioSessao: tempoMedioSessaoMinutos,
        entrevistasPorUsuario: Math.round(entrevistasPorUsuario * 10) / 10,
        perguntasPorEntrevista: Math.round(perguntasPorEntrevista * 10) / 10,
        taxaCompletude: Math.round(taxaCompletude * 10) / 10,
      },
      usuariosAtivos,
      funil,
      engajamento,
      retencao,
      funcionalidades,
      churn,
    });
  } catch (error) {
    console.error("Erro no analytics admin:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
