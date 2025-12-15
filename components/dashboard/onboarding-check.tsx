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

        // Se não autenticado, não fazer nada (deixar o middleware lidar)
        if (response.status === 401) {
          setChecked(true);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          // Se o onboarding não foi completado, redireciona
          // Verifica especificamente se onboardingCompleted é false (não apenas falsy)
          if (data.onboardingCompleted === false) {
            router.push("/onboarding/areas");
            return;
          }
        }
      } catch (error) {
        console.error("Erro ao verificar onboarding:", error);
      }
      setChecked(true);
    };

    // Pequeno delay para garantir que a sessão está carregada
    const timer = setTimeout(checkOnboarding, 100);
    return () => clearTimeout(timer);
  }, [pathname, router]);

  // Não renderiza nada - apenas faz a verificação
  return null;
}
