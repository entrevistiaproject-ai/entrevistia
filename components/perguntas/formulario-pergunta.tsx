"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AutocompleteCargo } from "@/components/entrevista/autocomplete-cargo";
import { NIVEIS_HIERARQUICOS } from "@/lib/constants/niveis";

export function FormularioPergunta() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [texto, setTexto] = useState("");
  const [cargo, setCargo] = useState("");
  const [nivel, setNivel] = useState("");
  const [categoria, setCategoria] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [tipo, setTipo] = useState("audio");

  // Critérios de avaliação
  const [palavrasChave, setPalavrasChave] = useState("");
  const [topicos, setTopicos] = useState("");
  const [aspectosAvaliar, setAspectosAvaliar] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const criteriosAvaliacao = {
        palavrasChave: palavrasChave.split(",").map((p) => p.trim()).filter(Boolean),
        topicos: topicos.split(",").map((t) => t.trim()).filter(Boolean),
        aspectosAvaliar: aspectosAvaliar.split(",").map((a) => a.trim()).filter(Boolean),
      };

      const response = await fetch("/api/perguntas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto,
          cargo,
          nivel,
          categoria,
          competencia,
          tipo,
          criteriosAvaliacao,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pergunta");
      }

      router.push("/perguntas");
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);
      alert("Erro ao criar pergunta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Defina os dados principais da pergunta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="texto">Texto da Pergunta *</Label>
            <Textarea
              id="texto"
              placeholder="Ex: Descreva sua experiência com..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo *</Label>
              <AutocompleteCargo
                value={cargo}
                onChange={setCargo}
                placeholder="Digite ou selecione o cargo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivel">Nível *</Label>
              <Select value={nivel} onValueChange={setNivel} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  {NIVEIS_HIERARQUICOS.map((n) => (
                    <SelectItem key={n.value} value={n.value}>
                      {n.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select value={categoria} onValueChange={setCategoria} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conhecimento">Conhecimento</SelectItem>
                  <SelectItem value="experiencia">Experiência</SelectItem>
                  <SelectItem value="resolucao_problemas">Resolução de Problemas</SelectItem>
                  <SelectItem value="habilidades_pessoais">Habilidades Pessoais</SelectItem>
                  <SelectItem value="qualificacoes">Qualificações</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competencia">Competência Avaliada</Label>
              <Input
                id="competencia"
                placeholder="Ex: Direito Contratual, Liderança"
                value={competencia}
                onChange={(e) => setCompetencia(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Resposta</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="texto">Texto</SelectItem>
                <SelectItem value="audio">Áudio</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Atualmente trabalhamos apenas com respostas em texto e áudio
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Critérios de Avaliação</CardTitle>
          <CardDescription>
            Ajude a IA a avaliar melhor as respostas (opcional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="palavras-chave">Palavras-chave Esperadas</Label>
            <Input
              id="palavras-chave"
              placeholder="Separe por vírgula: contrato, cláusula, jurídico..."
              value={palavrasChave}
              onChange={(e) => setPalavrasChave(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Palavras que você espera encontrar na resposta
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topicos">Tópicos a Abordar</Label>
            <Input
              id="topicos"
              placeholder="Separe por vírgula: análise de riscos, negociação..."
              value={topicos}
              onChange={(e) => setTopicos(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Tópicos que devem ser mencionados
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aspectos">Aspectos a Avaliar</Label>
            <Input
              id="aspectos"
              placeholder="Separe por vírgula: profundidade técnica, exemplos práticos..."
              value={aspectosAvaliar}
              onChange={(e) => setAspectosAvaliar(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              O que deve ser avaliado na resposta
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/perguntas")}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Pergunta"}
        </Button>
      </div>
    </form>
  );
}
