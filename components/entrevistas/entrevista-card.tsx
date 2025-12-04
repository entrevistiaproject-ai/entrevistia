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
  rascunho: {
    label: "Rascunho",
    variant: "secondary" as const,
    color: "bg-gray-500",
  },
  publicada: {
    label: "Ativa",
    variant: "default" as const,
    color: "bg-green-500",
  },
  em_andamento: {
    label: "Em Andamento",
    variant: "default" as const,
    color: "bg-blue-500",
  },
  concluida: {
    label: "Encerrada",
    variant: "outline" as const,
    color: "bg-gray-400",
  },
  cancelada: {
    label: "Cancelada",
    variant: "destructive" as const,
    color: "bg-red-500",
  },
};

export function EntrevistaCard({ entrevista }: EntrevistaCardProps) {
  const statusInfo = statusConfig[entrevista.status as keyof typeof statusConfig] || statusConfig.rascunho;

  // Calcula taxa de conclusão
  const taxaConclusao = entrevista.totalCandidatos > 0
    ? Math.round((entrevista.totalRespostas / entrevista.totalCandidatos) * 100)
    : 0;

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/50">
      {/* Background gradient - estilo cartão de crédito */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Pattern de fundo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>

      <div className="relative p-6 space-y-4">
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

            {/* Título principal - grande como número do cartão */}
            <h3 className="text-xl font-bold tracking-tight group-hover:text-white transition-colors line-clamp-2">
              {entrevista.titulo}
            </h3>

            {/* Cargo - subtítulo */}
            {entrevista.cargo && (
              <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5" />
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
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border group-hover:border-white/20 transition-colors">
          {/* Total de candidatos */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-white/70 transition-colors">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Candidatos</span>
            </div>
            <p className="text-2xl font-bold group-hover:text-white transition-colors">
              {entrevista.totalCandidatos}
            </p>
          </div>

          {/* Respostas recebidas */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-white/70 transition-colors">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Realizaram</span>
            </div>
            <p className="text-2xl font-bold group-hover:text-white transition-colors">
              {entrevista.totalRespostas}
            </p>
          </div>

          {/* Total de perguntas */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-white/70 transition-colors">
              <FileQuestion className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Perguntas</span>
            </div>
            <p className="text-2xl font-bold group-hover:text-white transition-colors">
              {entrevista.totalPerguntas}
            </p>
          </div>
        </div>

        {/* Barra de progresso */}
        {entrevista.totalCandidatos > 0 && (
          <div className="space-y-1.5">
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
        <div className="flex items-center justify-between pt-4 border-t border-border group-hover:border-white/20 transition-colors">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-white/70 transition-colors">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              Criada {formatDistanceToNow(new Date(entrevista.createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {entrevista.slug && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 group-hover:bg-white/10 group-hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/entrevista/${entrevista.slug}`);
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                Copiar link
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 group-hover:bg-white/10 group-hover:text-white"
              asChild
            >
              <Link href={`/entrevistas/${entrevista.id}`}>
                <ExternalLink className="h-3.5 w-3.5" />
                Abrir
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Shine effect no hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine" />
      </div>
    </Card>
  );
}
