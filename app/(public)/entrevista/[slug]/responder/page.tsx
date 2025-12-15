"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GravadorAudio } from "@/components/gravador-audio";
import { VerificacaoMicrofone } from "@/components/verificacao-microfone";
import { TutorialEntrevista } from "@/components/tutorial-entrevista";
import { Loader2, CheckCircle2, Clock, AlertCircle, PartyPopper, Sparkles, Info, XCircle } from "lucide-react";
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
type Fase = "reflexao" | "resposta" | "processando" | "concluida" | "expirada";

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
  const [perguntasRespondidas, setPerguntasRespondidas] = useState<string[]>([]);
  const [tempoReflexao, setTempoReflexao] = useState(45); // 45 segundos
  const [inicioResposta, setInicioResposta] = useState<number>(0);

  useEffect(() => {
    if (!candidatoId || !sessaoId) {
      router.push(`/entrevista/${slug}`);
      return;
    }

    carregarEntrevistaEProgresso();
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

  const carregarEntrevistaEProgresso = async () => {
    try {
      setCarregando(true);
      setErro(null);

      // Carregar entrevista e progresso em paralelo
      const [entrevistaResponse, progressoResponse] = await Promise.all([
        fetch(`/api/entrevista-publica/${slug}`),
        fetch(`/api/entrevista-publica/${slug}/progresso?candidatoId=${candidatoId}&sessaoId=${sessaoId}`),
      ]);

      if (!entrevistaResponse.ok) {
        throw new Error("Erro ao carregar entrevista");
      }

      const entrevistaData = await entrevistaResponse.json();
      setEntrevista(entrevistaData);

      // Carregar progresso se disponível
      if (progressoResponse.ok) {
        const progressoData = await progressoResponse.json();

        // Se já concluiu, mostrar mensagem
        if (progressoData.status === "concluida") {
          setFase("concluida");
          return;
        }

        // Se expirou, mostrar mensagem amigável
        if (progressoData.status === "expirada") {
          setFase("expirada");
          return;
        }

        // Marcar perguntas já respondidas
        if (progressoData.perguntasRespondidas?.length > 0) {
          setPerguntasRespondidas(progressoData.perguntasRespondidas);

          // Encontrar a primeira pergunta não respondida
          const primeiraAindaNaoRespondida = entrevistaData.perguntas.findIndex(
            (p: Pergunta) => !progressoData.perguntasRespondidas.includes(p.id)
          );

          if (primeiraAindaNaoRespondida !== -1) {
            setPerguntaAtualIndex(primeiraAindaNaoRespondida);
          } else {
            // Todas respondidas, finalizar
            setFase("concluida");
          }
        }
      }
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

      // Marcar pergunta como respondida
      const novasRespondidas = [...perguntasRespondidas, perguntaAtual.id];
      setPerguntasRespondidas(novasRespondidas);

      // Encontrar próxima pergunta não respondida
      const proximaNaoRespondida = entrevista.perguntas.findIndex(
        (p, idx) => idx > perguntaAtualIndex && !novasRespondidas.includes(p.id)
      );

      if (proximaNaoRespondida !== -1) {
        setPerguntaAtualIndex(proximaNaoRespondida);
        setFase("reflexao");
        setTempoReflexao(45);
      } else {
        // Todas as perguntas foram respondidas, finalizar
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
        <div className="flex flex-col items-center gap-5">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Preparando sua entrevista...</p>
        </div>
      </div>
    );
  }

  if (erro || !entrevista) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 px-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Ops!</h1>
            <p className="text-muted-foreground">{erro || "Não conseguimos encontrar essa entrevista"}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Etapa de verificação do microfone
  if (etapaPreparacao === "verificacao-microfone") {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold">{entrevista.titulo}</h1>
            <p className="text-muted-foreground mt-3">Vamos verificar se está tudo pronto</p>
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
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold">{entrevista.titulo}</h1>
            <p className="text-muted-foreground mt-3">Veja como funciona antes de começar</p>
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
      <div className="min-h-screen bg-linear-to-br from-green-50 to-primary/10 dark:from-green-950/20 dark:to-primary/5 flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-10 pb-10 px-6">
            <div className="relative mx-auto w-20 h-20 mb-7">
              <div className="absolute inset-0 rounded-full bg-green-200 dark:bg-green-800 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <h1 className="text-2xl sm:text-3xl font-bold">
                Pronto!
              </h1>
              <PartyPopper className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-muted-foreground mb-7">
              Suas respostas foram enviadas. Obrigado por participar!
            </p>
            <div className="bg-muted/50 rounded-xl p-5">
              <p className="text-sm text-muted-foreground">
                A empresa vai analisar suas respostas e entrará em contato em breve.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de entrevista expirada
  if (fase === "expirada") {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/20 flex items-center justify-center p-4 sm:p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-10 pb-10 px-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-7">
              <Clock className="h-10 w-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400 mb-3">
              Prazo Expirado
            </h1>
            <p className="text-muted-foreground mb-6">
              Infelizmente o prazo para realizar esta entrevista terminou.
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-5 mb-6">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                O prazo de <strong>48 horas</strong> para completar a entrevista foi excedido.
                Sua candidatura não pôde ser processada.
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-5">
              <p className="text-sm text-muted-foreground">
                Se você acredita que isso foi um erro ou deseja uma nova oportunidade,
                entre em contato diretamente com a empresa recrutadora.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const perguntaAtual = entrevista.perguntas[perguntaAtualIndex];
  const totalPerguntas = entrevista.perguntas.length;
  // Progresso baseado em respostas já feitas
  const perguntasCompletadas = perguntasRespondidas.length;
  const progresso = ((perguntasCompletadas + 1) / totalPerguntas) * 100;
  const tempoMaximoResposta = perguntaAtual.tempoMaximo || entrevista.tempoResposta || 180;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
        {/* Progresso */}
        <Card>
          <CardContent className="py-5 px-5 sm:px-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Pergunta {perguntasCompletadas + 1} de {totalPerguntas}
              </span>
              <span className="text-sm font-bold text-primary">
                {Math.round(progresso)}%
              </span>
            </div>
            <Progress value={progresso} className="h-2.5" />
          </CardContent>
        </Card>

        {/* Pergunta */}
        <Card>
          <CardHeader className="pb-5 pt-6 px-5 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl leading-relaxed">
              {perguntaAtual.texto}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 sm:px-6 pb-6">
            {fase === "reflexao" && (
              <div className="text-center py-10 sm:py-14">
                <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-7">
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
                  Use esse tempo para pensar na sua resposta
                </p>
                <Button onClick={pularReflexao} size="touch" className="w-full sm:w-auto">
                  Estou pronto, começar agora
                </Button>
              </div>
            )}

            {fase === "resposta" && (
              <div className="py-8 sm:py-10">
                <GravadorAudio
                  onTranscricaoCompleta={handleTranscricaoCompleta}
                  tempoMaximo={tempoMaximoResposta}
                />
                <div className="text-center mt-7">
                  <p className="text-sm text-muted-foreground">
                    Tempo máximo: {Math.floor(tempoMaximoResposta / 60)}:{(tempoMaximoResposta % 60)
                      .toString()
                      .padStart(2, "0")} minutos
                  </p>
                </div>
              </div>
            )}

            {fase === "processando" && (
              <div className="text-center py-10 sm:py-14">
                <div className="relative mx-auto w-20 h-20 mb-7">
                  <Loader2 className="h-20 w-20 text-primary animate-spin" />
                </div>
                <p className="text-muted-foreground font-medium">
                  Salvando sua resposta...
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Só um momento
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informações */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="py-5 px-5 sm:px-6">
            <div className="flex items-start gap-4">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  Como funciona
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <li>• Você tem 45 segundos para pensar antes de cada pergunta</li>
                  <li>• Depois, pode gravar sua resposta em áudio (até 3 min)</li>
                  <li>• Se quiser, pode pular o tempo de reflexão e responder direto</li>
                  <li>• Suas respostas são transcritas automaticamente</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
