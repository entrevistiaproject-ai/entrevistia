"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Database,
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Download,
  Loader2,
  Eye,
  Shield,
  FileText,
  Settings,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  userId: string | null;
  userEmail: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  tipoOperacaoLGPD: string | null;
  finalidade: string | null;
  detalhes: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  status: "success" | "error" | "warning";
}

const actionIcons: Record<string, React.ElementType> = {
  create: Plus,
  update: Edit,
  delete: Trash2,
  view: Eye,
  login: Shield,
  logout: Shield,
  export: FileText,
  settings: Settings,
};

const actionColors: Record<string, string> = {
  create: "text-emerald-400 bg-emerald-500/20",
  update: "text-blue-400 bg-blue-500/20",
  delete: "text-red-400 bg-red-500/20",
  view: "text-purple-400 bg-purple-500/20",
  login: "text-cyan-400 bg-cyan-500/20",
  logout: "text-amber-400 bg-amber-500/20",
  export: "text-pink-400 bg-pink-500/20",
  settings: "text-slate-400 bg-slate-500/20",
};

export default function LogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [search, setSearch] = useState("");
  const [filtroAcao, setFiltroAcao] = useState("todas");
  const [filtroEntidade, setFiltroEntidade] = useState("todas");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const itensPorPagina = 20;

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/logs");
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Erro ao carregar logs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtragem
  const logsFiltrados = logs.filter((log) => {
    const matchSearch =
      !search ||
      log.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase());

    const matchAcao = filtroAcao === "todas" || log.action === filtroAcao;
    const matchEntidade = filtroEntidade === "todas" || log.entity === filtroEntidade;
    const matchStatus = filtroStatus === "todos" || log.status === filtroStatus;

    return matchSearch && matchAcao && matchEntidade && matchStatus;
  });

  // Paginação
  const totalPaginas = Math.ceil(logsFiltrados.length / itensPorPagina);
  const logsPaginados = logsFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  // Estatísticas
  const stats = {
    total: logs.length,
    success: logs.filter((l) => l.status === "success").length,
    error: logs.filter((l) => l.status === "error").length,
    warning: logs.filter((l) => l.status === "warning").length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      default:
        return <Info className="h-4 w-4 text-slate-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Logs de Auditoria</h1>
          <p className="text-slate-400">Histórico de ações no sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={fetchLogs} variant="outline" className="border-slate-700">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Database className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-slate-400">Total de Logs</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.success}</p>
              <p className="text-xs text-slate-400">Sucesso</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.warning}</p>
              <p className="text-xs text-slate-400">Avisos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.error}</p>
              <p className="text-xs text-slate-400">Erros</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar por email, ação ou entidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            <Select value={filtroAcao} onValueChange={setFiltroAcao}>
              <SelectTrigger className="w-full lg:w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Ação" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todas">Todas ações</SelectItem>
                <SelectItem value="create">Criar</SelectItem>
                <SelectItem value="update">Atualizar</SelectItem>
                <SelectItem value="delete">Deletar</SelectItem>
                <SelectItem value="view">Visualizar</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="export">Exportar</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroEntidade} onValueChange={setFiltroEntidade}>
              <SelectTrigger className="w-full lg:w-40 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Entidade" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
                <SelectItem value="entrevista">Entrevista</SelectItem>
                <SelectItem value="candidato">Candidato</SelectItem>
                <SelectItem value="pergunta">Pergunta</SelectItem>
                <SelectItem value="fatura">Fatura</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full lg:w-36 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="warning">Aviso</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Usuário
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Ação
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">
                  Entidade
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400 hidden md:table-cell">
                  LGPD
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {logsPaginados.map((log) => {
                const ActionIcon = actionIcons[log.action] || Activity;
                const actionColor = actionColors[log.action] || "text-slate-400 bg-slate-500/20";
                const isExpanded = expandedLog === log.id;

                return (
                  <>
                    <tr
                      key={log.id}
                      className={cn(
                        "hover:bg-slate-800/30 transition-colors cursor-pointer",
                        isExpanded && "bg-slate-800/50"
                      )}
                      onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <div>
                            <p className="text-sm text-white">
                              {new Date(log.timestamp).toLocaleDateString("pt-BR")}
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(log.timestamp).toLocaleTimeString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-500" />
                          <span className="text-sm text-white truncate max-w-[150px]">
                            {log.userEmail || "Sistema"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className={cn("inline-flex items-center gap-2 px-2 py-1 rounded-md", actionColor)}>
                          <ActionIcon className="h-3 w-3" />
                          <span className="text-xs font-medium capitalize">{log.action}</span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm text-slate-300 capitalize">{log.entity}</span>
                        {log.entityId && (
                          <p className="text-xs text-slate-500 truncate max-w-[100px]">
                            {log.entityId}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-4 hidden md:table-cell">
                        {log.tipoOperacaoLGPD && (
                          <Badge variant="outline" className="text-xs text-purple-400 border-purple-500/30">
                            {log.tipoOperacaoLGPD}
                          </Badge>
                        )}
                      </td>

                      <td className="px-4 py-4 text-center">
                        {getStatusIcon(log.status)}
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="bg-slate-800/30">
                        <td colSpan={6} className="px-4 py-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <p className="text-slate-400">
                                <span className="font-medium text-white">IP:</span> {log.ipAddress || "N/A"}
                              </p>
                              <p className="text-slate-400">
                                <span className="font-medium text-white">Finalidade LGPD:</span>{" "}
                                {log.finalidade || "N/A"}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-slate-400">
                                <span className="font-medium text-white">User Agent:</span>
                              </p>
                              <p className="text-xs text-slate-500 break-all">
                                {log.userAgent || "N/A"}
                              </p>
                            </div>
                            {log.detalhes && (
                              <div className="md:col-span-2">
                                <p className="font-medium text-white mb-1">Detalhes:</p>
                                <pre className="text-xs text-slate-400 bg-slate-900 p-2 rounded overflow-x-auto">
                                  {JSON.stringify(log.detalhes, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">
            Mostrando {(paginaAtual - 1) * itensPorPagina + 1} a{" "}
            {Math.min(paginaAtual * itensPorPagina, logsFiltrados.length)} de {logsFiltrados.length}
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
              disabled={paginaAtual === totalPaginas}
              className="border-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
