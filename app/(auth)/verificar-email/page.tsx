"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Mail,
  ArrowLeft,
  Home,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Email verificado com sucesso!
          </h2>
          <p className="text-gray-600 mb-4">
            Redirecionando para o login...
          </p>
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header com navegação */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
              <Building2 className="w-6 h-6" />
              EntrevistIA
            </Link>

            {/* Links de navegação */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Início
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </nav>

            {/* Botão mobile */}
            <Link href="/" className="md:hidden">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Início
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Verificar email</span>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto px-4 py-8">
        <Card className="p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Verificar email</h1>
            <p className="text-gray-600 mt-2">
              Enviamos um código de 6 dígitos para
            </p>
            <p className="text-blue-600 font-semibold mt-1">{email}</p>
          </div>

          {/* Alerta de sucesso ao reenviar */}
          {resendSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-600">
                Código reenviado com sucesso! Verifique sua caixa de entrada.
              </p>
            </div>
          )}

          {/* Erro */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Código de verificação */}
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
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
                className={`text-center text-2xl tracking-widest font-bold ${error ? "border-red-500" : ""}`}
                disabled={isLoading}
                autoFocus
              />
              <p className="text-xs text-gray-500 text-center">
                Digite o código de 6 dígitos recebido por email
              </p>
            </div>

            {/* Botão de Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Verificar código"
              )}
            </Button>
          </form>

          {/* Reenviar código */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Não recebeu o código?
            </p>
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Reenviando...
                </>
              ) : (
                "Reenviar código"
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Email incorreto?{" "}
              <Link
                href="/cadastro"
                className="text-blue-600 hover:underline font-semibold"
              >
                Criar nova conta
              </Link>
            </p>
          </div>
        </Card>

        {/* Dica */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <strong>Dica:</strong> Verifique também a pasta de spam ou lixo eletrônico
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
