const errorHandler = (err, req, res, next) => {
  console.error('🔴 Erro capturado:', err);

  let error = { ...err };
  error.message = err.message;

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      status: 'error',
      message: 'Erro de validação',
      details: message
    });
  }

  // Erro de cast do Mongoose (ObjectId inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'Recurso não encontrado'
    });
  }

  // Erro de chave duplicada (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Já existe um registro com este ${field}`;
    return res.status(400).json({
      status: 'error',
      message
    });
  }

  // Erro de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expirado'
    });
  }

  // Erro de sintaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'JSON inválido'
    });
  }

  // Erro padrão
  res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;