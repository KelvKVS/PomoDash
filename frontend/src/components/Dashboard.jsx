import React, { useState, useEffect, useCallback } from 'react';
import { authAPI, pomodoroAPI, taskAPI, flashcardAPI, classAPI, performanceAPI, uploadAPI } from '../lib/api';
import { exportTasksToExcel, exportFlashcardsToExcel, exportClassesToExcel, exportPerformanceToExcel } from '../lib/excelExport';
import CustomAlert from './CustomAlert';
import CustomConfirm from './CustomConfirm';
import useFlashcardStats from '../hooks/useFlashcardStats';
import TeacherClassManagement from './TeacherClassManagement';
import TeacherTaskManagement from './TeacherTaskManagement';
import TeacherFlashcardManagement from './TeacherFlashcardManagement';

function Dashboard({ user, darkMode, toggleDarkMode, onLogout }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    focusTime: '0h 0m',
    completedTasks: 0,
    totalTasks: 0,
    flashcardAccuracy: 0,
    recentSessions: [],
    recentCompletedTasks: [], // Últimas tarefas concluídas (para estatísticas)
    pendingTasks: [] // Tarefas pendentes (para dashboard)
  });
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    description: '',
    attachments: [],
    due_date: '',
    priority: 'medium'
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  const [profileImage, setProfileImage] = useState(user?.profile?.avatar || user?.profilePicture || 'https://i.pravatar.cc/40');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pomodoro State
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work'); // work, short_break, long_break
  const [activeSession, setActiveSession] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);

  // Flashcards State
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', tags: [] });
  const [showFlashcardForm, setShowFlashcardForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Alert State
  const [alert, setAlert] = useState(null);

  // Flashcard Stats
  const {
    updateFlashcardStats,
    getOverallAccuracy,
    getFlashcardStats,
  } = useFlashcardStats();

  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  // Flashcard Feedback Modal State
  const [showFlashcardFeedbackModal, setShowFlashcardFeedbackModal] = useState(false);
  const [currentFlashcardId, setCurrentFlashcardId] = useState(null);

  // Estados para funcionalidades do professor
  const [teacherPerformance, setTeacherPerformance] = useState(null);

  // Estados para turmas do aluno
  const [studentClasses, setStudentClasses] = useState([]);
  const [classTasks, setClassTasks] = useState([]); // Tarefas da turma
  const [classFlashcards, setClassFlashcards] = useState([]); // Flashcards da turma
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  // Normalizar IDs - localStorage usa "id", backend usa "_id"
  const userId = user?._id || user?.id;

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
  const handleFlashcardCorrect = async () => {
    if (currentFlashcardId) {
      await updateFlashcardStats(currentFlashcardId, true);
      
      // Atualizar estatísticas do flashcard na UI imediatamente
      setFlashcards(prev => prev.map(card => {
        if (card._id === currentFlashcardId) {
          const newAttempts = (card.stats?.attempts || 0) + 1;
          const newCorrect = (card.stats?.correct || 0) + 1;
          const newAccuracy = Math.round((newCorrect / newAttempts) * 100);
          return {
            ...card,
            stats: {
              ...card.stats,
              attempts: newAttempts,
              correct: newCorrect,
              accuracy: newAccuracy,
              streak: (card.stats?.streak || 0) + 1
            }
          };
        }
        return card;
      }));
      
      // Atualizar o aproveitamento geral na UI
      setTimeout(async () => {
        try {
          const flashcardStatsResponse = await flashcardAPI.getAggregateFlashcardStats();
          if (flashcardStatsResponse.data?.overallAccuracy !== undefined) {
            setStats(prev => ({ ...prev, flashcardAccuracy: flashcardStatsResponse.data.overallAccuracy }));
          }
        } catch {
          const newAccuracy = getOverallAccuracy();
          setStats(prev => ({ ...prev, flashcardAccuracy: newAccuracy }));
        }
      }, 200);
    }
    setShowFlashcardFeedbackModal(false);
    setCurrentFlashcardId(null);
    setSelectedCard(null);
  };

  const handleFlashcardIncorrect = async () => {
    if (currentFlashcardId) {
      await updateFlashcardStats(currentFlashcardId, false);
      
      // Atualizar estatísticas do flashcard na UI imediatamente
      setFlashcards(prev => prev.map(card => {
        if (card._id === currentFlashcardId) {
          const newAttempts = (card.stats?.attempts || 0) + 1;
          const newIncorrect = (card.stats?.incorrect || 0) + 1;
          const newCorrect = card.stats?.correct || 0;
          const newAccuracy = Math.round((newCorrect / newAttempts) * 100);
          return {
            ...card,
            stats: {
              ...card.stats,
              attempts: newAttempts,
              incorrect: newIncorrect,
              accuracy: newAccuracy,
              streak: 0
            }
          };
        }
        return card;
      }));
      
      // Atualizar o aproveitamento geral na UI
      setTimeout(async () => {
        try {
          const flashcardStatsResponse = await flashcardAPI.getAggregateFlashcardStats();
          if (flashcardStatsResponse.data?.overallAccuracy !== undefined) {
            setStats(prev => ({ ...prev, flashcardAccuracy: flashcardStatsResponse.data.overallAccuracy }));
          }
        } catch {
          const newAccuracy = getOverallAccuracy();
          setStats(prev => ({ ...prev, flashcardAccuracy: newAccuracy }));
        }
      }, 200);
    }
    setShowFlashcardFeedbackModal(false);
    setCurrentFlashcardId(null);
    setSelectedCard(null);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      // Upload dos arquivos anexados
      let uploadedAttachments = [];
      if (newTask.attachments && newTask.attachments.length > 0) {
        setAlert({ message: 'Enviando arquivos...', type: 'info' });
        
        for (const file of newTask.attachments) {
          try {
            const uploadResult = await uploadAPI.uploadFile(file);
            uploadedAttachments.push({
              name: uploadResult.data.originalName,
              url: uploadResult.data.url,
              type: file.type.startsWith('image/') ? 'image' : 'file',
              size: uploadResult.data.size
            });
          } catch (uploadError) {
            console.error('Erro ao fazer upload de arquivo:', uploadError);
            setAlert({ message: `Erro ao enviar arquivo ${file.name}: ${uploadError.message}`, type: 'error' });
            return;
          }
        }
      }

      const taskData = {
        title: newTask.title,
        subject: newTask.subject,
        description: newTask.description,
        attachments: uploadedAttachments,
        due_date: newTask.due_date || undefined,
        priority: newTask.priority,
        assigned_to: user._id // Enviar apenas o ID do usuário como string
      };

      await taskAPI.createTask(taskData);
      setNewTask({ title: '', subject: '', description: '', attachments: [], due_date: '', priority: 'medium' });
      setShowTaskForm(false); // Fechar o formulário após criar a tarefa
      // Recarregar as tarefas - evitar chamada duplicada quando na tela de tarefas
      if (activeScreen !== 'tasks') {
        loadStats(); // Atualiza as estatísticas e tarefas para outras telas
      } else {
        loadTasksForScreen(); // Atualiza tarefas na tela de tarefas
      }
      setAlert({ message: 'Tarefa criada com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao criar tarefa: ' + error.message, type: 'error' });
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      await taskAPI.updateTaskStatus(taskId, newStatus);
      // Recarregar as tarefas - evitar chamada duplicada quando na tela de tarefas
      if (activeScreen !== 'tasks') {
        loadStats(); // Atualiza as estatísticas e tarefas para outras telas
      } else {
        loadTasksForScreen(); // Atualiza tarefas na tela de tarefas
      }
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar status da tarefa: ' + error.message, type: 'error' });
    }
  };

  const handleArchiveTask = async (taskId) => {
    showConfirmation(
      'Tem certeza que deseja arquivar esta tarefa?',
      async () => {
        try {
          await taskAPI.archiveTask(taskId);
          // Recarregar as tarefas - evitar chamada duplicada quando na tela de tarefas
          if (activeScreen !== 'tasks') {
            loadStats(); // Atualiza as estatísticas e tarefas para outras telas
          } else {
            loadTasksForScreen(); // Atualiza tarefas na tela de tarefas
          }
          setAlert({ message: 'Tarefa arquivada com sucesso!', type: 'success' });
        } catch (error) {
          setAlert({ message: 'Erro ao arquivar tarefa: ' + error.message, type: 'error' });
        }
      },
      'warning'
    );
  };


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
      if (activeScreen !== 'tasks') {
        loadStats(); // Atualiza as estatísticas e tarefas para outras telas
      } else {
        loadTasksForScreen(); // Atualiza tarefas na tela de tarefas
      }

      setAlert({ message: 'Tarefa atualizada com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar tarefa: ' + error.message, type: 'error' });
    }
  };

  // Atualizar o manipulador de mudança para o novo formato de newTask
  const handleNewTaskChange = (field, value) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para manipular o upload de anexos
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setNewTask(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...files]
    }));
  };

  // Função para remover anexo
  const removeAttachment = (indexToRemove) => {
    setNewTask(prev => ({
      ...prev,
      attachments: (prev.attachments || []).filter((_, index) => index !== indexToRemove)
    }));
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

    // Adicionar listener para quando o usuário sair do site
    const handleBeforeUnload = async () => {
      if (activeSession && isActive) {
        try {
          await pomodoroAPI.pauseSession(activeSession._id);
        } catch (error) {
          console.error('Erro ao pausar sessão ao sair do site:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setAlert({ message: 'Erro ao iniciar sessão de Pomodoro: ' + error.message, type: 'error' });
    }
  };

  // Função para pausar a sessão ativa
  const pauseSession = async () => {
    if (activeSession) {
      try {
        await pomodoroAPI.pauseSession(activeSession._id);
        setIsActive(false);
      } catch (error) {
        setAlert({ message: 'Erro ao pausar sessão: ' + error.message, type: 'error' });
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
        setAlert({ message: 'Erro ao retomar sessão: ' + error.message, type: 'error' });
      }
    }
  };

  // Função para completar a sessão
  const handleCompleteSession = async () => {
    if (activeSession) {
      try {

        setActiveSession(null);
        setIsActive(false);
        loadRecentSessions(); // Atualizar lista de sessões recentes
        setAlert({ message: 'Sessão completada com sucesso!', type: 'success' });
      } catch (error) {
        setAlert({ message: 'Erro ao completar sessão: ' + error.message, type: 'error' });
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
        setAlert({ message: 'Sessão abandonada com sucesso!', type: 'info' });
      } catch (error) {
        setAlert({ message: 'Erro ao abandonar sessão: ' + error.message, type: 'error' });
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
      // Usar estatísticas do backend (card.stats) com fallback para localStorage
      const flashcardsWithStats = response.data.map(card => {
        // Priorizar estatísticas do backend, senão usar localStorage
        const backendStats = card.stats || {};
        const localStats = getFlashcardStats(card._id);
        
        return {
          ...card,
          stats: {
            accuracy: backendStats.accuracy || localStats.accuracy || 0,
            attempts: backendStats.attempts || localStats.attempts || 0,
            correct: backendStats.correct || localStats.correct || 0,
            incorrect: backendStats.incorrect || localStats.incorrect || 0,
            streak: backendStats.streak || localStats.streak || 0,
            lastReviewed: backendStats.lastReviewed || localStats.lastReviewed || null
          }
        };
      });
      setFlashcards(flashcardsWithStats || []);
    } catch (error) {
      setAlert({ message: 'Erro ao carregar flashcards: ' + error.message, type: 'error' });
    }
  };

  // Função para carregar turmas do aluno
  const loadStudentClasses = useCallback(async () => {
    if (!userId || user?.role !== 'student') return;
    
    setLoadingClasses(true);
    try {
      const response = await classAPI.getClassesByStudent(userId);
      const classesData = response.data?.classes || [];
      setStudentClasses(classesData);
      console.log('Turmas do aluno carregadas:', classesData.length);
    } catch (error) {
      console.error('Erro ao carregar turmas do aluno:', error);
    } finally {
      setLoadingClasses(false);
    }
  }, [userId, user?.role]);

  // Função para carregar flashcards de uma turma específica
  const loadClassFlashcards = useCallback(async (classId) => {
    if (!classId) return;
    
    try {
      const response = await flashcardAPI.getFlashcardsByClass(classId);
      setClassFlashcards(response.data || []);
      console.log('Flashcards da turma carregados:', response.data?.length || 0);
    } catch (error) {
      console.error('Erro ao carregar flashcards da turma:', error);
      setClassFlashcards([]);
    }
  }, []);

  // Função para carregar tarefas de uma turma (tarefas criadas pelo professor da turma)
  const loadClassTasks = useCallback(async (classId) => {
    if (!classId || !userId) return;
    
    try {
      // Encontrar a turma selecionada para obter o teacher_id
      const selectedClass = studentClasses.find(c => c._id === classId);
      const teacherId = selectedClass?.teacher_id?._id || selectedClass?.teacher_id;
      
      if (!teacherId) {
        console.log('Professor da turma não encontrado');
        setClassTasks([]);
        return;
      }

      const response = await taskAPI.getTasks();
      const allTasks = response.data || [];
      
      // Filtrar tarefas criadas pelo professor da turma E atribuídas ao aluno
      const tasksFromTeacher = allTasks.filter(task => {
        // Verificar se a tarefa foi criada pelo professor da turma
        const creatorId = task.created_by?._id || task.created_by;
        const isFromTeacher = creatorId?.toString() === teacherId?.toString();
        
        // Verificar se o aluno está atribuído a esta tarefa
        const isAssigned = task.assigned_to?.some(a => {
          const assignedUserId = a.user?._id || a.user;
          return assignedUserId?.toString() === userId?.toString();
        });
        
        return isFromTeacher && isAssigned;
      });
      
      setClassTasks(tasksFromTeacher);
      console.log('Tarefas do professor da turma carregadas:', tasksFromTeacher.length);
    } catch (error) {
      console.error('Erro ao carregar tarefas da turma:', error);
      setClassTasks([]);
    }
  }, [userId, studentClasses]);

  // Efeito para carregar turmas do aluno quando a tela mudar para my-classes
  useEffect(() => {
    if (activeScreen === 'my-classes' && user?.role === 'student') {
      loadStudentClasses();
    }
  }, [activeScreen, user?.role, loadStudentClasses]);

  // Efeito para carregar dados da turma selecionada
  useEffect(() => {
    if (selectedClassId) {
      loadClassFlashcards(selectedClassId);
      loadClassTasks(selectedClassId);
    }
  }, [selectedClassId, loadClassFlashcards, loadClassTasks]);

  // Função para criar novo flashcard
  const handleCreateFlashcard = async (e) => {
    e.preventDefault();
    if (!newFlashcard.question.trim() || !newFlashcard.answer.trim()) {
      setAlert({ message: 'Pergunta e resposta são obrigatórias', type: 'error' });
      return;
    }

    try {
      const response = await flashcardAPI.createFlashcard(newFlashcard);
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard({ question: '', answer: '', tags: [] });
      setShowFlashcardForm(false); // Fechar o formulário após criar o flashcard
      setAlert({ message: 'Flashcard criado com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao criar flashcard: ' + error.message, type: 'error' });
    }
  };



  // Função para deletar flashcard
  const handleDeleteFlashcard = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este flashcard?')) {
      try {
        await flashcardAPI.deleteFlashcard(id);
        setFlashcards(flashcards.filter(card => card._id !== id));
        setAlert({ message: 'Flashcard deletado com sucesso!', type: 'success' });
      } catch (error) {
        setAlert({ message: 'Erro ao deletar flashcard: ' + error.message, type: 'error' });
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

      // Obtém a nova URL do avatar
      const newAvatarUrl = response.data.user.profile?.avatar || response.data.user.profilePicture || user?.profilePicture;

      // Atualiza o localStorage com os novos dados do usuário
      const updatedUser = { ...user, name: response.data.user.name, profilePicture: newAvatarUrl };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Atualiza a imagem de perfil na tela
      if (newAvatarUrl) {
        setProfileImage(newAvatarUrl);
      }

      setEditProfile(false);
      // Limpa o arquivo de imagem após salvar
      setProfileImageFile(null);
      setAlert({ message: 'Perfil atualizado com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar perfil: ' + error.message, type: 'error' });
    }
  };

  const handleCancelEdit = () => {
    // Reverter para os dados originais
    setProfileData({
      name: user?.name || '',
    });
    setProfileImage(user?.profile?.avatar || user?.profilePicture || 'https://i.pravatar.cc/40');
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

  // Funções de exportação para professor
  const exportTeacherData = async (dataType) => {
    try {
      let data = [];
      let exportFunction;
      let fileName;

      switch(dataType) {
        case 'tasks': {
          const tasksResponse = await taskAPI.getTasksByTeacher(user._id);
          data = tasksResponse.data;
          exportFunction = exportTasksToExcel;
          fileName = `tarefas_professor_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
          break;
        }
        case 'flashcards': {
          const flashcardsResponse = await flashcardAPI.getFlashcardsByTeacher(user._id);
          data = flashcardsResponse.data;
          exportFunction = exportFlashcardsToExcel;
          fileName = `flashcards_professor_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
          break;
        }
        case 'classes': {
          const classesResponse = await classAPI.getClassesByTeacher(user._id);
          data = classesResponse.data;
          exportFunction = exportClassesToExcel;
          fileName = `turmas_professor_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
          break;
        }
        case 'performance':
          if (teacherPerformance) {
            exportFunction = exportPerformanceToExcel;
            fileName = `desempenho_professor_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
            exportPerformanceToExcel(teacherPerformance, fileName);
            setAlert({ message: 'Desempenho exportado com sucesso!', type: 'success' });
            return;
          }
          break;
        default:
          setAlert({ message: 'Tipo de dados inválido para exportação', type: 'error' });
          return;
      }

      if (exportFunction && data) {
        exportFunction(data, fileName);
        setAlert({ message: `${dataType.charAt(0).toUpperCase() + dataType.slice(1)} exportado(s) com sucesso!`, type: 'success' });
      }
    } catch (error) {
      setAlert({ message: `Erro ao exportar ${dataType}: ${error.message}`, type: 'error' });
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
        setIsActive(response.data.status === 'running');
        // Atualizar o tipo da sessão
        setSessionType(response.data.type);
      }
    } catch (error) {
      // Se não houver sessão ativa, é normal - não faz nada
      if (!error.message.includes('Nenhuma sessão ativa') && !error.message.includes('404')) {
        console.error('Erro ao carregar sessão ativa:', error);
      }
    }
  };

  // Função para carregar sessões recentes
  const loadRecentSessions = async () => {
    try {
      const response = await pomodoroAPI.getSessions({ limit: 5 });
      setRecentSessions(response.data || []);
    } catch (error) {
      // Tratar erros de rede de forma mais graciosa
      if (error.message.includes('Falha na conexão com o servidor') ||
          error.message.includes('Failed to fetch')) {
        // Não exibir alerta para erros de conexão, apenas manter sessões anteriores
      } else {
        setAlert({ message: 'Erro ao carregar sessões recentes: ' + error.message, type: 'error' });
      }
    }
  };


  // Função para carregar as estatísticas do aluno ou professor
  const loadStats = useCallback(async () => {
    try {
      // Carregar estatísticas de Pomodoro
      const pomodoroStats = await pomodoroAPI.getStats();

      // Carregar tarefas
      let allTasksResponse = { data: [] };

      try {
        allTasksResponse = await taskAPI.getTasks();
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error.message);
        // Verificar se é erro de conexão para não exibir alerta
        if (!error.message.includes('Falha na conexão com o servidor') &&
            !error.message.includes('Failed to fetch')) {
          setAlert({ message: 'Erro ao carregar tarefas: ' + error.message, type: 'error' });
        } else { /* empty */ }
        // Continuar com arrays vazios para evitar quebra de interface
      }

      // Calcular estatísticas de tarefas do usuário logado

      let completedTasks = 0;
      let totalTasks = 0;
      const userTasksWithAssignments = [];

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
                userTasksWithAssignments.push({ ...task, currentAssignment: assignment });
              }
            });
          }
        });
      }

      // Se for professor, carregar desempenho adicional
      let teacherPerf = null;
      if (user.role === 'teacher') {
        try {
          const perfResponse = await performanceAPI.getTeacherPerformance(user._id);
          teacherPerf = perfResponse.data;
          setTeacherPerformance(teacherPerf);
        } catch (perfError) {
          console.error('Erro ao carregar desempenho do professor:', perfError.message);
        }
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

      // Carregar e calcular aproveitamento de flashcards DO BACKEND
      let flashcardAcc = 0;
      try {
        const flashcardStatsResponse = await flashcardAPI.getAggregateFlashcardStats();
        if (flashcardStatsResponse.data && flashcardStatsResponse.data.overallAccuracy !== undefined) {
          flashcardAcc = flashcardStatsResponse.data.overallAccuracy;
          console.log('Aproveitamento de flashcards (backend):', flashcardAcc + '%');
        }
      } catch (flashcardError) {
        console.error('Erro ao carregar estatísticas de flashcard do backend:', flashcardError);
        // Fallback para estatísticas locais
        flashcardAcc = getOverallAccuracy();
        console.log('Aproveitamento de flashcards (local):', flashcardAcc + '%');
      }

      // Filtrar tarefas concluídas e ordenar por data de conclusão (mais recentes primeiro)
      const completedTasksList = userTasksWithAssignments
        .filter(task => task.currentAssignment?.status === 'completed')
        .sort((a, b) => {
          const dateA = a.currentAssignment?.completed_at ? new Date(a.currentAssignment.completed_at) : new Date(0);
          const dateB = b.currentAssignment?.completed_at ? new Date(b.currentAssignment.completed_at) : new Date(0);
          return dateB - dateA; // Mais recentes primeiro
        });

      // Filtrar tarefas pendentes (não concluídas) ordenadas por prazo
      const pendingTasksList = userTasksWithAssignments
        .filter(task => task.currentAssignment?.status !== 'completed')
        .sort((a, b) => {
          const dateA = a.due_date ? new Date(a.due_date) : new Date('9999-12-31');
          const dateB = b.due_date ? new Date(b.due_date) : new Date('9999-12-31');
          return dateA - dateB; // Prazos mais próximos primeiro
        });

      setStats({
        focusTime: focusTimeFormatted,
        completedTasks,
        totalTasks,
        flashcardAccuracy: flashcardAcc,
        // Últimas tarefas concluídas (para estatísticas)
        recentCompletedTasks: completedTasksList.slice(0, 5),
        // Tarefas pendentes (para dashboard)
        pendingTasks: pendingTasksList.slice(0, 5),
        // Adicionar dados de desempenho do professor
        teacherPerformance: teacherPerf
      });

      // Para exibir na tela de tarefas, carregar todas as tarefas do usuário
      if (activeScreen === 'tasks') {
        setTasks(userTasksWithAssignments);
      }
    } catch (error) {
      setAlert({ message: 'Erro ao carregar estatísticas: ' + error.message, type: 'error' });
    }
  }, [user, activeScreen, getOverallAccuracy]);

  // Função para carregar tarefas específicas para a tela de tarefas
  const loadTasksForScreen = useCallback(async () => {
    try {
      // Obter tarefas diretamente da API
      const tasksResponse = await taskAPI.getTasks();

      // Verificar se há dados válidos
      if (!tasksResponse || !tasksResponse.data) {
        setTasks([]);
        return;
      }

      // Filtrar tarefas atribuídas ao usuário logado E incluir currentAssignment
      const userTasks = [];
      
      tasksResponse.data.forEach(task => {
        if (!task.assigned_to || !Array.isArray(task.assigned_to)) {
          return;
        }

        // Encontrar o assignment específico do usuário atual
        const userAssignment = task.assigned_to.find(assignment => {
          if (!assignment || !assignment.user) {
            return false;
          }

          // Obter o ID do usuário - pode ser um objeto com _id, id ou uma string diretamente
          let assignmentUserId;
          if (typeof assignment.user === 'string') {
            assignmentUserId = assignment.user;
          } else if (assignment.user && typeof assignment.user._id !== 'undefined') {
            assignmentUserId = assignment.user._id;
          } else if (assignment.user && typeof assignment.user.id !== 'undefined') {
            assignmentUserId = assignment.user.id;
          } else {
            return false;
          }

          // Obter o ID do usuário logado (pode estar em user._id ou user.id)
          const currentUserId = user ? (user._id || user.id) : null;

          // Comparar IDs convertendo ambos para string
          const match = assignmentUserId && currentUserId &&
                 assignmentUserId.toString() === currentUserId.toString();

          return match;
        });

        // Se encontrou o assignment do usuário, adicionar a tarefa com currentAssignment
        if (userAssignment) {
          userTasks.push({
            ...task,
            currentAssignment: userAssignment // Incluir o assignment específico do usuário
          });
        }
      });

      console.log('Dashboard - Tarefas carregadas:', userTasks.length, userTasks.map(t => ({
        title: t.title,
        status: t.currentAssignment?.status
      })));

      // Atualizar o estado com as tarefas filtradas
      setTasks(userTasks);

    } catch (error) {
      console.error('Erro completo ao carregar tarefas:', error);
      setAlert({ message: 'Erro ao carregar tarefas: ' + error.message, type: 'error' });
      setTasks([]); // Garantir que o estado seja limpo em caso de erro
    }
  }, [user, setTasks, setAlert]);

  useEffect(() => {
    // Carregar dados iniciais quando o componente montar
    loadActiveSession(); // Carregar sessão ativa de Pomodoro (se houver)
    loadRecentSessions();
    loadStats();
    loadFlashcards();

    // Certificar-se de carregar as tarefas corretas para a tela inicial se for a tela de tarefas
    if (activeScreen === 'tasks') {
      setTimeout(() => {
        loadTasksForScreen();
      }, 100); // Pequeno delay para garantir que o estado esteja sincronizado
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas uma vez quando o componente monta

  // Efeito para recarregar as tarefas quando a tela ativa mudar
  useEffect(() => {
    // Sempre recarregar tarefas quando a tela mudar para 'tasks'
    if (activeScreen === 'tasks') {
      loadTasksForScreen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScreen]); // Apenas recarregar quando a tela mudar

  const pageTitles = {
    'dashboard': 'Dashboard',
    'tasks': 'Tarefas',
    'pomodoro': 'Pomodoro',
    'flashcards': 'Flashcards',
    'stats': 'Estatísticas',
    'settings': 'Configurações',
    'my-classes': 'Minhas Turmas',
    'teacher-classes': 'Minhas Turmas',
    'teacher-tasks': 'Gerenciar Tarefas',
    'teacher-flashcards': 'Gerenciar Flashcards',
    'teacher-performance': 'Desempenho'
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
    <div className="container-app">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src="/logoVe.png" alt="PomoDash Logo" style={{ height: '50px', marginRight: '10px', borderRadius: '12px' }} />
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
          <div className={`menu-item ${activeScreen === 'stats' ? 'active' : ''}`} onClick={() => {showScreen('stats'); setSidebarOpen(false);}}>
            <i className="fas fa-chart-bar"></i><span>Estatísticas</span>
          </div>

          {/* Item do menu para alunos - Minhas Turmas */}
          {user?.role === 'student' && (
            <div className={`menu-item ${activeScreen === 'my-classes' ? 'active' : ''}`} onClick={() => {showScreen('my-classes'); setSidebarOpen(false);}}>
              <i className="fas fa-users"></i><span>Minhas Turmas</span>
            </div>
          )}

          {/* Itens do menu para professores */}
          {user?.role === 'teacher' && (
            <>
              <div className={`menu-item ${activeScreen === 'teacher-classes' ? 'active' : ''}`} onClick={() => {showScreen('teacher-classes'); setSidebarOpen(false);}}>
                <i className="fas fa-chalkboard-teacher"></i><span>Minhas Turmas</span>
              </div>
              <div className={`menu-item ${activeScreen === 'teacher-tasks' ? 'active' : ''}`} onClick={() => {showScreen('teacher-tasks'); setSidebarOpen(false);}}>
                <i className="fas fa-tasks"></i><span>Gerenciar Tarefas</span>
              </div>
              <div className={`menu-item ${activeScreen === 'teacher-flashcards' ? 'active' : ''}`} onClick={() => {showScreen('teacher-flashcards'); setSidebarOpen(false);}}>
                <i className="fas fa-layer-group"></i><span>Gerenciar Flashcards</span>
              </div>
              <div className={`menu-item ${activeScreen === 'teacher-performance' ? 'active' : ''}`} onClick={() => {showScreen('teacher-performance'); setSidebarOpen(false);}}>
                <i className="fas fa-chart-line"></i><span>Desempenho</span>
              </div>
            </>
          )}
        </div>
        <div className="profile" onClick={() => {openProfileModal(); setSidebarOpen(false);}}>
          <div className="profile-img-container">
            <img src={profileImage} alt="User" className="profile-img" />
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
        <div className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`} id="dashboard">
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
            <h3 className="card-title">
              <i className="fas fa-clock" style={{ color: '#ffc107', marginRight: '8px' }}></i>
              Suas próximas 5 tarefas pendentes
            </h3>
            {stats.pendingTasks && stats.pendingTasks.length > 0 ? (
              <div className="task-list">
                {stats.pendingTasks.map(task => (
                  <div key={task._id} className="task-item">
                    <div className="task-content">
                      <div className="task-title">
                        {task.title}
                      </div>
                      <div className="task-details">
                        Disciplina: {task.subject || 'N/A'} • 
                        Prazo: {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'Sem prazo'} • 
                        Prioridade: {task.priority}
                      </div>
                    </div>
                    <span className="task-status pending" style={{ background: '#ffc107', color: '#856404', padding: '4px 12px', borderRadius: '20px' }}>
                      <i className="fas fa-clock"></i> Pendente
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#6c757d' }}>
                <i className="fas fa-check-double" style={{ marginRight: '8px', color: '#28a745' }}></i>
                Parabéns! Você não tem tarefas pendentes.
              </p>
            )}
          </div>

          {/* Últimas sessões de Pomodoro */}
          <div className="card">
            <h3 className="card-title">Suas últimas sessões</h3>
            {recentSessions && recentSessions.length > 0 ? (
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
              <p>Você não tem sessões registradas ainda.</p>
            )}
          </div>
        </div>

        {/* Tasks Screen */}
        <div className={`screen ${activeScreen === 'tasks' ? 'active' : ''}`} id="tasks">
            <div className="card">
                <h3 className="card-title">Gerenciar Tarefas</h3>
                {/* Botão para criar tarefa */}
                <div className="create-task-section">
                  <button
                    className="btn btn-primary btn-toggle-form"
                    onClick={() => setShowTaskForm(!showTaskForm)}
                  >
                    <i className={showTaskForm ? 'fas fa-times' : 'fas fa-plus'}></i>
                    {showTaskForm ? ' Cancelar' : ' Criar Nova Tarefa'}
                  </button>
                  {showTaskForm && (
                    <form onSubmit={handleAddTask} className="beautiful-form" style={{marginTop: '20px'}}>
                      <div className="form-group">
                        <label className="form-label">Título da Tarefa *</label>
                        <input
                          type="text"
                          value={newTask.title}
                          onChange={(e) => handleNewTaskChange('title', e.target.value)}
                          placeholder="Ex: Estudar para a prova de matemática"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Disciplina</label>
                          <input
                            type="text"
                            value={newTask.subject}
                            onChange={(e) => handleNewTaskChange('subject', e.target.value)}
                            placeholder="Ex: Matemática"
                            className="input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Data de Entrega</label>
                          <input
                            type="date"
                            value={newTask.due_date}
                            onChange={(e) => handleNewTaskChange('due_date', e.target.value)}
                            className="input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Prioridade</label>
                          <select
                            value={newTask.priority}
                            onChange={(e) => handleNewTaskChange('priority', e.target.value)}
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
                          onChange={(e) => handleNewTaskChange('description', e.target.value)}
                          placeholder="Descreva os detalhes da tarefa..."
                          className="input textarea-fixed"
                          rows="4"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Anexos</label>
                        <div className="attachments-upload-section">
                          <label htmlFor="attachment-input" className="attachment-upload-btn">
                            <i className="fas fa-paperclip"></i>
                            <span>Adicionar arquivo</span>
                          </label>
                          <input
                            id="attachment-input"
                            type="file"
                            multiple
                            onChange={handleAttachmentChange}
                            style={{display: 'none'}}
                          />
                          {newTask.attachments && newTask.attachments.length > 0 && (
                            <div className="attachments-list">
                              {newTask.attachments.map((file, index) => (
                                <div key={index} className="attachment-item">
                                  <span><i className="fas fa-file"></i> {file.name}</span>
                                  <button type="button" onClick={() => removeAttachment(index)} className="btn-remove-attachment">
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="btn btn-primary btn-submit">
                          <i className="fas fa-plus"></i> Criar Tarefa
                        </button>
                        <button type="button" className="btn btn-secondary btn-cancel" onClick={() => setShowTaskForm(false)}>
                          <i className="fas fa-times"></i> Cancelar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                {/* Função auxiliar para renderizar item de tarefa */}
                {(() => {
                  // Função para obter status da tarefa - usa currentAssignment se disponível
                  const getTaskStatus = (task) => {
                    // Se a tarefa já tem currentAssignment (adicionado em loadTasksForScreen), usar ele
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

                  // Verificar se a tarefa foi criada pelo próprio usuário
                  const isMyTask = (task) => {
                    const creatorId = task.created_by?._id || task.created_by;
                    const currentUserId = user._id || user.id;
                    return creatorId?.toString() === currentUserId?.toString();
                  };

                  // Separar tarefas pessoais e do professor
                  const myTasks = tasks?.filter(task => isMyTask(task)) || [];
                  const teacherTasks = tasks?.filter(task => !isMyTask(task)) || [];
                  
                  // Subdividir por status
                  const myPendingTasks = myTasks.filter(task => getTaskStatus(task) !== 'completed');
                  const myCompletedTasks = myTasks.filter(task => getTaskStatus(task) === 'completed');
                  const teacherPendingTasks = teacherTasks.filter(task => getTaskStatus(task) !== 'completed');
                  const teacherCompletedTasks = teacherTasks.filter(task => getTaskStatus(task) === 'completed');

                  const renderTaskItem = (task, status, isFromTeacher = false) => (
                    <div key={task._id} className={`task-item ${status === 'completed' ? 'completed' : status === 'in_progress' ? 'in_progress' : ''} ${isFromTeacher ? 'from-teacher' : ''}`}>
                      <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={status === 'completed'}
                        onChange={() => toggleTaskCompletion(task._id, status)}
                      />
                      <div className="task-content">
                        <div className="task-title">
                          {task.title}
                          {isFromTeacher && (
                            <span className="teacher-badge" title="Tarefa do Professor">
                              <i className="fas fa-chalkboard-teacher"></i>
                            </span>
                          )}
                        </div>
                        <div className="task-description">{task.description}</div>
                        <div className="task-details">
                          Disciplina: {task.subject || 'N/A'} • Prazo: {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'Sem prazo'} • Prioridade: {task.priority}
                        </div>
                        {task.attachments && task.attachments.length > 0 && (
                          <div className="task-attachments">
                            {task.attachments.map((attachment, index) => (
                              <a 
                                key={index} 
                                className="attachment-tag" 
                                href={attachment.url || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                download={attachment.name || attachment.filename}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!attachment.url) {
                                    e.preventDefault();
                                    setAlert({ message: 'Download não disponível - arquivo não foi enviado ao servidor', type: 'warning' });
                                  }
                                }}
                                title={attachment.url ? "Clique para baixar" : "Download não disponível"}
                              >
                                <i className="fas fa-download"></i> {attachment.name || attachment.filename}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Badge de status da tarefa */}
                      <span className="task-completed-badge">
                        <i className="fas fa-check-circle"></i> Concluída
                      </span>
                      <span className="task-pending-badge">
                        <i className="fas fa-clock"></i> {status === 'in_progress' ? 'Em andamento' : 'Pendente'}
                      </span>
                      {!isFromTeacher && (
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
                      )}
                    </div>
                  );

                  return (
                    <>
                      {/* Seção de Tarefas do Professor */}
                      {teacherTasks.length > 0 && (
                        <div className="tasks-category teacher-tasks-category">
                          <div className="category-header">
                            <i className="fas fa-chalkboard-teacher"></i>
                            <h3>Tarefas do Professor</h3>
                            <span className="task-count">{teacherTasks.length} tarefa{teacherTasks.length !== 1 ? 's' : ''}</span>
                          </div>
                          
                          {/* Pendentes do Professor */}
                          {teacherPendingTasks.length > 0 && (
                            <div className="tasks-section">
                              <h4 className="tasks-section-title pending-subtitle">
                                <i className="fas fa-clock"></i> Pendentes ({teacherPendingTasks.length})
                              </h4>
                              <div className="task-list">
                                {teacherPendingTasks.map(task => renderTaskItem(task, getTaskStatus(task), true))}
                              </div>
                            </div>
                          )}
                          
                          {/* Concluídas do Professor */}
                          {teacherCompletedTasks.length > 0 && (
                            <div className="tasks-section completed-section">
                              <h4 className="tasks-section-title completed-subtitle">
                                <i className="fas fa-check-circle"></i> Concluídas ({teacherCompletedTasks.length})
                              </h4>
                              <div className="task-list">
                                {teacherCompletedTasks.map(task => renderTaskItem(task, 'completed', true))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Seção de Minhas Tarefas (pessoais) */}
                      <div className="tasks-category my-tasks-category">
                        <div className="category-header">
                          <i className="fas fa-user"></i>
                          <h3>Minhas Tarefas</h3>
                          <span className="task-count">{myTasks.length} tarefa{myTasks.length !== 1 ? 's' : ''}</span>
                        </div>
                        
                        {/* Pendentes Pessoais */}
                        <div className="tasks-section">
                          <h4 className="tasks-section-title pending-subtitle">
                            <i className="fas fa-clock"></i> Pendentes ({myPendingTasks.length})
                          </h4>
                          <div className="task-list">
                            {myPendingTasks.length > 0 ? (
                              myPendingTasks.map(task => renderTaskItem(task, getTaskStatus(task), false))
                            ) : (
                              <p className="no-tasks-message">
                                <i className="fas fa-check-double"></i> Parabéns! Você não tem tarefas pendentes.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Concluídas Pessoais */}
                        <div className="tasks-section completed-section">
                          <h4 className="tasks-section-title completed-subtitle">
                            <i className="fas fa-check-circle"></i> Concluídas ({myCompletedTasks.length})
                          </h4>
                          <div className="task-list">
                            {myCompletedTasks.length > 0 ? (
                              myCompletedTasks.map(task => renderTaskItem(task, 'completed', false))
                            ) : (
                              <p className="no-tasks-message">
                                <i className="fas fa-tasks"></i> Nenhuma tarefa concluída ainda.
                              </p>
                            )}
                          </div>
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
                  {activeSession && (
                    <button onClick={abandonSession} className="btn btn-danger">
                      Parar Sessão
                    </button>
                  )}
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
            <h3 className="card-title">Seus Flashcards</h3>
            {/* Botão para criar flashcard */}
            <div className="create-flashcard-section">
              <button
                className="btn btn-primary btn-toggle-form"
                onClick={() => setShowFlashcardForm(!showFlashcardForm)}
              >
                <i className={showFlashcardForm ? 'fas fa-times' : 'fas fa-plus'}></i>
                {showFlashcardForm ? ' Cancelar' : ' Criar Novo Flashcard'}
              </button>
              {showFlashcardForm && (
                <form onSubmit={handleCreateFlashcard} className="beautiful-form" style={{marginTop: '20px'}}>
                  <div className="form-group">
                    <label className="form-label">Pergunta *</label>
                    <textarea
                      value={newFlashcard.question}
                      onChange={(e) => setNewFlashcard({...newFlashcard, question: e.target.value})}
                      placeholder="Digite a pergunta do flashcard..."
                      className="input textarea-fixed"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Resposta *</label>
                    <textarea
                      value={newFlashcard.answer}
                      onChange={(e) => setNewFlashcard({...newFlashcard, answer: e.target.value})}
                      placeholder="Digite a resposta do flashcard..."
                      className="input textarea-fixed"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      value={newFlashcard.tags.join(', ')}
                      onChange={(e) => setNewFlashcard({...newFlashcard, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                      placeholder="Ex: matemática, física, química (separadas por vírgula)"
                      className="input"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary btn-submit">
                      <i className="fas fa-plus"></i> Criar Flashcard
                    </button>
                    <button type="button" className="btn btn-secondary btn-cancel" onClick={() => {
                      setShowFlashcardForm(false);
                      setNewFlashcard({ question: '', answer: '', tags: [] });
                    }}>
                      <i className="fas fa-times"></i> Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>

            {flashcards && flashcards.length > 0 ? (
              <div className="flashcard-grid">
                {flashcards.map(card => (
                  <div key={card._id} className={`flashcard ${selectedCard === card._id ? 'flipped' : ''}`} onClick={() => flipCard(card._id)}>
                    <div className="flashcard-content">
                      <div className="flashcard-inner">
                        <div className="flashcard-front" style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          textAlign: 'center',
                          padding: '20px'
                        }}>
                          {card.question}
                        </div>
                        <div className="flashcard-back" style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          textAlign: 'center',
                          padding: '20px'
                        }}>
                          {card.answer}
                        </div>
                      </div>
                    </div>
                    <div className="flashcard-stats" style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      position: 'absolute', 
                      bottom: '10px', 
                      left: '10px',
                      zIndex: 5
                    }}>
                      <span style={{
                        background: (card.stats?.accuracy || 0) >= 70 ? '#28a745' : (card.stats?.accuracy || 0) >= 40 ? '#ffc107' : '#dc3545',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }} title={`Aproveitamento: ${card.stats?.accuracy || 0}%`}>
                        <i className="fas fa-chart-line" style={{ marginRight: '4px' }}></i>
                        {card.stats?.accuracy || 0}%
                      </span>
                      <span style={{
                        background: '#6c757d',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }} title={`Tentativas: ${card.stats?.attempts || 0}`}>
                        <i className="fas fa-redo" style={{ marginRight: '4px' }}></i>
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

        {/* Stats Screen */}
        <div className={`screen ${activeScreen === 'stats' ? 'active' : ''}`} id="stats">
            <div className="card">
                <h3 className="card-title">Suas Estatísticas</h3>
                <div className="stats-grid">
                    <div className="stat-item">
                        <h4>Tempo de Foco</h4>
                        <p className="stat-value">{stats.focusTime}</p>
                    </div>
                    <div className="stat-item">
                        <h4>Tarefas Concluídas</h4>
                        <p className="stat-value">{stats.completedTasks}/{stats.totalTasks}</p>
                    </div>
                    <div className="stat-item">
                        <h4>Flashcards Criados</h4>
                        <p className="stat-value">{flashcards.length}</p>
                    </div>
                    <div className="stat-item">
                        <h4>Sessões de Pomodoro</h4>
                        <p className="stat-value">{recentSessions.length}</p>
                    </div>
                </div>

                {/* Últimas sessões de Pomodoro */}
                <div className="recent-activity">
                    <h4>Sessões Recentes</h4>
                    {recentSessions && recentSessions.length > 0 ? (
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

                {/* Tarefas Concluídas Recentes */}
                <div className="recent-activity">
                    <h4><i className="fas fa-check-circle" style={{ color: '#6b7280', marginRight: '8px' }}></i>Últimas 5 tarefas concluídas</h4>
                    {stats.recentCompletedTasks && stats.recentCompletedTasks.length > 0 ? (
                        <div className="task-list">
                            {stats.recentCompletedTasks.map(task => (
                                <div key={task._id} className="task-item completed">
                                    <div className="task-content">
                                        <div className="task-title" style={{ textDecoration: 'line-through', color: '#9ca3af' }}>{task.title}</div>
                                        <div className="task-details" style={{ color: '#9ca3af' }}>
                                            Disciplina: {task.subject || 'N/A'} • Prazo: {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'Sem prazo'} • Prioridade: {task.priority}
                                        </div>
                                    </div>
                                    <span className="task-status completed" style={{ background: '#28a745', color: 'white', padding: '4px 12px', borderRadius: '20px' }}>
                                        <i className="fas fa-check"></i> Concluída
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: '#6c757d' }}>
                            <i className="fas fa-tasks" style={{ marginRight: '8px' }}></i>
                            Você ainda não concluiu nenhuma tarefa.
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Student My Classes Screen */}
        {activeScreen === 'my-classes' && user?.role === 'student' && (
          <div className="screen active" id="my-classes">
            <div className="card">
              <h3 className="card-title">
                <i className="fas fa-users" style={{ marginRight: '8px', color: '#5cb85c' }}></i>
                Minhas Turmas
              </h3>
              
              {loadingClasses ? (
                <p className="loading-text"><i className="fas fa-spinner fa-spin"></i> Carregando turmas...</p>
              ) : studentClasses.length > 0 ? (
                <div className="student-classes-grid">
                  {studentClasses.map(cls => (
                    <div 
                      key={cls._id} 
                      className={`student-class-card ${selectedClassId === cls._id ? 'selected' : ''}`}
                      onClick={() => setSelectedClassId(cls._id === selectedClassId ? null : cls._id)}
                    >
                      <div className="class-header">
                        <h4>{cls.name}</h4>
                        <span className="class-subject">{cls.subject}</span>
                      </div>
                      <div className="class-info">
                        <p><i className="fas fa-chalkboard-teacher"></i> {cls.teacher_id?.name || 'Professor'}</p>
                        <p><i className="fas fa-calendar"></i> {cls.academic_year}</p>
                      </div>
                      {selectedClassId === cls._id && (
                        <div className="class-selected-indicator">
                          <i className="fas fa-check-circle"></i> Selecionada
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">
                  <i className="fas fa-info-circle"></i> Você ainda não está matriculado em nenhuma turma.
                </p>
              )}
            </div>

            {/* Conteúdo da Turma Selecionada */}
            {selectedClassId && (
              <>
                {/* Tarefas da Turma */}
                <div className="card" style={{ marginTop: '20px' }}>
                  <h3 className="card-title">
                    <i className="fas fa-tasks" style={{ marginRight: '8px', color: '#0275d8' }}></i>
                    Tarefas da Turma
                  </h3>
                  
                  {classTasks.length > 0 ? (
                    <div className="class-tasks-list">
                      {classTasks.map(task => (
                        <div key={task._id} className="class-task-item">
                          <div className="task-info">
                            <h4>{task.title}</h4>
                            <p>{task.description?.substring(0, 100) || 'Sem descrição'}</p>
                          </div>
                          <div className="task-meta">
                            <span className={`priority-badge priority-${task.priority}`}>
                              {task.priority === 'urgent' ? 'Urgente' : task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                            </span>
                            {task.due_date && (
                              <span className="due-date">
                                <i className="fas fa-clock"></i>
                                {new Date(task.due_date).toLocaleDateString('pt-BR')}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-message">Nenhuma tarefa encontrada para esta turma.</p>
                  )}
                </div>

                {/* Flashcards da Turma */}
                <div className="card" style={{ marginTop: '20px' }}>
                  <h3 className="card-title">
                    <i className="fas fa-clone" style={{ marginRight: '8px', color: '#6f42c1' }}></i>
                    Flashcards da Turma
                  </h3>
                  
                  {classFlashcards.length > 0 ? (
                    <div className="class-flashcards-grid">
                      {classFlashcards.map(card => (
                        <div 
                          key={card._id} 
                          className="class-flashcard-item"
                          onClick={() => setSelectedCard(selectedCard?._id === card._id ? null : card)}
                        >
                          <div className="flashcard-question">
                            <strong>P:</strong> {card.question.substring(0, 80)}{card.question.length > 80 ? '...' : ''}
                          </div>
                          {selectedCard?._id === card._id && (
                            <div className="flashcard-answer">
                              <strong>R:</strong> {card.answer}
                            </div>
                          )}
                          {card.tags?.length > 0 && (
                            <div className="flashcard-tags">
                              {card.tags.map((tag, i) => (
                                <span key={i} className="tag">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-message">Nenhum flashcard encontrado para esta turma.</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Teacher Classes Screen */}
        <div className={`screen ${activeScreen === 'teacher-classes' ? 'active' : ''}`} id="teacher-classes">
          {user?.role === 'teacher' && (
            <TeacherClassManagement user={user} darkMode={darkMode} />
          )}
        </div>

        {/* Teacher Tasks Screen */}
        <div className={`screen ${activeScreen === 'teacher-tasks' ? 'active' : ''}`} id="teacher-tasks">
          {user?.role === 'teacher' && (
            <TeacherTaskManagement user={user} darkMode={darkMode} />
          )}
        </div>

        {/* Teacher Flashcards Screen */}
        <div className={`screen ${activeScreen === 'teacher-flashcards' ? 'active' : ''}`} id="teacher-flashcards">
          {user?.role === 'teacher' && (
            <TeacherFlashcardManagement user={user} darkMode={darkMode} />
          )}
        </div>

        {/* Teacher Performance Screen */}
        <div className={`screen ${activeScreen === 'teacher-performance' ? 'active' : ''}`} id="teacher-performance">
          {user?.role === 'teacher' && (
            <div className={`teacher-performance ${darkMode ? 'dark-theme' : ''}`}>
              <div className="header-section">
                <h2>Desempenho dos Alunos</h2>
                <div className="export-buttons">
                  <button
                    className="btn btn-secondary"
                    onClick={() => exportTeacherData('classes')}
                  >
                    Exportar Turmas
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => exportTeacherData('tasks')}
                  >
                    Exportar Tarefas
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => exportTeacherData('flashcards')}
                  >
                    Exportar Flashcards
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => exportTeacherData('performance')}
                  >
                    Exportar Desempenho
                  </button>
                </div>
              </div>

              {teacherPerformance ? (
                <div className="performance-content">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <h4>Total de Turmas</h4>
                      <p className="stat-value">{teacherPerformance.totalClasses || 0}</p>
                    </div>
                    <div className="stat-item">
                      <h4>Total de Alunos</h4>
                      <p className="stat-value">{teacherPerformance.totalStudents || 0}</p>
                    </div>
                    <div className="stat-item">
                      <h4>Tarefas Criadas</h4>
                      <p className="stat-value">{teacherPerformance.totalTasks || 0}</p>
                    </div>
                    <div className="stat-item">
                      <h4>Flashcards Criados</h4>
                      <p className="stat-value">{teacherPerformance.totalFlashcards || 0}</p>
                    </div>
                  </div>

                  {/* Gráficos e detalhes do desempenho */}
                  <div className="performance-details">
                    <h3>Detalhes do Desempenho</h3>
                    {teacherPerformance.classes && teacherPerformance.classes.map(cls => (
                      <div key={cls._id} className="class-performance">
                        <h4>{cls.name}</h4>
                        <div className="class-stats">
                          <span>Média de foco: {cls.avgFocusTime || 0} min</span>
                          <span>Conclusão de tarefas: {cls.completionRate || 0}%</span>
                          <span>Aproveitamento de flashcards: {cls.flashcardAccuracy || 0}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>Carregando dados de desempenho...</p>
              )}

              <style jsx>{`
                .teacher-performance {
                  padding: 20px;
                  background: var(--background-color);
                  min-height: 100vh;
                }

                .dark-theme .teacher-performance {
                  background: var(--background-color);
                }

                .header-section {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 30px;
                }

                .export-buttons {
                  display: flex;
                  gap: 10px;
                }

                .performance-content {
                  background: var(--card-background);
                  padding: 20px;
                  border-radius: 8px;
                  border: 1px solid var(--border-color);
                }

                .dark-theme .performance-content {
                  background: var(--card-background);
                  border-color: var(--border-color);
                }

                .class-performance {
                  margin-top: 20px;
                  padding: 15px;
                  border: 1px solid var(--border-color);
                  border-radius: 8px;
                }

                .dark-theme .class-performance {
                  border-color: var(--border-color);
                }

                .class-stats {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 15px;
                  margin-top: 10px;
                }
              `}</style>
            </div>
          )}
        </div>

      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="profile-modal" onClick={closeProfileModal}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeProfileModal}>&times;</button>
            <div className="profile-modal-header">
              <div className="profile-modal-img-container">
                <img src={profileImage} alt="User" className="profile-modal-img" />
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
                <p>{user?.roleDescription || 'Tipo de Usuário'}</p>
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
                <span>{user?.roleDescription || 'Tipo de Usuário'}</span>
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
  /* ==================== CSS VARIABLES - DARK THEME ==================== */
  body.dark-theme {
    /* Backgrounds */
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --bg-card: #1e1e2f;
    --bg-card-hover: #252540;
    --bg-input: rgba(0,0,0,0.4);
    --bg-sidebar: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    
    /* Forms */
    --form-bg: linear-gradient(135deg, rgba(30,30,47,0.98) 0%, rgba(22,33,62,0.95) 100%);
    --form-border: rgba(255,255,255,0.1);
    --form-shadow: 0 8px 32px rgba(0,0,0,0.5);
    --form-label-color: #e0e0e0;
    --form-input-bg: rgba(0,0,0,0.4);
    --form-input-color: #fff;
    --form-input-border: rgba(255,255,255,0.15);
    --form-input-placeholder: #777;
    --form-divider: rgba(255,255,255,0.08);
    
    /* Text Colors */
    --text-primary: #f5f5f5;
    --text-secondary: #b0b0b0;
    --text-muted: #888;
    --text-color: #f5f5f5;
    
    /* Borders */
    --border-color: rgba(255,255,255,0.1);
    --border-light: rgba(255,255,255,0.05);
    
    /* Buttons */
    --btn-cancel-bg: rgba(255,255,255,0.1);
    --btn-cancel-color: #ccc;
    --btn-cancel-hover-bg: rgba(255,255,255,0.15);
    
    /* Attachments */
    --attachment-btn-bg: rgba(255,255,255,0.08);
    --attachment-btn-border: rgba(255,255,255,0.15);
    --attachment-btn-color: #aaa;
    --attachment-btn-hover-bg: rgba(255,255,255,0.12);
    --attachment-item-bg: rgba(2, 117, 216, 0.25);
    --attachment-item-color: #7bb8eb;
    --btn-remove-color: #ff6b6b;
    
    /* Cards & Components */
    --card-bg: linear-gradient(135deg, rgba(30,30,47,0.95) 0%, rgba(22,33,62,0.9) 100%);
    --card-border: rgba(255,255,255,0.08);
    --card-shadow: 0 4px 20px rgba(0,0,0,0.4);
    
    /* Tasks */
    --task-item-bg: rgba(255,255,255,0.03);
    --task-item-border: rgba(255,255,255,0.08);
    --task-item-hover: rgba(255,255,255,0.06);
  }

  body:not(.dark-theme) {
    /* Backgrounds */
    --bg-primary: #f5f7fa;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --bg-card-hover: #f8f9fa;
    --bg-input: rgba(255,255,255,0.95);
    --bg-sidebar: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    
    /* Forms */
    --form-bg: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,250,0.95) 100%);
    --form-border: rgba(0,0,0,0.08);
    --form-shadow: 0 8px 32px rgba(0,0,0,0.08);
    --form-label-color: #333;
    --form-input-bg: rgba(255,255,255,0.95);
    --form-input-color: #333;
    --form-input-border: rgba(0,0,0,0.1);
    --form-input-placeholder: #999;
    --form-divider: rgba(0,0,0,0.06);
    
    /* Text Colors */
    --text-primary: #333;
    --text-secondary: #666;
    --text-muted: #999;
    --text-color: #333;
    
    /* Borders */
    --border-color: rgba(0,0,0,0.08);
    --border-light: rgba(0,0,0,0.04);
    
    /* Buttons */
    --btn-cancel-bg: rgba(0,0,0,0.05);
    --btn-cancel-color: #666;
    --btn-cancel-hover-bg: rgba(0,0,0,0.1);
    
    /* Attachments */
    --attachment-btn-bg: rgba(0,0,0,0.03);
    --attachment-btn-border: rgba(0,0,0,0.1);
    --attachment-btn-color: #666;
    --attachment-btn-hover-bg: rgba(0,0,0,0.06);
    --attachment-item-bg: rgba(2, 117, 216, 0.1);
    --attachment-item-color: #0275d8;
    --btn-remove-color: #d9534f;
    
    /* Cards & Components */
    --card-bg: #ffffff;
    --card-border: rgba(0,0,0,0.08);
    --card-shadow: 0 4px 20px rgba(0,0,0,0.08);
    
    /* Tasks */
    --task-item-bg: #f8f9fa;
    --task-item-border: rgba(0,0,0,0.06);
    --task-item-hover: #f0f0f0;
  }

  /* ==================== DARK MODE GLOBAL STYLES ==================== */
  body.dark-theme .container-app {
    background: var(--bg-primary);
  }

  body.dark-theme .main-content {
    background: var(--bg-primary);
  }

  body.dark-theme .card {
    background: var(--card-bg);
    border-color: var(--card-border);
    box-shadow: var(--card-shadow);
  }

  body.dark-theme .card-title {
    color: var(--text-primary);
  }

  body.dark-theme .task-item {
    background: var(--task-item-bg);
    border-color: var(--task-item-border);
  }

  body.dark-theme .task-item:hover {
    background: var(--task-item-hover);
  }

  body.dark-theme .task-title,
  body.dark-theme .task-content {
    color: var(--text-primary);
  }

  body.dark-theme .task-description,
  body.dark-theme .task-details {
    color: var(--text-secondary);
  }

  body.dark-theme .input,
  body.dark-theme input,
  body.dark-theme textarea,
  body.dark-theme select {
    background: var(--form-input-bg);
    color: var(--form-input-color);
    border-color: var(--form-input-border);
  }

  body.dark-theme .input::placeholder,
  body.dark-theme input::placeholder,
  body.dark-theme textarea::placeholder {
    color: var(--form-input-placeholder);
  }

  body.dark-theme .btn-secondary {
    background: var(--btn-cancel-bg);
    color: var(--btn-cancel-color);
    border-color: var(--border-color);
  }

  body.dark-theme .btn-secondary:hover {
    background: var(--btn-cancel-hover-bg);
  }

  body.dark-theme .task-edit-modal-content,
  body.dark-theme .modal-content {
    background: var(--bg-card);
    border-color: var(--border-color);
  }

  body.dark-theme .task-edit-input {
    background: var(--form-input-bg);
    color: var(--form-input-color);
    border-color: var(--form-input-border);
  }

  body.dark-theme h1, body.dark-theme h2, body.dark-theme h3, body.dark-theme h4 {
    color: var(--text-primary);
  }

  body.dark-theme p {
    color: var(--text-secondary);
  }

  body.dark-theme .stat-card,
  body.dark-theme .stat-item {
    background: var(--bg-card);
    border-color: var(--border-color);
  }

  body.dark-theme .stat-value {
    color: var(--text-primary);
  }

  body.dark-theme .stat-label {
    color: var(--text-muted);
  }

  body.dark-theme .page-title {
    color: var(--text-primary);
  }

  /* Timer Dark Mode */
  body.dark-theme .timer {
    background: var(--bg-card);
    border-color: var(--border-color);
  }

  body.dark-theme .timer-time {
    color: var(--text-primary);
  }

  body.dark-theme .timer-label {
    color: var(--text-muted);
  }

  /* Flashcards Dark Mode */
  body.dark-theme .flashcard-front-student {
    background: linear-gradient(145deg, #2a2a4a 0%, #1e1e3e 100%);
    color: var(--text-primary);
  }

  body.dark-theme .flashcard-back-student {
    background: linear-gradient(145deg, #1e3a5f 0%, #163050 100%);
    color: var(--text-primary);
  }

  body.dark-theme .flashcard-hint,
  body.dark-theme .flashcard-hint-back {
    color: var(--text-muted);
  }

  /* Recent Sessions Dark Mode */
  body.dark-theme .session-item {
    background: var(--task-item-bg);
    border-color: var(--border-color);
  }

  body.dark-theme .session-type,
  body.dark-theme .session-date {
    color: var(--text-secondary);
  }

  /* Class Cards Dark Mode */
  body.dark-theme .class-card {
    background: var(--bg-card);
    border-color: var(--border-color);
  }

  body.dark-theme .class-card:hover {
    background: var(--bg-card-hover);
  }

  body.dark-theme .class-name {
    color: var(--text-primary);
  }

  body.dark-theme .class-subject,
  body.dark-theme .class-info {
    color: var(--text-secondary);
  }

  /* Tasks Categories Dark Mode */
  body.dark-theme .category-header {
    background: var(--bg-card);
  }

  body.dark-theme .tasks-section-title,
  body.dark-theme .pending-subtitle,
  body.dark-theme .completed-subtitle {
    background: var(--task-item-bg);
  }

  body.dark-theme .no-tasks-message {
    background: var(--task-item-bg);
    color: var(--text-muted);
  }

  /* Tables Dark Mode */
  body.dark-theme table {
    background: var(--bg-card);
  }

  body.dark-theme th {
    background: var(--bg-card-hover);
    color: var(--text-primary);
    border-color: var(--border-color);
  }

  body.dark-theme td {
    color: var(--text-secondary);
    border-color: var(--border-color);
  }

  body.dark-theme tr:hover {
    background: var(--task-item-hover);
  }

  .container-app {
    display: flex;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .sidebar {
    width: 260px;
    background-color: var(--sidebar-background);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
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
    transition: transform 0.3s ease, margin-left 0.3s ease;
    margin-left: 260px;
    width: calc(100% - 260px);
  }

  .add-task-form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  /* Beautiful Form Styles */
  .beautiful-form {
    background: var(--form-bg);
    border: 1px solid var(--form-border);
    border-radius: 16px;
    padding: 24px;
    box-shadow: var(--form-shadow);
    backdrop-filter: blur(10px);
  }

  .beautiful-form .form-group {
    margin-bottom: 20px;
  }

  .beautiful-form .form-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--form-label-color);
    margin-bottom: 8px;
    letter-spacing: 0.3px;
  }

  .beautiful-form .input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--form-input-border);
    border-radius: 10px;
    font-size: 0.95rem;
    background: var(--form-input-bg);
    color: var(--form-input-color);
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .beautiful-form .input::placeholder {
    color: var(--form-input-placeholder);
  }

  .beautiful-form .input:focus {
    outline: none;
    border-color: #0275d8;
    box-shadow: 0 0 0 3px rgba(2, 117, 216, 0.15);
  }

  .beautiful-form .textarea-fixed {
    resize: none;
    min-height: 90px;
  }

  .beautiful-form .form-row-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }

  .beautiful-form .form-row-2 .form-group {
    margin-bottom: 0;
  }

  .beautiful-form select.input {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--form-divider);
  }

  .btn-submit {
    flex: 1;
    padding: 14px 24px !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    border-radius: 10px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 15px rgba(2, 117, 216, 0.3);
  }

  .btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(2, 117, 216, 0.4);
  }

  .btn-cancel {
    padding: 14px 20px !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    border-radius: 10px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--btn-cancel-bg) !important;
    color: var(--btn-cancel-color) !important;
    border: none !important;
  }

  .btn-cancel:hover {
    background: var(--btn-cancel-hover-bg) !important;
  }

  .btn-toggle-form {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px !important;
    font-weight: 600 !important;
    border-radius: 10px !important;
  }

  /* Attachments */
  .attachments-upload-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .attachment-upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--attachment-btn-bg);
    border: 2px dashed var(--attachment-btn-border);
    border-radius: 10px;
    color: var(--attachment-btn-color);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .attachment-upload-btn:hover {
    background: var(--attachment-btn-hover-bg);
    border-color: #0275d8;
    color: #0275d8;
  }

  .attachments-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .attachment-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--attachment-item-bg);
    border-radius: 8px;
    font-size: 0.85rem;
    color: var(--attachment-item-color);
  }

  .btn-remove-attachment {
    background: none;
    border: none;
    color: var(--btn-remove-color);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0 4px;
    line-height: 1;
  }

  .btn-remove-attachment:hover {
    color: #ff4444;
  }

  /* ==================== CATEGORIAS DE TAREFAS ==================== */
  .tasks-category {
    margin-bottom: 30px;
    border-radius: 16px;
    overflow: hidden;
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 12px;
    margin-bottom: 16px;
  }

  .category-header i {
    font-size: 1.3rem;
  }

  .category-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    flex: 1;
  }

  .task-count {
    font-size: 0.85rem;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 600;
  }

  /* Categoria: Tarefas do Professor */
  .teacher-tasks-category .category-header {
    background: linear-gradient(135deg, rgba(2, 117, 216, 0.15) 0%, rgba(2, 117, 216, 0.08) 100%);
    color: #0275d8;
    border: 1px solid rgba(2, 117, 216, 0.2);
  }

  .teacher-tasks-category .task-count {
    background: rgba(2, 117, 216, 0.2);
    color: #0275d8;
  }

  /* Categoria: Minhas Tarefas */
  .my-tasks-category .category-header {
    background: linear-gradient(135deg, rgba(92, 184, 92, 0.15) 0%, rgba(92, 184, 92, 0.08) 100%);
    color: #5cb85c;
    border: 1px solid rgba(92, 184, 92, 0.2);
  }

  .my-tasks-category .task-count {
    background: rgba(92, 184, 92, 0.2);
    color: #5cb85c;
  }

  /* Subtítulos de seção */
  .tasks-section {
    margin-bottom: 20px;
  }

  .tasks-section-title,
  .pending-subtitle,
  .completed-subtitle {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 12px 0;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--form-bg, rgba(0,0,0,0.02));
  }

  .pending-subtitle {
    color: #f0ad4e;
  }

  .completed-subtitle {
    color: #5cb85c;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .no-tasks-message {
    text-align: center;
    padding: 20px;
    color: var(--text-muted, #888);
    font-style: italic;
    background: var(--form-bg, rgba(0,0,0,0.02));
    border-radius: 10px;
  }

  .no-tasks-message i {
    margin-right: 8px;
  }

  /* Badge do Professor na Tarefa */
  .teacher-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    padding: 3px 8px;
    background: linear-gradient(135deg, #0275d8 0%, #025aa5 100%);
    color: white;
    border-radius: 12px;
    font-size: 0.7rem;
    vertical-align: middle;
  }

  .teacher-badge i {
    font-size: 0.65rem;
  }

  /* Tarefa do Professor - estilo diferenciado */
  .task-item.from-teacher {
    border-left: 4px solid #0275d8;
    background: linear-gradient(135deg, rgba(2, 117, 216, 0.05) 0%, transparent 100%);
  }

  .task-item.from-teacher:hover {
    border-left-color: #025aa5;
  }

  /* Dark Mode */
  body.dark-theme .teacher-tasks-category .category-header {
    background: linear-gradient(135deg, rgba(2, 117, 216, 0.25) 0%, rgba(2, 117, 216, 0.15) 100%);
    border-color: rgba(2, 117, 216, 0.3);
  }

  body.dark-theme .my-tasks-category .category-header {
    background: linear-gradient(135deg, rgba(92, 184, 92, 0.25) 0%, rgba(92, 184, 92, 0.15) 100%);
    border-color: rgba(92, 184, 92, 0.3);
  }

  body.dark-theme .tasks-section-title,
  body.dark-theme .pending-subtitle,
  body.dark-theme .completed-subtitle {
    background: rgba(255,255,255,0.05);
  }

  body.dark-theme .task-item.from-teacher {
    background: linear-gradient(135deg, rgba(2, 117, 216, 0.1) 0%, transparent 100%);
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
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }

  .flashcard {
    height: 220px;
    perspective: 1000px;
    cursor: pointer;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .flashcard:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    border-radius: 12px;
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
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .flashcard-front {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: var(--text-color);
    border: 2px solid #dee2e6;
  }

  .flashcard-back {
    background: linear-gradient(135deg, #495057 0%, #343a40 100%);
    color: white;
    transform: rotateY(180deg);
    font-size: 1.1rem;
    text-align: center;
  }

  .flashcard-front:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  }

  .flashcard-back:hover {
    background: linear-gradient(135deg, #343a40 0%, #212529 100%);
  }

  .btn-delete-flashcard {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(217, 83, 79, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    font-size: 0.9rem;
  }

  .btn-delete-flashcard:hover {
    background: rgba(165, 30, 20, 0.9);
    transform: scale(1.1);
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
    background: linear-gradient(45deg, #d9534f, #c9302c);
  }

  /* Modern Theme Toggle Button */
  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 12px;
    border: 2px solid var(--border-color);
    background: var(--card-background);
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    min-width: 180px;
    justify-content: center;
  }

  .theme-toggle-btn:hover {
    background: linear-gradient(135deg, var(--primary-color) 0%, #c9302c 100%);
    color: white;
    border-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(217, 83, 79, 0.3);
  }

  .theme-toggle-switch {
    position: relative;
    width: 40px;
    height: 20px;
    background: var(--border-color);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .theme-toggle-slider {
    position: absolute;
    top: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .theme-toggle-slider.light {
    left: 2px;
    background: linear-gradient(135deg, #FFC107, #FF9800);
  }

  .theme-toggle-slider.dark {
    left: 22px;
    background: linear-gradient(135deg, #d9534f, #c9302c);
  }

  .theme-toggle-icon {
    font-size: 8px;
    color: white;
  }

  .theme-toggle-label {
    font-size: 0.95rem;
  }

  .theme-toggle-btn:hover .theme-toggle-slider.light {
    transform: scale(1.1);
  }

  .theme-toggle-btn:hover .theme-toggle-slider.dark {
    transform: scale(1.1) rotate(15deg);
  }

  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      transform: translateX(-100%);
      width: 80%;
      max-width: 280px;
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .main-content {
      margin-left: 0;
      width: 100%;
      padding: 80px 15px 20px 15px;
    }

    .sidebar.open ~ .main-content {
      filter: blur(2px);
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .sidebar {
      width: 240px;
    }

    .main-content {
      margin-left: 240px;
      width: calc(100% - 240px);
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
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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
    .flashcard-feedback-content {
      width: 95%;
      margin: 20px;
      padding: 20px;
    }

    .flashcard-feedback-buttons {
      flex-direction: column;
    }
  }

  /* Estilos para tema escuro do popup de feedback do flashcard */
  .dark-theme .flashcard-feedback-content {
    background: var(--card-background);
    color: var(--text-color);
  }

  .dark-theme .flashcard-feedback-content h3 {
    color: var(--text-color);
  }

  .dark-theme .flashcard-feedback-content p {
    color: var(--text-light-color);
  }

  .dark-theme .btn-flashcard-incorrect {
    background-color: #dc3545;
    color: white;
  }

  .dark-theme .btn-flashcard-correct {
    background-color: #28a745;
    color: white;
  }

  /* ==================== ESTILOS MINHAS TURMAS (ALUNO) ==================== */
  
  .loading-text {
    text-align: center;
    padding: 20px;
    color: #666;
  }

  .student-classes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }

  .student-class-card {
    background: #f8f9fa;
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .student-class-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .student-class-card.selected {
    border-color: #5cb85c;
    background: rgba(92, 184, 92, 0.1);
  }

  .student-class-card .class-header {
    margin-bottom: 12px;
  }

  .student-class-card .class-header h4 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
    color: #333;
  }

  .student-class-card .class-subject {
    display: inline-block;
    background: #0275d8;
    color: white;
    padding: 3px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
  }

  .student-class-card .class-info {
    font-size: 0.9rem;
    color: #666;
  }

  .student-class-card .class-info p {
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .student-class-card .class-info i {
    width: 18px;
    color: #5cb85c;
  }

  .class-selected-indicator {
    margin-top: 10px;
    padding: 8px;
    background: #5cb85c;
    color: white;
    border-radius: 8px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .empty-message {
    text-align: center;
    padding: 30px;
    color: #999;
    font-style: italic;
  }

  .empty-message i {
    margin-right: 8px;
  }

  /* Tarefas da Turma */
  .class-tasks-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .class-task-item {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    transition: all 0.2s ease;
  }

  .class-task-item:hover {
    background: #e9ecef;
  }

  .class-task-item .task-info h4 {
    margin: 0 0 5px 0;
    font-size: 1rem;
    color: #333;
  }

  .class-task-item .task-info p {
    margin: 0;
    font-size: 0.85rem;
    color: #666;
  }

  .class-task-item .task-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .class-task-item .priority-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .class-task-item .priority-badge.priority-urgent {
    background: rgba(128, 0, 128, 0.15);
    color: purple;
  }

  .class-task-item .priority-badge.priority-high {
    background: rgba(217, 83, 79, 0.15);
    color: #d9534f;
  }

  .class-task-item .priority-badge.priority-medium {
    background: rgba(240, 173, 78, 0.15);
    color: #f0ad4e;
  }

  .class-task-item .priority-badge.priority-low {
    background: rgba(92, 184, 92, 0.15);
    color: #5cb85c;
  }

  .class-task-item .due-date {
    font-size: 0.8rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .class-task-item .due-date i {
    color: #f0ad4e;
  }

  /* Flashcards da Turma */
  .class-flashcards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }

  .class-flashcard-item {
    background: linear-gradient(135deg, #6f42c1 0%, #563d7c 100%);
    color: white;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .class-flashcard-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(111, 66, 193, 0.3);
  }

  .class-flashcard-item .flashcard-question {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }

  .class-flashcard-item .flashcard-answer {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 12px;
    margin-top: 10px;
    font-size: 0.9rem;
  }

  .class-flashcard-item .flashcard-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
  }

  .class-flashcard-item .tag {
    background: rgba(255, 255, 255, 0.3);
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.75rem;
  }

  /* Dark Theme - Minhas Turmas */
  .dark-theme .student-class-card {
    background: #2d2d2d;
  }

  .dark-theme .student-class-card .class-header h4 {
    color: #e0e0e0;
  }

  .dark-theme .student-class-card .class-info {
    color: #aaa;
  }

  .dark-theme .class-task-item {
    background: #2d2d2d;
  }

  .dark-theme .class-task-item:hover {
    background: #3d3d3d;
  }

  .dark-theme .class-task-item .task-info h4 {
    color: #e0e0e0;
  }

  .dark-theme .class-task-item .task-info p,
  .dark-theme .class-task-item .due-date {
    color: #aaa;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .student-classes-grid,
    .class-flashcards-grid {
      grid-template-columns: 1fr;
    }

    .class-task-item {
      flex-direction: column;
    }

    .class-task-item .task-meta {
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
    }
  }

`;

document.head.appendChild(styles);

export default Dashboard;