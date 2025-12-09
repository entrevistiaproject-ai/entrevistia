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
 * Tool para salvar a análise completa do candidato
 */
export const saveAnalysisTool = tool(
  async ({
    candidatoId,
    entrevistaId,
    notaGeral,
    resumoGeral,
    pontosFortes,
    pontosMelhoria,
    recomendacao,
    avaliacoesCompetencias,
  }: {
    candidatoId: string;
    entrevistaId: string;
    notaGeral: number;
    resumoGeral: string;
    pontosFortes: string[];
    pontosMelhoria: string[];
    recomendacao: string;
    avaliacoesCompetencias: Array<{
      competenciaId: string;
      nota: number;
      feedback: string;
    }>;
  }) => {
    // TODO: Implementar quando o schema avaliacoes for criado
    try {
      // const { getDB } = await import('@/lib/db');
      // const {
      //   avaliacoes,
      //   avaliacoesCompetencias: avaliacoesCompetenciasTable
      // } = await import('@/lib/db/schema');
      // const { eq, and } = await import('drizzle-orm');

      // const db = getDB();
      // Verifica se já existe uma avaliação
      const existingAvaliacao = null; // TODO: implementar busca quando schema existir
      // const existingAvaliacao = await db
      //   .select()
      //   .from(avaliacoes)
      //   .where(and(
      //     eq(avaliacoes.candidatoId, candidatoId),
      //     eq(avaliacoes.entrevistaId, entrevistaId)
      //   ))
      //   .limit(1);

      // TODO: Implementar quando schema for criado
      // let avaliacaoId: string;
      // if (existingAvaliacao) {
      //   await db.update(avaliacoes)...
      // } else {
      //   const [newAvaliacao] = await db.insert(avaliacoes)...
      // }

      return {
        success: false,
        error: 'Schema de avaliações ainda não implementado',
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
    description: 'Salva a análise completa do candidato no banco de dados',
    schema: z.object({
      candidatoId: z.string().describe('ID do candidato'),
      entrevistaId: z.string().describe('ID da entrevista'),
      notaGeral: z.number().min(0).max(10).describe('Nota geral do candidato (0-10)'),
      resumoGeral: z.string().describe('Resumo geral da performance do candidato'),
      pontosFortes: z.array(z.string()).describe('Lista de pontos fortes identificados'),
      pontosMelhoria: z.array(z.string()).describe('Lista de pontos de melhoria identificados'),
      recomendacao: z.enum(['recomendado', 'recomendado_com_ressalvas', 'nao_recomendado']).describe('Recomendação final'),
      avaliacoesCompetencias: z.array(
        z.object({
          competenciaId: z.string().describe('ID da competência'),
          nota: z.number().min(0).max(10).describe('Nota da competência (0-10)'),
          feedback: z.string().describe('Feedback específico sobre a competência'),
        })
      ).describe('Avaliações detalhadas por competência'),
    }),
  }
);
