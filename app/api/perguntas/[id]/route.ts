import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { perguntasTemplates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sugerirCategoria } from "@/lib/utils/classificacao-perguntas";
import {
  requirePerguntaTemplateAccess,
  requirePerguntaTemplateEditAccess,
  isErrorResponse,
} from "@/lib/security/ownership";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Buscar uma pergunta específica
// PROTEGIDO: Requer autenticação e verifica ownership (ou permite perguntas padrão do sistema)
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Verifica autenticação e ownership (permite templates do sistema)
    const accessResult = await requirePerguntaTemplateAccess(id, true);
    if (isErrorResponse(accessResult)) {
      return accessResult;
    }

    const { pergunta } = accessResult;
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
// PROTEGIDO: Requer autenticação e verifica ownership (não permite editar perguntas padrão)
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Verifica autenticação e permissão de edição
    const accessResult = await requirePerguntaTemplateEditAccess(id);
    if (isErrorResponse(accessResult)) {
      return accessResult;
    }

    const { pergunta: perguntaExistente } = accessResult;
    const db = getDB();

    const body = await request.json();
    const {
      texto,
      cargo,
      nivel,
      categoria,
      competencia,
      tipo,
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
// PROTEGIDO: Requer autenticação e verifica ownership (não permite deletar perguntas padrão)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Verifica autenticação e permissão de edição (mesma regra do PUT)
    const accessResult = await requirePerguntaTemplateEditAccess(id);
    if (isErrorResponse(accessResult)) {
      return accessResult;
    }

    const db = getDB();

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
