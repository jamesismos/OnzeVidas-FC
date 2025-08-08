// CORREÇÕES PRINCIPAIS - Onze Vidas FC
// Este arquivo contém as correções para os problemas identificados

// ============================================================================
// 1. CORREÇÃO DO SISTEMA DE ESCALAÇÃO
// ============================================================================

// Função para escalar jogador com validação
function escalarJogador(jogadorId, posicao) {
  const jogador = this.elenco.find(j => j.id === jogadorId);
  if (!jogador) {
    console.error('Jogador não encontrado:', jogadorId);
    return false;
  }
  
  // Validar posição
  if (!this.validarPosicao(jogador, posicao)) {
    alert(`Jogador ${jogador.nome} não pode jogar na posição ${posicao}!`);
    return false;
  }
  
  // Adicionar à escalação
  if (!this.escalacao) this.escalacao = {};
  this.escalacao[posicao] = jogador;
  
  // Renderizar escalação
  this.renderizarEscalacao();
  
  console.log(`Jogador ${jogador.nome} escalado na posição ${posicao}`);
  return true;
}

// Validar se jogador pode jogar na posição
function validarPosicao(jogador, posicao) {
  const posicoesValidas = {
    'goleiro': ['Goleiro'],
    'zagueiro': ['Zagueiro', 'Lateral'],
    'lateral': ['Lateral', 'Zagueiro'],
    'volante': ['Volante', 'Meia'],
    'meia': ['Meia', 'Volante'],
    'atacante': ['Atacante', 'Meia']
  };
  
  const posicaoJogador = jogador.posicao || '';
  const posicoesPermitidas = posicoesValidas[posicao] || [];
  
  return posicoesPermitidas.some(pos => 
    posicaoJogador.toLowerCase().includes(pos.toLowerCase())
  );
}

// Renderizar escalação no campinho
function renderizarEscalacao() {
  const campinho = document.querySelector('.campinho');
  if (!campinho) return;
  
  // Limpar campinho
  campinho.innerHTML = '';
  
  // Criar posições baseadas na formação
  const formacao = this.formacao || '4-4-2';
  const posicoes = this.criarPosicoesFormacao(formacao);
  
  // Renderizar cada posição
  posicoes.forEach(posicao => {
    const elemento = document.createElement('div');
    elemento.className = 'posicao-jogador';
    elemento.setAttribute('data-posicao', posicao.id);
    elemento.style.left = posicao.x + '%';
    elemento.style.top = posicao.y + '%';
    
    const jogador = this.escalacao[posicao.id];
    if (jogador) {
      elemento.innerHTML = `
        <div class="jogador-nome">${jogador.nome}</div>
        <div class="jogador-posicao">${jogador.posicao}</div>
      `;
      elemento.classList.add('jogador-escalado');
    } else {
      elemento.innerHTML = `
        <div class="posicao-vazia">${posicao.nome}</div>
      `;
      elemento.classList.add('posicao-vazia');
    }
    
    // Adicionar event listener para drag & drop
    elemento.addEventListener('click', () => this.selecionarPosicao(posicao.id));
    
    campinho.appendChild(elemento);
  });
}

// ============================================================================
// 2. CORREÇÃO DO SISTEMA DE JOGADORES
// ============================================================================

// Melhorar carregamento de jogadores com fallback robusto
async function carregarJogadores() {
  console.log('Carregando jogadores...');
  
  try {
    // Tentar API externa
    if (window.FootballAPI) {
      const api = new FootballAPI();
      const jogadoresAPI = await api.getBrazilianPlayers();
      if (jogadoresAPI && jogadoresAPI.length > 0) {
        this.mercado = jogadoresAPI;
        console.log('Jogadores carregados da API:', jogadoresAPI.length);
        return;
      }
    }
  } catch (error) {
    console.warn('Erro ao carregar jogadores da API:', error);
  }
  
  // Fallback para dados locais
  try {
    const response = await fetch('dados/jogadores.json');
    if (response.ok) {
      const jogadores = await response.json();
      this.mercado = jogadores;
      console.log('Jogadores carregados do arquivo local:', jogadores.length);
      return;
    }
  } catch (error) {
    console.error('Erro ao carregar jogadores locais:', error);
  }
  
  // Dados hardcoded como último recurso
  console.log('Usando dados hardcoded como fallback');
  this.mercado = this.gerarJogadoresFallback();
}

// Gerar jogadores de fallback
function gerarJogadoresFallback() {
  const jogadores = [];
  const nomes = [
    'João', 'Pedro', 'Carlos', 'Miguel', 'Lucas', 'André', 'Rafael', 
    'Daniel', 'Marcos', 'Thiago', 'Bruno', 'Felipe', 'Gabriel', 'Matheus',
    'Rodrigo', 'Diego', 'Ricardo', 'Paulo', 'Roberto', 'Fernando'
  ];
  const sobrenomes = [
    'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira',
    'Almeida', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins',
    'Carvalho', 'Alves', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'
  ];
  const posicoes = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Atacante'];
  
  for (let i = 0; i < 50; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const posicao = posicoes[Math.floor(Math.random() * posicoes.length)];
    
    jogadores.push({
      id: 1000 + i,
      nome: `${nome} ${sobrenome}`,
      posicao: posicao,
      idade: Math.floor(Math.random() * 15) + 18,
      valor: Math.floor(Math.random() * 50000000) + 1000000,
      salario: Math.floor(Math.random() * 500000) + 50000,
      habilidade: Math.floor(Math.random() * 30) + 70,
      clube: 'Sem clube',
      moral: Math.floor(Math.random() * 40) + 60,
      contrato: {
        salario: Math.floor(Math.random() * 500000) + 50000,
        fim: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000)
      },
      personalidade: {
        ambicao: Math.floor(Math.random() * 100),
        lealdade: Math.floor(Math.random() * 100),
        disciplina: Math.floor(Math.random() * 100),
        preferenciaLocal: Math.random() > 0.5 ? 'local' : 'internacional'
      }
    });
  }
  
  return jogadores;
}

// ============================================================================
// 3. CORREÇÃO DO SISTEMA FINANCEIRO
// ============================================================================

// Corrigir função de contratação
function fazerProposta(jogadorId, valor) {
  const jogador = this.mercado.find(j => j.id === jogadorId);
  if (!jogador) {
    console.error('Jogador não encontrado:', jogadorId);
    return;
  }
  
  // Verificar se tem dinheiro
  if (this.clubeSelecionado.orcamento < valor) {
    alert(`Orçamento insuficiente! Você tem ${formatarMoeda(this.clubeSelecionado.orcamento)} e a proposta é de ${formatarMoeda(valor)}`);
    return;
  }
  
  // Verificar se o jogador aceita a proposta
  const aceitaProposta = this.verificarAceitacaoProposta(jogador, this.clubeSelecionado, valor);
  
  if (aceitaProposta) {
    // Transferir jogador para o elenco
    this.elenco.push(jogador);
    this.mercado = this.mercado.filter(j => j.id !== jogadorId);
    
    // DIMINUIR ORÇAMENTO - CORREÇÃO PRINCIPAL
    this.diminuirOrcamento(valor);
    
    // Atualizar interface
    this.renderizarMercado(this.mercado);
    this.renderizarElenco(this.elenco);
    this.atualizarOrcamentoDisponivel();
    
    // Gerar notícia de contratação
    this.gerarNoticiaContratacao(jogador, this.clubeSelecionado, valor);
    
    // Fechar overlay
    document.querySelector('.negociacao-overlay')?.remove();
    
    alert(`Jogador ${jogador.nome} contratado com sucesso!`);
    console.log(`Jogador ${jogador.nome} contratado por ${formatarMoeda(valor)}`);
  } else {
    // Jogador recusou a proposta
    const motivo = this.obterMotivoRecusa(jogador, this.clubeSelecionado);
    alert(`Jogador ${jogador.nome} recusou a proposta: ${motivo}`);
    
    // Gerar notícia de recusa
    this.gerarNoticiaRecusa(jogador, this.clubeSelecionado, motivo);
  }
}

// Corrigir função de diminuição de orçamento
function diminuirOrcamento(valor) {
  if (!this.clubeSelecionado) {
    console.error('Clube não selecionado');
    return;
  }
  
  if (this.clubeSelecionado.orcamento < valor) {
    console.error('Orçamento insuficiente para diminuir');
    return;
  }
  
  // Diminuir orçamento
  this.clubeSelecionado.orcamento -= valor;
  
  // Atualizar interface imediatamente
  this.atualizarOrcamentoDisponivel();
  this.atualizarOrcamentoERiqueza();
  
  console.log(`Orçamento diminuído em ${formatarMoeda(valor)}. Novo orçamento: ${formatarMoeda(this.clubeSelecionado.orcamento)}`);
}

// Verificar aceitação da proposta
function verificarAceitacaoProposta(jogador, clube, valor) {
  const personalidade = jogador.personalidade || {};
  const prestigioClube = this.calcularPrestigioClube(clube);
  const salarioOferecido = jogador.salario;
  
  // Fatores que influenciam a aceitação
  let probabilidadeAceitacao = 50; // Base 50%
  
  // Prestígio do clube
  if (prestigioClube > 80) {
    probabilidadeAceitacao += 20;
  } else if (prestigioClube < 40) {
    probabilidadeAceitacao -= 20;
  }
  
  // Salário oferecido
  const salarioAtual = jogador.contrato?.salario || jogador.salario;
  if (salarioOferecido > salarioAtual * 1.5) {
    probabilidadeAceitacao += 15;
  } else if (salarioOferecido < salarioAtual * 0.8) {
    probabilidadeAceitacao -= 15;
  }
  
  // Ambição do jogador
  if (personalidade.ambicao > 80) {
    probabilidadeAceitacao += 10;
  } else if (personalidade.ambicao < 30) {
    probabilidadeAceitacao -= 10;
  }
  
  // Lealdade do jogador
  if (personalidade.lealdade > 80) {
    probabilidadeAceitacao -= 10;
  }
  
  // Valor da proposta
  const razaoValor = valor / jogador.valor;
  if (razaoValor >= 1.2) {
    probabilidadeAceitacao += 20;
  } else if (razaoValor <= 0.8) {
    probabilidadeAceitacao -= 20;
  }
  
  // Normalizar probabilidade
  probabilidadeAceitacao = Math.max(0, Math.min(100, probabilidadeAceitacao));
  
  // Decidir baseado na probabilidade
  return Math.random() * 100 < probabilidadeAceitacao;
}

// ============================================================================
// 4. CORREÇÃO DA TELA DE SIMULAÇÃO
// ============================================================================

// Corrigir função de simulação
function simularJogo() {
  console.log('Simulando jogo...');
  
  // Verificar se há jogo agendado
  if (!this.proximoJogo) {
    this.proximoJogo = this.gerarProximoJogo();
  }
  
  // Gerar resultado
  const resultado = this.calcularResultadoJogo(this.proximoJogo.casa, this.proximoJogo.visitante);
  
  // Mostrar tela de simulação com fallback
  try {
    this.mostrarTelaSimulacao(resultado);
  } catch (error) {
    console.error('Erro ao mostrar tela de simulação:', error);
    // Fallback: mostrar resultado direto
    this.mostrarResultadoDireto(resultado);
  }
}

// Função de fallback para simulação
function mostrarResultadoDireto(resultado) {
  const overlay = document.createElement('div');
  overlay.className = 'simulacao-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  
  overlay.innerHTML = `
    <div class="simulacao-container" style="
      background: white;
      border-radius: 15px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    ">
      <div class="simulacao-header" style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #3498db;
      ">
        <h2 style="margin: 0; color: #2c3e50; font-size: 24px;">⚽ Resultado do Jogo</h2>
        <button class="btn-fechar" onclick="this.parentElement.parentElement.parentElement.remove()" style="
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 16px;
        ">✕</button>
      </div>
      <div class="resultado-jogo" style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
      ">
        <div class="time-casa" style="text-align: center; flex: 1;">
          <div class="nome-time" style="font-size: 18px; font-weight: 600; color: #2c3e50; margin-bottom: 10px;">${resultado.casa}</div>
          <div class="gols" style="font-size: 48px; font-weight: bold; color: #e74c3c;">${resultado.golsCasa}</div>
        </div>
        <div class="vs" style="font-size: 24px; font-weight: bold; color: #7f8c8d; margin: 0 20px;">VS</div>
        <div class="time-visitante" style="text-align: center; flex: 1;">
          <div class="nome-time" style="font-size: 18px; font-weight: 600; color: #2c3e50; margin-bottom: 10px;">${resultado.visitante}</div>
          <div class="gols" style="font-size: 48px; font-weight: bold; color: #e74c3c;">${resultado.golsVisitante}</div>
        </div>
      </div>
      <div class="resultado-info" style="margin: 20px 0;">
        <div class="resultado-tipo ${this.getTipoResultado(resultado)}" style="
          font-size: 20px;
          font-weight: bold;
          padding: 10px 20px;
          border-radius: 25px;
          margin-bottom: 10px;
          ${this.getTipoResultado(resultado) === 'vitoria' ? 'background: #27ae60; color: white;' : ''}
          ${this.getTipoResultado(resultado) === 'empate' ? 'background: #f39c12; color: white;' : ''}
          ${this.getTipoResultado(resultado) === 'derrota' ? 'background: #e74c3c; color: white;' : ''}
        ">
          ${this.getTextoResultado(resultado)}
        </div>
        <div class="pontos-ganhos" style="font-size: 16px; color: #27ae60; font-weight: 600;">
          ${this.getPontosGanhos(resultado)} pontos ganhos
        </div>
      </div>
      <div class="simulacao-acoes" style="display: flex; gap: 15px; justify-content: center; margin-top: 20px;">
        <button class="btn-ver-tabela" onclick="window.gameController.verTabelaBrasileirao()" style="
          padding: 12px 24px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        ">Ver Tabela</button>
        <button class="btn-proximo-jogo" onclick="this.parentElement.parentElement.parentElement.remove()" style="
          padding: 12px 24px;
          background: #27ae60;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        ">Próximo Jogo</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

// Funções auxiliares para resultado
function getTipoResultado(resultado) {
  if (resultado.casa === this.clubeSelecionado?.nome) {
    if (resultado.golsCasa > resultado.golsVisitante) return 'vitoria';
    if (resultado.golsCasa < resultado.golsVisitante) return 'derrota';
    return 'empate';
  } else {
    if (resultado.golsVisitante > resultado.golsCasa) return 'vitoria';
    if (resultado.golsVisitante < resultado.golsCasa) return 'derrota';
    return 'empate';
  }
}

function getTextoResultado(resultado) {
  const tipo = this.getTipoResultado(resultado);
  switch (tipo) {
    case 'vitoria': return 'VITÓRIA! 🎉';
    case 'empate': return 'EMPATE 🤝';
    case 'derrota': return 'DERROTA 😔';
    default: return 'RESULTADO';
  }
}

function getPontosGanhos(resultado) {
  const tipo = this.getTipoResultado(resultado);
  switch (tipo) {
    case 'vitoria': return 3;
    case 'empate': return 1;
    case 'derrota': return 0;
    default: return 0;
  }
}

// ============================================================================
// 5. FUNÇÕES AUXILIARES
// ============================================================================

// Formatar moeda
function formatarMoeda(valor) {
  if (typeof valor !== 'number') return 'R$ 0';
  
  if (valor >= 1000000) {
    return `R$ ${(valor / 1000000).toFixed(1)}M`;
  } else if (valor >= 1000) {
    return `R$ ${(valor / 1000).toFixed(0)}K`;
  } else {
    return `R$ ${valor.toFixed(0)}`;
  }
}

// Calcular prestígio do clube
function calcularPrestigioClube(clube) {
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

// Obter motivo de recusa
function obterMotivoRecusa(jogador, clube) {
  const motivos = [
    'Salário insuficiente',
    'Prestígio do clube baixo',
    'Jogador muito leal ao clube atual',
    'Proposta muito baixa',
    'Jogador prefere outro clube',
    'Problemas pessoais'
  ];
  
  return motivos[Math.floor(Math.random() * motivos.length)];
}

// Gerar próximo jogo
function gerarProximoJogo() {
  const times = ['Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo', 'Santos', 'Grêmio', 'Internacional'];
  const adversarios = times.filter(t => t !== this.clubeSelecionado?.nome);
  const adversario = adversarios[Math.floor(Math.random() * adversarios.length)];
  
  return {
    casa: this.clubeSelecionado?.nome || 'Meu Time',
    visitante: adversario,
    local: 'Estádio Principal',
    rodada: 'Rodada 1',
    data: new Date()
  };
}

// Calcular resultado do jogo
function calcularResultadoJogo(casa, visitante) {
  // Simular resultado baseado na força dos times
  const forcaCasa = Math.floor(Math.random() * 30) + 70;
  const forcaVisitante = Math.floor(Math.random() * 30) + 70;
  
  // Calcular gols baseado na força
  const golsCasa = Math.floor(Math.random() * 4);
  const golsVisitante = Math.floor(Math.random() * 4);
  
  // Ajustar baseado na força relativa
  if (forcaCasa > forcaVisitante + 10) {
    return { casa, visitante, golsCasa: Math.max(1, golsCasa), golsVisitante: Math.min(2, golsVisitante) };
  } else if (forcaVisitante > forcaCasa + 10) {
    return { casa, visitante, golsCasa: Math.min(2, golsCasa), golsVisitante: Math.max(1, golsVisitante) };
  } else {
    return { casa, visitante, golsCasa, golsVisitante };
  }
}

// ============================================================================
// 6. INICIALIZAÇÃO DAS CORREÇÕES
// ============================================================================

// Função para aplicar todas as correções
function aplicarCorrecoes() {
  console.log('Aplicando correções do sistema...');
  
  // Adicionar funções ao GameController se existir
  if (window.gameController) {
    // Sistema de escalação
    window.gameController.escalarJogador = escalarJogador;
    window.gameController.validarPosicao = validarPosicao;
    window.gameController.renderizarEscalacao = renderizarEscalacao;
    
    // Sistema de jogadores
    window.gameController.carregarJogadores = carregarJogadores;
    window.gameController.gerarJogadoresFallback = gerarJogadoresFallback;
    
    // Sistema financeiro
    window.gameController.fazerProposta = fazerProposta;
    window.gameController.diminuirOrcamento = diminuirOrcamento;
    window.gameController.verificarAceitacaoProposta = verificarAceitacaoProposta;
    
    // Sistema de simulação
    window.gameController.simularJogo = simularJogo;
    window.gameController.mostrarResultadoDireto = mostrarResultadoDireto;
    window.gameController.getTipoResultado = getTipoResultado;
    window.gameController.getTextoResultado = getTextoResultado;
    window.gameController.getPontosGanhos = getPontosGanhos;
    
    // Funções auxiliares
    window.gameController.formatarMoeda = formatarMoeda;
    window.gameController.calcularPrestigioClube = calcularPrestigioClube;
    window.gameController.obterMotivoRecusa = obterMotivoRecusa;
    window.gameController.gerarProximoJogo = gerarProximoJogo;
    window.gameController.calcularResultadoJogo = calcularResultadoJogo;
    
    console.log('Correções aplicadas com sucesso!');
  } else {
    console.warn('GameController não encontrado. Correções não aplicadas.');
  }
}

// Aplicar correções quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', aplicarCorrecoes);
} else {
  aplicarCorrecoes();
}

// Exportar funções para uso global
window.CorrecoesOnzeVidas = {
  escalarJogador,
  validarPosicao,
  renderizarEscalacao,
  carregarJogadores,
  gerarJogadoresFallback,
  fazerProposta,
  diminuirOrcamento,
  verificarAceitacaoProposta,
  simularJogo,
  mostrarResultadoDireto,
  getTipoResultado,
  getTextoResultado,
  getPontosGanhos,
  formatarMoeda,
  calcularPrestigioClube,
  obterMotivoRecusa,
  gerarProximoJogo,
  calcularResultadoJogo,
  aplicarCorrecoes
};
