"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
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
      className="group relative overflow-hidden hover:shadow-md transition-all duration-200 border hover:border-primary/30 cursor-pointer aspect-[1.586/1]"
      onClick={handleCardClick}
    >
      <div className="relative p-4 h-full flex flex-col">
        {/* Header - Título e Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground line-clamp-1 mb-1">
              {entrevista.titulo}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {entrevista.empresa && (
                <span className="truncate max-w-[120px]">{entrevista.empresa}</span>
              )}
              {entrevista.empresa && entrevista.cargo && (
                <span className="text-muted-foreground/50">•</span>
              )}
              {entrevista.cargo && (
                <span className="truncate max-w-[120px] flex items-center gap-1">
                  <Briefcase className="h-3 w-3 shrink-0" />
                  {entrevista.cargo}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
            <Badge variant={statusInfo.variant} className="text-[10px] px-1.5 py-0 h-5">
              {statusInfo.label}
            </Badge>
          </div>
        </div>

        {/* Métricas em grid 2x3 com labels explícitos */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-2 flex-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Candidatos</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold tabular-nums">{entrevista.totalCandidatos}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Realizaram</span>
            <div className="flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold tabular-nums">{entrevista.totalConcluiram}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Aprovados</span>
            <div className="flex items-center gap-1 mt-0.5">
              <UserCheck className="h-3.5 w-3.5 text-green-600" />
              <span className="text-sm font-semibold tabular-nums text-green-600">{entrevista.totalAprovados}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Score</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-sm font-semibold tabular-nums text-amber-600">
                {entrevista.mediaScore !== null ? entrevista.mediaScore : "-"}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Perguntas</span>
            <div className="flex items-center gap-1 mt-0.5">
              <FileQuestion className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold tabular-nums">{entrevista.totalPerguntas}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Conclusão</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-sm font-semibold tabular-nums text-blue-600">{taxaConclusao}%</span>
            </div>
          </div>
        </div>

        {/* Footer - Barra de progresso e ações */}
        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex items-center justify-between gap-3">
            {/* Barra de progresso */}
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${taxaConclusao}%` }}
                />
              </div>
            </div>

            {/* Data e Link */}
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
      </div>
    </Card>
  );
}
