import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { entrevistas, candidatos, candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { z } from "zod";

const iniciarEntrevistaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  emailConfirmacao: z.string().email("Email de confirmação inválido"),
  documento: z.string().optional(),
  sexo: z.enum(["masculino", "feminino", "outro", "prefiro_nao_informar"]).optional(),
}).refine((data) => data.email === data.emailConfirmacao, {
  message: "Os emails não coincidem",
  path: ["emailConfirmacao"],
});

/**
 * POST /api/entrevista-publica/[slug]/iniciar
 * Cria/atualiza candidato e inicia a entrevista
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Validar dados
    const validacao = iniciarEntrevistaSchema.safeParse(body);
    if (!validacao.success) {
      return NextResponse.json(
        { error: "Dados inválidos", detalhes: validacao.error.flatten() },
        { status: 400 }
      );
    }

    const { nome, email, documento, sexo } = validacao.data;
    const db = getDB();

    // Buscar entrevista pelo slug
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(
        and(
          eq(entrevistas.slug, slug),
          eq(entrevistas.status, "publicada"),
          isNull(entrevistas.deletedAt)
        )
      );

    if (!entrevista) {
      return NextResponse.json(
        { error: "Entrevista não encontrada ou não está disponível" },
        { status: 404 }
      );
    }

    // Verificar se o link expirou
    if (entrevista.expiracaoLink && new Date(entrevista.expiracaoLink) < new Date()) {
      return NextResponse.json(
        { error: "Link de entrevista expirado" },
        { status: 410 }
      );
    }

    // Criar ou buscar candidato
    const [candidatoExistente] = await db
      .select()
      .from(candidatos)
      .where(
        and(
          eq(candidatos.email, email),
          eq(candidatos.userId, entrevista.userId),
          isNull(candidatos.deletedAt)
        )
      );

    let candidatoId: string;

    if (candidatoExistente) {
      // Atualizar dados do candidato
      const [candidatoAtualizado] = await db
        .update(candidatos)
        .set({
          nome,
          documento,
          sexo,
          updatedAt: new Date(),
        })
        .where(eq(candidatos.id, candidatoExistente.id))
        .returning();

      candidatoId = candidatoAtualizado.id;
    } else {
      // Criar novo candidato
      const [novoCandidato] = await db
        .insert(candidatos)
        .values({
          userId: entrevista.userId,
          nome,
          email,
          documento,
          sexo,
          aceitouTermosEntrevista: true,
          dataAceiteTermos: new Date(),
          consentimentoTratamentoDados: true,
          finalidadeTratamento: `Processo seletivo: ${entrevista.titulo}`,
          ipCadastro: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
          origemCadastro: "link_entrevista",
        })
        .returning();

      candidatoId = novoCandidato.id;
    }

    // Verificar se já existe uma sessão ativa
    const [sessaoExistente] = await db
      .select()
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.candidatoId, candidatoId),
          eq(candidatoEntrevistas.entrevistaId, entrevista.id)
        )
      );

    let sessaoId: string;

    if (sessaoExistente) {
      sessaoId = sessaoExistente.id;
    } else {
      // Criar nova sessão de entrevista
      const [novaSessao] = await db
        .insert(candidatoEntrevistas)
        .values({
          candidatoId,
          entrevistaId: entrevista.id,
          status: "em_andamento",
          iniciadaEm: new Date(),
        })
        .returning();

      sessaoId = novaSessao.id;
    }

    return NextResponse.json({
      candidatoId,
      sessaoId,
      entrevistaId: entrevista.id,
    });
  } catch (error) {
    console.error("Erro ao iniciar entrevista:", error);
    return NextResponse.json(
      { error: "Erro ao processar cadastro" },
      { status: 500 }
    );
  }
}
