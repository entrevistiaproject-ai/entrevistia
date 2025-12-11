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
      className="group relative overflow-hidden hover:shadow-md transition-all duration-300 border hover:border-blue-500/50 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-3 space-y-2">
        {/* Header compacto */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              {entrevista.empresa && (
                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-white/70 transition-colors truncate">
                  {entrevista.empresa}
                </span>
              )}
              <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.color} shrink-0`} />
            </div>
            <h3 className="text-sm font-semibold group-hover:text-white transition-colors line-clamp-1">
              {entrevista.titulo}
            </h3>
            {entrevista.cargo && (
              <p className="text-[11px] text-muted-foreground group-hover:text-white/80 transition-colors flex items-center gap-1 mt-0.5">
                <Briefcase className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">{entrevista.cargo}</span>
              </p>
            )}
          </div>
          <Badge variant={statusInfo.variant} className="text-[10px] px-1.5 py-0 h-5 shrink-0">
            {statusInfo.label}
          </Badge>
        </div>

        {/* Métricas em linha única */}
        <div className="flex items-center gap-3 pt-2 border-t border-border group-hover:border-white/20 transition-colors">
          <div className="flex items-center gap-1" title="Candidatos">
            <Users className="h-3 w-3 text-muted-foreground group-hover:text-white/70" />
            <span className="text-sm font-semibold group-hover:text-white">{entrevista.totalCandidatos}</span>
          </div>
          <div className="flex items-center gap-1" title="Realizaram">
            <CheckCircle2 className="h-3 w-3 text-muted-foreground group-hover:text-white/70" />
            <span className="text-sm font-semibold group-hover:text-white">{entrevista.totalConcluiram}</span>
          </div>
          <div className="flex items-center gap-1" title="Aprovados">
            <UserCheck className="h-3 w-3 text-green-600 group-hover:text-green-300" />
            <span className="text-sm font-semibold text-green-600 group-hover:text-green-300">{entrevista.totalAprovados}</span>
          </div>
          <div className="flex items-center gap-1" title="Score médio">
            <Star className="h-3 w-3 text-amber-500 group-hover:text-amber-300" />
            <span className="text-sm font-semibold text-amber-600 group-hover:text-amber-300">
              {entrevista.mediaScore !== null ? entrevista.mediaScore : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1" title="Perguntas">
            <FileQuestion className="h-3 w-3 text-muted-foreground group-hover:text-white/70" />
            <span className="text-sm font-semibold group-hover:text-white">{entrevista.totalPerguntas}</span>
          </div>
        </div>

        {/* Progresso + Footer combinados */}
        <div className="flex items-center justify-between pt-2 border-t border-border group-hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 flex-1 mr-2">
            <div className="flex-1 h-1 bg-muted group-hover:bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 group-hover:bg-white transition-all duration-500"
                style={{ width: `${taxaConclusao}%` }}
              />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground group-hover:text-white/70 w-8 text-right">
              {taxaConclusao}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground group-hover:text-white/70 flex items-center gap-1">
              <Calendar className="h-2.5 w-2.5" />
              {formatDistanceToNow(new Date(entrevista.createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
            {entrevista.slug && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1.5 gap-0.5 group-hover:bg-white/10 group-hover:text-white text-[10px]"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(`${window.location.origin}/entrevista/${entrevista.slug}`);
                }}
              >
                <Copy className="h-2.5 w-2.5" />
                Link
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine" />
      </div>
    </Card>
  );
}
