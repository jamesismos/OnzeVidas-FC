# 📡 Integração com APIs - Sistema de Imprensa ONZE VIDAS FC

## Visão Geral

Este documento descreve a integração entre as APIs de futebol existentes (`api.js` e `football-data-api.js`) e o sistema de imprensa do jogo ONZE VIDAS FC.

## 🔗 APIs Disponíveis

### 1. **FootballAPI** (`js/api.js`)
- **Base URL**: `https://transfermarkt-api.fly.dev`
- **Funcionalidades**:
  - `getBrazilianClubs()`: Lista de clubes brasileiros
  - `getBrazilianPlayers()`: Jogadores brasileiros
  - `getFootballNews()`: Notícias de futebol
  - Sistema de cache e fallback

### 2. **FootballDataAPI** (`js/football-data-api.js`)
- **Base URL**: `https://api.football-data.org/v4`
- **API Key**: `1eb715e66ed44c8da8727c62c071f570`
- **Funcionalidades**:
  - `getBrazilianCompetitions()`: Competições brasileiras
  - `getBrazilianSerieATeams()`: Times da Série A
  - `getTeamPlayers(teamId)`: Jogadores de um time
  - `getBrazilianSerieAMatches()`: Partidas da Série A

## 🆕 Novo Serviço: ImprensaAPIService

### **Arquivo**: `js/ImprensaAPIService.js`

#### **Funcionalidades Principais**:

1. **Integração com APIs Existentes**:
   ```javascript
   constructor() {
       this.footballAPI = new FootballAPI();
       this.footballDataAPI = new FootballDataAPI();
   }
   ```

2. **Geração de Eventos Reais**:
   ```javascript
   async gerarEventosReais() {
       // Busca notícias reais da API
       // Simula transferências baseadas em dados reais
       // Gera eventos de indisciplina baseados no perfil social
       // Simula vitórias baseadas em dados de partidas
   }
   ```

3. **Conversão de Notícias**:
   ```javascript
   converterNoticiaParaEvento(noticia) {
       // Converte notícias da API em eventos do sistema
       // Detecta tipo de evento baseado no título
       // Extrai informações relevantes
   }
   ```

#### **Tipos de Eventos Gerados**:

- **Transferências**: Baseadas em jogadores com alto valor de mercado
- **Indisciplinas**: Baseadas no perfil social dos jogadores
- **Vitórias**: Simuladas com dados de partidas
- **Ofertas de Empresários**: Eventos especiais

## 🔄 ImprensaView Atualizada

### **Novas Funcionalidades**:

1. **Inicialização com API**:
   ```javascript
   async inicializarComAPI() {
       const { default: ImprensaAPIService } = await import('../js/ImprensaAPIService.js');
       this.apiService = new ImprensaAPIService();
   }
   ```

2. **Manchetes Enriquecidas**:
   ```javascript
   async gerarMancheteComAPI(evento) {
       // Inclui fonte, impacto, data e valores
       // Formatação melhorada
       // Informações detalhadas
   }
   ```

3. **Carregamento de Eventos Reais**:
   ```javascript
   async carregarEventosReais() {
       const eventos = await this.apiService.gerarEventosReais();
       eventos.forEach(evento => {
           this.gerarMancheteComAPI(evento);
       });
   }
   ```

## 📊 Estrutura de Dados

### **Evento da API**:
```javascript
{
    tipo: 'transferencia',
    jogador: 'João Silva',
    clubeDestino: 'Flamengo',
    valor: 50000000,
    fonte: 'Mercado de Transferências',
    impacto: 'alto',
    data: '2024-01-15'
}
```

### **Manchete Enriquecida**:
```html
<div class="manchete manchete-alto">
    <div class="manchete-conteudo">
        <div class="manchete-texto">João Silva assina com o Flamengo por R$ 50.0M</div>
        <div class="manchete-meta">
            <span class="manchete-fonte">📰 Mercado de Transferências</span>
            <span class="manchete-data">📅 15/01/2024</span>
            <span class="manchete-impacto impacto-alto">⚡ alto</span>
        </div>
    </div>
</div>
```

## 🎨 Estilos CSS Adicionados

### **Classes para Manchetes Enriquecidas**:
- `.manchete-conteudo`: Container principal
- `.manchete-texto`: Texto da manchete
- `.manchete-meta`: Metadados (fonte, data, impacto)
- `.manchete-alto/.manchete-médio/.manchete-baixo`: Variantes por impacto

### **Cores por Impacto**:
- **Alto**: Vermelho (`var(--danger)`)
- **Médio**: Amarelo (`var(--warning)`)
- **Baixo**: Verde (`var(--success)`)

## 🧪 Como Testar

### **1. Teste Básico**:
```javascript
// Gerar manchete simples
imprensaView.gerarManchete({
    tipo: 'transferencia',
    jogador: 'João Silva',
    clubeDestino: 'Flamengo'
});
```

### **2. Teste com API**:
```javascript
// Inicializar com API
await imprensaView.inicializarComAPI();

// Carregar eventos reais
await imprensaView.carregarEventosReais();
```

### **3. Teste de Filtros**:
```javascript
// Filtrar por tipo
imprensaView.filtrarPorTipo('transferencia');

// Filtrar por impacto
imprensaView.filtrarPorImpacto('alto');

// Mostrar todas
imprensaView.mostrarTodas();
```

## 📈 Estatísticas e Análise

### **Obter Estatísticas**:
```javascript
const stats = imprensaView.getEstatisticas();
console.log(stats);
// {
//     total: 15,
//     porTipo: { transferencia: 5, indisciplina: 3, vitoria: 7 },
//     porImpacto: { alto: 8, médio: 5, baixo: 2 },
//     ultimaAtualizacao: Date
// }
```

## 🔧 Configuração

### **Dependências**:
```html
<!-- APIs existentes -->
<script src="js/api.js"></script>
<script src="js/football-data-api.js"></script>

<!-- Novo serviço -->
<script type="module" src="js/ImprensaAPIService.js"></script>
```

### **Inicialização**:
```javascript
// No controller principal
class GameController {
    constructor() {
        this.imprensaView = new ImprensaView('imprensa-container');
        this.inicializarImprensa();
    }

    async inicializarImprensa() {
        await this.imprensaView.inicializarComAPI();
        await this.imprensaView.carregarEventosReais();
    }
}
```

## 🚀 Próximos Passos

### **Melhorias Planejadas**:
- [ ] **Cache inteligente** para eventos da API
- [ ] **Sincronização em tempo real** com APIs
- [ ] **Mais tipos de eventos** (lesões, títulos, etc.)
- [ ] **Sistema de notificações** push
- [ ] **Análise de sentimento** das manchetes
- [ ] **Integração com redes sociais** do jogo

### **APIs Adicionais**:
- [ ] **API de estatísticas** em tempo real
- [ ] **API de odds** para apostas
- [ ] **API de redes sociais** dos jogadores
- [ ] **API de clima** para jogos

## 📝 Notas Técnicas

### **Performance**:
- **Cache**: 5 minutos para dados da API
- **Rate Limiting**: 1 segundo entre requisições
- **Fallback**: Dados locais quando API falha

### **Compatibilidade**:
- ✅ Módulos ES6
- ✅ Async/Await
- ✅ Fetch API
- ✅ Map para cache

### **Tratamento de Erros**:
```javascript
try {
    const eventos = await apiService.gerarEventosReais();
} catch (error) {
    console.warn('Erro na API, usando dados locais');
    return eventosFallback;
}
```

---

**Integração desenvolvida para ONZE VIDAS FC v1.0** 🏆
