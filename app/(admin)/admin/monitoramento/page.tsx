"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Server,
  Wifi,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Loader2,
  TrendingUp,
  Zap,
  Timer,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonitoringData {
  status: {
    api: "online" | "degraded" | "offline";
    database: "online" | "degraded" | "offline";
    auth: "online" | "degraded" | "offline";
    ai: "online" | "degraded" | "offline";
  };
  metrics: {
    requestsPerMinute: number;
    averageResponseTime: number;
    errorRate: number;
    uptime: number;
  };
  resources: {
    cpu: number;
    memory: number;
    storage: number;
    bandwidth: number;
  };
  performance: Array<{
    time: string;
    responseTime: number;
    requests: number;
    errors: number;
  }>;
  recentErrors: Array<{
    id: string;
    message: string;
    timestamp: string;
    count: number;
    endpoint: string;
  }>;
  alerts: Array<{
    id: string;
    type: "warning" | "error" | "info";
    message: string;
    timestamp: string;
  }>;
}

const StatusIndicator = ({ status }: { status: "online" | "degraded" | "offline" }) => {
  const config = {
    online: { color: "bg-emerald-400", label: "Online", icon: CheckCircle },
    degraded: { color: "bg-amber-400", label: "Degraded", icon: AlertTriangle },
    offline: { color: "bg-red-400", label: "Offline", icon: XCircle },
  };

  const { color, label, icon: Icon } = config[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
      <span className="text-sm text-slate-300">{label}</span>
    </div>
  );
};

export default function MonitoramentoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MonitoringData | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/monitoramento");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar monitoramento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, 30000); // 30 segundos
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando monitoramento...</p>
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
            onClick={fetchData}
            className="mt-4 text-primary hover:underline flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { status, metrics, resources, performance, recentErrors, alerts } = data;
  const allSystemsOperational = Object.values(status).every((s) => s === "online");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Monitoramento</h1>
          <p className="text-slate-400">Status e performance do sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                autoRefresh ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
              }`}
            />
            <span className="text-sm text-slate-400">
              {autoRefresh ? "Auto-refresh ativo" : "Auto-refresh pausado"}
            </span>
          </div>
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant="outline"
            className="border-slate-700"
          >
            {autoRefresh ? "Pausar" : "Ativar"}
          </Button>
          <Button onClick={fetchData} variant="outline" className="border-slate-700">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* System Status Banner */}
      <Card
        className={`border ${
          allSystemsOperational
            ? "bg-emerald-900/20 border-emerald-500/30"
            : "bg-amber-900/20 border-amber-500/30"
        }`}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {allSystemsOperational ? (
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-amber-400" />
            )}
            <div>
              <p className="font-medium text-white">
                {allSystemsOperational
                  ? "Todos os sistemas operacionais"
                  : "Alguns sistemas degradados"}
              </p>
              <p className="text-sm text-slate-400">
                Uptime: {metrics.uptime.toFixed(2)}%
              </p>
            </div>
          </div>
          <Badge className="bg-slate-800 text-slate-300">
            <Clock className="h-3 w-3 mr-1" />
            Última atualização: agora
          </Badge>
        </CardContent>
      </Card>

      {/* Service Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
              <StatusIndicator status={status.api} />
            </div>
            <p className="text-sm font-medium text-white">API</p>
            <p className="text-xs text-slate-400">Endpoints principais</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Database className="h-5 w-5 text-emerald-400" />
              </div>
              <StatusIndicator status={status.database} />
            </div>
            <p className="text-sm font-medium text-white">Database</p>
            <p className="text-xs text-slate-400">PostgreSQL</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Server className="h-5 w-5 text-purple-400" />
              </div>
              <StatusIndicator status={status.auth} />
            </div>
            <p className="text-sm font-medium text-white">Auth</p>
            <p className="text-xs text-slate-400">Autenticação</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <StatusIndicator status={status.ai} />
            </div>
            <p className="text-sm font-medium text-white">AI</p>
            <p className="text-xs text-slate-400">Claude API</p>
          </CardContent>
        </Card>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-400">Requisições/min</span>
            </div>
            <p className="text-2xl font-bold text-white">{metrics.requestsPerMinute}</p>
            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
              <ArrowUpRight className="h-3 w-3" />
              +12% vs ontem
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Tempo Resposta</span>
            </div>
            <p className="text-2xl font-bold text-white">{metrics.averageResponseTime}ms</p>
            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
              <ArrowDownRight className="h-3 w-3" />
              -5% vs ontem
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-xs text-slate-400">Taxa de Erro</span>
            </div>
            <p className="text-2xl font-bold text-white">{metrics.errorRate}%</p>
            <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
              Normal
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400">Uptime</span>
            </div>
            <p className="text-2xl font-bold text-white">{metrics.uptime}%</p>
            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
              Excelente
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance em Tempo Real
          </CardTitle>
          <CardDescription className="text-slate-400">
            Últimas 24 horas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performance}>
                <defs>
                  <linearGradient id="responseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}ms`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="responseTime"
                  name="Tempo de Resposta"
                  stroke="#3b82f6"
                  fill="url(#responseGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Resources & Errors */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resources */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5" />
              Recursos do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <span className="text-slate-300">CPU</span>
                </div>
                <span className="text-white font-medium">{resources.cpu}%</span>
              </div>
              <Progress value={resources.cpu} className="h-2 bg-slate-700" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-emerald-400" />
                  <span className="text-slate-300">Memória</span>
                </div>
                <span className="text-white font-medium">{resources.memory}%</span>
              </div>
              <Progress value={resources.memory} className="h-2 bg-slate-700" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-400" />
                  <span className="text-slate-300">Storage</span>
                </div>
                <span className="text-white font-medium">{resources.storage}%</span>
              </div>
              <Progress value={resources.storage} className="h-2 bg-slate-700" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-amber-400" />
                  <span className="text-slate-300">Bandwidth</span>
                </div>
                <span className="text-white font-medium">{resources.bandwidth}%</span>
              </div>
              <Progress value={resources.bandwidth} className="h-2 bg-slate-700" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Errors */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Erros Recentes
              </CardTitle>
              <Badge className="bg-red-500/20 text-red-400 border-0">
                {recentErrors.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {recentErrors.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-emerald-400" />
                <p>Nenhum erro recente</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentErrors.map((error) => (
                  <div
                    key={error.id}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm text-red-300 font-medium truncate flex-1">
                        {error.message}
                      </p>
                      <Badge className="bg-red-500/20 text-red-400 text-xs ml-2">
                        x{error.count}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{error.endpoint}</span>
                      <span>•</span>
                      <span>{error.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertas Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.type === "error"
                      ? "bg-red-500/10 border-red-500/20"
                      : alert.type === "warning"
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-blue-500/10 border-blue-500/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {alert.type === "error" && <XCircle className="h-5 w-5 text-red-400 shrink-0" />}
                    {alert.type === "warning" && (
                      <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                    )}
                    {alert.type === "info" && <AlertCircle className="h-5 w-5 text-blue-400 shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm text-white">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      Resolver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
