"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Clock,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DecisaoCandidato } from "@/components/entrevistas/decisao-candidato";

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

interface Competencia {
  nome: string;
  categoria: "Experiência" | "Comunicação" | "Resolução de Problemas" | "Motivação" | "Fit com a Vaga";
  nota: number;
  descricao: string;
}

interface Participacao {
  status: string;
  notaGeral: number | null;
  compatibilidadeVaga: number | null;
  recomendacao: "recomendado" | "recomendado_com_ressalvas" | "nao_recomendado" | null;
  resumoGeral: string | null;
  competencias: Competencia[] | null;
  avaliadoEm: Date | null;
  concluidaEm: Date | null;
  // Decisão do recrutador
  decisaoRecrutador: "aprovado" | "reprovado" | null;
  decisaoRecrutadorEm: Date | null;
  decisaoRecrutadorObservacao: string | null;
  // Email de encerramento
  emailEncerramentoEnviadoEm: Date | null;
}

// Funções para notas de 0-100 (competências e compatibilidade)
const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBgColor = (score: number) => {
  if (score >= 85) return "bg-green-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-red-500";
};

const getScoreLabel = (score: number) => {
  if (score >= 85) return "Excelente";
  if (score >= 70) return "Bom";
  if (score >= 50) return "Regular";
  return "Insuficiente";
};

// Funções para nota geral de 0-100
const getScoreColor100 = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

const getScoreLabel100 = (score: number) => {
  if (score >= 85) return "Excelente";
  if (score >= 70) return "Bom";
  if (score >= 50) return "Regular";
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

// Parse do resumoGeral para extrair pontos fortes e de melhoria
function parseResumoGeral(resumo: string | null) {
  if (!resumo) return { texto: '', pontosFortes: [], pontosMelhoria: [] };

  const parts = resumo.split('**Pontos Fortes:**');
  const textoBase = parts[0]?.trim() || '';

  let pontosFortes: string[] = [];
  let pontosMelhoria: string[] = [];

  if (parts[1]) {
    const fortesEMelhoria = parts[1].split('**Pontos de Melhoria:**');

    // Extrair pontos fortes
    const fortesText = fortesEMelhoria[0] || '';
    pontosFortes = fortesText
      .split('\n')
      .filter(line => line.trim().startsWith('- '))
      .map(line => line.trim().substring(2));

    // Extrair pontos de melhoria
    if (fortesEMelhoria[1]) {
      pontosMelhoria = fortesEMelhoria[1]
        .split('\n')
        .filter(line => line.trim().startsWith('- '))
        .map(line => line.trim().substring(2));
    }
  }

  return { texto: textoBase, pontosFortes, pontosMelhoria };
}

// Calcula médias por categoria
function calcularMediasPorCategoria(competencias: Competencia[]) {
  const categorias = Array.from(new Set(competencias.map(c => c.categoria)));
  return categorias.reduce((acc, categoria) => {
    const comps = competencias.filter(c => c.categoria === categoria);
    const media = comps.reduce((sum, c) => sum + c.nota, 0) / comps.length;
    acc[categoria] = Math.round(media);
    return acc;
  }, {} as Record<string, number>);
}

export default function ResultadoCandidatoPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [participacao, setParticipacao] = useState<Participacao | null>(null);
  const [perguntasRespostas, setPerguntasRespostas] = useState<PerguntaResposta[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("todas");

  const candidatoId = params.id as string;
  // Pega entrevistaId da query string (se vier da página do candidato)
  const entrevistaIdParam = searchParams.get('entrevistaId');

  // Busca dados do candidato, participação e respostas
  const fetchData = async () => {
    try {
      setLoading(true);

      // Busca dados do candidato
      const candidatoRes = await fetch(`/api/candidatos/${candidatoId}`);
      if (!candidatoRes.ok) throw new Error('Erro ao buscar candidato');
      const candidatoData = await candidatoRes.json();

      // Usa o entrevistaId da query string se disponível, senão usa o do candidato
      const entrevistaId = entrevistaIdParam || candidatoData.entrevistaId;
      setCandidato({ ...candidatoData, entrevistaId });

      // Busca respostas se tiver entrevistaId
      if (entrevistaId) {
        const respostasRes = await fetch(
          `/api/candidatos/${candidatoId}/respostas?entrevistaId=${entrevistaId}`
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
  }, [candidatoId, entrevistaIdParam]);

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
        description: "A IA está analisando a entrevista. Isso pode levar alguns segundos...",
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

  // Gera e baixa o PDF via API (server-side)
  const handleDownloadPDF = async () => {
    if (!candidato || !candidato.entrevistaId) return;

    try {
      setGeneratingPDF(true);

      toast({
        title: "Gerando PDF",
        description: "Aguarde enquanto preparamos o relatorio...",
      });

      // Chama a API para gerar o PDF no servidor
      const response = await fetch(
        `/api/candidatos/${candidatoId}/pdf?entrevistaId=${candidato.entrevistaId}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao gerar PDF");
      }

      // Baixa o PDF
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `avaliacao-${candidato.nome.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "PDF gerado com sucesso!",
        description: "O download foi iniciado automaticamente",
      });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro ao gerar PDF",
        description: error instanceof Error ? error.message : "Nao foi possivel gerar o relatorio. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setGeneratingPDF(false);
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
  const { texto: resumoTexto, pontosFortes, pontosMelhoria } = parseResumoGeral(participacao?.resumoGeral || null);

  // Competências e médias
  const competencias = participacao?.competencias || [];
  const categorias = Array.from(new Set(competencias.map(c => c.categoria)));
  const mediaPorCategoria = competencias.length > 0 ? calcularMediasPorCategoria(competencias) : {};
  const competenciasFiltradas = categoriaSelecionada === "todas"
    ? competencias
    : competencias.filter(c => c.categoria === categoriaSelecionada);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="outline" size="touch-icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight truncate">{candidato.nome}</h1>
            <p className="text-sm text-muted-foreground truncate">{candidato.email}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {temAvaliacao && (
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              disabled={generatingPDF}
              className="w-full sm:w-auto shrink-0"
            >
              {generatingPDF ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </>
              )}
            </Button>
          )}
          <Button
            variant={temAvaliacao ? "outline" : "default"}
            onClick={handleAnalisar}
            disabled={analyzing || participacao?.status !== 'concluida'}
            className="w-full sm:w-auto shrink-0"
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

      {/* Scores e Recomendação (se tiver avaliação) */}
      {temAvaliacao && (
        <>
          {/* Nota Geral e Compatibilidade */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Nota Geral (0-100) */}
            <Card>
              <CardHeader>
                <CardTitle>Nota Geral</CardTitle>
                <CardDescription>Avaliação geral do candidato (0-100)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-6">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <svg
                      viewBox="0 0 160 160"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 72}`}
                        strokeDashoffset={`${2 * Math.PI * 72 * (1 - (participacao?.notaGeral || 0) / 100)}`}
                        className={getScoreColor100(participacao?.notaGeral || 0)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl sm:text-4xl font-bold ${getScoreColor100(participacao?.notaGeral || 0)}`}>
                        {Math.round(participacao?.notaGeral || 0)}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {getScoreLabel100(participacao?.notaGeral || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatibilidade com a Vaga */}
            <Card>
              <CardHeader>
                <CardTitle>Compatibilidade</CardTitle>
                <CardDescription>Fit com a vaga específica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-6">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <svg
                      viewBox="0 0 160 160"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 72}`}
                        strokeDashoffset={`${2 * Math.PI * 72 * (1 - (participacao?.compatibilidadeVaga || 0) / 100)}`}
                        className={getScoreColor(participacao?.compatibilidadeVaga || 0)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl sm:text-4xl font-bold ${getScoreColor(participacao?.compatibilidadeVaga || 0)}`}>
                        {Math.round(participacao?.compatibilidadeVaga || 0)}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {getScoreLabel(participacao?.compatibilidadeVaga || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendação da IA */}
          {recomendacaoConfig && RecomendacaoIcon && (
            <Card className={`border-2 ${recomendacaoConfig.borderColor} ${recomendacaoConfig.bgColor}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <RecomendacaoIcon className={`w-12 h-12 ${recomendacaoConfig.iconColor}`} />
                    <div>
                      <h3 className={`text-xl font-bold ${recomendacaoConfig.textColor}`}>
                        {recomendacaoConfig.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Recomendação da IA para o processo seletivo
                      </p>
                    </div>
                  </div>
                  {participacao?.avaliadoEm && (
                    <p className="text-sm text-muted-foreground">
                      {new Date(participacao.avaliadoEm).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Decisão do Recrutador - Card de ação principal */}
      {participacao?.status === 'concluida' && candidato.entrevistaId && (
        <Card className="border-2 border-slate-200">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Sua Decisão</h3>
                <p className="text-sm text-muted-foreground">
                  Decida se o candidato deve avançar para a próxima fase
                </p>
              </div>
              <DecisaoCandidato
                candidatoId={candidato.id}
                entrevistaId={candidato.entrevistaId}
                candidatoNome={candidato.nome}
                decisaoAtual={participacao.decisaoRecrutador}
                recomendacaoIA={participacao.recomendacao}
                observacaoAtual={participacao.decisaoRecrutadorObservacao}
                emailEncerramentoEnviado={!!participacao.emailEncerramentoEnviadoEm}
                onDecisaoAtualizada={fetchData}
                showActionButtons
              />
            </div>
            {participacao.decisaoRecrutadorObservacao && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Observação:</p>
                <p className="text-sm">{participacao.decisaoRecrutadorObservacao}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Resumo Executivo (se tiver) */}
      {resumoTexto && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo Executivo</CardTitle>
            <CardDescription>Visão geral do desempenho do candidato</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{resumoTexto}</p>
          </CardContent>
        </Card>
      )}

      {/* Pontos Fortes e de Melhoria */}
      {(pontosFortes.length > 0 || pontosMelhoria.length > 0) && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pontos Fortes */}
          {pontosFortes.length > 0 && (
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
                  {pontosFortes.map((ponto, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{ponto}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Pontos de Melhoria */}
          {pontosMelhoria.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                  <CardTitle>Pontos de Atenção</CardTitle>
                </div>
                <CardDescription>Áreas para desenvolvimento</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pontosMelhoria.map((ponto, index) => (
                    <li key={index} className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{ponto}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Competências Avaliadas */}
      {competencias.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Competências Avaliadas</CardTitle>
            <CardDescription>Análise detalhada por categoria de competências</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Médias por Categoria */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Médias por Categoria</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categorias.map((categoria) => {
                  const media = mediaPorCategoria[categoria];
                  return (
                    <div
                      key={categoria}
                      className={`p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer ${
                        categoriaSelecionada === categoria ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setCategoriaSelecionada(categoria === categoriaSelecionada ? "todas" : categoria)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{categoria}</span>
                        <span className={`text-lg font-bold ${getScoreColor(media)}`}>
                          {media}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getScoreBgColor(media)}`}
                          style={{ width: `${media}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Filtro de Categorias */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Button
                  variant={categoriaSelecionada === "todas" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoriaSelecionada("todas")}
                >
                  Todas
                </Button>
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    variant={categoriaSelecionada === categoria ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoriaSelecionada(categoria)}
                  >
                    {categoria}
                  </Button>
                ))}
              </div>
            </div>

            {/* Lista de Competências */}
            <div className="space-y-4">
              {competenciasFiltradas.map((competencia, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{competencia.nome}</p>
                      <p className="text-xs text-muted-foreground">{competencia.descricao}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={`${
                          competencia.nota >= 85 ? 'bg-green-100 text-green-800' :
                          competencia.nota >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {getScoreLabel(competencia.nota)}
                      </Badge>
                      <span className={`text-xl font-bold min-w-12 text-right ${getScoreColor(competencia.nota)}`}>
                        {competencia.nota}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${getScoreBgColor(competencia.nota)}`}
                      style={{ width: `${competencia.nota}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Perguntas e Respostas */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Perguntas e Respostas
          </CardTitle>
          <CardDescription>
            {perguntasRespostas.length} pergunta{perguntasRespostas.length !== 1 ? 's' : ''} respondida{perguntasRespostas.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {perguntasRespostas.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground px-6">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma resposta registrada ainda</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {perguntasRespostas.map((item, index) => (
                <div key={item.pergunta.id} className="group">
                  {/* Pergunta - Estilo entrevistador */}
                  <div className="px-6 py-4 bg-slate-100">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0 shadow-sm">
                        {item.pergunta.ordem || index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-primary">Entrevistador</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 leading-relaxed">
                          {item.pergunta.texto}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resposta - Estilo candidato */}
                  <div className="px-6 py-4 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                        <span className="text-xs font-semibold">
                          {candidato?.nome?.charAt(0).toUpperCase() || 'C'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-medium text-emerald-600">
                            {candidato?.nome?.split(' ')[0] || 'Candidato'}
                          </span>
                          {item.resposta.tempoResposta && (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock className="h-3 w-3" />
                              <span>{item.resposta.tempoResposta}s</span>
                            </div>
                          )}
                        </div>
                        {item.resposta.texto || item.resposta.transcricao ? (
                          <div className="relative">
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                              {item.resposta.texto || item.resposta.transcricao}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-400 italic">
                            Sem resposta registrada
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
