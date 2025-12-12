"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, CheckCircle2, AlertCircle, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificacaoMicrofoneProps {
  onMicrofoneVerificado: () => void;
}

export function VerificacaoMicrofone({ onMicrofoneVerificado }: VerificacaoMicrofoneProps) {
  const [status, setStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [nivelAudio, setNivelAudio] = useState(0);
  const [erro, setErro] = useState<string | null>(null);
  const [temPermissao, setTemPermissao] = useState(false);
  const [microfoneTestado, setMicrofoneTestado] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const pararMonitoramento = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
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

  useEffect(() => {
    return () => {
      pararMonitoramento();
    };
  }, [pararMonitoramento]);

  const verificarMicrofone = async () => {
    try {
      setStatus("checking");
      setErro(null);

      // Solicitar permissão do microfone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      streamRef.current = stream;
      setTemPermissao(true);

      // Configurar AudioContext para análise de volume
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

        // Calcular média do volume
        const soma = dataArray.reduce((acc, val) => acc + val, 0);
        const media = soma / dataArray.length;
        const nivelNormalizado = Math.min(100, (media / 128) * 100);

        setNivelAudio(nivelNormalizado);

        // Marcar como testado quando detectar áudio suficiente
        if (nivelNormalizado >= 15) {
          setMicrofoneTestado(true);
        }

        animationFrameRef.current = requestAnimationFrame(atualizarNivel);
      };

      atualizarNivel();
      setStatus("success");
    } catch (error) {
      console.error("Erro ao acessar microfone:", error);
      setStatus("error");

      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setErro("Permissão para usar o microfone foi negada. Por favor, permita o acesso ao microfone nas configurações do seu navegador.");
        } else if (error.name === "NotFoundError") {
          setErro("Nenhum microfone foi encontrado. Verifique se seu dispositivo possui um microfone conectado.");
        } else {
          setErro("Erro ao acessar o microfone: " + error.message);
        }
      } else {
        setErro("Erro desconhecido ao acessar o microfone. Tente novamente.");
      }
    }
  };

  const confirmarEContinuar = () => {
    pararMonitoramento();
    onMicrofoneVerificado();
  };

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
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className={cn(
          "w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center",
          status === "idle" && "bg-gray-100",
          status === "checking" && "bg-blue-100",
          status === "success" && "bg-green-100",
          status === "error" && "bg-red-100"
        )}>
          {status === "idle" && <Mic className="h-10 w-10 text-gray-400" />}
          {status === "checking" && <Mic className="h-10 w-10 text-blue-500 animate-pulse" />}
          {status === "success" && <CheckCircle2 className="h-10 w-10 text-green-500" />}
          {status === "error" && <MicOff className="h-10 w-10 text-red-500" />}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {status === "idle" && "Verificação de Microfone"}
          {status === "checking" && "Verificando..."}
          {status === "success" && "Microfone Funcionando!"}
          {status === "error" && "Problema com Microfone"}
        </h2>

        <p className="text-gray-600">
          {status === "idle" && "Antes de começar, precisamos verificar se seu microfone está funcionando corretamente."}
          {status === "checking" && "Aguarde enquanto verificamos seu microfone..."}
          {status === "success" && "Fale algo para testar. Você deve ver as barras se movendo abaixo."}
          {status === "error" && erro}
        </p>
      </div>

      {/* Indicador de nível de áudio */}
      {status === "success" && temPermissao && (
        <div className="mb-8">
          <div className="flex items-center justify-center gap-1 h-16 mb-4">
            {getNivelBarras()}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Volume2 className="h-4 w-4" />
            <span>Nível de captação: {Math.round(nivelAudio)}%</span>
          </div>

          {!microfoneTestado && nivelAudio < 5 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700 text-center">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              Não estamos captando som. Fale algo para testar seu microfone.
            </div>
          )}

          {!microfoneTestado && nivelAudio >= 5 && nivelAudio < 15 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 text-center">
              Volume baixo detectado. Aproxime-se do microfone ou aumente o volume.
            </div>
          )}

          {microfoneTestado && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 text-center">
              <CheckCircle2 className="h-4 w-4 inline mr-2" />
              Seu microfone está funcionando perfeitamente!
            </div>
          )}
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex flex-col gap-3">
        {status === "idle" && (
          <Button onClick={verificarMicrofone} size="lg" className="w-full">
            <Mic className="h-5 w-5 mr-2" />
            Verificar Microfone
          </Button>
        )}

        {status === "error" && (
          <Button onClick={verificarMicrofone} size="lg" className="w-full">
            <Mic className="h-5 w-5 mr-2" />
            Tentar Novamente
          </Button>
        )}

        {status === "success" && (
          <Button
            onClick={confirmarEContinuar}
            size="lg"
            className="w-full"
            disabled={!microfoneTestado}
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Continuar para o Tutorial
          </Button>
        )}
      </div>

      {/* Dicas */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Dicas para uma boa gravação:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Escolha um ambiente silencioso</li>
          <li>• Posicione-se a cerca de 30cm do microfone</li>
          <li>• Use fones de ouvido para evitar eco</li>
          <li>• Evite ruídos de fundo como ventiladores ou TV</li>
        </ul>
      </div>
    </div>
  );
}
