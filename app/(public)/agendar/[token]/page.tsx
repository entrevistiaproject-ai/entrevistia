"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface SchedulingData {
  titulo: string;
  descricao?: string;
  tipo: string;
  duracaoMinutos: number;
  recrutador: string;
  empresa: string;
  slots: Record<string, TimeSlot[]>;
}

export default function AgendarPage() {
  const params = useParams();
  const token = params.token as string;

  const [data, setData] = useState<SchedulingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmResult, setConfirmResult] = useState<{
    titulo: string;
    dataInicio: string;
    dataFim: string;
    meetLink?: string;
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  async function fetchData() {
    try {
      const res = await fetch(`/api/agendamentos/self-scheduling/${token}`);
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Link inválido");
        return;
      }
      const result = await res.json();
      setData(result);

      // Selecionar primeiro dia com slots
      const days = Object.keys(result.slots);
      if (days.length > 0) setSelectedDay(days[0]);
    } catch {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm() {
    if (!selectedSlot) return;
    setConfirming(true);

    try {
      const res = await fetch(`/api/agendamentos/self-scheduling/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotStart: selectedSlot.start,
          slotEnd: selectedSlot.end,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Erro ao confirmar");
        return;
      }

      const result = await res.json();
      setConfirmed(true);
      setConfirmResult(result.agendamento);
    } catch {
      setError("Erro ao confirmar agendamento");
    } finally {
      setConfirming(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Link indisponível</h2>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (confirmed && confirmResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold">Agendado com sucesso!</h2>
            <div className="space-y-2 text-left bg-muted/50 p-4 rounded-lg">
              <p className="font-medium">{confirmResult.titulo}</p>
              <p className="text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 inline mr-1" />
                {format(new Date(confirmResult.dataInicio), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
              <p className="text-sm text-muted-foreground">
                <Clock className="h-4 w-4 inline mr-1" />
                {format(new Date(confirmResult.dataInicio), "HH:mm")} - {format(new Date(confirmResult.dataFim), "HH:mm")}
              </p>
              {confirmResult.meetLink && (
                <a
                  href={confirmResult.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-indigo-600 hover:underline mt-2"
                >
                  Link da reunião (Google Meet)
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Você receberá um email de confirmação em breve.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const days = Object.keys(data.slots).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-indigo-600">Entrevistia</h1>
          <h2 className="text-xl font-semibold">{data.titulo}</h2>
          {data.descricao && (
            <p className="text-muted-foreground">{data.descricao}</p>
          )}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            {data.recrutador && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {data.recrutador}
              </span>
            )}
            {data.empresa && (
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" /> {data.empresa}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {data.duracaoMinutos} min
            </span>
          </div>
        </div>

        {/* Seleção de dia */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Escolha uma data</CardTitle>
          </CardHeader>
          <CardContent>
            {days.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Nenhum horário disponível no momento. Entre em contato com o recrutador.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <Button
                    key={day}
                    variant={selectedDay === day ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedSlot(null);
                    }}
                  >
                    {format(parseISO(day), "EEE, dd/MM", { locale: ptBR })}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {data.slots[day].length}
                    </Badge>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seleção de horário */}
        {selectedDay && data.slots[selectedDay] && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Horários disponíveis - {format(parseISO(selectedDay), "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {data.slots[selectedDay].map((slot, i) => (
                  <Button
                    key={i}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSlot(slot)}
                    className="w-full"
                  >
                    {format(new Date(slot.start), "HH:mm")}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirmação */}
        {selectedSlot && (
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{data.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedSlot.start), "EEEE, dd 'de' MMMM", { locale: ptBR })} das{" "}
                    {format(new Date(selectedSlot.start), "HH:mm")} às{" "}
                    {format(new Date(selectedSlot.end), "HH:mm")}
                  </p>
                </div>
                <Button onClick={handleConfirm} disabled={confirming}>
                  {confirming ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  {confirming ? "Confirmando..." : "Confirmar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
