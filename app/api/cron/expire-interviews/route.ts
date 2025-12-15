import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { candidatoEntrevistas } from "@/lib/db/schema";
import { eq, and, lt, isNotNull } from "drizzle-orm";
import { logger } from "@/lib/logger";

const BATCH_SIZE = 50;

// Verifica se a request vem do Vercel Cron
function isValidCronRequest(request: NextRequest): boolean {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  return false;
}

/**
 * GET /api/cron/expire-interviews
 * Marca entrevistas em andamento como expiradas quando o prazo é ultrapassado
 */
export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();

  try {
    const db = getDB();
    const agora = new Date();

    // Buscar entrevistas em andamento com prazo expirado
    const entrevistasExpiradas = await db
      .select({ id: candidatoEntrevistas.id })
      .from(candidatoEntrevistas)
      .where(
        and(
          eq(candidatoEntrevistas.status, "em_andamento"),
          isNotNull(candidatoEntrevistas.prazoResposta),
          lt(candidatoEntrevistas.prazoResposta, agora)
        )
      )
      .limit(BATCH_SIZE);

    if (entrevistasExpiradas.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nenhuma entrevista para expirar",
        processadas: 0,
        tempoMs: Date.now() - startTime,
      });
    }

    // Marcar como expiradas
    const ids = entrevistasExpiradas.map((e) => e.id);
    let expiradas = 0;

    for (const id of ids) {
      try {
        await db
          .update(candidatoEntrevistas)
          .set({
            status: "expirada",
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(candidatoEntrevistas.id, id),
              eq(candidatoEntrevistas.status, "em_andamento") // Double-check
            )
          );
        expiradas++;
      } catch (error) {
        logger.error(`Erro ao expirar entrevista ${id}`, error);
      }
    }

    logger.info(`Cron expire-interviews: ${expiradas} entrevistas expiradas`);

    return NextResponse.json({
      success: true,
      message: `${expiradas} entrevistas marcadas como expiradas`,
      processadas: expiradas,
      tempoMs: Date.now() - startTime,
    });
  } catch (error) {
    logger.error("Erro no cron expire-interviews", error);
    return NextResponse.json(
      { error: "Erro interno", details: String(error) },
      { status: 500 }
    );
  }
}
