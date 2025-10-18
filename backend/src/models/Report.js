const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  // Identificação do tipo de relatório
  type: {
    type: String,
    required: true,
    enum: ['student-performance', 'class-performance', 'school-performance', 'pomodoro-analytics', 'task-completion', 'flashcard-progress'],
    index: true
  },
  
  // Multi-tenant
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
    index: true
  },
  
  // Usuário que gerou o relatório (opcional)
  generated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Usuário ou turma alvo do relatório
  target: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'targetModel'
  },
  
  targetModel: {
    type: String,
    enum: ['User', 'Class']
  },
  
  // Dados do relatório
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  
  // Período do relatório
  period: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  
  // Metadados
  metadata: {
    generatedAt: {
      type: Date,
      default: Date.now
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para otimização
reportSchema.index({ school_id: 1, type: 1 });
reportSchema.index({ target: 1, type: 1 });
reportSchema.index({ 'period.startDate': 1, 'period.endDate': 1 });
reportSchema.index({ generatedAt: -1 });

// Middleware para atualizar lastUpdated antes de salvar
reportSchema.pre('save', function(next) {
  this.metadata.lastUpdated = Date.now();
  next();
});

// Métodos estáticos para geração de relatórios
reportSchema.statics.generateStudentPerformanceReport = async function(studentId, period) {
  const student = await this.db.model('User').findById(studentId).populate('school_id');
  if (!student) {
    throw new Error('Aluno não encontrado');
  }

  // Obter sessões Pomodoro do aluno
  const pomodoroSessions = await this.db.model('PomodoroSession').find({
    user_id: studentId,
    'timing.started_at': { 
      $gte: period.startDate, 
      $lte: period.endDate 
    }
  });

  // Obter tarefas do aluno
  const tasks = await this.db.model('Task').find({
    'assigned_to.user': studentId,
    createdAt: { 
      $gte: period.startDate, 
      $lte: period.endDate 
    }
  });

  // Calcular métricas
  const totalSessions = pomodoroSessions.length;
  const completedSessions = pomodoroSessions.filter(session => session.status === 'completed').length;
  const totalPomodoroTime = pomodoroSessions.reduce((sum, session) => sum + (session.timing.actual_duration || 0), 0) / 60; // em minutos
  const averageProductivity = pomodoroSessions.reduce((sum, session) => sum + (session.feedback.productivity_rating || 0), 0) / (pomodoroSessions.length || 1);
  const averageFocus = pomodoroSessions.reduce((sum, session) => sum + (session.feedback.focus_rating || 0), 0) / (pomodoroSessions.length || 1);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.getStatusForUser(studentId) === 'completed').length;
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const reportData = {
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      grade: student.academic?.grade || 'N/A'
    },
    period: period,
    pomodoroMetrics: {
      totalSessions,
      completedSessions,
      completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
      totalTimeMinutes: Math.round(totalPomodoroTime),
      averageProductivity: parseFloat(averageProductivity.toFixed(2)),
      averageFocus: parseFloat(averageFocus.toFixed(2)),
      totalInterruptions: pomodoroSessions.reduce((sum, session) => sum + (session.metrics.interruption_count || 0), 0)
    },
    taskMetrics: {
      totalTasks,
      completedTasks,
      completionRate: parseFloat(taskCompletionRate.toFixed(2))
    },
    overallScore: calculateOverallScore(
      totalSessions > 0 ? (completedSessions / totalSessions) : 0,
      taskCompletionRate > 0 ? (taskCompletionRate / 100) : 0,
      averageProductivity,
      averageFocus
    )
  };

  // Criar relatório
  const report = new this({
    type: 'student-performance',
    school_id: student.school_id._id,
    target: studentId,
    targetModel: 'User',
    data: reportData,
    period: period
  });

  return await report.save();
};

// Função auxiliar para calcular pontuação geral
function calculateOverallScore(pomodoroCompletion, taskCompletion, avgProductivity, avgFocus) {
  // Ponderação:
  // - Completude Pomodoro: 25%
  // - Completude Tarefas: 30%
  // - Produtividade: 25%
  // - Foco: 20%
  
  const weightedScore = (pomodoroCompletion * 0.25 * 100) + 
                       (taskCompletion * 0.30 * 100) + 
                       (avgProductivity * 0.25) + 
                       (avgFocus * 0.20);
  
  return Math.min(100, Math.max(0, weightedScore));
}

// Método estático para relatório de turma
reportSchema.statics.generateClassPerformanceReport = async function(classId, period) {
  // Em implementações futuras, adicionaremos suporte a turmas
  throw new Error('Relatórios de turma ainda não implementados');
};

// Método estático para relatório da escola
reportSchema.statics.generateSchoolPerformanceReport = async function(schoolId, period) {
  // Em implementações futuras, adicionaremos suporte a relatórios da escola
  throw new Error('Relatórios da escola ainda não implementados');
};

module.exports = mongoose.model('Report', reportSchema);