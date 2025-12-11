import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Lista de hosts permitidos
const allowedHosts = [
  "localhost",
  "127.0.0.1",
  "entrevistia.vercel.app",
  "entrevistia.com.br",
  "www.entrevistia.com.br",
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  // trustHost: true é necessário para Vercel, mas definimos hosts permitidos via env
  trustHost: process.env.NODE_ENV === "production" ? true : true,
  basePath: "/api/auth",
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
