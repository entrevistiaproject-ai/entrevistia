# Configuração do Resend para Email

## Status Atual
- ✅ API Key configurada
- ✅ Código atualizado com logs detalhados
- ⏳ Domínio `entrevistia.com.br` precisa ser verificado

## Passo a Passo

### 1. Verificar o Domínio no Resend

1. Acesse https://resend.com/domains
2. Clique no domínio `entrevistia.com.br`
3. Você verá os registros DNS necessários

### 2. Configurar DNS

No seu provedor de DNS (Registro.br, Cloudflare, etc.), adicione os registros que o Resend fornecer:

**Exemplo de registros típicos:**

```
Tipo: TXT
Nome: @
Valor: v=spf1 include:amazonses.com ~all

Tipo: CNAME
Nome: resend._domainkey
Valor: [valor fornecido pelo Resend]

Tipo: CNAME
Nome: resend2._domainkey
Valor: [valor fornecido pelo Resend]
```

### 3. Aguardar Verificação

- A verificação pode levar de alguns minutos até 48 horas
- O status mudará de "Not Started" para "Verified"
- Você pode clicar em "Verify" no painel do Resend para forçar a verificação

### 4. Testar o Envio

Após a verificação, teste o envio de email:

```bash
npm run dev
```

Faça login na aplicação e teste a funcionalidade de envio de código de verificação.

### 5. Configurar Produção (Vercel)

No painel do Vercel, adicione as variáveis de ambiente:

```bash
RESEND_API_KEY=re_hNHfA2Tf_Ex6CKVmMP784uqDtaj9ZvSSA
RESEND_FROM_EMAIL="EntrevistIA <noreply@entrevistia.com.br>"
```

Ou via CLI:

```bash
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL
```

## Logs de Debug

Com as melhorias feitas, você verá logs detalhados:

```
📧 Tentando enviar email...
   From: EntrevistIA <noreply@entrevistia.com.br>
   To: usuario@example.com
   Subject: Seu código de verificação
✅ Email enviado com sucesso!
   ID: abc123...
```

Em caso de erro:
```
❌ Erro ao enviar email:
   Message: [mensagem do erro]
   Name: [tipo do erro]
   Full error: {...}
```

## Modo Desenvolvimento

Se o domínio não estiver verificado, em desenvolvimento o sistema:
- Não falhará o processo
- Mostrará um aviso
- O código de verificação aparecerá nos logs

## Troubleshooting

### Domínio não verifica
- Verifique se os registros DNS foram adicionados corretamente
- Use ferramentas como `nslookup` ou https://mxtoolbox.com/
- Aguarde a propagação DNS (pode levar até 48h)

### Emails não chegam
- Verifique a pasta de spam
- Confirme que o domínio está "Verified" no painel do Resend
- Verifique os logs da aplicação

### Erro "API key is invalid"
- Verifique se a `RESEND_API_KEY` está correta
- Gere uma nova API key no painel do Resend se necessário

## Links Úteis

- Painel do Resend: https://resend.com/domains
- Documentação: https://resend.com/docs
- Verificador DNS: https://mxtoolbox.com/
