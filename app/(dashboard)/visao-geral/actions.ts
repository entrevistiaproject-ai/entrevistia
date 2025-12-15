"use server";

import { auth } from "@/auth";
import { getDB } from "@/lib/db";
import {
  entrevistas,
  candidatos,
  candidatoEntrevistas,
} from "@/lib/db/schema";
import { eq, and, isNull, sql, desc, gte, lte, inArray } from "drizzle-orm";
import { perguntas, respostas } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

// Tipos de período para filtro
export type PeriodoFiltro =
  | "hoje"
  | "esta_semana"
  | "este_mes"
  | "ultimos_30_dias"
  | "ultimos_3_meses"
  | "ultimos_6_meses"
  | "este_ano"
  | "personalizado";

export interface FiltroData {
  periodo: PeriodoFiltro;
  dataInicio?: Date;
  dataFim?: Date;
}

// Helper para calcular datas baseado no período
function calcularPeriodo(filtro?: FiltroData): { dataInicio: Date | null; dataFim: Date | null } {
  if (!filtro) {
    return { dataInicio: null, dataFim: null };
  }

  const agora = new Date();
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  let dataInicio: Date | null = null;
  let dataFim: Date | null = new Date(hoje.getTime() + 24 * 60 * 60 * 1000 - 1); // Final do dia

  switch (filtro.periodo) {
    case "hoje":
      dataInicio = hoje;
      break;
    case "esta_semana":
      const diaSemana = hoje.getDay();
      const diffDomingo = diaSemana === 0 ? 0 : diaSemana;
      dataInicio = new Date(hoje);
      dataInicio.setDate(hoje.getDate() - diffDomingo);
      break;
    case "este_mes":
      dataInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      break;
    case "ultimos_30_dias":
      dataInicio = new Date(hoje);
      dataInicio.setDate(hoje.getDate() - 30);
      break;
    case "ultimos_3_meses":
      dataInicio = new Date(hoje);
      dataInicio.setMonth(hoje.getMonth() - 3);
      break;
    case "ultimos_6_meses":
      dataInicio = new Date(hoje);
      dataInicio.setMonth(hoje.getMonth() - 6);
      break;
    case "este_ano":
      dataInicio = new Date(hoje.getFullYear(), 0, 1);
      break;
    case "personalizado":
      dataInicio = filtro.dataInicio || null;
      dataFim = filtro.dataFim || null;
      break;
    default:
      return { dataInicio: null, dataFim: null };
  }

  return { dataInicio, dataFim };
}

export interface DashboardMetrics {
  // KPIs principais
  totalCandidatos: number;
  totalEntrevistas: number;
  entrevistasAtivas: number;
  candidatosAvaliados: number;
  candidatosAprovados: number;
  candidatosReprovados: number;
  candidatosPendentes: number;
  taxaConclusao: number;
  taxaAprovacao: number;
  scoreMediaGeral: number;

  // Novos KPIs
  tempoMedioResposta: number | null; // em dias
  taxaAbandono: number; // percentual
  tempoMedioDecisao: number | null; // em dias

  // Dados para gráficos
  candidatosPorStatus: {
    status: string;
    count: number;
    label: string;
  }[];

  entrevistasPorMes: {
    mes: string;
    total: number;
    concluidas: number;
  }[];

  scoresPorEntrevista: {
    titulo: string;
    mediaScore: number;
    totalCandidatos: number;
    tipo: 'maior' | 'menor';
  }[];

  funil: {
    etapa: string;
    valor: number;
    percentual: number;
  }[];

  // Listas para ação rápida
  candidatosPendentesAvaliacao: {
    id: string;
    nome: string;
    email: string;
    entrevistaTitulo: string;
    entrevistaId: string;
    concluidaEm: Date;
    notaGeral: number | null;
  }[];

  entrevistasRecentes: {
    id: string;
    titulo: string;
    cargo: string | null;
    status: string;
    totalCandidatos: number;
    totalConcluidos: number;
    createdAt: Date;
  }[];

  atividadeRecente: {
    tipo: 'entrevista_criada' | 'candidato_concluiu' | 'candidato_aprovado' | 'candidato_reprovado';
    descricao: string;
    data: Date;
    link?: string;
  }[];
}

export async function getDashboardMetrics(filtro?: FiltroData): Promise<{
  success: boolean;
  data?: DashboardMetrics;
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado" };
  }

  const userId = session.user.id;
  const { dataInicio, dataFim } = calcularPeriodo(filtro);

  try {
    const db = getDB();

    // 1. KPIs Principais
    const [kpis] = await db
      .select({
        totalCandidatos: sql<number>`COUNT(DISTINCT ${candidatos.id})::int`,
      })
      .from(candidatos)
      .where(and(eq(candidatos.userId, userId), isNull(candidatos.deletedAt)));

    const [entrevistasStats] = await db
      .select({
        total: sql<number>`COUNT(*)::int`,
        ativas: sql<number>`SUM(CASE WHEN ${entrevistas.status} IN ('active', 'publicada', 'em_andamento') THEN 1 ELSE 0 END)::int`,
      })
      .from(entrevistas)
      .where(and(eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)));

    // Estatísticas de candidato-entrevistas (com filtro de período)
    const statsConditions = [eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)];
    if (dataInicio) {
      statsConditions.push(gte(candidatoEntrevistas.createdAt, dataInicio));
    }
    if (dataFim) {
      statsConditions.push(lte(candidatoEntrevistas.createdAt, dataFim));
    }

    const [candidatoEntrevistasStats] = await db
      .select({
        total: sql<number>`COUNT(*)::int`,
        concluidos: sql<number>`SUM(CASE WHEN ${candidatoEntrevistas.status} = 'concluida' THEN 1 ELSE 0 END)::int`,
        aprovados: sql<number>`SUM(CASE WHEN ${candidatoEntrevistas.decisaoRecrutador} = 'aprovado' THEN 1 ELSE 0 END)::int`,
        reprovados: sql<number>`SUM(CASE WHEN ${candidatoEntrevistas.decisaoRecrutador} = 'reprovado' THEN 1 ELSE 0 END)::int`,
        pendentes: sql<number>`SUM(CASE WHEN ${candidatoEntrevistas.status} = 'concluida' AND ${candidatoEntrevistas.decisaoRecrutador} IS NULL THEN 1 ELSE 0 END)::int`,
        mediaScore: sql<number>`ROUND(AVG(${candidatoEntrevistas.notaGeral})::numeric, 0)::int`,
        // Novos KPIs
        emAndamento: sql<number>`SUM(CASE WHEN ${candidatoEntrevistas.status} = 'em_andamento' THEN 1 ELSE 0 END)::int`,
        abandonados: sql<number>`SUM(CASE WHEN ${candidatoEntrevistas.status} NOT IN ('concluida', 'em_andamento', 'pendente') OR (${candidatoEntrevistas.status} = 'em_andamento' AND ${candidatoEntrevistas.prazoResposta} < NOW()) THEN 1 ELSE 0 END)::int`,
        tempoMedioResposta: sql<number>`ROUND(AVG(
          CASE WHEN ${candidatoEntrevistas.status} = 'concluida' AND ${candidatoEntrevistas.iniciadaEm} IS NOT NULL AND ${candidatoEntrevistas.concluidaEm} IS NOT NULL
          THEN EXTRACT(EPOCH FROM (${candidatoEntrevistas.concluidaEm} - ${candidatoEntrevistas.iniciadaEm})) / 86400
          ELSE NULL END
        )::numeric, 1)`,
        tempoMedioDecisao: sql<number>`ROUND(AVG(
          CASE WHEN ${candidatoEntrevistas.decisaoRecrutadorEm} IS NOT NULL AND ${candidatoEntrevistas.concluidaEm} IS NOT NULL
          THEN EXTRACT(EPOCH FROM (${candidatoEntrevistas.decisaoRecrutadorEm} - ${candidatoEntrevistas.concluidaEm})) / 86400
          ELSE NULL END
        )::numeric, 1)`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(and(...statsConditions));

    // 2. Candidatos por Status (para gráfico de pizza)
    const candidatosPorStatus = [
      { status: "pendentes", count: candidatoEntrevistasStats?.pendentes || 0, label: "Pendentes" },
      { status: "aprovados", count: candidatoEntrevistasStats?.aprovados || 0, label: "Aprovados" },
      { status: "reprovados", count: candidatoEntrevistasStats?.reprovados || 0, label: "Reprovados" },
      { status: "em_andamento", count: (candidatoEntrevistasStats?.total || 0) - (candidatoEntrevistasStats?.concluidos || 0), label: "Em Andamento" },
    ].filter(item => item.count > 0);

    // 3. Entrevistas por mês (usa filtro de período ou últimos 6 meses por padrão)
    const dataInicioGrafico = dataInicio || (() => {
      const d = new Date();
      d.setMonth(d.getMonth() - 6);
      return d;
    })();

    const graficoConditions = [
      eq(entrevistas.userId, userId),
      isNull(entrevistas.deletedAt),
      gte(candidatoEntrevistas.createdAt, dataInicioGrafico)
    ];
    if (dataFim) {
      graficoConditions.push(lte(candidatoEntrevistas.createdAt, dataFim));
    }

    const entrevistasPorMesRaw = await db
      .select({
        mes: sql<string>`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM')`,
        total: sql<number>`COUNT(*)::int`,
        concluidas: sql<number>`SUM(CASE WHEN ${candidatoEntrevistas.status} = 'concluida' THEN 1 ELSE 0 END)::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(and(...graficoConditions))
      .groupBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${candidatoEntrevistas.createdAt}, 'YYYY-MM')`);

    // Formatar nomes dos meses
    const mesesNomes: Record<string, string> = {
      "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr",
      "05": "Mai", "06": "Jun", "07": "Jul", "08": "Ago",
      "09": "Set", "10": "Out", "11": "Nov", "12": "Dez"
    };

    const entrevistasPorMes = entrevistasPorMesRaw.map(item => ({
      mes: item.mes ? `${mesesNomes[item.mes.split('-')[1]]}/${item.mes.split('-')[0].slice(2)}` : 'N/A',
      total: item.total,
      concluidas: item.concluidas,
    }));

    // 4. Score médio por entrevista (top 3 maiores e top 3 menores)
    const scoresMaiores = await db
      .select({
        titulo: entrevistas.titulo,
        mediaScore: sql<number>`ROUND(AVG(${candidatoEntrevistas.notaGeral})::numeric, 0)::int`,
        totalCandidatos: sql<number>`COUNT(*)::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, userId),
          isNull(entrevistas.deletedAt),
          sql`${candidatoEntrevistas.notaGeral} IS NOT NULL`
        )
      )
      .groupBy(entrevistas.id, entrevistas.titulo)
      .orderBy(desc(sql`AVG(${candidatoEntrevistas.notaGeral})`))
      .limit(3);

    const scoresMenores = await db
      .select({
        titulo: entrevistas.titulo,
        mediaScore: sql<number>`ROUND(AVG(${candidatoEntrevistas.notaGeral})::numeric, 0)::int`,
        totalCandidatos: sql<number>`COUNT(*)::int`,
      })
      .from(candidatoEntrevistas)
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, userId),
          isNull(entrevistas.deletedAt),
          sql`${candidatoEntrevistas.notaGeral} IS NOT NULL`
        )
      )
      .groupBy(entrevistas.id, entrevistas.titulo)
      .orderBy(sql`AVG(${candidatoEntrevistas.notaGeral})`)
      .limit(3);

    // Combinar e remover duplicatas (caso uma entrevista esteja em ambas as listas)
    const scoresMaioresIds = new Set(scoresMaiores.map(s => s.titulo));
    const scoresMenoresFiltrados = scoresMenores.filter(s => !scoresMaioresIds.has(s.titulo));

    const scoresPorEntrevista = [
      ...scoresMaiores.map(s => ({ ...s, tipo: 'maior' as const })),
      ...scoresMenoresFiltrados.map(s => ({ ...s, tipo: 'menor' as const })),
    ];

    // 5. Funil de conversão
    const totalConvites = candidatoEntrevistasStats?.total || 0;
    const totalConcluidos = candidatoEntrevistasStats?.concluidos || 0;
    const totalAvaliados = (candidatoEntrevistasStats?.aprovados || 0) + (candidatoEntrevistasStats?.reprovados || 0);
    const totalAprovados = candidatoEntrevistasStats?.aprovados || 0;

    const funil = [
      { etapa: "Convidados", valor: totalConvites, percentual: 100 },
      { etapa: "Concluíram", valor: totalConcluidos, percentual: totalConvites > 0 ? Math.round((totalConcluidos / totalConvites) * 100) : 0 },
      { etapa: "Avaliados", valor: totalAvaliados, percentual: totalConvites > 0 ? Math.round((totalAvaliados / totalConvites) * 100) : 0 },
      { etapa: "Aprovados", valor: totalAprovados, percentual: totalConvites > 0 ? Math.round((totalAprovados / totalConvites) * 100) : 0 },
    ];

    // 6. Candidatos pendentes de avaliação (concluíram mas não foram avaliados)
    const candidatosPendentesAvaliacao = await db
      .select({
        id: candidatos.id,
        nome: candidatos.nome,
        email: candidatos.email,
        entrevistaTitulo: entrevistas.titulo,
        entrevistaId: entrevistas.id,
        concluidaEm: candidatoEntrevistas.concluidaEm,
        notaGeral: candidatoEntrevistas.notaGeral,
      })
      .from(candidatoEntrevistas)
      .innerJoin(candidatos, eq(candidatoEntrevistas.candidatoId, candidatos.id))
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, userId),
          isNull(entrevistas.deletedAt),
          eq(candidatoEntrevistas.status, "concluida"),
          isNull(candidatoEntrevistas.decisaoRecrutador)
        )
      )
      .orderBy(desc(candidatoEntrevistas.concluidaEm))
      .limit(5);

    // 7. Entrevistas recentes
    const entrevistasRecentes = await db
      .select({
        id: entrevistas.id,
        titulo: entrevistas.titulo,
        cargo: entrevistas.cargo,
        status: entrevistas.status,
        createdAt: entrevistas.createdAt,
        totalCandidatos: sql<number>`(
          SELECT COUNT(*)::int FROM ${candidatoEntrevistas} ce WHERE ce.entrevista_id = ${entrevistas.id}
        )`,
        totalConcluidos: sql<number>`(
          SELECT COUNT(*)::int FROM ${candidatoEntrevistas} ce WHERE ce.entrevista_id = ${entrevistas.id} AND ce.status = 'concluida'
        )`,
      })
      .from(entrevistas)
      .where(and(eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)))
      .orderBy(desc(entrevistas.createdAt))
      .limit(5);

    // 8. Atividade recente (últimas ações)
    const atividadeRecente: DashboardMetrics['atividadeRecente'] = [];

    // Entrevistas criadas recentemente
    const entrevistasCriadas = await db
      .select({
        id: entrevistas.id,
        titulo: entrevistas.titulo,
        createdAt: entrevistas.createdAt,
      })
      .from(entrevistas)
      .where(and(eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)))
      .orderBy(desc(entrevistas.createdAt))
      .limit(3);

    entrevistasCriadas.forEach(e => {
      atividadeRecente.push({
        tipo: 'entrevista_criada',
        descricao: `Entrevista "${e.titulo}" criada`,
        data: e.createdAt,
        link: `/entrevistas/${e.id}`,
      });
    });

    // Candidatos que concluíram recentemente
    const candidatosConcluiram = await db
      .select({
        candidatoNome: candidatos.nome,
        entrevistaTitulo: entrevistas.titulo,
        entrevistaId: entrevistas.id,
        concluidaEm: candidatoEntrevistas.concluidaEm,
        decisao: candidatoEntrevistas.decisaoRecrutador,
      })
      .from(candidatoEntrevistas)
      .innerJoin(candidatos, eq(candidatoEntrevistas.candidatoId, candidatos.id))
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(
        and(
          eq(entrevistas.userId, userId),
          isNull(entrevistas.deletedAt),
          eq(candidatoEntrevistas.status, "concluida")
        )
      )
      .orderBy(desc(candidatoEntrevistas.concluidaEm))
      .limit(5);

    candidatosConcluiram.forEach(c => {
      if (c.decisao === 'aprovado') {
        atividadeRecente.push({
          tipo: 'candidato_aprovado',
          descricao: `${c.candidatoNome} foi aprovado em "${c.entrevistaTitulo}"`,
          data: c.concluidaEm || new Date(),
          link: `/entrevistas/${c.entrevistaId}`,
        });
      } else if (c.decisao === 'reprovado') {
        atividadeRecente.push({
          tipo: 'candidato_reprovado',
          descricao: `${c.candidatoNome} foi reprovado em "${c.entrevistaTitulo}"`,
          data: c.concluidaEm || new Date(),
          link: `/entrevistas/${c.entrevistaId}`,
        });
      } else {
        atividadeRecente.push({
          tipo: 'candidato_concluiu',
          descricao: `${c.candidatoNome} concluiu "${c.entrevistaTitulo}"`,
          data: c.concluidaEm || new Date(),
          link: `/entrevistas/${c.entrevistaId}`,
        });
      }
    });

    // Ordenar atividade por data
    atividadeRecente.sort((a, b) => b.data.getTime() - a.data.getTime());

    // Calcular taxas
    const taxaConclusao = totalConvites > 0 ? Math.round((totalConcluidos / totalConvites) * 100) : 0;
    const taxaAprovacao = totalAvaliados > 0 ? Math.round((totalAprovados / totalAvaliados) * 100) : 0;

    // Calcular taxa de abandono (candidatos que não concluíram e passaram do prazo ou abandonaram)
    const totalIniciados = totalConvites - (candidatoEntrevistasStats?.emAndamento || 0);
    const abandonados = candidatoEntrevistasStats?.abandonados || 0;
    const taxaAbandono = totalIniciados > 0 ? Math.round((abandonados / totalIniciados) * 100) : 0;

    return {
      success: true,
      data: {
        totalCandidatos: kpis?.totalCandidatos || 0,
        totalEntrevistas: entrevistasStats?.total || 0,
        entrevistasAtivas: entrevistasStats?.ativas || 0,
        candidatosAvaliados: totalAvaliados,
        candidatosAprovados: totalAprovados,
        candidatosReprovados: candidatoEntrevistasStats?.reprovados || 0,
        candidatosPendentes: candidatoEntrevistasStats?.pendentes || 0,
        taxaConclusao,
        taxaAprovacao,
        scoreMediaGeral: candidatoEntrevistasStats?.mediaScore || 0,
        // Novos KPIs
        tempoMedioResposta: candidatoEntrevistasStats?.tempoMedioResposta || null,
        taxaAbandono,
        tempoMedioDecisao: candidatoEntrevistasStats?.tempoMedioDecisao || null,
        candidatosPorStatus,
        entrevistasPorMes,
        scoresPorEntrevista: scoresPorEntrevista.map(s => ({
          titulo: s.titulo,
          mediaScore: s.mediaScore || 0,
          totalCandidatos: s.totalCandidatos,
          tipo: s.tipo,
        })),
        funil,
        candidatosPendentesAvaliacao: candidatosPendentesAvaliacao.map(c => ({
          id: c.id,
          nome: c.nome,
          email: c.email,
          entrevistaTitulo: c.entrevistaTitulo,
          entrevistaId: c.entrevistaId,
          concluidaEm: c.concluidaEm || new Date(),
          notaGeral: c.notaGeral,
        })),
        entrevistasRecentes: entrevistasRecentes.map(e => ({
          id: e.id,
          titulo: e.titulo,
          cargo: e.cargo,
          status: e.status,
          totalCandidatos: e.totalCandidatos,
          totalConcluidos: e.totalConcluidos,
          createdAt: e.createdAt,
        })),
        atividadeRecente: atividadeRecente.slice(0, 8),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar métricas do dashboard:", error);
    return { success: false, error: "Erro ao buscar métricas" };
  }
}

// ===== PIPELINE DE CANDIDATOS =====

export interface PipelineCandidate {
  id: string; // candidatoEntrevistas.id
  candidatoId: string;
  nome: string;
  email: string;
  entrevistaId: string;
  entrevistaTitulo: string;
  cargo: string | null;
  empresa: string | null;
  notaGeral: number | null;
  compatibilidadeVaga: number | null;
  recomendacao: string | null;
  concluidaEm: Date | null;
  decisaoRecrutador: string | null;
  decisaoRecrutadorEm: Date | null;
  arquivadoEm: Date | null;
}

export interface EmAndamentoCandidate {
  id: string; // candidatoEntrevistas.id
  candidatoId: string;
  nome: string;
  email: string;
  entrevistaId: string;
  entrevistaTitulo: string;
  cargo: string | null;
  empresa: string | null;
  iniciadaEm: Date | null;
  prazoResposta: Date | null;
  perguntasRespondidas: number;
  totalPerguntas: number;
}

export interface EntrevistaFiltro {
  id: string;
  titulo: string;
  cargo: string | null;
  totalCandidatos: number;
}

export interface PipelineData {
  pendentes: PipelineCandidate[]; // Concluídos aguardando decisão
  finalistas: PipelineCandidate[]; // Aprovados não arquivados
  arquivados: PipelineCandidate[]; // Arquivados (aprovados e reprovados)
  emAndamento: EmAndamentoCandidate[]; // Em andamento com prazo e progresso
  counts: {
    pendentes: number;
    finalistas: number;
    arquivados: number;
    emAndamento: number;
  };
  entrevistas: EntrevistaFiltro[]; // Lista de entrevistas para filtro
}

export async function getPipelineData(entrevistaIdFiltro?: string): Promise<{
  success: boolean;
  data?: PipelineData;
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado" };
  }

  const userId = session.user.id;

  try {
    const db = getDB();

    // Buscar entrevistas para o filtro
    const entrevistasParaFiltro = await db
      .select({
        id: entrevistas.id,
        titulo: entrevistas.titulo,
        cargo: entrevistas.cargo,
        totalCandidatos: sql<number>`(
          SELECT COUNT(*)::int FROM ${candidatoEntrevistas} ce WHERE ce.entrevista_id = ${entrevistas.id}
        )`,
      })
      .from(entrevistas)
      .where(and(eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)))
      .orderBy(desc(entrevistas.createdAt));

    // Filtrar entrevistas com candidatos
    const entrevistasComCandidatos: EntrevistaFiltro[] = entrevistasParaFiltro
      .filter(e => e.totalCandidatos > 0)
      .map(e => ({
        id: e.id,
        titulo: e.titulo,
        cargo: e.cargo,
        totalCandidatos: e.totalCandidatos,
      }));

    // Base query para candidatos do usuário
    const baseConditions = [eq(entrevistas.userId, userId), isNull(entrevistas.deletedAt)];

    // Adicionar filtro por entrevista se especificado
    if (entrevistaIdFiltro) {
      baseConditions.push(eq(entrevistas.id, entrevistaIdFiltro));
    }

    const baseQuery = db
      .select({
        id: candidatoEntrevistas.id,
        candidatoId: candidatos.id,
        nome: candidatos.nome,
        email: candidatos.email,
        entrevistaId: entrevistas.id,
        entrevistaTitulo: entrevistas.titulo,
        cargo: entrevistas.cargo,
        empresa: entrevistas.empresa,
        notaGeral: candidatoEntrevistas.notaGeral,
        compatibilidadeVaga: candidatoEntrevistas.compatibilidadeVaga,
        recomendacao: candidatoEntrevistas.recomendacao,
        concluidaEm: candidatoEntrevistas.concluidaEm,
        decisaoRecrutador: candidatoEntrevistas.decisaoRecrutador,
        decisaoRecrutadorEm: candidatoEntrevistas.decisaoRecrutadorEm,
        arquivadoEm: candidatoEntrevistas.arquivadoEm,
        status: candidatoEntrevistas.status,
        iniciadaEm: candidatoEntrevistas.iniciadaEm,
        prazoResposta: candidatoEntrevistas.prazoResposta,
      })
      .from(candidatoEntrevistas)
      .innerJoin(candidatos, eq(candidatoEntrevistas.candidatoId, candidatos.id))
      .innerJoin(entrevistas, eq(candidatoEntrevistas.entrevistaId, entrevistas.id))
      .where(and(...baseConditions));

    const allCandidates = await baseQuery.orderBy(desc(candidatoEntrevistas.concluidaEm));

    // Separar por categorias
    const pendentes: PipelineCandidate[] = [];
    const finalistas: PipelineCandidate[] = [];
    const arquivados: PipelineCandidate[] = [];
    const emAndamentoList: EmAndamentoCandidate[] = [];
    const emAndamentoIds: { ceId: string; candidatoId: string; entrevistaId: string }[] = [];

    allCandidates.forEach((c) => {
      const candidate: PipelineCandidate = {
        id: c.id,
        candidatoId: c.candidatoId,
        nome: c.nome,
        email: c.email,
        entrevistaId: c.entrevistaId,
        entrevistaTitulo: c.entrevistaTitulo,
        cargo: c.cargo,
        empresa: c.empresa,
        notaGeral: c.notaGeral,
        compatibilidadeVaga: c.compatibilidadeVaga,
        recomendacao: c.recomendacao,
        concluidaEm: c.concluidaEm,
        decisaoRecrutador: c.decisaoRecrutador,
        decisaoRecrutadorEm: c.decisaoRecrutadorEm,
        arquivadoEm: c.arquivadoEm,
      };

      // Arquivados
      if (c.arquivadoEm) {
        arquivados.push(candidate);
      }
      // Finalistas: aprovados e não arquivados
      else if (c.decisaoRecrutador === "aprovado") {
        finalistas.push(candidate);
      }
      // Pendentes: concluídos sem decisão e não arquivados
      else if (c.status === "concluida" && !c.decisaoRecrutador) {
        pendentes.push(candidate);
      }
      // Em andamento
      else if (c.status === "em_andamento") {
        emAndamentoIds.push({
          ceId: c.id,
          candidatoId: c.candidatoId,
          entrevistaId: c.entrevistaId,
        });
        emAndamentoList.push({
          id: c.id,
          candidatoId: c.candidatoId,
          nome: c.nome,
          email: c.email,
          entrevistaId: c.entrevistaId,
          entrevistaTitulo: c.entrevistaTitulo,
          cargo: c.cargo,
          empresa: c.empresa,
          iniciadaEm: c.iniciadaEm,
          prazoResposta: c.prazoResposta,
          perguntasRespondidas: 0, // Será preenchido abaixo
          totalPerguntas: 0, // Será preenchido abaixo
        });
      }
    });

    // Buscar progresso para candidatos em andamento
    if (emAndamentoIds.length > 0) {
      // Buscar total de perguntas por entrevista
      const entrevistaIds = [...new Set(emAndamentoIds.map(e => e.entrevistaId))];
      const perguntasPorEntrevista = await db
        .select({
          entrevistaId: perguntas.entrevistaId,
          total: sql<number>`COUNT(*)::int`,
        })
        .from(perguntas)
        .where(and(
          inArray(perguntas.entrevistaId, entrevistaIds),
          isNull(perguntas.deletedAt)
        ))
        .groupBy(perguntas.entrevistaId);

      const perguntasMap = new Map(perguntasPorEntrevista.map(p => [p.entrevistaId, p.total]));

      // Buscar respostas de cada candidato
      for (const emAndamento of emAndamentoList) {
        const respondidas = await db
          .select({
            count: sql<number>`COUNT(*)::int`,
          })
          .from(respostas)
          .where(and(
            eq(respostas.candidatoId, emAndamento.candidatoId),
            eq(respostas.entrevistaId, emAndamento.entrevistaId),
            isNull(respostas.deletedAt)
          ));

        emAndamento.perguntasRespondidas = respondidas[0]?.count || 0;
        emAndamento.totalPerguntas = perguntasMap.get(emAndamento.entrevistaId) || 0;
      }
    }

    // Ordenar em andamento por prazo (mais urgente primeiro)
    emAndamentoList.sort((a, b) => {
      if (!a.prazoResposta && !b.prazoResposta) return 0;
      if (!a.prazoResposta) return 1;
      if (!b.prazoResposta) return -1;
      return new Date(a.prazoResposta).getTime() - new Date(b.prazoResposta).getTime();
    });

    return {
      success: true,
      data: {
        pendentes,
        finalistas,
        arquivados,
        emAndamento: emAndamentoList,
        counts: {
          pendentes: pendentes.length,
          finalistas: finalistas.length,
          arquivados: arquivados.length,
          emAndamento: emAndamentoList.length,
        },
        entrevistas: entrevistasComCandidatos,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar pipeline:", error);
    return { success: false, error: "Erro ao buscar pipeline" };
  }
}

// Arquivar candidatos em lote
export async function arquivarCandidatos(ids: string[]): Promise<{
  success: boolean;
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado" };
  }

  if (!ids.length) {
    return { success: false, error: "Nenhum candidato selecionado" };
  }

  try {
    const db = getDB();

    await db
      .update(candidatoEntrevistas)
      .set({
        arquivadoEm: new Date(),
        updatedAt: new Date(),
      })
      .where(inArray(candidatoEntrevistas.id, ids));

    revalidatePath("/visao-geral");
    return { success: true };
  } catch (error) {
    console.error("Erro ao arquivar candidatos:", error);
    return { success: false, error: "Erro ao arquivar candidatos" };
  }
}

// Desarquivar candidatos em lote
export async function desarquivarCandidatos(ids: string[]): Promise<{
  success: boolean;
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado" };
  }

  if (!ids.length) {
    return { success: false, error: "Nenhum candidato selecionado" };
  }

  try {
    const db = getDB();

    await db
      .update(candidatoEntrevistas)
      .set({
        arquivadoEm: null,
        updatedAt: new Date(),
      })
      .where(inArray(candidatoEntrevistas.id, ids));

    revalidatePath("/visao-geral");
    return { success: true };
  } catch (error) {
    console.error("Erro ao desarquivar candidatos:", error);
    return { success: false, error: "Erro ao desarquivar candidatos" };
  }
}

// Aprovar candidatos em lote
export async function aprovarCandidatosEmLote(ids: string[]): Promise<{
  success: boolean;
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado" };
  }

  if (!ids.length) {
    return { success: false, error: "Nenhum candidato selecionado" };
  }

  try {
    const db = getDB();

    await db
      .update(candidatoEntrevistas)
      .set({
        decisaoRecrutador: "aprovado",
        decisaoRecrutadorEm: new Date(),
        updatedAt: new Date(),
      })
      .where(inArray(candidatoEntrevistas.id, ids));

    revalidatePath("/visao-geral");
    return { success: true };
  } catch (error) {
    console.error("Erro ao aprovar candidatos:", error);
    return { success: false, error: "Erro ao aprovar candidatos" };
  }
}

// Reprovar candidatos em lote
export async function reprovarCandidatosEmLote(ids: string[]): Promise<{
  success: boolean;
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado" };
  }

  if (!ids.length) {
    return { success: false, error: "Nenhum candidato selecionado" };
  }

  try {
    const db = getDB();

    await db
      .update(candidatoEntrevistas)
      .set({
        decisaoRecrutador: "reprovado",
        decisaoRecrutadorEm: new Date(),
        updatedAt: new Date(),
      })
      .where(inArray(candidatoEntrevistas.id, ids));

    revalidatePath("/visao-geral");
    return { success: true };
  } catch (error) {
    console.error("Erro ao reprovar candidatos:", error);
    return { success: false, error: "Erro ao reprovar candidatos" };
  }
}

// Marcar como processo finalizado (arquiva aprovados)
export async function finalizarProcesso(ids: string[]): Promise<{
  success: boolean;
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Usuário não autenticado" };
  }

  if (!ids.length) {
    return { success: false, error: "Nenhum candidato selecionado" };
  }

  try {
    const db = getDB();

    await db
      .update(candidatoEntrevistas)
      .set({
        arquivadoEm: new Date(),
        updatedAt: new Date(),
      })
      .where(inArray(candidatoEntrevistas.id, ids));

    revalidatePath("/visao-geral");
    return { success: true };
  } catch (error) {
    console.error("Erro ao finalizar processo:", error);
    return { success: false, error: "Erro ao finalizar processo" };
  }
}
