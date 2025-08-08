# 📰 Sistema de Imprensa e Gestão de Clube - ONZE VIDAS FC

## Visão Geral

Este módulo adiciona funcionalidades de imprensa e gestão de clube ao jogo ONZE VIDAS FC, permitindo:

- **Sistema de Imprensa**: Geração e exibição de manchetes baseadas em eventos do jogo
- **Gestão de Clube**: Controle de reputação, torcida e incentivos financeiros

## 📁 Estrutura de Arquivos

```
views/
├── ImprensaView.js          # Responsável pela exibição de manchetes
models/
├── GestaoClube.js           # Gerenciamento de reputação e torcida
Css/
├── style-simples.css        # Estilos para imprensa e gestão
teste-imprensa-gestao.html   # Página de teste das funcionalidades
```

## 🎯 Funcionalidades

### 📰 Sistema de Imprensa (ImprensaView.js)

#### Características:
- **Geração automática de manchetes** baseada em eventos
- **Interface visual moderna** com animações
- **Sistema de limpeza** para gerenciar histórico
- **Responsivo** para diferentes dispositivos

#### Tipos de Eventos Suportados:
- `transferencia`: Jogador assina com novo clube
- `indisciplina`: Jogador faltou ao treino
- `vitoria`: Clube vence e torcida comemora
- `ofertaEmpresario`: Proposta milionária para assumir clube

#### Uso:
```javascript
import ImprensaView from './views/ImprensaView.js';

const imprensaView = new ImprensaView('container-id');

// Gerar manchete
const evento = {
    tipo: 'transferencia',
    jogador: 'João Silva',
    clubeDestino: 'Flamengo'
};
imprensaView.gerarManchete(evento);

// Limpar manchetes
imprensaView.limpar();
```

### ⚽ Gestão de Clube (GestaoClube.js)

#### Características:
- **Controle de reputação** (0-100)
- **Gestão da torcida** (0-100)
- **Sistema de incentivos** financeiros
- **Validações** automáticas de limites

#### Métodos Disponíveis:
- `atualizarReputacao(valor)`: Ajusta reputação do clube
- `atualizarTorcida(valor)`: Ajusta humor da torcida
- `aplicarIncentivo(tipo)`: Aplica incentivo financeiro

#### Tipos de Incentivos:
- `cesta`: Cesta básica para jogadores
- `dinheiro`: Bicho em dinheiro
- `carro`: Carro zero (apenas clubes ricos)

#### Uso:
```javascript
import GestaoClube from './models/GestaoClube.js';

const clube = { nome: 'Meu Clube', riqueza: 'alta' };
const gestao = new GestaoClube(clube);

// Atualizar valores
gestao.atualizarReputacao(10);
gestao.atualizarTorcida(-5);

// Aplicar incentivo
const resultado = gestao.aplicarIncentivo('carro');
console.log(resultado); // "Incentivo aplicado: carro zero"
```

## 🎨 Estilos CSS

### Classes Principais:
- `.manchete`: Estilo das manchetes de imprensa
- `.imprensa-container`: Container principal da imprensa
- `.gestao-clube-container`: Container da gestão
- `.stat-card`: Cards de estatísticas
- `.btn-incentivo`: Botões de incentivo

### Características Visuais:
- **Gradientes modernos** para manchetes
- **Animações suaves** de entrada
- **Ícones emoji** para identificação visual
- **Barras de progresso** para estatísticas
- **Design responsivo** para mobile

## 🧪 Teste das Funcionalidades

### Como Testar:
1. Abra `teste-imprensa-gestao.html` no navegador
2. Use os botões para gerar diferentes tipos de manchetes
3. Teste os controles de reputação e torcida
4. Experimente os diferentes tipos de incentivos

### Funcionalidades de Teste:
- ✅ Geração de manchetes por tipo
- ✅ Limpeza do histórico de imprensa
- ✅ Controle de reputação e torcida
- ✅ Aplicação de incentivos
- ✅ Reset de valores
- ✅ Interface responsiva

## 🔧 Integração com o Jogo Principal

### Para integrar ao jogo principal:

1. **Importar as classes**:
```javascript
import ImprensaView from './views/ImprensaView.js';
import GestaoClube from './models/GestaoClube.js';
```

2. **Inicializar no controller**:
```javascript
class GameController {
    constructor() {
        this.imprensaView = new ImprensaView('imprensa-container');
        this.gestaoClube = new GestaoClube(this.clubeAtual);
    }
}
```

3. **Adicionar HTML**:
```html
<div class="imprensa-container">
    <div class="imprensa-header">
        <h3>📰 Manchetes do Dia</h3>
        <button class="btn-limpar-imprensa">Limpar</button>
    </div>
    <div id="imprensa-container"></div>
</div>

<div class="gestao-clube-container">
    <!-- Conteúdo da gestão -->
</div>
```

## 🚀 Próximos Passos

### Melhorias Sugeridas:
- [ ] **Sistema de notificações** em tempo real
- [ ] **Histórico persistente** de manchetes
- [ ] **Mais tipos de eventos** (lesões, títulos, etc.)
- [ ] **Sistema de repercussão** das manchetes na torcida
- [ ] **Integração com mídia social** do jogo
- [ ] **Sistema de crise** de reputação
- [ ] **Incentivos personalizados** por jogador

### Eventos Futuros:
- [ ] **Conferências de imprensa**
- [ ] **Entrevistas com jogadores**
- [ ] **Vazamentos de informação**
- [ ] **Rumores de mercado**
- [ ] **Reações da torcida** em tempo real

## 📝 Notas Técnicas

### Compatibilidade:
- ✅ Navegadores modernos (ES6+)
- ✅ Módulos ES6
- ✅ CSS Grid e Flexbox
- ✅ Animações CSS

### Performance:
- **Manchetes**: Renderização otimizada com `prepend()`
- **Gestão**: Atualizações em tempo real
- **CSS**: Animações hardware-accelerated

### Acessibilidade:
- **Contraste adequado** para leitura
- **Navegação por teclado** suportada
- **Screen readers** compatíveis

---

**Desenvolvido para ONZE VIDAS FC v1.0** 🏆
