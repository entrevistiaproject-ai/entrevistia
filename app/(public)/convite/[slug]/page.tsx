"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  AlertCircle,
  Briefcase,
  Building2,
  Clock,
  CheckCircle2,
  Sparkles,
  Calendar,
  Heart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConviteData {
  candidato: {
    id: string;
    nome: string;
    email: string;
  };
  entrevista: {
    id: string;
    titulo: string;
    descricao?: string;
    cargo?: string;
    empresa?: string;
    slug: string;
  };
  prazoResposta: string;
  prazoExpirado: boolean;
}

export default function ConvitePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug as string;
  const candidatoId = searchParams.get("candidatoId");

  const [convite, setConvite] = useState<ConviteData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Campos que podem ser editados
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    carregarConvite();
  }, [slug, candidatoId]);

  const carregarConvite = async () => {
    if (!candidatoId) {
      setErro("Link de convite inválido");
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch(
        `/api/convite/${slug}?candidatoId=${candidatoId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao carregar convite");
      }

      const data = await response.json();
      setConvite(data);
      setNome(data.candidato.nome);
      setEmail(data.candidato.email);
    } catch (error) {
      console.error("Erro ao carregar convite:", error);
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar o convite"
      );
    } finally {
      setCarregando(false);
    }
  };

  const handleIniciar = async () => {
    if (!convite) return;

    try {
      setEnviando(true);
      setErro(null);

      const response = await fetch(`/api/convite/${slug}/iniciar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidatoId,
          nome,
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao iniciar entrevista");
      }

      const { sessaoId } = await response.json();

      // Redirecionar para a página de resposta
      router.push(
        `/entrevista/${slug}/responder?candidatoId=${candidatoId}&sessaoId=${sessaoId}`
      );
    } catch (error) {
      console.error("Erro ao iniciar entrevista:", error);
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao iniciar entrevista. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  // Calcular tempo restante
  const calcularTempoRestante = () => {
    if (!convite?.prazoResposta) return null;
    const prazo = new Date(convite.prazoResposta);
    const agora = new Date();
    const diff = prazo.getTime() - agora.getTime();

    if (diff <= 0) return "Expirado";

    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (horas >= 24) {
      const dias = Math.floor(horas / 24);
      return `${dias} dia${dias > 1 ? "s" : ""} restante${dias > 1 ? "s" : ""}`;
    }

    return `${horas}h ${minutos}min restantes`;
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse" />
            <Loader2 className="h-8 w-8 animate-spin text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-sm text-muted-foreground">Carregando convite...</p>
        </div>
      </div>
    );
  }

  // Página de prazo expirado
  if (convite?.prazoExpirado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Card className="max-w-lg w-full border-0 shadow-2xl">
          <CardContent className="pt-12 pb-10 text-center px-8">
            {/* Ilustração fofa */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-16 h-16 text-amber-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">😅</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Ops! O prazo terminou
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Infelizmente o prazo para realizar esta entrevista já passou.
              <br />
              <span className="text-amber-600 font-medium">
                Mas não se preocupe!
              </span>
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-gray-700">
                  O que você pode fazer:
                </span>
              </div>
              <ul className="text-left text-gray-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    Entre em contato com o recrutador para solicitar um novo
                    convite
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    Verifique seu email para ver se há um novo link disponível
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Fique atento para próximas oportunidades</span>
                </li>
              </ul>
            </div>

            {convite?.entrevista && (
              <div className="text-sm text-gray-500 mb-6">
                <p>
                  Vaga:{" "}
                  <span className="font-medium text-gray-700">
                    {convite.entrevista.cargo || convite.entrevista.titulo}
                  </span>
                </p>
                {convite.entrevista.empresa && (
                  <p>
                    Empresa:{" "}
                    <span className="font-medium text-gray-700">
                      {convite.entrevista.empresa}
                    </span>
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>Desejamos sucesso na sua jornada profissional!</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (erro && !convite) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-white to-pink-50">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="pt-8 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-gray-800">
              Link inválido
            </h1>
            <p className="text-muted-foreground mb-6">{erro}</p>
            <p className="text-sm text-gray-500">
              Verifique se o link está correto ou solicite um novo convite ao
              recrutador.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tempoRestante = calcularTempoRestante();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header com boas-vindas */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Convite Especial
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Olá, {convite?.candidato.nome.split(" ")[0]}!
            </h1>
            <p className="text-white/90 text-lg">
              Você foi convidado(a) para uma entrevista
            </p>
          </div>

          <CardContent className="p-6">
            {/* Info da vaga */}
            <div className="flex flex-wrap gap-3 mb-6">
              {convite?.entrevista.cargo && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 py-2 px-4 text-sm"
                >
                  <Briefcase className="h-4 w-4" />
                  {convite.entrevista.cargo}
                </Badge>
              )}
              {convite?.entrevista.empresa && (
                <Badge variant="outline" className="gap-1.5 py-2 px-4 text-sm">
                  <Building2 className="h-4 w-4" />
                  {convite.entrevista.empresa}
                </Badge>
              )}
            </div>

            {/* Prazo */}
            {tempoRestante && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-amber-800 font-medium">
                    Prazo para responder
                  </p>
                  <p className="text-amber-600 font-bold">{tempoRestante}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Formulário de confirmação */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Confirme seus dados
            </CardTitle>
            <CardDescription>
              Verifique se suas informações estão corretas antes de iniciar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Email (somente leitura) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="h-12 bg-gray-50"
              />
              <p className="text-xs text-muted-foreground">
                O email não pode ser alterado
              </p>
            </div>

            {/* Erro */}
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-sm">{erro}</span>
              </div>
            )}

            {/* Botão */}
            <Button
              onClick={handleIniciar}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-lg"
              disabled={enviando}
            >
              {enviando ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Iniciar Minha Entrevista
                </>
              )}
            </Button>

            {/* Aviso */}
            <p className="text-xs text-center text-muted-foreground">
              Ao clicar em iniciar, você concorda com o tratamento dos seus
              dados conforme a LGPD
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
