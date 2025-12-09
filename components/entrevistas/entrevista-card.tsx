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
  ExternalLink,
  MoreVertical,
  Copy,
} from "lucide-react";
import Link from "next/link";
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
    totalRespostas: number;
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

  // Calcula taxa de conclusão
  const taxaConclusao = entrevista.totalCandidatos > 0
    ? Math.round((entrevista.totalRespostas / entrevista.totalCandidatos) * 100)
    : 0;

  const handleCardClick = (e: React.MouseEvent) => {
    // Previne navegação se clicar em botões
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    router.push(`/entrevistas/${entrevista.id}`);
  };

  return (
    <Card
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/50 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Background gradient - estilo cartão de crédito */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Pattern de fundo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>

      <div className="relative p-4 space-y-3">
        {/* Header do card - similar a um cartão de crédito */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            {/* Empresa/Badge superior */}
            <div className="flex items-center gap-2">
              {entrevista.empresa && (
                <span className="text-xs font-medium text-muted-foreground group-hover:text-white/70 transition-colors">
                  {entrevista.empresa}
                </span>
              )}
              <div className={`w-2 h-2 rounded-full ${statusInfo.color} shadow-lg`} />
            </div>

            {/* Título principal */}
            <h3 className="text-lg font-bold tracking-tight group-hover:text-white transition-colors line-clamp-1">
              {entrevista.titulo}
            </h3>

            {/* Cargo - subtítulo */}
            {entrevista.cargo && (
              <p className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors flex items-center gap-1.5">
                <Briefcase className="h-3 w-3" />
                {entrevista.cargo}
              </p>
            )}
          </div>

          {/* Status badge - canto superior direito */}
          <Badge variant={statusInfo.variant} className="shadow-sm">
            {statusInfo.label}
          </Badge>
        </div>

        {/* Indicadores - estilo chip do cartão */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border group-hover:border-white/20 transition-colors">
          {/* Total de candidatos */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-muted-foreground group-hover:text-white/70 transition-colors">
              <Users className="h-3 w-3" />
              <span className="text-xs font-medium">Candidatos</span>
            </div>
            <p className="text-xl font-bold group-hover:text-white transition-colors">
              {entrevista.totalCandidatos}
            </p>
          </div>

          {/* Respostas recebidas */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-muted-foreground group-hover:text-white/70 transition-colors">
              <CheckCircle2 className="h-3 w-3" />
              <span className="text-xs font-medium">Realizaram</span>
            </div>
            <p className="text-xl font-bold group-hover:text-white transition-colors">
              {entrevista.totalRespostas}
            </p>
          </div>

          {/* Total de perguntas */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-muted-foreground group-hover:text-white/70 transition-colors">
              <FileQuestion className="h-3 w-3" />
              <span className="text-xs font-medium">Perguntas</span>
            </div>
            <p className="text-xl font-bold group-hover:text-white transition-colors">
              {entrevista.totalPerguntas}
            </p>
          </div>
        </div>

        {/* Barra de progresso */}
        {entrevista.totalCandidatos > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground group-hover:text-white/70 transition-colors">
                Taxa de conclusão
              </span>
              <span className="font-semibold group-hover:text-white transition-colors">
                {taxaConclusao}%
              </span>
            </div>
            <div className="h-1.5 bg-muted group-hover:bg-white/20 rounded-full overflow-hidden transition-colors">
              <div
                className="h-full bg-blue-600 group-hover:bg-white transition-all duration-500"
                style={{ width: `${taxaConclusao}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer - data e ações */}
        <div className="flex items-center justify-between pt-3 border-t border-border group-hover:border-white/20 transition-colors">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-white/70 transition-colors">
            <Calendar className="h-3 w-3" />
            <span>
              {formatDistanceToNow(new Date(entrevista.createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {entrevista.slug && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1 group-hover:bg-white/10 group-hover:text-white text-xs"
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

      {/* Shine effect no hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine" />
      </div>
    </Card>
  );
}
