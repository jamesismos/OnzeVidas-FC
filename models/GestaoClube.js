// GestaoClube.js
// Responsável por gerenciar reputação, torcida e incentivos financeiros

export default class GestaoClube {
  constructor(clube) {
    this.clube = clube;
    this.reputacao = 50; // de 0 a 100
    this.torcida = 50; // humor da torcida
  }

  atualizarReputacao(valor) {
    this.reputacao = Math.max(0, Math.min(100, this.reputacao + valor));
  }

  atualizarTorcida(valor) {
    this.torcida = Math.max(0, Math.min(100, this.torcida + valor));
  }

  aplicarIncentivo(tipo) {
    switch (tipo) {
      case 'cesta':
        return 'Incentivo aplicado: cesta básica';
      case 'dinheiro':
        return 'Incentivo aplicado: bicho em dinheiro';
      case 'carro':
        if (this.clube.riqueza === 'alta') {
          return 'Incentivo aplicado: carro zero';
        }
        return 'Clube sem condições de oferecer carro';
      default:
        return 'Nenhum incentivo aplicado';
    }
  }
}
