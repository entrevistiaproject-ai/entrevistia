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
    <div className="space-y-10 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/entrevistas">
          <Button variant="outline" size="touch-icon" className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold truncate">Criar entrevista</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Defina a vaga e escolha as perguntas em poucos minutos
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Informações da Vaga */}
        <Card>
          <CardHeader className="pb-6">
            <CardTitle>Sobre a vaga</CardTitle>
            <CardDescription className="mt-2">
              Essas informações ajudam a IA a avaliar melhor os candidatos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2.5">
              <Label htmlFor="titulo">Nome da entrevista</Label>
              <Input
                id="titulo"
                placeholder="Ex: Processo seletivo - Advogado Pleno"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="empresa">Empresa (aparece para o candidato)</Label>
              <Input
                id="empresa"
                placeholder="Ex: Empresa XYZ Ltda"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Os candidatos verão este nome ao responder a entrevista
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="descricao">Descreva a vaga em detalhes</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => setDescricao(TEMPLATE_DESCRICAO)}
                >
                  Usar modelo pronto
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
                rows={8}
                required
                className="font-mono text-sm min-h-[180px] sm:min-h-[280px] resize-none sm:resize-y"
                maxLength={1000}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={descricao.length < 200 ? "text-destructive" : descricao.length > 900 ? "text-yellow-600" : "text-green-600"}>
                    {descricao.length}/1000 caracteres
                    {descricao.length < 200 && ` (mínimo: 200)`}
                  </span>
                  <span className="text-muted-foreground">
                    {descricao.length >= 200 && descricao.length <= 1000 && "✓ Tamanho adequado"}
                  </span>
                </div>
                {/* Progress bar para caracteres */}
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      descricao.length < 200
                        ? "bg-destructive"
                        : descricao.length > 900
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min((descricao.length / 1000) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <Alert className="mt-6 border-blue-600/20 bg-blue-600/10 dark:border-blue-500/30 dark:bg-blue-500/10">
                <AlertCircle className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Dica importante:</strong> A IA usa esta descrição para calcular o score de cada candidato.
                  Quanto mais detalhes você incluir, mais precisa será a análise.
                </AlertDescription>
              </Alert>
            </div>

            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
              <div className="space-y-2.5">
                <Label htmlFor="cargo">Cargo *</Label>
                <AutocompleteCargo
                  value={cargo}
                  onChange={setCargo}
                  placeholder="Digite ou selecione o cargo"
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="nivel">Nível *</Label>
                <Select value={nivel} onValueChange={setNivel} required>
                  <SelectTrigger className="h-11 sm:h-10">
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
          <CardHeader className="pb-6">
            <CardTitle>Configurações</CardTitle>
            <CardDescription className="mt-2">
              Personalize a experiência do candidato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start sm:items-center justify-between gap-5">
              <div className="space-y-1 flex-1">
                <Label htmlFor="compartilhar-resultados" className="text-sm sm:text-base">
                  Mostrar resultado para o candidato
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Após responder, o candidato pode ver seu desempenho e feedback da IA
                </p>
              </div>
              <Switch
                id="compartilhar-resultados"
                checked={compartilharResultados}
                onCheckedChange={setCompartilharResultados}
                className="shrink-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Perguntas */}
        <Card>
          <CardHeader className="pb-6">
            <CardTitle>Perguntas</CardTitle>
            <CardDescription className="mt-2">
              Escolha do banco ou crie suas próprias ({perguntas.length} {perguntas.length === 1 ? "selecionada" : "selecionadas"})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="banco" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-11 sm:h-10">
                <TabsTrigger value="banco" className="text-sm">Usar do banco</TabsTrigger>
                <TabsTrigger value="nova" className="text-sm">Criar pergunta</TabsTrigger>
              </TabsList>

              <TabsContent value="banco" className="mt-6">
                <SelecionarPerguntasBanco
                  cargo={cargo}
                  nivel={nivel}
                  perguntasSelecionadas={perguntas.map((p) => p.id)}
                  onSelecionar={handleAdicionarPerguntaBanco}
                />
              </TabsContent>

              <TabsContent value="nova" className="mt-6">
                <CriarPerguntaNova
                  cargo={cargo}
                  nivel={nivel}
                  onAdicionar={handleAdicionarPerguntaNova}
                />
              </TabsContent>
            </Tabs>

            {/* Lista de Perguntas Selecionadas */}
            {perguntas.length > 0 && (
              <div className="mt-10">
                <ListaPerguntasSelecionadas
                  perguntas={perguntas}
                  onRemover={handleRemoverPergunta}
                  onReordenar={handleReordenar}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ações - Fixo no mobile */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 sticky bottom-20 sm:static bg-background/95 backdrop-blur-sm -mx-4 px-4 py-5 sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:backdrop-blur-none border-t sm:border-0 border-border">
          <Link href="/entrevistas" className="w-full sm:w-auto">
            <Button type="button" variant="outline" disabled={loading} className="w-full sm:w-auto" size="touch">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading || perguntas.length === 0 || descricao.length < 200}
            className="w-full sm:w-auto"
            size="touch"
          >
            {loading ? "Criando..." : "Criar entrevista"}
          </Button>
        </div>
      </form>
    </div>
  );
}
