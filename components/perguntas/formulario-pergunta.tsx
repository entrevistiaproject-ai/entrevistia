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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AutocompleteCargo } from "@/components/entrevista/autocomplete-cargo";
import { NIVEIS_HIERARQUICOS } from "@/lib/constants/niveis";

export function FormularioPergunta() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [texto, setTexto] = useState("");
  const [cargo, setCargo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [tipo, setTipo] = useState("audio");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Critérios de avaliação
  const [palavrasChave, setPalavrasChave] = useState("");
  const [topicos, setTopicos] = useState("");
  const [aspectosAvaliar, setAspectosAvaliar] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

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
          nivel: "multinivel", // Valor padrão pois perguntas podem ser multiníveis
          categoria,
          competencia,
          tipo,
          tags,
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

          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo *</Label>
            <AutocompleteCargo
              value={cargo}
              onChange={setCargo}
              placeholder="Digite ou selecione o cargo"
            />
            <p className="text-xs text-muted-foreground">
              Selecione um cargo existente ou digite um novo
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select value={categoria} onValueChange={setCategoria} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnica">Técnica</SelectItem>
                  <SelectItem value="comportamental">Comportamental</SelectItem>
                  <SelectItem value="soft_skill">Soft Skill</SelectItem>
                  <SelectItem value="hard_skill">Hard Skill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competencia">Competência Avaliada *</Label>
              <Input
                id="competencia"
                placeholder="Ex: Direito Contratual, Liderança, Comunicação"
                value={competencia}
                onChange={(e) => setCompetencia(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Competência específica que esta pergunta avalia
              </p>
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

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>
            Adicione tags para facilitar a busca
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Digite uma tag e pressione Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button type="button" onClick={handleAddTag} variant="outline">
              Adicionar
            </Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
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
