import * as XLSX from 'xlsx';

// Função genérica para exportar qualquer dado para Excel
export const exportToExcel = (data, fileName = 'relatorio') => {
  try {
    // Criar uma nova planilha
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Criar um novo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');

    // Exportar o arquivo
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  } catch (error) {
    console.error('Erro ao exportar para Excel:', error);
    throw error;
  }
};

// Função para exportar dados de turmas para Excel
export const exportClassesToExcel = (classes, fileName = 'turmas_professor.xlsx') => {
  try {
    // Preparar os dados para exportação
    const data = classes.map(cls => ({
      'Nome da Turma': cls.name,
      'Matéria': cls.subject,
      'Descrição': cls.description,
      'Data de Início': cls.start_date ? new Date(cls.start_date).toLocaleDateString('pt-BR') : '',
      'Data de Término': cls.end_date ? new Date(cls.end_date).toLocaleDateString('pt-BR') : '',
      'Número de Alunos': cls.students?.length || 0,
      'Criado em': cls.created_at ? new Date(cls.created_at).toLocaleDateString('pt-BR') : ''
    }));

    // Criar uma nova planilha
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 20 }, // Nome da Turma
      { wch: 15 }, // Matéria
      { wch: 30 }, // Descrição
      { wch: 12 }, // Data de Início
      { wch: 12 }, // Data de Término
      { wch: 15 }, // Número de Alunos
      { wch: 15 }  // Criado em
    ];
    ws['!cols'] = colWidths;

    // Criar um novo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Turmas');

    // Exportar o arquivo
    XLSX.writeFile(wb, fileName);
  } catch (error) {
    console.error('Erro ao exportar turmas para Excel:', error);
    throw error;
  }
};

// Função para exportar dados de tarefas para Excel
export const exportTasksToExcel = (tasks, fileName = 'tarefas_professor.xlsx') => {
  try {
    // Preparar os dados para exportação
    const data = tasks.map(task => ({
      'Título': task.title,
      'Matéria': task.subject,
      'Descrição': task.description,
      'Data de Vencimento': task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '',
      'Prioridade': task.priority,
      'Status': task.status || 'Ativo',
      'Alunos Atribuídos': task.assigned_to?.length || 0,
      'Criado em': task.created_at ? new Date(task.created_at).toLocaleDateString('pt-BR') : ''
    }));

    // Criar uma nova planilha
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 25 }, // Título
      { wch: 15 }, // Matéria
      { wch: 30 }, // Descrição
      { wch: 15 }, // Data de Vencimento
      { wch: 10 }, // Prioridade
      { wch: 10 }, // Status
      { wch: 15 }, // Alunos Atribuídos
      { wch: 15 }  // Criado em
    ];
    ws['!cols'] = colWidths;

    // Criar um novo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tarefas');

    // Exportar o arquivo
    XLSX.writeFile(wb, fileName);
  } catch (error) {
    console.error('Erro ao exportar tarefas para Excel:', error);
    throw error;
  }
};

// Função para exportar dados de flashcards para Excel
export const exportFlashcardsToExcel = (flashcards, fileName = 'flashcards_professor.xlsx') => {
  try {
    // Preparar os dados para exportação
    const data = flashcards.map(card => ({
      'Pergunta': card.question,
      'Resposta': card.answer,
      'Matéria': card.subject,
      'Tags': card.tags?.join(', ') || '',
      'Turma': card.class_id ? 'Associado a turma' : 'Não associado',
      'Criado em': card.created_at ? new Date(card.created_at).toLocaleDateString('pt-BR') : ''
    }));

    // Criar uma nova planilha
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 30 }, // Pergunta
      { wch: 30 }, // Resposta
      { wch: 15 }, // Matéria
      { wch: 20 }, // Tags
      { wch: 15 }, // Turma
      { wch: 15 }  // Criado em
    ];
    ws['!cols'] = colWidths;

    // Criar um novo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Flashcards');

    // Exportar o arquivo
    XLSX.writeFile(wb, fileName);
  } catch (error) {
    console.error('Erro ao exportar flashcards para Excel:', error);
    throw error;
  }
};

// Função para exportar dados de desempenho para Excel
export const exportPerformanceToExcel = (performanceData, fileName = 'desempenho_professor.xlsx') => {
  try {
    // Preparar os dados para exportação (exemplo de dados de desempenho)
    const data = [];
    
    // Se for um array de turmas com dados de desempenho
    if (Array.isArray(performanceData)) {
      performanceData.forEach(cls => {
        if (cls.performanceData) {
          data.push({
            'Turma': cls.name,
            'Matéria': cls.subject,
            'Total de Alunos': cls.students?.length || 0,
            'Média de Foco (min)': cls.performanceData.avgFocusTime || 0,
            'Tarefas Concluídas (%)': cls.performanceData.completionRate || 0,
            'Aproveitamento de Flashcards (%)': cls.performanceData.flashcardAccuracy || 0,
            'Data': new Date().toLocaleDateString('pt-BR')
          });
        }
      });
    }
    
    // Criar uma nova planilha
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Ajustar largura das colunas
    const colWidths = [
      { wch: 20 }, // Turma
      { wch: 15 }, // Matéria
      { wch: 15 }, // Total de Alunos
      { wch: 18 }, // Média de Foco
      { wch: 20 }, // Tarefas Concluídas
      { wch: 25 }, // Aproveitamento de Flashcards
      { wch: 12 }  // Data
    ];
    ws['!cols'] = colWidths;

    // Criar um novo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Desempenho');

    // Exportar o arquivo
    XLSX.writeFile(wb, fileName);
  } catch (error) {
    console.error('Erro ao exportar desempenho para Excel:', error);
    throw error;
  }
};