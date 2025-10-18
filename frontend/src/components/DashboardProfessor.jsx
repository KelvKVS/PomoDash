import React, { useState, useEffect } from 'react';

function DashboardProfessor({ user, darkMode, toggleDarkMode, onLogout }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/40');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Gerenciamento de Turmas
  const [classes, setClasses] = useState([
    { id: 1, name: 'Turma A - 8° ano', subject: 'Matemática', students: 25 },
    { id: 2, name: 'Turma B - 7° ano', subject: 'História', students: 22 },
    { id: 3, name: 'Turma C - 9° ano', subject: 'Ciências', students: 20 },
  ]);
  
  // Tarefas para os alunos
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Trabalho de matemática - Capítulo 5', class: 'Turma A - 8° ano', deadline: '15/10', studentsCompleted: 18 },
    { id: 2, title: 'Resumo de história - Revolução Industrial', class: 'Turma B - 7° ano', deadline: '20/10', studentsCompleted: 15 },
    { id: 3, title: 'Experimento de ciências', class: 'Turma C - 9° ano', deadline: '25/10', studentsCompleted: 12 },
  ]);
  
  // Flashcards criados pelo professor
  const [flashcardDecks, setFlashcardDecks] = useState([
    { id: 1, name: 'Formulas Matemáticas', subject: 'Matemática', cards: 25, usedBy: 45 },
    { id: 2, name: 'Datas Históricas Importantes', subject: 'História', cards: 30, usedBy: 37 },
    { id: 3, name: 'Elementos Químicos', subject: 'Ciências', cards: 15, usedBy: 28 },
  ]);
  
  // Estatísticas de Desempenho
  const [performanceData, setPerformanceData] = useState([
    { id: 1, student: 'João Silva', class: 'Turma A', subject: 'Matemática', avg: 8.5 },
    { id: 2, student: 'Maria Santos', class: 'Turma A', subject: 'Matemática', avg: 9.2 },
    { id: 3, student: 'Pedro Oliveira', class: 'Turma B', subject: 'História', avg: 7.8 },
  ]);
  
  // Novos estados para criar tarefas e flashcards
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    class: '',
    deadline: '',
    description: ''
  });
  
  const [newFlashcardDeck, setNewFlashcardDeck] = useState({
    name: '',
    subject: '',
    cards: []
  });

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  // Funções para gerenciar turmas
  const handleCreateClass = (e) => {
    e.preventDefault();
    const newClass = {
      id: classes.length + 1,
      name: e.target.name.value,
      subject: e.target.subject.value,
      students: 0
    };
    setClasses([...classes, newClass]);
    e.target.reset();
  };

  // Funções para gerenciar tarefas
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    
    const newAssignmentObj = {
      id: assignments.length + 1,
      title: newAssignment.title,
      class: newAssignment.class,
      deadline: newAssignment.deadline,
      description: newAssignment.description,
      studentsCompleted: 0
    };
    
    setAssignments([...assignments, newAssignmentObj]);
    setNewAssignment({ title: '', class: '', deadline: '', description: '' });
  };

  // Funções para gerenciar flashcards
  const handleCreateFlashcardDeck = (e) => {
    e.preventDefault();
    
    const newDeck = {
      id: flashcardDecks.length + 1,
      name: newFlashcardDeck.name,
      subject: newFlashcardDeck.subject,
      cards: newFlashcardDeck.cards,
      usedBy: 0
    };
    
    setFlashcardDecks([...flashcardDecks, newDeck]);
    setNewFlashcardDeck({ name: '', subject: '', cards: [] });
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
      // Chama a API para atualizar o perfil
      const response = await authAPI.updateProfile({
        name: profileData.name
      });
      
      // Atualiza o localStorage com os novos dados do usuário
      const updatedUser = { ...user, name: response.data.user.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Atualiza o estado do usuário no componente pai
      // Aqui você pode chamar uma função passada como prop para atualizar o usuário globalmente
      
      setEditProfile(false);
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
    }
  };

  const triggerImageUpload = () => {
    document.getElementById('profile-image-upload').click();
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
    'dashboard': 'Dashboard Professor',
    'classes': 'Minhas Turmas',
    'assignments': 'Tarefas',
    'flashcards': 'Flashcards',
    'performance': 'Desempenho',
    'settings': 'Configurações',
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
          <div className={`menu-item ${activeScreen === 'classes' ? 'active' : ''}`} onClick={() => {showScreen('classes'); setSidebarOpen(false);}}>
            <i className="fas fa-users"></i><span>Turmas</span>
          </div>
          <div className={`menu-item ${activeScreen === 'assignments' ? 'active' : ''}`} onClick={() => {showScreen('assignments'); setSidebarOpen(false);}}>
            <i className="fas fa-tasks"></i><span>Tarefas</span>
          </div>
          <div className={`menu-item ${activeScreen === 'flashcards' ? 'active' : ''}`} onClick={() => {showScreen('flashcards'); setSidebarOpen(false);}}>
            <i className="fas fa-layer-group"></i><span>Flashcards</span>
          </div>
          <div className={`menu-item ${activeScreen === 'performance' ? 'active' : ''}`} onClick={() => {showScreen('performance'); setSidebarOpen(false);}}>
            <i className="fas fa-chart-bar"></i><span>Desempenho</span>
          </div>
        </div>
        
        <div className="profile" onClick={() => {openProfileModal(); setSidebarOpen(false);}}>
          <div className="profile-img-container">
            <img src="https://i.pravatar.cc/40" alt="Professor" className="profile-img" />
            <button className="profile-img-upload-btn" title="Alterar foto">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-name">{user?.name || 'Professor'}</div>
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
        <div className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`} id="dashboard-professor">
          <div className="stats-container">
            <div className="stat-card card">
                <i className="fas fa-users fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{classes.length}</div>
                <div className="stat-label">Turmas</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-tasks fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{assignments.length}</div>
                <div className="stat-label">Tarefas</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-layer-group fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{flashcardDecks.reduce((sum, deck) => sum + deck.cards.length, 0)}</div>
                <div className="stat-label">Flashcards</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-chart-line fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{performanceData.length}</div>
                <div className="stat-label">Alunos monitorados</div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Visão Geral</h3>
            <p>Seja bem-vindo ao painel do professor. Aqui você pode gerenciar suas turmas, criar tarefas para os alunos, desenvolver flashcards e acompanhar o desempenho dos estudantes.</p>
          </div>
        </div>

        {/* Classes Screen */}
        <div className={`screen ${activeScreen === 'classes' ? 'active' : ''}`} id="classes">
          <div className="card">
            <h3 className="card-title">Gerenciar Turmas</h3>
            <form onSubmit={handleCreateClass} className="add-class-form">
              <div className="input-row">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Nome da turma" 
                  className="add-class-input"
                  required
                />
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Disciplina" 
                  className="add-class-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Criar Turma</button>
            </form>
            
            <div className="class-list">
              {classes.map(cls => (
                <div key={cls.id} className="class-item">
                  <div className="class-content">
                    <div className="class-title">{cls.name}</div>
                    <div className="class-details">
                      Disciplina: {cls.subject} • Alunos: {cls.students}
                    </div>
                  </div>
                  <button className="btn-view-class">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assignments Screen */}
        <div className={`screen ${activeScreen === 'assignments' ? 'active' : ''}`} id="assignments">
          <div className="card">
            <h3 className="card-title">Gerenciar Tarefas</h3>
            <form onSubmit={handleCreateAssignment} className="add-assignment-form">
              <div className="input-row">
                <input 
                  type="text" 
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="Título da tarefa" 
                  className="add-assignment-input"
                  required
                />
                <input 
                  type="text" 
                  value={newAssignment.class}
                  onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                  placeholder="Turma" 
                  className="add-assignment-input"
                  required
                />
              </div>
              <div className="input-row">
                <input 
                  type="date" 
                  value={newAssignment.deadline}
                  onChange={(e) => setNewAssignment({...newAssignment, deadline: e.target.value})}
                  className="add-assignment-input"
                  required
                />
                <textarea 
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  placeholder="Descrição da tarefa" 
                  className="add-assignment-textarea"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Criar Tarefa</button>
            </form>
            
            <div className="assignment-list">
              {assignments.map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-content">
                    <div className="assignment-title">{assignment.title}</div>
                    <div className="assignment-details">
                      Turma: {assignment.class} • Prazo: {assignment.deadline} • Concluída por: {assignment.studentsCompleted}/{classes.find(c => c.name === assignment.class)?.students || 0}
                    </div>
                  </div>
                  <button className="btn-view-assignment">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flashcards Screen */}
        <div className={`screen ${activeScreen === 'flashcards' ? 'active' : ''}`} id="flashcards">
          <div className="card">
            <h3 className="card-title">Gerenciar Flashcards</h3>
            <form onSubmit={handleCreateFlashcardDeck} className="add-flashcard-form">
              <div className="input-row">
                <input 
                  type="text" 
                  value={newFlashcardDeck.name}
                  onChange={(e) => setNewFlashcardDeck({...newFlashcardDeck, name: e.target.value})}
                  placeholder="Nome do deck" 
                  className="add-flashcard-input"
                  required
                />
                <input 
                  type="text" 
                  value={newFlashcardDeck.subject}
                  onChange={(e) => setNewFlashcardDeck({...newFlashcardDeck, subject: e.target.value})}
                  placeholder="Disciplina" 
                  className="add-flashcard-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Criar Deck</button>
            </form>
            
            <div className="flashcard-deck-list">
              {flashcardDecks.map(deck => (
                <div key={deck.id} className="flashcard-deck-item">
                  <div className="flashcard-deck-content">
                    <div className="flashcard-deck-title">{deck.name}</div>
                    <div className="flashcard-deck-details">
                      Disciplina: {deck.subject} • Cards: {deck.cards.length} • Usado por: {deck.usedBy} alunos
                    </div>
                  </div>
                  <button className="btn-view-flashcard">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Screen */}
        <div className={`screen ${activeScreen === 'performance' ? 'active' : ''}`} id="performance">
          <div className="card">
            <h3 className="card-title">Desempenho dos Alunos</h3>
            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>Aluno</th>
                    <th>Turma</th>
                    <th>Disciplina</th>
                    <th>Média</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map(student => (
                    <tr key={student.id}>
                      <td>{student.student}</td>
                      <td>{student.class}</td>
                      <td>{student.subject}</td>
                      <td>{student.avg.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <img src={profileImage} alt="Professor" className="profile-modal-img" />
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
                {editProfile ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="profile-name-input"
                  />
                ) : (
                  <h3>{user?.name || 'Professor'}</h3>
                )}
                <p>{user?.roleDescription || 'Professor'}</p>
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
                  <span>{user?.name || 'Professor'}</span>
                )}
              </div>
              <div>
                <label>Email</label>
                <span>{user?.email || 'email@exemplo.com'}</span>
              </div>
              <div>
                <label>Tipo de Usuário</label>
                <span>{user?.roleDescription || 'Professor'}</span>
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
    </div>
  );
}

export default DashboardProfessor;