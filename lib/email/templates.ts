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
  <title>Verificação de Email - EntrevistIA</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container Principal -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header com gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                EntrevistIA
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                Confirme seu email para começar
              </p>
            </td>
          </tr>

          <!-- Conteúdo -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 600;">
                Olá, ${nome}!
              </h2>

              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Bem-vindo(a) à <strong>EntrevistIA</strong>! Falta só um passo para você começar a entrevistar candidatos com IA.
              </p>

              <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Use este código para confirmar seu email:
              </p>

              <!-- Código de Verificação -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 30px 0;">
                <tr>
                  <td align="center" style="background-color: #f9fafb; border: 2px dashed #d1d5db; border-radius: 8px; padding: 30px;">
                    <div style="font-size: 42px; font-weight: 700; color: #3b82f6; letter-spacing: 8px; font-family: 'Courier New', monospace;">
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
              <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin: 0 0 20px 0;">
                <p style="margin: 0 0 10px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                  Conta criada para:
                </p>
                <p style="margin: 0; color: #3730a3; font-size: 14px;">
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
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
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
        <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
          <tr>
            <td style="text-align: center; padding: 0 30px;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                Precisa de ajuda? Fale com a gente em
                <a href="mailto:contato@entrevistia.com.br" style="color: #3b82f6; text-decoration: none;">contato@entrevistia.com.br</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Gera código de 6 dígitos
 */
export function gerarCodigoVerificacao(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
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
  <title>Atualização sobre sua candidatura - ${empresa}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container Principal -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                ${empresa}
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                Atualização sobre sua candidatura
              </p>
            </td>
          </tr>

          <!-- Conteúdo -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 22px; font-weight: 600;">
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
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                Este email foi enviado via <strong>EntrevistIA</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} ${empresa}. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>

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
  descricaoVaga?: string;
}) {
  const {
    nomeCandidato,
    cargo,
    empresa,
    nomeRecrutador,
    linkEntrevista,
    prazoResposta,
    descricaoVaga
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
  <title>Convite para Entrevista - ${empresa}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container Principal -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">

          <!-- Header com gradiente vibrante -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); padding: 48px 40px; text-align: center;">
              <div style="margin-bottom: 16px;">
                <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">
                  CONVITE ESPECIAL
                </span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.3;">
                Você foi selecionado(a) para uma entrevista!
              </h1>
              <p style="margin: 12px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                ${empresa} quer conhecer você melhor
              </p>
            </td>
          </tr>

          <!-- Conteúdo Principal -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px; font-weight: 600;">
                Olá, ${nomeCandidato}! 👋
              </h2>

              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.7;">
                ${nomeRecrutador ? `<strong>${nomeRecrutador}</strong> da` : "A equipe da"} <strong>${empresa}</strong> analisou seu perfil e ficou interessada em conhecê-lo(a) melhor para a vaga de:
              </p>

              <!-- Card da Vaga -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 28px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; border-left: 4px solid #0ea5e9;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span style="font-size: 32px;">💼</span>
                      <div>
                        <p style="margin: 0 0 4px 0; color: #0369a1; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Vaga
                        </p>
                        <p style="margin: 0; color: #0c4a6e; font-size: 20px; font-weight: 700;">
                          ${cargo}
                        </p>
                      </div>
                    </div>
                    ${descricaoVaga ? `
                    <p style="margin: 16px 0 0 0; color: #475569; font-size: 14px; line-height: 1.6; border-top: 1px solid #bae6fd; padding-top: 16px;">
                      ${descricaoVaga}
                    </p>
                    ` : ""}
                  </td>
                </tr>
              </table>

              <!-- Como Funciona -->
              <div style="margin: 0 0 28px 0;">
                <p style="margin: 0 0 16px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                  Como funciona a entrevista:
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                      <table cellpadding="0" cellspacing="0">
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
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width: 36px; vertical-align: top;">
                            <div style="width: 28px; height: 28px; background: #ddd6fe; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">
                              2
                            </div>
                          </td>
                          <td style="padding-left: 12px;">
                            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">
                              <strong>Responda às perguntas</strong> — em texto ou vídeo, no seu ritmo
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <table cellpadding="0" cellspacing="0">
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
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px 0;">
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
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${linkEntrevista}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 18px 48px; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);">
                      Iniciar Minha Entrevista →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Link alternativo -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 0 0 24px 0;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-align: center;">
                  Se o botão não funcionar, copie e cole este link no navegador:
                </p>
                <p style="margin: 0; color: #6366f1; font-size: 12px; word-break: break-all; text-align: center;">
                  ${linkEntrevista}
                </p>
              </div>

              <!-- Dicas -->
              <div style="background-color: #f0fdf4; border-radius: 12px; padding: 20px; border-left: 4px solid #22c55e;">
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
            <td style="background-color: #f8fafc; padding: 32px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
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
        <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
          <tr>
            <td style="text-align: center; padding: 0 40px;">
              <p style="margin: 0; color: #94a3b8; font-size: 11px; line-height: 1.6;">
                Se você não se candidatou para esta vaga ou não reconhece este email, por favor ignore-o.<br>
                Seus dados estão seguros e protegidos conforme a LGPD.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
