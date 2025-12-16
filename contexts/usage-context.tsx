"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { UsageLimitModal } from "@/components/billing/usage-limit-modal";

interface UsageData {
  planType: string;
  planStatus: string;
  totalGasto: number;
  limiteFinanceiro: number;
  saldoRestante: number;
  percentualUsado: number;
  limiteAtingido: boolean;
  isTestAccount: boolean;
  acessoIA: {
    permitido: boolean;
    motivo?: string;
    mensagemUsuario?: string;
  };
}

interface UsageContextType {
  usage: UsageData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  // Helpers
  isFreeTrial: boolean;
  isBlocked: boolean;
  showWarning: boolean;
  showDanger: boolean;
  // Modal de limite
  checkIAAccess: () => Promise<boolean>;
  showLimitModal: () => void;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

interface UsageProviderProps {
  children: ReactNode;
}

export function UsageProvider({ children }: UsageProviderProps) {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUsage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/uso");

      if (!res.ok) {
        if (res.status === 401) {
          // Usuário não autenticado, não é erro
          return;
        }
        throw new Error("Erro ao carregar dados de uso");
      }

      const data = await res.json();
      setUsage(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  // Helpers computados
  const isFreeTrial = usage?.planType === "free_trial";
  const isBlocked = usage?.limiteAtingido || !usage?.acessoIA?.permitido;
  const showWarning = isFreeTrial && (usage?.percentualUsado ?? 0) >= 70 && (usage?.percentualUsado ?? 0) < 90;
  const showDanger = isFreeTrial && (usage?.percentualUsado ?? 0) >= 90;

  const showLimitModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const checkIAAccess = useCallback(async (): Promise<boolean> => {
    // Refetch para garantir dados atualizados
    await fetchUsage();

    const currentUsage = usage;
    const blocked = currentUsage?.limiteAtingido || !currentUsage?.acessoIA?.permitido;

    if (blocked) {
      setModalOpen(true);
      return false;
    }

    return true;
  }, [fetchUsage, usage]);

  const value: UsageContextType = {
    usage,
    loading,
    error,
    refetch: fetchUsage,
    isFreeTrial,
    isBlocked: isBlocked ?? false,
    showWarning,
    showDanger,
    checkIAAccess,
    showLimitModal,
  };

  return (
    <UsageContext.Provider value={value}>
      {children}
      <UsageLimitModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        percentualUsado={usage?.percentualUsado}
        totalGasto={usage?.totalGasto}
        limiteFinanceiro={usage?.limiteFinanceiro}
        saldoRestante={usage?.saldoRestante}
      />
    </UsageContext.Provider>
  );
}

export function useUsage(): UsageContextType {
  const context = useContext(UsageContext);
  if (context === undefined) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
}
