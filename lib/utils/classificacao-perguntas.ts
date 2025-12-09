/**
 * Sistema simples de sugestão de classificação de perguntas
 * Não é obrigatório - apenas ajuda o usuário a se organizar
 */

export type CategoriaPerguntas = 'tecnica' | 'comportamental' | 'soft_skill' | 'hard_skill';

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

  // Padrões comportamentais (alta confiança)
  if (
    /conte.*(sobre|uma vez|exemplo|situação)/i.test(texto) ||
    /descreva.*(situação|momento|experiência)/i.test(texto) ||
    /já.*(passou|teve|viveu)/i.test(texto) ||
    /como você (lidou|reagiu|agiu)/i.test(texto)
  ) {
    return {
      categoria: 'comportamental',
      confianca: 'alta',
      motivo: 'Pergunta sobre experiências/situações passadas',
    };
  }

  // Padrões técnicos (alta confiança)
  if (
    /como (implementar|funciona|criar|desenvolver)/i.test(texto) ||
    /qual.*(diferença|vantagem|tecnologia)/i.test(texto) ||
    /explique.*(conceito|código|algoritmo)/i.test(texto) ||
    texto.includes('código') ||
    texto.includes('tecnologia') ||
    texto.includes('framework')
  ) {
    return {
      categoria: 'tecnica',
      confianca: 'alta',
      motivo: 'Pergunta sobre conhecimento técnico/implementação',
    };
  }

  // Padrões soft skills (média confiança)
  if (
    texto.includes('comunicação') ||
    texto.includes('liderança') ||
    texto.includes('equipe') ||
    texto.includes('conflito') ||
    texto.includes('feedback') ||
    /trabalho em equipe/i.test(texto)
  ) {
    return {
      categoria: 'soft_skill',
      confianca: 'media',
      motivo: 'Menciona habilidades interpessoais',
    };
  }

  // Padrões hard skills (média confiança)
  if (
    texto.includes('certificação') ||
    texto.includes('formação') ||
    texto.includes('experiência com') ||
    texto.includes('domínio de') ||
    /conhecimento em/i.test(texto)
  ) {
    return {
      categoria: 'hard_skill',
      confianca: 'media',
      motivo: 'Menciona conhecimentos/certificações específicas',
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
    id: 'comportamental' as const,
    nome: 'Comportamental',
    descricao: 'Perguntas sobre experiências e situações passadas',
    icone: '💭',
    exemplos: [
      'Conte sobre uma vez que...',
      'Como você lidou com...',
      'Descreva uma situação onde...',
    ],
  },
  {
    id: 'tecnica' as const,
    nome: 'Técnica',
    descricao: 'Perguntas sobre conhecimentos técnicos e implementação',
    icone: '⚙️',
    exemplos: [
      'Como funciona...',
      'Qual a diferença entre...',
      'Explique o conceito de...',
    ],
  },
  {
    id: 'soft_skill' as const,
    nome: 'Soft Skills',
    descricao: 'Habilidades interpessoais e comportamentais',
    icone: '🤝',
    exemplos: [
      'Como você trabalha em equipe?',
      'Fale sobre sua liderança...',
      'Como você dá feedback?',
    ],
  },
  {
    id: 'hard_skill' as const,
    nome: 'Hard Skills',
    descricao: 'Conhecimentos técnicos específicos e certificações',
    icone: '📚',
    exemplos: [
      'Qual sua experiência com...',
      'Você possui certificação em...',
      'Qual seu domínio de...',
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
