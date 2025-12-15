"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  Users,
  Briefcase,
  CreditCard,
  AlertCircle,
  MessageSquareText,
  ClipboardCheck,
  BarChart3,
  Receipt,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";
import { SkeletonStats, SkeletonCard } from "@/components/ui/skeleton-card";
import { UsageFinanceiroCard } from "@/components/dashboard/usage-financeiro-card";
import { FreeTrialUpgradeCard } from "@/components/billing/free-trial-upgrade-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DadosCustos {
  planType: string;
  usageFinanceiro?: {
    totalGasto: number;
    limiteFinanceiro: number;
    saldoRestante: number;
    percentualUsado: number;
    limiteAtingido: boolean;
    totalTransacoes: number;
    isTestAccount: boolean;
  } | null;
  faturaAtual: {
    id: string;
    mesReferencia: number;
    anoReferencia: number;
    valorTotal: number;
    valorPago: number;
    status: string;
  };
  totais: {
    totalGastoHistorico: number;
    totalPagoHistorico: number;
  };
  periodo: {
    dataInicio: string;
    dataFim: string;
    totalTransacoes: number;
    custoTotal: number;
    custoPorTipo: Record<string, number>;
  };
  medias: {
    custoPorCandidato: number;
    totalCandidatos: number;
  };
  entrevistas: {
    total: number;
    top5: Array<{
      id: string;
      titulo: string;
      custo: number;
      transacoes: number;
    }>;
  };
  evolucao: Array<{
    mes: string;
    custo: number;
    transacoes: number;
  }>;
  metricas: {
    perguntasAnalisadas: number;
    entrevistasAnalisadas: number;
  };
  graficos: {
    porDia: Array<{ data: string; total: number; analisadas: number }>;
    porSemana: Array<{ semana: string; total: number; analisadas: number }>;
    porMes: Array<{ mes: string; total: number; analisadas: number }>;
    porAno: Array<{ ano: string; total: number; analisadas: number }>;
  };
  transacoesRecentes: Array<{
    id: string;
    tipo: string;
    valorCobrado: number;
    descricao: string | null;
    status: string;
    entrevistaId: string | null;
    createdAt: string;
  }>;
}

type GraficoTipo = "dia" | "semana" | "mes" | "ano";

// Interface para avaliações agrupadas
interface AvaliacaoAgrupada {
  id: string;
  descricao: string;
  totalPerguntas: number;
  taxaBase: number;
  valorPerguntas: number;
  valorTotal: number;
  createdAt: string;
  status: string;
}

// Componente de Detalhamento de Transações
function DetalhamentoTransacoes({ transacoes }: { transacoes: DadosCustos["transacoesRecentes"] }) {
  // Agrupar transações por avaliação de candidato
  const avaliacoesAgrupadas: AvaliacaoAgrupada[] = (() => {
    if (!transacoes || transacoes.length === 0) return [];

    const avaliacoes: AvaliacaoAgrupada[] = [];
    const transacoesOrdenadas = [...transacoes].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Agrupar por entrevistaId + timestamp arredondado (janela de 5 minutos)
    const grupos: Map<string, typeof transacoesOrdenadas> = new Map();

    transacoesOrdenadas.forEach((t) => {
      if (t.tipo === "taxa_base_candidato" || t.tipo === "analise_pergunta") {
        const data = new Date(t.createdAt);
        const minutos = Math.floor(data.getMinutes() / 5) * 5;
        data.setMinutes(minutos, 0, 0);

        const entrevistaId = t.entrevistaId || "sem-entrevista";
        const chave = `${entrevistaId}_${data.toISOString()}`;

        if (!grupos.has(chave)) {
          grupos.set(chave, []);
        }
        grupos.get(chave)!.push(t);
      } else {
        const chave = t.id;
        grupos.set(chave, [t]);
      }
    });

    // Converter grupos em avaliações
    grupos.forEach((trans, chave) => {
      const taxaBaseTransacao = trans.find(t => t.tipo === "taxa_base_candidato");
      const perguntasTransacoes = trans.filter(t => t.tipo === "analise_pergunta");

      if (taxaBaseTransacao || perguntasTransacoes.length > 0) {
        const taxaBase = taxaBaseTransacao?.valorCobrado || 0;
        const valorPerguntas = perguntasTransacoes.reduce((sum, t) => sum + t.valorCobrado, 0);
        const totalPerguntas = perguntasTransacoes.length;

        const descricao = taxaBaseTransacao?.descricao || "Candidato avaliado";

        avaliacoes.push({
          id: chave,
          descricao,
          totalPerguntas,
          taxaBase,
          valorPerguntas,
          valorTotal: taxaBase + valorPerguntas,
          createdAt: taxaBaseTransacao?.createdAt || perguntasTransacoes[0]?.createdAt || "",
          status: taxaBaseTransacao?.status || perguntasTransacoes[0]?.status || "concluida",
        });
      } else {
        trans.forEach((t) => {
          const tipoLabels: Record<string, string> = {
            taxa_base_candidato: "Taxa Base por Candidato",
            analise_pergunta: "Análise por Pergunta",
            transcricao_audio: "Transcrição de Áudio",
            analise_ia: "Análise de IA",
            pergunta_criada: "Criação de Pergunta",
            entrevista_criada: "Criação de Entrevista",
          };

          avaliacoes.push({
            id: t.id,
            descricao: t.descricao || tipoLabels[t.tipo] || t.tipo,
            totalPerguntas: 0,
            taxaBase: t.valorCobrado,
            valorPerguntas: 0,
            valorTotal: t.valorCobrado,
            createdAt: t.createdAt,
            status: t.status,
          });
        });
      }
    });

    return avaliacoes.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  })();

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluida":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 text-xs">
            Concluída
          </Badge>
        );
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 text-xs">
            Pendente
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  if (avaliacoesAgrupadas.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalhamento ({avaliacoesAgrupadas.length})</CardTitle>
        <CardDescription>Histórico de cobranças por avaliação</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {avaliacoesAgrupadas.map((avaliacao) => (
            <div
              key={avaliacao.id}
              className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`p-2 rounded-lg mt-0.5 ${
                  avaliacao.totalPerguntas > 0
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {avaliacao.totalPerguntas > 0 ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    <Receipt className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">
                      {avaliacao.totalPerguntas > 0 ? "Candidato avaliado" : avaliacao.descricao}
                    </p>
                    {getStatusBadge(avaliacao.status)}
                  </div>

                  {avaliacao.totalPerguntas > 0 ? (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {avaliacao.totalPerguntas} {avaliacao.totalPerguntas === 1 ? "pergunta" : "perguntas"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {formatCurrency(avaliacao.taxaBase)} + {formatCurrency(avaliacao.valorPerguntas)} = {formatCurrency(avaliacao.valorTotal)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      {avaliacao.descricao}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDateTime(avaliacao.createdAt)}
                  </p>
                </div>
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="text-lg font-semibold">{formatCurrency(avaliacao.valorTotal)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustosPage() {
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState("mes");
  const [dados, setDados] = useState<DadosCustos | null>(null);
  const [graficoTipo, setGraficoTipo] = useState<GraficoTipo>("mes");

  const fetchDados = async () => {
    try {
      setLoading(true);
      

      const response = await fetch(`/api/custos?periodo=${periodo}`, {
        });

      if (response.ok) {
        const data = await response.json();
        setDados(data);
      }
    } catch (error) {
      console.error("Erro ao carregar custos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, [periodo]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Gerenciamento de Custos"
          description="Acompanhe seus gastos e otimize seus investimentos"
        />
        <SkeletonStats count={4} />
        <div className="grid gap-6 lg:grid-cols-2">
          <SkeletonCard lines={5} />
          <SkeletonCard lines={5} />
        </div>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">Erro ao carregar dados</p>
      </div>
    );
  }

  // Layout para Free Trial
  if (dados.planType === "free_trial" && dados.usageFinanceiro) {
    const usage = dados.usageFinanceiro;

    return (
      <div className="space-y-6">
        <PageHeader
          title="Uso e Saldo"
          description="Acompanhe o uso do seu crédito gratuito"
        />

        {/* Card de Uso Financeiro */}
        <UsageFinanceiroCard
          totalGasto={usage.totalGasto}
          limiteFinanceiro={usage.limiteFinanceiro}
          saldoRestante={usage.saldoRestante}
          percentualUsado={usage.percentualUsado}
          limiteAtingido={usage.limiteAtingido}
          totalTransacoes={usage.totalTransacoes}
        />

        {/* Card de Upgrade */}
        <FreeTrialUpgradeCard />

        {/* Histórico Recente - mini versão */}
        {dados.evolucao.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Uso</CardTitle>
              <CardDescription>
                Acompanhe como você tem utilizado seus créditos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dados.evolucao.slice(0, 3).map((item) => {
                  const [ano, mes] = item.mes.split("-");
                  const mesNome = new Date(parseInt(ano), parseInt(mes) - 1).toLocaleDateString(
                    "pt-BR",
                    { month: "short", year: "numeric" }
                  );

                  return (
                    <div key={item.mes} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium capitalize">{mesNome}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            R$ {item.custo.toFixed(2)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.transacoes} {item.transacoes === 1 ? "transação" : "transações"}
                          </Badge>
                        </div>
                      </div>
                      <Progress
                        value={(item.custo / usage.limiteFinanceiro) * 100}
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detalhamento de Transações */}
        {dados.transacoesRecentes && dados.transacoesRecentes.length > 0 && (
          <DetalhamentoTransacoes transacoes={dados.transacoesRecentes} />
        )}
      </div>
    );
  }

  // Layout para Planos Pagos
  const { faturaAtual, periodo: periodoData, medias, entrevistas, evolucao, metricas, graficos } = dados;
  const saldoAPagar = faturaAtual.valorTotal - faturaAtual.valorPago;
  const mesNome = new Date(faturaAtual.anoReferencia, faturaAtual.mesReferencia - 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const alertaFatura = faturaAtual.status === "fechada" || faturaAtual.status === "vencida";

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Gerenciamento de Custos"
        description="Acompanhe seus gastos e otimize seus investimentos"
      >
        <Link href="/fatura">
          <Button size="touch" className="w-full sm:w-auto">
            <CreditCard className="h-4 w-4" />
            Ver Fatura Completa
          </Button>
        </Link>
      </PageHeader>

      {/* Alerta de Fatura */}
      {alertaFatura && saldoAPagar > 0 && (
        <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-orange-600 shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-orange-900 dark:text-orange-100">
                Fatura {faturaAtual.status === "vencida" ? "Vencida" : "Fechada"}
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-200">
                Você tem R$ {saldoAPagar.toFixed(2)} a pagar referente a {mesNome}.
                {faturaAtual.status === "vencida" && " A fatura está vencida!"}
              </p>
            </div>
            <Button variant="outline" className="border-orange-600 text-orange-600 w-full sm:w-auto" size="touch">
              Pagar Agora
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filtros de Período - scroll horizontal no mobile */}
      <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <Tabs value={periodo} onValueChange={setPeriodo}>
          <TabsList className="inline-flex w-auto sm:w-full sm:grid sm:grid-cols-4 h-11 sm:h-10">
            <TabsTrigger value="mes" className="whitespace-nowrap px-4 text-xs sm:text-sm">Último Mês</TabsTrigger>
            <TabsTrigger value="trimestre" className="whitespace-nowrap px-4 text-xs sm:text-sm">Trimestre</TabsTrigger>
            <TabsTrigger value="ano" className="whitespace-nowrap px-4 text-xs sm:text-sm">Ano</TabsTrigger>
            <TabsTrigger value="total" className="whitespace-nowrap px-4 text-xs sm:text-sm">Total</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Cards de Resumo - scroll horizontal no mobile */}
      <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {/* Fatura Atual */}
          <Card className="border-2 border-blue-200 dark:border-blue-800 min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fatura Atual</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                R$ {faturaAtual.valorTotal.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {mesNome}
              </p>
              <Badge variant={faturaAtual.status === "aberta" ? "default" : "secondary"} className="mt-2">
                {faturaAtual.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Gasto no Período */}
          <Card className="min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gasto no Período</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">
                R$ {periodoData.custoTotal.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {periodoData.totalTransacoes} transações
              </p>
            </CardContent>
          </Card>

          {/* Custo Médio por Candidato */}
          <Card className="min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo/Candidato</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">
                R$ {medias.custoPorCandidato.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {medias.totalCandidatos} candidatos avaliados
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cards de Métricas de Análise */}
      <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {/* Perguntas Analisadas */}
          <Card className="border-2 border-green-200 dark:border-green-800 min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perguntas Analisadas</CardTitle>
              <MessageSquareText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {metricas?.perguntasAnalisadas || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                no período selecionado
              </p>
            </CardContent>
          </Card>

          {/* Entrevistas Analisadas */}
          <Card className="border-2 border-purple-200 dark:border-purple-800 min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entrevistas Analisadas</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                {metricas?.entrevistasAnalisadas || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                candidatos avaliados com IA
              </p>
            </CardContent>
          </Card>

          {/* Média de Custo por Vaga */}
          <Card className="min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo/Vaga</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">
                R$ {entrevistas.total > 0 ? (periodoData.custoTotal / entrevistas.total).toFixed(2) : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {entrevistas.total} {entrevistas.total === 1 ? "vaga" : "vagas"} no período
              </p>
            </CardContent>
          </Card>

          {/* Custo por Análise */}
          <Card className="min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo/Análise</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">
                R$ {(metricas?.entrevistasAnalisadas || 0) > 0
                  ? (periodoData.custoTotal / metricas.entrevistasAnalisadas).toFixed(2)
                  : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                média por entrevista analisada
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gráfico de Entrevistas por Período */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Entrevistas por Período
              </CardTitle>
              <CardDescription>
                Total de entrevistas e quantas foram analisadas com IA
              </CardDescription>
            </div>
            <Tabs value={graficoTipo} onValueChange={(v) => setGraficoTipo(v as GraficoTipo)}>
              <TabsList className="h-9">
                <TabsTrigger value="dia" className="text-xs px-3">Dia</TabsTrigger>
                <TabsTrigger value="semana" className="text-xs px-3">Semana</TabsTrigger>
                <TabsTrigger value="mes" className="text-xs px-3">Mês</TabsTrigger>
                <TabsTrigger value="ano" className="text-xs px-3">Ano</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {(() => {
            const dadosGrafico = (() => {
              switch (graficoTipo) {
                case "dia":
                  return (graficos?.porDia || []).map((item) => ({
                    label: new Date(item.data + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
                    total: item.total,
                    analisadas: item.analisadas,
                    pendentes: item.total - item.analisadas,
                  }));
                case "semana":
                  return (graficos?.porSemana || []).map((item) => {
                    const [ano, semana] = item.semana.split("-");
                    return {
                      label: `Semana ${semana}`,
                      total: item.total,
                      analisadas: item.analisadas,
                      pendentes: item.total - item.analisadas,
                    };
                  });
                case "mes":
                  return (graficos?.porMes || []).map((item) => {
                    const [ano, mes] = item.mes.split("-");
                    const data = new Date(parseInt(ano), parseInt(mes) - 1);
                    return {
                      label: data.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
                      total: item.total,
                      analisadas: item.analisadas,
                      pendentes: item.total - item.analisadas,
                    };
                  });
                case "ano":
                  return (graficos?.porAno || []).map((item) => ({
                    label: item.ano,
                    total: item.total,
                    analisadas: item.analisadas,
                    pendentes: item.total - item.analisadas,
                  }));
                default:
                  return [];
              }
            })();

            if (dadosGrafico.length === 0) {
              return (
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Sem dados para o período selecionado</p>
                </div>
              );
            }

            // Calcula totais para exibir resumo
            const totalEntrevistas = dadosGrafico.reduce((acc, d) => acc + d.total, 0);
            const totalAnalisadas = dadosGrafico.reduce((acc, d) => acc + d.analisadas, 0);
            const percentualAnalisado = totalEntrevistas > 0 ? Math.round((totalAnalisadas / totalEntrevistas) * 100) : 0;

            return (
              <div className="space-y-4">
                {/* Resumo do período */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                    <span className="text-muted-foreground">Analisadas: <span className="font-semibold text-foreground">{totalAnalisadas}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-slate-300" />
                    <span className="text-muted-foreground">Pendentes: <span className="font-semibold text-foreground">{totalEntrevistas - totalAnalisadas}</span></span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-muted-foreground">Taxa de análise: <span className="font-semibold text-emerald-600">{percentualAnalisado}%</span></span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={dadosGrafico} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/50" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600, marginBottom: 4 }}
                      formatter={(value: number, name: string, props) => {
                        const total = props.payload.total;
                        if (name === "Analisadas") {
                          const percent = total > 0 ? Math.round((value / total) * 100) : 0;
                          return [`${value} (${percent}%)`, name];
                        }
                        return [value, name];
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      iconType="square"
                      iconSize={10}
                    />
                    <Bar
                      dataKey="analisadas"
                      name="Analisadas"
                      stackId="a"
                      fill="#10b981"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="pendentes"
                      name="Pendentes"
                      stackId="a"
                      fill="#cbd5e1"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top 5 Entrevistas Mais Caras */}
        <Card>
          <CardHeader>
            <CardTitle>Entrevistas Mais Caras</CardTitle>
            <CardDescription>
              Top 5 vagas que mais geraram custos no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            {entrevistas.top5.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma entrevista com custos no período</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entrevistas.top5.map((ent, index) => (
                  <div
                    key={ent.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-yellow-950"
                            : index === 1
                            ? "bg-gray-400 text-gray-950"
                            : index === 2
                            ? "bg-orange-600 text-orange-50"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{ent.titulo || "Sem título"}</p>
                        <p className="text-xs text-muted-foreground">
                          {ent.transacoes} transações
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      R$ {ent.custo.toFixed(2)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Gastos</CardTitle>
            <CardDescription>
              Histórico dos últimos meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {evolucao.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Sem dados históricos ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {evolucao.map((item) => {
                  const [ano, mes] = item.mes.split("-");
                  const mesNome = new Date(parseInt(ano), parseInt(mes) - 1).toLocaleDateString(
                    "pt-BR",
                    { month: "short", year: "numeric" }
                  );

                  return (
                    <div key={item.mes} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium capitalize">{mesNome}</span>
                        <span className="text-muted-foreground">
                          R$ {item.custo.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={(item.custo / Math.max(...evolucao.map((e) => e.custo))) * 100}
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Breakdown de Custos por Tipo */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Custos</CardTitle>
          <CardDescription>
            Custos separados por tipo de operação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(periodoData.custoPorTipo || {}).map(([tipo, valor]) => {
              const tipoLabels: Record<string, { label: string; icon: React.ElementType }> = {
                taxa_base_candidato: { label: "Taxa Base (Candidatos)", icon: Users },
                analise_pergunta: { label: "Análise por Pergunta", icon: TrendingUp },
                transcricao_audio: { label: "Transcrição de Áudio", icon: Users },
                analise_ia: { label: "Análise com IA", icon: TrendingUp },
                pergunta_criada: { label: "Perguntas Criadas", icon: Briefcase },
                entrevista_criada: { label: "Entrevistas Criadas", icon: Briefcase },
              };

              const info = tipoLabels[tipo] || { label: tipo, icon: DollarSign };
              const Icon = info.icon;

              return (
                <div
                  key={tipo}
                  className="p-4 rounded-lg border bg-linear-to-br from-muted/50 to-muted/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{info.label}</p>
                  </div>
                  <p className="text-2xl font-bold">R$ {Number(valor).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
