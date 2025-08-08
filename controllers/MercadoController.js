// MercadoController.js - Controlador de mercado e negociações
class MercadoController {
  constructor(model) {
    this.model = model;
    this.negociacoes = [];
    this.propostas = [];
  }

  // Sistema de Negociações
  iniciarNegociacao(jogadorId, clubeOfertante, valor, tipo) {
    const jogador = this.model.jogadores.find(j => j.id === jogadorId);
    if (!jogador) return { sucesso: false, mensagem: 'Jogador não encontrado' };

    const negociacao = {
      id: Date.now(),
      jogadorId: jogadorId,
      clubeOfertante: clubeOfertante,
      clubeDestino: this.model.clubeSelecionado?.id,
      valor: valor,
      tipo: tipo, // 'compra', 'emprestimo', 'dispensa'
      status: 'pendente',
      dataInicio: new Date(),
      prazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      aceitacao: this.calcularAceitacao(jogador, clubeOfertante, valor, tipo)
    };

    this.negociacoes.push(negociacao);
    
    // Gerar notícia sobre a proposta
    this.gerarNoticiaProposta(negociacao);
    
    return negociacao;
  }

  calcularAceitacao(jogador, clubeOfertante, valor, tipo) {
    const perfil = jogador.perfilSocial;
    let probabilidade = 50; // Base 50%

    // Fatores que influenciam a aceitação
    const fatores = {
      // Prestígio do clube
      prestigio: this.calcularPrestigioClube(clubeOfertante),
      
      // Valor da proposta
      valor: this.calcularFatorValor(jogador.valor, valor),
      
      // Personalidade do jogador
      ambicao: perfil?.ambicao || 50,
      lealdade: perfil?.lealdade || 50,
      disciplina: perfil?.disciplina || 50,
      
      // Tipo de negociação
      tipo: this.calcularFatorTipo(tipo),
      
      // Situação atual
      moral: perfil?.moral || 75,
      contrato: this.calcularFatorContrato(jogador)
    };

    // Calcular probabilidade baseada nos fatores
    probabilidade += fatores.prestigio;
    probabilidade += fatores.valor;
    probabilidade += (fatores.ambicao - 50) * 0.2;
    probabilidade -= (fatores.lealdade - 50) * 0.1;
    probabilidade += fatores.tipo;
    probabilidade += (fatores.moral - 75) * 0.1;
    probabilidade += fatores.contrato;

    return Math.max(0, Math.min(100, probabilidade));
  }

  calcularPrestigioClube(clube) {
    if (!clube) return 0;
    
    const prestigioBase = Math.min(100, clube.orcamento / 10000000); // 10M = 100 prestígio
    
    const ajustes = {
      'Flamengo': 20,
      'Palmeiras': 15,
      'São Paulo': 15,
      'Corinthians': 10,
      'Santos': 10,
      'Grêmio': 10,
      'Internacional': 10,
      'Cruzeiro': 5,
      'Atlético-MG': 5
    };
    
    return Math.min(100, prestigioBase + (ajustes[clube.nome] || 0));
  }

  calcularFatorValor(valorMercado, valorProposta) {
    const razao = valorProposta / valorMercado;
    
    if (razao >= 1.5) return 30; // Proposta muito alta
    if (razao >= 1.2) return 20; // Proposta alta
    if (razao >= 1.0) return 10; // Valor de mercado
    if (razao >= 0.8) return -10; // Proposta baixa
    return -30; // Proposta muito baixa
  }

  calcularFatorTipo(tipo) {
    const fatores = {
      'compra': 0,
      'emprestimo': -10,
      'dispensa': -20
    };
    
    return fatores[tipo] || 0;
  }

  calcularFatorContrato(jogador) {
    if (!jogador.contrato) return 0;
    
    const hoje = new Date();
    const fimContrato = new Date(jogador.contrato.fim);
    const mesesRestantes = (fimContrato - hoje) / (1000 * 60 * 60 * 24 * 30);
    
    if (mesesRestantes <= 6) return 20; // Contrato acabando
    if (mesesRestantes <= 12) return 10; // Contrato próximo do fim
    return 0; // Contrato longo
  }

  aceitarProposta(negociacaoId) {
    const negociacao = this.negociacoes.find(n => n.id === negociacaoId);
    if (!negociacao) return { sucesso: false, mensagem: 'Negociação não encontrada' };

    const jogador = this.model.jogadores.find(j => j.id === negociacao.jogadorId);
    if (!jogador) return { sucesso: false, mensagem: 'Jogador não encontrado' };

    // Processar a negociação
    switch (negociacao.tipo) {
      case 'compra':
        return this.processarCompra(negociacao, jogador);
        
      case 'emprestimo':
        return this.processarEmprestimo(negociacao, jogador);
        
      case 'dispensa':
        return this.processarDispensa(negociacao, jogador);
    }

    negociacao.status = 'aceita';
    return { sucesso: true, mensagem: 'Proposta aceita com sucesso' };
  }

  processarCompra(negociacao, jogador) {
    // Verificar se o clube tem dinheiro
    if (this.model.financas.orcamento < negociacao.valor) {
      return { sucesso: false, mensagem: 'Orçamento insuficiente' };
    }

    // Transferir jogador
    jogador.clube_atual = negociacao.clubeDestino;
    
    // Atualizar finanças
    this.model.adicionarDespesa(negociacao.valor, `Compra de ${jogador.nome}`);
    
    // Gerar notícia
    this.gerarNoticiaCompra(negociacao, jogador);
    
    negociacao.status = 'aceita';
    return { sucesso: true, mensagem: `${jogador.nome} foi contratado` };
  }

  processarEmprestimo(negociacao, jogador) {
    // Transferir jogador temporariamente
    jogador.clube_atual = negociacao.clubeDestino;
    jogador.emprestado = true;
    jogador.dataEmprestimo = new Date();
    
    // Gerar notícia
    this.gerarNoticiaEmprestimo(negociacao, jogador);
    
    negociacao.status = 'aceita';
    return { sucesso: true, mensagem: `${jogador.nome} foi emprestado` };
  }

  processarDispensa(negociacao, jogador) {
    // Remover jogador do clube
    jogador.clube_atual = null;
    jogador.dispensado = true;
    jogador.dataDispensa = new Date();
    
    // Gerar notícia
    this.gerarNoticiaDispensa(negociacao, jogador);
    
    negociacao.status = 'aceita';
    return { sucesso: true, mensagem: `${jogador.nome} foi dispensado` };
  }

  recusarProposta(negociacaoId) {
    const negociacao = this.negociacoes.find(n => n.id === negociacaoId);
    if (!negociacao) return { sucesso: false, mensagem: 'Negociação não encontrada' };

    negociacao.status = 'recusada';
    
    // Gerar notícia de recusa
    this.gerarNoticiaRecusa(negociacao);
    
    return { sucesso: true, mensagem: 'Proposta recusada' };
  }

  // Sistema de Notícias de Mercado
  gerarNoticiaProposta(negociacao) {
    const jogador = this.model.jogadores.find(j => j.id === negociacao.jogadorId);
    const noticia = {
      id: Date.now(),
      manchete: `${negociacao.clubeOfertante.nome} faz proposta por ${jogador.nome}`,
      evento: {
        tipo: 'proposta',
        jogador: jogador.nome,
        clube: negociacao.clubeOfertante.nome,
        valor: negociacao.valor
      },
      data: new Date(),
      impacto: 5
    };
    
    this.model.noticias.unshift(noticia);
  }

  gerarNoticiaCompra(negociacao, jogador) {
    const noticia = {
      id: Date.now(),
      manchete: `${jogador.nome} é contratado por ${negociacao.clubeOfertante.nome}`,
      evento: {
        tipo: 'contratacao',
        jogador: jogador.nome,
        clube: negociacao.clubeOfertante.nome,
        valor: negociacao.valor
      },
      data: new Date(),
      impacto: 10
    };
    
    this.model.noticias.unshift(noticia);
  }

  gerarNoticiaEmprestimo(negociacao, jogador) {
    const noticia = {
      id: Date.now(),
      manchete: `${jogador.nome} é emprestado para ${negociacao.clubeOfertante.nome}`,
      evento: {
        tipo: 'emprestimo',
        jogador: jogador.nome,
        clube: negociacao.clubeOfertante.nome
      },
      data: new Date(),
      impacto: 5
    };
    
    this.model.noticias.unshift(noticia);
  }

  gerarNoticiaDispensa(negociacao, jogador) {
    const noticia = {
      id: Date.now(),
      manchete: `${jogador.nome} é dispensado pelo clube`,
      evento: {
        tipo: 'dispensa',
        jogador: jogador.nome
      },
      data: new Date(),
      impacto: -10
    };
    
    this.model.noticias.unshift(noticia);
  }

  gerarNoticiaRecusa(negociacao) {
    const jogador = this.model.jogadores.find(j => j.id === negociacao.jogadorId);
    const noticia = {
      id: Date.now(),
      manchete: `${jogador.nome} recusa proposta de ${negociacao.clubeOfertante.nome}`,
      evento: {
        tipo: 'recusa',
        jogador: jogador.nome,
        clube: negociacao.clubeOfertante.nome
      },
      data: new Date(),
      impacto: -5
    };
    
    this.model.noticias.unshift(noticia);
  }

  // Métodos de consulta
  getNegociacoes() {
    return this.negociacoes.filter(n => n.status === 'pendente');
  }

  getNegociacoesPorClube(clubeId) {
    return this.negociacoes.filter(n => 
      n.clubeDestino === clubeId && n.status === 'pendente'
    );
  }

  getPropostasRecebidas() {
    return this.negociacoes.filter(n => 
      n.clubeDestino === this.model.clubeSelecionado?.id && n.status === 'pendente'
    );
  }

  // Sistema de agentes e empresários
  gerarPropostaAgente(jogador) {
    const agentes = [
      { nome: 'Jorge Mendes', influencia: 90 },
      { nome: 'Pini Zahavi', influencia: 85 },
      { nome: 'Mino Raiola', influencia: 80 },
      { nome: 'Agente Local', influencia: 50 }
    ];

    const agente = agentes[Math.floor(Math.random() * agentes.length)];
    const valorBase = jogador.valor || 1000000;
    const multiplicador = 0.8 + (Math.random() * 0.4); // 0.8 a 1.2
    const valorProposta = Math.floor(valorBase * multiplicador);

    const proposta = {
      id: Date.now(),
      jogadorId: jogador.id,
      agente: agente.nome,
      influencia: agente.influencia,
      valor: valorProposta,
      data: new Date(),
      status: 'pendente'
    };

    this.propostas.push(proposta);
    return proposta;
  }

  processarPropostaAgente(propostaId, acao) {
    const proposta = this.propostas.find(p => p.id === propostaId);
    if (!proposta) return { sucesso: false, mensagem: 'Proposta não encontrada' };

    const jogador = this.model.jogadores.find(j => j.id === proposta.jogadorId);
    if (!jogador) return { sucesso: false, mensagem: 'Jogador não encontrado' };

    if (acao === 'aceitar') {
      // Aplicar influência do agente
      const bonusInfluencia = proposta.influencia * 0.01;
      jogador.perfilSocial.moral = Math.min(100, jogador.perfilSocial.moral + bonusInfluencia);
      
      proposta.status = 'aceita';
      return { sucesso: true, mensagem: `Proposta de ${proposta.agente} aceita` };
    } else {
      proposta.status = 'recusada';
      return { sucesso: true, mensagem: `Proposta de ${proposta.agente} recusada` };
    }
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MercadoController;
} else {
  window.MercadoController = MercadoController;
}
