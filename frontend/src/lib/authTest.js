// Teste de conexão com o backend
async function testBackendConnection() {
  try {
    const response = await fetch('http://localhost:3001/api/health');
    const data = await response.json();
    console.log('Conexão com o backend bem-sucedida:', data);
    return true;
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
    return false;
  }
}

// Teste de login
async function testLogin() {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'aluno@escolateste.com.br',
        password: '123456'
      })
    });

    const data = await response.json();
    console.log('Resposta do login:', data);
    
    if (response.ok) {
      console.log('Login bem-sucedido!');
      // Armazenar tokens no localStorage
      localStorage.setItem('token', data.data.tokens.access_token);
      localStorage.setItem('refreshToken', data.data.tokens.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return data;
    } else {
      console.error('Erro no login:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
}

// Teste de registro
async function testRegister() {
  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Teste Frontend',
        email: 'teste@frontend.com',
        password: '123456',
        role: 'student',
        school_id: '66f3b4e7d4e4420000f5a1b2' // ID de exemplo
      })
    });

    const data = await response.json();
    console.log('Resposta do registro:', data);
    
    if (response.ok) {
      console.log('Registro bem-sucedido!');
      return data;
    } else {
      console.error('Erro no registro:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Erro ao fazer registro:', error);
    return null;
  }
}

// Exportar funções para uso no App
export { testBackendConnection, testLogin, testRegister };