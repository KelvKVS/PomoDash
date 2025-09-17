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

module.exports = router;
