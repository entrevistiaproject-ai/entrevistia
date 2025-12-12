"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Sparkles, Zap, TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FreeTrialUpgradeCard() {
  const handleUpgrade = () => {
    // TODO: Implementar navegação para página de cadastro de cartão/upgrade
    window.location.href = "/configuracoes?tab=plano";
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-2">
          <Badge variant="secondary" className="text-xs px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1" />
            Plano Gratuito
          </Badge>
        </div>
        <CardTitle className="text-2xl">Upgrade para Continuar Crescendo</CardTitle>
        <CardDescription className="text-base">
          Escolha um plano profissional e tenha acesso ilimitado a todas as funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Benefícios do Upgrade */}
        <div className="grid gap-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Uso Ilimitado</p>
              <p className="text-xs text-muted-foreground">
                Avalie quantos candidatos precisar, sem limite de saldo
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
            <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Pay-per-Use Transparente</p>
              <p className="text-xs text-muted-foreground">
                Pague apenas pelo que usar: R$ 1,00/candidato + R$ 0,25/pergunta
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Plano Professional</p>
              <p className="text-xs text-muted-foreground">
                Adequado para empresas em crescimento e alto volume de contratações
              </p>
            </div>
          </div>
        </div>

        {/* Exemplo de Custo */}
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-medium mb-3">Exemplo de Custo</p>
          <div className="space-y-3 text-sm">
            {/* Custo individual */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">1 candidato com 10 perguntas</span>
                <span className="font-mono">R$ 3,50</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>• Taxa base: 1 × R$ 1,00</span>
                <span>R$ 1,00</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>• Análises: 10 × R$ 0,25</span>
                <span>R$ 2,50</span>
              </div>
            </div>

            <div className="border-t pt-2" />

            {/* Custo em volume */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">20 candidatos com 10 perguntas</span>
                <span className="font-mono">R$ 70,00</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>• Taxa base: 20 × R$ 1,00</span>
                <span>R$ 20,00</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>• Análises: 200 × R$ 0,25</span>
                <span>R$ 50,00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Upgrade */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            size="touch"
            variant="default"
            onClick={handleUpgrade}
            className="w-full"
          >
            <CreditCard className="h-4 w-4" />
            Cadastrar Cartão
          </Button>
          <Button
            size="touch"
            variant="outline"
            onClick={handleUpgrade}
            className="w-full"
          >
            Ver Planos
          </Button>
        </div>

        {/* Nota sobre segurança */}
        <p className="text-xs text-center text-muted-foreground">
          Seus dados de pagamento são processados de forma segura. Cancele a qualquer momento.
        </p>
      </CardContent>
    </Card>
  );
}
