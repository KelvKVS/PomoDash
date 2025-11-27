const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth');

// Criar pasta de uploads se não existir
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Gerar nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Filtro de tipos de arquivo permitidos
const fileFilter = (req, file, cb) => {
  // Tipos permitidos
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'application/zip',
    'application/x-rar-compressed'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Tipos aceitos: imagens, PDF, documentos Office, texto e arquivos compactados.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limite de 10MB
  }
});

// @route   POST /api/upload
// @desc    Upload de arquivo único
// @access  Private
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Nenhum arquivo enviado'
      });
    }

    // Construir URL do arquivo
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({
      status: 'success',
      message: 'Arquivo enviado com sucesso',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao fazer upload do arquivo'
    });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload de múltiplos arquivos
// @access  Private
router.post('/multiple', auth, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Nenhum arquivo enviado'
      });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `${baseUrl}/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      status: 'success',
      message: `${uploadedFiles.length} arquivo(s) enviado(s) com sucesso`,
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Erro no upload múltiplo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao fazer upload dos arquivos'
    });
  }
});

// @route   DELETE /api/upload/:filename
// @desc    Deletar arquivo
// @access  Private
router.delete('/:filename', auth, async (req, res) => {
  try {
    const filepath = path.join(uploadDir, req.params.filename);
    
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        status: 'error',
        message: 'Arquivo não encontrado'
      });
    }

    fs.unlinkSync(filepath);

    res.json({
      status: 'success',
      message: 'Arquivo deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao deletar arquivo'
    });
  }
});

// Middleware de tratamento de erros do multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'Arquivo muito grande. Tamanho máximo: 10MB'
      });
    }
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
  
  next();
});

module.exports = router;

