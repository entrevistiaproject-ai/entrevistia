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
