"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Video,
  User,
  Settings,
  Link2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  subWeeks,
  subMonths,
  isSameDay,
  isToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";

interface Agendamento {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: string;
  status: string;
  dataInicio: string;
  dataFim: string;
  local?: string;
  linkReuniao?: string;
  plataforma?: string;
  candidatoNome?: string;
  candidatoEmail?: string;
  entrevistaTitulo?: string;
  confirmadoEm?: string;
  canceladoEm?: string;
}

const statusColors: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  reagendado: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  cancelado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  realizado: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
  no_show: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

const statusLabels: Record<string, string> = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  reagendado: "Reagendado",
  cancelado: "Cancelado",
  realizado: "Realizado",
  no_show: "Não compareceu",
};

function AgendaContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"semana" | "mes">("semana");
  const [googleConnected, setGoogleConnected] = useState(false);
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);

  // Mostrar mensagens de sucesso/erro do callback OAuth
  const success = searchParams.get("success");
  const error = searchParams.get("error");

  useEffect(() => {
    fetchEvents();
    checkGoogleCalendar();
  }, [currentDate, view]);

  async function fetchEvents() {
    setLoading(true);
    const start = view === "semana"
      ? startOfWeek(currentDate, { locale: ptBR })
      : startOfMonth(currentDate);
    const end = view === "semana"
      ? endOfWeek(currentDate, { locale: ptBR })
      : endOfMonth(currentDate);

    try {
      const res = await fetch(
        `/api/agendamentos?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      console.error("Erro ao buscar agendamentos");
    } finally {
      setLoading(false);
    }
  }

  async function checkGoogleCalendar() {
    try {
      const res = await fetch("/api/calendar/google/status");
      const data = await res.json();
      setGoogleConnected(data.connected);
      setGoogleEmail(data.email || null);
    } catch {
      // Silencioso
    }
  }

  function navigatePrev() {
    setCurrentDate(view === "semana" ? subWeeks(currentDate, 1) : subMonths(currentDate, 1));
  }

  function navigateNext() {
    setCurrentDate(view === "semana" ? addWeeks(currentDate, 1) : addMonths(currentDate, 1));
  }

  function navigateToday() {
    setCurrentDate(new Date());
  }

  function getEventsForDay(date: Date) {
    return events.filter((e) => isSameDay(new Date(e.dataInicio), date));
  }

  // Gerar dias para a view atual
  const days: Date[] = [];
  if (view === "semana") {
    const weekStart = startOfWeek(currentDate, { locale: ptBR });
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }
  } else {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calStart = startOfWeek(monthStart, { locale: ptBR });
    const calEnd = endOfWeek(monthEnd, { locale: ptBR });
    let d = calStart;
    while (d <= calEnd) {
      days.push(d);
      d = addDays(d, 1);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie entrevistas e eventos do processo seletivo
          </p>
        </div>
        <div className="flex items-center gap-2">
          {googleConnected ? (
            <Badge variant="outline" className="gap-1 text-green-600">
              <CheckCircle className="h-3 w-3" />
              Google Calendar: {googleEmail || "Conectado"}
            </Badge>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <a href="/api/calendar/google/connect">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Conectar Google Calendar
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a href="/agenda/configurar">
              <Settings className="h-4 w-4 mr-2" />
              Disponibilidade
            </a>
          </Button>
        </div>
      </div>

      {/* Mensagens do OAuth */}
      {success === "google_connected" && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800 dark:text-green-300">
            Google Calendar conectado com sucesso!
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
          <XCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-800 dark:text-red-300">
            Erro ao conectar Google Calendar. Tente novamente.
          </span>
        </div>
      )}

      {/* Controles de Navegação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={navigatePrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={navigateToday}>
            Hoje
          </Button>
          <Button variant="outline" size="sm" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold ml-2">
            {view === "semana"
              ? `${format(startOfWeek(currentDate, { locale: ptBR }), "dd MMM", { locale: ptBR })} - ${format(endOfWeek(currentDate, { locale: ptBR }), "dd MMM yyyy", { locale: ptBR })}`
              : format(currentDate, "MMMM yyyy", { locale: ptBR })}
          </h2>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "semana" | "mes")}>
          <TabsList>
            <TabsTrigger value="semana">Semana</TabsTrigger>
            <TabsTrigger value="mes">Mês</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Calendário */}
      <Card>
        <CardContent className="p-0">
          {/* Header dos dias */}
          <div className={`grid ${view === "semana" ? "grid-cols-7" : "grid-cols-7"} border-b`}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid de dias */}
          <div className={`grid grid-cols-7 ${view === "mes" ? "auto-rows-[120px]" : "auto-rows-[200px]"}`}>
            {days.map((day, i) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();

              return (
                <div
                  key={i}
                  className={`border-r border-b last:border-r-0 p-2 ${
                    !isCurrentMonth && view === "mes" ? "bg-muted/30" : ""
                  } ${isToday(day) ? "bg-primary/5" : ""}`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday(day)
                      ? "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center"
                      : "text-muted-foreground"
                  }`}>
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1 overflow-y-auto max-h-[calc(100%-28px)]">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1.5 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                          statusColors[event.status] || "bg-muted"
                        }`}
                        title={`${event.titulo} - ${format(new Date(event.dataInicio), "HH:mm")} às ${format(new Date(event.dataFim), "HH:mm")}`}
                      >
                        <div className="font-medium truncate">{event.titulo}</div>
                        <div className="text-[10px] opacity-75">
                          {format(new Date(event.dataInicio), "HH:mm")}
                          {event.candidatoNome && ` • ${event.candidatoNome}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Próximos Eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse" />
              ))}
            </div>
          ) : events.filter((e) => new Date(e.dataInicio) >= new Date() && e.status !== "cancelado").length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum evento futuro agendado</p>
            </div>
          ) : (
            <div className="space-y-3">
              {events
                .filter((e) => new Date(e.dataInicio) >= new Date() && e.status !== "cancelado")
                .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())
                .slice(0, 10)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    {/* Data */}
                    <div className="text-center min-w-[60px]">
                      <div className="text-2xl font-bold">
                        {format(new Date(event.dataInicio), "dd")}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {format(new Date(event.dataInicio), "MMM", { locale: ptBR })}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{event.titulo}</div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {format(new Date(event.dataInicio), "HH:mm")} - {format(new Date(event.dataFim), "HH:mm")}
                        </span>
                        {event.candidatoNome && (
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {event.candidatoNome}
                          </span>
                        )}
                        {event.linkReuniao && (
                          <a
                            href={event.linkReuniao}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <Video className="h-3.5 w-3.5" />
                            Entrar
                          </a>
                        )}
                        {event.local && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.local}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <Badge className={statusColors[event.status]}>
                      {statusLabels[event.status]}
                    </Badge>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AgendaPage() {
  return (
    <Suspense fallback={<div className="space-y-4"><div className="h-8 w-48 bg-muted rounded animate-pulse" /><div className="h-96 bg-muted rounded animate-pulse" /></div>}>
      <AgendaContent />
    </Suspense>
  );
}
