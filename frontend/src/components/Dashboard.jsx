import React, { useState, useEffect } from 'react';

function Dashboard({ darkMode, toggleDarkMode }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Resolver exercícios de matemática - página 145', subject: 'Matemática', deadline: 'Amanhã', priority: 'Alta', completed: false },
    { id: 2, title: 'Resumo do capítulo 4 - Revolução Industrial', subject: 'História', deadline: 'Sexta-feira', priority: 'Média', completed: false },
    { id: 3, title: 'Preparar slides para apresentação de biologia', subject: 'Biologia', deadline: '25/09', priority: 'Alta', completed: false },
    { id: 4, title: 'Fichamento do capítulo 5', subject: 'Literatura', deadline: '30/09', priority: 'Baixa', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Pomodoro State
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Pomodoro'); // Pomodoro, Short Break, Long Break

  // Flashcards State
  const [decks, setDecks] = useState([
    { id: 1, name: 'História do Brasil', cards: [
      { id: 1, front: 'Ano do Descobrimento do Brasil', back: '1500', flipped: false },
      { id: 2, front: 'Primeiro presidente do Brasil', back: 'Deodoro da Fonseca', flipped: false },
    ]},
    { id: 2, name: 'Fórmulas de Física', cards: [
      { id: 1, front: 'Segunda Lei de Newton', back: 'F = ma', flipped: false },
      { id: 2, front: 'Velocidade Média', back: 'Vm = Δs / Δt', flipped: false },
    ]},
  ]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask,
      subject: 'Nova Disciplina',
      deadline: 'Sem prazo',
      priority: 'Média',
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      // Handle session end
      setIsActive(false);
      // You can add notifications or auto-start the next session here
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    // Reset time based on session type
    if (sessionType === 'Pomodoro') {
      setTime(25 * 60);
    } else if (sessionType === 'Short Break') {
      setTime(5 * 60);
    } else {
      setTime(15 * 60);
    }
  };

  const selectSession = (type) => {
    setSessionType(type);
    setIsActive(false);
    if (type === 'Pomodoro') {
      setTime(25 * 60);
    } else if (type === 'Short Break') {
      setTime(5 * 60);
    } else {
      setTime(15 * 60);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Flashcard Logic
  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
  };

  const flipCard = (cardId) => {
    const updatedDecks = decks.map(deck => {
      if (deck.id === selectedDeck.id) {
        return {
          ...deck,
          cards: deck.cards.map(card => 
            card.id === cardId ? { ...card, flipped: !card.flipped } : card
          )
        };
      }
      return deck;
    });
    setDecks(updatedDecks);

    // Also update the selectedDeck state to reflect the change immediately
    const updatedSelectedDeck = updatedDecks.find(deck => deck.id === selectedDeck.id);
    setSelectedDeck(updatedSelectedDeck);
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
    'dashboard': 'Dashboard',
    'tasks': 'Tarefas',
    'pomodoro': 'Pomodoro',
    'flashcards': 'Flashcards',
    'stats': 'Estatísticas',
    'settings': 'Configurações',
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
            <i className="fas fa-tachometer-alt"></i><span>Dashboard</span>
          </div>
          <div className={`menu-item ${activeScreen === 'tasks' ? 'active' : ''}`} onClick={() => showScreen('tasks')}>
            <i className="fas fa-tasks"></i><span>Tarefas</span>
          </div>
          <div className={`menu-item ${activeScreen === 'pomodoro' ? 'active' : ''}`} onClick={() => showScreen('pomodoro')}>
            <i className="fas fa-clock"></i><span>Pomodoro</span>
          </div>
          <div className={`menu-item ${activeScreen === 'flashcards' ? 'active' : ''}`} onClick={() => showScreen('flashcards')}>
            <i className="fas fa-layer-group"></i><span>Flashcards</span>
          </div>
          <div className={`menu-item ${activeScreen === 'stats' ? 'active' : ''}`} onClick={() => showScreen('stats')}>
            <i className="fas fa-chart-bar"></i><span>Estatísticas</span>
          </div>
        </div>
        <div className="profile" onClick={openProfileModal}>
          <div className="profile-img-container">
            <img src="https://i.pravatar.cc/40" alt="User" className="profile-img" />
            <button className="profile-img-upload-btn" title="Alterar foto">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-name">Aluno</div>
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

        {/* Dashboard Screen */}
        <div className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`} id="dashboard">
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
            <h3 className="card-title">Suas próximas tarefas</h3>
            {/* Task list here */}
          </div>
        </div>

        {/* Tasks Screen */}
        <div className={`screen ${activeScreen === 'tasks' ? 'active' : ''}`} id="tasks">
            <div class="card">
                <h3 class="card-title">Gerenciar Tarefas</h3>
                <form onSubmit={handleAddTask} className="add-task-form">
                  <input 
                    type="text" 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Adicionar nova tarefa..." 
                    className="add-task-input"
                  />
                  <button type="submit" className="btn btn-primary">Adicionar</button>
                </form>
                <div className="task-list">
                  {tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                      <input 
                        type="checkbox" 
                        className="task-checkbox" 
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                      />
                      <div className="task-content">
                        <div className="task-title">{task.title}</div>
                        <div className="task-details">
                          Disciplina: {task.subject} • Prazo: {task.deadline} • Prioridade: {task.priority}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteTask(task.id)} className="btn-delete-task">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  ))}
                </div>
            </div>
        </div>

        {/* Pomodoro Screen */}
        <div className={`screen ${activeScreen === 'pomodoro' ? 'active' : ''}`} id="pomodoro">
            <div class="card">
                <div className="session-types">
                  <button onClick={() => selectSession('Pomodoro')} className={`btn-session ${sessionType === 'Pomodoro' ? 'active' : ''}`}>Pomodoro</button>
                  <button onClick={() => selectSession('Short Break')} className={`btn-session ${sessionType === 'Short Break' ? 'active' : ''}`}>Pausa Curta</button>
                  <button onClick={() => selectSession('Long Break')} className={`btn-session ${sessionType === 'Long Break' ? 'active' : ''}`}>Pausa Longa</button>
                </div>
                <div className="timer">
                  <div className="timer-time">{formatTime(time)}</div>
                  <div className="timer-label">{sessionType}</div>
                </div>
                <div className="timer-controls">
                  <button onClick={toggleTimer} className="btn btn-primary">
                    {isActive ? 'Pausar' : 'Iniciar'}
                  </button>
                  <button onClick={resetTimer} className="btn btn-secondary">
                    Resetar
                  </button>
                </div>
            </div>
        </div>

        {/* Flashcards Screen */}
        <div className={`screen ${activeScreen === 'flashcards' ? 'active' : ''}`} id="flashcards">
          {selectedDeck ? (
            <div class="card">
              <button onClick={() => setSelectedDeck(null)} className="btn btn-secondary">Voltar aos Decks</button>
              <h3 class="card-title" style={{ marginTop: '20px' }}>{selectedDeck.name}</h3>
              <div className="flashcard-grid">
                {selectedDeck.cards.map(card => (
                  <div key={card.id} className={`flashcard ${card.flipped ? 'flipped' : ''}`} onClick={() => flipCard(card.id)}>
                    <div className="flashcard-inner">
                      <div className="flashcard-front">
                        {card.front}
                      </div>
                      <div className="flashcard-back">
                        {card.back}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div class="card">
              <h3 class="card-title">Seus Decks de Flashcards</h3>
              <div className="deck-list">
                {decks.map(deck => (
                  <div key={deck.id} className="deck-item" onClick={() => handleSelectDeck(deck)}>
                    <h4>{deck.name}</h4>
                    <p>{deck.cards.length} cards</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats Screen */}
        <div className={`screen ${activeScreen === 'stats' ? 'active' : ''}`} id="stats">
            <div class="card">
                <h3 class="card-title">Suas Estatísticas</h3>
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
                <img src="https://i.pravatar.cc/80" alt="User" className="profile-modal-img" />
                <button className="profile-img-upload-btn" title="Alterar foto">
                  <i className="fas fa-camera"></i>
                </button>
              </div>
              <div className="profile-modal-info">
                <h3>Aluno</h3>
                <p>Estudante</p>
                <p>aluno@exemplo.com</p>
              </div>
            </div>
            <div className="profile-modal-details">
              <div>
                <label>Nome Completo</label>
                <span>Aluno</span>
              </div>
              <div>
                <label>Email</label>
                <span>aluno@exemplo.com</span>
              </div>
              <div>
                <label>Tipo de Usuário</label>
                <span>Aluno</span>
              </div>
              <div>
                <label>Data de Registro</label>
                <span>01/09/2023</span>
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

export default Dashboard;
