const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Middleware de valida√ß√£o
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Dados inv√°lidos', details: errors.array() });
  }
  next();
};

// @route   GET /api/tasks
// @desc    Listar tarefas
// @access  Private
router.get('/', auth, [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('status').optional().isIn(['pending', 'in_progress', 'completed', 'overdue']),
    query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    query('search').optional().trim(),
], validateRequest, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = { school_id: req.user.school_id, status: { $ne: 'archived' } };

    if (req.user.role === 'student') {
      filter['assigned_to.user'] = req.user._id;
    } else if (req.user.role === 'teacher') {
      filter.$or = [{ created_by: req.user._id }, { 'assigned_to.user': req.user._id }];
    }

    if (priority) filter.priority = priority;
    if (status) filter['assigned_to.status'] = status;

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const tasks = await Task.find(filter)
      .populate('created_by', 'name email')
      .populate('assigned_to.user', 'name email')
      .sort({ due_date: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(filter);

    res.json({ 
        status: 'success', 
        data: tasks, 
        pagination: { page, limit, total, pages: Math.ceil(total / limit) } 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/tasks
// @desc    Criar tarefa
// @access  Private (professores e admins)
router.post('/', auth, [
    body('title').trim().notEmpty(),
    body('assigned_to').optional().isArray(),
    body('assigned_to.*').isMongoId(),
], validateRequest, async (req, res) => {
  try {
    const { title, description, subject, priority, due_date, assigned_to } = req.body;

    const userIds = assigned_to && assigned_to.length > 0 ? assigned_to : [req.user._id];
    const users = await User.find({ _id: { $in: userIds }, school_id: req.user.school_id });
    if (users.length !== userIds.length) {
      return res.status(400).json({ status: 'error', message: 'Um ou mais usu√°rios s√£o inv√°lidos.' });
    }

    const task = new Task({
      ...req.body,
      school_id: req.user.school_id,
      created_by: req.user._id,
      assigned_to: users.map(u => ({ user: u._id, status: 'pending' }))
    });

    await task.save();
    res.status(201).json({ status: 'success', data: task });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/tasks/:id
// @desc    Obter tarefa espec√≠fica
// @access  Private
router.get('/:id', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const filter = { _id: req.params.id, school_id: req.user.school_id };
    if (req.user.role === 'student') {
      filter['assigned_to.user'] = req.user._id;
    }

    const task = await Task.findOne(filter)
      .populate('created_by', 'name')
      .populate('assigned_to.user', 'name');

    if (!task) return res.status(404).json({ status: 'error', message: 'Tarefa n√£o encontrada' });
    res.json({ status: 'success', data: task });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Atualizar tarefa
// @access  Private
router.put('/:id', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const filter = { _id: req.params.id, school_id: req.user.school_id };
    if (req.user.role !== 'school_admin') {
      filter.created_by = req.user._id;
    }

    const task = await Task.findOne(filter);
    if (!task) return res.status(404).json({ status: 'error', message: 'Tarefa n√£o encontrada ou sem permiss√£o para editar' });

    Object.assign(task, req.body);
    await task.save();

    res.json({ status: 'success', data: task });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/tasks/:id/status
// @desc    Atualizar status de uma tarefa para o usu√°rio logado
// @access  Private
router.put('/:id/status', auth, [
    param('id').isMongoId(),
    body('status').isIn(['pending', 'in_progress', 'completed'])
], validateRequest, async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findOne({ _id: req.params.id, school_id: req.user.school_id, 'assigned_to.user': req.user._id });

        if (!task) return res.status(404).json({ status: 'error', message: 'Tarefa n√£o encontrada' });

        await task.updateUserStatus(req.user._id, status);
        
        res.json({ status: 'success', message: 'Status da tarefa atualizado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Arquivar tarefa
// @access  Private (criador ou admin)
router.delete('/:id', auth, [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const filter = { _id: req.params.id, school_id: req.user.school_id };
    if (req.user.role === 'teacher') {
      filter.created_by = req.user._id;
    }

    const task = await Task.findOne(filter);
    if (!task) return res.status(404).json({ status: 'error', message: 'Tarefa n√£o encontrada ou sem permiss√£o para arquivar' });

    task.status = 'archived';
    await task.save();

    res.json({ status: 'success', message: 'Tarefa arquivada com sucesso' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});



module.exports = router;
 
"// @route   GET /api/tasks/teacher/:teacherId"  
"// @desc    Obter tarefas criadas por um professor espec°fico"  
"// @access  Private (professor ou admin da mesma escola)"  
"router.get('/teacher/:teacherId', auth, ["  
"  param('teacherId').isMongoId().withMessage('ID do professor inv†lido')"  
"], validateRequest, async (req, res) => {"  
"  try {"  
"    const { teacherId } = req.params;" 
"    // Verificar permiss‰es"  
"    if (req.user.role === 'teacher' && req.user._id.toString() !== teacherId) {"  
"      return res.status(403).json({ status: 'error', message: 'Permiss∆o negada: s¢ pode acessar suas pr¢prias tarefas' });"  
"    }"  
""  
"    if (req.user.role === 'school_admin') {"  
"      const teacher = await User.findById(teacherId);"  
"      if (!teacher || teacher.school_id.toString() !== req.user.school_id.toString() || teacher.role !== 'teacher') {"  
"        return res.status(404).json({ status: 'error', message: 'Professor n∆o encontrado ou n∆o pertence Ö sua escola' });"  
"      }" 
"    }"  
""  
"    const tasks = await Task.find({"  
"      created_by: teacherId,"  
"      school_id: req.user.school_id"  
"    })"  
"    .populate('created_by', 'name email')"  
"    .populate('assigned_to.user', 'name email')"  
"    .sort({ createdAt: -1 });" 
"    res.json({"  
"      status: 'success',"  
"      data: tasks"  
"    });"  
""  
"  } catch (error) {"  
"    console.error('Erro ao buscar tarefas do professor:', error);"  
"    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });"  
"  }"  
"});" 
