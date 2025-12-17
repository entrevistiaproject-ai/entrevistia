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
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Loader2,
  ChevronsUpDown,
  FlaskConical,
  Users,
  Crown,
  UserCheck,
  Calendar,
  LogIn,
  Briefcase,
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
  totalLogins: number;
  totalEntrevistas: number;
  totalCandidatos: number;
  isTeste: boolean;
  // Informações de time
  isTeamMember: boolean;
  teamOwner: {
    id: string;
    nome: string;
    email: string;
  } | null;
  teamRole: string | null;
  teamMemberCount: number;
}

type UsuarioDetalhe = Usuario;

type SortField = "nome" | "email" | "createdAt" | "ultimoLogin" | "totalLogins";
type SortDirection = "asc" | "desc";

export default function UsuariosPage() {
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroTipoConta, setFiltroTipoConta] = useState<string>("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedUser, setSelectedUser] = useState<UsuarioDetalhe | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Modal de edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    isActive: true,
    isTestAccount: false,
  });

  const itensPorPagina = 15;

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/usuarios-lista");
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
    setDetailsOpen(true);
    try {
      const response = await fetch(`/api/admin/usuarios/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
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

  const openEditModal = (usuario: Usuario) => {
    setEditUser(usuario);
    setEditForm({
      isActive: usuario.isActive,
      isTestAccount: usuario.isTeste || false,
    });
    setEditModalOpen(true);
  };

  const saveUserEdit = async () => {
    if (!editUser) return;

    setEditLoading(true);
    try {
      const response = await fetch(`/api/admin/usuarios/${editUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isActive: editForm.isActive,
          isTestAccount: editForm.isTestAccount,
        }),
      });

      if (response.ok) {
        setUsuarios((prev) =>
          prev.map((u) =>
            u.id === editUser.id
              ? {
                  ...u,
                  isActive: editForm.isActive,
                  isTeste: editForm.isTestAccount,
                }
              : u
          )
        );
        setEditModalOpen(false);
      } else {
        const data = await response.json();
        alert(data.error || "Erro ao atualizar usuário");
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário");
    } finally {
      setEditLoading(false);
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
          (u.empresa && u.empresa.toLowerCase().includes(searchLower)) ||
          (u.cargo && u.cargo.toLowerCase().includes(searchLower))
      );
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

    // Filtro por tipo de conta (owner/membro)
    if (filtroTipoConta !== "todos") {
      if (filtroTipoConta === "owners") {
        filtered = filtered.filter((u) => !u.isTeamMember);
      } else if (filtroTipoConta === "membros") {
        filtered = filtered.filter((u) => u.isTeamMember);
      } else if (filtroTipoConta === "com_time") {
        filtered = filtered.filter((u) => u.teamMemberCount > 0);
      }
    }

    // Ordenação
    filtered.sort((a, b) => {
      let valueA: string | number | null;
      let valueB: string | number | null;

      switch (sortField) {
        case "nome":
          valueA = a.nome.toLowerCase();
          valueB = b.nome.toLowerCase();
          break;
        case "email":
          valueA = a.email.toLowerCase();
          valueB = b.email.toLowerCase();
          break;
        case "ultimoLogin":
          valueA = a.ultimoLogin ? new Date(a.ultimoLogin).getTime() : 0;
          valueB = b.ultimoLogin ? new Date(b.ultimoLogin).getTime() : 0;
          break;
        case "totalLogins":
          valueA = a.totalLogins || 0;
          valueB = b.totalLogins || 0;
          break;
        case "createdAt":
        default:
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
      }

      if (valueA === null) return sortDirection === "asc" ? 1 : -1;
      if (valueB === null) return sortDirection === "asc" ? -1 : 1;
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [usuarios, search, filtroStatus, filtroTipoConta, sortField, sortDirection]);

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

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeSinceLastLogin = (dateStr: string | null) => {
    if (!dateStr) return "Nunca";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} sem`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;
    return `${Math.floor(diffDays / 365)} anos`;
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
                placeholder="Buscar por nome, email, empresa ou cargo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

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

            {/* Filtro Tipo de Conta */}
            <Select value={filtroTipoConta} onValueChange={setFiltroTipoConta}>
              <SelectTrigger className="w-full lg:w-44 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Tipo Conta" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="owners">Apenas Owners</SelectItem>
                <SelectItem value="membros">Apenas Membros</SelectItem>
                <SelectItem value="com_time">Owners c/ Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuários */}
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
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Cargo
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Tipo
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleSort("totalLogins")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white mx-auto"
                  >
                    Logins
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("ultimoLogin")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Último Acesso
                    <ChevronsUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase text-slate-400 hover:text-white"
                  >
                    Cadastro
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
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                  onClick={() => fetchUserDetails(usuario.id)}
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
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white truncate max-w-[180px]">
                            {usuario.nome}
                          </p>
                          {usuario.isTeste && (
                            <Badge className="bg-amber-500/30 text-amber-200 border-amber-400/40 text-xs py-0 px-1">
                              <FlaskConical className="h-3 w-3" />
                            </Badge>
                          )}
                          {!usuario.isActive && (
                            <Badge className="bg-red-500/30 text-red-200 border-red-400/40 text-xs py-0 px-1">
                              <XCircle className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate max-w-[200px]">
                          {usuario.email}
                        </p>
                        {usuario.empresa && (
                          <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5 max-w-[200px]">
                            <Building2 className="h-3 w-3 shrink-0" />
                            {usuario.empresa}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Cargo */}
                  <td className="px-4 py-4">
                    {usuario.cargo ? (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                        <span className="text-sm text-slate-300 truncate max-w-[150px]">
                          {usuario.cargo}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">-</span>
                    )}
                  </td>

                  {/* Tipo (Owner/Membro) */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      {usuario.isTeamMember ? (
                        <Badge className="bg-purple-500/30 text-purple-200 border-purple-400/40 text-xs w-fit">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Membro
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-500/30 text-yellow-200 border-yellow-400/40 text-xs w-fit">
                          <Crown className="h-3 w-3 mr-1" />
                          Owner
                        </Badge>
                      )}
                      {usuario.isTeamMember && usuario.teamOwner && (
                        <span className="text-xs text-purple-300 truncate max-w-[120px]">
                          {usuario.teamOwner.nome?.split(' ')[0]}
                        </span>
                      )}
                      {!usuario.isTeamMember && usuario.teamMemberCount > 0 && (
                        <Badge className="bg-cyan-500/30 text-cyan-200 border-cyan-400/40 text-xs w-fit">
                          <Users className="h-3 w-3 mr-1" />
                          {usuario.teamMemberCount}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Total Logins */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <LogIn className="h-3.5 w-3.5 text-slate-500" />
                      <span className="text-sm font-medium text-white">
                        {usuario.totalLogins || 0}
                      </span>
                    </div>
                  </td>

                  {/* Último Acesso */}
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <p className="text-slate-300">
                        {getTimeSinceLastLogin(usuario.ultimoLogin)}
                      </p>
                      {usuario.ultimoLogin && (
                        <p className="text-xs text-slate-500">
                          {formatDateTime(usuario.ultimoLogin)}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Data Cadastro */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      <span className="text-sm text-slate-300">
                        {formatDate(usuario.createdAt)}
                      </span>
                    </div>
                  </td>

                  {/* Ações */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchUserDetails(usuario.id);
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(usuario);
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
                    <p className="text-xs text-slate-400">Total Logins</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedUser.totalLogins || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Entrevistas</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedUser.totalEntrevistas || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Candidatos</p>
                    <p className="text-lg font-semibold text-white">
                      {selectedUser.totalCandidatos || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400">Último Acesso</p>
                    <p className="text-lg font-semibold text-white">
                      {getTimeSinceLastLogin(selectedUser.ultimoLogin)}
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
                          {formatDate(selectedUser.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Tipo</span>
                        {selectedUser.isTeamMember ? (
                          <Badge className="bg-purple-500/30 text-purple-200 border-purple-400/40">
                            Membro de Time
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500/30 text-yellow-200 border-yellow-400/40">
                            Owner
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Conta</span>
                        {selectedUser.isActive ? (
                          <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40">
                            Ativa
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/30 text-red-200 border-red-400/40">
                            Inativa
                          </Badge>
                        )}
                      </div>
                      {selectedUser.isTeamMember && selectedUser.teamOwner && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">Time de</span>
                          <span className="text-white">
                            {selectedUser.teamOwner.nome}
                          </span>
                        </div>
                      )}
                      {selectedUser.teamRole && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">Função</span>
                          <span className="text-white capitalize">
                            {selectedUser.teamRole}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-400" />
              Editar Usuário
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Altere as configurações do usuário
            </DialogDescription>
          </DialogHeader>

          {editUser && (
            <div className="space-y-4 mt-4">
              {/* Info do usuário */}
              <div className="p-3 rounded-lg bg-slate-800/50">
                <p className="text-sm font-medium text-white">{editUser.nome}</p>
                <p className="text-xs text-slate-400">{editUser.email}</p>
                {editUser.cargo && (
                  <p className="text-xs text-slate-500 mt-1">{editUser.cargo}</p>
                )}
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
                      Acesso livre para QA
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
                  onClick={saveUserEdit}
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
