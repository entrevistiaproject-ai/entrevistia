import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/user
 * Retorna informações do usuário logado
 */
export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const db = getDB();

    const [user] = await db
      .select({
        id: users.id,
        nome: users.nome,
        email: users.email,
        telefone: users.telefone,
        empresa: users.empresa,
        cargo: users.cargo,
        planType: users.planType,
        planStatus: users.planStatus,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar informações do usuário" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user
 * Atualiza informações do perfil do usuário
 */
export async function PUT(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nome, telefone, empresa, cargo } = body;

    if (!nome || nome.trim().length < 2) {
      return NextResponse.json(
        { error: "Nome é obrigatório e deve ter pelo menos 2 caracteres" },
        { status: 400 }
      );
    }

    const db = getDB();

    const [updatedUser] = await db
      .update(users)
      .set({
        nome: nome.trim(),
        telefone: telefone?.trim() || null,
        empresa: empresa?.trim() || null,
        cargo: cargo?.trim() || null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        nome: users.nome,
        email: users.email,
        telefone: users.telefone,
        empresa: users.empresa,
        cargo: users.cargo,
      });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar informações do usuário" },
      { status: 500 }
    );
  }
}
