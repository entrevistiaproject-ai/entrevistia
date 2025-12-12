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
import { UserPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdicionarCandidatoDialogProps {
  entrevistaId: string;
  onSuccess?: () => void;
  className?: string;
}

export function AdicionarCandidatoDialog({
  entrevistaId,
  onSuccess,
  className,
}: AdicionarCandidatoDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/candidatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          linkedin,
          entrevistaId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar candidato");
      }

      // TODO: Enviar email com link da entrevista
      // TODO: Vincular candidato à entrevista

      setOpen(false);
      setNome("");
      setEmail("");
      setTelefone("");
      setLinkedin("");

      if (onSuccess) {
        onSuccess();
      }

      router.refresh();
    } catch (error) {
      console.error("Erro ao adicionar candidato:", error);
      alert("Erro ao adicionar candidato. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <UserPlus className="mr-2 h-4 w-4" />
          Convidar candidato
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="pb-4">
            <DialogTitle>Convidar candidato</DialogTitle>
            <DialogDescription className="mt-1.5">
              Preencha os dados e o candidato receberá um email com o link para responder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-5">
            <div className="grid gap-2.5">
              <Label htmlFor="nome">Nome do candidato</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João Silva"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="email">Email do candidato</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joao@email.com"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="telefone">Telefone (opcional)</Label>
              <Input
                id="telefone"
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
              <Input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/joaosilva"
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
              Enviar convite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
