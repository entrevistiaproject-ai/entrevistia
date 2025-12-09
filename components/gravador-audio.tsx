"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GravadorAudioProps {
  onTranscricaoCompleta: (transcricao: string, duracao: number) => void;
  tempoMaximo?: number; // segundos
  disabled?: boolean;
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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inicioGravacaoRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      // Limpar timer ao desmontar
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Parar gravação se estiver ativa
      if (mediaRecorderRef.current && gravando) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [gravando]);

  const iniciarGravacao = async () => {
    try {
      setErro(null);

      // Solicitar permissão para usar o microfone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Configurar MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

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
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const duracaoReal = Math.floor((Date.now() - inicioGravacaoRef.current) / 1000);

        // Parar todas as tracks do stream
        stream.getTracks().forEach((track) => track.stop());

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

      // Preparar FormData
      const formData = new FormData();
      formData.append("audio", audioBlob, "gravacao.webm");

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

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Timer */}
      {gravando && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-mono font-bold">
            {formatarTempo(tempoDecorrido)}
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
            Tempo restante: {formatarTempo(tempoRestante)}
          </div>
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

      {/* Indicador visual de gravação */}
      {gravando && (
        <div className="flex items-center gap-2 text-red-500 animate-pulse">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm font-medium">Gravando...</span>
        </div>
      )}
    </div>
  );
}
