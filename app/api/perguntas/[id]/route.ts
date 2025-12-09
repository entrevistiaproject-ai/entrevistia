import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sugerirCategoria } from "@/lib/utils/classificacao-perguntas";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Buscar uma pergunta específica
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const db = getDB();

    const [pergunta] = await db
      .select()
      .from(perguntasTemplates)
      .where(eq(perguntasTemplates.id, id))
      .limit(1);

    if (!pergunta) {
      return NextResponse.json(
        { error: "Pergunta não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(pergunta);
  } catch (error) {
    console.error("Erro ao buscar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar uma pergunta
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const db = getDB();

    // Verificar se a pergunta existe e pertence ao usuário
    const [perguntaExistente] = await db
      .select()
      .from(perguntasTemplates)
      .where(eq(perguntasTemplates.id, id))
      .limit(1);

    if (!perguntaExistente) {
      return NextResponse.json(
        { error: "Pergunta não encontrada" },
        { status: 404 }
      );
    }

    // Não permite editar perguntas padrão do sistema
    if (perguntaExistente.isPadrao) {
      return NextResponse.json(
        { error: "Não é possível editar perguntas padrão do sistema" },
        { status: 403 }
      );
    }

    // Verificar se a pergunta pertence ao usuário
    if (perguntaExistente.userId !== userId) {
      return NextResponse.json(
        { error: "Você não tem permissão para editar esta pergunta" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      texto,
      cargo,
      nivel,
      categoria,
      competencia,
      tipo,
      criteriosAvaliacao,
    } = body;

    // Se categoria não foi fornecida, sugere automaticamente
    const categoriaFinal = categoria || sugerirCategoria(texto || perguntaExistente.texto).categoria;

    // Atualizar pergunta
    const [perguntaAtualizada] = await db
      .update(perguntasTemplates)
      .set({
        texto: texto || perguntaExistente.texto,
        cargo: cargo || perguntaExistente.cargo,
        nivel: nivel || perguntaExistente.nivel,
        categoria: categoriaFinal,
        competencia: competencia !== undefined ? competencia : perguntaExistente.competencia,
        tipo: tipo || perguntaExistente.tipo,
        criteriosAvaliacao: criteriosAvaliacao !== undefined ? criteriosAvaliacao : perguntaExistente.criteriosAvaliacao,
        updatedAt: new Date(),
      })
      .where(eq(perguntasTemplates.id, id))
      .returning();

    return NextResponse.json(perguntaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar uma pergunta (soft delete)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const db = getDB();

    // Verificar se a pergunta existe e pertence ao usuário
    const [perguntaExistente] = await db
      .select()
      .from(perguntasTemplates)
      .where(eq(perguntasTemplates.id, id))
      .limit(1);

    if (!perguntaExistente) {
      return NextResponse.json(
        { error: "Pergunta não encontrada" },
        { status: 404 }
      );
    }

    // Não permite deletar perguntas padrão do sistema
    if (perguntaExistente.isPadrao) {
      return NextResponse.json(
        { error: "Não é possível deletar perguntas padrão do sistema. Use a opção de ocultar." },
        { status: 403 }
      );
    }

    // Verificar se a pergunta pertence ao usuário
    if (perguntaExistente.userId !== userId) {
      return NextResponse.json(
        { error: "Você não tem permissão para deletar esta pergunta" },
        { status: 403 }
      );
    }

    // Soft delete - apenas marca a data de exclusão
    await db
      .update(perguntasTemplates)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(perguntasTemplates.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar pergunta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
