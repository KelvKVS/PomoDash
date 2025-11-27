const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });

const User = require('../models/User');
const School = require('../models/School');
const Class = require('../models/Class'); // Adicionando a importação do modelo de turma

const connectDB = async () => {
  try {
    // Tenta conectar usando a URI do .env, com fallback
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI não está definida nas variáveis de ambiente');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Limpar coleções existentes
    await User.deleteMany({});
    await School.deleteMany({});
    await Class.deleteMany({}); // Adicionando limpeza da coleção de turmas

    console.log('Coleções limpas...');

    // Criar a instituição de exemplo
    const school = new School({
      name: 'Escola de Teste',
      slug: 'escola-teste',
      email: 'contato@escolateste.com.br',
      phone: '(83) 99999-8888',
      address: {
        street: 'Av. Exemplo',
        number: '500',
        city: 'João Pessoa',
        state: 'PB',
        neighborhood: 'Centro',
        zipCode: '58000-000'
      },
      status: 'active'
    });

    await school.save();
    console.log('Escola de exemplo criada...');

    // Criar usuário global admin
    const globalAdmin = new User({
      name: 'Administrador Global',
      email: 'admin@pomodash.com',
      password: '123456', // Será hasheada automaticamente pelo middleware
      role: 'global_admin',
      status: 'active',
      emailVerified: true
    });

    await globalAdmin.save();
    console.log('Usuário global admin criado...');

    // Criar usuário admin da escola
    const schoolAdmin = new User({
      name: 'Administrador da Escola',
      email: 'admin@escolateste.com.br',
      password: '123456',
      role: 'school_admin',
      school_id: school._id,
      status: 'active',
      emailVerified: true
    });

    await schoolAdmin.save();
    console.log('Usuário admin da escola criado...');

    // Criar usuário professor
    const teacher = new User({
      name: 'Professor Teste',
      email: 'professor@escolateste.com.br',
      password: '123456',
      role: 'teacher',
      school_id: school._id,
      status: 'active',
      emailVerified: true
    });

    await teacher.save();
    console.log('Usuário professor criado...');

    // Criar usuário aluno
    const student = new User({
      name: 'Aluno Teste',
      email: 'aluno@escolateste.com.br',
      password: '123456',
      role: 'student',
      school_id: school._id,
      status: 'active',
      emailVerified: true
    });

    await student.save();
    console.log('Usuário aluno criado...');

    // Criar turmas de exemplo
    const class1 = new Class({
      name: 'Turma de Exatas',
      subject: 'Matemática',
      description: 'Turma de matemática aplicada',
      academic_year: '2025',
      teacher_id: teacher._id,
      school_id: school._id,
      status: 'active'
    });

    await class1.save();
    console.log('Turma de Exatas criada...');

    const class2 = new Class({
      name: 'Turma de Humanas',
      subject: 'História',
      description: 'Turma de história geral',
      academic_year: '2025',
      teacher_id: teacher._id,
      school_id: school._id,
      status: 'active'
    });

    await class2.save();
    console.log('Turma de Humanas criada...');

    // Adicionar aluno às turmas
    await class1.addStudent(student._id);
    console.log('Aluno adicionado à turma de Exatas...');

    await class2.addStudent(student._id);
    console.log('Aluno adicionado à turma de Humanas...');

    console.log('\nUsuários e turmas de exemplo criados com sucesso!');
    console.log('Credenciais de exemplo:');
    console.log('Global Admin: admin@pomodash.com - senha: 123456');
    console.log('School Admin: admin@escolateste.com.br - senha: 123456');
    console.log('Professor: professor@escolateste.com.br - senha: 123456');
    console.log('Aluno: aluno@escolateste.com.br - senha: 123456');
    console.log('\nTurmas criadas:');
    console.log('Turma de Exatas - Professor: Professor Teste');
    console.log('Turma de Humanas - Professor: Professor Teste');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar dados de exemplo:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();