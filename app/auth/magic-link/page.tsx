"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function MagicLinkContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const entrevistaId = searchParams.get("entrevista");
  const hasValidated = useRef(false);

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );
  const [message, setMessage] = useState(
    token ? "" : "Link inválido. O token está ausente."
  );

  useEffect(() => {
    if (!token || hasValidated.current) return;
    hasValidated.current = true;

    const validateToken = async () => {
      try {
        const response = await fetch("/api/auth/magic-link/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok || !data.valid) {
          setStatus("error");
          setMessage(data.error || "Link inválido ou expirado.");
          return;
        }

        setStatus("success");
        setMessage("Autenticação realizada com sucesso!");

        // Redireciona após 2 segundos
        setTimeout(() => {
          if (entrevistaId) {
            router.push(`/entrevista/${entrevistaId}`);
          } else if (data.redirectUrl) {
            router.push(data.redirectUrl);
          } else {
            router.push("/meu-perfil");
          }
        }, 2000);
      } catch (error) {
        console.error("Erro ao validar token:", error);
        setStatus("error");
        setMessage("Erro ao processar o link. Tente novamente.");
      }
    };

    validateToken();
  }, [token, entrevistaId, router]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">Entrevistia</h1>

      {/* Status Icon */}
      <div className="mb-6">
        {status === "loading" && (
          <Loader2 className="h-16 w-16 text-indigo-600 animate-spin mx-auto" />
        )}
        {status === "success" && (
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        )}
        {status === "error" && (
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />
        )}
      </div>

      {/* Message */}
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
        {status === "loading" && "Verificando seu acesso..."}
        {status === "success" && "Acesso confirmado!"}
        {status === "error" && "Ops, algo deu errado"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        {message || (status === "loading" ? "Aguarde enquanto validamos seu link." : "")}
      </p>

      {/* Actions */}
      {status === "error" && (
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/login">Voltar para o login</Link>
          </Button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Precisa de ajuda?{" "}
            <a href="mailto:suporte@entrevistia.com.br" className="text-indigo-600 hover:underline">
              Entre em contato
            </a>
          </p>
        </div>
      )}

      {status === "success" && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Redirecionando em instantes...
        </p>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">Entrevistia</h1>
      <div className="mb-6">
        <Loader2 className="h-16 w-16 text-indigo-600 animate-spin mx-auto" />
      </div>
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
        Carregando...
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Aguarde enquanto preparamos sua página.
      </p>
    </div>
  );
}

export default function MagicLinkPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md p-8">
        <Suspense fallback={<LoadingFallback />}>
          <MagicLinkContent />
        </Suspense>
      </div>
    </div>
  );
}
