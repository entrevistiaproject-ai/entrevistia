"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Briefcase,
  MessageSquare,
  BarChart3,
  Target,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Loader2,
  AlertCircle,
  Download,
  Calendar,
  Activity,
  UserCheck,
  UserMinus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsData {
  kpis: {
    taxaConversao: number;
    taxaRetencao: number;
    nps: number;
    tempoMedioSessao: number;
    entrevistasPorUsuario: number;
    perguntasPorEntrevista: number;
    taxaCompletude: number;
  };
  usuariosAtivos: Array<{ data: string; dau: number; wau: number; mau: number }>;
  funil: {
    cadastros: number;
    verificados: number;
    primeiraEntrevista: number;
    entrevistasRecorrentes: number;
    pagantes: number;
  };
  engajamento: Array<{ hora: string; acessos: number }>;
  retencao: Array<{ semana: string; retidos: number; total: number }>;
  funcionalidades: Array<{ feature: string; uso: number; satisfacao: number }>;
  churn: {
    taxaMensal: number;
    motivosPrincipais: Array<{ motivo: string; percentual: number }>;
  };
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [periodo, setPeriodo] = useState("30d");

  useEffect(() => {
    fetchAnalyticsData();
  }, [periodo]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics?periodo=${periodo}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando analytics...</p>
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
            onClick={fetchAnalyticsData}
            className="mt-4 text-primary hover:underline flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { kpis, usuariosAtivos, funil, engajamento, retencao, funcionalidades, churn } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400">Métricas de uso e engajamento</p>
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
            </TabsList>
          </Tabs>

          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-400">Conversão</span>
            </div>
            <p className="text-xl font-bold text-white">{kpis.taxaConversao}%</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Retenção</span>
            </div>
            <p className="text-xl font-bold text-white">{kpis.taxaRetencao}%</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400">NPS</span>
            </div>
            <p className="text-xl font-bold text-white">{kpis.nps}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-slate-400">Tempo Sessão</span>
            </div>
            <p className="text-xl font-bold text-white">{kpis.tempoMedioSessao}min</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-cyan-400" />
              <span className="text-xs text-slate-400">Entrev/User</span>
            </div>
            <p className="text-xl font-bold text-white">{kpis.entrevistasPorUsuario}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-pink-400" />
              <span className="text-xs text-slate-400">Perg/Entrev</span>
            </div>
            <p className="text-xl font-bold text-white">{kpis.perguntasPorEntrevista}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-slate-400">Completude</span>
            </div>
            <p className="text-xl font-bold text-white">{kpis.taxaCompletude}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Usuários Ativos */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuários Ativos
            </CardTitle>
            <CardDescription className="text-slate-400">
              DAU, WAU e MAU ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usuariosAtivos}>
                  <defs>
                    <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="wauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="data" tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="dau" name="DAU" stroke="#3b82f6" fill="url(#dauGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="wau" name="WAU" stroke="#10b981" fill="url(#wauGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="mau" name="MAU" stroke="#f59e0b" fill="url(#mauGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Funil de Conversão */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              Funil de Conversão
            </CardTitle>
            <CardDescription className="text-slate-400">
              Jornada do usuário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Cadastros", value: funil.cadastros, color: "#3b82f6" },
                { label: "Email Verificado", value: funil.verificados, color: "#8b5cf6" },
                { label: "Primeira Entrevista", value: funil.primeiraEntrevista, color: "#06b6d4" },
                { label: "Entrevistas Recorrentes", value: funil.entrevistasRecorrentes, color: "#10b981" },
                { label: "Pagantes", value: funil.pagantes, color: "#f59e0b" },
              ].map((step, index) => {
                const percentual = funil.cadastros > 0 ? (step.value / funil.cadastros) * 100 : 0;
                const prevPercentual =
                  index > 0
                    ? (step.value /
                        [funil.cadastros, funil.verificados, funil.primeiraEntrevista, funil.entrevistasRecorrentes][
                          index - 1
                        ]) *
                      100
                    : 100;

                return (
                  <div key={step.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{step.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{step.value}</span>
                        <Badge
                          style={{ backgroundColor: `${step.color}20`, color: step.color }}
                          className="border-0"
                        >
                          {percentual.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${percentual}%`, backgroundColor: step.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Engajamento por Hora */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Engajamento por Hora
            </CardTitle>
            <CardDescription className="text-slate-400">
              Distribuição de acessos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engajamento}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="hora" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="acessos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Retenção Semanal */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Retenção Semanal
            </CardTitle>
            <CardDescription className="text-slate-400">
              Cohort de retenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retencao}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="semana" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: number) => [`${value}%`, "Retidos"]}
                  />
                  <Line type="monotone" dataKey="retidos" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Churn */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <UserMinus className="h-5 w-5" />
                  Churn
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Taxa e motivos
                </CardDescription>
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-0 text-lg">
                {churn.taxaMensal}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {churn.motivosPrincipais.map((motivo, index) => (
                <div key={motivo.motivo} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{motivo.motivo}</span>
                      <span className="text-white font-medium">{motivo.percentual}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${motivo.percentual}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uso de Funcionalidades */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Uso de Funcionalidades
          </CardTitle>
          <CardDescription className="text-slate-400">
            Frequência de uso e satisfação por feature
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funcionalidades} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={150}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="uso" name="Uso (%)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="satisfacao" name="Satisfação (%)" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
