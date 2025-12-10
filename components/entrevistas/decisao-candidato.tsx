"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  ChevronDown,
  Sparkles,
  Mail,
  Send,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface DecisaoCandidatoProps {
  candidatoId: string;
  entrevistaId: string;
  candidatoNome: string;
  candidatoEmail?: string;
  cargo?: string;
  decisaoAtual: "aprovado" | "reprovado" | null;
  recomendacaoIA: "recomendado" | "recomendado_com_ressalvas" | "nao_recomendado" | null;
  observacaoAtual?: string | null;
  emailEncerramentoEnviado?: boolean;
  onDecisaoAtualizada?: () => void;
  compact?: boolean;
}

const decisaoConfig = {
  aprovado: {
    label: "Aprovado",
    labelLongo: "Avançou para próxima fase",
    icon: CheckCircle2,
    bgColor: "bg-emerald-50 hover:bg-emerald-100",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    iconColor: "text-emerald-600",
  },
  reprovado: {
    label: "Dispensado",
    labelLongo: "Processo encerrado",
    icon: XCircle,
    bgColor: "bg-red-50 hover:bg-red-100",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconColor: "text-red-600",
  },
  pendente: {
    label: "Avaliar",
    labelLongo: "Aguardando sua decisão",
    icon: Clock,
    bgColor: "bg-slate-50 hover:bg-slate-100",
    borderColor: "border-slate-200",
    textColor: "text-slate-600",
    iconColor: "text-slate-500",
  },
};

const recomendacaoIAConfig = {
  recomendado: {
    label: "IA sugere: Aprovar",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  recomendado_com_ressalvas: {
    label: "IA sugere: Avaliar com atenção",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  nao_recomendado: {
    label: "IA sugere: Não avançar",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
  },
};

const TEXTO_EMAIL_PADRAO = `Agradecemos muito seu interesse na vaga e o tempo dedicado ao nosso processo seletivo.

Após avaliar todos os candidatos, decidimos seguir com outros perfis que estão mais alinhados com o que buscamos neste momento. Isso não diminui suas qualidades — sabemos que você tem muito a oferecer.

Vamos manter seu perfil em nosso banco para futuras oportunidades.

Desejamos sucesso na sua busca!`;

export function DecisaoCandidato({
  candidatoId,
  entrevistaId,
  candidatoNome,
  candidatoEmail,
  cargo,
  decisaoAtual,
  recomendacaoIA,
  observacaoAtual,
  emailEncerramentoEnviado = false,
  onDecisaoAtualizada,
  compact = false,
}: DecisaoCandidatoProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [decisaoSelecionada, setDecisaoSelecionada] = useState<"aprovado" | "reprovado" | null>(decisaoAtual);
  const [observacao, setObservacao] = useState(observacaoAtual || "");

  // Estado para email de encerramento
  const [enviarEmail, setEnviarEmail] = useState(false);
  const [mostrarEdicaoEmail, setMostrarEdicaoEmail] = useState(false);
  const [textoEmail, setTextoEmail] = useState(TEXTO_EMAIL_PADRAO);
  const [emailJaEnviado, setEmailJaEnviado] = useState(emailEncerramentoEnviado);

  const config = decisaoAtual ? decisaoConfig[decisaoAtual] : decisaoConfig.pendente;
  const Icon = config.icon;

  // Reset estados quando o dialog abre
  useEffect(() => {
    if (open) {
      setDecisaoSelecionada(decisaoAtual);
      setObservacao(observacaoAtual || "");
      setEnviarEmail(false);
      setMostrarEdicaoEmail(false);
      setTextoEmail(TEXTO_EMAIL_PADRAO);
    }
  }, [open, decisaoAtual, observacaoAtual]);

  const handleSalvar = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/entrevistas/${entrevistaId}/candidatos/${candidatoId}/decisao`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            decisao: decisaoSelecionada,
            observacao: observacao.trim() || null,
          }),
        }
      );

      if (response.ok) {
        // Se for reprovado e quiser enviar email
        if (decisaoSelecionada === "reprovado" && enviarEmail && !emailJaEnviado) {
          await handleEnviarEmail();
        }

        setOpen(false);
        onDecisaoAtualizada?.();

        toast({
          title: "Decisão salva",
          description: decisaoSelecionada === "aprovado"
            ? "Candidato aprovado para próxima fase"
            : "Participação do candidato encerrada",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar decisão:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a decisão",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarEmail = async () => {
    setSendingEmail(true);
    try {
      const response = await fetch(
        `/api/entrevistas/${entrevistaId}/candidatos/${candidatoId}/email-encerramento`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mensagem: textoEmail !== TEXTO_EMAIL_PADRAO ? textoEmail : undefined,
          }),
        }
      );

      if (response.ok) {
        setEmailJaEnviado(true);
        toast({
          title: "Email enviado",
          description: `Email de encerramento enviado para ${candidatoNome}`,
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Erro ao enviar email");
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast({
        title: "Erro ao enviar email",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const handleRemoverDecisao = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/entrevistas/${entrevistaId}/candidatos/${candidatoId}/decisao`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            decisao: null,
            observacao: null,
          }),
        }
      );

      if (response.ok) {
        setDecisaoSelecionada(null);
        setObservacao("");
        setOpen(false);
        onDecisaoAtualizada?.();
      }
    } catch (error) {
      console.error("Erro ao remover decisão:", error);
    } finally {
      setLoading(false);
    }
  };

  // Botão para enviar email quando já está reprovado mas não enviou email
  const handleEnviarEmailSeparado = async () => {
    setSendingEmail(true);
    try {
      const response = await fetch(
        `/api/entrevistas/${entrevistaId}/candidatos/${candidatoId}/email-encerramento`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mensagem: textoEmail !== TEXTO_EMAIL_PADRAO ? textoEmail : undefined,
          }),
        }
      );

      if (response.ok) {
        setEmailJaEnviado(true);
        onDecisaoAtualizada?.();
        toast({
          title: "Email enviado",
          description: `Email de encerramento enviado para ${candidatoNome}`,
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Erro ao enviar email");
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast({
        title: "Erro ao enviar email",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all",
            config.bgColor,
            config.borderColor,
            "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className={cn("h-3.5 w-3.5", config.iconColor)} />
          <span className={cn("text-xs font-medium", config.textColor)}>
            {compact ? config.label : config.labelLongo}
          </span>
          <ChevronDown className={cn("h-3 w-3", config.textColor)} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Avaliar candidato</DialogTitle>
          <DialogDescription>
            Decida se <span className="font-medium text-foreground">{candidatoNome}</span> segue para a próxima fase.
          </DialogDescription>
        </DialogHeader>

        {/* Recomendação da IA */}
        {recomendacaoIA && (
          <div className={cn(
            "flex items-center gap-2 p-3 rounded-lg",
            recomendacaoIAConfig[recomendacaoIA].bgColor
          )}>
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className={cn(
              "text-sm font-medium",
              recomendacaoIAConfig[recomendacaoIA].textColor
            )}>
              {recomendacaoIAConfig[recomendacaoIA].label}
            </span>
          </div>
        )}

        {/* Opções de decisão */}
        <div className="space-y-3">
          <Label>Sua decisão</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDecisaoSelecionada("aprovado")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                decisaoSelecionada === "aprovado"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50"
              )}
            >
              <CheckCircle2 className={cn(
                "h-8 w-8",
                decisaoSelecionada === "aprovado" ? "text-emerald-600" : "text-slate-400"
              )} />
              <span className={cn(
                "text-sm font-medium",
                decisaoSelecionada === "aprovado" ? "text-emerald-700" : "text-slate-600"
              )}>
                Aprovar
              </span>
              <span className="text-xs text-slate-500 text-center">
                Segue para próxima fase
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDecisaoSelecionada("reprovado")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                decisaoSelecionada === "reprovado"
                  ? "border-red-500 bg-red-50"
                  : "border-slate-200 hover:border-red-300 hover:bg-red-50/50"
              )}
            >
              <XCircle className={cn(
                "h-8 w-8",
                decisaoSelecionada === "reprovado" ? "text-red-600" : "text-slate-400"
              )} />
              <span className={cn(
                "text-sm font-medium",
                decisaoSelecionada === "reprovado" ? "text-red-700" : "text-slate-600"
              )}>
                Dispensar
              </span>
              <span className="text-xs text-slate-500 text-center">
                Encerra a participação
              </span>
            </button>
          </div>
        </div>

        {/* Observação opcional */}
        <div className="space-y-2">
          <Label htmlFor="observacao">Anotação interna (opcional)</Label>
          <Textarea
            id="observacao"
            placeholder="Escreva uma nota para você ou sua equipe..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            rows={2}
          />
        </div>

        {/* Opção de enviar email de encerramento (só aparece quando reprova) */}
        {decisaoSelecionada === "reprovado" && !emailJaEnviado && (
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg border">
            <div className="flex items-start gap-3">
              <Checkbox
                id="enviar-email"
                checked={enviarEmail}
                onCheckedChange={(checked) => setEnviarEmail(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="enviar-email" className="cursor-pointer flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Avisar o candidato por email
                </Label>
                <p className="text-xs text-muted-foreground">
                  Envia uma mensagem cordial informando que o processo foi encerrado
                </p>
              </div>
            </div>

            {enviarEmail && (
              <div className="space-y-2 ml-6">
                <button
                  type="button"
                  onClick={() => setMostrarEdicaoEmail(!mostrarEdicaoEmail)}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  {mostrarEdicaoEmail ? "Ocultar edição" : "Personalizar mensagem"}
                </button>

                {mostrarEdicaoEmail && (
                  <Textarea
                    value={textoEmail}
                    onChange={(e) => setTextoEmail(e.target.value)}
                    rows={6}
                    className="text-sm"
                    placeholder="Digite a mensagem personalizada..."
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Mostrar se email já foi enviado */}
        {decisaoAtual === "reprovado" && emailJaEnviado && (
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">
              Email de encerramento já enviado
            </span>
          </div>
        )}

        {/* Opção de enviar email se já reprovou mas não enviou */}
        {decisaoAtual === "reprovado" && !emailJaEnviado && (
          <div className="space-y-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">
                Email de encerramento não enviado
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMostrarEdicaoEmail(!mostrarEdicaoEmail)}
              className="text-xs text-amber-700 hover:text-amber-900 underline"
            >
              {mostrarEdicaoEmail ? "Ocultar edição" : "Personalizar mensagem antes de enviar"}
            </button>

            {mostrarEdicaoEmail && (
              <Textarea
                value={textoEmail}
                onChange={(e) => setTextoEmail(e.target.value)}
                rows={6}
                className="text-sm"
                placeholder="Digite a mensagem personalizada..."
              />
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleEnviarEmailSeparado}
              disabled={sendingEmail}
              className="w-full"
            >
              {sendingEmail ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Enviar email de encerramento agora
            </Button>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {decisaoAtual && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleRemoverDecisao}
              disabled={loading}
              className="text-slate-500 hover:text-slate-700"
            >
              Remover decisão
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSalvar}
              disabled={loading || decisaoSelecionada === null}
              className={cn(
                decisaoSelecionada === "aprovado" && "bg-emerald-600 hover:bg-emerald-700",
                decisaoSelecionada === "reprovado" && "bg-red-600 hover:bg-red-700"
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Confirmar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
