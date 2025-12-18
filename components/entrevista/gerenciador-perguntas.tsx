"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Plus,
  Star,
  Trash2,
  ChevronUp,
  ChevronDown,
  Database,
  FileText,
  Save,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getLabelNivel } from "@/lib/constants/niveis";
import { CATEGORIAS_DISPONIVEIS } from "@/lib/utils/classificacao-perguntas";

interface PerguntaBanco {
  id: string;
  texto: string;
  cargo: string;
  nivel: string;
  categoria: string;
  competencia: string;
  isPadrao: boolean;
  isFavorita?: boolean;
  isOculta?: boolean;
}

export interface PerguntaSelecionada {
  id: string;
  texto: string;
  competencia?: string;
  categoria?: string;
  origem: "banco" | "nova";
  salvarNoBanco?: boolean;
}

interface GerenciadorPerguntasProps {
  cargo?: string;
  nivel?: string;
  perguntasIniciais?: PerguntaSelecionada[];
  onChange: (perguntas: PerguntaSelecionada[]) => void;
  modoEdicao?: boolean;
}

const categoriaLabels: Record<string, string> = {
  tecnica: "Técnica",
  experiencia: "Experiência",
  comportamental: "Comportamental",
  situacional: "Situacional",
};

const categoriaColors: Record<string, string> = {
  tecnica: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  experiencia: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  comportamental: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  situacional: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

export function GerenciadorPerguntas({
  cargo,
  nivel,
  perguntasIniciais = [],
  onChange,
  modoEdicao = false,
}: GerenciadorPerguntasProps) {
  const [perguntas, setPerguntas] = useState<PerguntaSelecionada[]>(perguntasIniciais);
  const [perguntasBanco, setPerguntasBanco] = useState<PerguntaBanco[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabAtiva, setTabAtiva] = useState<string>("banco");

  // Estados para filtros do banco
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroCargo, setFiltroCargo] = useState<string>("todos");
  const [filtroNivel, setFiltroNivel] = useState<string>("todos");
  const [tabBanco, setTabBanco] = useState<string>("recomendadas");

  // Estados para criar nova pergunta
  const [novaPerguntaTexto, setNovaPerguntaTexto] = useState("");
  const [salvarNoBanco, setSalvarNoBanco] = useState(false);
  const [novaCompetencia, setNovaCompetencia] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");

  // Buscar perguntas do banco
  useEffect(() => {
    async function fetchPerguntas() {
      try {
        const response = await fetch("/api/perguntas?limit=100");
        const data = await response.json();
        const { perguntas: perguntasData, favoritasIds = [], ocultasIds = [] } = data;

        // Marca perguntas como favoritas ou ocultas e filtra as ocultas
        const perguntasProcessadas = (perguntasData || [])
          .map((p: PerguntaBanco) => ({
            ...p,
            isFavorita: favoritasIds.includes(p.id),
            isOculta: ocultasIds.includes(p.id),
          }))
          .filter((p: PerguntaBanco) => !p.isOculta); // Remove perguntas ocultas da visualização

        // Ordena: favoritas primeiro, depois por data
        perguntasProcessadas.sort((a: PerguntaBanco, b: PerguntaBanco) => {
          if (a.isFavorita && !b.isFavorita) return -1;
          if (!a.isFavorita && b.isFavorita) return 1;
          return 0;
        });

        setPerguntasBanco(perguntasProcessadas);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPerguntas();
  }, []);

  // Sincronizar mudanças com o componente pai
  useEffect(() => {
    onChange(perguntas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perguntas]); // onChange é excluído intencionalmente para evitar loops

  // Atualizar perguntas quando perguntasIniciais mudar (modo edição)
  useEffect(() => {
    if (modoEdicao && perguntasIniciais.length > 0) {
      setPerguntas(perguntasIniciais);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoEdicao, JSON.stringify(perguntasIniciais)]); // Usa stringify para comparar conteúdo real

  // Extrair cargos e níveis únicos para os filtros
  const cargosUnicos = useMemo(() => {
    return Array.from(new Set(perguntasBanco.map((p) => p.cargo))).sort();
  }, [perguntasBanco]);

  const niveisUnicos = useMemo(() => {
    return Array.from(new Set(perguntasBanco.map((p) => p.nivel)));
  }, [perguntasBanco]);

  // Filtrar perguntas recomendadas (cargo e nível exatos)
  const perguntasRecomendadas = useMemo(() => {
    return perguntasBanco.filter((p) => {
      if (cargo && p.cargo !== cargo) return false;
      if (nivel && p.nivel !== nivel) return false;

      if (
        filtroTexto &&
        !p.texto.toLowerCase().includes(filtroTexto.toLowerCase()) &&
        !(p.competencia && p.competencia.toLowerCase().includes(filtroTexto.toLowerCase()))
      ) {
        return false;
      }

      if (filtroCategoria !== "todas" && p.categoria !== filtroCategoria) {
        return false;
      }

      return true;
    });
  }, [perguntasBanco, cargo, nivel, filtroTexto, filtroCategoria]);

  // Filtrar todas as perguntas (busca expandida)
  const todasPerguntasFiltradas = useMemo(() => {
    return perguntasBanco.filter((p) => {
      if (filtroCargo !== "todos" && p.cargo !== filtroCargo) return false;
      if (filtroNivel !== "todos" && p.nivel !== filtroNivel) return false;

      if (
        filtroTexto &&
        !p.texto.toLowerCase().includes(filtroTexto.toLowerCase()) &&
        !(p.competencia && p.competencia.toLowerCase().includes(filtroTexto.toLowerCase()))
      ) {
        return false;
      }

      if (filtroCategoria !== "todas" && p.categoria !== filtroCategoria) {
        return false;
      }

      return true;
    });
  }, [perguntasBanco, filtroCargo, filtroNivel, filtroTexto, filtroCategoria]);

  // IDs das perguntas já selecionadas
  const perguntasSelecionadasIds = useMemo(() => {
    return perguntas.map((p) => p.id);
  }, [perguntas]);

  // Handlers
  const handleAdicionarDoBanco = (pergunta: PerguntaBanco) => {
    const novaPergunta: PerguntaSelecionada = {
      id: pergunta.id,
      texto: pergunta.texto,
      competencia: pergunta.competencia,
      categoria: pergunta.categoria,
      origem: "banco",
    };
    setPerguntas([...perguntas, novaPergunta]);
  };

  const handleAdicionarNova = () => {
    if (!novaPerguntaTexto.trim()) {
      return;
    }

    if (salvarNoBanco && (!novaCompetencia || !novaCategoria)) {
      alert("Preencha competência e categoria para salvar no banco");
      return;
    }

    const novaPergunta: PerguntaSelecionada = {
      id: `nova-${Date.now()}`,
      texto: novaPerguntaTexto.trim(),
      competencia: salvarNoBanco ? novaCompetencia : undefined,
      categoria: salvarNoBanco ? novaCategoria : undefined,
      origem: "nova",
      salvarNoBanco,
    };
    setPerguntas([...perguntas, novaPergunta]);

    // Limpar formulário
    setNovaPerguntaTexto("");
    setNovaCompetencia("");
    setNovaCategoria("");
    setSalvarNoBanco(false);
  };

  const handleRemover = (id: string) => {
    setPerguntas(perguntas.filter((p) => p.id !== id));
  };

  const handleMover = (index: number, direcao: "cima" | "baixo") => {
    const novoIndex = direcao === "cima" ? index - 1 : index + 1;
    if (novoIndex < 0 || novoIndex >= perguntas.length) return;

    const novasPerguntas = [...perguntas];
    const [removed] = novasPerguntas.splice(index, 1);
    novasPerguntas.splice(novoIndex, 0, removed);
    setPerguntas(novasPerguntas);
  };

  const handleEditarTexto = (id: string, novoTexto: string) => {
    setPerguntas(
      perguntas.map((p) => (p.id === id ? { ...p, texto: novoTexto } : p))
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={tabAtiva} onValueChange={setTabAtiva} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-11 sm:h-10">
          <TabsTrigger value="banco" className="text-sm">
            Usar do banco
          </TabsTrigger>
          <TabsTrigger value="criar" className="text-sm">
            Criar pergunta
          </TabsTrigger>
        </TabsList>

        {/* Tab: Usar do Banco */}
        <TabsContent value="banco" className="mt-5 space-y-4">
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">
              Carregando perguntas...
            </div>
          ) : !cargo || !nivel ? (
            <div className="py-8 text-center text-muted-foreground">
              {modoEdicao
                ? "Use os filtros abaixo para encontrar perguntas"
                : "Selecione o cargo e nível acima para ver perguntas sugeridas"}
            </div>
          ) : (
            <Tabs value={tabBanco} onValueChange={setTabBanco}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recomendadas" className="gap-2">
                  <Star className="h-4 w-4" />
                  Recomendadas ({perguntasRecomendadas.length})
                </TabsTrigger>
                <TabsTrigger value="todas">
                  Todas as Perguntas ({perguntasBanco.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recomendadas" className="space-y-4 mt-4">
                {/* Filtros para recomendadas */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar perguntas..."
                      value={filtroTexto}
                      onChange={(e) => setFiltroTexto(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas Categorias</SelectItem>
                      <SelectItem value="tecnica">Técnica</SelectItem>
                      <SelectItem value="experiencia">Experiência</SelectItem>
                      <SelectItem value="comportamental">Comportamental</SelectItem>
                      <SelectItem value="situacional">Situacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <p className="text-xs text-muted-foreground">
                  Perguntas específicas para <strong>{cargo}</strong> nível{" "}
                  <strong>{getLabelNivel(nivel)}</strong>
                </p>

                <ListaPerguntasBanco
                  perguntas={perguntasRecomendadas}
                  perguntasSelecionadas={perguntasSelecionadasIds}
                  onSelecionar={handleAdicionarDoBanco}
                  cargoAtual={cargo}
                />
              </TabsContent>

              <TabsContent value="todas" className="space-y-4 mt-4">
                {/* Filtros expandidos */}
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar perguntas..."
                      value={filtroTexto}
                      onChange={(e) => setFiltroTexto(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filtroCargo} onValueChange={setFiltroCargo}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Cargos</SelectItem>
                      {cargosUnicos.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c} {c === cargo && "(atual)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos Níveis</SelectItem>
                      {niveisUnicos.map((n) => (
                        <SelectItem key={n} value={n}>
                          {getLabelNivel(n)} {n === nivel && "(atual)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas Categorias</SelectItem>
                      <SelectItem value="tecnica">Técnica</SelectItem>
                      <SelectItem value="experiencia">Experiência</SelectItem>
                      <SelectItem value="comportamental">Comportamental</SelectItem>
                      <SelectItem value="situacional">Situacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <p className="text-xs text-muted-foreground">
                  Busque perguntas de qualquer cargo para complementar sua entrevista.
                </p>

                <ListaPerguntasBanco
                  perguntas={todasPerguntasFiltradas}
                  perguntasSelecionadas={perguntasSelecionadasIds}
                  onSelecionar={handleAdicionarDoBanco}
                  cargoAtual={cargo}
                />
              </TabsContent>
            </Tabs>
          )}

          {/* Mostrar filtros expandidos se não tiver cargo/nivel no modo edição */}
          {modoEdicao && (!cargo || !nivel) && !loading && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar perguntas..."
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filtroCargo} onValueChange={setFiltroCargo}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Cargos</SelectItem>
                    {cargosUnicos.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Níveis</SelectItem>
                    {niveisUnicos.map((n) => (
                      <SelectItem key={n} value={n}>
                        {getLabelNivel(n)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas Categorias</SelectItem>
                    <SelectItem value="tecnica">Técnica</SelectItem>
                    <SelectItem value="experiencia">Experiência</SelectItem>
                    <SelectItem value="comportamental">Comportamental</SelectItem>
                    <SelectItem value="situacional">Situacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ListaPerguntasBanco
                perguntas={todasPerguntasFiltradas}
                perguntasSelecionadas={perguntasSelecionadasIds}
                onSelecionar={handleAdicionarDoBanco}
                cargoAtual={cargo}
              />
            </div>
          )}
        </TabsContent>

        {/* Tab: Criar Pergunta */}
        <TabsContent value="criar" className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nova-pergunta">Texto da Pergunta *</Label>
            <Textarea
              id="nova-pergunta"
              placeholder="Ex: Descreva uma situação em que você teve que resolver um conflito com um cliente..."
              value={novaPerguntaTexto}
              onChange={(e) => setNovaPerguntaTexto(e.target.value)}
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
                    value={novaCompetencia}
                    onChange={(e) => setNovaCompetencia(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select value={novaCategoria} onValueChange={setNovaCategoria}>
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

              {cargo && nivel && (
                <p className="text-xs text-muted-foreground">
                  Cargo: <strong>{cargo}</strong> | Nível:{" "}
                  <strong>{getLabelNivel(nivel)}</strong>
                </p>
              )}
            </div>
          )}

          <Button
            type="button"
            onClick={handleAdicionarNova}
            className="w-full"
            variant={salvarNoBanco ? "default" : "outline"}
            disabled={!novaPerguntaTexto.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            {salvarNoBanco ? "Adicionar e Salvar no Banco" : "Adicionar Pergunta"}
          </Button>
        </TabsContent>
      </Tabs>

      {/* Lista de Perguntas Selecionadas */}
      {perguntas.length > 0 && (
        <div className="space-y-3 pt-6 border-t">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Perguntas Selecionadas ({perguntas.length})
            </h3>
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                Use as setas para reordenar
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            {perguntas.map((pergunta, index) => (
              <div
                key={pergunta.id}
                className="flex items-start gap-2 rounded-lg border p-4 bg-card hover:bg-accent/50 transition-colors group"
              >
                {/* Indicador de arrastar */}
                <div className="flex items-center justify-center text-muted-foreground/50 pt-2">
                  <GripVertical className="h-5 w-5" />
                </div>

                {/* Controles de ordem */}
                <div className="flex flex-col items-center gap-0.5 text-muted-foreground min-w-10">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-primary/10"
                    onClick={() => handleMover(index, "cima")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-bold text-foreground bg-muted rounded px-2 py-0.5">
                    {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-primary/10"
                    onClick={() => handleMover(index, "baixo")}
                    disabled={index === perguntas.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Conteúdo da pergunta */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Indicador de origem */}
                    {pergunta.origem === "banco" ? (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Database className="h-3 w-3" />
                        Do Banco
                      </Badge>
                    ) : (
                      <Badge
                        variant={pergunta.salvarNoBanco ? "default" : "outline"}
                        className="text-xs gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        {pergunta.salvarNoBanco ? "Nova (salvar)" : "Nova"}
                      </Badge>
                    )}

                    {/* Categoria */}
                    {pergunta.categoria && (
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", categoriaColors[pergunta.categoria])}
                      >
                        {categoriaLabels[pergunta.categoria] || pergunta.categoria}
                      </Badge>
                    )}

                    {/* Competência */}
                    {pergunta.competencia && (
                      <Badge variant="outline" className="text-xs">
                        {pergunta.competencia}
                      </Badge>
                    )}
                  </div>

                  {modoEdicao ? (
                    <Input
                      value={pergunta.texto}
                      onChange={(e) => handleEditarTexto(pergunta.id, e.target.value)}
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm leading-relaxed">{pergunta.texto}</p>
                  )}
                </div>

                {/* Botão Remover */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemover(pergunta.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>
              {perguntas.filter((p) => p.origem === "banco").length} do banco •{" "}
              {perguntas.filter((p) => p.origem === "nova").length} novas
            </span>
            <span>
              {perguntas.filter((p) => p.salvarNoBanco).length} para salvar no banco
            </span>
          </div>
        </div>
      )}

      {perguntas.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/30">
          <p>Nenhuma pergunta selecionada ainda.</p>
          <p className="text-sm mt-1">
            Use as abas acima para adicionar perguntas do banco ou criar novas.
          </p>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para lista de perguntas do banco
function ListaPerguntasBanco({
  perguntas,
  perguntasSelecionadas,
  onSelecionar,
  cargoAtual,
}: {
  perguntas: PerguntaBanco[];
  perguntasSelecionadas: string[];
  onSelecionar: (pergunta: PerguntaBanco) => void;
  cargoAtual?: string;
}) {
  if (perguntas.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Nenhuma pergunta encontrada.
        <br />
        <span className="text-sm">
          Tente ajustar os filtros ou crie uma pergunta nova.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {perguntas.map((pergunta) => {
        const jaSelecionada = perguntasSelecionadas.includes(pergunta.id);
        const isOutroCargo = cargoAtual && pergunta.cargo !== cargoAtual;

        return (
          <div
            key={pergunta.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 transition-colors",
              jaSelecionada
                ? "bg-primary/5 border-primary"
                : pergunta.isFavorita
                ? "bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:hover:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800"
                : isOutroCargo
                ? "bg-muted/30 hover:bg-muted/50"
                : "hover:bg-accent"
            )}
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={categoriaColors[pergunta.categoria]}
                >
                  {categoriaLabels[pergunta.categoria] || pergunta.categoria}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {pergunta.cargo}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getLabelNivel(pergunta.nivel)}
                </Badge>
                {pergunta.competencia && (
                  <Badge variant="secondary" className="text-xs">
                    {pergunta.competencia}
                  </Badge>
                )}
                {pergunta.isFavorita && (
                  <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Favorita
                  </Badge>
                )}
                {pergunta.isPadrao && !pergunta.isFavorita && (
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Padrão
                  </Badge>
                )}
              </div>
              <p className="text-sm leading-relaxed">{pergunta.texto}</p>
            </div>
            <Button
              type="button"
              size="sm"
              variant={jaSelecionada ? "secondary" : "outline"}
              onClick={() => !jaSelecionada && onSelecionar(pergunta)}
              disabled={jaSelecionada}
            >
              {jaSelecionada ? (
                "Adicionada"
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
