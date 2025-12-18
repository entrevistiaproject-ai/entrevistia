"use client";

import Link from "next/link";
import { TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UsageAlertBannerProps {
  percentualUsado: number;
  saldoRestante: number;
  limiteAtingido: boolean;
}

export function UsageAlertBanner({
  percentualUsado,
  saldoRestante,
  limiteAtingido,
}: UsageAlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  // Não mostrar se:
  // - Foi dispensado
  // - Está abaixo de 70%
  // - Limite atingido (banner global cuida disso)
  if (dismissed || percentualUsado < 70 || limiteAtingido) {
    return null;
  }

  // Determina o estilo baseado no percentual
  const isWarning = percentualUsado >= 70 && percentualUsado < 90;
  const isDanger = percentualUsado >= 90;

  const getBgColor = () => {
    if (isDanger) return "bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-900";
    return "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900";
  };

  const getIconColor = () => {
    if (isDanger) return "text-orange-600 dark:text-orange-400";
    return "text-amber-600 dark:text-amber-400";
  };

  const getTextColor = () => {
    if (isDanger) return "text-orange-900 dark:text-orange-100";
    return "text-amber-900 dark:text-amber-100";
  };

  const getSubTextColor = () => {
    if (isDanger) return "text-orange-700 dark:text-orange-300";
    return "text-amber-700 dark:text-amber-300";
  };

  const getMessage = () => {
    if (isDanger) {
      return {
        title: `${Math.round(percentualUsado)}% do crédito utilizado`,
        description: `Restam R$ ${saldoRestante.toFixed(2)}. Cadastre seu cartão para evitar interrupções.`,
      };
    }
    return {
      title: `${Math.round(percentualUsado)}% do crédito utilizado`,
      description: `Restam R$ ${saldoRestante.toFixed(2)} do seu período de teste.`,
    };
  };

  const message = getMessage();

  return (
    <div
      className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg border ${getBgColor()}`}
      role="alert"
    >
      <div className={`shrink-0 ${getIconColor()}`}>
        <TrendingUp className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${getTextColor()}`}>
          {message.title}
        </p>
        <p className={`text-xs mt-0.5 ${getSubTextColor()}`}>
          {message.description}
        </p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Link href="/upgrade" className="flex-1 sm:flex-none">
          <Button
            size="sm"
            variant="outline"
            className={`w-full border-current ${getTextColor()}`}
          >
            Fazer Upgrade
          </Button>
        </Link>

        <Button
          size="sm"
          variant="ghost"
          className={`shrink-0 ${getSubTextColor()} hover:bg-transparent`}
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dispensar</span>
        </Button>
      </div>
    </div>
  );
}
