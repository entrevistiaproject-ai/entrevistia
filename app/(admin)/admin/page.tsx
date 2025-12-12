"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building2,
  Briefcase,
  MessageSquare,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DashboardData {
  kpis: {
    totalUsuarios: number;
    usuariosAtivos: number;
    usuariosNovos30d: number;
    receitaMensal: number;
    receitaTotal: number;
    custoMensal: number;
    lucroMensal: number;
    margemLucro: number;
    totalEntrevistas: number;
    totalCandidatos: number;
    ticketMedio: number;
    churnRate: number;
  };
  usuariosPorPlano: Array<{ plano: string; quantidade: number; cor: string }>;
  receitaPorMes: Array<{ mes: string; receita: number; custo: number; lucro: number }>;
  crescimentoUsuarios: Array<{ mes: string; novos: number; total: number }>;
  topUsuarios: Array<{
    id: string;
    nome: string;
    empresa: string;
    gastoTotal: number;
    entrevistas: number;
  }>;
  faturasStatus: {
    pagas: number;
    abertas: number;
    vencidas: number;
    valorPendente: number;
  };
  atividadeRecente: Array<{
    id: string;
    tipo: string;
    descricao: string;
    usuario: string;
    data: string;
  }>;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [periodo, setPeriodo] = useState("30d");

  useEffect(() => {
    fetchDashboardData();
  }, [periodo]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/dashboard?periodo=${periodo}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-slate-400">Erro ao carregar dados</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 text-primary hover:underline flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { kpis, usuariosPorPlano, receitaPorMes, crescimentoUsuarios, topUsuarios, faturasStatus, atividadeRecente } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Visão geral do sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={periodo} onValueChange={setPeriodo}>
            <TabsList className="bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="7d" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                7 dias
              </TabsTrigger>
              <TabsTrigger value="30d" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                30 dias
              </TabsTrigger>
              <TabsTrigger value="90d" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                90 dias
              </TabsTrigger>
              <TabsTrigger value="1y" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                1 ano
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <button
            onClick={fetchDashboardData}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards - Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Usuários Ativos */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {kpis.usuariosAtivos.toLocaleString()}
              </p>
              <p className="text-sm text-slate-400 mt-1">Usuários Ativos</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span className="text-emerald-400">+{kpis.usuariosNovos30d}</span>
              <span>nos últimos 30 dias</span>
            </div>
          </CardContent>
        </Card>

        {/* Receita Mensal */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                R$ {kpis.receitaMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-slate-400 mt-1">Receita Mensal</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>Ticket médio:</span>
              <span className="text-white">R$ {kpis.ticketMedio.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Lucro */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 text-xs">
                {kpis.margemLucro.toFixed(1)}%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                R$ {kpis.lucroMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-slate-400 mt-1">Lucro Mensal</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>Custo:</span>
              <span className="text-red-400">-R$ {kpis.custoMensal.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Total de Entrevistas */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Briefcase className="h-5 w-5 text-amber-400" />
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +23%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {kpis.totalEntrevistas.toLocaleString()}
              </p>
              <p className="text-sm text-slate-400 mt-1">Entrevistas</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>{kpis.totalCandidatos.toLocaleString()}</span>
              <span>candidatos avaliados</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Receita vs Custo vs Lucro */}
        <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Receita vs Custo vs Lucro</CardTitle>
            <CardDescription className="text-slate-400">
              Evolução financeira mensal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={receitaPorMes}>
                  <defs>
                    <linearGradient id="receitaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="custoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="lucroGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `R$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#e2e8f0" }}
                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, ""]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    name="Receita"
                    stroke="#10b981"
                    fill="url(#receitaGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="custo"
                    name="Custo"
                    stroke="#ef4444"
                    fill="url(#custoGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="lucro"
                    name="Lucro"
                    stroke="#3b82f6"
                    fill="url(#lucroGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Usuários por Plano - Pie Chart */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Usuários por Plano</CardTitle>
            <CardDescription className="text-slate-400">
              Distribuição atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usuariosPorPlano}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="quantidade"
                    nameKey="plano"
                  >
                    {usuariosPorPlano.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#e2e8f0" }}
                    formatter={(value: number, name: string) => [value, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {usuariosPorPlano.map((item, index) => (
                <div key={item.plano} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.cor || COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-300 capitalize">{item.plano.replace("_", " ")}</span>
                  </div>
                  <span className="text-white font-medium">{item.quantidade}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Crescimento de Usuários */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Crescimento de Usuários</CardTitle>
            <CardDescription className="text-slate-400">
              Novos usuários e total acumulado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={crescimentoUsuarios}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#e2e8f0" }}
                  />
                  <Legend />
                  <Bar dataKey="novos" name="Novos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" name="Total" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status das Faturas */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Status das Faturas</CardTitle>
            <CardDescription className="text-slate-400">
              Visão geral de cobranças
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{faturasStatus.pagas}</p>
                <p className="text-xs text-slate-400">Pagas</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{faturasStatus.abertas}</p>
                <p className="text-xs text-slate-400">Abertas</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{faturasStatus.vencidas}</p>
                <p className="text-xs text-slate-400">Vencidas</p>
              </div>
            </div>

            {/* Valor Pendente */}
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Valor Pendente Total</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    R$ {faturasStatus.valorPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <CreditCard className="h-10 w-10 text-amber-400/50" />
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Taxa de Pagamento</span>
                <span className="text-white font-medium">
                  {Math.round(
                    (faturasStatus.pagas / (faturasStatus.pagas + faturasStatus.abertas + faturasStatus.vencidas)) * 100
                  )}%
                </span>
              </div>
              <Progress
                value={
                  (faturasStatus.pagas / (faturasStatus.pagas + faturasStatus.abertas + faturasStatus.vencidas)) * 100
                }
                className="h-2 bg-slate-700"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Usuários */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Top Clientes</CardTitle>
                <CardDescription className="text-slate-400">
                  Por valor gasto
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                Top 5
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsuarios.map((usuario, index) => (
                <div
                  key={usuario.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0
                        ? "bg-amber-500 text-amber-950"
                        : index === 1
                        ? "bg-slate-400 text-slate-950"
                        : index === 2
                        ? "bg-orange-600 text-orange-50"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {usuario.nome}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {usuario.empresa || "Sem empresa"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-400">
                      R$ {usuario.gastoTotal.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {usuario.entrevistas} entrevistas
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Atividade Recente</CardTitle>
                <CardDescription className="text-slate-400">
                  Últimas ações no sistema
                </CardDescription>
              </div>
              <Activity className="h-5 w-5 text-slate-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atividadeRecente.map((atividade) => (
                <div
                  key={atividade.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      atividade.tipo === "cadastro"
                        ? "bg-blue-500/20 text-blue-400"
                        : atividade.tipo === "pagamento"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : atividade.tipo === "entrevista"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {atividade.tipo === "cadastro" && <Users className="h-4 w-4" />}
                    {atividade.tipo === "pagamento" && <DollarSign className="h-4 w-4" />}
                    {atividade.tipo === "entrevista" && <Briefcase className="h-4 w-4" />}
                    {!["cadastro", "pagamento", "entrevista"].includes(atividade.tipo) && (
                      <Activity className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{atividade.descricao}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{atividade.usuario}</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">{atividade.data}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
