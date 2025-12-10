"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Briefcase,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Activity,
  Target,
  BarChart3,
  PieChart,
  Loader2,
  AlertCircle,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { getDashboardMetrics, DashboardMetrics } from "./actions";

// Cores para os gráficos
const COLORS = {
  primary: "hsl(var(--primary))",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  muted: "hsl(var(--muted-foreground))",
};

const STATUS_COLORS: Record<string, string> = {
  aprovados: COLORS.success,
  reprovados: COLORS.danger,
  pendentes: COLORS.warning,
  em_andamento: COLORS.primary,
};

export default function VisaoGeralPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDashboardMetrics();
      if (result.success && result.data) {
        setMetrics(result.data);
      } else {
        setError(result.error || "Erro ao carregar métricas");
      }
    } catch (err) {
      setError("Erro ao carregar métricas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityIcon = (tipo: string) => {
    switch (tipo) {
      case "entrevista_criada":
        return <Briefcase className="h-4 w-4 text-primary" />;
      case "candidato_concluiu":
        return <Clock className="h-4 w-4 text-warning" />;
      case "candidato_aprovado":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "candidato_reprovado":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      active: { label: "Ativa", variant: "default" },
      publicada: { label: "Publicada", variant: "default" },
      em_andamento: { label: "Em Andamento", variant: "secondary" },
      completed: { label: "Concluída", variant: "outline" },
      concluida: { label: "Concluída", variant: "outline" },
    };
    const config = statusMap[status] || { label: status, variant: "secondary" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Visão Geral"
          description="Acompanhe o desempenho do seu processo seletivo"
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Visão Geral"
          description="Acompanhe o desempenho do seu processo seletivo"
        />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erro ao carregar dados</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchMetrics} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verificar se há dados para mostrar
  const hasData = metrics.totalEntrevistas > 0 || metrics.totalCandidatos > 0;

  if (!hasData) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Visão Geral"
          description="Acompanhe o desempenho do seu processo seletivo"
        >
          <Button asChild size="touch">
            <Link href="/criar-entrevista">
              <PlusCircle className="h-4 w-4" />
              Nova Entrevista
            </Link>
          </Button>
        </PageHeader>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-6">
              <BarChart3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comece a usar o EntrevistIA</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
              Crie sua primeira entrevista para começar a ver métricas e análises do seu processo seletivo aqui.
            </p>
            <Button asChild>
              <Link href="/criar-entrevista">
                <PlusCircle className="h-4 w-4 mr-2" />
                Criar Primeira Entrevista
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visão Geral"
        description="Acompanhe o desempenho do seu processo seletivo"
      >
        <Button asChild size="touch" className="w-full sm:w-auto">
          <Link href="/criar-entrevista">
            <PlusCircle className="h-4 w-4" />
            Nova Entrevista
          </Link>
        </Button>
      </PageHeader>

      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Candidatos</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCandidatos}</div>
            <p className="text-xs text-muted-foreground">
              candidatos únicos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas Ativas</CardTitle>
            <div className="rounded-lg bg-green-500/10 p-2">
              <Briefcase className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.entrevistasAtivas}</div>
            <p className="text-xs text-muted-foreground">
              de {metrics.totalEntrevistas} entrevistas no total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <div className="rounded-lg bg-blue-500/10 p-2">
              {metrics.taxaConclusao >= 50 ? (
                <TrendingUp className="h-4 w-4 text-blue-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-blue-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.taxaConclusao}%</div>
            <Progress value={metrics.taxaConclusao} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <Target className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.taxaAprovacao}%</div>
            <Progress value={metrics.taxaAprovacao} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha de KPIs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.candidatosAprovados}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reprovados</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.candidatosReprovados}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Avaliação</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{metrics.candidatosPendentes}</div>
            {metrics.candidatosPendentes > 0 && (
              <Button asChild variant="link" className="p-0 h-auto text-xs">
                <Link href="#pendentes">Ver pendentes</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gráfico de Status dos Candidatos */}
        {metrics.candidatosPorStatus.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Candidatos por Status
              </CardTitle>
              <CardDescription>Distribuição atual dos candidatos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={metrics.candidatosPorStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="label"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {metrics.candidatosPorStatus.map((entry) => (
                        <Cell
                          key={entry.status}
                          fill={STATUS_COLORS[entry.status] || COLORS.muted}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {metrics.candidatosPorStatus.map((item) => (
                  <div key={item.status} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[item.status] || COLORS.muted }}
                    />
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Evolução Mensal */}
        {metrics.entrevistasPorMes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Candidatos por Mês
              </CardTitle>
              <CardDescription>Evolução dos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics.entrevistasPorMes}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Convidados"
                      stroke={COLORS.primary}
                      strokeWidth={2}
                      dot={{ fill: COLORS.primary }}
                    />
                    <Line
                      type="monotone"
                      dataKey="concluidas"
                      name="Concluídas"
                      stroke={COLORS.success}
                      strokeWidth={2}
                      dot={{ fill: COLORS.success }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Funil de Conversão e Score por Entrevista */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Funil de Conversão */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Funil de Conversão
            </CardTitle>
            <CardDescription>Do convite à aprovação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.funil.map((etapa, index) => (
                <div key={etapa.etapa} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{etapa.etapa}</span>
                    <span className="text-sm text-muted-foreground">
                      {etapa.valor} ({etapa.percentual}%)
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={etapa.percentual}
                      className="h-8"
                      style={{
                        opacity: 1 - index * 0.15,
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                      {etapa.valor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Score Médio por Entrevista */}
        {metrics.scoresPorEntrevista.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Score Médio por Vaga
              </CardTitle>
              <CardDescription>Top 5 entrevistas com maior score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.scoresPorEntrevista} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis
                      dataKey="titulo"
                      type="category"
                      width={120}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        value.length > 15 ? `${value.slice(0, 15)}...` : value
                      }
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "mediaScore" ? `${value} pontos` : `${value} candidatos`,
                        name === "mediaScore" ? "Score Médio" : "Candidatos",
                      ]}
                    />
                    <Bar dataKey="mediaScore" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Listas de Ação */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Candidatos Pendentes de Avaliação */}
        <Card id="pendentes">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Aguardando Avaliação
            </CardTitle>
            <CardDescription>Candidatos que concluíram e precisam ser avaliados</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.candidatosPendentesAvaliacao.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhum candidato pendente de avaliação
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {metrics.candidatosPendentesAvaliacao.map((candidato) => (
                  <Link
                    key={candidato.id}
                    href={`/entrevistas/${candidato.entrevistaId}`}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(candidato.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{candidato.nome}</p>
                        <p className="text-xs text-muted-foreground">{candidato.entrevistaTitulo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {candidato.notaGeral && (
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{Math.round(candidato.notaGeral)}</p>
                          <p className="text-xs text-muted-foreground">score</p>
                        </div>
                      )}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
                {metrics.candidatosPendentes > 5 && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/candidatos">
                      Ver todos ({metrics.candidatosPendentes})
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.atividadeRecente.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Activity className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Nenhuma atividade recente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {metrics.atividadeRecente.map((atividade, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">{getActivityIcon(atividade.tipo)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{atividade.descricao}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(atividade.data)}</p>
                    </div>
                    {atividade.link && (
                      <Button asChild variant="ghost" size="sm">
                        <Link href={atividade.link}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Entrevistas Recentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Entrevistas Recentes
              </CardTitle>
              <CardDescription>Suas últimas entrevistas criadas</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/entrevistas">
                Ver todas
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {metrics.entrevistasRecentes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Briefcase className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Nenhuma entrevista criada ainda</p>
              <Button asChild variant="link" className="mt-2">
                <Link href="/criar-entrevista">Criar primeira entrevista</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Título</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Cargo</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Candidatos</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Concluídos</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.entrevistasRecentes.map((entrevista) => (
                    <tr key={entrevista.id} className="border-b last:border-0">
                      <td className="py-3 px-2">
                        <span className="font-medium">{entrevista.titulo}</span>
                      </td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">
                        {entrevista.cargo || "-"}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {getStatusBadge(entrevista.status)}
                      </td>
                      <td className="py-3 px-2 text-center">{entrevista.totalCandidatos}</td>
                      <td className="py-3 px-2 text-center">{entrevista.totalConcluidos}</td>
                      <td className="py-3 px-2 text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/entrevistas/${entrevista.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
