"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLabelNivel } from "@/lib/constants/niveis";

interface Pergunta {
  id: string;
  texto: string;
  cargo: string;
  nivel: string;
  categoria: string;
  competencia: string;
  isPadrao: boolean;
}

interface SelecionarPerguntasBancoProps {
  cargo?: string;
  nivel?: string;
  perguntasSelecionadas: string[];
  onSelecionar: (pergunta: Pergunta) => void;
}

const categoriaLabels: Record<string, string> = {
  conhecimento: "Conhecimento",
  experiencia: "Experiência",
  resolucao_problemas: "Resolução de Problemas",
  habilidades_pessoais: "Habilidades Pessoais",
  qualificacoes: "Qualificações",
};

const categoriaColors: Record<string, string> = {
  conhecimento: "bg-blue-500/10 text-blue-500",
  experiencia: "bg-purple-500/10 text-purple-500",
  resolucao_problemas: "bg-amber-500/10 text-amber-500",
  habilidades_pessoais: "bg-green-500/10 text-green-500",
  qualificacoes: "bg-orange-500/10 text-orange-500",
};

export function SelecionarPerguntasBanco({
  cargo,
  nivel,
  perguntasSelecionadas,
  onSelecionar,
}: SelecionarPerguntasBancoProps) {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroCargo, setFiltroCargo] = useState<string>("todos");
  const [filtroNivel, setFiltroNivel] = useState<string>("todos");
  const [tab, setTab] = useState<string>("recomendadas");

  useEffect(() => {
    async function fetchPerguntas() {
      try {
        const response = await fetch("/api/perguntas");
        const data = await response.json();
        setPerguntas(data);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPerguntas();
  }, []);

  // Extrair cargos e níveis únicos para os filtros
  const cargosUnicos = useMemo(() => {
    return Array.from(new Set(perguntas.map((p) => p.cargo))).sort();
  }, [perguntas]);

  const niveisUnicos = useMemo(() => {
    return Array.from(new Set(perguntas.map((p) => p.nivel)));
  }, [perguntas]);

  // Filtrar perguntas recomendadas (cargo e nível exatos)
  const perguntasRecomendadas = useMemo(() => {
    return perguntas.filter((p) => {
      if (cargo && p.cargo !== cargo) return false;
      if (nivel && p.nivel !== nivel) return false;

      if (
        filtroTexto &&
        !p.texto.toLowerCase().includes(filtroTexto.toLowerCase()) &&
        !(p.competencia && p.competencia.toLowerCase().includes(filtroTexto.toLowerCase()))
      ) {
        return false;
      }

      if (filtroCategoria !== "todas" && p.categoria !== filtroCategoria) {
        return false;
      }

      return true;
    });
  }, [perguntas, cargo, nivel, filtroTexto, filtroCategoria]);

  // Filtrar todas as perguntas (busca expandida)
  const todasPerguntasFiltradas = useMemo(() => {
    return perguntas.filter((p) => {
      if (filtroCargo !== "todos" && p.cargo !== filtroCargo) return false;
      if (filtroNivel !== "todos" && p.nivel !== filtroNivel) return false;

      if (
        filtroTexto &&
        !p.texto.toLowerCase().includes(filtroTexto.toLowerCase()) &&
        !(p.competencia && p.competencia.toLowerCase().includes(filtroTexto.toLowerCase()))
      ) {
        return false;
      }

      if (filtroCategoria !== "todas" && p.categoria !== filtroCategoria) {
        return false;
      }

      return true;
    });
  }, [perguntas, filtroCargo, filtroNivel, filtroTexto, filtroCategoria]);

  if (loading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Carregando perguntas...
      </div>
    );
  }

  if (!cargo || !nivel) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Selecione o cargo e nível acima para ver perguntas sugeridas
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recomendadas" className="gap-2">
            <Star className="h-4 w-4" />
            Recomendadas ({perguntasRecomendadas.length})
          </TabsTrigger>
          <TabsTrigger value="todas">
            Todas as Perguntas ({perguntas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recomendadas" className="space-y-4 mt-4">
          {/* Filtros para recomendadas */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar perguntas..."
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas Categorias</SelectItem>
                <SelectItem value="conhecimento">Conhecimento</SelectItem>
                <SelectItem value="experiencia">Experiência</SelectItem>
                <SelectItem value="resolucao_problemas">Resolução de Problemas</SelectItem>
                <SelectItem value="habilidades_pessoais">Habilidades Pessoais</SelectItem>
                <SelectItem value="qualificacoes">Qualificações</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-xs text-muted-foreground">
            Perguntas específicas para <strong>{cargo}</strong> nível <strong>{getLabelNivel(nivel)}</strong>
          </p>

          <ListaPerguntas
            perguntas={perguntasRecomendadas}
            perguntasSelecionadas={perguntasSelecionadas}
            onSelecionar={onSelecionar}
            cargoAtual={cargo}
          />
        </TabsContent>

        <TabsContent value="todas" className="space-y-4 mt-4">
          {/* Filtros expandidos */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar perguntas..."
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroCargo} onValueChange={setFiltroCargo}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Cargos</SelectItem>
                {cargosUnicos.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c} {c === cargo && "(atual)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroNivel} onValueChange={setFiltroNivel}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Níveis</SelectItem>
                {niveisUnicos.map((n) => (
                  <SelectItem key={n} value={n}>
                    {getLabelNivel(n)} {n === nivel && "(atual)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas Categorias</SelectItem>
                <SelectItem value="conhecimento">Conhecimento</SelectItem>
                <SelectItem value="experiencia">Experiência</SelectItem>
                <SelectItem value="resolucao_problemas">Resolução de Problemas</SelectItem>
                <SelectItem value="habilidades_pessoais">Habilidades Pessoais</SelectItem>
                <SelectItem value="qualificacoes">Qualificações</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-xs text-muted-foreground">
            Busque perguntas de qualquer cargo para complementar sua entrevista.
            <br />
            <span className="text-primary">Dica:</span> Para um Gerente de TI, adicione perguntas de &quot;Desenvolvedor Senior&quot; para avaliar conhecimento técnico.
          </p>

          <ListaPerguntas
            perguntas={todasPerguntasFiltradas}
            perguntasSelecionadas={perguntasSelecionadas}
            onSelecionar={onSelecionar}
            cargoAtual={cargo}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente auxiliar para lista de perguntas
function ListaPerguntas({
  perguntas,
  perguntasSelecionadas,
  onSelecionar,
  cargoAtual,
}: {
  perguntas: Pergunta[];
  perguntasSelecionadas: string[];
  onSelecionar: (pergunta: Pergunta) => void;
  cargoAtual?: string;
}) {
  if (perguntas.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Nenhuma pergunta encontrada.
        <br />
        <span className="text-sm">
          Tente ajustar os filtros ou crie uma pergunta nova.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {perguntas.map((pergunta) => {
        const jaSelecionada = perguntasSelecionadas.includes(pergunta.id);
        const isOutroCargo = cargoAtual && pergunta.cargo !== cargoAtual;

        return (
          <div
            key={pergunta.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 transition-colors",
              jaSelecionada
                ? "bg-primary/5 border-primary"
                : isOutroCargo
                ? "bg-muted/30 hover:bg-muted/50"
                : "hover:bg-accent"
            )}
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={categoriaColors[pergunta.categoria]}
                >
                  {categoriaLabels[pergunta.categoria] || pergunta.categoria}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {pergunta.cargo}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getLabelNivel(pergunta.nivel)}
                </Badge>
                {pergunta.competencia && (
                  <Badge variant="secondary" className="text-xs">
                    {pergunta.competencia}
                  </Badge>
                )}
                {pergunta.isPadrao && (
                  <Badge variant="default" className="text-xs bg-yellow-500/10 text-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    Padrão
                  </Badge>
                )}
              </div>
              <p className="text-sm leading-relaxed">{pergunta.texto}</p>
            </div>
            <Button
              type="button"
              size="sm"
              variant={jaSelecionada ? "secondary" : "outline"}
              onClick={() => !jaSelecionada && onSelecionar(pergunta)}
              disabled={jaSelecionada}
            >
              {jaSelecionada ? (
                "Adicionada"
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
