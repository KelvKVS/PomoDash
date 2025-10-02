import React, { useState, useEffect } from 'react';

function DashboardInstitution({ darkMode, toggleDarkMode }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Gerenciamento de Escolas
  const [schools, setSchools] = useState([
    { id: 1, name: 'Escola Estadual São Paulo', address: 'Rua A, 123', teachers: 45, students: 850, classes: 28 },
    { id: 2, name: 'Colégio Municipal Rio de Janeiro', address: 'Av. B, 456', teachers: 32, students: 620, classes: 22 },
    { id: 3, name: 'Centro Educacional Belo Horizonte', address: 'Travessa C, 789', teachers: 28, students: 510, classes: 18 },
  ]);
  
  // Gerenciamento de Professores
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Ana Silva', subject: 'Matemática', school: 'Escola Estadual São Paulo', email: 'ana@escola.sp.gov.br', classes: 5 },
    { id: 2, name: 'Carlos Oliveira', subject: 'História', school: 'Colégio Municipal Rio de Janeiro', email: 'carlos@escola.rj.gov.br', classes: 4 },
    { id: 3, name: 'Mariana Santos', subject: 'Ciências', school: 'Centro Educacional Belo Horizonte', email: 'mariana@escola.mg.gov.br', classes: 3 },
  ]);
  
  // Gerenciamento de Alunos
  const [students, setStudents] = useState([
    { id: 1, name: 'João Pedro', school: 'Escola Estadual São Paulo', class: '8º ano A', avg: 8.5 },
    { id: 2, name: 'Luiza Costa', school: 'Colégio Municipal Rio de Janeiro', class: '7º ano B', avg: 9.2 },
    { id: 3, name: 'Rafael Oliveira', school: 'Centro Educacional Belo Horizonte', class: '9º ano C', avg: 7.8 },
  ]);
  
  // Relatórios e Estatísticas
  const [reports, setReports] = useState([
    { id: 1, title: 'Relatório Mensal - Janeiro 2025', school: 'Escola Estadual São Paulo', date: '05/02/2025', status: 'Aprovado' },
    { id: 2, title: 'Relatório Mensal - Janeiro 2025', school: 'Colégio Municipal Rio de Janeiro', date: '06/02/2025', status: 'Pendente' },
    { id: 3, title: 'Relatório Mensal - Janeiro 2025', school: 'Centro Educacional Belo Horizonte', date: '07/02/2025', status: 'Aprovado' },
  ]);
  
  // Novos estados para criação
  const [newSchool, setNewSchool] = useState({
    name: '',
    address: '',
    teachers: 0,
    students: 0,
    classes: 0
  });

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    school: '',
    email: ''
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    school: '',
    class: '',
    avg: 0
  });

  const showScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  // Funções para gerenciar escolas
  const handleCreateSchool = (e) => {
    e.preventDefault();
    
    const newSchoolObj = {
      id: schools.length + 1,
      name: newSchool.name,
      address: newSchool.address,
      teachers: parseInt(newSchool.teachers),
      students: parseInt(newSchool.students),
      classes: parseInt(newSchool.classes)
    };
    
    setSchools([...schools, newSchoolObj]);
    setNewSchool({ name: '', address: '', teachers: 0, students: 0, classes: 0 });
  };

  // Funções para gerenciar professores
  const handleCreateTeacher = (e) => {
    e.preventDefault();
    
    const newTeacherObj = {
      id: teachers.length + 1,
      name: newTeacher.name,
      subject: newTeacher.subject,
      school: newTeacher.school,
      email: newTeacher.email,
      classes: 1 // Começa com 1 classe
    };
    
    setTeachers([...teachers, newTeacherObj]);
    setNewTeacher({ name: '', subject: '', school: '', email: '' });
  };

  // Funções para gerenciar alunos
  const handleCreateStudent = (e) => {
    e.preventDefault();
    
    const newStudentObj = {
      id: students.length + 1,
      name: newStudent.name,
      school: newStudent.school,
      class: newStudent.class,
      avg: parseFloat(newStudent.avg)
    };
    
    setStudents([...students, newStudentObj]);
    setNewStudent({ name: '', school: '', class: '', avg: 0 });
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
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
    'dashboard': 'Dashboard Instituição',
    'schools': 'Gestão Escolar',
    'teachers': 'Professores',
    'students': 'Alunos',
    'reports': 'Relatórios',
    'settings': 'Configurações',
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>Pomo<span>dash</span></h1>
        </div>
        <div className="menu">
          <div className={`menu-item ${activeScreen === 'dashboard' ? 'active' : ''}`} onClick={() => showScreen('dashboard')}>
            <i className="fas fa-tachometer-alt"></i><span>Dashboard</span>
          </div>
          <div className={`menu-item ${activeScreen === 'schools' ? 'active' : ''}`} onClick={() => showScreen('schools')}>
            <i className="fas fa-school"></i><span>Escolas</span>
          </div>
          <div className={`menu-item ${activeScreen === 'teachers' ? 'active' : ''}`} onClick={() => showScreen('teachers')}>
            <i className="fas fa-chalkboard-teacher"></i><span>Professores</span>
          </div>
          <div className={`menu-item ${activeScreen === 'students' ? 'active' : ''}`} onClick={() => showScreen('students')}>
            <i className="fas fa-users"></i><span>Alunos</span>
          </div>
          <div className={`menu-item ${activeScreen === 'reports' ? 'active' : ''}`} onClick={() => showScreen('reports')}>
            <i className="fas fa-chart-bar"></i><span>Relatórios</span>
          </div>
        </div>
        
        <div className="profile" onClick={openProfileModal}>
          <div className="profile-img-container">
            <img src="https://i.pravatar.cc/40" alt="Instituição" className="profile-img" />
            <button className="profile-img-upload-btn" title="Alterar foto">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-name">Instituição</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h2 className="page-title" id="page-title">{pageTitles[activeScreen]}</h2>
          <div className="user-actions">
            <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo escuro">
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <div className="notification-btn">
              <i className="fas fa-bell"></i>
            </div>
            <div className="user-menu">
              <i className="fas fa-user-circle"></i>
            </div>
          </div>
        </div>

        {/* Dashboard Screen */}
        <div className={`screen ${activeScreen === 'dashboard' ? 'active' : ''}`} id="dashboard-institution">
          <div className="stats-container">
            <div className="stat-card card">
                <i className="fas fa-school fa-2x" style={{ color: '#e55345' }}></i>
                <div className="stat-value">{schools.length}</div>
                <div className="stat-label">Escolas</div>
            </div>
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
          </div>
          <div className="card">
            <h3 className="card-title">Visão Geral da Instituição</h3>
            <p>Seja bem-vindo à administração da instituição. Aqui você pode gerenciar escolas, professores, alunos e acompanhar relatórios e estatísticas institucionais.</p>
          </div>
        </div>

        {/* Schools Screen */}
        <div className={`screen ${activeScreen === 'schools' ? 'active' : ''}`} id="schools">
          <div className="card">
            <h3 className="card-title">Gerenciar Escolas</h3>
            <form onSubmit={handleCreateSchool} className="add-school-form">
              <div className="input-row">
                <input 
                  type="text" 
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                  placeholder="Nome da escola" 
                  className="add-school-input"
                  required
                />
                <input 
                  type="text" 
                  value={newSchool.address}
                  onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
                  placeholder="Endereço" 
                  className="add-school-input"
                  required
                />
              </div>
              <div className="input-row">
                <input 
                  type="number" 
                  value={newSchool.teachers}
                  onChange={(e) => setNewSchool({...newSchool, teachers: e.target.value})}
                  placeholder="Número de professores" 
                  className="add-school-input"
                  min="0"
                />
                <input 
                  type="number" 
                  value={newSchool.students}
                  onChange={(e) => setNewSchool({...newSchool, students: e.target.value})}
                  placeholder="Número de alunos" 
                  className="add-school-input"
                  min="0"
                />
                <input 
                  type="number" 
                  value={newSchool.classes}
                  onChange={(e) => setNewSchool({...newSchool, classes: e.target.value})}
                  placeholder="Número de turmas" 
                  className="add-school-input"
                  min="0"
                />
              </div>
              <button type="submit" className="btn btn-primary">Adicionar Escola</button>
            </form>
            
            <div className="school-list">
              {schools.map(school => (
                <div key={school.id} className="school-item">
                  <div className="school-content">
                    <div className="school-title">{school.name}</div>
                    <div className="school-details">
                      Endereço: {school.address} • Professores: {school.teachers} • Alunos: {school.students} • Turmas: {school.classes}
                    </div>
                  </div>
                  <button className="btn-view-school">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              ))}
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
                  type="text" 
                  value={newTeacher.school}
                  onChange={(e) => setNewTeacher({...newTeacher, school: e.target.value})}
                  placeholder="Escola" 
                  className="add-teacher-input"
                  required
                />
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
                      Disciplina: {teacher.subject} • Escola: {teacher.school} • Email: {teacher.email} • Turmas: {teacher.classes}
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
                  value={newStudent.school}
                  onChange={(e) => setNewStudent({...newStudent, school: e.target.value})}
                  placeholder="Escola" 
                  className="add-student-input"
                  required
                />
              </div>
              <div className="input-row">
                <input 
                  type="text" 
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                  placeholder="Turma" 
                  className="add-student-input"
                  required
                />
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
                      Escola: {student.school} • Turma: {student.class} • Média: {student.avg.toFixed(1)}
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
            <h3 className="card-title">Relatórios Institucionais</h3>
            <div className="report-table">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Escola</th>
                    <th>Data</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>{report.school}</td>
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

      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="profile-modal" onClick={closeProfileModal}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeProfileModal}>&times;</button>
            <div className="profile-modal-header">
              <div className="profile-modal-img-container">
                <img src="https://i.pravatar.cc/80" alt="Instituição" className="profile-modal-img" />
                <button className="profile-img-upload-btn" title="Alterar foto">
                  <i className="fas fa-camera"></i>
                </button>
              </div>
              <div className="profile-modal-info">
                <h3>Instituição</h3>
                <p>Instituição</p>
                <p>instituicao@exemplo.com</p>
              </div>
            </div>
            <div className="profile-modal-details">
              <div>
                <label>Nome Completo</label>
                <span>Instituição</span>
              </div>
              <div>
                <label>Email</label>
                <span>instituicao@exemplo.com</span>
              </div>
              <div>
                <label>Tipo de Usuário</label>
                <span>Instituição</span>
              </div>
              <div>
                <label>Data de Registro</label>
                <span>01/09/2023</span>
              </div>
            </div>
            <div className="profile-modal-actions">
              <button className="btn btn-secondary" onClick={closeProfileModal}>Cancelar</button>
              <button className="btn btn-primary">Editar Perfil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardInstitution;