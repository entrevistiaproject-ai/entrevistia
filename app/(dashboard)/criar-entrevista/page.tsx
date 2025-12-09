"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NIVEIS_HIERARQUICOS } from "@/lib/constants/niveis";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TEMPLATE_DESCRICAO = `📋 SOBRE A VAGA
[Descreva brevemente o contexto da posição, equipe e momento da empresa]

🛠️ STACK / FERRAMENTAS
- [Tecnologia ou ferramenta 1]
- [Tecnologia ou ferramenta 2]
- [Sistema ou metodologia utilizada]

📌 ÁREA DE ATUAÇÃO
- [Departamento ou projeto específico]
- [Tipo de clientes/público atendido]
- [Escopo de trabalho]

✅ RESPONSABILIDADES
- [Principal atividade ou entrega esperada]
- [Segunda responsabilidade importante]
- [Terceira responsabilidade]
- [Outras atribuições relevantes]

🎯 REQUISITOS DESEJADOS
- [Tempo de experiência na área]
- [Conhecimentos técnicos necessários]
- [Formação ou certificações]
- [Soft skills importantes para a função]

💡 DIFERENCIAIS
- [O que faria o candidato se destacar]
- [Experiências ou conhecimentos extras valorizados]

📊 INFORMAÇÕES ADICIONAIS
- Modelo: [Presencial/Híbrido/Remoto]
- Horário: [Período de trabalho]
- Benefícios: [Principais benefícios oferecidos]`;

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
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [nivel, setNivel] = useState("");
  const [compartilharResultados, setCompartilharResultados] = useState(false);
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
      const response = await fetch("/api/entrevistas/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
          empresa,
          cargo,
          nivel,
          perguntas,
          compartilharResultados,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar entrevista");
      }

      const data = await response.json();

      // Redireciona para a página da entrevista criada
      router.push(`/entrevistas/${data.entrevista.id}`);
    } catch (error) {
      console.error("Erro ao criar entrevista:", error);
      alert(error instanceof Error ? error.message : "Erro ao criar entrevista");
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
              <Label htmlFor="empresa">Nome da Empresa</Label>
              <Input
                id="empresa"
                placeholder="Ex: Empresa XYZ Ltda"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Será exibido para os candidatos como informação da vaga
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="descricao">Descrição da Vaga *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setDescricao(TEMPLATE_DESCRICAO)}
                >
                  Usar template
                </Button>
              </div>
              <Textarea
                id="descricao"
                placeholder={`Exemplo de descrição estruturada:

📋 SOBRE A VAGA
Breve contexto sobre a posição e equipe...

🛠️ STACK / FERRAMENTAS
- Tecnologias, sistemas ou ferramentas utilizadas

📌 ÁREA DE ATUAÇÃO
- Departamento ou projeto específico
- Tipo de clientes/público atendido

✅ RESPONSABILIDADES
- Principal atividade 1
- Principal atividade 2
- Principal atividade 3

🎯 REQUISITOS DESEJADOS
- Experiência necessária
- Conhecimentos técnicos
- Soft skills importantes

💡 DIFERENCIAIS
- O que faria o candidato se destacar`}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={12}
                required
                className="font-mono text-sm"
                maxLength={1000}
              />
              <div className="flex items-center justify-between text-xs">
                <span className={descricao.length < 200 ? "text-red-500" : descricao.length > 900 ? "text-yellow-600" : "text-green-600"}>
                  {descricao.length}/1000 caracteres
                  {descricao.length < 200 && ` (mínimo: 200)`}
                </span>
                <span className="text-muted-foreground">
                  {descricao.length >= 200 && descricao.length <= 1000 && "✓ Tamanho adequado"}
                </span>
              </div>
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  A descrição é utilizada pela IA para calcular o <strong>score de compatibilidade</strong> dos candidatos com a vaga.
                  Quanto mais detalhada (200-1000 caracteres), melhor será a análise das respostas.
                </AlertDescription>
              </Alert>
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

        {/* Configurações */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>
              Defina como a entrevista funcionará
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compartilhar-resultados">
                  Compartilhar resultados com candidatos
                </Label>
                <p className="text-sm text-muted-foreground">
                  Permite que candidatos vejam suas respostas e feedback após completar a entrevista
                </p>
              </div>
              <Switch
                id="compartilhar-resultados"
                checked={compartilharResultados}
                onCheckedChange={setCompartilharResultados}
              />
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
          <Button type="submit" disabled={loading || perguntas.length === 0 || descricao.length < 200}>
            {loading ? "Criando..." : "Criar Entrevista"}
          </Button>
        </div>
      </form>
    </div>
  );
}
