"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { EntrevistaCard } from "@/components/entrevistas/entrevista-card";
import { EntrevistasEmptyState } from "@/components/entrevistas/empty-state";

interface Entrevista {
  id: string;
  titulo: string;
  cargo: string | null;
  empresa: string | null;
  status: string;
  createdAt: Date;
  totalCandidatos: number;
  totalRespostas: number;
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

        // TODO: Substituir por session real quando implementar autenticação
        const userId = "123e4567-e89b-12d3-a456-426614174000";

        const response = await fetch("/api/entrevistas", {
          headers: {
            "x-user-id": userId,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar entrevistas");
        }

        const data = await response.json();
        setEntrevistas(data);
        setFilteredEntrevistas(data);
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
        ativas: ["publicada", "em_andamento"],
        encerradas: ["concluida"],
        rascunhos: ["rascunho"],
        canceladas: ["cancelada"],
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
    ativas: entrevistas.filter((e) => ["publicada", "em_andamento"].includes(e.status)).length,
    encerradas: entrevistas.filter((e) => e.status === "concluida").length,
    rascunhos: entrevistas.filter((e) => e.status === "rascunho").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Mostrar empty state se não houver entrevistas
  if (entrevistas.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Minhas Entrevistas</h1>
            <p className="text-muted-foreground">
              Gerencie suas entrevistas e acompanhe os candidatos
            </p>
          </div>
          <Button asChild>
            <Link href="/criar-entrevista">
              <Plus className="mr-2 h-4 w-4" />
              Nova Entrevista
            </Link>
          </Button>
        </div>
        <EntrevistasEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Entrevistas</h1>
          <p className="text-muted-foreground">
            {counts.todas} {counts.todas === 1 ? "entrevista" : "entrevistas"} no total
          </p>
        </div>
        <Button asChild>
          <Link href="/criar-entrevista">
            <Plus className="mr-2 h-4 w-4" />
            Nova Entrevista
          </Link>
        </Button>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Busca */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, cargo ou empresa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs de filtro */}
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="todas" className="text-xs sm:text-sm">
              Todas
              <span className="ml-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                {counts.todas}
              </span>
            </TabsTrigger>
            <TabsTrigger value="ativas" className="text-xs sm:text-sm">
              Ativas
              <span className="ml-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                {counts.ativas}
              </span>
            </TabsTrigger>
            <TabsTrigger value="encerradas" className="text-xs sm:text-sm">
              Encerradas
              <span className="ml-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                {counts.encerradas}
              </span>
            </TabsTrigger>
            <TabsTrigger value="rascunhos" className="text-xs sm:text-sm">
              Rascunhos
              <span className="ml-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                {counts.rascunhos}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Lista de entrevistas */}
      {filteredEntrevistas.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Filter className="h-12 w-12 text-muted-foreground/50" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Nenhuma entrevista encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou a busca
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setStatusFilter("todas");
              setSearchQuery("");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {filteredEntrevistas.map((entrevista) => (
            <EntrevistaCard key={entrevista.id} entrevista={entrevista} />
          ))}
        </div>
      )}
    </div>
  );
}
