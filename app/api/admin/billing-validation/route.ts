import { NextResponse } from "next/server";
import { verifyAdminSession, hasPermission } from "@/lib/auth/admin-auth";
import {
  validarBillingUsuario,
  validarBillingGlobal,
  corrigirBillingUsuario,
  gerarRelatorioBilling,
} from "@/lib/services/billing-validation";

/**
 * GET /api/admin/billing-validation
 * Retorna relatório de consistência de billing
 * Query params:
 *   - userId: (opcional) ID do usuário específico
 *   - global: (opcional) se "true", retorna validação global
 */
export async function GET(request: Request) {
  try {
    // Verificar se é admin com permissão de finanças
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (!hasPermission(session, "canManageFinances")) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get("userId");
    const isGlobal = searchParams.get("global") === "true";

    if (isGlobal) {
      const resultado = await validarBillingGlobal();
      return NextResponse.json({
        tipo: "global",
        ...resultado,
      });
    }

    if (targetUserId) {
      const resultado = await validarBillingUsuario(targetUserId);
      return NextResponse.json({
        tipo: "usuario",
        userId: targetUserId,
        ...resultado,
      });
    }

    // Se não especificou, retorna relatório geral
    const relatorio = await gerarRelatorioBilling();
    return NextResponse.json(relatorio);
  } catch (error) {
    console.error("Erro na validação de billing:", error);
    return NextResponse.json(
      { error: "Erro ao validar billing" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/billing-validation
 * Corrige erros de billing
 * Body:
 *   - userId: ID do usuário para corrigir
 *   - autoFix: se true, corrige automaticamente
 */
export async function POST(request: Request) {
  try {
    // Verificar se é admin com permissão de finanças
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (!hasPermission(session, "canManageFinances")) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const body = await request.json();
    const { userId: targetUserId, autoFix } = body;

    if (!targetUserId) {
      return NextResponse.json(
        { error: "userId é obrigatório" },
        { status: 400 }
      );
    }

    if (autoFix) {
      const resultado = await corrigirBillingUsuario(targetUserId);
      return NextResponse.json({
        tipo: "correcao",
        userId: targetUserId,
        ...resultado,
      });
    }

    // Se não for autoFix, apenas valida
    const resultado = await validarBillingUsuario(targetUserId);
    return NextResponse.json({
      tipo: "validacao",
      userId: targetUserId,
      ...resultado,
    });
  } catch (error) {
    console.error("Erro na correção de billing:", error);
    return NextResponse.json(
      { error: "Erro ao corrigir billing" },
      { status: 500 }
    );
  }
}
