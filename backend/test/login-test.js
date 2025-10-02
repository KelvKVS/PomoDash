const axios = require('axios');

// URL base da API
const BASE_URL = 'http://localhost:3001/api';

// Função para testar login com diferentes credenciais
async function testLogin(email, password, description) {
  try {
    console.log(`\n🧪 Testando login para ${description}:`);
    console.log(`Email: ${email}`);
    
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password
    });

    console.log('✅ Login realizado com sucesso!');
    console.log(`👤 Perfil: ${response.data.data.user.roleDescription}`);
    console.log(`📊 Dashboard: ${response.data.data.access.dashboard}`);
    console.log(`🔒 Permissões: ${response.data.data.access.permissions.admin ? 'Administrador' : 'Usuário comum'}`);
    console.log(`📋 Áreas acessíveis: ${response.data.data.access.allowedAreas.join(', ')}`);
    
    return response.data;
  } catch (error) {
    console.log(`❌ Erro no login para ${description}:`, error.response?.data?.message || error.message);
    return null;
  }
}

// Função principal para testar diferentes tipos de usuários
async function runTests() {
  console.log('🚀 Iniciando testes de login com diferentes funções de usuário...');
  
  // Testar login como Global Admin
  await testLogin('admin@pomodash.com', '123456', 'Administrador Global');
  
  // Testar login como School Admin
  await testLogin('admin@escolateste.com.br', '123456', 'Administrador da Escola');
  
  // Testar login como Professor
  await testLogin('professor@escolateste.com.br', '123456', 'Professor');
  
  // Testar login como Aluno
  await testLogin('aluno@escolateste.com.br', '123456', 'Aluno');
  
  console.log('\n✅ Testes concluídos!');
}

// Executar os testes
runTests().catch(error => {
  console.error('Erro geral nos testes:', error);
});