import Anthropic from "@anthropic-ai/sdk";

// Tipos para dados extraídos
export interface ExperienciaExtraida {
  cargo: string;
  empresa: string;
  localidade?: string;
  descricao?: string;
  dataInicio?: string;
  dataFim?: string;
  atual?: boolean;
  nivel?: string;
  skillsIdentificadas?: string[];
}

export interface FormacaoExtraida {
  instituicao: string;
  curso: string;
  area?: string;
  nivel: string;
  dataInicio?: string;
  dataFim?: string;
  emAndamento?: boolean;
}

export interface SkillExtraida {
  nome: string;
  categoria?: string;
  nivel?: string;
  anosExperiencia?: number;
}

export interface IdiomaExtraido {
  idioma: string;
  nivel: string;
  certificacao?: string;
}

export interface CertificacaoExtraida {
  nome: string;
  instituicao: string;
  dataEmissao?: string;
  dataExpiracao?: string;
}

export interface DadosExtraidos {
  // Dados pessoais
  nome?: string;
  email?: string;
  telefone?: string;
  linkedin?: string;
  cidade?: string;
  estado?: string;
  pais?: string;

  // Resumo
  resumoProfissional?: string;

  // Listas
  experiencias: ExperienciaExtraida[];
  formacoes: FormacaoExtraida[];
  skills: SkillExtraida[];
  idiomas: IdiomaExtraido[];
  certificacoes: CertificacaoExtraida[];

  // Metadados
  confiancaGeral: number; // 0-100
  alertas: string[]; // Inconsistências detectadas
}

export interface ParseResult {
  success: boolean;
  data?: DadosExtraidos;
  textoOriginal?: string;
  error?: string;
}

/**
 * Extrai texto de um arquivo PDF
 * Usa importação dinâmica para evitar problemas de build
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Importação dinâmica para evitar problemas de ESM/CJS
    // pdf-parse v2 usa classe PDFParse
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;
  } catch (error) {
    console.error("Erro ao extrair texto do PDF:", error);
    throw new Error("Não foi possível ler o arquivo PDF");
  }
}

/**
 * Extrai texto de um arquivo DOCX
 * Usa importação dinâmica para evitar problemas de build
 */
export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    // Importação dinâmica
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("Erro ao extrair texto do DOCX:", error);
    throw new Error("Não foi possível ler o arquivo DOCX");
  }
}

/**
 * Extrai texto de um arquivo (PDF ou DOCX)
 */
export async function extractText(
  buffer: Buffer,
  mimeType: string
): Promise<string> {
  if (mimeType === "application/pdf") {
    return extractTextFromPDF(buffer);
  } else if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "application/msword"
  ) {
    return extractTextFromDOCX(buffer);
  } else {
    throw new Error(`Tipo de arquivo não suportado: ${mimeType}`);
  }
}

/**
 * Usa IA para extrair dados estruturados do texto do CV
 */
export async function parseCV(texto: string): Promise<ParseResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { success: false, error: "API key não configurada" };
  }

  const anthropic = new Anthropic({ apiKey });

  const prompt = `Você é um especialista em análise de currículos. Analise o texto do currículo abaixo e extraia todas as informações de forma estruturada.

TEXTO DO CURRÍCULO:
${texto}

INSTRUÇÕES:
1. Extraia todas as informações disponíveis
2. Para datas, use o formato ISO (YYYY-MM-DD). Se só tiver mês/ano, use o primeiro dia do mês
3. Para níveis de experiência, use: estagiario, junior, pleno, senior, especialista, gerente, diretor, c_level
4. Para níveis de formação, use: ensino_medio, tecnico, graduacao, pos_graduacao, mba, mestrado, doutorado
5. Para níveis de idioma, use: basico, intermediario, avancado, fluente, nativo
6. Para níveis de skill, use: basico, intermediario, avancado, expert
7. Identifique skills implícitas (ex: se menciona React, também conhece JavaScript)
8. Detecte possíveis inconsistências (datas sobrepostas, gaps inexplicados, etc.)
9. Atribua uma confiança geral de 0-100 para a qualidade da extração

Retorne APENAS um JSON válido no seguinte formato (sem markdown, sem explicações):

{
  "nome": "string ou null",
  "email": "string ou null",
  "telefone": "string ou null",
  "linkedin": "string ou null",
  "cidade": "string ou null",
  "estado": "string ou null",
  "pais": "string ou null",
  "resumoProfissional": "string ou null",
  "experiencias": [
    {
      "cargo": "string",
      "empresa": "string",
      "localidade": "string ou null",
      "descricao": "string ou null",
      "dataInicio": "YYYY-MM-DD ou null",
      "dataFim": "YYYY-MM-DD ou null",
      "atual": boolean,
      "nivel": "string ou null",
      "skillsIdentificadas": ["array de strings"]
    }
  ],
  "formacoes": [
    {
      "instituicao": "string",
      "curso": "string",
      "area": "string ou null",
      "nivel": "string",
      "dataInicio": "YYYY-MM-DD ou null",
      "dataFim": "YYYY-MM-DD ou null",
      "emAndamento": boolean
    }
  ],
  "skills": [
    {
      "nome": "string",
      "categoria": "string ou null",
      "nivel": "string ou null",
      "anosExperiencia": number ou null
    }
  ],
  "idiomas": [
    {
      "idioma": "string",
      "nivel": "string",
      "certificacao": "string ou null"
    }
  ],
  "certificacoes": [
    {
      "nome": "string",
      "instituicao": "string",
      "dataEmissao": "YYYY-MM-DD ou null",
      "dataExpiracao": "YYYY-MM-DD ou null"
    }
  ],
  "confiancaGeral": number,
  "alertas": ["array de strings com inconsistências ou problemas detectados"]
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extrai o texto da resposta
    const content = response.content[0];
    if (content.type !== "text") {
      return { success: false, error: "Resposta inesperada da IA" };
    }

    // Parse do JSON
    let jsonStr = content.text.trim();

    // Remove possíveis marcadores de código
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith("```")) {
      jsonStr = jsonStr.slice(0, -3);
    }

    const data = JSON.parse(jsonStr) as DadosExtraidos;

    return {
      success: true,
      data,
      textoOriginal: texto,
    };
  } catch (error) {
    console.error("Erro ao parsear CV com IA:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao processar CV",
    };
  }
}

/**
 * Normaliza os dados extraídos (padroniza nomes de empresas, cargos, etc.)
 */
export async function normalizeData(data: DadosExtraidos): Promise<DadosExtraidos> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return data; // Retorna sem normalizar se não tiver API key
  }

  const anthropic = new Anthropic({ apiKey });

  const prompt = `Você é um especialista em normalização de dados de RH. Normalize os dados abaixo seguindo estas regras:

1. CARGOS: Padronize para português brasileiro formal
   - "Dev" → "Desenvolvedor"
   - "Sr" / "Senior" → "Sênior"
   - "Jr" / "Junior" → "Júnior"
   - Mantenha siglas conhecidas (CEO, CTO, etc.)

2. EMPRESAS: Padronize nomes conhecidos
   - Corrija variações de escrita
   - Mantenha o nome mais conhecido/oficial

3. SKILLS: Normalize para forma canônica
   - "React" = "ReactJS" = "React.js" → "React"
   - "Node" = "Node.js" = "NodeJS" → "Node.js"
   - Agrupe skills relacionadas

4. LOCALIDADES: Padronize formato
   - "SP" → "São Paulo"
   - Formato: "Cidade, Estado" ou "Cidade, Estado, País"

DADOS ORIGINAIS:
${JSON.stringify(data, null, 2)}

Retorne APENAS o JSON normalizado, sem explicações:`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return data;
    }

    let jsonStr = content.text.trim();
    if (jsonStr.startsWith("```json")) jsonStr = jsonStr.slice(7);
    if (jsonStr.startsWith("```")) jsonStr = jsonStr.slice(3);
    if (jsonStr.endsWith("```")) jsonStr = jsonStr.slice(0, -3);

    return JSON.parse(jsonStr) as DadosExtraidos;
  } catch (error) {
    console.error("Erro ao normalizar dados:", error);
    return data; // Retorna dados originais em caso de erro
  }
}

/**
 * Valida os dados e detecta inconsistências
 */
export async function validateData(data: DadosExtraidos): Promise<string[]> {
  const alertas: string[] = [...(data.alertas || [])];

  // Validação de datas de experiências
  for (let i = 0; i < data.experiencias.length; i++) {
    const exp = data.experiencias[i];

    // Verifica se data de início é anterior à data de fim
    if (exp.dataInicio && exp.dataFim) {
      const inicio = new Date(exp.dataInicio);
      const fim = new Date(exp.dataFim);
      if (inicio > fim) {
        alertas.push(
          `Experiência em ${exp.empresa}: data de início posterior à data de fim`
        );
      }
    }

    // Verifica sobreposição com outras experiências
    for (let j = i + 1; j < data.experiencias.length; j++) {
      const other = data.experiencias[j];
      if (exp.dataInicio && other.dataInicio) {
        const expInicio = new Date(exp.dataInicio);
        const expFim = exp.dataFim ? new Date(exp.dataFim) : new Date();
        const otherInicio = new Date(other.dataInicio);
        const otherFim = other.dataFim ? new Date(other.dataFim) : new Date();

        // Verifica sobreposição
        if (expInicio <= otherFim && otherInicio <= expFim) {
          // Sobreposição detectada - pode ser trabalho paralelo (ok) ou erro
          // Só alerta se for em empresas diferentes com sobreposição significativa
          if (exp.empresa !== other.empresa) {
            alertas.push(
              `Período sobreposto entre ${exp.empresa} e ${other.empresa} - verifique se são trabalhos paralelos`
            );
          }
        }
      }
    }
  }

  // Validação de formação
  for (const formacao of data.formacoes) {
    if (formacao.dataInicio && formacao.dataFim) {
      const inicio = new Date(formacao.dataInicio);
      const fim = new Date(formacao.dataFim);
      if (inicio > fim) {
        alertas.push(
          `Formação em ${formacao.instituicao}: data de início posterior à data de fim`
        );
      }
    }
  }

  return [...new Set(alertas)]; // Remove duplicatas
}

/**
 * Processa um CV completo: extrai texto, parseia com IA, normaliza e valida
 */
export async function processCV(
  buffer: Buffer,
  mimeType: string
): Promise<ParseResult> {
  try {
    // 1. Extrai texto do arquivo
    const texto = await extractText(buffer, mimeType);

    if (!texto || texto.trim().length < 50) {
      return {
        success: false,
        error: "O arquivo parece estar vazio ou não contém texto suficiente",
      };
    }

    // 2. Parseia com IA
    const parseResult = await parseCV(texto);
    if (!parseResult.success || !parseResult.data) {
      return parseResult;
    }

    // 3. Normaliza os dados
    const normalizedData = await normalizeData(parseResult.data);

    // 4. Valida e detecta inconsistências
    const alertas = await validateData(normalizedData);
    normalizedData.alertas = alertas;

    return {
      success: true,
      data: normalizedData,
      textoOriginal: texto,
    };
  } catch (error) {
    console.error("Erro ao processar CV:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao processar CV",
    };
  }
}
