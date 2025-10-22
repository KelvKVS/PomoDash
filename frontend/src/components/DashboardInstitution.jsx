import React, { useState, useEffect } from 'react';
import { authAPI, userAPI, reportAPI, schoolAPI } from '../lib/api';
import CustomAlert from './CustomAlert';
import CustomConfirm from './CustomConfirm';

function DashboardInstitution({ user, darkMode, toggleDarkMode, onLogout }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  const [profileImage, setProfileImage] = useState(user?.profilePicture || 'https://i.pravatar.cc/40');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // estados de carregamento e erro
  const [loading, setLoading] = useState({
    teachers: false,
    students: false,
    reports: false,
    school: false
  });
  
  const [errors, setErrors] = useState({
    teachers: null,
    students: null,
    reports: null,
    school: null
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
  
  // Estados para geração de relatórios
  const [selectedStudentForReport, setSelectedStudentForReport] = useState('');
  const [reportPeriod, setReportPeriod] = useState({ startDate: '', endDate: '' });
  const [generatingReport, setGeneratingReport] = useState(false);
  const [availableStudents, setAvailableStudents] = useState([]);
  
  // Novos estados para criação
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    email: '',
    role: 'teacher'
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    avg: 0,
    role: 'student'
  });

  // estados para alertas e confirmações
  const [alert, setAlert] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

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

  // Funções para carregar dados iniciais
  const loadTeachers = async () => {
    setLoading(prev => ({ ...prev, teachers: true }));
    setErrors(prev => ({ ...prev, teachers: null }));
    
    try {
      // Carregar professores da escola
      const response = await userAPI.getUsers({ 
        role: 'teacher', 
        school_id: user.school_id 
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
        setAvailableStudents(teachersData); // Atualização: definir professores como estudantes disponíveis para relatórios
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
      // Carregar alunos da escola
      const response = await userAPI.getUsers({ 
        role: 'student', 
        school_id: user.school_id 
      });
      
      if (response.data) {
        const studentsData = response.data.map(s => ({
          id: s._id,
          name: s.name,
          class: s.academic?.grade || s.academic?.class || 'N/A',
          avg: s.academic?.avg || 0,
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
      setAlert({ message: 'Erro ao carregar estatísticas da escola: ' + (error.message || 'Erro de conexão'), type: 'error' });
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

  // Funções para gerenciar professores
  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    
    if (!newTeacher.name.trim() || !newTeacher.email.trim() || !newTeacher.subject.trim()) {
      setAlert({ message: 'Por favor, preencha todos os campos obrigatórios', type: 'warning' });
      return;
    }
    
    try {
      // Chamar API para criar professor
      const response = await userAPI.createUser({ 
        name: newTeacher.name, 
        email: newTeacher.email, 
        password: 'TempPassword123!', 
        role: 'teacher',
        school_id: user.school_id // Associar à escola do usuário logado
      });
      
      const newTeacherObj = {
        id: response.data.user._id,
        name: response.data.user.name,
        subject: newTeacher.subject,
        email: response.data.user.email,
        classes: 0 // Começa com 0 classes até ser designado
      };
      
      setTeachers(prev => [...prev, newTeacherObj]);
      setNewTeacher({ name: '', subject: '', email: '', role: 'teacher' });
      
      setAlert({ message: 'Professor criado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      setAlert({ message: 'Erro ao criar professor: ' + (error.message || 'Erro de conexão'), type: 'error' });
    }
  };

  // Funções para gerenciar alunos
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    
    if (!newStudent.name.trim() || !newStudent.class.trim()) {
      setAlert({ message: 'Por favor, preencha todos os campos obrigatórios', type: 'warning' });
      return;
    }
    
    try {
      // Chamar API para criar aluno
      const response = await userAPI.createUser({ 
        name: newStudent.name, 
        email: `${Math.random().toString(36).substring(7)}@${user.school?.email.split('@')[1] || 'escola.com'}`, // gerar email temporário
        password: 'TempPassword123!', 
        role: 'student',
        school_id: user.school_id, // Associar à escola do usuário logado
        academic: {
          grade: newStudent.class
        }
      });
      
      const newStudentObj = {
        id: response.data.user._id,
        name: response.data.user.name,
        class: response.data.user.academic?.grade || newStudent.class,
        avg: parseFloat(newStudent.avg) || 0
      };
      
      setStudents(prev => [...prev, newStudentObj]);
      setNewStudent({ name: '', class: '', avg: 0, role: 'student' });
      
      setAlert({ message: 'Aluno criado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      setAlert({ message: 'Erro ao criar aluno: ' + (error.message || 'Erro de conexão'), type: 'error' });
    }
  };

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



  useEffect(() => {
    // Carregar dados iniciais
    loadTeachers();
    loadStudents();
    loadReports();
    loadSchoolStats();
    
    // Font Awesome for icons
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user.school_id]);

  const pageTitles = {
    'dashboard': 'Dashboard Escola',
    'teachers': 'Professores',
    'students': 'Alunos',
    'reports': 'Relatórios',
    'performance': 'Desempenho',
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
          <div className={`menu-item ${activeScreen === 'teachers' ? 'active' : ''}`} onClick={() => {showScreen('teachers'); setSidebarOpen(false);}}>
            <i className="fas fa-chalkboard-teacher"></i><span>Professores</span>
          </div>
          <div className={`menu-item ${activeScreen === 'students' ? 'active' : ''}`} onClick={() => {showScreen('students'); setSidebarOpen(false);}}>
            <i className="fas fa-users"></i><span>Alunos</span>
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
            <div className="card">
              <h3 className="card-title">Atividade Recente</h3>
              <div className="activity-chart">
                <div className="activity-item">
                  <span className="activity-label">Professores Ativos</span>
                  <span className="activity-value">{schoolStats?.users?.school_admins || 0}</span>
                </div>
                <div className="activity-item">
                  <span className="activity-label">Alunos Ativos</span>
                  <span className="activity-value">{schoolStats?.users?.students || 0}</span>
                </div>
                <div className="activity-item">
                  <span className="activity-label">Professores Ativos</span>
                  <span className="activity-value">{schoolStats?.users?.teachers || 0}</span>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="card-title">Utilização da Plataforma</h3>
              <div className="usage-info">
                <div className="usage-item">
                  <span className="usage-label">Capacidade</span>
                  <span className="usage-value">{schoolStats?.usage?.users || 'N/A'}</span>
                </div>
                <div className="usage-bar">
                  <div 
                    className="usage-progress" 
                    style={{ width: `${schoolStats?.usage?.usersPercentage || 0}%` }}
                  ></div>
                </div>
                <div className="usage-percent">{schoolStats?.usage?.usersPercentage || 0}%</div>
              </div>
            </div>
          </div>
        </div>



        {/* Teachers Screen */}
        <div className={`screen ${activeScreen === 'teachers' ? 'active' : ''}`} id="teachers">
          <div className="card">
            <h3 className="card-title">Gerenciar Professores</h3>
            <form onSubmit={handleCreateTeacher} className="add-teacher-form">
              <div className="input-row">
                <input 
                  type="text" 
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                  placeholder="Nome do professor" 
                  className="add-teacher-input"
                  required
                />
                <input 
                  type="text" 
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                  placeholder="Disciplina" 
                  className="add-teacher-input"
                  required
                />
              </div>
              <div className="input-row">
                <input 
                  type="email" 
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                  placeholder="Email" 
                  className="add-teacher-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Adicionar Professor</button>
            </form>
            
            {loading.teachers ? (
              <div className="loading">Carregando professores...</div>
            ) : errors.teachers ? (
              <div className="error">Erro: {errors.teachers}</div>
            ) : (
              <div className="teacher-list">
                {teachers && teachers.length > 0 ? (
                  teachers.map(teacher => (
                    <div key={teacher.id} className="teacher-item">
                      <div className="teacher-content">
                        <div className="teacher-title">{teacher.name}</div>
                        <div className="teacher-details">
                          Disciplina: {teacher.subject} • Email: {teacher.email} • Turmas: {teacher.classes}
                        </div>
                      </div>
                      <button className="btn-view-teacher">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Nenhum professor encontrado.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Students Screen */}
        <div className={`screen ${activeScreen === 'students' ? 'active' : ''}`} id="students">
          <div className="card">
            <h3 className="card-title">Gerenciar Alunos</h3>
            <form onSubmit={handleCreateStudent} className="add-student-form">
              <div className="input-row">
                <input 
                  type="text" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="Nome do aluno" 
                  className="add-student-input"
                  required
                />
                <input 
                  type="text" 
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                  placeholder="Turma" 
                  className="add-student-input"
                  required
                />
              </div>
              <div className="input-row">
                <input 
                  type="number" 
                  value={newStudent.avg}
                  onChange={(e) => setNewStudent({...newStudent, avg: e.target.value})}
                  placeholder="Média" 
                  className="add-student-input"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
              <button type="submit" className="btn btn-primary">Adicionar Aluno</button>
            </form>
            
            {loading.students ? (
              <div className="loading">Carregando alunos...</div>
            ) : errors.students ? (
              <div className="error">Erro: {errors.students}</div>
            ) : (
              <div className="student-list">
                {students && students.length > 0 ? (
                  students.map(student => (
                    <div key={student.id} className="student-item">
                      <div className="student-content">
                        <div className="student-title">{student.name}</div>
                        <div className="student-details">
                          Turma: {student.class} • Média: {student.avg.toFixed(1)}
                        </div>
                      </div>
                      <button className="btn-view-student">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Nenhum aluno encontrado.</p>
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

      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="profile-modal" onClick={closeProfileModal}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeProfileModal}>&times;</button>
            <div className="profile-modal-header">
              <div className="profile-modal-img-container">
                <img src={profileImage} alt="Instituição" className="profile-modal-img" />
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
                  <h3>{user?.name || 'Instituição'}</h3>
                )}
                <p>{user?.roleDescription || 'Instituição'}</p>
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
                  <span>{user?.name || 'Instituição'}</span>
                )}
              </div>
              <div>
                <label>Email</label>
                <span>{user?.email || 'email@exemplo.com'}</span>
              </div>
              <div>
                <label>Tipo de Usuário</label>
                <span>{user?.roleDescription || 'Instituição'}</span>
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
      
      {/* Confirmation Modal */}
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
`;

document.head.appendChild(styles);

export default DashboardInstitution;