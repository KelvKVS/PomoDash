const mongoose = require('mongoose');
require('dotenv').config();

// Conectar usando a URI principal do .env
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pomodash';

console.log('Conectando ao banco:', mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', async function() {
  console.log('Conectado ao MongoDB');

  try {
    // Obter nomes das coleções
    const collections = await db.db.listCollections().toArray();
    console.log('Coleções existentes:', collections.map(c => c.name));

    // Contar documentos em cada coleção
    for (const collection of collections) {
      const count = await db.db.collection(collection.name).countDocuments();
      console.log(`${collection.name}: ${count} documentos`);
    }

    // Mostrar os primeiros usuários e turmas
    console.log('\nPrimeiros usuários:');
    const users = await db.db.collection('users').find({}).limit(10).toArray();
    for (const user of users) {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`);
    }

    console.log('\nPrimeiras turmas:');
    const classes = await db.db.collection('classes').find({}).limit(10).toArray();
    for (const cls of classes) {
      console.log(`- ${cls.name} (${cls.code}) - Disciplina: ${cls.subject}`);
    }

    // Fechar conexão
    await mongoose.connection.close();
    console.log('\nConexão fechada');
  } catch (err) {
    console.error('Erro:', err);
    await mongoose.connection.close();
  }
});