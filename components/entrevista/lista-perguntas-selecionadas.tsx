"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, Database, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerguntaSelecionada {
  id: string;
  texto: string;
  competencia?: string;
  categoria?: string;
  origem: "banco" | "nova";
  salvarNoBanco?: boolean;
}

interface ListaPerguntasSelecionadasProps {
  perguntas: PerguntaSelecionada[];
  onRemover: (id: string) => void;
  onReordenar: (fromIndex: number, toIndex: number) => void;
}

const categoriaColors: Record<string, string> = {
  tecnica: "bg-blue-500/10 text-blue-500",
  comportamental: "bg-purple-500/10 text-purple-500",
  soft_skill: "bg-green-500/10 text-green-500",
  hard_skill: "bg-orange-500/10 text-orange-500",
};

export function ListaPerguntasSelecionadas({
  perguntas,
  onRemover,
  onReordenar,
}: ListaPerguntasSelecionadasProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          Perguntas Selecionadas ({perguntas.length})
        </h3>
        <Badge variant="outline" className="text-xs">
          Arraste para reordenar
        </Badge>
      </div>

      <div className="space-y-2">
        {perguntas.map((pergunta, index) => (
          <div
            key={pergunta.id}
            className="flex items-start gap-3 rounded-lg border p-4 bg-card hover:bg-accent/50 transition-colors group"
          >
            {/* Handle para arrastar */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="h-4 w-4 cursor-grab active:cursor-grabbing" />
              <span className="text-sm font-medium text-foreground">
                {index + 1}
              </span>
            </div>

            {/* Conteúdo da pergunta */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Indicador de origem */}
                {pergunta.origem === "banco" ? (
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Database className="h-3 w-3" />
                    Do Banco
                  </Badge>
                ) : (
                  <Badge
                    variant={pergunta.salvarNoBanco ? "default" : "outline"}
                    className="text-xs gap-1"
                  >
                    <FileText className="h-3 w-3" />
                    {pergunta.salvarNoBanco ? "Nova (salvar)" : "Nova"}
                  </Badge>
                )}

                {/* Categoria */}
                {pergunta.categoria && (
                  <Badge
                    variant="secondary"
                    className={cn("text-xs", categoriaColors[pergunta.categoria])}
                  >
                    {pergunta.categoria.replace("_", " ")}
                  </Badge>
                )}

                {/* Competência */}
                {pergunta.competencia && (
                  <Badge variant="outline" className="text-xs">
                    {pergunta.competencia}
                  </Badge>
                )}
              </div>

              <p className="text-sm leading-relaxed">{pergunta.texto}</p>
            </div>

            {/* Botão Remover */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemover(pergunta.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <span>
          {perguntas.filter((p) => p.origem === "banco").length} do banco •{" "}
          {perguntas.filter((p) => p.origem === "nova").length} novas
        </span>
        <span>
          {perguntas.filter((p) => p.salvarNoBanco).length} para salvar no banco
        </span>
      </div>
    </div>
  );
}
