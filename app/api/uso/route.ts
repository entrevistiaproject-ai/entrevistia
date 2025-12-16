import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUsageFinanceiro, verificarAcessoIA } from '@/lib/services/billing';
import { getDB } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { eq } from 'drizzle-orm';

/**
 * GET /api/uso
 *
 * Retorna informações de uso do trial/plano do usuário autenticado
 * Usado pelo frontend para exibir alertas e bloquear funcionalidades
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Busca informações do usuário
    const db = getDB();
    const [usuario] = await db
      .select({
        planType: users.planType,
        planStatus: users.planStatus,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Busca uso financeiro
    const usage = await getUsageFinanceiro(userId);

    // Verifica acesso à IA
    const acessoIA = await verificarAcessoIA(userId);

    return NextResponse.json({
      planType: usuario.planType,
      planStatus: usuario.planStatus,
      totalGasto: usage.totalGasto,
      limiteFinanceiro: usage.limiteFinanceiro,
      saldoRestante: usage.saldoRestante,
      percentualUsado: usage.percentualUsado,
      limiteAtingido: usage.limiteAtingido,
      isTestAccount: usage.isTestAccount,
      acessoIA: {
        permitido: acessoIA.permitido,
        motivo: acessoIA.motivo,
        mensagemUsuario: acessoIA.mensagemUsuario,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar uso:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
