"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  allowedLimits: number[];
}

export default function EntrevistasPage() {
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
  const [filteredEntrevistas, setFilteredEntrevistas] = useState<Entrevista[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ativas");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Buscar entrevistas do backend
  const fetchEntrevistas = useCallback(async (page: number, limit: number) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/entrevistas?page=${page}&limit=${limit}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar entrevistas");
      }

      const data = await response.json();
      console.log("API Response:", data);
      const entrevistasList = data.entrevistas || data;
      console.log("Entrevistas List:", entrevistasList);
      setEntrevistas(entrevistasList);
      setFilteredEntrevistas(entrevistasList);
      setPagination(data.pagination || null);
    } catch (error) {
      console.error("Erro ao buscar entrevistas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntrevistas(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchEntrevistas]);

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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} lines={3} showFooter />
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

        {/* Filtro por status */}
        <div className="flex p-1 bg-muted rounded-lg w-full">
          {[
            { value: "ativas", label: "Ativas", count: counts.ativas },
            { value: "todas", label: "Todas", count: counts.todas },
            { value: "encerradas", label: "Encerradas", count: counts.encerradas },
            { value: "arquivadas", label: "Arquivadas", count: counts.arquivadas },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer
                ${statusFilter === filter.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }
              `}
            >
              <span className="hidden sm:inline">{filter.label}</span>
              <span className="sm:hidden">{filter.label.slice(0, 5)}{filter.label.length > 5 ? '.' : ''}</span>
              <span className={`
                rounded-full px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold tabular-nums
                ${statusFilter === filter.value
                  ? "bg-primary/10 text-primary"
                  : "bg-muted-foreground/20 text-muted-foreground"
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
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredEntrevistas.map((entrevista) => (
              <EntrevistaCard key={entrevista.id} entrevista={entrevista} />
            ))}
          </div>

          {/* Paginação */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, pagination.total)} de {pagination.total}</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(parseInt(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[100px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(pagination.allowedLimits || [10, 20, 50, 100]).map((limit) => (
                      <SelectItem key={limit} value={limit.toString()}>
                        {limit} itens
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm px-2">
                  {currentPage} / {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage >= pagination.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
