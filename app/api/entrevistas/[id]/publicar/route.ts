import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { entrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * POST /api/entrevistas/[id]/publicar
 * Publica a entrevista e gera um link público
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = getDB();

    // Verificar se a entrevista pertence ao usuário
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, id),
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

    // Gerar slug único se não existir
    let slug = entrevista.slug;
    if (!slug) {
      // Criar slug baseado no título + ID curto
      const tituloSlug = entrevista.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/[^a-z0-9]+/g, "-") // Substitui caracteres especiais por hífen
        .replace(/^-+|-+$/g, ""); // Remove hífens do início e fim

      slug = `${tituloSlug}-${nanoid(8)}`;
    }

    // Obter a URL base do request
    const baseUrl = process.env.NEXTAUTH_URL || `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}`;
    const linkPublico = `${baseUrl}/entrevista/${slug}`;

    // Atualizar entrevista
    const [entrevistaAtualizada] = await db
      .update(entrevistas)
      .set({
        status: "publicada",
        slug,
        linkPublico,
        updatedAt: new Date(),
      })
      .where(eq(entrevistas.id, id))
      .returning();

    return NextResponse.json({
      linkPublico: entrevistaAtualizada.linkPublico,
      slug: entrevistaAtualizada.slug,
      status: entrevistaAtualizada.status,
    });
  } catch (error) {
    console.error("Erro ao publicar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao publicar entrevista" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/entrevistas/[id]/publicar
 * Despublica a entrevista (torna privada novamente)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = getDB();

    // Verificar se a entrevista pertence ao usuário
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.id, id),
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

    // Atualizar status para rascunho
    const [entrevistaAtualizada] = await db
      .update(entrevistas)
      .set({
        status: "rascunho",
        updatedAt: new Date(),
      })
      .where(eq(entrevistas.id, id))
      .returning();

    return NextResponse.json({
      status: entrevistaAtualizada.status,
      mensagem: "Entrevista despublicada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao despublicar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao despublicar entrevista" },
      { status: 500 }
    );
  }
}
