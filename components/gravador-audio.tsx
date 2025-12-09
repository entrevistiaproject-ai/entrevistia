"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";

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
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  const [nivelAudio, setNivelAudio] = useState(0);
  const timerGeralRef = useRef<NodeJS.Timeout | null>(null);

  const recorderRef = useRef<RecordRTC | null>(null);
  const inicioGravacaoRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const gravandoRef = useRef(false); // Ref para usar dentro do interval

  const pararMonitoramentoAudio = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setNivelAudio(0);
  }, []);

  const pararGravacaoETranscrever = useCallback(async () => {
    if (recorderRef.current && gravandoRef.current) {
      setGravando(false);
      gravandoRef.current = false;

      recorderRef.current.stopRecording(async () => {
        const blob = recorderRef.current?.getBlob();
        const duracaoReal = Math.floor((Date.now() - inicioGravacaoRef.current) / 1000);

        console.log("Gravação finalizada (tempo esgotado):", {
          blobSize: blob?.size,
          blobType: blob?.type,
          duracao: duracaoReal,
        });

        // Parar monitoramento de áudio
        pararMonitoramentoAudio();

        // Parar todas as tracks do stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        // Transcrever áudio se tiver blob com tamanho mínimo
        if (blob && blob.size > 1000) {
          await transcreverAudio(blob, duracaoReal);
        }
      });
    }
  }, [pararMonitoramentoAudio]);

  // Iniciar timer geral assim que o componente montar
  useEffect(() => {
    if (disabled) return;

    // Iniciar timer imediatamente
    timerGeralRef.current = setInterval(() => {
      setTempoDecorrido((prev) => {
        const novo = prev + 1;
        if (novo >= tempoMaximo) {
          // Tempo esgotado
          if (timerGeralRef.current) {
            clearInterval(timerGeralRef.current);
          }
          // Parar gravação se estiver gravando e enviar
          if (recorderRef.current && gravandoRef.current) {
            pararGravacaoETranscrever();
          }
          onTempoEsgotado?.();
        }
        return novo;
      });
    }, 1000);

    return () => {
      // Limpar timer ao desmontar
      if (timerGeralRef.current) {
        clearInterval(timerGeralRef.current);
      }
      // Parar monitoramento de áudio
      pararMonitoramentoAudio();
      // Parar stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      // Parar gravação se estiver ativa
      if (recorderRef.current && gravandoRef.current) {
        recorderRef.current.stopRecording(() => {});
      }
    };
  }, [disabled, tempoMaximo, onTempoEsgotado, pararMonitoramentoAudio, pararGravacaoETranscrever]);

  const iniciarGravacao = async () => {
    try {
      setErro(null);

      // Solicitar permissão para usar o microfone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
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
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const soma = dataArray.reduce((acc, val) => acc + val, 0);
        const media = soma / dataArray.length;
        setNivelAudio(Math.min(100, (media / 128) * 100));
        animationFrameRef.current = requestAnimationFrame(atualizarNivel);
      };
      atualizarNivel();

      // Configurar RecordRTC para gravar em WAV (formato mais compatível com Whisper)
      const recorder = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/wav",
        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1, // Mono para menor tamanho
        desiredSampRate: 16000, // 16kHz é suficiente para voz
      });

      recorderRef.current = recorder;
      inicioGravacaoRef.current = Date.now();

      // Iniciar gravação
      recorder.startRecording();
      setGravando(true);
      gravandoRef.current = true;
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      setErro("Não foi possível acessar o microfone. Verifique as permissões.");
    }
  };

  const pararGravacao = () => {
    if (recorderRef.current && gravando) {
      setGravando(false);
      gravandoRef.current = false;

      recorderRef.current.stopRecording(async () => {
        const blob = recorderRef.current?.getBlob();
        const duracaoReal = Math.floor((Date.now() - inicioGravacaoRef.current) / 1000);

        console.log("Gravação finalizada:", {
          blobSize: blob?.size,
          blobType: blob?.type,
          duracao: duracaoReal,
        });

        // Parar monitoramento de áudio
        pararMonitoramentoAudio();

        // Parar todas as tracks do stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        // Transcrever áudio se tiver blob com tamanho mínimo (pelo menos 1KB)
        if (blob && blob.size > 1000) {
          await transcreverAudio(blob, duracaoReal);
        } else {
          setErro("Gravação muito curta. Por favor, grave por pelo menos 1 segundo.");
        }
      });
    }
  };

  const transcreverAudio = async (audioBlob: Blob, duracao: number) => {
    try {
      setTranscrevendo(true);
      setErro(null);

      console.log("Enviando para transcrição:", {
        blobSize: audioBlob.size,
        blobType: audioBlob.type,
        duracao,
      });

      // Preparar FormData - enviar WAV
      const formData = new FormData();
      formData.append("audio", audioBlob, "gravacao.wav");

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
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao processar transcrição. Tente novamente."
      );
    } finally {
      setTranscrevendo(false);
      // Timer continua correndo - não para após transcrição
    }
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const tempoRestante = tempoMaximo - tempoDecorrido;
  const porcentagemTempo = (tempoDecorrido / tempoMaximo) * 100;

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
            disabled={disabled}
            size="lg"
            className="gap-2 px-8 py-6 text-lg"
          >
            <Mic className="h-6 w-6" />
            Iniciar Gravação
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
