"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GravadorAudioProps {
  onTranscricaoCompleta: (transcricao: string, duracao: number) => void;
  onTempoEsgotado?: () => void;
  tempoMaximo?: number; // segundos
  disabled?: boolean;
}

export function GravadorAudio({
  onTranscricaoCompleta,
  onTempoEsgotado,
  tempoMaximo = 180, // 3 minutos padrão
  disabled = false,
}: GravadorAudioProps) {
  const [gravando, setGravando] = useState(false);
  const [transcrevendo, setTranscrevendo] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(tempoMaximo);
  const [erro, setErro] = useState<string | null>(null);
  const [nivelAudio, setNivelAudio] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const inicioGravacaoRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const componentMontadoRef = useRef(true);

  // Timer global que começa assim que o componente monta
  useEffect(() => {
    if (disabled) return;

    componentMontadoRef.current = true;

    // Iniciar timer imediatamente
    timerRef.current = setInterval(() => {
      if (!componentMontadoRef.current) return;

      setTempoRestante((prev) => {
        if (prev <= 1) {
          // Tempo esgotado - parar gravação se estiver ativa
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // Parar gravação automaticamente
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
          }
          onTempoEsgotado?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      componentMontadoRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      pararMonitoramentoAudio();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, [disabled, onTempoEsgotado, tempoMaximo]);

  const pararMonitoramentoAudio = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setNivelAudio(0);
  }, []);

  const iniciarGravacao = async () => {
    if (tempoRestante <= 0) {
      setErro("Tempo esgotado. Não é possível iniciar gravação.");
      return;
    }

    try {
      setErro(null);
      chunksRef.current = [];

      // Solicitar permissão para usar o microfone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        }
      });

      streamRef.current = stream;

      // Configurar análise de áudio para visualização de níveis
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Monitorar níveis de áudio
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const atualizarNivel = () => {
        if (!analyserRef.current || !componentMontadoRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const soma = dataArray.reduce((acc, val) => acc + val, 0);
        const media = soma / dataArray.length;
        setNivelAudio(Math.min(100, (media / 128) * 100));
        animationFrameRef.current = requestAnimationFrame(atualizarNivel);
      };
      atualizarNivel();

      // Usar MediaRecorder nativo com formato webm (mais confiável)
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const duracaoReal = Math.floor((Date.now() - inicioGravacaoRef.current) / 1000);

        // Parar monitoramento de áudio
        pararMonitoramentoAudio();

        // Parar todas as tracks do stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        // Criar blob com todos os chunks
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: mimeType });

          console.log("Gravação finalizada:", {
            blobSize: blob.size,
            blobType: blob.type,
            duracao: duracaoReal,
            chunks: chunksRef.current.length,
          });

          // Verificar tamanho mínimo (pelo menos 1KB para garantir áudio válido)
          if (blob.size > 1000 && duracaoReal >= 1) {
            await transcreverAudio(blob, duracaoReal);
          } else {
            setErro("Gravação muito curta. Por favor, grave por pelo menos 1 segundo.");
          }
        } else {
          setErro("Nenhum áudio foi capturado. Tente novamente.");
        }

        if (componentMontadoRef.current) {
          setGravando(false);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      inicioGravacaoRef.current = Date.now();

      // Iniciar gravação com timeslice para capturar dados periodicamente
      mediaRecorder.start(1000); // Captura dados a cada 1 segundo
      setGravando(true);

    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      setErro("Não foi possível acessar o microfone. Verifique as permissões.");
    }
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const transcreverAudio = async (audioBlob: Blob, duracao: number) => {
    if (!componentMontadoRef.current) return;

    try {
      setTranscrevendo(true);
      setErro(null);

      // Determinar extensão baseada no tipo do blob
      let filename = "gravacao.webm";
      if (audioBlob.type.includes("mp4")) {
        filename = "gravacao.mp4";
      } else if (audioBlob.type.includes("ogg")) {
        filename = "gravacao.ogg";
      }

      console.log("Enviando para transcrição:", {
        blobSize: audioBlob.size,
        blobType: audioBlob.type,
        duracao,
        filename,
      });

      // Preparar FormData
      const formData = new FormData();
      formData.append("audio", audioBlob, filename);

      // Enviar para API de transcrição
      const response = await fetch("/api/transcricao", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao transcrever áudio");
      }

      const { transcricao } = await response.json();

      // Chamar callback com transcrição
      onTranscricaoCompleta(transcricao, duracao);
    } catch (error) {
      console.error("Erro ao transcrever:", error);
      if (componentMontadoRef.current) {
        setErro(
          error instanceof Error
            ? error.message
            : "Erro ao processar transcrição. Tente novamente."
        );
      }
    } finally {
      if (componentMontadoRef.current) {
        setTranscrevendo(false);
      }
    }
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const porcentagemTempo = ((tempoMaximo - tempoRestante) / tempoMaximo) * 100;

  // Gerar barras do indicador de nível (estilo da página de teste)
  const getNivelBarras = () => {
    const barras = [];
    const numBarras = 20;
    const nivelPorBarra = 100 / numBarras;

    for (let i = 0; i < numBarras; i++) {
      const limiar = i * nivelPorBarra;
      const ativo = nivelAudio > limiar;

      let cor = "bg-green-500";
      if (i >= numBarras * 0.7) {
        cor = "bg-red-500";
      } else if (i >= numBarras * 0.5) {
        cor = "bg-yellow-500";
      }

      barras.push(
        <div
          key={i}
          className={cn(
            "w-2 rounded-full transition-all duration-75",
            ativo ? cor : "bg-gray-200"
          )}
          style={{
            height: `${20 + i * 2}px`,
          }}
        />
      );
    }
    return barras;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Ícone grande do microfone com círculo */}
      <div className={cn(
        "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300",
        !gravando && !transcrevendo && "bg-gray-100",
        gravando && "bg-red-100 animate-pulse",
        transcrevendo && "bg-blue-100"
      )}>
        {!gravando && !transcrevendo && (
          <Mic className="h-12 w-12 text-gray-400" />
        )}
        {gravando && (
          <Mic className="h-12 w-12 text-red-500" />
        )}
        {transcrevendo && (
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        )}
      </div>

      {/* Indicador de nível de áudio - barras grandes como na página de teste */}
      {gravando && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-1 h-16">
            {getNivelBarras()}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Volume2 className="h-4 w-4" />
            <span>Nível de captação: {Math.round(nivelAudio)}%</span>
          </div>
        </div>
      )}

      {/* Timer - sempre visível, mostrando tempo restante */}
      <div className="flex flex-col items-center gap-2">
        <div className={cn(
          "text-5xl font-mono font-bold",
          tempoRestante <= 30 ? "text-red-500" : "text-gray-900"
        )}>
          {formatarTempo(tempoRestante)}
        </div>
        <div className="w-72 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-1000",
              porcentagemTempo > 80 ? "bg-red-500" : "bg-blue-500"
            )}
            style={{ width: `${porcentagemTempo}%` }}
          />
        </div>
        <div className="text-sm text-gray-500">
          Tempo restante para responder
        </div>
      </div>

      {/* Indicador visual de gravação */}
      {gravando && (
        <div className="flex items-center gap-2 text-red-500">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Gravando sua resposta...</span>
        </div>
      )}

      {/* Botões */}
      <div className="flex gap-4 mt-2">
        {!gravando && !transcrevendo && (
          <Button
            onClick={iniciarGravacao}
            disabled={disabled || tempoRestante <= 0}
            size="lg"
            className="gap-2 px-8 py-6 text-lg"
          >
            <Mic className="h-6 w-6" />
            {tempoRestante <= 0 ? "Tempo Esgotado" : "Iniciar Gravação"}
          </Button>
        )}

        {gravando && (
          <Button
            onClick={pararGravacao}
            variant="destructive"
            size="lg"
            className="gap-2 px-8 py-6 text-lg"
          >
            <Square className="h-6 w-6" />
            Parar e Enviar
          </Button>
        )}

        {transcrevendo && (
          <Button disabled size="lg" className="gap-2 px-8 py-6 text-lg">
            <Loader2 className="h-6 w-6 animate-spin" />
            Transcrevendo...
          </Button>
        )}
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <div className="text-sm text-red-500 text-center max-w-md p-3 bg-red-50 border border-red-200 rounded-lg">
          {erro}
        </div>
      )}
    </div>
  );
}
