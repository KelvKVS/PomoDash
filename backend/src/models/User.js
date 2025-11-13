const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Email inválido'
    ]
  },
  
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password obrigatório apenas se não for login Google
    },
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
    select: false // Por padrão não retorna a senha nas consultas
  },
  
  role: {
    type: String,
    enum: {
      values: ['global_admin', 'school_admin', 'teacher', 'student'],
      message: 'Role deve ser: global_admin, school_admin, teacher ou student'
    },
    required: true
  },
  
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: function() {
      return this.role !== 'global_admin';
    }
  },
  
  profile: {
    avatar: String,
    phone: {
      type: String,
      match: [/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXXX-XXXX']
    },
    dateOfBirth: Date,
    bio: {
      type: String,
      maxlength: [500, 'Bio não pode exceder 500 caracteres']
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'light'
      },
      language: {
        type: String,
        enum: ['pt-BR', 'en-US'],
        default: 'pt-BR'
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        pomodoroReminders: { type: Boolean, default: true }
      },
      pomodoroSettings: {
        workTime: {
          type: Number,
          default: 25,
          min: 5,
          max: 60
        },
        shortBreak: {
          type: Number,
          default: 5,
          min: 2,
          max: 15
        },
        longBreak: {
          type: Number,
          default: 30,
          min: 10,
          max: 60
        },
        autoStartBreaks: { type: Boolean, default: false },
        autoStartPomodoros: { type: Boolean, default: false }
      }
    }
  },
  
  // Para estudantes - informações acadêmicas
  academic: {
    studentId: String, // Matrícula
    grade: String,     // Série/Ano
    classes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }]
  },
  
  // Para professores - disciplinas que leciona
  teaching: {
    subjects: [String],
    classes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }]
  },
  
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  
  // OAuth Google
  googleId: String,
  
  // Controle de acesso
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  
  // Verificação de email
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Reset de senha
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Refresh tokens para JWT
  refreshTokens: [{
    token: String,
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date
  }]
  
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.refreshTokens;
      delete ret.emailVerificationToken;
      delete ret.passwordResetToken;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Virtual para verificar se a conta está bloqueada
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Middleware para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Middleware para limpar tokens expirados
userSchema.pre('save', function(next) {
  const now = new Date();
  this.refreshTokens = this.refreshTokens.filter(token => 
    token.expiresAt > now
  );
  next();
});

// Índices para otimização
userSchema.index({ school_id: 1 });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ 'academic.studentId': 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ emailVerificationToken: 1 });
userSchema.index({ passwordResetToken: 1 });

// Índice composto para queries comuns
userSchema.index({ school_id: 1, role: 1, status: 1 });

// Métodos estáticos
userSchema.statics.findBySchool = function(schoolId) {
  return this.find({ school_id: schoolId, status: 'active' });
};

userSchema.statics.findTeachers = function(schoolId) {
  return this.find({ school_id: schoolId, role: 'teacher', status: 'active' });
};

userSchema.statics.findStudents = function(schoolId) {
  return this.find({ school_id: schoolId, role: 'student', status: 'active' });
};

// Métodos de instância
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.incrementLoginAttempts = function() {
  const maxAttempts = 5;
  const lockTime = 30 * 60 * 1000; // 30 minutos

  // Se já está bloqueado e o tempo passou, reset
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // Se atingiu o máximo de tentativas, bloqueia
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime };
  }

  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

userSchema.methods.generateEmailVerificationToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 horas
  
  return token;
};

userSchema.methods.generatePasswordResetToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutos
  
  return token;
};

userSchema.methods.addRefreshToken = function(token, expiresInDays = 30) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);
  
  this.refreshTokens.push({
    token,
    expiresAt
  });
  
  // Manter apenas os últimos 5 tokens
  if (this.refreshTokens.length > 5) {
    this.refreshTokens = this.refreshTokens.slice(-5);
  }
};

userSchema.methods.removeRefreshToken = function(token) {
  this.refreshTokens = this.refreshTokens.filter(t => t.token !== token);
};

module.exports = mongoose.model('User', userSchema);