"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UsageFinanceiroCardProps {
  totalGasto: number;
  limiteFinanceiro: number;
  saldoRestante: number;
  percentualUsado: number;
  limiteAtingido: boolean;
  totalAnalises: number;
}

export function UsageFinanceiroCard({
  totalGasto,
  limiteFinanceiro,
  saldoRestante,
  percentualUsado,
  limiteAtingido,
  totalAnalises,
}: UsageFinanceiroCardProps) {
  // Determina a cor da progress bar baseado no percentual usado
  const getProgressColor = () => {
    if (percentualUsado >= 90) return "bg-red-500";
    if (percentualUsado >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Determina se deve mostrar alerta
  const shouldShowAlert = percentualUsado >= 80;

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Uso do Plano Gratuito
            </CardTitle>
            <CardDescription>
              Acompanhe quanto você já utilizou do seu crédito gratuito
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Análises</div>
            <div className="text-2xl font-bold">{totalAnalises}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso de uso</span>
            <span className="font-medium">{percentualUsado.toFixed(1)}%</span>
          </div>
          <div className="relative">
            <Progress value={percentualUsado} className="h-3" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getProgressColor()}`}
              style={{ width: `${Math.min(100, percentualUsado)}%` }}
            />
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Total Gasto
            </div>
            <div className="text-2xl font-bold">
              R$ {totalGasto.toFixed(2)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Saldo Restante</div>
            <div className={`text-2xl font-bold ${limiteAtingido ? "text-red-400 dark:text-red-300" : "text-green-600 dark:text-green-400"}`}>
              R$ {saldoRestante.toFixed(2)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Limite Total</div>
            <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">
              R$ {limiteFinanceiro.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Alertas */}
        {shouldShowAlert && (
          <Alert variant={limiteAtingido ? "destructive" : "default"} className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {limiteAtingido ? (
                <>
                  Você atingiu o limite de uso gratuito. Para continuar usando o sistema, faça upgrade do seu plano.
                </>
              ) : (
                <>
                  Atenção! Você já utilizou {percentualUsado.toFixed(0)}% do seu crédito gratuito.
                  Restam apenas R$ {saldoRestante.toFixed(2)} disponíveis.
                </>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Mensagem para novos usuários */}
        {totalAnalises === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">
              Você ainda não realizou nenhuma operação. Comece criando sua primeira entrevista!
            </p>
            <p className="text-xs mt-2">
              Você tem R$ {limiteFinanceiro.toFixed(2)} disponíveis para usar gratuitamente.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
