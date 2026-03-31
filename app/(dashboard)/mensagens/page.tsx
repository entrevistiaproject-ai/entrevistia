"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Send,
  Search,
  Inbox,
  Archive,
  User,
  Clock,
  Eye,
  MailOpen,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface Mensagem {
  id: string;
  canal: string;
  status: string;
  recebida: boolean;
  assunto?: string;
  corpo: string;
  candidatoId: string;
  candidatoNome: string;
  candidatoEmail: string;
  entrevistaId?: string;
  lidaPeloRecrutador: boolean;
  abertaEm?: string;
  createdAt: string;
}

interface Template {
  id: string;
  nome: string;
  tipo: string;
  assunto?: string;
  corpo: string;
}

interface Candidato {
  id: string;
  nome: string;
  email: string;
}

const statusIcons: Record<string, React.ReactNode> = {
  enviada: <Send className="h-3.5 w-3.5 text-blue-500" />,
  entregue: <CheckCircle className="h-3.5 w-3.5 text-green-500" />,
  aberta: <MailOpen className="h-3.5 w-3.5 text-indigo-500" />,
  erro: <AlertCircle className="h-3.5 w-3.5 text-red-500" />,
  respondida: <Mail className="h-3.5 w-3.5 text-emerald-500" />,
};

export default function MensagensPage() {
  const { toast } = useToast();
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("todas");
  const [busca, setBusca] = useState("");
  const [selectedMsg, setSelectedMsg] = useState<Mensagem | null>(null);

  // Nova mensagem
  const [showNew, setShowNew] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [newMsg, setNewMsg] = useState({
    candidatoId: "",
    assunto: "",
    corpo: "",
    templateId: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMensagens();
  }, [tab, busca]);

  async function fetchMensagens() {
    setLoading(true);
    const params = new URLSearchParams();
    if (tab === "naoLidas") params.set("naoLidas", "true");
    if (tab === "arquivadas") params.set("arquivada", "true");
    if (busca) params.set("busca", busca);

    try {
      const res = await fetch(`/api/mensagens?${params}`);
      const data = await res.json();
      setMensagens(data.mensagens || []);
    } catch {
      console.error("Erro ao buscar mensagens");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTemplates() {
    try {
      const res = await fetch("/api/mensagens/templates");
      const data = await res.json();
      setTemplates(data.templates || []);
    } catch {
      // Silencioso
    }
  }

  async function fetchCandidatos() {
    try {
      const res = await fetch("/api/candidatos?limit=100");
      const data = await res.json();
      setCandidatos(data.candidatos || []);
    } catch {
      // Silencioso
    }
  }

  function handleOpenNew() {
    fetchTemplates();
    fetchCandidatos();
    setShowNew(true);
  }

  function handleSelectTemplate(templateId: string) {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setNewMsg((prev) => ({
        ...prev,
        templateId,
        assunto: template.assunto || prev.assunto,
        corpo: template.corpo,
      }));
    }
  }

  async function handleSend() {
    if (!newMsg.candidatoId || !newMsg.corpo) {
      toast({ title: "Selecione um candidato e escreva a mensagem", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/mensagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });

      if (res.ok) {
        toast({ title: "Mensagem enviada!" });
        setShowNew(false);
        setNewMsg({ candidatoId: "", assunto: "", corpo: "", templateId: "" });
        fetchMensagens();
      } else {
        const errData = await res.json();
        toast({ title: errData.error || "Erro ao enviar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro ao enviar mensagem", variant: "destructive" });
    } finally {
      setSending(false);
    }
  }

  async function markAsRead(msgId: string) {
    await fetch(`/api/mensagens/${msgId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lidaPeloRecrutador: true }),
    }).catch(() => {});
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mensagens</h1>
          <p className="text-muted-foreground">
            Comunicação centralizada com candidatos
          </p>
        </div>
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew}>
              <Send className="h-4 w-4 mr-2" />
              Nova Mensagem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nova Mensagem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Candidato</Label>
                <Select
                  value={newMsg.candidatoId}
                  onValueChange={(v) => setNewMsg((p) => ({ ...p, candidatoId: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um candidato" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidatos.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nome} ({c.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Template (opcional)</Label>
                <Select
                  value={newMsg.templateId}
                  onValueChange={handleSelectTemplate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Usar um template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Assunto</Label>
                <Input
                  value={newMsg.assunto}
                  onChange={(e) => setNewMsg((p) => ({ ...p, assunto: e.target.value }))}
                  placeholder="Assunto do email"
                />
              </div>

              <div>
                <Label>Mensagem</Label>
                <Textarea
                  value={newMsg.corpo}
                  onChange={(e) => setNewMsg((p) => ({ ...p, corpo: e.target.value }))}
                  placeholder="Escreva sua mensagem..."
                  rows={8}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use variáveis: {"{{nome}}"}, {"{{vaga}}"}, {"{{empresa}}"}, {"{{data}}"}, {"{{hora}}"}, {"{{link}}"}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNew(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSend} disabled={sending}>
                  <Send className="h-4 w-4 mr-2" />
                  {sending ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="todas">
              <Inbox className="h-4 w-4 mr-1" />
              Todas
            </TabsTrigger>
            <TabsTrigger value="naoLidas">
              <Mail className="h-4 w-4 mr-1" />
              Não lidas
            </TabsTrigger>
            <TabsTrigger value="arquivadas">
              <Archive className="h-4 w-4 mr-1" />
              Arquivadas
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar mensagens..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Lista de mensagens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lista */}
        <div className="lg:col-span-1 space-y-1">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="space-y-0">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-20 border-b animate-pulse bg-muted/30" />
                  ))}
                </div>
              ) : mensagens.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma mensagem encontrada</p>
                </div>
              ) : (
                mensagens.map((msg) => (
                  <button
                    key={msg.id}
                    className={`w-full text-left p-3 border-b hover:bg-accent/50 transition-colors ${
                      selectedMsg?.id === msg.id ? "bg-accent" : ""
                    } ${!msg.lidaPeloRecrutador && msg.recebida ? "bg-primary/5" : ""}`}
                    onClick={() => {
                      setSelectedMsg(msg);
                      if (!msg.lidaPeloRecrutador && msg.recebida) markAsRead(msg.id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!msg.lidaPeloRecrutador && msg.recebida && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                          <span className="font-medium text-sm truncate">
                            {msg.candidatoNome}
                          </span>
                          {statusIcons[msg.status]}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {msg.assunto || "(sem assunto)"}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(msg.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detalhe */}
        <div className="lg:col-span-2">
          {selectedMsg ? (
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {selectedMsg.assunto || "(sem assunto)"}
                    </CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {selectedMsg.recebida ? selectedMsg.candidatoNome : "Você"}
                        <ChevronRight className="h-3 w-3" />
                        {selectedMsg.recebida ? "Você" : selectedMsg.candidatoNome}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDistanceToNow(new Date(selectedMsg.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                      {selectedMsg.abertaEm && (
                        <span className="flex items-center gap-1 text-indigo-600">
                          <Eye className="h-3.5 w-3.5" />
                          Visualizado
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline">{selectedMsg.canal}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedMsg.corpo }}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Selecione uma mensagem para visualizar</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
