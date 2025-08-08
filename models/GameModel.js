// GameModel.js - Modelo principal do jogo
class GameModel {
  constructor() {
    this.jogadores = [];
    this.clubeSelecionado = null;
    this.temporada = 2025;
    this.sessao = {
      id: Date.now(),
      dataCriacao: new Date(),
      ultimaSalvamento: new Date()
    };
    
    // Sistema social e psicológico
    this.eventosSociais = [];
    this.noticias = [];
    this.reputacaoClube = 50;
    this.moralMedia = 75;
    
    // Sistema de gestão
    this.financas = {
      orcamento: 0,
      receitas: [],
      despesas: [],
      salarios: 0,
      premios: 0
    };
    
    // Sistema de competições
    this.competicoes = {
      ativas: {},
      historico: {},
      campeoes: {},
      premios: {}
    };
  }

  // Sistema Social e Psicológico
  gerarPerfilSocial(jogador) {
    const origens = ['periferia', 'interior', 'classe_media'];
    const comportamentos = ['disciplinado', 'problematico', 'manipulavel'];
    const sonhos = [
      'ajudar_familia',
      'ser_famoso', 
      'sair_brasil',
      'jogar_europa',
      'ser_campeao'
    ];

    return {
      origem: origens[Math.floor(Math.random() * origens.length)],
      comportamento: comportamentos[Math.floor(Math.random() * comportamentos.length)],
      sonho: sonhos[Math.floor(Math.random() * sonhos.length)],
      historico: {
        faltas: 0,
        noitadas: 0,
        brigas: 0,
        problemas: []
      },
      moral: 75,
      disciplina: Math.floor(Math.random() * 100),
      ambicao: Math.floor(Math.random() * 100),
      lealdade: Math.floor(Math.random() * 100)
    };
  }

  aplicarEventoSocial(jogador, evento) {
    const perfil = jogador.perfilSocial;
    
    switch (evento.tipo) {
      case 'falta_treino':
        perfil.historico.faltas++;
        perfil.moral = Math.max(0, perfil.moral - 10);
        perfil.disciplina = Math.max(0, perfil.disciplina - 5);
        break;
        
      case 'noitada':
        perfil.historico.noitadas++;
        perfil.moral = Math.max(0, perfil.moral - 15);
        perfil.disciplina = Math.max(0, perfil.disciplina - 10);
        break;
        
      case 'briga':
        perfil.historico.brigas++;
        perfil.moral = Math.max(0, perfil.moral - 20);
        this.reputacaoClube = Math.max(0, this.reputacaoClube - 5);
        break;
        
      case 'vitoria':
        perfil.moral = Math.min(100, perfil.moral + 15);
        perfil.lealdade = Math.min(100, perfil.lealdade + 5);
        break;
        
      case 'derrota':
        perfil.moral = Math.max(0, perfil.moral - 10);
        break;
    }
    
    this.eventosSociais.push({
      jogador: jogador.nome,
      evento: evento,
      data: new Date()
    });
  }

  // Sistema de Gestão
  calcularFinancas() {
    const receitas = this.financas.receitas.reduce((sum, r) => sum + r.valor, 0);
    const despesas = this.financas.despesas.reduce((sum, d) => sum + d.valor, 0);
    const salarios = this.jogadores.reduce((sum, j) => sum + j.salario, 0);
    
    this.financas.salarios = salarios;
    this.financas.orcamento = receitas - despesas - salarios;
    
    return {
      receitas,
      despesas,
      salarios,
      orcamento: this.financas.orcamento
    };
  }

  adicionarReceita(valor, descricao) {
    this.financas.receitas.push({
      valor,
      descricao,
      data: new Date()
    });
  }

  adicionarDespesa(valor, descricao) {
    this.financas.despesas.push({
      valor,
      descricao,
      data: new Date()
    });
  }

  // Sistema de Sessões
  salvarSessao() {
    const dados = {
      sessao: this.sessao,
      jogadores: this.jogadores,
      clubeSelecionado: this.clubeSelecionado,
      temporada: this.temporada,
      financas: this.financas,
      competicoes: this.competicoes,
      eventosSociais: this.eventosSociais,
      noticias: this.noticias,
      reputacaoClube: this.reputacaoClube,
      moralMedia: this.moralMedia
    };
    
    localStorage.setItem('onzeVidasFC_sessao', JSON.stringify(dados));
    this.sessao.ultimaSalvamento = new Date();
    
    return true;
  }

  carregarSessao() {
    const dados = localStorage.getItem('onzeVidasFC_sessao');
    if (!dados) return false;
    
    try {
      const sessao = JSON.parse(dados);
      Object.assign(this, sessao);
      return true;
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
      return false;
    }
  }

  // Sistema de Notícias
  gerarNoticia(evento) {
    const manchetes = {
      'falta_treino': [
        `${evento.jogador} falta ao treino pela ${evento.quantidade}ª vez`,
        `Técnico critica ${evento.jogador} após falta`,
        `${evento.jogador} gera polêmica ao faltar treino`
      ],
      'noitada': [
        `${evento.jogador} é flagrado em festa na véspera de jogo`,
        `${evento.jogador} gera polêmica em noitada`,
        `Técnico desabafa sobre ${evento.jogador}: 'É duro treinar um time com tanta dor social'`
      ],
      'briga': [
        `${evento.jogador} se envolve em briga no treino`,
        `${evento.jogador} gera crise no vestiário`,
        `Técnico tem que intervir em briga de ${evento.jogador}`
      ],
      'vitoria': [
        `${evento.jogador} brilha na vitória`,
        `${evento.jogador} é ovacionado pela torcida`,
        `Técnico elogia ${evento.jogador} após vitória`
      ],
      'derrota': [
        `${evento.jogador} é vaiado pela torcida`,
        `Técnico critica ${evento.jogador} após derrota`,
        `${evento.jogador} assume culpa pela derrota`
      ]
    };

    const manchetesDisponiveis = manchetes[evento.tipo] || ['Evento ocorreu no clube'];
    const manchete = manchetesDisponiveis[Math.floor(Math.random() * manchetesDisponiveis.length)];
    
    const noticia = {
      id: Date.now(),
      manchete,
      evento,
      data: new Date(),
      impacto: this.calcularImpactoNoticia(evento)
    };
    
    this.noticias.unshift(noticia);
    this.aplicarImpactoNoticia(noticia);
    
    return noticia;
  }

  calcularImpactoNoticia(evento) {
    const impactos = {
      'falta_treino': -10,
      'noitada': -15,
      'briga': -20,
      'vitoria': 15,
      'derrota': -10
    };
    
    return impactos[evento.tipo] || 0;
  }

  aplicarImpactoNoticia(noticia) {
    // Impacto na moral média
    this.moralMedia = Math.max(0, Math.min(100, this.moralMedia + noticia.impacto * 0.1));
    
    // Impacto na reputação do clube
    if (noticia.impacto < 0) {
      this.reputacaoClube = Math.max(0, this.reputacaoClube + noticia.impacto * 0.2);
    }
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameModel;
} else {
  window.GameModel = GameModel;
} 