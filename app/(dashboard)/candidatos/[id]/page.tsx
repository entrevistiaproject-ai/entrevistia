"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  Loader2,
  ClipboardList,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

interface CandidatoEntrevista {
  entrevistaId: string;
  entrevistaTitulo: string;
  entrevistaCargo: string | null;
  status: string;
  notaGeral: number | null;
  recomendacao: string | null;
  concluidaEm: Date | null;
}

interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  linkedin: string | null;
  createdAt: Date;
  entrevistas: CandidatoEntrevista[];
}

export default function CandidatoPage() {
  const params = useParams();
  const router = useRouter();
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [loading, setLoading] = useState(true);

  const candidatoId = params.id as string;

  useEffect(() => {
    async function fetchCandidato() {
      try {
        setLoading(true);
        const response = await fetch(`/api/candidatos/${candidatoId}/entrevistas`);
        if (response.ok) {
          const data = await response.json();
          setCandidato(data);
        }
      } catch (error) {
        console.error("Erro ao buscar candidato:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidato();
  }, [candidatoId]);

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "concluida":
        return {
          label: "Concluída",
          variant: "default" as const,
          icon: CheckCircle2,
          iconColor: "text-green-600",
        };
      case "em_andamento":
        return {
          label: "Em andamento",
          variant: "outline" as const,
          icon: Clock,
          iconColor: "text-yellow-600",
        };
      case "pendente":
        return {
          label: "Pendente",
          variant: "secondary" as const,
          icon: AlertCircle,
          iconColor: "text-muted-foreground",
        };
      default:
        return {
          label: status,
          variant: "secondary" as const,
          icon: AlertCircle,
          iconColor: "text-muted-foreground",
        };
    }
  };

  const getRecomendacaoConfig = (recomendacao: string | null) => {
    switch (recomendacao) {
      case "recomendado":
        return { label: "Recomendado", color: "text-green-600 bg-green-50" };
      case "nao_recomendado":
        return { label: "Não Recomendado", color: "text-red-600 bg-red-50" };
      case "recomendado_com_ressalvas":
        return { label: "Com Ressalvas", color: "text-yellow-600 bg-yellow-50" };
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!candidato) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Candidato não encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials(candidato.nome)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{candidato.nome}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>{candidato.email}</span>
              </div>
              {candidato.telefone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  <span>{candidato.telefone}</span>
                </div>
              )}
              {candidato.linkedin && (
                <a
                  href={candidato.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Entrevistas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{candidato.entrevistas?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Entrevistas Concluídas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {candidato.entrevistas?.filter((e) => e.status === "concluida").length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Melhor Nota</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const notas = candidato.entrevistas
                ?.filter((e) => e.notaGeral !== null)
                .map((e) => e.notaGeral as number);
              const melhorNota = notas && notas.length > 0 ? Math.max(...notas) : null;
              return melhorNota !== null ? (
                <div className={`text-3xl font-bold ${getScoreColor(melhorNota)}`}>
                  {melhorNota.toFixed(1)}
                </div>
              ) : (
                <div className="text-3xl font-bold text-muted-foreground">-</div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Lista de Entrevistas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Entrevistas
          </CardTitle>
          <CardDescription>
            Histórico de entrevistas do candidato
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!candidato.entrevistas || candidato.entrevistas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma entrevista registrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {candidato.entrevistas.map((entrevista) => {
                const statusConfig = getStatusConfig(entrevista.status);
                const StatusIcon = statusConfig.icon;
                const recomendacaoConfig = getRecomendacaoConfig(entrevista.recomendacao);

                return (
                  <div
                    key={entrevista.entrevistaId}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/candidatos/${candidatoId}/resultado?entrevistaId=${entrevista.entrevistaId}`)}
                  >
                    <div className="flex items-start gap-3">
                      <StatusIcon className={`h-5 w-5 mt-0.5 ${statusConfig.iconColor}`} />
                      <div className="space-y-1">
                        <h3 className="font-medium">{entrevista.entrevistaTitulo}</h3>
                        {entrevista.entrevistaCargo && (
                          <p className="text-sm text-muted-foreground">{entrevista.entrevistaCargo}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                          {recomendacaoConfig && (
                            <Badge variant="outline" className={recomendacaoConfig.color}>
                              {recomendacaoConfig.label}
                            </Badge>
                          )}
                          {entrevista.concluidaEm && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(entrevista.concluidaEm).toLocaleDateString("pt-BR")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {entrevista.notaGeral !== null && (
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Score</div>
                          <div className={`text-2xl font-bold ${getScoreColor(entrevista.notaGeral)}`}>
                            {Math.round(entrevista.notaGeral)}
                          </div>
                          <Progress value={entrevista.notaGeral} className="h-1.5 w-16 mt-1" />
                        </div>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
