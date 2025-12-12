import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { getDB } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Secret para JWT admin - DEVE estar configurado em produção
const adminSecret = process.env.ADMIN_JWT_SECRET || process.env.AUTH_SECRET;
if (!adminSecret && process.env.NODE_ENV === "production") {
  throw new Error("ADMIN_JWT_SECRET ou AUTH_SECRET deve estar configurado em produção");
}
const ADMIN_JWT_SECRET = new TextEncoder().encode(
  adminSecret || "dev-only-secret-not-for-production"
);

const ADMIN_COOKIE_NAME = "admin-session";
const ADMIN_SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 horas

export interface AdminSession {
  id: string;
  email: string;
  nome: string;
  role: string;
  permissions: {
    canManageUsers: boolean;
    canManageFinances: boolean;
    canViewAnalytics: boolean;
    canManageAdmins: boolean;
    canAccessLogs: boolean;
  };
}

export async function createAdminSession(adminId: string): Promise<string> {
  const db = getDB();
  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, adminId));

  if (!admin) {
    throw new Error("Admin não encontrado");
  }

  const session: AdminSession = {
    id: admin.id,
    email: admin.email,
    nome: admin.nome,
    role: admin.role,
    permissions: {
      canManageUsers: admin.canManageUsers,
      canManageFinances: admin.canManageFinances,
      canViewAnalytics: admin.canViewAnalytics,
      canManageAdmins: admin.canManageAdmins,
      canAccessLogs: admin.canAccessLogs,
    },
  };

  const token = await new SignJWT({ ...session } as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(ADMIN_JWT_SECRET);

  return token;
}

export async function verifyAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, ADMIN_JWT_SECRET);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_DURATION / 1000,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function authenticateAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; admin?: AdminSession; error?: string }> {
  try {
    const db = getDB();
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email.toLowerCase()));

    if (!admin) {
      return { success: false, error: "Credenciais inválidas" };
    }

    if (!admin.isActive) {
      return { success: false, error: "Conta desativada" };
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordValid) {
      return { success: false, error: "Credenciais inválidas" };
    }

    // Atualiza último login
    await db
      .update(adminUsers)
      .set({
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, admin.id));

    const token = await createAdminSession(admin.id);
    await setAdminCookie(token);

    return {
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        nome: admin.nome,
        role: admin.role,
        permissions: {
          canManageUsers: admin.canManageUsers,
          canManageFinances: admin.canManageFinances,
          canViewAnalytics: admin.canViewAnalytics,
          canManageAdmins: admin.canManageAdmins,
          canAccessLogs: admin.canAccessLogs,
        },
      },
    };
  } catch (error) {
    console.error("Erro ao autenticar admin:", error);
    return { success: false, error: "Erro interno do servidor" };
  }
}

export async function createAdminUser(data: {
  nome: string;
  email: string;
  password: string;
  role?: string;
  createdBy?: string;
}): Promise<{ success: boolean; adminId?: string; error?: string }> {
  try {
    const db = getDB();

    // Verifica se já existe
    const [existing] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, data.email.toLowerCase()));

    if (existing) {
      return { success: false, error: "Email já cadastrado" };
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const [newAdmin] = await db
      .insert(adminUsers)
      .values({
        nome: data.nome,
        email: data.email.toLowerCase(),
        passwordHash,
        role: data.role || "admin",
        createdBy: data.createdBy,
      })
      .returning({ id: adminUsers.id });

    return { success: true, adminId: newAdmin.id };
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    return { success: false, error: "Erro interno do servidor" };
  }
}

// Utilitário para verificar permissões específicas
export function hasPermission(
  session: AdminSession | null,
  permission: keyof AdminSession["permissions"]
): boolean {
  if (!session) return false;
  if (session.role === "super_admin") return true;
  return session.permissions[permission];
}
