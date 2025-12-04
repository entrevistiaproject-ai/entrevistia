import { useState } from "react";
import type { CriarEntrevistaForm, Pergunta, TipoVaga, Senioridade } from "@/types/entrevista";

export function useEntrevistaForm() {
  const [form, setForm] = useState<CriarEntrevistaForm>({
    tipoVaga: "",
    senioridade: "",
    perguntas: [],
  });

  const updateTipoVaga = (tipoVaga: TipoVaga) => {
    setForm((prev) => ({ ...prev, tipoVaga }));
  };

  const updateSenioridade = (senioridade: Senioridade) => {
    setForm((prev) => ({ ...prev, senioridade }));
  };

  const adicionarPergunta = () => {
    const novaPergunta: Pergunta = {
      id: crypto.randomUUID(),
      texto: "",
    };
    setForm((prev) => ({
      ...prev,
      perguntas: [...prev.perguntas, novaPergunta],
    }));
  };

  const atualizarPergunta = (id: string, texto: string) => {
    setForm((prev) => ({
      ...prev,
      perguntas: prev.perguntas.map((p) => (p.id === id ? { ...p, texto } : p)),
    }));
  };

  const removerPergunta = (id: string) => {
    setForm((prev) => ({
      ...prev,
      perguntas: prev.perguntas.filter((p) => p.id !== id),
    }));
  };

  return {
    form,
    updateTipoVaga,
    updateSenioridade,
    adicionarPergunta,
    atualizarPergunta,
    removerPergunta,
  };
}
