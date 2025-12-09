"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Candidato {
  id: string;
  nome: string;
  email: string;
  status: string;
  concluidoEm?: Date;
  entrevistaId?: string;
  notaGeral?: number;
  recomendacao?: string;
}

interface PerguntaResposta {
  pergunta: {
    id: string;
    texto: string;
    ordem: number;
    tipo: string;
  };
  resposta: {
    id: string;
    texto: string | null;
    transcricao: string | null;
    tempoResposta: number | null;
  };
}

interface Participacao {
  status: string;
  notaGeral: number | null;
  recomendacao: string | null;
  resumoGeral: string | null;
  avaliadoEm: Date | null;
  concluidaEm: Date | null;
}

const getScoreColor = (score: number) => {
  if (score >= 8.5) return "text-green-600";
  if (score >= 7.0) return "text-yellow-600";
  return "text-red-600";
};

const getScoreLabel = (score: number) => {
  if (score >= 8.5) return "Excelente";
  if (score >= 7.0) return "Bom";
  if (score >= 5.0) return "Regular";
  return "Insuficiente";
};

const getRecomendacaoConfig = (recomendacao: string | null) => {
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
      return null;
  }
};

export default function ResultadoCandidatoPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [participacao, setParticipacao] = useState<Participacao | null>(null);
  const [perguntasRespostas, setPerguntasRespostas] = useState<PerguntaResposta[]>([]);

  const candidatoId = params.id as string;

  // Busca dados do candidato, participação e respostas
  const fetchData = async () => {
    try {
      setLoading(true);

      // Busca dados do candidato
      const candidatoRes = await fetch(`/api/candidatos/${candidatoId}`);
      if (!candidatoRes.ok) throw new Error('Erro ao buscar candidato');
      const candidatoData = await candidatoRes.json();
      setCandidato(candidatoData);

      // Busca respostas se tiver entrevistaId
      if (candidatoData.entrevistaId) {
        const respostasRes = await fetch(
          `/api/candidatos/${candidatoId}/respostas?entrevistaId=${candidatoData.entrevistaId}`
        );
        if (respostasRes.ok) {
          const respostasData = await respostasRes.json();
          setParticipacao(respostasData.participacao);
          setPerguntasRespostas(respostasData.perguntasRespostas);
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

  useEffect(() => {
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

    if (participacao?.status !== 'concluida') {
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
        description: "O Claude está analisando a entrevista. Isso pode levar alguns segundos...",
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

      // Recarrega os dados
      await fetchData();
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

  const recomendacaoConfig = getRecomendacaoConfig(participacao?.recomendacao || null);
  const RecomendacaoIcon = recomendacaoConfig?.icon;
  const temAvaliacao = participacao?.notaGeral !== null && participacao?.notaGeral !== undefined;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{candidato.nome}</h1>
          <p className="text-muted-foreground mt-1">{candidato.email}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={temAvaliacao ? "outline" : "default"}
            size="sm"
            onClick={handleAnalisar}
            disabled={analyzing || participacao?.status !== 'concluida'}
          >
            {analyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                {temAvaliacao ? <RefreshCw className="h-4 w-4 mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                {temAvaliacao ? "Reanalisar" : "Analisar com IA"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Aviso se não concluiu */}
      {participacao?.status !== 'concluida' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800">
                O candidato ainda não concluiu a entrevista. Status atual: <strong>{participacao?.status || 'pendente'}</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Geral e Recomendação (se tiver avaliação) */}
      {temAvaliacao && (
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
                      strokeDashoffset={`${2 * Math.PI * 88 * (1 - (participacao?.notaGeral || 0) / 10)}`}
                      className={getScoreColor(participacao?.notaGeral || 0)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getScoreColor(participacao?.notaGeral || 0)}`}>
                      {participacao?.notaGeral?.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground mt-1">
                      {getScoreLabel(participacao?.notaGeral || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recomendação */}
          {recomendacaoConfig && RecomendacaoIcon && (
            <Card className={`border-2 ${recomendacaoConfig.borderColor} ${recomendacaoConfig.bgColor}`}>
              <CardHeader>
                <CardTitle>Recomendação da IA</CardTitle>
                <CardDescription>Decisão sobre seguir no processo seletivo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <RecomendacaoIcon className={`w-20 h-20 ${recomendacaoConfig.iconColor}`} />
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold ${recomendacaoConfig.textColor}`}>
                      {recomendacaoConfig.label}
                    </h3>
                    {participacao?.avaliadoEm && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Avaliação em {new Date(participacao.avaliadoEm).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Resumo da Avaliação (se tiver) */}
      {participacao?.resumoGeral && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo da Avaliação</CardTitle>
            <CardDescription>Análise detalhada gerada pela IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {participacao.resumoGeral.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h4 key={i} className="font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="ml-4">{line.substring(2)}</li>;
                }
                if (line.trim()) {
                  return <p key={i} className="text-sm text-muted-foreground">{line}</p>;
                }
                return null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Perguntas e Respostas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Perguntas e Respostas
          </CardTitle>
          <CardDescription>
            {perguntasRespostas.length} pergunta{perguntasRespostas.length !== 1 ? 's' : ''} respondida{perguntasRespostas.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {perguntasRespostas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma resposta registrada ainda</p>
            </div>
          ) : (
            perguntasRespostas.map((item, index) => (
              <div key={item.pergunta.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                    {item.pergunta.ordem || index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.pergunta.texto}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {item.pergunta.tipo}
                    </Badge>
                  </div>
                </div>

                <div className="ml-11 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    {item.resposta.texto || item.resposta.transcricao || (
                      <span className="text-muted-foreground italic">Sem resposta</span>
                    )}
                  </p>
                  {item.resposta.tempoResposta && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{item.resposta.tempoResposta} segundos</span>
                    </div>
                  )}
                </div>

                {index < perguntasRespostas.length - 1 && <Separator className="mt-4" />}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Informações da Entrevista */}
      <Card>
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Candidato</p>
              <p className="text-sm font-semibold mt-1">{candidato.nome}</p>
              <p className="text-xs text-muted-foreground">{candidato.email}</p>
            </div>
            {participacao?.concluidaEm && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluída em</p>
                <p className="text-sm font-semibold mt-1">
                  {new Date(participacao.concluidaEm).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(participacao.concluidaEm).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={participacao?.status === 'concluida' ? 'secondary' : 'outline'} className="mt-1">
                {participacao?.status || 'Pendente'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
