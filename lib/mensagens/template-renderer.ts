/**
 * Renderiza um template de mensagem substituindo variáveis
 *
 * Variáveis: {{nome}}, {{vaga}}, {{empresa}}, {{data}}, {{hora}}, {{link}}, etc.
 * Condicionais: {{#var}}conteúdo{{/var}} - só mostra se a variável existir
 */
export function renderTemplate(
  template: string,
  variables: Record<string, string | undefined>
): string {
  let result = template;

  // Primeiro, processar condicionais: {{#var}}conteúdo{{/var}}
  const conditionalRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
  result = result.replace(conditionalRegex, (_, varName, content) => {
    const value = variables[varName];
    if (value) {
      // Renderizar variáveis dentro do bloco condicional
      return renderTemplate(content, variables);
    }
    return "";
  });

  // Depois, substituir variáveis simples: {{var}}
  const variableRegex = /\{\{(\w+)\}\}/g;
  result = result.replace(variableRegex, (_, varName) => {
    return variables[varName] || "";
  });

  return result;
}

/**
 * Gera as variáveis padrão para um contexto
 */
export function getDefaultVariables(context: {
  candidatoNome?: string;
  candidatoEmail?: string;
  vaga?: string;
  empresa?: string;
  recrutador?: string;
  data?: Date;
  link?: string;
  linkReuniao?: string;
  linkGerenciar?: string;
  local?: string;
  motivo?: string;
  feedback?: string;
  proximaEtapa?: string;
  prazo?: string;
}): Record<string, string | undefined> {
  const vars: Record<string, string | undefined> = {
    nome: context.candidatoNome,
    email: context.candidatoEmail,
    vaga: context.vaga,
    empresa: context.empresa,
    recrutador: context.recrutador,
    link: context.link,
    link_reuniao: context.linkReuniao,
    link_gerenciar: context.linkGerenciar,
    local: context.local,
    motivo: context.motivo,
    feedback: context.feedback,
    proxima_etapa: context.proximaEtapa,
    prazo: context.prazo,
  };

  if (context.data) {
    vars.data = context.data.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    vars.hora = context.data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return vars;
}
