import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import RegisterWrapper from './RegisterWrapper';
import DashboardInstitution from './DashboardInstitution';
import DashboardProfessor from './DashboardProfessor';
import DashboardUser from './DashboardUser';
import Dashboard from './Dashboard';

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    // Redireciona para login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RoleBasedRoute = ({ user, darkMode, toggleDarkMode, onLogout }) => {
  if (!user) return <Navigate to="/login" replace />;
  
  // Redireciona com base no papel do usuário
  const { role } = user;
  
  switch (role) {
    case 'global_admin':
    case 'school_admin':
      return <DashboardInstitution user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onLogout} />;
    case 'teacher':
      return <DashboardProfessor user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onLogout} />;
    case 'student':
      return <Dashboard user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onLogout} />;
    default:
      return <DashboardUser user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={onLogout} />;
  }
};

const LoginRoute = ({ user, onLogin, darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Se o usuário já estiver logado, redireciona para o dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Função para passar ao componente de login
  const handleLoginSuccess = (userData, accessData) => {
    onLogin(userData, accessData);
    navigate('/dashboard', { replace: true });
  };
  
  return (
    <Login 
      onLogin={handleLoginSuccess} 
      onRegister={() => navigate('/register', { replace: true })} 
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
};

const RegisterRoute = ({ user, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  
  // Se o usuário já estiver logado, redireciona para o dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <RegisterWrapper 
      onRegister={() => navigate('/login', { replace: true })} 
      onLogin={() => navigate('/login', { replace: true })}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
};

const RouteHandler = ({ user, darkMode, toggleDarkMode, onLogout, onLogin }) => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <LoginRoute 
            user={user} 
            onLogin={onLogin}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        } 
      />
      <Route 
        path="/register" 
        element={
          <RegisterRoute 
            user={user} 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute user={user}>
            <RoleBasedRoute 
              user={user} 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode} 
              onLogout={onLogout} 
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          <Navigate to="/login" replace />
        } 
      />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

export default RouteHandler;