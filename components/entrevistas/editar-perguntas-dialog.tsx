"use client";

import { useState, useCallback } from "react";
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
import { Pencil, Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  GerenciadorPerguntas,
  PerguntaSelecionada,
} from "@/components/entrevista/gerenciador-perguntas";

interface Pergunta {
  id: string;
  texto: string;
  ordem: number;
}

interface EditarPerguntasDialogProps {
  entrevistaId: string;
  perguntas: Pergunta[];
  temCandidatos: boolean;
  cargo?: string;
  nivel?: string;
  onSuccess?: () => void;
}

export function EditarPerguntasDialog({
  entrevistaId,
  perguntas: perguntasIniciais,
  temCandidatos,
  cargo,
  nivel,
  onSuccess,
}: EditarPerguntasDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perguntas, setPerguntas] = useState<PerguntaSelecionada[]>([]);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Converter perguntas existentes para o formato do gerenciador
      const perguntasConvertidas: PerguntaSelecionada[] = perguntasIniciais.map((p) => ({
        id: p.id,
        texto: p.texto,
        origem: "banco" as const, // Perguntas existentes são tratadas como vindas do banco
      }));
      setPerguntas(perguntasConvertidas);
    }
    setOpen(newOpen);
  };

  const handlePerguntasChange = useCallback((novasPerguntas: PerguntaSelecionada[]) => {
    setPerguntas(novasPerguntas);
  }, []);

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
            id: p.id.startsWith("nova-") ? undefined : p.id, // Novas perguntas não têm ID
            texto: p.texto,
            ordem: index + 1,
            // Dados para salvar no banco se for nova pergunta
            ...(p.origem === "nova" && p.salvarNoBanco && {
              salvarNoBanco: true,
              competencia: p.competencia,
              categoria: p.categoria,
            }),
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
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
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
                <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
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

          <div className="flex-1 overflow-y-auto py-4 min-h-0">
            <GerenciadorPerguntas
              cargo={cargo}
              nivel={nivel}
              perguntasIniciais={perguntas}
              onChange={handlePerguntasChange}
              modoEdicao={true}
            />
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
