const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'test' 
      ? process.env.MONGODB_TEST_URI 
      : process.env.MONGODB_URI;

    const conn = await mongoose.connect(mongoURI, {
      // Opções de conexão recomendadas para MongoDB Atlas
      maxPoolSize: 10, // Mantém até 10 conexões de socket
      serverSelectionTimeoutMS: 5000, // Tempo limite de seleção do servidor
      socketTimeoutMS: 45000, // Fecha soquetes após 45 segundos de inatividade
      // tls: true, // Habilita TLS para conexões com Atlas
      retryWrites: true, // Reescreve tentativas
      // Adicionando mais opções para conexão mais estável
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Event listeners para monitoramento da conexão
    mongoose.connection.on('error', (err) => {
      console.error('❌ Erro de conexão MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB desconectado');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconectado');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔚 Conexão MongoDB fechada devido ao encerramento da aplicação');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    
    // Verificar se o erro está relacionado ao IP não estar na whitelist
    if (error.message.includes('whitelist') || error.message.includes('access')) {
      console.log('\n💡 Para resolver o problema de conexão:');
      console.log('1. Acesse o MongoDB Atlas: https://cloud.mongodb.com');
      console.log('2. Vá para Network Access');
      console.log('3. Adicione seu IP atual à whitelist ou use 0.0.0.0/0 para permitir todos os IPs (não recomendado em produção)');
      console.log('4. Aguarde alguns minutos para as alterações serem aplicadas');
      console.log('5. Tente novamente\n');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;