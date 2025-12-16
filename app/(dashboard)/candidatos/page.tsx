"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mail, Phone, Briefcase, X, Loader2, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Entrevista {
  id: string;
  titulo: string;
  cargo: string | null;
}

interface CandidatoEntrevista {
  entrevistaId: string;
  entrevistaTitulo: string;
  entrevistaCargo: string | null;
  status: string;
  notaGeral: number | null;
  concluidaEm: Date | null;
}

interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  createdAt: Date;
  entrevistas: CandidatoEntrevista[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  allowedLimits: number[];
}

export default function CandidatosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [vagaFilter, setVagaFilter] = useState<string>("todas");
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Buscar candidatos
  const fetchCandidatos = useCallback(async (page: number, limit: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/candidatos?includeEntrevistas=true&page=${page}&limit=${limit}`);
      if (response.ok) {
        const data = await response.json();
        setCandidatos(data.candidatos || []);
        setPagination(data.pagination || null);
      }
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar entrevistas (para o filtro)
  useEffect(() => {
    async function fetchEntrevistas() {
      try {
        const response = await fetch("/api/entrevistas");
        if (response.ok) {
          const data = await response.json();
          setEntrevistas(data.entrevistas || []);
        }
      } catch (error) {
        console.error("Erro ao buscar entrevistas:", error);
      }
    }

    fetchEntrevistas();
  }, []);

  // Buscar candidatos quando mudar página ou itens por página
  useEffect(() => {
    fetchCandidatos(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchCandidatos]);

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Filtrar candidatos
  const filteredCandidatos = candidatos.filter((c) => {
    // Filtro por busca
    const matchesSearch = searchQuery
      ? c.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Filtro por vaga
    const matchesVaga = vagaFilter === "todas"
      ? true
      : c.entrevistas?.some(e => e.entrevistaId === vagaFilter);

    return matchesSearch && matchesVaga;
  });

  // Calcula a melhor nota do candidato
  const getMelhorNota = (candidato: Candidato) => {
    if (!candidato.entrevistas || candidato.entrevistas.length === 0) return null;
    const notas = candidato.entrevistas
      .filter(e => e.notaGeral !== null)
      .map(e => e.notaGeral as number);
    if (notas.length === 0) return null;
    return Math.max(...notas);
  };

  // Conta entrevistas concluídas
  const getEntrevistasConcluidas = (candidato: Candidato) => {
    if (!candidato.entrevistas) return 0;
    return candidato.entrevistas.filter(e => e.status === "concluida").length;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Banco de Candidatos"
          description="Gerencie todos os candidatos do processo seletivo"
        />
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banco de Candidatos"
        description="Gerencie todos os candidatos do processo seletivo"
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar candidatos por nome ou email..."
            className="pl-9 pr-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <Select value={vagaFilter} onValueChange={setVagaFilter}>
          <SelectTrigger className="w-full sm:w-[250px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por vaga" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as vagas</SelectItem>
            {entrevistas.map((entrevista) => (
              <SelectItem key={entrevista.id} value={entrevista.id}>
                {entrevista.titulo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredCandidatos.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] py-12 space-y-4">
          <div className="rounded-full bg-muted p-4">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Nenhum candidato encontrado</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {candidatos.length === 0
                ? "Nenhum candidato cadastrado ainda"
                : "Tente ajustar os filtros ou a busca"}
            </p>
          </div>
          {(searchQuery || vagaFilter !== "todas") && (
            <Button
              variant="outline"
              size="touch"
              onClick={() => {
                setSearchQuery("");
                setVagaFilter("todas");
              }}
            >
              Limpar filtros
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {filteredCandidatos.map((candidato) => {
              const melhorNota = getMelhorNota(candidato);
              const entrevistasConcluidas = getEntrevistasConcluidas(candidato);
              const totalEntrevistas = candidato.entrevistas?.length || 0;

              return (
                <Link key={candidato.id} href={`/candidatos/${candidato.id}`}>
                  <Card className="transition-shadow hover:shadow-md cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm sm:text-base">
                              {getInitials(candidato.nome)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1 min-w-0">
                            <CardTitle className="text-base sm:text-lg truncate">{candidato.nome}</CardTitle>
                            <CardDescription className="flex items-center gap-1 text-xs sm:text-sm">
                              <Briefcase className="h-3 w-3 shrink-0" />
                              <span className="truncate">
                                {totalEntrevistas === 0
                                  ? "Sem entrevistas"
                                  : `${totalEntrevistas} entrevista${totalEntrevistas > 1 ? 's' : ''}`}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                          {entrevistasConcluidas > 0 && (
                            <Badge variant="default" className="shrink-0">
                              {entrevistasConcluidas} concluída{entrevistasConcluidas > 1 ? 's' : ''}
                            </Badge>
                          )}
                          {melhorNota !== null && (
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">Melhor score</div>
                              <div className="flex items-center gap-2">
                                <span className="text-xl sm:text-2xl font-bold text-primary">
                                  {Math.round(melhorNota)}
                                </span>
                              </div>
                              <Progress value={melhorNota} className="h-1.5 w-16 mt-1" />
                            </div>
                          )}
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{candidato.email}</span>
                        </div>
                        {candidato.telefone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 shrink-0" />
                            <span>{candidato.telefone}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
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
