"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  ArrowLeft,
  Home,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    cargo: "",
    senha: "",
    confirmarSenha: "",
    aceitouTermos: false,
    aceitouPrivacidade: false,
    aceitaEmailMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Função para formatar telefone
  const formatarTelefone = (valor: string) => {
    // Remove tudo que não é número
    const numeros = valor.replace(/\D/g, "");

    // Aplica a máscara (11) 99999-9999 ou (11) 9999-9999
    if (numeros.length <= 10) {
      return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    // Aplica máscara no telefone
    if (name === "telefone") {
      newValue = formatarTelefone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue
    }));

    // Limpa o erro do campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Erros de validação
        if (data.details?.issues) {
          const zodErrors: Record<string, string> = {};
          data.details.issues.forEach((issue: { path: string[]; message: string }) => {
            zodErrors[issue.path[0]] = issue.message;
          });
          setErrors(zodErrors);
        } else if (data.field) {
          setErrors({ [data.field]: data.error });
        } else {
          setErrors({ geral: data.error || "Erro ao criar cadastro" });
        }
        return;
      }

      // Sucesso
      setSuccess(true);

      // Redireciona para verificação de email após 2 segundos
      setTimeout(() => {
        router.push(`/verificar-email?email=${encodeURIComponent(formData.email)}`);
      }, 2000);

    } catch (error) {
      console.error("Erro:", error);
      setErrors({ geral: "Erro ao conectar com o servidor" });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-primary/10 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-green-200 dark:bg-green-800 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">
                Conta criada!
              </h2>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-muted-foreground mb-6">
              Enviamos um código de verificação para seu email...
            </p>
            <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10">
      {/* Header com navegação */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <Logo size="md" />
            </Link>

            {/* Links de navegação */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Início
              </Link>
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Login
              </Link>
            </nav>

            {/* Botão mobile */}
            <Link href="/" className="md:hidden">
              <Button variant="ghost" size="touch-icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer">
            <Home className="w-4 h-4" />
            Início
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Criar conta</span>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4 pt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-5 mx-auto">
              <LogoIcon className="w-10 h-10" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl">Crie sua conta gratuita</CardTitle>
            <CardDescription className="mt-2">
              Ganhe R$ 50 em créditos para testar. Sem cartão de crédito.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2 pb-8 px-6 sm:px-8">
            {/* Erro geral */}
            {errors.geral && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{errors.geral}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Grid de 2 colunas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Nome Completo */}
                <div className="space-y-2">
                  <Label htmlFor="nome" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Seu nome completo
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="João Silva"
                    value={formData.nome}
                    onChange={handleChange}
                    error={!!errors.nome}
                    disabled={isLoading}
                  />
                  {errors.nome && (
                    <p className="text-sm text-destructive">{errors.nome}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Seu email de trabalho
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="joao@empresa.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    WhatsApp ou telefone
                  </Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={handleChange}
                    error={!!errors.telefone}
                    disabled={isLoading}
                  />
                  {errors.telefone && (
                    <p className="text-sm text-destructive">{errors.telefone}</p>
                  )}
                </div>

                {/* Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    Nome da sua empresa
                  </Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    error={!!errors.empresa}
                    disabled={isLoading}
                  />
                  {errors.empresa && (
                    <p className="text-sm text-destructive">{errors.empresa}</p>
                  )}
                </div>

                {/* Cargo */}
                <div className="space-y-2">
                  <Label htmlFor="cargo" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    Seu cargo
                  </Label>
                  <Input
                    id="cargo"
                    name="cargo"
                    type="text"
                    placeholder="Ex: Analista de RH, Recrutador"
                    value={formData.cargo}
                    onChange={handleChange}
                    error={!!errors.cargo}
                    disabled={isLoading}
                  />
                  {errors.cargo && (
                    <p className="text-sm text-destructive">{errors.cargo}</p>
                  )}
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="senha" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Crie uma senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="senha"
                      name="senha"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
                      value={formData.senha}
                      onChange={handleChange}
                      error={!!errors.senha}
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.senha && (
                    <p className="text-sm text-destructive">{errors.senha}</p>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Confirme a senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Digite novamente"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      error={!!errors.confirmarSenha}
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
                      aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmarSenha && (
                    <p className="text-sm text-destructive">{errors.confirmarSenha}</p>
                  )}
                </div>
              </div>

              {/* Termos e Privacidade */}
              <div className="space-y-4 p-5 bg-muted/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="aceitouTermos"
                    checked={formData.aceitouTermos}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, aceitouTermos: checked as boolean }))
                    }
                    disabled={isLoading}
                  />
                  <label htmlFor="aceitouTermos" className="text-sm leading-relaxed cursor-pointer">
                    Concordo com os{" "}
                    <Link href="/termos" className="text-primary hover:underline cursor-pointer" target="_blank">
                      Termos de Uso
                    </Link>
                  </label>
                </div>
                {errors.aceitouTermos && (
                  <p className="text-sm text-destructive pl-7">{errors.aceitouTermos}</p>
                )}

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="aceitouPrivacidade"
                    checked={formData.aceitouPrivacidade}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, aceitouPrivacidade: checked as boolean }))
                    }
                    disabled={isLoading}
                  />
                  <label htmlFor="aceitouPrivacidade" className="text-sm leading-relaxed cursor-pointer">
                    Concordo com a{" "}
                    <Link href="/privacidade" className="text-primary hover:underline cursor-pointer" target="_blank">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>
                {errors.aceitouPrivacidade && (
                  <p className="text-sm text-destructive pl-7">{errors.aceitouPrivacidade}</p>
                )}

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="aceitaEmailMarketing"
                    checked={formData.aceitaEmailMarketing}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, aceitaEmailMarketing: checked as boolean }))
                    }
                    disabled={isLoading}
                  />
                  <label htmlFor="aceitaEmailMarketing" className="text-sm leading-relaxed cursor-pointer text-muted-foreground">
                    Quero receber dicas e novidades sobre recrutamento
                  </label>
                </div>
              </div>

              {/* Botão de Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  size="touch"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    "Criar conta gratuita"
                  )}
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Fazer login
                </Link>
              </p>
            </div>

            {/* Benefícios */}
            <div className="mt-10 pt-8 border-t">
              <p className="text-sm text-muted-foreground text-center mb-5">
                O que você ganha ao criar sua conta:
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <Card className="p-4 sm:p-5">
                  <p className="text-xl sm:text-2xl font-bold text-primary">R$ 50</p>
                  <p className="text-xs text-muted-foreground mt-1">Em créditos grátis</p>
                </Card>
                <Card className="p-4 sm:p-5">
                  <p className="text-xl sm:text-2xl font-bold text-primary">∞</p>
                  <p className="text-xs text-muted-foreground mt-1">Vagas ilimitadas</p>
                </Card>
                <Card className="p-4 sm:p-5">
                  <p className="text-xl sm:text-2xl font-bold text-primary">IA</p>
                  <p className="text-xs text-muted-foreground mt-1">Análise automática</p>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
