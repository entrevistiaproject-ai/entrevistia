/**
 * Sistema de classificação de perguntas para entrevistas
 *
 * 4 Categorias principais (modelo tradicional de RH):
 * - tecnica: Conhecimento técnico, ferramentas, qualificações (hard skills)
 * - experiencia: O que a pessoa JÁ FEZ - casos passados, método STAR
 * - comportamental: Soft skills - como age/reage, habilidades interpessoais
 * - situacional: Hipotéticos - como FARIA em determinada situação
 */

export type CategoriaPerguntas =
  | 'tecnica'
  | 'experiencia'
  | 'comportamental'
  | 'situacional';

export interface ClassificacaoSugerida {
  categoria: CategoriaPerguntas;
  confianca: 'alta' | 'media' | 'baixa';
  motivo: string;
}

/**
 * Sugere categoria baseado em palavras-chave simples
 * Retorna sugestão com nível de confiança
 */
export function sugerirCategoria(textoPergunta: string): ClassificacaoSugerida {
  const texto = textoPergunta.toLowerCase();

  // 1. EXPERIENCIA - Perguntas sobre o passado (método STAR)
  if (
    /conte.*(sobre|uma vez|exemplo)/i.test(texto) ||
    /descreva.*(situação|momento|experiência|caso|projeto)/i.test(texto) ||
    /já.*(passou|teve|viveu|trabalhou|liderou|conduziu|participou)/i.test(texto) ||
    /como você (lidou|reagiu|agiu|conduziu)/i.test(texto) ||
    /dê um exemplo/i.test(texto) ||
    /na sua experiência/i.test(texto)
  ) {
    return {
      categoria: 'experiencia',
      confianca: 'alta',
      motivo: 'Pergunta sobre experiências passadas (método STAR)',
    };
  }

  // 2. COMPORTAMENTAL - Soft skills, como age/reage
  if (
    texto.includes('comunicação') ||
    texto.includes('liderança') ||
    texto.includes('equipe') ||
    texto.includes('conflito') ||
    texto.includes('feedback') ||
    texto.includes('pressão') ||
    texto.includes('estresse') ||
    /trabalho em equipe|relacionamento|colabora/i.test(texto) ||
    /como você se relaciona|como você interage/i.test(texto) ||
    /como você lida com/i.test(texto) ||
    /como você mantém|como você gerencia/i.test(texto)
  ) {
    return {
      categoria: 'comportamental',
      confianca: 'alta',
      motivo: 'Pergunta sobre habilidades interpessoais (soft skills)',
    };
  }

  // 3. SITUACIONAL - Hipotéticos, como faria
  if (
    /o que você faria se/i.test(texto) ||
    /como você (abordaria|resolveria|lidaria|procederia)/i.test(texto) ||
    /imagine que|suponha que|se você/i.test(texto) ||
    /qual sua (estratégia|abordagem) para/i.test(texto) ||
    /como você (priorizaria|organizaria)/i.test(texto)
  ) {
    return {
      categoria: 'situacional',
      confianca: 'alta',
      motivo: 'Pergunta situacional/hipotética (como faria)',
    };
  }

  // 4. TECNICA - Conhecimento, ferramentas, qualificações
  if (
    /explique|defin|o que (é|são)|qual.*diferença/i.test(texto) ||
    /conceito de|fundamento|teoria/i.test(texto) ||
    /certificação|formação|diploma|graduação/i.test(texto) ||
    /experiência com|domina|utiliza|conhecimento em/i.test(texto) ||
    /ferrament|software|sistema|plataforma|tecnologia/i.test(texto) ||
    /você (tem|possui|conhece|domina)/i.test(texto) ||
    /quais.*(ferramentas|tecnologias|linguagens)/i.test(texto)
  ) {
    return {
      categoria: 'tecnica',
      confianca: 'alta',
      motivo: 'Pergunta técnica (conhecimento, ferramentas, qualificações)',
    };
  }

  // Default: técnica (baixa confiança)
  return {
    categoria: 'tecnica',
    confianca: 'baixa',
    motivo: 'Não identificado - sugestão padrão',
  };
}

/**
 * Lista de categorias disponíveis com descrições amigáveis
 */
export const CATEGORIAS_DISPONIVEIS = [
  {
    id: 'tecnica' as const,
    nome: 'Técnica',
    descricao: 'Conhecimento técnico, ferramentas, qualificações e hard skills',
    icone: '🎯',
    exemplos: [
      'Explique o conceito de...',
      'Quais ferramentas você domina?',
      'Qual a diferença entre...',
    ],
  },
  {
    id: 'experiencia' as const,
    nome: 'Experiência',
    descricao: 'O que a pessoa JÁ FEZ - casos passados, projetos (método STAR)',
    icone: '💼',
    exemplos: [
      'Conte sobre uma vez que...',
      'Descreva um projeto onde...',
      'Dê um exemplo de quando você...',
    ],
  },
  {
    id: 'comportamental' as const,
    nome: 'Comportamental',
    descricao: 'Soft skills - comunicação, liderança, trabalho em equipe',
    icone: '🤝',
    exemplos: [
      'Como você trabalha em equipe?',
      'Como você lida com feedback?',
      'Como você gerencia conflitos?',
    ],
  },
  {
    id: 'situacional' as const,
    nome: 'Situacional',
    descricao: 'Hipotéticos - como FARIA em determinada situação',
    icone: '🧩',
    exemplos: [
      'O que você faria se...',
      'Como você abordaria...',
      'Qual sua estratégia para...',
    ],
  },
] as const;

/**
 * Obtém informações de uma categoria
 */
export function getInfoCategoria(categoria: CategoriaPerguntas) {
  return CATEGORIAS_DISPONIVEIS.find(c => c.id === categoria);
}

/**
 * Valida se uma categoria é válida
 */
export function isCategoriaValida(categoria: string): categoria is CategoriaPerguntas {
  return CATEGORIAS_DISPONIVEIS.some(c => c.id === categoria);
}
