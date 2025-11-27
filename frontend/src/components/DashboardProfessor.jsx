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
import { Pie } from 'react-chartjs-2';
import { authAPI, taskAPI, flashcardAPI, classAPI, userAPI } from '../lib/api';
import CustomAlert from './CustomAlert';

// Registrar componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// ==================== DADOS MOCKADOS ====================
const MOCK_CLASSES = [
  {
    _id: 'class1',
    name: 'Turma A - Manhã',
    subject: 'Matemática',
    description: 'Turma do 3º ano do ensino médio, período matutino',
    academic_year: '2025',
    students: [{ status: 'active' }, { status: 'active' }, { status: 'active' }]
  },
  {
    _id: 'class2',
    name: 'Turma B - Tarde',
    subject: 'Física',
    description: 'Turma do 2º ano, foco em mecânica e termodinâmica',
    academic_year: '2025',
    students: [{ status: 'active' }, { status: 'active' }]
  },
  {
    _id: 'class3',
    name: 'Turma C - Noite',
    subject: 'Química',
    description: 'EJA - Educação de Jovens e Adultos',
    academic_year: '2025',
    students: [{ status: 'active' }, { status: 'active' }, { status: 'active' }, { status: 'active' }]
  }
];

const MOCK_STUDENTS = [
  { _id: 'student1', name: 'Ana Silva', email: 'ana.silva@escola.com', grade: '3º Ano' },
  { _id: 'student2', name: 'Bruno Santos', email: 'bruno.santos@escola.com', grade: '3º Ano' },
  { _id: 'student3', name: 'Carla Oliveira', email: 'carla.oliveira@escola.com', grade: '2º Ano' },
  { _id: 'student4', name: 'Daniel Costa', email: 'daniel.costa@escola.com', grade: '2º Ano' },
  { _id: 'student5', name: 'Elena Ferreira', email: 'elena.ferreira@escola.com', grade: '3º Ano' },
  { _id: 'student6', name: 'Felipe Almeida', email: 'felipe.almeida@escola.com', grade: 'EJA' },
  { _id: 'student7', name: 'Gabriela Lima', email: 'gabriela.lima@escola.com', grade: 'EJA' },
  { _id: 'student8', name: 'Hugo Pereira', email: 'hugo.pereira@escola.com', grade: 'EJA' },
  { _id: 'student9', name: 'Isabela Rocha', email: 'isabela.rocha@escola.com', grade: 'EJA' }
];

const MOCK_CLASS_STUDENTS = {
  'class1': [
    { user_id: { _id: 'student1', name: 'Ana Silva', email: 'ana.silva@escola.com' }, status: 'active' },
    { user_id: { _id: 'student2', name: 'Bruno Santos', email: 'bruno.santos@escola.com' }, status: 'active' },
    { user_id: { _id: 'student5', name: 'Elena Ferreira', email: 'elena.ferreira@escola.com' }, status: 'active' }
  ],
  'class2': [
    { user_id: { _id: 'student3', name: 'Carla Oliveira', email: 'carla.oliveira@escola.com' }, status: 'active' },
    { user_id: { _id: 'student4', name: 'Daniel Costa', email: 'daniel.costa@escola.com' }, status: 'active' }
  ],
  'class3': [
    { user_id: { _id: 'student6', name: 'Felipe Almeida', email: 'felipe.almeida@escola.com' }, status: 'active' },
    { user_id: { _id: 'student7', name: 'Gabriela Lima', email: 'gabriela.lima@escola.com' }, status: 'active' },
    { user_id: { _id: 'student8', name: 'Hugo Pereira', email: 'hugo.pereira@escola.com' }, status: 'active' },
    { user_id: { _id: 'student9', name: 'Isabela Rocha', email: 'isabela.rocha@escola.com' }, status: 'active' }
  ]
};

const MOCK_TASKS = [
  {
    _id: 'task1',
    title: 'Lista de Exercícios - Equações do 2º Grau',
    subject: 'Matemática',
    due_date: '2025-12-05',
    priority: 'high',
    description: 'Resolver os exercícios 1 a 20 da página 145 do livro',
    assigned_to: ['student1', 'student2', 'student5']
  },
  {
    _id: 'task2',
    title: 'Relatório de Laboratório - Queda Livre',
    subject: 'Física',
    due_date: '2025-12-10',
    priority: 'medium',
    description: 'Elaborar relatório do experimento realizado em aula',
    assigned_to: ['student3', 'student4']
  },
  {
    _id: 'task3',
    title: 'Trabalho em Grupo - Tabela Periódica',
    subject: 'Química',
    due_date: '2025-12-15',
    priority: 'low',
    description: 'Apresentação sobre elementos químicos e suas aplicações',
    assigned_to: ['student6', 'student7', 'student8', 'student9']
  },
  {
    _id: 'task4',
    title: 'Prova Bimestral',
    subject: 'Matemática',
    due_date: '2025-12-20',
    priority: 'urgent',
    description: 'Conteúdo: Trigonometria, Funções e Geometria Analítica',
    assigned_to: ['student1', 'student2', 'student5']
  }
];

const MOCK_FLASHCARDS = [
  { _id: 'flash1', question: 'Qual é a fórmula de Bhaskara?', answer: 'x = (-b ± √(b²-4ac)) / 2a', tags: ['matemática', 'equações'] },
  { _id: 'flash2', question: 'O que é a 2ª Lei de Newton?', answer: 'F = m × a (Força = massa × aceleração)', tags: ['física', 'mecânica'] },
  { _id: 'flash3', question: 'Qual é o número atômico do Carbono?', answer: '6', tags: ['química', 'tabela periódica'] },
  { _id: 'flash4', question: 'O que é um logaritmo?', answer: 'O expoente ao qual uma base deve ser elevada para produzir um número dado', tags: ['matemática', 'logaritmos'] },
  { _id: 'flash5', question: 'Qual a velocidade da luz no vácuo?', answer: '299.792.458 m/s (aproximadamente 3×10⁸ m/s)', tags: ['física', 'óptica'] },
  { _id: 'flash6', question: 'O que é uma ligação covalente?', answer: 'Ligação química onde átomos compartilham pares de elétrons', tags: ['química', 'ligações'] }
];

const MOCK_STATS = {
  totalClasses: 3,
  totalStudents: 9,
  totalTasks: 4,
  totalFlashcards: 6
};

const MOCK_CHART_DATA = {
  classDistribution: {
    labels: ['Turma A - Manhã', 'Turma B - Tarde', 'Turma C - Noite'],
    datasets: [{
      label: 'Alunos por Turma',
      data: [3, 2, 4],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  }
};

// ==================== COMPONENTE ====================
function DashboardProfessor({ user, darkMode, toggleDarkMode, onLogout }) {
  // ==================== ESTADOS ====================
  // Navegação
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Perfil
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: user?.name || 'Professor Demo' });
  const [profileImage, setProfileImage] = useState(user?.profilePicture || 'https://i.pravatar.cc/40?u=professor');
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Turmas - Inicializado com dados mock
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [newClass, setNewClass] = useState({
    name: '',
    subject: '',
    description: '',
    academic_year: new Date().getFullYear().toString()
  });
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [studentEmailInputs, setStudentEmailInputs] = useState({});

  // Alunos - Inicializado com dados mock
  const [allStudents, setAllStudents] = useState(MOCK_STUDENTS);
  const [classStudents, setClassStudents] = useState(MOCK_CLASS_STUDENTS);

  // Tarefas - Inicializado com dados mock
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    due_date: '',
    priority: 'medium',
    description: '',
    assigned_to: []
  });
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Flashcards - Inicializado com dados mock
  const [flashcards, setFlashcards] = useState(MOCK_FLASHCARDS);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', tags: [] });
  const [showEditFlashcardModal, setShowEditFlashcardModal] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  // Estatísticas - Inicializado com dados mock
  const [stats, setStats] = useState(MOCK_STATS);

  // Gráficos - Inicializado com dados mock
  const [chartData, setChartData] = useState(MOCK_CHART_DATA);

  // Loading
  const [loading, setLoading] = useState({
    classes: false,
    students: false,
    tasks: false,
    flashcards: false
  });

  // Alert
  const [alert, setAlert] = useState(null);

  // ==================== FUNÇÕES DE CARREGAMENTO ====================
  
  // Carregar turmas do professor
  const loadClasses = useCallback(async () => {
    if (!user?._id) return;
    
    setLoading(prev => ({ ...prev, classes: true }));
    try {
      const response = await classAPI.getClassesByTeacher(user._id);
      const classesData = response.data?.classes || [];
      setClasses(Array.isArray(classesData) ? classesData : []);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
      setAlert({ message: 'Erro ao carregar turmas: ' + error.message, type: 'error' });
    } finally {
      setLoading(prev => ({ ...prev, classes: false }));
    }
  }, [user?._id]);

  // Carregar todos os alunos da escola
  const loadAllStudents = useCallback(async () => {
    if (!user?.school_id) return;
    
    setLoading(prev => ({ ...prev, students: true }));
    try {
      const response = await userAPI.getUsers({ role: 'student', school_id: user.school_id });
      const students = response.data || [];
      setAllStudents(students.map(s => ({
        _id: s._id,
        name: s.name,
        email: s.email,
        grade: s.academic?.grade || 'N/A',
        studentId: s.academic?.studentId || 'N/A'
      })));
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    } finally {
      setLoading(prev => ({ ...prev, students: false }));
    }
  }, [user?.school_id]);

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
    if (!user?._id) return;
    
    setLoading(prev => ({ ...prev, tasks: true }));
    try {
      const response = await taskAPI.getTasksByTeacher(user._id);
      setTasks(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  }, [user?._id]);

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
    if (!user?._id) return;
    
    try {
      const [classesRes, tasksRes, flashcardsRes] = await Promise.allSettled([
        classAPI.getClassesByTeacher(user._id),
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
        t.created_by?._id === user._id || t.created_by === user._id
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

      // Dados para gráfico
      if (classesData.length > 0) {
        setChartData({
          classDistribution: {
            labels: classesData.map(c => c.name),
            datasets: [{
              label: 'Alunos por Turma',
              data: classesData.map(c => c.students?.filter(s => s.status === 'active' || !s.status).length || 0),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }]
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  }, [user?._id]);

  // ==================== FUNÇÕES DE TURMAS ====================

  // Criar turma
  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!newClass.name.trim() || !newClass.subject.trim()) {
      setAlert({ message: 'Nome e disciplina são obrigatórios', type: 'error' });
      return;
    }

    try {
      const response = await classAPI.createClass({
        name: newClass.name,
        subject: newClass.subject,
        description: newClass.description,
        academic_year: newClass.academic_year,
        teacher_id: user._id,
        school_id: user.school_id
      });
      
      const createdClass = response.data?.class || response.data;
      setClasses(prev => [...prev, createdClass]);
      setNewClass({ name: '', subject: '', description: '', academic_year: new Date().getFullYear().toString() });
      setAlert({ message: 'Turma criada com sucesso!', type: 'success' });
      loadStats();
    } catch (error) {
      setAlert({ message: 'Erro ao criar turma: ' + error.message, type: 'error' });
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
      const usersResponse = await userAPI.getUsers({ email, school_id: user.school_id });
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
        created_by: user._id,
        school_id: user.school_id,
        assigned_to: newTask.assigned_to
      });
      
      setNewTask({ title: '', subject: '', due_date: '', priority: 'medium', description: '', assigned_to: [] });
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
        user_id: user._id,
        school_id: user.school_id
      });
      
      setFlashcards(prev => [...prev, response.data]);
      setNewFlashcard({ question: '', answer: '', tags: [] });
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

      const updatedUser = { ...user, name: response.data.user.name, profilePicture: response.data.user.profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));
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
      setProfileImageFile(file);
    }
  };

  // ==================== EFFECT ====================
  
  useEffect(() => {
    if (user?._id && user?.school_id) {
      loadClasses();
      loadAllStudents();
      loadTasks();
      loadFlashcards();
      loadStats();
    }
  }, [user, loadClasses, loadAllStudents, loadTasks, loadFlashcards, loadStats]);

  // ==================== COMPONENTES ====================

  const PieChartComponent = ({ data }) => (
    <div style={{ height: '200px', width: '100%' }}>
      <Pie 
        data={data} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { padding: 10, usePointStyle: true } }
          }
        }} 
      />
    </div>
  );

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'classes', title: 'Minhas Turmas', icon: 'fas fa-users' },
    { id: 'tasks', title: 'Minhas Tarefas', icon: 'fas fa-tasks' },
    { id: 'flashcards', title: 'Meus Flashcards', icon: 'fas fa-clone' }
  ];

  const pageTitles = {
    dashboard: 'Dashboard Professor',
    classes: 'Minhas Turmas',
    tasks: 'Minhas Tarefas',
    flashcards: 'Meus Flashcards'
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
              <div className="card">
                <h3 className="card-title">Distribuição de Alunos</h3>
                {chartData.classDistribution.labels.length > 0 ? (
                  <PieChartComponent data={chartData.classDistribution} />
                ) : (
                  <p className="chart-placeholder">Nenhum dado disponível</p>
                )}
              </div>
              <div className="card">
                <h3 className="card-title">Bem-vindo!</h3>
                <p>Gerencie suas turmas, tarefas e flashcards pelo menu lateral.</p>
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
              <h3 className="card-title">Suas Turmas ({classes.length})</h3>
              {loading.classes ? (
                <p>Carregando...</p>
              ) : classes.length > 0 ? (
                <div className="list">
                  {classes.map(cls => (
                    <div key={cls._id} className="list-item">
                      <div className="list-item-content">
                        <div className="list-item-title">{cls.name}</div>
                        <div className="list-item-subtitle">
                          {cls.subject} • {cls.academic_year} • {cls.students?.length || 0} alunos
                        </div>
                        {cls.description && <p className="list-item-desc">{cls.description}</p>}
                        
                        {/* Adicionar aluno por email */}
                        <div className="add-student-row">
                          <input
                            type="email"
                            value={studentEmailInputs[cls._id] || ''}
                            onChange={e => setStudentEmailInputs(prev => ({ ...prev, [cls._id]: e.target.value }))}
                            placeholder="Email do aluno"
                            className="input input-sm"
                          />
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleAddStudentByEmail(cls._id)}
                          >
                            + Aluno
                          </button>
                        </div>
                      </div>
                      <div className="list-item-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => { setEditingClass(cls); setShowEditClassModal(true); }}>
                          Editar
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => loadClassStudents(cls._id)}>
                          Ver Alunos
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleArchiveClass(cls._id)}>
                          Arquivar
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

            {/* Todos os Alunos da Escola */}
            <div className="card">
              <h3 className="card-title">Alunos da Escola ({allStudents.length})</h3>
              {loading.students ? (
                <p>Carregando...</p>
              ) : allStudents.length > 0 ? (
                <div className="students-grid">
                  {allStudents.map(student => (
                    <div key={student._id} className="student-card">
                      <div className="student-name">{student.name}</div>
                      <div className="student-email">{student.email}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum aluno encontrado</p>
              )}
            </div>
          </div>
        )}

        {/* Tasks Screen */}
        {activeScreen === 'tasks' && (
          <div className="screen active">
            {/* Criar Tarefa */}
            <div className="card">
              <h3 className="card-title">Criar Nova Tarefa</h3>
              <form onSubmit={handleCreateTask} className="form-grid">
                <input
                  type="text"
                  value={newTask.title}
                  onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título da tarefa"
                  className="input"
                  required
                />
                <div className="input-row">
                  <input
                    type="text"
                    value={newTask.subject}
                    onChange={e => setNewTask(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Disciplina"
                    className="input"
                  />
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={e => setNewTask(prev => ({ ...prev, due_date: e.target.value }))}
                    className="input"
                  />
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                    className="input"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
                <textarea
                  value={newTask.description}
                  onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição"
                  className="input"
                  rows="2"
                />
                
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
                    <i className={`theme-toggle-icon ${darkMode ? 'fas fa-sun' : 'fas fa-moon'}`}></i>
                  </div>
                </div>
                <span className="theme-toggle-label">
                  {darkMode ? "Modo Claro" : "Modo Escuro"}
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
`;
document.head.appendChild(styles);

export default DashboardProfessor;
