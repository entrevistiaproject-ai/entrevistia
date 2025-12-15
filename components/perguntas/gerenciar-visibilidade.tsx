"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { AreaCargoSelector } from "./area-cargo-selector";
import { Loader2, Settings, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GerenciarVisibilidadeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

export function GerenciarVisibilidade({
  open,
  onOpenChange,
  onSave,
}: GerenciarVisibilidadeProps) {
  const { toast } = useToast();
  const [selectedCargos, setSelectedCargos] = useState<string[]>([]);
  const [initialCargos, setInitialCargos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Carrega preferências ao abrir
  useEffect(() => {
    if (open) {
      loadPreferences();
    }
  }, [open]);

  const loadPreferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/cargo-preferences");
      if (response.ok) {
        const data = await response.json();
        const cargos = data.cargosVisiveis || [];
        setSelectedCargos(cargos);
        setInitialCargos(cargos);
      }
    } catch (error) {
      console.error("Erro ao carregar preferências:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar suas preferências",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
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
        throw new Error("Erro ao salvar");
      }

      toast({
        title: "Preferências salvas",
        description: "Suas preferências de visibilidade foram atualizadas",
      });

      setInitialCargos(selectedCargos);
      onOpenChange(false);
      onSave?.();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar suas preferências",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShowAll = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/cargo-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "show-all" }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar");
      }

      const data = await response.json();
      setSelectedCargos(data.cargosVisiveis);
      setInitialCargos(data.cargosVisiveis);

      toast({
        title: "Todas as perguntas visíveis",
        description: "Agora você verá perguntas de todos os cargos",
      });

      onOpenChange(false);
      onSave?.();
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleHideAll = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/cargo-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "hide-all" }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar");
      }

      setSelectedCargos([]);
      setInitialCargos([]);

      toast({
        title: "Perguntas padrão ocultas",
        description: "Agora você verá apenas suas próprias perguntas",
      });

      onOpenChange(false);
      onSave?.();
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges =
    JSON.stringify(selectedCargos.sort()) !==
    JSON.stringify(initialCargos.sort());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg flex flex-col p-0"
      >
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <SheetTitle>Gerenciar Visibilidade</SheetTitle>
              <SheetDescription>
                Selecione quais cargos você deseja ver no banco de perguntas
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Ações rápidas */}
        <div className="px-6 py-3 border-b bg-muted/30 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShowAll}
            disabled={isSaving || isLoading}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            Mostrar todas
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleHideAll}
            disabled={isSaving || isLoading}
            className="flex-1"
          >
            <EyeOff className="w-4 h-4 mr-2" />
            Ocultar todas
          </Button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <AreaCargoSelector
              selectedCargos={selectedCargos}
              onChange={setSelectedCargos}
            />
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="p-6 pt-4 border-t bg-background">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || isLoading || !hasChanges}
              className="flex-1"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
