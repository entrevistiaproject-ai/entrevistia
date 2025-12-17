import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUsageFinanceiro, verificarAcessoIA } from '@/lib/services/billing';
import { getDB } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { eq } from 'drizzle-orm';
import { getEffectiveOwnerId } from '@/lib/services/team-service';

/**
 * GET /api/uso
 *
 * Retorna informações de uso do trial/plano da CONTA (owner)
 * Se o usuário é membro de um time, retorna as informações da conta do owner.
 * Usado pelo frontend para exibir alertas e bloquear funcionalidades.
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

    // Obtém o owner efetivo (se for membro de time, usa o owner do time)
    const ownerId = await getEffectiveOwnerId(userId);

    // Busca informações do OWNER (conta), não do membro individual
    const db = getDB();
    const [owner] = await db
      .select({
        planType: users.planType,
        planStatus: users.planStatus,
      })
      .from(users)
      .where(eq(users.id, ownerId));

    if (!owner) {
      return NextResponse.json(
        { error: 'Conta não encontrada' },
        { status: 404 }
      );
    }

    // Busca uso financeiro da conta (já usa owner internamente)
    const usage = await getUsageFinanceiro(userId);

    // Verifica acesso à IA da conta (já usa owner internamente)
    const acessoIA = await verificarAcessoIA(userId);

    return NextResponse.json({
      planType: owner.planType,
      planStatus: owner.planStatus,
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
