"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/ui/page-header";
import {
  CreditCard,
  CheckCircle2,
  Zap,
  TrendingUp,
  Shield,
  Calculator,
  ArrowRight,
  Sparkles,
  Users,
  MessageSquareText,
  BarChart3,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface UsageData {
  planType: string;
  planStatus: string;
  totalGasto: number;
  limiteFinanceiro: number;
  saldoRestante: number;
  percentualUsado: number;
  limiteAtingido: boolean;
  isTestAccount: boolean;
}

export default function UpgradePage() {
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const res = await fetch("/api/uso");
        if (res.ok) {
          const data = await res.json();
          setUsage(data);
        }
      } catch (error) {
        console.error("Erro ao carregar uso:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsage();
  }, []);

  const handleCadastrarCartao = () => {
    // TODO: Integrar com gateway de pagamento (Stripe, etc.)
    alert("Funcionalidade de cadastro de cartão em desenvolvimento. Em breve você poderá cadastrar seu cartão de crédito!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isFreeTrial = usage?.planType === "free_trial";
  const limiteAtingido = usage?.limiteAtingido || false;

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <PageHeader
        title="Fazer Upgrade"
        description="Continue avaliando candidatos sem interrupções"
      />

      {/* Alerta se limite atingido */}
      {limiteAtingido && (
        <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                Sua cota de testes foi esgotada
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                As funcionalidades de análise por IA estão pausadas. Cadastre seu cartão para continuar.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Coluna Principal - Plano */}
        <div className="lg:col-span-3 space-y-6">
          {/* Card do Plano Profissional */}
          <Card className="relative overflow-hidden border-2 border-violet-200 dark:border-violet-800">
            {/* Badge de destaque */}
            <div className="absolute top-0 right-0">
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-bl-lg">
                Recomendado
              </div>
            </div>

            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900 dark:to-indigo-900">
                  <Sparkles className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Plano Profissional</CardTitle>
                  <CardDescription>Pague apenas pelo que usar</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Preço */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-muted-foreground">/mês</span>
                <Badge variant="secondary" className="ml-2">
                  Sem mensalidade
                </Badge>
              </div>

              <p className="text-muted-foreground">
                Pague apenas pelo que usar. Sem compromissos, sem surpresas.
              </p>

              <Separator />

              {/* Benefícios */}
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">Análises ilimitadas de candidatos</p>
                    <p className="text-sm text-muted-foreground">
                      Avalie quantos candidatos precisar por mês
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">Perguntas personalizadas ilimitadas</p>
                    <p className="text-sm text-muted-foreground">
                      Crie entrevistas adaptadas para cada vaga
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">Relatórios detalhados com IA</p>
                    <p className="text-sm text-muted-foreground">
                      Análise profunda de cada resposta do candidato
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">Suporte prioritário</p>
                    <p className="text-sm text-muted-foreground">
                      Atendimento rápido para suas dúvidas
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Preços detalhados */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Como funciona o preço
                </h4>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>Taxa por candidato avaliado</span>
                    </div>
                    <span className="font-semibold">R$ 1,00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <MessageSquareText className="h-5 w-5 text-muted-foreground" />
                      <span>Taxa por pergunta analisada</span>
                    </div>
                    <span className="font-semibold">R$ 0,25</span>
                  </div>
                </div>
              </div>

              {/* Exemplo de custo */}
              <div className="rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-5 border border-violet-200 dark:border-violet-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-violet-600" />
                    <span className="font-semibold">Exemplo de custo</span>
                  </div>
                  <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                    1 candidato
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1 candidato × R$ 1,00</span>
                    <span>R$ 1,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7 perguntas × R$ 0,25</span>
                    <span>R$ 1,75</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-violet-600">R$ 2,75</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                onClick={handleCadastrarCartao}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-lg py-6 shadow-lg shadow-violet-500/25"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Cadastrar Cartão de Crédito
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Seus dados são processados com segurança. Cancele a qualquer momento.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Lateral - Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card de Uso Atual */}
          {isFreeTrial && usage && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Seu uso atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Crédito utilizado</span>
                    <span className="font-semibold">
                      R$ {usage.totalGasto.toFixed(2)} / R$ {usage.limiteFinanceiro.toFixed(2)}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(usage.percentualUsado, 100)}
                    className={`h-2 ${
                      usage.percentualUsado >= 90
                        ? "bg-red-100 dark:bg-red-900/30"
                        : usage.percentualUsado >= 70
                        ? "bg-amber-100 dark:bg-amber-900/30"
                        : ""
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {usage.limiteAtingido
                    ? "Seu crédito gratuito foi utilizado"
                    : `Saldo restante: R$ ${usage.saldoRestante.toFixed(2)}`
                  }
                </p>
              </CardContent>
            </Card>
          )}

          {/* Card de Segurança */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                Pagamento Seguro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Seus dados de pagamento são processados com criptografia de ponta a ponta.
              </p>
              <p>
                Utilizamos os padrões de segurança PCI-DSS para proteger suas informações.
              </p>
            </CardContent>
          </Card>

          {/* Card de Garantias */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Garantias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Sem mensalidade</p>
                  <p className="text-xs text-muted-foreground">
                    Pague apenas quando usar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Preços transparentes</p>
                  <p className="text-xs text-muted-foreground">
                    Sem taxas escondidas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Cancele quando quiser</p>
                  <p className="text-xs text-muted-foreground">
                    Sem fidelidade ou multas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ rápido */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Perguntas frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Quando serei cobrado?</p>
                <p className="text-muted-foreground mt-1">
                  As cobranças são feitas ao final de cada mês, com base no uso do período.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Posso cancelar a qualquer momento?</p>
                <p className="text-muted-foreground mt-1">
                  Sim! Você pode remover seu cartão e voltar ao plano gratuito quando quiser.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Existe um valor mínimo?</p>
                <p className="text-muted-foreground mt-1">
                  Não. Você paga apenas pelo que usar, sem mínimos mensais.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
