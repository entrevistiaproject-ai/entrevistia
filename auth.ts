import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Função para obter a URL base de forma segura
function getBaseUrl() {
  // 1. Tenta AUTH_URL primeiro
  if (process.env.AUTH_URL) return process.env.AUTH_URL;

  // 2. Tenta NEXTAUTH_URL
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;

  // 3. Em produção na Vercel, usa VERCEL_URL com https
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 4. Fallback para localhost
  return "http://localhost:3000";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true, // Necessário para Vercel
  basePath: "/api/auth",
});
