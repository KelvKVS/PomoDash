const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

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
      useNewUrlParser: true,
      useUnifiedTopology: true
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

    // Criar a instituição AESA
    const aesaSchool = new School({
      name: 'AESA',
      slug: 'aesa',
      email: 'contato@aesa.edu.br',
      phone: '(83) 99999-8888',
      address: {
        street: 'Av. Universitária',
        number: '1000',
        city: 'João Pessoa',
        state: 'PB',
        neighborhood: 'Centro',
        zipCode: '58000-000'
      },
      status: 'active'
    });

    await aesaSchool.save();
    console.log('Instituição AESA criada...');

    // Criar usuário global admin
    const globalAdmin = new User({
      name: 'Administrador Global',
      email: 'global_admin@aesa.edu.br', // Alterando o email para evitar conflito com o admin da escola
      password: '123456', // Será hasheada automaticamente pelo middleware
      role: 'global_admin',
      status: 'active',
      emailVerified: true
    });

    await globalAdmin.save();
    console.log('Usuário global admin criado...');

    // Criar usuário admin da AESA
    const schoolAdmin = new User({
      name: 'Administrador da AESA',
      email: 'admin@aesa.edu.br',
      password: '123456',
      role: 'school_admin',
      school_id: aesaSchool._id,
      status: 'active',
      emailVerified: true
    });

    await schoolAdmin.save();
    console.log('Usuário admin da AESA criado...');

    // Criar usuário professor
    const teacher = new User({
      name: 'Professor da AESA',
      email: 'professor@aesa.edu.br',
      password: '123456',
      role: 'teacher',
      school_id: aesaSchool._id,
      status: 'active',
      emailVerified: true
    });

    await teacher.save();
    console.log('Usuário professor da AESA criado...');

    // Criar usuário aluno
    const student = new User({
      name: 'Aluno da AESA',
      email: 'aluno@aesa.edu.br',
      password: '123456',
      role: 'student',
      school_id: aesaSchool._id,
      status: 'active',
      emailVerified: true
    });

    await student.save();
    console.log('Usuário aluno da AESA criado...');

    // Criar turmas de exemplo
    const class1 = new Class({
      name: 'Turma de Matemática',
      subject: 'Matemática',
      description: 'Turma de matemática avançada para o 3º ano',
      academic_year: '2025',
      teacher_id: teacher._id,
      school_id: aesaSchool._id,
      code: 'MAT250001', // Código único para a turma
      status: 'active'
    });

    await class1.save();
    console.log('Turma de Matemática criada...');

    const class2 = new Class({
      name: 'Turma de Português',
      subject: 'Português',
      description: 'Turma de português para o 2º ano',
      academic_year: '2025',
      teacher_id: teacher._id,
      school_id: aesaSchool._id,
      code: 'POR250002', // Código único para a turma
      status: 'active'
    });

    await class2.save();
    console.log('Turma de Português criada...');

    // Adicionar aluno à turma
    await class1.addStudent(student._id);
    console.log('Aluno adicionado à turma de Matemática...');

    await class2.addStudent(student._id);
    console.log('Aluno adicionado à turma de Português...');

    console.log('\nUsuários e turmas de exemplo da AESA criados com sucesso!');
    console.log('Credenciais de exemplo:');
    console.log('Global Admin: global_admin@aesa.edu.br - senha: 123456');
    console.log('School Admin: admin@aesa.edu.br - senha: 123456');
    console.log('Professor: professor@aesa.edu.br - senha: 123456');
    console.log('Aluno: aluno@aesa.edu.br - senha: 123456');
    console.log('\nTurmas criadas:');
    console.log('Turma de Matemática - Professor: Professor da AESA');
    console.log('Turma de Português - Professor: Professor da AESA');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar dados de exemplo da AESA:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();