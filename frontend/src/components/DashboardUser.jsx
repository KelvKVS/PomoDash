import React, { useState, useEffect } from 'react';
import { authAPI, pomodoroAPI, taskAPI, flashcardAPI } from '../lib/api';
import CustomAlert from './CustomAlert';
import CustomConfirm from './CustomConfirm';
import useFlashcardStats from '../hooks/useFlashcardStats';

function DashboardUser({ user, darkMode, toggleDarkMode, onLogout }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  const [profileImage, setProfileImage] = useState(user?.profilePicture || 'https://i.pravatar.cc/40');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Dados para tarefas vindos da API
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    due_date: '',
    priority: 'medium'
  });
  
  // Pomodoro State
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work'); // work, short_break, long_break
  const [activeSession, setActiveSession] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  
  // Flashcards State
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', tags: [] });
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Alert State
  const [alert, setAlert] = useState(null);
  
  // Flashcard Stats
  const { 
    updateFlashcardStats, 
    getOverallAccuracy, 
    getFlashcardStats,
    stats: flashcardStats 
  } = useFlashcardStats();
  
  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  const showConfirmation = (message, callback, type = 'warning') => {
    setConfirmMessage(message);
    setConfirmCallback(() => callback);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (confirmCallback) {
      confirmCallback();
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  // Função para atualizar o estado da tarefa
  const handleNewTaskChange = (field, value) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    try {
      const taskData = {
        title: newTask.title,
        subject: newTask.subject,
        due_date: newTask.due_date || undefined,
        priority: newTask.priority,
        assigned_to: [user._id] // Atribuir a tarefa a si mesmo
      };
      
      await taskAPI.createTask(taskData);
      setNewTask({ title: '', subject: '', due_date: '', priority: 'medium' });
      // Recarregar as tarefas
      loadTasks(); // Atualiza as tarefas
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar tarefa: ' + error.message);
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      await taskAPI.updateTaskStatus(taskId, newStatus);
      // Recarregar as tarefas
      loadTasks(); // Atualiza as tarefas
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
      alert('Erro ao atualizar status da tarefa: ' + error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja arquivar esta tarefa?')) {
      try {
        await taskAPI.archiveTask(taskId);
        // Recarregar as tarefas
        loadTasks(); // Atualiza as tarefas
      } catch (error) {
        console.error('Erro ao arquivar tarefa:', error);
        alert('Erro ao arquivar tarefa: ' + error.message);
      }
    }
  };

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0 && activeSession) {
      // Handle session end - complete the session
      handleCompleteSession();
    }
    return () => clearInterval(interval);
  }, [isActive, time, activeSession]);

  // Função para iniciar uma nova sessão de pomodoro
  const startNewSession = async (type = 'work', plannedDuration = 25) => {
    try {
      const sessionData = {
        type,
        planned_duration: plannedDuration,
      };
      
      const response = await pomodoroAPI.startSession(sessionData);
      setActiveSession(response.data);
      setIsActive(true);
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error);
      alert('Erro ao iniciar sessão de Pomodoro: ' + error.message);
    }
  };

  // Função para pausar a sessão ativa
  const pauseSession = async () => {
    if (activeSession) {
      try {
        await pomodoroAPI.pauseSession(activeSession._id);
        setIsActive(false);
      } catch (error) {
        console.error('Erro ao pausar sessão:', error);
        alert('Erro ao pausar sessão: ' + error.message);
      }
    }
  };

  // Função para retomar a sessão
  const resumeSession = async () => {
    if (activeSession) {
      try {
        await pomodoroAPI.resumeSession(activeSession._id);
        setIsActive(true);
      } catch (error) {
        console.error('Erro ao retomar sessão:', error);
        alert('Erro ao retomar sessão: ' + error.message);
      }
    }
  };

  // Função para completar a sessão
  const handleCompleteSession = async () => {
    if (activeSession) {
      try {
        const response = await pomodoroAPI.completeSession(activeSession._id);
        setActiveSession(null);
        setIsActive(false);
        loadRecentSessions(); // Atualizar lista de sessões recentes
      } catch (error) {
        console.error('Erro ao completar sessão:', error);
        alert('Erro ao completar sessão: ' + error.message);
      }
    }
  };

  // Função para abandonar a sessão
  const abandonSession = async () => {
    if (activeSession) {
      try {
        await pomodoroAPI.abandonSession(activeSession._id);
        setActiveSession(null);
        setIsActive(false);
        loadRecentSessions(); // Atualizar lista de sessões recentes
      } catch (error) {
        console.error('Erro ao abandonar sessão:', error);
        alert('Erro ao abandonar sessão: ' + error.message);
      }
    }
  };

  const toggleTimer = async () => {
    if (!activeSession) {
      // Iniciar nova sessão se não houver uma ativa
      let type, duration;
      switch (sessionType) {
        case 'Pomodoro':
          type = 'work';
          duration = 25;
          break;
        case 'Short Break':
          type = 'short_break';
          duration = 5;
          break;
        case 'Long Break':
          type = 'long_break';
          duration = 15;
          break;
        default:
          type = 'work';
          duration = 25;
      }
      await startNewSession(type, duration);
    } else if (isActive) {
      await pauseSession();
    } else {
      await resumeSession();
    }
  };

  const resetTimer = async () => {
    if (activeSession) {
      await abandonSession();
    }
    setIsActive(false);
    // Reset time based on session type
    if (sessionType === 'Pomodoro' || sessionType === 'work') {
      setTime(25 * 60);
    } else if (sessionType === 'Short Break' || sessionType === 'short_break') {
      setTime(5 * 60);
    } else {
      setTime(15 * 60);
    }
  };

  const selectSession = async (type) => {
    // Se houver uma sessão ativa, perguntar se deseja abandoná-la
    if (activeSession) {
      showConfirmation(
        'Você tem uma sessão em andamento. Deseja abandoná-la e começar uma nova?',
        async () => {
          await abandonSession();
          setSessionType(type);
          setIsActive(false);
          if (type === 'Pomodoro' || type === 'work') {
            setTime(25 * 60);
          } else if (type === 'Short Break' || type === 'short_break') {
            setTime(5 * 60);
          } else {
            setTime(15 * 60);
          }
        },
        'warning'
      );
    } else {
      setSessionType(type);
      setIsActive(false);
      if (type === 'Pomodoro' || type === 'work') {
        setTime(25 * 60);
      } else if (type === 'Short Break' || type === 'short_break') {
        setTime(5 * 60);
      } else {
        setTime(15 * 60);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Função para carregar flashcards
  const loadFlashcards = async () => {
    try {
      const response = await flashcardAPI.getFlashcards();
      const flashcardsWithStats = response.data.map(card => ({
        ...card,
        stats: getFlashcardStats(card._id)
      }));
      setFlashcards(flashcardsWithStats || []);
    } catch (error) {
      console.error('Erro ao carregar flashcards:', error);
    }
  };

  // Função para criar novo flashcard
  const handleCreateFlashcard = async (e) => {
    e.preventDefault();
    if (!newFlashcard.question.trim() || !newFlashcard.answer.trim()) {
      alert('Pergunta e resposta são obrigatórias');
      return;
    }

    try {
      const response = await flashcardAPI.createFlashcard(newFlashcard);
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard({ question: '', answer: '', tags: [] });
    } catch (error) {
      console.error('Erro ao criar flashcard:', error);
      alert('Erro ao criar flashcard: ' + error.message);
    }
  };

  // Função para atualizar flashcard
  const handleUpdateFlashcard = async (id, updatedData) => {
    try {
      const response = await flashcardAPI.updateFlashcard(id, updatedData);
      setFlashcards(flashcards.map(card => card._id === id ? response.data : card));
    } catch (error) {
      console.error('Erro ao atualizar flashcard:', error);
      alert('Erro ao atualizar flashcard: ' + error.message);
    }
  };

  // Função para deletar flashcard
  const handleDeleteFlashcard = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este flashcard?')) {
      try {
        await flashcardAPI.deleteFlashcard(id);
        setFlashcards(flashcards.filter(card => card._id !== id));
      } catch (error) {
        console.error('Erro ao deletar flashcard:', error);
        alert('Erro ao deletar flashcard: ' + error.message);
      }
    }
  };

  // Função para alternar a visibilidade do flashcard
  const flipCard = (cardId) => {
    // Mostrar a resposta e permitir que o usuário indique se acertou ou não
    if (selectedCard === cardId) {
      // Se o card já está selecionado, perguntar ao usuário se acertou
      const isCorrect = window.confirm('Você acertou este flashcard? Clique em "OK" se sim, "Cancelar" se não.');
      updateFlashcardStats(cardId, isCorrect);
    }
    setSelectedCard(prev => prev === cardId ? null : cardId);
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setEditProfile(false);
  };

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Verifica se temos um arquivo de imagem para upload
      const file = profileImageFile;
      
      let response;
      if (file) {
        // Se houver um arquivo de imagem, usamos FormData para upload
        const formData = new FormData();
        formData.append('name', profileData.name);
        formData.append('profilePicture', file);
        
        response = await authAPI.updateProfile(formData);
      } else {
        // Caso contrário, envia apenas os dados textuais
        response = await authAPI.updateProfile({
          name: profileData.name
        });
      }
      
      // Atualiza o localStorage com os novos dados do usuário
      const updatedUser = { ...user, name: response.data.user.name, profilePicture: response.data.user.profilePicture || user?.profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Atualiza o estado do usuário no componente pai
      // Aqui você pode chamar uma função passada como prop para atualizar o usuário globalmente
      
      setEditProfile(false);
      // Limpa o arquivo de imagem após salvar
      setProfileImageFile(null);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil: ' + error.message);
    }
  };

  const handleCancelEdit = () => {
    // Reverter para os dados originais
    setProfileData({
      name: user?.name || '',
    });
    setProfileImage(user?.profilePicture || 'https://i.pravatar.cc/40');
    setProfileImageFile(null);
    setEditProfile(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Armazena o arquivo original para uso durante o salvamento
      setProfileImageFile(file);
    }
  };

  const triggerImageUpload = () => {
    document.getElementById('profile-image-upload').click();
  };

  // Função para carregar sessões recentes
  const loadRecentSessions = async () => {
    try {
      const response = await pomodoroAPI.getSessions({ limit: 5 });
      setRecentSessions(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar sessões recentes:', error);
    }
  };

  // Função para carregar sessão ativa
  const loadActiveSession = async () => {
    try {
      const response = await pomodoroAPI.getActiveSession();
      if (response.data) {
        setActiveSession(response.data);
        // Atualizar o tempo restante com base na sessão ativa
        const now = new Date();
        const startedAt = new Date(response.data.timing.started_at);
        const elapsed = Math.floor((now - startedAt) / 1000); // tempo decorrido em segundos
        const plannedDurationSec = response.data.settings.planned_duration * 60; // duração planejada em segundos
        const remaining = Math.max(0, plannedDurationSec - elapsed);
        setTime(remaining);
        setIsActive(true);
      }
    } catch (error) {
      // Se não houver sessão ativa, é normal - não faz nada
      if (!error.message.includes('Nenhuma sessão ativa')) {
        console.error('Erro ao carregar sessão ativa:', error);
      }
    }
  };

  // Função para carregar as tarefas
  const loadTasks = async () => {
    try {
      const response = await taskAPI.getTasks({ status: 'pending' });
      setTasks(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  useEffect(() => {
    // Font Awesome for icons
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    // Carregar dados iniciais quando o componente montar
    loadActiveSession();
    loadRecentSessions();
    loadTasks();
    loadFlashcards();

    return () => {
      document.body.removeChild(script);
    };
  }, [flashcardStats]); // Adicionando flashcardStats como dependência para atualizar quando mudar

  const pageTitles = {
    'dashboard': 'Dashboard Geral',
    'tasks': 'Minhas Tarefas',
    'pomodoro': 'Pomodoro',
    'flashcards': 'Meus Flashcards',
    'reports': 'Relatórios',
    'settings': 'Configurações',
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <h1>Pomo<span>dash</span></h1>
        </div>
        <div className="menu">
          <div className={`menu-item ${activeScreen === 'dashboard' ? 'active' : ''}`} onClick={() => {showScreen('dashboard'); setSidebarOpen(false);}}>
            <i className="fas fa-tachometer-alt"></i><span>Dashboard</span>
          </div>
          <div className={`menu-item ${activeScreen === 'tasks' ? 'active' : ''}`} onClick={() => {showScreen('tasks'); setSidebarOpen(false);}}>
            <i className="fas fa-tasks"></i><span>Tarefas</span>
          </div>
          <div className={`menu-item ${activeScreen === 'pomodoro' ? 'active' : ''}`} onClick={() => {showScreen('pomodoro'); setSidebarOpen(false);}}>
            <i className="fas fa-clock"></i><span>Pomodoro</span>
          </div>
          <div className={`menu-item ${activeScreen === 'flashcards' ? 'active' : ''}`} onClick={() => {showScreen('flashcards'); setSidebarOpen(false);}}>
            <i className="fas fa-layer-group"></i><span>Flashcards</span>
          </div>
          <div className={`menu-item ${activeScreen === 'reports' ? 'active' : ''}`} onClick={() => {showScreen('reports'); setSidebarOpen(false);}}>
            <i className="fas fa-chart-bar"></i><span>Relatórios</span>
          </div>
        </div>
        <div className="profile" onClick={() => {openProfileModal(); setSidebarOpen(false);}}>
          <div className="profile-img-container">
            <img src={profileImage} alt="Usuário" className="profile-img" />
            <button 
              className="profile-img-upload-btn" 
              title="Alterar foto"
              onClick={triggerImageUpload}
              style={{ display: 'none' }}
            >
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-name">{user?.name || 'Usuário'}</div>
        </div>
      </div>

      {/* Overlay para fechar sidebar em dispositivos móveis */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
            <h2 className="page-title" id="page-title">{pageTitles[activeScreen]}</h2>
          </div>
        </div>

        {/* Dashboard Screen */}
        <div className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`} id="dashboard-user">
          <div className="stats-container">
            <div className="stat-card card">
                <i className="fas fa-clock fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">4h 32m</div>
                <div className="stat-label">Tempo de foco hoje</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-check-circle fa-2x" style={{ color: 'var(--secondary-color)' }}></i>
                <div className="stat-value">5/8</div>
                <div className="stat-label">Tarefas concluídas</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-brain fa-2x" style={{ color: '#FFC107' }}></i>
                <div className="stat-value">82%</div>
                <div className="stat-label">Flashcards memorizados</div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Visão Geral</h3>
            <p>Seja bem-vindo ao seu dashboard pessoal. Aqui você pode gerenciar suas tarefas, usar o temporizador Pomodoro para aumentar sua produtividade e estudar com flashcards.</p>
          </div>
        </div>

        {/* Tasks Screen */}
        <div className={`screen ${activeScreen === 'tasks' ? 'active' : ''}`} id="tasks">
            <div className="card">
                <h3 className="card-title">Gerenciar Tarefas</h3>
                <form onSubmit={handleAddTask} className="add-task-form">
                  <div className="input-group">
                    <input 
                      type="text" 
                      value={newTask.title}
                      onChange={(e) => handleNewTaskChange('title', e.target.value)}
                      placeholder="Título da tarefa" 
                      className="add-task-input"
                      required
                    />
                  </div>
                  <div className="input-row">
                    <input 
                      type="text" 
                      value={newTask.subject}
                      onChange={(e) => handleNewTaskChange('subject', e.target.value)}
                      placeholder="Disciplina" 
                      className="add-task-input"
                    />
                    <input 
                      type="date" 
                      value={newTask.due_date}
                      onChange={(e) => handleNewTaskChange('due_date', e.target.value)}
                      className="add-task-input"
                    />
                  </div>
                  <div className="input-row">
                    <select 
                      value={newTask.priority}
                      onChange={(e) => handleNewTaskChange('priority', e.target.value)}
                      className="add-task-input"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Adicionar Tarefa</button>
                  </div>
                </form>
                <div className="task-list">
                  {tasks && tasks.length > 0 ? (
                    tasks.map(task => {
                      const assignment = task.assigned_to?.find(a => a.user.toString() === user._id.toString());
                      const status = assignment ? assignment.status : 'pending';
                      
                      return (
                        <div key={task._id} className={`task-item ${status === 'completed' ? 'completed' : ''}`}>
                          <input 
                            type="checkbox" 
                            className="task-checkbox" 
                            checked={status === 'completed'}
                            onChange={() => toggleTaskCompletion(task._id, status)}
                          />
                          <div className="task-content">
                            <div className="task-title">{task.title}</div>
                            <div className="task-details">
                              Disciplina: {task.subject || 'N/A'} • Prazo: {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'Sem prazo'} • Prioridade: {task.priority}
                            </div>
                          </div>
                          <button onClick={() => handleDeleteTask(task._id)} className="btn-delete-task">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      )
                    })
                  ) : (
                    <p>Você não tem tarefas no momento.</p>
                  )}
                </div>
            </div>
        </div>

        {/* Pomodoro Screen */}
        <div className={`screen ${activeScreen === 'pomodoro' ? 'active' : ''}`} id="pomodoro">
            <div className="card">
                <div className="session-types">
                  <button onClick={() => selectSession('Pomodoro')} className={`btn-session ${sessionType === 'Pomodoro' || sessionType === 'work' ? 'active' : ''}`}>Pomodoro</button>
                  <button onClick={() => selectSession('Short Break')} className={`btn-session ${sessionType === 'Short Break' || sessionType === 'short_break' ? 'active' : ''}`}>Pausa Curta</button>
                  <button onClick={() => selectSession('Long Break')} className={`btn-session ${sessionType === 'Long Break' || sessionType === 'long_break' ? 'active' : ''}`}>Pausa Longa</button>
                </div>
                <div className="timer">
                  <div className="timer-time">{formatTime(time)}</div>
                  <div className="timer-label">{sessionType === 'work' ? 'Pomodoro' : sessionType === 'short_break' ? 'Pausa Curta' : 'Pausa Longa'}</div>
                </div>
                <div className="timer-controls">
                  <button onClick={toggleTimer} className="btn btn-primary">
                    {!activeSession ? 'Iniciar' : isActive ? 'Pausar' : 'Retomar'}
                  </button>
                  <button onClick={resetTimer} className="btn btn-secondary">
                    Resetar
                  </button>
                </div>
                
                {/* Exibir sessões recentes */}
                <div className="recent-sessions">
                  <h4>Sessões Recentes</h4>
                  {recentSessions.length > 0 ? (
                    <div className="session-list">
                      {recentSessions.map(session => (
                        <div key={session._id} className="session-item">
                          <div className="session-info">
                            <div className="session-type">
                              {session.type === 'work' ? 'Pomodoro' : session.type === 'short_break' ? 'Pausa Curta' : 'Pausa Longa'}
                            </div>
                            <div className="session-date">
                              {formatDate(session.timing.started_at)}
                            </div>
                            <div className="session-duration">
                              {Math.round(session.timing.actual_duration / 60)} min
                            </div>
                            <div className={`session-status ${session.status}`}>
                              {session.status === 'completed' ? 'Concluído' : 
                               session.status === 'abandoned' ? 'Abandonado' : 
                               session.status === 'paused' ? 'Pausado' : 
                               session.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Nenhuma sessão registrada ainda.</p>
                  )}
                </div>
            </div>
        </div>

        {/* Flashcards Screen */}
        <div className={`screen ${activeScreen === 'flashcards' ? 'active' : ''}`} id="flashcards">
          <div className="card">
            <h3 className="card-title">Criar Novo Flashcard</h3>
            <form onSubmit={handleCreateFlashcard} className="add-flashcard-form">
              <div className="input-group">
                <input 
                  type="text" 
                  value={newFlashcard.question}
                  onChange={(e) => setNewFlashcard({...newFlashcard, question: e.target.value})}
                  placeholder="Pergunta" 
                  className="add-flashcard-input"
                  required
                />
              </div>
              <div className="input-group">
                <input 
                  type="text" 
                  value={newFlashcard.answer}
                  onChange={(e) => setNewFlashcard({...newFlashcard, answer: e.target.value})}
                  placeholder="Resposta" 
                  className="add-flashcard-input"
                  required
                />
              </div>
              <div className="input-group">
                <input 
                  type="text" 
                  value={newFlashcard.tags.join(', ')}
                  onChange={(e) => setNewFlashcard({...newFlashcard, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                  placeholder="Tags (separadas por vírgula)" 
                  className="add-flashcard-input"
                />
              </div>
              <button type="submit" className="btn btn-primary">Adicionar Flashcard</button>
            </form>
          </div>
          
          <div className="card">
            <h3 className="card-title">Seus Flashcards</h3>
            {flashcards && flashcards.length > 0 ? (
              <div className="flashcard-grid">
                {flashcards.map(card => (
                  <div key={card._id} className={`flashcard ${selectedCard === card._id ? 'flipped' : ''}`} onClick={() => flipCard(card._id)}>
                    <div className="flashcard-inner">
                      <div className="flashcard-front">
                        {card.question}
                      </div>
                      <div className="flashcard-back">
                        {card.answer}
                      </div>
                    </div>
                    {/* Estatísticas do flashcard */}
                    <div className="flashcard-stats">
                      <span className="accuracy-badge" title={`Aproveitamento: ${card.stats?.accuracy || 0}%`}>
                        {card.stats?.accuracy || 0}%
                      </span>
                      <span className="attempts-badge" title={`Tentativas: ${card.stats?.attempts || 0}`}>
                        {card.stats?.attempts || 0}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteFlashcard(card._id); }} 
                      className="btn-delete-flashcard"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Você não tem flashcards criados ainda.</p>
            )}
          </div>
        </div>

        {/* Reports Screen */}
        <div className={`screen ${activeScreen === 'reports' ? 'active' : ''}`} id="reports">
            <div className="card">
                <h3 className="card-title">Meus Relatórios</h3>
                <p>Aqui você pode visualizar seus relatórios de produtividade, tempo de foco e progresso nos estudos.</p>
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
                <img src={profileImage} alt="Usuário" className="profile-modal-img" />
                <button 
                  className="profile-img-upload-btn" 
                  title="Alterar foto"
                  onClick={triggerImageUpload}
                  style={{ display: editProfile ? 'block' : 'none' }}
                >
                  <i className="fas fa-camera"></i>
                </button>
                <input 
                  id="profile-image-upload"
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }} 
                />
              </div>
              <div className="profile-modal-info">
                <div className="profile-name-container">
                  {editProfile ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="profile-name-input"
                    />
                  ) : (
                    <h3>{user?.name || 'Usuário'}</h3>
                  )}
                </div>
                <p>{user?.roleDescription || 'Usuário Geral'}</p>
                <p>{user?.email || 'email@exemplo.com'}</p>
              </div>
            </div>
            <div className="profile-modal-details">
              <div>
                <label>Nome Completo</label>
                {editProfile ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  <span>{user?.name || 'Usuário'}</span>
                )}
              </div>
              <div>
                <label>Email</label>
                <span>{user?.email || 'email@exemplo.com'}</span>
              </div>
              <div>
                <label>Tipo de Usuário</label>
                <span>{user?.roleDescription || 'Usuário Geral'}</span>
              </div>
              <div>
                <label>Instituição</label>
                <span>{user?.school?.name || 'Não informada'}</span>
              </div>
            </div>
            <div className="profile-modal-actions">
              <button 
                onClick={toggleDarkMode} 
                className="theme-toggle-btn" 
                aria-label={darkMode ? "Alternar para modo claro" : "Alternar para modo escuro"}
              >
                {darkMode ? (
                  <><i className="fas fa-sun"></i> Modo Claro</>
                ) : (
                  <><i className="fas fa-moon"></i> Modo Escuro</>
                )}
              </button>
              {editProfile ? (
                <>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>
                  <button className="btn btn-primary" onClick={handleSaveProfile}>Salvar</button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary" onClick={handleEditProfile}>Editar Perfil</button>
                  <button className="btn btn-primary" onClick={onLogout}>Sair</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      {showConfirmModal && (
        <CustomConfirm 
          message={confirmMessage} 
          onConfirm={handleConfirm} 
          onCancel={handleCancel} 
          type="warning" 
        />
      )}
    </div>
  );
}

// Estilos para os novos componentes de flashcard e tarefa e layout aprimorado
const styles = document.createElement('style');
styles.innerHTML = `
  .container-app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    background-color: var(--sidebar-background);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: var(--background);
    width: calc(100% - 260px);
  }

  .add-task-form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .input-row .add-task-input,
  .input-row select {
    flex: 1;
  }

  .task-status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: bold;
  }

  .task-status.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .task-status.in_progress {
    background-color: #cce5ff;
    color: #004085;
  }

  .task-status.completed {
    background-color: #d4edda;
    color: #155724;
  }

  .session-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
  }

  .session-info {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .session-type {
    font-weight: bold;
    color: var(--primary-color);
  }

  .session-status.completed {
    color: var(--success-color);
  }

  .session-status.abandoned {
    color: var(--danger-color);
  }

  .session-status.paused {
    color: var(--warning-color);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .stat-item {
    text-align: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .stat-item h4 {
    margin: 0 0 10px 0;
    color: var(--text-color);
  }

  .stat-item .stat-value {
    font-size: 1.5em;
    font-weight: bold;
    color: var(--primary-color);
    margin: 0;
  }

  .recent-activity {
    margin-top: 20px;
  }

  .recent-activity h4 {
    margin-bottom: 10px;
    color: var(--text-color);
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }

  .flashcard {
    height: 200px;
    perspective: 1000px;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--card-background);
    color: var(--text-color);
  }

  .flashcard-back {
    transform: rotateY(180deg);
  }

  .btn-delete-flashcard {
    position: absolute;
    top: 5px;
    right: 5px;
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    z-index: 10;
  }

  .flashcard-stats {
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    gap: 5px;
    z-index: 5;
  }

  .accuracy-badge, .attempts-badge {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 0.7em;
  }

  .accuracy-badge {
    background: linear-gradient(45deg, #10b981, #34d399);
  }

  .attempts-badge {
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
  }

  @media (max-width: 768px) {
    .container-app {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      height: auto;
      max-height: 300px;
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    .main-content {
      width: 100%;
    }
  }
`;

document.head.appendChild(styles);

export default DashboardUser;