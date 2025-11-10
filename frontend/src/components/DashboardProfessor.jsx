import React, { useState, useEffect } from 'react';
import { authAPI, taskAPI, flashcardAPI, classAPI, userAPI, performanceAPI } from '../lib/api';
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
    subject: '',
    deadline: '',
    description: '',
    classId: ''
  });
  
  // Estado para alunos da turma selecionada
  const [classStudents, setClassStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  
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
  
  // Função para carregar dados de desempenho mais detalhados
  const loadDetailedPerformanceData = async () => {
    setLoading(prev => ({ ...prev, performance: true }));
    setErrors(prev => ({ ...prev, performance: null }));
    
    try {
      // Carregar tarefas e obter informações detalhadas de desempenho
      const tasksResponse = await taskAPI.getTasksByTeacher(user._id);
      const tasks = tasksResponse.data || [];
      
      // Carregar alunos de todas as turmas para correlacionar
      const performanceWithDetails = [];
      
      for (const task of tasks) {
        if (task.assigned_to && task.assigned_to.length > 0) {
          for (const assignment of task.assigned_to) {
            performanceWithDetails.push({
              ...task,
              student_id: assignment.user,
              student_name: assignment.user_name || 'Aluno',
              assignment_status: assignment.status,
              assigned_at: assignment.assigned_at,
              completed_at: assignment.completed_at
            });
          }
        } else {
          performanceWithDetails.push({
            ...task,
            student_name: 'Não atribuído',
            assignment_status: 'pending'
          });
        }
      }
      
      setPerformanceData(performanceWithDetails);
    } catch (error) {
      console.error('Erro ao carregar dados de desempenho detalhados:', error);
      setErrors(prev => ({ ...prev, performance: error.message }));
      setAlert({ message: 'Erro ao carregar dados de desempenho: ' + error.message, type: 'error' });
      setPerformanceData([]);
    } finally {
      setLoading(prev => ({ ...prev, performance: false }));
    }
  };
  
  // Função para carregar dados de desempenho específico para o professor
  const loadProfessorPerformanceData = async () => {
    setLoading(prev => ({ ...prev, performance: true }));
    setErrors(prev => ({ ...prev, performance: null }));
    
    try {
      // Carregar dados de desempenho geral do professor
      // Vamos usar a API existente em vez de fetch direto
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/performance/teacher/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao carregar dados de desempenho');
      }
      
      // Transformar os dados para o formato esperado pela UI
      const performanceWithDetails = [];
      
      if (data.data && data.data.classes && data.data.classes.length > 0) {
        for (const classData of data.data.classes) {
          // Carregar alunos dessa turma para mostrar detalhes
          const classStudentsResponse = await classAPI.getClassStudents(classData.classId);
          
          if (classStudentsResponse.data && classStudentsResponse.data.students) {
            for (const student of classStudentsResponse.data.students) {
              // Pegar tarefas recentes do aluno
              const studentTasksResponse = await taskAPI.getTasks({
                'assigned_to.user': student.user_id._id,
                status: 'completed'
              });
              
              performanceWithDetails.push({
                classId: classData.classId,
                className: classData.className,
                subject: classData.subject,
                student_id: student.user_id._id,
                student_name: student.user_id.name,
                student_grade: student.user_id.academic?.grade || 'N/A',
                totalTasks: classData.totalTasks,
                completedTasks: classData.completedTasks,
                avgCompletion: classData.avgCompletion,
                studentTasks: studentTasksResponse.data.length,
                // Atributos para manter compatibilidade com o código existente
                title: `${student.user_id.name} - ${classData.subject}`,
                subject: classData.subject,
                assigned_to: [{user: student.user_id._id, status: 'completed', completed_at: new Date()}]
              });
            }
          }
        }
      }
      
      setPerformanceData(performanceWithDetails);
    } catch (error) {
      console.error('Erro ao carregar dados de desempenho:', error);
      setErrors(prev => ({ ...prev, performance: error.message }));
      setAlert({ message: 'Erro ao carregar dados de desempenho: ' + error.message, type: 'error' });
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
      setNewAssignment({ title: '', subject: '', deadline: '', description: '', classId: '' });
      setAlert({ message: 'Tarefa criada com sucesso!', type: 'success' });
      // Recarregar as tarefas após criar
      loadAssignments();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      setAlert({ message: 'Erro ao criar tarefa: ' + error.message, type: 'error' });
    }
  };
  
  // Função para carregar alunos de uma turma
  const loadClassStudents = async (classId) => {
    try {
      const response = await classAPI.getClassStudents(classId);
      setClassStudents(response.data || []);
      setSelectedClass(classId);
    } catch (error) {
      console.error('Erro ao carregar alunos da turma:', error);
      setAlert({ message: 'Erro ao carregar alunos da turma: ' + error.message, type: 'error' });
      setClassStudents([]);
      setSelectedClass(null);
    }
  };
  
  // Função para atribuir tarefa a alunos
  const assignTaskToStudents = async (taskId, studentIds) => {
    try {
      // A API atual não suporta atribuir tarefas a alunos específicos diretamente
      // Vamos atualizar a tarefa para incluir os alunos
      const updatedTask = {
        assigned_to: studentIds.map(studentId => ({
          user: studentId,
          status: 'pending',
          assigned_at: new Date().toISOString()
        }))
      };
      
      await taskAPI.updateTask(taskId, updatedTask);
      setAlert({ message: 'Tarefa atribuída aos alunos com sucesso!', type: 'success' });
      loadAssignments(); // Recarregar as tarefas
    } catch (error) {
      console.error('Erro ao atribuir tarefa aos alunos:', error);
      setAlert({ message: 'Erro ao atribuir tarefa aos alunos: ' + error.message, type: 'error' });
    }
  };
  
  // Função para lidar com a seleção de turma
  const handleClassChange = (classId) => {
    setNewAssignment(prev => ({ ...prev, classId }));
    if (classId) {
      loadClassStudents(classId);
    } else {
      setClassStudents([]);
      setSelectedClass(null);
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
      // Recarregar os flashcards após criar
      loadFlashcards();
    } catch (error) {
      console.error('Erro ao criar flashcard:', error);
      setAlert({ message: 'Erro ao criar flashcard: ' + error.message, type: 'error' });
    }
  };
  
  // Função para excluir um flashcard
  const handleDeleteFlashcard = async (id) => {
    showConfirmation(
      'Tem certeza que deseja excluir este flashcard?',
      async () => {
        try {
          await flashcardAPI.deleteFlashcard(id);
          setFlashcardDecks(flashcardDecks.filter(deck => deck._id !== id));
          setAlert({ message: 'Flashcard excluído com sucesso!', type: 'success' });
        } catch (error) {
          console.error('Erro ao excluir flashcard:', error);
          setAlert({ message: 'Erro ao excluir flashcard: ' + error.message, type: 'error' });
        }
      },
      'warning'
    );
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

    // Carregar dados iniciais, mas apenas se o usuário estiver disponível
    if (user && user._id) {
      loadClasses();
      loadAssignments();
      loadFlashcards();
      loadPerformanceData();
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [flashcardStats, user]);

  // Atualizar chamada para garantir que o user está definido
  useEffect(() => {
    if (user && user._id) {
      // Carregar dados iniciais
      loadClasses();
      loadAssignments();
      loadFlashcards();
      loadPerformanceData();
    }
  }, [user]);

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
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                  placeholder="Disciplina" 
                  className="add-assignment-input"
                  required
                />
              </div>
              <div className="input-row">
                <select
                  value={newAssignment.classId}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="add-assignment-input"
                  required
                >
                  <option value="">Selecione uma turma</option>
                  {classes.map(cls => (
                    <option key={cls._id || cls.id} value={cls._id || cls.id}>
                      {cls.name} ({cls.subject})
                    </option>
                  ))}
                </select>
                <input 
                  type="date" 
                  value={newAssignment.deadline}
                  onChange={(e) => setNewAssignment({...newAssignment, deadline: e.target.value})}
                  className="add-assignment-input"
                  required
                />
              </div>
              <div className="input-row">
                <textarea 
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  placeholder="Descrição da tarefa" 
                  className="add-assignment-textarea"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Criar Tarefa</button>
            </form>
            
            {/* Seção para atribuir tarefas aos alunos */}
            {selectedClass && classStudents.length > 0 && (
              <div className="card" style={{ marginTop: '20px' }}>
                <h3 className="card-title">Atribuir Tarefa aos Alunos</h3>
                <div className="students-list">
                  <h4>Turma: {classes.find(c => c._id === selectedClass)?.name || classes.find(c => c.id === selectedClass)?.name || 'N/A'}</h4>
                  <div className="student-assignments">
                    {classStudents.map(student => (
                      <div key={student._id || student.id} className="student-item">
                        <span>{student.name}</span>
                        <input 
                          type="checkbox" 
                          id={`student-${student._id || student.id}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '15px', textAlign: 'right' }}>
                    <button className="btn btn-primary">
                      Atribuir Tarefa Selecionada
                    </button>
                  </div>
                </div>
              </div>
            )}
            
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
                        Disciplina: {assignment.subject || 'N/A'} • Prazo: {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString('pt-BR') : 'N/A'} • Turma: {assignment.class || 'N/A'}
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
                  placeholder="Pergunta" 
                  className="add-flashcard-input"
                  required
                />
                <input 
                  type="text" 
                  value={newFlashcardDeck.subject}
                  onChange={(e) => setNewFlashcardDeck({...newFlashcardDeck, subject: e.target.value})}
                  placeholder="Resposta" 
                  className="add-flashcard-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Criar Flashcard</button>
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
                        Disciplina: {deck.subject || deck.tags?.[0] || 'N/A'} • Resposta: {deck.answer || deck.subject || 'N/A'}
                      </div>
                    </div>
                    <div className="flashcard-actions">
                      <button className="btn-view-flashcard" title="Visualizar">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="btn-delete-flashcard" 
                        title="Excluir"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFlashcard(deck._id || deck.id);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
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
                      <th>Tarefas Concluídas</th>
                      <th>Média</th>
                      <th>Última Atividade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.length > 0 ? (
                      performanceData.map(task => (
                        <tr key={task._id || task.id}>
                          <td>{task.assigned_to?.map(assignment => 
                            classes.find(cls => cls._id === task.class_id)?.students?.find(s => s._id === assignment.user)?.name
                          ).filter(Boolean)[0] || task.assigned_to?.[0]?.user_name || 'N/A'}</td>
                          <td>{classes.find(cls => cls._id === task.class_id)?.name || task.class_name || 'N/A'}</td>
                          <td>{task.subject || 'N/A'}</td>
                          <td>{task.assigned_to?.filter(assignment => assignment.status === 'completed').length || 0}/{task.assigned_to?.length || 0}</td>
                          <td>{task.avg ? task.avg.toFixed(1) : 'N/A'}</td>
                          <td>{task.assigned_to?.[0]?.completed_at ? new Date(task.assigned_to[0].completed_at).toLocaleDateString('pt-BR') : 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">Nenhum dado de desempenho disponível.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Estatísticas detalhadas por turma */}
          <div className="card" style={{ marginTop: '20px' }}>
            <h3 className="card-title">Estatísticas por Turma</h3>
            {classes.length > 0 ? (
              <div className="class-stats">
                {classes.map(cls => (
                  <div key={cls._id || cls.id} className="class-stat-item">
                    <h4>{cls.name}</h4>
                    <div className="stat-info">
                      <div>Alunos: {cls.studentCount || 0}</div>
                      <div>Tarefas: {assignments.filter(assignment => assignment.class_id === cls._id || assignment.class === cls.name).length}</div>
                      <div>Média: {assignments.filter(assignment => assignment.class_id === cls._id || assignment.class === cls.name).reduce((acc, curr) => acc + (curr.avg || 0), 0) / Math.max(assignments.filter(assignment => assignment.class_id === cls._id || assignment.class === cls.name).length, 1)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhuma turma encontrada.</p>
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

// Estilos para os novos componentes e layout aprimorado
const styles = document.createElement('style');
styles.innerHTML = `
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    background-color: var(--sidebar-background, #d9534f);
    color: white;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    box-shadow: 3px 0 10px rgba(0,0,0,0.1);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .logo {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .logo h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .logo h1 span {
    color: var(--secondary-color, #ffc107);
  }

  .menu {
    padding: 20px 0;
    flex: 1;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    margin: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255,255,255,0.8);
  }

  .menu-item:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  .menu-item.active {
    background: rgba(255,255,255,0.2);
    color: white;
    font-weight: 500;
  }

  .menu-item i {
    margin-right: 12px;
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
  }

  .profile {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .profile:hover {
    background: rgba(255,255,255,0.1);
  }

  .profile-img-container {
    position: relative;
    margin-right: 12px;
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .profile-img-upload-btn {
    position: absolute;
    bottom: -2px;
    right: -2px;
    background: var(--secondary-color, #ffc107);
    color: white;
    border: 2px solid white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    cursor: pointer;
  }

  .profile-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: var(--background, #f8f9fa);
    width: calc(100% - 260px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .menu-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color, #212529);
  }

  .page-title {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color, #212529);
  }

  .screen {
    display: none;
  }

  .screen.active {
    display: block;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: white;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }

  .stat-card i {
    display: block;
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--primary-color, #d9534f);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color, #d9534f);
    margin: 10px 0;
  }

  .stat-label {
    font-size: 1rem;
    color: var(--text-light-color, #6c757d);
  }

  .card {
    background: white;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  .card-title {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color, #212529);
    border-bottom: 1px solid var(--border-color, #dee2e6);
    padding-bottom: 10px;
  }

  .add-class-form,
  .add-assignment-form,
  .add-flashcard-form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
  }

  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .input-row .add-class-input,
  .input-row .add-assignment-input,
  .input-row .add-flashcard-input {
    flex: 1;
    min-width: 200px;
    padding: 10px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 4px;
    font-size: 14px;
  }

  .add-assignment-textarea {
    flex: 1 1 100%;
    padding: 10px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  .btn-primary {
    background-color: var(--primary-color, #d9534f);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--primary-dark, #c9302c);
  }

  .btn-secondary {
    background-color: var(--secondary-color, #6c757d);
    color: white;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
  }

  .btn-view-class,
  .btn-view-assignment,
  .btn-view-flashcard {
    background: var(--primary-color, #d9534f);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .btn-delete-flashcard {
    background: var(--danger-color, #d9534f);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 8px;
    cursor: pointer;
    margin-left: 8px;
  }

  .class-list,
  .assignment-list,
  .flashcard-deck-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .class-item,
  .assignment-item,
  .flashcard-deck-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    background: white;
    transition: box-shadow 0.3s ease;
  }

  .class-item:hover,
  .assignment-item:hover,
  .flashcard-deck-item:hover {
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }

  .class-content,
  .assignment-content,
  .flashcard-deck-content {
    flex: 1;
  }

  .class-title,
  .assignment-title,
  .flashcard-deck-title {
    font-weight: 600;
    color: var(--text-color, #212529);
    margin-bottom: 5px;
  }

  .class-details,
  .assignment-details,
  .flashcard-deck-details {
    font-size: 0.9rem;
    color: var(--text-light-color, #6c757d);
  }

  .flashcard-actions {
    display: flex;
    gap: 8px;
  }

  .loading,
  .error {
    padding: 15px;
    border-radius: 4px;
    text-align: center;
  }

  .loading {
    background-color: #fff3cd;
    color: #856404;
  }

  .error {
    background-color: #f8d7da;
    color: #721c24;
  }

  .performance-table table {
    width: 100%;
    border-collapse: collapse;
  }

  .performance-table th,
  .performance-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color, #dee2e6);
  }

  .performance-table th {
    background-color: #f8f9fa;
    font-weight: 600;
  }

  .class-stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
  }

  .class-stat-item {
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    padding: 15px;
  }

  .class-stat-item h4 {
    margin-top: 0;
    color: var(--text-color, #212529);
  }

  .stat-info {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .stat-info div {
    background: #f8f9fa;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: 500;
  }

  .students-list {
    margin-top: 15px;
  }

  .student-assignments {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 15px 0;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 4px;
  }

  .student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid var(--border-color, #dee2e6);
  }

  .student-item:last-child {
    border-bottom: none;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: none;
  }

  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      left: -260px;
      height: 100vh;
      z-index: 1001;
    }

    .sidebar.open {
      left: 0;
    }

    .main-content {
      width: 100%;
    }

    .stats-container {
      grid-template-columns: 1fr;
    }

    .input-row {
      flex-direction: column;
    }

    .input-row .add-class-input,
    .input-row .add-assignment-input,
    .input-row .add-flashcard-input {
      min-width: 100%;
    }

    .sidebar-overlay {
      display: block;
    }
  }
  
  /* Estilos do modo escuro para flashcards */
  .dark-theme .flashcard-deck-item {
    background: var(--card-background);
    border-color: var(--border-color);
    color: var(--text-color);
  }
  
  .dark-theme .flashcard-deck-title {
    color: var(--text-color);
  }
  
  .dark-theme .flashcard-deck-details {
    color: var(--text-light-color);
  }
  
  .dark-theme .add-flashcard-form {
    background: var(--card-background);
    border-color: var(--border-color);
    color: var(--text-color);
  }
  
  .dark-theme .add-flashcard-input {
    background: var(--input-background);
    border-color: var(--border-color);
    color: var(--text-color);
  }
`;

document.head.appendChild(styles);

export default DashboardProfessor;