"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Loader2, X } from "lucide-react";
import Link from "next/link";
import { EntrevistaCard } from "@/components/entrevistas/entrevista-card";
import { EntrevistasEmptyState } from "@/components/entrevistas/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SkeletonCard } from "@/components/ui/skeleton-card";

interface Entrevista {
  id: string;
  titulo: string;
  cargo: string | null;
  empresa: string | null;
  status: string;
  createdAt: Date;
  totalCandidatos: number;
  totalConcluiram: number;
  totalAprovados: number;
  mediaScore: number | null;
  totalPerguntas: number;
  slug: string | null;
}

export default function EntrevistasPage() {
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
  const [filteredEntrevistas, setFilteredEntrevistas] = useState<Entrevista[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  // Buscar entrevistas do backend
  useEffect(() => {
    async function fetchEntrevistas() {
      try {
        setLoading(true);

        

        const response = await fetch("/api/entrevistas", {
          });

        if (!response.ok) {
          throw new Error("Erro ao buscar entrevistas");
        }

        const data = await response.json();
        console.log("API Response:", data);
        const entrevistasList = data.entrevistas || data;
        console.log("Entrevistas List:", entrevistasList);
        setEntrevistas(entrevistasList);
        setFilteredEntrevistas(entrevistasList);
      } catch (error) {
        console.error("Erro ao buscar entrevistas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEntrevistas();
  }, []);

  // Filtrar entrevistas por status e busca
  useEffect(() => {
    let filtered = entrevistas;

    // Filtro por status
    if (statusFilter !== "todas") {
      const statusMap: Record<string, string[]> = {
        ativas: ["active", "publicada", "em_andamento"],
        encerradas: ["completed", "concluida"],
        arquivadas: ["archived", "cancelada"],
      };

      const statusValues = statusMap[statusFilter] || [];
      filtered = filtered.filter((e) => statusValues.includes(e.status));
    }

    // Filtro por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.titulo.toLowerCase().includes(query) ||
          e.cargo?.toLowerCase().includes(query) ||
          e.empresa?.toLowerCase().includes(query)
      );
    }

    setFilteredEntrevistas(filtered);
  }, [statusFilter, searchQuery, entrevistas]);

  // Contadores para as tabs
  const counts = {
    todas: entrevistas.length,
    ativas: entrevistas.filter((e) => ["active", "publicada", "em_andamento"].includes(e.status)).length,
    encerradas: entrevistas.filter((e) => ["completed", "concluida"].includes(e.status)).length,
    arquivadas: entrevistas.filter((e) => ["archived", "cancelada"].includes(e.status)).length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Minhas Entrevistas"
          description="Gerencie suas entrevistas e acompanhe os candidatos"
        >
          <Button asChild size="touch" className="w-full sm:w-auto">
            <Link href="/criar-entrevista">
              <Plus className="h-4 w-4" />
              Nova Entrevista
            </Link>
          </Button>
        </PageHeader>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} lines={4} showFooter />
          ))}
        </div>
      </div>
    );
  }

  // Mostrar empty state se não houver entrevistas
  if (entrevistas.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Minhas Entrevistas"
          description="Gerencie suas entrevistas e acompanhe os candidatos"
        >
          <Button asChild size="touch" className="w-full sm:w-auto">
            <Link href="/criar-entrevista">
              <Plus className="h-4 w-4" />
              Nova Entrevista
            </Link>
          </Button>
        </PageHeader>
        <EntrevistasEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Minhas Entrevistas"
        description={`${counts.todas} ${counts.todas === 1 ? "entrevista" : "entrevistas"} no total`}
      >
        <Button asChild size="touch" className="w-full sm:w-auto">
          <Link href="/criar-entrevista">
            <Plus className="h-4 w-4" />
            Nova Entrevista
          </Link>
        </Button>
      </PageHeader>

      {/* Filtros e busca */}
      <div className="flex flex-col gap-4">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, cargo ou empresa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filtro por status - Grid 2x2 no mobile, inline no desktop */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-muted/50 rounded-lg sm:inline-flex sm:gap-1 sm:bg-muted sm:p-1">
          {[
            { value: "todas", label: "Todas", count: counts.todas },
            { value: "ativas", label: "Ativas", count: counts.ativas },
            { value: "encerradas", label: "Encerr.", fullLabel: "Encerradas", count: counts.encerradas },
            { value: "arquivadas", label: "Arquiv.", fullLabel: "Arquivadas", count: counts.arquivadas },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`
                relative flex flex-col items-center justify-center gap-0.5 rounded-md px-2 py-2 text-xs font-medium transition-all cursor-pointer
                sm:flex-row sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm
                ${statusFilter === filter.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }
              `}
            >
              <span className="sm:hidden">{filter.label}</span>
              <span className="hidden sm:inline">{filter.fullLabel || filter.label}</span>
              <span className={`
                rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums
                sm:text-xs sm:px-2
                ${statusFilter === filter.value
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
                }
              `}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de entrevistas */}
      {filteredEntrevistas.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] py-12 space-y-4">
          <div className="rounded-full bg-muted p-4">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Nenhuma entrevista encontrada</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tente ajustar os filtros ou a busca
            </p>
          </div>
          <Button
            variant="outline"
            size="touch"
            onClick={() => {
              setStatusFilter("todas");
              setSearchQuery("");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {filteredEntrevistas.map((entrevista) => (
            <EntrevistaCard key={entrevista.id} entrevista={entrevista} />
          ))}
        </div>
      )}
    </div>
  );
}
