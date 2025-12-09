import { tool } from '@langchain/core/tools';
import { z } from 'zod';

/**
 * Tool para buscar informações sobre a vaga/entrevista
 */
export const getInterviewInfoTool = tool(
  async ({ entrevistaId }: { entrevistaId: string }) => {
    // Esta função será chamada pelo agente quando precisar de informações da vaga
    const { db } = await import('@/db/client');
    const { entrevistas, vagas } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');

    const entrevista = await db.query.entrevistas.findFirst({
      where: eq(entrevistas.id, entrevistaId),
      with: {
        vaga: true,
      },
    });

    if (!entrevista) {
      return { error: 'Entrevista não encontrada' };
    }

    return {
      titulo: entrevista.titulo,
      descricao: entrevista.descricao,
      vaga: entrevista.vaga ? {
        titulo: entrevista.vaga.titulo,
        descricao: entrevista.vaga.descricao,
        requisitos: entrevista.vaga.requisitos,
      } : null,
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
    const { db } = await import('@/db/client');
    const { respostas, perguntas } = await import('@/db/schema');
    const { eq, and } = await import('drizzle-orm');

    const candidateAnswers = await db.query.respostas.findMany({
      where: and(
        eq(respostas.candidatoId, candidatoId),
        eq(respostas.entrevistaId, entrevistaId)
      ),
      with: {
        pergunta: true,
      },
    });

    return candidateAnswers.map(answer => ({
      pergunta: {
        id: answer.pergunta.id,
        texto: answer.pergunta.texto,
        tipo: answer.pergunta.tipo,
        competencia: answer.pergunta.competenciaId,
      },
      resposta: {
        texto: answer.respostaTexto,
        videoUrl: answer.videoUrl,
        audioUrl: answer.audioUrl,
        tempoResposta: answer.tempoResposta,
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
    const { db } = await import('@/db/client');
    const { competencias, entrevistas } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');

    const entrevista = await db.query.entrevistas.findFirst({
      where: eq(entrevistas.id, entrevistaId),
      with: {
        competencias: true,
      },
    });

    if (!entrevista) {
      return { error: 'Entrevista não encontrada' };
    }

    return entrevista.competencias.map(comp => ({
      id: comp.id,
      nome: comp.nome,
      descricao: comp.descricao,
      peso: comp.peso,
    }));
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
    const { db } = await import('@/db/client');
    const {
      avaliacoes,
      avaliacoesCompetencias: avaliacoesCompetenciasTable
    } = await import('@/db/schema');
    const { eq, and } = await import('drizzle-orm');

    try {
      // Verifica se já existe uma avaliação
      const existingAvaliacao = await db.query.avaliacoes.findFirst({
        where: and(
          eq(avaliacoes.candidatoId, candidatoId),
          eq(avaliacoes.entrevistaId, entrevistaId)
        ),
      });

      let avaliacaoId: string;

      if (existingAvaliacao) {
        // Atualiza avaliação existente
        await db
          .update(avaliacoes)
          .set({
            notaGeral,
            resumoGeral,
            pontosFortes,
            pontosMelhoria,
            recomendacao,
            analisadoEm: new Date(),
          })
          .where(eq(avaliacoes.id, existingAvaliacao.id));

        avaliacaoId = existingAvaliacao.id;

        // Remove avaliações de competências antigas
        await db
          .delete(avaliacoesCompetenciasTable)
          .where(eq(avaliacoesCompetenciasTable.avaliacaoId, avaliacaoId));
      } else {
        // Cria nova avaliação
        const [newAvaliacao] = await db
          .insert(avaliacoes)
          .values({
            candidatoId,
            entrevistaId,
            notaGeral,
            resumoGeral,
            pontosFortes,
            pontosMelhoria,
            recomendacao,
            analisadoEm: new Date(),
          })
          .returning();

        avaliacaoId = newAvaliacao.id;
      }

      // Insere avaliações de competências
      if (avaliacoesCompetencias.length > 0) {
        await db.insert(avaliacoesCompetenciasTable).values(
          avaliacoesCompetencias.map(ac => ({
            avaliacaoId,
            competenciaId: ac.competenciaId,
            nota: ac.nota,
            feedback: ac.feedback,
          }))
        );
      }

      return {
        success: true,
        avaliacaoId,
        message: 'Análise salva com sucesso',
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
