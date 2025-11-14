// Arquivo server.js no diretório raiz para iniciar o backend
// Este arquivo inicia o servidor backend diretamente

const path = require('path');
const { spawn } = require('child_process');

// Obtem o caminho absoluto do diretório backend
const backendPath = path.join(__dirname, 'backend');

// Executa o comando 'node src/server.js' no diretório backend
const serverProcess = spawn('node', ['src/server.js'], {
  cwd: backendPath,
  stdio: 'inherit',
  env: { ...process.env } // Passa todas as variáveis de ambiente
});

serverProcess.on('error', (error) => {
  console.error('Erro ao iniciar o servidor backend:', error.message);
  process.exit(1);
});

serverProcess.on('close', (code) => {
  console.log(`Servidor backend encerrado com código: ${code}`);
  process.exit(code);
});