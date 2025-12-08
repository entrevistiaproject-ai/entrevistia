import { auth } from "@/auth";
import { NextRequest } from "next/server";

/**
 * Obtém o userId do usuário autenticado
 * Retorna null se não estiver autenticado
 */
export async function getUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id || null;
}

/**
 * Obtém o usuário completo da sessão
 */
export async function getUser() {
  const session = await auth();
  return session?.user || null;
}

/**
 * Verifica se o usuário está autenticado
 * Lança erro se não estiver
 */
export async function requireAuth() {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("Não autenticado");
  }
  return userId;
}
