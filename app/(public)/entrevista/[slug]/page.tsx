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
import { Loader2 } from "lucide-react";

interface EntrevistaPublica {
  id: string;
  titulo: string;
  descricao?: string;
  cargo?: string;
  nivel?: string;
  empresa?: string;
}

export default function CadastroEntrevistaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [entrevista, setEntrevista] = useState<EntrevistaPublica | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

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

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!formData.nome.trim() || formData.nome.length < 3) {
      novosErros.nome = "Nome deve ter pelo menos 3 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      novosErros.email = "Email inválido";
    }

    if (formData.email !== formData.emailConfirmacao) {
      novosErros.emailConfirmacao = "Os emails não coincidem";
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao iniciar entrevista");
      }

      const { candidatoId, sessaoId, entrevistaId } = await response.json();

      // Redirecionar para a página da entrevista
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

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (erro && !entrevista) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Erro</h1>
          <p className="text-gray-600 mb-6">{erro}</p>
          <Button onClick={carregarEntrevista}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {entrevista?.titulo}
          </h1>
          {entrevista?.descricao && (
            <p className="text-gray-600 mb-4">{entrevista.descricao}</p>
          )}
          {(entrevista?.cargo || entrevista?.nivel || entrevista?.empresa) && (
            <div className="flex flex-wrap gap-2 text-sm">
              {entrevista.cargo && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {entrevista.cargo}
                </span>
              )}
              {entrevista.nivel && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {entrevista.nivel}
                </span>
              )}
              {entrevista.empresa && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  {entrevista.empresa}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cadastro do Candidato
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder="Seu nome completo"
                className={errosForm.nome ? "border-red-500" : ""}
              />
              {errosForm.nome && (
                <p className="text-sm text-red-500 mt-1">{errosForm.nome}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="seu@email.com"
                className={errosForm.email ? "border-red-500" : ""}
              />
              {errosForm.email && (
                <p className="text-sm text-red-500 mt-1">{errosForm.email}</p>
              )}
            </div>

            {/* Confirmar Email */}
            <div>
              <Label htmlFor="emailConfirmacao">Confirmar Email *</Label>
              <Input
                id="emailConfirmacao"
                type="email"
                value={formData.emailConfirmacao}
                onChange={(e) =>
                  setFormData({ ...formData, emailConfirmacao: e.target.value })
                }
                placeholder="Confirme seu email"
                className={errosForm.emailConfirmacao ? "border-red-500" : ""}
              />
              {errosForm.emailConfirmacao && (
                <p className="text-sm text-red-500 mt-1">
                  {errosForm.emailConfirmacao}
                </p>
              )}
            </div>

            {/* Documento */}
            <div>
              <Label htmlFor="documento">Documento (CPF, RG, etc.)</Label>
              <Input
                id="documento"
                type="text"
                value={formData.documento}
                onChange={(e) =>
                  setFormData({ ...formData, documento: e.target.value })
                }
                placeholder="000.000.000-00"
              />
            </div>

            {/* Sexo */}
            <div>
              <Label htmlFor="sexo">Sexo</Label>
              <Select
                value={formData.sexo}
                onValueChange={(value) =>
                  setFormData({ ...formData, sexo: value })
                }
              >
                <SelectTrigger>
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

            {/* Erro geral */}
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {erro}
              </div>
            )}

            {/* Botão */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
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
          </form>

          {/* Aviso LGPD */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            Ao continuar, você concorda com o tratamento de seus dados pessoais
            para fins de processo seletivo, conforme a Lei Geral de Proteção de
            Dados (LGPD).
          </p>
        </div>
      </div>
    </div>
  );
}
