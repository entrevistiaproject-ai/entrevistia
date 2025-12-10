"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCcw, MessageSquare } from "lucide-react";
import { SupportWidget } from "@/components/support/support-widget";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro para monitoramento centralizado
    const logError = async () => {
      try {
        await fetch("/api/support/log-error", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Erro capturado na página",
            errorMessage: error.message,
            errorStack: error.stack,
            component: "error-boundary",
            pageUrl: window.location.href,
            level: "error",
            context: {
              digest: error.digest,
              userAgent: navigator.userAgent,
            },
          }),
        });
      } catch {
        // Fallback para console se a API falhar
        console.error("Erro capturado:", error);
      }
    };
    logError();
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-secondary/20 p-4 sm:p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Ops! Algo deu errado</CardTitle>
          <CardDescription className="text-base mt-2 leading-relaxed">
            Tivemos um problema técnico. Tente novamente ou volte para o início.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-6 sm:px-8 pb-8">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-xl bg-muted p-4 text-xs font-mono">
              <p className="text-destructive font-semibold mb-2">Detalhes (dev):</p>
              <p className="text-muted-foreground break-words">
                {error.message || "Erro desconhecido"}
              </p>
              {error.digest && (
                <p className="text-muted-foreground mt-3">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button onClick={reset} className="w-full" size="lg">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao início
              </Link>
            </Button>
          </div>

          {/* Widget de Suporte */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center mb-3">
              O problema persiste? Nossa equipe pode ajudar.
            </p>
            <SupportWidget
              origem="pagina_erro"
              categoriaInicial="sistemico"
              tituloInicial={`Erro: ${error.message?.slice(0, 50) || "Erro na aplicação"}`}
              descricaoInicial={`Encontrei um erro ao usar o sistema.\n\nMensagem de erro: ${error.message || "Não disponível"}\n\nO que eu estava fazendo: `}
              errorInfo={{
                message: error.message,
                stack: error.stack,
                digest: error.digest,
              }}
              trigger={
                <Button variant="secondary" className="w-full" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Reportar Problema
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
