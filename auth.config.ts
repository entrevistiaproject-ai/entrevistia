import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/db";
import { users, teamMembers } from "@/lib/db/schema";
import { eq, sql, and } from "drizzle-orm";

export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/auth-error",
  },
  callbacks: {
    authorized() {
      // Lógica de autorização movida para o middleware
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // Armazena preferência de "manter conectado"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userAny = user as any;
        const keepLoggedIn = userAny.keepLoggedIn === true;
        token.keepLoggedIn = keepLoggedIn;

        // Armazena permissões calculadas no login
        token.canAccessFinancials = userAny.canAccessFinancials ?? true;

        // Define expiração baseada na preferência do usuário
        // Se "manter conectado" está marcado: 7 dias
        // Se não está marcado: 8 horas (sessão de trabalho)
        const maxAge = keepLoggedIn ? 7 * 24 * 60 * 60 : 8 * 60 * 60;
        token.exp = Math.floor(Date.now() / 1000) + maxAge;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        // Passa permissões para a sessão
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).canAccessFinancials = token.canAccessFinancials ?? true;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        keepLoggedIn: { label: "Keep Logged In", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const db = getDB();
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        // Atualiza contadores de login
        await db
          .update(users)
          .set({
            lastLoginAt: new Date(),
            loginCount: sql`${users.loginCount} + 1`,
          })
          .where(eq(users.id, user.id));

        // Verifica se o usuário tem acesso financeiro
        // Owner sempre tem acesso; membro só tem se tiver role 'financial'
        const [membership] = await db
          .select({ role: teamMembers.role, ownerId: teamMembers.ownerId })
          .from(teamMembers)
          .where(and(eq(teamMembers.memberId, user.id), eq(teamMembers.isActive, true)));

        let canAccessFinancials = true;
        if (membership) {
          // É membro de um time - só tem acesso se for o próprio owner ou role financial
          canAccessFinancials = membership.ownerId === user.id || membership.role === "financial";
        }

        return {
          id: user.id,
          email: user.email,
          name: user.nome,
          keepLoggedIn: credentials.keepLoggedIn === "true",
          canAccessFinancials,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
