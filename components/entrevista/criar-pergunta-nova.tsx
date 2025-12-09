"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Save } from "lucide-react";
import { CATEGORIAS_DISPONIVEIS } from "@/lib/utils/classificacao-perguntas";

interface CriarPerguntaNovaProps {
  cargo?: string;
  nivel?: string;
  onAdicionar: (
    texto: string,
    salvarNoBanco: boolean,
    dados?: {
      competencia: string;
      categoria: string;
    }
  ) => void;
}

export function CriarPerguntaNova({
  cargo,
  nivel,
  onAdicionar,
}: CriarPerguntaNovaProps) {
  const [texto, setTexto] = useState("");
  const [salvarNoBanco, setSalvarNoBanco] = useState(false);
  const [competencia, setCompetencia] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleAdicionar = () => {
    if (!texto.trim()) {
      alert("Digite o texto da pergunta");
      return;
    }

    if (salvarNoBanco && (!competencia || !categoria)) {
      alert("Preencha competência e categoria para salvar no banco");
      return;
    }

    onAdicionar(
      texto,
      salvarNoBanco,
      salvarNoBanco
        ? {
            competencia,
            categoria,
          }
        : undefined
    );

    // Limpar formulário
    setTexto("");
    setCompetencia("");
    setCategoria("");
    setSalvarNoBanco(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nova-pergunta">Texto da Pergunta *</Label>
        <Textarea
          id="nova-pergunta"
          placeholder="Ex: Descreva uma situação em que você teve que resolver um conflito com um cliente..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={4}
        />
      </div>

      {/* Opção de Salvar no Banco */}
      <div className="flex items-start space-x-2 rounded-lg border p-4 bg-muted/50">
        <Checkbox
          id="salvar-banco"
          checked={salvarNoBanco}
          onCheckedChange={(checked) => setSalvarNoBanco(checked as boolean)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="salvar-banco"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            <Save className="inline h-4 w-4 mr-1" />
            Salvar no Banco de Perguntas
          </label>
          <p className="text-sm text-muted-foreground">
            Marque para reutilizar esta pergunta em futuras entrevistas
          </p>
        </div>
      </div>

      {/* Campos adicionais se for salvar no banco */}
      {salvarNoBanco && (
        <div className="space-y-4 pl-6 border-l-2 border-primary/20">
          <p className="text-sm font-medium">
            Informações para salvar no banco:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="competencia">Competência *</Label>
              <Input
                id="competencia"
                placeholder="Ex: Resolução de Conflitos"
                value={competencia}
                onChange={(e) => setCompetencia(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS_DISPONIVEIS.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icone} {cat.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Cargo: <strong>{cargo || "Não especificado"}</strong> | Nível:{" "}
            <strong>{nivel || "Não especificado"}</strong>
          </p>
        </div>
      )}

      <Button
        type="button"
        onClick={handleAdicionar}
        className="w-full"
        variant={salvarNoBanco ? "default" : "outline"}
      >
        <Plus className="h-4 w-4 mr-2" />
        {salvarNoBanco ? "Adicionar e Salvar no Banco" : "Adicionar Pergunta"}
      </Button>

      {!cargo || !nivel ? (
        <p className="text-xs text-muted-foreground text-center">
          ⚠️ Preencha cargo e nível acima para salvar perguntas no banco
        </p>
      ) : null}
    </div>
  );
}
