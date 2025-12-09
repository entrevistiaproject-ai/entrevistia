/**
 * Sistema de Filtro Inteligente de Perguntas
 *
 * Funciona sem IA, usando scoring e matching semântico simples
 * Extremamente eficiente e barato para rodar
 */

import type { PerguntaTemplate } from '@/lib/db/schema/perguntas-templates';

export interface FiltroParams {
  cargo?: string;
  nivel?: string;
  descricao?: string;
  categorias?: string[];
  limite?: number;
  incluirUniversais?: boolean;
}

export interface PerguntaComScore extends PerguntaTemplate {
  score: number;
  motivoScore: string[];
}

/**
 * Normaliza texto para comparação (remove acentos, lowercase, etc)
 */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Calcula similaridade entre duas strings usando algoritmo simples
 * Retorna valor entre 0 e 1
 */
function calcularSimilaridade(texto1: string, texto2: string): number {
  const norm1 = normalizar(texto1);
  const norm2 = normalizar(texto2);

  // Match exato
  if (norm1 === norm2) return 1.0;

  // Contém o termo completo
  if (norm1.includes(norm2) || norm2.includes(norm1)) return 0.8;

  // Similaridade por palavras em comum
  const palavras1 = new Set(norm1.split(/\s+/));
  const palavras2 = new Set(norm2.split(/\s+/));

  const intersecao = new Set([...palavras1].filter(p => palavras2.has(p)));
  const uniao = new Set([...palavras1, ...palavras2]);

  return intersecao.size / uniao.size;
}

/**
 * Extrai palavras-chave de um texto
 */
function extrairPalavrasChave(texto: string): string[] {
  const stopwords = new Set([
    'o', 'a', 'de', 'da', 'do', 'para', 'com', 'em', 'na', 'no',
    'e', 'ou', 'um', 'uma', 'os', 'as', 'dos', 'das', 'por'
  ]);

  return normalizar(texto)
    .split(/\s+/)
    .filter(palavra => palavra.length > 2 && !stopwords.has(palavra));
}

/**
 * Calcula score de relevância de uma pergunta para os critérios fornecidos
 */
export function calcularScorePergunta(
  pergunta: PerguntaTemplate,
  params: FiltroParams
): { score: number; motivos: string[] } {
  let score = 0;
  const motivos: string[] = [];

  const cargos = (pergunta.cargos as string[] | null) || [];
  const niveis = (pergunta.niveis as string[] | null) || [];
  const tags = (pergunta.tags as string[] | null) || [];

  // 1. MATCH DE CARGO (peso: 40 pontos)
  if (params.cargo) {
    if (cargos.length === 0) {
      // Pergunta universal para cargo
      score += 15;
      motivos.push('Pergunta universal (aplicável a qualquer cargo)');
    } else {
      // Verifica similaridade com cada cargo da pergunta
      const melhorMatchCargo = Math.max(
        ...cargos.map(c => calcularSimilaridade(c, params.cargo!))
      );

      if (melhorMatchCargo >= 0.8) {
        score += 40;
        motivos.push(`Match exato de cargo: ${params.cargo}`);
      } else if (melhorMatchCargo >= 0.5) {
        score += 25;
        motivos.push(`Match parcial de cargo (${Math.round(melhorMatchCargo * 100)}%)`);
      } else {
        // Verifica nas tags também
        const matchTag = tags.some(tag =>
          calcularSimilaridade(tag, params.cargo!) >= 0.6
        );
        if (matchTag) {
          score += 20;
          motivos.push('Cargo encontrado nas tags');
        }
      }
    }
  }

  // 2. MATCH DE NÍVEL (peso: 30 pontos)
  if (params.nivel) {
    if (niveis.length === 0) {
      // Pergunta universal para nível
      score += 20;
      motivos.push('Pergunta universal (aplicável a qualquer nível)');
    } else {
      const melhorMatchNivel = Math.max(
        ...niveis.map(n => calcularSimilaridade(n, params.nivel!))
      );

      if (melhorMatchNivel >= 0.8) {
        score += 30;
        motivos.push(`Match exato de nível: ${params.nivel}`);
      } else if (melhorMatchNivel >= 0.5) {
        score += 15;
        motivos.push(`Match parcial de nível (${Math.round(melhorMatchNivel * 100)}%)`);
      }
    }
  }

  // 3. MATCH DE DESCRIÇÃO/CONTEXTO (peso: 20 pontos)
  if (params.descricao) {
    const palavrasChaveDescricao = extrairPalavrasChave(params.descricao);
    const palavrasChavePergunta = extrairPalavrasChave(pergunta.texto);

    // Adiciona competência e critérios
    if (pergunta.competencia) {
      palavrasChavePergunta.push(...extrairPalavrasChave(pergunta.competencia));
    }

    const metadados = pergunta.metadados as PerguntaTemplate['metadados'];
    if (metadados?.areasConhecimento) {
      metadados.areasConhecimento.forEach(area => {
        palavrasChavePergunta.push(...extrairPalavrasChave(area));
      });
    }

    // Conta palavras-chave em comum
    const palavrasComuns = palavrasChaveDescricao.filter(palavra =>
      palavrasChavePergunta.some(p => calcularSimilaridade(p, palavra) >= 0.7)
    );

    const porcentagemMatch = palavrasComuns.length / Math.max(palavrasChaveDescricao.length, 1);

    if (porcentagemMatch > 0.3) {
      const pontos = Math.round(porcentagemMatch * 20);
      score += pontos;
      motivos.push(`${palavrasComuns.length} palavras-chave relevantes na descrição`);
    }
  }

  // 4. MATCH DE CATEGORIA (peso: 10 pontos)
  if (params.categorias && params.categorias.length > 0) {
    if (params.categorias.includes(pergunta.categoria)) {
      score += 10;
      motivos.push(`Categoria: ${pergunta.categoria}`);
    }
  }

  // 5. BONUS: Perguntas totalmente universais (peso extra)
  if (cargos.length === 0 && niveis.length === 0 && params.incluirUniversais !== false) {
    score += 5;
    motivos.push('Pergunta totalmente universal');
  }

  // 6. BONUS: Perguntas padrão do sistema (mais testadas)
  if (pergunta.isPadrao) {
    score += 3;
    motivos.push('Pergunta padrão do sistema');
  }

  return { score, motivos };
}

/**
 * Filtra e ordena perguntas por relevância
 */
export function filtrarPerguntas(
  perguntas: PerguntaTemplate[],
  params: FiltroParams
): PerguntaComScore[] {
  // Calcula score para cada pergunta
  const perguntasComScore = perguntas.map(pergunta => {
    const { score, motivos } = calcularScorePergunta(pergunta, params);

    return {
      ...pergunta,
      score,
      motivoScore: motivos,
    };
  });

  // Filtra perguntas com score mínimo (pelo menos 10 pontos)
  const perguntasFiltradas = perguntasComScore.filter(p => p.score >= 10);

  // Ordena por score (maior primeiro)
  perguntasFiltradas.sort((a, b) => b.score - a.score);

  // Limita quantidade se especificado
  if (params.limite && params.limite > 0) {
    return perguntasFiltradas.slice(0, params.limite);
  }

  return perguntasFiltradas;
}

/**
 * Agrupa perguntas por categoria mantendo diversidade
 * Garante que não peguemos muitas perguntas da mesma categoria
 */
export function filtrarComDiversidade(
  perguntas: PerguntaTemplate[],
  params: FiltroParams
): PerguntaComScore[] {
  const perguntasComScore = filtrarPerguntas(perguntas, params);

  if (!params.limite) {
    return perguntasComScore;
  }

  // Agrupa por categoria
  const porCategoria = new Map<string, PerguntaComScore[]>();

  perguntasComScore.forEach(p => {
    const categoria = p.categoria;
    if (!porCategoria.has(categoria)) {
      porCategoria.set(categoria, []);
    }
    porCategoria.get(categoria)!.push(p);
  });

  // Distribui perguntas mantendo diversidade
  const resultado: PerguntaComScore[] = [];
  const categorias = Array.from(porCategoria.keys());
  let indiceCategoria = 0;

  while (resultado.length < params.limite && porCategoria.size > 0) {
    const categoria = categorias[indiceCategoria % categorias.length];
    const perguntasCategoria = porCategoria.get(categoria)!;

    if (perguntasCategoria.length > 0) {
      resultado.push(perguntasCategoria.shift()!);
    }

    if (perguntasCategoria.length === 0) {
      porCategoria.delete(categoria);
      categorias.splice(indiceCategoria % categorias.length, 1);
    } else {
      indiceCategoria++;
    }
  }

  return resultado;
}

/**
 * Sugere perguntas complementares baseado nas já selecionadas
 * Evita redundância e busca cobrir lacunas
 */
export function sugerirPerguntasComplementares(
  todasPerguntas: PerguntaTemplate[],
  perguntasSelecionadas: PerguntaTemplate[],
  params: FiltroParams
): PerguntaComScore[] {
  // Identifica categorias e competências já cobertas
  const categoriasCober = new Set(perguntasSelecionadas.map(p => p.categoria));
  const competenciasCober = new Set(
    perguntasSelecionadas
      .map(p => p.competencia)
      .filter((c): c is string => c !== null && c !== undefined)
  );

  // Filtra perguntas não selecionadas
  const perguntasDisponiveis = todasPerguntas.filter(
    p => !perguntasSelecionadas.some(ps => ps.id === p.id)
  );

  // Calcula score com bonus para categorias/competências não cobertas
  const perguntasComScore = perguntasDisponiveis.map(pergunta => {
    const { score, motivos } = calcularScorePergunta(pergunta, params);
    let scoreAjustado = score;

    // Bonus para categorias pouco representadas
    if (!categoriasCober.has(pergunta.categoria)) {
      scoreAjustado += 15;
      motivos.push('Categoria ainda não coberta');
    }

    // Bonus para competências diferentes
    if (pergunta.competencia && !competenciasCober.has(pergunta.competencia)) {
      scoreAjustado += 10;
      motivos.push('Competência diferente das já selecionadas');
    }

    return {
      ...pergunta,
      score: scoreAjustado,
      motivoScore: motivos,
    };
  });

  // Ordena e retorna
  perguntasComScore.sort((a, b) => b.score - a.score);

  if (params.limite) {
    return perguntasComScore.slice(0, params.limite);
  }

  return perguntasComScore;
}
