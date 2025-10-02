import React, { useState, useEffect } from 'react';

function DashboardUser({ darkMode, toggleDarkMode }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Informações do Perfil do Usuário
  const [profile, setProfile] = useState({
    name: 'Kelvin K',
    email: 'kelvin@exemplo.com',
    role: 'Criador',
    institution: 'PomoDash',
    joinDate: '01/09/2023',
    lastLogin: 'Hoje'
  });
  
  // Minhas Estatísticas
  const [stats, setStats] = useState({
    totalLogins: 156,
    totalTime: '120h 30m',
    completedTasks: 245,
    averagePerformance: 92
  });
  
  // Minhas Atividades Recentes
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Atualizou configurações da instituição', time: '2 min atrás', type: 'config' },
    { id: 2, action: 'Adicionou novo professor à escola', time: '1 hora atrás', type: 'admin' },
    { id: 3, action: 'Visualizou relatórios mensais', time: '3 horas atrás', type: 'view' },
    { id: 4, action: 'Enviou notificação para professores', time: '1 dia atrás', type: 'notification' },
  ]);
  
  // Configurações do Sistema
  const [systemSettings, setSystemSettings] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true,
    privacyMode: false
  });
  
  // Segurança e Acesso
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    lastPasswordChange: '15/08/2024',
    loginAttempts: 0,
    trustedDevices: 3
  });
  
  // Gerenciamento Multi-tenant
  const [tenants, setTenants] = useState([
    { id: 1, name: 'Escola Estadual São Paulo', status: 'Ativo', users: 320, lastAccess: 'Hoje' },
    { id: 2, name: 'Colégio Municipal Rio de Janeiro', status: 'Ativo', users: 215, lastAccess: 'Ontem' },
    { id: 3, name: 'Centro Educacional Belo Horizonte', status: 'Inativo', users: 142, lastAccess: '3 dias atrás' },
  ]);

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  // Atualizar configurações do sistema
  const updateSetting = (setting, value) => {
    setSystemSettings({
      ...systemSettings,
      [setting]: value
    });
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  useEffect(() => {
    // Font Awesome for icons
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const pageTitles = {
    'dashboard': 'Minha Área',
    'profile': 'Meu Perfil',
    'activities': 'Atividades Recentes',
    'settings': 'Configurações',
    'security': 'Segurança',
    'tenants': 'Instituições'
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>Pomo<span>dash</span></h1>
        </div>
        <div className="menu">
          <div className={`menu-item ${activeScreen === 'dashboard' ? 'active' : ''}`} onClick={() => showScreen('dashboard')}>
            <i className="fas fa-home"></i><span>Minha Área</span>
          </div>
          <div className={`menu-item ${activeScreen === 'tenants' ? 'active' : ''}`} onClick={() => showScreen('tenants')}>
            <i className="fas fa-building"></i><span>Instituições</span>
          </div>
          <div className={`menu-item ${activeScreen === 'profile' ? 'active' : ''}`} onClick={() => showScreen('profile')}>
            <i className="fas fa-user"></i><span>Meu Perfil</span>
          </div>
          <div className={`menu-item ${activeScreen === 'activities' ? 'active' : ''}`} onClick={() => showScreen('activities')}>
            <i className="fas fa-history"></i><span>Atividades</span>
          </div>
          <div className={`menu-item ${activeScreen === 'settings' ? 'active' : ''}`} onClick={() => showScreen('settings')}>
            <i className="fas fa-cog"></i><span>Configurações</span>
          </div>
          <div className={`menu-item ${activeScreen === 'security' ? 'active' : ''}`} onClick={() => showScreen('security')}>
            <i className="fas fa-shield-alt"></i><span>Segurança</span>
          </div>
        </div>
        <div className="profile" onClick={openProfileModal}>
          <div className="profile-img-container">
            <img src="https://i.pravatar.cc/40" alt="Usuário" className="profile-img" />
            <button className="profile-img-upload-btn" title="Alterar foto">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-name">{profile.name}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h2 className="page-title" id="page-title">{pageTitles[activeScreen]}</h2>
          <div className="user-actions">
            <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo escuro">
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <div className="notification-btn">
              <i className="fas fa-bell"></i>
            </div>
            <div className="user-menu">
              <i className="fas fa-user-circle"></i>
            </div>
          </div>
        </div>

        {/* Dashboard Screen - Minha Área */}
        <div className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`} id="dashboard-user">
          <div className="stats-container">
            <div className="stat-card card">
                <i className="fas fa-building fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{tenants.length}</div>
                <div className="stat-label">Instituições</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-users fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{tenants.reduce((sum, tenant) => sum + tenant.users, 0)}</div>
                <div className="stat-label">Usuários Totais</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-sign-in-alt fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{stats.totalLogins}</div>
                <div className="stat-label">Acessos</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-chart-line fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{stats.averagePerformance}%</div>
                <div className="stat-label">Performance</div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="card-title">Visão Geral do Sistema</h3>
            <p>Seja bem-vindo à sua área como criador do sistema. Aqui você pode gerenciar todas as instituições e supervisar todo o sistema.</p>
          </div>
          
          <div className="card">
            <h3 className="card-title">Atividades Recentes</h3>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'config' && <i className="fas fa-cog"></i>}
                    {activity.type === 'admin' && <i className="fas fa-user-shield"></i>}
                    {activity.type === 'view' && <i className="fas fa-eye"></i>}
                    {activity.type === 'notification' && <i className="fas fa-bell"></i>}
                  </div>
                  <div className="activity-content">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tenants Screen - Gerenciamento Multi-tenant */}
        <div className={`screen ${activeScreen === 'tenants' ? 'active' : ''}`} id="tenants">
          <div className="card">
            <h3 className="card-title">Gerenciamento de Instituições</h3>
            <div className="tenant-list">
              {tenants.map(tenant => (
                <div key={tenant.id} className="tenant-item">
                  <div className="tenant-content">
                    <div className="tenant-name">{tenant.name}</div>
                    <div className="tenant-details">
                      Status: <span className={tenant.status === 'Ativo' ? 'status-active' : 'status-inactive'}>{tenant.status}</span> • 
                      Usuários: {tenant.users} • 
                      Último Acesso: {tenant.lastAccess}
                    </div>
                  </div>
                  <div className="tenant-actions">
                    <button className="btn-view-tenant">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn-edit-tenant">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-delete-tenant">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary">Adicionar Nova Instituição</button>
          </div>
        </div>

        {/* Profile Screen */}
        <div className={`screen ${activeScreen === 'profile' ? 'active' : ''}`} id="profile">
          <div className="card">
            <h3 className="card-title">Informações do Perfil</h3>
            <div className="profile-info">
              <div className="profile-picture">
                <img src="https://i.pravatar.cc/150" alt="Foto do Perfil" className="profile-img-large" />
                <button className="btn-change-photo">Alterar Foto</button>
              </div>
              <div className="profile-details">
                <div className="detail-row">
                  <label>Nome:</label>
                  <span>{profile.name}</span>
                </div>
                <div className="detail-row">
                  <label>Email:</label>
                  <span>{profile.email}</span>
                </div>
                <div className="detail-row">
                  <label>Cargo:</label>
                  <span>{profile.role}</span>
                </div>
                <div className="detail-row">
                  <label>Instituição:</label>
                  <span>{profile.institution}</span>
                </div>
                <div className="detail-row">
                  <label>Data de Cadastro:</label>
                  <span>{profile.joinDate}</span>
                </div>
                <div className="detail-row">
                  <label>Último Acesso:</label>
                  <span>{profile.lastLogin}</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">Editar Perfil</button>
          </div>
        </div>

        {/* Activities Screen */}
        <div className={`screen ${activeScreen === 'activities' ? 'active' : ''}`} id="activities">
          <div className="card">
            <h3 className="card-title">Histórico de Atividades</h3>
            <div className="activity-list-full">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item-full">
                  <div className="activity-icon-full">
                    {activity.type === 'config' && <i className="fas fa-cog fa-lg"></i>}
                    {activity.type === 'admin' && <i className="fas fa-user-shield fa-lg"></i>}
                    {activity.type === 'view' && <i className="fas fa-eye fa-lg"></i>}
                    {activity.type === 'notification' && <i className="fas fa-bell fa-lg"></i>}
                  </div>
                  <div className="activity-content-full">
                    <div className="activity-action-full">{activity.action}</div>
                    <div className="activity-time-full">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Screen */}
        <div className={`screen ${activeScreen === 'settings' ? 'active' : ''}`} id="settings">
          <div className="card">
            <h3 className="card-title">Configurações do Sistema</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-bell"></i>
                  <span>Notificações</span>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={systemSettings.notifications}
                      onChange={(e) => updateSetting('notifications', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-moon"></i>
                  <span>Modo Escuro</span>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={systemSettings.darkMode}
                      onChange={(e) => updateSetting('darkMode', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-database"></i>
                  <span>Backup Automático</span>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={systemSettings.autoBackup}
                      onChange={(e) => updateSetting('autoBackup', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-label">
                  <i className="fas fa-user-secret"></i>
                  <span>Modo Privacidade</span>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={systemSettings.privacyMode}
                      onChange={(e) => updateSetting('privacyMode', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Screen */}
        <div className={`screen ${activeScreen === 'security' ? 'active' : ''}`} id="security">
          <div className="card">
            <h3 className="card-title">Segurança da Conta</h3>
            <div className="security-info">
              <div className="security-detail">
                <label>Autenticação de Dois Fatores:</label>
                <span className={security.twoFactorAuth ? 'security-enabled' : 'security-disabled'}>
                  {security.twoFactorAuth ? 'Ativada' : 'Desativada'}
                </span>
              </div>
              <div className="security-detail">
                <label>Última Alteração de Senha:</label>
                <span>{security.lastPasswordChange}</span>
              </div>
              <div className="security-detail">
                <label>Tentativas de Login Recentes:</label>
                <span>{security.loginAttempts}</span>
              </div>
              <div className="security-detail">
                <label>Dispositivos Confiáveis:</label>
                <span>{security.trustedDevices}</span>
              </div>
            </div>
            <div className="security-actions">
              <button className="btn btn-primary">Alterar Senha</button>
              <button className="btn btn-secondary">Gerenciar Dispositivos</button>
              <button className="btn btn-secondary">Gerar Backup</button>
            </div>
          </div>
        </div>

      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="profile-modal" onClick={closeProfileModal}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeProfileModal}>&times;</button>
            <div className="profile-modal-header">
              <div className="profile-modal-img-container">
                <img src="https://i.pravatar.cc/80" alt="Usuário" className="profile-modal-img" />
                <button className="profile-img-upload-btn" title="Alterar foto">
                  <i className="fas fa-camera"></i>
                </button>
              </div>
              <div className="profile-modal-info">
                <h3>{profile.name}</h3>
                <p>{profile.role}</p>
                <p>{profile.email}</p>
              </div>
            </div>
            <div className="profile-modal-details">
              <div>
                <label>Nome Completo</label>
                <span>{profile.name}</span>
              </div>
              <div>
                <label>Email</label>
                <span>{profile.email}</span>
              </div>
              <div>
                <label>Cargo</label>
                <span>{profile.role}</span>
              </div>
              <div>
                <label>Instituição</label>
                <span>{profile.institution}</span>
              </div>
              <div>
                <label>Data de Cadastro</label>
                <span>{profile.joinDate}</span>
              </div>
            </div>
            <div className="profile-modal-actions">
              <button className="btn btn-secondary" onClick={closeProfileModal}>Cancelar</button>
              <button className="btn btn-primary">Editar Perfil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardUser;