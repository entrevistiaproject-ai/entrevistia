"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/ui/page-header";
import { SkeletonStats, SkeletonCard } from "@/components/ui/skeleton-card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Ban,
  FileText,
  Loader2,
  Receipt,
  CreditCard,
  Download,
  MessageSquare,
  Users,
  ClipboardList,
  DollarSign,
  ChevronRight,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SupportWidget } from "@/components/support/support-widget";

interface Fatura {
  id: string;
  periodo: string;
  mesReferencia: number;
  anoReferencia: number;
  valorTotal: number;
  valorPago: number;
  valorPendente: number;
  status: string;
  dataAbertura: string | null;
  dataVencimento: string | null;
  dataPagamento: string | null;
  estatisticas: {
    entrevistas: number;
    candidatos: number;
    respostas: number;
    transacoes: number;
  };
  createdAt: string;
}

interface FaturaDetalhe extends Fatura {
  dataFechamento: string | null;
  metodoPagamento: string | null;
  updatedAt: string;
  transacoes: Array<{
    id: string;
    tipo: string;
    custoBase: number;
    markup: number;
    valorCobrado: number;
    descricao: string | null;
    status: string;
    metadados: Record<string, unknown> | null;
    entrevistaId: string | null;
    createdAt: string;
  }>;
}

interface Totais {
  totalFaturas: number;
  valorTotal: number;
  valorPago: number;
  valorPendente: number;
  faturasPagas: number;
  faturasAbertas: number;
  faturasVencidas: number;
}

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

export default function FaturaPage() {
  const [loading, setLoading] = useState(true);
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [totais, setTotais] = useState<Totais | null>(null);
  const [selectedFatura, setSelectedFatura] = useState<FaturaDetalhe | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetchFaturas();
  }, []);

  const fetchFaturas = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/faturas");
      if (response.ok) {
        const data = await response.json();
        setFaturas(data.faturas);
        setTotais(data.totais);

        // Se houver faturas, carregar a primeira (mais recente)
        if (data.faturas.length > 0) {
          fetchFaturaDetails(data.faturas[0].id);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar faturas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaturaDetails = async (faturaId: string) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(`/api/faturas/${faturaId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedFatura(data.fatura);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const getStatusBadge = (status: string, size: "sm" | "lg" = "sm") => {
    const sizeClasses = size === "lg" ? "text-sm px-3 py-1.5" : "";

    switch (status) {
      case "paga":
        return (
          <Badge className={cn("bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700", sizeClasses)}>
            <CheckCircle className="h-3 w-3 mr-1" />
            Paga
          </Badge>
        );
      case "aberta":
        return (
          <Badge className={cn("bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-700", sizeClasses)}>
            <Clock className="h-3 w-3 mr-1" />
            Aberta
          </Badge>
        );
      case "fechada":
        return (
          <Badge className={cn("bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-700", sizeClasses)}>
            <FileText className="h-3 w-3 mr-1" />
            Fechada
          </Badge>
        );
      case "vencida":
        return (
          <Badge className={cn("bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-700", sizeClasses)}>
            <AlertCircle className="h-3 w-3 mr-1" />
            Vencida
          </Badge>
        );
      case "cancelada":
        return (
          <Badge className={cn("bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-600", sizeClasses)}>
            <Ban className="h-3 w-3 mr-1" />
            Cancelada
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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

  const getMesNome = (mes: number, ano: number) => {
    return new Date(ano, mes - 1).toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  const getTransacaoStatusBadge = (status: string) => {
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
      case "falha":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
            Falha
          </Badge>
        );
      case "reembolsada":
        return (
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs">
            Reembolsada
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  // Agrupar transações por avaliação de candidato
  // Cada avaliação consiste em: taxa_base_candidato + N * analise_pergunta
  // Agrupa por entrevistaId + intervalo de tempo (mesma análise = dentro de 5 minutos)
  const avaliacoesAgrupadas: AvaliacaoAgrupada[] = (() => {
    if (!selectedFatura?.transacoes) return [];

    const avaliacoes: AvaliacaoAgrupada[] = [];
    const transacoesOrdenadas = [...selectedFatura.transacoes].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Agrupar por entrevistaId + timestamp arredondado (janela de 5 minutos)
    // Isso garante que taxa_base e analise_pergunta da mesma análise sejam agrupadas
    const grupos: Map<string, typeof transacoesOrdenadas> = new Map();

    transacoesOrdenadas.forEach((t) => {
      // Para transações de análise (taxa_base ou analise_pergunta), agrupa por timestamp
      // arredondado para 5 minutos, pois todas as transações de uma análise ocorrem juntas
      if (t.tipo === "taxa_base_candidato" || t.tipo === "analise_pergunta") {
        const data = new Date(t.createdAt);
        // Arredonda para janela de 5 minutos
        const minutos = Math.floor(data.getMinutes() / 5) * 5;
        data.setMinutes(minutos, 0, 0);

        // Chave: entrevistaId (campo direto da transação) + timestamp arredondado
        const entrevistaId = t.entrevistaId || "sem-entrevista";
        const chave = `${entrevistaId}_${data.toISOString()}`;

        if (!grupos.has(chave)) {
          grupos.set(chave, []);
        }
        grupos.get(chave)!.push(t);
      } else {
        // Outras transações ficam individuais
        const chave = t.id;
        grupos.set(chave, [t]);
      }
    });

    // Converter grupos em avaliações
    grupos.forEach((transacoes, chave) => {
      const taxaBaseTransacao = transacoes.find(t => t.tipo === "taxa_base_candidato");
      const perguntasTransacoes = transacoes.filter(t => t.tipo === "analise_pergunta");

      // Se tem taxa base ou perguntas, é uma avaliação de candidato
      if (taxaBaseTransacao || perguntasTransacoes.length > 0) {
        const taxaBase = taxaBaseTransacao?.valorCobrado || 0;
        const valorPerguntas = perguntasTransacoes.reduce((sum, t) => sum + t.valorCobrado, 0);
        const totalPerguntas = perguntasTransacoes.length;

        // Pegar descrição do metadado ou gerar uma
        const metadados = taxaBaseTransacao?.metadados as Record<string, unknown> | null;
        const descricao = (metadados?.candidatoNome as string) ||
                          taxaBaseTransacao?.descricao ||
                          "Candidato avaliado";

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
        // Outras transações (criação de entrevista, etc.)
        transacoes.forEach((t) => {
          avaliacoes.push({
            id: t.id,
            descricao: t.descricao || getTipoLabel(t.tipo),
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

    // Ordenar por data (mais recentes primeiro)
    return avaliacoes.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  })();

  // Helper para labels de tipo
  const getTipoLabel = (tipo: string): string => {
    const labels: Record<string, string> = {
      taxa_base_candidato: "Taxa Base por Candidato",
      analise_pergunta: "Análise por Pergunta",
      transcricao_audio: "Transcrição de Áudio",
      analise_ia: "Análise de IA",
      pergunta_criada: "Criação de Pergunta",
      entrevista_criada: "Criação de Entrevista",
    };
    return labels[tipo] || tipo;
  };

  // Totais para o resumo
  const totalAvaliacoes = avaliacoesAgrupadas.filter(a => a.totalPerguntas > 0).length;
  const totalTaxaBase = avaliacoesAgrupadas.reduce((sum, a) => sum + (a.totalPerguntas > 0 ? a.taxaBase : 0), 0);
  const totalPerguntas = avaliacoesAgrupadas.reduce((sum, a) => sum + a.totalPerguntas, 0);
  const totalValorPerguntas = avaliacoesAgrupadas.reduce((sum, a) => sum + a.valorPerguntas, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Minha Fatura"
          description="Visualize os detalhes da sua fatura atual"
        />
        <SkeletonStats count={4} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SkeletonCard lines={8} />
          </div>
          <SkeletonCard lines={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Minha Fatura"
        description="Visualize os detalhes da sua fatura e histórico de cobranças"
      >
        <Link href="/custos">
          <Button variant="outline" size="touch" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Custos
          </Button>
        </Link>
      </PageHeader>

      {/* Cards de Resumo */}
      {totais && (
        <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            <Card className="min-w-[160px] sm:min-w-0 shrink-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totais.valorTotal)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  em {totais.totalFaturas} {totais.totalFaturas === 1 ? "fatura" : "faturas"}
                </p>
              </CardContent>
            </Card>

            <Card className="min-w-[160px] sm:min-w-0 shrink-0 border-emerald-200 dark:border-emerald-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totais.valorPago)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totais.faturasPagas} {totais.faturasPagas === 1 ? "fatura paga" : "faturas pagas"}
                </p>
              </CardContent>
            </Card>

            <Card className={cn("min-w-[160px] sm:min-w-0 shrink-0", totais.valorPendente > 0 && "border-amber-200 dark:border-amber-800")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendente</CardTitle>
                <Clock className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", totais.valorPendente > 0 ? "text-amber-600" : "text-muted-foreground")}>
                  {formatCurrency(totais.valorPendente)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totais.faturasAbertas} {totais.faturasAbertas === 1 ? "fatura aberta" : "faturas abertas"}
                </p>
              </CardContent>
            </Card>

            {totais.faturasVencidas > 0 && (
              <Card className="min-w-[160px] sm:min-w-0 shrink-0 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-700 dark:text-red-400">Vencidas</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{totais.faturasVencidas}</div>
                  <p className="text-xs text-red-600/70 mt-1">
                    Requer atenção imediata
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Detalhes da Fatura Selecionada */}
        <div className="lg:col-span-2 space-y-6">
          {detailsLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </CardContent>
            </Card>
          ) : selectedFatura ? (
            <>
              {/* Card Principal da Fatura */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Receipt className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Fatura de {getMesNome(selectedFatura.mesReferencia, selectedFatura.anoReferencia)}
                        </CardTitle>
                        <CardDescription>
                          Período: {selectedFatura.periodo}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedFatura.status, "lg")}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Valores */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Valor Total</p>
                      <p className="text-2xl font-bold">{formatCurrency(selectedFatura.valorTotal)}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">Valor Pago</p>
                      <p className="text-2xl font-bold text-emerald-600">{formatCurrency(selectedFatura.valorPago)}</p>
                    </div>
                    <div className={cn("p-4 rounded-lg", selectedFatura.valorPendente > 0 ? "bg-amber-50 dark:bg-amber-950" : "bg-muted/50")}>
                      <p className={cn("text-sm", selectedFatura.valorPendente > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground")}>Pendente</p>
                      <p className={cn("text-2xl font-bold", selectedFatura.valorPendente > 0 ? "text-amber-600" : "text-muted-foreground")}>
                        {formatCurrency(selectedFatura.valorPendente)}
                      </p>
                    </div>
                  </div>

                  {/* Progresso de Pagamento */}
                  {selectedFatura.valorTotal > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progresso de Pagamento</span>
                        <span className="font-medium">
                          {Math.round((selectedFatura.valorPago / selectedFatura.valorTotal) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(selectedFatura.valorPago / selectedFatura.valorTotal) * 100}
                        className="h-2"
                      />
                    </div>
                  )}

                  {/* Estatísticas */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-2xl font-bold">{selectedFatura.estatisticas.entrevistas}</p>
                      <p className="text-xs text-muted-foreground">Entrevistas</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-2xl font-bold">{selectedFatura.estatisticas.candidatos}</p>
                      <p className="text-xs text-muted-foreground">Candidatos</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-2xl font-bold">{selectedFatura.estatisticas.respostas}</p>
                      <p className="text-xs text-muted-foreground">Respostas</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-2xl font-bold">{selectedFatura.estatisticas.transacoes}</p>
                      <p className="text-xs text-muted-foreground">Transações</p>
                    </div>
                  </div>

                  {/* Datas */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Abertura
                        </span>
                        <span className="text-sm font-medium">{formatDate(selectedFatura.dataAbertura)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Vencimento
                        </span>
                        <span className={cn("text-sm font-medium", selectedFatura.status === "vencida" && "text-red-600")}>
                          {formatDate(selectedFatura.dataVencimento)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Fechamento
                        </span>
                        <span className="text-sm font-medium">{formatDate(selectedFatura.dataFechamento)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Pagamento
                        </span>
                        <span className={cn("text-sm font-medium", selectedFatura.dataPagamento && "text-emerald-600")}>
                          {formatDate(selectedFatura.dataPagamento)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botão de Pagamento */}
                  {selectedFatura.valorPendente > 0 && selectedFatura.status !== "cancelada" && (
                    <div className="pt-4 border-t">
                      <Button className="w-full sm:w-auto" size="lg">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pagar {formatCurrency(selectedFatura.valorPendente)}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Resumo de Cobranças */}
              {totalAvaliacoes > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo de Cobranças</CardTitle>
                    <CardDescription>
                      Detalhamento dos custos por avaliação de candidatos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Cards de resumo */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-blue-600" />
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Candidatos Avaliados</p>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">{totalAvaliacoes}</p>
                          <p className="text-xs text-blue-600/70 mt-1">
                            {formatCurrency(totalTaxaBase)} em taxas base
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                          <div className="flex items-center gap-2 mb-1">
                            <ClipboardList className="h-4 w-4 text-purple-600" />
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-400">Perguntas Analisadas</p>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">{totalPerguntas}</p>
                          <p className="text-xs text-purple-600/70 mt-1">
                            {formatCurrency(totalValorPerguntas)} em análises
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Custo Médio</p>
                          </div>
                          <p className="text-2xl font-bold text-emerald-600">
                            {totalAvaliacoes > 0 ? formatCurrency((totalTaxaBase + totalValorPerguntas) / totalAvaliacoes) : formatCurrency(0)}
                          </p>
                          <p className="text-xs text-emerald-600/70 mt-1">
                            por candidato
                          </p>
                        </div>
                      </div>

                      {/* Explicação de preços */}
                      <div className="p-3 rounded-lg bg-muted/30 border">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Como funciona:</span> Cada avaliação custa R$ 1,00 (taxa base) + R$ 0,25 por pergunta analisada.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lista de Avaliações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detalhamento ({avaliacoesAgrupadas.length})</CardTitle>
                  <CardDescription>Histórico de cobranças por avaliação</CardDescription>
                </CardHeader>
                <CardContent>
                  {avaliacoesAgrupadas.length === 0 ? (
                    <div className="text-center py-8">
                      <Receipt className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">Nenhuma cobrança registrada</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {avaliacoesAgrupadas.map((avaliacao) => (
                        <div
                          key={avaliacao.id}
                          className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={cn(
                              "p-2 rounded-lg mt-0.5",
                              avaliacao.totalPerguntas > 0
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-600"
                                : "bg-muted text-muted-foreground"
                            )}>
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
                                {getTransacaoStatusBadge(avaliacao.status)}
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
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Receipt className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Nenhuma fatura encontrada</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Suas faturas aparecerão aqui quando houver cobranças
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Histórico de Faturas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico de Faturas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {faturas.length === 0 ? (
                <div className="text-center py-6">
                  <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Nenhuma fatura ainda</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {faturas.map((fatura) => (
                    <button
                      key={fatura.id}
                      onClick={() => fetchFaturaDetails(fatura.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left cursor-pointer",
                        selectedFatura?.id === fatura.id
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted/30 hover:bg-muted/50"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium capitalize">
                            {getMesNome(fatura.mesReferencia, fatura.anoReferencia)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(fatura.status)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-sm font-semibold">{formatCurrency(fatura.valorTotal)}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card de Ajuda */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Precisa de ajuda?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Se tiver dúvidas sobre sua fatura ou precisar de suporte, entre em contato conosco.
              </p>
              <SupportWidget
                origem="pagina_fatura"
                categoriaInicial="faturamento"
                tituloInicial={selectedFatura ? `Dúvida sobre fatura de ${getMesNome(selectedFatura.mesReferencia, selectedFatura.anoReferencia)}` : "Dúvida sobre faturamento"}
                descricaoInicial={selectedFatura ? `Tenho uma dúvida sobre minha fatura de ${getMesNome(selectedFatura.mesReferencia, selectedFatura.anoReferencia)}.\n\nValor: ${formatCurrency(selectedFatura.valorTotal)}\nStatus: ${selectedFatura.status}\n\nMinha dúvida: ` : "Tenho uma dúvida sobre minha fatura.\n\nMinha dúvida: "}
                variant="outline"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
