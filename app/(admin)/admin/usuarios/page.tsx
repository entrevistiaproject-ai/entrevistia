"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Users,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Mail,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  UserCog,
  Loader2,
  ArrowUpDown,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  empresa: string | null;
  cargo: string | null;
  telefone: string | null;
  planType: string;
  planStatus: string;
  isActive: boolean;
  emailVerified: string | null;
  createdAt: string;
  ultimoLogin: string | null;
  gastoTotal: number;
  gastoMesAtual: number;
  mediaGastoMensal: number;
  ultimaFatura: {
    valor: number;
    status: string;
    dataVencimento: string | null;
  } | null;
  totalEntrevistas: number;
  totalCandidatos: number;
  isTeste: boolean;
}

interface UsuarioDetalhe extends Usuario {
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

export default function UsuariosPage() {
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [search, setSearch] = useState("");
  const [filtroPlano, setFiltroPlano] = useState<string>("todos");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroPagamento, setFiltroPagamento] = useState<string>("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedUser, setSelectedUser] = useState<UsuarioDetalhe | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const itensPorPagina = 15;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/usuarios");
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data.usuarios);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(`/api/admin/usuarios/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
        setDetailsOpen(true);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Filtragem e ordenação
  const usuariosFiltrados = useMemo(() => {
    let filtered = [...usuarios];

    // Busca
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.nome.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower) ||
          (u.empresa && u.empresa.toLowerCase().includes(searchLower))
      );
    }

    // Filtro por plano
    if (filtroPlano !== "todos") {
      filtered = filtered.filter((u) => u.planType === filtroPlano);
    }

    // Filtro por status
    if (filtroStatus !== "todos") {
      if (filtroStatus === "ativo") {
        filtered = filtered.filter((u) => u.isActive);
      } else if (filtroStatus === "inativo") {
        filtered = filtered.filter((u) => !u.isActive);
      } else if (filtroStatus === "verificado") {
        filtered = filtered.filter((u) => u.emailVerified);
      }
    }

    // Filtro por pagamento
    if (filtroPagamento !== "todos") {
      if (filtroPagamento === "em_dia") {
        filtered = filtered.filter(
          (u) => !u.ultimaFatura || u.ultimaFatura.status === "paga"
        );
      } else if (filtroPagamento === "pendente") {
        filtered = filtered.filter(
          (u) => u.ultimaFatura && u.ultimaFatura.status === "aberta"
        );
      } else if (filtroPagamento === "atrasado") {
        filtered = filtered.filter(
          (u) => u.ultimaFatura && u.ultimaFatura.status === "vencida"
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
  }, [usuarios, search, filtroPlano, filtroStatus, filtroPagamento, sortField, sortDirection]);

  // Paginação
  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);
  const usuariosPaginados = usuariosFiltrados.slice(
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
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Free Trial
          </Badge>
        );
      case "basic":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Basic
          </Badge>
        );
      case "professional":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Professional
          </Badge>
        );
      case "enterprise":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            Enterprise
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            {planType}
          </Badge>
        );
    }
  };

  const getPaymentStatus = (usuario: Usuario) => {
    if (!usuario.ultimaFatura) {
      return (
        <Badge variant="outline" className="text-slate-400 border-slate-600">
          Sem faturas
        </Badge>
      );
    }

    switch (usuario.ultimaFatura.status) {
      case "paga":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Em dia
          </Badge>
        );
      case "aberta":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
      case "vencida":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertCircle className="h-3 w-3 mr-1" />
            Atrasado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            {usuario.ultimaFatura.status}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h1>
          <p className="text-slate-400">{usuariosFiltrados.length} usuários encontrados</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={fetchUsuarios} variant="outline" className="border-slate-700">
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
                <SelectItem value="free_trial">Free Trial</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
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

      {/* Tabela */}
      <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("nome")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Usuário
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Status
                  </span>
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  <button
                    onClick={() => handleSort("planType")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Plano
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left hidden xl:table-cell">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Tipo Conta
                  </span>
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Pagamento
                  </span>
                </th>
                <th className="px-4 py-3 text-right hidden md:table-cell">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Última Fatura
                  </span>
                </th>
                <th className="px-4 py-3 text-right hidden xl:table-cell">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Média Mensal
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("gastoTotal")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white ml-auto"
                  >
                    Total Pago
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
              {usuariosPaginados.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  {/* Usuário */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
                        {usuario.nome
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {usuario.nome}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {usuario.email}
                        </p>
                        {usuario.empresa && (
                          <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                            <Building2 className="h-3 w-3" />
                            {usuario.empresa}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      {usuario.isActive ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 w-fit">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Ativo
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 w-fit">
                          <XCircle className="h-3 w-3 mr-1" />
                          Inativo
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Plano */}
                  <td className="px-4 py-4 hidden lg:table-cell">
                    {getPlanBadge(usuario.planType)}
                  </td>

                  {/* Tipo Conta */}
                  <td className="px-4 py-4 hidden xl:table-cell">
                    {usuario.isTeste ? (
                      <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                        Teste
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-400 border-slate-600">
                        Normal
                      </Badge>
                    )}
                  </td>

                  {/* Pagamento */}
                  <td className="px-4 py-4 hidden lg:table-cell">
                    {getPaymentStatus(usuario)}
                  </td>

                  {/* Última Fatura */}
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    <p className="text-sm text-white font-medium">
                      R$ {usuario.ultimaFatura?.valor.toFixed(2) || "0.00"}
                    </p>
                    {usuario.ultimaFatura?.dataVencimento && (
                      <p className="text-xs text-slate-500">
                        {new Date(usuario.ultimaFatura.dataVencimento).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </td>

                  {/* Média Mensal */}
                  <td className="px-4 py-4 text-right hidden xl:table-cell">
                    <p className="text-sm text-white">
                      R$ {usuario.mediaGastoMensal.toFixed(2)}
                    </p>
                  </td>

                  {/* Total Pago */}
                  <td className="px-4 py-4 text-right">
                    <p className="text-sm font-semibold text-emerald-400">
                      R$ {usuario.gastoTotal.toFixed(2)}
                    </p>
                  </td>

                  {/* Ações */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => fetchUserDetails(usuario.id)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
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
        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">
            Mostrando {(paginaAtual - 1) * itensPorPagina + 1} a{" "}
            {Math.min(paginaAtual * itensPorPagina, usuariosFiltrados.length)} de{" "}
            {usuariosFiltrados.length}
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
              {paginaAtual} / {totalPaginas}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaAtual === totalPaginas}
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
          ) : selectedUser ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-white flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-lg font-medium">
                    {selectedUser.nome
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p>{selectedUser.nome}</p>
                    <p className="text-sm font-normal text-slate-400">
                      {selectedUser.email}
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
                      R$ {selectedUser.gastoTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Entrevistas</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedUser.totalEntrevistas}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Candidatos</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedUser.totalCandidatos}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Média Mensal</p>
                    <p className="text-lg font-semibold text-white">
                      R$ {selectedUser.mediaGastoMensal.toFixed(2)}
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
                          {selectedUser.empresa || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cargo</span>
                        <span className="text-white">
                          {selectedUser.cargo || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Telefone</span>
                        <span className="text-white">
                          {selectedUser.telefone || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cadastro</span>
                        <span className="text-white">
                          {new Date(selectedUser.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Plano</span>
                        {getPlanBadge(selectedUser.planType)}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Conta</span>
                        {selectedUser.isActive ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400">
                            Ativa
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-400">
                            Inativa
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Tipo</span>
                        {selectedUser.isTeste ? (
                          <Badge variant="outline" className="text-amber-400">
                            Teste
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-400">
                            Normal
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Histórico de Faturas */}
                {selectedUser.faturas && selectedUser.faturas.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">
                      Histórico de Faturas
                    </h4>
                    <div className="space-y-2">
                      {selectedUser.faturas.slice(0, 5).map((fatura) => (
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
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : fatura.status === "vencida"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-amber-500/20 text-amber-400"
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
    </div>
  );
}
