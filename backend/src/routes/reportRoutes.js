const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Report = require('../models/Report');
const User = require('../models/User');
const PomodoroSession = require('../models/PomodoroSession');
const Task = require('../models/Task');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Middleware de validação
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Dados inválidos', details: errors.array() });
  }
  next();
};

// @route   GET /api/reports
// @desc    Listar relatórios
// @access  Private (admin/teacher)
router.get('/', auth, authorize(['school_admin', 'teacher']), [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('type').optional().isIn(['student-performance', 'class-performance', 'school-performance', 'pomodoro-analytics', 'task-completion', 'flashcard-progress']),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
], validateRequest, async (req, res) => {
  try {
    const { page = 1, limit = 10, type, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    let filter = { school_id: req.user.school_id };
    
    if (type) {
      filter.type = type;
    }
    
    if (startDate || endDate) {
      filter['period.startDate'] = {};
      if (startDate) {
        filter['period.startDate'].$gte = new Date(startDate);
      }
      if (endDate) {
        filter['period.startDate'].$lte = new Date(endDate);
      }
    }

    const reports = await Report.find(filter)
      .populate('generated_by', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Report.countDocuments(filter);

    res.json({ 
      status: 'success', 
      data: reports, 
      pagination: { page, limit, total, pages: Math.ceil(total / limit) } 
    });
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/reports/:id
// @desc    Obter relatório específico
// @access  Private (admin/teacher do mesmo school_id)
router.get('/:id', auth, authorize(['school_admin', 'teacher']), [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const report = await Report.findOne({ 
      _id: req.params.id, 
      school_id: req.user.school_id 
    }).populate('generated_by', 'name email');

    if (!report) {
      return res.status(404).json({ status: 'error', message: 'Relatório não encontrado' });
    }

    res.json({ status: 'success', data: report });
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/reports/generate/student/:studentId
// @desc    Gerar relatório de desempenho de aluno
// @access  Private (school_admin/teacher)
router.post('/generate/student/:studentId', auth, authorize(['school_admin', 'teacher']), [
  param('studentId').isMongoId(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
], validateRequest, async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.body;

    // Verificar se o aluno pertence à mesma escola
    const student = await User.findOne({ 
      _id: studentId, 
      school_id: req.user.school_id,
      role: 'student'
    });

    if (!student) {
      return res.status(404).json({ status: 'error', message: 'Aluno não encontrado ou não pertence à sua escola' });
    }

    // Validar se o período é válido
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      return res.status(400).json({ status: 'error', message: 'Data de início não pode ser posterior à data de fim' });
    }

    // Gerar relatório
    const report = await Report.generateStudentPerformanceReport(studentId, {
      startDate: start,
      endDate: end
    });

    res.status(201).json({ 
      status: 'success', 
      data: report,
      message: 'Relatório gerado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/reports/student/:studentId
// @desc    Obter relatórios de um aluno específico
// @access  Private (admin/teacher)
router.get('/student/:studentId', auth, authorize(['school_admin', 'teacher']), [
  param('studentId').isMongoId()
], validateRequest, async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verificar se o aluno pertence à mesma escola
    const student = await User.findOne({ 
      _id: studentId, 
      school_id: req.user.school_id,
      role: 'student'
    });

    if (!student) {
      return res.status(404).json({ status: 'error', message: 'Aluno não encontrado ou não pertence à sua escola' });
    }

    const reports = await Report.find({
      target: studentId,
      school_id: req.user.school_id,
      type: 'student-performance'
    }).sort({ createdAt: -1 });

    res.json({ 
      status: 'success', 
      data: reports 
    });
  } catch (error) {
    console.error('Erro ao buscar relatórios do aluno:', error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

module.exports = router;