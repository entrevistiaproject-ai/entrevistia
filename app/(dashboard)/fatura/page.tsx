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
  Hash,
  DollarSign,
  TrendingUp,
  Briefcase,
  ChevronRight,
  History,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const tipoTransacaoLabels: Record<string, string> = {
  transcricao_audio: "Transcrição de Áudio",
  analise_ia: "Análise de IA",
  analise_pergunta: "Análise por Pergunta",
  taxa_base_candidato: "Taxa Base por Candidato",
  pergunta_criada: "Criação de Pergunta",
  entrevista_criada: "Criação de Entrevista",
};

const tipoTransacaoIcons: Record<string, React.ReactNode> = {
  transcricao_audio: <MessageSquare className="h-4 w-4" />,
  analise_ia: <TrendingUp className="h-4 w-4" />,
  analise_pergunta: <ClipboardList className="h-4 w-4" />,
  taxa_base_candidato: <Users className="h-4 w-4" />,
  pergunta_criada: <FileText className="h-4 w-4" />,
  entrevista_criada: <Briefcase className="h-4 w-4" />,
};

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
          <Badge className={cn("bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30", sizeClasses)}>
            <CheckCircle className="h-3 w-3 mr-1" />
            Paga
          </Badge>
        );
      case "aberta":
        return (
          <Badge className={cn("bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30", sizeClasses)}>
            <Clock className="h-3 w-3 mr-1" />
            Aberta
          </Badge>
        );
      case "fechada":
        return (
          <Badge className={cn("bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30", sizeClasses)}>
            <FileText className="h-3 w-3 mr-1" />
            Fechada
          </Badge>
        );
      case "vencida":
        return (
          <Badge className={cn("bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30", sizeClasses)}>
            <AlertCircle className="h-3 w-3 mr-1" />
            Vencida
          </Badge>
        );
      case "cancelada":
        return (
          <Badge className={cn("bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400 border-slate-200 dark:border-slate-500/30", sizeClasses)}>
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
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs">
            Concluída
          </Badge>
        );
      case "pendente":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-xs">
            Pendente
          </Badge>
        );
      case "falha":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 text-xs">
            Falha
          </Badge>
        );
      case "reembolsada":
        return (
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 text-xs">
            Reembolsada
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  // Agrupar transações por tipo
  const transacoesPorTipo = selectedFatura?.transacoes.reduce(
    (acc, t) => {
      const tipo = t.tipo;
      if (!acc[tipo]) {
        acc[tipo] = { count: 0, total: 0 };
      }
      acc[tipo].count++;
      acc[tipo].total += t.valorCobrado;
      return acc;
    },
    {} as Record<string, { count: number; total: number }>
  );

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
              <Card className="min-w-[160px] sm:min-w-0 shrink-0 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
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
                    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">Valor Pago</p>
                      <p className="text-2xl font-bold text-emerald-600">{formatCurrency(selectedFatura.valorPago)}</p>
                    </div>
                    <div className={cn("p-4 rounded-lg", selectedFatura.valorPendente > 0 ? "bg-amber-50 dark:bg-amber-950/20" : "bg-muted/50")}>
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

              {/* Resumo por Tipo */}
              {transacoesPorTipo && Object.keys(transacoesPorTipo).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo por Tipo de Cobrança</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(transacoesPorTipo).map(([tipo, data]) => (
                        <div
                          key={tipo}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              {tipoTransacaoIcons[tipo] || <Hash className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {tipoTransacaoLabels[tipo] || tipo}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {data.count} {data.count === 1 ? "item" : "itens"}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold">{formatCurrency(data.total)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lista de Transações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transações ({selectedFatura.transacoes.length})</CardTitle>
                  <CardDescription>Detalhamento de todas as cobranças</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedFatura.transacoes.length === 0 ? (
                    <div className="text-center py-8">
                      <Receipt className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">Nenhuma transação registrada</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedFatura.transacoes.map((transacao) => (
                        <div
                          key={transacao.id}
                          className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="p-2 rounded-lg bg-background text-muted-foreground mt-0.5">
                              {tipoTransacaoIcons[transacao.tipo] || <Hash className="h-4 w-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-medium">
                                  {tipoTransacaoLabels[transacao.tipo] || transacao.tipo}
                                </p>
                                {getTransacaoStatusBadge(transacao.status)}
                              </div>
                              {transacao.descricao && (
                                <p className="text-sm text-muted-foreground mt-1 truncate">
                                  {transacao.descricao}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatDateTime(transacao.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right ml-4 shrink-0">
                            <p className="text-lg font-semibold">{formatCurrency(transacao.valorCobrado)}</p>
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
                        "w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left",
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
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Falar com Suporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
