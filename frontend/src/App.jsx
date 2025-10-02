import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import RegisterWrapper from './components/RegisterWrapper';
import Dashboard from './components/Dashboard';
import DashboardProfessor from './components/DashboardProfessor';
import DashboardInstitution from './components/DashboardInstitution';
import DashboardUser from './components/DashboardUser';
import './components/Login.css';
import './components/Register.css';
import './components/RegisterWrapper.css';
import './components/Dashboard.css';
import './components/AuthChecker.css';

// Importa as funções de API
import { initializeApp } from './lib/api';

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
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register'
  const [darkMode, setDarkMode] = useState(false);

  // Carregar preferência do modo escuro do localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
    }
    
    // Verificar se já há um usuário logado
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao parsear usuário do localStorage:', error);
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

  // Função de login - chamada pelo componente de login
  const handleLogin = (userData, accessData) => {
    setUser({ 
      ...userData,
      access: accessData 
    });
    // O redirecionamento será feito automaticamente com base no role
  };

  // Função de logout
  const handleLogout = () => {
    // Limpar dados do usuário
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('login');
  };

  // Função para trocar para tela de registro
  const switchToRegister = () => {
    setCurrentView('register');
  };

  // Função para voltar para login
  const switchToLogin = () => {
    setCurrentView('login');
  };

  // Componente de login
  const LoginScreen = () => (
    <div className="auth-container">
      <Login onLogin={handleLogin} onRegister={switchToRegister} />
    </div>
  );

  // Componente de registro
  const RegisterScreen = () => (
    <div className="auth-container">
      <RegisterWrapper onRegister={() => setCurrentView('login')} onLogin={switchToLogin} />
    </div>
  );



  // Renderizar o dashboard apropriado com base no role do usuário
  const renderDashboard = () => {
    if (!user) return null;

    const { role } = user;
    
    switch (role) {
      case 'global_admin':
      case 'school_admin':
        return <DashboardInstitution darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />;
      case 'teacher':
        return <DashboardProfessor darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />;
      case 'student':
        return <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />;
      default:
        return <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} />;
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-theme' : ''}`}>
      {!user ? (
        // Tela de autenticação (login ou registro)
        <div className="auth-wrapper">
          {currentView === 'login' && <LoginScreen />}
          {currentView === 'register' && <RegisterScreen />}
        </div>
      ) : (
        // Dashboard do usuário
        <>
          {renderDashboard()}
          <div className="app-footer">
            <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar tema">
              {darkMode ? (
                <>
                  <i className="fas fa-sun"></i>
                  <span className="tooltip">Tema Claro</span>
                </>
              ) : (
                <>
                  <i className="fas fa-moon"></i>
                  <span className="tooltip">Tema Escuro</span>
                </>
              )}
            </button>
            <button onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i>
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;