import { nanoid } from "nanoid";
import { getDB } from "@/lib/db";
import { magicLinks, candidatos } from "@/lib/db/schema";
import { eq, and, gt, isNull } from "drizzle-orm";
import { enviarEmail } from "@/lib/email/resend";

const MAGIC_LINK_EXPIRY_HOURS = 24;

export interface CreateMagicLinkOptions {
  email: string;
  tipo?: "login" | "completar_perfil" | "ver_resultado";
  entrevistaId?: string;
  candidatoId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface MagicLinkResult {
  success: boolean;
  error?: string;
  token?: string;
}

/**
 * Cria um magic link e envia por email
 */
export async function createMagicLink(options: CreateMagicLinkOptions): Promise<MagicLinkResult> {
  const {
    email,
    tipo = "login",
    entrevistaId,
    candidatoId,
    ipAddress,
    userAgent,
  } = options;

  const db = getDB();
  const token = nanoid(32);
  const expiresAt = new Date(Date.now() + MAGIC_LINK_EXPIRY_HOURS * 60 * 60 * 1000);

  try {
    // Cria o magic link no banco
    await db.insert(magicLinks).values({
      email: email.toLowerCase(),
      token,
      tipo,
      entrevistaId,
      candidatoId,
      expiresAt,
      ipAddress,
      userAgent,
    });

    // Monta a URL do magic link
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    let magicLinkUrl = `${baseUrl}/auth/magic-link?token=${token}`;

    // Adiciona parâmetros de contexto
    if (entrevistaId) {
      magicLinkUrl += `&entrevista=${entrevistaId}`;
    }

    // Envia o email
    await sendMagicLinkEmail(email, magicLinkUrl, tipo);

    return { success: true, token };
  } catch (error) {
    console.error("Erro ao criar magic link:", error);
    return { success: false, error: "Erro ao criar link de acesso" };
  }
}

/**
 * Valida um magic link e retorna os dados associados
 */
export async function validateMagicLink(token: string): Promise<{
  valid: boolean;
  error?: string;
  data?: {
    email: string;
    tipo: string;
    entrevistaId?: string;
    candidatoId?: string;
  };
}> {
  const db = getDB();

  try {
    // Busca o magic link
    const [link] = await db
      .select()
      .from(magicLinks)
      .where(
        and(
          eq(magicLinks.token, token),
          isNull(magicLinks.usedAt),
          gt(magicLinks.expiresAt, new Date())
        )
      );

    if (!link) {
      return { valid: false, error: "Link inválido ou expirado" };
    }

    // Marca como usado
    await db
      .update(magicLinks)
      .set({ usedAt: new Date() })
      .where(eq(magicLinks.id, link.id));

    return {
      valid: true,
      data: {
        email: link.email,
        tipo: link.tipo,
        entrevistaId: link.entrevistaId ?? undefined,
        candidatoId: link.candidatoId ?? undefined,
      },
    };
  } catch (error) {
    console.error("Erro ao validar magic link:", error);
    return { valid: false, error: "Erro ao validar link" };
  }
}

/**
 * Busca ou cria um candidato pelo email
 */
export async function findOrCreateCandidatoByEmail(
  email: string,
  ownerId: string,
  nome?: string
): Promise<{ candidatoId: string; isNew: boolean }> {
  const db = getDB();
  const emailLower = email.toLowerCase();

  // Busca candidato existente
  const [existing] = await db
    .select()
    .from(candidatos)
    .where(
      and(
        eq(candidatos.email, emailLower),
        eq(candidatos.userId, ownerId),
        isNull(candidatos.deletedAt)
      )
    );

  if (existing) {
    return { candidatoId: existing.id, isNew: false };
  }

  // Cria novo candidato
  const [newCandidato] = await db
    .insert(candidatos)
    .values({
      email: emailLower,
      nome: nome || emailLower.split("@")[0],
      userId: ownerId,
      origemCadastro: "magic_link",
      consentimentoTratamentoDados: true,
      aceitouTermosEntrevista: true,
      dataAceiteTermos: new Date(),
    })
    .returning();

  return { candidatoId: newCandidato.id, isNew: true };
}

/**
 * Envia o email com o magic link
 */
async function sendMagicLinkEmail(email: string, url: string, tipo: string): Promise<void> {
  const subject = tipo === "login"
    ? "Seu link de acesso - Entrevistia"
    : tipo === "completar_perfil"
    ? "Complete seu perfil - Entrevistia"
    : "Veja seu resultado - Entrevistia";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #6366f1; margin: 0;">Entrevistia</h1>
      </div>

      <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #1e293b;">
          ${tipo === "login" ? "Acesse sua conta" : tipo === "completar_perfil" ? "Complete seu perfil" : "Veja seu resultado"}
        </h2>
        <p style="color: #64748b;">
          ${tipo === "login"
            ? "Clique no botão abaixo para acessar sua conta. Este link é válido por 24 horas."
            : tipo === "completar_perfil"
            ? "Complete seu perfil para participar do processo seletivo. Este link é válido por 24 horas."
            : "Clique no botão abaixo para ver o resultado da sua entrevista. Este link é válido por 24 horas."
          }
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
            ${tipo === "login" ? "Acessar" : tipo === "completar_perfil" ? "Completar Perfil" : "Ver Resultado"}
          </a>
        </div>

        <p style="color: #94a3b8; font-size: 14px;">
          Se você não solicitou este link, pode ignorar este email.
        </p>
      </div>

      <div style="text-align: center; color: #94a3b8; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Entrevistia. Todos os direitos reservados.</p>
      </div>
    </body>
    </html>
  `;

  await enviarEmail({
    to: email,
    subject,
    html,
  });
}
