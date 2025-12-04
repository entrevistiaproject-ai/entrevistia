"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
  CheckCircle2
} from "lucide-react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
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
          data.details.issues.forEach((issue: any) => {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Cadastro realizado com sucesso!
          </h2>
          <p className="text-gray-600 mb-4">
            Verifique seu email para confirmar sua conta...
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
          <span className="text-gray-900 font-medium">Criar conta</span>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Criar conta</h1>
            <p className="text-gray-600 mt-2">
              Comece a automatizar suas entrevistas hoje
            </p>
          </div>

          {/* Erro geral */}
          {errors.geral && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.geral}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid de 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Nome completo *
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="João Silva"
                  value={formData.nome}
                  onChange={handleChange}
                  className={errors.nome ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.nome && (
                  <p className="text-sm text-red-600">{errors.nome}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Email corporativo *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="joao@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Empresa */}
              <div className="space-y-2">
                <Label htmlFor="empresa" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  Empresa
                </Label>
                <Input
                  id="empresa"
                  name="empresa"
                  type="text"
                  placeholder="Nome da empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Cargo */}
              <div className="space-y-2">
                <Label htmlFor="cargo" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  name="cargo"
                  type="text"
                  placeholder="Ex: Gerente de RH"
                  value={formData.cargo}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="senha" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Senha *
                </Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                  className={errors.senha ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.senha && (
                  <p className="text-sm text-red-600">{errors.senha}</p>
                )}
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Confirmar senha *
                </Label>
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  placeholder="Repita a senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={errors.confirmarSenha ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.confirmarSenha && (
                  <p className="text-sm text-red-600">{errors.confirmarSenha}</p>
                )}
              </div>
            </div>

            {/* Termos e Privacidade */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="aceitouTermos"
                  name="aceitouTermos"
                  className="mt-1"
                  checked={formData.aceitouTermos}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label htmlFor="aceitouTermos" className="text-sm text-gray-700">
                  Li e aceito os{" "}
                  <Link href="/termos" className="text-blue-600 hover:underline" target="_blank">
                    Termos de Uso
                  </Link>{" "}
                  *
                </label>
              </div>
              {errors.aceitouTermos && (
                <p className="text-sm text-red-600">{errors.aceitouTermos}</p>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="aceitouPrivacidade"
                  name="aceitouPrivacidade"
                  className="mt-1"
                  checked={formData.aceitouPrivacidade}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label htmlFor="aceitouPrivacidade" className="text-sm text-gray-700">
                  Li e aceito a{" "}
                  <Link href="/privacidade" className="text-blue-600 hover:underline" target="_blank">
                    Política de Privacidade
                  </Link>{" "}
                  *
                </label>
              </div>
              {errors.aceitouPrivacidade && (
                <p className="text-sm text-red-600">{errors.aceitouPrivacidade}</p>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="aceitaEmailMarketing"
                  name="aceitaEmailMarketing"
                  className="mt-1"
                  checked={formData.aceitaEmailMarketing}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label htmlFor="aceitaEmailMarketing" className="text-sm text-gray-700">
                  Aceito receber novidades e promoções por email (opcional)
                </label>
              </div>
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
                  Criando conta...
                </>
              ) : (
                "Criar minha conta"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:underline font-semibold"
              >
                Fazer login
              </Link>
            </p>
          </div>

          {/* Benefícios */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center mb-4">
              Ao criar sua conta você terá acesso a:
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">∞</p>
                <p className="text-xs text-gray-600">Entrevistas ilimitadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">90%</p>
                <p className="text-xs text-gray-600">Redução de tempo</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">24/7</p>
                <p className="text-xs text-gray-600">Disponibilidade</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
