/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Colors
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { authAPI, userAPI, reportAPI, schoolAPI } from '../lib/api';
import CustomAlert from './CustomAlert';
import CustomConfirm from './CustomConfirm';

// Registrar componentes do Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Colors
);

function DashboardInstitution({ user, darkMode, toggleDarkMode, onLogout }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  
  // Estado para aba de relatórios
  const [activeReportTab, setActiveReportTab] = useState('users'); // 'users', 'registrations', 'activities'
  const [profileImage, setProfileImage] = useState(user?.profilePicture || 'https://i.pravatar.cc/40');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // estados de carregamento e erro
  const [loading, setLoading] = useState({
    teachers: false,
    students: false,
    reports: false,
    school: false,
    users: false
  });
  
  const [errors, setErrors] = useState({
    teachers: null,
    students: null,
    reports: null,
    school: null,
    users: null
  });
  
  // Gerenciamento de Professores
  const [teachers, setTeachers] = useState([]);
  
  // Gerenciamento de Alunos
  const [students, setStudents] = useState([]);
  
  // Relatórios e Estatísticas
  const [reports, setReports] = useState([]);
  
  // Relatórios de Desempenho dos Alunos
  const [studentPerformanceReports, setStudentPerformanceReports] = useState([]);
  
  // Relatórios de estatísticas da escola
  const [schoolStats, setSchoolStats] = useState(null);
  
  // Todos os usuários
  const [allUsers, setAllUsers] = useState([]);
  
  // Filtro por categoria
  const [userCategoryFilter, setUserCategoryFilter] = useState('all'); // 'all', 'student', 'teacher', 'school_admin'
  
  // Dados para gráficos
  const [userDistribution, setUserDistribution] = useState({ students: 0, teachers: 0, admins: 0 });
  const [recentRegistrations, setRecentRegistrations] = useState({ students: 0, teachers: 0 });
  
  // Estados para geração de relatórios
  const [selectedStudentForReport, setSelectedStudentForReport] = useState('');
  const [reportPeriod, setReportPeriod] = useState({ startDate: '', endDate: '' });
  const [generatingReport, setGeneratingReport] = useState(false);
  const [availableStudents, setAvailableStudents] = useState([]);
  
  

  // estados para alertas e confirmações
  const [alert, setAlert] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  
  // Estado para modal de exclusão com confirmação de senha
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetUser, setDeleteTargetUser] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  // estados para o formulário de registro
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Padrão
    studentId: '',
    grade: '',
    subjects: ''
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  // Função para mostrar confirmação
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
  
  // Funções para modal de exclusão com senha
  const openDeleteModal = (userToDelete) => {
    setDeleteTargetUser(userToDelete);
    setDeletePassword('');
    setDeleteError('');
    setShowDeleteModal(true);
  };
  
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTargetUser(null);
    setDeletePassword('');
    setDeleteError('');
    setDeleteLoading(false);
  };
  
  const handleDeleteWithPassword = async () => {
    if (!deletePassword) {
      setDeleteError('Por favor, digite sua senha para confirmar.');
      return;
    }
    
    setDeleteLoading(true);
    setDeleteError('');
    
    try {
      // Verificar a senha do administrador logado fazendo uma requisição de verificação
      const verifyResponse = await authAPI.login(user.email, deletePassword);
      
      if (verifyResponse.status === 'success') {
        // Senha verificada, agora excluir o usuário
        await userAPI.deleteUser(deleteTargetUser.id);
        
        // Recarregar a lista de usuários
        await loadAllUsers();
        await loadStudents();
        await loadTeachers();
        
        setAlert({ message: `Usuário "${deleteTargetUser.name}" excluído com sucesso!`, type: 'success' });
        closeDeleteModal();
      }
    } catch (error) {
      console.error('Erro ao verificar senha ou excluir usuário:', error);
      if (error.message.includes('Credenciais') || error.message.includes('inválid')) {
        setDeleteError('Senha incorreta. Por favor, tente novamente.');
      } else {
        setDeleteError('Erro ao excluir usuário: ' + (error.message || 'Erro de conexão'));
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  // Funções para carregar dados iniciais
  const loadTeachers = async () => {
    setLoading(prev => ({ ...prev, teachers: true }));
    setErrors(prev => ({ ...prev, teachers: null }));
    
    try {
      // Carregar professores da escola (sem limite)
      const response = await userAPI.getUsers({ 
        role: 'teacher', 
        school_id: user.school_id,
        limit: 1000 // Carregar todos os professores
      });
      
      if (response.data) {
        const teachersData = response.data.map(t => ({
          id: t._id,
          name: t.name,
          subject: t.teaching?.subjects?.[0] || 'N/A',
          email: t.email,
          classes: t.teaching?.classes?.length || 0,
          createdAt: t.createdAt
        }));
        
        setTeachers(teachersData);
        // Não atualizar availableStudents com professores, apenas manter os alunos
      }
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
      setErrors(prev => ({ ...prev, teachers: error.message || 'Erro ao carregar professores' }));
      setAlert({ message: 'Erro ao carregar professores: ' + (error.message || 'Erro de conexão'), type: 'error' });
      setTeachers([]);
    } finally {
      setLoading(prev => ({ ...prev, teachers: false }));
    }
  };

  const loadStudents = async () => {
    setLoading(prev => ({ ...prev, students: true }));
    setErrors(prev => ({ ...prev, students: null }));
    
    try {
      // Carregar alunos da escola (sem limite)
      const response = await userAPI.getUsers({ 
        role: 'student', 
        school_id: user.school_id,
        limit: 1000 // Carregar todos os alunos
      });
      
      if (response.data) {
        const studentsData = response.data.map(s => ({
          id: s._id,
          name: s.name,
          class: s.academic?.grade || s.academic?.class || 'N/A',
          createdAt: s.createdAt
        }));
        
        setStudents(studentsData);
        setAvailableStudents(studentsData); // Atualização: definir alunos como estudantes disponíveis para relatórios
      }
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
      setErrors(prev => ({ ...prev, students: error.message || 'Erro ao carregar alunos' }));
      setAlert({ message: 'Erro ao carregar alunos: ' + (error.message || 'Erro de conexão'), type: 'error' });
      setStudents([]);
    } finally {
      setLoading(prev => ({ ...prev, students: false }));
    }
  };

  const loadSchoolStats = async () => {
    // Verificar se school_id está definido
    if (!user?.school_id) {
      console.warn('School ID não definido, pulando carregamento de estatísticas');
      return;
    }
    
    setLoading(prev => ({ ...prev, school: true }));
    setErrors(prev => ({ ...prev, school: null }));
    
    try {
      // Carregar estatísticas da escola
      const response = await schoolAPI.getSchoolStats(user.school_id);
      if (response.data) {
        setSchoolStats(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas da escola:', error);
      setErrors(prev => ({ ...prev, school: error.message || 'Erro ao carregar estatísticas da escola' }));
    } finally {
      setLoading(prev => ({ ...prev, school: false }));
    }
  };

  const loadReports = async () => {
    setLoading(prev => ({ ...prev, reports: true }));
    setErrors(prev => ({ ...prev, reports: null }));
    
    try {
      // Carregar relatórios da escola
      const response = await reportAPI.getReports({ type: 'school-performance' });
      if (response.data) {
        const reportsData = response.data.map(r => ({
          id: r._id,
          title: r.title || 'Relatório',
          date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('pt-BR') : 'N/A',
          status: r.status || 'Pendente',
          type: r.type || 'school-performance'
        }));
        
        setReports(reportsData);
      }
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
      setErrors(prev => ({ ...prev, reports: error.message || 'Erro ao carregar relatórios' }));
      setAlert({ message: 'Erro ao carregar relatórios: ' + (error.message || 'Erro de conexão'), type: 'error' });
      setReports([]);
    } finally {
      setLoading(prev => ({ ...prev, reports: false }));
    }
  };

  // Função para calcular dados dos gráficos
  const calculateChartDatas = (users) => {
    // Distribuição por tipo
    const distribution = users.reduce((acc, user) => {
      if (user.role === 'student') acc.students++;
      else if (user.role === 'teacher') acc.teachers++;
      else if (user.role === 'school_admin') acc.admins++;
      return acc;
    }, { students: 0, teachers: 0, admins: 0 });
    
    // Cadastros recentes (últimos 6 meses para alunos, últimos 12 meses para professores)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    const recentRegs = users.reduce((acc, user) => {
      const createdAt = new Date(user.createdAt);
      
      if (user.role === 'student' && createdAt >= sixMonthsAgo) {
        acc.students++;
      } else if (user.role === 'teacher' && createdAt >= twelveMonthsAgo) {
        acc.teachers++;
      }
      
      return acc;
    }, { students: 0, teachers: 0 });
    
    return { distribution, recentRegs };
  };

  const loadAllUsers = async () => {
    setLoading(prev => ({ ...prev, users: true }));
    setErrors(prev => ({ ...prev, users: null }));
    
    try {
      // Carregar todos os usuários da escola (sem limite)
      const response = await userAPI.getUsers({ 
        school_id: user.school_id,
        limit: 1000 // Carregar todos os usuários
      });
      
      if (response.data) {
        const usersData = response.data.map(u => ({
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          roleDisplay: u.role === 'student' ? 'Aluno' : u.role === 'teacher' ? 'Professor' : u.role === 'school_admin' ? 'Administrador' : u.role,
          class: u.academic?.grade || u.academic?.class || 'N/A',
          subject: u.teaching?.subjects?.[0] || 'N/A',
          classes: u.teaching?.classes?.length || 0,
          createdAt: u.createdAt
        }));
        
        setAllUsers(usersData);
        
        // Calcular dados para gráficos
        const { distribution, recentRegs } = calculateChartDatas(usersData);
        setUserDistribution(distribution);
        setRecentRegistrations(recentRegs);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setErrors(prev => ({ ...prev, users: error.message || 'Erro ao carregar usuários' }));
      setAlert({ message: 'Erro ao carregar usuários: ' + (error.message || 'Erro de conexão'), type: 'error' });
      setAllUsers([]);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  // Funções para gerenciar professores

  // Funções para gerenciar alunos

  // Funções para gerar relatórios de desempenho
  const handleGenerateReport = async (e) => {
    e.preventDefault();
    
    if (!selectedStudentForReport || !reportPeriod.startDate || !reportPeriod.endDate) {
      setAlert({ message: 'Por favor, selecione um aluno e um período válido para gerar o relatório.', type: 'warning' });
      return;
    }

    setGeneratingReport(true);
    
    try {
      // Chamar API real para gerar relatório
      const response = await reportAPI.generateStudentReport(selectedStudentForReport, {
        startDate: reportPeriod.startDate,
        endDate: reportPeriod.endDate
      });
      
      const student = availableStudents.find(s => s.id === selectedStudentForReport);
      
      const newReport = {
        id: response.data._id || studentPerformanceReports.length + 1,
        student: student?.name || 'Aluno Desconhecido',
        class: student?.class || 'N/A',
        subject: response.data.subject || 'Geral',
        avg: response.data?.data?.overallScore || 0,
        pomodoroSessions: response.data?.data?.pomodoroMetrics?.totalSessions || 0,
        taskCompletion: response.data?.data?.taskMetrics?.completionRate || 0,
        generationDate: new Date().toLocaleDateString('pt-BR')
      };
      
      setStudentPerformanceReports(prev => [...prev, newReport]);
      
      // Resetar formulário
      setSelectedStudentForReport('');
      setReportPeriod({ startDate: '', endDate: '' });
      
      setAlert({ message: 'Relatório gerado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      setAlert({ message: 'Erro ao gerar relatório: ' + (error.message || 'Erro de conexão'), type: 'error' });
    } finally {
      setGeneratingReport(false);
    }
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
    }
  };

  const triggerImageUpload = () => {
    document.getElementById('profile-image-upload').click();
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
      const updatedUser = { ...user, name: response.data.user.name, profilePicture: response.data.user.profile?.avatar || response.data.user.profilePicture || user?.profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Atualiza o estado do usuário no componente pai
      
      setEditProfile(false);
      // Limpa o arquivo de imagem após salvar
      setProfileImageFile(null);
      setAlert({ message: 'Perfil atualizado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setAlert({ message: 'Erro ao atualizar perfil: ' + (error.message || 'Erro de conexão'), type: 'error' });
    }
  };

  // Função para excluir usuário com confirmação por senha
  const deleteUser = (userId, userName) => {
    openDeleteModal({ id: userId, name: userName });
  };

  const handleRegisterChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    // Validação de senha
    if (registerFormData.password !== registerFormData.confirmPassword) {
      setRegisterError('As senhas não coincidem');
      return;
    }

    // Validação de tamanho da senha
    if (registerFormData.password.length < 6) {
      setRegisterError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Validação de campos obrigatórios
    if (!registerFormData.name || !registerFormData.email || !registerFormData.password) {
      setRegisterError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerFormData.email)) {
      setRegisterError('Por favor, insira um email válido');
      return;
    }

    setRegisterLoading(true);

    try {
      // Dados para registro de usuário
      const userData = {
        name: registerFormData.name,
        email: registerFormData.email,
        password: registerFormData.password,
        role: registerFormData.role
      };

      // Adiciona campos específicos conforme o papel do usuário
      if (registerFormData.role === 'student') {
        userData.studentId = registerFormData.studentId;
        userData.grade = registerFormData.grade;
      } else if (registerFormData.role === 'teacher') {
        userData.subjects = registerFormData.subjects.split(',').map(s => s.trim()).filter(s => s);
      }

      await userAPI.createUser(userData);
      
      setRegisterSuccess('Usuário criado com sucesso na instituição!');
      
      // Recarregar a lista de usuários após o registro bem-sucedido
      loadAllUsers();
      loadStudents();  // também recarrega os alunos
      loadTeachers();  // também recarrega os professores
      
      // Opcional: limpar o formulário após sucesso
      setRegisterFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        studentId: '',
        grade: '',
        subjects: ''
      });
    } catch (err) {
      // Tratar erros específicos do backend
      if (err.message.includes('Email já cadastrado')) {
        setRegisterError('Este email já está cadastrado. Tente outro email.');
      } else {
        setRegisterError(err.message || 'Erro ao registrar. Por favor, tente novamente.');
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  // Função para exportar dados para Excel
  const exportToExcel = (data, fileName) => {
    try {
      // Criar conteúdo CSV
      let csvContent = '';
      
      // Adicionar cabeçalhos
      if (data.length > 0) {
        const headers = Object.keys(data[0]).join(',');
        csvContent += headers + '\\n';
        
        // Adicionar linhas de dados
        data.forEach(row => {
          const values = Object.values(row).map(value => {
            // Escapar valores que contenham vírgulas ou aspas
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',');
          csvContent += values + '\\n';
        });
      }
      
      // Criar blob e fazer download
      const blob = new Blob(['\\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setAlert({ message: `Relatório "${fileName}" exportado com sucesso!`, type: 'success' });
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
      setAlert({ message: 'Erro ao exportar relatório: ' + (error.message || 'Erro de conexão'), type: 'error' });
    }
  };

  // Função para exportar relatório de usuários
  const exportUsersReport = () => {
    const usersData = allUsers.map(user => ({
      'Nome': user.name,
      'Email': user.email,
      'Tipo': user.roleDisplay,
      'Detalhes': user.role === 'student' 
        ? `Turma: ${user.class}` 
        : user.role === 'teacher' 
        ? `Disciplina: ${user.subject}, Turmas: ${user.classes}`
        : 'Administrador',
      'Data de Registro': user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'
    }));
    
    exportToExcel(usersData, 'relatorio_usuarios');
  };

  // Função para exportar relatório de distribuição de usuários
  const exportDistributionReport = () => {
    const distributionData = [{
      'Categoria': 'Alunos',
      'Quantidade': userDistribution.students
    }, {
      'Categoria': 'Professores',
      'Quantidade': userDistribution.teachers
    }, {
      'Categoria': 'Administradores',
      'Quantidade': userDistribution.admins
    }];
    
    exportToExcel(distributionData, 'relatorio_distribuicao_usuarios');
  };

  // Função para exportar relatório de cadastros recentes
  const exportRecentRegistrationsReport = () => {
    const registrationsData = [{
      'Período': 'Alunos (últimos 6 meses)',
      'Quantidade': recentRegistrations.students
    }, {
      'Período': 'Professores (último ano)',
      'Quantidade': recentRegistrations.teachers
    }];
    
    exportToExcel(registrationsData, 'relatorio_cadastros_recentes');
  };

  // Componente de gráfico de pizza usando Chart.js
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
      <div style={{ position: 'relative', height: '200px', width: '100%' }}>
        <Pie data={chartData} options={options} />
      </div>
    );
  };

  // Componente de gráfico de barras usando Chart.js
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
        easing: 'easeInOutQuart'
      }
    };

    return (
      <div style={{ position: 'relative', height: '200px', width: '100%' }}>
        <Bar data={chartData} options={options} />
      </div>
    );
  };



  useEffect(() => {
    // Carregar dados iniciais
    if (user) {
      loadTeachers();
      loadStudents();
      loadReports();
      loadAllUsers();
      
      // Carregar estatísticas da escola apenas se school_id estiver definido
      if (user.school_id) {
        loadSchoolStats();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const pageTitles = {
    'dashboard': 'Dashboard Escola',
    'users': 'Lista de Usuários',
    'reports': 'Relatórios',
    'performance': 'Desempenho',
    'register': 'Registro de Usuário',
  };

  return (
    <div className="container">
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
          <div className={`menu-item ${activeScreen === 'users' ? 'active' : ''}`} onClick={() => {showScreen('users'); setSidebarOpen(false);}}>
            <i className="fas fa-users"></i><span>Usuários</span>
          </div>
          <div className={`menu-item ${activeScreen === 'register' ? 'active' : ''}`} onClick={() => {showScreen('register'); setSidebarOpen(false);}}>
            <i className="fas fa-user-plus"></i><span>Registrar Usuário</span>
          </div>
          <div className={`menu-item ${activeScreen === 'reports' ? 'active' : ''}`} onClick={() => {showScreen('reports'); setSidebarOpen(false);}}>
            <i className="fas fa-file-export"></i><span>Relatórios</span>
          </div>
        </div>
        
        <div className="profile" onClick={() => {openProfileModal(); setSidebarOpen(false);}}>
          <div className="profile-img-container">
            <img src={profileImage} alt="Instituição" className="profile-img" />
            <button 
              className="profile-img-upload-btn" 
              title="Alterar foto"
              onClick={(e) => {
                e.stopPropagation();
                triggerImageUpload();
              }}
            >
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-name">{user?.name || 'Instituição'}</div>
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
        <div className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`} id="dashboard-institution">
          <div className="stats-container">
            <div className="stat-card card">
                <i className="fas fa-chalkboard-teacher fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{teachers.length}</div>
                <div className="stat-label">Professores</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-users fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{students.length}</div>
                <div className="stat-label">Alunos</div>
            </div>
            <div className="stat-card card">
                <i className="fas fa-chart-line fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{reports.length}</div>
                <div className="stat-label">Relatórios</div>
            </div>
            {schoolStats && (
            <div className="stat-card card">
                <i className="fas fa-graduation-cap fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{schoolStats.users?.total || 0}</div>
                <div className="stat-label">Total de Usuários</div>
            </div>
            )}
          </div>
          
          <div className="dashboard-grid">
            <div className="card animated" style={{ animationDelay: '0.1s' }}>
              <h3 className="card-title">Distribuição de Usuários</h3>
              <div className="pie-chart-wrapper" style={{ marginTop: '10px', height: '200px' }}>
                <PieChartComponent 
                  data={[
                    { label: 'Alunos', value: userDistribution.students, color: '#5cb85c' },
                    { label: 'Professores', value: userDistribution.teachers, color: '#0275d8' },
                    { label: 'Administradores', value: userDistribution.admins, color: '#d9534f' }
                  ]}
                  total={userDistribution.students + userDistribution.teachers + userDistribution.admins}
                />
              </div>
            </div>
            
            <div className="card animated" style={{ animationDelay: '0.2s' }}>
              <h3 className="card-title">Cadastros Recentes</h3>
              <div className="recent-registrations">
                <div className="registration-item">
                  <div className="registration-label">Alunos (últimos 6 meses)</div>
                  <div className="registration-value">{recentRegistrations.students}</div>
                </div>
                <div className="registration-item">
                  <div className="registration-label">Professores (último ano)</div>
                  <div className="registration-value">{recentRegistrations.teachers}</div>
                </div>
                
                {/* Gráfico de barras usando Chart.js para cadastros recentes */}
                <div className="bar-chart-wrapper" style={{ marginTop: '15px', height: '200px' }}>
                  <BarChartComponent 
                    data={[
                      { 
                        label: 'Alunos (6 meses)', 
                        value: recentRegistrations.students, 
                        color: 'rgba(92, 184, 92, 0.7)',
                        borderColor: 'rgba(92, 184, 92, 1)',
                        hoverColor: 'rgba(92, 184, 92, 0.9)'
                      },
                      { 
                        label: 'Professores (1 ano)', 
                        value: recentRegistrations.teachers, 
                        color: 'rgba(2, 117, 216, 0.7)',
                        borderColor: 'rgba(2, 117, 216, 1)',
                        hoverColor: 'rgba(2, 117, 216, 0.9)'
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Screen */}
        <div className={`screen ${activeScreen === 'users' ? 'active' : ''}`} id="users">
          <div className="card">
            <div className="users-header">
              <h3 className="card-title">Lista de Usuários</h3>
              <div className="user-filters">
                <select 
                  value={userCategoryFilter} 
                  onChange={(e) => setUserCategoryFilter(e.target.value)}
                  className="user-category-filter"
                >
                  <option value="all">Todos</option>
                  <option value="student">Alunos</option>
                  <option value="teacher">Professores</option>
                  <option value="school_admin">Administradores</option>
                </select>
              </div>
            </div>
            
            {loading.users ? (
              <div className="loading">Carregando usuários...</div>
            ) : errors.users ? (
              <div className="error">Erro: {errors.users}</div>
            ) : (
              <div className="all-users-list">
                {allUsers && allUsers.length > 0 ? (
                  <div className="users-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Email</th>
                          <th>Tipo</th>
                          <th>Detalhes</th>
                          <th>Data de Registro</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers
                          .filter(user => userCategoryFilter === 'all' || user.role === userCategoryFilter)
                          .map(userItem => (
                          <tr key={userItem.id}>
                            <td>{userItem.name}</td>
                            <td>{userItem.email}</td>
                            <td>
                              <span className={`role-badge ${userItem.role}`}>
                                {userItem.roleDisplay}
                              </span>
                            </td>
                            <td>
                              {userItem.role === 'student' && (
                                <span>Turma: {userItem.class}</span>
                              )}
                              {userItem.role === 'teacher' && (
                                <span>Disciplina: {userItem.subject} • Turmas: {userItem.classes}</span>
                              )}
                              {userItem.role === 'school_admin' && (
                                <span>Administrador</span>
                              )}
                            </td>
                            <td>{userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString('pt-BR') : 'N/A'}</td>
                            <td>
                              <button 
                                className="btn-delete-user"
                                onClick={() => deleteUser(userItem.id, userItem.name)}
                                title="Excluir usuário"
                              >
                                Excluir
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>Nenhum usuário encontrado.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reports Screen */}
        <div className={`screen ${activeScreen === 'reports' ? 'active' : ''}`} id="reports">
          <div className="card">
            <h3 className="card-title">Relatórios da Escola</h3>
            
            {loading.reports ? (
              <div className="loading">Carregando relatórios...</div>
            ) : errors.reports ? (
              <div className="error">Erro: {errors.reports}</div>
            ) : (
              <div className="report-table">
                <table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports && reports.length > 0 ? (
                      reports.map(report => (
                        <tr key={report.id}>
                          <td>{report.title}</td>
                          <td>{report.date}</td>
                          <td>{report.type || 'N/A'}</td>
                          <td>
                            <span className={`status ${report.status === 'Aprovado' ? 'status-approved' : 'status-pending'}`}>
                              {report.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Nenhum relatório encontrado.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        {/* Performance Screen */}
        <div className={`screen ${activeScreen === 'performance' ? 'active' : ''}`} id="performance">
          <div className="card">
            <h3 className="card-title">Relatórios de Desempenho dos Alunos</h3>
            <div className="performance-controls">
              <form onSubmit={handleGenerateReport} className="generate-report-form">
                <div className="input-row">
                  <select 
                    value={selectedStudentForReport} 
                    onChange={(e) => setSelectedStudentForReport(e.target.value)}
                    className="add-student-input"
                    required
                  >
                    <option value="">Selecione um aluno</option>
                    {availableStudents && availableStudents.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                  <input 
                    type="date" 
                    value={reportPeriod.startDate}
                    onChange={(e) => setReportPeriod({...reportPeriod, startDate: e.target.value})}
                    className="add-student-input"
                    required
                  />
                  <input 
                    type="date" 
                    value={reportPeriod.endDate}
                    onChange={(e) => setReportPeriod({...reportPeriod, endDate: e.target.value})}
                    className="add-student-input"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={generatingReport}
                >
                  {generatingReport ? 'Gerando...' : 'Gerar Relatório'}
                </button>
              </form>
            </div>
            
            <div className="performance-reports-table">
              <table>
                <thead>
                  <tr>
                    <th>Aluno</th>
                    <th>Turma</th>
                    <th>Disciplina</th>
                    <th>Média</th>
                    <th>Sessões Pomodoro</th>
                    <th>Conclusão Tarefas (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPerformanceReports && studentPerformanceReports.length > 0 ? (
                    studentPerformanceReports.map(report => (
                      <tr key={report.id}>
                        <td>{report.student}</td>
                        <td>{report.class}</td>
                        <td>{report.subject}</td>
                        <td>{report.avg.toFixed(1)}</td>
                        <td>{report.pomodoroSessions}</td>
                        <td>{report.taskCompletion}%</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Nenhum relatório de desempenho gerado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Register Screen */}
        <div className={`screen ${activeScreen === 'register' ? 'active' : ''}`} id="register">
          <div className="card register-card">
            <div className="register-header">
              <h3 className="card-title">Cadastro de Usuário</h3>
              <p className="register-subtitle">Preencha os dados abaixo para registrar um novo usuário</p>
            </div>
            
            <div className="register-content">
              {registerError && (
                <div className="error-message">
                  {registerError}
                </div>
              )}
              
              {registerSuccess && (
                <div className="success-message">
                  {registerSuccess}
                </div>
              )}
              
              <form className="register-form" onSubmit={handleRegisterSubmit}>
                <div className="form-section">
                  <h4 className="section-title">Informações Básicas</h4>
                  
                  <div className="input-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Seu nome completo"
                      value={registerFormData.name}
                      onChange={handleRegisterChange}
                      disabled={registerLoading}
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={registerFormData.email}
                      onChange={handleRegisterChange}
                      disabled={registerLoading}
                      required
                    />
                  </div>
                  
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="password">Senha</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Sua senha (mínimo 6 caracteres)"
                        value={registerFormData.password}
                        onChange={handleRegisterChange}
                        disabled={registerLoading}
                        required
                        minLength="6"
                      />
                    </div>
                    
                    <div className="input-group">
                      <label htmlFor="confirmPassword">Confirmar Senha</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirme sua senha"
                        value={registerFormData.confirmPassword}
                        onChange={handleRegisterChange}
                        disabled={registerLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  {registerFormData.password && registerFormData.confirmPassword && registerFormData.password !== registerFormData.confirmPassword && (
                    <div className="password-mismatch-error">
                      As senhas não coincidem
                    </div>
                  )}
                </div>
                
                <div className="form-section">
                  <h4 className="section-title">Tipo de Usuário</h4>
                  
                  <div className="role-selection">
                    <div className="role-buttons">
                      <button 
                        type="button"
                        className={`role-btn ${registerFormData.role === 'student' ? 'role-btn-active' : ''}`}
                        onClick={() => setRegisterFormData({...registerFormData, role: 'student', subjects: '', studentId: '', grade: ''})}
                        disabled={registerLoading}
                      >
                        <i className="fas fa-user-graduate"></i>
                        <span>Aluno</span>
                      </button>
                      <button 
                        type="button"
                        className={`role-btn ${registerFormData.role === 'teacher' ? 'role-btn-active' : ''}`}
                        onClick={() => setRegisterFormData({...registerFormData, role: 'teacher', studentId: '', grade: ''})}
                        disabled={registerLoading}
                      >
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>Professor</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {registerFormData.role === 'student' && (
                  <div className="form-section">
                    <h4 className="section-title">Informações do Aluno</h4>
                    
                    <div className="input-row">
                      <div className="input-group">
                        <label htmlFor="studentId">Matrícula</label>
                        <input
                          type="text"
                          id="studentId"
                          name="studentId"
                          placeholder="Número de matrícula"
                          value={registerFormData.studentId}
                          onChange={handleRegisterChange}
                          disabled={registerLoading}
                        />
                      </div>
                      
                      <div className="input-group">
                        <label htmlFor="grade">Turma/Série</label>
                        <input
                          type="text"
                          id="grade"
                          name="grade"
                          placeholder="Ex: 1º Ano, 2º Ano, etc."
                          value={registerFormData.grade}
                          onChange={handleRegisterChange}
                          disabled={registerLoading}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {registerFormData.role === 'teacher' && (
                  <div className="form-section">
                    <h4 className="section-title">Informações do Professor</h4>
                    
                    <div className="input-group">
                      <label htmlFor="subjects">Disciplinas (separadas por vírgula)</label>
                      <input
                        type="text"
                        id="subjects"
                        name="subjects"
                        placeholder="Matemática, Português, etc."
                        value={registerFormData.subjects}
                        onChange={handleRegisterChange}
                        disabled={registerLoading}
                      />
                      <small className="input-hint">Digite as disciplinas separadas por vírgula</small>
                    </div>
                  </div>
                )}
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={registerLoading}>
                    {registerLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Registrando...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus"></i>
                        <span>Registrar Usuário</span>
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      // Limpar formulário
                      setRegisterFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        role: 'student',
                        studentId: '',
                        grade: '',
                        subjects: ''
                      });
                      setRegisterError('');
                      setRegisterSuccess('');
                    }}
                    disabled={registerLoading}
                  >
                    <i className="fas fa-undo"></i>
                    <span>Limpar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Reports Screen */}
        <div className={`screen ${activeScreen === 'reports' ? 'active' : ''}`} id="reports">
          <div className="card">
            <h3 className="card-title">Relatórios e Exportação</h3>
            
            <div className="report-tabs">
              <div 
                className={`report-tab ${activeReportTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveReportTab('users')}
              >
                Usuários
              </div>
              <div 
                className={`report-tab ${activeReportTab === 'distribution' ? 'active' : ''}`}
                onClick={() => setActiveReportTab('distribution')}
              >
                Distribuição
              </div>
              <div 
                className={`report-tab ${activeReportTab === 'registrations' ? 'active' : ''}`}
                onClick={() => setActiveReportTab('registrations')}
              >
                Cadastros Recentes
              </div>
            </div>
            
            <div className="report-content">
              {activeReportTab === 'users' && (
                <div className="report-data">
                  <div className="report-header">
                    <h4>Relatório de Usuários</h4>
                    <button 
                      className="export-button"
                      onClick={exportUsersReport}
                    >
                      <i className="fas fa-file-export"></i>
                      Exportar para Excel
                    </button>
                  </div>
                  
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Detalhes</th>
                        <th>Data de Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.roleDisplay}
                            </span>
                          </td>
                          <td>
                            {user.role === 'student' && (
                              <span>Turma: {user.class}</span>
                            )}
                            {user.role === 'teacher' && (
                              <span>Disciplina: {user.subject} • Turmas: {user.classes}</span>
                            )}
                            {user.role === 'school_admin' && (
                              <span>Administrador</span>
                            )}
                          </td>
                          <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeReportTab === 'distribution' && (
                <div className="report-data">
                  <div className="report-header">
                    <h4>Relatório de Distribuição de Usuários</h4>
                    <button 
                      className="export-button"
                      onClick={exportDistributionReport}
                    >
                      <i className="fas fa-file-export"></i>
                      Exportar para Excel
                    </button>
                  </div>
                  
                  <div className="chart-container">
                    <div className="pie-chart-wrapper" style={{ marginTop: '10px', height: '200px' }}>
                      <PieChartComponent 
                        data={[
                          { label: 'Alunos', value: userDistribution.students, color: '#5cb85c' },
                          { label: 'Professores', value: userDistribution.teachers, color: '#0275d8' },
                          { label: 'Administradores', value: userDistribution.admins, color: '#d9534f' }
                        ]}
                        total={userDistribution.students + userDistribution.teachers + userDistribution.admins}
                      />
                    </div>
                  </div>
                  
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th>Quantidade</th>
                        <th>Porcentagem</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alunos</td>
                        <td>{userDistribution.students}</td>
                        <td>{Math.round((userDistribution.students / Math.max(userDistribution.students + userDistribution.teachers + userDistribution.admins, 1)) * 100)}%</td>
                      </tr>
                      <tr>
                        <td>Professores</td>
                        <td>{userDistribution.teachers}</td>
                        <td>{Math.round((userDistribution.teachers / Math.max(userDistribution.students + userDistribution.teachers + userDistribution.admins, 1)) * 100)}%</td>
                      </tr>
                      <tr>
                        <td>Administradores</td>
                        <td>{userDistribution.admins}</td>
                        <td>{Math.round((userDistribution.admins / Math.max(userDistribution.students + userDistribution.teachers + userDistribution.admins, 1)) * 100)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeReportTab === 'registrations' && (
                <div className="report-data">
                  <div className="report-header">
                    <h4>Relatório de Cadastros Recentes</h4>
                    <button 
                      className="export-button"
                      onClick={exportRecentRegistrationsReport}
                    >
                      <i className="fas fa-file-export"></i>
                      Exportar para Excel
                    </button>
                  </div>
                  
                  <div className="recent-registrations">
                    <div className="registration-item">
                      <div className="registration-label">Alunos (últimos 6 meses)</div>
                      <div className="registration-value">{recentRegistrations.students}</div>
                    </div>
                    <div className="registration-item">
                      <div className="registration-label">Professores (último ano)</div>
                      <div className="registration-value">{recentRegistrations.teachers}</div>
                    </div>
                    
                    {/* Gráfico de barras usando Chart.js para relatório de cadastros recentes */}
                    <div className="bar-chart-wrapper" style={{ marginTop: '15px', height: '200px' }}>
                      <BarChartComponent 
                        data={[
                          { 
                            label: 'Alunos (6 meses)', 
                            value: recentRegistrations.students, 
                            color: 'rgba(92, 184, 92, 0.7)',
                            borderColor: 'rgba(92, 184, 92, 1)',
                            hoverColor: 'rgba(92, 184, 92, 0.9)'
                          },
                          { 
                            label: 'Professores (1 ano)', 
                            value: recentRegistrations.teachers, 
                            color: 'rgba(2, 117, 216, 0.7)',
                            borderColor: 'rgba(2, 117, 216, 1)',
                            hoverColor: 'rgba(2, 117, 216, 0.9)'
                          }
                        ]}
                      />
                    </div>
                  </div>
                  
                  <table className="report-table">
                    <thead>
                      <tr>
                        <th>Período</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alunos (últimos 6 meses)</td>
                        <td>{recentRegistrations.students}</td>
                      </tr>
                      <tr>
                        <td>Professores (último ano)</td>
                        <td>{recentRegistrations.teachers}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                <img src={profileImage} alt="Admin" className="profile-modal-img" />
                <button 
                  className="profile-img-upload-btn" 
                  title="Alterar foto"
                  onClick={triggerImageUpload}
                  style={{ display: editProfile ? 'flex' : 'none' }}
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
                    <h3>{user?.name || 'Administrador'}</h3>
                  )}
                </div>
                <p>{user?.roleDescription || 'Administrador da Escola'}</p>
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
                  <span>{user?.name || 'Administrador'}</span>
                )}
              </div>
              <div>
                <label>Email</label>
                <span>{user?.email || 'email@exemplo.com'}</span>
              </div>
              <div>
                <label>Tipo de Usuário</label>
                <span>{user?.roleDescription || 'Administrador da Escola'}</span>
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
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <CustomConfirm 
          message={confirmMessage} 
          onConfirm={handleConfirm} 
          onCancel={handleCancel} 
          type="warning" 
        />
      )}
      
      {/* Delete User Modal with Password Confirmation */}
      {showDeleteModal && deleteTargetUser && (
        <div className="delete-modal-overlay" onClick={closeDeleteModal}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-header">
              <div className="delete-modal-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Confirmar Exclusão</h3>
            </div>
            
            <div className="delete-modal-content">
              <p className="delete-modal-warning">
                Você está prestes a excluir o usuário <strong>"{deleteTargetUser.name}"</strong>.
              </p>
              <p className="delete-modal-info">
                Esta ação não pode ser desfeita. Para confirmar, digite sua senha de administrador abaixo:
              </p>
              
              {deleteError && (
                <div className="delete-modal-error">
                  <i className="fas fa-times-circle"></i>
                  {deleteError}
                </div>
              )}
              
              <div className="delete-modal-input-group">
                <label htmlFor="delete-password">Sua Senha</label>
                <input
                  type="password"
                  id="delete-password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Digite sua senha para confirmar"
                  disabled={deleteLoading}
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !deleteLoading) {
                      handleDeleteWithPassword();
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="delete-modal-actions">
              <button 
                className="delete-modal-btn-cancel" 
                onClick={closeDeleteModal}
                disabled={deleteLoading}
              >
                Cancelar
              </button>
              <button 
                className="delete-modal-btn-confirm" 
                onClick={handleDeleteWithPassword}
                disabled={deleteLoading || !deletePassword}
              >
                {deleteLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Verificando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-trash-alt"></i>
                    Excluir Usuário
                  </>
                )}
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
    background: linear-gradient(45deg, #d9534f, #c9302c);
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
    background-color: #d4edda;
    color: #155724;
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
  
  /* Register form styles from Register.css */
  .register-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .register-subtitle {
    text-align: center;
    margin-bottom: 20px;
    color: var(--text-light-color);
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-color);
    font-weight: 500;
  }
  
  .input-group input,
  .input-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--input-background);
    color: var(--text-color);
    font-size: 14px;
  }
  
  .input-group input:focus,
  .input-group select:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  .password-mismatch-error {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 5px;
  }
  
  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    border: 1px solid #f5c6cb;
  }
  
  .success-message {
    background-color: #d4edda;
    color: #155724;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    border: 1px solid #c3e6cb;
  }
  
  /* Users screen styles */
  .users-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .users-section {
    flex: 1;
    min-width: 300px;
  }
  
  .users-section h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 5px;
  }
  
  .teacher-item, .student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 8px;
    background: var(--card-background);
  }
  
  .teacher-content, .student-content {
    flex: 1;
  }
  
  .teacher-title, .student-title {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
  }
  
  .teacher-details, .student-details {
    font-size: 0.9rem;
    color: var(--text-light-color);
  }
  
  .btn-view-teacher, .btn-view-student {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
  }
  
  .btn-view-teacher:hover, .btn-view-student:hover {
    background: #c54335;
  }
  
  /* Role buttons styles */
  .role-buttons {
    display: flex;
    gap: 10px;
    margin-top: 5px;
  }
  
  .role-btn {
    flex: 1;
    padding: 10px;
    border: 1px solid var(--border-color);
    background-color: var(--input-background);
    color: var(--text-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .role-btn:hover {
    background-color: #f0f0f0;
  }
  
  .role-btn-active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .role-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  /* Users table styles */
  .users-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .users-table th,
  .users-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  .users-table th {
    background-color: var(--card-background);
    font-weight: 600;
    color: var(--text-color);
  }
  
  .role-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  .role-badge.student {
    background-color: rgba(40, 167, 69, 0.1);
    color: #28a745;
    border: 1px solid rgba(40, 167, 69, 0.3);
  }
  
  .role-badge.teacher {
    background-color: rgba(0, 123, 255, 0.1);
    color: #007bff;
    border: 1px solid rgba(0, 123, 255, 0.3);
  }
  
  .role-badge.school_admin {
    background-color: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    border: 1px solid rgba(220, 53, 69, 0.3);
  }
  
  /* Botão de exclusão de usuário */
  .btn-delete-user {
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background 0.3s ease;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .btn-delete-user:hover {
    background: #c9302c;
  }
  
  /* Filtros de usuário */
  .users-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .user-filters {
    display: flex;
    gap: 10px;
  }
  
  .user-category-filter {
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--input-background);
    color: var(--text-color);
    font-size: 0.9rem;
  }
  
  .user-category-filter:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  /* Melhorias na dashboard */
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .stat-card {
    background: var(--card-background);
    border: 1px solid var(--border-color);
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
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #d9534f;
    margin: 10px 0;
  }
  
  .stat-label {
    font-size: 1rem;
    color: var(--text-light-color);
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-container {
      grid-template-columns: 1fr;
    }
  }
  
  /* Pie Chart Styles */
  .pie-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .pie-chart-svg {
    width: 200px;
    height: 200px;
    transform: rotate(-90deg);
  }
  
  .pie-chart-circle-bg {
    fill: none;
    stroke: #f0f0f0;
    stroke-width: 8;
  }
  
  .pie-chart-circle {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease-in-out;
  }
  
  .pie-chart-labels {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  
  .pie-chart-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  
  .chart-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .total-count {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .total-label {
    font-size: 0.8rem;
    color: var(--text-light-color);
  }
  
  .recent-registrations {
    padding: 10px 0;
  }
  
  .registration-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .registration-label {
    color: var(--text-light-color);
  }
  
  .registration-value {
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .simple-bar-chart {
    margin-top: 20px;
  }
  
  .bar-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .bar-label {
    width: 100px;
    font-size: 0.8rem;
    color: var(--text-light-color);
  }
  
  .bar {
    flex: 1;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  
  .bar-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.5s ease;
  }
  
  .bar-students {
    background-color: #5cb85c;
  }
  
  .bar-teachers {
    background-color: #0275d8;
  }
  
  .bar-value {
    width: 30px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--text-color);
  }
  
  /* Abas de relatórios */
  .report-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
  }
  
  .report-tab {
    padding: 10px 20px;
    background: var(--input-background);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .report-tab.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .report-tab:hover:not(.active) {
    background: #f0f0f0;
  }
  
  .report-content {
    margin-top: 20px;
  }
  
  .export-button {
    background: var(--success-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s ease;
  }
  
  .export-button:hover {
    background: #218838;
  }
  
  .report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .report-table th,
  .report-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  .report-table th {
    background: var(--card-background);
    font-weight: 600;
  }
  
  .report-data {
    margin-top: 20px;
  }
  
  /* Animações */
  @keyframes drawChart {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: var(--target-offset);
    }
  }
  
  /* Pie Chart Styles */
  .pie-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .pie-chart-svg {
    width: 200px;
    height: 200px;
    transform: rotate(-90deg);
  }
  
  .pie-chart-circle-bg {
    fill: none;
    stroke: #f0f0f0;
    stroke-width: 8;
  }
  
  .pie-chart-circle {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease-in-out;
  }
  
  .pie-chart-labels {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  
  .pie-chart-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  
  .chart-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .total-count {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .total-label {
    font-size: 0.8rem;
    color: var(--text-light-color);
  }
  
  /* Animações */
  @keyframes drawChart {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: var(--target-offset);
    }
  }
  
  @keyframes growBar {
    from {
      width: 0;
    }
    to {
      width: var(--target-width);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
  
  /* Animações gerais */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .slide-in-left {
    animation: slideInLeft 0.5s ease-in-out;
  }
  
  .slide-in-right {
    animation: slideInRight 0.5s ease-in-out;
  }
  
  .slide-in-up {
    animation: slideInUp 0.5s ease-in-out;
  }
  
  /* Estilos para cards com animação */
  .card.animated {
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.6s ease-out forwards;
  }
  
  /* Estilos específicos para gráficos Chart.js */
  .chart-container {
    position: relative;
    height: 200px !important;
    width: 100% !important;
  }
  
  .chart-container canvas {
    height: 200px !important;
    width: 100% !important;
  }
  
  /* Estilos para wrappers de gráficos */
  .pie-chart-wrapper,
  .bar-chart-wrapper {
    height: 200px !important;
    width: 100% !important;
  }
  
  .pie-chart-wrapper canvas,
  .bar-chart-wrapper canvas {
    height: 200px !important;
    width: 100% !important;
  }
  
  /* Estilos para seção de registro otimizada */
  .register-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .register-header {
    text-align: left;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .register-subtitle {
    color: var(--text-light-color);
    font-size: 0.9rem;
    margin-top: 5px;
  }
  
  .register-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-section {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
  }
  
  .section-title {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 8px;
    font-size: 1.1rem;
  }
  
  .input-row {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .input-row .input-group {
    flex: 1;
  }
  
  .role-selection {
    margin-top: 10px;
  }
  
  .role-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .role-btn {
    flex: 1;
    min-width: 120px;
    padding: 12px;
    border: 1px solid var(--border-color);
    background-color: var(--input-background);
    color: var(--text-color);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .role-btn:hover {
    background-color: #f0f0f0;
  }
  
  .role-btn-active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .role-btn i {
    font-size: 1.5rem;
  }
  
  .form-actions {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
  }
  
  .btn-secondary {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  
  .btn-secondary:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .input-hint {
    display: block;
    font-size: 0.8rem;
    color: var(--text-light-color);
    margin-top: 5px;
  }
  
  .info-text {
    color: var(--text-light-color);
    font-style: italic;
  }
  
  .password-mismatch-error {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 5px;
    padding: 8px;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .password-mismatch-error::before {
    content: "⚠";
  }
  
  /* Responsividade para dispositivos móveis */
  @media (max-width: 768px) {
    .register-card {
      margin: 10px;
      padding: 15px;
    }
    
    .input-row {
      flex-direction: column;
      gap: 10px;
    }
    
    .role-buttons {
      flex-direction: column;
    }
    
    .role-btn {
      min-width: auto;
    }
    
    .form-actions {
      flex-direction: column;
      gap: 10px;
    }
    
    .form-actions .btn {
      width: 100%;
      justify-content: center;
    }
    
    .section-title {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .register-header h3 {
      font-size: 1.2rem;
    }
    
    .register-subtitle {
      font-size: 0.8rem;
    }
    
    .form-section {
      padding: 15px;
    }
  }

  /* Theme Toggle Button - Switch Visual */
  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 12px;
    border: 2px solid var(--border-color, #ddd);
    background: var(--card-background, white);
    color: var(--text-color, #333);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: inherit;
  }

  .theme-toggle-btn:hover {
    background: linear-gradient(135deg, var(--primary-color, #d9534f) 0%, #c9302c 100%);
    color: white;
    border-color: var(--primary-color, #d9534f);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(217, 83, 79, 0.3);
  }

  .theme-toggle-switch {
    position: relative;
    width: 40px;
    height: 20px;
    background: var(--border-color, #ddd);
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
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
    font-weight: 500;
  }

  .theme-toggle-btn:hover .theme-toggle-slider.light {
    transform: scale(1.1);
  }

  .theme-toggle-btn:hover .theme-toggle-slider.dark {
    transform: scale(1.1) rotate(15deg);
  }

  /* Dark Theme - Theme Toggle */
  .dark-theme .theme-toggle-btn {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }

  .dark-theme .theme-toggle-btn:hover {
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    border-color: #d9534f;
    color: white;
  }

  /* Delete Modal with Password Confirmation */
  .delete-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    backdrop-filter: blur(4px);
  }

  .delete-modal {
    background: var(--card-background, white);
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 450px;
    overflow: hidden;
    animation: deleteModalSlideIn 0.3s ease;
  }

  @keyframes deleteModalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-30px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .delete-modal-header {
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    color: white;
    padding: 25px;
    text-align: center;
  }

  .delete-modal-icon {
    font-size: 3rem;
    margin-bottom: 10px;
    animation: deleteIconPulse 1s ease-in-out infinite;
  }

  @keyframes deleteIconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .delete-modal-header h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
  }

  .delete-modal-content {
    padding: 25px;
  }

  .delete-modal-warning {
    font-size: 1.1rem;
    color: var(--text-color, #333);
    margin-bottom: 10px;
    text-align: center;
  }

  .delete-modal-warning strong {
    color: #d9534f;
  }

  .delete-modal-info {
    font-size: 0.95rem;
    color: var(--text-light-color, #666);
    margin-bottom: 20px;
    text-align: center;
    line-height: 1.5;
  }

  .delete-modal-error {
    background-color: #f8d7da;
    color: #721c24;
    padding: 12px 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    border: 1px solid #f5c6cb;
  }

  .delete-modal-error i {
    font-size: 1.1rem;
  }

  .delete-modal-input-group {
    margin-top: 15px;
  }

  .delete-modal-input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-color, #333);
    font-size: 0.95rem;
  }

  .delete-modal-input-group input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid var(--border-color, #ddd);
    border-radius: 10px;
    font-size: 1rem;
    background: var(--input-background, #f9f9f9);
    color: var(--text-color, #333);
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .delete-modal-input-group input:focus {
    outline: none;
    border-color: #d9534f;
    box-shadow: 0 0 0 3px rgba(217, 83, 79, 0.15);
  }

  .delete-modal-input-group input:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
  }

  .delete-modal-actions {
    display: flex;
    gap: 12px;
    padding: 20px 25px;
    border-top: 1px solid var(--border-color, #eee);
    background-color: var(--card-background-light, rgba(0,0,0,0.02));
  }

  .delete-modal-btn-cancel,
  .delete-modal-btn-confirm {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.95rem;
  }

  .delete-modal-btn-cancel {
    background-color: var(--border-color, #e2e6ea);
    color: var(--text-color, #333);
  }

  .delete-modal-btn-cancel:hover:not(:disabled) {
    background-color: #c8ccd0;
  }

  .delete-modal-btn-confirm {
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    color: white;
  }

  .delete-modal-btn-confirm:hover:not(:disabled) {
    background: linear-gradient(135deg, #c9302c 0%, #a52a24 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(217, 83, 79, 0.4);
  }

  .delete-modal-btn-confirm:disabled,
  .delete-modal-btn-cancel:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .delete-modal-btn-confirm i.fa-spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Dark Theme - Delete Modal */
  .dark-theme .delete-modal {
    background: var(--card-background, #1e1e1e);
  }

  .dark-theme .delete-modal-content {
    background: var(--card-background, #1e1e1e);
  }

  .dark-theme .delete-modal-warning,
  .dark-theme .delete-modal-input-group label {
    color: var(--text-color, #e0e0e0);
  }

  .dark-theme .delete-modal-info {
    color: var(--text-light-color, #b0b0b0);
  }

  .dark-theme .delete-modal-error {
    background-color: rgba(248, 215, 218, 0.1);
    border-color: rgba(220, 53, 69, 0.3);
  }

  .dark-theme .delete-modal-input-group input {
    background: #2d2d2d;
    border-color: #444;
    color: #e0e0e0;
  }

  .dark-theme .delete-modal-input-group input:focus {
    border-color: #d9534f;
  }

  .dark-theme .delete-modal-actions {
    background-color: rgba(255,255,255,0.03);
    border-top-color: #444;
  }

  .dark-theme .delete-modal-btn-cancel {
    background-color: #444;
    color: #e0e0e0;
  }

  .dark-theme .delete-modal-btn-cancel:hover:not(:disabled) {
    background-color: #555;
  }

`;

document.head.appendChild(styles);

export default DashboardInstitution;