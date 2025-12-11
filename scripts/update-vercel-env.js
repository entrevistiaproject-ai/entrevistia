/**
 * Script para atualizar variáveis de ambiente no Vercel
 */

const { spawn } = require('child_process');

const RESEND_FROM_EMAIL = 'EntrevistIA <noreply@entrevistia.com.br>';

async function removeEnvVar(envName, environment) {
  return new Promise((resolve, reject) => {
    console.log(`Removendo ${envName} do ambiente ${environment}...`);

    const proc = spawn('vercel', ['env', 'rm', envName, environment], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    let output = '';

    proc.stdout.on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    });

    proc.stderr.on('data', (data) => {
      output += data.toString();
      process.stderr.write(data);
    });

    proc.on('close', (code) => {
      if (code === 0 || output.includes('not found')) {
        resolve();
      } else {
        // Ignorar erro se a variável não existir
        resolve();
      }
    });

    // Auto-responder "y" para confirmação
    setTimeout(() => {
      try {
        proc.stdin.write('y\n');
        proc.stdin.end();
      } catch (e) {
        // Ignorar erro
      }
    }, 1000);
  });
}

async function addEnvVar(envName, value, environment) {
  return new Promise((resolve, reject) => {
    console.log(`Adicionando ${envName} ao ambiente ${environment}...`);

    const proc = spawn('vercel', ['env', 'add', envName, environment], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    let output = '';

    proc.stdout.on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    });

    proc.stderr.on('data', (data) => {
      output += data.toString();
      process.stderr.write(data);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed to add env var: ${output}`));
      }
    });

    // Enviar o valor da variável
    setTimeout(() => {
      try {
        proc.stdin.write(value + '\n');
        proc.stdin.end();
      } catch (e) {
        console.error('Error writing to stdin:', e);
      }
    }, 1000);
  });
}

async function main() {
  const environments = ['production', 'preview', 'development'];

  console.log('🔄 Atualizando RESEND_FROM_EMAIL no Vercel...\n');

  // Remover variáveis antigas
  for (const env of environments) {
    try {
      await removeEnvVar('RESEND_FROM_EMAIL', env);
    } catch (error) {
      console.log(`  ⚠️  Erro ao remover de ${env}, continuando...`);
    }
  }

  console.log('\n⏳ Aguardando 2 segundos...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Adicionar novas variáveis
  for (const env of environments) {
    try {
      await addEnvVar('RESEND_FROM_EMAIL', RESEND_FROM_EMAIL, env);
      console.log(`  ✅ ${env} atualizado\n`);
    } catch (error) {
      console.error(`  ❌ Erro ao adicionar em ${env}:`, error.message);
    }
  }

  console.log('\n✅ Variáveis atualizadas com sucesso!');
}

main().catch(console.error);
