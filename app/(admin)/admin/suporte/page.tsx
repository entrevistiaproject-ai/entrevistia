"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Ticket,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  MessageSquare,
  ChevronRight,
  RefreshCw,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketData {
  id: string;
  titulo: string;
  descricao: string;
  userEmail: string;
  userName: string | null;
  categoria: string;
  prioridade: string;
  status: string;
  origem: string;
  riscoScore: number;
  assignedTo: string | null;
  errorCount: number;
  createdAt: string;
  updatedAt: string;
}

interface TicketStats {
  total: number;
  abertos: number;
  emAnalise: number;
  resolvidos: number;
  porPrioridade: Record<string, number>;
  porCategoria: Record<string, number>;
  tempoMedioResposta: number;
  tempoMedioResolucao: number;
}

const STATUS_CONFIG = {
  aberto: { label: "Aberto", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Clock },
  em_analise: { label: "Em Análise", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: AlertCircle },
  aguardando_usuario: { label: "Aguardando Usuário", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Users },
  aguardando_tecnico: { label: "Aguardando Técnico", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: MessageSquare },
  resolvido: { label: "Resolvido", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: CheckCircle },
  fechado: { label: "Fechado", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", icon: XCircle },
  cancelado: { label: "Cancelado", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
};

const PRIORITY_CONFIG = {
  baixa: { label: "Baixa", color: "bg-slate-500/20 text-slate-400" },
  media: { label: "Média", color: "bg-blue-500/20 text-blue-400" },
  alta: { label: "Alta", color: "bg-amber-500/20 text-amber-400" },
  critica: { label: "Crítica", color: "bg-red-500/20 text-red-400" },
};

const CATEGORY_CONFIG = {
  usuario: { label: "Usuário", color: "text-blue-400" },
  sistemico: { label: "Sistêmico", color: "text-red-400" },
  faturamento: { label: "Faturamento", color: "text-emerald-400" },
  performance: { label: "Performance", color: "text-amber-400" },
  seguranca: { label: "Segurança", color: "text-purple-400" },
  integracao: { label: "Integração", color: "text-cyan-400" },
  sugestao: { label: "Sugestão", color: "text-pink-400" },
  outro: { label: "Outro", color: "text-slate-400" },
};

export default function SuportePage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [total, setTotal] = useState(0);

  // Filtros
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [prioridadeFilter, setPrioridadeFilter] = useState<string>("all");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("all");

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("includeStats", "true");
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (prioridadeFilter !== "all") params.append("prioridade", prioridadeFilter);
      if (categoriaFilter !== "all") params.append("categoria", categoriaFilter);
      if (search) params.append("search", search);

      const response = await fetch(`/api/admin/tickets?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets);
        setStats(data.stats);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Erro ao carregar tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter, prioridadeFilter, categoriaFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTickets();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRiscoColor = (score: number) => {
    if (score >= 75) return "text-red-400";
    if (score >= 50) return "text-amber-400";
    if (score >= 25) return "text-blue-400";
    return "text-slate-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Suporte & Chamados</h1>
          <p className="text-slate-400">Gerencie tickets de suporte e erros do sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={fetchTickets} variant="outline" className="border-slate-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Novo Ticket
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-slate-400">Total</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-slate-400">Abertos</span>
              </div>
              <p className="text-2xl font-bold text-amber-400">{stats.abertos}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-purple-400" />
                <span className="text-xs text-slate-400">Em Análise</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">{stats.emAnalise}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-slate-400">Resolvidos</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">{stats.resolvidos}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Metrics Cards */}
      {stats && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Por Prioridade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(stats.porPrioridade).map(([prioridade, count]) => (
                <div key={prioridade} className="flex items-center justify-between">
                  <Badge className={PRIORITY_CONFIG[prioridade as keyof typeof PRIORITY_CONFIG]?.color || "bg-slate-500/20"}>
                    {PRIORITY_CONFIG[prioridade as keyof typeof PRIORITY_CONFIG]?.label || prioridade}
                  </Badge>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(stats.porCategoria).slice(0, 5).map(([categoria, count]) => (
                <div key={categoria} className="flex items-center justify-between">
                  <span className={cn("text-sm", CATEGORY_CONFIG[categoria as keyof typeof CATEGORY_CONFIG]?.color || "text-slate-400")}>
                    {CATEGORY_CONFIG[categoria as keyof typeof CATEGORY_CONFIG]?.label || categoria}
                  </span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Métricas de Tempo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-slate-500">Tempo Médio de Resposta</p>
                <p className="text-lg font-bold text-white">
                  {stats.tempoMedioResposta > 0 ? `${stats.tempoMedioResposta} min` : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tempo Médio de Resolução</p>
                <p className="text-lg font-bold text-white">
                  {stats.tempoMedioResolucao > 0 ? `${stats.tempoMedioResolucao} h` : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Buscar por título ou descrição..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700"
                />
              </div>
              <Button type="submit" variant="outline" className="border-slate-700">
                Buscar
              </Button>
            </form>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="em_analise">Em Análise</SelectItem>
                  <SelectItem value="aguardando_usuario">Aguardando Usuário</SelectItem>
                  <SelectItem value="resolvido">Resolvido</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="sistemico">Sistêmico</SelectItem>
                  <SelectItem value="usuario">Usuário</SelectItem>
                  <SelectItem value="faturamento">Faturamento</SelectItem>
                  <SelectItem value="seguranca">Segurança</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="integracao">Integração</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Tickets ({total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Ticket className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum ticket encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">Ticket</TableHead>
                    <TableHead className="text-slate-400">Usuário</TableHead>
                    <TableHead className="text-slate-400">Categoria</TableHead>
                    <TableHead className="text-slate-400">Prioridade</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Risco</TableHead>
                    <TableHead className="text-slate-400">Data</TableHead>
                    <TableHead className="text-slate-400 w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => {
                    const statusConfig = STATUS_CONFIG[ticket.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.aberto;
                    const priorityConfig = PRIORITY_CONFIG[ticket.prioridade as keyof typeof PRIORITY_CONFIG] || PRIORITY_CONFIG.media;
                    const categoryConfig = CATEGORY_CONFIG[ticket.categoria as keyof typeof CATEGORY_CONFIG] || CATEGORY_CONFIG.outro;
                    const StatusIcon = statusConfig.icon;

                    return (
                      <TableRow key={ticket.id} className="border-slate-700 hover:bg-slate-800/50">
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-white truncate max-w-[250px]">
                              {ticket.titulo}
                            </p>
                            <p className="text-xs text-slate-500 truncate max-w-[250px]">
                              {ticket.descricao.slice(0, 60)}...
                            </p>
                            {ticket.errorCount > 1 && (
                              <Badge className="bg-red-500/20 text-red-400 text-xs">
                                {ticket.errorCount}x ocorrências
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm text-white">{ticket.userName || "N/A"}</p>
                            <p className="text-xs text-slate-500">{ticket.userEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={cn("text-sm", categoryConfig.color)}>
                            {categoryConfig.label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityConfig.color}>
                            {priorityConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={cn("font-medium", getRiscoColor(ticket.riscoScore))}>
                            {ticket.riscoScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-slate-400">
                            {formatDate(ticket.createdAt)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link href={`/admin/suporte/${ticket.id}`}>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
