import { ChatAnthropic } from '@langchain/anthropic';
import { getDB } from '@/lib/db';
import { entrevistas, respostas, perguntas, candidatoEntrevistas, CompetenciaAvaliada } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { registrarAnalisePerguntas } from '@/lib/services/billing';
import { processAutoDecision } from '@/lib/services/team-service';
import { logSystemError } from '@/lib/support/ticket-service';
import { logger } from '@/lib/logger';

/**
 * Schema para competência individual
 */
const CompetenciaSchema = z.object({
  nome: z.string(),
  categoria: z.enum(['Experiência', 'Comunicação', 'Resolução de Problemas', 'Motivação', 'Fit com a Vaga']),
  nota: z.number().min(0).max(100),
  descricao: z.string(),
});

/**
 * Schema para validar a resposta da IA
 */
const AnalysisSchema = z.object({
  notaGeral: z.number().min(0).max(100),
  compatibilidadeVaga: z.number().min(0).max(100),
  resumoGeral: z.string(),
  pontosFortes: z.array(z.string()),
  pontosMelhoria: z.array(z.string()),
  recomendacao: z.enum(['recomendado', 'recomendado_com_ressalvas', 'nao_recomendado']),
  competencias: z.array(CompetenciaSchema),
});

/**
 * Interface do resultado da análise
 */
export interface AnalysisResult {
  success: boolean;
  avaliacaoId?: string;
  error?: string;
}

/**
 * Busca dados da entrevista diretamente do banco
 */
async function fetchInterviewData(candidatoId: string, entrevistaId: string) {
  const db = getDB();

  // Busca info da entrevista
  const [entrevista] = await db
    .select()
    .from(entrevistas)
    .where(eq(entrevistas.id, entrevistaId))
    .limit(1);

  // Busca respostas do candidato com IDs para cobrança
  const candidateAnswers = await db
    .select({
      perguntaId: perguntas.id,
      perguntaTexto: perguntas.texto,
      perguntaTipo: perguntas.tipo,
      respostaId: respostas.id,
      textoResposta: respostas.textoResposta,
      transcricao: respostas.transcricao,
    })
    .from(respostas)
    .innerJoin(perguntas, eq(respostas.perguntaId, perguntas.id))
    .where(
      and(
        eq(respostas.candidatoId, candidatoId),
        eq(respostas.entrevistaId, entrevistaId)
      )
    );

  return { entrevista, respostas: candidateAnswers };
}

/**
 * Analisa uma entrevista de candidato usando Claude diretamente
 */
export async function analyzeInterview(
  candidatoId: string,
  entrevistaId: string,
  candidatoNome: string
): Promise<AnalysisResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY não está configurada');
    }

    // Busca dados do banco
    const data = await fetchInterviewData(candidatoId, entrevistaId);

    if (!data.entrevista) {
      return { success: false, error: 'Entrevista não encontrada' };
    }

    if (data.respostas.length === 0) {
      return { success: false, error: 'Nenhuma resposta encontrada para este candidato' };
    }

    // Formata as respostas para o prompt
    const respostasFormatadas = data.respostas.map((r, i) =>
      `**Pergunta ${i + 1}:** ${r.perguntaTexto}\n**Resposta:** ${r.transcricao || r.textoResposta || 'Sem resposta'}`
    ).join('\n\n');

    // Cria o modelo
    const model = new ChatAnthropic({
      apiKey,
      model: 'claude-sonnet-4-5-20250929',
      temperature: 0.3,
      maxTokens: 4000,
    });

    // Prompt direto com todos os dados
    const prompt = `Analise esta entrevista e retorne APENAS um JSON válido.

## IMPORTANTE: Contexto das Respostas
As respostas abaixo foram **gravadas em áudio pelo candidato** e **transcritas automaticamente** por um sistema de reconhecimento de voz (Whisper).
Por isso, podem conter:
- Palavras trocadas por homófonas (ex: "leia" em vez de "leio", "enfare" em vez de "encare", "envolver" em vez de "desenvolver")
- Conjugação verbal incorreta devido à transcrição (ex: "eu trabalha" em vez de "eu trabalho")
- Pequenos erros de transcrição que NÃO são erros do candidato
- Falta de pontuação ou formatação

**CRÍTICO: NUNCA penalize o candidato por erros ortográficos, gramaticais ou de digitação** - esses são 100% artefatos da transcrição automática do Whisper, NÃO refletem a capacidade real do candidato.
NÃO mencione "erros gramaticais", "erros de ortografia" ou "revisão textual" nos pontos de melhoria.
Avalie APENAS o CONTEÚDO, a qualidade das ideias e a capacidade de comunicação VERBAL demonstrada.

## Vaga
- Título: ${data.entrevista.titulo}
- Cargo: ${data.entrevista.cargo}
- Nível: ${data.entrevista.nivel}
- Descrição: ${data.entrevista.descricao}

## Candidato: ${candidatoNome}

## Respostas da Entrevista (transcritas de áudio)
${respostasFormatadas}

## Instruções
Analise as respostas acima e retorne APENAS um objeto JSON com esta estrutura exata:
{
  "notaGeral": <número de 0 a 100 - avaliação geral do candidato>,
  "compatibilidadeVaga": <número de 0 a 100 - compatibilidade específica com esta vaga>,
  "resumoGeral": "<resumo da performance do candidato>",
  "pontosFortes": ["<ponto forte 1>", "<ponto forte 2>", "<ponto forte 3>"],  // Foque em: habilidades técnicas, comportamentais, soft skills, experiência
  "pontosMelhoria": ["<ponto melhoria 1>", "<ponto melhoria 2>", "<ponto melhoria 3>"],  // Foque em: gaps técnicos, comportamentais, experiência. NUNCA gramática/ortografia!
  "recomendacao": "<recomendado | recomendado_com_ressalvas | nao_recomendado>",
  "competencias": [
    // EXPERIÊNCIA E CONHECIMENTO
    {"nome": "Conhecimento Técnico", "categoria": "Experiência", "nota": <0-100>, "descricao": "Domínio das ferramentas e tecnologias necessárias"},
    {"nome": "Experiência Relevante", "categoria": "Experiência", "nota": <0-100>, "descricao": "Histórico profissional alinhado com a vaga"},
    // COMUNICAÇÃO
    {"nome": "Clareza na Comunicação", "categoria": "Comunicação", "nota": <0-100>, "descricao": "Capacidade de se expressar de forma clara e objetiva"},
    {"nome": "Articulação de Ideias", "categoria": "Comunicação", "nota": <0-100>, "descricao": "Habilidade de estruturar e apresentar pensamentos"},
    // RESOLUÇÃO DE PROBLEMAS
    {"nome": "Pensamento Analítico", "categoria": "Resolução de Problemas", "nota": <0-100>, "descricao": "Capacidade de analisar situações e encontrar soluções"},
    {"nome": "Criatividade", "categoria": "Resolução de Problemas", "nota": <0-100>, "descricao": "Abordagem inovadora para desafios"},
    // MOTIVAÇÃO E INTERESSE
    {"nome": "Interesse pela Vaga", "categoria": "Motivação", "nota": <0-100>, "descricao": "Demonstração de interesse genuíno pela oportunidade"},
    {"nome": "Ambição Profissional", "categoria": "Motivação", "nota": <0-100>, "descricao": "Clareza sobre objetivos de carreira"},
    // FIT COM A VAGA
    {"nome": "Alinhamento Cultural", "categoria": "Fit com a Vaga", "nota": <0-100>, "descricao": "Compatibilidade com valores e cultura da empresa"},
    {"nome": "Adequação ao Perfil", "categoria": "Fit com a Vaga", "nota": <0-100>, "descricao": "Encaixe com os requisitos específicos da posição"}
  ]
}

IMPORTANTE:
- notaGeral: Avaliação geral do candidato de 0 a 100 (número inteiro, ex: 75)
- compatibilidadeVaga: Quão bem o candidato se encaixa ESPECIFICAMENTE nesta vaga, considerando cargo, nível e descrição (0-100)
- Avalie TODAS as 10 competências listadas acima (notas de 0 a 100)
- Base sua avaliação nas respostas da entrevista
- Se não houver evidências suficientes para avaliar uma competência, atribua nota 50 (neutra)
- pontosMelhoria: Foque APENAS em aspectos TÉCNICOS (gaps de conhecimento, experiência), COMPORTAMENTAIS (postura, atitude) e PSICOLÓGICOS (motivação, autoconhecimento). JAMAIS mencione gramática, ortografia ou erros de escrita.

Retorne APENAS o JSON, sem texto adicional, sem markdown, sem explicações.`;

    const response = await model.invoke([
      { role: 'user', content: prompt }
    ]);

    // Extrai o JSON da resposta
    const content = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    // Tenta extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Resposta da IA não contém JSON válido:', content);
      return { success: false, error: 'Resposta da IA não contém JSON válido' };
    }

    const analysisData = JSON.parse(jsonMatch[0]);
    const analysis = AnalysisSchema.parse(analysisData);

    // Salva no banco
    const db = getDB();
    const resumoCompleto = `${analysis.resumoGeral}\n\n**Pontos Fortes:**\n${analysis.pontosFortes.map(p => `- ${p}`).join('\n')}\n\n**Pontos de Melhoria:**\n${analysis.pontosMelhoria.map(p => `- ${p}`).join('\n')}`;

    // Mapeia as competências para o tipo correto
    const competenciasTyped: CompetenciaAvaliada[] = analysis.competencias.map(c => ({
      nome: c.nome,
      categoria: c.categoria,
      nota: c.nota,
      descricao: c.descricao,
    }));

    const [updated] = await db
      .update(candidatoEntrevistas)
      .set({
        notaGeral: analysis.notaGeral,
        compatibilidadeVaga: analysis.compatibilidadeVaga,
        resumoGeral: resumoCompleto,
        recomendacao: analysis.recomendacao,
        competencias: competenciasTyped,
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
      return { success: false, error: 'Candidato não encontrado na entrevista' };
    }

    // Registra transações de cobrança por pergunta analisada
    if (data.entrevista.userId) {
      logger.info('[AI_AGENT] Iniciando cobrança de análise', {
        userId: data.entrevista.userId,
        entrevistaId: entrevistaId,
        candidatoId: candidatoId,
        totalPerguntas: data.respostas.length,
      });

      try {
        const billingResult = await registrarAnalisePerguntas({
          userId: data.entrevista.userId,
          entrevistaId: entrevistaId,
          candidatoId: candidatoId,
          perguntas: data.respostas.map(r => ({
            perguntaId: r.perguntaId,
            perguntaTexto: r.perguntaTexto,
            respostaId: r.respostaId,
          })),
        });

        if (billingResult.success) {
          logger.info('[AI_AGENT] ✅ Cobrança registrada com sucesso', {
            userId: data.entrevista.userId,
            entrevistaId: entrevistaId,
            totalCobrado: billingResult.totalCobrado.toFixed(2),
          });
        } else {
          logger.error('[AI_AGENT] ⚠️ Cobrança concluída com falhas', {
            userId: data.entrevista.userId,
            entrevistaId: entrevistaId,
            error: billingResult.error,
            totalCobrado: billingResult.totalCobrado.toFixed(2),
          });

          // Registra erro se a cobrança falhou
          await logSystemError({
            level: 'critical',
            component: 'ai:billing',
            message: 'Falha parcial/total ao cobrar análise de candidato',
            errorMessage: billingResult.error,
            userId: data.entrevista.userId,
            context: {
              entrevistaId,
              candidatoId,
              candidatoNome,
              totalPerguntas: data.respostas.length,
              totalCobrado: billingResult.totalCobrado,
            },
            createTicket: true,
          }).catch(console.error);
        }
      } catch (billingError) {
        const errorMsg = billingError instanceof Error ? billingError.message : 'Erro desconhecido';

        logger.error('[AI_AGENT] ❌ ERRO CRÍTICO ao processar billing', {
          error: errorMsg,
          userId: data.entrevista.userId,
          entrevistaId: entrevistaId,
          candidatoId: candidatoId,
        });

        // Registra erro crítico no sistema
        await logSystemError({
          level: 'critical',
          component: 'ai:billing',
          message: 'Exceção ao tentar cobrar análise de candidato',
          errorMessage: errorMsg,
          errorStack: billingError instanceof Error ? billingError.stack : undefined,
          userId: data.entrevista.userId,
          context: {
            entrevistaId,
            candidatoId,
            candidatoNome,
            totalPerguntas: data.respostas.length,
          },
          createTicket: true,
        }).catch(console.error);
      }
    } else {
      // CRÍTICO: userId não encontrado
      logger.error('[AI_AGENT] ❌ CRÍTICO: entrevista.userId não encontrado!', {
        entrevistaId: entrevistaId,
        candidatoId: candidatoId,
        candidatoNome,
      });

      await logSystemError({
        level: 'critical',
        component: 'ai:billing',
        message: 'Análise realizada mas userId não encontrado - COBRANÇA NÃO REGISTRADA',
        context: {
          entrevistaId,
          candidatoId,
          candidatoNome,
          totalPerguntas: data.respostas.length,
          entrevistaData: data.entrevista,
        },
        createTicket: true,
      }).catch(console.error);
    }

    // Processa aprovação/reprovação automática se configurado
    try {
      const autoDecision = await processAutoDecision(updated.id);
      if (autoDecision.processed) {
        console.log(
          `Decisão automática processada para candidato-entrevista ${updated.id}: ${autoDecision.decision}`
        );
      }
    } catch (autoDecisionError) {
      // Não falha a análise se a decisão automática falhar
      console.error('Erro ao processar decisão automática:', autoDecisionError);
    }

    return { success: true, avaliacaoId: updated.id };
  } catch (error) {
    console.error('Erro na análise da entrevista:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Versão simplificada para análise em background
 */
export async function analyzeInterviewBackground(
  candidatoId: string,
  entrevistaId: string,
  candidatoNome: string
): Promise<void> {
  try {
    const result = await analyzeInterview(
      candidatoId,
      entrevistaId,
      candidatoNome
    );

    if (!result.success) {
      console.error(
        `Falha na análise do candidato ${candidatoNome}:`,
        result.error
      );
    } else {
      console.log(
        `Análise do candidato ${candidatoNome} concluída com sucesso. Avaliação ID: ${result.avaliacaoId}`
      );
    }
  } catch (error) {
    console.error(
      `Erro na análise em background do candidato ${candidatoNome}:`,
      error
    );
  }
}
