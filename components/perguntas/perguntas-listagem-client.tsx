"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { PerguntaTemplate } from "@/lib/db/schema";
import { PerguntasListagem } from "./perguntas-listagem";
import { GerenciarVisibilidade } from "./gerenciar-visibilidade";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Settings, AlertCircle, Loader2, FileQuestion, Star, User, Briefcase, Tag, BarChart3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AREAS_LABELS, AreaProfissional } from "@/lib/db/seeds/banco-perguntas-v4/types";
import { getLabelNivel } from "@/lib/constants/niveis";

interface PerguntasListagemClientProps {
  perguntas: PerguntaTemplate[];
  perguntasOcultasIdsInicial: string[];
  perguntasFavoritasIdsInicial: string[];
}

// Labels das categorias
const categoriaLabels: Record<string, string> = {
  tecnica: "Técnica",
  experiencia: "Experiência",
  comportamental: "Comportamental",
  situacional: "Situacional",
};

// Cores das categorias para os badges
const categoriaBgColors: Record<string, string> = {
  tecnica: "bg-blue-100 dark:bg-blue-900/30",
  experiencia: "bg-purple-100 dark:bg-purple-900/30",
  comportamental: "bg-green-100 dark:bg-green-900/30",
  situacional: "bg-amber-100 dark:bg-amber-900/30",
};

const categoriaTextColors: Record<string, string> = {
  tecnica: "text-blue-700 dark:text-blue-300",
  experiencia: "text-purple-700 dark:text-purple-300",
  comportamental: "text-green-700 dark:text-green-300",
  situacional: "text-amber-700 dark:text-amber-300",
};

export function PerguntasListagemClient({
  perguntas,
  perguntasOcultasIdsInicial,
  perguntasFavoritasIdsInicial,
}: PerguntasListagemClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [perguntasOcultasIds, setPerguntasOcultasIds] = useState<string[]>(
    perguntasOcultasIdsInicial
  );
  const [perguntasFavoritasIds, setPerguntasFavoritasIds] = useState<string[]>(
    perguntasFavoritasIdsInicial
  );
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cargosVisiveis, setCargosVisiveis] = useState<string[]>([]);
  const [onboardingCompleted, setOnboardingCompleted] = useState(true);
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const [areaFilter, setAreaFilter] = useState<AreaProfissional | "all">("all");

  // Filtros do componente de listagem (para KPIs dinâmicos)
  const [filtroCargo, setFiltroCargo] = useState<string>("todos");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroNivel, setFiltroNivel] = useState<string>("todos");

  // Carrega preferências de cargos
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const response = await fetch("/api/user/cargo-preferences");
        if (response.ok) {
          const data = await response.json();
          setCargosVisiveis(data.cargosVisiveis || []);
          setOnboardingCompleted(data.onboardingCompleted ?? true);
        }
      } catch (error) {
        console.error("Erro ao carregar preferências:", error);
      } finally {
        setLoadingPreferences(false);
      }
    };
    loadPreferences();
  }, []);

  // Filtra perguntas baseado em cargos visíveis e área selecionada (filtro base)
  const perguntasBase = useMemo(() => {
    return perguntas.filter((pergunta) => {
      // Se não é pergunta padrão, sempre mostra
      if (!pergunta.isPadrao) return true;

      // Se cargosVisiveis está vazio e onboarding não foi completado, não mostra perguntas padrão
      if (cargosVisiveis.length === 0 && onboardingCompleted) return false;

      // Se cargosVisiveis está vazio e onboarding foi completado, mostra todas (comportamento legado)
      if (cargosVisiveis.length === 0 && !onboardingCompleted) return true;

      // Verifica se o cargo da pergunta está nos cargos visíveis
      const cargoVisivel = cargosVisiveis.includes(pergunta.cargo);
      if (!cargoVisivel) return false;

      // Filtra por área se selecionada
      if (areaFilter !== "all") {
        return pergunta.area === areaFilter;
      }

      return true;
    });
  }, [perguntas, cargosVisiveis, onboardingCompleted, areaFilter]);

  // Perguntas após aplicar todos os filtros (incluindo cargo, categoria, nível)
  const perguntasFiltradas = useMemo(() => {
    return perguntasBase.filter((pergunta) => {
      // Filtra por ocultas
      if (perguntasOcultasIds.includes(pergunta.id)) return false;

      // Filtro por cargo
      if (filtroCargo !== "todos" && pergunta.cargo !== filtroCargo) return false;

      // Filtro por categoria
      if (filtroCategoria !== "todas" && pergunta.categoria !== filtroCategoria) return false;

      // Filtro por nível
      if (filtroNivel !== "todos" && pergunta.nivel !== filtroNivel) return false;

      return true;
    });
  }, [perguntasBase, perguntasOcultasIds, filtroCargo, filtroCategoria, filtroNivel]);

  // KPIs calculados baseados nas perguntas filtradas
  const kpis = useMemo(() => {
    const total = perguntasFiltradas.length;
    const doSistema = perguntasFiltradas.filter(p => p.isPadrao).length;
    const criadasPorVoce = perguntasFiltradas.filter(p => !p.isPadrao).length;
    const cargosUnicos = new Set(perguntasFiltradas.map(p => p.cargo)).size;

    // Contagem por categoria
    const porCategoria: Record<string, number> = {};
    perguntasFiltradas.forEach(p => {
      porCategoria[p.categoria] = (porCategoria[p.categoria] || 0) + 1;
    });

    return {
      total,
      doSistema,
      criadasPorVoce,
      cargosUnicos,
      porCategoria,
    };
  }, [perguntasFiltradas]);

  // Callbacks para atualizar filtros vindos do componente de listagem
  const handleFilterChange = useCallback((tipo: "cargo" | "categoria" | "nivel", valor: string) => {
    switch (tipo) {
      case "cargo":
        setFiltroCargo(valor);
        break;
      case "categoria":
        setFiltroCategoria(valor);
        break;
      case "nivel":
        setFiltroNivel(valor);
        break;
    }
  }, []);

  const handleRefreshPreferences = async () => {
    try {
      const response = await fetch("/api/user/cargo-preferences");
      if (response.ok) {
        const data = await response.json();
        setCargosVisiveis(data.cargosVisiveis || []);
        setOnboardingCompleted(data.onboardingCompleted ?? true);
      }
    } catch (error) {
      console.error("Erro ao recarregar preferências:", error);
    }
    router.refresh();
  };

  const handleOcultarPergunta = async (perguntaId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/perguntas/ocultar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perguntaId }),
      });

      if (response.ok) {
        setPerguntasOcultasIds([...perguntasOcultasIds, perguntaId]);
        toast({
          title: "Pergunta ocultada",
          description: "A pergunta foi ocultada da sua lista.",
        });
        router.refresh();
      } else {
        throw new Error("Erro ao ocultar pergunta");
      }
    } catch (error) {
      console.error("Erro ao ocultar pergunta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível ocultar a pergunta.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReexibirPergunta = async (perguntaId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/perguntas/ocultar?perguntaId=${perguntaId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setPerguntasOcultasIds(
          perguntasOcultasIds.filter((id) => id !== perguntaId)
        );
        toast({
          title: "Pergunta reexibida",
          description: "A pergunta está visível novamente.",
        });
        router.refresh();
      } else {
        throw new Error("Erro ao reexibir pergunta");
      }
    } catch (error) {
      console.error("Erro ao reexibir pergunta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível reexibir a pergunta.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritarPergunta = async (perguntaId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/perguntas/favoritar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perguntaId }),
      });

      if (response.ok) {
        setPerguntasFavoritasIds([...perguntasFavoritasIds, perguntaId]);
        toast({
          title: "Pergunta favoritada",
          description: "A pergunta foi adicionada aos seus favoritos.",
        });
        router.refresh();
      } else {
        throw new Error("Erro ao favoritar pergunta");
      }
    } catch (error) {
      console.error("Erro ao favoritar pergunta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível favoritar a pergunta.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDesfavoritarPergunta = async (perguntaId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/perguntas/favoritar?perguntaId=${perguntaId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setPerguntasFavoritasIds(
          perguntasFavoritasIds.filter((id) => id !== perguntaId)
        );
        toast({
          title: "Pergunta removida dos favoritos",
          description: "A pergunta foi removida dos seus favoritos.",
        });
        router.refresh();
      } else {
        throw new Error("Erro ao desfavoritar pergunta");
      }
    } catch (error) {
      console.error("Erro ao desfavoritar pergunta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a pergunta dos favoritos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditarPergunta = (perguntaId: string) => {
    router.push(`/perguntas/${perguntaId}/editar`);
  };

  const handleDeletarPergunta = async (perguntaId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/perguntas/${perguntaId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Pergunta excluída",
          description: "A pergunta foi excluída com sucesso.",
        });
        router.refresh();
      } else {
        const data = await response.json();
        throw new Error(data.error || "Erro ao excluir pergunta");
      }
    } catch (error: any) {
      console.error("Erro ao deletar pergunta:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir a pergunta.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Perguntas padrão visíveis (para estatísticas do info text)
  const perguntasPadraoVisiveis = perguntasBase.filter(
    (p) => p.isPadrao && !perguntasOcultasIds.includes(p.id)
  );

  // Verifica se o banco está vazio por causa das preferências
  const bancoVazioPorPreferencias =
    onboardingCompleted &&
    cargosVisiveis.length === 0 &&
    perguntas.filter((p) => p.isPadrao).length > 0;

  // Labels para exibição dos filtros selecionados
  const cargoSelecionadoLabel = filtroCargo === "todos" ? "Todos" : filtroCargo;
  const nivelSelecionadoLabel = filtroNivel === "todos" ? "Todos" : getLabelNivel(filtroNivel);

  if (loadingPreferences) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPIs - Cards de estatísticas */}
      <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {/* Total disponíveis */}
          <div className="rounded-xl border bg-card p-5 sm:p-6 min-w-[140px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <FileQuestion className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{kpis.total}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Disponíveis</p>
          </div>
          {/* Do sistema */}
          <div className="rounded-xl border bg-card p-5 sm:p-6 min-w-[140px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Star className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{kpis.doSistema}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Do sistema</p>
          </div>
          {/* Criadas por você */}
          <div className="rounded-xl border bg-card p-5 sm:p-6 min-w-[140px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{kpis.criadasPorVoce}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Criadas por você</p>
          </div>
          {/* Cargos cobertos */}
          <div className="rounded-xl border bg-card p-5 sm:p-6 min-w-[140px] sm:min-w-0 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{kpis.cargosUnicos}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Cargos cobertos</p>
          </div>
        </div>
      </div>

      {/* Filtros selecionados e quantidade por categoria */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg bg-muted/50 border">
        {/* Cargo selecionado */}
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Cargo:</span>
          <span className="text-sm font-medium">{cargoSelecionadoLabel}</span>
        </div>
        <div className="w-px h-4 bg-border hidden sm:block" />
        {/* Nível selecionado */}
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Nível:</span>
          <span className="text-sm font-medium">{nivelSelecionadoLabel}</span>
        </div>
        <div className="w-px h-4 bg-border hidden sm:block" />
        {/* Quantidade por categoria */}
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Por tipo:</span>
          {Object.entries(kpis.porCategoria).length > 0 ? (
            Object.entries(kpis.porCategoria).map(([cat, count]) => (
              <span
                key={cat}
                className={`text-xs px-2 py-0.5 rounded-full ${categoriaBgColors[cat] || "bg-gray-100"} ${categoriaTextColors[cat] || "text-gray-700"}`}
              >
                {categoriaLabels[cat] || cat}: {count}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
      </div>

      {/* Alerta se o banco está vazio por causa das preferências */}
      {bancoVazioPorPreferencias && (
        <div className="p-4 bg-warning-bg border border-warning-border rounded-lg flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <AlertCircle className="w-5 h-5 text-warning-icon shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warning-text">
                Seu banco de perguntas padrão está vazio
              </p>
              <p className="text-sm text-warning-text/80 mt-1">
                Selecione as áreas e cargos de seu interesse para ver as
                perguntas prontas do sistema.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setDrawerOpen(true)}
            className="shrink-0"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurar visibilidade
          </Button>
        </div>
      )}

      {/* Header com filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Filtro por área */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Área:
          </span>
          <Select
            value={areaFilter}
            onValueChange={(value) =>
              setAreaFilter(value as AreaProfissional | "all")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas as áreas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as áreas</SelectItem>
              {(Object.keys(AREAS_LABELS) as AreaProfissional[]).map((area) => (
                <SelectItem key={area} value={area}>
                  {AREAS_LABELS[area]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Espaçador */}
        <div className="flex-1" />

        {/* Botão de gerenciar visibilidade */}
        <Button
          variant="outline"
          onClick={() => setDrawerOpen(true)}
          className="shrink-0"
        >
          <Settings className="w-4 h-4 mr-2" />
          Gerenciar visibilidade
        </Button>
      </div>

      {/* Info sobre perguntas visíveis */}
      {!bancoVazioPorPreferencias && cargosVisiveis.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Exibindo {perguntasPadraoVisiveis.length} perguntas padrão de{" "}
          {cargosVisiveis.length} cargo(s) selecionado(s)
          {areaFilter !== "all" && ` na área ${AREAS_LABELS[areaFilter]}`}
        </p>
      )}

      {/* Listagem de Perguntas */}
      <PerguntasListagem
        perguntas={perguntasBase}
        perguntasOcultasIds={perguntasOcultasIds}
        perguntasFavoritasIds={perguntasFavoritasIds}
        onOcultarPergunta={handleOcultarPergunta}
        onReexibirPergunta={handleReexibirPergunta}
        onFavoritarPergunta={handleFavoritarPergunta}
        onDesfavoritarPergunta={handleDesfavoritarPergunta}
        onEditarPergunta={handleEditarPergunta}
        onDeletarPergunta={handleDeletarPergunta}
        onFilterChange={handleFilterChange}
        filtroCargo={filtroCargo}
        filtroCategoria={filtroCategoria}
        filtroNivel={filtroNivel}
      />

      {/* Drawer de gerenciar visibilidade */}
      <GerenciarVisibilidade
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSave={handleRefreshPreferences}
      />
    </div>
  );
}
