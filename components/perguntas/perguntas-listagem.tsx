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
import { Search, Star, Edit, Trash2, EyeOff } from "lucide-react";
import { getLabelNivel } from "@/lib/constants/niveis";

interface PerguntasListagemProps {
  perguntas: PerguntaTemplate[];
  perguntasOcultasIds?: string[];
  onOcultarPergunta?: (perguntaId: string) => void;
  onReexibirPergunta?: (perguntaId: string) => void;
}

const categoriaColors: Record<string, string> = {
  conhecimento: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  experiencia: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  resolucao_problemas: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  habilidades_pessoais: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  qualificacoes: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
};

const categoriaLabels: Record<string, string> = {
  conhecimento: "Conhecimento",
  experiencia: "Experiência",
  resolucao_problemas: "Resolução de Problemas",
  habilidades_pessoais: "Habilidades Pessoais",
  qualificacoes: "Qualificações",
};

export function PerguntasListagem({
  perguntas,
  perguntasOcultasIds = [],
  onOcultarPergunta,
  onReexibirPergunta,
}: PerguntasListagemProps) {
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroCargo, setFiltroCargo] = useState<string>("todos");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroNivel, setFiltroNivel] = useState<string>("todos");
  const [mostrarOcultas, setMostrarOcultas] = useState(false);

  // Extrair valores únicos para filtros
  const cargos = Array.from(new Set(perguntas.map((p) => p.cargo)));
  const categorias = Array.from(new Set(perguntas.map((p) => p.categoria)));
  const niveis = Array.from(new Set(perguntas.map((p) => p.nivel)));

  // Aplicar filtros
  const perguntasFiltradas = perguntas.filter((pergunta) => {
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
  });

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

        <Select value={filtroCargo} onValueChange={setFiltroCargo}>
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

        <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
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

        <Select value={filtroNivel} onValueChange={setFiltroNivel}>
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
        {perguntasFiltradas.map((pergunta) => {
          const isOculta = perguntasOcultasIds.includes(pergunta.id);

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
                        <Badge variant="default" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
                          <Star className="mr-1 h-3 w-3" />
                          Padrão
                        </Badge>
                      )}
                      {isOculta && (
                        <Badge variant="secondary" className="bg-gray-500/10 text-gray-500">
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
                    {/* Botão de ocultar/reexibir para perguntas padrão */}
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
                        title={isOculta ? "Reexibir pergunta" : "Ocultar pergunta"}
                      >
                        <EyeOff className={`h-4 w-4 ${isOculta ? "text-primary" : ""}`} />
                      </Button>
                    )}
                    {/* Botões de editar/deletar para perguntas do usuário */}
                    {!pergunta.isPadrao && (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
    </div>
  );
}
