const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const PomodoroSession = require('../models/PomodoroSession');
const Task = require('../models/Task');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Middleware de validação
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

// @route   GET /api/pomodoro/sessions
// @desc    Listar sessões de pomodoro
// @access  Private
router.get('/sessions', auth, [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('status').optional().isIn(['running', 'paused', 'completed', 'abandoned', 'interrupted']),
    query('start_date').optional().isISO8601().toDate(),
    query('end_date').optional().isISO8601().toDate(),
], validateRequest, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, start_date, end_date } = req.query;
    const skip = (page - 1) * limit;

    const filter = { school_id: req.user.school_id, user_id: req.user._id };
    if (status) filter.status = status;
    if (start_date || end_date) {
      filter['timing.started_at'] = {};
      if (start_date) filter['timing.started_at'].$gte = start_date;
      if (end_date) filter['timing.started_at'].$lte = end_date;
    }

    const sessions = await PomodoroSession.find(filter)
      .populate('task_id', 'title')
      .sort({ 'timing.started_at': -1 })
      .skip(skip)
      .limit(limit);

    const total = await PomodoroSession.countDocuments(filter);

    res.json({ 
      status: 'success',
      data: sessions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/pomodoro/sessions
// @desc    Iniciar nova sessão de pomodoro
// @access  Private
router.post('/sessions', auth, [
    body('task_id').optional().isMongoId(),
    body('type').isIn(['work', 'short_break', 'long_break']).default('work'),
    body('planned_duration').isInt({ min: 1, max: 120 }).withMessage('Duração deve ser entre 1 e 120 min'),
], validateRequest, async (req, res) => {
  try {
    const activeSession = await PomodoroSession.findOne({ user_id: req.user._id, status: { $in: ['running', 'paused'] } });
    if (activeSession) {
      return res.status(400).json({ status: 'error', message: 'Já existe uma sessão ativa.', data: activeSession });
    }

    const { task_id, type, planned_duration } = req.body;

    if (task_id) {
      const task = await Task.findOne({ _id: task_id, school_id: req.user.school_id });
      if (!task) return res.status(404).json({ status: 'error', message: 'Tarefa não encontrada' });
    }

    const session = new PomodoroSession({
      school_id: req.user.school_id,
      user_id: req.user._id,
      task_id,
      type,
      settings: {
        planned_duration
      },
      status: 'running',
      timing: { started_at: new Date() }
    });

    await session.save();
    res.status(201).json({ status: 'success', data: session });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/pomodoro/sessions/active
// @desc    Obter sessão ativa do usuário
// @access  Private
router.get('/sessions/active', auth, async (req, res) => {
    try {
      const activeSession = await PomodoroSession.findOne({
        user_id: req.user._id,
        school_id: req.user.school_id,
        status: { $in: ['running', 'paused'] }
      }).populate('task_id', 'title');

      if (!activeSession) {
          return res.status(404).json({ status: 'error', message: 'Nenhuma sessão ativa encontrada' });
      }

      res.json({ status: 'success', data: activeSession });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
    }
  }
);

// @route   GET /api/pomodoro/sessions/:id
// @desc    Obter sessão específica
// @access  Private
router.get('/sessions/:id', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const session = await PomodoroSession.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!session) return res.status(404).json({ status: 'error', message: 'Sessão não encontrada' });
    res.json({ status: 'success', data: session });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/pomodoro/sessions/:id/pause
// @desc    Pausar sessão
// @access  Private
router.put('/sessions/:id/pause', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const session = await PomodoroSession.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!session) return res.status(404).json({ status: 'error', message: 'Sessão não encontrada' });
    await session.pause();
    res.json({ status: 'success', data: session });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao pausar sessão' });
  }
});

// @route   PUT /api/pomodoro/sessions/:id/resume
// @desc    Retomar sessão
// @access  Private
router.put('/sessions/:id/resume', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const session = await PomodoroSession.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!session) return res.status(404).json({ status: 'error', message: 'Sessão não encontrada' });
    await session.resume();
    res.json({ status: 'success', data: session });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao retomar sessão' });
  }
});

// @route   PUT /api/pomodoro/sessions/:id/complete
// @desc    Completar sessão
// @access  Private
router.put('/sessions/:id/complete', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const session = await PomodoroSession.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!session) return res.status(404).json({ status: 'error', message: 'Sessão não encontrada' });
    
    // Adicionar feedback se houver
    if(req.body.feedback) {
        session.feedback = { ...session.feedback, ...req.body.feedback };
    }

    await session.complete();
    res.json({ status: 'success', data: session });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao completar sessão' });
  }
});

// @route   PUT /api/pomodoro/sessions/:id/abandon
// @desc    Abandonar sessão
// @access  Private
router.put('/sessions/:id/abandon', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const session = await PomodoroSession.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!session) return res.status(404).json({ status: 'error', message: 'Sessão não encontrada' });
    await session.abandon();
    res.json({ status: 'success', data: session });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao abandonar sessão' });
  }
});

// @route   GET /api/pomodoro/stats
// @desc    Estatísticas de Pomodoro do usuário
// @access  Private
router.get('/stats', auth, async (req, res) => {
    try {
        const stats = await PomodoroSession.getUserStats(req.user._id);
        res.json({ status: 'success', data: stats[0] || {} });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Erro ao buscar estatísticas' });
    }
});

module.exports = router;
