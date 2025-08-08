# 🏆 OnzeVidas FC - Football Manager React

Um Football Manager moderno e funcional com times brasileiros reais, desenvolvido em React + TypeScript + Tailwind CSS.

## ✨ Funcionalidades

### ✅ **Sistema Financeiro Funcional**
- Orçamento que diminui corretamente ao contratar jogadores
- Sistema de transferências realístico
- Controle de folha salarial
- Receitas e despesas detalhadas

### ✅ **Campo de Escalação Drag & Drop**
- Sistema de escalação funcional com validação de posições
- Formações táticas (4-3-3, 4-4-2, 3-5-2)
- Drag & drop de jogadores para posições
- Validação de posições por formação

### ✅ **Jogadores Reais dos Times Brasileiros**
- Dados reais do Flamengo, Palmeiras, Corinthians, São Paulo e outros
- Stats calculadas automaticamente (overall, pace, shooting, etc.)
- Sistema de moral e desenvolvimento
- Informações detalhadas de cada jogador

### ✅ **Simulação de Partidas (60s)**
- Timer real de 60 segundos para simulação
- Eventos baseados nas stats dos jogadores
- Resultados realísticos
- Interface moderna de simulação

### ✅ **Interface Moderna e Responsiva**
- Design system profissional
- Animações suaves com Framer Motion
- Mobile-first approach
- Tema escuro moderno

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar em Desenvolvimento
```bash
npm start
```

### 3. Build para Produção
```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Header principal
│   ├── Sidebar.tsx     # Navegação lateral
│   └── ...
├── pages/              # Páginas principais
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Squad.tsx       # Gerenciamento de elenco
│   ├── TransferMarket.tsx # Mercado de transferências
│   ├── Lineup.tsx      # Sistema de escalação
│   ├── MatchSimulation.tsx # Simulação de partidas
│   └── Finances.tsx    # Sistema financeiro
├── store/              # Gerenciamento de estado
│   └── gameStore.ts    # Store Zustand
├── services/           # Serviços e APIs
│   └── dataService.ts  # Carregamento de dados
├── types/              # Tipos TypeScript
│   └── index.ts        # Interfaces principais
└── ...
```

## 🎮 Como Jogar

### 1. Seleção de Clube
- Escolha um dos times brasileiros disponíveis
- Cada clube tem orçamento, jogadores e características únicas

### 2. Gerenciamento de Elenco
- Visualize todos os jogadores do seu clube
- Veja stats detalhadas (overall, pace, shooting, etc.)
- Gerencie contratos e salários

### 3. Mercado de Transferências
- Contrate jogadores de outros clubes
- Negocie valores realísticos
- Sistema de aceitação baseado em prestígio e valor

### 4. Escalação
- Escale jogadores para posições específicas
- Use drag & drop para mover jogadores
- Validação automática de posições

### 5. Simulação de Partidas
- Simule jogos com timer de 60 segundos
- Veja eventos baseados nas stats dos jogadores
- Resultados realísticos

### 6. Sistema Financeiro
- Controle orçamento e transferências
- Gerencie folha salarial
- Acompanhe receitas e despesas

## 🔧 Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **React Router** - Navegação

## 📊 Dados Reais

O projeto utiliza dados reais dos times brasileiros:
- **Flamengo**: Rossi, Varela, Fabrício Bruno, Arrascaeta, Pedro, etc.
- **Palmeiras**: Weverton, Mayke, Endrick, etc.
- **Corinthians**: Cássio, Fagner, etc.
- **São Paulo**: Rafael, Igor Vinicius, etc.

## 🎯 Correções Implementadas

### ✅ Problema 1: Campo não funciona
- Sistema de drag & drop funcional
- Validação de posições por formação
- Interface visual moderna

### ✅ Problema 2: Não lista jogadores reais
- Carregamento de dados JSON existentes
- Stats calculadas automaticamente
- Fallback para dados hardcoded

### ✅ Problema 3: Orçamento não diminui
- Função `buyPlayer` corrigida
- Atualização imediata da interface
- Validações de orçamento

### ✅ Problema 4: Simulação não aparece
- Timer de 60 segundos funcional
- Interface de simulação moderna
- Eventos baseados em stats

## 🚀 Próximos Passos

1. **Instalar dependências**: `npm install`
2. **Executar projeto**: `npm start`
3. **Selecionar clube** na tela inicial
4. **Explorar funcionalidades**:
   - Dashboard com visão geral
   - Elenco com jogadores reais
   - Mercado de transferências
   - Sistema de escalação
   - Simulação de partidas
   - Controle financeiro

## 📱 Responsividade

O projeto é totalmente responsivo:
- **Desktop**: Interface completa com sidebar
- **Tablet**: Layout adaptado
- **Mobile**: Navegação otimizada

## 🎨 Design System

- **Cores**: Verde futebol (#00D26A), Dourado (#FFD700)
- **Tipografia**: Inter + Poppins
- **Animações**: Framer Motion
- **Tema**: Escuro moderno

---

**OnzeVidas FC** - O Football Manager brasileiro que você sempre quis! ⚽🇧🇷
