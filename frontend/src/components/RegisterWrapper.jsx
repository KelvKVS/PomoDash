import React from 'react';
import Register from './Register';

function RegisterWrapper({ onRegister, onLogin }) {
  return (
    <div className="register-wrapper">
      <Register onRegister={onRegister} onLogin={onLogin} />
    </div>
  );
}

export default RegisterWrapper;