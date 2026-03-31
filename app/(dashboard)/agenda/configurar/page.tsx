"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Clock } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const DIAS_SEMANA = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];

interface SlotConfig {
  diaSemana: number;
  ativo: boolean;
  horaInicio: string;
  horaFim: string;
  duracaoSlotMinutos: number;
  intervaloMinutos: number;
}

export default function ConfigurarDisponibilidadePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [slots, setSlots] = useState<SlotConfig[]>(
    DIAS_SEMANA.map((dia) => ({
      diaSemana: dia.value,
      ativo: dia.value >= 1 && dia.value <= 5, // Seg-Sex ativo por padrão
      horaInicio: "09:00",
      horaFim: "18:00",
      duracaoSlotMinutos: 60,
      intervaloMinutos: 15,
    }))
  );

  useEffect(() => {
    fetchDisponibilidade();
  }, []);

  async function fetchDisponibilidade() {
    try {
      const res = await fetch("/api/agendamentos/disponibilidade");
      const data = await res.json();

      if (data.disponibilidades?.length > 0) {
        setSlots((prev) =>
          prev.map((slot) => {
            const existing = data.disponibilidades.find(
              (d: SlotConfig) => d.diaSemana === slot.diaSemana
            );
            if (existing) {
              return {
                ...slot,
                ativo: true,
                horaInicio: existing.horaInicio,
                horaFim: existing.horaFim,
                duracaoSlotMinutos: existing.duracaoSlotMinutos,
                intervaloMinutos: existing.intervaloMinutos,
              };
            }
            return { ...slot, ativo: false };
          })
        );
      }
    } catch {
      console.error("Erro ao buscar disponibilidade");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const activeSlots = slots
        .filter((s) => s.ativo)
        .map(({ diaSemana, horaInicio, horaFim, duracaoSlotMinutos, intervaloMinutos }) => ({
          diaSemana,
          horaInicio,
          horaFim,
          duracaoSlotMinutos,
          intervaloMinutos,
        }));

      const res = await fetch("/api/agendamentos/disponibilidade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots: activeSlots }),
      });

      if (res.ok) {
        toast({ title: "Disponibilidade salva com sucesso!" });
      } else {
        toast({ title: "Erro ao salvar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  function updateSlot(diaSemana: number, field: keyof SlotConfig, value: string | number | boolean) {
    setSlots((prev) =>
      prev.map((s) => (s.diaSemana === diaSemana ? { ...s, [field]: value } : s))
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/agenda">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Configurar Disponibilidade</h1>
          <p className="text-muted-foreground">
            Defina seus horários disponíveis para agendamento de entrevistas
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horários por Dia da Semana
          </CardTitle>
          <CardDescription>
            Configure os dias e horários em que você está disponível para entrevistas.
            Candidatos poderão agendar nos slots dentro desses horários.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {DIAS_SEMANA.map((dia) => {
            const slot = slots.find((s) => s.diaSemana === dia.value)!;
            return (
              <div
                key={dia.value}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                  slot.ativo ? "bg-background" : "bg-muted/50 opacity-60"
                }`}
              >
                <Switch
                  checked={slot.ativo}
                  onCheckedChange={(checked) => updateSlot(dia.value, "ativo", checked)}
                />
                <span className="font-medium w-36">{dia.label}</span>

                {slot.ativo && (
                  <>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">De</Label>
                      <Input
                        type="time"
                        value={slot.horaInicio}
                        onChange={(e) => updateSlot(dia.value, "horaInicio", e.target.value)}
                        className="w-28"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">Até</Label>
                      <Input
                        type="time"
                        value={slot.horaFim}
                        onChange={(e) => updateSlot(dia.value, "horaFim", e.target.value)}
                        className="w-28"
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* Configurações globais */}
          <div className="border-t pt-4 mt-4 space-y-3">
            <h3 className="font-medium">Configurações de Slot</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duração padrão (minutos)</Label>
                <Input
                  type="number"
                  value={slots[0]?.duracaoSlotMinutos || 60}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setSlots((prev) => prev.map((s) => ({ ...s, duracaoSlotMinutos: value })));
                  }}
                  min={15}
                  max={240}
                  step={15}
                />
              </div>
              <div>
                <Label>Intervalo entre slots (minutos)</Label>
                <Input
                  type="number"
                  value={slots[0]?.intervaloMinutos || 15}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setSlots((prev) => prev.map((s) => ({ ...s, intervaloMinutos: value })));
                  }}
                  min={0}
                  max={60}
                  step={5}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Salvando..." : "Salvar Disponibilidade"}
        </Button>
      </div>
    </div>
  );
}
