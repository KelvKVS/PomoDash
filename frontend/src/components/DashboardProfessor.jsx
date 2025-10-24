import React, { useState, useEffect } from 'react';
import { authAPI, taskAPI, flashcardAPI, classAPI, userAPI } from '../lib/api';
import CustomAlert from './CustomAlert';
import useFlashcardStats from '../hooks/useFlashcardStats';

function DashboardProfessor({ user, darkMode, toggleDarkMode, onLogout }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  const [profileImage, setProfileImage] = useState(user?.profilePicture || 'https://i.pravatar.cc/40');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Gerenciamento de Turmas
  const [classes, setClasses] = useState([]);
  
  // Tarefas para os alunos
  const [assignments, setAssignments] = useState([]);
  
  // Flashcards criados pelo professor
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  
  // Estatísticas de Desempenho
  const [performanceData, setPerformanceData] = useState([]);
  
  // Estados de carregamento e erro
  const [loading, setLoading] = useState({
    classes: false,
    assignments: false,
    flashcards: false,
    performance: false
  });
  
  const [errors, setErrors] = useState({
    classes: null,
    assignments: null,
    flashcards: null,
    performance: null
  });
  
  // Alert state
  const [alert, setAlert] = useState(null);
  
  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  
  // Flashcard Stats
  const { 
    updateFlashcardStats, 
    getOverallAccuracy, 
    getFlashcardStats,
    stats: flashcardStats 
  } = useFlashcardStats();
  
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

  // Funções para carregar dados
  const loadClasses = async () => {
    setLoading(prev => ({ ...prev, classes: true }));
    setErrors(prev => ({ ...prev, classes: null }));
    
    try {
      const response = await classAPI.getClassesByTeacher(user._id);
      setClasses(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
      setErrors(prev => ({ ...prev, classes: error.message }));
      setAlert({ message: 'Erro ao carregar turmas: ' + error.message, type: 'error' });
    } finally {
      setLoading(prev => ({ ...prev, classes: false }));
    }
  };

  const loadAssignments = async () => {
    setLoading(prev => ({ ...prev, assignments: true }));
    setErrors(prev => ({ ...prev, assignments: null }));
    
    try {
      const response = await taskAPI.getTasksByTeacher(user._id);
      setAssignments(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      setErrors(prev => ({ ...prev, assignments: error.message }));
      setAlert({ message: 'Erro ao carregar tarefas: ' + error.message, type: 'error' });
    } finally {
      setLoading(prev => ({ ...prev, assignments: false }));
    }
  };

  const loadFlashcards = async () => {
    setLoading(prev => ({ ...prev, flashcards: true }));
    setErrors(prev => ({ ...prev, flashcards: null }));
    
    try {
      // Carregar flashcards criados pelo professor (associados ao usuário)
      const response = await flashcardAPI.getFlashcards();
      setFlashcardDecks(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar flashcards:', error);
      setErrors(prev => ({ ...prev, flashcards: error.message }));
      setAlert({ message: 'Erro ao carregar flashcards: ' + error.message, type: 'error' });
    } finally {
      setLoading(prev => ({ ...prev, flashcards: false }));
    }
  };

  const loadPerformanceData = async () => {
    setLoading(prev => ({ ...prev, performance: true }));
    setErrors(prev => ({ ...prev, performance: null }));
    
    try {
      // Carregar tarefas para entender o desempenho dos alunos
      const response = await taskAPI.getTasksByTeacher(user._id);
      setPerformanceData(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados de desempenho:', error);
      // Não definir erro específico pois pode ser normal não ter dados de desempenho
      setPerformanceData([]);
    } finally {
      setLoading(prev => ({ ...prev, performance: false }));
    }
  };

  // Funções para gerenciar turmas
  const handleCreateClass = async (e) => {
    e.preventDefault();
    
    try {
      const classData = {
        name: e.target.name.value,
        subject: e.target.subject.value,
        teacher_id: user._id,
        school_id: user.school_id,
        academic_year: new Date().getFullYear().toString()
      };
      
      const response = await classAPI.createClass(classData);
      setClasses(prev => [...prev, response.data]);
      e.target.reset();
      setAlert({ message: 'Turma criada com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      setAlert({ message: 'Erro ao criar turma: ' + error.message, type: 'error' });
    }
  };

  // Funções para gerenciar tarefas
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    
    try {
      const taskData = {
        title: newAssignment.title,
        subject: newAssignment.subject,
        due_date: newAssignment.deadline,
        description: newAssignment.description,
        created_by: user._id,
        school_id: user.school_id,
        assigned_to: [] // Será atribuído aos alunos posteriormente
      };
      
      const response = await taskAPI.createTask(taskData);
      setAssignments(prev => [...prev, response.data]);
      setNewAssignment({ title: '', class: '', deadline: '', description: '' });
      setAlert({ message: 'Tarefa criada com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      setAlert({ message: 'Erro ao criar tarefa: ' + error.message, type: 'error' });
    }
  };

  // Funções para gerenciar flashcards
  const handleCreateFlashcardDeck = async (e) => {
    e.preventDefault();
    
    if (!newFlashcardDeck.name.trim() || !newFlashcardDeck.subject.trim()) {
      setAlert({ message: 'Por favor, preencha todos os campos obrigatórios', type: 'warning' });
      return;
    }
    
    try {
      // Criar um flashcard com dados do formulário
      const flashcardData = {
        question: newFlashcardDeck.name,
        answer: newFlashcardDeck.subject,
        subject: newFlashcardDeck.subject,
        user_id: user._id,
        school_id: user.school_id,
        tags: [newFlashcardDeck.subject]
      };
      
      const response = await flashcardAPI.createFlashcard(flashcardData);
      setFlashcardDecks(prev => [...prev, response.data]);
      setNewFlashcardDeck({ name: '', subject: '', cards: [] });
      setAlert({ message: 'Flashcard criado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao criar flashcard:', error);
      setAlert({ message: 'Erro ao criar flashcard: ' + error.message, type: 'error' });
    }
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
      const updatedUser = { ...user, name: response.data.user.name, profilePicture: response.data.user.profilePicture || response.data.user.profile?.avatar || user?.profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Atualiza o estado do usuário no componente pai
      // Aqui você pode chamar uma função passada como prop para atualizar o usuário globalmente
      
      setEditProfile(false);
      // Limpa o arquivo de imagem após salvar
      setProfileImageFile(null);
      setAlert({ message: 'Perfil atualizado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setAlert({ message: 'Erro ao atualizar perfil: ' + error.message, type: 'error' });
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
      
      // Armazena o arquivo original para uso durante o salvamento
      setProfileImageFile(file);
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

    // Carregar dados iniciais
    loadClasses();
    loadAssignments();
    loadFlashcards();
    loadPerformanceData();

    return () => {
      document.body.removeChild(script);
    };
  }, [flashcardStats]);

  const pageTitles = {
    'dashboard': 'Dashboard Professor',
    'assignments': 'Tarefas',
    'flashcards': 'Flashcards',
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
            <img src={profileImage} alt="Professor" className="profile-img" />
            <button 
              className="profile-img-upload-btn" 
              title="Alterar foto"
              onClick={triggerImageUpload}
              style={{ display: 'none' }}
            >
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
                <div className="stat-value">{flashcardDecks.length}</div>
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
            
            {loading.classes ? (
              <div className="loading">Carregando turmas...</div>
            ) : errors.classes ? (
              <div className="error">Erro: {errors.classes}</div>
            ) : (
              <div className="class-list">
                {classes.map(cls => (
                  <div key={cls._id || cls.id} className="class-item">
                    <div className="class-content">
                      <div className="class-title">{cls.name}</div>
                      <div className="class-details">
                        Disciplina: {cls.subject} • Alunos: {cls.studentCount || 0}
                      </div>
                    </div>
                    <button className="btn-view-class">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            
            {loading.assignments ? (
              <div className="loading">Carregando tarefas...</div>
            ) : errors.assignments ? (
              <div className="error">Erro: {errors.assignments}</div>
            ) : (
              <div className="assignment-list">
                {assignments.map(assignment => (
                  <div key={assignment._id || assignment.id} className="assignment-item">
                    <div className="assignment-content">
                      <div className="assignment-title">{assignment.title}</div>
                      <div className="assignment-details">
                        Disciplina: {assignment.subject || 'N/A'} • Prazo: {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString('pt-BR') : 'N/A'}
                      </div>
                    </div>
                    <button className="btn-view-assignment">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            
            {loading.flashcards ? (
              <div className="loading">Carregando flashcards...</div>
            ) : errors.flashcards ? (
              <div className="error">Erro: {errors.flashcards}</div>
            ) : (
              <div className="flashcard-deck-list">
                {flashcardDecks.map(deck => (
                  <div key={deck._id || deck.id} className="flashcard-deck-item">
                    <div className="flashcard-deck-content">
                      <div className="flashcard-deck-title">{deck.question || deck.name}</div>
                      <div className="flashcard-deck-details">
                        Disciplina: {deck.subject || deck.tags?.[0] || 'N/A'} • Cards: 1
                      </div>
                    </div>
                    <button className="btn-view-flashcard">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Performance Screen */}
        <div className={`screen ${activeScreen === 'performance' ? 'active' : ''}`} id="performance">
          <div className="card">
            <h3 className="card-title">Desempenho dos Alunos</h3>
            {loading.performance ? (
              <div className="loading">Carregando desempenho...</div>
            ) : errors.performance ? (
              <div className="error">Erro: {errors.performance}</div>
            ) : (
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
                    {performanceData.length > 0 ? (
                      performanceData.map(student => (
                        <tr key={student._id || student.id}>
                          <td>{student.student || student.name}</td>
                          <td>{student.class || 'N/A'}</td>
                          <td>{student.subject || 'N/A'}</td>
                          <td>{student.avg ? student.avg.toFixed(1) : 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Nenhum dado de desempenho disponível.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
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
      
      {/* Alert Component */}
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default DashboardProfessor;