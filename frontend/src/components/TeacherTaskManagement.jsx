import React, { useState, useEffect } from 'react';
import { taskAPI, classAPI } from '../lib/api';

const TeacherTaskManagement = ({ user, darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    description: '',
    due_date: '',
    priority: 'medium',
    class_id: '',
    assigned_to: [] // IDs dos alunos
  });
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  // Carregar tarefas, turmas e alunos do professor
  useEffect(() => {
    loadTasks();
    loadClasses();
  }, []);

  const loadTasks = async () => {
    try {
      // Supondo que o backend tenha um endpoint para obter tarefas por professor
      const response = await taskAPI.getTasksByTeacher(user._id);
      setTasks(response.data || []);
    } catch (error) {
      setAlert({ message: 'Erro ao carregar tarefas: ' + error.message, type: 'error' });
    }
  };

  const loadClasses = async () => {
    try {
      const response = await classAPI.getClassesByTeacher(user._id);
      setClasses(response.data || []);
    } catch (error) {
      setAlert({ message: 'Erro ao carregar turmas: ' + error.message, type: 'error' });
    }
  };


  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        ...newTask,
        created_by: user._id,
        assigned_to: newTask.assigned_to.map(studentId => ({
          user: studentId,
          status: 'pending'
        }))
      };

      const response = await taskAPI.createTask(taskData);
      setTasks([...tasks, response.data]);
      setNewTask({
        title: '',
        subject: '',
        description: '',
        due_date: '',
        priority: 'medium',
        class_id: '',
        assigned_to: []
      });
      setShowCreateTask(false);
      setAlert({ message: 'Tarefa criada com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao criar tarefa: ' + error.message, type: 'error' });
    }
  };


  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await taskAPI.deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
        setAlert({ message: 'Tarefa excluída com sucesso!', type: 'success' });
      } catch (error) {
        setAlert({ message: 'Erro ao excluir tarefa: ' + error.message, type: 'error' });
      }
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStudentToggle = (studentId) => {
    setNewTask(prev => {
      const currentAssigned = [...prev.assigned_to];
      const index = currentAssigned.indexOf(studentId);
      
      if (index > -1) {
        currentAssigned.splice(index, 1);
      } else {
        currentAssigned.push(studentId);
      }
      
      return { ...prev, assigned_to: currentAssigned };
    });
  };

  // Atribuir a todos os alunos da turma
  const handleClassSelect = (classId) => {
    const selectedClassObj = classes.find(cls => cls._id === classId);
    if (selectedClassObj && selectedClassObj.students) {
      setNewTask(prev => ({
        ...prev,
        class_id: classId,
        assigned_to: selectedClassObj.students // Atualiza para os alunos da turma selecionada
      }));
    }
  };

  return (
    <div className={`teacher-task-management ${darkMode ? 'dark-theme' : ''}`}>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
      
      <div className="header-section">
        <h2>Gerenciamento de Tarefas</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateTask(true)}
        >
          + Nova Tarefa
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span className={`priority priority-${task.priority}`}>
                {task.priority}
              </span>
            </div>
            <div className="task-info">
              <p>{task.description || 'Sem descrição'}</p>
              <div className="task-stats">
                <span>Matéria: {task.subject}</span>
                <span>Vencimento: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Não definido'}</span>
                <span>Atribuído a: {task.assigned_to?.length || 0} aluno(s)</span>
              </div>
            </div>
            <div className="task-actions">
              <button 
                className="btn-secondary"
                onClick={() => {
                  // Implementar visualização/edição da tarefa
                }}
              >
                Visualizar
              </button>
              <button 
                className="btn-edit"
                onClick={() => {
                  // Implementar edição da tarefa
                }}
              >
                Editar
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDeleteTask(task._id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de criação de tarefa */}
      {showCreateTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Criar Nova Tarefa</h3>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Matéria</label>
                <input
                  type="text"
                  value={newTask.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Data de Vencimento</label>
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => handleInputChange('due_date', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Prioridade</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Turma (opcional - para atribuir a todos os alunos)</label>
                <select
                  value={newTask.class_id}
                  onChange={(e) => handleClassSelect(e.target.value)}
                >
                  <option value="">Selecione uma turma ou adicione alunos individualmente</option>
                  {classes.map(cls => (
                    <option key={cls._id} value={cls._id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Alunos (adicione individualmente)</label>
                <div className="students-selection">
                  {students.map(student => (
                    <label key={student._id} className="student-checkbox">
                      <input
                        type="checkbox"
                        checked={newTask.assigned_to.includes(student._id)}
                        onChange={() => handleStudentToggle(student._id)}
                      />
                      {student.name}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateTask(false)} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .teacher-task-management {
          padding: 20px;
          background: var(--background-color);
          min-height: 100vh;
        }
        
        .dark-theme .teacher-task-management {
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
        
        .tasks-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        
        .task-card {
          background: var(--card-background);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .dark-theme .task-card {
          background: var(--card-background);
          border-color: var(--border-color);
        }
        
        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .task-header h3 {
          margin: 0;
          color: var(--text-color);
        }
        
        .priority {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8em;
          font-weight: bold;
        }
        
        .priority-low {
          background: #d4edda;
          color: #155724;
        }
        
        .priority-medium {
          background: #fff3cd;
          color: #856404;
        }
        
        .priority-high {
          background: #f8d7da;
          color: #721c24;
        }
        
        .dark-theme .priority-low {
          background: #155724;
          color: #d4edda;
        }
        
        .dark-theme .priority-medium {
          background: #856404;
          color: #fff3cd;
        }
        
        .dark-theme .priority-high {
          background: #721c24;
          color: #f8d7da;
        }
        
        .task-info p {
          color: var(--text-light-color);
          margin: 10px 0;
        }
        
        .task-stats {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 15px;
          font-size: 0.9em;
          color: var(--text-light-color);
        }
        
        .task-actions {
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
          max-width: 600px;
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
        .form-group textarea,
        .form-group select {
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
        
        .students-selection {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          max-height: 200px;
          overflow-y: auto;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
        }
        
        .student-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
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

export default TeacherTaskManagement;