// ImprensaView.js
// Responsável por exibir manchetes de imprensa e reacoes da torcida

export default class ImprensaView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.apiService = null;
    this.eventosAtivos = [];
  }

  // Inicializar com serviço de API
  async inicializarComAPI() {
    try {
      const { default: ImprensaAPIService } = await import('../js/ImprensaAPIService.js');
      this.apiService = new ImprensaAPIService();
      console.log('✅ ImprensaView conectada com API');
    } catch (error) {
      console.warn('❌ Erro ao conectar com API:', error);
    }
  }

  // Gerar manchete com dados enriquecidos da API
  async gerarMancheteComAPI(evento) {
    if (!this.apiService) {
      this.gerarManchete(evento);
      return;
    }

    let manchete = '';
    const fonte = evento.fonte || 'Imprensa Esportiva';
    const impacto = evento.impacto || 'médio';
    const data = evento.data || new Date().toISOString().split('T')[0];

    switch (evento.tipo) {
      case 'transferencia':
        const valor = evento.valor ? ` por R$ ${(evento.valor / 1000000).toFixed(1)}M` : '';
        manchete = `${evento.jogador} assina com o ${evento.clubeDestino}${valor}`;
        break;
      case 'indisciplina':
        const descricao = evento.descricao || 'faltou ao treino novamente';
        manchete = `${evento.jogador} ${descricao}`;
        break;
      case 'vitoria':
        const placar = evento.placar ? ` por ${evento.placar}` : '';
        manchete = `${evento.clube} vence${placar} e torcida comemora`;
        break;
      case 'ofertaEmpresario':
        manchete = `Empresário oferece proposta milionária para assumir o ${evento.clube}`;
        break;
      default:
        manchete = 'Novo evento no futebol nacional';
    }

    this.exibirMancheteEnriquecida(manchete, fonte, impacto, data);
  }

  // Gerar manchete simples (método original)
  gerarManchete(evento) {
    let manchete = '';
    switch (evento.tipo) {
      case 'transferencia':
        manchete = `${evento.jogador} assina com o ${evento.clubeDestino}`;
        break;
      case 'indisciplina':
        manchete = `${evento.jogador} faltou ao treino novamente`; 
        break;
      case 'vitoria':
        manchete = `${evento.clube} vence e torcida comemora`; 
        break;
      case 'ofertaEmpresario':
        manchete = `Empresário oferece proposta milionária para assumir o ${evento.clube}`;
        break;
      default:
        manchete = 'Novo evento no futebol nacional';
    }
    this.exibirManchete(manchete);
  }

  // Exibir manchete com informações enriquecidas
  exibirMancheteEnriquecida(texto, fonte, impacto, data) {
    const div = document.createElement('div');
    div.className = `manchete manchete-${impacto}`;
    
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
    
    div.innerHTML = `
      <div class="manchete-conteudo">
        <div class="manchete-texto">${texto}</div>
        <div class="manchete-meta">
          <span class="manchete-fonte">📰 ${fonte}</span>
          <span class="manchete-data">📅 ${dataFormatada}</span>
          <span class="manchete-impacto impacto-${impacto}">⚡ ${impacto}</span>
        </div>
      </div>
    `;
    
    this.container.prepend(div);
    this.eventosAtivos.push({ texto, fonte, impacto, data });
  }

  // Exibir manchete simples (método original)
  exibirManchete(texto) {
    const div = document.createElement('div');
    div.className = 'manchete';
    div.innerText = texto;
    this.container.prepend(div); // adiciona no topo
  }

  // Carregar eventos reais da API
  async carregarEventosReais() {
    if (!this.apiService) {
      console.warn('API Service não disponível');
      return;
    }

    try {
      const eventos = await this.apiService.gerarEventosReais();
      eventos.forEach(evento => {
        this.gerarMancheteComAPI(evento);
      });
      
      console.log(`✅ ${eventos.length} eventos carregados da API`);
    } catch (error) {
      console.warn('Erro ao carregar eventos da API:', error);
    }
  }

  // Obter estatísticas dos eventos
  getEstatisticas() {
    if (this.apiService) {
      return this.apiService.getEstatisticasEventos();
    }
    
    return {
      total: this.eventosAtivos.length,
      porTipo: {},
      porImpacto: {},
      ultimaAtualizacao: new Date()
    };
  }

  // Filtrar manchetes por tipo
  filtrarPorTipo(tipo) {
    const manchetes = this.container.querySelectorAll('.manchete');
    manchetes.forEach(manchete => {
      const temTipo = manchete.textContent.toLowerCase().includes(tipo.toLowerCase());
      manchete.style.display = temTipo ? 'block' : 'none';
    });
  }

  // Filtrar manchetes por impacto
  filtrarPorImpacto(impacto) {
    const manchetes = this.container.querySelectorAll('.manchete');
    manchetes.forEach(manchete => {
      const temImpacto = manchete.classList.contains(`manchete-${impacto}`);
      manchete.style.display = temImpacto ? 'block' : 'none';
    });
  }

  // Mostrar todas as manchetes
  mostrarTodas() {
    const manchetes = this.container.querySelectorAll('.manchete');
    manchetes.forEach(manchete => {
      manchete.style.display = 'block';
    });
  }

  limpar() {
    this.container.innerHTML = '';
    this.eventosAtivos = [];
  }
}
