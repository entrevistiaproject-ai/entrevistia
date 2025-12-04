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

const statusConfig: Record<string, { label: string; variant: any; color: string }> = {
  rascunho: { label: "Rascunho", variant: "secondary", color: "bg-gray-500" },
  publicada: { label: "Ativa", variant: "default", color: "bg-green-500" },
  em_andamento: { label: "Em Andamento", variant: "default", color: "bg-blue-500" },
  concluida: { label: "Encerrada", variant: "outline", color: "bg-gray-400" },
  cancelada: { label: "Cancelada", variant: "destructive", color: "bg-red-500" },
};

export default function EntrevistaDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [entrevista, setEntrevista] = useState<Entrevista | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userId = "123e4567-e89b-12d3-a456-426614174000";

      // Buscar entrevista
      const resEntrevista = await fetch(`/api/entrevistas/${params.id}`, {
        headers: { "x-user-id": userId },
      });

      if (resEntrevista.ok) {
        const data = await resEntrevista.json();
        setEntrevista(data);
      }

      // Buscar candidatos
      const resCandidatos = await fetch("/api/candidatos", {
        headers: { "x-user-id": userId },
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

  const statusInfo = statusConfig[entrevista.status] || statusConfig.rascunho;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/entrevistas">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{entrevista.titulo}</h1>
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>
          {entrevista.descricao && (
            <p className="text-muted-foreground mt-2">{entrevista.descricao}</p>
          )}
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidatos.length}</div>
            <p className="text-xs text-muted-foreground">Total cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perguntas</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Na entrevista</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duração</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {entrevista.duracao ? `${entrevista.duracao}m` : "-"}
            </div>
            <p className="text-xs text-muted-foreground">Tempo estimado</p>
          </CardContent>
        </Card>

        <Card>
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

      {/* Tabs */}
      <Tabs defaultValue="candidatos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="candidatos">Candidatos</TabsTrigger>
          <TabsTrigger value="perguntas">Perguntas</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
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
              <div className="text-center py-12">
                <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg font-semibold">Em desenvolvimento</p>
                <p className="text-muted-foreground">
                  Funcionalidade de gerenciamento de perguntas em breve
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Entrevista</CardTitle>
              <CardDescription>
                Ajuste as configurações e parâmetros da entrevista
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
