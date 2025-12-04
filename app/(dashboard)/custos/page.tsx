"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const custosMock = {
  totalMensal: 15420.50,
  mediaPorVaga: 1285.04,
  variacao: 12.5,
  custosPorCategoria: [
    { categoria: "Plataforma de Entrevistas", valor: 5800.00, porcentagem: 37.6 },
    { categoria: "Anúncios de Vagas", valor: 4200.00, porcentagem: 27.2 },
    { categoria: "Ferramentas de Recrutamento", valor: 3420.50, porcentagem: 22.2 },
    { categoria: "Assessments e Testes", valor: 2000.00, porcentagem: 13.0 },
  ],
  historicoMensal: [
    { mes: "Fev", valor: 13700 },
    { mes: "Mar", valor: 15420 },
  ],
};

export default function CustosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Custos</h1>
          <p className="text-muted-foreground">
            Acompanhe os custos do processo de recrutamento
          </p>
        </div>
        <Select defaultValue="mes-atual">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mes-atual">Mês Atual</SelectItem>
            <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
            <SelectItem value="trimestre">Último Trimestre</SelectItem>
            <SelectItem value="ano">Ano Atual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Total Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {custosMock.totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +{custosMock.variacao}% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Médio por Vaga</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {custosMock.mediaPorVaga.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Baseado em 12 vagas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Previsão Próximo Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(custosMock.totalMensal * 1.05).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimativa baseada no crescimento atual
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Custos por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Custos por Categoria</CardTitle>
          <CardDescription>Distribuição dos gastos por área</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {custosMock.custosPorCategoria.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.categoria}</span>
                  <span className="text-muted-foreground">
                    R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.porcentagem}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.porcentagem}% do total
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico Mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Custos</CardTitle>
          <CardDescription>Evolução dos custos nos últimos meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {custosMock.historicoMensal.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <span className="font-medium">{item.mes}/2024</span>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">
                    R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  {index > 0 && (
                    <div className="flex items-center text-sm">
                      {item.valor > custosMock.historicoMensal[index - 1].valor ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
