"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GravadorAudio } from "@/components/gravador-audio";
import { VerificacaoMicrofone } from "@/components/verificacao-microfone";
import { TutorialEntrevista } from "@/components/tutorial-entrevista";
import { Loader2, CheckCircle2, Clock, AlertCircle, PartyPopper, Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Pergunta {
  id: string;
  texto: string;
  ordem: number;
  tipo: string;
  obrigatoria: string;
  tempoMaximo: number | null;
}

interface EntrevistaPublica {
  id: string;
  titulo: string;
  descricao?: string;
  perguntas: Pergunta[];
  tempoResposta?: number;
}

type EtapaPreparacao = "verificacao-microfone" | "tutorial" | "entrevista";
type Fase = "reflexao" | "resposta" | "processando" | "concluida";

export default function ResponderEntrevistaPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = params.slug as string;
  const candidatoId = searchParams.get("candidatoId");
  const sessaoId = searchParams.get("sessaoId");

  const [entrevista, setEntrevista] = useState<EntrevistaPublica | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [etapaPreparacao, setEtapaPreparacao] = useState<EtapaPreparacao>("verificacao-microfone");
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0);
  const [fase, setFase] = useState<Fase>("reflexao");
  const [tempoReflexao, setTempoReflexao] = useState(45); // 45 segundos
  const [inicioResposta, setInicioResposta] = useState<number>(0);

  useEffect(() => {
    if (!candidatoId || !sessaoId) {
      router.push(`/entrevista/${slug}`);
      return;
    }

    carregarEntrevista();
  }, [slug, candidatoId, sessaoId]);

  useEffect(() => {
    if (fase === "reflexao" && tempoReflexao > 0) {
      const timer = setTimeout(() => {
        setTempoReflexao((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (fase === "reflexao" && tempoReflexao === 0) {
      iniciarFaseResposta();
    }
  }, [fase, tempoReflexao]);

  const carregarEntrevista = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch(`/api/entrevista-publica/${slug}`);

      if (!response.ok) {
        throw new Error("Erro ao carregar entrevista");
      }

      const data = await response.json();
      setEntrevista(data);
    } catch (error) {
      console.error("Erro ao carregar entrevista:", error);
      setErro("Não foi possível carregar a entrevista");
    } finally {
      setCarregando(false);
    }
  };

  const iniciarFaseResposta = () => {
    setFase("resposta");
    setInicioResposta(Date.now());
  };

  const pularReflexao = () => {
    setTempoReflexao(0);
    iniciarFaseResposta();
  };

  const handleTranscricaoCompleta = async (
    transcricao: string,
    duracao: number
  ) => {
    if (!entrevista || !candidatoId || !sessaoId) return;

    try {
      setFase("processando");

      const perguntaAtual = entrevista.perguntas[perguntaAtualIndex];
      const tempoResposta = Math.floor((Date.now() - inicioResposta) / 1000);

      // Salvar resposta
      const response = await fetch(`/api/entrevista-publica/${slug}/responder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidatoId,
          sessaoId,
          perguntaId: perguntaAtual.id,
          transcricao,
          tempoResposta,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar resposta");
      }

      // Ir para próxima pergunta ou finalizar
      if (perguntaAtualIndex < entrevista.perguntas.length - 1) {
        setPerguntaAtualIndex((prev) => prev + 1);
        setFase("reflexao");
        setTempoReflexao(45);
      } else {
        // Finalizar entrevista
        await finalizarEntrevista();
      }
    } catch (error) {
      console.error("Erro ao processar resposta:", error);
      setErro("Erro ao salvar resposta. Tente novamente.");
      setFase("resposta");
    }
  };

  const finalizarEntrevista = async () => {
    try {
      await fetch(`/api/entrevista-publica/${slug}/finalizar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessaoId }),
      });

      setFase("concluida");
    } catch (error) {
      console.error("Erro ao finalizar entrevista:", error);
      setErro("Erro ao finalizar entrevista");
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando entrevista...</p>
        </div>
      </div>
    );
  }

  if (erro || !entrevista) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Erro</h1>
            <p className="text-muted-foreground">{erro || "Entrevista não encontrada"}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Etapa de verificação do microfone
  if (etapaPreparacao === "verificacao-microfone") {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">{entrevista.titulo}</h1>
            <p className="text-muted-foreground mt-2">Preparação para a entrevista</p>
          </div>
          <VerificacaoMicrofone
            onMicrofoneVerificado={() => setEtapaPreparacao("tutorial")}
          />
        </div>
      </div>
    );
  }

  // Etapa do tutorial
  if (etapaPreparacao === "tutorial") {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">{entrevista.titulo}</h1>
            <p className="text-muted-foreground mt-2">Tutorial de prática</p>
          </div>
          <TutorialEntrevista
            onTutorialCompleto={() => setEtapaPreparacao("entrevista")}
          />
        </div>
      </div>
    );
  }

  if (fase === "concluida") {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-primary/10 dark:from-green-950/20 dark:to-primary/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <h1 className="text-2xl sm:text-3xl font-bold">
                Entrevista Concluída!
              </h1>
              <PartyPopper className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-muted-foreground mb-6">
              Obrigado por participar. Suas respostas foram registradas com sucesso.
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Em breve você receberá um retorno sobre o processo seletivo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const perguntaAtual = entrevista.perguntas[perguntaAtualIndex];
  const totalPerguntas = entrevista.perguntas.length;
  const progresso = ((perguntaAtualIndex + 1) / totalPerguntas) * 100;
  const tempoMaximoResposta = perguntaAtual.tempoMaximo || entrevista.tempoResposta || 180;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Progresso */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                Pergunta {perguntaAtualIndex + 1} de {totalPerguntas}
              </span>
              <span className="text-sm font-bold text-primary">
                {Math.round(progresso)}%
              </span>
            </div>
            <Progress value={progresso} className="h-2" />
          </CardContent>
        </Card>

        {/* Pergunta */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl leading-relaxed">
              {perguntaAtual.texto}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fase === "reflexao" && (
              <div className="text-center py-8 sm:py-12">
                <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-muted/30"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray={`${(tempoReflexao / 45) * 283} 283`}
                      className="text-primary transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-bold">{tempoReflexao}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-8">
                  Tempo para refletir sobre sua resposta
                </p>
                <Button onClick={pularReflexao} size="touch" className="w-full sm:w-auto">
                  Começar a Responder Agora
                </Button>
              </div>
            )}

            {fase === "resposta" && (
              <div className="py-6 sm:py-8">
                <GravadorAudio
                  onTranscricaoCompleta={handleTranscricaoCompleta}
                  tempoMaximo={tempoMaximoResposta}
                />
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Tempo máximo: {Math.floor(tempoMaximoResposta / 60)}:{(tempoMaximoResposta % 60)
                      .toString()
                      .padStart(2, "0")} minutos
                  </p>
                </div>
              </div>
            )}

            {fase === "processando" && (
              <div className="text-center py-8 sm:py-12">
                <div className="relative mx-auto w-20 h-20 mb-6">
                  <Loader2 className="h-20 w-20 text-primary animate-spin" />
                </div>
                <p className="text-muted-foreground font-medium">
                  Processando sua resposta...
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Isso pode levar alguns segundos
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informações */}
        <Card className="bg-muted/30">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">
                  Como funciona?
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• Você terá 45 segundos para refletir sobre cada pergunta</li>
                  <li>• Em seguida, terá até 3 minutos para gravar sua resposta em áudio</li>
                  <li>• Você pode começar a gravar antes dos 45 segundos</li>
                  <li>• Suas respostas serão automaticamente transcritas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
