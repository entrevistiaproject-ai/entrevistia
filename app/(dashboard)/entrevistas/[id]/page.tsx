"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  FileQuestion,
  Loader2,
  Archive,
  CheckCircle,
  Play,
  AlertTriangle,
  ChevronDown,
  FileText,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import { AdicionarCandidatoDialog } from "@/components/entrevistas/adicionar-candidato-dialog";
import { UploadCandidatosDialog } from "@/components/entrevistas/upload-candidatos-dialog";
import { CompartilharLinkDialog } from "@/components/entrevistas/compartilhar-link-dialog";
import { DecisaoCandidato } from "@/components/entrevistas/decisao-candidato";
import { EditarEntrevistaDialog } from "@/components/entrevistas/editar-entrevista-dialog";
import { EditarPerguntasDialog } from "@/components/entrevistas/editar-perguntas-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Entrevista {
  id: string;
  titulo: string;
  descricao: string | null;
  cargo: string | null;
  nivel: string | null;
  empresa: string | null;
  status: string;
  duracao: number | null;
  slug: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  linkedin: string | null;
  createdAt: Date;
  // Dados da participação na entrevista
  status: string;
  iniciadaEm: Date | null;
  concluidaEm: Date | null;
  // Dados da avaliação da IA
  notaGeral: number | null;
  recomendacao: "recomendado" | "recomendado_com_ressalvas" | "nao_recomendado" | null;
  avaliadoEm: Date | null;
  // Decisão do recrutador
  decisaoRecrutador: "aprovado" | "reprovado" | null;
  decisaoRecrutadorEm: Date | null;
  decisaoRecrutadorObservacao: string | null;
  // Email de encerramento
  emailEncerramentoEnviadoEm: Date | null;
}

interface Pergunta {
  id: string;
  entrevistaId: string;
  texto: string;
  ordem: number;
  tipo: string;
  obrigatoria: string;
  tempoMaximo: number | null;
  pontuacaoMaxima: number;
  createdAt: Date;
}

const statusConfig: Record<string, { label: string; variant: any; color: string }> = {
  active: { label: "Ativa", variant: "default", color: "bg-green-500" },
  completed: { label: "Encerrada", variant: "outline", color: "bg-gray-400" },
  archived: { label: "Arquivada", variant: "secondary", color: "bg-gray-500" },
};

const candidatoStatusConfig: Record<string, { label: string; variant: "outline" | "default" | "secondary" | "destructive" }> = {
  pendente: { label: "Pendente", variant: "outline" },
  em_andamento: { label: "Em andamento", variant: "default" },
  concluida: { label: "Concluída", variant: "secondary" },
  cancelada: { label: "Cancelada", variant: "destructive" },
};


const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

export default function EntrevistaDetalhesPage() {
  const params = useParams();
  const [entrevista, setEntrevista] = useState<Entrevista | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [descricaoAberta, setDescricaoAberta] = useState(false);
  const [filtroDecisao, setFiltroDecisao] = useState<string>("todos");

  const fetchData = async () => {
    try {
      setLoading(true);


      // Buscar entrevista
      const resEntrevista = await fetch(`/api/entrevistas/${params.id}`, {
        });

      if (resEntrevista.ok) {
        const data = await resEntrevista.json();
        setEntrevista(data);
      }

      // Buscar perguntas da entrevista
      const resPerguntas = await fetch(`/api/entrevistas/${params.id}/perguntas`, {
        });

      if (resPerguntas.ok) {
        const data = await resPerguntas.json();
        setPerguntas(data);
      }

      // Buscar candidatos vinculados à entrevista
      const resCandidatos = await fetch(`/api/entrevistas/${params.id}/candidatos`, {
        });

      if (resCandidatos.ok) {
        const data = await resCandidatos.json();
        setCandidatos(data);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEncerrar = async () => {
    if (!entrevista) return;

    setActionLoading("encerrar");
    try {
      const res = await fetch(`/api/entrevistas/${entrevista.id}/encerrar`, {
        method: "POST",
      });

      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Erro ao encerrar vaga:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleArquivar = async () => {
    if (!entrevista) return;

    setActionLoading("arquivar");
    try {
      const res = await fetch(`/api/entrevistas/${entrevista.id}/publicar`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Erro ao arquivar vaga:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReativar = async () => {
    if (!entrevista) return;

    setActionLoading("reativar");
    try {
      const res = await fetch(`/api/entrevistas/${entrevista.id}/publicar`, {
        method: "POST",
      });

      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Erro ao reativar vaga:", error);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!entrevista) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <p className="text-lg text-muted-foreground">Entrevista não encontrada</p>
        <Button asChild>
          <Link href="/entrevistas">Voltar para Entrevistas</Link>
        </Button>
      </div>
    );
  }

  const statusInfo = statusConfig[entrevista.status] || statusConfig.active;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="outline" size="touch-icon" asChild className="shrink-0 mt-1">
          <Link href="/entrevistas">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">{entrevista.titulo}</h1>
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>
          {entrevista.descricao && (
            <button
              onClick={() => setDescricaoAberta(!descricaoAberta)}
              className="flex items-center gap-2 mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>Ver descrição da vaga</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${descricaoAberta ? 'rotate-180' : ''}`} />
            </button>
          )}
          {descricaoAberta && entrevista.descricao && (
            <div className="mt-3 p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm text-muted-foreground whitespace-pre-line">{entrevista.descricao}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cards de Resumo - scroll horizontal no mobile */}
      <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
          <Card className="min-w-[140px] sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{candidatos.length}</div>
              <p className="text-xs text-muted-foreground">Total cadastrados</p>
            </CardContent>
          </Card>

          <Card className="min-w-[140px] sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perguntas</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileQuestion className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{perguntas.length}</div>
              <p className="text-xs text-muted-foreground">Na entrevista</p>
            </CardContent>
          </Card>

          <Card className="min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duração Média</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                // Calcular duração média das entrevistas concluídas
                const entrevistasComDuracao = candidatos.filter(
                  (c) => c.status === "concluida" && c.iniciadaEm && c.concluidaEm
                );

                let duracaoMedia: number | null = null;
                if (entrevistasComDuracao.length > 0) {
                  const totalMinutos = entrevistasComDuracao.reduce((acc, c) => {
                    const inicio = new Date(c.iniciadaEm!).getTime();
                    const fim = new Date(c.concluidaEm!).getTime();
                    return acc + (fim - inicio) / 1000 / 60;
                  }, 0);
                  duracaoMedia = Math.round(totalMinutos / entrevistasComDuracao.length);
                }

                return (
                  <div className="space-y-1">
                    {duracaoMedia !== null ? (
                      <>
                        <div className="text-2xl font-bold">{duracaoMedia}m</div>
                        <p className="text-xs text-muted-foreground">Média realizada</p>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Sem dados ainda</p>
                      </>
                    )}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          <Card className="min-w-40 sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Máximo</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                // Tempo máximo = 45s por pergunta + 3min por resposta = 3.75min por pergunta
                const tempoMaximoCalculado = perguntas.length > 0
                  ? Math.ceil(perguntas.length * 3.75)
                  : null;
                const tempoMaximoDefinido = entrevista.duracao;

                return (
                  <div className="space-y-1">
                    {tempoMaximoDefinido ? (
                      <>
                        <div className="text-2xl font-bold">{tempoMaximoDefinido}m</div>
                        <p className="text-xs text-muted-foreground">Definido</p>
                      </>
                    ) : tempoMaximoCalculado ? (
                      <>
                        <div className="text-2xl font-bold">{tempoMaximoCalculado}m</div>
                        <p className="text-xs text-muted-foreground">Calculado</p>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Não definido</p>
                      </>
                    )}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          <Card className="min-w-[140px] sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Criada</CardTitle>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {formatDistanceToNow(new Date(entrevista.createdAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(entrevista.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="candidatos" className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex h-11 sm:h-10">
          <TabsTrigger value="candidatos" className="text-xs sm:text-sm">Candidatos</TabsTrigger>
          <TabsTrigger value="perguntas" className="text-xs sm:text-sm">Perguntas</TabsTrigger>
          <TabsTrigger value="configuracoes" className="text-xs sm:text-sm">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="candidatos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Gerenciar Candidatos</CardTitle>
                  <CardDescription>
                    Adicione candidatos manualmente, em lote ou compartilhe o link da
                    entrevista
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={filtroDecisao} onValueChange={setFiltroDecisao}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="aprovado">Aprovados</SelectItem>
                      <SelectItem value="reprovado">Reprovados</SelectItem>
                      <SelectItem value="sem_avaliacao">Sem avaliação</SelectItem>
                    </SelectContent>
                  </Select>
                  <CompartilharLinkDialog
                    entrevistaId={entrevista.id}
                    slug={entrevista.slug}
                  />
                  <UploadCandidatosDialog
                    entrevistaId={entrevista.id}
                    onSuccess={fetchData}
                  />
                  <AdicionarCandidatoDialog
                    entrevistaId={entrevista.id}
                    onSuccess={fetchData}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                const candidatosFiltrados = candidatos.filter((c) => {
                  if (filtroDecisao === "todos") return true;
                  if (filtroDecisao === "aprovado") return c.decisaoRecrutador === "aprovado";
                  if (filtroDecisao === "reprovado") return c.decisaoRecrutador === "reprovado";
                  if (filtroDecisao === "sem_avaliacao") return c.decisaoRecrutador === null;
                  return true;
                });

                if (candidatos.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-lg font-semibold">Nenhum candidato ainda</p>
                      <p className="text-muted-foreground">
                        Adicione candidatos usando os botões acima
                      </p>
                    </div>
                  );
                }

                if (candidatosFiltrados.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-lg font-semibold">Nenhum candidato encontrado</p>
                      <p className="text-muted-foreground">
                        Nenhum candidato corresponde ao filtro selecionado
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    {candidatosFiltrados.map((candidato) => {
                    return (
                      <div
                        key={candidato.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <Link
                          href={`/candidatos/${candidato.id}/resultado`}
                          className="flex-1 min-w-0"
                        >
                          <p className="font-medium truncate hover:text-primary transition-colors">{candidato.nome}</p>
                          <p className="text-sm text-muted-foreground truncate">{candidato.email}</p>
                        </Link>

                        {/* Score, Decisão e Status */}
                        <div className="flex items-center gap-3 ml-4">
                          {candidato.notaGeral !== null && (
                            <div className="flex items-center gap-1.5">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className={`font-bold ${getScoreColor(candidato.notaGeral)}`}>
                                {Math.round(candidato.notaGeral)}
                              </span>
                            </div>
                          )}

                          {/* Decisão do recrutador - só mostra para entrevistas concluídas */}
                          {candidato.status === "concluida" && (
                            <DecisaoCandidato
                              candidatoId={candidato.id}
                              entrevistaId={entrevista.id}
                              candidatoNome={candidato.nome}
                              decisaoAtual={candidato.decisaoRecrutador}
                              recomendacaoIA={candidato.recomendacao}
                              observacaoAtual={candidato.decisaoRecrutadorObservacao}
                              emailEncerramentoEnviado={!!candidato.emailEncerramentoEnviadoEm}
                              onDecisaoAtualizada={fetchData}
                              compact
                            />
                          )}

                          <Badge variant={candidatoStatusConfig[candidato.status]?.variant || "outline"}>
                            {candidatoStatusConfig[candidato.status]?.label || "Pendente"}
                          </Badge>

                          <Link href={`/candidatos/${candidato.id}/resultado`}>
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perguntas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Perguntas da Entrevista</CardTitle>
                  <CardDescription>
                    Gerencie as perguntas que serão apresentadas aos candidatos
                  </CardDescription>
                </div>
                <EditarPerguntasDialog
                  entrevistaId={entrevista.id}
                  perguntas={perguntas}
                  temCandidatos={candidatos.length > 0}
                  cargo={entrevista.cargo || undefined}
                  nivel={entrevista.nivel || undefined}
                  onSuccess={fetchData}
                />
              </div>
            </CardHeader>
            <CardContent>
              {perguntas.length === 0 ? (
                <div className="text-center py-12">
                  <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-semibold">Nenhuma pergunta ainda</p>
                  <p className="text-muted-foreground">
                    As perguntas adicionadas na criação da entrevista aparecerão aqui
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {perguntas.map((pergunta, index) => (
                    <div
                      key={pergunta.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{pergunta.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informações da Vaga</CardTitle>
                  <CardDescription>
                    Detalhes e configurações da entrevista
                  </CardDescription>
                </div>
                <EditarEntrevistaDialog
                  entrevista={entrevista}
                  temCandidatos={candidatos.length > 0}
                  onSuccess={fetchData}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <p className="text-sm font-medium">Título</p>
                  <p className="text-sm text-muted-foreground">
                    {entrevista.titulo}
                  </p>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium">Cargo</p>
                  <p className="text-sm text-muted-foreground">
                    {entrevista.cargo || "Não especificado"}
                  </p>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium">Empresa</p>
                  <p className="text-sm text-muted-foreground">
                    {entrevista.empresa || "Não especificada"}
                  </p>
                </div>
                {entrevista.duracao && (
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">Duração máxima</p>
                    <p className="text-sm text-muted-foreground">
                      {entrevista.duracao} minutos
                    </p>
                  </div>
                )}
                {entrevista.descricao && (
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">Descrição</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {entrevista.descricao}
                    </p>
                  </div>
                )}
                <div className="grid gap-2">
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={statusInfo.variant} className="w-fit">
                    {statusInfo.label}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Gerenciamento da Vaga */}
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Vaga</CardTitle>
              <CardDescription>
                Encerre ou arquive esta vaga conforme necessário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Ação: Encerrar Vaga */}
              {entrevista.status === "active" && (
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Encerrar Vaga</p>
                      <p className="text-sm text-muted-foreground">
                        Finaliza o processo seletivo. Candidatos não poderão mais responder à entrevista.
                        Os dados serão mantidos para consulta.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleEncerrar}
                    disabled={actionLoading !== null}
                  >
                    {actionLoading === "encerrar" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Encerrar
                  </Button>
                </div>
              )}

              {/* Ação: Arquivar Vaga */}
              {(entrevista.status === "active" || entrevista.status === "completed") && (
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Archive className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Arquivar Vaga</p>
                      <p className="text-sm text-muted-foreground">
                        Move a vaga para o arquivo. Ela não aparecerá mais na listagem principal,
                        mas os dados serão preservados.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleArquivar}
                    disabled={actionLoading !== null}
                  >
                    {actionLoading === "arquivar" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Archive className="h-4 w-4 mr-2" />
                    )}
                    Arquivar
                  </Button>
                </div>
              )}

              {/* Ação: Reativar Vaga */}
              {(entrevista.status === "completed" || entrevista.status === "archived") && (
                <div className="flex items-start justify-between p-4 border rounded-lg border-green-200 bg-green-50/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Play className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Reativar Vaga</p>
                      <p className="text-sm text-muted-foreground">
                        Reativa a vaga para receber novas respostas. Candidatos poderão
                        acessar e responder à entrevista novamente.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    onClick={handleReativar}
                    disabled={actionLoading !== null}
                  >
                    {actionLoading === "reativar" ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Reativar
                  </Button>
                </div>
              )}

              {/* Aviso sobre status atual */}
              {entrevista.status === "archived" && (
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Vaga arquivada</p>
                    <p className="text-sm text-amber-700">
                      Esta vaga está arquivada e não está visível na listagem principal.
                      Você pode reativá-la a qualquer momento.
                    </p>
                  </div>
                </div>
              )}

              {entrevista.status === "completed" && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-gray-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Processo encerrado</p>
                    <p className="text-sm text-gray-600">
                      O processo seletivo para esta vaga foi encerrado. Candidatos não podem
                      mais responder à entrevista.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
