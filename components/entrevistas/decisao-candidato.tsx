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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DecisaoCandidatoProps {
  candidatoId: string;
  entrevistaId: string;
  candidatoNome: string;
  decisaoAtual: "aprovado" | "reprovado" | null;
  recomendacaoIA: "recomendado" | "recomendado_com_ressalvas" | "nao_recomendado" | null;
  observacaoAtual?: string | null;
  onDecisaoAtualizada?: () => void;
  compact?: boolean;
}

const decisaoConfig = {
  aprovado: {
    label: "Aprovado",
    labelLongo: "Aprovado para próxima fase",
    icon: CheckCircle2,
    bgColor: "bg-emerald-50 hover:bg-emerald-100",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    iconColor: "text-emerald-600",
  },
  reprovado: {
    label: "Não aprovado",
    labelLongo: "Não aprovado",
    icon: XCircle,
    bgColor: "bg-red-50 hover:bg-red-100",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconColor: "text-red-600",
  },
  pendente: {
    label: "Pendente",
    labelLongo: "Aguardando decisão",
    icon: Clock,
    bgColor: "bg-slate-50 hover:bg-slate-100",
    borderColor: "border-slate-200",
    textColor: "text-slate-600",
    iconColor: "text-slate-500",
  },
};

const recomendacaoIAConfig = {
  recomendado: {
    label: "IA: Recomendado",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  recomendado_com_ressalvas: {
    label: "IA: Com ressalvas",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  nao_recomendado: {
    label: "IA: Não recomendado",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
  },
};

export function DecisaoCandidato({
  candidatoId,
  entrevistaId,
  candidatoNome,
  decisaoAtual,
  recomendacaoIA,
  observacaoAtual,
  onDecisaoAtualizada,
  compact = false,
}: DecisaoCandidatoProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [decisaoSelecionada, setDecisaoSelecionada] = useState<"aprovado" | "reprovado" | null>(decisaoAtual);
  const [observacao, setObservacao] = useState(observacaoAtual || "");

  const config = decisaoAtual ? decisaoConfig[decisaoAtual] : decisaoConfig.pendente;
  const Icon = config.icon;

  const handleSalvar = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/entrevistas/${entrevistaId}/candidatos/${candidatoId}/decisao`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            decisao: decisaoSelecionada,
            observacao: observacao.trim() || null,
          }),
        }
      );

      if (response.ok) {
        setOpen(false);
        onDecisaoAtualizada?.();
      }
    } catch (error) {
      console.error("Erro ao salvar decisão:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoverDecisao = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/entrevistas/${entrevistaId}/candidatos/${candidatoId}/decisao`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            decisao: null,
            observacao: null,
          }),
        }
      );

      if (response.ok) {
        setDecisaoSelecionada(null);
        setObservacao("");
        setOpen(false);
        onDecisaoAtualizada?.();
      }
    } catch (error) {
      console.error("Erro ao remover decisão:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all",
            config.bgColor,
            config.borderColor,
            "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className={cn("h-3.5 w-3.5", config.iconColor)} />
          <span className={cn("text-xs font-medium", config.textColor)}>
            {compact ? config.label : config.labelLongo}
          </span>
          <ChevronDown className={cn("h-3 w-3", config.textColor)} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Decisão sobre candidato</DialogTitle>
          <DialogDescription>
            Avalie se <span className="font-medium text-foreground">{candidatoNome}</span> deve avançar para a próxima fase do processo seletivo.
          </DialogDescription>
        </DialogHeader>

        {/* Recomendação da IA */}
        {recomendacaoIA && (
          <div className={cn(
            "flex items-center gap-2 p-3 rounded-lg",
            recomendacaoIAConfig[recomendacaoIA].bgColor
          )}>
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className={cn(
              "text-sm font-medium",
              recomendacaoIAConfig[recomendacaoIA].textColor
            )}>
              {recomendacaoIAConfig[recomendacaoIA].label}
            </span>
          </div>
        )}

        {/* Opções de decisão */}
        <div className="space-y-3">
          <Label>Sua decisão</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDecisaoSelecionada("aprovado")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                decisaoSelecionada === "aprovado"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
              )}
            >
              <CheckCircle2 className={cn(
                "h-8 w-8",
                decisaoSelecionada === "aprovado" ? "text-emerald-600" : "text-slate-400"
              )} />
              <span className={cn(
                "text-sm font-medium",
                decisaoSelecionada === "aprovado" ? "text-emerald-700" : "text-slate-600"
              )}>
                Aprovar
              </span>
              <span className="text-xs text-slate-500 text-center">
                Avançar para próxima fase
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDecisaoSelecionada("reprovado")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                decisaoSelecionada === "reprovado"
                  ? "border-red-500 bg-red-50"
                  : "border-slate-200 hover:border-red-300 hover:bg-red-50/50"
              )}
            >
              <XCircle className={cn(
                "h-8 w-8",
                decisaoSelecionada === "reprovado" ? "text-red-600" : "text-slate-400"
              )} />
              <span className={cn(
                "text-sm font-medium",
                decisaoSelecionada === "reprovado" ? "text-red-700" : "text-slate-600"
              )}>
                Não aprovar
              </span>
              <span className="text-xs text-slate-500 text-center">
                Encerrar participação
              </span>
            </button>
          </div>
        </div>

        {/* Observação opcional */}
        <div className="space-y-2">
          <Label htmlFor="observacao">Observação (opcional)</Label>
          <Textarea
            id="observacao"
            placeholder="Adicione uma nota sobre sua decisão..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            rows={3}
          />
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {decisaoAtual && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleRemoverDecisao}
              disabled={loading}
              className="text-slate-500 hover:text-slate-700"
            >
              Remover decisão
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSalvar}
              disabled={loading || decisaoSelecionada === null}
              className={cn(
                decisaoSelecionada === "aprovado" && "bg-emerald-600 hover:bg-emerald-700",
                decisaoSelecionada === "reprovado" && "bg-red-600 hover:bg-red-700"
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Confirmar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
