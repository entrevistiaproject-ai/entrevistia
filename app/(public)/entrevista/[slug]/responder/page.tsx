"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GravadorAudio } from "@/components/gravador-audio";
import { VerificacaoMicrofone } from "@/components/verificacao-microfone";
import { TutorialEntrevista } from "@/components/tutorial-entrevista";
import { Loader2, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (erro || !entrevista) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Erro</h1>
          <p className="text-gray-600 mb-6">{erro || "Entrevista não encontrada"}</p>
        </div>
      </div>
    );
  }

  // Etapa de verificação do microfone
  if (etapaPreparacao === "verificacao-microfone") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{entrevista.titulo}</h1>
            <p className="text-gray-600 mt-2">Preparação para a entrevista</p>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{entrevista.titulo}</h1>
            <p className="text-gray-600 mt-2">Tutorial de prática</p>
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-lg shadow-lg p-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Entrevista Concluída!
          </h1>
          <p className="text-gray-600 mb-6">
            Obrigado por participar. Suas respostas foram registradas com sucesso.
          </p>
          <p className="text-sm text-gray-500">
            Em breve você receberá um retorno sobre o processo seletivo.
          </p>
        </div>
      </div>
    );
  }

  const perguntaAtual = entrevista.perguntas[perguntaAtualIndex];
  const totalPerguntas = entrevista.perguntas.length;
  const progresso = ((perguntaAtualIndex + 1) / totalPerguntas) * 100;
  const tempoMaximoResposta = perguntaAtual.tempoMaximo || entrevista.tempoResposta || 180;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progresso */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {perguntaAtualIndex + 1} de {totalPerguntas}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progresso)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        {/* Pergunta */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {perguntaAtual.texto}
          </h2>

          {fase === "reflexao" && (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {tempoReflexao}s
              </h3>
              <p className="text-gray-600 mb-8">
                Tempo para refletir sobre sua resposta
              </p>
              <Button onClick={pularReflexao} size="lg">
                Começar a Responder Agora
              </Button>
            </div>
          )}

          {fase === "resposta" && (
            <div className="py-8">
              <GravadorAudio
                onTranscricaoCompleta={handleTranscricaoCompleta}
                tempoMaximo={tempoMaximoResposta}
              />
              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Tempo máximo: {Math.floor(tempoMaximoResposta / 60)}:{(tempoMaximoResposta % 60)
                    .toString()
                    .padStart(2, "0")} minutos
                </p>
              </div>
            </div>
          )}

          {fase === "processando" && (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">
                Processando sua resposta...
              </p>
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            Como funciona?
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Você terá 45 segundos para refletir sobre cada pergunta</li>
            <li>• Em seguida, terá até 3 minutos para gravar sua resposta em áudio</li>
            <li>• Você pode começar a gravar antes dos 45 segundos</li>
            <li>• Suas respostas serão automaticamente transcritas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
