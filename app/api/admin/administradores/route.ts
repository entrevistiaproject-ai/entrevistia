import { NextResponse } from "next/server";
import { verifyAdminSession, createAdminUser } from "@/lib/auth/admin-auth";
import { getDB } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageAdmins) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const db = getDB();

    const adminsData = await db
      .select({
        id: adminUsers.id,
        nome: adminUsers.nome,
        email: adminUsers.email,
        role: adminUsers.role,
        isActive: adminUsers.isActive,
        lastLoginAt: adminUsers.lastLoginAt,
        createdAt: adminUsers.createdAt,
        canManageUsers: adminUsers.canManageUsers,
        canManageFinances: adminUsers.canManageFinances,
        canViewAnalytics: adminUsers.canViewAnalytics,
        canManageAdmins: adminUsers.canManageAdmins,
        canAccessLogs: adminUsers.canAccessLogs,
      })
      .from(adminUsers)
      .orderBy(desc(adminUsers.createdAt));

    const admins = adminsData.map((admin) => ({
      id: admin.id,
      nome: admin.nome,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
      lastLoginAt: admin.lastLoginAt?.toISOString() || null,
      createdAt: admin.createdAt.toISOString(),
      permissions: {
        canManageUsers: admin.canManageUsers,
        canManageFinances: admin.canManageFinances,
        canViewAnalytics: admin.canViewAnalytics,
        canManageAdmins: admin.canManageAdmins,
        canAccessLogs: admin.canAccessLogs,
      },
    }));

    return NextResponse.json({ admins });
  } catch (error) {
    console.error("Erro ao listar admins:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session || !session.permissions.canManageAdmins) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { nome, email, password, role } = body;

    if (!nome || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const result = await createAdminUser({
      nome,
      email,
      password,
      role: role || "admin",
      createdBy: session.id,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, adminId: result.adminId });
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
