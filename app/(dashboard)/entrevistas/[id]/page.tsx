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
  Star,
  Zap,
  XCircle,
  Info,
  Mail,
  RefreshCw,
  TimerReset,
  MoreVertical,
  Timer,
  Ban,
} from "lucide-react";
import Link from "next/link";
import { AdicionarCandidatoDialog } from "@/components/entrevistas/adicionar-candidato-dialog";
import { UploadCandidatosDialog } from "@/components/entrevistas/upload-candidatos-dialog";
import { CompartilharLinkDialog } from "@/components/entrevistas/compartilhar-link-dialog";
import { DecisaoCandidato } from "@/components/entrevistas/decisao-candidato";
import { EditarEntrevistaDialog } from "@/components/entrevistas/editar-entrevista-dialog";
import { EditarPerguntasDialog } from "@/components/entrevistas/editar-perguntas-dialog";
import { AutoDecisionConfig } from "@/components/entrevistas/auto-decision-config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
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
  // Prazo para candidatos responderem
  prazoRespostaHoras: number;
  // Configurações de aprovação automática
  autoApprovalEnabled: boolean;
  autoApprovalMinScore: number;
  autoApprovalUseCompatibility: boolean;
  autoApprovalMinCompatibility: number;
  autoApprovalNotifyCandidate: boolean;
  autoApprovalCandidateMessage: string | null;
  // Configurações de reprovação automática
  autoRejectEnabled: boolean;
  autoRejectMaxScore: number;
  autoRejectNotifyCandidate: boolean;
  autoRejectCandidateMessage: string | null;
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
  // Prazo de resposta
  prazoResposta: Date | null;
  conviteEnviadoEm: Date | null;
  // ID da sessão para ações
  candidatoEntrevistaId: string;
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
  cancelada: { label: "Desistiu", variant: "destructive" },
  expirada: { label: "Expirada", variant: "destructive" },
};


const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

export default function EntrevistaDetalhesPage() {
  const params = useParams();
  const { toast } = useToast();
  const [entrevista, setEntrevista] = useState<Entrevista | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [descricaoAberta, setDescricaoAberta] = useState(false);
  const [filtroDecisao, setFiltroDecisao] = useState<string>("todos");

  // Estado para prazo de resposta
  const [prazoRespostaHoras, setPrazoRespostaHoras] = useState(48);
  const [savingPrazo, setSavingPrazo] = useState(false);

  // Estados para aprovação automática
  const [savingAutoApproval, setSavingAutoApproval] = useState(false);
  const [autoApprovalEnabled, setAutoApprovalEnabled] = useState(false);
  const [autoApprovalMinScore, setAutoApprovalMinScore] = useState(70);
  const [autoApprovalUseCompatibility, setAutoApprovalUseCompatibility] = useState(false);
  const [autoApprovalMinCompatibility, setAutoApprovalMinCompatibility] = useState(70);
  const [autoApprovalNotifyCandidate, setAutoApprovalNotifyCandidate] = useState(false);
  const [autoApprovalCandidateMessage, setAutoApprovalCandidateMessage] = useState("");

  // Estados para reprovação automática
  const [autoRejectEnabled, setAutoRejectEnabled] = useState(false);
  const [autoRejectMaxScore, setAutoRejectMaxScore] = useState(30);
  const [autoRejectNotifyCandidate, setAutoRejectNotifyCandidate] = useState(false);
  const [autoRejectCandidateMessage, setAutoRejectCandidateMessage] = useState("");

  // Estados para dialogs de ações de candidato
  const [prorrogarDialog, setProrrogarDialog] = useState<{ open: boolean; candidato: Candidato | null }>({ open: false, candidato: null });
  const [reenviarDialog, setReenviarDialog] = useState<{ open: boolean; candidato: Candidato | null }>({ open: false, candidato: null });
  const [horasAdicionais, setHorasAdicionais] = useState(24);
  const [prazoReenvio, setPrazoReenvio] = useState(48);
  const [candidatoActionLoading, setCandidatoActionLoading] = useState<string | null>(null);

  // Função para calcular tempo restante
  const calcularTempoRestante = (prazoResposta: Date | null) => {
    if (!prazoResposta) return null;
    const prazo = new Date(prazoResposta);
    const agora = new Date();
    const diff = prazo.getTime() - agora.getTime();

    if (diff <= 0) return { texto: "Expirado", expirado: true };

    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (horas >= 24) {
      const dias = Math.floor(horas / 24);
      return { texto: `${dias}d ${horas % 24}h`, expirado: false };
    }

    if (horas > 0) {
      return { texto: `${horas}h ${minutos}min`, expirado: false };
    }

    return { texto: `${minutos}min`, expirado: false, urgente: true };
  };

  // Handler para prorrogar prazo
  const handleProrrogarPrazo = async () => {
    if (!prorrogarDialog.candidato) return;

    setCandidatoActionLoading(prorrogarDialog.candidato.candidatoEntrevistaId);
    try {
      const res = await fetch(`/api/candidato-entrevistas/${prorrogarDialog.candidato.candidatoEntrevistaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horasAdicionais }),
      });

      if (res.ok) {
        toast({
          title: "Prazo prorrogado",
          description: `Prazo estendido em ${horasAdicionais} horas`,
        });
        setProrrogarDialog({ open: false, candidato: null });
        await fetchData();
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao prorrogar prazo",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao prorrogar prazo",
        variant: "destructive",
      });
    } finally {
      setCandidatoActionLoading(null);
    }
  };

  // Handler para reenviar entrevista
  const handleReenviarEntrevista = async () => {
    if (!reenviarDialog.candidato) return;

    setCandidatoActionLoading(reenviarDialog.candidato.candidatoEntrevistaId);
    try {
      const res = await fetch(`/api/candidato-entrevistas/${reenviarDialog.candidato.candidatoEntrevistaId}/reenviar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prazoHoras: prazoReenvio, enviarEmailConvite: true }),
      });

      if (res.ok) {
        toast({
          title: "Entrevista reenviada",
          description: `O candidato receberá um novo convite por email`,
        });
        setReenviarDialog({ open: false, candidato: null });
        await fetchData();
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao reenviar entrevista",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reenviar entrevista",
        variant: "destructive",
      });
    } finally {
      setCandidatoActionLoading(null);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);


      // Buscar entrevista
      const resEntrevista = await fetch(`/api/entrevistas/${params.id}`, {
        });

      if (resEntrevista.ok) {
        const data = await resEntrevista.json();
        setEntrevista(data);
        // Preencher prazo de resposta
        setPrazoRespostaHoras(data.prazoRespostaHoras || 48);
        // Preencher estados de aprovação automática
        setAutoApprovalEnabled(data.autoApprovalEnabled || false);
        setAutoApprovalMinScore(data.autoApprovalMinScore || 70);
        setAutoApprovalUseCompatibility(data.autoApprovalUseCompatibility || false);
        setAutoApprovalMinCompatibility(data.autoApprovalMinCompatibility || 70);
        setAutoApprovalNotifyCandidate(data.autoApprovalNotifyCandidate || false);
        setAutoApprovalCandidateMessage(data.autoApprovalCandidateMessage || "");
        setAutoRejectEnabled(data.autoRejectEnabled || false);
        setAutoRejectMaxScore(data.autoRejectMaxScore || 30);
        setAutoRejectNotifyCandidate(data.autoRejectNotifyCandidate || false);
        setAutoRejectCandidateMessage(data.autoRejectCandidateMessage || "");
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

  // Handler para salvar configurações de aprovação automática
  const handleSavePrazoResposta = async () => {
    if (!entrevista) return;

    setSavingPrazo(true);
    try {
      const res = await fetch(`/api/entrevistas/${entrevista.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configuracoes: {
            ...((entrevista as any).configuracoes || {}),
            prazoRespostaHoras,
          },
        }),
      });

      if (res.ok) {
        toast({
          title: "Prazo atualizado",
          description: `Candidatos terão ${prazoRespostaHoras} horas para responder`,
        });
        await fetchData();
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao salvar prazo",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar prazo",
        variant: "destructive",
      });
    } finally {
      setSavingPrazo(false);
    }
  };

  const handleSaveAutoApproval = async () => {
    if (!entrevista) return;

    // Validação
    if (autoApprovalEnabled && autoRejectEnabled) {
      if (autoApprovalMinScore <= autoRejectMaxScore) {
        toast({
          title: "Erro de configuração",
          description: "O score mínimo de aprovação deve ser maior que o score máximo de reprovação",
          variant: "destructive",
        });
        return;
      }
    }

    setSavingAutoApproval(true);
    try {
      const res = await fetch(`/api/entrevistas/${entrevista.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autoApprovalEnabled,
          autoApprovalMinScore,
          autoApprovalUseCompatibility,
          autoApprovalMinCompatibility,
          autoApprovalNotifyCandidate,
          autoApprovalCandidateMessage: autoApprovalCandidateMessage || null,
          autoRejectEnabled,
          autoRejectMaxScore,
          autoRejectNotifyCandidate,
          autoRejectCandidateMessage: autoRejectCandidateMessage || null,
        }),
      });

      if (res.ok) {
        toast({
          title: "Configurações salvas",
          description: "As configurações de aprovação automática foram atualizadas",
        });
        await fetchData();
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao salvar configurações",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações",
        variant: "destructive",
      });
    } finally {
      setSavingAutoApproval(false);
    }
  };

  // Handler para input de score com validação
  const handleScoreChange = (
    value: string,
    setter: (v: number) => void,
    min: number,
    max: number
  ) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    if (num < min) setter(min);
    else if (num > max) setter(max);
    else setter(num);
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
              className="flex items-center gap-2 mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
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

      {/* Cards de Resumo - grid responsivo */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
        <Card>
          <CardContent className="pt-5 pb-4 px-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-info-bg rounded-md shrink-0">
                <Users className="h-4 w-4 text-info-icon" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Candidatos</span>
            </div>
            <div className="text-2xl font-bold">{candidatos.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4 px-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-purple-bg rounded-md shrink-0">
                <FileQuestion className="h-4 w-4 text-purple-icon" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Perguntas</span>
            </div>
            <div className="text-2xl font-bold">{perguntas.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Na entrevista</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4 px-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-success-bg rounded-md shrink-0">
                <Clock className="h-4 w-4 text-success-icon" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Duração Média</span>
            </div>
            {(() => {
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

              return duracaoMedia !== null ? (
                <>
                  <div className="text-2xl font-bold">{duracaoMedia}m</div>
                  <p className="text-xs text-muted-foreground mt-1">Média realizada</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-muted-foreground">-</div>
                  <p className="text-xs text-muted-foreground mt-1">Sem dados ainda</p>
                </>
              );
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4 px-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-warning-bg rounded-md shrink-0">
                <Clock className="h-4 w-4 text-warning-icon" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Tempo Máx.</span>
            </div>
            {(() => {
              const tempoMaximoCalculado = perguntas.length > 0
                ? Math.ceil(perguntas.length * 3.75)
                : null;
              const tempoMaximoDefinido = entrevista.duracao;

              return tempoMaximoDefinido ? (
                <>
                  <div className="text-2xl font-bold">{tempoMaximoDefinido}m</div>
                  <p className="text-xs text-muted-foreground mt-1">Definido</p>
                </>
              ) : tempoMaximoCalculado ? (
                <>
                  <div className="text-2xl font-bold">{tempoMaximoCalculado}m</div>
                  <p className="text-xs text-muted-foreground mt-1">Calculado</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-muted-foreground">-</div>
                  <p className="text-xs text-muted-foreground mt-1">Não definido</p>
                </>
              );
            })()}
          </CardContent>
        </Card>

        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="pt-5 pb-4 px-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-1.5 bg-slate-bg rounded-md shrink-0">
                <Calendar className="h-4 w-4 text-slate-icon" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Criada</span>
            </div>
            <div className="text-lg font-bold">
              {formatDistanceToNow(new Date(entrevista.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(entrevista.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </CardContent>
        </Card>
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
                <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-auto sm:flex-wrap">
                  <Select value={filtroDecisao} onValueChange={setFiltroDecisao}>
                    <SelectTrigger className="w-full sm:w-40">
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
                    className="w-full sm:w-auto"
                  />
                  <UploadCandidatosDialog
                    entrevistaId={entrevista.id}
                    onSuccess={fetchData}
                    className="w-full sm:w-auto"
                  />
                  <AdicionarCandidatoDialog
                    entrevistaId={entrevista.id}
                    onSuccess={fetchData}
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                // Separar candidatos ativos de expirados/cancelados
                const candidatosAtivos = candidatos.filter((c) => !["expirada", "cancelada"].includes(c.status));
                const candidatosInativos = candidatos.filter((c) => ["expirada", "cancelada"].includes(c.status));

                // Aplicar filtro de decisão nos candidatos ativos
                const candidatosFiltrados = candidatosAtivos.filter((c) => {
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

                // Componente de card do candidato
                const CandidatoCard = ({ candidato, mostrarAcoes = true }: { candidato: Candidato; mostrarAcoes?: boolean }) => {
                  const tempoRestante = (candidato.status === "pendente" || candidato.status === "em_andamento")
                    ? calcularTempoRestante(candidato.prazoResposta)
                    : null;

                  return (
                    <div
                      key={candidato.id}
                      className="p-4 border rounded-xl hover:bg-muted/30 hover:border-primary/20 transition-all group"
                    >
                      {/* Layout Desktop */}
                      <div className="flex items-center gap-4">
                        {/* Info do candidato - clicável */}
                        <Link
                          href={`/candidatos/${candidato.id}/resultado`}
                          className="flex-1 min-w-0 hover:text-primary transition-colors"
                        >
                          <p className="font-semibold text-foreground truncate">
                            {candidato.nome}
                          </p>
                          <p className="text-sm text-muted-foreground truncate mt-0.5">
                            {candidato.email}
                          </p>
                        </Link>

                        {/* Tempo restante */}
                        {tempoRestante && (
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 ${
                            tempoRestante.expirado
                              ? "bg-error-bg text-error-text"
                              : tempoRestante.urgente
                                ? "bg-warning-bg text-warning-text"
                                : "bg-info-bg text-info-text"
                          }`}>
                            <Timer className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">{tempoRestante.texto}</span>
                          </div>
                        )}

                        {/* Score */}
                        {candidato.notaGeral !== null && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-score-bg border border-score-border rounded-lg shrink-0">
                            <Star className="h-4 w-4 text-score-icon fill-score-icon" />
                            <span className={`text-sm font-bold ${getScoreColor(candidato.notaGeral)}`}>
                              {Math.round(candidato.notaGeral)}
                            </span>
                          </div>
                        )}

                        {/* Decisão */}
                        {candidato.status === "concluida" && (
                          <div onClick={(e) => e.stopPropagation()} className="shrink-0">
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
                          </div>
                        )}

                        {/* Status Badge */}
                        <Badge variant={candidatoStatusConfig[candidato.status]?.variant || "outline"} className="shrink-0">
                          {candidatoStatusConfig[candidato.status]?.label || "Pendente"}
                        </Badge>

                        {/* Menu de ações */}
                        {mostrarAcoes && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/candidatos/${candidato.id}/resultado`}>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Ver detalhes
                                </Link>
                              </DropdownMenuItem>
                              {(candidato.status === "pendente" || candidato.status === "em_andamento") && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setHorasAdicionais(24);
                                    setProrrogarDialog({ open: true, candidato });
                                  }}
                                >
                                  <TimerReset className="h-4 w-4 mr-2" />
                                  Prorrogar prazo
                                </DropdownMenuItem>
                              )}
                              {(candidato.status === "expirada" || candidato.status === "cancelada") && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setPrazoReenvio(48);
                                    setReenviarDialog({ open: true, candidato });
                                  }}
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Reenviar entrevista
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  );
                };

                return (
                  <div className="space-y-6">
                    {/* Lista de candidatos ativos */}
                    {candidatosFiltrados.length === 0 && candidatosAtivos.length > 0 ? (
                      <div className="text-center py-8">
                        <Users className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="font-medium">Nenhum candidato encontrado</p>
                        <p className="text-sm text-muted-foreground">
                          Nenhum candidato ativo corresponde ao filtro selecionado
                        </p>
                      </div>
                    ) : candidatosFiltrados.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="font-medium">Nenhum candidato ativo</p>
                        <p className="text-sm text-muted-foreground">
                          Adicione candidatos usando os botões acima
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {candidatosFiltrados.map((candidato) => (
                          <CandidatoCard key={candidato.id} candidato={candidato} />
                        ))}
                      </div>
                    )}

                    {/* Seção de expiradas/desistências */}
                    {candidatosInativos.length > 0 && (
                      <div className="mt-8 pt-6 border-t">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50">
                            <Ban className="h-4 w-4 text-red-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Expiradas e Desistências</h4>
                            <p className="text-sm text-muted-foreground">
                              {candidatosInativos.length} candidato{candidatosInativos.length !== 1 ? "s" : ""} - você pode reenviar a entrevista para dar uma nova chance
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {candidatosInativos.map((candidato) => (
                            <CandidatoCard key={candidato.id} candidato={candidato} />
                          ))}
                        </div>
                      </div>
                    )}
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

          {/* Card de Prazo de Resposta */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning-bg">
                  <Clock className="h-5 w-5 text-warning-icon" />
                </div>
                <div>
                  <CardTitle>Prazo de Resposta</CardTitle>
                  <CardDescription>
                    Defina quanto tempo os candidatos têm para completar a entrevista
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 p-4 bg-warning-bg border border-warning-border rounded-lg">
                <Info className="h-5 w-5 text-warning-icon shrink-0 mt-0.5" />
                <div className="text-sm text-warning-text">
                  <p>
                    O prazo começa a contar quando o candidato se cadastra na entrevista.
                    Após o prazo, a candidatura é marcada como expirada.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prazo-resposta">Prazo para responder</Label>
                <Select
                  value={prazoRespostaHoras.toString()}
                  onValueChange={(value) => setPrazoRespostaHoras(parseInt(value))}
                >
                  <SelectTrigger id="prazo-resposta" className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 horas (1 dia)</SelectItem>
                    <SelectItem value="48">48 horas (2 dias)</SelectItem>
                    <SelectItem value="72">72 horas (3 dias)</SelectItem>
                    <SelectItem value="168">7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePrazoResposta} disabled={savingPrazo}>
                  {savingPrazo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Prazo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card de Aprovação Automática */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info-bg">
                  <Zap className="h-5 w-5 text-info-icon" />
                </div>
                <div>
                  <CardTitle>Aprovação Automática</CardTitle>
                  <CardDescription>
                    Configure a aprovação e reprovação automática de candidatos para esta vaga
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Explicação */}
              <div className="flex gap-3 p-4 bg-info-bg border border-info-border rounded-lg">
                <Info className="h-5 w-5 text-info-icon shrink-0 mt-0.5" />
                <div className="text-sm text-info-text">
                  <p className="font-medium mb-1">Como funciona?</p>
                  <p>
                    Após a análise da IA, o sistema pode automaticamente aprovar ou reprovar candidatos com base no score obtido. Isso agiliza o processo de triagem.
                  </p>
                </div>
              </div>

              {/* Aprovação Automática */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success-bg">
                      <CheckCircle className="h-5 w-5 text-success-icon" />
                    </div>
                    <div>
                      <p className="font-medium">Aprovação Automática</p>
                      <p className="text-sm text-muted-foreground">
                        Aprove automaticamente candidatos com score alto
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={autoApprovalEnabled}
                    onCheckedChange={setAutoApprovalEnabled}
                  />
                </div>

                {autoApprovalEnabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-success-border ml-4">
                    {/* Score mínimo */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Score Mínimo para Aprovação</Label>
                        <p className="text-sm text-muted-foreground">
                          Candidatos com score igual ou acima serão aprovados (50-100%)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={autoApprovalMinScore}
                          onChange={(e) =>
                            handleScoreChange(e.target.value, setAutoApprovalMinScore, 50, 100)
                          }
                          min={50}
                          max={100}
                          className="w-20 text-right"
                        />
                        <span className="text-lg font-semibold text-success-icon">%</span>
                      </div>
                    </div>

                    {/* Usar compatibilidade */}
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="space-y-0.5">
                        <Label>Considerar Compatibilidade com a Vaga</Label>
                        <p className="text-sm text-muted-foreground">
                          Além do score, também verificar a compatibilidade
                        </p>
                      </div>
                      <Switch
                        checked={autoApprovalUseCompatibility}
                        onCheckedChange={setAutoApprovalUseCompatibility}
                      />
                    </div>

                    {/* Compatibilidade mínima */}
                    {autoApprovalUseCompatibility && (
                      <div className="flex items-center justify-between pl-4 border-l-2 border-success-bg">
                        <div className="space-y-0.5">
                          <Label>Compatibilidade Mínima</Label>
                          <p className="text-sm text-muted-foreground">
                            Compatibilidade mínima com a vaga (50-100%)
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={autoApprovalMinCompatibility}
                            onChange={(e) =>
                              handleScoreChange(e.target.value, setAutoApprovalMinCompatibility, 50, 100)
                            }
                            min={50}
                            max={100}
                            className="w-20 text-right"
                          />
                          <span className="text-lg font-semibold text-success-icon">%</span>
                        </div>
                      </div>
                    )}

                    {/* Notificar candidato */}
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                          <Label>Notificar Candidato</Label>
                          <p className="text-sm text-muted-foreground">
                            Enviar email ao candidato informando a aprovação
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={autoApprovalNotifyCandidate}
                        onCheckedChange={setAutoApprovalNotifyCandidate}
                      />
                    </div>

                    {autoApprovalNotifyCandidate && (
                      <div className="space-y-2">
                        <Label>Mensagem Personalizada (opcional)</Label>
                        <Textarea
                          value={autoApprovalCandidateMessage}
                          onChange={(e) => setAutoApprovalCandidateMessage(e.target.value)}
                          placeholder="Deixe em branco para usar a mensagem padrão..."
                          rows={2}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Separator />

              {/* Reprovação Automática */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-error-bg">
                      <XCircle className="h-5 w-5 text-error-icon" />
                    </div>
                    <div>
                      <p className="font-medium">Reprovação Automática</p>
                      <p className="text-sm text-muted-foreground">
                        Reprove automaticamente candidatos com score muito baixo
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={autoRejectEnabled}
                    onCheckedChange={setAutoRejectEnabled}
                  />
                </div>

                {autoRejectEnabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-error-border ml-4">
                    {/* Score máximo */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Score Máximo para Reprovação</Label>
                        <p className="text-sm text-muted-foreground">
                          Candidatos com score igual ou abaixo serão reprovados (0-50%)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={autoRejectMaxScore}
                          onChange={(e) =>
                            handleScoreChange(e.target.value, setAutoRejectMaxScore, 0, 50)
                          }
                          min={0}
                          max={50}
                          className="w-20 text-right"
                        />
                        <span className="text-lg font-semibold text-error-icon">%</span>
                      </div>
                    </div>

                    {/* Notificar candidato */}
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-0.5">
                          <Label>Notificar Candidato</Label>
                          <p className="text-sm text-muted-foreground">
                            Enviar email ao candidato informando a reprovação
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={autoRejectNotifyCandidate}
                        onCheckedChange={setAutoRejectNotifyCandidate}
                      />
                    </div>

                    {autoRejectNotifyCandidate && (
                      <div className="space-y-2">
                        <Label>Mensagem Personalizada (opcional)</Label>
                        <Textarea
                          value={autoRejectCandidateMessage}
                          onChange={(e) => setAutoRejectCandidateMessage(e.target.value)}
                          placeholder="Deixe em branco para usar a mensagem padrão..."
                          rows={2}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Aviso de conflito */}
              {autoApprovalEnabled && autoRejectEnabled && autoApprovalMinScore <= autoRejectMaxScore && (
                <div className="flex gap-3 p-4 bg-warning-bg border border-warning-border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning-icon shrink-0 mt-0.5" />
                  <div className="text-sm text-warning-text">
                    <p className="font-medium mb-1">Atenção!</p>
                    <p>
                      O score mínimo de aprovação ({autoApprovalMinScore}%) deve ser maior que o score máximo de reprovação ({autoRejectMaxScore}%). Ajuste os valores para evitar conflitos.
                    </p>
                  </div>
                </div>
              )}

              {/* Botão Salvar */}
              <div className="flex justify-end">
                <Button onClick={handleSaveAutoApproval} disabled={savingAutoApproval}>
                  {savingAutoApproval && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Configurações
                </Button>
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-warning-bg rounded-lg shrink-0">
                      <CheckCircle className="h-5 w-5 text-warning-icon" />
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
                    className="w-full sm:w-auto shrink-0"
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-bg rounded-lg shrink-0">
                      <Archive className="h-5 w-5 text-slate-icon" />
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
                    className="w-full sm:w-auto shrink-0"
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 border rounded-lg border-success-border bg-success-bg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-success-bg-hover rounded-lg shrink-0">
                      <Play className="h-5 w-5 text-success-icon" />
                    </div>
                    <div>
                      <p className="font-medium">Reativar Vaga</p>
                      <p className="text-sm text-muted-foreground">
                        Reativa a vaga para convidar novos candidatos via email ou link.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    onClick={handleReativar}
                    disabled={actionLoading !== null}
                    className="w-full sm:w-auto shrink-0"
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
                <div className="flex items-start gap-3 p-4 bg-warning-bg border border-warning-border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning-icon shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-warning-text">Vaga arquivada</p>
                    <p className="text-sm text-warning-text">
                      Esta vaga está arquivada e não está visível na listagem principal.
                      Você pode reativá-la a qualquer momento.
                    </p>
                  </div>
                </div>
              )}

              {entrevista.status === "completed" && (
                <div className="flex items-start gap-3 p-4 bg-slate-bg border border-slate-border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-slate-icon shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Processo encerrado</p>
                    <p className="text-sm text-muted-foreground">
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

      {/* Dialog: Prorrogar Prazo */}
      <Dialog open={prorrogarDialog.open} onOpenChange={(open) => !open && setProrrogarDialog({ open: false, candidato: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prorrogar Prazo</DialogTitle>
            <DialogDescription>
              Estenda o prazo de resposta para {prorrogarDialog.candidato?.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Adicionar horas ao prazo</Label>
              <Select value={horasAdicionais.toString()} onValueChange={(v) => setHorasAdicionais(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 horas</SelectItem>
                  <SelectItem value="24">24 horas (1 dia)</SelectItem>
                  <SelectItem value="48">48 horas (2 dias)</SelectItem>
                  <SelectItem value="72">72 horas (3 dias)</SelectItem>
                  <SelectItem value="168">168 horas (1 semana)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {prorrogarDialog.candidato?.prazoResposta && (
              <div className="text-sm text-muted-foreground">
                <p>Prazo atual: {new Date(prorrogarDialog.candidato.prazoResposta).toLocaleString("pt-BR")}</p>
                <p className="mt-1">
                  Novo prazo: {new Date(
                    Math.max(
                      new Date(prorrogarDialog.candidato.prazoResposta).getTime(),
                      Date.now()
                    ) + horasAdicionais * 60 * 60 * 1000
                  ).toLocaleString("pt-BR")}
                </p>
              </div>
            )}
            {prorrogarDialog.candidato?.status === "expirada" && (
              <div className="flex gap-3 p-3 bg-warning-bg border border-warning-border rounded-lg">
                <AlertTriangle className="h-4 w-4 text-warning-icon shrink-0 mt-0.5" />
                <p className="text-sm text-warning-text">
                  A entrevista deste candidato expirou. Ao prorrogar, o status será revertido para &quot;Em andamento&quot;.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProrrogarDialog({ open: false, candidato: null })}>
              Cancelar
            </Button>
            <Button
              onClick={handleProrrogarPrazo}
              disabled={candidatoActionLoading === prorrogarDialog.candidato?.candidatoEntrevistaId}
            >
              {candidatoActionLoading === prorrogarDialog.candidato?.candidatoEntrevistaId && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              Prorrogar Prazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Reenviar Entrevista */}
      <AlertDialog open={reenviarDialog.open} onOpenChange={(open) => !open && setReenviarDialog({ open: false, candidato: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reenviar Entrevista</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                Você está prestes a dar uma nova chance para <strong>{reenviarDialog.candidato?.nome}</strong> realizar a entrevista.
              </p>
              <div className="flex gap-3 p-3 bg-warning-bg border border-warning-border rounded-lg">
                <AlertTriangle className="h-4 w-4 text-warning-icon shrink-0 mt-0.5" />
                <div className="text-sm text-warning-text">
                  <p className="font-medium">Atenção:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Todas as respostas anteriores serão apagadas</li>
                    <li>O candidato receberá um novo convite por email</li>
                    <li>Um novo prazo será definido</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Label>Prazo para responder</Label>
                <Select value={prazoReenvio.toString()} onValueChange={(v) => setPrazoReenvio(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 horas (1 dia)</SelectItem>
                    <SelectItem value="48">48 horas (2 dias)</SelectItem>
                    <SelectItem value="72">72 horas (3 dias)</SelectItem>
                    <SelectItem value="168">7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReenviarEntrevista}
              disabled={candidatoActionLoading === reenviarDialog.candidato?.candidatoEntrevistaId}
              className="bg-primary"
            >
              {candidatoActionLoading === reenviarDialog.candidato?.candidatoEntrevistaId && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              Reenviar Entrevista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
