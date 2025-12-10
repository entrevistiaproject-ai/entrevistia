"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  RefreshCw,
  FileText,
  Building2,
  Loader2,
  ChevronsUpDown,
  TrendingUp,
  Receipt,
  CreditCard,
  Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Fatura {
  id: string;
  userId: string;
  usuario: {
    nome: string | null;
    email: string | null;
    empresa: string | null;
    planType: string | null;
  };
  periodo: string;
  mesReferencia: number;
  anoReferencia: number;
  valorTotal: number;
  valorPago: number;
  valorPendente: number;
  status: string;
  dataAbertura: string | null;
  dataFechamento: string | null;
  dataVencimento: string | null;
  dataPagamento: string | null;
  estatisticas: {
    entrevistas: number;
    candidatos: number;
    respostas: number;
    transacoes: number;
  };
  metodoPagamento: string | null;
  paymentId: string | null;
  createdAt: string;
}

interface FaturaDetalhe extends Fatura {
  paymentData: unknown;
  updatedAt: string;
  transacoes: Array<{
    id: string;
    tipo: string;
    custoBase: number;
    markup: number;
    valorCobrado: number;
    descricao: string | null;
    status: string;
    metadados: unknown;
    createdAt: string;
  }>;
}

interface Estatisticas {
  geral: {
    totalFaturas: number;
    valorTotalEmitido: number;
    valorTotalPago: number;
    valorPendente: number;
    faturasAbertas: number;
    faturasPagas: number;
    faturasVencidas: number;
    faturasCanceladas: number;
  };
  mesAtual: {
    periodo: string;
    totalFaturas: number;
    valorTotal: number;
    valorPago: number;
    faturasAbertas: number;
    faturasPagas: number;
    faturasVencidas: number;
  };
}

type SortField = "periodo" | "valorTotal" | "status" | "dataVencimento";
type SortDirection = "asc" | "desc";

export default function FaturasPage() {
  const [loading, setLoading] = useState(true);
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todas");
  const [filtroMes, setFiltroMes] = useState<string>("todos");
  const [filtroAno, setFiltroAno] = useState<string>("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [sortField, setSortField] = useState<SortField>("periodo");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedFatura, setSelectedFatura] = useState<FaturaDetalhe | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const itensPorPagina = 20;

  useEffect(() => {
    fetchFaturas();
  }, [filtroStatus, filtroMes, filtroAno, paginaAtual]);

  const fetchFaturas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", paginaAtual.toString());
      params.append("limit", itensPorPagina.toString());

      if (filtroStatus !== "todas") {
        params.append("status", filtroStatus);
      }
      if (filtroMes !== "todos") {
        params.append("mes", filtroMes);
      }
      if (filtroAno !== "todos") {
        params.append("ano", filtroAno);
      }

      const response = await fetch(`/api/admin/faturas?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setFaturas(data.faturas);
        setEstatisticas(data.estatisticas);
        setTotalPaginas(data.pagination.totalPages);
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
      const response = await fetch(`/api/admin/faturas/${faturaId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedFatura(data.fatura);
        setDetailsOpen(true);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Filtragem local por busca
  const faturasFiltradas = useMemo(() => {
    let filtered = [...faturas];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.usuario.nome?.toLowerCase().includes(searchLower) ||
          f.usuario.email?.toLowerCase().includes(searchLower) ||
          f.usuario.empresa?.toLowerCase().includes(searchLower) ||
          f.periodo.includes(search)
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      switch (sortField) {
        case "valorTotal":
          valueA = a.valorTotal;
          valueB = b.valorTotal;
          break;
        case "status":
          valueA = a.status;
          valueB = b.status;
          break;
        case "dataVencimento":
          valueA = a.dataVencimento ? new Date(a.dataVencimento).getTime() : 0;
          valueB = b.dataVencimento ? new Date(b.dataVencimento).getTime() : 0;
          break;
        case "periodo":
        default:
          valueA = a.anoReferencia * 100 + a.mesReferencia;
          valueB = b.anoReferencia * 100 + b.mesReferencia;
          break;
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [faturas, search, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paga":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paga
          </Badge>
        );
      case "aberta":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Aberta
          </Badge>
        );
      case "fechada":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <FileText className="h-3 w-3 mr-1" />
            Fechada
          </Badge>
        );
      case "vencida":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertCircle className="h-3 w-3 mr-1" />
            Vencida
          </Badge>
        );
      case "cancelada":
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            <Ban className="h-3 w-3 mr-1" />
            Cancelada
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            {status}
          </Badge>
        );
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const meses = [
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  const currentYear = new Date().getFullYear();
  const anos = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  if (loading && faturas.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando faturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciamento de Faturas</h1>
          <p className="text-slate-400">
            {estatisticas?.geral.totalFaturas || 0} faturas no total
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={fetchFaturas} variant="outline" className="border-slate-700">
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* KPIs */}
      {estatisticas && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Total Emitido</p>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(estatisticas.geral.valorTotalEmitido)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Total Pago</p>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(estatisticas.geral.valorTotalPago)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Valor Pendente</p>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(estatisticas.geral.valorPendente)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Faturas Vencidas</p>
                  <p className="text-lg font-semibold text-white">
                    {estatisticas.geral.faturasVencidas}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Estatísticas do Mês */}
      {estatisticas?.mesAtual && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white mb-3">
              Mês Atual ({estatisticas.mesAtual.periodo})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <p className="text-xs text-slate-400">Total Faturas</p>
                <p className="text-lg font-semibold text-white">
                  {estatisticas.mesAtual.totalFaturas}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Valor Total</p>
                <p className="text-lg font-semibold text-white">
                  {formatCurrency(estatisticas.mesAtual.valorTotal)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Valor Pago</p>
                <p className="text-lg font-semibold text-emerald-400">
                  {formatCurrency(estatisticas.mesAtual.valorPago)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Abertas</p>
                <p className="text-lg font-semibold text-blue-400">
                  {estatisticas.mesAtual.faturasAbertas}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Pagas</p>
                <p className="text-lg font-semibold text-emerald-400">
                  {estatisticas.mesAtual.faturasPagas}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Vencidas</p>
                <p className="text-lg font-semibold text-red-400">
                  {estatisticas.mesAtual.faturasVencidas}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar por nome, email, empresa ou período..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            {/* Filtro Status */}
            <Select value={filtroStatus} onValueChange={(v) => { setFiltroStatus(v); setPaginaAtual(1); }}>
              <SelectTrigger className="w-full lg:w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todas">Todos os status</SelectItem>
                <SelectItem value="aberta">Abertas</SelectItem>
                <SelectItem value="fechada">Fechadas</SelectItem>
                <SelectItem value="paga">Pagas</SelectItem>
                <SelectItem value="vencida">Vencidas</SelectItem>
                <SelectItem value="cancelada">Canceladas</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro Mês */}
            <Select value={filtroMes} onValueChange={(v) => { setFiltroMes(v); setPaginaAtual(1); }}>
              <SelectTrigger className="w-full lg:w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todos">Todos os meses</SelectItem>
                {meses.map((mes) => (
                  <SelectItem key={mes.value} value={mes.value}>
                    {mes.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro Ano */}
            <Select value={filtroAno} onValueChange={(v) => { setFiltroAno(v); setPaginaAtual(1); }}>
              <SelectTrigger className="w-full lg:w-32 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todos">Todos</SelectItem>
                {anos.map((ano) => (
                  <SelectItem key={ano} value={ano}>
                    {ano}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("periodo")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Período
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Cliente
                  </span>
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  <button
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Status
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  <button
                    onClick={() => handleSort("dataVencimento")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Vencimento
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right hidden xl:table-cell">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Transações
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("valorTotal")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white ml-auto"
                  >
                    Valor
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-center w-24">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Ações
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {faturasFiltradas.map((fatura) => (
                <tr
                  key={fatura.id}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                  onClick={() => fetchFaturaDetails(fatura.id)}
                >
                  {/* Período */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-800">
                        <Receipt className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {fatura.periodo}
                        </p>
                        <p className="text-xs text-slate-500">
                          {fatura.dataAbertura
                            ? new Date(fatura.dataAbertura).toLocaleDateString("pt-BR")
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Cliente */}
                  <td className="px-4 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {fatura.usuario.nome || "Usuário"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {fatura.usuario.email || "-"}
                      </p>
                      {fatura.usuario.empresa && (
                        <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                          <Building2 className="h-3 w-3" />
                          {fatura.usuario.empresa}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 hidden md:table-cell">
                    {getStatusBadge(fatura.status)}
                  </td>

                  {/* Vencimento */}
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-white">
                        {fatura.dataVencimento
                          ? new Date(fatura.dataVencimento).toLocaleDateString("pt-BR")
                          : "-"}
                      </span>
                    </div>
                  </td>

                  {/* Transações */}
                  <td className="px-4 py-4 text-right hidden xl:table-cell">
                    <p className="text-sm text-white">
                      {fatura.estatisticas.transacoes}
                    </p>
                  </td>

                  {/* Valor */}
                  <td className="px-4 py-4 text-right">
                    <p className="text-sm font-semibold text-white">
                      {formatCurrency(fatura.valorTotal)}
                    </p>
                    {fatura.valorPendente > 0 && fatura.status !== "paga" && (
                      <p className="text-xs text-amber-400">
                        Pendente: {formatCurrency(fatura.valorPendente)}
                      </p>
                    )}
                  </td>

                  {/* Ações */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center">
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </td>
                </tr>
              ))}

              {faturasFiltradas.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Nenhuma fatura encontrada</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">
            Página {paginaAtual} de {totalPaginas}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
              disabled={paginaAtual === 1}
              className="border-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-white px-2">
              {paginaAtual} / {totalPaginas || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas || totalPaginas === 0}
              className="border-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de Detalhes */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {detailsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : selectedFatura ? (
            <>
              <DialogHeader className="shrink-0">
                <DialogTitle className="text-white flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 shrink-0">
                    <Receipt className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p>Fatura {selectedFatura.periodo}</p>
                    <p className="text-sm font-normal text-slate-400 truncate">
                      {selectedFatura.usuario.nome} - {selectedFatura.usuario.email}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4 overflow-y-auto flex-1 pr-2">
                {/* Status e Valores */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedFatura.status)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Valor Total</p>
                    <p className="text-lg font-semibold text-white">
                      {formatCurrency(selectedFatura.valorTotal)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Valor Pago</p>
                    <p className="text-lg font-semibold text-emerald-400">
                      {formatCurrency(selectedFatura.valorPago)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Pendente</p>
                    <p className={cn(
                      "text-lg font-semibold",
                      selectedFatura.valorPendente > 0 ? "text-amber-400" : "text-slate-400"
                    )}>
                      {formatCurrency(selectedFatura.valorPendente)}
                    </p>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-xl font-semibold text-white">
                      {selectedFatura.estatisticas.entrevistas}
                    </p>
                    <p className="text-xs text-slate-400">Entrevistas</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-xl font-semibold text-white">
                      {selectedFatura.estatisticas.candidatos}
                    </p>
                    <p className="text-xs text-slate-400">Candidatos</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-xl font-semibold text-white">
                      {selectedFatura.estatisticas.respostas}
                    </p>
                    <p className="text-xs text-slate-400">Respostas</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/50 text-center">
                    <p className="text-xl font-semibold text-white">
                      {selectedFatura.estatisticas.transacoes}
                    </p>
                    <p className="text-xs text-slate-400">Transações</p>
                  </div>
                </div>

                {/* Datas e Pagamento lado a lado */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Datas</h4>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Abertura</span>
                        <span className="text-white">
                          {selectedFatura.dataAbertura
                            ? new Date(selectedFatura.dataAbertura).toLocaleDateString("pt-BR")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fechamento</span>
                        <span className="text-white">
                          {selectedFatura.dataFechamento
                            ? new Date(selectedFatura.dataFechamento).toLocaleDateString("pt-BR")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vencimento</span>
                        <span className="text-white">
                          {selectedFatura.dataVencimento
                            ? new Date(selectedFatura.dataVencimento).toLocaleDateString("pt-BR")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pagamento</span>
                        <span className="text-white">
                          {selectedFatura.dataPagamento
                            ? new Date(selectedFatura.dataPagamento).toLocaleDateString("pt-BR")
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Pagamento</h4>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Método</span>
                        <span className="text-white">
                          {selectedFatura.metodoPagamento || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-400 shrink-0">ID Transação</span>
                        <span className="text-white font-mono text-xs truncate">
                          {selectedFatura.paymentId || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transações */}
                {selectedFatura.transacoes && selectedFatura.transacoes.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">
                      Transações ({selectedFatura.transacoes.length})
                    </h4>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                      {selectedFatura.transacoes.map((transacao) => (
                        <div
                          key={transacao.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">
                              {transacao.descricao || transacao.tipo}
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(transacao.createdAt).toLocaleString("pt-BR")}
                            </p>
                          </div>
                          <div className="text-right ml-4 shrink-0">
                            <p className="text-sm font-medium text-white">
                              {formatCurrency(transacao.valorCobrado)}
                            </p>
                            <p className="text-xs text-slate-500">
                              Custo: {formatCurrency(transacao.custoBase)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
