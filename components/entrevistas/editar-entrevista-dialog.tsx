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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EditarEntrevistaDialogProps {
  entrevista: {
    id: string;
    titulo: string;
    descricao: string | null;
    cargo: string | null;
    empresa: string | null;
    duracao: number | null;
  };
  temCandidatos: boolean;
  onSuccess?: () => void;
}

export function EditarEntrevistaDialog({
  entrevista,
  temCandidatos,
  onSuccess,
}: EditarEntrevistaDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [titulo, setTitulo] = useState(entrevista.titulo);
  const [descricao, setDescricao] = useState(entrevista.descricao || "");
  const [cargo, setCargo] = useState(entrevista.cargo || "");
  const [empresa, setEmpresa] = useState(entrevista.empresa || "");
  const [duracao, setDuracao] = useState(entrevista.duracao?.toString() || "");

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset para valores atuais ao abrir
      setTitulo(entrevista.titulo);
      setDescricao(entrevista.descricao || "");
      setCargo(entrevista.cargo || "");
      setEmpresa(entrevista.empresa || "");
      setDuracao(entrevista.duracao?.toString() || "");
    }
    setOpen(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/entrevistas/${entrevista.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao: descricao || null,
          cargo: cargo || null,
          empresa: empresa || null,
          duracao: duracao ? parseInt(duracao) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar entrevista");
      }

      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao atualizar entrevista:", error);
      alert("Erro ao atualizar entrevista. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="pb-4">
            <DialogTitle>Editar Entrevista</DialogTitle>
            <DialogDescription className="mt-1.5">
              Atualize as informações da vaga conforme necessário.
            </DialogDescription>
          </DialogHeader>

          {temCandidatos && (
            <Alert className="mb-4 border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Esta vaga já possui candidatos participando. Para garantir um processo justo
                e igualitário entre todos os participantes, recomendamos evitar alterações
                significativas durante o processo seletivo.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-5 py-4">
            <div className="grid gap-2.5">
              <Label htmlFor="titulo">Título da vaga *</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Desenvolvedor Full Stack"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2.5">
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="Ex: Desenvolvedor Senior"
                />
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="duracao">Duração máxima (minutos)</Label>
              <Input
                id="duracao"
                type="number"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                placeholder="Ex: 30"
                min="1"
                max="180"
              />
              <p className="text-xs text-muted-foreground">
                Tempo máximo que o candidato terá para completar a entrevista
              </p>
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="descricao">Descrição da vaga</Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva as responsabilidades, requisitos e benefícios da vaga..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
