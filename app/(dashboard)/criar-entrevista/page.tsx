"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelecionarPerguntasBanco } from "@/components/entrevista/selecionar-perguntas-banco";
import { CriarPerguntaNova } from "@/components/entrevista/criar-pergunta-nova";
import { ListaPerguntasSelecionadas } from "@/components/entrevista/lista-perguntas-selecionadas";
import { AutocompleteCargo } from "@/components/entrevista/autocomplete-cargo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NIVEIS_HIERARQUICOS } from "@/lib/constants/niveis";

interface PerguntaSelecionada {
  id: string;
  texto: string;
  competencia?: string;
  categoria?: string;
  origem: "banco" | "nova";
  salvarNoBanco?: boolean;
}

export default function CriarEntrevistaPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cargo, setCargo] = useState("");
  const [nivel, setNivel] = useState("");
  const [perguntas, setPerguntas] = useState<PerguntaSelecionada[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAdicionarPerguntaBanco = (pergunta: any) => {
    const novaPergunta: PerguntaSelecionada = {
      id: pergunta.id,
      texto: pergunta.texto,
      competencia: pergunta.competencia,
      categoria: pergunta.categoria,
      origem: "banco",
    };
    setPerguntas([...perguntas, novaPergunta]);
  };

  const handleAdicionarPerguntaNova = (
    texto: string,
    salvarNoBanco: boolean,
    dados?: {
      competencia: string;
      categoria: string;
    }
  ) => {
    const novaPergunta: PerguntaSelecionada = {
      id: `nova-${Date.now()}`,
      texto,
      competencia: dados?.competencia,
      categoria: dados?.categoria,
      origem: "nova",
      salvarNoBanco,
    };
    setPerguntas([...perguntas, novaPergunta]);
  };

  const handleRemoverPergunta = (id: string) => {
    setPerguntas(perguntas.filter((p) => p.id !== id));
  };

  const handleReordenar = (fromIndex: number, toIndex: number) => {
    const newPerguntas = [...perguntas];
    const [removed] = newPerguntas.splice(fromIndex, 1);
    newPerguntas.splice(toIndex, 0, removed);
    setPerguntas(newPerguntas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implementar criação da entrevista
      console.log({
        titulo,
        descricao,
        cargo,
        nivel,
        perguntas,
      });

      // Simular sucesso
      setTimeout(() => {
        router.push("/entrevistas");
      }, 1000);
    } catch (error) {
      console.error("Erro ao criar entrevista:", error);
      alert("Erro ao criar entrevista");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/entrevistas">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nova Entrevista</h1>
          <p className="text-muted-foreground mt-2">
            Configure a vaga e selecione ou crie as perguntas
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações da Vaga */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Vaga</CardTitle>
            <CardDescription>
              Defina o cargo e os detalhes da posição
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Entrevista *</Label>
              <Input
                id="titulo"
                placeholder="Ex: Entrevista para Advogado Pleno"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva o contexto da vaga..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
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
                    {NIVEIS_HIERARQUICOS.map((nivel) => (
                      <SelectItem key={nivel.value} value={nivel.value}>
                        {nivel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perguntas */}
        <Card>
          <CardHeader>
            <CardTitle>Perguntas da Entrevista</CardTitle>
            <CardDescription>
              Selecione perguntas do banco ou crie novas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="banco" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="banco">Do Banco</TabsTrigger>
                <TabsTrigger value="nova">Criar Nova</TabsTrigger>
              </TabsList>

              <TabsContent value="banco" className="mt-4">
                <SelecionarPerguntasBanco
                  cargo={cargo}
                  nivel={nivel}
                  perguntasSelecionadas={perguntas.map((p) => p.id)}
                  onSelecionar={handleAdicionarPerguntaBanco}
                />
              </TabsContent>

              <TabsContent value="nova" className="mt-4">
                <CriarPerguntaNova
                  cargo={cargo}
                  nivel={nivel}
                  onAdicionar={handleAdicionarPerguntaNova}
                />
              </TabsContent>
            </Tabs>

            {/* Lista de Perguntas Selecionadas */}
            {perguntas.length > 0 && (
              <div className="mt-6">
                <ListaPerguntasSelecionadas
                  perguntas={perguntas}
                  onRemover={handleRemoverPergunta}
                  onReordenar={handleReordenar}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex justify-end gap-4">
          <Link href="/entrevistas">
            <Button type="button" variant="outline" disabled={loading}>
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={loading || perguntas.length === 0}>
            {loading ? "Criando..." : "Criar Entrevista"}
          </Button>
        </div>
      </form>
    </div>
  );
}
