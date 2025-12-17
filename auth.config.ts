import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/db";
import { users, teamMembers, defaultPermissionsByRole, type MemberPermissions } from "@/lib/db/schema";
import { eq, sql, and } from "drizzle-orm";

// Permissões padrão do owner (todas habilitadas)
const ownerPermissions: MemberPermissions = defaultPermissionsByRole.owner;

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userAny = user as any;
        const keepLoggedIn = userAny.keepLoggedIn === true;
        token.keepLoggedIn = keepLoggedIn;

        // Armazena informações de time e permissões calculadas no login
        token.isTeamMember = userAny.isTeamMember ?? false;
        token.teamOwnerId = userAny.teamOwnerId ?? null;
        token.permissions = userAny.permissions ?? ownerPermissions;

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
        // Passa informações de time e permissões para a sessão
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userAny = session.user as any;
        userAny.isTeamMember = token.isTeamMember ?? false;
        userAny.teamOwnerId = token.teamOwnerId ?? null;
        userAny.permissions = token.permissions ?? ownerPermissions;
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

        // Busca membership e permissões granulares do usuário
        const [membership] = await db
          .select()
          .from(teamMembers)
          .where(and(eq(teamMembers.memberId, user.id), eq(teamMembers.isActive, true)));

        // Se é membro de um time, usa as permissões do membro
        // Se não, é owner do próprio time e tem todas as permissões
        let permissions: MemberPermissions;
        let isTeamMember = false;
        let teamOwnerId: string | null = null;

        if (membership && membership.ownerId !== user.id) {
          // É membro de um time de outro usuário
          isTeamMember = true;
          teamOwnerId = membership.ownerId;
          permissions = {
            canViewInterviews: membership.canViewInterviews,
            canCreateInterviews: membership.canCreateInterviews,
            canEditInterviews: membership.canEditInterviews,
            canDeleteInterviews: membership.canDeleteInterviews,
            canViewCandidates: membership.canViewCandidates,
            canApproveCandidates: membership.canApproveCandidates,
            canRejectCandidates: membership.canRejectCandidates,
            canViewFinancials: membership.canViewFinancials,
            canInviteMembers: membership.canInviteMembers,
            canRemoveMembers: membership.canRemoveMembers,
            canEditMemberPermissions: membership.canEditMemberPermissions,
            canEditSettings: membership.canEditSettings,
            canEditAutoApproval: membership.canEditAutoApproval,
          };
        } else {
          // É owner do próprio time - tem todas as permissões
          permissions = ownerPermissions;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.nome,
          keepLoggedIn: credentials.keepLoggedIn === "true",
          isTeamMember,
          teamOwnerId,
          permissions,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
