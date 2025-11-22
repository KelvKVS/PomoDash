import { useState, useEffect } from 'react';

// Hook para gerenciar estatísticas de flashcard
const useFlashcardStats = () => {
  const [stats, setStats] = useState({});

  // Carregar estatísticas do localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('flashcardStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Salvar estatísticas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('flashcardStats', JSON.stringify(stats));
  }, [stats]);

  // Atualizar estatísticas quando o usuário responde um flashcard
    const updateFlashcardStats = async (flashcardId, correct) => {
    setStats(prevStats => {
      const flashcardStats = prevStats[flashcardId] || {
        attempts: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
        lastReviewed: null,
        streak: 0
      };

      const newAttempts = flashcardStats.attempts + 1;
      const newCorrect = correct ? flashcardStats.correct + 1 : flashcardStats.correct;
      const newIncorrect = correct ? flashcardStats.incorrect : flashcardStats.incorrect + 1;
      const newAccuracy = Math.round((newCorrect / newAttempts) * 100);
      const newStreak = correct ? flashcardStats.streak + 1 : 0;

      return {
        ...prevStats,
        [flashcardId]: {
          attempts: newAttempts,
          correct: newCorrect,
          incorrect: newIncorrect,
          accuracy: newAccuracy,
          lastReviewed: new Date().toISOString(),
          streak: newStreak
        }
      };
    });

    // eslint-disable-next-line no-undef
    setStats(updatedStats);

    // Atualizar estatísticas no backend também
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/flashcards/${flashcardId}/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          correct: correct,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Erro ao atualizar estatísticas no servidor:', error);
    }
  };

  // Calcular aproveitamento geral
  const getOverallAccuracy = () => {
    const allStats = Object.values(stats);
    if (allStats.length === 0) return 0;

    const totalAttempts = allStats.reduce((sum, stat) => sum + stat.attempts, 0);
    const totalCorrect = allStats.reduce((sum, stat) => sum + stat.correct, 0);

    return totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  };

  // Obter estatísticas de um flashcard específico
  const getFlashcardStats = (flashcardId) => {
    return stats[flashcardId] || {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      accuracy: 0,
      lastReviewed: null,
      streak: 0
    };
  };

  // Resetar estatísticas de um flashcard
  const resetFlashcardStats = (flashcardId) => {
    setStats(prevStats => {
      const { [flashcardId]: _, ...rest } = prevStats;
      return rest;
    });
  };

  // Resetar todas as estatísticas
  const resetAllStats = () => {
    setStats({});
  };

  return {
    stats,
    updateFlashcardStats,
    getOverallAccuracy,
    getFlashcardStats,
    resetFlashcardStats,
    resetAllStats
  };
};

export default useFlashcardStats;