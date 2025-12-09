/**
 * Sistema simples de sugestão de classificação de perguntas
 * Não é obrigatório - apenas ajuda o usuário a se organizar
 *
 * Categorias intuitivas que dividem bem o espectro de perguntas:
 * - conhecimento: O que a pessoa SABE (conceitos, teoria)
 * - experiencia: O que a pessoa JÁ FEZ (casos passados, STAR)
 * - resolucao_problemas: COMO a pessoa pensa (hipotéticos, estratégia)
 * - habilidades_pessoais: SOFT SKILLS (comunicação, liderança)
 * - qualificacoes: CERTIFICAÇÕES (ferramentas, formação)
 */

export type CategoriaPerguntas =
  | 'conhecimento'
  | 'experiencia'
  | 'resolucao_problemas'
  | 'habilidades_pessoais'
  | 'qualificacoes';

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
    /já.*(passou|teve|viveu|trabalhou|liderou|conduziu)/i.test(texto) ||
    /como você (lidou|reagiu|agiu|conduziu)/i.test(texto) ||
    /dê um exemplo/i.test(texto)
  ) {
    return {
      categoria: 'experiencia',
      confianca: 'alta',
      motivo: 'Pergunta sobre experiências e casos passados (STAR)',
    };
  }

  // 2. CONHECIMENTO - Conceitos e teoria
  if (
    /explique|defin|o que (é|e)|qual.*diferença/i.test(texto) ||
    /conceito de|fundamento|teoria/i.test(texto) ||
    /qual.*significado|o que significa/i.test(texto)
  ) {
    return {
      categoria: 'conhecimento',
      confianca: 'alta',
      motivo: 'Pergunta sobre conceitos e conhecimento teórico',
    };
  }

  // 3. RESOLUCAO_PROBLEMAS - Como pensa e resolve
  if (
    /como você (aborda|resolve|priori|organiza|lida)/i.test(texto) ||
    /qual sua (estratégia|abordagem|metodologia|processo)/i.test(texto) ||
    /como (implementar|criar|desenvolver|otimizar)/i.test(texto) ||
    /o que você faria se|como você faria/i.test(texto)
  ) {
    return {
      categoria: 'resolucao_problemas',
      confianca: 'alta',
      motivo: 'Pergunta sobre raciocínio e resolução de problemas',
    };
  }

  // 4. HABILIDADES_PESSOAIS - Soft skills
  if (
    texto.includes('comunicação') ||
    texto.includes('liderança') ||
    texto.includes('equipe') ||
    texto.includes('conflito') ||
    texto.includes('feedback') ||
    /trabalho em equipe|relacionamento|colabora/i.test(texto) ||
    /como você se relaciona|como você interage/i.test(texto)
  ) {
    return {
      categoria: 'habilidades_pessoais',
      confianca: 'alta',
      motivo: 'Pergunta sobre habilidades interpessoais (soft skills)',
    };
  }

  // 5. QUALIFICACOES - Certificações e ferramentas
  if (
    /certificação|formação|diploma|graduação/i.test(texto) ||
    /experiência com|domina|utiliza|conhecimento em/i.test(texto) ||
    /ferrament|software|sistema|plataforma/i.test(texto) ||
    /você (tem|possui|já usou|conhece)/i.test(texto) ||
    /quais.*ferramentas/i.test(texto)
  ) {
    return {
      categoria: 'qualificacoes',
      confianca: 'media',
      motivo: 'Pergunta sobre qualificações, ferramentas ou certificações',
    };
  }

  // Default: conhecimento (baixa confiança)
  return {
    categoria: 'conhecimento',
    confianca: 'baixa',
    motivo: 'Não identificado - sugestão padrão',
  };
}

/**
 * Lista de categorias disponíveis com descrições amigáveis
 */
export const CATEGORIAS_DISPONIVEIS = [
  {
    id: 'conhecimento' as const,
    nome: 'Conhecimento',
    descricao: 'O que a pessoa SABE - conceitos, teoria, fundamentos',
    icone: '📚',
    exemplos: [
      'Explique o conceito de...',
      'Qual a diferença entre...',
      'O que significa...',
    ],
  },
  {
    id: 'experiencia' as const,
    nome: 'Experiência',
    descricao: 'O que a pessoa JÁ FEZ - casos passados, projetos, situações (STAR)',
    icone: '💼',
    exemplos: [
      'Conte sobre uma vez que...',
      'Descreva um projeto onde...',
      'Dê um exemplo de quando você...',
    ],
  },
  {
    id: 'resolucao_problemas' as const,
    nome: 'Resolução de Problemas',
    descricao: 'COMO a pessoa pensa - estratégia, abordagem, raciocínio',
    icone: '🧩',
    exemplos: [
      'Como você abordaria...',
      'Qual sua estratégia para...',
      'Como você resolveria...',
    ],
  },
  {
    id: 'habilidades_pessoais' as const,
    nome: 'Habilidades Pessoais',
    descricao: 'SOFT SKILLS - comunicação, liderança, trabalho em equipe',
    icone: '🤝',
    exemplos: [
      'Como você trabalha em equipe?',
      'Como você dá feedback?',
      'Como você lida com conflitos?',
    ],
  },
  {
    id: 'qualificacoes' as const,
    nome: 'Qualificações',
    descricao: 'CERTIFICAÇÕES e FERRAMENTAS - formação, domínio de tecnologias',
    icone: '🎓',
    exemplos: [
      'Quais ferramentas você domina?',
      'Você possui certificação em...',
      'Qual sua experiência com...',
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
