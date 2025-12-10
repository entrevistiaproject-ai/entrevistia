"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  User,
  Mail,
  Globe,
  Monitor,
  Calendar,
  MessageSquare,
  Send,
  History,
  Tag,
  Shield,
  Bug,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketDetail {
  id: string;
  titulo: string;
  descricao: string;
  userEmail: string;
  userName: string | null;
  userId: string | null;
  categoria: string;
  prioridade: string;
  status: string;
  origem: string;
  riscoScore: number;
  riscoMotivo: string | null;
  assignedTo: string | null;
  assignedAt: string | null;
  resolucao: string | null;
  resolvidoEm: string | null;
  errorFingerprint: string | null;
  errorMessage: string | null;
  errorStack: string | null;
  errorContext: Record<string, unknown> | null;
  errorCount: number;
  pageUrl: string | null;
  browserInfo: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
  firstResponseAt: string | null;
  closedAt: string | null;
}

interface Message {
  id: string;
  autorTipo: string;
  autorNome: string;
  autorEmail: string | null;
  mensagem: string;
  isInternal: boolean;
  createdAt: string;
}

interface HistoryEntry {
  id: string;
  campo: string;
  valorAntigo: string | null;
  valorNovo: string | null;
  changedByNome: string | null;
  changedByTipo: string | null;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "aberto", label: "Aberto" },
  { value: "em_analise", label: "Em Análise" },
  { value: "aguardando_usuario", label: "Aguardando Usuário" },
  { value: "aguardando_tecnico", label: "Aguardando Técnico" },
  { value: "resolvido", label: "Resolvido" },
  { value: "fechado", label: "Fechado" },
  { value: "cancelado", label: "Cancelado" },
];

const PRIORITY_OPTIONS = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Média" },
  { value: "alta", label: "Alta" },
  { value: "critica", label: "Crítica" },
];

const STATUS_COLORS: Record<string, string> = {
  aberto: "bg-blue-500/20 text-blue-400",
  em_analise: "bg-amber-500/20 text-amber-400",
  aguardando_usuario: "bg-purple-500/20 text-purple-400",
  aguardando_tecnico: "bg-orange-500/20 text-orange-400",
  resolvido: "bg-emerald-500/20 text-emerald-400",
  fechado: "bg-slate-500/20 text-slate-400",
  cancelado: "bg-red-500/20 text-red-400",
};

const PRIORITY_COLORS: Record<string, string> = {
  baixa: "bg-slate-500/20 text-slate-400",
  media: "bg-blue-500/20 text-blue-400",
  alta: "bg-amber-500/20 text-amber-400",
  critica: "bg-red-500/20 text-red-400",
};

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Form states
  const [newMessage, setNewMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [resolucao, setResolucao] = useState("");

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/tickets/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTicket(data.ticket);
        setMessages(data.messages);
        setHistory(data.history);
        setSelectedStatus(data.ticket.status);
        setSelectedPriority(data.ticket.prioridade);
      }
    } catch (error) {
      console.error("Erro ao carregar ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleUpdateTicket = async () => {
    if (!ticket) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedStatus,
          prioridade: selectedPriority,
          resolucao: selectedStatus === "resolvido" ? resolucao : undefined,
        }),
      });

      if (response.ok) {
        await fetchTicket();
      }
    } catch (error) {
      console.error("Erro ao atualizar ticket:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/tickets/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensagem: newMessage,
          isInternal,
        }),
      });

      if (response.ok) {
        setNewMessage("");
        setIsInternal(false);
        await fetchTicket();
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRiscoColor = (score: number) => {
    if (score >= 75) return "text-red-400 bg-red-500/20";
    if (score >= 50) return "text-amber-400 bg-amber-500/20";
    if (score >= 25) return "text-blue-400 bg-blue-500/20";
    return "text-slate-400 bg-slate-500/20";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-slate-400">Ticket não encontrado</p>
        <Link href="/admin/suporte">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/suporte">
          <Button variant="outline" size="sm" className="border-slate-700">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{ticket.titulo}</h1>
          <p className="text-sm text-slate-400">ID: {ticket.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={STATUS_COLORS[ticket.status] || ""}>
            {STATUS_OPTIONS.find((s) => s.value === ticket.status)?.label || ticket.status}
          </Badge>
          <Badge className={PRIORITY_COLORS[ticket.prioridade] || ""}>
            {PRIORITY_OPTIONS.find((p) => p.value === ticket.prioridade)?.label || ticket.prioridade}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descrição */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Descrição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 whitespace-pre-wrap">{ticket.descricao}</p>

              {ticket.tags && ticket.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {ticket.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Erro (se sistêmico) */}
          {ticket.errorMessage && (
            <Card className="bg-red-900/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Detalhes do Erro
                  {ticket.errorCount > 1 && (
                    <Badge className="bg-red-500/20 text-red-400 ml-2">
                      {ticket.errorCount}x ocorrências
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-red-400/70 mb-1">Mensagem:</p>
                  <p className="text-sm text-red-300 font-mono bg-red-950/50 p-3 rounded">
                    {ticket.errorMessage}
                  </p>
                </div>
                {ticket.errorStack && (
                  <div>
                    <p className="text-xs text-red-400/70 mb-1">Stack Trace:</p>
                    <pre className="text-xs text-red-300/80 font-mono bg-red-950/50 p-3 rounded overflow-x-auto max-h-48">
                      {ticket.errorStack}
                    </pre>
                  </div>
                )}
                {ticket.errorFingerprint && (
                  <p className="text-xs text-slate-500">
                    Fingerprint: {ticket.errorFingerprint}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Mensagens */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversação ({messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-slate-500 py-4">Nenhuma mensagem ainda</p>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "p-4 rounded-lg",
                        msg.autorTipo === "admin"
                          ? "bg-primary/10 border border-primary/30 ml-8"
                          : "bg-slate-800 mr-8",
                        msg.isInternal && "border-amber-500/30 bg-amber-500/10"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-white">{msg.autorNome}</span>
                          <Badge variant="outline" className="text-xs">
                            {msg.autorTipo === "admin" ? "Suporte" : "Usuário"}
                          </Badge>
                          {msg.isInternal && (
                            <Badge className="bg-amber-500/20 text-amber-400 text-xs">
                              Nota Interna
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{formatDate(msg.createdAt)}</span>
                      </div>
                      <p className="text-slate-300 whitespace-pre-wrap">{msg.mensagem}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Nova Mensagem */}
              <div className="pt-4 border-t border-slate-700 space-y-3">
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="bg-slate-800 border-slate-700 min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="internal"
                      checked={isInternal}
                      onCheckedChange={(checked) => setIsInternal(checked as boolean)}
                    />
                    <label htmlFor="internal" className="text-sm text-slate-400">
                      Nota interna (não visível ao usuário)
                    </label>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim() || saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                    Enviar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico de Alterações
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-center text-slate-500 py-4">Nenhuma alteração registrada</p>
              ) : (
                <div className="space-y-3">
                  {history.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-slate-600 mt-2" />
                      <div className="flex-1">
                        <p className="text-slate-300">
                          <span className="text-slate-500">{entry.campo}:</span>{" "}
                          <span className="text-red-400 line-through">{entry.valorAntigo || "N/A"}</span>
                          {" → "}
                          <span className="text-emerald-400">{entry.valorNovo || "N/A"}</span>
                        </p>
                        <p className="text-xs text-slate-500">
                          por {entry.changedByNome || "Sistema"} • {formatDate(entry.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ações */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Prioridade</label>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_OPTIONS.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedStatus === "resolvido" && (
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Resolução</label>
                  <Textarea
                    placeholder="Descreva a resolução..."
                    value={resolucao}
                    onChange={(e) => setResolucao(e.target.value)}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              )}

              <Button
                onClick={handleUpdateTicket}
                disabled={saving}
                className="w-full"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          {/* Informações */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Risco */}
              <div className="p-3 rounded-lg bg-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Score de Risco
                  </span>
                  <span className={cn("font-bold text-lg px-2 py-1 rounded", getRiscoColor(ticket.riscoScore))}>
                    {ticket.riscoScore}%
                  </span>
                </div>
                {ticket.riscoMotivo && (
                  <p className="text-xs text-slate-500">{ticket.riscoMotivo}</p>
                )}
              </div>

              {/* Usuário */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">Usuário:</span>
                  <span className="text-white">{ticket.userName || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white text-xs">{ticket.userEmail}</span>
                </div>
              </div>

              {/* Contexto */}
              <div className="space-y-2 pt-2 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">Página:</span>
                  <span className="text-white text-xs truncate">{ticket.pageUrl || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Monitor className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">IP:</span>
                  <span className="text-white">{ticket.ipAddress || "N/A"}</span>
                </div>
              </div>

              {/* Datas */}
              <div className="space-y-2 pt-2 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">Criado:</span>
                  <span className="text-white">{formatDate(ticket.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-400">Atualizado:</span>
                  <span className="text-white">{formatDate(ticket.updatedAt)}</span>
                </div>
                {ticket.firstResponseAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-400">1ª Resposta:</span>
                    <span className="text-white">{formatDate(ticket.firstResponseAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
