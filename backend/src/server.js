require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const pomodoroRoutes = require('./routes/pomodoroRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const reportRoutes = require('./routes/reportRoutes');
const classRoutes = require('./routes/classRoutes');
const performanceRoutes = require('./routes/performanceRoutes');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware de segurança
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Muitas requisições feitas. Tente novamente em alguns minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL] 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para adicionar tenant_id às requisições
app.use('/api', (req, res, next) => {
  // O tenant_id virá do JWT ou header personalizado
  req.tenant_id = req.headers['x-tenant-id'] || req.user?.school_id;
  next();
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/performance', performanceRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Pomodash API está funcionando!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Rota para 404
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Rota ${req.originalUrl} não encontrada`
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recebido');
  server.close(() => {
    console.log('🔚 Processo finalizado');
  });
});

module.exports = app;