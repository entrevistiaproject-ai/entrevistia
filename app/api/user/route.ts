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
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar informações do usuário" },
      { status: 500 }
    );
  }
}
