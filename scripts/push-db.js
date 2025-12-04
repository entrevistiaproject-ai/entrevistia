#!/usr/bin/env node
const { spawn } = require('child_process');

console.log('🚀 Aplicando migrations no banco...');

const child = spawn('npx', ['drizzle-kit', 'push'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true
});

// Aguarda um pouco e envia a seta para baixo + enter para selecionar "Yes"
setTimeout(() => {
  child.stdin.write('\x1B[B'); // Seta para baixo
  setTimeout(() => {
    child.stdin.write('\n'); // Enter
    child.stdin.end();
  }, 500);
}, 3000);

child.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Migrations aplicadas com sucesso!');
  } else {
    console.error('❌ Erro ao aplicar migrations');
    process.exit(1);
  }
});
