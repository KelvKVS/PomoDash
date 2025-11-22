const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const Flashcard = require('../models/Flashcard');

const router = express.Router();

// Middleware de validação
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }
  next();
};

// @route   GET /api/flashcards
// @desc    Listar todos os flashcards do usuário logado
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ 
      user_id: req.user._id, 
      school_id: req.user.school_id 
    });
    res.json({ status: 'success', data: flashcards });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao listar flashcards' });
  }
});

// @route   POST /api/flashcards
// @desc    Criar novo flashcard
// @access  Private
router.post(
  '/',
  [
    auth,
    body('question').notEmpty().withMessage('Pergunta é obrigatória').trim(),
    body('answer').notEmpty().withMessage('Resposta é obrigatória').trim(),
    body('tags').optional().isArray().withMessage('Tags deve ser um array')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { question, answer, tags } = req.body;
      const flashcard = new Flashcard({
        user_id: req.user._id,
        school_id: req.user.school_id,
        question,
        answer,
        tags
      });
      await flashcard.save();
      res.status(201).json({ status: 'success', data: flashcard });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Erro ao criar flashcard' });
    }
  }
);

// @route   GET /api/flashcards/:id
// @desc    Obter flashcard por ID
// @access  Private
router.get(
  '/:id',
  [auth, param('id').isMongoId().withMessage('ID inválido')],
  validateRequest,
  async (req, res) => {
    try {
      const flashcard = await Flashcard.findOne({ 
        _id: req.params.id, 
        user_id: req.user._id,
        school_id: req.user.school_id 
      });
      if (!flashcard) {
        return res.status(404).json({ status: 'error', message: 'Flashcard não encontrado' });
      }
      res.json({ status: 'success', data: flashcard });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Erro ao buscar flashcard' });
    }
  }
);

// @route   PUT /api/flashcards/:id
// @desc    Atualizar flashcard
// @access  Private
router.put(
  '/:id',
  [
    auth,
    param('id').isMongoId().withMessage('ID inválido'),
    body('question').optional().notEmpty().withMessage('Pergunta não pode ser vazia').trim(),
    body('answer').optional().notEmpty().withMessage('Resposta não pode ser vazia').trim(),
    body('tags').optional().isArray().withMessage('Tags deve ser um array')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { question, answer, tags } = req.body;
      const update = {};
      if (question) update.question = question;
      if (answer) update.answer = answer;
      if (tags) update.tags = tags;

      const flashcard = await Flashcard.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user._id, school_id: req.user.school_id },
        { $set: update },
        { new: true }
      );
      if (!flashcard) {
        return res.status(404).json({ status: 'error', message: 'Flashcard não encontrado' });
      }
      res.json({ status: 'success', data: flashcard });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Erro ao atualizar flashcard' });
    }
  }
);

// @route   DELETE /api/flashcards/:id
// @desc    Deletar flashcard
// @access  Private
router.delete(
  '/:id',
  [auth, param('id').isMongoId().withMessage('ID inválido')],
  validateRequest,
  async (req, res) => {
    try {
      const flashcard = await Flashcard.findOneAndDelete({
        _id: req.params.id,
        user_id: req.user._id,
        school_id: req.user.school_id
      });
      if (!flashcard) {
        return res.status(404).json({ status: 'error', message: 'Flashcard não encontrado' });
      }
      res.json({ status: 'success', message: 'Flashcard deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Erro ao deletar flashcard' });
    }
  }
);

// @route   PUT /api/flashcards/:id/stats
// @desc    Atualizar estatísticas de um flashcard
// @access  Private
router.put(
  '/:id/stats',
  [auth, param('id').isMongoId().withMessage('ID inválido')],
  validateRequest,
  async (req, res) => {
    try {
      const { correct, timestamp } = req.body;

      const flashcard = await Flashcard.findOne({
        _id: req.params.id,
        user_id: req.user._id,
        school_id: req.user.school_id
      });

      if (!flashcard) {
        return res.status(404).json({ status: 'error', message: 'Flashcard não encontrado' });
      }

      // Atualizar estatísticas
      flashcard.stats.attempts += 1;
      if (correct) {
        flashcard.stats.correct += 1;
      } else {
        flashcard.stats.incorrect += 1;
      }

      flashcard.stats.accuracy = Math.round((flashcard.stats.correct / flashcard.stats.attempts) * 100);
      flashcard.stats.lastReviewed = timestamp ? new Date(timestamp) : new Date();
      flashcard.stats.streak = correct ? flashcard.stats.streak + 1 : 0;

      await flashcard.save();

      res.json({ status: 'success', data: flashcard });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Erro ao atualizar estatísticas do flashcard' });
    }
  }
);

// @route   GET /api/flashcards/stats/user/:userId
// @desc    Obter estatísticas de flashcards por usuário
// @access  Private
router.get('/stats/user/:userId', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({
      user_id: req.params.userId,
      school_id: req.user.school_id
    });

    const stats = {
      total: flashcards.length,
      totalAttempts: 0,
      totalCorrect: 0,
      overallAccuracy: 0
    };

    flashcards.forEach(card => {
      stats.totalAttempts += card.stats.attempts;
      stats.totalCorrect += card.stats.correct;
    });

    if (stats.totalAttempts > 0) {
      stats.overallAccuracy = Math.round((stats.totalCorrect / stats.totalAttempts) * 100);
    }

    res.json({ status: 'success', data: stats });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao obter estatísticas do usuário' });
  }
});

// @route   GET /api/flashcards/stats/class/:classId
// @desc    Obter estatísticas de flashcards por turma
// @access  Private
router.get('/stats/class/:classId', auth, async (req, res) => {
  try {
    // Obter todos os usuários da turma e calcular estatísticas
    // Esta implementação pode precisar ser ajustada conforme o modelo de turma
    res.status(501).json({ status: 'error', message: 'Funcionalidade de estatísticas por turma ainda não implementada' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao obter estatísticas da turma' });
  }
});

// @route   GET /api/flashcards/stats/aggregate
// @desc    Obter estatísticas agregadas de flashcards
// @access  Private
router.get('/stats/aggregate', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({
      user_id: req.user._id,
      school_id: req.user.school_id
    });

    if (flashcards.length === 0) {
      res.json({ status: 'success', data: { overallAccuracy: 0, totalFlashcards: 0, totalAttempts: 0 } });
      return;
    }

    let totalAttempts = 0;
    let totalCorrect = 0;

    flashcards.forEach(card => {
      totalAttempts += card.stats.attempts;
      totalCorrect += card.stats.correct;
    });

    const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    res.json({
      status: 'success',
      data: {
        overallAccuracy,
        totalFlashcards: flashcards.length,
        totalAttempts,
        totalCorrect
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao obter estatísticas agregadas' });
  }
});

module.exports = router;
