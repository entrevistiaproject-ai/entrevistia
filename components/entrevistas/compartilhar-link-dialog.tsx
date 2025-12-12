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
import { Share2, Copy, Check, ExternalLink, Loader2, AlertTriangle } from "lucide-react";
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
        <DialogHeader className="pb-4">
          <DialogTitle>Compartilhar entrevista</DialogTitle>
          <DialogDescription className="mt-1.5">
            Gere um link para os candidatos acessarem e responderem
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {!slug ? (
            <div className="text-center space-y-5 py-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Esta entrevista ainda não tem um link público.
                Clique abaixo para gerar um link que você pode enviar aos candidatos.
              </p>
              <Button onClick={gerarLink} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Gerar link de acesso
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-2.5">
                <Label>Link para os candidatos</Label>
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
                <p className="text-xs text-muted-foreground mt-1.5">
                  Envie este link por email ou mensagem. O candidato clica e já pode responder.
                </p>
              </div>

              <div className="flex gap-3">
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

              <div className="p-5 bg-amber-50 dark:bg-amber-950 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex gap-4">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      Quer mais controle?
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                      Para saber exatamente quem respondeu e acompanhar cada candidato,
                      use o <strong>cadastro individual</strong> ou a <strong>importação em lote</strong> em vez de compartilhar o link direto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
