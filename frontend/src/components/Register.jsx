import React, { useState } from 'react';
import { authAPI } from '../lib/api';

function Register({ onRegister, onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' // Padrão
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validação de senha
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Validação de tamanho da senha
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Validação de campos obrigatórios
    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setLoading(true);

    try {
      // Dados para registro de usuário - sem escola no frontend
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      await authAPI.register(userData);
      
      setSuccess('Registro realizado com sucesso na instituição AESA! Você pode fazer login agora.');
      
      // Opcional: limpar o formulário após sucesso
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
      });
      
      // Chama a função de callback para indicar que o registro foi completado
      if (onRegister) {
        setTimeout(() => {
          onRegister();
        }, 1500); // Pequeno delay para mostrar a mensagem de sucesso
      }
    } catch (err) {
      // Tratar erros específicos do backend
      if (err.message.includes('Email já cadastrado')) {
        setError('Este email já está cadastrado. Tente outro email.');
      } else {
        setError(err.message || 'Erro ao registrar. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="/src/assets/logoVe.png" alt="PomoDash Logo" style={{ height: '80px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
        </div>
        <h2 className="register-title">Crie sua conta</h2>
        <p className="register-subtitle">Preencha os dados abaixo para se registrar</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}
        
        <div className="input-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Sua senha (mínimo 6 caracteres)"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
            minLength="6"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <div className="password-mismatch-error">
              As senhas não coincidem
            </div>
          )}
        </div>
        
        <div className="input-group">
          <label htmlFor="role">Tipo de Usuário</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="student">Aluno</option>
            <option value="teacher">Professor</option>
            <option value="school_admin">Administrador da Escola</option>
          </select>
        </div>
        
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
        
        <div className="register-footer">
          <span>Já tem uma conta? <button type="button" onClick={onLogin} className="login-link">Faça login</button></span>
        </div>
      </form>
    </div>
  );
}

export default Register;