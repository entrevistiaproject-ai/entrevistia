"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Lock,
  Unlock,
  UserX,
  Bot,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader2,
  AlertCircle,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  Ban,
  Fingerprint,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface SecurityData {
  status: "normal" | "atencao" | "critico";
  metricas: {
    loginsFalhados24h: number;
    loginsFalhados1h: number;
    loginsSucesso24h: number;
    taxaSucessoLogin: number;
    ipsUnicos: number;
    ipsSuspeitos: number;
    requisicoesBlockeadas: number;
  };
  rateLimit: {
    entradasAtivas: number;
    bloqueiosAtivos: number;
    padroesSupeitos: number;
    tokenBuckets: number;
  };
  botDetection: {
    ipsMonitorados: number;
    ipsSuspeitos: number;
  };
  ipsSuspeitos: Array<{
    ip: string;
    tentativas: number;
  }>;
  historicoLogin: Array<{
    hora: string;
    sucessos: number;
    falhas: number;
  }>;
  acoesPorTipo: Array<{
    acao: string;
    total: number;
  }>;
  eventosRecentes: Array<{
    id: string;
    tipo: string;
    descricao: string;
    ip: string;
    usuario: string;
    timestamp: string;
  }>;
  alertas: Array<{
    id: string;
    tipo: "critical" | "warning" | "info";
    mensagem: string;
    timestamp: string;
  }>;
}

const StatusBanner = ({ status }: { status: "normal" | "atencao" | "critico" }) => {
  const config = {
    normal: {
      bg: "bg-emerald-900/20 border-emerald-500/30",
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
      title: "Sistema Seguro",
      description: "Nenhuma ameaça detectada",
    },
    atencao: {
      bg: "bg-amber-900/20 border-amber-500/30",
      icon: ShieldAlert,
      iconColor: "text-amber-400",
      title: "Atenção Necessária",
      description: "Algumas atividades suspeitas detectadas",
    },
    critico: {
      bg: "bg-red-900/20 border-red-500/30",
      icon: ShieldX,
      iconColor: "text-red-400",
      title: "Alerta Crítico",
      description: "Ameaças ativas detectadas - ação imediata necessária",
    },
  };

  const { bg, icon: Icon, iconColor, title, description } = config[status];

  return (
    <Card className={`border ${bg}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <Icon className={`h-8 w-8 ${iconColor}`} />
        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const COLORS = ["#10b981", "#ef4444"];

export default function SegurancaPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SecurityData | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/seguranca");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar dados de segurança:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, 60000); // 1 minuto
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando métricas de segurança...</p>
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

  const loginPieData = [
    { name: "Sucesso", value: data.metricas.loginsSucesso24h },
    { name: "Falha", value: data.metricas.loginsFalhados24h },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="h-7 w-7" />
            Segurança
          </h1>
          <p className="text-slate-400">Monitoramento de ameaças e proteção do sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                autoRefresh ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
              }`}
            />
            <span className="text-sm text-slate-400">
              {autoRefresh ? "Auto-refresh ativo" : "Pausado"}
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

      {/* Status Banner */}
      <StatusBanner status={data.status} />

      {/* Alertas Ativos */}
      {data.alertas.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Alertas Ativos
              <Badge className="bg-red-500/20 text-red-400 border-0 ml-2">
                {data.alertas.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.alertas.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-3 rounded-lg border flex items-start gap-3 ${
                    alerta.tipo === "critical"
                      ? "bg-red-500/10 border-red-500/20"
                      : alerta.tipo === "warning"
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-blue-500/10 border-blue-500/20"
                  }`}
                >
                  {alerta.tipo === "critical" && <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />}
                  {alerta.tipo === "warning" && <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />}
                  {alerta.tipo === "info" && <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm text-white">{alerta.mensagem}</p>
                    <p className="text-xs text-slate-500 mt-1">{alerta.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Logins Sucesso (24h)</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.metricas.loginsSucesso24h}</p>
            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
              <CheckCircle className="h-3 w-3" />
              {data.metricas.taxaSucessoLogin}% taxa de sucesso
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Unlock className="h-4 w-4 text-red-400" />
              <span className="text-xs text-slate-400">Logins Falhados (24h)</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.metricas.loginsFalhados24h}</p>
            <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs">
              <Clock className="h-3 w-3" />
              {data.metricas.loginsFalhados1h} na última hora
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ban className="h-4 w-4 text-amber-400" />
              <span className="text-xs text-slate-400">Bloqueios Ativos</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.rateLimit.bloqueiosAtivos}</p>
            <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
              <Activity className="h-3 w-3" />
              {data.rateLimit.entradasAtivas} rate limits ativos
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400">IPs Suspeitos</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.botDetection.ipsSuspeitos}</p>
            <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
              <Fingerprint className="h-3 w-3" />
              {data.botDetection.ipsMonitorados} monitorados
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Histórico de Login */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Histórico de Login (24h)
            </CardTitle>
            <CardDescription className="text-slate-400">
              Tentativas de login por hora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.historicoLogin}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="hora"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    interval={3}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="sucessos" name="Sucesso" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="falhas" name="Falhas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Taxa de Sucesso de Login */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Taxa de Sucesso de Login
            </CardTitle>
            <CardDescription className="text-slate-400">
              Últimas 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <div className="relative">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={loginPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {loginPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {data.metricas.taxaSucessoLogin}%
                  </span>
                  <span className="text-xs text-slate-400">Sucesso</span>
                </div>
              </div>
              <div className="ml-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm text-slate-300">
                    Sucesso: {data.metricas.loginsSucesso24h}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-slate-300">
                    Falha: {data.metricas.loginsFalhados24h}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rate Limiting & Bot Detection */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rate Limiting */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Ban className="h-5 w-5" />
              Rate Limiting
            </CardTitle>
            <CardDescription className="text-slate-400">
              Proteção contra abuso de API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-white">{data.rateLimit.entradasAtivas}</p>
                <p className="text-xs text-slate-400">Entradas Ativas</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-amber-400">{data.rateLimit.bloqueiosAtivos}</p>
                <p className="text-xs text-slate-400">Bloqueios Ativos</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-purple-400">{data.rateLimit.padroesSupeitos}</p>
                <p className="text-xs text-slate-400">Padrões Suspeitos</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-2xl font-bold text-blue-400">{data.rateLimit.tokenBuckets}</p>
                <p className="text-xs text-slate-400">Token Buckets (IA)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IPs Suspeitos */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <UserX className="h-5 w-5" />
                IPs Suspeitos
              </CardTitle>
              <Badge className="bg-red-500/20 text-red-400 border-0">
                {data.ipsSuspeitos.length}
              </Badge>
            </div>
            <CardDescription className="text-slate-400">
              IPs com múltiplas tentativas falhadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.ipsSuspeitos.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-emerald-400" />
                <p>Nenhum IP suspeito detectado</p>
              </div>
            ) : (
              <div className="space-y-2">
                {data.ipsSuspeitos.map((ip, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <UserX className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-white font-mono">{ip.ip}</span>
                    </div>
                    <Badge className="bg-red-500/20 text-red-400">
                      {ip.tentativas} tentativas
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Eventos Recentes de Segurança */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Eventos de Segurança Recentes
          </CardTitle>
          <CardDescription className="text-slate-400">
            Últimas 24 horas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.eventosRecentes.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-emerald-400" />
              <p>Nenhum evento de segurança recente</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Tipo</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Descrição</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">IP</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Usuário</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Quando</th>
                  </tr>
                </thead>
                <tbody>
                  {data.eventosRecentes.map((evento) => (
                    <tr key={evento.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        <Badge
                          className={`${
                            evento.tipo.includes("failed")
                              ? "bg-red-500/20 text-red-400"
                              : evento.tipo === "delete" || evento.tipo === "export"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-blue-500/20 text-blue-400"
                          } border-0 text-xs`}
                        >
                          {evento.tipo}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-300 max-w-xs truncate">
                        {evento.descricao}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-400 font-mono">
                        {evento.ip}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-400">
                        {evento.usuario}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-500">
                        {evento.timestamp}
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
