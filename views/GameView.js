// GameView.js - View principal do jogo
class GameView {
  constructor() {
    this.elementos = {};
    this.notificacoes = [];
    this.telaAtual = 'inicio';
  }

  async init() {
    console.log('GameView: Inicializando...');
    
    try {
      // Mapear elementos importantes
      this.mapearElementos();
      
      // Configurar templates
      this.configurarTemplates();
      
      // Configurar estilos dinâmicos
      this.configurarEstilos();
      
      console.log('GameView: Inicializada com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao inicializar GameView:', error);
      return false;
    }
  }

  mapearElementos() {
    this.elementos = {
      // Telas principais
      telaInicio: document.getElementById('tela-inicio'),
      telaJogo: document.getElementById('jogo-principal'),
      telaClubes: document.getElementById('tela-time'),
      
      // Seções do jogo
      elenco: document.getElementById('elenco-grid'),
      mercado: document.getElementById('mercado-lista'),
      financas: document.getElementById('financas-container'),
      escalacao: document.getElementById('escalacao-container'),
      
      // Sistema social
      noticias: document.getElementById('imprensa-noticias'),
      eventos: document.getElementById('eventos-sociais'),
      moral: document.getElementById('moral-media'),
      reputacao: document.getElementById('reputacao-clube'),
      
      // Menus
      menuPrincipal: document.querySelector('.menu-principal'),
      submenus: document.querySelectorAll('.submenu')
    };
  }

  configurarTemplates() {
    // Template para jogador com perfil social
    this.templates = {
      jogador: (jogador) => `
        <div class="jogador-card ${jogador.perfilSocial?.comportamento || 'normal'}" data-id="${jogador.id}">
          <div class="card-header">
            <div class="card-number">${jogador.id}</div>
            <div class="card-position">${jogador.posicao}</div>
            <div class="card-moral ${this.getClassMoral(jogador.perfilSocial?.moral || 75)}">
              ${jogador.perfilSocial?.moral || 75}
            </div>
          </div>
          
          <div class="card-photo">
            <div class="player-avatar">👤</div>
            <div class="player-rating">${jogador.habilidade}</div>
          </div>
          
          <div class="card-name">${jogador.nome}</div>
          
          <div class="card-social">
            <div class="social-origem">${jogador.perfilSocial?.origem || 'N/A'}</div>
            <div class="social-comportamento">${jogador.perfilSocial?.comportamento || 'N/A'}</div>
            <div class="social-sonho">${jogador.perfilSocial?.sonho || 'N/A'}</div>
          </div>
          
          <div class="card-stats">
            <div class="stat-item">
              <span class="stat-label">Idade</span>
              <span class="stat-value">${jogador.idade}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Disciplina</span>
              <span class="stat-value">${jogador.perfilSocial?.disciplina || 50}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Ambição</span>
              <span class="stat-value">${jogador.perfilSocial?.ambicao || 50}</span>
            </div>
          </div>
          
          <div class="card-actions">
            <button onclick="window.gameController.gerenciarJogador(${jogador.id}, 'conversa')" class="btn-social conversa">
              💬 Conversa
            </button>
            <button onclick="window.gameController.gerenciarJogador(${jogador.id}, 'presente')" class="btn-social presente">
              🎁 Presente
            </button>
            <button onclick="window.gameController.gerenciarJogador(${jogador.id}, 'ajuda_familia')" class="btn-social ajuda">
              👨‍👩‍👧‍👦 Ajuda Família
            </button>
            <button onclick="window.gameController.gerenciarJogador(${jogador.id}, 'multa')" class="btn-social multa">
              ⚖️ Multa
            </button>
            <button onclick="window.gameController.gerenciarJogador(${jogador.id}, 'suspensao')" class="btn-social suspensao">
              🚫 Suspender
            </button>
          </div>
        </div>
      `,
      
      noticia: (noticia) => `
        <div class="noticia-item noticia-${noticia.evento?.tipo || 'geral'}">
          <div class="noticia-header">
            <span class="noticia-tipo">${this.getIconeNoticia(noticia.evento?.tipo)}</span>
            <span class="noticia-data">${new Date(noticia.data).toLocaleDateString()}</span>
          </div>
          <div class="noticia-manchete">${noticia.manchete}</div>
          <div class="noticia-impacto ${noticia.impacto > 0 ? 'positivo' : 'negativo'}">
            Impacto: ${noticia.impacto > 0 ? '+' : ''}${noticia.impacto}
          </div>
        </div>
      `,
      
      evento: (evento) => `
        <div class="evento-item evento-${evento.tipo}">
          <div class="evento-header">
            <span class="evento-tipo">${this.getIconeEvento(evento.tipo)}</span>
            <span class="evento-data">${new Date(evento.data).toLocaleDateString()}</span>
          </div>
          <div class="evento-mensagem">${evento.mensagem}</div>
          <div class="evento-jogador">${evento.jogador}</div>
        </div>
      `,
      
      financas: (financas) => `
        <div class="financas-container">
          <div class="financa-item">
            <span class="financa-label">Orçamento:</span>
            <span class="financa-valor ${financas.orcamento >= 0 ? 'positivo' : 'negativo'}">
              ${this.formatarMoeda(financas.orcamento)}
            </span>
          </div>
          <div class="financa-item">
            <span class="financa-label">Receitas:</span>
            <span class="financa-valor positivo">${this.formatarMoeda(financas.receitas)}</span>
          </div>
          <div class="financa-item">
            <span class="financa-label">Despesas:</span>
            <span class="financa-valor negativo">${this.formatarMoeda(financas.despesas)}</span>
          </div>
          <div class="financa-item">
            <span class="financa-label">Salários:</span>
            <span class="financa-valor negativo">${this.formatarMoeda(financas.salarios)}</span>
          </div>
        </div>
      `
    };
  }

  configurarEstilos() {
    // Adicionar estilos dinâmicos para comportamentos
    const estilos = `
      <style>
        .jogador-card.problematico {
          border-left: 4px solid #e74c3c;
          background: linear-gradient(135deg, #fff5f5, #fed7d7);
        }
        
        .jogador-card.disciplinado {
          border-left: 4px solid #27ae60;
          background: linear-gradient(135deg, #f0fff4, #c6f6d5);
        }
        
        .jogador-card.manipulavel {
          border-left: 4px solid #f39c12;
          background: linear-gradient(135deg, #fffaf0, #feebc8);
        }
        
        .card-moral.alta { color: #27ae60; }
        .card-moral.media { color: #f39c12; }
        .card-moral.baixa { color: #e74c3c; }
        
        .btn-social {
          padding: 4px 8px;
          margin: 2px;
          border: none;
          border-radius: 4px;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-social.conversa { background: #3498db; color: white; }
        .btn-social.presente { background: #9b59b6; color: white; }
        .btn-social.ajuda { background: #27ae60; color: white; }
        .btn-social.multa { background: #e67e22; color: white; }
        .btn-social.suspensao { background: #e74c3c; color: white; }
        
        .btn-social:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .social-origem {
          font-size: 10px;
          color: #6c757d;
          font-style: italic;
        }
        
        .social-comportamento {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .social-sonho {
          font-size: 10px;
          color: #495057;
        }
        
        .notificacao {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          max-width: 400px;
          animation: slideIn 0.5s ease;
        }
        
        .notificacao.positiva {
          background: #d4edda;
          border-left: 4px solid #27ae60;
          color: #155724;
        }
        
        .notificacao.negativa {
          background: #f8d7da;
          border-left: 4px solid #e74c3c;
          color: #721c24;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', estilos);
  }

  // Métodos de renderização
  renderizarElenco(jogadores) {
    if (!this.elementos.elenco) return;
    
    this.elementos.elenco.innerHTML = '';
    jogadores.forEach(jogador => {
      const jogadorElement = document.createElement('div');
      jogadorElement.innerHTML = this.templates.jogador(jogador);
      this.elementos.elenco.appendChild(jogadorElement.firstElementChild);
    });
  }

  renderizarNoticias(noticias) {
    if (!this.elementos.noticias) return;
    
    this.elementos.noticias.innerHTML = '';
    noticias.slice(0, 10).forEach(noticia => {
      const noticiaElement = document.createElement('div');
      noticiaElement.innerHTML = this.templates.noticia(noticia);
      this.elementos.noticias.appendChild(noticiaElement.firstElementChild);
    });
  }

  renderizarEventos(eventos) {
    if (!this.elementos.eventos) return;
    
    this.elementos.eventos.innerHTML = '';
    eventos.slice(0, 10).forEach(evento => {
      const eventoElement = document.createElement('div');
      eventoElement.innerHTML = this.templates.evento(evento);
      this.elementos.eventos.appendChild(eventoElement.firstElementChild);
    });
  }

  renderizarFinancas(financas) {
    if (!this.elementos.financas) return;
    
    this.elementos.financas.innerHTML = this.templates.financas(financas);
  }

  // Métodos de atualização
  atualizarInterface() {
    // Atualizar todas as seções
    this.atualizarElenco();
    this.atualizarNoticias();
    this.atualizarEventos();
    this.atualizarFinancas();
    this.atualizarEstatisticas();
  }

  atualizarElenco() {
    // Será implementado pelo controller
  }

  atualizarNoticias(noticias) {
    this.renderizarNoticias(noticias || []);
  }

  atualizarEventos(eventos) {
    this.renderizarEventos(eventos || []);
  }

  atualizarFinancas(financas) {
    this.renderizarFinancas(financas || {});
  }

  atualizarEstatisticas() {
    // Atualizar moral média e reputação
    if (this.elementos.moral) {
      this.elementos.moral.textContent = Math.round(window.gameController?.model?.moralMedia || 75);
    }
    
    if (this.elementos.reputacao) {
      this.elementos.reputacao.textContent = Math.round(window.gameController?.model?.reputacaoClube || 50);
    }
  }

  // Sistema de notificações
  mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.innerHTML = `
      <div class="notificacao-conteudo">
        <div class="notificacao-mensagem">${mensagem}</div>
        <button class="notificacao-fechar" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;
    
    document.body.appendChild(notificacao);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
      if (notificacao.parentElement) {
        notificacao.remove();
      }
    }, 5000);
  }

  // Métodos auxiliares
  getClassMoral(moral) {
    if (moral >= 80) return 'alta';
    if (moral >= 60) return 'media';
    return 'baixa';
  }

  getIconeNoticia(tipo) {
    const icones = {
      'falta_treino': '⚠️',
      'noitada': '🍺',
      'briga': '👊',
      'vitoria': '⚽',
      'derrota': '😞',
      'contratacao': '💰',
      'venda': '💸'
    };
    return icones[tipo] || '📰';
  }

  getIconeEvento(tipo) {
    const icones = {
      'falta_treino': '⏰',
      'noitada': '🌙',
      'briga': '💥',
      'vitoria': '🏆',
      'derrota': '💔'
    };
    return icones[tipo] || '📅';
  }

  formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  // Navegação entre telas
  mostrarTela(tela) {
    // Ocultar todas as telas
    Object.values(this.elementos).forEach(elemento => {
      if (elemento && elemento.classList) {
        elemento.classList.add('hidden');
      }
    });
    
    // Mostrar tela desejada
    const telaElement = this.elementos[tela];
    if (telaElement) {
      telaElement.classList.remove('hidden');
      this.telaAtual = tela;
    }
  }

  // Métodos para modais
  mostrarModal(titulo, conteudo, acoes = []) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container">
        <div class="modal-header">
          <h3>${titulo}</h3>
          <button class="modal-fechar" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
        </div>
        <div class="modal-content">
          ${conteudo}
        </div>
        <div class="modal-acoes">
          ${acoes.map(acao => `
            <button class="btn-modal ${acao.tipo || 'secundario'}" onclick="${acao.onclick}">
              ${acao.texto}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameView;
} else {
  window.GameView = GameView;
} 