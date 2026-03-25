import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/db";
import { users, teamMembers, candidatos, defaultPermissionsByRole, type MemberPermissions } from "@/lib/db/schema";
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
    async signIn({ user, account, profile }) {
      // Para OAuth providers (LinkedIn, Google), criar ou atualizar candidato
      if (account?.provider === "linkedin" || account?.provider === "google") {
        try {
          const db = getDB();
          const email = user.email?.toLowerCase();

          if (!email) {
            console.error("OAuth sign-in: email not provided");
            return false;
          }

          // Busca candidato existente pelo email
          const [existingCandidato] = await db
            .select()
            .from(candidatos)
            .where(eq(candidatos.email, email));

          if (existingCandidato) {
            // Atualiza dados do candidato se necessário
            const updateData: Record<string, unknown> = {
              updatedAt: new Date(),
            };

            // Atualiza LinkedIn URL se veio do LinkedIn
            if (account.provider === "linkedin" && profile?.sub) {
              updateData.linkedin = `https://www.linkedin.com/in/${profile.sub}`;
            }

            // Atualiza nome se estava vazio
            if (!existingCandidato.nome && user.name) {
              updateData.nome = user.name;
            }

            await db
              .update(candidatos)
              .set(updateData)
              .where(eq(candidatos.id, existingCandidato.id));

            // Armazena o ID do candidato no user para o JWT
            user.candidatoId = existingCandidato.id;
            user.isCandidate = true;
          } else {
            // Não cria candidato automaticamente - precisa de contexto (entrevista, recrutador)
            // O candidato será redirecionado para completar o cadastro
            user.isCandidate = true;
            user.needsRegistration = true;
          }

          return true;
        } catch (error) {
          console.error("OAuth sign-in error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id!;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
        const keepLoggedIn = user.keepLoggedIn === true;
        token.keepLoggedIn = keepLoggedIn;

        // Para OAuth (candidatos)
        if (account?.provider === "linkedin" || account?.provider === "google") {
          token.isCandidate = true;
          token.candidatoId = user.candidatoId ?? null;
          token.needsRegistration = user.needsRegistration ?? false;
          token.provider = account.provider;
          token.providerAccountId = account.providerAccountId;
          // Candidatos não têm permissões de recrutador
          token.permissions = null;
          token.isTeamMember = false;
          token.teamOwnerId = null;
        } else {
          // Credentials (recrutadores)
          token.isCandidate = false;
          // Armazena informações de time e permissões calculadas no login
          token.isTeamMember = user.isTeamMember ?? false;
          token.teamOwnerId = user.teamOwnerId ?? null;
          token.permissions = user.permissions ?? ownerPermissions;
        }

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
        // Type assertion para usar os tipos definidos em types/next-auth.d.ts
        const t = token as JWT;

        session.user.id = t.id;
        session.user.email = t.email ?? "";
        session.user.name = t.name ?? "";

        // Informações de candidato (OAuth)
        session.user.isCandidate = t.isCandidate ?? false;
        session.user.candidatoId = t.candidatoId ?? null;
        session.user.needsRegistration = t.needsRegistration ?? false;
        session.user.provider = t.provider ?? null;

        // Informações de recrutador (Credentials)
        session.user.isTeamMember = t.isTeamMember ?? false;
        session.user.teamOwnerId = t.teamOwnerId ?? null;
        const perms = t.permissions ?? (t.isCandidate ? null : ownerPermissions);
        session.user.permissions = perms === null ? undefined : perms;
      }
      return session;
    },
  },
  providers: [
    // LinkedIn OAuth - para candidatos se cadastrarem
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),

    // Google OAuth - alternativa para candidatos
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Credentials - para recrutadores
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
