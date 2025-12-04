"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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
  tecnica: "Técnica",
  comportamental: "Comportamental",
  soft_skill: "Soft Skill",
  hard_skill: "Hard Skill",
};

const categoriaColors: Record<string, string> = {
  tecnica: "bg-blue-500/10 text-blue-500",
  comportamental: "bg-purple-500/10 text-purple-500",
  soft_skill: "bg-green-500/10 text-green-500",
  hard_skill: "bg-orange-500/10 text-orange-500",
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

  // Filtrar perguntas
  const perguntasFiltradas = perguntas.filter((p) => {
    // Filtro por cargo e nível (se fornecidos)
    if (cargo && p.cargo !== cargo) return false;
    if (nivel && p.nivel !== nivel) return false;

    // Filtro por texto
    if (
      filtroTexto &&
      !p.texto.toLowerCase().includes(filtroTexto.toLowerCase()) &&
      !p.competencia.toLowerCase().includes(filtroTexto.toLowerCase())
    ) {
      return false;
    }

    // Filtro por categoria
    if (filtroCategoria !== "todas" && p.categoria !== filtroCategoria) {
      return false;
    }

    return true;
  });

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
      {/* Filtros */}
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
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas Categorias</SelectItem>
            <SelectItem value="tecnica">Técnicas</SelectItem>
            <SelectItem value="comportamental">Comportamentais</SelectItem>
            <SelectItem value="soft_skill">Soft Skills</SelectItem>
            <SelectItem value="hard_skill">Hard Skills</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Perguntas */}
      {perguntasFiltradas.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          Nenhuma pergunta encontrada.
          <br />
          <span className="text-sm">
            Tente ajustar os filtros ou crie uma pergunta nova.
          </span>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {perguntasFiltradas.map((pergunta) => {
            const jaSelecionada = perguntasSelecionadas.includes(pergunta.id);

            return (
              <div
                key={pergunta.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 transition-colors",
                  jaSelecionada
                    ? "bg-primary/5 border-primary"
                    : "hover:bg-accent"
                )}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className={categoriaColors[pergunta.categoria]}
                    >
                      {categoriaLabels[pergunta.categoria]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {pergunta.competencia}
                    </Badge>
                    {pergunta.isPadrao && (
                      <Badge variant="default" className="text-xs">
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
      )}

      <p className="text-xs text-muted-foreground text-center">
        {perguntasFiltradas.length} pergunta(s) disponível(is) para{" "}
        <strong>{cargo}</strong> nível <strong>{nivel}</strong>
      </p>
    </div>
  );
}
