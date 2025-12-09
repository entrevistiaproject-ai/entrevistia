"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Download,
  Send,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface Candidato {
  id: string;
  nome: string;
  email: string;
  status: string;
  concluidoEm?: Date;
  entrevistaId?: string;
}

interface CompetenciaAvaliacao {
  competenciaId: string;
  competencia: string;
  nota: number;
  feedback: string;
}

interface Avaliacao {
  id: string;
  notaGeral: number;
  resumoGeral: string;
  pontosFortes: string[];
  pontosMelhoria: string[];
  recomendacao: 'recomendado' | 'recomendado_com_ressalvas' | 'nao_recomendado';
  analisadoEm?: Date;
  competencias: CompetenciaAvaliacao[];
}

const getScoreColor = (score: number) => {
  if (score >= 8.5) return "text-green-600";
  if (score >= 7.0) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBgColor = (score: number) => {
  if (score >= 8.5) return "bg-green-100";
  if (score >= 7.0) return "bg-yellow-100";
  return "bg-red-100";
};

const getScoreLabel = (score: number) => {
  if (score >= 8.5) return "Excelente";
  if (score >= 7.0) return "Bom";
  if (score >= 5.0) return "Regular";
  return "Insuficiente";
};

const getRecomendacaoConfig = (recomendacao: string) => {
  switch (recomendacao) {
    case "recomendado":
      return {
        label: "Recomendado para Próxima Fase",
        icon: CheckCircle2,
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-700",
        iconColor: "text-green-600",
      };
    case "nao_recomendado":
      return {
        label: "Não Recomendado",
        icon: XCircle,
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-700",
        iconColor: "text-red-600",
      };
    case "recomendado_com_ressalvas":
      return {
        label: "Recomendado com Ressalvas",
        icon: AlertCircle,
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-700",
        iconColor: "text-yellow-600",
      };
    default:
      return {
        label: "Análise Pendente",
        icon: AlertCircle,
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        textColor: "text-gray-700",
        iconColor: "text-gray-600",
      };
  }
};

export default function ResultadoCandidatoPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [mostrarJustificativa, setMostrarJustificativa] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);

  const candidatoId = params.id as string;

  // Busca dados do candidato e avaliação
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Busca dados do candidato
        const candidatoRes = await fetch(`/api/candidatos/${candidatoId}`);
        if (!candidatoRes.ok) throw new Error('Erro ao buscar candidato');
        const candidatoData = await candidatoRes.json();
        setCandidato(candidatoData);

        // Busca avaliação se existir
        if (candidatoData.entrevistaId) {
          const avaliacaoRes = await fetch(
            `/api/analise-entrevista?candidatoId=${candidatoId}&entrevistaId=${candidatoData.entrevistaId}`
          );
          if (avaliacaoRes.ok) {
            const avaliacaoData = await avaliacaoRes.json();
            if (avaliacaoData.exists) {
              setAvaliacao(avaliacaoData.avaliacao);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do candidato",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [candidatoId]);

  // Inicia análise com IA
  const handleAnalisar = async () => {
    if (!candidato?.entrevistaId) {
      toast({
        title: "Erro",
        description: "Candidato não possui entrevista vinculada",
        variant: "destructive",
      });
      return;
    }

    if (candidato.status !== 'concluido') {
      toast({
        title: "Aviso",
        description: "O candidato ainda não concluiu a entrevista",
        variant: "destructive",
      });
      return;
    }

    try {
      setAnalyzing(true);

      toast({
        title: "Análise iniciada",
        description: "O Claude está analisando a entrevista. Isso pode levar alguns minutos...",
      });

      const response = await fetch('/api/analise-entrevista', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidatoId,
          entrevistaId: candidato.entrevistaId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao analisar entrevista');
      }

      toast({
        title: "Análise concluída!",
        description: "A avaliação foi gerada com sucesso",
      });

      // Recarrega a avaliação
      const avaliacaoRes = await fetch(
        `/api/analise-entrevista?candidatoId=${candidatoId}&entrevistaId=${candidato.entrevistaId}`
      );
      if (avaliacaoRes.ok) {
        const avaliacaoData = await avaliacaoRes.json();
        if (avaliacaoData.exists) {
          setAvaliacao(avaliacaoData.avaliacao);
        }
      }
    } catch (error) {
      console.error('Erro ao analisar:', error);
      toast({
        title: "Erro na análise",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!candidato) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Candidato não encontrado</p>
      </div>
    );
  }

  // Se não há avaliação, mostra opção para gerar
  if (!avaliacao) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Resultado da Avaliação</h1>
            <p className="text-muted-foreground mt-1">{candidato.nome}</p>
          </div>
        </div>

        <Card className="border-2 border-dashed">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Análise com IA Disponível</CardTitle>
            <CardDescription>
              Gere uma avaliação completa do candidato usando inteligência artificial
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              O Claude irá analisar todas as respostas do candidato e gerar uma avaliação
              detalhada com notas por competência, pontos fortes, áreas de melhoria e uma
              recomendação final.
            </p>
            <Button
              onClick={handleAnalisar}
              disabled={analyzing || candidato.status !== 'concluido'}
              size="lg"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gerar Avaliação com IA
                </>
              )}
            </Button>
            {candidato.status !== 'concluido' && (
              <p className="text-xs text-muted-foreground mt-4">
                Candidato precisa concluir a entrevista antes de gerar a avaliação
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const recomendacaoConfig = getRecomendacaoConfig(avaliacao.recomendacao);
  const RecomendacaoIcon = recomendacaoConfig.icon;

  // Agrupa competências (se tiver informação de categoria, poderia agrupar)
  const todasCompetencias = avaliacao.competencias;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Resultado da Avaliação</h1>
          <p className="text-muted-foreground mt-1">{candidato.nome}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAnalisar}
            disabled={analyzing}
          >
            {analyzing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Reanalisar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button size="sm">
            <Send className="h-4 w-4 mr-2" />
            Enviar Resultado
          </Button>
        </div>
      </div>

      {/* Score Geral e Recomendação */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Score Geral */}
        <Card>
          <CardHeader>
            <CardTitle>Nota Geral</CardTitle>
            <CardDescription>Pontuação consolidada da avaliação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - avaliacao.notaGeral / 10)}`}
                    className={getScoreColor(avaliacao.notaGeral)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${getScoreColor(avaliacao.notaGeral)}`}>
                    {avaliacao.notaGeral.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {getScoreLabel(avaliacao.notaGeral)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recomendação */}
        <Card className={`border-2 ${recomendacaoConfig.borderColor} ${recomendacaoConfig.bgColor}`}>
          <CardHeader>
            <CardTitle>Recomendação</CardTitle>
            <CardDescription>Decisão sobre seguir no processo seletivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <RecomendacaoIcon className={`w-20 h-20 ${recomendacaoConfig.iconColor}`} />
              <div className="text-center">
                <h3 className={`text-2xl font-bold ${recomendacaoConfig.textColor}`}>
                  {recomendacaoConfig.label}
                </h3>
                {avaliacao.analisadoEm && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Avaliação realizada em {new Date(avaliacao.analisadoEm).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo</CardTitle>
          <CardDescription>Visão geral do desempenho do candidato</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{avaliacao.resumoGeral}</p>
        </CardContent>
      </Card>

      {/* Pontos Fortes e Melhorias */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle>Pontos Fortes</CardTitle>
            </div>
            <CardDescription>Competências e qualidades destacadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {avaliacao.pontosFortes.map((ponto, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm">{ponto}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              <CardTitle>Pontos de Melhoria</CardTitle>
            </div>
            <CardDescription>Áreas para desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {avaliacao.pontosMelhoria.map((ponto, index) => (
                <li key={index} className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                  <span className="text-sm">{ponto}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Competências Avaliadas */}
      <Card>
        <CardHeader>
          <CardTitle>Competências Avaliadas</CardTitle>
          <CardDescription>Análise detalhada por competência</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {todasCompetencias.map((comp, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{comp.competencia}</p>
                  <p className="text-xs text-muted-foreground mt-1">{comp.feedback}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getScoreBgColor(comp.nota)}>
                    {getScoreLabel(comp.nota)}
                  </Badge>
                  <span className={`text-xl font-bold min-w-[3rem] text-right ${getScoreColor(comp.nota)}`}>
                    {comp.nota.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all ${
                    comp.nota >= 8.5
                      ? 'bg-green-500'
                      : comp.nota >= 7.0
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${(comp.nota / 10) * 100}%` }}
                />
              </div>
              {index < todasCompetencias.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Informações da Entrevista */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Entrevista</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Candidato</p>
              <p className="text-sm font-semibold mt-1">{candidato.nome}</p>
              <p className="text-xs text-muted-foreground">{candidato.email}</p>
            </div>
            {candidato.concluidoEm && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluída em</p>
                <p className="text-sm font-semibold mt-1">
                  {new Date(candidato.concluidoEm).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(candidato.concluidoEm).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p className="text-sm font-semibold mt-1 capitalize">{candidato.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
