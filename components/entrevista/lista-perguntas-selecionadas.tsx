"use client";

import { useState } from "react";
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
  tecnica: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  experiencia: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  comportamental: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  situacional: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

const categoriaLabels: Record<string, string> = {
  tecnica: "Técnica",
  experiencia: "Experiência",
  comportamental: "Comportamental",
  situacional: "Situacional",
};

export function ListaPerguntasSelecionadas({
  perguntas,
  onRemover,
  onReordenar,
}: ListaPerguntasSelecionadasProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = draggedIndex;
    if (fromIndex !== null && fromIndex !== toIndex) {
      onReordenar(fromIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

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
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 bg-card hover:bg-accent/50 transition-colors group",
              draggedIndex === index && "opacity-50",
              dragOverIndex === index && draggedIndex !== index && "border-primary border-2"
            )}
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
                    {categoriaLabels[pergunta.categoria] || pergunta.categoria}
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
