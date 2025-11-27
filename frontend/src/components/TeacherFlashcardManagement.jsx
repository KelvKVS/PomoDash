import React, { useState, useEffect } from 'react';
import { flashcardAPI } from '../lib/api';
import { classAPI } from '../lib/api';

const TeacherFlashcardManagement = ({ user, darkMode }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({
    question: '',
    answer: '',
    tags: []
  });
  const [showCreateFlashcard, setShowCreateFlashcard] = useState(false);
  const [showEditFlashcard, setShowEditFlashcard] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  // Carregar flashcards e turmas do professor
  useEffect(() => {
    loadFlashcards();
    loadClasses();
  }, []);

  const loadFlashcards = async () => {
    try {
      // Supondo que o backend tenha um endpoint para obter flashcards por professor
      const response = await flashcardAPI.getFlashcardsByTeacher(user._id);
      setFlashcards(response.data || []);
    } catch (error) {
      setAlert({ message: 'Erro ao carregar flashcards: ' + error.message, type: 'error' });
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

  const handleCreateFlashcard = async (e) => {
    e.preventDefault();
    try {
      const flashcardData = {
        question: newFlashcard.question,
        answer: newFlashcard.answer,
        tags: newFlashcard.tags
      };

      const response = await flashcardAPI.createFlashcard(flashcardData);
      setFlashcards([...flashcards, response.data]);
      setNewFlashcard({
        question: '',
        answer: '',
        tags: []
      });
      setShowCreateFlashcard(false);
      setAlert({ message: 'Flashcard criado com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao criar flashcard: ' + error.message, type: 'error' });
    }
  };

  const handleDeleteFlashcard = async (flashcardId) => {
    if (window.confirm('Tem certeza que deseja excluir este flashcard?')) {
      try {
        await flashcardAPI.deleteFlashcard(flashcardId);
        setFlashcards(flashcards.filter(card => card._id !== flashcardId));
        setAlert({ message: 'Flashcard excluído com sucesso!', type: 'success' });
      } catch (error) {
        setAlert({ message: 'Erro ao excluir flashcard: ' + error.message, type: 'error' });
      }
    }
  };

  const handleUpdateFlashcard = async () => {
    if (!editingFlashcard) return;

    try {
      const response = await flashcardAPI.updateFlashcard(editingFlashcard._id, editingFlashcard);
      
      setFlashcards(flashcards.map(card =>
        card._id === editingFlashcard._id ? response.data : card
      ));
      
      setShowEditFlashcard(false);
      setEditingFlashcard(null);
      setAlert({ message: 'Flashcard atualizado com sucesso!', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Erro ao atualizar flashcard: ' + error.message, type: 'error' });
    }
  };

  const filteredFlashcards = flashcards.filter(card =>
    card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (card.subject && card.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (field, value) => {
    if (showEditFlashcard && editingFlashcard) {
      setEditingFlashcard(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setNewFlashcard(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    if (showEditFlashcard && editingFlashcard) {
      setEditingFlashcard(prev => ({
        ...prev,
        tags
      }));
    } else {
      setNewFlashcard(prev => ({
        ...prev,
        tags
      }));
    }
  };

  const openEditFlashcard = (card) => {
    setEditingFlashcard({ ...card });
    setShowEditFlashcard(true);
  };

  return (
    <div className={`teacher-flashcard-management ${darkMode ? 'dark-theme' : ''}`}>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
      
      <div className="header-section">
        <h2>Gerenciamento de Flashcards</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateFlashcard(true)}
        >
          + Novo Flashcard
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar flashcards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="flashcards-grid">
        {filteredFlashcards.map(card => (
          <div key={card._id} className="flashcard-card">
            <div className="flashcard-content">
              <h4>{card.question}</h4>
              <p className="answer-preview">{card.answer.substring(0, 100)}{card.answer.length > 100 ? '...' : ''}</p>
              <div className="flashcard-tags">
                {card.tags && card.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <div className="flashcard-stats">
                {card.subject && <span>Matéria: {card.subject}</span>}
                {card.created_at && <span>Criado em: {new Date(card.created_at).toLocaleDateString()}</span>}
              </div>
            </div>
            <div className="flashcard-actions">
              <button 
                className="btn-edit"
                onClick={() => openEditFlashcard(card)}
              >
                Editar
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDeleteFlashcard(card._id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de criação de flashcard */}
      {showCreateFlashcard && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Criar Novo Flashcard</h3>
            <form onSubmit={handleCreateFlashcard}>
              <div className="form-group">
                <label>Pergunta</label>
                <textarea
                  value={newFlashcard.question}
                  onChange={(e) => handleInputChange('question', e.target.value)}
                  required
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Resposta</label>
                <textarea
                  value={newFlashcard.answer}
                  onChange={(e) => handleInputChange('answer', e.target.value)}
                  required
                  rows="4"
                />
              </div>
              
              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={newFlashcard.tags.join(', ')}
                  onChange={handleTagChange}
                  placeholder="ex: matemática, álgebra, geometria"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateFlashcard(false)} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Criar Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de edição de flashcard */}
      {showEditFlashcard && editingFlashcard && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Flashcard</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateFlashcard();
            }}>
              <div className="form-group">
                <label>Pergunta</label>
                <textarea
                  value={editingFlashcard.question}
                  onChange={(e) => handleInputChange('question', e.target.value)}
                  required
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Resposta</label>
                <textarea
                  value={editingFlashcard.answer}
                  onChange={(e) => handleInputChange('answer', e.target.value)}
                  required
                  rows="4"
                />
              </div>
              
              
              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={editingFlashcard.tags?.join(', ') || ''}
                  onChange={handleTagChange}
                  placeholder="ex: matemática, álgebra, geometria"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => {
                  setShowEditFlashcard(false);
                  setEditingFlashcard(null);
                }} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Atualizar Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .teacher-flashcard-management {
          padding: 20px;
          background: var(--background-color);
          min-height: 100vh;
        }
        
        .dark-theme .teacher-flashcard-management {
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
        
        .flashcards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .flashcard-card {
          background: var(--card-background);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        
        .dark-theme .flashcard-card {
          background: var(--card-background);
          border-color: var(--border-color);
        }
        
        .flashcard-content {
          flex: 1;
        }
        
        .flashcard-content h4 {
          margin: 0 0 10px 0;
          color: var(--text-color);
          line-height: 1.4;
        }
        
        .answer-preview {
          color: var(--text-light-color);
          margin: 10px 0;
          line-height: 1.4;
        }
        
        .flashcard-tags {
          margin: 10px 0;
        }
        
        .tag {
          display: inline-block;
          background: #e3f2fd;
          color: #1976d2;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8em;
          margin-right: 5px;
          margin-bottom: 5px;
        }
        
        .dark-theme .tag {
          background: #1565c0;
          color: white;
        }
        
        .flashcard-stats {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 15px;
          font-size: 0.8em;
          color: var(--text-light-color);
        }
        
        .flashcard-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
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

export default TeacherFlashcardManagement;