"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  Users,
  Briefcase,
  CreditCard,
  AlertCircle,
  Plus,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DadosCustos {
  saldo: {
    atual: number;
    totalGasto: number;
    totalRecargado: number;
    limiteAlerta: number;
  };
  periodo: {
    dataInicio: string;
    dataFim: string;
    totalTransacoes: number;
    custoTotal: number;
    custoPorTipo: Record<string, number>;
  };
  medias: {
    custoPorCandidato: number;
    totalCandidatos: number;
  };
  entrevistas: {
    total: number;
    top5: Array<{
      id: string;
      titulo: string;
      custo: number;
      transacoes: number;
    }>;
  };
  evolucao: Array<{
    mes: string;
    custo: number;
    transacoes: number;
  }>;
}

export default function CustosPage() {
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState("mes");
  const [dados, setDados] = useState<DadosCustos | null>(null);

  const fetchDados = async () => {
    try {
      setLoading(true);
      const userId = "123e4567-e89b-12d3-a456-426614174000";

      const response = await fetch(`/api/custos?periodo=${periodo}`, {
        headers: { "x-user-id": userId },
      });

      if (response.ok) {
        const data = await response.json();
        setDados(data);
      }
    } catch (error) {
      console.error("Erro ao carregar custos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, [periodo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">Erro ao carregar dados</p>
      </div>
    );
  }

  const { saldo, periodo: periodoData, medias, entrevistas, evolucao } = dados;
  const saldoPercentual = saldo.totalRecargado > 0 ? (saldo.atual / saldo.totalRecargado) * 100 : 0;
  const alertaSaldo = saldo.atual < saldo.limiteAlerta;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Custos</h1>
          <p className="text-muted-foreground">
            Acompanhe seus gastos e otimize seus investimentos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Créditos
        </Button>
      </div>

      {/* Alerta de Saldo Baixo */}
      {alertaSaldo && (
        <Card className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="flex items-center gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div className="flex-1">
              <p className="font-medium text-orange-900 dark:text-orange-100">
                Saldo Baixo
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-200">
                Seu saldo está abaixo de R$ {saldo.limiteAlerta.toFixed(2)}. Considere
                adicionar créditos para continuar usando a plataforma.
              </p>
            </div>
            <Button variant="outline" className="border-orange-600 text-orange-600">
              Recarregar
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filtros de Período */}
      <Tabs value={periodo} onValueChange={setPeriodo}>
        <TabsList>
          <TabsTrigger value="mes">Último Mês</TabsTrigger>
          <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
          <TabsTrigger value="ano">Ano</TabsTrigger>
          <TabsTrigger value="total">Total</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Saldo Atual */}
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              R$ {saldo.atual.toFixed(2)}
            </div>
            <Progress value={saldoPercentual} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {saldoPercentual.toFixed(0)}% do total recarregado
            </p>
          </CardContent>
        </Card>

        {/* Gasto no Período */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto no Período</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              R$ {periodoData.custoTotal.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {periodoData.totalTransacoes} transações
            </p>
          </CardContent>
        </Card>

        {/* Custo Médio por Candidato */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo/Candidato</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              R$ {medias.custoPorCandidato.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {medias.totalCandidatos} candidatos avaliados
            </p>
          </CardContent>
        </Card>

        {/* Total Gasto */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              R$ {saldo.totalGasto.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Desde o início
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top 5 Entrevistas Mais Caras */}
        <Card>
          <CardHeader>
            <CardTitle>Entrevistas Mais Caras</CardTitle>
            <CardDescription>
              Top 5 vagas que mais geraram custos no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            {entrevistas.top5.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma entrevista com custos no período</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entrevistas.top5.map((ent, index) => (
                  <div
                    key={ent.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-yellow-950"
                            : index === 1
                            ? "bg-gray-400 text-gray-950"
                            : index === 2
                            ? "bg-orange-600 text-orange-50"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{ent.titulo || "Sem título"}</p>
                        <p className="text-xs text-muted-foreground">
                          {ent.transacoes} transações
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      R$ {ent.custo.toFixed(2)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Gastos</CardTitle>
            <CardDescription>
              Histórico dos últimos meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {evolucao.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Sem dados históricos ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {evolucao.map((item) => {
                  const [ano, mes] = item.mes.split("-");
                  const mesNome = new Date(parseInt(ano), parseInt(mes) - 1).toLocaleDateString(
                    "pt-BR",
                    { month: "short", year: "numeric" }
                  );

                  return (
                    <div key={item.mes} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium capitalize">{mesNome}</span>
                        <span className="text-muted-foreground">
                          R$ {item.custo.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={(item.custo / Math.max(...evolucao.map((e) => e.custo))) * 100}
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Breakdown de Custos por Tipo */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Custos</CardTitle>
          <CardDescription>
            Custos separados por tipo de operação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(periodoData.custoPorTipo || {}).map(([tipo, valor]) => {
              const tipoLabels: Record<string, { label: string; icon: any }> = {
                transcricao_audio: { label: "Transcrição de Áudio", icon: Users },
                analise_ia: { label: "Análise com IA", icon: TrendingUp },
                pergunta_criada: { label: "Perguntas Criadas", icon: Briefcase },
                entrevista_criada: { label: "Entrevistas Criadas", icon: Briefcase },
              };

              const info = tipoLabels[tipo] || { label: tipo, icon: DollarSign };
              const Icon = info.icon;

              return (
                <div
                  key={tipo}
                  className="p-4 rounded-lg border bg-linear-to-br from-muted/50 to-muted/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{info.label}</p>
                  </div>
                  <p className="text-2xl font-bold">R$ {Number(valor).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
