"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  PlusCircle,
  RefreshCw,
  MoreVertical,
  Archive,
  ThumbsUp,
  ThumbsDown,
  Star,
  Inbox,
  ArchiveRestore,
  Sparkles,
  ExternalLink,
  Filter,
  Trophy,
  UserCheck,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getPipelineData,
  PipelineData,
  PipelineCandidate,
  arquivarCandidatos,
  desarquivarCandidatos,
  aprovarCandidatosEmLote,
  reprovarCandidatosEmLote,
  finalizarProcesso,
} from "../visao-geral/actions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type TabValue = "pendentes" | "finalistas" | "arquivados";

export default function PainelPage() {
  const [data, setData] = useState<PipelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "aprovar" | "reprovar" | "arquivar" | "desarquivar" | "finalizar";
    ids: string[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("pendentes");
  const [filtroEntrevista, setFiltroEntrevista] = useState<string>("todas");
  const { toast } = useToast();
  const router = useRouter();

  const fetchData = useCallback(async (entrevistaId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPipelineData(entrevistaId === "todas" ? undefined : entrevistaId);
      if (result.success && result.data) {
        setData(result.data);
        // Se nao ha pendentes mas ha finalistas, muda para essa aba
        if (result.data.counts.pendentes === 0 && result.data.counts.finalistas > 0) {
          setActiveTab("finalistas");
        }
      } else {
        setError(result.error || "Erro ao carregar dados");
      }
    } catch {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filtroEntrevista);
  }, [fetchData, filtroEntrevista]);

  // Limpa selecao ao trocar de aba ou filtro
  useEffect(() => {
    setSelectedIds(new Set());
  }, [activeTab, filtroEntrevista]);

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const getRecomendacaoBadge = (recomendacao: string | null) => {
    switch (recomendacao) {
      case "recomendado":
        return (
          <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800">
            <ThumbsUp className="h-3 w-3 mr-1" />
            Recomendado
          </Badge>
        );
      case "recomendado_com_ressalvas":
        return (
          <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-800">
            <Star className="h-3 w-3 mr-1" />
            Com ressalvas
          </Badge>
        );
      case "nao_recomendado":
        return (
          <Badge variant="default" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-800">
            <ThumbsDown className="h-3 w-3 mr-1" />
            Nao recomendado
          </Badge>
        );
      default:
        return null;
    }
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-muted-foreground";
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number | null) => {
    if (score === null) return "bg-muted";
    if (score >= 70) return "bg-green-100";
    if (score >= 50) return "bg-amber-100";
    return "bg-red-100";
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = (candidates: PipelineCandidate[]) => {
    if (selectedIds.size === candidates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(candidates.map((c) => c.id)));
    }
  };

  const executeAction = async () => {
    if (!confirmAction) return;

    setActionLoading(true);
    try {
      let result;
      switch (confirmAction.type) {
        case "aprovar":
          result = await aprovarCandidatosEmLote(confirmAction.ids);
          break;
        case "reprovar":
          result = await reprovarCandidatosEmLote(confirmAction.ids);
          break;
        case "arquivar":
          result = await arquivarCandidatos(confirmAction.ids);
          break;
        case "desarquivar":
          result = await desarquivarCandidatos(confirmAction.ids);
          break;
        case "finalizar":
          result = await finalizarProcesso(confirmAction.ids);
          break;
      }

      if (result.success) {
        toast({
          title: "Sucesso",
          description: `Acao realizada com sucesso em ${confirmAction.ids.length} candidato(s)`,
        });
        setSelectedIds(new Set());
        fetchData(filtroEntrevista);
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao executar acao",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro",
        description: "Erro ao executar acao",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
      setConfirmAction(null);
    }
  };

  const actionLabels = {
    aprovar: {
      title: "Aprovar candidatos",
      description: "Os candidatos selecionados serao movidos para Finalistas.",
      action: "Aprovar",
    },
    reprovar: {
      title: "Reprovar candidatos",
      description: "Os candidatos serao marcados como reprovados e arquivados.",
      action: "Reprovar",
    },
    arquivar: {
      title: "Arquivar candidatos",
      description: "Os candidatos serao arquivados e removidos da lista ativa.",
      action: "Arquivar",
    },
    desarquivar: {
      title: "Restaurar candidatos",
      description: "Os candidatos serao restaurados para a lista ativa.",
      action: "Restaurar",
    },
    finalizar: {
      title: "Finalizar processo",
      description: "Os candidatos serao marcados como contratados e arquivados.",
      action: "Finalizar",
    },
  };

  // Card de candidato pendente
  const CandidateCard = ({
    candidate,
    showActions = true,
    showArchiveRestore = false,
  }: {
    candidate: PipelineCandidate;
    showActions?: boolean;
    showArchiveRestore?: boolean;
  }) => {
    const handleRowClick = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('[role="checkbox"]')) {
        return;
      }
      router.push(`/candidatos/${candidate.candidatoId}/resultado?entrevistaId=${candidate.entrevistaId}`);
    };

    return (
      <div
        onClick={handleRowClick}
        className={cn(
          "group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border bg-card transition-all cursor-pointer",
          selectedIds.has(candidate.id) && "border-primary bg-primary/5 ring-1 ring-primary/20",
          "hover:shadow-md hover:border-primary/30"
        )}
      >
        {/* Checkbox + Avatar + Info */}
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <Checkbox
            checked={selectedIds.has(candidate.id)}
            onCheckedChange={() => toggleSelect(candidate.id)}
            className="mt-1 sm:mt-0"
          />
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {getInitials(candidate.nome)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium truncate group-hover:text-primary transition-colors">
                {candidate.nome}
              </span>
              {getRecomendacaoBadge(candidate.recomendacao)}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {candidate.entrevistaTitulo}
              </span>
            </div>
            {/* Data no mobile */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 sm:hidden">
              <Clock className="h-3 w-3" />
              {formatDate(candidate.concluidaEm)}
            </div>
          </div>
        </div>

        {/* Score + Compatibilidade + Data + Acoes */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 pl-11 sm:pl-0">
          {/* Score e Compatibilidade */}
          <div className="flex items-center gap-3">
            {candidate.notaGeral !== null && (
              <div className="text-center" title="Score geral">
                <p className={cn("text-lg font-bold tabular-nums", getScoreColor(candidate.notaGeral))}>
                  {Math.round(candidate.notaGeral)}
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Star className="h-2.5 w-2.5" />
                  Score
                </p>
              </div>
            )}
            {candidate.compatibilidadeVaga !== null && (
              <div className="text-center" title="Compatibilidade com a vaga">
                <p className={cn("text-lg font-bold tabular-nums", getScoreColor(candidate.compatibilidadeVaga))}>
                  {Math.round(candidate.compatibilidadeVaga)}%
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Target className="h-2.5 w-2.5" />
                  Match
                </p>
              </div>
            )}
          </div>

          {/* Data (desktop) */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{formatDate(candidate.concluidaEm)}</p>
            <p className="text-xs text-muted-foreground">Concluida</p>
          </div>

          {/* Acoes */}
          <div className="flex items-center gap-1">
            {showActions && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => setConfirmAction({ type: "aprovar", ids: [candidate.id] })}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Aprovar</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setConfirmAction({ type: "reprovar", ids: [candidate.id] })}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Reprovar</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/candidatos/${candidate.candidatoId}/resultado?entrevistaId=${candidate.entrevistaId}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setConfirmAction({ type: "arquivar", ids: [candidate.id] })}>
                      <Archive className="h-4 w-4 mr-2" />
                      Arquivar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {showArchiveRestore && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/candidatos/${candidate.candidatoId}/resultado?entrevistaId=${candidate.entrevistaId}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setConfirmAction({ type: "desarquivar", ids: [candidate.id] })}>
                    <ArchiveRestore className="h-4 w-4 mr-2" />
                    Restaurar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Card de finalista (aprovados)
  const FinalistaCard = ({ candidate }: { candidate: PipelineCandidate }) => {
    const handleRowClick = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('[role="checkbox"]')) {
        return;
      }
      router.push(`/candidatos/${candidate.candidatoId}/resultado?entrevistaId=${candidate.entrevistaId}`);
    };

    return (
      <div
        onClick={handleRowClick}
        className={cn(
          "group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border transition-all cursor-pointer",
          selectedIds.has(candidate.id)
            ? "border-green-500 bg-green-100 ring-1 ring-green-200"
            : "border-green-200 bg-green-50",
          "hover:shadow-md hover:border-green-400"
        )}
      >
        {/* Checkbox + Avatar + Info */}
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <Checkbox
            checked={selectedIds.has(candidate.id)}
            onCheckedChange={() => toggleSelect(candidate.id)}
            className="mt-1 sm:mt-0"
          />
          <div className="relative">
            <Avatar className="h-11 w-11 shrink-0 ring-2 ring-green-300">
              <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                {getInitials(candidate.nome)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium truncate group-hover:text-green-700 transition-colors">
                {candidate.nome}
              </span>
              <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                <Trophy className="h-3 w-3 mr-1" />
                Finalista
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {candidate.entrevistaTitulo}
              </span>
            </div>
          </div>
        </div>

        {/* Score + Compatibilidade + Acoes */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 pl-11 sm:pl-0">
          <div className="flex items-center gap-3">
            <div className="text-center" title="Score geral">
              <p className={cn("text-lg font-bold tabular-nums", getScoreColor(candidate.notaGeral))}>
                {candidate.notaGeral !== null ? Math.round(candidate.notaGeral) : "-"}
              </p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5" />
                Score
              </p>
            </div>
            {candidate.compatibilidadeVaga !== null && (
              <div className="text-center" title="Compatibilidade com a vaga">
                <p className={cn("text-lg font-bold tabular-nums", getScoreColor(candidate.compatibilidadeVaga))}>
                  {Math.round(candidate.compatibilidadeVaga)}%
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Target className="h-2.5 w-2.5" />
                  Match
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-green-300 text-green-700 hover:bg-green-100"
              onClick={() => setConfirmAction({ type: "finalizar", ids: [candidate.id] })}
            >
              <UserCheck className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Contratar</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/candidatos/${candidate.candidatoId}/resultado?entrevistaId=${candidate.entrevistaId}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver detalhes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setConfirmAction({ type: "arquivar", ids: [candidate.id] })}>
                  <Archive className="h-4 w-4 mr-2" />
                  Arquivar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Painel"
          description="Acompanhe e gerencie seus candidatos"
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Painel"
          description="Acompanhe e gerencie seus candidatos"
        />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erro ao carregar dados</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => fetchData(filtroEntrevista)} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasAnyData = data.counts.pendentes > 0 || data.counts.finalistas > 0 || data.counts.arquivados > 0 || data.counts.emAndamento > 0;

  if (!hasAnyData && data.entrevistas.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Painel"
          description="Acompanhe e gerencie seus candidatos"
        >
          <Button asChild size="touch">
            <Link href="/criar-entrevista">
              <PlusCircle className="h-4 w-4" />
              Nova Entrevista
            </Link>
          </Button>
        </PageHeader>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <Inbox className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum candidato ainda</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
              Crie uma entrevista e adicione candidatos para comecar a gerenciar seu processo seletivo aqui.
            </p>
            <Button asChild>
              <Link href="/criar-entrevista">
                <PlusCircle className="h-4 w-4 mr-2" />
                Criar Primeira Entrevista
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentCandidates = activeTab === "pendentes"
    ? data.pendentes
    : activeTab === "finalistas"
    ? data.finalistas
    : data.arquivados;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Painel"
        description="Acompanhe e gerencie seus candidatos"
      >
        <Button asChild size="touch" className="w-full sm:w-auto">
          <Link href="/criar-entrevista">
            <PlusCircle className="h-4 w-4" />
            Nova Entrevista
          </Link>
        </Button>
      </PageHeader>

      {/* KPIs Resumidos */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card
          className={cn(
            "cursor-pointer transition-all",
            activeTab === "pendentes" ? "border-amber-400 bg-amber-100 ring-1 ring-amber-200" : "hover:border-amber-300"
          )}
          onClick={() => setActiveTab("pendentes")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 dark:bg-amber-900 p-2.5">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.counts.pendentes}</p>
                <p className="text-xs text-muted-foreground">Aguardando decisao</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all",
            activeTab === "finalistas" ? "border-green-400 bg-green-100 ring-1 ring-green-200" : "hover:border-green-300"
          )}
          onClick={() => setActiveTab("finalistas")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 dark:bg-green-900 p-2.5">
                <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.counts.finalistas}</p>
                <p className="text-xs text-muted-foreground">Finalistas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-2.5">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.counts.emAndamento}</p>
                <p className="text-xs text-muted-foreground">Em andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all",
            activeTab === "arquivados" ? "border-muted-foreground/50 bg-muted/50 ring-1 ring-muted-foreground/20" : "hover:border-muted-foreground/30"
          )}
          onClick={() => setActiveTab("arquivados")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2.5">
                <Archive className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.counts.arquivados}</p>
                <p className="text-xs text-muted-foreground">Arquivados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs com lista de candidatos */}
      <Card>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
          <div className="p-6 pb-3">
            <div className="flex flex-col gap-4">
              {/* Filtro por vaga */}
              {data.entrevistas.length > 1 && (
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filtroEntrevista} onValueChange={setFiltroEntrevista}>
                    <SelectTrigger className="w-full sm:w-[280px]">
                      <SelectValue placeholder="Filtrar por vaga" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as vagas</SelectItem>
                      {data.entrevistas.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.titulo} ({e.totalCandidatos})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="pendentes" className="flex-1 sm:flex-none gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="hidden sm:inline">Aguardando</span>
                    <Badge variant="secondary" className="ml-1">{data.counts.pendentes}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="finalistas" className="flex-1 sm:flex-none gap-2">
                    <Trophy className="h-4 w-4" />
                    <span className="hidden sm:inline">Finalistas</span>
                    <Badge variant="secondary" className="ml-1">{data.counts.finalistas}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="arquivados" className="flex-1 sm:flex-none gap-2">
                    <Archive className="h-4 w-4" />
                    <span className="hidden sm:inline">Arquivados</span>
                    <Badge variant="secondary" className="ml-1">{data.counts.arquivados}</Badge>
                  </TabsTrigger>
                </TabsList>

                {/* Acoes em lote */}
                {selectedIds.size > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">
                      {selectedIds.size} selecionado(s)
                    </span>
                    {activeTab === "pendentes" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmAction({ type: "aprovar", ids: Array.from(selectedIds) })}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmAction({ type: "reprovar", ids: Array.from(selectedIds) })}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Reprovar
                        </Button>
                      </>
                    )}
                    {activeTab === "finalistas" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmAction({ type: "finalizar", ids: Array.from(selectedIds) })}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Contratar
                      </Button>
                    )}
                    {activeTab === "arquivados" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmAction({ type: "desarquivar", ids: Array.from(selectedIds) })}
                      >
                        <ArchiveRestore className="h-4 w-4 mr-1" />
                        Restaurar
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <CardContent>
            {/* Header com select all */}
            {currentCandidates.length > 0 && (
              <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                <Checkbox
                  checked={selectedIds.size === currentCandidates.length && currentCandidates.length > 0}
                  onCheckedChange={() => toggleSelectAll(currentCandidates)}
                />
                <span className="text-sm text-muted-foreground">
                  Selecionar todos ({currentCandidates.length})
                </span>
              </div>
            )}

            <TabsContent value="pendentes" className="mt-0 space-y-3">
              {data.pendentes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tudo em dia!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Nao ha candidatos aguardando sua decisao no momento.
                  </p>
                </div>
              ) : (
                data.pendentes.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))
              )}
            </TabsContent>

            <TabsContent value="finalistas" className="mt-0 space-y-3">
              {data.finalistas.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum finalista ainda</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Aprove candidatos para adiciona-los aos finalistas.
                  </p>
                </div>
              ) : (
                data.finalistas.map((candidate) => (
                  <FinalistaCard key={candidate.id} candidate={candidate} />
                ))
              )}
            </TabsContent>

            <TabsContent value="arquivados" className="mt-0 space-y-3">
              {data.arquivados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Archive className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum arquivado</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Candidatos arquivados aparecerao aqui.
                  </p>
                </div>
              ) : (
                data.arquivados.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    showActions={false}
                    showArchiveRestore={true}
                  />
                ))
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Dialog de confirmacao */}
      <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction && actionLabels[confirmAction.type].title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction && actionLabels[confirmAction.type].description}
              <br />
              <strong>{confirmAction?.ids.length} candidato(s) selecionado(s).</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={executeAction} disabled={actionLoading}>
              {actionLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {confirmAction && actionLabels[confirmAction.type].action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
