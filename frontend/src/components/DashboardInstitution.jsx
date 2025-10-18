import React, { useState, useEffect } from 'react';
import { authAPI, userAPI, reportAPI } from '../lib/api';

function DashboardInstitution({ user, darkMode, toggleDarkMode, onLogout }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/40');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Gerenciamento de Professores
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Ana Silva', subject: 'Matemática', email: 'ana@escola.sp.gov.br', classes: 5 },
    { id: 2, name: 'Carlos Oliveira', subject: 'História', email: 'carlos@escola.rj.gov.br', classes: 4 },
    { id: 3, name: 'Mariana Santos', subject: 'Ciências', email: 'mariana@escola.mg.gov.br', classes: 3 },
  ]);
  
  // Gerenciamento de Alunos
  const [students, setStudents] = useState([
    { id: 1, name: 'João Pedro', class: '8º ano A', avg: 8.5 },
    { id: 2, name: 'Luiza Costa', class: '7º ano B', avg: 9.2 },
    { id: 3, name: 'Rafael Oliveira', class: '9º ano C', avg: 7.8 },
  ]);
  
  // Relatórios e Estatísticas
  const [reports, setReports] = useState([
    { id: 1, title: 'Relatório Mensal - Janeiro 2025', date: '05/02/2025', status: 'Aprovado' },
    { id: 2, title: 'Relatório Mensal - Janeiro 2025', date: '06/02/2025', status: 'Pendente' },
    { id: 3, title: 'Relatório Mensal - Janeiro 2025', date: '07/02/2025', status: 'Aprovado' },
  ]);
  
  // Relatórios de Desempenho dos Alunos
  const [studentPerformanceReports, setStudentPerformanceReports] = useState([
    { id: 1, student: 'João Silva', class: '8º ano A', subject: 'Matemática', avg: 8.5, pomodoroSessions: 12, taskCompletion: 90 },
    { id: 2, student: 'Maria Santos', class: '7º ano B', subject: 'História', avg: 9.2, pomodoroSessions: 15, taskCompletion: 95 },
    { id: 3, student: 'Pedro Oliveira', class: '9º ano C', subject: 'Ciências', avg: 7.8, pomodoroSessions: 8, taskCompletion: 75 },
  ]);
  
  // Estados para geração de relatórios
  const [selectedStudentForReport, setSelectedStudentForReport] = useState('');
  const [reportPeriod, setReportPeriod] = useState({ startDate: '', endDate: '' });
  const [generatingReport, setGeneratingReport] = useState(false);
  const [, setAvailableStudents] = useState(students);
  
  // Atualizar availableStudents quando students mudar
  useEffect(() => {
    setAvailableStudents(students);
  }, [students]);
  
  // Novos estados para criação
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    email: ''
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    avg: 0
  });

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  // Funções para gerenciar professores
  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    
    try {
      // Chamar API para criar professor
      const response = await userAPI.createUser({ 
        name: newTeacher.name, 
        email: newTeacher.email, 
        password: 'tempPassword123', // Seria gerado automaticamente
        role: 'teacher',
        school_id: user.school_id // Associar à escola do usuário logado
      });
      
      const newTeacherObj = {
        id: response.data._id || teachers.length + 1,
        name: response.data.name || newTeacher.name,
        subject: newTeacher.subject,
        email: response.data.email || newTeacher.email,
        classes: 0 // Começa com 0 classes até ser designado
      };
      
      setTeachers([...teachers, newTeacherObj]);
      setNewTeacher({ name: '', subject: '', email: '' });
      
      alert('Professor criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      alert('Erro ao criar professor. Tente novamente: ' + error.message);
    }
  };

  // Funções para gerenciar alunos
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    
    try {
      // Chamar API para criar aluno
      const response = await userAPI.createUser({ 
        name: newStudent.name, 
        email: newStudent.email, 
        password: 'tempPassword123', // Seria gerado automaticamente
        role: 'student',
        school_id: user.school_id, // Associar à escola do usuário logado
        academic: {
          studentId: newStudent.class, // Usando a turma como ID do aluno temporariamente
          grade: newStudent.class
        }
      });
      
      const newStudentObj = {
        id: response.data._id || students.length + 1,
        name: response.data.name || newStudent.name,
        class: response.data.academic?.grade || newStudent.class,
        avg: parseFloat(newStudent.avg)
      };
      
      setStudents([...students, newStudentObj]);
      setNewStudent({ name: '', class: '', avg: 0 });
      
      alert('Aluno criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      alert('Erro ao criar aluno. Tente novamente: ' + error.message);
    }
  };

  // Funções para gerar relatórios de desempenho
  const handleGenerateReport = async (e) => {
    e.preventDefault();
    
    if (!selectedStudentForReport || !reportPeriod.startDate || !reportPeriod.endDate) {
      alert('Por favor, selecione um aluno e um período válido para gerar o relatório.');
      return;
    }

    setGeneratingReport(true);
    
    try {
      // Chamar API real para gerar relatório
      const response = await reportAPI.generateStudentReport(selectedStudentForReport, reportPeriod);
      
      const newReport = {
        id: response.data._id || studentPerformanceReports.length + 1,
        student: students.find(s => s.id.toString() === selectedStudentForReport)?.name || 'Aluno Desconhecido',
        class: students.find(s => s.id.toString() === selectedStudentForReport)?.class || 'N/A',
        subject: response.data.subject || 'Geral',
        avg: response.data.avg || 0,
        pomodoroSessions: response.data.pomodoroSessions || 0,
        taskCompletion: response.data.taskCompletion || 0,
        generationDate: response.data.generationDate || new Date().toLocaleDateString('pt-BR')
      };
      
      setStudentPerformanceReports([...studentPerformanceReports, newReport]);
      
      // Resetar formulário
      setSelectedStudentForReport('');
      setReportPeriod({ startDate: '', endDate: '' });
      
      alert('Relatório gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      alert('Erro ao gerar relatório. Tente novamente: ' + error.message);
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

    // Carregar dados iniciais da API
    const loadInitialData = async () => {
      try {
        // Carregar professores
        const teachersResponse = await userAPI.getUsers({ role: 'teacher' });
        if (teachersResponse && teachersResponse.data) {
          const teachersData = teachersResponse.data.map(t => ({
            id: t._id,
            name: t.name,
            subject: t.academic?.subject || 'N/A',
            email: t.email,
            classes: t.classesCount || 0
          }));
          setTeachers(teachersData);
        }

        // Carregar alunos
        const studentsResponse = await userAPI.getUsers({ role: 'student' });
        if (studentsResponse && studentsResponse.data) {
          const studentsData = studentsResponse.data.map(s => ({
            id: s._id,
            name: s.name,
            class: s.academic?.grade || 'N/A',
            avg: s.academic?.avg || 0
          }));
          setStudents(studentsData);
        }

        // Carregar relatórios
        const reportsResponse = await reportAPI.getReports();
        if (reportsResponse && reportsResponse.data) {
          const reportsData = reportsResponse.data.map(r => ({
            id: r._id,
            title: r.title || 'Relatório',
            date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('pt-BR') : 'N/A',
            status: r.status || 'Pendente'
          }));
          setReports(reportsData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    };

    loadInitialData();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const pageTitles = {
    'dashboard': 'Dashboard Escola',
    'teachers': 'Professores',
    'students': 'Alunos',
    'reports': 'Relatórios',
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
          <div className={`menu-item ${activeScreen === 'teachers' ? 'active' : ''}`} onClick={() => {showScreen('teachers'); setSidebarOpen(false);}}>
            <i className="fas fa-chalkboard-teacher"></i><span>Professores</span>
          </div>
          <div className={`menu-item ${activeScreen === 'students' ? 'active' : ''}`} onClick={() => {showScreen('students'); setSidebarOpen(false);}}>
            <i className="fas fa-users"></i><span>Alunos</span>
          </div>
          <div className={`menu-item ${activeScreen === 'reports' ? 'active' : ''}`} onClick={() => {showScreen('reports'); setSidebarOpen(false);}}>
            <i className="fas fa-chart-bar"></i><span>Relatórios</span>
          </div>
          <div className={`menu-item ${activeScreen === 'performance' ? 'active' : ''}`} onClick={() => {showScreen('performance'); setSidebarOpen(false);}}>
            <i className="fas fa-chart-line"></i><span>Desempenho</span>
          </div>
        </div>
        
        <div className="profile" onClick={() => {openProfileModal(); setSidebarOpen(false);}}>
          <div className="profile-img-container">
            <img src="https://i.pravatar.cc/40" alt="Instituição" className="profile-img" />
            <button className="profile-img-upload-btn" title="Alterar foto">
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
            <div className="stat-card card">
                <i className="fas fa-graduation-cap fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{user?.school?.name || 'N/A'}</div>
                <div className="stat-label">Escola</div>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Visão Geral da Escola</h3>
            <p>Seja bem-vindo à administração da escola. Aqui você pode gerenciar professores, alunos e acompanhar relatórios e estatísticas de desempenho.</p>
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
            
            <div className="teacher-list">
              {teachers.map(teacher => (
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
              ))}
            </div>
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
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Adicionar Aluno</button>
            </form>
            
            <div className="student-list">
              {students.map(student => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Reports Screen */}
        <div className={`screen ${activeScreen === 'reports' ? 'active' : ''}`} id="reports">
          <div className="card">
            <h3 className="card-title">Relatórios da Escola</h3>
            <div className="report-table">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Data</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>{report.date}</td>
                      <td>
                        <span className={`status ${report.status === 'Aprovado' ? 'status-approved' : 'status-pending'}`}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                    {students.map(student => (
                      <option key={student.id} value={student.id.toString()}>{student.name}</option>
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
                  {studentPerformanceReports.map(report => (
                    <tr key={report.id}>
                      <td>{report.student}</td>
                      <td>{report.class}</td>
                      <td>{report.subject}</td>
                      <td>{report.avg.toFixed(1)}</td>
                      <td>{report.pomodoroSessions}</td>
                      <td>{report.taskCompletion}%</td>
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
    </div>
  );
}

export default DashboardInstitution;