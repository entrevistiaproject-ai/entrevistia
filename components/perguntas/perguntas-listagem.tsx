"use client";

import { useState } from "react";
import { PerguntaTemplate } from "@/lib/db/schema";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Star, Edit, Trash2, EyeOff, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { getLabelNivel } from "@/lib/constants/niveis";

interface PerguntasListagemProps {
  perguntas: PerguntaTemplate[];
  perguntasOcultasIds?: string[];
  perguntasFavoritasIds?: string[];
  onOcultarPergunta?: (perguntaId: string) => void;
  onReexibirPergunta?: (perguntaId: string) => void;
  onFavoritarPergunta?: (perguntaId: string) => void;
  onDesfavoritarPergunta?: (perguntaId: string) => void;
  onEditarPergunta?: (perguntaId: string) => void;
  onDeletarPergunta?: (perguntaId: string) => void;
  // Props controlados para sincronizar filtros com KPIs
  onFilterChange?: (tipo: "cargo" | "categoria" | "nivel", valor: string) => void;
  filtroCargo?: string;
  filtroCategoria?: string;
  filtroNivel?: string;
}

const categoriaColors: Record<string, string> = {
  tecnica: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800",
  experiencia: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800",
  comportamental: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800",
  situacional: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-800",
};

const categoriaLabels: Record<string, string> = {
  tecnica: "Técnica",
  experiencia: "Experiência",
  comportamental: "Comportamental",
  situacional: "Situacional",
};

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export function PerguntasListagem({
  perguntas,
  perguntasOcultasIds = [],
  perguntasFavoritasIds = [],
  onOcultarPergunta,
  onReexibirPergunta,
  onFavoritarPergunta,
  onDesfavoritarPergunta,
  onEditarPergunta,
  onDeletarPergunta,
  onFilterChange,
  filtroCargo: filtroCargoControlado,
  filtroCategoria: filtroCategoriaControlado,
  filtroNivel: filtroNivelControlado,
}: PerguntasListagemProps) {
  const [filtroTexto, setFiltroTexto] = useState("");
  // Usar valores controlados se fornecidos, senão usar estado local
  const [filtroCargoLocal, setFiltroCargoLocal] = useState<string>("todos");
  const [filtroCategoriaLocal, setFiltroCategoriaLocal] = useState<string>("todas");
  const [filtroNivelLocal, setFiltroNivelLocal] = useState<string>("todos");
  const [mostrarOcultas, setMostrarOcultas] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Usar valores controlados se fornecidos
  const filtroCargo = filtroCargoControlado ?? filtroCargoLocal;
  const filtroCategoria = filtroCategoriaControlado ?? filtroCategoriaLocal;
  const filtroNivel = filtroNivelControlado ?? filtroNivelLocal;

  // Extrair valores únicos para filtros
  const cargos = Array.from(new Set(perguntas.map((p) => p.cargo)));
  const categorias = Array.from(new Set(perguntas.map((p) => p.categoria)));
  const niveis = Array.from(new Set(perguntas.map((p) => p.nivel)));

  // Aplicar filtros
  const perguntasFiltradas = perguntas
    .filter((pergunta) => {
      // Filtrar ocultas
      const isOculta = perguntasOcultasIds.includes(pergunta.id);
      if (!mostrarOcultas && isOculta) return false;

      const matchTexto =
        filtroTexto === "" ||
        pergunta.texto.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        (pergunta.competencia && pergunta.competencia.toLowerCase().includes(filtroTexto.toLowerCase()));

      const matchCargo =
        filtroCargo === "todos" || pergunta.cargo === filtroCargo;

      const matchCategoria =
        filtroCategoria === "todas" || pergunta.categoria === filtroCategoria;

      const matchNivel =
        filtroNivel === "todos" || pergunta.nivel === filtroNivel;

      return matchTexto && matchCargo && matchCategoria && matchNivel;
    })
    // Ordenar favoritas primeiro
    .sort((a, b) => {
      const aFavorita = perguntasFavoritasIds.includes(a.id);
      const bFavorita = perguntasFavoritasIds.includes(b.id);
      if (aFavorita && !bFavorita) return -1;
      if (!aFavorita && bFavorita) return 1;
      return 0;
    });

  // Paginação client-side
  const totalPages = Math.ceil(perguntasFiltradas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const perguntasPaginadas = perguntasFiltradas.slice(startIndex, endIndex);

  // Handlers de filtro que notificam o pai
  const handleCargoChange = (value: string) => {
    if (onFilterChange) {
      onFilterChange("cargo", value);
    } else {
      setFiltroCargoLocal(value);
    }
    setCurrentPage(1);
  };

  const handleCategoriaChange = (value: string) => {
    if (onFilterChange) {
      onFilterChange("categoria", value);
    } else {
      setFiltroCategoriaLocal(value);
    }
    setCurrentPage(1);
  };

  const handleNivelChange = (value: string) => {
    if (onFilterChange) {
      onFilterChange("nivel", value);
    } else {
      setFiltroNivelLocal(value);
    }
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por texto ou competência..."
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filtroCargo} onValueChange={handleCargoChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Cargo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Cargos</SelectItem>
            {cargos.map((cargo) => (
              <SelectItem key={cargo} value={cargo}>
                {cargo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtroCategoria} onValueChange={handleCategoriaChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas Categorias</SelectItem>
            {categorias.map((categoria) => (
              <SelectItem key={categoria} value={categoria}>
                {categoriaLabels[categoria] || categoria}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtroNivel} onValueChange={handleNivelChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Níveis</SelectItem>
            {niveis.map((nivel) => (
              <SelectItem key={nivel} value={nivel}>
                {getLabelNivel(nivel)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Toggle para mostrar ocultas */}
      {perguntasOcultasIds.length > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMostrarOcultas(!mostrarOcultas)}
          >
            <EyeOff className="mr-2 h-4 w-4" />
            {mostrarOcultas ? "Esconder ocultas" : `Mostrar ocultas (${perguntasOcultasIds.length})`}
          </Button>
        </div>
      )}

      {/* Resultados */}
      <div className="text-sm text-muted-foreground">
        Mostrando {perguntasFiltradas.length} de {perguntas.length} perguntas
      </div>

      {/* Grid de Perguntas */}
      <div className="grid gap-4 md:grid-cols-2">
        {perguntasPaginadas.map((pergunta) => {
          const isOculta = perguntasOcultasIds.includes(pergunta.id);
          const isFavorita = perguntasFavoritasIds.includes(pergunta.id);

          return (
            <Card
              key={pergunta.id}
              className={`hover:shadow-md transition-shadow ${isOculta ? "opacity-60" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={categoriaColors[pergunta.categoria] || ""}
                      >
                        {categoriaLabels[pergunta.categoria] || pergunta.categoria}
                      </Badge>
                      <Badge variant="outline">{pergunta.cargo}</Badge>
                      <Badge variant="outline">{getLabelNivel(pergunta.nivel)}</Badge>
                      {pergunta.isPadrao && (
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                          Padrão
                        </Badge>
                      )}
                      {isFavorita && (
                        <Badge variant="default" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800">
                          <Star className="mr-1 h-3 w-3 fill-current" />
                          Favorita
                        </Badge>
                      )}
                      {isOculta && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          <EyeOff className="mr-1 h-3 w-3" />
                          Oculta
                        </Badge>
                      )}
                    </div>
                    {pergunta.competencia && (
                      <CardTitle className="text-base">
                        {pergunta.competencia}
                      </CardTitle>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {/* Botão de favoritar/desfavoritar para todas as perguntas */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        if (isFavorita) {
                          onDesfavoritarPergunta?.(pergunta.id);
                        } else {
                          onFavoritarPergunta?.(pergunta.id);
                        }
                      }}
                      title={isFavorita ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Star className={`h-4 w-4 ${isFavorita ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </Button>
                    {/* Botão de ocultar/restaurar para perguntas padrão */}
                    {pergunta.isPadrao && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          if (isOculta) {
                            onReexibirPergunta?.(pergunta.id);
                          } else {
                            onOcultarPergunta?.(pergunta.id);
                          }
                        }}
                        title={isOculta ? "Restaurar pergunta" : "Ocultar pergunta"}
                      >
                        {isOculta ? (
                          <RotateCcw className="h-4 w-4 text-primary" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {/* Botões de editar/deletar para perguntas do usuário */}
                    {!pergunta.isPadrao && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onEditarPergunta?.(pergunta.id)}
                          title="Editar pergunta"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => onDeletarPergunta?.(pergunta.id)}
                          title="Excluir pergunta"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {pergunta.texto}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {perguntasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhuma pergunta encontrada com os filtros selecionados.
          </p>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Mostrando {startIndex + 1} a {Math.min(endIndex, perguntasFiltradas.length)} de {perguntasFiltradas.length}</span>
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
                {ITEMS_PER_PAGE_OPTIONS.map((limit) => (
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
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
