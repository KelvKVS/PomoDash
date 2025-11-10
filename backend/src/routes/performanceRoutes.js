const express = require('express');
const { param, query, validationResult } = require('express-validator');
const Task = require('../models/Task');
const Class = require('../models/Class');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Middleware de validação
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Dados inválidos', details: errors.array() });
  }
  next();
};

// @route   GET /api/performance/class/:classId
// @desc    Obter desempenho dos alunos de uma turma específica
// @access  Private (professor da turma ou administrador)
router.get('/class/:classId', auth, [
  param('classId').isMongoId(),
], validateRequest, async (req, res) => {
  try {
    const classId = req.params.classId;

    // Verificar se o professor pode acessar esta turma
    let classFilter = { _id: classId };
    
    if (req.user.role === 'teacher') {
      classFilter.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin') {
      classFilter.school_id = req.user.school_id;
    }
    
    const classObj = await Class.findOne(classFilter)
      .populate('students.user_id', 'name email academic.grade');
    
    if (!classObj) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Turma não encontrada ou sem permissão para acessar' 
      });
    }

    // Obter tarefas da turma
    const tasks = await Task.find({
      'assigned_to.user': { $in: classObj.students.map(s => s.user_id) },
      school_id: req.user.school_id,
      createdAt: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Últimos 30 dias
      }
    });

    // Processar dados de desempenho por aluno
    const performanceData = classObj.students.map(student => {
      const studentTasks = tasks.filter(task => 
        task.assigned_to.some(assignment => 
          assignment.user.toString() === student.user_id.toString()
        )
      );

      const completedTasks = studentTasks.filter(task => {
        const assignment = task.assigned_to.find(a => 
          a.user.toString() === student.user_id.toString()
        );
        return assignment && assignment.status === 'completed';
      }).length;

      const avg = studentTasks.length > 0 ? 
        (completedTasks / studentTasks.length) * 100 : 0;

      return {
        student_id: student.user_id._id,
        name: student.user_id.name,
        grade: student.user_id.academic?.grade || 'N/A',
        totalTasks: studentTasks.length,
        completedTasks,
        avg: parseFloat(avg.toFixed(2)),
        lastActivity: studentTasks.length > 0 ? 
          Math.max(...studentTasks.map(t => new Date(t.updatedAt || t.createdAt).getTime())) : null
      };
    });

    res.json({
      status: 'success',
      data: {
        class: {
          id: classObj._id,
          name: classObj.name,
          subject: classObj.subject
        },
        performance: performanceData,
        summary: {
          totalStudents: classObj.students.length,
          totalTasks: tasks.length,
          avgCompletion: tasks.length > 0 ? 
            (tasks.filter(t => 
              t.assigned_to.some(a => a.status === 'completed')
            ).length / tasks.length) * 100 : 0
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar desempenho da turma:', error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/performance/student/:studentId
// @desc    Obter desempenho detalhado de um aluno específico
// @access  Private (professor da turma do aluno ou administrador)
router.get('/student/:studentId', auth, [
  param('studentId').isMongoId(),
], validateRequest, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Verificar se o aluno pertence à escola do professor
    const student = await User.findOne({
      _id: studentId,
      school_id: req.user.school_id,
      role: 'student'
    });

    if (!student) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Aluno não encontrado ou não pertence à sua escola' 
      });
    }

    // Verificar permissão - professor só pode ver aluno se for da sua turma
    if (req.user.role === 'teacher') {
      const studentClasses = student.academic?.classes || [];
      const userClasses = await Class.find({
        _id: { $in: studentClasses },
        teacher_id: req.user._id
      });

      if (userClasses.length === 0) {
        return res.status(403).json({ 
          status: 'error', 
          message: 'Sem permissão para acessar informações deste aluno' 
        });
      }
    }

    // Obter tarefas atribuídas ao aluno
    const tasks = await Task.find({
      'assigned_to.user': studentId,
      school_id: req.user.school_id
    }).sort({ createdAt: -1 });

    // Obter tarefas do aluno nos últimos 30 dias para métricas
    const recentTasks = tasks.filter(task => 
      new Date(task.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    const completedTasks = recentTasks.filter(task => {
      const assignment = task.assigned_to.find(a => 
        a.user.toString() === studentId.toString()
      );
      return assignment && assignment.status === 'completed';
    });

    const avgCompletion = recentTasks.length > 0 ? 
      (completedTasks.length / recentTasks.length) * 100 : 0;

    res.json({
      status: 'success',
      data: {
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          grade: student.academic?.grade || 'N/A'
        },
        performance: {
          totalTasks: tasks.length,
          recentTasks: recentTasks.length,
          completedTasks: completedTasks.length,
          pendingTasks: recentTasks.length - completedTasks.length,
          avgCompletion: parseFloat(avgCompletion.toFixed(2)),
          tasks: recentTasks.map(task => {
            const assignment = task.assigned_to.find(a => 
              a.user.toString() === studentId.toString()
            );
            return {
              id: task._id,
              title: task.title,
              subject: task.subject || 'N/A',
              status: assignment.status,
              assignedAt: assignment.assigned_at,
              completedAt: assignment.completed_at,
              priority: task.priority
            };
          })
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar desempenho do aluno:', error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/performance/teacher/:teacherId
// @desc    Obter desempenho geral das turmas do professor
// @access  Private (professor ou administrador)
router.get('/teacher/:teacherId', auth, [
  param('teacherId').isMongoId(),
], validateRequest, async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Verificar permissões
    if (req.user.role === 'teacher' && req.user._id.toString() !== teacherId.toString()) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'Permissão negada: só pode acessar seu próprio desempenho' 
      });
    }

    if (req.user.role === 'school_admin') {
      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.school_id.toString() !== req.user.school_id.toString() || teacher.role !== 'teacher') {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Professor não encontrado ou não pertence à sua escola' 
        });
      }
    }

    // Obter turmas do professor
    const classes = await Class.find({
      teacher_id: teacherId,
      school_id: req.user.school_id,
      status: { $ne: 'archived' }
    });

    if (classes.length === 0) {
      return res.json({
        status: 'success',
        data: {
          summary: {
            totalClasses: 0,
            totalStudents: 0,
            totalTasks: 0,
            avgCompletion: 0
          },
          classes: []
        }
      });
    }

    // Obter todas as tarefas atribuídas a alunos dessas turmas
    const classIds = classes.map(cls => cls._id);
    const allStudentIds = [];
    
    for (const cls of classes) {
      cls.students.forEach(student => {
        if (student.status === 'active') {
          allStudentIds.push(student.user_id);
        }
      });
    }

    const tasks = await Task.find({
      'assigned_to.user': { $in: allStudentIds },
      school_id: req.user.school_id,
      createdAt: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Últimos 30 dias
      }
    });

    // Calcular métricas gerais
    let totalStudents = 0;
    let totalCompletedTasks = 0;
    let totalTasks = 0;

    const classPerformance = await Promise.all(classes.map(async (cls) => {
      const classStudents = cls.students.filter(s => s.status === 'active');
      totalStudents += classStudents.length;

      const tasksForClass = tasks.filter(task =>
        classStudents.some(student =>
          task.assigned_to.some(assignment => 
            assignment.user.toString() === student.user_id.toString()
          )
        )
      );

      const completedTasks = tasksForClass.filter(task => {
        return task.assigned_to.some(assignment => 
          classStudents.some(s => s.user_id.toString() === assignment.user.toString()) &&
          assignment.status === 'completed'
        );
      });

      const avgCompletion = tasksForClass.length > 0 ? 
        (completedTasks.length / tasksForClass.length) * 100 : 0;

      totalCompletedTasks += completedTasks.length;
      totalTasks += tasksForClass.length;

      return {
        classId: cls._id,
        className: cls.name,
        subject: cls.subject,
        studentCount: classStudents.length,
        totalTasks: tasksForClass.length,
        completedTasks: completedTasks.length,
        avgCompletion: parseFloat(avgCompletion.toFixed(2))
      };
    }));

    const overallAvg = totalTasks > 0 ? (totalCompletedTasks / totalTasks) * 100 : 0;

    res.json({
      status: 'success',
      data: {
        summary: {
          totalClasses: classes.length,
          totalStudents,
          totalTasks,
          avgCompletion: parseFloat(overallAvg.toFixed(2))
        },
        classes: classPerformance
      }
    });
  } catch (error) {
    console.error('Erro ao buscar desempenho do professor:', error);
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

module.exports = router;