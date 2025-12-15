"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle, Briefcase, Users, Building2, Shield, ArrowLeft, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLabelNivel } from "@/lib/constants/niveis";

interface EntrevistaPublica {
  id: string;
  titulo: string;
  descricao?: string;
  cargo?: string;
  nivel?: string;
  empresa?: string;
}

interface CandidatoExistente {
  id: string;
  nome: string;
  email: string;
  documento?: string;
  sexo?: string;
}

export default function CadastroEntrevistaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [entrevista, setEntrevista] = useState<EntrevistaPublica | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [verificandoEmail, setVerificandoEmail] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Controle de etapas: "email" -> "dados"
  const [etapa, setEtapa] = useState<"email" | "dados">("email");
  const [candidatoExistente, setCandidatoExistente] = useState<CandidatoExistente | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    emailConfirmacao: "",
    documento: "",
    sexo: "",
  });

  const [errosForm, setErrosForm] = useState<Record<string, string>>({});

  useEffect(() => {
    carregarEntrevista();
  }, [slug]);

  const carregarEntrevista = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch(`/api/entrevista-publica/${slug}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao carregar entrevista");
      }

      const data = await response.json();
      setEntrevista(data);
    } catch (error) {
      console.error("Erro ao carregar entrevista:", error);
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar a entrevista"
      );
    } finally {
      setCarregando(false);
    }
  };

  const verificarEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrosForm({ email: "Email inválido" });
      return;
    }

    if (formData.email !== formData.emailConfirmacao) {
      setErrosForm({ emailConfirmacao: "Os emails não coincidem" });
      return;
    }

    try {
      setVerificandoEmail(true);
      setErro(null);
      setErrosForm({});

      const response = await fetch(`/api/entrevista-publica/${slug}/verificar-candidato`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.existe) {
          // Candidato existe - preencher dados
          setCandidatoExistente(data.candidato);
          setFormData({
            ...formData,
            nome: data.candidato.nome || "",
            documento: data.candidato.documento || "",
            sexo: data.candidato.sexo || "",
          });
        }

        // Avançar para próxima etapa
        setEtapa("dados");
      } else {
        const errorData = await response.json();
        setErro(errorData.error || "Erro ao verificar email");
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      setErro("Erro ao verificar email. Tente novamente.");
    } finally {
      setVerificandoEmail(false);
    }
  };

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!formData.nome.trim() || formData.nome.length < 3) {
      novosErros.nome = "Nome deve ter pelo menos 3 caracteres";
    }

    setErrosForm(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setEnviando(true);
      setErro(null);

      const response = await fetch(`/api/entrevista-publica/${slug}/iniciar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          candidatoExistenteId: candidatoExistente?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao iniciar entrevista");
      }

      const { candidatoId, sessaoId } = await response.json();

      router.push(
        `/entrevista/${slug}/responder?candidatoId=${candidatoId}&sessaoId=${sessaoId}`
      );
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao processar cadastro. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  const voltarParaEmail = () => {
    setEtapa("email");
    setCandidatoExistente(null);
    setFormData({
      ...formData,
      nome: "",
      documento: "",
      sexo: "",
    });
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando entrevista...</p>
        </div>
      </div>
    );
  }

  if (erro && !entrevista) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Erro</h1>
            <p className="text-muted-foreground mb-6">{erro}</p>
            <Button onClick={carregarEntrevista} size="touch" className="w-full">
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl sm:text-3xl">{entrevista?.titulo}</CardTitle>
            {entrevista?.descricao && (
              <CardDescription className="text-base whitespace-pre-line">
                {entrevista.descricao}
              </CardDescription>
            )}
          </CardHeader>
          {(entrevista?.cargo || entrevista?.nivel || entrevista?.empresa) && (
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {entrevista?.cargo && (
                  <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                    <Briefcase className="h-3.5 w-3.5" />
                    {entrevista.cargo}
                  </Badge>
                )}
                {entrevista?.nivel && (
                  <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
                    <Users className="h-3.5 w-3.5" />
                    {getLabelNivel(entrevista.nivel)}
                  </Badge>
                )}
                {entrevista?.empresa && (
                  <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
                    <Building2 className="h-3.5 w-3.5" />
                    {entrevista.empresa}
                  </Badge>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>
              {etapa === "email" ? "Confirme seu Email" : "Complete seu Cadastro"}
            </CardTitle>
            <CardDescription>
              {etapa === "email"
                ? "Digite seu email para iniciar a entrevista"
                : candidatoExistente
                ? "Seus dados estão preenchidos. Confirme para continuar."
                : "Preencha seus dados para iniciar a entrevista"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {etapa === "email" ? (
              <form onSubmit={verificarEmail} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value.trim().toLowerCase() })
                    }
                    placeholder="seu@email.com"
                    error={!!errosForm.email}
                    autoFocus
                  />
                  {errosForm.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errosForm.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailConfirmacao">Confirmar Email *</Label>
                  <Input
                    id="emailConfirmacao"
                    type="email"
                    value={formData.emailConfirmacao}
                    onChange={(e) =>
                      setFormData({ ...formData, emailConfirmacao: e.target.value.trim().toLowerCase() })
                    }
                    placeholder="Confirme seu email"
                    error={!!errosForm.emailConfirmacao}
                  />
                  {errosForm.emailConfirmacao && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errosForm.emailConfirmacao}
                    </p>
                  )}
                </div>

                {erro && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <span>{erro}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="touch"
                  disabled={verificandoEmail}
                >
                  {verificandoEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Continuar"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email-readonly">Email</Label>
                  <div className="relative">
                    <Input
                      id="email-readonly"
                      type="email"
                      value={formData.email}
                      readOnly
                      className="bg-muted"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>

                {candidatoExistente && (
                  <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium text-blue-900">Bem-vindo de volta!</p>
                      <p className="mt-1">Encontramos seu cadastro. Confira seus dados abaixo.</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    placeholder="Seu nome completo"
                    error={!!errosForm.nome}
                    readOnly={!!candidatoExistente}
                    className={candidatoExistente ? "bg-muted" : ""}
                  />
                  {errosForm.nome && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errosForm.nome}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documento">Documento (CPF, RG, etc.)</Label>
                  <Input
                    id="documento"
                    type="text"
                    value={formData.documento}
                    onChange={(e) =>
                      setFormData({ ...formData, documento: e.target.value })
                    }
                    placeholder="000.000.000-00"
                    readOnly={!!candidatoExistente}
                    className={candidatoExistente ? "bg-muted" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select
                    value={formData.sexo}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sexo: value })
                    }
                    disabled={!!candidatoExistente}
                  >
                    <SelectTrigger className={`h-11 ${candidatoExistente ? "bg-muted" : ""}`}>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                      <SelectItem value="prefiro_nao_informar">
                        Prefiro não informar
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {erro && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <span>{erro}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    onClick={voltarParaEmail}
                    disabled={enviando}
                    className="w-32"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    size="touch"
                    disabled={enviando}
                  >
                    {enviando ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      "Iniciar Entrevista"
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-start gap-3 text-muted-foreground">
                <Shield className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-xs">
                  Ao continuar, você concorda com o tratamento de seus dados pessoais
                  para fins de processo seletivo, conforme a Lei Geral de Proteção de
                  Dados (LGPD).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
