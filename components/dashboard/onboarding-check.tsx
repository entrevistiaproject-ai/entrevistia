"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Componente que verifica se o usuário completou o onboarding de áreas
 * Se não completou, redireciona para a página de onboarding
 */
export function OnboardingCheck() {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Não verificar se já está na página de onboarding
    if (pathname?.startsWith("/onboarding")) {
      setChecked(true);
      return;
    }

    const checkOnboarding = async () => {
      try {
        const response = await fetch("/api/user/cargo-preferences");
        if (response.ok) {
          const data = await response.json();
          // Se o onboarding não foi completado E não tem cargos selecionados
          // (usuário nunca configurou), redireciona
          if (!data.onboardingCompleted && (!data.cargosVisiveis || data.cargosVisiveis.length === 0)) {
            router.push("/onboarding/areas");
            return;
          }
        }
      } catch (error) {
        console.error("Erro ao verificar onboarding:", error);
      }
      setChecked(true);
    };

    checkOnboarding();
  }, [pathname, router]);

  // Não renderiza nada - apenas faz a verificação
  return null;
}
