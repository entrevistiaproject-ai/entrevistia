"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Mail,
  ArrowLeft,
  Home,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Logo } from "@/components/logo";

function VerificarEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  const [code, setCode] = useState("");
  const [email] = useState(emailParam || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!code || code.length !== 6) {
      setError("Digite um código válido de 6 dígitos");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/verificar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Código inválido ou expirado");
        return;
      }

      // Sucesso
      setSuccess(true);

      // Redireciona após 2 segundos
      setTimeout(() => {
        router.push("/login?email_verificado=true");
      }, 2000);

    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setResendSuccess(false);
    setIsResending(true);

    try {
      const response = await fetch("/api/auth/reenviar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao reenviar código");
        return;
      }

      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);

    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao conectar com o servidor");
    } finally {
      setIsResending(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-primary/10 p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-5" />
          <h2 className="text-2xl font-bold mb-3">
            Tudo certo!
          </h2>
          <p className="text-muted-foreground mb-5">
            Seu email foi confirmado. Entrando na sua conta...
          </p>
          <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
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
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Início
              </Link>
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
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
          <Link href="/" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            Início
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Verificar email</span>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <Card className="shadow-lg">
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-5">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Confirme seu email</h1>
            <p className="text-muted-foreground mt-3">
              Enviamos um código de 6 dígitos para:
            </p>
            <p className="text-primary font-semibold mt-1">{email}</p>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            {/* Alerta de sucesso ao reenviar */}
            {resendSuccess && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-green-600 dark:text-green-400">
                  Pronto! Enviamos um novo código para seu email.
                </p>
              </div>
            )}

            {/* Erro */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Código de verificação */}
              <div className="space-y-2.5">
                <label htmlFor="code" className="block text-sm font-medium">
                  Código de verificação
                </label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setCode(value);
                    setError("");
                  }}
                  className={`text-center text-2xl tracking-widest font-bold ${error ? "border-destructive" : ""}`}
                  disabled={isLoading}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground text-center">
                  O código tem 6 números e está no email que enviamos
                </p>
              </div>

              {/* Botão de Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  size="touch"
                  disabled={isLoading || code.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </div>
            </form>

            {/* Reenviar código */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Não chegou?
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-primary hover:text-primary/90"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar novo código"
                )}
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Digitou o email errado?{" "}
                <Link
                  href="/cadastro"
                  className="text-primary hover:underline font-semibold"
                >
                  Criar nova conta
                </Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Dica */}
        <div className="mt-8 p-5 bg-card rounded-xl border">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Dica:</strong> Olhe também na pasta de spam ou lixo eletrônico
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerificarEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <VerificarEmailContent />
    </Suspense>
  );
}
