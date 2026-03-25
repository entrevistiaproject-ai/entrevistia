import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDB } from "@/lib/db";
import { candidatos, candidatoTags } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { getEffectiveOwnerId } from "@/lib/services/team-service";
import { z } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

const tagSchema = z.object({
  nome: z.string().min(1).max(50),
  cor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

/**
 * GET /api/candidatos/[id]/tags
 * Retorna as tags do candidato
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id: candidatoId } = await params;
    const db = getDB();
    const effectiveOwnerId = await getEffectiveOwnerId(session.user.id);

    // Verifica se o candidato existe e pertence ao usuário
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.id, candidatoId),
          eq(candidatos.userId, effectiveOwnerId),
          isNull(candidatos.deletedAt)
        )
      );

    if (!candidato) {
      return NextResponse.json({ error: "Candidato não encontrado" }, { status: 404 });
    }

    // Busca tags do candidato
    const tags = await db
      .select()
      .from(candidatoTags)
      .where(eq(candidatoTags.candidatoId, candidatoId));

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidatos/[id]/tags
 * Adiciona uma tag ao candidato
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id: candidatoId } = await params;
    const db = getDB();
    const effectiveOwnerId = await getEffectiveOwnerId(session.user.id);

    // Verifica se o candidato existe e pertence ao usuário
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.id, candidatoId),
          eq(candidatos.userId, effectiveOwnerId),
          isNull(candidatos.deletedAt)
        )
      );

    if (!candidato) {
      return NextResponse.json({ error: "Candidato não encontrado" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = tagSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { nome, cor } = parsed.data;

    // Insere a tag
    const [newTag] = await db
      .insert(candidatoTags)
      .values({
        candidatoId,
        nome,
        cor: cor || "#6366f1",
        criadoPor: session.user.id,
      })
      .returning();

    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar tag:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/candidatos/[id]/tags
 * Remove uma tag do candidato (via query param: ?tagId=xxx)
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id: candidatoId } = await params;
    const tagId = request.nextUrl.searchParams.get("tagId");

    if (!tagId) {
      return NextResponse.json({ error: "tagId é obrigatório" }, { status: 400 });
    }

    const db = getDB();
    const effectiveOwnerId = await getEffectiveOwnerId(session.user.id);

    // Verifica se o candidato existe e pertence ao usuário
    const [candidato] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.id, candidatoId),
          eq(candidatos.userId, effectiveOwnerId),
          isNull(candidatos.deletedAt)
        )
      );

    if (!candidato) {
      return NextResponse.json({ error: "Candidato não encontrado" }, { status: 404 });
    }

    // Remove a tag
    await db
      .delete(candidatoTags)
      .where(
        and(
          eq(candidatoTags.id, tagId),
          eq(candidatoTags.candidatoId, candidatoId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao remover tag:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
