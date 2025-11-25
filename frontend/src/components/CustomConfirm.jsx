import React from 'react';

const CustomConfirm = ({ message, onConfirm, onCancel, type = 'warning' }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'confirm-btn-danger';
      case 'success':
        return 'confirm-btn-success';
      case 'info':
        return 'confirm-btn-info';
      case 'warning':
      default:
        return 'confirm-btn-warning';
    }
  };

  return (
    <div className="confirm-overlay" onClick={handleOverlayClick}>
      <div className="confirm-modal">
        <div className="confirm-content">
          <div className="confirm-icon">
            {type === 'danger' ? (
              <i className="fas fa-exclamation-triangle"></i>
            ) : type === 'success' ? (
              <i className="fas fa-check-circle"></i>
            ) : type === 'info' ? (
              <i className="fas fa-info-circle"></i>
            ) : (
              <i className="fas fa-exclamation-circle"></i>
            )}
          </div>
          <p className="confirm-message">{message}</p>
        </div>
        <div className="confirm-actions">
          <button className="confirm-btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className={`confirm-btn-confirm ${getConfirmButtonClass()}`} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos para o modal de confirmação
const styles = document.createElement('style');
styles.innerHTML = `
  .confirm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }

  .confirm-modal {
    background: var(--card-background);
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
    overflow: hidden;
    animation: modalSlideIn 0.3s ease;
  }

  .confirm-content {
    padding: 25px;
    text-align: center;
  }

  .confirm-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--warning-color);
  }

  .confirm-btn-warning .confirm-icon {
    color: var(--warning-color);
  }
  
  .confirm-btn-danger .confirm-icon {
    color: var(--danger-color);
  }
  
  .confirm-btn-success .confirm-icon {
    color: var(--success-color);
  }
  
  .confirm-btn-info .confirm-icon {
    color: var(--info-color, #3b82f6);
  }

  .confirm-message {
    font-size: 1.1rem;
    color: var(--text-color);
    margin: 0;
    line-height: 1.5;
  }

  .confirm-actions {
    display: flex;
    gap: 10px;
    padding: 15px 25px;
    border-top: 1px solid var(--border-color);
    background-color: var(--card-background-light, rgba(0,0,0,0.03));
  }

  .confirm-btn-cancel,
  .confirm-btn-confirm {
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .confirm-btn-cancel {
    background-color: var(--border-color);
    color: var(--text-color);
  }

  .confirm-btn-cancel:hover {
    background-color: #e2e6ea;
  }

  .confirm-btn-confirm {
    background-color: var(--warning-color);
    color: white;
  }

  .confirm-btn-danger {
    background-color: var(--danger-color) !important;
  }

  .confirm-btn-success {
    background-color: var(--success-color) !important;
  }

  .confirm-btn-info {
    background-color: var(--info-color, #3b82f6) !important;
  }

  .confirm-btn-warning {
    background-color: var(--warning-color) !important;
  }

  .confirm-btn-confirm:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Estilos para tema escuro */
  .dark-theme .confirm-modal {
    background: var(--card-background);
  }

  .dark-theme .confirm-icon {
    color: var(--warning-color);
  }

  .dark-theme .confirm-btn-warning .confirm-icon {
    color: var(--warning-color);
  }

  .dark-theme .confirm-btn-danger .confirm-icon {
    color: var(--danger-color);
  }

  .dark-theme .confirm-btn-success .confirm-icon {
    color: var(--success-color);
  }

  .dark-theme .confirm-btn-info .confirm-icon {
    color: var(--info-color, #3b82f6);
  }

  .dark-theme .confirm-message {
    color: var(--text-color);
  }

  .dark-theme .confirm-actions {
    border-top: 1px solid var(--border-color);
    background-color: var(--card-background-light, rgba(255,255,255,0.05));
  }

  .dark-theme .confirm-btn-cancel {
    background-color: var(--border-color);
    color: var(--text-color);
  }

  .dark-theme .confirm-btn-cancel:hover {
    background-color: #495057;
  }
`;

document.head.appendChild(styles);

export default CustomConfirm;