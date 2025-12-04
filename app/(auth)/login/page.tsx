"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Mail,
  Lock,
  ArrowLeft,
  Home,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailVerificado = searchParams.get("email_verificado");
  const cadastroSucesso = searchParams.get("cadastro");

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (emailVerificado === "true") {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [emailVerificado]);

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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.needsVerification) {
          // Email não verificado - redireciona para verificação
          router.push(`/verificar-email?email=${encodeURIComponent(formData.email)}`);
          return;
        }

        if (data.field) {
          setErrors({ [data.field]: data.error });
        } else {
          setErrors({ geral: data.error || "Erro ao fazer login" });
        }
        return;
      }

      // Sucesso - redireciona para dashboard
      router.push("/dashboard");

    } catch (error) {
      console.error("Erro:", error);
      setErrors({ geral: "Erro ao conectar com o servidor" });
    } finally {
      setIsLoading(false);
    }
  };

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
              <Link href="/cadastro">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Criar conta
                </Button>
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
          <span className="text-gray-900 font-medium">Login</span>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Mensagem de sucesso */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900">Email verificado com sucesso!</p>
              <p className="text-sm text-green-600">Agora você pode fazer login na sua conta.</p>
            </div>
          </div>
        )}

        <Card className="p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h1>
            <p className="text-gray-600 mt-2">
              Faça login para continuar
            </p>
          </div>

          {/* Erro geral */}
          {errors.geral && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{errors.geral}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                disabled={isLoading}
                autoFocus
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="senha" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Senha
                </Label>
                <Link
                  href="/recuperar-senha"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="senha"
                name="senha"
                type="password"
                placeholder="Sua senha"
                value={formData.senha}
                onChange={handleChange}
                className={errors.senha ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.senha && (
                <p className="text-sm text-red-600">{errors.senha}</p>
              )}
            </div>

            {/* Botão de Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
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
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="text-blue-600 hover:underline font-semibold"
              >
                Criar conta grátis
              </Link>
            </p>
          </div>
        </Card>

        {/* Benefícios */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Mais de 500 empresas confiam na EntrevistIA
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-lg font-bold text-blue-600">90%</p>
              <p className="text-xs text-gray-600">Menos tempo</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-lg font-bold text-blue-600">70%</p>
              <p className="text-xs text-gray-600">Economia</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-lg font-bold text-blue-600">100%</p>
              <p className="text-xs text-gray-600">Automação</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
