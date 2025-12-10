"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Lock,
  Home,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailVerificado = searchParams.get("email_verificado");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(emailVerificado === "true");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
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
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.senha,
      });

      if (result?.error) {
        setErrors({ geral: "Email ou senha inválidos" });
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErrors({ geral: "Erro ao fazer login. Tente novamente." });
      setIsLoading(false);
    }
  };

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
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Início
              </Link>
              <Link href="/cadastro">
                <Button size="sm">
                  Criar conta
                </Button>
              </Link>
            </nav>

            {/* Botão mobile */}
            <Link href="/" className="md:hidden">
              <Button variant="ghost" size="touch-icon">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            Início
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Login</span>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Mensagem de sucesso */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900 dark:text-green-100">Email confirmado!</p>
              <p className="text-sm text-green-600 dark:text-green-400">Tudo pronto. Faça login para começar.</p>
            </div>
          </div>
        )}

        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
              <LogoIcon className="w-10 h-10" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl">Acesse sua conta</CardTitle>
            <CardDescription>
              Entre para gerenciar suas entrevistas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Erro geral */}
            {errors.geral && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{errors.geral}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  disabled={isLoading}
                  autoFocus
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Sua senha
                  </Label>
                  <Link
                    href="/recuperar-senha"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="senha"
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.senha}
                    onChange={handleChange}
                    error={!!errors.senha}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.senha && (
                  <p className="text-sm text-destructive">{errors.senha}</p>
                )}
              </div>

              {/* Botão de Submit */}
              <Button
                type="submit"
                className="w-full"
                size="touch"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Ainda não tem conta?{" "}
                <Link
                  href="/cadastro"
                  className="text-primary hover:underline font-semibold"
                >
                  Criar conta gratuita
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefícios */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Por que recrutadores escolhem a EntrevistIA:
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4">
              <p className="text-lg font-bold text-primary">90%</p>
              <p className="text-xs text-muted-foreground">Menos tempo em triagem</p>
            </Card>
            <Card className="p-4">
              <p className="text-lg font-bold text-primary">R$ 3</p>
              <p className="text-xs text-muted-foreground">Por candidato</p>
            </Card>
            <Card className="p-4">
              <p className="text-lg font-bold text-primary">24/7</p>
              <p className="text-xs text-muted-foreground">Sempre disponível</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
