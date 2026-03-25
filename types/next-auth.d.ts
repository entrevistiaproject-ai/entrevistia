import { DefaultSession, DefaultUser } from "next-auth";
import { MemberPermissions } from "@/lib/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // Campos de candidato (OAuth)
      isCandidate?: boolean;
      candidatoId?: string | null;
      needsRegistration?: boolean;
      provider?: string | null;
      // Campos de recrutador (Credentials)
      isTeamMember?: boolean;
      teamOwnerId?: string | null;
      permissions?: MemberPermissions | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    // Campos customizados para Credentials
    keepLoggedIn?: boolean;
    isTeamMember?: boolean;
    teamOwnerId?: string | null;
    permissions?: MemberPermissions;
    // Campos para OAuth (candidatos)
    isCandidate?: boolean;
    candidatoId?: string | null;
    needsRegistration?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    name?: string;
    keepLoggedIn?: boolean;
    // Campos de candidato (OAuth)
    isCandidate?: boolean;
    candidatoId?: string | null;
    needsRegistration?: boolean;
    provider?: string;
    providerAccountId?: string;
    // Campos de recrutador (Credentials)
    isTeamMember?: boolean;
    teamOwnerId?: string | null;
    permissions?: MemberPermissions | null;
  }
}
