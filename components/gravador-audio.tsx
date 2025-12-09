"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GravadorAudioProps {
  onTranscricaoCompleta: (transcricao: string, duracao: number) => void;
  tempoMaximo?: number; // segundos
  disabled?: boolean;
}

// Função para converter Blob de áudio para WAV
async function convertToWav(audioBlob: Blob): Promise<Blob> {
  const audioContext = new AudioContext();
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Configurações do WAV
  const numChannels = 1; // Mono
  const sampleRate = 16000; // 16kHz é suficiente para fala
  const bitsPerSample = 16;

  // Resample para 16kHz
  const offlineContext = new OfflineAudioContext(
    numChannels,
    Math.ceil(audioBuffer.duration * sampleRate),
    sampleRate
  );

  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start(0);

  const renderedBuffer = await offlineContext.startRendering();
  const samples = renderedBuffer.getChannelData(0);

  // Converter para 16-bit PCM
  const pcmData = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }

  // Criar header WAV
  const wavBuffer = new ArrayBuffer(44 + pcmData.length * 2);
  const view = new DataView(wavBuffer);

  // RIFF header
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + pcmData.length * 2, true);
  writeString(view, 8, "WAVE");

  // fmt chunk
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
  view.setUint16(32, numChannels * (bitsPerSample / 8), true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeString(view, 36, "data");
  view.setUint32(40, pcmData.length * 2, true);

  // Write PCM data
  const pcmOffset = 44;
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(pcmOffset + i * 2, pcmData[i], true);
  }

  await audioContext.close();

  return new Blob([wavBuffer], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

export function GravadorAudio({
  onTranscricaoCompleta,
  tempoMaximo = 180, // 3 minutos padrão
  disabled = false,
}: GravadorAudioProps) {
  const [gravando, setGravando] = useState(false);
  const [transcrevendo, setTranscrevendo] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  const [nivelAudio, setNivelAudio] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inicioGravacaoRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      // Limpar timer ao desmontar
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Parar monitoramento de áudio
      pararMonitoramentoAudio();
      // Parar stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      // Parar gravação se estiver ativa
      if (mediaRecorderRef.current && gravando) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [gravando, pararMonitoramentoAudio]);

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

      // Configurar MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      inicioGravacaoRef.current = Date.now();

      // Coletar chunks de áudio
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // Quando a gravação terminar
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current);
        const duracaoReal = Math.floor((Date.now() - inicioGravacaoRef.current) / 1000);

        // Parar monitoramento de áudio
        pararMonitoramentoAudio();

        // Parar todas as tracks do stream
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        // Transcrever áudio
        await transcreverAudio(audioBlob, duracaoReal);
      };

      // Iniciar gravação
      mediaRecorder.start();
      setGravando(true);
      setTempoDecorrido(0);

      // Iniciar timer
      timerRef.current = setInterval(() => {
        setTempoDecorrido((prev) => {
          const novo = prev + 1;

          // Parar automaticamente ao atingir o tempo máximo
          if (novo >= tempoMaximo) {
            pararGravacao();
          }

          return novo;
        });
      }, 1000);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      setErro("Não foi possível acessar o microfone. Verifique as permissões.");
    }
  };

  const pararGravacao = () => {
    if (mediaRecorderRef.current && gravando) {
      mediaRecorderRef.current.stop();
      setGravando(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const transcreverAudio = async (audioBlob: Blob, duracao: number) => {
    try {
      setTranscrevendo(true);
      setErro(null);

      // Converter para WAV (formato mais compatível com OpenAI Whisper)
      const wavBlob = await convertToWav(audioBlob);

      // Preparar FormData
      const formData = new FormData();
      formData.append("audio", wavBlob, "gravacao.wav");

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
      setTempoDecorrido(0);
    }
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const tempoRestante = tempoMaximo - tempoDecorrido;
  const porcentagemTempo = (tempoDecorrido / tempoMaximo) * 100;

  // Gerar barras do indicador de nível
  const getNivelBarras = () => {
    const barras = [];
    const numBarras = 15;
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
            "w-1.5 rounded-full transition-all duration-75",
            ativo ? cor : "bg-gray-200"
          )}
          style={{
            height: `${12 + i * 1.5}px`,
          }}
        />
      );
    }
    return barras;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Timer - sempre visível */}
      <div className="flex flex-col items-center gap-2">
        <div className={cn(
          "text-4xl font-mono font-bold",
          gravando && tempoRestante <= 30 ? "text-red-500" : "text-gray-900"
        )}>
          {formatarTempo(tempoRestante)}
        </div>
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-1000",
              porcentagemTempo > 80 ? "bg-red-500" : "bg-blue-500"
            )}
            style={{ width: `${porcentagemTempo}%` }}
          />
        </div>
        <div className="text-sm text-gray-500">
          {gravando ? "Tempo restante" : "Tempo disponível"}
        </div>
      </div>

      {/* Indicador de nível de áudio */}
      {gravando && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="flex items-center justify-center gap-1 h-10">
            {getNivelBarras()}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Volume2 className="h-4 w-4" />
            <span>Nível: {Math.round(nivelAudio)}%</span>
          </div>
        </div>
      )}

      {/* Indicador visual de gravação */}
      {gravando && (
        <div className="flex items-center gap-2 text-red-500 animate-pulse">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm font-medium">Gravando...</span>
        </div>
      )}

      {/* Botões */}
      <div className="flex gap-4">
        {!gravando && !transcrevendo && (
          <Button
            onClick={iniciarGravacao}
            disabled={disabled}
            size="lg"
            className="gap-2"
          >
            <Mic className="h-5 w-5" />
            Iniciar Gravação
          </Button>
        )}

        {gravando && (
          <Button
            onClick={pararGravacao}
            variant="destructive"
            size="lg"
            className="gap-2"
          >
            <Square className="h-5 w-5" />
            Parar Gravação
          </Button>
        )}

        {transcrevendo && (
          <Button disabled size="lg" className="gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Transcrevendo...
          </Button>
        )}
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <div className="text-sm text-red-500 text-center max-w-md">
          {erro}
        </div>
      )}
    </div>
  );
}
