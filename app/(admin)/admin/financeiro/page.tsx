"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  PiggyBank,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Loader2,
  RefreshCw,
  AlertCircle,
  Download,
  Calendar,
  Cpu,
  MessageSquare,
  FileText,
  Users,
  Mic,
  Server,
  Database,
  Mail,
  Cloud,
  Calculator,
  Info,
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
  ComposedChart,
} from "recharts";

interface FinanceiroData {
  resumo: {
    receitaTotal: number;
    custoTotal: number;
    lucroTotal: number;
    margemMedia: number;
    receitaMesAtual: number;
    custoMesAtual: number;
    lucroMesAtual: number;
    margemMesAtual: number;
    variacao: {
      receita: number;
      custo: number;
      lucro: number;
    };
  };
  custosPorTipo: Array<{
    tipo: string;
    custoBase: number;
    valorCobrado: number;
    margem: number;
    quantidade: number;
  }>;
  receitaPorMes: Array<{
    mes: string;
    receita: number;
    custo: number;
    lucro: number;
  }>;
  tokensConsumo: {
    totalInput: number;
    totalOutput: number;
    custoTokens: number;
    porModelo: Array<{
      modelo: string;
      input: number;
      output: number;
      custo: number;
      custoUSD?: number;
      precoInputPorMilhao?: number;
      precoOutputPorMilhao?: number;
    }>;
  };
  // Métricas detalhadas do Claude
  custosClaudeDetalhado: {
    tokensEntrada: number;
    tokensSaida: number;
    totalTokens: number;
    totalAnalises: number;
    custoEntradaUSD: number;
    custoSaidaUSD: number;
    custoTotalUSD: number;
    custoTotalBRL: number;
    precos: {
      inputPorMilhao: number;
      outputPorMilhao: number;
      taxaCambio: number;
    };
  };
  // Métricas detalhadas do Whisper
  custosWhisperDetalhado: {
    totalMinutos: number;
    totalSegundos: number;
    totalTranscricoes: number;
    totalBytesAudio: number;
    custoTotalUSD: number;
    custoTotalBRL: number;
    precos: {
      porMinutoUSD: number;
      taxaCambio: number;
    };
  };
  // Custos de infraestrutura
  custosInfraestrutura: {
    periodo: number;
    custoTotalPeriodo: number;
    servicos: Array<{
      id: string;
      nome: string;
      descricao: string;
      custoMensal: number;
      custoPeriodo: number;
    }>;
  };
  // Custos por categoria
  custosPorCategoria: {
    claude: number;
    whisper: number;
    infraestrutura: number;
    total: number;
    totalSemInfraestrutura: number;
  };
  margemPorOperacao: Array<{
    operacao: string;
    custoMedio: number;
    valorMedio: number;
    margem: number;
    volume: number;
  }>;
  topCustosUsuarios: Array<{
    id: string;
    nome: string;
    custo: number;
    receita: number;
    margem: number;
  }>;
  projecao: {
    receitaProjetada: number;
    custoProjetado: number;
    lucroProjetado: number;
  };
  // Margem teórica
  margemTeorica: {
    receitaTotal: number;
    custoAPIs: number;
    custoInfraestrutura: number;
    custoTotalReal: number;
    lucroReal: number;
    margemReal: number;
  };
}

const COLORS = {
  receita: "#10b981",
  custo: "#ef4444",
  lucro: "#3b82f6",
  tokens: ["#8b5cf6", "#06b6d4", "#f59e0b", "#ec4899"],
};

const tipoLabels: Record<string, { label: string; icon: React.ElementType }> = {
  taxa_base_candidato: { label: "Taxa Base Candidato", icon: Users },
  analise_pergunta: { label: "Análise por Pergunta", icon: MessageSquare },
  transcricao_audio: { label: "Transcrição Áudio", icon: FileText },
  analise_ia: { label: "Análise IA", icon: Cpu },
};

export default function FinanceiroPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FinanceiroData | null>(null);
  const [periodo, setPeriodo] = useState("6m");

  useEffect(() => {
    fetchFinanceiroData();
  }, [periodo]);

  const fetchFinanceiroData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/financeiro?periodo=${periodo}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar financeiro:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando métricas financeiras...</p>
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
            onClick={fetchFinanceiroData}
            className="mt-4 text-primary hover:underline flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const {
    resumo,
    custosPorTipo,
    receitaPorMes,
    tokensConsumo,
    margemPorOperacao,
    topCustosUsuarios,
    projecao,
    custosClaudeDetalhado,
    custosWhisperDetalhado,
    custosInfraestrutura,
    custosPorCategoria,
    margemTeorica,
  } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Receitas & Custos</h1>
          <p className="text-slate-400">Análise financeira detalhada</p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={periodo} onValueChange={setPeriodo}>
            <TabsList className="bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="1m" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                1 mês
              </TabsTrigger>
              <TabsTrigger value="3m" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                3 meses
              </TabsTrigger>
              <TabsTrigger value="6m" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                6 meses
              </TabsTrigger>
              <TabsTrigger value="1y" className="data-[state=active]:bg-primary text-xs sm:text-sm">
                1 ano
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Receita */}
        <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-900 border-emerald-500/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
              <Badge
                className={`${
                  resumo.variacao.receita >= 0
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                } border-0`}
              >
                {resumo.variacao.receita >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(resumo.variacao.receita).toFixed(1)}%
              </Badge>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              R$ {resumo.receitaMesAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-slate-400 mt-1">Receita Mês Atual</p>
            <p className="text-xs text-slate-500 mt-2">
              Total: R$ {resumo.receitaTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        {/* Custos */}
        <Card className="bg-gradient-to-br from-red-900/30 to-slate-900 border-red-500/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-red-500/20">
                <Receipt className="h-5 w-5 text-red-400" />
              </div>
              <Badge
                className={`${
                  resumo.variacao.custo <= 0
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                } border-0`}
              >
                {resumo.variacao.custo <= 0 ? (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(resumo.variacao.custo).toFixed(1)}%
              </Badge>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              R$ {resumo.custoMesAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-slate-400 mt-1">Custo Mês Atual</p>
            <p className="text-xs text-slate-500 mt-2">
              Total: R$ {resumo.custoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        {/* Lucro */}
        <Card className="bg-gradient-to-br from-blue-900/30 to-slate-900 border-blue-500/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <PiggyBank className="h-5 w-5 text-blue-400" />
              </div>
              <Badge
                className={`${
                  resumo.variacao.lucro >= 0
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                } border-0`}
              >
                {resumo.variacao.lucro >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(resumo.variacao.lucro).toFixed(1)}%
              </Badge>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              R$ {resumo.lucroMesAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-slate-400 mt-1">Lucro Mês Atual</p>
            <p className="text-xs text-slate-500 mt-2">
              Total: R$ {resumo.lucroTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        {/* Margem */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900 border-purple-500/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-0">
                Markup 2.5x
              </Badge>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {resumo.margemMesAtual.toFixed(1)}%
            </p>
            <p className="text-sm text-slate-400 mt-1">Margem Mês Atual</p>
            <p className="text-xs text-slate-500 mt-2">
              Média histórica: {resumo.margemMedia.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Receita vs Custo vs Lucro - Line Chart */}
        <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Evolução Financeira
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Receita, custos e lucro ao longo do tempo
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={receitaPorMes}>
                  <defs>
                    <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.receita} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.receita} stopOpacity={0} />
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
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, ""]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    name="Receita"
                    fill="url(#receitaGrad)"
                    stroke={COLORS.receita}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="custo"
                    name="Custo"
                    stroke={COLORS.custo}
                    strokeWidth={2}
                    dot={{ fill: COLORS.custo, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lucro"
                    name="Lucro"
                    stroke={COLORS.lucro}
                    strokeWidth={3}
                    dot={{ fill: COLORS.lucro, strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Custos por Tipo - Pie Chart */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Custos por Tipo
            </CardTitle>
            <CardDescription className="text-slate-400">
              Distribuição de custos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={custosPorTipo}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="custoBase"
                    nameKey="tipo"
                  >
                    {custosPorTipo.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.tokens[index % COLORS.tokens.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Custo"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {custosPorTipo.map((item, index) => {
                const info = tipoLabels[item.tipo] || { label: item.tipo, icon: Activity };
                const Icon = info.icon;
                return (
                  <div key={item.tipo} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS.tokens[index % COLORS.tokens.length] }}
                      />
                      <Icon className="h-3 w-3 text-slate-500" />
                      <span className="text-slate-300 text-xs">{info.label}</span>
                    </div>
                    <span className="text-white font-medium">
                      R$ {item.custoBase.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custos Detalhados por Serviço */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Custos Claude (IA) */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-400" />
                  Claude AI (Anthropic)
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Custo de tokens para analise de respostas
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-0">
                ${custosClaudeDetalhado?.precos?.inputPorMilhao || 3}/1M input
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Indicadores principais */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-xs text-slate-500 mb-1">Tokens de Entrada</p>
                <p className="text-xl font-bold text-purple-400">
                  {((custosClaudeDetalhado?.tokensEntrada || 0) / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  ${custosClaudeDetalhado?.precos?.inputPorMilhao || 3}/1M tokens
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-xs text-slate-500 mb-1">Tokens de Saida</p>
                <p className="text-xl font-bold text-cyan-400">
                  {((custosClaudeDetalhado?.tokensSaida || 0) / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  ${custosClaudeDetalhado?.precos?.outputPorMilhao || 15}/1M tokens
                </p>
              </div>
            </div>

            {/* Detalhamento de custos */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Total de Tokens</span>
                <span className="text-white font-medium">
                  {((custosClaudeDetalhado?.totalTokens || 0) / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Total de Analises</span>
                <span className="text-white font-medium">
                  {custosClaudeDetalhado?.totalAnalises || 0}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Custo Input (USD)</span>
                <span className="text-white">
                  ${(custosClaudeDetalhado?.custoEntradaUSD || 0).toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Custo Output (USD)</span>
                <span className="text-white">
                  ${(custosClaudeDetalhado?.custoSaidaUSD || 0).toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Total USD</span>
                <span className="text-amber-400 font-medium">
                  ${(custosClaudeDetalhado?.custoTotalUSD || 0).toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between py-2 bg-slate-800/50 px-2 rounded">
                <span className="text-white font-medium">Total BRL (1 USD = R$ {custosClaudeDetalhado?.precos?.taxaCambio || 5})</span>
                <span className="text-emerald-400 font-bold">
                  R$ {(custosClaudeDetalhado?.custoTotalBRL || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custos Whisper (Audio) */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mic className="h-5 w-5 text-orange-400" />
                  Whisper (OpenAI)
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Custo de transcricao de audio
                </CardDescription>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400 border-0">
                ${custosWhisperDetalhado?.precos?.porMinutoUSD || 0.006}/min
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Indicadores principais */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-xs text-slate-500 mb-1">Minutos de Audio</p>
                <p className="text-xl font-bold text-orange-400">
                  {(custosWhisperDetalhado?.totalMinutos || 0).toFixed(1)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {Math.floor((custosWhisperDetalhado?.totalSegundos || 0) / 3600)}h {Math.floor(((custosWhisperDetalhado?.totalSegundos || 0) % 3600) / 60)}m
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-xs text-slate-500 mb-1">Transcricoes</p>
                <p className="text-xl font-bold text-blue-400">
                  {custosWhisperDetalhado?.totalTranscricoes || 0}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {((custosWhisperDetalhado?.totalBytesAudio || 0) / (1024 * 1024)).toFixed(1)} MB total
                </p>
              </div>
            </div>

            {/* Detalhamento de custos */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Total Segundos</span>
                <span className="text-white font-medium">
                  {(custosWhisperDetalhado?.totalSegundos || 0).toFixed(0)}s
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Preco por Minuto</span>
                <span className="text-white">
                  ${custosWhisperDetalhado?.precos?.porMinutoUSD || 0.006}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Total USD</span>
                <span className="text-amber-400 font-medium">
                  ${(custosWhisperDetalhado?.custoTotalUSD || 0).toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between py-2 bg-slate-800/50 px-2 rounded">
                <span className="text-white font-medium">Total BRL (1 USD = R$ {custosWhisperDetalhado?.precos?.taxaCambio || 5})</span>
                <span className="text-emerald-400 font-bold">
                  R$ {(custosWhisperDetalhado?.custoTotalBRL || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 p-2 rounded bg-slate-800/30 text-xs text-slate-400">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Transcricao de audio e gratuita para o usuario - custo absorvido na taxa de analise</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custos de Infraestrutura e Resumo */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Infraestrutura */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-400" />
              Infraestrutura
            </CardTitle>
            <CardDescription className="text-slate-400">
              Custos fixos mensais de hospedagem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {custosInfraestrutura?.servicos?.map((servico) => {
              const icons: Record<string, React.ElementType> = {
                vercel: Cloud,
                neon: Database,
                resend: Mail,
              };
              const IconComp = icons[servico.id] || Server;
              return (
                <div key={servico.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <IconComp className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{servico.nome}</p>
                      <p className="text-xs text-slate-500">{servico.descricao}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      R$ {servico.custoMensal.toFixed(2)}/mes
                    </p>
                    <p className="text-xs text-slate-500">
                      R$ {servico.custoPeriodo.toFixed(2)} ({custosInfraestrutura?.periodo}m)
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between pt-3 border-t border-slate-700">
              <span className="text-slate-400">Total Periodo ({custosInfraestrutura?.periodo} meses)</span>
              <span className="text-emerald-400 font-bold">
                R$ {(custosInfraestrutura?.custoTotalPeriodo || 0).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Resumo de Custos por Categoria */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-amber-400" />
              Custos por Categoria
            </CardTitle>
            <CardDescription className="text-slate-400">
              Distribuicao de custos por servico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Claude */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-white">Claude AI</span>
              </div>
              <span className="text-sm font-medium text-purple-400">
                R$ {(custosPorCategoria?.claude || 0).toFixed(2)}
              </span>
            </div>

            {/* Whisper */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-white">Whisper</span>
              </div>
              <span className="text-sm font-medium text-orange-400">
                R$ {(custosPorCategoria?.whisper || 0).toFixed(2)}
              </span>
            </div>

            {/* Infraestrutura */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-white">Infraestrutura</span>
              </div>
              <span className="text-sm font-medium text-blue-400">
                R$ {(custosPorCategoria?.infraestrutura || 0).toFixed(2)}
              </span>
            </div>

            {/* Separador */}
            <div className="border-t border-slate-700 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">APIs (sem infra)</span>
                <span className="text-white">
                  R$ {(custosPorCategoria?.totalSemInfraestrutura || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white font-medium">Total Geral</span>
                <span className="text-emerald-400 font-bold">
                  R$ {(custosPorCategoria?.total || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Margem Teórica Real */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-400" />
              Margem Teorica Real
            </CardTitle>
            <CardDescription className="text-slate-400">
              Considerando todos os custos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Receita Total</span>
                <span className="text-emerald-400 font-medium">
                  R$ {(margemTeorica?.receitaTotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">(-) Custo APIs</span>
                <span className="text-red-400">
                  -R$ {(margemTeorica?.custoAPIs || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">(-) Infraestrutura</span>
                <span className="text-red-400">
                  -R$ {(margemTeorica?.custoInfraestrutura || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">(=) Custo Total Real</span>
                <span className="text-amber-400 font-medium">
                  R$ {(margemTeorica?.custoTotalReal || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Lucro e Margem */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-3">
              <div className="flex justify-between">
                <span className="text-emerald-300">Lucro Real</span>
                <span className="text-2xl font-bold text-emerald-400">
                  R$ {(margemTeorica?.lucroReal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Margem Real</span>
                <Badge
                  className={`text-lg px-3 py-1 ${
                    (margemTeorica?.margemReal || 0) >= 60
                      ? "bg-emerald-500/20 text-emerald-400"
                      : (margemTeorica?.margemReal || 0) >= 40
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-red-500/20 text-red-400"
                  } border-0`}
                >
                  {(margemTeorica?.margemReal || 0).toFixed(1)}%
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 p-2 rounded bg-slate-800/30 text-xs text-slate-400">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Esta margem considera todos os custos reais incluindo infraestrutura fixa</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Margem por Operação & Top Custos */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Margem por Operação */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Margem por Operação</CardTitle>
            <CardDescription className="text-slate-400">
              Rentabilidade por tipo de serviço
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {margemPorOperacao.map((op) => {
                const info = tipoLabels[op.operacao] || { label: op.operacao, icon: Activity };
                const Icon = info.icon;
                return (
                  <div key={op.operacao} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-white">{info.label}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">{op.volume} ops</span>
                        <Badge
                          className={`${
                            op.margem >= 60
                              ? "bg-emerald-500/20 text-emerald-400"
                              : op.margem >= 40
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-red-500/20 text-red-400"
                          } border-0`}
                        >
                          {op.margem.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={op.margem}
                      className="h-2 bg-slate-700"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Custo: R$ {op.custoMedio.toFixed(2)}</span>
                      <span>Cobrado: R$ {op.valorMedio.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Usuários por Custo */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Top Custos por Usuário</CardTitle>
            <CardDescription className="text-slate-400">
              Usuários que mais geraram custos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustosUsuarios.map((usuario, index) => (
                <div
                  key={usuario.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50"
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
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Custo: R$ {usuario.custo.toFixed(2)}</span>
                      <span>•</span>
                      <span>Receita: R$ {usuario.receita.toFixed(2)}</span>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      usuario.margem >= 60
                        ? "bg-emerald-500/20 text-emerald-400"
                        : usuario.margem >= 40
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-red-500/20 text-red-400"
                    } border-0`}
                  >
                    {usuario.margem.toFixed(0)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projeção */}
      <Card className="bg-gradient-to-r from-blue-900/30 via-slate-900 to-purple-900/30 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Projeção para o Próximo Mês
          </CardTitle>
          <CardDescription className="text-slate-400">
            Baseado na tendência atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-sm text-slate-400 mb-2">Receita Projetada</p>
              <p className="text-3xl font-bold text-emerald-400">
                R$ {projecao.receitaProjetada.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-sm text-slate-400 mb-2">Custo Projetado</p>
              <p className="text-3xl font-bold text-red-400">
                R$ {projecao.custoProjetado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/50">
              <p className="text-sm text-slate-400 mb-2">Lucro Projetado</p>
              <p className="text-3xl font-bold text-blue-400">
                R$ {projecao.lucroProjetado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
