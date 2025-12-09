import { ChatAnthropic } from '@langchain/anthropic';
import { getDB } from '@/lib/db';
import { entrevistas, respostas, perguntas, candidatoEntrevistas, CompetenciaAvaliada } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

/**
 * Schema para competência individual
 */
const CompetenciaSchema = z.object({
  nome: z.string(),
  categoria: z.enum(['Técnicas', 'Comunicação', 'Comportamental', 'Trabalho em Equipe', 'Fit Cultural']),
  nota: z.number().min(0).max(100),
  descricao: z.string(),
});

/**
 * Schema para validar a resposta da IA
 */
const AnalysisSchema = z.object({
  notaGeral: z.number().min(0).max(10),
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

  // Busca respostas do candidato
  const candidateAnswers = await db
    .select({
      perguntaTexto: perguntas.texto,
      perguntaTipo: perguntas.tipo,
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

## Vaga
- Título: ${data.entrevista.titulo}
- Cargo: ${data.entrevista.cargo}
- Nível: ${data.entrevista.nivel}
- Descrição: ${data.entrevista.descricao}

## Candidato: ${candidatoNome}

## Respostas da Entrevista
${respostasFormatadas}

## Instruções
Analise as respostas acima e retorne APENAS um objeto JSON com esta estrutura exata:
{
  "notaGeral": <número de 0 a 10>,
  "resumoGeral": "<resumo da performance do candidato>",
  "pontosFortes": ["<ponto forte 1>", "<ponto forte 2>", "<ponto forte 3>"],
  "pontosMelhoria": ["<ponto melhoria 1>", "<ponto melhoria 2>", "<ponto melhoria 3>"],
  "recomendacao": "<recomendado | recomendado_com_ressalvas | nao_recomendado>",
  "competencias": [
    // TÉCNICAS
    {"nome": "Conhecimento Técnico", "categoria": "Técnicas", "nota": <0-100>, "descricao": "Domínio de ferramentas e tecnologias"},
    {"nome": "Resolução de Problemas", "categoria": "Técnicas", "nota": <0-100>, "descricao": "Capacidade analítica e lógica"},
    {"nome": "Qualidade e Detalhes", "categoria": "Técnicas", "nota": <0-100>, "descricao": "Atenção aos detalhes"},
    {"nome": "Aprendizado Técnico", "categoria": "Técnicas", "nota": <0-100>, "descricao": "Capacidade de aprender novas tecnologias"},
    // COMUNICAÇÃO
    {"nome": "Clareza Verbal", "categoria": "Comunicação", "nota": <0-100>, "descricao": "Expressão clara e objetiva"},
    {"nome": "Escuta Ativa", "categoria": "Comunicação", "nota": <0-100>, "descricao": "Atenção e compreensão"},
    {"nome": "Capacidade de Síntese", "categoria": "Comunicação", "nota": <0-100>, "descricao": "Resumir ideias complexas"},
    // COMPORTAMENTAL
    {"nome": "Proatividade", "categoria": "Comportamental", "nota": <0-100>, "descricao": "Iniciativa e autonomia"},
    {"nome": "Adaptabilidade", "categoria": "Comportamental", "nota": <0-100>, "descricao": "Flexibilidade a mudanças"},
    {"nome": "Resiliência", "categoria": "Comportamental", "nota": <0-100>, "descricao": "Gestão de pressão"},
    // TRABALHO EM EQUIPE
    {"nome": "Colaboração", "categoria": "Trabalho em Equipe", "nota": <0-100>, "descricao": "Trabalho em grupo"},
    {"nome": "Compartilhamento de Conhecimento", "categoria": "Trabalho em Equipe", "nota": <0-100>, "descricao": "Ensinar e aprender com o time"},
    // FIT CULTURAL
    {"nome": "Motivação", "categoria": "Fit Cultural", "nota": <0-100>, "descricao": "Interesse genuíno pela vaga"}
  ]
}

IMPORTANTE para as competências:
- Avalie TODAS as 13 competências listadas acima
- A nota deve ser de 0 a 100 (não 0 a 10)
- Base sua avaliação nas respostas da entrevista
- Se não houver evidências suficientes para avaliar uma competência, atribua nota 50 (neutra)

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
