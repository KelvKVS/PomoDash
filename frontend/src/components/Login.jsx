import React, { useState } from 'react';
import { authAPI } from '../lib/api';

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.login(email, password);
      
      // Armazenar tokens e informações do usuário
      localStorage.setItem('token', result.data.tokens.access_token);
      localStorage.setItem('refreshToken', result.data.tokens.refresh_token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      
      // Chama a função de login passada como prop com os dados completos do usuário
      onLogin(result.data.user, result.data.access);
    } catch (err) {
      // Tratar erros de forma mais genérica
      if (err.message.includes('Credenciais inválidas') || err.message.includes('Conta inativa')) {
        setError('Email ou senha incorretos. Verifique suas credenciais.');
      } else {
        setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Bem-vindo ao PomoDash</h2>
        <p className="login-subtitle">Faça login para continuar no PomoDash da instituição AESA</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="seu@email.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Sua senha" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="login-footer">
          <span>Não tem uma conta na AESA? <button type="button" onClick={onRegister} className="register-link">Registre-se</button></span>
        </div>
      </form>
    </div>
  );
}

export default Login;