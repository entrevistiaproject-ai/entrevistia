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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Loader2,
  ChevronsUpDown,
  Plus,
  Coins,
  FlaskConical,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Conta {
  id: string;
  nome: string;
  email: string;
  empresa: string | null;
  telefone: string | null;
  planType: string;
  planStatus: string;
  isActive: boolean;
  emailVerified: string | null;
  createdAt: string;
  gastoTotal: number;
  totalDevido: number;
  totalRecebido: number;
  gastoMesAtual: number;
  mediaGastoMensal: number;
  creditoExtra: number;
  limiteFreeTrial: number;
  limiteTotal: number;
  saldoRestante: number;
  ultimaFatura: {
    valor: number;
    status: string;
    dataVencimento: string | null;
  } | null;
  totalEntrevistas: number;
  totalCandidatos: number;
  isTeste: boolean;
  teamMemberCount: number;
}

interface ContaDetalhe extends Conta {
  faturas: Array<{
    id: string;
    mes: number;
    ano: number;
    valor: number;
    status: string;
  }>;
  transacoesRecentes: Array<{
    id: string;
    tipo: string;
    valor: number;
    data: string;
  }>;
}

type SortField = "nome" | "email" | "gastoTotal" | "createdAt" | "planType";
type SortDirection = "asc" | "desc";

export default function ContasPage() {
  const [loading, setLoading] = useState(true);
  const [contas, setContas] = useState<Conta[]>([]);
  const [search, setSearch] = useState("");
  const [filtroPlano, setFiltroPlano] = useState<string>("todos");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroPagamento, setFiltroPagamento] = useState<string>("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedConta, setSelectedConta] = useState<ContaDetalhe | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Modal de créditos
  const [creditosModalOpen, setCreditosModalOpen] = useState(false);
  const [creditosConta, setCreditosConta] = useState<Conta | null>(null);
  const [creditoValor, setCreditoValor] = useState("");
  const [creditoLoading, setCreditoLoading] = useState(false);

  // Modal de edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editConta, setEditConta] = useState<Conta | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    planType: "",
    isActive: true,
    isTestAccount: false,
  });

  const itensPorPagina = 15;

  useEffect(() => {
    fetchContas();
  }, []);

  const fetchContas = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/contas");
      if (response.ok) {
        const data = await response.json();
        setContas(data.contas);
      }
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContaDetails = async (contaId: string) => {
    setDetailsLoading(true);
    setDetailsOpen(true);
    try {
      const response = await fetch(`/api/admin/usuarios/${contaId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedConta(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erro na API:", response.status, errorData);
        alert(`Erro ao carregar detalhes: ${errorData.error || response.statusText}`);
        setDetailsOpen(false);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
      alert("Erro de conexão ao carregar detalhes");
      setDetailsOpen(false);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openCreditosModal = (conta: Conta) => {
    setCreditosConta(conta);
    setCreditoValor(conta.creditoExtra?.toString() || "0");
    setCreditosModalOpen(true);
  };

  const saveCreditoExtra = async () => {
    if (!creditosConta) return;

    setCreditoLoading(true);
    try {
      const response = await fetch(`/api/admin/usuarios/${creditosConta.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creditoExtra: parseFloat(creditoValor) || 0 }),
      });

      if (response.ok) {
        setContas((prev) =>
          prev.map((c) =>
            c.id === creditosConta.id
              ? {
                  ...c,
                  creditoExtra: parseFloat(creditoValor) || 0,
                  limiteTotal: c.limiteFreeTrial + (parseFloat(creditoValor) || 0),
                  saldoRestante: Math.max(0, c.limiteFreeTrial + (parseFloat(creditoValor) || 0) - c.gastoTotal),
                }
              : c
          )
        );
        setCreditosModalOpen(false);
      } else {
        const data = await response.json();
        alert(data.error || "Erro ao atualizar créditos");
      }
    } catch (error) {
      console.error("Erro ao salvar créditos:", error);
      alert("Erro ao salvar créditos");
    } finally {
      setCreditoLoading(false);
    }
  };

  const openEditModal = (conta: Conta) => {
    setEditConta(conta);
    setEditForm({
      planType: conta.planType,
      isActive: conta.isActive,
      isTestAccount: conta.isTeste || false,
    });
    setEditModalOpen(true);
  };

  const saveContaEdit = async () => {
    if (!editConta) return;

    setEditLoading(true);
    try {
      const response = await fetch(`/api/admin/usuarios/${editConta.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType: editForm.planType,
          isActive: editForm.isActive,
          isTestAccount: editForm.isTestAccount,
        }),
      });

      if (response.ok) {
        setContas((prev) =>
          prev.map((c) =>
            c.id === editConta.id
              ? {
                  ...c,
                  planType: editForm.planType,
                  isActive: editForm.isActive,
                  isTeste: editForm.isTestAccount,
                }
              : c
          )
        );
        setEditModalOpen(false);
      } else {
        const data = await response.json();
        alert(data.error || "Erro ao atualizar conta");
      }
    } catch (error) {
      console.error("Erro ao salvar conta:", error);
      alert("Erro ao salvar conta");
    } finally {
      setEditLoading(false);
    }
  };

  // Filtragem e ordenação
  const contasFiltradas = useMemo(() => {
    let filtered = [...contas];

    // Busca
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.nome.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          (c.empresa && c.empresa.toLowerCase().includes(searchLower))
      );
    }

    // Filtro por plano
    if (filtroPlano !== "todos") {
      filtered = filtered.filter((c) => c.planType === filtroPlano);
    }

    // Filtro por status
    if (filtroStatus !== "todos") {
      if (filtroStatus === "ativo") {
        filtered = filtered.filter((c) => c.isActive);
      } else if (filtroStatus === "inativo") {
        filtered = filtered.filter((c) => !c.isActive);
      } else if (filtroStatus === "verificado") {
        filtered = filtered.filter((c) => c.emailVerified);
      }
    }

    // Filtro por pagamento
    if (filtroPagamento !== "todos") {
      if (filtroPagamento === "em_dia") {
        filtered = filtered.filter(
          (c) => !c.ultimaFatura || c.ultimaFatura.status === "paga"
        );
      } else if (filtroPagamento === "pendente") {
        filtered = filtered.filter(
          (c) => c.ultimaFatura && c.ultimaFatura.status === "aberta"
        );
      } else if (filtroPagamento === "atrasado") {
        filtered = filtered.filter(
          (c) => c.ultimaFatura && c.ultimaFatura.status === "vencida"
        );
      }
    }

    // Ordenação
    filtered.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      switch (sortField) {
        case "nome":
          valueA = a.nome.toLowerCase();
          valueB = b.nome.toLowerCase();
          break;
        case "email":
          valueA = a.email.toLowerCase();
          valueB = b.email.toLowerCase();
          break;
        case "gastoTotal":
          valueA = a.gastoTotal;
          valueB = b.gastoTotal;
          break;
        case "planType":
          valueA = a.planType;
          valueB = b.planType;
          break;
        case "createdAt":
        default:
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [contas, search, filtroPlano, filtroStatus, filtroPagamento, sortField, sortDirection]);

  // Paginação
  const totalPaginas = Math.ceil(contasFiltradas.length / itensPorPagina);
  const contasPaginadas = contasFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getPlanBadge = (planType: string) => {
    switch (planType) {
      case "free_trial":
        return (
          <Badge className="bg-blue-500/30 text-blue-200 border-blue-400/40">
            Gratuito
          </Badge>
        );
      case "basic":
        return (
          <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40">
            Basic
          </Badge>
        );
      case "professional":
        return (
          <Badge className="bg-amber-500/30 text-amber-200 border-amber-400/40">
            Profissional
          </Badge>
        );
      case "enterprise":
        return (
          <Badge className="bg-purple-500/30 text-purple-200 border-purple-400/40">
            Enterprise
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-500/30 text-slate-200 border-slate-400/40">
            {planType}
          </Badge>
        );
    }
  };

  const getPaymentStatus = (conta: Conta) => {
    if (!conta.ultimaFatura) {
      return (
        <Badge variant="outline" className="text-slate-300 border-slate-500">
          Sem faturas
        </Badge>
      );
    }

    switch (conta.ultimaFatura.status) {
      case "paga":
        return (
          <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40">
            <CheckCircle className="h-3 w-3 mr-1" />
            Em dia
          </Badge>
        );
      case "aberta":
        return (
          <Badge className="bg-amber-500/30 text-amber-200 border-amber-400/40">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      case "vencida":
        return (
          <Badge className="bg-red-500/30 text-red-200 border-red-400/40">
            <AlertCircle className="h-3 w-3 mr-1" />
            Atrasado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-slate-300 border-slate-500">
            {conta.ultimaFatura.status}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando contas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciamento de Contas</h1>
          <p className="text-slate-400">{contasFiltradas.length} contas encontradas (apenas owners)</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={fetchContas} variant="outline" className="border-slate-700">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar por nome, email ou empresa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            {/* Filtro Plano */}
            <Select value={filtroPlano} onValueChange={setFiltroPlano}>
              <SelectTrigger className="w-full lg:w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Plano" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todos">Todos os planos</SelectItem>
                <SelectItem value="free_trial">Gratuito</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="professional">Profissional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro Status */}
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full lg:w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
                <SelectItem value="verificado">Verificados</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro Pagamento */}
            <Select value={filtroPagamento} onValueChange={setFiltroPagamento}>
              <SelectTrigger className="w-full lg:w-44 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Pagamento" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="em_dia">Em dia</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contas */}
      <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
        {/* Versão Desktop - Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("nome")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Conta
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Status
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("planType")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Plano
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Uso/Pgto
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Saldo/Devido
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("gastoTotal")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white ml-auto"
                  >
                    Recebido
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-center w-28">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Ações
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {contasPaginadas.map((conta) => (
                <tr
                  key={conta.id}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                  onClick={() => fetchContaDetails(conta.id)}
                >
                  {/* Conta */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
                        {conta.nome
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate max-w-[200px]">
                          {conta.nome}
                        </p>
                        <p className="text-xs text-slate-400 truncate max-w-[200px]">
                          {conta.email}
                        </p>
                        {conta.empresa && (
                          <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5 max-w-[200px]">
                            <Building2 className="h-3 w-3 shrink-0" />
                            {conta.empresa}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      {conta.isActive ? (
                        <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40 w-fit">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Ativo
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/30 text-red-200 border-red-400/40 w-fit">
                          <XCircle className="h-3 w-3 mr-1" />
                          Inativo
                        </Badge>
                      )}
                      {conta.teamMemberCount > 0 && (
                        <Badge className="bg-cyan-500/30 text-cyan-200 border-cyan-400/40 text-xs w-fit">
                          <Users className="h-3 w-3 mr-1" />
                          {conta.teamMemberCount} membro{conta.teamMemberCount > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Plano */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {getPlanBadge(conta.planType)}
                        {conta.isTeste && (
                          <Badge className="bg-amber-500/30 text-amber-200 border-amber-400/40 text-xs">
                            <FlaskConical className="h-3 w-3 mr-1" />
                            QA
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Uso/Financeiro */}
                  <td className="px-4 py-4">
                    {conta.planType === "free_trial" ? (
                      <div className="text-sm">
                        <p className="text-slate-300">
                          Usado: <span className="text-white">R$ {(conta.gastoTotal || 0).toFixed(2)}</span>
                        </p>
                        <p className="text-slate-300">
                          Limite: <span className="text-slate-200">R$ {(conta.limiteTotal || 0).toFixed(2)}</span>
                        </p>
                      </div>
                    ) : (
                      getPaymentStatus(conta)
                    )}
                  </td>

                  {/* Saldo/Devido */}
                  <td className="px-4 py-4 text-right">
                    {conta.planType === "free_trial" ? (
                      <p className={cn("text-sm font-medium", conta.saldoRestante > 0 ? "text-emerald-300" : "text-red-300")}>
                        R$ {(conta.saldoRestante || 0).toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-sm text-amber-300">
                        R$ {(conta.totalDevido || 0).toFixed(2)}
                      </p>
                    )}
                  </td>

                  {/* Total Recebido */}
                  <td className="px-4 py-4 text-right">
                    <p className="text-sm font-semibold text-emerald-300">
                      R$ {(conta.totalRecebido || 0).toFixed(2)}
                    </p>
                  </td>

                  {/* Ações */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchContaDetails(conta.id);
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {conta.planType === "free_trial" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openCreditosModal(conta);
                          }}
                          className="p-2 rounded-lg bg-emerald-900 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                          title="Adicionar créditos extras"
                        >
                          <Coins className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(conta);
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-slate-700">
          <p className="text-sm text-slate-400 text-center sm:text-left">
            Mostrando {(paginaAtual - 1) * itensPorPagina + 1} a{" "}
            {Math.min(paginaAtual * itensPorPagina, contasFiltradas.length)} de{" "}
            {contasFiltradas.length}
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
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          {detailsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : selectedConta ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-white flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-lg font-medium">
                    {selectedConta.nome
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p>{selectedConta.nome}</p>
                    <p className="text-sm font-normal text-slate-400">
                      {selectedConta.email}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Info Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Total Gasto</p>
                    <p className="text-lg font-semibold text-emerald-400">
                      R$ {selectedConta.gastoTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Entrevistas</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedConta.totalEntrevistas}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Candidatos</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedConta.totalCandidatos}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Média Mensal</p>
                    <p className="text-lg font-semibold text-white">
                      R$ {selectedConta.mediaGastoMensal.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Informações</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Empresa</span>
                        <span className="text-white">
                          {selectedConta.empresa || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Telefone</span>
                        <span className="text-white">
                          {selectedConta.telefone || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cadastro</span>
                        <span className="text-white">
                          {new Date(selectedConta.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Membros no Time</span>
                        <span className="text-white">
                          {selectedConta.teamMemberCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Plano</span>
                        {getPlanBadge(selectedConta.planType)}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Conta</span>
                        {selectedConta.isActive ? (
                          <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40">
                            Ativa
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/30 text-red-200 border-red-400/40">
                            Inativa
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Tipo</span>
                        {selectedConta.isTeste ? (
                          <Badge variant="outline" className="text-amber-300 border-amber-400/40">
                            Teste
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-300 border-slate-400/40">
                            Normal
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Histórico de Faturas */}
                {selectedConta.faturas && selectedConta.faturas.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">
                      Histórico de Faturas
                    </h4>
                    <div className="space-y-2">
                      {selectedConta.faturas.slice(0, 5).map((fatura) => (
                        <div
                          key={fatura.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50"
                        >
                          <div>
                            <p className="text-sm text-white">
                              {fatura.mes}/{fatura.ano}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={cn(
                                fatura.status === "paga"
                                  ? "bg-emerald-900 text-emerald-400"
                                  : fatura.status === "vencida"
                                  ? "bg-red-900 text-red-400"
                                  : "bg-amber-900 text-amber-400"
                              )}
                            >
                              {fatura.status}
                            </Badge>
                            <span className="text-sm font-medium text-white">
                              R$ {fatura.valor.toFixed(2)}
                            </span>
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

      {/* Modal de Créditos */}
      <Dialog open={creditosModalOpen} onOpenChange={setCreditosModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Coins className="h-5 w-5 text-emerald-400" />
              Adicionar Créditos
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Conceda créditos extras para a conta do free trial
            </DialogDescription>
          </DialogHeader>

          {creditosConta && (
            <div className="space-y-4 mt-4">
              {/* Info da conta */}
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-sm font-medium text-white">{creditosConta.nome}</p>
                <p className="text-xs text-slate-400">{creditosConta.email}</p>
              </div>

              {/* Resumo atual */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="text-xs text-slate-400">Limite Base</p>
                  <p className="text-sm font-medium text-white">
                    R$ {creditosConta.limiteFreeTrial.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="text-xs text-slate-400">Já Utilizado</p>
                  <p className="text-sm font-medium text-amber-400">
                    R$ {creditosConta.gastoTotal.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="text-xs text-slate-400">Crédito Extra Atual</p>
                  <p className="text-sm font-medium text-emerald-400">
                    R$ {(creditosConta.creditoExtra || 0).toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <p className="text-xs text-slate-400">Saldo Restante</p>
                  <p className="text-sm font-medium text-white">
                    R$ {creditosConta.saldoRestante.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Input de crédito */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Novo valor de crédito extra (R$)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={creditoValor}
                  onChange={(e) => setCreditoValor(e.target.value)}
                  placeholder="0.00"
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
                <p className="text-xs text-slate-500">
                  Este valor substitui o crédito extra anterior. O limite total será: R${" "}
                  {(creditosConta.limiteFreeTrial + (parseFloat(creditoValor) || 0)).toFixed(2)}
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-700"
                  onClick={() => setCreditosModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={saveCreditoExtra}
                  disabled={creditoLoading}
                >
                  {creditoLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-400" />
              Editar Conta
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Altere as configurações da conta
            </DialogDescription>
          </DialogHeader>

          {editConta && (
            <div className="space-y-4 mt-4">
              {/* Info da conta */}
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-sm font-medium text-white">{editConta.nome}</p>
                <p className="text-xs text-slate-400">{editConta.email}</p>
              </div>

              {/* Plano */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Plano</label>
                <Select
                  value={editForm.planType}
                  onValueChange={(value) => setEditForm({ ...editForm, planType: value })}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="free_trial">Gratuito</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="professional">Profissional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Ativo */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                <div>
                  <p className="text-sm font-medium text-white">Conta Ativa</p>
                  <p className="text-xs text-slate-400">Permitir acesso à plataforma</p>
                </div>
                <button
                  onClick={() => setEditForm({ ...editForm, isActive: !editForm.isActive })}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    editForm.isActive ? "bg-emerald-600" : "bg-slate-600"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      editForm.isActive ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Conta de Teste (QA) */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-950 border border-amber-800">
                <div className="flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-amber-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Conta de Teste</p>
                    <p className="text-xs text-slate-400">
                      Acesso livre para QA - custos não geram receita
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditForm({ ...editForm, isTestAccount: !editForm.isTestAccount })}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    editForm.isTestAccount ? "bg-amber-600" : "bg-slate-600"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      editForm.isTestAccount ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-700"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={saveContaEdit}
                  disabled={editLoading}
                >
                  {editLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
