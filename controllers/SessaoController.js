// SessaoController.js - Controlador de sessões e salvamento
class SessaoController {
  constructor(model) {
    this.model = model;
    this.sessoes = [];
    this.sessaoAtual = null;
  }

  // Sistema de Sessões
  salvarSessao(nome = null) {
    const dados = {
      id: Date.now(),
      nome: nome || `Sessão ${new Date().toLocaleDateString()}`,
      dataCriacao: this.model.sessao.dataCriacao,
      ultimaSalvamento: new Date(),
      dados: {
        jogadores: this.model.jogadores,
        clubeSelecionado: this.model.clubeSelecionado,
        temporada: this.model.temporada,
        financas: this.model.financas,
        competicoes: this.model.competicoes,
        eventosSociais: this.model.eventosSociais,
        noticias: this.model.noticias,
        reputacaoClube: this.model.reputacaoClube,
        moralMedia: this.model.moralMedia
      }
    };

    // Salvar no localStorage
    const chave = `onzeVidasFC_sessao_${dados.id}`;
    localStorage.setItem(chave, JSON.stringify(dados));
    
    // Atualizar sessão atual
    this.sessaoAtual = dados;
    
    // Atualizar lista de sessões
    this.atualizarListaSessoes();
    
    return dados;
  }

  carregarSessao(sessaoId) {
    const chave = `onzeVidasFC_sessao_${sessaoId}`;
    const dados = localStorage.getItem(chave);
    
    if (!dados) {
      return { sucesso: false, mensagem: 'Sessão não encontrada' };
    }

    try {
      const sessao = JSON.parse(dados);
      
      // Restaurar dados do modelo
      this.model.jogadores = sessao.dados.jogadores || [];
      this.model.clubeSelecionado = sessao.dados.clubeSelecionado;
      this.model.temporada = sessao.dados.temporada || 2025;
      this.model.financas = sessao.dados.financas || { orcamento: 0, receitas: [], despesas: [] };
      this.model.competicoes = sessao.dados.competicoes || { ativas: {}, historico: {} };
      this.model.eventosSociais = sessao.dados.eventosSociais || [];
      this.model.noticias = sessao.dados.noticias || [];
      this.model.reputacaoClube = sessao.dados.reputacaoClube || 50;
      this.model.moralMedia = sessao.dados.moralMedia || 75;
      
      // Atualizar sessão atual
      this.sessaoAtual = sessao;
      
      return { sucesso: true, mensagem: 'Sessão carregada com sucesso', sessao };
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
      return { sucesso: false, mensagem: 'Erro ao carregar sessão' };
    }
  }

  excluirSessao(sessaoId) {
    const chave = `onzeVidasFC_sessao_${sessaoId}`;
    localStorage.removeItem(chave);
    
    // Atualizar lista de sessões
    this.atualizarListaSessoes();
    
    return { sucesso: true, mensagem: 'Sessão excluída com sucesso' };
  }

  listarSessoes() {
    const sessoes = [];
    
    // Buscar todas as sessões no localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (chave && chave.startsWith('onzeVidasFC_sessao_')) {
        try {
          const dados = JSON.parse(localStorage.getItem(chave));
          sessoes.push({
            id: dados.id,
            nome: dados.nome,
            dataCriacao: new Date(dados.dataCriacao),
            ultimaSalvamento: new Date(dados.ultimaSalvamento),
            clube: dados.dados.clubeSelecionado?.nome || 'Nenhum',
            temporada: dados.dados.temporada || 2025
          });
        } catch (error) {
          console.error('Erro ao ler sessão:', chave, error);
        }
      }
    }
    
    // Ordenar por data de salvamento (mais recente primeiro)
    sessoes.sort((a, b) => b.ultimaSalvamento - a.ultimaSalvamento);
    
    this.sessoes = sessoes;
    return sessoes;
  }

  atualizarListaSessoes() {
    this.listarSessoes();
  }

  // Sistema de Backup
  criarBackup() {
    const backup = {
      id: Date.now(),
      data: new Date(),
      dados: {
        jogadores: this.model.jogadores,
        clubeSelecionado: this.model.clubeSelecionado,
        temporada: this.model.temporada,
        financas: this.model.financas,
        competicoes: this.model.competicoes,
        eventosSociais: this.model.eventosSociais,
        noticias: this.model.noticias,
        reputacaoClube: this.model.reputacaoClube,
        moralMedia: this.model.moralMedia
      }
    };

    const chave = `onzeVidasFC_backup_${backup.id}`;
    localStorage.setItem(chave, JSON.stringify(backup));
    
    return backup;
  }

  restaurarBackup(backupId) {
    const chave = `onzeVidasFC_backup_${backupId}`;
    const dados = localStorage.getItem(chave);
    
    if (!dados) {
      return { sucesso: false, mensagem: 'Backup não encontrado' };
    }

    try {
      const backup = JSON.parse(dados);
      
      // Restaurar dados do backup
      this.model.jogadores = backup.dados.jogadores || [];
      this.model.clubeSelecionado = backup.dados.clubeSelecionado;
      this.model.temporada = backup.dados.temporada || 2025;
      this.model.financas = backup.dados.financas || { orcamento: 0, receitas: [], despesas: [] };
      this.model.competicoes = backup.dados.competicoes || { ativas: {}, historico: {} };
      this.model.eventosSociais = backup.dados.eventosSociais || [];
      this.model.noticias = backup.dados.noticias || [];
      this.model.reputacaoClube = backup.dados.reputacaoClube || 50;
      this.model.moralMedia = backup.dados.moralMedia || 75;
      
      return { sucesso: true, mensagem: 'Backup restaurado com sucesso', backup };
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      return { sucesso: false, mensagem: 'Erro ao restaurar backup' };
    }
  }

  listarBackups() {
    const backups = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (chave && chave.startsWith('onzeVidasFC_backup_')) {
        try {
          const dados = JSON.parse(localStorage.getItem(chave));
          backups.push({
            id: dados.id,
            data: new Date(dados.data),
            clube: dados.dados.clubeSelecionado?.nome || 'Nenhum',
            temporada: dados.dados.temporada || 2025
          });
        } catch (error) {
          console.error('Erro ao ler backup:', chave, error);
        }
      }
    }
    
    backups.sort((a, b) => b.data - a.data);
    return backups;
  }

  // Sistema de Exportação/Importação
  exportarSessao(sessaoId) {
    const chave = `onzeVidasFC_sessao_${sessaoId}`;
    const dados = localStorage.getItem(chave);
    
    if (!dados) {
      return { sucesso: false, mensagem: 'Sessão não encontrada' };
    }

    try {
      const sessao = JSON.parse(dados);
      const dadosExportacao = {
        versao: '1.0',
        dataExportacao: new Date(),
        sessao: sessao
      };

      const blob = new Blob([JSON.stringify(dadosExportacao, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `onzeVidasFC_${sessao.nome}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return { sucesso: true, mensagem: 'Sessão exportada com sucesso' };
    } catch (error) {
      console.error('Erro ao exportar sessão:', error);
      return { sucesso: false, mensagem: 'Erro ao exportar sessão' };
    }
  }

  importarSessao(arquivo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const dados = JSON.parse(e.target.result);
          
          if (!dados.versao || !dados.sessao) {
            reject({ sucesso: false, mensagem: 'Arquivo inválido' });
            return;
          }

          // Validar dados da sessão
          if (!dados.sessao.dados) {
            reject({ sucesso: false, mensagem: 'Dados da sessão inválidos' });
            return;
          }

          // Salvar sessão importada
          const sessaoImportada = {
            ...dados.sessao,
            id: Date.now(),
            dataCriacao: new Date(),
            ultimaSalvamento: new Date()
          };

          const chave = `onzeVidasFC_sessao_${sessaoImportada.id}`;
          localStorage.setItem(chave, JSON.stringify(sessaoImportada));
          
          this.atualizarListaSessoes();
          
          resolve({ sucesso: true, mensagem: 'Sessão importada com sucesso', sessao: sessaoImportada });
        } catch (error) {
          console.error('Erro ao importar sessão:', error);
          reject({ sucesso: false, mensagem: 'Erro ao importar sessão' });
        }
      };

      reader.onerror = () => {
        reject({ sucesso: false, mensagem: 'Erro ao ler arquivo' });
      };

      reader.readAsText(arquivo);
    });
  }

  // Sistema de Limpeza
  limparSessoesAntigas(dias = 30) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);
    
    let sessoesRemovidas = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (chave && chave.startsWith('onzeVidasFC_sessao_')) {
        try {
          const dados = JSON.parse(localStorage.getItem(chave));
          const dataSalvamento = new Date(dados.ultimaSalvamento);
          
          if (dataSalvamento < dataLimite) {
            localStorage.removeItem(chave);
            sessoesRemovidas++;
          }
        } catch (error) {
          console.error('Erro ao verificar sessão:', chave, error);
        }
      }
    }
    
    this.atualizarListaSessoes();
    
    return { sucesso: true, mensagem: `${sessoesRemovidas} sessões antigas removidas` };
  }

  // Sistema de Estatísticas
  getEstatisticasSessao(sessaoId) {
    const chave = `onzeVidasFC_sessao_${sessaoId}`;
    const dados = localStorage.getItem(chave);
    
    if (!dados) {
      return null;
    }

    try {
      const sessao = JSON.parse(dados);
      const dadosSessao = sessao.dados;
      
      return {
        id: sessao.id,
        nome: sessao.nome,
        dataCriacao: new Date(sessao.dataCriacao),
        ultimaSalvamento: new Date(sessao.ultimaSalvamento),
        clube: dadosSessao.clubeSelecionado?.nome || 'Nenhum',
        temporada: dadosSessao.temporada || 2025,
        totalJogadores: dadosSessao.jogadores?.length || 0,
        orcamento: dadosSessao.financas?.orcamento || 0,
        reputacao: dadosSessao.reputacaoClube || 50,
        moralMedia: dadosSessao.moralMedia || 75,
        totalNoticias: dadosSessao.noticias?.length || 0,
        totalEventos: dadosSessao.eventosSociais?.length || 0
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas da sessão:', error);
      return null;
    }
  }

  // Métodos de utilidade
  formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatarTamanho(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  getTamanhoSessao(sessaoId) {
    const chave = `onzeVidasFC_sessao_${sessaoId}`;
    const dados = localStorage.getItem(chave);
    return dados ? this.formatarTamanho(new Blob([dados]).size) : '0 Bytes';
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SessaoController;
} else {
  window.SessaoController = SessaoController;
}
