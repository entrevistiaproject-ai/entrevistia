/**
 * Estilos responsivos compartilhados para todos os templates de email
 */
function getResponsiveStyles(): string {
  return `
    <style type="text/css">
      /* Reset e base */
      body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

      /* Responsivo */
      @media only screen and (max-width: 620px) {
        .email-container {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mobile-padding {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        .mobile-padding-header {
          padding: 32px 20px !important;
        }
        .mobile-stack {
          display: block !important;
          width: 100% !important;
        }
        .mobile-center {
          text-align: center !important;
        }
        .mobile-font-large {
          font-size: 26px !important;
        }
        .mobile-font-title {
          font-size: 20px !important;
        }
        .mobile-font-code {
          font-size: 32px !important;
          letter-spacing: 4px !important;
        }
        .mobile-button {
          padding: 16px 32px !important;
          font-size: 15px !important;
        }
        .mobile-hide {
          display: none !important;
        }
        .mobile-full-width {
          width: 100% !important;
        }
        .mobile-img {
          width: 100% !important;
          height: auto !important;
        }
      }

      /* Para clientes que suportam dark mode */
      @media (prefers-color-scheme: dark) {
        .email-bg { background-color: #1f2937 !important; }
      }
    </style>
    <!--[if mso]>
    <style type="text/css">
      body, table, td, p, a, li { font-family: Arial, sans-serif !important; }
    </style>
    <![endif]-->
  `;
}

/**
 * Template de email de verificação
 * Design moderno e responsivo
 */
export function emailVerificacaoTemplate(params: {
  nome: string;
  codigo: string;
  email: string;
}) {
  const { nome, codigo, email } = params;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verificação de Email - EntrevistIA</title>
  ${getResponsiveStyles()}
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        <![endif]-->
        <!-- Container Principal -->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 600px; width: 100%;">

          <!-- Header com gradiente -->
          <tr>
            <td class="mobile-padding-header" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
              <h1 class="mobile-font-large" style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                EntrevistIA
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                Confirme seu email para começar
              </p>
            </td>
          </tr>

          <!-- Conteúdo -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 30px;">
              <h2 class="mobile-font-title" style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 600;">
                Olá, ${nome}!
              </h2>

              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Bem-vindo(a) à <strong>EntrevistIA</strong>! Falta só um passo para você começar a entrevistar candidatos com IA.
              </p>

              <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Use este código para confirmar seu email:
              </p>

              <!-- Código de Verificação -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 30px 0;">
                <tr>
                  <td align="center" style="background-color: #f9fafb; border: 2px dashed #d1d5db; border-radius: 8px; padding: 24px 16px;">
                    <div class="mobile-font-code" style="font-size: 42px; font-weight: 700; color: #3b82f6; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                      ${codigo}
                    </div>
                    <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">
                      Este código expira em <strong>15 minutos</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 0 0 30px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  Não foi você? Pode ignorar este email com segurança.
                </p>
              </div>

              <!-- Informações adicionais -->
              <div style="background-color: #eff6ff; border-radius: 8px; padding: 16px; margin: 0 0 20px 0;">
                <p style="margin: 0 0 10px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                  Conta criada para:
                </p>
                <p style="margin: 0; color: #3730a3; font-size: 14px; word-break: break-all;">
                  ${email}
                </p>
              </div>

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Depois de confirmar, você já pode:
              </p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
                <li>Criar sua primeira entrevista em 2 minutos</li>
                <li>Usar R$ 50 em créditos grátis</li>
                <li>Deixar a IA analisar os candidatos por você</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Este email foi enviado pela <strong>EntrevistIA</strong>
              </p>
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 12px;">
                São Paulo - SP, Brasil
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} EntrevistIA. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>

        <!-- Texto adicional abaixo do card -->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="margin-top: 20px; max-width: 600px; width: 100%;">
          <tr>
            <td style="text-align: center; padding: 0 20px;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                Precisa de ajuda? Fale com a gente em
                <a href="mailto:contato@entrevistia.com.br" style="color: #3b82f6; text-decoration: none;">contato@entrevistia.com.br</a>
              </p>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Gera código de 6 dígitos criptograficamente seguro
 */
export function gerarCodigoVerificacao(): string {
  // Usa crypto.getRandomValues para geração segura
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  // Garante 6 dígitos (100000-999999)
  return (100000 + (array[0] % 900000)).toString();
}

/**
 * Template de email de encerramento de processo seletivo
 * Usado quando o candidato não é aprovado para a próxima fase
 */
export function emailEncerramentoTemplate(params: {
  nomeCandidato: string;
  cargo: string;
  empresa: string;
  mensagemPersonalizada?: string;
}) {
  const { nomeCandidato, cargo, empresa, mensagemPersonalizada } = params;

  const mensagemPadrao = `Agradecemos muito seu interesse na vaga de <strong>${cargo}</strong> e o tempo que você dedicou ao nosso processo.

Após avaliar todos os candidatos, decidimos seguir com outros perfis que estão mais alinhados com o que buscamos neste momento. Isso não diminui suas qualidades — sabemos que você tem muito a oferecer.

Vamos manter seu perfil em nosso banco para futuras oportunidades.

Desejamos sucesso na sua busca!`;

  const mensagemFinal = mensagemPersonalizada || mensagemPadrao;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Atualização sobre sua candidatura - ${empresa}</title>
  ${getResponsiveStyles()}
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        <![endif]-->
        <!-- Container Principal -->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td class="mobile-padding-header" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 40px 30px; text-align: center;">
              <h1 class="mobile-font-large" style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                ${empresa}
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                Atualização sobre sua candidatura
              </p>
            </td>
          </tr>

          <!-- Conteúdo -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 30px;">
              <h2 class="mobile-font-title" style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: 600;">
                Olá, ${nomeCandidato}!
              </h2>

              <div style="color: #4b5563; font-size: 16px; line-height: 1.7;">
                ${mensagemFinal.split('\n\n').map(p => `<p style="margin: 0 0 16px 0;">${p}</p>`).join('')}
              </div>

              <!-- Card de informação -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.5;">
                  <strong>Guardamos seu perfil.</strong> Se surgir uma vaga com o seu perfil, entraremos em contato.
                </p>
              </div>

              <p style="margin: 30px 0 0 0; color: #4b5563; font-size: 16px;">
                Atenciosamente,<br>
                <strong>Equipe de Recrutamento</strong><br>
                ${empresa}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Este email foi enviado via <strong>EntrevistIA</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} ${empresa}. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Gera texto padrão para email de encerramento
 */
export function getTextoEncerramentoPadrao(cargo: string): string {
  return `Agradecemos muito seu interesse na vaga de ${cargo} e o tempo que você dedicou ao nosso processo.

Após avaliar todos os candidatos, decidimos seguir com outros perfis que estão mais alinhados com o que buscamos neste momento. Isso não diminui suas qualidades — sabemos que você tem muito a oferecer.

Vamos manter seu perfil em nosso banco para futuras oportunidades.

Desejamos sucesso na sua busca!`;
}

/**
 * Mensagens sugeridas para notificação de candidatos
 * Baseadas em boas práticas de RH para comunicação humanizada
 */
export const MENSAGENS_SUGERIDAS = {
  aprovacao: {
    padrao: `Temos uma ótima notícia para você!

Ficamos muito impressionados com sua entrevista e gostaríamos de convidá-lo(a) para avançar no processo seletivo.

Seu perfil demonstrou alinhamento com o que buscamos e acreditamos que você pode agregar muito ao nosso time.

Em breve entraremos em contato com mais detalhes sobre os próximos passos. Parabéns!`,

    entusiasmada: `Parabéns! 🎉

Sua entrevista foi excepcional! Você demonstrou exatamente as competências e valores que buscamos.

Estamos muito animados em informar que você foi aprovado(a) para a próxima etapa do processo seletivo.

Prepare-se, porque logo entraremos em contato para dar continuidade. Estamos ansiosos para conhecê-lo(a) melhor!`,

    formal: `Prezado(a) candidato(a),

Após análise criteriosa de sua entrevista, temos a satisfação de informar que você foi selecionado(a) para prosseguir em nosso processo seletivo.

Identificamos em seu perfil características que consideramos essenciais para a posição em questão.

Nossa equipe de Recursos Humanos entrará em contato em breve para agendar as próximas etapas.

Atenciosamente,
Equipe de Recrutamento`,
  },

  reprovacao: {
    padrao: `Agradecemos muito seu interesse em fazer parte do nosso time e o tempo que você dedicou ao processo seletivo.

Após uma análise cuidadosa de todos os candidatos, decidimos seguir com perfis que estão mais alinhados com as necessidades específicas desta vaga neste momento.

Isso não diminui suas qualidades profissionais. Manteremos seu currículo em nosso banco de talentos para futuras oportunidades.

Desejamos muito sucesso em sua jornada!`,

    construtiva: `Obrigado por participar do nosso processo seletivo!

Valorizamos muito o tempo e esforço que você dedicou à entrevista. Após analisar todos os candidatos, optamos por seguir com outros perfis para esta vaga específica.

Cada processo seletivo é único, e não ter sido selecionado(a) agora não reflete suas capacidades como profissional.

Encorajamos você a continuar se candidatando a outras vagas que surgirem — muitas vezes é uma questão de timing e fit com a posição.

Desejamos sucesso em seus próximos desafios!`,

    formal: `Prezado(a) candidato(a),

Agradecemos seu interesse em integrar nossa equipe e o tempo investido em nosso processo seletivo.

Após avaliação de todos os candidatos, informamos que não daremos continuidade com sua candidatura para esta posição específica.

Esta decisão não diminui suas qualificações profissionais. Seu perfil permanecerá em nosso banco de dados para futuras oportunidades.

Desejamos sucesso em sua trajetória profissional.

Atenciosamente,
Equipe de Recrutamento`,

    empatica: `Sabemos que receber essa notícia não é fácil, e queremos que saiba que valorizamos genuinamente sua participação.

Infelizmente, não poderemos seguir com sua candidatura para esta vaga. A decisão foi difícil, pois recebemos muitos candidatos qualificados.

Lembre-se: cada "não" te aproxima do "sim" certo. Continue acreditando no seu potencial!

Guardamos seu perfil com carinho para futuras oportunidades. Quem sabe não nos encontramos em breve?

Desejamos tudo de bom na sua caminhada! 🌟`,
  },
} as const;

export type TipoMensagemAprovacao = keyof typeof MENSAGENS_SUGERIDAS.aprovacao;
export type TipoMensagemReprovacao = keyof typeof MENSAGENS_SUGERIDAS.reprovacao;

/**
 * Formata prazo de forma amigável
 */
function formatarPrazo(prazo: Date): string {
  const agora = new Date();
  const diff = prazo.getTime() - agora.getTime();
  const horas = Math.ceil(diff / (1000 * 60 * 60));
  const dias = Math.ceil(horas / 24);

  if (dias === 1) return "24 horas";
  if (dias === 2) return "48 horas";
  if (dias <= 7) return `${dias} dias`;

  return prazo.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Template de email de convite para entrevista
 * Design moderno, responsivo e com foco em conversão
 */
export function emailConviteEntrevistaTemplate(params: {
  nomeCandidato: string;
  cargo: string;
  empresa: string;
  nomeRecrutador?: string;
  linkEntrevista: string;
  prazoResposta: Date;
}) {
  const {
    nomeCandidato,
    cargo,
    empresa,
    nomeRecrutador,
    linkEntrevista,
    prazoResposta,
  } = params;

  const prazoFormatado = formatarPrazo(prazoResposta);
  const dataLimite = prazoResposta.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Convite para Entrevista - ${empresa}</title>
  ${getResponsiveStyles()}
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        <![endif]-->
        <!-- Container Principal -->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08); max-width: 600px; width: 100%;">

          <!-- Header com gradiente vibrante -->
          <tr>
            <td class="mobile-padding-header" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); padding: 48px 40px; text-align: center;">
              <div style="margin-bottom: 16px;">
                <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">
                  CONVITE ESPECIAL
                </span>
              </div>
              <h1 class="mobile-font-title" style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; line-height: 1.3;">
                Você foi selecionado(a) para uma entrevista!
              </h1>
              <p style="margin: 12px 0 0 0; color: rgba(255,255,255,0.9); font-size: 15px;">
                ${empresa} quer conhecer você melhor
              </p>
            </td>
          </tr>

          <!-- Conteúdo Principal -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 30px;">
              <h2 class="mobile-font-title" style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px; font-weight: 600;">
                Olá, ${nomeCandidato}! 👋
              </h2>

              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.7;">
                ${nomeRecrutador ? `<strong>${nomeRecrutador}</strong> da` : "A equipe da"} <strong>${empresa}</strong> analisou seu perfil e ficou interessada em conhecê-lo(a) melhor para a vaga de:
              </p>

              <!-- Card da Vaga -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 28px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #0ea5e9;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;" width="40">
                          <span style="font-size: 28px;">💼</span>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0 0 4px 0; color: #0369a1; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            Vaga
                          </p>
                          <p style="margin: 0; color: #0c4a6e; font-size: 18px; font-weight: 700;">
                            ${cargo}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Como Funciona -->
              <div style="margin: 0 0 28px 0;">
                <p style="margin: 0 0 16px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                  Como funciona a entrevista:
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="width: 36px; vertical-align: top;">
                            <div style="width: 28px; height: 28px; background: #ddd6fe; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">
                              1
                            </div>
                          </td>
                          <td style="padding-left: 12px;">
                            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">
                              <strong>Confirme seus dados</strong> — já temos suas informações, só precisa verificar
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="width: 36px; vertical-align: top;">
                            <div style="width: 28px; height: 28px; background: #ddd6fe; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">
                              2
                            </div>
                          </td>
                          <td style="padding-left: 12px;">
                            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">
                              <strong>Responda às perguntas</strong> — em áudio, no seu ritmo
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="width: 36px; vertical-align: top;">
                            <div style="width: 28px; height: 28px; background: #ddd6fe; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">
                              3
                            </div>
                          </td>
                          <td style="padding-left: 12px;">
                            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">
                              <strong>Aguarde o retorno</strong> — avaliaremos suas respostas com carinho
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Prazo com destaque -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; text-align: center;">
                    <div style="margin-bottom: 8px;">
                      <span style="font-size: 28px;">⏰</span>
                    </div>
                    <p style="margin: 0 0 4px 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Prazo para responder
                    </p>
                    <p style="margin: 0; color: #78350f; font-size: 18px; font-weight: 700;">
                      ${prazoFormatado}
                    </p>
                    <p style="margin: 8px 0 0 0; color: #a16207; font-size: 13px;">
                      até ${dataLimite}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px 0;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${linkEntrevista}" style="height:54px;v-text-anchor:middle;width:280px;" arcsize="22%" strokecolor="#6366f1" fillcolor="#6366f1">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">Iniciar Minha Entrevista →</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${linkEntrevista}" class="mobile-button" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);">
                      Iniciar Minha Entrevista →
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Link alternativo -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 0 0 24px 0;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-align: center;">
                  Se o botão não funcionar, copie e cole este link no navegador:
                </p>
                <p style="margin: 0; color: #6366f1; font-size: 11px; word-break: break-all; text-align: center;">
                  ${linkEntrevista}
                </p>
              </div>

              <!-- Dicas -->
              <div style="background-color: #f0fdf4; border-radius: 12px; padding: 16px; border-left: 4px solid #22c55e;">
                <p style="margin: 0 0 12px 0; color: #166534; font-size: 14px; font-weight: 600;">
                  💡 Dicas para arrasar na entrevista:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #15803d; font-size: 13px; line-height: 1.8;">
                  <li>Escolha um ambiente tranquilo e bem iluminado</li>
                  <li>Tenha por perto informações sobre suas experiências</li>
                  <li>Seja você mesmo(a) — queremos conhecer a pessoa real!</li>
                  <li>Não se preocupe em ser perfeito(a), seja autêntico(a)</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="background-color: #f8fafc; padding: 32px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;">
                Boa sorte! Estamos torcendo por você! 🍀
              </p>
              <p style="margin: 0 0 16px 0; color: #64748b; font-size: 13px;">
                Equipe ${empresa}
              </p>
              <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 16px;">
                <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                  Este convite foi enviado via <strong>EntrevistIA</strong> • Plataforma de entrevistas com IA
                </p>
              </div>
            </td>
          </tr>

        </table>

        <!-- Texto de segurança -->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="margin-top: 24px; max-width: 600px; width: 100%;">
          <tr>
            <td style="text-align: center; padding: 0 20px;">
              <p style="margin: 0; color: #94a3b8; font-size: 11px; line-height: 1.6;">
                Se você não se candidatou para esta vaga ou não reconhece este email, por favor ignore-o.<br>
                Seus dados estão seguros e protegidos conforme a LGPD.
              </p>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Template de email de convite para time de recrutadores
 */
export function emailConviteTimeTemplate(params: {
  nomeConvidado: string;
  nomeQuemConvidou: string;
  empresaQuemConvidou: string;
  role: string;
  linkConvite: string;
  mensagemPersonalizada?: string;
}) {
  const { nomeConvidado, nomeQuemConvidou, empresaQuemConvidou, role, linkConvite, mensagemPersonalizada } = params;

  const roleDescriptions: Record<string, string> = {
    admin: "Administrador (pode gerenciar membros e configurações)",
    recruiter: "Recrutador (pode criar entrevistas e avaliar candidatos)",
    viewer: "Visualizador (apenas visualização)",
  };

  const roleDescription = roleDescriptions[role] || role;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Convite para Time - EntrevistIA</title>
  ${getResponsiveStyles()}
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td class="mobile-padding-header" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
              <h1 class="mobile-font-large" style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                EntrevistIA
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                Convite para Time de Recrutamento
              </p>
            </td>
          </tr>

          <!-- Conteudo -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 30px;">
              <h2 class="mobile-font-title" style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 600;">
                Olá, ${nomeConvidado}!
              </h2>

              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                <strong>${nomeQuemConvidou}</strong> convidou você para fazer parte do time de recrutamento da <strong>${empresaQuemConvidou}</strong> na EntrevistIA!
              </p>

              ${mensagemPersonalizada ? `
              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin: 0 0 24px 0;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; font-style: italic;">
                  "${mensagemPersonalizada}"
                </p>
                <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 12px;">
                  - ${nomeQuemConvidou}
                </p>
              </div>
              ` : ''}

              <!-- Role -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin: 0 0 24px 0;">
                <p style="margin: 0 0 8px 0; color: #374151; font-size: 14px; font-weight: 600;">
                  Sua função no time:
                </p>
                <p style="margin: 0; color: #6366f1; font-size: 16px; font-weight: 500;">
                  ${roleDescription}
                </p>
              </div>

              <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Com a EntrevistIA, você poderá:
              </p>

              <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
                <li>Criar e gerenciar entrevistas com IA</li>
                <li>Avaliar candidatos de forma rápida e eficiente</li>
                <li>Colaborar com seu time em tempo real</li>
                <li>Tomar decisões baseadas em dados</li>
              </ul>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${linkConvite}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="16%" strokecolor="#6366f1" fillcolor="#6366f1">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">Aceitar Convite</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${linkConvite}" class="mobile-button" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Aceitar Convite
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Link alternativo -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 0 0 24px 0;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-align: center;">
                  Se o botão não funcionar, copie e cole este link:
                </p>
                <p style="margin: 0; color: #6366f1; font-size: 11px; word-break: break-all; text-align: center;">
                  ${linkConvite}
                </p>
              </div>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  Este convite expira em <strong>7 dias</strong>. Se você não fez esta solicitação, pode ignorar este email.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Este email foi enviado pela <strong>EntrevistIA</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} EntrevistIA. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Template de email de aprovação automática para candidato
 * Design moderno, celebrativo e profissional
 */
export function emailAprovacaoAutomaticaTemplate(params: {
  nomeCandidato: string;
  cargo: string;
  empresa: string;
  mensagemPersonalizada?: string;
}) {
  const { nomeCandidato, cargo, empresa, mensagemPersonalizada } = params;

  const mensagemPadrao = `Temos ótimas notícias! Após analisar sua entrevista para a vaga de <strong>${cargo}</strong>, ficamos muito impressionados com seu perfil.

Você foi aprovado(a) para a próxima fase do processo seletivo! Em breve entraremos em contato com mais detalhes sobre os próximos passos.

Parabéns pelo excelente desempenho!`;

  const mensagemFinal = mensagemPersonalizada || mensagemPadrao;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Parabéns! Você foi aprovado(a) - ${empresa}</title>
  ${getResponsiveStyles()}
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0fdf4; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(34, 197, 94, 0.15); max-width: 600px; width: 100%;">

          <!-- Header celebrativo com gradiente verde -->
          <tr>
            <td class="mobile-padding-header" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%); padding: 48px 30px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    <td style="font-size: 40px; padding: 0 8px;">&#127881;</td>
                    <td style="font-size: 48px; padding: 0 8px;">&#127942;</td>
                    <td style="font-size: 40px; padding: 0 8px;">&#127881;</td>
                  </tr>
                </table>
              </div>
              <div style="background: rgba(255,255,255,0.2); display: inline-block; padding: 8px 20px; border-radius: 20px; margin-bottom: 16px;">
                <span style="color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 1px;">PARABÉNS!</span>
              </div>
              <h1 class="mobile-font-large" style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.3;">
                Você foi aprovado(a)!
              </h1>
              <p style="margin: 12px 0 0 0; color: #dcfce7; font-size: 16px;">
                para a próxima fase do processo seletivo
              </p>
            </td>
          </tr>

          <!-- Card da vaga destacado -->
          <tr>
            <td style="padding: 0 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: -24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; border: 2px solid #86efac; text-align: center;">
                    <p style="margin: 0 0 4px 0; color: #166534; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Vaga
                    </p>
                    <p style="margin: 0; color: #15803d; font-size: 20px; font-weight: 700;">
                      ${cargo}
                    </p>
                    <p style="margin: 8px 0 0 0; color: #16a34a; font-size: 14px;">
                      ${empresa}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Conteudo -->
          <tr>
            <td class="mobile-padding" style="padding: 32px 30px 40px;">
              <h2 class="mobile-font-title" style="margin: 0 0 24px 0; color: #111827; font-size: 22px; font-weight: 600;">
                Olá, ${nomeCandidato}! 👋
              </h2>

              <div style="color: #4b5563; font-size: 16px; line-height: 1.8;">
                ${mensagemFinal.split('\n\n').map(p => `<p style="margin: 0 0 18px 0;">${p}</p>`).join('')}
              </div>

              <!-- Card de próximos passos -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 24px; border-left: 4px solid #22c55e;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;" width="40">
                          <div style="width: 36px; height: 36px; background: #22c55e; border-radius: 50%; text-align: center; line-height: 36px;">
                            <span style="color: white; font-size: 18px;">✓</span>
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0 0 8px 0; color: #166534; font-size: 16px; font-weight: 600;">
                            Próximos passos
                          </p>
                          <p style="margin: 0; color: #15803d; font-size: 14px; line-height: 1.6;">
                            Nossa equipe de recrutamento entrará em contato em breve para agendar as próximas etapas do processo. Fique atento(a) ao seu email e telefone!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Dicas para a próxima fase -->
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; color: #334155; font-size: 14px; font-weight: 600;">
                  💡 Enquanto isso, você pode:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 2;">
                  <li>Pesquisar mais sobre a empresa e a vaga</li>
                  <li>Preparar perguntas sobre o cargo e a equipe</li>
                  <li>Revisar suas experiências relevantes</li>
                </ul>
              </div>

              <p style="margin: 0; color: #4b5563; font-size: 16px;">
                Atenciosamente,<br>
                <strong style="color: #111827;">Equipe de Recrutamento</strong><br>
                <span style="color: #22c55e; font-weight: 500;">${empresa}</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="background-color: #f8fafc; padding: 28px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;">
                Estamos torcendo por você! 🍀
              </p>
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 13px;">
                Este email foi enviado via <strong>EntrevistIA</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} ${empresa}. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Template de email de reprovação automática para candidato
 * Design humanizado, respeitoso e empático
 */
export function emailReprovacaoAutomaticaTemplate(params: {
  nomeCandidato: string;
  cargo: string;
  empresa: string;
  mensagemPersonalizada?: string;
}) {
  const { nomeCandidato, cargo, empresa, mensagemPersonalizada } = params;

  const mensagemPadrao = `Agradecemos muito seu interesse na vaga de <strong>${cargo}</strong> e o tempo que você dedicou ao nosso processo seletivo.

Após uma análise cuidadosa, decidimos seguir com outros candidatos que estão mais alinhados com o perfil que buscamos neste momento.

Isso não diminui suas qualidades profissionais. Manteremos seu perfil em nosso banco para futuras oportunidades que possam ser mais adequadas ao seu perfil.

Desejamos muito sucesso em sua jornada profissional!`;

  const mensagemFinal = mensagemPersonalizada || mensagemPadrao;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Atualização sobre sua candidatura - ${empresa}</title>
  ${getResponsiveStyles()}
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" class="email-container" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); max-width: 600px; width: 100%;">

          <!-- Header elegante e acolhedor -->
          <tr>
            <td class="mobile-padding-header" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); padding: 44px 30px; text-align: center;">
              <div style="margin-bottom: 16px;">
                <div style="width: 56px; height: 56px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 28px; line-height: 56px;">💼</span>
                </div>
              </div>
              <h1 class="mobile-font-large" style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700;">
                ${empresa}
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 15px;">
                Atualização sobre sua candidatura
              </p>
            </td>
          </tr>

          <!-- Card da vaga -->
          <tr>
            <td style="padding: 0 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: -20px;">
                <tr>
                  <td style="background: #ffffff; border-radius: 12px; padding: 16px 20px; border: 1px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;" width="36">
                          <div style="width: 36px; height: 36px; background: #f3f4f6; border-radius: 8px; text-align: center; line-height: 36px;">
                            <span style="font-size: 18px;">📋</span>
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0 0 2px 0; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            Vaga
                          </p>
                          <p style="margin: 0; color: #374151; font-size: 16px; font-weight: 600;">
                            ${cargo}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Conteudo -->
          <tr>
            <td class="mobile-padding" style="padding: 32px 30px 40px;">
              <h2 class="mobile-font-title" style="margin: 0 0 24px 0; color: #111827; font-size: 22px; font-weight: 600;">
                Olá, ${nomeCandidato}
              </h2>

              <div style="color: #4b5563; font-size: 16px; line-height: 1.8;">
                ${mensagemFinal.split('\n\n').map(p => `<p style="margin: 0 0 18px 0;">${p}</p>`).join('')}
              </div>

              <!-- Card motivacional -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; border-left: 4px solid #3b82f6;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;" width="40">
                          <div style="width: 36px; height: 36px; background: #3b82f6; border-radius: 50%; text-align: center; line-height: 36px;">
                            <span style="color: white; font-size: 18px;">📁</span>
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 15px; font-weight: 600;">
                            Seu perfil foi guardado
                          </p>
                          <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">
                            Manteremos suas informações em nosso banco de talentos. Se surgir uma oportunidade mais alinhada ao seu perfil, entraremos em contato!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Mensagem de encorajamento -->
              <div style="background-color: #fefce8; border-radius: 12px; padding: 20px; margin-bottom: 28px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 24px;">🌟</p>
                <p style="margin: 0; color: #854d0e; font-size: 14px; line-height: 1.6; font-style: italic;">
                  "Cada processo seletivo é uma oportunidade de aprendizado e crescimento. Continue acreditando no seu potencial!"
                </p>
              </div>

              <p style="margin: 0; color: #4b5563; font-size: 16px;">
                Atenciosamente,<br>
                <strong style="color: #111827;">Equipe de Recrutamento</strong><br>
                <span style="color: #6366f1; font-weight: 500;">${empresa}</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="background-color: #f9fafb; padding: 28px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;">
                Desejamos sucesso em sua jornada! 🚀
              </p>
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 13px;">
                Este email foi enviado via <strong>EntrevistIA</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} ${empresa}. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
