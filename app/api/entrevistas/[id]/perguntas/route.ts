import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { entrevistas, perguntas } from "@/lib/db/schema";
import { eq, and, isNull, asc, inArray } from "drizzle-orm";

export async function GET(
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

    // Buscar perguntas da entrevista ordenadas por ordem
    const perguntasEntrevista = await db
      .select()
      .from(perguntas)
      .where(
        and(
          eq(perguntas.entrevistaId, id),
          isNull(perguntas.deletedAt)
        )
      )
      .orderBy(asc(perguntas.ordem));

    return NextResponse.json(perguntasEntrevista);
  } catch (error) {
    console.error("Erro ao buscar perguntas da entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao buscar perguntas" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const body = await request.json();
    const { perguntas: novasPerguntas } = body;

    if (!novasPerguntas || !Array.isArray(novasPerguntas) || novasPerguntas.length === 0) {
      return NextResponse.json(
        { error: "A entrevista precisa ter pelo menos uma pergunta" },
        { status: 400 }
      );
    }

    // Buscar perguntas existentes
    const perguntasExistentes = await db
      .select()
      .from(perguntas)
      .where(
        and(
          eq(perguntas.entrevistaId, id),
          isNull(perguntas.deletedAt)
        )
      );

    const idsExistentes = perguntasExistentes.map((p) => p.id);
    const idsNovas = novasPerguntas.filter((p: { id?: string }) => p.id).map((p: { id: string }) => p.id);

    // IDs de perguntas que foram removidas (existem no banco mas não estão mais na lista)
    const idsRemovidas = idsExistentes.filter((id) => !idsNovas.includes(id));

    // Soft delete das perguntas removidas
    if (idsRemovidas.length > 0) {
      await db
        .update(perguntas)
        .set({ deletedAt: new Date() })
        .where(inArray(perguntas.id, idsRemovidas));
    }

    // Atualizar/criar perguntas
    for (const pergunta of novasPerguntas) {
      if (pergunta.id) {
        // Atualizar pergunta existente
        await db
          .update(perguntas)
          .set({
            texto: pergunta.texto,
            ordem: pergunta.ordem,
            updatedAt: new Date(),
          })
          .where(eq(perguntas.id, pergunta.id));
      } else {
        // Criar nova pergunta
        await db.insert(perguntas).values({
          entrevistaId: id,
          texto: pergunta.texto,
          ordem: pergunta.ordem,
          tipo: "aberta",
          obrigatoria: "sim",
          pontuacaoMaxima: 10,
        });
      }
    }

    // Buscar perguntas atualizadas
    const perguntasAtualizadas = await db
      .select()
      .from(perguntas)
      .where(
        and(
          eq(perguntas.entrevistaId, id),
          isNull(perguntas.deletedAt)
        )
      )
      .orderBy(asc(perguntas.ordem));

    return NextResponse.json(perguntasAtualizadas);
  } catch (error) {
    console.error("Erro ao atualizar perguntas da entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar perguntas" },
      { status: 500 }
    );
  }
}
