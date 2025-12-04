"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Copy, Check, ExternalLink, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompartilharLinkDialogProps {
  entrevistaId: string;
  slug?: string | null;
}

export function CompartilharLinkDialog({
  entrevistaId,
  slug: slugInicial,
}: CompartilharLinkDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [slug, setSlug] = useState<string | null>(slugInicial || null);

  const linkCompleto = slug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/entrevista/${slug}`
    : "";

  const gerarLink = async () => {
    setLoading(true);
    try {
      // TODO: Substituir por sessão real
      const userId = "123e4567-e89b-12d3-a456-426614174000";

      const response = await fetch(`/api/entrevistas/${entrevistaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({
          gerarLink: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar link");
      }

      const data = await response.json();
      setSlug(data.slug);
      router.refresh();
    } catch (error) {
      console.error("Erro ao gerar link:", error);
      alert("Erro ao gerar link. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copiarLink = async () => {
    if (!linkCompleto) return;

    try {
      await navigator.clipboard.writeText(linkCompleto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (error) {
      console.error("Erro ao copiar:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Compartilhar Link da Entrevista</DialogTitle>
          <DialogDescription>
            Gere um link público para que candidatos possam acessar e responder
            a entrevista
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!slug ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Nenhum link público foi gerado ainda para esta entrevista.
                Clique no botão abaixo para criar um link compartilhável.
              </p>
              <Button onClick={gerarLink} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Gerar Link Público
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Link da Entrevista</Label>
                <div className="flex gap-2">
                  <Input value={linkCompleto} readOnly className="font-mono text-sm" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copiarLink}
                    className="shrink-0"
                  >
                    {copiado ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Compartilhe este link com candidatos para que possam acessar a
                  entrevista
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={copiarLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copiado ? "Copiado!" : "Copiar Link"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(linkCompleto, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Dica:</strong> Você também pode adicionar candidatos
                  manualmente. Eles receberão este link por email automaticamente.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
