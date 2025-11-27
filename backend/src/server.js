require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

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
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// ⭐ ADICIONADO - Configuração do Trust Proxy para Deploy no Render
// Configuração para confiar em proxies (essencial para deploys em plataformas como Render)
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.set('trust proxy', 1);
} else {
  // Em desenvolvimento, pode ser útil definir o número esperado de proxies
  app.set('trust proxy', 1);
}

// Conectar ao banco de dados com tratamento de erro
connectDB().catch(err => {
  console.error('⚠️ Falha na conexão com o banco de dados:', err.message);
  console.error('⚠️ O servidor continuará rodando, mas funcionalidades que requerem banco de dados não estarão disponíveis');
});

// Middleware de segurança
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Muitas requisições feitas. Tente novamente em alguns minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Opções para trabalhar corretamente com proxies
  trustProxy: true,
});

app.use('/api', limiter);

// Definir origens permitidas para CORS
const allowedOrigins = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging')
  ? [
      'https://pomo-dash-khaki.vercel.app', // Frontend no Vercel
      'https://vercel.com/kelvins-projects-9346729f/pomo-dash/GixDu8R1C8NcrGDSBrv4btiwQiDC', // Branch main do Vercel
      process.env.FRONTEND_URL // URL do frontend do .env
    ].filter(Boolean) // Filtra valores que não são null/undefined
  : [
      'http://localhost:5173', // Vite default
      'http://localhost:3001', // React default
      process.env.FRONTEND_URL // URL do frontend do .env
    ].filter(Boolean); // Filtra valores que não são null/undefined

// Configuração do CORS
const corsOptions = {
  origin: function(origin, callback) {
    // Permite requisições sem origin (Postman, apps mobile, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política CORS não permite acesso deste domínio.';
      console.log('CORS blocked:', origin); // Log para debug
      return callback(new Error(msg), false);
    }
    console.log('CORS allowed:', origin); // Log para debug
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-HTTP-Method-Override', 'Accept', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials']
};

app.use(cors(corsOptions));

// Middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para adicionar tenant_id às requisições, mas exceto para autenticação
app.use('/api', (req, res, next) => {
  // Pular o middleware de tenant_id para rotas de autenticação (login, register, etc.)
  // req.path já é relativo ao prefixo '/api', então '/api/auth/login' se torna '/auth/login'
  if (req.path.startsWith('/auth/')) {
    return next();
  }
  // O tenant_id virá do JWT ou header personalizado
  req.tenant_id = req.headers['x-tenant-id'] || req.user?.school_id;
  next();
});

// Servir arquivos estáticos da pasta uploads com CORS habilitado
app.use('/uploads', (req, res, next) => {
  // Permitir acesso de qualquer origem para arquivos estáticos
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, '../uploads')));

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
app.use('/api/upload', uploadRoutes);

// Rota de debug temporária
app.post('/debug', (req, res) => {
  console.log('🔍 Debug - Headers:', req.headers);
  console.log('🔍 Debug - Body:', req.body);
  console.log('🔍 Debug - Query:', req.query);
  res.json({
    status: 'success',
    message: 'Debug endpoint reached',
    headers: req.headers,
    body: req.body,
    query: req.query
  });
});

// Log para debug das rotas
console.log('Rotas montadas:');
console.log('- /api/auth (authRoutes)');
console.log('- /api/schools (schoolRoutes)');
console.log('- /api/users (userRoutes)');
console.log('- /api/tasks (taskRoutes)');
console.log('- /api/pomodoro (pomodoroRoutes)');
console.log('- /api/flashcards (flashcardRoutes)');
console.log('- /api/reports (reportRoutes)');
console.log('- /api/classes (classRoutes)');
console.log('- /api/performance (performanceRoutes)');
console.log('- /api/upload (uploadRoutes)');
console.log('- /uploads (arquivos estáticos)');

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