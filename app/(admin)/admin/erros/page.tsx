"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Bug,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Zap,
  Eye,
  Check,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorAggregation {
  id: string;
  fingerprint: string;
  message: string;
  component: string | null;
  endpoint: string | null;
  sampleStack: string | null;
  totalOccurrences: number;
  uniqueUsers: number;
  firstSeen: string;
  lastSeen: string;
  resolved: boolean;
  ticketId: string | null;
}

interface ErrorStats {
  totalErrors: number;
  unresolvedErrors: number;
  totalOccurrences: number;
  uniqueComponents: number;
  errorsLast24h: number;
}

interface ComponentStats {
  component: string;
  count: number;
  occurrences: number;
}

const COMPONENT_ICONS: Record<string, typeof Bug> = {
  api: Globe,
  database: Database,
  auth: Server,
  ai: Zap,
  client: Activity,
  default: Bug,
};

export default function ErrosPage() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ErrorAggregation[]>([]);
  const [stats, setStats] = useState<ErrorStats | null>(null);
  const [byComponent, setByComponent] = useState<ComponentStats[]>([]);
  const [selectedError, setSelectedError] = useState<ErrorAggregation | null>(null);

  // Filtros
  const [resolvedFilter, setResolvedFilter] = useState<string>("false");
  const [componentFilter, setComponentFilter] = useState<string>("all");

  const fetchErrors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (resolvedFilter !== "all") params.append("resolved", resolvedFilter);
      if (componentFilter !== "all") params.append("component", componentFilter);

      const response = await fetch(`/api/admin/erros?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setErrors(data.errors);
        setStats(data.stats);
        setByComponent(data.byComponent);
      }
    } catch (error) {
      console.error("Erro ao carregar erros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrors();
  }, [resolvedFilter, componentFilter]);

  const handleResolve = async (fingerprint: string, resolved: boolean) => {
    try {
      const response = await fetch("/api/admin/erros", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint, resolved }),
      });

      if (response.ok) {
        await fetchErrors();
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
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

  const getTimeSince = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    return `${minutes}min atrás`;
  };

  const getComponentIcon = (component: string | null) => {
    if (!component) return Bug;
    const key = component.toLowerCase().split(":")[0];
    return COMPONENT_ICONS[key] || COMPONENT_ICONS.default;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Monitoramento de Erros</h1>
          <p className="text-slate-400">Acompanhe e resolva erros do sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={fetchErrors} variant="outline" className="border-slate-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="h-4 w-4 text-red-400" />
                <span className="text-xs text-slate-400">Total de Erros</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.totalErrors}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-slate-400">Não Resolvidos</span>
              </div>
              <p className="text-2xl font-bold text-amber-400">{stats.unresolvedErrors}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span className="text-xs text-slate-400">Ocorrências</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">{stats.totalOccurrences}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-slate-400">Componentes</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">{stats.uniqueComponents}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-slate-400">Últimas 24h</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">{stats.errorsLast24h}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Erros por Componente */}
      {byComponent.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-base">Erros por Componente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {byComponent.map((comp) => {
                const Icon = getComponentIcon(comp.component);
                return (
                  <div
                    key={comp.component}
                    className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 border border-slate-700"
                  >
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-white">{comp.component}</span>
                    <Badge className="bg-red-500/20 text-red-400">
                      {comp.count} ({comp.occurrences}x)
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Select value={resolvedFilter} onValueChange={setResolvedFilter}>
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="false">Não Resolvidos</SelectItem>
                <SelectItem value="true">Resolvidos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={componentFilter} onValueChange={setComponentFilter}>
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Componente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Componentes</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="auth">Auth</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="client">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Erros */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Erros Agregados ({errors.length})
          </CardTitle>
          <CardDescription className="text-slate-400">
            Erros similares são agrupados por fingerprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : errors.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-emerald-400" />
              <p>Nenhum erro encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">Erro</TableHead>
                    <TableHead className="text-slate-400">Componente</TableHead>
                    <TableHead className="text-slate-400 text-center">Ocorrências</TableHead>
                    <TableHead className="text-slate-400">Última vez</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400 w-24">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errors.map((error) => {
                    const Icon = getComponentIcon(error.component);
                    return (
                      <TableRow key={error.id} className="border-slate-700 hover:bg-slate-800/50">
                        <TableCell>
                          <div className="space-y-1 max-w-[400px]">
                            <p className="font-medium text-white truncate">
                              {error.message}
                            </p>
                            {error.endpoint && (
                              <p className="text-xs text-slate-500 truncate">
                                {error.endpoint}
                              </p>
                            )}
                            <p className="text-xs text-slate-600 font-mono">
                              {error.fingerprint}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-300">
                              {error.component || "Desconhecido"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn(
                            error.totalOccurrences > 100
                              ? "bg-red-500/20 text-red-400"
                              : error.totalOccurrences > 10
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-500/20 text-slate-400"
                          )}>
                            {error.totalOccurrences}x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="text-white">{getTimeSince(error.lastSeen)}</p>
                            <p className="text-xs text-slate-500">
                              Desde {formatDate(error.firstSeen)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {error.resolved ? (
                            <Badge className="bg-emerald-500/20 text-emerald-400">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolvido
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/20 text-red-400">
                              <XCircle className="h-3 w-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedError(error)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!error.resolved ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResolve(error.fingerprint, true)}
                                className="text-emerald-400 hover:text-emerald-300"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResolve(error.fingerprint, false)}
                                className="text-amber-400 hover:text-amber-300"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
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

      {/* Modal de Detalhes do Erro */}
      {selectedError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-white">Detalhes do Erro</CardTitle>
                <CardDescription className="text-slate-400">
                  Fingerprint: {selectedError.fingerprint}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedError(null)}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Mensagem:</p>
                <p className="text-white bg-slate-800 p-3 rounded-lg">{selectedError.message}</p>
              </div>

              {selectedError.sampleStack && (
                <div>
                  <p className="text-sm text-slate-400 mb-1">Stack Trace:</p>
                  <pre className="text-xs text-slate-300 bg-slate-800 p-3 rounded-lg overflow-x-auto max-h-60">
                    {selectedError.sampleStack}
                  </pre>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Componente:</p>
                  <p className="text-white">{selectedError.component || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Endpoint:</p>
                  <p className="text-white">{selectedError.endpoint || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total de Ocorrências:</p>
                  <p className="text-white">{selectedError.totalOccurrences}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Usuários Afetados:</p>
                  <p className="text-white">{selectedError.uniqueUsers}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Primeira ocorrência:</p>
                  <p className="text-white">{formatDate(selectedError.firstSeen)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Última ocorrência:</p>
                  <p className="text-white">{formatDate(selectedError.lastSeen)}</p>
                </div>
              </div>

              {selectedError.ticketId && (
                <Link href={`/admin/suporte/${selectedError.ticketId}`}>
                  <Button variant="outline" className="w-full">
                    Ver Ticket Relacionado
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
