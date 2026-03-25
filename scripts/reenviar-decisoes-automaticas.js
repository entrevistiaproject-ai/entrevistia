/**
 * Script para reenviar emails de decisão automática (aprovação/reprovação)
 * que não foram enviados devido ao bug do sistema de email
 */

const { neon } = require("@neondatabase/serverless");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "EntrevistIA <noreply@entrevistia.com.br>";

// Templates de email simplificados
function emailAprovacaoTemplate({ nomeCandidato, cargo, empresa, mensagem }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Parabéns, ${nomeCandidato}!</h1>
  </div>

  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Temos uma ótima notícia! Você foi <strong style="color: #10b981;">aprovado(a)</strong> para a próxima fase do processo seletivo para a vaga de <strong>${cargo}</strong> na <strong>${empresa}</strong>.
    </p>

    ${mensagem ? `
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
      <p style="margin: 0; font-style: italic;">"${mensagem}"</p>
    </div>
    ` : ''}

    <p style="font-size: 16px;">
      A equipe de recrutamento entrará em contato em breve com mais informações sobre os próximos passos.
    </p>

    <p style="font-size: 16px; margin-top: 30px;">
      Atenciosamente,<br>
      <strong>Equipe ${empresa}</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>Este email foi enviado automaticamente pelo sistema EntrevistIA.</p>
  </div>
</body>
</html>
  `;
}

function emailReprovacaoTemplate({ nomeCandidato, cargo, empresa, mensagem }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Atualização sobre sua candidatura</h1>
  </div>

  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Olá, ${nomeCandidato}!
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Agradecemos muito seu interesse e dedicação durante o processo seletivo para a vaga de <strong>${cargo}</strong> na <strong>${empresa}</strong>.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Após uma análise cuidadosa, decidimos seguir com outros candidatos cujos perfis estão mais alinhados com as necessidades específicas desta posição no momento.
    </p>

    ${mensagem ? `
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1; margin: 20px 0;">
      <p style="margin: 0; font-style: italic;">"${mensagem}"</p>
    </div>
    ` : ''}

    <p style="font-size: 16px;">
      Encorajamos você a continuar acompanhando nossas oportunidades. Desejamos muito sucesso em sua trajetória profissional!
    </p>

    <p style="font-size: 16px; margin-top: 30px;">
      Atenciosamente,<br>
      <strong>Equipe ${empresa}</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>Este email foi enviado automaticamente pelo sistema EntrevistIA.</p>
  </div>
</body>
</html>
  `;
}

async function reenviarDecisoes() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("📧 Reenviando emails de decisão automática...\n");

  // Buscar decisões sem email enviado
  const decisoesSemEmail = await sql`
    SELECT
      ce.id,
      ce.decisao_recrutador,
      ce.decisao_recrutador_em,
      c.nome as candidato_nome,
      c.email as candidato_email,
      e.titulo as entrevista_titulo,
      e.cargo as entrevista_cargo,
      e.auto_approval_candidate_message,
      e.auto_reject_candidate_message,
      u.empresa,
      u.nome as recrutador_nome
    FROM candidato_entrevistas ce
    JOIN candidatos c ON ce.candidato_id = c.id
    JOIN entrevistas e ON ce.entrevista_id = e.id
    JOIN users u ON e.user_id = u.id
    WHERE ce.decisao_recrutador IN ('aprovado', 'reprovado')
      AND ce.email_decisao_enviado_em IS NULL
    ORDER BY ce.decisao_recrutador_em DESC
  `;

  console.log(`📋 Total de decisões pendentes: ${decisoesSemEmail.length}\n`);

  let enviados = 0;
  let falhas = 0;

  for (const decisao of decisoesSemEmail) {
    const isAprovado = decisao.decisao_recrutador === "aprovado";
    const subject = isAprovado
      ? `Parabéns! Você foi aprovado(a) para a próxima fase - ${decisao.entrevista_cargo || "Vaga"}`
      : `Atualização sobre sua candidatura - ${decisao.entrevista_cargo || "Vaga"}`;

    const html = isAprovado
      ? emailAprovacaoTemplate({
          nomeCandidato: decisao.candidato_nome,
          cargo: decisao.entrevista_cargo || "Vaga",
          empresa: decisao.empresa || decisao.recrutador_nome,
          mensagem: decisao.auto_approval_candidate_message,
        })
      : emailReprovacaoTemplate({
          nomeCandidato: decisao.candidato_nome,
          cargo: decisao.entrevista_cargo || "Vaga",
          empresa: decisao.empresa || decisao.recrutador_nome,
          mensagem: decisao.auto_reject_candidate_message,
        });

    try {
      console.log(`📤 Enviando para ${decisao.candidato_email} (${decisao.decisao_recrutador})...`);

      const result = await resend.emails.send({
        from: FROM_EMAIL,
        to: decisao.candidato_email,
        subject,
        html,
      });

      if (result.data?.id) {
        // Atualizar registro no banco
        await sql`
          UPDATE candidato_entrevistas
          SET email_decisao_enviado_em = NOW(), updated_at = NOW()
          WHERE id = ${decisao.id}::uuid
        `;
        console.log(`  ✅ Enviado! ID: ${result.data.id}`);
        enviados++;
      } else {
        console.log(`  ❌ Falha: ${JSON.stringify(result.error)}`);
        falhas++;
      }
    } catch (error) {
      console.log(`  ❌ Erro: ${error.message}`);
      falhas++;
    }
  }

  console.log(`\n🎉 Concluído! Enviados: ${enviados}, Falhas: ${falhas}`);
}

reenviarDecisoes().catch(console.error);
