import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { authAPI, taskAPI, flashcardAPI, classAPI, userAPI } from '../lib/api';
import CustomAlert from './CustomAlert';

// Registrar componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// ==================== COMPONENTE ====================
function DashboardProfessor({ user, darkMode, toggleDarkMode, onLogout }) {
  // Normalizar IDs - localStorage usa "id", backend usa "_id"
  const userId = user?._id || user?.id;
  const schoolId = user?.school_id?._id || user?.school_id;

  // ==================== ESTADOS ====================
  // Navegação
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Perfil
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: user?.name || 'Professor' });
  const [profileImage, setProfileImage] = useState(user?.profile?.avatar || user?.profilePicture || 'https://i.pravatar.cc/40?u=professor');
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Turmas - Array vazio, será carregado do backend
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    subject: '',
    description: '',
    academic_year: new Date().getFullYear().toString()
  });
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [studentEmailInputs, setStudentEmailInputs] = useState({});

  // Alunos - Array vazio, será carregado do backend
  const [allStudents, setAllStudents] = useState([]);
  const [classStudents, setClassStudents] = useState({});

  // Tarefas - Array vazio, será carregado do backend
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    due_date: '',
    priority: 'medium',
    description: '',
    assigned_to: [],
    attachments: []
  });
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Flashcards - Array vazio, será carregado do backend
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', tags: [], class_id: '' });
  const [showEditFlashcardModal, setShowEditFlashcardModal] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  // Estatísticas - Valores iniciais zerados
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    totalTasks: 0,
    totalFlashcards: 0
  });

  // Loading
  const [loading, setLoading] = useState({
    classes: false,
    students: false,
    tasks: false,
    flashcards: false
  });

  // Relatórios
  const [activeReportTab, setActiveReportTab] = useState('classes');

  // Alert
  const [alert, setAlert] = useState(null);

  // ==================== FUNÇÕES DE CARREGAMENTO ====================
  
  // Carregar turmas do professor
  const loadClasses = useCallback(async () => {
    if (!userId) {
      console.log('loadClasses: userId não definido');
      return;
    }
    
    console.log('Carregando turmas para professor:', userId);
    setLoading(prev => ({ ...prev, classes: true }));
    try {
      const response = await classAPI.getClassesByTeacher(userId);
      console.log('Resposta de turmas:', response);
      const classesData = response.data?.classes || [];
      console.log('Turmas encontradas:', classesData.length, classesData);
      setClasses(Array.isArray(classesData) ? classesData : []);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
      setAlert({ message: 'Erro ao carregar turmas: ' + error.message, type: 'error' });
    } finally {
      setLoading(prev => ({ ...prev, classes: false }));
    }
  }, [userId]);

  // Extrair alunos das turmas do professor (apenas seus alunos)
  const loadAllStudents = useCallback(async () => {
    if (!classes || classes.length === 0) {
      console.log('loadAllStudents: Nenhuma turma carregada ainda');
      setAllStudents([]);
      return;
    }
    
    console.log('Extraindo alunos das turmas do professor...');
    setLoading(prev => ({ ...prev, students: true }));
    try {
      // Coletar todos os alunos únicos de todas as turmas
      const studentsMap = new Map();
      
      for (const cls of classes) {
        if (cls.students && cls.students.length > 0) {
          for (const student of cls.students) {
            // Cada student pode ter user_id como objeto populado ou apenas ID
            const studentData = student.user_id || student;
            const studentId = studentData._id || studentData.id || studentData;
            
            if (studentId && !studentsMap.has(studentId.toString())) {
              studentsMap.set(studentId.toString(), {
                _id: studentId,
                name: studentData.name || 'Aluno',
                email: studentData.email || '',
                grade: studentData.academic?.grade || 'N/A',
                studentId: studentData.academic?.studentId || 'N/A',
                className: cls.name // Adiciona a turma do aluno
              });
            }
          }
        }
      }
      
      const uniqueStudents = Array.from(studentsMap.values());
      console.log('Alunos únicos do professor:', uniqueStudents.length);
      setAllStudents(uniqueStudents);
    } catch (error) {
      console.error('Erro ao extrair alunos:', error);
    } finally {
      setLoading(prev => ({ ...prev, students: false }));
    }
  }, [classes]);

  // Carregar alunos de uma turma específica
  const loadClassStudents = useCallback(async (classId) => {
    try {
      const response = await classAPI.getClassStudents(classId);
      const students = response.data?.students || [];
      setClassStudents(prev => ({ ...prev, [classId]: students }));
      return students;
    } catch (error) {
      console.error('Erro ao carregar alunos da turma:', error);
      return [];
    }
  }, []);

  // Carregar tarefas do professor
  const loadTasks = useCallback(async () => {
    if (!userId) return;
    
    console.log('Carregando tarefas do professor:', userId);
    setLoading(prev => ({ ...prev, tasks: true }));
    try {
      const response = await taskAPI.getTasksByTeacher(userId);
      console.log('Tarefas encontradas:', response.data?.length || 0);
      setTasks(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  }, [userId]);

  // Carregar flashcards
  const loadFlashcards = useCallback(async () => {
    setLoading(prev => ({ ...prev, flashcards: true }));
    try {
      const response = await flashcardAPI.getFlashcards();
      setFlashcards(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar flashcards:', error);
    } finally {
      setLoading(prev => ({ ...prev, flashcards: false }));
    }
  }, []);

  // Carregar estatísticas
  const loadStats = useCallback(async () => {
    if (!userId) return;
    
    try {
      const [classesRes, tasksRes, flashcardsRes] = await Promise.allSettled([
        classAPI.getClassesByTeacher(userId),
        taskAPI.getTasks(),
        flashcardAPI.getFlashcards()
      ]);

      const classesData = classesRes.status === 'fulfilled' 
        ? (classesRes.value.data?.classes || []) : [];
      const tasksData = tasksRes.status === 'fulfilled' 
        ? (tasksRes.value.data || []) : [];
      const flashcardsData = flashcardsRes.status === 'fulfilled' 
        ? (flashcardsRes.value.data || []) : [];

      // Filtrar tarefas criadas pelo professor
      const teacherTasks = tasksData.filter(t => 
        t.created_by?._id === userId || t.created_by === userId || t.created_by?.id === userId
      );

      // Contar alunos total
      let totalStudents = 0;
      for (const cls of classesData) {
        if (cls.students?.length) {
          totalStudents += cls.students.filter(s => s.status === 'active' || !s.status).length;
        }
      }

      setStats({
        totalClasses: classesData.length,
        totalStudents,
        totalTasks: teacherTasks.length,
        totalFlashcards: flashcardsData.length
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  }, [userId]);

  // ==================== FUNÇÕES DE TURMAS ====================

  // Criar turma
  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!newClass.name.trim() || !newClass.subject.trim()) {
      setAlert({ message: 'Nome e disciplina são obrigatórios', type: 'error' });
      return;
    }

    // Garantir que o ano acadêmico está no formato correto (YYYY)
    const academicYear = newClass.academic_year?.trim() || new Date().getFullYear().toString();
    if (!/^\d{4}$/.test(academicYear) && !/^\d{4}-\d{2}$/.test(academicYear)) {
      setAlert({ message: 'Ano acadêmico deve estar no formato YYYY ou YYYY-YY', type: 'error' });
      return;
    }

    try {
      console.log('Criando turma com dados:', {
        name: newClass.name,
        subject: newClass.subject,
        description: newClass.description,
        academic_year: academicYear,
        teacher_id: userId
      });

      const response = await classAPI.createClass({
        name: newClass.name.trim(),
        subject: newClass.subject.trim(),
        description: newClass.description?.trim() || '',
        academic_year: academicYear
      });
      
      console.log('Resposta da criação:', response);
      
      const createdClass = response.data?.class || response.data;
      if (createdClass && createdClass._id) {
        // Recarregar todas as turmas para garantir sincronização
        await loadClasses();
        setNewClass({ name: '', subject: '', description: '', academic_year: new Date().getFullYear().toString() });
        setAlert({ message: 'Turma criada com sucesso!', type: 'success' });
        loadStats();
      } else {
        console.error('Turma criada sem ID:', response);
        setAlert({ message: 'Erro: turma criada mas sem dados retornados', type: 'error' });
      }
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      setAlert({ message: 'Erro ao criar turma: ' + (error.message || 'Erro desconhecido'), type: 'error' });
    }
  };

  // Atualizar turma
  const handleUpdateClass = async (e) => {
    e.preventDefault();
    if (!editingClass?.name.trim() || !editingClass?.subject.trim()) {
      setAlert({ message: 'Nome e disciplina são obrigatórios', type: 'error' });
      return;
    }

    try {
      const response = await classAPI.updateClass(editingClass._id, {
        name: editingClass.name,
        subject: editingClass.subject,
        description: editingClass.description,
        academic_year: editingClass.academic_year
      });
      
      const updatedClass = response.data?.class || response.data;
      setClasses(prev => prev.map(c => c._id === editingClass._id ? updatedClass : c));
      setShowEditClassModal(false);
      setEditingClass(null);
      setAlert({ message: 'Turma atualizada!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar turma: ' + error.message, type: 'error' });
    }
  };

  // Arquivar turma
  const handleArchiveClass = async (classId) => {
    if (!window.confirm('Arquivar esta turma?')) return;
    
    try {
      await classAPI.archiveClass(classId);
      setClasses(prev => prev.filter(c => c._id !== classId));
      setAlert({ message: 'Turma arquivada!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao arquivar turma: ' + error.message, type: 'error' });
    }
  };

  // Adicionar aluno à turma por email
  const handleAddStudentByEmail = async (classId) => {
    const email = studentEmailInputs[classId]?.trim();
    if (!email) {
      setAlert({ message: 'Informe o email do aluno', type: 'error' });
      return;
    }

    try {
      // Buscar aluno pelo email
      const usersResponse = await userAPI.getUsers({ email, school_id: schoolId });
      const students = usersResponse.data || [];
      
      if (students.length === 0) {
        setAlert({ message: 'Aluno não encontrado com este email', type: 'error' });
        return;
      }

      const student = students[0];
      if (student.role !== 'student') {
        setAlert({ message: 'O usuário encontrado não é um aluno', type: 'error' });
        return;
      }

      // Adicionar à turma
      await classAPI.addStudentToClass(classId, { student_id: student._id });
      
      // Atualizar dados
      await loadClasses();
      await loadClassStudents(classId);
      
      // Limpar input
      setStudentEmailInputs(prev => ({ ...prev, [classId]: '' }));
      setAlert({ message: 'Aluno adicionado!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao adicionar aluno: ' + error.message, type: 'error' });
    }
  };

  // Remover aluno da turma
  const handleRemoveStudent = async (classId, studentId) => {
    if (!window.confirm('Remover este aluno da turma?')) return;
    
    try {
      await classAPI.removeStudentFromClass(classId, studentId);
      await loadClasses();
      await loadClassStudents(classId);
      setAlert({ message: 'Aluno removido!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao remover aluno: ' + error.message, type: 'error' });
    }
  };

  // ==================== FUNÇÕES DE TAREFAS ====================

  // Criar tarefa
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      setAlert({ message: 'Título da tarefa é obrigatório', type: 'error' });
      return;
    }
    if (newTask.assigned_to.length === 0) {
      setAlert({ message: 'Selecione pelo menos um aluno', type: 'error' });
      return;
    }

    try {
      await taskAPI.createTask({
        title: newTask.title,
        subject: newTask.subject,
        due_date: newTask.due_date || undefined,
        priority: newTask.priority,
        description: newTask.description,
        created_by: userId,
        school_id: schoolId,
        assigned_to: newTask.assigned_to
      });
      
      setNewTask({ title: '', subject: '', due_date: '', priority: 'medium', description: '', assigned_to: [], attachments: [] });
      await loadTasks();
      setAlert({ message: 'Tarefa criada!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao criar tarefa: ' + error.message, type: 'error' });
    }
  };

  // Atualizar tarefa
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!editingTask?.title.trim()) {
      setAlert({ message: 'Título é obrigatório', type: 'error' });
      return;
    }

    try {
      const response = await taskAPI.updateTask(editingTask._id, {
        title: editingTask.title,
        subject: editingTask.subject,
        due_date: editingTask.due_date || undefined,
        priority: editingTask.priority,
        description: editingTask.description
      });
      
      setTasks(prev => prev.map(t => t._id === editingTask._id ? response.data : t));
      setShowEditTaskModal(false);
      setEditingTask(null);
      setAlert({ message: 'Tarefa atualizada!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar tarefa: ' + error.message, type: 'error' });
    }
  };

  // Arquivar tarefa
  const handleArchiveTask = async (taskId) => {
    if (!window.confirm('Arquivar esta tarefa?')) return;
    
    try {
      await taskAPI.archiveTask(taskId);
      setTasks(prev => prev.filter(t => t._id !== taskId));
      setAlert({ message: 'Tarefa arquivada!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao arquivar tarefa: ' + error.message, type: 'error' });
    }
  };

  // Toggle seleção de aluno para tarefa
  const toggleStudentSelection = (studentId) => {
    setNewTask(prev => ({
      ...prev,
      assigned_to: prev.assigned_to.includes(studentId)
        ? prev.assigned_to.filter(id => id !== studentId)
        : [...prev.assigned_to, studentId]
    }));
  };

  // ==================== FUNÇÕES DE FLASHCARDS ====================

  // Criar flashcard
  const handleCreateFlashcard = async (e) => {
    e.preventDefault();
    if (!newFlashcard.question.trim() || !newFlashcard.answer.trim()) {
      setAlert({ message: 'Pergunta e resposta são obrigatórias', type: 'error' });
      return;
    }

    try {
      const response = await flashcardAPI.createFlashcard({
        question: newFlashcard.question,
        answer: newFlashcard.answer,
        tags: newFlashcard.tags,
        user_id: userId,
        school_id: schoolId,
        class_id: newFlashcard.class_id || null
      });
      
      setFlashcards(prev => [...prev, response.data]);
      setNewFlashcard({ question: '', answer: '', tags: [], class_id: '' });
      setAlert({ message: 'Flashcard criado!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao criar flashcard: ' + error.message, type: 'error' });
    }
  };

  // Atualizar flashcard
  const handleUpdateFlashcard = async (e) => {
    e.preventDefault();
    if (!editingFlashcard?.question.trim() || !editingFlashcard?.answer.trim()) {
      setAlert({ message: 'Pergunta e resposta são obrigatórias', type: 'error' });
      return;
    }

    try {
      const response = await flashcardAPI.updateFlashcard(editingFlashcard._id, {
        question: editingFlashcard.question,
        answer: editingFlashcard.answer,
        tags: editingFlashcard.tags
      });
      
      setFlashcards(prev => prev.map(f => f._id === editingFlashcard._id ? response.data : f));
      setShowEditFlashcardModal(false);
      setEditingFlashcard(null);
      setAlert({ message: 'Flashcard atualizado!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar flashcard: ' + error.message, type: 'error' });
    }
  };

  // Deletar flashcard
  const handleDeleteFlashcard = async (id) => {
    if (!window.confirm('Deletar este flashcard?')) return;
    
    try {
      await flashcardAPI.deleteFlashcard(id);
      setFlashcards(prev => prev.filter(f => f._id !== id));
      setAlert({ message: 'Flashcard deletado!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao deletar flashcard: ' + error.message, type: 'error' });
    }
  };

  // ==================== FUNÇÕES DE PERFIL ====================

  const handleSaveProfile = async () => {
    try {
      let response;
      if (profileImageFile) {
        const formData = new FormData();
        formData.append('name', profileData.name);
        formData.append('profilePicture', profileImageFile);
        response = await authAPI.updateProfile(formData);
      } else {
        response = await authAPI.updateProfile({ name: profileData.name });
      }

      // Obtém a nova URL do avatar
      const newAvatarUrl = response.data.user.profile?.avatar || response.data.user.profilePicture || user?.profilePicture;

      const updatedUser = { ...user, name: response.data.user.name, profilePicture: newAvatarUrl };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Atualiza a imagem de perfil na tela
      if (newAvatarUrl) {
        setProfileImage(newAvatarUrl);
      }
      
      setEditProfile(false);
      setProfileImageFile(null);
      setAlert({ message: 'Perfil atualizado!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar perfil: ' + error.message, type: 'error' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
      // Armazena o arquivo original para uso durante o salvamento
      setProfileImageFile(file);
    }
  };

  // ==================== EFFECT ====================
  
  // Carregar dados iniciais
  useEffect(() => {
    console.log('useEffect - userId:', userId, 'schoolId:', schoolId);
    
    if (userId && schoolId) {
      console.log('Iniciando carregamento de dados do professor...');
      loadClasses();
      loadTasks();
      loadFlashcards();
      loadStats();
    } else {
      console.log('useEffect - Condições não atendidas para carregar dados');
    }
  }, [userId, schoolId, loadClasses, loadTasks, loadFlashcards, loadStats]);

  // Carregar alunos quando as turmas forem carregadas
  useEffect(() => {
    if (classes.length > 0) {
      loadAllStudents();
    }
  }, [classes, loadAllStudents]);

  // ==================== COMPONENTES ====================

  // Componente de gráfico de pizza melhorado
  const PieChartComponent = ({ data, total }) => {
    const chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          data: data.map(item => item.value),
          backgroundColor: data.map(item => item.color),
          borderColor: data.map(item => item.color),
          borderWidth: 1,
          hoverOffset: 4
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 10,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000
      }
    };

    return (
      <div style={{ position: 'relative', height: '220px', width: '100%' }}>
        <Pie data={chartData} options={options} />
      </div>
    );
  };

  // Componente de gráfico de barras
  const BarChartComponent = ({ data }) => {
    const chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'Quantidade',
          data: data.map(item => item.value),
          backgroundColor: data.map(item => item.color),
          borderColor: data.map(item => item.borderColor || item.color),
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: data.map(item => item.hoverColor || item.color)
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Quantidade: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
            font: {
              size: 10
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 10
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    };

    return (
      <div style={{ position: 'relative', height: '200px', width: '100%' }}>
        <Bar data={chartData} options={options} />
      </div>
    );
  };

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'classes', title: 'Turmas', icon: 'fas fa-users' },
    { id: 'tasks', title: 'Tarefas', icon: 'fas fa-tasks' },
    { id: 'flashcards', title: 'Flashcards', icon: 'fas fa-clone' },
    { id: 'reports', title: 'Relatórios', icon: 'fas fa-chart-bar' }
  ];

  const pageTitles = {
    dashboard: 'Dashboard Professor',
    classes: 'Turmas',
    tasks: 'Tarefas',
    flashcards: 'Flashcards',
    reports: 'Relatórios'
  };

  // ==================== RENDER ====================

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src="/logoVe.png" alt="PomoDash Logo" style={{ height: '50px', marginRight: '10px', borderRadius: '12px' }} />
          <h1>Pomo<span>dash</span></h1>
        </div>
        <div className="menu">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`menu-item ${activeScreen === item.id ? 'active' : ''}`} 
              onClick={() => { setActiveScreen(item.id); setSidebarOpen(false); }}
            >
              <i className={item.icon}></i>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <div className="profile" onClick={() => { setShowProfileModal(true); setSidebarOpen(false); }}>
          <img src={profileImage} alt="Professor" className="profile-img" />
          <div className="profile-name">{user?.name || 'Professor'}</div>
        </div>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
            <h2 className="page-title">{pageTitles[activeScreen]}</h2>
          </div>
        </div>

        {/* Dashboard Screen */}
        {activeScreen === 'dashboard' && (
          <div className="screen active">
            <div className="stats-container">
              <div className="stat-card card">
                <div className="stat-icon"><i className="fas fa-users"></i></div>
                <div className="stat-value">{stats.totalClasses}</div>
                <div className="stat-label">Turmas</div>
              </div>
              <div className="stat-card card">
                <div className="stat-icon"><i className="fas fa-user-graduate"></i></div>
                <div className="stat-value">{stats.totalStudents}</div>
                <div className="stat-label">Alunos</div>
              </div>
              <div className="stat-card card">
                <div className="stat-icon"><i className="fas fa-tasks"></i></div>
                <div className="stat-value">{stats.totalTasks}</div>
                <div className="stat-label">Tarefas</div>
              </div>
              <div className="stat-card card">
                <div className="stat-icon"><i className="fas fa-clone"></i></div>
                <div className="stat-value">{stats.totalFlashcards}</div>
                <div className="stat-label">Flashcards</div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="card animated" style={{ animationDelay: '0.1s' }}>
                <h3 className="card-title">
                  <i className="fas fa-chart-pie" style={{ marginRight: '8px', color: '#d9534f' }}></i>
                  Distribuição de Alunos por Turma
                </h3>
                {loading.classes ? (
                  <p className="chart-placeholder"><i className="fas fa-spinner fa-spin"></i> Carregando...</p>
                ) : classes.length > 0 ? (
                  <PieChartComponent 
                    data={classes.map((cls, index) => ({
                      label: cls.name,
                      value: cls.students?.filter(s => s.status === 'active' || !s.status).length || 0,
                      color: ['#5cb85c', '#0275d8', '#d9534f', '#f0ad4e', '#5bc0de', '#6f42c1'][index % 6]
                    }))}
                    total={classes.reduce((sum, cls) => sum + (cls.students?.filter(s => s.status === 'active' || !s.status).length || 0), 0)}
                  />
                ) : (
                  <p className="chart-placeholder">Nenhuma turma cadastrada</p>
                )}
              </div>
              
              <div className="card animated" style={{ animationDelay: '0.2s' }}>
                <h3 className="card-title">
                  <i className="fas fa-tasks" style={{ marginRight: '8px', color: '#0275d8' }}></i>
                  Tarefas por Prioridade
                </h3>
                {loading.tasks ? (
                  <p className="chart-placeholder"><i className="fas fa-spinner fa-spin"></i> Carregando...</p>
                ) : tasks.length > 0 ? (
                  <BarChartComponent 
                    data={[
                      { 
                        label: 'Urgente', 
                        value: tasks.filter(t => t.priority === 'urgent').length,
                        color: 'rgba(128, 0, 128, 0.7)',
                        borderColor: 'rgba(128, 0, 128, 1)',
                        hoverColor: 'rgba(128, 0, 128, 0.9)'
                      },
                      { 
                        label: 'Alta', 
                        value: tasks.filter(t => t.priority === 'high').length,
                        color: 'rgba(217, 83, 79, 0.7)',
                        borderColor: 'rgba(217, 83, 79, 1)',
                        hoverColor: 'rgba(217, 83, 79, 0.9)'
                      },
                      { 
                        label: 'Média', 
                        value: tasks.filter(t => t.priority === 'medium').length,
                        color: 'rgba(240, 173, 78, 0.7)',
                        borderColor: 'rgba(240, 173, 78, 1)',
                        hoverColor: 'rgba(240, 173, 78, 0.9)'
                      },
                      { 
                        label: 'Baixa', 
                        value: tasks.filter(t => t.priority === 'low').length,
                        color: 'rgba(92, 184, 92, 0.7)',
                        borderColor: 'rgba(92, 184, 92, 1)',
                        hoverColor: 'rgba(92, 184, 92, 0.9)'
                      }
                    ]}
                  />
                ) : (
                  <p className="chart-placeholder">Nenhuma tarefa cadastrada</p>
                )}
              </div>
            </div>
            
            {/* Segunda linha de gráficos */}
            <div className="dashboard-grid" style={{ marginTop: '20px' }}>
              <div className="card animated" style={{ animationDelay: '0.3s' }}>
                <h3 className="card-title">
                  <i className="fas fa-clone" style={{ marginRight: '8px', color: '#6f42c1' }}></i>
                  Resumo de Atividades
                </h3>
                {loading.flashcards || loading.classes ? (
                  <p className="chart-placeholder"><i className="fas fa-spinner fa-spin"></i> Carregando...</p>
                ) : (
                  <div className="quick-stats">
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#6f42c1' }}>{flashcards.length}</span>
                      <span className="quick-stat-label">Flashcards</span>
                    </div>
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#5cb85c' }}>{classes.length}</span>
                      <span className="quick-stat-label">Turmas</span>
                    </div>
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#0275d8' }}>{tasks.length}</span>
                      <span className="quick-stat-label">Tarefas</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="card animated" style={{ animationDelay: '0.4s' }}>
                <h3 className="card-title">
                  <i className="fas fa-calendar-alt" style={{ marginRight: '8px', color: '#f0ad4e' }}></i>
                  Próximas Entregas
                </h3>
                <div className="upcoming-tasks">
                  {tasks
                    .filter(t => new Date(t.due_date) >= new Date())
                    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
                    .slice(0, 3)
                    .map(task => (
                      <div key={task._id} className="upcoming-task-item">
                        <div className="upcoming-task-title">{task.title}</div>
                        <div className="upcoming-task-date">
                          <i className="fas fa-clock"></i>
                          {new Date(task.due_date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    ))
                  }
                  {tasks.filter(t => new Date(t.due_date) >= new Date()).length === 0 && (
                    <p className="no-upcoming">Nenhuma entrega próxima</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Classes Screen */}
        {activeScreen === 'classes' && (
          <div className="screen active">
            {/* Criar Turma */}
            <div className="card">
              <h3 className="card-title">Criar Nova Turma</h3>
              <form onSubmit={handleCreateClass} className="form-grid">
                <input
                  type="text"
                  value={newClass.name}
                  onChange={e => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome da turma"
                  className="input"
                  required
                />
                <input
                  type="text"
                  value={newClass.subject}
                  onChange={e => setNewClass(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Disciplina"
                  className="input"
                  required
                />
                <input
                  type="text"
                  value={newClass.academic_year}
                  onChange={e => setNewClass(prev => ({ ...prev, academic_year: e.target.value }))}
                  placeholder="Ano acadêmico (ex: 2025)"
                  className="input"
                />
                <textarea
                  value={newClass.description}
                  onChange={e => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição (opcional)"
                  className="input"
                  rows="2"
                />
                <button type="submit" className="btn btn-primary">Criar Turma</button>
              </form>
            </div>

            {/* Lista de Turmas */}
            <div className="card">
              <h3 className="card-title">
                <i className="fas fa-chalkboard-teacher" style={{ marginRight: '10px', color: '#5cb85c' }}></i>
                Suas Turmas ({classes.length})
              </h3>
              {loading.classes ? (
                <p className="loading-text"><i className="fas fa-spinner fa-spin"></i> Carregando turmas...</p>
              ) : classes.length > 0 ? (
                <div className="teacher-classes-grid">
                  {classes.map((cls, index) => (
                    <div key={cls._id} className="teacher-class-card" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="class-card-header">
                        <div className="class-icon" style={{ background: ['#5cb85c', '#0275d8', '#d9534f', '#f0ad4e', '#6f42c1', '#5bc0de'][index % 6] }}>
                          <i className="fas fa-users"></i>
                        </div>
                        <div className="class-title-section">
                          <h4 className="class-title">{cls.name}</h4>
                          <span className="class-subject-badge">{cls.subject}</span>
                        </div>
                      </div>
                      
                      <div className="class-card-stats">
                        <div className="class-stat">
                          <i className="fas fa-user-graduate"></i>
                          <span>{cls.students?.filter(s => s.status === 'active' || !s.status).length || 0} alunos</span>
                        </div>
                        <div className="class-stat">
                          <i className="fas fa-calendar-alt"></i>
                          <span>{cls.academic_year}</span>
                        </div>
                      </div>
                      
                      {cls.description && (
                        <p className="class-description">{cls.description}</p>
                      )}
                      
                      {/* Adicionar aluno por email */}
                      <div className="add-student-section">
                        <div className="add-student-input-group">
                          <input
                            type="email"
                            value={studentEmailInputs[cls._id] || ''}
                            onChange={e => setStudentEmailInputs(prev => ({ ...prev, [cls._id]: e.target.value }))}
                            placeholder="Email do aluno"
                            className="input add-student-input"
                          />
                          <button 
                            className="btn-add-student"
                            onClick={() => handleAddStudentByEmail(cls._id)}
                            title="Adicionar aluno"
                          >
                            <i className="fas fa-user-plus"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="class-card-actions">
                        <button className="class-action-btn edit" onClick={() => { setEditingClass(cls); setShowEditClassModal(true); }}>
                          <i className="fas fa-edit"></i> Editar
                        </button>
                        <button className="class-action-btn view" onClick={() => loadClassStudents(cls._id)}>
                          <i className="fas fa-eye"></i> Ver Alunos
                        </button>
                        <button className="class-action-btn archive" onClick={() => handleArchiveClass(cls._id)}>
                          <i className="fas fa-archive"></i> Arquivar
                        </button>
                      </div>
                      
                      {/* Lista de alunos da turma */}
                      {classStudents[cls._id] && (
                        <div className="students-in-class">
                          <h4>Alunos ({classStudents[cls._id].length})</h4>
                          {classStudents[cls._id].length > 0 ? (
                            <div className="students-list">
                              {classStudents[cls._id].map(s => s.user_id && (
                                <div key={s.user_id._id} className="student-item">
                                  <span>{s.user_id.name}</span>
                                  <span className="student-email">{s.user_id.email}</span>
                                  <button 
                                    className="btn btn-danger btn-xs"
                                    onClick={() => handleRemoveStudent(cls._id, s.user_id._id)}
                                  >
                                    Remover
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p>Nenhum aluno nesta turma</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhuma turma criada</p>
              )}
            </div>

            {/* Todos os Alunos do Professor */}
            <div className="card">
              <h3 className="card-title">
                <i className="fas fa-users" style={{ marginRight: '8px', color: '#5cb85c' }}></i>
                Meus Alunos ({allStudents.length})
              </h3>
              {loading.students ? (
                <p>Carregando...</p>
              ) : allStudents.length > 0 ? (
                <div className="students-grid">
                  {allStudents.map(student => (
                    <div key={student._id} className="student-card">
                      <div className="student-name">{student.name}</div>
                      <div className="student-email">{student.email}</div>
                      {student.className && (
                        <div className="student-class">
                          <i className="fas fa-chalkboard" style={{ marginRight: '5px' }}></i>
                          {student.className}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">
                  <i className="fas fa-info-circle" style={{ marginRight: '5px' }}></i>
                  Adicione alunos às suas turmas para visualizá-los aqui.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tasks Screen */}
        {activeScreen === 'tasks' && (
          <div className="screen active">
            {/* Criar Tarefa */}
            <div className="card">
              <h3 className="card-title">
                <i className="fas fa-plus-circle" style={{ marginRight: '8px', color: '#0275d8' }}></i>
                Criar Nova Tarefa
              </h3>
              <form onSubmit={handleCreateTask} className="task-form">
                <div className="form-group">
                  <label className="form-label">Título da Tarefa *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Lista de exercícios - Capítulo 5"
                    className="input"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Disciplina</label>
                    <input
                      type="text"
                      value={newTask.subject}
                      onChange={e => setNewTask(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Ex: Matemática"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Data de Entrega</label>
                    <input
                      type="date"
                      value={newTask.due_date}
                      onChange={e => setNewTask(prev => ({ ...prev, due_date: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Prioridade</label>
                    <select
                      value={newTask.priority}
                      onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                      className="input"
                    >
                      <option value="low">🟢 Baixa</option>
                      <option value="medium">🟡 Média</option>
                      <option value="high">🔴 Alta</option>
                      <option value="urgent">🟣 Urgente</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Descrição</label>
                  <textarea
                    value={newTask.description}
                    onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva os detalhes da tarefa, instruções, materiais necessários..."
                    className="input task-description"
                    rows="4"
                    style={{ resize: 'none', minHeight: '100px' }}
                  />
                </div>

                {/* Campo de Anexos */}
                <div className="form-group">
                  <label className="form-label">Anexos</label>
                  <div className="attachments-section">
                    <label className="attachment-btn">
                      <i className="fas fa-paperclip"></i>
                      <span>Adicionar arquivo</span>
                      <input
                        type="file"
                        multiple
                        onChange={e => {
                          const files = Array.from(e.target.files);
                          setNewTask(prev => ({
                            ...prev,
                            attachments: [...prev.attachments, ...files.map(f => ({ name: f.name, file: f }))]
                          }));
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {newTask.attachments.length > 0 && (
                      <div className="attachments-list">
                        {newTask.attachments.map((att, index) => (
                          <div key={index} className="attachment-item">
                            <i className="fas fa-file"></i>
                            <span>{att.name}</span>
                            <button
                              type="button"
                              className="btn-remove-attachment"
                              onClick={() => setNewTask(prev => ({
                                ...prev,
                                attachments: prev.attachments.filter((_, i) => i !== index)
                              }))}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Seleção de Alunos por Turma */}
                <div className="students-selection">
                  <label><strong>Atribuir para:</strong></label>
                  {classes.map(cls => (
                    <div key={cls._id} className="class-students-group">
                      <h4>{cls.name}</h4>
                      {classStudents[cls._id] ? (
                        classStudents[cls._id].map(s => s.user_id && (
                          <label key={s.user_id._id} className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={newTask.assigned_to.includes(s.user_id._id)}
                              onChange={() => toggleStudentSelection(s.user_id._id)}
                            />
                            {s.user_id.name}
                          </label>
                        ))
                      ) : (
                        <button type="button" className="btn btn-secondary btn-xs" onClick={() => loadClassStudents(cls._id)}>
                          Carregar alunos
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button type="submit" className="btn btn-primary">Criar Tarefa</button>
              </form>
            </div>

            {/* Lista de Tarefas */}
            <div className="card">
              <h3 className="card-title">Tarefas ({tasks.length})</h3>
              {loading.tasks ? (
                <p>Carregando...</p>
              ) : tasks.length > 0 ? (
                <div className="list">
                  {tasks.map(task => (
                    <div key={task._id} className="list-item">
                      <div className="list-item-content">
                        <div className="list-item-title">{task.title}</div>
                        <div className="list-item-subtitle">
                          {task.subject || 'Sem disciplina'} • 
                          Prazo: {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'Sem prazo'} • 
                          Prioridade: {task.priority} • 
                          {task.assigned_to?.length || 0} alunos
                        </div>
                        {task.description && <p className="list-item-desc">{task.description}</p>}
                      </div>
                      <div className="list-item-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => { setEditingTask(task); setShowEditTaskModal(true); }}>
                          Editar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleArchiveTask(task._id)}>
                          Arquivar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhuma tarefa</p>
              )}
            </div>
          </div>
        )}

        {/* Flashcards Screen */}
        {activeScreen === 'flashcards' && (
          <div className="screen active">
            {/* Criar Flashcard */}
            <div className="card">
              <h3 className="card-title">Criar Flashcard</h3>
              <form onSubmit={handleCreateFlashcard} className="form-grid">
                <input
                  type="text"
                  value={newFlashcard.question}
                  onChange={e => setNewFlashcard(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Pergunta"
                  className="input"
                  required
                />
                <input
                  type="text"
                  value={newFlashcard.answer}
                  onChange={e => setNewFlashcard(prev => ({ ...prev, answer: e.target.value }))}
                  placeholder="Resposta"
                  className="input"
                  required
                />
                <select
                  value={newFlashcard.class_id}
                  onChange={e => setNewFlashcard(prev => ({ ...prev, class_id: e.target.value }))}
                  className="input"
                >
                  <option value="">Flashcard Pessoal (sem turma)</option>
                  {classes.map(cls => (
                    <option key={cls._id} value={cls._id}>{cls.name} - {cls.subject}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newFlashcard.tags.join(', ')}
                  onChange={e => setNewFlashcard(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) }))}
                  placeholder="Tags (separadas por vírgula)"
                  className="input"
                />
                <button type="submit" className="btn btn-primary">Criar Flashcard</button>
              </form>
            </div>

            {/* Lista de Flashcards */}
            <div className="card">
              <h3 className="card-title">Flashcards ({flashcards.length})</h3>
              {loading.flashcards ? (
                <p>Carregando...</p>
              ) : flashcards.length > 0 ? (
                <div className="flashcard-grid">
                  {flashcards.map(card => (
                    <div 
                      key={card._id} 
                      className={`flashcard ${selectedCard === card._id ? 'flipped' : ''}`}
                      onClick={() => setSelectedCard(prev => prev === card._id ? null : card._id)}
                    >
                      <div className="flashcard-inner">
                        <div className="flashcard-front">{card.question}</div>
                        <div className="flashcard-back">{card.answer}</div>
                      </div>
                      <button
                        className="btn-edit-flashcard"
                        onClick={e => { e.stopPropagation(); setEditingFlashcard(card); setShowEditFlashcardModal(true); }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-delete-flashcard"
                        onClick={e => { e.stopPropagation(); handleDeleteFlashcard(card._id); }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum flashcard</p>
              )}
            </div>
          </div>
        )}

        {/* Reports Screen */}
        {activeScreen === 'reports' && (
          <div className="screen active">
            <div className="card">
              <div className="report-header-main">
                <div className="report-tabs">
                  <button 
                    className={`report-tab ${activeReportTab === 'classes' ? 'active' : ''}`}
                    onClick={() => setActiveReportTab('classes')}
                  >
                    <i className="fas fa-users"></i> Turmas
                  </button>
                  <button 
                    className={`report-tab ${activeReportTab === 'tasks' ? 'active' : ''}`}
                    onClick={() => setActiveReportTab('tasks')}
                  >
                    <i className="fas fa-tasks"></i> Tarefas
                  </button>
                  <button 
                    className={`report-tab ${activeReportTab === 'flashcards' ? 'active' : ''}`}
                    onClick={() => setActiveReportTab('flashcards')}
                  >
                    <i className="fas fa-clone"></i> Flashcards
                  </button>
                  <button 
                    className={`report-tab ${activeReportTab === 'students' ? 'active' : ''}`}
                    onClick={() => setActiveReportTab('students')}
                  >
                    <i className="fas fa-user-graduate"></i> Alunos
                  </button>
                </div>
                
                {/* Botão Exportar Relatório Completo */}
                <button 
                  className="export-complete-btn"
                  onClick={() => {
                    import('xlsx').then((XLSX) => {
                      // Criar workbook
                      const wb = XLSX.utils.book_new();
                      
                      // Aba de Turmas
                      const turmasData = classes.map(cls => ({
                        'Nome': cls.name,
                        'Disciplina': cls.subject,
                        'Ano Letivo': cls.academic_year,
                        'Alunos': cls.students?.filter(s => s.status === 'active' || !s.status).length || 0,
                        'Status': cls.status || 'active'
                      }));
                      const wsTurmas = XLSX.utils.json_to_sheet(turmasData);
                      XLSX.utils.book_append_sheet(wb, wsTurmas, 'Turmas');
                      
                      // Aba de Tarefas
                      const tarefasData = tasks.map(task => ({
                        'Título': task.title,
                        'Disciplina': task.subject || '-',
                        'Prioridade': task.priority === 'urgent' ? 'Urgente' : task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa',
                        'Data de Entrega': task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '-',
                        'Alunos Atribuídos': task.assigned_to?.length || 0
                      }));
                      const wsTarefas = XLSX.utils.json_to_sheet(tarefasData);
                      XLSX.utils.book_append_sheet(wb, wsTarefas, 'Tarefas');
                      
                      // Aba de Flashcards
                      const flashcardsData = flashcards.map(card => ({
                        'Pergunta': card.question,
                        'Resposta': card.answer,
                        'Tags': card.tags?.join(', ') || '-',
                        'Turma': classes.find(c => c._id === card.class_id)?.name || 'Pessoal'
                      }));
                      const wsFlashcards = XLSX.utils.json_to_sheet(flashcardsData);
                      XLSX.utils.book_append_sheet(wb, wsFlashcards, 'Flashcards');
                      
                      // Aba de Alunos
                      const alunosData = allStudents.map(student => ({
                        'Nome': student.name,
                        'Email': student.email,
                        'Turma': student.className || '-'
                      }));
                      const wsAlunos = XLSX.utils.json_to_sheet(alunosData);
                      XLSX.utils.book_append_sheet(wb, wsAlunos, 'Alunos');
                      
                      // Aba Resumo
                      const resumoData = [{
                        'Métrica': 'Total de Turmas',
                        'Valor': classes.length
                      }, {
                        'Métrica': 'Total de Alunos',
                        'Valor': allStudents.length
                      }, {
                        'Métrica': 'Total de Tarefas',
                        'Valor': tasks.length
                      }, {
                        'Métrica': 'Tarefas Urgentes',
                        'Valor': tasks.filter(t => t.priority === 'urgent').length
                      }, {
                        'Métrica': 'Total de Flashcards',
                        'Valor': flashcards.length
                      }, {
                        'Métrica': 'Flashcards em Turmas',
                        'Valor': flashcards.filter(f => f.class_id).length
                      }, {
                        'Métrica': 'Flashcards Pessoais',
                        'Valor': flashcards.filter(f => !f.class_id).length
                      }, {
                        'Métrica': 'Data do Relatório',
                        'Valor': new Date().toLocaleDateString('pt-BR')
                      }];
                      const wsResumo = XLSX.utils.json_to_sheet(resumoData);
                      XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');
                      
                      // Salvar arquivo
                      XLSX.writeFile(wb, `relatorio_completo_${new Date().toISOString().split('T')[0]}.xlsx`);
                      
                      setAlert({ message: 'Relatório completo exportado com sucesso!', type: 'success' });
                    });
                  }}
                >
                  <i className="fas fa-file-download"></i>
                  Exportar Relatório Completo
                </button>
              </div>
            </div>

            {/* Relatório de Turmas */}
            {activeReportTab === 'classes' && (
              <div className="report-content">
                <div className="card animated">
                  <div className="report-header">
                    <h3 className="card-title">
                      <i className="fas fa-users" style={{ marginRight: '8px', color: '#5cb85c' }}></i>
                      Relatório de Turmas
                    </h3>
                    <button className="export-button" onClick={() => {
                      // Exportar para Excel
                      const data = classes.map(cls => ({
                        'Nome': cls.name,
                        'Disciplina': cls.subject,
                        'Ano Letivo': cls.academic_year,
                        'Alunos': cls.students?.filter(s => s.status === 'active' || !s.status).length || 0,
                        'Status': cls.status || 'active'
                      }));
                      import('../lib/excelExport').then(({ exportToExcel }) => {
                        exportToExcel(data, 'relatorio_turmas');
                      });
                    }}>
                      <i className="fas fa-file-excel"></i> Exportar Excel
                    </button>
                  </div>
                  
                  <div className="chart-container" style={{ marginBottom: '20px' }}>
                    <PieChartComponent 
                      data={classes.map((cls, index) => ({
                        label: cls.name,
                        value: cls.students?.filter(s => s.status === 'active' || !s.status).length || 0,
                        color: ['#5cb85c', '#0275d8', '#d9534f', '#f0ad4e', '#5bc0de', '#6f42c1'][index % 6]
                      }))}
                      total={classes.reduce((sum, cls) => sum + (cls.students?.filter(s => s.status === 'active' || !s.status).length || 0), 0)}
                    />
                  </div>

                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Turma</th>
                        <th>Disciplina</th>
                        <th>Ano Letivo</th>
                        <th>Alunos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map(cls => (
                        <tr key={cls._id}>
                          <td>{cls.name}</td>
                          <td>{cls.subject}</td>
                          <td>{cls.academic_year}</td>
                          <td>{cls.students?.filter(s => s.status === 'active' || !s.status).length || 0}</td>
                        </tr>
                      ))}
                      {classes.length === 0 && (
                        <tr><td colSpan="4" style={{ textAlign: 'center' }}>Nenhuma turma encontrada</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Relatório de Tarefas */}
            {activeReportTab === 'tasks' && (
              <div className="report-content">
                <div className="card animated">
                  <div className="report-header">
                    <h3 className="card-title">
                      <i className="fas fa-tasks" style={{ marginRight: '8px', color: '#0275d8' }}></i>
                      Relatório de Tarefas
                    </h3>
                    <button className="export-button" onClick={() => {
                      const data = tasks.map(task => ({
                        'Título': task.title,
                        'Disciplina': task.subject || '-',
                        'Prioridade': task.priority,
                        'Data de Entrega': task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '-',
                        'Alunos Atribuídos': task.assigned_to?.length || 0
                      }));
                      import('../lib/excelExport').then(({ exportToExcel }) => {
                        exportToExcel(data, 'relatorio_tarefas');
                      });
                    }}>
                      <i className="fas fa-file-excel"></i> Exportar Excel
                    </button>
                  </div>
                  
                  <div className="chart-container" style={{ marginBottom: '20px' }}>
                    <BarChartComponent 
                      data={[
                        { label: 'Urgente', value: tasks.filter(t => t.priority === 'urgent').length, color: 'rgba(128, 0, 128, 0.7)', borderColor: 'rgba(128, 0, 128, 1)' },
                        { label: 'Alta', value: tasks.filter(t => t.priority === 'high').length, color: 'rgba(217, 83, 79, 0.7)', borderColor: 'rgba(217, 83, 79, 1)' },
                        { label: 'Média', value: tasks.filter(t => t.priority === 'medium').length, color: 'rgba(240, 173, 78, 0.7)', borderColor: 'rgba(240, 173, 78, 1)' },
                        { label: 'Baixa', value: tasks.filter(t => t.priority === 'low').length, color: 'rgba(92, 184, 92, 0.7)', borderColor: 'rgba(92, 184, 92, 1)' }
                      ]}
                    />
                  </div>

                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Disciplina</th>
                        <th>Prioridade</th>
                        <th>Data de Entrega</th>
                        <th>Alunos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map(task => (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.subject || '-'}</td>
                          <td>
                            <span className={`priority-badge priority-${task.priority}`}>
                              {task.priority === 'urgent' ? 'Urgente' : task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                            </span>
                          </td>
                          <td>{task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '-'}</td>
                          <td>{task.assigned_to?.length || 0}</td>
                        </tr>
                      ))}
                      {tasks.length === 0 && (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>Nenhuma tarefa encontrada</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Relatório de Flashcards */}
            {activeReportTab === 'flashcards' && (
              <div className="report-content">
                <div className="card animated">
                  <div className="report-header">
                    <h3 className="card-title">
                      <i className="fas fa-clone" style={{ marginRight: '8px', color: '#6f42c1' }}></i>
                      Relatório de Flashcards
                    </h3>
                    <button className="export-button" onClick={() => {
                      const data = flashcards.map(card => ({
                        'Pergunta': card.question,
                        'Resposta': card.answer,
                        'Tags': card.tags?.join(', ') || '-',
                        'Turma': classes.find(c => c._id === card.class_id)?.name || 'Pessoal',
                        'Tentativas': card.stats?.attempts || 0,
                        'Acertos': card.stats?.correct || 0
                      }));
                      import('../lib/excelExport').then(({ exportToExcel }) => {
                        exportToExcel(data, 'relatorio_flashcards');
                      });
                    }}>
                      <i className="fas fa-file-excel"></i> Exportar Excel
                    </button>
                  </div>
                  
                  <div className="quick-stats" style={{ marginBottom: '20px' }}>
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#6f42c1' }}>{flashcards.length}</span>
                      <span className="quick-stat-label">Total de Flashcards</span>
                    </div>
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#5cb85c' }}>{flashcards.filter(f => f.class_id).length}</span>
                      <span className="quick-stat-label">Em Turmas</span>
                    </div>
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#0275d8' }}>{flashcards.filter(f => !f.class_id).length}</span>
                      <span className="quick-stat-label">Pessoais</span>
                    </div>
                  </div>

                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Pergunta</th>
                        <th>Turma</th>
                        <th>Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flashcards.map(card => (
                        <tr key={card._id}>
                          <td>{card.question.substring(0, 50)}{card.question.length > 50 ? '...' : ''}</td>
                          <td>{classes.find(c => c._id === card.class_id)?.name || 'Pessoal'}</td>
                          <td>{card.tags?.join(', ') || '-'}</td>
                        </tr>
                      ))}
                      {flashcards.length === 0 && (
                        <tr><td colSpan="3" style={{ textAlign: 'center' }}>Nenhum flashcard encontrado</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Relatório de Alunos */}
            {activeReportTab === 'students' && (
              <div className="report-content">
                <div className="card animated">
                  <div className="report-header">
                    <h3 className="card-title">
                      <i className="fas fa-user-graduate" style={{ marginRight: '8px', color: '#f0ad4e' }}></i>
                      Relatório de Alunos
                    </h3>
                    <button className="export-button" onClick={() => {
                      const data = allStudents.map(student => ({
                        'Nome': student.name,
                        'Email': student.email,
                        'Turma': student.className || '-'
                      }));
                      import('../lib/excelExport').then(({ exportToExcel }) => {
                        exportToExcel(data, 'relatorio_alunos');
                      });
                    }}>
                      <i className="fas fa-file-excel"></i> Exportar Excel
                    </button>
                  </div>
                  
                  <div className="quick-stats" style={{ marginBottom: '20px' }}>
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#f0ad4e' }}>{allStudents.length}</span>
                      <span className="quick-stat-label">Total de Alunos</span>
                    </div>
                    <div className="quick-stat-item">
                      <span className="quick-stat-value" style={{ color: '#5cb85c' }}>{classes.length}</span>
                      <span className="quick-stat-label">Turmas</span>
                    </div>
                  </div>

                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Turma</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allStudents.map(student => (
                        <tr key={student._id}>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                          <td>{student.className || '-'}</td>
                        </tr>
                      ))}
                      {allStudents.length === 0 && (
                        <tr><td colSpan="3" style={{ textAlign: 'center' }}>Nenhum aluno encontrado</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Editar Turma */}
      {showEditClassModal && editingClass && (
        <div className="modal" onClick={() => setShowEditClassModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowEditClassModal(false)}>&times;</button>
            <h3>Editar Turma</h3>
            <form onSubmit={handleUpdateClass} className="form-grid">
              <input
                type="text"
                value={editingClass.name}
                onChange={e => setEditingClass(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome"
                className="input"
                required
              />
              <input
                type="text"
                value={editingClass.subject}
                onChange={e => setEditingClass(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Disciplina"
                className="input"
                required
              />
              <input
                type="text"
                value={editingClass.academic_year}
                onChange={e => setEditingClass(prev => ({ ...prev, academic_year: e.target.value }))}
                placeholder="Ano acadêmico"
                className="input"
              />
              <textarea
                value={editingClass.description || ''}
                onChange={e => setEditingClass(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição"
                className="input"
                rows="2"
              />
              <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Tarefa */}
      {showEditTaskModal && editingTask && (
        <div className="modal" onClick={() => setShowEditTaskModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowEditTaskModal(false)}>&times;</button>
            <h3>Editar Tarefa</h3>
            <form onSubmit={handleUpdateTask} className="form-grid">
              <input
                type="text"
                value={editingTask.title}
                onChange={e => setEditingTask(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Título"
                className="input"
                required
              />
              <input
                type="text"
                value={editingTask.subject || ''}
                onChange={e => setEditingTask(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Disciplina"
                className="input"
              />
              <input
                type="date"
                value={editingTask.due_date ? new Date(editingTask.due_date).toISOString().split('T')[0] : ''}
                onChange={e => setEditingTask(prev => ({ ...prev, due_date: e.target.value }))}
                className="input"
              />
              <select
                value={editingTask.priority}
                onChange={e => setEditingTask(prev => ({ ...prev, priority: e.target.value }))}
                className="input"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
              <textarea
                value={editingTask.description || ''}
                onChange={e => setEditingTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição"
                className="input"
                rows="2"
              />
              <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Flashcard */}
      {showEditFlashcardModal && editingFlashcard && (
        <div className="modal" onClick={() => setShowEditFlashcardModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowEditFlashcardModal(false)}>&times;</button>
            <h3>Editar Flashcard</h3>
            <form onSubmit={handleUpdateFlashcard} className="form-grid">
              <input
                type="text"
                value={editingFlashcard.question}
                onChange={e => setEditingFlashcard(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Pergunta"
                className="input"
                required
              />
              <input
                type="text"
                value={editingFlashcard.answer}
                onChange={e => setEditingFlashcard(prev => ({ ...prev, answer: e.target.value }))}
                placeholder="Resposta"
                className="input"
                required
              />
              <input
                type="text"
                value={editingFlashcard.tags?.join(', ') || ''}
                onChange={e => setEditingFlashcard(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) }))}
                placeholder="Tags"
                className="input"
              />
              <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Perfil */}
      {showProfileModal && (
        <div className="profile-modal" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowProfileModal(false)}>&times;</button>
            <div className="profile-modal-header">
              <div className="profile-modal-img-container">
                <img src={profileImage} alt="Professor" className="profile-modal-img" />
                <button
                  className="profile-img-upload-btn"
                  title="Alterar foto"
                  onClick={() => document.getElementById('profile-image-upload-prof').click()}
                  style={{ display: editProfile ? 'flex' : 'none' }}
                >
                  <i className="fas fa-camera"></i>
                </button>
                <input
                  id="profile-image-upload-prof"
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
                      value={profileData.name}
                      onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="profile-name-input"
                    />
                  ) : (
                    <h3>{user?.name || 'Professor'}</h3>
                  )}
                </div>
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
                    value={profileData.name}
                    onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
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
                <div className="theme-toggle-switch">
                  <div className={`theme-toggle-slider ${darkMode ? 'dark' : 'light'}`}>
                    <i className={`theme-toggle-icon ${darkMode ? 'fas fa-moon' : 'fas fa-sun'}`}></i>
                  </div>
                </div>
                <span className="theme-toggle-label">
                  {darkMode ? "Modo Escuro" : "Modo Claro"}
                </span>
              </button>
              {editProfile ? (
                <>
                  <button className="btn btn-secondary" onClick={() => { setEditProfile(false); setProfileData({ name: user?.name || '' }); }}>
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveProfile}>Salvar</button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary" onClick={() => setEditProfile(true)}>Editar Perfil</button>
                  <button className="btn btn-primary" onClick={onLogout}>Sair</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Alert */}
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </div>
  );
}

// ==================== ESTILOS ====================
const styles = document.createElement('style');
styles.innerHTML = `
  /* Container Principal */
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  /* Sidebar */
  .sidebar {
    width: 260px;
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    color: white;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    box-shadow: 3px 0 10px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .logo {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .logo h1 {
    margin: 0;
    font-size: 1.8rem;
  }

  .logo h1 span {
    color: #ffc107;
  }

  .menu {
    flex: 1;
    padding: 20px 0;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    margin: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255,255,255,0.8);
  }

  .menu-item i {
    font-size: 1.1rem;
    width: 20px;
    text-align: center;
  }

  .menu-item:hover, .menu-item.active {
    background: rgba(255,255,255,0.2);
    color: white;
  }

  .profile {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
  }

  .profile:hover {
    background: rgba(255,255,255,0.1);
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .profile-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f8f9fa;
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
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .page-title {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color, #333);
  }

  .screen {
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Stats */
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    text-align: center;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }

  .stat-icon {
    font-size: 2rem;
    color: var(--primary-color, #d9534f);
    margin-bottom: 10px;
    opacity: 0.8;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color, #d9534f);
  }

  .stat-label {
    color: #666;
    font-size: 0.9rem;
    margin-top: 5px;
  }

  /* Cards */
  .card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  .card-title {
    margin: 0 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    color: var(--text-color, #333);
  }

  /* Dashboard Grid */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .chart-placeholder {
    text-align: center;
    color: #999;
    padding: 50px 0;
  }

  /* Forms */
  .form-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-row {
    display: flex;
    gap: 10px;
  }

  .input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    flex: 1;
  }

  .input:focus {
    outline: none;
    border-color: #d9534f;
  }

  /* Buttons */
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: #d9534f;
    color: white;
  }

  .btn-primary:hover {
    background: #c9302c;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background: #5a6268;
  }

  .btn-danger {
    background: #dc3545;
    color: white;
  }

  .btn-danger:hover {
    background: #c82333;
  }

  .btn-sm {
    padding: 5px 10px;
    font-size: 12px;
  }

  .btn-xs {
    padding: 3px 8px;
    font-size: 11px;
  }

  /* Lists */
  .list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .list-item {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fafafa;
  }

  .list-item-content {
    flex: 1;
  }

  .list-item-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }

  .list-item-subtitle {
    font-size: 0.9rem;
    color: #666;
  }

  .list-item-desc {
    font-size: 0.85rem;
    color: #888;
    margin: 5px 0;
  }

  .list-item-actions {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }

  /* Add Student Row */
  .add-student-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .add-student-row .input {
    flex: 1;
  }

  /* Students */
  .students-in-class {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }

  .students-in-class h4 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 0.9rem;
  }

  .students-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .student-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    background: white;
    border-radius: 4px;
  }

  .student-email {
    flex: 1;
    color: #888;
    font-size: 0.85rem;
  }

  /* ==================== ESTILOS TURMAS DO PROFESSOR ==================== */
  
  .loading-text {
    text-align: center;
    padding: 20px;
    color: #666;
  }

  .teacher-classes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .teacher-class-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
    border: 1px solid #e9ecef;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .teacher-class-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  .class-card-header {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 15px;
  }

  .class-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .class-title-section {
    flex: 1;
  }

  .class-title {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }

  .class-subject-badge {
    display: inline-block;
    background: linear-gradient(135deg, #0275d8 0%, #025aa5 100%);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .class-card-stats {
    display: flex;
    gap: 20px;
    margin-bottom: 12px;
    padding: 12px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .class-stat {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #555;
  }

  .class-stat i {
    color: #5cb85c;
    width: 18px;
  }

  .class-description {
    font-size: 0.85rem;
    color: #666;
    margin: 0 0 15px 0;
    line-height: 1.5;
  }

  .add-student-section {
    margin-bottom: 15px;
  }

  .add-student-input-group {
    display: flex;
    gap: 8px;
  }

  .add-student-input {
    flex: 1;
    font-size: 0.85rem !important;
    padding: 8px 12px !important;
  }

  .btn-add-student {
    background: linear-gradient(135deg, #5cb85c 0%, #449d44 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 15px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-add-student:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 10px rgba(92, 184, 92, 0.3);
  }

  .class-card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .class-action-btn {
    flex: 1;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .class-action-btn.edit {
    background: #f0f0f0;
    color: #555;
  }

  .class-action-btn.edit:hover {
    background: #0275d8;
    color: white;
  }

  .class-action-btn.view {
    background: #f0f0f0;
    color: #555;
  }

  .class-action-btn.view:hover {
    background: #5cb85c;
    color: white;
  }

  .class-action-btn.archive {
    background: #f0f0f0;
    color: #555;
  }

  .class-action-btn.archive:hover {
    background: #d9534f;
    color: white;
  }

  /* ==================== ESTILOS FORMULÁRIO DE TAREFAS ==================== */

  .task-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  .task-description {
    font-family: inherit;
    line-height: 1.5;
  }

  .attachments-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .attachment-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 2px dashed #ccc;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #666;
    font-weight: 500;
  }

  .attachment-btn:hover {
    border-color: #0275d8;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    color: #0275d8;
  }

  .attachment-btn i {
    font-size: 1.2rem;
  }

  .attachments-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .attachment-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #e3f2fd;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #1976d2;
  }

  .attachment-item i {
    color: #1976d2;
  }

  .btn-remove-attachment {
    background: none;
    border: none;
    color: #d9534f;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .btn-remove-attachment:hover {
    background: #ffebee;
  }

  /* Dark Theme - Turmas e Formulário */
  .dark-theme .teacher-class-card {
    background: linear-gradient(145deg, #2d2d2d 0%, #252525 100%);
    border-color: #444;
  }

  .dark-theme .class-title {
    color: #e0e0e0;
  }

  .dark-theme .class-stat,
  .dark-theme .class-description {
    color: #aaa;
  }

  .dark-theme .class-card-stats {
    border-color: #444;
  }

  .dark-theme .class-action-btn.edit,
  .dark-theme .class-action-btn.view,
  .dark-theme .class-action-btn.archive {
    background: #3d3d3d;
    color: #ccc;
  }

  .dark-theme .form-label {
    color: #e0e0e0;
  }

  .dark-theme .attachment-btn {
    background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%);
    border-color: #555;
    color: #aaa;
  }

  .dark-theme .attachment-btn:hover {
    border-color: #0275d8;
    background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);
    color: #64b5f6;
  }

  .dark-theme .attachment-item {
    background: #1e3a5f;
    color: #64b5f6;
  }

  @media (max-width: 768px) {
    .teacher-classes-grid {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .class-card-actions {
      flex-direction: column;
    }

    .class-action-btn {
      width: 100%;
    }
  }

  .students-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }

  .student-card {
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .student-name {
    font-weight: 500;
  }

  .student-class {
    font-size: 0.8rem;
    color: #5cb85c;
    margin-top: 4px;
    display: flex;
    align-items: center;
  }

  .empty-message {
    color: #999;
    font-style: italic;
    padding: 20px;
    text-align: center;
  }

  /* Students Selection */
  .students-selection {
    margin: 10px 0;
  }

  .class-students-group {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .class-students-group h4 {
    margin: 0 0 10px 0;
    font-size: 0.9rem;
  }

  .checkbox-label {
    display: block;
    margin: 5px 0;
    cursor: pointer;
  }

  .checkbox-label input {
    margin-right: 8px;
  }

  /* Flashcards */
  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .flashcard {
    height: 200px;
    perspective: 1000px;
    cursor: pointer;
    position: relative;
  }

  .flashcard-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    font-weight: 500;
  }

  .flashcard-front {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    color: #333;
  }

  .flashcard-back {
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    color: white;
    transform: rotateY(180deg);
  }

  .btn-edit-flashcard, .btn-delete-flashcard {
    position: absolute;
    top: 10px;
    background: rgba(255,255,255,0.9);
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-edit-flashcard {
    left: 10px;
  }

  .btn-delete-flashcard {
    right: 10px;
  }

  .btn-edit-flashcard:hover {
    background: #ffc107;
    color: white;
  }

  .btn-delete-flashcard:hover {
    background: #dc3545;
    color: white;
  }

  /* Modals */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .close-modal {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  /* Profile Modal */
  .profile-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .profile-modal-content {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .profile-modal-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .profile-modal-img-container {
    position: relative;
    display: inline-block;
    margin-right: 1rem;
  }

  .profile-modal-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #d9534f;
    object-fit: cover;
  }

  .profile-img-upload-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 28px;
    height: 28px;
    background: #d9534f;
    border: 2px solid white;
    border-radius: 50%;
    color: white;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .profile-img-upload-btn:hover {
    background: #c9302c;
    transform: scale(1.1);
  }

  .profile-modal-info h3 {
    margin: 0;
    color: var(--text-color, #333);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .profile-modal-info p {
    margin: 0.25rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .profile-name-input {
    font-size: 1.5rem;
    font-weight: 700;
    padding: 8px 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    width: 100%;
  }

  .profile-name-input:focus {
    outline: none;
    border-color: #d9534f;
    box-shadow: 0 0 0 3px rgba(217, 83, 79, 0.2);
  }

  .profile-modal-details {
    margin-top: 1.5rem;
  }

  .profile-modal-details > div {
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #eee;
  }

  .profile-modal-details label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
    font-size: 0.85rem;
  }

  .profile-modal-details span {
    color: #666;
    font-size: 1rem;
  }

  .profile-input {
    width: 100%;
    padding: 8px 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
  }

  .profile-input:focus {
    outline: none;
    border-color: #d9534f;
    box-shadow: 0 0 0 3px rgba(217, 83, 79, 0.2);
  }

  .profile-modal-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* Theme Toggle Button */
  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .theme-toggle-btn:hover {
    background: #e8e8e8;
  }

  .theme-toggle-switch {
    width: 40px;
    height: 22px;
    background: #ddd;
    border-radius: 11px;
    position: relative;
  }

  .theme-toggle-slider {
    position: absolute;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    top: 2px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .theme-toggle-slider.light {
    left: 2px;
    background: #ffc107;
  }

  .theme-toggle-slider.dark {
    left: 20px;
    background: #333;
  }

  .theme-toggle-icon {
    font-size: 10px;
    color: white;
  }

  .theme-toggle-label {
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* Sidebar Overlay */
  .sidebar-overlay {
    display: none;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      left: -260px;
      transition: left 0.3s ease;
    }

    .sidebar.open {
      left: 0;
    }

    .sidebar-overlay {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }

    .menu-toggle {
      display: block;
    }

    .main-content {
      width: 100%;
    }

    .input-row {
      flex-direction: column;
    }

    .add-student-row {
      flex-direction: column;
    }
  }

  /* Dark Theme */
  .dark-theme .main-content {
    background: #121212;
  }

  .dark-theme .card {
    background: #1e1e1e;
    border-color: #333;
  }

  .dark-theme .card-title,
  .dark-theme .page-title,
  .dark-theme .list-item-title {
    color: #e0e0e0;
  }

  .dark-theme .list-item {
    background: #2d2d2d;
    border-color: #444;
  }

  .dark-theme .list-item-subtitle,
  .dark-theme .list-item-desc,
  .dark-theme .stat-label {
    color: #aaa;
  }

  .dark-theme .input {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }

  .dark-theme .student-card,
  .dark-theme .student-item {
    background: #2d2d2d;
  }

  .dark-theme .flashcard-front {
    background: linear-gradient(135deg, #2d2d2d, #1e1e1e);
    color: #e0e0e0;
  }

  .dark-theme .modal-content {
    background: #1e1e1e;
    color: #e0e0e0;
  }

  .dark-theme .class-students-group {
    border-color: #444;
  }

  /* Dark Theme - Profile Modal */
  .dark-theme .profile-modal-content {
    background: #1e1e1e;
    color: #e0e0e0;
  }

  .dark-theme .profile-modal-info h3 {
    color: #e0e0e0;
  }

  .dark-theme .profile-modal-info p {
    color: #aaa;
  }

  .dark-theme .profile-modal-details > div {
    border-bottom-color: #444;
  }

  .dark-theme .profile-modal-details label {
    color: #e0e0e0;
  }

  .dark-theme .profile-modal-details span {
    color: #aaa;
  }

  .dark-theme .profile-name-input,
  .dark-theme .profile-input {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }

  .dark-theme .theme-toggle-btn {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }

  .dark-theme .theme-toggle-btn:hover {
    background: #3d3d3d;
  }

  /* ==================== ESTILOS DOS NOVOS GRÁFICOS ==================== */
  
  .card.animated {
    animation: slideInUp 0.5s ease forwards;
    opacity: 0;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-title i {
    font-size: 1rem;
  }

  .chart-placeholder {
    text-align: center;
    color: #999;
    padding: 40px 20px;
    font-style: italic;
  }

  /* Quick Stats */
  .quick-stats {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
  }

  .quick-stat-item {
    text-align: center;
    padding: 15px;
  }

  .quick-stat-value {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .quick-stat-label {
    display: block;
    font-size: 0.85rem;
    color: #666;
    margin-top: 5px;
  }

  /* Report Styles */
  .report-header-main {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .export-complete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 24px;
    background: linear-gradient(135deg, #6f42c1 0%, #563d7c 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(111, 66, 193, 0.3);
  }

  .export-complete-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(111, 66, 193, 0.4);
  }

  .export-complete-btn i {
    font-size: 1.1rem;
  }

  .report-tabs {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .report-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .report-tab:hover {
    background: #e9ecef;
  }

  .report-tab.active {
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    color: white;
    border-color: #d9534f;
  }

  .report-tab i {
    font-size: 1rem;
  }

  .report-content {
    margin-top: 20px;
  }

  .report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
  }

  .export-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #5cb85c 0%, #449d44 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .export-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(92, 184, 92, 0.3);
  }

  .report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }

  .report-table th,
  .report-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  .report-table th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
  }

  .report-table tr:hover {
    background: #f8f9fa;
  }

  .priority-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .priority-badge.priority-urgent {
    background: rgba(128, 0, 128, 0.15);
    color: purple;
  }

  .priority-badge.priority-high {
    background: rgba(217, 83, 79, 0.15);
    color: #d9534f;
  }

  .priority-badge.priority-medium {
    background: rgba(240, 173, 78, 0.15);
    color: #f0ad4e;
  }

  .priority-badge.priority-low {
    background: rgba(92, 184, 92, 0.15);
    color: #5cb85c;
  }

  .chart-container {
    max-width: 400px;
    margin: 0 auto;
  }

  /* Dark Theme - Reports */
  .dark-theme .export-complete-btn {
    background: linear-gradient(135deg, #7c4dff 0%, #651fff 100%);
  }

  .dark-theme .report-tab {
    background: #2d2d2d;
    color: #e0e0e0;
  }

  .dark-theme .report-tab:hover {
    background: #3d3d3d;
  }

  .dark-theme .report-tab.active {
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    color: white;
  }

  .dark-theme .report-table th {
    background: #2d2d2d;
    color: #e0e0e0;
  }

  .dark-theme .report-table td {
    border-color: #444;
  }

  .dark-theme .report-table tr:hover {
    background: #2d2d2d;
  }

  /* Responsive Reports */
  @media (max-width: 768px) {
    .report-tabs {
      flex-direction: column;
    }

    .report-tab {
      width: 100%;
      justify-content: center;
    }

    .report-header {
      flex-direction: column;
      align-items: stretch;
    }

    .export-button {
      width: 100%;
      justify-content: center;
    }

    .report-table {
      display: block;
      overflow-x: auto;
    }
  }

  /* Upcoming Tasks */
  .upcoming-tasks {
    padding: 10px 0;
  }

  .upcoming-task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: all 0.2s ease;
  }

  .upcoming-task-item:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }

  .upcoming-task-title {
    font-weight: 500;
    color: #333;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .upcoming-task-date {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.85rem;
    color: #666;
    background: #fff;
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid #ddd;
  }

  .upcoming-task-date i {
    color: #f0ad4e;
  }

  .no-upcoming {
    text-align: center;
    color: #999;
    padding: 20px;
    font-style: italic;
  }

  /* Dark Theme - Novos elementos */
  .dark-theme .quick-stat-label {
    color: #aaa;
  }

  .dark-theme .upcoming-task-item {
    background: #2d2d2d;
  }

  .dark-theme .upcoming-task-item:hover {
    background: #3d3d3d;
  }

  .dark-theme .upcoming-task-title {
    color: #e0e0e0;
  }

  .dark-theme .upcoming-task-date {
    background: #1e1e1e;
    border-color: #444;
    color: #aaa;
  }

  .dark-theme .chart-placeholder,
  .dark-theme .no-upcoming {
    color: #777;
  }
`;
document.head.appendChild(styles);

export default DashboardProfessor;
