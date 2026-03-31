import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { templatesMensagem } from "@/lib/db/schema";
import { eq, and, or, isNull } from "drizzle-orm";

/**
 * GET /api/mensagens/templates
 * Lista templates disponíveis (globais + do recrutador)
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const tipo = searchParams.get("tipo");

  const db = getDB();
  const conditions = [
    eq(templatesMensagem.ativo, true),
    or(
      isNull(templatesMensagem.userId),          // Templates globais
      eq(templatesMensagem.userId, userId)        // Templates do recrutador
    )!,
  ];

  if (tipo) {
    conditions.push(eq(templatesMensagem.tipo, tipo as typeof templatesMensagem.tipo.enumValues[number]));
  }

  const templates = await db
    .select()
    .from(templatesMensagem)
    .where(and(...conditions));

  return NextResponse.json({ templates });
}

/**
 * POST /api/mensagens/templates
 * Cria um novo template de mensagem
 */
export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { nome, tipo, canal, assunto, corpo, variaveis } = body;

  if (!nome || !tipo || !corpo) {
    return NextResponse.json(
      { error: "nome, tipo e corpo são obrigatórios" },
      { status: 400 }
    );
  }

  const db = getDB();

  const [template] = await db
    .insert(templatesMensagem)
    .values({
      userId,
      nome,
      tipo,
      canal: canal || "email",
      assunto,
      corpo,
      variaveis: variaveis ? JSON.stringify(variaveis) : null,
    })
    .returning();

  return NextResponse.json({ success: true, template }, { status: 201 });
}
