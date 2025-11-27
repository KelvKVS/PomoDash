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

  // Stats
  const [stats, setStats] = useState({
    focusTime: '0h 0m',
    completedTasks: 0,
    totalTasks: 0,
    flashcardAccuracy: 0
  });

  // Dados para tarefas vindos da API
  const [tasks, setTasks] = useState([]);
  const [professorTasks, setProfessorTasks] = useState([]); // Tarefas do professor
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    description: '',
    attachments: [],
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
  const [professorFlashcards, setProfessorFlashcards] = useState([]); // Flashcards do professor
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

  // Flashcard Feedback Modal State
  const [showFlashcardFeedbackModal, setShowFlashcardFeedbackModal] = useState(false);
  const [currentFlashcardId, setCurrentFlashcardId] = useState(null);

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  const showConfirmation = (message, callback) => {
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

  // Funções para a popup de feedback do flashcard
  const handleFlashcardCorrect = () => {
    if (currentFlashcardId) {
      updateFlashcardStats(currentFlashcardId, true);
    }
    setShowFlashcardFeedbackModal(false);
    setCurrentFlashcardId(null);
  };

  const handleFlashcardIncorrect = () => {
    if (currentFlashcardId) {
      updateFlashcardStats(currentFlashcardId, false);
    }
    setShowFlashcardFeedbackModal(false);
    setCurrentFlashcardId(null);
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
      setNewTask({ title: '', subject: '', description: '', attachments: [], due_date: '', priority: 'medium' });
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

  const handleArchiveTask = async (taskId) => {
    showConfirmation(
      'Tem certeza que deseja arquivar esta tarefa?',
      async () => {
        try {
          await taskAPI.archiveTask(taskId);
          // Recarregar as tarefas
          loadTasks(); // Atualiza as tarefas
          setAlert({ message: 'Tarefa arquivada com sucesso!', type: 'success' });
        } catch (error) {
          setAlert({ message: 'Erro ao arquivar tarefa: ' + error.message, type: 'error' });
        }
      },
      'warning'
    );
  };

  // Manter a função antiga como alias

  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const showEditTaskModal = (task) => {
    setEditingTask(task);
    setIsEditingTask(true);
  };

  const hideEditTaskModal = () => {
    setIsEditingTask(false);
    setEditingTask(null);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      await taskAPI.updateTask(editingTask._id, {
        title: editingTask.title,
        subject: editingTask.subject,
        description: editingTask.description,
        due_date: editingTask.due_date,
        priority: editingTask.priority,
        attachments: editingTask.attachments
      });

      // Fechar o modal
      hideEditTaskModal();

      // Recarregar as tarefas
      loadTasks(); // Atualiza as tarefas na tela de tarefas

      setAlert({ message: 'Tarefa atualizada com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar tarefa: ' + error.message, type: 'error' });
    }
  };

  // Pomodoro Timer Logic
  useEffect(() => {
    // Update document title when timer state changes
    updateDocumentTitle(time, isActive);

    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          updateDocumentTitle(newTime, true);
          return newTime;
        });
      }, 1000);
    } else if (time === 0 && activeSession) {
      // Handle session end - complete the session
      handleCompleteSession();
    }

    return () => clearInterval(interval);
  }, [isActive, time, activeSession, updateDocumentTitle, handleCompleteSession]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCompleteSession = async () => {
    if (activeSession) {
      try {
        setActiveSession(null);
        setIsActive(false);
        loadRecentSessions(); // Atualizar lista de sessões recentes

        // Play completion sound
        playCompletionSound();
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

  // Função para tocar som de conclusão
  const playCompletionSound = () => {
    // Criar um elemento de áudio com um som de bip ou som de conclusão
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.3;

    oscillator.start();

    // Adicionar efeito de fade out para soar melhor
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);

    setTimeout(() => {
      oscillator.stop();
    }, 500);
  };

  // Função para atualizar o título do documento com o tempo restante
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDocumentTitle = (seconds, isActiveSession) => {
    if (isActiveSession) {
      const formattedTime = formatTime(seconds);
      document.title = `${formattedTime} - Pomodoro Timer`;
    } else {
      document.title = "PomoDash";
    }
  };

  // Efeito para atualizar o título quando o componente montar e desmontar
  useEffect(() => {
    // Atualiza o título quando o componente é montado
    updateDocumentTitle(time, isActive);

    // Limpa o título quando o componente é desmontado
    return () => {
      document.title = "PomoDash";
    };
  }, [isActive, time, updateDocumentTitle]);

  // Função para carregar flashcards
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // Se o card já está selecionado, mostrar popup para perguntar se acertou
      setCurrentFlashcardId(cardId);
      setShowFlashcardFeedbackModal(true);
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
      // Carregar todas as tarefas e filtrar para o usuário logado
      const response = await taskAPI.getTasks();

      if (response.data && Array.isArray(response.data)) {
        // Filtrar tarefas atribuídas ao usuário logado e incluir currentAssignment
        const userTasks = [];
        
        response.data.forEach(task => {
          if (task.assigned_to && Array.isArray(task.assigned_to)) {
            // Encontrar o assignment específico do usuário atual
            const userAssignment = task.assigned_to.find(assignment => {
              const assignmentUserId = assignment.user?._id || assignment.user;
              const currentUserId = user._id || user.id;

              // Garantir que ambos sejam strings para comparação
              const assignmentIdStr = assignmentUserId ? assignmentUserId.toString() : null;
              const userIdStr = currentUserId ? currentUserId.toString() : null;

              return assignmentIdStr && userIdStr && assignmentIdStr === userIdStr;
            });

            // Se encontrou o assignment do usuário, adicionar a tarefa com o currentAssignment
            if (userAssignment) {
              userTasks.push({
                ...task,
                currentAssignment: userAssignment // Incluir o assignment específico do usuário
              });
            }
          }
        });
        
        console.log('Tarefas carregadas:', userTasks.length, userTasks.map(t => ({
          title: t.title,
          status: t.currentAssignment?.status
        })));
        
        setTasks(userTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  // Função para carregar as estatísticas do aluno
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadStats = async () => {
    try {
      // Carregar estatísticas de Pomodoro
      const pomodoroStats = await pomodoroAPI.getStats();

      // Carregar tarefas
      const allTasksResponse = await taskAPI.getTasks();

      // Calcular estatísticas de tarefas do usuário logado
      let completedTasks = 0;
      let totalTasks = 0;
      let userTasks = [];

      if (allTasksResponse.data && Array.isArray(allTasksResponse.data)) {
        allTasksResponse.data.forEach(task => {
          if (task.assigned_to && Array.isArray(task.assigned_to)) {
            task.assigned_to.forEach(assignment => {
              // Verificação robusta de IDs que lida com diferentes formatos
              const assignmentUserId = assignment.user?._id || assignment.user;
              const currentUserId = user._id || user.id;

              // Garantir que ambos sejam strings para comparação
              const assignmentIdStr = assignmentUserId ? assignmentUserId.toString() : null;
              const userIdStr = currentUserId ? currentUserId.toString() : null;

              if (assignmentIdStr && userIdStr && assignmentIdStr === userIdStr) {
                totalTasks++;
                if (assignment.status === 'completed') {
                  completedTasks++;
                }
                userTasks.push({ ...task, currentAssignment: assignment });
              }
            });
          }
        });
      }

      // Calcular tempo de foco (simplificado - usando minutos de sessões concluídas)
      let focusTime = 0;
      if (pomodoroStats.data && pomodoroStats.data.totalMinutes) {
        focusTime = Math.floor(pomodoroStats.data.totalMinutes);
      }

      // Formatar tempo de foco
      const hours = Math.floor(focusTime / 60);
      const minutes = focusTime % 60;
      const focusTimeFormatted = `${hours}h ${minutes}m`;

      // Carregar e calcular aproveitamento de flashcards
      const flashcardAcc = getOverallAccuracy();

      setStats({
        focusTime: focusTimeFormatted,
        completedTasks,
        totalTasks,
        flashcardAccuracy: flashcardAcc
      });

    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
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
    loadStats(); // Carregar estatísticas

    return () => {
      document.body.removeChild(script);
      // Reset document title when component unmounts
      document.title = "PomoDash";
    };
  }, [flashcardStats, loadFlashcards, loadStats]); // Adicionando flashcardStats como dependência para atualizar quando mudar

  // useEffect para carregar dados do professor quando as telas forem acessadas
  useEffect(() => {
    if (activeScreen === 'tasks') {
      loadTasks(); // Recarregar tarefas quando entra na tela de tarefas
    } else if (activeScreen === 'professor-tasks') {
      loadProfessorTasks();
    } else if (activeScreen === 'professor-flashcards') {
      loadProfessorFlashcards();
    }
  }, [activeScreen, loadProfessorFlashcards, loadProfessorTasks, loadTasks]);

  const pageTitles = {
    'dashboard': 'Dashboard Geral',
    'tasks': 'Minhas Tarefas',
    'pomodoro': 'Pomodoro',
    'flashcards': 'Meus Flashcards',
    'reports': 'Relatórios',
    'settings': 'Configurações',
    'professor-tasks': 'Tarefas do Professor',
    'professor-flashcards': 'Flashcards do Professor',
  };

  // Função para carregar tarefas do professor
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadProfessorTasks = async () => {
    try {
      // Obter tarefas criadas pelos professores da escola do aluno
      const response = await taskAPI.getTasks({
        school_id: user.school_id,
        created_by_role: 'teacher'
      });
      setProfessorTasks(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas do professor:', error);
      setAlert({ message: 'Erro ao carregar tarefas do professor: ' + (error.message || 'Não foi possível conectar ao servidor'), type: 'error' });
      setProfessorTasks([]);
    }
  };

  // Função para carregar flashcards do professor
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadProfessorFlashcards = async () => {
    try {
      // Obter flashcards criados pelos professores da escola do aluno
      const response = await flashcardAPI.getFlashcards({
        school_id: user.school_id,
        created_by_role: 'teacher'
      });
      setProfessorFlashcards(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar flashcards do professor:', error);
      setAlert({ message: 'Erro ao carregar flashcards do professor: ' + (error.message || 'Não foi possível conectar ao servidor'), type: 'error' });
      setProfessorFlashcards([]);
    }
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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
          <img src="/src/assets/logoVe.png" alt="PomoDash Logo" style={{ height: '50px', marginRight: '10px', borderRadius: '12px' }} />
          <h1>Pomo<span>dash</span></h1>
        </div>
        <div className="menu">
          <div className={`menu-item ${activeScreen === 'dashboard' ? 'active' : ''}`} onClick={() => {showScreen('dashboard'); setSidebarOpen(false);}}>
            <i className="fas fa-tachometer-alt"></i><span>Dashboard</span>
          </div>
          <div className={`menu-item ${activeScreen === 'tasks' ? 'active' : ''}`} onClick={() => {showScreen('tasks'); setSidebarOpen(false);}}>
            <i className="fas fa-tasks"></i><span>Minhas Tarefas</span>
          </div>
          <div className={`menu-item ${activeScreen === 'pomodoro' ? 'active' : ''}`} onClick={() => {showScreen('pomodoro'); setSidebarOpen(false);}}>
            <i className="fas fa-clock"></i><span>Pomodoro</span>
          </div>
          <div className={`menu-item ${activeScreen === 'flashcards' ? 'active' : ''}`} onClick={() => {showScreen('flashcards'); setSidebarOpen(false);}}>
            <i className="fas fa-layer-group"></i><span>Meus Flashcards</span>
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
                <div className="stat-value">{stats.focusTime}</div>
                <div className="stat-label">Tempo de foco</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-check-circle fa-2x" style={{ color: 'var(--secondary-color)' }}></i>
                <div className="stat-value">{stats.completedTasks}/{stats.totalTasks}</div>
                <div className="stat-label">Tarefas concluídas</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-brain fa-2x" style={{ color: '#FFC107' }}></i>
                <div className="stat-value">{stats.flashcardAccuracy}%</div>
                <div className="stat-label">Aproveitamento de Flashcards</div>
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
                {/* Separação de tarefas por status */}
                {(() => {
                  // Função para obter status da tarefa - usa currentAssignment se disponível
                  const getTaskStatus = (task) => {
                    // Se a tarefa já tem currentAssignment (adicionado em loadTasks), usar ele
                    if (task.currentAssignment) {
                      return task.currentAssignment.status || 'pending';
                    }
                    
                    // Fallback: procurar no array assigned_to
                    const assignment = task.assigned_to?.find(a => {
                      const assignmentUserId = a.user?._id || a.user;
                      const currentUserId = user._id || user.id;
                      const assignmentIdStr = assignmentUserId ? assignmentUserId.toString() : null;
                      const userIdStr = currentUserId ? currentUserId.toString() : null;
                      return assignmentIdStr && userIdStr && assignmentIdStr === userIdStr;
                    });
                    return assignment ? assignment.status : 'pending';
                  };

                  // Separar tarefas
                  const pendingTasks = tasks?.filter(task => getTaskStatus(task) !== 'completed') || [];
                  const completedTasks = tasks?.filter(task => getTaskStatus(task) === 'completed') || [];
                  
                  console.log('Separação de tarefas - Pendentes:', pendingTasks.length, 'Concluídas:', completedTasks.length);

                  // Função para renderizar item de tarefa
                  const renderTaskItem = (task, status) => (
                    <div key={task._id} className={`task-item ${status === 'completed' ? 'completed' : status === 'in_progress' ? 'in_progress' : ''}`}>
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
                      {/* Badge de status */}
                      <span className="task-completed-badge">
                        <i className="fas fa-check-circle"></i> Concluída
                      </span>
                      <span className="task-pending-badge">
                        <i className="fas fa-clock"></i> {status === 'in_progress' ? 'Em andamento' : 'Pendente'}
                      </span>
                      <div className="task-actions">
                        <button
                          onClick={() => showEditTaskModal(task)}
                          className="btn-edit-task"
                          title="Editar Tarefa"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleArchiveTask(task._id)}
                          className="btn-archive-task"
                          title="Arquivar Tarefa"
                        >
                          Arquivar
                        </button>
                      </div>
                    </div>
                  );

                  return (
                    <>
                      {/* Seção de Tarefas Pendentes */}
                      <div className="tasks-section">
                        <h3 className="tasks-section-title">
                          <i className="fas fa-clock"></i> Tarefas Pendentes ({pendingTasks.length})
                        </h3>
                        <div className="task-list">
                          {pendingTasks.length > 0 ? (
                            pendingTasks.map(task => renderTaskItem(task, getTaskStatus(task)))
                          ) : (
                            <p className="no-tasks-message">
                              <i className="fas fa-check-double"></i> Parabéns! Você não tem tarefas pendentes.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Seção de Tarefas Concluídas */}
                      <div className="tasks-section completed-section">
                        <h3 className="tasks-section-title completed-title">
                          <i className="fas fa-check-circle"></i> Tarefas Concluídas ({completedTasks.length})
                        </h3>
                        <div className="task-list">
                          {completedTasks.length > 0 ? (
                            completedTasks.map(task => renderTaskItem(task, 'completed'))
                          ) : (
                            <p className="no-tasks-message">
                              <i className="fas fa-tasks"></i> Nenhuma tarefa concluída ainda.
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
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
            <p className="card-subtitle">Clique no card para ver a resposta. Clique novamente para informar se acertou!</p>
            {flashcards && flashcards.length > 0 ? (
              <div className="flashcard-grid-student">
                {flashcards.map(card => (
                  <div key={card._id} className={`flashcard-student ${selectedCard === card._id ? 'flipped' : ''}`} onClick={() => flipCard(card._id)}>
                    <div className="flashcard-inner-student">
                      <div className="flashcard-front-student">
                        <div className="flashcard-question-text">{card.question}</div>
                        <div className="flashcard-hint">Clique para ver a resposta</div>
                      </div>
                      <div className="flashcard-back-student">
                        <div className="flashcard-answer-text">{card.answer}</div>
                        <div className="flashcard-hint-back">Clique novamente para avaliar</div>
                      </div>
                    </div>
                    <div className="flashcard-stats-student">
                      <span className="accuracy-badge-student" title={`Aproveitamento: ${card.stats?.accuracy || 0}%`}>
                        ✓ {card.stats?.accuracy || 0}%
                      </span>
                      <span className="attempts-badge-student" title={`Tentativas: ${card.stats?.attempts || 0}`}>
                        📝 {card.stats?.attempts || 0}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteFlashcard(card._id); }}
                      className="btn-delete-flashcard-student"
                      title="Deletar flashcard"
                    >
                      ✕
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

        {/* Professor Tasks Screen */}
        <div className={`screen ${activeScreen === 'professor-tasks' ? 'active' : ''}`} id="professor-tasks">
          <div className="card">
            <h3 className="card-title">Tarefas do Professor</h3>
            <div className="task-list">
              {professorTasks && professorTasks.length > 0 ? (
                professorTasks.map(task => (
                  <div key={task._id} className="task-item">
                    <div className="task-content">
                      <div className="task-title">{task.title}</div>
                      <div className="task-details">
                        Disciplina: {task.subject || 'N/A'} • Prazo: {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'N/A'} • Prioridade: {task.priority}
                      </div>
                    </div>
                    <div className="task-meta">
                      <span className={`task-status ${task.status || 'pending'}`}>
                        {task.status === 'completed' ? 'Concluída' :
                         task.status === 'in_progress' ? 'Em Progresso' :
                         'Pendente'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhuma tarefa do professor disponível no momento.</p>
              )}
            </div>
          </div>
        </div>

        {/* Professor Flashcards Screen */}
        <div className={`screen ${activeScreen === 'professor-flashcards' ? 'active' : ''}`} id="professor-flashcards">
          <div className="card">
            <h3 className="card-title">Flashcards do Professor</h3>
            <div className="flashcard-grid">
              {professorFlashcards && professorFlashcards.length > 0 ? (
                professorFlashcards.map(card => (
                  <div key={card._id} className="flashcard-item">
                    <div className="flashcard-content">
                      <div className="flashcard-question">{card.question}</div>
                      <div className="flashcard-answer">{card.answer}</div>
                    </div>
                    <div className="flashcard-meta">
                      <span className="flashcard-subject">{card.subject || 'N/A'}</span>
                      <span className="flashcard-tags">
                        {card.tags && card.tags.length > 0 ? card.tags.join(', ') : 'Sem tags'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhum flashcard do professor disponível no momento.</p>
              )}
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
      {/* Popup de feedback do flashcard */}
      {showFlashcardFeedbackModal && (
        <div className="flashcard-feedback-modal">
          <div className="flashcard-feedback-content">
            <h3>Como foi este flashcard?</h3>
            <p>Você acertou esta pergunta?</p>
            <div className="flashcard-feedback-buttons">
              <button
                className="btn-flashcard-incorrect"
                onClick={handleFlashcardIncorrect}
              >
                <i className="fas fa-times"></i> Errei
              </button>
              <button
                className="btn-flashcard-correct"
                onClick={handleFlashcardCorrect}
              >
                <i className="fas fa-check"></i> Acertei
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição de tarefa */}
      {isEditingTask && editingTask && (
        <div className="task-edit-modal">
          <div className="task-edit-modal-content">
            <h3>Editar Tarefa</h3>
            <input
              type="text"
              value={editingTask.title || ''}
              onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
              className="task-edit-input"
              placeholder="Título"
            />
            <input
              type="text"
              value={editingTask.subject || ''}
              onChange={(e) => setEditingTask({...editingTask, subject: e.target.value})}
              className="task-edit-input"
              placeholder="Disciplina"
            />
            <textarea
              value={editingTask.description || ''}
              onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
              className="task-edit-input"
              placeholder="Descrição"
              rows="3"
            />
            <input
              type="date"
              value={editingTask.due_date || ''}
              onChange={(e) => setEditingTask({...editingTask, due_date: e.target.value})}
              className="task-edit-input"
            />
            <select
              value={editingTask.priority || 'medium'}
              onChange={(e) => setEditingTask({...editingTask, priority: e.target.value})}
              className="task-edit-input"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>

            <div className="task-edit-actions">
              <button className="btn btn-secondary" onClick={hideEditTaskModal}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleUpdateTask}>
                Salvar
              </button>
            </div>
          </div>
        </div>
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
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
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
    color: #ffc107;
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
    background: #ffc107;
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
    background-color: #f8f9fa;
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
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    z-index: 5;
  }

  .accuracy-badge, .attempts-badge {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.1);
  }

  .accuracy-badge {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
  }

  .attempts-badge {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
  }

  /* Estilo melhorado para o flashcard */
  .flashcard {
    height: 240px;
    perspective: 1000px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front,
  .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    border-radius: 16px;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  }

  .flashcard-front {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #333;
    border: 1px solid #dee2e6;
  }

  .flashcard-back {
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    color: white;
    transform: rotateY(180deg);
    font-size: 1.2rem;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btn-delete-flashcard {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .btn-delete-flashcard:hover {
    background: #ff6b6b;
    color: white;
    transform: scale(1.1);
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 20px;
  }

  /* Estilos para as telas do professor */
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    background: var(--card-background);
    transition: all 0.2s ease;
  }

  .task-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }


  .task-content {
    flex: 1;
  }

  .task-title {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
  }


  .task-details {
    font-size: 0.9rem;
    color: var(--text-light-color);
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }


  .task-meta {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  .task-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
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
    background-color: #28a745;
    color: white;
  }

  /* Estilos para tarefas concluídas - visual neutro */
  .task-item.completed {
    background: var(--card-background);
    border-color: var(--border-color);
    border-left: 4px solid var(--border-color);
    position: relative;
    opacity: 0.8;
  }

  .task-item.completed .task-title {
    text-decoration: line-through;
    color: #9ca3af;
  }

  .task-item.completed .task-details {
    color: #9ca3af;
  }

  /* Badges de status */
  .task-completed-badge {
    display: none;
  }

  .task-item.completed .task-completed-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #28a745;
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 12px;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  }

  .task-pending-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #ffc107;
    color: #856404;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 12px;
  }

  .task-item.completed .task-pending-badge {
    display: none;
  }

  .task-item.in_progress .task-pending-badge {
    background: #17a2b8;
    color: white;
  }

  /* Seções de Tarefas Separadas */
  .tasks-section {
    margin-bottom: 32px;
  }

  .tasks-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #ffc107;
  }

  .tasks-section-title i {
    color: #ffc107;
    font-size: 20px;
  }

  .tasks-section-title.completed-title {
    border-bottom-color: #6b7280;
  }

  .tasks-section-title.completed-title i {
    color: #6b7280;
  }

  .completed-section {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px dashed var(--border-color);
  }

  .no-tasks-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 24px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    color: #6c757d;
    font-size: 15px;
    text-align: center;
  }

  .no-tasks-message i {
    font-size: 20px;
    color: #6b7280;
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 16px;
  }

  .flashcard-item {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s ease;
  }

  .flashcard-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .flashcard-content {
    margin-bottom: 12px;
  }

  .flashcard-question {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 8px;
  }

  .flashcard-answer {
    color: var(--text-light-color);
    font-style: italic;
  }

  .flashcard-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: var(--text-light-color);
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
  }

  .flashcard-subject {
    background: rgba(229, 83, 69, 0.1);
    color: #e55345;
    padding: 2px 8px;
    border-radius: 12px;
  }

  .flashcard-tags {
    font-size: 0.8rem;
  }

  /* Estilo para popup de feedback do flashcard */
  .flashcard-feedback-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  .flashcard-feedback-content {
    background: white;
    border-radius: 12px;
    padding: 30px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: fadeInScale 0.3s ease;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .flashcard-feedback-content h3 {
    margin-top: 0;
    color: var(--text-color);
    font-size: 1.3rem;
  }

  .flashcard-feedback-content p {
    margin: 15px 0;
    color: var(--text-light-color);
    font-size: 1rem;
  }

  .flashcard-feedback-buttons {
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }

  .btn-flashcard-incorrect, .btn-flashcard-correct {
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-flashcard-incorrect {
    background-color: #dc3545;
    color: white;
  }

  .btn-flashcard-incorrect:hover {
    background-color: #c82333;
    transform: translateY(-2px);
  }

  .btn-flashcard-correct {
    background-color: #28a745;
    color: white;
  }

  .btn-flashcard-correct:hover {
    background-color: #218838;
    transform: translateY(-2px);
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

    .flashcard-feedback-content {
      width: 95%;
      margin: 20px;
      padding: 20px;
    }

    .flashcard-feedback-buttons {
      flex-direction: column;
    }
  }

  /* Estilos para os novos elementos de tarefa */
  .task-description {
    font-size: 0.9rem;
    color: var(--text-light-color);
    margin: 4px 0;
    font-style: italic;
  }

  .task-attachments {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .attachment-tag {
    background: rgba(229, 83, 69, 0.1);
    color: #e55345;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  
  .attachment-tag:hover {
    background: rgba(229, 83, 69, 0.2);
    border-color: #e55345;
    transform: translateY(-1px);
  }
  
  .dark-theme .attachment-tag {
    background: rgba(229, 83, 69, 0.15);
    color: #ff7b6b;
  }
  
  .dark-theme .attachment-tag:hover {
    background: rgba(229, 83, 69, 0.3);
    border-color: #ff7b6b;
  }

  .task-actions {
    display: flex;
    gap: 5px;
    margin-left: 10px;
  }

  .btn-edit-task,
  .btn-archive-task {
    padding: 5px 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: white;
    color: var(--text-color);
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s ease;
  }

  .btn-edit-task:hover {
    background: #e9ecef;
    color: var(--primary-color);
  }

  .btn-archive-task {
    color: #dc3545;
    border-color: #dc3545;
  }

  .btn-archive-task:hover {
    background: #dc3545;
    color: white;
  }

  /* Estilos para o tema escuro */
  .dark-theme .btn-edit-task {
    background: #495057;
    color: white;
    border-color: #6c757d;
  }

  .dark-theme .btn-edit-task:hover {
    background: #5a6268;
  }

  .dark-theme .btn-archive-task {
    background: #dc3545;
    color: white;
  }

  /* Estilos para o modal de edição de tarefa */
  .task-edit-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px;
    box-sizing: border-box;
  }

  .task-edit-modal-content {
    background: var(--card-background);
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-height: 90vh;
    overflow-y: auto;
    box-sizing: border-box;
  }
  
  .task-edit-modal-content h3 {
    margin: 0 0 20px 0;
    font-size: 1.25rem;
    color: var(--text-color);
  }

  .task-edit-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--input-background);
    box-sizing: border-box;
    font-size: 0.95rem;
  }
  
  textarea.task-edit-input {
    resize: none;
    color: var(--text-color);
  }

  .task-edit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
  }

  .dark-theme .task-edit-input {
    background: var(--input-background);
    border-color: var(--border-color);
    color: var(--text-color);
  }

  .dark-theme .task-edit-modal-content {
    background: var(--card-background);
  }

  /* Dark theme - Tarefas concluídas - visual neutro */
  .dark-theme .task-item.completed {
    background: var(--card-background);
    border-color: var(--border-color);
    border-left: 4px solid var(--border-color);
    opacity: 0.8;
  }

  .dark-theme .task-item.completed .task-title {
    text-decoration: line-through;
    color: #6b7280;
  }

  .dark-theme .task-item.completed .task-details {
    color: #6b7280;
  }

  .dark-theme .task-item.completed .task-completed-badge {
    background: #28a745;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  }

  .dark-theme .task-pending-badge {
    background: #ecc94b;
    color: #744210;
  }

  .dark-theme .task-item.in_progress .task-pending-badge {
    background: #4299e1;
    color: white;
  }

  /* Dark theme - Seções de Tarefas */
  .dark-theme .tasks-section-title {
    color: #e2e8f0;
    border-bottom-color: #ecc94b;
  }

  .dark-theme .tasks-section-title i {
    color: #ecc94b;
  }

  .dark-theme .tasks-section-title.completed-title {
    border-bottom-color: #6b7280;
  }

  .dark-theme .tasks-section-title.completed-title i {
    color: #6b7280;
  }

  .dark-theme .completed-section {
    border-top-color: #4a5568;
  }

  .dark-theme .no-tasks-message {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: #a0aec0;
  }

  .dark-theme .no-tasks-message i {
    color: #6b7280;
  }

  /* ========== ESTILOS BONITOS PARA FLASHCARDS DO ALUNO ========== */
  .card-subtitle {
    color: var(--text-light-color);
    font-size: 0.9rem;
    margin-bottom: 20px;
    font-style: italic;
  }

  .flashcard-grid-student {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 20px;
  }

  .flashcard-student {
    position: relative;
    height: 260px;
    perspective: 1000px;
    cursor: pointer;
  }

  .flashcard-inner-student {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .flashcard-student:hover .flashcard-inner-student {
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  .flashcard-student.flipped .flashcard-inner-student {
    transform: rotateY(180deg);
  }

  .flashcard-student.flipped:hover .flashcard-inner-student {
    transform: rotateY(180deg) translateY(-5px);
  }

  .flashcard-front-student,
  .flashcard-back-student {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border-radius: 20px;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  }

  .flashcard-front-student {
    background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .flashcard-back-student {
    background: linear-gradient(145deg, #11998e 0%, #38ef7d 100%);
    color: white;
    transform: rotateY(180deg);
  }

  .flashcard-question-text,
  .flashcard-answer-text {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .flashcard-hint,
  .flashcard-hint-back {
    font-size: 0.8rem;
    opacity: 0.8;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.2);
    padding: 5px 15px;
    border-radius: 20px;
  }

  .flashcard-stats-student {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    gap: 8px;
    z-index: 5;
  }

  .accuracy-badge-student,
  .attempts-badge-student {
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }

  .accuracy-badge-student {
    background: linear-gradient(135deg, #00c853, #00e676);
    color: white;
  }

  .attempts-badge-student {
    background: linear-gradient(135deg, #2196f3, #03a9f4);
    color: white;
  }

  .btn-delete-flashcard-student {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
    font-size: 1rem;
    color: #666;
  }

  .btn-delete-flashcard-student:hover {
    background: #ff5252;
    color: white;
    transform: scale(1.1) rotate(90deg);
  }

  /* ========== MODAL DE FEEDBACK MELHORADO ========== */
  .flashcard-feedback-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  .flashcard-feedback-content {
    background: white;
    border-radius: 24px;
    padding: 40px;
    width: 90%;
    max-width: 420px;
    text-align: center;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
    animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .flashcard-feedback-content h3 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .flashcard-feedback-content p {
    margin: 0 0 25px 0;
    color: #666;
    font-size: 1rem;
  }

  .flashcard-feedback-buttons {
    display: flex;
    gap: 16px;
  }

  .btn-flashcard-incorrect,
  .btn-flashcard-correct {
    flex: 1;
    padding: 16px 24px;
    border: none;
    border-radius: 14px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .btn-flashcard-incorrect {
    background: linear-gradient(135deg, #ff416c, #ff4b2b);
    color: white;
    box-shadow: 0 8px 25px rgba(255, 65, 108, 0.4);
  }

  .btn-flashcard-incorrect:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 65, 108, 0.5);
  }

  .btn-flashcard-correct {
    background: linear-gradient(135deg, #11998e, #38ef7d);
    color: white;
    box-shadow: 0 8px 25px rgba(17, 153, 142, 0.4);
  }

  .btn-flashcard-correct:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(17, 153, 142, 0.5);
  }

  /* ========== TEMA ESCURO PARA FLASHCARDS ========== */
  .dark-theme .flashcard-front-student {
    background: linear-gradient(145deg, #4a5568 0%, #2d3748 100%);
  }

  .dark-theme .flashcard-back-student {
    background: linear-gradient(145deg, #065f46 0%, #047857 100%);
  }

  .dark-theme .flashcard-feedback-content {
    background: #1e1e1e;
  }

  .dark-theme .flashcard-feedback-content h3 {
    color: #e0e0e0;
  }

  .dark-theme .flashcard-feedback-content p {
    color: #b0b0b0;
  }

  .dark-theme .card-subtitle {
    color: #b0b0b0;
  }

  /* ========== RESPONSIVO ========== */
  @media (max-width: 768px) {
    .flashcard-grid-student {
      grid-template-columns: 1fr;
    }

    .flashcard-student {
      height: 220px;
    }

    .flashcard-question-text,
    .flashcard-answer-text {
      font-size: 1rem;
    }

    .flashcard-feedback-content {
      padding: 25px;
      margin: 20px;
    }

    .flashcard-feedback-buttons {
      flex-direction: column;
    }
  }
`;

document.head.appendChild(styles);

export default DashboardUser;