"use client";

import { useUsage } from "@/contexts/usage-context";
import { BlockedAccountBanner } from "./blocked-account-banner";

export function BlockedAccountBannerWrapper() {
  const { isBlocked, isFreeTrial, loading } = useUsage();

  // Só mostra o banner se:
  // 1. Não está carregando
  // 2. É free trial
  // 3. Está bloqueado (limite atingido)
  if (loading || !isFreeTrial || !isBlocked) {
    return null;
  }

  return <BlockedAccountBanner />;
}
