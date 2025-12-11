"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Crown,
  Shield,
  UserCheck,
  Eye,
  LogIn,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface InvitationData {
  invitation: {
    id: string;
    invitedEmail: string;
    invitedName: string | null;
    role: string;
    message: string | null;
    status: string;
    expiresAt: string;
    createdAt: string;
  };
  owner: {
    nome: string;
    empresa: string | null;
  } | null;
  isExpired: boolean;
  isUsed: boolean;
  canAccept: boolean;
}

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  recruiter: "Recrutador",
  viewer: "Visualizador",
};

const roleDescriptions: Record<string, string> = {
  admin: "Pode gerenciar membros, configuracoes e todas as funcionalidades",
  recruiter: "Pode criar entrevistas, avaliar candidatos e aprovar/reprovar",
  viewer: "Apenas visualizacao de dados, sem poder de edicao",
};

const roleIcons: Record<string, React.ElementType> = {
  admin: Shield,
  recruiter: UserCheck,
  viewer: Eye,
};

const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-800 border-purple-200",
  recruiter: "bg-blue-100 text-blue-800 border-blue-200",
  viewer: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function ConviteTimePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState<InvitationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ accepted: boolean } | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  // Carregar dados do convite
  useEffect(() => {
    fetchInvitation();
  }, [token]);

  async function fetchInvitation() {
    try {
      const res = await fetch(`/api/time/convite/aceitar/${token}`);
      const responseData = await res.json();

      if (res.ok) {
        setData(responseData);
      } else {
        setError(responseData.error || "Convite nao encontrado");
      }
    } catch (err) {
      console.error("Erro ao carregar convite:", err);
      setError("Erro ao carregar convite");
    } finally {
      setLoading(false);
    }
  }

  // Aceitar convite
  async function handleAccept() {
    setProcessing(true);
    try {
      const res = await fetch(`/api/time/convite/aceitar/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept" }),
      });

      const responseData = await res.json();

      if (res.ok) {
        setSuccess({ accepted: true });
      } else if (res.status === 401) {
        setNeedsAuth(true);
      } else {
        setError(responseData.error || "Erro ao aceitar convite");
      }
    } catch (err) {
      console.error("Erro ao aceitar convite:", err);
      setError("Erro ao aceitar convite");
    } finally {
      setProcessing(false);
    }
  }

  // Recusar convite
  async function handleReject() {
    setProcessing(true);
    try {
      const res = await fetch(`/api/time/convite/aceitar/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject" }),
      });

      const responseData = await res.json();

      if (res.ok) {
        setSuccess({ accepted: false });
      } else if (res.status === 401) {
        setNeedsAuth(true);
      } else {
        setError(responseData.error || "Erro ao recusar convite");
      }
    } catch (err) {
      console.error("Erro ao recusar convite:", err);
      setError("Erro ao recusar convite");
    } finally {
      setProcessing(false);
    }
  }

  // Iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Tela de sucesso
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-8 space-y-6">
            <div
              className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                success.accepted ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              {success.accepted ? (
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-gray-600" />
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {success.accepted
                  ? "Convite Aceito!"
                  : "Convite Recusado"}
              </h1>
              <p className="text-muted-foreground">
                {success.accepted
                  ? "Voce agora faz parte do time. Acesse o dashboard para comecar."
                  : "Voce recusou o convite. O time foi notificado."}
              </p>
            </div>

            {success.accepted && (
              <Link href="/dashboard">
                <Button className="w-full">Ir para o Dashboard</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de precisa de autenticacao
  if (needsAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-8 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-amber-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Faca Login para Continuar</h1>
              <p className="text-muted-foreground">
                Voce precisa estar logado para aceitar este convite. Se voce
                ainda nao tem uma conta, crie uma com o mesmo email do convite.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(
                  `/convite-time/${token}`
                )}`}
              >
                <Button className="w-full">Fazer Login</Button>
              </Link>
              <Link
                href={`/cadastro?email=${encodeURIComponent(
                  data?.invitation.invitedEmail || ""
                )}&callbackUrl=${encodeURIComponent(`/convite-time/${token}`)}`}
              >
                <Button variant="outline" className="w-full">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de erro
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-8 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Convite Invalido</h1>
              <p className="text-muted-foreground">
                {error || "Este convite nao existe ou ja foi utilizado."}
              </p>
            </div>

            <Link href="/">
              <Button variant="outline" className="w-full">
                Voltar ao Inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Convite expirado ou usado
  if (data.isExpired || data.isUsed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-8 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-8 w-8 text-amber-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {data.isExpired ? "Convite Expirado" : "Convite Ja Utilizado"}
              </h1>
              <p className="text-muted-foreground">
                {data.isExpired
                  ? "Este convite expirou. Solicite um novo convite ao administrador do time."
                  : `Este convite ja foi ${
                      data.invitation.status === "accepted"
                        ? "aceito"
                        : "recusado"
                    }.`}
              </p>
            </div>

            <Link href="/">
              <Button variant="outline" className="w-full">
                Voltar ao Inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Convite valido - mostrar detalhes
  const RoleIcon = roleIcons[data.invitation.role] || Eye;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl">Convite para Time</CardTitle>
          <CardDescription>
            Voce foi convidado(a) para fazer parte de um time na EntrevistIA
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quem convidou */}
          {data.owner && (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-indigo-100 text-indigo-700">
                  {getInitials(data.owner.nome)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{data.owner.nome}</p>
                <p className="text-sm text-muted-foreground">
                  {data.owner.empresa || "Time de Recrutamento"}
                </p>
              </div>
            </div>
          )}

          {/* Mensagem personalizada */}
          {data.invitation.message && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-sm text-blue-900 italic">
                &quot;{data.invitation.message}&quot;
              </p>
            </div>
          )}

          {/* Role */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Sua funcao no time:
            </p>
            <div className="flex items-center gap-3 p-4 rounded-lg border">
              <div className="p-2 rounded-lg bg-indigo-100">
                <RoleIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <Badge
                  variant="outline"
                  className={roleColors[data.invitation.role]}
                >
                  {roleLabels[data.invitation.role]}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {roleDescriptions[data.invitation.role]}
                </p>
              </div>
            </div>
          </div>

          {/* Expiracao */}
          <p className="text-xs text-center text-muted-foreground">
            Este convite expira em {formatDate(data.invitation.expiresAt)}
          </p>

          {/* Botoes */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReject}
              disabled={processing}
            >
              {processing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Recusar
            </Button>
            <Button className="flex-1" onClick={handleAccept} disabled={processing}>
              {processing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              Aceitar Convite
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
