"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  SkipForward,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { AreaCargoSelector } from "@/components/perguntas/area-cargo-selector";
import { AREAS_CARGOS } from "@/lib/db/seeds/banco-perguntas-v4/types";

function OnboardingContent() {
  const router = useRouter();

  const [selectedCargos, setSelectedCargos] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSkipWarning, setShowSkipWarning] = useState(false);

  // Carrega preferências existentes (caso o usuário volte à página)
  useEffect(() => {
    const loadPreferences = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user/cargo-preferences");
        if (response.ok) {
          const data = await response.json();
          if (data.cargosVisiveis && data.cargosVisiveis.length > 0) {
            setSelectedCargos(data.cargosVisiveis);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar preferências:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleSave = async () => {
    if (selectedCargos.length === 0) {
      setError("Selecione pelo menos um cargo para continuar");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/user/cargo-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cargosVisiveis: selectedCargos,
          onboardingCompleted: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Erro ao salvar preferências");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/painel");
      }, 1500);
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao conectar com o servidor");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = async () => {
    setError("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/user/cargo-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cargosVisiveis: [],
          onboardingCompleted: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Erro ao salvar preferências");
        return;
      }

      router.push("/painel");
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao conectar com o servidor");
    } finally {
      setIsSaving(false);
    }
  };

  const todosCargos = Object.values(AREAS_CARGOS).flat();

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-primary/10 p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-5" />
          <h2 className="text-2xl font-bold mb-3">Tudo pronto!</h2>
          <p className="text-muted-foreground mb-5">
            Suas preferências foram salvas. Vamos começar!
          </p>
          <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-primary/10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10">
      {/* Header simples */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <Logo size="md" />
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Card className="shadow-lg">
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-6 border-b">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-5">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Configure seu Banco de Perguntas
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Temos um banco com mais de 1.000 perguntas prontas para ajudá-lo
              nas entrevistas. Para não ficar poluído, selecione as áreas e
              cargos do seu interesse.
            </p>
          </div>

          {/* Erro */}
          {error && (
            <div className="mx-6 mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Seletor de áreas/cargos */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            <AreaCargoSelector
              selectedCargos={selectedCargos}
              onChange={setSelectedCargos}
            />
          </div>

          {/* Footer com ações */}
          <div className="px-6 pb-6 pt-4 border-t bg-muted/30">
            {/* Warning ao pular */}
            {showSkipWarning && (
              <div className="mb-4 p-4 bg-warning-bg border border-warning-border rounded-lg">
                <p className="text-sm text-warning-text">
                  <strong>Atenção:</strong> Se você pular, o banco de perguntas
                  padrão ficará vazio. Você poderá alterar isso a qualquer
                  momento na página de Perguntas, clicando em &quot;Gerenciar
                  visibilidade&quot;.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSkipWarning(false)}
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    disabled={isSaving}
                    className="text-muted-foreground"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Pular mesmo assim
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              {/* Info */}
              <p className="text-sm text-muted-foreground">
                {selectedCargos.length} de {todosCargos.length} cargos
                selecionados
              </p>

              {/* Botões */}
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowSkipWarning(true)}
                  disabled={isSaving || showSkipWarning}
                  className="text-muted-foreground"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Pular
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || selectedCargos.length === 0}
                  size="lg"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Dica */}
        <div className="mt-6 p-4 bg-info-bg rounded-lg border border-info-border">
          <p className="text-sm text-info-text text-center">
            Você pode alterar essas preferências a qualquer momento na página de{" "}
            <strong>Perguntas</strong>, clicando em{" "}
            <strong>&quot;Gerenciar visibilidade&quot;</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
