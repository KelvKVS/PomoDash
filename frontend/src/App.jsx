import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './components/Login.css';
import './components/Dashboard.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to show Login

  // Simulate login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Simulate logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Dashboard />
          <button onClick={handleLogout} className="logout-button">Sair</button>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;