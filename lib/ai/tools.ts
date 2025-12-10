import { tool } from '@langchain/core/tools';
import { z } from 'zod';

/**
 * Tool para buscar informações sobre a vaga/entrevista
 */
export const getInterviewInfoTool = tool(
  async ({ entrevistaId }: { entrevistaId: string }) => {
    // Esta função será chamada pelo agente quando precisar de informações da vaga
    const { getDB } = await import('@/lib/db');
    const { entrevistas } = await import('@/lib/db/schema');
    const { eq } = await import('drizzle-orm');

    const db = getDB();
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(eq(entrevistas.id, entrevistaId))
      .limit(1);

    if (!entrevista) {
      return { error: 'Entrevista não encontrada' };
    }

    return {
      titulo: entrevista.titulo,
      descricao: entrevista.descricao,
      cargo: entrevista.cargo,
      nivel: entrevista.nivel,
      empresa: entrevista.empresa,
    };
  },
  {
    name: 'getInterviewInfo',
    description: 'Busca informações detalhadas sobre a entrevista e vaga associada para contexto da análise',
    schema: z.object({
      entrevistaId: z.string().describe('ID da entrevista'),
    }),
  }
);

/**
 * Tool para buscar perguntas e respostas do candidato
 */
export const getCandidateAnswersTool = tool(
  async ({ candidatoId, entrevistaId }: { candidatoId: string; entrevistaId: string }) => {
    const { getDB } = await import('@/lib/db');
    const { respostas, perguntas } = await import('@/lib/db/schema');
    const { eq, and } = await import('drizzle-orm');

    const db = getDB();
    const candidateAnswers = await db
      .select({
        id: respostas.id,
        textoResposta: respostas.textoResposta,
        arquivoUrl: respostas.arquivoUrl,
        arquivoTipo: respostas.arquivoTipo,
        transcricao: respostas.transcricao,
        pergunta: perguntas,
      })
      .from(respostas)
      .innerJoin(perguntas, eq(respostas.perguntaId, perguntas.id))
      .where(
        and(
          eq(respostas.candidatoId, candidatoId),
          eq(respostas.entrevistaId, entrevistaId)
        )
      );

    return candidateAnswers.map(answer => ({
      pergunta: {
        id: answer.pergunta.id,
        texto: answer.pergunta.texto,
        tipo: answer.pergunta.tipo,
      },
      resposta: {
        texto: answer.textoResposta,
        arquivoUrl: answer.arquivoUrl,
        arquivoTipo: answer.arquivoTipo,
        transcricao: answer.transcricao,
      },
    }));
  },
  {
    name: 'getCandidateAnswers',
    description: 'Busca todas as perguntas e respostas do candidato na entrevista',
    schema: z.object({
      candidatoId: z.string().describe('ID do candidato'),
      entrevistaId: z.string().describe('ID da entrevista'),
    }),
  }
);

/**
 * Tool para buscar competências de avaliação
 */
export const getCompetenciasTool = tool(
  async ({ entrevistaId }: { entrevistaId: string }) => {
    const { getDB } = await import('@/lib/db');
    const { entrevistas } = await import('@/lib/db/schema');
    const { eq } = await import('drizzle-orm');

    const db = getDB();
    const [entrevista] = await db
      .select()
      .from(entrevistas)
      .where(eq(entrevistas.id, entrevistaId))
      .limit(1);

    if (!entrevista) {
      return { error: 'Entrevista não encontrada' };
    }

    // TODO: Buscar competências quando o schema competencias for implementado
    return [];
  },
  {
    name: 'getCompetencias',
    description: 'Busca as competências que devem ser avaliadas na entrevista',
    schema: z.object({
      entrevistaId: z.string().describe('ID da entrevista'),
    }),
  }
);

/**
 * Pesos das competências por nível de senioridade
 * Junior: foco maior em potencial, comunicação e motivação
 * Pleno: equilíbrio entre todas as competências
 * Senior: foco maior em experiência e resolução de problemas
 */
const PESOS_POR_NIVEL: Record<string, Record<string, number>> = {
  junior: {
    'Experiência': 0.10,           // Menos peso - espera-se pouca experiência
    'Comunicação': 0.25,           // Alto peso - fundamental para crescer
    'Resolução de Problemas': 0.20, // Médio - avalia potencial
    'Motivação': 0.25,             // Alto - energia e vontade de aprender
    'Fit com a Vaga': 0.20,        // Médio - alinhamento básico
  },
  pleno: {
    'Experiência': 0.25,           // Peso equilibrado
    'Comunicação': 0.20,
    'Resolução de Problemas': 0.25,
    'Motivação': 0.15,
    'Fit com a Vaga': 0.15,
  },
  senior: {
    'Experiência': 0.30,           // Alto peso - essencial para senior
    'Comunicação': 0.15,           // Espera-se já consolidado
    'Resolução de Problemas': 0.30, // Alto - liderança técnica
    'Motivação': 0.10,             // Menor peso
    'Fit com a Vaga': 0.15,
  },
  especialista: {
    'Experiência': 0.35,           // Muito alto - expertise
    'Comunicação': 0.15,
    'Resolução de Problemas': 0.25,
    'Motivação': 0.10,
    'Fit com a Vaga': 0.15,
  },
};

// Pesos padrão caso o nível não seja especificado
const PESOS_PADRAO = PESOS_POR_NIVEL.pleno;

/**
 * Calcula o score geral ponderado com base nas competências e nível
 */
function calcularScorePonderado(
  competencias: Array<{ categoria: string; nota: number }>,
  nivel: string | null
): number {
  const pesos = nivel && PESOS_POR_NIVEL[nivel.toLowerCase()]
    ? PESOS_POR_NIVEL[nivel.toLowerCase()]
    : PESOS_PADRAO;

  let somaNotas = 0;
  let somaPesos = 0;

  for (const comp of competencias) {
    const peso = pesos[comp.categoria] || 0.2; // peso default se categoria desconhecida
    somaNotas += comp.nota * peso;
    somaPesos += peso;
  }

  // Normaliza caso não tenham todas as categorias
  if (somaPesos > 0) {
    return Math.round(somaNotas / somaPesos);
  }

  // Fallback: média simples
  if (competencias.length > 0) {
    return Math.round(competencias.reduce((acc, c) => acc + c.nota, 0) / competencias.length);
  }

  return 0;
}

/**
 * Tool para salvar a análise completa do candidato
 */
export const saveAnalysisTool = tool(
  async ({
    candidatoId,
    entrevistaId,
    competencias,
    resumoGeral,
    pontosFortes,
    pontosMelhoria,
    recomendacao,
  }: {
    candidatoId: string;
    entrevistaId: string;
    competencias: Array<{
      nome: string;
      categoria: 'Experiência' | 'Comunicação' | 'Resolução de Problemas' | 'Motivação' | 'Fit com a Vaga';
      nota: number;
      descricao: string;
    }>;
    resumoGeral: string;
    pontosFortes: string[];
    pontosMelhoria: string[];
    recomendacao: string;
  }) => {
    try {
      const { getDB } = await import('@/lib/db');
      const { candidatoEntrevistas, entrevistas } = await import('@/lib/db/schema');
      const { eq, and } = await import('drizzle-orm');

      const db = getDB();

      // Busca o nível da vaga para calcular os pesos
      const [entrevista] = await db
        .select({ nivel: entrevistas.nivel })
        .from(entrevistas)
        .where(eq(entrevistas.id, entrevistaId))
        .limit(1);

      const nivel = entrevista?.nivel || null;

      // Calcula o score ponderado baseado nas competências e nível
      const notaGeral = calcularScorePonderado(competencias, nivel);

      // Calcula compatibilidade com a vaga (média da categoria "Fit com a Vaga" + outras relevantes)
      const fitVaga = competencias.find(c => c.categoria === 'Fit com a Vaga');
      const experiencia = competencias.find(c => c.categoria === 'Experiência');
      const compatibilidadeVaga = fitVaga
        ? Math.round((fitVaga.nota * 0.6 + (experiencia?.nota || fitVaga.nota) * 0.4))
        : notaGeral;

      // Formata o resumo incluindo pontos fortes e de melhoria
      const resumoCompleto = `${resumoGeral}\n\n**Pontos Fortes:**\n${pontosFortes.map(p => `- ${p}`).join('\n')}\n\n**Pontos de Melhoria:**\n${pontosMelhoria.map(p => `- ${p}`).join('\n')}`;

      // Atualiza a tabela candidato_entrevistas com a avaliação
      const [updated] = await db
        .update(candidatoEntrevistas)
        .set({
          notaGeral,
          compatibilidadeVaga,
          competencias,
          resumoGeral: resumoCompleto,
          recomendacao,
          avaliadoEm: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(candidatoEntrevistas.candidatoId, candidatoId),
            eq(candidatoEntrevistas.entrevistaId, entrevistaId)
          )
        )
        .returning({ id: candidatoEntrevistas.id });

      if (!updated) {
        return {
          success: false,
          error: 'Candidato não encontrado na entrevista',
        };
      }

      return {
        success: true,
        avaliacaoId: updated.id,
        notaGeral,
        compatibilidadeVaga,
        nivel: nivel || 'não especificado',
        message: 'Avaliação salva com sucesso',
      };
    } catch (error) {
      console.error('Erro ao salvar análise:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  },
  {
    name: 'saveAnalysis',
    description: 'Salva a análise completa do candidato com competências avaliadas individualmente. O score geral é calculado automaticamente com pesos baseados no nível da vaga (junior, pleno, senior, especialista).',
    schema: z.object({
      candidatoId: z.string().describe('ID do candidato'),
      entrevistaId: z.string().describe('ID da entrevista'),
      competencias: z.array(z.object({
        nome: z.string().describe('Nome específico da competência avaliada'),
        categoria: z.enum(['Experiência', 'Comunicação', 'Resolução de Problemas', 'Motivação', 'Fit com a Vaga']).describe('Categoria da competência'),
        nota: z.number().min(0).max(100).describe('Nota da competência (0-100)'),
        descricao: z.string().describe('Justificativa detalhada da nota'),
      })).min(1).describe('Lista de competências avaliadas - OBRIGATÓRIO incluir pelo menos uma competência de cada categoria'),
      resumoGeral: z.string().describe('Resumo geral da performance do candidato'),
      pontosFortes: z.array(z.string()).describe('Lista de pontos fortes identificados'),
      pontosMelhoria: z.array(z.string()).describe('Lista de pontos de melhoria identificados'),
      recomendacao: z.enum(['recomendado', 'recomendado_com_ressalvas', 'nao_recomendado']).describe('Recomendação final'),
    }),
  }
);
