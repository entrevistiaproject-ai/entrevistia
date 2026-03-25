"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  Download,
  Trash2,
  Shield,
  Eye,
  FileEdit,
  XCircle,
  Mail,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface DadosCandidato {
  exportadoEm: string;
  titular: {
    nome: string;
    email: string;
    telefone: string;
    cadastradoEm: string;
  };
  consentimentos: {
    aceitouTermosEntrevista: boolean;
    consentimentoTratamentoDados: boolean;
    dataAceiteTermos: string;
  };
  preferencias: {
    status: string;
    cidade: string;
    estado: string;
  } | null;
  experiencias: Array<{
    cargo: string;
    empresa: string;
  }>;
  formacoes: Array<{
    curso: string;
    instituicao: string;
  }>;
  skills: Array<{
    nome: string;
  }>;
  entrevistas: Array<{
    status: string;
  }>;
}

export default function MeusDadosPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [dados, setDados] = useState<DadosCandidato | null>(null);
  const [candidatoId, setCandidatoId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [exclusaoAgendada, setExclusaoAgendada] = useState<Date | null>(null);

  // Verifica se já tem sessão
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Tenta buscar dados se já estiver autenticado
      const response = await fetch("/api/meus-dados/verificar");
      if (response.ok) {
        const data = await response.json();
        setAuthenticated(true);
        setCandidatoId(data.candidatoId);
        await fetchDados(data.candidatoId);
      }
    } catch (error) {
      // Não autenticado, mostra formulário
    }
  };

  const handleSolicitarAcesso = async () => {
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tipo: "login",
        }),
      });

      if (response.ok) {
        toast({
          title: "Link enviado!",
          description: "Verifique seu email para acessar seus dados",
        });
      } else {
        throw new Error("Erro ao enviar link");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o link de acesso",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDados = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/candidatos/${id}/lgpd`);
      if (response.ok) {
        const data = await response.json();
        setDados(data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportarDados = async () => {
    if (!candidatoId) return;

    try {
      const response = await fetch(`/api/candidatos/${candidatoId}/lgpd`);
      const data = await response.json();

      // Cria arquivo JSON para download
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `meus-dados-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Sucesso",
        description: "Seus dados foram exportados",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível exportar os dados",
        variant: "destructive",
      });
    }
  };

  const handleSolicitarExclusao = async () => {
    if (!candidatoId) return;

    try {
      setPendingAction("exclusao");
      const response = await fetch(`/api/candidatos/${candidatoId}/lgpd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "exclusao" }),
      });

      const data = await response.json();

      if (response.ok) {
        setExclusaoAgendada(new Date(data.dataExclusaoAgendada));
        toast({
          title: "Solicitação registrada",
          description: data.message,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível processar a solicitação",
        variant: "destructive",
      });
    } finally {
      setPendingAction(null);
    }
  };

  const handleCancelarExclusao = async () => {
    if (!candidatoId) return;

    try {
      const response = await fetch(`/api/candidatos/${candidatoId}/lgpd`, {
        method: "DELETE",
      });

      if (response.ok) {
        setExclusaoAgendada(null);
        toast({
          title: "Cancelado",
          description: "A solicitação de exclusão foi cancelada",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cancelar a solicitação",
        variant: "destructive",
      });
    }
  };

  const handleRevogarConsentimento = async () => {
    if (!candidatoId) return;

    try {
      setPendingAction("revogacao");
      const response = await fetch(`/api/candidatos/${candidatoId}/lgpd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "revogacao_consentimento" }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Consentimentos revogados",
          description: data.message,
        });
        // Recarrega dados
        await fetchDados(candidatoId);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível revogar os consentimentos",
        variant: "destructive",
      });
    } finally {
      setPendingAction(null);
    }
  };

  // Tela de login (não autenticado)
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle>Seus Dados Pessoais</CardTitle>
            <CardDescription>
              Acesse, exporte ou solicite a exclusão dos seus dados conforme a LGPD
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email cadastrado</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSolicitarAcesso}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              Enviar link de acesso
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Enviaremos um link seguro para o seu email cadastrado
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de carregamento
  if (loading && !dados) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Tela principal (autenticado)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6 py-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Seus Dados Pessoais</h1>
          <p className="text-muted-foreground">
            Gerencie seus dados conforme garantido pela Lei Geral de Proteção de Dados (LGPD)
          </p>
        </div>

        {/* Alerta de exclusão agendada */}
        {exclusaoAgendada && (
          <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Exclusão agendada
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Seus dados serão excluídos em{" "}
                    {exclusaoAgendada.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleCancelarExclusao}>
                Cancelar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Resumo dos dados */}
        {dados && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Resumo dos seus dados
              </CardTitle>
              <CardDescription>
                Dados coletados e armazenados sobre você
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Nome</p>
                <p className="text-sm text-muted-foreground">{dados.titular.nome}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{dados.titular.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Telefone</p>
                <p className="text-sm text-muted-foreground">
                  {dados.titular.telefone || "Não informado"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Cadastrado em</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(dados.titular.cadastradoEm).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Experiências</p>
                <p className="text-sm text-muted-foreground">
                  {dados.experiencias.length} registros
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Skills</p>
                <p className="text-sm text-muted-foreground">
                  {dados.skills.length} registros
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Entrevistas</p>
                <p className="text-sm text-muted-foreground">
                  {dados.entrevistas.length} participações
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Consentimentos</p>
                <div className="flex gap-2">
                  {dados.consentimentos.consentimentoTratamentoDados ? (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <XCircle className="h-3 w-3 mr-1" />
                      Revogado
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Exportar dados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Download className="h-5 w-5" />
                Exportar dados
              </CardTitle>
              <CardDescription>
                Baixe todos os seus dados em formato JSON (portabilidade)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExportarDados} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Baixar meus dados
              </Button>
            </CardContent>
          </Card>

          {/* Revogar consentimento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <XCircle className="h-5 w-5" />
                Revogar consentimentos
              </CardTitle>
              <CardDescription>
                Retire seu consentimento para tratamento de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {pendingAction === "revogacao" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Revogar consentimentos
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Revogar consentimentos?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ao revogar seus consentimentos, seus dados não poderão mais ser
                      utilizados para processos seletivos. Você pode fornecer novo
                      consentimento a qualquer momento.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRevogarConsentimento}>
                      Confirmar revogação
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Solicitar exclusão */}
          <Card className="sm:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                <Trash2 className="h-5 w-5" />
                Excluir meus dados
              </CardTitle>
              <CardDescription>
                Solicite a exclusão permanente de todos os seus dados. A exclusão será
                efetivada em 30 dias, período no qual você pode cancelar a solicitação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={!!exclusaoAgendada}>
                    {pendingAction === "exclusao" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Solicitar exclusão
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação agendará a exclusão permanente de todos os seus dados
                      em 30 dias. Durante este período, você pode cancelar a
                      solicitação. Após a exclusão, não será possível recuperar os
                      dados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSolicitarExclusao}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Confirmar exclusão
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>

        {/* Informações sobre LGPD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seus direitos garantidos pela LGPD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Acesso:</strong> Você pode acessar todos os dados que coletamos
                  sobre você a qualquer momento.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Correção:</strong> Você pode solicitar a correção de dados
                  incompletos, inexatos ou desatualizados.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Exclusão:</strong> Você pode solicitar a exclusão dos seus
                  dados pessoais.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Portabilidade:</strong> Você pode exportar seus dados em
                  formato estruturado.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Revogação:</strong> Você pode revogar seu consentimento a
                  qualquer momento.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Dúvidas sobre privacidade?{" "}
            <a
              href="mailto:privacidade@entrevistia.com.br"
              className="text-primary hover:underline"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
