"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Bug,
  CreditCard,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SupportWidgetProps {
  /** Origem do widget para tracking */
  origem?: "widget_suporte" | "pagina_erro" | "pagina_fatura";
  /** Categoria pré-selecionada */
  categoriaInicial?: string;
  /** Título pré-preenchido */
  tituloInicial?: string;
  /** Descrição pré-preenchida */
  descricaoInicial?: string;
  /** Informações de erro (para páginas de erro) */
  errorInfo?: {
    message?: string;
    stack?: string;
    digest?: string;
  };
  /** URL da página atual */
  pageUrl?: string;
  /** Customizar trigger */
  trigger?: React.ReactNode;
  /** Variante do botão trigger */
  variant?: "default" | "outline" | "ghost" | "card";
  /** Usuário logado */
  user?: {
    email?: string;
    name?: string;
  };
  /** Callback após criar ticket */
  onSuccess?: (ticketId: string) => void;
}

const CATEGORIAS = [
  { value: "usuario", label: "Dúvida / Como fazer", icon: HelpCircle },
  { value: "sistemico", label: "Bug / Erro no sistema", icon: Bug },
  { value: "faturamento", label: "Faturamento / Pagamento", icon: CreditCard },
  { value: "sugestao", label: "Sugestão / Melhoria", icon: Lightbulb },
  { value: "outro", label: "Outro", icon: MessageSquare },
];

export function SupportWidget({
  origem = "widget_suporte",
  categoriaInicial,
  tituloInicial = "",
  descricaoInicial = "",
  errorInfo,
  pageUrl,
  trigger,
  variant = "default",
  user,
  onSuccess,
}: SupportWidgetProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  // Form states
  const [titulo, setTitulo] = useState(tituloInicial);
  const [descricao, setDescricao] = useState(descricaoInicial);
  const [categoria, setCategoria] = useState(categoriaInicial || "usuario");
  const [email, setEmail] = useState(user?.email || "");
  const [nome, setNome] = useState(user?.name || "");
  const [userLoaded, setUserLoaded] = useState(!!user?.email);

  // Buscar dados do usuário automaticamente se não foram passados via props
  useEffect(() => {
    if (!user?.email && !userLoaded) {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setEmail(data.email);
            setNome(data.nome || "");
            setUserLoaded(true);
          }
        })
        .catch(() => {
          // Ignora erro - usuário pode não estar logado
        });
    }
  }, [user?.email, userLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descricao,
          categoria,
          origem,
          pageUrl: pageUrl || window.location.href,
          email: email,
          nome: nome,
          errorMessage: errorInfo?.message,
          errorStack: errorInfo?.stack,
          errorContext: errorInfo?.digest ? { digest: errorInfo.digest } : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTicketId(data.ticket.id);
        onSuccess?.(data.ticket.id);
      } else {
        setError(data.error || "Erro ao criar chamado");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset após fechar
    setTimeout(() => {
      if (success) {
        setSuccess(false);
        setTicketId(null);
        setTitulo(tituloInicial);
        setDescricao(descricaoInicial);
      }
    }, 300);
  };

  const renderTrigger = () => {
    if (trigger) return trigger;

    if (variant === "card") {
      return (
        <button className="w-full p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Falar com Suporte</p>
              <p className="text-sm text-slate-500">Abrir um chamado de suporte</p>
            </div>
          </div>
        </button>
      );
    }

    return (
      <Button variant={variant === "default" ? "default" : variant}>
        <MessageSquare className="h-4 w-4 mr-2" />
        Falar com Suporte
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{renderTrigger()}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {success ? (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <DialogTitle className="text-xl mb-2">Chamado Criado!</DialogTitle>
            <DialogDescription className="text-base mb-4">
              Seu chamado foi criado com sucesso. Nossa equipe entrará em contato em breve.
            </DialogDescription>
            {ticketId && (
              <p className="text-sm text-slate-500 mb-4">
                ID do chamado: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{ticketId.slice(0, 8)}</code>
              </p>
            )}
            <Button onClick={handleClose}>Fechar</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Abrir Chamado de Suporte
              </DialogTitle>
              <DialogDescription>
                Descreva seu problema ou dúvida e nossa equipe irá ajudá-lo.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Email (se não logado) */}
              {!userLoaded && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="categoria">Tipo de Solicitação</Label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="h-4 w-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="titulo">Assunto *</Label>
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Resumo do problema ou dúvida"
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva em detalhes o que aconteceu, o que você esperava e quaisquer passos para reproduzir o problema..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Info de erro (se houver) */}
              {errorInfo?.message && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">
                    Informações do erro (serão anexadas automaticamente):
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-300 font-mono truncate">
                    {errorInfo.message}
                  </p>
                </div>
              )}

              {/* Erro de submissão */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Chamado
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * Versão compacta do widget para usar em cards de ajuda
 */
export function SupportCard({
  title = "Precisa de ajuda?",
  description = "Se tiver dúvidas ou problemas, entre em contato conosco.",
  ...props
}: SupportWidgetProps & { title?: string; description?: string }) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
      <h3 className="font-medium text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{description}</p>
      <SupportWidget {...props} variant="outline" />
    </div>
  );
}
