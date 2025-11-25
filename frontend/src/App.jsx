import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteHandler from './components/RouteHandler';
import './components/Login.css';
import './components/Register.css';
import './components/RegisterWrapper.css';
import './components/Dashboard.css';
import './components/AuthChecker.css';

// Importa as funções de API
import { initializeApp, authAPI } from './lib/api';

// Define variáveis CSS globais para cores
const setGlobalStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --primary-color: #d9534f; /* Red mais suave */
      --primary-light: #e78c88;
      --primary-dark: #c9302c;
      --secondary-color: #6c757d;
      --success-color: #28a745;
      --warning-color: #ffc107;
      --danger-color: #d9534f; /* Red mais suave */
      --background-color: #f8f9fa;
      --card-background: white;
      --text-color: #212529;
      --text-light-color: #6c757d;
      --text-white: white;
      --border-color: #dee2e6;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .dark-theme {
      --background-color: #121212;
      --card-background: #1e1e1e;
      --text-color: #e0e0e0;
      --text-light-color: #b0b0b0;
      --border-color: #444444;
    }
  `;
  document.head.appendChild(style);
};

// Executa quando o componente é montado
setGlobalStyles();

// Inicializa a aplicação com interceptors
initializeApp();

function App() {
  const [user, setUser] = useState(null); // Informações do usuário logado
  const [darkMode, setDarkMode] = useState(false);

  // Carregar preferência do modo escuro do localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
    }
    
    // Verificar se o usuário já está logado (apenas para manter a sessão ativa)
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validar se o token ainda é válido fazendo uma chamada de teste
        // Isso ajuda a detectar incompatibilidades entre servidores
        fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (response.ok) {
            setUser(parsedUser);
          } else {
            // Token inválido ou incompatível, limpar
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
          }
        })
        .catch(error => {
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            // Erros de rede - apenas avisar brevemente
            console.warn('Conexão com o servidor indisponível');
          } else {
            console.error('Erro ao validar token:', error);
          }
          // Em caso de erro na validação, limpar os dados
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        });
      } catch (error) {
        console.error('Erro ao parsear usuário do localStorage:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Alternar modo escuro
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.remove('dark-theme');
    }
  };

  // Função de login
  const handleLogin = (userData, accessData) => {
    setUser({ 
      ...userData,
      access: accessData 
    });
  };

  // Função de logout
  const handleLogout = async () => {
    try {
      // Chamar endpoint de logout no backend
      await authAPI.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Limpar dados do usuário
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-theme' : ''}`}>
      <Router>
        <RouteHandler 
          user={user} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      </Router>
    </div>
  );
}

export default App;