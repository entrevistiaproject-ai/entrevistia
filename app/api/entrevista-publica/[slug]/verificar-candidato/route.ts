import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, candidatos } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { z } from "zod";
import {
  sanitizeEmail,
  sanitizeSlug,
} from "@/lib/security";

const verificarCandidatoSchema = z.object({
  email: z.string().email("Email inválido").max(255),
});

/**
 * POST /api/entrevista-publica/[slug]/verificar-candidato
 * Verifica se um candidato já existe pelo email
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: rawSlug } = await params;
    const slug = sanitizeSlug(rawSlug);

    if (!slug) {
      return NextResponse.json(
        { error: "Slug inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validar dados
    const validacao = verificarCandidatoSchema.safeParse(body);
    if (!validacao.success) {
      return NextResponse.json(
        { error: "Email inválido", detalhes: validacao.error.flatten() },
        { status: 400 }
      );
    }

    const email = sanitizeEmail(validacao.data.email);

    if (!email) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const db = getDB();

    // Buscar entrevista pelo slug
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.slug, slug),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada" },
        { status: 404 }
      );
    }

    // Buscar candidato pelo email (do mesmo recrutador)
    const [candidato] = await db
      .select({
        id: candidatos.id,
        nome: candidatos.nome,
        email: candidatos.email,
        documento: candidatos.documento,
        sexo: candidatos.sexo,
      })
      .from(candidatos)
      .where(
        and(
          eq(candidatos.email, email),
          eq(candidatos.userId, entrevista.userId),
          isNull(candidatos.deletedAt)
        )
      );

    if (candidato) {
      return NextResponse.json({
        existe: true,
        candidato: {
          id: candidato.id,
          nome: candidato.nome,
          email: candidato.email,
          documento: candidato.documento || "",
          sexo: candidato.sexo || "",
        },
      });
    }

    return NextResponse.json({
      existe: false,
    });
  } catch (error) {
    console.error("Erro ao verificar candidato:", error);
    return NextResponse.json(
      { error: "Erro ao verificar candidato" },
      { status: 500 }
    );
  }
}
