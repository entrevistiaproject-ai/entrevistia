"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
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
  CheckCheck,
  ArchiveRestore,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
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

type TabValue = "pendentes" | "shortlist" | "arquivados";

export default function TarefasPage() {
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
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPipelineData();
      if (result.success && result.data) {
        setData(result.data);
        // Se não há pendentes mas há shortlist, muda para essa aba
        if (result.data.counts.pendentes === 0 && result.data.counts.shortlist > 0) {
          setActiveTab("shortlist");
        }
      } else {
        setError(result.error || "Erro ao carregar dados");
      }
    } catch (err) {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Limpa seleção ao trocar de aba
  useEffect(() => {
    setSelectedIds(new Set());
  }, [activeTab]);

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
          <Badge variant="default" className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200">
            <ThumbsUp className="h-3 w-3 mr-1" />
            Recomendado
          </Badge>
        );
      case "recomendado_com_ressalvas":
        return (
          <Badge variant="default" className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-amber-200">
            <Star className="h-3 w-3 mr-1" />
            Com ressalvas
          </Badge>
        );
      case "nao_recomendado":
        return (
          <Badge variant="default" className="bg-red-500/10 text-red-700 hover:bg-red-500/20 border-red-200">
            <ThumbsDown className="h-3 w-3 mr-1" />
            Não recomendado
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
          description: `Ação realizada com sucesso em ${confirmAction.ids.length} candidato(s)`,
        });
        setSelectedIds(new Set());
        fetchData();
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao executar ação",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao executar ação",
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
      description: "Os candidatos selecionados serão movidos para a Shortlist.",
      action: "Aprovar",
    },
    reprovar: {
      title: "Reprovar candidatos",
      description: "Os candidatos serão marcados como reprovados e arquivados.",
      action: "Reprovar",
    },
    arquivar: {
      title: "Arquivar candidatos",
      description: "Os candidatos serão arquivados e removidos da lista ativa.",
      action: "Arquivar",
    },
    desarquivar: {
      title: "Restaurar candidatos",
      description: "Os candidatos serão restaurados para a lista ativa.",
      action: "Restaurar",
    },
    finalizar: {
      title: "Finalizar processo",
      description: "Os candidatos serão marcados como processo concluído e arquivados.",
      action: "Finalizar",
    },
  };

  // Card de candidato responsivo
  const CandidateCard = ({
    candidate,
    showActions = true,
    showArchiveRestore = false,
  }: {
    candidate: PipelineCandidate;
    showActions?: boolean;
    showArchiveRestore?: boolean;
  }) => (
    <div
      className={cn(
        "group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border bg-card transition-all",
        selectedIds.has(candidate.id) && "border-primary bg-primary/5",
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
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {getInitials(candidate.nome)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium truncate">{candidate.nome}</p>
            {getRecomendacaoBadge(candidate.recomendacao)}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {candidate.cargo || candidate.entrevistaTitulo}
            {candidate.empresa && ` · ${candidate.empresa}`}
          </p>
        </div>
      </div>

      {/* Score + Data + Ações */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-11 sm:pl-0">
        {/* Score */}
        <div className="text-center">
          <p className={cn("text-xl font-bold tabular-nums", getScoreColor(candidate.notaGeral))}>
            {candidate.notaGeral !== null ? Math.round(candidate.notaGeral) : "-"}
          </p>
          <p className="text-xs text-muted-foreground">Score</p>
        </div>

        {/* Data */}
        <div className="text-center hidden sm:block">
          <p className="text-sm font-medium">{formatDate(candidate.concluidaEm)}</p>
          <p className="text-xs text-muted-foreground">Concluída</p>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href={`/candidatos/${candidate.candidatoId}/resultado?entrevistaId=${candidate.entrevistaId}`}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>

          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setConfirmAction({ type: "aprovar", ids: [candidate.id] })}>
                  <ThumbsUp className="h-4 w-4 mr-2 text-green-600" />
                  Aprovar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setConfirmAction({ type: "reprovar", ids: [candidate.id] })}>
                  <ThumbsDown className="h-4 w-4 mr-2 text-red-600" />
                  Reprovar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setConfirmAction({ type: "arquivar", ids: [candidate.id] })}>
                  <Archive className="h-4 w-4 mr-2" />
                  Arquivar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {showArchiveRestore && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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

  // Shortlist card (aprovados)
  const ShortlistCard = ({ candidate }: { candidate: PipelineCandidate }) => (
    <div
      className={cn(
        "group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border bg-card transition-all",
        selectedIds.has(candidate.id) && "border-green-500 bg-green-50/50",
        "hover:shadow-md hover:border-green-300"
      )}
    >
      {/* Checkbox + Avatar + Info */}
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <Checkbox
          checked={selectedIds.has(candidate.id)}
          onCheckedChange={() => toggleSelect(candidate.id)}
          className="mt-1 sm:mt-0"
        />
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
            {getInitials(candidate.nome)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium truncate">{candidate.nome}</p>
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Aprovado
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {candidate.cargo || candidate.entrevistaTitulo}
            {candidate.empresa && ` · ${candidate.empresa}`}
          </p>
        </div>
      </div>

      {/* Score + Ações */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-11 sm:pl-0">
        <div className="text-center">
          <p className={cn("text-xl font-bold tabular-nums", getScoreColor(candidate.notaGeral))}>
            {candidate.notaGeral !== null ? Math.round(candidate.notaGeral) : "-"}
          </p>
          <p className="text-xs text-muted-foreground">Score</p>
        </div>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href={`/candidatos/${candidate.candidatoId}/resultado?entrevistaId=${candidate.entrevistaId}`}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setConfirmAction({ type: "finalizar", ids: [candidate.id] })}>
                <CheckCheck className="h-4 w-4 mr-2 text-green-600" />
                Processo concluído
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

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Tarefas"
          description="Gerencie seus candidatos e processos seletivos"
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
          title="Tarefas"
          description="Gerencie seus candidatos e processos seletivos"
        />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erro ao carregar dados</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasAnyData = data.counts.pendentes > 0 || data.counts.shortlist > 0 || data.counts.arquivados > 0 || data.counts.emAndamento > 0;

  if (!hasAnyData) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Tarefas"
          description="Gerencie seus candidatos e processos seletivos"
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
              Crie uma entrevista e adicione candidatos para começar a gerenciar seu processo seletivo aqui.
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
    : activeTab === "shortlist"
    ? data.shortlist
    : data.arquivados;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tarefas"
        description="Gerencie seus candidatos e processos seletivos"
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
        <Card className="cursor-pointer hover:border-amber-300 transition-colors" onClick={() => setActiveTab("pendentes")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2.5">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.counts.pendentes}</p>
                <p className="text-xs text-muted-foreground">Aguardando avaliação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-green-300 transition-colors" onClick={() => setActiveTab("shortlist")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2.5">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.counts.shortlist}</p>
                <p className="text-xs text-muted-foreground">Na shortlist</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2.5">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.counts.emAndamento}</p>
                <p className="text-xs text-muted-foreground">Em andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-muted-foreground/30 transition-colors" onClick={() => setActiveTab("arquivados")}>
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
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="pendentes" className="flex-1 sm:flex-none gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Aguardando</span>
                  <Badge variant="secondary" className="ml-1">{data.counts.pendentes}</Badge>
                </TabsTrigger>
                <TabsTrigger value="shortlist" className="flex-1 sm:flex-none gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Shortlist</span>
                  <Badge variant="secondary" className="ml-1">{data.counts.shortlist}</Badge>
                </TabsTrigger>
                <TabsTrigger value="arquivados" className="flex-1 sm:flex-none gap-2">
                  <Archive className="h-4 w-4" />
                  <span className="hidden sm:inline">Arquivados</span>
                  <Badge variant="secondary" className="ml-1">{data.counts.arquivados}</Badge>
                </TabsTrigger>
              </TabsList>

              {/* Ações em lote */}
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2">
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
                  {activeTab === "shortlist" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setConfirmAction({ type: "finalizar", ids: Array.from(selectedIds) })}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <CheckCheck className="h-4 w-4 mr-1" />
                      Finalizar
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
          </CardHeader>

          <CardContent>
            {/* Header com select all */}
            {currentCandidates.length > 0 && (
              <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                <Checkbox
                  checked={selectedIds.size === currentCandidates.length && currentCandidates.length > 0}
                  onCheckedChange={() => toggleSelectAll(currentCandidates)}
                />
                <span className="text-sm text-muted-foreground">
                  Selecionar todos
                </span>
              </div>
            )}

            <TabsContent value="pendentes" className="mt-0 space-y-3">
              {data.pendentes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tudo em dia!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Não há candidatos aguardando avaliação no momento.
                  </p>
                </div>
              ) : (
                data.pendentes.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))
              )}
            </TabsContent>

            <TabsContent value="shortlist" className="mt-0 space-y-3">
              {data.shortlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Star className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Shortlist vazia</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Aprove candidatos para adicioná-los à sua shortlist.
                  </p>
                </div>
              ) : (
                data.shortlist.map((candidate) => (
                  <ShortlistCard key={candidate.id} candidate={candidate} />
                ))
              )}
            </TabsContent>

            <TabsContent value="arquivados" className="mt-0 space-y-3">
              {data.arquivados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Archive className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum arquivado</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Candidatos arquivados aparecerão aqui.
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

      {/* Dialog de confirmação */}
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
