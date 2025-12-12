"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  Settings,
  Gift,
  Package,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Loader2,
  Info,
  History,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ConfigValue {
  value: unknown;
  valueType: string;
  category: string;
  description: string;
  fromDatabase: boolean;
}

interface ConfigState {
  configs: Record<string, ConfigValue>;
  grouped: Record<string, Array<{
    key: string;
    value: unknown;
    valueType: string;
    description: string;
    fromDatabase: boolean;
  }>>;
  keys: Record<string, string>;
}

// Chaves de configuração agrupadas por seção
const CONFIG_SECTIONS = {
  pricing: {
    title: "Preços",
    description: "Configure os valores cobrados por candidato e por análise",
    icon: DollarSign,
    fields: [
      { key: "pricing.taxa_base_candidato", label: "Taxa Base por Candidato", unit: "R$", step: "0.01" },
      { key: "pricing.analise_por_pergunta", label: "Análise por Pergunta", unit: "R$", step: "0.01" },
      { key: "pricing.taxa_cambio_usd_brl", label: "Taxa de Câmbio USD/BRL", unit: "", step: "0.01" },
    ],
  },
  trial: {
    title: "Plano Gratuito",
    description: "Configure os limites e duração do período de avaliação gratuita",
    icon: Gift,
    fields: [
      { key: "trial.limite_financeiro", label: "Limite de Crédito", unit: "R$", step: "1" },
      { key: "trial.duracao_dias", label: "Duração do Trial", unit: "dias", step: "1" },
      { key: "trial.ativo", label: "Trial Ativo", type: "boolean" },
    ],
  },
  pacotes: {
    title: "Pacotes de Crédito",
    description: "Configure os pacotes de crédito disponíveis para compra",
    icon: Package,
    groups: [
      {
        name: "Starter",
        fields: [
          { key: "pacote.starter.creditos", label: "Créditos", unit: "", step: "1" },
          { key: "pacote.starter.valor", label: "Valor", unit: "R$", step: "1" },
          { key: "pacote.starter.desconto", label: "Desconto", unit: "%", step: "1" },
        ],
      },
      {
        name: "Professional",
        fields: [
          { key: "pacote.professional.creditos", label: "Créditos", unit: "", step: "1" },
          { key: "pacote.professional.valor", label: "Valor", unit: "R$", step: "1" },
          { key: "pacote.professional.desconto", label: "Desconto", unit: "%", step: "1" },
        ],
      },
      {
        name: "Business",
        fields: [
          { key: "pacote.business.creditos", label: "Créditos", unit: "", step: "1" },
          { key: "pacote.business.valor", label: "Valor", unit: "R$", step: "1" },
          { key: "pacote.business.desconto", label: "Desconto", unit: "%", step: "1" },
        ],
      },
      {
        name: "Enterprise",
        fields: [
          { key: "pacote.enterprise.creditos", label: "Créditos", unit: "", step: "1" },
          { key: "pacote.enterprise.valor", label: "Valor", unit: "R$", step: "1" },
          { key: "pacote.enterprise.desconto", label: "Desconto", unit: "%", step: "1" },
        ],
      },
    ],
  },
};

export default function ConfiguracoesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configState, setConfigState] = useState<ConfigState | null>(null);
  const [editedValues, setEditedValues] = useState<Record<string, unknown>>({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [changeReason, setChangeReason] = useState("");
  const [activeTab, setActiveTab] = useState("pricing");
  const { toast } = useToast();

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/configuracoes");
      if (response.ok) {
        const data = await response.json();
        setConfigState(data);
        // Inicializar valores editados com os valores atuais
        const initialValues: Record<string, unknown> = {};
        for (const [key, config] of Object.entries(data.configs)) {
          initialValues[key] = (config as ConfigValue).value;
        }
        setEditedValues(initialValues);
      }
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
      toast({ title: "Erro", description: "Erro ao carregar configurações", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (key: string, value: unknown) => {
    setEditedValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const hasChanges = () => {
    if (!configState) return false;
    for (const [key, value] of Object.entries(editedValues)) {
      const original = configState.configs[key]?.value;
      if (String(value) !== String(original)) {
        return true;
      }
    }
    return false;
  };

  const getChangedConfigs = () => {
    if (!configState) return [];
    const changes: Array<{ key: string; oldValue: unknown; newValue: unknown }> = [];
    for (const [key, value] of Object.entries(editedValues)) {
      const original = configState.configs[key]?.value;
      if (String(value) !== String(original)) {
        changes.push({ key, oldValue: original, newValue: value });
      }
    }
    return changes;
  };

  const handleSave = async () => {
    const changes = getChangedConfigs();
    if (changes.length === 0) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/configuracoes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configs: changes.map((c) => ({ key: c.key, value: c.newValue })),
          reason: changeReason || undefined,
        }),
      });

      if (response.ok) {
        toast({ title: "Sucesso", description: "Configurações salvas com sucesso!" });
        setConfirmDialogOpen(false);
        setChangeReason("");
        await fetchConfigs();
      } else {
        const data = await response.json();
        toast({ title: "Erro", description: data.error || "Erro ao salvar configurações", variant: "destructive" });
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({ title: "Erro", description: "Erro ao salvar configurações", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Calcular exemplo de custo
  const calcularExemplo = (perguntas: number, candidatos: number) => {
    const taxaBase = Number(editedValues["pricing.taxa_base_candidato"] || 1);
    const analisePergunta = Number(editedValues["pricing.analise_por_pergunta"] || 0.25);
    const custoPorCandidato = taxaBase + (perguntas * analisePergunta);
    const custoTotal = custoPorCandidato * candidatos;
    return { custoPorCandidato, custoTotal };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-300">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurações do Sistema</h1>
          <p className="text-slate-300">
            Gerencie preços, limites de trial e pacotes de crédito
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchConfigs}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            Atualizar
          </Button>
          <Button
            onClick={() => setConfirmDialogOpen(true)}
            disabled={!hasChanges() || saving}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Aviso de alterações pendentes */}
      {hasChanges() && (
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400" />
            <p className="text-amber-400 text-sm">
              Você tem alterações não salvas. Clique em &quot;Salvar Alterações&quot; para aplicá-las.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="pricing" className="data-[state=active]:bg-primary">
            <DollarSign className="h-4 w-4 mr-2" />
            Preços
          </TabsTrigger>
          <TabsTrigger value="trial" className="data-[state=active]:bg-primary">
            <Gift className="h-4 w-4 mr-2" />
            Plano Gratuito
          </TabsTrigger>
          <TabsTrigger value="pacotes" className="data-[state=active]:bg-primary">
            <Package className="h-4 w-4 mr-2" />
            Pacotes
          </TabsTrigger>
        </TabsList>

        {/* Tab: Preços */}
        <TabsContent value="pricing" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Configurações de Preço
              </CardTitle>
              <CardDescription className="text-slate-300">
                Configure os valores cobrados por cada operação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {CONFIG_SECTIONS.pricing.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label className="text-white">{field.label}</Label>
                  <div className="flex items-center gap-3">
                    {field.unit && field.unit !== "" && (
                      <span className="text-slate-300 text-sm w-8">{field.unit}</span>
                    )}
                    <Input
                      type="number"
                      step={field.step}
                      min="0"
                      value={String(editedValues[field.key] || "")}
                      onChange={(e) => handleValueChange(field.key, parseFloat(e.target.value) || 0)}
                      className="bg-slate-800/50 border-slate-700 text-white max-w-xs"
                    />
                    {configState?.configs[field.key]?.fromDatabase && (
                      <Badge variant="outline" className="text-emerald-300 border-emerald-400/40">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Personalizado
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {configState?.configs[field.key]?.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Simulador de custos */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-400" />
                Simulador de Custos
              </CardTitle>
              <CardDescription className="text-slate-300">
                Veja como os preços afetam o custo por candidato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <p className="text-xs text-slate-300 mb-1">5 perguntas</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(calcularExemplo(5, 1).custoPorCandidato)}
                  </p>
                  <p className="text-xs text-slate-400">por candidato</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <p className="text-xs text-slate-300 mb-1">10 perguntas</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(calcularExemplo(10, 1).custoPorCandidato)}
                  </p>
                  <p className="text-xs text-slate-400">por candidato</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <p className="text-xs text-slate-300 mb-1">15 perguntas</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(calcularExemplo(15, 1).custoPorCandidato)}
                  </p>
                  <p className="text-xs text-slate-400">por candidato</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-300">
                    <strong>Fórmula:</strong> Custo por Candidato = Taxa Base + (Nº Perguntas × Análise por Pergunta)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Plano Gratuito */}
        <TabsContent value="trial" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gift className="h-5 w-5 text-emerald-400" />
                Configurações do Plano Gratuito
              </CardTitle>
              <CardDescription className="text-slate-300">
                Configure os limites e duração do período de avaliação gratuita
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Switch para ativar/desativar trial */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                <div className="space-y-0.5">
                  <Label className="text-white">Trial Ativo</Label>
                  <p className="text-xs text-slate-400">
                    Novos usuários receberão crédito de trial ao se cadastrar
                  </p>
                </div>
                <Switch
                  checked={editedValues["trial.ativo"] === true || editedValues["trial.ativo"] === "true"}
                  onCheckedChange={(checked) => handleValueChange("trial.ativo", checked)}
                />
              </div>

              {/* Limite financeiro */}
              <div className="space-y-2">
                <Label className="text-white">Limite de Crédito do Trial</Label>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm w-8">R$</span>
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    value={String(editedValues["trial.limite_financeiro"] || "")}
                    onChange={(e) => handleValueChange("trial.limite_financeiro", parseFloat(e.target.value) || 0)}
                    className="bg-slate-800/50 border-slate-700 text-white max-w-xs"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Valor em créditos que cada novo usuário recebe gratuitamente
                </p>
              </div>

              {/* Duração */}
              <div className="space-y-2">
                <Label className="text-white">Duração do Trial</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    value={String(editedValues["trial.duracao_dias"] || "")}
                    onChange={(e) => handleValueChange("trial.duracao_dias", parseInt(e.target.value) || 0)}
                    className="bg-slate-800/50 border-slate-700 text-white max-w-xs"
                  />
                  <span className="text-slate-400 text-sm">dias</span>
                </div>
                <p className="text-xs text-slate-400">
                  Número de dias que o período de trial dura (0 = sem limite de tempo)
                </p>
              </div>

              {/* Estimativa de uso */}
              <Card className="bg-emerald-500/10 border-emerald-500/30">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium text-emerald-400 mb-3">
                    Estimativa de Uso do Trial
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-300">10 perguntas/candidato</p>
                      <p className="text-white font-medium">
                        ~{Math.floor(Number(editedValues["trial.limite_financeiro"] || 50) / calcularExemplo(10, 1).custoPorCandidato)} candidatos
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-300">8 perguntas/candidato</p>
                      <p className="text-white font-medium">
                        ~{Math.floor(Number(editedValues["trial.limite_financeiro"] || 50) / calcularExemplo(8, 1).custoPorCandidato)} candidatos
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-300">5 perguntas/candidato</p>
                      <p className="text-white font-medium">
                        ~{Math.floor(Number(editedValues["trial.limite_financeiro"] || 50) / calcularExemplo(5, 1).custoPorCandidato)} candidatos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Pacotes */}
        <TabsContent value="pacotes" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {CONFIG_SECTIONS.pacotes.groups?.map((group) => (
              <Card key={group.name} className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      {group.name}
                    </span>
                    {group.name === "Professional" && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Popular
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-slate-400 text-sm">{field.label}</Label>
                      <div className="flex items-center gap-2">
                        {field.unit && (
                          <span className="text-slate-400 text-sm w-8">{field.unit}</span>
                        )}
                        <Input
                          type="number"
                          step={field.step}
                          min="0"
                          value={String(editedValues[field.key] || "")}
                          onChange={(e) => handleValueChange(field.key, parseFloat(e.target.value) || 0)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Resumo do pacote */}
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">Valor por crédito:</span>
                      <span className="text-white font-medium">
                        {formatCurrency(
                          (Number(editedValues[`pacote.${group.name.toLowerCase()}.valor`] || 0)) /
                          (Number(editedValues[`pacote.${group.name.toLowerCase()}.creditos`] || 1))
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de confirmação */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Confirmar Alterações</DialogTitle>
            <DialogDescription className="text-slate-300">
              Você está prestes a alterar as seguintes configurações:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {getChangedConfigs().map((change) => (
              <div
                key={change.key}
                className="p-3 rounded-lg bg-slate-800/50 text-sm"
              >
                <p className="text-white font-medium">{change.key}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-red-400">{String(change.oldValue)}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-emerald-400">{String(change.newValue)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Motivo da alteração (opcional)</Label>
            <Textarea
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              placeholder="Ex: Ajuste de preços conforme nova tabela..."
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              className="border-slate-700"
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
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Confirmar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
