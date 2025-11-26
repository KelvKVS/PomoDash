import React, { useState, useEffect } from 'react';
import { classAPI } from '../lib/api';
import { userAPI } from '../lib/api';

const TeacherClassManagement = ({ user, darkMode }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    subject: '',
    start_date: '',
    end_date: '',
    max_students: 20
  });
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  // Carregar turmas do professor
  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      // Supondo que o backend tenha um endpoint para obter turmas por professor
      const response = await classAPI.getClassesByTeacher(user._id);
      setClasses(response.data || []);
    } catch (error) {
      setAlert({ message: 'Erro ao carregar turmas: ' + error.message, type: 'error' });
    }
  };

  const loadStudents = async () => {
    try {
      const response = await userAPI.getUsers({ role: 'student' });
      setStudents(response.data || []);
    } catch (error) {
      setAlert({ message: 'Erro ao carregar alunos: ' + error.message, type: 'error' });
    }
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const classData = {
        ...newClass,
        teacher_id: user._id,
        students: [] // Inicialmente sem alunos
      };
      
      const response = await classAPI.createClass(classData);
      setClasses([...classes, response.data]);
      setNewClass({
        name: '',
        description: '',
        subject: '',
        start_date: '',
        end_date: '',
        max_students: 20
      });
      setShowCreateClass(false);
      setAlert({ message: 'Turma criada com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao criar turma: ' + error.message, type: 'error' });
    }
  };

  const handleAddStudentToClass = async (studentId) => {
    if (!selectedClass) return;
    
    try {
      await classAPI.addStudentToClass(selectedClass._id, { student_id: studentId });
      
      // Atualizar a lista local de turmas
      const updatedClasses = classes.map(cls => {
        if (cls._id === selectedClass._id) {
          return {
            ...cls,
            students: [...(cls.students || []), studentId]
          };
        }
        return cls;
      });
      
      setClasses(updatedClasses);
      setShowAddStudent(false);
      setSelectedClass(null);
      setAlert({ message: 'Aluno adicionado à turma com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao adicionar aluno à turma: ' + error.message, type: 'error' });
    }
  };

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showAddStudentModal = (cls) => {
    setSelectedClass(cls);
    loadStudents();
    setShowAddStudent(true);
  };

  const hideAddStudentModal = () => {
    setShowAddStudent(false);
    setSelectedClass(null);
  };

  const handleInputChange = (field, value) => {
    setNewClass(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`teacher-class-management ${darkMode ? 'dark-theme' : ''}`}>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
      
      <div className="header-section">
        <h2>Gerenciamento de Turmas</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateClass(true)}
        >
          + Nova Turma
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar turmas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="classes-grid">
        {filteredClasses.map(cls => (
          <div key={cls._id} className="class-card">
            <div className="class-header">
              <h3>{cls.name}</h3>
              <span className="class-subject">{cls.subject}</span>
            </div>
            <div className="class-info">
              <p>{cls.description}</p>
              <div className="class-stats">
                <span>Alunos: {cls.students?.length || 0}</span>
                <span>Período: {cls.start_date} a {cls.end_date}</span>
              </div>
            </div>
            <div className="class-actions">
              <button 
                className="btn-secondary"
                onClick={() => showAddStudentModal(cls)}
              >
                Adicionar Aluno
              </button>
              <button 
                className="btn-edit"
                onClick={() => {
                  // Implementar edição de turma
                }}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de criação de turma */}
      {showCreateClass && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Criar Nova Turma</h3>
            <form onSubmit={handleCreateClass}>
              <div className="form-group">
                <label>Nome da Turma</label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Matéria</label>
                <input
                  type="text"
                  value={newClass.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={newClass.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Data de Início</label>
                  <input
                    type="date"
                    value={newClass.start_date}
                    onChange={(e) => handleInputChange('start_date', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Data de Término</label>
                  <input
                    type="date"
                    value={newClass.end_date}
                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateClass(false)} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Criar Turma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de adicionar aluno */}
      {showAddStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Adicionar Aluno à Turma: {selectedClass?.name}</h3>
            <div className="students-list">
              {students.map(student => (
                <div key={student._id} className="student-item">
                  <span>{student.name} ({student.email})</span>
                  <button 
                    className="btn-primary"
                    onClick={() => handleAddStudentToClass(student._id)}
                  >
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button onClick={hideAddStudentModal} className="btn-secondary">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .teacher-class-management {
          padding: 20px;
          background: var(--background-color);
          min-height: 100vh;
        }
        
        .dark-theme .teacher-class-management {
          background: var(--background-color);
        }
        
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .search-section {
          margin-bottom: 30px;
        }
        
        .search-input {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--input-background);
          color: var(--text-color);
        }
        
        .classes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .class-card {
          background: var(--card-background);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .dark-theme .class-card {
          background: var(--card-background);
          border-color: var(--border-color);
        }
        
        .class-header h3 {
          margin: 0 0 10px 0;
          color: var(--text-color);
        }
        
        .class-subject {
          background: #e3f2fd;
          color: #1976d2;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.9em;
        }
        
        .dark-theme .class-subject {
          background: #1565c0;
          color: white;
        }
        
        .class-info p {
          color: var(--text-light-color);
          margin: 10px 0;
        }
        
        .class-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          font-size: 0.9em;
          color: var(--text-light-color);
        }
        
        .class-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid var(--border-color);
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: var(--card-background);
          padding: 25px;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .dark-theme .modal-content {
          background: var(--card-background);
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          color: var(--text-color);
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: var(--input-background);
          color: var(--text-color);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 20px;
        }
        
        .students-list {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 20px;
        }
        
        .student-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .dark-theme .student-item {
          border-color: var(--border-color);
        }
        
        .alert {
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        
        .alert.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .alert.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        .dark-theme .alert.success {
          background: #155724;
          color: #d4edda;
          border-color: #c3e6cb;
        }
        
        .dark-theme .alert.error {
          background: #721c24;
          color: #f8d7da;
          border-color: #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default TeacherClassManagement;