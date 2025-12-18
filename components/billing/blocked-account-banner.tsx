"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
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
      className="sticky top-0 z-50 w-full bg-zinc-900 text-white"
      role="alert"
    >
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-x-6 gap-y-2 flex-wrap">
          <p className="text-sm">
            <span className="font-medium">Seu período de testes acabou.</span>
            {" "}
            <span className="text-zinc-400">Cadastre seu cartão para continuar.</span>
          </p>

          <div className="flex items-center gap-3">
            <Link href="/upgrade">
              <Button
                size="sm"
                variant="secondary"
                className="h-7 px-3 text-xs font-medium bg-white text-zinc-900 hover:bg-zinc-100"
              >
                Fazer upgrade
                <ArrowRight className="h-3 w-3 ml-1.5" />
              </Button>
            </Link>

            <button
              onClick={handleDismiss}
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Fechar aviso"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
