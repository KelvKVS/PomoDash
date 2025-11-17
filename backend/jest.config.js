module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js', // Exclui o arquivo principal do servidor
    '!src/config/database.js', // Exclui configuração do banco de dados
    '!src/scripts/**' // Exclui scripts
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/test/**/*(*.)+(spec|test).js'  // Melhor padrão para identificar testes
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/setup.js',
    '/test/globalSetup.js',
    '/test/setupAfterEnv.js',
    '/test/login-test.js'
  ],
  testTimeout: 30000,
};