import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DashboardProfessor from './components/DashboardProfessor';
import DashboardInstitution from './components/DashboardInstitution';
import DashboardUser from './components/DashboardUser';
import './components/Login.css';
import './components/Dashboard.css';

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
  `;
  document.head.appendChild(style);
};

// Executa quando o componente é montado
setGlobalStyles();

function App() {
  const [userType, setUserType] = useState(null); // null = não escolheu, 'student' = aluno, 'professor' = professor, 'institution' = instituição, 'user' = usuário final
  const [darkMode, setDarkMode] = useState(false);

  // Carregar preferência do modo escuro do localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
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

  // Função para selecionar o tipo de usuário (simulando login)
  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  // Função para voltar à seleção de tipo de usuário
  const handleLogout = () => {
    setUserType(null);
  };

  // Componente de seleção de tipo de usuário
  const UserTypeSelection = () => (
    <div className="user-type-selection">
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo escuro">
          {darkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </div>
      <h2>Bem-vindo ao PomoDash!</h2>
      <p>Selecione o tipo de usuário:</p>
      <div className="user-type-buttons">
        <button onClick={() => handleUserTypeSelection('student')} className="user-type-btn">
          <i className="fas fa-user-graduate"></i>
          <span>Área do Aluno</span>
        </button>
        <button onClick={() => handleUserTypeSelection('professor')} className="user-type-btn">
          <i className="fas fa-chalkboard-teacher"></i>
          <span>Área do Professor</span>
        </button>
        <button onClick={() => handleUserTypeSelection('institution')} className="user-type-btn">
          <i className="fas fa-university"></i>
          <span>Área da Instituição</span>
        </button>
        <button onClick={() => handleUserTypeSelection('user')} className="user-type-btn">
          <i className="fas fa-user-cog"></i>
          <span>Minha Área</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`App ${darkMode ? 'dark-theme' : ''}`}>
      {userType === null ? (
        <UserTypeSelection />
      ) : userType === 'student' ? (
        <>
          <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          <div className="app-footer">
            <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo escuro">
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <button onClick={handleLogout} className="logout-button">Trocar Usuário</button>
          </div>
        </>
      ) : userType === 'professor' ? (
        <>
          <DashboardProfessor darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          <div className="app-footer">
            <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo escuro">
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <button onClick={handleLogout} className="logout-button">Trocar Usuário</button>
          </div>
        </>
      ) : userType === 'institution' ? (
        <>
          <DashboardInstitution darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          <div className="app-footer">
            <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo escuro">
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <button onClick={handleLogout} className="logout-button">Trocar Usuário</button>
          </div>
        </>
      ) : (
        <>
          <DashboardUser darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          <div className="app-footer">
            <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo escuro">
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <button onClick={handleLogout} className="logout-button">Trocar Usuário</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;