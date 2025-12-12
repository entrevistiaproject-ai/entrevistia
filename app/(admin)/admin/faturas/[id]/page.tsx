"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Ban,
  FileText,
  Loader2,
  Receipt,
  Building2,
  Mail,
  Phone,
  User,
  Briefcase,
  CreditCard,
  Download,
  Edit,
  MessageSquare,
  Users,
  ClipboardList,
  Hash,
  DollarSign,
  TrendingUp,
  Percent,
  Info,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FaturaDetalhe {
  id: string;
  userId: string;
  usuario: {
    nome: string | null;
    email: string | null;
    empresa: string | null;
    cargo: string | null;
    telefone: string | null;
    planType: string | null;
  };
  periodo: string;
  mesReferencia: number;
  anoReferencia: number;
  valorTotal: number;
  valorPago: number;
  valorPendente: number;
  status: string;
  dataAbertura: string | null;
  dataFechamento: string | null;
  dataVencimento: string | null;
  dataPagamento: string | null;
  estatisticas: {
    entrevistas: number;
    candidatos: number;
    respostas: number;
    transacoes: number;
  };
  metodoPagamento: string | null;
  paymentId: string | null;
  paymentData: unknown;
  createdAt: string;
  updatedAt: string;
  transacoes: Array<{
    id: string;
    tipo: string;
    custoBase: number;
    markup: number;
    valorCobrado: number;
    descricao: string | null;
    status: string;
    metadados: Record<string, unknown> | null;
    createdAt: string;
  }>;
}

const tipoTransacaoLabels: Record<string, string> = {
  transcricao_audio: "Transcrição de Áudio",
  analise_ia: "Análise de IA",
  analise_pergunta: "Análise por Pergunta",
  taxa_base_candidato: "Taxa Base por Candidato",
  pergunta_criada: "Criação de Pergunta",
  entrevista_criada: "Criação de Entrevista",
};

const tipoTransacaoIcons: Record<string, React.ReactNode> = {
  transcricao_audio: <MessageSquare className="h-4 w-4" />,
  analise_ia: <TrendingUp className="h-4 w-4" />,
  analise_pergunta: <ClipboardList className="h-4 w-4" />,
  taxa_base_candidato: <Users className="h-4 w-4" />,
  pergunta_criada: <FileText className="h-4 w-4" />,
  entrevista_criada: <Briefcase className="h-4 w-4" />,
};

export default function FaturaDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fatura, setFatura] = useState<FaturaDetalhe | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    status: "",
    valorPago: "",
    metodoPagamento: "",
  });

  useEffect(() => {
    fetchFatura();
  }, [id]);

  const fetchFatura = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/faturas/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFatura(data.fatura);
        setEditForm({
          status: data.fatura.status,
          valorPago: data.fatura.valorPago.toString(),
          metodoPagamento: data.fatura.metodoPagamento || "",
        });
      } else if (response.status === 404) {
        router.push("/admin/faturas");
      }
    } catch (error) {
      console.error("Erro ao carregar fatura:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/faturas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editForm.status,
          valorPago: parseFloat(editForm.valorPago) || 0,
          metodoPagamento: editForm.metodoPagamento || null,
        }),
      });

      if (response.ok) {
        setEditModalOpen(false);
        fetchFatura();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string, size: "sm" | "lg" = "sm") => {
    const sizeClasses = size === "lg" ? "text-sm px-3 py-1.5" : "";

    switch (status) {
      case "paga":
        return (
          <Badge
            className={cn(
              "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
              sizeClasses
            )}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Paga
          </Badge>
        );
      case "aberta":
        return (
          <Badge
            className={cn(
              "bg-blue-500/20 text-blue-400 border-blue-500/30",
              sizeClasses
            )}
          >
            <Clock className="h-3 w-3 mr-1" />
            Aberta
          </Badge>
        );
      case "fechada":
        return (
          <Badge
            className={cn(
              "bg-amber-500/20 text-amber-400 border-amber-500/30",
              sizeClasses
            )}
          >
            <FileText className="h-3 w-3 mr-1" />
            Fechada
          </Badge>
        );
      case "vencida":
        return (
          <Badge
            className={cn(
              "bg-red-500/20 text-red-400 border-red-500/30",
              sizeClasses
            )}
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            Vencida
          </Badge>
        );
      case "cancelada":
        return (
          <Badge
            className={cn(
              "bg-slate-500/20 text-slate-400 border-slate-500/30",
              sizeClasses
            )}
          >
            <Ban className="h-3 w-3 mr-1" />
            Cancelada
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            {status}
          </Badge>
        );
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPlanBadge = (planType: string | null) => {
    switch (planType) {
      case "free_trial":
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            Gratuito
          </Badge>
        );
      case "basic":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Basic
          </Badge>
        );
      case "professional":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            Profissional
          </Badge>
        );
      case "enterprise":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Profissional
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            {planType || "N/A"}
          </Badge>
        );
    }
  };

  const getTransacaoStatusBadge = (status: string) => {
    switch (status) {
      case "concluida":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
            Concluída
          </Badge>
        );
      case "pendente":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
            Pendente
          </Badge>
        );
      case "falha":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
            Falha
          </Badge>
        );
      case "reembolsada":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
            Reembolsada
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-slate-400 border-slate-600 text-xs">
            {status}
          </Badge>
        );
    }
  };

  // Agrupar transações por tipo
  const transacoesPorTipo = fatura?.transacoes.reduce(
    (acc, t) => {
      const tipo = t.tipo;
      if (!acc[tipo]) {
        acc[tipo] = { count: 0, total: 0 };
      }
      acc[tipo].count++;
      acc[tipo].total += t.valorCobrado;
      return acc;
    },
    {} as Record<string, { count: number; total: number }>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Carregando fatura...</p>
        </div>
      </div>
    );
  }

  if (!fatura) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-slate-400">Fatura não encontrada</p>
          <Button
            variant="outline"
            className="mt-4 border-slate-700"
            onClick={() => router.push("/admin/faturas")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Faturas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/faturas")}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/30">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Fatura {fatura.periodo}
              </h1>
              <p className="text-slate-400">
                ID: <span className="font-mono text-xs">{fatura.id}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button
            onClick={() => setEditModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar Status
          </Button>
        </div>
      </div>

      {/* Status e Resumo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Status */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-slate-400" />
              Status da Fatura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status Atual</span>
              {getStatusBadge(fatura.status, "lg")}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Período</span>
              <span className="text-white font-medium">{fatura.periodo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Criada em</span>
              <span className="text-white">{formatDate(fatura.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Atualizada em</span>
              <span className="text-white">{formatDate(fatura.updatedAt)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Card de Valores */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              Valores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Valor Total</span>
              <span className="text-2xl font-bold text-white">
                {formatCurrency(fatura.valorTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Valor Pago</span>
              <span className="text-lg font-semibold text-emerald-400">
                {formatCurrency(fatura.valorPago)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Valor Pendente</span>
              <span
                className={cn(
                  "text-lg font-semibold",
                  fatura.valorPendente > 0 ? "text-amber-400" : "text-slate-500"
                )}
              >
                {formatCurrency(fatura.valorPendente)}
              </span>
            </div>
            {fatura.valorTotal > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Progresso de Pagamento</span>
                  <span className="text-slate-300">
                    {Math.round((fatura.valorPago / fatura.valorTotal) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${Math.min(100, (fatura.valorPago / fatura.valorTotal) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card de Estatísticas */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Estatísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                <p className="text-2xl font-bold text-white">
                  {fatura.estatisticas.entrevistas}
                </p>
                <p className="text-xs text-slate-400">Entrevistas</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                <p className="text-2xl font-bold text-white">
                  {fatura.estatisticas.candidatos}
                </p>
                <p className="text-xs text-slate-400">Candidatos</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                <p className="text-2xl font-bold text-white">
                  {fatura.estatisticas.respostas}
                </p>
                <p className="text-xs text-slate-400">Respostas</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                <p className="text-2xl font-bold text-white">
                  {fatura.estatisticas.transacoes}
                </p>
                <p className="text-xs text-slate-400">Transações</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Datas e Informações do Cliente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Datas Importantes */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-slate-400" />
              Datas Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Abertura</p>
                    <p className="text-xs text-slate-400">
                      Quando a fatura foi criada
                    </p>
                  </div>
                </div>
                <span className="text-white font-medium">
                  {formatDate(fatura.dataAbertura)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <FileText className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Fechamento</p>
                    <p className="text-xs text-slate-400">
                      Quando a fatura foi fechada
                    </p>
                  </div>
                </div>
                <span className="text-white font-medium">
                  {formatDate(fatura.dataFechamento)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Vencimento</p>
                    <p className="text-xs text-slate-400">
                      Data limite para pagamento
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "font-medium",
                    fatura.status === "vencida"
                      ? "text-red-400"
                      : "text-white"
                  )}
                >
                  {formatDate(fatura.dataVencimento)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Pagamento</p>
                    <p className="text-xs text-slate-400">
                      Quando foi paga
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "font-medium",
                    fatura.dataPagamento ? "text-emerald-400" : "text-slate-500"
                  )}
                >
                  {formatDate(fatura.dataPagamento)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Cliente */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <User className="h-5 w-5 text-slate-400" />
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-lg font-bold text-white shrink-0">
                  {fatura.usuario.nome
                    ?.split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-white truncate">
                    {fatura.usuario.nome || "Usuário"}
                  </p>
                  <div className="mt-1">{getPlanBadge(fatura.usuario.planType)}</div>
                </div>
                <Link href={`/admin/usuarios/${fatura.userId}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-700 text-slate-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Ver Perfil
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm text-white truncate">
                      {fatura.usuario.email || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Telefone</p>
                    <p className="text-sm text-white truncate">
                      {fatura.usuario.telefone || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Empresa</p>
                    <p className="text-sm text-white truncate">
                      {fatura.usuario.empresa || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Cargo</p>
                    <p className="text-sm text-white truncate">
                      {fatura.usuario.cargo || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações de Pagamento */}
      {(fatura.metodoPagamento || fatura.paymentId) && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-slate-400" />
              Informações de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-800/30">
                <p className="text-xs text-slate-400 mb-1">Método de Pagamento</p>
                <p className="text-white font-medium">
                  {fatura.metodoPagamento === "cartao_credito"
                    ? "Cartão de Crédito"
                    : fatura.metodoPagamento || "-"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/30">
                <p className="text-xs text-slate-400 mb-1">ID da Transação</p>
                <p className="text-white font-mono text-sm truncate">
                  {fatura.paymentId || "-"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/30">
                <p className="text-xs text-slate-400 mb-1">Data do Pagamento</p>
                <p className="text-white font-medium">
                  {formatDateTime(fatura.dataPagamento)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumo por Tipo de Transação */}
      {transacoesPorTipo && Object.keys(transacoesPorTipo).length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Percent className="h-5 w-5 text-slate-400" />
              Resumo por Tipo de Cobrança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(transacoesPorTipo).map(([tipo, data]) => (
                <div
                  key={tipo}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {tipoTransacaoIcons[tipo] || <Hash className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {tipoTransacaoLabels[tipo] || tipo}
                      </p>
                      <p className="text-xs text-slate-400">
                        {data.count} {data.count === 1 ? "transação" : "transações"}
                      </p>
                    </div>
                  </div>
                  <span className="text-white font-semibold">
                    {formatCurrency(data.total)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Transações */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Receipt className="h-5 w-5 text-slate-400" />
              Transações ({fatura.transacoes.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {fatura.transacoes.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Nenhuma transação registrada</p>
            </div>
          ) : (
            <div className="space-y-3">
              {fatura.transacoes.map((transacao) => (
                <div
                  key={transacao.id}
                  className="flex items-start justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400 mt-0.5">
                      {tipoTransacaoIcons[transacao.tipo] || (
                        <Hash className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-white">
                          {tipoTransacaoLabels[transacao.tipo] || transacao.tipo}
                        </p>
                        {getTransacaoStatusBadge(transacao.status)}
                      </div>
                      {transacao.descricao && (
                        <p className="text-sm text-slate-400 mt-1 truncate">
                          {transacao.descricao}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span>{formatDateTime(transacao.createdAt)}</span>
                        {transacao.markup > 0 && (
                          <span>
                            Markup: {(transacao.markup * 100).toFixed(0)}%
                          </span>
                        )}
                        {transacao.custoBase > 0 && (
                          <span>
                            Custo base: {formatCurrency(transacao.custoBase)}
                          </span>
                        )}
                      </div>
                      {transacao.metadados && Object.keys(transacao.metadados).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(transacao.metadados).slice(0, 4).map(([key, value]) => (
                            <span
                              key={key}
                              className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400"
                            >
                              {key}: {String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <p className="text-lg font-semibold text-white">
                      {formatCurrency(transacao.valorCobrado)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Fatura</DialogTitle>
            <DialogDescription className="text-slate-400">
              Atualize o status e informações de pagamento da fatura.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(v) => setEditForm({ ...editForm, status: v })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="aberta">Aberta</SelectItem>
                  <SelectItem value="fechada">Fechada</SelectItem>
                  <SelectItem value="paga">Paga</SelectItem>
                  <SelectItem value="vencida">Vencida</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Valor Pago (R$)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={editForm.valorPago}
                onChange={(e) =>
                  setEditForm({ ...editForm, valorPago: e.target.value })
                }
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Método de Pagamento</Label>
              <Select
                value={editForm.metodoPagamento}
                onValueChange={(v) =>
                  setEditForm({ ...editForm, metodoPagamento: v })
                }
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
              className="border-slate-700 text-slate-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
