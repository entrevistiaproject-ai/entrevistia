import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Briefcase, Users } from "lucide-react";
import { UsageFinanceiroCard } from "@/components/dashboard/usage-financeiro-card";
import { getUsageData } from "./actions";

export default async function DashboardPage() {
  // Busca dados de uso do servidor
  const usageResult = await getUsageData();

  // Valores padrão para novos usuários ou em caso de erro
  const usageData = usageResult.success ? usageResult.data : null;
  const financeiro = usageData?.financeiro || {
    totalGasto: 0,
    limiteFinanceiro: 50,
    saldoRestante: 50,
    percentualUsado: 0,
    limiteAtingido: false,
    totalTransacoes: 0,
  };
  const limits = usageData?.limits || {
    entrevistas: { used: 0, limit: 4, canCreate: true },
    perguntas: { used: 0, limit: 12, canCreate: true },
    candidatos: { used: 0, limit: 5, canCreate: true },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu processo de recrutamento
        </p>
      </div>

      {/* Card de Uso Financeiro */}
      <UsageFinanceiroCard
        totalGasto={financeiro.totalGasto}
        limiteFinanceiro={financeiro.limiteFinanceiro}
        saldoRestante={financeiro.saldoRestante}
        percentualUsado={financeiro.percentualUsado}
        limiteAtingido={financeiro.limiteAtingido}
        totalTransacoes={financeiro.totalTransacoes}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas Criadas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{limits.entrevistas.used}</div>
            <p className="text-xs text-muted-foreground">
              de {limits.entrevistas.limit} disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatos Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{limits.candidatos.used}</div>
            <p className="text-xs text-muted-foreground">
              de {limits.candidatos.limit} disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite por Entrevista</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{limits.perguntas.limit}</div>
            <p className="text-xs text-muted-foreground">perguntas por entrevista</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Entrevistas Recentes</CardTitle>
            <CardDescription>Suas últimas entrevistas criadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {limits.entrevistas.used === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">Nenhuma entrevista criada ainda</p>
                  <p className="text-xs mt-2">Crie sua primeira entrevista para começar!</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">Carregue suas entrevistas na página de Entrevistas</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo de Uso</CardTitle>
            <CardDescription>Status do seu plano Free Trial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-sm text-muted-foreground">Status do Plano</span>
                <span className="font-medium text-green-600">Free Trial Ativo</span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-sm text-muted-foreground">Entrevistas Restantes</span>
                <span className="font-medium">
                  {(limits.entrevistas.limit || 0) - limits.entrevistas.used}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-sm text-muted-foreground">Candidatos Restantes</span>
                <span className="font-medium">
                  {(limits.candidatos.limit || 0) - limits.candidatos.used}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Saldo Financeiro</span>
                <span className="font-medium text-green-600">
                  R$ {financeiro.saldoRestante.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
