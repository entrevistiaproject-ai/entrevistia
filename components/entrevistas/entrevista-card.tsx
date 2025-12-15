"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CheckCircle2,
  FileQuestion,
  Calendar,
  Copy,
  UserCheck,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EntrevistaCardProps {
  entrevista: {
    id: string;
    titulo: string;
    cargo: string | null;
    empresa: string | null;
    status: string;
    createdAt: Date;
    totalCandidatos: number;
    totalConcluiram: number;
    totalAprovados: number;
    mediaScore: number | null;
    totalPerguntas: number;
    slug: string | null;
  };
}

const statusConfig = {
  active: {
    label: "Ativa",
    variant: "default" as const,
    color: "bg-green-500",
  },
  completed: {
    label: "Encerrada",
    variant: "outline" as const,
    color: "bg-gray-400",
  },
  archived: {
    label: "Arquivada",
    variant: "secondary" as const,
    color: "bg-gray-500",
  },
};

export function EntrevistaCard({ entrevista }: EntrevistaCardProps) {
  const router = useRouter();
  const statusInfo = statusConfig[entrevista.status as keyof typeof statusConfig] || statusConfig.active;

  const taxaConclusao = entrevista.totalCandidatos > 0
    ? Math.round((entrevista.totalConcluiram / entrevista.totalCandidatos) * 100)
    : 0;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    router.push(`/entrevistas/${entrevista.id}`);
  };

  return (
    <Card
      className="group relative overflow-hidden hover:shadow-md transition-all duration-200 border hover:border-primary/30 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative p-4">
        {/* Header - Título, Empresa/Cargo e Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground line-clamp-1">
              {entrevista.titulo}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {[entrevista.empresa, entrevista.cargo].filter(Boolean).join(" • ")}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
            <Badge variant={statusInfo.variant} className="text-[10px] px-1.5 py-0 h-5">
              {statusInfo.label}
            </Badge>
          </div>
        </div>

        {/* Métricas em grid de boxes */}
        <div className="grid grid-cols-5 gap-2 mb-3">
          <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-lg">
            <Users className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-base font-bold tabular-nums">{entrevista.totalCandidatos}</span>
            <span className="text-[10px] text-muted-foreground">Candidatos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-base font-bold tabular-nums">{entrevista.totalConcluiram}</span>
            <span className="text-[10px] text-muted-foreground">Concluídos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-success-bg border border-success-border rounded-lg">
            <UserCheck className="h-4 w-4 text-success-icon mb-1" />
            <span className="text-base font-bold tabular-nums text-success-text">{entrevista.totalAprovados}</span>
            <span className="text-[10px] text-success-icon">Aprovados</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-score-bg border border-score-border rounded-lg">
            <Star className="h-4 w-4 text-score-icon mb-1" />
            <span className="text-base font-bold tabular-nums text-warning-text">
              {entrevista.mediaScore !== null ? entrevista.mediaScore : "-"}
            </span>
            <span className="text-[10px] text-score-icon">Score</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-muted/50 rounded-lg">
            <FileQuestion className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-base font-bold tabular-nums">{entrevista.totalPerguntas}</span>
            <span className="text-[10px] text-muted-foreground">Perguntas</span>
          </div>
        </div>

        {/* Footer - Progresso, Data e Link */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 flex-1">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${taxaConclusao}%` }}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums text-blue-600 min-w-9">{taxaConclusao}%</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDistanceToNow(new Date(entrevista.createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
            {entrevista.slug && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 gap-1 text-[10px] hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(`${window.location.origin}/entrevista/${entrevista.slug}`);
                }}
              >
                <Copy className="h-3 w-3" />
                Link
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
