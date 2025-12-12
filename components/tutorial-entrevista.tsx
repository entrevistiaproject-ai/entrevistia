"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Square,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  Volume2,
  RotateCcw,
  Lightbulb,
  Clock,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TutorialEntrevistaProps {
  onTutorialCompleto: () => void;
}

interface PerguntaTutorial {
  id: number;
  texto: string;
  dica: string;
  tempoSugerido: number; // segundos
}

const PERGUNTAS_TUTORIAL: PerguntaTutorial[] = [
  {
    id: 1,
    texto: "Diga seu nome completo e conte brevemente o que você faz profissionalmente.",
    dica: "Esta é uma pergunta simples para você se familiarizar com a gravação. Seja natural e direto.",
    tempoSugerido: 30,
  },
  {
    id: 2,
    texto: "Qual foi a última habilidade nova que você aprendeu e como foi esse processo?",
    dica: "Aqui você pode praticar como estruturar uma resposta: conte o contexto, o que fez e o resultado.",
    tempoSugerido: 60,
  },
  {
    id: 3,
    texto: "Se você pudesse melhorar uma coisa no seu dia a dia de trabalho, o que seria e por quê?",
    dica: "Esta pergunta é sobre reflexão. Mostre que você consegue pensar criticamente e propor soluções.",
    tempoSugerido: 60,
  },
];

export function TutorialEntrevista({ onTutorialCompleto }: TutorialEntrevistaProps) {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [fase, setFase] = useState<"intro" | "pergunta" | "gravando" | "revisao" | "concluido">("intro");
  const [tempoGravacao, setTempoGravacao] = useState(0);
  const [nivelAudio, setNivelAudio] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [perguntasCompletas, setPerguntasCompletas] = useState<Set<number>>(new Set());

  // Estados do player de áudio customizado (necessário para iOS)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mimeTypeRef = useRef<string>("audio/webm");
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pararMonitoramento = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  }, []);

  // Cleanup do player de áudio
  const pararPlayback = useCallback(() => {
    if (playbackTimerRef.current) {
      clearInterval(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setPlaybackProgress(0);
  }, []);

  useEffect(() => {
    return () => {
      pararMonitoramento();
      pararPlayback();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [pararMonitoramento, pararPlayback, audioUrl]);

  // Inicializar elemento de áudio quando URL mudar
  useEffect(() => {
    // Se não há URL, limpar referência e retornar
    if (!audioUrl) {
      audioElementRef.current = null;
      return;
    }

    // Criar novo elemento de áudio
    const audio = new Audio();
    audio.preload = "auto";

    // Handlers de eventos
    const handleCanPlay = () => {
      setIsAudioLoading(false);
      console.log("[Tutorial] Áudio pronto para reproduzir");
    };

    const handleLoadStart = () => {
      setIsAudioLoading(true);
      setAudioError(null);
      setPlaybackProgress(0);
      setIsPlaying(false);
    };

    const handleError = () => {
      console.error("[Tutorial] Erro ao carregar áudio");
      setIsAudioLoading(false);
      setAudioError("Não foi possível carregar o áudio. Tente regravar.");
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setPlaybackProgress(100);
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    };

    const handleTimeUpdate = () => {
      if (audio.duration > 0) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setPlaybackProgress(progress);
      }
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Definir src e carregar
    audio.src = audioUrl;
    audio.load();
    audioElementRef.current = audio;

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
      audio.src = "";
    };
  }, [audioUrl]);

  // Função para tocar/pausar áudio
  const togglePlayback = async () => {
    if (!audioElementRef.current || !audioUrl) return;

    try {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset para o início se chegou ao fim
        if (playbackProgress >= 100) {
          audioElementRef.current.currentTime = 0;
          setPlaybackProgress(0);
        }
        await audioElementRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("[Tutorial] Erro ao reproduzir áudio:", error);
      setAudioError("Erro ao reproduzir. Toque novamente.");
    }
  };

  const iniciarGravacao = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      streamRef.current = stream;

      // Configurar análise de áudio para visualização
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Monitorar níveis
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const atualizarNivel = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const soma = dataArray.reduce((acc, val) => acc + val, 0);
        const media = soma / dataArray.length;
        setNivelAudio(Math.min(100, (media / 128) * 100));
        animationFrameRef.current = requestAnimationFrame(atualizarNivel);
      };
      atualizarNivel();

      // Detectar formato de áudio suportado pelo navegador
      // Ordem de preferência: webm com opus > webm > mp4 > ogg > sem especificar
      const formatsToTry = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
        'audio/ogg',
        '', // Sem especificar - deixa o navegador escolher
      ];

      let selectedMimeType = '';
      for (const format of formatsToTry) {
        if (format === '' || MediaRecorder.isTypeSupported(format)) {
          selectedMimeType = format;
          break;
        }
      }

      console.log('[Tutorial] Formato de áudio selecionado:', selectedMimeType || 'padrão do navegador');
      mimeTypeRef.current = selectedMimeType;

      // Configurar MediaRecorder
      const mediaRecorderOptions: MediaRecorderOptions = {};
      if (selectedMimeType) {
        mediaRecorderOptions.mimeType = selectedMimeType;
      }

      const mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      console.log('[Tutorial] MediaRecorder criado. mimeType real:', mediaRecorder.mimeType);

      // Atualiza o mimeType real usado pelo MediaRecorder
      if (mediaRecorder.mimeType) {
        mimeTypeRef.current = mediaRecorder.mimeType;
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
          console.log('[Tutorial] Chunk de áudio recebido:', event.data.size, 'bytes');
        }
      };

      mediaRecorder.onstop = () => {
        const totalSize = chunksRef.current.reduce((acc, chunk) => acc + chunk.size, 0);
        console.log('[Tutorial] Gravação finalizada. Total:', totalSize, 'bytes, chunks:', chunksRef.current.length);

        // Usa o mimeType real do MediaRecorder para o blob
        const blobType = mimeTypeRef.current || 'audio/webm';
        const audioBlob = new Blob(chunksRef.current, { type: blobType });
        console.log('[Tutorial] Blob criado. Tamanho:', audioBlob.size, 'tipo:', audioBlob.type);

        const url = URL.createObjectURL(audioBlob);
        console.log('[Tutorial] URL do blob:', url);

        setAudioUrl(url);
        setFase("revisao");
      };

      // Usa timeslice de 1000ms para garantir que os dados são salvos em intervalos regulares
      // Isso ajuda em alguns dispositivos móveis
      mediaRecorder.start(1000);
      setFase("gravando");
      setTempoGravacao(0);

      // Timer
      timerRef.current = setInterval(() => {
        setTempoGravacao(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
    }
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    pararMonitoramento();
  };

  const regravarResposta = () => {
    pararPlayback();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioError(null);
    setTempoGravacao(0);
    setFase("pergunta");
  };

  const confirmarResposta = () => {
    pararPlayback();
    const novasCompletas = new Set(perguntasCompletas);
    novasCompletas.add(perguntaAtual);
    setPerguntasCompletas(novasCompletas);

    if (perguntaAtual < PERGUNTAS_TUTORIAL.length - 1) {
      // Próxima pergunta
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
      setAudioError(null);
      setPerguntaAtual(prev => prev + 1);
      setTempoGravacao(0);
      setFase("pergunta");
    } else {
      // Tutorial completo
      setFase("concluido");
    }
  };

  const pularTutorial = () => {
    pararMonitoramento();
    pararPlayback();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    onTutorialCompleto();
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getNivelBarras = () => {
    const barras = [];
    const numBarras = 15;
    const nivelPorBarra = 100 / numBarras;

    for (let i = 0; i < numBarras; i++) {
      const limiar = i * nivelPorBarra;
      const ativo = nivelAudio > limiar;

      let cor = "bg-green-500";
      if (i >= numBarras * 0.7) cor = "bg-red-500";
      else if (i >= numBarras * 0.5) cor = "bg-yellow-500";

      barras.push(
        <div
          key={i}
          className={cn(
            "w-1.5 rounded-full transition-all duration-75",
            ativo ? cor : "bg-gray-200"
          )}
          style={{ height: `${12 + i * 1.5}px` }}
        />
      );
    }
    return barras;
  };

  // Tela de introdução
  if (fase === "intro") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
            <Lightbulb className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tutorial Rápido
          </h2>
          <p className="text-gray-600">
            Antes de começar a entrevista real, vamos praticar com 3 perguntas simples
            para você se familiarizar com o processo de gravação.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Como funciona:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Leia a pergunta</p>
                <p className="text-sm text-gray-600">Você verá a pergunta e uma dica de como responder</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Grave sua resposta</p>
                <p className="text-sm text-gray-600">Clique no botão e fale naturalmente</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Revise e continue</p>
                <p className="text-sm text-gray-600">Ouça sua gravação e refaça se necessário</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => setFase("pergunta")} size="lg" className="w-full">
            <Play className="h-5 w-5 mr-2" />
            Começar Tutorial
          </Button>
          <Button onClick={pularTutorial} variant="ghost" className="w-full">
            Pular tutorial e ir direto para a entrevista
          </Button>
        </div>
      </div>
    );
  }

  // Tela de conclusão
  if (fase === "concluido") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tutorial Completo!
          </h2>
          <p className="text-gray-600">
            Excelente! Você está pronto para começar a entrevista real.
            Lembre-se: seja natural, respire fundo e responda com calma.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-green-800 mb-2">Você praticou:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✓ Como iniciar e parar a gravação</li>
            <li>✓ Como monitorar o nível do microfone</li>
            <li>✓ Como revisar e regravar se necessário</li>
          </ul>
        </div>

        <Button onClick={onTutorialCompleto} size="lg" className="w-full">
          <ArrowRight className="h-5 w-5 mr-2" />
          Iniciar Entrevista Real
        </Button>
      </div>
    );
  }

  const pergunta = PERGUNTAS_TUTORIAL[perguntaAtual];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      {/* Header com progresso */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Tutorial</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm font-medium text-blue-600">
            Pergunta {perguntaAtual + 1} de {PERGUNTAS_TUTORIAL.length}
          </span>
        </div>
        <Button onClick={pularTutorial} variant="ghost" size="sm">
          Pular tutorial
        </Button>
      </div>

      {/* Indicador de progresso */}
      <div className="flex gap-2 mb-8">
        {PERGUNTAS_TUTORIAL.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              perguntasCompletas.has(idx)
                ? "bg-green-500"
                : idx === perguntaAtual
                ? "bg-blue-500"
                : "bg-gray-200"
            )}
          />
        ))}
      </div>

      {/* Pergunta */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {pergunta.texto}
        </h2>

        <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Lightbulb className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">{pergunta.dica}</p>
        </div>
      </div>

      {/* Área de gravação */}
      {fase === "pergunta" && (
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <Clock className="h-4 w-4" />
            <span>Tempo sugerido: {pergunta.tempoSugerido} segundos</span>
          </div>

          <Button onClick={iniciarGravacao} size="lg" className="gap-2">
            <Mic className="h-5 w-5" />
            Iniciar Gravação
          </Button>
        </div>
      )}

      {/* Gravando */}
      {fase === "gravando" && (
        <div className="text-center py-8">
          {/* Timer */}
          <div className="text-4xl font-mono font-bold text-gray-900 mb-4">
            {formatarTempo(tempoGravacao)}
          </div>

          {/* Indicador de nível de áudio */}
          <div className="flex items-center justify-center gap-1 h-10 mb-4">
            {getNivelBarras()}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <Volume2 className="h-4 w-4" />
            <span>Nível: {Math.round(nivelAudio)}%</span>
          </div>

          {/* Indicador de gravação */}
          <div className="flex items-center justify-center gap-2 text-red-500 animate-pulse mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm font-medium">Gravando...</span>
          </div>

          <Button onClick={pararGravacao} variant="destructive" size="lg" className="gap-2">
            <Square className="h-5 w-5" />
            Parar Gravação
          </Button>
        </div>
      )}

      {/* Revisão */}
      {fase === "revisao" && audioUrl && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Ouça sua gravação ({formatarTempo(tempoGravacao)}):
          </p>

          {/* Player de áudio customizado - funciona melhor em dispositivos móveis */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
            {/* Barra de progresso */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${playbackProgress}%` }}
              />
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={togglePlayback}
                variant="outline"
                size="lg"
                className="gap-2 min-w-[140px]"
                disabled={isAudioLoading}
              >
                {isAudioLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Carregando...
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    {playbackProgress > 0 && playbackProgress < 100 ? "Continuar" : "Ouvir"}
                  </>
                )}
              </Button>
            </div>

            {/* Mensagem de erro */}
            {audioError && (
              <p className="text-red-500 text-sm mt-3">{audioError}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={regravarResposta} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Regravar
            </Button>
            <Button onClick={confirmarResposta} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {perguntaAtual < PERGUNTAS_TUTORIAL.length - 1
                ? "Próxima Pergunta"
                : "Concluir Tutorial"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
