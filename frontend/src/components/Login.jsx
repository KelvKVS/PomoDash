import React from 'react';

function Login({ onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Bem-vindo de volta!</h2>
        <p className="login-subtitle">Faça login para continuar no PomoDash</p>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="seu@email.com" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" placeholder="Sua senha" required />
        </div>
        <button type="submit" className="login-button">Entrar</button>
        <div className="login-footer">
          <span>Não tem uma conta? <a href="#">Registre-se</a></span>
          <br />
          <a href="#">Esqueceu a senha?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;