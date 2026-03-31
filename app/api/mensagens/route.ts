import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/get-user";
import { getDB } from "@/lib/db";
import { mensagens, candidatos, templatesMensagem } from "@/lib/db/schema";
import { eq, and, desc, or, ilike } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";

/**
 * GET /api/mensagens
 * Lista mensagens (caixa de entrada do recrutador)
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const candidatoId = searchParams.get("candidatoId");
  const entrevistaId = searchParams.get("entrevistaId");
  const status = searchParams.get("status");
  const arquivada = searchParams.get("arquivada") === "true";
  const naoLidas = searchParams.get("naoLidas") === "true";
  const busca = searchParams.get("busca");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  const db = getDB();
  const conditions = [eq(mensagens.userId, userId), eq(mensagens.arquivada, arquivada)];

  if (candidatoId) conditions.push(eq(mensagens.candidatoId, candidatoId));
  if (entrevistaId) conditions.push(eq(mensagens.entrevistaId, entrevistaId));
  if (status) conditions.push(eq(mensagens.status, status as "enviada" | "aberta" | "erro"));
  if (naoLidas) conditions.push(eq(mensagens.lidaPeloRecrutador, false));
  if (busca) {
    conditions.push(
      or(
        ilike(mensagens.assunto, `%${busca}%`),
        ilike(mensagens.corpo, `%${busca}%`)
      )!
    );
  }

  const msgs = await db
    .select({
      id: mensagens.id,
      canal: mensagens.canal,
      status: mensagens.status,
      recebida: mensagens.recebida,
      assunto: mensagens.assunto,
      corpo: mensagens.corpo,
      candidatoId: mensagens.candidatoId,
      candidatoNome: candidatos.nome,
      candidatoEmail: candidatos.email,
      entrevistaId: mensagens.entrevistaId,
      lidaPeloRecrutador: mensagens.lidaPeloRecrutador,
      abertaEm: mensagens.abertaEm,
      createdAt: mensagens.createdAt,
    })
    .from(mensagens)
    .innerJoin(candidatos, eq(mensagens.candidatoId, candidatos.id))
    .where(and(...conditions))
    .orderBy(desc(mensagens.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  return NextResponse.json({ mensagens: msgs });
}

/**
 * POST /api/mensagens
 * Envia uma nova mensagem para um candidato
 */
export async function POST(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { candidatoId, entrevistaId, templateId, assunto, corpo, canal } = body;

  if (!candidatoId || !corpo) {
    return NextResponse.json(
      { error: "candidatoId e corpo são obrigatórios" },
      { status: 400 }
    );
  }

  const db = getDB();

  // Buscar email do candidato
  const [candidato] = await db
    .select({ email: candidatos.email, nome: candidatos.nome })
    .from(candidatos)
    .where(eq(candidatos.id, candidatoId));

  if (!candidato?.email) {
    return NextResponse.json(
      { error: "Candidato não encontrado ou sem email" },
      { status: 404 }
    );
  }

  let emailId: string | undefined;
  let emailStatus: "enviada" | "erro" = "enviada";
  let erroDetalhe: string | undefined;

  // Enviar por email (canal padrão)
  if (!canal || canal === "email") {
    try {
      const result = await enviarEmail({
        to: candidato.email,
        subject: assunto || "Mensagem do processo seletivo",
        html: corpo,
      });
      emailId = result.emailId;
      if (!result.sent) {
        emailStatus = "enviada"; // Ainda considera como enviada mesmo em modo dev
      }
    } catch (error) {
      emailStatus = "erro";
      erroDetalhe = error instanceof Error ? error.message : "Erro ao enviar email";
    }
  }

  const [msg] = await db
    .insert(mensagens)
    .values({
      userId,
      candidatoId,
      entrevistaId: entrevistaId || null,
      templateId: templateId || null,
      canal: canal || "email",
      status: emailStatus,
      recebida: false,
      assunto,
      corpo,
      emailId,
      erroDetalhe,
    })
    .returning();

  return NextResponse.json({ success: true, mensagem: msg }, { status: 201 });
}
