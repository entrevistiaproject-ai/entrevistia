"use client";

import { useState } from "react";
import { PerguntaTemplate } from "@/lib/db/schema";
import { PerguntasListagem } from "./perguntas-listagem";
import { useRouter } from "next/navigation";

interface PerguntasListagemClientProps {
  perguntas: PerguntaTemplate[];
  perguntasOcultasIdsInicial: string[];
}

export function PerguntasListagemClient({
  perguntas,
  perguntasOcultasIdsInicial,
}: PerguntasListagemClientProps) {
  const router = useRouter();
  const [perguntasOcultasIds, setPerguntasOcultasIds] = useState<string[]>(
    perguntasOcultasIdsInicial
  );
  const [loading, setLoading] = useState(false);

  const handleOcultarPergunta = async (perguntaId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/perguntas/ocultar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ perguntaId }),
      });

      if (response.ok) {
        setPerguntasOcultasIds([...perguntasOcultasIds, perguntaId]);
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao ocultar pergunta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReexibirPergunta = async (perguntaId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/perguntas/ocultar?perguntaId=${perguntaId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setPerguntasOcultasIds(
          perguntasOcultasIds.filter((id) => id !== perguntaId)
        );
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao reexibir pergunta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PerguntasListagem
      perguntas={perguntas}
      perguntasOcultasIds={perguntasOcultasIds}
      onOcultarPergunta={handleOcultarPergunta}
      onReexibirPergunta={handleReexibirPergunta}
    />
  );
}
