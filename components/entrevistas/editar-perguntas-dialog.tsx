"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Loader2, AlertTriangle, Plus, Trash2, GripVertical } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Pergunta {
  id: string;
  texto: string;
  ordem: number;
}

interface EditarPerguntasDialogProps {
  entrevistaId: string;
  perguntas: Pergunta[];
  temCandidatos: boolean;
  onSuccess?: () => void;
}

export function EditarPerguntasDialog({
  entrevistaId,
  perguntas: perguntasIniciais,
  temCandidatos,
  onSuccess,
}: EditarPerguntasDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perguntas, setPerguntas] = useState<{ id?: string; texto: string; ordem: number }[]>([]);
  const [novaPergunta, setNovaPergunta] = useState("");

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset para valores atuais ao abrir
      setPerguntas(
        perguntasIniciais.map((p) => ({
          id: p.id,
          texto: p.texto,
          ordem: p.ordem,
        }))
      );
      setNovaPergunta("");
    }
    setOpen(newOpen);
  };

  const handleAddPergunta = () => {
    if (!novaPergunta.trim()) return;

    setPerguntas([
      ...perguntas,
      {
        texto: novaPergunta.trim(),
        ordem: perguntas.length + 1,
      },
    ]);
    setNovaPergunta("");
  };

  const handleRemovePergunta = (index: number) => {
    setPerguntas(perguntas.filter((_, i) => i !== index).map((p, i) => ({ ...p, ordem: i + 1 })));
  };

  const handleUpdatePergunta = (index: number, texto: string) => {
    setPerguntas(
      perguntas.map((p, i) => (i === index ? { ...p, texto } : p))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (perguntas.length === 0) {
      alert("A entrevista precisa ter pelo menos uma pergunta.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/entrevistas/${entrevistaId}/perguntas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          perguntas: perguntas.map((p, index) => ({
            id: p.id,
            texto: p.texto,
            ordem: index + 1,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar perguntas");
      }

      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao atualizar perguntas:", error);
      alert("Erro ao atualizar perguntas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Editar Perguntas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <DialogHeader className="pb-4">
            <DialogTitle>Editar Perguntas</DialogTitle>
            <DialogDescription className="mt-1.5">
              Adicione, remova ou edite as perguntas da entrevista.
            </DialogDescription>
          </DialogHeader>

          {temCandidatos && (
            <Alert className="mb-4 border-amber-200 bg-amber-50">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <AlertTitle className="text-amber-800 font-semibold">Atenção</AlertTitle>
                  <AlertDescription className="text-amber-700 mt-1">
                    Esta vaga já possui candidatos participando. Para garantir um processo justo
                    e igualitário entre todos os participantes, recomendamos evitar alterações
                    significativas nas perguntas durante o processo seletivo.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0">
            {/* Lista de perguntas */}
            <div className="space-y-3">
              {perguntas.map((pergunta, index) => (
                <div
                  key={pergunta.id || `new-${index}`}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <Input
                    value={pergunta.texto}
                    onChange={(e) => handleUpdatePergunta(index, e.target.value)}
                    className="flex-1"
                    placeholder="Digite a pergunta..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePergunta(index)}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Adicionar nova pergunta */}
            <div className="flex gap-2 pt-2 border-t">
              <Input
                value={novaPergunta}
                onChange={(e) => setNovaPergunta(e.target.value)}
                placeholder="Digite uma nova pergunta..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddPergunta();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddPergunta}
                disabled={!novaPergunta.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {perguntas.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma pergunta adicionada ainda.</p>
                <p className="text-sm">Use o campo acima para adicionar perguntas.</p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3 sm:gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || perguntas.length === 0}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
