"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sparkles, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MENSAGENS_SUGERIDAS } from "@/lib/email/templates";

interface MensagemSugeridaSelectorProps {
  tipo: "aprovacao" | "reprovacao";
  onSelect: (mensagem: string) => void;
}

const LABELS_APROVACAO = {
  padrao: { titulo: "Padrão", descricao: "Tom amigável e profissional" },
  entusiasmada: { titulo: "Entusiasmada", descricao: "Tom animado e celebrativo" },
  formal: { titulo: "Formal", descricao: "Tom corporativo e tradicional" },
} as const;

const LABELS_REPROVACAO = {
  padrao: { titulo: "Padrão", descricao: "Tom respeitoso e direto" },
  construtiva: { titulo: "Construtiva", descricao: "Tom encorajador e motivacional" },
  formal: { titulo: "Formal", descricao: "Tom corporativo e tradicional" },
  empatica: { titulo: "Empática", descricao: "Tom acolhedor e humano" },
} as const;

export function MensagemSugeridaSelector({ tipo, onSelect }: MensagemSugeridaSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const mensagens = tipo === "aprovacao" ? MENSAGENS_SUGERIDAS.aprovacao : MENSAGENS_SUGERIDAS.reprovacao;
  const labels = tipo === "aprovacao" ? LABELS_APROVACAO : LABELS_REPROVACAO;

  const handleSelect = (key: string, mensagem: string) => {
    setSelectedKey(key);
    onSelect(mensagem);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-primary hover:text-primary"
        >
          <Sparkles className="h-4 w-4" />
          Usar mensagem sugerida
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-lg" align="start">
        <div className="p-3 border-b bg-muted/50">
          <p className="text-sm font-medium">
            {tipo === "aprovacao" ? "Mensagens de Aprovação" : "Mensagens de Reprovação"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Escolha um modelo para começar
          </p>
        </div>
        <div className="p-2">
          {Object.entries(mensagens).map(([key, mensagem]) => {
            const label = labels[key as keyof typeof labels];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key, mensagem)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer",
                  "hover:bg-muted",
                  selectedKey === key && "bg-primary/5"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                  selectedKey === key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                )}>
                  {selectedKey === key && <Check className="h-3 w-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{label.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {label.descricao}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2 line-clamp-2">
                    {mensagem.split('\n')[0]}...
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
