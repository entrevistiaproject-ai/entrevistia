"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  Users,
  FileQuestion,
  Loader2,
  Archive,
  CheckCircle,
  Play,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { AdicionarCandidatoDialog } from "@/components/entrevistas/adicionar-candidato-dialog";
import { UploadCandidatosDialog } from "@/components/entrevistas/upload-candidatos-dialog";
import { CompartilharLinkDialog } from "@/components/entrevistas/compartilhar-link-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Entrevista {
  id: string;
  titulo: string;
  descricao: string | null;
  cargo: string | null;
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

export default function EntrevistaDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [entrevista, setEntrevista] = useState<Entrevista | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

      // Buscar candidatos
      const resCandidatos = await fetch("/api/candidatos", {
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
            <p className="text-sm sm:text-base text-muted-foreground mt-2 whitespace-pre-line line-clamp-3 sm:line-clamp-none">{entrevista.descricao}</p>
          )}
        </div>
      </div>

      {/* Cards de Resumo - scroll horizontal no mobile */}
      <div className="scroll-x-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          <Card className="min-w-[140px] sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{candidatos.length}</div>
              <p className="text-xs text-muted-foreground">Total cadastrados</p>
            </CardContent>
          </Card>

          <Card className="min-w-[140px] sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perguntas</CardTitle>
              <FileQuestion className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{perguntas.length}</div>
              <p className="text-xs text-muted-foreground">Na entrevista</p>
            </CardContent>
          </Card>

          <Card className="min-w-[140px] sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duração</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {perguntas.length > 0 ? `${perguntas.length * 4}m` : "-"}
              </div>
              <p className="text-xs text-muted-foreground">Tempo estimado</p>
            </CardContent>
          </Card>

          <Card className="min-w-[140px] sm:min-w-0 shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Criada</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Candidatos</CardTitle>
                  <CardDescription>
                    Adicione candidatos manualmente, em lote ou compartilhe o link da
                    entrevista
                  </CardDescription>
                </div>
                <div className="flex gap-2">
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
              {candidatos.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-semibold">Nenhum candidato ainda</p>
                  <p className="text-muted-foreground">
                    Adicione candidatos usando os botões acima
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {candidatos.map((candidato) => (
                    <div
                      key={candidato.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{candidato.nome}</p>
                        <p className="text-sm text-muted-foreground">{candidato.email}</p>
                      </div>
                      {candidato.telefone && (
                        <p className="text-sm text-muted-foreground">
                          {candidato.telefone}
                        </p>
                      )}
                      <Badge variant="outline">Pendente</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perguntas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas da Entrevista</CardTitle>
              <CardDescription>
                Gerencie as perguntas que serão apresentadas aos candidatos
              </CardDescription>
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
              <CardTitle>Informações da Vaga</CardTitle>
              <CardDescription>
                Detalhes e configurações da entrevista
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
