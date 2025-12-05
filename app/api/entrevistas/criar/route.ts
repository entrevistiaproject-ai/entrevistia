import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, perguntas, perguntasTemplates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { canCreateEntrevista, canAddPerguntas, incrementEntrevistasCount } from "@/lib/services/plan-limits";

// Função helper para pegar userId do header (temporário até implementar JWT)
function getUserIdFromRequest(request: Request): string | null {
  const userId = request.headers.get("x-user-id");
  return userId;
}

interface PerguntaRequest {
  id?: string; // ID se for do banco de perguntas
  texto: string;
  competencia?: string;
  categoria?: string;
  origem: "banco" | "nova";
  salvarNoBanco?: boolean;
}

interface CreateEntrevistaRequest {
  titulo: string;
  descricao?: string;
  cargo: string;
  nivel?: string;
  empresa?: string;
  duracao?: number;
  perguntas: PerguntaRequest[];
}

export async function POST(request: NextRequest) {
  try {
    const db = getDB();
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const body: CreateEntrevistaRequest = await request.json();

    // Validações básicas
    if (!body.titulo || !body.cargo) {
      return NextResponse.json(
        { error: "Título e cargo são obrigatórios" },
        { status: 400 }
      );
    }

    if (!body.perguntas || body.perguntas.length === 0) {
      return NextResponse.json(
        { error: "É necessário adicionar pelo menos uma pergunta" },
        { status: 400 }
      );
    }

    // Verifica limite de entrevistas do plano
    const limiteEntrevista = await canCreateEntrevista(userId);
    if (!limiteEntrevista.allowed) {
      return NextResponse.json(
        {
          error: limiteEntrevista.reason,
          code: "LIMIT_EXCEEDED",
          limitType: "entrevistas",
        },
        { status: 403 }
      );
    }

    // Gera slug único
    const slug = `${body.titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${Date.now().toString(36)}`;

    // Cria a entrevista
    const [novaEntrevista] = await db
      .insert(entrevistas)
      .values({
        userId,
        titulo: body.titulo,
        descricao: body.descricao || null,
        cargo: body.cargo || null,
        empresa: body.empresa || null,
        duracao: body.duracao || 30,
        slug,
        status: "rascunho",
      })
      .returning();

    // Verifica limite de perguntas por entrevista
    const limitePerguntas = await canAddPerguntas(userId, novaEntrevista.id, body.perguntas.length);
    if (!limitePerguntas.allowed) {
      // Desfaz a criação da entrevista
      await db.delete(entrevistas).where(eq(entrevistas.id, novaEntrevista.id));

      return NextResponse.json(
        {
          error: limitePerguntas.reason,
          code: "LIMIT_EXCEEDED",
          limitType: "perguntas",
        },
        { status: 403 }
      );
    }

    // Adiciona as perguntas
    const perguntasParaInserir = [];

    for (let i = 0; i < body.perguntas.length; i++) {
      const pergunta = body.perguntas[i];

      // Se for uma pergunta nova que deve ser salva no banco de templates
      if (pergunta.origem === "nova" && pergunta.salvarNoBanco) {
        const [template] = await db
          .insert(perguntasTemplates)
          .values({
            texto: pergunta.texto,
            competencia: pergunta.competencia || "Geral",
            categoria: pergunta.categoria || "tecnica",
            cargo: body.cargo || "Geral",
            nivel: body.nivel || "pleno",
            userId: userId,
          })
          .returning();

        perguntasParaInserir.push({
          entrevistaId: novaEntrevista.id,
          texto: pergunta.texto,
          ordem: i + 1,
        });
      } else if (pergunta.origem === "banco" && pergunta.id) {
        // Se for do banco de perguntas, busca os dados completos
        const [template] = await db
          .select()
          .from(perguntasTemplates)
          .where(eq(perguntasTemplates.id, pergunta.id))
          .limit(1);

        if (template) {
          perguntasParaInserir.push({
            entrevistaId: novaEntrevista.id,
            texto: template.texto,
            ordem: i + 1,
          });
        }
      } else {
        // Pergunta nova que não será salva no banco
        perguntasParaInserir.push({
          entrevistaId: novaEntrevista.id,
          texto: pergunta.texto,
          ordem: i + 1,
        });
      }
    }

    // Insere todas as perguntas
    await db.insert(perguntas).values(perguntasParaInserir);

    // Incrementa contador de entrevistas do usuário
    await incrementEntrevistasCount(userId);

    return NextResponse.json(
      {
        message: "Entrevista criada com sucesso",
        entrevista: {
          id: novaEntrevista.id,
          slug: novaEntrevista.slug,
          titulo: novaEntrevista.titulo,
          totalPerguntas: perguntasParaInserir.length,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao criar entrevista. Tente novamente." },
      { status: 500 }
    );
  }
}
