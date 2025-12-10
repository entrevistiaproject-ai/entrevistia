import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Briefcase, Users, PlusCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUsageData } from "./actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  // Busca dados de uso do servidor
  const usageResult = await getUsageData();

  // Valores padrão para novos usuários ou em caso de erro
  const usageData = usageResult.success ? usageResult.data : null;
  const limits = usageData?.limits || {
    entrevistas: { used: 0, limit: 4, canCreate: true },
    perguntas: { used: 0, limit: 12, canCreate: true },
    candidatos: { used: 0, limit: 5, canCreate: true },
  };

  // Calcula porcentagens para as barras de progresso
  const entrevistasPercent = limits.entrevistas.limit
    ? (limits.entrevistas.used / limits.entrevistas.limit) * 100
    : 0;
  const candidatosPercent = limits.candidatos.limit
    ? (limits.candidatos.used / limits.candidatos.limit) * 100
    : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Dashboard"
        description="Visão geral do seu processo de recrutamento"
      >
        <Button asChild size="touch" className="w-full sm:w-auto">
          <Link href="/criar-entrevista">
            <PlusCircle className="h-4 w-4" />
            Nova Entrevista
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas Criadas</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">{limits.entrevistas.used}</div>
            <Progress value={entrevistasPercent} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {(limits.entrevistas.limit || 0) - limits.entrevistas.used} de {limits.entrevistas.limit || 0} disponíveis
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatos Únicos</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">{limits.candidatos.used}</div>
            <Progress value={candidatosPercent} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {(limits.candidatos.limit || 0) - limits.candidatos.used} de {limits.candidatos.limit || 0} disponíveis
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite por Entrevista</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">{limits.perguntas.limit || 0}</div>
            <p className="text-xs text-muted-foreground">perguntas por entrevista</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle>Entrevistas Recentes</CardTitle>
            <CardDescription>Suas últimas entrevistas criadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {limits.entrevistas.used === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Briefcase className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">Nenhuma entrevista criada ainda</p>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">
                    Crie sua primeira entrevista para começar!
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/criar-entrevista">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Criar Entrevista
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Visualize suas entrevistas na página dedicada
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/entrevistas">
                      Ver Entrevistas
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle>Resumo de Uso</CardTitle>
            <CardDescription>Status do seu plano Free Trial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Status do Plano</span>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  Free Trial Ativo
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Entrevistas Restantes</span>
                <span className="font-semibold tabular-nums">
                  {(limits.entrevistas.limit || 0) - limits.entrevistas.used}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Candidatos Restantes</span>
                <span className="font-semibold tabular-nums">
                  {(limits.candidatos.limit || 0) - limits.candidatos.used}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
