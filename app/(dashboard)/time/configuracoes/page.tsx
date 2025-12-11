"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  Bell,
  Mail,
  Zap,
  Info,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface TeamSettings {
  id: string;
  ownerId: string;
  autoApprovalEnabled: boolean;
  autoApprovalMinScore: number;
  autoApprovalUseCompatibility: boolean;
  autoApprovalMinCompatibility: number;
  autoApprovalNotifyTeam: boolean;
  autoApprovalNotifyCandidate: boolean;
  autoApprovalCandidateMessage: string | null;
  autoRejectEnabled: boolean;
  autoRejectMaxScore: number;
  autoRejectNotifyCandidate: boolean;
  autoRejectCandidateMessage: string | null;
}

export default function ConfiguracoesTimePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estado das configuracoes
  const [settings, setSettings] = useState<TeamSettings | null>(null);

  // Aprovacao automatica
  const [autoApprovalEnabled, setAutoApprovalEnabled] = useState(false);
  const [autoApprovalMinScore, setAutoApprovalMinScore] = useState(70);
  const [autoApprovalUseCompatibility, setAutoApprovalUseCompatibility] =
    useState(false);
  const [autoApprovalMinCompatibility, setAutoApprovalMinCompatibility] =
    useState(70);
  const [autoApprovalNotifyTeam, setAutoApprovalNotifyTeam] = useState(true);
  const [autoApprovalNotifyCandidate, setAutoApprovalNotifyCandidate] =
    useState(false);
  const [autoApprovalCandidateMessage, setAutoApprovalCandidateMessage] =
    useState("");

  // Reprovacao automatica
  const [autoRejectEnabled, setAutoRejectEnabled] = useState(false);
  const [autoRejectMaxScore, setAutoRejectMaxScore] = useState(30);
  const [autoRejectNotifyCandidate, setAutoRejectNotifyCandidate] =
    useState(false);
  const [autoRejectCandidateMessage, setAutoRejectCandidateMessage] =
    useState("");

  // Carregar configuracoes
  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/time/configuracoes");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);

        // Preencher estados
        setAutoApprovalEnabled(data.autoApprovalEnabled);
        setAutoApprovalMinScore(data.autoApprovalMinScore);
        setAutoApprovalUseCompatibility(data.autoApprovalUseCompatibility);
        setAutoApprovalMinCompatibility(data.autoApprovalMinCompatibility);
        setAutoApprovalNotifyTeam(data.autoApprovalNotifyTeam);
        setAutoApprovalNotifyCandidate(data.autoApprovalNotifyCandidate);
        setAutoApprovalCandidateMessage(data.autoApprovalCandidateMessage || "");

        setAutoRejectEnabled(data.autoRejectEnabled);
        setAutoRejectMaxScore(data.autoRejectMaxScore);
        setAutoRejectNotifyCandidate(data.autoRejectNotifyCandidate);
        setAutoRejectCandidateMessage(data.autoRejectCandidateMessage || "");
      }
    } catch (error) {
      console.error("Erro ao carregar configuracoes:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar configuracoes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  // Salvar configuracoes
  async function handleSave() {
    // Validacao
    if (autoApprovalEnabled && autoRejectEnabled) {
      if (autoApprovalMinScore <= autoRejectMaxScore) {
        toast({
          title: "Erro de configuracao",
          description:
            "O score minimo de aprovacao deve ser maior que o score maximo de reprovacao",
          variant: "destructive",
        });
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/time/configuracoes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autoApprovalEnabled,
          autoApprovalMinScore,
          autoApprovalUseCompatibility,
          autoApprovalMinCompatibility,
          autoApprovalNotifyTeam,
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
          title: "Configuracoes salvas",
          description: "As configuracoes foram atualizadas com sucesso",
        });
      } else {
        const data = await res.json();
        toast({
          title: "Erro",
          description: data.error || "Erro ao salvar configuracoes",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configuracoes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  // Handler para input de score com validacao
  function handleScoreChange(
    value: string,
    setter: (v: number) => void,
    min: number,
    max: number
  ) {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    if (num < min) setter(min);
    else if (num > max) setter(max);
    else setter(num);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/time">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader
          title="Configuracoes de Aprovacao"
          description="Configure a aprovacao e reprovacao automatica de candidatos"
        />
      </div>

      {/* Explicacao */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Como funciona?</p>
              <p className="text-blue-800">
                Apos a analise da IA, o sistema pode automaticamente aprovar ou
                reprovar candidatos com base no score obtido. Isso agiliza o
                processo de triagem quando voce tem muitos candidatos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aprovacao Automatica */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Aprovacao Automatica</CardTitle>
                <CardDescription>
                  Aprove automaticamente candidatos com score alto
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={autoApprovalEnabled}
              onCheckedChange={setAutoApprovalEnabled}
            />
          </div>
        </CardHeader>

        {autoApprovalEnabled && (
          <CardContent className="space-y-6">
            <Separator />

            {/* Score minimo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Score Minimo para Aprovacao</Label>
                  <p className="text-sm text-muted-foreground">
                    Candidatos com score igual ou acima serao aprovados (50-100%)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={autoApprovalMinScore}
                    onChange={(e) =>
                      handleScoreChange(
                        e.target.value,
                        setAutoApprovalMinScore,
                        50,
                        100
                      )
                    }
                    min={50}
                    max={100}
                    className="w-20 text-right"
                  />
                  <span className="text-lg font-semibold text-green-600">%</span>
                </div>
              </div>
            </div>

            {/* Usar compatibilidade */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5">
                <Label>Considerar Compatibilidade com a Vaga</Label>
                <p className="text-sm text-muted-foreground">
                  Alem do score, tambem verificar a compatibilidade especifica com a vaga
                </p>
              </div>
              <Switch
                checked={autoApprovalUseCompatibility}
                onCheckedChange={setAutoApprovalUseCompatibility}
              />
            </div>

            {/* Compatibilidade minima */}
            {autoApprovalUseCompatibility && (
              <div className="space-y-4 pl-4 border-l-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compatibilidade Minima</Label>
                    <p className="text-sm text-muted-foreground">
                      Compatibilidade minima com a vaga para aprovacao (50-100%)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={autoApprovalMinCompatibility}
                      onChange={(e) =>
                        handleScoreChange(
                          e.target.value,
                          setAutoApprovalMinCompatibility,
                          50,
                          100
                        )
                      }
                      min={50}
                      max={100}
                      className="w-20 text-right"
                    />
                    <span className="text-lg font-semibold text-green-600">%</span>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Notificacoes */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Notificacoes</Label>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label>Notificar Time</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar email ao time quando um candidato for aprovado
                    </p>
                  </div>
                </div>
                <Switch
                  checked={autoApprovalNotifyTeam}
                  onCheckedChange={setAutoApprovalNotifyTeam}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label>Notificar Candidato</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar email ao candidato informando a aprovacao
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
                    onChange={(e) =>
                      setAutoApprovalCandidateMessage(e.target.value)
                    }
                    placeholder="Deixe em branco para usar a mensagem padrao..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se deixar em branco, usaremos uma mensagem padrao de parabens
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Reprovacao Automatica */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle>Reprovacao Automatica</CardTitle>
                <CardDescription>
                  Reprove automaticamente candidatos com score muito baixo
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={autoRejectEnabled}
              onCheckedChange={setAutoRejectEnabled}
            />
          </div>
        </CardHeader>

        {autoRejectEnabled && (
          <CardContent className="space-y-6">
            <Separator />

            {/* Score maximo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Score Maximo para Reprovacao</Label>
                  <p className="text-sm text-muted-foreground">
                    Candidatos com score igual ou abaixo serao reprovados (0-50%)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={autoRejectMaxScore}
                    onChange={(e) =>
                      handleScoreChange(
                        e.target.value,
                        setAutoRejectMaxScore,
                        0,
                        50
                      )
                    }
                    min={0}
                    max={50}
                    className="w-20 text-right"
                  />
                  <span className="text-lg font-semibold text-red-600">%</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Notificacoes */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Notificacoes</Label>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label>Notificar Candidato</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar email ao candidato informando a reprovacao
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
                    onChange={(e) =>
                      setAutoRejectCandidateMessage(e.target.value)
                    }
                    placeholder="Deixe em branco para usar a mensagem padrao..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se deixar em branco, usaremos uma mensagem educada de agradecimento
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Aviso de conflito */}
      {autoApprovalEnabled &&
        autoRejectEnabled &&
        autoApprovalMinScore <= autoRejectMaxScore && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Zap className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-medium mb-1">Atencao!</p>
                  <p className="text-amber-800">
                    O score minimo de aprovacao ({autoApprovalMinScore}%) deve ser
                    maior que o score maximo de reprovacao ({autoRejectMaxScore}%).
                    Ajuste os valores para evitar conflitos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Botao Salvar */}
      <div className="flex justify-end gap-4">
        <Link href="/time">
          <Button variant="outline">Cancelar</Button>
        </Link>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar Configuracoes
        </Button>
      </div>
    </div>
  );
}
