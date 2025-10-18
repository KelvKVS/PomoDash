import React, { useEffect } from 'react';

const CustomAlert = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      case 'info':
      default:
        return 'alert-info';
    }
  };

  return (
    <div className={`custom-alert ${getAlertClass()}`}>
      <div className="alert-content">
        <span className="alert-message">{message}</span>
        <button className="alert-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

// Estilos para o alerta
const styles = document.createElement('style');
styles.innerHTML = `
  .custom-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInRight 0.3s ease, fadeOut 0.5s ease 4.5s forwards;
    overflow: hidden;
  }

  .alert-content {
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
  }

  .alert-message {
    flex: 1;
    font-weight: 500;
  }

  .alert-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
    color: inherit;
    opacity: 0.7;
  }

  .alert-close:hover {
    opacity: 1;
  }

  .alert-success {
    background: linear-gradient(135deg, #4ade80, #22c55e);
    color: white;
  }

  .alert-error {
    background: linear-gradient(135deg, #f87171, #ef4444);
    color: white;
  }

  .alert-warning {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
  }

  .alert-info {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: white;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0%, 90% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;

document.head.appendChild(styles);

export default CustomAlert;