"use client";

import { useState } from "react";
import { PerguntaTemplate } from "@/lib/db/schema";
import { PerguntasListagem } from "./perguntas-listagem";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface PerguntasListagemClientProps {
  perguntas: PerguntaTemplate[];
  perguntasOcultasIdsInicial: string[];
}

export function PerguntasListagemClient({
  perguntas,
  perguntasOcultasIdsInicial,
}: PerguntasListagemClientProps) {
  const router = useRouter();
  const { toast } = useToast();
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
        toast({
          title: "Pergunta ocultada",
          description: "A pergunta foi ocultada da sua lista.",
        });
        router.refresh();
      } else {
        throw new Error("Erro ao ocultar pergunta");
      }
    } catch (error) {
      console.error("Erro ao ocultar pergunta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível ocultar a pergunta.",
        variant: "destructive",
      });
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
        toast({
          title: "Pergunta reexibida",
          description: "A pergunta está visível novamente.",
        });
        router.refresh();
      } else {
        throw new Error("Erro ao reexibir pergunta");
      }
    } catch (error) {
      console.error("Erro ao reexibir pergunta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível reexibir a pergunta.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditarPergunta = (perguntaId: string) => {
    router.push(`/perguntas/${perguntaId}/editar`);
  };

  const handleDeletarPergunta = async (perguntaId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/perguntas/${perguntaId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Pergunta excluída",
          description: "A pergunta foi excluída com sucesso.",
        });
        router.refresh();
      } else {
        const data = await response.json();
        throw new Error(data.error || "Erro ao excluir pergunta");
      }
    } catch (error: any) {
      console.error("Erro ao deletar pergunta:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir a pergunta.",
        variant: "destructive",
      });
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
      onEditarPergunta={handleEditarPergunta}
      onDeletarPergunta={handleDeletarPergunta}
    />
  );
}
