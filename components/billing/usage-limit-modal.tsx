"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CreditCard,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface UsageLimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  percentualUsado?: number;
  totalGasto?: number;
  limiteFinanceiro?: number;
  saldoRestante?: number;
}

export function UsageLimitModal({
  open,
  onOpenChange,
  percentualUsado = 100,
  totalGasto = 50,
  limiteFinanceiro = 50,
  saldoRestante = 0,
}: UsageLimitModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    onOpenChange(false);
    router.push("/upgrade");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        {/* Header com gradiente */}
        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-6 pb-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0tMiAwSDMydi0yaDJ2MnptLTIgMGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

          <div className="relative text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-white">
                Cota de Testes Esgotada
              </DialogTitle>
              <DialogDescription className="text-white/90 text-base">
                Seu crédito gratuito foi utilizado
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 -mt-6 relative">
          {/* Card de uso sobreposto */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Crédito utilizado</span>
              <span className="font-semibold text-foreground">
                R$ {totalGasto.toFixed(2)} / R$ {limiteFinanceiro.toFixed(2)}
              </span>
            </div>
            <Progress
              value={Math.min(percentualUsado, 100)}
              className="h-3 bg-red-100 dark:bg-red-900/30"
            />
            <p className="text-xs text-center text-muted-foreground">
              {percentualUsado >= 100
                ? "Você utilizou 100% do seu crédito gratuito"
                : `${Math.round(percentualUsado)}% utilizado`
              }
            </p>
          </div>

          {/* Mensagem principal */}
          <div className="text-center space-y-2">
            <p className="text-foreground">
              Para continuar avaliando candidatos com IA, cadastre seu cartão de crédito.
            </p>
            <p className="text-sm text-muted-foreground">
              Pague apenas pelo que usar, sem mensalidades ou compromissos.
            </p>
          </div>

          {/* Benefícios */}
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-emerald-900 dark:text-emerald-100">
                  Pay-per-use transparente
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  R$ 1,00/candidato + R$ 0,25/pergunta
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-blue-900 dark:text-blue-100">
                  Sem limites de uso
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Avalie quantos candidatos precisar
                </p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              size="lg"
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Cadastrar Cartão de Crédito
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Continuar sem análise de IA
            </Button>
          </div>

          {/* Nota de segurança */}
          <p className="text-xs text-center text-muted-foreground pt-2">
            Pagamentos processados com segurança. Cancele a qualquer momento.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
