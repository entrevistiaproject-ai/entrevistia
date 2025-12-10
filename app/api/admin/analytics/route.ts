import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { users, entrevistas, perguntas, candidatoEntrevistas, transacoes, faturas } from "@/lib/db/schema";
import { sql, gte, isNull, and, count, eq, ne } from "drizzle-orm";

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

    // Usuários ativos por período (simulado)
    const usuariosAtivos = Array.from({ length: Math.min(diasAtras, 30) }, (_, i) => {
      const data = new Date(now.getTime() - (diasAtras - i - 1) * 24 * 60 * 60 * 1000);
      return {
        data: data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        dau: Math.floor(Math.random() * 50) + 10,
        wau: Math.floor(Math.random() * 150) + 50,
        mau: Math.floor(Math.random() * 300) + 100,
      };
    });

    // Funil
    const funil = {
      cadastros: totalUsuarios.count,
      verificados: usuariosVerificados.count,
      primeiraEntrevista: Number(usuariosComEntrevistas.count),
      entrevistasRecorrentes: Math.floor(Number(usuariosComEntrevistas.count) * 0.6),
      pagantes: Number(usuariosPagantes.count),
    };

    // Engajamento por hora (simulado)
    const engajamento = Array.from({ length: 24 }, (_, hora) => ({
      hora: `${hora.toString().padStart(2, "0")}h`,
      acessos: hora >= 8 && hora <= 18 ? Math.floor(Math.random() * 100) + 20 : Math.floor(Math.random() * 30) + 5,
    }));

    // Retenção semanal (simulado)
    const retencao = [
      { semana: "Sem 1", retidos: 100, total: 100 },
      { semana: "Sem 2", retidos: 75, total: 100 },
      { semana: "Sem 3", retidos: 60, total: 100 },
      { semana: "Sem 4", retidos: 50, total: 100 },
      { semana: "Sem 5", retidos: 45, total: 100 },
      { semana: "Sem 6", retidos: 42, total: 100 },
      { semana: "Sem 7", retidos: 40, total: 100 },
      { semana: "Sem 8", retidos: 38, total: 100 },
    ];

    // Funcionalidades (simulado)
    const funcionalidades = [
      { feature: "Criar Entrevistas", uso: 95, satisfacao: 88 },
      { feature: "Análise IA", uso: 85, satisfacao: 92 },
      { feature: "Banco de Perguntas", uso: 70, satisfacao: 85 },
      { feature: "Dashboard", uso: 90, satisfacao: 80 },
      { feature: "Exportar Relatórios", uso: 45, satisfacao: 75 },
      { feature: "Gestão de Candidatos", uso: 80, satisfacao: 82 },
    ];

    // Churn (simulado)
    const churn = {
      taxaMensal: 5.2,
      motivosPrincipais: [
        { motivo: "Preço alto", percentual: 35 },
        { motivo: "Não usa mais", percentual: 28 },
        { motivo: "Concorrência", percentual: 18 },
        { motivo: "Problemas técnicos", percentual: 12 },
        { motivo: "Outros", percentual: 7 },
      ],
    };

    return NextResponse.json({
      kpis: {
        taxaConversao: Math.round(taxaConversao * 10) / 10,
        taxaRetencao: Math.round(taxaRetencao * 10) / 10,
        nps: 72, // Simulado
        tempoMedioSessao: 12, // Simulado (minutos)
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
