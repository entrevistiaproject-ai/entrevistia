import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";

function getUserIdFromRequest(request: Request): string | null {
  return request.headers.get("x-user-id");
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const db = getDB();
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, params.id),
          eq(entrevistas.userId, userId),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(entrevista);
  } catch (error) {
    console.error("Erro ao buscar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao buscar entrevista" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const db = getDB();

    // Verificar se a entrevista pertence ao usuário
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, params.id),
          eq(entrevistas.userId, userId),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Gerar slug se solicitado
    if (body.gerarLink && !entrevista.slug) {
      body.slug = nanoid(10);
      body.linkPublico = `/entrevista/${body.slug}`;
    }

    // Atualizar entrevista
    const [entrevistaAtualizada] = await db
      .update(entrevistas)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(entrevistas.id, params.id))
      .returning();

    return NextResponse.json(entrevistaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar entrevista" },
      { status: 500 }
    );
  }
}
