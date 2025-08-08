// GameController.js - Controlador principal do jogo
class GameController {
  constructor() {
    this.model = new GameModel();
    this.view = new GameView();
    this.mercadoController = new MercadoController(this.model);
    this.sessaoController = new SessaoController(this.model);
    
    // Estado do jogo
    this.jogoIniciado = false;
    this.telaAtual = 'inicio';
    
    // Sistema de eventos
    this.eventos = [];
    this.notificacoes = [];
    
    console.log('GameController: Inicializado');
  }

  async init() {
    console.log('GameController: Iniciando...');
    
    try {
      // Tentar carregar sessão salva
      if (this.model.carregarSessao()) {
        console.log('Sessão carregada com sucesso');
        this.jogoIniciado = true;
      }
      
      // Inicializar view
      await this.view.init();
      
      // Configurar event listeners
      this.configurarEventListeners();
      
      console.log('GameController: Inicializado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao inicializar GameController:', error);
      return false;
    }
  }

  // Sistema de Gestão Social
  gerenciarJogador(jogadorId, acao) {
    const jogador = this.model.jogadores.find(j => j.id === jogadorId);
    if (!jogador) return { sucesso: false, mensagem: 'Jogador não encontrado' };

    const resultado = {
      sucesso: true,
      mensagem: '',
      impacto: 0
    };

    switch (acao) {
      case 'conversa':
        resultado.mensagem = this.fazerConversa(jogador);
        resultado.impacto = 5;
        break;
        
      case 'presente':
        resultado.mensagem = this.darPresente(jogador);
        resultado.impacto = 10;
        break;
        
      case 'ajuda_familia':
        resultado.mensagem = this.ajudarFamilia(jogador);
        resultado.impacto = 15;
        break;
        
      case 'multa':
        resultado.mensagem = this.aplicarMulta(jogador);
        resultado.impacto = -10;
        break;
        
      case 'suspensao':
        resultado.mensagem = this.suspenderJogador(jogador);
        resultado.impacto = -20;
        break;
    }

    // Aplicar impacto
    if (resultado.impacto !== 0) {
      jogador.perfilSocial.moral = Math.max(0, Math.min(100, 
        jogador.perfilSocial.moral + resultado.impacto
      ));
    }

    // Gerar notícia se impacto significativo
    if (Math.abs(resultado.impacto) >= 10) {
      this.gerarNoticiaSocial(jogador, acao, resultado.impacto);
    }

    return resultado;
  }

  fazerConversa(jogador) {
    const perfil = jogador.perfilSocial;
    const custo = 1000;
    
    if (this.model.financas.orcamento < custo) {
      return 'Orçamento insuficiente para conversa';
    }
    
    this.model.adicionarDespesa(custo, `Conversa com ${jogador.nome}`);
    perfil.disciplina = Math.min(100, perfil.disciplina + 5);
    
    return `Conversa com ${jogador.nome} teve efeito positivo`;
  }

  darPresente(jogador) {
    const perfil = jogador.perfilSocial;
    const custo = 5000;
    
    if (this.model.financas.orcamento < custo) {
      return 'Orçamento insuficiente para presente';
    }
    
    this.model.adicionarDespesa(custo, `Presente para ${jogador.nome}`);
    perfil.moral = Math.min(100, perfil.moral + 10);
    perfil.lealdade = Math.min(100, perfil.lealdade + 5);
    
    return `Presente para ${jogador.nome} melhorou a moral`;
  }

  ajudarFamilia(jogador) {
    const perfil = jogador.perfilSocial;
    const custo = 10000;
    
    if (this.model.financas.orcamento < custo) {
      return 'Orçamento insuficiente para ajudar família';
    }
    
    this.model.adicionarDespesa(custo, `Ajuda à família de ${jogador.nome}`);
    perfil.moral = Math.min(100, perfil.moral + 15);
    perfil.lealdade = Math.min(100, perfil.lealdade + 10);
    
    return `Ajuda à família de ${jogador.nome} fortaleceu o vínculo`;
  }

  aplicarMulta(jogador) {
    const perfil = jogador.perfilSocial;
    const multa = 2000;
    
    this.model.adicionarReceita(multa, `Multa de ${jogador.nome}`);
    perfil.moral = Math.max(0, perfil.moral - 10);
    perfil.disciplina = Math.min(100, perfil.disciplina + 10);
    
    return `Multa aplicada em ${jogador.nome}`;
  }

  suspenderJogador(jogador) {
    const perfil = jogador.perfilSocial;
    perfil.moral = Math.max(0, perfil.moral - 20);
    perfil.disciplina = Math.min(100, perfil.disciplina + 15);
    
    return `${jogador.nome} foi suspenso`;
  }

  // Sistema de Eventos Sociais
  gerarEventoSocial() {
    const jogadores = this.model.jogadores.filter(j => j.clube_atual === this.model.clubeSelecionado?.id);
    if (jogadores.length === 0) return null;

    const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];
    const perfil = jogador.perfilSocial;
    
    const eventos = [
      {
        tipo: 'falta_treino',
        probabilidade: perfil.disciplina < 50 ? 0.3 : 0.1,
        mensagem: `${jogador.nome} falta ao treino`
      },
      {
        tipo: 'noitada',
        probabilidade: perfil.disciplina < 60 ? 0.2 : 0.05,
        mensagem: `${jogador.nome} é flagrado em festa`
      },
      {
        tipo: 'briga',
        probabilidade: perfil.disciplina < 40 ? 0.15 : 0.02,
        mensagem: `${jogador.nome} se envolve em briga`
      }
    ];

    // Escolher evento baseado na probabilidade
    const eventoEscolhido = eventos.find(e => Math.random() < e.probabilidade);
    if (!eventoEscolhido) return null;

    const evento = {
      jogador: jogador.nome,
      tipo: eventoEscolhido.tipo,
      mensagem: eventoEscolhido.mensagem,
      data: new Date()
    };

    this.model.aplicarEventoSocial(jogador, evento);
    this.gerarNoticiaSocial(jogador, evento.tipo, -10);

    return evento;
  }

  gerarNoticiaSocial(jogador, tipo, impacto) {
    const evento = {
      jogador: jogador.nome,
      tipo: tipo,
      impacto: impacto
    };

    const noticia = this.model.gerarNoticia(evento);
    this.notificacoes.push(noticia);
    
    // Atualizar view
    this.view.atualizarNoticias(this.model.noticias);
    this.view.mostrarNotificacao(noticia.manchete, noticia.impacto > 0 ? 'positiva' : 'negativa');
  }

  // Sistema de Gestão do Clube
  gerenciarFinancas(acao, valor, descricao) {
    switch (acao) {
      case 'receita':
        this.model.adicionarReceita(valor, descricao);
        break;
        
      case 'despesa':
        this.model.adicionarDespesa(valor, descricao);
        break;
        
      case 'premio':
        this.model.financas.premios += valor;
        this.model.adicionarDespesa(valor, 'Premiação');
        break;
    }

    const financas = this.model.calcularFinancas();
    this.view.atualizarFinancas(financas);
    
    return financas;
  }

  // Sistema de Negociações
  iniciarNegociacao(jogadorId, clubeOfertante, valor, tipo) {
    return this.mercadoController.iniciarNegociacao(jogadorId, clubeOfertante, valor, tipo);
  }

  aceitarProposta(propostaId) {
    return this.mercadoController.aceitarProposta(propostaId);
  }

  recusarProposta(propostaId) {
    return this.mercadoController.recusarProposta(propostaId);
  }

  // Sistema de Sessões
  salvarJogo() {
    const sucesso = this.model.salvarSessao();
    if (sucesso) {
      this.view.mostrarNotificacao('Jogo salvo com sucesso!', 'positiva');
    }
    return sucesso;
  }

  carregarJogo() {
    const sucesso = this.model.carregarSessao();
    if (sucesso) {
      this.view.atualizarInterface();
      this.view.mostrarNotificacao('Jogo carregado com sucesso!', 'positiva');
    }
    return sucesso;
  }

  novoJogo() {
    this.model = new GameModel();
    this.jogoIniciado = false;
    this.telaAtual = 'inicio';
    this.view.atualizarInterface();
    this.view.mostrarNotificacao('Novo jogo iniciado!', 'positiva');
  }

  // Sistema de Competições
  simularJogo() {
    if (!this.model.clubeSelecionado) {
      this.view.mostrarNotificacao('Selecione um clube primeiro!', 'negativa');
      return null;
    }

    const resultado = this.calcularResultadoJogo();
    this.aplicarResultadoJogo(resultado);
    
    // Gerar evento social baseado no resultado
    if (resultado.vitoria) {
      this.gerarEventoSocialPositivo();
    } else if (resultado.derrota) {
      this.gerarEventoSocialNegativo();
    }

    return resultado;
  }

  calcularResultadoJogo() {
    const jogadores = this.model.jogadores.filter(j => j.clube_atual === this.model.clubeSelecionado.id);
    const forcaTime = this.calcularForcaTime(jogadores);
    const forcaAdversario = Math.floor(Math.random() * 30) + 70;
    
    const golsMarcados = Math.floor(forcaTime / 20) + Math.floor(Math.random() * 3);
    const golsSofridos = Math.floor(forcaAdversario / 20) + Math.floor(Math.random() * 3);
    
    return {
      golsMarcados,
      golsSofridos,
      vitoria: golsMarcados > golsSofridos,
      empate: golsMarcados === golsSofridos,
      derrota: golsMarcados < golsSofridos,
      forcaTime,
      forcaAdversario
    };
  }

  calcularForcaTime(jogadores) {
    if (jogadores.length === 0) return 50;
    
    let forcaTotal = 0;
    jogadores.forEach(jogador => {
      const moral = jogador.perfilSocial?.moral || 75;
      const habilidade = jogador.habilidade || 70;
      const forcaJogador = habilidade * (moral / 100);
      forcaTotal += forcaJogador;
    });
    
    return Math.floor(forcaTotal / jogadores.length);
  }

  aplicarResultadoJogo(resultado) {
    const jogadores = this.model.jogadores.filter(j => j.clube_atual === this.model.clubeSelecionado.id);
    
    jogadores.forEach(jogador => {
      const perfil = jogador.perfilSocial;
      
      if (resultado.vitoria) {
        perfil.moral = Math.min(100, perfil.moral + 10);
        perfil.lealdade = Math.min(100, perfil.lealdade + 5);
      } else if (resultado.derrota) {
        perfil.moral = Math.max(0, perfil.moral - 10);
      } else {
        perfil.moral = Math.max(0, perfil.moral - 2);
      }
    });

    // Atualizar moral média
    this.model.moralMedia = jogadores.reduce((sum, j) => sum + (j.perfilSocial?.moral || 75), 0) / jogadores.length;
  }

  gerarEventoSocialPositivo() {
    const jogadores = this.model.jogadores.filter(j => j.clube_atual === this.model.clubeSelecionado.id);
    if (jogadores.length === 0) return;

    const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];
    const evento = {
      jogador: jogador.nome,
      tipo: 'vitoria',
      mensagem: `${jogador.nome} brilha na vitória`,
      data: new Date()
    };

    this.model.aplicarEventoSocial(jogador, evento);
    this.gerarNoticiaSocial(jogador, 'vitoria', 10);
  }

  gerarEventoSocialNegativo() {
    const jogadores = this.model.jogadores.filter(j => j.clube_atual === this.model.clubeSelecionado.id);
    if (jogadores.length === 0) return;

    const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];
    const evento = {
      jogador: jogador.nome,
      tipo: 'derrota',
      mensagem: `${jogador.nome} é vaiado pela torcida`,
      data: new Date()
    };

    this.model.aplicarEventoSocial(jogador, evento);
    this.gerarNoticiaSocial(jogador, 'derrota', -10);
  }

  // Configuração de Event Listeners
  configurarEventListeners() {
    // Event listeners para botões principais
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-acao]')) {
        const acao = e.target.dataset.acao;
        this.executarAcao(acao, e.target.dataset);
      }
    });

    // Event listeners para formulários
    document.addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target.matches('[data-form]')) {
        const formType = e.target.dataset.form;
        this.processarFormulario(formType, e.target);
      }
    });
  }

  executarAcao(acao, dados) {
    switch (acao) {
      case 'salvar':
        this.salvarJogo();
        break;
        
      case 'carregar':
        this.carregarJogo();
        break;
        
      case 'novo':
        this.novoJogo();
        break;
        
      case 'simular':
        this.simularJogo();
        break;
        
      case 'evento_social':
        this.gerarEventoSocial();
        break;
        
      case 'gerenciar_jogador':
        this.gerenciarJogador(dados.jogadorId, dados.tipo);
        break;
    }
  }

  processarFormulario(tipo, form) {
    const formData = new FormData(form);
    
    switch (tipo) {
      case 'negociacao':
        const jogadorId = formData.get('jogadorId');
        const valor = parseInt(formData.get('valor'));
        const tipoNegociacao = formData.get('tipo');
        this.iniciarNegociacao(jogadorId, this.model.clubeSelecionado, valor, tipoNegociacao);
        break;
        
      case 'financas':
        const acao = formData.get('acao');
        const valorFinancas = parseInt(formData.get('valor'));
        const descricao = formData.get('descricao');
        this.gerenciarFinancas(acao, valorFinancas, descricao);
        break;
    }
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameController;
} else {
  window.GameController = GameController;
} 