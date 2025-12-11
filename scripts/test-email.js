/**
 * Script para testar envio de email via Resend
 */

require('dotenv').config({ path: '.env.local', override: true });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log('🧪 Testando configuração do Resend...\n');

  // Verificar configuração
  console.log('📋 Configuração:');
  console.log('   API Key:', process.env.RESEND_API_KEY ? '✅ Configurada' : '❌ Não configurada');
  console.log('   From Email:', process.env.RESEND_FROM_EMAIL || 'Não configurado');
  console.log('');

  // Solicitar email de destino
  const destinatario = process.argv[2];

  if (!destinatario) {
    console.error('❌ Por favor, forneça um email de destino:');
    console.error('   node scripts/test-email.js seu-email@exemplo.com');
    process.exit(1);
  }

  console.log('📧 Enviando email de teste...');
  console.log('   De:', process.env.RESEND_FROM_EMAIL);
  console.log('   Para:', destinatario);
  console.log('');

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'EntrevistIA <onboarding@resend.dev>',
      to: destinatario,
      subject: '🧪 Teste de Configuração - EntrevistIA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">✅ Email de Teste</h2>
          <p>Parabéns! O Resend está configurado corretamente.</p>
          <p>Você está recebendo este email porque o domínio <strong>entrevistia.com.br</strong> foi verificado com sucesso.</p>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">✅ Configuração OK</h3>
            <ul>
              <li>Domínio verificado</li>
              <li>DNS configurado corretamente</li>
              <li>Emails funcionando</li>
            </ul>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            Este é um email automático de teste do sistema EntrevistIA.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Erro ao enviar email:\n');
      console.error('Message:', error.message);
      console.error('Name:', error.name);

      if (error.message?.includes('verify') || error.message?.includes('domain')) {
        console.error('\n⚠️  O domínio ainda não foi verificado pelo Resend.');
        console.error('   Isso pode levar alguns minutos ou até 48 horas.');
        console.error('   Verifique o status em: https://resend.com/domains\n');
      }

      process.exit(1);
    }

    console.log('✅ Email enviado com sucesso!\n');
    console.log('📬 Detalhes:');
    console.log('   ID:', data?.id);
    console.log('   Status: Email enviado para', destinatario);
    console.log('\n💡 Verifique sua caixa de entrada (e pasta de spam)!');

  } catch (error) {
    console.error('❌ Erro crítico:', error.message);
    process.exit(1);
  }
}

testEmail();
