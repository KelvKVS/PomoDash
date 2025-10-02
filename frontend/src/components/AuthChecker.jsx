import React, { useState, useEffect } from 'react';
import { testBackendConnection, testLogin } from '../lib/authTest';

function AuthChecker() {
  const [status, setStatus] = useState('checking'); // checking, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      setStatus('checking');
      setMessage('Verificando conexão com o backend...');

      // Testar conexão com o backend
      const backendOk = await testBackendConnection();
      if (!backendOk) {
        setStatus('error');
        setMessage('Não foi possível conectar ao backend. Verifique se o servidor está rodando na porta 3001.');
        return;
      }

      // Verificar se o usuário já está logado
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setStatus('success');
          setMessage(`Bem-vindo de volta, ${user.name || user.email}!`);
          return;
        } catch (error) {
          console.error('Erro ao parsear usuário do localStorage:', error);
        }
      }

      setStatus('success');
      setMessage('Sistema pronto para autenticação');
    };

    checkAuth();
  }, []);

  if (status === 'checking') {
    return (
      <div className="auth-checker">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="auth-checker error">
        <div className="error-content">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-checker success">
      <div className="success-content">
        <i className="fas fa-check-circle"></i>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default AuthChecker;