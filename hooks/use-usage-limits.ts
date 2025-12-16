"use client";

import { useState, useEffect, useCallback } from "react";

export interface UsageData {
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

export interface UseUsageLimitsReturn {
  usage: UsageData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  // Helpers
  isFreeTrial: boolean;
  isBlocked: boolean;
  showWarning: boolean;
  showDanger: boolean;
}

/**
 * Hook para verificar limites de uso do usuário
 * Útil para mostrar alertas e bloquear funcionalidades no frontend
 */
export function useUsageLimits(): UseUsageLimitsReturn {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/uso");

      if (!res.ok) {
        if (res.status === 401) {
          setError("Não autenticado");
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

  return {
    usage,
    loading,
    error,
    refetch: fetchUsage,
    isFreeTrial,
    isBlocked: isBlocked ?? false,
    showWarning,
    showDanger,
  };
}

/**
 * Hook para verificar se pode executar ação de IA
 * Retorna função para verificar e abrir modal se bloqueado
 */
export function useCheckIAAccess() {
  const { usage, isBlocked, refetch } = useUsageLimits();
  const [showModal, setShowModal] = useState(false);

  const checkAccess = useCallback(async (): Promise<boolean> => {
    // Refetch para garantir dados atualizados
    await refetch();

    if (isBlocked) {
      setShowModal(true);
      return false;
    }

    return true;
  }, [isBlocked, refetch]);

  return {
    checkAccess,
    showModal,
    setShowModal,
    usage,
    isBlocked,
  };
}
