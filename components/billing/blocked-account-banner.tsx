"use client";

import Link from "next/link";
import { AlertTriangle, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface BlockedAccountBannerProps {
  onDismiss?: () => void;
}

export function BlockedAccountBanner({ onDismiss }: BlockedAccountBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  // Resetar dismissed a cada 5 minutos para lembrar o usuário
  useEffect(() => {
    if (dismissed) {
      const timeout = setTimeout(() => {
        setDismissed(false);
      }, 5 * 60 * 1000); // 5 minutos

      return () => clearTimeout(timeout);
    }
  }, [dismissed]);

  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
      role="alert"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="shrink-0 p-1.5 bg-white/20 rounded-full">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base">
                Seu bônus de testes acabou!
              </p>
              <p className="text-xs sm:text-sm text-red-100">
                Cadastre seu cartão de crédito para continuar criando entrevistas e analisando candidatos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href="/upgrade" className="flex-1 sm:flex-none">
              <Button
                size="sm"
                className="w-full bg-white text-red-700 hover:bg-red-50 font-semibold"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Cadastrar Cartão
              </Button>
            </Link>

            <Button
              size="sm"
              variant="ghost"
              className="shrink-0 text-white/80 hover:text-white hover:bg-white/10"
              onClick={handleDismiss}
              aria-label="Fechar aviso"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
