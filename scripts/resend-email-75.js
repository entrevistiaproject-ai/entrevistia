/**
 * Script para reenviar email de 75% do limite
 *
 * Uso: DATABASE_URL="..." RESEND_API_KEY="..." node scripts/resend-email-75.js <email>
 */

const { neon } = require("@neondatabase/serverless");
const { Resend } = require("resend");

const sql = neon(process.env.DATABASE_URL);
const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const emailArg = process.argv[2] || "joannisbs@gmail.com";

  console.log("=== Reenviar Email de 75% ===\n");

  // 1. Busca dados do usuário
  const [user] = await sql`
    SELECT id, nome, email, credito_extra, notificacao_75_enviada_em
    FROM users
    WHERE email = ${emailArg}
  `;

  if (!user) {
    console.error("Usuário não encontrado:", emailArg);
    process.exit(1);
  }

  console.log("Usuário encontrado:");
  console.log("  ID:", user.id);
  console.log("  Nome:", user.nome);
  console.log("  Email:", user.email);
  console.log("  Notificação enviada em:", user.notificacao_75_enviada_em || "(nunca)");

  // 2. Calcula uso financeiro
  const [transacoesResult] = await sql`
    SELECT COALESCE(SUM(valor_cobrado::numeric), 0) as total_gasto
    FROM transacoes
    WHERE user_id = ${user.id}
  `;

  const totalGasto = parseFloat(transacoesResult.total_gasto);
  const creditoExtra = parseFloat(user.credito_extra || "0");
  const limiteFinanceiro = 50 + creditoExtra; // R$ 50 base
  const saldoRestante = Math.max(0, limiteFinanceiro - totalGasto);
  const percentualUsado = limiteFinanceiro > 0 ? (totalGasto / limiteFinanceiro) * 100 : 0;

  console.log("\nUso financeiro:");
  console.log("  Total gasto: R$", totalGasto.toFixed(2));
  console.log("  Limite: R$", limiteFinanceiro.toFixed(2));
  console.log("  Saldo restante: R$", saldoRestante.toFixed(2));
  console.log("  Percentual usado:", percentualUsado.toFixed(1) + "%");

  // 3. Reseta a flag de notificação
  console.log("\n1. Resetando flag de notificação no banco...");
  await sql`
    UPDATE users
    SET notificacao_75_enviada_em = NULL,
        updated_at = NOW()
    WHERE id = ${user.id}
  `;
  console.log("   Flag resetada com sucesso!");

  // 4. Tenta enviar o email
  console.log("\n2. Tentando enviar email via Resend...");
  console.log("   From:", process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev");
  console.log("   To:", user.email);

  const html = generateEmailHTML(user.nome, {
    totalGasto,
    limiteFinanceiro,
    saldoRestante,
    percentualUsado
  });

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "EntrevistIA <onboarding@resend.dev>",
      to: user.email,
      subject: "Alerta: 75% do seu credito gratuito foi utilizado - EntrevistIA",
      html,
    });

    if (error) {
      console.error("\n   ERRO do Resend:", error.message);
      console.error("   Detalhes:", JSON.stringify(error, null, 2));

      if (error.message.includes("domain") || error.message.includes("verify")) {
        console.log("\n   PROBLEMA: Dominio nao verificado no Resend!");
        console.log("   SOLUCAO: Configure um dominio verificado no painel do Resend:");
        console.log("   https://resend.com/domains");
        console.log("\n   Depois, atualize RESEND_FROM_EMAIL para usar o dominio verificado.");
      }
    } else {
      console.log("\n   EMAIL ENVIADO COM SUCESSO!");
      console.log("   ID:", data.id);

      // Marca como enviado
      await sql`
        UPDATE users
        SET notificacao_75_enviada_em = NOW(),
            updated_at = NOW()
        WHERE id = ${user.id}
      `;
      console.log("   Flag atualizada no banco.");
    }
  } catch (err) {
    console.error("\n   ERRO ao enviar:", err.message);
  }
}

function generateEmailHTML(nome, usage) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alerta: 75% do seu credito gratuito foi utilizado</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">EntrevistIA</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-block; background-color: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                  Alerta de Uso
                </span>
              </div>
              <h2 style="margin: 0 0 16px; color: #18181b; font-size: 20px; font-weight: 600; text-align: center;">
                Ola, ${nome}!
              </h2>
              <p style="margin: 0 0 24px; color: #52525b; font-size: 16px; line-height: 1.6; text-align: center;">
                Voce ja utilizou <strong style="color: #f59e0b;">${Math.round(usage.percentualUsado)}%</strong> do seu credito gratuito de teste.
              </p>
              <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="color: #71717a; font-size: 14px;">Utilizado</span>
                  <span style="color: #18181b; font-size: 14px; font-weight: 600;">R$ ${usage.totalGasto.toFixed(2)} / R$ ${usage.limiteFinanceiro.toFixed(2)}</span>
                </div>
                <div style="background-color: #e4e4e7; border-radius: 4px; height: 8px; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #f59e0b, #ef4444); height: 100%; width: ${Math.min(usage.percentualUsado, 100)}%; border-radius: 4px;"></div>
                </div>
                <p style="margin: 12px 0 0; color: #71717a; font-size: 13px; text-align: center;">
                  Saldo restante: <strong style="color: #22c55e;">R$ ${usage.saldoRestante.toFixed(2)}</strong>
                </p>
              </div>
              <p style="margin: 0 0 24px; color: #52525b; font-size: 15px; line-height: 1.6;">
                Quando o credito acabar, as funcionalidades de analise por IA serao pausadas.
                Para continuar avaliando candidatos sem interrupcoes, cadastre seu cartao de credito e pague apenas pelo que usar.
              </p>
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; color: #166534; font-size: 14px; font-weight: 600;">
                  Precos transparentes:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px;">
                  <li style="margin-bottom: 4px;">R$ 1,00 por candidato avaliado</li>
                  <li>R$ 0,25 por pergunta analisada</li>
                </ul>
              </div>
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="https://entrevistia.com.br/upgrade"
                   style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3);">
                  Cadastrar Cartao de Credito
                </a>
              </div>
              <p style="margin: 0; color: #a1a1aa; font-size: 13px; text-align: center;">
                Sem compromisso. Cancele quando quiser.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fafafa; padding: 24px 40px; border-top: 1px solid #f4f4f5;">
              <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-align: center; line-height: 1.5;">
                Este email foi enviado pelo EntrevistIA.<br>
                Se voce nao reconhece esta mensagem, por favor ignore-a.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

main().catch(console.error);
